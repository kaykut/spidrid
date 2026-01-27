import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Cum Funcționează Internetul",
    "content": "Internetul conectează miliarde de dispozitive la nivel mondial printr-o rețea complexă de rețele care se întinde pe fiecare continent de pe Pământ. De fiecare dată când vizitați un site web, trimiteți un e-mail sau vizionați un videoclip în streaming, datele călătoresc prin această vastă infrastructură digitală în doar câteva milisecunde. Înțelegerea acestui sistem remarcabil ne ajută să apreciem tehnologia care a transformat comunicarea modernă.\n\nCând introduceți o adresă de site web în browserul dumneavoastră, începe instantaneu un proces complex. Calculatorul dumneavoastră contactează mai întâi un server DNS (Domain Name System), care traduce adresa lizibilă de către om într-o adresă IP numerică pe care o înțeleg computerele. Acest lucru funcționează similar cu căutarea unui număr de telefon într-un director, potrivind numele cu informațiile de contact reale.\n\nSolicitarea dumneavoastră călătorește apoi prin furnizorul dumneavoastră de servicii de internet (ISP) către rețelele magistrale care formează infrastructura principală a internetului. Aceste cabluri de fibră optică de înaltă capacitate se întind pe continente și traversează oceane la adâncimi care depășesc 6000 de metri. Ele transportă cantități enorme de date aproape de viteza luminii, gestionând peste 500 de trilioane de octeți de informații zilnic.\n\nDatele nu călătoresc ca o singură unitate prin internet. În schimb, acestea se sparg în pachete mici, fiecare conținând o parte din informație plus detalii de adresare. Aceste pachete pot urma rute diferite pentru a ajunge la destinație, găsind căi în jurul congestiei sau defecțiunilor. La destinație, acestea se reasamblează în ordinea corectă pentru a recrea mesajul original.\n\nRouterele servesc drept controlori de trafic ai internetului, luând decizii critice în fiecare moment. Aceste dispozitive specializate examinează destinația fiecărui pachet și determină cea mai bună cale de urmat. Ei iau aceste decizii de rutare de miliarde de ori pe secundă, menținând fluxul de date fără probleme prin rețele deținute de mii de organizații diferite.\n\nInternetul a început ca ARPANET în 1969, un proiect de cercetare militară al Statelor Unite conceput pentru a supraviețui întreruperilor de comunicare în timpul unor potențiale atacuri. Vint Cerf și Bob Kahn au dezvoltat protocoalele TCP/IP în anii 1970, creând fundamentul tehnic care stă la baza internetului și astăzi. Designul lor descentralizat asigură că niciun punct unic de defecțiune nu poate doborî întreaga rețea.\n\nTim Berners-Lee a inventat World Wide Web în 1989, în timp ce lucra la CERN în Elveția. El a creat sistemul de hyperlinkuri și browsere web care a făcut internetul accesibil tuturor. Web-ul a devenit disponibil publicului în august 1991, iar în decurs de un deceniu internetul s-a transformat dintr-un instrument de cercetare într-o platformă globală de comunicare folosită de sute de milioane de oameni.",
    "wordCount": 430,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Cine a inventat World Wide Web?",
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
        "question": "Cine a dezvoltat protocoalele TCP/IP? Selectați toate răspunsurile corecte.",
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
        "question": "Datele călătoresc pe internet ca fișiere complete individuale, în loc să fie împărțite în pachete.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "În ce an a început ARPANET, predecesorul internetului?",
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
    "title": "Ascensiunea Inteligenței Artificiale",
    "content": "Inteligența artificială a evoluat de la o fantezie science fiction la o tehnologie practică ce afectează aproape fiecare aspect al vieții moderne. De la asistenți pe smartphone la sisteme de diagnostic medical, IA realizează acum sarcini care odată necesitau inteligență umană. Această transformare reprezintă una dintre cele mai semnificative schimbări tehnologice de la inventarea informaticii în sine.\n\nConceptul de inteligență artificială a apărut la un atelier de lucru ținut la Dartmouth College în New Hampshire în timpul verii anului 1956. Informaticianul John McCarthy a inventat termenul și a adunat cercetători care credeau că mașinile pot fi făcute să simuleze inteligența umană. Acești pionieri își imaginau crearea unor mașini gânditoare într-o singură generație, deși progresul s-a dovedit a fi mult mai lent decât previziunile lor optimiste.\n\nCercetarea timpurie în IA s-a concentrat pe raționamentul simbolic, programând computerele cu reguli explicite despre cum să rezolve problemele. Cercetătorii au creat sisteme expert care codificau cunoștințe umane în arbori de decizie și reguli logice. Aceste sisteme au obținut rezultate impresionante în domenii restrânse precum șahul și diagnosticul medical, dar s-au luptat cu sarcini care necesitau bun simț sau gestionarea informațiilor ambigue.\n\nRevoluția învățării automate a început să transforme IA în anii 1990 și s-a accelerat dramatic după 2010. În loc să programeze reguli explicite, cercetătorii au antrenat algoritmi pentru a descoperi tipare în seturi mari de date. Rețelele neuronale, inspirate vag de structurile creierului biologic, s-au dovedit a fi deosebit de puternice în recunoașterea imaginilor, înțelegerea vorbirii și generarea de text asemănător celui uman.\n\nÎnvățarea profundă (deep learning) a apărut ca abordarea dominantă a IA după o descoperire epocală în 2012. Geoffrey Hinton și studenții săi de la Universitatea din Toronto au demonstrat că rețelele neuronale profunde cu multe straturi pot depăși dramatic metodele anterioare în sarcinile de recunoaștere a imaginilor. Sistemul lor a redus ratele de eroare cu mai mult de 40% în comparație cu cele mai bune abordări anterioare.\n\nAntrenarea sistemelor moderne de IA necesită resurse de calcul enorme și cantități vaste de date. Modelele lingvistice mari pot conține sute de miliarde de parametri și necesită mii de procesoare specializate care lucrează luni de zile. Companii de tehnologie precum Google, Microsoft și OpenAI au investit miliarde de dolari în construirea infrastructurii necesare pentru a antrena aceste sisteme din ce în ce mai performante.\n\nCapacitățile sistemelor de IA s-au extins remarcabil în ultimii ani. Sistemele de viziune computerizată pot identifica acum obiecte, fețe și activități în imagini cu o acuratețe supraumană. Procesarea limbajului natural a avansat până la punctul în care IA poate purta conversații nuanțate, scrie eseuri coerente și traduce între zeci de limbi. Sistemele de IA compun acum muzică, generează opere de artă și scriu cod informatic.\n\nIA alimentează deja multe servicii pe care oamenii le folosesc zilnic fără a fi conștienți. Algoritmii de recomandare sugerează videoclipuri pe YouTube și produse pe Amazon pe baza preferințelor învățate. Filtrele de e-mail utilizează învățarea automată pentru a separa mesajele importante de spam. Aplicațiile de navigare prezic modelele de trafic și sugerează rute optime. Asistenții vocali precum Siri și Alexa folosesc IA pentru a înțelege comenzile rostite.\n\nAsistența medicală reprezintă una dintre cele mai promițătoare aplicații ale inteligenței artificiale. Sistemele de IA pot analiza imagini medicale pentru a detecta cancerul mai devreme decât radiologii umani în unele cazuri. Descoperirea de medicamente utilizează învățarea automată pentru a identifica compuși promițători și pentru a prezice efectele acestora. Asistenții IA ajută medicii să fie la curent cu literatura medicală în expansiune rapidă și sugerează opțiuni de tratament bazate pe dovezi.\n\nÎngrijorările cu privire la siguranța IA și impactul societal au crescut odată cu capacitățile acesteia. Cercetătorii își fac griji cu privire la sistemele care urmăresc obiective în moduri neașteptate sau dăunătoare. Eticienii ridică întrebări despre părtinirea în sistemele de IA antrenate pe date istorice care reflectă prejudecățile umane. Economiștii dezbat modul în care automatizarea va afecta ocuparea forței de muncă, pe măsură ce IA preia sarcini efectuate anterior de lucrători umani.\n\nGuvernele din întreaga lume au început să elaboreze reglementări pentru inteligența artificială. Uniunea Europeană a adoptat o legislație cuprinzătoare privind IA în 2024, care clasifică sistemele după nivelul de risc și impune cerințe pentru aplicațiile cu risc ridicat. China a implementat reguli care guvernează algoritmii de recomandare și IA generativă. Statele Unite au emis ordine executive care abordează siguranța IA, dezbătând în același timp o legislație mai cuprinzătoare.\n\nViitorul inteligenței artificiale rămâne incert, dar pare probabil să aducă progrese rapide continue. Cercetătorii urmăresc inteligența artificială generală care ar putea egala capacitatea umană în toate sarcinile cognitive, deși estimările cu privire la momentul în care s-ar putea întâmpla acest lucru variază de la câțiva ani până la niciodată. Ceea ce pare sigur este că IA va continua să remodeleze industriile, creând noi posibilități și ridicând întrebări profunde despre relația dintre inteligența umană și cea a mașinilor.\n\nÎnțelegerea inteligenței artificiale a devenit o cunoștință esențială pentru a naviga în lumea modernă. Fie ca utilizatori, lucrători, cetățeni sau factori de decizie, oamenii au din ce în ce mai mult nevoie să înțeleagă ce poate și ce nu poate face IA. Această tehnologie va continua să evolueze, iar implicarea informată în dezvoltarea ei va contribui la asigurarea faptului că IA aduce beneficii umanității în general.",
    "wordCount": 865,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Unde și când a apărut termenul \"inteligență artificială\"?",
        "options": [
          "MIT în 1960",
          "Dartmouth College în 1956",
          "Universitatea Stanford în 1965",
          "Bell Labs în 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Care aplicații ale inteligenței artificiale în domeniul sănătății sunt menționate în articol? Selectați toate variantele aplicabile.",
        "options": [
          "Analizarea imaginilor medicale pentru a detecta cancerul",
          "Efectuarea intervențiilor chirurgicale robotizate",
          "Descoperirea de medicamente",
          "Sugestii pentru opțiuni de tratament"
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
        "question": "Cercetarea timpurie în domeniul inteligenței artificiale s-a concentrat în principal pe învățarea automată, mai degrabă decât pe raționamentul simbolic.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "În ce an au demonstrat Geoffrey Hinton și studenții săi o descoperire revoluționară în deep learning?",
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
        "question": "Cine a inventat termenul \"inteligență artificială\"?",
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
        "question": "Cu cât au redus rețelele neuronale profunde ratele de eroare în comparație cu metodele anterioare în 2012?",
        "options": [
          "Cu mai mult de 20%",
          "Cu mai mult de 30%",
          "Cu mai mult de 40%",
          "Cu mai mult de 50%"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "În ce an a adoptat Uniunea Europeană o legislație cuprinzătoare privind IA?",
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
    "title": "Securitatea Cibernetică: Protejarea Lumii Digitale",
    "content": "Securitatea cibernetică protejează computerele, rețelele și datele de atacurile digitale care amenință zilnic miliarde de oameni. Hackerii vizează totul, de la conturile bancare personale până la infrastructuri critice, cum ar fi rețelele electrice și spitalele. Domeniul a crescut de la o nișă de specialitate la una dintre cele mai importante discipline din tehnologia modernă.\n\nPrimul virus informatic major, numit Brain, a apărut în Pakistan în ianuarie 1986. Doi frați pe nume Basit și Amjad Farooq Alvi l-au creat pentru a urmări copiile ilegale ale software-ului lor medical. Virusul s-a răspândit lent prin dischetele infectate, având nevoie de luni pentru a ajunge la computerele din întreaga lume. Astăzi, malware-ul se răspândește pe internet în câteva secunde, infectând milioane de dispozitive înainte ca experții în securitate să poată răspunde.\n\nAtacurile de tip phishing rămân cea mai comună metodă pe care o folosesc infractorii pentru a fura informații sensibile. Aceste e-mailuri înșelătoare pretind că provin din surse de încredere, cum ar fi bănci, angajatori sau site-uri web populare. Aceștia păcălesc destinatarii să dea clic pe link-uri malițioase sau să introducă parole pe site-uri web false. FBI a raportat că atacurile de tip phishing au cauzat pierderi de peste 10 miliarde de dolari doar în 2022.\n\nRansomware reprezintă unul dintre cele mai distructive tipuri de atacuri cibernetice moderne. Acest software malițios criptează fișierele victimei și solicită plata pentru cheia de decriptare. Atacul WannaCry din mai 2017 a infectat peste 200.000 de computere din 150 de țări în doar patru zile. Spitalele din Regatul Unit au trebuit să anuleze mii de programări medicale și să redirecționeze ambulanțele către unități neafectate.\n\nParolele puternice stau la baza securității cibernetice personale. Experții în securitate recomandă utilizarea a cel puțin 12 caractere care combină litere mari, litere mici, numere și simboluri. Fiecare cont ar trebui să aibă o parolă unică pentru a preveni compromiterea mai multor servicii printr-o singură breșă. Managerii de parole îi ajută pe utilizatori să genereze și să stocheze parole complexe fără a le memora.\n\nAutentificarea cu doi factori adaugă un al doilea strat crucial de securitate dincolo de parole. Acest sistem necesită ceva ce știi, cum ar fi o parolă, plus ceva ce ai, cum ar fi un telefon care primește coduri de verificare. Chiar dacă hackerii vă fură parola, nu vă pot accesa contul fără al doilea factor. Google a raportat că autentificarea cu doi factori blochează 99,9% din atacurile automate asupra conturilor.\n\nCriptarea transformă datele în cod ilizibil pe care numai părțile autorizate îl pot decripta. Când vedeți o pictogramă cu lacăt în bara de adrese a browserului dvs., criptarea vă protejează conexiunea la acel site web. Criptarea end-to-end în aplicațiile de mesagerie asigură că numai dvs. și destinatarul dvs. puteți citi mesajele. Nici măcar compania care furnizează serviciul nu poate accesa conținutul criptat.\n\nGuvernele și corporațiile investesc miliarde în apărarea cibernetică. Agenția pentru Securitate Cibernetică și Securitatea Infrastructurii din Statele Unite, cunoscută sub numele de CISA, protejează rețelele federale și ajută companiile private să se apere împotriva atacurilor. Companiile mari de tehnologie angajează mii de cercetători în securitate care vânează vulnerabilități și dezvoltă măsuri de protecție.\n\nHackerii etici joacă un rol vital în îmbunătățirea securității prin găsirea punctelor slabe înainte ca infractorii să o facă. Companiile plătesc recompense cuprinse între sute și milioane de dolari pentru rapoartele privind vulnerabilități grave. Apple și-a lansat programul de recompense pentru bug-uri în 2016 și oferă acum până la 2 milioane de dolari pentru cele mai critice defecte de securitate ale iPhone-ului. Aceste programe transformă potențialii atacatori în apărători care consolidează infrastructura digitală.\n\nViitorul securității cibernetice se confruntă cu noi provocări din partea tehnologiilor emergente. Computerele cuantice ar putea în cele din urmă să spargă criptarea care protejează în prezent sistemele bancare, comunicațiile și secretele guvernamentale. Cercetătorii în securitate dezvoltă deja algoritmi rezistenți la cuante pentru a se pregăti pentru această amenințare. Inteligența artificială creează atât noi metode de atac, cât și noi capacități defensive într-o cursă tehnologică continuă.",
    "wordCount": 653,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Care a fost numele primului virus informatic major?",
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
        "question": "Conform Google, ce procentaj de atacuri automate blochează autentificarea cu doi factori?",
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
        "question": "Care sunt practicile recomandate pentru o securitate puternică a parolelor? Selectați toate variantele aplicabile.",
        "options": [
          "Folosirea a cel puțin 12 caractere",
          "Folosirea aceleiași parole pentru toate conturile",
          "Combinarea majusculelor, minusculelor, numerelor și simbolurilor",
          "Folosirea unui manager de parole"
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
        "question": "Atacul ransomware WannaCry a infectat computere în peste 150 de țări.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Câți bani au cauzat atacurile de tip phishing în pierderi în timpul anului 2022 (în miliarde de dolari)?",
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
    "title": "Internetul Lucrurilor: O Lume Conectată",
    "content": "Internetul Lucrurilor a țesut inteligența digitală în țesătura vieții de zi cu zi, conectând miliarde de dispozitive care simt, comunică și acționează fără intervenție umană. De la termostatele inteligente care învață preferințele tale până la senzorii industriali care monitorizează echipamentele pe continente întregi, această revoluție tehnologică extinde internetul dincolo de computere și telefoane, în lumea fizică. Înțelegerea acestui ecosistem interconectat dezvăluie atât posibilități remarcabile, cât și provocări semnificative care vor modela deceniile viitoare.\n\nKevin Ashton, un pionier britanic în tehnologie care lucra la Procter and Gamble, a inventat termenul Internet of Things în 1999, în timp ce dezvolta sisteme de identificare prin radiofrecvență pentru a urmări produsele prin lanțurile de aprovizionare. El a vizualizat computerele adunând informații despre lumea fizică independent, mai degrabă decât să se bazeze pe oameni pentru a introduce date. Această viziune a necesitat decenii pentru a se materializa, pe măsură ce senzorii au devenit mai ieftini, conectivitatea wireless s-a îmbunătățit, iar cloud computing-ul a oferit infrastructura pentru a procesa fluxuri vaste de date.\n\nNumărul de dispozitive conectate a crescut exponențial de când a început adoptarea comercială a IoT în jurul anului 2010. Analistii de la Statista au estimat 15,1 miliarde de dispozitive IoT la nivel mondial în 2020, proiectate să ajungă la 29 de miliarde până în 2030. Fiecare dispozitiv generează date continuu, creând fluxuri de informații care umbresc traficul tradițional de internet. O singură fabrică conectată ar putea produce terabytes de date de la senzori zilnic, de la mii de puncte de monitorizare.\n\nTehnologia casei inteligente reprezintă cea mai vizibilă aplicație de consum a principiilor IoT. Termostatul inteligent Nest Learning, introdus de fostul inginer Apple Tony Fadell în octombrie 2011, a fost pionierul adoptării mainstream a casei inteligente. Dispozitivul a observat când rezidenții erau acasă și preferințele lor de temperatură, apoi a ajustat automat încălzirea și răcirea pentru a economisi energie. Google a achiziționat Nest Labs pentru 3,2 miliarde de dolari în ianuarie 2014, semnalând angajamentul marilor companii de tehnologie față de această piață.\n\nAsistenții vocali au devenit hub-uri centrale pentru ecosistemele caselor inteligente. Amazon a lansat difuzorul Echo cu Alexa în noiembrie 2014, urmat de Google Home în 2016 și HomePod de la Apple în 2018. Aceste dispozitive răspund la comenzi vocale pentru a controla luminile, încuietorile, termostatele și sistemele de divertisment. Până în 2024, peste 200 de milioane de gospodării din întreaga lume dețineau boxe inteligente, folosindu-le pentru sarcini care variază de la setarea cronometrelor până la comandarea alimentelor.\n\nDispozitivele purtabile urmăresc valorile metrice de sănătate cu o sofisticare și acuratețe tot mai mari. Apple Watch, lansat în aprilie 2015, a evoluat de la un accesoriu de modă la un dispozitiv medical capabil să detecteze ritmuri cardiace neregulate și căderi. Un studiu publicat în New England Journal of Medicine în noiembrie 2019 a constatat că ceasul a identificat fibrilația atrială, o afecțiune cardiacă gravă, cu o acuratețe de 84%. Monitoarele continue de glucoză permit diabeticilor să urmărească glicemia fără înțepături în deget, transmițând datele către smartphone-uri și alertând utilizatorii cu privire la niveluri periculoase.\n\nIoT industrial, uneori numit Industrie 4.0, transformă producția cu o vizibilitate și un control fără precedent. Senzorii încorporați în utilaje detectează vibrații, temperaturi și consum de energie care indică defecțiuni iminente înainte de producerea defecțiunilor. General Electric a fost pionier în întreținerea predictivă prin platforma sa Predix, susținând că a economisit clienților miliarde de dolari prin evitarea timpilor de nefuncționare. Un singur motor cu reacție generează 10 terabytes de date în timpul unui zbor transatlantic, analizate continuu pentru a optimiza performanța și a programa întreținerea.\n\nAgricultura îmbrățișează IoT pentru a crește randamentele, reducând în același timp impactul asupra mediului. Senzorii de umiditate a solului declanșează irigarea numai atunci când plantele au nevoie de apă, reducând consumul cu până la 30% în comparație cu udarea programată. Dronele echipate cu camere multispectrale identifică stresul culturilor, infestările cu dăunători și deficiențele de nutrienți pe câmpuri vaste. John Deere, compania de echipamente agricole veche de 185 de ani, colectează acum date de la milioane de utilaje conectate și vinde servicii de analiză fermierilor alături de tractoare.\n\nOrașele inteligente implementează infrastructura IoT pentru a gestiona sistemele urbane mai eficient. Barcelona a implementat unul dintre cele mai cuprinzătoare programe de oraș inteligent începând cu 2012, instalând senzori în tot orașul pentru a monitoriza disponibilitatea locurilor de parcare, nivelurile coșurilor de gunoi, calitatea aerului și nevoile de irigare. Orașul susține economii anuale de 75 de milioane de dolari, îmbunătățind în același timp serviciile pentru rezidenți. Singapore, Copenhaga și Seul au întreprins inițiative similare, folosind senzori conectați pentru a optimiza fluxul de trafic, consumul de energie și răspunsul la situații de urgență.\n\nAplicațiile de asistență medicală se extind cu mult dincolo de dispozitivele purtabile în monitorizarea de la distanță a pacienților și în mediile clinice. Pacienții care se recuperează după o intervenție chirurgicală sau care gestionează afecțiuni cronice pot fi monitorizați acasă cu dispozitive conectate care alertează echipele de îngrijire cu privire la modificări îngrijorătoare. Spitalele urmăresc locația și starea echipamentelor critice în timp real. Studiile clinice utilizează dispozitive IoT pentru a colecta date mai precise despre sănătatea participanților între vizite. Pandemia COVID-19 a accelerat adoptarea tehnologiilor de monitorizare de la distanță care s-au confruntat anterior cu o acceptare lentă.\n\nProblemele de securitate care înconjoară dispozitivele IoT s-au dovedit a fi deranjant de valide. Mulți producători acordă prioritate caracteristicilor și prețurilor scăzute în detrimentul securității robuste, livrând dispozitive cu parole implicite și vulnerabilități necorectate. Atacul botnet Mirai din octombrie 2016 a deturnat sute de mii de camere web nesecurizate și DVR-uri pentru a lansa atacuri distribuite de refuz al serviciului care au perturbat site-uri web majore, inclusiv Twitter, Netflix și PayPal. Cercetătorii demonstrează în mod regulat vulnerabilități alarmante în monitoarele pentru bebeluși, mașini, dispozitive medicale și sisteme industriale.\n\nImplicațiile asupra confidențialității ale detectării omniprezente ridică întrebări profunde despre supraveghere și proprietatea datelor. Asistenții vocali înregistrează conversații în case. Tracker-ele de fitness dezvăluie detalii intime despre sănătate și rutinele zilnice. Mașinile conectate transmit date despre locație care dezvăluie unde merg șoferii și cum conduc. Companiile colectează aceste informații pentru îmbunătățirea serviciilor și publicitate direcționată, în timp ce guvernele solicită din ce în ce mai mult acces pentru aplicarea legii și scopuri de securitate națională.\n\nProvocările de interoperabilitate fragmentează peisajul IoT în ecosisteme incompatibile. Dispozitivele de la diferiți producători adesea nu pot comunica direct, necesitând ca consumatorii să aleagă platforme și să limiteze funcționalitatea. Protocolul Matter, lansat în noiembrie 2022 de un consorțiu care include Apple, Google, Amazon și Samsung, își propune să creeze un standard universal pentru dispozitivele pentru case inteligente. Această inițiativă reprezintă recunoașterea industriei că fragmentarea împiedică adoptarea și inovarea.\n\nEdge computing abordează limitările de latență și lățime de bandă ale trimiterii tuturor datelor IoT către servere cloud îndepărtate. Procesarea informațiilor local, pe sau lângă dispozitive, permite răspunsuri în timp real pentru aplicații precum vehicule autonome și robotică industrială. O mașină autonomă nu poate aștepta ca datele să călătorească către un server cloud și înapoi înainte de a decide să frâneze. Arhitecturile edge distribuie inteligența în rețele, mai degrabă decât să o concentreze în centre de date centralizate.\n\nRestricțiile de energie modelează designul și implementarea dispozitivelor IoT. Senzorii alimentați cu baterii trebuie să funcționeze ani de zile fără înlocuire în locații care pot fi inaccesibile sau periculoase. Tehnologiile de rețea cu rază lungă de acțiune cu consum redus de energie, cum ar fi LoRaWAN și Sigfox, permit dispozitivelor să comunice pe kilometri întregi, consumând în același timp energie minimă. Colectarea de energie din surse solare, termice sau cinetice permite unor dispozitive să funcționeze pe termen nelimitat fără baterii.\n\nAmprenta ecologică a miliardelor de dispozitive conectate necesită atenție pe măsură ce IoT se extinde. Fabricarea acestor produse consumă resurse și energie. Majoritatea dispozitivelor nu au prevederi pentru reciclarea componentelor electronice. Conectivitatea continuă la rețea necesită energie atât de la dispozitive, cât și de la infrastructură. Cu toate acestea, aplicațiile IoT în gestionarea energiei, agricultură și transport pot reduce impactul general asupra mediului atunci când sunt implementate cu atenție.\n\nViitorul IoT indică spre inteligența ambientală care anticipează nevoile și răspunde automat la condițiile în schimbare. Gemenii digitali creează replici virtuale ale sistemelor fizice pentru simulare și optimizare. Inteligența artificială aplicată datelor senzorilor permite predicții și automatizări dincolo de ceea ce ar putea realiza programarea explicită. Limita dintre lumea fizică și cea digitală continuă să se estompeze pe măsură ce inteligența conectată se răspândește în tot mediul pe care îl locuim.",
    "wordCount": 1392,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Cine a inventat termenul „Internetul Lucrurilor” în 1999?",
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
        "question": "Care companii au lansat dispozitive importante cu asistenți vocali? Selectați toate variantele aplicabile.",
        "options": [
          "Amazon cu Echo",
          "Google cu Google Home",
          "Apple cu HomePod",
          "Microsoft cu difuzorul Cortana"
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
        "question": "Atacul botnet Mirai din octombrie 2016 a deturnat sute de mii de camere web și DVR-uri nesecurizate.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Cât a plătit Google pentru a achiziționa Nest Labs în ianuarie 2014 (în miliarde de dolari)?",
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
        "question": "Când a fost lansat Apple Watch?",
        "options": [
          "Octombrie 2011",
          "Ianuarie 2014",
          "Aprilie 2015",
          "Noiembrie 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Care oraș a implementat unul dintre cele mai complete programe de oraș inteligent începând cu 2012?",
        "options": [
          "Singapore",
          "Barcelona",
          "Copenhaga",
          "Seul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Câte dispozitive IoT se estimează că vor exista la nivel mondial până în 2030 (în miliarde)?",
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
        "question": "Protocolul Matter a fost lansat pentru a crea un standard universal pentru dispozitivele inteligente pentru casă.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Cu ce acuratețe a identificat Apple Watch fibrilația atrială conform studiului din New England Journal of Medicine?",
        "options": [
          "74 la sută",
          "84 la sută",
          "94 la sută",
          "99 la sută"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Care aplicații IoT în agricultură sunt menționate? Selectați toate variantele aplicabile.",
        "options": [
          "Senzori de umiditate a solului pentru irigații",
          "Drone cu camere multispectrale",
          "Tractoare conectate cu analiză",
          "Recoltare robotică"
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
    "title": "Evoluția Rețelelor Sociale",
    "content": "Rețelele sociale au transformat modul în care oamenii comunică, împărtășesc informații și construiesc comunități, într-un mod pe care nimeni nu l-a prevăzut când internetul a apărut prima dată. Platformele care conectează miliarde de utilizatori au remodelat politica, comerțul, divertismentul și relațiile personale pe toate continentele. Istoria rețelelor sociale dezvăluie atât inovații remarcabile, cât și provocări profunde pentru societatea modernă.\n\nPrimele site-uri de socializare au apărut la sfârșitul anilor 1990, pe măsură ce internetul a devenit accesibil oamenilor obișnuiți. SixDegrees a fost lansat în 1997, permițând utilizatorilor să creeze profiluri și să se conecteze cu prietenii. Site-ul a atras aproximativ 3,5 milioane de membri înainte de a fi închis în 2001. Friendster a urmat în 2002, fiind pionier în funcții care aveau să devină standard în întreaga industrie. MySpace a dominat din 2005 până în 2008, devenind cel mai vizitat site web din Statele Unite și lansând carierele unor muzicieni precum Arctic Monkeys.\n\nFacebook a apărut dintr-o cameră de cămin a Universității Harvard în februarie 2004. Mark Zuckerberg și colegii săi de cameră au creat site-ul inițial doar pentru studenții universitari. Platforma s-a deschis tuturor celor cu vârsta de 13 ani și peste în septembrie 2006. Până în 2012, Facebook a atins un miliard de utilizatori activi lunar, un punct de referință pe care nicio rețea socială nu l-a mai atins. Compania operează acum ca Meta și raportează peste 3 miliarde de utilizatori lunari în întreaga sa familie de aplicații, inclusiv Instagram și WhatsApp.\n\nTwitter a introdus un nou format pentru comunicarea socială când a fost lansat în iulie 2006. Platforma a limitat postările la 140 de caractere, extinzându-se ulterior la 280, forțând utilizatorii să-și exprime gândurile concis. Twitter a devenit esențial pentru știri de ultimă oră, discurs politic și interacțiunea celebrităților. Serviciul a jucat roluri notabile în timpul protestelor Primăverii Arabe din 2011 și a modelat conversația publică pe nenumărate probleme de atunci.\n\nYouTube a revoluționat partajarea video după ce trei foști angajați PayPal l-au fondat în februarie 2005. Primul videoclip, intitulat \"Me at the zoo\", l-a arătat pe co-fondatorul Jawed Karim la grădina zoologică din San Diego timp de doar 18 secunde. Google a achiziționat YouTube pentru 1,65 miliarde de dolari în octombrie 2006. Astăzi, utilizatorii încarcă peste 500 de ore de conținut video în fiecare minut, iar platforma ajunge la mai mulți tineri cu vârste cuprinse între 18 și 49 de ani decât toate rețelele de televiziune prin cablu la un loc.\n\nInstagram a adus partajarea de fotografii pe dispozitivele mobile când Kevin Systrom și Mike Krieger l-au lansat în octombrie 2010. Aplicația a câștigat 25.000 de utilizatori în prima zi și a ajuns la un milion în două luni. Facebook a achiziționat Instagram pentru un miliard de dolari în aprilie 2012. Platforma a introdus Stories în 2016 și Reels în 2020, adaptând funcții popularizate de concurenți precum Snapchat și TikTok.\n\nTikTok a devenit cea mai rapidă platformă socială în creștere din istorie după lansarea sa internațională în 2017. Compania chineză ByteDance l-a creat prin fuziunea cu Musical.ly, o aplicație populară printre adolescenții americani. Algoritmul TikTok recomandă videoclipuri pe baza comportamentului de vizionare, mai degrabă decât pe baza relațiilor de urmărire, creând o experiență diferită față de platformele anterioare. Aplicația a atins un miliard de utilizatori lunari în septembrie 2021, atingând această bornă mai repede decât oricare predecesor.\n\nRețelele sociale au creat noi oportunități economice în valoare de miliarde de dolari anual. Influencerii câștigă venituri substanțiale prin parteneriate cu mărci și prin promovarea produselor către urmăritorii lor. Economia creatorilor a angajat aproximativ 50 de milioane de oameni la nivel mondial până în 2022. Întreprinderile mici folosesc platforme sociale pentru a ajunge la clienți fără publicitate tradițională costisitoare. Industrii întregi au apărut în jurul gestionării prezenței în social media pentru organizații și indivizi.\n\nPreocupările legate de sănătatea mintală din jurul rețelelor sociale au stârnit dezbateri intense între cercetători și factorii de decizie. Studiile leagă utilizarea intensă a rețelelor sociale de rate crescute de anxietate, depresie și singurătate, în special în rândul adolescenților. Dr. Jean Twenge de la Universitatea de Stat din San Diego a publicat cercetări în 2017 care arată scăderi accentuate ale sănătății mintale a adolescenților, care coincide cu adoptarea smartphone-urilor. Criticii susțin că corelația nu dovedește cauzalitatea și subliniază potențialele beneficii ale conexiunii online.\n\nDezinformarea se răspândește rapid prin rețelele sociale, punând la încercare ecosistemul informațional. Poveștile false călătoresc mai repede și ajung la mai mulți oameni decât rapoartele exacte, conform cercetărilor de la MIT publicate în Science în martie 2018. Platformele au implementat programe de verificare a faptelor, etichete de avertizare și modificări algoritmice pentru a combate conținutul înșelător. Aceste eforturi produc rezultate mixte și ridică întrebări despre cenzură și rolul companiilor de tehnologie în determinarea adevărului.\n\nPreocupările legate de confidențialitate au urmat rețelele sociale încă de la începuturi. Companiile colectează cantități mari de date personale pentru a viza publicitatea cu o precizie remarcabilă. Scandalul Cambridge Analytica din 2018 a dezvăluit că o firmă de consultanță politică a colectat date de la 87 de milioane de utilizatori Facebook fără consimțământ. Reglementări precum Regulamentul general european privind protecția datelor încearcă să ofere utilizatorilor mai mult control asupra informațiilor lor.\n\nViitorul rețelelor sociale continuă să evolueze rapid, pe măsură ce noile tehnologii și preferințele în schimbare remodelează peisajul. Platformele de realitate virtuală promit experiențe sociale mai captivante. Rețelele descentralizate construite pe tehnologia blockchain urmăresc să ofere utilizatorilor mai mult control. Tinerii preferă din ce în ce mai mult mesageria privată în locul postărilor publice. Indiferent de formele pe care le ia, conexiunea socială prin platforme digitale va rămâne esențială pentru comunicarea umană pentru generațiile viitoare.",
    "wordCount": 927,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Care a fost primul site de socializare menționat în articol?",
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
        "question": "Cât a plătit Google pentru a achiziționa YouTube în 2006?",
        "options": [
          "1 miliard de dolari",
          "1,65 miliarde de dolari",
          "2 miliarde de dolari",
          "10 miliarde de dolari"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Care platforme fac parte din familia de aplicații Meta? Selectați toate variantele aplicabile.",
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
        "question": "TikTok a atins un miliard de utilizatori lunari mai repede decât orice altă platformă de socializare dinaintea sa.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Câți utilizatori Facebook au avut datele colectate în scandalul Cambridge Analytica (în milioane)?",
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
        "question": "Când a atins Facebook un miliard de utilizatori activi lunar?",
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
    "title": "Revoluția intimității digitale",
    "content": "Intimitatea digitală a devenit una dintre problemele definitorii ale secolului XXI, deoarece companiile de tehnologie acumulează cantități fără precedent de informații personale, în timp ce guvernele își extind capacitățile de supraveghere la niveluri care ar fi părut distopice în urmă cu doar câteva decenii. Tensiunea dintre beneficiile serviciilor bazate pe date și riscurile monitorizării omniprezente modelează dezbaterile politice, modelele de afaceri și alegerile individuale de pe tot globul. Înțelegerea acestui peisaj complex necesită examinarea tehnologiilor care permit atât supravegherea, cât și protecția intimității, cadrele juridice care se luptă să țină pasul cu inovația și întrebările filozofice despre ceea ce înseamnă intimitatea într-o eră a conectivității omniprezente.\n\nConceptul de intimitate informațională a câștigat recunoaștere juridică cu mult înainte de era digitală. Juriștii americani Samuel Warren și Louis Brandeis și-au publicat articolul de referință din 1890 din Harvard Law Review, argumentând pentru dreptul de a fi lăsat în pace, ca răspuns la jurnalismul intruziv permis de camerele portabile. Acest text fundamental a stabilit intimitatea ca fiind distinctă de drepturile de proprietate și autonomia corporală. Brandeis a devenit ulterior judecător la Curtea Supremă și a scris opinii influente care extind protecțiile intimității împotriva intruziunilor guvernamentale.\n\nInternetul a transformat intimitatea dintr-un concept juridic abstract într-o preocupare practică zilnică. Utilizatorii web timpurii au partajat informații personale în mod obișnuit, fără a fi conștienți de modul în care ar putea fi colectate și utilizate. Cookie-urile, fișiere text mici stocate de browserele web, au permis site-urilor web să recunoască vizitatorii care se întorc începând cu 1994. Inginerul Netscape Lou Montulli a inventat cookie-urile pentru a rezolva problema tehnică a menținerii coșurilor de cumpărături, dar acestea au devenit rapid instrumente de supraveghere care urmăresc utilizatorii pe diferite site-uri web.\n\nGoogle a revoluționat publicitatea digitală conectând căutările la interesele utilizatorilor cu o precizie remarcabilă. Fondatorii companiei și-au exprimat inițial disconfortul față de modelele de afaceri susținute de publicitate, scriind în lucrarea lor academică din 1998 că publicitatea creează stimulente mixte pentru a prioritiza agenții de publicitate în detrimentul utilizatorilor. Cu toate acestea, Google AdWords a fost lansat în octombrie 2000, iar Google AdSense a urmat în 2003, creând infrastructura de publicitate țintită care ar genera sute de miliarde de dolari în venituri.\n\nFacebook a extins colectarea de date în relațiile sociale și comunicațiile personale. Platforma a fost lansată în februarie 2004 cu promisiunea de a conecta oamenii, dar modelul său de afaceri depindea de vânzarea de profiluri detaliate ale utilizatorilor către agenții de publicitate. Utilizatorii au partajat fotografii, date despre locație, opinii politice și statutul relației, adesea fără a înțelege modul în care aceste informații ar fi monetizate. Până în 2018, Facebook a colectat date despre aproximativ 2,2 miliarde de utilizatori din întreaga lume.\n\nScandalul Cambridge Analytica a explodat în conștiința publică în martie 2018, dezvăluind modul în care aplicațiile terțe puteau colecta date de la milioane de utilizatori Facebook fără știrea lor. Firma britanică de consultanță Cambridge Analytica a obținut informații personale de la 87 de milioane de utilizatori printr-o aplicație de test de personalitate care a exploatat permisiunile API ale Facebook. Compania a folosit aceste date pentru publicitate politică în timpul alegerilor prezidențiale din Statele Unite din 2016 și al referendumului Brexit. Facebook s-a confruntat cu investigații de reglementare pe mai multe continente și a plătit o amendă record de 5 miliarde de dolari Comisiei Federale pentru Comerț în iulie 2019.\n\nDezvăluirile lui Edward Snowden din iunie 2013 au expus amploarea supravegherii guvernamentale permisă de comunicațiile digitale. Fostul contractor al Agenției Naționale de Securitate a scurs documente clasificate jurnaliștilor Glenn Greenwald, Laura Poitras și Ewen MacAskill. Aceste documente au dezvăluit programe care colectează metadate telefonice de la milioane de americani, conectează cabluri de fibră optică care transportă comunicații internaționale și exploatează vulnerabilități în produsele tehnologice. Dezvăluirile au stârnit dezbateri globale despre echilibrul dintre securitate și intimitate.\n\nProgramul PRISM a permis NSA să colecteze date direct de pe serverele companiilor de tehnologie majore, inclusiv Google, Facebook, Apple și Microsoft. Companiile au negat inițial cunoașterea programului, deși rapoartele ulterioare au clarificat faptul că au respectat ordinele legale, luptând uneori împotriva supravegherii extinse în instanțe. Snowden a fugit în Hong Kong și a primit în cele din urmă azil în Rusia, unde a rămas în 2024. Statele Unite l-au acuzat de spionaj și furt de proprietate guvernamentală.\n\nCriptarea oferă principala apărare tehnică atât împotriva supravegherii guvernamentale, cât și a interceptării penale. Criptarea end-to-end asigură că numai expeditorul și destinatarul pot citi mesajele, chiar și furnizorul de servicii neavând acces la conținut. WhatsApp a implementat criptarea end-to-end pentru cei 1,5 miliarde de utilizatori ai săi în aprilie 2016, folosind protocolul Signal dezvoltat de criptograful Moxie Marlinspike. Apple criptează în mod similar comunicațiile iMessage și s-a opus public cererilor guvernamentale de acces prin uși din spate.\n\nAgențiile de aplicare a legii susțin că criptarea creează zone în care infractorii operează cu impunitate. FBI a dat în judecată Apple în februarie 2016 pentru a forța compania să ajute la deblocarea unui iPhone folosit de unul dintre atacatorii teroriști din San Bernardino. Apple a refuzat, argumentând că crearea unei uși din spate ar compromite securitatea pentru toți utilizatorii. În cele din urmă, FBI a plătit un contractor terț aproximativ un milion de dolari pentru a ocoli securitatea telefonului. Acest caz a ilustrat conflictul continuu dintre interesele de intimitate și securitate.\n\nUniunea Europeană a adoptat Regulamentul general privind protecția datelor, cunoscut în mod obișnuit sub denumirea de GDPR, care a intrat în vigoare la 25 mai 2018. Acest cadru cuprinzător a stabilit reguli stricte pentru colectarea, stocarea și prelucrarea datelor cu caracter personal ale rezidenților UE. Organizațiile trebuie să obțină consimțământul explicit înainte de a colecta date, să ofere acces la informațiile stocate și să șteargă datele la cerere. Încălcările pot duce la amenzi de până la 4% din veniturile anuale globale sau 20 de milioane de euro, oricare dintre acestea este mai mare. Amazon a primit cea mai mare amendă GDPR de 746 de milioane de euro în iulie 2021.\n\nCalifornia a adoptat Legea privind confidențialitatea consumatorilor din California, cu efect de la 1 ianuarie 2020, stabilind protecții similare pentru rezidenții statului. Legea acordă consumatorilor drepturi de a ști ce informații personale colectează companiile, de a șterge aceste informații și de a renunța la vânzarea acestora. Legea privind drepturile de confidențialitate din California, aprobată de alegători în noiembrie 2020, a consolidat și mai mult aceste protecții. Alte state, inclusiv Virginia, Colorado și Connecticut, au adoptat o legislație comparabilă, creând un mozaic de cerințe de confidențialitate în Statele Unite.\n\nBrokerii de date operează în mare parte în afara conștientizării publice, compilând profiluri detaliate din registre publice, istoricul achizițiilor, activitatea pe rețelele sociale și numeroase alte surse. Companii precum Acxiom, Experian și Oracle Data Cloud mențin baze de date care acoperă sute de milioane de persoane. Aceste profiluri influențează deciziile de credit, verificarea ocupării forței de muncă, ratele de asigurare și publicitatea țintită. Brokerii vând acces la aceste informații întreprinderilor, campaniilor politice și, uneori, actorilor rău intenționați.\n\nUrmărirea locației a devenit deosebit de controversată, deoarece smartphone-urile raportează continuu pozițiile utilizatorilor. Aplicațiile mobile solicită în mod obișnuit accesul la locație pentru funcționalități care variază de la prognoze meteo la recomandări de restaurante. Aceste date dezvăluie informații sensibile despre vizitele medicale, practicile religioase, activitățile politice și relațiile personale. Wall Street Journal a raportat în decembrie 2018 că zeci de companii primesc date precise despre locație de la aplicații populare, creând istorii complete de mișcare.\n\nTehnologia de recunoaștere facială ridică preocupări distincte legate de confidențialitate, permițând identificarea fără consimțământ sau conștientizare. Agențiile de aplicare a legii utilizează sisteme de la companii precum Clearview AI, care a extras miliarde de fotografii de pe rețelele sociale pentru a construi o bază de date care poate fi căutată. Mai multe orașe, inclusiv San Francisco, Boston și Portland, au interzis utilizarea guvernamentală a recunoașterii faciale. Uniunea Europeană a dezbătut restricții privind supravegherea biometrică în spațiile publice. China a implementat pe scară largă recunoașterea facială, folosind-o pentru măsuri de control social, în special vizând minoritățile uigure.\n\nDreptul de a fi uitat a apărut dintr-o hotărâre din 2014 a Curții Europene de Justiție, care impune Google să elimine anumite rezultate ale căutării la cerere. Mario Costeja Gonzalez, un cetățean spaniol, a argumentat cu succes că link-urile către articole de ziar din 1998 despre dificultățile sale financiare nu mai erau relevante. Google a procesat peste 1,6 milioane de cereri de eliminare care afectează aproape 6 milioane de adrese URL de la hotărâre. Criticii susțin că acest lucru echivalează cu cenzura, în timp ce susținătorii o consideră esențială pentru demnitatea personală și reabilitare.\n\nTehnologiile de protejare a confidențialității oferă alternative la economia de supraveghere. Rețelele private virtuale criptează traficul de internet și maschează locațiile utilizatorilor. Browserul Tor direcționează comunicațiile prin mai multe servere pentru a preveni urmărirea. Motoarele de căutare axate pe confidențialitate, cum ar fi DuckDuckGo, procesează interogările fără a colecta date personale. Signal oferă mesagerie criptată care colectează metadate minime. Aceste instrumente necesită o sofisticare tehnică care limitează adoptarea, dar demonstrează că serviciile care respectă confidențialitatea sunt fezabile din punct de vedere tehnic.\n\nIntimitatea copiilor primește o protecție juridică specială, având în vedere vulnerabilitatea și incapacitatea lor de a oferi un consimțământ semnificativ. Legea privind protecția confidențialității online a copiilor, adoptată în 1998, restricționează colectarea de informații personale de la copiii sub 13 ani în Statele Unite. TikTok a plătit 5,7 milioane de dolari în februarie 2019 pentru a soluționa acuzațiile de colectare ilegală a datelor copiilor. Codul de proiectare adecvat vârstei din Regatul Unit, cu efect din septembrie 2021, impune serviciilor online să ofere setări implicite de confidențialitate ridicată pentru utilizatorii sub 18 ani.\n\nViitorul intimității digitale depinde de inovația tehnologică, dezvoltarea reglementărilor și atitudinile culturale față de partajarea datelor. Sistemele de identitate descentralizate ar putea oferi persoanelor fizice controlul asupra informațiilor lor personale. Tehnicile de confidențialitate diferențială permit o analiză utilă a datelor, protejând în același timp înregistrările individuale. Convergența reglementărilor ar putea stabili standarde globale, mai degrabă decât abordări naționale fragmentate. Tensiunea fundamentală dintre utilitatea datelor și protecția intimității va persista, dar echilibrul dintre ele rămâne supus contestării democratice și alegerilor individuale.",
    "wordCount": 1670,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Când au publicat Samuel Warren și Louis Brandeis articolul lor important despre confidențialitate în Harvard Law Review?",
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
        "question": "Ce companii au fost dezvăluite ca fiind parte din programul NSA PRISM? Selectați toate variantele aplicabile.",
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
        "question": "Scandalul Cambridge Analytica a implicat date de la 87 de milioane de utilizatori Facebook.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Cât a plătit Facebook drept amendă FTC în iulie 2019 (în miliarde de dolari)?",
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
        "question": "Când a divulgat Edward Snowden documente clasificate NSA?",
        "options": [
          "Iunie 2011",
          "Iunie 2013",
          "Iunie 2015",
          "Iunie 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Când a intrat în vigoare GDPR?",
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
        "question": "Cât a fost amenda GDPR a Amazon în iulie 2021 (în milioane de euro)?",
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
        "question": "WhatsApp a implementat criptarea end-to-end pentru utilizatorii săi în aprilie 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Când a intrat în vigoare California Consumer Privacy Act?",
        "options": [
          "1 ianuarie 2018",
          "1 ianuarie 2019",
          "1 ianuarie 2020",
          "1 ianuarie 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Când a fost adoptată Children's Online Privacy Protection Act?",
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
        "question": "Cine a inventat cookie-urile web în 1994?",
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
        "question": "Când a fost lansat Google AdWords?",
        "options": [
          "Octombrie 1998",
          "Octombrie 2000",
          "Octombrie 2002",
          "Octombrie 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Cât a plătit TikTok în februarie 2019 pentru a soluționa acuzațiile privind datele copiilor (în milioane de dolari)?",
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
        "question": "San Francisco a interzis utilizarea tehnologiei de recunoaștere facială de către guvern.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Când a fost pronunțată hotărârea Curții Europene de Justiție privind dreptul de a fi uitat?",
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
        "question": "Ce jurnaliști au primit documentele divulgate de Edward Snowden? Selectați toate variantele aplicabile.",
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
    "title": "Lumea Revoluționară a Tehnologiei Blockchain",
    "content": "Tehnologia blockchain a evoluat de la un concept criptografic obscur într-o forță transformatoare care remodelează industrii cu mult dincolo de originile sale în monedele digitale. Acest sistem distribuit de evidență contabilă oferă transparență, securitate și descentralizare fără precedent, care contestă abordările tradiționale de păstrare a evidențelor și de încredere. Înțelegerea blockchain relevă de ce tehnologii îl consideră una dintre cele mai semnificative inovații de la apariția internetului.\n\nSatoshi Nakamoto, un individ sau grup cu pseudonim, a prezentat lumii blockchain-ul prin intermediul lucrării fundamentale Bitcoin, publicată pe 31 octombrie 2008. Calendarul s-a dovedit remarcabil de prevăzător, sosind la doar câteva săptămâni după ce colapsul Lehman Brothers a declanșat criza financiară globală. Nakamoto a propus un sistem electronic de numerar peer-to-peer care ar elimina necesitatea intermediarilor de încredere, precum băncile. Primul bloc Bitcoin, numit blocul genezei, a fost minat pe 3 ianuarie 2009, încorporând un titlu de ziar despre salvarea băncilor ca o amintire permanentă a motivațiilor tehnologiei.\n\nUn blockchain funcționează ca o bază de date distribuită, partajată între o rețea de computere numite noduri. Fiecare bloc conține o listă de tranzacții, un marcaj temporal și un hash criptografic care îl leagă de blocul precedent. Acest lanț de hash-uri face ca modificarea înregistrărilor istorice să fie practic imposibilă fără a controla majoritatea rețelei. Când cineva încearcă să schimbe o tranzacție veche, hash-ul se modifică, rupând lanțul și alertând alte noduri despre tentativa de manipulare.\n\nMecanismele de consens se asigură că toate nodurile sunt de acord cu conținutul blockchain-ului fără a necesita o autoritate centrală. Bitcoin folosește proof of work (dovada muncii), unde computerele concurează pentru a rezolva puzzle-uri matematice complexe. Primul care găsește o soluție câștigă dreptul de a adăuga următorul bloc și de a primi bitcoini nou creați ca recompensă. Acest proces, numit minare, a consumat aproximativ 127 de terawați-oră de electricitate în 2023, comparabil cu consumul anual de energie al Norvegiei.\n\nEthereum, lansat de programatorul Vitalik Buterin în iulie 2015, a extins blockchain-ul dincolo de simple tranzacții la contracte inteligente programabile. Aceste acorduri cu auto-execuție își aplică automat termenii atunci când sunt îndeplinite condiții predefinite. Un contract inteligent pentru imobiliare ar putea elibera plata către un vânzător și ar transfera proprietatea către un cumpărător simultan, odată ce ambele părți își îndeplinesc obligațiile. Nu este nevoie ca avocați, agenți de escrow sau bănci să verifice tranzacția.\n\nFinanțele descentralizate, numite în mod obișnuit DeFi, utilizează contracte inteligente pentru a recrea serviciile financiare tradiționale fără intermediari. Platformele de creditare permit utilizatorilor să împrumute criptomonede prin furnizarea de garanții, cu ratele dobânzilor determinate de algoritmi, mai degrabă decât de bancheri. Bursele descentralizate permit tranzacționarea directă între utilizatori, fără ca o companie să le dețină fondurile. La apogeul său din noiembrie 2021, protocoalele DeFi dețineau peste 180 de miliarde de dolari în active.\n\nToken-urile nefungibile, cunoscute sub numele de NFT-uri, aplică blockchain-ul proprietății digitale și provenienței. Fiecare NFT reprezintă un activ unic verificat pe blockchain, cel mai adesea artă digitală sau obiecte de colecție. Artistul digital Beeple a vândut o lucrare de artă NFT la casa de licitații Christie's în martie 2021 pentru 69,3 milioane de dolari, catapultând această tehnologie în conștientizarea mainstream. Criticii se întreabă dacă NFT-urile au o valoare durabilă, în timp ce susținătorii argumentează că schimbă fundamental modul în care creatorii monetizează lucrările digitale.\n\nGestionarea lanțului de aprovizionare oferă aplicații practice convingătoare pentru tehnologia blockchain. Companiile pot urmări produsele de la materiile prime prin producție până la rafturile de vânzare cu amănuntul cu înregistrări imuabile la fiecare pas. Walmart a colaborat cu IBM la un sistem blockchain care urmărește originea produselor alimentare în câteva secunde, mai degrabă decât săptămâna necesară anterior. Această capacitate se dovedește neprețuită în timpul rechemărilor de siguranță alimentară, când identificarea rapidă a loturilor contaminate salvează vieți.\n\nGuvernele explorează blockchain-ul pentru verificarea identității, sistemele de votare și înregistrările publice. Estonia, un pionier în guvernarea digitală, utilizează blockchain-ul pentru a securiza dosarele medicale, înregistrările de afaceri și documentele judiciare pentru cei 1,3 milioane de cetățeni ai săi. Secretarul de stat din West Virginia a efectuat un program pilot de votare bazat pe blockchain pentru personalul militar staționat în străinătate în timpul alegerilor de la jumătatea mandatului din 2018. Aceste experimente testează dacă tehnologia poate îmbunătăți, mai degrabă decât să amenințe, instituțiile democratice.\n\nPreocupările de mediu legate de blockchain au determinat o evoluție tehnologică semnificativă. Ethereum a trecut de la proof of work intensiv în energie la proof of stake (dovada mizării) în septembrie 2022, reducându-și consumul de energie electrică cu aproximativ 99,95%. Proof of stake selectează validatorii pe baza criptomonedei pe care o promit ca garanție, mai degrabă decât pe puterea de calcul. Această schimbare demonstrează că blockchain-ul își poate aborda amprenta de mediu, menținând în același timp securitatea.\n\nProvocările de scalabilitate limitează adoptarea blockchain-ului pentru tranzacțiile de zi cu zi. Bitcoin procesează aproximativ șapte tranzacții pe secundă, comparativ cu capacitatea rețelei Visa de 24.000. Soluțiile de stratul doi construiesc canale de plată mai rapide peste blockchain-urile existente. Lightning Network permite tranzacții Bitcoin aproape instantanee prin decontarea numai a soldurilor finale pe blockchain-ul principal. Aceste inovații își propun să facă blockchain-ul practic pentru achizițiile de zi cu zi.\n\nViitorul blockchain-ului se extinde în tărâmuri pe care creatorii săi nu le-au imaginat niciodată. Organizațiile autonome descentralizate, sau DAO-urile, utilizează votarea prin token-uri pentru a guverna comunitățile și a gestiona trezoreriile fără structuri corporative tradiționale. Sistemele de identitate digitală ar putea oferi persoanelor fizice control asupra datelor lor personale, dovedind în același timp acreditările angajatorilor, proprietarilor sau guvernelor. Rămâne incert dacă blockchain-ul își va îndeplini potențialul revoluționar sau se va stabili într-un rol de nișă, dar impactul său asupra tehnologiei și societății s-a dovedit deja substanțial și durabil.",
    "wordCount": 936,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Când a fost publicată lucrarea Bitcoin (whitepaper-ul)?",
        "options": [
          "3 ianuarie 2009",
          "31 octombrie 2008",
          "Iulie 2015",
          "Septembrie 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Care sunt menționate ca aplicații blockchain dincolo de criptomonede? Selectați toate cele care se aplică.",
        "options": [
          "Gestionarea lanțului de aprovizionare",
          "Identitate digitală",
          "Sisteme de vot",
          "Streaming video"
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
        "question": "Ethereum a făcut tranziția la proof of stake în septembrie 2022, reducând consumul de energie electrică cu 99,95%.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Pentru cât s-a vândut opera de artă NFT Beeple la Christie's în martie 2021 (în milioane de dolari)?",
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
        "question": "Cine a lansat Ethereum în iulie 2015?",
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
        "question": "Câte tranzacții pe secundă poate procesa rețeaua Bitcoin?",
        "options": [
          "Aproximativ 7",
          "Aproximativ 70",
          "Aproximativ 700",
          "Aproximativ 7.000"
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
    "title": "Revoluția Cloud Computing",
    "content": "Cloud computing a transformat fundamental modul în care companiile și indivizii utilizează tehnologia, mutând software-ul și stocarea de date de pe dispozitivele locale pe rețele vaste de servere la distanță. Această revoluție arhitecturală permite capabilități care păreau imposibile în urmă cu doar două decenii, de la streaming de divertisment până la servicii de inteligență artificială accesibile de pe orice dispozitiv. Cloud-ul a devenit atât de integrat în viața modernă încât majoritatea oamenilor îl folosesc zilnic fără a fi conștienți de acest lucru.\n\nAmazon Web Services a lansat primele sale produse cloud în martie 2006, fiind pionierul modelului infrastructure-as-a-service care avea să remodeleze industria tehnologiei. Compania construise o capacitate de calcul masivă pentru a gestiona perioadele de vârf de cumpărături, cum ar fi Black Friday, și și-a dat seama că ar putea închiria capacitatea neutilizată altor companii. Andy Jassy, care a condus AWS de la fondare, a transformat divizia într-un motor de profit care generează peste 80 de miliarde de dolari venit anual. Acest model de afaceri s-a dovedit atât de reușit încât concurenții s-au grăbit să-și construiască propriile platforme cloud.\n\nMicrosoft Azure a intrat pe piața cloud în februarie 2010, valorificând relațiile profunde ale companiei cu clienții enterprise. CEO-ul Satya Nadella, care a preluat conducerea în 2014, a pivotat strategia Microsoft în jurul serviciilor cloud. Azure a crescut și a devenit al doilea cel mai mare furnizor de cloud, alimentând totul, de la site-uri web pentru întreprinderi mici până la rețeaua profesională LinkedIn. Transformarea cloud a Microsoft a revitalizat o companie pe care mulți o considerau depășită.\n\nGoogle Cloud Platform aduce expertiza gigantului în căutări în domeniul calculului distribuit și al învățării automate clienților enterprise. Compania care indexează întregul internet și procesează miliarde de interogări de căutare zilnic oferă această infrastructură companiilor de toate dimensiunile. Investițiile Google în cabluri subacvatice și centre de date care se întind în zeci de țări permit accesul cu latență scăzută de aproape oriunde de pe Pământ. Platforma excelează în special în analiza datelor și sarcinile de lucru de inteligență artificială.\n\nCloud computing oferă trei modele principale de servicii care se suprapun unele peste altele ca straturi. Infrastructure as a Service oferă mașini virtuale, stocare și rețea pe care clienții le configurează singuri. Platform as a Service adaugă sisteme de operare, baze de date și instrumente de dezvoltare. Software as a Service oferă aplicații complete prin intermediul browserelor web, eliminând complet instalarea și întreținerea. Majoritatea oamenilor interacționează zilnic cu produsele SaaS prin e-mail, editare de documente și aplicații de afaceri.\n\nEconomia cloud computing creează avantaje pentru organizațiile de aproape orice dimensiune. Startup-urile se lansează fără a cumpăra hardware scump sau a angaja personal specializat pentru a menține centrele de date. Ele plătesc numai pentru resursele consumate, crescând capacitatea în perioadele aglomerate și scăzând-o în cele lente. Această flexibilitate a transformat economia lansării unei companii de tehnologie. Un serviciu care ar fi putut necesita investiții de milioane în infrastructură poate fi acum lansat cu capital minim.\n\nOrganizațiile enterprise migrează din ce în ce mai mult de la centrele de date on-premises la platformele cloud. General Electric a consolidat sute de centre de date într-o arhitectură cloud hibrid începând cu 2014. Capital One, una dintre cele mai mari bănci din America, a anunțat în 2020 că și-a închis ultimul centru de date după ce a migrat în întregime la AWS. Aceste transformări durează ani și costă miliarde de dolari, dar în cele din urmă reduc costurile, crescând în același timp capabilitățile.\n\nSecuritatea în cloud diferă fundamental de abordările tradiționale, dar adesea depășește ceea ce organizațiile realizează independent. Furnizorii importanți de cloud angajează mii de specialiști în securitate și investesc miliarde în tehnologii de protecție. Aceștia dețin certificări pentru gestionarea informațiilor guvernamentale clasificate și a datelor financiare sensibile. Modelele de responsabilitate partajată înseamnă că furnizorii securizează infrastructura, în timp ce clienții securizează propriile aplicații și configurații de date.\n\nDistribuția geografică a centrelor de date cloud servește unor scopuri dincolo de optimizarea performanței. Reglementările din multe țări impun ca anumite date să rămână în interiorul granițelor naționale. Furnizorii de cloud construiesc centre de date regionale pentru a respecta aceste cerințe de suveranitate. Clienții europeni se pot asigura că datele lor rămân în Frankfurt sau Amsterdam. Companiile australiene păstrează informațiile în interiorul țării lor. Această arhitectură distribuită oferă, de asemenea, capabilități de recuperare în caz de dezastru pe care puține organizații și le-ar putea permite independent.\n\nEdge computing extinde capabilitățile cloud mai aproape de locul de unde provin datele. În loc să trimită totul către centre de date îndepărtate, sistemele edge procesează informațiile local pentru aplicațiile care necesită răspuns imediat. Vehiculele autonome nu pot aștepta ca datele să parcurgă mii de kilometri înainte de a decide să frâneze. Senzorii industriali care analizează vibrațiile echipamentelor au nevoie de detectarea instantanee a anomaliilor. Edge computing aduce inteligența cloud în scenarii în care milisecundele contează.\n\nServerless computing reprezintă cea mai recentă evoluție a arhitecturii cloud. În acest model, dezvoltatorii scriu cod fără a gestiona deloc nicio infrastructură. Platformele cloud alocă automat resurse atunci când codul rulează și taxează numai pentru timpul efectiv de execuție. O funcție care rulează timp de 100 de milisecunde costă o fracțiune minusculă dintr-un cent. Aplicațiile pot scala de la zero la gestionarea a milioane de cereri fără nicio modificare a configurației.\n\nImpactul asupra mediului al cloud computing generează atât preocupări, cât și oportunități. Centrele de date consumă aproximativ 1,5% din energia electrică globală, iar această pondere continuă să crească. Cu toate acestea, furnizorii de cloud operează mult mai eficient decât centrele de date corporative tipice. Google susține că facilitățile sale ating o eficiență medie a utilizării energiei (PUE) de 1,1, comparativ cu media industriei de peste 1,5. Platformele cloud alimentează din ce în ce mai mult operațiunile cu energie regenerabilă, Microsoft angajându-se să fie negativă în emisii de carbon până în 2030.\n\nInteligența artificială și învățarea automată au devenit trăsături definitorii ale platformelor cloud. Modele pre-antrenate pentru recunoașterea imaginilor, procesarea limbajului natural și sinteza vorbirii sunt disponibile prin interfețe de programare simple. Organizațiile fără expertiză în învățarea automată pot adăuga capabilități sofisticate aplicațiilor lor. Furnizorii de cloud concurează agresiv pe caracteristicile AI, fiecare susținând avantaje în ceea ce privește acuratețea, ușurința de utilizare și amploarea modelelor disponibile.\n\nStrategiile multi-cloud permit organizațiilor să utilizeze mai mulți furnizori simultan, evitând dependența de un singur furnizor. Kubernetes, un sistem open-source de orchestrare a containerelor dezvoltat inițial de Google, permite mutarea sarcinilor de lucru între cloud-uri. Companiile selectează diferiți furnizori pentru diferite sarcini de lucru pe baza costului, performanței sau capabilităților specializate. Această flexibilitate necesită o complexitate suplimentară, dar reduce preocupările legate de blocarea furnizorului.\n\nViitorul cloud computing indică o integrare și mai mare cu viața de zi cu zi și operațiunile de afaceri. Resursele de calcul cuantic apar deja pe platformele cloud, deși aplicațiile practice rămân limitate. Inteligența artificială va automatiza mai mult gestionarea infrastructurii, reducând expertiza necesară pentru a implementa sisteme sofisticate. Linia dintre dispozitivele locale și resursele cloud se va estompa și mai mult pe măsură ce conectivitatea se îmbunătățește și edge computing se maturizează. Indiferent de tehnologiile specifice care vor apărea, schimbarea fundamentală de la infrastructura deținută la serviciile închiriate va continua să remodeleze modul în care omenirea calculează.",
    "wordCount": 1191,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Când a lansat Amazon Web Services primele sale produse cloud?",
        "options": [
          "Martie 2006",
          "Februarie 2010",
          "Ianuarie 2014",
          "Noiembrie 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Care sunt cele trei modele principale de servicii cloud menționate? Selectați toate variantele aplicabile.",
        "options": [
          "Infrastructură ca Serviciu",
          "Platformă ca Serviciu",
          "Software ca Serviciu",
          "Hardware ca Serviciu"
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
        "question": "Capital One a anunțat în 2020 că și-a închis ultimul centru de date după migrarea completă către AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Ce procent din electricitatea globală consumă centrele de date?",
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
        "question": "Care CEO a pivotat strategia Microsoft în jurul serviciilor cloud începând cu 2014?",
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
        "question": "Ce sistem open-source permite mutarea sarcinilor de lucru între diferiți furnizori de cloud?",
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
        "question": "Câte venituri anuale generează AWS (în miliarde de dolari)?",
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
        "question": "Până când s-a angajat Microsoft să fie negativ din punct de vedere al emisiilor de carbon?",
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
    "title": "Revoluția Calculului Cuantic",
    "content": "Calculul cuantic reprezintă cea mai profundă transformare în puterea de calcul de la inventarea tranzistorului, promițând să rezolve probleme care ar dura calculatoarelor clasice mai mult decât vârsta universului. Aceste mașini valorifică proprietățile bizare ale mecanicii cuantice pentru a efectua calcule în moduri fundamental noi, care sfidează intuiția de zi cu zi. Înțelegerea acestei tehnologii revoluționare dezvăluie atât potențialul său extraordinar, cât și provocările formidabile care rămân până când calculatoarele cuantice își ating pe deplin promisiunea.\n\nCalculatoarele clasice codifică informațiile ca biți care există fie ca zero, fie ca unu, în orice moment dat. Fiecare fotografie, document și videoclip de pe dispozitivele dvs. se reduce la șiruri lungi de aceste cifre binare manipulate prin operații logice. Această abordare a alimentat progrese remarcabile încă din anii 1940, procesoarele conținând acum miliarde de tranzistori pe cipuri mai mici decât o unghie. Totuși, anumite probleme rămân încăpățânat de neatins, deoarece numărul de calcule necesare crește exponențial cu dimensiunea problemei.\n\nCalculatoarele cuantice utilizează biți cuantici, numiți qubiți, care pot exista în superpoziție, reprezentând zero și unu simultan până la măsurare. Această proprietate permite sistemelor cuantice să exploreze multe soluții posibile simultan, mai degrabă decât să le verifice una câte una. Atunci când mai mulți qubiți devin întrepătrunși, măsurarea unuia îi afectează instantaneu pe ceilalți, indiferent de distanța fizică. Aceste fenomene cuantice permit algoritmi care depășesc dramatic abordările clasice pentru anumite tipuri de probleme.\n\nRichard Feynman, fizicianul laureat al Premiului Nobel, a propus conceptul de calcul cuantic în timpul unei prelegeri la California Institute of Technology în mai 1981. El a observat că simularea sistemelor mecanice cuantice pe calculatoare clasice necesita resurse care creșteau exponențial odată cu dimensiunea sistemului. Feynman a sugerat că doar un calculator mecanic cuantic ar putea simula eficient fizica cuantică. Această perspectivă a lansat un domeniu care s-ar dezvolta lent timp de decenii, înainte ca descoperirile recente să accelereze progresul.\n\nDavid Deutsch de la Universitatea Oxford a formalizat teoria calculului cuantic în 1985, descriind modul în care un calculator cuantic universal ar putea exploata superpoziția și interferența. Peter Shor de la Bell Labs a făcut calculul cuantic faimos în 1994, când a dezvoltat un algoritm care putea factoriza numere mari exponențial mai rapid decât orice metodă clasică cunoscută. Această descoperire a amenințat criptarea RSA care securizează comunicațiile pe internet, făcând brusc calculul cuantic o chestiune de securitate națională.\n\nConstruirea de calculatoare cuantice reale s-a dovedit extraordinar de dificilă, deoarece qubiții sunt fragili și ușor perturbați de mediul lor. Orice interacțiune cu lumea exterioară provoacă decoerență, prăbușind superpoziția și distrugând informațiile cuantice. Experimentele timpurii au menținut coerența doar pentru nanosecunde. Cercetătorii au dezvoltat tehnici elaborate de izolare, inclusiv circuite supraconductoare răcite la temperaturi mai reci decât spațiul cosmic, de obicei în jur de 15 milikelvin, abia peste zero absolut.\n\nIBM a plasat primul calculator cuantic accesibil prin intermediul cloud-ului, numit IBM Quantum Experience, online în mai 2016, permițând cercetătorilor și entuziaștilor din întreaga lume să experimenteze cu hardware cuantic real. Sistemul inițial conținea doar cinci qubiți, abia suficient pentru demonstrații simple. Până în 2023, IBM a implementat sisteme care depășesc 1.000 de qubiți și a anunțat planuri pentru sisteme de 100.000 de qubiți până în 2033. Aceste mașini rămân departe de a înlocui calculatoarele clasice, dar demonstrează un progres constant către utilitatea practică.\n\nGoogle a atins o piatră de hotar numită supremație cuantică în octombrie 2019, când procesorul său Sycamore de 53 de qubiți a efectuat un calcul în 200 de secunde, ceea ce ar dura celui mai rapid supercomputer din lume aproximativ 10.000 de ani. Criticii au contestat comparația, IBM argumentând că supercomputerele lor ar putea finaliza sarcina în zile, mai degrabă decât în milenii. Cu toate acestea, realizarea a demonstrat că calculatoarele cuantice ar putea depăși sistemele clasice cel puțin la unele sarcini.\n\nCorecția erorilor reprezintă probabil cel mai mare obstacol în calea calculului cuantic util. Qubiții fizici sunt prea zgomotoși și nesiguri pentru calcule complexe. Corecția cuantică a erorilor codifică un qubit logic pe mai mulți qubiți fizici pentru a detecta și remedia erorile, dar abordările actuale necesită mii de qubiți fizici per qubit logic. Un calculator cuantic care rezolvă probleme practice ar putea avea nevoie de milioane de qubiți fizici, cu mult peste capacitățile actuale.\n\nDiferite tehnologii concurează pentru a construi cei mai buni qubiți pentru viitoarele calculatoare cuantice. Circuitele supraconductoare, utilizate de IBM și Google, valorifică tehnicile de fabricație consacrate din industria semiconductorilor. Ionii prinși, urmăriți de IonQ și Honeywell, țin atomi încărcați în câmpuri electromagnetice cu o precizie excepțională. Sistemele fotonice codifică informațiile în particule de lumină care pot călători pe distanțe lungi fără decoerență. Qubiții topologici, încă în mare măsură teoretici, ar stoca informațiile în tipare rezistente la perturbații locale.\n\nAplicațiile de chimie cuantică pot oferi primele avantaje practice ale calculului cuantic. Simularea moleculelor pentru a proiecta noi medicamente, materiale și catalizatori necesită calcule mecanice cuantice care se extind exponențial pe calculatoarele clasice. Un calculator cuantic ar putea modela reacții chimice la nivel atomic, accelerând potențial descoperirea de medicamente, îngrășăminte și tehnologii de energie curată. Companii precum Roche, Merck și BASF au lansat programe de cercetare în calculul cuantic, anticipând aceste capacități.\n\nProblemele de optimizare care acoperă logistica, finanțele și învățarea automată reprezintă o altă zonă de aplicare promițătoare. Găsirea celei mai bune rute pentru camioanele de livrare, a portofoliilor optime pentru investitori sau a parametrilor ideali pentru rețelele neuronale implică căutarea în spații vaste de soluții. Revenirea cuantică, o formă specializată de calcul cuantic comercializată de D-Wave Systems din 2011, abordează direct optimizarea. Corporații majore, inclusiv Volkswagen, JPMorgan Chase și Lockheed Martin, au explorat optimizarea cuantică pentru provocări reale de afaceri.\n\nCriptografia se confruntă atât cu amenințări, cât și cu oportunități din avansul calculului cuantic. Algoritmul lui Shor ar putea sparge criptarea utilizată pe scară largă odată ce există calculatoare cuantice suficient de puternice. Institutul Național de Standarde și Tehnologie a selectat noi standarde criptografice post-cuantice în iulie 2022, după o competiție de șase ani pentru a identifica algoritmi rezistenți la atacurile cuantice. Între timp, distribuția cuantică a cheilor utilizează fizica măsurătorilor cuantice pentru a crea criptare teoretic inviolabilă pentru cele mai sensibile comunicații.\n\nChina a investit masiv în tehnologia cuantică, stabilind Universitatea de Știință și Tehnologie din China drept lider mondial sub conducerea fizicianului Pan Jianwei. În 2017, China a lansat Micius, un satelit care a demonstrat comunicații securizate cuantic între stațiile terestre separate de 1.200 de kilometri. Cercetătorii chinezi au revendicat supremația cuantică cu un sistem fotonic numit Jiuzhang în decembrie 2020. Statele Unite au răspuns cu Legea Națională a Inițiativei Cuantice din 2018, alocând 1,2 miliarde de dolari pe parcursul a cinci ani pentru a menține competitivitatea.\n\nIndustria calculului cuantic a atras investiții enorme, în ciuda cronologiilor incerte pentru rentabilități practice. Finanțarea prin capital de risc pentru startup-urile cuantice a depășit 2,5 miliarde de dolari în 2022. Companii tehnologice majore, inclusiv Microsoft, Amazon și Alibaba, au lansat servicii cloud cuantice alături de companii hardware dedicate. Analiștii proiectează că piața calculului cuantic va atinge 65 de miliarde de dolari până în 2030, deși estimările variază foarte mult, având în vedere incertitudinea tehnologică.\n\nViitorul calculului cuantic depinde de progresul susținut pe mai multe fronturi simultan. Hardware-ul trebuie să se îmbunătățească în ceea ce privește scala, coerența și conectivitatea. Software-ul trebuie să dezvolte algoritmi eficienți și instrumente de programare accesibile dincolo de specialiștii în fizică cuantică. Aplicațiile trebuie să demonstreze avantaje clare față de alternativele clasice pentru problemele din lumea reală. Călătoria de la demonstrațiile de laborator la utilitatea practică poate dura decenii, dar recompensele potențiale justifică investițiile și eforturile continue.",
    "wordCount": 1247,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Cine a propus conceptul de calcul cuantic în mai 1981?",
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
        "question": "Care tehnologii sunt menționate ca abordări pentru construirea de qubiți? Selectați toate variantele aplicabile.",
        "options": [
          "Circuite supraconductoare",
          "Ioni prinși în capcană",
          "Sisteme fotonice",
          "Tranzistori cu grafen"
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
        "question": "IBM a pus online primul computer cuantic accesibil prin cloud în mai 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Câte secunde i-a luat procesorului Sycamore de la Google să finalizeze calculul de supremație cuantică?",
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
        "question": "Când a dezvoltat Peter Shor faimosul său algoritm de factorizare?",
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
        "question": "La ce temperatură sunt răcite de obicei computerele cuantice supraconductoare?",
        "options": [
          "Aproximativ 100 kelvin",
          "Aproximativ 4 kelvin",
          "Aproximativ 15 millikelvin",
          "Aproximativ 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Câte fonduri a alocat National Quantum Initiative Act pe parcursul a cinci ani (în miliarde de dolari)?",
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
        "question": "China a lansat un satelit de comunicații cuantice numit Micius în 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Când a selectat NIST noile standarde criptografice post-cuantice?",
        "options": [
          "Iulie 2020",
          "Iulie 2021",
          "Iulie 2022",
          "Iulie 2023"
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
    "title": "Industria Globală a Semiconductorilor",
    "content": "Semiconductorii au devenit fundamentul civilizației moderne, alimentând totul, de la smartphone-uri și automobile, până la dispozitive medicale și sisteme militare de care națiunile depind pentru securitate. Aceste cipuri minuscule care conțin miliarde de tranzistori reprezintă cele mai complexe obiecte create vreodată de umanitate, produse prin procese care necesită o precizie măsurată în atomi. Competiția globală pentru controlul tehnologiei semiconductorilor a transformat această industrie într-un punct nevralgic al rivalității geopolitice, cu implicații pentru prosperitatea economică și securitatea națională la nivel mondial.\n\nCălătoria semiconductorilor a început la Bell Labs în New Jersey, pe 23 decembrie 1947, când fizicienii John Bardeen, Walter Brattain și William Shockley au demonstrat primul tranzistor. Acest dispozitiv putea amplifica semnalele electrice fără căldura și fragilitatea tuburilor vidate, câștigând inventatorilor săi Premiul Nobel pentru Fizică în 1956. Potențialul de miniaturizare al tranzistorului avea să permită în cele din urmă revoluția digitală care a remodelat societatea umană.\n\nJack Kilby de la Texas Instruments și Robert Noyce de la Fairchild Semiconductor au inventat independent circuitul integrat în 1958 și 1959, combinând mai mulți tranzistori pe o singură bucată de material semiconductor. Această descoperire a eliminat necesitatea cablării manuale a componentelor individuale și a permis fabricarea la scară largă. Kilby a primit Premiul Nobel pentru Fizică în 2000 pentru această contribuție care a făcut posibilă electronica modernă.\n\nGordon Moore, co-fondator al Intel, a observat în 1965 că numărul de tranzistori de pe circuitele integrate se dubla aproximativ la fiecare doi ani, în timp ce costurile rămâneau constante. Această observație, cunoscută sub numele de Legea lui Moore, a ghidat industria timp de șase decenii de îmbunătățire exponențială. Procesoarele moderne conțin peste 100 de miliarde de tranzistori, fiecare măsurând doar câțiva nanometri lățime, aproximativ lățimea a 20 de atomi de siliciu.\n\nProcesul de fabricare a semiconductorilor implică sute de pași care se întind pe luni de operațiuni precise. Inginerii încep cu cilindri de siliciu ultra-pur, crescuți din material topit la temperaturi care depășesc 1.400 de grade Celsius. Aceste lingouri sunt feliate în plăcuțe (wafere) subțiri și lustruite până la o netezime atomică. Fotolitografia proiectează modele de circuite pe plăcuțe folosind lumină ultravioletă, cele mai avansate mașini folosind lungimi de undă ultraviolete extreme de doar 13,5 nanometri.\n\nTaiwan Semiconductor Manufacturing Company, cunoscută sub numele de TSMC, a apărut ca cel mai important producător de semiconductori din lume. Fondată de Morris Chang în 1987, TSMC a fost pionierul modelului de turnătorie (foundry) de fabricare a cipurilor proiectate de alte companii. Până în 2023, TSMC a produs peste 90% din cele mai avansate cipuri din lume, inclusiv procesoare pentru Apple, AMD și Nvidia. Această concentrare a capacității pe o insulă care se confruntă cu revendicări teritoriale din partea Chinei a devenit o preocupare geopolitică majoră.\n\nEchipamentele necesare pentru fabricarea semiconductorilor avansați reprezintă o realizare tehnologică uluitoare. ASML, o companie olandeză, deține monopolul asupra mașinilor de litografie ultravioletă extremă, care costă aproximativ 200 de milioane de dolari fiecare și cântăresc 180.000 de kilograme. Aceste sisteme folosesc plasmă încălzită la 220.000 de grade Celsius pentru a genera lungimile de undă luminoase precise necesare. ASML a avut nevoie de contribuții de la furnizorul de optică Zeiss, dezvoltatorul de surse de lumină Cymer și numeroși alți parteneri pentru a atinge această capacitate după decenii de dezvoltare.\n\nSamsung Electronics și Intel concurează cu TSMC pentru conducerea în producția avansată, deși ambele au rămas în urmă în ultimii ani. Samsung operează fabrici majore de producție în Coreea de Sud și Texas, producând cipuri pentru diverși clienți alături de propriile sale produse. Intel, istoric liderul tehnologic, s-a confruntat cu întârzieri de producție și a pierdut cota de piață înainte de a anunța planuri agresive de investiții sub conducerea CEO-ului Pat Gelsinger, începând cu 2021.\n\nChina a făcut din independența semiconductorilor o prioritate națională, investind peste 150 de miliarde de dolari prin intermediul Fondului Național de Investiții pentru Industria Circuitelor Integrate și al altor programe. Semiconductor Manufacturing International Corporation reprezintă cel mai avansat producător intern al Chinei, deși rămâne cu câteva generații în urma TSMC. Controalele americane asupra exporturilor impuse începând cu octombrie 2022 restricționează accesul Chinei la echipamente de producție avansate și la proiectarea cipurilor, intensificând presiunea asupra dezvoltării indigene.\n\nIndustria auto și-a descoperit dependența periculoasă de semiconductori în timpul penuriei globale de cipuri care a început în 2020. Pe măsură ce blocajele cauzate de pandemie au perturbat lanțurile de aprovizionare, producătorii auto au anulat comenzile, așteptându-se la o cerere slabă. Când cererea și-a revenit mai repede decât se anticipase, fabricile de semiconductori alocaseră capacitatea altor clienți. General Motors, Ford și Toyota au închis intermitent liniile de producție timp de peste doi ani în timp ce așteptau cipuri. Penuria a costat industria auto aproximativ 210 miliarde de dolari în venituri pierdute.\n\nGuvernele din întreaga lume au lansat programe masive pentru a construi capacități interne de producție a semiconductorilor. Statele Unite au adoptat Legea CHIPS și Știință în august 2022, alocând 52 de miliarde de dolari pentru producția și cercetarea semiconductorilor. Actul european privind cipurile a angajat 43 de miliarde de euro pentru obiective similare. Japonia a anunțat subvenții de 2 trilioane de yeni pentru a atrage fabrici TSMC, Samsung și Micron. India a lansat un program de 10 miliarde de dolari care vizează prima sa fabrică de producție avansată.\n\nCipurile de memorie reprezintă o categorie distinctă de semiconductori, dominată de jucători diferiți față de procesoarele logice. Samsung, SK Hynix din Coreea de Sud și Micron din Statele Unite controlează piața DRAM pentru memoria computerelor. Industria memoriei flash care stochează date în smartphone-uri și unități SSD implică aceiași jucători coreeni plus producătorul japonez Kioxia. Prețurile memoriei fluctuează dramatic odată cu ciclurile cererii și ofertei, creând modele de boom și declin care complică deciziile de investiții.\n\nIndustria de proiectare a semiconductorilor s-a concentrat în jurul câtorva companii lider care comandă resurse enorme. Nvidia, fondată de Jensen Huang în 1993, s-a transformat dintr-o companie de plăci grafice într-o putere în domeniul inteligenței artificiale, cu cipuri care alimentează centre de date din întreaga lume. Capitalizarea de piață a companiei a depășit un trilion de dolari în iunie 2023. Qualcomm domină procesoarele mobile cu tehnologie licențiată pentru aproape fiecare producător de smartphone-uri. AMD a apărut ca un concurent serios pentru Intel în computerele personale și servere sub conducerea CEO-ului Lisa Su.\n\nFurnizorii de echipamente pentru semiconductori formează un nivel critic, dar adesea trecut cu vederea, al ecosistemului industrial. Applied Materials, Lam Research și KLA Corporation din Statele Unite furnizează echipamente de depunere, gravare și inspecție esențiale pentru producție. Tokyo Electron din Japonia contribuie cu sisteme de acoperire și curățare. Aceste companii investesc anual miliarde în cercetare și dezvoltare pentru a depăși limitele preciziei de fabricație.\n\nAmprenta ecologică a producției de semiconductori ridică probleme de sustenabilitate pe care industria le abordează din ce în ce mai mult. O fabrică de producție modernă consumă electricitate echivalentă cu un oraș mic, unele fabrici din Taiwan folosind la fel de multă energie ca 300.000 de locuințe. Consumul de apă atinge milioane de litri zilnic pentru procesele de răcire și curățare. Industria s-a angajat să adopte energie regenerabilă și să recicleze apa pentru a reduce impactul asupra mediului, TSMC angajându-se să atingă emisii nete zero până în 2050.\n\nTehnologiile avansate de ambalare extind performanța semiconductorilor dincolo de ceea ce miniaturizarea tranzistorilor singură poate realiza. Arhitecturile chiplet combină mai multe cipuri mai mici în pachete care funcționează ca procesoare unice. Stivuirea tridimensională plasează cipurile vertical conectate prin stâlpi microscopici. Aceste tehnici permit îmbunătățirea continuă, chiar și atunci când apropierea de limitele atomice amenință scalarea tradițională. Ultimele procesoare AMD folosesc modele chiplet care reduc costurile de producție, îmbunătățind în același timp performanța.\n\nCerințele de forță de muncă ale producției de semiconductori creează provocări pentru extinderea industriei. Tehnicienii calificați care operează echipamentele de fabricație necesită ani de formare. Inginerii care proiectează procese de generație următoare au nevoie de diplome avansate și expertiză specializată. Statele Unite se confruntă cu o penurie deosebită după decenii de declin al producției. Inițiativele educaționale și politicile de imigrație vor determina dacă țările pot dota fabricile de producție pe care se grăbesc să le construiască.\n\nPreocupările de securitate pătrund în industria semiconductorilor, deoarece cipurile devin arme în competiția tehnologică dintre națiuni. Sistemele de apărare depind de furnizarea de cipuri de încredere, fără vulnerabilități ascunse. Prosperitatea economică necesită accesul la cele mai avansate tehnologii pentru inteligența artificială, vehiculele autonome și alte aplicații emergente. Importanța strategică a semiconductorilor asigură că guvernele vor continua să investească masiv și să restricționeze exporturile pentru a proteja interesele naționale percepute.\n\nUrmătorul deceniu va determina dacă industria semiconductorilor rămâne concentrată în Asia de Est sau se diversifică la nivel global. Investițiile enorme în noi fabrici de producție vor dura ani pentru a deveni productive. Provocările tehnologice se multiplică pe măsură ce tranzistorii se apropie de limitele fizice fundamentale. Noi paradigme de calcul, inclusiv procesarea cuantică și cipurile neuromorfice, pot completa sau înlocui în cele din urmă semiconductorii tradiționali. Oricare ar fi direcțiile pe care le ia industria, aceste cipuri minuscule vor rămâne esențiale pentru viața modernă în viitorul apropiat.",
    "wordCount": 1489,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Când a fost demonstrat primul tranzistor la Bell Labs?",
        "options": [
          "23 decembrie 1945",
          "23 decembrie 1947",
          "23 decembrie 1950",
          "23 decembrie 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Care companii sunt menționate ca producători de cipuri de memorie? Selectați toate variantele aplicabile.",
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
        "question": "TSMC a produs peste 90% din cele mai avansate cipuri din lume până în 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Cât costă o mașină de litografie ultravioletă extremă ASML (în milioane de dolari)?",
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
        "question": "Cine a fondat TSMC în 1987?",
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
        "question": "Cât a alocat CHIPS and Science Act pentru semiconductori în august 2022?",
        "options": [
          "32 miliarde de dolari",
          "42 miliarde de dolari",
          "52 miliarde de dolari",
          "62 miliarde de dolari"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Cât a costat penuria de cipuri auto industria în pierderi de venituri (în miliarde de dolari)?",
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
        "question": "Capitalizarea bursieră a Nvidia a depășit un trilion de dolari în iunie 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "La ce temperatură este încălzită plasma în mașinile ASML EUV?",
        "options": [
          "22.000 de grade Celsius",
          "120.000 de grade Celsius",
          "220.000 de grade Celsius",
          "1.400 de grade Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Câte miliarde de tranzistori conțin procesoarele moderne?",
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
        "question": "Când a inventat Jack Kilby circuitul integrat la Texas Instruments?",
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
    "title": "Evoluția Media Streaming",
    "content": "Media streaming a transformat fundamental modul în care omenirea consumă divertisment, educație și informații, înlocuind suporturile fizice și programările de difuzare cu acces instantaneu la conținut practic nelimitat de pe orice dispozitiv conectat la internet. Această revoluție tehnologică, care a început cu clipuri video granulate în anii 1990, oferă acum filme de ultra-înaltă definiție, concerte live și experiențe interactive pentru miliarde de utilizatori din întreaga lume. Povestea streaming-ului dezvăluie modul în care progresele în compresie, lățime de bandă și modele de afaceri s-au combinat pentru a remodela industrii întregi.\n\nBazele tehnice ale streaming-ului au apărut din cercetări în compresia video și protocoalele de rețea în timpul anilor 1980 și 1990. Inginerii de la Moving Picture Experts Group au dezvoltat standardele MPEG care au făcut ca videoul digital să fie practic, cu MPEG-1 apărând în 1993 și MPEG-4 urmând în 1998. Acești algoritmi de compresie au redus fișierele video la dimensiuni gestionabile, eliminând informațiile redundante dintre cadre și aproximând detaliile pe care ochiul uman nu le-ar observa. Fără o astfel de compresie, streaming-ul video ar necesita o lățime de bandă care depășește cu mult ceea ce rețelele ar putea oferi.\n\nRealNetworks a lansat RealPlayer în 1995, fiind un pionier în streaming-ul audio și video prin conexiunile de internet timpurii. Formatul RealAudio al companiei a permis posturilor de radio să transmită pe web pentru prima dată. RealVideo a urmat în 1997, deși videoclipurile de dimensiunea unui timbru poștal, cu întreruperi, nu aveau nicio asemănare cu streaming-ul modern. La apogeul său, în jurul anului 2000, RealPlayer fusese instalat pe peste 85% dintre computerele conectate la internet.\n\nApple a intrat în arena streaming-ului cu QuickTime, lansat inițial în 1991 pentru redarea fișierelor video locale. Compania a adăugat capabilități de streaming pe parcursul anilor 1990 și a valorificat tehnologia la lansarea iTunes în ianuarie 2001. În timp ce iTunes s-a concentrat inițial pe descărcarea de muzică, mai degrabă decât pe streaming, a demonstrat apetitul consumatorilor pentru acces digital instantaneu. Apple a vândut peste 70 de milioane de melodii prin iTunes în primul său an.\n\nÎnființarea YouTube în februarie 2005 de către foștii angajați PayPal, Chad Hurley, Steve Chen și Jawed Karim, a marcat începutul erei mainstream a streaming-ului video. Platforma a făcut încărcarea și partajarea video simplă pentru utilizatorii obișnuiți, fără expertiză tehnică. Primul videoclip, în care apărea Karim la grădina zoologică din San Diego, a fost publicat pe 23 aprilie 2005. Google a recunoscut potențialul YouTube și a achiziționat compania pentru 1,65 miliarde de dolari în octombrie 2006, la doar optsprezece luni de la înființare.\n\nNetflix a început ca un serviciu de închiriere de DVD-uri prin poștă în 1997, fondat de Reed Hastings și Marc Randolph în Scotts Valley, California. Compania a introdus închirieri nelimitate pentru o taxă de abonament lunar în 1999, contestând modelul de închiriere pe unitate al Blockbuster. Netflix a lansat streaming-ul video în ianuarie 2007, inițial ca un complement la serviciul său de DVD-uri. Abonații puteau viziona o selecție limitată de filme și emisiuni de televiziune direct pe computerele lor, fără a aștepta sosirea discurilor.\n\nTranziția de la DVD-uri la streaming s-a accelerat de-a lungul anilor 2010 pe măsură ce vitezele internetului s-au îmbunătățit și bibliotecile de conținut s-au extins. Netflix a început să producă programare originală odată cu lansarea serialului House of Cards în februarie 2013, care a primit aprecieri critice și a demonstrat că platformele de streaming pot concura cu rețelele tradiționale pentru talent și calitate. Compania a investit masiv în conținut original, cheltuind peste 17 miliarde de dolari anual pe programare până în 2022.\n\nSpotify a revoluționat streaming-ul de muzică după ce fondatorii săi suedezi, Daniel Ek și Martin Lorentzon, au lansat serviciul în octombrie 2008. Platforma a oferit atât ascultare gratuită cu suport publicitar, cât și abonamente premium fără reclame. Spotify a negociat acorduri de licențiere cu marile case de discuri, în ciuda rezistenței inițiale dintr-o industrie care încă se recupera după impactul devastator al pirateriei. Până în decembrie 2023, Spotify a raportat 602 milioane de utilizatori activi lunar și peste 236 de milioane de abonați plătitori.\n\nAmazon Prime Video a apărut din achiziția de către Amazon în 2006 a serviciului video care a devenit Amazon Unbox. Compania a grupat streaming-ul video cu abonamentul Prime începând cu februarie 2011, adăugând valoare abonamentului care anterior oferea doar livrare mai rapidă. Amazon a început să producă conținut original în 2013 și de atunci a câștigat premii Emmy și premii Oscar pentru producțiile sale. Combinația dintre streaming-ul video și beneficiile de cumpărături creează avantaje competitive unice.\n\nDisney a lansat Disney Plus pe 12 noiembrie 2019, valorificând vasta sa bibliotecă de conținut, inclusiv proprietățile Marvel, Star Wars, Pixar și National Geographic. Serviciul a atras 10 milioane de abonați în prima zi, demonstrând puterea francizelor îndrăgite și a prețurilor agresive. Disney Plus a ajuns la peste 160 de milioane de abonați în patru ani, deși compania s-a confruntat cu presiuni pentru a obține profitabilitate după pierderile inițiale din investițiile masive în conținut.\n\nStreaming-ul live s-a extins dincolo de divertisment pentru a include jocuri, educație, fitness și nenumărate alte domenii. Twitch, fondată în 2011 și achiziționată de Amazon pentru 970 de milioane de dolari în 2014, a popularizat streaming-ul live de jocuri video. Jucătorii profesioniști transmit către milioane de spectatori, câștigând venituri prin abonamente și donații. Platforma a avut o medie de peste 31 de milioane de vizitatori zilnici până în 2023, rivalizând cu transmisiunile sportive tradiționale pentru publicul tânăr.\n\nInovațiile tehnice continuă să îmbunătățească calitatea și eficiența streaming-ului. Streaming-ul cu rată de biți adaptabilă ajustează automat calitatea video în funcție de lățimea de bandă disponibilă, prevenind buffering-ul și maximizând în același timp rezoluția atunci când conexiunile permit. Rețelele de livrare a conținutului poziționează serverele geografic aproape de spectatori, reducând latența și îmbunătățind fiabilitatea. Îmbunătățirile aduse codec-urilor, inclusiv H.265 și AV1, oferă o calitate superioară la rate de biți mai mici, permițând streaming-ul 4K și 8K chiar și pe conexiuni limitate.\n\nInfrastructura care susține serviciile de streaming necesită investiții masive în centre de date și capacitate de rețea. Livrarea de conținut Netflix utilizează servere poziționate în rețelele furnizorilor de servicii de internet, stocând copii ale titlurilor populare la nivel local pentru a reduce transferul de date pe distanțe lungi. În timpul orelor de vârf de seară, streaming-ul video reprezintă peste 60% din traficul de internet în America de Nord. Această concentrare a stârnit dezbateri despre neutralitatea rețelei și dacă serviciile de streaming ar trebui să plătească pentru livrarea prioritară.\n\nStreaming-ul de muzică a modificat fundamental modul în care artiștii obțin venituri și modul în care operează casele de discuri. Spotify plătește artiștilor aproximativ 0,003 până la 0,005 dolari per stream, necesitând milioane de redări pentru a genera venituri semnificative. Acest model favorizează artiștii cu urmăritori numeroși și implicați, făcând în același timp mai dificil pentru muzicienii emergenți să își susțină carierele. Taylor Swift și-a retras în mod faimos muzica de pe Spotify din 2014 până în 2017, protestând împotriva economiei streaming-ului înainte de a se întoarce în cele din urmă.\n\nStreaming-ul de podcast-uri a explodat dintr-un mediu de nișă într-o categorie majoră de conținut, atrăgând miliarde de investiții. Spotify a achiziționat companiile de podcast-uri Gimlet Media și Anchor în februarie 2019 pentru aproximativ 340 de milioane de dolari combinate. Apple, care a popularizat podcast-urile prin integrarea iTunes începând cu 2005, se confruntă cu o concurență crescută din partea Spotify și Amazon. Peste 2 milioane de podcast-uri cu mai mult de 48 de milioane de episoade existau până în 2023.\n\nRăzboaiele streaming-ului s-au intensificat pe măsură ce companiile media tradiționale lansează servicii concurente. HBO Max, Paramount Plus, Peacock și Apple TV Plus au intrat toate pe piață între 2019 și 2020. Această fragmentare obligă consumatorii să se aboneze la mai multe servicii pentru a accesa tot conținutul dorit, recreând în mod ironic unele dintre neajunsurile pachetelor de televiziune prin cablu pe care streaming-ul a promis inițial să le elimine. Analiștii din industrie prezic consolidarea pe măsură ce serviciile mai mici se luptă pentru a concura.\n\nExpansiunea internațională prezintă atât oportunități, cât și provocări pentru platformele de streaming. Netflix operează în peste 190 de țări și produce conținut în zeci de limbi. Serialul coreean Squid Game a devenit cel mai vizionat serial Netflix din toate timpurile în septembrie 2021, demonstrând apetitul global pentru conținut non-englezesc. Concurenți locali, inclusiv Hotstar în India, iQiyi în China și Globoplay în Brazilia, mențin poziții puternice pe piețele lor interne.\n\nPreocupările de reglementare din jurul serviciilor de streaming se multiplică pe măsură ce acestea devin platforme de divertisment dominante. Întrebări despre confidențialitatea datelor, moderarea conținutului, practicile de muncă și concentrarea pieței atrag atenția factorilor de decizie. Uniunea Europeană cere serviciilor de streaming să se asigure că 30% din cataloagele lor sunt formate din lucrări europene. Unele țări impun taxe pe abonamentele de streaming pentru a finanța producția locală de conținut.\n\nViitorul streaming-ului indică o interactivitate, imersiune și personalizare mai mare. Serviciile de cloud gaming de la Microsoft, Sony și alții transmit jocuri video fără a necesita hardware scump. Experiențele de realitate virtuală ar putea în cele din urmă să fie transmise în flux către căști ușoare. Algoritmii de inteligență artificială vor continua să rafineze recomandările și, potențial, să genereze conținut personalizat. Indiferent de tehnologiile specifice care vor apărea, streaming-ul a transformat permanent relația dintre creatori și public din întreaga lume.",
    "wordCount": 1541,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Când și-a lansat Netflix serviciul de streaming video?",
        "options": [
          "Ianuarie 2005",
          "Ianuarie 2007",
          "Ianuarie 2009",
          "Ianuarie 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Ce companii au fondat platforme majore de streaming? Selectați toate variantele aplicabile.",
        "options": [
          "Chad Hurley a co-fondat YouTube",
          "Reed Hastings a co-fondat Netflix",
          "Daniel Ek a co-fondat Spotify",
          "Bill Gates a fondat Disney Plus"
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
        "question": "Google a achiziționat YouTube pentru 1,65 miliarde de dolari în octombrie 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Câte milioane de abonați a raportat Spotify ca abonați plătitori până în decembrie 2023?",
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
        "question": "Când a fost încărcat primul videoclip pe YouTube?",
        "options": [
          "14 februarie 2005",
          "23 aprilie 2005",
          "4 iulie 2005",
          "9 octombrie 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Câți abonați a atras Disney Plus în prima zi?",
        "options": [
          "1 milion",
          "5 milioane",
          "10 milioane",
          "20 de milioane"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Cât a plătit Amazon pentru a achiziționa Twitch în 2014 (în milioane de dolari)?",
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
        "question": "Netflix a început ca un serviciu de închiriere DVD-uri prin poștă în 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Ce serial original Netflix a fost lansat în februarie 2013?",
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
        "question": "Ce procent din traficul de internet din America de Nord reprezintă streamingul video în timpul orelor de vârf?",
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
        "question": "Ce serial coreean a devenit cel mai vizionat serial Netflix din toate timpurile în septembrie 2021?",
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
    "title": "Știința Motoarelor de Căutare",
    "content": "Motoarele de căutare au devenit principalele porți prin care omenirea accesează vastul depozit de informații de pe internet, procesând miliarde de interogări zilnic și modelând modul în care oamenii descoperă, evaluează și înțeleg lumea din jurul lor. Algoritmii sofisticați care alimentează aceste sisteme reprezintă unele dintre cele mai complexe software-uri dezvoltate vreodată, combinând tehnici din recuperarea informațiilor, procesarea limbajului natural, învățarea automată și calculul distribuit. Înțelegerea modului în care funcționează motoarele de căutare dezvăluie atât capacitățile lor remarcabile, cât și influența lor profundă asupra cunoștințelor și comportamentului uman.\n\nOriginile căutării web datează de la începutul anilor 1990, când internetul creștea prea mult pentru directoarele gestionate manual. Archie, creat de Alan Emtage la Universitatea McGill din Montreal în 1990, indexa numele fișierelor de pe serverele FTP, dar nu căuta pagini web. World Wide Web Wanderer, dezvoltat de Matthew Gray la MIT în 1993, a devenit primul crawler web, măsurând creșterea internetului prin vizitarea automată a paginilor. Aceste instrumente primitive au pus bazele pentru sisteme mai sofisticate.\n\nAltaVista a fost lansat în decembrie 1995 și a devenit rapid principalul motor de căutare al acelei epoci. Dezvoltat de cercetători de la Digital Equipment Corporation din Palo Alto, California, AltaVista putea căuta într-o bază de date de 20 de milioane de pagini web folosind indexarea full-text. Utilizatorii erau uimiți de rezultatele care apăreau în câteva secunde pentru interogări pe milioane de documente. La apogeul său în 1997, AltaVista procesa 80 de milioane de interogări de căutare pe zi.\n\nLarry Page și Sergey Brin au creat Google ca un proiect de cercetare al Universității Stanford în 1996, introducând algoritmul PageRank care avea să transforme căutarea. Intuiția lor a fost că legăturile dintre paginile web conțineau informații valoroase despre relevanță și autoritate. O pagină legată de multe alte pagini, în special pagini importante, ar trebui să se claseze mai sus decât una cu puține link-uri. Această abordare a produs rezultate dramatic mai bune decât concurenții care clasificau paginile în principal după frecvența cuvintelor cheie.\n\nPageRank simulează un surfer web aleatoriu care dă clic pe link-uri în mod aleatoriu și sare ocazional la o pagină complet aleatorie. Probabilitatea ca acest surfer ipotetic să viziteze o anumită pagină devine scorul său PageRank. Paginile care primesc multe link-uri de la pagini cu PageRank mare acumulează ele însele scoruri mai mari. Acest model matematic, detaliat în lucrarea din 1998 a lui Page și Brin publicată în timp ce erau doctoranzi, rămâne fundamental pentru clasamentul Google, în ciuda numeroaselor rafinări ulterioare.\n\nProcesul de crawling web începe cu o listă de URL-uri cunoscute pe care programele automate numite spiders sau crawlers le vizitează. Crawlerul descarcă conținutul fiecărei pagini și extrage toate hyperlink-urile pe care le conține. Noile URL-uri sunt adăugate la coadă pentru crawling viitor. Crawlerul Google, numit inițial BackRub și mai târziu Googlebot, vizitează miliarde de pagini în mod continuu, acordând prioritate site-urilor actualizate frecvent și celor cu multe link-uri de intrare. Un crawl complet al web-ului durează săptămâni, deși paginile populare sunt recrawlate mult mai frecvent.\n\nIndexarea transformă conținutul brut al paginii web în date structurate care permit recuperarea rapidă. Motoarele de căutare construiesc indecși inversați care mapează fiecare cuvânt la lista documentelor care îl conțin. Când căutați un termen, motorul caută lista de postări a acelui termen, mai degrabă decât să scaneze fiecare document. Structuri de date suplimentare stochează informații despre pozițiile cuvintelor pentru potrivirea expresiilor, textul ancora din link-urile de intrare și metadate precum titlurile paginilor și datele de modificare.\n\nProcesarea interogărilor interpretează ceea ce utilizatorii doresc de fapt atunci când tastează termeni de căutare. Înțelegerea limbajului natural ajută motoarele de căutare să recunoască faptul că o căutare de pantofi de alergare caută probabil produse, mai degrabă decât informații despre încălțăminte care aleargă. Recunoașterea entităților identifică căutări pentru persoane, locuri, organizații și concepte. Extinderea interogărilor adaugă sinonime și termeni înrudiți pentru a îmbunătăți amintirea. Corectarea ortografică remediază greșelile de scriere înainte de a executa căutări, Google corectând aproximativ 10% din toate interogările.\n\nAlgoritmii de clasificare combină sute de semnale pentru a determina care pagini răspund cel mai bine la fiecare interogare. Dincolo de PageRank, Google ia în considerare factori precum prezența cuvintelor cheie în titluri și subtitluri, prospețimea conținutului, compatibilitatea cu dispozitivele mobile, viteza de încărcare a paginii și relevanța geografică. Modelele de învățare automată antrenate pe seturi vaste de date despre comportamentul utilizatorilor au înlocuit în mare măsură formulele de clasificare create manual. RankBrain, introdus în 2015, folosește rețele neuronale pentru a interpreta interogările ambigue și a identifica rezultate relevante.\n\nComportamentul utilizatorilor oferă feedback crucial pe care motoarele de căutare îl folosesc pentru a îmbunătăți clasamentele. Ratele de click-through indică ce rezultate consideră utilizatorii promițătoare. Timpul petrecut pe pagini după ce au făcut clic sugerează dacă rezultatele au satisfăcut interogarea. Modelul de revenire la rezultatele căutării și de a face clic pe link-uri diferite, numit pogo-sticking, indică faptul că rezultatele inițiale au fost inutile. Motoarele de căutare analizează miliarde de astfel de semnale zilnic pentru a-și rafina algoritmii.\n\nGraficele de cunoștințe reprezintă informații despre entități și relațiile lor în baze de date structurate. Knowledge Graph al Google, introdus în mai 2012, conține miliarde de fapte despre oameni, locuri, lucruri și concepte. Când căutați o persoană faimoasă, panoul de cunoștințe care apare lângă rezultate provine din aceste date structurate. Wikidata, o bază de cunoștințe colaborativă operată de Wikimedia Foundation, contribuie substanțial la aceste sisteme.\n\nFragmentele recomandate și răspunsurile directe au ca scop satisfacerea interogărilor fără a cere utilizatorilor să facă clic pe site-uri web. Google extrage pasaje relevante din paginile web și le afișează vizibil pentru întrebări. Asistenții vocali se bazează foarte mult pe aceste răspunsuri directe, deoarece utilizatorii nu pot face clic pe link-uri pe dispozitive doar audio. Editorii dezbat dacă fragmentele recomandate ajută prin generarea de trafic sau dăunează prin reducerea acestuia, unii optând să renunțe complet la selecția fragmentelor.\n\nCăutarea locală conectează interogările la întreprinderi și servicii din apropiere. Când cineva caută cafenele sau instalatori, motorul de căutare își încorporează locația pentru a afișa opțiuni locale relevante. Profilurile Google My Business permit companiilor să ofere informații direct. Recenziile agregate din diverse surse ajută utilizatorii să aleagă între opțiuni. Căutarea locală generează venituri substanțiale prin publicitate, companiile plătind pentru a apărea vizibil pentru interogări comerciale.\n\nPublicitatea în căutare a transformat Google într-una dintre cele mai valoroase companii din lume. Agenții de publicitate licitează pentru cuvinte cheie, plătind numai atunci când utilizatorii fac clic pe reclamele lor. Sistemul de licitație al Google ia în considerare atât sumele licitate, cât și calitatea reclamei pentru a determina ce reclame apar și în ce ordine. Publicitatea în căutare a generat peste 162 de miliarde de dolari în venituri pentru compania-mamă a Google, Alphabet, în 2022. Acest model de afaceri creează stimulente pentru a maximiza implicarea utilizatorilor cu rezultatele căutării.\n\nSpam-ul și manipularea au afectat motoarele de căutare încă de la începuturile lor. Operatorii de site-uri web lipsiți de scrupule umplu paginile cu cuvinte cheie ascunse, creează rețele de link-uri artificiale și utilizează nenumărate alte tactici pentru a \"păcăli\" clasamentele. Motoarele de căutare se angajează în curse continue de înarmare împotriva unei astfel de manipulări. Actualizarea Penguin a Google din aprilie 2012 a penalizat site-urile cu modele de link-uri nenaturale. Compania angajează mii de evaluatori de calitate care evaluează rezultatele căutării conform unor linii directoare detaliate.\n\nProblemele legate de confidențialitate înconjoară datele vaste pe care motoarele de căutare le colectează despre interogările și comportamentul utilizatorilor. Istoricul căutărilor dezvăluie probleme de sănătate, situații financiare, probleme de relații și nenumărate alte detalii intime. Google păstrează datele de căutare legate de conturi în mod implicit, folosindu-le pentru personalizare și direcționare publicitară. Alternative precum DuckDuckGo se diferențiază promițând că nu urmăresc utilizatorii, deși sacrifică unele capabilități de personalizare.\n\nConcurența în căutare a rămas limitată în ciuda controlului reglementar la nivel mondial. Google deține aproximativ 91% din cota de piață globală a căutărilor, conform datelor StatCounter din 2023. Bing, motorul de căutare al Microsoft, deține aproximativ 3% la nivel global, dar are performanțe mai bune în Statele Unite. Alternative regionale, inclusiv Baidu în China și Yandex în Rusia, domină piețele lor interne. Uniunea Europeană a amendat Google cu 2,42 miliarde de euro în iunie 2017 pentru favorizarea propriului serviciu de comparare a cumpărăturilor în rezultatele căutării.\n\nInteligența artificială transformă căutarea prin modele lingvistice mari care înțeleg și generează limbaj natural. Lansarea ChatGPT în noiembrie 2022 a stârnit îngrijorări că inteligența artificială conversațională ar putea perturba căutarea tradițională. Microsoft a integrat GPT-4 în Bing în februarie 2023. Google a răspuns cu Bard și ulterior cu Gemini. Aceste sisteme pot sintetiza informații din surse multiple și se pot angaja în dialog, schimbând potențial modul în care oamenii găsesc informații online.\n\nViitorul căutării se extinde dincolo de interogările text la imagini, voce și intrări multimodale. Google Lens permite căutarea folosind camerele smartphone-urilor, identificarea obiectelor, traducerea textului și rezolvarea problemelor de matematică din imagini. Căutarea vocală prin intermediul difuzoarelor inteligente și al smartphone-urilor reprezintă o parte tot mai mare a interogărilor. Motoarele de căutare trebuie să se adapteze la noi dispozitive și modele de interacțiune, menținând în același timp viteza și acuratețea la care se așteaptă utilizatorii.",
    "wordCount": 1507,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Cine a creat primul crawler web numit World Wide Web Wanderer în 1993?",
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
        "question": "Ce factori iau în considerare motoarele de căutare atunci când clasifică paginile? Selectați toate variantele aplicabile.",
        "options": [
          "Analiza link-urilor PageRank",
          "Prospețimea conținutului",
          "Viteza de încărcare a paginii",
          "Doar dimensiunea fișierului"
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
        "question": "AltaVista a procesat 80 de milioane de interogări de căutare pe zi în perioada sa de vârf în 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Ce procent din cota de piață globală a căutărilor deține Google conform datelor din 2023?",
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
        "question": "Când a fost introdus Knowledge Graph-ul Google?",
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
        "question": "Când a penalizat actualizarea Penguin de la Google site-urile cu tipare de link-uri nenaturale?",
        "options": [
          "Aprilie 2010",
          "Aprilie 2012",
          "Aprilie 2014",
          "Aprilie 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Câte venituri a generat publicitatea prin căutare pentru Alphabet în 2022 (în miliarde de dolari)?",
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
        "question": "Google corectează aproximativ 10% din toate interogările de căutare pentru erori de ortografie.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Când a integrat Microsoft GPT-4 în Bing?",
        "options": [
          "Noiembrie 2022",
          "Februarie 2023",
          "Iunie 2023",
          "Octombrie 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Cât de mult a amendat Uniunea Europeană Google în iunie 2017 (în miliarde de euro)?",
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
        "question": "Când a fost introdus RankBrain de către Google?",
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
        "question": "Când a fost lansat AltaVista?",
        "options": [
          "Decembrie 1993",
          "Decembrie 1995",
          "Decembrie 1997",
          "Decembrie 1999"
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
    "title": "Vehiculele Autonome și Viitorul Transportului",
    "content": "Vehiculele autonome promit să revoluționeze transportul cu ajutorul tehnologiei de conducere automată care ar putea reduce accidentele, transforma peisajele urbane și modifica fundamental modul în care omenirea transportă persoane și bunuri pe distanțe mici și mari. Această viziune ambițioasă a atras sute de miliarde de dolari în investiții din partea producătorilor auto, a giganților tehnologici și a startup-urilor care concurează pentru a rezolva imensele provocări tehnice, de reglementare și sociale implicate. Călătoria către vehicule cu adevărat autonome dezvăluie stadiul actual al acestei tehnologii transformative și obstacolele care rămân înainte ca mașinile cu conducere autonomă să devină ceva obișnuit.\n\nVisul vehiculelor cu conducere automată datează de dinaintea computerului digital. Norman Bel Geddes a prezentat expoziția Futurama la Expoziția Universală din New York din 1939, descriind autostrăzi automatizate unde mașinile ar călători în siguranță fără intervenție umană până în anii 1960. General Motors, care a sponsorizat expoziția, a colaborat ulterior cu RCA pentru a dezvolta conceptul de mașină Firebird IV în 1964, prezentând sisteme de ghidare electronică care puteau urmări fire îngropate în carosabil. Aceste viziuni timpurii necesitau modificări ale infrastructurii, mai degrabă decât inteligența vehiculelor.\n\nDezvoltarea modernă a vehiculelor autonome a început cu competițiile DARPA Grand Challenge, care au catalizat cercetarea academică și industrială începând cu 2004. Prima provocare, organizată în Deșertul Mojave, a oferit un milion de dolari oricărui vehicul care putea finaliza un traseu de 240 de kilometri fără intervenție umană. Toți participanții au eșuat, vehiculul care a ajuns cel mai departe parcurgând doar 12 kilometri înainte de a se împotmoli. Provocarea din 2005 a văzut cinci vehicule finalizând traseul, Stanley de la Universitatea Stanford câștigând în 6 ore și 53 de minute.\n\nSocietatea Inginerilor de Automobile definește șase niveluri de automatizare a conducerii care au devenit standardul industriei. Nivelul 0 înseamnă nicio automatizare, oamenii controlând toate sarcinile de conducere. Nivelul 1 include asistență de bază, cum ar fi pilotul automat adaptiv. Nivelul 2 combină mai multe funcții de asistență, dar necesită supraveghere umană constantă. Nivelul 3 permite vehiculului să gestioneze toată conducerea în condiții limitate, în timp ce oamenii rămân pregătiți să intervină. Nivelul 4 realizează automatizarea completă în cadrul domeniilor operaționale definite. Nivelul 5 înseamnă automatizare completă în toate condițiile, egalând sau depășind capacitatea umană peste tot.\n\nSistemele de senzori oferă vehiculelor autonome capacitățile de percepție necesare pentru o navigare sigură. Camerele captează informații vizuale despre benzi, semne, semafoare și alți utilizatori ai drumului. Radarul măsoară viteza și distanța obiectelor din apropiere prin unde radio care funcționează indiferent de iluminare sau vreme. Lidarul folosește impulsuri laser pentru a crea hărți tridimensionale detaliate ale mediului, unele sisteme generând peste două milioane de puncte de date pe secundă. Senzorii cu ultrasunete detectează obstacolele de la distanță mică în timpul manevrelor de parcare.\n\nWaymo, filiala de vehicule autonome a Alphabet, a apărut din proiectul Google de mașini cu conducere autonomă care a început în 2009. Sebastian Thrun, care a condus echipa câștigătoare DARPA de la Stanford, a condus cercetarea inițială. Proiectul a acumulat milioane de kilometri de teste în mai multe state înainte ca Waymo să lanseze un serviciu comercial de robotaxi în Phoenix, Arizona, în decembrie 2018. Până în octombrie 2023, vehiculele Waymo au parcurs peste 11 milioane de kilometri pe drumurile publice fără șoferi de siguranță, în principal în Phoenix și San Francisco.\n\nTesla a urmărit o abordare diferită a autonomiei prin sistemele sale Autopilot și Full Self-Driving. Mai degrabă decât lidar costisitor, Tesla se bazează pe camere și viziune computerizată antrenate pe date de la milioane de vehicule ale clienților. CEO-ul Elon Musk a prezis în mod repetat autonomia completă iminentă, afirmând în 2016 că un Tesla se va conduce singur de la Los Angeles la New York până în 2017. Această predicție și multe altele ulterioare nu s-au materializat, deși vehiculele Tesla oferă funcții de asistență a șoferului din ce în ce mai capabile.\n\nCruise, deținută majoritar de General Motors, a operat servicii de robotaxi în San Francisco până când Departamentul de Vehicule Motorizate din California i-a revocat permisele în octombrie 2023, în urma unui incident în care un vehicul a lovit și a târât un pieton. Compania se extinsese agresiv, operând sute de vehicule în mai multe orașe. Revocarea permisului a evidențiat provocările de reglementare cu care se confruntă industria și dificultatea asigurării siguranței la scară largă.\n\nCompaniile chineze au apărut ca actori majori în dezvoltarea vehiculelor autonome. Platforma Apollo de la Baidu a început dezvoltarea în 2017 și a acumulat peste 100 de milioane de kilometri de teste rutiere. Pony.ai, fondată în 2016, operează servicii de robotaxi în mai multe orașe chineze și în California. WeRide a colaborat cu Nissan și a stabilit operațiuni în Orientul Mijlociu. Orașe chineze, inclusiv Wuhan, Guangzhou și Shenzhen, au permis operațiuni comerciale de robotaxi care acoperă zone urbane semnificative.\n\nSistemele de inteligență artificială care conduc vehiculele autonome trebuie să gestioneze o complexitate extraordinară. Algoritmii de viziune computerizată identifică și clasifică mii de tipuri de obiecte, de la pietoni și bicicliști până la zone de construcție și vehicule de urgență. Modelele de predicție anticipează modul în care se vor comporta alți utilizatori ai drumului în următoarele câteva secunde. Algoritmii de planificare aleg traiectorii care ajung la destinații în siguranță și eficient. Toate aceste calcule trebuie să se execute în milisecunde, ținând cont de incertitudine și de scenarii rare.\n\nCazurile marginale prezintă provocări speciale pentru sistemele autonome. O pungă de plastic care zboară peste o autostradă și un copil care aleargă pe stradă pot părea similare senzorilor, dar necesită răspunsuri complet diferite. Muncitorii în construcții care direcționează traficul cu gesturi ale mâinilor anulează regulile normale de circulație. Vehiculele de urgență care se apropie din unghiuri obscure necesită acțiuni imediate. Datele de antrenament nu pot acoperi toate scenariile posibile, necesitând ca vehiculele să generalizeze în mod adecvat din experiențe similare.\n\nValidarea siguranței ridică întrebări fundamentale despre modul de a demonstra că vehiculele autonome sunt pregătite pentru implementare. Șoferii umani au în medie aproximativ un accident fatal la 160 de milioane de kilometri parcurși în Statele Unite. Demonstrarea statistică a faptului că un sistem autonom atinge sau depășește acest prag ar necesita miliarde de kilometri de teste, un standard impracticabil. În schimb, companiile folosesc simularea, testarea pe circuit închis și implementarea treptată, monitorizând în același timp performanța în lumea reală în mod continuu.\n\nCadrul de reglementare pentru vehiculele autonome variază dramatic în funcție de jurisdicție. California cere companiilor să raporteze deconectările atunci când șoferii umani de siguranță preiau controlul. Arizona a adoptat o abordare permisivă care a atras activitatea de testare. Germania a adoptat o legislație în 2021 care permite vehiculelor de nivel 4 pe drumurile publice în condiții specifice. China a desemnat anumite orașe drept zone de testare cu domenii operaționale care se extind treptat. Acest mozaic de reglementări complică strategiile internaționale de implementare.\n\nBeneficiile potențiale ale vehiculelor autonome se extind cu mult dincolo de confort. Accidentele de vehicule ucid aproximativ 1,35 milioane de oameni în întreaga lume anual, eroarea umană contribuind la peste 90% dintre accidente. Sistemele autonome nu sunt distrase, obosite sau afectate. Ele ar putea reduce dramatic acest număr dacă performanța lor de siguranță depășește șoferii umani. Transportul ar deveni accesibil populațiilor în vârstă, cu dizabilități și tinerilor care în prezent nu se pot conduce singuri.\n\nImplicațiile economice ale transportului autonom ar putea remodela industrii întregi. Șoferii profesioniști, inclusiv camionagii, operatorii de taxi și lucrătorii de livrare, se confruntă cu o potențială deplasare. Companiile de ride-hailing precum Uber și Lyft investesc masiv în autonomie, sperând să elimine cel mai mare cost al lor. Modelele de asigurare trebuie să se adapteze atunci când șoferii umani nu mai controlează vehiculele. Urbanistii prevăd orașe cu mai puține parcări și drumuri mai înguste, deoarece vehiculele autonome partajate reduc numărul total de vehicule.\n\nAplicațiile de transport cu camioane ar putea obține viabilitate comercială înainte de robotaxiurile de pasageri datorită mediilor de autostradă mai previzibile. Aurora, co-fondată de foști lideri din programele autonome Google, Tesla și Uber, se concentrează în principal pe transportul de marfă. TuSimple a efectuat curse autonome complete pe autostradă între Phoenix și Dallas înainte ca dificultățile financiare să forțeze o restructurare strategică în 2023. Embark, Kodiak și numeroase alte companii urmăresc aplicații similare de transport cu camioane pe distanțe lungi.\n\nCronologia pentru adoptarea pe scară largă a vehiculelor autonome rămâne extrem de incertă, în ciuda deceniilor de dezvoltare și a investițiilor masive. Proiecțiile optimiste de la mijlocul anilor 2010 au prezis robotaxiuri omniprezente până la începutul anilor 2020. Realitatea s-a dovedit mult mai dificilă decât se anticipase. Experții din industrie se așteaptă acum, în general, la o implementare treptată pe parcursul a zeci de ani, mai degrabă decât la o transformare bruscă. Tehnologia se va îmbunătăți probabil treptat, extinzându-se de la domenii operaționale limitate către capacități mai largi de-a lungul multor ani.",
    "wordCount": 1452,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Când a avut loc prima competiție DARPA Grand Challenge?",
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
        "question": "Ce tipuri de senzori folosesc vehiculele autonome? Selectați toate variantele aplicabile.",
        "options": [
          "Camere",
          "Radar",
          "Lidar",
          "Senzori cu raze X"
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
        "question": "Vehiculul Universității Stanford numit Stanley a câștigat competiția DARPA Grand Challenge în 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Câte milioane de mile au parcurs vehiculele Waymo fără șoferi de siguranță până în octombrie 2023 (în milioane)?",
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
        "question": "Când a lansat Waymo serviciul comercial de robotaxi în Phoenix?",
        "options": [
          "Decembrie 2016",
          "Decembrie 2018",
          "Decembrie 2020",
          "Decembrie 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Câte niveluri de automatizare a conducerii definește Societatea Inginerilor de Automobile?",
        "options": [
          "Patru",
          "Cinci",
          "Șase",
          "Șapte"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Câte persoane sunt ucise anual în accidente de vehicule la nivel mondial (în milioane)?",
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
        "question": "Eroarea umană contribuie la peste 90% din accidentele de vehicule.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Când a adoptat Germania legislația care permite vehiculelor de nivel 4 pe drumurile publice?",
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
        "question": "Câte mile a parcurs vehiculul care a ajuns cel mai departe în competiția DARPA Grand Challenge din 2004?",
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
        "question": "Când a început dezvoltarea platformei de conducere autonomă Apollo de la Baidu?",
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
        "question": "Când a fost expoziția Futurama la Expoziția Universală?",
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
        "question": "Câte puncte de date pe secundă pot genera unele sisteme lidar (în milioane)?",
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
        "question": "Când a revocat California DMV permisele de vehicule autonome ale Cruise?",
        "options": [
          "Octombrie 2022",
          "Octombrie 2023",
          "Ianuarie 2023",
          "Iunie 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
