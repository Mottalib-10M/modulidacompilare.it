import { route, type Locale } from './routes';
import { PAGES, pageById, GROUPS } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  it: { home: 'Tutti i moduli', method: 'Metodo e fonti', about: 'Chi siamo', widget: 'Inserisci il modulo', contact: 'Contatti', editorial: 'Politica editoriale', privacy: 'Privacy', terms: 'Note legali', cookies: 'Cookie' },
  en: { home: 'All forms', method: 'Method and sources', about: 'About', widget: 'Embed the form', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  it: { autocertificazioni: 'Autocertificazioni', deleghe: 'Deleghe', lettere: 'Lettere e testamento' },
  en: { autocertificazioni: 'Self-certifications', deleghe: 'Delegations', lettere: 'Letters and wills' },
};
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang].nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
// Méthode : liée en bas de page et sous les outils, hors du menu du haut pour qu'il tienne sur une ligne.
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [...navCategories(lang), { label: lang === 'it' ? 'Il sito' : 'Site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) }];
export const popularLinks = (_lang: Locale): NavLink[] => [];
