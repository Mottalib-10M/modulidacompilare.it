# Test naïf du 2026-11-14 (tour2), testeur 2 : modulidacompilare.it
**Persona :** Italien(ne) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Autocertificazione 2026: modulo da compilare online in PDF » parce qu'il/elle a besoin d'une autocertification. Découverte sur téléphone.

## 1. Concept

**Après 5 s :** « C'est un site où je remplis mon autocertificazione et je récupère le PDF. » Le titre « Autocertificazione e moduli da compilare online » et la phrase « Scegli il modulo, scrivi i tuoi dati e scarica il PDF » collent exactement au résultat Google. Je vois tout de suite la liste déroulante « Quale documento ti serve? (tocca per cambiare) » et le premier champ : je sais que je suis au bon endroit. Les trois étapes « 1. Compila i campi · 2. Controlla l'anteprima · 3. Scarica il PDF, in fondo al modulo » me disent où chercher le bouton. Pas de compte, rien d'envoyé : c'est exactement ce que je veux.

**Après 2 min :** j'ai compris qu'il y a une page par type de déclaration (residenza, nascita, reddito, stato civile, stato di famiglia, titolo di studio, carichi pendenti…), plus des délégations et des lettres (disdetta, dimissioni, testamento). Chaque page suit le même schéma : formulaire, aperçu qui se remplit en direct, bouton PDF, conseils, puis explications et FAQ repliées. Le bénéfice concret : un document propre avec les bonnes formules légales, prêt à signer, en deux minutes, gratuit.

**Clair ?** Oui, très. **Pour qui ?** Toute personne qui doit fournir un certificat à une administration, une école, une fac, un employeur. **Bénéfice :** ne plus chercher un PDF Word moche à imprimer et remplir à la main.

## 2. « Tout le monde peut-il comprendre ? »

Verdict : **oui pour le principe, presque oui pour l'usage.** Ça décroche à trois endroits :
- le vocabulaire juridique dans les textes et l'aperçu : « carichi pendenti », « casellario », « la lettera aa riguarda… la lettera bb… », « famiglia anagrafica », « equipollenza o dichiarazione di valore », « LM-77 », les renvois répétés « art. 46 / 74 / 75 / 76 del D.P.R. 445/2000 » ;
- le formulaire est long (une dizaine de champs d'identité identiques sur chaque page) et le champ qui rend le document spécifique arrive tout en bas ;
- le petit encadré jaune « Prima di scaricare, scegli: Chi firma: sei un uomo o una donna?. » a une ponctuation bizarre et sonne comme un message d'erreur de robot.

## 3. Parcours écran par écran

- **01-accueil-1.png** : compris. Titre, promesse, mention « Sito indipendente, non è un sito pubblico » (rassurant, honnête… mais « non è un sito pubblico » peut se lire « site privé/fermé » ; je comprends « pas un site de l'État » après réflexion). Chips « Vai diretto: Residenza, Stato di famiglia, Reddito, Delega generica, Disdetta dell'affitto, tutti i moduli ↓ » : pratique. Petite hésitation : il y a deux façons de choisir le document (les chips ET la liste « Quale documento ti serve? »). Première question « Chi firma: sei un uomo o una donna? » : un peu surprenante comme toute première question, mais l'explication « Serve per scrivere «il sottoscritto» o «la sottoscritta» » la justifie.
- **01-accueil-suite1.png** : compris. Champs classiques. « 16 caratteri, sulla tessera sanitaria » sous Codice fiscale : très bien. L'exemple de date « 07/04/1965 (o solo le cifre: 07041965) » : utile, mais 1965 me parle peu, et l'aide est répétée sous chaque date.
- **01-accueil-suite2.png** : compris. « Residente dal (facoltativo) », « Luogo della firma — Se vuoto, il comune di residenza », date de signature déjà remplie (14/11/2026) : malin. L'aperçu « Anteprima: il documento si aggiorna mentre scrivi » démarre : c'est le moment « wow ». La phrase « Le frasi sulle sanzioni sono obbligatorie in ogni autocertificazione: riguardano solo chi scrive il falso » me rassure avant que je panique devant « sanzioni penali ».
- **01-accueil-suite3.png** : compris. Le document ressemble à un vrai document officiel (« DICHIARAZIONE SOSTITUTIVA DI CERTIFICAZIONE », « DICHIARA »). Coince légèrement sur l'encadré jaune « Prima di scaricare, scegli: Chi firma: sei un uomo o una donna?. » : le « ?. » fait bâclé, et je n'ai encore rien rempli que ça ressemble déjà à un reproche.
- **01-accueil-suite4.png** : compris. « Scarica il PDF » bien visible, « Copia il testo (da incollare in un'e-mail) » : excellente idée. Les conseils (signer à la main, joindre une pièce d'identité si envoi par mail/PEC) sont exactement ce que je me demandais. « Nessun dato lascia il tuo dispositivo » : rassurant.
- **01-accueil-suite5.png** : compris. « Leggi tutto il paragrafo », auteur « Radif Partners », date de mise à jour, lien Normattiva : sérieux. Liste des modules par catégories : claire.
- **01-accueil-suite6.png** à **suite7.png** : compris. Explications repliées en accordéon (« Cos'è l'autocertificazione e quando la puoi usare », « Bollo, durata e controlli »…), FAQ très pertinentes (« Il comune o l'INPS possono rifiutare la mia autocertificazione? », « I dati che scrivo nel modulo restano sul sito? »). Je ne lis pas, mais je sais que c'est là.
- **01-accueil-suite8.png** / **suite9.png** : « Fonti » longue liste d'articles du DPR : je saute. Encadré « Scritto da Radif Partners » et pied de page replié « Chi siamo, note legali e tutte le pagine » : OK.
- **02-menu-1.png** : compris. Trois groupes nets : Autocertificazioni, Deleghe, Lettere e testamento. Petit étonnement : « Dimissioni online » rangé sous « Lettere e testamento », et un testament à côté de formulaires administratifs. Sous le menu, on aperçoit « Nome » de la page : léger effet de superposition.
- **03-…-carichi-pendenti-1.png** : compris globalement (« dichiara che non hai condanne penali e che non sai di essere sotto procedimento »). Mais « carichi pendenti » et « casellario giudiziale » sont des mots que je connais mal à 24 ans.
- **03-…-suite1.png** / **suite2.png** : coince un peu. Le champ clé « Cosa dichiari — Scegli… » n'arrive qu'après 9 champs d'identité, et je ne vois pas les choix possibles sans ouvrir la liste. L'aperçu affiche « ____ (scegli cosa dichiari) » : au moins il me guide.
- **03-…-suite3.png** : compris. L'avertissement « Se hai una condanna, non usare questo testo… Chiedi il certificato del casellario » est clair et honnête. Encadré jaune : « Prima di scaricare, scegli: Chi firma: sei un uomo o una donna?; Cosa dichiari. » : ponctuation encore étrange.
- **03-…-suite4.png** : coince sur le paragraphe « la lettera aa riguarda l'assenza di condanne… la lettera bb il non essere a conoscenza… » : pour moi « lettera aa / bb » ne veut rien dire.
- **03-…-suite5.png** / **suite6.png** : compris. FAQ utiles (« Per lavorare con i minori basta l'autocertificazione? »), « Altri moduli collegati » en cartes avec une ligne d'explication : très bien.
- **04-…-nascita-1.png** à **suite2.png** : compris. « Nascita di chi — La mia (data e luogo di nascita) » déjà choisi : bien. Je me demande pourquoi on me redemande mon lieu et ma date de naissance en haut puis « Nascita di chi » en bas, mais l'aperçu « di essere nato/nata a ____ il __/__/____ » répond.
- **04-…-suite3.png** à **suite6.png** : compris. Conseil « Nato o nata all'estero? Va bene se la nascita è trascritta in un comune italiano » : utile. FAQ « Il certificato di nascita scade dopo sei mesi? » : pile une question que je me pose.
- **05-…-reddito-1.png** à **suite2.png** : compris. « Anno dei redditi 2025 » pré-rempli, « Importo in euro — Come scritto nella dichiarazione, per esempio 18.540,00 », « Dove si legge (facoltativo) — Non indicarlo » : bien guidé. « Cosa dichiari » ne montre pas ses options.
- **05-…-suite3.png** / **suite4.png** : compris. L'avertissement « Per l'ISEE … questo foglio non basta: serve la dichiarazione all'INPS, la DSU, che si fa al CAF » est très utile pour moi (bourse, fac) et m'évite une erreur.
- **05-…-suite5.png** / **suite6.png** : texte « alla lettera o… la lettera p copre l'assolvimento degli obblighi contributivi » : jargon, je décroche. FAQ « In quale rigo del 730 trovo il reddito complessivo? » : excellente.
- **06-…-residenza-1.png** à **suite6.png** : compris. Identique au formulaire de l'accueil (normal). Distinction « Residenza, domicilio e dimora » et FAQ « Ho cambiato casa da poco: quale indirizzo scrivo? » : très pertinentes pour un étudiant hors site.
- **07-…-stato-civile-1.png** à **suite6.png** : compris. Aide « Separato o separata? Sei ancora coniugato fino al divorzio. » : claire (mais répétée deux fois, sous le champ et dans les puces). Le chapeau promet « aggiungi i dati del coniuge se servono » mais je ne vois aucun champ conjoint à l'écran : je suppose qu'il apparaît après le choix, sans en être sûr.
- **08-…-stato-di-famiglia-1.png** à **suite6.png** : compris. « Persone nella famiglia anagrafica, tu compreso » puis aperçu « è così composta: ____ ». La précision « La famiglia anagrafica è quella registrata in anagrafe allo stesso indirizzo, non la parentela » m'apprend quelque chose. FAQ « Devo indicare anche i figli che studiano in un'altra città? » : parfaite.
- **09-…-titolo-di-studio-1.png** à **suite6.png** : compris. Champs logiques (Titolo, Scuola o università, Città, Anno, Votazione facoltativa). Exemple « laurea magistrale in Economia (LM-77) » : le code LM-77 me fait hésiter (dois-je le mettre ?). Conseil sur les titres étrangers clair.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Choix du document (liste « Quale documento ti serve? » + chips « Vai diretto ») | Oui | Oui | Oui | 4/5 (deux mécanismes pour la même chose) |
| Formulaire de saisie | Oui | Oui | Oui | 4/5 (long, champ spécifique en bas) |
| Aperçu en direct | Oui | Oui | Très | 5/5 |
| Encadré « Prima di scaricare, scegli… » | Oui | À moitié | Oui | 3/5 |
| Scarica il PDF | Oui | Oui | Très | 5/5 |
| Copia il testo (e-mail) | Oui | Oui | Oui | 5/5 |
| Conseils sous le bouton (signature, PEC, pièce d'identité, cas particuliers) | Oui | Oui | Très | 5/5 |
| Explications en accordéon + FAQ | Oui | Oui (titres) | Oui | 4/5 |
| Menu ☰ | Oui | Oui | Oui | 4/5 |
| « Altri moduli collegati » | Oui | Oui | Oui | 5/5 |
| Bouton EN | Vu | Oui | Peu pour moi | 4/5 |

## 5. Enchaînement et navigation

Très cohérent : chaque page a la même structure (fil d'Ariane « Home / … », titre, chapeau, avertissement « Sito indipendente », trois étapes, formulaire, aperçu, bouton, conseils, explications, FAQ, modules liés, sources). Une fois une page comprise, toutes les autres sont lisibles en 2 secondes. Le menu est clair, le fil d'Ariane permet de revenir. Les cartes « Altri moduli collegati » enchaînent intelligemment (stato civile → stato di famiglia → nascita). Bémol : sur mobile, chaque page impose un long défilement d'identité identique avant d'atteindre la partie propre au document ; et rien ne propose de garder mes données si je passe d'un module à l'autre (je ne sais pas si je devrai tout retaper).

## 6. Difficultés classées

1. **Le champ qui rend le document spécifique est enterré** (03-suite1, 05-suite2, 07-suite1, 08-suite1) : « Cosa dichiari », « Stato civile », « Persone nella famiglia anagrafica » arrivent après 9 champs d'identité ; sur Carichi pendenti et Reddito je ne vois pas les choix sans ouvrir la liste. Impatiente, je me demande « mais je déclare quoi, au juste ? ». **Reco :** placer ce choix juste après « Chi firma », en premier bloc « Cosa vuoi dichiarare », sous forme de boutons radio visibles plutôt qu'une liste « Scegli… ».
2. **Encadré jaune maladroit** (01-suite3, 03-suite3, 04-suite3…) : « Prima di scaricare, scegli: Chi firma: sei un uomo o una donna?. » — double ponctuation, deux-points en cascade, ton de reproche avant même d'avoir tapé. **Reco :** « Per scaricare il PDF manca ancora: il sottoscritto o la sottoscritta » / « …manca ancora: cosa dichiari ». Supprimer le « ?. ».
3. **Jargon juridique dans les paragraphes visibles** (03-suite4, 05-suite5, 07-suite4) : « la lettera aa… la lettera bb », « la lettera o… la lettera p copre l'assolvimento degli obblighi contributivi ». **Reco :** sortir les lettres d'article du texte visible (les laisser dans « Fonti ») ; ex. carichi pendenti : « Con questo foglio dichiari due cose: che non hai condanne penali e che non sai di avere processi penali in corso. »
4. **« non è un sito pubblico » ambigu** (toutes les pages) : peut se lire « site privé / réservé ». **Reco :** « Sito indipendente, non della Pubblica Amministrazione: il modulo è un modello indicativo, non una consulenza legale. »
5. **Première question « sei un uomo o una donna? »** (01-1 et toutes les pages) : surprenante en premier, binaire, un peu intrusive pour une génération sensible au sujet. **Reco :** formuler sur la grammaire du document : « Come vuoi che inizi il documento? » avec deux boutons « Il sottoscritto » / « La sottoscritta ».
6. **Promesse non visible sur Stato civile** (07-1 vs 07-suite1) : le chapeau dit « aggiungi i dati del coniuge se servono » mais aucun champ conjoint n'apparaît. **Reco :** sous la liste, ajouter « Se scegli coniugato o unito civilmente, compariranno i campi per il coniuge. »
7. **Répétitions qui allongent le scroll** : l'aide « Giorno/mese/anno, per esempio 07/04/1965 (o solo le cifre: 07041965) » sous chaque date (même la date de signature déjà remplie) ; « Separato… coniugato » deux fois. **Reco :** une seule aide sous la date de naissance, avec un exemple plus neutre (« 07/04/1998 ») ; rien sous la date de signature pré-remplie.
8. **Double mécanisme de choix sur l'accueil** (01-1) : chips « Vai diretto » + liste « Quale documento ti serve? (tocca per cambiare) ». **Reco :** garder la liste comme sélecteur principal et renommer les chips « I più usati: ».

## 7. À garder

- Le titre et le chapeau qui reprennent exactement la promesse Google ; formulaire visible dès le premier écran.
- L'aperçu en direct « il documento si aggiorna mentre scrivi » : c'est la fonction qui me fait rester.
- « Nessun dato lascia il tuo dispositivo », « senza account e senza inviare nulla ».
- La date de signature pré-remplie, « Se vuoto, il comune di residenza », « 16 caratteri, sulla tessera sanitaria ».
- « Copia il testo (da incollare in un'e-mail) ».
- Les avertissements honnêtes propres à chaque document (ISEE/DSU, condanne, nascita all'estero, titoli esteri, famiglia anagrafica ≠ parentela).
- La phrase qui désamorce « Le frasi sulle sanzioni… riguardano solo chi scrive il falso ».
- Les FAQ très concrètes et les cartes « Altri moduli collegati ».
- La structure identique de page en page.

## 8. Notes

Clarté : 8/10
Facilité : 7/10
Utilité : 9/10
