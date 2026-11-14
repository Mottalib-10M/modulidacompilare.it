# Test naïf du 2026-11-14, testeur 3 : modulidacompilare.it
**Persona :** Italien(ne) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles, ne lit pas l'anglais. Il/elle a cliqué sur le résultat Google « Autocertificazione 2026: modulo da compilare online in PDF » parce qu'il/elle a cette question pour lui/elle-même ou un proche.

---

## 1. Concept

**Après 5 secondes (01-accueil-1).** Le titre « Autocertificazione e moduli da compilare online » correspond exactement à ce qu'elle a cherché sur Google. La phrase « Scegli il modulo, scrivi i tuoi dati e scarica il PDF » dit en trois verbes ce qu'il faut faire. Elle comprend : « ici je remplis mon autocertificazione et j'obtiens la feuille à imprimer ». Elle voit tout de suite les cases « Nome », « Cognome », donc on lui demande ses données, et elle se méfie un peu. Elle lit aussi « Sito indipendente, non è un sito pubblico » : ça la rassure (on ne lui cache pas que ce n'est pas la Commune), mais ça l'inquiète un peu (« alors ça vaut quelque chose ? »).

**Après 2 minutes.** Elle a compris le principe : on choisit le document (résidence, naissance, état civil, famille, revenu, casier…), on remplit, on voit la feuille se remplir en dessous (« Anteprima: il documento si aggiorna mentre scrivi »), on appuie sur « Scarica il PDF », on imprime et on signe à la main. Les puces sous le bouton (« Firma a mano con la penna », « allega la copia di un documento d'identità ») lui disent quoi faire après. La phrase « Nessun dato lascia il tuo computer » la rassure sur ses données, même si elle est sur son téléphone et pas sur un « computer ».

**Clair ?** Oui pour l'idée générale. **Pour qui ?** Toute personne à qui la Commune, l'école, l'INPS ou l'ASL demande un papier. **Bénéfice concret :** ne pas aller à l'anagrafe, avoir une feuille propre, gratuite, sans inscription, avec les bonnes formules et le bon accord au féminin.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : le geste principal (remplir puis télécharger) oui ; tout le reste non.** Elle décroche à trois endroits :

- **Les dates** : toutes les cases de date affichent « mm/dd/yyyy » et « 11/14/2026 ». Pour une Italienne, « 11/14 » ne veut rien dire (il n'y a pas de 14e mois). Elle ne sait pas dans quel ordre taper sa date de naissance. C'est le principal point de blocage du formulaire.
- **Les sigles et les renvois à la loi**, partout : « DPR 445/2000 », « art. 46, lett. aa e bb », « art. 38, comma 3-bis », « PEC », « SPID, CIE o CNS », « ISEE », « DSU », « quadro RN », « LM-77 », « Regolamento UE 2016/679 ». Le tableau de l'accueil (« Base di legge — art. 46, lett. b ») ne lui sert à rien : elle veut savoir « quand » et pas « en vertu de quoi ».
- **Les choix par défaut** à ne pas rater : « Chi firma » est déjà sur « Donna (la sottoscritta) », et « Stato civile » sur « Stato libero (dopo divorzio o scioglimento) ». Un homme pressé, ou une veuve, risque d'imprimer une feuille fausse sans s'en rendre compte.

## 3. Parcours écran par écran

| Écran | Ce qu'elle comprend | Où ça coince |
|---|---|---|
| 01-accueil-1 | Titre et phrase d'accroche clairs ; logo aux couleurs italiennes rassurant. Le menu déroulant « Documento da compilare » montre « Autocertificazioni: Autocertificazione di residenza ». | Elle ne comprend pas que ce menu sert à changer de document : il ressemble à un champ déjà rempli. « Chi firma » : elle ne voit pas tout de suite qu'il s'agit d'homme ou de femme. Le bouton « EN » ne lui sert à rien. |
| 01-accueil-suite1 | Champs simples : Cognome, Luogo di nascita, Codice fiscale avec l'aide « 16 caratteri, sulla tessera sanitaria » (très bien, elle sait où le trouver). | « Data di nascita : mm/dd/yyyy » : elle ne sait pas comment écrire sa date. « Residente dal (facoltativo) » : elle ne sait pas si elle doit le mettre. |
| 01-accueil-suite2 | « Se vuoto, il comune di residenza » : compris. L'aperçu de la feuille avec des blancs « ______ » ressemble à un vrai formulaire de la Commune, ce qui la rassure. | « Data della firma 11/14/2026 » : elle croit à une erreur. Le texte juridique de l'aperçu (« falsità in atti e dichiarazioni mendaci ») lui fait un peu peur. |
| 01-accueil-suite3 | Gros bouton « Scarica il PDF », bien visible. Les puces « Firma a mano con la penna », « allega la copia di un documento d'identità » : elle sait quoi faire ensuite. Le paragraphe « L'autocertificazione… è il foglio firmato con cui dichiari da solo… » est la meilleure explication du site. | L'aperçu s'arrête au milieu d'une phrase (« Regolamento UE ») : elle se demande si la feuille est complète. « PEC » : inconnu. « Copia il testo » : elle ne sait pas à quoi ça sert. |
| 01-accueil-suite4 | Liste des documents (Residenza, Stato di famiglia, Nascita…) : c'est là qu'elle trouve enfin le choix des documents. | Cette liste arrive après le formulaire et après un long texte : elle aurait dû la voir en premier. « Casellario e carichi pendenti », « Testamento olografo », « Atto di notorietà » : mots de notaire. |
| 01-accueil-suite5 / suite6 | Le titre « Cos'è l'autocertificazione e quando la puoi usare » l'intéresse. | Mur de texte : « articolo 40 del DPR n. 445 del 2000 », « gestori di pubblici servizi », longue liste de l'article 46. Elle abandonne la lecture. |
| 01-accueil-suite7 / suite8 | Le tableau « Quando serve » (« iscrizione a scuola, bonus », « pensione di reversibilità », « smarrimento di documenti ») l'aide à reconnaître son cas. | La ligne « Base di legge » à chaque fois ne lui sert à rien et double la longueur. « lett. aa e bb », « comma 3-bis » : incompréhensibles. |
| 01-accueil-suite9 | « Il modulo si firma a mano, con la penna, dopo averlo stampato » : clair. | « SPID, CIE o CNS », « Codice dell'amministrazione digitale » : jargon. |
| 01-accueil-suite10 / suite11 | « Nessuna marca da bollo » : une bonne nouvelle, elle retient qu'il n'y a rien à payer. « 6 mesi per gli altri » : utile. | « decadenza dai benefici », « pena aumentata da un terzo a la metà » : ça l'effraie plus que ça ne l'aide. |
| 01-accueil-suite12 | Rien d'utile pour elle. | Partie sur les étrangers, « decreto-legge n. 202 del 2024 », « La versione inglese del sito » : pas son sujet. |
| 02-menu-1 | Le menu reprend les mêmes documents, bien classés (Autocertificazioni / Deleghe / Lettere e testamento). | « Deleghe » est fermé alors que les deux autres groupes sont ouverts : elle ne voit pas « delega », alors que Google le lui promettait. Pas de lien « Home » dans le menu. Le menu laisse voir le formulaire dessous (« Cognome »), ce qui est un peu confus. |
| 03-…carichi-pendenti-1 | Fil d'Ariane « Home / Casellario e carichi pendenti » ; phrase claire : « dichiara che non hai condanne penali e che non sai di essere sotto procedimento ». | Titre en jargon judiciaire (« carichi pendenti », « casellario giudiziale »). |
| 03-…suite1 / suite2 | « Cosa dichiari : Nessuna condanna e nessun procedimento noto » : compris. | Mêmes dates « mm/dd/yyyy ». |
| 03-…suite3 | Excellent avertissement : « Se hai una condanna, non usare questo testo… Chiedi il certificato del casellario. » Elle se sent protégée. | « lettera aa », « lettera bb » dans le texte d'explication. |
| 03-…suite4 → suite6 | « Cosa succede se non è vero » : compris. Les questions fréquentes (« Cosa vuol dire «non essere a conoscenza» di procedimenti? ») sont bien formulées. | « sospensione condizionale », « misure di sicurezza e di prevenzione » : vocabulaire de tribunal. |
| 04-…nascita-1 → suite2 | La phrase « dichiara la tua data e il tuo luogo di nascita, oppure la nascita di tuo figlio » est claire ; le champ « Nascita di chi : La mia » est simple. | Date américaine encore. |
| 04-…suite3 → suite6 | « Prima di firmare : Controlla che il comune di nascita sia scritto come nell'atto » : conseil concret, très bien. Questions fréquentes pertinentes (« Il certificato di nascita scade dopo sei mesi? »). | « carattere di controllo del codice » : incompréhensible. « estratto per riassunto dell'atto » : jargon. |
| 05-…reddito-1 → suite2 | « dichiara quanto hai guadagnato in un anno, o che non hai avuto redditi » : très clair. L'aide « Come scritto nella dichiarazione, per esempio 18.540,00 » est bien. « Anno dei redditi 2025 » est déjà rempli. | « Dove si legge : Modello 730 » : elle est retraitée, elle ne sait pas si elle a un 730 ou une CU. « Reddito complessivo » : elle ne sait pas si c'est le brut ou le net. |
| 05-…suite3 | La feuille dit « che il proprio reddito complessivo relativo all'anno 2025 ammonta a euro ____ » : compréhensible. | « Per l'ISEE non basta un'autocertificazione: serve la DSU all'INPS » : deux sigles dans la même phrase, juste là où elle en aurait besoin. |
| 05-…suite4 → suite6 | « Da dove copiare i numeri » et « Quale anno dichiarare » : exactement ses questions. « Certificazione Unica che il datore di lavoro o l'ente pensionistico ti consegna entro marzo » : là, elle comprend. | « prospetto di liquidazione », « quadro RN », « anagrafe tributaria » : jargon fiscal. |
| 06-…residenza-1 → suite2 | Page claire, même formulaire que sur l'accueil, aperçu identique. | Dates américaines ; aperçu coupé en bas. |
| 06-…suite3 → suite6 | « Non serve… allegare bollette » : rassurant. « A chi serve e a chi no » (scuole, ASL per la scelta del medico, abbonamenti) : concret. « Stampa il PDF, firma a penna e consegnalo » : parfait. | « Residenza, domicilio e dimora » : distinction juridique qu'elle ne retiendra pas. |
| 07-…stato-civile-1 → suite2 | La phrase « dichiara se sei libero, coniugato, unito civilmente, divorziato o vedovo » est claire. | Le choix est déjà sur « Stato libero (dopo divorzio o scioglimento) ». Une veuve ou une femme mariée qui ne déroule pas le menu imprime « di trovarsi in stato libero ». Elle ne sait pas ce que veut dire « scioglimento ». |
| 07-…suite3 | « Chi è separato resta coniugato finché non c'è il divorzio » : très utile, c'est le genre de piège qu'elle craignait. | — |
| 07-…suite4 → suite6 | « Le cinque situazioni del modulo » explique enfin chaque choix. Questions fréquentes concrètes. | L'explication des cinq cas arrive bien après le menu déroulant, alors qu'elle en a besoin au moment de choisir. |
| 08-…stato-di-famiglia-1 → suite2 | « indica quanti siete, scrivi nomi, date di nascita e rapporto di parentela » : clair. Les champs « Componente 2 : rapporto con te — Coniuge » et « Componente 3 — Figlio o figlia » sont simples. | Ici, l'exemple de date est « Torino, 04/07/2012 » (jour/mois à l'italienne), alors que plus haut la case demande « mm/dd/yyyy » : deux formats différents sur la même page. « famiglia anagrafica » : mot d'administration. |
| 08-…suite3 | Aperçu « è così composta : 1. … dichiarante ; 2. … coniuge ; » | L'aperçu s'arrête à la personne 2 alors qu'elle a choisi 3 personnes : elle croit que son fils a été oublié. |
| 08-…suite4 → suite6 | La puce « La famiglia anagrafica è quella registrata in anagrafe allo stesso indirizzo, non la parentela » répond à sa vraie question (son fils parti vivre ailleurs). « Come compilare il modulo » explique bien. | « affinità », « tutela o vincoli affettivi » : jargon. |
| 09-…titolo-di-studio-1 → suite3 | Champs clairs : Titolo di studio, Scuola o università, Città, Anno. | L'exemple « laurea magistrale in Economia (LM-77) » : « LM-77 » ne lui dit rien ; pour sa génération, un exemple comme « licenza media » ou « diploma di ragioneria » parlerait plus. |
| 09-…suite4 → suite6 | « Usa la denominazione ufficiale… «diploma di istruzione secondaria superiore» invece di «maturità» » : conseil utile. | « equipollenza », « dichiarazione di valore » : jargon. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Formulaire (remplir ses données) | Oui, dès le premier écran | Oui, sauf les dates | Oui | 4/5 |
| Choisir le document sur l'accueil (« Documento da compilare ») | Difficilement : le menu ressemble à un champ déjà rempli | À moitié | Oui | 2/5 |
| « Chi firma » (homme/femme) | Oui | Mal : on ne voit pas qu'il faut choisir son sexe | Oui (accord au féminin) | 2/5 |
| Aperçu en direct (« Anteprima ») | Oui | Oui, rassurant | Très | 4/5 (perd un point parce qu'il est coupé) |
| « Scarica il PDF » | Oui, gros bouton foncé | Oui | Essentiel | 5/5 |
| « Copia il testo » | Oui | Non (copier pour quoi faire ?) | Peu pour elle | 2/5 |
| Puces « quoi faire après » (signer, joindre la pièce d'identité) | Oui, sous le bouton | Oui (sauf « PEC ») | Très | 4/5 |
| Avertissements propres à chaque page (condamnation, séparé = marié, ISEE) | Oui | Oui | Très, ils protègent | 4/5 |
| Liste des documents sur l'accueil | Oui, mais seulement à l'écran suite4 | Oui | Oui | 3/5 |
| Menu ☰ | Oui | Oui | Oui | 3/5 (« Deleghe » fermé, pas de Home) |
| Tableau « Quando serve » | Oui | La colonne « Quando serve » oui, la colonne « Base di legge » non | Moyen | 3/5 |
| Domande frequenti (accordéons) | Oui, « Tocchi una domanda per vedere la risposta » | Oui | Oui | 4/5 |
| « Leggi tutto il paragrafo » | Oui | Oui | Moyen | 4/5 |
| Bouton « EN » | Oui | Non (ne lit pas l'anglais) | Non pour elle | — |

## 5. Enchaînement et navigation

- Sur chaque page, l'ordre est logique et le même : titre, une phrase qui dit ce que fait la page, formulaire, aperçu, bouton PDF, conseils, puis explications. Après une page, elle sait où regarder sur la suivante. C'est un vrai point fort.
- Le fil d'Ariane « Home / Residenza » est présent et compréhensible.
- Sur l'accueil, la liste des documents est cachée sous le formulaire et le texte : quelqu'un qui cherche « delega » ou « disdetta » (promis par Google) doit faire défiler 4 écrans ou ouvrir le menu, où « Deleghe » est replié.
- Les formulaires sont longs sur téléphone (environ 2 écrans de cases) avant d'arriver à l'aperçu et au bouton. Il n'y a ni numéro d'étape ni repère « 1. Scegli / 2. Scrivi / 3. Scarica », donc elle ne sait pas combien il en reste.
- Le gros bloc d'explications juridiques sous chaque formulaire est trop long pour elle, mais il ne la gêne pas : elle s'arrête au bouton.

## 6. Difficultés classées

1. **Dates au format américain (tous les formulaires : 01-accueil-suite1, 03-suite1, 04-suite1, 05-suite1, 06-suite1, 07-suite1, 08-suite1, 09-suite1).** Ce qu'elle vit : « mm/dd/yyyy » et « 11/14/2026 » ; elle ne sait pas si elle doit taper le jour ou le mois en premier, elle croit que la date de signature est fausse, et elle risque d'imprimer une date de naissance inversée (04/07 au lieu de 07/04) sur une déclaration qui parle de « falsità in atti ». C'est contradictoire avec l'exemple « Torino, 04/07/2012 » de la page Stato di famiglia. **Recommandation :** forcer l'affichage italien (gg/mm/aaaa), par exemple trois listes Giorno / Mese / Anno, ou une case texte avec l'aide « Esempio: 07/04/1965 (giorno/mese/anno) ». Remplacement de l'étiquette : « Data di nascita (giorno/mese/anno) ».

2. **Choix par défaut piégeux : « Chi firma » et « Stato civile » (01-accueil-1, 07-…-suite1).** Ce qu'elle vit : tout est prérempli « Donna (la sottoscritta) » ; un homme qui ne déroule pas le menu imprime « La sottoscritta… nata a ». Sur l'état civil, « Stato libero (dopo divorzio o scioglimento) » est déjà sélectionné, donc une veuve imprime « di trovarsi in stato libero ». **Recommandation :** pas de valeur par défaut, une case vide « — scegli — » qu'il faut remplir avant de télécharger, ou deux gros boutons. Remplacement : « Chi firma » → « Sei un uomo o una donna? » avec les choix « Uomo » / « Donna ». Pour l'état civil, une liste vide « — scegli la tua situazione — » avec « Celibe / nubile (mai sposato) », « Sposato/a (anche se separato/a) », « Unito/a civilmente », « Vedovo/a », « Divorziato/a (stato libero) ».

3. **Le choix du document sur l'accueil ne se voit pas (01-accueil-1).** Ce qu'elle vit : « Documento da compilare : Autocertificazioni: Autocertificazione di residenza » ressemble à un champ déjà rempli et non à un choix ; elle croit que le site ne fait que la résidence jusqu'à ce qu'elle trouve la liste quatre écrans plus bas. **Recommandation :** mettre au-dessus du formulaire une rangée de gros boutons (Residenza, Stato di famiglia, Nascita, Stato civile, Reddito, Delega, Disdetta…) ou au moins une étiquette claire. Remplacement : « Documento da compilare » → « 1. Quale documento ti serve? (tocca per cambiare) ».

4. **Sigles et renvois à la loi partout (accueil suite3 à suite12, puces sous chaque bouton, tableau « Base di legge »).** Ce qu'elle vit : « PEC », « SPID, CIE o CNS », « ISEE », « DSU », « quadro RN », « LM-77 », « art. 46, lett. aa e bb », « comma 3-bis » ; elle se sent exclue et pense que le site est fait pour des avocats. **Recommandation :** développer chaque sigle la première fois et retirer la colonne « Base di legge » du tableau de l'accueil (la garder dans « Metodo e fonti »). Remplacements : « Se la invii per e-mail o PEC » → « Se la mandi per e-mail (anche posta certificata) » ; « Per l'ISEE non basta un'autocertificazione: serve la DSU all'INPS » → « Per l'ISEE (il calcolo della situazione economica) questo foglio non basta: serve la dichiarazione all'INPS, che si fa al CAF o sul sito INPS ».

5. **Aperçu coupé sans le signaler (01-accueil-suite3, 05-suite3, 06-suite2, 08-suite3, 09-suite3).** Ce qu'elle vit : la feuille s'arrête au milieu de « Regolamento UE » ; sur Stato di famiglia, elle a choisi 3 personnes mais ne voit que « 1. … dichiarante ; 2. … coniuge ; », et elle croit que son fils manque. **Recommandation :** afficher l'aperçu en entier, ou ajouter un fondu avec l'indication « Scorri dentro il riquadro per vedere tutto il foglio ↓ ».

6. **Formules qui font peur, sans phrase pour rassurer (aperçu, « Bollo, durata e controlli », « Cosa succede se non è vero »).** Ce qu'elle vit : « sanzioni penali », « falsità in atti », « decadenza dai benefici », « pena aumentata da un terzo a la metà » ; elle hésite à signer. **Recommandation :** ajouter une phrase juste avant l'aperçu. Texte : « Queste frasi sono obbligatorie in ogni autocertificazione: se scrivi dati veri, non rischi nulla. »

7. **« Chi firma », « Copia il testo », « computer », « browser » : mots mal adaptés au téléphone (bouton et note sous chaque aperçu).** Ce qu'elle vit : elle ne sait pas à quoi sert « Copia il testo » ; « Nessun dato lascia il tuo computer: il PDF nasce nel browser » parle d'un ordinateur alors qu'elle est sur son téléphone, et « browser » ne lui dit rien. **Recommandation :** remplacer par « I tuoi dati restano sul tuo telefono: non li riceviamo e non li salviamo ». Pour le bouton : « Copia il testo (per incollarlo in un'e-mail) ».

8. **Menu : « Deleghe » replié et pas de lien Accueil (02-menu-1).** Ce qu'elle vit : Google lui a promis une « delega » et elle ne la voit pas dans le menu ; pour revenir au début, elle ne trouve que le logo. **Recommandation :** ouvrir les trois groupes de la même façon (tous ouverts) et ajouter en tête « Home — tutti i moduli ».

## 7. À garder

- La promesse en une phrase : « Scegli il modulo, scrivi i tuoi dati e scarica il PDF ».
- L'honnêteté : « Sito indipendente, non è un sito pubblico: il modulo è un modello indicativo ».
- L'aperçu qui se remplit en direct et ressemble à une vraie feuille officielle.
- L'aide sur le code fiscal : « 16 caratteri, sulla tessera sanitaria ».
- L'exemple de montant : « per esempio 18.540,00 ».
- Les avertissements de bon sens : « Se hai una condanna, non usare questo testo », « Chi è separato resta coniugato finché non c'è il divorzio », « scrivi solo chi risulta nel tuo stato di famiglia ».
- Les puces « quoi faire après » sous le bouton (signer à la main, joindre la pièce d'identité).
- « Nessuna marca da bollo » et « Non serve… allegare bollette » : deux phrases qui enlèvent une angoisse.
- La même disposition sur toutes les pages, le fil d'Ariane, et les questions fréquentes en accordéon.
- Le gros bouton foncé « Scarica il PDF », impossible à rater.

## 8. Notes

Clarté : 7/10
Facilité : 6/10
Utilité : 8/10
