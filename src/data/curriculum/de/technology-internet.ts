import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "How the Internet Works",
    "difficulty": "beginner",
    "wordCount": 500,
    "articleType": "practice",
    "orderIndex": 1,
    "content": "The internet connects billions of devices worldwide through an intricate network of networks that spans every continent on Earth. Every time you visit a website, send an email, or stream a video, data travels across this vast digital infrastructure in mere milliseconds. Understanding this remarkable system helps us appreciate the technology that has transformed modern communication.\n\nWhen you type a website address into your browser, a complex process begins instantly. Your computer first contacts a Domain Name System server, which translates the human-readable address into a numerical IP address that computers understand. This works similar to looking up a phone number in a directory, matching names to actual contact information.\n\nYour request then travels through your Internet Service Provider to backbone networks that form the internet's main infrastructure. These high-capacity fiber optic cables span continents and cross oceans at depths exceeding 20,000 feet. They carry enormous amounts of data at nearly the speed of light, handling over 500 trillion bytes of information daily.\n\nData does not travel as a single unit across the internet. Instead, it breaks into small packets, each containing part of the information plus addressing details. These packets may take different routes to reach their destination, finding paths around congestion or failures. At the destination, they reassemble in the correct order to recreate the original message.\n\nRouters serve as the traffic controllers of the internet, making critical decisions every moment. These specialized devices examine each packet's destination and determine the best path forward. They make these routing decisions billions of times per second, keeping data flowing smoothly across networks owned by thousands of different organizations.\n\nThe internet began as ARPANET in 1969, a United States military research project designed to survive communication disruptions during potential attacks. Vint Cerf and Bob Kahn developed the TCP/IP protocols in the 1970s, creating the technical foundation that still underlies the internet today. Their decentralized design ensures no single point of failure can bring down the entire network.\n\nTim Berners-Lee invented the World Wide Web in 1989 while working at CERN in Switzerland. He created the system of hyperlinks and web browsers that made the internet accessible to everyone. The web became publicly available in August 1991, and within a decade the internet had transformed from a research tool into a global communication platform used by hundreds of millions of people.",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Wer hat das World Wide Web erfunden?",
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
        "question": "Wer hat die TCP/IP-Protokolle entwickelt? Wähle alle zutreffenden Antworten aus.",
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
        "question": "Daten werden im Internet als einzelne, vollständige Dateien übertragen, anstatt in Pakete aufgeteilt zu werden.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "In welchem Jahr wurde ARPANET, der Vorgänger des Internets, gegründet?",
        "correctValue": 1969,
        "tolerance": 0,
        "min": 1950,
        "max": 2000,
        "step": 1,
        "unit": "year"
      }
    ]
  },
  {
    "id": "technology-internet-c1",
    "topicId": "technology-internet",
    "title": "The Rise of Artificial Intelligence",
    "difficulty": "intermediate",
    "wordCount": 1000,
    "articleType": "certification",
    "orderIndex": 1,
    "certificationLength": "short",
    "content": "Artificial intelligence has evolved from science fiction fantasy to practical technology that affects nearly every aspect of modern life. From smartphone assistants to medical diagnosis systems, AI now performs tasks that once required human intelligence. This transformation represents one of the most significant technological shifts since the invention of computing itself.\n\nThe concept of artificial intelligence emerged at a workshop held at Dartmouth College in New Hampshire during the summer of 1956. Computer scientist John McCarthy coined the term and gathered researchers who believed machines could be made to simulate human intelligence. These pioneers imagined creating thinking machines within a single generation, though progress proved far slower than their optimistic predictions.\n\nEarly AI research focused on symbolic reasoning, programming computers with explicit rules about how to solve problems. Researchers created expert systems that encoded human knowledge into decision trees and logical rules. These systems achieved impressive results in narrow domains like chess and medical diagnosis, but struggled with tasks requiring common sense or handling ambiguous information.\n\nThe machine learning revolution began transforming AI in the 1990s and accelerated dramatically after 2010. Instead of programming explicit rules, researchers trained algorithms to discover patterns in large datasets. Neural networks, loosely inspired by biological brain structures, proved especially powerful at recognizing images, understanding speech, and generating human-like text.\n\nDeep learning emerged as the dominant approach to AI after a breakthrough in 2012. Geoffrey Hinton and his students at the University of Toronto demonstrated that deep neural networks with many layers could dramatically outperform previous methods on image recognition tasks. Their system reduced error rates by more than 40 percent compared to the previous best approaches.\n\nTraining modern AI systems requires enormous computational resources and vast amounts of data. Large language models may contain hundreds of billions of parameters and require thousands of specialized processors working for months. Tech companies like Google, Microsoft, and OpenAI have invested billions of dollars building the infrastructure necessary to train these increasingly capable systems.\n\nThe capabilities of AI systems have expanded remarkably in recent years. Computer vision systems can now identify objects, faces, and activities in images with superhuman accuracy. Natural language processing has advanced to the point where AI can engage in nuanced conversations, write coherent essays, and translate between dozens of languages. AI systems now compose music, generate artwork, and write computer code.\n\nAI already powers many services people use daily without conscious awareness. Recommendation algorithms suggest videos on YouTube and products on Amazon based on learned preferences. Email filters use machine learning to separate important messages from spam. Navigation apps predict traffic patterns and suggest optimal routes. Voice assistants like Siri and Alexa use AI to understand spoken commands.\n\nHealthcare represents one of the most promising applications for artificial intelligence. AI systems can analyze medical images to detect cancer earlier than human radiologists in some cases. Drug discovery uses machine learning to identify promising compounds and predict their effects. AI assistants help doctors stay current with rapidly expanding medical literature and suggest evidence-based treatment options.\n\nConcerns about AI safety and societal impact have grown alongside its capabilities. Researchers worry about systems that pursue goals in unexpected or harmful ways. Ethicists raise questions about bias in AI systems trained on historical data that reflects human prejudices. Economists debate how automation will affect employment as AI takes over tasks previously performed by human workers.\n\nGovernments worldwide have begun developing regulations for artificial intelligence. The European Union passed comprehensive AI legislation in 2024 that categorizes systems by risk level and imposes requirements on high-risk applications. China has implemented rules governing recommendation algorithms and generative AI. The United States has issued executive orders addressing AI safety while debating more comprehensive legislation.\n\nThe future of artificial intelligence remains uncertain but seems likely to bring continued rapid advancement. Researchers pursue artificial general intelligence that could match human capability across all cognitive tasks, though estimates of when this might occur range from years to never. What seems certain is that AI will continue reshaping industries, creating new possibilities, and raising profound questions about the relationship between human and machine intelligence.\n\nUnderstanding artificial intelligence has become essential knowledge for navigating the modern world. Whether as users, workers, citizens, or policymakers, people increasingly need to comprehend what AI can and cannot do. This technology will continue evolving, and informed engagement with its development will help ensure AI benefits humanity broadly.",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Wo und wann entstand der Begriff \"Künstliche Intelligenz\"?",
        "options": [
          "MIT im Jahr 1960",
          "Dartmouth College im Jahr 1956",
          "Stanford University im Jahr 1965",
          "Bell Labs im Jahr 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Welche KI-Anwendungen im Gesundheitswesen werden im Artikel erwähnt? Wählen Sie alle zutreffenden aus.",
        "options": [
          "Analyse medizinischer Bilder zur Erkennung von Krebs",
          "Durchführung robotergestützter Operationen",
          "Wirkstoffforschung",
          "Vorschlagen von Behandlungsoptionen"
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
        "question": "Die frühe KI-Forschung konzentrierte sich hauptsächlich auf maschinelles Lernen und weniger auf symbolisches Denken.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "In welchem Jahr demonstrierten Geoffrey Hinton und seine Studenten einen Durchbruch im Deep Learning?",
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
        "question": "Wer prägte den Begriff \"Künstliche Intelligenz\"?",
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
        "question": "Um wie viel Prozent reduzierten tiefe neuronale Netze die Fehlerraten im Vergleich zu früheren Methoden im Jahr 2012?",
        "options": [
          "Mehr als 20 Prozent",
          "Mehr als 30 Prozent",
          "Mehr als 40 Prozent",
          "Mehr als 50 Prozent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "In welchem Jahr verabschiedete die Europäische Union eine umfassende KI-Gesetzgebung?",
        "correctValue": 2024,
        "tolerance": 0,
        "min": 2020,
        "max": 2026,
        "step": 1,
        "unit": "year"
      }
    ]
  },
  {
    "id": "technology-internet-p02",
    "topicId": "technology-internet",
    "title": "Cybersecurity: Protecting the Digital World",
    "difficulty": "beginner",
    "wordCount": 750,
    "articleType": "practice",
    "orderIndex": 2,
    "content": "Cybersecurity protects computers, networks, and data from digital attacks that threaten billions of people daily. Hackers target everything from personal bank accounts to critical infrastructure like power grids and hospitals. The field has grown from a niche specialty into one of the most important disciplines in modern technology.\n\nThe first major computer virus, called Brain, appeared in Pakistan in January 1986. Two brothers named Basit and Amjad Farooq Alvi created it to track illegal copies of their medical software. The virus spread slowly through infected floppy disks, taking months to reach computers worldwide. Today, malware spreads across the internet in seconds, infecting millions of devices before security experts can respond.\n\nPhishing attacks remain the most common method criminals use to steal sensitive information. These deceptive emails pretend to come from trusted sources like banks, employers, or popular websites. They trick recipients into clicking malicious links or entering passwords on fake websites. The FBI reported that phishing attacks caused over 10 billion dollars in losses during 2022 alone.\n\nRansomware represents one of the most destructive types of modern cyberattacks. This malicious software encrypts a victim's files and demands payment for the decryption key. The WannaCry attack in May 2017 infected more than 200,000 computers across 150 countries in just four days. Hospitals in the United Kingdom had to cancel thousands of medical appointments and divert ambulances to unaffected facilities.\n\nStrong passwords form the foundation of personal cybersecurity. Security experts recommend using at least 12 characters combining uppercase letters, lowercase letters, numbers, and symbols. Each account should have a unique password to prevent a single breach from compromising multiple services. Password managers help users generate and store complex passwords without memorizing them.\n\nTwo-factor authentication adds a crucial second layer of security beyond passwords. This system requires something you know, like a password, plus something you have, like a phone that receives verification codes. Even if hackers steal your password, they cannot access your account without the second factor. Google reported that two-factor authentication blocks 99.9 percent of automated attacks on accounts.\n\nEncryption scrambles data into unreadable code that only authorized parties can decrypt. When you see a padlock icon in your browser's address bar, encryption protects your connection to that website. End-to-end encryption in messaging apps ensures that only you and your recipient can read your messages. Even the company providing the service cannot access the encrypted content.\n\nGovernments and corporations invest billions in cybersecurity defense. The United States Cybersecurity and Infrastructure Security Agency, known as CISA, protects federal networks and helps private companies defend against attacks. Large technology companies employ thousands of security researchers who hunt for vulnerabilities and develop protective measures.\n\nEthical hackers play a vital role in improving security by finding weaknesses before criminals do. Companies pay bounties ranging from hundreds to millions of dollars for reports of serious vulnerabilities. Apple launched its bug bounty program in 2016 and now offers up to 2 million dollars for the most critical iPhone security flaws. These programs turn potential attackers into defenders who strengthen digital infrastructure.\n\nThe future of cybersecurity faces new challenges from emerging technologies. Quantum computers may eventually break the encryption that currently protects banking, communications, and government secrets. Security researchers are already developing quantum-resistant algorithms to prepare for this threat. Artificial intelligence creates both new attack methods and new defensive capabilities in an ongoing technological arms race.",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Wie hieß der erste größere Computervirus?",
        "options": [
          "WannaCry",
          "Brain",
          "Trojaner",
          "Phishing"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p02-q2",
        "type": "single_choice",
        "question": "Wie viel Prozent der automatisierten Angriffe blockiert die Zwei-Faktor-Authentifizierung laut Google?",
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
        "question": "Welche Praktiken werden für eine starke Passwortsicherheit empfohlen? Wähle alle zutreffenden aus.",
        "options": [
          "Mindestens 12 Zeichen verwenden",
          "Das gleiche Passwort für alle Konten verwenden",
          "Groß- und Kleinbuchstaben, Zahlen und Symbole kombinieren",
          "Einen Passwort-Manager verwenden"
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
        "question": "Der WannaCry-Ransomware-Angriff infizierte Computer in über 150 Ländern.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Wie viel Geld verursachten Phishing-Angriffe im Jahr 2022 an Verlusten (in Milliarden Dollar)?",
        "correctValue": 10,
        "tolerance": 1,
        "min": 5,
        "max": 20,
        "step": 1,
        "unit": "billion dollars"
      }
    ]
  },
  {
    "id": "technology-internet-c2",
    "topicId": "technology-internet",
    "title": "The Internet of Things: Connected World",
    "difficulty": "intermediate",
    "wordCount": 2000,
    "articleType": "certification",
    "orderIndex": 2,
    "certificationLength": "medium",
    "content": "The Internet of Things has woven digital intelligence into the fabric of everyday life, connecting billions of devices that sense, communicate, and act without human intervention. From smart thermostats that learn your preferences to industrial sensors monitoring equipment across continents, this technological revolution extends the internet beyond computers and phones into the physical world. Understanding this interconnected ecosystem reveals both remarkable possibilities and significant challenges that will shape the coming decades.\n\nKevin Ashton, a British technology pioneer working at Procter and Gamble, coined the term Internet of Things in 1999 while developing radio-frequency identification systems to track products through supply chains. He envisioned computers gathering information about the physical world independently rather than relying on humans to input data. This vision took decades to materialize as sensors became cheaper, wireless connectivity improved, and cloud computing provided the infrastructure to process vast data streams.\n\nThe number of connected devices has grown exponentially since commercial IoT adoption began around 2010. Analysts at Statista estimated 15.1 billion IoT devices worldwide in 2020, projected to reach 29 billion by 2030. Each device generates data continuously, creating information flows that dwarf traditional internet traffic. A single connected factory might produce terabytes of sensor data daily from thousands of monitoring points.\n\nSmart home technology represents the most visible consumer application of IoT principles. The Nest Learning Thermostat, introduced by former Apple engineer Tony Fadell in October 2011, pioneered mainstream smart home adoption. The device observed when residents were home and their temperature preferences, then automatically adjusted heating and cooling to save energy. Google acquired Nest Labs for 3.2 billion dollars in January 2014, signaling major technology companies' commitment to this market.\n\nVoice assistants have become central hubs for smart home ecosystems. Amazon released the Echo speaker featuring Alexa in November 2014, followed by Google Home in 2016 and Apple's HomePod in 2018. These devices respond to voice commands to control lights, locks, thermostats, and entertainment systems. By 2024, over 200 million households worldwide owned smart speakers, using them for tasks ranging from setting timers to ordering groceries.\n\nWearable devices track health metrics with increasing sophistication and accuracy. The Apple Watch, released in April 2015, evolved from a fashion accessory into a medical device capable of detecting irregular heart rhythms and falls. A study published in the New England Journal of Medicine in November 2019 found that the watch identified atrial fibrillation, a serious heart condition, with 84 percent accuracy. Continuous glucose monitors allow diabetics to track blood sugar without finger pricks, transmitting data to smartphones and alerting users to dangerous levels.\n\nIndustrial IoT, sometimes called Industry 4.0, transforms manufacturing with unprecedented visibility and control. Sensors embedded in machinery detect vibrations, temperatures, and energy consumption that indicate impending failures before breakdowns occur. General Electric pioneered predictive maintenance through its Predix platform, claiming to save customers billions in avoided downtime. A single jet engine generates 10 terabytes of data during a transatlantic flight, analyzed continuously to optimize performance and schedule maintenance.\n\nAgriculture embraces IoT to increase yields while reducing environmental impact. Soil moisture sensors trigger irrigation only when plants need water, reducing consumption by up to 30 percent compared to scheduled watering. Drones equipped with multispectral cameras identify crop stress, pest infestations, and nutrient deficiencies across vast fields. John Deere, the 185-year-old agricultural equipment company, now collects data from millions of connected machines and sells analytics services to farmers alongside tractors.\n\nSmart cities deploy IoT infrastructure to manage urban systems more efficiently. Barcelona implemented one of the most comprehensive smart city programs starting in 2012, installing sensors throughout the city to monitor parking availability, waste bin levels, air quality, and irrigation needs. The city claims annual savings of 75 million dollars while improving services for residents. Singapore, Copenhagen, and Seoul have undertaken similar initiatives, using connected sensors to optimize traffic flow, energy consumption, and emergency response.\n\nHealthcare applications extend far beyond wearables into remote patient monitoring and clinical settings. Patients recovering from surgery or managing chronic conditions can be monitored at home with connected devices that alert care teams to concerning changes. Hospitals track the location and status of critical equipment in real time. Clinical trials use IoT devices to collect more accurate data about participant health between visits. The COVID-19 pandemic accelerated adoption of remote monitoring technologies that had previously faced slow acceptance.\n\nSecurity concerns surrounding IoT devices have proven disturbingly valid. Many manufacturers prioritize features and low prices over robust security, shipping devices with default passwords and unpatched vulnerabilities. The Mirai botnet attack in October 2016 hijacked hundreds of thousands of unsecured webcams and DVRs to launch distributed denial-of-service attacks that disrupted major websites including Twitter, Netflix, and PayPal. Researchers regularly demonstrate alarming vulnerabilities in baby monitors, cars, medical devices, and industrial systems.\n\nPrivacy implications of pervasive sensing raise profound questions about surveillance and data ownership. Voice assistants record conversations in homes. Fitness trackers reveal intimate details about health and daily routines. Connected cars transmit location data that reveals where drivers go and how they drive. Companies collect this information for service improvement and targeted advertising, while governments increasingly seek access for law enforcement and national security purposes.\n\nInteroperability challenges fragment the IoT landscape into incompatible ecosystems. Devices from different manufacturers often cannot communicate directly, requiring consumers to choose platforms and limiting functionality. The Matter protocol, launched in November 2022 by a consortium including Apple, Google, Amazon, and Samsung, aims to create a universal standard for smart home devices. This initiative represents the industry's recognition that fragmentation impedes adoption and innovation.\n\nEdge computing addresses the latency and bandwidth limitations of sending all IoT data to distant cloud servers. Processing information locally on or near devices enables real-time responses for applications like autonomous vehicles and industrial robotics. A self-driving car cannot wait for data to travel to a cloud server and back before deciding to brake. Edge architectures distribute intelligence throughout networks rather than concentrating it in centralized data centers.\n\nEnergy constraints shape IoT device design and deployment. Battery-powered sensors must operate for years without replacement in locations that may be inaccessible or dangerous. Low-power wide-area network technologies like LoRaWAN and Sigfox enable devices to communicate over kilometers while consuming minimal energy. Energy harvesting from solar, thermal, or kinetic sources allows some devices to operate indefinitely without batteries.\n\nThe environmental footprint of billions of connected devices demands attention as IoT expands. Manufacturing these products consumes resources and energy. Most devices lack provisions for recycling their electronic components. Continuous network connectivity requires energy from both devices and infrastructure. However, IoT applications in energy management, agriculture, and transportation can reduce overall environmental impact when deployed thoughtfully.\n\nThe future of IoT points toward ambient intelligence that anticipates needs and responds automatically to changing conditions. Digital twins create virtual replicas of physical systems for simulation and optimization. Artificial intelligence applied to sensor data enables predictions and automations beyond what explicit programming could achieve. The boundary between physical and digital worlds continues blurring as connected intelligence spreads throughout the environment we inhabit.",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Wer prägte den Begriff \"Internet der Dinge\" im Jahr 1999?",
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
        "question": "Welche Unternehmen haben wichtige Sprachassistenten-Geräte herausgebracht? Wähle alle zutreffenden aus.",
        "options": [
          "Amazon mit Echo",
          "Google mit Google Home",
          "Apple mit HomePod",
          "Microsoft mit Cortana-Lautsprecher"
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
        "question": "Der Mirai-Botnet-Angriff im Oktober 2016 entführte Hunderttausende von ungesicherten Webcams und DVRs.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Wie viel hat Google für die Übernahme von Nest Labs im Januar 2014 bezahlt (in Milliarden Dollar)?",
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
        "question": "Wann wurde die Apple Watch veröffentlicht?",
        "options": [
          "Oktober 2011",
          "Januar 2014",
          "April 2015",
          "November 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Welche Stadt implementierte ab 2012 eines der umfassendsten Smart-City-Programme?",
        "options": [
          "Singapur",
          "Barcelona",
          "Kopenhagen",
          "Seoul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Wie viele IoT-Geräte werden bis 2030 weltweit voraussichtlich existieren (in Milliarden)?",
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
        "question": "Das Matter-Protokoll wurde ins Leben gerufen, um einen universellen Standard für Smart-Home-Geräte zu schaffen.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Mit welcher Genauigkeit identifizierte die Apple Watch Vorhofflimmern laut der Studie des New England Journal of Medicine?",
        "options": [
          "74 Prozent",
          "84 Prozent",
          "94 Prozent",
          "99 Prozent"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Welche IoT-Anwendungen in der Landwirtschaft werden erwähnt? Wähle alle zutreffenden aus.",
        "options": [
          "Bodenfeuchtigkeitssensoren für die Bewässerung",
          "Drohnen mit Multispektralkameras",
          "Vernetzte Traktoren mit Analytik",
          "Robotische Ernte"
        ],
        "correctIndices": [
          0,
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "technology-internet-p03",
    "topicId": "technology-internet",
    "title": "The Evolution of Social Media",
    "difficulty": "beginner",
    "wordCount": 1000,
    "articleType": "practice",
    "orderIndex": 3,
    "content": "Social media has transformed how humans communicate, share information, and build communities in ways that no one predicted when the internet first emerged. Platforms connecting billions of users have reshaped politics, commerce, entertainment, and personal relationships across every continent. The story of social media reveals both remarkable innovation and profound challenges for modern society.\n\nThe earliest social networking sites appeared in the late 1990s as the internet became accessible to ordinary people. SixDegrees launched in 1997, allowing users to create profiles and connect with friends. The site attracted roughly 3.5 million members before shutting down in 2001. Friendster followed in 2002, pioneering features that would become standard across the industry. MySpace dominated from 2005 to 2008, becoming the most visited website in the United States and launching the careers of musicians like Arctic Monkeys.\n\nFacebook emerged from a Harvard University dorm room in February 2004. Mark Zuckerberg and his roommates created the site initially for college students only. The platform opened to everyone aged 13 and older in September 2006. By 2012, Facebook reached one billion monthly active users, a milestone no social network had ever achieved. The company now operates as Meta and reports over 3 billion monthly users across its family of apps including Instagram and WhatsApp.\n\nTwitter introduced a new format for social communication when it launched in July 2006. The platform limited posts to 140 characters, later expanded to 280, forcing users to express thoughts concisely. Twitter became essential for breaking news, political discourse, and celebrity engagement. The service played notable roles during the Arab Spring protests in 2011 and has shaped public conversation on countless issues since.\n\nYouTube revolutionized video sharing after three former PayPal employees founded it in February 2005. The first video, titled \"Me at the zoo,\" showed co-founder Jawed Karim at the San Diego Zoo for just 18 seconds. Google purchased YouTube for 1.65 billion dollars in October 2006. Today, users upload over 500 hours of video content every minute, and the platform reaches more 18-to-49-year-olds than all cable TV networks combined.\n\nInstagram brought photo sharing to mobile devices when Kevin Systrom and Mike Krieger launched it in October 2010. The app gained 25,000 users on its first day and reached one million within two months. Facebook acquired Instagram for one billion dollars in April 2012. The platform introduced Stories in 2016 and Reels in 2020, adapting features popularized by competitors like Snapchat and TikTok.\n\nTikTok became the fastest-growing social platform in history after its international launch in 2017. The Chinese company ByteDance created it by merging with Musical.ly, an app popular among American teenagers. TikTok's algorithm recommends videos based on viewing behavior rather than following relationships, creating a different experience than earlier platforms. The app reached one billion monthly users in September 2021, achieving this milestone faster than any predecessor.\n\nSocial media has created new economic opportunities worth billions of dollars annually. Influencers earn substantial incomes by partnering with brands and promoting products to their followers. The creator economy employed an estimated 50 million people worldwide by 2022. Small businesses use social platforms to reach customers without expensive traditional advertising. Entire industries have emerged around managing social media presence for organizations and individuals.\n\nMental health concerns surrounding social media have sparked intense debate among researchers and policymakers. Studies link heavy social media use to increased rates of anxiety, depression, and loneliness, particularly among teenagers. Dr. Jean Twenge of San Diego State University published research in 2017 showing sharp declines in teen mental health coinciding with smartphone adoption. Critics argue that correlation does not prove causation and point to potential benefits of online connection.\n\nMisinformation spreads rapidly through social networks, challenging the information ecosystem. False stories travel faster and reach more people than accurate reports, according to research from MIT published in Science in March 2018. Platforms have implemented fact-checking programs, warning labels, and algorithmic changes to combat misleading content. These efforts produce mixed results and raise questions about censorship and the role of technology companies in determining truth.\n\nPrivacy concerns have followed social media from its earliest days. Companies collect vast amounts of personal data to target advertising with remarkable precision. The Cambridge Analytica scandal in 2018 revealed that a political consulting firm had harvested data from 87 million Facebook users without consent. Regulations like the European General Data Protection Regulation attempt to give users more control over their information.\n\nThe future of social media continues evolving rapidly as new technologies and changing preferences reshape the landscape. Virtual reality platforms promise more immersive social experiences. Decentralized networks built on blockchain technology aim to give users more control. Young people increasingly prefer private messaging over public posting. Whatever forms it takes, social connection through digital platforms will remain central to human communication for generations to come.",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Welche war die erste Social-Networking-Seite, die im Artikel erwähnt wurde?",
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
        "question": "Wie viel hat Google für die Übernahme von YouTube im Jahr 2006 bezahlt?",
        "options": [
          "1 Milliarde Dollar",
          "1,65 Milliarden Dollar",
          "2 Milliarden Dollar",
          "10 Milliarden Dollar"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Welche Plattformen gehören zur Meta-Familie von Apps? Wähle alle zutreffenden aus.",
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
        "question": "TikTok erreichte eine Milliarde monatliche Nutzer schneller als jede Social-Media-Plattform zuvor.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Wie viele Facebook-Nutzer wurden im Cambridge-Analytica-Skandal ihre Daten entwendet (in Millionen)?",
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
        "question": "Wann erreichte Facebook eine Milliarde monatlich aktive Nutzer?",
        "options": [
          "2008",
          "2010",
          "2012",
          "2014"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "technology-internet-c3",
    "topicId": "technology-internet",
    "title": "The Digital Privacy Revolution",
    "difficulty": "advanced",
    "wordCount": 3000,
    "articleType": "certification",
    "orderIndex": 3,
    "certificationLength": "long",
    "content": "Digital privacy has emerged as one of the defining issues of the twenty-first century as technology companies accumulate unprecedented amounts of personal information while governments expand surveillance capabilities to levels that would have seemed dystopian just decades ago. The tension between the benefits of data-driven services and the risks of pervasive monitoring shapes policy debates, business models, and individual choices across the globe. Understanding this complex landscape requires examining the technologies that enable both surveillance and privacy protection, the legal frameworks struggling to keep pace with innovation, and the philosophical questions about what privacy means in an age of ubiquitous connectivity.\n\nThe concept of informational privacy gained legal recognition long before the digital era. American legal scholars Samuel Warren and Louis Brandeis published their landmark 1890 Harvard Law Review article arguing for the right to be let alone in response to intrusive journalism enabled by portable cameras. This foundational text established privacy as distinct from property rights and bodily autonomy. Brandeis later became a Supreme Court justice and wrote influential opinions extending privacy protections against government intrusion.\n\nThe internet transformed privacy from an abstract legal concept into a daily practical concern. Early web users shared personal information casually, unaware of how it might be collected and used. Cookies, small text files stored by web browsers, enabled websites to recognize returning visitors starting in 1994. Netscape engineer Lou Montulli invented cookies to solve the technical problem of maintaining shopping carts, but they quickly became surveillance tools tracking users across websites.\n\nGoogle revolutionized digital advertising by connecting search queries to user interests with remarkable precision. The company's founders initially expressed discomfort with advertising-supported business models, writing in their 1998 academic paper that advertising creates mixed incentives to prioritize advertisers over users. Nevertheless, Google AdWords launched in October 2000 and Google AdSense followed in 2003, creating the targeted advertising infrastructure that would generate hundreds of billions in revenue.\n\nFacebook extended data collection into social relationships and personal communications. The platform launched in February 2004 with a promise to connect people, but its business model depended on selling detailed user profiles to advertisers. Users shared photos, location data, political views, and relationship status, often without understanding how this information would be monetized. By 2018, Facebook collected data on an estimated 2.2 billion users worldwide.\n\nThe Cambridge Analytica scandal exploded into public consciousness in March 2018, revealing how third-party applications could harvest data from millions of Facebook users without their knowledge. British consulting firm Cambridge Analytica obtained personal information from 87 million users through a personality quiz app that exploited Facebook's API permissions. The company used this data for political advertising during the 2016 United States presidential election and the Brexit referendum. Facebook faced regulatory investigations across multiple continents and paid a record 5 billion dollar fine to the Federal Trade Commission in July 2019.\n\nEdward Snowden's revelations in June 2013 exposed the scale of government surveillance enabled by digital communications. The former National Security Agency contractor leaked classified documents to journalists Glenn Greenwald, Laura Poitras, and Ewen MacAskill. These documents revealed programs collecting telephone metadata from millions of Americans, tapping fiber optic cables carrying international communications, and exploiting vulnerabilities in technology products. The disclosures sparked global debates about the balance between security and privacy.\n\nThe PRISM program allowed the NSA to collect data directly from servers of major technology companies including Google, Facebook, Apple, and Microsoft. Companies initially denied knowledge of the program, though subsequent reporting clarified that they complied with legal orders while sometimes fighting expanded surveillance in courts. Snowden fled to Hong Kong and eventually received asylum in Russia, where he remained as of 2024. The United States charged him with espionage and theft of government property.\n\nEncryption provides the primary technical defense against both government surveillance and criminal interception. End-to-end encryption ensures that only the sender and recipient can read messages, with even the service provider unable to access content. WhatsApp implemented end-to-end encryption for its 1.5 billion users in April 2016, using the Signal Protocol developed by cryptographer Moxie Marlinspike. Apple similarly encrypts iMessage communications and has publicly resisted government demands for backdoor access.\n\nLaw enforcement agencies argue that encryption creates zones where criminals operate with impunity. The FBI sued Apple in February 2016 to force the company to help unlock an iPhone used by one of the San Bernardino terrorist attackers. Apple refused, arguing that creating a backdoor would compromise security for all users. The FBI ultimately paid a third-party contractor approximately one million dollars to bypass the phone's security. This case illustrated the ongoing conflict between privacy and security interests.\n\nThe European Union enacted the General Data Protection Regulation, commonly known as GDPR, which took effect on May 25, 2018. This comprehensive framework established strict rules for collecting, storing, and processing personal data of EU residents. Organizations must obtain explicit consent before collecting data, provide access to stored information, and delete data upon request. Violations can result in fines up to 4 percent of global annual revenue or 20 million euros, whichever is larger. Amazon received the largest GDPR fine of 746 million euros in July 2021.\n\nCalifornia passed the California Consumer Privacy Act, effective January 1, 2020, establishing similar protections for state residents. The law grants consumers rights to know what personal information businesses collect, delete that information, and opt out of its sale. The California Privacy Rights Act, approved by voters in November 2020, strengthened these protections further. Other states including Virginia, Colorado, and Connecticut have enacted comparable legislation, creating a patchwork of privacy requirements across the United States.\n\nData brokers operate largely outside public awareness, compiling detailed profiles from public records, purchase histories, social media activity, and numerous other sources. Companies like Acxiom, Experian, and Oracle Data Cloud maintain databases covering hundreds of millions of individuals. These profiles influence credit decisions, employment screening, insurance rates, and targeted advertising. Brokers sell access to this information to businesses, political campaigns, and sometimes malicious actors.\n\nLocation tracking has become particularly controversial as smartphones continuously report user positions. Mobile applications routinely request location access for functionality ranging from weather forecasts to restaurant recommendations. This data reveals sensitive information about medical visits, religious practices, political activities, and personal relationships. The Wall Street Journal reported in December 2018 that dozens of companies receive precise location data from popular apps, creating comprehensive movement histories.\n\nFacial recognition technology raises distinct privacy concerns by enabling identification without consent or awareness. Law enforcement agencies use systems from companies like Clearview AI, which scraped billions of photos from social media to build a searchable database. Several cities including San Francisco, Boston, and Portland have banned government use of facial recognition. The European Union has debated restrictions on biometric surveillance in public spaces. China has deployed facial recognition extensively, using it for social control measures particularly targeting Uyghur minorities.\n\nThe right to be forgotten emerged from a 2014 European Court of Justice ruling requiring Google to remove certain search results upon request. Mario Costeja Gonzalez, a Spanish citizen, successfully argued that links to 1998 newspaper articles about his financial difficulties were no longer relevant. Google has processed over 1.6 million removal requests affecting nearly 6 million URLs since the ruling. Critics argue this amounts to censorship while supporters view it as essential to personal dignity and rehabilitation.\n\nPrivacy-preserving technologies offer alternatives to the surveillance economy. Virtual private networks encrypt internet traffic and mask user locations. The Tor browser routes communications through multiple servers to prevent tracking. Privacy-focused search engines like DuckDuckGo process queries without collecting personal data. Signal provides encrypted messaging that collects minimal metadata. These tools require technical sophistication that limits adoption but demonstrate that privacy-respecting services are technically feasible.\n\nChildren's privacy receives special legal protection given their vulnerability and inability to provide meaningful consent. The Children's Online Privacy Protection Act, enacted in 1998, restricts collection of personal information from children under 13 in the United States. TikTok paid 5.7 million dollars in February 2019 to settle charges of illegally collecting children's data. The United Kingdom's Age Appropriate Design Code, effective September 2021, requires online services to provide high privacy defaults for users under 18.\n\nThe future of digital privacy depends on technological innovation, regulatory development, and cultural attitudes toward data sharing. Decentralized identity systems could give individuals control over their personal information. Differential privacy techniques enable useful data analysis while protecting individual records. Regulatory convergence might establish global standards rather than fragmented national approaches. The fundamental tension between data utility and privacy protection will persist, but the balance between them remains subject to democratic contestation and individual choices.",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Wann veröffentlichten Samuel Warren und Louis Brandeis ihren bahnbrechenden Artikel zum Thema Datenschutz in der Harvard Law Review?",
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
        "question": "Welche Unternehmen wurden als Teil des NSA PRISM Programms enthüllt? Wählen Sie alle zutreffenden aus.",
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
        "question": "Der Cambridge Analytica-Skandal umfasste Daten von 87 Millionen Facebook-Nutzern.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Wie hoch war die FTC-Geldstrafe, die Facebook im Juli 2019 zahlen musste (in Milliarden Dollar)?",
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
        "question": "Wann hat Edward Snowden geheime NSA-Dokumente geleakt?",
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
        "question": "Wann ist die DSGVO in Kraft getreten?",
        "options": [
          "25. Mai 2016",
          "25. Mai 2017",
          "25. Mai 2018",
          "25. Mai 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Wie hoch war die DSGVO-Geldstrafe für Amazon im Juli 2021 (in Millionen Euro)?",
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
        "question": "WhatsApp hat im April 2016 eine Ende-zu-Ende-Verschlüsselung für seine Nutzer eingeführt.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Wann trat der California Consumer Privacy Act in Kraft?",
        "options": [
          "1. Januar 2018",
          "1. Januar 2019",
          "1. Januar 2020",
          "1. Januar 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Wann wurde der Children's Online Privacy Protection Act erlassen?",
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
        "question": "Wer hat 1994 Web-Cookies erfunden?",
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
        "question": "Wann wurde Google AdWords gestartet?",
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
        "question": "Wie viel hat TikTok im Februar 2019 gezahlt, um Vorwürfe wegen Kinderdatenerhebung beizulegen (in Millionen Dollar)?",
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
        "question": "San Francisco hat die staatliche Nutzung von Gesichtserkennungstechnologie verboten.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Wann erging das Urteil des Europäischen Gerichtshofs zum Recht auf Vergessenwerden?",
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
        "question": "Welche Journalisten haben die von Edward Snowden geleakten Dokumente erhalten? Wählen Sie alle zutreffenden aus.",
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
    ]
  },
  {
    "id": "technology-internet-p04",
    "topicId": "technology-internet",
    "title": "The Revolutionary World of Blockchain Technology",
    "difficulty": "intermediate",
    "wordCount": 1300,
    "articleType": "practice",
    "orderIndex": 4,
    "content": "Blockchain technology has evolved from an obscure cryptographic concept into a transformative force reshaping industries far beyond its origins in digital currency. This distributed ledger system offers unprecedented transparency, security, and decentralization that challenges traditional approaches to record-keeping and trust. Understanding blockchain reveals why technologists consider it among the most significant innovations since the internet itself.\n\nSatoshi Nakamoto, a pseudonymous individual or group, introduced blockchain to the world through the Bitcoin whitepaper published on October 31, 2008. The timing proved remarkably prescient, arriving just weeks after the collapse of Lehman Brothers triggered the global financial crisis. Nakamoto proposed a peer-to-peer electronic cash system that would eliminate the need for trusted intermediaries like banks. The first Bitcoin block, called the genesis block, was mined on January 3, 2009, embedding a newspaper headline about bank bailouts as a permanent reminder of the technology's motivations.\n\nA blockchain functions as a distributed database shared across a network of computers called nodes. Each block contains a list of transactions, a timestamp, and a cryptographic hash linking it to the previous block. This chain of hashes makes altering historical records practically impossible without controlling a majority of the network. When someone attempts to change an old transaction, the hash changes, breaking the chain and alerting other nodes to the tampering attempt.\n\nConsensus mechanisms ensure that all nodes agree on the contents of the blockchain without requiring a central authority. Bitcoin uses proof of work, where computers compete to solve complex mathematical puzzles. The first to find a solution earns the right to add the next block and receive newly created bitcoins as a reward. This process, called mining, consumed approximately 127 terawatt-hours of electricity in 2023, comparable to the annual energy use of Norway.\n\nEthereum, launched by programmer Vitalik Buterin in July 2015, expanded blockchain beyond simple transactions to programmable smart contracts. These self-executing agreements automatically enforce their terms when predefined conditions are met. A smart contract for real estate could release payment to a seller and transfer ownership to a buyer simultaneously once both parties fulfill their obligations. No lawyers, escrow agents, or banks need verify the transaction.\n\nDecentralized finance, commonly called DeFi, uses smart contracts to recreate traditional financial services without intermediaries. Lending platforms allow users to borrow cryptocurrency by providing collateral, with interest rates determined by algorithms rather than bankers. Decentralized exchanges enable direct trading between users without a company holding their funds. At its peak in November 2021, DeFi protocols held over 180 billion dollars in assets.\n\nNon-fungible tokens, known as NFTs, apply blockchain to digital ownership and provenance. Each NFT represents a unique asset verified on the blockchain, most commonly digital art or collectibles. Digital artist Beeple sold an NFT artwork at Christie's auction house in March 2021 for 69.3 million dollars, catapulting this technology into mainstream awareness. Critics question whether NFTs hold lasting value, while supporters argue they fundamentally change how creators monetize digital works.\n\nSupply chain management offers compelling practical applications for blockchain technology. Companies can track products from raw materials through manufacturing to retail shelves with immutable records at each step. Walmart partnered with IBM on a blockchain system that traces the origin of food products in seconds rather than the week previously required. This capability proves invaluable during food safety recalls when quickly identifying contaminated batches saves lives.\n\nGovernments explore blockchain for identity verification, voting systems, and public records. Estonia, a pioneer in digital governance, uses blockchain to secure health records, business registrations, and court documents for its 1.3 million citizens. The West Virginia secretary of state conducted a blockchain-based voting pilot for military personnel stationed overseas during the 2018 midterm elections. These experiments test whether the technology can enhance rather than threaten democratic institutions.\n\nEnvironmental concerns surrounding blockchain have prompted significant technological evolution. Ethereum transitioned from energy-intensive proof of work to proof of stake in September 2022, reducing its electricity consumption by an estimated 99.95 percent. Proof of stake selects validators based on the cryptocurrency they pledge as collateral rather than computational power. This shift demonstrates that blockchain can address its environmental footprint while maintaining security.\n\nScalability challenges limit blockchain adoption for everyday transactions. Bitcoin processes roughly seven transactions per second compared to the Visa network's capacity for 24,000. Layer two solutions build faster payment channels on top of existing blockchains. The Lightning Network enables nearly instant Bitcoin transactions by settling only final balances on the main blockchain. These innovations aim to make blockchain practical for everyday purchases.\n\nThe future of blockchain extends into realms its creators never imagined. Decentralized autonomous organizations, or DAOs, use token voting to govern communities and manage treasuries without traditional corporate structures. Digital identity systems could give individuals control over their personal data while proving credentials to employers, landlords, or governments. Whether blockchain fulfills its revolutionary potential or settles into a niche role remains uncertain, but its impact on technology and society has already proven substantial and lasting.",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Wann wurde das Bitcoin-Whitepaper veröffentlicht?",
        "options": [
          "3. Januar 2009",
          "31. Oktober 2008",
          "Juli 2015",
          "September 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Welche Anwendungen werden neben Kryptowährungen als Blockchain-Anwendungen genannt? Wählen Sie alle zutreffenden aus.",
        "options": [
          "Lieferkettenmanagement",
          "Digitale Identität",
          "Wahlsysteme",
          "Video-Streaming"
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
        "question": "Ethereum hat im September 2022 auf Proof of Stake umgestellt, wodurch der Stromverbrauch um 99,95 Prozent gesenkt wurde.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Für wie viel wurde das Beeple NFT-Kunstwerk im März 2021 bei Christie's verkauft (in Millionen Dollar)?",
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
        "question": "Wer hat Ethereum im Juli 2015 gestartet?",
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
        "question": "Wie viele Transaktionen pro Sekunde kann das Bitcoin-Netzwerk verarbeiten?",
        "options": [
          "Ungefähr 7",
          "Ungefähr 70",
          "Ungefähr 700",
          "Ungefähr 7.000"
        ],
        "correctIndex": 0
      }
    ]
  },
  {
    "id": "technology-internet-p05",
    "topicId": "technology-internet",
    "title": "The Cloud Computing Revolution",
    "difficulty": "intermediate",
    "wordCount": 1700,
    "articleType": "practice",
    "orderIndex": 5,
    "content": "Cloud computing has fundamentally transformed how businesses and individuals use technology, shifting software and data storage from local devices to vast networks of remote servers. This architectural revolution enables capabilities that seemed impossible just two decades ago, from streaming entertainment to artificial intelligence services accessible from any device. The cloud has become so integral to modern life that most people use it daily without conscious awareness.\n\nAmazon Web Services launched its first cloud products in March 2006, pioneering the infrastructure-as-a-service model that would reshape the technology industry. The company had built massive computing capacity to handle peak shopping periods like Black Friday and realized it could rent unused capacity to other businesses. Andy Jassy, who led AWS from its founding, built the division into a profit engine generating over 80 billion dollars in annual revenue. This business model proved so successful that competitors rushed to build their own cloud platforms.\n\nMicrosoft Azure entered the cloud market in February 2010, leveraging the company's deep relationships with enterprise customers. CEO Satya Nadella, who took leadership in 2014, pivoted Microsoft's strategy around cloud services. Azure grew to become the second-largest cloud provider, powering everything from small business websites to the LinkedIn professional network. Microsoft's cloud transformation revived a company many had dismissed as past its prime.\n\nGoogle Cloud Platform brings the search giant's expertise in distributed computing and machine learning to enterprise customers. The company that indexes the entire internet and processes billions of search queries daily offers that infrastructure to businesses of all sizes. Google's investments in undersea cables and data centers spanning dozens of countries enable low-latency access from nearly anywhere on Earth. The platform particularly excels at data analytics and artificial intelligence workloads.\n\nCloud computing offers three primary service models that stack upon each other like layers. Infrastructure as a Service provides virtual machines, storage, and networking that customers configure themselves. Platform as a Service adds operating systems, databases, and development tools. Software as a Service delivers complete applications through web browsers, eliminating installation and maintenance entirely. Most people interact with SaaS products daily through email, document editing, and business applications.\n\nThe economics of cloud computing create advantages for organizations of nearly every size. Startups launch without purchasing expensive hardware or hiring specialized staff to maintain data centers. They pay only for resources consumed, scaling up during busy periods and down during slow ones. This flexibility transformed the economics of starting a technology company. A service that might have required millions in infrastructure investment can now launch with minimal capital.\n\nEnterprise organizations increasingly migrate from on-premises data centers to cloud platforms. General Electric consolidated hundreds of data centers into a hybrid cloud architecture starting in 2014. Capital One, one of the largest banks in America, announced in 2020 that it had closed its last data center after migrating entirely to AWS. These transformations take years and billions of dollars but ultimately reduce costs while increasing capabilities.\n\nSecurity in the cloud differs fundamentally from traditional approaches but often exceeds what organizations achieve independently. Major cloud providers employ thousands of security specialists and invest billions in protective technologies. They hold certifications for handling classified government information and sensitive financial data. Shared responsibility models mean providers secure the infrastructure while customers secure their own applications and data configurations.\n\nGeographic distribution of cloud data centers serves purposes beyond performance optimization. Regulations in many countries require certain data to remain within national borders. Cloud providers build regional data centers to comply with these sovereignty requirements. European customers can ensure their data stays in Frankfurt or Amsterdam. Australian businesses keep information within their country. This distributed architecture also provides disaster recovery capabilities that few organizations could afford independently.\n\nEdge computing extends cloud capabilities closer to where data originates. Rather than sending everything to distant data centers, edge systems process information locally for applications requiring immediate response. Autonomous vehicles cannot wait for data to travel thousands of miles before deciding to brake. Industrial sensors analyzing equipment vibrations need instant anomaly detection. Edge computing brings cloud intelligence to scenarios where milliseconds matter.\n\nServerless computing represents the newest evolution of cloud architecture. In this model, developers write code without managing any infrastructure at all. Cloud platforms automatically allocate resources when code runs and charge only for actual execution time. A function that runs for 100 milliseconds costs a tiny fraction of a cent. Applications can scale from zero to handling millions of requests without any configuration changes.\n\nThe environmental impact of cloud computing generates both concerns and opportunities. Data centers consume approximately 1.5 percent of global electricity and that share continues growing. However, cloud providers operate far more efficiently than typical corporate data centers. Google claims its facilities achieve an average power usage effectiveness of 1.1 compared to the industry average above 1.5. Cloud platforms increasingly power operations with renewable energy, with Microsoft pledging to be carbon negative by 2030.\n\nArtificial intelligence and machine learning have become defining features of cloud platforms. Pre-trained models for image recognition, natural language processing, and speech synthesis are available through simple programming interfaces. Organizations without machine learning expertise can add sophisticated capabilities to their applications. Cloud providers compete aggressively on AI features, each claiming advantages in accuracy, ease of use, and breadth of available models.\n\nMulti-cloud strategies allow organizations to use multiple providers simultaneously, avoiding dependence on any single vendor. Kubernetes, an open-source container orchestration system originally developed by Google, enables workloads to move between clouds. Companies select different providers for different workloads based on cost, performance, or specialized capabilities. This flexibility requires additional complexity but reduces vendor lock-in concerns.\n\nThe future of cloud computing points toward even greater integration with daily life and business operations. Quantum computing resources already appear on cloud platforms, though practical applications remain limited. Artificial intelligence will automate more infrastructure management, reducing the expertise required to deploy sophisticated systems. The line between local devices and cloud resources will blur further as connectivity improves and edge computing matures. Whatever specific technologies emerge, the fundamental shift from owned infrastructure to rented services will continue reshaping how humanity computes.",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Wann hat Amazon Web Services seine ersten Cloud-Produkte auf den Markt gebracht?",
        "options": [
          "März 2006",
          "Februar 2010",
          "Januar 2014",
          "November 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Welche der folgenden sind die drei primären Cloud-Service-Modelle, die erwähnt werden? Wählen Sie alle zutreffenden aus.",
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
        "question": "Capital One gab im Jahr 2020 bekannt, dass es sein letztes Rechenzentrum geschlossen hat, nachdem es vollständig zu AWS migriert war.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Welchen Prozentsatz des weltweiten Stromverbrauchs verbrauchen Rechenzentren?",
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
        "question": "Welcher CEO hat ab 2014 die Strategie von Microsoft auf Cloud-Dienste ausgerichtet?",
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
        "question": "Welches Open-Source-System ermöglicht es, Workloads zwischen verschiedenen Cloud-Anbietern zu verschieben?",
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
        "question": "Wie viel Jahresumsatz generiert AWS (in Milliarden Dollar)?",
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
        "question": "Bis wann hat Microsoft zugesagt, CO2-negativ zu sein?",
        "options": [
          "2025",
          "2030",
          "2040",
          "2050"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "technology-internet-p06",
    "topicId": "technology-internet",
    "title": "The Quantum Computing Revolution",
    "difficulty": "intermediate",
    "wordCount": 2100,
    "articleType": "practice",
    "orderIndex": 6,
    "content": "Quantum computing represents the most profound transformation in computational power since the invention of the transistor, promising to solve problems that would take classical computers longer than the age of the universe to complete. These machines harness the bizarre properties of quantum mechanics to perform calculations in fundamentally new ways that defy everyday intuition. Understanding this revolutionary technology reveals both its extraordinary potential and the formidable challenges that remain before quantum computers achieve their full promise.\n\nClassical computers encode information as bits that exist as either zero or one at any given moment. Every photograph, document, and video on your devices reduces to long strings of these binary digits manipulated through logical operations. This approach has powered remarkable progress since the 1940s, with processors now containing billions of transistors on chips smaller than a fingernail. Yet certain problems remain stubbornly beyond reach because the number of calculations required grows exponentially with problem size.\n\nQuantum computers use quantum bits, called qubits, that can exist in superposition, representing zero and one simultaneously until measured. This property allows quantum systems to explore many possible solutions at once rather than checking them one by one. When multiple qubits become entangled, measuring one instantly affects the others regardless of physical distance. These quantum phenomena enable algorithms that dramatically outperform classical approaches for specific problem types.\n\nRichard Feynman, the Nobel Prize-winning physicist, proposed the concept of quantum computing during a lecture at the California Institute of Technology in May 1981. He observed that simulating quantum mechanical systems on classical computers required exponentially increasing resources as system size grew. Feynman suggested that only a quantum mechanical computer could efficiently simulate quantum physics. This insight launched a field that would develop slowly for decades before recent breakthroughs accelerated progress.\n\nDavid Deutsch at Oxford University formalized the theory of quantum computation in 1985, describing how a universal quantum computer could exploit superposition and interference. Peter Shor at Bell Labs made quantum computing famous in 1994 when he developed an algorithm that could factor large numbers exponentially faster than any known classical method. This discovery threatened the RSA encryption that secures internet communications, suddenly making quantum computing a matter of national security.\n\nBuilding actual quantum computers proved extraordinarily difficult because qubits are fragile and easily disturbed by their environment. Any interaction with the outside world causes decoherence, collapsing superposition and destroying quantum information. Early experiments maintained coherence for only nanoseconds. Researchers developed elaborate isolation techniques including superconducting circuits cooled to temperatures colder than outer space, typically around 15 millikelvin, barely above absolute zero.\n\nIBM placed the first quantum computer accessible via the cloud, called IBM Quantum Experience, online in May 2016, allowing researchers and enthusiasts worldwide to experiment with real quantum hardware. The initial system contained just five qubits, barely enough for simple demonstrations. By 2023, IBM had deployed systems exceeding 1,000 qubits and announced plans for 100,000 qubit systems by 2033. These machines remain far from replacing classical computers but demonstrate steady progress toward practical utility.\n\nGoogle achieved a milestone called quantum supremacy in October 2019 when its 53-qubit Sycamore processor performed a calculation in 200 seconds that would take the world's fastest supercomputer approximately 10,000 years. Critics disputed the comparison, with IBM arguing their supercomputers could complete the task in days rather than millennia. Nevertheless, the achievement demonstrated that quantum computers could outperform classical systems on at least some tasks.\n\nError correction represents perhaps the greatest obstacle to useful quantum computing. Physical qubits are too noisy and unreliable for complex calculations. Quantum error correction encodes one logical qubit across many physical qubits to detect and fix errors, but current approaches require thousands of physical qubits per logical qubit. A quantum computer solving practical problems might need millions of physical qubits, far beyond current capabilities.\n\nDifferent technologies compete to build the best qubits for future quantum computers. Superconducting circuits, used by IBM and Google, leverage established manufacturing techniques from the semiconductor industry. Trapped ions, pursued by IonQ and Honeywell, hold charged atoms in electromagnetic fields with exceptional precision. Photonic systems encode information in particles of light that can travel long distances without decoherence. Topological qubits, still largely theoretical, would store information in patterns resistant to local disturbances.\n\nQuantum chemistry applications may deliver the first practical quantum computing advantages. Simulating molecules to design new drugs, materials, and catalysts requires quantum mechanical calculations that scale exponentially on classical computers. A quantum computer could model chemical reactions at the atomic level, potentially accelerating discovery of medicines, fertilizers, and clean energy technologies. Companies including Roche, Merck, and BASF have launched quantum computing research programs anticipating these capabilities.\n\nOptimization problems spanning logistics, finance, and machine learning represent another promising application area. Finding the best route for delivery trucks, optimal portfolios for investors, or ideal parameters for neural networks involves searching vast solution spaces. Quantum annealing, a specialized form of quantum computing commercialized by D-Wave Systems since 2011, addresses optimization directly. Major corporations including Volkswagen, JPMorgan Chase, and Lockheed Martin have explored quantum optimization for real business challenges.\n\nCryptography faces both threats and opportunities from quantum computing advancement. Shor's algorithm could break widely used encryption once sufficiently powerful quantum computers exist. The National Institute of Standards and Technology selected new post-quantum cryptographic standards in July 2022 after a six-year competition to identify algorithms resistant to quantum attacks. Meanwhile, quantum key distribution uses the physics of quantum measurement to create theoretically unbreakable encryption for the most sensitive communications.\n\nChina has invested heavily in quantum technology, establishing the University of Science and Technology of China as a world leader under physicist Pan Jianwei. In 2017, China launched Micius, a satellite that demonstrated quantum-secured communications between ground stations separated by 1,200 kilometers. Chinese researchers claimed quantum supremacy with a photonic system called Jiuzhang in December 2020. The United States responded with the National Quantum Initiative Act of 2018, allocating 1.2 billion dollars over five years to maintain competitiveness.\n\nThe quantum computing industry has attracted enormous investment despite uncertain timelines for practical returns. Venture capital funding for quantum startups exceeded 2.5 billion dollars in 2022. Major technology companies including Microsoft, Amazon, and Alibaba have launched quantum cloud services alongside dedicated hardware companies. Analysts project the quantum computing market will reach 65 billion dollars by 2030, though estimates vary widely given technological uncertainty.\n\nThe future of quantum computing depends on sustained progress across multiple fronts simultaneously. Hardware must improve in scale, coherence, and connectivity. Software must develop efficient algorithms and programming tools accessible beyond quantum physics specialists. Applications must demonstrate clear advantages over classical alternatives for real-world problems. The journey from laboratory demonstrations to practical utility may take decades, but the potential rewards justify continued investment and effort.",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Wer schlug das Konzept des Quantencomputings im Mai 1981 vor?",
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
        "question": "Welche Technologien werden als Ansätze zum Bau von Qubits genannt? Wählen Sie alle zutreffenden aus.",
        "options": [
          "Supraleitende Schaltkreise",
          "Gefangene Ionen",
          "Photonische Systeme",
          "Graphentransistoren"
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
        "question": "IBM hat im Mai 2016 den ersten über die Cloud zugänglichen Quantencomputer online gestellt.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Wie viele Sekunden benötigte Googles Sycamore-Prozessor, um seine Quantenüberlegenheitsberechnung abzuschließen?",
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
        "question": "Wann entwickelte Peter Shor seinen berühmten Faktorisierungsalgorithmus?",
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
        "question": "Auf welche Temperatur werden supraleitende Quantencomputer typischerweise gekühlt?",
        "options": [
          "Ungefähr 100 Kelvin",
          "Ungefähr 4 Kelvin",
          "Ungefähr 15 Millikelvin",
          "Ungefähr 1 Kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Wie viel Fördermittel stellte der National Quantum Initiative Act über fünf Jahre bereit (in Milliarden Dollar)?",
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
        "question": "China hat 2017 einen Quantenkommunikationssatelliten namens Micius gestartet.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Wann wählte NIST neue postquantenkryptografische Standards aus?",
        "options": [
          "Juli 2020",
          "Juli 2021",
          "Juli 2022",
          "Juli 2023"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "technology-internet-p07",
    "topicId": "technology-internet",
    "title": "The Global Semiconductor Industry",
    "difficulty": "intermediate",
    "wordCount": 2500,
    "articleType": "practice",
    "orderIndex": 7,
    "content": "Semiconductors have become the foundation of modern civilization, powering everything from smartphones and automobiles to medical devices and military systems that nations depend upon for security. These tiny chips containing billions of transistors represent the most complex objects ever manufactured by humanity, produced through processes requiring precision measured in atoms. The global competition to control semiconductor technology has transformed this industry into a flashpoint of geopolitical rivalry with implications for economic prosperity and national security worldwide.\n\nThe semiconductor journey began at Bell Labs in New Jersey on December 23, 1947, when physicists John Bardeen, Walter Brattain, and William Shockley demonstrated the first transistor. This device could amplify electrical signals without the heat and fragility of vacuum tubes, earning its inventors the Nobel Prize in Physics in 1956. The transistor's potential for miniaturization would eventually enable the digital revolution that reshaped human society.\n\nJack Kilby at Texas Instruments and Robert Noyce at Fairchild Semiconductor independently invented the integrated circuit in 1958 and 1959, combining multiple transistors on a single piece of semiconductor material. This breakthrough eliminated the need for hand-wiring individual components and enabled manufacturing at scale. Kilby received the Nobel Prize in Physics in 2000 for this contribution that made modern electronics possible.\n\nGordon Moore, a co-founder of Intel, observed in 1965 that the number of transistors on integrated circuits doubled approximately every two years while costs remained constant. This observation, known as Moore's Law, has guided the industry for six decades of exponential improvement. Modern processors contain over 100 billion transistors, each measuring just a few nanometers across, roughly the width of 20 silicon atoms.\n\nThe semiconductor manufacturing process involves hundreds of steps spanning months of precise operations. Engineers begin with cylinders of ultra-pure silicon grown from molten material at temperatures exceeding 1,400 degrees Celsius. These ingots are sliced into thin wafers and polished to atomic smoothness. Photolithography projects circuit patterns onto wafers using ultraviolet light, with the most advanced machines using extreme ultraviolet wavelengths of just 13.5 nanometers.\n\nTaiwan Semiconductor Manufacturing Company, known as TSMC, has emerged as the world's most critical semiconductor manufacturer. Founded by Morris Chang in 1987, TSMC pioneered the foundry model of manufacturing chips designed by other companies. By 2023, TSMC produced over 90 percent of the world's most advanced chips, including processors for Apple, AMD, and Nvidia. This concentration of capability on an island facing territorial claims from China has become a major geopolitical concern.\n\nThe equipment required to manufacture advanced semiconductors represents staggering technological achievement. ASML, a Dutch company, holds a monopoly on extreme ultraviolet lithography machines that cost approximately 200 million dollars each and weigh 180,000 kilograms. These systems use plasma heated to 220,000 degrees Celsius to generate the precise light wavelengths needed. ASML required contributions from optics supplier Zeiss, light source developer Cymer, and numerous other partners to achieve this capability after decades of development.\n\nSamsung Electronics and Intel compete with TSMC for advanced manufacturing leadership, though both have fallen behind in recent years. Samsung operates major fabrication facilities in South Korea and Texas, producing chips for various customers alongside its own products. Intel, historically the technology leader, struggled with manufacturing delays and lost market share before announcing aggressive investment plans under CEO Pat Gelsinger beginning in 2021.\n\nChina has made semiconductor independence a national priority, investing over 150 billion dollars through its National Integrated Circuit Industry Investment Fund and other programs. Semiconductor Manufacturing International Corporation represents China's most advanced domestic manufacturer, though it remains several generations behind TSMC. American export controls imposed beginning in October 2022 restrict China's access to advanced manufacturing equipment and chip designs, intensifying pressure on indigenous development.\n\nThe automotive industry discovered its dangerous dependence on semiconductors during the global chip shortage that began in 2020. As pandemic lockdowns disrupted supply chains, automakers canceled orders expecting weak demand. When demand recovered faster than anticipated, semiconductor factories had allocated capacity to other customers. General Motors, Ford, and Toyota shut production lines intermittently for over two years while waiting for chips. The shortage cost the automotive industry an estimated 210 billion dollars in lost revenue.\n\nGovernments worldwide have launched massive programs to build domestic semiconductor capacity. The United States passed the CHIPS and Science Act in August 2022, allocating 52 billion dollars for semiconductor manufacturing and research. The European Chips Act committed 43 billion euros to similar goals. Japan announced 2 trillion yen in subsidies to attract TSMC, Samsung, and Micron factories. India launched a 10 billion dollar program seeking its first advanced fabrication facility.\n\nMemory chips represent a distinct semiconductor category dominated by different players than logic processors. Samsung, SK Hynix of South Korea, and Micron of the United States control the DRAM market for computer memory. The flash memory industry that stores data in smartphones and solid-state drives involves the same Korean players plus Japanese manufacturer Kioxia. Memory prices fluctuate dramatically with supply and demand cycles, creating boom-and-bust patterns that complicate investment decisions.\n\nThe semiconductor design industry has concentrated around a few leading companies commanding enormous resources. Nvidia, founded by Jensen Huang in 1993, transformed from a graphics card company into an artificial intelligence powerhouse with chips powering data centers worldwide. The company's market capitalization exceeded one trillion dollars in June 2023. Qualcomm dominates mobile processors with technology licensed to nearly every smartphone maker. AMD has emerged as a serious competitor to Intel in personal computers and servers under CEO Lisa Su.\n\nSemiconductor equipment suppliers form a critical but often overlooked layer of the industry ecosystem. Applied Materials, Lam Research, and KLA Corporation of the United States provide deposition, etching, and inspection equipment essential to manufacturing. Tokyo Electron of Japan contributes coating and cleaning systems. These companies invest billions annually in research and development to push the boundaries of manufacturing precision.\n\nThe environmental footprint of semiconductor manufacturing raises sustainability concerns that the industry increasingly addresses. A modern fabrication facility consumes electricity equivalent to a small city, with some plants in Taiwan using as much power as 300,000 homes. Water consumption reaches millions of gallons daily for cooling and cleaning processes. The industry has committed to renewable energy adoption and water recycling to reduce environmental impact, with TSMC pledging net-zero emissions by 2050.\n\nAdvanced packaging technologies extend semiconductor performance beyond what transistor miniaturization alone can achieve. Chiplet architectures combine multiple smaller chips into packages that function as single processors. Three-dimensional stacking places chips vertically connected by microscopic pillars. These techniques enable continued improvement even as approaching atomic limits threatens traditional scaling. AMD's latest processors use chiplet designs that reduce manufacturing costs while improving performance.\n\nThe workforce demands of semiconductor manufacturing create challenges for industry expansion. Skilled technicians operating fabrication equipment require years of training. Engineers designing next-generation processes need advanced degrees and specialized expertise. The United States faces particular shortages after decades of manufacturing decline. Educational initiatives and immigration policies will determine whether countries can staff the fabrication facilities they are racing to build.\n\nSecurity concerns pervade the semiconductor industry as chips become weapons in technological competition between nations. Defense systems depend on trusted chip supplies free from hidden vulnerabilities. Economic prosperity requires access to the most advanced technologies for artificial intelligence, autonomous vehicles, and other emerging applications. The strategic importance of semiconductors ensures that governments will continue investing heavily and restricting exports to protect perceived national interests.\n\nThe next decade will determine whether the semiconductor industry remains concentrated in East Asia or diversifies globally. Enormous investments in new fabrication facilities will take years to become productive. Technological challenges multiply as transistors approach fundamental physical limits. New computing paradigms including quantum processing and neuromorphic chips may eventually complement or replace traditional semiconductors. Whatever directions the industry takes, these tiny chips will remain essential to modern life for the foreseeable future.",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Wann wurde der erste Transistor bei Bell Labs demonstriert?",
        "options": [
          "23. Dezember 1945",
          "23. Dezember 1947",
          "23. Dezember 1950",
          "23. Dezember 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Welche Unternehmen werden als Speicherchip-Hersteller genannt? Wählen Sie alle zutreffenden aus.",
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
        "question": "TSMC produzierte bis 2023 über 90 Prozent der weltweit fortschrittlichsten Chips.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Wie viel kostet eine ASML-EUV-Lithografiemaschine (in Millionen Dollar)?",
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
        "question": "Wer hat TSMC im Jahr 1987 gegründet?",
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
        "question": "Wie viel hat der CHIPS and Science Act im August 2022 für Halbleiter bereitgestellt?",
        "options": [
          "32 Milliarden Dollar",
          "42 Milliarden Dollar",
          "52 Milliarden Dollar",
          "62 Milliarden Dollar"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Wie hoch waren die Umsatzeinbußen der Automobilindustrie aufgrund des Chipmangels (in Milliarden Dollar)?",
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
        "question": "Die Marktkapitalisierung von Nvidia überstieg im Juni 2023 eine Billion Dollar.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "Auf welche Temperatur wird das Plasma in den ASML-EUV-Maschinen erhitzt?",
        "options": [
          "22.000 Grad Celsius",
          "120.000 Grad Celsius",
          "220.000 Grad Celsius",
          "1.400 Grad Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Wie viele Milliarden Transistoren enthalten moderne Prozessoren?",
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
        "question": "Wann hat Jack Kilby den integrierten Schaltkreis bei Texas Instruments erfunden?",
        "options": [
          "1955",
          "1958",
          "1962",
          "1965"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "technology-internet-p08",
    "topicId": "technology-internet",
    "title": "The Evolution of Streaming Media",
    "difficulty": "intermediate",
    "wordCount": 2800,
    "articleType": "practice",
    "orderIndex": 8,
    "content": "Streaming media has fundamentally transformed how humanity consumes entertainment, education, and information, replacing physical media and broadcast schedules with instant access to virtually unlimited content from any device connected to the internet. This technological revolution, which began with grainy video clips in the 1990s, now delivers ultra-high-definition movies, live concerts, and interactive experiences to billions of users worldwide. The story of streaming reveals how advances in compression, bandwidth, and business models combined to reshape entire industries.\n\nThe technical foundations of streaming emerged from research into video compression and network protocols during the 1980s and 1990s. Engineers at the Moving Picture Experts Group developed the MPEG standards that made digital video practical, with MPEG-1 appearing in 1993 and MPEG-4 following in 1998. These compression algorithms reduced video files to manageable sizes by eliminating redundant information between frames and approximating details the human eye would not notice. Without such compression, streaming video would require bandwidth far exceeding what networks could deliver.\n\nRealNetworks launched RealPlayer in 1995, pioneering streaming audio and video over early internet connections. The company's RealAudio format allowed radio stations to broadcast over the web for the first time. RealVideo followed in 1997, though the postage-stamp-sized, stuttering videos bore little resemblance to modern streaming. At its peak around 2000, RealPlayer had been installed on over 85 percent of computers connected to the internet.\n\nApple entered the streaming arena with QuickTime, originally released in 1991 for playing local video files. The company added streaming capabilities throughout the 1990s and leveraged the technology when launching iTunes in January 2001. While iTunes initially focused on downloading music rather than streaming, it demonstrated consumer appetite for instant digital access. Apple sold over 70 million songs through iTunes within its first year.\n\nYouTube's founding in February 2005 by former PayPal employees Chad Hurley, Steve Chen, and Jawed Karim marked the beginning of streaming video's mainstream era. The platform made uploading and sharing video simple for ordinary users without technical expertise. The first video, showing Karim at the San Diego Zoo, went live on April 23, 2005. Google recognized YouTube's potential and acquired the company for 1.65 billion dollars in October 2006, just eighteen months after its founding.\n\nNetflix began as a DVD-by-mail rental service in 1997, founded by Reed Hastings and Marc Randolph in Scotts Valley, California. The company introduced unlimited rentals for a monthly subscription fee in 1999, challenging Blockbuster's per-rental model. Netflix launched streaming video in January 2007, initially as a complement to its DVD service. Subscribers could watch a limited selection of movies and television shows directly on their computers without waiting for discs to arrive.\n\nThe transition from DVDs to streaming accelerated throughout the 2010s as internet speeds improved and content libraries expanded. Netflix began producing original programming with the February 2013 release of House of Cards, which received critical acclaim and demonstrated that streaming platforms could compete with traditional networks for talent and quality. The company invested heavily in original content, spending over 17 billion dollars annually on programming by 2022.\n\nSpotify revolutionized music streaming after its Swedish founders Daniel Ek and Martin Lorentzon launched the service in October 2008. The platform offered both free advertising-supported listening and premium subscriptions without advertisements. Spotify negotiated licensing agreements with major record labels despite initial resistance from an industry still recovering from piracy's devastating impact. By December 2023, Spotify reported 602 million monthly active users and over 236 million paying subscribers.\n\nAmazon Prime Video emerged from Amazon's 2006 acquisition of the video service that became Amazon Unbox. The company bundled streaming video with Prime membership starting in February 2011, adding value to the subscription that had previously offered only faster shipping. Amazon began producing original content in 2013 and has since won Emmy Awards and Academy Awards for its productions. The combination of video streaming with shopping benefits creates unique competitive advantages.\n\nDisney launched Disney Plus on November 12, 2019, leveraging its vast content library including Marvel, Star Wars, Pixar, and National Geographic properties. The service attracted 10 million subscribers within its first day, demonstrating the power of beloved franchises and aggressive pricing. Disney Plus reached over 160 million subscribers within four years, though the company faced pressure to achieve profitability after initial losses from heavy content investment.\n\nLive streaming has expanded beyond entertainment to encompass gaming, education, fitness, and countless other domains. Twitch, founded in 2011 and acquired by Amazon for 970 million dollars in 2014, popularized live video game streaming. Professional gamers broadcast to millions of viewers while earning income through subscriptions and donations. The platform averaged over 31 million daily visitors by 2023, rivaling traditional sports broadcasts for young audiences.\n\nTechnical innovations continue improving streaming quality and efficiency. Adaptive bitrate streaming automatically adjusts video quality based on available bandwidth, preventing buffering while maximizing resolution when connections allow. Content delivery networks position servers geographically close to viewers, reducing latency and improving reliability. Codec improvements including H.265 and AV1 deliver higher quality at lower bitrates, enabling 4K and 8K streaming even on limited connections.\n\nThe infrastructure supporting streaming services requires massive investment in data centers and network capacity. Netflix content delivery uses servers positioned within internet service provider networks, storing copies of popular titles locally to reduce long-distance data transfer. During peak evening hours, streaming video accounts for over 60 percent of internet traffic in North America. This concentration has sparked debates about network neutrality and whether streaming services should pay for prioritized delivery.\n\nMusic streaming has fundamentally altered how artists earn income and how record labels operate. Spotify pays artists approximately 0.003 to 0.005 dollars per stream, requiring millions of plays to generate meaningful revenue. This model favors artists with large, engaged followings while making it harder for emerging musicians to sustain careers. Taylor Swift famously removed her music from Spotify from 2014 to 2017, protesting the economics of streaming before eventually returning.\n\nPodcast streaming has exploded from a niche medium into a major content category attracting billions in investment. Spotify acquired podcast companies Gimlet Media and Anchor in February 2019 for approximately 340 million dollars combined. Apple, which popularized podcasts through iTunes integration starting in 2005, faces increased competition from Spotify and Amazon. Over 2 million podcasts with more than 48 million episodes existed by 2023.\n\nThe streaming wars have intensified as traditional media companies launch competing services. HBO Max, Paramount Plus, Peacock, and Apple TV Plus all entered the market between 2019 and 2020. This fragmentation forces consumers to subscribe to multiple services to access all desired content, ironically recreating some of the inconveniences of cable television bundles that streaming initially promised to eliminate. Industry analysts predict consolidation as smaller services struggle to compete.\n\nInternational expansion presents both opportunities and challenges for streaming platforms. Netflix operates in over 190 countries and produces content in dozens of languages. The Korean series Squid Game became Netflix's most-watched show ever in September 2021, demonstrating global appetite for non-English content. Local competitors including Hotstar in India, iQiyi in China, and Globoplay in Brazil maintain strong positions in their home markets.\n\nRegulatory concerns surrounding streaming services multiply as they become dominant entertainment platforms. Questions about data privacy, content moderation, labor practices, and market concentration draw attention from policymakers. The European Union requires streaming services to ensure 30 percent of their catalogs consist of European works. Some countries impose taxes on streaming subscriptions to fund local content production.\n\nThe future of streaming points toward greater interactivity, immersion, and personalization. Cloud gaming services from Microsoft, Sony, and others stream video games without requiring expensive hardware. Virtual reality experiences could eventually stream to lightweight headsets. Artificial intelligence algorithms will continue refining recommendations and potentially generating personalized content. Whatever specific technologies emerge, streaming has permanently transformed the relationship between creators and audiences worldwide.",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Wann hat Netflix seinen Streaming-Video-Dienst gestartet?",
        "options": [
          "Januar 2005",
          "Januar 2007",
          "Januar 2009",
          "Januar 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Welche Unternehmen haben bedeutende Streaming-Plattformen gegründet? Wähle alle zutreffenden aus.",
        "options": [
          "Chad Hurley war Mitbegründer von YouTube",
          "Reed Hastings war Mitbegründer von Netflix",
          "Daniel Ek war Mitbegründer von Spotify",
          "Bill Gates gründete Disney Plus"
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
        "question": "Google hat YouTube im Oktober 2006 für 1,65 Milliarden Dollar übernommen.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Wie viele Millionen Abonnenten hat Spotify bis Dezember 2023 als zahlende Abonnenten gemeldet?",
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
        "question": "Wann wurde das erste YouTube-Video hochgeladen?",
        "options": [
          "14. Februar 2005",
          "23. April 2005",
          "4. Juli 2005",
          "9. Oktober 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Wie viele Abonnenten gewann Disney Plus an seinem ersten Tag?",
        "options": [
          "1 Million",
          "5 Millionen",
          "10 Millionen",
          "20 Millionen"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Wie viel hat Amazon für die Übernahme von Twitch im Jahr 2014 bezahlt (in Millionen Dollar)?",
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
        "question": "Netflix begann 1997 als DVD-Verleih per Post.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Welche Netflix-Originalserie wurde im Februar 2013 veröffentlicht?",
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
        "question": "Welchen Prozentsatz des Internetverkehrs in Nordamerika macht Streaming-Video während der Hauptverkehrszeiten aus?",
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
        "question": "Welche koreanische Serie wurde im September 2021 zur meistgesehenen Serie von Netflix?",
        "options": [
          "Crash Landing on You",
          "Kingdom",
          "Squid Game",
          "All of Us Are Dead"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "technology-internet-p09",
    "topicId": "technology-internet",
    "title": "The Science of Search Engines",
    "difficulty": "advanced",
    "wordCount": 3000,
    "articleType": "practice",
    "orderIndex": 9,
    "content": "Search engines have become the primary gateways through which humanity accesses the vast repository of information on the internet, processing billions of queries daily and shaping how people discover, evaluate, and understand the world around them. The sophisticated algorithms powering these systems represent some of the most complex software ever developed, combining techniques from information retrieval, natural language processing, machine learning, and distributed computing. Understanding how search engines work reveals both their remarkable capabilities and their profound influence on human knowledge and behavior.\n\nThe origins of web search trace back to the early 1990s when the internet was growing too large for manually curated directories. Archie, created by Alan Emtage at McGill University in Montreal in 1990, indexed file names on FTP servers but did not search web pages. The World Wide Web Wanderer, developed by Matthew Gray at MIT in 1993, became the first web crawler, measuring the internet's growth by visiting pages automatically. These primitive tools laid groundwork for more sophisticated systems.\n\nAltaVista launched in December 1995 and quickly became the leading search engine of its era. Developed by researchers at Digital Equipment Corporation in Palo Alto, California, AltaVista could search a database of 20 million web pages using full-text indexing. Users marveled at results appearing within seconds for queries across millions of documents. At its peak in 1997, AltaVista processed 80 million search queries per day.\n\nLarry Page and Sergey Brin created Google as a Stanford University research project in 1996, introducing the PageRank algorithm that would transform search. Their insight was that links between web pages contained valuable information about relevance and authority. A page linked by many other pages, particularly important pages, should rank higher than one with few links. This approach produced dramatically better results than competitors who ranked pages primarily by keyword frequency.\n\nPageRank simulates a random web surfer who clicks links randomly and occasionally jumps to a completely random page. The probability that this hypothetical surfer visits any particular page becomes its PageRank score. Pages that receive many links from high-PageRank pages accumulate higher scores themselves. This mathematical model, detailed in Page and Brin's 1998 paper published while they were doctoral students, remains foundational to Google's ranking despite numerous subsequent refinements.\n\nThe web crawling process begins with a list of known URLs that automated programs called spiders or crawlers visit. The crawler downloads each page's content and extracts all hyperlinks it contains. New URLs are added to the queue for future crawling. Google's crawler, originally named BackRub and later Googlebot, visits billions of pages continuously, prioritizing frequently updated sites and those with many incoming links. A complete crawl of the web takes weeks, though popular pages are re-crawled much more frequently.\n\nIndexing transforms raw webpage content into structured data that enables rapid retrieval. Search engines build inverted indexes that map every word to the list of documents containing it. When you search for a term, the engine looks up that term's posting list rather than scanning every document. Additional data structures store information about word positions for phrase matching, anchor text from incoming links, and metadata like page titles and modification dates.\n\nQuery processing interprets what users actually want when they type search terms. Natural language understanding helps search engines recognize that a search for running shoes likely seeks products rather than information about footwear that runs. Entity recognition identifies searches for people, places, organizations, and concepts. Query expansion adds synonyms and related terms to improve recall. Spell correction fixes typos before executing searches, with Google correcting approximately 10 percent of all queries.\n\nRanking algorithms combine hundreds of signals to determine which pages best answer each query. Beyond PageRank, Google considers factors including keyword presence in titles and headings, content freshness, mobile-friendliness, page loading speed, and geographic relevance. Machine learning models trained on vast datasets of user behavior have largely replaced hand-crafted ranking formulas. RankBrain, introduced in 2015, uses neural networks to interpret ambiguous queries and identify relevant results.\n\nUser behavior provides crucial feedback that search engines use to improve rankings. Click-through rates indicate which results users find promising. Time spent on pages after clicking suggests whether results satisfied the query. The pattern of returning to search results and clicking different links, called pogo-sticking, indicates initial results were unhelpful. Search engines analyze billions of such signals daily to refine their algorithms.\n\nKnowledge graphs represent information about entities and their relationships in structured databases. Google's Knowledge Graph, introduced in May 2012, contains billions of facts about people, places, things, and concepts. When you search for a famous person, the knowledge panel appearing beside results draws from this structured data. Wikidata, a collaborative knowledge base operated by the Wikimedia Foundation, contributes substantially to these systems.\n\nFeatured snippets and direct answers aim to satisfy queries without requiring users to click through to websites. Google extracts relevant passages from web pages and displays them prominently for questions. Voice assistants rely heavily on these direct answers since users cannot click links on audio-only devices. Publishers debate whether featured snippets help by driving traffic or harm by reducing it, with some opting out of snippet selection entirely.\n\nLocal search connects queries to nearby businesses and services. When someone searches for coffee shops or plumbers, the search engine incorporates their location to show relevant local options. Google My Business profiles let businesses provide information directly. Reviews aggregated from various sources help users choose between options. Local search generates substantial revenue through advertising, with businesses paying to appear prominently for commercial queries.\n\nSearch advertising transformed Google into one of the world's most valuable companies. Advertisers bid on keywords, paying only when users click their ads. Google's auction system considers both bid amounts and ad quality to determine which ads appear and in what order. Search advertising generated over 162 billion dollars in revenue for Google's parent company Alphabet in 2022. This business model creates incentives to maximize user engagement with search results.\n\nSpam and manipulation have plagued search engines since their earliest days. Unscrupulous website operators stuff pages with hidden keywords, create networks of artificial links, and employ countless other tactics to game rankings. Search engines engage in continuous arms races against such manipulation. Google's Penguin update in April 2012 penalized sites with unnatural link patterns. The company employs thousands of quality raters who evaluate search results according to detailed guidelines.\n\nPrivacy concerns surround the vast data search engines collect about user queries and behavior. Search histories reveal health concerns, financial situations, relationship problems, and countless other intimate details. Google retains search data linked to accounts by default, using it for personalization and advertising targeting. Alternatives like DuckDuckGo differentiate themselves by promising not to track users, though they sacrifice some personalization capabilities.\n\nCompetition in search has remained limited despite regulatory scrutiny worldwide. Google holds approximately 91 percent of global search market share according to StatCounter data from 2023. Bing, Microsoft's search engine, claims around 3 percent globally but performs better in the United States. Regional alternatives including Baidu in China and Yandex in Russia dominate their home markets. The European Union fined Google 2.42 billion euros in June 2017 for favoring its own shopping comparison service in search results.\n\nArtificial intelligence is transforming search through large language models that understand and generate natural language. ChatGPT's release in November 2022 sparked concerns that conversational AI could disrupt traditional search. Microsoft integrated GPT-4 into Bing in February 2023. Google responded with Bard and subsequently Gemini. These systems can synthesize information from multiple sources and engage in dialogue, potentially changing how people find information online.\n\nThe future of search extends beyond text queries to images, voice, and multimodal inputs. Google Lens allows searching using smartphone cameras, identifying objects, translating text, and solving math problems from images. Voice search through smart speakers and smartphones accounts for a growing share of queries. Search engines must adapt to new devices and interaction patterns while maintaining the speed and accuracy users expect.",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Wer hat den ersten Webcrawler namens World Wide Web Wanderer im Jahr 1993 erstellt?",
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
        "question": "Welche Faktoren berücksichtigen Suchmaschinen bei der Bewertung von Seiten? Wähle alle zutreffenden aus.",
        "options": [
          "PageRank-Linkanalyse",
          "Aktualität des Inhalts",
          "Seitenladegeschwindigkeit",
          "Nur Dateigröße"
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
        "question": "AltaVista verarbeitete in seiner Hochphase im Jahr 1997 80 Millionen Suchanfragen pro Tag.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Welchen Prozentsatz des globalen Suchmarktanteils hält Google laut Daten von 2023?",
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
        "question": "Wann wurde Googles Knowledge Graph eingeführt?",
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
        "question": "Wann hat Googles Penguin-Update Seiten mit unnatürlichen Linkmustern abgestraft?",
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
        "question": "Wie viel Umsatz generierte Suchmaschinenwerbung für Alphabet im Jahr 2022 (in Milliarden Dollar)?",
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
        "question": "Google korrigiert ungefähr 10 Prozent aller Suchanfragen auf Rechtschreibfehler.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Wann hat Microsoft GPT-4 in Bing integriert?",
        "options": [
          "November 2022",
          "Februar 2023",
          "Juni 2023",
          "Oktober 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Wie hoch war die Geldstrafe, die die Europäische Union Google im Juni 2017 auferlegte (in Milliarden Euro)?",
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
        "question": "Wann wurde RankBrain von Google eingeführt?",
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
        "question": "Wann wurde AltaVista gestartet?",
        "options": [
          "Dezember 1993",
          "Dezember 1995",
          "Dezember 1997",
          "Dezember 1999"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "technology-internet-p10",
    "topicId": "technology-internet",
    "title": "Autonomous Vehicles and the Future of Transportation",
    "difficulty": "advanced",
    "wordCount": 3000,
    "articleType": "practice",
    "orderIndex": 10,
    "content": "Autonomous vehicles promise to revolutionize transportation with self-driving technology that could reduce accidents, transform urban landscapes, and fundamentally alter how humanity moves people and goods across distances small and large. This ambitious vision has attracted hundreds of billions of dollars in investment from automakers, technology giants, and startups racing to solve the immense technical, regulatory, and social challenges involved. The journey toward truly autonomous vehicles reveals the current state of this transformative technology and the obstacles that remain before self-driving cars become commonplace.\n\nThe dream of self-driving vehicles predates the digital computer itself. Norman Bel Geddes presented the Futurama exhibit at the 1939 World's Fair in New York, depicting automated highways where cars would travel safely without human intervention by the 1960s. General Motors, which sponsored the exhibit, later partnered with RCA to develop the Firebird IV concept car in 1964, featuring electronic guidance systems that could follow wire embedded in roadways. These early visions required infrastructure changes rather than vehicle intelligence.\n\nModern autonomous vehicle development began with DARPA Grand Challenge competitions that catalyzed academic and industry research starting in 2004. The first challenge, held in the Mojave Desert, offered one million dollars to any vehicle that could complete a 150-mile course without human intervention. Every entrant failed, with the farthest vehicle traveling only 7.4 miles before becoming stuck. The 2005 challenge saw five vehicles complete the course, with Stanford University's Stanley winning in 6 hours and 53 minutes.\n\nThe Society of Automotive Engineers defines six levels of driving automation that have become industry standard. Level 0 means no automation, with humans controlling all driving tasks. Level 1 includes basic assistance like adaptive cruise control. Level 2 combines multiple assistance features but requires constant human supervision. Level 3 allows the vehicle to handle all driving in limited conditions while humans remain ready to intervene. Level 4 achieves full automation within defined operational domains. Level 5 means complete automation under all conditions, matching or exceeding human capability everywhere.\n\nSensor systems provide autonomous vehicles with the perception capabilities necessary for safe navigation. Cameras capture visual information about lanes, signs, traffic lights, and other road users. Radar measures the speed and distance of nearby objects through radio waves that function regardless of lighting or weather. Lidar uses laser pulses to create detailed three-dimensional maps of the environment, with some systems generating over two million data points per second. Ultrasonic sensors detect close-range obstacles during parking maneuvers.\n\nWaymo, the autonomous vehicle subsidiary of Alphabet, emerged from the Google self-driving car project that began in 2009. Sebastian Thrun, who led Stanford's winning DARPA team, directed the initial research. The project accumulated millions of test miles across multiple states before Waymo launched commercial robotaxi service in Phoenix, Arizona, in December 2018. By October 2023, Waymo vehicles had driven over 7 million miles on public roads without safety drivers, primarily in Phoenix and San Francisco.\n\nTesla has pursued a different approach to autonomy through its Autopilot and Full Self-Driving systems. Rather than expensive lidar, Tesla relies on cameras and computer vision trained on data from millions of customer vehicles. CEO Elon Musk repeatedly predicted imminent full autonomy, claiming in 2016 that a Tesla would drive itself from Los Angeles to New York by 2017. This prediction and many subsequent ones have not materialized, though Tesla vehicles offer increasingly capable driver assistance features.\n\nCruise, majority-owned by General Motors, operated robotaxi services in San Francisco until the California Department of Motor Vehicles revoked its permits in October 2023 following an incident where a vehicle struck and dragged a pedestrian. The company had expanded aggressively, operating hundreds of vehicles across multiple cities. The permit revocation highlighted regulatory challenges facing the industry and the difficulty of ensuring safety at scale.\n\nChinese companies have emerged as major players in autonomous vehicle development. Baidu's Apollo platform began development in 2017 and has accumulated over 100 million kilometers of road testing. Pony.ai, founded in 2016, operates robotaxi services in multiple Chinese cities and California. WeRide has partnered with Nissan and established operations in the Middle East. Chinese cities including Wuhan, Guangzhou, and Shenzhen have permitted commercial robotaxi operations covering significant urban areas.\n\nThe artificial intelligence systems driving autonomous vehicles must handle extraordinary complexity. Computer vision algorithms identify and classify thousands of object types from pedestrians and cyclists to construction zones and emergency vehicles. Prediction models anticipate how other road users will behave in the next several seconds. Planning algorithms choose trajectories that reach destinations safely and efficiently. All these computations must execute in milliseconds while accounting for uncertainty and rare scenarios.\n\nEdge cases present particular challenges for autonomous systems. A plastic bag blowing across a highway and a child running into the street may appear similar to sensors but require completely different responses. Construction workers directing traffic with hand gestures override normal traffic rules. Emergency vehicles approaching from obscured angles demand immediate action. Training data cannot possibly cover every scenario, requiring vehicles to generalize appropriately from similar experiences.\n\nSafety validation poses fundamental questions about how to demonstrate autonomous vehicles are ready for deployment. Human drivers average approximately one fatal crash per 100 million miles traveled in the United States. Proving statistically that an autonomous system meets or exceeds this benchmark would require billions of test miles, an impractical standard. Companies instead employ simulation, closed-course testing, and graduated deployment while monitoring real-world performance continuously.\n\nRegulatory frameworks for autonomous vehicles vary dramatically across jurisdictions. California requires companies to report disengagements when human safety drivers take control. Arizona adopted a permissive approach that attracted testing activity. Germany passed legislation in 2021 allowing Level 4 vehicles on public roads under specific conditions. China has designated certain cities as testing zones with gradually expanding operational domains. This patchwork of regulations complicates international deployment strategies.\n\nThe potential benefits of autonomous vehicles extend far beyond convenience. Vehicle crashes kill approximately 1.35 million people worldwide annually, with human error contributing to over 90 percent of accidents. Autonomous systems do not get distracted, fatigued, or impaired. They could dramatically reduce this toll if their safety performance exceeds human drivers. Transportation would become accessible to elderly, disabled, and young populations currently unable to drive themselves.\n\nEconomic implications of autonomous transportation could reshape entire industries. Professional drivers including truckers, taxi operators, and delivery workers face potential displacement. Ride-hailing companies like Uber and Lyft invest heavily in autonomy hoping to eliminate their largest cost. Insurance models must adapt when human drivers no longer control vehicles. Urban planners envision cities with fewer parking lots and narrower roads as shared autonomous vehicles reduce total vehicle counts.\n\nTrucking applications may achieve commercial viability before passenger robotaxis due to more predictable highway environments. Aurora, co-founded by former leaders from Google, Tesla, and Uber autonomous programs, focuses primarily on freight. TuSimple conducted fully autonomous highway runs between Phoenix and Dallas before financial difficulties forced a strategic restructuring in 2023. Embark, Kodiak, and numerous other companies pursue similar long-haul trucking applications.\n\nThe timeline for widespread autonomous vehicle adoption remains highly uncertain despite decades of development and massive investment. Optimistic projections from the mid-2010s predicted ubiquitous robotaxis by the early 2020s. Reality has proven far more challenging than anticipated. Industry experts now generally expect gradual deployment over decades rather than sudden transformation. The technology will likely improve incrementally, expanding from limited operational domains toward broader capabilities over many years.",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Wann fand die erste DARPA Grand Challenge statt?",
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
        "question": "Welche Sensortypen verwenden autonome Fahrzeuge? Wählen Sie alle zutreffenden aus.",
        "options": [
          "Kameras",
          "Radar",
          "Lidar",
          "Röntgensensoren"
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
        "question": "Das Fahrzeug der Stanford University namens Stanley gewann die DARPA Grand Challenge 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Wie viele Meilen hatten Waymo-Fahrzeuge ohne Sicherheitsfahrer bis Oktober 2023 zurückgelegt (in Millionen)?",
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
        "question": "Wann startete Waymo den kommerziellen Robotaxi-Service in Phoenix?",
        "options": [
          "Dezember 2016",
          "Dezember 2018",
          "Dezember 2020",
          "Dezember 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Wie viele Stufen der Fahrautomatisierung definiert die Society of Automotive Engineers?",
        "options": [
          "Vier",
          "Fünf",
          "Sechs",
          "Sieben"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Wie viele Menschen sterben jährlich weltweit bei Verkehrsunfällen (in Millionen)?",
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
        "question": "Menschliches Versagen trägt zu über 90 Prozent der Verkehrsunfälle bei.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Wann verabschiedete Deutschland Gesetze, die Level-4-Fahrzeuge auf öffentlichen Straßen zulassen?",
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
        "question": "Wie viele Meilen legte das am weitesten gefahrene Fahrzeug bei der DARPA Grand Challenge 2004 zurück?",
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
        "question": "Wann begann die Entwicklung von Baidus autonomer Fahrplattform Apollo?",
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
        "question": "Wann fand die Futurama-Ausstellung auf der Weltausstellung statt?",
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
        "question": "Wie viele Datenpunkte pro Sekunde können einige Lidar-Systeme generieren (in Millionen)?",
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
        "question": "Wann entzog das kalifornische DMV Cruise die Genehmigungen für autonome Fahrzeuge?",
        "options": [
          "Oktober 2022",
          "Oktober 2023",
          "Januar 2023",
          "Juni 2023"
        ],
        "correctIndex": 1
      }
    ]
  }
];
