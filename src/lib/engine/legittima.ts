/** Quote di riserva (codice civile art. 537, 538, 540, 542, 544) et quota disponibile, d'après P.legittima. */
import { P } from './params';
export type Caso = keyof Omit<typeof P.legittima, '_fonte'>;
export function caso(coniuge: boolean, figli: number, ascendenti: boolean): Caso {
  if (figli >= 2) return coniuge ? 'coniuge_piu_figli' : 'piu_figli';
  if (figli === 1) return coniuge ? 'coniuge_un_figlio' : 'un_figlio';
  if (coniuge) return ascendenti ? 'coniuge_ascendenti' : 'solo_coniuge';
  return ascendenti ? 'solo_ascendenti' : 'nessuno';
}
export interface Quote { coniuge: number; figli: number; perFiglio: number; ascendenti: number; disponibile: number }
export function quote(coniuge: boolean, figli: number, ascendenti: boolean, patrimonio = 1): Quote {
  const q = P.legittima[caso(coniuge, figli, ascendenti)];
  const disp = 1 - q.coniuge - q.figli - q.ascendenti;
  return { coniuge: q.coniuge * patrimonio, figli: q.figli * patrimonio, perFiglio: figli > 0 ? (q.figli * patrimonio) / figli : 0, ascendenti: q.ascendenti * patrimonio, disponibile: Math.max(0, disp) * patrimonio };
}
