import { describe, it, expect } from 'vitest';
import { verificaCf, carattereControllo, aggiungiMesi, dataIt, quote, inviaEntro, fineRecesso, revocaEntro, preavvisoTelefonia, ultimoGiornoRecesso, creaPdf, stringaPdf, aCapo, DOCUMENTI, valoriIniziali, campiVisibili } from './index';

describe('codice fiscale', () => {
  // Exemple classique : Mario Rossi, né à Rome le 01/01/1980 → RSSMRA80A01H501U.
  it('caractère de contrôle', () => { expect(carattereControllo('RSSMRA80A01H501')).toBe('U'); });
  it('vérification', () => {
    expect(verificaCf('RSSMRA80A01H501U')).toBe('ok');
    expect(verificaCf('rssmra80a01h501u')).toBe('ok');
    expect(verificaCf('RSSMRA80A01H501X')).toBe('controllo');
    expect(verificaCf('RSSMRA80A01')).toBe('corto');
    expect(verificaCf('')).toBe('vuoto');
  });
});

describe('dates', () => {
  it('mois sans débordement', () => { expect(aggiungiMesi('2026-08-31', 6)).toBe('2027-02-28'); expect(aggiungiMesi('2027-03-15', -6)).toBe('2026-09-15'); });
  it('forme italienne', () => { expect(dataIt('2026-11-13')).toBe('13/11/2026'); expect(dataIt('')).toBe('__/__/____'); });
  it('disdetta 6 mois avant la scadenza (L. 431/1998)', () => { expect(inviaEntro('2027-06-30')).toBe('2026-12-30'); });
  it('recesso gravi motivi : 6 mois', () => { expect(fineRecesso('2026-11-20')).toBe('2027-05-20'); });
  it('revoca des dimissioni : 7 jours', () => { expect(revocaEntro('2026-11-13')).toBe('2026-11-20'); });
  it('téléphonie : préavis plafonné à 30 jours', () => { expect(preavvisoTelefonia(90)).toBe(30); expect(preavvisoTelefonia(15)).toBe(15); });
  it('recesso 14 jours', () => { expect(ultimoGiornoRecesso('2026-11-01')).toBe('2026-11-15'); expect(ultimoGiornoRecesso('2026-11-01', true)).toBe('2026-12-01'); });
});

describe('legittima (c.c. 537-544)', () => {
  const c = (co: boolean, f: number, a: boolean) => Math.round(quote(co, f, a, 120).disponibile);
  it('coniuge seul : 1/2', () => expect(c(true, 0, false)).toBe(60));
  it('un enfant : 1/2', () => expect(c(false, 1, false)).toBe(60));
  it('deux enfants : 1/3', () => expect(c(false, 2, false)).toBe(40));
  it('conjoint + un enfant : 1/3', () => expect(c(true, 1, false)).toBe(40));
  it('conjoint + trois enfants : 1/4', () => { expect(c(true, 3, false)).toBe(30); expect(Math.round(quote(true, 3, false, 120).perFiglio)).toBe(20); });
  it('ascendants seuls : 2/3', () => expect(c(false, 0, true)).toBe(80));
  it('conjoint + ascendants : 1/4', () => expect(c(true, 0, true)).toBe(30));
  it('personne : tout', () => expect(c(false, 0, false)).toBe(120));
});

describe('pdf', () => {
  it('chaîne WinAnsi', () => { expect(stringaPdf('è (1)')).toBe('(\\350 \\(1\\))'); expect(stringaPdf('€')).toBe('(\\200)'); });
  it('retour à la ligne', () => { expect(aCapo('a '.repeat(400).trim(), 400, 11).length).toBeGreaterThan(1); });
  it('fichier valide', () => {
    const b = creaPdf([{ t: 'DICHIARAZIONE', b: true, c: true }, { t: 'Città, perché.' }], 'piede');
    const s = String.fromCharCode(...b);
    expect(s.startsWith('%PDF-1.4')).toBe(true); expect(s.trimEnd().endsWith('%%EOF')).toBe(true);
    const xref = Number(s.match(/startxref\n(\d+)/)![1]); expect(s.slice(xref, xref + 4)).toBe('xref');
  });
  it('plusieurs pages', () => { const b = creaPdf(Array.from({ length: 80 }, (_, i) => ({ t: `riga ${i}` }))); expect(String.fromCharCode(...b)).toContain('/Count 2'); });
});

describe('documents', () => {
  it('chaque document se compose sans valeur et avec des valeurs', () => {
    for (const doc of DOCUMENTI) {
      const v = valoriIniziali(doc, '2026-11-13');
      expect(doc.componi(v).righe.length).toBeGreaterThan(2);
      for (const c of doc.campi) if (c.tipo !== 'scelta') v[c.id] = c.tipo === 'data' ? '2026-11-13' : 'Prova';
      const t = doc.componi(v).righe.map((r) => r.t).join(' ');
      expect(t).not.toMatch(/undefined|NaN/);
      expect(campiVisibili(doc, v).length).toBeGreaterThan(2);
    }
  });
  it('accord au féminin', () => {
    const doc = DOCUMENTI.find((d) => d.id === 'residenza')!;
    const v = { ...valoriIniziali(doc, '2026-11-13'), sesso: 'F', nome: 'Maria', cognome: 'Rossi' };
    expect(doc.componi(v).righe.map((r) => r.t).join(' ')).toContain('La sottoscritta Maria Rossi, nata a');
  });
  it('disdetta tardive signalée', () => {
    const doc = DOCUMENTI.find((d) => d.id === 'affitto')!;
    const v = { ...valoriIniziali(doc, '2026-11-13'), modo: 'scadenza', scadenza: '2027-03-31' };
    expect(doc.componi(v).avvisi[0].tipo).toBe('attenzione');
  });
  it('testament : jamais de PDF', () => { expect(DOCUMENTI.find((d) => d.id === 'testamento')!.pdf).toBe(false); });
});
