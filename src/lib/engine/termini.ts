/** Termes et préavis : disdetta d'un bail (L. 431/1998), recesso d'un service, dimissioni (D.Lgs. 151/2015). */
import { P } from './params';
import { aggiungiGiorni, aggiungiMesi, giorniTra, valida } from './date';

/** Disdetta pour l'échéance : dernier jour pour envoyer la raccomandata (échéance − N mois). */
export function inviaEntro(scadenza: string, mesi: number = P.preavviso_locatore_mesi): string { return aggiungiMesi(scadenza, -mesi); }
/** Recesso avec préavis : le contrat cesse N mois après la réception de la lettre. */
export function fineRecesso(ricezione: string, mesi: number = P.recesso_gravi_motivi_mesi): string { return aggiungiMesi(ricezione, mesi); }
/** Recesso d'un service : effet après le préavis en jours (téléphonie : 30 jours au plus, DL 7/2007). */
export function fineServizio(ricezione: string, giorni: number): string { return aggiungiGiorni(ricezione, giorni); }
export const preavvisoTelefonia = (giorniContratto: number) => Math.min(giorniContratto, P.preavviso_max_telefonia_giorni);
/** Recesso de 14 jours (Codice del consumo art. 52) : dernier jour pour l'envoyer. */
export const ultimoGiornoRecesso = (inizio: string, visitaNonRichiesta = false) => aggiungiGiorni(inizio, visitaNonRichiesta ? P.recesso_visita_non_richiesta_giorni : P.recesso_distanza_giorni);
/** Dimissioni : revoca possibile entro 7 giorni dalla trasmissione (art. 26 c. 2). */
export const revocaEntro = (trasmissione: string) => aggiungiGiorni(trasmissione, P.revoca_dimissioni_giorni);
/** Dernier jour de travail si le préavis (jours de calendrier, fixé par le contrat collectif) court du lendemain de l'envoi. */
export const ultimoGiornoLavoro = (trasmissione: string, giorniPreavviso: number) => aggiungiGiorni(trasmissione, Math.max(0, giorniPreavviso));
export const inRitardo = (oggi: string, limite: string) => valida(oggi) && valida(limite) && giorniTra(limite, oggi) > 0;
