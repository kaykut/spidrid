import { Article } from '../../../types/learning';

export const HEALTH_MEDICINE_ARTICLES: Article[] = [
  {
    id: 'health-medicine-p01',
    topicId: 'health-medicine',
    title: 'Jak działają szczepionki',
    difficulty: 'beginner',
    wordCount: 500,
    articleType: 'practice',
    orderIndex: 1,
    content: `Szczepionki trenują twój układ odpornościowy, aby rozpoznawać i zwalczać określone patogeny, zanim spowodują poważną chorobę. Zawierają osłabione lub nieaktywne fragmenty wirusa lub bakterii, które nie mogą wywołać choroby, ale wywołują ochronną odpowiedź immunologiczną. Twoje ciało produkuje przeciwciała i komórki pamięci, które pamiętają patogena przez lata.

Gdy otrzymujesz szczepionkę, wyspecjalizowane komórki zwane komórkami prezentującymi antygeny natychmiast wykrywają obcy materiał. Te komórki przetwarzają składniki szczepionki i wyświetlają fragmenty na swojej powierzchni, aby inne komórki odpornościowe mogły je zbadać. Komórki T pomocnicze rozpoznają te fragmenty i aktywują komórki B, które produkują przeciwciała specyficzne dla tego patogena.

Koncepcja uodpornienia sięga 1796 roku, kiedy Edward Jenner opracował pierwszą szczepionkę przeciwko ospie w Anglii. Zauważył, że dojarki, które zaraziły się krowianką, wydawały się chronione przed bardziej śmiertelną ospą prawdziwą. Jego eksperyment na ośmioletnim chłopcu imieniem James Phipps udowodnił, że kontakt z krowianką zapewniał odporność.

Niektóre komórki B stają się komórkami plazmatycznymi, które natychmiast po szczepieniu produkują duże ilości przeciwciał. Inne stają się komórkami pamięci B, które utrzymują się w organizmie przez lata, a nawet dziesięciolecia. Gdy pojawia się prawdziwy patogen, te komórki pamięci rozpoznają go i szybko się namnażają, aby wyprodukować przeciwciała.

Różne szczepionki stosują różne podejścia do wytwarzania odporności. Żywe osłabione szczepionki zawierają osłabione formy patogena, które mogą się replikować, ale nie wywołują choroby. Szczepionki inaktywowane wykorzystują zabite patogeny, które w ogóle nie mogą się replikować. Szczepionki podjednostkowe zawierają tylko określone białka z powierzchni patogena.

Niedawno szczepionki mRNA pojawiły się jako potężna nowa technologia. Te szczepionki dostarczają instrukcje genetyczne, które uczą twoje komórki wytwarzać nieszkodliwy fragment patogena, wywołując odpowiedź immunologiczną. Pierwsze szczepionki mRNA otrzymały zatwierdzenie w grudniu 2020 roku podczas pandemii COVID-19 po niezwykle szybkim rozwoju.

Szczepionki całkowicie wyeliminowały ospę i niemal wyeliminowały polio z całego świata. Dramatycznie zmniejszyły zgony z powodu odry, błonicy, tężca i wielu innych chorób, które kiedyś zabijały miliony osób rocznie. Światowa Organizacja Zdrowia szacuje, że szczepionki zapobiegają 4 do 5 milionom zgonów rocznie na całym świecie.

Współczesne badania nad szczepionkami nadal rozwijają się dzięki nowym platformom i metodom dostarczania. Naukowcy z instytucji takich jak Uniwersytet Oksfordzki i Narodowe Instytuty Zdrowia pracują nad opracowaniem szczepionek przeciwko chorobom, które wciąż nie mają leczenia zapobiegawczego. Szczepionki pozostają jedną z najbardziej opłacalnych interwencji zdrowia publicznego, jakie kiedykolwiek opracowano.`,
    questions: [
      {
        id: 'health-medicine-p01-q1',
        type: 'single_choice',
        question: 'Kto opracował pierwszą szczepionkę przeciwko ospie?',
        options: ['Louis Pasteur', 'Edward Jenner', 'Alexander Fleming', 'Jonas Salk'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p01-q2',
        type: 'multiple_select',
        question: 'Które rodzaje szczepionek są wymienione w artykule? Wybierz wszystkie pasujące.',
        options: ['Żywe osłabione szczepionki', 'Szczepionki mRNA', 'Szczepionki DNA', 'Szczepionki inaktywowane'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p01-q3',
        type: 'true_false',
        question: 'Komórki pamięci B mogą utrzymywać się w organizmie przez lata, a nawet dziesięciolecia.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p01-q4',
        type: 'numeric',
        question: 'W którym roku Edward Jenner opracował pierwszą szczepionkę?',
        correctValue: 1796,
        tolerance: 0,
        min: 1700,
        max: 1900,
        step: 1,
        unit: 'rok',
      },
    ],
  },
  {
    id: 'health-medicine-p02',
    topicId: 'health-medicine',
    title: 'Ludzki mózg: centrum dowodzenia organizmu',
    difficulty: 'beginner',
    wordCount: 750,
    articleType: 'practice',
    orderIndex: 2,
    content: `Ludzki mózg waży około trzech funtów i zawiera mniej więcej 86 miliardów neuronów połączonych bilionami synaps. Ten niezwykły narząd kontroluje każdą myśl, ruch, wrażenie i emocję, których doświadczasz. Zrozumienie, jak działa mózg, stało się jedną z najważniejszych granic medycyny.

Mózg składa się z trzech głównych regionów, które działają razem bezproblemowo. Mózg właściwy, największa część, obsługuje świadomą myśl, uczenie się, pamięć i ruchy dobrowolne. Móżdżek z tyłu czaszki koordynuje równowagę, postawę i precyzyjną kontrolę motoryczną. Pień mózgu łączy mózg z rdzeniem kręgowym i reguluje podstawowe funkcje, takie jak oddychanie, tętno i sen.

Mózg właściwy jest podzielony na dwie półkule połączone grubym pęczkiem włókien nerwowych zwanym spoidłem wielkim. Każda półkula kontroluje przeciwną stronę ciała, więc lewa półkula kontroluje prawą rękę i odwrotnie. Podczas gdy obie półkule dzielą większość funkcji, lewa strona zazwyczaj dominuje w przetwarzaniu języka u większości osób praworęcznych.

Kora mózgowa, pomarszczona zewnętrzna warstwa mózgu, ma tylko około 3 milimetry grubości, ale zawiera większość naszych neuronów. Jej fałdy dramatycznie zwiększają powierzchnię, pozwalając na większą moc obliczeniową w obrębie czaszki. Różne regiony kory specjalizują się w różnych funkcjach, od przetwarzania informacji wizualnych po planowanie złożonych działań.

Neurony komunikują się poprzez impulsy elektryczne i sygnały chemiczne zwane neuroprzekaźnikami. Gdy neuron wyładowuje się, uwalnia neuroprzekaźniki przez maleńkie szczeliny zwane synapsami do sąsiednich neuronów. Ten proces zachodzi miliardy razy na sekundę w całym mózgu, tworząc wzorce aktywności, które produkują myśli i zachowania.

Santiago Ramon y Cajal, hiszpański naukowiec, dokonał przełomowych odkryć dotyczących struktury neuronów pod koniec 1800 roku. Opracował techniki barwienia, które ujawniły poszczególne neurony po raz pierwszy, udowadniając, że układ nerwowy składa się z odrębnych komórek, a nie z ciągłej sieci. Jego praca przyniosła mu Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 1906 roku.

Mózg zużywa około 20 procent energii ciała, mimo że stanowi tylko 2 procent masy ciała. Neurony wymagają stałych dostaw tlenu i glukozy, aby prawidłowo funkcjonować. Nawet krótkie przerwy w przepływie krwi mogą spowodować trwałe uszkodzenia, dlatego udary są nagłymi przypadkami medycznymi wymagającymi natychmiastowego leczenia.

Neuroplastyczność odnosi się do zdolności mózgu do reorganizacji poprzez tworzenie nowych połączeń neuronowych przez całe życie. Ta niezwykła zdolność pozwala ludziom uczyć się nowych umiejętności, wracać do zdrowia po urazach i dostosowywać się do zmieniających się okoliczności. Badania Michaela Merzenisza i innych naukowców w latach 80. wykazały, że mózgi dorosłych pozostają znacznie bardziej zmienne, niż wcześniej sądzono.

Sen odgrywa kluczową rolę w zdrowiu mózgu i funkcjach poznawczych. Podczas snu mózg konsoliduje wspomnienia, usuwa produkty odpadów metabolicznych i naprawia uszkodzenia komórkowe. Dorośli potrzebują od siedmiu do dziewięciu godzin snu na noc dla optymalnej funkcji mózgu. Przewlekły niedobór snu upośledza uwagę, podejmowanie decyzji i regulację emocjonalną.

Nowoczesne technologie obrazowania zrewolucjonizowały nasze zrozumienie mózgu. Funkcjonalny rezonans magnetyczny, opracowany na początku lat 90., pozwala naukowcom obserwować aktywność mózgu w czasie rzeczywistym, wykrywając zmiany w przepływie krwi. Ta technologia ujawniła, które regiony mózgu aktywują się podczas różnych zadań, od rozpoznawania twarzy po doświadczanie emocji.

Badacze z instytucji takich jak Narodowe Instytuty Zdrowia nadal rozwijają naszą wiedzę o zaburzeniach mózgu. Choroby takie jak choroba Alzheimera, choroba Parkinsona i depresja dotykają miliony ludzi na całym świecie. Zrozumienie neurologicznych podstaw tych stanów jest niezbędne do opracowania skutecznych metod leczenia, które mogłyby poprawić niezliczone życia.`,
    questions: [
      {
        id: 'health-medicine-p02-q1',
        type: 'single_choice',
        question: 'Która część mózgu koordynuje równowagę i precyzyjną kontrolę motoryczną?',
        options: ['Mózg właściwy', 'Móżdżek', 'Pień mózgu', 'Spoidło wielkie'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q2',
        type: 'single_choice',
        question: 'Kto odkrył, że układ nerwowy składa się z odrębnych komórek?',
        options: ['Michael Merzenich', 'Santiago Ramon y Cajal', 'Louis Pasteur', 'William Harvey'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q3',
        type: 'multiple_select',
        question: 'Co dzieje się podczas snu? Wybierz wszystkie pasujące.',
        options: ['Konsolidacja wspomnień', 'Usuwanie odpadów metabolicznych', 'Tworzenie nowych neuronów', 'Naprawa uszkodzeń komórkowych'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p02-q4',
        type: 'true_false',
        question: 'Mózg zużywa około 20 procent energii ciała.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p02-q5',
        type: 'numeric',
        question: 'Około ile neuronów zawiera ludzki mózg (w miliardach)?',
        correctValue: 86,
        tolerance: 10,
        min: 50,
        max: 150,
        step: 5,
        unit: 'miliardów neuronów',
      },
    ],
  },
  {
    id: 'health-medicine-p03',
    topicId: 'health-medicine',
    title: 'Układ odpornościowy: siły obronne twojego ciała',
    difficulty: 'beginner',
    wordCount: 1000,
    articleType: 'practice',
    orderIndex: 3,
    content: `Ludzki układ odpornościowy to złożona sieć komórek, tkanek i narządów, które chronią organizm przed szkodliwymi najeźdźcami. Każdego dnia twój układ odpornościowy identyfikuje i niszczy miliony bakterii, wirusów, grzybów i pasożytów, które mogłyby wywołać chorobę. Ten niezwykły system obronny ewoluował przez miliony lat, aby utrzymać cię w zdrowiu.

Układ odpornościowy działa poprzez dwie główne gałęzie, które współpracują w celu zapewnienia ochrony. Wrodzony układ odpornościowy zapewnia natychmiastową, niespecyficzną obronę przed patogenami. Nabyty układ odpornościowy rozwija ukierunkowane odpowiedzi na konkretne zagrożenia i zapamiętuje je na przyszłość. Oba systemy muszą funkcjonować prawidłowo, aby utrzymać zdrowie.

Bariery fizyczne stanowią pierwszą linię obrony przed infekcją. Skóra tworzy niemal nie do przebycia mur, którego większość patogenów nie może przekroczyć. Błony śluzowe w nosie, gardle i płucach wychwytują obce cząstki, zanim będą mogły wniknąć do organizmu. Kwas żołądkowy zabija wiele bakterii w skażonym pożywieniu, zanim będą mogły wyrządzić szkody.

Gdy patogeny przełamią te bariery, wrodzony układ odpornościowy reaguje w ciągu minut. Białe krwinki zwane neutrofilami spieszą do miejsca infekcji i pochłaniają najeźdźców poprzez proces zwany fagocytozą. Makrofagi, większe komórki patrolujące tkanki w całym organizmie, również pochłaniają patogeny i sygnalizują innym komórkom odpornościowym, aby dołączyły do walki.

Stan zapalny jest kluczową częścią wrodzonej odpowiedzi immunologicznej, która pomaga powstrzymać i wyeliminować infekcje. Naczynia krwionośne rozszerzają się, pozwalając większej liczbie komórek odpornościowych dotrzeć do dotkniętego obszaru. Znane oznaki stanu zapalnego obejmują zaczerwienienie, ciepło, obrzęk i ból. Chociaż nieprzyjemne, te objawy wskazują, że twój układ odpornościowy działa prawidłowo.

Nabyty układ odpornościowy aktywuje się dłużej, ale zapewnia wysoce specyficzne i potężne odpowiedzi. Komórki T i komórki B są głównymi żołnierzami odporności nabytej, każdy z odrębnych ról w zwalczaniu infekcji. Te komórki mogą rozpoznawać specyficzne patogeny i rozwijać ukierunkowane strategie ich eliminacji.

Komórki B produkują przeciwciała, wyspecjalizowane białka, które wiążą się z określonymi patogenami i oznaczają je do zniszczenia. Każda komórka B produkuje przeciwciała, które rozpoznają tylko jeden rodzaj obcej cząsteczki zwanej antygenem. Po aktywacji komórki B szybko się namnażają i produkują miliony przeciwciał, które krążą w krwiobiegu.

Komórki T występują w kilku odmianach o różnych funkcjach. Pomocnicze komórki T koordynują odpowiedzi immunologiczne, uwalniając sygnały chemiczne zwane cytokinami, które aktywują inne komórki odpornościowe. Cytotoksyczne komórki T bezpośrednio zabijają zainfekowane komórki, uwalniając toksyczne białka, które dziurawią błony komórkowe. Regulatorowe komórki T pomagają zapobiegać atakowi układu odpornościowego na zdrowe tkanki.

Paul Ehrlich, niemiecki naukowiec, zaproponował koncepcję przeciwciał w 1897 roku i opracował pierwsze skuteczne leczenie kiły. Jego praca nad immunologią przyniosła mu Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 1908 roku, którą podzielił z Ilją Miecznikowem, który odkrył fagocytozę. Ich odkrycia położyły fundamenty pod nowoczesną immunologię.

Pamięć immunologiczna pozwala nabytemu układowi odpornościowemu reagować szybciej i skuteczniej na wcześniej napotkane patogeny. Komórki pamięci B i komórki pamięci T utrzymują się w organizmie przez lata lub dziesięciolecia po infekcji. Gdy ten sam patogen pojawia się ponownie, te komórki aktywują się szybko i często w ogóle zapobiegają chorobie.

Choroby autoimmunologiczne występują, gdy układ odpornościowy błędnie atakuje zdrowe tkanki. Choroby takie jak reumatoidalne zapalenie stawów, cukrzyca typu 1 i stwardnienie rozsiane dotykają miliony ludzi na całym świecie. Choroby te często wynikają z połączenia genetycznej podatności i czynników środowiskowych, które powodują dysfunkcję immunologiczną.

Alergie stanowią inną formę niewłaściwego funkcjonowania układu odpornościowego, w którym organizm nadmiernie reaguje na nieszkodliwe substancje, takie jak pyłki, sierść zwierząt domowych lub określone produkty spożywcze. Podczas reakcji alergicznej komórki odpornościowe uwalniają histaminę i inne substancje chemiczne, które powodują objawy od kichania po potencjalnie zagrażający życiu wstrząs anafilaktyczny.

Układ odpornościowy zmienia się przez całe życie w odpowiedzi na wiek i doświadczenie. Noworodki otrzymują tymczasową ochronę z przeciwciał matczynych przekazywanych przez łożysko i mleko matki. Układ odpornościowy wzmacnia się w dzieciństwie, gdy dzieci napotykają i rozwijają odporność na powszechne patogeny. U osób starszych funkcja odpornościowa stopniowo spada, zwiększając podatność na infekcje.

Czynniki związane ze stylem życia znacząco wpływają na funkcję odpornościową. Odpowiednia ilość snu, regularne ćwiczenia i prawidłowe odżywianie wspierają zdrowie odpornościowe. Przewlekły stres uwalnia kortyzol i inne hormony, które z czasem tłumią odpowiedzi immunologiczne. Unikanie nadmiernego spożycia alkoholu i tytoniu pomaga utrzymać obronność odpornościową na optymalnym poziomie.

Współczesna medycyna nadal rozwija sposoby wykorzystania układu odpornościowego do leczenia chorób. Immunoterapia zrewolucjonizowała leczenie raka, trenując komórki odpornościowe, aby rozpoznawały i niszczyły nowotwory. Nagroda Nobla w dziedzinie fizjologii lub medycyny w 2018 roku uhonorowano Jamesa Allisona i Tasuku Honjo za pionierską pracę nad immunoterapią nowotworową, która uratowała tysiące żyć.`,
    questions: [
      {
        id: 'health-medicine-p03-q1',
        type: 'single_choice',
        question: 'Które komórki produkują przeciwciała?',
        options: ['Komórki T', 'Komórki B', 'Neutrofile', 'Makrofagi'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q2',
        type: 'single_choice',
        question: 'Kto zaproponował koncepcję przeciwciał w 1897 roku?',
        options: ['Ilja Miecznikow', 'Paul Ehrlich', 'James Allison', 'Tasuku Honjo'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q3',
        type: 'single_choice',
        question: 'Czym jest fagocytoza?',
        options: ['Produkcja przeciwciał', 'Uwalnianie histaminy', 'Proces pochłaniania i niszczenia patogenów', 'Tworzenie komórek pamięci'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p03-q4',
        type: 'multiple_select',
        question: 'Które są oznaki stanu zapalnego? Wybierz wszystkie pasujące.',
        options: ['Zaczerwienienie', 'Zimno', 'Obrzęk', 'Ból'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-p03-q5',
        type: 'true_false',
        question: 'Wrodzony układ odpornościowy rozwija ukierunkowane odpowiedzi na konkretne patogeny.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p03-q6',
        type: 'numeric',
        question: 'W którym roku Paul Ehrlich otrzymał Nagrodę Nobla za pracę nad immunologią?',
        correctValue: 1908,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'rok',
      },
    ],
  },
  {
    id: 'health-medicine-p04',
    topicId: 'health-medicine',
    title: 'Antybiotyki: wojna przeciwko bakteriom',
    difficulty: 'intermediate',
    wordCount: 1300,
    articleType: 'practice',
    orderIndex: 4,
    content: `Antybiotyki uratowały więcej żyć niż jakakolwiek inna klasa leków w historii medycyny. Te niezwykłe leki zabijają bakterie lub powstrzymują je przed rozmnażaniem, pozwalając układowi odpornościowemu organizmu wyeliminować infekcje. Od ich odkrycia na początku dwudziestego wieku antybiotyki przekształciły medycynę i dramatycznie przedłużyły ludzkie życie.

Alexander Fleming odkrył pierwszy antybiotyk przypadkowo 28 września 1928 roku w szpitalu St. Mary's w Londynie. Fleming zauważył, że pleśń zwana Penicillium notatum skaziła jedną z jego hodowli bakteryjnych i zabiła otaczające bakterie. Zamiast wyrzucić skażoną płytkę, zbadał ją dalej i zidentyfikował substancję antybakteryjną, którą nazwał penicyliną. Fleming opublikował swoje odkrycia w 1929 roku, ale brakowało mu zasobów, aby rozwinąć penicylinę w użyteczny lek.

Howard Florey i Ernst Boris Chain na Uniwersytecie Oksfordzkim przekształcili penicylinę z ciekawostki laboratoryjnej w praktyczny lek na początku lat 40. Opracowali metody oczyszczania i masowej produkcji leku, przeprowadzając pierwsze udane próby kliniczne na ludziach w lutym 1941 roku. Popyt wojenny dramatycznie przyspieszył produkcję, a do Dnia D w czerwcu 1944 roku istniało wystarczająco dużo penicyliny, aby leczyć wszystkich rannych żołnierzy alianckich. Fleming, Florey i Chain podzielili się Nagrodą Nobla w dziedzinie fizjologii lub medycyny w 1945 roku.

Antybiotyki działają poprzez kilka różnych mechanizmów atakowania komórek bakteryjnych, oszczędzając komórki ludzkie. Penicylina i pokrewne leki zakłócają budowę ściany komórkowej, powodując pękanie bakterii pod własnym ciśnieniem wewnętrznym. Tetracykliny i aminoglikozydy blokują rybosomy bakteryjne przed wytwarzaniem białek. Fluorochinolony uniemożliwiają bakteriom kopiowanie ich DNA. Te różne strategie ataku wyjaśniają, dlaczego niektóre antybiotyki działają lepiej przeciwko określonym infekcjom.

Odkrycie nowych klas antybiotyków postępowało szybko podczas tak zwanego złotego wieku odkryć antybiotyków od 1940 do 1962 roku. Streptomycyna, odkryta przez Selmana Waksmana na Uniwersytecie Rutgersa w 1943 roku, stała się pierwszym skutecznym leczeniem gruźlicy. Naukowcy odkryli tetracyklinę w 1948 roku, erytromycynę w 1952 roku i wankomycynę w 1958 roku. Każda nowa klasa rozszerzyła zakres infekcji, które lekarze mogli skutecznie leczyć.

Oporność na antybiotyki pojawiła się niemal natychmiast jako konsekwencja ewolucji bakteryjnej i doboru naturalnego. Bakterie rozmnażają się szybko, czasami podwajając swoją populację co dwadzieścia minut w sprzyjających warunkach. Przypadkowe mutacje czasami wytwarzają oporność na antybiotyki, a te oporne bakterie przeżywają, podczas gdy inne umierają. W ciągu kilku lat od wprowadzenia penicyliny oporne bakterie Staphylococcus pojawiły się w szpitalach na całym świecie.

Nadużywanie i niewłaściwe stosowanie antybiotyków dramatycznie przyspieszyło oporność w ostatnich dziesięcioleciach. Lekarze czasami przepisują antybiotyki na infekcje wirusowe, takie jak przeziębienia i grypa, gdzie nie przynoszą żadnej korzyści. Operacje rolnicze podają antybiotyki zwierzętom hodowlanym, aby promować wzrost, narażając ogromne populacje bakterii na presję selekcyjną. Pacjenci, którzy wcześnie przestają przyjmować antybiotyki, pozostawiają oporne bakterie przy życiu, aby się rozmnażały i rozprzestrzeniały.

Gronkowiec złocisty oporny na metycylinę, znany jako MRSA, demonstruje niebezpieczeństwo oporności na antybiotyki. Ten superbakteryjny pojawił się w brytyjskich szpitalach w 1961 roku, zaledwie dwa lata po wprowadzeniu metycyliny. MRSA obecnie powoduje około 120 000 infekcji i 20 000 zgonów rocznie tylko w Stanach Zjednoczonych. Niektóre szczepy rozwinęły oporność na niemal wszystkie dostępne antybiotyki, pozostawiając lekarzy z nielicznymi opcjami leczenia.

Światowa Organizacja Zdrowia ogłosiła oporność na antybiotyki jednym z największych zagrożeń dla zdrowia globalnego w 2014 roku. Bez skutecznych antybiotyków rutynowe operacje stają się niebezpieczne, chemioterapia raka rośnie ryzyko, a drobne infekcje stają się śmiertelne. WHO szacuje, że infekcje oporne na leki już powodują 700 000 zgonów rocznie na całym świecie i mogą powodować 10 milionów zgonów rocznie do 2050 roku, jeśli obecne trendy się utrzymają.

Firmy farmaceutyczne w dużej mierze porzuciły badania nad antybiotykami, ponieważ opracowanie nowych leków kosztuje miliardy dolarów, podczas gdy bakterie rozwijają oporność w ciągu lat. Od 1962 roku tylko dwie nowe klasy antybiotyków dotarły na rynek. Zachęty rządowe i inicjatywy organizacji non-profit pracują teraz nad zachęceniem do rozwoju antybiotyków, ale rurociąg nowych leków pozostaje niebezpiecznie cienki.

Zachowanie skuteczności antybiotyków wymaga działania od lekarzy, pacjentów, rolników i rządów na całym świecie. Lekarze powinni przepisywać antybiotyki tylko wtedy, gdy jest to konieczne, i wybierać leki wąskiego spektrum, gdy jest to możliwe. Pacjenci muszą ukończyć pełny kurs leczenia, nawet po poczuciu się lepiej. Reformy rolnicze mogą zmniejszyć stosowanie antybiotyków u zwierząt hodowlanych, jednocześnie utrzymując produkcję żywności. Międzynarodowa współpraca jest niezbędna, ponieważ oporne bakterie swobodnie przekraczają granice.

Nowe podejścia do zwalczania infekcji bakteryjnych dają nadzieję na przyszłość. Bakteriofagi to wirusy, które naturalnie infekują i zabijają bakterie, oferując alternatywę dla chemicznych antybiotyków. Naukowcy opracowują szczepionki przeciwko bakteriom obecnie leczonym antybiotykami. Badacze eksplorują związki, które wyłączają bakteryjną obronę bez zabijania bakterii, zmniejszając presję selekcyjną na oporność. Te innowacje mogą ostatecznie uzupełnić lub zastąpić tradycyjne antybiotyki.

Historia antybiotyków naucza ważnych lekcji o trwającym pojedynku między ludzką medycyną a ewolucją drobnoustrojów. Każda nowa broń, którą rozwijamy, ostatecznie traci skuteczność, gdy bakterie się dostosowują. Utrzymanie naszej przewagi wymaga ciągłych badań, odpowiedzialnego używania istniejących leków i uznania, że ta bitwa nigdy się nie skończy.`,
    questions: [
      {
        id: 'health-medicine-p04-q1',
        type: 'single_choice',
        question: 'Kto odkrył penicylinę w 1928 roku?',
        options: ['Howard Florey', 'Ernst Boris Chain', 'Alexander Fleming', 'Selman Waksman'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p04-q2',
        type: 'single_choice',
        question: 'Co oznacza MRSA?',
        options: ['Gronkowiec złocisty wielolekooporny', 'Gronkowiec złocisty oporny na metycylinę', 'Paciorkowiec złocisty wielolekooporny', 'Paciorkowiec złocisty oporny na metycylinę'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p04-q3',
        type: 'multiple_select',
        question: 'Które mechanizmy stosują antybiotyki do atakowania bakterii? Wybierz wszystkie pasujące.',
        options: ['Zakłócanie budowy ściany komórkowej', 'Blokowanie rybosomów przed wytwarzaniem białek', 'Atakowanie komórek ludzkich', 'Zapobieganie replikacji DNA'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p04-q4',
        type: 'true_false',
        question: 'Złoty wiek odkryć antybiotyków trwał od 1940 do 1962 roku.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p04-q5',
        type: 'numeric',
        question: 'Około ile zgonów rocznie powoduje MRSA w Stanach Zjednoczonych?',
        correctValue: 20000,
        tolerance: 2000,
        min: 5000,
        max: 50000,
        step: 1000,
        unit: 'zgonów',
      },
      {
        id: 'health-medicine-p04-q6',
        type: 'single_choice',
        question: 'Kto opracował metody masowej produkcji penicyliny na Uniwersytecie Oksfordzkim?',
        options: ['Alexander Fleming i Selman Waksman', 'Howard Florey i Ernst Boris Chain', 'Robert Koch i Louis Pasteur', 'Edward Jenner i Jonas Salk'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'health-medicine-p05',
    topicId: 'health-medicine',
    title: 'Sen: nauka o odpoczynku i regeneracji',
    difficulty: 'intermediate',
    wordCount: 1700,
    articleType: 'practice',
    orderIndex: 5,
    content: `Sen pozostaje jednym z najbardziej istotnych, a jednocześnie słabo rozumianych aspektów ludzkiej biologii. Każda osoba spędza około jednej trzeciej swojego życia śpiąc, ale naukowcy dopiero w dwudziestym wieku zaczęli rozwikływać tajemnice snu. Współczesne badania ujawniają, że sen pełni kluczowe funkcje dla zdrowia fizycznego, wydajności umysłowej i dobrostanu emocjonalnego, których nie może zastąpić żadna ilość odpoczynku na jawie.

Odkrycie snu REM w 1953 roku przez Eugene'a Aserinsky'ego i Nathaniela Kleitmana na Uniwersytecie Chicago zrewolucjonizowało naukę o śnie. Zaobserwowali, że oczy śpiących osób poruszały się szybko pod zamkniętymi powiekami podczas pewnych okresów, a aktywność mózgu podczas tych faz przypominała aktywność na jawie. Sen REM, jak go nazwali, okazał się być okresem, w którym występują najbardziej żywe sny. To odkrycie przekształciło sen z pasywnego stanu w aktywny proces godny badań naukowych.

Sen występuje w cyklach trwających około dziewięćdziesiąt minut każdy, przy czym większość dorosłych ukończa od czterech do sześciu cykli na noc. Każdy cykl zawiera odrębne etapy, które pełnią różne funkcje. Sen non-REM zaczyna się od lekkiego snu, podczas którego aktywność mięśniowa zmniejsza się, a temperatura ciała spada. Następnie następują głębsze etapy non-REM, podczas których organizm naprawia tkanki, wzmacnia układ odpornościowy i uwalnia hormon wzrostu.

Sen REM wydłuża się w miarę postępu nocy, z najdłuższymi okresami REM występującymi pod ranek. Podczas snu REM mózg staje się bardzo aktywny, podczas gdy mięśnie dowolne są tymczasowo sparaliżowane. Ten paraliż zapobiega wykonywaniu przez ludzi swoich snów, chociaż zaburzenie zachowania podczas snu REM może zakłócić ten mechanizm z potencjalnie niebezpiecznymi skutkami. Większość snu REM występuje podczas ostatniej trzeciej nocy.

System limfatyczny mózgu, odkryty przez Maiken Nedergaard na Uniwersytecie Rochester w 2012 roku, ujawnił jedną kluczową funkcję snu. Ten system usuwania odpadów usuwa toksyczne białka z tkanki mózgowej, w tym beta-amyloid związany z chorobą Alzheimera. System limfatyczny działa głównie podczas głębokiego snu non-REM, kiedy komórki mózgowe kurczą się o około 60 procent, pozwalając płynowi mózgowo-rdzeniowemu przepłynąć między neuronami.

Konsolidacja pamięci stanowi kolejną kluczową funkcję snu, którą naukowcy szczegółowo udokumentowali. Podczas snu mózg odtwarza i wzmacnia połączenia neuronowe utworzone podczas uczenia się na jawie. Badania Roberta Stickgolda na Uniwersytecie Harvarda wykazały, że osoby, które spały po nauczeniu się nowych umiejętności, radziły sobie znacznie lepiej niż te, które pozostały na jawie przez ten sam czas.

Pozbawienie snu powoduje poważne upośledzenia poznawcze i fizyczne, które kumulują się w czasie. Po zaledwie siedemnastu godzinach bez snu czasy reakcji i osąd spadają do poziomów równoważnych legalnemu upojeniu alkoholowego. Wyciek ropy Exxon Valdez w marcu 1989 roku i katastrofa nuklearna w Czarnobylu w kwietniu 1986 roku obejmowały zmęczonych pracowników popełniających krytyczne błędy. Przewlekły niedobór snu zwiększa ryzyko otyłości, cukrzycy, chorób serca i przedwczesnej śmierci.

Rytmy dobowe regulują czas snu poprzez biologiczny zegar znajdujący się w jądrze nadskrzyżowaniowym mózgu. Ten maleńki klaster około 20 000 neuronów otrzymuje sygnały świetlne z oczu i koordynuje dzienne cykle czujności, temperatury ciała, uwalniania hormonów i niezliczonych innych funkcji. Zegar dobowy działa nieco dłużej niż 24 godziny i musi być resetowany codziennie przez ekspozycję na światło.

Melatonina, hormon produkowany przez szyszynkę, sygnalizuje ciemność organizmowi i promuje rozpoczęcie snu. Mózg zaczyna uwalniać melatoninę wieczorem, zazwyczaj dwie godziny przed zwykłą porą snu. Ekspozycja na jasne światło, szczególnie niebieskie długości fal z ekranów elektronicznych, tłumi produkcję melatoniny i może opóźnić sen. To wyjaśnia, dlaczego używanie telefonów i komputerów przed snem często zakłóca sen.

Adenozyna gromadzi się w mózgu podczas godzin czuwania i tworzy rosnącą presję do snu. Ten związek chemiczny gromadzi się jako produkt uboczny aktywności mózgowej i wiąże się z receptorami, które promują senność. Kofeina działa poprzez blokowanie receptorów adenozyny, tymczasowo maskując zmęczenie bez eliminowania podstawowego długu snu. Gdy kofeina się zużywa, zgromadzona adenozyna wywołuje znajomy krach, którego doświadczają pijący kawę.

Zaburzenia snu dotykają miliony ludzi i przybierają wiele form poza prostą bezsennością. Obturacyjny bezdech senny powoduje powtarzające się przerwania oddychania podczas snu, dotykając około 25 milionów amerykańskich dorosłych. Ten stan zwiększa ryzyko wysokiego ciśnienia krwi, zawału serca, udaru i cukrzycy. Urządzenia ciągłego dodatniego ciśnienia w drogach oddechowych, które utrzymują drogi oddechowe otwarte podczas snu, zapewniają skuteczne leczenie dla większości pacjentów.

Narkolepsja, zaburzenie neurologiczne dotykające około 200 000 Amerykanów, powoduje przytłaczającą senność w ciągu dnia i nagłe ataki snu. Naukowcy odkryli w 1999 roku, że narkolepsja wynika z niszczenia neuronów produkujących hipokretyznę, neuroprzekaźnik, który utrzymuje czuwanie. To odkrycie przez Emmanuela Mignota na Uniwersytecie Stanforda otworzyło nowe możliwości leczenia i zilustrował, jak badanie zaburzeń snu rozwija zrozumienie normalnego snu.

Wiek głęboko wpływa na wzorce snu przez całe ludzkie życie. Noworodki śpią do siedemnastu godzin dziennie, spędzając około połowy tego czasu w śnie REM. Nastolatki doświadczają biologicznego przesunięcia w kierunku późniejszego czasu snu, co jest w konflikcie z wcześniejszymi godzinami rozpoczęcia szkoły. Starsze osoby śpią mniej głęboko i budzą się częściej, chociaż ich potrzeby snu niekoniecznie maleją.

Współczesne społeczeństwo często traktuje sen jako zbędny czas, który można wymienić na produktywność lub rozrywkę. To podejście ignoruje przytłaczające naukowe dowody, że odpowiedni sen jest niezbędny dla zdrowia i wydajności. Centra Kontroli i Zapobiegania Chorobom ogłosiły niewystarczający sen epidemią zdrowia publicznego w 2014 roku, szacując, że jedna trzecia amerykańskich dorosłych śpi mniej niż zalecane siedem godzin na noc.

Poprawa nawyków snu wymaga konsekwentnych harmonogramów, odpowiednich środowisk snu i zmian behawioralnych. Chodzenie do łóżka i budzenie się o tych samych porach każdego dnia wzmacnia rytmy dobowe. Chłodne, ciemne, ciche sypialnie promują jakość snu. Unikanie kofeiny po południu, ograniczanie alkoholu przed snem i zmniejszanie wieczornego czasu ekranu wspiera lepszy sen. Ćwiczenia poprawiają jakość snu, gdy są wykonywane wcześniej w ciągu dnia.

Zrozumienie nauki o śnie daje jednostkom możliwość podejmowania świadomych wyborów dotyczących tej fundamentalnej ludzkiej potrzeby. Sen nie jest zmarnowanym czasem, ale aktywną inwestycją w zdrowie fizyczne, funkcję poznawczą i odporność emocjonalną. Rosnący zasób badań potwierdza to, co sugeruje wspólne doświadczenie: odpowiedni sen jest niezbędny do dobrego życia.`,
    questions: [
      {
        id: 'health-medicine-p05-q1',
        type: 'single_choice',
        question: 'Kto odkrył sen REM w 1953 roku?',
        options: ['Robert Stickgold i Matthew Walker', 'Eugene Aserinsky i Nathaniel Kleitman', 'Maiken Nedergaard i Emmanuel Mignot', 'William Dement i Allan Rechtschaffen'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q2',
        type: 'single_choice',
        question: 'Co robi system limfatyczny podczas snu?',
        options: ['Konsoliduje wspomnienia', 'Usuwa toksyczne białka z tkanki mózgowej', 'Reguluje rytmy dobowe', 'Produkuje melatoninę'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q3',
        type: 'multiple_select',
        question: 'Które stany są związane z przewlekłym niedoborem snu? Wybierz wszystkie pasujące.',
        options: ['Otyłość', 'Choroby serca', 'Ulepszona funkcja odpornościowa', 'Cukrzyca'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p05-q4',
        type: 'true_false',
        question: 'Kofeina eliminuje dług snu poprzez przywrócenie poziomów adenozyny.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p05-q5',
        type: 'numeric',
        question: 'Około ile minut trwa każdy cykl snu?',
        correctValue: 90,
        tolerance: 10,
        min: 30,
        max: 180,
        step: 5,
        unit: 'minut',
      },
      {
        id: 'health-medicine-p05-q6',
        type: 'single_choice',
        question: 'Co powoduje narkolepsję?',
        options: ['Nadmierna produkcja melatoniny', 'Niszczenie neuronów produkujących hipokretyznę', 'Zablokowane receptory adenozyny', 'Zakłócone rytmy dobowe'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q7',
        type: 'single_choice',
        question: 'Gdzie znajduje się biologiczny zegar w mózgu?',
        options: ['Szyszynka', 'Hipokamp', 'Jądro nadskrzyżowaniowe', 'Móżdżek'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p05-q8',
        type: 'numeric',
        question: 'Około ile milionów amerykańskich dorosłych dotyka obturacyjny bezdech senny?',
        correctValue: 25,
        tolerance: 5,
        min: 5,
        max: 50,
        step: 1,
        unit: 'milionów',
      },
    ],
  },
  {
    id: 'health-medicine-c1',
    topicId: 'health-medicine',
    title: 'Ludzkie serce: silnik życia',
    difficulty: 'beginner',
    wordCount: 1200,
    articleType: 'certification',
    orderIndex: 6,
    certificationLength: 'short',
    content: `Ludzkie serce bije około 100 000 razy każdego dnia, pompując około 2000 galonów krwi przez 60 000 mil naczyń krwionośnych. Ten niezwykły mięsień działa nieprzerwanie od chwili przed narodzinami aż do śmierci, dostosowując się do zmieniających się potrzeb organizmu bez świadomej kontroli. Zrozumienie, jak funkcjonuje serce, pomaga nam docenić ten życiowo ważny narząd i chronić go przed chorobą.

Serce ma mniej więcej rozmiar zaciśniętej pięści i waży od 8 do 12 uncji u zdrowych dorosłych. Znajduje się nieco na lewo od środka klatki piersiowej, chronione przez klatkę piersiową i mostek. Serce składa się z czterech komór, które współpracują w precyzyjnie skoordynowanym rytmie ustanowionym przez wyspecjalizowane komórki elektryczne.

Dwie górne komory, zwane przedsionkami, odbierają krew wracającą do serca. Prawy przedsionek zbiera krew ubogą w tlen z ciała przez dwie duże żyły zwane żyłą główną górną i dolną. Lewy przedsionek otrzymuje krew bogatą w tlen wracającą z płuc przez cztery żyły płucne. Te komory mają stosunkowo cienkie ściany, ponieważ muszą tylko przepychać krew do komór poniżej.

Dwie dolne komory, zwane komorami, wykonują ciężką pracę pompowania. Prawa komora pompuje krew do płuc, gdzie pobiera tlen i uwalnia dwutlenek węgla. Lewa komora pompuje krew bogatą w tlen do każdego narządu i tkanki w organizmie. Lewa komora ma znacznie grubsze ściany, ponieważ musi wytworzyć wystarczające ciśnienie, aby wysłać krew przez cały układ krążenia.

Cztery zastawki zapewniają, że krew płynie tylko w jednym kierunku przez serce. Zastawka trójdzielna oddziela prawy przedsionek od prawej komory, podczas gdy zastawka mitralna pełni tę samą funkcję po lewej stronie. Zastawki płucna i aortalna kontrolują krew opuszczającą serce. Gdy te zastawki się zamykają, tworzą znajomy dźwięk tup-tup, który rozpoznajemy jako bicie serca.

System elektryczny serca kontroluje czas każdego uderzenia z niezwykłą precyzją. Węzeł zatokowo-przedsionkowy, znajdujący się w prawym przedsionku, służy jako naturalny rozrusznik serca. Ten klaster wyspecjalizowanych komórek generuje impulsy elektryczne około 60 do 100 razy na minutę u odpoczywającego dorosłego. Te impulsy rozprzestrzeniają się przez przedsionki, powodując ich skurcz i przepychanie krwi do komór.

Po krótkiej przerwie w węźle przedsionkowo-komorowym, która pozwala komorom całkowicie się wypełnić, sygnał elektryczny podróżuje w dół wyspecjalizowanych włókien zwanych pęczkiem Hisa. Te włókna dzielą się na lewe i prawe odgałęzienia, które rozprzestrzeniają się po całych ścianach komór. Ta skoordynowana aktywacja elektryczna powoduje, że komory kurczą się potężnie i jednocześnie, wyrzucając krew do tętnic.

William Harvey, angielski lekarz, jako pierwszy opisał krążenie krwi w 1628 roku po latach starannej obserwacji i eksperymentowania. Jego praca zaprzeczała wieków przekonań medycznych ustanowionych przez Galena, który myślał, że krew jest stale produkowana i zużywana przez organizm. Harvey wykazał, że krew krąży w zamkniętej pętli, wracając do serca, aby być ponownie pompowaną.

Tętnice wieńcowe dostarczają samemu mięśniowi sercowemu tlen i składniki odżywcze. Lewa tętnica wieńcowa dzieli się na dwie główne gałęzie, które zaopatrują lewą stronę i przód serca. Prawa tętnica wieńcowa zaopatruje prawą komorę i dół serca. Zablokowania w tych tętnicach powodują zawały serca, które zabijają części mięśnia sercowego pozbawione przepływu krwi.

Choroba serca pozostaje wiodącą przyczyną śmierci na całym świecie, zabierając około 18 milionów żyć każdego roku według Światowej Organizacji Zdrowia. Czynniki ryzyka obejmują wysokie ciśnienie krwi, wysoki cholesterol, palenie, cukrzycę, otyłość i brak aktywności fizycznej. Wiele z tych czynników reaguje na zmiany stylu życia, w tym modyfikację diety i regularne ćwiczenia.

Współczesna medycyna opracowała niezwykłe metody leczenia chorób serca. Leki mogą kontrolować ciśnienie krwi, obniżać cholesterol i zapobiegać skrzepom krwi. Procedury takie jak angioplastyka otwierają zablokowane tętnice za pomocą maleńkich baloników i metalowych stentów. Operacja pomostowania tworzy nowe drogi dla przepływu krwi wokół zablokowanych tętnic wieńcowych, wykorzystując naczynia pobrane z innych części ciała.

Pierwszy udany przeszczep serca u człowieka został wykonany przez dr. Christiaana Barnarda w Cape Town w Afryce Południowej 3 grudnia 1967 roku. Pacjent, Louis Washkansky, otrzymał serce młodej kobiety, która zginęła w wypadku samochodowym. Chociaż Washkansky żył tylko 18 dni, ta przełomowa operacja wykazała, że przeszczep serca jest możliwy i otworzyła drzwi do nowoczesnej medycyny transplantacyjnej.

Dbanie o swoje serce wymaga uwagi na codzienne nawyki. Regularne ćwiczenia aerobowe wzmacniają mięsień sercowy i poprawiają jego wydajność. Dieta bogata w owoce, warzywa, pełne ziarna i chude białka wspiera zdrowie sercowo-naczyniowe. Unikanie tytoniu, ograniczanie alkoholu, zarządzanie stresem i utrzymywanie zdrowej wagi – wszystko to znacząco zmniejsza ryzyko chorób serca.`,
    questions: [
      {
        id: 'health-medicine-c1-q1',
        type: 'single_choice',
        question: 'Która komora serca ma najgrubsze ściany?',
        options: ['Prawy przedsionek', 'Lewy przedsionek', 'Prawa komora', 'Lewa komora'],
        correctIndex: 3,
      },
      {
        id: 'health-medicine-c1-q2',
        type: 'multiple_select',
        question: 'Które są czynnikami ryzyka chorób serca wymienionymi w artykule? Wybierz wszystkie pasujące.',
        options: ['Wysokie ciśnienie krwi', 'Niski cholesterol', 'Palenie', 'Brak aktywności fizycznej'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c1-q3',
        type: 'true_false',
        question: 'William Harvey odkrył, że krew jest stale produkowana i zużywana przez organizm.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c1-q4',
        type: 'numeric',
        question: 'Około ile razy bije ludzkie serce każdego dnia?',
        correctValue: 100000,
        tolerance: 10000,
        min: 50000,
        max: 200000,
        step: 10000,
        unit: 'uderzeń',
      },
      {
        id: 'health-medicine-c1-q5',
        type: 'single_choice',
        question: 'Kto wykonał pierwszy udany przeszczep serca u człowieka?',
        options: ['William Harvey', 'Louis Pasteur', 'Christiaan Barnard', 'Jonas Salk'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c1-q6',
        type: 'single_choice',
        question: 'Co służy jako naturalny rozrusznik serca?',
        options: ['Węzeł przedsionkowo-komorowy', 'Węzeł zatokowo-przedsionkowy', 'Pęczek Hisa', 'Zastawka mitralna'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c1-q7',
        type: 'numeric',
        question: 'W którym roku William Harvey jako pierwszy opisał krążenie krwi?',
        correctValue: 1628,
        tolerance: 0,
        min: 1500,
        max: 1800,
        step: 1,
        unit: 'rok',
      },
    ],
  },
  {
    id: 'health-medicine-c2',
    topicId: 'health-medicine',
    title: 'Rak: zrozumienie i walka z chorobą',
    difficulty: 'intermediate',
    wordCount: 2300,
    articleType: 'certification',
    orderIndex: 7,
    certificationLength: 'medium',
    content: `Rak pozostaje jednym z najbardziej groźnych wyzwań zdrowotnych ludzkości, dotykając miliony żyć na całym świecie każdego roku. Ta kolekcja chorób występuje, gdy komórki rozrastają się niekontrolowanie i rozprzestrzeniają się na otaczające tkanki, zakłócając normalne funkcje organizmu. Zrozumienie raka wymaga wiedzy o biologii komórkowej, genetyce i niezwykłym postępie, jaki naukowcy poczynili w opracowywaniu metod leczenia w ciągu ostatniego stulecia.

Amerykańskie Towarzystwo Raka szacuje, że około 1,9 miliona nowych przypadków raka zostało zdiagnozowanych w Stanach Zjednoczonych w 2023 roku, z około 609 000 zgonów z powodu tej choroby. Rak zajmuje drugą pozycję jako przyczyna zgonów w większości krajów rozwiniętych, ustępując jedynie chorobom serca. Jednak wskaźniki przeżycia poprawiły się dramatycznie w ostatnich dziesięcioleciach dzięki postępom w wykrywaniu, leczeniu i strategiach zapobiegania.

Rak rozwija się poprzez wieloetapowy proces, który zazwyczaj trwa lata lub dziesięciolecia. Normalne komórki rosną, dzielą się i umierają zgodnie z ściśle regulowanymi programami genetycznymi. Rak zaczyna się, gdy mutacje gromadzą się w genach kontrolujących te procesy. Onkogeny, gdy są aktywowane, napędzają nadmierny wzrost komórek. Geny supresorowe nowotworów, gdy są inaktywowane, usuwają kluczowe hamulce podziału komórkowego. Większość nowotworów wymaga mutacji w wielu genach, zanim staną się złośliwe.

Czynniki środowiskowe powodują wiele mutacji prowadzących do raka. Dym tytoniowy zawiera ponad 70 znanych substancji rakotwórczych, które uszkadzają DNA w płucach, gardle i innych tkankach. Raport Generalnego Chirurga z 1964 roku definitywnie powiązał palenie z rakiem płuc, prowadząc ostatecznie do kampanii zdrowia publicznego, które zmniejszyły wskaźniki palenia w wielu krajach. Promieniowanie ultrafioletowe ze słońca uszkadza DNA komórek skóry, powodując czerniaka i inne nowotwory skóry. Chemikalia przemysłowe, niektóre wirusy i narażenie na promieniowanie również zwiększają ryzyko raka.

Czynniki dziedziczne odpowiadają za około 5 do 10 procent wszystkich nowotworów. Mutacje genów BRCA1 i BRCA2 dramatycznie zwiększają ryzyko raka piersi i jajnika. Aktorka Angelina Jolie zwróciła uwagę na te geny w maju 2013 roku, kiedy publicznie omówiła swoją prewencyjną mastektomię po pozytywnym teście na BRCA1. Zespół Lyncha powoduje dziedziczną podatność na raka jelita grubego i kilka innych nowotworów. Testy genetyczne mogą zidentyfikować osoby o wysokim ryzyku, które mogą skorzystać ze zwiększonego nadzoru lub interwencji prewencyjnych.

Układ odpornościowy normalnie rozpoznaje i niszczy nieprawidłowe komórki, ale komórki rakowe rozwijają mechanizmy unikania wykrywania immunologicznego. Mogą wyświetlać mniej identyfikujących markerów na swoich powierzchniach lub uwalniać chemikalia, które tłumią odpowiedzi immunologiczne. Zrozumienie tych strategii unikania doprowadziło do rewolucyjnych metod leczenia immunoterapeutycznego, które przywracają zdolność układu odpornościowego do walki z rakiem.

Chirurgia pozostaje podstawowym leczeniem wielu guzów litych i może wyleczyć raka, gdy zostanie wykryty wcześnie, zanim rozprzestrzeni się do innych miejsc. Starożytni egipscy lekarze opisali chirurgiczne usunięcie guzów w papirusie Edwina Smitha około 1600 roku p.n.e. Nowoczesne techniki chirurgiczne pozwalają na precyzyjne usunięcie guza przy jednoczesnym zachowaniu otaczającej zdrowej tkanki. Chirurdzy mogą również usuwać pobliskie węzły chłonne, aby sprawdzić rozprzestrzenianie się raka i zapobiec nawrotowi.

Radioterapia wykorzystuje wiązki wysokiej energii do uszkadzania DNA komórek rakowych, uniemożliwiając im dzielenie się. Wilhelm Rontgen odkrył promienie rentgenowskie w listopadzie 1895 roku, a lekarze zaczęli używać promieniowania do leczenia raka w ciągu miesięcy. Nowoczesna radioterapia może precyzyjnie celować w guzy, minimalizując uszkodzenia otaczających tkanek. Akceleratory liniowe dostarczają promieniowanie z wielu kątów, koncentrując dawkę tam, gdzie wiązki przecinają się w guzie.

Chemioterapia wykorzystuje leki, które zabijają szybko dzielące się komórki w całym organizmie. Pierwsze środki chemioterapeutyczne powstały z badań nad gazem musztardowym podczas II wojny światowej, który okazał się tłumić aktywność szpiku kostnego. Sidney Farber osiągnął pierwszą remisję białaczki dziecięcej przy użyciu aminopteryny w 1948 roku w Children's Hospital w Bostonie. Dziś dziesiątki leków chemioterapeutycznych atakują komórki rakowe poprzez różne mechanizmy, chociaż skutki uboczne pozostają znaczące, ponieważ leki wpływają również na normalne szybko dzielące się komórki.

Terapie celowane atakują specyficzne cechy molekularne komórek rakowych, oszczędzając normalne komórki. Lek imatinib, zatwierdzony w maju 2001 roku, zrewolucjonizował leczenie przewlekłej białaczki szpikowej, blokując specyficzne nieprawidłowe białko napędzające chorobę. Niemal 90 procent pacjentów z tą niegdyś śmiertelną białaczką przeżywa teraz długoterminowo dzięki leczeniu imatinibem. Naukowcy opracowali od tego czasu leki celowane dla wielu innych nowotworów z określonymi podatnościami molekularnymi.

Immunoterapia stała się najbardziej ekscytującą granicą w leczeniu raka w ostatnich latach. Inhibitory punktów kontrolnych usuwają molekularne hamulce, których komórki rakowe używają do unikania ataku immunologicznego. James Allison w MD Anderson Cancer Center i Tasuku Honjo na Uniwersytecie Kyoto niezależnie odkryli te mechanizmy punktów kontrolnych w latach 90. Ich praca przyniosła im Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 2018 roku. Inhibitory punktów kontrolnych wywołały trwałe remisje u pacjentów z zaawansowanym czerniakiem, rakiem płuc i kilkoma innymi typami nowotworów.

Terapia CAR-T reprezentuje kolejny przełom immunoterapeutyczny, który inżynieruje własne komórki odpornościowe pacjentów do walki z rakiem. Naukowcy usuwają komórki T z krwi pacjenta i modyfikują je genetycznie, aby rozpoznawały komórki rakowe. Po namnożeniu tych zmodyfikowanych komórek w laboratorium lekarze podają je z powrotem pacjentowi. FDA zatwierdziła pierwszą terapię CAR-T dla białaczki dziecięcej w sierpniu 2017 roku po badaniach klinicznych, które wykazały niezwykłe wskaźniki odpowiedzi u pacjentów, którzy nie odpowiedzieli na inne metody leczenia.

Programy przesiewowe wykrywają nowotwory wcześniej, gdy są bardziej uleczalne. Mammografia zmniejsza zgony z powodu raka piersi poprzez identyfikowanie guzów przed ich rozprzestrzenieniem. Kolonoskopia może zapobiec rakowi jelita grubego poprzez usunięcie polipów przedrakowych. Wymazy cytologiczne dramatycznie zmniejszyły zgony z powodu raka szyjki macicy od czasu ich wprowadzenia przez George'a Papanicolaou w latach 40. Szczepienie przeciwko HPV zapobiega teraz infekcjom, które powodują większość nowotworów szyjki macicy.

Zapobieganie pozostaje najbardziej skuteczną strategią przeciwko wielu nowotworom. Niepalenie zapobiega około 30 procentom wszystkich zgonów z powodu raka. Utrzymywanie zdrowej wagi poprzez dietę i ćwiczenia zmniejsza ryzyko wielu typów raka. Ograniczanie spożycia alkoholu, ochrona skóry przed ekspozycją na słońce i unikanie znanych substancji rakotwórczych – wszystko to zmniejsza ryzyko raka. Szczepienia przeciwko wirusowemu zapaleniu wątroby typu B i ludzkiemu wirusowi brodawczaka zapobiegają odpowiednio rakowi wątroby i szyjki macicy.

Leczenie raka coraz częściej obejmuje spersonalizowane podejścia oparte na specyficznych cechach guza każdego pacjenta. Sekwencjonowanie genetyczne może zidentyfikować mutacje, które sugerują, które metody leczenia będą najbardziej skuteczne. Biopsje płynne wykrywają DNA raka w próbkach krwi, pozwalając na monitorowanie odpowiedzi na leczenie bez inwazyjnych procedur. Sztuczna inteligencja pomaga patologom analizować próbki tkanek i identyfikować subtelne wzorce, które przewidują wyniki.

Ekonomiczne obciążenie rakiem jest oszałamiające, z kosztami leczenia przekraczającymi 200 miliardów dolarów rocznie tylko w Stanach Zjednoczonych. Wielu pacjentów boryka się z trudnościami finansowymi z powodu kosztów leczenia, utraconego dochodu i powiązanych kosztów. Debaty dotyczące polityki zdrowotnej trwają dalej na temat tego, jak zrównoważyć zachęty do innowacji z przystępnym dostępem do leków przeciwnowotworowych, z których niektóre kosztują ponad 100 000 dolarów rocznie.

Pomimo ogromnego postępu badania nad rakiem nadal stoją przed ogromnymi wyzwaniami. Heterogeniczność guza oznacza, że komórki rakowe w obrębie pojedynczego pacjenta mogą mieć różne mutacje, pozwalając niektórym przetrwać metody leczenia, które zabijają inne. Rak przerzutowy, który rozprzestrzenił się do odległych miejsc, pozostaje w dużej mierze nieuleczalny dla większości typów nowotworów. Oporność na leki rozwija się, gdy komórki rakowe ewoluują mechanizmy przetrwania leczenia.

Ostatnie dziesięciolecia przekształciły raka z jednolicie śmiertelnej diagnozy w zarządzalny przewlekły stan dla wielu pacjentów. Pięcioletnie wskaźniki przeżycia dla wszystkich nowotworów łącznie wzrosły z około 50 procent w latach 70. do ponad 68 procent dzisiaj. Niektóre nowotwory, które kiedyś były wyrokami śmierci, mają teraz wskaźniki wyleczalności przekraczające 90 procent, gdy zostaną złapane wcześnie. Ciągłe badania i inwestycje dają nadzieję, że przyszłe pokolenia będą świadkami jeszcze większego postępu przeciwko temu starożytnemu wrogowi.`,
    questions: [
      {
        id: 'health-medicine-c2-q1',
        type: 'single_choice',
        question: 'Jaki procent nowotworów jest spowodowany czynnikami dziedzicznymi?',
        options: ['1 do 2 procent', '5 do 10 procent', '20 do 30 procent', '40 do 50 procent'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q2',
        type: 'single_choice',
        question: 'Kto osiągnął pierwszą remisję białaczki dziecięcej przy użyciu chemioterapii?',
        options: ['Wilhelm Rontgen', 'George Papanicolaou', 'Sidney Farber', 'James Allison'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q3',
        type: 'multiple_select',
        question: 'Które są czynnikami środowiskowymi, które mogą powodować raka? Wybierz wszystkie pasujące.',
        options: ['Dym tytoniowy', 'Promieniowanie ultrafioletowe', 'Mutacje genu BRCA', 'Niektóre wirusy'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c2-q4',
        type: 'true_false',
        question: 'Inhibitory punktów kontrolnych działają poprzez bezpośrednie zabijanie komórek rakowych promieniowaniem.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c2-q5',
        type: 'numeric',
        question: 'W którym roku został wydany raport Generalnego Chirurga łączący palenie z rakiem płuc?',
        correctValue: 1964,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'rok',
      },
      {
        id: 'health-medicine-c2-q6',
        type: 'single_choice',
        question: 'Który lek zrewolucjonizował leczenie przewlekłej białaczki szpikowej?',
        options: ['Aminopteryna', 'Imatinib', 'Metotreksat', 'Cisplatyna'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q7',
        type: 'single_choice',
        question: 'Co robi terapia CAR-T?',
        options: ['Używa promieniowania do zabijania komórek rakowych', 'Usuwa guzy chirurgicznie', 'Inżynieruje komórki odpornościowe pacjentów do walki z rakiem', 'Blokuje dopływ krwi do guzów'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q8',
        type: 'multiple_select',
        question: 'Kto otrzymał Nagrodę Nobla w 2018 roku za odkrycia prowadzące do terapii inhibitorów punktów kontrolnych? Wybierz wszystkie pasujące.',
        options: ['Sidney Farber', 'James Allison', 'George Papanicolaou', 'Tasuku Honjo'],
        correctIndices: [1, 3],
      },
      {
        id: 'health-medicine-c2-q9',
        type: 'numeric',
        question: 'Około jaki procent zgonów z powodu raka można zapobiec przez niepalenie?',
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
        question: 'FDA zatwierdziła pierwszą terapię CAR-T w sierpniu 2017 roku.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-c3',
    topicId: 'health-medicine',
    title: 'Zdrowie psychiczne: zrozumienie umysłu i jego zaburzeń',
    difficulty: 'advanced',
    wordCount: 3500,
    articleType: 'certification',
    orderIndex: 8,
    certificationLength: 'long',
    content: `Zaburzenia zdrowia psychicznego dotykają setki milionów ludzi na całym świecie, wpływając na myśli, emocje, zachowania i relacje w sposób, który może być głęboko wyłączający. Te zaburzenia wynikają ze złożonych interakcji między czynnikami biologicznymi, psychologicznymi i społecznymi, które naukowcy dopiero zaczynają w pełni rozumieć. Postępy w neuronauce i psychologii przekształciły leczenie, jednak stygmatyzacja i ograniczony dostęp do opieki pozostają znaczącymi barierami dla wielu, którzy potrzebują pomocy.

Światowa Organizacja Zdrowia szacuje, że około miliard ludzi na całym świecie obecnie żyje z zaburzeniem psychicznym. Depresja dotyka ponad 280 milionów ludzi globalnie i znajduje się wśród wiodących przyczyn niepełnosprawności. Zaburzenia lękowe dotykają około 301 milionów ludzi, manifestując się jako nadmierne zmartwienie, ataki paniki i zachowania unikające. Te stany powodują ogromne cierpienie i znaczne koszty ekonomiczne poprzez utratę produktywności i wydatki na opiekę zdrowotną.

Historia leczenia zdrowia psychicznego obejmuje wiele mrocznych rozdziałów, które nowoczesne podejścia starały się poprawić. Przed rozwojem skutecznych leków ludzie z poważną chorobą psychiczną często stykali się z uwięzieniem w zakładach z minimalnym benefitem terapeutycznym. Metody leczenia, w tym lobotomia, po raz pierwszy wykonana przez portugalskiego neurologa Antonio Egasa Moniza w 1935 roku, powodowały nieodwracalne uszkodzenia mózgu, czasami produkując tymczasową poprawę objawów. Ruch deinstytucjonalizacji lat 60. i 70. zamknął wiele szpitali psychiatrycznych, ale często nie zapewnił adekwatnych alternatyw opartych na społeczności.

Odkrycie chlorpromazyny w 1950 roku przez francuską firmę farmaceutyczną Rhone-Poulenc zaznaczyło początek nowoczesnej farmakologii psychiatrycznej. Henri Laborit, francuski chirurg, jako pierwszy rozpoznał jej działanie uspokajające i psychologiczne, prowadząc do prób u pacjentów psychiatrycznych. Jean Delay i Pierre Deniker w szpitalu Sainte-Anne w Paryżu wykazali jej skuteczność w leczeniu schizofrenii w 1952 roku. Ten przełom wykazał, że choroba psychiczna może być leczona lekami, przekształcając możliwości terapeutyczne dziedziny.

Leki przeciwdepresyjne pojawiły się pod koniec lat 50. poprzez dwa równoległe odkrycia. Iproniazyd, pierwotnie opracowany do leczenia gruźlicy, okazał się poprawiać nastrój u niektórych pacjentów w 1957 roku. Imipramina, zsyntetyzowana przez szwajcarską firmę farmaceutyczną Geigy, okazała się skuteczna w leczeniu depresji po badaniach klinicznych Rolanda Kuhna w 1958 roku. Te leki działały przez różne mechanizmy, rozpoczynając badania nad neurochemiczną podstawą depresji, które trwają do dzisiaj.

Hipoteza monoaminowa zaproponowała, że depresja wynika z niedoborów neuroprzekaźników, w tym serotoniny, noradrenaliny i dopaminy. Ta teoria kierowała rozwojem selektywnych inhibitorów wychwytu zwrotnego serotoniny, czyli SSRI, które stały się dostępne począwszy od fluoksetyny w 1987 roku. SSRI oferowały poprawione bezpieczeństwo w porównaniu z wcześniejszymi lekami przeciwdepresyjnymi i stały się jednymi z najczęściej przepisywanych leków na całym świecie. Jednak hipoteza monoaminowa jest obecnie rozpoznawana jako nadmiernie uproszczona, a wielu pacjentów nie reaguje odpowiednio na te leki.

Psychoterapia zapewnia skuteczne leczenie wielu stanów zdrowia psychicznego, albo samodzielnie, albo w połączeniu z lekami. Sigmund Freud rozwinął psychoanalizę w Wiedniu pod koniec dziewiętnastego wieku, podkreślając nieświadome konflikty i wczesne doświadczenia dzieciństwa. Chociaż wiele specyficznych teorii Freuda zostało zakwestionowanych, jego rozpoznanie, że czynniki psychologiczne wpływają na zdrowie psychiczne, fundamentalnie ukształtowało dziedzinę.

Terapia poznawczo-behawioralna, opracowana przez Aarona Becka w latach 60., koncentruje się na identyfikowaniu i zmianie negatywnych wzorców myślowych, które przyczyniają się do stresu emocjonalnego. Badania kliniczne wykazały skuteczność CBT w leczeniu depresji, zaburzeń lękowych, zaburzeń odżywiania i wielu innych stanów. Leczenie zazwyczaj wymaga od 12 do 20 sesji i uczy umiejętności, które pacjenci mogą kontynuować stosować niezależnie. Beck opracował to podejście początkowo dla depresji po obserwowaniu, że jego pacjenci zgłaszali spójne wzorce negatywnych automatycznych myśli.

Zaburzenia lękowe obejmują kilka odrębnych stanów dzielących nadmierny lęk lub zmartwienie jako podstawowe cechy. Uogólnione zaburzenie lękowe obejmuje uporczywe zmartwienie o wiele dziedzin życia, które jest trudne do kontrolowania. Zaburzenie paniki powoduje nagłe epizody intensywnego strachu z objawami fizycznymi, w tym szybkim biciem serca, poceniem się i trudnościami w oddychaniu. Społeczne zaburzenie lękowe tworzy intensywny strach przed sytuacjami społecznymi, w których można być negatywnie ocenianym przez innych. Specyficzne fobie obejmują nadmierny strach przed określonymi przedmiotami lub sytuacjami, takimi jak wysokości, pająki lub zamknięte przestrzenie.

Zespół stresu pourazowego rozwija się u niektórych osób po narażeniu na poważną traumę, w tym walkę, napaść, wypadki lub klęski żywiołowe. Objawy obejmują natrętne wspomnienia, koszmary, unikanie przypomnień traumy, negatywne zmiany nastroju i podwyższone reakcje pobudzenia. Stan ten dotyka około 3,5 procent Amerykanów każdego roku, z życiową częstością występowania około 7 procent. Kobiety są około dwa razy bardziej narażone na rozwój PTSD po narażeniu na traumę niż mężczyźni.

Schizofrenia dotyka około 24 miliony ludzi na całym świecie i powoduje głębokie zakłócenia w myśleniu, percepcji, emocjach i zachowaniu. Objawy pozytywne obejmują halucynacje, urojenia i zdezorganizowaną mowę. Objawy negatywne obejmują zmniejszoną ekspresję emocjonalną, zmniejszoną motywację i wycofanie społeczne. Zaburzenie zazwyczaj pojawia się w późnej adolescencji lub wczesnej dorosłości i często przebiega chroniczny kurs wymagający długoterminowego zarządzania.

Zaburzenie dwubiegunowe obejmuje epizody manii lub hipomanii przeplatające się z depresją. Epizody maniacze obejmują podwyższony nastrój, zmniejszoną potrzebę snu, pędzące myśli i ryzykowne zachowanie. Stan ten dotyka około 40 milionów ludzi na całym świecie. Kay Redfield Jamison, psycholog na Uniwersytecie Johnsa Hopkinsa, która sama ma zaburzenie dwubiegunowe, napisała wpływowe dzieła badające związek tego stanu z kreatywnością, dokumentując jednocześnie jego niszczycielskie skutki.

Zaburzenia odżywiania, w tym anoreksja, bulimia i zaburzenie objadania się, obejmują poważne zakłócenia w zachowaniach żywieniowych oraz związanych myślach i emocjach. Anoreksja ma najwyższy wskaźnik śmiertelności ze wszystkich zaburzeń psychiatrycznych, z około 5 procentami osób dotkniętych umierających z powodu powikłań medycznych lub samobójstwa. Te stany najczęściej rozwijają się w adolescencji i przeważnie dotykają kobiety, chociaż mężczyźni również mogą być dotknięci.

Zaburzenia używania substancji obejmują kompulsywne używanie alkoholu, narkotyków lub innych substancji pomimo szkodliwych konsekwencji. Epidemia opioidów w Stanach Zjednoczonych zabiła ponad 500 000 ludzi od 1999 roku poprzez zgony z przedawkowania. Podejścia do leczenia obejmują leki, takie jak metadon i buprenorfina dla uzależnienia od opioidów, wraz z terapiami behawioralnymi adresującymi podstawowe czynniki psychologiczne. Programy dwunastokrokowe, takie jak Anonimowi Alkoholicy, zapewniają wsparcie rówieśnicze, które wielu uważa za niezbędne do zdrowienia.

Samobójstwo zabiera około 700 000 żyć globalnie każdego roku, czyniąc je poważnym problemem zdrowia publicznego. Mężczyźni umierają przez samobójstwo w wyższych wskaźnikach niż kobiety w większości krajów, chociaż kobiety próbują samobójstwa częściej. Czynniki ryzyka obejmują wcześniejsze próby, zaburzenia psychiczne, nadużywanie substancji, dostęp do śmiertelnych środków oraz ostatnie straty lub kryzysy. Strategie zapobiegania obejmują ograniczanie dostępu do środków, promowanie zachowań poszukujących pomocy i szkolenie dostawców opieki zdrowotnej w rozpoznawaniu znaków ostrzegawczych.

Stygmatyzacja pozostaje znaczącą barierą dla leczenia zdrowia psychicznego. Ludzie z chorobą psychiczną często stykają się z dyskryminacją w zatrudnieniu, mieszkalnictwie i relacjach społecznych. Strach przed etykietowaniem może uniemożliwiać jednostkom szukanie pomocy lub ujawnianie swoich stanów innym. Kampanie przeciwko stygmatyzacji podkreślają, że zaburzenia psychiczne są uleczalnymi stanami medycznymi, a nie osobistymi niepowodzeniami lub wadami charakteru.

Dostęp do usług zdrowia psychicznego różni się dramatycznie w różnych regionach i grupach społeczno-ekonomicznych. W krajach o niskich dochodach może być tylko jeden psychiatra na milion ludzi, w porównaniu do ponad 100 na milion w krajach o wysokich dochodach. Nawet w bogatych narodach wielu nie może sobie pozwolić na leczenie lub staje przed długimi oczekiwaniami na wizyty. Telemedycyna rozszerzyła dostęp podczas pandemii COVID-19 i może na stałe zmienić sposób świadczenia usług zdrowia psychicznego.

Badania kontynuują rozwijanie zrozumienia zdrowia psychicznego i opracowywanie nowych metod leczenia. Badania obrazowania mózgu ujawniają różnice strukturalne i funkcjonalne związane z różnymi zaburzeniami. Badania genetyczne identyfikują warianty ryzyka, które wpływają na podatność na choroby psychiczne. Związki psychodeliczne, w tym psylocybina i MDMA, są badane jako potencjalne metody leczenia depresji i PTSD po dziesięcioleciach zakazu badań. Ketamina i esketamina otrzymały zatwierdzenie dla leczenia opornej depresji, działając poprzez mechanizmy różne od tradycyjnych leków przeciwdepresyjnych.

Zdrowie psychiczne jest coraz bardziej rozpoznawane jako niezbędne do ogólnego dobrostanu i funkcjonowania, a nie jako oddzielna troska od zdrowia fizycznego. Połączenie umysłu i ciała oznacza, że czynniki psychologiczne wpływają na zdrowie fizyczne, podczas gdy stany fizyczne wpływają na stany psychiczne. Zintegrowane modele opieki adresują zarówno zdrowie psychiczne, jak i fizyczne razem. Promowanie zdrowia psychicznego przez całe życie, od wczesnego dzieciństwa przez starość, przynosi korzyści jednostkom i społecznościom jednakowo.`,
    questions: [
      {
        id: 'health-medicine-c3-q1',
        type: 'single_choice',
        question: 'Ile osób na całym świecie żyje z zaburzeniem psychicznym według WHO?',
        options: ['Około 100 milionów', 'Około 500 milionów', 'Około miliard', 'Około dwa miliardy'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q2',
        type: 'single_choice',
        question: 'Kto wykonał pierwszą lobotomię w 1935 roku?',
        options: ['Henri Laborit', 'Aaron Beck', 'Antonio Egas Moniz', 'Roland Kuhn'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q3',
        type: 'multiple_select',
        question: 'Które neuroprzekaźniki są zaangażowane w hipotezę monoaminową depresji? Wybierz wszystkie pasujące.',
        options: ['Serotonina', 'Noradrenalina', 'Acetylocholina', 'Dopamina'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c3-q4',
        type: 'true_false',
        question: 'Terapia poznawczo-behawioralna została opracowana przez Sigmunda Freuda w Wiedniu.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q5',
        type: 'numeric',
        question: 'Ile osób globalnie dotyka depresja (w milionach)?',
        correctValue: 280,
        tolerance: 30,
        min: 200,
        max: 400,
        step: 10,
        unit: 'milionów',
      },
      {
        id: 'health-medicine-c3-q6',
        type: 'single_choice',
        question: 'Kiedy chlorpromazyna została wykazana jako skuteczna w leczeniu schizofrenii?',
        options: ['1935', '1950', '1952', '1987'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q7',
        type: 'single_choice',
        question: 'Kto opracował terapię poznawczo-behawioralną w latach 60.?',
        options: ['Sigmund Freud', 'Aaron Beck', 'Jean Delay', 'Kay Redfield Jamison'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q8',
        type: 'numeric',
        question: 'Około ile osób na całym świecie dotyka schizofrenia (w milionach)?',
        correctValue: 24,
        tolerance: 3,
        min: 10,
        max: 40,
        step: 1,
        unit: 'milionów',
      },
      {
        id: 'health-medicine-c3-q9',
        type: 'true_false',
        question: 'Anoreksja ma najwyższy wskaźnik śmiertelności ze wszystkich zaburzeń psychiatrycznych.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-c3-q10',
        type: 'single_choice',
        question: 'Kiedy fluoksetyna, pierwszy SSRI, stała się dostępna?',
        options: ['1958', '1972', '1987', '1995'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q11',
        type: 'multiple_select',
        question: 'Które są objawami pozytywnymi schizofrenii? Wybierz wszystkie pasujące.',
        options: ['Halucynacje', 'Zmniejszona ekspresja emocjonalna', 'Urojenia', 'Zdezorganizowana mowa'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c3-q12',
        type: 'numeric',
        question: 'Ile żyć zabrała epidemia opioidów w Stanach Zjednoczonych od 1999 roku (w tysiącach)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'tysięcy',
      },
      {
        id: 'health-medicine-c3-q13',
        type: 'single_choice',
        question: 'Jaka jest przybliżona życiowa częstość występowania PTSD u Amerykanów?',
        options: ['Około 3 procent', 'Około 7 procent', 'Około 15 procent', 'Około 25 procent'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q14',
        type: 'numeric',
        question: 'Około ile żyć zabiera samobójstwo globalnie każdego roku (w tysiącach)?',
        correctValue: 700,
        tolerance: 50,
        min: 500,
        max: 1000,
        step: 50,
        unit: 'tysięcy',
      },
      {
        id: 'health-medicine-c3-q15',
        type: 'true_false',
        question: 'Kobiety umierają przez samobójstwo w wyższych wskaźnikach niż mężczyźni w większości krajów.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q16',
        type: 'single_choice',
        question: 'Które metody leczenia są badane dla depresji i PTSD po dziesięcioleciach zakazu?',
        options: ['SSRI i MAOI', 'Psylocybina i MDMA', 'Imipramina i iproniazyd', 'Chlorpromazyna i haloperydol'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q17',
        type: 'numeric',
        question: 'Ile sesji zazwyczaj wymaga CBT?',
        correctValue: 16,
        tolerance: 4,
        min: 8,
        max: 30,
        step: 2,
        unit: 'sesji',
      },
    ],
  },
  {
    id: 'health-medicine-p06',
    topicId: 'health-medicine',
    title: 'Mikrobiom jelitowy: Twój wewnętrzny ekosystem',
    difficulty: 'intermediate',
    wordCount: 1914,
    articleType: 'practice',
    orderIndex: 6,
    content: `Ludzkie jelita zawierają biliony mikroorganizmów, które wpływają na zdrowie w sposób, który naukowcy dopiero zaczynają rozumieć. Ten złożony ekosystem, znany jako mikrobiom jelitowy, odgrywa kluczowe role w trawieniu, odporności, zdrowiu psychicznym i zapobieganiu chorobom. Badania nad tym ukrytym światem zrewolucjonizowały sposób, w jaki specjaliści medyczni myślą o biologii człowieka i otworzyły obiecujące nowe podejścia do leczenia chorób.

Przeciętna osoba dorosła nosi około 38 bilionów komórek bakteryjnych, mniej więcej tyle samo, ile komórek ludzkich w ciele. Większość tych drobnoustrojów zamieszkuje przewód pokarmowy, szczególnie jelito grube, gdzie warunki sprzyjają wzrostowi bakterii. Zidentyfikowano ponad 1000 różnych gatunków bakterii w jelitach ludzkich, chociaż każda osoba zazwyczaj jest gospodarzem od 150 do 250 gatunków. Ta społeczność drobnoustrojów waży od jednego do dwóch kilogramów u typowej osoby dorosłej.

Mikrobiom jelitowy zaczyna się rozwijać przy urodzeniu i zmienia się przez całe życie. Dzieci urodzone naturalnie nabywają początkowe drobnoustroje z kanału rodnego, podczas gdy niemowlęta urodzone przez cesarskie cięcie po raz pierwszy stykają się z bakteriami ze środowiska szpitalnego i kontaktu ze skórą. Karmienie piersią dodatkowo kształtuje rozwijający się mikrobiom, dostarczając zarówno składniki odżywcze, jak i korzystne bakterie. Społeczność jelitowa pozostaje względnie niestabilna we wczesnym dzieciństwie, zanim ustabilizuje się w wzorce dorosłe około trzeciego roku życia.

Holenderski naukowiec Antonie van Leeuwenhoek po raz pierwszy zaobserwował mikroorganizmy w 1676 roku, używając mikroskopów, które sam zbudował, ale zrozumienie bakterii jelitowych pozostawało ograniczone przez stulecia. Rosyjski biolog Elie Metchnikoff zaproponował w 1907 roku, że pewne bakterie mogą przynosić korzyści zdrowiu człowieka, obserwując, że bułgarscy chłopi, którzy spożywali fermentowane produkty mleczne, żyli niezwykle długo. Jego pomysły na temat probiotyków spotkały się ze sceptycyzmem współczesnych, ale antycypowały odkrycia, które miały nastąpić dziesięciolecia później.

Nowoczesne badania nad mikrobiomem znacznie przyspieszyły po uruchomieniu w 2007 roku projektu Human Microbiome Project finansowanego przez National Institutes of Health. Ta ambitna inicjatywa miała na celu identyfikację i charakteryzację mikroorganizmów żyjących w ludzkim ciele i na nim. Postępy w technologii sekwencjonowania DNA umożliwiły identyfikację bakterii bez konieczności hodowania ich w kulturach laboratoryjnych. Naukowcy odkryli, że mikrobiom jelitowy zawiera około 100 razy więcej genów niż sam genom ludzki.

Mikrobiom jelitowy wykonuje istotne funkcje, których komórki ludzkie nie mogą wykonać samodzielnie. Niektóre bakterie rozkładają błonnik pokarmowy, którego enzymy ludzkie nie mogą strawić, wytwarzając krótkołańcuchowe kwasy tłuszczowe, które odżywiają komórki jelitowe. Inne drobnoustroje syntetyzują witaminy, w tym witaminę K i kilka witamin z grupy B, których organizm potrzebuje. Społeczność jelitowa pomaga również trenować układ odpornościowy, aby rozróżniać między szkodliwymi patogenami a korzystnymi organizmami.

Dieta ma głęboki wpływ na skład i funkcję mikrobiomu. Ludzie, którzy spożywają diety bogate w błonnik, zazwyczaj mają bardziej zróżnicowane społeczności bakteryjne niż ci jedzący przetworzoną żywność bogatą w cukier i tłuszcz. Tradycyjne diety w wiejskiej Afryce, bogate w błonnik roślinny, wytwarzają mikrobiomy dramatycznie różniące się od tych obserwowanych w populacjach zachodnich. Zmiany w diecie mogą zmienić skład mikrobiomu w ciągu zaledwie 24 godzin, chociaż powrót do starych wzorców żywieniowych zazwyczaj przywraca poprzednie populacje bakteryjne.

Antybiotyki niszczą społeczności bakterii jelitowych wraz ze szkodliwymi organizmami, na które są skierowane. Pojedynczy kurs antybiotyków może wyeliminować korzystne gatunki, które mogą potrzebować miesięcy lub lat na regenerację. Niektóre gatunki nigdy nie wracają, na stałe zmieniając skład mikrobiomu. To uboczne uszkodzenie wywołało rosnące obawy dotyczące nadużywania antybiotyków i zainteresowanie strategiami ochrony lub przywracania społeczności jelitowych podczas leczenia.

Badania powiązały zaburzenia mikrobiomu z rozszerzającą się listą schorzeń zdrowotnych. Choroby zapalne jelit, w tym choroba Crohna i wrzodziejące zapalenie jelita grubego, obejmują zmienione społeczności bakteryjne, które mogą wywołać lub pogorszyć stan zapalny jelit. Otyłość wydaje się związana ze składem mikrobiomu, a badania pokazują, że przeszczepienie bakterii jelitowych od otyłych myszy do szczupłych myszy powoduje przyrost wagi. Cukrzyca typu 2, choroby autoimmunologiczne i alergie zostały powiązane ze zmianami mikrobiomu.

Oś jelito-mózg stanowi jedną z najbardziej zaskakujących granic w badaniach nad mikrobiomem. Bakterie w jelitach komunikują się z mózgiem przez wiele ścieżek, w tym nerw błędny i chemiczne przekaźniki, które wchodzą do krwiobiegu. Badania wykazały różnice w bakteriach jelitowych między osobami z depresją lub lękiem a osobami bez tych schorzeń. Badania Johna Cryana z University College Cork wykazały, że określone szczepy bakteryjne mogą wpływać na nastrój i zachowanie zarówno u zwierząt, jak i ludzi.

Przeszczepienie flory bakteryjnej kału wyłoniło się jako niezwykle skuteczne leczenie nawracających zakażeń Clostridioides difficile. Ta procedura, która przenosi kał od zdrowego dawcy do jelit pacjenta, leczy około 90 procent przypadków, które nie odpowiedziały na antybiotyki. Pierwszy udany przeszczep kału dla tego schorzenia został wykonany w 1958 roku przez Bena Eisemana w Denver Veterans Administration Hospital, ale leczenie pozostawało niejasne, dopóki antybiotykooporny C. difficile nie stał się poważnym problemem.

Probiotyki, żywe mikroorganizmy mające na celu zapewnienie korzyści zdrowotnych, stały się branżą wartą miliardy dolarów pomimo ograniczonych dowodów na wiele zgłaszanych korzyści. Niektóre szczepy probiotyczne wykazały skuteczność w określonych schorzeniach, w tym biegunku związanej z antybiotykami i niektórych zaburzeniach trawiennych. Jednak wiele produktów komercyjnych nie ma dowodów skuteczności, a probiotyki, które pomagają jednej osobie, mogą nie przynosić korzyści innej z powodu różnic w indywidualnym mikrobiomie.

Prebiotyki oferują alternatywne podejście poprzez karmienie korzystnych bakterii już obecnych w jelitach. Te niestrawne składniki żywności, znajdujące się w żywności, takiej jak czosnek, cebula, banany i pełne ziarna, selektywnie promują wzrost pomocnych gatunków bakteryjnych. Łączenie prebiotyków z probiotykami tworzy synbiotyki, które mogą zapewnić zwiększone korzyści, chociaż badania nadal określają optymalne kombinacje i dawki.

Mikrobiom znacznie różni się między osobami, co sprawia, że spersonalizowane podejścia stają się coraz ważniejsze. Naukowcy z Instytutu Weizmanna w Izraelu wykazali w 2015 roku, że odpowiedzi poziomu cukru we krwi na identyczne pokarmy różnią się dramatycznie między ludźmi, a skład mikrobiomu pomaga wyjaśnić tę wariację. To odkrycie sugeruje, że zalecenia żywieniowe mogą ostatecznie być dostosowane na podstawie indywidualnych profili mikrobiomów.

Przyszłe zastosowania nauki o mikrobiomie mogą przekształcić medycynę w głęboki sposób. Naukowcy opracowują techniki precyzyjnej edycji składu mikrobiomu, dodając lub usuwając określone gatunki w celu leczenia chorób. Wyhodowane bakterie mogą dostarczać leki bezpośrednio do chorych tkanek lub produkować cząsteczki terapeutyczne w jelitach. Zrozumienie, jak mikrobiom wpływa na metabolizm leków, może poprawić skuteczność leczenia i zmniejszyć skutki uboczne.

Mikrobiom jelitowy przypomina nam, że ludzie nie są izolowanymi organizmami, ale ekosystemami goszczącymi niezliczonych mikrobiologicznych partnerów. Ci niewidoczni mieszkańcy wpływają na nasze zdrowie, nastrój, a nawet zachowanie poprzez mechanizmy, które dopiero zaczynamy doceniać. Pielęgnowanie tego wewnętrznego ekosystemu poprzez dietę, wybory stylu życia i roztropne stosowanie antybiotyków może okazać się równie ważne jak każda inna praktyka zdrowotna, którą przyjmujemy.`,
    questions: [
      {
        id: 'health-medicine-p06-q1',
        type: 'single_choice',
        question: 'Około ile komórek bakteryjnych nosi przeciętna osoba dorosła?',
        options: ['1 bilion', '10 bilionów', '38 bilionów', '100 bilionów'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q2',
        type: 'single_choice',
        question: 'Kiedy rozpoczął się projekt Human Microbiome Project?',
        options: ['1958', '1976', '2007', '2015'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q3',
        type: 'multiple_select',
        question: 'Które funkcje wykonuje mikrobiom jelitowy? Wybierz wszystkie pasujące.',
        options: [
          'Rozkładanie błonnika pokarmowego',
          'Synteza witamin',
          'Pompowanie krwi',
          'Trenowanie układu odpornościowego',
        ],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p06-q4',
        type: 'true_false',
        question: 'Elie Metchnikoff zaproponował w 1907 roku, że pewne bakterie mogą przynosić korzyści zdrowiu człowieka.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p06-q5',
        type: 'numeric',
        question: 'Jaki procent nawracających zakażeń C. difficile leczy przeszczepienie flory bakteryjnej kału?',
        correctValue: 90,
        tolerance: 5,
        min: 50,
        max: 100,
        step: 5,
        unit: 'procent',
      },
      {
        id: 'health-medicine-p06-q6',
        type: 'single_choice',
        question: 'Kto wykonał pierwszy udany przeszczep kału dla C. difficile?',
        options: ['Antonie van Leeuwenhoek', 'Elie Metchnikoff', 'Ben Eiseman', 'John Cryan'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q7',
        type: 'single_choice',
        question: 'Około którego roku życia mikrobiom jelitowy ustabilizuje się w wzorce dorosłe?',
        options: ['Przy urodzeniu', 'Rok', 'Trzy lata', 'Adolescencja'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q8',
        type: 'numeric',
        question: 'Ile różnych gatunków bakterii zidentyfikowano w jelitach ludzkich (powyżej jakiej liczby)?',
        correctValue: 1000,
        tolerance: 100,
        min: 500,
        max: 2000,
        step: 100,
        unit: 'gatunków',
      },
      {
        id: 'health-medicine-p06-q9',
        type: 'true_false',
        question: 'Mikrobiom jelitowy zawiera około 100 razy więcej genów niż genom ludzki.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-p07',
    topicId: 'health-medicine',
    title: 'Genetyka i dziedziczność: Kod życia',
    difficulty: 'advanced',
    wordCount: 2280,
    articleType: 'practice',
    orderIndex: 7,
    content: `Genetyka to nauka o dziedziczności, wyjaśniająca, jak cechy przechodzą od rodziców do potomstwa poprzez informacje zakodowane w DNA. Ta dziedzina przekształciła nasze rozumienie samego życia i umożliwiła postępy medyczne, od testów genetycznych po terapię genową. Historia genetyki rozciąga się od starożytnych obserwacji dotyczących dziedziczenia po najnowocześniejsze technologie, które mogą edytować sam projekt żywych organizmów.

Gregor Mendel, augustianin pracujący w ogrodzie klasztornym w Brnie w Austrii, odkrył fundamentalne prawa dziedziczenia poprzez staranne eksperymenty z roślinami grochu. Między 1856 a 1863 rokiem Mendel skrzyżował około 29 000 roślin grochu, skrupulatnie rejestrując, jak cechy takie jak kolor nasion, kształt strąka i wysokość rośliny przechodziły z pokolenia na pokolenie. Jego praca ujawniła, że czynniki dziedziczne występują w parach, a potomstwo otrzymuje jeden czynnik od każdego rodzica.

Mendel przedstawił swoje odkrycia Towarzystwu Historii Naturalnej w Brnie w lutym i marcu 1865 roku, a następnie opublikował je w następnym roku. Społeczność naukowa w dużej mierze zignorowała jego rewolucyjne odkrycia za jego życia. Mendel zmarł w styczniu 1884 roku, nie wiedząc, że jego praca przyniesie mu w końcu uznanie jako ojciec genetyki. Trzech naukowców niezależnie odkryło na nowo jego zasady w 1900 roku, w końcu zwracając uwagę na spostrzeżenia poczynione dziesięciolecia wcześniej.

Chromosomy, struktury niosące informacje genetyczne, zostały odkryte pod koniec XIX wieku. Niemiecki biolog Walther Flemming zaobserwował chromosomy podczas podziału komórkowego w 1882 roku i opisał proces, który nazwał mitozą. Amerykański naukowiec Walter Sutton zaproponował w 1902 roku, że chromosomy niosą czynniki dziedziczne Mendla, łącząc biologię komórkową z powstającą nauką o genetyce.

Thomas Hunt Morgan ustalił chromosomową teorię dziedziczenia poprzez eksperymenty z muszkami owocowymi prowadzone na Uniwersytecie Columbia od 1908 roku. Jego pokój z muszkami stał się legendarny dla przełomowych odkryć dotyczących tego, jak geny są uporządkowane na chromosomach. Morgan odkrył, że pewne cechy mają tendencję do dziedziczenia razem, ponieważ geny je kontrolujące leżą na tym samym chromosomie. Otrzymał Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 1933 roku za wykazanie roli chromosomów w dziedziczności.

Natura samych genów pozostawała tajemnicza, dopóki biologia molekularna nie ujawniła ich chemicznej podstawy. Oswald Avery i współpracownicy wykazali w 1944 roku, że DNA niesie informacje genetyczne, chociaż wielu naukowców pozostawało sceptycznych przez wiele lat później. James Watson i Francis Crick określili podwójną helisę DNA w 1953 roku, otwierając współczesną erę genetyki molekularnej. Ich odkrycie wyjaśniło, jak informacje genetyczne mogą być przechowywane i kopiowane z niezwykłą wiernością.

DNA składa się z dwóch nici owiniętych wokół siebie, połączonych parami zasad zgodnie z określonymi regułami parowania. Adenina zawsze paruje się z tyminą, podczas gdy guanina zawsze paruje się z cytozyną. Ta komplementarna struktura oznacza, że każda nić może służyć jako szablon do tworzenia identycznej kopii podczas podziału komórkowego. Sekwencja zasad wzdłuż nici DNA koduje informacje genetyczne podobnie jak litery tworzą słowa w zdaniu.

Geny to segmenty DNA zawierające instrukcje budowania białek, cząsteczek wykonujących większość funkcji komórkowych. Genom ludzki zawiera około 20 000 genów kodujących białka rozmieszczonych na 23 parach chromosomów. Każdy gen może istnieć w różnych wersjach zwanych allelami, wyjaśniając, dlaczego osobniki różnią się określonymi cechami. Kompletny zestaw instrukcji genetycznych w organizmie nazywa się jego genomem.

Kod genetyczny został rozszyfrowany w latach 60. XX wieku dzięki pracy wielu grup badawczych. Marshall Nirenberg i Heinrich Matthaei złamali pierwszy kodon w 1961 roku, pokazując, że trzy zasady DNA określają jeden aminokwas. Do 1966 roku naukowcy określili, jak wszystkie 64 możliwe kombinacje trzech zasad odpowiadają 20 aminokwasom używanym do budowania białek. Ten uniwersalny kod działa w praktycznie wszystkich formach życia, od bakterii po ludzi.

Mutacje genetyczne występują, gdy sekwencje DNA się zmieniają, czasami wpływając na białka, które kodują. Niektóre mutacje powstają spontanicznie podczas replikacji DNA, podczas gdy inne wynikają z czynników środowiskowych, takich jak promieniowanie lub pewne substancje chemiczne. Większość mutacji ma niewielki lub żaden wpływ, ale niektóre powodują choroby genetyczne, podczas gdy inne okazjonalnie zapewniają korzyści, które ewolucja może wybrać. Choroba sierpowatokrwinkowa, mukowiscydoza i choroba Huntingtona wynikają z określonych mutacji genetycznych.

Projekt Genomu Ludzkiego, uruchomiony w 1990 roku i ukończony w kwietniu 2003 roku, określił kompletną sekwencję ludzkiego DNA. Ten międzynarodowy wysiłek obejmował naukowców z 20 instytucji w sześciu krajach i kosztował około 2,7 miliarda dolarów. Projekt zidentyfikował lokalizację wszystkich genów ludzkich i dostarczył sekwencję referencyjną, która umożliwiła niezliczone późniejsze odkrycia. Dziś sekwencjonowanie genomu jednostki kosztuje mniej niż tysiąc dolarów i zajmuje tylko godziny.

Testy genetyczne stały się coraz bardziej dostępne, umożliwiając osobom poznanie ich składu genetycznego i ryzyka chorób. Testy mogą zidentyfikować nosicieli schorzeń, takich jak choroba Taya-Sachsa lub niedokrwistość sierpowata, którzy mogą przekazać te cechy dzieciom. Badanie przesiewowe noworodków pod kątem leczalnych schorzeń genetycznych stało się standardową praktyką w większości krajów rozwiniętych. Usługi testów genetycznych skierowanych bezpośrednio do konsumenta uruchomione przez firmy takie jak 23andMe dostarczyły informacje genetyczne milionom ludzi.

Farmakogenomika bada, jak wariacje genetyczne wpływają na reakcje na leki. Niektórzy ludzie metabolizują niektóre leki szybko, podczas gdy inni przetwarzają je powoli, wpływając zarówno na skuteczność, jak i skutki uboczne. FDA zaktualizowała etykiety ponad 200 leków o informacje genetyczne istotne dla ich zastosowania. Lekarze coraz częściej stosują testy genetyczne do wyboru leków i dawek najlepiej dostosowanych do indywidualnych pacjentów.

Terapia genowa ma na celu leczenie chorób genetycznych poprzez wprowadzenie funkcjonalnych kopii wadliwych genów do komórek pacjentów. Pierwsza udana terapia genowa u ludzi miała miejsce we wrześniu 1990 roku, kiedy William French Anderson leczył czteroletnią dziewczynkę z ciężkim złożonym niedoborem odporności w National Institutes of Health. Postęp był powolny z powodu wyzwań technicznych i obaw dotyczących bezpieczeństwa, ale ostatnie lata przyniosły zatwierdzenie regulacyjne wielu terapii genowych.

Technologia edycji genów CRISPR-Cas9, opracowana z bakteryjnych systemów odpornościowych, zrewolucjonizowała badania genetyczne od czasu, gdy Jennifer Doudna i Emmanuelle Charpentier opublikowały swój przełomowy artykuł w czerwcu 2012 roku. To narzędzie pozwala naukowcom dokonywać precyzyjnych zmian w sekwencjach DNA z bezprecedensową łatwością i dokładnością. Doudna i Charpentier otrzymały Nagrodę Nobla w dziedzinie chemii w 2020 roku za swoje odkrycie. CRISPR ma potencjalne zastosowania, od leczenia chorób genetycznych po tworzenie upraw odpornych na choroby.

Etyczne implikacje technologii genetycznych nadal generują debatę. Testy genetyczne rodzą pytania dotyczące prywatności, dyskryminacji i psychologicznych skutków poznania ryzyka chorób. Terapia genowa i edycja zmuszają do rozważenia, które schorzenia powinny być leczone i czy wzmocnienie normalnych cech jest akceptowalne. Narodziny pierwszych dzieci edytowanych genetycznie w Chinach w listopadzie 2018 roku wywołały międzynarodowe potępienie i podkreśliły potrzebę nadzoru nad technologiami genetycznymi.

Genetyka przekształciła się z obserwowania wzorców dziedziczenia w groszku ogrodowym do odczytywania i edytowania molekularnego kodu życia. Ta wiedza przynosi zarówno ogromną obietnicę, jak i znaczną odpowiedzialność. Zrozumienie genetyki daje jednostkom możliwość podejmowania świadomych decyzji zdrowotnych, jednocześnie stawiając społeczeństwo przed głębokimi pytaniami o to, co to znaczy być człowiekiem w erze, w której nasze przeznaczenie genetyczne nie jest już ustalone.`,
    questions: [
      {
        id: 'health-medicine-p07-q1',
        type: 'single_choice',
        question: 'Ile roślin grochu skrzyżował Gregor Mendel w swoich eksperymentach?',
        options: ['Około 5 000', 'Około 10 000', 'Około 29 000', 'Około 50 000'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q2',
        type: 'single_choice',
        question: 'Kto otrzymał Nagrodę Nobla w 1933 roku za wykazanie roli chromosomów w dziedziczności?',
        options: ['Gregor Mendel', 'Thomas Hunt Morgan', 'Walter Sutton', 'Walther Flemming'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q3',
        type: 'multiple_select',
        question: 'Którzy naukowcy przyczynili się do odkrycia struktury lub funkcji DNA? Wybierz wszystkie pasujące.',
        options: ['Oswald Avery', 'James Watson', 'Francis Crick', 'Gregor Mendel'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'health-medicine-p07-q4',
        type: 'true_false',
        question: 'Projekt Genomu Ludzkiego został ukończony w kwietniu 2003 roku.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p07-q5',
        type: 'numeric',
        question: 'Około ile genów kodujących białka zawiera genom ludzki?',
        correctValue: 20000,
        tolerance: 2000,
        min: 10000,
        max: 40000,
        step: 1000,
        unit: 'genów',
      },
      {
        id: 'health-medicine-p07-q6',
        type: 'single_choice',
        question: 'Kiedy przeprowadzono pierwszą udaną terapię genową u ludzi?',
        options: ['Styczeń 1884', 'Wrzesień 1990', 'Kwiecień 2003', 'Czerwiec 2012'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q7',
        type: 'single_choice',
        question: 'Kto opracował technologię edycji genów CRISPR-Cas9?',
        options: ['Watson i Crick', 'Mendel i Morgan', 'Doudna i Charpentier', 'Nirenberg i Matthaei'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q8',
        type: 'numeric',
        question: 'Ile kosztował Projekt Genomu Ludzkiego (w miliardach dolarów)?',
        correctValue: 2.7,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'miliardów dolarów',
      },
      {
        id: 'health-medicine-p07-q9',
        type: 'true_false',
        question: 'Adenina zawsze paruje się z guaniną w DNA.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p07-q10',
        type: 'single_choice',
        question: 'W którym roku Doudna i Charpentier opublikowały swój przełomowy artykuł CRISPR?',
        options: ['2003', '2008', '2012', '2020'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q11',
        type: 'numeric',
        question: 'W którym roku trzej naukowcy niezależnie odkryli na nowo zasady Mendla?',
        correctValue: 1900,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'rok',
      },
    ],
  },
  {
    id: 'health-medicine-p08',
    topicId: 'health-medicine',
    title: 'Choroby zakaźne: Walka z patogenami',
    difficulty: 'advanced',
    wordCount: 2547,
    articleType: 'practice',
    orderIndex: 8,
    content: `Choroby zakaźne ukształtowały historię ludzkości bardziej dramatycznie niż wojny, klęski głodu czy katastrofy naturalne, zabijając miliardy ludzi i zmieniając bieg cywilizacji. Te schorzenia wynikają z patogenicznych mikroorganizmów, w tym bakterii, wirusów, grzybów i pasożytów, które atakują organizm i zakłócają normalne funkcje. Zrozumienie, jak te patogeny rozprzestrzeniają się i wywołują choroby, umożliwiło interwencje medyczne, które uratowały niezliczone życia.

Teoria zarazków choroby, rozwinięta w XIX wieku, przekształciła medycynę, ustalając, że określone mikroorganizmy powodują określone choroby. Francuski chemik Louis Pasteur przeprowadził kluczowe eksperymenty w latach 60. XIX wieku, wykazując, że mikroorganizmy powodują fermentację i psucie się, a następnie rozszerzył tę pracę, aby pokazać, że zarazki mogą powodować choroby u zwierząt i ludzi. Niemiecki lekarz Robert Koch ustalił rygorystyczne kryteria udowadniania, że określony mikroorganizm powoduje określoną chorobę, publikując swoje słynne postulaty w 1890 roku.

Praca Kocha nad gruźlicą stanowiła przykład siły nowego podejścia do chorób zakaźnych. Zidentyfikował Mycobacterium tuberculosis jako czynnik sprawczy gruźlicy w 1882 roku, odkrycie, które przyniosło mu Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 1905 roku. Gruźlica zabiła około jednej czwartej wszystkich dorosłych w Europie w XIX wieku, co sprawia, że identyfikacja bakterii przez Kocha była ważnym kamieniem milowym zdrowia publicznego.

Bakterie to jednokomórkowe organizmy, które mogą przetrwać i rozmnażać się niezależnie od komórek gospodarza. Niektóre bakterie powodują choroby, wytwarzając toksyny, podczas gdy inne uszkadzają tkanki bezpośrednio poprzez wzrost i metabolizm. Antybiotyki działają przeciwko zakażeniom bakteryjnym, celując w cechy unikalne dla komórek bakteryjnych, takie jak synteza ściany komórkowej lub mechanizmy produkcji białek, które różnią się od tych w komórkach ludzkich.

Wirusy reprezentują fundamentalnie inny typ patogena, który nie może rozmnażać się poza komórkami gospodarza. Te maleńkie cząstki składają się z materiału genetycznego otoczonego osłonką białkową, a czasami zewnętrzną membraną. Wirusy przejmują maszynerię komórkową zainfekowanych komórek, aby produkować kopie siebie, często zabijając komórkę gospodarza w procesie. Antybiotyki nie mają wpływu na zakażenia wirusowe, co sprawia, że zapobieganie poprzez szczepienia i leki przeciwwirusowe to główne strategie przeciwko chorobom wirusowym.

Pandemia grypy z 1918 roku wykazała niszczący potencjał chorób wirusowych we współczesnym świecie. Ten wybuch zaraził około 500 milionów ludzi, mniej więcej jedną trzecią światowej populacji w tamtym czasie. Szacunki zgonów wahają się od 50 do 100 milionów ludzi, co czyni ją jednym z najbardziej śmiertelnych wydarzeń w historii ludzkości. Wirus rozprzestrzenił się szybko poprzez ruchy wojsk podczas I wojny światowej i przytłoczył systemy medyczne, które nie miały antybiotyków ani leków przeciwwirusowych do zaoferowania.

HIV i AIDS wyłoniły się jako nowe zagrożenie chorób zakaźnych na początku lat 80. XX wieku, ostatecznie zabijając ponad 40 milionów ludzi na całym świecie. Amerykańscy naukowcy Robert Gallo oraz francuscy naukowcy Luc Montagnier i Francoise Barre-Sinoussi zidentyfikowali wirusa w 1983 i 1984 roku. Opracowanie terapii antyretrowirusowej w połowie lat 90. XX wieku przekształciło HIV z wyroku śmierci w możliwą do opanowania chorobę przewlekłą dla osób z dostępem do leczenia. Montagnier i Barre-Sinoussi otrzymali Nagrodę Nobla w dziedzinie fizjologii lub medycyny w 2008 roku za swoje odkrycie.

Choroby pasożytnicze dotykają miliardy ludzi na całym świecie, głównie w regionach tropikalnych i subtropikalnych. Malaria, wywoływana przez pasożyty Plasmodium przenoszone przez ukąszenia komarów, zabija około 600 000 osób rocznie, głównie dzieci poniżej piątego roku życia w Afryce Subsaharyjskiej. Chińska naukowiec Tu Youyou odkryła artemizininę jako skuteczne leczenie przeciwmalaryczne poprzez badanie tradycyjnej medycyny chińskiej, zdobywając Nagrodę Nobla w 2015 roku za ten ratujący życie wkład.

Grzyby powodują zakażenia od drobnych schorzeń skóry po zagrażające życiu choroby ogólnoustrojowe. Zakażenia grzybicze wzrosły w ostatnich dziesięcioleciach, ponieważ leczenie immunosupresyjne i urządzenia medyczne stwarzają możliwości dla patogenów oportunistycznych. Candida auris, po raz pierwszy zidentyfikowana w Japonii w 2009 roku, rozprzestrzeniła się globalnie i jest odporna na wiele leków przeciwgrzybiczych, stanowiąc pojawiające się zagrożenie, które szczególnie dotyka pacjentów hospitalizowanych.

Drogi przenoszenia różnią się między różnymi patogenami i określają odpowiednie strategie zapobiegania. Patogeny układu oddechowego rozprzestrzeniają się poprzez kropelki lub aerozole wytwarzane, gdy zakażone osoby kaszlą, kichają lub oddychają. Patogeny przewodu pokarmowego rozprzestrzeniają się poprzez skażoną żywność lub wodę. Patogeny przenoszone przez krew wymagają bezpośredniego kontaktu z zakażoną krwią lub płynami ustrojowymi. Patogeny przenoszone przez wektory używają owadów lub innych zwierząt do przenoszenia ich między ludźmi.

Epidemiologia bada, jak choroby rozprzestrzeniają się w populacjach i identyfikuje czynniki wpływające na transmisję. John Snow przeprowadził pionierską pracę epidemiologiczną podczas wybuchu cholery w Londynie w 1854 roku, mapując przypadki i określając, że skażona woda z pompy Broad Street rozprzestrzeniała chorobę. Jego praca poprzedzała teorię zarazków, ale wykazała moc systematycznego dochodzenia w identyfikacji źródeł chorób i zapobieganiu dalszemu rozprzestrzenianiu.

Szczepienia pozostają najbardziej skutecznym narzędziem zapobiegania chorobom zakaźnym. Eradykacja ospy, certyfikowana przez Światową Organizację Zdrowia 9 grudnia 1979 roku, wykazała, że skoordynowane kampanie szczepień mogą całkowicie wyeliminować chorobę. Liczba przypadków polio zmniejszyła się o ponad 99 procent od czasu uruchomienia Globalnej Inicjatywy Eliminacji Polio w 1988 roku, a tylko rozproszone przypadki pozostają w kilku krajach.

Środki zdrowia publicznego poza szczepieniami odgrywają kluczowe role w kontrolowaniu chorób zakaźnych. Czysta woda i sanitacja dramatycznie zmniejszyły transmisję chorób przenoszonych przez wodę w krajach rozwiniętych w XX wieku. Higiena rąk, promowana przez węgierskiego lekarza Ignaza Semmelweisa w latach 40. XIX wieku, zapobiega transmisji wielu patogenów. Środki kwarantanny i izolacji spowalniają rozprzestrzenianie się chorób zakaźnych poprzez oddzielenie zakażonych lub narażonych osób od zdrowej populacji.

Oporność na leki przeciwdrobnoustrojowe grozi odwróceniem postępu przeciwko chorobom zakaźnym poprzez sprawianie, że patogeny nie reagują na leczenie, które kiedyś działało skutecznie. Światowa Organizacja Zdrowia szacuje, że zakażenia odporne na leki przeciwdrobnoustrojowe powodują już około 1,27 miliona zgonów rocznie na całym świecie. Nadużywanie i niewłaściwe stosowanie antybiotyków w medycynie i rolnictwie przyspiesza rozwój oporności, podczas gdy przemysł farmaceutyczny w dużej mierze porzucił badania nad antybiotykami z powodu ograniczonego potencjału zysku.

Pandemia COVID-19, która rozpoczęła się pod koniec 2019 roku, wykazała zarówno trwające zagrożenie pojawiających się chorób zakaźnych, jak i moc nowoczesnej nauki medycznej do reagowania. Wirus SARS-CoV-2 rozprzestrzenił się globalnie w ciągu miesięcy, infekując setki milionów ludzi i zabijając ponad 6 milionów do 2023 roku. Naukowcy opracowali skuteczne szczepionki w mniej niż rok, używając nowej technologii mRNA, co stanowi niezwykłe osiągnięcie oparte na dziesięcioleciach wcześniejszych badań.

Zmiany klimatu wpływają na wzorce chorób zakaźnych poprzez zmianę zasięgów geograficznych owadów przenoszących choroby i warunków, które pozwalają patogenom przetrwać w środowisku. Komary przenoszące dengę, wirusa Zika i inne choroby ekspandują na uprzednio umiarkowane regiony. Ocieplenie temperatur może uwalniać starożytne patogeny zachowane w wiecznej zmarzlinie w miarę jej topnienia. Te zmiany wymagają ciągłej vigilancji i adaptacji strategii zdrowia publicznego.

Globalne bezpieczeństwo zdrowotne zależy od międzynarodowej współpracy w wykrywaniu i reagowaniu na wybuchy chorób, zanim się rozprzestrzenią. Światowa Organizacja Zdrowia koordynuje globalne wysiłki nadzoru i reagowania zgodnie z Międzynarodowymi Regulacjami Zdrowotnymi przyjętymi w 2005 roku. Jednak napięcia polityczne, ograniczenia zasobów i różne zdolności narodowe stanowią wyzwanie dla skutecznej koordynacji. Pandemia COVID-19 ujawniła zarówno znaczenie globalnej współpracy, jak i trudności w osiągnięciu jej w praktyce.

Badania nadal rozwijają nasze zrozumienie chorób zakaźnych i opracowują nowe narzędzia do walki z nimi. Sekwencjonowanie genomowe pozwala na szybką identyfikację patogenów i śledzenie rozprzestrzeniania się chorób. Sztuczna inteligencja wspiera odkrywanie leków i przewidywanie wybuchów. Nowe platformy szczepień obiecują szybszy rozwój szczepionek przeciwko pojawiającym się zagrożeniom. Te postępy dają nadzieję, że ludzkość może nadal wygrywać bitwy z mikroorganizmami, które zagrażały nam przez całą historię.`,
    questions: [
      {
        id: 'health-medicine-p08-q1',
        type: 'single_choice',
        question: 'Kto opracował teorię zarazków choroby poprzez kluczowe eksperymenty w latach 60. XIX wieku?',
        options: ['Robert Koch', 'Louis Pasteur', 'John Snow', 'Ignaz Semmelweis'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q2',
        type: 'single_choice',
        question: 'Kiedy opublikowano identyfikację bakterii gruźlicy przez Roberta Kocha?',
        options: ['1854', '1882', '1890', '1905'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q3',
        type: 'multiple_select',
        question: 'Które rodzaje patogenów powodują choroby zakaźne? Wybierz wszystkie pasujące.',
        options: ['Bakterie', 'Wirusy', 'Przeciwciała', 'Pasożyty'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p08-q4',
        type: 'true_false',
        question: 'Antybiotyki są skuteczne przeciwko zakażeniom wirusowym.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p08-q5',
        type: 'numeric',
        question: 'Około ile osób zostało zakażonych podczas pandemii grypy z 1918 roku (w milionach)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'milionów',
      },
      {
        id: 'health-medicine-p08-q6',
        type: 'single_choice',
        question: 'Kto przeprowadził pionierską pracę epidemiologiczną podczas wybuchu cholery w Londynie w 1854 roku?',
        options: ['Louis Pasteur', 'Robert Koch', 'John Snow', 'Tu Youyou'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q7',
        type: 'single_choice',
        question: 'Kiedy Światowa Organizacja Zdrowia certyfikowała eradykację ospy?',
        options: ['9 grudnia 1979', '1 stycznia 1988', '15 października 1990', '28 marca 2000'],
        correctIndex: 0,
      },
      {
        id: 'health-medicine-p08-q8',
        type: 'numeric',
        question: 'Ile zgonów rocznie powoduje malaria (około)?',
        correctValue: 600000,
        tolerance: 100000,
        min: 300000,
        max: 1000000,
        step: 50000,
        unit: 'zgonów',
      },
      {
        id: 'health-medicine-p08-q9',
        type: 'true_false',
        question: 'Tu Youyou odkryła artemizininę poprzez badanie tradycyjnej medycyny chińskiej.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p08-q10',
        type: 'single_choice',
        question: 'Kiedy Candida auris została po raz pierwszy zidentyfikowana?',
        options: ['1995 w Stanach Zjednoczonych', '2002 w Europie', '2009 w Japonii', '2015 w Brazylii'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q11',
        type: 'numeric',
        question: 'Ile zgonów rocznie szacuje się być powodowanych przez zakażenia odporne na leki przeciwdrobnoustrojowe (w milionach)?',
        correctValue: 1.27,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'milionów',
      },
    ],
  },
  {
    id: 'health-medicine-p09',
    topicId: 'health-medicine',
    title: 'Układ nerwowy: Zrozumienie naszych sieci neuronalnych',
    difficulty: 'advanced',
    wordCount: 2738,
    articleType: 'practice',
    orderIndex: 9,
    content: `Układ nerwowy koordynuje wszystkie aktywności ludzkiego ciała poprzez skomplikowaną sieć wyspecjalizowanych komórek, które transmitują sygnały elektryczne i chemiczne z niezwykłą szybkością. Ten system przetwarza informacje sensoryczne ze środowiska, kontroluje ruchy mięśni, reguluje funkcje narządów i generuje świadome doświadczenie, które nazywamy umysłem. Zrozumienie, jak działają neurony, zrewolucjonizowało medycynę i pogłębiło nasze uznanie dla złożoności biologii człowieka.

Układ nerwowy składa się z dwóch głównych działów, które współpracują bezproblemowo. Ośrodkowy układ nerwowy obejmuje mózg i rdzeń kręgowy, służąc jako centrum dowodzenia, które przetwarza informacje i generuje odpowiedzi. Obwodowy układ nerwowy obejmuje wszystkie nerwy rozciągające się w całym ciele, przenoszące sygnały między ośrodkowym układem nerwowym a mięśniami, narządami i receptorami sensorycznymi.

Neurony, fundamentalne jednostki układu nerwowego, liczą około 86 miliardów w samym ludzkim mózgu. Każdy neuron składa się z ciała komórki zawierającego jądro, dendrytów, które odbierają sygnały od innych neuronów, i aksonu, który transmituje sygnały do komórek docelowych. Niektóre aksony rozciągają się na ponad metr długości, łącząc rdzeń kręgowy z odległymi mięśniami w stopach.

Sygnały elektryczne podróżują wzdłuż neuronów poprzez proces zwany propagacją potencjału czynnościowego. W spoczynku neurony utrzymują ujemny ładunek elektryczny wewnątrz względem zewnątrz błony komórkowej. Gdy są wystarczająco stymulowane, kanały jonowe napięciowe otwierają się, pozwalając jonom sodu wpaść i odwracając potencjał błony. Ta depolaryzacja podróżuje wzdłuż aksonu jak fala, osiągając prędkości do 120 metrów na sekundę w neuronach zmielinizowanych.

Mielina, tłuszczasta substancja produkowana przez komórki glejowe, owija się wokół aksonów i dramatycznie zwiększa szybkość transmisji sygnałów. W ośrodkowym układzie nerwowym oligodendrocyty wytwarzają mielinę, podczas gdy komórki Schwanna wykonują tę funkcję w obwodowym układzie nerwowym. Stwardnienie rozsiane, choroba dotykająca około 2,8 miliona ludzi na całym świecie, wynika z ataków układu odpornościowego na mielinę, które zakłócają transmisję sygnałów nerwowych.

Synapsy to połączenia, w których neurony komunikują się ze sobą lub z komórkami docelowymi, takimi jak mięśnie. Gdy potencjał czynnościowy osiąga koniec aksonu, wywołuje uwolnienie chemicznych przekaźników zwanych neuroprzekaźnikami. Te cząsteczki przekraczają szczelinę synaptyczną i wiążą się z receptorami na komórce odbiorczej, albo pobudzając ją do wystrzału, albo hamując jej aktywność. Ludzki mózg zawiera szacunkowo 100 bilionów połączeń synaptycznych.

Neuroprzekaźniki obejmują różnorodną gamę substancji chemicznych o różnych funkcjach w całym układzie nerwowym. Dopamina odgrywa kluczowe role w motywacji, nagrodzie i kontroli ruchu, a jej dysfunkcja przyczynia się do choroby Parkinsona i uzależnienia. Serotonina reguluje nastrój, sen i apetyt, co czyni ją celem wielu leków przeciwdepresyjnych. Acetylocholina kontroluje skurcze mięśni i jest zaangażowana w tworzenie pamięci w mózgu.

Mózg wykazuje niezwykłą organizację z różnymi regionami wyspecjalizowanymi do różnych funkcji. Kora mózgowa, pomarszczona zewnętrzna warstwa pokrywająca mózg, zawiera obwody neuronowe dla świadomej myśli, percepcji sensorycznej, języka i ruchu dobrowolnego. Móżdżek koordynuje równowagę i precyzyjną kontrolę motoryczną poprzez połączenia z innymi regionami mózgu. Pień mózgu reguluje funkcje życiowe, takie jak oddychanie, tętno i cykle snu i czuwania.

Paul Broca zidentyfikował region w lewym płacie czołowym niezbędny do produkcji mowy po zbadaniu pacjentów z deficytami językowymi w 1861 roku. Carl Wernicke odkrył kolejny region w lewym płacie skroniowym ważny dla rozumienia języka w 1874 roku. Te odkrycia wykazały, że określone regiony mózgu wykonują określone funkcje, zasadę zwaną lokalizacją, która kieruje współczesną neuronauką.

Układ limbiczny, zbiór struktur głęboko w mózgu, generuje emocje i przetwarza wspomnienia. Ciało migdałowate wykrywa zagrożenia i wywołuje reakcje strachu, które przygotowują ciało na niebezpieczeństwo. Hipokamp konwertuje wspomnienia krótkotrwałe na długotrwałe przechowywanie, wyjaśniając, dlaczego uszkodzenie tej struktury powoduje poważne upośledzenia pamięci. Pacjent H.M., którego hipokamp został chirurgicznie usunięty w 1953 roku, aby leczyć ciężką epilepsję, stał się niezdolny do tworzenia nowych wspomnień, zachowując starsze.

Neuroplastyczność opisuje zdolność mózgu do reorganizowania się poprzez tworzenie nowych połączeń neuronowych przez całe życie. Ta zdolność pozwala na powrót do zdrowia po urazach, naukę nowych umiejętności i adaptację do zmieniających się okoliczności. Badania Michaela Merzenicha i współpracowników w latach 80. XX wieku wykazały, że dorosłe mózgi zachowują znacznie większą plastyczność niż wcześniej sądzono, otwierając nowe możliwości rehabilitacji po udarze i innych urazach.

Autonomiczny układ nerwowy kontroluje funkcje mimowolne, takie jak tętno, trawienie i oddychanie, bez świadomego wysiłku. Dział współczulny aktywuje się podczas stresu, zwiększając tętno, rozszerzając źrenice i kierując krew do mięśni w przygotowaniu do działania. Dział przywspółczulny dominuje podczas odpoczynku, spowalniając serce, stymulując trawienie i promując relaksację. Równowaga między tymi działami utrzymuje homeostazę.

Systemy sensoryczne tłumaczą fizyczne bodźce ze środowiska na sygnały neuronowe, które mózg może interpretować. System wzrokowy przetwarza światło wchodzące do oczu poprzez hierarchię etapów przetwarzania od siatkówki do kory wzrokowej. System słuchowy konwertuje fale dźwiękowe na sygnały neuronowe, zaczynając w ślimaku ucha wewnętrznego. Receptory dotyku, temperatury i bólu w całej skórze wysyłają sygnały przez rdzeń kręgowy do kory somatosensorycznej.

Systemy motoryczne koordynują setki mięśni wymaganych nawet do prostych ruchów. Pierwotna kora motoryczna zawiera mapę ciała, z różnymi regionami kontrolującymi różne mięśnie. Zwoje podstawy pomagają inicjować i koordynować ruchy dobrowolne, a ich dysfunkcja powoduje drżenia i sztywność choroby Parkinsona. Około 1 milion Amerykanów obecnie żyje z chorobą Parkinsona, liczba, która ma się podwoić do 2030 roku.

Sen obejmuje dramatyczne zmiany w aktywności mózgu, które służą istotnym funkcjom wciąż poznawanym. Podczas snu REM mózg staje się bardzo aktywny, podczas gdy mięśnie są tymczasowo sparaliżowane, stan związany z żywymi snami. Sen o powolnych falach wydaje się ważny dla konsolidacji pamięci i przywracania fizycznego. Brak snu upośledza funkcje poznawcze, odpowiedź immunologiczną i regulację emocjonalną, wykazując, jak kluczowy jest ten stan dla zdrowia mózgu.

Choroby neurologiczne dotykają milionów ludzi i stanowią rosnące wyzwania w miarę starzenia się populacji. Choroba Alzheimera obecnie dotyka około 6,7 miliona Amerykanów i powoduje progresywną utratę pamięci i upośledzenie poznawcze poprzez akumulację nieprawidłowych białek w mózgu. Udar, spowodowany zablokowanymi lub pękniętymi naczyniami krwionośnymi w mózgu, jest wiodącą przyczyną długotrwałej niepełnosprawności. Badania nad tymi schorzeniami intensyfikują się w miarę wzrostu ich rozpowszechnienia.

Współczesna neuronauka zatrudnia coraz bardziej zaawansowane narzędzia do badania mózgu. Funkcjonalny MRI mierzy aktywność mózgu poprzez wykrywanie zmian w przepływie krwi, ujawniając, które regiony aktywują się podczas różnych zadań. Elektroencefalografia rejestruje aktywność elektryczną na powierzchni skóry głowy, zapewniając precyzyjne informacje czasowe o procesach neuronowych. Optogenetyka, opracowana przez Karla Deisserota i współpracowników na początku XXI wieku, pozwala naukowcom kontrolować określone neurony za pomocą światła, umożliwiając bezprecedensową precyzję w badaniu obwodów mózgowych.

Układ nerwowy reprezentuje jedno z najbardziej niezwykłych osiągnięć natury, umożliwiając organizmom wyczuwanie ich środowiska, podejmowanie decyzji i wykonywanie skoordynowanych zachowań. Pomimo ogromnych postępów wiele tajemnic pozostaje na temat tego, jak aktywność neuronowa daje początek świadomości, emocjom i myśli. Dalsze badania obiecują zarówno głębsze zrozumienie ludzkiej natury, jak i lepsze leczenie schorzeń neurologicznych, które dotykają tak wiele istnień.`,
    questions: [
      {
        id: 'health-medicine-p09-q1',
        type: 'single_choice',
        question: 'Około ile neuronów znajduje się w ludzkim mózgu?',
        options: ['1 miliard', '10 miliardów', '86 miliardów', '200 miliardów'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q2',
        type: 'single_choice',
        question: 'Kto zidentyfikował region w lewym płacie czołowym niezbędny do produkcji mowy w 1861 roku?',
        options: ['Carl Wernicke', 'Paul Broca', 'Michael Merzenich', 'Karl Deisseroth'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q3',
        type: 'multiple_select',
        question: 'Które neuroprzekaźniki są wymienione w artykule? Wybierz wszystkie pasujące.',
        options: ['Dopamina', 'Serotonina', 'Insulina', 'Acetylocholina'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p09-q4',
        type: 'true_false',
        question: 'Stwardnienie rozsiane wynika z ataków układu odpornościowego na mielinę.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p09-q5',
        type: 'numeric',
        question: 'Około ile osób na całym świecie jest dotkniętych stwardnieniem rozsianym (w milionach)?',
        correctValue: 2.8,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'milionów',
      },
      {
        id: 'health-medicine-p09-q6',
        type: 'single_choice',
        question: 'Jaka jest funkcja hipokampu?',
        options: [
          'Wykrywanie zagrożeń i wywoływanie strachu',
          'Konwersja wspomnień krótkotrwałych na długotrwałe przechowywanie',
          'Kontrolowanie skurczów mięśni',
          'Regulowanie tętna',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q7',
        type: 'single_choice',
        question: 'Co robi współczulny układ nerwowy podczas stresu?',
        options: [
          'Spowalnia tętno i stymuluje trawienie',
          'Zwiększa tętno i rozszerza źrenice',
          'Promuje sen i relaksację',
          'Zmniejsza ciśnienie krwi',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q8',
        type: 'numeric',
        question: 'Ile połączeń synaptycznych szacuje się w ludzkim mózgu (w bilionach)?',
        correctValue: 100,
        tolerance: 10,
        min: 50,
        max: 200,
        step: 10,
        unit: 'bilionów',
      },
      {
        id: 'health-medicine-p09-q9',
        type: 'true_false',
        question: 'Pacjent H.M. był w stanie tworzyć nowe wspomnienia po usunięciu hipokampu.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p09-q10',
        type: 'single_choice',
        question: 'Co to jest optogenetyka?',
        options: [
          'Technika obrazowania mózgu',
          'Metoda kontrolowania określonych neuronów za pomocą światła',
          'Leczenie choroby Parkinsona',
          'Rodzaj elektroencefalografii',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q11',
        type: 'numeric',
        question: 'Ile Amerykanów obecnie żyje z chorobą Parkinsona (w milionach)?',
        correctValue: 1,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'milionów',
      },
      {
        id: 'health-medicine-p09-q12',
        type: 'single_choice',
        question: 'Z jaką maksymalną prędkością mogą podróżować sygnały w neuronach zmielinizowanych (metry na sekundę)?',
        options: ['10 metrów na sekundę', '50 metrów na sekundę', '120 metrów na sekundę', '300 metrów na sekundę'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q13',
        type: 'numeric',
        question: 'Ilu Amerykanów jest obecnie dotkniętych chorobą Alzheimera (w milionach)?',
        correctValue: 6.7,
        tolerance: 0.5,
        min: 4,
        max: 10,
        step: 0.1,
        unit: 'milionów',
      },
    ],
  },
  {
    id: 'health-medicine-p10',
    topicId: 'health-medicine',
    title: 'Obrazowanie medyczne: Widzenie wnętrza ludzkiego ciała',
    difficulty: 'advanced',
    wordCount: 2736,
    articleType: 'practice',
    orderIndex: 10,
    content: `Technologie obrazowania medycznego przekształciły diagnozowanie i leczenie, umożliwiając lekarzom widzenie wnętrza ludzkiego ciała bez chirurgii. Te narzędzia ujawniają struktury anatomiczne, wykrywają choroby, kierują interwencjami i monitorują odpowiedzi na leczenie z coraz większą precyzją i bezpieczeństwem. Rozwój obrazowania reprezentuje jeden z największych postępów medycyny, zdobywając wiele Nagród Nobla i ratując niezliczone życia.

Wilhelm Conrad Rontgen odkrył promienie X 8 listopada 1895 roku w Wurzburgu w Niemczech, eksperymentując z rurkami promieniowania katodowego. Zauważył, że fluorescencyjny ekran po drugiej stronie pokoju świecił, gdy jego rurka była aktywowana, wskazując, że jakieś niewidzialne promienie przechodzą przez przedmioty. W ciągu tygodni Rontgen wyprodukował pierwszy obraz rentgenowski części ludzkiego ciała, dłoni swojej żony Anny, wyraźnie pokazujący jej kości i obrączkę ślubną. Odkrycie przyniosło mu pierwszą Nagrodę Nobla w dziedzinie fizyki w 1901 roku.

Promienie X działają poprzez przepuszczanie promieniowania elektromagnetycznego przez ciało, przy czym różne tkanki absorbują różne ilości. Gęste struktury, takie jak kości, absorbują więcej promieni X i pojawiają się jako białe na obrazach, podczas gdy tkanki miękkie wyglądają na szare, a powietrze jako czarne. Ten kontrast pozwala wykryć złamania, guzy, zapalenie płuc i wiele innych schorzeń. Jednak napromieniowanie promieniami X niesie małe ryzyko radiacyjne, które musi być zrównoważone z korzyściami diagnostycznymi.

Tomografia komputerowa, czyli skanowanie CT, zrewolucjonizowała obrazowanie poprzez tworzenie szczegółowych obrazów przekrojowych ciała. Brytyjski inżynier Godfrey Hounsfield i południowoafrykański fizyk Allan Cormack niezależnie opracowali matematyczne i inżynieryjne zasady stojące za CT, dzieląc się Nagrodą Nobla w dziedzinie fizjologii lub medycyny w 1979 roku. Pierwszy kliniczny skaner CT został zainstalowany w Atkinson Morley Hospital w Londynie w 1971 roku, a technologia rozprzestrzeniła się szybko na całym świecie.

Skanery CT obracają źródła promieni X wokół pacjenta, podczas gdy detektory mierzą promieniowanie przechodzące z wielu kątów. Komputery rekonstruują te pomiary na szczegółowe obrazy plastrów ciała. Nowoczesne skanery CT mogą obrazować całe ciało w sekundy, tworząc trójwymiarowe rekonstrukcje, które ujawniają anatomię w niezwykłych szczegółach. CT kieruje teraz niezliczonymi decyzjami medycznymi, od określania stanu zaawansowania raka po ocenę urazów po ocenę tętnic wieńcowych.

Obrazowanie rezonansu magnetycznego, czyli MRI, tworzy szczegółowe obrazy za pomocą potężnych pól magnetycznych i fal radiowych, a nie promieniowania jonizującego. Amerykański lekarz Raymond Damadian wykazał w 1971 roku, że guzy i normalne tkanki mają różne właściwości magnetyczne, które można wykorzystać do diagnozy. Paul Lauterbur i Peter Mansfield opracowali techniki tworzenia przestrzennych obrazów z tych sygnałów, dzieląc się Nagrodą Nobla w dziedzinie fizjologii lub medycyny w 2003 roku.

Skanery MRI umieszczają pacjentów wewnątrz potężnych magnesów, które wyrównują atomy wodoru w wodzie ciała. Impulsy radiowe zakłócają to wyrównanie, a atomy emitują sygnały, gdy wracają do swojego pierwotnego stanu. Różne tkanki emitują różne sygnały na podstawie ich zawartości wody i środowiska chemicznego, tworząc kontrast, który ujawnia szczegóły tkanek miękkich niewidoczne dla promieni X. MRI wyróżnia się w obrazowaniu mózgu, rdzenia kręgowego,stawów i wielu innych struktur.

Obrazowanie ultrasonograficzne wykorzystuje fale dźwiękowe o wysokiej częstotliwości do wizualizacji struktur wewnętrznych w czasie rzeczywistym bez narażenia na promieniowanie. Przetwornik wysyła impulsy dźwiękowe do ciała i wykrywa echa powracające z granic tkanek. Ian Donald, szkocki położnik, był pionierem ultrasonografii medycznej w latach 50. XX wieku i opublikował pierwszy artykuł kliniczny o ultrasonografii położniczej w 1958 roku. Dziś ultrasonografia jest standardową metodą monitorowania ciąży i jest szeroko stosowana do wielu innych zastosowań.

Echokardiografia stosuje technologię ultrasonografii specjalnie do serca, ujawniając rozmiary komór, funkcję zastawek, wzorce przepływu krwi i nieprawidłowości ruchu ściany. Kardiolodzy używają echokardiografii do diagnozowania chorób zastawek serca, niewydolności serca, nieprawidłowości wrodzonych i wielu innych schorzeń. Technika jest bezpieczna, szeroko dostępna i może być wykonywana przy łóżku pacjenta, co czyni ją niezbędną do diagnozy kardiologicznej.

Obrazowanie medycyny nuklearnej wykrywa promieniowanie emitowane przez radioaktywne znaczniki wstrzykiwane pacjentom. Tomografia emisji pozytronowej, czyli skanowanie PET, wykorzystuje znaczniki, które emitują pozytony, które wytwarzają promienie gamma, gdy napotkają elektrony. PET ujawnia aktywność metaboliczną, a nie anatomię, co czyni ją cenną do wykrywania raka, oceny funkcji mózgu i oceny żywotności serca. Połączone skanery PET-CT łączą informacje metaboliczne i anatomiczne w pojedynczych badaniach.

Obrazowanie molekularne reprezentuje granicę wizualizacji diagnostycznej, ujawniając procesy biologiczne na poziomie komórkowym i molekularnym. Ukierunkowane znaczniki, które wiążą się z określonymi receptorami lub enzymami, mogą identyfikować procesy chorobowe, zanim zmiany anatomiczne staną się widoczne. To podejście umożliwia wcześniejsze wykrywanie, dokładniejszą charakteryzację chorób i monitorowanie odpowiedzi na leczenie na poziomie molekularnym.

Radiologia interwencyjna wykorzystuje kierowanie obrazowaniem do wykonywania minimalnie inwazyjnych procedur, które kiedyś wymagały otwartej chirurgii. Fluoroskopia zapewnia obrazy rentgenowskie w czasie rzeczywistym, które kierują umieszczaniem cewnika podczas angioplastyki, wstawiania stentu i innych procedur naczyniowych. Kierowanie CT pozwala na precyzyjne umieszczanie igły podczas biopsji i ablacji guza. Te techniki zmniejszają czasy rekonwalescencji, komplikacje i koszty w porównaniu z tradycyjną chirurgią.

Sztuczna inteligencja przekształca obrazowanie medyczne poprzez algorytmy uczenia maszynowego, które mogą wykrywać nieprawidłowości, kwantyfikować nasilenie choroby i przewidywać wyniki. Systemy głębokiego uczenia dorównały lub przekroczyły ludzkich radiologów w wykrywaniu niektórych schorzeń, w tym niektórych nowotworów i złamań. Narzędzia AI mogą priorytetyzować pilne przypadki, zmniejszać czasy interpretacji i potencjalnie poprawiać spójność między różnymi czytelnikami i instytucjami.

Bezpieczeństwo radiacyjne pozostaje ważnym czynnikiem, ponieważ wolumen obrazowania nadal rośnie. Przeciętny Amerykanin obecnie otrzymuje około 3 milisiewerty narażenia na promieniowanie medyczne rocznie, mniej więcej równe naturalnemu promieniowaniu tła. Strategie optymalizacji dawki mają na celu utrzymanie jakości obrazu przy minimalizacji narażenia na promieniowanie. Zasada ALARA, oznaczająca tak niską, jak to rozsądnie osiągalne, kieruje decyzjami dotyczącymi wykorzystania obrazowania i wyboru techniki.

Koszty i dostęp stanowią ciągłe wyzwania dla zaawansowanych technologii obrazowania. Pojedynczy skaner MRI lub CT kosztuje kilka milionów dolarów, z znacznymi bieżącymi wydatkami na konserwację, zaopatrzenie i personel. Te koszty przyczyniają się do wydatków na opiekę zdrowotną i tworzą różnice w dostępie między bogatymi i biednymi krajami oraz społecznościami. Wysiłki w celu opracowania tańszych alternatyw obrazowania dla niedostatecznie obsługiwanych regionów trwają na całym świecie.

Przyszłość obrazowania medycznego obiecuje dalszą innowację w rozdzielczości, szybkości i specyficzności. Detektory CT liczące fotony oferują lepszą jakość obrazu przy niższych dawkach radiacyjnych. Magnesy MRI o ultra-wysokim polu ujawniają struktury mózgu w bezprecedensowych szczegółach. Hybrydowe systemy obrazowania łączą wiele technologii, aby zapewnić komplementarne informacje w pojedynczych badaniach. Te postępy będą dalej rozszerzać zdolność lekarzy do widzenia wnętrza ludzkiego ciała i rozumienia tego, co tam znajdują.

Obrazowanie medyczne stanowi przykład tego, jak fizyka i inżynieria mogą przekształcić medycynę, gdy są stosowane kreatywnie do problemów klinicznych. Od przypadkowego odkrycia Rontgena po współczesną interpretację wspomaganą przez AI, ta dziedzina nieustannie ewoluowała, aby sprostać zmieniającym się potrzebom klinicznym. Zdolność do widzenia wnętrza ciała bez jego przecinania pozostaje jedną z najbardziej wartościowych możliwości medycyny, kierując diagnozowaniem i leczeniem pacjentów na całym świecie.`,
    questions: [
      {
        id: 'health-medicine-p10-q1',
        type: 'single_choice',
        question: 'Kiedy Wilhelm Rontgen odkrył promienie X?',
        options: ['15 października 1890', '8 listopada 1895', '1 stycznia 1901', '12 marca 1910'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q2',
        type: 'single_choice',
        question: 'Kto opracował skaner CT i zdobył Nagrodę Nobla w 1979 roku?',
        options: [
          'Wilhelm Rontgen i Ian Donald',
          'Raymond Damadian i Peter Mansfield',
          'Godfrey Hounsfield i Allan Cormack',
          'Paul Lauterbur i Peter Mansfield',
        ],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q3',
        type: 'multiple_select',
        question: 'Które technologie obrazowania NIE używają promieniowania jonizującego? Wybierz wszystkie pasujące.',
        options: ['MRI', 'Skanowanie CT', 'Ultrasonografia', 'Promienie X'],
        correctIndices: [0, 2],
      },
      {
        id: 'health-medicine-p10-q4',
        type: 'true_false',
        question: 'MRI używa potężnych pól magnetycznych i fal radiowych do tworzenia obrazów.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q5',
        type: 'numeric',
        question: 'W którym roku zainstalowano pierwszy kliniczny skaner CT?',
        correctValue: 1971,
        tolerance: 0,
        min: 1960,
        max: 1980,
        step: 1,
        unit: 'rok',
      },
      {
        id: 'health-medicine-p10-q6',
        type: 'single_choice',
        question: 'Kto był pionierem ultrasonografii medycznej w latach 50. XX wieku?',
        options: ['Raymond Damadian', 'Ian Donald', 'Paul Lauterbur', 'Wilhelm Rontgen'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q7',
        type: 'single_choice',
        question: 'Co ujawnia skanowanie PET, co różni się od CT lub MRI?',
        options: ['Gęstość kości', 'Anatomię naczyń krwionośnych', 'Aktywność metaboliczną', 'Elastyczność tkanek'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q8',
        type: 'numeric',
        question: 'Jakie jest przeciętne roczne narażenie na promieniowanie medyczne dla Amerykanów (w milisiewertach)?',
        correctValue: 3,
        tolerance: 0.5,
        min: 1,
        max: 5,
        step: 0.5,
        unit: 'milisiewertów',
      },
      {
        id: 'health-medicine-p10-q9',
        type: 'true_false',
        question: 'Raymond Damadian wykazał w 1971 roku, że guzy i normalne tkanki mają różne właściwości magnetyczne.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q10',
        type: 'single_choice',
        question: 'Co oznacza ALARA w bezpieczeństwie radiacyjnym?',
        options: [
          'Zawsze niższe wszystkie zastosowania radiacyjne',
          'Tak nisko, jak to rozsądnie osiągalne',
          'Stosowane limity i ocena radiacyjna',
          'Odpowiednie poziomy i analiza ryzyka',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q11',
        type: 'single_choice',
        question: 'Kto podzielił się Nagrodą Nobla w 2003 roku za rozwój MRI?',
        options: [
          'Godfrey Hounsfield i Allan Cormack',
          'Paul Lauterbur i Peter Mansfield',
          'Raymond Damadian i Ian Donald',
          'Wilhelm Rontgen i Ian Donald',
        ],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q12',
        type: 'numeric',
        question: 'W którym roku Ian Donald opublikował pierwszy artykuł kliniczny o ultrasonografii położniczej?',
        correctValue: 1958,
        tolerance: 1,
        min: 1950,
        max: 1970,
        step: 1,
        unit: 'rok',
      },
      {
        id: 'health-medicine-p10-q13',
        type: 'true_false',
        question: 'Systemy głębokiego uczenia dorównały lub przekroczyły ludzkich radiologów w wykrywaniu niektórych schorzeń.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q14',
        type: 'single_choice',
        question: 'Co to jest radiologia interwencyjna?',
        options: [
          'Rodzaj radioterapii',
          'Wykorzystanie kierowania obrazowaniem do minimalnie inwazyjnych procedur',
          'Metoda wykrywania raka',
          'Zaawansowana technika MRI',
        ],
        correctIndex: 1,
      },
    ],
  },
];
