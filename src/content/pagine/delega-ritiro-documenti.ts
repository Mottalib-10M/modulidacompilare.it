import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'delega-ritiro-documenti', group: 'deleghe', order: 10, doc: 'ritiro',
  related: ['delega-generica', 'dichiarazione-sostitutiva-atto-di-notorieta', 'autocertificazione-titolo-di-studio'],
  sources: ['art38', 'cc1392', 'dpr445'],
  it: {
    slug: 'delega-ritiro-documenti', nav: 'Delega al ritiro', card: 'Carta d’identità, raccomandata, diploma',
    title: 'Delega per il ritiro di documenti: modulo PDF online',
    description: 'Delega per il ritiro di documenti da compilare: carta d’identità in comune, raccomandata in posta, diploma a scuola, certificati in università. PDF gratis.',
    h1: 'Delega per il ritiro di documenti online',
    intro: 'La delega per il ritiro di documenti permette a un’altra persona di ritirare al posto tuo una carta d’identità, una raccomandata, un diploma o un certificato: scegli l’ufficio, scrivi cosa ritirare e scarica il PDF.',
    resume: (h) => `Il ritiro è l’atto più semplice da delegare e il più frequente: la carta d’identità elettronica pronta in comune, una raccomandata in giacenza all’ufficio postale, il diploma originale nella segreteria della scuola, un certificato dell’università, un documento all’INPS o all’Agenzia delle entrate. L’articolo 38 del DPR 445/2000 consente agli uffici pubblici di consegnare atti a una persona delegata, che si identifica con il proprio documento e presenta la copia di quello del delegante. Il modulo di questa pagina propone gli uffici più comuni, ognuno con l’intestazione giusta, e chiede cosa ritirare, i dati del delegato e una data di scadenza facoltativa. Per la posta e per le banche conviene verificare prima: spesso usano un modulo proprio, stampato sull’avviso di giacenza o disponibile allo sportello, che il delegato deve portare compilato. Il nostro foglio resta utile come promemoria e per gli uffici che accettano una delega libera. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Posso delegare il ritiro della carta d’identità elettronica?', a: 'Se la carta viene spedita a casa, chiunque si trovi all’indirizzo può riceverla. Se il comune la consegna allo sportello, molti consentono il ritiro a un delegato con delega, copia del documento del titolare e documento del delegato; la richiesta della carta, invece, va fatta di persona per foto e impronte. Controlla sul sito del tuo comune.' },
      { q: 'Come delego il ritiro di una raccomandata?', a: 'L’avviso di giacenza lasciato nella cassetta ha sul retro uno spazio per la delega: compilalo, firmalo e consegnalo al delegato con la copia del tuo documento. Se l’avviso non ha lo spazio o lo hai perso, una delega scritta a parte con il numero della raccomandata viene di solito accettata. Gli atti giudiziari seguono regole più strette.' },
      { q: 'Un genitore può ritirare il diploma del figlio maggiorenne?', a: 'Solo con una delega del figlio. Una volta maggiorenne, il diplomato è l’unico titolare del documento: la segreteria consegna il diploma originale solo a lui o a una persona delegata. Il genitore porta la delega firmata dal figlio, la copia del documento del figlio e il proprio documento.' },
    ],
    body: (h) => `<h2>Gli uffici della delega per il ritiro di documenti</h2>
<p>Il modulo propone comune, scuola, università, ufficio postale, INPS, Agenzia delle entrate, banca e «altro». Ogni scelta cambia l’intestazione del foglio, per esempio «Ufficio anagrafe del Comune di» o «Segreteria studenti dell’università», a cui aggiungi la città o il nome della sede. Nel campo «cosa ritirare» sii preciso: il numero della raccomandata, il tipo di diploma con l’anno, il numero della pratica.</p>
<h2>Cosa serve al delegato</h2>
<p>Tre cose: la delega firmata, la fotocopia del documento d’identità del delegante e il proprio documento d’identità valido. L’${h.src('art38', 'articolo 38')} del ${h.src('dpr445', 'DPR 445/2000')} prevede che la copia accompagni le istanze presentate da altri; gli uffici chiedono la stessa cosa per i ritiri. Per i documenti con dati sanitari, alcuni enti vogliono anche il motivo per cui il titolare non si presenta.</p>
<h2>Ritiri che non si possono delegare</h2>
<p>Alcuni documenti si consegnano solo all’interessato: il passaporto viene spesso consegnato di persona, i dispositivi di firma digitale richiedono il riconoscimento del titolare, alcune lettere giudiziarie hanno regole proprie. In questi casi la delega non basta, oppure serve una procura del notaio, come vuole l’${h.src('cc1392', 'articolo 1392 del codice civile')} quando l’atto ha una forma particolare.</p>
<h2>Più ritiri, una sola delega</h2>
<p>Se il delegato deve ritirare più documenti nello stesso ufficio, elencali nel campo «cosa ritirare» separati da punto e virgola. Se gli uffici sono diversi, compila un foglio per ciascuno: ogni ufficio tiene la sua delega agli atti.</p>`,
  },
  en: {
    slug: 'delegation-to-collect-documents', nav: 'Delegation to collect', card: 'ID card, registered letter, diploma',
    title: 'Delegation to collect documents in Italy: PDF form online',
    description: 'Italian delegation to collect documents: ID card at the comune, registered letter at the post office, diploma at school, university certificates. Free PDF.',
    h1: 'Delegation to collect documents (delega al ritiro)',
    intro: 'The delegation to collect documents lets another person collect an identity card, registered letter, diploma or certificate for you: choose the office, say what to collect and download the PDF.',
    resume: (h) => `Collecting something is the easiest act to delegate and the most common: an electronic identity card ready at the comune, a registered letter held at the post office, an original diploma at the school office, a university certificate, a document at INPS or the Revenue Agency. Article 38 of Presidential Decree 445/2000 lets public offices hand documents to a delegate, who shows their own ID and a copy of the delegating person’s ID. The form on this page offers the most common offices, each with the right heading, and asks what to collect, the delegate’s details and an optional expiry date. For the post office and banks it is worth checking first: they often have their own form, printed on the collection notice or available at the counter, which the delegate must bring filled in. Our sheet remains useful as a reminder and for offices that accept a free-form delegation. The document is in Italian. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Can someone else collect my electronic identity card?', a: 'If the card is posted to your home, anyone at the address can receive it. If the comune hands it out at the counter, many allow a delegate to collect it with a delegation, a copy of the holder’s ID and the delegate’s ID; applying for the card, however, must be done in person for the photo and fingerprints. Check your comune’s website.' },
      { q: 'How do I delegate collecting a registered letter?', a: 'The collection notice left in your letterbox has a delegation box on the back: fill it in, sign it and give it to the delegate with a copy of your ID. If the notice has no box or you lost it, a separate written delegation with the letter number is usually accepted. Court documents follow stricter rules.' },
      { q: 'Can a parent collect an adult child’s diploma?', a: 'Only with a delegation from the child. Once of age, the graduate is the sole holder of the document: the school office hands the original diploma only to them or a delegate. The parent brings the delegation signed by the child, a copy of the child’s ID and their own ID.' },
    ],
    body: (h) => `<h2>Delegation to collect documents in Italy: the offices</h2>
<p>The form offers comune, school, university, post office, INPS, Revenue Agency, bank and «other». Each choice changes the heading of the sheet, for example «Ufficio anagrafe del Comune di» or «Segreteria studenti dell’università», to which you add the town or branch name. In the «what to collect» field be precise: the registered letter number, the type of diploma with the year, the file number.</p>
<h2>What the delegate needs</h2>
<p>Three things: the signed delegation, a photocopy of the delegating person’s ID and their own valid ID. ${h.src('art38', 'Article 38')} of ${h.src('dpr445', 'DPR 445/2000')} requires the copy to accompany applications filed by others; offices ask for the same when handing documents over. For documents containing health data, some bodies also want the reason the holder cannot come.</p>
<h2>Collections that cannot be delegated</h2>
<p>Some documents are handed only to the person concerned: passports are often delivered in person, digital-signature devices require the holder to be identified, some court letters have their own rules. There a delegation is not enough, or a notarial power of attorney is needed, as ${h.src('cc1392', 'article 1392 of the Civil Code')} requires when the act has a special form.</p>
<h2>Several collections, one delegation</h2>
<p>If the delegate has to collect several documents at the same office, list them in the «what to collect» field separated by semicolons. For different offices, fill in one sheet each: every office keeps its own delegation on file.</p>`,
  },
});
