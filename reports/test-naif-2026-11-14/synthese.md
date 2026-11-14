# Synthèse du 1er tour des testeurs naïfs (2026-11-14), modulidacompilare.it

Notes : T1 8/7/9, T2 8/6/8, T3 7/6/8 (Facilité sous 7 chez T2 et T3).

| # | Difficulté (testeurs) | Décision | Raison / correction |
|---|---|---|---|
| 1 | Dates « mm/dd/yyyy », date de signature « 11/14/2026 » (T1, T2, T3) | **corrigé** | Le champ natif de date suit la langue du navigateur, pas celle de la page (`lang="it"` n'y change rien sous Chrome). Champ texte gg/mm/aaaa (`DataField`), clavier numérique, chiffres seuls acceptés (07041965), mise en forme à la sortie du champ, message d'erreur si la date n'existe pas, libellé « (giorno/mese/anno) ». Le document et le PDF étaient déjà en gg/mm/aaaa (`dataIt`) : test ajouté (`tests/date-e-scelte.test.ts`, lecture, refus de 11/14/2026, texte et PDF, aucun champ de date natif dans `dist`). |
| 2 | « Stato civile » réglé d'avance sur « Stato libero » (T1, T2, T3) | **corrigé** | Liste vide « Scegli… », téléchargement et copie bloqués tant que rien n'est choisi (message « Prima di scaricare, scegli: … », renvoi au champ). Aperçu neutre (« di essere ____ »). Option renommée « Divorziato o divorziata, o unione civile sciolta (stato libero) », aide « Separato o separata? Sei ancora coniugato fino al divorzio ». |
| 3 | « Chi firma » réglé sur « Donna » (T1, T2, T3) | **corrigé** | Même règle : choix obligatoire, libellé « Chi firma: sei un uomo o una donna? », l'aperçu montre « Il sottoscritto/La sottoscritta » tant que rien n'est choisi. |
| 3b | Autres choix qui engagent, pré-remplis (vérification demandée) | **corrigé** | Plus de valeur par défaut sur : casellario (« Cosa dichiari »), reddito (« Cosa dichiari »), stato di famiglia (nombre de personnes, lien de parenté), délégué (homme/femme), lieu de retrait, disdetta affitto (motif, mois de préavis), disdetta servizio (type, jours), dimissioni (jours de préavis), testament (partage, révocation). Restent par défaut, neutres : « Nascita di chi », « Tipo di dichiarazione » (structure du document), « Dove si legge » devenu facultatif (« Non indicarlo »). Test qui interdit tout nouveau défaut. |
| 4 | Aperçu coupé dans son cadre (« Regolamento UE »), 3e personne absente de l'aperçu famille (T1, T2, T3) | **corrigé** | Le cadre de l'aperçu n'a plus de hauteur maximale : le document s'affiche en entier. |
| 5 | Murs de texte juridique non repliés (T1, T2, T3) | **corrigé** | Chaque section `<h2>` sous l'outil devient un accordéon (titre visible, texte dans le HTML), avec la ligne « tocca un titolo per leggerla » (`lib/sezioni.ts`). La section du mini-simulateur du testament reste ouverte. |
| 6 | Tableau de l'accueil : colonne « Base di legge » incompréhensible, noms pas vus comme cliquables (T1, T2, T3) | **corrigé** | Colonne retirée, normes en note sous le tableau ; noms suivis de « → », en-tête « Modulo (tocca per compilarlo) ». |
| 7 | Sigles et jargon (DSU, PEC, SPID/CIE/CNS, quadro RN, prospetto di liquidazione, equipollenza) (T1, T2, T3) | **corrigé** (en partie) | Sigles développés dans les rappels sous le bouton (ISEE, DSU, CAF, PEC), dans l'accueil (PEC, CIE, CNS) et sur Reddito (prospetto, quadro RN). Les renvois d'articles dans les textes de fond restent, mais ils sont maintenant repliés. |
| 8 | Liste des documents trop basse, sélecteur pris pour un champ rempli (T1, T2, T3) | **corrigé** | Rangée « Vai diretto: Residenza · Stato di famiglia · Reddito · Delega generica · Disdetta dell'affitto · tutti i moduli ↓ » au-dessus du générateur ; sélecteur renommé « Quale documento ti serve? (tocca per cambiare) ». |
| 9 | Menu : « Deleghe » fermée, pas de lien Home (T1, T2, T3) | **corrigé** | Menu téléphone : toutes les rubriques ouvertes, « Home » en tête. |
| 10 | « Nessun dato lascia il tuo computer », « browser » sur téléphone (T1, T2, T3) | **corrigé** | « Nessun dato lascia il tuo dispositivo: il PDF si crea qui, sul tuo telefono o computer. » |
| 11 | « Copia il testo » : pour quoi faire ? (T1, T3) | **corrigé** | « Copia il testo (da incollare in un'e-mail) ». |
| 12 | Bouton PDF caché sous deux écrans de champs, pas d'étapes (T2, T3) | **corrigé** | Ligne d'étapes en tête de l'outil : « 1. Compila i campi · 2. Controlla l'anteprima · 3. Scarica il PDF, in fondo al modulo ». |
| 13 | « Tocchi una domanda » (Lei) alors que le site tutoie (T2) | **corrigé** | Défaut objectif d'incohérence, venu de la trame (`libelles-trame.ts`) : italien passé au « tu » dans ce site. |
| 14 | « Dove si legge » dit facultatif dans le texte, pas dans le libellé (T2) | **corrigé** | Libellé « (facoltativo) », vide par défaut = « Non indicarlo ». |
| 15 | Pièce d'identité absente des rappels de plusieurs modules (T2) | **corrigé** | Rappel ajouté sur Famiglia, Stato civile, Titolo, Reddito, Casellario (règle déjà citée par le site). |
| 16 | Naissance à l'étranger : champ « o Stato estero » contre texte « non si autocertifica » (T2) | **corrigé** | Rappel sous le bouton qui renvoie aux questions (transcription en Italie, sinon certificat étranger), d'après la FAQ et le texte déjà sourcés. |
| 17 | Formules pénales qui font peur (T3) | **corrigé** | Une ligne au-dessus de l'aperçu : ces phrases sont obligatoires et ne concernent que les fausses déclarations. |
| 18 | « Le cinque situazioni » expliquées trop bas (T1, T3) | **corrigé** | Libellés d'options explicites et aide sous la liste (voir n° 2). |
| 19 | « Reddito complessivo » : brut ou net, quelle ligne (T1, T3) | **corrigé** (en partie) | Aucune valeur par défaut, options « Modello 730 (dichiarazione dei redditi) », « Certificazione Unica (CU, data da datore o ente pensione) » ; la FAQ dit déjà où lire le chiffre. |
| 20 | « LM-77 » dans l'exemple du titre d'études (T3) | **non retenu** | Un seul testeur, pas un défaut objectif ; la classe de laurea est ce que les concours demandent (texte de la page). |
| 21 | « Anno dei redditi 2025 » pré-rempli | **non retenu** | Apprécié par T1 ; c'est la dernière année déclarée en 2026, visible et modifiable, et la page dit de vérifier l'année du bando. |
| 22 | Bouton « EN » inutile pour T3 | **non retenu** | Version anglaise voulue (règle du site bilingue). |
| 23 | Données qui suivent d'un module à l'autre, non vérifiable (T2) | **non retenu** | Déjà le cas (`cambiaDoc` reprend l'identité) ; rien à corriger. |

## Défauts de trame relevés (signalés, `_trame/_template` non modifié)
- `libelles-trame.ts`, italien : vouvoiement (« Tocchi », « cambi », « suo caso ») alors que les sites italiens tutoient.
- `components/ui/Frise.tsx` utilise un champ de date natif : même défaut de format (mm/dd/yyyy selon le navigateur) sur tout site qui s'en sert.
- Menu téléphone de `BaseLayout.astro` : rubriques fermées par défaut et pas de lien vers l'accueil.
- Aucune règle « pas de valeur par défaut sur un choix qui engage » dans la trame (SelectField sans option vide).
