import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'dimissioni-online', group: 'lettere', order: 14, doc: 'dimissioni',
  related: ['lettera-di-disdetta', 'delega-generica', 'autocertificazione-reddito'],
  sources: ['dlgs151', 'lavoro'],
  it: {
    slug: 'dimissioni-online', nav: 'Dimissioni online', card: 'Promemoria con preavviso e termine di revoca',
    title: 'Dimissioni online 2026: promemoria, preavviso e revoca',
    description: 'Dimissioni online: promemoria in PDF dei dati da inserire nel modulo telematico, ultimo giorno di lavoro secondo il preavviso del CCNL e 7 giorni per la revoca.',
    h1: 'Dimissioni online: promemoria, preavviso e revoca',
    intro: 'Le dimissioni online sono l’unico modo valido per lasciare un lavoro dipendente: il sito prepara il promemoria dei dati da inserire nel modulo telematico e calcola l’ultimo giorno di lavoro e il termine per ripensarci.',
    resume: (h) => `Dal 12 marzo 2016 le dimissioni e la risoluzione consensuale del rapporto di lavoro dipendente si fanno, a pena di inefficacia, solo con i moduli telematici del Ministero del lavoro: lo stabilisce l’articolo 26 del decreto legislativo n. 151 del 2015. Una lettera di dimissioni su carta, anche se firmata e consegnata, non produce effetti. Il lavoratore può inviare il modulo da solo, accedendo con SPID, CIE o CNS al portale del Ministero, oppure tramite un intermediario abilitato: patronato, sindacato, consulente del lavoro, ente bilaterale o commissione di certificazione. Entro ${h.num(h.P.revoca_dimissioni_giorni)} giorni dall’invio può revocare le dimissioni con la stessa procedura. Restano escluse alcune situazioni, come le dimissioni nel periodo protetto della maternità e della paternità, che si convalidano presso l’Ispettorato. Il sito non invia nulla: prepara un promemoria in PDF con i dati da inserire e calcola le date utili. Testo riletto il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Posso dare le dimissioni con una lettera o una e-mail?', a: 'No. Dal 2016 le dimissioni del lavoratore dipendente sono efficaci solo se trasmesse con il modulo telematico del Ministero del lavoro (art. 26 del D.Lgs. 151/2015). Una lettera può servire come cortesia verso il datore di lavoro, per annunciare la decisione, ma non sostituisce il modulo e non fa decorrere il preavviso.' },
      { q: 'Cosa succede se non rispetto il preavviso?', a: 'Il datore di lavoro può trattenere dalle ultime competenze, come TFR e ratei, un’indennità pari alla retribuzione dei giorni di preavviso non lavorati. Il preavviso è fissato dal contratto collettivo secondo livello e anzianità, e di solito decorre da date precise del mese. Puoi accordarti con il datore per una data diversa.' },
      { q: 'Chi si dimette ha diritto alla NASpI?', a: 'In generale no: la NASpI spetta a chi perde il lavoro involontariamente. Fanno eccezione le dimissioni per giusta causa, per esempio per mancato pagamento dello stipendio o molestie, e quelle durante il periodo tutelato di maternità. Per le dimissioni per giusta causa il modulo telematico ha una voce apposita.' },
      { q: 'Il datore di lavoro può dimettermi al posto mio?', a: `No. Il modulo telematico serve proprio a evitare le cosiddette dimissioni in bianco, firmate al momento dell’assunzione e usate più tardi. Solo il lavoratore, o un intermediario abilitato su sua richiesta, può inviarlo. Se qualcuno lo ha fatto senza il tuo consenso, puoi revocarlo entro ${h.num(h.P.revoca_dimissioni_giorni)} giorni e rivolgerti all’Ispettorato del lavoro.` },
    ],
    body: (h) => `<h2>Cosa contiene il promemoria</h2>
<p>I dati che il modulo telematico ti chiede e che conviene avere sotto mano prima di cominciare: il tuo codice fiscale, il nome e il codice fiscale o la partita IVA del datore di lavoro, la data di inizio del rapporto, il tipo di contratto e il CCNL applicato, che trovi in busta paga. Poi le date calcolate: il giorno entro cui puoi revocare le dimissioni e l’ultimo giorno di lavoro stimato in base ai giorni di preavviso che scegli.</p>
<h2>Come si inviano le dimissioni online</h2>
<p>Accedi al ${h.src('lavoro', 'portale del Ministero del lavoro')} con SPID, CIE o CNS, cerca il servizio delle dimissioni volontarie, compila i dati del rapporto, scegli tra dimissioni, dimissioni per giusta causa o risoluzione consensuale, e invia. Il modulo arriva per PEC al datore di lavoro e all’Ispettorato. Se preferisci farti aiutare, un patronato o un sindacato lo invia gratuitamente o con un piccolo costo.</p>
<h2>Revoca entro sette giorni</h2>
<p>L’${h.src('dlgs151', 'articolo 26 del D.Lgs. 151/2015')} ti dà ${h.num(h.P.revoca_dimissioni_giorni)} giorni dalla trasmissione per revocare le dimissioni con la stessa procedura telematica. Il promemoria indica la data esatta. Dopo la revoca il rapporto continua come se le dimissioni non ci fossero state.</p>
<h2>Il preavviso e l’ultimo giorno</h2>
<p>Il contratto collettivo fissa i giorni di preavviso, spesso diversi per livello e anzianità, e a volte stabilisce che decorrono dal 1° o dal 16 del mese. Il sito conta i giorni di calendario dalla data di invio: è una stima. Verifica nel tuo CCNL se il preavviso si conta in giorni di calendario o lavorativi e da quando decorre.</p>`,
  },
  en: {
    slug: 'resignation-online-italy', nav: 'Online resignation', card: 'Checklist with notice and cooling-off dates',
    title: 'Resigning from a job in Italy online: checklist and dates',
    description: 'How to resign online in Italy: a PDF checklist of what the ministry form asks, your last working day from the CCNL notice and the 7-day window to take it back.',
    h1: 'Resigning online in Italy: checklist, notice and revocation',
    intro: 'Resigning online is the only valid way to leave an employed job in Italy: the site prepares a checklist of what to enter in the ministry’s online form and works out your last working day and the deadline to change your mind.',
    resume: (h) => `Since 12 March 2016 resignations and agreed terminations of Italian employment have been valid only if filed through the Ministry of Labour’s online forms: article 26 of Legislative Decree 151 of 2015 says so, on pain of having no effect. A paper resignation letter, even signed and handed over, does nothing. Employees can file the form themselves, logging in to the ministry portal with SPID, CIE or CNS, or through an authorised intermediary: a patronato, trade union, labour consultant, bilateral body or certification commission. Within ${h.num(h.P.revoca_dimissioni_giorni)} days of filing they can take the resignation back through the same procedure. Some situations are excluded, such as resigning during the protected maternity and paternity period, which is validated at the Labour Inspectorate instead. The site sends nothing: it prepares a PDF checklist of the details to enter, in Italian, and works out the key dates. Text reread on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Can I resign by letter or e-mail?', a: 'No. Since 2016 an employee’s resignation takes effect only when filed through the Ministry of Labour’s online form (art. 26 Legislative Decree 151/2015). A letter can be a courtesy to announce your decision to the employer, but it does not replace the form and does not start the notice period.' },
      { q: 'What happens if I do not work my notice?', a: 'The employer can deduct from your final pay, such as severance (TFR) and accrued amounts, an indemnity equal to the pay for the notice days not worked. Notice is set by the collective agreement according to grade and seniority, and often runs from set dates in the month. You can agree a different date with the employer.' },
      { q: 'Do I get unemployment benefit (NASpI) if I resign?', a: 'Generally not: NASpI is for people who lose their job involuntarily. Exceptions are resignation for just cause, for example unpaid wages or harassment, and resignation during the protected maternity period. The online form has a separate option for resignation for just cause.' },
      { q: 'Can my employer resign on my behalf?', a: `No. The online form exists precisely to stop so-called blank resignations, signed when hired and used later. Only the employee, or an authorised intermediary at their request, can file it. If someone did so without your consent, you can revoke it within ${h.num(h.P.revoca_dimissioni_giorni)} days and contact the Labour Inspectorate.` },
    ],
    body: (h) => `<h2>What the checklist contains</h2>
<p>The details the online form asks for, worth having at hand before you start: your tax code, the employer’s name and tax code or VAT number, the start date of the job, the contract type and the collective agreement (CCNL) applied, shown on your payslip. Then the computed dates: the day by which you can revoke the resignation and your estimated last working day based on the notice days you choose.</p>
<h2>Resigning from a job in Italy online, step by step</h2>
<p>Log in to the ${h.src('lavoro', 'Ministry of Labour portal')} with SPID, CIE or CNS, find the voluntary resignation service, fill in the job details, choose between resignation, resignation for just cause or agreed termination, and send. The form reaches the employer and the Inspectorate by PEC. If you would rather have help, a patronato or trade union files it for free or for a small fee.</p>
<h2>Seven days to take it back</h2>
<p>${h.src('dlgs151', 'Article 26 of Legislative Decree 151/2015')} gives you ${h.num(h.P.revoca_dimissioni_giorni)} days from filing to revoke the resignation through the same online procedure. The checklist shows the exact date. After revocation the job continues as if you had never resigned.</p>
<h2>Notice and your last day</h2>
<p>The collective agreement sets the notice days, often different by grade and seniority, and sometimes says they run from the 1st or 16th of the month. The site counts calendar days from the filing date: it is an estimate. Check in your CCNL whether notice counts calendar or working days and from when it runs.</p>`,
  },
});
