/**
 * Les documents du site : champs à remplir et texte composé. Le document produit est toujours en
 * italien (c'est la langue que les bureaux italiens reçoivent) ; seuls les libellés des champs
 * changent avec la langue de la page. Chaque formule suit l'article de loi cité dans le titre :
 * DPR 445/2000 art. 46, 47, 38, 75, 76 ; c.c. art. 602 ; L. 431/1998 art. 3 ; DL 7/2007 art. 1 c. 3 ;
 * Codice del consumo art. 52 ; D.Lgs. 151/2015 art. 26 (textes relus sur Normattiva le 13/11/2026).
 */
import { dataIt, dataLunga, valida } from './date';
import { inviaEntro, fineRecesso, fineServizio, preavvisoTelefonia, ultimoGiornoRecesso, revocaEntro, ultimoGiornoLavoro } from './termini';
import { verificaCf } from './cf';
import { P } from './params';

export type Lingua = 'it' | 'en';
export interface L2 { it: string; en: string }
export type Valori = Record<string, string>;
export type TipoCampo = 'testo' | 'data' | 'scelta' | 'cf' | 'area';
export interface Campo { id: string; label: L2; tipo: TipoCampo; opzioni?: Array<{ v: string; l: L2 }>; aiuto?: L2; se?: (v: Valori) => boolean; def?: string; facoltativo?: boolean }
export interface Riga { t: string; b?: boolean; c?: boolean; r?: boolean; gap?: number; s?: number }
export interface Avviso { tipo: 'ok' | 'attenzione'; testo: L2 }
export interface Composto { righe: Riga[]; avvisi: Avviso[] }
export interface Documento { id: string; nome: L2; campi: Campo[]; componi: (v: Valori) => Composto; pdf: boolean; file: string; promemoria: L2[] }

const VUOTO = '____________';
const x = (v: Valori, id: string, vuoto = VUOTO) => (v[id] ?? '').trim() || vuoto;
const F = (v: Valori, id = 'sesso') => v[id] === 'F';
const g = (v: Valori, o: string, a: string, id = 'sesso') => (F(v, id) ? a : o);
const d = (v: Valori, id: string) => (valida(v[id] ?? '') ? dataIt(v[id]) : '__/__/____');

const SESSO: Campo = { id: 'sesso', label: { it: 'Chi firma', en: 'Who signs' }, tipo: 'scelta', def: 'F', opzioni: [{ v: 'F', l: { it: 'Donna (la sottoscritta)', en: 'A woman (la sottoscritta)' } }, { v: 'M', l: { it: 'Uomo (il sottoscritto)', en: 'A man (il sottoscritto)' } }] };
const NOME: Campo = { id: 'nome', label: { it: 'Nome', en: 'First name' }, tipo: 'testo' };
const COGNOME: Campo = { id: 'cognome', label: { it: 'Cognome', en: 'Surname' }, tipo: 'testo' };
const LUOGO_N: Campo = { id: 'luogo_nascita', label: { it: 'Luogo di nascita (comune e provincia, o Stato estero)', en: 'Place of birth (town and province, or country)' }, tipo: 'testo' };
const DATA_N: Campo = { id: 'data_nascita', label: { it: 'Data di nascita', en: 'Date of birth' }, tipo: 'data' };
const CF: Campo = { id: 'cf', label: { it: 'Codice fiscale', en: 'Codice fiscale (tax code)' }, tipo: 'cf', aiuto: { it: '16 caratteri, sulla tessera sanitaria', en: '16 characters, printed on the health card' } };
const COMUNE: Campo = { id: 'comune', label: { it: 'Comune di residenza', en: 'Town of residence (comune)' }, tipo: 'testo' };
const INDIRIZZO: Campo = { id: 'indirizzo', label: { it: 'Indirizzo (via e numero civico)', en: 'Address (street and number)' }, tipo: 'testo' };
const LUOGO_F: Campo = { id: 'luogo_firma', label: { it: 'Luogo della firma', en: 'Place of signature' }, tipo: 'testo', facoltativo: true, aiuto: { it: 'Se vuoto, il comune di residenza', en: 'If empty, your town of residence' } };
const DATA_F: Campo = { id: 'data_firma', label: { it: 'Data della firma', en: 'Date of signature' }, tipo: 'data' };
const ANAGRAFICA = [SESSO, NOME, COGNOME, LUOGO_N, DATA_N, CF, COMUNE, INDIRIZZO];
const CHIUSURA = [LUOGO_F, DATA_F];

/** « La sottoscritta Maria Rossi, nata a … » : la phrase d'identité commune aux déclarations. */
function identita(v: Valori, conCf = true): string {
  const cf = (v.cf ?? '').trim() ? v.cf.trim().toUpperCase() : VUOTO;
  return `${g(v, 'Il sottoscritto', 'La sottoscritta')} ${x(v, 'nome')} ${x(v, 'cognome')}, ${g(v, 'nato', 'nata')} a ${x(v, 'luogo_nascita')} il ${d(v, 'data_nascita')}${conCf ? `, codice fiscale ${cf}` : ''}, residente a ${x(v, 'comune')} in ${x(v, 'indirizzo')},`;
}
const CONSAPEVOLE = (v: Valori) => `${g(v, 'consapevole', 'consapevole')} delle sanzioni penali previste dall'art. 76 del D.P.R. 28 dicembre 2000, n. 445, per le ipotesi di falsità in atti e dichiarazioni mendaci, e della decadenza dai benefici prevista dall'art. 75 del medesimo decreto,`;
const PRIVACY = (v: Valori) => `${g(v, 'Il dichiarante', 'La dichiarante')} dichiara di essere ${g(v, 'informato', 'informata')} che i dati personali raccolti saranno trattati, anche con strumenti informatici, esclusivamente nell'ambito del procedimento per il quale la presente dichiarazione viene resa (Regolamento UE 2016/679).`;
function firma(v: Valori, chi: string): Riga[] {
  const luogo = (v.luogo_firma ?? '').trim() || x(v, 'comune');
  return [{ t: `${luogo}, ${d(v, 'data_firma')}`, gap: 18 }, { t: chi, r: true, gap: 6 }, { t: '______________________________', r: true, gap: 22 }];
}
function avvisiComuni(v: Valori): Avviso[] {
  const out: Avviso[] = [];
  const cf = verificaCf(v.cf ?? '');
  if (cf === 'controllo') out.push({ tipo: 'attenzione', testo: { it: 'Il codice fiscale ha un carattere di controllo che non torna: ricontrolla le lettere e i numeri.', en: 'The codice fiscale check character does not match: check the letters and digits again.' } });
  if (cf === 'corto' || cf === 'forma') out.push({ tipo: 'attenzione', testo: { it: 'Il codice fiscale deve avere 16 caratteri: 6 lettere, 2 numeri, 1 lettera, 2 numeri, 1 lettera, 3 numeri, 1 lettera.', en: 'The codice fiscale has 16 characters: 6 letters, 2 digits, 1 letter, 2 digits, 1 letter, 3 digits, 1 letter.' } });
  if (cf === 'ok') out.push({ tipo: 'ok', testo: { it: 'Codice fiscale valido nella forma e nel carattere di controllo.', en: 'Codice fiscale valid in form and check character.' } });
  return out;
}
/** Déclaration de l'art. 46 : en-tête, identité, avertissement, DICHIARA, lignes propres au document. */
function art46(v: Valori, dichiara: string[]): Composto {
  return {
    righe: [
      { t: 'DICHIARAZIONE SOSTITUTIVA DI CERTIFICAZIONE', b: true, c: true, s: 13 },
      { t: '(art. 46 del D.P.R. 28 dicembre 2000, n. 445)', c: true, s: 10 },
      { t: identita(v), gap: 22 },
      { t: CONSAPEVOLE(v), gap: 6 },
      { t: 'DICHIARA', b: true, c: true, gap: 10 },
      ...dichiara.map((t, i) => ({ t, gap: i === 0 ? 10 : 4 })),
      { t: PRIVACY(v), gap: 14, s: 9.5 },
      { t: 'Dichiarazione esente dall’imposta di bollo (art. 37 del D.P.R. 445/2000).', s: 9.5, gap: 4 },
      ...firma(v, g(v, 'Il dichiarante', 'La dichiarante')),
    ],
    avvisi: avvisiComuni(v),
  };
}
const PROMEMORIA_46: L2[] = [
  { it: 'Firma a mano con la penna, oppure con firma digitale se invii il file.', en: 'Sign by hand in pen, or with a digital signature if you send the file.' },
  { it: 'Gli uffici pubblici e i gestori di pubblici servizi devono accettarla (art. 74 DPR 445/2000); un privato può chiedere il certificato.', en: 'Public offices and public-service operators must accept it (art. 74 DPR 445/2000); a private party may still ask for the certificate.' },
  { it: 'Se la invii per e-mail o PEC, o non la firmi davanti all’impiegato, allega la copia di un documento d’identità.', en: 'If you send it by e-mail or PEC, or do not sign in front of the clerk, attach a copy of an identity document.' },
];

const RAPPORTI = [
  { v: 'coniuge', l: { it: 'Coniuge o unito civilmente', en: 'Spouse or civil partner' } },
  { v: 'figlio', l: { it: 'Figlio o figlia', en: 'Son or daughter' } },
  { v: 'padre', l: { it: 'Padre', en: 'Father' } },
  { v: 'madre', l: { it: 'Madre', en: 'Mother' } },
  { v: 'fratello', l: { it: 'Fratello o sorella', en: 'Brother or sister' } },
  { v: 'convivente', l: { it: 'Convivente', en: 'Partner living with you' } },
  { v: 'altro', l: { it: 'Altro', en: 'Other' } },
];
const RAPP_IT: Record<string, string> = { coniuge: 'coniuge', figlio: 'figlio/a', padre: 'padre', madre: 'madre', fratello: 'fratello/sorella', convivente: 'convivente', altro: 'altro componente' };
const MEMBRI = [2, 3, 4, 5, 6].flatMap((k): Campo[] => [
  { id: `m${k}_nome`, label: { it: `Componente ${k}: nome e cognome`, en: `Member ${k}: full name` }, tipo: 'testo', se: (v) => Number(v.componenti) >= k },
  { id: `m${k}_nascita`, label: { it: `Componente ${k}: luogo e data di nascita`, en: `Member ${k}: place and date of birth` }, tipo: 'testo', se: (v) => Number(v.componenti) >= k, aiuto: { it: 'Esempio: Torino, 04/07/2012', en: 'Example: Torino, 04/07/2012' } },
  { id: `m${k}_rapporto`, label: { it: `Componente ${k}: rapporto con te`, en: `Member ${k}: relationship to you` }, tipo: 'scelta', def: k === 2 ? 'coniuge' : 'figlio', opzioni: RAPPORTI, se: (v) => Number(v.componenti) >= k },
]);

export const DOCUMENTI: Documento[] = [
  {
    id: 'residenza', file: 'autocertificazione-residenza', pdf: true,
    nome: { it: 'Autocertificazione di residenza', en: 'Self-certification of residence' },
    campi: [...ANAGRAFICA, { id: 'dal', label: { it: 'Residente dal (facoltativo)', en: 'Resident since (optional)' }, tipo: 'data', facoltativo: true }, ...CHIUSURA],
    componi: (v) => art46(v, [`di essere ${g(v, 'residente', 'residente')} nel Comune di ${x(v, 'comune')}, in ${x(v, 'indirizzo')}${valida(v.dal ?? '') ? `, dal ${dataIt(v.dal)}` : ''}.`]),
    promemoria: PROMEMORIA_46,
  },
  {
    id: 'famiglia', file: 'autocertificazione-stato-di-famiglia', pdf: true,
    nome: { it: 'Autocertificazione dello stato di famiglia', en: 'Family status self-certification' },
    campi: [...ANAGRAFICA, { id: 'componenti', label: { it: 'Persone nella famiglia anagrafica, tu compreso', en: 'People in the registered household, you included' }, tipo: 'scelta', def: '3', opzioni: ['1', '2', '3', '4', '5', '6'].map((n) => ({ v: n, l: { it: n === '1' ? '1 (vivo da solo)' : n, en: n === '1' ? '1 (I live alone)' : n } })) }, ...MEMBRI, ...CHIUSURA],
    componi: (v) => {
      const n = Number(v.componenti) || 1;
      const righe = [`che la propria famiglia anagrafica, residente a ${x(v, 'comune')} in ${x(v, 'indirizzo')}, è così composta:`, `1. ${x(v, 'nome')} ${x(v, 'cognome')}, ${g(v, 'nato', 'nata')} a ${x(v, 'luogo_nascita')} il ${d(v, 'data_nascita')}, ${g(v, 'dichiarante', 'dichiarante')};`];
      for (let k = 2; k <= n; k++) righe.push(`${k}. ${x(v, `m${k}_nome`)}, ${x(v, `m${k}_nascita`)}, ${RAPP_IT[v[`m${k}_rapporto`]] ?? 'componente'}${k === n ? '.' : ';'}`);
      if (n === 1) righe[1] = righe[1].replace(/;$/, '.');
      return art46(v, n === 1 ? [`che la propria famiglia anagrafica, residente a ${x(v, 'comune')} in ${x(v, 'indirizzo')}, è composta ${g(v, 'dal solo dichiarante', 'dalla sola dichiarante')}.`] : righe);
    },
    promemoria: [{ it: 'La famiglia anagrafica è quella registrata in anagrafe allo stesso indirizzo, non la parentela: scrivi solo chi risulta nel tuo stato di famiglia.', en: 'The registered household is the one recorded at the registry office at the same address, not your wider family: list only the people on your household record.' }, ...PROMEMORIA_46.slice(0, 2)],
  },
  {
    id: 'nascita', file: 'autocertificazione-nascita', pdf: true,
    nome: { it: 'Autocertificazione di nascita', en: 'Birth self-certification' },
    campi: [...ANAGRAFICA, { id: 'chi', label: { it: 'Nascita di chi', en: 'Whose birth' }, tipo: 'scelta', def: 'me', opzioni: [{ v: 'me', l: { it: 'La mia (data e luogo di nascita)', en: 'Mine (date and place of birth)' } }, { v: 'figlio', l: { it: 'Di mio figlio o mia figlia', en: 'My son or daughter' } }] },
      { id: 'f_nome', label: { it: 'Nome e cognome del figlio o della figlia', en: 'Child’s full name' }, tipo: 'testo', se: (v) => v.chi === 'figlio' },
      { id: 'f_luogo', label: { it: 'Luogo di nascita del figlio o della figlia', en: 'Child’s place of birth' }, tipo: 'testo', se: (v) => v.chi === 'figlio' },
      { id: 'f_data', label: { it: 'Data di nascita del figlio o della figlia', en: 'Child’s date of birth' }, tipo: 'data', se: (v) => v.chi === 'figlio' }, ...CHIUSURA],
    componi: (v) => art46(v, [v.chi === 'figlio' ? `che in data ${d(v, 'f_data')} a ${x(v, 'f_luogo')} è nato/a il proprio figlio/la propria figlia ${x(v, 'f_nome')}.` : `di essere ${g(v, 'nato', 'nata')} a ${x(v, 'luogo_nascita')} il ${d(v, 'data_nascita')}.`]),
    promemoria: PROMEMORIA_46,
  },
  {
    id: 'civile', file: 'autocertificazione-stato-civile', pdf: true,
    nome: { it: 'Autocertificazione dello stato civile', en: 'Marital status self-certification' },
    campi: [...ANAGRAFICA, { id: 'stato', label: { it: 'Stato civile', en: 'Marital status' }, tipo: 'scelta', def: 'libero', opzioni: [
      { v: 'celibe', l: { it: 'Celibe o nubile (mai sposato)', en: 'Never married (celibe / nubile)' } },
      { v: 'coniugato', l: { it: 'Coniugato o coniugata', en: 'Married (coniugato/a)' } },
      { v: 'unito', l: { it: 'Unito o unita civilmente', en: 'In a civil union (unito/a civilmente)' } },
      { v: 'vedovo', l: { it: 'Vedovo o vedova', en: 'Widowed (vedovo/a)' } },
      { v: 'libero', l: { it: 'Stato libero (dopo divorzio o scioglimento)', en: 'Free status (after divorce or dissolution)' } }] },
      { id: 'coniuge', label: { it: 'Nome e cognome del coniuge o dell’unito civilmente', en: 'Spouse’s or civil partner’s full name' }, tipo: 'testo', se: (v) => ['coniugato', 'unito', 'vedovo'].includes(v.stato) },
      { id: 'luogo_m', label: { it: 'Comune del matrimonio o dell’unione', en: 'Town of the marriage or union' }, tipo: 'testo', se: (v) => ['coniugato', 'unito'].includes(v.stato) },
      { id: 'data_m', label: { it: 'Data del matrimonio o dell’unione', en: 'Date of the marriage or union' }, tipo: 'data', se: (v) => ['coniugato', 'unito'].includes(v.stato) }, ...CHIUSURA],
    componi: (v) => {
      const s = v.stato;
      const t = s === 'celibe' ? `di essere ${g(v, 'celibe', 'nubile')}.`
        : s === 'coniugato' ? `di essere ${g(v, 'coniugato', 'coniugata')} con ${x(v, 'coniuge')}, matrimonio celebrato a ${x(v, 'luogo_m')} il ${d(v, 'data_m')}.`
          : s === 'unito' ? `di essere ${g(v, 'unito', 'unita')} civilmente con ${x(v, 'coniuge')}, unione costituita a ${x(v, 'luogo_m')} il ${d(v, 'data_m')}.`
            : s === 'vedovo' ? `di essere ${g(v, 'vedovo', 'vedova')} di ${x(v, 'coniuge')}.`
              : 'di trovarsi in stato libero.';
      return art46(v, [t]);
    },
    promemoria: [{ it: 'Chi è separato resta coniugato finché non c’è il divorzio: in quel caso scegli «coniugato».', en: 'A separated person stays married until the divorce: choose «married» in that case.' }, ...PROMEMORIA_46.slice(0, 2)],
  },
  {
    id: 'studio', file: 'autocertificazione-titolo-di-studio', pdf: true,
    nome: { it: 'Autocertificazione del titolo di studio', en: 'Education qualification self-certification' },
    campi: [...ANAGRAFICA,
      { id: 'titolo', label: { it: 'Titolo di studio', en: 'Qualification' }, tipo: 'testo', aiuto: { it: 'Esempio: diploma di liceo scientifico, laurea magistrale in Economia (LM-77)', en: 'Example: liceo scientifico diploma, master’s degree in Economics (LM-77)' } },
      { id: 'istituto', label: { it: 'Scuola o università', en: 'School or university' }, tipo: 'testo' },
      { id: 'sede', label: { it: 'Città della scuola o dell’università', en: 'City of the school or university' }, tipo: 'testo' },
      { id: 'anno', label: { it: 'Anno o data del conseguimento', en: 'Year or date awarded' }, tipo: 'testo' },
      { id: 'voto', label: { it: 'Votazione (facoltativa)', en: 'Final mark (optional)' }, tipo: 'testo', facoltativo: true }, ...CHIUSURA],
    componi: (v) => art46(v, [`di aver conseguito il titolo di studio di ${x(v, 'titolo')} presso ${x(v, 'istituto')} di ${x(v, 'sede')}, nell’anno ${x(v, 'anno')}${(v.voto ?? '').trim() ? `, con la votazione di ${v.voto.trim()}` : ''}.`]),
    promemoria: [{ it: 'Un titolo preso all’estero non si autocertifica come titolo italiano: serve la dichiarazione di valore o l’equipollenza.', en: 'A qualification obtained abroad cannot be self-certified as an Italian one: you need a declaration of value or recognition.' }, ...PROMEMORIA_46.slice(0, 2)],
  },
  {
    id: 'reddito', file: 'autocertificazione-reddito', pdf: true,
    nome: { it: 'Autocertificazione del reddito', en: 'Income self-certification' },
    campi: [...ANAGRAFICA,
      { id: 'anno', label: { it: 'Anno dei redditi', en: 'Income year' }, tipo: 'testo', def: '2025' },
      { id: 'tipo', label: { it: 'Cosa dichiari', en: 'What you declare' }, tipo: 'scelta', def: 'complessivo', opzioni: [
        { v: 'complessivo', l: { it: 'Reddito complessivo', en: 'Total income (reddito complessivo)' } },
        { v: 'imponibile', l: { it: 'Reddito imponibile ai fini IRPEF', en: 'Taxable income for IRPEF' } },
        { v: 'nessuno', l: { it: 'Nessun reddito nell’anno', en: 'No income in the year' } }] },
      { id: 'importo', label: { it: 'Importo in euro', en: 'Amount in euros' }, tipo: 'testo', se: (v) => v.tipo !== 'nessuno', aiuto: { it: 'Come scritto nella dichiarazione, per esempio 18.540,00', en: 'As written in your tax return, for example 18.540,00' } },
      { id: 'fonte', label: { it: 'Dove si legge', en: 'Where it is shown' }, tipo: 'scelta', def: '730', se: (v) => v.tipo !== 'nessuno', opzioni: [
        { v: '730', l: { it: 'Modello 730', en: 'Form 730' } }, { v: 'redditi', l: { it: 'Modello Redditi Persone fisiche', en: 'Form Redditi PF' } }, { v: 'cu', l: { it: 'Certificazione Unica', en: 'Certificazione Unica (CU)' } }, { v: 'nessuna', l: { it: 'Non indicarlo', en: 'Do not state it' } }] },
      { id: 'scopo', label: { it: 'Per quale pratica (facoltativo)', en: 'For which procedure (optional)' }, tipo: 'testo', facoltativo: true }, ...CHIUSURA],
    componi: (v) => {
      const fonte: Record<string, string> = { '730': ', come risulta dal Modello 730', redditi: ', come risulta dal Modello Redditi Persone fisiche', cu: ', come risulta dalla Certificazione Unica', nessuna: '' };
      const scopo = (v.scopo ?? '').trim() ? ` La presente dichiarazione è resa ai fini di: ${v.scopo.trim()}.` : '';
      const t = v.tipo === 'nessuno' ? `di non aver percepito redditi nell’anno ${x(v, 'anno')}.${scopo}`
        : `che il proprio ${v.tipo === 'imponibile' ? 'reddito imponibile ai fini IRPEF' : 'reddito complessivo'} relativo all’anno ${x(v, 'anno')} ammonta a euro ${x(v, 'importo')}${fonte[v.fonte] ?? ''}.${scopo}`;
      return art46(v, [t]);
    },
    promemoria: [{ it: 'Per l’ISEE non basta un’autocertificazione: serve la DSU all’INPS.', en: 'For the ISEE a self-certification is not enough: you file the DSU with INPS.' }, ...PROMEMORIA_46.slice(0, 2)],
  },
  {
    id: 'penale', file: 'autocertificazione-carichi-pendenti', pdf: true,
    nome: { it: 'Autocertificazione di casellario e carichi pendenti', en: 'Criminal record self-certification' },
    campi: [...ANAGRAFICA, { id: 'cosa', label: { it: 'Cosa dichiari', en: 'What you declare' }, tipo: 'scelta', def: 'entrambe', opzioni: [
      { v: 'entrambe', l: { it: 'Nessuna condanna e nessun procedimento noto', en: 'No convictions and no known proceedings' } },
      { v: 'condanne', l: { it: 'Solo: nessuna condanna (casellario)', en: 'Only: no convictions (criminal record)' } },
      { v: 'carichi', l: { it: 'Solo: nessun procedimento noto (carichi pendenti)', en: 'Only: no known proceedings (pending charges)' } }] }, ...CHIUSURA],
    componi: (v) => {
      const aa = `di non aver riportato condanne penali e di non essere ${g(v, 'destinatario', 'destinataria')} di provvedimenti che riguardano l'applicazione di misure di sicurezza e di misure di prevenzione, di decisioni civili e di provvedimenti amministrativi iscritti nel casellario giudiziale ai sensi della vigente normativa (art. 46, lettera aa);`;
      const bb = `di non essere a conoscenza di essere ${g(v, 'sottoposto', 'sottoposta')} a procedimenti penali (art. 46, lettera bb).`;
      return art46(v, v.cosa === 'condanne' ? [aa.replace(/;$/, '.')] : v.cosa === 'carichi' ? [bb] : [aa, bb]);
    },
    promemoria: [{ it: 'Se hai una condanna, non usare questo testo: la formula «non aver riportato condanne» sarebbe falsa. Chiedi il certificato del casellario.', en: 'If you have a conviction, do not use this text: «no convictions» would be false. Ask for the criminal record certificate instead.' }, ...PROMEMORIA_46.slice(0, 2)],
  },
  {
    id: 'notorieta', file: 'dichiarazione-sostitutiva-atto-di-notorieta', pdf: true,
    nome: { it: 'Dichiarazione sostitutiva dell’atto di notorietà', en: 'Sworn substitute declaration (art. 47)' },
    campi: [...ANAGRAFICA, { id: 'modello', label: { it: 'Tipo di dichiarazione', en: 'Kind of declaration' }, tipo: 'scelta', def: 'libera', opzioni: [
      { v: 'libera', l: { it: 'Fatti a mia diretta conoscenza (testo libero)', en: 'Facts I know first-hand (free text)' } },
      { v: 'smarrimento', l: { it: 'Smarrimento di un documento', en: 'Loss of a document' } }] },
      { id: 'fatti', label: { it: 'Cosa dichiari', en: 'What you declare' }, tipo: 'area', se: (v) => v.modello !== 'smarrimento', aiuto: { it: 'Fatti precisi, con date e luoghi. Il testo resta in italiano.', en: 'Precise facts, with dates and places. Write it in Italian.' } },
      { id: 'documento', label: { it: 'Documento smarrito (tipo e numero)', en: 'Lost document (type and number)' }, tipo: 'testo', se: (v) => v.modello === 'smarrimento' },
      { id: 'quando', label: { it: 'Data e luogo dello smarrimento', en: 'Date and place of the loss' }, tipo: 'testo', se: (v) => v.modello === 'smarrimento' },
      { id: 'destinatario', label: { it: 'Ufficio a cui la presenti (facoltativo)', en: 'Office you hand it to (optional)' }, tipo: 'testo', facoltativo: true }, ...CHIUSURA],
    componi: (v) => {
      const dich = v.modello === 'smarrimento' ? `di aver smarrito il seguente documento: ${x(v, 'documento')}, in data e luogo: ${x(v, 'quando')}, e di richiederne il duplicato.` : x(v, 'fatti', '__________________________________________');
      const dest = (v.destinatario ?? '').trim();
      return {
        righe: [
          { t: 'DICHIARAZIONE SOSTITUTIVA DELL’ATTO DI NOTORIETÀ', b: true, c: true, s: 13 },
          { t: '(art. 47 del D.P.R. 28 dicembre 2000, n. 445)', c: true, s: 10 },
          ...(dest ? [{ t: `Alla c.a. di: ${dest}`, r: true, gap: 10 }] : []),
          { t: identita(v), gap: 22 }, { t: CONSAPEVOLE(v), gap: 6 },
          { t: 'DICHIARA', b: true, c: true, gap: 10 }, { t: dich, gap: 10 },
          { t: PRIVACY(v), gap: 14, s: 9.5 },
          { t: 'Si allega copia fotostatica non autenticata di un documento di identità in corso di validità (art. 38, comma 3, D.P.R. 445/2000).', s: 9.5, gap: 4 },
          ...firma(v, g(v, 'Il dichiarante', 'La dichiarante')),
        ], avvisi: avvisiComuni(v),
      };
    },
    promemoria: [{ it: 'Allega la copia del documento d’identità oppure firma davanti all’impiegato (art. 38, comma 3).', en: 'Attach a copy of your identity document or sign in front of the clerk (art. 38(3)).' }, { it: 'Puoi dichiarare anche fatti che riguardano altre persone, se li conosci direttamente (art. 47, comma 2).', en: 'You may also declare facts about other people if you know them first-hand (art. 47(2)).' }, PROMEMORIA_46[1]],
  },
  ...deleghe(),
  {
    id: 'testamento', file: 'traccia-testamento-olografo', pdf: false,
    nome: { it: 'Traccia del testamento olografo', en: 'Handwritten will outline' },
    campi: [SESSO, NOME, COGNOME, LUOGO_N, DATA_N,
      { id: 'modello', label: { it: 'Come dividere', en: 'How to divide' }, tipo: 'scelta', def: 'universale', opzioni: [
        { v: 'universale', l: { it: 'Un solo erede di tutto', en: 'One heir of everything' } },
        { v: 'parti', l: { it: 'Più eredi in parti uguali', en: 'Several heirs in equal shares' } },
        { v: 'legato', l: { it: 'Un bene a una persona, il resto a un erede', en: 'One item to one person, the rest to an heir' } }] },
      { id: 'erede1', label: { it: 'Erede (nome, cognome, data di nascita)', en: 'Heir (name, surname, date of birth)' }, tipo: 'testo' },
      { id: 'erede2', label: { it: 'Secondo erede', en: 'Second heir' }, tipo: 'testo', se: (v) => v.modello === 'parti' },
      { id: 'erede3', label: { it: 'Terzo erede (facoltativo)', en: 'Third heir (optional)' }, tipo: 'testo', facoltativo: true, se: (v) => v.modello === 'parti' },
      { id: 'bene', label: { it: 'Bene lasciato (descrizione precisa)', en: 'Item left (precise description)' }, tipo: 'testo', se: (v) => v.modello === 'legato' },
      { id: 'legatario', label: { it: 'A chi va quel bene', en: 'Who receives that item' }, tipo: 'testo', se: (v) => v.modello === 'legato' },
      { id: 'revoca', label: { it: 'Revocare i testamenti precedenti', en: 'Revoke earlier wills' }, tipo: 'scelta', def: 'si', opzioni: [{ v: 'si', l: { it: 'Sì', en: 'Yes' } }, { v: 'no', l: { it: 'No', en: 'No' } }] },
      { id: 'luogo_firma', label: { it: 'Luogo', en: 'Place' }, tipo: 'testo' }, DATA_F],
    componi: (v) => {
      const io = `Io ${g(v, 'sottoscritto', 'sottoscritta')} ${x(v, 'nome')} ${x(v, 'cognome')}, ${g(v, 'nato', 'nata')} a ${x(v, 'luogo_nascita')} il ${d(v, 'data_nascita')}, dispongo dei miei beni per il tempo in cui avrò cessato di vivere.`;
      const eredi = [v.erede1, v.erede2, v.erede3].map((e) => (e ?? '').trim()).filter(Boolean);
      const elenco = eredi.length > 1 ? `${eredi.slice(0, -1).join(', ')} e ${eredi[eredi.length - 1]}` : (eredi[0] || VUOTO);
      const disp = v.modello === 'parti' ? `Nomino miei eredi, in parti uguali tra loro, ${elenco}.`
        : v.modello === 'legato' ? `Lascio a ${x(v, 'legatario')} il seguente bene: ${x(v, 'bene')}. Nomino ${x(v, 'erede1')} erede di tutti gli altri miei beni.`
          : `Nomino ${x(v, 'erede1')} erede universale di tutti i miei beni.`;
      const gg = valida(v.data_firma ?? '') ? dataLunga(v.data_firma) : 'giorno, mese e anno in lettere o in cifre';
      return {
        righe: [
          { t: 'Testamento', b: true, c: true, s: 13 },
          { t: io, gap: 14 },
          ...(v.revoca !== 'no' ? [{ t: 'Revoco ogni mia precedente disposizione testamentaria.', gap: 6 }] : []),
          { t: disp, gap: 6 },
          { t: `${x(v, 'luogo_firma')}, ${gg}`, gap: 18 },
          { t: `${x(v, 'nome')} ${x(v, 'cognome')} (firma)`, r: true, gap: 8 },
        ],
        avvisi: [{ tipo: 'attenzione', testo: { it: 'Questo è solo un testo da ricopiare a mano: stampato o scritto al computer il testamento è nullo (art. 602 e 606 c.c.).', en: 'This is only a text to copy out by hand: printed or typed, the will is void (art. 602 and 606 Civil Code).' } }],
      };
    },
    promemoria: [
      { it: 'Ricopia tutto a mano, con la tua grafia, su un foglio di carta: niente computer né moduli prestampati (art. 602 c.c.).', en: 'Copy everything out by hand, in your own handwriting, on paper: no computer and no pre-printed form (art. 602 Civil Code).' },
      { it: 'Scrivi la data con giorno, mese e anno, e firma alla fine, dopo l’ultima disposizione.', en: 'Write the date with day, month and year, and sign at the end, after the last provision.' },
      { it: 'Controlla la quota riservata a coniuge e figli: il calcolo è più sotto nella pagina.', en: 'Check the share reserved to spouse and children: the calculation is further down the page.' },
      { it: 'Conservalo dove verrà trovato: da un notaio o da una persona di fiducia. Chi lo trova lo porta a un notaio per la pubblicazione (art. 620 c.c.).', en: 'Keep it where it will be found: with a notary or a trusted person. Whoever finds it takes it to a notary to be published (art. 620 Civil Code).' },
    ],
  },
  disdettaAffitto(),
  disdettaServizio(),
  dimissioni(),
];

function deleghe(): Documento[] {
  const delegato: Campo[] = [
    { id: 'sesso_d', label: { it: 'Persona delegata', en: 'Person you delegate' }, tipo: 'scelta', def: 'M', opzioni: [{ v: 'M', l: { it: 'Uomo (il delegato)', en: 'A man (il delegato)' } }, { v: 'F', l: { it: 'Donna (la delegata)', en: 'A woman (la delegata)' } }] },
    { id: 'd_nome', label: { it: 'Nome e cognome del delegato', en: 'Delegate’s full name' }, tipo: 'testo' },
    { id: 'd_nascita', label: { it: 'Luogo e data di nascita del delegato', en: 'Delegate’s place and date of birth' }, tipo: 'testo', aiuto: { it: 'Esempio: Bari, 12/03/1990', en: 'Example: Bari, 12/03/1990' } },
    { id: 'd_doc', label: { it: 'Documento del delegato (tipo e numero)', en: 'Delegate’s ID (type and number)' }, tipo: 'testo', aiuto: { it: 'Esempio: carta d’identità n. CA12345AB', en: 'Example: carta d’identità n. CA12345AB' } },
  ];
  const testo = (v: Valori, cosa: string, presso: string) => {
    const fino = valida(v.fino ?? '') ? `, fino al ${dataIt(v.fino)}` : '';
    return {
      righe: [
        { t: 'DELEGA', b: true, c: true, s: 13 },
        ...(presso ? [{ t: `Spett.le ${presso}`, r: true, gap: 10 }] : []),
        { t: identita(v), gap: 18 },
        { t: 'DELEGA', b: true, c: true, gap: 8 },
        { t: `${g(v, 'il signor', 'la signora', 'sesso_d')} ${x(v, 'd_nome')}, ${g(v, 'nato', 'nata', 'sesso_d')} a ${x(v, 'd_nascita')}, ${g(v, 'identificato', 'identificata', 'sesso_d')} con ${x(v, 'd_doc')},`, gap: 8 },
        { t: `${cosa}${fino}.`, gap: 4 },
        { t: `Si allega copia del documento d’identità ${g(v, 'del delegante', 'della delegante')}. ${g(v, 'Il delegato', 'La delegata', 'sesso_d')} esibirà il proprio documento d’identità al momento della presentazione.`, gap: 10, s: 9.5 },
        ...firma(v, g(v, 'Il delegante', 'La delegante')),
        { t: `Firma ${g(v, 'del delegato', 'della delegata', 'sesso_d')} per accettazione`, r: true, gap: 4 },
        { t: '______________________________', r: true, gap: 18 },
      ], avvisi: avvisiComuni(v),
    };
  };
  const fino: Campo = { id: 'fino', label: { it: 'Valida fino al (facoltativo)', en: 'Valid until (optional)' }, tipo: 'data', facoltativo: true };
  const ENTI: Record<string, string> = { comune: 'Ufficio anagrafe del Comune di', scuola: 'Segreteria della scuola', universita: 'Segreteria studenti dell’università', posta: 'Ufficio postale di', inps: 'INPS, sede di', entrate: 'Agenzia delle entrate, ufficio di', banca: 'Banca', altro: '' };
  return [
    {
      id: 'delega', file: 'delega-generica', pdf: true,
      nome: { it: 'Delega generica', en: 'General delegation letter' },
      campi: [...ANAGRAFICA, ...delegato,
        { id: 'attivita', label: { it: 'Cosa può fare il delegato', en: 'What the delegate may do' }, tipo: 'area', aiuto: { it: 'Comincia con «a»: a presentare…, a ritirare…, a firmare…', en: 'Start with «a» (to): a presentare…, a ritirare… Write it in Italian.' } },
        { id: 'ente', label: { it: 'Presso quale ufficio o soggetto', en: 'At which office or body' }, tipo: 'testo' }, fino, ...CHIUSURA],
      componi: (v) => testo(v, `${x(v, 'attivita', 'a __________________________')} presso ${x(v, 'ente')}, in ${g(v, 'mio', 'mio')} nome e per mio conto`, (v.ente ?? '').trim()),
      promemoria: [{ it: 'Allega la copia del tuo documento d’identità; il delegato porta il suo (art. 38, comma 3-bis, DPR 445/2000).', en: 'Attach a copy of your ID; the delegate brings theirs (art. 38(3-bis) DPR 445/2000).' }, { it: 'Per vendere una casa o firmare un contratto che richiede l’atto notarile serve una procura dal notaio (art. 1392 c.c.).', en: 'To sell a house or sign a contract that needs a notarial deed you need a power of attorney from a notary (art. 1392 Civil Code).' }],
    },
    {
      id: 'ritiro', file: 'delega-ritiro-documenti', pdf: true,
      nome: { it: 'Delega per il ritiro di documenti', en: 'Delegation to collect documents' },
      campi: [...ANAGRAFICA, ...delegato,
        { id: 'tipo_ente', label: { it: 'Dove si ritira', en: 'Where it is collected' }, tipo: 'scelta', def: 'comune', opzioni: [
          { v: 'comune', l: { it: 'Comune (anagrafe, carta d’identità)', en: 'Comune (registry office, ID card)' } }, { v: 'scuola', l: { it: 'Scuola', en: 'School' } }, { v: 'universita', l: { it: 'Università', en: 'University' } },
          { v: 'posta', l: { it: 'Ufficio postale', en: 'Post office' } }, { v: 'inps', l: { it: 'INPS', en: 'INPS' } }, { v: 'entrate', l: { it: 'Agenzia delle entrate', en: 'Revenue Agency' } }, { v: 'banca', l: { it: 'Banca', en: 'Bank' } }, { v: 'altro', l: { it: 'Altro ufficio', en: 'Other office' } }] },
        { id: 'sede_ente', label: { it: 'Nome o città dell’ufficio', en: 'Name or town of the office' }, tipo: 'testo' },
        { id: 'documento', label: { it: 'Cosa ritirare', en: 'What to collect' }, tipo: 'testo', aiuto: { it: 'Esempio: carta d’identità elettronica; raccomandata n. …', en: 'Example: carta d’identità elettronica; raccomandata n. …' } }, fino, ...CHIUSURA],
      componi: (v) => {
        const ente = `${ENTI[v.tipo_ente] ?? ''} ${(v.sede_ente ?? '').trim()}`.trim();
        return testo(v, `a ritirare in ${g(v, 'mio', 'mio')} nome e per mio conto ${x(v, 'documento')} presso ${ente || VUOTO}`, ente);
      },
      promemoria: [{ it: 'Chiedi prima all’ufficio se ha un proprio modulo di delega: alcuni lo richiedono.', en: 'Ask the office first whether it has its own delegation form: some require it.' }, { it: 'Il delegato porta il proprio documento d’identità e la copia del tuo.', en: 'The delegate brings their own ID and a copy of yours.' }],
    },
  ];
}

function disdettaAffitto(): Documento {
  return {
    id: 'affitto', file: 'disdetta-contratto-affitto', pdf: true,
    nome: { it: 'Disdetta del contratto di affitto (inquilino)', en: 'Lease termination letter (tenant)' },
    campi: [SESSO, NOME, COGNOME, { id: 'indirizzo', label: { it: 'Indirizzo dell’appartamento in affitto', en: 'Address of the rented flat' }, tipo: 'testo' }, COMUNE,
      { id: 'locatore', label: { it: 'Proprietario (nome e cognome o società)', en: 'Landlord (name or company)' }, tipo: 'testo' },
      { id: 'loc_indirizzo', label: { it: 'Indirizzo del proprietario', en: 'Landlord’s address' }, tipo: 'testo' },
      { id: 'data_contratto', label: { it: 'Data del contratto', en: 'Date of the lease' }, tipo: 'data' },
      { id: 'registrazione', label: { it: 'Estremi di registrazione (facoltativi)', en: 'Registration details (optional)' }, tipo: 'testo', facoltativo: true },
      { id: 'modo', label: { it: 'Perché lasci la casa', en: 'Why you are leaving' }, tipo: 'scelta', def: 'clausola', opzioni: [
        { v: 'clausola', l: { it: 'Recesso previsto dal contratto', en: 'Notice clause in the lease' } },
        { v: 'gravi', l: { it: 'Gravi motivi (6 mesi, legge 431/1998)', en: 'Serious reasons (6 months, Law 431/1998)' } },
        { v: 'scadenza', l: { it: 'Alla scadenza del contratto', en: 'At the end of the lease term' } }] },
      { id: 'mesi', label: { it: 'Mesi di preavviso scritti nel contratto', en: 'Months of notice in the lease' }, tipo: 'scelta', def: '6', se: (v) => v.modo === 'clausola', opzioni: ['1', '2', '3', '4', '5', '6'].map((n) => ({ v: n, l: { it: n, en: n } })) },
      { id: 'motivi', label: { it: 'Gravi motivi, in breve', en: 'Serious reasons, briefly' }, tipo: 'testo', se: (v) => v.modo === 'gravi', aiuto: { it: 'Esempio: trasferimento di lavoro a Milano dal 1° marzo', en: 'Example: job transfer to Milan from 1 March. In Italian.' } },
      { id: 'scadenza', label: { it: 'Data di scadenza del contratto', en: 'Lease end date' }, tipo: 'data', se: (v) => v.modo === 'scadenza' },
      { id: 'data_firma', label: { it: 'Data di invio della lettera', en: 'Date you send the letter' }, tipo: 'data' }],
    componi: (v) => {
      const invio = v.data_firma ?? '';
      const avvisi: Avviso[] = [];
      let effetto = '';
      if (v.modo === 'scadenza') {
        if (valida(v.scadenza ?? '')) {
          const entro = inviaEntro(v.scadenza, P.preavviso_locatore_mesi);
          effetto = `con effetto dalla scadenza del ${dataIt(v.scadenza)}`;
          avvisi.push(valida(invio) && invio > entro
            ? { tipo: 'attenzione', testo: { it: `Per la scadenza del ${dataIt(v.scadenza)} la lettera doveva arrivare entro il ${dataIt(entro)} (sei mesi prima, art. 2 legge 431/1998): leggi il tuo contratto o usa il recesso.`, en: `For the ${dataIt(v.scadenza)} end date the letter had to arrive by ${dataIt(entro)} (six months before, art. 2 Law 431/1998): check your lease or use the notice clause.` } }
            : { tipo: 'ok', testo: { it: `Deve arrivare al proprietario entro il ${dataIt(entro)}.`, en: `It must reach the landlord by ${dataIt(entro)}.` } });
        } else effetto = 'con effetto dalla scadenza contrattuale';
      } else {
        const mesi = v.modo === 'gravi' ? P.recesso_gravi_motivi_mesi : Number(v.mesi) || 6;
        const fine = valida(invio) ? fineRecesso(invio, mesi) : '';
        effetto = `con preavviso di ${mesi} ${mesi === 1 ? 'mese' : 'mesi'}${fine ? `, e quindi con rilascio dell’immobile entro il ${dataIt(fine)}` : ''}`;
        if (fine) avvisi.push({ tipo: 'ok', testo: { it: `Se la lettera arriva il ${dataIt(invio)}, il contratto finisce il ${dataIt(fine)}. Il preavviso decorre dal ricevimento.`, en: `If the letter arrives on ${dataIt(invio)}, the lease ends on ${dataIt(fine)}. Notice runs from receipt.` } });
      }
      const motivo = v.modo === 'gravi' ? ` per i seguenti gravi motivi: ${x(v, 'motivi')}, ai sensi dell’art. 3, comma 6, della legge 9 dicembre 1998, n. 431` : v.modo === 'clausola' ? ', come previsto dal contratto' : '';
      const reg = (v.registrazione ?? '').trim() ? `, registrato ${v.registrazione.trim()}` : '';
      return {
        righe: [
          { t: `${x(v, 'nome')} ${x(v, 'cognome')}` }, { t: `${x(v, 'indirizzo')}, ${x(v, 'comune')}` },
          { t: `Spett.le ${x(v, 'locatore')}`, r: true, gap: 16 }, { t: x(v, 'loc_indirizzo'), r: true },
          { t: 'Raccomandata con avviso di ricevimento (o PEC)', r: true, s: 9.5, gap: 4 },
          { t: `Oggetto: disdetta del contratto di locazione dell’immobile in ${x(v, 'indirizzo')}, ${x(v, 'comune')}`, b: true, gap: 20 },
          { t: `${g(v, 'Il sottoscritto', 'La sottoscritta')} ${x(v, 'nome')} ${x(v, 'cognome')}, conduttore dell’immobile in oggetto in forza del contratto di locazione stipulato il ${d(v, 'data_contratto')}${reg}, comunica la disdetta del contratto${motivo}, ${effetto}.`, gap: 12 },
          { t: 'Chiedo di concordare la data del sopralluogo e della riconsegna delle chiavi, e la restituzione del deposito cauzionale con gli interessi maturati, dedotte le eventuali somme dovute.', gap: 6 },
          { t: 'Distinti saluti.', gap: 6 },
          { t: `${x(v, 'comune')}, ${d(v, 'data_firma')}`, gap: 16 }, { t: '______________________________', r: true, gap: 22 },
        ], avvisi,
      };
    },
    promemoria: [{ it: 'Invia la lettera con raccomandata A/R o PEC: la data di ricevimento è quella che conta.', en: 'Send the letter by recorded delivery (raccomandata A/R) or PEC: the date of receipt is what counts.' }, { it: 'Registrare la cessazione del contratto all’Agenzia delle entrate spetta di norma a chi ha registrato il contratto: chiedilo al proprietario.', en: 'Registering the end of the lease with the Revenue Agency is usually done by whoever registered it: ask the landlord.' }],
  };
}

function disdettaServizio(): Documento {
  return {
    id: 'servizio', file: 'lettera-di-disdetta', pdf: true,
    nome: { it: 'Lettera di disdetta di un servizio', en: 'Cancellation letter for a service' },
    campi: [SESSO, NOME, COGNOME, CF, COMUNE, INDIRIZZO,
      { id: 'tipo', label: { it: 'Che contratto chiudi', en: 'Which contract you are ending' }, tipo: 'scelta', def: 'telefonia', opzioni: [
        { v: 'telefonia', l: { it: 'Telefono, internet o pay TV', en: 'Phone, internet or pay TV' } },
        { v: 'abbonamento', l: { it: 'Palestra, abbonamento o altro servizio', en: 'Gym, subscription or other service' } },
        { v: 'quattordici', l: { it: 'Contratto online o fuori dai negozi (14 giorni)', en: 'Online or doorstep contract (14 days)' } }] },
      { id: 'fornitore', label: { it: 'Fornitore (ragione sociale)', en: 'Provider (company name)' }, tipo: 'testo' },
      { id: 'forn_indirizzo', label: { it: 'Indirizzo o PEC del fornitore', en: 'Provider’s address or PEC' }, tipo: 'testo' },
      { id: 'codice', label: { it: 'Codice cliente o numero di contratto', en: 'Customer or contract number' }, tipo: 'testo' },
      { id: 'giorni', label: { it: 'Giorni di preavviso scritti nel contratto', en: 'Days of notice in the contract' }, tipo: 'scelta', def: '30', se: (v) => v.tipo !== 'quattordici', opzioni: ['0', '15', '30', '60', '90'].map((n) => ({ v: n, l: { it: n === '0' ? 'Nessuno' : n, en: n === '0' ? 'None' : n } })) },
      { id: 'inizio', label: { it: 'Data del contratto o della consegna', en: 'Date of the contract or delivery' }, tipo: 'data', se: (v) => v.tipo === 'quattordici' },
      DATA_F],
    componi: (v) => {
      const avvisi: Avviso[] = [];
      const invio = v.data_firma ?? '';
      let corpo = '';
      if (v.tipo === 'quattordici') {
        corpo = `con la presente esercita il diritto di recesso dal contratto n. ${x(v, 'codice')}, concluso il ${d(v, 'inizio')}, ai sensi degli articoli 52 e seguenti del Codice del consumo (D.Lgs. 6 settembre 2005, n. 206), e chiede il rimborso dei pagamenti ricevuti.`;
        if (valida(v.inizio ?? '')) {
          const ultimo = ultimoGiornoRecesso(v.inizio);
          avvisi.push(valida(invio) && invio > ultimo
            ? { tipo: 'attenzione', testo: { it: `Il termine di ${P.recesso_distanza_giorni} giorni scadeva il ${dataIt(ultimo)}: il recesso senza motivo non è più possibile, resta la disdetta prevista dal contratto.`, en: `The ${P.recesso_distanza_giorni}-day period ended on ${dataIt(ultimo)}: withdrawal without reason is no longer possible, use the contract’s own notice instead.` } }
            : { tipo: 'ok', testo: { it: `Invia la comunicazione entro il ${dataIt(ultimo)} (${P.recesso_distanza_giorni} giorni, art. 52).`, en: `Send it by ${dataIt(ultimo)} (${P.recesso_distanza_giorni} days, art. 52).` } });
        }
      } else {
        const chiesti = Number(v.giorni) || 0;
        const giorni = v.tipo === 'telefonia' ? preavvisoTelefonia(chiesti) : chiesti;
        const fine = valida(invio) ? fineServizio(invio, giorni) : '';
        const legge = v.tipo === 'telefonia' ? ', ai sensi dell’art. 1, comma 3, del D.L. 31 gennaio 2007, n. 7, convertito dalla legge 2 aprile 2007, n. 40,' : '';
        corpo = `comunica la disdetta del contratto n. ${x(v, 'codice')}${legge} con effetto ${giorni ? `decorsi ${giorni} giorni dal ricevimento della presente` : 'dal ricevimento della presente'}, e chiede la cessazione di ogni addebito da quella data.`;
        if (v.tipo === 'telefonia' && chiesti > P.preavviso_max_telefonia_giorni) avvisi.push({ tipo: 'attenzione', testo: { it: `Per telefono e internet il preavviso non può superare ${P.preavviso_max_telefonia_giorni} giorni: la lettera usa ${P.preavviso_max_telefonia_giorni}.`, en: `For phone and internet the notice cannot exceed ${P.preavviso_max_telefonia_giorni} days: the letter uses ${P.preavviso_max_telefonia_giorni}.` } });
        if (fine) avvisi.push({ tipo: 'ok', testo: { it: `Se arriva il ${dataIt(invio)}, il contratto cessa il ${dataIt(fine)}.`, en: `If it arrives on ${dataIt(invio)}, the contract ends on ${dataIt(fine)}.` } });
      }
      return {
        righe: [
          { t: `${x(v, 'nome')} ${x(v, 'cognome')}` }, { t: `${x(v, 'indirizzo')}, ${x(v, 'comune')}` }, { t: `Codice fiscale ${(v.cf ?? '').trim().toUpperCase() || VUOTO}` },
          { t: `Spett.le ${x(v, 'fornitore')}`, r: true, gap: 16 }, { t: x(v, 'forn_indirizzo'), r: true },
          { t: 'Raccomandata A/R, PEC o canale indicato dal fornitore', r: true, s: 9.5, gap: 4 },
          { t: `Oggetto: ${v.tipo === 'quattordici' ? 'recesso dal contratto' : 'disdetta del contratto'} n. ${x(v, 'codice')}`, b: true, gap: 20 },
          { t: `${g(v, 'Il sottoscritto', 'La sottoscritta')} ${x(v, 'nome')} ${x(v, 'cognome')}, ${g(v, 'titolare', 'titolare')} del contratto in oggetto, ${corpo}`, gap: 12 },
          { t: 'Chiedo conferma scritta del ricevimento e della data di cessazione.', gap: 6 },
          { t: 'Distinti saluti.', gap: 6 },
          { t: `${x(v, 'comune')}, ${d(v, 'data_firma')}`, gap: 16 }, { t: '______________________________', r: true, gap: 22 },
          { t: 'Allegato: copia del documento d’identità.', s: 9.5 },
        ], avvisi: [...avvisiComuni(v), ...avvisi],
      };
    },
    promemoria: [{ it: 'Usa il canale che il contratto prevede: per telefono e internet anche lo stesso usato per l’attivazione (DL 7/2007, comma 3-bis).', en: 'Use the channel the contract provides; for phone and internet also the one used to sign up (DL 7/2007, para. 3-bis).' }, { it: 'Conserva la ricevuta di invio: è la prova della data.', en: 'Keep the sending receipt: it proves the date.' }],
  };
}

function dimissioni(): Documento {
  return {
    id: 'dimissioni', file: 'promemoria-dimissioni', pdf: true,
    nome: { it: 'Promemoria per le dimissioni online', en: 'Online resignation checklist' },
    campi: [NOME, COGNOME, CF,
      { id: 'datore', label: { it: 'Datore di lavoro', en: 'Employer' }, tipo: 'testo' },
      { id: 'inizio', label: { it: 'Data di inizio del rapporto', en: 'Employment start date' }, tipo: 'data' },
      { id: 'ccnl', label: { it: 'Contratto collettivo (CCNL)', en: 'Collective agreement (CCNL)' }, tipo: 'testo', facoltativo: true, aiuto: { it: 'Lo trovi in busta paga', en: 'It is on your payslip' } },
      { id: 'preavviso', label: { it: 'Giorni di preavviso del tuo CCNL (di calendario)', en: 'Notice days in your CCNL (calendar days)' }, tipo: 'scelta', def: '30', opzioni: ['0', '7', '10', '15', '20', '30', '45', '60', '90', '120'].map((n) => ({ v: n, l: { it: n === '0' ? 'Nessuno (prova)' : n, en: n === '0' ? 'None (probation)' : n } })) },
      { id: 'data_firma', label: { it: 'Data in cui invii il modulo', en: 'Date you send the form' }, tipo: 'data' }],
    componi: (v) => {
      const invio = v.data_firma ?? '';
      const ok = valida(invio);
      const revoca = ok ? dataIt(revocaEntro(invio)) : '__/__/____';
      const ultimo = ok ? dataIt(ultimoGiornoLavoro(invio, Number(v.preavviso) || 0)) : '__/__/____';
      return {
        righe: [
          { t: 'PROMEMORIA PER LE DIMISSIONI TELEMATICHE', b: true, c: true, s: 13 },
          { t: '(art. 26 del D.Lgs. 14 settembre 2015, n. 151) — non è il modulo ufficiale', c: true, s: 9.5 },
          { t: `Lavoratore: ${x(v, 'nome')} ${x(v, 'cognome')}, codice fiscale ${(v.cf ?? '').trim().toUpperCase() || VUOTO}`, gap: 18 },
          { t: `Datore di lavoro: ${x(v, 'datore')}` }, { t: `Inizio del rapporto: ${d(v, 'inizio')}` }, { t: `CCNL: ${x(v, 'ccnl', 'da verificare in busta paga')}` },
          { t: `Invio del modulo: ${d(v, 'data_firma')}`, b: true, gap: 10 },
          { t: `Revoca possibile fino al: ${revoca} (entro ${P.revoca_dimissioni_giorni} giorni dall’invio, con lo stesso canale)` },
          { t: `Ultimo giorno di lavoro stimato con ${Number(v.preavviso) || 0} giorni di preavviso: ${ultimo}` },
          { t: 'Il modulo si invia dal sito del Ministero del lavoro con SPID, CIE o CNS, oppure tramite patronato, sindacato, consulente del lavoro o ente bilaterale (art. 26, comma 4).', gap: 12 },
          { t: 'Una lettera di dimissioni su carta, da sola, non produce effetti (art. 26, comma 1): serve l’invio telematico.', gap: 4 },
        ],
        avvisi: [{ tipo: 'attenzione', testo: { it: 'Il preavviso e il modo di contarlo dipendono dal tuo CCNL: verifica il numero di giorni prima di decidere la data.', en: 'Notice and how it is counted depend on your CCNL: check the number of days before choosing the date.' } }],
      };
    },
    promemoria: [{ it: 'Tieni a portata di mano: codice fiscale tuo e del datore, PEC o e-mail del datore, data di inizio del rapporto, tipo di contratto.', en: 'Have ready: your and the employer’s tax codes, the employer’s PEC or e-mail, the start date, the contract type.' }, { it: 'Non serve per il lavoro domestico e per le dimissioni firmate in sede protetta o davanti alle commissioni di certificazione (art. 26, comma 7).', en: 'Not needed for domestic work or for resignations signed in a protected venue or before a certification commission (art. 26(7)).' }],
  };
}

export const docById = (id: string) => DOCUMENTI.find((d) => d.id === id);
/** Valeurs de départ : vides, sauf les choix qui ont un défaut. La date du jour est posée après le montage. */
export function valoriIniziali(doc: Documento, oggi: string): Valori {
  const v: Valori = {};
  for (const c of doc.campi) v[c.id] = c.def ?? (c.id === 'data_firma' ? oggi : '');
  return v;
}
export const campiVisibili = (doc: Documento, v: Valori) => doc.campi.filter((c) => !c.se || c.se(v));
