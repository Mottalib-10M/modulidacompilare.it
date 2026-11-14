import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'autocertificazione-stato-civile', group: 'autocertificazioni', order: 4, doc: 'civile',
  related: ['autocertificazione-stato-di-famiglia', 'autocertificazione-nascita', 'dichiarazione-sostitutiva-atto-di-notorieta'],
  sources: ['art46', 'art47', 'art38', 'art76'],
  it: {
    slug: 'autocertificazione-stato-civile', nav: 'Stato civile', card: 'Celibe, coniugato, unito, vedovo o stato libero',
    title: 'Autocertificazione stato civile: modulo PDF da compilare',
    description: 'Autocertificazione dello stato civile online: celibe, coniugato, unito civilmente, vedovo o stato libero, con i dati del matrimonio. PDF gratis e senza account.',
    h1: 'Autocertificazione dello stato civile online',
    intro: 'L’autocertificazione dello stato civile dichiara se sei libero, coniugato, unito civilmente, divorziato o vedovo: scegli la tua situazione, aggiungi i dati del coniuge se servono e scarica il PDF.',
    resume: (h) => `Lo stato civile è la condizione di una persona rispetto al matrimonio e all’unione civile, come risulta dai registri dello stato civile del comune. L’articolo 46 del DPR 445/2000 permette di dichiararlo con un foglio firmato al posto del certificato. Il modulo di questa pagina propone cinque situazioni: celibe o nubile, coniugato, unito civilmente, vedovo, stato libero dopo un divorzio o lo scioglimento dell’unione. Per chi è coniugato o unito chiede nome del coniuge, comune e data del matrimonio o dell’unione; per chi è vedovo il nome del coniuge scomparso. La separazione non cambia lo stato civile, che resta «coniugato»: il modulo lo ricorda accanto all’anteprima, perché è un errore frequente. La dichiarazione serve per pensioni di reversibilità, successioni, domande di alloggio, assegni e pratiche consolari. Testo riletto su Normattiva il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Se sono separato, cosa scrivo come stato civile?', a: 'Lo stato civile di una persona separata resta «coniugato»: la separazione, consensuale o giudiziale, allenta il vincolo ma non lo scioglie. Solo il divorzio, cioè lo scioglimento o la cessazione degli effetti civili del matrimonio, cambia lo stato civile. Nel modulo, quindi, chi è separato sceglie «coniugato» e indica i dati del matrimonio ancora in corso.' },
      { q: 'Posso dichiarare lo stato libero per sposarmi?', a: 'Per le pubblicazioni di matrimonio è l’ufficiale dello stato civile ad acquisire i dati, spesso d’ufficio. L’autocertificazione di stato libero serve invece in molte altre pratiche: graduatorie, assegni, domande di alloggio. Se devi sposarti all’estero, il paese straniero chiede di solito il nulla osta o un certificato, non l’autocertificazione italiana.' },
      { q: 'Il convivente di fatto ha uno stato civile proprio?', a: 'No. La convivenza di fatto registrata all’anagrafe non cambia lo stato civile: due conviventi restano liberi, o divorziati, o vedovi. L’unione civile tra persone dello stesso sesso, invece, è registrata nello stato civile e si dichiara come tale. La convivenza si dichiara, se serve, con lo stato di famiglia.' },
    ],
    body: (h) => `<h2>Le cinque situazioni del modulo</h2>
<p>Celibe o nubile: mai sposato e mai unito civilmente. Coniugato: matrimonio in corso, anche se c’è una separazione. Unito civilmente: unione registrata ai sensi della legge del 2016. Vedovo: il coniuge o l’unito è morto. Stato libero: il vincolo è stato sciolto con sentenza di divorzio o con accordo davanti al sindaco, e la formula diventa «di trovarsi in stato libero». Ogni scelta cambia la frase del documento e i campi richiesti, al maschile o al femminile secondo chi firma.</p>
<h2>Stato civile e successione</h2>
<p>Nelle pratiche di successione lo stato civile del defunto e quello degli eredi contano. Lo stato civile del defunto non è un tuo stato: lo dichiari con l’atto di notorietà dell’${h.src('art47', 'articolo 47')}, che consente di attestare fatti di altre persone se li conosci direttamente. Il tuo stato civile, invece, si dichiara con questo modulo.</p>
<h2>Matrimonio celebrato all’estero</h2>
<p>Se ti sei sposato all’estero e l’atto è stato trascritto in Italia, il matrimonio risulta dai registri italiani e si può autocertificare. Se non è stato trascritto, per gli uffici italiani lo stato civile resta quello precedente fino alla trascrizione: conviene chiederla al consolato o al comune prima di presentare una pratica che dipende dal matrimonio.</p>
<h2>Firma e consegna</h2>
<p>Come per ogni dichiarazione sostitutiva, si firma a mano e si allega la copia del documento quando non si firma davanti all’impiegato (${h.src('art38', 'articolo 38')}). Dichiarare uno stato civile diverso da quello reale per ottenere una prestazione, come una pensione di reversibilità dopo un nuovo matrimonio, è un falso punito dall’${h.src('art76', 'articolo 76')}.</p>`,
  },
  en: {
    slug: 'marital-status-self-certification', nav: 'Marital status', card: 'Single, married, in a civil union, divorced or widowed',
    title: 'Marital status self-certification in Italy: PDF form',
    description: 'Italian marital status self-certification online: single, married, civil union, widowed or free after divorce, with marriage details. Free PDF, no account.',
    h1: 'Marital status self-certification (stato civile) online',
    intro: 'The marital status self-certification states whether you are single, married, in a civil union, divorced or widowed: pick your situation, add your spouse’s details if needed and download the PDF.',
    resume: (h) => `Marital status (stato civile) is a person’s position with regard to marriage and civil union, as recorded in the comune’s civil-status registers. Article 46 of Presidential Decree 445/2000 lets you declare it on a signed sheet instead of a certificate. The form on this page offers five situations: never married (celibe or nubile), married, in a civil union, widowed, and free status after a divorce or the dissolution of a union. For married people and civil partners it asks for the spouse’s name and the town and date of the marriage or union; for widowed people, the late spouse’s name. Separation does not change marital status, which stays «married»: the form reminds you next to the preview, because it is a common mistake. The declaration is used for survivor’s pensions, inheritance, housing applications, allowances and consular paperwork. Text reread on Normattiva on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'I am separated: what marital status do I write?', a: 'A separated person is still «married» in Italian law: separation, whether by consent or by court order, loosens the bond but does not dissolve it. Only divorce, the dissolution or end of the civil effects of the marriage, changes marital status. In the form, a separated person therefore picks «married» and gives the details of the marriage still in force.' },
      { q: 'Can I use this form to prove I am free to marry?', a: 'For marriage banns the registrar gathers the details, often directly from the records. The single-status self-certification is used instead in many other procedures: rankings, allowances, housing applications. If you are marrying abroad, the foreign country usually asks for a nulla osta or a certificate, not an Italian self-certification.' },
      { q: 'Does an unmarried partnership change marital status?', a: 'No. A cohabitation registered at the registry office does not change marital status: both partners remain single, divorced or widowed. A same-sex civil union, on the other hand, is recorded in the civil-status registers and is declared as such. Cohabitation, if needed, is declared through the household self-certification.' },
    ],
    body: (h) => `<h2>Marital status self-certification in Italy: five situations</h2>
<p>Never married: no marriage and no civil union. Married: the marriage is ongoing, even with a separation. Civil union: a union registered under the 2016 law. Widowed: the spouse or partner has died. Free status: the bond was ended by a divorce ruling or an agreement before the mayor, and the wording becomes «di trovarsi in stato libero». Each choice changes the sentence in the document and the fields required, in masculine or feminine form according to the signer.</p>
<h2>Marital status and inheritance</h2>
<p>In inheritance paperwork the deceased’s and the heirs’ marital status both matter. The deceased’s status is not yours to self-certify: you declare it through the ${h.src('art47', 'article 47')} sworn declaration, which allows facts about other people you know first-hand. Your own status is declared with this form.</p>
<h2>Marriage celebrated abroad</h2>
<p>If you married abroad and the record was transcribed in Italy, the marriage is in Italian registers and can be self-certified. If it was not, Italian offices treat you as having your previous status until transcription: ask the consulate or the comune for it before filing anything that depends on the marriage.</p>
<h2>Signing and handing in</h2>
<p>As with any substitute declaration, sign by hand and attach a copy of your ID when you do not sign in front of the clerk (${h.src('art38', 'article 38')}). Declaring a marital status other than the real one to obtain a benefit, such as a survivor’s pension after remarrying, is a false statement punished under ${h.src('art76', 'article 76')}.</p>`,
  },
});
