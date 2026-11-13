import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'disdetta-contratto-affitto', group: 'lettere', order: 12, doc: 'affitto',
  related: ['lettera-di-disdetta', 'delega-generica', 'autocertificazione-residenza'],
  sources: ['l431'],
  it: {
    slug: 'disdetta-contratto-affitto', nav: 'Disdetta dell’affitto', card: 'Lettera dell’inquilino con la data di fine',
    title: 'Disdetta contratto di affitto: lettera dell’inquilino PDF',
    description: 'Lettera di disdetta del contratto di affitto per l’inquilino: recesso, gravi motivi o scadenza, con la data di fine calcolata dalla legge 431/1998. PDF gratis.',
    h1: 'Disdetta del contratto di affitto: la lettera dell’inquilino',
    intro: 'La disdetta del contratto di affitto è la lettera con cui l’inquilino comunica al proprietario che lascerà la casa: scegli il motivo, inserisci la data di invio e il sito calcola quando finisce il contratto.',
    resume: (h) => `Per le case in affitto con contratto di tipo abitativo valgono le regole della legge n. 431 del 1998. L’inquilino può lasciare l’immobile in tre modi. Alla scadenza del contratto, comunicando la disdetta con raccomandata almeno ${h.num(h.P.preavviso_locatore_mesi)} mesi prima, come prevede l’articolo 2 per i contratti a canone libero. In qualsiasi momento, se il contratto prevede la facoltà di recesso con un certo preavviso. In qualsiasi momento per gravi motivi, con un preavviso di ${h.num(h.P.recesso_gravi_motivi_mesi)} mesi, secondo l’articolo 3, comma 6. I gravi motivi devono essere fatti nuovi, imprevedibili e indipendenti dalla tua volontà, come un trasferimento di lavoro: vanno indicati nella lettera. Il modulo di questa pagina scrive la lettera con i dati del contratto, il motivo scelto e la richiesta di restituzione del deposito cauzionale, e calcola la data in cui il contratto finisce partendo dal giorno in cui la lettera arriva. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Il preavviso decorre da quando spedisco o da quando arriva la lettera?', a: 'Dal ricevimento. La disdetta è un atto che produce effetti quando giunge a conoscenza del proprietario, quindi conta la data scritta sull’avviso di ricevimento della raccomandata o la ricevuta di consegna della PEC. Per questo conviene spedire qualche giorno prima del necessario, e il modulo chiede la data di invio come stima.' },
      { q: 'Quali sono i gravi motivi per lasciare l’affitto?', a: 'La giurisprudenza riconosce fatti sopravvenuti, imprevedibili e non dipendenti dalla volontà dell’inquilino che rendono gravosa la permanenza: un trasferimento di lavoro, la perdita del lavoro, un problema di salute, la nascita di un figlio in una casa troppo piccola. Il motivo va scritto nella lettera: se il proprietario lo contesta, decide il giudice.' },
      { q: 'Devo pagare l’affitto durante il preavviso?', a: `Sì. Durante i mesi di preavviso il contratto è ancora in corso: l’affitto si paga fino alla data di fine, anche se lasci la casa prima. Con il recesso per gravi motivi, per esempio, una lettera ricevuta oggi ti obbliga a pagare ${h.num(h.P.recesso_gravi_motivi_mesi)} mesi di canone. Puoi proporre al proprietario una risoluzione consensuale anticipata, se trova un nuovo inquilino.` },
      { q: 'Chi registra la fine del contratto all’Agenzia delle entrate?', a: 'La risoluzione del contratto va comunicata all’Agenzia delle entrate entro 30 giorni, con il modello RLI, e dove dovuta si paga l’imposta di registro di 67 euro. Di solito se ne occupa il proprietario, che ha registrato il contratto, ma l’obbligo è solidale: conviene accordarsi e chiedere copia della ricevuta.' },
    ],
    body: (h) => `<h2>Quale motivo scegliere nel modulo</h2>
<p>«Recesso previsto dal contratto» se il tuo contratto contiene una clausola che ti permette di andartene con un preavviso: scegli i mesi scritti nella clausola. «Gravi motivi» se il contratto non lo prevede o il preavviso contrattuale è più lungo, e hai un motivo serio e sopravvenuto: il preavviso è di ${h.num(h.P.recesso_gravi_motivi_mesi)} mesi e devi spiegare il motivo. «Alla scadenza» se vuoi lasciare la casa alla fine naturale del contratto: il sito controlla che la lettera arrivi almeno ${h.num(h.P.preavviso_locatore_mesi)} mesi prima.</p>
<h2>Come calcoliamo la data di fine</h2>
<p>Il preavviso si conta in mesi dalla data in cui la lettera arriva: una disdetta ricevuta il 13 novembre con sei mesi di preavviso chiude il contratto il 13 maggio. Se il giorno non esiste nel mese di arrivo, per esempio il 31, si prende l’ultimo giorno del mese. Il calcolo segue le regole della ${h.src('l431', 'legge n. 431 del 1998')} e i mesi civili; il tuo contratto può prevedere date diverse, per esempio la fine del mese.</p>
<h2>Come spedire la disdetta del contratto di affitto</h2>
<p>La legge e quasi tutti i contratti richiedono la raccomandata con avviso di ricevimento. La PEC ha lo stesso valore se anche il proprietario ha un indirizzo PEC. Una consegna a mano va bene solo con la firma per ricevuta del proprietario su una copia. L’e-mail ordinaria o un messaggio non bastano a provare la data.</p>
<h2>Riconsegna e deposito</h2>
<p>La lettera chiede di concordare il sopralluogo e la riconsegna delle chiavi, e la restituzione del deposito cauzionale con gli interessi legali maturati, al netto di eventuali danni o canoni non pagati. Scatta foto della casa il giorno della riconsegna e fai firmare un verbale.</p>`,
  },
  en: {
    slug: 'italian-lease-termination-letter', nav: 'Lease termination', card: 'The tenant’s letter, with the end date',
    title: 'Disdetta: Italian lease termination letter for tenants',
    description: 'Italian lease termination letter (disdetta) for tenants: notice clause, serious reasons or end of term, with the end date set by Law 431/1998. Free PDF.',
    h1: 'Disdetta: Italian lease termination letter for tenants',
    intro: 'The disdetta is the letter in which an Italian tenant tells the landlord they are leaving: pick the reason, enter the sending date and the site works out when the lease ends.',
    resume: (h) => `Residential leases in Italy follow Law 431 of 1998. A tenant can leave in three ways. At the end of the term, by giving notice by registered letter at least ${h.num(h.P.preavviso_locatore_mesi)} months in advance, as article 2 provides for open-market leases. At any time, if the lease includes a right to withdraw with a set notice period. At any time for serious reasons, with ${h.num(h.P.recesso_gravi_motivi_mesi)} months’ notice under article 3, paragraph 6. Serious reasons must be new, unforeseeable and beyond your control, such as a job transfer, and must be stated in the letter. The form on this page writes the letter with the lease details, the reason chosen and a request to return the security deposit, and works out the date the lease ends from the day the letter arrives. The letter is in Italian, as your landlord and any court will expect. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Does notice run from when I send the letter or when it arrives?', a: 'From receipt. Notice takes effect when it reaches the landlord, so what counts is the date on the registered-letter receipt or the PEC delivery receipt. That is why it pays to send it a few days early, and why the form treats the sending date as an estimate.' },
      { q: 'What counts as serious reasons to leave a lease?', a: 'Italian courts accept facts that arose later, could not be foreseen and do not depend on the tenant, and that make staying a burden: a job transfer, losing your job, a health problem, a new baby in a flat that is too small. Write the reason in the letter: if the landlord disputes it, a judge decides.' },
      { q: 'Do I pay rent during the notice period?', a: `Yes. During the notice months the lease is still running: rent is due until the end date, even if you move out earlier. With serious-reasons withdrawal, for instance, a letter received today commits you to ${h.num(h.P.recesso_gravi_motivi_mesi)} months of rent. You can offer the landlord an early agreed termination if they find a new tenant.` },
      { q: 'Who registers the end of the lease with the Revenue Agency?', a: 'The termination must be reported to the Agenzia delle entrate within 30 days on Form RLI, and where due a 67-euro registration tax is paid. The landlord, who registered the lease, usually does it, but both parties are liable: agree on it and ask for a copy of the receipt.' },
    ],
    body: (h) => `<h2>Which reason to give in the disdetta</h2>
<p>«Notice clause in the lease» if your lease lets you leave with notice: choose the number of months in the clause. «Serious reasons» if the lease has no such clause or its notice is longer, and you have a serious new reason: notice is ${h.num(h.P.recesso_gravi_motivi_mesi)} months and you must state the reason. «At the end of the lease term» if you want to leave when the lease naturally ends: the site checks that the letter arrives at least ${h.num(h.P.preavviso_locatore_mesi)} months before.</p>
<h2>How the end date is worked out</h2>
<p>Notice is counted in months from the date the letter arrives: a letter received on 13 November with six months’ notice ends the lease on 13 May. If the day does not exist in the final month, such as the 31st, the last day of the month is used. The calculation follows ${h.src('l431', 'Law 431 of 1998')} and calendar months; your lease may set different dates, such as the end of the month.</p>
<h2>How to send the notice</h2>
<p>The law and nearly every lease require a registered letter with return receipt (raccomandata A/R). A PEC certified e-mail is equivalent if the landlord also has a PEC address. Hand delivery works only if the landlord signs a copy as received. Ordinary e-mail or a text message does not prove the date.</p>
<h2>Handing back the keys and the deposit</h2>
<p>The letter asks to agree on the inspection and key handover, and for the security deposit to be returned with accrued legal interest, minus any damage or unpaid rent. Take photos on handover day and have a handover report signed.</p>`,
  },
});
