/**
 * Codice fiscale delle persone fisiche (DM 23 dicembre 1976) : contrôle de forme et du caractère de
 * contrôle. Les codes « omocodici » (chiffres remplacés par des lettres LMNPQRSTUV) sont acceptés.
 * Le site ne calcule pas le code à partir du nom : il vérifie seulement une faute de frappe.
 */
const DISPARI: Record<string, number> = {
  0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
};
const pari = (c: string) => (/[0-9]/.test(c) ? Number(c) : c.charCodeAt(0) - 65);
const OMO = 'LMNPQRSTUV';
const FORMA = new RegExp(`^[A-Z]{6}[0-9${OMO}]{2}[ABCDEHLMPRST][0-9${OMO}]{2}[A-Z][0-9${OMO}]{3}[A-Z]$`);

export function normalizzaCf(s: string): string { return s.toUpperCase().replace(/[^A-Z0-9]/g, ''); }

export function carattereControllo(primi15: string): string {
  let s = 0;
  for (let i = 0; i < 15; i++) { const c = primi15[i]; s += i % 2 === 0 ? DISPARI[c] : pari(c); }
  return String.fromCharCode(65 + (s % 26));
}

export type EsitoCf = 'vuoto' | 'corto' | 'forma' | 'controllo' | 'ok';
export function verificaCf(input: string): EsitoCf {
  const cf = normalizzaCf(input);
  if (!cf) return 'vuoto';
  if (cf.length !== 16) return 'corto';
  if (!FORMA.test(cf)) return 'forma';
  return carattereControllo(cf.slice(0, 15)) === cf[15] ? 'ok' : 'controllo';
}
