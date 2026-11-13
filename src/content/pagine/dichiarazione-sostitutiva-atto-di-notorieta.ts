import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'dichiarazione-sostitutiva-atto-di-notorieta', group: 'autocertificazioni', order: 8, doc: 'notorieta',
  related: ['autocertificazione-residenza', 'autocertificazione-stato-civile', 'delega-generica'],
  sources: ['art47', 'art38', 'art37', 'art75'],
  it: {
    slug: 'dichiarazione-sostitutiva-atto-di-notorieta', nav: 'Atto di notorietà', card: 'Fatti che conosci direttamente, smarrimento',
    title: 'Dichiarazione sostitutiva di atto di notorietà: PDF',
    description: 'Dichiarazione sostitutiva dell’atto di notorietà da compilare: testo libero o smarrimento di un documento, formula dell’art. 47 DPR 445/2000. PDF gratis.',
    h1: 'Dichiarazione sostitutiva di atto di notorietà online',
    intro: 'La dichiarazione sostitutiva di atto di notorietà attesta fatti che conosci direttamente e che nessun registro custodisce: scrivi il testo, o scegli lo smarrimento di un documento, e scarica il PDF.',
    resume: (h) => `L’atto di notorietà era, in origine, una dichiarazione resa davanti a un pubblico ufficiale da testimoni che confermavano un fatto noto. L’articolo 47 del DPR 445/2000 permette di sostituirlo con una dichiarazione firmata dall’interessato, valida con gli uffici pubblici e i gestori di pubblici servizi. Copre gli stati, le qualità personali e i fatti che non rientrano nell’elenco dell’articolo 46 e che conosci direttamente: lo smarrimento di un documento, la conformità all’originale di una copia, la qualità di erede, l’assenza di un testamento, fatti relativi ad altre persone di cui hai conoscenza diretta. Il comma 3 la rende la forma generale per tutto ciò che non ha un certificato. Il modulo di questa pagina ha due modelli: testo libero, che scrivi tu, e smarrimento di un documento, con tipo, numero, data e luogo. Va accompagnata dalla copia di un documento d’identità, salvo firma davanti all’impiegato. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Quando si usa l’atto di notorietà invece dell’autocertificazione?', a: 'Quando il fatto non è nell’elenco dell’articolo 46, cioè non risulta da un registro pubblico: lo smarrimento di un oggetto, la composizione di un’eredità, il fatto che una copia sia conforme all’originale, una situazione di fatto come la convivenza in un certo periodo. Se il dato è nell’elenco, basta l’autocertificazione, più semplice e senza copia del documento obbligatoria.' },
      { q: 'Serve la denuncia ai carabinieri per un documento smarrito?', a: 'Dipende dal documento. Per la carta d’identità e il passaporto il comune o la questura chiedono di solito la denuncia alle forze dell’ordine. Per altri documenti, come la tessera sanitaria, un libretto o un badge, molti uffici accettano la dichiarazione sostitutiva dell’articolo 47, comma 4, che permette di dichiarare lo smarrimento per ottenere un duplicato.' },
      { q: 'Posso usarla per la successione?', a: 'Sì, è lo strumento più usato per dichiarare chi sono gli eredi e l’assenza di testamento quando si chiudono i conti del defunto in banca o si fanno pratiche con l’INPS. Per importi elevati la banca può chiedere un atto di notorietà davanti a un notaio o in tribunale, che è diverso da quello sostitutivo.' },
      { q: 'La copia di un documento si può dichiarare conforme all’originale?', a: 'Sì. Gli articoli 19 e 47 del DPR 445/2000 permettono di dichiarare che la copia di un atto, di un titolo di studio o di servizio, o di un documento fiscale è conforme all’originale. Scrivi nel testo libero quale documento alleghi e che la copia è conforme, poi firma e allega la copia stessa.' },
    ],
    body: (h) => `<h2>Come si scrive la dichiarazione sostitutiva di atto di notorietà</h2>
<p>Il testo deve dire fatti, non opinioni: chi, cosa, quando, dove. «Di aver smarrito in data 3 ottobre 2026, a Bologna, la tessera del parcheggio n. 4521» è una dichiarazione utile; «di avere sempre pagato tutto» non lo è. Se il fatto riguarda un’altra persona, scrivi come lo conosci: «in quanto figlio convivente», «in quanto presente al fatto». Il modulo mette il testo dopo la parola «DICHIARA» e lo lascia in italiano, perché è la lingua dell’ufficio che lo legge.</p>
<h2>Il modello dello smarrimento</h2>
<p>Il comma 4 dell’${h.src('art47', 'articolo 47')} prevede espressamente che lo smarrimento di documenti di riconoscimento o di altri documenti si possa comprovare con questa dichiarazione, salvo i casi in cui la legge chieda la denuncia. Scegli «smarrimento», scrivi tipo e numero del documento, data e luogo in cui te ne sei accorto: la frase finale chiede anche il duplicato.</p>
<h2>Copia del documento e bollo</h2>
<p>A differenza dell’autocertificazione, l’atto di notorietà richiede sempre la copia fotostatica di un documento d’identità se non firmi davanti all’impiegato (${h.src('art38', 'articolo 38')}). Il bollo non si paga (${h.src('art37', 'articolo 37')}). Un ufficio può chiederti di firmarlo davanti a sé quando la dichiarazione è destinata a un privato, come una banca: in quel caso porta il foglio non firmato.</p>
<h2>Responsabilità di chi dichiara</h2>
<p>La dichiarazione vale come resa a pubblico ufficiale: un fatto inventato, per esempio uno smarrimento finto per avere un secondo documento, porta alla perdita dei benefici (${h.src('art75', 'articolo 75')}) e alla denuncia penale. Scrivi solo ciò che sai.</p>`,
  },
  en: {
    slug: 'sworn-substitute-declaration', nav: 'Sworn declaration (art. 47)', card: 'Facts you know first-hand, lost documents',
    title: 'Sworn substitute declaration in Italy (atto di notorietà)',
    description: 'Fill in the Italian sworn substitute declaration (atto di notorietà): free text or a lost document, worded on article 47 of DPR 445/2000. Free PDF, no account.',
    h1: 'Sworn substitute declaration (atto di notorietà) online',
    intro: 'The sworn substitute declaration, or dichiarazione sostitutiva di atto di notorietà, states facts you know first-hand that no register holds: type the text, or choose a lost document, and download the PDF.',
    resume: (h) => `The atto di notorietà was originally a statement made before a public official by witnesses confirming a well-known fact. Article 47 of Presidential Decree 445/2000 lets the person concerned replace it with a signed declaration, valid with public offices and public-service operators. It covers circumstances, personal qualities and facts that are not on the article 46 list and that you know first-hand: losing a document, a copy matching its original, being an heir, the absence of a will, facts about other people you know directly. Paragraph 3 makes it the general form for anything that has no certificate. The form on this page offers two models: free text that you write, and loss of a document, with type, number, date and place. It goes with a copy of an identity document unless you sign in front of the clerk. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'When do I use the sworn declaration rather than a self-certification?', a: 'When the fact is not on the article 46 list, meaning no public register holds it: losing an item, who the heirs are, a copy matching its original, a factual situation such as living together during a given period. If the fact is on the list, a self-certification is enough, simpler and without a compulsory ID copy.' },
      { q: 'Do I need a police report for a lost document?', a: 'It depends on the document. For an identity card or passport the comune or police headquarters usually ask for a report to the police or carabinieri. For other documents, such as the health card, a booklet or a badge, many offices accept the declaration under article 47(4), which lets you declare the loss to obtain a duplicate.' },
      { q: 'Can I use it for an inheritance?', a: 'Yes, it is the usual way to declare who the heirs are and that there is no will when closing a deceased person’s bank accounts or dealing with INPS. For large sums the bank may ask for an atto di notorietà sworn before a notary or a court, which is a different document from the substitute one.' },
      { q: 'Can I declare a copy to be true to the original?', a: 'Yes. Articles 19 and 47 of DPR 445/2000 allow you to declare that a copy of a deed, an education or service record, or a tax document matches the original. In the free text, state which document you attach and that the copy is a true copy, then sign and attach the copy itself.' },
    ],
    body: (h) => `<h2>How to write a sworn substitute declaration in Italy</h2>
<p>State facts, not opinions: who, what, when, where. «That on 3 October 2026, in Bologna, I lost parking card no. 4521» is a useful declaration; «that I have always paid everything» is not. If the fact concerns someone else, say how you know it: «as a son living with him», «as I was present». The form puts your text after the word «DICHIARA» and keeps it in Italian, the language of the office that reads it, so write the free text in Italian.</p>
<h2>The lost-document model</h2>
<p>Paragraph 4 of ${h.src('art47', 'article 47')} expressly allows the loss of identity documents or other documents to be proven with this declaration, except where the law requires a police report. Choose «loss of a document», type the document’s kind and number and the date and place you noticed the loss: the closing sentence also requests a duplicate.</p>
<h2>ID copy and stamp duty</h2>
<p>Unlike the self-certification, the sworn declaration always needs a photocopy of an identity document if you do not sign in front of the clerk (${h.src('art38', 'article 38')}). No stamp duty is due (${h.src('art37', 'article 37')}). An office may ask you to sign in front of it when the declaration is meant for a private party such as a bank: in that case bring the sheet unsigned.</p>
<h2>The signer’s responsibility</h2>
<p>The declaration counts as made to a public official: an invented fact, such as a fake loss to get a second document, leads to loss of benefits (${h.src('art75', 'article 75')}) and a criminal charge. Write only what you know.</p>`,
  },
});
