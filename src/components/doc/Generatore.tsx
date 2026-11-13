/**
 * Le générateur : champs à gauche, document composé en direct à droite, PDF fabriqué dans le
 * navigateur (aucune donnée envoyée). Premier rendu = valeurs vides et date du build (RECETTE §17.5) ;
 * la date du jour (heure de Rome) se pose après le montage, seulement si le champ n'a pas été touché.
 * Rien n'est écrit dans l'adresse de la page : les données personnelles n'ont rien à faire dans une URL.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { DOCUMENTI, docById, valoriIniziali, campiVisibili, type Campo, type Valori, type Lingua } from '../../lib/engine/documenti';
import { creaPdf } from '../../lib/engine/pdf';
import { verificaCf, normalizzaCf } from '../../lib/engine/cf';

interface Props { lang: Lingua; id: string; doc?: string; scelta?: boolean; methodHref?: string }
const T = <A,>(l: Lingua, it: A, en: A) => (l === 'en' ? en : it);
const oggiRoma = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
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
  const composto = useMemo(() => doc.componi(v), [doc, v]);
  const visibili = campiVisibili(doc, v);
  const testo = composto.righe.map((r) => r.t).join('\n');
  const piede = 'Compilato con modulidacompilare.it, sito indipendente: modello indicativo, non è consulenza legale.';
  const scarica = () => {
    const bytes = creaPdf(composto.righe, piede);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    const nome = [doc.file, (v.cognome ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')].filter(Boolean).join('-');
    a.href = URL.createObjectURL(blob); a.download = `${nome}.pdf`;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  };
  const copia = async () => { try { await navigator.clipboard.writeText(testo); setCopiato(true); } catch { setCopiato(false); } };

  const campo = (c: Campo) => {
    const fid = `${id}-${c.id}`;
    const label = c.label[lang];
    const aiuto = c.aiuto?.[lang];
    if (c.tipo === 'scelta') return <SelectField key={c.id} id={fid} label={label} value={v[c.id] ?? ''} onChange={set(c.id)} options={(c.opzioni ?? []).map((o) => ({ value: o.v, label: o.l[lang] }))} help={aiuto} />;
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
          : <input id={fid} type={c.tipo === 'data' ? 'date' : 'text'} value={v[c.id] ?? ''} autoComplete="off" spellCheck={c.tipo === 'testo'}
              onChange={(e) => set(c.id)(c.tipo === 'cf' ? e.target.value.toUpperCase() : e.target.value)} aria-describedby={desc} className={`${BASE} h-12 ${c.tipo === 'cf' ? 'uppercase tracking-wider' : ''}`} />}
        {(aiuto || stato) && <p id={`${fid}-help`} className={`mt-1 text-xs ${stato && verificaCf(v.cf ?? '') === 'controllo' ? 'font-medium text-red-700' : 'text-navy-500'}`}>{[aiuto, stato].filter(Boolean).join(' · ')}</p>}
      </div>
    );
  };

  const gruppi = [
    { l: T(lang, 'Autocertificazioni', 'Self-certifications'), ids: ['residenza', 'famiglia', 'nascita', 'civile', 'studio', 'reddito', 'penale', 'notorieta'] },
    { l: T(lang, 'Deleghe', 'Delegations'), ids: ['delega', 'ritiro'] },
    { l: T(lang, 'Lettere e altri', 'Letters and other'), ids: ['affitto', 'servizio', 'dimissioni', 'testamento'] },
  ];
  return (
    <div className="rechner grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div role="group" className="grid content-start gap-4" aria-label={doc.nome[lang]}>
        {scelta && (
          <SelectField id={`${id}-doc`} label={T(lang, 'Documento da compilare', 'Document to fill in')} value={doc.id} onChange={cambiaDoc}
            options={gruppi.flatMap((g) => g.ids.map((i) => ({ value: i, label: `${g.l}: ${docById(i)!.nome[lang]}` })))} />
        )}
        {visibili.map(campo)}
      </div>
      <div className="lg:sticky lg:top-20 lg:self-start" data-resultat aria-live="polite">
        <p className="mb-2 text-sm font-medium text-navy-600">{doc.pdf ? T(lang, 'Anteprima: il documento si aggiorna mentre scrivi', 'Preview: the document updates as you type (it stays in Italian)') : T(lang, 'Testo da ricopiare a mano', 'Text to copy out by hand (in Italian)')}</p>
        <div lang="it" className="max-h-[34rem] overflow-y-auto rounded-lg border border-navy-200 bg-white p-4 font-serif text-[0.9rem] leading-relaxed text-navy-900 shadow-sm sm:p-6">
          {composto.righe.map((r, i) => (
            <p key={i} style={{ marginTop: r.gap ? Math.min(r.gap, 18) : 0 }} className={`${r.b ? 'font-bold' : ''} ${r.c ? 'text-center' : r.r ? 'text-right' : ''} ${r.s && r.s < 10 ? 'text-[0.8rem] text-navy-700' : ''} ${r.s && r.s > 12 ? 'text-base' : ''}`}>{r.t}</p>
          ))}
        </div>
        {composto.avvisi.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm">
            {composto.avvisi.map((a, i) => <li key={i} className={`rounded-md border-l-4 px-3 py-1.5 ${a.tipo === 'ok' ? 'border-green-700 bg-green-50 text-navy-900' : 'border-amber-500 bg-amber-50 text-navy-900'}`}>{a.testo[lang]}</li>)}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {doc.pdf && <button type="button" onClick={scarica} className="rounded-lg bg-accent-700 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-800">{T(lang, 'Scarica il PDF', 'Download the PDF')}</button>}
          <button type="button" onClick={copia} className="rounded-lg border border-accent-700 px-5 py-3 text-sm font-semibold text-accent-800 hover:bg-accent-50">{copiato ? T(lang, 'Testo copiato', 'Text copied') : T(lang, 'Copia il testo', 'Copy the text')}</button>
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-navy-700">
          {doc.promemoria.map((p, i) => <li key={i}>{p[lang]}</li>)}
        </ul>
        <p className="mt-3 text-xs text-navy-600">{T(lang, 'Modello indicativo scritto sul testo di legge, non è consulenza legale. Nessun dato lascia il tuo computer: il PDF nasce nel browser.', 'Indicative template written from the law, not legal advice. No data leaves your computer: the PDF is created in your browser.')}{methodHref && <> <a href={methodHref} className="underline">{T(lang, 'Metodo e fonti', 'Method and sources')}</a></>}</p>
      </div>
    </div>
  );
}
