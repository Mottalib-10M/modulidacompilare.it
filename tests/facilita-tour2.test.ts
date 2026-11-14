/**
 * Testeurs naïfs, 2e tour du 2026-11-14 (Facilité 7/10 chez les trois) : le champ qui fait le document
 * arrivait après neuf champs d'identité, dans une liste qui cachait ses choix ; le bandeau « Prima di
 * scaricare, scegli: … ?. » s'affichait avant toute saisie ; la phrase sur les données arrivait après le bouton.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { docById, valoriIniziali, campiVisibili, sceltaMancanti } from '../src/lib/engine';

describe('le champ qui fait le document vient juste après « Chi firma »', () => {
  for (const [doc, campo] of [['civile', 'stato'], ['penale', 'cosa'], ['reddito', 'tipo'], ['famiglia', 'componenti'], ['nascita', 'chi'], ['affitto', 'modo'], ['servizio', 'tipo']] as const) {
    it(`${doc}.${campo}`, () => {
      const d = docById(doc)!;
      const ids = campiVisibili(d, valoriIniziali(d, '2026-11-14')).map((c) => c.id);
      expect(ids[0]).toBe('sesso');
      expect(ids[1]).toBe(campo);
      expect(ids.indexOf(campo)).toBeLessThan(ids.indexOf('nome'));
    });
  }
  it('les champs qui en dépendent suivent le choix (conjoint, membres de la famille)', () => {
    const civ = docById('civile')!;
    const ids = campiVisibili(civ, { ...valoriIniziali(civ, '2026-11-14'), stato: 'coniugato' }).map((c) => c.id);
    expect(ids.slice(0, 5)).toEqual(['sesso', 'stato', 'coniuge', 'luogo_m', 'data_m']);
    const fam = docById('famiglia')!;
    const f = campiVisibili(fam, { ...valoriIniziali(fam, '2026-11-14'), componenti: '2' }).map((c) => c.id);
    expect(f.slice(0, 5)).toEqual(['sesso', 'componenti', 'm2_nome', 'm2_nascita', 'm2_rapporto']);
  });
  it('l’ordre des choix manquants suit l’affichage', () => {
    const civ = docById('civile')!;
    expect(sceltaMancanti(civ, valoriIniziali(civ, '2026-11-14')).map((c) => c.id)).toEqual(['sesso', 'stato']);
  });
});

describe('générateur : choix visibles, rien qui ressemble à une erreur avant le clic', () => {
  const src = readFileSync('src/components/doc/Generatore.tsx', 'utf8');
  it('boutons radio pour les choix courts, aucun pré-coché', () => {
    expect(src).toMatch(/type="radio"/);
    expect(src).toMatch(/checked=\{value === o\.value\}/);
  });
  it('plus de « Prima di scaricare, scegli: » ni de ponctuation collée', () => {
    expect(src).not.toContain('Prima di scaricare, scegli');
    expect(src).not.toMatch(/join\('; '\)\}\./);
    expect(src).toMatch(/avvisoMancanti && mancanti\.length > 0/);
  });
  it('la phrase sur les données précède le premier champ', () => {
    const i = src.indexOf('resta sul tuo telefono o computer');
    expect(i).toBeGreaterThan(0);
    expect(i).toBeLessThan(src.indexOf('{visibili.map(campo)}'));
  });
});
