/**
 * Articles de fond repliés (RECETTE §26, « texte replié » ; testeurs naïfs du 2026-11-14) : sous le
 * générateur, chaque section `<h2>` devient un `<details>` dont seul le titre se voit. Les trois testeurs
 * décrochaient devant des écrans de texte juridique affiché en entier et rataient la FAQ plus bas. Le texte
 * reste entier dans le HTML servi. Une section qui porte un mini-simulateur (`<!--mini:…-->`) reste ouverte.
 */
export function replieSezioni(html: string): string {
  const parti = html.split(/(?=<h2[\s>])/);
  return parti.map((p) => {
    const m = p.match(/^<h2([^>]*)>([\s\S]*?)<\/h2>([\s\S]*)$/);
    if (!m || p.includes('<!--mini:')) return p;
    return `<details class="sezione"><summary><h2${m[1]}>${m[2]}</h2></summary>${m[3]}</details>`;
  }).join('');
}
