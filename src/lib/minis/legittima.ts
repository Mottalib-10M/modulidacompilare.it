/** Patrimoine, conjoint, enfants, ascendants → quota disponibile e quote riservate (c.c. art. 537-544). */
import { T, eur, type L } from './_kit';
import { quote } from '../engine/legittima';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto puoi lasciare liberamente', 'How much you can leave freely'),
  cta: '',
  exemple: T(l, 'Esempio con 200.000 € di patrimonio, coniuge e due figli', 'Example with €200,000 of assets, a spouse and two children'),
  inputs: [
    { id: 'p', label: T(l, 'Valore del patrimonio', 'Value of your estate'), def: 200000, unit: '€' },
    { id: 'c', label: T(l, 'Coniuge o unito civilmente', 'Spouse or civil partner'), def: 1, options: [{ value: '1', label: T(l, 'Sì', 'Yes') }, { value: '0', label: 'No' }] },
    { id: 'f', label: T(l, 'Figli', 'Children'), def: 2, options: ['0', '1', '2', '3', '4', '5'].map((n) => ({ value: n, label: n })) },
    { id: 'a', label: T(l, 'Genitori in vita (se non hai figli)', 'Living parents (if you have no children)'), def: 0, options: [{ value: '0', label: 'No' }, { value: '1', label: T(l, 'Sì', 'Yes') }], showIf: (v) => v.f === 0 },
  ],
  run: (v) => {
    const q = quote(v.c === 1, v.f, v.f === 0 && v.a === 1, Math.max(0, v.p));
    const rows: Array<[string, string]> = [];
    if (q.coniuge) rows.push([T(l, 'Riservato al coniuge', 'Reserved to the spouse'), eur(q.coniuge, l)]);
    if (q.figli) rows.push([T(l, v.f > 1 ? `Riservato ai figli (${eur(q.perFiglio, l)} ciascuno)` : 'Riservato al figlio', v.f > 1 ? `Reserved to the children (${eur(q.perFiglio, l)} each)` : 'Reserved to the child'), eur(q.figli, l)]);
    if (q.ascendenti) rows.push([T(l, 'Riservato ai genitori', 'Reserved to the parents'), eur(q.ascendenti, l)]);
    return {
      head: [T(l, 'Quota disponibile', 'Freely disposable share'), eur(q.disponibile, l)],
      rows,
      note: T(l, 'Il coniuge ha anche il diritto di abitazione sulla casa familiare (art. 540). Si calcola sul patrimonio netto al momento della morte, donazioni comprese.', 'The spouse also keeps the right to live in the family home (art. 540). The base is the net estate at death, gifts included.'),
    };
  },
});
