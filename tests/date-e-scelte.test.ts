/**
 * Testeurs naïfs du 2026-11-14 (modulidacompilare.it) : dates affichées « mm/dd/yyyy » par le champ
 * `type="date"` (le navigateur suit sa propre langue, pas celle de la page), et choix qui engagent
 * pré-remplis (« Stato libero », « Donna »). Ces tests empêchent le retour des deux défauts.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { leggiData, dataIt, DOCUMENTI, docById, valoriIniziali, sceltaMancanti, creaPdf } from '../src/lib/engine';

describe('dates à l’italienne (gg/mm/aaaa)', () => {
  it('lit jour/mois/année, jamais mois/jour', () => {
    expect(leggiData('07/04/1965')).toBe('1965-04-07');
    expect(leggiData('7/4/1965')).toBe('1965-04-07');
    expect(leggiData('07-04-1965')).toBe('1965-04-07');
    expect(leggiData('07.04.1965')).toBe('1965-04-07');
    expect(leggiData('07041965')).toBe('1965-04-07');
    expect(leggiData('14/11/2026')).toBe('2026-11-14');
  });
  it('refuse une date américaine ou impossible', () => {
    expect(leggiData('11/14/2026')).toBe('');
    expect(leggiData('31/02/2000')).toBe('');
    expect(leggiData('1965-04-07')).toBe('');
    expect(leggiData('500')).toBe('');
    expect(leggiData('')).toBe('');
  });
  it('le document et le PDF impriment gg/mm/aaaa', () => {
    const doc = docById('residenza')!;
    const v = { ...valoriIniziali(doc, '2026-11-14'), sesso: 'F', data_nascita: leggiData('07/04/1965') };
    const testo = doc.componi(v).righe.map((r) => r.t).join('\n');
    expect(testo).toContain('il 07/04/1965');
    expect(testo).toContain(', 14/11/2026');
    expect(testo).not.toMatch(/04\/07\/1965|11\/14\/2026/);
    const pdf = new TextDecoder('latin1').decode(creaPdf(doc.componi(v).righe, 'x'));
    expect(pdf).toContain('07/04/1965');
    expect(pdf).toContain('14/11/2026');
    expect(dataIt('2026-11-14')).toBe('14/11/2026');
  });
  it('aucun champ type="date" dans le générateur ni dans les pages construites', () => {
    const src = readFileSync('src/components/doc/Generatore.tsx', 'utf8');
    expect(src).not.toMatch(/type=\{?['"]date['"]|'date' : 'text'/);
    const dist = 'dist';
    if (!existsSync(dist)) return;
    const html: string[] = [];
    const walk = (d: string) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith('.html')) html.push(p); } };
    walk(dist);
    for (const p of html) expect(readFileSync(p, 'utf8'), p).not.toMatch(/type="date"/);
  });
});

describe('aucun choix qui engage n’est pré-rempli', () => {
  it('Chi firma, stato civile, casellario, reddito, famiglia : vides au départ', () => {
    for (const [doc, campo] of [['residenza', 'sesso'], ['civile', 'stato'], ['penale', 'cosa'], ['reddito', 'tipo'], ['famiglia', 'componenti'], ['delega', 'sesso_d'], ['affitto', 'modo'], ['testamento', 'revoca']] as const) {
      expect(valoriIniziali(docById(doc)!, '2026-11-14')[campo], `${doc}.${campo}`).toBe('');
    }
  });
  it('le téléchargement attend ces choix', () => {
    const civ = docById('civile')!;
    const v = valoriIniziali(civ, '2026-11-14');
    expect(sceltaMancanti(civ, v).map((c) => c.id)).toEqual(['sesso', 'stato']);
    expect(sceltaMancanti(civ, { ...v, sesso: 'F', stato: 'celibe' })).toEqual([]);
  });
  it('l’aperçu ne dit jamais « stato libero » tant que rien n’est choisi', () => {
    const civ = docById('civile')!;
    const testo = civ.componi(valoriIniziali(civ, '2026-11-14')).righe.map((r) => r.t).join(' ');
    expect(testo).not.toContain('stato libero');
    expect(testo).toContain('Il sottoscritto/La sottoscritta');
  });
  it('tout choix gardé par défaut est neutre (structure du document, ou « facoltativo »)', () => {
    const permis = new Set(['nascita.chi', 'notorieta.modello', 'reddito.fonte']);
    for (const d of DOCUMENTI) for (const c of d.campi) if (c.tipo === 'scelta' && c.def !== undefined) expect(permis.has(`${d.id}.${c.id}`), `${d.id}.${c.id}`).toBe(true);
  });
});
