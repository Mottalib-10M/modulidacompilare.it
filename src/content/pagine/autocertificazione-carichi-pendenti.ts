import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'autocertificazione-carichi-pendenti', group: 'autocertificazioni', order: 7, doc: 'penale',
  related: ['autocertificazione-titolo-di-studio', 'dichiarazione-sostitutiva-atto-di-notorieta', 'autocertificazione-residenza'],
  sources: ['art46', 'art76', 'art3', 'art40'],
  it: {
    slug: 'autocertificazione-carichi-pendenti', nav: 'Casellario e carichi pendenti', card: 'Nessuna condanna e nessun procedimento noto',
    title: 'Autocertificazione carichi pendenti e casellario: PDF',
    description: 'Autocertificazione di casellario giudiziale e carichi pendenti online, con le formule delle lettere aa e bb dell’art. 46 DPR 445/2000. PDF gratis e immediato.',
    h1: 'Autocertificazione carichi pendenti e casellario giudiziale',
    intro: 'L’autocertificazione dei carichi pendenti e del casellario dichiara che non hai condanne penali e che non sai di essere sotto procedimento: scegli una o entrambe le formule e scarica il PDF.',
    resume: (h) => `Il certificato del casellario giudiziale riporta le condanne definitive e altri provvedimenti iscritti; il certificato dei carichi pendenti riporta i procedimenti penali in corso presso una procura. Con una dichiarazione firmata puoi sostituirli tutti e due: dichiari che non hai condanne penali né provvedimenti iscritti nel casellario, e che non sai di avere procedimenti penali a tuo carico (articolo 46 del DPR 445/2000). Il modulo di questa pagina riprende le due formule e ti lascia scegliere se usarle entrambe o una sola, secondo ciò che chiede l’ufficio. Si usa per concorsi pubblici, iscrizioni ad albi e ruoli, gare d’appalto, autorizzazioni commerciali, incarichi nelle scuole. Se hai una condanna, anche lontana, questa formula non va usata: si chiede il certificato o si dichiara la condanna. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Cosa vuol dire «non essere a conoscenza» di procedimenti?', a: 'Un procedimento può essere aperto senza che l’interessato lo sappia, finché non riceve un atto come l’informazione di garanzia o l’avviso di conclusione delle indagini. Per questo la legge parla di procedimenti di cui sei a conoscenza. Se hai ricevuto uno di questi atti, non puoi dichiarare di non saperne nulla.' },
      { q: 'Una condanna con la sospensione condizionale va dichiarata?', a: 'Sì, nella maggior parte dei casi: la sospensione condizionale non cancella la condanna dal casellario, anche se non compare in alcuni certificati richiesti dai privati. Lo stesso vale per il patteggiamento. Se non sei sicuro di cosa risulta, chiedi il tuo certificato del casellario all’ufficio della procura prima di firmare.' },
      { q: 'Per lavorare con i minori basta l’autocertificazione?', a: 'No. Il datore di lavoro che impiega una persona in attività a contatto diretto e regolare con minori deve chiedere il certificato del casellario, previsto dalla normativa contro gli abusi sui minori. In quel caso non si usa l’autocertificazione: il certificato si richiede in procura, anche con delega.' },
    ],
    body: (h) => `<h2>Casellario e carichi pendenti, due cose diverse</h2>
<p>Il casellario giudiziale è un archivio nazionale delle decisioni definitive: condanne, misure di sicurezza e di prevenzione, alcuni provvedimenti civili e amministrativi. I carichi pendenti sono i procedimenti ancora aperti, con un’imputazione formulata, registrati presso la procura del luogo. Un bando può chiedere l’uno, l’altro o entrambi: il modulo ti fa scegliere, e la frase cambia di conseguenza, al maschile o al femminile.</p>
<h2>La formula esatta</h2>
<p>Per l’assenza di condanne il modulo scrive «di non aver riportato condanne penali e di non essere destinatario di provvedimenti che riguardano l’applicazione di misure di sicurezza e di misure di prevenzione, di decisioni civili e di provvedimenti amministrativi iscritti nel casellario giudiziale», riprendendo le parole dell’${h.src('art46', 'articolo 46')}. Per i procedimenti in corso, «di non essere a conoscenza di essere sottoposto a procedimenti penali».</p>
<h2>Cosa succede se non è vero</h2>
<p>L’ufficio controlla sempre questa dichiarazione nei concorsi e negli albi, perché il casellario è consultabile dagli enti pubblici. Chi dichiara di non avere condanne avendone una commette un falso punito dall’${h.src('art76', 'articolo 76')}, e la conseguenza pratica è spesso più pesante della condanna originaria: esclusione dal concorso, revoca dell’assunzione.</p>
<h2>Stranieri e condanne all’estero</h2>
<p>Il casellario italiano registra anche le condanne straniere riconosciute in Italia. Un cittadino non UE può autocertificare l’assenza di iscrizioni nel casellario italiano, perché è un dato di un ufficio italiano (${h.src('art3', 'articolo 3')}); per il paese d’origine l’ufficio può chiedere un certificato straniero tradotto. Con i privati, il certificato si può sempre chiedere (${h.src('art40', 'articolo 40')}).</p>`,
  },
  en: {
    slug: 'criminal-record-self-certification', nav: 'Criminal record', card: 'No convictions and no known proceedings',
    title: 'Criminal record self-certification in Italy: PDF form',
    description: 'Italian self-certification of no criminal record (casellario) and no pending charges, wording of article 46(aa) and (bb) of DPR 445/2000. Free PDF, no sign-up.',
    h1: 'Criminal record and pending charges self-certification',
    intro: 'The criminal record self-certification states that you have no criminal convictions and know of no proceedings against you: pick one or both wordings and download the PDF.',
    resume: (h) => `The casellario giudiziale certificate shows final convictions and other recorded decisions; the carichi pendenti certificate shows criminal proceedings pending before a prosecutor’s office. A signed statement can replace both: you declare that you have no criminal convictions and no decisions recorded in the criminal register, and that you are not aware of criminal proceedings against you (article 46 of Presidential Decree 445/2000). The form on this page reproduces both wordings and lets you use both or just one, depending on what the office asks for. It is used for public competitions, registration with professional rolls, public tenders, trade licences and school appointments. If you have a conviction, however old, do not use this wording: request the certificate or declare the conviction. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'What does «not aware» of proceedings mean?', a: 'Proceedings can be opened without the person knowing, until they receive a document such as a notice of investigation or the notice that the investigation has closed. That is why the law refers to proceedings you know about. If you have received one of these documents, you cannot declare you know nothing.' },
      { q: 'Must a suspended sentence be declared?', a: 'In most cases, yes: a suspended sentence stays in the criminal register even though it does not appear on some certificates requested by private parties. The same goes for plea bargains. If you are unsure what is on record, request your own casellario certificate from the prosecutor’s office before signing.' },
      { q: 'Is a self-certification enough to work with children?', a: 'No. An employer hiring someone for work involving direct and regular contact with minors must request the criminal record certificate, under the rules against child abuse. In that case the self-certification is not used: the certificate is requested from the prosecutor’s office, including through a delegate.' },
    ],
    body: (h) => `<h2>Criminal record self-certification in Italy: two registers</h2>
<p>The casellario giudiziale is a national archive of final decisions: convictions, security and prevention measures, some civil and administrative rulings. Pending charges (carichi pendenti) are proceedings still open, with charges formulated, recorded at the local prosecutor’s office. A call may ask for one, the other or both: the form lets you choose and adjusts the sentence, in masculine or feminine form.</p>
<h2>The exact wording</h2>
<p>For no convictions the form writes «di non aver riportato condanne penali e di non essere destinatario di provvedimenti che riguardano l’applicazione di misure di sicurezza e di misure di prevenzione, di decisioni civili e di provvedimenti amministrativi iscritti nel casellario giudiziale», taken from ${h.src('art46', 'article 46')}. For pending proceedings, «di non essere a conoscenza di essere sottoposto a procedimenti penali».</p>
<h2>What happens if it is untrue</h2>
<p>Offices always check this declaration in competitions and professional rolls, because public bodies can consult the register. Declaring no convictions while having one is a false statement punished under ${h.src('art76', 'article 76')}, and the practical fallout is often worse than the original conviction: exclusion from the competition or a cancelled hiring.</p>
<h2>Foreign nationals and convictions abroad</h2>
<p>The Italian register also records foreign convictions recognised in Italy. A non-EU national may self-certify having nothing in the Italian register, since an Italian office holds that information (${h.src('art3', 'article 3')}); for the home country the office may ask for a translated foreign certificate. Private parties can always ask for the certificate (${h.src('art40', 'article 40')}).</p>`,
  },
});
