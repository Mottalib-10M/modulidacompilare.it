# Synthèse du 3e tour des testeurs naïfs (2026-11-14), modulidacompilare.it

Notes : T1 8/7/9, T2 8/7/9, T3 8/7/9. La Facilité (7 chez les trois, il faut ≥ 8) bloque encore. Les trois
corrections validées par l'éditeur sont faites, plus les défauts objectifs relevés par au moins deux testeurs.
Rien de ce que les tours 1 et 2 ont corrigé n'est défait (dates gg/mm/aaaa, aucun choix qui engage pré-coché,
champ clé en tête, bandeau « manca ancora » au clic seulement) : `tests/date-e-scelte.test.ts` et
`tests/facilita-tour2.test.ts` toujours verts, nouveau `tests/facilita-tour3.test.ts`.

| # | Difficulté (testeurs) | Décision | Raison / correction |
|---|---|---|---|
| 1 | Avertissements qui bloquent l'usage sous le bouton « Scarica il PDF » : « Se hai una condanna, non usare questo testo », « Per l'ISEE questo foglio non basta », « Nato o nata all'estero? » (T1, T2, T3) | **corrigé** (validé éditeur) | Nouveau champ `prima` des documents, affiché en encadré orange « Prima di compilare: … » : sur téléphone entre les étapes et le premier champ, sur ordinateur en tête de la colonne de l'aperçu, à hauteur du premier champ (check-premier-ecran reste à 0). Textes raccourcis, renvois d'articles laissés aux sources. Concerne casellario (condanna), reddito (ISEE), nascita (estero), titolo di studio (titolo estero), stato di famiglia (qui écrire), testamento (à recopier à la main), delega generica (procura notarile), dimissioni (lavoro domestico). Les rappels généraux (firma, stampante, PEC, copia del documento) restent sous le bouton. |
| 2 | Bouton « Scarica il PDF » à 4-5 écrans (T1, T2, T3) ; la barre du 2e tour n'apparaissait qu'après une saisie, aucun testeur ne l'a vue | **corrigé** (validé éditeur) | Lien « Vai al PDF ↓ » dans la ligne des étapes, en haut de l'outil (téléphone). Barre collée en bas « Vai al PDF: anteprima e download ↓ » dès que l'outil est à l'écran, sans attendre la saisie, tant que le vrai bouton n'est pas visible. |
| 3 | Aperçu vide = un écran de « ________ » et de juridique (T2, aussi T1 et T3) | **corrigé** (validé éditeur) | Tant que rien n'est tapé, l'aperçu ne montre que le titre et la phrase d'identité, puis « Il resto del documento si riempie mentre scrivi. Vedi tutto il testo ↓ » (ouvre tout). Il s'ouvre en entier dès la première saisie. Le PDF et la copie gardent le texte complet. |
| 4 | Jargon légal de l'aperçu qui fait peur (« sanzioni penali », « falsità in atti e dichiarazioni mendaci », « Regolamento UE 2016/679 ») ; phrase rassurante trop discrète (T1, T2, T3) | **corrigé** (validé éditeur) | Encadré vert juste au-dessus du document, en gras : « Il testo qui sotto è quello che chiede la legge: lo scrive il sito per te, uguale in ogni autocertificazione. » puis « «Sanzioni penali», «falsità in atti», «dichiarazioni mendaci»: riguardano solo chi scrive il falso. » et « «Regolamento UE 2016/679» è la legge sulla privacy: l'ufficio usa i tuoi dati solo per questa pratica » (ce que dit la formule du document). Chaque phrase n'apparaît que si le document contient la formule. Texte légal du modulo inchangé. |
| 5 | « CU, data da datore o ente pensione » lu « date » (T1, T2, T3) | **corrigé** | « Certificazione Unica (CU, il foglio che ti manda il datore di lavoro o l'ente della pensione) ». |
| 6 | « 1 (vivo da solo) » au masculin, « tu compreso » (T1, T2, T3) ; lignes des membres annoncées mais invisibles, « Nome » de qui ? (T1, T3) | **corrigé** | Question « Quante persone siete nello stato di famiglia, contando anche te? », choix « 1 (solo io) », aide « Tocca un numero: qui sotto compaiono le righe per le altre persone. Poi vengono i tuoi dati. » |
| 7 | Reddito complessivo / imponibile IRPEF : IRPEF inconnu, impossible de choisir (T1, T2, T3) | **corrigé** (en partie) | « Reddito complessivo (quello che chiede quasi sempre l'ufficio) » et « Reddito imponibile IRPEF (la parte su cui si calcola l'imposta sul reddito: solo se te lo chiedono) ». Pas de pré-sélection : règle du 1er tour, aucun choix qui engage coché d'avance. |
| 8 | Casellario : « procedimento noto » obscur, quelle option choisir (T1, T3) | **corrigé** | « Nessuna condanna e nessun procedimento penale a mio carico, che io sappia », « Solo: nessun procedimento penale che io sappia (carichi pendenti) », aide « Se non sai quale ti chiedono, scegli la prima: vale per tutte e due le cose. » (texte du document inchangé). |
| 9 | Liste de l'accueil « Autocertificazioni: Autocertificazione di residenza », mot répété, on ne voit pas qu'on peut changer (T2, T3) | **corrigé** | Options sans préfixe de groupe, libellé « Quale documento ti serve? Tocca qui per sceglierne un altro ». |
| 10 | « Anno o data del conseguimento », « Votazione » sans exemple (T1, T2) | **corrigé** | Aides « Per esempio 2004 oppure 15/07/2004 » et « Per esempio 54/60, 100/100 o 110/110 e lode ». |
| 11 | Puce « non la parentela » qui contredit le paragraphe (T1) | **corrigé** | Défaut objectif (deux textes contradictoires) : « Scrivi solo chi è iscritto in anagrafe al tuo stesso indirizzo (lo stato di famiglia), non tutti i parenti: un figlio che ha spostato la residenza altrove non va scritto. » (conforme à la FAQ de la page). |
| 12 | « DPR 445/2000 » non expliqué dans la phrase d'accueil (T3) | **corrigé** | Sigle à traduire à sa première apparition (règle du brief) : « con le formule chieste dalla legge sull'autocertificazione (il DPR 445/2000) ». |
| 13 | Deux blocs de questions à la suite (explications puis FAQ) (T1) | **non retenu** | Un seul testeur ; structure commune de la trame, les deux blocs ont leur titre. |
| 14 | Trois façons de choisir le document sur l'accueil (T3), remplir ici ou cliquer ? (T1) | **non retenu** | Les deux marchent ; la liste est clarifiée (n° 9), les raccourcis sont appréciés par T1 et T2. |
| 15 | Noms en jargon dans la liste et le menu (« Atto di notorietà », « Testamento olografo ») (T3, T1 pour l'atto) | **non retenu** | Noms officiels que les gens cherchent ; chaque page les explique dès son chapeau. |
| 16 | Plus de 6 personnes dans la famille (T2) | **non retenu** | Un seul testeur ; cas rare, demanderait un autre modèle de document. |
| 17 | Bloc « Sito indipendente », bandeau vert et rappels répétés sur chaque page (T2) | **non retenu** | Un seul testeur ; T1 et T3 les citent parmi ce qui rassure. |
| 18 | « Radif Partners » inconnu (T1, T2) | **non retenu** | La page « Chi siamo » est liée ; identité de l'éditeur imposée. |
| 19 | Bouton « EN » (T3) | **non retenu** | Version anglaise voulue (site bilingue). |
| 20 | Rien ne passe d'un module à l'autre (T3) | **non retenu** | Volontaire : rien n'est stocké (promesse « sparisce quando chiudi la pagina ») ; dans un même onglet l'identité passe déjà d'un document à l'autre. |

## Défauts de trame relevés (signalés, `_trame/_template` non modifié)
- Aucun nouveau : les composants touchés (`Generatore.tsx`, `documenti.ts`) sont propres à ce site.

## Vérification
- `npm run check` : sortie 0 (91 tests verts, check-premier-ecran 0 page fautive sur 30, check-saisie 0 défaut, check-regles 0, check-motcle 0/31).
- Captures relues (téléphone) : casellario (encadré au-dessus du formulaire, lien et barre « Vai al PDF », aperçu replié avec encadré vert) et reddito.
