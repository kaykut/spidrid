import { Article } from '../../../types/learning';

export const HEALTH_MEDICINE_ARTICLES: Article[] = [
  {
    id: 'health-medicine-p01',
    topicId: 'health-medicine',
    title: 'Cum Funcționează Vaccinurile',
    difficulty: 'beginner',
    wordCount: 521,
    articleType: 'practice',
    orderIndex: 1,
    content: `Vaccinurile antrenează sistemul tău imunitar să recunoască și să lupte împotriva unor agenți patogeni specifici înainte ca aceștia să cauzeze boli grave. Ele conțin părți slăbite sau inactive ale unui virus sau bacterie, care nu pot provoca boala, dar declanșează un răspuns imunitar protector. Corpul tău produce anticorpi și celule de memorie care își amintesc agentul patogen pentru ani.

Când primești un vaccin, celule specializate numite celule prezentatoare de antigen detectează imediat materialul străin. Aceste celule procesează componentele vaccinului și afișează fragmente pe suprafața lor pentru ca alte celule imunitare să le examineze. Celulele T ajutătoare recunosc aceste fragmente și activează celulele B, care produc anticorpi specifici acelui agent patogen.

Conceptul de imunizare datează din 1796, când Edward Jenner a dezvoltat primul vaccin împotriva variolei în Anglia. El a observat că mulgătoarele care contractaseră variola bovină păreau protejate de boala mult mai mortală, variola. Experimentul său pe un băiat de opt ani numit James Phipps a demonstrat că expunerea la variola bovină oferă imunitate.

Unele celule B devin celule plasmatice care produc cantități mari de anticorpi imediat după vaccinare. Altele devin celule B de memorie care persistă în corpul tău pentru ani sau chiar decenii. Când agentul patogen real apare, aceste celule de memorie îl recunosc și se multiplică rapid pentru a produce anticorpi.

Diferite vaccinuri folosesc abordări diferite pentru a crea imunitate. Vaccinurile vii atenuate conțin forme slăbite ale agentului patogen care se pot replica, dar nu pot provoca boala. Vaccinurile inactivate folosesc agenți patogeni uciși care nu se pot replica deloc. Vaccinurile subunitare conțin doar proteine specifice de pe suprafața agentului patogen.

Mai recent, vaccinurile ARNm au apărut ca o nouă tehnologie puternică. Aceste vaccinuri livrează instrucțiuni genetice care învață celulele tale să producă o bucată inofensivă a agentului patogen, declanșând un răspuns imunitar. Primele vaccinuri ARNm au primit aprobare în decembrie 2020 în timpul pandemiei COVID-19, după o dezvoltare remarcabil de rapidă.

Vaccinurile au eradicat complet variola și au eliminat aproape complet poliomielita din întreaga lume. Ele au redus dramatic decesele cauzate de rujeolă, difterie, tetanos și multe alte boli care odinioară ucideau milioane în fiecare an. Organizația Mondială a Sănătății estimează că vaccinurile previn 4 până la 5 milioane de decese anual la nivel mondial.

Cercetarea modernă a vaccinurilor continuă să avanseze cu noi platforme și metode de livrare. Oamenii de știință de la instituții precum Universitatea Oxford și Institutele Naționale de Sănătate lucrează pentru a dezvolta vaccinuri împotriva bolilor care încă nu au tratamente preventive. Vaccinurile rămân una dintre cele mai rentabile intervenții de sănătate publică dezvoltate vreodată.`,
    questions: [
      {
        id: 'health-medicine-p01-q1',
        type: 'single_choice',
        question: 'Cine a dezvoltat primul vaccin împotriva variolei?',
        options: [
          'Louis Pasteur',
          'Edward Jenner',
          'Alexander Fleming',
          'Jonas Salk',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p01-q2',
        type: 'multiple_select',
        question: 'Care tipuri de vaccinuri sunt menționate în articol? Selectați toate variantele corecte.',
        options: [
          'Vaccinuri vii atenuate',
          'Vaccinuri ARNm',
          'Vaccinuri ADN',
          'Vaccinuri inactivate',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p01-q3',
        type: 'true_false',
        question: 'Celulele B de memorie pot persista în corpul tău pentru ani sau chiar decenii.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p01-q4',
        type: 'numeric',
        question: 'În ce an a dezvoltat Edward Jenner primul vaccin?',
        correctValue: 1796,
        tolerance: 0,
        min: 1700,
        max: 1900,
        step: 1,
        unit: 'an',
      },
    ],
  },
  {
    id: 'health-medicine-p02',
    topicId: 'health-medicine',
    title: 'Creierul Uman: Centrul de Comandă al Corpului',
    difficulty: 'beginner',
    wordCount: 783,
    articleType: 'practice',
    orderIndex: 2,
    content: `Creierul uman cântărește aproximativ trei livre și conține aproximativ 86 de miliarde de neuroni conectați prin trilioane de sinapse. Acest organ remarcabil controlează fiecare gând, mișcare, senzație și emoție pe care le experimentezi. Înțelegerea modului în care funcționează creierul a devenit una dintre cele mai importante frontiere ale medicinei.

Creierul constă din trei regiuni principale care lucrează împreună fără probleme. Cerebrumul, cea mai mare parte, gestionează gândirea conștientă, învățarea, memoria și mișcarea voluntară. Cerebelul din spatele craniului coordonează echilibrul, postura și controlul motor fin. Trunchiul cerebral conectează creierul la măduva spinării și reglează funcții vitale precum respirația, ritmul cardiac și somnul.

Cerebrumul este împărțit în două emisfere conectate printr-un mănunchi gros de fibre nervoase numit corp calos. Fiecare emisferă controlează partea opusă a corpului, astfel încât emisfera stângă controlează mâna dreaptă și invers. Deși ambele emisfere împart majoritatea funcțiilor, partea stângă tinde să domine procesarea limbajului la majoritatea persoanelor dreptace.

Cortexul cerebral, stratul exterior încrețit al creierului, are doar aproximativ 3 milimetri grosime, dar conține majoritatea neuronilor noștri. Pliurile sale măresc dramatic suprafața, permițând mai multă putere de procesare să încapă în interiorul craniului. Diferite regiuni ale cortexului se specializează în funcții diferite, de la procesarea informațiilor vizuale la planificarea acțiunilor complexe.

Neuronii comunică prin impulsuri electrice și semnale chimice numite neurotransmițători. Când un neuron se activează, eliberează neurotransmițători peste spații minuscule numite sinapse către neuronii vecini. Acest proces se întâmplă de miliarde de ori pe secundă în întreg creierul tău, creând tiparele de activitate care produc gânduri și comportamente.

Santiago Ramon y Cajal, un om de știință spaniol, a făcut descoperiri revoluționare despre structura neuronilor la sfârșitul anilor 1800. El a dezvoltat tehnici de colorare care au revelat neuroni individuali pentru prima dată, dovedind că sistemul nervos consta din celule discrete și nu dintr-o rețea continuă. Munca sa i-a adus Premiul Nobel pentru Fiziologie sau Medicină în 1906.

Creierul consumă aproximativ 20 la sută din energia corpului tău, deși reprezintă doar 2 la sută din greutatea corporală. Neuronii necesită aprovizionări constante de oxigen și glucoză pentru a funcționa corect. Chiar și întreruperi scurte ale fluxului sanguin pot cauza daune permanente, motiv pentru care accidentele vasculare cerebrale sunt urgențe medicale care necesită tratament imediat.

Neuroplasticitatea se referă la capacitatea creierului de a se reorganiza prin formarea de noi conexiuni neuronale pe tot parcursul vieții. Această capacitate remarcabilă permite oamenilor să învețe abilități noi, să se recupereze de pe urma rănilor și să se adapteze la circumstanțe în schimbare. Cercetările lui Michael Merzenich și alți oameni de știință în anii 1980 au demonstrat că creierele adulte rămân mult mai modificabile decât se credea anterior.

Somnul joacă un rol crucial în sănătatea creierului și funcția cognitivă. În timpul somnului, creierul consolidează amintirile, elimină produsele de deșeuri metabolice și repară daunele celulare. Adulții au nevoie de șapte până la nouă ore de somn pe noapte pentru o funcție cerebrală optimă. Privarea cronică de somn afectează atenția, luarea deciziilor și reglarea emotională.

Tehnologiile moderne de imagistică au revoluționat înțelegerea noastră despre creier. RMN funcțional, dezvoltat la începutul anilor 1990, permite oamenilor de știință să observe activitatea cerebrală în timp real prin detectarea schimbărilor în fluxul sanguin. Această tehnologie a revelat care regiuni cerebrale se activează în timpul diferitelor sarcini, de la recunoașterea fețelor la experimentarea emoțiilor.

Cercetătorii de la instituții precum Institutele Naționale de Sănătate continuă să avanseze cunoștințele noastre despre tulburările cerebrale. Afecțiuni precum boala Alzheimer, boala Parkinson și depresia afectează milioane de oameni din întreaga lume. Înțelegerea bazei neuronale a acestor afecțiuni este esențială pentru dezvoltarea de tratamente eficiente care ar putea îmbunătăți nenumărate vieți.`,
    questions: [
      {
        id: 'health-medicine-p02-q1',
        type: 'single_choice',
        question: 'Ce parte a creierului coordonează echilibrul și controlul motor fin?',
        options: [
          'Cerebrumul',
          'Cerebelul',
          'Trunchiul cerebral',
          'Corpul calos',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q2',
        type: 'single_choice',
        question: 'Cine a descoperit că sistemul nervos constă din celule discrete?',
        options: [
          'Michael Merzenich',
          'Santiago Ramon y Cajal',
          'Louis Pasteur',
          'William Harvey',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q3',
        type: 'multiple_select',
        question: 'Ce se întâmplă în timpul somnului? Selectați toate variantele corecte.',
        options: [
          'Consolidarea amintirilor',
          'Eliminarea deșeurilor metabolice',
          'Crearea de neuroni noi',
          'Repararea daunelor celulare',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p02-q4',
        type: 'true_false',
        question: 'Creierul consumă aproximativ 20 la sută din energia corpului.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p02-q5',
        type: 'numeric',
        question: 'Aproximativ câți neuroni conține creierul uman (în miliarde)?',
        correctValue: 86,
        tolerance: 10,
        min: 50,
        max: 150,
        step: 5,
        unit: 'miliarde neuroni',
      },
    ],
  },
  {
    id: 'health-medicine-p03',
    topicId: 'health-medicine',
    title: 'Sistemul Imunitar: Forța de Apărare a Corpului Tău',
    difficulty: 'beginner',
    wordCount: 1047,
    articleType: 'practice',
    orderIndex: 3,
    content: `Sistemul imunitar uman este o rețea complexă de celule, țesuturi și organe care protejează corpul de invadatori dăunători. În fiecare zi, sistemul tău imunitar identifică și distruge milioane de bacterii, viruși, ciuperci și paraziți care ar putea cauza boli. Acest sistem de apărare remarcabil s-a evoluat de-a lungul a milioane de ani pentru a te menține sănătos.

Sistemul imunitar funcționează prin două ramuri principale care lucrează împreună pentru a oferi protecție. Sistemul imunitar înnăscut oferă apărare imediată, nespecifică împotriva agenților patogeni. Sistemul imunitar adaptiv dezvoltă răspunsuri țintite la amenințări specifice și le memorează pentru întâlniri viitoare. Ambele sisteme trebuie să funcționeze corect pentru a menține sănătatea.

Barierele fizice formează prima linie de apărare împotriva infecției. Pielea creează un zid aproape impenetrabil pe care majoritatea agenților patogeni nu îl pot traversa. Membranele mucoase din nas, gât și plămâni prind particule străine înainte ca acestea să poată intra în corp. Acidul stomacal ucide multe bacterii din alimente contaminate înainte ca acestea să poată cauza daune.

Când agenții patogeni trec prin aceste bariere, sistemul imunitar înnăscut răspunde în câteva minute. Globulele albe numite neutrofile se grăbesc la locul infecției și înghit invadatorii printr-un proces numit fagocitoză. Macrofagele, celule mai mari care patrulează țesuturile din întreg corpul, consumă de asemenea agenți patogeni și semnalează altor celule imunitare să se alăture luptei.

Inflamația este o parte crucială a răspunsului imunitar înnăscut care ajută la conținerea și eliminarea infecțiilor. Vasele de sânge se dilată, permițând mai multor celule imunitare să ajungă la zona afectată. Semnele familiare ale inflamației includ roșeața, căldura, umflătura și durerea. Deși incomode, aceste simptome indică faptul că sistemul tău imunitar funcționează corect.

Sistemul imunitar adaptiv durează mai mult să se activeze, dar oferă răspunsuri extrem de specifice și puternice. Celulele T și celulele B sunt principalii soldați ai imunității adaptive, fiecare cu roluri distincte în combaterea infecției. Aceste celule pot recunoaște agenți patogeni specifici și pot dezvolta strategii țintite pentru a-i elimina.

Celulele B produc anticorpi, proteine specializate care se leagă de agenți patogeni specifici și îi marchează pentru distrugere. Fiecare celulă B produce anticorpi care recunosc doar un tip de moleculă străină numită antigen. Când sunt activate, celulele B se multiplică rapid și produc milioane de anticorpi care circulă prin fluxul sanguin.

Celulele T vin în mai multe varietăți cu funcții diferite. Celulele T ajutătoare coordonează răspunsurile imunitare prin eliberarea de semnale chimice numite citokine care activează alte celule imunitare. Celulele T citotoxice ucid direct celulele infectate prin eliberarea de proteine toxice care fac găuri în membranele celulare. Celulele T reglatoare ajută la prevenirea atacării țesuturilor sănătoase de către sistemul imunitar.

Paul Ehrlich, un om de știință german, a propus conceptul de anticorpi în 1897 și a dezvoltat primul tratament eficient pentru sifilis. Munca sa asupra imunologiei i-a adus Premiul Nobel pentru Fiziologie sau Medicină în 1908, pe care l-a împărțit cu Ilya Metchnikoff, care a descoperit fagocitoza. Descoperirile lor au pus bazele imunologiei moderne.

Memoria imunologică permite sistemului imunitar adaptiv să răspundă mai rapid și mai eficient la agenți patogeni întâlniți anterior. Celulele B de memorie și celulele T de memorie persistă în corp pentru ani sau decenii după o infecție. Când același agent patogen apare din nou, aceste celule se activează rapid și adesea previn complet boala.

Bolile autoimune apar când sistemul imunitar atacă greșit țesuturi sănătoase. Afecțiuni precum artrita reumatoidă, diabetul de tip 1 și scleroza multiplă afectează milioane de oameni din întreaga lume. Aceste boli rezultă adesea dintr-o combinație de susceptibilitate genetică și factori de mediu care cauzează disfuncție imunitară.

Alergiile reprezintă o altă formă de disfuncție a sistemului imunitar în care corpul reacționează exagerat la substanțe inofensive precum polenul, părul de animale sau anumite alimente. În timpul unei reacții alergice, celulele imunitare eliberează histamină și alte substanțe chimice care cauzează simptome care variază de la strănut până la anafilaxie potențial fatală.

Sistemul imunitar se schimbă pe tot parcursul vieții ca răspuns la vârstă și experiență. Nou-născuții primesc protecție temporară de la anticorpii materni transmisi prin placentă și laptele matern. Sistemul imunitar se întărește prin copilărie pe măsură ce copiii întâlnesc și dezvoltă imunitate la agenți patogeni comuni. La adulții în vârstă, funcția imunitară scade treptat, crescând susceptibilitatea la infecții.

Factorii de stil de viață influențează semnificativ funcția imunitară. Somnul adecvat, exercițiile regulate și nutriția adecvată susțin sănătatea imunitară. Stresul cronic eliberează cortizol și alți hormoni care suprimă răspunsurile imunitare în timp. Evitarea alcoolului excesiv și a tutunului ajută la menținerea apărărilor imunitare la niveluri optime.

Medicina modernă continuă să dezvolte modalități de a valorifica sistemul imunitar pentru tratarea bolilor. Imunoterapia a revoluționat tratamentul cancerului prin antrenarea celulelor imunitare să recunoască și să distrugă tumorile. Premiul Nobel pentru Fiziologie sau Medicină din 2018 l-a recunoscut pe James Allison și Tasuku Honjo pentru munca pionieră în imunoterapia cancerului care a salvat mii de vieți.`,
    questions: [
      {
        id: 'health-medicine-p03-q1',
        type: 'single_choice',
        question: 'Ce celule produc anticorpi?',
        options: ['Celulele T', 'Celulele B', 'Neutrofilele', 'Macrofagele'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q2',
        type: 'single_choice',
        question: 'Cine a propus conceptul de anticorpi în 1897?',
        options: [
          'Ilya Metchnikoff',
          'Paul Ehrlich',
          'James Allison',
          'Tasuku Honjo',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q3',
        type: 'single_choice',
        question: 'Ce este fagocitoza?',
        options: [
          'Producția de anticorpi',
          'Eliberarea de histamină',
          'Procesul de înghițire și distrugere a agenților patogeni',
          'Formarea celulelor de memorie',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p03-q4',
        type: 'multiple_select',
        question: 'Care sunt semne ale inflamației? Selectați toate variantele corecte.',
        options: ['Roșeața', 'Frigul', 'Umflătura', 'Durerea'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-p03-q5',
        type: 'true_false',
        question: 'Sistemul imunitar înnăscut dezvoltă răspunsuri țintite la agenți patogeni specifici.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p03-q6',
        type: 'numeric',
        question: 'În ce an a câștigat Paul Ehrlich Premiul Nobel pentru munca sa în imunologie?',
        correctValue: 1908,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'an',
      },
    ],
  },
  {
    id: 'health-medicine-p04',
    topicId: 'health-medicine',
    title: 'Antibioticele: Războiul Împotriva Bacteriilor',
    difficulty: 'intermediate',
    wordCount: 1357,
    articleType: 'practice',
    orderIndex: 4,
    content: `Antibioticele au salvat mai multe vieți decât orice altă clasă de medicamente din istoria medicinei. Aceste medicamente remarcabile ucid bacteriile sau le împiedică să se reproducă, permițând sistemului imunitar al corpului să elimine infecțiile. De la descoperirea lor la începutul secolului al douăzecilea, antibioticele au transformat medicina și au extins dramatic durata de viață a omului.

Alexander Fleming a descoperit primul antibiotic din întâmplare pe 28 septembrie 1928, la Spitalul St. Mary din Londra. Fleming a observat că o mucegai numită Penicillium notatum contaminase una dintre culturile sale bacteriene și ucisese bacteriile din jur. În loc să arunce placa contaminată, a investigat mai departe și a identificat substanța antibacteriană, pe care a numit-o penicilină. Fleming și-a publicat descoperirile în 1929, dar nu a avut resursele necesare pentru a dezvolta penicilina într-un medicament utilizabil.

Howard Florey și Ernst Boris Chain de la Universitatea Oxford au transformat penicilina dintr-o curiozitate de laborator într-un medicament practic în timpul anilor 1940. Ei au dezvoltat metode de purificare și producție în masă a medicamentului, efectuând primele teste umane reușite în februarie 1941. Cererea din timpul războiului a accelerat dramatic producția, iar până în Ziua Z, în iunie 1944, exista suficientă penicilină pentru a trata toți soldații aliați răniți. Fleming, Florey și Chain au împărțit Premiul Nobel pentru Fiziologie sau Medicină în 1945.

Antibioticele funcționează prin mai multe mecanisme diferite pentru a ataca celulele bacteriene fără a afecta celulele umane. Penicilina și medicamentele înrudite interferează cu construcția pereților celulari, determinând bacteriile să explodeze sub propria lor presiune internă. Tetraciclinele și aminoglicozidele blochează ribozomii bacterieni să producă proteine. Fluorochinonele împiedică bacteriile să își copieze ADN-ul. Aceste strategii diferite de atac explică de ce anumite antibiotice funcționează mai bine împotriva anumitor infecții.

Descoperirea de noi clase de antibiotice a procedat rapid în timpul a ceea ce oamenii de știință numesc epoca de aur a descoperirii antibioticelor, de la 1940 la 1962. Streptomicina, descoperită de Selman Waksman la Universitatea Rutgers în 1943, a devenit primul tratament eficient pentru tuberculoză. Oamenii de știință au găsit tetraciclinele în 1948, eritromicina în 1952 și vancomicina în 1958. Fiecare nouă clasă a extins gama de infecții pe care doctorii le puteau trata cu succes.

Rezistența la antibiotice a apărut aproape imediat ca o consecință a evoluției bacteriene și selecției naturale. Bacteriile se reproduc rapid, uneori dublându-și populația la fiecare douăzeci de minute în condiții favorabile. Mutațiile aleatorii produc ocazional rezistență la antibiotice, iar aceste bacterii rezistente supraviețuiesc în timp ce altele mor. În câțiva ani de la introducerea peniclinei, bacterii Staphylococcus rezistente au apărut în spitale din întreaga lume.

Supra-utilizarea și utilizarea greșită a antibioticelor au accelerat dramatic rezistența în ultimele decenii. Doctorii prescriu uneori antibiotice pentru infecții virale precum răcelile și gripa, unde acestea nu oferă niciun beneficiu. Operațiunile agricole administrează antibiotice animalelor pentru a promova creșterea, expunând populații uriașe de bacterii la presiune selectivă. Pacienții care opresc administrarea antibioticelor devreme lasă bacterii rezistente vii să se multiplice și să se răspândească.

Staphylococcus aureus rezistent la meticilină, cunoscut sub numele de MRSA, demonstrează pericolul rezistenței la antibiotice. Această super-bacterie a apărut în spitalele britanice în 1961, doar la doi ani după introducerea meticilinei. MRSA provoacă în prezent aproximativ 120.000 de infecții și 20.000 de decese anual doar în Statele Unite. Unele tulpini au dezvoltat rezistență la aproape toate antibioticele disponibile, lăsând doctorii cu puține opțiuni de tratament.

Organizația Mondială a Sănătății a declarat rezistența la antibiotice una dintre cele mai mari amenințări la sănătatea globală în 2014. Fără antibiotice eficiente, intervențiile chirurgicale de rutină devin periculoase, chimioterapia cancerului devine mai riscantă, iar infecțiile minore devin mortale. OMS estimează că infecțiile rezistente la medicamente provoacă deja 700.000 de decese anual la nivel mondial și ar putea cauza 10 milioane de decese pe an până în 2050 dacă tendințele actuale continuă.

Companiile farmaceutice au abandonat în mare măsură cercetarea antibioticelor deoarece dezvoltarea de noi medicamente costă miliarde de dolari, în timp ce bacteriile dezvoltă rezistență în câțiva ani. Doar două noi clase de antibiotice au ajuns pe piață de la 1962. Stimulentele guvernamentale și inițiativele non-profit lucrează acum pentru a încuraja dezvoltarea de antibiotice, dar conducta de noi medicamente rămâne periculos de subțire.

Conservarea eficacității antibioticelor necesită acțiune din partea doctorilor, pacienților, fermierilor și guvernelor din întreaga lume. Doctorii ar trebui să prescrie antibiotice doar când este necesar și să aleagă medicamente cu spectru îngust când este posibil. Pacienții trebuie să completeze întregul curs de tratament chiar și după ce se simt mai bine. Reformele agricole pot reduce utilizarea antibioticelor la animale menținând în același timp producția de alimente. Cooperarea internațională este esențială deoarece bacteriile rezistente traversează liber frontierele.

Noi abordări de combatere a infecțiilor bacteriene oferă speranță pentru viitor. Bacteriofagele sunt viruși care infectează și ucid în mod natural bacteriile, oferind o alternativă la antibioticele chimice. Oamenii de știință dezvoltă vaccinuri împotriva bacteriilor tratate în prezent cu antibiotice. Cercetătorii explorează compuși care dezactivează apărările bacteriene fără a ucide bacteriile, reducând presiunea selectivă pentru rezistență. Aceste inovații pot în cele din urmă completa sau înlocui antibioticele tradiționale.

Istoria antibioticelor învață lecții importante despre competiția continuă dintre medicina umană și evoluția microbiană. Fiecare nouă armă pe care o dezvoltăm pierde în cele din urmă eficacitatea pe măsură ce bacteriile se adaptează. Menținerea avantajului nostru necesită cercetare continuă, utilizare responsabilă a medicamentelor existente și recunoașterea faptului că această bătălie nu se va termina niciodată.`,
    questions: [
      {
        id: 'health-medicine-p04-q1',
        type: 'single_choice',
        question: 'Cine a descoperit penicilina în 1928?',
        options: [
          'Howard Florey',
          'Ernst Boris Chain',
          'Alexander Fleming',
          'Selman Waksman',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p04-q2',
        type: 'single_choice',
        question: 'Ce înseamnă MRSA?',
        options: [
          'Staphylococcus aureus multi-rezistent',
          'Staphylococcus aureus rezistent la meticilină',
          'Streptococcus aureus rezistent la mai multe medicamente',
          'Streptococcus aureus rezistent la meticilină',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p04-q3',
        type: 'multiple_select',
        question: 'Ce mecanisme folosesc antibioticele pentru a ataca bacteriile? Selectați toate variantele corecte.',
        options: [
          'Interferarea cu construcția pereților celulari',
          'Blocarea ribozomilor să producă proteine',
          'Atacarea celulelor umane',
          'Împiedicarea replicării ADN-ului',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p04-q4',
        type: 'true_false',
        question: 'Epoca de aur a descoperirii antibioticelor a durat de la 1940 la 1962.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p04-q5',
        type: 'numeric',
        question: 'Aproximativ câte decese cauzează MRSA anual în Statele Unite?',
        correctValue: 20000,
        tolerance: 2000,
        min: 5000,
        max: 50000,
        step: 1000,
        unit: 'decese',
      },
      {
        id: 'health-medicine-p04-q6',
        type: 'single_choice',
        question: 'Cine a dezvoltat metode de producție în masă a peniclinei la Universitatea Oxford?',
        options: [
          'Alexander Fleming și Selman Waksman',
          'Howard Florey și Ernst Boris Chain',
          'Robert Koch și Louis Pasteur',
          'Edward Jenner și Jonas Salk',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'health-medicine-p05',
    topicId: 'health-medicine',
    title: 'Somnul: Știința Odihnei și Recuperării',
    difficulty: 'intermediate',
    wordCount: 1776,
    articleType: 'practice',
    orderIndex: 5,
    content: `Somnul rămâne unul dintre cele mai esențiale, dar slab înțelese aspecte ale biologiei umane. Fiecare persoană petrece aproximativ o treime din viața sa dormind, totuși oamenii de știință au început să dezlege misterele somnului abia în secolul al douăzecilea. Cercetările moderne relevă că somnul îndeplinește funcții cruciale pentru sănătatea fizică, performanța mentală și bunăstarea emoțională care nu pot fi înlocuite prin nicio cantitate de odihnă în stare de veghe.

Descoperirea somnului cu mișcări rapide ale ochilor în 1953 de către Eugene Aserinsky și Nathaniel Kleitman de la Universitatea din Chicago a revoluționat știința somnului. Ei au observat că ochii subiecților adormiți se mișcau rapid sub pleoapele închise în anumite perioade, iar activitatea cerebrală în aceste faze semăna cu activitatea în stare de veghe. Somnul REM, cum l-au numit, s-a dovedit a fi momentul când are loc cea mai vie visare. Această descoperire a transformat somnul dintr-o stare pasivă într-un proces activ demn de investigație științifică.

Somnul apare în cicluri de aproximativ nouăzeci de minute fiecare, majoritatea adulților completând patru până la șase cicluri pe noapte. Fiecare ciclu conține etape distincte care îndeplinesc funcții diferite. Somnul non-REM începe cu somn ușor în care activitatea musculară scade și temperatura corpului scade. Urmează etape mai profunde de somn non-REM, în timpul cărora corpul repară țesuturile, întărește sistemul imunitar și eliberează hormon de creștere.

Somnul REM crește în durată pe măsură ce noaptea progresează, cele mai lungi perioade REM având loc către dimineață. În timpul somnului REM, creierul devine extrem de activ în timp ce mușchii voluntari devin temporar paralizați. Această paralizie împiedică oamenii să își joace visele, deși tulburarea de comportament în somnul REM poate perturba acest mecanism cu rezultate potențial periculoase. Majoritatea somnului REM apare în timpul ultimei treimi a nopții.

Sistemul glimfatic al creierului, descoperit de Maiken Nedergaard de la Universitatea din Rochester în 2012, a revelat o funcție crucială a somnului. Acest sistem de eliminare a deșeurilor îndepărtează proteinele toxice din țesutul cerebral, inclusiv beta-amiloid asociat cu boala Alzheimer. Sistemul glimfatic operează în principal în timpul somnului non-REM profund, când celulele cerebrale se contractă cu aproximativ 60 la sută, permițând lichidului cefalorahidian să spele între neuroni.

Consolidarea memoriei reprezintă o altă funcție vitală a somnului pe care cercetătorii au documentat-o extensiv. În timpul somnului, creierul redă și întărește conexiunile neuronale formate în timpul experiențelor de învățare în stare de veghe. Studiile lui Robert Stickgold de la Școala Medicală Harvard au demonstrat că subiecții care au dormit după învățarea de abilități noi au performat semnificativ mai bine decât cei care au rămas treji aceeași durată.

Privarea de somn produce afectări cognitive și fizice severe care se acumulează în timp. După doar șaptesprezece ore fără somn, timpii de reacție și judecata scad la niveluri echivalente cu intoxicația legală. Deversarea de petrol Exxon Valdez în martie 1989 și dezastrul nuclear de la Cernobîl în aprilie 1986 au implicat ambele lucrători obosiți care au făcut erori critice. Privarea cronică de somn crește riscurile de obezitate, diabet, boli de inimă și deces prematur.

Ritmurile circadiene reglează momentul somnului printr-un ceas biologic localizat în nucleul suprachiasmatic al creierului. Acest grup minuscul de aproximativ 20.000 de neuroni primește semnale luminoase de la ochi și coordonează ciclurile zilnice de vigilență, temperatură corporală, eliberare de hormoni și nenumărate alte funcții. Ceasul circadian rulează ușor mai lung de 24 de ore și trebuie resetat zilnic prin expunerea la lumină.

Melatonina, un hormon produs de glanda pineală, semnalează întunericul corpului și promovează începerea somnului. Creierul începe să elibereze melatonină în orele de seară, de obicei cu două ore înainte de ora obișnuită de culcare. Expunerea la lumină strălucitoare, în special la lungimi de undă albastre de la ecranele electronice, suprimă producția de melatonină și poate întârzia somnul. Acest lucru explică de ce utilizarea telefoanelor și computerelor înainte de culcare perturbă adesea somnul.

Adenozina se acumulează în creier în timpul orelor de veghe și creează o presiune crescândă de a dormi. Această substanță chimică se acumulează ca produs secundar al activității cerebrale și se leagă de receptori care promovează somnolența. Cofeina funcționează prin blocarea receptorilor de adenozină, mascând temporar oboseala fără a elimina datoria de somn subiacentă. Când cofeina se epuizează, adenozina acumulată produce scăderea familiară pe care o experimentează consumatorii de cafea.

Tulburările de somn afectează milioane de oameni și iau multe forme dincolo de simpla insomnie. Apneea obstructivă de somn provoacă întreruperi repetate ale respirației în timpul somnului, afectând aproximativ 25 de milioane de adulți americani. Această afecțiune crește riscurile de tensiune arterială mare, atac de cord, accident vascular cerebral și diabet. Aparatele de presiune pozitivă continuă a căilor respiratorii care mențin deschise căile respiratorii în timpul somnului oferă tratament eficient pentru majoritatea pacienților.

Narcolepsia, o tulburare neurologică care afectează aproximativ 200.000 de americani, provoacă somnolență copleșitoare în timpul zilei și atacuri bruște de somn. Cercetătorii au descoperit în 1999 că narcolepsia rezultă din distrugerea neuronilor care produc hipocretină, un neurotransmițător care menține starea de veghe. Această descoperire de către Emmanuel Mignot de la Universitatea Stanford a deschis noi posibilități de tratament și a ilustrat cum studierea tulburărilor de somn avansează înțelegerea somnului normal.

Vârsta afectează profund tiparele de somn pe tot parcursul vieții umane. Nou-născuții dorm până la șaptesprezece ore zilnic, petrecând aproximativ jumătate din acel timp în somn REM. Adolescenții experimentează o schimbare biologică către un moment de somn mai târziu care intră în conflict cu orele timpurii de începere a școlii. Adulții în vârstă dorm mai puțin profund și se trezesc mai frecvent, deși nevoile lor de somn nu scad neapărat.

Societatea modernă tratează adesea somnul ca timp care poate fi schimbat pentru productivitate sau divertisment. Această atitudine ignoră dovezile științifice copleșitoare că somnul adecvat este esențial pentru sănătate și performanță. Centrele pentru Controlul și Prevenirea Bolilor au declarat somnul insuficient o epidemie de sănătate publică în 2014, estimând că o treime dintre adulții americani dorm mai puțin de cele șapte ore recomandate pe noapte.

Îmbunătățirea obiceiurilor de somn necesită programe consistente, medii de somn adecvate și schimbări comportamentale. Mersul la culcare și trezirea la aceleași ore în fiecare zi întărește ritmurile circadiene. Dormitoarele reci, întunecate și liniștite promovează calitatea somnului. Evitarea cofeinei după amiază, limitarea alcoolului înainte de culcare și reducerea timpului petrecut în fața ecranelor seara susțin toate un somn mai bun. Exercițiile îmbunătățesc calitatea somnului atunci când sunt efectuate mai devreme în timpul zilei.

Înțelegerea științei somnului împuternicește indivizii să facă alegeri informate despre această nevoie umană fundamentală. Somnul nu este timp pierdut, ci o investiție activă în sănătatea fizică, funcția cognitivă și reziliența emoțională. Corpul tot mai mare de cercetări confirmă ceea ce experiența comună sugerează: somnul adecvat este esențial pentru a trăi bine.`,
    questions: [
      {
        id: 'health-medicine-p05-q1',
        type: 'single_choice',
        question: 'Cine a descoperit somnul REM în 1953?',
        options: [
          'Robert Stickgold și Matthew Walker',
          'Eugene Aserinsky și Nathaniel Kleitman',
          'Maiken Nedergaard și Emmanuel Mignot',
          'William Dement și Allan Rechtschaffen',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q2',
        type: 'single_choice',
        question: 'Ce face sistemul glimfatic în timpul somnului?',
        options: [
          'Consolidează amintirile',
          'Elimină proteinele toxice din țesutul cerebral',
          'Reglează ritmurile circadiene',
          'Produce melatonină',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q3',
        type: 'multiple_select',
        question: 'Ce afecțiuni sunt asociate cu privarea cronică de somn? Selectați toate variantele corecte.',
        options: [
          'Obezitatea',
          'Boli de inimă',
          'Funcție imunitară îmbunătățită',
          'Diabetul',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p05-q4',
        type: 'true_false',
        question: 'Cofeina elimină datoria de somn prin restaurarea nivelurilor de adenozină.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p05-q5',
        type: 'numeric',
        question: 'Aproximativ cât durează fiecare ciclu de somn în minute?',
        correctValue: 90,
        tolerance: 10,
        min: 30,
        max: 180,
        step: 5,
        unit: 'minute',
      },
      {
        id: 'health-medicine-p05-q6',
        type: 'single_choice',
        question: 'Ce cauzează narcolepsia?',
        options: [
          'Producție excesivă de melatonină',
          'Distrugerea neuronilor care produc hipocretină',
          'Receptori de adenozină blocați',
          'Ritmuri circadiene perturbate',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q7',
        type: 'single_choice',
        question: 'Unde este localizat ceasul biologic în creier?',
        options: [
          'Glanda pineală',
          'Hipocamp',
          'Nucleul suprachiasmatic',
          'Cerebel',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p05-q8',
        type: 'numeric',
        question: 'Aproximativ câți adulți americani sunt afectați de apneea obstructivă de somn (în milioane)?',
        correctValue: 25,
        tolerance: 5,
        min: 5,
        max: 50,
        step: 1,
        unit: 'milioane',
      },
    ],
  },
  {
    id: 'health-medicine-p06',
    topicId: 'health-medicine',
    title: 'Microbiomul Intestinal: Ecosistemul Tău Interior',
    difficulty: 'intermediate',
    wordCount: 2074,
    articleType: 'practice',
    orderIndex: 6,
    content: `Intestinul uman conține trilioane de microorganisme care influențează sănătatea în moduri pe care oamenii de știință abia încep să le înțeleagă. Acest ecosistem complex, cunoscut sub numele de microbiom intestinal, joacă roluri esențiale în digestie, imunitate, sănătate mentală și prevenirea bolilor. Cercetarea în această lume ascunsă a revoluționat modul în care profesioniștii medicali gândesc despre biologia umană și a deschis abordări promițătoare noi pentru tratarea bolilor.

Adultul mediu poartă aproximativ 38 de trilioane de celule bacteriene, aproximativ egal cu numărul de celule umane din corp. Majoritatea acestor microbi locuiesc în tractul gastrointestinal, în special în intestinul gros, unde condițiile favorizează creșterea bacteriană. Peste 1.000 de specii bacteriene diferite au fost identificate în intestinele umane, deși fiecare individ găzduiește de obicei între 150 și 250 de specii. Această comunitate microbiană cântărește între unu și doi kilograme la un adult tipic.

Microbiomul intestinal începe să se dezvolte la naștere și continuă să se schimbe pe tot parcursul vieții. Bebelușii născuți pe cale vaginală dobândesc microbii inițiali din canalul de naștere, în timp ce sugarii născuți prin cezariană întâlnesc pentru prima dată bacterii din medii spitalicești și contact cu pielea. Alăptarea modelează în continuare microbiomul în dezvoltare prin furnizarea atât de nutrienți, cât și de bacterii benefice. Comunitatea intestinală rămâne relativ instabilă în timpul copilăriei timpurii înainte de a se stabili în tipare adulte în jurul vârstei de trei ani.

Omul de știință olandez Antonie van Leeuwenhoek a observat pentru prima dată microorganisme în 1676 folosind microscoape pe care le-a construit el însuși, dar înțelegerea bacteriilor intestinale a rămas limitată secole întregi. Biologul rus Elie Metchnikoff a propus în 1907 că anumite bacterii ar putea beneficia sănătatea umană, observând că țăranii bulgari care consumau produse lactate fermentate trăiau vieți neobișnuit de lungi. Ideile sale despre probiotice au câștigat scepticism din partea contemporanilor, dar au anticipat descoperiri care aveau să vină cu decenii mai târziu.

Cercetarea modernă a microbiomului a accelerat dramatic după lansarea Proiectului Microbiom Uman în 2007 cu finanțare de la Institutele Naționale de Sănătate. Această inițiativă ambițioasă a avut ca scop identificarea și caracterizarea microorganismelor care trăiesc în și pe corpul uman. Progresele în tehnologia de secvențiere ADN au făcut posibilă identificarea bacteriilor fără a fi nevoie să le cultive în culturi de laborator. Oamenii de știință au descoperit că microbiomul intestinal conține aproximativ de 100 de ori mai multe gene decât genomul uman însuși.

Microbiomul intestinal îndeplinește funcții esențiale pe care celulele umane nu le pot realiza independent. Anumite bacterii descompun fibrele dietetice pe care enzimele umane nu le pot digera, producând acizi grași cu lanț scurt care hrănesc celulele intestinale. Alți microbi sintetizează vitamine, inclusiv vitamina K și mai multe vitamine B pe care corpul le necesită. Comunitatea intestinală ajută de asemenea la antrenarea sistemului imunitar să distingă între agenți patogeni dăunători și organisme benefice.

Dieta influențează profund compozița și funcția microbiomului. Persoanele care consumă diete bogate în fibre găzduiesc de obicei comunități bacteriene mai diverse decât cele care mănâncă alimente procesate bogate în zahăr și grăsimi. Dietele tradiționale din Africa rurală, bogate în fibre vegetale, produc microbiome dramatic diferite de cele observate în populațiile occidentale. Schimbările dietetice pot modifica compoziția microbiomului în doar 24 de ore, deși revenirea la vechile modele alimentare restabilește de obicei populațiile bacteriene anterioare.

Antibioticele devastează comunitățile bacteriene intestinale împreună cu organismele dăunătoare pe care le vizează. Un singur curs de antibiotice poate elimina specii benefice care pot avea nevoie de luni sau ani pentru a se recupera. Unele specii nu se mai întorc niciodată, modificând permanent compoziția microbiomului. Aceste daune colaterale au provocat îngrijorare crescândă cu privire la supra-utilizarea antibioticelor și interes pentru strategii de protejare sau restaurare a comunităților intestinale în timpul tratamentului.

Cercetarea a legat perturbările microbiomului de o listă în expansiune de afecțiuni de sănătate. Bolile inflamatorii intestinale, inclusiv boala Crohn și colita ulceroasă, implică comunități bacteriene modificate care pot declanșa sau agrava inflamația intestinală. Obezitatea pare conectată la compoziția microbiomului, studii arătând că transplantarea bacteriilor intestinale de la șoareci obezi la șoareci slabi cauzează creșterea în greutate. Diabetul de tip 2, afecțiunile autoimune și alergiile au fost toate asociate cu schimbări ale microbiomului.

Axa intestin-creier reprezintă una dintre cele mai surprinzătoare frontiere în cercetarea microbiomului. Bacteriile din intestin comunică cu creierul prin multiple căi, inclusiv nervul vag și mesageri chimici care intră în fluxul sanguin. Studiile au găsit diferențe în bacteriile intestinale între persoanele cu depresie sau anxietate și cele fără aceste afecțiuni. Cercetările lui John Cryan de la University College Cork au demonstrat că tulpini bacteriene specifice pot influența dispoziția și comportamentul atât la animale, cât și la oameni.

Transplantul de microbiota fecală a apărut ca un tratament remarcabil de eficient pentru infecțiile recurente cu Clostridioides difficile. Această procedură, care transferă scaun de la un donator sănătos în intestinul unui pacient, vindecă aproximativ 90 la sută din cazurile care nu au reușit să răspundă la antibiotice. Primul transplant fecal de succes pentru această afecțiune a fost efectuat în 1958 de Ben Eiseman la Spitalul Administrației Veteranilor din Denver, dar tratamentul a rămas obscur până când C. difficile rezistent la antibiotice a devenit o problemă majoră.

Probioticele, microorganisme vii destinate să ofere beneficii pentru sănătate, au devenit o industrie de miliarde de dolari, în ciuda dovezilor limitate pentru multe beneficii revendicate. Unele tulpini probiotice au arătat eficacitate pentru afecțiuni specifice, inclusiv diareea asociată cu antibiotice și anumite tulburări digestive. Cu toate acestea, multe produse comerciale nu au dovezi de eficacitate, iar probioticele care ajută o persoană pot să nu beneficieze altei persoane din cauza diferențelor individuale ale microbiomului.

Prebioticele oferă o abordare alternativă prin hrănirea bacteriilor benefice deja prezente în intestin. Aceste componente alimentare nedigerabile, găsite în alimente precum usturoiul, ceapa, bananele și cerealele integrale, promovează selectiv creșterea speciilor bacteriene utile. Combinarea prebioticelor cu probioticele creează sinbiotice care pot oferi beneficii îmbunătățite, deși cercetarea continuă să determine combinațiile și dozele optime.

Microbiomul variază semnificativ între indivizi, făcând abordările personalizate din ce în ce mai importante. Cercetătorii de la Institutul de Știință Weizmann din Israel au demonstrat în 2015 că răspunsurile glicemice la alimente identice diferă dramatic între persoane, compoziția microbiomului ajutând să explice această variație. Această descoperire sugerează că recomandările dietetice ar putea fi în cele din urmă adaptate pe baza profilurilor individuale ale microbiomului.

Aplicațiile viitoare ale științei microbiomului ar putea transforma medicina în moduri profunde. Cercetătorii dezvoltă tehnici pentru a edita cu precizie compoziția microbiomului, adăugând sau eliminând specii specifice pentru a trata boli. Bacteriile inginerizate ar putea livra medicamente direct la țesuturile bolnave sau produce molecule terapeutice în intestin. Înțelegerea modului în care microbiomul influențează metabolismul medicamentelor ar putea îmbunătăți eficacitatea tratamentului și reduce efectele secundare.

Microbiomul intestinal ne amintește că oamenii nu sunt organisme izolate, ci ecosisteme care găzduiesc nenumărați parteneri microbieni. Acești locuitori nevăzuți influențează sănătatea, dispoziția și chiar comportamentul nostru prin mecanisme pe care abia începem să le apreciem. Îngrijirea acestui ecosistem interior prin dietă, alegeri de stil de viață și utilizare judicioasă a antibioticelor poate dovedi la fel de importantă ca orice altă practică de sănătate pe care o adoptăm.`,
    questions: [
      {
        id: 'health-medicine-p06-q1',
        type: 'single_choice',
        question: 'Aproximativ câte celule bacteriene poartă adultul mediu?',
        options: [
          '1 trilion',
          '10 trilioane',
          '38 de trilioane',
          '100 de trilioane',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q2',
        type: 'single_choice',
        question: 'Când a fost lansat Proiectul Microbiom Uman?',
        options: ['1958', '1976', '2007', '2015'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q3',
        type: 'multiple_select',
        question:
          'Ce funcții îndeplinește microbiomul intestinal? Selectați toate variantele corecte.',
        options: [
          'Descompunerea fibrelor dietetice',
          'Sintetizarea vitaminelor',
          'Pomparea sângelui',
          'Antrenarea sistemului imunitar',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p06-q4',
        type: 'true_false',
        question:
          'Elie Metchnikoff a propus în 1907 că anumite bacterii ar putea beneficia sănătatea umană.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p06-q5',
        type: 'numeric',
        question:
          'Ce procent din infecțiile recurente cu C. difficile vindecă transplantul de microbiota fecală?',
        correctValue: 90,
        tolerance: 5,
        min: 50,
        max: 100,
        step: 5,
        unit: 'procente',
      },
      {
        id: 'health-medicine-p06-q6',
        type: 'single_choice',
        question: 'Cine a efectuat primul transplant fecal de succes pentru C. difficile?',
        options: [
          'Antonie van Leeuwenhoek',
          'Elie Metchnikoff',
          'Ben Eiseman',
          'John Cryan',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q7',
        type: 'single_choice',
        question: 'La aproximativ ce vârstă se stabilește microbiomul intestinal în tipare adulte?',
        options: ['La naștere', 'Vârsta de un an', 'Vârsta de trei ani', 'Adolescență'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q8',
        type: 'numeric',
        question:
          'Câte specii bacteriene diferite au fost identificate în intestinele umane (peste ce număr)?',
        correctValue: 1000,
        tolerance: 100,
        min: 500,
        max: 2000,
        step: 100,
        unit: 'specii',
      },
      {
        id: 'health-medicine-p06-q9',
        type: 'true_false',
        question:
          'Microbiomul intestinal conține aproximativ de 100 de ori mai multe gene decât genomul uman.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-p07',
    topicId: 'health-medicine',
    title: 'Genetica și Ereditatea: Codul Vieții',
    difficulty: 'advanced',
    wordCount: 2486,
    articleType: 'practice',
    orderIndex: 7,
    content: `Genetica este știința eredității, explicând cum trec trăsăturile de la părinți la descendenți prin informații codificate în ADN. Acest domeniu a transformat înțelegerea noastră despre viața însăși și a permis progrese medicale care variază de la testarea genetică la terapia genică. Povestea geneticii se întinde de la observații antice despre ereditate la tehnologii de ultimă oră care pot edita însuși planul organismelor vii.

Gregor Mendel, un călugăr augustinian care lucra într-o grădină mănăstirească în Brno, Austria, a descoperit legile fundamentale ale eredității prin experimente atente cu plante de mazăre. Între 1856 și 1863, Mendel a încrucișat aproximativ 29.000 de plante de mazăre, înregistrând meticulos cum trăsături precum culoarea semințelor, forma păstăilor și înălțimea plantelor trecea de la generație la generație. Munca sa a relevat că factorii ereditari vin în perechi, iar descendenții primesc un factor de la fiecare părinte.

Mendel și-a prezentat descoperirile Societății de Istorie Naturală din Brno în februarie și martie 1865, apoi le-a publicat anul următor. Comunitatea științifică a ignorat în mare parte descoperirile sale revoluționare în timpul vieții sale. Mendel a murit în ianuarie 1884 fără să știe că munca sa avea să îi aducă în cele din urmă recunoașterea ca părinte al geneticii. Trei oameni de știință au redescoperit independent principiile sale în 1900, aducând în sfârșit atenție asupra perspectivelor făcute cu decenii mai devreme.

Cromozomii, structurile care poartă informații genetice, au fost descoperite la sfârșitul secolului al nouăsprezecelea. Biologul german Walther Flemming a observat cromozomii în timpul diviziunii celulare în 1882 și a descris procesul pe care l-a numit mitoză. Omul de știință american Walter Sutton a propus în 1902 că cromozomii poartă factorii ereditari ai lui Mendel, conectând biologia celulară la știința emergentă a geneticii.

Thomas Hunt Morgan a stabilit teoria cromozomială a eredității prin experimente cu muște fructelor desfășurate la Universitatea Columbia începând cu 1908. Camera sa cu muște a devenit legendară pentru descoperiri revoluționare despre modul în care genele sunt aranjate pe cromozomi. Morgan a descoperit că anumite trăsături tind să fie moștenite împreună deoarece genele care le controlează se află pe același cromozom. El a primit Premiul Nobel pentru Fiziologie sau Medicină în 1933 pentru demonstrarea rolului cromozomilor în ereditate.

Natura genelor în sine a rămas misterioasă până când biologia moleculară a revelat baza lor chimică. Oswald Avery și colegii săi au demonstrat în 1944 că ADN-ul poartă informații genetice, deși mulți oameni de știință au rămas sceptici ani de zile după. James Watson și Francis Crick au determinat structura dublei helice a ADN-ului în 1953, deschizând era modernă a geneticii moleculare. Descoperirea lor a explicat cum informațiile genetice pot fi stocate și copiate cu o fidelitate remarcabilă.

ADN-ul constă din două șiruri înfășurate unul în jurul celuilalt, conectate prin perechi de baze care urmează reguli specifice de împerechere. Adenina se împerechează întotdeauna cu timina, în timp ce guanina se împerechează întotdeauna cu citozina. Această structură complementară înseamnă că fiecare șir poate servi ca șablon pentru producerea unei copii identice în timpul diviziunii celulare. Secvența bazelor de-a lungul unui șir de ADN codifică informații genetice la fel ca literele care formează cuvinte într-o propoziție.

Genele sunt segmente de ADN care conțin instrucțiuni pentru construirea proteinelor, moleculele care îndeplinesc majoritatea funcțiilor celulare. Genomul uman conține aproximativ 20.000 de gene care codifică proteine răspândite pe 23 de perechi de cromozomi. Fiecare genă poate exista în versiuni diferite numite alele, explicând de ce indivizii diferă în trăsături specifice. Setul complet de instrucțiuni genetice dintr-un organism se numește genomul său.

Codul genetic a fost descifrat în anii 1960 prin munca mai multor grupuri de cercetare. Marshall Nirenberg și Heinrich Matthaei au decriptat primul codon în 1961, arătând că trei baze ADN specifică un aminoacid. Până în 1966, oamenii de știință determinaseră cum toate cele 64 de combinații posibile de trei baze corespund celor 20 de aminoacizi folosiți pentru a construi proteine. Acest cod universal funcționează în practic toate formele de viață, de la bacterii la oameni.

Mutațiile genetice apar când secvențele de ADN se schimbă, afectând uneori proteinele pe care le codifică. Unele mutații apar spontan în timpul replicării ADN-ului, în timp ce altele rezultă din factori de mediu precum radiațiile sau anumite substanțe chimice. Majoritatea mutațiilor au puțin sau deloc efect, dar unele cauzează boli genetice, în timp ce altele oferă ocazional avantaje pe care evoluția le poate selecta. Boala celulelor secere, fibroza chistică și boala Huntington rezultă toate din mutații genetice specifice.

Proiectul Genom Uman, lansat în 1990 și finalizat în aprilie 2003, a determinat secvența completă a ADN-ului uman. Acest efort internațional a implicat oameni de știință de la 20 de instituții din șase țări și a costat aproximativ 2,7 miliarde de dolari. Proiectul a identificat locația tuturor genelor umane și a furnizat o secvență de referință care a permis nenumărate descoperiri ulterioare. Astăzi, secvențierea genomului unui individ costă mai puțin de o mie de dolari și durează doar câteva ore.

Testarea genetică a devenit din ce în ce mai accesibilă, permițând indivizilor să afle despre machiajul lor genetic și riscurile de boală. Testele pot identifica purtători de afecțiuni precum boala Tay-Sachs sau anemia cu celule secere care ar putea transmite aceste trăsături copiilor. Screeningul nou-născuților pentru afecțiuni genetice tratabile a devenit practică standard în majoritatea țărilor dezvoltate. Serviciile de testare genetică directe către consumatori lansate de companii precum 23andMe au adus informații genetice la milioane de oameni.

Farmacogenomica studiază cum variațiile genetice afectează răspunsurile la medicamente. Unele persoane metabolizează anumite medicamente rapid, în timp ce altele le procesează lent, afectând atât eficacitatea, cât și efectele secundare. FDA a actualizat etichetele pentru peste 200 de medicamente cu informații genetice relevante pentru utilizarea lor. Medicii folosesc din ce în ce mai mult testarea genetică pentru a selecta medicamentele și dozele cel mai potrivite pentru pacienții individuali.

Terapia genică urmărește să trateze bolile genetice prin introducerea de copii funcționale ale genelor defecte în celulele pacienților. Prima terapie genică de succes la oameni a avut loc în septembrie 1990, când William French Anderson a tratat o fetiță de patru ani cu imunodeficiență combinată severă la Institutele Naționale de Sănătate. Progresul a fost lent din cauza provocărilor tehnice și a preocupărilor de siguranță, dar anii recenți au văzut multiple terapii genice primind aprobare regulatorie.

Tehnologia de editare genică CRISPR-Cas9, dezvoltată din sistemele imunitare bacteriene, a revoluționat cercetarea genetică de când Jennifer Doudna și Emmanuelle Charpentier au publicat lucrarea lor de referință în iunie 2012. Acest instrument permite oamenilor de știință să facă modificări precise ale secvențelor de ADN cu o ușurință și acuratețe fără precedent. Doudna și Charpentier au primit Premiul Nobel pentru Chimie în 2020 pentru descoperirea lor. CRISPR are aplicații potențiale care variază de la tratarea bolilor genetice la crearea de culturi rezistente la boli.

Implicațiile etice ale tehnologiilor genetice continuă să genereze dezbateri. Testarea genetică ridică întrebări despre confidențialitate, discriminare și impacturi psihologice ale aflării riscurilor de boală. Terapia genică și editarea forțează considerarea căror afecțiuni ar trebui tratate și dacă îmbunătățirea trăsăturilor normale este acceptabilă. Nașterea primilor bebeluși cu gene editate în China în noiembrie 2018 a stârnit condamnare internațională și a evidențiat necesitatea supravegherii tehnologiilor genetice.

Genetica s-a transformat de la observarea tiparelor de ereditate în plantele de mazăre de grădină la citirea și editarea codului molecular al vieții. Această cunoaștere aduce atât o promisiune tremendă, cât și o responsabilitate semnificativă. Înțelegerea geneticii împuternicește indivizii să ia decizii de sănătate informate, în timp ce provoacă societatea să se confrunte cu întrebări profunde despre ce înseamnă să fii om într-o eră când destinul nostru genetic nu mai este fix.`,
    questions: [
      {
        id: 'health-medicine-p07-q1',
        type: 'single_choice',
        question: 'Câte plante de mazăre a încrucișat Gregor Mendel în experimentele sale?',
        options: [
          'Aproximativ 5.000',
          'Aproximativ 10.000',
          'Aproximativ 29.000',
          'Aproximativ 50.000',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q2',
        type: 'single_choice',
        question:
          'Cine a primit Premiul Nobel în 1933 pentru demonstrarea rolului cromozomilor în ereditate?',
        options: [
          'Gregor Mendel',
          'Thomas Hunt Morgan',
          'Walter Sutton',
          'Walther Flemming',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q3',
        type: 'multiple_select',
        question:
          'Care oameni de știință au contribuit la descoperirea structurii sau funcției ADN-ului? Selectați toate variantele corecte.',
        options: ['Oswald Avery', 'James Watson', 'Francis Crick', 'Gregor Mendel'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'health-medicine-p07-q4',
        type: 'true_false',
        question: 'Proiectul Genom Uman a fost finalizat în aprilie 2003.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p07-q5',
        type: 'numeric',
        question: 'Aproximativ câte gene care codifică proteine conține genomul uman?',
        correctValue: 20000,
        tolerance: 2000,
        min: 10000,
        max: 40000,
        step: 1000,
        unit: 'gene',
      },
      {
        id: 'health-medicine-p07-q6',
        type: 'single_choice',
        question: 'Când a fost efectuată prima terapie genică de succes la oameni?',
        options: ['Ianuarie 1884', 'Septembrie 1990', 'Aprilie 2003', 'Iunie 2012'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q7',
        type: 'single_choice',
        question: 'Cine a dezvoltat tehnologia de editare genică CRISPR-Cas9?',
        options: [
          'Watson și Crick',
          'Mendel și Morgan',
          'Doudna și Charpentier',
          'Nirenberg și Matthaei',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q8',
        type: 'numeric',
        question: 'Cât a costat Proiectul Genom Uman (în miliarde de dolari)?',
        correctValue: 2.7,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'miliarde dolari',
      },
      {
        id: 'health-medicine-p07-q9',
        type: 'true_false',
        question: 'Adenina se împerechează întotdeauna cu guanina în ADN.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p07-q10',
        type: 'single_choice',
        question: 'În ce an au publicat Doudna și Charpentier lucrarea lor de referință despre CRISPR?',
        options: ['2003', '2008', '2012', '2020'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q11',
        type: 'numeric',
        question: 'În ce an au redescoperit trei oameni de știință independent principiile lui Mendel?',
        correctValue: 1900,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'an',
      },
    ],
  },
  {
    id: 'health-medicine-p08',
    topicId: 'health-medicine',
    title: 'Bolile Infecțioase: Lupta Împotriva Agenților Patogeni',
    difficulty: 'advanced',
    wordCount: 2782,
    articleType: 'practice',
    orderIndex: 8,
    content: `Bolile infecțioase au modelat istoria umană mai dramatic decât războaiele, foametea sau dezastrele naturale, ucigând miliarde de oameni și alterând cursul civilizațiilor. Aceste boli rezultă din microorganisme patogene, inclusiv bacterii, viruși, ciuperci și paraziți care invadează corpul și perturbă funcțiile normale. Înțelegerea modului în care acești agenți patogeni se răspândesc și cauzează boli a permis intervenții medicale care au salvat nenumărate vieți.

Teoria germene a bolilor, dezvoltată în secolul al nouăsprezecelea, a transformat medicina prin stabilirea faptului că microorganisme specifice cauzează boli specifice. Chimistul francez Louis Pasteur a condus experimente esențiale în anii 1860, demonstrând că microorganismele cauzau fermentarea și alterarea, apoi a extins această lucrare pentru a arăta că germenii pot cauza boli la animale și oameni. Medicul german Robert Koch a stabilit criterii riguroase pentru a dovedi că un anumit microorganism cauzează o anumită boală, publicând celebrele sale postulate în 1890.

Munca lui Koch asupra tuberculozei a exemplificat puterea noii abordări a bolilor infecțioase. El a identificat Mycobacterium tuberculosis ca agent cauzal al tuberculozei în 1882, o descoperire care i-a adus Premiul Nobel pentru Fiziologie sau Medicină în 1905. Tuberculoza ucisese aproximativ un sfert din toți adulții din Europa în timpul secolului al nouăsprezecelea, făcând identificarea bacteriei de către Koch o piatră de hotar importantă în sănătatea publică.

Bacteriile sunt organisme unicelulare care pot supraviețui și se pot reproduce independent de celulele gazdă. Unele bacterii cauzează boli prin producerea de toxine, în timp ce altele deteriorează țesuturile direct prin creșterea și metabolismul lor. Antibioticele funcționează împotriva infecțiilor bacteriene prin vizarea caracteristicilor unice ale celulelor bacteriene, cum ar fi sinteza peretelui celular sau mecanismele de producție a proteinelor care diferă de cele din celulele umane.

Virușii reprezintă un tip fundamental diferit de agent patogen care nu se poate reproduce în afara celulelor gazdă. Aceste particule minuscule constau din material genetic înconjurat de o înveliș proteic și uneori o membrană exterioară. Virușii deturnează aparatul celular al celulelor infectate pentru a produce copii ale lor însele, adesea ucigând celula gazdă în proces. Antibioticele nu au efect asupra infecțiilor virale, făcând prevenirea prin vaccinare și medicamentele antivirale strategiile principale împotriva bolilor virale.

Pandemia de gripă din 1918 a demonstrat potențialul devastator al bolilor virale în lumea modernă. Această epidemie a infectat aproximativ 500 de milioane de oameni, aproximativ o treime din populația mondială la acea vreme. Estimările deceselor variază de la 50 la 100 de milioane de oameni, făcând-o unul dintre cele mai mortale evenimente din istoria omenirii. Virusul s-a răspândit rapid prin mișcările trupelor în timpul Primului Război Mondial și a copleșit sistemele medicale care nu aveau antibiotice sau medicamente antivirale de oferit.

HIV și SIDA au apărut ca o nouă amenințare de boală infecțioasă la începutul anilor 1980, ucigând în cele din urmă peste 40 de milioane de oameni în întreaga lume. Cercetătorii americani Robert Gallo și oamenii de știință francezi Luc Montagnier și Francoise Barre-Sinoussi au identificat virusul în 1983 și 1984. Dezvoltarea terapiei antiretrovirale la mijlocul anilor 1990 a transformat HIV dintr-o sentință de moarte într-o afecțiune cronică gestionabilă pentru cei cu acces la tratament. Montagnier și Barre-Sinoussi au primit Premiul Nobel pentru Fiziologie sau Medicină în 2008 pentru descoperirea lor.

Bolile parazitare afectează miliarde de oameni în întreaga lume, în principal în regiunile tropicale și subtropicale. Malaria, cauzată de paraziți Plasmodium transmiși prin înțepături de țânțari, ucide aproximativ 600.000 de oameni anual, în special copii sub cinci ani în Africa subsahariană. Omul de știință chinez Tu Youyou a descoperit artemisinin ca tratament antimalaric eficient prin studierea medicinei tradiționale chineze, câștigând Premiul Nobel în 2015 pentru această contribuție care salvează vieți.

Ciupercile cauzează infecții care variază de la afecțiuni cutanate minore la boli sistemice care amenință viața. Infecțiile fungice au crescut în ultimele decenii pe măsură ce tratamentele imunosupresoare și dispozitivele medicale creează oportunități pentru agenți patogeni oportuniști. Candida auris, identificată pentru prima dată în Japonia în 2009, s-a răspândit la nivel global și rezistă la multiple medicamente antifungice, reprezentând o amenințare emergentă care afectează în special pacienții spitalizați.

Căile de transmisie variază între diferiți agenți patogeni și determină strategiile de prevenire adecvate. Agenții patogeni respiratori se răspândesc prin picături sau aerosoli produși când indivizii infectați tușesc, strănută sau respiră. Agenții patogeni gastrointestinali se răspândesc prin alimente sau apă contaminate. Agenții patogeni transmisi prin sânge necesită contact direct cu sânge sau fluide corporale infectate. Agenții patogeni transmisi prin vectori folosesc insecte sau alte animale pentru a-i transporta între gazdele umane.

Epidemiologia studiază cum se răspândesc bolile prin populații și identifică factorii care influențează transmisia. John Snow a condus o lucrare epidemiologică pionieră în timpul epidemiei de holeră din Londra din 1854, cartografiind cazurile și determinând că apa contaminată de la pompa de pe Broad Street răspândea boala. Munca sa a precedat teoria germenelor, dar a demonstrat puterea investigației sistematice pentru a identifica sursele de boală și a preveni răspândirea ulterioară.

Vaccinarea rămâne cel mai eficient instrument pentru prevenirea bolilor infecțioase. Eradicarea variolei, certificată de Organizația Mondială a Sănătății pe 9 decembrie 1979, a demonstrat că campaniile de vaccinare coordonate pot elimina complet o boală. Poliomielita a fost redusă cu peste 99 la sută de când Inițiativa Globală de Eradicare a Poliomielitei a fost lansată în 1988, cu doar cazuri sporadice rămase în câteva țări.

Măsurile de sănătate publică dincolo de vaccinare joacă roluri cruciale în controlarea bolilor infecțioase. Apa curată și canalizarea au redus dramatic transmisia bolilor transmise prin apă în țările dezvoltate în timpul secolului al douăzecilea. Igiena mâinilor, promovată de medicul maghiar Ignaz Semmelweis în anii 1840, previne transmisia multor agenți patogeni. Măsurile de carantină și izolare încetinesc răspândirea bolilor contagioase prin separarea indivizilor infectați sau expuși de populația sănătoasă.

Rezistența antimicrobiană amenință să inverseze progresul împotriva bolilor infecțioase făcând agenții patogeni neresponsivi la tratamentele care odinioară funcționau eficient. Organizația Mondială a Sănătății estimează că infecțiile rezistente la antimicrobiene cauzează deja aproximativ 1,27 milioane de decese anual la nivel mondial. Supra-utilizarea și utilizarea greșită a antibioticelor în medicină și agricultură accelerează dezvoltarea rezistenței, în timp ce industria farmaceutică a abandonat în mare parte cercetarea antibioticelor din cauza potențialului limitat de profit.

Pandemia COVID-19 care a început la sfârșitul anului 2019 a demonstrat atât amenințarea continuă a bolilor infecțioase emergente, cât și puterea științei medicale moderne de a răspunde. Virusul SARS-CoV-2 s-a răspândit la nivel global în câteva luni, infectând sute de milioane de oameni și ucigând peste 6 milioane până în 2023. Oamenii de știință au dezvoltat vaccinuri eficiente în mai puțin de un an folosind noua tehnologie ARNm, o realizare remarcabilă care s-a construit pe decenii de cercetare anterioară.

Schimbările climatice afectează tiparele bolilor infecțioase prin modificarea arealelor geografice ale insectelor purtătoare de boli și a condițiilor care permit agenților patogeni să supraviețuiască în mediu. Țânțarii care poartă febra dengue, virusul Zika și alte boli se extind în regiuni anterior temperate. Temperaturile în creștere pot elibera agenți patogeni antici conservați în permafrost pe măsură ce se dezghețează. Aceste schimbări necesită supraveghere continuă și adaptarea strategiilor de sănătate publică.

Securitatea sanitară globală depinde de cooperarea internațională pentru a detecta și a răspunde la epidemii înainte ca acestea să se răspândească. Organizația Mondială a Sănătății coordonează eforturile globale de supraveghere și răspuns în cadrul Regulamentului Sanitar Internațional adoptat în 2005. Cu toate acestea, tensiunile politice, limitările de resurse și capacitățile naționale variabile provoacă coordonarea eficientă. Pandemia COVID-19 a revelat atât importanța cooperării globale, cât și dificultățile de a o realiza în practică.

Cercetarea continuă să avanseze înțelegerea noastră despre bolile infecțioase și să dezvolte noi instrumente pentru a le combate. Secvențierea genomică permite identificarea rapidă a agenților patogeni și urmărirea răspândirii bolilor. Inteligența artificială asistă în descoperirea medicamentelor și predicția epidemiilor. Noile platforme de vaccinuri promit dezvoltarea mai rapidă a vaccinurilor împotriva amenințărilor emergente. Aceste progrese oferă speranță că omenirea poate continua să câștige bătălii împotriva microorganismelor care ne-au amenințat de-a lungul istoriei.`,
    questions: [
      {
        id: 'health-medicine-p08-q1',
        type: 'single_choice',
        question: 'Cine a dezvoltat teoria germenelor bolii prin experimente esențiale în anii 1860?',
        options: [
          'Robert Koch',
          'Louis Pasteur',
          'John Snow',
          'Ignaz Semmelweis',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q2',
        type: 'single_choice',
        question: 'Când a fost publicată identificarea bacteriei tuberculozei de către Robert Koch?',
        options: ['1854', '1882', '1890', '1905'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q3',
        type: 'multiple_select',
        question:
          'Ce tipuri de agenți patogeni cauzează boli infecțioase? Selectați toate variantele corecte.',
        options: ['Bacterii', 'Viruși', 'Anticorpi', 'Paraziți'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p08-q4',
        type: 'true_false',
        question: 'Antibioticele sunt eficiente împotriva infecțiilor virale.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p08-q5',
        type: 'numeric',
        question:
          'Aproximativ câți oameni au fost infectați în timpul pandemiei de gripă din 1918 (în milioane)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'milioane',
      },
      {
        id: 'health-medicine-p08-q6',
        type: 'single_choice',
        question: 'Cine a condus munca epidemiologică pionieră în timpul epidemiei de holeră din Londra din 1854?',
        options: ['Louis Pasteur', 'Robert Koch', 'John Snow', 'Tu Youyou'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q7',
        type: 'single_choice',
        question: 'Când a fost certificată eradicarea variolei de către Organizația Mondială a Sănătății?',
        options: [
          '9 decembrie 1979',
          '1 ianuarie 1988',
          '15 octombrie 1990',
          '28 martie 2000',
        ],
        correctIndex: 0,
      },
      {
        id: 'health-medicine-p08-q8',
        type: 'numeric',
        question: 'Câte decese cauzează malaria anual (aproximativ)?',
        correctValue: 600000,
        tolerance: 100000,
        min: 300000,
        max: 1000000,
        step: 50000,
        unit: 'decese',
      },
      {
        id: 'health-medicine-p08-q9',
        type: 'true_false',
        question: 'Tu Youyou a descoperit artemisinin prin studierea medicinei tradiționale chineze.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p08-q10',
        type: 'single_choice',
        question: 'Când a fost identificată Candida auris pentru prima dată?',
        options: [
          '1995 în Statele Unite',
          '2002 în Europa',
          '2009 în Japonia',
          '2015 în Brazilia',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q11',
        type: 'numeric',
        question:
          'Câte decese anual sunt estimate a fi cauzate de infecțiile rezistente la antimicrobiene (în milioane)?',
        correctValue: 1.27,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'milioane',
      },
    ],
  },
  {
    id: 'health-medicine-p09',
    topicId: 'health-medicine',
    title: 'Sistemul Nervos: Înțelegerea Rețelelor Noastre Neuronale',
    difficulty: 'advanced',
    wordCount: 2987,
    articleType: 'practice',
    orderIndex: 9,
    content: `Sistemul nervos coordonează toate activitățile corpului uman printr-o rețea complexă de celule specializate care transmit semnale electrice și chimice la viteze remarcabile. Acest sistem procesează informații senzoriale din mediu, controlează mișcările musculare, reglează funcțiile organelor și generează experiența conștientă pe care o numim minte. Înțelegerea modului în care funcționează neuronii a revoluționat medicina și a aprofundat aprecierea noastră pentru complexitatea biologiei umane.

Sistemul nervos constă din două diviziuni principale care lucrează împreună fără probleme. Sistemul nervos central include creierul și măduva spinării, servind ca centru de comandă care procesează informații și generează răspunsuri. Sistemul nervos periferic cuprinde toți nervii care se extind în tot corpul, transportând semnale între sistemul nervos central și mușchi, organe și receptori senzoriali.

Neuronii, unitățile fundamentale ale sistemului nervos, numără aproximativ 86 de miliarde doar în creierul uman. Fiecare neuron constă dintr-un corp celular care conține nucleul, dendrite care primesc semnale de la alți neuroni și un axon care transmite semnale către celulele țintă. Unii axoni se extind peste un metru în lungime, conectând măduva spinării la mușchii îndepărtați din picioare.

Semnalele electrice călătoresc de-a lungul neuronilor printr-un proces numit propagarea potențialului de acțiune. În repaus, neuronii mențin o sarcină electrică negativă în interior relativ la exteriorul membranei celulare. Când sunt stimulați suficient, canalele ionice sensibile la tensiune se deschid, permițând ionilor de sodiu să se grăbească înăuntru și să inverseze potențialul membranei. Această depolarizare călătorește de-a lungul axonului ca un val, atingând viteze de până la 120 de metri pe secundă în neuronii mielinizați.

Mielina, o substanță grasă produsă de celulele gliale, se înfășoară în jurul axonilor și crește dramatic viteza de transmisie a semnalului. În sistemul nervos central, oligodendrocitele produc mielină, în timp ce celulele Schwann îndeplinesc această funcție în sistemul nervos periferic. Scleroza multiplă, o boală care afectează aproximativ 2,8 milioane de oameni în întreaga lume, rezultă din atacurile sistemului imunitar asupra mielinei care perturbă transmisia semnalului nervos.

Sinapsele sunt joncțiunile unde neuronii comunică între ei sau cu celule țintă precum mușchii. Când un potențial de acțiune ajunge la capătul unui axon, declanșează eliberarea de mesageri chimici numiți neurotransmițători. Aceste molecule traversează spațiul sinaptic și se leagă de receptori pe celula receptoare, fie excitând-o să se declanșeze, fie inhibând activitatea sa. Creierul uman conține aproximativ 100 de trilioane de conexiuni sinaptice.

Neurotransmițătorii includ o gamă diversă de substanțe chimice cu funcții diferite în tot sistemul nervos. Dopamina joacă roluri cruciale în motivație, recompensă și controlul mișcării, disfuncția sa contribuind la boala Parkinson și dependență. Serotonina reglează dispoziția, somnul și apetitul, făcând-o o țintă pentru multe medicamente antidepresive. Acetilcolina controlează contracția musculară și este implicată în formarea memoriei în creier.

Creierul afișează o organizare remarcabilă cu diferite regiuni specializate pentru funcții diferite. Cortexul cerebral, stratul încrețit exterior care acoperă cerebrumul, conține circuitul neuronal pentru gândirea conștientă, percepția senzorială, limbajul și mișcarea voluntară. Cerebelul coordonează echilibrul și controlul motor fin prin conexiuni cu alte regiuni cerebrale. Trunchiul cerebral reglează funcții vitale precum respirația, ritmul cardiac și ciclurile somn-veghe.

Paul Broca a identificat o regiune în lobul frontal stâng esențială pentru producerea vorbirii după ce a studiat pacienți cu deficite de limbaj în 1861. Carl Wernicke a descoperit o altă regiune în lobul temporal stâng importantă pentru comprehensiunea limbajului în 1874. Aceste descoperiri au demonstrat că regiuni cerebrale specifice îndeplinesc funcții specifice, un principiu numit localizare care ghidează neuroștiința modernă.

Sistemul limbic, o colecție de structuri adânci în creier, generează emoții și procesează amintiri. Amigdala detectează amenințări și declanșează răspunsuri de frică care pregătesc corpul pentru pericol. Hipocampusul convertește amintirile pe termen scurt în stocare pe termen lung, explicând de ce deteriorarea acestei structuri cauzează afectări severe ale memoriei. Pacientul H.M., al cărui hipocamp a fost îndepărtat chirurgical în 1953 pentru a trata epilepsia severă, a devenit incapabil să formeze amintiri noi păstrând în același timp pe cele vechi.

Neuroplasticitatea descrie capacitatea creierului de a se reorganiza prin formarea de noi conexiuni neuronale pe tot parcursul vieții. Această capacitate permite recuperarea de pe urma rănilor, învățarea de noi abilități și adaptarea la circumstanțe în schimbare. Cercetarea lui Michael Merzenich și a colegilor săi în anii 1980 a demonstrat că creierele adulte rețin mult mai multă plasticitate decât se credea anterior, deschizând noi posibilități pentru reabilitare după accident vascular cerebral și alte răni.

Sistemul nervos autonom controlează funcții involuntare precum ritmul cardiac, digestia și respirația fără efort conștient. Diviziunea simpatică se activează în timpul stresului, crescând ritmul cardiac, dilatând pupilele și deviind sângele către mușchi în pregătirea pentru acțiune. Diviziunea parasimpatică domină în timpul odihnei, încetinind inima, stimulând digestia și promovând relaxarea. Echilibrul între aceste diviziuni menține homeostazia.

Sistemele senzoriale traduc stimulii fizici din mediu în semnale neuronale pe care creierul le poate interpreta. Sistemul vizual procesează lumina care intră în ochi printr-o ierarhie de etape de procesare de la retină la cortexul vizual. Sistemul auditiv convertește undele sonore în semnale neuronale începând în cohleea urechii interne. Receptorii de atingere, temperatură și durere din toată pielea trimit semnale prin măduva spinării la cortexul somatosenzorial.

Sistemele motorii coordonează sutele de mușchi necesari chiar și pentru mișcări simple. Cortexul motor primar conține o hartă a corpului, cu diferite regiuni controlând diferiți mușchi. Ganglionii bazali ajută la inițierea și coordonarea mișcărilor voluntare, disfuncția lor cauzând tremurăturile și rigiditatea bolii Parkinson. Aproximativ 1 milion de americani trăiesc în prezent cu boala Parkinson, un număr care se așteaptă să se dubleze până în 2030.

Somnul implică schimbări dramatice în activitatea cerebrală care servesc funcții esențiale încă înțelese. În timpul somnului REM, creierul devine foarte activ în timp ce mușchii sunt temporar paralizați, o stare asociată cu visele vii. Somnul cu unde lente pare important pentru consolidarea memoriei și restaurarea fizică. Privarea de somn afectează funcția cognitivă, răspunsul imunitar și reglarea emoțională, demonstrând cât de crucială este această stare pentru sănătatea creierului.

Bolile neurologice afectează milioane de oameni și prezintă provocări crescânde pe măsură ce populațiile îmbătrânesc. Boala Alzheimer afectează în prezent aproximativ 6,7 milioane de americani și cauzează pierderea progresivă a memoriei și declinul cognitiv prin acumularea de proteine anormale în creier. Accidentul vascular cerebral, cauzat de vase de sânge blocate sau rupte în creier, este o cauză principală de dizabilitate pe termen lung. Cercetarea acestor afecțiuni s-a intensificat pe măsură ce prevalența lor crește.

Neuroștiința modernă folosește instrumente din ce în ce mai sofisticate pentru a studia creierul. RMN funcțional măsoară activitatea cerebrală prin detectarea schimbărilor în fluxul sanguin, relevând care regiuni se activează în timpul diferitelor sarcini. Electroencefalografia înregistrează activitatea electrică la suprafața scalpului, furnizând informații precise de sincronizare despre procesele neuronale. Optogenetica, dezvoltată de Karl Deisseroth și colegi la începutul anilor 2000, permite cercetătorilor să controleze neuroni specifici folosind lumina, permițând o precizie fără precedent în studierea circuitelor cerebrale.

Sistemul nervos reprezintă una dintre cele mai remarcabile realizări ale naturii, permițând organismelor să simtă mediul lor, să ia decizii și să execute comportamente coordonate. În ciuda progreselor tremende, multe mistere rămân despre cum activitatea neuronală dă naștere conștiinței, emoției și gândirii. Cercetarea continuă promite atât o înțelegere mai profundă a naturii umane, cât și tratamente mai bune pentru afecțiunile neurologice care afectează atât de multe vieți.`,
    questions: [
      {
        id: 'health-medicine-p09-q1',
        type: 'single_choice',
        question: 'Aproximativ câți neuroni sunt în creierul uman?',
        options: ['1 miliard', '10 miliarde', '86 de miliarde', '200 de miliarde'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q2',
        type: 'single_choice',
        question:
          'Cine a identificat o regiune în lobul frontal stâng esențială pentru producerea vorbirii în 1861?',
        options: [
          'Carl Wernicke',
          'Paul Broca',
          'Michael Merzenich',
          'Karl Deisseroth',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q3',
        type: 'multiple_select',
        question:
          'Ce neurotransmițători sunt menționați în articol? Selectați toate variantele corecte.',
        options: ['Dopamina', 'Serotonina', 'Insulina', 'Acetilcolina'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p09-q4',
        type: 'true_false',
        question: 'Scleroza multiplă rezultă din atacurile sistemului imunitar asupra mielinei.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p09-q5',
        type: 'numeric',
        question:
          'Aproximativ câți oameni din întreaga lume sunt afectați de scleroza multiplă (în milioane)?',
        correctValue: 2.8,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'milioane',
      },
      {
        id: 'health-medicine-p09-q6',
        type: 'single_choice',
        question: 'Care este funcția hipocampusului?',
        options: [
          'Detectarea amenințărilor și declanșarea fricii',
          'Convertirea amintirilor pe termen scurt în stocare pe termen lung',
          'Controlul contracției musculare',
          'Reglarea ritmului cardiac',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q7',
        type: 'single_choice',
        question: 'Ce face sistemul nervos simpatic în timpul stresului?',
        options: [
          'Încetinește ritmul cardiac și stimulează digestia',
          'Crește ritmul cardiac și dilată pupilele',
          'Promovează somnul și relaxarea',
          'Reduce tensiunea arterială',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q8',
        type: 'numeric',
        question: 'Câte conexiuni sinaptice sunt estimate în creierul uman (în trilioane)?',
        correctValue: 100,
        tolerance: 10,
        min: 50,
        max: 200,
        step: 10,
        unit: 'trilioane',
      },
      {
        id: 'health-medicine-p09-q9',
        type: 'true_false',
        question: 'Pacientul H.M. a putut forma amintiri noi după îndepărtarea hipocampusului său.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p09-q10',
        type: 'single_choice',
        question: 'Ce este optogenetica?',
        options: [
          'O tehnică de imagistică cerebrală',
          'O metodă de a controla neuroni specifici folosind lumina',
          'Un tratament pentru boala Parkinson',
          'Un tip de electroencefalografie',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q11',
        type: 'numeric',
        question: 'Câți americani trăiesc în prezent cu boala Parkinson (în milioane)?',
        correctValue: 1,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'milioane',
      },
      {
        id: 'health-medicine-p09-q12',
        type: 'single_choice',
        question: 'La ce viteza maximă pot călători semnalele în neuronii mielinizați (metri pe secundă)?',
        options: [
          '10 metri pe secundă',
          '50 de metri pe secundă',
          '120 de metri pe secundă',
          '300 de metri pe secundă',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q13',
        type: 'numeric',
        question: 'Câți americani sunt în prezent afectați de boala Alzheimer (în milioane)?',
        correctValue: 6.7,
        tolerance: 0.5,
        min: 4,
        max: 10,
        step: 0.1,
        unit: 'milioane',
      },
    ],
  },
  {
    id: 'health-medicine-p10',
    topicId: 'health-medicine',
    title: 'Imagistica Medicală: Vizualizarea Interiorului Corpului Uman',
    difficulty: 'advanced',
    wordCount: 2982,
    articleType: 'practice',
    orderIndex: 10,
    content: `Tehnologiile de imagistică medicală au transformat diagnosticul și tratamentul prin permiterea medicilor să vadă în interiorul corpului uman fără intervenție chirurgicală. Aceste instrumente revelă structuri anatomice, detectează boli, ghidează intervenții și monitorizează răspunsurile la tratament cu precizie și siguranță crescânde. Dezvoltarea imagisticii reprezintă unul dintre cele mai mari progrese ale medicinei, câștigând multiple Premii Nobel și salvând nenumărate vieți.

Wilhelm Conrad Rontgen a descoperit razele X pe 8 noiembrie 1895 în Wurzburg, Germania, în timp ce experimenta cu tuburi cu raze catodice. El a observat că un ecran fluorescent din camera de alături strălucea când tubul său era activat, indicând că unele raze invizibile treceau prin obiecte. În câteva săptămâni, Rontgen a produs prima imagine cu raze X a unei părți a corpului uman, mâna soției sale Anna, arătând clar oasele și verigheta ei. Descoperirea i-a adus primul Premiu Nobel pentru Fizică în 1901.

Razele X funcționează prin trecerea radiației electromagnetice prin corp, diferite țesuturi absorbind cantități diferite. Structurile dense precum oasele absorb mai multe raze X și apar albe pe imagini, în timp ce țesuturile moi apar cenușii și aerul apare negru. Acest contrast permite detectarea fracturilor, tumorilor, pneumoniei și a multor alte afecțiuni. Cu toate acestea, expunerea la raze X comportă riscuri mici de radiație care trebuie echilibrate față de beneficiile diagnostice.

Tomografia computerizată, sau scanarea CT, a revoluționat imagistica prin producerea de imagini transversale detaliate ale corpului. Inginerul britanic Godfrey Hounsfield și fizicianul sud-african Allan Cormack au dezvoltat independent principiile matematice și inginerești din spatele CT, împărtășind Premiul Nobel pentru Fiziologie sau Medicină în 1979. Primul scaner CT clinic a fost instalat la Spitalul Atkinson Morley din Londra în 1971, iar tehnologia s-a răspândit rapid în întreaga lume.

Scanerele CT rotesc surse de raze X în jurul pacientului în timp ce detectoarele măsoară radiația care trece prin multe unghiuri. Computerele reconstruiesc aceste măsurători în imagini detaliate ale feliilor corpului. Scanerele CT moderne pot imagina întregul corp în secunde, producând reconstrucții tridimensionale care revelă anatomia în detalii remarcabile. CT-ul ghidează acum nenumărate decizii medicale, de la stadializarea cancerului la evaluarea traumelor până la evaluarea arterelor coronare.

Imagistica prin rezonanță magnetică, sau RMN, produce imagini detaliate folosind câmpuri magnetice puternice și unde radio mai degrabă decât radiații ionizante. Medicul american Raymond Damadian a demonstrat în 1971 că tumorile și țesuturile normale au proprietăți magnetice diferite care ar putea fi folosite pentru diagnostic. Paul Lauterbur și Peter Mansfield au dezvoltat tehnici pentru a crea imagini spațiale din aceste semnale, împărtășind Premiul Nobel pentru Fiziologie sau Medicină în 2003.

Scanerele RMN plasează pacienții în interiorul magneților puternici care aliniază atomii de hidrogen din apa corpului. Pulsurile radio perturbă această aliniere, iar atomii emit semnale pe măsură ce se întorc la starea lor originală. Diferite țesuturi emit semnale diferite bazate pe conținutul lor de apă și mediul chimic, creând contrast care revelă detalii ale țesuturilor moi invizibile pentru razele X. RMN-ul excelează la imagistica creierului, măduvei spinării, articulațiilor și a multor alte structuri.

Imagistica cu ultrasunete folosește unde sonore de înaltă frecvență pentru a vizualiza structurile interne în timp real fără expunere la radiații. Un transductor trimite impulsuri sonore în corp și detectează ecouri care revin de la granițele țesuturilor. Ian Donald, un obstetrician scoțian, a fost pionier în ultrasunetele medicale în anii 1950 și a publicat prima lucrare clinică despre ultrasunetele obstetricale în 1958. Astăzi, ultrasunetele sunt metoda standard pentru monitorizarea sarcinii și sunt utilizate pe scară largă pentru multe alte aplicații.

Ecocardiografia aplică tehnologia cu ultrasunete specific inimii, revelând dimensiunile camerelor, funcția valvelor, tiparele de flux sanguin și anomaliile mișcării pereților. Cardiologii folosesc ecocardiografia pentru a diagnostica boli ale valvelor cardiace, insuficiență cardiacă, anomalii congenitale și multe alte afecțiuni. Tehnica este sigură, disponibilă pe scară largă și poate fi efectuată la patul pacientului, făcând-o esențială pentru diagnosticul cardiac.

Imagistica medicină nucleară detectează radiația emisă de trasori radioactivi injectați în pacienți. Tomografia cu emisie de pozitroni, sau scanarea PET, folosește trasori care emit pozitroni, care produc raze gamma când întâlnesc electroni. PET-ul revelă activitatea metabolică mai degrabă decât anatomia, făcând-o valoroasă pentru detectarea cancerului, evaluarea funcției cerebrale și evaluarea viabilității inimii. Scanerele PET-CT combinate îmbină informații metabolice și anatomice în examinări unice.

Imagistica moleculară reprezintă frontiera vizualizării diagnostice, revelând procese biologice la nivel celular și molecular. Trasorii țintiti care se leagă de receptori sau enzime specifice pot identifica procese de boală înainte ca schimbările anatomice să devină vizibile. Această abordare permite detectarea mai timpurie, caracterizarea mai precisă a bolilor și monitorizarea răspunsurilor la tratament la nivel molecular.

Radiologia intervențională folosește ghidare imagistică pentru a efectua proceduri minim invazive care odinioară necesitau intervenție chirurgicală deschisă. Fluoroscopia oferă imagini cu raze X în timp real care ghidează plasarea cateterului în timpul angioplastiei, inserării stentului și a altor proceduri vasculare. Ghidarea CT permite plasarea precisă a acului pentru biopsii și ablația tumorală. Aceste tehnici reduc timpii de recuperare, complicațiile și costurile comparativ cu chirurgia tradițională.

Inteligența artificială transformă imagistica medicală prin algoritmi de învățare automată care pot detecta anomalii, cuantifica severitatea bolii și prezice rezultatele. Sistemele de învățare profundă au egalat sau depășit radiologii umani în detectarea unor afecțiuni, inclusiv anumite cancere și fracturi. Instrumentele AI pot prioritiza cazurile urgente, reduce timpii de interpretare și pot îmbunătăți potențial consistența între diferiți cititori și instituții.

Siguranța radiațiilor rămâne o considerație importantă pe măsură ce volumul de imagistică continuă să crească. Americanul mediu primește acum aproximativ 3 milisieveți de expunere la radiații medicale anual, aproximativ egal cu radiația de fundal naturală. Strategiile de optimizare a dozei urmăresc să mențină calitatea imaginii minimizând în același timp expunerea la radiații. Principiul ALARA, însemnând cât mai scăzut posibil, ghidează deciziile despre utilizarea și selecția tehnicii de imagistică.

Costul și accesul prezintă provocări continue pentru tehnologiile avansate de imagistică. Un singur scaner RMN sau CT costă câteva milioane de dolari, cu cheltuieli substanțiale continue pentru întreținere, consumabile și personal. Aceste costuri contribuie la cheltuielile de sănătate și creează disparități în acces între națiunile și comunitățile bogate și sărace. Eforturile de a dezvolta alternative de imagistică la costuri mai mici pentru regiunile nedeservite continuă în întreaga lume.

Viitorul imagisticii medicale promite inovare continuă în rezoluție, viteza și specificitate. Detectoarele CT cu numărare de fotoni oferă calitate îmbunătățită a imaginii la doze mai mici de radiații. Magneții RMN cu câmp ultra-înalt revelă structuri cerebrale în detalii fără precedent. Sistemele de imagistică hibride combină multiple tehnologii pentru a furniza informații complementare în examinări unice. Aceste progrese vor extinde în continuare capacitatea medicilor de a vedea în interiorul corpului uman și de a înțelege ceea ce găsesc acolo.

Imagistica medicală exemplifică modul în care fizica și ingineria pot transforma medicina atunci când sunt aplicate creativ la problemele clinice. De la descoperirea accidentală a lui Rontgen până la interpretarea modernă îmbunătățită cu AI, acest domeniu a evoluat continuu pentru a satisface nevoile clinice în schimbare. Capacitatea de a vedea în interiorul corpului fără a-l tăia rămâne una dintre cele mai valoroase capacități ale medicinei, ghidând diagnosticul și tratamentul pentru pacienții din întreaga lume.`,
    questions: [
      {
        id: 'health-medicine-p10-q1',
        type: 'single_choice',
        question: 'Când a descoperit Wilhelm Rontgen razele X?',
        options: [
          '15 octombrie 1890',
          '8 noiembrie 1895',
          '1 ianuarie 1901',
          '12 martie 1910',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q2',
        type: 'single_choice',
        question: 'Cine a dezvoltat scanerul CT și a câștigat Premiul Nobel în 1979?',
        options: [
          'Wilhelm Rontgen și Ian Donald',
          'Raymond Damadian și Peter Mansfield',
          'Godfrey Hounsfield și Allan Cormack',
          'Paul Lauterbur și Peter Mansfield',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q3',
        type: 'multiple_select',
        question:
          'Ce tehnologii de imagistică NU folosesc radiații ionizante? Selectați toate variantele corecte.',
        options: ['RMN', 'Scanare CT', 'Ultrasunete', 'Raze X'],
        correctIndices: [0, 2],
      },
      {
        id: 'health-medicine-p10-q4',
        type: 'true_false',
        question: 'RMN-ul folosește câmpuri magnetice puternice și unde radio pentru a crea imagini.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q5',
        type: 'numeric',
        question: 'În ce an a fost instalat primul scaner CT clinic?',
        correctValue: 1971,
        tolerance: 0,
        min: 1960,
        max: 1980,
        step: 1,
        unit: 'an',
      },
      {
        id: 'health-medicine-p10-q6',
        type: 'single_choice',
        question: 'Cine a fost pionier în ultrasunetele medicale în anii 1950?',
        options: [
          'Raymond Damadian',
          'Ian Donald',
          'Paul Lauterbur',
          'Wilhelm Rontgen',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q7',
        type: 'single_choice',
        question: 'Ce revelă scanarea PET care este diferit de CT sau RMN?',
        options: [
          'Densitatea oaselor',
          'Anatomia vaselor de sânge',
          'Activitatea metabolică',
          'Elasticitatea țesuturilor',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q8',
        type: 'numeric',
        question:
          'Care este expunerea medie anuală la radiații medicale pentru americani (în milisieveți)?',
        correctValue: 3,
        tolerance: 0.5,
        min: 1,
        max: 5,
        step: 0.5,
        unit: 'milisieveți',
      },
      {
        id: 'health-medicine-p10-q9',
        type: 'true_false',
        question:
          'Raymond Damadian a demonstrat în 1971 că tumorile și țesuturile normale au proprietăți magnetice diferite.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q10',
        type: 'single_choice',
        question: 'Ce înseamnă ALARA în siguranța radiațiilor?',
        options: [
          'Întotdeauna Scade Toate Aplicațiile de Radiații',
          'Cât Mai Scăzut Posibil',
          'Limite Aplicate și Evaluarea Radiațiilor',
          'Niveluri Adecvate și Analiza Riscului',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q11',
        type: 'single_choice',
        question: 'Cine a împărțit Premiul Nobel în 2003 pentru dezvoltarea RMN-ului?',
        options: [
          'Godfrey Hounsfield și Allan Cormack',
          'Paul Lauterbur și Peter Mansfield',
          'Raymond Damadian și Ian Donald',
          'Wilhelm Rontgen și Ian Donald',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q12',
        type: 'numeric',
        question:
          'În ce an a publicat Ian Donald prima lucrare clinică despre ultrasunetele obstetricale?',
        correctValue: 1958,
        tolerance: 1,
        min: 1950,
        max: 1970,
        step: 1,
        unit: 'an',
      },
      {
        id: 'health-medicine-p10-q13',
        type: 'true_false',
        question:
          'Sistemele de învățare profundă au egalat sau depășit radiologii umani în detectarea unor afecțiuni.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q14',
        type: 'single_choice',
        question: 'Ce este radiologia intervențională?',
        options: [
          'Un tip de terapie prin radiații',
          'Folosirea ghidării imagistice pentru proceduri minim invazive',
          'O metodă pentru detectarea cancerului',
          'O tehnică avansată de RMN',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'health-medicine-c1',
    topicId: 'health-medicine',
    title: 'Inima Umană: Motorul Vieții',
    difficulty: 'intermediate',
    wordCount: 999,
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    content: `Inima umană bate de aproximativ 100.000 de ori în fiecare zi, pompând aproximativ 2.000 de galoane de sânge prin 60.000 de mile de vase de sânge. Acest mușchi remarcabil funcționează continuu de la naștere până la moarte, adaptându-se la cerințele în schimbare ale corpului fără control conștient. Înțelegerea modului în care funcționează inima ne ajută să apreciem acest organ vital și să-l protejăm de boli.

Inima are aproximativ dimensiunea unui pumn strâns și cântărește între 8 și 12 uncii la adulții sănătoși. Se află ușor în stânga centrului pieptului, protejată de coșul toracic și stern. Inima constă din patru camere care lucrează împreună într-un ritm coordonat precis, stabilit de celule electrice specializate.

Cele două camere superioare, numite atrii, primesc sângele care se întoarce la inimă. Atriul drept colectează sângele sărac în oxigen din corp prin două vene mari numite vena cavă superioară și inferioară. Atriul stâng primește sângele bogat în oxigen care se întoarce din plămâni prin patru vene pulmonare. Aceste camere au pereți relativ subțiri, deoarece trebuie doar să împingă sângele în ventriculii de dedesubt.

Cele două camere inferioare, numite ventriculi, fac munca grea de pompare. Ventriculul drept împinge sângele către plămâni, unde acesta absoarbe oxigen și eliberează dioxid de carbon. Ventriculul stâng pompează sângele bogat în oxigen către fiecare organ și țesut din corp. Ventriculul stâng are pereți mult mai groși, deoarece trebuie să genereze suficientă presiune pentru a trimite sângele în întregul sistem circulator.

Patru valve asigură că sângele curge într-o singură direcție prin inimă. Valva tricuspidă separă atriul drept de ventriculul drept, în timp ce valva mitrală îndeplinește aceeași funcție în partea stângă. Valvele pulmonară și aortică controlează sângele care părăsește inima. Când aceste valve se închid, ele creează sunetul familiar tump-tump pe care îl recunoaștem ca bătăi ale inimii.

Sistemul electric al inimii controlează sincronizarea fiecărei bătăi cu precizie remarcabilă. Nodul sinoatrial, situat în atriul drept, servește drept stimulator cardiac natural. Acest grup de celule specializate generează impulsuri electrice de aproximativ 60 până la 100 de ori pe minut la un adult în repaus. Aceste impulsuri se răspândesc prin atrii, determinându-le să se contracte și să împingă sângele în ventriculi.

După o scurtă întârziere la nodul atrioventricular, care permite ventriculilor să se umple complet, semnalul electric călătorește în jos prin fibre specializate numite fasciculul His. Aceste fibre se divid în ramuri stânga și dreapta care se răspândesc pe întregul perete ventricular. Această activare electrică coordonată determină ventriculii să se contracte puternic și simultan, ejectând sângele în artere.

William Harvey, un medic englez, a descris pentru prima dată circulația sângelui în 1628, după ani de observare și experimentare atentă. Munca sa a contrazis secole de credințe medicale stabilite de Galen, care credea că sângele este produs și consumat continuu de corp. Harvey a demonstrat că sângele circulă într-o buclă închisă, revenind la inimă pentru a fi pomapat din nou.

Arterele coronare furnizează mușchiului cardiac însuși oxigen și nutrienți. Artera coronară stângă se divide în două ramuri principale care alimentează partea stângă și partea frontală a inimii. Artera coronară dreaptă alimentează ventriculul drept și partea inferioară a inimii. Blocajele în aceste artere cauzează atacuri de cord, care distrug porțiuni din mușchiul cardiac lipsit de flux sanguin.

Bolile de inimă rămân principala cauză de deces la nivel mondial, reclamând aproximativ 18 milioane de vieți în fiecare an, conform Organizației Mondiale a Sănătății. Factorii de risc includ tensiunea arterială mare, colesterolul ridicat, fumatul, diabetul, obezitatea și inactivitatea fizică. Mulți dintre acești factori răspund la schimbări în stilul de viață, inclusiv modificarea dietei și exerciții regulate.

Medicina modernă a dezvoltat tratamente remarcabile pentru bolile de inimă. Medicamentele pot controla tensiunea arterială, pot reduce colesterolul și pot preveni cheagurile de sânge. Proceduri precum angioplastia deschid arterele blocate folosind baloane minuscule și stenturi metalice. Chirurgia de bypass creează noi rute pentru fluxul sanguin în jurul arterelor coronare blocate, folosind vase prelevate din alte părți ale corpului.

Primul transplant de inimă uman de succes a fost efectuat de Dr. Christiaan Barnard la Cape Town, Africa de Sud, pe 3 decembrie 1967. Pacientul, Louis Washkansky, a primit inima unei tinere femei care murise într-un accident de mașină. Deși Washkansky a trăit doar 18 zile, această operație revoluționară a demonstrat că transplantul de inimă era posibil și a deschis calea pentru medicina transplantului modern.

Îngrijirea inimii tale necesită atenție la obiceiurile zilnice. Exercițiile aerobice regulate întăresc mușchiul cardiac și îi îmbunătățesc eficiența. O dietă bogată în fructe, legume, cereale integrale și proteine slabe susține sănătatea cardiovasculară. Evitarea tutunului, limitarea alcoolului, gestionarea stresului și menținerea unei greutăți sănătoase reduc semnificativ riscul de boli de inimă.`,
    questions: [
      {
        id: 'health-medicine-c1-q1',
        type: 'single_choice',
        question: 'Care cameră a inimii are cei mai groși pereți?',
        options: [
          'Atriul drept',
          'Atriul stâng',
          'Ventriculul drept',
          'Ventriculul stâng',
        ],
        correctIndex: 3,
      },
      {
        id: 'health-medicine-c1-q2',
        type: 'multiple_select',
        question: 'Care sunt factorii de risc pentru bolile de inimă menționați în articol? Selectați toate variantele corecte.',
        options: [
          'Tensiune arterială mare',
          'Colesterol scăzut',
          'Fumat',
          'Inactivitate fizică',
        ],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c1-q3',
        type: 'true_false',
        question: 'William Harvey a descoperit că sângele este produs și consumat continuu de corp.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c1-q4',
        type: 'numeric',
        question: 'Aproximativ de câte ori bate inima umană în fiecare zi?',
        correctValue: 100000,
        tolerance: 10000,
        min: 50000,
        max: 200000,
        step: 10000,
        unit: 'bătăi',
      },
      {
        id: 'health-medicine-c1-q5',
        type: 'single_choice',
        question: 'Cine a efectuat primul transplant de inimă uman de succes?',
        options: [
          'William Harvey',
          'Louis Pasteur',
          'Christiaan Barnard',
          'Jonas Salk',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c1-q6',
        type: 'single_choice',
        question: 'Ce servește drept stimulator cardiac natural al inimii?',
        options: [
          'Nodul atrioventricular',
          'Nodul sinoatrial',
          'Fasciculul His',
          'Valva mitrală',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c1-q7',
        type: 'numeric',
        question: 'În ce an a descris William Harvey pentru prima dată circulația sângelui?',
        correctValue: 1628,
        tolerance: 0,
        min: 1500,
        max: 1800,
        step: 1,
        unit: 'an',
      },
    ],
  },
  {
    id: 'health-medicine-c2',
    topicId: 'health-medicine',
    title: 'Cancerul: Înțelegerea și Combaterea Bolii',
    difficulty: 'intermediate',
    wordCount: 1995,
    articleType: 'certification',
    orderIndex: 2,
    certificationLength: 'medium',
    content: `Cancerul rămâne una dintre cele mai formidabile provocări de sănătate ale umanității, afectând milioane de vieți în întreaga lume în fiecare an. Această colecție de boli apare atunci când celulele cresc necontrolat și se răspândesc în țesuturile înconjurătoare, perturbând funcțiile normale ale corpului. Înțelegerea cancerului necesită cunoștințe de biologie celulară, genetică și progresul remarcabil pe care cercetătorii l-au făcut în dezvoltarea tratamentelor în ultimul secol.

Societatea Americană de Cancer estimează că aproximativ 1,9 milioane de cazuri noi de cancer au fost diagnosticate în Statele Unite în 2023, cu aproximativ 609.000 de decese din cauza bolii. Cancerul se situează pe locul doi ca și cauză de deces în majoritatea țărilor dezvoltate, după bolile de inimă. Cu toate acestea, ratele de supraviețuire s-au îmbunătățit dramatic în ultimele decenii datorită progreselor în detectare, tratament și strategii de prevenire.

Cancerul se dezvoltă printr-un proces în mai multe etape care durează de obicei ani sau decenii pentru a se completa. Celulele normale cresc, se divid și mor conform unor programe genetice strict reglementate. Cancerul începe când mutațiile se acumulează în genele care controlează aceste procese. Oncogenele, când sunt activate, determină creșterea excesivă a celulelor. Genele supresoare de tumori, când sunt inactivate, elimină frânele cruciale asupra diviziunii celulare. Majoritatea cancerelor necesită mutații în mai multe gene înainte de a deveni maligne.

Factorii de mediu cauzează multe dintre mutațiile care duc la cancer. Fumul de țigară conține peste 70 de carcinogeni cunoscuți care deteriorează ADN-ul în plămâni, gât și alte țesuturi. Raportul Chirurgului General din 1964 a legat definitiv fumatul de cancerul pulmonar, conducând în cele din urmă la campanii de sănătate publică care au redus ratele de fumat în multe țări. Radiația ultravioletă de la lumina soarelui deteriorează ADN-ul celulelor pielii, cauzând melanomul și alte cancere de piele. Substanțele chimice industriale, anumite virusuri și expunerea la radiații cresc, de asemenea, riscul de cancer.

Factorii ereditari reprezintă aproximativ 5 până la 10 procente din toate cancerele. Mutațiile genelor BRCA1 și BRCA2 cresc dramatic riscurile de cancer de sân și ovarian. Actrița Angelina Jolie a atras atenția asupra acestor gene în mai 2013, când a discutat public despre mastectomia sa preventivă după ce a testat pozitiv pentru BRCA1. Sindromul Lynch cauzează susceptibilitate ereditară la cancerul colorectal și alte câteva cancere. Testarea genetică poate identifica persoanele cu risc ridicat care pot beneficia de supraveghere crescută sau intervenții preventive.

Sistemul imunitar recunoaște și distruge în mod normal celulele anormale, dar celulele canceroase evoluează mecanisme pentru a evita detectarea imunitară. Ele pot afișa mai puțini markeri de identificare pe suprafețele lor sau pot elibera substanțe chimice care suprimă răspunsurile imunitare. Înțelegerea acestor strategii de evaziune a condus la tratamente revoluționare de imunoterapie care restabilesc capacitatea sistemului imunitar de a lupta împotriva cancerului.

Chirurgia rămâne tratamentul principal pentru multe tumori solide și poate vindeca cancerul când este detectat devreme, înainte de a se răspândi în alte locații. Medicii egipteni antici au descris îndepărtarea chirurgicală a tumorilor în Papirusul Edwin Smith în jurul anului 1600 î.Hr. Tehnicile chirurgicale moderne permit îndepărtarea precisă a tumorii, păstrând țesutul sănătos înconjurător. Chirurgii pot îndepărta, de asemenea, ganglionii limfatici din apropiere pentru a verifica răspândirea cancerului și pentru a preveni recidiva.

Radioterapia folosește fascicule de energie înaltă pentru a deteriora ADN-ul celulelor canceroase, împiedicându-le să se dividă. Wilhelm Rontgen a descoperit razele X în noiembrie 1895, iar medicii au început să folosească radiații pentru a trata cancerul în câteva luni. Radioterapia modernă poate viza tumorile precis, minimizând în același timp daunele aduse țesuturilor înconjurătoare. Acceleratoarele liniare livrează radiații din mai multe unghiuri, concentrând doza acolo unde fasciculele se intersectează la tumoare.

Chimioterapia folosește medicamente care ucid celulele care se divid rapid în tot corpul. Primii agenți de chimioterapie au apărut din cercetările din Al Doilea Război Mondial asupra gazului muștar, despre care s-a constatat că suprimă activitatea măduvei osoase. Sidney Farber a obținut prima remisie a leucemiei infantile folosind aminopterina în 1948 la Spitalul de Copii din Boston. Astăzi, zeci de medicamente de chimioterapie atacă celulele canceroase prin diferite mecanisme, deși efectele secundare rămân semnificative, deoarece medicamentele afectează și celulele normale care se divid rapid.

Terapiile țintite atacă caracteristici moleculare specifice ale celulelor canceroase, cruțând celulele normale. Medicamentul imatinib, aprobat în mai 2001, a revoluționat tratamentul leucemiei mieloide cronice prin blocarea unei proteine anormale specifice care determină boala. Aproape 90 la sută din pacienții cu această leucemie odinioară fatală supraviețuiesc acum pe termen lung cu tratament cu imatinib. Cercetătorii au dezvoltat de atunci medicamente țintite pentru multe alte cancere cu vulnerabilități moleculare specifice.

Imunoterapia a apărut ca cea mai interesantă frontieră în tratamentul cancerului în ultimii ani. Inhibitorii de checkpoint elimină frânele moleculare pe care celulele canceroase le folosesc pentru a evita atacul imunitar. James Allison de la Centrul de Cancer MD Anderson și Tasuku Honjo de la Universitatea Kyoto au descoperit independent aceste mecanisme de checkpoint în anii 1990. Munca lor le-a adus Premiul Nobel pentru Fiziologie sau Medicină în 2018. Inhibitorii de checkpoint au produs remisii durabile la pacienții cu melanom avansat, cancer pulmonar și mai multe alte tipuri de tumori.

Terapia cu celule CAR-T reprezintă un alt avans în imunoterapie care modifică genetic celulele imunitare ale pacienților pentru a lupta împotriva cancerului. Oamenii de știință îndepărtează celulele T din sângele unui pacient și le modifică genetic pentru a recunoaște celulele canceroase. După înmulțirea acestor celule modificate în laborator, medicii le perfuzează înapoi în pacient. FDA a aprobat prima terapie CAR-T pentru leucemia infantilă în august 2017, după ce studiile clinice au arătat rate de răspuns remarcabile la pacienții care eșuaseră la alte tratamente.

Programele de screening al cancerului detectează cancerele mai devreme, când sunt mai tratabile. Mamografia reduce decesele prin cancer de sân prin identificarea tumorilor înainte ca acestea să se răspândească. Colonoscopia poate preveni cancerul colorectal prin îndepărtarea polipilor precanceroși. Testele Papanicolau au redus dramatic decesele prin cancer de col uterin de la introducerea lor de către George Papanicolaou în anii 1940. Vaccinarea HPV previne acum infecțiile care cauzează majoritatea cancerelor de col uterin.

Prevenirea rămâne cea mai eficientă strategie împotriva multor cancere. Nefumatul previne aproximativ 30 la sută din toate decesele prin cancer. Menținerea unei greutăți sănătoase prin dietă și exerciții reduce riscurile multor tipuri de cancer. Limitarea consumului de alcool, protejarea pielii de expunerea la soare și evitarea carcinogenilor cunoscuți reduc toate riscul de cancer. Vaccinarea împotriva hepatitei B și papilomavirusului uman previne, respectiv, cancerele hepatice și cele de col uterin.

Tratamentul cancerului implică din ce în ce mai mult abordări personalizate bazate pe caracteristicile specifice ale tumorii fiecărui pacient. Secvențierea genetică poate identifica mutațiile care sugerează care tratamente vor fi cele mai eficiente. Biopsiile lichide detectează ADN-ul cancerului în probele de sânge, permițând monitorizarea răspunsului la tratament fără proceduri invazive. Inteligența artificială îi ajută pe patologi să analizeze probele de țesuturi și să identifice tipare subtile care prezic rezultatele.

Povara economică a cancerului este uriașă, cu costuri de tratament care depășesc 200 de miliarde de dolari anual doar în Statele Unite. Mulți pacienți se confruntă cu dificultăți financiare din cauza cheltuielilor de tratament, veniturilor pierdute și costurilor conexe. Dezbaterile privind politicile de sănătate continuă cu privire la modul de echilibrare a stimulentelor pentru inovare cu accesul accesibil la medicamentele împotriva cancerului, dintre care unele costă peste 100.000 de dolari pe an.

În ciuda progresului uriaș, cercetarea cancerului se confruntă încă cu provocări enorme. Heterogenitatea tumorilor înseamnă că celulele canceroase din cadrul unui singur pacient pot avea mutații diferite, permițând unora să supraviețuiască tratamentelor care îi ucid pe altele. Cancerul metastatic, care s-a răspândit în locații îndepărtate, rămâne în mare parte incurabil pentru majoritatea tipurilor de tumori. Rezistența la medicamente se dezvoltă atunci când celulele canceroase evoluează mecanisme pentru a supraviețui tratamentului.

Ultimele decenii au transformat cancerul dintr-un diagnostic uniform fatal într-o afecțiune cronică gestionabilă pentru mulți pacienți. Ratele de supraviețuire la cinci ani pentru toate cancerele combinate au crescut de la aproximativ 50 la sută în anii 1970 la peste 68 la sută astăzi. Unele cancere care odinioară erau condamnări la moarte au acum rate de vindecare care depășesc 90 la sută atunci când sunt prinse devreme. Cercetarea și investiția continuă oferă speranța că generațiile viitoare vor vedea progrese și mai mari împotriva acestui vechi inamic.`,
    questions: [
      {
        id: 'health-medicine-c2-q1',
        type: 'single_choice',
        question: 'Ce procent din cancere sunt cauzate de factori ereditari?',
        options: [
          '1 până la 2 procente',
          '5 până la 10 procente',
          '20 până la 30 procente',
          '40 până la 50 procente',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q2',
        type: 'single_choice',
        question: 'Cine a obținut prima remisie a leucemiei infantile folosind chimioterapie?',
        options: [
          'Wilhelm Rontgen',
          'George Papanicolaou',
          'Sidney Farber',
          'James Allison',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q3',
        type: 'multiple_select',
        question: 'Care sunt factorii de mediu care pot cauza cancer? Selectați toate variantele corecte.',
        options: [
          'Fumul de țigară',
          'Radiația ultravioletă',
          'Mutațiile genei BRCA',
          'Anumite virusuri',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c2-q4',
        type: 'true_false',
        question: 'Inhibitorii de checkpoint funcționează prin uciderea directă a celulelor canceroase cu radiații.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c2-q5',
        type: 'numeric',
        question: 'În ce an a fost publicat raportul Chirurgului General care leagă fumatul de cancerul pulmonar?',
        correctValue: 1964,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'an',
      },
      {
        id: 'health-medicine-c2-q6',
        type: 'single_choice',
        question: 'Ce medicament a revoluționat tratamentul leucemiei mieloide cronice?',
        options: [
          'Aminopterina',
          'Imatinib',
          'Metotrexat',
          'Cisplatin',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q7',
        type: 'single_choice',
        question: 'Ce face terapia cu celule CAR-T?',
        options: [
          'Folosește radiații pentru a ucide celulele canceroase',
          'Îndepărtează tumorile chirurgical',
          'Modifică genetic celulele imunitare ale pacienților pentru a lupta împotriva cancerului',
          'Blochează aprovizionarea cu sânge a tumorilor',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q8',
        type: 'multiple_select',
        question: 'Cine a câștigat Premiul Nobel în 2018 pentru descoperiri care au condus la terapia cu inhibitori de checkpoint? Selectați toate variantele corecte.',
        options: [
          'Sidney Farber',
          'James Allison',
          'George Papanicolaou',
          'Tasuku Honjo',
        ],
        correctIndices: [1, 3],
      },
      {
        id: 'health-medicine-c2-q9',
        type: 'numeric',
        question: 'Aproximativ ce procent din decesele prin cancer ar putea fi prevenite prin nefumat?',
        correctValue: 30,
        tolerance: 5,
        min: 10,
        max: 50,
        step: 5,
        unit: 'procent',
      },
      {
        id: 'health-medicine-c2-q10',
        type: 'true_false',
        question: 'FDA a aprobat prima terapie CAR-T în august 2017.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-c3',
    topicId: 'health-medicine',
    title: 'Sănătatea Mintală: Înțelegerea Minții și a Tulburărilor Sale',
    difficulty: 'advanced',
    wordCount: 2993,
    articleType: 'certification',
    orderIndex: 3,
    certificationLength: 'long',
    content: `Afecțiunile de sănătate mintală afectează sute de milioane de oameni din întreaga lume, influențând gândurile, emoțiile, comportamentele și relațiile în moduri care pot fi profund invalidante. Aceste tulburări rezultă din interacțiuni complexe între factori biologici, psihologici și sociali pe care oamenii de știință abia încep să îi înțeleagă pe deplin. Progresele în neuroștiință și psihologie au transformat tratamentul, totuși stigmatul și accesul limitat la îngrijire rămân bariere semnificative pentru mulți dintre cei care au nevoie de ajutor.

Organizația Mondială a Sănătății estimează că aproximativ un miliard de oameni din întreaga lume trăiesc în prezent cu o tulburare mintală. Depresia afectează peste 280 de milioane de oameni la nivel global și se clasează printre principalele cauze de dizabilitate. Tulburările de anxietate afectează aproximativ 301 milioane de oameni, manifestându-se prin îngrijorare excesivă, atacuri de panică și comportamente de evitare. Aceste afecțiuni cauzează suferință imensă și costuri economice substanțiale prin pierderea productivității și cheltuielile de îngrijire medicală.

Istoria tratamentului sănătății mintale include multe capitole întunecate pe care abordările moderne au căutat să le corecteze. Înainte de dezvoltarea medicamentelor eficiente, oamenii cu boli mintale grave se confruntau adesea cu internarea în aziluri cu beneficii terapeutice minime. Tratamente precum lobotomia, efectuată pentru prima dată de neurologul portughez Antonio Egas Moniz în 1935, au cauzat leziuni cerebrale ireversibile, producând ocazional îmbunătățiri temporare ale simptomelor. Mișcarea de dezinstituționalizare din anii 1960 și 1970 a închis multe spitale psihiatrice, dar adesea nu a reușit să ofere alternative comunitare adecvate.

Descoperirea clorpromazinei în 1950 de către compania farmaceutică franceză Rhone-Poulenc a marcat începutul farmacologiei psihiatrice moderne. Henri Laborit, un chirurg francez, i-a recunoscut pentru prima dată efectele sedative și psihologice, conducând la studii la pacienții psihiatrici. Jean Delay și Pierre Deniker de la Spitalul Sainte-Anne din Paris au demonstrat eficacitatea sa pentru schizofrenie în 1952. Această descoperire a arătat că bolile mintale pot fi tratate cu medicamente, transformând posibilitățile terapeutice ale domeniului.

Medicamentele antidepresive au apărut la sfârșitul anilor 1950 prin două descoperiri paralele. Iproniazidul, dezvoltat inițial pentru a trata tuberculoza, s-a constatat că îmbunătățește dispoziția la unii pacienți în 1957. Imipramina, sintetizată de compania farmaceutică elvețiană Geigy, s-a dovedit eficientă pentru depresie după studiile clinice ale lui Roland Kuhn în 1958. Aceste medicamente funcționau prin mecanisme diferite, lansând cercetări asupra bazei neurochimice a depresiei care continuă și astăzi.

Ipoteza monoaminelor a propus că depresia rezultă din deficiențe ale neurotransmițătorilor, inclusiv serotonina, norepinefrina și dopamina. Această teorie a ghidat dezvoltarea inhibitorilor selectivi ai recaptării serotoninei, sau ISRS, care au devenit disponibili începând cu fluoxetina în 1987. ISRS au oferit siguranță îmbunătățită în comparație cu antidepresivele anterioare și au devenit printre cele mai prescrise medicamente la nivel mondial. Cu toate acestea, ipoteza monoaminelor este acum recunoscută ca fiind prea simplificată, iar mulți pacienți nu răspund adecvat la aceste medicamente.

Psihoterapia oferă tratament eficient pentru multe afecțiuni de sănătate mintală, fie singură, fie combinată cu medicamente. Sigmund Freud a dezvoltat psihanaliza la Viena la sfârșitul secolului al nouăsprezecelea, punând accent pe conflictele inconștiente și experiențele din prima copilărie. Deși multe dintre teoriile specifice ale lui Freud au fost puse sub semnul întrebării, recunoașterea sa că factorii psihologici influențează sănătatea mintală a modelat fundamental domeniul.

Terapia cognitiv-comportamentală, dezvoltată de Aaron Beck în anii 1960, se concentrează pe identificarea și schimbarea tiparelor de gândire negativă care contribuie la suferința emoțională. Studiile clinice au demonstrat eficacitatea TCC pentru depresie, tulburări de anxietate, tulburări alimentare și multe alte afecțiuni. Tratamentul necesită de obicei 12 până la 20 de sesiuni și învață abilități pe care pacienții le pot continua să le aplice independent. Beck a dezvoltat abordarea inițial pentru depresie după ce a observat că pacienții săi raportau tipare consistente de gânduri automate negative.

Tulburările de anxietate cuprind mai multe afecțiuni distincte care au ca trăsătură centrală frica sau îngrijorarea excesivă. Tulburarea de anxietate generalizată implică îngrijorare persistentă cu privire la multiple domenii ale vieții, care este dificil de controlat. Tulburarea de panică cauzează episoade bruște de frică intensă cu simptome fizice, inclusiv bătăi rapide ale inimii, transpirație și dificultăți de respirație. Tulburarea de anxietate socială creează frică intensă de situații sociale în care cineva ar putea fi evaluat negativ de alții. Fobiile specifice implică frică excesivă față de obiecte sau situații particulare, cum ar fi înălțimile, păianjenii sau spațiile închise.

Tulburarea de stres post-traumatic se dezvoltă la unii oameni în urma expunerii la traumă severă, inclusiv luptă, agresiune, accidente sau dezastre naturale. Simptomele includ amintiri intruzive, coșmaruri, evitarea amintirii traumei, schimbări negative ale dispoziției și răspunsuri înălțate de activare. Afecțiunea afectează aproximativ 3,5 procente din americani în fiecare an, cu prevalență pe viață în jurul valorii de 7 procente. Femeile au aproximativ de două ori mai multe șanse decât bărbații să dezvolte PTSD în urma expunerii la traumă.

Schizofrenia afectează aproximativ 24 de milioane de oameni din întreaga lume și cauzează perturbări profunde ale gândirii, percepției, emoțiilor și comportamentului. Simptomele pozitive includ halucinații, deliruri și vorbire dezorganizată. Simptomele negative includ expresie emoțională redusă, motivație diminuată și retragere socială. Tulburarea apare de obicei la sfârșitul adolescenței sau la începutul vârstei adulte și urmează adesea un curs cronic care necesită management pe termen lung.

Tulburarea bipolară implică episoade de manie sau hipomanie care alternează cu depresia. Episoadele maniacale includ dispoziție ridicată, nevoie scăzută de somn, gânduri galopante și comportament riscant. Afecțiunea afectează aproximativ 40 de milioane de oameni la nivel mondial. Kay Redfield Jamison, o psiholog de la Universitatea Johns Hopkins care însăși are tulburare bipolară, a scris lucrări influente care explorează relația afecțiunii cu creativitatea, documentând în același timp efectele sale devastatoare.

Tulburările alimentare, inclusiv anorexia nervoasă, bulimia nervoasă și tulburarea de alimentație compulsivă, implică perturbări grave ale comportamentului alimentar și gândurilor și emoțiilor conexe. Anorexia nervoasă are cea mai ridicată rată de mortalitate dintre toate tulburările psihiatrice, cu aproximativ 5 procente dintre cei afectați murind din cauza complicațiilor medicale sau sinuciderii. Aceste afecțiuni se dezvoltă cel mai frecvent în timpul adolescenței și afectează predominant femeile, deși bărbații pot fi, de asemenea, afectați.

Tulburările de utilizare a substanțelor implică utilizarea compulsivă a alcoolului, drogurilor sau altor substanțe, în ciuda consecințelor dăunătoare. Epidemia de opioide din Statele Unite a ucis peste 500.000 de oameni din 1999 prin decese prin supradoză. Abordările de tratament includ medicamente precum metadona și buprenorfina pentru dependența de opioide, împreună cu terapii comportamentale care abordează factorii psihologici subiacenți. Programele de doisprezece pași, precum Alcoolici Anonimi, oferă sprijin din partea semenilor pe care mulți îl consideră esențial pentru recuperare.

Sinuciderea revendică aproximativ 700.000 de vieți la nivel global în fiecare an, făcând-o o preocupare majoră de sănătate publică. Bărbații mor prin sinucidere la rate mai ridicate decât femeile în majoritatea țărilor, deși femeile încearcă sinuciderea mai frecvent. Factorii de risc includ tentative anterioare, tulburări mintale, abuz de substanțe, accesul la mijloace letale și pierderi sau crize recente. Strategiile de prevenire includ restricționarea accesului la mijloace, promovarea comportamentului de căutare a ajutorului și pregătirea furnizorilor de servicii medicale să recunoască semnele de avertizare.

Stigmatul rămâne o barieră semnificativă în calea tratamentului sănătății mintale. Oamenii cu boli mintale se confruntă adesea cu discriminare în muncă, locuințe și relații sociale. Teama de a fi etichetat poate împiedica persoanele să caute ajutor sau să își dezvăluie afecțiunile altora. Campaniile anti-stigmat subliniază că tulburările mintale sunt afecțiuni medicale tratabile, mai degrabă decât eșecuri personale sau defecte de caracter.

Accesul la serviciile de sănătate mintală variază dramatic în funcție de regiuni și grupuri socioeconomice. În țările cu venituri mici, poate exista doar un psihiatru la un milion de oameni, comparativ cu peste 100 la un milion în țările cu venituri mari. Chiar și în națiunile bogate, mulți nu își pot permite tratamentul sau se confruntă cu așteptări lungi pentru programări. Telesănătatea a extins accesul în timpul pandemiei COVID-19 și poate schimba permanent modul în care sunt furnizate serviciile de sănătate mintală.

Cercetarea continuă să avanseze înțelegerea sănătății mintale și să dezvolte noi tratamente. Studiile de imagistică cerebrală relevă diferențe structurale și funcționale asociate cu diverse tulburări. Studiile genetice identifică variante de risc care influențează vulnerabilitatea la boli mintale. Compuși psihedelici, inclusiv psilocibina și MDMA, sunt cercetați ca potențiale tratamente pentru depresie și PTSD după decenii de interzicere a cercetării. Ketamina și esketamina au primit aprobare pentru depresia rezistentă la tratament, funcționând prin mecanisme diferite de antidepresivele tradiționale.

Sănătatea mintală este din ce în ce mai recunoscută ca esențială pentru bunăstarea și funcționarea generală, mai degrabă decât o preocupare separată de sănătatea fizică. Conexiunea minte-corp înseamnă că factorii psihologici influențează sănătatea fizică, în timp ce afecțiunile fizice afectează stările mintale. Modelele de îngrijire integrată abordează atât nevoile de sănătate mintală, cât și fizică împreună. Promovarea sănătății mintale pe tot parcursul vieții, de la copilăria timpurie până la bătrânețe, beneficiază atât indivizii, cât și comunitățile deopotrivă.`,
    questions: [
      {
        id: 'health-medicine-c3-q1',
        type: 'single_choice',
        question: 'Câți oameni din întreaga lume trăiesc cu o tulburare mintală conform OMS?',
        options: [
          'Aproximativ 100 de milioane',
          'Aproximativ 500 de milioane',
          'Aproximativ un miliard',
          'Aproximativ două miliarde',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q2',
        type: 'single_choice',
        question: 'Cine a efectuat prima lobotomie în 1935?',
        options: [
          'Henri Laborit',
          'Aaron Beck',
          'Antonio Egas Moniz',
          'Roland Kuhn',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q3',
        type: 'multiple_select',
        question: 'Care neurotransmițători sunt implicați în ipoteza monoaminelor depresiei? Selectați toate variantele corecte.',
        options: [
          'Serotonina',
          'Norepinefrina',
          'Acetilcolina',
          'Dopamina',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c3-q4',
        type: 'true_false',
        question: 'Terapia cognitiv-comportamentală a fost dezvoltată de Sigmund Freud la Viena.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q5',
        type: 'numeric',
        question: 'Câți oameni la nivel global sunt afectați de depresie (în milioane)?',
        correctValue: 280,
        tolerance: 30,
        min: 200,
        max: 400,
        step: 10,
        unit: 'milioane',
      },
      {
        id: 'health-medicine-c3-q6',
        type: 'single_choice',
        question: 'Când s-a demonstrat că clorpromazina este eficientă pentru schizofrenie?',
        options: [
          '1935',
          '1950',
          '1952',
          '1987',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q7',
        type: 'single_choice',
        question: 'Cine a dezvoltat terapia cognitiv-comportamentală în anii 1960?',
        options: [
          'Sigmund Freud',
          'Aaron Beck',
          'Jean Delay',
          'Kay Redfield Jamison',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q8',
        type: 'numeric',
        question: 'Aproximativ câți oameni la nivel mondial sunt afectați de schizofrenie (în milioane)?',
        correctValue: 24,
        tolerance: 3,
        min: 10,
        max: 40,
        step: 1,
        unit: 'milioane',
      },
      {
        id: 'health-medicine-c3-q9',
        type: 'true_false',
        question: 'Anorexia nervoasă are cea mai ridicată rată de mortalitate dintre toate tulburările psihiatrice.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-c3-q10',
        type: 'single_choice',
        question: 'Când a devenit disponibilă fluoxetina, primul ISRS?',
        options: [
          '1958',
          '1972',
          '1987',
          '1995',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q11',
        type: 'multiple_select',
        question: 'Care sunt simptomele pozitive ale schizofreniei? Selectați toate variantele corecte.',
        options: [
          'Halucinații',
          'Expresie emoțională redusă',
          'Deliruri',
          'Vorbire dezorganizată',
        ],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c3-q12',
        type: 'numeric',
        question: 'Câte vieți a revendicat epidemia de opioide din Statele Unite din 1999 (în mii)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'mii',
      },
      {
        id: 'health-medicine-c3-q13',
        type: 'single_choice',
        question: 'Care este prevalența aproximativă pe viață a PTSD la americani?',
        options: [
          'Aproximativ 3 procente',
          'Aproximativ 7 procente',
          'Aproximativ 15 procente',
          'Aproximativ 25 procente',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q14',
        type: 'numeric',
        question: 'Aproximativ câte vieți sunt revendicate de sinucidere la nivel global în fiecare an (în mii)?',
        correctValue: 700,
        tolerance: 50,
        min: 500,
        max: 1000,
        step: 50,
        unit: 'mii',
      },
      {
        id: 'health-medicine-c3-q15',
        type: 'true_false',
        question: 'Femeile mor prin sinucidere la rate mai ridicate decât bărbații în majoritatea țărilor.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q16',
        type: 'single_choice',
        question: 'Ce tratamente sunt cercetate pentru depresie și PTSD după decenii de interzicere?',
        options: [
          'ISRS și IMAO',
          'Psilocibină și MDMA',
          'Imipramină și iproniazid',
          'Clorpromazină și haloperidol',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q17',
        type: 'numeric',
        question: 'Câte sesiuni necesită de obicei TCC?',
        correctValue: 16,
        tolerance: 4,
        min: 8,
        max: 30,
        step: 2,
        unit: 'sesiuni',
      },
    ],
  },
];
