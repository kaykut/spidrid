import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Comment fonctionne l'Internet",
    "content": "L'Internet connecte des milliards d'appareils dans le monde entier grâce à un réseau complexe de réseaux qui s'étend sur tous les continents de la planète. Chaque fois que vous visitez un site web, envoyez un e-mail ou regardez une vidéo en streaming, des données transitent à travers cette vaste infrastructure numérique en quelques millisecondes seulement. Comprendre ce système remarquable nous aide à apprécier la technologie qui a transformé la communication moderne.\n\nLorsque vous tapez une adresse de site web dans votre navigateur, un processus complexe commence instantanément. Votre ordinateur contacte d'abord un serveur DNS (Domain Name System), qui traduit l'adresse lisible par l'homme en une adresse IP numérique que les ordinateurs comprennent. Cela fonctionne de la même manière que la recherche d'un numéro de téléphone dans un annuaire, en faisant correspondre des noms à des informations de contact réelles.\n\nVotre requête transite ensuite par votre fournisseur d'accès à Internet (FAI) vers les réseaux principaux qui constituent l'infrastructure principale de l'Internet. Ces câbles à fibre optique à haute capacité s'étendent sur les continents et traversent les océans à des profondeurs dépassant 6 000 mètres. Ils transportent d'énormes quantités de données à près de la vitesse de la lumière, gérant plus de 500 billions d'octets d'informations par jour.\n\nLes données ne transitent pas en une seule unité sur l'Internet. Au lieu de cela, elles sont divisées en petits paquets, chacun contenant une partie de l'information ainsi que des détails d'adressage. Ces paquets peuvent emprunter différents chemins pour atteindre leur destination, en contournant les congestions ou les pannes. À destination, ils sont réassemblés dans le bon ordre pour recréer le message original.\n\nLes routeurs servent de contrôleurs de trafic de l'Internet, prenant des décisions critiques à chaque instant. Ces appareils spécialisés examinent la destination de chaque paquet et déterminent le meilleur chemin à suivre. Ils prennent ces décisions de routage des milliards de fois par seconde, assurant ainsi la fluidité des données à travers les réseaux appartenant à des milliers d'organisations différentes.\n\nL'Internet a débuté en tant qu'ARPANET en 1969, un projet de recherche militaire américain conçu pour survivre aux interruptions de communication lors d'attaques potentielles. Vint Cerf et Bob Kahn ont développé les protocoles TCP/IP dans les années 1970, créant ainsi les fondations techniques qui sous-tendent encore l'Internet aujourd'hui. Leur conception décentralisée garantit qu'aucun point de défaillance unique ne peut faire tomber l'ensemble du réseau.\n\nTim Berners-Lee a inventé le World Wide Web en 1989 alors qu'il travaillait au CERN en Suisse. Il a créé le système d'hyperliens et de navigateurs web qui a rendu l'Internet accessible à tous. Le web est devenu accessible au public en août 1991, et en une décennie, l'Internet est passé d'un outil de recherche à une plateforme de communication mondiale utilisée par des centaines de millions de personnes.",
    "wordCount": 462,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Qui a inventé le World Wide Web ?",
        "options": [
          "Bill Gates",
          "Steve Jobs",
          "Tim Berners-Lee",
          "Vint Cerf"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p01-q2",
        "type": "multiple_select",
        "question": "Qui a développé les protocoles TCP/IP ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Tim Berners-Lee",
          "Vint Cerf",
          "Bob Kahn",
          "Steve Jobs"
        ],
        "correctIndices": [
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p01-q3",
        "type": "true_false",
        "question": "Les données transitent sur Internet sous forme de fichiers complets et uniques, au lieu d'être divisées en paquets.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "En quelle année ARPANET, le prédécesseur d'Internet, a-t-il commencé ?",
        "correctValue": 1969,
        "tolerance": 0,
        "min": 1950,
        "max": 2000,
        "step": 1,
        "unit": "year"
      }
    ],
    "articleType": "practice",
    "orderIndex": 1
  },
  {
    "id": "technology-internet-c1",
    "topicId": "technology-internet",
    "title": "L'essor de l'Intelligence Artificielle",
    "content": "L'intelligence artificielle est passée du fantasme de la science-fiction à une technologie pratique qui affecte presque tous les aspects de la vie moderne. Des assistants pour smartphones aux systèmes de diagnostic médical, l'IA effectue désormais des tâches qui nécessitaient autrefois l'intelligence humaine. Cette transformation représente l'un des changements technologiques les plus importants depuis l'invention de l'informatique elle-même.\n\nLe concept d'intelligence artificielle a émergé lors d'un atelier organisé au Dartmouth College dans le New Hampshire durant l'été 1956. L'informaticien John McCarthy a inventé le terme et a rassemblé des chercheurs qui croyaient que les machines pouvaient être conçues pour simuler l'intelligence humaine. Ces pionniers imaginaient créer des machines pensantes en l'espace d'une seule génération, bien que les progrès se soient avérés bien plus lents que leurs prédictions optimistes.\n\nLes premières recherches en IA se sont concentrées sur le raisonnement symbolique, en programmant les ordinateurs avec des règles explicites sur la manière de résoudre les problèmes. Les chercheurs ont créé des systèmes experts qui encodaient la connaissance humaine dans des arbres de décision et des règles logiques. Ces systèmes ont obtenu des résultats impressionnants dans des domaines étroits comme les échecs et le diagnostic médical, mais ont eu du mal avec les tâches nécessitant du bon sens ou la gestion d'informations ambiguës.\n\nLa révolution de l'apprentissage automatique a commencé à transformer l'IA dans les années 1990 et s'est accélérée de manière spectaculaire après 2010. Au lieu de programmer des règles explicites, les chercheurs ont entraîné des algorithmes à découvrir des motifs dans de vastes ensembles de données. Les réseaux neuronaux, vaguement inspirés des structures cérébrales biologiques, se sont avérés particulièrement puissants pour la reconnaissance d'images, la compréhension de la parole et la génération de textes de type humain.\n\nL'apprentissage profond est apparu comme l'approche dominante de l'IA après une percée en 2012. Geoffrey Hinton et ses étudiants de l'Université de Toronto ont démontré que les réseaux neuronaux profonds avec de nombreuses couches pouvaient surpasser considérablement les méthodes précédentes en matière de reconnaissance d'images. Leur système a réduit les taux d'erreur de plus de 40 % par rapport aux meilleures approches antérieures.\n\nL'entraînement des systèmes d'IA modernes nécessite d'énormes ressources de calcul et de vastes quantités de données. Les grands modèles linguistiques peuvent contenir des centaines de milliards de paramètres et nécessiter des milliers de processeurs spécialisés travaillant pendant des mois. Des entreprises technologiques comme Google, Microsoft et OpenAI ont investi des milliards de dollars dans la construction de l'infrastructure nécessaire pour entraîner ces systèmes de plus en plus performants.\n\nLes capacités des systèmes d'IA se sont considérablement développées ces dernières années. Les systèmes de vision par ordinateur peuvent désormais identifier des objets, des visages et des activités dans des images avec une précision surhumaine. Le traitement du langage naturel a progressé au point où l'IA peut engager des conversations nuancées, rédiger des essais cohérents et traduire entre des dizaines de langues. Les systèmes d'IA composent désormais de la musique, génèrent des œuvres d'art et écrivent du code informatique.\n\nL'IA alimente déjà de nombreux services que les gens utilisent quotidiennement sans s'en rendre consciemment compte. Les algorithmes de recommandation suggèrent des vidéos sur YouTube et des produits sur Amazon en fonction des préférences apprises. Les filtres de messagerie utilisent l'apprentissage automatique pour séparer les messages importants du spam. Les applications de navigation prédisent les schémas de circulation et suggèrent les itinéraires optimaux. Les assistants vocaux comme Siri et Alexa utilisent l'IA pour comprendre les commandes vocales.\n\nLa santé représente l'une des applications les plus prometteuses de l'intelligence artificielle. Les systèmes d'IA peuvent analyser des images médicales pour détecter le cancer plus tôt que les radiologues humains dans certains cas. La découverte de médicaments utilise l'apprentissage automatique pour identifier les composés prometteurs et prédire leurs effets. Les assistants IA aident les médecins à se tenir au courant de la littérature médicale en pleine expansion et suggèrent des options de traitement fondées sur des preuves.\n\nLes inquiétudes concernant la sécurité de l'IA et son impact sociétal se sont accrues parallèlement à ses capacités. Les chercheurs s'inquiètent des systèmes qui poursuivent des objectifs de manière inattendue ou nuisible. Les éthiciens soulèvent des questions sur les biais dans les systèmes d'IA entraînés sur des données historiques qui reflètent les préjugés humains. Les économistes débattent de la manière dont l'automatisation affectera l'emploi à mesure que l'IA prendra en charge des tâches auparavant effectuées par des travailleurs humains.\n\nLes gouvernements du monde entier ont commencé à élaborer des réglementations pour l'intelligence artificielle. L'Union européenne a adopté en 2024 une législation globale sur l'IA qui catégorise les systèmes par niveau de risque et impose des exigences aux applications à haut risque. La Chine a mis en œuvre des règles régissant les algorithmes de recommandation et l'IA générative. Les États-Unis ont publié des décrets-lois traitant de la sécurité de l'IA tout en débattant d'une législation plus complète.\n\nL'avenir de l'intelligence artificielle reste incertain, mais il semble probable qu'il apportera des progrès rapides continus. Les chercheurs poursuivent une intelligence artificielle générale qui pourrait égaler la capacité humaine dans toutes les tâches cognitives, bien que les estimations quant au moment où cela pourrait se produire varient d'années à jamais. Ce qui semble certain, c'est que l'IA continuera de remodeler les industries, de créer de nouvelles possibilités et de soulever des questions profondes sur la relation entre l'intelligence humaine et l'intelligence artificielle.\n\nComprendre l'intelligence artificielle est devenu une connaissance essentielle pour naviguer dans le monde moderne. Que ce soit en tant qu'utilisateurs, travailleurs, citoyens ou décideurs politiques, les gens ont de plus en plus besoin de comprendre ce que l'IA peut et ne peut pas faire. Cette technologie continuera d'évoluer, et un engagement éclairé dans son développement contribuera à garantir que l'IA profite à l'humanité dans son ensemble.",
    "wordCount": 954,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Où et quand le terme \"intelligence artificielle\" a-t-il été créé ?",
        "options": [
          "MIT en 1960",
          "Dartmouth College en 1956",
          "Stanford University en 1965",
          "Bell Labs en 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Quelles applications de l'IA dans le domaine de la santé sont mentionnées dans l'article ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Analyser des images médicales pour détecter le cancer",
          "Réaliser des opérations chirurgicales robotisées",
          "Découverte de médicaments",
          "Suggérer des options de traitement"
        ],
        "correctIndices": [
          0,
          2,
          3
        ]
      },
      {
        "id": "technology-internet-c1-q3",
        "type": "true_false",
        "question": "Les premières recherches en IA se sont concentrées principalement sur l'apprentissage automatique plutôt que sur le raisonnement symbolique.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "En quelle année Geoffrey Hinton et ses étudiants ont-ils démontré une avancée majeure dans l'apprentissage profond ?",
        "correctValue": 2012,
        "tolerance": 0,
        "min": 2000,
        "max": 2025,
        "step": 1,
        "unit": "year"
      },
      {
        "id": "technology-internet-c1-q5",
        "type": "single_choice",
        "question": "Qui a inventé le terme \"intelligence artificielle\" ?",
        "options": [
          "Geoffrey Hinton",
          "John McCarthy",
          "Alan Turing",
          "Tim Berners-Lee"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q6",
        "type": "single_choice",
        "question": "De combien les réseaux neuronaux profonds ont-ils réduit les taux d'erreur par rapport aux méthodes précédentes en 2012 ?",
        "options": [
          "Plus de 20 pour cent",
          "Plus de 30 pour cent",
          "Plus de 40 pour cent",
          "Plus de 50 pour cent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "En quelle année l'Union européenne a-t-elle adopté une législation complète sur l'IA ?",
        "correctValue": 2024,
        "tolerance": 0,
        "min": 2020,
        "max": 2026,
        "step": 1,
        "unit": "year"
      }
    ],
    "articleType": "certification",
    "orderIndex": 1,
    "certificationLength": "short"
  },
  {
    "id": "technology-internet-p02",
    "topicId": "technology-internet",
    "title": "Cybersécurité : Protéger le monde numérique",
    "content": "La cybersécurité protège les ordinateurs, les réseaux et les données contre les attaques numériques qui menacent quotidiennement des milliards de personnes. Les pirates ciblent tout, des comptes bancaires personnels aux infrastructures essentielles comme les réseaux électriques et les hôpitaux. Ce domaine est passé d'une spécialité de niche à l'une des disciplines les plus importantes de la technologie moderne.\n\nLe premier virus informatique majeur, appelé Brain, est apparu au Pakistan en janvier 1986. Deux frères nommés Basit et Amjad Farooq Alvi l'ont créé pour suivre les copies illégales de leur logiciel médical. Le virus s'est propagé lentement par le biais de disquettes infectées, mettant des mois à atteindre les ordinateurs du monde entier. Aujourd'hui, les logiciels malveillants se propagent sur Internet en quelques secondes, infectant des millions d'appareils avant que les experts en sécurité ne puissent réagir.\n\nLes attaques de phishing restent la méthode la plus courante utilisée par les criminels pour voler des informations sensibles. Ces courriels trompeurs prétendent provenir de sources fiables telles que des banques, des employeurs ou des sites Web populaires. Ils incitent les destinataires à cliquer sur des liens malveillants ou à saisir des mots de passe sur de faux sites Web. Le FBI a signalé que les attaques de phishing ont causé plus de 10 milliards de dollars de pertes au cours de la seule année 2022.\n\nLes rançongiciels représentent l'un des types d'attaques cybernétiques modernes les plus destructrices. Ce logiciel malveillant chiffre les fichiers d'une victime et exige un paiement pour la clé de déchiffrement. L'attaque WannaCry en mai 2017 a infecté plus de 200 000 ordinateurs dans 150 pays en seulement quatre jours. Les hôpitaux du Royaume-Uni ont dû annuler des milliers de rendez-vous médicaux et détourner des ambulances vers des établissements non touchés.\n\nDes mots de passe robustes constituent le fondement de la cybersécurité personnelle. Les experts en sécurité recommandent d'utiliser au moins 12 caractères combinant des lettres majuscules, des lettres minuscules, des chiffres et des symboles. Chaque compte doit avoir un mot de passe unique pour éviter qu'une seule violation ne compromette plusieurs services. Les gestionnaires de mots de passe aident les utilisateurs à générer et à stocker des mots de passe complexes sans avoir à les mémoriser.\n\nL'authentification à deux facteurs ajoute une deuxième couche de sécurité cruciale au-delà des mots de passe. Ce système nécessite quelque chose que vous connaissez, comme un mot de passe, plus quelque chose que vous avez, comme un téléphone qui reçoit des codes de vérification. Même si les pirates volent votre mot de passe, ils ne peuvent pas accéder à votre compte sans le deuxième facteur. Google a signalé que l'authentification à deux facteurs bloque 99,9 % des attaques automatisées sur les comptes.\n\nLe chiffrement transforme les données en code illisible que seules les parties autorisées peuvent déchiffrer. Lorsque vous voyez une icône de cadenas dans la barre d'adresse de votre navigateur, le chiffrement protège votre connexion à ce site Web. Le chiffrement de bout en bout dans les applications de messagerie garantit que seuls vous et votre destinataire pouvez lire vos messages. Même l'entreprise fournissant le service ne peut pas accéder au contenu chiffré.\n\nLes gouvernements et les entreprises investissent des milliards dans la défense de la cybersécurité. La Cybersecurity and Infrastructure Security Agency des États-Unis, connue sous le nom de CISA, protège les réseaux fédéraux et aide les entreprises privées à se défendre contre les attaques. Les grandes entreprises technologiques emploient des milliers de chercheurs en sécurité qui traquent les vulnérabilités et développent des mesures de protection.\n\nLes pirates éthiques jouent un rôle essentiel dans l'amélioration de la sécurité en trouvant des faiblesses avant les criminels. Les entreprises versent des primes allant de centaines à des millions de dollars pour les rapports de vulnérabilités graves. Apple a lancé son programme de primes aux bogues en 2016 et offre maintenant jusqu'à 2 millions de dollars pour les failles de sécurité les plus critiques de l'iPhone. Ces programmes transforment les attaquants potentiels en défenseurs qui renforcent l'infrastructure numérique.\n\nL'avenir de la cybersécurité est confronté à de nouveaux défis liés aux technologies émergentes. Les ordinateurs quantiques pourraient éventuellement casser le chiffrement qui protège actuellement les opérations bancaires, les communications et les secrets gouvernementaux. Les chercheurs en sécurité développent déjà des algorithmes résistants à la quantique pour se préparer à cette menace. L'intelligence artificielle crée à la fois de nouvelles méthodes d'attaque et de nouvelles capacités défensives dans une course aux armements technologique continue.",
    "wordCount": 738,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Quel était le nom du premier virus informatique majeur ?",
        "options": [
          "WannaCry",
          "Brain",
          "Trojan",
          "Phishing"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p02-q2",
        "type": "single_choice",
        "question": "Selon Google, quel pourcentage d'attaques automatisées l'authentification à deux facteurs bloque-t-elle ?",
        "options": [
          "95%",
          "99%",
          "99,9%",
          "100%"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p02-q3",
        "type": "multiple_select",
        "question": "Quelles sont les pratiques recommandées pour une sécurité des mots de passe forte ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Utiliser au moins 12 caractères",
          "Utiliser le même mot de passe pour tous les comptes",
          "Combiner majuscules, minuscules, chiffres et symboles",
          "Utiliser un gestionnaire de mots de passe"
        ],
        "correctIndices": [
          0,
          2,
          3
        ]
      },
      {
        "id": "technology-internet-p02-q4",
        "type": "true_false",
        "question": "L'attaque de rançongiciel WannaCry a infecté des ordinateurs dans plus de 150 pays.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Combien d'argent les attaques de phishing ont-elles causé en pertes en 2022 (en milliards de dollars) ?",
        "correctValue": 10,
        "tolerance": 1,
        "min": 5,
        "max": 20,
        "step": 1,
        "unit": "billion dollars"
      }
    ],
    "articleType": "practice",
    "orderIndex": 2
  },
  {
    "id": "technology-internet-c2",
    "topicId": "technology-internet",
    "title": "L'Internet des Objets : Un Monde Connecté",
    "content": "L'Internet des Objets (IdO) a tissé l'intelligence numérique dans le tissu de la vie quotidienne, connectant des milliards d'appareils qui détectent, communiquent et agissent sans intervention humaine. Des thermostats intelligents qui apprennent vos préférences aux capteurs industriels surveillant l'équipement à travers les continents, cette révolution technologique étend l'internet au-delà des ordinateurs et des téléphones dans le monde physique. Comprendre cet écosystème interconnecté révèle à la fois des possibilités remarquables et des défis importants qui façonneront les décennies à venir.\n\nKevin Ashton, un pionnier britannique de la technologie travaillant chez Procter and Gamble, a inventé le terme Internet des Objets en 1999 alors qu'il développait des systèmes d'identification par radiofréquence pour suivre les produits tout au long des chaînes d'approvisionnement. Il envisageait des ordinateurs collectant des informations sur le monde physique de manière indépendante, plutôt que de compter sur les humains pour saisir les données. Cette vision a mis des décennies à se concrétiser à mesure que les capteurs devenaient moins chers, que la connectivité sans fil s'améliorait et que l'informatique en nuage fournissait l'infrastructure nécessaire pour traiter de vastes flux de données.\n\nLe nombre d'appareils connectés a augmenté de façon exponentielle depuis le début de l'adoption commerciale de l'IdO vers 2010. Les analystes de Statista ont estimé à 15,1 milliards le nombre d'appareils IdO dans le monde en 2020, et prévoient qu'il atteindra 29 milliards d'ici 2030. Chaque appareil génère des données en continu, créant des flux d'informations qui éclipsent le trafic internet traditionnel. Une seule usine connectée pourrait produire quotidiennement des téraoctets de données de capteurs provenant de milliers de points de surveillance.\n\nLa domotique intelligente représente l'application grand public la plus visible des principes de l'IdO. Le Nest Learning Thermostat, introduit par l'ancien ingénieur d'Apple Tony Fadell en octobre 2011, a été le pionnier de l'adoption généralisée de la maison intelligente. L'appareil observait quand les résidents étaient à la maison et leurs préférences de température, puis ajustait automatiquement le chauffage et la climatisation pour économiser de l'énergie. Google a acquis Nest Labs pour 3,2 milliards de dollars en janvier 2014, signalant l'engagement des grandes entreprises technologiques dans ce marché.\n\nLes assistants vocaux sont devenus des hubs centraux pour les écosystèmes de maisons intelligentes. Amazon a lancé le haut-parleur Echo doté d'Alexa en novembre 2014, suivi de Google Home en 2016 et du HomePod d'Apple en 2018. Ces appareils répondent aux commandes vocales pour contrôler les lumières, les serrures, les thermostats et les systèmes de divertissement. En 2024, plus de 200 millions de foyers dans le monde possédaient des haut-parleurs intelligents, les utilisant pour des tâches allant de la programmation de minuteurs à la commande de produits d'épicerie.\n\nLes appareils portables suivent les paramètres de santé avec une sophistication et une précision croissantes. L'Apple Watch, lancée en avril 2015, est passée d'un accessoire de mode à un dispositif médical capable de détecter les rythmes cardiaques irréguliers et les chutes. Une étude publiée dans le New England Journal of Medicine en novembre 2019 a révélé que la montre identifiait la fibrillation auriculaire, une maladie cardiaque grave, avec une précision de 84 %. Les moniteurs de glucose en continu permettent aux diabétiques de suivre leur glycémie sans piqûre au doigt, en transmettant les données aux smartphones et en alertant les utilisateurs en cas de niveaux dangereux.\n\nL'IdO industriel, parfois appelé Industrie 4.0, transforme la fabrication avec une visibilité et un contrôle sans précédent. Les capteurs intégrés dans les machines détectent les vibrations, les températures et la consommation d'énergie qui indiquent des défaillances imminentes avant que les pannes ne surviennent. General Electric a été le pionnier de la maintenance prédictive grâce à sa plateforme Predix, affirmant avoir permis à ses clients d'économiser des milliards de dollars en temps d'arrêt évités. Un seul moteur à réaction génère 10 téraoctets de données lors d'un vol transatlantique, analysés en continu pour optimiser les performances et planifier la maintenance.\n\nL'agriculture adopte l'IdO pour augmenter les rendements tout en réduisant l'impact environnemental. Les capteurs d'humidité du sol déclenchent l'irrigation uniquement lorsque les plantes ont besoin d'eau, réduisant ainsi la consommation jusqu'à 30 % par rapport à l'arrosage programmé. Les drones équipés de caméras multispectrales identifient le stress des cultures, les infestations de parasites et les carences en nutriments sur de vastes champs. John Deere, l'entreprise de matériel agricole vieille de 185 ans, collecte désormais des données auprès de millions de machines connectées et vend des services d'analyse aux agriculteurs parallèlement aux tracteurs.\n\nLes villes intelligentes déploient une infrastructure IdO pour gérer les systèmes urbains plus efficacement. Barcelone a mis en œuvre l'un des programmes de villes intelligentes les plus complets à partir de 2012, en installant des capteurs dans toute la ville pour surveiller la disponibilité des places de stationnement, les niveaux des poubelles, la qualité de l'air et les besoins en irrigation. La ville affirme réaliser des économies annuelles de 75 millions de dollars tout en améliorant les services pour les résidents. Singapour, Copenhague et Séoul ont entrepris des initiatives similaires, en utilisant des capteurs connectés pour optimiser le flux de trafic, la consommation d'énergie et les interventions d'urgence.\n\nLes applications de soins de santé s'étendent bien au-delà des dispositifs portables pour inclure la surveillance à distance des patients et les milieux cliniques. Les patients qui se remettent d'une intervention chirurgicale ou qui gèrent des maladies chroniques peuvent être surveillés à domicile à l'aide d'appareils connectés qui alertent les équipes soignantes en cas de changements préoccupants. Les hôpitaux suivent en temps réel l'emplacement et l'état des équipements essentiels. Les essais cliniques utilisent des appareils IdO pour collecter des données plus précises sur la santé des participants entre les visites. La pandémie de COVID-19 a accéléré l'adoption de technologies de surveillance à distance qui avaient auparavant connu une lente acceptation.\n\nLes problèmes de sécurité liés aux appareils IdO se sont avérés alarmants. De nombreux fabricants privilégient les fonctionnalités et les prix bas à une sécurité robuste, en livrant des appareils avec des mots de passe par défaut et des vulnérabilités non corrigées. L'attaque du botnet Mirai en octobre 2016 a détourné des centaines de milliers de webcams et d'enregistreurs vidéo numériques non sécurisés pour lancer des attaques par déni de service distribué qui ont perturbé les principaux sites web, notamment Twitter, Netflix et PayPal. Les chercheurs démontrent régulièrement des vulnérabilités alarmantes dans les babyphones, les voitures, les dispositifs médicaux et les systèmes industriels.\n\nLes implications en matière de confidentialité de la détection omniprésente soulèvent de profondes questions sur la surveillance et la propriété des données. Les assistants vocaux enregistrent les conversations à la maison. Les traqueurs d'activité physique révèlent des détails intimes sur la santé et les routines quotidiennes. Les voitures connectées transmettent des données de localisation qui révèlent où les conducteurs vont et comment ils conduisent. Les entreprises collectent ces informations pour améliorer les services et la publicité ciblée, tandis que les gouvernements cherchent de plus en plus à y accéder à des fins d'application de la loi et de sécurité nationale.\n\nLes défis d'interopérabilité fragmentent le paysage de l'IdO en écosystèmes incompatibles. Les appareils de différents fabricants ne peuvent souvent pas communiquer directement, ce qui oblige les consommateurs à choisir des plateformes et limite les fonctionnalités. Le protocole Matter, lancé en novembre 2022 par un consortium comprenant Apple, Google, Amazon et Samsung, vise à créer une norme universelle pour les appareils domestiques intelligents. Cette initiative témoigne de la reconnaissance par l'industrie du fait que la fragmentation entrave l'adoption et l'innovation.\n\nL'informatique en périphérie (Edge computing) répond aux limitations de latence et de bande passante liées à l'envoi de toutes les données IdO vers des serveurs cloud distants. Le traitement des informations localement sur ou à proximité des appareils permet des réponses en temps réel pour des applications telles que les véhicules autonomes et la robotique industrielle. Une voiture autonome ne peut pas attendre que les données voyagent vers un serveur cloud et reviennent avant de décider de freiner. Les architectures de périphérie distribuent l'intelligence dans les réseaux plutôt que de la concentrer dans des centres de données centralisés.\n\nLes contraintes énergétiques façonnent la conception et le déploiement des appareils IdO. Les capteurs alimentés par batterie doivent fonctionner pendant des années sans remplacement dans des endroits qui peuvent être inaccessibles ou dangereux. Les technologies de réseau étendu à faible consommation (LPWAN) telles que LoRaWAN et Sigfox permettent aux appareils de communiquer sur des kilomètres tout en consommant un minimum d'énergie. La récupération d'énergie à partir de sources solaires, thermiques ou cinétiques permet à certains appareils de fonctionner indéfiniment sans piles.\n\nL'empreinte environnementale de milliards d'appareils connectés exige de l'attention à mesure que l'IdO se développe. La fabrication de ces produits consomme des ressources et de l'énergie. La plupart des appareils ne prévoient pas le recyclage de leurs composants électroniques. La connectivité réseau continue nécessite de l'énergie de la part des appareils et de l'infrastructure. Cependant, les applications de l'IdO dans la gestion de l'énergie, l'agriculture et le transport peuvent réduire l'impact environnemental global lorsqu'elles sont déployées de manière réfléchie.\n\nL'avenir de l'IdO pointe vers une intelligence ambiante qui anticipe les besoins et répond automatiquement aux conditions changeantes. Les jumeaux numériques créent des répliques virtuelles de systèmes physiques pour la simulation et l'optimisation. L'intelligence artificielle appliquée aux données des capteurs permet des prédictions et des automatisations au-delà de ce que la programmation explicite pourrait réaliser. La frontière entre les mondes physique et numérique continue de s'estomper à mesure que l'intelligence connectée se répand dans l'environnement que nous habitons.",
    "wordCount": 1571,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Qui a inventé le terme \"Internet des Objets\" en 1999 ?",
        "options": [
          "Tony Fadell",
          "Kevin Ashton",
          "Tim Berners-Lee",
          "Jeff Bezos"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q2",
        "type": "multiple_select",
        "question": "Quelles entreprises ont lancé des appareils d'assistants vocaux majeurs ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Amazon avec Echo",
          "Google avec Google Home",
          "Apple avec HomePod",
          "Microsoft avec Cortana speaker"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-c2-q3",
        "type": "true_false",
        "question": "L'attaque du botnet Mirai en octobre 2016 a piraté des centaines de milliers de webcams et de DVR non sécurisés.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Combien Google a-t-il payé pour acquérir Nest Labs en janvier 2014 (en milliards de dollars) ?",
        "correctValue": 3.2,
        "tolerance": 0.3,
        "min": 1,
        "max": 10,
        "step": 0.1,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-c2-q5",
        "type": "single_choice",
        "question": "Quand l'Apple Watch est-elle sortie ?",
        "options": [
          "Octobre 2011",
          "Janvier 2014",
          "Avril 2015",
          "Novembre 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Quelle ville a mis en œuvre l'un des programmes de ville intelligente les plus complets à partir de 2012 ?",
        "options": [
          "Singapour",
          "Barcelone",
          "Copenhague",
          "Séoul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Combien d'appareils IoT devraient exister dans le monde d'ici 2030 (en milliards) ?",
        "correctValue": 29,
        "tolerance": 3,
        "min": 15,
        "max": 50,
        "step": 1,
        "unit": "billion devices"
      },
      {
        "id": "technology-internet-c2-q8",
        "type": "true_false",
        "question": "Le protocole Matter a été lancé pour créer une norme universelle pour les appareils domotiques.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Avec quelle précision l'Apple Watch a-t-elle identifié la fibrillation auriculaire selon l'étude du New England Journal of Medicine ?",
        "options": [
          "74 pour cent",
          "84 pour cent",
          "94 pour cent",
          "99 pour cent"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Quelles applications IoT dans l'agriculture sont mentionnées ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Capteurs d'humidité du sol pour l'irrigation",
          "Drones avec caméras multispectrales",
          "Tracteurs connectés avec analytique",
          "Récolte robotisée"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      }
    ],
    "articleType": "certification",
    "orderIndex": 2,
    "certificationLength": "medium"
  },
  {
    "id": "technology-internet-p03",
    "topicId": "technology-internet",
    "title": "L'évolution des médias sociaux",
    "content": "Les médias sociaux ont transformé la façon dont les humains communiquent, partagent des informations et créent des communautés d'une manière que personne n'avait prédite lorsque l'internet a fait son apparition. Les plateformes connectant des milliards d'utilisateurs ont remodelé la politique, le commerce, le divertissement et les relations personnelles sur tous les continents. L'histoire des médias sociaux révèle à la fois une innovation remarquable et de profonds défis pour la société moderne.\n\nLes premiers sites de réseaux sociaux sont apparus à la fin des années 1990, lorsque l'internet est devenu accessible au grand public. SixDegrees a été lancé en 1997, permettant aux utilisateurs de créer des profils et de se connecter avec des amis. Le site a attiré environ 3,5 millions de membres avant de fermer ses portes en 2001. Friendster a suivi en 2002, étant pionnier de fonctionnalités qui deviendraient la norme dans l'industrie. MySpace a dominé de 2005 à 2008, devenant le site web le plus visité aux États-Unis et lançant la carrière de musiciens comme Arctic Monkeys.\n\nFacebook a émergé d'une chambre d'étudiant de l'université Harvard en février 2004. Mark Zuckerberg et ses colocataires ont créé le site initialement pour les étudiants uniquement. La plateforme s'est ouverte à toute personne âgée de 13 ans et plus en septembre 2006. En 2012, Facebook a atteint un milliard d'utilisateurs actifs mensuels, un jalon qu'aucun réseau social n'avait jamais atteint. L'entreprise opère désormais sous le nom de Meta et annonce plus de 3 milliards d'utilisateurs mensuels sur sa famille d'applications, notamment Instagram et WhatsApp.\n\nTwitter a introduit un nouveau format de communication sociale lors de son lancement en juillet 2006. La plateforme limitait les messages à 140 caractères, puis les a étendus à 280, obligeant les utilisateurs à exprimer leurs pensées de manière concise. Twitter est devenu essentiel pour les dernières nouvelles, le discours politique et l'engagement des célébrités. Le service a joué un rôle notable lors des Printemps arabes en 2011 et a façonné la conversation publique sur d'innombrables questions depuis.\n\nYouTube a révolutionné le partage de vidéos après que trois anciens employés de PayPal l'ont fondé en février 2005. La première vidéo, intitulée \"Me at the zoo\", montrait le cofondateur Jawed Karim au zoo de San Diego pendant seulement 18 secondes. Google a acheté YouTube pour 1,65 milliard de dollars en octobre 2006. Aujourd'hui, les utilisateurs téléchargent plus de 500 heures de contenu vidéo chaque minute, et la plateforme touche plus de personnes âgées de 18 à 49 ans que tous les réseaux de télévision câblée combinés.\n\nInstagram a apporté le partage de photos aux appareils mobiles lorsque Kevin Systrom et Mike Krieger l'ont lancé en octobre 2010. L'application a gagné 25 000 utilisateurs dès son premier jour et a atteint un million en deux mois. Facebook a acquis Instagram pour un milliard de dollars en avril 2012. La plateforme a introduit les Stories en 2016 et les Reels en 2020, adaptant des fonctionnalités popularisées par des concurrents comme Snapchat et TikTok.\n\nTikTok est devenue la plateforme sociale à la croissance la plus rapide de l'histoire après son lancement international en 2017. La société chinoise ByteDance l'a créée en fusionnant avec Musical.ly, une application populaire auprès des adolescents américains. L'algorithme de TikTok recommande des vidéos en fonction du comportement de visionnage plutôt que des relations de suivi, créant une expérience différente des plateformes précédentes. L'application a atteint un milliard d'utilisateurs mensuels en septembre 2021, atteignant ce jalon plus rapidement que n'importe quel prédécesseur.\n\nLes médias sociaux ont créé de nouvelles opportunités économiques valant des milliards de dollars chaque année. Les influenceurs gagnent des revenus substantiels en s'associant à des marques et en faisant la promotion de produits auprès de leurs followers. L'économie des créateurs employait environ 50 millions de personnes dans le monde en 2022. Les petites entreprises utilisent les plateformes sociales pour atteindre les clients sans publicité traditionnelle coûteuse. Des industries entières ont émergé autour de la gestion de la présence sur les médias sociaux pour les organisations et les particuliers.\n\nLes préoccupations concernant la santé mentale liées aux médias sociaux ont suscité un débat intense parmi les chercheurs et les décideurs. Des études associent une forte utilisation des médias sociaux à des taux accrus d'anxiété, de dépression et de solitude, en particulier chez les adolescents. Le Dr Jean Twenge de l'université d'État de San Diego a publié une étude en 2017 montrant une forte baisse de la santé mentale des adolescents coïncidant avec l'adoption des smartphones. Les critiques soutiennent que la corrélation ne prouve pas la causalité et soulignent les avantages potentiels de la connexion en ligne.\n\nLa désinformation se propage rapidement à travers les réseaux sociaux, mettant à l'épreuve l'écosystème de l'information. Les fausses informations voyagent plus vite et touchent plus de personnes que les rapports exacts, selon une étude du MIT publiée dans Science en mars 2018. Les plateformes ont mis en œuvre des programmes de vérification des faits, des étiquettes d'avertissement et des modifications algorithmiques pour lutter contre le contenu trompeur. Ces efforts produisent des résultats mitigés et soulèvent des questions sur la censure et le rôle des entreprises technologiques dans la détermination de la vérité.\n\nLes préoccupations relatives à la vie privée ont suivi les médias sociaux depuis leurs débuts. Les entreprises collectent de grandes quantités de données personnelles pour cibler la publicité avec une précision remarquable. Le scandale Cambridge Analytica en 2018 a révélé qu'une société de conseil politique avait collecté des données auprès de 87 millions d'utilisateurs de Facebook sans consentement. Des réglementations telles que le Règlement général européen sur la protection des données tentent de donner aux utilisateurs plus de contrôle sur leurs informations.\n\nL'avenir des médias sociaux continue d'évoluer rapidement à mesure que les nouvelles technologies et l'évolution des préférences remodèlent le paysage. Les plateformes de réalité virtuelle promettent des expériences sociales plus immersives. Les réseaux décentralisés construits sur la technologie blockchain visent à donner aux utilisateurs plus de contrôle. Les jeunes préfèrent de plus en plus la messagerie privée aux publications publiques. Quelles que soient les formes qu'elle prendra, la connexion sociale via les plateformes numériques restera essentielle à la communication humaine pour les générations à venir.",
    "wordCount": 1019,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Quel est le premier site de réseau social mentionné dans l'article ?",
        "options": [
          "Facebook",
          "Friendster",
          "SixDegrees",
          "MySpace"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p03-q2",
        "type": "single_choice",
        "question": "Combien Google a-t-il payé pour acquérir YouTube en 2006 ?",
        "options": [
          "1 milliard de dollars",
          "1,65 milliard de dollars",
          "2 milliards de dollars",
          "10 milliards de dollars"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Quelles plateformes font partie de la famille d'applications de Meta ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Facebook",
          "Instagram",
          "WhatsApp",
          "TikTok"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p03-q4",
        "type": "true_false",
        "question": "TikTok a atteint un milliard d'utilisateurs mensuels plus rapidement que n'importe quelle plateforme de médias sociaux auparavant.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Combien d'utilisateurs de Facebook ont vu leurs données collectées lors du scandale Cambridge Analytica (en millions) ?",
        "correctValue": 87,
        "tolerance": 5,
        "min": 50,
        "max": 150,
        "step": 1,
        "unit": "million users"
      },
      {
        "id": "technology-internet-p03-q6",
        "type": "single_choice",
        "question": "Quand Facebook a-t-il atteint un milliard d'utilisateurs actifs mensuels ?",
        "options": [
          "2008",
          "2010",
          "2012",
          "2014"
        ],
        "correctIndex": 2
      }
    ],
    "articleType": "practice",
    "orderIndex": 3
  },
  {
    "id": "technology-internet-c3",
    "topicId": "technology-internet",
    "title": "La révolution de la vie privée numérique",
    "content": "La vie privée numérique est devenue l'une des questions déterminantes du XXIe siècle, les entreprises technologiques accumulant des quantités sans précédent d'informations personnelles tandis que les gouvernements étendent leurs capacités de surveillance à des niveaux qui auraient semblé dystopiques il y a quelques décennies. La tension entre les avantages des services axés sur les données et les risques d'une surveillance omniprésente façonne les débats politiques, les modèles économiques et les choix individuels à travers le monde. Comprendre ce paysage complexe nécessite d'examiner les technologies qui permettent à la fois la surveillance et la protection de la vie privée, les cadres juridiques qui peinent à suivre le rythme de l'innovation, et les questions philosophiques sur ce que signifie la vie privée à l'ère de la connectivité omniprésente.\n\nLe concept de la vie privée informationnelle a obtenu une reconnaissance juridique bien avant l'ère numérique. Les juristes américains Samuel Warren et Louis Brandeis ont publié leur article de référence de 1890 dans la Harvard Law Review, plaidant pour le droit d'être laissé tranquille en réponse au journalisme intrusif rendu possible par les caméras portables. Ce texte fondateur a établi la vie privée comme distincte des droits de propriété et de l'autonomie corporelle. Brandeis est devenu plus tard juge à la Cour suprême et a rédigé des avis influents étendant les protections de la vie privée contre l'intrusion gouvernementale.\n\nInternet a transformé la vie privée d'un concept juridique abstrait en une préoccupation pratique quotidienne. Les premiers utilisateurs du web partageaient des informations personnelles avec désinvolture, sans se rendre compte de la manière dont elles pourraient être collectées et utilisées. Les cookies, de petits fichiers texte stockés par les navigateurs web, ont permis aux sites web de reconnaître les visiteurs qui revenaient à partir de 1994. L'ingénieur de Netscape, Lou Montulli, a inventé les cookies pour résoudre le problème technique du maintien des paniers d'achat, mais ils sont rapidement devenus des outils de surveillance permettant de suivre les utilisateurs sur différents sites web.\n\nGoogle a révolutionné la publicité numérique en connectant les requêtes de recherche aux intérêts des utilisateurs avec une précision remarquable. Les fondateurs de l'entreprise ont initialement exprimé leur malaise face aux modèles économiques financés par la publicité, écrivant dans leur article universitaire de 1998 que la publicité crée des incitations mitigées à privilégier les annonceurs par rapport aux utilisateurs. Néanmoins, Google AdWords a été lancé en octobre 2000, suivi de Google AdSense en 2003, créant l'infrastructure de publicité ciblée qui générerait des centaines de milliards de revenus.\n\nFacebook a étendu la collecte de données aux relations sociales et aux communications personnelles. La plateforme a été lancée en février 2004 avec la promesse de connecter les gens, mais son modèle économique dépendait de la vente de profils d'utilisateurs détaillés aux annonceurs. Les utilisateurs partageaient des photos, des données de localisation, des opinions politiques et leur statut relationnel, souvent sans comprendre comment ces informations seraient monétisées. En 2018, Facebook collectait des données sur environ 2,2 milliards d'utilisateurs dans le monde.\n\nLe scandale Cambridge Analytica a explosé dans la conscience publique en mars 2018, révélant comment des applications tierces pouvaient collecter des données auprès de millions d'utilisateurs de Facebook à leur insu. La société de conseil britannique Cambridge Analytica a obtenu des informations personnelles auprès de 87 millions d'utilisateurs grâce à une application de quiz de personnalité qui exploitait les permissions de l'API de Facebook. La société a utilisé ces données pour la publicité politique lors de l'élection présidentielle américaine de 2016 et du référendum sur le Brexit. Facebook a fait face à des enquêtes réglementaires sur plusieurs continents et a payé une amende record de 5 milliards de dollars à la Federal Trade Commission en juillet 2019.\n\nLes révélations d'Edward Snowden en juin 2013 ont exposé l'ampleur de la surveillance gouvernementale rendue possible par les communications numériques. L'ancien contractuel de la National Security Agency a divulgué des documents classifiés aux journalistes Glenn Greenwald, Laura Poitras et Ewen MacAskill. Ces documents ont révélé des programmes collectant des métadonnées téléphoniques auprès de millions d'Américains, interceptant des câbles à fibre optique transportant des communications internationales et exploitant les vulnérabilités des produits technologiques. Les révélations ont suscité des débats mondiaux sur l'équilibre entre sécurité et vie privée.\n\nLe programme PRISM a permis à la NSA de collecter des données directement auprès des serveurs des principales entreprises technologiques, notamment Google, Facebook, Apple et Microsoft. Les entreprises ont initialement nié avoir connaissance du programme, bien que des reportages ultérieurs aient précisé qu'elles se conformaient aux ordonnances légales tout en luttant parfois contre l'expansion de la surveillance devant les tribunaux. Snowden s'est enfui à Hong Kong et a finalement reçu l'asile en Russie, où il se trouvait encore en 2024. Les États-Unis l'ont accusé d'espionnage et de vol de biens gouvernementaux.\n\nLe chiffrement constitue la principale défense technique contre la surveillance gouvernementale et l'interception criminelle. Le chiffrement de bout en bout garantit que seuls l'expéditeur et le destinataire peuvent lire les messages, même le fournisseur de services étant incapable d'accéder au contenu. WhatsApp a mis en œuvre le chiffrement de bout en bout pour ses 1,5 milliard d'utilisateurs en avril 2016, en utilisant le protocole Signal développé par le cryptographe Moxie Marlinspike. Apple crypte de la même manière les communications iMessage et a publiquement résisté aux demandes gouvernementales d'accès par porte dérobée.\n\nLes forces de l'ordre soutiennent que le chiffrement crée des zones où les criminels opèrent en toute impunité. Le FBI a poursuivi Apple en février 2016 pour forcer l'entreprise à l'aider à déverrouiller un iPhone utilisé par l'un des terroristes de San Bernardino. Apple a refusé, arguant que la création d'une porte dérobée compromettrait la sécurité de tous les utilisateurs. Le FBI a finalement payé un contractant tiers environ un million de dollars pour contourner la sécurité du téléphone. Cette affaire a illustré le conflit permanent entre les intérêts de la vie privée et de la sécurité.\n\nL'Union européenne a adopté le Règlement général sur la protection des données, communément appelé RGPD, qui est entré en vigueur le 25 mai 2018. Ce cadre complet a établi des règles strictes pour la collecte, le stockage et le traitement des données personnelles des résidents de l'UE. Les organisations doivent obtenir un consentement explicite avant de collecter des données, fournir un accès aux informations stockées et supprimer les données sur demande. Les violations peuvent entraîner des amendes allant jusqu'à 4 % du chiffre d'affaires annuel mondial ou 20 millions d'euros, selon le montant le plus élevé. Amazon a reçu la plus forte amende RGPD de 746 millions d'euros en juillet 2021.\n\nLa Californie a adopté la California Consumer Privacy Act, entrée en vigueur le 1er janvier 2020, établissant des protections similaires pour les résidents de l'État. La loi accorde aux consommateurs le droit de savoir quelles informations personnelles les entreprises collectent, de supprimer ces informations et de refuser leur vente. La California Privacy Rights Act, approuvée par les électeurs en novembre 2020, a renforcé davantage ces protections. D'autres États, dont la Virginie, le Colorado et le Connecticut, ont adopté une législation comparable, créant ainsi un patchwork d'exigences en matière de protection de la vie privée à travers les États-Unis.\n\nLes courtiers en données opèrent en grande partie en dehors de la conscience publique, compilant des profils détaillés à partir de documents publics, d'historiques d'achats, d'activités sur les médias sociaux et de nombreuses autres sources. Des entreprises comme Acxiom, Experian et Oracle Data Cloud maintiennent des bases de données couvrant des centaines de millions de personnes. Ces profils influencent les décisions de crédit, le contrôle des antécédents professionnels, les taux d'assurance et la publicité ciblée. Les courtiers vendent l'accès à ces informations aux entreprises, aux campagnes politiques et parfois aux acteurs malveillants.\n\nLe suivi de la localisation est devenu particulièrement controversé, car les smartphones signalent en permanence la position des utilisateurs. Les applications mobiles demandent régulièrement l'accès à la localisation pour des fonctionnalités allant des prévisions météorologiques aux recommandations de restaurants. Ces données révèlent des informations sensibles sur les visites médicales, les pratiques religieuses, les activités politiques et les relations personnelles. Le Wall Street Journal a rapporté en décembre 2018 que des douzaines d'entreprises reçoivent des données de localisation précises de la part d'applications populaires, créant ainsi des historiques de mouvements complets.\n\nLa technologie de reconnaissance faciale soulève des préoccupations distinctes en matière de vie privée en permettant l'identification sans consentement ni connaissance. Les forces de l'ordre utilisent des systèmes provenant d'entreprises comme Clearview AI, qui a collecté des milliards de photos à partir des médias sociaux pour construire une base de données consultable. Plusieurs villes, dont San Francisco, Boston et Portland, ont interdit l'utilisation de la reconnaissance faciale par le gouvernement. L'Union européenne a débattu des restrictions sur la surveillance biométrique dans les espaces publics. La Chine a déployé la reconnaissance faciale de manière extensive, l'utilisant pour des mesures de contrôle social ciblant en particulier les minorités ouïghoures.\n\nLe droit à l'oubli est né d'une décision de 2014 de la Cour de justice de l'Union européenne exigeant de Google qu'il supprime certains résultats de recherche sur demande. Mario Costeja Gonzalez, un citoyen espagnol, a fait valoir avec succès que les liens vers des articles de journaux de 1998 sur ses difficultés financières n'étaient plus pertinents. Google a traité plus de 1,6 million de demandes de suppression affectant près de 6 millions d'URL depuis la décision. Les critiques estiment que cela équivaut à de la censure, tandis que les partisans y voient un élément essentiel à la dignité personnelle et à la réhabilitation.\n\nLes technologies préservant la vie privée offrent des alternatives à l'économie de la surveillance. Les réseaux privés virtuels chiffrent le trafic internet et masquent la localisation des utilisateurs. Le navigateur Tor achemine les communications via plusieurs serveurs pour empêcher le suivi. Les moteurs de recherche axés sur la vie privée comme DuckDuckGo traitent les requêtes sans collecter de données personnelles. Signal fournit une messagerie chiffrée qui collecte un minimum de métadonnées. Ces outils nécessitent une sophistication technique qui limite l'adoption, mais démontrent que des services respectueux de la vie privée sont techniquement réalisables.\n\nLa vie privée des enfants bénéficie d'une protection juridique spéciale en raison de leur vulnérabilité et de leur incapacité à donner un consentement éclairé. La Children's Online Privacy Protection Act, adoptée en 1998, restreint la collecte d'informations personnelles auprès des enfants de moins de 13 ans aux États-Unis. TikTok a payé 5,7 millions de dollars en février 2019 pour régler des accusations de collecte illégale de données d'enfants. Le Age Appropriate Design Code du Royaume-Uni, entré en vigueur en septembre 2021, exige que les services en ligne fournissent des paramètres de confidentialité élevés par défaut pour les utilisateurs de moins de 18 ans.\n\nL'avenir de la vie privée numérique dépend de l'innovation technologique, du développement réglementaire et des attitudes culturelles à l'égard du partage de données. Les systèmes d'identité décentralisés pourraient donner aux individus le contrôle de leurs informations personnelles. Les techniques de confidentialité différentielle permettent une analyse utile des données tout en protégeant les enregistrements individuels. La convergence réglementaire pourrait établir des normes mondiales plutôt que des approches nationales fragmentées. La tension fondamentale entre l'utilité des données et la protection de la vie privée persistera, mais l'équilibre entre les deux reste sujet à la contestation démocratique et aux choix individuels.",
    "wordCount": 1874,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Quand Samuel Warren et Louis Brandeis ont-ils publié leur article de référence sur la vie privée dans la Harvard Law Review ?",
        "options": [
          "1870",
          "1890",
          "1910",
          "1930"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q2",
        "type": "multiple_select",
        "question": "Quelles entreprises ont été révélées comme faisant partie du programme PRISM de la NSA ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Google",
          "Facebook",
          "Apple",
          "Nokia"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-c3-q3",
        "type": "true_false",
        "question": "Le scandale Cambridge Analytica impliquait les données de 87 millions d'utilisateurs de Facebook.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Combien Facebook a-t-il payé d'amende à la FTC en juillet 2019 (en milliards de dollars) ?",
        "correctValue": 5,
        "tolerance": 0.5,
        "min": 1,
        "max": 10,
        "step": 0.5,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-c3-q5",
        "type": "single_choice",
        "question": "Quand Edward Snowden a-t-il divulgué des documents classifiés de la NSA ?",
        "options": [
          "Juin 2011",
          "Juin 2013",
          "Juin 2015",
          "Juin 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Quand le RGPD est-il entré en vigueur ?",
        "options": [
          "25 mai 2016",
          "25 mai 2017",
          "25 mai 2018",
          "25 mai 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Quel était le montant de l'amende RGPD d'Amazon en juillet 2021 (en millions d'euros) ?",
        "correctValue": 746,
        "tolerance": 50,
        "min": 400,
        "max": 1000,
        "step": 10,
        "unit": "million euros"
      },
      {
        "id": "technology-internet-c3-q8",
        "type": "true_false",
        "question": "WhatsApp a implémenté le chiffrement de bout en bout pour ses utilisateurs en avril 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Quand la loi californienne sur la protection de la vie privée des consommateurs est-elle entrée en vigueur ?",
        "options": [
          "1er janvier 2018",
          "1er janvier 2019",
          "1er janvier 2020",
          "1er janvier 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Quand la loi sur la protection de la vie privée des enfants en ligne a-t-elle été promulguée ?",
        "correctValue": 1998,
        "tolerance": 0,
        "min": 1990,
        "max": 2010,
        "step": 1,
        "unit": "year"
      },
      {
        "id": "technology-internet-c3-q11",
        "type": "single_choice",
        "question": "Qui a inventé les cookies web en 1994 ?",
        "options": [
          "Tim Berners-Lee",
          "Lou Montulli",
          "Marc Andreessen",
          "Vint Cerf"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q12",
        "type": "single_choice",
        "question": "Quand Google AdWords a-t-il été lancé ?",
        "options": [
          "Octobre 1998",
          "Octobre 2000",
          "Octobre 2002",
          "Octobre 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Combien TikTok a-t-il payé en février 2019 pour régler les accusations concernant les données des enfants (en millions de dollars) ?",
        "correctValue": 5.7,
        "tolerance": 0.5,
        "min": 2,
        "max": 15,
        "step": 0.1,
        "unit": "million dollars"
      },
      {
        "id": "technology-internet-c3-q14",
        "type": "true_false",
        "question": "San Francisco a interdit l'utilisation de la technologie de reconnaissance faciale par le gouvernement.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Quelle était la date de la décision de la Cour de justice européenne sur le droit à l'oubli ?",
        "options": [
          "2012",
          "2014",
          "2016",
          "2018"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q16",
        "type": "multiple_select",
        "question": "Quels journalistes ont reçu les documents divulgués par Edward Snowden ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Glenn Greenwald",
          "Laura Poitras",
          "Ewen MacAskill",
          "Julian Assange"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      }
    ],
    "articleType": "certification",
    "orderIndex": 3,
    "certificationLength": "long"
  },
  {
    "id": "technology-internet-p04",
    "topicId": "technology-internet",
    "title": "Le Monde Révolutionnaire de la Technologie Blockchain",
    "content": "La technologie blockchain est passée d'un concept cryptographique obscur à une force transformatrice qui remodèle des secteurs bien au-delà de ses origines dans la monnaie numérique. Ce système de registre distribué offre une transparence, une sécurité et une décentralisation sans précédent qui remettent en question les approches traditionnelles de la tenue de registres et de la confiance. Comprendre la blockchain révèle pourquoi les technologues la considèrent comme l'une des innovations les plus importantes depuis l'avènement d'Internet lui-même.\n\nSatoshi Nakamoto, un individu ou un groupe pseudonyme, a présenté la blockchain au monde grâce au livre blanc Bitcoin publié le 31 octobre 2008. Le timing s'est avéré remarquablement opportun, arrivant quelques semaines seulement après l'effondrement de Lehman Brothers qui a déclenché la crise financière mondiale. Nakamoto a proposé un système de cash électronique pair-à-pair qui éliminerait le besoin d'intermédiaires de confiance comme les banques. Le premier bloc Bitcoin, appelé bloc genesis, a été miné le 3 janvier 2009, intégrant un titre de journal sur les plans de sauvetage des banques comme un rappel permanent des motivations de la technologie.\n\nUne blockchain fonctionne comme une base de données distribuée partagée à travers un réseau d'ordinateurs appelés nœuds. Chaque bloc contient une liste de transactions, un horodatage et un hachage cryptographique le reliant au bloc précédent. Cette chaîne de hachages rend pratiquement impossible la modification des enregistrements historiques sans contrôler une majorité du réseau. Lorsque quelqu'un tente de modifier une ancienne transaction, le hachage change, brisant la chaîne et alertant les autres nœuds de la tentative de falsification.\n\nLes mécanismes de consensus garantissent que tous les nœuds s'accordent sur le contenu de la blockchain sans nécessiter d'autorité centrale. Bitcoin utilise la preuve de travail, où les ordinateurs sont en concurrence pour résoudre des énigmes mathématiques complexes. Le premier à trouver une solution gagne le droit d'ajouter le bloc suivant et de recevoir des bitcoins nouvellement créés en récompense. Ce processus, appelé minage, a consommé environ 127 térawattheures d'électricité en 2023, ce qui est comparable à la consommation annuelle d'énergie de la Norvège.\n\nEthereum, lancé par le programmeur Vitalik Buterin en juillet 2015, a étendu la blockchain au-delà des simples transactions pour inclure des contrats intelligents programmables. Ces accords auto-exécutables appliquent automatiquement leurs conditions lorsque des conditions prédéfinies sont remplies. Un contrat intelligent pour l'immobilier pourrait libérer le paiement à un vendeur et transférer la propriété à un acheteur simultanément une fois que les deux parties ont rempli leurs obligations. Aucun avocat, agent d'entiercement ou banque n'a besoin de vérifier la transaction.\n\nLa finance décentralisée, communément appelée DeFi, utilise des contrats intelligents pour recréer les services financiers traditionnels sans intermédiaires. Les plateformes de prêt permettent aux utilisateurs d'emprunter des cryptomonnaies en fournissant des garanties, avec des taux d'intérêt déterminés par des algorithmes plutôt que par des banquiers. Les échanges décentralisés permettent des échanges directs entre les utilisateurs sans qu'une entreprise détienne leurs fonds. À son apogée en novembre 2021, les protocoles DeFi détenaient plus de 180 milliards de dollars d'actifs.\n\nLes jetons non fongibles, connus sous le nom de NFT, appliquent la blockchain à la propriété et à la provenance numériques. Chaque NFT représente un actif unique vérifié sur la blockchain, le plus souvent de l'art ou des objets de collection numériques. L'artiste numérique Beeple a vendu une œuvre d'art NFT à la maison de vente aux enchères Christie's en mars 2021 pour 69,3 millions de dollars, propulsant cette technologie dans la conscience collective. Les critiques se demandent si les NFT ont une valeur durable, tandis que les partisans soutiennent qu'ils changent fondamentalement la façon dont les créateurs monétisent les œuvres numériques.\n\nLa gestion de la chaîne d'approvisionnement offre des applications pratiques convaincantes pour la technologie blockchain. Les entreprises peuvent suivre les produits des matières premières à la fabrication jusqu'aux rayons des magasins avec des enregistrements immuables à chaque étape. Walmart s'est associé à IBM sur un système blockchain qui retrace l'origine des produits alimentaires en quelques secondes, au lieu de la semaine nécessaire auparavant. Cette capacité s'avère inestimable lors des rappels de sécurité alimentaire, où l'identification rapide des lots contaminés sauve des vies.\n\nLes gouvernements explorent la blockchain pour la vérification d'identité, les systèmes de vote et les archives publiques. L'Estonie, un pionnier de la gouvernance numérique, utilise la blockchain pour sécuriser les dossiers de santé, les enregistrements d'entreprises et les documents judiciaires de ses 1,3 million de citoyens. Le secrétaire d'État de Virginie-Occidentale a mené un projet pilote de vote basé sur la blockchain pour le personnel militaire stationné à l'étranger lors des élections de mi-mandat de 2018. Ces expériences permettent de vérifier si la technologie peut améliorer plutôt que menacer les institutions démocratiques.\n\nLes préoccupations environnementales entourant la blockchain ont suscité une évolution technologique importante. Ethereum est passé de la preuve de travail à forte consommation d'énergie à la preuve d'enjeu en septembre 2022, réduisant sa consommation d'électricité d'environ 99,95 %. La preuve d'enjeu sélectionne les validateurs en fonction de la cryptomonnaie qu'ils mettent en gage à titre de garantie plutôt que de la puissance de calcul. Ce changement démontre que la blockchain peut s'attaquer à son empreinte environnementale tout en maintenant la sécurité.\n\nLes défis de l'évolutivité limitent l'adoption de la blockchain pour les transactions quotidiennes. Bitcoin traite environ sept transactions par seconde, contre une capacité de 24 000 pour le réseau Visa. Les solutions de couche deux créent des canaux de paiement plus rapides au-dessus des blockchains existantes. Le Lightning Network permet des transactions Bitcoin quasi instantanées en ne réglant que les soldes finaux sur la blockchain principale. Ces innovations visent à rendre la blockchain pratique pour les achats quotidiens.\n\nL'avenir de la blockchain s'étend à des domaines que ses créateurs n'avaient jamais imaginés. Les organisations autonomes décentralisées, ou DAO, utilisent le vote par jetons pour gouverner les communautés et gérer les trésoreries sans structures d'entreprise traditionnelles. Les systèmes d'identité numérique pourraient donner aux individus le contrôle de leurs données personnelles tout en prouvant leurs compétences aux employeurs, aux propriétaires ou aux gouvernements. Il reste à savoir si la blockchain réalisera son potentiel révolutionnaire ou se contentera d'un rôle de niche, mais son impact sur la technologie et la société s'est déjà avéré substantiel et durable.",
    "wordCount": 1026,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Quand le livre blanc de Bitcoin a-t-il été publié ?",
        "options": [
          "3 janvier 2009",
          "31 octobre 2008",
          "Juillet 2015",
          "Septembre 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Parmi les éléments suivants, lesquels sont mentionnés comme applications de la blockchain au-delà de la cryptomonnaie ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Gestion de la chaîne d'approvisionnement",
          "Identité numérique",
          "Systèmes de vote",
          "Streaming vidéo"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p04-q3",
        "type": "true_false",
        "question": "Ethereum a transitionné vers la preuve d'enjeu en septembre 2022, réduisant ainsi sa consommation d'électricité de 99,95 %.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Pour combien l'œuvre d'art NFT de Beeple s'est-elle vendue chez Christie's en mars 2021 (en millions de dollars) ?",
        "correctValue": 69.3,
        "tolerance": 5,
        "min": 40,
        "max": 100,
        "step": 0.1,
        "unit": "million dollars"
      },
      {
        "id": "technology-internet-p04-q5",
        "type": "single_choice",
        "question": "Qui a lancé Ethereum en juillet 2015 ?",
        "options": [
          "Satoshi Nakamoto",
          "Vitalik Buterin",
          "Tim Berners-Lee",
          "Elon Musk"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q6",
        "type": "single_choice",
        "question": "Combien de transactions par seconde le réseau Bitcoin peut-il traiter ?",
        "options": [
          "Environ 7",
          "Environ 70",
          "Environ 700",
          "Environ 7 000"
        ],
        "correctIndex": 0
      }
    ],
    "articleType": "practice",
    "orderIndex": 4
  },
  {
    "id": "technology-internet-p05",
    "topicId": "technology-internet",
    "title": "La Révolution du Cloud Computing",
    "content": "Le cloud computing a fondamentalement transformé la manière dont les entreprises et les particuliers utilisent la technologie, déplaçant les logiciels et le stockage des données des appareils locaux vers de vastes réseaux de serveurs distants. Cette révolution architecturale permet des capacités qui semblaient impossibles il y a seulement deux décennies, du streaming de divertissement aux services d'intelligence artificielle accessibles depuis n'importe quel appareil. Le cloud est devenu si essentiel à la vie moderne que la plupart des gens l'utilisent quotidiennement sans s'en rendre compte.\n\nAmazon Web Services a lancé ses premiers produits cloud en mars 2006, pionnier du modèle Infrastructure-as-a-Service (IaaS) qui allait remodeler l'industrie technologique. L'entreprise avait construit une capacité informatique massive pour gérer les pics de fréquentation comme le Black Friday et a réalisé qu'elle pouvait louer sa capacité inutilisée à d'autres entreprises. Andy Jassy, qui a dirigé AWS depuis sa création, a transformé la division en un moteur de profit générant plus de 80 milliards de dollars de revenus annuels. Ce modèle commercial s'est avéré si fructueux que ses concurrents se sont précipités pour construire leurs propres plateformes cloud.\n\nMicrosoft Azure est entré sur le marché du cloud en février 2010, tirant parti des relations solides de l'entreprise avec les entreprises clientes. Le PDG Satya Nadella, qui a pris la direction en 2014, a pivoté la stratégie de Microsoft autour des services cloud. Azure est devenu le deuxième plus grand fournisseur de cloud, alimentant tout, des sites Web de petites entreprises au réseau professionnel LinkedIn. La transformation cloud de Microsoft a relancé une entreprise que beaucoup avaient considérée comme dépassée.\n\nGoogle Cloud Platform apporte l'expertise du géant de la recherche en matière d'informatique distribuée et d'apprentissage automatique aux entreprises clientes. L'entreprise qui indexe l'ensemble de l'internet et traite des milliards de requêtes de recherche quotidiennement offre cette infrastructure aux entreprises de toutes tailles. Les investissements de Google dans les câbles sous-marins et les centres de données répartis dans des dizaines de pays permettent un accès à faible latence depuis presque partout sur Terre. La plateforme excelle particulièrement dans l'analyse de données et les charges de travail d'intelligence artificielle.\n\nLe cloud computing offre trois modèles de service principaux qui s'empilent les uns sur les autres comme des couches. Infrastructure as a Service (IaaS) fournit des machines virtuelles, du stockage et une mise en réseau que les clients configurent eux-mêmes. Platform as a Service (PaaS) ajoute des systèmes d'exploitation, des bases de données et des outils de développement. Software as a Service (SaaS) fournit des applications complètes via des navigateurs Web, éliminant ainsi complètement l'installation et la maintenance. La plupart des gens interagissent quotidiennement avec les produits SaaS par le biais du courrier électronique, de l'édition de documents et des applications professionnelles.\n\nL'économie du cloud computing crée des avantages pour les organisations de presque toutes les tailles. Les startups se lancent sans acheter de matériel coûteux ni embaucher du personnel spécialisé pour maintenir les centres de données. Elles ne paient que pour les ressources consommées, augmentant leur capacité pendant les périodes de forte activité et la diminuant pendant les périodes creuses. Cette flexibilité a transformé l'économie du lancement d'une entreprise technologique. Un service qui aurait pu nécessiter des millions d'investissement en infrastructure peut désormais être lancé avec un capital minimal.\n\nLes grandes entreprises migrent de plus en plus de leurs centres de données sur site vers les plateformes cloud. General Electric a consolidé des centaines de centres de données dans une architecture cloud hybride à partir de 2014. Capital One, l'une des plus grandes banques d'Amérique, a annoncé en 2020 qu'elle avait fermé son dernier centre de données après avoir migré entièrement vers AWS. Ces transformations prennent des années et coûtent des milliards de dollars, mais elles réduisent finalement les coûts tout en augmentant les capacités.\n\nLa sécurité dans le cloud diffère fondamentalement des approches traditionnelles, mais elle dépasse souvent ce que les organisations réalisent de manière indépendante. Les principaux fournisseurs de cloud emploient des milliers de spécialistes de la sécurité et investissent des milliards dans les technologies de protection. Ils détiennent des certifications pour le traitement des informations gouvernementales classifiées et des données financières sensibles. Les modèles de responsabilité partagée signifient que les fournisseurs sécurisent l'infrastructure tandis que les clients sécurisent leurs propres applications et configurations de données.\n\nLa distribution géographique des centres de données cloud sert des objectifs allant au-delà de l'optimisation des performances. Les réglementations de nombreux pays exigent que certaines données restent à l'intérieur des frontières nationales. Les fournisseurs de cloud construisent des centres de données régionaux pour se conformer à ces exigences de souveraineté. Les clients européens peuvent s'assurer que leurs données restent à Francfort ou à Amsterdam. Les entreprises australiennes conservent les informations dans leur pays. Cette architecture distribuée offre également des capacités de reprise après sinistre que peu d'organisations pourraient se permettre de manière indépendante.\n\nL'edge computing étend les capacités du cloud plus près de l'endroit où les données sont générées. Au lieu d'envoyer tout vers des centres de données distants, les systèmes périphériques traitent les informations localement pour les applications nécessitant une réponse immédiate. Les véhicules autonomes ne peuvent pas attendre que les données parcourent des milliers de kilomètres avant de décider de freiner. Les capteurs industriels analysant les vibrations des équipements ont besoin d'une détection instantanée des anomalies. L'edge computing apporte l'intelligence du cloud aux scénarios où les millisecondes comptent.\n\nLe serverless computing représente la dernière évolution de l'architecture cloud. Dans ce modèle, les développeurs écrivent du code sans gérer aucune infrastructure. Les plateformes cloud allouent automatiquement des ressources lorsque le code s'exécute et ne facturent que le temps d'exécution réel. Une fonction qui s'exécute pendant 100 millisecondes coûte une infime fraction de centime. Les applications peuvent passer de zéro à la gestion de millions de requêtes sans aucune modification de configuration.\n\nL'impact environnemental du cloud computing génère à la fois des préoccupations et des opportunités. Les centres de données consomment environ 1,5 % de l'électricité mondiale, et cette part continue de croître. Cependant, les fournisseurs de cloud fonctionnent beaucoup plus efficacement que les centres de données d'entreprise typiques. Google affirme que ses installations atteignent une efficacité énergétique moyenne de 1,1 contre une moyenne industrielle supérieure à 1,5. Les plateformes cloud alimentent de plus en plus leurs opérations avec des énergies renouvelables, Microsoft s'engageant à être neutre en carbone d'ici 2030.\n\nL'intelligence artificielle et l'apprentissage automatique sont devenus des caractéristiques déterminantes des plateformes cloud. Des modèles pré-entraînés pour la reconnaissance d'images, le traitement du langage naturel et la synthèse vocale sont disponibles via des interfaces de programmation simples. Les organisations sans expertise en apprentissage automatique peuvent ajouter des capacités sophistiquées à leurs applications. Les fournisseurs de cloud se font une concurrence acharnée sur les fonctionnalités d'IA, chacun revendiquant des avantages en termes de précision, de facilité d'utilisation et d'étendue des modèles disponibles.\n\nLes stratégies multi-cloud permettent aux organisations d'utiliser plusieurs fournisseurs simultanément, évitant ainsi de dépendre d'un seul fournisseur. Kubernetes, un système d'orchestration de conteneurs open source initialement développé par Google, permet de déplacer les charges de travail entre les clouds. Les entreprises sélectionnent différents fournisseurs pour différentes charges de travail en fonction du coût, des performances ou des capacités spécialisées. Cette flexibilité nécessite une complexité supplémentaire, mais réduit les préoccupations liées à la dépendance vis-à-vis d'un fournisseur.\n\nL'avenir du cloud computing laisse entrevoir une intégration encore plus grande avec la vie quotidienne et les opérations commerciales. Des ressources de calcul quantique apparaissent déjà sur les plateformes cloud, bien que les applications pratiques restent limitées. L'intelligence artificielle automatisera davantage la gestion de l'infrastructure, réduisant ainsi l'expertise requise pour déployer des systèmes sophistiqués. La frontière entre les appareils locaux et les ressources cloud s'estompera encore davantage à mesure que la connectivité s'améliorera et que l'edge computing mûrira. Quelles que soient les technologies spécifiques qui émergeront, le passage fondamental d'une infrastructure possédée à des services loués continuera de remodeler la façon dont l'humanité calcule.",
    "wordCount": 1312,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Quand Amazon Web Services a-t-il lancé ses premiers produits cloud ?",
        "options": [
          "Mars 2006",
          "Février 2010",
          "Janvier 2014",
          "Novembre 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Quels sont les trois principaux modèles de services cloud mentionnés ? Sélectionnez toutes les réponses pertinentes.",
        "options": [
          "Infrastructure as a Service",
          "Platform as a Service",
          "Software as a Service",
          "Hardware as a Service"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p05-q3",
        "type": "true_false",
        "question": "Capital One a annoncé en 2020 qu'elle avait fermé son dernier centre de données après avoir migré entièrement vers AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Quel pourcentage de l'électricité mondiale les centres de données consomment-ils ?",
        "correctValue": 1.5,
        "tolerance": 0.3,
        "min": 0.5,
        "max": 5,
        "step": 0.1,
        "unit": "percent"
      },
      {
        "id": "technology-internet-p05-q5",
        "type": "single_choice",
        "question": "Quel PDG a fait pivoter la stratégie de Microsoft autour des services cloud à partir de 2014 ?",
        "options": [
          "Bill Gates",
          "Steve Ballmer",
          "Satya Nadella",
          "Andy Jassy"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p05-q6",
        "type": "single_choice",
        "question": "Quel système open source permet aux charges de travail de se déplacer entre différents fournisseurs de cloud ?",
        "options": [
          "Docker",
          "Kubernetes",
          "Linux",
          "Apache"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p05-q7",
        "type": "numeric",
        "question": "Quel est le chiffre d'affaires annuel généré par AWS (en milliards de dollars) ?",
        "correctValue": 80,
        "tolerance": 10,
        "min": 40,
        "max": 150,
        "step": 5,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-p05-q8",
        "type": "single_choice",
        "question": "À partir de quand Microsoft s'est-il engagé à être négatif en carbone ?",
        "options": [
          "2025",
          "2030",
          "2040",
          "2050"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 5
  },
  {
    "id": "technology-internet-p06",
    "topicId": "technology-internet",
    "title": "La révolution de l'informatique quantique",
    "content": "L'informatique quantique représente la transformation la plus profonde de la puissance de calcul depuis l'invention du transistor, promettant de résoudre des problèmes qui prendraient aux ordinateurs classiques plus de temps que l'âge de l'univers. Ces machines exploitent les propriétés étranges de la mécanique quantique pour effectuer des calculs d'une manière fondamentalement nouvelle qui défie l'intuition quotidienne. La compréhension de cette technologie révolutionnaire révèle à la fois son potentiel extraordinaire et les défis considérables qui subsistent avant que les ordinateurs quantiques ne tiennent pleinement leurs promesses.\n\nLes ordinateurs classiques encodent l'information sous forme de bits qui existent soit sous la forme zéro, soit sous la forme un à un moment donné. Chaque photographie, document et vidéo sur vos appareils se réduit à de longues chaînes de ces chiffres binaires manipulés par des opérations logiques. Cette approche a permis des progrès remarquables depuis les années 1940, avec des processeurs contenant désormais des milliards de transistors sur des puces plus petites qu'un ongle. Pourtant, certains problèmes restent obstinément hors de portée car le nombre de calculs requis croît de façon exponentielle avec la taille du problème.\n\nLes ordinateurs quantiques utilisent des bits quantiques, appelés qubits, qui peuvent exister en superposition, représentant zéro et un simultanément jusqu'à ce qu'ils soient mesurés. Cette propriété permet aux systèmes quantiques d'explorer de nombreuses solutions possibles à la fois plutôt que de les vérifier une par une. Lorsque plusieurs qubits s'intriquent, la mesure de l'un affecte instantanément les autres, quelle que soit la distance physique. Ces phénomènes quantiques permettent des algorithmes qui surpassent considérablement les approches classiques pour des types de problèmes spécifiques.\n\nRichard Feynman, le physicien lauréat du prix Nobel, a proposé le concept de l'informatique quantique lors d'une conférence au California Institute of Technology en mai 1981. Il a observé que la simulation de systèmes mécaniques quantiques sur des ordinateurs classiques nécessitait des ressources croissant de façon exponentielle à mesure que la taille du système augmentait. Feynman a suggéré que seul un ordinateur mécanique quantique pouvait simuler efficacement la physique quantique. Cette intuition a lancé un domaine qui allait se développer lentement pendant des décennies avant que des percées récentes n'accélèrent les progrès.\n\nDavid Deutsch, de l'université d'Oxford, a formalisé la théorie du calcul quantique en 1985, décrivant comment un ordinateur quantique universel pouvait exploiter la superposition et l'interférence. Peter Shor, des Bell Labs, a rendu l'informatique quantique célèbre en 1994 lorsqu'il a développé un algorithme capable de factoriser de grands nombres exponentiellement plus rapidement que toute méthode classique connue. Cette découverte menaçait le cryptage RSA qui sécurise les communications internet, faisant soudainement de l'informatique quantique une question de sécurité nationale.\n\nLa construction d'ordinateurs quantiques réels s'est avérée extraordinairement difficile car les qubits sont fragiles et facilement perturbés par leur environnement. Toute interaction avec le monde extérieur provoque une décohérence, effondrant la superposition et détruisant l'information quantique. Les premières expériences ont maintenu la cohérence pendant seulement quelques nanosecondes. Les chercheurs ont mis au point des techniques d'isolation élaborées, notamment des circuits supraconducteurs refroidis à des températures plus froides que l'espace extra-atmosphérique, généralement autour de 15 millikelvins, à peine au-dessus du zéro absolu.\n\nIBM a mis en ligne le premier ordinateur quantique accessible via le cloud, appelé IBM Quantum Experience, en mai 2016, permettant aux chercheurs et aux passionnés du monde entier d'expérimenter avec du matériel quantique réel. Le système initial ne contenait que cinq qubits, à peine assez pour des démonstrations simples. En 2023, IBM avait déployé des systèmes dépassant les 1 000 qubits et annoncé des plans pour des systèmes à 100 000 qubits d'ici 2033. Ces machines sont encore loin de remplacer les ordinateurs classiques, mais démontrent des progrès constants vers une utilité pratique.\n\nGoogle a franchi une étape importante appelée suprématie quantique en octobre 2019 lorsque son processeur Sycamore à 53 qubits a effectué un calcul en 200 secondes qui prendrait environ 10 000 ans au superordinateur le plus rapide du monde. Les critiques ont contesté la comparaison, IBM arguant que ses superordinateurs pouvaient effectuer la tâche en quelques jours plutôt qu'en millénaires. Néanmoins, cette réalisation a démontré que les ordinateurs quantiques pouvaient surpasser les systèmes classiques sur au moins certaines tâches.\n\nLa correction d'erreurs représente peut-être le plus grand obstacle à une informatique quantique utile. Les qubits physiques sont trop bruyants et peu fiables pour des calculs complexes. La correction d'erreurs quantiques encode un qubit logique sur de nombreux qubits physiques pour détecter et corriger les erreurs, mais les approches actuelles nécessitent des milliers de qubits physiques par qubit logique. Un ordinateur quantique résolvant des problèmes pratiques pourrait avoir besoin de millions de qubits physiques, bien au-delà des capacités actuelles.\n\nDifférentes technologies se disputent pour construire les meilleurs qubits pour les futurs ordinateurs quantiques. Les circuits supraconducteurs, utilisés par IBM et Google, tirent parti des techniques de fabrication établies de l'industrie des semi-conducteurs. Les ions piégés, utilisés par IonQ et Honeywell, maintiennent les atomes chargés dans des champs électromagnétiques avec une précision exceptionnelle. Les systèmes photoniques encodent l'information dans des particules de lumière qui peuvent voyager sur de longues distances sans décohérence. Les qubits topologiques, encore largement théoriques, stockeraient l'information dans des motifs résistants aux perturbations locales.\n\nLes applications de chimie quantique peuvent offrir les premiers avantages pratiques de l'informatique quantique. La simulation de molécules pour concevoir de nouveaux médicaments, matériaux et catalyseurs nécessite des calculs mécaniques quantiques qui évoluent de façon exponentielle sur les ordinateurs classiques. Un ordinateur quantique pourrait modéliser les réactions chimiques au niveau atomique, accélérant potentiellement la découverte de médicaments, d'engrais et de technologies énergétiques propres. Des entreprises telles que Roche, Merck et BASF ont lancé des programmes de recherche en informatique quantique en prévision de ces capacités.\n\nLes problèmes d'optimisation couvrant la logistique, la finance et l'apprentissage automatique représentent un autre domaine d'application prometteur. Trouver la meilleure route pour les camions de livraison, les portefeuilles optimaux pour les investisseurs ou les paramètres idéaux pour les réseaux neuronaux implique la recherche de vastes espaces de solutions. Le recuit quantique, une forme spécialisée d'informatique quantique commercialisée par D-Wave Systems depuis 2011, s'attaque directement à l'optimisation. Les grandes entreprises, notamment Volkswagen, JPMorgan Chase et Lockheed Martin, ont exploré l'optimisation quantique pour de réels défis commerciaux.\n\nLa cryptographie est confrontée à la fois aux menaces et aux opportunités découlant des progrès de l'informatique quantique. L'algorithme de Shor pourrait casser le cryptage largement utilisé une fois que des ordinateurs quantiques suffisamment puissants existeront. Le National Institute of Standards and Technology a sélectionné de nouvelles normes cryptographiques post-quantiques en juillet 2022 après un concours de six ans visant à identifier des algorithmes résistants aux attaques quantiques. Parallèlement, la distribution quantique de clés utilise la physique de la mesure quantique pour créer un cryptage théoriquement incassable pour les communications les plus sensibles.\n\nLa Chine a massivement investi dans la technologie quantique, faisant de l'Université des sciences et technologies de Chine un chef de file mondial sous la direction du physicien Pan Jianwei. En 2017, la Chine a lancé Micius, un satellite qui a démontré des communications sécurisées quantiquement entre des stations au sol séparées par 1 200 kilomètres. Des chercheurs chinois ont revendiqué la suprématie quantique avec un système photonique appelé Jiuzhang en décembre 2020. Les États-Unis ont réagi avec le National Quantum Initiative Act de 2018, allouant 1,2 milliard de dollars sur cinq ans pour maintenir la compétitivité.\n\nL'industrie de l'informatique quantique a attiré d'énormes investissements malgré des calendriers incertains pour des rendements pratiques. Le financement par capital-risque pour les startups quantiques a dépassé 2,5 milliards de dollars en 2022. Les grandes entreprises technologiques, notamment Microsoft, Amazon et Alibaba, ont lancé des services cloud quantiques aux côtés d'entreprises de matériel dédiées. Les analystes prévoient que le marché de l'informatique quantique atteindra 65 milliards de dollars d'ici 2030, bien que les estimations varient considérablement compte tenu de l'incertitude technologique.\n\nL'avenir de l'informatique quantique dépend de progrès soutenus sur plusieurs fronts simultanément. Le matériel doit s'améliorer en termes d'échelle, de cohérence et de connectivité. Les logiciels doivent développer des algorithmes efficaces et des outils de programmation accessibles au-delà des spécialistes de la physique quantique. Les applications doivent démontrer des avantages clairs par rapport aux alternatives classiques pour les problèmes du monde réel. Le chemin qui mène des démonstrations en laboratoire à une utilité pratique peut prendre des décennies, mais les récompenses potentielles justifient la poursuite des investissements et des efforts.",
    "wordCount": 1385,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Qui a proposé le concept d'informatique quantique en mai 1981 ?",
        "options": [
          "David Deutsch",
          "Peter Shor",
          "Richard Feynman",
          "Alan Turing"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q2",
        "type": "multiple_select",
        "question": "Quelles technologies sont mentionnées comme approches pour construire des qubits ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Circuits supraconducteurs",
          "Ions piégés",
          "Systèmes photoniques",
          "Transistors en graphène"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p06-q3",
        "type": "true_false",
        "question": "IBM a mis en ligne le premier ordinateur quantique accessible via le cloud en mai 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Combien de secondes le processeur Sycamore de Google a-t-il mis pour effectuer son calcul de suprématie quantique ?",
        "correctValue": 200,
        "tolerance": 20,
        "min": 100,
        "max": 500,
        "step": 10,
        "unit": "seconds"
      },
      {
        "id": "technology-internet-p06-q5",
        "type": "single_choice",
        "question": "Quand Peter Shor a-t-il développé son célèbre algorithme de factorisation ?",
        "options": [
          "1985",
          "1990",
          "1994",
          "2000"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q6",
        "type": "single_choice",
        "question": "À quelle température les ordinateurs quantiques supraconducteurs sont-ils généralement refroidis ?",
        "options": [
          "Environ 100 kelvins",
          "Environ 4 kelvins",
          "Environ 15 millikelvins",
          "Environ 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Quel montant de financement le National Quantum Initiative Act a-t-il alloué sur cinq ans (en milliards de dollars) ?",
        "correctValue": 1.2,
        "tolerance": 0.2,
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-p06-q8",
        "type": "true_false",
        "question": "La Chine a lancé un satellite de communication quantique nommé Micius en 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Quand le NIST a-t-il sélectionné de nouvelles normes de cryptographie post-quantique ?",
        "options": [
          "Juillet 2020",
          "Juillet 2021",
          "Juillet 2022",
          "Juillet 2023"
        ],
        "correctIndex": 2
      }
    ],
    "articleType": "practice",
    "orderIndex": 6
  },
  {
    "id": "technology-internet-p07",
    "topicId": "technology-internet",
    "title": "L'industrie mondiale des semi-conducteurs",
    "content": "Les semi-conducteurs sont devenus le fondement de la civilisation moderne, alimentant tout, des smartphones et des automobiles aux dispositifs médicaux et aux systèmes militaires dont les nations dépendent pour leur sécurité. Ces minuscules puces contenant des milliards de transistors représentent les objets les plus complexes jamais fabriqués par l'humanité, produits par des processus nécessitant une précision mesurée en atomes. La compétition mondiale pour le contrôle de la technologie des semi-conducteurs a transformé cette industrie en un point chaud de rivalité géopolitique avec des implications pour la prospérité économique et la sécurité nationale dans le monde entier.\n\nL'aventure des semi-conducteurs a commencé aux Bell Labs dans le New Jersey le 23 décembre 1947, lorsque les physiciens John Bardeen, Walter Brattain et William Shockley ont démontré le premier transistor. Ce dispositif pouvait amplifier les signaux électriques sans la chaleur et la fragilité des tubes à vide, ce qui a valu à ses inventeurs le prix Nobel de physique en 1956. Le potentiel de miniaturisation du transistor allait finalement permettre la révolution numérique qui a remodelé la société humaine.\n\nJack Kilby chez Texas Instruments et Robert Noyce chez Fairchild Semiconductor ont inventé indépendamment le circuit intégré en 1958 et 1959, combinant plusieurs transistors sur une seule pièce de matériau semi-conducteur. Cette percée a éliminé le besoin de câbler manuellement les composants individuels et a permis une fabrication à grande échelle. Kilby a reçu le prix Nobel de physique en 2000 pour cette contribution qui a rendu possible l'électronique moderne.\n\nGordon Moore, cofondateur d'Intel, a observé en 1965 que le nombre de transistors sur les circuits intégrés doublait environ tous les deux ans, tandis que les coûts restaient constants. Cette observation, connue sous le nom de loi de Moore, a guidé l'industrie pendant six décennies d'amélioration exponentielle. Les processeurs modernes contiennent plus de 100 milliards de transistors, chacun mesurant seulement quelques nanomètres de diamètre, soit environ la largeur de 20 atomes de silicium.\n\nLe processus de fabrication des semi-conducteurs comporte des centaines d'étapes qui s'étendent sur des mois d'opérations précises. Les ingénieurs commencent avec des cylindres de silicium ultra-pur cultivés à partir de matériau en fusion à des températures supérieures à 1 400 degrés Celsius. Ces lingots sont coupés en fines tranches (wafers) et polis jusqu'à obtenir une surface atomiquement lisse. La photolithographie projette les schémas de circuits sur les wafers à l'aide de lumière ultraviolette, les machines les plus avancées utilisant des longueurs d'onde ultraviolettes extrêmes de seulement 13,5 nanomètres.\n\nTaiwan Semiconductor Manufacturing Company, connue sous le nom de TSMC, est devenue le fabricant de semi-conducteurs le plus important au monde. Fondée par Morris Chang en 1987, TSMC a été le pionnier du modèle de fonderie consistant à fabriquer des puces conçues par d'autres entreprises. En 2023, TSMC produisait plus de 90 % des puces les plus avancées au monde, y compris les processeurs pour Apple, AMD et Nvidia. Cette concentration de capacité sur une île confrontée à des revendications territoriales de la Chine est devenue une préoccupation géopolitique majeure.\n\nL'équipement nécessaire à la fabrication de semi-conducteurs avancés représente une réalisation technologique stupéfiante. ASML, une entreprise néerlandaise, détient un monopole sur les machines de lithographie ultraviolette extrême qui coûtent environ 200 millions de dollars chacune et pèsent 180 000 kilogrammes. Ces systèmes utilisent du plasma chauffé à 220 000 degrés Celsius pour générer les longueurs d'onde de lumière précises nécessaires. ASML a eu besoin des contributions du fournisseur d'optique Zeiss, du développeur de sources lumineuses Cymer et de nombreux autres partenaires pour parvenir à cette capacité après des décennies de développement.\n\nSamsung Electronics et Intel sont en concurrence avec TSMC pour le leadership de la fabrication avancée, bien que les deux aient pris du retard ces dernières années. Samsung exploite d'importantes installations de fabrication en Corée du Sud et au Texas, produisant des puces pour divers clients en plus de ses propres produits. Intel, historiquement le leader technologique, a connu des difficultés avec les retards de fabrication et a perdu des parts de marché avant d'annoncer des plans d'investissement agressifs sous la direction du PDG Pat Gelsinger à partir de 2021.\n\nLa Chine a fait de l'indépendance en matière de semi-conducteurs une priorité nationale, investissant plus de 150 milliards de dollars par le biais de son Fonds national d'investissement dans l'industrie des circuits intégrés et d'autres programmes. Semiconductor Manufacturing International Corporation représente le fabricant national le plus avancé de Chine, bien qu'il reste plusieurs générations derrière TSMC. Les contrôles américains sur les exportations imposés à partir d'octobre 2022 restreignent l'accès de la Chine aux équipements de fabrication avancés et aux conceptions de puces, intensifiant la pression sur le développement indigène.\n\nL'industrie automobile a découvert sa dangereuse dépendance aux semi-conducteurs pendant la pénurie mondiale de puces qui a commencé en 2020. Alors que les confinements liés à la pandémie perturbaient les chaînes d'approvisionnement, les constructeurs automobiles ont annulé des commandes en s'attendant à une faible demande. Lorsque la demande a repris plus vite que prévu, les usines de semi-conducteurs avaient alloué leur capacité à d'autres clients. General Motors, Ford et Toyota ont interrompu leurs lignes de production par intermittence pendant plus de deux ans en attendant les puces. La pénurie a coûté à l'industrie automobile environ 210 milliards de dollars de pertes de revenus.\n\nLes gouvernements du monde entier ont lancé des programmes massifs pour construire une capacité nationale de semi-conducteurs. Les États-Unis ont adopté le CHIPS and Science Act en août 2022, allouant 52 milliards de dollars à la fabrication et à la recherche de semi-conducteurs. L'European Chips Act a engagé 43 milliards d'euros à des objectifs similaires. Le Japon a annoncé 2 000 milliards de yens de subventions pour attirer les usines de TSMC, Samsung et Micron. L'Inde a lancé un programme de 10 milliards de dollars visant à créer sa première installation de fabrication avancée.\n\nLes puces mémoire représentent une catégorie distincte de semi-conducteurs dominée par des acteurs différents de ceux des processeurs logiques. Samsung, SK Hynix de Corée du Sud et Micron des États-Unis contrôlent le marché de la DRAM pour la mémoire vive des ordinateurs. L'industrie de la mémoire flash qui stocke les données dans les smartphones et les disques SSD implique les mêmes acteurs coréens ainsi que le fabricant japonais Kioxia. Les prix de la mémoire fluctuent considérablement avec les cycles de l'offre et de la demande, créant des schémas de boom et de krach qui compliquent les décisions d'investissement.\n\nL'industrie de la conception de semi-conducteurs s'est concentrée autour de quelques entreprises de premier plan qui disposent d'énormes ressources. Nvidia, fondée par Jensen Huang en 1993, est passée d'une entreprise de cartes graphiques à une puissance de l'intelligence artificielle avec des puces alimentant les centres de données du monde entier. La capitalisation boursière de l'entreprise a dépassé les mille milliards de dollars en juin 2023. Qualcomm domine les processeurs mobiles avec une technologie concédée sous licence à presque tous les fabricants de smartphones. AMD est devenu un concurrent sérieux d'Intel dans les ordinateurs personnels et les serveurs sous la direction de la PDG Lisa Su.\n\nLes fournisseurs d'équipements de semi-conducteurs forment une couche essentielle mais souvent négligée de l'écosystème industriel. Applied Materials, Lam Research et KLA Corporation des États-Unis fournissent des équipements de dépôt, de gravure et d'inspection essentiels à la fabrication. Tokyo Electron du Japon contribue des systèmes de revêtement et de nettoyage. Ces entreprises investissent des milliards de dollars chaque année dans la recherche et le développement pour repousser les limites de la précision de la fabrication.\n\nL'empreinte environnementale de la fabrication de semi-conducteurs soulève des préoccupations en matière de durabilité auxquelles l'industrie s'attaque de plus en plus. Une installation de fabrication moderne consomme de l'électricité équivalente à une petite ville, certaines usines à Taïwan utilisant autant d'énergie que 300 000 foyers. La consommation d'eau atteint des millions de gallons par jour pour les processus de refroidissement et de nettoyage. L'industrie s'est engagée à adopter les énergies renouvelables et le recyclage de l'eau afin de réduire l'impact environnemental, TSMC s'engageant à atteindre des émissions nettes nulles d'ici 2050.\n\nLes technologies d'emballage avancées étendent les performances des semi-conducteurs au-delà de ce que la miniaturisation des transistors peut réaliser à elle seule. Les architectures chiplet combinent plusieurs petites puces dans des boîtiers qui fonctionnent comme des processeurs uniques. L'empilement tridimensionnel place les puces verticalement connectées par des piliers microscopiques. Ces techniques permettent une amélioration continue, même si l'approche des limites atomiques menace la mise à l'échelle traditionnelle. Les derniers processeurs d'AMD utilisent des conceptions chiplet qui réduisent les coûts de fabrication tout en améliorant les performances.\n\nLes besoins en main-d'œuvre de la fabrication de semi-conducteurs créent des défis pour l'expansion de l'industrie. Les techniciens qualifiés qui exploitent les équipements de fabrication ont besoin d'années de formation. Les ingénieurs qui conçoivent les processus de nouvelle génération ont besoin de diplômes avancés et d'une expertise spécialisée. Les États-Unis sont confrontés à des pénuries particulières après des décennies de déclin de la fabrication. Les initiatives éducatives et les politiques d'immigration détermineront si les pays peuvent doter en personnel les installations de fabrication qu'ils s'empressent de construire.\n\nLes préoccupations en matière de sécurité imprègnent l'industrie des semi-conducteurs, car les puces deviennent des armes dans la compétition technologique entre les nations. Les systèmes de défense dépendent d'approvisionnements de puces fiables, exemptes de vulnérabilités cachées. La prospérité économique nécessite un accès aux technologies les plus avancées pour l'intelligence artificielle, les véhicules autonomes et d'autres applications émergentes. L'importance stratégique des semi-conducteurs garantit que les gouvernements continueront à investir massivement et à restreindre les exportations afin de protéger les intérêts nationaux perçus.\n\nLa prochaine décennie déterminera si l'industrie des semi-conducteurs reste concentrée en Asie de l'Est ou si elle se diversifie à l'échelle mondiale. Les investissements considérables dans de nouvelles installations de fabrication mettront des années à devenir productifs. Les défis technologiques se multiplient à mesure que les transistors approchent des limites physiques fondamentales. De nouveaux paradigmes informatiques, notamment le traitement quantique et les puces neuromorphes, pourraient à terme compléter ou remplacer les semi-conducteurs traditionnels. Quelles que soient les directions que prendra l'industrie, ces minuscules puces resteront essentielles à la vie moderne dans un avenir prévisible.",
    "wordCount": 1680,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Quand le premier transistor a-t-il été présenté aux Bell Labs ?",
        "options": [
          "23 décembre 1945",
          "23 décembre 1947",
          "23 décembre 1950",
          "23 décembre 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Quelles entreprises sont mentionnées comme fabricants de puces mémoire ? Sélectionnez toutes les réponses pertinentes.",
        "options": [
          "Samsung",
          "SK Hynix",
          "Micron",
          "Intel"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p07-q3",
        "type": "true_false",
        "question": "TSMC produisait plus de 90 % des puces les plus avancées au monde en 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Combien coûte une machine de lithographie ultraviolette extrême d'ASML (en millions de dollars) ?",
        "correctValue": 200,
        "tolerance": 20,
        "min": 100,
        "max": 400,
        "step": 10,
        "unit": "million dollars"
      },
      {
        "id": "technology-internet-p07-q5",
        "type": "single_choice",
        "question": "Qui a fondé TSMC en 1987 ?",
        "options": [
          "Jensen Huang",
          "Morris Chang",
          "Pat Gelsinger",
          "Lisa Su"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q6",
        "type": "single_choice",
        "question": "Quel montant le CHIPS and Science Act a-t-il alloué aux semi-conducteurs en août 2022 ?",
        "options": [
          "32 milliards de dollars",
          "42 milliards de dollars",
          "52 milliards de dollars",
          "62 milliards de dollars"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Quel a été le coût du manque de puces automobiles pour l'industrie en termes de pertes de revenus (en milliards de dollars) ?",
        "correctValue": 210,
        "tolerance": 20,
        "min": 100,
        "max": 400,
        "step": 10,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-p07-q8",
        "type": "true_false",
        "question": "La capitalisation boursière de Nvidia a dépassé mille milliards de dollars en juin 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "À quelle température le plasma est-il chauffé dans les machines EUV d'ASML ?",
        "options": [
          "22 000 degrés Celsius",
          "120 000 degrés Celsius",
          "220 000 degrés Celsius",
          "1 400 degrés Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Combien de milliards de transistors contiennent les processeurs modernes ?",
        "correctValue": 100,
        "tolerance": 20,
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "billion transistors"
      },
      {
        "id": "technology-internet-p07-q11",
        "type": "single_choice",
        "question": "Quand Jack Kilby a-t-il inventé le circuit intégré chez Texas Instruments ?",
        "options": [
          "1955",
          "1958",
          "1962",
          "1965"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 7
  },
  {
    "id": "technology-internet-p08",
    "topicId": "technology-internet",
    "title": "L'évolution des médias en streaming",
    "content": "Le streaming média a fondamentalement transformé la manière dont l'humanité consomme le divertissement, l'éducation et l'information, remplaçant les supports physiques et les grilles de diffusion par un accès instantané à un contenu virtuellement illimité depuis n'importe quel appareil connecté à Internet. Cette révolution technologique, qui a débuté avec des clips vidéo granuleux dans les années 1990, propose désormais des films en ultra-haute définition, des concerts en direct et des expériences interactives à des milliards d'utilisateurs dans le monde entier. L'histoire du streaming révèle comment les progrès en matière de compression, de bande passante et de modèles économiques se sont combinés pour remodeler des industries entières.\n\nLes fondements techniques du streaming sont issus de la recherche sur la compression vidéo et les protocoles réseau au cours des années 1980 et 1990. Les ingénieurs du Moving Picture Experts Group ont développé les normes MPEG qui ont rendu la vidéo numérique pratique, MPEG-1 apparaissant en 1993 et MPEG-4 en 1998. Ces algorithmes de compression réduisent la taille des fichiers vidéo à des dimensions gérables en éliminant les informations redondantes entre les images et en approximant les détails que l'œil humain ne remarquerait pas. Sans une telle compression, le streaming vidéo nécessiterait une bande passante bien supérieure à ce que les réseaux pourraient fournir.\n\nRealNetworks a lancé RealPlayer en 1995, ouvrant la voie au streaming audio et vidéo sur les premières connexions Internet. Le format RealAudio de la société a permis aux stations de radio de diffuser sur le web pour la première fois. RealVideo a suivi en 1997, bien que les vidéos de la taille d'un timbre-poste, saccadées, ne ressemblent guère au streaming moderne. À son apogée vers l'an 2000, RealPlayer était installé sur plus de 85 % des ordinateurs connectés à Internet.\n\nApple est entré dans l'arène du streaming avec QuickTime, initialement sorti en 1991 pour la lecture de fichiers vidéo locaux. L'entreprise a ajouté des capacités de streaming tout au long des années 1990 et a exploité la technologie lors du lancement d'iTunes en janvier 2001. Bien qu'iTunes se soit initialement concentré sur le téléchargement de musique plutôt que sur le streaming, il a démontré l'appétit des consommateurs pour un accès numérique instantané. Apple a vendu plus de 70 millions de chansons via iTunes au cours de sa première année.\n\nLa fondation de YouTube en février 2005 par les anciens employés de PayPal, Chad Hurley, Steve Chen et Jawed Karim, a marqué le début de l'ère grand public du streaming vidéo. La plateforme a rendu le téléchargement et le partage de vidéos simples pour les utilisateurs ordinaires sans expertise technique. La première vidéo, montrant Karim au zoo de San Diego, a été mise en ligne le 23 avril 2005. Google a reconnu le potentiel de YouTube et a acquis l'entreprise pour 1,65 milliard de dollars en octobre 2006, seulement dix-huit mois après sa fondation.\n\nNetflix a commencé comme un service de location de DVD par courrier en 1997, fondé par Reed Hastings et Marc Randolph à Scotts Valley, en Californie. La société a introduit la location illimitée pour un abonnement mensuel en 1999, défiant le modèle de location à l'unité de Blockbuster. Netflix a lancé le streaming vidéo en janvier 2007, initialement en complément de son service de DVD. Les abonnés pouvaient regarder une sélection limitée de films et d'émissions de télévision directement sur leurs ordinateurs sans attendre l'arrivée des disques.\n\nLa transition des DVD au streaming s'est accélérée tout au long des années 2010 à mesure que les vitesses d'Internet s'amélioraient et que les bibliothèques de contenu s'élargissaient. Netflix a commencé à produire des programmes originaux avec la sortie de House of Cards en février 2013, qui a été acclamée par la critique et a démontré que les plateformes de streaming pouvaient rivaliser avec les réseaux traditionnels en termes de talent et de qualité. L'entreprise a massivement investi dans le contenu original, dépensant plus de 17 milliards de dollars par an en programmation d'ici 2022.\n\nSpotify a révolutionné le streaming musical après que ses fondateurs suédois, Daniel Ek et Martin Lorentzon, ont lancé le service en octobre 2008. La plateforme offrait à la fois une écoute gratuite financée par la publicité et des abonnements premium sans publicité. Spotify a négocié des accords de licence avec les grandes maisons de disques malgré la résistance initiale d'une industrie qui se remettait encore de l'impact dévastateur du piratage. En décembre 2023, Spotify a annoncé 602 millions d'utilisateurs actifs mensuels et plus de 236 millions d'abonnés payants.\n\nAmazon Prime Video est né de l'acquisition par Amazon en 2006 du service vidéo qui est devenu Amazon Unbox. L'entreprise a regroupé le streaming vidéo avec l'abonnement Prime à partir de février 2011, ajoutant de la valeur à l'abonnement qui n'offrait auparavant qu'une expédition plus rapide. Amazon a commencé à produire du contenu original en 2013 et a depuis remporté des Emmy Awards et des Oscars pour ses productions. La combinaison du streaming vidéo avec les avantages des achats crée des avantages concurrentiels uniques.\n\nDisney a lancé Disney Plus le 12 novembre 2019, en exploitant sa vaste bibliothèque de contenu comprenant les propriétés Marvel, Star Wars, Pixar et National Geographic. Le service a attiré 10 millions d'abonnés dès son premier jour, démontrant la puissance des franchises populaires et des prix agressifs. Disney Plus a atteint plus de 160 millions d'abonnés en quatre ans, bien que l'entreprise ait été confrontée à des pressions pour atteindre la rentabilité après les pertes initiales dues à d'importants investissements dans le contenu.\n\nLe streaming en direct s'est étendu au-delà du divertissement pour englober les jeux, l'éducation, le fitness et d'innombrables autres domaines. Twitch, fondé en 2011 et acquis par Amazon pour 970 millions de dollars en 2014, a popularisé le streaming de jeux vidéo en direct. Les joueurs professionnels diffusent à des millions de téléspectateurs tout en gagnant des revenus grâce aux abonnements et aux dons. La plateforme a enregistré en moyenne plus de 31 millions de visiteurs quotidiens en 2023, rivalisant avec les émissions sportives traditionnelles auprès d'un jeune public.\n\nLes innovations techniques continuent d'améliorer la qualité et l'efficacité du streaming. Le streaming à débit adaptatif ajuste automatiquement la qualité vidéo en fonction de la bande passante disponible, évitant ainsi la mise en mémoire tampon tout en maximisant la résolution lorsque les connexions le permettent. Les réseaux de diffusion de contenu positionnent les serveurs géographiquement près des téléspectateurs, réduisant ainsi la latence et améliorant la fiabilité. Les améliorations des codecs, notamment H.265 et AV1, offrent une qualité supérieure à des débits binaires inférieurs, permettant ainsi le streaming 4K et 8K même sur des connexions limitées.\n\nL'infrastructure prenant en charge les services de streaming nécessite des investissements massifs dans les centres de données et la capacité du réseau. La diffusion de contenu de Netflix utilise des serveurs positionnés au sein des réseaux des fournisseurs d'accès à Internet, stockant des copies des titres populaires localement afin de réduire le transfert de données sur de longues distances. Pendant les heures de pointe du soir, le streaming vidéo représente plus de 60 % du trafic Internet en Amérique du Nord. Cette concentration a suscité des débats sur la neutralité du net et sur la question de savoir si les services de streaming devraient payer pour une diffusion prioritaire.\n\nLe streaming musical a fondamentalement modifié la façon dont les artistes gagnent de l'argent et dont les maisons de disques fonctionnent. Spotify verse aux artistes environ 0,003 à 0,005 dollar par écoute, ce qui nécessite des millions d'écoutes pour générer des revenus significatifs. Ce modèle favorise les artistes ayant un public important et engagé, tout en rendant plus difficile pour les musiciens émergents de poursuivre leur carrière. Taylor Swift a notoirement retiré sa musique de Spotify de 2014 à 2017, protestant contre l'économie du streaming avant de finalement revenir.\n\nLe streaming de podcasts est passé d'un média de niche à une catégorie de contenu majeure attirant des milliards d'investissements. Spotify a acquis les sociétés de podcasts Gimlet Media et Anchor en février 2019 pour environ 340 millions de dollars au total. Apple, qui a popularisé les podcasts grâce à l'intégration d'iTunes à partir de 2005, est confrontée à une concurrence accrue de la part de Spotify et d'Amazon. Plus de 2 millions de podcasts avec plus de 48 millions d'épisodes existaient en 2023.\n\nLes guerres du streaming se sont intensifiées à mesure que les entreprises de médias traditionnels lançaient des services concurrents. HBO Max, Paramount Plus, Peacock et Apple TV Plus sont tous entrés sur le marché entre 2019 et 2020. Cette fragmentation oblige les consommateurs à s'abonner à plusieurs services pour accéder à tout le contenu souhaité, recréant ironiquement certains des inconvénients des offres groupées de télévision par câble que le streaming avait initialement promis d'éliminer. Les analystes du secteur prévoient une consolidation à mesure que les petits services peinent à rivaliser.\n\nL'expansion internationale présente à la fois des opportunités et des défis pour les plateformes de streaming. Netflix est présent dans plus de 190 pays et produit du contenu dans des dizaines de langues. La série coréenne Squid Game est devenue l'émission la plus regardée de tous les temps sur Netflix en septembre 2021, démontrant l'appétit mondial pour le contenu non anglophone. Les concurrents locaux, notamment Hotstar en Inde, iQiyi en Chine et Globoplay au Brésil, conservent des positions fortes sur leurs marchés nationaux.\n\nLes préoccupations réglementaires entourant les services de streaming se multiplient à mesure qu'ils deviennent des plateformes de divertissement dominantes. Les questions relatives à la confidentialité des données, à la modération du contenu, aux pratiques de travail et à la concentration du marché attirent l'attention des décideurs politiques. L'Union européenne exige des services de streaming qu'ils s'assurent que 30 % de leurs catalogues soient constitués d'œuvres européennes. Certains pays imposent des taxes sur les abonnements de streaming pour financer la production de contenu local.\n\nL'avenir du streaming s'oriente vers une plus grande interactivité, immersion et personnalisation. Les services de cloud gaming de Microsoft, Sony et autres diffusent des jeux vidéo sans nécessiter de matériel coûteux. Les expériences de réalité virtuelle pourraient éventuellement être diffusées en streaming sur des casques légers. Les algorithmes d'intelligence artificielle continueront d'affiner les recommandations et de potentiellement générer du contenu personnalisé. Quelles que soient les technologies spécifiques qui émergeront, le streaming a définitivement transformé la relation entre les créateurs et les publics du monde entier.",
    "wordCount": 1717,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Quand Netflix a-t-il lancé son service de vidéo en streaming ?",
        "options": [
          "Janvier 2005",
          "Janvier 2007",
          "Janvier 2009",
          "Janvier 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Quelles entreprises ont fondé des plateformes de streaming majeures ? Sélectionnez toutes les réponses pertinentes.",
        "options": [
          "Chad Hurley a cofondé YouTube",
          "Reed Hastings a cofondé Netflix",
          "Daniel Ek a cofondé Spotify",
          "Bill Gates a fondé Disney Plus"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p08-q3",
        "type": "true_false",
        "question": "Google a acquis YouTube pour 1,65 milliard de dollars en octobre 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Combien de millions d'abonnés Spotify a-t-il déclaré avoir en tant qu'abonnés payants en décembre 2023 ?",
        "correctValue": 236,
        "tolerance": 20,
        "min": 150,
        "max": 350,
        "step": 5,
        "unit": "million subscribers"
      },
      {
        "id": "technology-internet-p08-q5",
        "type": "single_choice",
        "question": "Quand la première vidéo YouTube a-t-elle été mise en ligne ?",
        "options": [
          "14 février 2005",
          "23 avril 2005",
          "4 juillet 2005",
          "9 octobre 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Combien d'abonnés Disney Plus a-t-il attiré lors de son premier jour ?",
        "options": [
          "1 million",
          "5 millions",
          "10 millions",
          "20 millions"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Combien Amazon a-t-il payé pour acquérir Twitch en 2014 (en millions de dollars) ?",
        "correctValue": 970,
        "tolerance": 50,
        "min": 500,
        "max": 1500,
        "step": 10,
        "unit": "million dollars"
      },
      {
        "id": "technology-internet-p08-q8",
        "type": "true_false",
        "question": "Netflix a commencé comme un service de location de DVD par courrier en 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Quelle série originale de Netflix est sortie en février 2013 ?",
        "options": [
          "Stranger Things",
          "House of Cards",
          "Orange Is the New Black",
          "The Crown"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q10",
        "type": "numeric",
        "question": "Quel pourcentage du trafic internet en Amérique du Nord représente le streaming vidéo pendant les heures de pointe ?",
        "correctValue": 60,
        "tolerance": 10,
        "min": 30,
        "max": 90,
        "step": 5,
        "unit": "percent"
      },
      {
        "id": "technology-internet-p08-q11",
        "type": "single_choice",
        "question": "Quelle série coréenne est devenue l'émission la plus regardée de Netflix en septembre 2021 ?",
        "options": [
          "Crash Landing on You",
          "Kingdom",
          "Squid Game",
          "All of Us Are Dead"
        ],
        "correctIndex": 2
      }
    ],
    "articleType": "practice",
    "orderIndex": 8
  },
  {
    "id": "technology-internet-p09",
    "topicId": "technology-internet",
    "title": "La science des moteurs de recherche",
    "content": "Les moteurs de recherche sont devenus les principaux portails par lesquels l'humanité accède à l'immense réservoir d'informations sur Internet, traitant quotidiennement des milliards de requêtes et façonnant la façon dont les gens découvrent, évaluent et comprennent le monde qui les entoure. Les algorithmes sophistiqués qui alimentent ces systèmes représentent certains des logiciels les plus complexes jamais développés, combinant des techniques de recherche d'informations, de traitement du langage naturel, d'apprentissage automatique et d'informatique distribuée. Comprendre comment fonctionnent les moteurs de recherche révèle à la fois leurs remarquables capacités et leur profonde influence sur la connaissance et le comportement humains.\n\nLes origines de la recherche sur le web remontent au début des années 1990, lorsque l'internet devenait trop vaste pour les annuaires gérés manuellement. Archie, créé par Alan Emtage à l'Université McGill de Montréal en 1990, indexait les noms de fichiers sur les serveurs FTP, mais ne recherchait pas les pages web. Le World Wide Web Wanderer, développé par Matthew Gray au MIT en 1993, est devenu le premier robot d'exploration du web, mesurant la croissance de l'internet en visitant automatiquement les pages. Ces outils primitifs ont jeté les bases de systèmes plus sophistiqués.\n\nAltaVista a été lancé en décembre 1995 et est rapidement devenu le moteur de recherche dominant de son époque. Développé par des chercheurs de Digital Equipment Corporation à Palo Alto, en Californie, AltaVista pouvait effectuer des recherches dans une base de données de 20 millions de pages web en utilisant l'indexation en texte intégral. Les utilisateurs s'émerveillaient de voir des résultats apparaître en quelques secondes pour des requêtes portant sur des millions de documents. À son apogée en 1997, AltaVista traitait 80 millions de requêtes de recherche par jour.\n\nLarry Page et Sergey Brin ont créé Google en tant que projet de recherche de l'Université Stanford en 1996, introduisant l'algorithme PageRank qui allait transformer la recherche. Leur intuition était que les liens entre les pages web contenaient des informations précieuses sur la pertinence et l'autorité. Une page liée par de nombreuses autres pages, en particulier des pages importantes, devrait être mieux classée qu'une page avec peu de liens. Cette approche a produit des résultats nettement meilleurs que ceux des concurrents qui classaient les pages principalement en fonction de la fréquence des mots clés.\n\nPageRank simule un internaute aléatoire qui clique sur des liens au hasard et saute occasionnellement vers une page complètement aléatoire. La probabilité que cet internaute hypothétique visite une page particulière devient son score PageRank. Les pages qui reçoivent de nombreux liens provenant de pages à PageRank élevé accumulent elles-mêmes des scores plus élevés. Ce modèle mathématique, détaillé dans l'article de 1998 de Page et Brin publié alors qu'ils étaient doctorants, reste fondamental pour le classement de Google malgré de nombreux perfectionnements ultérieurs.\n\nLe processus d'exploration du web commence par une liste d'URL connues que des programmes automatisés appelés robots ou crawlers visitent. Le crawler télécharge le contenu de chaque page et extrait tous les hyperliens qu'elle contient. Les nouvelles URL sont ajoutées à la file d'attente pour une exploration future. Le crawler de Google, initialement nommé BackRub et plus tard Googlebot, visite des milliards de pages en continu, en donnant la priorité aux sites fréquemment mis à jour et à ceux qui ont de nombreux liens entrants. Une exploration complète du web prend des semaines, bien que les pages populaires soient réexplorées beaucoup plus fréquemment.\n\nL'indexation transforme le contenu brut des pages web en données structurées qui permettent une récupération rapide. Les moteurs de recherche construisent des index inversés qui associent chaque mot à la liste des documents qui le contiennent. Lorsque vous recherchez un terme, le moteur recherche la liste de diffusion de ce terme plutôt que de scanner chaque document. Des structures de données supplémentaires stockent des informations sur les positions des mots pour la correspondance des expressions, le texte d'ancrage des liens entrants et les métadonnées telles que les titres de page et les dates de modification.\n\nLe traitement des requêtes interprète ce que les utilisateurs veulent réellement lorsqu'ils saisissent des termes de recherche. La compréhension du langage naturel aide les moteurs de recherche à reconnaître qu'une recherche de chaussures de course est susceptible de rechercher des produits plutôt que des informations sur les chaussures qui courent. La reconnaissance d'entités identifie les recherches de personnes, de lieux, d'organisations et de concepts. L'expansion des requêtes ajoute des synonymes et des termes connexes pour améliorer le rappel. La correction orthographique corrige les fautes de frappe avant d'exécuter les recherches, Google corrigeant environ 10 % de toutes les requêtes.\n\nLes algorithmes de classement combinent des centaines de signaux pour déterminer quelles pages répondent le mieux à chaque requête. Au-delà du PageRank, Google prend en compte des facteurs tels que la présence de mots clés dans les titres et les en-têtes, la fraîcheur du contenu, la compatibilité avec les appareils mobiles, la vitesse de chargement des pages et la pertinence géographique. Les modèles d'apprentissage automatique entraînés sur de vastes ensembles de données de comportement des utilisateurs ont largement remplacé les formules de classement élaborées manuellement. RankBrain, introduit en 2015, utilise des réseaux neuronaux pour interpréter les requêtes ambiguës et identifier les résultats pertinents.\n\nLe comportement des utilisateurs fournit des informations cruciales que les moteurs de recherche utilisent pour améliorer les classements. Les taux de clics indiquent quels résultats les utilisateurs trouvent prometteurs. Le temps passé sur les pages après avoir cliqué suggère si les résultats ont satisfait la requête. Le fait de revenir aux résultats de recherche et de cliquer sur différents liens, appelé pogo-sticking, indique que les premiers résultats n'étaient pas utiles. Les moteurs de recherche analysent des milliards de ces signaux quotidiennement pour affiner leurs algorithmes.\n\nLes graphes de connaissances représentent des informations sur les entités et leurs relations dans des bases de données structurées. Le Knowledge Graph de Google, introduit en mai 2012, contient des milliards de faits sur les personnes, les lieux, les choses et les concepts. Lorsque vous recherchez une personne célèbre, le panneau de connaissances qui apparaît à côté des résultats est extrait de ces données structurées. Wikidata, une base de connaissances collaborative exploitée par la Wikimedia Foundation, contribue de manière substantielle à ces systèmes.\n\nLes extraits optimisés et les réponses directes visent à satisfaire les requêtes sans obliger les utilisateurs à cliquer sur des sites web. Google extrait des passages pertinents des pages web et les affiche bien en évidence pour les questions. Les assistants vocaux s'appuient fortement sur ces réponses directes, car les utilisateurs ne peuvent pas cliquer sur des liens sur les appareils audio uniquement. Les éditeurs débattent de la question de savoir si les extraits optimisés sont utiles en stimulant le trafic ou nuisibles en le réduisant, certains choisissant de se retirer complètement de la sélection des extraits.\n\nLa recherche locale relie les requêtes aux entreprises et aux services à proximité. Lorsque quelqu'un recherche des cafés ou des plombiers, le moteur de recherche intègre sa localisation pour afficher des options locales pertinentes. Les profils Google My Business permettent aux entreprises de fournir des informations directement. Les avis agrégés provenant de diverses sources aident les utilisateurs à choisir entre les options. La recherche locale génère des revenus substantiels grâce à la publicité, les entreprises payant pour apparaître en évidence pour les requêtes commerciales.\n\nLa publicité sur les moteurs de recherche a transformé Google en l'une des entreprises les plus importantes au monde. Les annonceurs enchérissent sur des mots clés, ne payant que lorsque les utilisateurs cliquent sur leurs annonces. Le système d'enchères de Google prend en compte à la fois les montants des enchères et la qualité des annonces pour déterminer quelles annonces apparaissent et dans quel ordre. La publicité sur les moteurs de recherche a généré plus de 162 milliards de dollars de revenus pour Alphabet, la société mère de Google, en 2022. Ce modèle économique crée des incitations à maximiser l'engagement des utilisateurs avec les résultats de recherche.\n\nLe spam et la manipulation ont sévi sur les moteurs de recherche depuis leurs débuts. Des opérateurs de sites web peu scrupuleux remplissent les pages de mots clés cachés, créent des réseaux de liens artificiels et utilisent d'innombrables autres tactiques pour truquer les classements. Les moteurs de recherche se livrent à une course aux armements continue contre ces manipulations. La mise à jour Penguin de Google en avril 2012 a pénalisé les sites présentant des schémas de liens non naturels. L'entreprise emploie des milliers d'évaluateurs de qualité qui évaluent les résultats de recherche selon des directives détaillées.\n\nLes préoccupations relatives à la vie privée entourent les vastes données que les moteurs de recherche collectent sur les requêtes et le comportement des utilisateurs. Les historiques de recherche révèlent des problèmes de santé, des situations financières, des problèmes relationnels et d'innombrables autres détails intimes. Google conserve par défaut les données de recherche liées aux comptes, les utilisant pour la personnalisation et le ciblage publicitaire. Des alternatives comme DuckDuckGo se différencient en promettant de ne pas suivre les utilisateurs, bien qu'elles sacrifient certaines capacités de personnalisation.\n\nLa concurrence dans le domaine de la recherche est restée limitée malgré l'examen réglementaire mondial. Google détient environ 91 % de la part de marché mondiale de la recherche, selon les données de StatCounter de 2023. Bing, le moteur de recherche de Microsoft, revendique environ 3 % au niveau mondial, mais obtient de meilleurs résultats aux États-Unis. Les alternatives régionales, notamment Baidu en Chine et Yandex en Russie, dominent leurs marchés nationaux. L'Union européenne a infligé à Google une amende de 2,42 milliards d'euros en juin 2017 pour avoir favorisé son propre service de comparaison de prix dans les résultats de recherche.\n\nL'intelligence artificielle transforme la recherche grâce à de grands modèles de langage qui comprennent et génèrent le langage naturel. La sortie de ChatGPT en novembre 2022 a suscité des inquiétudes quant à la possibilité que l'IA conversationnelle perturbe la recherche traditionnelle. Microsoft a intégré GPT-4 dans Bing en février 2023. Google a répondu avec Bard, puis Gemini. Ces systèmes peuvent synthétiser des informations provenant de sources multiples et engager un dialogue, ce qui pourrait modifier la façon dont les gens trouvent des informations en ligne.\n\nL'avenir de la recherche s'étend au-delà des requêtes textuelles pour englober les images, la voix et les entrées multimodales. Google Lens permet d'effectuer des recherches à l'aide d'appareils photo de smartphones, d'identifier des objets, de traduire du texte et de résoudre des problèmes mathématiques à partir d'images. La recherche vocale via les haut-parleurs intelligents et les smartphones représente une part croissante des requêtes. Les moteurs de recherche doivent s'adapter aux nouveaux appareils et aux nouveaux modes d'interaction tout en conservant la vitesse et la précision que les utilisateurs attendent.",
    "wordCount": 1772,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Qui a créé le premier robot d'indexation web appelé World Wide Web Wanderer en 1993 ?",
        "options": [
          "Alan Emtage",
          "Matthew Gray",
          "Larry Page",
          "Sergey Brin"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q2",
        "type": "multiple_select",
        "question": "Quels facteurs les moteurs de recherche prennent-ils en compte pour classer les pages ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Analyse de liens PageRank",
          "Fraîcheur du contenu",
          "Vitesse de chargement de la page",
          "Taille du fichier uniquement"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p09-q3",
        "type": "true_false",
        "question": "AltaVista traitait 80 millions de requêtes de recherche par jour à son apogée en 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Quel pourcentage de la part de marché mondial de la recherche Google détient-il selon les données de 2023 ?",
        "correctValue": 91,
        "tolerance": 3,
        "min": 75,
        "max": 100,
        "step": 1,
        "unit": "percent"
      },
      {
        "id": "technology-internet-p09-q5",
        "type": "single_choice",
        "question": "Quand le Knowledge Graph de Google a-t-il été introduit ?",
        "options": [
          "Mai 2010",
          "Mai 2012",
          "Mai 2014",
          "Mai 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "Quand la mise à jour Penguin de Google a-t-elle pénalisé les sites avec des schémas de liens non naturels ?",
        "options": [
          "Avril 2010",
          "Avril 2012",
          "Avril 2014",
          "Avril 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Combien de revenus la publicité par recherche a-t-elle généré pour Alphabet en 2022 (en milliards de dollars) ?",
        "correctValue": 162,
        "tolerance": 15,
        "min": 100,
        "max": 250,
        "step": 5,
        "unit": "billion dollars"
      },
      {
        "id": "technology-internet-p09-q8",
        "type": "true_false",
        "question": "Google corrige environ 10 % de toutes les requêtes de recherche pour les fautes d'orthographe.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Quand Microsoft a-t-il intégré GPT-4 dans Bing ?",
        "options": [
          "Novembre 2022",
          "Février 2023",
          "Juin 2023",
          "Octobre 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Combien l'Union européenne a-t-elle infligé d'amende à Google en juin 2017 (en milliards d'euros) ?",
        "correctValue": 2.42,
        "tolerance": 0.2,
        "min": 1,
        "max": 5,
        "step": 0.1,
        "unit": "billion euros"
      },
      {
        "id": "technology-internet-p09-q11",
        "type": "single_choice",
        "question": "Quand RankBrain a-t-il été introduit par Google ?",
        "options": [
          "2013",
          "2015",
          "2017",
          "2019"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q12",
        "type": "single_choice",
        "question": "Quand AltaVista a-t-il été lancé ?",
        "options": [
          "Décembre 1993",
          "Décembre 1995",
          "Décembre 1997",
          "Décembre 1999"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 9
  },
  {
    "id": "technology-internet-p10",
    "topicId": "technology-internet",
    "title": "Véhicules Autonomes et l'Avenir des Transports",
    "content": "Les véhicules autonomes promettent de révolutionner les transports grâce à une technologie de conduite autonome qui pourrait réduire les accidents, transformer les paysages urbains et modifier fondamentalement la façon dont l'humanité déplace les personnes et les biens sur de courtes et longues distances. Cette vision ambitieuse a attiré des centaines de milliards de dollars d'investissements de la part des constructeurs automobiles, des géants de la technologie et des startups qui se livrent une course effrénée pour résoudre les immenses défis techniques, réglementaires et sociaux impliqués. Le chemin vers des véhicules véritablement autonomes révèle l'état actuel de cette technologie transformatrice et les obstacles qui restent à surmonter avant que les voitures autonomes ne deviennent monnaie courante.\n\nLe rêve des véhicules autonomes est antérieur à l'ordinateur numérique lui-même. Norman Bel Geddes a présenté l'exposition Futurama à l'Exposition Universelle de New York en 1939, dépeignant des autoroutes automatisées où les voitures circuleraient en toute sécurité sans intervention humaine d'ici les années 1960. General Motors, qui a parrainé l'exposition, s'est ensuite associée à RCA pour développer le concept-car Firebird IV en 1964, doté de systèmes de guidage électroniques capables de suivre des câbles enfouis dans les chaussées. Ces premières visions nécessitaient des modifications de l'infrastructure plutôt que de l'intelligence du véhicule.\n\nLe développement moderne des véhicules autonomes a commencé avec les concours DARPA Grand Challenge, qui ont catalysé la recherche universitaire et industrielle à partir de 2004. Le premier défi, organisé dans le désert de Mojave, offrait un million de dollars à tout véhicule capable de parcourir un parcours de 241 kilomètres (150 miles) sans intervention humaine. Tous les participants ont échoué, le véhicule le plus éloigné n'ayant parcouru que 11,9 kilomètres (7,4 miles) avant de s'enliser. Le défi de 2005 a vu cinq véhicules terminer le parcours, Stanley de l'université de Stanford remportant la victoire en 6 heures et 53 minutes.\n\nLa Society of Automotive Engineers définit six niveaux d'automatisation de la conduite qui sont devenus une norme industrielle. Le niveau 0 signifie qu'il n'y a pas d'automatisation, les humains contrôlant toutes les tâches de conduite. Le niveau 1 comprend une assistance de base comme le régulateur de vitesse adaptatif. Le niveau 2 combine plusieurs fonctions d'assistance mais nécessite une supervision humaine constante. Le niveau 3 permet au véhicule de gérer toute la conduite dans des conditions limitées, tandis que les humains restent prêts à intervenir. Le niveau 4 permet une automatisation complète dans des domaines opérationnels définis. Le niveau 5 signifie une automatisation complète dans toutes les conditions, égalant ou dépassant les capacités humaines partout.\n\nLes systèmes de capteurs fournissent aux véhicules autonomes les capacités de perception nécessaires à une navigation sûre. Les caméras capturent des informations visuelles sur les voies, les panneaux, les feux de signalisation et les autres usagers de la route. Le radar mesure la vitesse et la distance des objets proches grâce à des ondes radio qui fonctionnent quelles que soient les conditions d'éclairage ou météorologiques. Le lidar utilise des impulsions laser pour créer des cartes tridimensionnelles détaillées de l'environnement, certains systèmes générant plus de deux millions de points de données par seconde. Les capteurs à ultrasons détectent les obstacles à courte portée lors des manœuvres de stationnement.\n\nWaymo, la filiale de véhicules autonomes d'Alphabet, est issue du projet de voiture autonome de Google qui a débuté en 2009. Sebastian Thrun, qui a dirigé l'équipe gagnante de Stanford au DARPA, a dirigé la recherche initiale. Le projet a accumulé des millions de kilomètres d'essais dans plusieurs états avant que Waymo ne lance un service commercial de robotaxis à Phoenix, en Arizona, en décembre 2018. En octobre 2023, les véhicules Waymo avaient parcouru plus de 11,2 millions de kilomètres (7 millions de miles) sur les routes publiques sans conducteurs de sécurité, principalement à Phoenix et à San Francisco.\n\nTesla a adopté une approche différente de l'autonomie grâce à ses systèmes Autopilot et Full Self-Driving. Plutôt que d'utiliser des lidars coûteux, Tesla s'appuie sur des caméras et la vision artificielle, formées à partir des données de millions de véhicules de clients. Le PDG Elon Musk a prédit à plusieurs reprises une autonomie complète imminente, affirmant en 2016 qu'une Tesla se conduirait d'elle-même de Los Angeles à New York d'ici 2017. Cette prédiction et beaucoup d'autres qui ont suivi ne se sont pas réalisées, bien que les véhicules Tesla offrent des fonctions d'assistance à la conduite de plus en plus performantes.\n\nCruise, détenue majoritairement par General Motors, exploitait des services de robotaxis à San Francisco jusqu'à ce que le California Department of Motor Vehicles révoque ses permis en octobre 2023 à la suite d'un incident où un véhicule a heurté et traîné un piéton. L'entreprise s'était développée de manière agressive, exploitant des centaines de véhicules dans plusieurs villes. La révocation du permis a mis en évidence les défis réglementaires auxquels l'industrie est confrontée et la difficulté d'assurer la sécurité à grande échelle.\n\nLes entreprises chinoises sont devenues des acteurs majeurs dans le développement des véhicules autonomes. La plateforme Apollo de Baidu a commencé son développement en 2017 et a accumulé plus de 100 millions de kilomètres d'essais routiers. Pony.ai, fondée en 2016, exploite des services de robotaxis dans plusieurs villes chinoises et en Californie. WeRide s'est associée à Nissan et a établi des opérations au Moyen-Orient. Les villes chinoises, notamment Wuhan, Guangzhou et Shenzhen, ont autorisé des opérations commerciales de robotaxis couvrant d'importantes zones urbaines.\n\nLes systèmes d'intelligence artificielle qui pilotent les véhicules autonomes doivent gérer une complexité extraordinaire. Les algorithmes de vision artificielle identifient et classifient des milliers de types d'objets, des piétons et cyclistes aux zones de construction et aux véhicules d'urgence. Les modèles de prédiction anticipent la façon dont les autres usagers de la route se comporteront dans les prochaines secondes. Les algorithmes de planification choisissent des trajectoires qui atteignent les destinations en toute sécurité et efficacité. Tous ces calculs doivent s'exécuter en millisecondes tout en tenant compte de l'incertitude et des scénarios rares.\n\nLes cas limites présentent des défis particuliers pour les systèmes autonomes. Un sac en plastique qui traverse une autoroute et un enfant qui court dans la rue peuvent apparaître similaires aux capteurs, mais nécessitent des réponses complètement différentes. Les ouvriers du bâtiment qui dirigent la circulation avec des gestes de la main outrepassent les règles de circulation normales. Les véhicules d'urgence qui approchent sous des angles masqués exigent une action immédiate. Les données d'entraînement ne peuvent pas couvrir tous les scénarios possibles, ce qui oblige les véhicules à généraliser de manière appropriée à partir d'expériences similaires.\n\nLa validation de la sécurité pose des questions fondamentales sur la façon de démontrer que les véhicules autonomes sont prêts à être déployés. Les conducteurs humains ont en moyenne un accident mortel pour environ 160 millions de kilomètres (100 millions de miles) parcourus aux États-Unis. Prouver statistiquement qu'un système autonome atteint ou dépasse cette référence nécessiterait des milliards de kilomètres d'essais, une norme impraticable. Les entreprises utilisent plutôt la simulation, les essais sur circuit fermé et le déploiement progressif tout en surveillant en permanence les performances en conditions réelles.\n\nLes cadres réglementaires pour les véhicules autonomes varient considérablement d'une juridiction à l'autre. La Californie exige que les entreprises signalent les désengagements lorsque les conducteurs de sécurité humains prennent le contrôle. L'Arizona a adopté une approche permissive qui a attiré les activités d'essais. L'Allemagne a adopté une loi en 2021 autorisant les véhicules de niveau 4 sur les routes publiques dans des conditions spécifiques. La Chine a désigné certaines villes comme zones d'essais avec des domaines opérationnels qui s'étendent progressivement. Ce patchwork de réglementations complique les stratégies de déploiement internationales.\n\nLes avantages potentiels des véhicules autonomes vont bien au-delà de la commodité. Les accidents de la route tuent environ 1,35 million de personnes dans le monde chaque année, l'erreur humaine contribuant à plus de 90 % des accidents. Les systèmes autonomes ne sont pas distraits, fatigués ou affaiblis. Ils pourraient réduire considérablement ce bilan si leurs performances en matière de sécurité dépassent celles des conducteurs humains. Le transport deviendrait accessible aux personnes âgées, handicapées et aux jeunes populations actuellement incapables de conduire elles-mêmes.\n\nLes implications économiques du transport autonome pourraient remodeler des secteurs entiers. Les chauffeurs professionnels, notamment les camionneurs, les chauffeurs de taxi et les livreurs, sont confrontés à un risque potentiel de déplacement. Les entreprises de covoiturage comme Uber et Lyft investissent massivement dans l'autonomie dans l'espoir d'éliminer leur coût le plus important. Les modèles d'assurance doivent s'adapter lorsque les conducteurs humains ne contrôlent plus les véhicules. Les urbanistes envisagent des villes avec moins de parkings et des routes plus étroites, car les véhicules autonomes partagés réduisent le nombre total de véhicules.\n\nLes applications de transport par camion pourraient atteindre la viabilité commerciale avant les robotaxis de passagers en raison d'environnements autoroutiers plus prévisibles. Aurora, cofondée par d'anciens dirigeants des programmes autonomes de Google, Tesla et Uber, se concentre principalement sur le fret. TuSimple a effectué des trajets entièrement autonomes sur autoroute entre Phoenix et Dallas avant que des difficultés financières n'entraînent une restructuration stratégique en 2023. Embark, Kodiak et de nombreuses autres entreprises poursuivent des applications similaires de transport routier longue distance.\n\nLe calendrier de l'adoption généralisée des véhicules autonomes reste très incertain malgré des décennies de développement et des investissements massifs. Les projections optimistes du milieu des années 2010 prédisaient des robotaxis omniprésents au début des années 2020. La réalité s'est avérée beaucoup plus difficile que prévu. Les experts du secteur s'attendent désormais généralement à un déploiement progressif sur des décennies plutôt qu'à une transformation soudaine. La technologie s'améliorera probablement de manière incrémentale, passant de domaines opérationnels limités à des capacités plus larges sur de nombreuses années.",
    "wordCount": 1602,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Quand a eu lieu le premier DARPA Grand Challenge ?",
        "options": [
          "2002",
          "2004",
          "2006",
          "2008"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q2",
        "type": "multiple_select",
        "question": "Quels types de capteurs les véhicules autonomes utilisent-ils ? Sélectionnez toutes les réponses applicables.",
        "options": [
          "Caméras",
          "Radar",
          "Lidar",
          "Capteurs à rayons X"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      },
      {
        "id": "technology-internet-p10-q3",
        "type": "true_false",
        "question": "Le véhicule de l'université de Stanford nommé Stanley a remporté le DARPA Grand Challenge 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Combien de millions de kilomètres les véhicules Waymo avaient-ils parcourus sans conducteurs de sécurité en octobre 2023 (en millions) ?",
        "correctValue": 7,
        "tolerance": 1,
        "min": 3,
        "max": 15,
        "step": 1,
        "unit": "million miles"
      },
      {
        "id": "technology-internet-p10-q5",
        "type": "single_choice",
        "question": "Quand Waymo a-t-il lancé son service commercial de robotaxis à Phoenix ?",
        "options": [
          "Décembre 2016",
          "Décembre 2018",
          "Décembre 2020",
          "Décembre 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Combien de niveaux d'automatisation de la conduite la Society of Automotive Engineers définit-elle ?",
        "options": [
          "Quatre",
          "Cinq",
          "Six",
          "Sept"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Combien de personnes meurent chaque année dans des accidents de voiture dans le monde (en millions) ?",
        "correctValue": 1.35,
        "tolerance": 0.2,
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "unit": "million people"
      },
      {
        "id": "technology-internet-p10-q8",
        "type": "true_false",
        "question": "L'erreur humaine contribue à plus de 90 % des accidents de voiture.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Quand l'Allemagne a-t-elle adopté une loi autorisant les véhicules de niveau 4 sur les routes publiques ?",
        "options": [
          "2019",
          "2021",
          "2023",
          "2024"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q10",
        "type": "numeric",
        "question": "Combien de kilomètres le véhicule le plus éloigné a-t-il parcouru lors du DARPA Grand Challenge 2004 ?",
        "correctValue": 7.4,
        "tolerance": 1,
        "min": 2,
        "max": 20,
        "step": 0.5,
        "unit": "miles"
      },
      {
        "id": "technology-internet-p10-q11",
        "type": "single_choice",
        "question": "Quand le développement de la plateforme de conduite autonome Apollo de Baidu a-t-il commencé ?",
        "options": [
          "2015",
          "2017",
          "2019",
          "2021"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q12",
        "type": "single_choice",
        "question": "Quand a eu lieu l'exposition Futurama à la Foire mondiale ?",
        "options": [
          "1929",
          "1939",
          "1949",
          "1959"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q13",
        "type": "numeric",
        "question": "Combien de points de données par seconde certains systèmes lidar peuvent-ils générer (en millions) ?",
        "correctValue": 2,
        "tolerance": 0.5,
        "min": 0.5,
        "max": 5,
        "step": 0.5,
        "unit": "million points"
      },
      {
        "id": "technology-internet-p10-q14",
        "type": "single_choice",
        "question": "Quand le DMV californien a-t-il révoqué les permis de véhicules autonomes de Cruise ?",
        "options": [
          "Octobre 2022",
          "Octobre 2023",
          "Janvier 2023",
          "Juin 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
