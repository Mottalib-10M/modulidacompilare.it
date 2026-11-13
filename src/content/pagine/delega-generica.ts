import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'delega-generica', group: 'deleghe', order: 9, doc: 'delega',
  related: ['delega-ritiro-documenti', 'dichiarazione-sostitutiva-atto-di-notorieta', 'autocertificazione-residenza'],
  sources: ['art38', 'cc1392', 'dpr445'],
  it: {
    slug: 'delega-generica', nav: 'Delega generica', card: 'Un’altra persona agisce per te in un ufficio',
    title: 'Delega generica: modulo da compilare online in PDF gratis',
    description: 'Compila la delega generica online: delegante, delegato con documento, cosa può fare e presso quale ufficio, scadenza facoltativa. PDF gratis e senza account.',
    h1: 'Delega generica da compilare online',
    intro: 'La delega generica autorizza un’altra persona a presentare una domanda, firmare una ricevuta o sbrigare una pratica per te in un ufficio: scrivi chi delega, chi è delegato e cosa può fare, poi scarica il PDF.',
    resume: (h) => `La delega è il foglio con cui affidi a un’altra persona il compito di compiere un atto in tuo nome e per tuo conto. Nel codice civile si chiama procura: l’articolo 1392 stabilisce che deve avere la stessa forma dell’atto che il rappresentante deve compiere, quindi per una pratica che si fa con un semplice modulo basta una scrittura privata firmata. Con gli uffici pubblici, l’articolo 38, comma 3-bis, del DPR 445/2000 prevede che istanze e dichiarazioni si possano presentare anche tramite una persona delegata, con la copia del documento d’identità di chi delega. La delega generica di questa pagina indica il delegante con i suoi dati, il delegato con luogo e data di nascita e documento, ciò che il delegato può fare, l’ufficio presso cui agisce e, se vuoi, una data di scadenza. In fondo c’è lo spazio per la firma del delegato per accettazione. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Delega e procura sono la stessa cosa?', a: 'Nel linguaggio comune la delega è il foglio semplice per una pratica, la procura quella fatta dal notaio. Giuridicamente entrambe conferiscono un potere di rappresentanza, ma la forma cambia: per vendere una casa, accettare un’eredità con beneficio d’inventario o fare una donazione serve una procura notarile, perché quegli atti richiedono la forma pubblica.' },
      { q: 'La delega deve essere scritta a mano?', a: 'No. Può essere stampata e firmata a mano, oppure firmata digitalmente se la invii per via telematica. Conta la firma autografa del delegante e la copia del suo documento. Alcuni uffici, come le Poste o le banche, usano un proprio modulo di delega e possono chiedere di compilare quello: chiedi prima di andare.' },
      { q: 'Quanto dura una delega?', a: 'Se non indichi una scadenza, la delega vale per l’atto o le attività indicate finché non la revochi. Per evitare dubbi, conviene scrivere una data: il modulo ha un campo facoltativo «valida fino al». Una delega per un singolo ritiro si esaurisce invece con il ritiro stesso.' },
    ],
    body: (h) => `<h2>Cosa scrivere nel campo delle attività</h2>
<p>Comincia con «a»: «a presentare la domanda di iscrizione al nido comunale», «a ritirare la tessera elettorale», «a firmare la ricevuta di consegna». Più è precisa, meno l’ufficio avrà dubbi. Una formula vaga come «a fare tutto ciò che serve» viene spesso rifiutata, perché l’impiegato non sa se il delegato è autorizzato a quello specifico atto. Indica anche l’ufficio: «presso l’ufficio anagrafe del Comune di Torino».</p>
<h2>Cosa porta il delegato</h2>
<p>Il delegato si presenta con la delega firmata, la copia del documento d’identità del delegante e il proprio documento in originale. Il modulo scrive già nel testo il documento del delegato, così l’impiegato verifica che corrisponde. Per i dati sanitari o per documenti personali, alcuni uffici chiedono anche la firma del delegato sul foglio: lo spazio è già previsto.</p>
<h2>Deleghe agli uffici pubblici</h2>
<p>L’${h.src('art38', 'articolo 38')} del ${h.src('dpr445', 'DPR 445/2000')} consente di presentare istanze e dichiarazioni tramite delegato. Non tutte le pratiche si possono delegare: il rilascio della carta d’identità richiede la presenza dell’interessato per la foto e le impronte, mentre il ritiro della carta stampata si può delegare se il comune lo prevede.</p>
<h2>Quando non basta una delega semplice</h2>
<p>L’${h.src('cc1392', 'articolo 1392 del codice civile')} vuole che la procura abbia la forma dell’atto da compiere. Compravendite di immobili, mutui, accettazione di eredità con beneficio d’inventario, costituzione di società: per questi atti serve una procura del notaio. Allo stesso modo, per operare su un conto corrente la banca chiede quasi sempre la delega sul proprio modulo o una procura.</p>`,
  },
  en: {
    slug: 'italian-delegation-letter', nav: 'General delegation', card: 'Someone else acts for you at an office',
    title: 'Delega: Italian delegation letter, fill in the PDF online',
    description: 'Italian general delegation letter (delega) online: who delegates, the delegate and their ID, what they may do, at which office, until when. Free PDF, no login.',
    h1: 'Delega: Italian general delegation letter online',
    intro: 'A delega, the Italian delegation letter, lets someone else file an application, sign a receipt or handle an errand for you at an office: say who delegates, who is delegated and what they may do, then download the PDF.',
    resume: (h) => `A delega is the sheet on which you entrust another person with doing something in your name and on your behalf. The Civil Code calls it procura: article 1392 says it must take the same form as the act the representative will perform, so for an errand done with a simple form a signed private writing is enough. With public offices, article 38(3-bis) of Presidential Decree 445/2000 allows applications and declarations to be filed through a delegate, with a copy of the delegating person’s ID. The general delegation on this page names the person delegating with their details, the delegate with place and date of birth and ID document, what the delegate may do, the office where they act and, if you wish, an expiry date. At the bottom there is room for the delegate to sign in acceptance. The document is in Italian, as Italian offices expect. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Is a delega the same as a power of attorney?', a: 'In everyday use a delega is the simple sheet for an errand, a procura the one drawn up by a notary. Legally both grant a power to represent you, but the form differs: selling a house, accepting an inheritance with benefit of inventory or making a gift needs a notarial power of attorney, because those acts require public form.' },
      { q: 'Does the delegation have to be handwritten?', a: 'No. It can be printed and signed by hand, or signed digitally if you send it online. What matters is the delegating person’s own signature and a copy of their ID. Some bodies, such as Poste Italiane or banks, use their own delegation form and may ask you to fill that in: check before you go.' },
      { q: 'How long is a delegation valid?', a: 'If you set no end date, it covers the stated acts until you revoke it. To avoid doubt, write a date: the form has an optional «valid until» field. A delegation for a single collection simply ends once the item has been collected.' },
    ],
    body: (h) => `<h2>What to write in the delega: the activities field</h2>
<p>Start with «a» (to), in Italian: «a presentare la domanda di iscrizione al nido comunale» (to file the nursery application), «a ritirare la tessera elettorale» (to collect the voting card), «a firmare la ricevuta di consegna» (to sign the delivery receipt). The more precise, the fewer doubts at the counter. A vague phrase such as «to do whatever is needed» is often refused, because the clerk cannot tell whether that specific act is covered. Name the office too: «presso l’ufficio anagrafe del Comune di Torino».</p>
<h2>What the delegate brings</h2>
<p>The delegate brings the signed delegation, a copy of the delegating person’s ID and their own ID in the original. The form already writes the delegate’s document into the text, so the clerk can match it. For health data or personal documents some offices also want the delegate’s signature on the sheet: the space is there.</p>
<h2>Delegations to public offices</h2>
<p>${h.src('art38', 'Article 38')} of ${h.src('dpr445', 'DPR 445/2000')} lets you file applications and declarations through a delegate. Not everything can be delegated: issuing an identity card requires you in person for the photo and fingerprints, while collecting the printed card can be delegated where the comune allows it.</p>
<h2>When a simple delegation is not enough</h2>
<p>${h.src('cc1392', 'Article 1392 of the Civil Code')} requires the power of attorney to take the form of the act to be done. Property sales, mortgages, accepting an inheritance with benefit of inventory, setting up a company: these need a notarial power of attorney. Likewise, to operate a bank account the bank nearly always asks for its own form or a procura.</p>`,
  },
});
