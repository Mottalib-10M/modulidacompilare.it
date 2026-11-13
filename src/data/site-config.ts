/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://modulidacompilare.it";
export const SITE_NAMES: Record<string, string> = {"it": "Moduli da Compilare", "en": "Moduli da Compilare"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Compilare";
export const LANG_TAGS: Record<string, string> = {"it": "it-IT", "en": "en-IT"};
export const OG_LOCALES: Record<string, string> = {"it": "it_IT", "en": "en_GB"};
export const LOCALE_TAG = 'it-IT';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
/** Une locale par langue (RECETTE §4) : virgule décimale en italien, point en anglais. */
export const LOCALE_BY_LANG: Record<string, string> = { it: 'it-IT', en: 'en-GB' };
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"it": "Editore indipendente di moduli da compilare online, scritti sul testo del DPR 445/2000 e del codice civile", "en": "Independent publisher of Italian forms you fill in online, written from Presidential Decree 445/2000 and the Civil Code"};
export const AUTHOR_DESC: Record<string, string> = {"it": "Radif Partners scrive autocertificazioni, deleghe, disdette e la traccia del testamento olografo partendo dagli articoli di legge che li regolano (DPR 445/2000, codice civile, legge 431/1998, D.Lgs. 151/2015), letti su Normattiva. Il documento si compone nel browser e si scarica in PDF senza account né e-mail: nessun dato lascia il computer. Non è uno studio legale e non dà consulenza legale.", "en": "Radif Partners writes self-certifications, delegations, termination letters and the outline of a handwritten will from the articles of law that govern them (Presidential Decree 445/2000, Civil Code, Law 431/1998, Legislative Decree 151/2015), read on Normattiva. The document is put together in the browser and downloaded as a PDF with no account or e-mail: no data leaves your computer. It is not a law firm and gives no legal advice."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"it": ["Dichiarazioni sostitutive di certificazione (art. 46 DPR 445/2000)", "Dichiarazione sostitutiva di atto di notorietà (art. 47 DPR 445/2000)", "Delega e procura semplice", "Testamento olografo (art. 602 codice civile)", "Disdetta e recesso dai contratti di locazione e di servizio", "Dimissioni telematiche (art. 26 D.Lgs. 151/2015)"], "en": ["Italian self-certifications (art. 46, Presidential Decree 445/2000)", "Sworn substitute declarations (art. 47, Presidential Decree 445/2000)", "Delegations and simple powers of attorney", "Handwritten wills (art. 602, Italian Civil Code)", "Notice and withdrawal from leases and service contracts", "Online resignation in Italy (art. 26, Legislative Decree 151/2015)"]};
export const CONTACT_EMAIL = "contact@modulidacompilare.it";
export const THEME_COLOR = '#1F5F8B';
export const LOGO_SYMBOL = 'M';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '53c3eb53c8929b94bda6d05847538cc3';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',
  legalForm: '',  // vide : publication à titre personnel, pas de société
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "Partita IVA / TVA",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
