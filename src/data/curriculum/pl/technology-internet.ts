import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Jak działa Internet",
    "content": "Internet łączy miliardy urządzeń na całym świecie za pośrednictwem skomplikowanej sieci sieci, która rozciąga się na każdym kontynencie Ziemi. Za każdym razem, gdy odwiedzasz stronę internetową, wysyłasz e-mail lub oglądasz strumieniowo wideo, dane przesyłane są przez tę rozległą infrastrukturę cyfrową w zaledwie milisekundy. Zrozumienie tego niezwykłego systemu pomaga nam docenić technologię, która przekształciła współczesną komunikację.\n\nKiedy wpisujesz adres strony internetowej w swojej przeglądarce, natychmiast rozpoczyna się złożony proces. Twój komputer najpierw kontaktuje się z serwerem Domain Name System (DNS), który tłumaczy adres zrozumiały dla człowieka na numeryczny adres IP, który rozumieją komputery. Działa to podobnie do wyszukiwania numeru telefonu w książce telefonicznej, dopasowując nazwy do aktualnych danych kontaktowych.\n\nTwoje żądanie następnie przesyłane jest przez twojego dostawcę usług internetowych (ISP) do sieci szkieletowych, które stanowią główną infrastrukturę Internetu. Te wysokoprzepustowe kable światłowodowe rozciągają się na kontynentach i przecinają oceany na głębokości przekraczającej 6000 metrów. Przesyłają one ogromne ilości danych z prędkością zbliżoną do prędkości światła, obsługując ponad 500 trylionów bajtów informacji dziennie.\n\nDane nie są przesyłane jako pojedyncza jednostka przez Internet. Zamiast tego rozpadają się na małe pakiety, z których każdy zawiera część informacji oraz szczegóły adresowania. Pakiety te mogą przebyć różne trasy, aby dotrzeć do celu, znajdując ścieżki omijające zatory lub awarie. W miejscu docelowym są one ponownie składane we właściwej kolejności, aby odtworzyć oryginalną wiadomość.\n\nRoutery pełnią funkcję kontrolerów ruchu internetowego, podejmując kluczowe decyzje w każdej chwili. Te wyspecjalizowane urządzenia analizują miejsce docelowe każdego pakietu i określają najlepszą ścieżkę naprzód. Podejmują te decyzje dotyczące routingu miliardy razy na sekundę, utrzymując płynny przepływ danych w sieciach należących do tysięcy różnych organizacji.\n\nInternet rozpoczął się jako ARPANET w 1969 roku, wojskowy projekt badawczy Stanów Zjednoczonych, którego celem było przetrwanie zakłóceń komunikacji podczas potencjalnych ataków. Vint Cerf i Bob Kahn opracowali protokoły TCP/IP w latach 70-tych, tworząc techniczny fundament, który do dziś leży u podstaw Internetu. Ich zdecentralizowana konstrukcja zapewnia, że żaden pojedynczy punkt awarii nie może zniszczyć całej sieci.\n\nTim Berners-Lee wynalazł World Wide Web w 1989 roku, pracując w CERN w Szwajcarii. Stworzył system hiperłączy i przeglądarek internetowych, które uczyniły Internet dostępnym dla wszystkich. Sieć stała się publicznie dostępna w sierpniu 1991 roku, a w ciągu dekady Internet przekształcił się z narzędzia badawczego w globalną platformę komunikacyjną, z której korzystają setki milionów ludzi.",
    "wordCount": 373,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Kto wynalazł World Wide Web?",
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
        "question": "Kto opracował protokoły TCP/IP? Wybierz wszystkie poprawne odpowiedzi.",
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
        "question": "Dane przesyłane przez internet podróżują jako pojedyncze, kompletne pliki, zamiast być dzielone na pakiety.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "W którym roku powstała ARPANET, poprzedniczka internetu?",
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
    "title": "Rozwój Sztucznej Inteligencji",
    "content": "Sztuczna inteligencja ewoluowała z fantazji rodem z science fiction w praktyczną technologię, która wpływa na niemal każdy aspekt współczesnego życia. Od asystentów w smartfonach po systemy diagnostyki medycznej, SI wykonuje obecnie zadania, które niegdyś wymagały ludzkiej inteligencji. Ta transformacja stanowi jedno z najważniejszych przesunięć technologicznych od czasu wynalezienia samego komputera.\n\nKoncepcja sztucznej inteligencji pojawiła się na warsztatach w Dartmouth College w New Hampshire latem 1956 roku. Informatyk John McCarthy ukuł to pojęcie i zgromadził badaczy, którzy wierzyli, że można stworzyć maszyny symulujące ludzką inteligencję. Ci pionierzy wyobrażali sobie tworzenie myślących maszyn w ciągu jednego pokolenia, choć postęp okazał się znacznie wolniejszy niż ich optymistyczne przewidywania.\n\nWczesne badania nad SI koncentrowały się na symbolicznym rozumowaniu, programowaniu komputerów za pomocą jasnych reguł rozwiązywania problemów. Badacze stworzyli systemy eksperckie, które zakodowywały ludzką wiedzę w drzewa decyzyjne i reguły logiczne. Systemy te osiągnęły imponujące wyniki w wąskich dziedzinach, takich jak szachy i diagnostyka medyczna, ale miały problemy z zadaniami wymagającymi zdrowego rozsądku lub radzenia sobie z niejednoznacznymi informacjami.\n\nRewolucja uczenia maszynowego zaczęła przekształcać SI w latach 90. i gwałtownie przyspieszyła po 2010 roku. Zamiast programować jasne reguły, badacze szkolili algorytmy do odkrywania wzorców w dużych zbiorach danych. Sieci neuronowe, luźno inspirowane biologicznymi strukturami mózgu, okazały się szczególnie skuteczne w rozpoznawaniu obrazów, rozumieniu mowy i generowaniu tekstu przypominającego ludzki.\n\nGłębokie uczenie maszynowe (ang. deep learning) stało się dominującym podejściem do SI po przełomie w 2012 roku. Geoffrey Hinton i jego studenci z Uniwersytetu w Toronto udowodnili, że głębokie sieci neuronowe z wieloma warstwami mogą znacznie przewyższać poprzednie metody w zadaniach rozpoznawania obrazów. Ich system zredukował wskaźniki błędów o ponad 40 procent w porównaniu z dotychczas najlepszymi podejściami.\n\nSzkolenie nowoczesnych systemów SI wymaga ogromnych zasobów obliczeniowych i ogromnych ilości danych. Duże modele językowe mogą zawierać setki miliardów parametrów i wymagać tysięcy wyspecjalizowanych procesorów pracujących przez miesiące. Firmy technologiczne, takie jak Google, Microsoft i OpenAI, zainwestowały miliardy dolarów w budowę infrastruktury niezbędnej do szkolenia tych coraz bardziej zaawansowanych systemów.\n\nMożliwości systemów SI w ostatnich latach znacznie się rozszerzyły. Systemy widzenia komputerowego mogą teraz identyfikować obiekty, twarze i czynności na obrazach z nadludzką dokładnością. Przetwarzanie języka naturalnego posunęło się do tego stopnia, że SI może prowadzić zniuansowane rozmowy, pisać spójne eseje i tłumaczyć między dziesiątkami języków. Systemy SI komponują teraz muzykę, generują grafikę i piszą kod komputerowy.\n\nSI zasila już wiele usług, z których ludzie korzystają codziennie, bez świadomości. Algorytmy rekomendacji sugerują filmy na YouTube i produkty na Amazonie w oparciu o wyuczone preferencje. Filtry poczty e-mail wykorzystują uczenie maszynowe do oddzielania ważnych wiadomości od spamu. Aplikacje nawigacyjne przewidują natężenie ruchu i sugerują optymalne trasy. Asystenci głosowi, tacy jak Siri i Alexa, wykorzystują SI do rozumienia poleceń głosowych.\n\nOpieka zdrowotna jest jednym z najbardziej obiecujących zastosowań sztucznej inteligencji. Systemy SI mogą analizować obrazy medyczne, aby wykryć raka wcześniej niż ludzcy radiolodzy w niektórych przypadkach. Odkrywanie leków wykorzystuje uczenie maszynowe do identyfikowania obiecujących związków i przewidywania ich działania. Asystenci SI pomagają lekarzom być na bieżąco z szybko rozwijającą się literaturą medyczną i sugerują oparte na dowodach opcje leczenia.\n\nObawy dotyczące bezpieczeństwa SI i jej wpływu na społeczeństwo rosną wraz z jej możliwościami. Badacze obawiają się systemów, które realizują cele w nieoczekiwany lub szkodliwy sposób. Etycy podnoszą pytania o uprzedzenia w systemach SI szkolonych na danych historycznych, które odzwierciedlają ludzkie uprzedzenia. Ekonomiści debatują, jak automatyzacja wpłynie na zatrudnienie, gdy SI przejmie zadania wykonywane wcześniej przez ludzi.\n\nRządy na całym świecie rozpoczęły opracowywanie przepisów dotyczących sztucznej inteligencji. Unia Europejska uchwaliła w 2024 roku kompleksowe przepisy dotyczące SI, które kategoryzują systemy według poziomu ryzyka i nakładają wymagania na aplikacje wysokiego ryzyka. Chiny wdrożyły zasady regulujące algorytmy rekomendacji i generatywną SI. Stany Zjednoczone wydały rozporządzenia wykonawcze dotyczące bezpieczeństwa SI, jednocześnie debatując nad bardziej kompleksowym prawodawstwem.\n\nPrzyszłość sztucznej inteligencji pozostaje niepewna, ale wydaje się, że przyniesie dalszy szybki postęp. Badacze dążą do sztucznej inteligencji ogólnej (ang. artificial general intelligence), która mogłaby dorównać ludzkim możliwościom we wszystkich zadaniach poznawczych, choć szacunki, kiedy to może nastąpić, wahają się od lat do nigdy. Pewne jest, że SI będzie nadal przekształcać branże, stwarzając nowe możliwości i podnosząc fundamentalne pytania o relacje między inteligencją ludzką a maszynową.\n\nZrozumienie sztucznej inteligencji stało się niezbędną wiedzą do poruszania się we współczesnym świecie. Niezależnie od tego, czy jako użytkownicy, pracownicy, obywatele, czy decydenci, ludzie coraz częściej muszą rozumieć, co SI może, a czego nie może zrobić. Technologia ta będzie się nadal rozwijać, a świadome zaangażowanie w jej rozwój pomoże zapewnić, że SI przyniesie korzyści ludzkości w szerokim zakresie.",
    "wordCount": 736,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Gdzie i kiedy powstało pojęcie \"sztuczna inteligencja\"?",
        "options": [
          "MIT w 1960 roku",
          "Dartmouth College w 1956 roku",
          "Stanford University w 1965 roku",
          "Bell Labs w 1950 roku"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Jakie zastosowania sztucznej inteligencji w opiece zdrowotnej są wymienione w artykule? Wybierz wszystkie poprawne.",
        "options": [
          "Analizowanie obrazów medycznych w celu wykrywania raka",
          "Przeprowadzanie operacji robotycznych",
          "Odkrywanie leków",
          "Sugerowanie opcji leczenia"
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
        "question": "Wczesne badania nad sztuczną inteligencją koncentrowały się głównie na uczeniu maszynowym, a nie na rozumowaniu symbolicznym.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "W którym roku Geoffrey Hinton i jego studenci zademonstrowali przełom w głębokim uczeniu?",
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
        "question": "Kto ukuł termin \"sztuczna inteligencja\"?",
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
        "question": "O ile sieci neuronowe głębokiego uczenia zmniejszyły wskaźniki błędów w porównaniu z poprzednimi metodami w 2012 roku?",
        "options": [
          "O ponad 20 procent",
          "O ponad 30 procent",
          "O ponad 40 procent",
          "O ponad 50 procent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "W którym roku Unia Europejska uchwaliła kompleksowe przepisy dotyczące sztucznej inteligencji?",
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
    "title": "Cyberbezpieczeństwo: Ochrona Cyfrowego Świata",
    "content": "Cyberbezpieczeństwo chroni komputery, sieci i dane przed atakami cyfrowymi, które codziennie zagrażają miliardom ludzi. Hakerzy atakują wszystko, od osobistych kont bankowych po krytyczną infrastrukturę, taką jak sieci energetyczne i szpitale. Dziedzina ta rozwinęła się z niszowej specjalności w jedną z najważniejszych dyscyplin we współczesnej technologii.\n\nPierwszy poważny wirus komputerowy, nazwany Brain, pojawił się w Pakistanie w styczniu 1986 roku. Dwóch braci o imieniu Basit i Amjad Farooq Alvi stworzyło go, aby śledzić nielegalne kopie ich oprogramowania medycznego. Wirus rozprzestrzeniał się powoli przez zainfekowane dyskietki, potrzebując miesięcy, aby dotrzeć do komputerów na całym świecie. Dziś złośliwe oprogramowanie rozprzestrzenia się w Internecie w ciągu sekund, infekując miliony urządzeń, zanim eksperci ds. bezpieczeństwa zdążą zareagować.\n\nAtaki phishingowe pozostają najczęstszą metodą, jaką przestępcy wykorzystują do kradzieży poufnych informacji. Te zwodnicze wiadomości e-mail udają, że pochodzą z zaufanych źródeł, takich jak banki, pracodawcy lub popularne strony internetowe. Nakłaniają one odbiorców do klikania złośliwych linków lub wprowadzania haseł na fałszywych stronach internetowych. FBI poinformowało, że ataki phishingowe spowodowały straty w wysokości ponad 10 miliardów dolarów tylko w 2022 roku.\n\nOprogramowanie ransomware stanowi jeden z najbardziej destrukcyjnych typów współczesnych cyberataków. To złośliwe oprogramowanie szyfruje pliki ofiary i żąda zapłaty za klucz deszyfrujący. Atak WannaCry w maju 2017 roku zainfekował ponad 200 000 komputerów w 150 krajach w ciągu zaledwie czterech dni. Szpitale w Wielkiej Brytanii musiały odwołać tysiące wizyt lekarskich i przekierowywać karetki do niezagrożonych placówek.\n\nSilne hasła stanowią fundament osobistego cyberbezpieczeństwa. Eksperci ds. bezpieczeństwa zalecają używanie co najmniej 12 znaków, łączących wielkie i małe litery, cyfry i symbole. Każde konto powinno mieć unikalne hasło, aby zapobiec kompromitacji wielu usług w wyniku jednego naruszenia. Menedżery haseł pomagają użytkownikom generować i przechowywać złożone hasła bez konieczności ich zapamiętywania.\n\nUwierzytelnianie dwuskładnikowe dodaje kluczową drugą warstwę zabezpieczeń poza hasłami. Ten system wymaga czegoś, co wiesz, na przykład hasła, plus czegoś, co masz, na przykład telefonu, który odbiera kody weryfikacyjne. Nawet jeśli hakerzy ukradną Twoje hasło, nie będą mogli uzyskać dostępu do Twojego konta bez drugiego czynnika. Google poinformowało, że uwierzytelnianie dwuskładnikowe blokuje 99,9 procent automatycznych ataków na konta.\n\nSzyfrowanie przekształca dane w nieczytelny kod, który tylko upoważnione strony mogą odszyfrować. Gdy widzisz ikonę kłódki na pasku adresu przeglądarki, szyfrowanie chroni Twoje połączenie z tą witryną. Kompleksowe szyfrowanie w aplikacjach do przesyłania wiadomości zapewnia, że tylko Ty i Twój odbiorca możecie czytać wiadomości. Nawet firma świadcząca usługę nie ma dostępu do zaszyfrowanej treści.\n\nRządy i korporacje inwestują miliardy w obronę cyberbezpieczeństwa. Amerykańska Agencja Bezpieczeństwa Cybernetycznego i Infrastruktury, znana jako CISA, chroni sieci federalne i pomaga prywatnym firmom bronić się przed atakami. Duże firmy technologiczne zatrudniają tysiące badaczy ds. bezpieczeństwa, którzy poszukują luk w zabezpieczeniach i opracowują środki ochronne.\n\nEtyczni hakerzy odgrywają istotną rolę w poprawie bezpieczeństwa, znajdując słabe punkty, zanim zrobią to przestępcy. Firmy płacą premie w wysokości od setek do milionów dolarów za zgłoszenia poważnych luk w zabezpieczeniach. Apple uruchomiło swój program bug bounty w 2016 roku i obecnie oferuje do 2 milionów dolarów za najbardziej krytyczne błędy bezpieczeństwa iPhone'a. Programy te zamieniają potencjalnych napastników w obrońców, którzy wzmacniają infrastrukturę cyfrową.\n\nPrzyszłość cyberbezpieczeństwa stoi w obliczu nowych wyzwań ze strony wschodzących technologii. Komputery kwantowe mogą ostatecznie złamać szyfrowanie, które obecnie chroni bankowość, komunikację i tajemnice rządowe. Badacze ds. bezpieczeństwa opracowują już algorytmy odporne na kwanty, aby przygotować się na to zagrożenie. Sztuczna inteligencja tworzy zarówno nowe metody ataku, jak i nowe możliwości obronne w trwającym wyścigu zbrojeń technologicznych.",
    "wordCount": 558,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Jak nazywał się pierwszy poważny wirus komputerowy?",
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
        "question": "Jaki procent automatycznych ataków blokuje uwierzytelnianie dwuskładnikowe według Google?",
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
        "question": "Jakie są zalecane praktyki dla silnego bezpieczeństwa hasła? Wybierz wszystkie poprawne.",
        "options": [
          "Używanie co najmniej 12 znaków",
          "Używanie tego samego hasła do wszystkich kont",
          "Łączenie wielkich liter, małych liter, cyfr i symboli",
          "Używanie menedżera haseł"
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
        "question": "Atak ransomware WannaCry zainfekował komputery w ponad 150 krajach.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Jakie straty (w miliardach dolarów) spowodowały ataki phishingowe w 2022 roku?",
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
    "title": "Internet Rzeczy: Połączony Świat",
    "content": "Internet Rzeczy (IoT) wplotł cyfrową inteligencję w tkankę życia codziennego, łącząc miliardy urządzeń, które odbierają, komunikują się i działają bez interwencji człowieka. Od inteligentnych termostatów, które uczą się Twoich preferencji, po przemysłowe czujniki monitorujące urządzenia na różnych kontynentach, ta technologiczna rewolucja rozszerza internet poza komputery i telefony do świata fizycznego. Zrozumienie tego połączonego ekosystemu ujawnia zarówno niezwykłe możliwości, jak i znaczące wyzwania, które ukształtują nadchodzące dekady.\n\nKevin Ashton, brytyjski pionier technologii pracujący w Procter and Gamble, ukuł termin Internet Rzeczy w 1999 roku, opracowując systemy identyfikacji radiowej (RFID) do śledzenia produktów w łańcuchach dostaw. Wyobrażał sobie komputery zbierające informacje o świecie fizycznym niezależnie, zamiast polegać na ludziach, którzy wprowadzają dane. Wizja ta urzeczywistniała się przez dziesięciolecia, ponieważ czujniki stawały się tańsze, łączność bezprzewodowa uległa poprawie, a chmura obliczeniowa zapewniła infrastrukturę do przetwarzania ogromnych strumieni danych.\n\nLiczba podłączonych urządzeń rosła wykładniczo od czasu rozpoczęcia komercyjnego wdrażania IoT około 2010 roku. Analitycy ze Statista oszacowali, że w 2020 roku na całym świecie było 15,1 miliarda urządzeń IoT, a do 2030 roku ma ich być 29 miliardów. Każde urządzenie generuje dane w sposób ciągły, tworząc przepływy informacji, które przyćmiewają tradycyjny ruch internetowy. Pojedyncza podłączona fabryka może produkować terabajty danych z czujników dziennie z tysięcy punktów monitorowania.\n\nInteligentne technologie domowe stanowią najbardziej widoczne konsumenckie zastosowanie zasad IoT. Termostat Nest Learning, wprowadzony przez byłego inżyniera Apple, Tony'ego Fadella, w październiku 2011 roku, zapoczątkował powszechne przyjęcie inteligentnych domów. Urządzenie obserwowało, kiedy mieszkańcy byli w domu i jakie są ich preferencje dotyczące temperatury, a następnie automatycznie dostosowywało ogrzewanie i chłodzenie, aby oszczędzać energię. Google przejął Nest Labs za 3,2 miliarda dolarów w styczniu 2014 roku, sygnalizując zaangażowanie głównych firm technologicznych w ten rynek.\n\nAsystenci głosowi stali się centralnymi hubami dla ekosystemów inteligentnych domów. Amazon wydał głośnik Echo z Alexą w listopadzie 2014 roku, a następnie Google Home w 2016 roku i HomePod Apple w 2018 roku. Urządzenia te reagują na polecenia głosowe, aby sterować oświetleniem, zamkami, termostatami i systemami rozrywki. Do 2024 roku ponad 200 milionów gospodarstw domowych na całym świecie posiadało inteligentne głośniki, wykorzystując je do zadań od ustawiania minutników po zamawianie artykułów spożywczych.\n\nUrządzenia do noszenia śledzą parametry zdrowotne z coraz większą dokładnością i precyzją. Apple Watch, wydany w kwietniu 2015 roku, ewoluował z modnego dodatku w urządzenie medyczne zdolne do wykrywania nieregularnych rytmów serca i upadków. Badanie opublikowane w New England Journal of Medicine w listopadzie 2019 roku wykazało, że zegarek zidentyfikował migotanie przedsionków, poważny stan serca, z 84-procentową dokładnością. Ciągłe monitory glukozy pozwalają diabetykom śledzić poziom cukru we krwi bez nakłuwania palców, przesyłając dane do smartfonów i ostrzegając użytkowników o niebezpiecznych poziomach.\n\nPrzemysłowy IoT, czasami nazywany Przemysłem 4.0, przekształca produkcję dzięki bezprecedensowej widoczności i kontroli. Czujniki wbudowane w maszyny wykrywają wibracje, temperatury i zużycie energii, które wskazują na zbliżające się awarie, zanim dojdzie do przestojów. General Electric zapoczątkował predykcyjne utrzymanie ruchu za pośrednictwem swojej platformy Predix, twierdząc, że oszczędza klientom miliardy dolarów dzięki unikniętym przestojom. Pojedynczy silnik odrzutowy generuje 10 terabajtów danych podczas transatlantyckiego lotu, analizowanych w sposób ciągły w celu optymalizacji wydajności i planowania konserwacji.\n\nRolnictwo wykorzystuje IoT, aby zwiększyć plony przy jednoczesnym zmniejszeniu wpływu na środowisko. Czujniki wilgotności gleby uruchamiają nawadnianie tylko wtedy, gdy rośliny potrzebują wody, zmniejszając zużycie o nawet 30 procent w porównaniu z planowym nawadnianiem. Drony wyposażone w kamery multispektralne identyfikują stres upraw, inwazje szkodników i niedobory składników odżywczych na rozległych polach. John Deere, 185-letnia firma produkująca sprzęt rolniczy, zbiera obecnie dane z milionów podłączonych maszyn i sprzedaje usługi analityczne rolnikom wraz z traktorami.\n\nInteligentne miasta wdrażają infrastrukturę IoT, aby wydajniej zarządzać systemami miejskimi. Barcelona wdrożyła jeden z najbardziej kompleksowych programów inteligentnego miasta, począwszy od 2012 roku, instalując czujniki w całym mieście w celu monitorowania dostępności miejsc parkingowych, poziomu wypełnienia pojemników na śmieci, jakości powietrza i potrzeb nawadniania. Miasto twierdzi, że oszczędza rocznie 75 milionów dolarów, jednocześnie poprawiając usługi dla mieszkańców. Singapur, Kopenhaga i Seul podjęły podobne inicjatywy, wykorzystując podłączone czujniki do optymalizacji przepływu ruchu, zużycia energii i reagowania na sytuacje awaryjne.\n\nZastosowania w opiece zdrowotnej wykraczają daleko poza urządzenia do noszenia i obejmują zdalne monitorowanie pacjentów oraz placówki kliniczne. Pacjenci wracający do zdrowia po operacji lub zmagający się z przewlekłymi schorzeniami mogą być monitorowani w domu za pomocą podłączonych urządzeń, które ostrzegają zespoły opieki o niepokojących zmianach. Szpitale śledzą lokalizację i status krytycznego sprzętu w czasie rzeczywistym. Badania kliniczne wykorzystują urządzenia IoT do zbierania dokładniejszych danych o stanie zdrowia uczestników między wizytami. Pandemia COVID-19 przyspieszyła wdrażanie technologii zdalnego monitorowania, które wcześniej spotykały się z powolną akceptacją.\n\nObawy dotyczące bezpieczeństwa związane z urządzeniami IoT okazały się niepokojąco uzasadnione. Wielu producentów przedkłada funkcje i niskie ceny nad solidne zabezpieczenia, dostarczając urządzenia z domyślnymi hasłami i niezałatanymi lukami w zabezpieczeniach. Atak botnetu Mirai w październiku 2016 roku przejął kontrolę nad setkami tysięcy niezabezpieczonych kamer internetowych i rejestratorów cyfrowych, aby uruchomić rozproszone ataki typu \"odmowa usługi\" (DDoS), które zakłóciły działanie głównych stron internetowych, w tym Twittera, Netflixa i PayPal. Badacze regularnie demonstrują alarmujące luki w zabezpieczeniach niani elektronicznych, samochodów, urządzeń medycznych i systemów przemysłowych.\n\nImplikacje dla prywatności związane z wszechobecnym wykrywaniem budzą głębokie pytania o nadzór i własność danych. Asystenci głosowi nagrywają rozmowy w domach. Monitorowanie aktywności fizycznej ujawnia intymne szczegóły dotyczące zdrowia i codziennych czynności. Podłączone samochody przesyłają dane o lokalizacji, które ujawniają, dokąd jeżdżą kierowcy i jak jeżdżą. Firmy zbierają te informacje w celu ulepszenia usług i ukierunkowanej reklamy, podczas gdy rządy coraz częściej dążą do uzyskania dostępu na potrzeby egzekwowania prawa i bezpieczeństwa narodowego.\n\nWyzwania związane z interoperacyjnością dzielą krajobraz IoT na niekompatybilne ekosystemy. Urządzenia różnych producentów często nie mogą komunikować się bezpośrednio, co wymaga od konsumentów wyboru platform i ogranicza funkcjonalność. Protokół Matter, uruchomiony w listopadzie 2022 roku przez konsorcjum obejmujące Apple, Google, Amazon i Samsung, ma na celu stworzenie uniwersalnego standardu dla inteligentnych urządzeń domowych. Inicjatywa ta stanowi wyraz uznania przez branżę, że fragmentacja utrudnia wdrażanie i innowacje.\n\nPrzetwarzanie brzegowe (edge computing) rozwiązuje problemy związane z opóźnieniami i ograniczeniami przepustowości związane z wysyłaniem wszystkich danych IoT do odległych serwerów w chmurze. Przetwarzanie informacji lokalnie, na lub w pobliżu urządzeń, umożliwia reakcje w czasie rzeczywistym dla aplikacji takich jak autonomiczne pojazdy i robotyka przemysłowa. Samodzielnie prowadzący się samochód nie może czekać, aż dane dotrą do serwera w chmurze i z powrotem, zanim zdecyduje się zahamować. Architektury brzegowe dystrybuują inteligencję w sieciach, zamiast koncentrować ją w scentralizowanych centrach danych.\n\nOgraniczenia energetyczne kształtują projektowanie i wdrażanie urządzeń IoT. Czujniki zasilane bateryjnie muszą działać przez lata bez wymiany w miejscach, które mogą być niedostępne lub niebezpieczne. Technologie sieci rozległych o niskim poborze mocy, takie jak LoRaWAN i Sigfox, umożliwiają urządzeniom komunikację na odległość kilometrów przy minimalnym zużyciu energii. Pozyskiwanie energii ze źródeł słonecznych, termicznych lub kinetycznych pozwala niektórym urządzeniom działać w nieskończoność bez baterii.\n\nŚlad środowiskowy miliardów podłączonych urządzeń wymaga uwagi w miarę rozwoju IoT. Produkcja tych produktów pochłania zasoby i energię. Większość urządzeń nie ma możliwości recyklingu ich komponentów elektronicznych. Ciągła łączność sieciowa wymaga energii zarówno od urządzeń, jak i infrastruktury. Jednak zastosowania IoT w zarządzaniu energią, rolnictwie i transporcie mogą zmniejszyć ogólny wpływ na środowisko, jeśli zostaną wdrożone w przemyślany sposób.\n\nPrzyszłość IoT zmierza w kierunku wszechobecnej inteligencji, która przewiduje potrzeby i automatycznie reaguje na zmieniające się warunki. Cyfrowe bliźniaki (digital twins) tworzą wirtualne repliki systemów fizycznych do symulacji i optymalizacji. Sztuczna inteligencja zastosowana do danych z czujników umożliwia prognozy i automatyzacje wykraczające poza to, co mogłoby osiągnąć jawne programowanie. Granica między światem fizycznym i cyfrowym nadal się zaciera, gdy połączona inteligencja rozprzestrzenia się w całym środowisku, w którym żyjemy.",
    "wordCount": 1232,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Kto ukuł termin \"Internet Rzeczy\" w 1999 roku?",
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
        "question": "Które firmy wypuściły na rynek główne urządzenia asystentów głosowych? Zaznacz wszystkie poprawne.",
        "options": [
          "Amazon z Echo",
          "Google z Google Home",
          "Apple z HomePod",
          "Microsoft z głośnikiem Cortana"
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
        "question": "Atak botnetu Mirai w październiku 2016 roku przejął kontrolę nad setkami tysięcy niezabezpieczonych kamer internetowych i rejestratorów DVR.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Ile Google zapłaciło za przejęcie Nest Labs w styczniu 2014 roku (w miliardach dolarów)?",
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
        "question": "Kiedy został wydany Apple Watch?",
        "options": [
          "Październik 2011",
          "Styczeń 2014",
          "Kwiecień 2015",
          "Listopad 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Które miasto wdrożyło jeden z najbardziej kompleksowych programów inteligentnego miasta, począwszy od 2012 roku?",
        "options": [
          "Singapur",
          "Barcelona",
          "Kopenhaga",
          "Seul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Ile urządzeń IoT przewiduje się na świecie do 2030 roku (w miliardach)?",
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
        "question": "Protokół Matter został uruchomiony, aby stworzyć uniwersalny standard dla urządzeń inteligentnego domu.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Z jaką dokładnością Apple Watch identyfikował migotanie przedsionków zgodnie z badaniem New England Journal of Medicine?",
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
        "question": "Jakie aplikacje IoT w rolnictwie zostały wymienione? Zaznacz wszystkie poprawne.",
        "options": [
          "Czujniki wilgotności gleby do nawadniania",
          "Drony z kamerami multispektralnymi",
          "Połączone traktory z analizą danych",
          "Robotyczne zbiory"
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
    "title": "Ewolucja Mediów Społecznościowych",
    "content": "Media społecznościowe przekształciły sposób, w jaki ludzie komunikują się, dzielą informacjami i budują społeczności, w sposób, którego nikt nie przewidział, gdy po raz pierwszy pojawił się Internet. Platformy łączące miliardy użytkowników zmieniły politykę, handel, rozrywkę i relacje osobiste na każdym kontynencie. Historia mediów społecznościowych ujawnia zarówno niezwykłą innowacyjność, jak i poważne wyzwania dla współczesnego społeczeństwa.\n\nNajwcześniejsze serwisy społecznościowe pojawiły się pod koniec lat 90., gdy Internet stał się dostępny dla zwykłych ludzi. SixDegrees uruchomiono w 1997 roku, umożliwiając użytkownikom tworzenie profili i łączenie się ze znajomymi. Witryna przyciągnęła około 3,5 miliona członków, zanim została zamknięta w 2001 roku. Friendster pojawił się w 2002 roku, wprowadzając nowatorskie funkcje, które stały się standardem w całej branży. MySpace dominował w latach 2005-2008, stając się najczęściej odwiedzaną stroną internetową w Stanach Zjednoczonych i zapoczątkowując kariery muzyków, takich jak Arctic Monkeys.\n\nFacebook narodził się w akademiku Uniwersytetu Harvarda w lutym 2004 roku. Mark Zuckerberg i jego współlokatorzy stworzyli stronę początkowo tylko dla studentów. Platforma została otwarta dla wszystkich w wieku 13 lat i starszych we wrześniu 2006 roku. Do 2012 roku Facebook osiągnął miliard aktywnych użytkowników miesięcznie, co było kamieniem milowym, którego żadna sieć społecznościowa wcześniej nie osiągnęła. Obecnie firma działa jako Meta i raportuje ponad 3 miliardy użytkowników miesięcznie korzystających z jej rodziny aplikacji, w tym Instagram i WhatsApp.\n\nTwitter wprowadził nowy format komunikacji społecznej, kiedy został uruchomiony w lipcu 2006 roku. Platforma ograniczała posty do 140 znaków, później rozszerzono to do 280, zmuszając użytkowników do zwięzłego wyrażania myśli. Twitter stał się niezbędny do publikowania najświeższych wiadomości, prowadzenia dyskursu politycznego i angażowania celebrytów. Usługa odegrała znaczącą rolę podczas protestów Arabskiej Wiosny w 2011 roku i od tego czasu kształtuje debatę publiczną na niezliczone tematy.\n\nYouTube zrewolucjonizował udostępnianie wideo po tym, jak trzech byłych pracowników PayPal założyło go w lutym 2005 roku. Pierwszy film, zatytułowany \"Me at the zoo\", pokazywał współzałożyciela Jaweda Karima w zoo w San Diego przez zaledwie 18 sekund. Google kupił YouTube za 1,65 miliarda dolarów w październiku 2006 roku. Dziś użytkownicy przesyłają ponad 500 godzin treści wideo każdej minuty, a platforma dociera do większej liczby osób w wieku od 18 do 49 lat niż wszystkie stacje telewizji kablowej razem wzięte.\n\nInstagram wprowadził udostępnianie zdjęć na urządzeniach mobilnych, kiedy Kevin Systrom i Mike Krieger uruchomili go w październiku 2010 roku. Aplikacja zyskała 25 000 użytkowników pierwszego dnia i osiągnęła milion w ciągu dwóch miesięcy. Facebook przejął Instagram za miliard dolarów w kwietniu 2012 roku. Platforma wprowadziła Stories w 2016 roku i Reels w 2020 roku, adaptując funkcje spopularyzowane przez konkurentów, takich jak Snapchat i TikTok.\n\nTikTok stał się najszybciej rozwijającą się platformą społecznościową w historii po międzynarodowej premierze w 2017 roku. Chińska firma ByteDance stworzyła go, łącząc się z Musical.ly, aplikacją popularną wśród amerykańskich nastolatków. Algorytm TikTok poleca filmy w oparciu o zachowania związane z oglądaniem, a nie na podstawie relacji, tworząc inne doświadczenie niż wcześniejsze platformy. Aplikacja osiągnęła miliard użytkowników miesięcznie we wrześniu 2021 roku, osiągając ten kamień milowy szybciej niż jakikolwiek poprzednik.\n\nMedia społecznościowe stworzyły nowe możliwości ekonomiczne warte miliardy dolarów rocznie. Influencerzy zarabiają znaczne dochody, współpracując z markami i promując produkty swoim obserwatorom. Szacuje się, że gospodarka twórców zatrudniała 50 milionów ludzi na całym świecie w 2022 roku. Małe firmy wykorzystują platformy społecznościowe do docierania do klientów bez kosztownych tradycyjnych reklam. Całe branże powstały wokół zarządzania obecnością w mediach społecznościowych organizacji i osób prywatnych.\n\nObawy dotyczące zdrowia psychicznego związane z mediami społecznościowymi wywołały intensywną debatę wśród naukowców i decydentów. Badania łączą intensywne korzystanie z mediów społecznościowych ze zwiększonymi wskaźnikami lęku, depresji i samotności, szczególnie wśród nastolatków. Dr Jean Twenge z San Diego State University opublikowała w 2017 roku badania wykazujące gwałtowny spadek zdrowia psychicznego nastolatków zbiegający się w czasie z rozpowszechnieniem smartfonów. Krytycy argumentują, że korelacja nie dowodzi związku przyczynowego i wskazują na potencjalne korzyści płynące z połączenia online.\n\nDezinformacja rozprzestrzenia się szybko za pośrednictwem sieci społecznościowych, stanowiąc wyzwanie dla ekosystemu informacyjnego. Fałszywe historie rozchodzą się szybciej i docierają do większej liczby osób niż rzetelne raporty, zgodnie z badaniami MIT opublikowanymi w Science w marcu 2018 roku. Platformy wdrożyły programy sprawdzania faktów, etykiety ostrzegawcze i zmiany algorytmiczne, aby zwalczać wprowadzające w błąd treści. Wysiłki te przynoszą mieszane rezultaty i rodzą pytania o cenzurę i rolę firm technologicznych w określaniu prawdy.\n\nObawy o prywatność towarzyszą mediom społecznościowym od samego początku. Firmy gromadzą ogromne ilości danych osobowych, aby z niezwykłą precyzją targetować reklamy. Skandal Cambridge Analytica w 2018 roku ujawnił, że firma doradztwa politycznego pozyskała dane od 87 milionów użytkowników Facebooka bez ich zgody. Przepisy, takie jak europejskie ogólne rozporządzenie o ochronie danych, mają na celu zapewnienie użytkownikom większej kontroli nad ich informacjami.\n\nPrzyszłość mediów społecznościowych wciąż szybko ewoluuje, ponieważ nowe technologie i zmieniające się preferencje zmieniają krajobraz. Platformy wirtualnej rzeczywistości obiecują bardziej wciągające doświadczenia społeczne. Zdecentralizowane sieci zbudowane w oparciu o technologię blockchain mają na celu zapewnienie użytkownikom większej kontroli. Młodzi ludzie coraz częściej preferują prywatne wiadomości od publicznych postów. Niezależnie od formy, jaką przyjmą, połączenia społeczne za pośrednictwem platform cyfrowych pozostaną centralnym elementem komunikacji międzyludzkiej przez wiele pokoleń.",
    "wordCount": 829,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Który serwis społecznościowy został wymieniony jako pierwszy w artykule?",
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
        "question": "Ile Google zapłaciło za przejęcie YouTube w 2006 roku?",
        "options": [
          "1 miliard dolarów",
          "1,65 miliarda dolarów",
          "2 miliardy dolarów",
          "10 miliardów dolarów"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Które platformy należą do rodziny aplikacji Meta? Zaznacz wszystkie poprawne.",
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
        "question": "TikTok osiągnął miliard użytkowników miesięcznie szybciej niż jakakolwiek inna platforma społecznościowa wcześniej.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Ile danych użytkowników Facebooka zostało pozyskanych w skandalu Cambridge Analytica (w milionach)?",
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
        "question": "Kiedy Facebook osiągnął miliard aktywnych użytkowników miesięcznie?",
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
    "title": "Rewolucja Cyfrowej Prywatności",
    "content": "Prywatność cyfrowa stała się jednym z najważniejszych zagadnień XXI wieku, ponieważ firmy technologiczne gromadzą bezprecedensowe ilości danych osobowych, a rządy rozszerzają możliwości inwigilacji do poziomów, które jeszcze kilka dekad temu wydawałyby się dystopijne. Napięcie między korzyściami płynącymi z usług opartych na danych a ryzykiem wszechobecnego monitoringu kształtuje debaty polityczne, modele biznesowe i indywidualne wybory na całym świecie. Zrozumienie tego złożonego krajobrazu wymaga zbadania technologii, które umożliwiają zarówno nadzór, jak i ochronę prywatności, ram prawnych, które z trudem nadążają za innowacjami, oraz filozoficznych pytań o to, czym jest prywatność w erze wszechobecnej łączności.\n\nKoncepcja prywatności informacyjnej zyskała uznanie prawne na długo przed erą cyfrową. Amerykańscy prawnicy Samuel Warren i Louis Brandeis opublikowali w 1890 roku swój przełomowy artykuł w Harvard Law Review, w którym opowiadali się za prawem do bycia pozostawionym w spokoju w odpowiedzi na natarczywe dziennikarstwo, którego rozwój umożliwiły przenośne aparaty fotograficzne. Ten fundamentalny tekst ustanowił prywatność jako odrębną od praw własności i autonomii cielesnej. Brandeis został później sędzią Sądu Najwyższego i napisał wpływowe opinie rozszerzające ochronę prywatności przed ingerencją rządu.\n\nInternet przekształcił prywatność z abstrakcyjnej koncepcji prawnej w codzienną, praktyczną troskę. Pierwsi użytkownicy sieci udostępniali dane osobowe swobodnie, nie zdając sobie sprawy z tego, jak mogą być gromadzone i wykorzystywane. Ciasteczka (ang. cookies), małe pliki tekstowe przechowywane przez przeglądarki internetowe, umożliwiły stronom internetowym rozpoznawanie powracających użytkowników już w 1994 roku. Inżynier Netscape, Lou Montulli, wynalazł ciasteczka, aby rozwiązać techniczny problem utrzymywania koszyków zakupowych, ale szybko stały się one narzędziami inwigilacji śledzącymi użytkowników na różnych stronach internetowych.\n\nGoogle zrewolucjonizował reklamę cyfrową, łącząc zapytania wyszukiwania z zainteresowaniami użytkowników z niezwykłą precyzją. Założyciele firmy początkowo wyrażali dyskomfort z powodu modeli biznesowych opartych na reklamach, pisząc w swoim artykule naukowym z 1998 roku, że reklama stwarza mieszane bodźce, aby priorytetowo traktować reklamodawców przed użytkownikami. Niemniej jednak Google AdWords został uruchomiony w październiku 2000 roku, a Google AdSense w 2003 roku, tworząc infrastrukturę reklamową ukierunkowaną na cel, która miała wygenerować setki miliardów przychodów.\n\nFacebook rozszerzył gromadzenie danych na relacje społeczne i komunikację osobistą. Platforma została uruchomiona w lutym 2004 roku z obietnicą łączenia ludzi, ale jej model biznesowy polegał na sprzedaży szczegółowych profili użytkowników reklamodawcom. Użytkownicy udostępniali zdjęcia, dane o lokalizacji, poglądy polityczne i status związku, często nie rozumiejąc, w jaki sposób te informacje zostaną spieniężone. Do 2018 roku Facebook gromadził dane o szacunkowo 2,2 miliarda użytkowników na całym świecie.\n\nSkandal Cambridge Analytica wybuchł w świadomości publicznej w marcu 2018 roku, ujawniając, w jaki sposób aplikacje stron trzecich mogą pozyskiwać dane od milionów użytkowników Facebooka bez ich wiedzy. Brytyjska firma konsultingowa Cambridge Analytica uzyskała dane osobowe od 87 milionów użytkowników za pośrednictwem aplikacji z quizem osobowości, która wykorzystywała uprawnienia API Facebooka. Firma wykorzystywała te dane do reklam politycznych podczas wyborów prezydenckich w Stanach Zjednoczonych w 2016 roku i referendum w sprawie Brexitu. Facebook stanął w obliczu dochodzeń regulacyjnych na kilku kontynentach i zapłacił rekordową karę w wysokości 5 miliardów dolarów amerykańskich Federalnej Komisji Handlu (FTC) w lipcu 2019 roku.\n\nUjawnienia Edwarda Snowdena w czerwcu 2013 roku ujawniły skalę inwigilacji rządowej, którą umożliwiła komunikacja cyfrowa. Były kontraktor Agencji Bezpieczeństwa Narodowego (NSA) przekazał tajne dokumenty dziennikarzom Glennowi Greenwaldowi, Laurze Poitras i Ewenowi MacAskillowi. Dokumenty te ujawniły programy gromadzące metadane telefoniczne od milionów Amerykanów, podsłuchiwanie kabli światłowodowych przesyłających komunikację międzynarodową oraz wykorzystywanie luk w produktach technologicznych. Ujawnienia wywołały globalne debaty na temat równowagi między bezpieczeństwem a prywatnością.\n\nProgram PRISM umożliwił NSA zbieranie danych bezpośrednio z serwerów największych firm technologicznych, w tym Google, Facebook, Apple i Microsoft. Firmy początkowo zaprzeczały wiedzy o programie, choć późniejsze doniesienia wyjaśniły, że przestrzegały nakazów prawnych, jednocześnie czasami walcząc z rozszerzoną inwigilacją w sądach. Snowden uciekł do Hongkongu i ostatecznie otrzymał azyl w Rosji, gdzie przebywał w 2024 roku. Stany Zjednoczone oskarżyły go o szpiegostwo i kradzież mienia rządowego.\n\nSzyfrowanie stanowi podstawową techniczną obronę przed zarówno inwigilacją rządową, jak i przechwytywaniem przez przestępców. Szyfrowanie end-to-end zapewnia, że tylko nadawca i odbiorca mogą odczytywać wiadomości, a nawet dostawca usług nie ma dostępu do treści. WhatsApp wdrożył szyfrowanie end-to-end dla swoich 1,5 miliarda użytkowników w kwietniu 2016 roku, używając protokołu Signal opracowanego przez kryptografa Moxiego Marlinspike'a. Apple podobnie szyfruje komunikację iMessage i publicznie sprzeciwia się żądaniom rządu dotyczącym dostępu \"tylnymi drzwiami\".\n\nOrgany ścigania argumentują, że szyfrowanie tworzy strefy, w których przestępcy działają bezkarnie. FBI pozwało Apple w lutym 2016 roku, aby zmusić firmę do pomocy w odblokowaniu iPhone'a używanego przez jednego z terrorystów z San Bernardino. Apple odmówił, argumentując, że stworzenie \"tylnych drzwi\" zagroziłoby bezpieczeństwu wszystkich użytkowników. FBI ostatecznie zapłaciło zewnętrznemu kontrahentowi około miliona dolarów za obejście zabezpieczeń telefonu. Ta sprawa zilustrowała trwający konflikt między interesami prywatności i bezpieczeństwa.\n\nUnia Europejska uchwaliła Ogólne Rozporządzenie o Ochronie Danych, powszechnie znane jako RODO (ang. GDPR), które weszło w życie 25 maja 2018 roku. Te kompleksowe ramy prawne ustanowiły surowe zasady dotyczące gromadzenia, przechowywania i przetwarzania danych osobowych mieszkańców UE. Organizacje muszą uzyskać wyraźną zgodę przed gromadzeniem danych, zapewnić dostęp do przechowywanych informacji i usunąć dane na żądanie. Naruszenia mogą skutkować karami w wysokości do 4 procent globalnego rocznego przychodu lub 20 milionów euro, w zależności od tego, która kwota jest wyższa. Amazon otrzymał najwyższą karę RODO w wysokości 746 milionów euro w lipcu 2021 roku.\n\nKalifornia uchwaliła Ustawę o Ochronie Prywatności Konsumentów w Kalifornii (ang. California Consumer Privacy Act), która weszła w życie 1 stycznia 2020 roku, ustanawiając podobne zabezpieczenia dla mieszkańców stanu. Prawo przyznaje konsumentom prawa do wiedzy, jakie dane osobowe gromadzą przedsiębiorstwa, usuwania tych informacji i rezygnacji z ich sprzedaży. Ustawa o Prawach do Prywatności w Kalifornii (ang. California Privacy Rights Act), zatwierdzona przez wyborców w listopadzie 2020 roku, jeszcze bardziej wzmocniła te zabezpieczenia. Inne stany, w tym Wirginia, Kolorado i Connecticut, uchwaliły porównywalne przepisy, tworząc mozaikę wymogów dotyczących prywatności w całych Stanach Zjednoczonych.\n\nBrokerzy danych działają w dużej mierze poza świadomością publiczną, gromadząc szczegółowe profile z rejestrów publicznych, historii zakupów, aktywności w mediach społecznościowych i wielu innych źródeł. Firmy takie jak Acxiom, Experian i Oracle Data Cloud prowadzą bazy danych obejmujące setki milionów osób. Profile te wpływają na decyzje kredytowe, weryfikację zatrudnienia, stawki ubezpieczeniowe i reklamy ukierunkowane. Brokerzy sprzedają dostęp do tych informacji firmom, kampaniom politycznym, a czasami złośliwym podmiotom.\n\nŚledzenie lokalizacji stało się szczególnie kontrowersyjne, ponieważ smartfony na bieżąco raportują pozycje użytkowników. Aplikacje mobilne rutynowo żądają dostępu do lokalizacji w celu realizacji funkcji, od prognoz pogody po rekomendacje restauracji. Dane te ujawniają poufne informacje na temat wizyt lekarskich, praktyk religijnych, działalności politycznej i relacji osobistych. The Wall Street Journal doniósł w grudniu 2018 roku, że dziesiątki firm otrzymują dokładne dane o lokalizacji z popularnych aplikacji, tworząc kompleksowe historie ruchu.\n\nTechnologia rozpoznawania twarzy budzi odrębne obawy dotyczące prywatności, umożliwiając identyfikację bez zgody lub świadomości. Organy ścigania korzystają z systemów firm takich jak Clearview AI, które zebrały miliardy zdjęć z mediów społecznościowych w celu zbudowania przeszukiwalnej bazy danych. Kilka miast, w tym San Francisco, Boston i Portland, zakazało rządowego używania rozpoznawania twarzy. Unia Europejska debatowała nad ograniczeniami dotyczącymi nadzoru biometrycznego w miejscach publicznych. Chiny w szerokim zakresie wdrożyły rozpoznawanie twarzy, wykorzystując je do środków kontroli społecznej, szczególnie wymierzonych w mniejszości ujgurskie.\n\nPrawo do bycia zapomnianym wyłoniło się z orzeczenia Europejskiego Trybunału Sprawiedliwości z 2014 roku, które wymagało od Google usunięcia niektórych wyników wyszukiwania na żądanie. Mario Costeja Gonzalez, obywatel Hiszpanii, skutecznie argumentował, że linki do artykułów prasowych z 1998 roku o jego trudnościach finansowych nie są już istotne. Google przetworzył ponad 1,6 miliona wniosków o usunięcie, które dotyczyły blisko 6 milionów adresów URL od czasu wydania orzeczenia. Krytycy twierdzą, że to równa się cenzurze, podczas gdy zwolennicy uważają to za niezbędne dla godności osobistej i rehabilitacji.\n\nTechnologie chroniące prywatność oferują alternatywy dla gospodarki nadzoru. Wirtualne sieci prywatne (VPN) szyfrują ruch internetowy i maskują lokalizacje użytkowników. Przeglądarka Tor kieruje komunikację przez wiele serwerów, aby zapobiec śledzeniu. Wyszukiwarki nastawione na ochronę prywatności, takie jak DuckDuckGo, przetwarzają zapytania bez zbierania danych osobowych. Signal zapewnia szyfrowaną komunikację, która zbiera minimalne metadane. Narzędzia te wymagają zaawansowania technicznego, które ogranicza ich adopcję, ale pokazują, że usługi szanujące prywatność są technicznie wykonalne.\n\nPrywatność dzieci podlega szczególnej ochronie prawnej ze względu na ich wrażliwość i niezdolność do wyrażenia świadomej zgody. Ustawa o Ochronie Prywatności Dzieci w Internecie (ang. Children's Online Privacy Protection Act), uchwalona w 1998 roku, ogranicza gromadzenie danych osobowych od dzieci poniżej 13 roku życia w Stanach Zjednoczonych. TikTok zapłacił 5,7 miliona dolarów w lutym 2019 roku, aby uregulować zarzuty nielegalnego gromadzenia danych dzieci. Kodeks Projektowania Odpowiedniego do Wieku (ang. Age Appropriate Design Code) w Wielkiej Brytanii, który wszedł w życie we wrześniu 2021 roku, wymaga od usług online zapewnienia wysokich domyślnych ustawień prywatności dla użytkowników poniżej 18 roku życia.\n\nPrzyszłość prywatności cyfrowej zależy od innowacji technologicznych, rozwoju regulacyjnego i kulturowych postaw wobec udostępniania danych. Zdecentralizowane systemy tożsamości mogłyby dać jednostkom kontrolę nad ich danymi osobowymi. Techniki prywatności różnicowej (ang. differential privacy) umożliwiają użyteczną analizę danych, chroniąc jednocześnie indywidualne rekordy. Konwergencja regulacyjna mogłaby ustanowić globalne standardy, a nie fragmentaryczne podejścia krajowe. Podstawowe napięcie między użytecznością danych a ochroną prywatności będzie się utrzymywać, ale równowaga między nimi pozostaje przedmiotem demokratycznej walki i indywidualnych wyborów.",
    "wordCount": 1483,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Kiedy Samuel Warren i Louis Brandeis opublikowali swój przełomowy artykuł o prywatności w Harvard Law Review?",
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
        "question": "Które firmy, jak ujawniono, brały udział w programie PRISM NSA? Wybierz wszystkie poprawne odpowiedzi.",
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
        "question": "Skandal Cambridge Analytica dotyczył danych 87 milionów użytkowników Facebooka.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Jaką karę finansową zapłacił Facebook na rzecz FTC w lipcu 2019 roku (w miliardach dolarów)?",
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
        "question": "Kiedy Edward Snowden ujawnił tajne dokumenty NSA?",
        "options": [
          "Czerwiec 2011",
          "Czerwiec 2013",
          "Czerwiec 2015",
          "Czerwiec 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Kiedy weszło w życie RODO?",
        "options": [
          "25 maja 2016",
          "25 maja 2017",
          "25 maja 2018",
          "25 maja 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Ile wynosiła grzywna nałożona na Amazon w lipcu 2021 roku za naruszenie RODO (w milionach euro)?",
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
        "question": "WhatsApp wdrożył kompleksowe szyfrowanie dla swoich użytkowników w kwietniu 2016 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Kiedy weszła w życie Kalifornijska Ustawa o Ochronie Prywatności Konsumentów?",
        "options": [
          "1 stycznia 2018",
          "1 stycznia 2019",
          "1 stycznia 2020",
          "1 stycznia 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Kiedy uchwalono ustawę o ochronie prywatności dzieci w Internecie (Children's Online Privacy Protection Act)?",
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
        "question": "Kto wynalazł pliki cookie w 1994 roku?",
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
        "question": "Kiedy uruchomiono Google AdWords?",
        "options": [
          "Październik 1998",
          "Październik 2000",
          "Październik 2002",
          "Październik 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Ile zapłacił TikTok w lutym 2019 roku w ramach ugody dotyczącej zarzutów dotyczących danych dzieci (w milionach dolarów)?",
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
        "question": "San Francisco zakazało rządowi używania technologii rozpoznawania twarzy.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Kiedy Europejski Trybunał Sprawiedliwości wydał orzeczenie w sprawie prawa do bycia zapomnianym?",
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
        "question": "Którzy dziennikarze otrzymali ujawnione dokumenty od Edwarda Snowdena? Wybierz wszystkie poprawne odpowiedzi.",
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
    "title": "Rewolucyjny Świat Technologii Blockchain",
    "content": "Technologia blockchain ewoluowała z mało znanego konceptu kryptograficznego w transformacyjną siłę, która przekształca branże daleko wykraczające poza jej korzenie w walutach cyfrowych. Ten rozproszony system księgi głównej oferuje niespotykaną przejrzystość, bezpieczeństwo i decentralizację, które stanowią wyzwanie dla tradycyjnych metod przechowywania danych i budowania zaufania. Zrozumienie blockchain ujawnia, dlaczego technolodzy uważają go za jedną z najważniejszych innowacji od czasu powstania samego Internetu.\n\nSatoshi Nakamoto, pseudonimowa osoba lub grupa, przedstawiła światu blockchain poprzez dokument Bitcoin whitepaper opublikowany 31 października 2008 roku. Czas okazał się niezwykle proroczy, pojawiając się zaledwie kilka tygodni po upadku Lehman Brothers, który wywołał globalny kryzys finansowy. Nakamoto zaproponował system elektronicznej gotówki peer-to-peer, który wyeliminowałby potrzebę zaufanych pośredników, takich jak banki. Pierwszy blok Bitcoina, zwany blokiem genezy, został wydobyty 3 stycznia 2009 roku, umieszczając nagłówek gazety o ratowaniu banków jako trwałe przypomnienie motywacji stojących za tą technologią.\n\nBlockchain funkcjonuje jako rozproszona baza danych współdzielona przez sieć komputerów zwanych węzłami. Każdy blok zawiera listę transakcji, znacznik czasu i kryptograficzny hash, który łączy go z poprzednim blokiem. Ten łańcuch hashów sprawia, że ​​zmiana historycznych zapisów jest praktycznie niemożliwa bez kontrolowania większości sieci. Kiedy ktoś próbuje zmienić starą transakcję, hash ulega zmianie, przerywając łańcuch i alarmując inne węzły o próbie manipulacji.\n\nMechanizmy konsensusu zapewniają, że wszystkie węzły zgadzają się co do zawartości blockchain bez potrzeby posiadania centralnego organu. Bitcoin wykorzystuje proof of work (dowód pracy), gdzie komputery konkurują o rozwiązanie złożonych zagadek matematycznych. Ten, kto pierwszy znajdzie rozwiązanie, zyskuje prawo do dodania następnego bloku i otrzymuje nowo utworzone bitcoiny jako nagrodę. Ten proces, zwany wydobywaniem, zużył w 2023 roku około 127 terawatogodzin energii elektrycznej, co odpowiada rocznemu zużyciu energii przez Norwegię.\n\nEthereum, uruchomione przez programistę Vitalika Buterina w lipcu 2015 roku, rozszerzyło blockchain poza proste transakcje na programowalne inteligentne kontrakty (smart contracts). Te samowykonujące się umowy automatycznie egzekwują swoje warunki po spełnieniu zdefiniowanych warunków. Inteligentny kontrakt dotyczący nieruchomości mógłby jednocześnie zwolnić płatność sprzedającemu i przenieść własność na kupującego, gdy obie strony wypełnią swoje zobowiązania. Żaden prawnik, agent depozytowy ani bank nie musi weryfikować transakcji.\n\nZdecentralizowane finanse, powszechnie zwane DeFi, wykorzystują inteligentne kontrakty do odtworzenia tradycyjnych usług finansowych bez pośredników. Platformy pożyczkowe pozwalają użytkownikom pożyczać kryptowaluty, zapewniając zabezpieczenie, a stopy procentowe są określane przez algorytmy, a nie przez bankierów. Zdecentralizowane giełdy umożliwiają bezpośredni handel między użytkownikami bez firmy przechowującej ich fundusze. U szczytu w listopadzie 2021 roku protokoły DeFi posiadały aktywa o wartości ponad 180 miliardów dolarów.\n\nNiewymienne tokeny, znane jako NFT, stosują blockchain do cyfrowej własności i pochodzenia. Każdy NFT reprezentuje unikalny zasób zweryfikowany na blockchain, najczęściej cyfrowe dzieła sztuki lub przedmioty kolekcjonerskie. Artysta cyfrowy Beeple sprzedał dzieło sztuki NFT w domu aukcyjnym Christie's w marcu 2021 roku za 69,3 miliona dolarów, katapultując tę ​​technologię do głównego nurtu świadomości. Krytycy kwestionują, czy NFT mają trwałą wartość, podczas gdy zwolennicy argumentują, że zasadniczo zmieniają one sposób, w jaki twórcy zarabiają na cyfrowych dziełach.\n\nZarządzanie łańcuchem dostaw oferuje przekonujące praktyczne zastosowania technologii blockchain. Firmy mogą śledzić produkty od surowców poprzez produkcję po półki sklepowe za pomocą niezmiennych zapisów na każdym etapie. Walmart współpracował z IBM nad systemem blockchain, który śledzi pochodzenie produktów spożywczych w ciągu kilku sekund, zamiast tygodnia, jak to było wcześniej wymagane. Ta zdolność okazuje się nieoceniona podczas wycofywania żywności, kiedy szybka identyfikacja skażonych partii ratuje życie.\n\nRządy badają blockchain w celu weryfikacji tożsamości, systemów głosowania i rejestrów publicznych. Estonia, pionier w cyfrowym zarządzaniu, wykorzystuje blockchain do zabezpieczania dokumentacji medycznej, rejestracji działalności gospodarczej i dokumentów sądowych dla swoich 1,3 miliona obywateli. Sekretarz stanu Zachodniej Wirginii przeprowadził pilotażowy projekt głosowania oparty na blockchain dla personelu wojskowego stacjonującego za granicą podczas wyborów śródokresowych w 2018 roku. Eksperymenty te testują, czy technologia może raczej wzmacniać, niż zagrażać instytucjom demokratycznym.\n\nObawy dotyczące wpływu blockchain na środowisko skłoniły do ​​znaczącej ewolucji technologicznej. Ethereum przeszło z energochłonnego proof of work na proof of stake (dowód stawki) we wrześniu 2022 roku, zmniejszając zużycie energii elektrycznej o szacunkowo 99,95 procent. Proof of stake wybiera walidatorów na podstawie kryptowaluty, którą zastawiają jako zabezpieczenie, a nie mocy obliczeniowej. Ta zmiana pokazuje, że blockchain może zająć się swoim wpływem na środowisko, zachowując jednocześnie bezpieczeństwo.\n\nWyzwania związane ze skalowalnością ograniczają wdrażanie blockchain w codziennych transakcjach. Bitcoin przetwarza około siedmiu transakcji na sekundę w porównaniu z możliwościami sieci Visa, która obsługuje 24 000 transakcji na sekundę. Rozwiązania warstwy drugiej budują szybsze kanały płatności na istniejących blockchainach. Lightning Network umożliwia niemal natychmiastowe transakcje Bitcoin, rozliczając tylko ostateczne salda na głównym blockchainie. Te innowacje mają na celu uczynienie blockchain praktycznym do codziennych zakupów.\n\nPrzyszłość blockchain wykracza poza sfery, których jego twórcy nigdy sobie nie wyobrażali. Zdecentralizowane organizacje autonomiczne, czyli DAO, wykorzystują głosowanie tokenami do zarządzania społecznościami i zarządzania zasobami bez tradycyjnych struktur korporacyjnych. Systemy tożsamości cyfrowej mogą dać jednostkom kontrolę nad ich danymi osobowymi, jednocześnie udowadniając kwalifikacje pracodawcom, wynajmującym lub rządom. Niezależnie od tego, czy blockchain spełni swój rewolucyjny potencjał, czy też ustabilizuje się w niszowej roli, jego wpływ na technologię i społeczeństwo okazał się już znaczący i trwały.",
    "wordCount": 812,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Kiedy opublikowano dokument Bitcoin?",
        "options": [
          "3 stycznia 2009",
          "31 października 2008",
          "Lipiec 2015",
          "Wrzesień 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Które z poniższych są wymienione jako zastosowania blockchain poza kryptowalutami? Wybierz wszystkie poprawne.",
        "options": [
          "Zarządzanie łańcuchem dostaw",
          "Tożsamość cyfrowa",
          "Systemy głosowania",
          "Streaming wideo"
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
        "question": "Ethereum przeszedł na proof of stake we wrześniu 2022 roku, zmniejszając zużycie energii elektrycznej o 99,95 procent.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Za ile sprzedano dzieło sztuki Beeple NFT w Christie's w marcu 2021 roku (w milionach dolarów)?",
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
        "question": "Kto uruchomił Ethereum w lipcu 2015 roku?",
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
        "question": "Ile transakcji na sekundę może przetwarzać sieć Bitcoin?",
        "options": [
          "Około 7",
          "Około 70",
          "Około 700",
          "Około 7 000"
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
    "title": "Rewolucja Przetwarzania w Chmurze",
    "content": "Przetwarzanie w chmurze fundamentalnie przekształciło sposób, w jaki firmy i osoby prywatne korzystają z technologii, przenosząc oprogramowanie i przechowywanie danych z urządzeń lokalnych do rozległych sieci zdalnych serwerów. Ta rewolucja architektoniczna umożliwia funkcje, które wydawały się niemożliwe jeszcze dwie dekady temu, od strumieniowania rozrywki po usługi sztucznej inteligencji dostępne z każdego urządzenia. Chmura stała się tak integralną częścią współczesnego życia, że większość ludzi korzysta z niej codziennie, nawet o tym nie wiedząc.\n\nAmazon Web Services uruchomił swoje pierwsze produkty chmurowe w marcu 2006 roku, pioniersko wprowadzając model infrastruktury jako usługi (IaaS), który miał przekształcić branżę technologiczną. Firma zbudowała ogromną moc obliczeniową, aby poradzić sobie z okresami szczytu zakupów, takimi jak Black Friday, i zdała sobie sprawę, że może wynajmować niewykorzystane moce innym firmom. Andy Jassy, który kierował AWS od samego początku, zbudował oddział w machinę zysku generującą ponad 80 miliardów dolarów rocznego przychodu. Ten model biznesowy okazał się tak udany, że konkurenci pospieszyli się, aby zbudować własne platformy chmurowe.\n\nMicrosoft Azure wszedł na rynek chmur w lutym 2010 roku, wykorzystując głębokie relacje firmy z klientami korporacyjnymi. Dyrektor generalny Satya Nadella, który objął stanowisko w 2014 roku, przestawił strategię Microsoftu na usługi chmurowe. Azure rozrósł się i stał się drugim co do wielkości dostawcą usług chmurowych, napędzając wszystko, od małych stron internetowych firm po sieć zawodową LinkedIn. Transformacja Microsoftu w kierunku chmury ożywiła firmę, którą wielu skreśliło jako przeszłość.\n\nGoogle Cloud Platform przenosi wiedzę giganta wyszukiwania w zakresie przetwarzania rozproszonego i uczenia maszynowego do klientów korporacyjnych. Firma, która indeksuje cały internet i przetwarza miliardy zapytań każdego dnia, oferuje tę infrastrukturę firmom każdej wielkości. Inwestycje Google w podmorskie kable i centra danych w kilkudziesięciu krajach umożliwiają dostęp z niskimi opóźnieniami z niemal każdego miejsca na Ziemi. Platforma ta szczególnie wyróżnia się w analizie danych i obciążeniach związanych ze sztuczną inteligencją.\n\nPrzetwarzanie w chmurze oferuje trzy podstawowe modele usług, które nakładają się na siebie jak warstwy. Infrastruktura jako usługa (IaaS) zapewnia maszyny wirtualne, pamięć masową i sieci, które klienci konfigurują sami. Platforma jako usługa (PaaS) dodaje systemy operacyjne, bazy danych i narzędzia programistyczne. Oprogramowanie jako usługa (SaaS) dostarcza kompletne aplikacje za pośrednictwem przeglądarek internetowych, całkowicie eliminując instalację i konserwację. Większość ludzi codziennie wchodzi w interakcje z produktami SaaS poprzez pocztę e-mail, edycję dokumentów i aplikacje biznesowe.\n\nEkonomia przetwarzania w chmurze stwarza korzyści dla organizacji niemal każdej wielkości. Startupy uruchamiają się bez zakupu drogiego sprzętu lub zatrudniania wyspecjalizowanego personelu do utrzymywania centrów danych. Płacą tylko za zużyte zasoby, zwiększając je w okresach szczytu i zmniejszając w okresach spowolnienia. Ta elastyczność przekształciła ekonomię zakładania firmy technologicznej. Usługa, która mogła wymagać milionowych inwestycji w infrastrukturę, może teraz zostać uruchomiona przy minimalnym kapitale.\n\nOrganizacje korporacyjne coraz częściej migrują z lokalnych centrów danych do platform chmurowych. General Electric skonsolidował setki centrów danych w hybrydową architekturę chmurową, począwszy od 2014 roku. Capital One, jeden z największych banków w Ameryce, ogłosił w 2020 roku, że zamknął swoje ostatnie centrum danych po całkowitej migracji do AWS. Te transformacje trwają lata i pochłaniają miliardy dolarów, ale ostatecznie obniżają koszty przy jednoczesnym zwiększeniu możliwości.\n\nBezpieczeństwo w chmurze różni się fundamentalnie od tradycyjnych podejść, ale często przewyższa to, co organizacje osiągają samodzielnie. Najwięksi dostawcy usług chmurowych zatrudniają tysiące specjalistów ds. bezpieczeństwa i inwestują miliardy w technologie ochronne. Posiadają certyfikaty do obsługi tajnych informacji rządowych i wrażliwych danych finansowych. Modele wspólnej odpowiedzialności oznaczają, że dostawcy zabezpieczają infrastrukturę, a klienci zabezpieczają własne aplikacje i konfiguracje danych.\n\nGeograficzne rozmieszczenie centrów danych w chmurze służy celom wykraczającym poza optymalizację wydajności. Przepisy w wielu krajach wymagają, aby niektóre dane pozostawały w granicach państwowych. Dostawcy usług chmurowych budują regionalne centra danych, aby spełnić te wymogi suwerenności. Europejscy klienci mogą zapewnić, że ich dane pozostaną we Frankfurcie lub Amsterdamie. Australijskie firmy przechowują informacje w swoim kraju. Ta rozproszona architektura zapewnia również możliwości odzyskiwania po awarii, na które niewiele organizacji mogłoby sobie pozwolić niezależnie.\n\nPrzetwarzanie brzegowe (edge computing) rozszerza możliwości chmury bliżej miejsca, w którym powstają dane. Zamiast wysyłać wszystko do odległych centrów danych, systemy brzegowe przetwarzają informacje lokalnie na potrzeby aplikacji wymagających natychmiastowej reakcji. Autonomiczne pojazdy nie mogą czekać, aż dane przejadą tysiące kilometrów, zanim zdecydują się zahamować. Czujniki przemysłowe analizujące wibracje urządzeń potrzebują natychmiastowego wykrywania anomalii. Przetwarzanie brzegowe przenosi inteligencję chmury do scenariuszy, w których liczą się milisekundy.\n\nPrzetwarzanie bezserwerowe (serverless computing) reprezentuje najnowszą ewolucję architektury chmurowej. W tym modelu programiści piszą kod bez zarządzania jakąkolwiek infrastrukturą. Platformy chmurowe automatycznie alokują zasoby, gdy kod jest uruchamiany, i pobierają opłaty tylko za rzeczywisty czas wykonania. Funkcja, która działa przez 100 milisekund, kosztuje ułamek centa. Aplikacje mogą skalować się od zera do obsługi milionów żądań bez żadnych zmian w konfiguracji.\n\nWpływ przetwarzania w chmurze na środowisko generuje zarówno obawy, jak i możliwości. Centra danych zużywają około 1,5 procent globalnej energii elektrycznej, a ten udział stale rośnie. Jednak dostawcy usług chmurowych działają znacznie wydajniej niż typowe korporacyjne centra danych. Google twierdzi, że jego obiekty osiągają średni współczynnik efektywności wykorzystania energii (PUE) na poziomie 1,1 w porównaniu ze średnią branżową powyżej 1,5. Platformy chmurowe w coraz większym stopniu zasilają operacje energią odnawialną, a Microsoft zobowiązał się do bycia ujemnym pod względem emisji dwutlenku węgla do 2030 roku.\n\nSztuczna inteligencja i uczenie maszynowe stały się definiującymi cechami platform chmurowych. Wstępnie wytrenowane modele do rozpoznawania obrazów, przetwarzania języka naturalnego i syntezy mowy są dostępne za pośrednictwem prostych interfejsów programistycznych. Organizacje bez wiedzy specjalistycznej w zakresie uczenia maszynowego mogą dodawać zaawansowane funkcje do swoich aplikacji. Dostawcy usług chmurowych agresywnie konkurują na funkcjach AI, każdy twierdząc, że ma przewagę pod względem dokładności, łatwości użytkowania i zakresu dostępnych modeli.\n\nStrategie multi-cloud pozwalają organizacjom korzystać z wielu dostawców jednocześnie, unikając zależności od jednego dostawcy. Kubernetes, system orkiestracji kontenerów o otwartym kodzie źródłowym, pierwotnie opracowany przez Google, umożliwia przenoszenie obciążeń między chmurami. Firmy wybierają różnych dostawców dla różnych obciążeń w oparciu o koszty, wydajność lub wyspecjalizowane możliwości. Ta elastyczność wymaga dodatkowej złożoności, ale zmniejsza obawy związane z uzależnieniem od jednego dostawcy.\n\nPrzyszłość przetwarzania w chmurze wskazuje na jeszcze większą integrację z codziennym życiem i działalnością biznesową. Zasoby obliczeń kwantowych pojawiają się już na platformach chmurowych, choć praktyczne zastosowania pozostają ograniczone. Sztuczna inteligencja zautomatyzuje więcej zarządzania infrastrukturą, zmniejszając wiedzę specjalistyczną wymaganą do wdrażania zaawansowanych systemów. Granica między urządzeniami lokalnymi a zasobami chmurowymi będzie się dalej zacierać wraz z poprawą łączności i dojrzewaniem przetwarzania brzegowego. Niezależnie od tego, jakie konkretne technologie się pojawią, fundamentalna zmiana z posiadanej infrastruktury na wynajmowane usługi będzie nadal przekształcać sposób, w jaki ludzkość przetwarza dane.",
    "wordCount": 1057,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Kiedy Amazon Web Services uruchomił swoje pierwsze produkty chmurowe?",
        "options": [
          "Marzec 2006",
          "Luty 2010",
          "Styczeń 2014",
          "Listopad 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Które z trzech podstawowych modeli usług chmurowych zostały wymienione? Zaznacz wszystkie poprawne.",
        "options": [
          "Infrastruktura jako usługa (IaaS)",
          "Platforma jako usługa (PaaS)",
          "Oprogramowanie jako usługa (SaaS)",
          "Sprzęt jako usługa"
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
        "question": "Capital One ogłosił w 2020 roku, że zamknął swoje ostatnie centrum danych po migracji w całości do AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Jaki procent globalnego zużycia energii elektrycznej pochłaniają centra danych?",
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
        "question": "Który dyrektor generalny przestawił strategię Microsoftu wokół usług chmurowych, począwszy od 2014 roku?",
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
        "question": "Jaki system open-source umożliwia przenoszenie obciążeń między różnymi dostawcami chmury?",
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
        "question": "Ile rocznych przychodów generuje AWS (w miliardach dolarów) ?",
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
        "question": "Do kiedy Microsoft zobowiązał się do osiągnięcia neutralności węglowej?",
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
    "title": "Rewolucja w Komputerach Kwantowych",
    "content": "Komputery kwantowe reprezentują najbardziej znaczącą transformację w mocy obliczeniowej od czasu wynalezienia tranzystora, obiecując rozwiązywanie problemów, których rozwiązanie przez komputery klasyczne zajęłoby dłużej niż wiek wszechświata. Maszyny te wykorzystują zadziwiające właściwości mechaniki kwantowej do przeprowadzania obliczeń w fundamentalnie nowy sposób, który wymyka się codziennej intuicji. Zrozumienie tej rewolucyjnej technologii ujawnia zarówno jej niezwykły potencjał, jak i ogromne wyzwania, które wciąż stoją na drodze do pełnej realizacji obietnic komputerów kwantowych.\n\nKomputery klasyczne kodują informacje jako bity, które istnieją jako zero lub jeden w danym momencie. Każde zdjęcie, dokument i film na Twoich urządzeniach sprowadza się do długich ciągów tych binarnych cyfr manipulowanych za pomocą operacji logicznych. To podejście napędzało niezwykły postęp od lat 40. XX wieku, a procesory zawierają obecnie miliardy tranzystorów na chipach mniejszych niż paznokieć. Jednak pewne problemy pozostają uporczywie poza zasięgiem, ponieważ liczba wymaganych obliczeń rośnie wykładniczo wraz z rozmiarem problemu.\n\nKomputery kwantowe używają bitów kwantowych, zwanych kubitami, które mogą istnieć w superpozycji, reprezentując jednocześnie zero i jeden, dopóki nie zostaną zmierzone. Ta właściwość pozwala systemom kwantowym na eksplorowanie wielu możliwych rozwiązań naraz, zamiast sprawdzania ich po kolei. Kiedy wiele kubitów zostaje splątanych, pomiar jednego natychmiast wpływa na pozostałe, niezależnie od odległości fizycznej. Te zjawiska kwantowe umożliwiają algorytmy, które znacznie przewyższają klasyczne podejścia dla określonych typów problemów.\n\nRichard Feynman, laureat Nagrody Nobla w dziedzinie fizyki, zaproponował koncepcję komputerów kwantowych podczas wykładu w California Institute of Technology w maju 1981 roku. Zauważył, że symulacja systemów mechaniki kwantowej na komputerach klasycznych wymagała wykładniczo rosnących zasobów wraz ze wzrostem rozmiaru systemu. Feynman zasugerował, że tylko komputer mechaniki kwantowej może skutecznie symulować fizykę kwantową. Ten wgląd zapoczątkował dziedzinę, która rozwijała się powoli przez dziesięciolecia, zanim ostatnie przełomy przyspieszyły postęp.\n\nDavid Deutsch z Oxford University sformalizował teorię obliczeń kwantowych w 1985 roku, opisując, jak uniwersalny komputer kwantowy może wykorzystywać superpozycję i interferencję. Peter Shor z Bell Labs rozsławił komputery kwantowe w 1994 roku, kiedy opracował algorytm, który mógłby rozkładać duże liczby na czynniki wykładniczo szybciej niż jakakolwiek znana klasyczna metoda. To odkrycie zagroziło szyfrowaniu RSA, które zabezpiecza komunikację internetową, czyniąc nagle komputery kwantowe kwestią bezpieczeństwa narodowego.\n\nBudowanie rzeczywistych komputerów kwantowych okazało się niezwykle trudne, ponieważ kubity są delikatne i łatwo zakłócane przez swoje otoczenie. Każda interakcja ze światem zewnętrznym powoduje dekoherencję, zapadanie się superpozycji i niszczenie informacji kwantowej. Wczesne eksperymenty utrzymywały koherencję tylko przez nanosekundy. Naukowcy opracowali skomplikowane techniki izolacji, w tym obwody nadprzewodzące chłodzone do temperatur niższych niż w przestrzeni kosmicznej, zazwyczaj około 15 milikelwinów, czyli niewiele powyżej zera absolutnego.\n\nIBM umieścił pierwszy komputer kwantowy dostępny za pośrednictwem chmury, zwany IBM Quantum Experience, w sieci w maju 2016 roku, umożliwiając naukowcom i entuzjastom na całym świecie eksperymentowanie z prawdziwym sprzętem kwantowym. Początkowy system zawierał zaledwie pięć kubitów, co ledwo wystarczało na proste demonstracje. Do 2023 roku IBM wdrożył systemy przekraczające 1000 kubitów i ogłosił plany dotyczące systemów ze 100 000 kubitów do 2033 roku. Maszyny te wciąż są dalekie od zastąpienia komputerów klasycznych, ale wykazują stały postęp w kierunku praktycznej użyteczności.\n\nGoogle osiągnął kamień milowy zwany kwantową supremacją w październiku 2019 roku, kiedy jego 53-kubitowy procesor Sycamore wykonał obliczenie w 200 sekund, które zajęłoby najszybszemu superkomputerowi na świecie około 10 000 lat. Krytycy zakwestionowali to porównanie, argumentując, że superkomputery IBM mogłyby wykonać to zadanie w ciągu dni, a nie tysiącleci. Niemniej jednak osiągnięcie to wykazało, że komputery kwantowe mogą przewyższać systemy klasyczne przynajmniej w niektórych zadaniach.\n\nKorekcja błędów stanowi prawdopodobnie największą przeszkodę w użytecznych obliczeniach kwantowych. Fizyczne kubity są zbyt zaszumione i zawodne do złożonych obliczeń. Kwantowa korekcja błędów koduje jeden logiczny kubit na wielu fizycznych kubitach w celu wykrywania i naprawiania błędów, ale obecne podejścia wymagają tysięcy fizycznych kubitów na jeden logiczny kubit. Komputer kwantowy rozwiązujący praktyczne problemy może potrzebować milionów fizycznych kubitów, co znacznie przekracza obecne możliwości.\n\nRóżne technologie konkurują o zbudowanie najlepszych kubitów dla przyszłych komputerów kwantowych. Obwody nadprzewodzące, używane przez IBM i Google, wykorzystują sprawdzone techniki produkcyjne z przemysłu półprzewodnikowego. Uwięzione jony, rozwijane przez IonQ i Honeywell, utrzymują naładowane atomy w polach elektromagnetycznych z wyjątkową precyzją. Systemy fotoniczne kodują informacje w cząstkach światła, które mogą przemieszczać się na duże odległości bez dekoherencji. Kubity topologiczne, wciąż w dużej mierze teoretyczne, przechowywałyby informacje we wzorach odpornych na lokalne zakłócenia.\n\nZastosowania w chemii kwantowej mogą przynieść pierwsze praktyczne korzyści z obliczeń kwantowych. Symulacja cząsteczek w celu projektowania nowych leków, materiałów i katalizatorów wymaga obliczeń mechaniki kwantowej, które skalują się wykładniczo na komputerach klasycznych. Komputer kwantowy mógłby modelować reakcje chemiczne na poziomie atomowym, potencjalnie przyspieszając odkrywanie leków, nawozów i technologii czystej energii. Firmy takie jak Roche, Merck i BASF uruchomiły programy badawcze w dziedzinie obliczeń kwantowych, przewidując te możliwości.\n\nProblemy optymalizacyjne obejmujące logistykę, finanse i uczenie maszynowe stanowią kolejny obiecujący obszar zastosowań. Znalezienie najlepszej trasy dla ciężarówek dostawczych, optymalnych portfeli dla inwestorów lub idealnych parametrów dla sieci neuronowych wiąże się z przeszukiwaniem rozległych przestrzeni rozwiązań. Kwantowe wyżarzanie, wyspecjalizowana forma obliczeń kwantowych komercjalizowana przez D-Wave Systems od 2011 roku, zajmuje się bezpośrednio optymalizacją. Duże korporacje, w tym Volkswagen, JPMorgan Chase i Lockheed Martin, zbadały optymalizację kwantową pod kątem rzeczywistych wyzwań biznesowych.\n\nKryptografia stoi w obliczu zarówno zagrożeń, jak i możliwości wynikających z postępu w obliczeniach kwantowych. Algorytm Shora mógłby złamać powszechnie stosowane szyfrowanie, gdy tylko powstaną wystarczająco potężne komputery kwantowe. Narodowy Instytut Standardów i Technologii (NIST) wybrał nowe postkwantowe standardy kryptograficzne w lipcu 2022 roku po sześcioletnim konkursie mającym na celu zidentyfikowanie algorytmów odpornych na ataki kwantowe. Tymczasem kwantowa dystrybucja klucza wykorzystuje fizykę pomiaru kwantowego do tworzenia teoretycznie niełamliwego szyfrowania dla najbardziej wrażliwej komunikacji.\n\nChiny poczyniły ogromne inwestycje w technologię kwantową, ustanawiając Uniwersytet Nauki i Technologii Chin jako światowego lidera pod kierownictwem fizyka Pana Jianwei. W 2017 roku Chiny wystrzeliły Micius, satelitę, który zademonstrował komunikację zabezpieczoną kwantowo między stacjami naziemnymi oddalonymi o 1200 kilometrów. Chińscy naukowcy ogłosili kwantową supremację za pomocą systemu fotonicznego o nazwie Jiuzhang w grudniu 2020 roku. Stany Zjednoczone odpowiedziały ustawą National Quantum Initiative Act z 2018 roku, przeznaczając 1,2 miliarda dolarów w ciągu pięciu lat na utrzymanie konkurencyjności.\n\nPrzemysł komputerów kwantowych przyciągnął ogromne inwestycje pomimo niepewnych terminów uzyskania praktycznych zwrotów. Finansowanie venture capital dla start-upów kwantowych przekroczyło 2,5 miliarda dolarów w 2022 roku. Duże firmy technologiczne, w tym Microsoft, Amazon i Alibaba, uruchomiły kwantowe usługi w chmurze wraz z dedykowanymi firmami produkującymi sprzęt. Analitycy przewidują, że rynek komputerów kwantowych osiągnie 65 miliardów dolarów do 2030 roku, chociaż szacunki są bardzo zróżnicowane ze względu na niepewność technologiczną.\n\nPrzyszłość komputerów kwantowych zależy od trwałego postępu na wielu frontach jednocześnie. Sprzęt musi się poprawić pod względem skali, koherencji i łączności. Oprogramowanie musi rozwijać wydajne algorytmy i narzędzia programistyczne dostępne poza gronem specjalistów od fizyki kwantowej. Aplikacje muszą wykazać wyraźną przewagę nad klasycznymi alternatywami dla problemów ze świata rzeczywistego. Podróż od demonstracji laboratoryjnych do praktycznej użyteczności może zająć dziesięciolecia, ale potencjalne korzyści uzasadniają kontynuację inwestycji i wysiłków.",
    "wordCount": 1114,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Kto zaproponował koncepcję komputerów kwantowych w maju 1981 roku?",
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
        "question": "Jakie technologie są wymienione jako podejścia do budowy kubitów? Wybierz wszystkie poprawne.",
        "options": [
          "Obwody nadprzewodzące",
          "Uwięzione jony",
          "Systemy fotoniczne",
          "Tranzystory grafenowe"
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
        "question": "IBM udostępnił pierwszy komputer kwantowy dostępny w chmurze w maju 2016 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Ile sekund zajęło procesorowi Sycamore firmy Google ukończenie obliczeń związanych z supremacją kwantową?",
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
        "question": "Kiedy Peter Shor opracował swój słynny algorytm faktoryzacji?",
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
        "question": "Do jakiej temperatury są zazwyczaj chłodzone nadprzewodzące komputery kwantowe?",
        "options": [
          "Około 100 kelwinów",
          "Około 4 kelwinów",
          "Około 15 milikelwinów",
          "Około 1 kelwina"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Jakie finansowanie przeznaczyła ustawa National Quantum Initiative Act na przestrzeni pięciu lat (w miliardach dolarów)?",
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
        "question": "Chiny wystrzeliły satelitę do komunikacji kwantowej o nazwie Micius w 2017 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Kiedy NIST wybrał nowe post-kwantowe standardy kryptograficzne?",
        "options": [
          "Lipiec 2020",
          "Lipiec 2021",
          "Lipiec 2022",
          "Lipiec 2023"
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
    "title": "Globalny Przemysł Półprzewodników",
    "content": "Półprzewodniki stały się fundamentem współczesnej cywilizacji, zasilając wszystko, od smartfonów i samochodów po urządzenia medyczne i systemy wojskowe, od których narody zależą w kwestii bezpieczeństwa. Te maleńkie chipy, zawierające miliardy tranzystorów, reprezentują najbardziej złożone obiekty kiedykolwiek wyprodukowane przez ludzkość, powstające w procesach wymagających precyzji mierzonej w atomach. Globalna konkurencja o kontrolę nad technologią półprzewodników przekształciła ten przemysł w punkt zapalny rywalizacji geopolitycznej, mającej wpływ na dobrobyt gospodarczy i bezpieczeństwo narodowe na całym świecie.\n\nPoczątki półprzewodników sięgają Bell Labs w New Jersey, gdzie 23 grudnia 1947 roku fizycy John Bardeen, Walter Brattain i William Shockley zademonstrowali pierwszy tranzystor. To urządzenie mogło wzmacniać sygnały elektryczne bez generowania ciepła i kruchości lamp próżniowych, co przyniosło jego wynalazcom Nagrodę Nobla w dziedzinie fizyki w 1956 roku. Potencjał miniaturyzacji tranzystora ostatecznie umożliwił rewolucję cyfrową, która przekształciła ludzkie społeczeństwo.\n\nJack Kilby w Texas Instruments i Robert Noyce w Fairchild Semiconductor niezależnie wynaleźli układ scalony w latach 1958 i 1959, łącząc wiele tranzystorów na jednym kawałku materiału półprzewodnikowego. To przełomowe odkrycie wyeliminowało potrzebę ręcznego okablowywania poszczególnych komponentów i umożliwiło produkcję na dużą skalę. Kilby otrzymał Nagrodę Nobla w dziedzinie fizyki w 2000 roku za ten wkład, który umożliwił powstanie współczesnej elektroniki.\n\nGordon Moore, współzałożyciel Intela, zauważył w 1965 roku, że liczba tranzystorów w układach scalonych podwaja się mniej więcej co dwa lata, a koszty pozostają stałe. To spostrzeżenie, znane jako prawo Moore'a, kierowało przemysłem przez sześć dekad wykładniczej poprawy. Współczesne procesory zawierają ponad 100 miliardów tranzystorów, z których każdy ma zaledwie kilka nanometrów szerokości, co odpowiada mniej więcej szerokości 20 atomów krzemu.\n\nProces produkcji półprzewodników obejmuje setki etapów, trwających miesiące precyzyjnych operacji. Inżynierowie zaczynają od cylindrów ultra czystego krzemu, wyhodowanych z roztopionego materiału w temperaturach przekraczających 1400 stopni Celsjusza. Te wlewki są krojone na cienkie płytki (wafle) i polerowane do atomowej gładkości. Fotolitografia projektuje wzory obwodów na płytki za pomocą światła ultrafioletowego, a najbardziej zaawansowane maszyny wykorzystują ekstremalnie ultrafioletowe długości fal wynoszące zaledwie 13,5 nanometra.\n\nTaiwan Semiconductor Manufacturing Company, znana jako TSMC, stała się najważniejszym producentem półprzewodników na świecie. Założona przez Morrisa Changa w 1987 roku, TSMC zapoczątkowała model odlewni produkującej chipy zaprojektowane przez inne firmy. Do 2023 roku TSMC produkowała ponad 90 procent najbardziej zaawansowanych chipów na świecie, w tym procesory dla Apple, AMD i Nvidia. Ta koncentracja możliwości na wyspie, wobec której Chiny zgłaszają roszczenia terytorialne, stała się poważnym problemem geopolitycznym.\n\nSprzęt wymagany do produkcji zaawansowanych półprzewodników stanowi oszałamiające osiągnięcie technologiczne. ASML, holenderska firma, posiada monopol na maszyny do litografii ekstremalnym ultrafioletem, które kosztują około 200 milionów dolarów każda i ważą 180 000 kilogramów. Systemy te wykorzystują plazmę podgrzaną do 220 000 stopni Celsjusza, aby generować precyzyjne długości fal światła. ASML wymagał wkładu od dostawcy optyki Zeiss, twórcy źródła światła Cymer i wielu innych partnerów, aby osiągnąć tę zdolność po dziesięcioleciach rozwoju.\n\nSamsung Electronics i Intel konkurują z TSMC o pozycję lidera w zaawansowanej produkcji, choć obie firmy w ostatnich latach pozostały w tyle. Samsung prowadzi główne zakłady produkcyjne w Korei Południowej i Teksasie, produkując chipy dla różnych klientów oraz własne produkty. Intel, historycznie lider technologiczny, borykał się z opóźnieniami produkcyjnymi i stracił udział w rynku, zanim ogłosił agresywne plany inwestycyjne pod przewodnictwem dyrektora generalnego Pata Gelsingera, począwszy od 2021 roku.\n\nChiny uczyniły niezależność półprzewodników priorytetem narodowym, inwestując ponad 150 miliardów dolarów poprzez National Integrated Circuit Industry Investment Fund i inne programy. Semiconductor Manufacturing International Corporation reprezentuje najbardziej zaawansowanego krajowego producenta w Chinach, choć pozostaje kilka generacji w tyle za TSMC. Amerykańskie kontrole eksportu nałożone począwszy od października 2022 roku ograniczają Chinom dostęp do zaawansowanego sprzętu produkcyjnego i projektów chipów, zwiększając presję na rodzimy rozwój.\n\nPrzemysł motoryzacyjny odkrył swoje niebezpieczne uzależnienie od półprzewodników podczas globalnego niedoboru chipów, który rozpoczął się w 2020 roku. Ponieważ blokady pandemiczne zakłóciły łańcuchy dostaw, producenci samochodów anulowali zamówienia, spodziewając się słabego popytu. Kiedy popyt odrodził się szybciej niż oczekiwano, fabryki półprzewodników przydzieliły moce produkcyjne innym klientom. General Motors, Ford i Toyota przerywały linie produkcyjne sporadycznie przez ponad dwa lata, czekając na chipy. Niedobór kosztował przemysł motoryzacyjny szacunkowo 210 miliardów dolarów utraconych przychodów.\n\nRządy na całym świecie uruchomiły ogromne programy mające na celu budowę krajowych mocy produkcyjnych półprzewodników. Stany Zjednoczone uchwaliły ustawę CHIPS and Science Act w sierpniu 2022 roku, przeznaczając 52 miliardy dolarów na produkcję i badania nad półprzewodnikami. Europejski Chips Act zobowiązał się do przeznaczenia 43 miliardów euro na podobne cele. Japonia ogłosiła subsydia w wysokości 2 bilionów jenów, aby przyciągnąć fabryki TSMC, Samsung i Micron. Indie uruchomiły program o wartości 10 miliardów dolarów, starając się o swój pierwszy zaawansowany zakład produkcyjny.\n\nChipy pamięci reprezentują odrębną kategorię półprzewodników, zdominowaną przez innych graczy niż procesory logiczne. Samsung, SK Hynix z Korei Południowej i Micron ze Stanów Zjednoczonych kontrolują rynek pamięci DRAM dla pamięci komputerowej. Przemysł pamięci flash, który przechowuje dane w smartfonach i dyskach półprzewodnikowych, obejmuje tych samych koreańskich graczy oraz japońskiego producenta Kioxia. Ceny pamięci ulegają gwałtownym wahaniom wraz z cyklami podaży i popytu, tworząc wzorce boomu i upadku, które komplikują decyzje inwestycyjne.\n\nPrzemysł projektowania półprzewodników skoncentrował się wokół kilku wiodących firm, dysponujących ogromnymi zasobami. Nvidia, założona przez Jensena Huanga w 1993 roku, przekształciła się z firmy produkującej karty graficzne w potęgę sztucznej inteligencji, z chipami zasilającymi centra danych na całym świecie. Kapitalizacja rynkowa firmy przekroczyła bilion dolarów w czerwcu 2023 roku. Qualcomm dominuje w procesorach mobilnych dzięki technologii licencjonowanej prawie każdemu producentowi smartfonów. AMD stało się poważnym konkurentem dla Intela w komputerach osobistych i serwerach pod przewodnictwem dyrektor generalnej Lisy Su.\n\nDostawcy sprzętu do produkcji półprzewodników stanowią krytyczną, ale często pomijaną warstwę ekosystemu przemysłu. Applied Materials, Lam Research i KLA Corporation ze Stanów Zjednoczonych dostarczają sprzęt do osadzania, trawienia i kontroli, niezbędny do produkcji. Tokyo Electron z Japonii wnosi systemy powlekania i czyszczenia. Firmy te inwestują miliardy rocznie w badania i rozwój, aby przesuwać granice precyzji produkcji.\n\nŚlad środowiskowy produkcji półprzewodników budzi obawy o zrównoważony rozwój, którymi przemysł coraz bardziej się zajmuje. Nowoczesny zakład produkcyjny zużywa energię elektryczną równoważną małemu miastu, a niektóre zakłady na Tajwanie zużywają tyle energii, co 300 000 domów. Zużycie wody sięga milionów galonów dziennie na procesy chłodzenia i czyszczenia. Przemysł zobowiązał się do przyjęcia energii odnawialnej i recyklingu wody w celu zmniejszenia wpływu na środowisko, a TSMC zobowiązał się do osiągnięcia zerowej emisji netto do 2050 roku.\n\nZaawansowane technologie pakowania zwiększają wydajność półprzewodników ponad to, co może osiągnąć sama miniaturyzacja tranzystorów. Architektury Chiplet łączą wiele mniejszych chipów w pakiety, które działają jak pojedyncze procesory. Trójwymiarowe układanie umieszcza chipy pionowo, połączone mikroskopijnymi filarami. Techniki te umożliwiają dalsze ulepszanie, nawet gdy zbliżanie się do granic atomowych zagraża tradycyjnemu skalowaniu. Najnowsze procesory AMD wykorzystują konstrukcje chiplet, które obniżają koszty produkcji, jednocześnie poprawiając wydajność.\n\nWymagania dotyczące siły roboczej w produkcji półprzewodników stwarzają wyzwania dla rozwoju przemysłu. Wykwalifikowani technicy obsługujący urządzenia produkcyjne wymagają wieloletniego szkolenia. Inżynierowie projektujący procesy nowej generacji potrzebują zaawansowanych stopni naukowych i specjalistycznej wiedzy. Stany Zjednoczone borykają się ze szczególnymi brakami po dziesięcioleciach spadku produkcji. Inicjatywy edukacyjne i polityka imigracyjna zadecydują, czy kraje będą w stanie obsadzić zakłady produkcyjne, które ścigają się, aby zbudować.\n\nObawy dotyczące bezpieczeństwa przenikają przemysł półprzewodników, ponieważ chipy stają się bronią w technologicznej konkurencji między narodami. Systemy obronne zależą od zaufanych dostaw chipów wolnych od ukrytych luk. Dobrobyt gospodarczy wymaga dostępu do najbardziej zaawansowanych technologii dla sztucznej inteligencji, pojazdów autonomicznych i innych wschodzących zastosowań. Strategiczne znaczenie półprzewodników zapewnia, że rządy będą nadal mocno inwestować i ograniczać eksport, aby chronić postrzegane interesy narodowe.\n\nNastępna dekada zadecyduje, czy przemysł półprzewodników pozostanie skoncentrowany w Azji Wschodniej, czy też zdywersyfikuje się globalnie. Ogromne inwestycje w nowe zakłady produkcyjne będą potrzebowały lat, aby stać się produktywne. Wyzwania technologiczne mnożą się, gdy tranzystory zbliżają się do fundamentalnych granic fizycznych. Nowe paradygmaty obliczeniowe, w tym przetwarzanie kwantowe i chipy neuromorficzne, mogą ostatecznie uzupełnić lub zastąpić tradycyjne półprzewodniki. Niezależnie od kierunku, jaki obierze przemysł, te maleńkie chipy pozostaną niezbędne dla współczesnego życia w dającej się przewidzieć przyszłości.",
    "wordCount": 1288,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Kiedy zademonstrowano pierwszy tranzystor w Bell Labs?",
        "options": [
          "23 grudnia 1945",
          "23 grudnia 1947",
          "23 grudnia 1950",
          "23 grudnia 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Które firmy są wymienione jako producenci chipów pamięci? Wybierz wszystkie poprawne odpowiedzi.",
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
        "question": "TSMC wyprodukowało ponad 90 procent najbardziej zaawansowanych chipów na świecie do 2023 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Ile kosztuje (w milionach dolarów) maszyna do litografii ekstremalnym ultrafioletem (EUV) firmy ASML?",
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
        "question": "Kto założył TSMC w 1987 roku?",
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
        "question": "Ile środków ustawa CHIPS and Science Act przeznaczyła na półprzewodniki w sierpniu 2022 roku?",
        "options": [
          "32 miliardy dolarów",
          "42 miliardy dolarów",
          "52 miliardy dolarów",
          "62 miliardy dolarów"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Ile kosztował przemysł motoryzacyjny niedobór chipów (w miliardach dolarów) w utraconych przychodach?",
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
        "question": "Kapitalizacja rynkowa Nvidii przekroczyła bilion dolarów w czerwcu 2023 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "Do jakiej temperatury nagrzewana jest plazma w maszynach ASML EUV?",
        "options": [
          "22 000 stopni Celsjusza",
          "120 000 stopni Celsjusza",
          "220 000 stopni Celsjusza",
          "1 400 stopni Celsjusza"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Ile miliardów tranzystorów zawierają nowoczesne procesory?",
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
        "question": "Kiedy Jack Kilby wynalazł układ scalony w Texas Instruments?",
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
    "title": "Ewolucja Mediów Strumieniowych",
    "content": "Media strumieniowe fundamentalnie zmieniły sposób, w jaki ludzkość konsumuje rozrywkę, edukację i informacje, zastępując media fizyczne i ramówki programowe natychmiastowym dostępem do praktycznie nieograniczonej zawartości z dowolnego urządzenia podłączonego do Internetu. Ta rewolucja technologiczna, która rozpoczęła się od ziarnistych klipów wideo w latach 90., dostarcza obecnie filmy w ultra-wysokiej rozdzielczości, koncerty na żywo i interaktywne doświadczenia miliardom użytkowników na całym świecie. Historia streamingu ujawnia, jak postępy w kompresji, przepustowości i modelach biznesowych połączyły się, by przekształcić całe branże.\n\nTechniczne fundamenty streamingu wyrosły z badań nad kompresją wideo i protokołami sieciowymi w latach 80. i 90. Inżynierowie z Moving Picture Experts Group opracowali standardy MPEG, które uczyniły cyfrowe wideo praktycznym, przy czym MPEG-1 pojawił się w 1993 roku, a MPEG-4 w 1998 roku. Te algorytmy kompresji zmniejszyły rozmiary plików wideo do możliwych do zarządzania, eliminując zbędne informacje między klatkami i przybliżając szczegóły, których ludzkie oko nie zauważyłoby. Bez takiej kompresji streaming wideo wymagałby przepustowości znacznie przekraczającej możliwości sieci.\n\nRealNetworks uruchomiła RealPlayer w 1995 roku, pioniersko przesyłając strumieniowo audio i wideo przez wczesne połączenia internetowe. Format RealAudio firmy pozwolił stacjom radiowym po raz pierwszy nadawać programy przez Internet. RealVideo pojawił się w 1997 roku, choć jego maleńkie, zacinające się filmy niewiele przypominały nowoczesny streaming. W szczytowym momencie, około roku 2000, RealPlayer był zainstalowany na ponad 85 procentach komputerów podłączonych do Internetu.\n\nApple wkroczyło na arenę streamingu z QuickTime, pierwotnie wydanym w 1991 roku do odtwarzania lokalnych plików wideo. Firma dodała funkcje streamingu w latach 90. i wykorzystała technologię podczas uruchomienia iTunes w styczniu 2001 roku. Chociaż iTunes początkowo koncentrował się na pobieraniu muzyki, a nie na streamingu, zademonstrował konsumencki apetyt na natychmiastowy dostęp cyfrowy. Apple sprzedało ponad 70 milionów utworów za pośrednictwem iTunes w ciągu pierwszego roku.\n\nZałożenie YouTube'a w lutym 2005 roku przez byłych pracowników PayPal, Chada Hurley'a, Steve'a Chena i Jaweda Karima, zapoczątkowało mainstreamową erę streamingu wideo. Platforma sprawiła, że przesyłanie i udostępnianie wideo stało się proste dla zwykłych użytkowników bez wiedzy technicznej. Pierwszy film, przedstawiający Karima w San Diego Zoo, został opublikowany 23 kwietnia 2005 roku. Google rozpoznał potencjał YouTube'a i przejął firmę za 1,65 miliarda dolarów w październiku 2006 roku, zaledwie osiemnaście miesięcy po jej założeniu.\n\nNetflix rozpoczął działalność jako wypożyczalnia DVD wysyłanych pocztą w 1997 roku, założona przez Reeda Hastingsa i Marca Randolpha w Scotts Valley w Kalifornii. Firma wprowadziła nielimitowane wypożyczenia za miesięczną opłatą abonamentową w 1999 roku, rzucając wyzwanie modelowi wypożyczania Blockbustera \"za sztukę\". Netflix uruchomił streaming wideo w styczniu 2007 roku, początkowo jako uzupełnienie swojej usługi DVD. Abonenci mogli oglądać ograniczony wybór filmów i programów telewizyjnych bezpośrednio na swoich komputerach, bez czekania na dostarczenie płyt.\n\nPrzejście od DVD do streamingu przyspieszyło w latach 2010, wraz z poprawą prędkości Internetu i rozszerzeniem bibliotek treści. Netflix rozpoczął produkcję oryginalnych programów od premiery \"House of Cards\" w lutym 2013 roku, która spotkała się z uznaniem krytyków i pokazała, że platformy streamingowe mogą konkurować z tradycyjnymi stacjami telewizyjnymi o talent i jakość. Firma intensywnie inwestowała w oryginalne treści, wydając ponad 17 miliardów dolarów rocznie na programy do 2022 roku.\n\nSpotify zrewolucjonizował streaming muzyki po tym, jak jego szwedzcy założyciele, Daniel Ek i Martin Lorentzon, uruchomili usługę w październiku 2008 roku. Platforma oferowała zarówno bezpłatne słuchanie wspierane reklamami, jak i subskrypcje premium bez reklam. Spotify negocjowało umowy licencyjne z największymi wytwórniami płytowymi pomimo początkowego oporu ze strony branży, która wciąż odzyskiwała się po niszczycielskim wpływie piractwa. Do grudnia 2023 roku Spotify raportowało 602 miliony aktywnych użytkowników miesięcznie i ponad 236 milionów płacących subskrybentów.\n\nAmazon Prime Video wyłoniło się z przejęcia przez Amazon w 2006 roku usługi wideo, która stała się Amazon Unbox. Firma połączyła streaming wideo z członkostwem Prime, począwszy od lutego 2011 roku, zwiększając wartość subskrypcji, która wcześniej oferowała jedynie szybszą wysyłkę. Amazon rozpoczął produkcję oryginalnych treści w 2013 roku i od tego czasu zdobył nagrody Emmy i Oscary za swoje produkcje. Połączenie streamingu wideo z korzyściami zakupowymi tworzy unikalne przewagi konkurencyjne.\n\nDisney uruchomił Disney Plus 12 listopada 2019 roku, wykorzystując swoją ogromną bibliotekę treści, w tym Marvel, Star Wars, Pixar i National Geographic. Usługa przyciągnęła 10 milionów subskrybentów w ciągu pierwszego dnia, demonstrując siłę uwielbianych franczyz i agresywnej polityki cenowej. Disney Plus osiągnął ponad 160 milionów subskrybentów w ciągu czterech lat, choć firma stanęła w obliczu presji osiągnięcia rentowności po początkowych stratach wynikających z dużych inwestycji w treści.\n\nStreaming na żywo rozszerzył się poza rozrywkę i obejmuje gry, edukację, fitness i niezliczone inne dziedziny. Twitch, założony w 2011 roku i przejęty przez Amazon za 970 milionów dolarów w 2014 roku, spopularyzował streaming na żywo gier wideo. Profesjonalni gracze transmitują do milionów widzów, zarabiając na subskrypcjach i darowiznach. Platforma osiągnęła średnio ponad 31 milionów dziennych odwiedzających do 2023 roku, konkurując z tradycyjnymi transmisjami sportowymi o młodych odbiorców.\n\nInnowacje techniczne nadal poprawiają jakość i wydajność streamingu. Adaptacyjny streaming bitrate automatycznie dostosowuje jakość wideo w zależności od dostępnej przepustowości, zapobiegając buforowaniu i jednocześnie maksymalizując rozdzielczość, gdy połączenia na to pozwalają. Sieci dostarczania treści umieszczają serwery geograficznie blisko widzów, zmniejszając opóźnienia i poprawiając niezawodność. Ulepszenia kodeków, w tym H.265 i AV1, zapewniają wyższą jakość przy niższych bitrate'ach, umożliwiając streaming 4K i 8K nawet na ograniczonych połączeniach.\n\nInfrastruktura obsługująca usługi streamingowe wymaga ogromnych inwestycji w centra danych i przepustowość sieci. Dostarczanie treści przez Netflix wykorzystuje serwery umieszczone w sieciach dostawców usług internetowych, przechowując kopie popularnych tytułów lokalnie, aby zmniejszyć odległość przesyłania danych. W szczytowych godzinach wieczornych streaming wideo odpowiada za ponad 60 procent ruchu internetowego w Ameryce Północnej. To nagromadzenie wywołało debaty na temat neutralności sieci i tego, czy usługi streamingowe powinny płacić za priorytetowe dostarczanie.\n\nStreaming muzyki fundamentalnie zmienił sposób, w jaki artyści zarabiają dochody i jak działają wytwórnie płytowe. Spotify płaci artystom około 0,003 do 0,005 dolara za stream, co wymaga milionów odtworzeń, aby wygenerować znaczące przychody. Ten model faworyzuje artystów z dużymi, zaangażowanymi grupami fanów, jednocześnie utrudniając wschodzącym muzykom utrzymanie kariery. Taylor Swift słynnie usunęła swoją muzykę ze Spotify w latach 2014-2017, protestując przeciwko ekonomii streamingu, zanim ostatecznie powróciła.\n\nStreaming podcastów eksplodował z niszowego medium do głównej kategorii treści, przyciągającej miliardy inwestycji. Spotify przejęło firmy podcastowe Gimlet Media i Anchor w lutym 2019 roku za łączną kwotę około 340 milionów dolarów. Apple, które spopularyzowało podcasty poprzez integrację z iTunes, począwszy od 2005 roku, stoi w obliczu zwiększonej konkurencji ze strony Spotify i Amazona. Do 2023 roku istniało ponad 2 miliony podcastów z ponad 48 milionami odcinków.\n\nWojny streamingowe nasiliły się, gdy tradycyjne firmy medialne uruchomiły konkurujące usługi. HBO Max, Paramount Plus, Peacock i Apple TV Plus weszły na rynek między 2019 a 2020 rokiem. Ta fragmentacja zmusza konsumentów do subskrypcji wielu usług, aby uzyskać dostęp do wszystkich pożądanych treści, ironicznie odtwarzając niektóre z niedogodności pakietów telewizji kablowej, które streaming początkowo obiecywał wyeliminować. Analitycy branżowi przewidują konsolidację, ponieważ mniejsze usługi mają trudności z konkurowaniem.\n\nEkspansja międzynarodowa stwarza zarówno możliwości, jak i wyzwania dla platform streamingowych. Netflix działa w ponad 190 krajach i produkuje treści w dziesiątkach języków. Koreański serial \"Squid Game\" stał się najczęściej oglądanym programem Netflix w historii we wrześniu 2021 roku, demonstrując globalny apetyt na treści w językach innych niż angielski. Lokalni konkurenci, w tym Hotstar w Indiach, iQiyi w Chinach i Globoplay w Brazylii, utrzymują silną pozycję na swoich rynkach macierzystych.\n\nKwestie regulacyjne dotyczące usług streamingowych mnożą się, ponieważ stają się one dominującymi platformami rozrywkowymi. Pytania dotyczące prywatności danych, moderacji treści, praktyk pracy i koncentracji rynkowej przyciągają uwagę polityków. Unia Europejska wymaga, aby usługi streamingowe zapewniały, że 30 procent ich katalogów stanowią utwory europejskie. Niektóre kraje nakładają podatki na subskrypcje streamingowe, aby finansować lokalną produkcję treści.\n\nPrzyszłość streamingu wskazuje na większą interaktywność, immersję i personalizację. Usługi gier w chmurze od Microsoftu, Sony i innych przesyłają strumieniowo gry wideo bez konieczności posiadania drogiego sprzętu. Doświadczenia w wirtualnej rzeczywistości mogłyby ostatecznie być przesyłane strumieniowo do lekkich zestawów słuchawkowych. Algorytmy sztucznej inteligencji będą nadal udoskonalać rekomendacje i potencjalnie generować spersonalizowane treści. Niezależnie od konkretnych technologii, które się pojawią, streaming na stałe przekształcił relacje między twórcami a odbiorcami na całym świecie.",
    "wordCount": 1310,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Kiedy Netflix uruchomił swoją usługę streamingu wideo?",
        "options": [
          "Styczeń 2005",
          "Styczeń 2007",
          "Styczeń 2009",
          "Styczeń 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Które firmy założyły główne platformy streamingowe? Wybierz wszystkie poprawne odpowiedzi.",
        "options": [
          "Chad Hurley współzałożył YouTube",
          "Reed Hastings współzałożył Netflix",
          "Daniel Ek współzałożył Spotify",
          "Bill Gates założył Disney Plus"
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
        "question": "Google przejął YouTube za 1,65 miliarda dolarów w październiku 2006 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Ile milionów subskrybentów Spotify zgłosił jako płacących subskrybentów do grudnia 2023 roku?",
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
        "question": "Kiedy przesłano pierwszy film na YouTube?",
        "options": [
          "14 lutego 2005",
          "23 kwietnia 2005",
          "4 lipca 2005",
          "9 października 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Ilu subskrybentów przyciągnął Disney Plus w pierwszym dniu?",
        "options": [
          "1 milion",
          "5 milionów",
          "10 milionów",
          "20 milionów"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Ile zapłacił Amazon za przejęcie Twitcha w 2014 roku (w milionach dolarów)?",
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
        "question": "Netflix rozpoczął działalność jako wypożyczalnia DVD wysyłanych pocztą w 1997 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Który oryginalny serial Netflix został wydany w lutym 2013 roku?",
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
        "question": "Jaki procent ruchu internetowego w Ameryce Północnej przypada na streaming wideo w godzinach szczytu?",
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
        "question": "Który koreański serial stał się najczęściej oglądanym programem Netflix wszech czasów we wrześniu 2021 roku?",
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
    "title": "Nauka o Wyszukiwarkach Internetowych",
    "content": "Wyszukiwarki stały się głównymi bramami, przez które ludzkość uzyskuje dostęp do ogromnego repozytorium informacji w Internecie, przetwarzając miliardy zapytań dziennie i kształtując sposób, w jaki ludzie odkrywają, oceniają i rozumieją otaczający ich świat. Wyrafinowane algorytmy napędzające te systemy reprezentują jedne z najbardziej złożonych programów, jakie kiedykolwiek opracowano, łącząc techniki z zakresu wyszukiwania informacji, przetwarzania języka naturalnego, uczenia maszynowego i przetwarzania rozproszonego. Zrozumienie, jak działają wyszukiwarki, ujawnia zarówno ich niezwykłe możliwości, jak i głęboki wpływ na wiedzę i zachowanie ludzi.\n\nPoczątki wyszukiwania w Internecie sięgają wczesnych lat 90., kiedy Internet stawał się zbyt duży dla ręcznie tworzonych katalogów. Archie, stworzony przez Alana Emtage'a na Uniwersytecie McGill w Montrealu w 1990 roku, indeksował nazwy plików na serwerach FTP, ale nie przeszukiwał stron internetowych. World Wide Web Wanderer, opracowany przez Matthew Graya w MIT w 1993 roku, stał się pierwszym web crawlerem, mierzącym wzrost Internetu poprzez automatyczne odwiedzanie stron. Te prymitywne narzędzia położyły podwaliny pod bardziej zaawansowane systemy.\n\nAltaVista została uruchomiona w grudniu 1995 roku i szybko stała się wiodącą wyszukiwarką swojej ery. Opracowana przez badaczy w Digital Equipment Corporation w Palo Alto w Kalifornii, AltaVista mogła przeszukiwać bazę danych 20 milionów stron internetowych przy użyciu indeksowania pełnotekstowego. Użytkownicy byli zachwyceni wynikami pojawiającymi się w ciągu kilku sekund dla zapytań dotyczących milionów dokumentów. U szczytu popularności w 1997 roku AltaVista przetwarzała 80 milionów zapytań dziennie.\n\nLarry Page i Sergey Brin stworzyli Google jako projekt badawczy Uniwersytetu Stanforda w 1996 roku, wprowadzając algorytm PageRank, który miał przekształcić wyszukiwanie. Ich spostrzeżeniem było to, że linki między stronami internetowymi zawierają cenne informacje o trafności i autorytecie. Strona, do której linkuje wiele innych stron, szczególnie ważnych, powinna znajdować się wyżej niż strona z niewielką liczbą linków. To podejście przyniosło znacznie lepsze wyniki niż konkurencja, która klasyfikowała strony głównie na podstawie częstotliwości występowania słów kluczowych.\n\nPageRank symuluje losowego surfera internetowego, który klika linki losowo i okazjonalnie przeskakuje do całkowicie losowej strony. Prawdopodobieństwo, że ten hipotetyczny surfer odwiedzi konkretną stronę, staje się jej wynikiem PageRank. Strony, które otrzymują wiele linków ze stron o wysokim PageRank, same gromadzą wyższe wyniki. Ten model matematyczny, szczegółowo opisany w artykule Page'a i Brina z 1998 roku, opublikowanym, gdy byli doktorantami, pozostaje podstawą rankingu Google pomimo licznych późniejszych ulepszeń.\n\nProces przeszukiwania sieci rozpoczyna się od listy znanych adresów URL, które odwiedzają zautomatyzowane programy zwane pająkami lub crawlerami. Crawler pobiera zawartość każdej strony i wyodrębnia wszystkie hiperłącza, które zawiera. Nowe adresy URL są dodawane do kolejki do przyszłego przeszukiwania. Crawler Google, pierwotnie nazwany BackRub, a później Googlebot, nieustannie odwiedza miliardy stron, priorytetowo traktując często aktualizowane witryny i te z wieloma linkami przychodzącymi. Pełne przeszukanie sieci zajmuje tygodnie, chociaż popularne strony są ponownie przeszukiwane znacznie częściej.\n\nIndeksowanie przekształca surową zawartość strony internetowej w ustrukturyzowane dane, które umożliwiają szybkie wyszukiwanie. Wyszukiwarki budują indeksy odwrócone, które mapują każde słowo na listę dokumentów, które je zawierają. Kiedy szukasz terminu, silnik wyszukuje listę postów tego terminu, zamiast skanować każdy dokument. Dodatkowe struktury danych przechowują informacje o pozycjach słów w celu dopasowania fraz, tekst kotwiczny z linków przychodzących i metadane, takie jak tytuły stron i daty modyfikacji.\n\nPrzetwarzanie zapytań interpretuje, czego użytkownicy naprawdę chcą, kiedy wpisują wyszukiwane hasła. Rozumienie języka naturalnego pomaga wyszukiwarkom rozpoznać, że wyszukiwanie butów do biegania prawdopodobnie szuka produktów, a nie informacji o obuwiu, które biega. Rozpoznawanie jednostek identyfikuje wyszukiwania osób, miejsc, organizacji i koncepcji. Rozszerzanie zapytań dodaje synonimy i powiązane terminy, aby poprawić odzyskiwanie informacji. Korekta pisowni naprawia literówki przed wykonaniem wyszukiwań, przy czym Google poprawia około 10 procent wszystkich zapytań.\n\nAlgorytmy rankingowe łączą setki sygnałów, aby ustalić, które strony najlepiej odpowiadają na każde zapytanie. Oprócz PageRank, Google bierze pod uwagę czynniki, w tym obecność słów kluczowych w tytułach i nagłówkach, świeżość treści, przyjazność dla urządzeń mobilnych, szybkość ładowania strony i trafność geograficzną. Modele uczenia maszynowego wytrenowane na ogromnych zbiorach danych o zachowaniu użytkowników w dużej mierze zastąpiły ręcznie tworzone formuły rankingowe. RankBrain, wprowadzony w 2015 roku, wykorzystuje sieci neuronowe do interpretacji niejednoznacznych zapytań i identyfikowania odpowiednich wyników.\n\nZachowanie użytkowników dostarcza kluczowych informacji zwrotnych, których wyszukiwarki używają do poprawy rankingów. Współczynnik klikalności wskazuje, które wyniki użytkownicy uważają za obiecujące. Czas spędzony na stronach po kliknięciu sugeruje, czy wyniki spełniły zapytanie. Wzorzec powrotu do wyników wyszukiwania i klikania różnych linków, zwany pogo-stickingiem, wskazuje, że początkowe wyniki były niepomocne. Wyszukiwarki analizują miliardy takich sygnałów dziennie, aby udoskonalać swoje algorytmy.\n\nGrafy wiedzy reprezentują informacje o jednostkach i ich relacjach w ustrukturyzowanych bazach danych. Graf Wiedzy Google, wprowadzony w maju 2012 roku, zawiera miliardy faktów o ludziach, miejscach, rzeczach i koncepcjach. Kiedy szukasz sławnej osoby, panel wiedzy pojawiający się obok wyników czerpie z tych ustrukturyzowanych danych. Wikidata, wspólnotowa baza wiedzy obsługiwana przez Wikimedia Foundation, w znaczący sposób przyczynia się do rozwoju tych systemów.\n\nPolecane fragmenty (featured snippets) i bezpośrednie odpowiedzi mają na celu zaspokojenie zapytań bez konieczności klikania przez użytkowników stron internetowych. Google wyodrębnia odpowiednie fragmenty ze stron internetowych i wyświetla je w widocznym miejscu dla pytań. Asystenci głosowi w dużym stopniu polegają na tych bezpośrednich odpowiedziach, ponieważ użytkownicy nie mogą klikać linków na urządzeniach tylko audio. Wydawcy spierają się, czy polecane fragmenty pomagają, generując ruch, czy szkodzą, redukując go, przy czym niektórzy rezygnują całkowicie z selekcji fragmentów.\n\nWyszukiwanie lokalne łączy zapytania z pobliskimi firmami i usługami. Kiedy ktoś szuka kawiarni lub hydraulików, wyszukiwarka uwzględnia ich lokalizację, aby pokazać odpowiednie lokalne opcje. Profile Google Moja Firma pozwalają firmom dostarczać informacje bezpośrednio. Recenzje zgromadzone z różnych źródeł pomagają użytkownikom wybierać spośród opcji. Wyszukiwanie lokalne generuje znaczne przychody dzięki reklamom, a firmy płacą za widoczne wyświetlanie się przy zapytaniach komercyjnych.\n\nReklama w wyszukiwarkach przekształciła Google w jedną z najcenniejszych firm na świecie. Reklamodawcy licytują słowa kluczowe, płacąc tylko wtedy, gdy użytkownicy klikną ich reklamy. System aukcyjny Google bierze pod uwagę zarówno kwoty ofert, jak i jakość reklam, aby ustalić, które reklamy się pojawią i w jakiej kolejności. Reklama w wyszukiwarkach wygenerowała ponad 162 miliardy dolarów przychodów dla spółki macierzystej Google, Alphabet, w 2022 roku. Ten model biznesowy stwarza zachęty do maksymalizacji zaangażowania użytkowników w wyniki wyszukiwania.\n\nSpam i manipulacje nękają wyszukiwarki od ich najwcześniejszych dni. Pozbawieni skrupułów operatorzy witryn internetowych upychają strony ukrytymi słowami kluczowymi, tworzą sieci sztucznych linków i stosują niezliczone inne taktyki, aby manipulować rankingami. Wyszukiwarki prowadzą ciągły wyścig zbrojeń przeciwko takim manipulacjom. Aktualizacja Google Penguin w kwietniu 2012 roku ukarała witryny z nienaturalnymi wzorcami linków. Firma zatrudnia tysiące oceniających jakość, którzy oceniają wyniki wyszukiwania zgodnie ze szczegółowymi wytycznymi.\n\nObawy o prywatność dotyczą ogromnych ilości danych, które wyszukiwarki gromadzą na temat zapytań i zachowań użytkowników. Historie wyszukiwania ujawniają problemy zdrowotne, sytuacje finansowe, problemy w związkach i niezliczone inne intymne szczegóły. Google domyślnie przechowuje dane wyszukiwania powiązane z kontami, wykorzystując je do personalizacji i targetowania reklam. Alternatywy, takie jak DuckDuckGo, wyróżniają się obietnicą, że nie będą śledzić użytkowników, choć poświęcają pewne możliwości personalizacji.\n\nKonkurencja w wyszukiwaniu pozostaje ograniczona pomimo kontroli regulacyjnej na całym świecie. Google posiada około 91 procent globalnego udziału w rynku wyszukiwania według danych StatCounter z 2023 roku. Bing, wyszukiwarka Microsoftu, twierdzi, że ma około 3 procent na całym świecie, ale radzi sobie lepiej w Stanach Zjednoczonych. Regionalne alternatywy, w tym Baidu w Chinach i Yandex w Rosji, dominują na swoich rodzimych rynkach. Unia Europejska ukarała Google grzywną w wysokości 2,42 miliarda euro w czerwcu 2017 roku za faworyzowanie własnej usługi porównywania zakupów w wynikach wyszukiwania.\n\nSztuczna inteligencja przekształca wyszukiwanie za pomocą dużych modeli językowych, które rozumieją i generują język naturalny. Premiera ChatGPT w listopadzie 2022 roku wywołała obawy, że konwersacyjna sztuczna inteligencja może zakłócić tradycyjne wyszukiwanie. Microsoft zintegrował GPT-4 z Bingiem w lutym 2023 roku. Google odpowiedział Bardem, a następnie Gemini. Systemy te mogą syntezować informacje z wielu źródeł i angażować się w dialog, potencjalnie zmieniając sposób, w jaki ludzie znajdują informacje online.\n\nPrzyszłość wyszukiwania wykracza poza zapytania tekstowe do obrazów, głosu i multimodalnych danych wejściowych. Google Lens umożliwia wyszukiwanie za pomocą kamer smartfonów, identyfikowanie obiektów, tłumaczenie tekstu i rozwiązywanie problemów matematycznych z obrazów. Wyszukiwanie głosowe za pośrednictwem inteligentnych głośników i smartfonów stanowi rosnący udział zapytań. Wyszukiwarki muszą dostosowywać się do nowych urządzeń i wzorców interakcji, zachowując jednocześnie szybkość i dokładność, jakiej oczekują użytkownicy.",
    "wordCount": 1325,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Kto stworzył pierwszego robota internetowego o nazwie World Wide Web Wanderer w 1993 roku?",
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
        "question": "Jakie czynniki biorą pod uwagę wyszukiwarki podczas rankingu stron? Zaznacz wszystkie poprawne odpowiedzi.",
        "options": [
          "Analiza linków PageRank",
          "Świeżość treści",
          "Szybkość ładowania strony",
          "Tylko rozmiar pliku"
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
        "question": "AltaVista przetwarzała 80 milionów zapytań wyszukiwania dziennie w szczytowym okresie w 1997 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Jaki procent udziału w globalnym rynku wyszukiwarek ma Google według danych z 2023 roku?",
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
        "question": "Kiedy wprowadzono Graf Wiedzy Google (Knowledge Graph)?",
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
        "question": "Kiedy aktualizacja Google Penguin zaczęła karać strony z nienaturalnymi wzorcami linków?",
        "options": [
          "Kwiecień 2010",
          "Kwiecień 2012",
          "Kwiecień 2014",
          "Kwiecień 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Ile przychodów wygenerowała reklama w wyszukiwarkach dla Alphabet w 2022 roku (w miliardach dolarów)?",
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
        "question": "Google poprawia w przybliżeniu 10 procent wszystkich zapytań wyszukiwania pod kątem błędów ortograficznych.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Kiedy Microsoft zintegrował GPT-4 z Bingiem?",
        "options": [
          "Listopad 2022",
          "Luty 2023",
          "Czerwiec 2023",
          "Październik 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Jaką karę nałożyła Unia Europejska na Google w czerwcu 2017 roku (w miliardach euro)?",
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
        "question": "Kiedy Google wprowadził RankBrain?",
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
        "question": "Kiedy uruchomiono AltaVistę?",
        "options": [
          "Grudzień 1993",
          "Grudzień 1995",
          "Grudzień 1997",
          "Grudzień 1999"
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
    "title": "Pojazdy Autonomiczne i Przyszłość Transportu",
    "content": "Pojazdy autonomiczne obiecują zrewolucjonizować transport dzięki technologii samojezdnej, która mogłaby zmniejszyć liczbę wypadków, przekształcić krajobrazy miejskie i zasadniczo zmienić sposób, w jaki ludzkość przemieszcza ludzi i towary na małe i duże odległości. Ta ambitna wizja przyciągnęła setki miliardów dolarów inwestycji od producentów samochodów, gigantów technologicznych i startupów ścigających się, aby rozwiązać ogromne wyzwania techniczne, regulacyjne i społeczne. Podróż w kierunku prawdziwie autonomicznych pojazdów ujawnia obecny stan tej transformacyjnej technologii i przeszkody, które pozostają, zanim samochody samojezdne staną się powszechne.\n\nMarzenie o pojazdach samojezdnych wyprzedza samo powstanie komputera cyfrowego. Norman Bel Geddes zaprezentował wystawę Futurama na Wystawie Światowej w Nowym Jorku w 1939 roku, przedstawiając zautomatyzowane autostrady, po których samochody poruszałyby się bezpiecznie bez interwencji człowieka do lat 60. XX wieku. General Motors, który sponsorował wystawę, później nawiązał współpracę z RCA w celu opracowania samochodu koncepcyjnego Firebird IV w 1964 roku, wyposażonego w elektroniczne systemy naprowadzania, które mogłyby podążać za przewodem osadzonym w jezdni. Te wczesne wizje wymagały zmian w infrastrukturze, a nie inteligencji pojazdu.\n\nNowoczesny rozwój pojazdów autonomicznych rozpoczął się od konkursów DARPA Grand Challenge, które zapoczątkowały badania akademickie i przemysłowe w 2004 roku. Pierwsze wyzwanie, które odbyło się na pustyni Mojave, oferowało milion dolarów każdemu pojazdowi, który mógłby pokonać trasę o długości 241 kilometrów bez interwencji człowieka. Każdy uczestnik zawiódł, a pojazd, który zajechał najdalej, przejechał tylko 12 kilometrów, zanim utknął. W wyzwaniu w 2005 roku pięć pojazdów ukończyło trasę, a Stanley ze Stanford University wygrał w 6 godzin i 53 minuty.\n\nSociety of Automotive Engineers definiuje sześć poziomów automatyzacji jazdy, które stały się standardem branżowym. Poziom 0 oznacza brak automatyzacji, a ludzie kontrolują wszystkie czynności związane z prowadzeniem pojazdu. Poziom 1 obejmuje podstawową pomoc, taką jak adaptacyjny tempomat. Poziom 2 łączy wiele funkcji wspomagających, ale wymaga stałego nadzoru człowieka. Poziom 3 umożliwia pojazdowi obsługę wszystkich funkcji jazdy w ograniczonych warunkach, podczas gdy ludzie pozostają gotowi do interwencji. Poziom 4 osiąga pełną automatyzację w zdefiniowanych obszarach operacyjnych. Poziom 5 oznacza pełną automatyzację we wszystkich warunkach, dorównującą lub przewyższającą możliwości człowieka wszędzie.\n\nSystemy czujników zapewniają pojazdom autonomicznym zdolności percepcyjne niezbędne do bezpiecznej nawigacji. Kamery rejestrują informacje wizualne o pasach ruchu, znakach, sygnalizacji świetlnej i innych użytkownikach dróg. Radar mierzy prędkość i odległość pobliskich obiektów za pomocą fal radiowych, które działają niezależnie od oświetlenia i pogody. Lidar wykorzystuje impulsy laserowe do tworzenia szczegółowych trójwymiarowych map otoczenia, a niektóre systemy generują ponad dwa miliony punktów danych na sekundę. Czujniki ultradźwiękowe wykrywają przeszkody z bliskiej odległości podczas manewrów parkowania.\n\nWaymo, autonomiczna filia Alphabetu, wyłoniła się z projektu Google dotyczącego samochodów samojezdnych, który rozpoczął się w 2009 roku. Sebastian Thrun, który kierował zwycięską drużyną Stanford w konkursie DARPA, kierował początkowymi badaniami. Projekt zgromadził miliony mil testowych w wielu stanach, zanim Waymo uruchomiło komercyjną usługę robotaksów w Phoenix w Arizonie w grudniu 2018 roku. Do października 2023 roku pojazdy Waymo przejechały ponad 11,2 miliona kilometrów po drogach publicznych bez kierowców bezpieczeństwa, głównie w Phoenix i San Francisco.\n\nTesla przyjęła inne podejście do autonomii poprzez swoje systemy Autopilot i Full Self-Driving. Zamiast drogiego lidaru, Tesla polega na kamerach i wizji komputerowej przeszkolonych na danych z milionów pojazdów klientów. CEO Elon Musk wielokrotnie przewidywał rychłą pełną autonomię, twierdząc w 2016 roku, że Tesla przejedzie sama z Los Angeles do Nowego Jorku do 2017 roku. Ta prognoza i wiele kolejnych nie spełniły się, chociaż pojazdy Tesla oferują coraz bardziej zaawansowane funkcje wspomagania kierowcy.\n\nCruise, w większości należący do General Motors, prowadził usługi robotaksów w San Francisco, dopóki Kalifornijski Departament Pojazdów Samochodowych nie cofnął jego pozwoleń w październiku 2023 roku po incydencie, w którym pojazd uderzył i wciągnął pieszego. Firma rozszerzyła się agresywnie, obsługując setki pojazdów w wielu miastach. Cofnięcie pozwolenia uwypukliło wyzwania regulacyjne stojące przed branżą i trudność w zapewnieniu bezpieczeństwa na dużą skalę.\n\nChińskie firmy stały się głównymi graczami w rozwoju pojazdów autonomicznych. Platforma Apollo firmy Baidu rozpoczęła rozwój w 2017 roku i zgromadziła ponad 100 milionów kilometrów testów drogowych. Pony.ai, założona w 2016 roku, prowadzi usługi robotaksów w wielu chińskich miastach i Kalifornii. WeRide nawiązała współpracę z Nissanem i założyła oddziały na Bliskim Wschodzie. Chińskie miasta, w tym Wuhan, Guangzhou i Shenzhen, zezwoliły na komercyjną działalność robotaksów obejmującą znaczne obszary miejskie.\n\nSystemy sztucznej inteligencji napędzające pojazdy autonomiczne muszą radzić sobie z niezwykłą złożonością. Algorytmy wizji komputerowej identyfikują i klasyfikują tysiące rodzajów obiektów, od pieszych i rowerzystów po strefy budowy i pojazdy uprzywilejowane. Modele predykcyjne przewidują, jak zachowają się inni użytkownicy dróg w ciągu najbliższych kilku sekund. Algorytmy planowania wybierają trajektorie, które docierają do celu bezpiecznie i wydajnie. Wszystkie te obliczenia muszą być wykonywane w milisekundach, z uwzględnieniem niepewności i rzadkich scenariuszy.\n\nSytuacje brzegowe stanowią szczególne wyzwania dla systemów autonomicznych. Plastikowa torba, która przelatuje przez autostradę, i dziecko wbiegające na ulicę mogą wyglądać podobnie dla czujników, ale wymagają zupełnie innych reakcji. Pracownicy budowlani kierujący ruchem za pomocą gestów ręcznych unieważniają normalne przepisy ruchu drogowego. Pojazdy uprzywilejowane zbliżające się z ukrytych kątów wymagają natychmiastowej interwencji. Dane szkoleniowe nie mogą obejmować każdego scenariusza, co wymaga od pojazdów odpowiedniego uogólniania z podobnych doświadczeń.\n\nWalidacja bezpieczeństwa stawia fundamentalne pytania o to, jak wykazać, że pojazdy autonomiczne są gotowe do wdrożenia. Ludzcy kierowcy powodują średnio jeden śmiertelny wypadek na 160 milionów kilometrów przejechanych w Stanach Zjednoczonych. Statystyczne udowodnienie, że system autonomiczny spełnia lub przekracza ten punkt odniesienia, wymagałoby miliardów kilometrów testowych, co jest nierealnym standardem. Zamiast tego firmy wykorzystują symulacje, testy na zamkniętych torach i stopniowe wdrażanie, jednocześnie monitorując wydajność w świecie rzeczywistym w sposób ciągły.\n\nRamy regulacyjne dla pojazdów autonomicznych różnią się znacznie w poszczególnych jurysdykcjach. Kalifornia wymaga od firm zgłaszania rozłączeń, gdy ludzcy kierowcy bezpieczeństwa przejmują kontrolę. Arizona przyjęła liberalne podejście, które przyciągnęło działalność testową. Niemcy uchwaliły ustawę w 2021 roku zezwalającą na pojazdy poziomu 4 na drogach publicznych w określonych warunkach. Chiny wyznaczyły niektóre miasta jako strefy testowe ze stopniowo rozszerzającymi się obszarami operacyjnymi. Ta mozaika przepisów utrudnia międzynarodowe strategie wdrażania.\n\nPotencjalne korzyści z pojazdów autonomicznych wykraczają daleko poza wygodę. W wypadkach drogowych ginie około 1,35 miliona osób rocznie na całym świecie, a błąd ludzki przyczynia się do ponad 90 procent wypadków. Systemy autonomiczne nie rozpraszają się, nie męczą się ani nie ulegają upośledzeniu. Mogłyby radykalnie zmniejszyć tę liczbę, jeśli ich wyniki w zakresie bezpieczeństwa przekroczyłyby wyniki ludzkich kierowców. Transport stałby się dostępny dla osób starszych, niepełnosprawnych i młodych, które obecnie nie są w stanie samodzielnie prowadzić pojazdów.\n\nImplikacje ekonomiczne autonomicznego transportu mogłyby przekształcić całe branże. Kierowcy zawodowi, w tym kierowcy ciężarówek, taksówkarze i pracownicy dostarczający, stoją w obliczu potencjalnych przesunięć. Firmy oferujące przejazdy, takie jak Uber i Lyft, inwestują duże pieniądze w autonomię, mając nadzieję na wyeliminowanie swojego największego kosztu. Modele ubezpieczeń muszą się dostosować, gdy ludzcy kierowcy nie będą już kontrolować pojazdów. Urbanizatorzy wyobrażają sobie miasta z mniejszą liczbą parkingów i węższymi drogami, ponieważ współdzielone pojazdy autonomiczne zmniejszają całkowitą liczbę pojazdów.\n\nZastosowania w transporcie ciężarowym mogą osiągnąć rentowność komercyjną przed robotaksami pasażerskimi ze względu na bardziej przewidywalne środowisko autostradowe. Aurora, współzałożona przez byłych liderów programów autonomicznych Google, Tesli i Ubera, koncentruje się przede wszystkim na transporcie towarowym. TuSimple przeprowadził w pełni autonomiczne przejazdy autostradowe między Phoenix a Dallas, zanim trudności finansowe wymusiły strategiczną restrukturyzację w 2023 roku. Embark, Kodiak i wiele innych firm dążą do podobnych zastosowań w transporcie ciężarowym dalekobieżnym.\n\nHarmonogram powszechnego przyjęcia pojazdów autonomicznych pozostaje wysoce niepewny pomimo dziesięcioleci rozwoju i ogromnych inwestycji. Optymistyczne prognozy z połowy lat 2010 przewidywały wszechobecne robotaksówki na początku lat 20. XXI wieku. Rzeczywistość okazała się znacznie bardziej wymagająca, niż przewidywano. Eksperci branżowi ogólnie oczekują stopniowego wdrażania w ciągu dziesięcioleci, a nie nagłej transformacji. Technologia prawdopodobnie będzie się poprawiać stopniowo, rozszerzając się z ograniczonych obszarów operacyjnych w kierunku szerszych możliwości na przestrzeni wielu lat.",
    "wordCount": 1254,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Kiedy odbył się pierwszy konkurs DARPA Grand Challenge?",
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
        "question": "Jakich typów czujników używają pojazdy autonomiczne? Wybierz wszystkie poprawne odpowiedzi.",
        "options": [
          "Kamery",
          "Radar",
          "Lidar",
          "Czujniki rentgenowskie"
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
        "question": "Pojazd Stanford University o nazwie Stanley wygrał konkurs DARPA Grand Challenge w 2005 roku.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Ile milionów mil pojazdy Waymo przejechały bez kierowców bezpieczeństwa do października 2023 roku?",
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
        "question": "Kiedy Waymo uruchomiło komercyjną usługę robotaxi w Phoenix?",
        "options": [
          "Grudzień 2016",
          "Grudzień 2018",
          "Grudzień 2020",
          "Grudzień 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Ile poziomów automatyzacji jazdy definiuje Stowarzyszenie Inżynierów Motoryzacji (SAE)?",
        "options": [
          "Cztery",
          "Pięć",
          "Sześć",
          "Siedem"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Ile osób rocznie ginie w wypadkach samochodowych na całym świecie (w milionach)?",
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
        "question": "Błąd ludzki przyczynia się do ponad 90 procent wypadków samochodowych.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Kiedy Niemcy uchwaliły ustawę dopuszczającą pojazdy poziomu 4 na drogach publicznych?",
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
        "question": "Ile mil przejechał najdalszy pojazd w konkursie DARPA Grand Challenge w 2004 roku?",
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
        "question": "Kiedy rozpoczęto rozwój platformy autonomicznej jazdy Apollo firmy Baidu?",
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
        "question": "Kiedy odbyła się wystawa Futurama na Wystawie Światowej?",
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
        "question": "Ile punktów danych na sekundę mogą generować niektóre systemy lidarowe (w milionach)?",
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
        "question": "Kiedy Kalifornijski DMV (Department of Motor Vehicles) cofnął firmie Cruise zezwolenia na pojazdy autonomiczne?",
        "options": [
          "Październik 2022",
          "Październik 2023",
          "Styczeń 2023",
          "Czerwiec 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
