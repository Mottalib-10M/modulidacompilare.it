/**
 * Le générateur : champs à gauche, document composé en direct à droite, PDF fabriqué dans le
 * navigateur (aucune donnée envoyée). Premier rendu = valeurs vides et date du build (RECETTE §17.5) ;
 * la date du jour (heure de Rome) se pose après le montage, seulement si le champ n'a pas été touché.
 * Rien n'est écrit dans l'adresse de la page : les données personnelles n'ont rien à faire dans une URL.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { DOCUMENTI, docById, valoriIniziali, campiVisibili, sceltaMancanti, type Campo, type Valori, type Lingua } from '../../lib/engine/documenti';
import { dataIt, leggiData, valida } from '../../lib/engine/date';
import { creaPdf } from '../../lib/engine/pdf';
import { verificaCf, normalizzaCf } from '../../lib/engine/cf';

interface Props { lang: Lingua; id: string; doc?: string; scelta?: boolean; methodHref?: string }
const T = <A,>(l: Lingua, it: A, en: A) => (l === 'en' ? en : it);
const oggiRoma = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
/**
 * Champ de date à l'italienne (testeurs naïfs du 2026-11-14) : le champ de date natif du navigateur s’affiche dans la
 * langue du navigateur (« mm/dd/yyyy », « 11/14/2026 » chez trois testeurs sur trois), quel que soit le
 * `lang` de la page. Ici un champ texte gg/mm/aaaa : ce qu'on tape n'est jamais réécrit pendant la frappe
 * (check-saisie), la forme 07/04/1965 n'est posée qu'en quittant le champ. La valeur gardée reste ISO.
 */
function DataField({ id, label, value, onChange, lang, help, esempio }: { id: string; label: string; value: string; onChange: (iso: string) => void; lang: Lingua; help?: string; esempio?: boolean }) {
  const [testo, setTesto] = useState(() => (valida(value) ? dataIt(value) : ''));
  const [uscito, setUscito] = useState(false);
  const ultimo = useRef(value);
  useEffect(() => {
    // Valeur posée de l'extérieur (date du jour après le montage, autre document) : on l'affiche.
    if (value !== ultimo.current) { ultimo.current = value; if (leggiData(testo) !== value) setTesto(valida(value) ? dataIt(value) : ''); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const errata = uscito && testo.trim() !== '' && !leggiData(testo);
  // L'exemple ne s'écrit qu'une fois, sous la première date à taper (2e tour : répété sous chaque date, même sous la date de signature déjà remplie).
  const aiuto = esempio ? T(lang, 'Giorno/mese/anno, per esempio 07/04/1965 (o solo le cifre: 07041965)', 'Day/month/year, for example 07/04/1965 (or just the digits: 07041965)') : undefined;
  return (
    <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input id={id} type="text" lang="it" inputMode="numeric" placeholder={T(lang, 'gg/mm/aaaa', 'dd/mm/yyyy')} value={testo} autoComplete="off" spellCheck={false} maxLength={12}
        onChange={(e) => { const t = e.target.value; setTesto(t); setUscito(false); const iso = leggiData(t); ultimo.current = iso; onChange(iso); }}
        onBlur={() => { setUscito(true); const iso = leggiData(testo); if (iso) setTesto(dataIt(iso)); }}
        aria-invalid={errata || undefined} aria-describedby={`${id}-help`} className={`${BASE} h-12 ${errata ? 'border-red-600' : ''}`} />
      <div id={`${id}-help`} className={`mt-1 text-xs ${errata ? 'font-medium text-red-700' : 'text-navy-500'}`}>{errata ? T(lang, 'Data non valida: scrivi giorno/mese/anno, per esempio 07/04/1965', 'Invalid date: write day/month/year, for example 07/04/1965') : [help, aiuto].filter(Boolean).join(' · ')}</div>
    </div>
  );
}

/**
 * Choix en boutons radio visibles (testeurs naïfs, 2e tour du 2026-11-14) : une liste « Scegli… » cachait ses choix.
 * Aucun bouton coché au départ quand le choix engage ; le `<select>` reste pour les longues listes (plus de 6 choix).
 */
function SceltaRadio({ id, label, value, onChange, options, help, manca, lang }: { id: string; label: string; value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }>; help?: string; manca?: boolean; lang: Lingua }) {
  const corti = options.every((o) => o.label.length <= 16);
  return (
    <div id={id} tabIndex={-1} role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={help || manca ? `${id}-help` : undefined} aria-invalid={manca || undefined} className="grid grid-rows-subgrid row-span-3 content-start gap-y-0 focus:outline-none">
      <span id={`${id}-label`} className="mb-1 block text-sm font-medium text-navy-700">{label}</span>
      <div className={corti ? 'flex flex-wrap gap-2' : 'grid gap-2'}>
        {options.map((o) => (
          <label key={o.value} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border bg-white px-3 py-2 text-[0.95rem] leading-snug text-navy-900 has-[:checked]:border-accent-600 has-[:checked]:bg-accent-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-500/40 ${corti ? 'min-w-12 justify-center' : ''} ${manca ? 'border-red-600' : 'border-navy-300'}`}>
            <input type="radio" name={id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="h-5 w-5 shrink-0 accent-accent-700" />
            <span className="[overflow-wrap:anywhere]">{o.label}</span>
          </label>
        ))}
      </div>
      {(help || manca) && <p id={`${id}-help`} className={`mt-1 text-xs ${manca ? 'font-medium text-red-700' : 'text-navy-500'}`}>{manca ? T(lang, 'Manca questa risposta: tocca una delle scelte.', 'This answer is missing: tap one of the choices.') : help}</p>}
    </div>
  );
}

const BASE = 'w-full rounded-lg border border-navy-300 bg-white px-3 text-[0.95rem] text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40';

export default function Generatore({ lang, id, doc: docIniziale = 'residenza', scelta = false, methodHref }: Props) {
  const [docId, setDocId] = useState(docIniziale);
  const doc = docById(docId) ?? DOCUMENTI[0];
  const [tutti, setTutti] = useState<Record<string, Valori>>(() => ({ [doc.id]: valoriIniziali(doc, __BUILD_DAY__) }));
  const [toccati, setToccati] = useState<Record<string, boolean>>({});
  const [copiato, setCopiato] = useState(false);
  const v = tutti[doc.id] ?? valoriIniziali(doc, __BUILD_DAY__);
  useEffect(() => {
    const oggi = oggiRoma();
    if (oggi !== __BUILD_DAY__) setTutti((t) => Object.fromEntries(Object.entries(t).map(([k, val]) => [k, toccati[`${k}.data_firma`] ? val : { ...val, data_firma: oggi }])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const set = (campo: string) => (val: string) => {
    setTutti((t) => ({ ...t, [doc.id]: { ...(t[doc.id] ?? valoriIniziali(doc, oggiRoma())), [campo]: val } }));
    setToccati((t) => ({ ...t, [`${doc.id}.${campo}`]: true }));
    setCopiato(false);
  };
  const cambiaDoc = (nuovo: string) => {
    const d = docById(nuovo); if (!d) return;
    setTutti((t) => {
      if (t[nuovo]) return t;
      // Les données d'identité déjà saisies passent d'un document à l'autre.
      const base = valoriIniziali(d, oggiRoma());
      const prec = t[doc.id] ?? {};
      for (const k of ['sesso', 'nome', 'cognome', 'luogo_nascita', 'data_nascita', 'cf', 'comune', 'indirizzo']) if (k in base && prec[k]) base[k] = prec[k];
      return { ...t, [nuovo]: base };
    });
    setDocId(nuovo); setCopiato(false);
  };
  // Bouton « Scarica il PDF » collé en bas du téléphone, une fois la saisie commencée, tant que le vrai bouton
  // n'est pas à l'écran (2e tour : il était à 4 ou 5 écrans du haut).
  const radice = useRef<HTMLDivElement>(null);
  const pulsanti = useRef<HTMLDivElement>(null);
  const [inVista, setInVista] = useState({ radice: false, pulsanti: false });
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const o = new IntersectionObserver((voci) => setInVista((s) => {
      const n = { ...s };
      for (const e of voci) { if (e.target === radice.current) n.radice = e.isIntersecting; if (e.target === pulsanti.current) n.pulsanti = e.isIntersecting; }
      return n;
    }));
    if (radice.current) o.observe(radice.current);
    if (pulsanti.current) o.observe(pulsanti.current);
    return () => o.disconnect();
  }, []);
  const iniziato = Object.keys(toccati).some((k) => !k.endsWith('.data_firma'));
  // 3e tour : la barre n'apparaissait qu'après la première saisie, personne ne la voyait ; elle est là dès l'arrivée sur l'outil.
  const mostraBarra = inVista.radice && !inVista.pulsanti;
  // Aperçu vide replié (3e tour : un écran de « ____ » et de juridique avant le bouton) ; il s'ouvre en entier dès la première saisie.
  const [apertaAnteprima, setApertaAnteprima] = useState(false);
  const ridotta = !iniziato && !apertaAnteprima;
  const vaiAlPdf = () => pulsanti.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  const prima = (cls: string) => doc.prima && doc.prima.length > 0 && (
    <div className={`rounded-md border-l-4 border-amber-500 bg-amber-50 px-3 py-1.5 text-sm leading-snug text-navy-900 ${cls}`}>
      {doc.prima.map((p, i) => <p key={i}>{i === 0 && <strong>{T(lang, 'Prima di compilare: ', 'Before you start: ')}</strong>}{p[lang]}</p>)}
    </div>
  );
  const composto = useMemo(() => doc.componi(v), [doc, v]);
  const visibili = campiVisibili(doc, v);
  const primaData = visibili.find((c) => c.tipo === 'data' && c.id !== 'data_firma')?.id;
  const testo = composto.righe.map((r) => r.t).join('\n');
  // Phrase rassurante juste au-dessus du texte légal, seulement pour les formules que le document contient vraiment.
  const rassicura = [
    /sanzioni penali/.test(testo) && T(lang, '«Sanzioni penali», «falsità in atti», «dichiarazioni mendaci»: riguardano solo chi scrive il falso.', '«Sanzioni penali», «falsità in atti», «dichiarazioni mendaci» (penalties, false statements): they only concern people who write something false.'),
    /Regolamento UE 2016\/679/.test(testo) && T(lang, '«Regolamento UE 2016/679» è la legge sulla privacy: l’ufficio usa i tuoi dati solo per questa pratica.', '«Regolamento UE 2016/679» is the privacy law (GDPR): the office uses your data only for this procedure.'),
  ].filter(Boolean) as string[];
  const piede = 'Compilato con modulidacompilare.it, sito indipendente: modello indicativo, non è consulenza legale.';
  const scarica = () => {
    if (bloccato('pdf')) return;
    const bytes = creaPdf(composto.righe, piede);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    const nome = [doc.file, (v.cognome ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')].filter(Boolean).join('-');
    a.href = URL.createObjectURL(blob); a.download = `${nome}.pdf`;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  };
  const copia = async () => { if (bloccato('copia')) return; try { await navigator.clipboard.writeText(testo); setCopiato(true); } catch { setCopiato(false); } };

  const mancanti = sceltaMancanti(doc, v);
  // La liste « manca ancora » n'apparaît qu'au clic sur « Scarica » ou « Copia » (2e tour : affichée avant toute
  // saisie, elle passait pour une erreur).
  const [avvisoMancanti, setAvvisoMancanti] = useState<'' | 'pdf' | 'copia'>('');
  /** PDF et copie attendent les choix obligatoires : on amène le lecteur au premier qui manque. */
  const vaiA = (cid: string) => {
    const el = document.getElementById(`${id}-${cid}`);
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' }); el?.focus({ preventScroll: true });
  };
  const bloccato = (azione: 'pdf' | 'copia') => {
    if (!mancanti.length) return false;
    setAvvisoMancanti(azione);
    vaiA(mancanti[0].id);
    return true;
  };
  const campo = (c: Campo) => {
    const fid = `${id}-${c.id}`;
    const label = c.label[lang];
    const aiuto = c.aiuto?.[lang];
    if (c.tipo === 'scelta') {
      const opzioni = (c.opzioni ?? []).map((o) => ({ value: o.v, label: o.l[lang] }));
      const manca = !!avvisoMancanti && mancanti.some((m) => m.id === c.id);
      if (opzioni.length <= 6) return <SceltaRadio key={c.id} id={fid} label={label} value={v[c.id] ?? ''} onChange={set(c.id)} options={opzioni} help={aiuto} manca={manca} lang={lang} />;
      if (c.def === undefined && !opzioni.some((o) => o.value === '')) opzioni.unshift({ value: '', label: T(lang, 'Scegli…', 'Choose…') });
      return <SelectField key={c.id} id={fid} label={label} value={v[c.id] ?? ''} onChange={set(c.id)} options={opzioni} help={manca ? T(lang, 'Manca questa risposta: tocca la lista e scegli.', 'This answer is missing: tap the list and choose.') : aiuto} />;
    }
    if (c.tipo === 'data') return <DataField key={c.id} id={fid} label={label} value={v[c.id] ?? ''} onChange={set(c.id)} lang={lang} help={aiuto} esempio={c.id === primaData} />;
    let stato: string | undefined;
    if (c.tipo === 'cf') {
      const e = verificaCf(v.cf ?? '');
      stato = e === 'ok' ? T(lang, 'Codice fiscale valido', 'Valid codice fiscale') : e === 'controllo' ? T(lang, 'Carattere di controllo errato: ricontrolla', 'Wrong check character: check again') : e === 'vuoto' ? undefined : T(lang, `${normalizzaCf(v.cf ?? '').length} caratteri su 16`, `${normalizzaCf(v.cf ?? '').length} of 16 characters`);
    }
    const desc = aiuto || stato ? `${fid}-help` : undefined;
    return (
      <div key={c.id} className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
        <label htmlFor={fid} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
        {c.tipo === 'area'
          ? <textarea id={fid} rows={4} value={v[c.id] ?? ''} onChange={(e) => set(c.id)(e.target.value)} aria-describedby={desc} className={`${BASE} min-h-28 py-2`} />
          : <input id={fid} type="text" value={v[c.id] ?? ''} autoComplete="off" spellCheck={c.tipo === 'testo'}
              onChange={(e) => set(c.id)(c.tipo === 'cf' ? e.target.value.toUpperCase() : e.target.value)} aria-describedby={desc} className={`${BASE} h-12 ${c.tipo === 'cf' ? 'uppercase tracking-wider' : ''}`} />}
        {(aiuto || stato) && <p id={`${fid}-help`} className={`mt-1 text-xs ${stato && verificaCf(v.cf ?? '') === 'controllo' ? 'font-medium text-red-700' : 'text-navy-500'}`}>{[aiuto, stato].filter(Boolean).join(' · ')}</p>}
      </div>
    );
  };

  const ordine = ['residenza', 'famiglia', 'nascita', 'civile', 'studio', 'reddito', 'penale', 'notorieta', 'delega', 'ritiro', 'affitto', 'servizio', 'dimissioni', 'testamento'];
  return (
    <div ref={radice} className="rechner grid gap-4 lg:gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="text-sm font-medium text-navy-700 lg:col-span-2">{doc.pdf ? T(lang, '1. Compila i campi · 2. Controlla l’anteprima · 3. Scarica il PDF', '1. Fill in the fields · 2. Check the preview · 3. Download the PDF') : T(lang, '1. Compila i campi · 2. Ricopia a mano il testo che compare', '1. Fill in the fields · 2. Copy out by hand the text that appears')}{' '}<button type="button" onClick={vaiAlPdf} className="whitespace-nowrap font-semibold text-accent-800 underline lg:hidden">{doc.pdf ? T(lang, 'Vai al PDF ↓', 'Go to the PDF ↓') : T(lang, 'Vai al testo ↓', 'Go to the text ↓')}</button></div>
      {/* 3e tour : « Se hai una condanna, non usare questo testo », « Per l'ISEE questo foglio non basta »… arrivaient sous le bouton « Scarica il PDF ». */}

      {/* 3e tour : « Se hai una condanna, non usare questo testo », « Per l'ISEE questo foglio non basta »… arrivaient sous le bouton « Scarica il PDF ». */}
      <div role="group" className="grid content-start gap-4" aria-label={doc.nome[lang]}>
        {prima('lg:hidden')}
        {/* 2e tour : « Nessun dato lascia il tuo dispositivo » n'arrivait qu'après le bouton, une fois le codice fiscale tapé. */}
        <p className="rounded-md border-l-4 border-green-700 bg-green-50 px-3 py-1.5 text-sm text-navy-900"><span className="lg:hidden">{T(lang, 'Gratis e senza account. Quello che scrivi resta sul tuo telefono o computer: non viene inviato a nessuno e sparisce quando chiudi la pagina.', 'Free, no account. What you type stays on your phone or computer: it is sent to no one and disappears when you close the page.')}</span><span className="hidden lg:inline">{T(lang, 'Gratis e senza account: ciò che scrivi resta sul tuo computer.', 'Free, no account: what you type stays on your computer.')}</span></p>
        {scelta && (
          <SelectField id={`${id}-doc`} label={T(lang, 'Quale documento ti serve? Tocca qui per sceglierne un altro', 'Which document do you need? Tap here to pick another one')} help={T(lang, 'I campi qui sotto cambiano secondo il documento scelto.', 'The fields below change with the document you choose.')} value={doc.id} onChange={cambiaDoc}
            options={ordine.map((i) => ({ value: i, label: docById(i)!.nome[lang] }))} />
        )}
        {visibili.map(campo)}
      </div>
      <div className="lg:sticky lg:top-20 lg:self-start" data-resultat aria-live="polite">
        {prima('mb-3 hidden lg:block')}
        <p className="mb-2 text-sm font-medium text-navy-600">{doc.pdf ? T(lang, 'Anteprima: il documento si aggiorna mentre scrivi', 'Preview: the document updates as you type (it stays in Italian)') : T(lang, 'Testo da ricopiare a mano', 'Text to copy out by hand (in Italian)')}</p>
        {rassicura.length > 0 && (
          <div className="mb-2 rounded-md border-l-4 border-green-700 bg-green-50 px-3 py-2 text-[0.95rem] text-navy-900">
            <p className="font-semibold">{T(lang, 'Il testo qui sotto è quello che chiede la legge: lo scrive il sito per te, uguale in ogni autocertificazione.', 'The text below is the wording the law requires: the site writes it for you, the same in every self-certification.')}</p>
            {rassicura.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        )}
        <div lang="it" className="rounded-lg border border-navy-200 bg-white p-4 font-serif text-[0.9rem] leading-relaxed text-navy-900 shadow-sm sm:p-6">
          {(ridotta ? composto.righe.slice(0, 3) : composto.righe).map((r, i) => (
            <p key={i} style={{ marginTop: r.gap ? Math.min(r.gap, 18) : 0 }} className={`${r.b ? 'font-bold' : ''} ${r.c ? 'text-center' : r.r ? 'text-right' : ''} ${r.s && r.s < 10 ? 'text-[0.8rem] text-navy-700' : ''} ${r.s && r.s > 12 ? 'text-base' : ''}`}>{r.t}</p>
          ))}
          {ridotta && (
            <button type="button" onClick={() => setApertaAnteprima(true)} className="mt-3 font-sans text-sm font-semibold text-accent-800 underline">{T(lang, 'Il resto del documento si riempie mentre scrivi. Vedi tutto il testo ↓', 'The rest of the document fills in as you type. See the whole text ↓')}</button>
          )}
        </div>
        {composto.avvisi.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm">
            {composto.avvisi.map((a, i) => <li key={i} className={`rounded-md border-l-4 px-3 py-1.5 ${a.tipo === 'ok' ? 'border-green-700 bg-green-50 text-navy-900' : 'border-amber-500 bg-amber-50 text-navy-900'}`}>{a.testo[lang]}</li>)}
          </ul>
        )}
        {avvisoMancanti && mancanti.length > 0 && (
          <div className="mt-4 rounded-md border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
            <p className="font-medium">{avvisoMancanti === 'pdf' ? T(lang, 'Per scaricare il PDF manca ancora:', 'To download the PDF, still missing:') : T(lang, 'Per copiare il testo manca ancora:', 'To copy the text, still missing:')}</p>
            <ul className="mt-1 list-disc pl-5">
              {mancanti.map((c) => <li key={c.id}><button type="button" onClick={() => vaiA(c.id)} className="text-left underline">{(c.breve ?? c.label)[lang]}</button></li>)}
            </ul>
          </div>
        )}
        <div ref={pulsanti} className="mt-4 flex flex-wrap gap-3">
          {doc.pdf && <button type="button" onClick={scarica} className="rounded-lg bg-accent-700 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-800">{T(lang, 'Scarica il PDF', 'Download the PDF')}</button>}
          <button type="button" onClick={copia} className="rounded-lg border border-accent-700 px-5 py-3 text-sm font-semibold text-accent-800 hover:bg-accent-50">{copiato ? T(lang, 'Testo copiato', 'Text copied') : T(lang, 'Copia il testo (da incollare in un’e-mail)', 'Copy the text (to paste into an e-mail)')}</button>
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-navy-700">
          {doc.promemoria.map((p, i) => <li key={i}>{p[lang]}</li>)}
        </ul>
        {mostraBarra && (
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-200 bg-white/95 px-4 py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] lg:hidden">
            <button type="button" onClick={vaiAlPdf} className="w-full rounded-lg bg-accent-700 px-5 py-3 text-sm font-semibold text-white">{doc.pdf ? T(lang, 'Vai al PDF: anteprima e download ↓', 'Go to the PDF: preview and download ↓') : T(lang, 'Vai al testo da ricopiare ↓', 'Go to the text to copy ↓')}</button>
          </div>
        )}
        <p className="mt-3 text-xs text-navy-600">{T(lang, 'Modello indicativo scritto sul testo di legge, non è consulenza legale. Nessun dato lascia il tuo dispositivo: il PDF si crea qui, sul tuo telefono o computer.', 'Indicative template written from the law, not legal advice. No data leaves your device: the PDF is made right here, on your phone or computer.')}{methodHref && <> <a href={methodHref} className="underline">{T(lang, 'Metodo e fonti', 'Method and sources')}</a></>}</p>
      </div>
    </div>
  );
}
