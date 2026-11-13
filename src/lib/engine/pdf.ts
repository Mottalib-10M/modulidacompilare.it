/**
 * Petit générateur PDF (A4, Helvetica, encodage WinAnsi) écrit pour le site : le document se fabrique
 * dans le navigateur, sans bibliothèque ni serveur, donc aucune donnée ne quitte l'ordinateur.
 * Les largeurs de caractères viennent des métriques standard d'Helvetica (approximation par lettre de base).
 */
export interface Blocco { t: string; b?: boolean; c?: boolean; s?: number; gap?: number; r?: boolean }

const W: Record<string, number> = {
  ' ': 278, '!': 278, '"': 355, '#': 556, $: 556, '%': 889, '&': 667, "'": 191, '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
  ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015, '[': 278, '\\': 278, ']': 278, _: 556, '°': 400, '€': 556, '’': 222, '«': 556, '»': 556,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
};
const base = (ch: string) => ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
export function larghezza(testo: string, size: number, bold = false): number {
  let w = 0;
  for (const ch of testo) w += W[ch] ?? W[base(ch)] ?? (/[0-9]/.test(ch) ? 556 : 600);
  return (w * size * (bold ? 1.07 : 1)) / 1000;
}
export function aCapo(testo: string, max: number, size: number, bold = false): string[] {
  const righe: string[] = [];
  for (const para of testo.split('\n')) {
    let cur = '';
    for (const parola of para.split(/ +/)) {
      const prova = cur ? `${cur} ${parola}` : parola;
      if (larghezza(prova, size, bold) <= max || !cur) cur = prova; else { righe.push(cur); cur = parola; }
    }
    righe.push(cur);
  }
  return righe;
}
const WIN: Record<string, number> = { '€': 0x80, '‚': 0x82, '„': 0x84, '…': 0x85, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97 };
/** Chaîne PDF littérale, en ASCII pur : caractères non ASCII en octal WinAnsi. */
export function stringaPdf(s: string): string {
  let out = '(';
  for (const ch of s.replace(/ | /g, ' ')) {
    const c = ch.codePointAt(0)!;
    if (ch === '\\' || ch === '(' || ch === ')') out += `\\${ch}`;
    else if (c >= 32 && c < 127) out += ch;
    else { const w = WIN[ch] ?? (c >= 0xa0 && c <= 0xff ? c : 63); out += `\\${w.toString(8).padStart(3, '0')}`; }
  }
  return `${out})`;
}

const A4 = { w: 595.28, h: 841.89 }, M = 64, TOP = 780, BOTTOM = 64;
/** Met les blocs en page et rend le fichier PDF (octets). `piede` : ligne grise en bas de chaque page. */
export function creaPdf(blocchi: Blocco[], piede = ''): Uint8Array {
  const larg = A4.w - 2 * M;
  const pagine: string[][] = [[]];
  let y = TOP;
  for (const bl of blocchi) {
    const s = bl.s ?? 11, lh = s * 1.42;
    y -= bl.gap ?? 0;
    for (const riga of aCapo(bl.t, larg, s, bl.b)) {
      if (y - lh < BOTTOM) { pagine.push([]); y = TOP; }
      y -= lh;
      const w = larghezza(riga, s, bl.b);
      const x = bl.c ? M + (larg - w) / 2 : bl.r ? M + larg - w : M;
      pagine[pagine.length - 1].push(`BT /${bl.b ? 'F2' : 'F1'} ${s} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td ${stringaPdf(riga)} Tj ET`);
    }
  }
  const objs: string[] = [];
  const n = pagine.length;
  objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objs[2] = `<< /Type /Pages /Kids [${pagine.map((_, i) => `${5 + 2 * i} 0 R`).join(' ')}] /Count ${n} >>`;
  objs[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  pagine.forEach((righe, i) => {
    const pie = piede ? [`0.45 g BT /F1 8 Tf ${M} 40 Td ${stringaPdf(`${piede}${n > 1 ? `  ·  ${i + 1}/${n}` : ''}`)} Tj ET 0 g`] : [];
    const stream = [...righe, ...pie].join('\n');
    objs[5 + 2 * i] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + 2 * i} 0 R >>`;
    objs[6 + 2 * i] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });
  let out = '%PDF-1.4\n';
  const off: number[] = [];
  for (let k = 1; k < objs.length; k++) { off[k] = out.length; out += `${k} 0 obj\n${objs[k]}\nendobj\n`; }
  const xref = out.length;
  out += `xref\n0 ${objs.length}\n0000000000 65535 f \n${off.slice(1).map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  out += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return bytes;
}
