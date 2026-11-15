/**
 * Testeurs naïfs, 3e tour du 2026-11-14 (Facilité 7/10 chez les trois) : avertissements bloquants sous le bouton,
 * bouton PDF à 4-5 écrans, aperçu vide plein de « ____ », jargon légal sans explication à côté.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { docById } from '../src/lib/engine';

describe('les avertissements qui empêchent d’utiliser le document passent au-dessus du formulaire', () => {
  for (const [doc, frase] of [['penale', 'Se hai una condanna'], ['reddito', 'Per l’ISEE'], ['nascita', 'Nato o nata all’estero'], ['studio', 'titolo preso all’estero'], ['testamento', 'Ricopia tutto a mano'], ['delega', 'procura dal notaio']] as const) {
    it(doc, () => {
      const d = docById(doc)!;
      expect(d.prima?.some((p) => p.it.includes(frase))).toBe(true);
      expect(d.promemoria.some((p) => p.it.includes(frase))).toBe(false);
    });
  }
  const src = readFileSync('src/components/doc/Generatore.tsx', 'utf8');
  it('rendus avant les champs', () => {
    expect(src.indexOf('doc.prima.map')).toBeGreaterThan(0);
    expect(src.indexOf("{prima('lg:hidden')}")).toBeLessThan(src.indexOf('{visibili.map(campo)}'));
  });
  it('lien « Vai al PDF » en tête et barre collée sans attendre la saisie', () => {
    expect(src).toContain("'Vai al PDF ↓'");
    expect(src).toMatch(/const mostraBarra = inVista\.radice && !inVista\.pulsanti;/);
  });
  it('aperçu vide replié, phrase rassurante à côté du texte légal', () => {
    expect(src).toMatch(/ridotta \? composto\.righe\.slice\(0, 3\)/);
    expect(src.indexOf('riguardano solo chi scrive il falso')).toBeLessThan(src.indexOf('lang="it" className="rounded-lg'));
  });
});
