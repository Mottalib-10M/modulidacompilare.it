import type { Locale } from './routes';
const it = {
  updatedOn: 'Aggiornato il', editorialPolicy: 'Politica editoriale', contactLabel: 'Contatti', reviewedBy: 'Verificato da',
  skipToContent: 'Vai al contenuto', mainNav: 'Navigazione principale', breadcrumbLabel: 'Percorso', breadcrumbHome: 'Home', menuOpen: 'Apri il menu',
  faqTitle: 'Domande frequenti', relatedCalculators: 'Altri moduli collegati', sourcesTitle: 'Fonti', writtenBy: 'Scritto da',
  asOf: 'Norme in vigore nel', lastUpdated: 'testi riletti il', footerValidated: 'Fonti: testi di legge su Normattiva (testo non ufficiale: fa fede la Gazzetta Ufficiale)', footerBrowser: 'Nessun account · nulla di ciò che scrivi viene inviato o conservato · PDF creato nel browser · gratis',
  footerDisclaimer: 'Sito indipendente pubblicato da Radif Partners. Non è il sito di un comune, di un ministero o di un altro ente pubblico, non è uno studio legale e non vende consulenze o pratiche. I moduli sono modelli indicativi scritti sul testo di legge: non sono consulenza legale. Se l’ufficio ha un proprio modulo, usa quello.', footerPopular: '', notFound: 'Questa pagina non esiste.',
  readMore: 'Leggi tutto',
  independent: 'Sito indipendente, non è un sito pubblico: il modulo è un modello indicativo e non è consulenza legale.',
};
const en: typeof it = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related forms', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Rules in force in', lastUpdated: 'texts reread on', footerValidated: 'Sources: Italian law texts on Normattiva (unofficial text: the Gazzetta Ufficiale prevails)', footerBrowser: 'No account · nothing you type is sent or stored · PDF created in your browser · free',
  footerDisclaimer: 'Independent site published by Radif Partners. It is not the site of a comune, a ministry or any other public body, it is not a law firm and it sells no advice or paperwork service. The forms are indicative templates written from the law: they are not legal advice. If the office has its own form, use that one.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
  independent: 'Independent site, not a government site: the form is an indicative template and not legal advice.',
};
export function t(lang: Locale) { return lang === 'en' ? en : it; }
