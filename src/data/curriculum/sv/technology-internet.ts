import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Hur internet fungerar",
    "content": "Internet kopplar samman miljarder enheter över hela världen genom ett intrikat nätverk av nätverk som spänner över alla kontinenter på jorden. Varje gång du besöker en webbplats, skickar ett e-postmeddelande eller strömmar en video, färdas data genom denna enorma digitala infrastruktur på bara millisekunder. Att förstå detta anmärkningsvärda system hjälper oss att uppskatta den teknik som har förändrat modern kommunikation.\n\nNär du skriver in en webbadress i din webbläsare startar en komplex process omedelbart. Din dator kontaktar först en DNS-server (Domain Name System), som översätter den mänskligt läsbara adressen till en numerisk IP-adress som datorer förstår. Detta fungerar ungefär som att slå upp ett telefonnummer i en telefonkatalog, och matcha namn med faktiska kontaktuppgifter.\n\nDin förfrågan färdas sedan genom din internetleverantör (ISP) till stamnätverk som utgör internets huvudinfrastruktur. Dessa fiberoptiska kablar med hög kapacitet spänner över kontinenter och korsar hav på djup överstigande 6000 meter. De överför enorma mängder data med nästan ljusets hastighet och hanterar över 500 biljoner byte information dagligen.\n\nData färdas inte som en enda enhet över internet. Istället delas det upp i små paket, som var och en innehåller en del av informationen plus adresseringsdetaljer. Dessa paket kan ta olika vägar för att nå sin destination och hitta stigar runt överbelastning eller fel. På destinationen sätts de ihop igen i rätt ordning för att återskapa det ursprungliga meddelandet.\n\nRouters fungerar som trafikledare på internet och fattar kritiska beslut varje ögonblick. Dessa specialiserade enheter undersöker varje pakets destination och bestämmer den bästa vägen framåt. De fattar dessa routingbeslut miljarder gånger per sekund och håller data flödande smidigt över nätverk som ägs av tusentals olika organisationer.\n\nInternet började som ARPANET 1969, ett amerikanskt militärt forskningsprojekt utformat för att överleva kommunikationsstörningar under potentiella attacker. Vint Cerf och Bob Kahn utvecklade TCP/IP-protokollen på 1970-talet, och skapade den tekniska grund som fortfarande ligger till grund för internet idag. Deras decentraliserade design säkerställer att ingen enskild felpunkt kan slå ut hela nätverket.\n\nTim Berners-Lee uppfann World Wide Web 1989 medan han arbetade på CERN i Schweiz. Han skapade systemet med hyperlänkar och webbläsare som gjorde internet tillgängligt för alla. Webben blev offentligt tillgänglig i augusti 1991, och inom ett decennium hade internet förvandlats från ett forskningsverktyg till en global kommunikationsplattform som användes av hundratals miljoner människor.",
    "wordCount": 374,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Vem uppfann World Wide Web?",
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
        "question": "Vem utvecklade TCP/IP-protokollen? Välj alla som stämmer.",
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
        "question": "Data färdas över internet som enskilda kompletta filer snarare än att delas upp i paket.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "Vilket år startade ARPANET, föregångaren till internet?",
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
    "title": "Artificiell intelligens framväxt",
    "content": "Artificiell intelligens har utvecklats från science fiction-fantasi till praktisk teknik som påverkar nästan alla aspekter av det moderna livet. Från smarttelefonassistenter till medicinska diagnossystem utför AI nu uppgifter som en gång krävde mänsklig intelligens. Denna omvandling representerar en av de mest betydande tekniska förändringarna sedan själva datorns uppfinning.\n\nKonceptet artificiell intelligens uppstod vid en workshop som hölls på Dartmouth College i New Hampshire under sommaren 1956. Datalog John McCarthy myntade termen och samlade forskare som trodde att maskiner kunde skapas för att simulera mänsklig intelligens. Dessa pionjärer föreställde sig att skapa tänkande maskiner inom en enda generation, även om framstegen visade sig vara mycket långsammare än deras optimistiska förutsägelser.\n\nTidig AI-forskning fokuserade på symbolisk resonemang, programmering av datorer med explicita regler om hur man löser problem. Forskare skapade expertsystem som kodade mänsklig kunskap till beslutsträd och logiska regler. Dessa system uppnådde imponerande resultat inom snäva områden som schack och medicinsk diagnos, men kämpade med uppgifter som krävde sunt förnuft eller hantering av tvetydig information.\n\nMaskininlärningsrevolutionen började omvandla AI under 1990-talet och accelererade dramatiskt efter 2010. Istället för att programmera explicita regler tränade forskare algoritmer för att upptäcka mönster i stora datamängder. Neurala nätverk, löst inspirerade av biologiska hjärnstrukturer, visade sig vara särskilt kraftfulla för att känna igen bilder, förstå tal och generera mänskligliknande text.\n\nDjupinlärning framträdde som den dominerande metoden för AI efter ett genombrott 2012. Geoffrey Hinton och hans studenter vid University of Toronto visade att djupa neurala nätverk med många lager dramatiskt kunde överträffa tidigare metoder för bildigenkänningsuppgifter. Deras system minskade felfrekvensen med mer än 40 procent jämfört med de tidigare bästa metoderna.\n\nAtt träna moderna AI-system kräver enorma datorkraftresurser och stora mängder data. Stora språkmodeller kan innehålla hundratals miljarder parametrar och kräva tusentals specialiserade processorer som arbetar i månader. Teknikföretag som Google, Microsoft och OpenAI har investerat miljarder dollar i att bygga den infrastruktur som krävs för att träna dessa alltmer kapabla system.\n\nAI-systemens kapacitet har utökats anmärkningsvärt de senaste åren. Datorsynsystem kan nu identifiera objekt, ansikten och aktiviteter i bilder med övermänsklig noggrannhet. Naturlig språkbehandling har avancerat till den punkt där AI kan engagera sig i nyanserade konversationer, skriva sammanhängande uppsatser och översätta mellan dussintals språk. AI-system komponerar nu musik, genererar konstverk och skriver datorkod.\n\nAI driver redan många tjänster som människor använder dagligen utan medvetenhet. Rekommendationsalgoritmer föreslår videor på YouTube och produkter på Amazon baserat på inlärda preferenser. E-postfilter använder maskininlärning för att separera viktiga meddelanden från spam. Navigationsappar förutsäger trafikmönster och föreslår optimala rutter. Röstassistenter som Siri och Alexa använder AI för att förstå talade kommandon.\n\nHälso- och sjukvård representerar en av de mest lovande tillämpningarna för artificiell intelligens. AI-system kan analysera medicinska bilder för att upptäcka cancer tidigare än mänskliga radiologer i vissa fall. Läkemedelsupptäckt använder maskininlärning för att identifiera lovande föreningar och förutsäga deras effekter. AI-assistenter hjälper läkare att hålla sig uppdaterade med snabbt växande medicinsk litteratur och föreslår evidensbaserade behandlingsalternativ.\n\nOro för AI-säkerhet och samhällspåverkan har vuxit tillsammans med dess kapacitet. Forskare oroar sig för system som eftersträvar mål på oväntade eller skadliga sätt. Etiker väcker frågor om partiskhet i AI-system som tränats på historiska data som återspeglar mänskliga fördomar. Ekonomer debatterar hur automatisering kommer att påverka sysselsättningen när AI tar över uppgifter som tidigare utförts av mänskliga arbetare.\n\nRegeringar världen över har börjat utveckla regler för artificiell intelligens. Europeiska unionen antog omfattande AI-lagstiftning 2024 som kategoriserar system efter risknivå och ställer krav på högriskapplikationer. Kina har implementerat regler som styr rekommendationsalgoritmer och generativ AI. USA har utfärdat exekutiva order som adresserar AI-säkerhet samtidigt som man debatterar mer omfattande lagstiftning.\n\nFramtiden för artificiell intelligens är fortfarande osäker, men verkar sannolikt att ge fortsatta snabba framsteg. Forskare eftersträvar artificiell generell intelligens som kan matcha mänsklig förmåga över alla kognitiva uppgifter, även om uppskattningarna om när detta kan inträffa varierar från år till aldrig. Vad som verkar säkert är att AI kommer att fortsätta att omforma industrier, skapa nya möjligheter och väcka djupa frågor om förhållandet mellan mänsklig och maskinell intelligens.\n\nAtt förstå artificiell intelligens har blivit viktig kunskap för att navigera i den moderna världen. Oavsett om det är som användare, arbetare, medborgare eller beslutsfattare behöver människor i allt högre grad förstå vad AI kan och inte kan göra. Denna teknik kommer att fortsätta att utvecklas, och informerat engagemang i dess utveckling kommer att bidra till att säkerställa att AI gynnar mänskligheten i stort.",
    "wordCount": 722,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Var och när myntades termen \"artificiell intelligens\"?",
        "options": [
          "MIT år 1960",
          "Dartmouth College år 1956",
          "Stanford University år 1965",
          "Bell Labs år 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Vilka AI-applikationer inom sjukvården nämns i artikeln? Välj alla som stämmer.",
        "options": [
          "Analysera medicinska bilder för att upptäcka cancer",
          "Utföra robotkirurgi",
          "Läkemedelsutveckling",
          "Föreslå behandlingsalternativ"
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
        "question": "Tidig AI-forskning fokuserade främst på maskininlärning snarare än symbolisk resonemang.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "Vilket år demonstrerade Geoffrey Hinton och hans studenter ett genombrott inom djupinlärning?",
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
        "question": "Vem myntade termen \"artificiell intelligens\"?",
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
        "question": "Med hur mycket minskade djupa neurala nätverk felprocenten jämfört med tidigare metoder år 2012?",
        "options": [
          "Mer än 20 procent",
          "Mer än 30 procent",
          "Mer än 40 procent",
          "Mer än 50 procent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "Vilket år antog Europeiska Unionen omfattande AI-lagstiftning?",
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
    "title": "Cybersäkerhet: Skydda den digitala världen",
    "content": "Cybersäkerhet skyddar datorer, nätverk och data från digitala attacker som hotar miljarder människor dagligen. Hackare riktar in sig på allt från personliga bankkonton till kritisk infrastruktur som elnät och sjukhus. Området har vuxit från en nischspecialitet till en av de viktigaste disciplinerna inom modern teknik.\n\nDet första stora dataviruset, kallat Brain, dök upp i Pakistan i januari 1986. Två bröder vid namn Basit och Amjad Farooq Alvi skapade det för att spåra illegala kopior av deras medicinska programvara. Viruset spreds långsamt via infekterade disketter och det tog månader innan det nådde datorer världen över. Idag sprids skadlig programvara över internet på några sekunder och infekterar miljontals enheter innan säkerhetsexperter hinner reagera.\n\nNätfiskeattacker är fortfarande den vanligaste metoden som brottslingar använder för att stjäla känslig information. Dessa bedrägliga e-postmeddelanden utger sig för att komma från betrodda källor som banker, arbetsgivare eller populära webbplatser. De lurar mottagare att klicka på skadliga länkar eller ange lösenord på falska webbplatser. FBI rapporterade att nätfiskeattacker orsakade förluster på över 10 miljarder dollar under enbart 2022.\n\nUtpressningsprogram (ransomware) utgör en av de mest destruktiva typerna av moderna cyberattacker. Denna skadliga programvara krypterar en offers filer och kräver betalning för dekrypteringsnyckeln. WannaCry-attacken i maj 2017 infekterade mer än 200 000 datorer i 150 länder på bara fyra dagar. Sjukhus i Storbritannien var tvungna att ställa in tusentals läkarbesök och omdirigera ambulanser till opåverkade anläggningar.\n\nStarka lösenord utgör grunden för personlig cybersäkerhet. Säkerhetsexperter rekommenderar att du använder minst 12 tecken som kombinerar versaler, gemener, siffror och symboler. Varje konto bör ha ett unikt lösenord för att förhindra att ett enda intrång komprometterar flera tjänster. Lösenordshanterare hjälper användare att generera och lagra komplexa lösenord utan att behöva memorera dem.\n\nTvåfaktorautentisering lägger till ett avgörande andra säkerhetslager utöver lösenord. Detta system kräver något du vet, som ett lösenord, plus något du har, som en telefon som tar emot verifieringskoder. Även om hackare stjäl ditt lösenord kan de inte komma åt ditt konto utan den andra faktorn. Google rapporterade att tvåfaktorautentisering blockerar 99,9 procent av automatiska attacker mot konton.\n\nKryptering förvränger data till oläslig kod som endast behöriga parter kan dekryptera. När du ser en hänglåsikon i din webbläsares adressfält skyddar kryptering din anslutning till den webbplatsen. End-to-end-kryptering i meddelandeappar säkerställer att bara du och din mottagare kan läsa dina meddelanden. Inte ens företaget som tillhandahåller tjänsten kan komma åt det krypterade innehållet.\n\nRegeringar och företag investerar miljarder i cybersäkerhetsförsvar. United States Cybersecurity and Infrastructure Security Agency, känt som CISA, skyddar federala nätverk och hjälper privata företag att försvara sig mot attacker. Stora teknikföretag anställer tusentals säkerhetsforskare som letar efter sårbarheter och utvecklar skyddsåtgärder.\n\nEtiska hackare spelar en viktig roll för att förbättra säkerheten genom att hitta svagheter innan brottslingar gör det. Företag betalar hittelöner som sträcker sig från hundratals till miljontals dollar för rapporter om allvarliga sårbarheter. Apple lanserade sitt bug bounty-program 2016 och erbjuder nu upp till 2 miljoner dollar för de mest kritiska säkerhetsbristerna i iPhone. Dessa program förvandlar potentiella angripare till försvarare som stärker digital infrastruktur.\n\nFramtidens cybersäkerhet står inför nya utmaningar från framväxande teknologier. Kvantdatorer kan så småningom bryta krypteringen som för närvarande skyddar bank-, kommunikations- och statssekretess. Säkerhetsforskare utvecklar redan kvantresistenta algoritmer för att förbereda sig för detta hot. Artificiell intelligens skapar både nya attackmetoder och nya defensiva förmågor i en pågående teknologisk kapprustning.",
    "wordCount": 549,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Vad var namnet på det första stora dataviruset?",
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
        "question": "Enligt Google, vilken procentandel av automatiserade attacker blockerar tvåfaktorautentisering?",
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
        "question": "Vilka är rekommenderade metoder för stark lösenordssäkerhet? Välj alla som stämmer.",
        "options": [
          "Använda minst 12 tecken",
          "Använda samma lösenord för alla konton",
          "Kombinera versaler, gemener, siffror och symboler",
          "Använda en lösenordshanterare"
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
        "question": "WannaCry-utpressningstrojanen infekterade datorer i över 150 länder.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Hur mycket pengar orsakade nätfiskeattacker i förluster under 2022 (i miljarder dollar)?",
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
    "title": "Sakernas internet: En uppkopplad värld",
    "content": "Sakernas internet (Internet of Things, IoT) har vävt in digital intelligens i vardagens struktur och kopplat samman miljarder enheter som känner av, kommunicerar och agerar utan mänsklig inblandning. Från smarta termostater som lär sig dina preferenser till industriella sensorer som övervakar utrustning över kontinenter, utvidgar denna teknologiska revolution internet bortom datorer och telefoner in i den fysiska världen. Att förstå detta sammankopplade ekosystem avslöjar både anmärkningsvärda möjligheter och betydande utmaningar som kommer att forma de kommande decennierna.\n\nKevin Ashton, en brittisk teknologipionjär som arbetade på Procter and Gamble, myntade termen \"Internet of Things\" 1999 när han utvecklade radiofrekvensidentifieringssystem för att spåra produkter genom leveranskedjor. Han föreställde sig att datorer skulle samla information om den fysiska världen oberoende snarare än att förlita sig på att människor skulle mata in data. Denna vision tog decennier att realisera eftersom sensorer blev billigare, trådlös anslutning förbättrades och molnbaserad databehandling tillhandahöll infrastrukturen för att bearbeta enorma dataströmmar.\n\nAntalet uppkopplade enheter har vuxit exponentiellt sedan kommersiell IoT-användning började runt 2010. Analytiker på Statista uppskattade 15,1 miljarder IoT-enheter världen över år 2020, och projicerade att nå 29 miljarder år 2030. Varje enhet genererar data kontinuerligt, vilket skapar informationsflöden som överskuggar traditionell internettrafik. En enda uppkopplad fabrik kan producera terabyte av sensordata dagligen från tusentals övervakningspunkter.\n\nSmart hem-teknik representerar den mest synliga konsumenttillämpningen av IoT-principer. Nest Learning Thermostat, introducerad av den tidigare Apple-ingenjören Tony Fadell i oktober 2011, banade väg för en bredare användning av smarta hem. Enheten observerade när de boende var hemma och deras temperaturpreferenser, och justerade sedan automatiskt uppvärmning och kylning för att spara energi. Google förvärvade Nest Labs för 3,2 miljarder dollar i januari 2014, vilket signalerade stora teknikföretags engagemang för denna marknad.\n\nRöstassistenter har blivit centrala nav för smarta hem-ekosystem. Amazon släppte Echo-högtalaren med Alexa i november 2014, följt av Google Home 2016 och Apples HomePod 2018. Dessa enheter svarar på röstkommandon för att styra lampor, lås, termostater och underhållningssystem. År 2024 ägde över 200 miljoner hushåll världen över smarta högtalare och använde dem för uppgifter som att ställa in timers och beställa matvaror.\n\nBärbara enheter spårar hälsomått med ökande sofistikering och noggrannhet. Apple Watch, som släpptes i april 2015, utvecklades från en modeaccessoar till en medicinsk enhet som kan upptäcka oregelbundna hjärtrytmer och fall. En studie publicerad i New England Journal of Medicine i november 2019 fann att klockan identifierade förmaksflimmer, ett allvarligt hjärttillstånd, med 84 procents noggrannhet. Kontinuerliga glukosmätare tillåter diabetiker att spåra blodsocker utan fingerstick, och överför data till smartphones och varnar användare för farliga nivåer.\n\nIndustriell IoT, ibland kallat Industri 4.0, transformerar tillverkningen med oöverträffad synlighet och kontroll. Sensorer inbäddade i maskiner upptäcker vibrationer, temperaturer och energiförbrukning som indikerar förestående fel innan haverier inträffar. General Electric banade väg för prediktivt underhåll genom sin Predix-plattform och hävdade att de sparade kunder miljarder i undvikna driftstopp. En enda jetmotor genererar 10 terabyte data under en transatlantisk flygning, som analyseras kontinuerligt för att optimera prestanda och schemalägga underhåll.\n\nJordbruket omfamnar IoT för att öka avkastningen samtidigt som miljöpåverkan minskas. Jordfuktighetssensorer utlöser bevattning endast när växter behöver vatten, vilket minskar förbrukningen med upp till 30 procent jämfört med schemalagd bevattning. Drönare utrustade med multispektrala kameror identifierar växtstress, skadedjursangrepp och näringsbrist över stora fält. John Deere, det 185 år gamla jordbruksutrustningsföretaget, samlar nu in data från miljontals uppkopplade maskiner och säljer analystjänster till jordbrukare tillsammans med traktorer.\n\nSmarta städer använder IoT-infrastruktur för att hantera urbana system mer effektivt. Barcelona implementerade ett av de mest omfattande smarta stadsprogrammen med start 2012 och installerade sensorer i hela staden för att övervaka parkeringstillgänglighet, avfallsnivåer i soptunnor, luftkvalitet och bevattningsbehov. Staden hävdar årliga besparingar på 75 miljoner dollar samtidigt som tjänsterna för invånarna förbättras. Singapore, Köpenhamn och Seoul har genomfört liknande initiativ och använt uppkopplade sensorer för att optimera trafikflöde, energiförbrukning och krisberedskap.\n\nHälso- och sjukvårdstillämpningar sträcker sig långt bortom bärbara enheter in i fjärrövervakning av patienter och kliniska miljöer. Patienter som återhämtar sig efter operation eller hanterar kroniska tillstånd kan övervakas hemma med uppkopplade enheter som varnar vårdteam om oroande förändringar. Sjukhus spårar platsen och statusen för kritisk utrustning i realtid. Kliniska prövningar använder IoT-enheter för att samla in mer exakta data om deltagarnas hälsa mellan besöken. Covid-19-pandemin accelererade användningen av fjärrövervakningsteknik som tidigare mött långsam acceptans.\n\nSäkerhetsproblem kring IoT-enheter har visat sig vara störande giltiga. Många tillverkare prioriterar funktioner och låga priser framför robust säkerhet och levererar enheter med standardlösenord och icke-patchade sårbarheter. Mirai-botnätattacken i oktober 2016 kapade hundratusentals osäkrade webbkameror och DVR:er för att lansera distribuerade överbelastningsattacker som störde stora webbplatser inklusive Twitter, Netflix och PayPal. Forskare demonstrerar regelbundet alarmerande sårbarheter i babyvakter, bilar, medicinska enheter och industriella system.\n\nIntegritetsimplikationerna av genomgripande avkänning väcker djupa frågor om övervakning och dataägande. Röstassistenter spelar in konversationer i hemmen. Fitness trackers avslöjar intima detaljer om hälsa och dagliga rutiner. Uppkopplade bilar överför platsdata som avslöjar vart förare åker och hur de kör. Företag samlar in denna information för serviceförbättring och riktad reklam, medan regeringar i allt högre grad söker tillgång för brottsbekämpning och nationella säkerhetsändamål.\n\nInteroperabilitetsutmaningar fragmenterar IoT-landskapet i inkompatibla ekosystem. Enheter från olika tillverkare kan ofta inte kommunicera direkt, vilket kräver att konsumenter väljer plattformar och begränsar funktionaliteten. Matter-protokollet, som lanserades i november 2022 av ett konsortium inklusive Apple, Google, Amazon och Samsung, syftar till att skapa en universell standard för smarta hem-enheter. Detta initiativ representerar branschens erkännande att fragmentering hindrar antagande och innovation.\n\nEdge computing adresserar latens- och bandbreddsbegränsningarna för att skicka all IoT-data till avlägsna molnservrar. Att bearbeta information lokalt på eller nära enheter möjliggör realtidsrespons för applikationer som autonoma fordon och industriell robotik. En självkörande bil kan inte vänta på att data ska färdas till en molnserver och tillbaka innan den bestämmer sig för att bromsa. Edge-arkitekturer distribuerar intelligens i hela nätverk snarare än att koncentrera den i centraliserade datacenter.\n\nEnergibegränsningar formar IoT-enheters design och distribution. Batteridrivna sensorer måste fungera i åratal utan utbyte på platser som kan vara otillgängliga eller farliga. Lågeffekts wide-area nätverkstekniker som LoRaWAN och Sigfox gör det möjligt för enheter att kommunicera över kilometer samtidigt som de förbrukar minimal energi. Energiutvinning från sol-, termisk- eller kinetisk energi gör det möjligt för vissa enheter att fungera på obestämd tid utan batterier.\n\nDet miljömässiga fotavtrycket från miljarder uppkopplade enheter kräver uppmärksamhet när IoT expanderar. Tillverkning av dessa produkter förbrukar resurser och energi. De flesta enheter saknar bestämmelser för återvinning av sina elektroniska komponenter. Kontinuerlig nätverksanslutning kräver energi från både enheter och infrastruktur. IoT-applikationer inom energihantering, jordbruk och transport kan dock minska den totala miljöpåverkan när de används på ett genomtänkt sätt.\n\nFramtiden för IoT pekar mot ambient intelligens som förutser behov och svarar automatiskt på förändrade förhållanden. Digitala tvillingar skapar virtuella repliker av fysiska system för simulering och optimering. Artificiell intelligens tillämpad på sensordata möjliggör förutsägelser och automatiseringar utöver vad explicit programmering kan uppnå. Gränsen mellan fysiska och digitala världar fortsätter att suddas ut när uppkopplad intelligens sprider sig i hela miljön vi bebor.",
    "wordCount": 1142,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Vem myntade begreppet \"Internet of Things\" år 1999?",
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
        "question": "Vilka företag släppte större röstassistentenheter? Välj alla som stämmer.",
        "options": [
          "Amazon med Echo",
          "Google med Google Home",
          "Apple med HomePod",
          "Microsoft med Cortana-högtalare"
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
        "question": "Mirai botnet-attacken i oktober 2016 kapade hundratusentals osäkrade webbkameror och DVR:er.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Hur mycket betalade Google för att förvärva Nest Labs i januari 2014 (i miljarder dollar)?",
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
        "question": "När släpptes Apple Watch?",
        "options": [
          "Oktober 2011",
          "Januari 2014",
          "April 2015",
          "November 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Vilken stad implementerade ett av de mest omfattande smart city-programmen med start 2012?",
        "options": [
          "Singapore",
          "Barcelona",
          "Köpenhamn",
          "Seoul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Hur många IoT-enheter beräknas finnas globalt år 2030 (i miljarder)?",
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
        "question": "Matter-protokollet lanserades för att skapa en universell standard för smarta hem-enheter.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Med vilken noggrannhet identifierade Apple Watch förmaksflimmer enligt New England Journal of Medicine-studien?",
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
        "question": "Vilka IoT-applikationer inom jordbruk nämns? Välj alla som stämmer.",
        "options": [
          "Jordfuktighetssensorer för bevattning",
          "Drönare med multispektrala kameror",
          "Uppkopplade traktorer med analysfunktioner",
          "Robotiserad skörd"
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
    "title": "Sociala mediers utveckling",
    "content": "Sociala medier har förändrat hur människor kommunicerar, delar information och bygger gemenskaper på sätt som ingen förutsåg när internet först uppstod. Plattformar som kopplar samman miljarder av användare har omformat politik, handel, underhållning och personliga relationer på alla kontinenter. Historien om sociala medier avslöjar både anmärkningsvärd innovation och djupgående utmaningar för det moderna samhället.\n\nDe tidigaste sociala nätverkssajterna dök upp i slutet av 1990-talet när internet blev tillgängligt för vanliga människor. SixDegrees lanserades 1997 och tillät användare att skapa profiler och få kontakt med vänner. Webbplatsen lockade ungefär 3,5 miljoner medlemmar innan den stängdes ned 2001. Friendster följde 2002 och banade väg för funktioner som skulle bli standard i hela branschen. MySpace dominerade från 2005 till 2008 och blev den mest besökta webbplatsen i USA och lanserade karriärerna för musiker som Arctic Monkeys.\n\nFacebook kom ut från ett studentrum på Harvard University i februari 2004. Mark Zuckerberg och hans rumskamrater skapade sajten ursprungligen endast för universitetsstudenter. Plattformen öppnade för alla från 13 år och uppåt i september 2006. År 2012 nådde Facebook en miljard aktiva användare per månad, en milstolpe som inget socialt nätverk någonsin hade uppnått. Företaget verkar nu som Meta och rapporterar över 3 miljarder månatliga användare över sin familj av appar inklusive Instagram och WhatsApp.\n\nTwitter introducerade ett nytt format för social kommunikation när det lanserades i juli 2006. Plattformen begränsade inlägg till 140 tecken, senare utökat till 280, vilket tvingade användarna att uttrycka tankar koncist. Twitter blev väsentligt för nyheter, politisk diskurs och kändisengagemang. Tjänsten spelade anmärkningsvärda roller under den arabiska våren 2011 och har format offentliga samtal om otaliga frågor sedan dess.\n\nYouTube revolutionerade videodelning efter att tre tidigare PayPal-anställda grundade det i februari 2005. Den första videon, med titeln \"Me at the zoo\", visade medgrundaren Jawed Karim på San Diego Zoo i bara 18 sekunder. Google köpte YouTube för 1,65 miljarder dollar i oktober 2006. Idag laddar användare upp över 500 timmar videoinnehåll varje minut, och plattformen når fler 18- till 49-åringar än alla kabel-TV-nätverk tillsammans.\n\nInstagram förde fotodelning till mobila enheter när Kevin Systrom och Mike Krieger lanserade det i oktober 2010. Appen fick 25 000 användare sin första dag och nådde en miljon inom två månader. Facebook förvärvade Instagram för en miljard dollar i april 2012. Plattformen introducerade Stories 2016 och Reels 2020, och anpassade funktioner som populariserats av konkurrenter som Snapchat och TikTok.\n\nTikTok blev den snabbast växande sociala plattformen i historien efter sin internationella lansering 2017. Det kinesiska företaget ByteDance skapade det genom att slå samman med Musical.ly, en app populär bland amerikanska tonåringar. TikToks algoritm rekommenderar videor baserat på tittarbeteende snarare än efterföljande relationer, vilket skapar en annan upplevelse än tidigare plattformar. Appen nådde en miljard månatliga användare i september 2021 och uppnådde denna milstolpe snabbare än någon föregångare.\n\nSociala medier har skapat nya ekonomiska möjligheter värda miljarder dollar årligen. Influencers tjänar betydande inkomster genom att samarbeta med varumärken och marknadsföra produkter till sina följare. Skaparekonomin sysselsatte uppskattningsvis 50 miljoner människor över hela världen år 2022. Små företag använder sociala plattformar för att nå kunder utan dyr traditionell reklam. Hela branscher har vuxit fram kring hantering av sociala medier för organisationer och individer.\n\nPsykisk ohälsa relaterad till sociala medier har väckt intensiv debatt bland forskare och politiker. Studier kopplar tung användning av sociala medier till ökade nivåer av ångest, depression och ensamhet, särskilt bland tonåringar. Dr. Jean Twenge från San Diego State University publicerade forskning 2017 som visade kraftiga nedgångar i tonåringars psykiska hälsa som sammanföll med smartphone-användning. Kritiker hävdar att korrelation inte bevisar orsakssamband och pekar på potentiella fördelar med online-anslutning.\n\nFelaktig information sprids snabbt genom sociala nätverk och utmanar informationssystemet. Falska historier reser snabbare och når fler människor än korrekta rapporter, enligt forskning från MIT som publicerades i Science i mars 2018. Plattformar har implementerat faktagranskningsprogram, varningsetiketter och algoritmiska förändringar för att bekämpa vilseledande innehåll. Dessa ansträngningar ger blandade resultat och väcker frågor om censur och teknikföretagens roll i att fastställa sanningen.\n\nIntegritetsproblem har följt sociala medier från dess tidigaste dagar. Företag samlar in stora mängder personuppgifter för att rikta reklam med anmärkningsvärd precision. Cambridge Analytica-skandalen 2018 avslöjade att ett politiskt konsultföretag hade samlat in data från 87 miljoner Facebook-användare utan samtycke. Förordningar som den europeiska allmänna dataskyddsförordningen (GDPR) försöker ge användarna mer kontroll över sin information.\n\nFramtiden för sociala medier fortsätter att utvecklas snabbt när ny teknik och förändrade preferenser omformar landskapet. Virtual reality-plattformar lovar mer uppslukande sociala upplevelser. Decentraliserade nätverk byggda på blockkedjeteknik syftar till att ge användarna mer kontroll. Unga människor föredrar i allt högre grad privata meddelanden framför offentliga inlägg. Oavsett vilka former det tar kommer social kontakt via digitala plattformar att förbli central för mänsklig kommunikation i generationer framöver.",
    "wordCount": 777,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Vilken var den första sociala nätverkssajten som nämndes i artikeln?",
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
        "question": "Hur mycket betalade Google för att förvärva YouTube år 2006?",
        "options": [
          "1 miljard dollar",
          "1,65 miljarder dollar",
          "2 miljarder dollar",
          "10 miljarder dollar"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Vilka plattformar är en del av Metas familj av appar? Välj alla som stämmer.",
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
        "question": "TikTok nådde en miljard månatliga användare snabbare än någon annan social medieplattform före den.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Hur många Facebook-användare fick sin data skördad i Cambridge Analytica-skandalen (i miljoner)?",
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
        "question": "När nådde Facebook en miljard månatliga aktiva användare?",
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
    "title": "Den digitala integritetsrevolutionen",
    "content": "Digital integritet har framträtt som en av de viktigaste frågorna under det tjugoförsta århundradet, eftersom teknikföretag samlar på sig enorma mängder personlig information samtidigt som regeringar utökar sina övervakningsmöjligheter till nivåer som skulle ha verkat dystopiska för bara några decennier sedan. Spänningen mellan fördelarna med datadrivna tjänster och riskerna med genomgripande övervakning formar policydebatter, affärsmodeller och individuella val över hela världen. För att förstå detta komplexa landskap krävs en granskning av de tekniker som möjliggör både övervakning och integritetsskydd, de rättsliga ramverk som kämpar för att hålla jämna steg med innovationen och de filosofiska frågorna om vad integritet innebär i en tid av allestädes närvarande uppkoppling.\n\nBegreppet informationsintegritet fick juridiskt erkännande långt före den digitala eran. De amerikanska juridikforskarna Samuel Warren och Louis Brandeis publicerade sin banbrytande artikel i Harvard Law Review från 1890 och argumenterade för rätten att bli lämnad ifred som svar på påträngande journalistik möjliggjord av bärbara kameror. Denna grundläggande text fastställde integritet som åtskild från äganderätt och kroppslig autonomi. Brandeis blev senare domare i Högsta domstolen och skrev inflytelserika yttranden som utvidgade integritetsskyddet mot statliga intrång.\n\nInternet förvandlade integritet från ett abstrakt juridiskt begrepp till en daglig praktisk angelägenhet. Tidiga webbanvändare delade personlig information nonchalant, omedvetna om hur den kunde samlas in och användas. Cookies, små textfiler som lagras av webbläsare, gjorde det möjligt för webbplatser att känna igen återkommande besökare från och med 1994. Netscape-ingenjören Lou Montulli uppfann cookies för att lösa det tekniska problemet med att underhålla kundvagnar, men de blev snabbt övervakningsverktyg som spårade användare över webbplatser.\n\nGoogle revolutionerade digital reklam genom att koppla sökfrågor till användarintressen med anmärkningsvärd precision. Företagets grundare uttryckte inledningsvis obehag över reklamfinansierade affärsmodeller och skrev i sin akademiska artikel från 1998 att reklam skapar blandade incitament för att prioritera annonsörer framför användare. Trots detta lanserades Google AdWords i oktober 2000 och Google AdSense följde 2003, vilket skapade den riktade reklamstruktur som skulle generera hundratals miljarder dollar i intäkter.\n\nFacebook utvidgade datainsamlingen till sociala relationer och personlig kommunikation. Plattformen lanserades i februari 2004 med ett löfte om att koppla samman människor, men dess affärsmodell var beroende av att sälja detaljerade användarprofiler till annonsörer. Användare delade foton, platsdata, politiska åsikter och relationsstatus, ofta utan att förstå hur denna information skulle generera intäkter. År 2018 samlade Facebook in data om uppskattningsvis 2,2 miljarder användare över hela världen.\n\nCambridge Analytica-skandalen exploderade i det allmänna medvetandet i mars 2018 och avslöjade hur tredjepartsapplikationer kunde skörda data från miljontals Facebook-användare utan deras vetskap. Det brittiska konsultföretaget Cambridge Analytica erhöll personlig information från 87 miljoner användare genom en personlighetstest-app som utnyttjade Facebooks API-behörigheter. Företaget använde dessa data för politisk reklam under det amerikanska presidentvalet 2016 och Brexit-folkomröstningen. Facebook ställdes inför regulatoriska utredningar över flera kontinenter och betalade ett rekordböter på 5 miljarder dollar till Federal Trade Commission i juli 2019.\n\nEdward Snowdens avslöjanden i juni 2013 avslöjade omfattningen av den statliga övervakning som möjliggörs av digital kommunikation. Den tidigare National Security Agency-entreprenören läckte hemligstämplade dokument till journalisterna Glenn Greenwald, Laura Poitras och Ewen MacAskill. Dessa dokument avslöjade program som samlade in telefonmetadata från miljontals amerikaner, avlyssnade fiberoptiska kablar som transporterade internationell kommunikation och utnyttjade sårbarheter i teknikprodukter. Avslöjandena utlöste globala debatter om balansen mellan säkerhet och integritet.\n\nPRISM-programmet tillät NSA att samla in data direkt från servrar hos stora teknikföretag inklusive Google, Facebook, Apple och Microsoft. Företagen förnekade inledningsvis kännedom om programmet, även om efterföljande rapportering klargjorde att de följde rättsliga beslut samtidigt som de ibland kämpade mot utökad övervakning i domstolar. Snowden flydde till Hongkong och fick så småningom asyl i Ryssland, där han fortfarande befann sig 2024. USA åtalade honom för spionage och stöld av statlig egendom.\n\nKryptering utgör det primära tekniska försvaret mot både statlig övervakning och kriminell avlyssning. End-to-end-kryptering säkerställer att endast avsändaren och mottagaren kan läsa meddelanden, och även tjänsteleverantören kan inte komma åt innehållet. WhatsApp implementerade end-to-end-kryptering för sina 1,5 miljarder användare i april 2016, med hjälp av Signal Protocol som utvecklats av kryptografen Moxie Marlinspike. Apple krypterar på liknande sätt iMessage-kommunikation och har offentligt motsatt sig statliga krav på bakdörrar.\n\nBrottsbekämpande myndigheter hävdar att kryptering skapar zoner där brottslingar opererar ostraffat. FBI stämde Apple i februari 2016 för att tvinga företaget att hjälpa till att låsa upp en iPhone som användes av en av terroristerna i San Bernardino. Apple vägrade och hävdade att skapandet av en bakdörr skulle äventyra säkerheten för alla användare. FBI betalade slutligen en tredjepartsentreprenör cirka en miljon dollar för att kringgå telefonens säkerhet. Detta fall illustrerade den pågående konflikten mellan integritets- och säkerhetsintressen.\n\nEuropeiska unionen antog den allmänna dataskyddsförordningen, allmänt känd som GDPR, som trädde i kraft den 25 maj 2018. Detta omfattande ramverk fastställde strikta regler för insamling, lagring och behandling av personuppgifter om EU-medborgare. Organisationer måste inhämta uttryckligt samtycke innan de samlar in data, ge tillgång till lagrad information och radera data på begäran. Överträdelser kan leda till böter på upp till 4 procent av den globala årliga omsättningen eller 20 miljoner euro, beroende på vilket som är störst. Amazon fick det största GDPR-böterna på 746 miljoner euro i juli 2021.\n\nKalifornien antog California Consumer Privacy Act, som trädde i kraft den 1 januari 2020 och fastställde liknande skydd för delstatsinvånare. Lagen ger konsumenterna rätt att veta vilken personlig information företag samlar in, radera den informationen och välja bort försäljning av den. California Privacy Rights Act, som godkändes av väljarna i november 2020, stärkte dessa skydd ytterligare. Andra stater, inklusive Virginia, Colorado och Connecticut, har antagit jämförbar lagstiftning, vilket skapar ett lappverk av integritetskrav över hela USA.\n\nDataförmedlare verkar till stor del utanför allmänhetens medvetande och sammanställer detaljerade profiler från offentliga register, köphistorik, aktivitet i sociala medier och många andra källor. Företag som Acxiom, Experian och Oracle Data Cloud underhåller databaser som täcker hundratals miljoner individer. Dessa profiler påverkar kreditbeslut, anställningsscreening, försäkringspremier och riktad reklam. Förmedlare säljer tillgång till denna information till företag, politiska kampanjer och ibland illvilliga aktörer.\n\nPlatsspårning har blivit särskilt kontroversiellt eftersom smartphones kontinuerligt rapporterar användarpositioner. Mobilapplikationer begär rutinmässigt platstillgång för funktionalitet som sträcker sig från väderprognoser till restaurangrekommendationer. Dessa data avslöjar känslig information om medicinska besök, religiös utövning, politisk aktivitet och personliga relationer. The Wall Street Journal rapporterade i december 2018 att dussintals företag får exakt platsdata från populära appar, vilket skapar omfattande rörelsehistorik.\n\nAnsiktsigenkänningsteknik väcker tydliga integritetsfrågor genom att möjliggöra identifiering utan samtycke eller medvetenhet. Brottsbekämpande myndigheter använder system från företag som Clearview AI, som skrapat miljarder foton från sociala medier för att bygga en sökbar databas. Flera städer, inklusive San Francisco, Boston och Portland, har förbjudit statlig användning av ansiktsigenkänning. Europeiska unionen har debatterat restriktioner för biometrisk övervakning i offentliga utrymmen. Kina har använt ansiktsigenkänning i stor utsträckning och använder det för sociala kontrollåtgärder som särskilt riktar sig mot uiguriska minoriteter.\n\nRätten att bli glömd växte fram ur en dom från Europeiska unionens domstol från 2014 som krävde att Google skulle ta bort vissa sökresultat på begäran. Mario Costeja Gonzalez, en spansk medborgare, hävdade framgångsrikt att länkar till tidningsartiklar från 1998 om hans ekonomiska svårigheter inte längre var relevanta. Google har behandlat över 1,6 miljoner borttagningsförfrågningar som påverkar nästan 6 miljoner webbadresser sedan domen. Kritiker hävdar att detta motsvarar censur, medan anhängare ser det som avgörande för personlig värdighet och rehabilitering.\n\nIntegritetsbevarande teknik erbjuder alternativ till övervakningsekonomin. Virtuella privata nätverk krypterar internettrafik och maskerar användarplatser. Tor-webbläsaren dirigerar kommunikation genom flera servrar för att förhindra spårning. Integritetsfokuserade sökmotorer som DuckDuckGo behandlar frågor utan att samla in personuppgifter. Signal tillhandahåller krypterad meddelandehantering som samlar in minimala metadata. Dessa verktyg kräver teknisk sofistikering som begränsar antagandet men visar att integritetsrespekterande tjänster är tekniskt genomförbara.\n\nBarns integritet får särskilt rättsligt skydd med tanke på deras sårbarhet och oförmåga att ge meningsfullt samtycke. Children's Online Privacy Protection Act, som antogs 1998, begränsar insamlingen av personlig information från barn under 13 år i USA. TikTok betalade 5,7 miljoner dollar i februari 2019 för att lösa anklagelser om olaglig insamling av barns data. Storbritanniens Age Appropriate Design Code, som trädde i kraft i september 2021, kräver att onlinetjänster tillhandahåller höga integritetsstandarder för användare under 18 år.\n\nFramtiden för digital integritet beror på teknisk innovation, regulatorisk utveckling och kulturella attityder till datadelning. Decentraliserade identitetssystem kan ge individer kontroll över sin personliga information. Differential privacy-tekniker möjliggör användbar dataanalys samtidigt som enskilda poster skyddas. Regulatorisk konvergens kan fastställa globala standarder snarare än fragmenterade nationella strategier. Den grundläggande spänningen mellan dataanvändbarhet och integritetsskydd kommer att kvarstå, men balansen mellan dem är fortfarande föremål för demokratisk debatt och individuella val.",
    "wordCount": 1402,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "När publicerade Samuel Warren och Louis Brandeis sin banbrytande integritetsartikel i Harvard Law Review?",
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
        "question": "Vilka företag avslöjades vara en del av NSA:s PRISM-program? Välj alla som stämmer.",
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
        "question": "Cambridge Analytica-skandalen involverade data från 87 miljoner Facebook-användare.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Hur mycket betalade Facebook i böter till FTC i juli 2019 (i miljarder dollar)?",
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
        "question": "När läckte Edward Snowden hemligstämplade NSA-dokument?",
        "options": [
          "Juni 2011",
          "Juni 2013",
          "Juni 2015",
          "Juni 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "När trädde GDPR i kraft?",
        "options": [
          "25 maj 2016",
          "25 maj 2017",
          "25 maj 2018",
          "25 maj 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Hur stor var Amazons GDPR-bot i juli 2021 (i miljoner euro)?",
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
        "question": "WhatsApp implementerade end-to-end-kryptering för sina användare i april 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "När trädde California Consumer Privacy Act i kraft?",
        "options": [
          "1 januari 2018",
          "1 januari 2019",
          "1 januari 2020",
          "1 januari 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "När antogs Children's Online Privacy Protection Act?",
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
        "question": "Vem uppfann webbkakor (cookies) 1994?",
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
        "question": "När lanserades Google AdWords?",
        "options": [
          "Oktober 1998",
          "Oktober 2000",
          "Oktober 2002",
          "Oktober 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Hur mycket betalade TikTok i februari 2019 för att reglera anklagelser om barns data (i miljoner dollar)?",
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
        "question": "San Francisco har förbjudit statlig användning av ansiktsigenkänningsteknik.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "När kom rätten att bli glömd-domen från EU-domstolen?",
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
        "question": "Vilka journalister tog emot Edward Snowdens läckta dokument? Välj alla som stämmer.",
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
    "title": "Blockchainteknologins revolutionerande värld",
    "content": "Blockchainteknologi har utvecklats från ett obskyrt kryptografiskt koncept till en transformativ kraft som omformar industrier långt bortom dess ursprung i digital valuta. Detta distribuerade liggarsystem erbjuder oöverträffad transparens, säkerhet och decentralisering som utmanar traditionella metoder för registerhållning och förtroende. Att förstå blockchain avslöjar varför teknologer anser det vara bland de viktigaste innovationerna sedan själva internet.\n\nSatoshi Nakamoto, en pseudonym individ eller grupp, introducerade blockchain för världen genom Bitcoin-whitepaperet som publicerades den 31 oktober 2008. Tidpunkten visade sig vara anmärkningsvärt förutseende, anländande bara veckor efter att Lehman Brothers kollapsade och utlöste den globala finanskrisen. Nakamoto föreslog ett peer-to-peer elektroniskt kontantsystem som skulle eliminera behovet av betrodda mellanhänder som banker. Det första Bitcoin-blocket, kallat genesis-blocket, minades den 3 januari 2009 och inbäddade en tidningsrubrik om bankräddningsaktioner som en permanent påminnelse om teknikens motiv.\n\nEn blockchain fungerar som en distribuerad databas som delas över ett nätverk av datorer som kallas noder. Varje block innehåller en lista över transaktioner, en tidsstämpel och en kryptografisk hash som länkar det till föregående block. Denna kedja av hashvärden gör det praktiskt taget omöjligt att ändra historiska poster utan att kontrollera en majoritet av nätverket. När någon försöker ändra en gammal transaktion ändras hashvärdet, vilket bryter kedjan och varnar andra noder om försöket till manipulering.\n\nKonsensusmekanismer säkerställer att alla noder är överens om innehållet i blockchain utan att kräva en central myndighet. Bitcoin använder proof of work, där datorer tävlar om att lösa komplexa matematiska pussel. Den som först hittar en lösning tjänar rätten att lägga till nästa block och få nyskapade bitcoins som belöning. Denna process, som kallas mining, förbrukade ungefär 127 terawattimmar el under 2023, jämförbart med Norges årliga energiförbrukning.\n\nEthereum, lanserat av programmeraren Vitalik Buterin i juli 2015, utvidgade blockchain bortom enkla transaktioner till programmerbara smarta kontrakt. Dessa självutförande avtal verkställer automatiskt sina villkor när fördefinierade villkor är uppfyllda. Ett smart kontrakt för fastigheter skulle kunna frigöra betalning till en säljare och överföra äganderätten till en köpare samtidigt när båda parter uppfyller sina skyldigheter. Inga advokater, spärrombud eller banker behöver verifiera transaktionen.\n\nDecentraliserad finans, vanligtvis kallad DeFi, använder smarta kontrakt för att återskapa traditionella finansiella tjänster utan mellanhänder. Utlåningsplattformar tillåter användare att låna kryptovaluta genom att tillhandahålla säkerhet, med räntor som bestäms av algoritmer snarare än bankirer. Decentraliserade börser möjliggör direkt handel mellan användare utan att ett företag innehar deras pengar. På sin topp i november 2021 innehade DeFi-protokoll över 180 miljarder dollar i tillgångar.\n\nIcke-fungibla tokens, kända som NFT:er, tillämpar blockchain på digitalt ägande och proveniens. Varje NFT representerar en unik tillgång som verifieras på blockchain, oftast digital konst eller samlarobjekt. Digitalkonstnären Beeple sålde ett NFT-konstverk på Christie's auktionshus i mars 2021 för 69,3 miljoner dollar, vilket katapulterade denna teknik till allmänhetens medvetande. Kritiker ifrågasätter om NFT:er har ett varaktigt värde, medan anhängare hävdar att de i grunden förändrar hur kreatörer tjänar pengar på digitala verk.\n\nSupply chain management erbjuder övertygande praktiska tillämpningar för blockchainteknologi. Företag kan spåra produkter från råmaterial genom tillverkning till butikshyllor med oföränderliga poster vid varje steg. Walmart samarbetade med IBM om ett blockchainsystem som spårar ursprunget för livsmedelsprodukter på några sekunder snarare än den vecka som tidigare krävdes. Denna förmåga visar sig vara ovärderlig vid återkallelser av livsmedelssäkerhet när snabb identifiering av förorenade partier räddar liv.\n\nRegeringar utforskar blockchain för identitetsverifiering, röstningssystem och offentliga register. Estland, en pionjär inom digital styrning, använder blockchain för att säkra hälsoregister, företagsregistreringar och domstolsdokument för sina 1,3 miljoner medborgare. West Virginias statssekreterare genomförde ett blockchain-baserat röstningspilotprojekt för militär personal som var stationerad utomlands under mellanårsvalet 2018. Dessa experiment testar om tekniken kan förbättra snarare än hota demokratiska institutioner.\n\nMiljöhänsyn kring blockchain har föranlett betydande teknisk utveckling. Ethereum övergick från energikrävande proof of work till proof of stake i september 2022, vilket minskade dess elförbrukning med uppskattningsvis 99,95 procent. Proof of stake väljer validatorer baserat på den kryptovaluta de pantsätter som säkerhet snarare än datorkraft. Denna förändring visar att blockchain kan hantera sitt miljöavtryck samtidigt som säkerheten bibehålls.\n\nSkalbarhetsutmaningar begränsar blockchain-användningen för vardagliga transaktioner. Bitcoin behandlar ungefär sju transaktioner per sekund jämfört med Visa-nätverkets kapacitet för 24 000. Lager två-lösningar bygger snabbare betalningskanaler ovanpå befintliga blockkedjor. Lightning Network möjliggör nästan omedelbara Bitcoin-transaktioner genom att endast reglera slutliga saldon på huvudkedjan. Dessa innovationer syftar till att göra blockchain praktiskt för vardagliga inköp.\n\nBlockchains framtid sträcker sig in i områden som dess skapare aldrig föreställt sig. Decentraliserade autonoma organisationer, eller DAO:er, använder tokenröstning för att styra samhällen och hantera kassor utan traditionella företagsstrukturer. Digitala identitetssystem kan ge individer kontroll över sina personuppgifter samtidigt som de bevisar meriter för arbetsgivare, hyresvärdar eller regeringar. Om blockchain uppfyller sin revolutionerande potential eller hamnar i en nischroll är fortfarande osäkert, men dess inverkan på teknik och samhälle har redan visat sig vara betydande och varaktig.",
    "wordCount": 785,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "När publicerades Bitcoins vitbok?",
        "options": [
          "3 januari 2009",
          "31 oktober 2008",
          "Juli 2015",
          "September 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Vilka nämns som blockchain-applikationer utöver kryptovaluta? Välj alla som stämmer.",
        "options": [
          "Hantering av försörjningskedjan",
          "Digital identitet",
          "Röstningssystem",
          "Videoströmning"
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
        "question": "Ethereum övergick till proof of stake i september 2022, vilket minskade elförbrukningen med 99,95 procent.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Hur mycket såldes Beepels NFT-konstverk för på Christie's i mars 2021 (i miljoner dollar)?",
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
        "question": "Vem lanserade Ethereum i juli 2015?",
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
        "question": "Hur många transaktioner per sekund kan Bitcoin-nätverket behandla?",
        "options": [
          "Ungefär 7",
          "Ungefär 70",
          "Ungefär 700",
          "Ungefär 7 000"
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
    "title": "Molntjänstrevolutionen",
    "content": "Molntjänster har i grunden förändrat hur företag och individer använder teknik, och flyttat programvara och datalagring från lokala enheter till enorma nätverk av fjärrservrar. Denna arkitektoniska revolution möjliggör kapaciteter som verkade omöjliga för bara två decennier sedan, från strömmande underhållning till artificiell intelligens-tjänster som är tillgängliga från vilken enhet som helst. Molnet har blivit så integrerat i det moderna livet att de flesta använder det dagligen utan att vara medvetna om det.\n\nAmazon Web Services lanserade sina första molnprodukter i mars 2006, och var pionjärer inom modellen \"infrastruktur som tjänst\" (IaaS) som skulle omforma teknikindustrin. Företaget hade byggt upp enorm datorkapacitet för att hantera perioder med högt tryck, som Black Friday, och insåg att de kunde hyra ut oanvänd kapacitet till andra företag. Andy Jassy, som ledde AWS från starten, byggde upp divisionen till en vinstmaskin som genererar över 80 miljarder dollar i årlig intäkt. Denna affärsmodell visade sig vara så framgångsrik att konkurrenter skyndade sig att bygga sina egna molnplattformar.\n\nMicrosoft Azure gick in på molnmarknaden i februari 2010 och utnyttjade företagets djupa relationer med företagskunder. VD Satya Nadella, som tog över ledarskapet 2014, ändrade Microsofts strategi kring molntjänster. Azure växte till att bli den näst största molnleverantören, och driver allt från små företags webbplatser till det professionella nätverket LinkedIn. Microsofts molnomvandling återupplivade ett företag som många hade avfärdat som förbi sin storhetstid.\n\nGoogle Cloud Platform för med sig sökgigantens expertis inom distribuerad databehandling och maskininlärning till företagskunder. Företaget som indexerar hela internet och bearbetar miljarder sökfrågor dagligen erbjuder den infrastrukturen till företag av alla storlekar. Googles investeringar i undervattenskablar och datacenter som spänner över dussintals länder möjliggör åtkomst med låg latens från nästan var som helst på jorden. Plattformen utmärker sig särskilt inom dataanalys och artificiell intelligens-arbetsbelastningar.\n\nMolntjänster erbjuder tre primära tjänstemodeller som staplas ovanpå varandra som lager. Infrastruktur som tjänst (IaaS) tillhandahåller virtuella maskiner, lagring och nätverk som kunderna konfigurerar själva. Plattform som tjänst (PaaS) lägger till operativsystem, databaser och utvecklingsverktyg. Programvara som tjänst (SaaS) levererar kompletta applikationer via webbläsare, vilket helt eliminerar installation och underhåll. De flesta interagerar med SaaS-produkter dagligen via e-post, dokumentredigering och affärsapplikationer.\n\nEkonomin i molntjänster skapar fördelar för organisationer av nästan alla storlekar. Nystartade företag kan lansera utan att köpa dyr hårdvara eller anställa specialiserad personal för att underhålla datacenter. De betalar bara för de resurser som förbrukas och skalar upp under hektiska perioder och ner under lugna perioder. Denna flexibilitet förändrade ekonomin för att starta ett teknikföretag. En tjänst som kan ha krävt miljoner i infrastrukturinvesteringar kan nu lanseras med minimalt kapital.\n\nFöretagsorganisationer migrerar i allt högre grad från lokala datacenter till molnplattformar. General Electric konsoliderade hundratals datacenter till en hybrid molnarkitektur med start 2014. Capital One, en av de största bankerna i USA, meddelade 2020 att de hade stängt sitt sista datacenter efter att helt ha migrerat till AWS. Dessa omvandlingar tar år och miljarder dollar, men minskar i slutändan kostnaderna samtidigt som kapaciteten ökar.\n\nSäkerhet i molnet skiljer sig fundamentalt från traditionella metoder, men överträffar ofta vad organisationer uppnår oberoende. Stora molnleverantörer anställer tusentals säkerhetsspecialister och investerar miljarder i skyddsteknik. De innehar certifieringar för hantering av hemligstämplad statlig information och känslig finansiell data. Delade ansvarsmodeller innebär att leverantörer säkrar infrastrukturen medan kunder säkrar sina egna applikationer och datakonfigurationer.\n\nGeografisk distribution av molndatacenter tjänar syften utöver prestandaoptimering. Regler i många länder kräver att viss data stannar inom nationella gränser. Molnleverantörer bygger regionala datacenter för att uppfylla dessa suveränitetskrav. Europeiska kunder kan säkerställa att deras data stannar i Frankfurt eller Amsterdam. Australiska företag behåller information inom sitt land. Denna distribuerade arkitektur ger också katastrofåterställningsfunktioner som få organisationer har råd med oberoende.\n\nEdge computing utökar molnfunktionerna närmare där data har sitt ursprung. Istället för att skicka allt till avlägsna datacenter bearbetar kantsystem information lokalt för applikationer som kräver omedelbar respons. Autonoma fordon kan inte vänta på att data ska färdas tusentals kilometer innan de bestämmer sig för att bromsa. Industriella sensorer som analyserar utrustningsvibrationer behöver omedelbar anomalidetektering. Edge computing för med sig molnintelligens till scenarier där millisekunder spelar roll.\n\nServerlös databehandling representerar den senaste utvecklingen av molnarkitekturen. I den här modellen skriver utvecklare kod utan att hantera någon infrastruktur alls. Molnplattformar allokerar automatiskt resurser när kod körs och debiterar endast för faktisk exekveringstid. En funktion som körs i 100 millisekunder kostar en bråkdel av ett öre. Applikationer kan skala från noll till att hantera miljontals förfrågningar utan några konfigurationsändringar.\n\nDen miljöpåverkan som molntjänster har skapar både oro och möjligheter. Datacenter förbrukar ungefär 1,5 procent av den globala elen och den andelen fortsätter att växa. Molnleverantörer arbetar dock betydligt mer effektivt än typiska företagsdatacenter. Google hävdar att deras anläggningar uppnår en genomsnittlig energieffektivitet (PUE) på 1,1 jämfört med branschgenomsnittet över 1,5. Molnplattformar driver i allt högre grad verksamheten med förnybar energi, och Microsoft har lovat att vara koldioxidnegativt senast 2030.\n\nArtificiell intelligens och maskininlärning har blivit definierande funktioner i molnplattformar. Förtränade modeller för bildigenkänning, naturlig språkbehandling och talsyntes är tillgängliga via enkla programmeringsgränssnitt. Organisationer utan expertis inom maskininlärning kan lägga till sofistikerade funktioner till sina applikationer. Molnleverantörer konkurrerar aggressivt om AI-funktioner, var och en hävdar fördelar i noggrannhet, användarvänlighet och bredd av tillgängliga modeller.\n\nMulti-molnstrategier tillåter organisationer att använda flera leverantörer samtidigt, vilket undviker beroende av en enskild leverantör. Kubernetes, ett containerorkestreringssystem med öppen källkod som ursprungligen utvecklats av Google, gör det möjligt att flytta arbetsbelastningar mellan moln. Företag väljer olika leverantörer för olika arbetsbelastningar baserat på kostnad, prestanda eller specialiserade funktioner. Denna flexibilitet kräver ytterligare komplexitet men minskar oron för leverantörslåsning.\n\nFramtiden för molntjänster pekar mot ännu större integration med det dagliga livet och affärsverksamheten. Kvantdatorresurser förekommer redan på molnplattformar, även om praktiska tillämpningar fortfarande är begränsade. Artificiell intelligens kommer att automatisera mer infrastrukturhantering, vilket minskar den expertis som krävs för att driftsätta sofistikerade system. Gränsen mellan lokala enheter och molnresurser kommer att suddas ut ytterligare i takt med att anslutningsmöjligheterna förbättras och edge computing mognar. Oavsett vilka specifika tekniker som dyker upp kommer det grundläggande skiftet från ägd infrastruktur till hyrda tjänster att fortsätta att omforma hur mänskligheten beräknar.",
    "wordCount": 998,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "När lanserade Amazon Web Services sina första molnprodukter?",
        "options": [
          "Mars 2006",
          "Februari 2010",
          "Januari 2014",
          "November 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Vilka är de tre huvudsakliga molntjänstmodellerna som nämns? Välj alla som stämmer.",
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
        "question": "Capital One meddelade 2020 att de hade stängt sitt sista datacenter efter att helt ha migrerat till AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Vilken procentandel av den globala elektriciteten konsumerar datacenter?",
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
        "question": "Vilken VD vände Microsofts strategi kring molntjänster med start 2014?",
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
        "question": "Vilket system med öppen källkod möjliggör för arbetsbelastningar att flyttas mellan olika molnleverantörer?",
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
        "question": "Hur stor årlig omsättning genererar AWS (i miljarder dollar)?",
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
        "question": "Inom vilket år har Microsoft lovat att vara koldioxidnegativa?",
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
    "title": "Kvantdatorrevolutionen",
    "content": "Kvantdatorer representerar den djupaste transformationen inom beräkningskraft sedan transistorns uppfinning, och lovar att lösa problem som skulle ta klassiska datorer längre tid än universums ålder att slutföra. Dessa maskiner utnyttjar kvantmekanikens bisarra egenskaper för att utföra beräkningar på fundamentalt nya sätt som utmanar vardagsintuitionen. Att förstå denna revolutionerande teknologi avslöjar både dess extraordinära potential och de formidabla utmaningar som kvarstår innan kvantdatorer uppnår sitt fulla löfte.\n\nKlassiska datorer kodar information som bitar som antingen existerar som noll eller ett i varje givet ögonblick. Varje fotografi, dokument och video på dina enheter reduceras till långa strängar av dessa binära siffror manipulerade genom logiska operationer. Detta tillvägagångssätt har drivit på anmärkningsvärda framsteg sedan 1940-talet, med processorer som nu innehåller miljarder transistorer på chip som är mindre än en nagel. Ändå förblir vissa problem envist utom räckhåll eftersom antalet beräkningar som krävs växer exponentiellt med problemstorleken.\n\nKvantdatorer använder kvantbitar, kallade qubits, som kan existera i superposition, vilket representerar noll och ett samtidigt tills de mäts. Denna egenskap tillåter kvantsystem att utforska många möjliga lösningar samtidigt istället för att kontrollera dem en efter en. När flera qubits blir sammanflätade påverkar mätningen av en omedelbart de andra oavsett fysiskt avstånd. Dessa kvantfenomen möjliggör algoritmer som dramatiskt överträffar klassiska metoder för specifika problemtyper.\n\nRichard Feynman, den Nobelprisbelönade fysikern, föreslog konceptet kvantdatorer under en föreläsning vid California Institute of Technology i maj 1981. Han observerade att simulering av kvantmekaniska system på klassiska datorer krävde exponentiellt ökande resurser när systemstorleken växte. Feynman föreslog att endast en kvantmekanisk dator effektivt kunde simulera kvantfysik. Denna insikt lanserade ett område som skulle utvecklas långsamt i årtionden innan de senaste genombrotten accelererade framstegen.\n\nDavid Deutsch vid Oxford University formaliserade teorin om kvantberäkning 1985 och beskrev hur en universell kvantdator kunde utnyttja superposition och interferens. Peter Shor vid Bell Labs gjorde kvantdatorer berömda 1994 när han utvecklade en algoritm som kunde faktorisera stora tal exponentiellt snabbare än någon känd klassisk metod. Denna upptäckt hotade RSA-krypteringen som säkrar internetkommunikation, vilket plötsligt gjorde kvantdatorer till en fråga om nationell säkerhet.\n\nAtt bygga faktiska kvantdatorer visade sig vara utomordentligt svårt eftersom qubits är bräckliga och lätt störs av sin omgivning. Varje interaktion med omvärlden orsakar dekoherens, vilket kollapsar superpositionen och förstör kvantinformation. Tidiga experiment upprätthöll koherens i endast nanosekunder. Forskare utvecklade utarbetade isoleringstekniker inklusive supraledande kretsar kylda till temperaturer kallare än yttre rymden, vanligtvis runt 15 millikelvin, knappt över absoluta nollpunkten.\n\nIBM placerade den första kvantdatorn som var tillgänglig via molnet, kallad IBM Quantum Experience, online i maj 2016, vilket tillät forskare och entusiaster över hela världen att experimentera med riktig kvantmaskinvara. Det initiala systemet innehöll bara fem qubits, knappt tillräckligt för enkla demonstrationer. År 2023 hade IBM driftsatt system som översteg 1 000 qubits och tillkännagav planer för 100 000 qubits system till 2033. Dessa maskiner är fortfarande långt ifrån att ersätta klassiska datorer men demonstrerar stadiga framsteg mot praktisk användbarhet.\n\nGoogle uppnådde en milstolpe kallad kvantöverlägsenhet i oktober 2019 när dess 53-qubit Sycamore-processor utförde en beräkning på 200 sekunder som skulle ta världens snabbaste superdator cirka 10 000 år. Kritiker bestred jämförelsen, och IBM hävdade att deras superdatorer kunde slutföra uppgiften på dagar snarare än årtusenden. Ändå demonstrerade prestationen att kvantdatorer kunde överträffa klassiska system på åtminstone vissa uppgifter.\n\nFelkorrigering representerar kanske det största hindret för användbar kvantberäkning. Fysiska qubits är för brusiga och otillförlitliga för komplexa beräkningar. Kvantfelkorrigering kodar en logisk qubit över många fysiska qubits för att upptäcka och fixa fel, men nuvarande metoder kräver tusentals fysiska qubits per logisk qubit. En kvantdator som löser praktiska problem kan behöva miljontals fysiska qubits, långt utöver nuvarande kapacitet.\n\nOlika tekniker konkurrerar om att bygga de bästa qubits för framtida kvantdatorer. Supraledande kretsar, som används av IBM och Google, utnyttjar etablerade tillverkningstekniker från halvledarindustrin. Fångade joner, som eftersträvas av IonQ och Honeywell, håller laddade atomer i elektromagnetiska fält med exceptionell precision. Fotoniska system kodar information i ljuspartiklar som kan färdas långa sträckor utan dekoherens. Topologiska qubits, som fortfarande är till stor del teoretiska, skulle lagra information i mönster som är resistenta mot lokala störningar.\n\nKvantkemiska applikationer kan leverera de första praktiska kvantberäkningsfördelarna. Att simulera molekyler för att designa nya läkemedel, material och katalysatorer kräver kvantmekaniska beräkningar som skalar exponentiellt på klassiska datorer. En kvantdator kan modellera kemiska reaktioner på atomnivå, vilket potentiellt kan accelerera upptäckten av läkemedel, gödningsmedel och ren energiteknik. Företag inklusive Roche, Merck och BASF har lanserat kvantberäkningsforskningsprogram i väntan på dessa kapaciteter.\n\nOptimeringsproblem som spänner över logistik, finans och maskininlärning representerar ett annat lovande applikationsområde. Att hitta den bästa rutten för distributionsbilar, optimala portföljer för investerare eller ideala parametrar för neurala nätverk innebär att söka i stora lösningsutrymmen. Kvantannealing, en specialiserad form av kvantberäkning som kommersialiserats av D-Wave Systems sedan 2011, adresserar optimering direkt. Stora företag inklusive Volkswagen, JPMorgan Chase och Lockheed Martin har utforskat kvantoptimering för verkliga affärsutmaningar.\n\nKryptografi står inför både hot och möjligheter från kvantberäkningens framsteg. Shors algoritm kan bryta allmänt använd kryptering när tillräckligt kraftfulla kvantdatorer existerar. National Institute of Standards and Technology valde nya postkvant-kryptografiska standarder i juli 2022 efter en sexårig tävling för att identifiera algoritmer som är resistenta mot kvantattacker. Under tiden använder kvantnyckeldistribution kvantmätningens fysik för att skapa teoretiskt obrytbar kryptering för den mest känsliga kommunikationen.\n\nKina har investerat kraftigt i kvantteknik och etablerat University of Science and Technology of China som en världsledare under fysikern Pan Jianwei. År 2017 lanserade Kina Micius, en satellit som demonstrerade kvantsäker kommunikation mellan markstationer åtskilda av 1 200 kilometer. Kinesiska forskare hävdade kvantöverlägsenhet med ett fotoniskt system som heter Jiuzhang i december 2020. USA svarade med National Quantum Initiative Act från 2018 och anslöt 1,2 miljarder dollar över fem år för att upprätthålla konkurrenskraften.\n\nKvantdatorindustrin har lockat enorma investeringar trots osäkra tidslinjer för praktisk avkastning. Riskkapitalfinansiering för kvantstartups översteg 2,5 miljarder dollar under 2022. Stora teknikföretag inklusive Microsoft, Amazon och Alibaba har lanserat kvantmolntjänster vid sidan av dedikerade maskinvaruföretag. Analytiker förutspår att kvantdatorernas marknad kommer att nå 65 miljarder dollar till 2030, även om uppskattningarna varierar kraftigt med tanke på teknisk osäkerhet.\n\nKvantdatorernas framtid beror på hållbara framsteg över flera fronter samtidigt. Hårdvaran måste förbättras i skala, koherens och anslutningsmöjligheter. Programvaran måste utveckla effektiva algoritmer och programmeringsverktyg som är tillgängliga bortom specialister inom kvantfysik. Applikationer måste demonstrera tydliga fördelar jämfört med klassiska alternativ för verkliga problem. Resan från laboratoriedemonstrationer till praktisk användbarhet kan ta årtionden, men de potentiella belöningarna motiverar fortsatt investering och ansträngning.",
    "wordCount": 1057,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Vem föreslog konceptet kvantdatorer i maj 1981?",
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
        "question": "Vilka teknologier nämns som metoder för att bygga qubits? Välj alla som stämmer.",
        "options": [
          "Supraledande kretsar",
          "Infångade joner",
          "Fotoniska system",
          "Grafentransistorer"
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
        "question": "IBM placerade den första molntillgängliga kvantdatorn online i maj 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Hur många sekunder tog det för Googles Sycamore-processor att slutföra sin kvantöverlägsenhetsberäkning?",
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
        "question": "När utvecklade Peter Shor sin berömda faktoriseringsalgoritm?",
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
        "question": "Vilken temperatur kyls supraledande kvantdatorer vanligtvis ned till?",
        "options": [
          "Ungefär 100 kelvin",
          "Ungefär 4 kelvin",
          "Ungefär 15 millikelvin",
          "Ungefär 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Hur mycket finansiering allokerade National Quantum Initiative Act över fem år (i miljarder dollar)?",
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
        "question": "Kina lanserade en kvantkommunikationssatellit vid namn Micius år 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "När valde NIST nya post-kvant kryptografiska standarder?",
        "options": [
          "Juli 2020",
          "Juli 2021",
          "Juli 2022",
          "Juli 2023"
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
    "title": "Den Globala Halvledarindustrin",
    "content": "Halvledare har blivit grunden för den moderna civilisationen och driver allt från smarttelefoner och bilar till medicinska apparater och militära system som nationer är beroende av för sin säkerhet. Dessa pyttesmå chip som innehåller miljarder transistorer representerar de mest komplexa föremål som mänskligheten någonsin tillverkat, producerade genom processer som kräver precision mätt i atomer. Den globala konkurrensen om att kontrollera halvledartekniken har förvandlat denna industri till en brännpunkt för geopolitisk rivalitet med implikationer för ekonomiskt välstånd och nationell säkerhet över hela världen.\n\nHalvledarresan började vid Bell Labs i New Jersey den 23 december 1947, när fysikerna John Bardeen, Walter Brattain och William Shockley demonstrerade den första transistorn. Denna enhet kunde förstärka elektriska signaler utan den värme och bräcklighet som vakuumrör hade, vilket gav upphovsmännen Nobelpriset i fysik 1956. Transistorns potential för miniatyrisering skulle så småningom möjliggöra den digitala revolution som omformade det mänskliga samhället.\n\nJack Kilby på Texas Instruments och Robert Noyce på Fairchild Semiconductor uppfann oberoende av varandra den integrerade kretsen 1958 respektive 1959, och kombinerade flera transistorer på en enda bit halvledarmaterial. Detta genombrott eliminerade behovet av handmontering av enskilda komponenter och möjliggjorde tillverkning i stor skala. Kilby mottog Nobelpriset i fysik år 2000 för detta bidrag som gjorde modern elektronik möjlig.\n\nGordon Moore, medgrundare av Intel, observerade 1965 att antalet transistorer på integrerade kretsar fördubblades ungefär vartannat år medan kostnaderna förblev konstanta. Denna observation, känd som Moores lag, har väglett industrin under sex decennier av exponentiella förbättringar. Moderna processorer innehåller över 100 miljarder transistorer, som var och en mäter bara några nanometer tvärs över, ungefär bredden av 20 kiselatomer.\n\nHalvledartillverkningsprocessen involverar hundratals steg som sträcker sig över månader av exakta operationer. Ingenjörer börjar med cylindrar av ultrarent kisel som odlats från smält material vid temperaturer över 1400 grader Celsius. Dessa göt skärs i tunna skivor och poleras till atomisk jämnhet. Fotolitografi projicerar kretsmönster på skivorna med ultraviolett ljus, där de mest avancerade maskinerna använder extrema ultravioletta våglängder på bara 13,5 nanometer.\n\nTaiwan Semiconductor Manufacturing Company, känt som TSMC, har vuxit fram som världens viktigaste halvledartillverkare. TSMC grundades av Morris Chang 1987 och var pionjär inom gjuterimodellen för att tillverka chip designade av andra företag. År 2023 producerade TSMC över 90 procent av världens mest avancerade chip, inklusive processorer för Apple, AMD och Nvidia. Denna koncentration av kapacitet på en ö som står inför territoriella krav från Kina har blivit en stor geopolitisk oro.\n\nUtrustningen som krävs för att tillverka avancerade halvledare representerar en häpnadsväckande teknisk prestation. ASML, ett holländskt företag, har monopol på extrema ultravioletta litografimaskiner som kostar cirka 2 miljarder kronor styck och väger 180 000 kg. Dessa system använder plasma upphettad till 220 000 grader Celsius för att generera de exakta ljusvåglängder som behövs. ASML krävde bidrag från optikleverantören Zeiss, ljuskällsutvecklaren Cymer och många andra partners för att uppnå denna kapacitet efter årtionden av utveckling.\n\nSamsung Electronics och Intel konkurrerar med TSMC om ledarskap inom avancerad tillverkning, även om båda har halkat efter de senaste åren. Samsung driver stora tillverkningsanläggningar i Sydkorea och Texas och producerar chip för olika kunder tillsammans med sina egna produkter. Intel, historiskt sett den tekniska ledaren, kämpade med tillverkningsförseningar och förlorade marknadsandelar innan man tillkännagav aggressiva investeringsplaner under VD Pat Gelsinger med början 2021.\n\nKina har gjort halvledaroberoende till en nationell prioritet och investerat över 1600 miljarder kronor genom sin National Integrated Circuit Industry Investment Fund och andra program. Semiconductor Manufacturing International Corporation representerar Kinas mest avancerade inhemska tillverkare, även om det ligger flera generationer efter TSMC. Amerikanska exportkontroller som infördes med början i oktober 2022 begränsar Kinas tillgång till avancerad tillverkningsutrustning och chipdesign, vilket intensifierar trycket på inhemsk utveckling.\n\nBilindustrin upptäckte sitt farliga beroende av halvledare under den globala chipbristen som började 2020. När pandeminedstängningar störde leveranskedjor avbröt biltillverkare beställningar i förväntan om svag efterfrågan. När efterfrågan återhämtade sig snabbare än väntat hade halvledarfabriker allokerat kapacitet till andra kunder. General Motors, Ford och Toyota stängde produktionslinjer intermittent i över två år medan de väntade på chip. Bristen kostade bilindustrin uppskattningsvis 2300 miljarder kronor i förlorade intäkter.\n\nRegeringar över hela världen har lanserat massiva program för att bygga inhemsk halvledarkapacitet. USA antog CHIPS and Science Act i augusti 2022 och allokerade 52 miljarder dollar (ca 550 miljarder kronor) till halvledartillverkning och forskning. Den europeiska chipslagen åtog sig 43 miljarder euro (ca 490 miljarder kronor) till liknande mål. Japan tillkännagav 2 biljoner yen (ca 150 miljarder kronor) i subventioner för att locka TSMC-, Samsung- och Micron-fabriker. Indien lanserade ett program på 10 miljarder dollar (ca 105 miljarder kronor) som söker sin första avancerade tillverkningsanläggning.\n\nMinneschip representerar en distinkt halvledarkategori som domineras av andra aktörer än logikprocessorer. Samsung, SK Hynix från Sydkorea och Micron från USA kontrollerar DRAM-marknaden för datorminne. Flashminnesindustrin som lagrar data i smarttelefoner och solid-state-enheter involverar samma koreanska aktörer plus den japanska tillverkaren Kioxia. Minnespriser fluktuerar dramatiskt med utbuds- och efterfrågecykler, vilket skapar högkonjunktur- och nedgångsmönster som komplicerar investeringsbeslut.\n\nHalvledardesignindustrin har koncentrerats kring några få ledande företag som förfogar över enorma resurser. Nvidia, grundat av Jensen Huang 1993, omvandlades från ett grafikkortsföretag till en artificiell intelligensjätte med chip som driver datacenter över hela världen. Företagets marknadsvärde översteg 11 000 miljarder kronor i juni 2023. Qualcomm dominerar mobilprocessorer med teknik licensierad till nästan alla smartphonetillverkare. AMD har vuxit fram som en seriös konkurrent till Intel inom persondatorer och servrar under VD Lisa Su.\n\nLeverantörer av halvledarutrustning utgör ett kritiskt men ofta förbisett lager i industrins ekosystem. Applied Materials, Lam Research och KLA Corporation från USA tillhandahåller deponerings-, etsnings- och inspektionsutrustning som är väsentlig för tillverkningen. Tokyo Electron från Japan bidrar med beläggnings- och rengöringssystem. Dessa företag investerar miljarder årligen i forskning och utveckling för att tänja på gränserna för tillverkningsprecision.\n\nHalvledartillverkningens miljöpåverkan väcker hållbarhetsfrågor som industrin i allt högre grad tar itu med. En modern tillverkningsanläggning förbrukar el motsvarande en liten stad, där vissa anläggningar i Taiwan använder så mycket el som 300 000 hem. Vattenförbrukningen uppgår till miljontals liter dagligen för kylning och rengöringsprocesser. Industrin har åtagit sig att införa förnybar energi och återvinning av vatten för att minska miljöpåverkan, där TSMC har lovat nettonollutsläpp senast 2050.\n\nAvancerad paketeringsteknik förlänger halvledarprestandan utöver vad transistorminiatyrisering ensamt kan uppnå. Chipletarkitekturer kombinerar flera mindre chip till paket som fungerar som enstaka processorer. Tredimensionell stapling placerar chip vertikalt anslutna med mikroskopiska pelare. Dessa tekniker möjliggör fortsatt förbättring även när man närmar sig atomiska gränser som hotar traditionell skalning. AMD:s senaste processorer använder chipletdesigner som minskar tillverkningskostnaderna samtidigt som prestandan förbättras.\n\nArbetskraftsbehoven inom halvledartillverkningen skapar utmaningar för industriell expansion. Skickliga tekniker som använder tillverkningsutrustning kräver flera års utbildning. Ingenjörer som designar nästa generations processer behöver avancerade examina och specialiserad kompetens. USA står inför särskild brist efter årtionden av nedgång i tillverkningen. Utbildningsinitiativ och immigrationspolitik kommer att avgöra om länder kan bemanna de tillverkningsanläggningar som de tävlar om att bygga.\n\nSäkerhetsproblem genomsyrar halvledarindustrin när chip blir vapen i teknisk konkurrens mellan nationer. Försvarssystem är beroende av pålitliga chipleveranser fria från dolda sårbarheter. Ekonomiskt välstånd kräver tillgång till den mest avancerade tekniken för artificiell intelligens, autonoma fordon och andra framväxande applikationer. Halvledares strategiska betydelse säkerställer att regeringar kommer att fortsätta investera kraftigt och begränsa exporten för att skydda upplevda nationella intressen.\n\nDet kommande decenniet kommer att avgöra om halvledarindustrin förblir koncentrerad i Östasien eller diversifieras globalt. Enorma investeringar i nya tillverkningsanläggningar kommer att ta år att bli produktiva. Tekniska utmaningar mångdubblas när transistorer närmar sig grundläggande fysiska gränser. Nya beräkningsparadigmer inklusive kvantberäkning och neuromorfiska chip kan så småningom komplettera eller ersätta traditionella halvledare. Oavsett vilken riktning industrin tar kommer dessa pyttesmå chip att förbli väsentliga för det moderna livet inom överskådlig framtid.",
    "wordCount": 1256,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "När demonstrerades den första transistorn på Bell Labs?",
        "options": [
          "23 december 1945",
          "23 december 1947",
          "23 december 1950",
          "23 december 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Vilka företag nämns som tillverkare av minneskretsar? Välj alla som stämmer.",
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
        "question": "TSMC producerade över 90 procent av världens mest avancerade chips år 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Hur mycket kostar en ASML-maskin för extrem ultraviolett litografi (i miljoner dollar)?",
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
        "question": "Vem grundade TSMC år 1987?",
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
        "question": "Hur mycket avsatte CHIPS and Science Act för halvledare i augusti 2022?",
        "options": [
          "32 miljarder dollar",
          "42 miljarder dollar",
          "52 miljarder dollar",
          "62 miljarder dollar"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Hur mycket kostade bristen på fordonschip industrin i förlorade intäkter (i miljarder dollar)?",
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
        "question": "Nvidias börsvärde översteg en biljon dollar i juni 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "Vilken temperatur värms plasman till i ASML EUV-maskiner?",
        "options": [
          "22 000 grader Celsius",
          "120 000 grader Celsius",
          "220 000 grader Celsius",
          "1 400 grader Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Hur många miljarder transistorer innehåller moderna processorer?",
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
        "question": "När uppfann Jack Kilby den integrerade kretsen på Texas Instruments?",
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
    "title": "Streamingmedias utveckling",
    "content": "Streamingmedia har fundamentalt förändrat hur mänskligheten konsumerar underhållning, utbildning och information, och har ersatt fysiska medier och sändningsscheman med omedelbar tillgång till praktiskt taget obegränsat innehåll från vilken enhet som helst som är ansluten till internet. Denna tekniska revolution, som började med korniga videoklipp på 1990-talet, levererar nu filmer i ultrahög upplösning, livekonserter och interaktiva upplevelser till miljarder användare världen över. Historien om streaming avslöjar hur framsteg inom komprimering, bandbredd och affärsmodeller kombinerades för att omforma hela branscher.\n\nDe tekniska grunderna för streaming växte fram ur forskning om videokomprimering och nätverksprotokoll under 1980- och 1990-talen. Ingenjörer vid Moving Picture Experts Group utvecklade MPEG-standarderna som gjorde digital video praktisk, med MPEG-1 som dök upp 1993 och MPEG-4 som följde 1998. Dessa komprimeringsalgoritmer reducerade videofiler till hanterbara storlekar genom att eliminera redundant information mellan bildrutor och approximera detaljer som det mänskliga ögat inte skulle märka. Utan sådan komprimering skulle streamingvideo kräva bandbredd som vida översteg vad nätverken kunde leverera.\n\nRealNetworks lanserade RealPlayer 1995 och var pionjärer inom streaming av ljud och video över tidiga internetanslutningar. Företagets RealAudio-format tillät radiostationer att sända över webben för första gången. RealVideo följde 1997, även om de frimärksstora, hackande videorna hade liten likhet med modern streaming. På sin topp runt år 2000 hade RealPlayer installerats på över 85 procent av datorerna som var anslutna till internet.\n\nApple gick in i streamingarenan med QuickTime, som ursprungligen släpptes 1991 för att spela lokala videofiler. Företaget lade till streamingfunktioner under 1990-talet och utnyttjade tekniken när de lanserade iTunes i januari 2001. Även om iTunes initialt fokuserade på att ladda ner musik snarare än streaming, demonstrerade det konsumenternas aptit på omedelbar digital tillgång. Apple sålde över 70 miljoner låtar via iTunes under sitt första år.\n\nYouTubes grundande i februari 2005 av de tidigare PayPal-anställda Chad Hurley, Steve Chen och Jawed Karim markerade början på streamingvideons mainstream-era. Plattformen gjorde det enkelt för vanliga användare utan teknisk expertis att ladda upp och dela video. Den första videon, som visar Karim på San Diego Zoo, lades upp den 23 april 2005. Google insåg YouTubes potential och förvärvade företaget för 1,65 miljarder dollar i oktober 2006, bara arton månader efter grundandet.\n\nNetflix började som en DVD-uthyrningstjänst via post 1997, grundat av Reed Hastings och Marc Randolph i Scotts Valley, Kalifornien. Företaget introducerade obegränsad uthyrning mot en månatlig prenumerationsavgift 1999, vilket utmanade Blockbusters modell med pris per uthyrning. Netflix lanserade streamingvideo i januari 2007, initialt som ett komplement till sin DVD-tjänst. Prenumeranter kunde titta på ett begränsat urval av filmer och tv-program direkt på sina datorer utan att vänta på att skivorna skulle anlända.\n\nÖvergången från DVD-skivor till streaming accelererade under 2010-talet i takt med att internethastigheterna förbättrades och innehållsbiblioteken utökades. Netflix började producera originalprogrammering med premiären av House of Cards i februari 2013, som fick kritikerros och visade att streamingplattformar kunde konkurrera med traditionella nätverk om talang och kvalitet. Företaget investerade kraftigt i originalinnehåll och spenderade över 17 miljarder dollar årligen på programmering år 2022.\n\nSpotify revolutionerade musikstreaming efter att de svenska grundarna Daniel Ek och Martin Lorentzon lanserade tjänsten i oktober 2008. Plattformen erbjöd både gratis reklamstödd lyssning och premiumabonnemang utan reklam. Spotify förhandlade fram licensavtal med stora skivbolag trots initialt motstånd från en industri som fortfarande återhämtade sig från piratkopieringens förödande inverkan. I december 2023 rapporterade Spotify 602 miljoner månatliga aktiva användare och över 236 miljoner betalande prenumeranter.\n\nAmazon Prime Video växte fram ur Amazons förvärv 2006 av videotjänsten som blev Amazon Unbox. Företaget paketerade streamingvideo med Prime-medlemskap med start i februari 2011, vilket ökade värdet på prenumerationen som tidigare bara erbjöd snabbare leverans. Amazon började producera originalinnehåll 2013 och har sedan dess vunnit Emmy Awards och Academy Awards för sina produktioner. Kombinationen av videostreaming med shoppingförmåner skapar unika konkurrensfördelar.\n\nDisney lanserade Disney Plus den 12 november 2019 och utnyttjade sitt stora innehållsbibliotek inklusive Marvel-, Star Wars-, Pixar- och National Geographic-egendomar. Tjänsten lockade 10 miljoner prenumeranter under sin första dag, vilket demonstrerade kraften i älskade franchises och aggressiv prissättning. Disney Plus nådde över 160 miljoner prenumeranter inom fyra år, även om företaget stod inför press att uppnå lönsamhet efter initiala förluster från tunga innehållsinvesteringar.\n\nLivestreaming har expanderat bortom underhållning till att omfatta spel, utbildning, fitness och otaliga andra områden. Twitch, grundat 2011 och förvärvat av Amazon för 970 miljoner dollar 2014, populariserade livestreaming av videospel. Professionella spelare sänder till miljontals tittare samtidigt som de tjänar pengar genom prenumerationer och donationer. Plattformen hade i genomsnitt över 31 miljoner dagliga besökare år 2023, vilket konkurrerar med traditionella sportsändningar för unga publiker.\n\nTekniska innovationer fortsätter att förbättra streamingkvaliteten och effektiviteten. Adaptiv bitrate-streaming justerar automatiskt videokvaliteten baserat på tillgänglig bandbredd, vilket förhindrar buffring samtidigt som upplösningen maximeras när anslutningarna tillåter. Content delivery networks placerar servrar geografiskt nära tittarna, vilket minskar latensen och förbättrar tillförlitligheten. Codec-förbättringar inklusive H.265 och AV1 levererar högre kvalitet vid lägre bitrates, vilket möjliggör 4K- och 8K-streaming även på begränsade anslutningar.\n\nInfrastrukturen som stöder streamingtjänster kräver massiva investeringar i datacenter och nätverkskapacitet. Netflix innehållsleverans använder servrar placerade inom internetleverantörers nätverk, vilket lagrar kopior av populära titlar lokalt för att minska långväga dataöverföringar. Under kvällens rusningstimmar står streamingvideo för över 60 procent av internettrafiken i Nordamerika. Denna koncentration har utlöst debatter om nätneutralitet och om streamingtjänster ska betala för prioriterad leverans.\n\nMusikstreaming har fundamentalt förändrat hur artister tjänar inkomst och hur skivbolag fungerar. Spotify betalar artister cirka 0,03 till 0,05 kronor per strömning, vilket kräver miljontals spelningar för att generera meningsfulla intäkter. Denna modell gynnar artister med stora, engagerade följare samtidigt som det gör det svårare för framväxande musiker att upprätthålla karriärer. Taylor Swift tog berömt bort sin musik från Spotify från 2014 till 2017 och protesterade mot streamings ekonomiska villkor innan hon så småningom återvände.\n\nPodcaststreaming har exploderat från ett nischmedium till en stor innehållskategori som lockar miljarder i investeringar. Spotify förvärvade podcastföretagen Gimlet Media och Anchor i februari 2019 för cirka 340 miljoner dollar kombinerat. Apple, som populariserade podcasts genom iTunes-integration med start 2005, står inför ökad konkurrens från Spotify och Amazon. Över 2 miljoner podcasts med mer än 48 miljoner avsnitt fanns år 2023.\n\nStreamingkrigen har intensifierats i takt med att traditionella medieföretag lanserar konkurrerande tjänster. HBO Max, Paramount Plus, Peacock och Apple TV Plus kom alla in på marknaden mellan 2019 och 2020. Denna fragmentering tvingar konsumenter att prenumerera på flera tjänster för att få tillgång till allt önskat innehåll, vilket ironiskt nog återskapar några av de olägenheter med kabel-tv-paket som streaming initialt lovade att eliminera. Branschanalytiker förutspår konsolidering eftersom mindre tjänster kämpar för att konkurrera.\n\nInternationell expansion innebär både möjligheter och utmaningar för streamingplattformar. Netflix verkar i över 190 länder och producerar innehåll på dussintals språk. Den koreanska serien Squid Game blev Netflix mest sedda program någonsin i september 2021, vilket demonstrerade global aptit på icke-engelskt innehåll. Lokala konkurrenter inklusive Hotstar i Indien, iQiyi i Kina och Globoplay i Brasilien behåller starka positioner på sina hemmamarknader.\n\nRegulatoriska problem kring streamingtjänster mångdubblas när de blir dominerande underhållningsplattformar. Frågor om dataskydd, innehållsmoderering, arbetsmetoder och marknadskoncentration uppmärksammas av beslutsfattare. Europeiska unionen kräver att streamingtjänster säkerställer att 30 procent av deras kataloger består av europeiska verk. Vissa länder tar ut skatter på streamingabonnemang för att finansiera lokal innehållsproduktion.\n\nFramtiden för streaming pekar mot större interaktivitet, fördjupning och personalisering. Molnspelstjänster från Microsoft, Sony och andra streamar videospel utan att kräva dyr hårdvara. Virtual reality-upplevelser kan så småningom streamas till lätta headset. Artificiell intelligens-algoritmer kommer att fortsätta att förfina rekommendationer och potentiellt generera personligt innehåll. Oavsett vilka specifika teknologier som dyker upp har streaming permanent förändrat relationen mellan skapare och publik världen över.",
    "wordCount": 1247,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "När lanserade Netflix sin streamingvideotjänst?",
        "options": [
          "Januari 2005",
          "Januari 2007",
          "Januari 2009",
          "Januari 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Vilka företag grundade stora streamingplattformar? Välj alla som stämmer.",
        "options": [
          "Chad Hurley var med och grundade YouTube",
          "Reed Hastings var med och grundade Netflix",
          "Daniel Ek var med och grundade Spotify",
          "Bill Gates grundade Disney Plus"
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
        "question": "Google förvärvade YouTube för 1,65 miljarder dollar i oktober 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Hur många miljoner prenumeranter rapporterade Spotify som betalande prenumeranter i december 2023?",
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
        "question": "När laddades den första YouTube-videon upp?",
        "options": [
          "14 februari 2005",
          "23 april 2005",
          "4 juli 2005",
          "9 oktober 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Hur många prenumeranter lockade Disney Plus på sin första dag?",
        "options": [
          "1 miljon",
          "5 miljoner",
          "10 miljoner",
          "20 miljoner"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Hur mycket betalade Amazon för att förvärva Twitch 2014 (i miljoner dollar)?",
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
        "question": "Netflix började som en DVD-uthyrning via post 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Vilken Netflix originalserie släpptes i februari 2013?",
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
        "question": "Vilken procentandel av internettrafiken i Nordamerika står streamingvideo för under rusningstid?",
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
        "question": "Vilken koreansk serie blev Netflix mest sedda program någonsin i september 2021?",
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
    "title": "Sökmotorernas vetenskap",
    "content": "Sökmotorer har blivit de främsta portarna genom vilka mänskligheten får tillgång till den enorma informationsbanken på internet. De hanterar miljarder sökningar dagligen och formar hur människor upptäcker, utvärderar och förstår världen omkring dem. De sofistikerade algoritmerna som driver dessa system representerar några av de mest komplexa programvaror som någonsin utvecklats, och kombinerar tekniker från informationsåtervinning, naturlig språkbehandling, maskininlärning och distribuerad databehandling. Att förstå hur sökmotorer fungerar avslöjar både deras anmärkningsvärda förmågor och deras djupgående inflytande på mänsklig kunskap och beteende.\n\nUrsprunget till webbsökning kan spåras tillbaka till början av 1990-talet då internet växte sig för stort för manuellt sammanställda kataloger. Archie, skapad av Alan Emtage vid McGill University i Montreal 1990, indexerade filnamn på FTP-servrar men sökte inte på webbsidor. World Wide Web Wanderer, utvecklad av Matthew Gray vid MIT 1993, blev den första webbcrawlern som mätte internets tillväxt genom att besöka sidor automatiskt. Dessa primitiva verktyg lade grunden för mer sofistikerade system.\n\nAltaVista lanserades i december 1995 och blev snabbt den ledande sökmotorn under sin tid. AltaVista, utvecklad av forskare vid Digital Equipment Corporation i Palo Alto, Kalifornien, kunde söka i en databas med 20 miljoner webbsidor med hjälp av fulltextindexering. Användarna förundrades över att resultaten dök upp inom några sekunder för sökningar i miljontals dokument. Under sin topp 1997 hanterade AltaVista 80 miljoner sökningar per dag.\n\nLarry Page och Sergey Brin skapade Google som ett forskningsprojekt vid Stanford University 1996, och introducerade PageRank-algoritmen som skulle transformera sökningen. Deras insikt var att länkar mellan webbsidor innehöll värdefull information om relevans och auktoritet. En sida som länkats av många andra sidor, särskilt viktiga sidor, borde rankas högre än en med få länkar. Detta tillvägagångssätt gav dramatiskt bättre resultat än konkurrenter som rankade sidor främst efter nyckelordsfrekvens.\n\nPageRank simulerar en slumpmässig webbsurfare som klickar på länkar slumpmässigt och ibland hoppar till en helt slumpmässig sida. Sannolikheten att denna hypotetiska surfare besöker en viss sida blir dess PageRank-poäng. Sidor som får många länkar från sidor med hög PageRank ackumulerar själva högre poäng. Denna matematiska modell, detaljerad i Page och Brins 1998-uppsats som publicerades medan de var doktorander, är fortfarande grundläggande för Googles ranking trots många efterföljande förfiningar.\n\nWebbcrawlingsprocessen börjar med en lista över kända webbadresser som automatiserade program som kallas spindlar eller crawlers besöker. Crawlern laddar ner varje sidas innehåll och extraherar alla hyperlänkar den innehåller. Nya webbadresser läggs till i kön för framtida crawling. Googles crawler, ursprungligen kallad BackRub och senare Googlebot, besöker miljarder sidor kontinuerligt och prioriterar ofta uppdaterade webbplatser och de med många inkommande länkar. En fullständig crawlning av webben tar veckor, även om populära sidor crawlras om mycket oftare.\n\nIndexering omvandlar rått webbsideinnehåll till strukturerad data som möjliggör snabb hämtning. Sökmotorer bygger inverterade index som mappar varje ord till listan över dokument som innehåller det. När du söker efter en term söker motorn i den termens \"posting list\" istället för att skanna varje dokument. Ytterligare datastrukturer lagrar information om ordpositioner för frasmatchning, ankartext från inkommande länkar och metadata som sidtitlar och ändringsdatum.\n\nSökfrågebehandling tolkar vad användare faktiskt vill ha när de skriver in söktermer. Naturlig språkförståelse hjälper sökmotorer att inse att en sökning efter löparskor sannolikt söker produkter snarare än information om skor som löper. Entitetsigenkänning identifierar sökningar efter personer, platser, organisationer och koncept. Sökfrågeexpansion lägger till synonymer och relaterade termer för att förbättra återkallelsen. Stavningskorrigering fixar stavfel innan sökningar körs, och Google korrigerar cirka 10 procent av alla sökfrågor.\n\nRankningsalgoritmer kombinerar hundratals signaler för att avgöra vilka sidor som bäst svarar på varje sökfråga. Utöver PageRank tar Google hänsyn till faktorer som nyckelordsnärvaro i titlar och rubriker, innehållsfärskhet, mobilvänlighet, sidladdningshastighet och geografisk relevans. Maskininlärningsmodeller tränade på enorma datamängder av användarbeteende har till stor del ersatt handgjorda rankningsformler. RankBrain, introducerad 2015, använder neurala nätverk för att tolka tvetydiga sökfrågor och identifiera relevanta resultat.\n\nAnvändarbeteende ger viktig återkoppling som sökmotorer använder för att förbättra rankningen. Klickfrekvenser indikerar vilka resultat användare tycker är lovande. Tid som spenderas på sidor efter att ha klickat antyder om resultaten tillfredsställde sökfrågan. Mönstret att återvända till sökresultat och klicka på olika länkar, kallat pogo-sticking, indikerar att initiala resultat var ohjälpsamma. Sökmotorer analyserar miljarder sådana signaler dagligen för att förfina sina algoritmer.\n\nKunskapsgrafer representerar information om entiteter och deras relationer i strukturerade databaser. Googles Knowledge Graph, introducerad i maj 2012, innehåller miljarder fakta om människor, platser, saker och koncept. När du söker efter en berömd person hämtar kunskapsrutan som visas bredvid resultaten data från denna strukturerade data. Wikidata, en samarbetsbaserad kunskapsbas som drivs av Wikimedia Foundation, bidrar väsentligt till dessa system.\n\nUtvalda utdrag och direkta svar syftar till att tillfredsställa sökfrågor utan att kräva att användare klickar sig vidare till webbplatser. Google extraherar relevanta passager från webbsidor och visar dem tydligt för frågor. Röstassistenter är starkt beroende av dessa direkta svar eftersom användare inte kan klicka på länkar på ljudenheter. Utgivare debatterar om utvalda utdrag hjälper genom att generera trafik eller skadar genom att minska den, och vissa väljer bort utdrag helt och hållet.\n\nLokal sökning kopplar sökfrågor till närliggande företag och tjänster. När någon söker efter kaféer eller rörmokare integrerar sökmotorn deras plats för att visa relevanta lokala alternativ. Google Företagsprofil låter företag tillhandahålla information direkt. Recensioner sammanställda från olika källor hjälper användare att välja mellan alternativ. Lokal sökning genererar betydande intäkter genom reklam, där företag betalar för att synas tydligt för kommersiella sökfrågor.\n\nSökannonsering förvandlade Google till ett av världens mest värdefulla företag. Annonsörer budar på nyckelord och betalar bara när användare klickar på deras annonser. Googles auktionssystem tar hänsyn till både budbelopp och annonskvalitet för att avgöra vilka annonser som visas och i vilken ordning. Sökannonsering genererade över 162 miljarder dollar i intäkter för Googles moderbolag Alphabet år 2022. Denna affärsmodell skapar incitament för att maximera användarnas engagemang i sökresultat.\n\nSpam och manipulation har plågat sökmotorer sedan deras tidigaste dagar. Skrupelfria webbplatsoperatörer fyller sidor med dolda nyckelord, skapar nätverk av konstgjorda länkar och använder otaliga andra taktiker för att manipulera rankningen. Sökmotorer deltar i kontinuerliga kapprustningar mot sådan manipulation. Googles Penguin-uppdatering i april 2012 straffade webbplatser med onaturliga länkmnster. Företaget anställer tusentals kvalitetsbedömare som utvärderar sökresultat enligt detaljerade riktlinjer.\n\nIntegritetsfrågor omger de enorma data som sökmotorer samlar in om användares sökfrågor och beteende. Sökhistoriker avslöjar hälsoproblem, ekonomiska situationer, relationsproblem och otaliga andra intima detaljer. Google behåller som standard sökdata kopplade till konton och använder den för personalisering och annonsinriktning. Alternativ som DuckDuckGo differentierar sig genom att lova att inte spåra användare, även om de offrar vissa personaliseringsmöjligheter.\n\nKonkurrensen inom sökning har förblivit begränsad trots regulatorisk granskning över hela världen. Google innehar cirka 91 procent av den globala sökmarknadsandelen enligt StatCounter-data från 2023. Bing, Microsofts sökmotor, hävdar cirka 3 procent globalt men presterar bättre i USA. Regionala alternativ inklusive Baidu i Kina och Yandex i Ryssland dominerar sina hemmamarknader. Europeiska unionen bötfällde Google 2,42 miljarder euro i juni 2017 för att gynna sin egen tjänst för prisjämförelse i sökresultat.\n\nArtificiell intelligens transformerar sökning genom stora språkmodeller som förstår och genererar naturligt språk. ChatGPT:s lansering i november 2022 väckte oro för att konversations-AI skulle kunna störa traditionell sökning. Microsoft integrerade GPT-4 i Bing i februari 2023. Google svarade med Bard och därefter Gemini. Dessa system kan syntetisera information från flera källor och delta i dialog, vilket potentiellt förändrar hur människor hittar information online.\n\nFramtiden för sökning sträcker sig bortom textsökningar till bilder, röst och multimodala inmatningar. Google Lens tillåter sökning med hjälp av smartphonekameror, identifiering av objekt, översättning av text och lösning av matematiska problem från bilder. Röstsökning via smarta högtalare och smartphones står för en växande andel av sökfrågorna. Sökmotorer måste anpassa sig till nya enheter och interaktionsmönster samtidigt som de bibehåller den hastighet och noggrannhet som användarna förväntar sig.",
    "wordCount": 1267,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Vem skapade den första webbcrawlern som kallades World Wide Web Wanderer 1993?",
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
        "question": "Vilka faktorer tar sökmotorer hänsyn till när de rankar sidor? Välj alla som stämmer.",
        "options": [
          "PageRank-länk analys",
          "Färskt innehåll",
          "Sidans laddningshastighet",
          "Endast filstorlek"
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
        "question": "AltaVista behandlade 80 miljoner sökfrågor per dag under sin topp 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Vilken procentandel av den globala sökmarknaden har Google enligt data från 2023?",
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
        "question": "När introducerades Googles Knowledge Graph?",
        "options": [
          "Maj 2010",
          "Maj 2012",
          "Maj 2014",
          "Maj 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "När straffade Googles Penguin-uppdatering webbplatser med onaturliga länkmnster?",
        "options": [
          "April 2010",
          "April 2012",
          "April 2014",
          "April 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Hur mycket intäkter genererade sökannonsering för Alphabet under 2022 (i miljarder dollar)?",
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
        "question": "Google korrigerar cirka 10 procent av alla sökfrågor för stavfel.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "När integrerade Microsoft GPT-4 i Bing?",
        "options": [
          "November 2022",
          "Februari 2023",
          "Juni 2023",
          "Oktober 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Hur mycket böter fick Google av Europeiska Unionen i juni 2017 (i miljarder euro)?",
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
        "question": "När introducerades RankBrain av Google?",
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
        "question": "När lanserades AltaVista?",
        "options": [
          "December 1993",
          "December 1995",
          "December 1997",
          "December 1999"
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
    "title": "Autonoma fordon och framtidens transporter",
    "content": "Autonoma fordon lovar att revolutionera transportsektorn med självkörande teknik som kan minska antalet olyckor, förändra stadslandskap och i grunden förändra hur mänskligheten transporterar människor och varor över både korta och långa avstånd. Denna ambitiösa vision har lockat hundratals miljarder dollar i investeringar från biltillverkare, teknikjättar och startups som tävlar om att lösa de enorma tekniska, regulatoriska och sociala utmaningarna. Resan mot verkligt autonoma fordon avslöjar det nuvarande läget för denna transformativa teknik och de hinder som kvarstår innan självkörande bilar blir vardagsmat.\n\nDrömmen om självkörande fordon föregår själva den digitala datorn. Norman Bel Geddes presenterade Futurama-utställningen på världsutställningen i New York 1939 och skildrade automatiserade motorvägar där bilar skulle färdas säkert utan mänsklig inblandning fram till 1960-talet. General Motors, som sponsrade utställningen, samarbetade senare med RCA för att utveckla konceptbilen Firebird IV 1964, med elektroniska styrsystem som kunde följa kablar inbäddade i vägbanan. Dessa tidiga visioner krävde infrastrukturförändringar snarare än fordonsintelligens.\n\nModern utveckling av autonoma fordon började med DARPA Grand Challenge-tävlingar som katalyserade akademisk forskning och forskning inom industrin från och med 2004. Den första utmaningen, som hölls i Mojaveöknen, erbjöd en miljon dollar till alla fordon som kunde genomföra en 24 mil lång bana utan mänsklig inblandning. Alla deltagare misslyckades, med det fordon som kom längst och som bara färdades 12 kilometer innan det fastnade. Utmaningen 2005 såg fem fordon klara banan, där Stanford Universitys Stanley vann på 6 timmar och 53 minuter.\n\nSociety of Automotive Engineers definierar sex nivåer av körautomatisering som har blivit branschstandard. Nivå 0 innebär ingen automatisering, där människor kontrollerar alla köruppgifter. Nivå 1 inkluderar grundläggande assistans som adaptiv farthållare. Nivå 2 kombinerar flera assistansfunktioner men kräver konstant mänsklig övervakning. Nivå 3 tillåter fordonet att hantera all körning under begränsade förhållanden medan människor är redo att ingripa. Nivå 4 uppnår fullständig automatisering inom definierade operativa områden. Nivå 5 innebär fullständig automatisering under alla förhållanden, vilket matchar eller överträffar mänsklig förmåga överallt.\n\nSensorsystem förser autonoma fordon med de perceptionsförmågor som krävs för säker navigering. Kameror fångar visuell information om körfält, skyltar, trafikljus och andra trafikanter. Radar mäter hastigheten och avståndet till närliggande föremål genom radiovågor som fungerar oavsett belysning eller väder. Lidar använder laserpulser för att skapa detaljerade tredimensionella kartor över miljön, där vissa system genererar över två miljoner datapunkter per sekund. Ultraljudssensorer upptäcker hinder på nära håll under parkeringsmanövrar.\n\nWaymo, det autonoma fordonsdotterbolaget till Alphabet, växte fram ur Googles självkörande bilprojekt som började 2009. Sebastian Thrun, som ledde Stanfords vinnande DARPA-team, ledde den initiala forskningen. Projektet samlade på sig miljontals testkilometer i flera delstater innan Waymo lanserade kommersiell robotaxiverksamhet i Phoenix, Arizona, i december 2018. I oktober 2023 hade Waymos fordon kört över 11 miljoner kilometer på allmänna vägar utan säkerhetsförare, främst i Phoenix och San Francisco.\n\nTesla har följt en annan strategi för autonomi genom sina Autopilot- och Full Self-Driving-system. Istället för dyr lidar förlitar sig Tesla på kameror och datorseende tränade på data från miljontals kundfordon. VD Elon Musk förutspådde upprepade gånger fullständig autonomi, och hävdade 2016 att en Tesla skulle köra sig själv från Los Angeles till New York år 2017. Denna förutsägelse och många efterföljande har inte realiserats, men Tesla-fordon erbjuder alltmer kapabla förarassistansfunktioner.\n\nCruise, som ägs till majoriteten av General Motors, drev robotaxiverksamhet i San Francisco tills California Department of Motor Vehicles återkallade sina tillstånd i oktober 2023 efter en incident där ett fordon träffade och släpade en fotgängare. Företaget hade expanderat aggressivt och drivit hundratals fordon i flera städer. Återkallandet av tillståndet belyste de regulatoriska utmaningar som branschen står inför och svårigheten att säkerställa säkerhet i stor skala.\n\nKinesiska företag har framträtt som stora aktörer inom utvecklingen av autonoma fordon. Baidus Apollo-plattform påbörjades 2017 och har ackumulerat över 100 miljoner kilometer vägtester. Pony.ai, som grundades 2016, driver robotaxiverksamhet i flera kinesiska städer och Kalifornien. WeRide har samarbetat med Nissan och etablerat verksamhet i Mellanöstern. Kinesiska städer inklusive Wuhan, Guangzhou och Shenzhen har tillåtit kommersiell robotaxiverksamhet som täcker betydande stadsområden.\n\nDe artificiella intelligenssystemen som driver autonoma fordon måste hantera extraordinär komplexitet. Datorseendealgoritmer identifierar och klassificerar tusentals objekttyper från fotgängare och cyklister till byggzoner och räddningsfordon. Prediktionsmodeller förutser hur andra trafikanter kommer att bete sig under de närmaste sekunderna. Planeringsalgoritmer väljer banor som når destinationerna säkert och effektivt. Alla dessa beräkningar måste utföras på millisekunder samtidigt som man tar hänsyn till osäkerhet och sällsynta scenarier.\n\nGränsfall utgör särskilda utmaningar för autonoma system. En plastpåse som blåser över en motorväg och ett barn som springer ut på gatan kan verka likartade för sensorer men kräver helt olika reaktioner. Byggnadsarbetare som dirigerar trafik med handgester åsidosätter normala trafikregler. Räddningsfordon som närmar sig från skymda vinklar kräver omedelbar åtgärd. Träningsdata kan omöjligt täcka alla scenarier, vilket kräver att fordon generaliserar på lämpligt sätt från liknande erfarenheter.\n\nSäkerhetsvalidering väcker grundläggande frågor om hur man ska demonstrera att autonoma fordon är redo för driftsättning. Mänskliga förare råkar i genomsnitt ut för en dödlig krasch per 160 miljoner kilometer som körs i USA. Att statistiskt bevisa att ett autonomt system uppfyller eller överträffar detta riktmärke skulle kräva miljarder testkilometer, en opraktisk standard. Istället använder företag simulering, testning på sluten bana och gradvis driftsättning samtidigt som de kontinuerligt övervakar prestanda i verkligheten.\n\nRegelverk för autonoma fordon varierar dramatiskt mellan jurisdiktioner. Kalifornien kräver att företag rapporterar frikopplingar när mänskliga säkerhetsförare tar kontroll. Arizona antog ett tillåtande tillvägagångssätt som lockade testaktivitet. Tyskland antog lagstiftning 2021 som tillåter fordon på nivå 4 på allmänna vägar under specifika förhållanden. Kina har utsett vissa städer som testzoner med gradvis utökade operativa domäner. Detta lapptäcke av regler komplicerar internationella driftsättningsstrategier.\n\nDe potentiella fördelarna med autonoma fordon sträcker sig långt bortom bekvämlighet. Fordonskrascher dödar cirka 1,35 miljoner människor över hela världen årligen, där mänskliga misstag bidrar till över 90 procent av olyckorna. Autonoma system blir inte distraherade, trötta eller påverkade. De skulle dramatiskt kunna minska denna siffra om deras säkerhetsprestanda överträffar mänskliga förare. Transporter skulle bli tillgängliga för äldre, funktionshindrade och unga populationer som för närvarande inte kan köra själva.\n\nEkonomiska konsekvenser av autonoma transporter skulle kunna omforma hela branscher. Professionella förare inklusive lastbilschaufförer, taxioperatörer och leveransarbetare står inför potentiell undanträngning. Samåkningsföretag som Uber och Lyft investerar kraftigt i autonomi i hopp om att eliminera sin största kostnad. Försäkringsmodeller måste anpassas när mänskliga förare inte längre kontrollerar fordon. Stadsplanerare föreställer sig städer med färre parkeringsplatser och smalare vägar eftersom delade autonoma fordon minskar det totala antalet fordon.\n\nLastbilstillämpningar kan uppnå kommersiell lönsamhet före passagerarrobotaxis på grund av mer förutsägbara motorvägsmiljöer. Aurora, som grundades av tidigare ledare från Googles, Teslas och Ubers autonoma program, fokuserar främst på frakt. TuSimple genomförde helt autonoma motorvägskörningar mellan Phoenix och Dallas innan ekonomiska svårigheter tvingade fram en strategisk omstrukturering 2023. Embark, Kodiak och många andra företag bedriver liknande långväga lastbilstillämpningar.\n\nTidslinjen för utbredd användning av autonoma fordon förblir mycket osäker trots årtionden av utveckling och massiva investeringar. Optimistiska prognoser från mitten av 2010-talet förutspådde allestädes närvarande robotaxis i början av 2020-talet. Verkligheten har visat sig vara långt mer utmanande än väntat. Branschexperter förväntar sig nu generellt en gradvis driftsättning under decennier snarare än en plötslig omvandling. Tekniken kommer sannolikt att förbättras inkrementellt och expandera från begränsade operativa domäner mot bredare kapacitet under många år.",
    "wordCount": 1184,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "När hölls den första DARPA Grand Challenge?",
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
        "question": "Vilka typer av sensorer använder autonoma fordon? Välj alla som stämmer.",
        "options": [
          "Kameror",
          "Radar",
          "Lidar",
          "Röntgensensorer"
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
        "question": "Stanford Universitys fordon vid namn Stanley vann 2005 års DARPA Grand Challenge.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Hur många miles hade Waymos fordon kört utan säkerhetsförare i oktober 2023 (i miljoner)?",
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
        "question": "När lanserade Waymo kommersiell robotaxi-service i Phoenix?",
        "options": [
          "December 2016",
          "December 2018",
          "December 2020",
          "December 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Hur många nivåer av fordonsautomation definierar Society of Automotive Engineers?",
        "options": [
          "Fyra",
          "Fem",
          "Sex",
          "Sju"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Hur många människor dör årligen i fordonskrascher världen över (i miljoner)?",
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
        "question": "Mänskliga misstag bidrar till över 90 procent av alla fordonsolyckor.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "När antog Tyskland lagstiftning som tillåter nivå 4-fordon på allmänna vägar?",
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
        "question": "Hur många miles färdades det fordon som kom längst i 2004 års DARPA Grand Challenge?",
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
        "question": "När började Baidus Apollo-plattform för autonom körning att utvecklas?",
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
        "question": "När var Futurama-utställningen på världsutställningen?",
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
        "question": "Hur många datapunkter per sekund kan vissa lidarsystem generera (i miljoner)?",
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
        "question": "När återkallade California DMV Cruises tillstånd för autonoma fordon?",
        "options": [
          "Oktober 2022",
          "Oktober 2023",
          "Januari 2023",
          "Juni 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
