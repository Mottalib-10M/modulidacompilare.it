import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, SITE_NAMES, AUTHOR_NAME } from '../data/site-config';
import { P } from '../lib/engine/params';

/** llms.txt (RECETTE §21) : le site, ses données et ses pages, généré au build depuis le registre des pages. */
export const GET: APIRoute = () => {
  const u = (p: string) => SITE_URL + p;
  const lines = [
    `# ${SITE_NAMES.it}`,
    '',
    `> Moduli italiani da compilare online pubblicati da ${AUTHOR_NAME}, sito indipendente: autocertificazioni (residenza, stato di famiglia, nascita, stato civile, titolo di studio, reddito, casellario e carichi pendenti; art. 46 DPR 445/2000), dichiarazione sostitutiva dell'atto di notorietà (art. 47), delega generica e delega al ritiro di documenti (art. 38 DPR 445/2000, art. 1392 c.c.), disdetta del contratto di affitto (legge 431/1998), lettera di disdetta di un servizio e recesso (DL 7/2007, art. 52 Codice del consumo), promemoria per le dimissioni online (art. 26 D.Lgs. 151/2015) e traccia del testamento olografo da ricopiare a mano (art. 602 c.c.) con il calcolo della quota disponibile. PDF creato nel browser, senza account; nessun dato inviato. Modelli indicativi, non è consulenza legale. Italiano e inglese.`,
    '',
    '## Fonti',
    '',
    `- DPR 28 dicembre 2000, n. 445; codice civile (art. 536-544, 602, 1392); legge 431/1998; DL 7/2007; D.Lgs. 206/2005 art. 52; D.Lgs. 151/2015 art. 26. Testi letti su Normattiva (testo non ufficiale) il ${P.retrieved_at}.`,
    `- Metodo e fonti: ${u(route('method', 'it'))}`,
    '',
    '## Pagine (italiano)',
    '',
    `- [${SITE_NAMES.it}](${u(route('home', 'it'))})`,
    ...PAGES.map((p) => `- [${p.it.h1}](${u(route(p.id, 'it'))}): ${p.it.description}`),
    '',
    '## Pages (English)',
    '',
    `- [Home](${u(route('home', 'en'))})`,
    ...PAGES.map((p) => `- [${p.en.h1}](${u(route(p.id, 'en'))}): ${p.en.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
