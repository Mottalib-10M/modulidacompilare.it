/** Dates en ISO (AAAA-MM-JJ), sans fuseau : tout se calcule en UTC pour ne jamais glisser d'un jour. */
const D = (iso: string) => new Date(`${iso}T00:00:00Z`);
const iso = (d: Date) => d.toISOString().slice(0, 10);
export const valida = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(D(s).getTime()) && iso(D(s)) === s;
export function aggiungiGiorni(s: string, n: number): string { const d = D(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); }
/** Ajoute des mois en gardant le jour ; un jour qui n'existe pas (31 → avril) passe au dernier jour du mois. */
export function aggiungiMesi(s: string, n: number): string {
  const d = D(s); const g = d.getUTCDate();
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  const ultimo = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  t.setUTCDate(Math.min(g, ultimo)); return iso(t);
}
export const aggiungiAnni = (s: string, n: number) => aggiungiMesi(s, 12 * n);
export function giorniTra(a: string, b: string): number { return Math.round((D(b).getTime() - D(a).getTime()) / 86400000); }
/** 05/03/2027 : la forme des documents italiens. */
export function dataIt(s: string): string { if (!valida(s)) return '__/__/____'; const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; }
export function dataLunga(s: string, lang: 'it' | 'en' = 'it'): string {
  if (!valida(s)) return lang === 'en' ? '(date)' : '(data)';
  return D(s).toLocaleDateString(lang === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
/**
 * Saisie d'une date à l'italienne (testeurs naïfs du 2026-11-14) : le champ `type="date"` suit la langue
 * du navigateur, pas celle de la page, et montrait « mm/dd/yyyy » à des Italiens, qui risquaient d'inverser
 * jour et mois sur une déclaration qui engage pénalement. Le champ est donc un texte gg/mm/aaaa ; on accepte
 * aussi « 7/4/1965 », « 07-04-1965 », « 07.04.1965 » et les seuls chiffres « 07041965 » (clavier numérique
 * du téléphone, sans barre oblique). Rend la date ISO, ou '' si elle n'existe pas.
 */
export function leggiData(s: string): string {
  const t = (s ?? '').trim();
  const m = t.match(/^(\d{1,2})\s*[/.\-\s]\s*(\d{1,2})\s*[/.\-\s]\s*(\d{4})$/) ?? t.match(/^(\d{2})(\d{2})(\d{4})$/);
  if (!m) return '';
  const [, g, me, a] = m;
  const out = `${a}-${me.padStart(2, '0')}-${g.padStart(2, '0')}`;
  const anno = Number(a);
  return valida(out) && anno >= 1900 && anno <= 2100 ? out : '';
}
