import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'autocertificazione-nascita', group: 'autocertificazioni', order: 3, doc: 'nascita',
  related: ['autocertificazione-stato-civile', 'autocertificazione-stato-di-famiglia', 'autocertificazione-residenza'],
  sources: ['art46', 'art3', 'art40', 'art76'],
  it: {
    slug: 'autocertificazione-nascita', nav: 'Nascita', card: 'Data e luogo di nascita, tuoi o di tuo figlio',
    title: 'Autocertificazione di nascita: modulo PDF da compilare',
    description: 'Autocertificazione di nascita online: data e luogo tuoi o di tuo figlio, con la formula delle lettere a e h dell’art. 46 DPR 445/2000. PDF gratis senza account.',
    h1: 'Autocertificazione di nascita da compilare',
    intro: 'L’autocertificazione di nascita sostituisce il certificato del comune: dichiara la tua data e il tuo luogo di nascita, oppure la nascita di tuo figlio, e scarica il PDF da firmare.',
    resume: (h) => `Il certificato di nascita è uno dei documenti che la legge permette di sostituire con una semplice dichiarazione firmata. L’articolo 46 del DPR 445/2000 elenca, alla lettera a, la data e il luogo di nascita di chi firma e, alla lettera h, la nascita del figlio: due casi diversi che il modulo di questa pagina tratta con due formule distinte. Nel primo dichiari i tuoi dati come risultano dall’atto di nascita; nel secondo dichiari che dal tuo matrimonio o dalla tua unione è nato, o semplicemente che è nato, un figlio o una figlia con un certo nome, in un certo luogo e in una certa data. La nascita è un fatto che non cambia: per questo la dichiarazione, come il certificato che sostituisce, non ha scadenza. Si usa per concorsi, iscrizioni scolastiche e universitarie, pratiche INPS per i congedi e gli assegni, domande ai comuni. Testo riletto su Normattiva il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Sono nato all’estero: posso usare l’autocertificazione di nascita?', a: 'Sì, se l’atto di nascita è stato trascritto in un comune italiano, come avviene per i cittadini italiani nati all’estero e iscritti all’AIRE: il dato risulta allora da un registro italiano. Se la nascita non è trascritta, l’ufficio può chiederti il certificato straniero, tradotto e legalizzato o con apostille, salvo convenzioni.' },
      { q: 'Il certificato di nascita scade dopo sei mesi?', a: `No. I certificati di stati e fatti che non cambiano, come la nascita, hanno validità illimitata (art. 41 del DPR 445/2000); la regola dei ${h.num(h.P.validita_certificati_mesi)} mesi vale per gli altri. Lo stesso vale per l’autocertificazione di nascita: una dichiarazione firmata tempo fa resta valida, anche se molti uffici preferiscono riceverne una con data recente.` },
      { q: 'Che differenza c’è con l’estratto per riassunto dell’atto di nascita?', a: 'L’estratto riporta anche le annotazioni a margine dell’atto, come matrimonio, divorzio o riconoscimento, ed è richiesto per esempio per le pubblicazioni di matrimonio o all’estero. L’autocertificazione dichiara solo data e luogo. Per un ufficio italiano che chiede l’estratto per una pratica interna, chiedi se la dichiarazione basta: spesso sì.' },
    ],
    body: (h) => `<h2>Due formule nel modulo di nascita</h2>
<p>Se scegli «la mia», il documento contiene la frase «di essere nato a… il…», accordata al femminile se firmi come donna. Se scegli «di mio figlio o mia figlia», compaiono tre campi in più: nome e cognome, luogo e data di nascita del bambino, e la frase diventa «che è nato/a…». È la formula utile ai genitori nei primi mesi, quando il certificato non è ancora stato chiesto e servono congedo, bonus o iscrizione al pediatra.</p>
<h2>Dove si usa l’autocertificazione di nascita</h2>
<p>Nei concorsi pubblici i dati di nascita si dichiarano nella domanda stessa. Nelle iscrizioni a scuola, all’università, nei centri per l’impiego e nelle domande all’INPS, la dichiarazione separata è utile quando l’ufficio la chiede come allegato. Con un ufficio pubblico il certificato non può essere preteso (${h.src('art40', 'articolo 40')}); con un privato, come una banca o una compagnia assicurativa, puoi offrirla ma decidono loro.</p>
<h2>Nascita e cittadini stranieri</h2>
<p>Per un cittadino di uno Stato fuori dall’Unione europea, la nascita avvenuta all’estero non è un dato certificabile da un ufficio italiano, quindi non si autocertifica (${h.src('art3', 'articolo 3')}). La nascita di un figlio avvenuta in Italia, invece, è registrata in un comune italiano e può essere dichiarata anche da un genitore non UE regolarmente soggiornante.</p>
<h2>Prima di firmare</h2>
<p>Controlla che il comune di nascita sia scritto come nell’atto, con la provincia tra parentesi, e che la data corrisponda al codice fiscale: il modulo verifica il carattere di controllo del codice, non la coerenza con la data. Una data sbagliata per distrazione non è un falso, ma l’ufficio ti chiederà di rifare il foglio; un dato scritto apposta in modo errato ricade invece nell’${h.src('art76', 'articolo 76')}.</p>`,
  },
  en: {
    slug: 'birth-self-certification', nav: 'Birth', card: 'Date and place of birth, yours or your child’s',
    title: 'Birth self-certification in Italy: fill in the PDF form',
    description: 'Italian birth self-certification online: your own date and place of birth or your child’s, worded on article 46(a) and (h) of DPR 445/2000. Free PDF, no login.',
    h1: 'Birth self-certification (autocertificazione di nascita)',
    intro: 'The birth self-certification replaces the comune’s certificate: state your own date and place of birth, or your child’s birth, and download the PDF to sign.',
    resume: (h) => `The birth certificate is one of the documents Italian law lets you replace with a simple signed statement. Article 46 of Presidential Decree 445/2000 lists, under letter a, the signer’s date and place of birth and, under letter h, the birth of a child: two different cases that the form on this page handles with two separate wordings. In the first you state your own details as recorded in your birth record; in the second you state that a son or daughter with a given name was born in a given place on a given date. Birth is a fact that never changes, so the declaration, like the certificate it replaces, has no expiry date. It is used for public competitions, school and university enrolment, INPS paperwork for parental leave and allowances, and applications to the comune. Text reread on Normattiva on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'I was born abroad: can I use the birth self-certification?', a: 'Yes, if your birth record has been transcribed in an Italian comune, as happens for Italian citizens born abroad and registered with AIRE: the fact is then held in an Italian register. If the birth was never transcribed, the office may ask for the foreign certificate, translated and legalised or apostilled, unless a convention applies.' },
      { q: 'Does a birth certificate expire after six months?', a: `No. Certificates of facts that never change, such as birth, are valid indefinitely (art. 41 of DPR 445/2000); the ${h.num(h.P.validita_certificati_mesi)}-month rule applies to the others. The same goes for the birth self-certification: one signed long ago is still valid, although many offices prefer a recently dated one.` },
      { q: 'How does it differ from the full birth extract (estratto)?', a: 'The extract also shows the notes in the margin of the record, such as marriage, divorce or recognition, and is required for example for marriage banns or abroad. The self-certification states only date and place. When an Italian office asks for the extract for an internal procedure, ask whether the declaration will do: it often does.' },
    ],
    body: (h) => `<h2>Two wordings in the birth form</h2>
<p>Choosing «mine» gives the sentence «di essere nato a… il…», switched to the feminine if a woman signs. Choosing «my son or daughter» adds three fields, the child’s full name, place and date of birth, and the sentence becomes «che è nato/a…». Parents use it in the first months, before anyone has requested a certificate, for parental leave, the birth bonus or registering with a paediatrician.</p>
<h2>Where the birth self-certification is used</h2>
<p>In public competitions birth details go straight into the application. For school, university, job-centre and INPS applications, a separate declaration helps when the office asks for one as an attachment. A public office cannot insist on the certificate (${h.src('art40', 'article 40')}); a private party such as a bank or insurer may accept your declaration or not.</p>
<h2>Birth and foreign nationals</h2>
<p>For a non-EU national, a birth that took place abroad is not something an Italian office can certify, so it cannot be self-certified (${h.src('art3', 'article 3')}). A child born in Italy, on the other hand, is registered with an Italian comune, and a lawfully staying non-EU parent can declare that birth.</p>
<h2>Before you sign</h2>
<p>Check that the town of birth is spelled as in the record, with the province in brackets, and that the date matches your tax code: the form checks the code’s control character, not whether it matches the date. A date mistyped by accident is not a false statement, but the office will ask you to redo the sheet; a deliberately wrong one falls under ${h.src('art76', 'article 76')}.</p>`,
  },
});
