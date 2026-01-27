import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Come Funziona Internet",
    "content": "Internet connette miliardi di dispositivi in tutto il mondo attraverso una complessa rete di reti che si estende su ogni continente della Terra. Ogni volta che visiti un sito web, invii un'email o guardi un video in streaming, i dati viaggiano attraverso questa vasta infrastruttura digitale in pochi millisecondi. Comprendere questo straordinario sistema ci aiuta ad apprezzare la tecnologia che ha trasformato la comunicazione moderna.\n\nQuando digiti un indirizzo web nel tuo browser, inizia immediatamente un processo complesso. Il tuo computer contatta innanzitutto un server DNS (Domain Name System), che traduce l'indirizzo leggibile dall'uomo in un indirizzo IP numerico che i computer comprendono. Questo funziona in modo simile alla ricerca di un numero di telefono in un elenco, abbinando i nomi alle informazioni di contatto reali.\n\nLa tua richiesta viaggia quindi attraverso il tuo provider di servizi Internet verso le reti dorsali che formano l'infrastruttura principale di Internet. Questi cavi in fibra ottica ad alta capacità attraversano continenti e oceani a profondità superiori a 6.000 metri. Trasportano enormi quantità di dati quasi alla velocità della luce, gestendo oltre 500 trilioni di byte di informazioni al giorno.\n\nI dati non viaggiano come un'unica unità attraverso Internet. Invece, si suddividono in piccoli pacchetti, ciascuno contenente parte delle informazioni più i dettagli dell'indirizzo. Questi pacchetti possono intraprendere percorsi diversi per raggiungere la loro destinazione, trovando percorsi alternativi in caso di congestione o guasti. A destinazione, si riassemblano nell'ordine corretto per ricreare il messaggio originale.\n\nI router fungono da controllori del traffico di Internet, prendendo decisioni critiche in ogni momento. Questi dispositivi specializzati esaminano la destinazione di ogni pacchetto e determinano il percorso migliore da seguire. Prendono queste decisioni di instradamento miliardi di volte al secondo, mantenendo i dati che scorrono senza intoppi attraverso reti di proprietà di migliaia di diverse organizzazioni.\n\nInternet è nato come ARPANET nel 1969, un progetto di ricerca militare degli Stati Uniti progettato per sopravvivere alle interruzioni delle comunicazioni durante potenziali attacchi. Vint Cerf e Bob Kahn hanno sviluppato i protocolli TCP/IP negli anni '70, creando le basi tecniche che ancora oggi sono alla base di Internet. La loro progettazione decentralizzata garantisce che nessun singolo punto di guasto possa far cadere l'intera rete.\n\nTim Berners-Lee ha inventato il World Wide Web nel 1989 mentre lavorava al CERN in Svizzera. Ha creato il sistema di collegamenti ipertestuali e browser web che ha reso Internet accessibile a tutti. Il web è diventato pubblicamente disponibile nell'agosto del 1991 e, nel giro di un decennio, Internet si è trasformato da strumento di ricerca a piattaforma di comunicazione globale utilizzata da centinaia di milioni di persone.",
    "wordCount": 432,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Chi ha inventato il World Wide Web?",
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
        "question": "Chi ha sviluppato i protocolli TCP/IP? Seleziona tutte le opzioni applicabili.",
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
        "question": "I dati viaggiano attraverso internet come singoli file completi invece di essere suddivisi in pacchetti.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "In che anno è iniziato ARPANET, il predecessore di Internet?",
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
    "title": "L'Ascesa dell'Intelligenza Artificiale",
    "content": "L'intelligenza artificiale si è evoluta dalla fantasia fantascientifica a una tecnologia pratica che influenza quasi ogni aspetto della vita moderna. Dagli assistenti degli smartphone ai sistemi di diagnosi medica, l'IA ora svolge compiti che un tempo richiedevano intelligenza umana. Questa trasformazione rappresenta uno dei cambiamenti tecnologici più significativi dall'invenzione dell'informatica stessa.\n\nIl concetto di intelligenza artificiale è emerso durante un workshop tenutosi al Dartmouth College nel New Hampshire nell'estate del 1956. L'informatico John McCarthy coniò il termine e riunì ricercatori che credevano che le macchine potessero essere create per simulare l'intelligenza umana. Questi pionieri immaginavano di creare macchine pensanti nel giro di una sola generazione, anche se i progressi si sono rivelati molto più lenti delle loro ottimistiche previsioni.\n\nLa prima ricerca sull'IA si concentrò sul ragionamento simbolico, programmando i computer con regole esplicite su come risolvere i problemi. I ricercatori crearono sistemi esperti che codificavano la conoscenza umana in alberi decisionali e regole logiche. Questi sistemi ottennero risultati impressionanti in ambiti ristretti come gli scacchi e la diagnosi medica, ma faticarono con compiti che richiedevano buon senso o la gestione di informazioni ambigue.\n\nLa rivoluzione del machine learning ha iniziato a trasformare l'IA negli anni '90 e ha accelerato notevolmente dopo il 2010. Invece di programmare regole esplicite, i ricercatori hanno addestrato algoritmi per scoprire modelli in grandi dataset. Le reti neurali, vagamente ispirate alle strutture cerebrali biologiche, si sono dimostrate particolarmente potenti nel riconoscere immagini, comprendere il linguaggio e generare testo simile a quello umano.\n\nIl deep learning è emerso come l'approccio dominante all'IA dopo una svolta nel 2012. Geoffrey Hinton e i suoi studenti all'Università di Toronto hanno dimostrato che le reti neurali profonde con molti strati potevano sovraperformare drasticamente i metodi precedenti nei compiti di riconoscimento delle immagini. Il loro sistema ha ridotto i tassi di errore di oltre il 40 percento rispetto ai migliori approcci precedenti.\n\nL'addestramento dei moderni sistemi di IA richiede enormi risorse computazionali e vaste quantità di dati. I grandi modelli linguistici possono contenere centinaia di miliardi di parametri e richiedere migliaia di processori specializzati che lavorano per mesi. Aziende tecnologiche come Google, Microsoft e OpenAI hanno investito miliardi di dollari nella costruzione dell'infrastruttura necessaria per addestrare questi sistemi sempre più capaci.\n\nLe capacità dei sistemi di IA si sono espanse notevolmente negli ultimi anni. I sistemi di visione artificiale ora possono identificare oggetti, volti e attività nelle immagini con una precisione sovrumana. L'elaborazione del linguaggio naturale è avanzata al punto in cui l'IA può impegnarsi in conversazioni sfumate, scrivere saggi coerenti e tradurre tra dozzine di lingue. I sistemi di IA ora compongono musica, generano opere d'arte e scrivono codice informatico.\n\nL'IA alimenta già molti servizi che le persone usano quotidianamente senza consapevolezza cosciente. Gli algoritmi di raccomandazione suggeriscono video su YouTube e prodotti su Amazon in base alle preferenze apprese. I filtri email utilizzano il machine learning per separare i messaggi importanti dallo spam. Le app di navigazione prevedono i modelli di traffico e suggeriscono percorsi ottimali. Gli assistenti vocali come Siri e Alexa usano l'IA per capire i comandi vocali.\n\nL'assistenza sanitaria rappresenta una delle applicazioni più promettenti per l'intelligenza artificiale. I sistemi di IA possono analizzare le immagini mediche per rilevare il cancro più precocemente rispetto ai radiologi umani in alcuni casi. La scoperta di farmaci utilizza il machine learning per identificare composti promettenti e prevedere i loro effetti. Gli assistenti di IA aiutano i medici a rimanere aggiornati con la letteratura medica in rapida espansione e suggeriscono opzioni di trattamento basate sull'evidenza.\n\nLe preoccupazioni per la sicurezza dell'IA e l'impatto sociale sono cresciute insieme alle sue capacità. I ricercatori si preoccupano dei sistemi che perseguono obiettivi in modi inaspettati o dannosi. Gli esperti di etica sollevano questioni sui pregiudizi nei sistemi di IA addestrati su dati storici che riflettono i pregiudizi umani. Gli economisti discutono di come l'automazione influenzerà l'occupazione man mano che l'IA assume compiti precedentemente svolti da lavoratori umani.\n\nI governi di tutto il mondo hanno iniziato a sviluppare regolamenti per l'intelligenza artificiale. L'Unione Europea ha approvato una legislazione completa sull'IA nel 2024 che categorizza i sistemi in base al livello di rischio e impone requisiti alle applicazioni ad alto rischio. La Cina ha implementato regole che disciplinano gli algoritmi di raccomandazione e l'IA generativa. Gli Stati Uniti hanno emesso ordini esecutivi che affrontano la sicurezza dell'IA mentre si discute una legislazione più completa.\n\nIl futuro dell'intelligenza artificiale rimane incerto, ma sembra probabile che porti a un continuo e rapido progresso. I ricercatori perseguono un'intelligenza artificiale generale che potrebbe eguagliare la capacità umana in tutti i compiti cognitivi, anche se le stime di quando ciò potrebbe accadere variano da anni a mai. Ciò che sembra certo è che l'IA continuerà a rimodellare le industrie, creando nuove possibilità e sollevando profonde questioni sul rapporto tra intelligenza umana e artificiale.\n\nComprendere l'intelligenza artificiale è diventata una conoscenza essenziale per navigare nel mondo moderno. Che si tratti di utenti, lavoratori, cittadini o politici, le persone hanno sempre più bisogno di capire cosa l'IA può e non può fare. Questa tecnologia continuerà a evolversi e un impegno informato con il suo sviluppo contribuirà a garantire che l'IA avvantaggi l'umanità in generale.",
    "wordCount": 862,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Dove e quando ha avuto origine il termine \"intelligenza artificiale\"?",
        "options": [
          "MIT nel 1960",
          "Dartmouth College nel 1956",
          "Stanford University nel 1965",
          "Bell Labs nel 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Quali applicazioni dell'IA nel settore sanitario sono menzionate nell'articolo? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Analizzare immagini mediche per rilevare il cancro",
          "Eseguire interventi di chirurgia robotica",
          "Scoperta di farmaci",
          "Suggerire opzioni di trattamento"
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
        "question": "La ricerca iniziale sull'IA si concentrava principalmente sull'apprendimento automatico piuttosto che sul ragionamento simbolico.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "In quale anno Geoffrey Hinton e i suoi studenti hanno dimostrato una svolta nell'apprendimento profondo?",
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
        "question": "Chi ha coniato il termine \"intelligenza artificiale\"?",
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
        "question": "Di quanto le reti neurali profonde hanno ridotto i tassi di errore rispetto ai metodi precedenti nel 2012?",
        "options": [
          "Più del 20 percento",
          "Più del 30 percento",
          "Più del 40 percento",
          "Più del 50 percento"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "In che anno l'Unione Europea ha approvato una legislazione completa sull'IA?",
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
    "title": "Cybersecurity: Proteggere il Mondo Digitale",
    "content": "La cybersecurity protegge computer, reti e dati da attacchi digitali che minacciano miliardi di persone ogni giorno. Gli hacker prendono di mira di tutto, dai conti bancari personali alle infrastrutture critiche come reti elettriche e ospedali. Il settore è cresciuto da una nicchia specialistica a una delle discipline più importanti della tecnologia moderna.\n\nIl primo grande virus informatico, chiamato Brain, apparve in Pakistan nel gennaio 1986. Due fratelli di nome Basit e Amjad Farooq Alvi lo crearono per tracciare le copie illegali del loro software medico. Il virus si diffuse lentamente attraverso floppy disk infetti, impiegando mesi per raggiungere i computer in tutto il mondo. Oggi, il malware si diffonde su Internet in pochi secondi, infettando milioni di dispositivi prima che gli esperti di sicurezza possano rispondere.\n\nGli attacchi di phishing rimangono il metodo più comune utilizzato dai criminali per rubare informazioni sensibili. Queste e-mail ingannevoli fingono di provenire da fonti attendibili come banche, datori di lavoro o siti web popolari. Inducono i destinatari a fare clic su collegamenti dannosi o a inserire password su siti web falsi. L'FBI ha riferito che gli attacchi di phishing hanno causato oltre 10 miliardi di dollari di perdite solo nel 2022.\n\nIl ransomware rappresenta uno dei tipi più distruttivi di attacchi informatici moderni. Questo software dannoso crittografa i file di una vittima e richiede un pagamento per la chiave di decrittazione. L'attacco WannaCry nel maggio 2017 ha infettato più di 200.000 computer in 150 paesi in soli quattro giorni. Gli ospedali nel Regno Unito hanno dovuto cancellare migliaia di appuntamenti medici e dirottare le ambulanze verso strutture non colpite.\n\nPassword complesse costituiscono le fondamenta della cybersecurity personale. Gli esperti di sicurezza raccomandano di utilizzare almeno 12 caratteri combinando lettere maiuscole, lettere minuscole, numeri e simboli. Ogni account dovrebbe avere una password univoca per evitare che una singola violazione comprometta più servizi. I gestori di password aiutano gli utenti a generare e memorizzare password complesse senza memorizzarle a memoria.\n\nL'autenticazione a due fattori aggiunge un secondo livello cruciale di sicurezza oltre le password. Questo sistema richiede qualcosa che si conosce, come una password, più qualcosa che si possiede, come un telefono che riceve codici di verifica. Anche se gli hacker rubano la password, non possono accedere all'account senza il secondo fattore. Google ha riferito che l'autenticazione a due fattori blocca il 99,9% degli attacchi automatizzati sugli account.\n\nLa crittografia trasforma i dati in codice illeggibile che solo le parti autorizzate possono decrittografare. Quando si vede un'icona a forma di lucchetto nella barra degli indirizzi del browser, la crittografia protegge la connessione a quel sito web. La crittografia end-to-end nelle app di messaggistica garantisce che solo tu e il tuo destinatario possiate leggere i tuoi messaggi. Anche la società che fornisce il servizio non può accedere al contenuto crittografato.\n\nGoverni e aziende investono miliardi nella difesa della cybersecurity. La Cybersecurity and Infrastructure Security Agency degli Stati Uniti, nota come CISA, protegge le reti federali e aiuta le aziende private a difendersi dagli attacchi. Le grandi aziende tecnologiche impiegano migliaia di ricercatori sulla sicurezza che vanno a caccia di vulnerabilità e sviluppano misure protettive.\n\nGli hacker etici svolgono un ruolo vitale nel migliorare la sicurezza trovando i punti deboli prima dei criminali. Le aziende pagano taglie che vanno da centinaia a milioni di dollari per segnalazioni di vulnerabilità gravi. Apple ha lanciato il suo programma di bug bounty nel 2016 e ora offre fino a 2 milioni di dollari per le falle di sicurezza più critiche dell'iPhone. Questi programmi trasformano i potenziali aggressori in difensori che rafforzano l'infrastruttura digitale.\n\nIl futuro della cybersecurity deve affrontare nuove sfide derivanti dalle tecnologie emergenti. I computer quantistici potrebbero alla fine violare la crittografia che attualmente protegge il settore bancario, le comunicazioni e i segreti governativi. I ricercatori sulla sicurezza stanno già sviluppando algoritmi resistenti alla quantistica per prepararsi a questa minaccia. L'intelligenza artificiale crea sia nuovi metodi di attacco sia nuove capacità difensive in una continua corsa agli armamenti tecnologica.",
    "wordCount": 661,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Qual era il nome del primo virus informatico di rilievo?",
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
        "question": "Secondo Google, quale percentuale di attacchi automatizzati viene bloccata dall'autenticazione a due fattori?",
        "options": [
          "95%",
          "99%",
          "99.9%",
          "100%"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p02-q3",
        "type": "multiple_select",
        "question": "Quali sono le pratiche consigliate per una password di sicurezza efficace? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Utilizzare almeno 12 caratteri",
          "Utilizzare la stessa password per tutti gli account",
          "Combinare maiuscole, minuscole, numeri e simboli",
          "Utilizzare un password manager"
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
        "question": "L'attacco ransomware WannaCry ha infettato computer in oltre 150 paesi.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "A quanto ammontano le perdite causate dagli attacchi di phishing nel 2022 (in miliardi di dollari)?",
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
    "title": "L'Internet delle Cose: Un Mondo Connesso",
    "content": "L'Internet delle Cose ha intessuto l'intelligenza digitale nel tessuto della vita quotidiana, connettendo miliardi di dispositivi che percepiscono, comunicano e agiscono senza intervento umano. Dai termostati intelligenti che imparano le tue preferenze ai sensori industriali che monitorano le apparecchiature in tutti i continenti, questa rivoluzione tecnologica estende Internet oltre computer e telefoni nel mondo fisico. Comprendere questo ecosistema interconnesso rivela sia notevoli possibilità che sfide significative che modelleranno i prossimi decenni.\n\nKevin Ashton, un pioniere tecnologico britannico che lavorava presso Procter and Gamble, coniò il termine Internet of Things nel 1999 mentre sviluppava sistemi di identificazione a radiofrequenza per tracciare i prodotti attraverso le catene di approvvigionamento. Prevedeva che i computer raccogliessero informazioni sul mondo fisico in modo indipendente piuttosto che affidarsi agli esseri umani per l'immissione di dati. Questa visione ha impiegato decenni per materializzarsi, poiché i sensori sono diventati più economici, la connettività wireless è migliorata e il cloud computing ha fornito l'infrastruttura per elaborare enormi flussi di dati.\n\nIl numero di dispositivi connessi è cresciuto esponenzialmente da quando l'adozione commerciale dell'IoT è iniziata intorno al 2010. Gli analisti di Statista hanno stimato 15,1 miliardi di dispositivi IoT in tutto il mondo nel 2020, con una proiezione di 29 miliardi entro il 2030. Ogni dispositivo genera dati continuamente, creando flussi di informazioni che superano il traffico Internet tradizionale. Una singola fabbrica connessa potrebbe produrre terabyte di dati dei sensori ogni giorno da migliaia di punti di monitoraggio.\n\nLa tecnologia per la casa intelligente rappresenta l'applicazione consumer più visibile dei principi dell'IoT. Il termostato intelligente Nest, introdotto dall'ex ingegnere Apple Tony Fadell nell'ottobre 2011, ha aperto la strada all'adozione mainstream della casa intelligente. Il dispositivo osservava quando i residenti erano a casa e le loro preferenze di temperatura, quindi regolava automaticamente il riscaldamento e il raffreddamento per risparmiare energia. Google ha acquisito Nest Labs per 3,2 miliardi di dollari nel gennaio 2014, segnalando l'impegno delle principali aziende tecnologiche in questo mercato.\n\nGli assistenti vocali sono diventati hub centrali per gli ecosistemi di case intelligenti. Amazon ha rilasciato lo speaker Echo con Alexa nel novembre 2014, seguito da Google Home nel 2016 e HomePod di Apple nel 2018. Questi dispositivi rispondono ai comandi vocali per controllare luci, serrature, termostati e sistemi di intrattenimento. Entro il 2024, oltre 200 milioni di famiglie in tutto il mondo possedevano altoparlanti intelligenti, utilizzandoli per attività che vanno dall'impostazione dei timer all'ordinazione della spesa.\n\nI dispositivi indossabili tracciano le metriche di salute con crescente sofisticazione e precisione. L'Apple Watch, rilasciato nell'aprile 2015, si è evoluto da accessorio di moda a dispositivo medico in grado di rilevare ritmi cardiaci irregolari e cadute. Uno studio pubblicato sul New England Journal of Medicine nel novembre 2019 ha scoperto che l'orologio identificava la fibrillazione atriale, una grave condizione cardiaca, con una precisione dell'84%. I monitor continui della glicemia consentono ai diabetici di monitorare la glicemia senza punture alle dita, trasmettendo i dati agli smartphone e avvisando gli utenti di livelli pericolosi.\n\nL'IoT industriale, a volte chiamato Industria 4.0, trasforma la produzione con visibilità e controllo senza precedenti. I sensori incorporati nei macchinari rilevano vibrazioni, temperature e consumo di energia che indicano guasti imminenti prima che si verifichino interruzioni. General Electric ha aperto la strada alla manutenzione predittiva attraverso la sua piattaforma Predix, affermando di far risparmiare ai clienti miliardi di dollari in tempi di inattività evitati. Un singolo motore a reazione genera 10 terabyte di dati durante un volo transatlantico, analizzati continuamente per ottimizzare le prestazioni e pianificare la manutenzione.\n\nL'agricoltura abbraccia l'IoT per aumentare i raccolti riducendo al contempo l'impatto ambientale. I sensori di umidità del suolo attivano l'irrigazione solo quando le piante hanno bisogno di acqua, riducendo il consumo fino al 30% rispetto all'irrigazione programmata. I droni dotati di telecamere multispettrali identificano stress delle colture, infestazioni di parassiti e carenze di nutrienti in vasti campi. John Deere, la società di attrezzature agricole di 185 anni, ora raccoglie dati da milioni di macchine connesse e vende servizi di analisi agli agricoltori insieme ai trattori.\n\nLe città intelligenti implementano l'infrastruttura IoT per gestire i sistemi urbani in modo più efficiente. Barcellona ha implementato uno dei programmi di smart city più completi a partire dal 2012, installando sensori in tutta la città per monitorare la disponibilità di parcheggio, i livelli dei contenitori dei rifiuti, la qualità dell'aria e le esigenze di irrigazione. La città afferma di risparmiare annualmente 75 milioni di dollari migliorando al contempo i servizi per i residenti. Singapore, Copenaghen e Seul hanno intrapreso iniziative simili, utilizzando sensori connessi per ottimizzare il flusso del traffico, il consumo di energia e la risposta alle emergenze.\n\nLe applicazioni sanitarie si estendono ben oltre i dispositivi indossabili nel monitoraggio remoto dei pazienti e nelle impostazioni cliniche. I pazienti in convalescenza dopo un intervento chirurgico o la gestione di condizioni croniche possono essere monitorati a casa con dispositivi connessi che avvisano i team di assistenza di cambiamenti preoccupanti. Gli ospedali tracciano la posizione e lo stato delle apparecchiature critiche in tempo reale. Le sperimentazioni cliniche utilizzano dispositivi IoT per raccogliere dati più accurati sulla salute dei partecipanti tra le visite. La pandemia di COVID-19 ha accelerato l'adozione di tecnologie di monitoraggio remoto che in precedenza avevano affrontato una lenta accettazione.\n\nLe preoccupazioni per la sicurezza che circondano i dispositivi IoT si sono dimostrate inquietantemente valide. Molti produttori danno la priorità alle funzionalità e ai prezzi bassi rispetto a una solida sicurezza, spedendo dispositivi con password predefinite e vulnerabilità non corrette. L'attacco botnet Mirai nell'ottobre 2016 ha dirottato centinaia di migliaia di webcam e DVR non protetti per lanciare attacchi denial-of-service distribuiti che hanno interrotto importanti siti Web tra cui Twitter, Netflix e PayPal. I ricercatori dimostrano regolarmente vulnerabilità allarmanti in baby monitor, automobili, dispositivi medici e sistemi industriali.\n\nLe implicazioni sulla privacy del rilevamento pervasivo sollevano profonde questioni sulla sorveglianza e sulla proprietà dei dati. Gli assistenti vocali registrano le conversazioni nelle case. I fitness tracker rivelano dettagli intimi sulla salute e sulle routine quotidiane. Le auto connesse trasmettono dati sulla posizione che rivelano dove vanno i conducenti e come guidano. Le aziende raccolgono queste informazioni per il miglioramento del servizio e la pubblicità mirata, mentre i governi cercano sempre più l'accesso per le forze dell'ordine e la sicurezza nazionale.\n\nLe sfide di interoperabilità frammentano il panorama IoT in ecosistemi incompatibili. I dispositivi di diversi produttori spesso non possono comunicare direttamente, richiedendo ai consumatori di scegliere piattaforme e limitare la funzionalità. Il protocollo Matter, lanciato nel novembre 2022 da un consorzio che comprende Apple, Google, Amazon e Samsung, mira a creare uno standard universale per i dispositivi domestici intelligenti. Questa iniziativa rappresenta il riconoscimento da parte del settore che la frammentazione ostacola l'adozione e l'innovazione.\n\nL'edge computing affronta i limiti di latenza e larghezza di banda dell'invio di tutti i dati IoT a server cloud distanti. L'elaborazione delle informazioni localmente su o vicino ai dispositivi consente risposte in tempo reale per applicazioni come veicoli autonomi e robotica industriale. Un'auto a guida autonoma non può aspettare che i dati viaggino verso un server cloud e ritorno prima di decidere di frenare. Le architetture edge distribuiscono l'intelligenza attraverso le reti anziché concentrarla in data center centralizzati.\n\nI vincoli energetici modellano la progettazione e l'implementazione dei dispositivi IoT. I sensori alimentati a batteria devono funzionare per anni senza sostituzione in luoghi che potrebbero essere inaccessibili o pericolosi. Le tecnologie di rete a lungo raggio a bassa potenza come LoRaWAN e Sigfox consentono ai dispositivi di comunicare su chilometri consumando al contempo energia minima. La raccolta di energia da fonti solari, termiche o cinetiche consente ad alcuni dispositivi di funzionare a tempo indeterminato senza batterie.\n\nL'impronta ambientale di miliardi di dispositivi connessi richiede attenzione man mano che l'IoT si espande. La produzione di questi prodotti consuma risorse ed energia. La maggior parte dei dispositivi non dispone di disposizioni per il riciclaggio dei propri componenti elettronici. La connettività di rete continua richiede energia sia dai dispositivi che dall'infrastruttura. Tuttavia, le applicazioni IoT nella gestione dell'energia, nell'agricoltura e nei trasporti possono ridurre l'impatto ambientale complessivo se implementate in modo ponderato.\n\nIl futuro dell'IoT punta verso un'intelligenza ambientale che anticipa le esigenze e risponde automaticamente alle mutevoli condizioni. I gemelli digitali creano repliche virtuali di sistemi fisici per la simulazione e l'ottimizzazione. L'intelligenza artificiale applicata ai dati dei sensori consente previsioni e automazioni al di là di ciò che la programmazione esplicita potrebbe ottenere. Il confine tra mondo fisico e digitale continua a sfumare man mano che l'intelligenza connessa si diffonde nell'ambiente in cui viviamo.",
    "wordCount": 1416,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Chi ha coniato il termine \"Internet delle cose\" nel 1999?",
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
        "question": "Quali aziende hanno rilasciato importanti dispositivi assistenti vocali? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Amazon con Echo",
          "Google con Google Home",
          "Apple con HomePod",
          "Microsoft con altoparlante Cortana"
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
        "question": "L'attacco botnet Mirai nell'ottobre 2016 ha dirottato centinaia di migliaia di webcam e DVR non protetti.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Quanto ha pagato Google per acquisire Nest Labs nel gennaio 2014 (in miliardi di dollari)?",
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
        "question": "Quando è stato rilasciato l'Apple Watch?",
        "options": [
          "Ottobre 2011",
          "Gennaio 2014",
          "Aprile 2015",
          "Novembre 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Quale città ha implementato uno dei programmi di smart city più completi a partire dal 2012?",
        "options": [
          "Singapore",
          "Barcellona",
          "Copenaghen",
          "Seoul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Quanti dispositivi IoT si prevede che esistano in tutto il mondo entro il 2030 (in miliardi)?",
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
        "question": "Il protocollo Matter è stato lanciato per creare uno standard universale per i dispositivi domestici intelligenti.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Con quale accuratezza l'Apple Watch ha identificato la fibrillazione atriale secondo lo studio del New England Journal of Medicine?",
        "options": [
          "74 percento",
          "84 percento",
          "94 percento",
          "99 percento"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Quali applicazioni IoT in agricoltura sono menzionate? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Sensori di umidità del suolo per l'irrigazione",
          "Droni con telecamere multispettrali",
          "Trattori connessi con analisi",
          "Raccolta robotizzata"
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
    "title": "L'Evoluzione dei Social Media",
    "content": "I social media hanno trasformato il modo in cui gli esseri umani comunicano, condividono informazioni e costruiscono comunità in modi che nessuno aveva previsto quando Internet è emerso per la prima volta. Piattaforme che connettono miliardi di utenti hanno rimodellato la politica, il commercio, l'intrattenimento e le relazioni personali in ogni continente. La storia dei social media rivela sia un'innovazione straordinaria sia profonde sfide per la società moderna.\n\nI primi siti di social networking sono apparsi alla fine degli anni '90, quando Internet è diventato accessibile alla gente comune. SixDegrees è stato lanciato nel 1997, consentendo agli utenti di creare profili e connettersi con gli amici. Il sito ha attirato circa 3,5 milioni di membri prima di chiudere nel 2001. Friendster ha seguito nel 2002, aprendo la strada a funzionalità che sarebbero diventate standard in tutto il settore. MySpace ha dominato dal 2005 al 2008, diventando il sito web più visitato negli Stati Uniti e lanciando la carriera di musicisti come gli Arctic Monkeys.\n\nFacebook è nato in una stanza del dormitorio dell'Università di Harvard nel febbraio 2004. Mark Zuckerberg e i suoi coinquilini hanno creato il sito inizialmente solo per gli studenti universitari. La piattaforma si è aperta a tutti i maggiori di 13 anni nel settembre 2006. Entro il 2012, Facebook ha raggiunto un miliardo di utenti attivi mensili, una pietra miliare che nessun social network aveva mai raggiunto. L'azienda ora opera come Meta e dichiara oltre 3 miliardi di utenti mensili in tutta la sua famiglia di app, tra cui Instagram e WhatsApp.\n\nTwitter ha introdotto un nuovo formato per la comunicazione sociale quando è stato lanciato nel luglio 2006. La piattaforma limitava i post a 140 caratteri, successivamente espansi a 280, costringendo gli utenti a esprimere pensieri in modo conciso. Twitter è diventato essenziale per le notizie dell'ultima ora, il discorso politico e il coinvolgimento delle celebrità. Il servizio ha svolto un ruolo notevole durante le proteste della Primavera araba nel 2011 e da allora ha plasmato la conversazione pubblica su innumerevoli questioni.\n\nYouTube ha rivoluzionato la condivisione di video dopo che tre ex dipendenti di PayPal lo hanno fondato nel febbraio 2005. Il primo video, intitolato \"Me at the zoo\", mostrava il co-fondatore Jawed Karim allo zoo di San Diego per soli 18 secondi. Google ha acquistato YouTube per 1,65 miliardi di dollari nell'ottobre 2006. Oggi, gli utenti caricano oltre 500 ore di contenuti video ogni minuto e la piattaforma raggiunge più persone tra i 18 e i 49 anni di tutte le reti televisive via cavo messe insieme.\n\nInstagram ha portato la condivisione di foto sui dispositivi mobili quando Kevin Systrom e Mike Krieger lo hanno lanciato nell'ottobre 2010. L'app ha guadagnato 25.000 utenti nel suo primo giorno e ha raggiunto un milione entro due mesi. Facebook ha acquisito Instagram per un miliardo di dollari nell'aprile 2012. La piattaforma ha introdotto le Storie nel 2016 e i Reel nel 2020, adattando funzionalità rese popolari da concorrenti come Snapchat e TikTok.\n\nTikTok è diventata la piattaforma social in più rapida crescita nella storia dopo il suo lancio internazionale nel 2017. La società cinese ByteDance l'ha creata fondendosi con Musical.ly, un'app popolare tra gli adolescenti americani. L'algoritmo di TikTok consiglia i video in base al comportamento di visualizzazione piuttosto che seguendo le relazioni, creando un'esperienza diversa rispetto alle piattaforme precedenti. L'app ha raggiunto un miliardo di utenti mensili nel settembre 2021, raggiungendo questo traguardo più velocemente di qualsiasi predecessore.\n\nI social media hanno creato nuove opportunità economiche per un valore di miliardi di dollari all'anno. Gli influencer guadagnano entrate considerevoli collaborando con i marchi e promuovendo i prodotti ai propri follower. La creator economy impiegava circa 50 milioni di persone in tutto il mondo entro il 2022. Le piccole imprese utilizzano le piattaforme social per raggiungere i clienti senza costose pubblicità tradizionali. Intere industrie sono emerse attorno alla gestione della presenza sui social media per organizzazioni e individui.\n\nLe preoccupazioni per la salute mentale che circondano i social media hanno suscitato un intenso dibattito tra ricercatori e politici. Gli studi collegano l'uso intenso dei social media a un aumento dei tassi di ansia, depressione e solitudine, in particolare tra gli adolescenti. La dottoressa Jean Twenge della San Diego State University ha pubblicato una ricerca nel 2017 che mostrava un forte calo della salute mentale degli adolescenti in concomitanza con l'adozione degli smartphone. I critici sostengono che la correlazione non prova la causalità e sottolineano i potenziali benefici della connessione online.\n\nLa disinformazione si diffonde rapidamente attraverso i social network, mettendo a dura prova l'ecosistema informativo. Le notizie false viaggiano più velocemente e raggiungono più persone rispetto ai rapporti accurati, secondo una ricerca del MIT pubblicata su Science nel marzo 2018. Le piattaforme hanno implementato programmi di fact-checking, etichette di avvertimento e modifiche algoritmiche per combattere i contenuti fuorvianti. Questi sforzi producono risultati contrastanti e sollevano interrogativi sulla censura e sul ruolo delle società tecnologiche nel determinare la verità.\n\nLe preoccupazioni per la privacy hanno seguito i social media sin dai loro primi giorni. Le aziende raccolgono vaste quantità di dati personali per indirizzare la pubblicità con notevole precisione. Lo scandalo di Cambridge Analytica nel 2018 ha rivelato che una società di consulenza politica aveva raccolto dati da 87 milioni di utenti di Facebook senza consenso. Regolamenti come il Regolamento generale sulla protezione dei dati europeo (GDPR) tentano di dare agli utenti un maggiore controllo sulle proprie informazioni.\n\nIl futuro dei social media continua a evolversi rapidamente man mano che nuove tecnologie e preferenze mutevoli rimodellano il panorama. Le piattaforme di realtà virtuale promettono esperienze sociali più coinvolgenti. Le reti decentralizzate basate sulla tecnologia blockchain mirano a dare agli utenti un maggiore controllo. I giovani preferiscono sempre più la messaggistica privata alla pubblicazione pubblica. Qualunque forma assuma, la connessione sociale attraverso le piattaforme digitali rimarrà fondamentale per la comunicazione umana per le generazioni a venire.",
    "wordCount": 978,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Qual è stato il primo sito di social networking menzionato nell'articolo?",
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
        "question": "Quanto ha pagato Google per acquisire YouTube nel 2006?",
        "options": [
          "1 miliardo di dollari",
          "1,65 miliardi di dollari",
          "2 miliardi di dollari",
          "10 miliardi di dollari"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Quali piattaforme fanno parte della famiglia di app di Meta? Seleziona tutte le opzioni applicabili.",
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
        "question": "TikTok ha raggiunto un miliardo di utenti mensili più velocemente di qualsiasi altra piattaforma di social media prima di esso.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Quanti utenti di Facebook hanno subito la raccolta dei loro dati nello scandalo di Cambridge Analytica (in milioni)?",
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
        "question": "Quando Facebook ha raggiunto un miliardo di utenti attivi mensili?",
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
    "title": "La Rivoluzione della Privacy Digitale",
    "content": "La privacy digitale è emersa come una delle questioni fondamentali del ventunesimo secolo, poiché le aziende tecnologiche accumulano quantità senza precedenti di informazioni personali, mentre i governi espandono le capacità di sorveglianza a livelli che sarebbero sembrati distopici solo pochi decenni fa. La tensione tra i vantaggi dei servizi basati sui dati e i rischi del monitoraggio pervasivo plasma i dibattiti politici, i modelli di business e le scelte individuali in tutto il mondo. Comprendere questo complesso scenario richiede l'esame delle tecnologie che consentono sia la sorveglianza che la protezione della privacy, i quadri giuridici che faticano a tenere il passo con l'innovazione e le questioni filosofiche su cosa significhi la privacy in un'era di connettività ubiquitaria.\n\nIl concetto di privacy informativa ha ottenuto un riconoscimento legale molto prima dell'era digitale. Gli studiosi di diritto americani Samuel Warren e Louis Brandeis pubblicarono il loro fondamentale articolo del 1890 sulla Harvard Law Review, sostenendo il diritto a essere lasciati soli in risposta al giornalismo invadente reso possibile dalle fotocamere portatili. Questo testo fondamentale ha stabilito la privacy come distinta dai diritti di proprietà e dall'autonomia corporea. Brandeis divenne in seguito giudice della Corte Suprema e scrisse pareri influenti che estendevano le protezioni della privacy contro l'intrusione del governo.\n\nInternet ha trasformato la privacy da un concetto giuridico astratto a una preoccupazione pratica quotidiana. I primi utenti del web condividevano informazioni personali con disinvoltura, inconsapevoli di come potessero essere raccolte e utilizzate. I cookie, piccoli file di testo memorizzati dai browser web, hanno permesso ai siti web di riconoscere i visitatori di ritorno a partire dal 1994. L'ingegnere di Netscape Lou Montulli inventò i cookie per risolvere il problema tecnico della gestione dei carrelli della spesa, ma divennero rapidamente strumenti di sorveglianza per tracciare gli utenti attraverso i siti web.\n\nGoogle ha rivoluzionato la pubblicità digitale collegando le query di ricerca agli interessi degli utenti con notevole precisione. I fondatori dell'azienda inizialmente espressero disagio per i modelli di business supportati dalla pubblicità, scrivendo nel loro documento accademico del 1998 che la pubblicità crea incentivi contrastanti per dare priorità agli inserzionisti rispetto agli utenti. Tuttavia, Google AdWords è stato lanciato nell'ottobre del 2000 e Google AdSense ha seguito nel 2003, creando l'infrastruttura di pubblicità mirata che avrebbe generato centinaia di miliardi di entrate.\n\nFacebook ha esteso la raccolta di dati alle relazioni sociali e alle comunicazioni personali. La piattaforma è stata lanciata nel febbraio 2004 con la promessa di connettere le persone, ma il suo modello di business dipendeva dalla vendita di profili utente dettagliati agli inserzionisti. Gli utenti condividevano foto, dati sulla posizione, opinioni politiche e stato della relazione, spesso senza capire come queste informazioni sarebbero state monetizzate. Nel 2018, Facebook raccoglieva dati su circa 2,2 miliardi di utenti in tutto il mondo.\n\nLo scandalo Cambridge Analytica è esploso nella coscienza pubblica nel marzo 2018, rivelando come applicazioni di terze parti potessero raccogliere dati da milioni di utenti di Facebook a loro insaputa. La società di consulenza britannica Cambridge Analytica ha ottenuto informazioni personali da 87 milioni di utenti attraverso un'app di quiz sulla personalità che sfruttava le autorizzazioni API di Facebook. La società ha utilizzato questi dati per la pubblicità politica durante le elezioni presidenziali statunitensi del 2016 e il referendum sulla Brexit. Facebook ha affrontato indagini normative in diversi continenti e ha pagato una multa record di 5 miliardi di dollari alla Federal Trade Commission nel luglio 2019.\n\nLe rivelazioni di Edward Snowden nel giugno 2013 hanno esposto la portata della sorveglianza governativa resa possibile dalle comunicazioni digitali. L'ex contractor della National Security Agency ha fatto trapelare documenti classificati ai giornalisti Glenn Greenwald, Laura Poitras ed Ewen MacAskill. Questi documenti rivelavano programmi che raccoglievano metadati telefonici da milioni di americani, intercettavano cavi in fibra ottica che trasportavano comunicazioni internazionali e sfruttavano le vulnerabilità nei prodotti tecnologici. Le rivelazioni hanno suscitato dibattiti globali sull'equilibrio tra sicurezza e privacy.\n\nIl programma PRISM ha permesso alla NSA di raccogliere dati direttamente dai server delle principali aziende tecnologiche, tra cui Google, Facebook, Apple e Microsoft. Le aziende inizialmente hanno negato di essere a conoscenza del programma, anche se successive segnalazioni hanno chiarito che si attenevano agli ordini legali, pur combattendo a volte l'espansione della sorveglianza nei tribunali. Snowden è fuggito a Hong Kong e alla fine ha ricevuto asilo in Russia, dove è rimasto a partire dal 2024. Gli Stati Uniti lo hanno accusato di spionaggio e furto di proprietà governativa.\n\nLa crittografia fornisce la principale difesa tecnica sia contro la sorveglianza governativa che contro l'intercettazione criminale. La crittografia end-to-end garantisce che solo il mittente e il destinatario possano leggere i messaggi, con anche il fornitore di servizi incapace di accedere al contenuto. WhatsApp ha implementato la crittografia end-to-end per i suoi 1,5 miliardi di utenti nell'aprile 2016, utilizzando il protocollo Signal sviluppato dal crittografo Moxie Marlinspike. Allo stesso modo, Apple crittografa le comunicazioni iMessage e si è pubblicamente opposta alle richieste del governo di accesso tramite backdoor.\n\nLe forze dell'ordine sostengono che la crittografia crea zone in cui i criminali operano impunemente. L'FBI ha citato in giudizio Apple nel febbraio 2016 per costringere l'azienda ad aiutare a sbloccare un iPhone utilizzato da uno degli attentatori terroristici di San Bernardino. Apple si è rifiutata, sostenendo che la creazione di una backdoor comprometterebbe la sicurezza per tutti gli utenti. L'FBI alla fine ha pagato un appaltatore terzo circa un milione di dollari per bypassare la sicurezza del telefono. Questo caso ha illustrato il conflitto in corso tra gli interessi di privacy e sicurezza.\n\nL'Unione Europea ha emanato il Regolamento generale sulla protezione dei dati, comunemente noto come GDPR, entrato in vigore il 25 maggio 2018. Questo quadro completo ha stabilito norme rigorose per la raccolta, l'archiviazione e l'elaborazione dei dati personali dei residenti nell'UE. Le organizzazioni devono ottenere il consenso esplicito prima di raccogliere i dati, fornire l'accesso alle informazioni memorizzate ed eliminare i dati su richiesta. Le violazioni possono comportare multe fino al 4% del fatturato annuo globale o 20 milioni di euro, a seconda di quale sia il maggiore. Amazon ha ricevuto la multa GDPR più alta di 746 milioni di euro nel luglio 2021.\n\nLa California ha approvato il California Consumer Privacy Act, in vigore dal 1° gennaio 2020, stabilendo protezioni simili per i residenti dello stato. La legge concede ai consumatori il diritto di sapere quali informazioni personali raccolgono le aziende, eliminare tali informazioni e rinunciare alla loro vendita. Il California Privacy Rights Act, approvato dagli elettori nel novembre 2020, ha ulteriormente rafforzato queste protezioni. Altri stati, tra cui Virginia, Colorado e Connecticut, hanno emanato una legislazione comparabile, creando un mosaico di requisiti sulla privacy negli Stati Uniti.\n\nI data broker operano in gran parte al di fuori della consapevolezza pubblica, compilando profili dettagliati da registri pubblici, cronologie degli acquisti, attività sui social media e numerose altre fonti. Aziende come Acxiom, Experian e Oracle Data Cloud mantengono database che coprono centinaia di milioni di individui. Questi profili influenzano le decisioni sul credito, lo screening dell'assunzione, i tassi di assicurazione e la pubblicità mirata. I broker vendono l'accesso a queste informazioni a imprese, campagne politiche e talvolta attori malintenzionati.\n\nIl tracciamento della posizione è diventato particolarmente controverso poiché gli smartphone segnalano continuamente le posizioni degli utenti. Le applicazioni mobili richiedono regolarmente l'accesso alla posizione per funzionalità che vanno dalle previsioni del tempo ai consigli sui ristoranti. Questi dati rivelano informazioni sensibili su visite mediche, pratiche religiose, attività politiche e relazioni personali. Il Wall Street Journal ha riportato nel dicembre 2018 che dozzine di aziende ricevono dati di localizzazione precisi da app popolari, creando cronologie di movimento complete.\n\nLa tecnologia di riconoscimento facciale solleva distinte preoccupazioni per la privacy consentendo l'identificazione senza consenso o consapevolezza. Le forze dell'ordine utilizzano sistemi di aziende come Clearview AI, che ha raschiato miliardi di foto dai social media per costruire un database ricercabile. Diverse città, tra cui San Francisco, Boston e Portland, hanno vietato l'uso governativo del riconoscimento facciale. L'Unione Europea ha discusso le restrizioni alla sorveglianza biometrica negli spazi pubblici. La Cina ha dispiegato ampiamente il riconoscimento facciale, utilizzandolo per misure di controllo sociale, in particolare contro le minoranze uigure.\n\nIl diritto all'oblio è emerso da una sentenza del 2014 della Corte di giustizia europea che imponeva a Google di rimuovere determinati risultati di ricerca su richiesta. Mario Costeja Gonzalez, un cittadino spagnolo, ha sostenuto con successo che i collegamenti ad articoli di giornale del 1998 sulle sue difficoltà finanziarie non erano più rilevanti. Google ha elaborato oltre 1,6 milioni di richieste di rimozione che interessano quasi 6 milioni di URL dalla sentenza. I critici sostengono che ciò equivale alla censura, mentre i sostenitori lo considerano essenziale per la dignità personale e la riabilitazione.\n\nLe tecnologie che preservano la privacy offrono alternative all'economia della sorveglianza. Le reti private virtuali crittografano il traffico internet e mascherano la posizione degli utenti. Il browser Tor instrada le comunicazioni attraverso più server per impedire il tracciamento. I motori di ricerca incentrati sulla privacy come DuckDuckGo elaborano le query senza raccogliere dati personali. Signal fornisce messaggistica crittografata che raccoglie metadati minimi. Questi strumenti richiedono una sofisticazione tecnica che ne limita l'adozione, ma dimostrano che i servizi rispettosi della privacy sono tecnicamente fattibili.\n\nLa privacy dei bambini riceve una speciale protezione legale data la loro vulnerabilità e incapacità di fornire un consenso significativo. Il Children's Online Privacy Protection Act, emanato nel 1998, limita la raccolta di informazioni personali da bambini di età inferiore ai 13 anni negli Stati Uniti. TikTok ha pagato 5,7 milioni di dollari nel febbraio 2019 per risolvere le accuse di raccolta illegale di dati di bambini. L'Age Appropriate Design Code del Regno Unito, in vigore dal settembre 2021, richiede ai servizi online di fornire impostazioni predefinite di elevata privacy per gli utenti di età inferiore ai 18 anni.\n\nIl futuro della privacy digitale dipende dall'innovazione tecnologica, dallo sviluppo normativo e dagli atteggiamenti culturali verso la condivisione dei dati. I sistemi di identità decentralizzati potrebbero dare agli individui il controllo sulle loro informazioni personali. Le tecniche di privacy differenziale consentono un'analisi utile dei dati proteggendo al contempo i record individuali. La convergenza normativa potrebbe stabilire standard globali piuttosto che approcci nazionali frammentati. La fondamentale tensione tra l'utilità dei dati e la protezione della privacy persisterà, ma l'equilibrio tra di essi rimane soggetto alla contestazione democratica e alle scelte individuali.",
    "wordCount": 1720,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Quando Samuel Warren e Louis Brandeis pubblicarono il loro fondamentale articolo sulla privacy sull'Harvard Law Review?",
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
        "question": "Quali aziende sono state rivelate come parte del programma NSA PRISM? Seleziona tutte le opzioni applicabili.",
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
        "question": "Lo scandalo di Cambridge Analytica ha coinvolto i dati di 87 milioni di utenti di Facebook.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Quanto ha pagato Facebook nella sua multa FTC nel luglio 2019 (in miliardi di dollari)?",
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
        "question": "Quando Edward Snowden ha fatto trapelare documenti classificati della NSA?",
        "options": [
          "Giugno 2011",
          "Giugno 2013",
          "Giugno 2015",
          "Giugno 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Quando è entrato in vigore il GDPR?",
        "options": [
          "25 maggio 2016",
          "25 maggio 2017",
          "25 maggio 2018",
          "25 maggio 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "A quanto ammontava la multa GDPR di Amazon nel luglio 2021 (in milioni di euro)?",
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
        "question": "WhatsApp ha implementato la crittografia end-to-end per i suoi utenti nell'aprile 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Quando è entrato in vigore il California Consumer Privacy Act?",
        "options": [
          "1 gennaio 2018",
          "1 gennaio 2019",
          "1 gennaio 2020",
          "1 gennaio 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Quando è stato emanato il Children's Online Privacy Protection Act?",
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
        "question": "Chi ha inventato i cookie web nel 1994?",
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
        "question": "Quando è stato lanciato Google AdWords?",
        "options": [
          "Ottobre 1998",
          "Ottobre 2000",
          "Ottobre 2002",
          "Ottobre 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Quanto ha pagato TikTok nel febbraio 2019 per risolvere le accuse sui dati dei bambini (in milioni di dollari)?",
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
        "question": "San Francisco ha vietato l'uso governativo della tecnologia di riconoscimento facciale.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Quando è stata la sentenza sul diritto all'oblio da parte della Corte di Giustizia Europea?",
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
        "question": "Quali giornalisti hanno ricevuto i documenti trapelati da Edward Snowden? Seleziona tutte le opzioni applicabili.",
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
    "title": "Il Mondo Rivoluzionario della Tecnologia Blockchain",
    "content": "La tecnologia blockchain si è evoluta da un oscuro concetto crittografico a una forza trasformativa che sta rimodellando settori ben oltre le sue origini nella valuta digitale. Questo sistema di registro distribuito offre trasparenza, sicurezza e decentralizzazione senza precedenti, sfidando gli approcci tradizionali alla conservazione dei registri e alla fiducia. Comprendere la blockchain rivela perché i tecnologi la considerano una delle innovazioni più significative dai tempi di Internet stesso.\n\nSatoshi Nakamoto, un individuo o gruppo pseudonimo, ha introdotto la blockchain al mondo attraverso il whitepaper di Bitcoin pubblicato il 31 ottobre 2008. La tempistica si è rivelata notevolmente lungimirante, arrivando poche settimane dopo il crollo di Lehman Brothers che ha innescato la crisi finanziaria globale. Nakamoto ha proposto un sistema di denaro elettronico peer-to-peer che avrebbe eliminato la necessità di intermediari di fiducia come le banche. Il primo blocco di Bitcoin, chiamato blocco genesi, è stato estratto il 3 gennaio 2009, incorporando un titolo di giornale sui salvataggi bancari come promemoria permanente delle motivazioni della tecnologia.\n\nUna blockchain funziona come un database distribuito condiviso attraverso una rete di computer chiamati nodi. Ogni blocco contiene un elenco di transazioni, un timestamp e un hash crittografico che lo collega al blocco precedente. Questa catena di hash rende praticamente impossibile alterare i record storici senza controllare la maggioranza della rete. Quando qualcuno tenta di modificare una vecchia transazione, l'hash cambia, rompendo la catena e avvisando gli altri nodi del tentativo di manomissione.\n\nI meccanismi di consenso garantiscono che tutti i nodi siano d'accordo sul contenuto della blockchain senza richiedere un'autorità centrale. Bitcoin utilizza la prova di lavoro (proof of work), in cui i computer competono per risolvere complessi enigmi matematici. Il primo a trovare una soluzione si guadagna il diritto di aggiungere il blocco successivo e ricevere bitcoin di nuova creazione come ricompensa. Questo processo, chiamato mining, ha consumato circa 127 terawattora di elettricità nel 2023, paragonabile al consumo energetico annuale della Norvegia.\n\nEthereum, lanciato dal programmatore Vitalik Buterin nel luglio 2015, ha esteso la blockchain oltre le semplici transazioni a contratti intelligenti programmabili. Questi accordi auto-esecutivi fanno rispettare automaticamente i loro termini quando vengono soddisfatte le condizioni predefinite. Un contratto intelligente per il settore immobiliare potrebbe rilasciare il pagamento a un venditore e trasferire la proprietà a un acquirente contemporaneamente una volta che entrambe le parti hanno adempiuto ai loro obblighi. Nessun avvocato, agente di deposito a garanzia (escrow agent) o banca deve verificare la transazione.\n\nLa finanza decentralizzata, comunemente chiamata DeFi, utilizza contratti intelligenti per ricreare i servizi finanziari tradizionali senza intermediari. Le piattaforme di prestito consentono agli utenti di prendere in prestito criptovalute fornendo garanzie, con tassi di interesse determinati da algoritmi anziché da banchieri. Gli exchange decentralizzati consentono la negoziazione diretta tra gli utenti senza che una società detenga i loro fondi. Al suo picco nel novembre 2021, i protocolli DeFi detenevano oltre 180 miliardi di dollari in asset.\n\nI token non fungibili, noti come NFT, applicano la blockchain alla proprietà digitale e alla provenienza. Ogni NFT rappresenta un asset unico verificato sulla blockchain, più comunemente arte digitale o oggetti da collezione. L'artista digitale Beeple ha venduto un'opera d'arte NFT presso la casa d'aste Christie's nel marzo 2021 per 69,3 milioni di dollari, catapultando questa tecnologia nella consapevolezza del grande pubblico. I critici si chiedono se gli NFT abbiano un valore duraturo, mentre i sostenitori sostengono che cambiano radicalmente il modo in cui i creatori monetizzano le opere digitali.\n\nLa gestione della supply chain offre applicazioni pratiche convincenti per la tecnologia blockchain. Le aziende possono tracciare i prodotti dalle materie prime attraverso la produzione fino agli scaffali dei negozi al dettaglio con registrazioni immutabili in ogni fase. Walmart ha collaborato con IBM su un sistema blockchain che traccia l'origine dei prodotti alimentari in pochi secondi anziché nella settimana precedentemente richiesta. Questa capacità si rivela preziosa durante i richiami di sicurezza alimentare quando l'identificazione rapida dei lotti contaminati salva vite umane.\n\nI governi esplorano la blockchain per la verifica dell'identità, i sistemi di voto e i registri pubblici. L'Estonia, un pioniere nella governance digitale, utilizza la blockchain per proteggere le cartelle cliniche, le registrazioni delle imprese e i documenti del tribunale per i suoi 1,3 milioni di cittadini. Il segretario di stato del West Virginia ha condotto un progetto pilota di voto basato su blockchain per il personale militare di stanza all'estero durante le elezioni di metà mandato del 2018. Questi esperimenti verificano se la tecnologia può migliorare anziché minacciare le istituzioni democratiche.\n\nLe preoccupazioni ambientali che circondano la blockchain hanno spinto una significativa evoluzione tecnologica. Ethereum è passata dalla proof of work ad alta intensità energetica alla proof of stake nel settembre 2022, riducendo il suo consumo di elettricità di circa il 99,95 percento. La proof of stake seleziona i validatori in base alla criptovaluta che impegnano come garanzia piuttosto che alla potenza di calcolo. Questo cambiamento dimostra che la blockchain può affrontare il suo impatto ambientale mantenendo la sicurezza.\n\nLe sfide di scalabilità limitano l'adozione della blockchain per le transazioni quotidiane. Bitcoin elabora circa sette transazioni al secondo rispetto alla capacità della rete Visa di 24.000. Le soluzioni di livello due creano canali di pagamento più veloci sopra le blockchain esistenti. La Lightning Network consente transazioni Bitcoin quasi istantanee regolando solo i saldi finali sulla blockchain principale. Queste innovazioni mirano a rendere la blockchain pratica per gli acquisti di tutti i giorni.\n\nIl futuro della blockchain si estende in regni che i suoi creatori non avrebbero mai immaginato. Le organizzazioni autonome decentralizzate, o DAO, utilizzano il voto tramite token per governare le comunità e gestire i tesori senza le tradizionali strutture aziendali. I sistemi di identità digitale potrebbero dare agli individui il controllo sui propri dati personali, dimostrando al contempo le credenziali a datori di lavoro, proprietari di case o governi. Che la blockchain realizzi il suo potenziale rivoluzionario o si stabilizzi in un ruolo di nicchia resta incerto, ma il suo impatto sulla tecnologia e sulla società si è già dimostrato sostanziale e duraturo.",
    "wordCount": 997,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Quando è stato pubblicato il whitepaper di Bitcoin?",
        "options": [
          "3 gennaio 2009",
          "31 ottobre 2008",
          "Luglio 2015",
          "Settembre 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Quali sono menzionate come applicazioni della blockchain oltre alle criptovalute? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Gestione della catena di approvvigionamento",
          "Identità digitale",
          "Sistemi di voto",
          "Video streaming"
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
        "question": "Ethereum è passato alla proof of stake a settembre 2022, riducendo il consumo di elettricità del 99,95 percento.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "A quanto è stata venduta l'opera d'arte NFT di Beeple da Christie's nel marzo 2021 (in milioni di dollari)?",
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
        "question": "Chi ha lanciato Ethereum nel luglio 2015?",
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
        "question": "Quante transazioni al secondo può elaborare la rete Bitcoin?",
        "options": [
          "Circa 7",
          "Circa 70",
          "Circa 700",
          "Circa 7.000"
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
    "title": "La Rivoluzione del Cloud Computing",
    "content": "Il cloud computing ha trasformato radicalmente il modo in cui aziende e individui utilizzano la tecnologia, spostando software e archiviazione dati da dispositivi locali a vaste reti di server remoti. Questa rivoluzione architetturale abilita capacità che sembravano impossibili solo due decenni fa, dallo streaming di intrattenimento ai servizi di intelligenza artificiale accessibili da qualsiasi dispositivo. Il cloud è diventato così parte integrante della vita moderna che la maggior parte delle persone lo utilizza quotidianamente senza esserne cosciente.\n\nAmazon Web Services ha lanciato i suoi primi prodotti cloud nel marzo 2006, aprendo la strada al modello infrastructure-as-a-service che avrebbe rimodellato l'industria tecnologica. L'azienda aveva costruito un'enorme capacità di calcolo per gestire i periodi di punta dello shopping come il Black Friday e si è resa conto che poteva affittare la capacità inutilizzata ad altre aziende. Andy Jassy, che ha guidato AWS sin dalla sua fondazione, ha trasformato la divisione in un motore di profitto che genera oltre 80 miliardi di dollari di entrate annuali. Questo modello di business si è dimostrato così efficace che i concorrenti si sono affrettati a costruire le proprie piattaforme cloud.\n\nMicrosoft Azure è entrato nel mercato del cloud nel febbraio 2010, sfruttando le profonde relazioni dell'azienda con i clienti aziendali. Il CEO Satya Nadella, che ha assunto la leadership nel 2014, ha incentrato la strategia di Microsoft sui servizi cloud. Azure è cresciuto fino a diventare il secondo provider di cloud più grande, alimentando tutto, dai piccoli siti web aziendali al network professionale LinkedIn. La trasformazione cloud di Microsoft ha rilanciato un'azienda che molti avevano liquidato come superata.\n\nGoogle Cloud Platform porta l'esperienza del gigante della ricerca nel calcolo distribuito e nell'apprendimento automatico ai clienti aziendali. L'azienda che indicizza l'intero internet ed elabora miliardi di query di ricerca ogni giorno offre tale infrastruttura ad aziende di tutte le dimensioni. Gli investimenti di Google in cavi sottomarini e data center che si estendono in dozzine di paesi consentono un accesso a bassa latenza da quasi ogni parte della Terra. La piattaforma eccelle particolarmente nell'analisi dei dati e nei carichi di lavoro di intelligenza artificiale.\n\nIl cloud computing offre tre modelli di servizio principali che si sovrappongono l'uno all'altro come strati. Infrastructure as a Service fornisce macchine virtuali, storage e networking che i clienti configurano autonomamente. Platform as a Service aggiunge sistemi operativi, database e strumenti di sviluppo. Software as a Service fornisce applicazioni complete tramite browser web, eliminando completamente l'installazione e la manutenzione. La maggior parte delle persone interagisce quotidianamente con i prodotti SaaS tramite e-mail, modifica di documenti e applicazioni aziendali.\n\nL'economia del cloud computing crea vantaggi per le organizzazioni di quasi tutte le dimensioni. Le startup vengono lanciate senza acquistare hardware costoso o assumere personale specializzato per mantenere i data center. Pagano solo per le risorse consumate, aumentando durante i periodi di punta e diminuendo durante quelli lenti. Questa flessibilità ha trasformato l'economia dell'avvio di un'azienda tecnologica. Un servizio che potrebbe aver richiesto milioni di dollari in investimenti infrastrutturali può ora essere lanciato con un capitale minimo.\n\nLe organizzazioni aziendali migrano sempre più spesso dai data center on-premise alle piattaforme cloud. General Electric ha consolidato centinaia di data center in un'architettura cloud ibrida a partire dal 2014. Capital One, una delle più grandi banche in America, ha annunciato nel 2020 di aver chiuso il suo ultimo data center dopo la migrazione interamente ad AWS. Queste trasformazioni richiedono anni e miliardi di dollari, ma alla fine riducono i costi aumentando le capacità.\n\nLa sicurezza nel cloud è fondamentalmente diversa dagli approcci tradizionali, ma spesso supera ciò che le organizzazioni raggiungono in modo indipendente. I principali provider di cloud impiegano migliaia di specialisti della sicurezza e investono miliardi in tecnologie di protezione. Detengono certificazioni per la gestione di informazioni governative classificate e dati finanziari sensibili. I modelli di responsabilità condivisa significano che i provider proteggono l'infrastruttura mentre i clienti proteggono le proprie applicazioni e configurazioni di dati.\n\nLa distribuzione geografica dei data center cloud serve a scopi che vanno oltre l'ottimizzazione delle prestazioni. Le normative in molti paesi richiedono che determinati dati rimangano entro i confini nazionali. I provider di cloud costruiscono data center regionali per conformarsi a questi requisiti di sovranità. I clienti europei possono garantire che i loro dati rimangano a Francoforte o Amsterdam. Le aziende australiane conservano le informazioni all'interno del proprio paese. Questa architettura distribuita fornisce anche capacità di ripristino di emergenza che poche organizzazioni potrebbero permettersi in modo indipendente.\n\nL'edge computing estende le capacità del cloud più vicino al punto in cui hanno origine i dati. Invece di inviare tutto a data center distanti, i sistemi edge elaborano le informazioni localmente per le applicazioni che richiedono una risposta immediata. I veicoli autonomi non possono aspettare che i dati viaggino per migliaia di chilometri prima di decidere di frenare. I sensori industriali che analizzano le vibrazioni delle apparecchiature necessitano di un rilevamento immediato delle anomalie. L'edge computing porta l'intelligenza del cloud in scenari in cui i millisecondi contano.\n\nIl serverless computing rappresenta l'ultima evoluzione dell'architettura cloud. In questo modello, gli sviluppatori scrivono codice senza gestire alcuna infrastruttura. Le piattaforme cloud allocano automaticamente le risorse quando il codice viene eseguito e addebitano solo il tempo di esecuzione effettivo. Una funzione che viene eseguita per 100 millisecondi costa una minuscola frazione di centesimo. Le applicazioni possono scalare da zero alla gestione di milioni di richieste senza modifiche alla configurazione.\n\nL'impatto ambientale del cloud computing genera sia preoccupazioni che opportunità. I data center consumano circa l'1,5% dell'elettricità globale e tale quota continua a crescere. Tuttavia, i provider di cloud operano in modo molto più efficiente rispetto ai tipici data center aziendali. Google afferma che le sue strutture raggiungono un'efficacia media nell'uso dell'energia (PUE) di 1,1 rispetto alla media del settore superiore a 1,5. Le piattaforme cloud alimentano sempre più le operazioni con energia rinnovabile, con Microsoft che si impegna a essere carbon negative entro il 2030.\n\nL'intelligenza artificiale e l'apprendimento automatico sono diventati elementi distintivi delle piattaforme cloud. Modelli pre-addestrati per il riconoscimento delle immagini, l'elaborazione del linguaggio naturale e la sintesi vocale sono disponibili tramite semplici interfacce di programmazione. Le organizzazioni senza competenze nell'apprendimento automatico possono aggiungere funzionalità sofisticate alle loro applicazioni. I provider di cloud competono in modo aggressivo sulle funzionalità AI, ciascuno rivendicando vantaggi in termini di precisione, facilità d'uso e ampiezza dei modelli disponibili.\n\nLe strategie multi-cloud consentono alle organizzazioni di utilizzare più provider contemporaneamente, evitando la dipendenza da un singolo fornitore. Kubernetes, un sistema di orchestrazione di container open source originariamente sviluppato da Google, consente di spostare i carichi di lavoro tra i cloud. Le aziende selezionano provider diversi per carichi di lavoro diversi in base a costi, prestazioni o funzionalità specializzate. Questa flessibilità richiede una maggiore complessità, ma riduce i problemi di lock-in del fornitore.\n\nIl futuro del cloud computing punta a un'integrazione ancora maggiore con la vita quotidiana e le operazioni aziendali. Le risorse di quantum computing compaiono già sulle piattaforme cloud, sebbene le applicazioni pratiche rimangano limitate. L'intelligenza artificiale automatizzerà una maggiore gestione dell'infrastruttura, riducendo le competenze necessarie per distribuire sistemi sofisticati. La linea tra dispositivi locali e risorse cloud si offuscherà ulteriormente man mano che la connettività migliora e l'edge computing matura. Qualunque siano le tecnologie specifiche che emergeranno, il passaggio fondamentale dall'infrastruttura di proprietà ai servizi in affitto continuerà a rimodellare il modo in cui l'umanità elabora i dati.",
    "wordCount": 1223,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Quando Amazon Web Services ha lanciato i suoi primi prodotti cloud?",
        "options": [
          "Marzo 2006",
          "Febbraio 2010",
          "Gennaio 2014",
          "Novembre 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Quali sono i tre modelli di servizio cloud principali menzionati? Seleziona tutte le opzioni applicabili.",
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
        "question": "Capital One ha annunciato nel 2020 di aver chiuso il suo ultimo data center dopo essere migrata interamente su AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Quale percentuale del consumo globale di elettricità è assorbita dai data center?",
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
        "question": "Quale CEO ha orientato la strategia di Microsoft sui servizi cloud a partire dal 2014?",
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
        "question": "Quale sistema open-source consente ai carichi di lavoro di spostarsi tra diversi fornitori di cloud?",
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
        "question": "Quanti ricavi annuali genera AWS (in miliardi di dollari)?",
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
        "question": "Entro quando Microsoft si è impegnata a diventare carbon negative?",
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
    "title": "La Rivoluzione del Calcolo Quantistico",
    "content": "Il calcolo quantistico rappresenta la trasformazione più profonda nella potenza di calcolo dall'invenzione del transistor, promettendo di risolvere problemi che richiederebbero ai computer classici più tempo dell'età dell'universo per essere completati. Queste macchine sfruttano le bizzarre proprietà della meccanica quantistica per eseguire calcoli in modi fondamentalmente nuovi che sfidano l'intuizione quotidiana. Comprendere questa tecnologia rivoluzionaria rivela sia il suo straordinario potenziale sia le formidabili sfide che rimangono prima che i computer quantistici raggiungano la loro piena promessa.\n\nI computer classici codificano le informazioni come bit che esistono come zero o uno in un dato momento. Ogni fotografia, documento e video sui tuoi dispositivi si riduce a lunghe stringhe di queste cifre binarie manipolate attraverso operazioni logiche. Questo approccio ha alimentato progressi notevoli dagli anni '40, con processori che ora contengono miliardi di transistor su chip più piccoli di un'unghia. Tuttavia, alcuni problemi rimangono ostinatamente irraggiungibili perché il numero di calcoli richiesti cresce esponenzialmente con la dimensione del problema.\n\nI computer quantistici utilizzano bit quantistici, chiamati qubit, che possono esistere in sovrapposizione, rappresentando zero e uno simultaneamente fino a quando non vengono misurati. Questa proprietà consente ai sistemi quantistici di esplorare molte possibili soluzioni contemporaneamente anziché controllarle una per una. Quando più qubit si aggrovigliano, la misurazione di uno influisce istantaneamente sugli altri indipendentemente dalla distanza fisica. Questi fenomeni quantistici consentono algoritmi che superano notevolmente gli approcci classici per tipi di problemi specifici.\n\nRichard Feynman, il fisico vincitore del premio Nobel, propose il concetto di calcolo quantistico durante una conferenza al California Institute of Technology nel maggio 1981. Osservò che simulare sistemi di meccanica quantistica su computer classici richiedeva risorse in crescita esponenziale man mano che la dimensione del sistema aumentava. Feynman suggerì che solo un computer di meccanica quantistica potesse simulare in modo efficiente la fisica quantistica. Questa intuizione ha lanciato un campo che si sarebbe sviluppato lentamente per decenni prima che le recenti scoperte accelerassero il progresso.\n\nDavid Deutsch all'Università di Oxford formalizzò la teoria del calcolo quantistico nel 1985, descrivendo come un computer quantistico universale potesse sfruttare la sovrapposizione e l'interferenza. Peter Shor ai Bell Labs rese famoso il calcolo quantistico nel 1994 quando sviluppò un algoritmo che poteva fattorizzare grandi numeri esponenzialmente più velocemente di qualsiasi metodo classico conosciuto. Questa scoperta ha minacciato la crittografia RSA che protegge le comunicazioni Internet, rendendo improvvisamente il calcolo quantistico una questione di sicurezza nazionale.\n\nCostruire computer quantistici reali si è dimostrato straordinariamente difficile perché i qubit sono fragili e facilmente disturbati dal loro ambiente. Qualsiasi interazione con il mondo esterno causa la decoerenza, facendo collassare la sovrapposizione e distruggendo le informazioni quantistiche. I primi esperimenti hanno mantenuto la coerenza solo per nanosecondi. I ricercatori hanno sviluppato elaborate tecniche di isolamento tra cui circuiti superconduttori raffreddati a temperature più fredde dello spazio esterno, in genere intorno a 15 millikelvin, appena sopra lo zero assoluto.\n\nIBM ha messo online il primo computer quantistico accessibile tramite il cloud, chiamato IBM Quantum Experience, nel maggio 2016, consentendo a ricercatori e appassionati di tutto il mondo di sperimentare con hardware quantistico reale. Il sistema iniziale conteneva solo cinque qubit, a malapena sufficienti per semplici dimostrazioni. Entro il 2023, IBM aveva implementato sistemi che superavano i 1.000 qubit e ha annunciato piani per sistemi da 100.000 qubit entro il 2033. Queste macchine sono ancora lontane dalla sostituzione dei computer classici, ma dimostrano un progresso costante verso l'utilità pratica.\n\nGoogle ha raggiunto una pietra miliare chiamata supremazia quantistica nell'ottobre 2019, quando il suo processore Sycamore a 53 qubit ha eseguito un calcolo in 200 secondi che richiederebbe al supercomputer più veloce del mondo circa 10.000 anni. I critici hanno contestato il confronto, con IBM che ha sostenuto che i loro supercomputer avrebbero potuto completare l'attività in giorni anziché millenni. Tuttavia, il risultato ha dimostrato che i computer quantistici potevano superare i sistemi classici almeno in alcuni compiti.\n\nLa correzione degli errori rappresenta forse l'ostacolo più grande al calcolo quantistico utile. I qubit fisici sono troppo rumorosi e inaffidabili per calcoli complessi. La correzione degli errori quantistici codifica un qubit logico su molti qubit fisici per rilevare e correggere gli errori, ma gli approcci attuali richiedono migliaia di qubit fisici per qubit logico. Un computer quantistico che risolve problemi pratici potrebbe aver bisogno di milioni di qubit fisici, ben oltre le attuali capacità.\n\nDiverse tecnologie competono per costruire i migliori qubit per i futuri computer quantistici. I circuiti superconduttori, utilizzati da IBM e Google, sfruttano le consolidate tecniche di produzione dell'industria dei semiconduttori. Gli ioni intrappolati, perseguiti da IonQ e Honeywell, tengono atomi caricati in campi elettromagnetici con eccezionale precisione. I sistemi fotonici codificano le informazioni in particelle di luce che possono viaggiare su lunghe distanze senza decoerenza. I qubit topologici, ancora in gran parte teorici, memorizzerebbero le informazioni in schemi resistenti ai disturbi locali.\n\nLe applicazioni di chimica quantistica possono fornire i primi vantaggi pratici del calcolo quantistico. La simulazione di molecole per progettare nuovi farmaci, materiali e catalizzatori richiede calcoli di meccanica quantistica che scalano esponenzialmente sui computer classici. Un computer quantistico potrebbe modellare le reazioni chimiche a livello atomico, accelerando potenzialmente la scoperta di farmaci, fertilizzanti e tecnologie per l'energia pulita. Aziende tra cui Roche, Merck e BASF hanno lanciato programmi di ricerca sul calcolo quantistico anticipando queste capacità.\n\nI problemi di ottimizzazione che abbracciano la logistica, la finanza e l'apprendimento automatico rappresentano un'altra area di applicazione promettente. Trovare il percorso migliore per i camion di consegna, i portafogli ottimali per gli investitori o i parametri ideali per le reti neurali comporta la ricerca di vasti spazi di soluzioni. L'annealing quantistico, una forma specializzata di calcolo quantistico commercializzata da D-Wave Systems dal 2011, affronta direttamente l'ottimizzazione. Importanti società tra cui Volkswagen, JPMorgan Chase e Lockheed Martin hanno esplorato l'ottimizzazione quantistica per reali sfide aziendali.\n\nLa crittografia affronta sia minacce che opportunità derivanti dai progressi del calcolo quantistico. L'algoritmo di Shor potrebbe violare la crittografia ampiamente utilizzata una volta che esistano computer quantistici sufficientemente potenti. Il National Institute of Standards and Technology ha selezionato nuovi standard crittografici post-quantistici nel luglio 2022 dopo una competizione di sei anni per identificare algoritmi resistenti agli attacchi quantistici. Nel frattempo, la distribuzione quantistica delle chiavi utilizza la fisica della misurazione quantistica per creare una crittografia teoricamente inviolabile per le comunicazioni più sensibili.\n\nLa Cina ha investito pesantemente nella tecnologia quantistica, stabilendo l'Università di Scienza e Tecnologia della Cina come leader mondiale sotto il fisico Pan Jianwei. Nel 2017, la Cina ha lanciato Micius, un satellite che ha dimostrato comunicazioni protette quantisticamente tra stazioni terrestri separate da 1.200 chilometri. I ricercatori cinesi hanno rivendicato la supremazia quantistica con un sistema fotonico chiamato Jiuzhang nel dicembre 2020. Gli Stati Uniti hanno risposto con il National Quantum Initiative Act del 2018, stanziando 1,2 miliardi di dollari in cinque anni per mantenere la competitività.\n\nL'industria del calcolo quantistico ha attratto enormi investimenti nonostante le incerte tempistiche per i ritorni pratici. I finanziamenti di venture capital per le startup quantistiche hanno superato i 2,5 miliardi di dollari nel 2022. Importanti aziende tecnologiche tra cui Microsoft, Amazon e Alibaba hanno lanciato servizi cloud quantistici insieme a società hardware dedicate. Gli analisti prevedono che il mercato del calcolo quantistico raggiungerà i 65 miliardi di dollari entro il 2030, anche se le stime variano ampiamente data l'incertezza tecnologica.\n\nIl futuro del calcolo quantistico dipende da progressi continui su più fronti contemporaneamente. L'hardware deve migliorare in termini di scala, coerenza e connettività. Il software deve sviluppare algoritmi efficienti e strumenti di programmazione accessibili oltre agli specialisti di fisica quantistica. Le applicazioni devono dimostrare chiari vantaggi rispetto alle alternative classiche per problemi del mondo reale. Il viaggio dalle dimostrazioni di laboratorio all'utilità pratica potrebbe richiedere decenni, ma i potenziali vantaggi giustificano continui investimenti e sforzi.",
    "wordCount": 1285,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Chi ha proposto il concetto di calcolo quantistico nel maggio 1981?",
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
        "question": "Quali tecnologie sono menzionate come approcci per costruire qubit? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Circuiti superconduttori",
          "Ioni intrappolati",
          "Sistemi fotonici",
          "Transistor al grafene"
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
        "question": "IBM ha reso disponibile online il primo computer quantistico accessibile tramite cloud nel maggio 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Quanti secondi ha impiegato il processore Sycamore di Google per completare il suo calcolo di supremazia quantistica?",
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
        "question": "Quando Peter Shor ha sviluppato il suo famoso algoritmo di fattorizzazione?",
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
        "question": "A quale temperatura vengono tipicamente raffreddati i computer quantistici superconduttori?",
        "options": [
          "Circa 100 kelvin",
          "Circa 4 kelvin",
          "Circa 15 millikelvin",
          "Circa 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Quanti finanziamenti ha stanziato il National Quantum Initiative Act in cinque anni (in miliardi di dollari)?",
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
        "question": "La Cina ha lanciato un satellite di comunicazione quantistica chiamato Micius nel 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Quando il NIST ha selezionato i nuovi standard crittografici post-quantistici?",
        "options": [
          "Luglio 2020",
          "Luglio 2021",
          "Luglio 2022",
          "Luglio 2023"
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
    "title": "L'Industria Globale dei Semiconduttori",
    "content": "I semiconduttori sono diventati le fondamenta della civiltà moderna, alimentando ogni cosa, dagli smartphone e le automobili, fino ai dispositivi medici e i sistemi militari da cui le nazioni dipendono per la sicurezza. Questi minuscoli chip, contenenti miliardi di transistor, rappresentano gli oggetti più complessi mai prodotti dall'umanità, realizzati attraverso processi che richiedono una precisione misurata in atomi. La competizione globale per il controllo della tecnologia dei semiconduttori ha trasformato questa industria in un punto critico della rivalità geopolitica, con implicazioni per la prosperità economica e la sicurezza nazionale in tutto il mondo.\n\nIl viaggio dei semiconduttori è iniziato ai Bell Labs in New Jersey il 23 dicembre 1947, quando i fisici John Bardeen, Walter Brattain e William Shockley hanno dimostrato il primo transistor. Questo dispositivo poteva amplificare i segnali elettrici senza il calore e la fragilità delle valvole termoioniche, guadagnando ai suoi inventori il premio Nobel per la fisica nel 1956. Il potenziale di miniaturizzazione del transistor avrebbe poi reso possibile la rivoluzione digitale che ha rimodellato la società umana.\n\nJack Kilby presso Texas Instruments e Robert Noyce presso Fairchild Semiconductor inventarono indipendentemente il circuito integrato nel 1958 e nel 1959, combinando più transistor su un singolo pezzo di materiale semiconduttore. Questa svolta eliminò la necessità di cablare manualmente i singoli componenti e rese possibile la produzione su larga scala. Kilby ricevette il premio Nobel per la fisica nel 2000 per questo contributo che ha reso possibile l'elettronica moderna.\n\nGordon Moore, co-fondatore di Intel, osservò nel 1965 che il numero di transistor sui circuiti integrati raddoppiava approssimativamente ogni due anni, mentre i costi rimanevano costanti. Questa osservazione, nota come Legge di Moore, ha guidato l'industria per sei decenni di miglioramento esponenziale. I processori moderni contengono oltre 100 miliardi di transistor, ognuno dei quali misura solo pochi nanometri di larghezza, all'incirca la larghezza di 20 atomi di silicio.\n\nIl processo di produzione dei semiconduttori prevede centinaia di passaggi che si estendono per mesi di operazioni precise. Gli ingegneri iniziano con cilindri di silicio ultra-puro cresciuti da materiale fuso a temperature superiori a 1.400 gradi Celsius. Questi lingotti vengono tagliati in sottili wafer e lucidati fino alla levigatezza atomica. La fotolitografia proietta i modelli dei circuiti sui wafer utilizzando luce ultravioletta, con le macchine più avanzate che utilizzano lunghezze d'onda ultraviolette estreme di soli 13,5 nanometri.\n\nTaiwan Semiconductor Manufacturing Company, nota come TSMC, è emersa come il produttore di semiconduttori più importante al mondo. Fondata da Morris Chang nel 1987, TSMC ha aperto la strada al modello di fonderia per la produzione di chip progettati da altre società. Entro il 2023, TSMC produceva oltre il 90 percento dei chip più avanzati al mondo, inclusi i processori per Apple, AMD e Nvidia. Questa concentrazione di capacità su un'isola che affronta rivendicazioni territoriali da parte della Cina è diventata una grave preoccupazione geopolitica.\n\nL'attrezzatura necessaria per fabbricare semiconduttori avanzati rappresenta uno straordinario risultato tecnologico. ASML, una società olandese, detiene il monopolio sulle macchine per la litografia ultravioletta estrema che costano circa 200 milioni di dollari ciascuna e pesano 180.000 chilogrammi. Questi sistemi utilizzano plasma riscaldato a 220.000 gradi Celsius per generare le precise lunghezze d'onda della luce necessarie. ASML ha richiesto il contributo del fornitore di ottiche Zeiss, dello sviluppatore di sorgenti luminose Cymer e di numerosi altri partner per raggiungere questa capacità dopo decenni di sviluppo.\n\nSamsung Electronics e Intel competono con TSMC per la leadership nella produzione avanzata, sebbene entrambe siano rimaste indietro negli ultimi anni. Samsung gestisce importanti stabilimenti di fabbricazione in Corea del Sud e in Texas, producendo chip per vari clienti insieme ai propri prodotti. Intel, storicamente il leader tecnologico, ha lottato con ritardi nella produzione e ha perso quote di mercato prima di annunciare aggressivi piani di investimento sotto la guida del CEO Pat Gelsinger a partire dal 2021.\n\nLa Cina ha reso l'indipendenza dei semiconduttori una priorità nazionale, investendo oltre 150 miliardi di dollari attraverso il suo National Integrated Circuit Industry Investment Fund e altri programmi. Semiconductor Manufacturing International Corporation rappresenta il produttore nazionale più avanzato della Cina, sebbene rimanga diverse generazioni indietro rispetto a TSMC. I controlli sulle esportazioni americane imposti a partire da ottobre 2022 limitano l'accesso della Cina alle apparecchiature di produzione avanzate e ai progetti di chip, intensificando la pressione sullo sviluppo indigeno.\n\nL'industria automobilistica ha scoperto la sua pericolosa dipendenza dai semiconduttori durante la carenza globale di chip iniziata nel 2020. Quando i lockdown pandemici hanno interrotto le catene di approvvigionamento, le case automobilistiche hanno annullato gli ordini aspettandosi una debole domanda. Quando la domanda si è ripresa più velocemente del previsto, le fabbriche di semiconduttori avevano allocato la capacità ad altri clienti. General Motors, Ford e Toyota hanno chiuso le linee di produzione a intermittenza per oltre due anni in attesa dei chip. La carenza è costata all'industria automobilistica una perdita stimata di 210 miliardi di dollari di entrate.\n\nI governi di tutto il mondo hanno lanciato programmi massicci per costruire capacità di semiconduttori nazionali. Gli Stati Uniti hanno approvato il CHIPS and Science Act nell'agosto 2022, stanziando 52 miliardi di dollari per la produzione e la ricerca di semiconduttori. L'European Chips Act ha impegnato 43 miliardi di euro per obiettivi simili. Il Giappone ha annunciato 2 trilioni di yen in sussidi per attirare le fabbriche TSMC, Samsung e Micron. L'India ha lanciato un programma da 10 miliardi di dollari alla ricerca del suo primo stabilimento di fabbricazione avanzato.\n\nI chip di memoria rappresentano una categoria distinta di semiconduttori dominata da attori diversi rispetto ai processori logici. Samsung, SK Hynix della Corea del Sud e Micron degli Stati Uniti controllano il mercato DRAM per la memoria del computer. L'industria della memoria flash che memorizza i dati in smartphone e unità a stato solido coinvolge gli stessi attori coreani più il produttore giapponese Kioxia. I prezzi della memoria fluttuano notevolmente con i cicli di domanda e offerta, creando modelli di boom e crisi che complicano le decisioni di investimento.\n\nL'industria della progettazione di semiconduttori si è concentrata attorno a poche aziende leader che comandano enormi risorse. Nvidia, fondata da Jensen Huang nel 1993, si è trasformata da un'azienda di schede grafiche in una potenza dell'intelligenza artificiale con chip che alimentano i data center in tutto il mondo. La capitalizzazione di mercato della società ha superato il trilione di dollari nel giugno 2023. Qualcomm domina i processori mobili con tecnologia concessa in licenza a quasi tutti i produttori di smartphone. AMD è emersa come un serio concorrente di Intel nei personal computer e nei server sotto la guida del CEO Lisa Su.\n\nI fornitori di apparecchiature per semiconduttori formano uno strato critico ma spesso trascurato dell'ecosistema industriale. Applied Materials, Lam Research e KLA Corporation degli Stati Uniti forniscono apparecchiature di deposizione, incisione e ispezione essenziali per la produzione. Tokyo Electron del Giappone contribuisce con sistemi di rivestimento e pulizia. Queste aziende investono miliardi ogni anno in ricerca e sviluppo per spingere i confini della precisione della produzione.\n\nL'impronta ambientale della produzione di semiconduttori solleva preoccupazioni sulla sostenibilità che l'industria affronta sempre più. Un moderno stabilimento di fabbricazione consuma elettricità equivalente a una piccola città, con alcuni impianti a Taiwan che utilizzano tanta energia quanta quella di 300.000 case. Il consumo di acqua raggiunge milioni di galloni al giorno per i processi di raffreddamento e pulizia. L'industria si è impegnata ad adottare energia rinnovabile e al riciclo dell'acqua per ridurre l'impatto ambientale, con TSMC che si è impegnata a raggiungere emissioni nette pari a zero entro il 2050.\n\nLe tecnologie di packaging avanzate estendono le prestazioni dei semiconduttori oltre ciò che la sola miniaturizzazione dei transistor può ottenere. Le architetture Chiplet combinano più chip più piccoli in pacchetti che funzionano come singoli processori. L'impilamento tridimensionale posiziona i chip verticalmente collegati da pilastri microscopici. Queste tecniche consentono un miglioramento continuo anche se l'avvicinamento ai limiti atomici minaccia il ridimensionamento tradizionale. Gli ultimi processori AMD utilizzano design chiplet che riducono i costi di produzione migliorando le prestazioni.\n\nLe richieste di forza lavoro della produzione di semiconduttori creano sfide per l'espansione dell'industria. I tecnici qualificati che utilizzano le apparecchiature di fabbricazione richiedono anni di formazione. Gli ingegneri che progettano processi di nuova generazione hanno bisogno di lauree avanzate e competenze specialistiche. Gli Stati Uniti devono affrontare particolari carenze dopo decenni di declino della produzione. Le iniziative educative e le politiche di immigrazione determineranno se i paesi possono assumere personale per gli stabilimenti di fabbricazione che si stanno affrettando a costruire.\n\nLe preoccupazioni per la sicurezza pervadono l'industria dei semiconduttori poiché i chip diventano armi nella competizione tecnologica tra le nazioni. I sistemi di difesa dipendono da forniture di chip affidabili, prive di vulnerabilità nascoste. La prosperità economica richiede l'accesso alle tecnologie più avanzate per l'intelligenza artificiale, i veicoli autonomi e altre applicazioni emergenti. L'importanza strategica dei semiconduttori garantisce che i governi continueranno a investire pesantemente e a limitare le esportazioni per proteggere gli interessi nazionali percepiti.\n\nIl prossimo decennio determinerà se l'industria dei semiconduttori rimarrà concentrata nell'Asia orientale o si diversificherà a livello globale. Enormi investimenti in nuovi stabilimenti di fabbricazione richiederanno anni per diventare produttivi. Le sfide tecnologiche si moltiplicano man mano che i transistor si avvicinano ai limiti fisici fondamentali. Nuovi paradigmi di calcolo, tra cui l'elaborazione quantistica e i chip neuromorfici, possono alla fine integrare o sostituire i semiconduttori tradizionali. Qualunque direzione prenda l'industria, questi minuscoli chip rimarranno essenziali per la vita moderna nel prossimo futuro.",
    "wordCount": 1563,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Quando è stato dimostrato il primo transistor ai Bell Labs?",
        "options": [
          "23 dicembre 1945",
          "23 dicembre 1947",
          "23 dicembre 1950",
          "23 dicembre 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Quali aziende sono menzionate come produttori di chip di memoria? Seleziona tutte le opzioni applicabili.",
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
        "question": "TSMC produceva oltre il 90 percento dei chip più avanzati al mondo entro il 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Quanto costa una macchina per litografia ultravioletta estrema ASML (in milioni di dollari)?",
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
        "question": "Chi ha fondato TSMC nel 1987?",
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
        "question": "Quanti fondi ha stanziato il CHIPS and Science Act per i semiconduttori nell'agosto 2022?",
        "options": [
          "32 miliardi di dollari",
          "42 miliardi di dollari",
          "52 miliardi di dollari",
          "62 miliardi di dollari"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Quanto è costata all'industria la carenza di chip automobilistici in termini di mancati ricavi (in miliardi di dollari)?",
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
        "question": "La capitalizzazione di mercato di Nvidia ha superato il trilione di dollari nel giugno 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "A quale temperatura viene riscaldato il plasma nelle macchine EUV ASML?",
        "options": [
          "22.000 gradi Celsius",
          "120.000 gradi Celsius",
          "220.000 gradi Celsius",
          "1.400 gradi Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Quanti miliardi di transistor contengono i processori moderni?",
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
        "question": "Quando Jack Kilby ha inventato il circuito integrato presso la Texas Instruments?",
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
    "title": "L'Evoluzione dello Streaming Media",
    "content": "Lo streaming media ha trasformato radicalmente il modo in cui l'umanità fruisce di intrattenimento, istruzione e informazione, sostituendo i supporti fisici e le programmazioni radiotelevisive con l'accesso istantaneo a contenuti virtualmente illimitati da qualsiasi dispositivo connesso a Internet. Questa rivoluzione tecnologica, iniziata con clip video sgranate negli anni '90, ora offre film in ultra-alta definizione, concerti dal vivo ed esperienze interattive a miliardi di utenti in tutto il mondo. La storia dello streaming rivela come i progressi nella compressione, nella larghezza di banda e nei modelli di business si siano combinati per rimodellare interi settori.\n\nLe fondamenta tecniche dello streaming sono emerse dalla ricerca sulla compressione video e sui protocolli di rete durante gli anni '80 e '90. Gli ingegneri del Moving Picture Experts Group hanno sviluppato gli standard MPEG che hanno reso pratico il video digitale, con l'MPEG-1 che è apparso nel 1993 e l'MPEG-4 nel 1998. Questi algoritmi di compressione hanno ridotto i file video a dimensioni gestibili eliminando le informazioni ridondanti tra i fotogrammi e approssimando i dettagli che l'occhio umano non noterebbe. Senza tale compressione, lo streaming video richiederebbe una larghezza di banda di gran lunga superiore a quella che le reti potrebbero fornire.\n\nRealNetworks ha lanciato RealPlayer nel 1995, aprendo la strada allo streaming audio e video sulle prime connessioni internet. Il formato RealAudio dell'azienda ha permesso alle stazioni radio di trasmettere sul web per la prima volta. RealVideo è seguito nel 1997, anche se i video, delle dimensioni di un francobollo e a scatti, assomigliavano ben poco allo streaming moderno. Al suo apice intorno al 2000, RealPlayer era stato installato su oltre l'85% dei computer connessi a Internet.\n\nApple è entrata nell'arena dello streaming con QuickTime, originariamente rilasciato nel 1991 per riprodurre file video locali. L'azienda ha aggiunto funzionalità di streaming nel corso degli anni '90 e ha sfruttato la tecnologia quando ha lanciato iTunes nel gennaio 2001. Sebbene iTunes si concentrasse inizialmente sul download di musica piuttosto che sullo streaming, ha dimostrato l'appetito dei consumatori per l'accesso digitale istantaneo. Apple ha venduto oltre 70 milioni di canzoni attraverso iTunes nel suo primo anno.\n\nLa fondazione di YouTube nel febbraio 2005 da parte degli ex dipendenti di PayPal Chad Hurley, Steve Chen e Jawed Karim ha segnato l'inizio dell'era mainstream dello streaming video. La piattaforma ha reso semplice caricare e condividere video per gli utenti comuni senza competenze tecniche. Il primo video, che mostra Karim allo zoo di San Diego, è stato pubblicato il 23 aprile 2005. Google ha riconosciuto il potenziale di YouTube e ha acquisito l'azienda per 1,65 miliardi di dollari nell'ottobre 2006, appena diciotto mesi dopo la sua fondazione.\n\nNetflix è nata come servizio di noleggio di DVD via posta nel 1997, fondata da Reed Hastings e Marc Randolph a Scotts Valley, in California. L'azienda ha introdotto noleggi illimitati per un abbonamento mensile nel 1999, sfidando il modello di noleggio singolo di Blockbuster. Netflix ha lanciato lo streaming video nel gennaio 2007, inizialmente come complemento al suo servizio DVD. Gli abbonati potevano guardare una selezione limitata di film e programmi televisivi direttamente sui propri computer senza aspettare che arrivassero i dischi.\n\nLa transizione dai DVD allo streaming è accelerata nel corso degli anni 2010 con il miglioramento della velocità di internet e l'espansione delle librerie di contenuti. Netflix ha iniziato a produrre programmi originali con l'uscita di House of Cards nel febbraio 2013, che ha ricevuto il plauso della critica e ha dimostrato che le piattaforme di streaming potevano competere con le reti tradizionali per talento e qualità. L'azienda ha investito pesantemente in contenuti originali, spendendo oltre 17 miliardi di dollari all'anno in programmazione entro il 2022.\n\nSpotify ha rivoluzionato lo streaming musicale dopo che i suoi fondatori svedesi Daniel Ek e Martin Lorentzon hanno lanciato il servizio nell'ottobre 2008. La piattaforma offriva sia l'ascolto gratuito supportato dalla pubblicità che gli abbonamenti premium senza pubblicità. Spotify ha negoziato accordi di licenza con le principali case discografiche nonostante l'iniziale resistenza di un settore che si stava ancora riprendendo dall'impatto devastante della pirateria. Entro dicembre 2023, Spotify ha riportato 602 milioni di utenti attivi mensili e oltre 236 milioni di abbonati paganti.\n\nAmazon Prime Video è emerso dall'acquisizione da parte di Amazon nel 2006 del servizio video che è diventato Amazon Unbox. L'azienda ha raggruppato lo streaming video con l'abbonamento Prime a partire da febbraio 2011, aggiungendo valore all'abbonamento che in precedenza offriva solo spedizioni più veloci. Amazon ha iniziato a produrre contenuti originali nel 2013 e da allora ha vinto Emmy Awards e Academy Awards per le sue produzioni. La combinazione di streaming video con vantaggi per lo shopping crea vantaggi competitivi unici.\n\nDisney ha lanciato Disney Plus il 12 novembre 2019, sfruttando la sua vasta libreria di contenuti tra cui le proprietà Marvel, Star Wars, Pixar e National Geographic. Il servizio ha attirato 10 milioni di abbonati nel suo primo giorno, dimostrando il potere di franchise amati e di prezzi aggressivi. Disney Plus ha raggiunto oltre 160 milioni di abbonati in quattro anni, anche se l'azienda ha dovuto affrontare pressioni per raggiungere la redditività dopo le perdite iniziali dovute ai forti investimenti in contenuti.\n\nLo streaming live si è espanso oltre l'intrattenimento per comprendere giochi, istruzione, fitness e innumerevoli altri ambiti. Twitch, fondata nel 2011 e acquisita da Amazon per 970 milioni di dollari nel 2014, ha reso popolare lo streaming live di videogiochi. I giocatori professionisti trasmettono a milioni di spettatori guadagnando entrate attraverso abbonamenti e donazioni. La piattaforma ha registrato una media di oltre 31 milioni di visitatori giornalieri entro il 2023, rivaleggiando con le trasmissioni sportive tradizionali per il pubblico giovane.\n\nLe innovazioni tecniche continuano a migliorare la qualità e l'efficienza dello streaming. Lo streaming adattivo del bitrate regola automaticamente la qualità del video in base alla larghezza di banda disponibile, prevenendo il buffering e massimizzando la risoluzione quando le connessioni lo consentono. Le reti di distribuzione dei contenuti posizionano i server geograficamente vicini agli spettatori, riducendo la latenza e migliorando l'affidabilità. I miglioramenti dei codec tra cui H.265 e AV1 offrono una qualità superiore a bitrate inferiori, consentendo lo streaming 4K e 8K anche su connessioni limitate.\n\nL'infrastruttura che supporta i servizi di streaming richiede ingenti investimenti in data center e capacità di rete. La distribuzione dei contenuti di Netflix utilizza server posizionati all'interno delle reti dei fornitori di servizi internet, memorizzando localmente copie dei titoli più popolari per ridurre il trasferimento di dati a lunga distanza. Durante le ore serali di punta, lo streaming video rappresenta oltre il 60% del traffico internet in Nord America. Questa concentrazione ha suscitato dibattiti sulla neutralità della rete e sulla necessità che i servizi di streaming paghino per la consegna prioritaria.\n\nLo streaming musicale ha alterato radicalmente il modo in cui gli artisti guadagnano e come operano le case discografiche. Spotify paga agli artisti circa 0,003-0,005 dollari per stream, richiedendo milioni di riproduzioni per generare entrate significative. Questo modello favorisce gli artisti con un seguito ampio e coinvolto, rendendo più difficile per i musicisti emergenti sostenere le loro carriere. Taylor Swift ha notoriamente rimosso la sua musica da Spotify dal 2014 al 2017, protestando contro l'economia dello streaming prima di tornare finalmente.\n\nLo streaming di podcast è esploso da un medium di nicchia a una categoria di contenuti principale che attrae miliardi di investimenti. Spotify ha acquisito le società di podcast Gimlet Media e Anchor nel febbraio 2019 per circa 340 milioni di dollari combinati. Apple, che ha reso popolari i podcast attraverso l'integrazione di iTunes a partire dal 2005, deve affrontare una maggiore concorrenza da parte di Spotify e Amazon. Nel 2023 esistevano oltre 2 milioni di podcast con più di 48 milioni di episodi.\n\nLe guerre dello streaming si sono intensificate man mano che le tradizionali società di media hanno lanciato servizi concorrenti. HBO Max, Paramount Plus, Peacock e Apple TV Plus sono tutti entrati nel mercato tra il 2019 e il 2020. Questa frammentazione costringe i consumatori ad abbonarsi a più servizi per accedere a tutti i contenuti desiderati, ricreando ironicamente alcuni degli inconvenienti dei pacchetti televisivi via cavo che lo streaming inizialmente prometteva di eliminare. Gli analisti del settore prevedono un consolidamento man mano che i servizi più piccoli faticano a competere.\n\nL'espansione internazionale presenta sia opportunità che sfide per le piattaforme di streaming. Netflix opera in oltre 190 paesi e produce contenuti in dozzine di lingue. La serie coreana Squid Game è diventata lo show più visto di Netflix di sempre nel settembre 2021, dimostrando l'appetito globale per i contenuti non in lingua inglese. I concorrenti locali tra cui Hotstar in India, iQiyi in Cina e Globoplay in Brasile mantengono posizioni forti nei loro mercati domestici.\n\nLe preoccupazioni normative che circondano i servizi di streaming si moltiplicano man mano che diventano piattaforme di intrattenimento dominanti. Questioni relative alla privacy dei dati, alla moderazione dei contenuti, alle pratiche di lavoro e alla concentrazione del mercato attirano l'attenzione dei responsabili politici. L'Unione Europea richiede ai servizi di streaming di garantire che il 30% dei loro cataloghi sia costituito da opere europee. Alcuni paesi impongono tasse sugli abbonamenti di streaming per finanziare la produzione di contenuti locali.\n\nIl futuro dello streaming punta verso una maggiore interattività, immersione e personalizzazione. I servizi di cloud gaming di Microsoft, Sony e altri trasmettono in streaming videogiochi senza richiedere hardware costoso. Le esperienze di realtà virtuale potrebbero eventualmente essere trasmesse in streaming a visori leggeri. Gli algoritmi di intelligenza artificiale continueranno a perfezionare i consigli e potenzialmente a generare contenuti personalizzati. Qualunque siano le tecnologie specifiche che emergeranno, lo streaming ha trasformato in modo permanente la relazione tra creatori e pubblico in tutto il mondo.",
    "wordCount": 1603,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Quando Netflix ha lanciato il suo servizio di streaming video?",
        "options": [
          "Gennaio 2005",
          "Gennaio 2007",
          "Gennaio 2009",
          "Gennaio 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Quali aziende hanno fondato importanti piattaforme di streaming? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Chad Hurley ha co-fondato YouTube",
          "Reed Hastings ha co-fondato Netflix",
          "Daniel Ek ha co-fondato Spotify",
          "Bill Gates ha fondato Disney Plus"
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
        "question": "Google ha acquisito YouTube per 1,65 miliardi di dollari nell'ottobre 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Quanti milioni di abbonati ha riportato Spotify come abbonati paganti entro dicembre 2023?",
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
        "question": "Quando è stato caricato il primo video su YouTube?",
        "options": [
          "14 febbraio 2005",
          "23 aprile 2005",
          "4 luglio 2005",
          "9 ottobre 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Quanti abbonati ha attirato Disney Plus il suo primo giorno?",
        "options": [
          "1 milione",
          "5 milioni",
          "10 milioni",
          "20 milioni"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Quanto ha pagato Amazon per acquisire Twitch nel 2014 (in milioni di dollari)?",
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
        "question": "Netflix è nato come servizio di noleggio di DVD per posta nel 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Quale serie originale di Netflix è stata rilasciata nel febbraio 2013?",
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
        "question": "Quale percentuale del traffico internet in Nord America rappresenta lo streaming video durante le ore di punta?",
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
        "question": "Quale serie coreana è diventata lo show più visto di Netflix di sempre nel settembre 2021?",
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
    "title": "La Scienza dei Motori di Ricerca",
    "content": "I motori di ricerca sono diventati i principali punti di accesso attraverso cui l'umanità accede al vasto archivio di informazioni su Internet, elaborando miliardi di query ogni giorno e plasmando il modo in cui le persone scoprono, valutano e comprendono il mondo che le circonda. I sofisticati algoritmi che alimentano questi sistemi rappresentano alcuni dei software più complessi mai sviluppati, combinando tecniche di information retrieval, elaborazione del linguaggio naturale, machine learning e distributed computing. Comprendere come funzionano i motori di ricerca rivela sia le loro notevoli capacità sia la loro profonda influenza sulla conoscenza e sul comportamento umano.\n\nLe origini della ricerca sul web risalgono ai primi anni '90, quando Internet stava diventando troppo grande per directory curate manualmente. Archie, creato da Alan Emtage alla McGill University di Montreal nel 1990, indicizzava i nomi dei file sui server FTP ma non cercava pagine web. Il World Wide Web Wanderer, sviluppato da Matthew Gray al MIT nel 1993, divenne il primo web crawler, misurando la crescita di Internet visitando le pagine automaticamente. Questi strumenti primitivi hanno gettato le basi per sistemi più sofisticati.\n\nAltaVista fu lanciato nel dicembre 1995 e divenne rapidamente il motore di ricerca leader della sua epoca. Sviluppato da ricercatori della Digital Equipment Corporation a Palo Alto, in California, AltaVista era in grado di cercare in un database di 20 milioni di pagine web utilizzando l'indicizzazione full-text. Gli utenti si meravigliavano dei risultati che apparivano in pochi secondi per le query su milioni di documenti. Al suo apice nel 1997, AltaVista elaborava 80 milioni di query di ricerca al giorno.\n\nLarry Page e Sergey Brin crearono Google come progetto di ricerca presso la Stanford University nel 1996, introducendo l'algoritmo PageRank che avrebbe trasformato la ricerca. La loro intuizione fu che i collegamenti tra le pagine web contenevano informazioni preziose sulla pertinenza e l'autorità. Una pagina collegata da molte altre pagine, in particolare pagine importanti, dovrebbe avere una posizione più alta rispetto a una con pochi collegamenti. Questo approccio ha prodotto risultati nettamente migliori rispetto ai concorrenti che classificavano le pagine principalmente in base alla frequenza delle parole chiave.\n\nPageRank simula un navigatore web casuale che fa clic sui collegamenti in modo casuale e occasionalmente salta su una pagina completamente casuale. La probabilità che questo ipotetico navigatore visiti una particolare pagina diventa il suo punteggio PageRank. Le pagine che ricevono molti collegamenti da pagine PageRank elevate accumulano a loro volta punteggi più alti. Questo modello matematico, dettagliato nel documento del 1998 di Page e Brin pubblicato mentre erano studenti di dottorato, rimane fondamentale per il ranking di Google nonostante le numerose successive modifiche.\n\nIl processo di web crawling inizia con un elenco di URL noti che programmi automatizzati chiamati spider o crawler visitano. Il crawler scarica il contenuto di ogni pagina ed estrae tutti gli hyperlink che contiene. I nuovi URL vengono aggiunti alla coda per il futuro crawling. Il crawler di Google, originariamente chiamato BackRub e successivamente Googlebot, visita miliardi di pagine continuamente, dando la priorità ai siti aggiornati frequentemente e a quelli con molti collegamenti in entrata. Una scansione completa del web richiede settimane, anche se le pagine popolari vengono sottoposte a re-crawling molto più frequentemente.\n\nL'indicizzazione trasforma il contenuto grezzo della pagina web in dati strutturati che consentono un recupero rapido. I motori di ricerca costruiscono indici invertiti che mappano ogni parola all'elenco dei documenti che la contengono. Quando cerchi un termine, il motore cerca l'elenco di pubblicazione di quel termine anziché scansionare ogni documento. Strutture di dati aggiuntive archiviano informazioni sulle posizioni delle parole per la corrispondenza di frasi, il testo di ancoraggio dai collegamenti in entrata e metadati come i titoli delle pagine e le date di modifica.\n\nL'elaborazione delle query interpreta ciò che gli utenti desiderano effettivamente quando digitano i termini di ricerca. La comprensione del linguaggio naturale aiuta i motori di ricerca a riconoscere che una ricerca di scarpe da corsa probabilmente cerca prodotti piuttosto che informazioni sulle calzature che corrono. Il riconoscimento di entità identifica le ricerche di persone, luoghi, organizzazioni e concetti. L'espansione delle query aggiunge sinonimi e termini correlati per migliorare il richiamo. La correzione ortografica corregge gli errori di battitura prima di eseguire le ricerche, con Google che corregge circa il 10 percento di tutte le query.\n\nGli algoritmi di ranking combinano centinaia di segnali per determinare quali pagine rispondono meglio a ogni query. Oltre a PageRank, Google considera fattori tra cui la presenza di parole chiave in titoli e intestazioni, la freschezza dei contenuti, la compatibilità con i dispositivi mobili, la velocità di caricamento delle pagine e la pertinenza geografica. I modelli di machine learning addestrati su vasti set di dati del comportamento degli utenti hanno in gran parte sostituito le formule di ranking create manualmente. RankBrain, introdotto nel 2015, utilizza reti neurali per interpretare query ambigue e identificare risultati pertinenti.\n\nIl comportamento degli utenti fornisce un feedback cruciale che i motori di ricerca utilizzano per migliorare i ranking. I tassi di click-through indicano quali risultati gli utenti trovano promettenti. Il tempo trascorso sulle pagine dopo aver fatto clic suggerisce se i risultati hanno soddisfatto la query. Lo schema di ritorno ai risultati di ricerca e di clic su diversi collegamenti, chiamato pogo-sticking, indica che i risultati iniziali non sono stati utili. I motori di ricerca analizzano miliardi di tali segnali ogni giorno per affinare i loro algoritmi.\n\nI grafi di conoscenza rappresentano informazioni su entità e le loro relazioni in database strutturati. Il Knowledge Graph di Google, introdotto nel maggio 2012, contiene miliardi di fatti su persone, luoghi, cose e concetti. Quando cerchi una persona famosa, il pannello di conoscenza che appare accanto ai risultati attinge a questi dati strutturati. Wikidata, una knowledge base collaborativa gestita dalla Wikimedia Foundation, contribuisce in modo sostanziale a questi sistemi.\n\nGli snippet in primo piano e le risposte dirette mirano a soddisfare le query senza richiedere agli utenti di fare clic sui siti web. Google estrae passaggi pertinenti dalle pagine web e li visualizza in modo prominente per le domande. Gli assistenti vocali si affidano fortemente a queste risposte dirette poiché gli utenti non possono fare clic sui collegamenti sui dispositivi solo audio. Gli editori discutono se gli snippet in primo piano aiutino guidando il traffico o danneggino riducendolo, con alcuni che scelgono di non partecipare completamente alla selezione degli snippet.\n\nLa ricerca locale connette le query ad aziende e servizi nelle vicinanze. Quando qualcuno cerca caffetterie o idraulici, il motore di ricerca incorpora la loro posizione per mostrare opzioni locali pertinenti. I profili di Google My Business consentono alle aziende di fornire informazioni direttamente. Le recensioni aggregate da varie fonti aiutano gli utenti a scegliere tra le opzioni. La ricerca locale genera entrate sostanziali attraverso la pubblicità, con le aziende che pagano per apparire in modo prominente per le query commerciali.\n\nLa pubblicità di ricerca ha trasformato Google in una delle aziende più preziose al mondo. Gli inserzionisti fanno offerte sulle parole chiave, pagando solo quando gli utenti fanno clic sui loro annunci. Il sistema di aste di Google considera sia l'importo dell'offerta sia la qualità dell'annuncio per determinare quali annunci appaiono e in quale ordine. La pubblicità di ricerca ha generato oltre 162 miliardi di dollari di entrate per la società madre di Google, Alphabet, nel 2022. Questo modello di business crea incentivi per massimizzare il coinvolgimento degli utenti con i risultati di ricerca.\n\nLo spam e la manipolazione hanno afflitto i motori di ricerca fin dai loro primi giorni. Operatori di siti web senza scrupoli riempiono le pagine di parole chiave nascoste, creano reti di collegamenti artificiali e utilizzano innumerevoli altre tattiche per alterare i ranking. I motori di ricerca si impegnano in continue corse agli armamenti contro tale manipolazione. L'aggiornamento Penguin di Google nell'aprile 2012 ha penalizzato i siti con schemi di collegamento innaturali. L'azienda impiega migliaia di valutatori di qualità che valutano i risultati di ricerca secondo linee guida dettagliate.\n\nLe preoccupazioni per la privacy circondano i vasti dati che i motori di ricerca raccolgono sulle query e sul comportamento degli utenti. Le cronologie di ricerca rivelano problemi di salute, situazioni finanziarie, problemi di relazione e innumerevoli altri dettagli intimi. Google conserva i dati di ricerca collegati agli account per impostazione predefinita, utilizzandoli per la personalizzazione e il targeting pubblicitario. Alternative come DuckDuckGo si distinguono promettendo di non tracciare gli utenti, anche se sacrificano alcune funzionalità di personalizzazione.\n\nLa concorrenza nella ricerca è rimasta limitata nonostante il controllo normativo in tutto il mondo. Google detiene circa il 91 percento della quota di mercato globale della ricerca secondo i dati di StatCounter del 2023. Bing, il motore di ricerca di Microsoft, rivendica circa il 3 percento a livello globale, ma si comporta meglio negli Stati Uniti. Alternative regionali tra cui Baidu in Cina e Yandex in Russia dominano i loro mercati nazionali. L'Unione Europea ha multato Google per 2,42 miliardi di euro nel giugno 2017 per aver favorito il proprio servizio di confronto acquisti nei risultati di ricerca.\n\nL'intelligenza artificiale sta trasformando la ricerca attraverso modelli linguistici di grandi dimensioni che comprendono e generano il linguaggio naturale. Il rilascio di ChatGPT nel novembre 2022 ha suscitato preoccupazioni che l'intelligenza artificiale conversazionale potesse interrompere la ricerca tradizionale. Microsoft ha integrato GPT-4 in Bing nel febbraio 2023. Google ha risposto con Bard e successivamente Gemini. Questi sistemi possono sintetizzare informazioni da più fonti e impegnarsi nel dialogo, cambiando potenzialmente il modo in cui le persone trovano informazioni online.\n\nIl futuro della ricerca si estende oltre le query di testo a immagini, voce e input multimodali. Google Lens consente di cercare utilizzando le fotocamere degli smartphone, identificando oggetti, traducendo testo e risolvendo problemi di matematica dalle immagini. La ricerca vocale tramite altoparlanti intelligenti e smartphone rappresenta una quota crescente di query. I motori di ricerca devono adattarsi a nuovi dispositivi e modelli di interazione mantenendo la velocità e l'accuratezza che gli utenti si aspettano.",
    "wordCount": 1645,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Chi ha creato il primo web crawler chiamato World Wide Web Wanderer nel 1993?",
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
        "question": "Quali fattori considerano i motori di ricerca quando classificano le pagine? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Analisi dei link PageRank",
          "Freschezza dei contenuti",
          "Velocità di caricamento della pagina",
          "Solo dimensione del file"
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
        "question": "AltaVista elaborava 80 milioni di query di ricerca al giorno al suo picco nel 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Quale percentuale della quota di mercato globale della ricerca detiene Google secondo i dati del 2023?",
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
        "question": "Quando è stato introdotto il Knowledge Graph di Google?",
        "options": [
          "Maggio 2010",
          "Maggio 2012",
          "Maggio 2014",
          "Maggio 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "Quando l'aggiornamento Penguin di Google ha penalizzato i siti con schemi di link innaturali?",
        "options": [
          "Aprile 2010",
          "Aprile 2012",
          "Aprile 2014",
          "Aprile 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Quante entrate ha generato la pubblicità sui motori di ricerca per Alphabet nel 2022 (in miliardi di dollari)?",
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
        "question": "Google corregge circa il 10 percento di tutte le query di ricerca per errori di ortografia.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Quando Microsoft ha integrato GPT-4 in Bing?",
        "options": [
          "Novembre 2022",
          "Febbraio 2023",
          "Giugno 2023",
          "Ottobre 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Quanto ha multato l'Unione Europea Google nel giugno 2017 (in miliardi di euro)?",
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
        "question": "Quando è stato introdotto RankBrain da Google?",
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
        "question": "Quando è stato lanciato AltaVista?",
        "options": [
          "Dicembre 1993",
          "Dicembre 1995",
          "Dicembre 1997",
          "Dicembre 1999"
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
    "title": "Veicoli Autonomi e il Futuro dei Trasporti",
    "content": "I veicoli autonomi promettono di rivoluzionare i trasporti con una tecnologia di guida autonoma che potrebbe ridurre gli incidenti, trasformare i paesaggi urbani e alterare radicalmente il modo in cui l'umanità sposta persone e merci su distanze piccole e grandi. Questa ambiziosa visione ha attratto centinaia di miliardi di dollari di investimenti da case automobilistiche, giganti tecnologici e startup in corsa per risolvere le immense sfide tecniche, normative e sociali coinvolte. Il percorso verso veicoli veramente autonomi rivela lo stato attuale di questa tecnologia trasformativa e gli ostacoli che rimangono prima che le auto a guida autonoma diventino comuni.\n\nIl sogno dei veicoli a guida autonoma precede lo stesso computer digitale. Norman Bel Geddes presentò l'esposizione Futurama all'Esposizione Universale di New York del 1939, raffigurando autostrade automatizzate dove le auto avrebbero viaggiato in sicurezza senza intervento umano entro gli anni '60. General Motors, che sponsorizzò la mostra, in seguito collaborò con RCA per sviluppare la concept car Firebird IV nel 1964, dotata di sistemi di guida elettronici in grado di seguire cavi incorporati nella carreggiata. Queste prime visioni richiedevano modifiche all'infrastruttura piuttosto che intelligenza veicolare.\n\nLo sviluppo moderno dei veicoli autonomi è iniziato con le competizioni DARPA Grand Challenge che hanno catalizzato la ricerca accademica e industriale a partire dal 2004. La prima sfida, tenutasi nel deserto del Mojave, offrì un milione di dollari a qualsiasi veicolo in grado di completare un percorso di 241 chilometri (150 miglia) senza intervento umano. Ogni partecipante fallì, con il veicolo più lontano che percorse solo 11,9 chilometri (7,4 miglia) prima di rimanere bloccato. La sfida del 2005 vide cinque veicoli completare il percorso, con lo Stanley della Stanford University che vinse in 6 ore e 53 minuti.\n\nLa Society of Automotive Engineers definisce sei livelli di automazione della guida che sono diventati standard del settore. Il Livello 0 significa nessuna automazione, con gli umani che controllano tutte le attività di guida. Il Livello 1 include l'assistenza di base come il cruise control adattivo. Il Livello 2 combina più funzioni di assistenza, ma richiede la costante supervisione umana. Il Livello 3 consente al veicolo di gestire tutta la guida in condizioni limitate, mentre gli umani rimangono pronti a intervenire. Il Livello 4 raggiunge la piena automazione all'interno di domini operativi definiti. Il Livello 5 significa automazione completa in tutte le condizioni, corrispondente o superiore alla capacità umana ovunque.\n\nI sistemi di sensori forniscono ai veicoli autonomi le capacità di percezione necessarie per una navigazione sicura. Le telecamere catturano informazioni visive su corsie, segnali, semafori e altri utenti della strada. Il radar misura la velocità e la distanza degli oggetti vicini attraverso onde radio che funzionano indipendentemente dall'illuminazione o dalle condizioni meteorologiche. Il Lidar utilizza impulsi laser per creare mappe tridimensionali dettagliate dell'ambiente, con alcuni sistemi che generano oltre due milioni di punti dati al secondo. I sensori a ultrasuoni rilevano ostacoli a distanza ravvicinata durante le manovre di parcheggio.\n\nWaymo, la filiale di veicoli autonomi di Alphabet, è nata dal progetto di auto a guida autonoma di Google iniziato nel 2009. Sebastian Thrun, che ha guidato il team vincitore del DARPA di Stanford, ha diretto la ricerca iniziale. Il progetto ha accumulato milioni di chilometri di test in diversi stati prima che Waymo lanciasse il servizio di robotaxi commerciale a Phoenix, in Arizona, nel dicembre 2018. A ottobre 2023, i veicoli Waymo avevano percorso oltre 11,3 milioni di chilometri (7 milioni di miglia) su strade pubbliche senza conducenti di sicurezza, principalmente a Phoenix e San Francisco.\n\nTesla ha perseguito un approccio diverso all'autonomia attraverso i suoi sistemi Autopilot e Full Self-Driving. Invece del costoso lidar, Tesla si affida a telecamere e visione artificiale addestrata su dati provenienti da milioni di veicoli dei clienti. L'amministratore delegato Elon Musk ha ripetutamente predetto l'imminente piena autonomia, affermando nel 2016 che una Tesla si sarebbe guidata da sola da Los Angeles a New York entro il 2017. Questa previsione e molte successive non si sono concretizzate, anche se i veicoli Tesla offrono funzionalità di assistenza alla guida sempre più capaci.\n\nCruise, di proprietà maggioritaria di General Motors, ha gestito servizi di robotaxi a San Francisco fino a quando il California Department of Motor Vehicles ha revocato i suoi permessi nell'ottobre 2023 a seguito di un incidente in cui un veicolo ha colpito e trascinato un pedone. La società si era espansa in modo aggressivo, gestendo centinaia di veicoli in diverse città. La revoca del permesso ha evidenziato le sfide normative che deve affrontare il settore e la difficoltà di garantire la sicurezza su larga scala.\n\nLe aziende cinesi sono emerse come principali attori nello sviluppo di veicoli autonomi. La piattaforma Apollo di Baidu ha iniziato lo sviluppo nel 2017 e ha accumulato oltre 100 milioni di chilometri di test su strada. Pony.ai, fondata nel 2016, gestisce servizi di robotaxi in diverse città cinesi e in California. WeRide ha collaborato con Nissan e ha stabilito operazioni in Medio Oriente. Città cinesi tra cui Wuhan, Guangzhou e Shenzhen hanno autorizzato operazioni commerciali di robotaxi che coprono aree urbane significative.\n\nI sistemi di intelligenza artificiale che guidano i veicoli autonomi devono gestire una straordinaria complessità. Gli algoritmi di visione artificiale identificano e classificano migliaia di tipi di oggetti, da pedoni e ciclisti a cantieri e veicoli di emergenza. I modelli di previsione anticipano come si comporteranno gli altri utenti della strada nei prossimi secondi. Gli algoritmi di pianificazione scelgono traiettorie che raggiungono le destinazioni in modo sicuro ed efficiente. Tutti questi calcoli devono essere eseguiti in millisecondi tenendo conto dell'incertezza e di scenari rari.\n\nI casi limite presentano particolari sfide per i sistemi autonomi. Un sacchetto di plastica che vola attraverso un'autostrada e un bambino che corre in strada possono apparire simili ai sensori, ma richiedono risposte completamente diverse. Gli operai edili che dirigono il traffico con gesti delle mani annullano le normali regole del traffico. I veicoli di emergenza che si avvicinano da angolazioni oscurate richiedono un'azione immediata. I dati di addestramento non possono coprire ogni scenario, richiedendo ai veicoli di generalizzare in modo appropriato da esperienze simili.\n\nLa validazione della sicurezza pone domande fondamentali su come dimostrare che i veicoli autonomi sono pronti per la distribuzione. I conducenti umani hanno in media circa un incidente mortale ogni 161 milioni di chilometri (100 milioni di miglia) percorsi negli Stati Uniti. Dimostrare statisticamente che un sistema autonomo soddisfi o superi questo benchmark richiederebbe miliardi di chilometri di test, uno standard impraticabile. Le aziende impiegano invece la simulazione, i test su circuito chiuso e la distribuzione graduale monitorando continuamente le prestazioni nel mondo reale.\n\nI quadri normativi per i veicoli autonomi variano notevolmente tra le giurisdizioni. La California richiede alle aziende di segnalare i disimpegni quando i conducenti di sicurezza umani prendono il controllo. L'Arizona ha adottato un approccio permissivo che ha attratto attività di test. La Germania ha approvato una legge nel 2021 che consente veicoli di Livello 4 su strade pubbliche in condizioni specifiche. La Cina ha designato alcune città come zone di test con domini operativi in graduale espansione. Questo mosaico di regolamenti complica le strategie di implementazione internazionale.\n\nI potenziali vantaggi dei veicoli autonomi si estendono ben oltre la comodità. Gli incidenti automobilistici uccidono circa 1,35 milioni di persone in tutto il mondo ogni anno, con l'errore umano che contribuisce a oltre il 90% degli incidenti. I sistemi autonomi non si distraggono, non si affaticano né sono compromessi. Potrebbero ridurre drasticamente questo tributo se le loro prestazioni di sicurezza superano quelle dei conducenti umani. Il trasporto diventerebbe accessibile a persone anziane, disabili e giovani che attualmente non sono in grado di guidare da soli.\n\nLe implicazioni economiche del trasporto autonomo potrebbero rimodellare interi settori. I conducenti professionisti, inclusi camionisti, tassisti e addetti alle consegne, devono affrontare un potenziale licenziamento. Le società di ride-hailing come Uber e Lyft investono pesantemente nell'autonomia sperando di eliminare il loro costo più elevato. I modelli assicurativi devono adattarsi quando i conducenti umani non controllano più i veicoli. Gli urbanisti immaginano città con meno parcheggi e strade più strette poiché i veicoli autonomi condivisi riducono il numero totale di veicoli.\n\nLe applicazioni di autotrasporto potrebbero raggiungere la fattibilità commerciale prima dei robotaxi passeggeri grazie ad ambienti autostradali più prevedibili. Aurora, co-fondata da ex leader dei programmi autonomi di Google, Tesla e Uber, si concentra principalmente sul trasporto merci. TuSimple ha condotto corse autostradali completamente autonome tra Phoenix e Dallas prima che le difficoltà finanziarie costringessero a una ristrutturazione strategica nel 2023. Embark, Kodiak e numerose altre società perseguono applicazioni simili di autotrasporto a lungo raggio.\n\nLa tempistica per l'adozione diffusa dei veicoli autonomi rimane altamente incerta nonostante decenni di sviluppo e massicci investimenti. Proiezioni ottimistiche della metà degli anni 2010 prevedevano robotaxi onnipresenti entro l'inizio degli anni 2020. La realtà si è dimostrata molto più impegnativa del previsto. Gli esperti del settore ora generalmente si aspettano una distribuzione graduale nel corso di decenni piuttosto che una trasformazione improvvisa. La tecnologia probabilmente migliorerà gradualmente, espandendosi da domini operativi limitati verso capacità più ampie nel corso di molti anni.",
    "wordCount": 1503,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Quando si è tenuta la prima DARPA Grand Challenge?",
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
        "question": "Quali tipi di sensori utilizzano i veicoli autonomi? Seleziona tutte le opzioni applicabili.",
        "options": [
          "Telecamere",
          "Radar",
          "Lidar",
          "Sensori a raggi X"
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
        "question": "Il veicolo dell'Università di Stanford di nome Stanley ha vinto la DARPA Grand Challenge del 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Quanti milioni di miglia avevano percorso i veicoli Waymo senza conducenti di sicurezza entro ottobre 2023?",
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
        "question": "Quando Waymo ha lanciato il servizio commerciale di robotaxi a Phoenix?",
        "options": [
          "Dicembre 2016",
          "Dicembre 2018",
          "Dicembre 2020",
          "Dicembre 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Quanti livelli di automazione della guida definisce la Society of Automotive Engineers?",
        "options": [
          "Quattro",
          "Cinque",
          "Sei",
          "Sette"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Quante persone muoiono ogni anno in incidenti stradali in tutto il mondo (in milioni)?",
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
        "question": "L'errore umano contribuisce a oltre il 90% degli incidenti stradali.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Quando la Germania ha approvato una legislazione che consente ai veicoli di livello 4 sulle strade pubbliche?",
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
        "question": "Quante miglia ha percorso il veicolo più lontano nella DARPA Grand Challenge del 2004?",
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
        "question": "Quando è iniziato lo sviluppo della piattaforma di guida autonoma Apollo di Baidu?",
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
        "question": "Quando si è tenuta la mostra Futurama alla Fiera Mondiale?",
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
        "question": "Quanti punti dati al secondo possono generare alcuni sistemi lidar (in milioni)?",
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
        "question": "Quando il DMV della California ha revocato i permessi per i veicoli autonomi di Cruise?",
        "options": [
          "Ottobre 2022",
          "Ottobre 2023",
          "Gennaio 2023",
          "Giugno 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
