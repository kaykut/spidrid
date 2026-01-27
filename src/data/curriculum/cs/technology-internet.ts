import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Jak Funguje Internet",
    "content": "Internet propojuje miliardy zařízení po celém světě prostřednictvím složité sítě sítí, která se rozprostírá na všech kontinentech Země. Pokaždé, když navštívíte webovou stránku, odešlete e-mail nebo streamujete video, data putují po této rozsáhlé digitální infrastruktuře během pouhých milisekund. Pochopení tohoto pozoruhodného systému nám pomáhá ocenit technologii, která transformovala moderní komunikaci.\n\nKdyž zadáte adresu webové stránky do svého prohlížeče, okamžitě začne složitý proces. Váš počítač nejprve kontaktuje server systému Domain Name System, který přeloží adresu čitelnou pro člověka na číselnou IP adresu, které rozumí počítače. Funguje to podobně jako vyhledávání telefonního čísla v seznamu, kde se názvy přiřazují ke skutečným kontaktním informacím.\n\nVaše žádost pak putuje přes vašeho poskytovatele internetových služeb (ISP) do páteřních sítí, které tvoří hlavní infrastrukturu internetu. Tyto vysokokapacitní optické kabely se táhnou přes kontinenty a překračují oceány v hloubkách přesahujících 6000 metrů. Přenášejí obrovské množství dat téměř rychlostí světla a zpracovávají přes 500 bilionů bajtů informací denně.\n\nData necestují po internetu jako jeden celek. Místo toho se rozdělí do malých paketů, z nichž každý obsahuje část informace plus adresní údaje. Tyto pakety mohou využívat různé trasy k dosažení svého cíle, přičemž hledají cesty kolem přetížení nebo poruch. V cíli se pak znovu sestaví ve správném pořadí, aby se obnovila původní zpráva.\n\nSměrovače (routers) slouží jako dopravní dispečeři internetu a dělají kritická rozhodnutí každou chvíli. Tato specializovaná zařízení zkoumají cíl každého paketu a určují nejlepší cestu vpřed. Tato směrovací rozhodnutí dělají miliardykrát za sekundu, čímž udržují plynulý tok dat napříč sítěmi vlastněnými tisíci různých organizací.\n\nInternet začal jako ARPANET v roce 1969, což byl americký vojenský výzkumný projekt navržený tak, aby přežil komunikační poruchy během potenciálních útoků. Vint Cerf a Bob Kahn vyvinuli protokoly TCP/IP v 70. letech, čímž vytvořili technický základ, který dodnes leží v základech internetu. Jejich decentralizovaný design zajišťuje, že žádný jednotlivý bod selhání nemůže zničit celou síť.\n\nTim Berners-Lee vynalezl World Wide Web v roce 1989, když pracoval v CERN ve Švýcarsku. Vytvořil systém hypertextových odkazů a webových prohlížečů, který zpřístupnil internet všem. Web se stal veřejně dostupným v srpnu 1991 a během deseti let se internet transformoval z výzkumného nástroje na globální komunikační platformu, kterou používají stovky milionů lidí.",
    "wordCount": 356,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Kdo vynalezl World Wide Web?",
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
        "question": "Kdo vyvinul protokoly TCP/IP? Vyberte všechny správné odpovědi.",
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
        "question": "Data putují po internetu jako jednotlivé kompletní soubory, a ne rozdělená do paketů.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "V kterém roce začala fungovat síť ARPANET, předchůdce internetu?",
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
    "title": "Vzestup umělé inteligence",
    "content": "Umělá inteligence se vyvinula z fantazie sci-fi v praktickou technologii, která ovlivňuje téměř každý aspekt moderního života. Od chytrých asistentů v telefonech po systémy pro lékařskou diagnostiku, AI nyní vykonává úkoly, které kdysi vyžadovaly lidskou inteligenci. Tato transformace představuje jeden z nejvýznamnějších technologických posunů od vynálezu počítačů samotných.\n\nKoncept umělé inteligence se objevil na workshopu konaném na Dartmouth College v New Hampshire během léta 1956. Počítačový vědec John McCarthy tento termín vytvořil a shromáždil výzkumníky, kteří věřili, že stroje lze přimět k simulaci lidské inteligence. Tito průkopníci si představovali, že během jedné generace vytvoří myslící stroje, ačkoli pokrok se ukázal být mnohem pomalejší než jejich optimistické předpovědi.\n\nRaný výzkum AI se zaměřoval na symbolické usuzování, programování počítačů s explicitními pravidly o tom, jak řešit problémy. Výzkumníci vytvořili expertní systémy, které zakódovaly lidské znalosti do rozhodovacích stromů a logických pravidel. Tyto systémy dosáhly působivých výsledků v úzkých oblastech, jako jsou šachy a lékařská diagnostika, ale měly problémy s úkoly vyžadujícími zdravý rozum nebo zacházení s nejednoznačnými informacemi.\n\nRevoluce strojového učení začala transformovat AI v 90. letech a dramaticky se zrychlila po roce 2010. Místo programování explicitních pravidel výzkumníci trénovali algoritmy, aby objevovali vzory ve velkých datových sadách. Neuronové sítě, volně inspirované biologickými mozkovými strukturami, se ukázaly jako obzvláště účinné při rozpoznávání obrázků, porozumění řeči a generování textu podobného lidskému.\n\nHluboké učení se stalo dominantním přístupem k AI po průlomu v roce 2012. Geoffrey Hinton a jeho studenti na University of Toronto demonstrovali, že hluboké neuronové sítě s mnoha vrstvami mohou dramaticky překonat předchozí metody v úkolech rozpoznávání obrazu. Jejich systém snížil chybovost o více než 40 procent ve srovnání s předchozími nejlepšími přístupy.\n\nTrénink moderních systémů AI vyžaduje obrovské výpočetní zdroje a obrovské množství dat. Velké jazykové modely mohou obsahovat stovky miliard parametrů a vyžadovat tisíce specializovaných procesorů pracujících po dobu několika měsíců. Technologické společnosti jako Google, Microsoft a OpenAI investovaly miliardy dolarů do budování infrastruktury nezbytné k trénování těchto stále schopnějších systémů.\n\nSchopnosti systémů AI se v posledních letech pozoruhodně rozšířily. Počítačové systémy vidění nyní dokážou identifikovat objekty, tváře a aktivity na obrázcích s nadlidskou přesností. Zpracování přirozeného jazyka pokročilo do bodu, kdy se AI může zapojit do nuancovaných konverzací, psát koherentní eseje a překládat mezi desítkami jazyků. Systémy AI nyní skládají hudbu, generují umělecká díla a píší počítačový kód.\n\nAI již pohání mnoho služeb, které lidé denně používají bez vědomého povědomí. Doporučovací algoritmy navrhují videa na YouTube a produkty na Amazonu na základě naučených preferencí. E-mailové filtry používají strojové učení k oddělení důležitých zpráv od spamu. Navigační aplikace předpovídají dopravní vzorce a navrhují optimální trasy. Hlasoví asistenti jako Siri a Alexa používají AI k pochopení mluvených příkazů.\n\nZdravotní péče představuje jednu z nejslibnějších aplikací pro umělou inteligenci. Systémy AI dokážou analyzovat lékařské snímky a detekovat rakovinu dříve než lidští radiologové v některých případech. Objevování léků využívá strojové učení k identifikaci slibných sloučenin a předvídání jejich účinků. AI asistenti pomáhají lékařům udržovat si aktuální informace o rychle se rozšiřující lékařské literatuře a navrhují možnosti léčby založené na důkazech.\n\nObavy o bezpečnost AI a společenský dopad rostou spolu s jejími schopnostmi. Výzkumníci se obávají systémů, které sledují cíle neočekávanými nebo škodlivými způsoby. Etici vznášejí otázky ohledně zkreslení v systémech AI trénovaných na historických datech, která odrážejí lidské předsudky. Ekonomové debatují o tom, jak automatizace ovlivní zaměstnanost, protože AI přebírá úkoly dříve vykonávané lidskými pracovníky.\n\nVlády po celém světě začaly vyvíjet předpisy pro umělou inteligenci. Evropská unie schválila v roce 2024 komplexní legislativu AI, která kategorizuje systémy podle úrovně rizika a ukládá požadavky na vysoce rizikové aplikace. Čína zavedla pravidla upravující doporučovací algoritmy a generativní AI. Spojené státy vydaly výkonné příkazy, které se zabývají bezpečností AI, a zároveň diskutují o komplexnější legislativě.\n\nBudoucnost umělé inteligence zůstává nejistá, ale zdá se pravděpodobné, že přinese pokračující rychlý pokrok. Výzkumníci usilují o umělou obecnou inteligenci, která by se mohla vyrovnat lidským schopnostem ve všech kognitivních úkolech, ačkoli odhady, kdy by k tomu mohlo dojít, se pohybují od let po nikdy. Jisté se zdá, že AI bude i nadále přetvářet průmyslová odvětví, vytvářet nové možnosti a vznášet hluboké otázky o vztahu mezi lidskou a strojovou inteligencí.\n\nPorozumění umělé inteligenci se stalo zásadní znalostí pro orientaci v moderním světě. Ať už jako uživatelé, pracovníci, občané nebo tvůrci politik, lidé stále více potřebují pochopit, co AI může a nemůže dělat. Tato technologie se bude i nadále vyvíjet a informovaná angažovanost v jejím vývoji pomůže zajistit, aby AI prospívala lidstvu obecně.",
    "wordCount": 732,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Kde a kdy vznikl termín \"umělá inteligence\"?",
        "options": [
          "MIT v roce 1960",
          "Dartmouth College v roce 1956",
          "Stanford University v roce 1965",
          "Bell Labs v roce 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Které aplikace umělé inteligence ve zdravotnictví jsou zmíněny v článku? Vyberte všechny možnosti.",
        "options": [
          "Analýza lékařských snímků pro detekci rakoviny",
          "Provádění robotické chirurgie",
          "Objevování léků",
          "Navrhování možností léčby"
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
        "question": "Raný výzkum umělé inteligence se zaměřoval primárně na strojové učení spíše než na symbolické usuzování.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "Ve kterém roce Geoffrey Hinton a jeho studenti demonstrovali průlom v hlubokém učení?",
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
        "question": "Kdo vytvořil termín \"umělá inteligence\"?",
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
        "question": "O kolik procent snížily hluboké neuronové sítě míru chyb ve srovnání s předchozími metodami v roce 2012?",
        "options": [
          "Více než 20 procent",
          "Více než 30 procent",
          "Více než 40 procent",
          "Více než 50 procent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "Ve kterém roce Evropská unie schválila komplexní legislativu o umělé inteligenci?",
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
    "title": "Kybernetická bezpečnost: Ochrana digitálního světa",
    "content": "Kybernetická bezpečnost chrání počítače, sítě a data před digitálními útoky, které denně ohrožují miliardy lidí. Hackeři cílí na vše, od osobních bankovních účtů až po kritickou infrastrukturu, jako jsou elektrické sítě a nemocnice. Z oboru se z niche specializace vyvinula jedna z nejdůležitějších disciplín v moderní technologii.\n\nPrvní velký počítačový virus, nazvaný Brain, se objevil v Pákistánu v lednu 1986. Dva bratři, Basit a Amjad Farooq Alvi, jej vytvořili, aby sledovali nelegální kopie svého lékařského softwaru. Virus se pomalu šířil infikovanými disketami a trvalo měsíce, než se dostal do počítačů po celém světě. Dnes se malware šíří internetem během několika sekund a infikuje miliony zařízení dříve, než mohou bezpečnostní experti zareagovat.\n\nPhishingové útoky zůstávají nejběžnější metodou, kterou zločinci používají k odcizení citlivých informací. Tyto podvodné e-maily se tváří, že pocházejí z důvěryhodných zdrojů, jako jsou banky, zaměstnavatelé nebo oblíbené webové stránky. Oklamou příjemce, aby klikli na škodlivé odkazy nebo zadali hesla na falešných webových stránkách. FBI oznámila, že phishingové útoky způsobily v roce 2022 ztráty přesahující 10 miliard dolarů.\n\nRansomware představuje jeden z nejničivějších typů moderních kybernetických útoků. Tento škodlivý software zašifruje soubory oběti a požaduje platbu za dešifrovací klíč. Útok WannaCry v květnu 2017 infikoval více než 200 000 počítačů ve 150 zemích během pouhých čtyř dnů. Nemocnice ve Spojeném království musely zrušit tisíce lékařských prohlídek a přesměrovat sanitky do nepostižených zařízení.\n\nSilná hesla tvoří základ osobní kybernetické bezpečnosti. Bezpečnostní experti doporučují používat alespoň 12 znaků kombinujících velká písmena, malá písmena, číslice a symboly. Každý účet by měl mít jedinečné heslo, aby jedno prolomení neohrozilo více služeb. Správci hesel pomáhají uživatelům generovat a ukládat složitá hesla, aniž by si je museli pamatovat.\n\nDvoufaktorová autentizace přidává zásadní druhou vrstvu zabezpečení nad rámec hesel. Tento systém vyžaduje něco, co znáte, jako je heslo, plus něco, co máte, jako je telefon, který přijímá ověřovací kódy. I když hackeři ukradnou vaše heslo, nemohou se dostat k vašemu účtu bez druhého faktoru. Společnost Google oznámila, že dvoufaktorová autentizace blokuje 99,9 procenta automatizovaných útoků na účty.\n\nŠifrování transformuje data do nečitelného kódu, který mohou dešifrovat pouze autorizované strany. Když vidíte ikonu zámku v adresním řádku prohlížeče, šifrování chrání vaše připojení k dané webové stránce. Koncové šifrování v aplikacích pro zasílání zpráv zajišťuje, že si vaše zprávy můžete přečíst pouze vy a váš příjemce. Dokonce ani společnost poskytující službu nemá přístup k šifrovanému obsahu.\n\nVlády a korporace investují miliardy do kybernetické obrany. Agentura pro kybernetickou bezpečnost a bezpečnost infrastruktury Spojených států, známá jako CISA, chrání federální sítě a pomáhá soukromým společnostem bránit se proti útokům. Velké technologické společnosti zaměstnávají tisíce bezpečnostních výzkumníků, kteří hledají zranitelnosti a vyvíjejí ochranná opatření.\n\nEtičtí hackeři hrají zásadní roli při zlepšování bezpečnosti tím, že nacházejí slabá místa dříve, než to udělají zločinci. Společnosti platí odměny v rozmezí od stovek po miliony dolarů za hlášení závažných zranitelností. Společnost Apple spustila svůj program bug bounty v roce 2016 a nyní nabízí až 2 miliony dolarů za nejkritičtější bezpečnostní chyby iPhonu. Tyto programy proměňují potenciální útočníky v obránce, kteří posilují digitální infrastrukturu.\n\nBudoucnost kybernetické bezpečnosti čelí novým výzvám ze strany vznikajících technologií. Kvantové počítače mohou nakonec prolomit šifrování, které v současnosti chrání bankovnictví, komunikaci a vládní tajemství. Bezpečnostní výzkumníci již vyvíjejí kvantově odolné algoritmy, aby se na tuto hrozbu připravili. Umělá inteligence vytváří jak nové metody útoku, tak nové obranné schopnosti v neustálých technologických závodech ve zbrojení.",
    "wordCount": 553,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Jak se jmenoval první velký počítačový virus?",
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
        "question": "Jaké procento automatizovaných útoků blokuje dvoufaktorové ověřování podle společnosti Google?",
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
        "question": "Které postupy se doporučují pro silné zabezpečení heslem? Vyberte všechny správné možnosti.",
        "options": [
          "Používání alespoň 12 znaků",
          "Používání stejného hesla pro všechny účty",
          "Kombinace velkých a malých písmen, čísel a symbolů",
          "Používání správce hesel"
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
        "question": "Ransomwarový útok WannaCry infikoval počítače ve více než 150 zemích.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Jaké finanční ztráty způsobily phishingové útoky v roce 2022 (v miliardách dolarů)?",
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
    "title": "Internet věcí: Propojený svět",
    "content": "Internet věcí vetkal digitální inteligenci do struktury každodenního života a propojuje miliardy zařízení, která snímají, komunikují a jednají bez lidského zásahu. Od chytrých termostatů, které se učí vaše preference, po průmyslové senzory monitorující zařízení napříč kontinenty, tato technologická revoluce rozšiřuje internet za hranice počítačů a telefonů do fyzického světa. Pochopení tohoto propojeného ekosystému odhaluje jak pozoruhodné možnosti, tak i významné výzvy, které budou utvářet nadcházející desetiletí.\n\nKevin Ashton, britský technologický průkopník pracující ve společnosti Procter and Gamble, vytvořil termín Internet věcí v roce 1999 při vývoji radiofrekvenčních identifikačních systémů pro sledování produktů v dodavatelských řetězcích. Představoval si počítače, které shromažďují informace o fyzickém světě nezávisle na lidech, kteří data zadávají. Tato vize se naplnila až po desetiletích, kdy se senzory staly levnějšími, bezdrátová konektivita se zlepšila a cloud computing poskytl infrastrukturu pro zpracování obrovských datových toků.\n\nPočet připojených zařízení exponenciálně narostl od doby, kdy komerční zavádění IoT začalo kolem roku 2010. Analytici ze společnosti Statista odhadli, že v roce 2020 bylo po celém světě 15,1 miliardy zařízení IoT a předpokládá se, že do roku 2030 dosáhnou 29 miliard. Každé zařízení neustále generuje data, čímž vytváří informační toky, které zastiňují tradiční internetový provoz. Jediná připojená továrna může denně produkovat terabajty dat ze senzorů z tisíců monitorovacích bodů.\n\nChytrá domácí technologie představuje nejviditelnější spotřebitelskou aplikaci principů IoT. Nest Learning Thermostat, představený bývalým inženýrem společnosti Apple Tonym Fadellem v říjnu 2011, byl průkopníkem v zavádění chytré domácnosti do běžného používání. Zařízení sledovalo, kdy jsou obyvatelé doma a jaké jsou jejich teplotní preference, a poté automaticky upravovalo vytápění a chlazení, aby šetřilo energii. Společnost Google získala Nest Labs za 3,2 miliardy dolarů v lednu 2014, čímž signalizovala závazek velkých technologických společností k tomuto trhu.\n\nHlasoví asistenti se stali centrálními uzly pro chytré domácí ekosystémy. Společnost Amazon vydala v listopadu 2014 reproduktor Echo s Alexou, následovaný Google Home v roce 2016 a HomePod od společnosti Apple v roce 2018. Tato zařízení reagují na hlasové příkazy k ovládání světel, zámků, termostatů a zábavních systémů. Do roku 2024 vlastnilo chytré reproduktory přes 200 milionů domácností po celém světě a používaly je pro úkoly od nastavení časovačů po objednávání potravin.\n\nNositelná zařízení sledují zdravotní metriky s rostoucí sofistikovaností a přesností. Hodinky Apple Watch, vydané v dubnu 2015, se vyvinuly z módního doplňku v lékařské zařízení schopné detekovat nepravidelný srdeční rytmus a pády. Studie publikovaná v New England Journal of Medicine v listopadu 2019 zjistila, že hodinky identifikovaly fibrilaci síní, vážný srdeční stav, s 84% přesností. Kontinuální glukózové monitory umožňují diabetikům sledovat hladinu cukru v krvi bez píchání do prstů a přenášet data do chytrých telefonů a upozorňovat uživatele na nebezpečné úrovně.\n\nPrůmyslový IoT, někdy nazývaný Průmysl 4.0, transformuje výrobu s nebývalou viditelností a kontrolou. Senzory zabudované do strojů detekují vibrace, teploty a spotřebu energie, které indikují hrozící poruchy dříve, než k nim dojde. Společnost General Electric byla průkopníkem prediktivní údržby prostřednictvím své platformy Predix a tvrdila, že zákazníkům ušetří miliardy na odvrácených odstávkách. Jeden proudový motor generuje během transatlantického letu 10 terabajtů dat, která jsou neustále analyzována za účelem optimalizace výkonu a plánování údržby.\n\nZemědělství využívá IoT ke zvýšení výnosů a zároveň ke snížení dopadu na životní prostředí. Senzory vlhkosti půdy spouštějí zavlažování pouze tehdy, když rostliny potřebují vodu, čímž snižují spotřebu až o 30 procent ve srovnání s plánovaným zavlažováním. Drony vybavené multispektrálními kamerami identifikují stres plodin, zamoření škůdci a nedostatky živin na rozlehlých polích. Společnost John Deere, 185 let stará společnost zabývající se zemědělským vybavením, nyní shromažďuje data z milionů připojených strojů a prodává analytické služby zemědělcům spolu s traktory.\n\nChytrá města nasazují infrastrukturu IoT k efektivnějšímu řízení městských systémů. Barcelona zavedla jeden z nejkomplexnějších programů chytrého města počínaje rokem 2012 a instalovala senzory po celém městě, aby monitorovaly dostupnost parkovacích míst, úrovně odpadkových košů, kvalitu ovzduší a potřeby zavlažování. Město si nárokuje roční úspory ve výši 75 milionů dolarů a zároveň zlepšuje služby pro obyvatele. Singapur, Kodaň a Soul podnikly podobné iniciativy a používají připojené senzory k optimalizaci dopravního toku, spotřeby energie a reakce na mimořádné události.\n\nAplikace ve zdravotnictví se rozšiřují daleko za hranice nositelných zařízení do vzdáleného monitorování pacientů a klinických prostředí. Pacienti zotavující se z operace nebo zvládající chronické stavy mohou být monitorováni doma pomocí připojených zařízení, která upozorňují pečovatelské týmy na znepokojivé změny. Nemocnice sledují polohu a stav kritického vybavení v reálném čase. Klinické studie používají zařízení IoT ke shromažďování přesnějších dat o zdraví účastníků mezi návštěvami. Pandemie COVID-19 urychlila zavádění technologií vzdáleného monitorování, které dříve čelily pomalému přijetí.\n\nBezpečnostní obavy týkající se zařízení IoT se ukázaly jako znepokojivě opodstatněné. Mnoho výrobců upřednostňuje funkce a nízké ceny před robustní bezpečností a dodává zařízení s výchozími hesly a neopravenými zranitelnostmi. Útok botnetu Mirai v říjnu 2016 unesl stovky tisíc nezabezpečených webových kamer a DVR k zahájení útoků typu distributed denial-of-service, které narušily hlavní webové stránky včetně Twitteru, Netflixu a PayPal. Výzkumníci pravidelně demonstrují alarmující zranitelnosti v dětských monitorech, automobilech, zdravotnických zařízeních a průmyslových systémech.\n\nDůsledky všudypřítomného snímání pro soukromí vyvolávají hluboké otázky o sledování a vlastnictví dat. Hlasoví asistenti nahrávají konverzace v domácnostech. Fitness trackery odhalují intimní detaily o zdraví a denních rutinách. Připojené automobily přenášejí údaje o poloze, které odhalují, kam řidiči jezdí a jak řídí. Společnosti shromažďují tyto informace za účelem zlepšování služeb a cílené reklamy, zatímco vlády se stále více snaží získat přístup pro vymáhání práva a národní bezpečnost.\n\nVýzvy v oblasti interoperability fragmentují prostředí IoT do nekompatibilních ekosystémů. Zařízení od různých výrobců často nemohou komunikovat přímo, což vyžaduje, aby si spotřebitelé vybírali platformy a omezovali funkčnost. Protokol Matter, spuštěný v listopadu 2022 konsorciem včetně společností Apple, Google, Amazon a Samsung, si klade za cíl vytvořit univerzální standard pro chytrá domácí zařízení. Tato iniciativa představuje uznání průmyslu, že fragmentace brání přijetí a inovacím.\n\nEdge computing řeší problémy s latencí a šířkou pásma odesílání všech dat IoT na vzdálené cloudové servery. Zpracování informací lokálně na zařízeních nebo v jejich blízkosti umožňuje reakce v reálném čase pro aplikace, jako jsou autonomní vozidla a průmyslová robotika. Vozidlo s automatickým řízením nemůže čekat, až data putují na cloudový server a zpět, než se rozhodne brzdit. Edge architektury distribuují inteligenci po sítích, spíše než aby ji soustředily v centralizovaných datových centrech.\n\nEnergetická omezení ovlivňují návrh a nasazení zařízení IoT. Bateriové senzory musí fungovat roky bez výměny v místech, která mohou být nepřístupná nebo nebezpečná. Nízkoenergetické sítě s velkým dosahem, jako jsou LoRaWAN a Sigfox, umožňují zařízením komunikovat na vzdálenost kilometrů a přitom spotřebovávat minimum energie. Získávání energie ze solárních, tepelných nebo kinetických zdrojů umožňuje některým zařízením fungovat neomezeně dlouho bez baterií.\n\nEnvironmentální stopa miliard připojených zařízení vyžaduje pozornost s tím, jak se IoT rozšiřuje. Výroba těchto produktů spotřebovává zdroje a energii. Většina zařízení nemá opatření pro recyklaci jejich elektronických součástek. Neustálé síťové připojení vyžaduje energii jak od zařízení, tak od infrastruktury. Aplikace IoT v oblasti hospodaření s energií, zemědělství a dopravy však mohou při promyšleném nasazení snížit celkový dopad na životní prostředí.\n\nBudoucnost IoT směřuje k ambientní inteligenci, která předvídá potřeby a automaticky reaguje na měnící se podmínky. Digitální dvojčata vytvářejí virtuální repliky fyzických systémů pro simulaci a optimalizaci. Umělá inteligence aplikovaná na data ze senzorů umožňuje predikce a automatizace, kterých by explicitní programování nedosáhlo. Hranice mezi fyzickým a digitálním světem se nadále stírá, jak se propojená inteligence šíří prostředím, které obýváme.",
    "wordCount": 1198,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Kdo v roce 1999 vytvořil termín „Internet věcí“?",
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
        "question": "Které společnosti vydaly významná zařízení s hlasovým asistentem? Vyberte všechny správné možnosti.",
        "options": [
          "Amazon s Echo",
          "Google s Google Home",
          "Apple s HomePod",
          "Microsoft s Cortana speaker"
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
        "question": "Útok botnetu Mirai v říjnu 2016 unesl stovky tisíc nezabezpečených webových kamer a DVR.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Kolik zaplatil Google za akvizici Nest Labs v lednu 2014 (v miliardách dolarů)?",
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
        "question": "Kdy byly uvedeny na trh hodinky Apple Watch?",
        "options": [
          "Říjen 2011",
          "Leden 2014",
          "Duben 2015",
          "Listopad 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Které město implementovalo jeden z nejkomplexnějších programů chytrého města od roku 2012?",
        "options": [
          "Singapur",
          "Barcelona",
          "Kodaň",
          "Soul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Kolik zařízení IoT se celosvětově předpokládá do roku 2030 (v miliardách)?",
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
        "question": "Protokol Matter byl spuštěn, aby vytvořil univerzální standard pro chytrá domácí zařízení.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "S jakou přesností identifikovaly hodinky Apple Watch fibrilaci síní podle studie New England Journal of Medicine?",
        "options": [
          "74 procent",
          "84 procent",
          "94 procent",
          "99 procent"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Které aplikace IoT v zemědělství jsou zmíněny? Vyberte všechny správné možnosti.",
        "options": [
          "Senzory vlhkosti půdy pro zavlažování",
          "Drony s multispektrálními kamerami",
          "Připojené traktory s analýzami",
          "Robotická sklizeň"
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
    "title": "Vývoj sociálních médií",
    "content": "Sociální média změnila způsob, jakým lidé komunikují, sdílejí informace a budují komunity, způsobem, který nikdo nepředvídal, když se poprvé objevil internet. Platformy propojující miliardy uživatelů přetvořily politiku, obchod, zábavu a osobní vztahy na všech kontinentech. Příběh sociálních médií odhaluje pozoruhodné inovace i zásadní výzvy pro moderní společnost.\n\nNejstarší sociální sítě se objevily koncem 90. let, kdy se internet stal dostupným pro běžné lidi. SixDegrees byla spuštěna v roce 1997 a umožňovala uživatelům vytvářet profily a propojovat se s přáteli. Stránka přilákala zhruba 3,5 milionu členů, než byla v roce 2001 ukončena. Friendster následoval v roce 2002 a přinesl průkopnické funkce, které se staly standardem v celém odvětví. MySpace dominoval v letech 2005 až 2008 a stal se nejnavštěvovanější webovou stránkou ve Spojených státech a nastartoval kariéry hudebníků, jako jsou Arctic Monkeys.\n\nFacebook vznikl v únoru 2004 z pokoje na koleji Harvardovy univerzity. Mark Zuckerberg a jeho spolubydlící vytvořili stránku zpočátku pouze pro vysokoškolské studenty. Platforma se otevřela všem starším 13 let v září 2006. Do roku 2012 dosáhl Facebook jedné miliardy aktivních uživatelů měsíčně, což byl milník, kterého žádná sociální síť nikdy nedosáhla. Společnost nyní funguje jako Meta a hlásí přes 3 miliardy měsíčních uživatelů napříč svou rodinou aplikací, včetně Instagramu a WhatsAppu.\n\nTwitter představil nový formát pro sociální komunikaci, když byl spuštěn v červenci 2006. Platforma omezila příspěvky na 140 znaků, později rozšířeno na 280, což uživatele nutilo vyjadřovat myšlenky stručně. Twitter se stal nezbytným pro aktuální zprávy, politickou diskuzi a zapojení celebrit. Služba hrála významnou roli během protestů Arabského jara v roce 2011 a od té doby formovala veřejnou konverzaci o nesčetných otázkách.\n\nYouTube způsobil revoluci v sdílení videa poté, co ho v únoru 2005 založili tři bývalí zaměstnanci PayPalu. První video s názvem \"Me at the zoo\" (Já v zoo) ukázalo spoluzakladatele Jaweda Karima v zoo v San Diegu na pouhých 18 sekund. Google koupil YouTube za 1,65 miliardy dolarů v říjnu 2006. Dnes uživatelé nahrávají přes 500 hodin video obsahu každou minutu a platforma zasahuje více lidí ve věku 18 až 49 let než všechny kabelové televizní sítě dohromady.\n\nInstagram přinesl sdílení fotografií na mobilní zařízení, když ho Kevin Systrom a Mike Krieger spustili v říjnu 2010. Aplikace získala 25 000 uživatelů během prvního dne a dosáhla jednoho milionu během dvou měsíců. Facebook získal Instagram za jednu miliardu dolarů v dubnu 2012. Platforma představila Stories v roce 2016 a Reels v roce 2020, přizpůsobujíc funkce popularizované konkurenty jako Snapchat a TikTok.\n\nTikTok se stal nejrychleji rostoucí sociální platformou v historii po svém mezinárodním spuštění v roce 2017. Čínská společnost ByteDance ho vytvořila spojením s Musical.ly, aplikací populární mezi americkými teenagery. Algoritmus TikToku doporučuje videa na základě sledovacího chování spíše než sledování vztahů, což vytváří odlišný zážitek než dřívější platformy. Aplikace dosáhla jedné miliardy měsíčních uživatelů v září 2021, čímž tohoto milníku dosáhla rychleji než kterýkoli předchůdce.\n\nSociální média vytvořila nové ekonomické příležitosti v hodnotě miliard dolarů ročně. Influenceři získávají značné příjmy partnerstvím se značkami a propagací produktů svým sledujícím. Kreativní ekonomika zaměstnávala odhadem 50 milionů lidí po celém světě do roku 2022. Malé podniky používají sociální platformy k oslovení zákazníků bez nákladné tradiční reklamy. Kolem správy sociálních médií pro organizace a jednotlivce se objevila celá odvětví.\n\nDuševní zdraví týkající se sociálních médií vyvolalo intenzivní debatu mezi výzkumníky a tvůrci politik. Studie spojují silné používání sociálních médií se zvýšenou mírou úzkosti, deprese a osamělosti, zejména mezi teenagery. Dr. Jean Twenge z San Diego State University zveřejnila v roce 2017 výzkum ukazující prudký pokles duševního zdraví teenagerů, který se shoduje s přijetím smartphonů. Kritici tvrdí, že korelace nedokazuje kauzalitu, a poukazují na potenciální výhody online propojení.\n\nDezinformace se šíří rychle prostřednictvím sociálních sítí a zpochybňují informační ekosystém. Falešné příběhy cestují rychleji a zasahují více lidí než přesné zprávy, podle výzkumu MIT publikovaného v Science v březnu 2018. Platformy zavedly programy kontroly faktů, varovné štítky a algoritmické změny v boji proti zavádějícímu obsahu. Tyto snahy přinášejí smíšené výsledky a vyvolávají otázky ohledně cenzury a role technologických společností při určování pravdy.\n\nObavy o soukromí provázejí sociální média od jejich prvních dnů. Společnosti shromažďují obrovské množství osobních údajů, aby mohly cílit reklamu s pozoruhodnou přesností. Skandál Cambridge Analytica v roce 2018 odhalil, že politická poradenská firma získala data od 87 milionů uživatelů Facebooku bez souhlasu. Nařízení, jako je Evropské obecné nařízení o ochraně osobních údajů, se snaží dát uživatelům větší kontrolu nad jejich informacemi.\n\nBudoucnost sociálních médií se neustále vyvíjí, protože nové technologie a měnící se preference přetvářejí prostředí. Platformy virtuální reality slibují pohlcující sociální zážitky. Decentralizované sítě postavené na technologii blockchain si kladou za cíl dát uživatelům větší kontrolu. Mladí lidé stále více preferují soukromé zprávy před veřejným zveřejňováním. Ať už budou mít jakoukoli podobu, sociální propojení prostřednictvím digitálních platforem zůstane pro lidskou komunikaci zásadní po celé generace.",
    "wordCount": 788,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Která byla první sociální síť zmíněná v článku?",
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
        "question": "Kolik zaplatil Google za akvizici YouTube v roce 2006?",
        "options": [
          "1 miliarda dolarů",
          "1,65 miliardy dolarů",
          "2 miliardy dolarů",
          "10 miliard dolarů"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Které platformy jsou součástí rodiny aplikací Meta? Vyberte všechny správné možnosti.",
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
        "question": "TikTok dosáhl jedné miliardy aktivních uživatelů měsíčně rychleji než jakákoli jiná sociální síť před ním.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Kolika uživatelům Facebooku byla získána data ve skandálu Cambridge Analytica (v milionech)?",
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
        "question": "Kdy dosáhl Facebook jedné miliardy aktivních uživatelů měsíčně?",
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
    "title": "Digitální soukromí: Revoluce",
    "content": "Digitální soukromí se ukázalo jako jedna z klíčových otázek jednadvacátého století, protože technologické společnosti akumulují nebývalé množství osobních informací, zatímco vlády rozšiřují své sledovací schopnosti na úroveň, která by se ještě před několika desetiletími zdála dystopická. Napětí mezi výhodami služeb založených na datech a riziky všudypřítomného monitoringu formuje politické debaty, obchodní modely a individuální rozhodnutí po celém světě. Pochopení této komplexní situace vyžaduje zkoumání technologií, které umožňují jak sledování, tak ochranu soukromí, právních rámců, které se snaží držet krok s inovacemi, a filozofických otázek o tom, co soukromí znamená v éře všudypřítomné konektivity.\n\nKoncept informačního soukromí získal právní uznání dávno před digitální érou. Američtí právní vědci Samuel Warren a Louis Brandeis publikovali v roce 1890 svůj přelomový článek v Harvard Law Review, v němž argumentovali pro právo na soukromí v reakci na vtíravou žurnalistiku umožněnou přenosnými fotoaparáty. Tento základní text stanovil soukromí jako odlišné od vlastnických práv a tělesné autonomie. Brandeis se později stal soudcem Nejvyššího soudu a napsal vlivné posudky rozšiřující ochranu soukromí před vládními zásahy.\n\nInternet transformoval soukromí z abstraktního právního konceptu do každodenního praktického problému. První uživatelé webu sdíleli osobní informace ledabyle, aniž by si uvědomovali, jak by mohly být shromažďovány a používány. Cookies, malé textové soubory ukládané webovými prohlížeči, umožnily webovým stránkám rozpoznat vracející se návštěvníky již v roce 1994. Inženýr Netscape Lou Montulli vynalezl cookies, aby vyřešil technický problém udržování nákupních košíků, ale rychle se staly sledovacími nástroji, které sledovaly uživatele napříč webovými stránkami.\n\nGoogle způsobil revoluci v digitální reklamě tím, že propojil vyhledávací dotazy se zájmy uživatelů s pozoruhodnou přesností. Zakladatelé společnosti zpočátku vyjádřili nesouhlas s obchodními modely podporovanými reklamou, když ve svém akademickém článku z roku 1998 napsali, že reklama vytváří smíšené pobídky k upřednostňování inzerentů před uživateli. Nicméně, Google AdWords byl spuštěn v říjnu 2000 a Google AdSense následoval v roce 2003, čímž vytvořil infrastrukturu cílené reklamy, která vygenerovala stovky miliard dolarů v příjmech.\n\nFacebook rozšířil sběr dat do sociálních vztahů a osobní komunikace. Platforma byla spuštěna v únoru 2004 se slibem propojit lidi, ale její obchodní model závisel na prodeji detailních uživatelských profilů inzerentům. Uživatelé sdíleli fotografie, údaje o poloze, politické názory a stav vztahů, často bez pochopení, jak budou tyto informace zpeněženy. Do roku 2018 Facebook shromáždil data o odhadovaných 2,2 miliardách uživatelů po celém světě.\n\nSkandál Cambridge Analytica explodoval ve veřejné povědomí v březnu 2018 a odhalil, jak mohou aplikace třetích stran získávat data od milionů uživatelů Facebooku bez jejich vědomí. Britská poradenská firma Cambridge Analytica získala osobní informace od 87 milionů uživatelů prostřednictvím aplikace s osobnostním kvízem, která zneužila oprávnění Facebook API. Společnost použila tato data pro politickou reklamu během prezidentských voleb ve Spojených státech v roce 2016 a referenda o Brexitu. Facebook čelil regulačním vyšetřováním na několika kontinentech a v červenci 2019 zaplatil rekordní pokutu 5 miliard dolarů Federální obchodní komisi (Federal Trade Commission).\n\nOdhalení Edwarda Snowdena v červnu 2013 odhalila rozsah vládního sledování umožněného digitální komunikací. Bývalý kontraktor Národní bezpečnostní agentury (NSA) unikl utajované dokumenty novinářům Glennu Greenwaldovi, Lauře Poitrasové a Ewenu MacAskillovi. Tyto dokumenty odhalily programy shromažďující metadata telefonních hovorů od milionů Američanů, odposlouchávající optické kabely přenášející mezinárodní komunikaci a využívající zranitelnosti v technologických produktech. Tato odhalení vyvolala globální debaty o rovnováze mezi bezpečností a soukromím.\n\nProgram PRISM umožnil NSA shromažďovat data přímo ze serverů hlavních technologických společností, včetně Google, Facebooku, Apple a Microsoftu. Společnosti zpočátku popíraly znalost programu, ačkoli následné zprávy objasnily, že dodržovaly právní příkazy a zároveň někdy bojovaly u soudů proti rozšířenému sledování. Snowden uprchl do Hongkongu a nakonec získal azyl v Rusku, kde zůstal i v roce 2024. Spojené státy ho obvinily ze špionáže a krádeže vládního majetku.\n\nŠifrování poskytuje primární technickou obranu proti vládnímu sledování i kriminálnímu odposlechu. End-to-end šifrování zajišťuje, že pouze odesílatel a příjemce mohou číst zprávy, přičemž i poskytovatel služby nemá přístup k obsahu. WhatsApp implementoval end-to-end šifrování pro svých 1,5 miliardy uživatelů v dubnu 2016 pomocí protokolu Signal vyvinutého kryptografem Moxiem Marlinspikeem. Apple podobně šifruje komunikaci iMessage a veřejně se staví proti vládním požadavkům na zadní vrátka.\n\nOrgány činné v trestním řízení argumentují, že šifrování vytváří zóny, kde zločinci operují beztrestně. FBI žalovala Apple v únoru 2016, aby přinutila společnost pomoci odemknout iPhone používaný jedním z teroristických útočníků ze San Bernardina. Apple odmítl s tím, že vytvoření zadních vrátek by ohrozilo bezpečnost všech uživatelů. FBI nakonec zaplatila externímu dodavateli přibližně jeden milion dolarů za obcházení zabezpečení telefonu. Tento případ ilustroval pokračující konflikt mezi zájmy soukromí a bezpečnosti.\n\nEvropská unie přijala Obecné nařízení o ochraně osobních údajů (General Data Protection Regulation), běžně známé jako GDPR, které vstoupilo v platnost 25. května 2018. Tento komplexní rámec stanovil přísná pravidla pro shromažďování, ukládání a zpracování osobních údajů občanů EU. Organizace musí získat explicitní souhlas před shromažďováním dat, poskytnout přístup k uloženým informacím a na požádání data smazat. Porušení může vést k pokutám až do výše 4 procent globálního ročního obratu nebo 20 milionů eur, podle toho, která částka je vyšší. Amazon obdržel největší pokutu GDPR ve výši 746 milionů eur v červenci 2021.\n\nKalifornie schválila Kalifornský zákon o ochraně osobních údajů spotřebitelů (California Consumer Privacy Act), který vstoupil v platnost 1. ledna 2020 a stanovil podobnou ochranu pro obyvatele státu. Zákon dává spotřebitelům práva vědět, jaké osobní informace podniky shromažďují, smazat tyto informace a odhlásit se z jejich prodeje. Kalifornský zákon o právech na ochranu soukromí (California Privacy Rights Act), schválený voliči v listopadu 2020, tato opatření dále posílil. Další státy, včetně Virginie, Colorada a Connecticutu, přijaly srovnatelné právní předpisy, čímž vytvořily nesourodou síť požadavků na ochranu soukromí po celých Spojených státech.\n\nDatoví brokeři operují převážně mimo veřejné povědomí a sestavují podrobné profily z veřejných záznamů, historie nákupů, aktivit na sociálních sítích a mnoha dalších zdrojů. Společnosti jako Acxiom, Experian a Oracle Data Cloud udržují databáze pokrývající stovky milionů jednotlivců. Tyto profily ovlivňují úvěrová rozhodnutí, prověřování zaměstnanců, pojistné sazby a cílenou reklamu. Brokeři prodávají přístup k těmto informacím podnikům, politickým kampaním a někdy i škodlivým aktérům.\n\nSledování polohy se stalo obzvláště kontroverzní, protože chytré telefony neustále hlásí pozice uživatelů. Mobilní aplikace běžně požadují přístup k poloze pro funkce od předpovědi počasí po doporučení restaurací. Tato data odhalují citlivé informace o lékařských návštěvách, náboženských praktikách, politických aktivitách a osobních vztazích. The Wall Street Journal v prosinci 2018 uvedl, že desítky společností získávají přesná data o poloze z populárních aplikací, čímž vytvářejí komplexní historii pohybu.\n\nTechnologie rozpoznávání obličeje vyvolává odlišné obavy o soukromí tím, že umožňuje identifikaci bez souhlasu nebo vědomí. Orgány činné v trestním řízení používají systémy od společností jako Clearview AI, která oškrábala miliardy fotografií ze sociálních médií, aby vytvořila prohledávatelnou databázi. Několik měst, včetně San Francisca, Bostonu a Portlandu, zakázalo vládní používání rozpoznávání obličeje. Evropská unie diskutovala o omezeních biometrického sledování ve veřejných prostorech. Čína masivně nasadila rozpoznávání obličeje a používá ho pro opatření sociální kontroly, zejména zaměřená na ujgurské menšiny.\n\nPrávo být zapomenut vzniklo z rozhodnutí Evropského soudního dvora z roku 2014, které vyžadovalo, aby Google na žádost odstranil určité výsledky vyhledávání. Mario Costeja Gonzalez, španělský občan, úspěšně argumentoval, že odkazy na novinové články z roku 1998 o jeho finančních potížích již nejsou relevantní. Google zpracoval více než 1,6 milionu žádostí o odstranění, které ovlivnily téměř 6 milionů URL adres od tohoto rozhodnutí. Kritici tvrdí, že se jedná o cenzuru, zatímco zastánci to považují za nezbytné pro osobní důstojnost a rehabilitaci.\n\nTechnologie chránící soukromí nabízejí alternativy k ekonomice sledování. Virtuální privátní sítě šifrují internetový provoz a maskují polohy uživatelů. Prohlížeč Tor směruje komunikaci přes více serverů, aby zabránil sledování. Vyhledávače zaměřené na ochranu soukromí, jako je DuckDuckGo, zpracovávají dotazy bez shromažďování osobních údajů. Signal poskytuje šifrované zasílání zpráv, které shromažďuje minimum metadat. Tyto nástroje vyžadují technickou vyspělost, která omezuje jejich přijetí, ale ukazují, že služby respektující soukromí jsou technicky proveditelné.\n\nOchrana soukromí dětí má zvláštní právní ochranu vzhledem k jejich zranitelnosti a neschopnosti poskytnout smysluplný souhlas. Zákon o ochraně soukromí dětí na internetu (Children's Online Privacy Protection Act), přijatý v roce 1998, omezuje shromažďování osobních informací od dětí mladších 13 let ve Spojených státech. TikTok zaplatil 5,7 milionu dolarů v únoru 2019 za vyrovnání obvinění z nezákonného shromažďování údajů dětí. Kodex vhodného designu pro věk (Age Appropriate Design Code) Spojeného království, který vstoupil v platnost v září 2021, vyžaduje, aby online služby poskytovaly vysoké výchozí nastavení ochrany soukromí pro uživatele mladší 18 let.\n\nBudoucnost digitálního soukromí závisí na technologických inovacích, regulačním vývoji a kulturních postojích ke sdílení dat. Decentralizované systémy identity by mohly dát jednotlivcům kontrolu nad jejich osobními informacemi. Techniky diferenciálního soukromí umožňují užitečnou analýzu dat a zároveň chrání individuální záznamy. Regulační konvergence by mohla stanovit globální standardy namísto roztříštěných národních přístupů. Základní napětí mezi užitečností dat a ochranou soukromí bude přetrvávat, ale rovnováha mezi nimi zůstává předmětem demokratické soutěže a individuálních rozhodnutí.",
    "wordCount": 1437,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Kdy Samuel Warren a Louis Brandeis publikovali svůj přelomový článek o soukromí v Harvard Law Review?",
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
        "question": "Které společnosti byly odhaleny jako součást programu NSA PRISM? Vyberte všechny správné možnosti.",
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
        "question": "Skandál Cambridge Analytica se týkal dat od 87 milionů uživatelů Facebooku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Kolik zaplatil Facebook na pokutě od FTC v červenci 2019 (v miliardách dolarů)?",
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
        "question": "Kdy Edward Snowden zveřejnil utajované dokumenty NSA?",
        "options": [
          "Červen 2011",
          "Červen 2013",
          "Červen 2015",
          "Červen 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Kdy vstoupilo v platnost GDPR?",
        "options": [
          "25. května 2016",
          "25. května 2017",
          "25. května 2018",
          "25. května 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Jak vysoká byla pokuta pro Amazon za GDPR v červenci 2021 (v milionech eur)?",
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
        "question": "WhatsApp implementoval end-to-end šifrování pro své uživatele v dubnu 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Kdy vstoupil v platnost kalifornský zákon o ochraně spotřebitele (California Consumer Privacy Act)?",
        "options": [
          "1. ledna 2018",
          "1. ledna 2019",
          "1. ledna 2020",
          "1. ledna 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Kdy byl přijat zákon o ochraně soukromí dětí na internetu (Children's Online Privacy Protection Act)?",
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
        "question": "Kdo v roce 1994 vynalezl webové cookies?",
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
        "question": "Kdy byl spuštěn Google AdWords?",
        "options": [
          "Říjen 1998",
          "Říjen 2000",
          "Říjen 2002",
          "Říjen 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Kolik zaplatil TikTok v únoru 2019 za urovnání obvinění z nakládání s dětskými daty (v milionech dolarů)?",
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
        "question": "San Francisco zakázalo vládní používání technologie rozpoznávání obličeje.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Kdy Evropský soudní dvůr rozhodl o právu být zapomenut?",
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
        "question": "Kteří novináři obdrželi uniklé dokumenty od Edwarda Snowdena? Vyberte všechny správné možnosti.",
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
    "title": "Revoluční svět technologie Blockchain",
    "content": "Technologie blockchain se vyvinula z obskurního kryptografického konceptu v transformativní sílu, která přetváří odvětví daleko za hranicemi jejího původu v digitální měně. Tento systém distribuované účetní knihy nabízí nebývalou transparentnost, bezpečnost a decentralizaci, což zpochybňuje tradiční přístupy k vedení záznamů a důvěře. Pochopení blockchainu odhaluje, proč jej technologové považují za jednu z nejvýznamnějších inovací od dob samotného internetu.\n\nSatoshi Nakamoto, pseudonymní jednotlivec nebo skupina, představil světu blockchain prostřednictvím whitepaperu Bitcoinu publikovaného 31. října 2008. Načasování se ukázalo jako pozoruhodně prozíravé, protože přišlo jen několik týdnů po kolapsu Lehman Brothers, který spustil globální finanční krizi. Nakamoto navrhl peer-to-peer elektronický hotovostní systém, který by eliminoval potřebu důvěryhodných zprostředkovatelů, jako jsou banky. První bitcoinový blok, zvaný genesis block, byl vytěžen 3. ledna 2009 a obsahoval novinový titulek o záchraně bank jako trvalou připomínku motivací technologie.\n\nBlockchain funguje jako distribuovaná databáze sdílená v síti počítačů zvaných uzly. Každý blok obsahuje seznam transakcí, časové razítko a kryptografický hash, který jej spojuje s předchozím blokem. Tato řetěz hashů prakticky znemožňuje změnu historických záznamů bez kontroly nad většinou sítě. Když se někdo pokusí změnit starou transakci, hash se změní, přeruší řetěz a upozorní ostatní uzly na pokus o manipulaci.\n\nKonsenzuální mechanismy zajišťují, že se všechny uzly shodnou na obsahu blockchainu bez nutnosti centrální autority. Bitcoin používá proof of work, kde počítače soutěží v řešení složitých matematických hádanek. Ten, kdo jako první najde řešení, získá právo přidat další blok a obdrží nově vytvořené bitcoiny jako odměnu. Tento proces, zvaný těžba, spotřeboval v roce 2023 přibližně 127 terawatthodin elektřiny, což se rovná roční spotřebě energie Norska.\n\nEthereum, spuštěné programátorem Vitalikem Buterinem v červenci 2015, rozšířilo blockchain nad rámec jednoduchých transakcí na programovatelné chytré kontrakty. Tyto samočinně se spouštějící dohody automaticky vymáhají své podmínky, když jsou splněny předem definované podmínky. Chytrý kontrakt pro nemovitosti by mohl uvolnit platbu prodávajícímu a převést vlastnictví na kupujícího současně, jakmile obě strany splní své závazky. Žádní právníci, zástupci úschovy nebo banky nemusí transakci ověřovat.\n\nDecentralizované finance, běžně označované jako DeFi, používají chytré kontrakty k opětovnému vytvoření tradičních finančních služeb bez zprostředkovatelů. Úvěrové platformy umožňují uživatelům půjčovat si kryptoměny poskytnutím kolaterálu, přičemž úrokové sazby jsou určovány algoritmy spíše než bankéři. Decentralizované burzy umožňují přímé obchodování mezi uživateli bez toho, aby společnost držela jejich prostředky. Na svém vrcholu v listopadu 2021 držely protokoly DeFi aktiva v hodnotě přes 180 miliard dolarů.\n\nNezaměnitelné tokeny, známé jako NFT, aplikují blockchain na digitální vlastnictví a původ. Každý NFT představuje jedinečné aktivum ověřené na blockchainu, nejčastěji digitální umění nebo sběratelské předměty. Digitální umělec Beeple prodal umělecké dílo NFT v aukční síni Christie's v březnu 2021 za 69,3 milionu dolarů, čímž tuto technologii katapultoval do obecného povědomí. Kritici zpochybňují, zda mají NFT trvalou hodnotu, zatímco zastánci tvrdí, že zásadně mění způsob, jakým tvůrci zpeněžují digitální díla.\n\nŘízení dodavatelského řetězce nabízí přesvědčivé praktické aplikace pro technologii blockchain. Společnosti mohou sledovat produkty od surovin přes výrobu až po maloobchodní pulty s neměnnými záznamy v každém kroku. Walmart spolupracoval s IBM na blockchainovém systému, který sleduje původ potravinářských produktů v sekundách namísto týdne, který byl dříve vyžadován. Tato schopnost se ukazuje jako neocenitelná během stahování potravin z trhu, kdy rychlá identifikace kontaminovaných šarží zachraňuje životy.\n\nVlády zkoumají blockchain pro ověřování identity, volební systémy a veřejné záznamy. Estonsko, průkopník v digitální správě, používá blockchain k zabezpečení zdravotnických záznamů, obchodních registrací a soudních dokumentů pro svých 1,3 milionu občanů. Státní tajemník Západní Virginie provedl pilotní projekt hlasování založený na blockchainu pro vojenský personál umístěný v zámoří během voleb v polovině volebního období v roce 2018. Tyto experimenty testují, zda tato technologie může posílit, spíše než ohrozit demokratické instituce.\n\nObavy o životní prostředí související s blockchainem vyvolaly významný technologický vývoj. Ethereum přešlo ze energeticky náročného proof of work na proof of stake v září 2022, čímž snížilo spotřebu elektřiny odhadem o 99,95 procent. Proof of stake vybírá validátory na základě kryptoměny, kterou slíbí jako kolaterál, spíše než na výpočetním výkonu. Tento posun ukazuje, že blockchain se může vypořádat se svou ekologickou stopou při zachování bezpečnosti.\n\nProblémy se škálovatelností omezují přijetí blockchainu pro každodenní transakce. Bitcoin zpracovává zhruba sedm transakcí za sekundu ve srovnání s kapacitou sítě Visa pro 24 000. Řešení druhé vrstvy budují rychlejší platební kanály nad stávajícími blockchainy. Lightning Network umožňuje téměř okamžité bitcoinové transakce tím, že vypořádává pouze konečné zůstatky na hlavním blockchainu. Tyto inovace si kladou za cíl učinit blockchain praktickým pro každodenní nákupy.\n\nBudoucnost blockchainu sahá do oblastí, které si jeho tvůrci nikdy nepředstavovali. Decentralizované autonomní organizace, neboli DAO, používají hlasování tokenů k řízení komunit a správě pokladen bez tradičních podnikových struktur. Systémy digitální identity by mohly dát jednotlivcům kontrolu nad jejich osobními údaji a zároveň prokazovat pověření zaměstnavatelům, pronajímatelům nebo vládám. Zda blockchain naplní svůj revoluční potenciál, nebo se usadí v okrajové roli, zůstává nejisté, ale jeho dopad na technologie a společnost se již ukázal jako podstatný a trvalý.",
    "wordCount": 798,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Kdy byla publikována bílá kniha Bitcoinu?",
        "options": [
          "3. ledna 2009",
          "31. října 2008",
          "Července 2015",
          "Září 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Které z následujících jsou zmíněny jako aplikace blockchainu mimo kryptoměny? Vyberte všechny správné možnosti.",
        "options": [
          "Řízení dodavatelského řetězce",
          "Digitální identita",
          "Hlasovací systémy",
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
        "question": "Ethereum přešlo v září 2022 na systém proof of stake, čímž se snížila spotřeba elektřiny o 99,95 procent.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Za kolik se prodalo NFT umělecké dílo od Beeple v Christie's v březnu 2021 (v milionech dolarů)?",
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
        "question": "Kdo spustil Ethereum v červenci 2015?",
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
        "question": "Kolik transakcí za sekundu dokáže síť Bitcoin zpracovat?",
        "options": [
          "Přibližně 7",
          "Přibližně 70",
          "Přibližně 700",
          "Přibližně 7 000"
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
    "title": "Revoluce v cloud computingu",
    "content": "Cloud computing zásadně proměnil způsob, jakým firmy i jednotlivci používají technologie, přesouvajíc software a ukládání dat z lokálních zařízení do rozsáhlých sítí vzdálených serverů. Tato architektonická revoluce umožňuje schopnosti, které se ještě před dvěma desetiletími zdály nemožné, od streamování zábavy po služby umělé inteligence dostupné z jakéhokoli zařízení. Cloud se stal natolik nedílnou součástí moderního života, že jej většina lidí používá denně, aniž by si to uvědomovala.\n\nAmazon Web Services uvedl své první cloudové produkty v březnu 2006, čímž průkopnicky zavedl model infrastruktury jako služby (IaaS), který měl přetvořit technologický průmysl. Společnost vybudovala obrovskou výpočetní kapacitu, aby zvládla špičková nákupní období, jako je Černý pátek, a uvědomila si, že může pronajímat nevyužitou kapacitu jiným firmám. Andy Jassy, který vedl AWS od jejího založení, vybudoval z této divize ziskový motor generující roční příjmy přes 80 miliard dolarů. Tento obchodní model se ukázal jako tak úspěšný, že konkurenti spěchali s budováním vlastních cloudových platforem.\n\nMicrosoft Azure vstoupil na trh s cloudem v únoru 2010, přičemž využil hluboké vztahy společnosti s podnikovými zákazníky. Generální ředitel Satya Nadella, který se ujal vedení v roce 2014, přesunul strategii Microsoftu kolem cloudových služeb. Azure se rozrostl a stal se druhým největším poskytovatelem cloudu, který pohání vše od webových stránek malých firem po profesionální síť LinkedIn. Cloudová transformace Microsoftu oživila společnost, kterou mnozí považovali za překonanou.\n\nGoogle Cloud Platform přináší odborné znalosti giganta v oblasti vyhledávání v distribuovaném computingu a strojovém učení podnikovým zákazníkům. Společnost, která indexuje celý internet a zpracovává miliardy vyhledávacích dotazů denně, nabízí tuto infrastrukturu firmám všech velikostí. Investice společnosti Google do podmořských kabelů a datových center rozprostírajících se v desítkách zemí umožňují nízko-latentní přístup téměř odkudkoli na Zemi. Platforma vyniká zejména v oblasti analýzy dat a úloh umělé inteligence.\n\nCloud computing nabízí tři primární modely služeb, které se skládají na sebe jako vrstvy. Infrastruktura jako služba (IaaS) poskytuje virtuální stroje, úložiště a sítě, které si zákazníci sami konfigurují. Platforma jako služba (PaaS) přidává operační systémy, databáze a vývojářské nástroje. Software jako služba (SaaS) poskytuje kompletní aplikace prostřednictvím webových prohlížečů, čímž zcela eliminuje instalaci a údržbu. Většina lidí interaguje s produkty SaaS denně prostřednictvím e-mailu, úpravy dokumentů a obchodních aplikací.\n\nEkonomika cloud computingu vytváří výhody pro organizace téměř všech velikostí. Startupy zahajují činnost bez nákupu drahého hardwaru nebo najímání specializovaného personálu pro údržbu datových center. Platí pouze za spotřebované zdroje, přičemž se navyšují během rušných období a snižují během období pomalejších. Tato flexibilita proměnila ekonomiku zakládání technologických společností. Služba, která by dříve vyžadovala investici milionů do infrastruktury, může být nyní spuštěna s minimálním kapitálem.\n\nPodnikové organizace stále častěji migrují z on-premises datových center na cloudové platformy. General Electric konsolidovala stovky datových center do hybridní cloudové architektury počínaje rokem 2014. Capital One, jedna z největších bank v Americe, oznámila v roce 2020, že uzavřela své poslední datové centrum po kompletní migraci do AWS. Tyto transformace trvají roky a stojí miliardy dolarů, ale v konečném důsledku snižují náklady a zároveň zvyšují schopnosti.\n\nZabezpečení v cloudu se zásadně liší od tradičních přístupů, ale často překračuje to, čeho organizace dosahují samostatně. Hlavní poskytovatelé cloudu zaměstnávají tisíce bezpečnostních specialistů a investují miliardy do ochranných technologií. Drží certifikace pro manipulaci s utajovanými vládními informacemi a citlivými finančními daty. Modely sdílené odpovědnosti znamenají, že poskytovatelé zabezpečují infrastrukturu, zatímco zákazníci zabezpečují své vlastní aplikace a konfigurace dat.\n\nGeografické rozmístění cloudových datových center slouží účelům nad rámec optimalizace výkonu. Předpisy v mnoha zemích vyžadují, aby určitá data zůstala v rámci národních hranic. Poskytovatelé cloudu budují regionální datová centra, aby splnili tyto požadavky na suverenitu. Evropští zákazníci si mohou zajistit, že jejich data zůstanou ve Frankfurtu nebo Amsterdamu. Australské firmy uchovávají informace v rámci své země. Tato distribuovaná architektura také poskytuje možnosti obnovy po havárii, které by si mohlo dovolit jen málo organizací samostatně.\n\nEdge computing rozšiřuje cloudové možnosti blíže k místu, kde data vznikají. Místo odesílání všeho do vzdálených datových center zpracovávají edge systémy informace lokálně pro aplikace vyžadující okamžitou odezvu. Autonomní vozidla nemohou čekat, až data urazí tisíce kilometrů, než se rozhodnou brzdit. Průmyslové senzory analyzující vibrace zařízení potřebují okamžitou detekci anomálií. Edge computing přináší cloudovou inteligenci do scénářů, kde záleží na milisekundách.\n\nServerless computing představuje nejnovější vývoj cloudové architektury. V tomto modelu vývojáři píší kód bez správy jakékoli infrastruktury. Cloudové platformy automaticky alokují zdroje, když se kód spustí, a účtují poplatky pouze za skutečnou dobu provádění. Funkce, která běží 100 milisekund, stojí nepatrný zlomek centu. Aplikace se mohou škálovat z nuly na zpracování milionů požadavků bez jakýchkoli změn konfigurace.\n\nDopad cloud computingu na životní prostředí vyvolává obavy i příležitosti. Datová centra spotřebují přibližně 1,5 procenta globální elektřiny a tento podíl neustále roste. Poskytovatelé cloudu však fungují mnohem efektivněji než typická firemní datová centra. Společnost Google tvrdí, že její zařízení dosahují průměrné efektivity využití energie (PUE) 1,1 ve srovnání s průmyslovým průměrem nad 1,5. Cloudové platformy stále více napájejí operace obnovitelnou energií, přičemž společnost Microsoft se zavázala být do roku 2030 uhlíkově negativní.\n\nUmělá inteligence a strojové učení se staly definujícími prvky cloudových platforem. Předtrénované modely pro rozpoznávání obrázků, zpracování přirozeného jazyka a syntézu řeči jsou k dispozici prostřednictvím jednoduchých programovacích rozhraní. Organizace bez odborných znalostí v oblasti strojového učení mohou do svých aplikací přidat sofistikované možnosti. Poskytovatelé cloudu agresivně soutěží o funkce umělé inteligence, přičemž každý z nich si nárokuje výhody v přesnosti, snadnosti použití a šíři dostupných modelů.\n\nMulti-cloud strategie umožňují organizacím používat současně více poskytovatelů a vyhnout se závislosti na jednom dodavateli. Kubernetes, systém pro orchestraci kontejnerů s otevřeným zdrojovým kódem původně vyvinutý společností Google, umožňuje přesouvat pracovní zátěže mezi cloudy. Společnosti vybírají různé poskytovatele pro různé pracovní zátěže na základě nákladů, výkonu nebo specializovaných schopností. Tato flexibilita vyžaduje dodatečnou složitost, ale snižuje obavy z uzamčení u dodavatele.\n\nBudoucnost cloud computingu směřuje k ještě větší integraci do každodenního života a obchodních operací. Kvantové výpočetní zdroje se již objevují na cloudových platformách, ačkoli praktické aplikace zůstávají omezené. Umělá inteligence bude automatizovat více správy infrastruktury, čímž se sníží odborné znalosti potřebné k nasazení sofistikovaných systémů. Hranice mezi lokálními zařízeními a cloudovými zdroji se dále rozostří s tím, jak se bude zlepšovat konektivita a bude dozrávat edge computing. Ať už se objeví jakékoli specifické technologie, zásadní posun od vlastněné infrastruktury k pronajatým službám bude i nadále přetvářet způsob, jakým lidstvo počítá.",
    "wordCount": 1029,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Kdy společnost Amazon Web Services spustila své první cloudové produkty?",
        "options": [
          "Březen 2006",
          "Únor 2010",
          "Leden 2014",
          "Listopad 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Které tři primární modely cloudových služeb jsou zmíněny? Vyberte všechny správné možnosti.",
        "options": [
          "Infrastruktura jako služba",
          "Platforma jako služba",
          "Software jako služba",
          "Hardware jako služba"
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
        "question": "Společnost Capital One oznámila v roce 2020, že uzavřela své poslední datové centrum po úplném přechodu na AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Jaké procento celosvětové elektřiny spotřebují datová centra?",
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
        "question": "Který generální ředitel změnil strategii společnosti Microsoft kolem cloudových služeb počínaje rokem 2014?",
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
        "question": "Jaký systém s otevřeným zdrojovým kódem umožňuje přesouvat pracovní zátěže mezi různými poskytovateli cloudu?",
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
        "question": "Jaké roční tržby generuje AWS (v miliardách dolarů)?",
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
        "question": "Do kdy se Microsoft zavázal být uhlíkově negativní?",
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
    "title": "Kvantová revoluce v oblasti výpočetní techniky",
    "content": "Kvantové výpočty představují nejvýznamnější transformaci ve výpočetní síle od vynálezu tranzistoru a slibují řešení problémů, jejichž vyřešení by klasickým počítačům trvalo déle než věk vesmíru. Tyto stroje využívají bizarní vlastnosti kvantové mechaniky k provádění výpočtů zcela novými způsoby, které odporují každodenní intuici. Pochopení této revoluční technologie odhaluje jak její mimořádný potenciál, tak i ohromné ​​výzvy, které zbývají, než kvantové počítače dosáhnou svého plného slibu.\n\nKlasické počítače kódují informace jako bity, které existují buď jako nula, nebo jako jednička v daném okamžiku. Každá fotografie, dokument a video na vašich zařízeních se redukuje na dlouhé řetězce těchto binárních číslic, s nimiž se manipuluje pomocí logických operací. Tento přístup poháněl pozoruhodný pokrok od 40. let 20. století, přičemž procesory nyní obsahují miliardy tranzistorů na čipech menších než nehet. Přesto některé problémy zůstávají tvrdohlavě mimo dosah, protože počet potřebných výpočtů exponenciálně roste s velikostí problému.\n\nKvantové počítače používají kvantové bity, nazývané qubity, které mohou existovat v superpozici, reprezentující nulu a jedničku současně, dokud nejsou změřeny. Tato vlastnost umožňuje kvantovým systémům prozkoumat mnoho možných řešení najednou, místo aby je kontrolovaly jedno po druhém. Když se více qubitů zaplete, měření jednoho okamžitě ovlivní ostatní bez ohledu na fyzickou vzdálenost. Tyto kvantové jevy umožňují algoritmy, které dramaticky překonávají klasické přístupy pro specifické typy problémů.\n\nRichard Feynman, nositel Nobelovy ceny za fyziku, navrhl koncept kvantových výpočtů během přednášky na Kalifornském technologickém institutu v květnu 1981. Poznamenal, že simulace kvantově mechanických systémů na klasických počítačích vyžadovala exponenciálně rostoucí zdroje s rostoucí velikostí systému. Feynman navrhl, že pouze kvantový mechanický počítač by mohl efektivně simulovat kvantovou fyziku. Tento poznatek zahájil obor, který se desetiletí vyvíjel pomalu, než nedávné průlomy pokrok urychlily.\n\nDavid Deutsch na Oxfordské univerzitě formalizoval teorii kvantových výpočtů v roce 1985 a popsal, jak by univerzální kvantový počítač mohl využívat superpozice a interference. Peter Shor v Bell Labs proslavil kvantové výpočty v roce 1994, když vyvinul algoritmus, který by dokázal faktorizovat velká čísla exponenciálně rychleji než jakákoli známá klasická metoda. Tento objev ohrozil šifrování RSA, které zabezpečuje internetovou komunikaci, a náhle učinil z kvantových výpočtů otázku národní bezpečnosti.\n\nSestavení skutečných kvantových počítačů se ukázalo jako mimořádně obtížné, protože qubity jsou křehké a snadno narušitelné svým okolím. Jakákoli interakce s vnějším světem způsobuje dekoherenci, zhroucení superpozice a zničení kvantových informací. První experimenty udržovaly koherenci pouze nanosekundy. Výzkumníci vyvinuli propracované izolační techniky, včetně supravodivých obvodů chlazených na teploty chladnější než vnější vesmír, obvykle kolem 15 milikelvinů, sotva nad absolutní nulou.\n\nIBM uvedla v květnu 2016 online první kvantový počítač přístupný prostřednictvím cloudu, nazvaný IBM Quantum Experience, což umožnilo výzkumníkům a nadšencům po celém světě experimentovat se skutečným kvantovým hardwarem. Počáteční systém obsahoval pouhých pět qubitů, sotva dost pro jednoduché demonstrace. Do roku 2023 společnost IBM nasadila systémy přesahující 1 000 qubitů a oznámila plány na 100 000 qubitové systémy do roku 2033. Tyto stroje zdaleka nenahrazují klasické počítače, ale prokazují trvalý pokrok směrem k praktickému využití.\n\nGoogle dosáhl milníku nazvaného kvantová nadvláda v říjnu 2019, kdy jeho 53-qubitový procesor Sycamore provedl výpočet za 200 sekund, což by nejrychlejšímu superpočítači na světě trvalo přibližně 10 000 let. Kritici zpochybnili srovnání, přičemž IBM tvrdila, že jejich superpočítače by mohly dokončit úkol spíše za dny než za tisíciletí. Nicméně, úspěch ukázal, že kvantové počítače by mohly překonat klasické systémy alespoň u některých úkolů.\n\nKorekce chyb představuje pravděpodobně největší překážku užitečným kvantovým výpočtům. Fyzické qubity jsou příliš hlučné a nespolehlivé pro složité výpočty. Kvantová korekce chyb kóduje jeden logický qubit do mnoha fyzických qubitů, aby detekovala a opravila chyby, ale současné přístupy vyžadují tisíce fyzických qubitů na jeden logický qubit. Kvantový počítač řešící praktické problémy by mohl potřebovat miliony fyzických qubitů, což je daleko za současnými možnostmi.\n\nRůzné technologie soutěží o vytvoření nejlepších qubitů pro budoucí kvantové počítače. Supravodivé obvody, používané společnostmi IBM a Google, využívají zavedené výrobní techniky z polovodičového průmyslu. Zachycené ionty, o které usilují společnosti IonQ a Honeywell, drží nabité atomy v elektromagnetických polích s výjimečnou přesností. Fotonické systémy kódují informace v částicích světla, které mohou cestovat na velké vzdálenosti bez dekoherence. Topologické qubity, které jsou stále převážně teoretické, by ukládaly informace do vzorů odolných vůči lokálním poruchám.\n\nKvantové chemické aplikace mohou přinést první praktické výhody kvantových výpočtů. Simulace molekul pro návrh nových léků, materiálů a katalyzátorů vyžaduje kvantově mechanické výpočty, které se exponenciálně zvětšují na klasických počítačích. Kvantový počítač by mohl modelovat chemické reakce na atomární úrovni, což by mohlo urychlit objevování léků, hnojiv a technologií čisté energie. Společnosti včetně Roche, Merck a BASF zahájily výzkumné programy kvantových výpočtů v očekávání těchto schopností.\n\nOptimalizační problémy zahrnující logistiku, finance a strojové učení představují další slibnou oblast použití. Nalezení nejlepší trasy pro doručovací vozidla, optimálních portfolií pro investory nebo ideálních parametrů pro neuronové sítě zahrnuje prohledávání rozsáhlých prostorů řešení. Kvantové žíhání, specializovaná forma kvantových výpočtů komercializovaná společností D-Wave Systems od roku 2011, se zabývá optimalizací přímo. Velké korporace, včetně Volkswagen, JPMorgan Chase a Lockheed Martin, prozkoumaly kvantovou optimalizaci pro skutečné obchodní výzvy.\n\nKryptografie čelí hrozbám i příležitostem z pokroku kvantových výpočtů. Shorův algoritmus by mohl prolomit široce používané šifrování, jakmile budou existovat dostatečně výkonné kvantové počítače. Národní institut pro standardy a technologie vybral v červenci 2022 nové post-kvantové kryptografické standardy po šestileté soutěži o identifikaci algoritmů odolných vůči kvantovým útokům. Mezitím kvantová distribuce klíčů využívá fyziku kvantového měření k vytvoření teoreticky nerozbitného šifrování pro nejcitlivější komunikaci.\n\nČína mohutně investovala do kvantových technologií a založila Univerzitu vědy a technologie Číny jako světového lídra pod vedením fyzika Pan Jianwei. V roce 2017 Čína vypustila Micius, satelit, který demonstroval kvantově zabezpečenou komunikaci mezi pozemními stanicemi vzdálenými 1 200 kilometrů. Čínští výzkumníci si v prosinci 2020 nárokovali kvantovou nadvládu s fotonickým systémem nazvaným Jiuzhang. Spojené státy reagovaly Národním zákonem o kvantové iniciativě z roku 2018, který vyčlenil 1,2 miliardy dolarů na pět let na udržení konkurenceschopnosti.\n\nPrůmysl kvantových výpočtů přilákal obrovské investice navzdory nejistým časovým plánům pro praktické výnosy. Financování rizikového kapitálu pro kvantové startupy přesáhlo v roce 2022 2,5 miliardy dolarů. Velké technologické společnosti, včetně Microsoft, Amazon a Alibaba, uvedly na trh kvantové cloudové služby vedle specializovaných hardwarových společností. Analytici předpovídají, že trh s kvantovými výpočty dosáhne do roku 2030 65 miliard dolarů, ačkoli odhady se vzhledem k technologické nejistotě značně liší.\n\nBudoucnost kvantových výpočtů závisí na trvalém pokroku na více frontách současně. Hardware se musí zlepšit v rozsahu, koherenci a konektivitě. Software musí vyvinout efektivní algoritmy a programovací nástroje dostupné i mimo odborníky na kvantovou fyziku. Aplikace musí prokázat jasné výhody oproti klasickým alternativám pro problémy reálného světa. Cesta od laboratorních demonstrací k praktickému využití může trvat desítky let, ale potenciální odměny ospravedlňují pokračující investice a úsilí.",
    "wordCount": 1083,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Kdo navrhl koncept kvantového počítání v květnu 1981?",
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
        "question": "Které technologie jsou zmíněny jako přístupy k vytváření qubitů? Vyberte všechny možnosti, které se hodí.",
        "options": [
          "Supravodivé obvody",
          "Uvězněné ionty",
          "Fotonické systémy",
          "Grafenové tranzistory"
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
        "question": "Společnost IBM uvedla první kvantový počítač přístupný přes cloud online v květnu 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Kolik sekund trvalo procesoru Sycamore od Googlu, než dokončil svůj výpočet kvantové nadvlády?",
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
        "question": "Kdy Peter Shor vyvinul svůj slavný faktorizační algoritmus?",
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
        "question": "Na jakou teplotu jsou typicky chlazeny supravodivé kvantové počítače?",
        "options": [
          "Přibližně 100 kelvinů",
          "Přibližně 4 kelviny",
          "Přibližně 15 milikelvinů",
          "Přibližně 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Kolik finančních prostředků přidělil zákon National Quantum Initiative Act za pět let (v miliardách dolarů)?",
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
        "question": "Čína vypustila v roce 2017 satelit pro kvantovou komunikaci s názvem Micius.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Kdy NIST vybral nové post-kvantové kryptografické standardy?",
        "options": [
          "Červenec 2020",
          "Červenec 2021",
          "Červenec 2022",
          "Červenec 2023"
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
    "title": "Globální polovodičový průmysl",
    "content": "Polovodiče se staly základem moderní civilizace, pohánějí vše od chytrých telefonů a automobilů po lékařské přístroje a vojenské systémy, na kterých jsou národy závislé z hlediska bezpečnosti. Tyto drobné čipy obsahující miliardy tranzistorů představují nejsložitější objekty, jaké kdy lidstvo vyrobilo, a vznikají prostřednictvím procesů vyžadujících přesnost měřenou v atomech. Globální soutěž o kontrolu nad polovodičovými technologiemi proměnila toto odvětví v ohnisko geopolitického soupeření s dopadem na ekonomickou prosperitu a národní bezpečnost po celém světě.\n\nPolovodičová pouť začala v Bell Labs v New Jersey 23. prosince 1947, když fyzici John Bardeen, Walter Brattain a William Shockley předvedli první tranzistor. Toto zařízení dokázalo zesilovat elektrické signály bez tepla a křehkosti elektronek, za což jeho vynálezci získali Nobelovu cenu za fyziku v roce 1956. Potenciál tranzistoru pro miniaturizaci nakonec umožnil digitální revoluci, která přetvořila lidskou společnost.\n\nJack Kilby v Texas Instruments a Robert Noyce ve Fairchild Semiconductor nezávisle na sobě vynalezli integrovaný obvod v letech 1958 a 1959, přičemž zkombinovali několik tranzistorů na jednom kousku polovodičového materiálu. Tento průlom eliminoval potřebu ručního zapojování jednotlivých komponent a umožnil výrobu ve velkém měřítku. Kilby obdržel Nobelovu cenu za fyziku v roce 2000 za tento příspěvek, který umožnil moderní elektroniku.\n\nGordon Moore, spoluzakladatel společnosti Intel, v roce 1965 pozoroval, že počet tranzistorů na integrovaných obvodech se přibližně každé dva roky zdvojnásobuje, zatímco náklady zůstávají konstantní. Toto pozorování, známé jako Moorův zákon, řídilo průmysl po šest desetiletí exponenciálního zlepšování. Moderní procesory obsahují přes 100 miliard tranzistorů, z nichž každý měří jen několik nanometrů, což je zhruba šířka 20 atomů křemíku.\n\nProces výroby polovodičů zahrnuje stovky kroků trvajících měsíce precizních operací. Inženýři začínají válci ultračistého křemíku vypěstovaného z roztaveného materiálu při teplotách přesahujících 1400 stupňů Celsia. Tyto ingoty se krájejí na tenké pláty a leští se do atomové hladkosti. Fotolitografie promítá vzory obvodů na pláty pomocí ultrafialového světla, přičemž nejpokročilejší stroje používají extrémní ultrafialové vlnové délky pouhých 13,5 nanometrů.\n\nTaiwan Semiconductor Manufacturing Company, známá jako TSMC, se stala nejdůležitějším světovým výrobcem polovodičů. Společnost TSMC, založená Morrisem Changem v roce 1987, jako první zavedla model slévárny pro výrobu čipů navržených jinými společnostmi. V roce 2023 TSMC vyrobila přes 90 procent nejpokročilejších čipů na světě, včetně procesorů pro Apple, AMD a Nvidia. Tato koncentrace schopností na ostrově, který čelí územním nárokům Číny, se stala hlavním geopolitickým problémem.\n\nZařízení potřebné k výrobě pokročilých polovodičů představuje ohromující technologický úspěch. Společnost ASML, nizozemská společnost, má monopol na stroje pro extrémní ultrafialovou litografii, které stojí přibližně 200 milionů dolarů a váží 180 000 kilogramů. Tyto systémy používají plazmu zahřátou na 220 000 stupňů Celsia k generování přesných vlnových délek světla. ASML vyžadovala příspěvky od dodavatele optiky Zeiss, vývojáře světelných zdrojů Cymer a mnoha dalších partnerů, aby dosáhla této schopnosti po desetiletích vývoje.\n\nSamsung Electronics a Intel konkurují TSMC v čele pokročilé výroby, i když obě společnosti v posledních letech zaostaly. Samsung provozuje velké výrobní závody v Jižní Koreji a Texasu a vyrábí čipy pro různé zákazníky vedle vlastních produktů. Intel, historicky technologický lídr, se potýkal s výrobními zpožděními a ztrácel podíl na trhu, než v roce 2021 oznámil agresivní investiční plány pod vedením generálního ředitele Pata Gelsingera.\n\nČína učinila polovodičovou nezávislost národní prioritou a investovala přes 150 miliard dolarů prostřednictvím svého Národního investičního fondu pro průmysl integrovaných obvodů a dalších programů. Semiconductor Manufacturing International Corporation představuje nejpokročilejšího domácího výrobce v Číně, i když za TSMC stále zaostává o několik generací. Americké exportní kontroly zavedené počínaje říjnem 2022 omezují přístup Číny k pokročilému výrobnímu zařízení a návrhům čipů, což zvyšuje tlak na domácí vývoj.\n\nAutomobilový průmysl odhalil svou nebezpečnou závislost na polovodičích během globálního nedostatku čipů, který začal v roce 2020. Vzhledem k tomu, že pandemické uzávěry narušily dodavatelské řetězce, automobilky zrušily objednávky v očekávání slabé poptávky. Když se poptávka zotavila rychleji, než se očekávalo, továrny na polovodiče alokovaly kapacitu jiným zákazníkům. Společnosti General Motors, Ford a Toyota přerušovaně na více než dva roky zastavovaly výrobní linky a čekaly na čipy. Nedostatek stál automobilový průmysl odhadem 210 miliard dolarů ušlých tržeb.\n\nVlády po celém světě zahájily masivní programy na budování domácí kapacity pro výrobu polovodičů. Spojené státy schválily v srpnu 2022 zákon CHIPS and Science Act, který přiděluje 52 miliard dolarů na výrobu a výzkum polovodičů. Evropský zákon o čipech (European Chips Act) vyčlenil 43 miliard eur na podobné cíle. Japonsko oznámilo 2 biliony jenů v dotacích na přilákání továren TSMC, Samsung a Micron. Indie zahájila program v hodnotě 10 miliard dolarů, který usiluje o její první pokročilé výrobní zařízení.\n\nPaměťové čipy představují odlišnou kategorii polovodičů, ve které dominují jiné společnosti než logické procesory. Samsung, SK Hynix z Jižní Koreje a Micron ze Spojených států kontrolují trh s DRAM pro počítačovou paměť. Průmysl flash pamětí, který ukládá data v chytrých telefonech a solid-state discích, zahrnuje stejné korejské hráče plus japonského výrobce Kioxia. Ceny pamětí dramaticky kolísají s cykly nabídky a poptávky, což vytváří vzorce boom-and-bust, které komplikují investiční rozhodnutí.\n\nOdvětví návrhu polovodičů se soustředilo kolem několika předních společností, které disponují obrovskými zdroji. Společnost Nvidia, kterou v roce 1993 založil Jensen Huang, se transformovala z firmy vyrábějící grafické karty na umělou inteligenci s čipy, které pohánějí datová centra po celém světě. Tržní kapitalizace společnosti v červnu 2023 přesáhla jeden bilion dolarů. Společnost Qualcomm dominuje mobilním procesorům s technologií licencovanou téměř každému výrobci chytrých telefonů. AMD se pod vedením generální ředitelky Lisy Su stala seriózním konkurentem společnosti Intel v osobních počítačích a serverech.\n\nDodavatelé polovodičových zařízení tvoří kritickou, ale často přehlíženou vrstvu průmyslového ekosystému. Společnosti Applied Materials, Lam Research a KLA Corporation ze Spojených států poskytují zařízení pro depozici, leptání a kontrolu, která jsou nezbytná pro výrobu. Společnost Tokyo Electron z Japonska přispívá systémy pro nanášení vrstev a čištění. Tyto společnosti investují ročně miliardy do výzkumu a vývoje, aby posouvaly hranice výrobní přesnosti.\n\nEkologická stopa výroby polovodičů vyvolává obavy o udržitelnost, kterým se toto odvětví stále více věnuje. Moderní výrobní závod spotřebuje elektřinu ekvivalentní malému městu, přičemž některé závody na Tchaj-wanu spotřebují tolik energie jako 300 000 domácností. Spotřeba vody dosahuje milionů galonů denně na chlazení a čištění. Toto odvětví se zavázalo k přijetí obnovitelné energie a recyklaci vody, aby snížilo dopad na životní prostředí, přičemž TSMC se zavázala k nulovým čistým emisím do roku 2050.\n\nPokročilé technologie balení rozšiřují výkon polovodičů nad rámec toho, čeho lze dosáhnout pouze miniaturizací tranzistorů. Architektury Chiplet kombinují několik menších čipů do balíčků, které fungují jako jeden procesor. Trojrozměrné stohování umísťuje čipy vertikálně propojené mikroskopickými pilíři. Tyto techniky umožňují pokračující zlepšování, i když se tradiční škálování blíží atomovým limitům. Nejnovější procesory AMD používají návrhy chiplet, které snižují výrobní náklady a zároveň zlepšují výkon.\n\nPracovní síla potřebná pro výrobu polovodičů vytváří výzvy pro rozšíření průmyslu. Kvalifikovaní technici obsluhující výrobní zařízení vyžadují roky školení. Inženýři navrhující procesy příští generace potřebují pokročilé tituly a specializované odborné znalosti. Spojené státy čelí po desetiletích úpadku výroby zvláštnímu nedostatku. Vzdělávací iniciativy a imigrační politiky určí, zda země dokážou obsadit výrobní závody, které se snaží postavit.\n\nBezpečnostní obavy prostupují polovodičovým průmyslem, protože čipy se stávají zbraněmi v technologické konkurenci mezi národy. Obranné systémy závisí na důvěryhodných dodávkách čipů bez skrytých zranitelností. Hospodářská prosperita vyžaduje přístup k nejpokročilejším technologiím pro umělou inteligenci, autonomní vozidla a další vznikající aplikace. Strategický význam polovodičů zajišťuje, že vlády budou i nadále silně investovat a omezovat vývoz, aby chránily vnímané národní zájmy.\n\nPříští desetiletí určí, zda polovodičový průmysl zůstane soustředěn ve východní Asii, nebo se globálně diverzifikuje. Obrovské investice do nových výrobních zařízení budou trvat roky, než se stanou produktivními. Technologické výzvy se násobí, jak se tranzistory blíží základním fyzikálním limitům. Nová výpočetní paradigmata včetně kvantového zpracování a neuromorfních čipů mohou nakonec doplnit nebo nahradit tradiční polovodiče. Ať už se toto odvětví vydá jakýmkoli směrem, tyto drobné čipy zůstanou pro dohledatelnou budoucnost nezbytné pro moderní život.",
    "wordCount": 1272,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Kdy byl v Bell Labs předveden první tranzistor?",
        "options": [
          "23. prosince 1945",
          "23. prosince 1947",
          "23. prosince 1950",
          "23. prosince 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Které společnosti jsou zmíněny jako výrobci paměťových čipů? Vyberte všechny správné možnosti.",
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
        "question": "Společnost TSMC vyrobila do roku 2023 více než 90 procent nejmodernějších čipů na světě.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Kolik stojí (v milionech dolarů) ASML stroj na extrémní ultrafialovou litografii?",
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
        "question": "Kdo založil společnost TSMC v roce 1987?",
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
        "question": "Kolik peněz vyčlenil zákon CHIPS and Science Act na polovodiče v srpnu 2022?",
        "options": [
          "32 miliard dolarů",
          "42 miliard dolarů",
          "52 miliard dolarů",
          "62 miliard dolarů"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Kolik stál automobilový průmysl nedostatek čipů v ušlých tržbách (v miliardách dolarů)?",
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
        "question": "Tržní kapitalizace společnosti Nvidia překročila v červnu 2023 jeden bilion dolarů.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "Na jakou teplotu se ohřívá plazma ve strojích ASML EUV?",
        "options": [
          "22 000 stupňů Celsia",
          "120 000 stupňů Celsia",
          "220 000 stupňů Celsia",
          "1 400 stupňů Celsia"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Kolik miliard tranzistorů obsahují moderní procesory?",
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
        "question": "Kdy Jack Kilby vynalezl integrovaný obvod ve společnosti Texas Instruments?",
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
    "title": "Vývoj streamovacích médií",
    "content": "Streamovací média zásadně proměnila způsob, jakým lidstvo konzumuje zábavu, vzdělávání a informace, a nahradila fyzická média a program vysílání okamžitým přístupem k prakticky neomezenému obsahu z jakéhokoli zařízení připojeného k internetu. Tato technologická revoluce, která začala zrnitými videoklipy v 90. letech 20. století, nyní doručuje filmy v ultra vysokém rozlišení, živé koncerty a interaktivní zážitky miliardám uživatelů po celém světě. Příběh streamování odhaluje, jak se pokroky v kompresi, šířce pásma a obchodních modelech spojily a přetvořily celá odvětví.\n\nTechnické základy streamování vzešly z výzkumu komprese videa a síťových protokolů během 80. a 90. let 20. století. Inženýři ze skupiny Moving Picture Experts Group vyvinuli standardy MPEG, které učinily digitální video praktickým, přičemž MPEG-1 se objevil v roce 1993 a MPEG-4 následoval v roce 1998. Tyto kompresní algoritmy redukovaly velikost video souborů do zvládnutelné podoby eliminací redundantních informací mezi snímky a aproximací detailů, kterých by si lidské oko nevšimlo. Bez takové komprese by streamování videa vyžadovalo šířku pásma daleko přesahující to, co sítě mohly poskytnout.\n\nSpolečnost RealNetworks uvedla na trh RealPlayer v roce 1995, čímž se stala průkopníkem streamování audia a videa přes rané internetové připojení. Formát RealAudio této společnosti umožnil rozhlasovým stanicím poprvé vysílat přes web. RealVideo následoval v roce 1997, ačkoli videa o velikosti poštovní známky a se zadrháváním se jen málo podobala modernímu streamování. Na svém vrcholu kolem roku 2000 byl RealPlayer nainstalován na více než 85 procentech počítačů připojených k internetu.\n\nApple vstoupil do streamovací arény s QuickTime, původně vydaným v roce 1991 pro přehrávání lokálních video souborů. Společnost přidala streamovací funkce v průběhu 90. let 20. století a využila tuto technologii při uvedení iTunes v lednu 2001. Zatímco se iTunes zpočátku zaměřoval spíše na stahování hudby než na streamování, demonstroval spotřebitelskou chuť na okamžitý digitální přístup. Společnost Apple prodala během prvního roku více než 70 milionů skladeb prostřednictvím iTunes.\n\nZaložení YouTube v únoru 2005 bývalými zaměstnanci PayPalu Chadem Hurleym, Stevem Chenem a Jawedem Karimem znamenalo začátek mainstreamové éry streamovaného videa. Platforma usnadnila nahrávání a sdílení videí pro běžné uživatele bez technických znalostí. První video, které ukazovalo Karima v zoologické zahradě v San Diegu, bylo zveřejněno 23. dubna 2005. Společnost Google rozpoznala potenciál YouTube a získala společnost za 1,65 miliardy dolarů v říjnu 2006, pouhých osmnáct měsíců po jejím založení.\n\nNetflix začal jako služba půjčování DVD poštou v roce 1997, kterou založili Reed Hastings a Marc Randolph ve Scotts Valley v Kalifornii. Společnost zavedla neomezené půjčování za měsíční poplatek v roce 1999, čímž zpochybnila model Blockbusteru založený na poplatku za půjčení. Netflix spustil streamování videa v lednu 2007, zpočátku jako doplněk ke své službě DVD. Předplatitelé mohli sledovat omezený výběr filmů a televizních pořadů přímo na svých počítačích, aniž by museli čekat na doručení disků.\n\nPřechod od DVD ke streamování se zrychlil v průběhu 2010, jak se zlepšovala rychlost internetu a rozšiřovaly se knihovny obsahu. Netflix začal produkovat původní programy s únorovým vydáním seriálu House of Cards v roce 2013, který získal uznání kritiky a ukázal, že streamovací platformy mohou konkurovat tradičním sítím v boji o talent a kvalitu. Společnost masivně investovala do původního obsahu a do roku 2022 utratila na programy přes 17 miliard dolarů ročně.\n\nSpotify způsobilo revoluci v streamování hudby poté, co švédští zakladatelé Daniel Ek a Martin Lorentzon spustili službu v říjnu 2008. Platforma nabízela jak bezplatný poslech podporovaný reklamou, tak prémiové předplatné bez reklam. Spotify vyjednalo licenční smlouvy s velkými hudebními vydavatelstvími navzdory počátečnímu odporu odvětví, které se stále vzpamatovávalo z ničivého dopadu pirátství. V prosinci 2023 Spotify ohlásilo 602 milionů měsíčně aktivních uživatelů a přes 236 milionů platících předplatitelů.\n\nAmazon Prime Video vzešlo z akvizice videoslužby společností Amazon v roce 2006, která se stala Amazon Unbox. Společnost začala streamované video spojovat s členstvím Prime v únoru 2011, čímž přidala hodnotu předplatnému, které dříve nabízelo pouze rychlejší doručení. Amazon začal produkovat původní obsah v roce 2013 a od té doby získal ceny Emmy a Oscara za své produkce. Kombinace streamování videa s nákupními výhodami vytváří jedinečné konkurenční výhody.\n\nSpolečnost Disney spustila Disney Plus 12. listopadu 2019 a využila svou rozsáhlou knihovnu obsahu včetně franšíz Marvel, Star Wars, Pixar a National Geographic. Služba přilákala 10 milionů předplatitelů během prvního dne, což demonstrovalo sílu oblíbených franšíz a agresivní cenové politiky. Disney Plus dosáhl přes 160 milionů předplatitelů během čtyř let, ačkoli společnost čelila tlaku na dosažení ziskovosti po počátečních ztrátách z masivních investic do obsahu.\n\nŽivé streamování se rozšířilo nad rámec zábavy a zahrnuje hry, vzdělávání, fitness a nespočet dalších oblastí. Twitch, založený v roce 2011 a získaný společností Amazon za 970 milionů dolarů v roce 2014, zpopularizoval živé streamování videoher. Profesionální hráči vysílají milionům diváků a zároveň získávají příjem prostřednictvím předplatného a darů. Platforma měla v roce 2023 v průměru přes 31 milionů denních návštěvníků, čímž se vyrovnala tradičním sportovním přenosům pro mladé publikum.\n\nTechnické inovace neustále zlepšují kvalitu a efektivitu streamování. Adaptivní streamování s proměnlivou bitovou rychlostí automaticky upravuje kvalitu videa na základě dostupné šířky pásma, čímž zabraňuje ukládání do vyrovnávací paměti a zároveň maximalizuje rozlišení, když to připojení umožňují. Sítě pro doručování obsahu umisťují servery geograficky blízko divákům, čímž snižují latenci a zlepšují spolehlivost. Vylepšení kodeků včetně H.265 a AV1 poskytují vyšší kvalitu při nižších bitových rychlostech, což umožňuje streamování 4K a 8K i na omezených připojeních.\n\nInfrastruktura podporující streamovací služby vyžaduje masivní investice do datových center a síťové kapacity. Doručování obsahu Netflix využívá servery umístěné v sítích poskytovatelů internetových služeb, které lokálně ukládají kopie populárních titulů, aby se snížil dálkový přenos dat. Během špičkových večerních hodin představuje streamované video přes 60 procent internetového provozu v Severní Americe. Tato koncentrace vyvolala debaty o neutralitě sítě a o tom, zda by streamovací služby měly platit za prioritní doručení.\n\nStreamování hudby zásadně změnilo způsob, jakým umělci vydělávají peníze a jak fungují hudební vydavatelství. Spotify platí umělcům přibližně 0,003 až 0,005 dolarů za stream, což vyžaduje miliony přehrání, aby se vytvořily smysluplné příjmy. Tento model upřednostňuje umělce s velkou, angažovanou základnou fanoušků a zároveň ztěžuje začínajícím hudebníkům udržet kariéru. Taylor Swift v letech 2014 až 2017 slavně odstranila svou hudbu ze Spotify a protestovala proti ekonomice streamování, než se nakonec vrátila.\n\nStreamování podcastů explodovalo z okrajového média do hlavní kategorie obsahu, která přitahuje miliardy investic. Spotify získalo podcastové společnosti Gimlet Media a Anchor v únoru 2019 za celkem přibližně 340 milionů dolarů. Společnost Apple, která zpopularizovala podcasty prostřednictvím integrace iTunes od roku 2005, čelí zvýšené konkurenci ze strany Spotify a Amazonu. V roce 2023 existovalo přes 2 miliony podcastů s více než 48 miliony epizod.\n\nStreamovací války zesílily, protože tradiční mediální společnosti spouštějí konkurenční služby. HBO Max, Paramount Plus, Peacock a Apple TV Plus vstoupily na trh mezi lety 2019 a 2020. Tato fragmentace nutí spotřebitele, aby se přihlásili k odběru více služeb, aby získali přístup ke všemu požadovanému obsahu, což ironicky znovu vytváří některé z nepříjemností kabelových televizních balíčků, které streamování původně slibovalo eliminovat. Průmysloví analytici předpovídají konsolidaci, protože menší služby se snaží konkurovat.\n\nMezinárodní expanze představuje pro streamovací platformy příležitosti i výzvy. Netflix působí ve více než 190 zemích a produkuje obsah v desítkách jazyků. Korejský seriál Squid Game se stal nejsledovanějším pořadem Netflixu všech dob v září 2021, což demonstrovalo globální poptávku po neanglickém obsahu. Místní konkurenti včetně Hotstar v Indii, iQiyi v Číně a Globoplay v Brazílii si udržují silné pozice na svých domácích trzích.\n\nRegulační obavy týkající se streamovacích služeb se množí, protože se stávají dominantními zábavními platformami. Otázky týkající se ochrany osobních údajů, moderování obsahu, pracovních postupů a koncentrace trhu přitahují pozornost tvůrců politik. Evropská unie vyžaduje, aby streamovací služby zajistily, že 30 procent jejich katalogů bude tvořeno evropskými díly. Některé země uvalují daně na streamovací předplatné na financování místní produkce obsahu.\n\nBudoucnost streamování směřuje k větší interaktivitě, imerzi a personalizaci. Cloudové herní služby od společností Microsoft, Sony a dalších streamují videohry, aniž by vyžadovaly drahý hardware. Zážity ve virtuální realitě by se mohly nakonec streamovat do lehkých náhlavních souprav. Algoritmy umělé inteligence budou i nadále zdokonalovat doporučení a potenciálně generovat personalizovaný obsah. Ať už se objeví jakékoli konkrétní technologie, streamování trvale změnilo vztah mezi tvůrci a publikem po celém světě.",
    "wordCount": 1333,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Kdy společnost Netflix spustila svou streamovací video službu?",
        "options": [
          "Leden 2005",
          "Leden 2007",
          "Leden 2009",
          "Leden 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Které společnosti založily významné streamovací platformy? Vyberte všechny správné možnosti.",
        "options": [
          "Chad Hurley spoluzaložil YouTube",
          "Reed Hastings spoluzaložil Netflix",
          "Daniel Ek spoluzaložil Spotify",
          "Bill Gates založil Disney Plus"
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
        "question": "Společnost Google koupila YouTube za 1,65 miliardy dolarů v říjnu 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Kolik milionů předplatitelů nahlásila společnost Spotify jako platící předplatitele do prosince 2023?",
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
        "question": "Kdy bylo nahráno první video na YouTube?",
        "options": [
          "14. února 2005",
          "23. dubna 2005",
          "4. července 2005",
          "9. října 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Kolik předplatitelů získala služba Disney Plus během prvního dne?",
        "options": [
          "1 milion",
          "5 milionů",
          "10 milionů",
          "20 milionů"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Kolik zaplatila společnost Amazon za akvizici Twitch v roce 2014 (v milionech dolarů)?",
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
        "question": "Netflix začínal jako služba půjčování DVD poštou v roce 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Který původní seriál Netflixu byl vydán v únoru 2013?",
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
        "question": "Jaké procento internetového provozu v Severní Americe tvoří streamované video během špičky?",
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
        "question": "Který korejský seriál se v září 2021 stal nejsledovanější show Netflixu vůbec?",
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
    "title": "Věda za vyhledávači",
    "content": "Vyhledávače se staly primárními branami, skrze které lidstvo přistupuje k obrovskému úložišti informací na internetu, denně zpracovávají miliardy dotazů a formují způsob, jakým lidé objevují, hodnotí a chápou svět kolem sebe. Sofistikované algoritmy, které pohánějí tyto systémy, představují jeden z nejsložitějších softwarů, jaký kdy byl vyvinut, kombinující techniky z informačního vyhledávání, zpracování přirozeného jazyka, strojového učení a distribuovaného počítání. Pochopení toho, jak vyhledávače fungují, odhaluje jak jejich pozoruhodné schopnosti, tak i jejich hluboký vliv na lidské poznání a chování.\n\nPočátky webového vyhledávání sahají do počátku 90. let, kdy se internet rozrostl příliš na to, aby se mohl ručně kurátorsky spravovat. Archie, vytvořený Alanem Emtagem na McGill University v Montrealu v roce 1990, indexoval názvy souborů na FTP serverech, ale neprohledával webové stránky. World Wide Web Wanderer, vyvinutý Matthew Grayem na MIT v roce 1993, se stal prvním webovým crawlerem, který měřil růst internetu automatickým navštěvováním stránek. Tyto primitivní nástroje položily základ pro sofistikovanější systémy.\n\nAltaVista byla spuštěna v prosinci 1995 a rychle se stala vedoucím vyhledávačem své éry. AltaVista, vyvinutá výzkumníky v Digital Equipment Corporation v Palo Alto v Kalifornii, dokázala prohledávat databázi 20 milionů webových stránek pomocí fulltextového indexování. Uživatelé žasli nad výsledky, které se objevovaly během několika sekund pro dotazy napříč miliony dokumentů. Na svém vrcholu v roce 1997 zpracovala AltaVista 80 milionů vyhledávacích dotazů denně.\n\nLarry Page a Sergey Brin vytvořili Google jako výzkumný projekt na Stanford University v roce 1996, přičemž představili algoritmus PageRank, který měl transformovat vyhledávání. Jejich postřehem bylo, že odkazy mezi webovými stránkami obsahovaly cenné informace o relevanci a autoritě. Stránka, na kterou odkazuje mnoho jiných stránek, zejména důležitých stránek, by se měla umístit výše než ta, která má málo odkazů. Tento přístup přinesl dramaticky lepší výsledky než konkurenti, kteří hodnotili stránky primárně podle frekvence klíčových slov.\n\nPageRank simuluje náhodného webového surfaře, který náhodně kliká na odkazy a občas skočí na zcela náhodnou stránku. Pravděpodobnost, že tento hypotetický surfař navštíví jakoukoli konkrétní stránku, se stane jeho skóre PageRank. Stránky, které obdrží mnoho odkazů ze stránek s vysokým PageRankem, akumulují vyšší skóre. Tento matematický model, podrobně popsaný v článku Page a Brina z roku 1998 publikovaném, když byli doktorandi, zůstává základem pro hodnocení Google navzdory četným následným vylepšením.\n\nProces webového procházení začíná seznamem známých adres URL, které automatizované programy nazývané pavouci nebo crawleři navštěvují. Crawler stáhne obsah každé stránky a extrahuje všechny hypertextové odkazy, které obsahuje. Nové adresy URL jsou přidány do fronty pro budoucí procházení. Google crawler, původně nazvaný BackRub a později Googlebot, neustále navštěvuje miliardy stránek, přičemž upřednostňuje často aktualizované stránky a ty s mnoha příchozími odkazy. Kompletní prohledání webu trvá týdny, ačkoli oblíbené stránky jsou znovu procházeny mnohem častěji.\n\nIndexování transformuje syrový obsah webové stránky do strukturovaných dat, která umožňují rychlé vyhledávání. Vyhledávače vytvářejí invertované indexy, které mapují každé slovo do seznamu dokumentů, které ho obsahují. Když hledáte výraz, engine vyhledá seznam příspěvků tohoto výrazu, místo aby prohledával každý dokument. Další datové struktury ukládají informace o pozicích slov pro párování frází, kotevní text z příchozích odkazů a metadata, jako jsou názvy stránek a data úprav.\n\nZpracování dotazu interpretuje, co uživatelé skutečně chtějí, když zadají vyhledávací výrazy. Porozumění přirozenému jazyku pomáhá vyhledávačům rozpoznat, že vyhledávání běžeckých bot pravděpodobně hledá produkty spíše než informace o obuvi, která běhá. Rozpoznávání entit identifikuje vyhledávání osob, míst, organizací a konceptů. Rozšíření dotazu přidává synonyma a související výrazy pro zlepšení vyvolání. Oprava pravopisu opravuje překlepy před provedením vyhledávání, přičemž Google opravuje přibližně 10 procent všech dotazů.\n\nAlgoritmy hodnocení kombinují stovky signálů k určení, které stránky nejlépe odpovídají každému dotazu. Kromě PageRanku Google zvažuje faktory včetně přítomnosti klíčových slov v názvech a nadpisech, aktuálnosti obsahu, přívětivosti pro mobilní zařízení, rychlosti načítání stránky a geografické relevance. Modely strojového učení trénované na obrovských datasetech uživatelského chování do značné míry nahradily ručně vytvořené vzorce hodnocení. RankBrain, představený v roce 2015, používá neuronové sítě k interpretaci nejednoznačných dotazů a identifikaci relevantních výsledků.\n\nUživatelské chování poskytuje zásadní zpětnou vazbu, kterou vyhledávače používají ke zlepšení hodnocení. Míry prokliku (CTR) indikují, které výsledky uživatelé považují za slibné. Čas strávený na stránkách po kliknutí naznačuje, zda výsledky uspokojily dotaz. Vzor návratu k výsledkům vyhledávání a kliknutí na různé odkazy, nazývaný pogo-sticking, naznačuje, že počáteční výsledky byly neužitečné. Vyhledávače analyzují miliardy takových signálů denně, aby vylepšily své algoritmy.\n\nZnalostní grafy reprezentují informace o entitách a jejich vztazích ve strukturovaných databázích. Znalostní graf Google, představený v květnu 2012, obsahuje miliardy faktů o lidech, místech, věcech a konceptech. Když hledáte slavnou osobu, panel znalostí, který se zobrazí vedle výsledků, čerpá z těchto strukturovaných dat. Wikidata, kolaborativní znalostní báze provozovaná nadací Wikimedia Foundation, významně přispívá k těmto systémům.\n\nDoporučené úryvky a přímé odpovědi se snaží uspokojit dotazy bez nutnosti, aby uživatelé klikali na webové stránky. Google extrahuje relevantní pasáže z webových stránek a zobrazuje je prominentně pro otázky. Hlasoví asistenti se silně spoléhají na tyto přímé odpovědi, protože uživatelé nemohou klikat na odkazy na zařízeních pouze se zvukem. Vydavatelé debatují o tom, zda doporučené úryvky pomáhají zvýšením návštěvnosti, nebo škodí jejím snížením, přičemž někteří se zcela odhlašují od výběru úryvků.\n\nLokální vyhledávání propojuje dotazy s blízkými firmami a službami. Když někdo hledá kavárny nebo instalatéry, vyhledávač zahrne jeho polohu, aby zobrazil relevantní místní možnosti. Profily Google My Business umožňují firmám poskytovat informace přímo. Hodnocení agregovaná z různých zdrojů pomáhají uživatelům vybírat mezi možnostmi. Lokální vyhledávání generuje značné příjmy prostřednictvím reklamy, přičemž firmy platí za to, aby se prominentně zobrazovaly pro komerční dotazy.\n\nVyhledávací reklama transformovala Google v jednu z nejhodnotnějších společností na světě. Inzerenti draží klíčová slova a platí pouze tehdy, když uživatelé kliknou na jejich reklamy. Aukční systém Google zvažuje jak výši nabídky, tak i kvalitu reklamy, aby určil, které reklamy se zobrazí a v jakém pořadí. Vyhledávací reklama generovala více než 162 miliard dolarů v příjmech pro mateřskou společnost Google Alphabet v roce 2022. Tento obchodní model vytváří pobídky k maximalizaci zapojení uživatelů do výsledků vyhledávání.\n\nSpam a manipulace sužují vyhledávače od jejich nejranějších dnů. Bezohlední provozovatelé webových stránek naplňují stránky skrytými klíčovými slovy, vytvářejí sítě umělých odkazů a používají nespočet dalších taktik k ovlivnění hodnocení. Vyhledávače se zapojují do neustálého závodu ve zbrojení proti takové manipulaci. Aktualizace Google Penguin v dubnu 2012 penalizovala weby s nepřirozenými vzory odkazů. Společnost zaměstnává tisíce hodnotitelů kvality, kteří hodnotí výsledky vyhledávání podle podrobných pokynů.\n\nObavy o soukromí obklopují obrovská data, která vyhledávače shromažďují o uživatelských dotazech a chování. Historie vyhledávání odhaluje zdravotní problémy, finanční situace, problémy ve vztazích a nespočet dalších intimních detailů. Google ve výchozím nastavení uchovává data vyhledávání propojená s účty a používá je pro personalizaci a cílení reklamy. Alternativy jako DuckDuckGo se odlišují tím, že slibují, že nebudou sledovat uživatele, i když obětují některé možnosti personalizace.\n\nKonkurence ve vyhledávání zůstává omezená navzdory regulační kontrole po celém světě. Google drží přibližně 91 procent globálního tržního podílu vyhledávání podle údajů StatCounter z roku 2023. Bing, vyhledávač společnosti Microsoft, si nárokuje přibližně 3 procenta globálně, ale lépe si vede ve Spojených státech. Regionální alternativy, včetně Baidu v Číně a Yandex v Rusku, dominují svým domácím trhům. Evropská unie udělila Googlu v červnu 2017 pokutu 2,42 miliardy eur za zvýhodňování své vlastní služby pro srovnání nákupů ve výsledcích vyhledávání.\n\nUmělá inteligence transformuje vyhledávání prostřednictvím velkých jazykových modelů, které rozumějí a generují přirozený jazyk. Vydání ChatGPT v listopadu 2022 vyvolalo obavy, že konverzační AI by mohla narušit tradiční vyhledávání. Microsoft integroval GPT-4 do Bing v únoru 2023. Google reagoval s Bard a následně Gemini. Tyto systémy dokážou syntetizovat informace z více zdrojů a zapojit se do dialogu, což potenciálně mění způsob, jakým lidé nacházejí informace online.\n\nBudoucnost vyhledávání přesahuje textové dotazy k obrázkům, hlasu a multimodálním vstupům. Google Lens umožňuje vyhledávání pomocí kamer smartphonů, identifikaci objektů, překlad textu a řešení matematických problémů z obrázků. Hlasové vyhledávání prostřednictvím chytrých reproduktorů a smartphonů představuje rostoucí podíl dotazů. Vyhledávače se musí přizpůsobit novým zařízením a interakčním vzorům při zachování rychlosti a přesnosti, kterou uživatelé očekávají.",
    "wordCount": 1299,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Kdo vytvořil prvního webového robota s názvem World Wide Web Wanderer v roce 1993?",
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
        "question": "Které faktory berou vyhledávače v úvahu při hodnocení stránek? Vyberte všechny správné možnosti.",
        "options": [
          "Analýza odkazů PageRank",
          "Aktuálnost obsahu",
          "Rychlost načítání stránky",
          "Pouze velikost souboru"
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
        "question": "AltaVista zpracovávala na svém vrcholu v roce 1997 80 milionů vyhledávacích dotazů denně.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Jaký podíl na celosvětovém trhu vyhledávání drží Google podle dat z roku 2023?",
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
        "question": "Kdy byl představen Knowledge Graph od Googlu?",
        "options": [
          "Květen 2010",
          "Květen 2012",
          "Květen 2014",
          "Květen 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "Kdy aktualizace Penguin od Googlu začala penalizovat stránky s nepřirozenými vzory odkazů?",
        "options": [
          "Duben 2010",
          "Duben 2012",
          "Duben 2014",
          "Duben 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Kolik příjmů generovala reklama ve vyhledávání pro Alphabet v roce 2022 (v miliardách dolarů)?",
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
        "question": "Google opravuje přibližně 10 procent všech vyhledávacích dotazů pro překlepy.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Kdy Microsoft integroval GPT-4 do Bingu?",
        "options": [
          "Listopad 2022",
          "Únor 2023",
          "Červen 2023",
          "Říjen 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Jakou pokutu uložila Evropská unie Googlu v červnu 2017 (v miliardách eur)?",
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
        "question": "Kdy byl RankBrain představen společností Google?",
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
        "question": "Kdy byl spuštěn AltaVista?",
        "options": [
          "Prosinec 1993",
          "Prosinec 1995",
          "Prosinec 1997",
          "Prosinec 1999"
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
    "title": "Autonomní vozidla a budoucnost dopravy",
    "content": "Autonomní vozidla slibují revoluci v dopravě díky technologii samořízení, která by mohla snížit počet nehod, transformovat městskou krajinu a zásadně změnit způsob, jakým lidstvo přesouvá lidi a zboží na malé i velké vzdálenosti. Tato ambiciózní vize přilákala stovky miliard dolarů investic od automobilek, technologických gigantů a startupů, kteří se snaží vyřešit obrovské technické, regulační a sociální výzvy, které s tím souvisejí. Cesta ke skutečně autonomním vozidlům odhaluje současný stav této transformační technologie a překážky, které zbývají překonat, než se samořídicí automobily stanou běžnou součástí našeho života.\n\nSen o samořídicích vozidlech předchází i samotnému digitálnímu počítači. Norman Bel Geddes představil expozici Futurama na Světové výstavě v New Yorku v roce 1939, kde zobrazil automatizované dálnice, po kterých by auta bezpečně cestovala bez lidského zásahu do 60. let 20. století. Společnost General Motors, která výstavu sponzorovala, se později spojila s RCA a v roce 1964 vyvinula koncepční vůz Firebird IV s elektronickými naváděcími systémy, které mohly sledovat drát zabudovaný do vozovky. Tyto rané vize vyžadovaly spíše změny v infrastruktuře než inteligenci vozidla.\n\nModerní vývoj autonomních vozidel začal soutěžemi DARPA Grand Challenge, které od roku 2004 katalyzovaly akademický a průmyslový výzkum. První soutěž, která se konala v poušti Mojave, nabídla jeden milion dolarů každému vozidlu, které by dokázalo absolvovat 240 kilometrů dlouhou trasu bez lidského zásahu. Každý účastník selhal, přičemž vozidlo, které ujelo nejdelší vzdálenost, urazilo pouze 12 kilometrů, než uvízlo. V soutěži v roce 2005 dokončilo trasu pět vozidel, přičemž Stanley ze Stanfordské univerzity zvítězil za 6 hodin a 53 minut.\n\nSpolečnost Society of Automotive Engineers definuje šest úrovní automatizace řízení, které se staly průmyslovým standardem. Úroveň 0 znamená žádnou automatizaci, přičemž všechny úkoly řízení ovládá člověk. Úroveň 1 zahrnuje základní asistenci, jako je adaptivní tempomat. Úroveň 2 kombinuje více asistenčních funkcí, ale vyžaduje neustálý lidský dohled. Úroveň 3 umožňuje vozidlu zvládnout veškeré řízení v omezených podmínkách, zatímco lidé zůstávají připraveni zasáhnout. Úroveň 4 dosahuje plné automatizace v definovaných operačních oblastech. Úroveň 5 znamená úplnou automatizaci za všech podmínek, která se vyrovná lidským schopnostem všude, nebo je dokonce překonává.\n\nSenzorové systémy poskytují autonomním vozidlům percepční schopnosti nezbytné pro bezpečnou navigaci. Kamery zachycují vizuální informace o pruzích, značkách, semaforech a dalších účastnících silničního provozu. Radar měří rychlost a vzdálenost blízkých objektů pomocí rádiových vln, které fungují bez ohledu na osvětlení nebo počasí. Lidar používá laserové pulzy k vytváření podrobných trojrozměrných map prostředí, přičemž některé systémy generují více než dva miliony datových bodů za sekundu. Ultrazvukové senzory detekují překážky v bezprostřední blízkosti při parkovacích manévrech.\n\nWaymo, autonomní vozidlová pobočka společnosti Alphabet, vzešla z projektu samořídicích vozů Google, který začal v roce 2009. Sebastian Thrun, který vedl vítězný tým Stanfordské univerzity DARPA, řídil počáteční výzkum. Projekt nashromáždil miliony testovacích kilometrů v několika státech, než Waymo v prosinci 2018 spustilo komerční robotaxikářskou službu ve Phoenixu v Arizoně. Do října 2023 ujela vozidla Waymo přes 11,2 milionu kilometrů na veřejných komunikacích bez bezpečnostních řidičů, a to především ve Phoenixu a San Franciscu.\n\nSpolečnost Tesla se vydala jiným přístupem k autonomii prostřednictvím svých systémů Autopilot a Full Self-Driving. Namísto drahého lidaru se Tesla spoléhá na kamery a počítačové vidění trénované na datech z milionů vozidel zákazníků. Generální ředitel Elon Musk opakovaně předpovídal blížící se plnou autonomii a v roce 2016 prohlásil, že Tesla se sama odřídí z Los Angeles do New Yorku do roku 2017. Tato předpověď a mnoho dalších se nenaplnily, ačkoli vozidla Tesla nabízejí stále schopnější funkce asistence řidiče.\n\nSpolečnost Cruise, vlastněná většinově společností General Motors, provozovala robotaxikářské služby v San Franciscu, dokud jí v říjnu 2023 Kalifornský úřad pro motorová vozidla nezrušil povolení v důsledku incidentu, kdy vozidlo narazilo do chodce a táhlo ho. Společnost agresivně expandovala a provozovala stovky vozidel v několika městech. Zrušení povolení zdůraznilo regulační výzvy, kterým toto odvětví čelí, a obtížnost zajištění bezpečnosti ve velkém měřítku.\n\nČínské společnosti se staly významnými hráči ve vývoji autonomních vozidel. Platforma Apollo společnosti Baidu zahájila vývoj v roce 2017 a nashromáždila přes 100 milionů kilometrů silničního testování. Společnost Pony.ai, založená v roce 2016, provozuje robotaxikářské služby v několika čínských městech a v Kalifornii. Společnost WeRide navázala partnerství s Nissanem a zřídila pobočky na Středním východě. Čínská města, včetně Wu-chanu, Kantonu a Šen-čenu, povolila komerční robotaxikářské operace pokrývající významné městské oblasti.\n\nSystémy umělé inteligence, které řídí autonomní vozidla, se musí vyrovnat s mimořádnou složitostí. Algoritmy počítačového vidění identifikují a klasifikují tisíce typů objektů, od chodců a cyklistů až po stavební zóny a vozidla záchranné služby. Predikční modely předvídají, jak se ostatní účastníci silničního provozu budou chovat v následujících několika sekundách. Plánovací algoritmy volí trajektorie, které bezpečně a efektivně dosáhnou cílů. Všechny tyto výpočty se musí provádět v milisekundách a zároveň zohledňovat nejistotu a vzácné scénáře.\n\nHraniční případy představují zvláštní výzvy pro autonomní systémy. Plastový sáček poletující po dálnici a dítě vbíhající do ulice se mohou senzorům jevit podobně, ale vyžadují zcela odlišné reakce. Stavební dělníci řídící dopravu pomocí ručních gest potlačují běžná pravidla silničního provozu. Vozidla záchranné služby přijíždějící z nejasných úhlů vyžadují okamžitý zásah. Tréninková data nemohou pokrýt každý scénář, takže vozidla musí vhodně zobecňovat na základě podobných zkušeností.\n\nOvěření bezpečnosti klade zásadní otázky ohledně toho, jak prokázat, že autonomní vozidla jsou připravena k nasazení. Lidští řidiči mají v průměru jednu smrtelnou nehodu na 160 milionů kilometrů ujetých ve Spojených státech. Statisticky prokázat, že autonomní systém splňuje nebo překračuje tuto hranici, by vyžadovalo miliardy testovacích kilometrů, což je nepraktický standard. Společnosti místo toho používají simulace, testování na uzavřených okruzích a postupné nasazování a zároveň neustále sledují výkon v reálném světě.\n\nRegulační rámce pro autonomní vozidla se v jednotlivých jurisdikcích dramaticky liší. Kalifornie vyžaduje, aby společnosti hlásily odpojení, když kontrolu převezmou lidští bezpečnostní řidiči. Arizona přijala permisivní přístup, který přilákal testovací aktivity. Německo v roce 2021 přijalo právní předpisy umožňující provoz vozidel úrovně 4 na veřejných komunikacích za specifických podmínek. Čína označila některá města za testovací zóny s postupně se rozšiřujícími operačními doménami. Tato mozaika předpisů komplikuje mezinárodní strategie nasazení.\n\nPotenciální výhody autonomních vozidel přesahují pouhé pohodlí. Nehody vozidel zabijí ročně přibližně 1,35 milionu lidí na celém světě, přičemž lidská chyba přispívá k více než 90 procentům nehod. Autonomní systémy se nerozptylují, neunaví se ani nejsou pod vlivem návykových látek. Mohly by dramaticky snížit tuto daň, pokud jejich bezpečnostní výkon překročí výkon lidských řidičů. Doprava by se stala dostupnou starším, postiženým a mladým lidem, kteří v současné době nejsou schopni řídit sami.\n\nEkonomické dopady autonomní dopravy by mohly přetvořit celá odvětví. Profesionální řidiči, včetně řidičů nákladních vozidel, provozovatelů taxislužeb a doručovatelů, čelí potenciálnímu propouštění. Společnosti poskytující služby spolujízdy, jako jsou Uber a Lyft, masivně investují do autonomie v naději, že eliminují své největší náklady. Pojistné modely se musí přizpůsobit, když lidští řidiči již neřídí vozidla. Urbanisté si představují města s menším počtem parkovišť a užšími silnicemi, protože sdílená autonomní vozidla snižují celkový počet vozidel.\n\nAplikace nákladní dopravy mohou dosáhnout komerční životaschopnosti dříve než osobní robotaxi kvůli předvídatelnějšímu dálničnímu prostředí. Společnost Aurora, spoluzaložená bývalými vedoucími pracovníky z autonomních programů Google, Tesla a Uber, se zaměřuje především na nákladní dopravu. Společnost TuSimple provedla plně autonomní dálniční jízdy mezi Phoenixem a Dallasem, než ji finanční potíže donutily ke strategické restrukturalizaci v roce 2023. Embark, Kodiak a řada dalších společností usilují o podobné aplikace nákladní dopravy na dlouhé vzdálenosti.\n\nČasový rámec pro rozšířené přijetí autonomních vozidel zůstává vysoce nejistý i přes desetiletí vývoje a masivní investice. Optimistické projekce z poloviny roku 2010 předpovídaly všudypřítomné robotaxi do začátku roku 2020. Realita se ukázala být mnohem náročnější, než se očekávalo. Průmysloví experti nyní obecně očekávají postupné nasazování v průběhu desetiletí spíše než náhlou transformaci. Technologie se bude pravděpodobně zlepšovat postupně, rozšiřovat se z omezených operačních domén směrem k širším schopnostem v průběhu mnoha let.",
    "wordCount": 1262,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Kdy se konala první soutěž DARPA Grand Challenge?",
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
        "question": "Jaké typy senzorů používají autonomní vozidla? Vyberte všechny správné možnosti.",
        "options": [
          "Kamery",
          "Radar",
          "Lidar",
          "Rentgenové senzory"
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
        "question": "Vozidlo Stanfordské univerzity s názvem Stanley vyhrálo soutěž DARPA Grand Challenge v roce 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Kolik mil najezdila vozidla Waymo bez bezpečnostních řidičů do října 2023 (v milionech)?",
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
        "question": "Kdy společnost Waymo spustila komerční službu robotaxi ve Phoenixu?",
        "options": [
          "Prosinec 2016",
          "Prosinec 2018",
          "Prosinec 2020",
          "Prosinec 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Kolik úrovní automatizace řízení definuje Společnost automobilových inženýrů?",
        "options": [
          "Čtyři",
          "Pět",
          "Šest",
          "Sedm"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Kolik lidí ročně zemře při dopravních nehodách na celém světě (v milionech)?",
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
        "question": "Lidská chyba přispívá k více než 90 procentům dopravních nehod.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Kdy Německo schválilo legislativu umožňující provoz vozidel úrovně 4 na veřejných komunikacích?",
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
        "question": "Kolik mil ujelo vozidlo, které ujelo nejdelší vzdálenost v soutěži DARPA Grand Challenge 2004?",
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
        "question": "Kdy začal vývoj platformy autonomního řízení Apollo společnosti Baidu?",
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
        "question": "Kdy byla výstava Futurama na Světové výstavě?",
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
        "question": "Kolik datových bodů za sekundu mohou generovat některé lidarové systémy (v milionech)?",
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
        "question": "Kdy Kalifornské DMV odebralo společnosti Cruise povolení k provozu autonomních vozidel?",
        "options": [
          "Říjen 2022",
          "Říjen 2023",
          "Leden 2023",
          "Červen 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
