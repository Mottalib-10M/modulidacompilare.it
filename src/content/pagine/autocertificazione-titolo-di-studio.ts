import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'autocertificazione-titolo-di-studio', group: 'autocertificazioni', order: 5, doc: 'studio',
  related: ['autocertificazione-carichi-pendenti', 'autocertificazione-reddito', 'dichiarazione-sostitutiva-atto-di-notorieta'],
  sources: ['art46', 'art3', 'art75', 'art40'],
  it: {
    slug: 'autocertificazione-titolo-di-studio', nav: 'Titolo di studio', card: 'Diploma o laurea, con scuola, anno e voto',
    title: 'Autocertificazione titolo di studio: modulo PDF online',
    description: 'Autocertificazione del titolo di studio da compilare: diploma o laurea, scuola o università, anno e voto, formula dell’art. 46 DPR 445/2000. PDF gratis.',
    h1: 'Autocertificazione del titolo di studio da compilare',
    intro: 'L’autocertificazione del titolo di studio dichiara il diploma o la laurea che hai conseguito, la scuola o l’università, l’anno e il voto: scrivi i dati e scarica il PDF da firmare.',
    resume: (h) => `La lettera m dell’articolo 46 del DPR 445/2000 permette di dichiarare con un foglio firmato il titolo di studio, gli esami sostenuti, la qualifica professionale e le specializzazioni, al posto del certificato rilasciato dalla scuola o dall’università. È la dichiarazione più usata nei concorsi pubblici, nelle graduatorie per le supplenze, nelle domande di iscrizione a master e corsi, nelle selezioni per i centri per l’impiego. Il modulo di questa pagina chiede il nome esatto del titolo, la scuola o l’università che lo ha rilasciato e la sua sede, l’anno o la data del conseguimento e, se vuoi, la votazione finale. Per una laurea conviene indicare anche la classe, per esempio LM-77, perché è quella che i bandi richiamano per l’ammissione. Gli uffici pubblici verificano presso l’istituto: chi dichiara un titolo mai conseguito perde il posto ottenuto e risponde penalmente. Testo riletto su Normattiva il ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'Ho una laurea presa all’estero: la posso autocertificare?', a: 'Un titolo straniero si può dichiarare, ma per valere in Italia deve di solito essere riconosciuto, per esempio con l’equipollenza o con la dichiarazione di valore e l’attestato di comparabilità. I cittadini di Stati non UE possono autocertificare solo titoli presi in Italia o già riconosciuti da un ufficio italiano (art. 3). Il bando del concorso dice cosa serve.' },
      { q: 'Devo scrivere il voto finale?', a: 'Solo se l’ufficio lo chiede, come accade nelle graduatorie a punteggio e in molti concorsi, dove il voto dà punti. Nel modulo il campo è facoltativo: se lo lasci vuoto, la frase sul voto non compare. Scrivilo come appare sul diploma, per esempio 110/110 e lode o 100/100, senza arrotondamenti.' },
      { q: 'Un datore di lavoro privato può chiedermi il diploma originale?', a: 'Sì. L’obbligo di accettare l’autocertificazione riguarda la pubblica amministrazione e i gestori di pubblici servizi. Un’azienda privata può chiederti il certificato o una copia del diploma, e l’università rilascia il certificato con la dicitura che lo rende utilizzabile solo tra privati. Molte aziende accettano comunque la dichiarazione.' },
    ],
    body: (h) => `<h2>Autocertificazione del titolo di studio: come scrivere il titolo</h2>
<p>Usa la denominazione ufficiale, non quella abbreviata: «diploma di istruzione secondaria superiore, liceo scientifico» invece di «maturità», «laurea magistrale in Economia e management (classe LM-77)» invece di «laurea in economia». Indica la scuola o l’università con il suo nome e la città. L’anno basta per un diploma; per una laurea molti bandi vogliono la data esatta della discussione, che trovi nel libretto o nell’area riservata dell’ateneo.</p>
<h2>Titoli, esami e qualifiche</h2>
<p>La stessa lettera dell’${h.src('art46', 'articolo 46')} copre gli esami sostenuti, utili quando chiedi un trasferimento di corso o una borsa, le qualifiche professionali e i titoli di specializzazione, abilitazione, formazione e aggiornamento. Il modulo è pensato per un titolo alla volta: per dichiararne più di uno, compila e scarica più fogli, oppure elencali nel campo del titolo separati da punto e virgola.</p>
<h2>Cosa controlla l’ufficio</h2>
<p>Gli uffici pubblici non possono chiedere il certificato (${h.src('art40', 'articolo 40')}), ma controllano: scrivono alla scuola o all’università, che deve rispondere. Se il titolo non risulta, decadono i benefici ottenuti, compreso un posto vinto in concorso, e per ${h.num(h.P.divieto_benefici_anni)} anni si resta esclusi da contributi e agevolazioni (${h.src('art75', 'articolo 75')}).</p>
<h2>Titoli presi da stranieri</h2>
<p>Un cittadino non UE regolarmente soggiornante può autocertificare il titolo preso in Italia, o riconosciuto da un ufficio italiano, perché è un dato in possesso di un ente pubblico italiano (${h.src('art3', 'articolo 3')}). Per un titolo preso nel paese d’origine e non riconosciuto servono i documenti stranieri tradotti, salvo diverse convenzioni.</p>`,
  },
  en: {
    slug: 'education-qualification-self-certification', nav: 'Education', card: 'Diploma or degree, with school, year and mark',
    title: 'Education self-certification in Italy: PDF form online',
    description: 'Self-certify your Italian diploma or degree: school or university, year and final mark, worded on article 46 of DPR 445/2000. Free PDF and no account.',
    h1: 'Education qualification self-certification, Italy',
    intro: 'The education qualification self-certification states the diploma or degree you obtained, the school or university, the year and the mark: type the details and download the PDF to sign.',
    resume: (h) => `Letter m of article 46 of Presidential Decree 445/2000 lets you declare on a signed sheet your qualification, the exams you passed, your professional qualifications and specialisations, instead of a certificate issued by the school or university. It is the declaration most used in public competitions, in rankings for supply teaching, in applications for master’s programmes and courses, and in job-centre selections. The form on this page asks for the exact name of the qualification, the school or university that awarded it and its location, the year or date awarded and, if you wish, the final mark. For a degree it helps to add the class, for example LM-77, because calls for applications refer to it for admission. Public offices check with the institution: anyone who declares a qualification never obtained loses the post won and faces criminal charges. Text reread on Normattiva on ${h.date(h.P.retrieved_at)}.`,
    faqs: (h) => [
      { q: 'My degree is from abroad: can I self-certify it?', a: 'You can declare a foreign qualification, but to count in Italy it usually needs recognition, such as equivalence or a declaration of value and a CIMEA comparability statement. Non-EU nationals may self-certify only qualifications obtained in Italy or already recognised by an Italian office (art. 3). The call for applications says what is needed.' },
      { q: 'Do I have to give the final mark?', a: 'Only if the office asks, as in points-based rankings and many competitions where the mark earns points. In the form the field is optional: leave it empty and the sentence about the mark disappears. Write it as it appears on the diploma, for example 110/110 cum laude or 100/100, without rounding.' },
      { q: 'Can a private employer ask for my original diploma?', a: 'Yes. The duty to accept self-certifications binds public administrations and public-service operators. A private company may ask for the certificate or a copy of the diploma, and the university issues a certificate marked as usable only between private parties. Many companies accept the declaration anyway.' },
    ],
    body: (h) => `<h2>Education self-certification in Italy: writing the qualification</h2>
<p>Use the official name rather than a short form: «diploma di istruzione secondaria superiore, liceo scientifico» rather than «maturità», «laurea magistrale in Economia e management (classe LM-77)» rather than «economics degree». Give the school or university by name, with the city. The year is enough for a diploma; for a degree many calls want the exact graduation date, shown in your student record or on the university portal.</p>
<h2>Qualifications, exams and professional titles</h2>
<p>The same letter of ${h.src('art46', 'article 46')} covers exams passed, useful when you transfer courses or apply for a grant, professional qualifications and titles of specialisation, licensing, training and refresher courses. The form handles one qualification at a time: to declare more, fill in and download several sheets, or list them in the qualification field separated by semicolons.</p>
<h2>What the office checks</h2>
<p>Public offices cannot ask for the certificate (${h.src('art40', 'article 40')}) but they do check: they write to the school or university, which must answer. If the qualification is not on record, any benefit obtained is lost, including a post won in a competition, and for ${h.num(h.P.divieto_benefici_anni)} years you are barred from grants and reliefs (${h.src('art75', 'article 75')}).</p>
<h2>Qualifications held by foreign nationals</h2>
<p>A lawfully staying non-EU national may self-certify a qualification obtained in Italy, or recognised by an Italian office, because an Italian public body holds that information (${h.src('art3', 'article 3')}). For one obtained in the home country and not recognised, translated foreign documents are needed unless a convention says otherwise.</p>`,
  },
});
