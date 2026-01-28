import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "İnternet Nasıl Çalışır?",
    "content": "İnternet, Dünya üzerindeki her kıtaya yayılan karmaşık bir ağlar ağı aracılığıyla dünya çapında milyarlarca cihazı birbirine bağlar. Bir web sitesini her ziyaret ettiğinizde, bir e-posta gönderdiğinizde veya bir video izlediğinizde, veriler bu devasa dijital altyapı üzerinden sadece milisaniyeler içinde hareket eder. Bu olağanüstü sistemi anlamak, modern iletişimi dönüştüren teknolojiyi takdir etmemize yardımcı olur.\n\nTarayıcınıza bir web sitesi adresi yazdığınızda, karmaşık bir süreç anında başlar. Bilgisayarınız önce bir Alan Adı Sistemi sunucusuyla iletişim kurar ve bu sunucu, insanların okuyabileceği adresi bilgisayarların anladığı sayısal bir IP adresine çevirir. Bu, bir telefon rehberinde bir telefon numarasını aramaya benzer; isimleri gerçek iletişim bilgileriyle eşleştirir.\n\nİsteğiniz daha sonra İnternet Servis Sağlayıcınız aracılığıyla, internetin ana altyapısını oluşturan omurga ağlarına iletilir. Bu yüksek kapasiteli fiber optik kablolar kıtaları aşar ve okyanusları 6.000 metreyi aşan derinliklerde geçer. Muazzam miktarda veriyi neredeyse ışık hızında taşırlar ve günde 500 trilyondan fazla bayt bilgiyi işlerler.\n\nVeriler internet üzerinden tek bir birim olarak hareket etmez. Bunun yerine, her biri bilgilerin bir parçasını ve adresleme ayrıntılarını içeren küçük paketlere ayrılır. Bu paketler, tıkanıklık veya arızaların etrafında yollar bularak hedeflerine ulaşmak için farklı yollar izleyebilir. Hedefte, orijinal mesajı yeniden oluşturmak için doğru sırada yeniden birleşirler.\n\nYönlendiriciler, internetin trafik kontrolörleri olarak hizmet eder ve her an kritik kararlar verirler. Bu özel cihazlar, her paketin hedefini inceler ve en iyi yolu belirler. Bu yönlendirme kararlarını saniyede milyarlarca kez verirler ve binlerce farklı kuruluşa ait ağlar arasında verilerin sorunsuz bir şekilde akmasını sağlarlar.\n\nİnternet, 1969'da, potansiyel saldırılar sırasında iletişim kesintilerinden kurtulmak için tasarlanmış bir Amerika Birleşik Devletleri askeri araştırma projesi olan ARPANET olarak başladı. Vint Cerf ve Bob Kahn, 1970'lerde TCP/IP protokollerini geliştirerek, bugün hala internetin temelini oluşturan teknik temeli oluşturdular. Merkezi olmayan tasarımları, tek bir arıza noktasının tüm ağı çökertmesini engeller.\n\nTim Berners-Lee, 1989'da İsviçre'deki CERN'de çalışırken World Wide Web'i icat etti. İnterneti herkes için erişilebilir kılan köprüler ve web tarayıcıları sistemini yarattı. Web, Ağustos 1991'de halka açık hale geldi ve on yıl içinde internet, bir araştırma aracından yüz milyonlarca insan tarafından kullanılan küresel bir iletişim platformuna dönüştü.",
    "wordCount": 332,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "World Wide Web'i kim icat etti?",
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
        "question": "TCP/IP protokollerini kim geliştirdi? Lütfen geçerli olanların tümünü seçin.",
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
        "question": "Veri, internet üzerinde paketlere bölünmek yerine tek ve bütün dosyalar halinde mi hareket eder?",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "İnternetin öncüsü olan ARPANET hangi yılda başladı?",
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
    "title": "Yapay Zekanın Yükselişi",
    "content": "Yapay zeka, bilim kurgu fantezisinden modern yaşamın neredeyse her alanını etkileyen pratik bir teknolojiye dönüştü. Akıllı telefon asistanlarından tıbbi teşhis sistemlerine kadar yapay zeka artık bir zamanlar insan zekası gerektiren görevleri yerine getiriyor. Bu dönüşüm, bilişimin icadından bu yana yaşanan en önemli teknolojik değişimlerden birini temsil ediyor.\n\nYapay zeka kavramı, 1956 yazında New Hampshire'daki Dartmouth Koleji'nde düzenlenen bir çalıştayda ortaya çıktı. Bilgisayar bilimcisi John McCarthy terimi ortaya attı ve makinelerin insan zekasını simüle edebileceğine inanan araştırmacıları bir araya getirdi. Bu öncüler, tek bir nesil içinde düşünen makineler yaratmayı hayal ettiler, ancak ilerleme iyimser tahminlerinden çok daha yavaş gerçekleşti.\n\nErken dönem yapay zeka araştırmaları, sorunları nasıl çözeceğine dair açık kurallarla bilgisayarları programlayan sembolik akıl yürütmeye odaklandı. Araştırmacılar, insan bilgisini karar ağaçlarına ve mantıksal kurallara kodlayan uzman sistemler yarattılar. Bu sistemler, satranç ve tıbbi teşhis gibi dar alanlarda etkileyici sonuçlar elde etti, ancak sağduyu gerektiren veya belirsiz bilgileri ele alan görevlerde zorlandı.\n\nMakine öğrenimi devrimi, 1990'larda yapay zekayı dönüştürmeye başladı ve 2010'dan sonra önemli ölçüde hızlandı. Araştırmacılar, açık kurallar programlamak yerine, algoritmaları büyük veri kümelerindeki kalıpları keşfetmeleri için eğittiler. Biyolojik beyin yapılarından esinlenerek geliştirilen sinir ağları, görüntüleri tanımada, konuşmayı anlamada ve insan benzeri metinler üretmede özellikle güçlü olduğunu kanıtladı.\n\nDerin öğrenme, 2012'deki bir atılımdan sonra yapay zekaya hakim bir yaklaşım olarak ortaya çıktı. Geoffrey Hinton ve Toronto Üniversitesi'ndeki öğrencileri, birçok katmana sahip derin sinir ağlarının, görüntü tanıma görevlerinde önceki yöntemlerden önemli ölçüde daha iyi performans gösterebileceğini gösterdi. Sistemleri, önceki en iyi yaklaşımlara kıyasla hata oranlarını yüzde 40'tan fazla azalttı.\n\nModern yapay zeka sistemlerini eğitmek, muazzam hesaplama kaynakları ve büyük miktarda veri gerektirir. Büyük dil modelleri yüz milyarlarca parametre içerebilir ve aylarca çalışan binlerce özel işlemci gerektirebilir. Google, Microsoft ve OpenAI gibi teknoloji şirketleri, giderek daha yetenekli olan bu sistemleri eğitmek için gereken altyapıyı oluşturmak için milyarlarca dolar yatırım yaptı.\n\nYapay zeka sistemlerinin yetenekleri son yıllarda dikkat çekici şekilde arttı. Bilgisayarlı görme sistemleri artık görüntülerdeki nesneleri, yüzleri ve etkinlikleri insanüstü bir doğrulukla tanımlayabiliyor. Doğal dil işleme, yapay zekanın nüanslı konuşmalara katılabileceği, tutarlı makaleler yazabileceği ve düzinelerce dil arasında çeviri yapabileceği noktaya ulaştı. Yapay zeka sistemleri artık müzik besteleyebilir, sanat eserleri oluşturabilir ve bilgisayar kodu yazabilir.\n\nYapay zeka, insanların bilinçli farkındalık olmadan günlük olarak kullandığı birçok hizmete güç sağlıyor. Öneri algoritmaları, öğrenilen tercihlere göre YouTube'da videolar ve Amazon'da ürünler önerir. E-posta filtreleri, önemli mesajları spam'den ayırmak için makine öğrenimini kullanır. Navigasyon uygulamaları trafik düzenlerini tahmin eder ve en uygun rotaları önerir. Siri ve Alexa gibi sesli asistanlar, sözlü komutları anlamak için yapay zekayı kullanır.\n\nSağlık hizmetleri, yapay zeka için en umut verici uygulamalardan birini temsil ediyor. Yapay zeka sistemleri, bazı durumlarda insan radyologlardan daha erken kanseri tespit etmek için tıbbi görüntüleri analiz edebilir. İlaç keşfi, umut verici bileşikleri belirlemek ve etkilerini tahmin etmek için makine öğrenimini kullanır. Yapay zeka asistanları, doktorların hızla genişleyen tıbbi literatürle güncel kalmasına yardımcı olur ve kanıta dayalı tedavi seçenekleri önerir.\n\nYapay zeka güvenliği ve toplumsal etki hakkındaki endişeler, yetenekleriyle birlikte arttı. Araştırmacılar, hedeflere beklenmedik veya zararlı şekillerde ulaşan sistemler hakkında endişeleniyor. Etik uzmanları, insan önyargılarını yansıtan geçmiş veriler üzerinde eğitilmiş yapay zeka sistemlerindeki önyargı hakkında sorular soruyor. Ekonomistler, yapay zeka'nın daha önce insan işçiler tarafından yapılan görevleri devralmasıyla otomasyonun istihdamı nasıl etkileyeceğini tartışıyor.\n\nDünya çapındaki hükümetler, yapay zeka için düzenlemeler geliştirmeye başladı. Avrupa Birliği, sistemleri risk düzeyine göre sınıflandıran ve yüksek riskli uygulamalara gereksinimler getiren 2024'te kapsamlı yapay zeka mevzuatı kabul etti. Çin, öneri algoritmalarını ve üretken yapay zekayı düzenleyen kurallar uyguladı. Amerika Birleşik Devletleri, daha kapsamlı mevzuatı tartışırken yapay zeka güvenliğini ele alan yürütme emirleri yayınladı.\n\nYapay zekanın geleceği belirsizliğini koruyor, ancak sürekli hızlı ilerleme getirmesi muhtemel görünüyor. Araştırmacılar, tüm bilişsel görevlerde insan yeteneğine eşit olabilecek yapay genel zeka arayışını sürdürüyor, ancak bunun ne zaman gerçekleşebileceğine dair tahminler yıllardan hiç olmayacağına kadar değişiyor. Kesin olan şey, yapay zekanın endüstrileri yeniden şekillendirmeye, yeni olasılıklar yaratmaya ve insan ve makine zekası arasındaki ilişki hakkında derin sorular sormaya devam edeceği.\n\nYapay zekayı anlamak, modern dünyada gezinmek için temel bir bilgi haline geldi. Kullanıcılar, çalışanlar, vatandaşlar veya politika yapıcılar olarak, insanların yapay zekanın ne yapabileceğini ve ne yapamayacağını giderek daha fazla anlaması gerekiyor. Bu teknoloji gelişmeye devam edecek ve geliştirilmesine bilinçli katılım, yapay zekanın genel olarak insanlığa fayda sağlamasına yardımcı olacaktır.",
    "wordCount": 689,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Where and when did the term \"artificial intelligence\" originate?",
        "options": [
          "MIT in 1960",
          "Dartmouth College in 1956",
          "Stanford University in 1965",
          "Bell Labs in 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Which AI applications in healthcare are mentioned in the article? Select all that apply.",
        "options": [
          "Analyzing medical images to detect cancer",
          "Performing robotic surgery",
          "Drug discovery",
          "Suggesting treatment options"
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
        "question": "Early AI research focused primarily on machine learning rather than symbolic reasoning.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "In what year did Geoffrey Hinton and his students demonstrate a breakthrough in deep learning?",
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
        "question": "Who coined the term \"artificial intelligence\"?",
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
        "question": "By how much did deep neural networks reduce error rates compared to previous methods in 2012?",
        "options": [
          "More than 20 percent",
          "More than 30 percent",
          "More than 40 percent",
          "More than 50 percent"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "In what year did the European Union pass comprehensive AI legislation?",
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
    "title": "Siber Güvenlik: Dijital Dünyayı Korumak",
    "content": "Siber güvenlik, her gün milyarlarca insanı tehdit eden dijital saldırılardan bilgisayarları, ağları ve verileri korur. Hacker'lar, kişisel banka hesaplarından elektrik şebekeleri ve hastaneler gibi kritik altyapılara kadar her şeyi hedef alır. Bu alan, niş bir uzmanlıktan modern teknolojinin en önemli disiplinlerinden birine dönüşmüştür.\n\nİlk büyük bilgisayar virüsü olan Brain, Ocak 1986'da Pakistan'da ortaya çıktı. Basit ve Amjad Farooq Alvi adlı iki kardeş, virüsü tıbbi yazılımlarının yasa dışı kopyalarını izlemek için yarattılar. Virüs, enfekte olmuş disketler aracılığıyla yavaşça yayıldı ve dünya çapındaki bilgisayarlara ulaşması aylar sürdü. Bugün, kötü amaçlı yazılımlar internette saniyeler içinde yayılıyor ve güvenlik uzmanları yanıt vermeden milyonlarca cihazı enfekte ediyor.\n\nKimlik avı saldırıları, suçluların hassas bilgileri çalmak için kullandığı en yaygın yöntem olmaya devam ediyor. Bu aldatıcı e-postalar, bankalar, işverenler veya popüler web siteleri gibi güvenilir kaynaklardan geliyormuş gibi davranır. Alıcıları kötü amaçlı bağlantıları tıklamaya veya sahte web sitelerine şifre girmeye kandırırlar. FBI, yalnızca 2022'de kimlik avı saldırılarının 10 milyar doların üzerinde kayba neden olduğunu bildirdi.\n\nFidye yazılımları, modern siber saldırıların en yıkıcı türlerinden birini temsil eder. Bu kötü amaçlı yazılım, bir kurbanın dosyalarını şifreler ve şifre çözme anahtarı için ödeme talep eder. Mayıs 2017'deki WannaCry saldırısı, sadece dört gün içinde 150 ülkede 200.000'den fazla bilgisayarı enfekte etti. Birleşik Krallık'taki hastaneler binlerce tıbbi randevuyu iptal etmek ve ambulansları etkilenmeyen tesislere yönlendirmek zorunda kaldı.\n\nGüçlü şifreler, kişisel siber güvenliğin temelini oluşturur. Güvenlik uzmanları, büyük harfler, küçük harfler, sayılar ve sembolleri birleştiren en az 12 karakter kullanmanızı önerir. Her hesabın, tek bir ihlalin birden fazla hizmeti tehlikeye atmasını önlemek için benzersiz bir şifresi olmalıdır. Şifre yöneticileri, kullanıcıların karmaşık şifreleri ezberlemeden oluşturmasına ve depolamasına yardımcı olur.\n\nİki faktörlü kimlik doğrulama, şifrelerin ötesinde önemli bir ikinci güvenlik katmanı ekler. Bu sistem, bir şifre gibi bildiğiniz bir şeyin yanı sıra, doğrulama kodları alan bir telefon gibi sahip olduğunuz bir şeyi gerektirir. Hacker'lar şifrenizi çalsa bile, ikinci faktör olmadan hesabınıza erişemezler. Google, iki faktörlü kimlik doğrulamanın hesaplara yönelik otomatik saldırıların %99,9'unu engellediğini bildirdi.\n\nŞifreleme, verileri yalnızca yetkili tarafların şifresini çözebileceği okunamaz koda dönüştürür. Tarayıcınızın adres çubuğunda bir kilit simgesi gördüğünüzde, şifreleme o web sitesine olan bağlantınızı korur. Mesajlaşma uygulamalarındaki uçtan uca şifreleme, yalnızca sizin ve alıcınızın mesajlarınızı okuyabilmesini sağlar. Hizmeti sağlayan şirket bile şifrelenmiş içeriğe erişemez.\n\nHükümetler ve şirketler, siber güvenlik savunmasına milyarlarca yatırım yapıyor. ABD Siber Güvenlik ve Altyapı Güvenliği Ajansı (CISA), federal ağları korur ve özel şirketlerin saldırılara karşı savunma yapmasına yardımcı olur. Büyük teknoloji şirketleri, güvenlik açıkları arayan ve koruyucu önlemler geliştiren binlerce güvenlik araştırmacısı istihdam ediyor.\n\nEtik hacker'lar, suçlular yapmadan önce zayıflıkları bularak güvenliği iyileştirmede hayati bir rol oynarlar. Şirketler, ciddi güvenlik açığı raporları için yüzlerce ila milyonlarca dolar arasında ödüller öder. Apple, 2016'da hata ödül programını başlattı ve artık en kritik iPhone güvenlik kusurları için 2 milyon dolara kadar teklif ediyor. Bu programlar, potansiyel saldırganları dijital altyapıyı güçlendiren savunmacılara dönüştürür.\n\nSiber güvenliğin geleceği, gelişen teknolojilerden kaynaklanan yeni zorluklarla karşı karşıyadır. Kuantum bilgisayarlar, bankacılığı, iletişimi ve devlet sırlarını şu anda koruyan şifrelemeyi sonunda kırabilir. Güvenlik araştırmacıları, bu tehdide hazırlanmak için şimdiden kuantum dirençli algoritmalar geliştiriyor. Yapay zeka, devam eden bir teknolojik silahlanma yarışında hem yeni saldırı yöntemleri hem de yeni savunma yetenekleri yaratıyor.",
    "wordCount": 513,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "İlk büyük bilgisayar virüsünün adı neydi?",
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
        "question": "Google'a göre iki faktörlü kimlik doğrulama, otomatik saldırıların yüzde kaçını engeller?",
        "options": [
          "%95",
          "%99",
          "%99.9",
          "%100"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p02-q3",
        "type": "multiple_select",
        "question": "Güçlü parola güvenliği için hangi uygulamalar önerilir? (Birden fazla seçenek işaretleyebilirsiniz.)",
        "options": [
          "En az 12 karakter kullanmak",
          "Tüm hesaplar için aynı parolayı kullanmak",
          "Büyük harf, küçük harf, sayı ve sembolleri birleştirmek",
          "Bir parola yöneticisi kullanmak"
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
        "question": "WannaCry fidye yazılımı saldırısı 150'den fazla ülkedeki bilgisayarlara bulaştı.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "2022'de kimlik avı saldırıları sonucunda ne kadar para kaybı yaşandı (milyar dolar cinsinden)?",
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
    "title": "Nesnelerin İnterneti: Bağlantılı Dünya",
    "content": "Nesnelerin İnterneti (IoT), milyarlarca cihazı birbirine bağlayarak, günlük hayatın dokusuna dijital zeka işlemiştir. Bu cihazlar, insan müdahalesi olmadan algılayabilir, iletişim kurabilir ve harekete geçebilir. Tercihlerinizi öğrenen akıllı termostatlardan, kıtalar arası ekipmanı izleyen endüstriyel sensörlere kadar, bu teknolojik devrim interneti bilgisayarların ve telefonların ötesine, fiziksel dünyaya taşımaktadır. Bu birbirine bağlı ekosistemi anlamak, önümüzdeki on yıllara şekil verecek hem dikkat çekici olasılıkları hem de önemli zorlukları ortaya koymaktadır.\n\nProcter and Gamble'da çalışan bir İngiliz teknoloji öncüsü olan Kevin Ashton, 1999 yılında tedarik zincirleri boyunca ürünleri takip etmek için radyo frekansı tanımlama sistemleri geliştirirken Nesnelerin İnterneti terimini ortaya atmıştır. Bilgisayarların, verileri girmek için insanlara güvenmek yerine, fiziksel dünya hakkında bağımsız olarak bilgi toplamasını öngörmüştür. Sensörlerin ucuzlaması, kablosuz bağlantının iyileşmesi ve bulut bilişimin devasa veri akışlarını işlemek için altyapı sağlamasıyla bu vizyonun gerçekleşmesi onlarca yıl sürmüştür.\n\nTicari IoT'nin 2010 civarında benimsenmesinden bu yana, bağlı cihazların sayısı katlanarak artmıştır. Statista'daki analistler, 2020'de dünya çapında 15,1 milyar IoT cihazı olduğunu ve bu sayının 2030'a kadar 29 milyara ulaşmasının beklendiğini tahmin etmektedir. Her cihaz sürekli olarak veri üretmekte ve geleneksel internet trafiğini gölgede bırakan bilgi akışları yaratmaktadır. Tek bir bağlantılı fabrika, binlerce izleme noktasından günlük olarak terabaytlarca sensör verisi üretebilir.\n\nAkıllı ev teknolojisi, IoT prensiplerinin en görünür tüketici uygulamasını temsil etmektedir. Eski Apple mühendisi Tony Fadell tarafından Ekim 2011'de tanıtılan Nest Learning Thermostat, ana akım akıllı ev benimsenmesine öncülük etmiştir. Cihaz, sakinlerin ne zaman evde olduğunu ve sıcaklık tercihlerini gözlemlemiş, ardından enerji tasarrufu için ısıtma ve soğutmayı otomatik olarak ayarlamıştır. Google, Ocak 2014'te Nest Labs'ı 3,2 milyar dolara satın alarak büyük teknoloji şirketlerinin bu pazara olan bağlılığını göstermiştir.\n\nSesli asistanlar, akıllı ev ekosistemleri için merkezi bir merkez haline gelmiştir. Amazon, Kasım 2014'te Alexa özellikli Echo hoparlörü, ardından 2016'da Google Home ve 2018'de Apple'ın HomePod'unu piyasaya sürmüştür. Bu cihazlar, ışıkları, kilitleri, termostatları ve eğlence sistemlerini kontrol etmek için sesli komutlara yanıt verir. 2024 yılına gelindiğinde, dünya çapında 200 milyondan fazla hane halkı akıllı hoparlörlere sahip olmuş ve bunları zamanlayıcı ayarlamaktan market siparişi vermeye kadar çeşitli görevler için kullanmıştır.\n\nGiyilebilir cihazlar, sağlık ölçümlerini giderek artan bir hassasiyet ve doğrulukla takip etmektedir. Nisan 2015'te piyasaya sürülen Apple Watch, bir moda aksesuarından düzensiz kalp ritimlerini ve düşmeleri tespit edebilen tıbbi bir cihaza dönüşmüştür. Kasım 2019'da New England Journal of Medicine'de yayınlanan bir araştırmada, saatin ciddi bir kalp rahatsızlığı olan atriyal fibrilasyonu yüzde 84 doğrulukla tespit ettiği bulunmuştur. Sürekli glikoz monitörleri, diyabetlilerin parmaklarını delmeden kan şekerini takip etmelerini sağlayarak, verileri akıllı telefonlara aktarır ve kullanıcıları tehlikeli seviyelere karşı uyarır.\n\nEndüstriyel IoT, bazen Endüstri 4.0 olarak da adlandırılır, benzeri görülmemiş görünürlük ve kontrol ile üretimi dönüştürmektedir. Makinelere gömülü sensörler, arızalar meydana gelmeden önce yaklaşan arızaları gösteren titreşimleri, sıcaklıkları ve enerji tüketimini tespit eder. General Electric, Predix platformu aracılığıyla tahmini bakıma öncülük ederek müşterilerine önlenen arıza sürelerinde milyarlarca dolar tasarruf sağladığını iddia etmektedir. Tek bir jet motoru, transatlantik bir uçuş sırasında 10 terabayt veri üretir ve bu veriler performansı optimize etmek ve bakımı planlamak için sürekli olarak analiz edilir.\n\nTarım, çevresel etkiyi azaltırken verimi artırmak için IoT'yi benimsemektedir. Toprak nem sensörleri, sulamayı yalnızca bitkilerin suya ihtiyacı olduğunda tetikleyerek, planlı sulamaya kıyasla tüketimi yüzde 30'a kadar azaltır. Çok spektralli kameralarla donatılmış dronlar, geniş tarlalarda ürün stresini, zararlı böcek istilalarını ve besin eksikliklerini tespit eder. 185 yıllık tarım ekipmanı şirketi John Deere, artık milyonlarca bağlantılı makineden veri topluyor ve çiftçilere traktörlerin yanı sıra analitik hizmetleri satıyor.\n\nAkıllı şehirler, kentsel sistemleri daha verimli yönetmek için IoT altyapısı konuşlandırmaktadır. Barselona, 2012'den itibaren en kapsamlı akıllı şehir programlarından birini uygulamaya koyarak, park yeri mevcudiyetini, çöp kutusu seviyelerini, hava kalitesini ve sulama ihtiyaçlarını izlemek için şehrin her yerine sensörler yerleştirmiştir. Şehir, sakinler için hizmetleri iyileştirirken yıllık 75 milyon dolar tasarruf sağladığını iddia etmektedir. Singapur, Kopenhag ve Seul, trafik akışını, enerji tüketimini ve acil durum müdahalesini optimize etmek için bağlantılı sensörler kullanarak benzer girişimlerde bulunmuştur.\n\nSağlık hizmetleri uygulamaları, giyilebilir cihazların çok ötesine geçerek uzaktan hasta takibine ve klinik ortamlara kadar uzanmaktadır. Ameliyattan iyileşen veya kronik rahatsızlıkları yöneten hastalar, bakım ekiplerini endişe verici değişikliklere karşı uyaran bağlantılı cihazlarla evde izlenebilir. Hastaneler, kritik ekipmanın yerini ve durumunu gerçek zamanlı olarak takip eder. Klinik denemeler, katılımcıların sağlığı hakkında ziyaretler arasında daha doğru veri toplamak için IoT cihazlarını kullanır. COVID-19 salgını, daha önce yavaş kabul gören uzaktan izleme teknolojilerinin benimsenmesini hızlandırmıştır.\n\nIoT cihazlarını çevreleyen güvenlik endişeleri rahatsız edici derecede geçerli olduğunu kanıtlamıştır. Birçok üretici, sağlam güvenlik yerine özelliklere ve düşük fiyatlara öncelik vererek, varsayılan parolalar ve yamalanmamış güvenlik açıklarıyla cihazları sevk etmektedir. Ekim 2016'daki Mirai botnet saldırısı, Twitter, Netflix ve PayPal dahil olmak üzere büyük web sitelerini kesintiye uğratan dağıtılmış hizmet reddi saldırıları başlatmak için yüzbinlerce güvensiz web kamerasını ve DVR'yi ele geçirmiştir. Araştırmacılar, bebek monitörlerinde, arabalarda, tıbbi cihazlarda ve endüstriyel sistemlerde düzenli olarak endişe verici güvenlik açıkları göstermektedir.\n\nYaygın algılamanın gizlilik etkileri, gözetim ve veri sahipliği hakkında derin soruları gündeme getirmektedir. Sesli asistanlar evlerdeki konuşmaları kaydeder. Fitness takip cihazları, sağlık ve günlük rutinler hakkında samimi ayrıntıları ortaya çıkarır. Bağlantılı arabalar, sürücülerin nereye gittiğini ve nasıl araba kullandığını ortaya çıkaran konum verilerini iletir. Şirketler bu bilgileri hizmet geliştirme ve hedeflenmiş reklamcılık için toplarken, hükümetler kolluk kuvvetleri ve ulusal güvenlik amaçları için giderek daha fazla erişim talep etmektedir.\n\nBirlikte çalışabilirlik zorlukları, IoT ortamını uyumsuz ekosistemlere bölmektedir. Farklı üreticilerin cihazları genellikle doğrudan iletişim kuramaz, bu da tüketicilerin platform seçmesini gerektirir ve işlevselliği sınırlar. Apple, Google, Amazon ve Samsung'un da dahil olduğu bir konsorsiyum tarafından Kasım 2022'de başlatılan Matter protokolü, akıllı ev cihazları için evrensel bir standart oluşturmayı amaçlamaktadır. Bu girişim, sektörün parçalanmanın benimsenmeyi ve yeniliği engellediğinin farkına vardığının bir göstergesidir.\n\nUç bilişim, tüm IoT verilerini uzak bulut sunucularına göndermenin gecikme süresi ve bant genişliği sınırlamalarını ele almaktadır. Bilgilerin yerel olarak veya cihazlara yakın bir yerde işlenmesi, otonom araçlar ve endüstriyel robotik gibi uygulamalar için gerçek zamanlı yanıtlar sağlar. Kendi kendine giden bir araba, fren yapmaya karar vermeden önce verilerin bir bulut sunucusuna gidip gelmesini bekleyemez. Uç mimarileri, zekayı merkezi veri merkezlerinde yoğunlaştırmak yerine ağlar boyunca dağıtır.\n\nEnerji kısıtlamaları, IoT cihazı tasarımını ve dağıtımını şekillendirmektedir. Pille çalışan sensörler, erişilemeyen veya tehlikeli olabilecek konumlarda değiştirilmeden yıllarca çalışmalıdır. LoRaWAN ve Sigfox gibi düşük güçlü geniş alan ağı teknolojileri, cihazların minimum enerji tüketerek kilometrelerce iletişim kurmasını sağlar. Güneş, termal veya kinetik kaynaklardan enerji hasadı, bazı cihazların piller olmadan süresiz olarak çalışmasına olanak tanır.\n\nMilyarlarca bağlantılı cihazın çevresel ayak izi, IoT genişledikçe dikkat gerektirmektedir. Bu ürünlerin üretimi kaynak ve enerji tüketir. Çoğu cihaz, elektronik bileşenlerinin geri dönüşümü için hükümlerden yoksundur. Sürekli ağ bağlantısı, hem cihazlardan hem de altyapıdan enerji gerektirir. Bununla birlikte, enerji yönetimi, tarım ve ulaşım alanlarındaki IoT uygulamaları, düşünceli bir şekilde konuşlandırıldığında genel çevresel etkiyi azaltabilir.\n\nIoT'nin geleceği, ihtiyaçları tahmin eden ve değişen koşullara otomatik olarak yanıt veren ortam zekasına işaret etmektedir. Dijital ikizler, simülasyon ve optimizasyon için fiziksel sistemlerin sanal kopyalarını oluşturur. Sensör verilerine uygulanan yapay zeka, açık programlamanın başarabileceğinin ötesinde tahminler ve otomasyonlar sağlar. Bağlantılı zeka içinde yaşadığımız çevreye yayıldıkça fiziksel ve dijital dünyalar arasındaki sınır bulanıklaşmaya devam etmektedir.",
    "wordCount": 1131,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Who coined the term \"Internet of Things\" in 1999?",
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
        "question": "Which companies released major voice assistant devices? Select all that apply.",
        "options": [
          "Amazon with Echo",
          "Google with Google Home",
          "Apple with HomePod",
          "Microsoft with Cortana speaker"
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
        "question": "The Mirai botnet attack in October 2016 hijacked hundreds of thousands of unsecured webcams and DVRs.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "How much did Google pay to acquire Nest Labs in January 2014 (in billions of dollars)?",
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
        "question": "When was the Apple Watch released?",
        "options": [
          "October 2011",
          "January 2014",
          "April 2015",
          "November 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Which city implemented one of the most comprehensive smart city programs starting in 2012?",
        "options": [
          "Singapore",
          "Barcelona",
          "Copenhagen",
          "Seoul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "How many IoT devices are projected to exist worldwide by 2030 (in billions)?",
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
        "question": "The Matter protocol was launched to create a universal standard for smart home devices.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "With what accuracy did the Apple Watch identify atrial fibrillation according to the New England Journal of Medicine study?",
        "options": [
          "74 percent",
          "84 percent",
          "94 percent",
          "99 percent"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Which IoT applications in agriculture are mentioned? Select all that apply.",
        "options": [
          "Soil moisture sensors for irrigation",
          "Drones with multispectral cameras",
          "Connected tractors with analytics",
          "Robotic harvesting"
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
    "title": "Sosyal Medyanın Evrimi",
    "content": "Sosyal medya, internetin ilk ortaya çıktığı zamanlarda kimsenin tahmin edemeyeceği şekillerde insanların iletişim kurma, bilgi paylaşma ve topluluklar oluşturma biçimini dönüştürdü. Milyarlarca kullanıcıyı birbirine bağlayan platformlar, her kıtada siyaseti, ticareti, eğlenceyi ve kişisel ilişkileri yeniden şekillendirdi. Sosyal medyanın hikayesi, hem dikkate değer inovasyonu hem de modern toplum için derin zorlukları ortaya koymaktadır.\n\nİlk sosyal ağ siteleri, internetin sıradan insanlar için erişilebilir hale geldiği 1990'ların sonlarında ortaya çıktı. SixDegrees, 1997'de kullanıcıların profil oluşturmasına ve arkadaşlarıyla bağlantı kurmasına izin vererek piyasaya sürüldü. Site, 2001'de kapanmadan önce yaklaşık 3,5 milyon üye çekti. Friendster, 2002'de sektöre standart getirecek özellikleri öncülük etti. MySpace, 2005'ten 2008'e kadar hüküm sürdü, Amerika Birleşik Devletleri'nde en çok ziyaret edilen web sitesi oldu ve Arctic Monkeys gibi müzisyenlerin kariyerlerini başlattı.\n\nFacebook, Şubat 2004'te Harvard Üniversitesi yurt odasından çıktı. Mark Zuckerberg ve oda arkadaşları, siteyi başlangıçta yalnızca üniversite öğrencileri için yarattı. Platform, Eylül 2006'da 13 yaş ve üzeri herkese açıldı. 2012 yılına gelindiğinde Facebook, bir milyar aylık aktif kullanıcıya ulaştı, bu da hiçbir sosyal ağın daha önce başaramadığı bir kilometre taşıydı. Şirket şu anda Meta olarak faaliyet gösteriyor ve Instagram ve WhatsApp dahil olmak üzere uygulama ailesinde 3 milyardan fazla aylık kullanıcı bildiriyor.\n\nTwitter, Temmuz 2006'da piyasaya sürüldüğünde sosyal iletişim için yeni bir format tanıttı. Platform, gönderileri önce 140 karakterle, daha sonra 280'e çıkararak kullanıcıları düşüncelerini özlü bir şekilde ifade etmeye zorladı. Twitter, son dakika haberleri, siyasi söylem ve ünlülerin etkileşimi için vazgeçilmez hale geldi. Hizmet, 2011'deki Arap Baharı protestoları sırasında önemli roller oynadı ve o zamandan beri sayısız konuda kamuoyu görüşünü şekillendirdi.\n\nYouTube, üç eski PayPal çalışanı tarafından Şubat 2005'te kurulduktan sonra video paylaşımında devrim yarattı. İlk video, \"Me at the zoo\" (Hayvanat Bahçesinde Ben) başlıklıydı ve kurucu ortak Jawed Karim'i San Diego Hayvanat Bahçesi'nde sadece 18 saniye boyunca gösteriyordu. Google, YouTube'u Ekim 2006'da 1,65 milyar dolara satın aldı. Bugün, kullanıcılar her dakika 500 saatten fazla video içeriği yüklüyor ve platform, tüm kablolu TV ağlarından daha fazla 18 ila 49 yaşındakine ulaşıyor.\n\nInstagram, Kevin Systrom ve Mike Krieger tarafından Ekim 2010'da piyasaya sürüldüğünde fotoğraf paylaşımını mobil cihazlara getirdi. Uygulama, ilk gününde 25.000 kullanıcı kazandı ve iki ay içinde bir milyona ulaştı. Facebook, Instagram'ı Nisan 2012'de bir milyar dolara satın aldı. Platform, 2016'da Hikayeler'i ve 2020'de Reels'i tanıtarak Snapchat ve TikTok gibi rakipler tarafından popüler hale getirilen özellikleri uyarladı.\n\nTikTok, 2017'de uluslararası lansmanından sonra tarihin en hızlı büyüyen sosyal platformu oldu. Çinli şirket ByteDance, Amerikalı gençler arasında popüler olan bir uygulama olan Musical.ly ile birleşerek onu yarattı. TikTok'un algoritması, videoları takip ilişkilerinden ziyade görüntüleme davranışına göre önererek, önceki platformlardan farklı bir deneyim yaratıyor. Uygulama, Eylül 2021'de bir milyar aylık kullanıcıya ulaştı ve bu kilometre taşına herhangi bir öncülünden daha hızlı ulaştı.\n\nSosyal medya, yıllık milyarlarca dolar değerinde yeni ekonomik fırsatlar yarattı. Influencer'lar, markalarla ortaklık kurarak ve ürünleri takipçilerine tanıtarak önemli gelirler elde ediyor. Yaratıcı ekonomi, 2022'ye kadar dünya çapında tahmini 50 milyon kişiye istihdam sağladı. Küçük işletmeler, pahalı geleneksel reklamcılığa gerek kalmadan müşterilere ulaşmak için sosyal platformları kullanıyor. Kuruluşlar ve bireyler için sosyal medya varlığını yönetme etrafında tüm endüstriler ortaya çıktı.\n\nSosyal medya ile ilgili zihinsel sağlık endişeleri, araştırmacılar ve politika yapıcılar arasında yoğun bir tartışmaya yol açtı. Araştırmalar, yoğun sosyal medya kullanımını özellikle gençler arasında artan anksiyete, depresyon ve yalnızlık oranlarıyla ilişkilendiriyor. San Diego Eyalet Üniversitesi'nden Dr. Jean Twenge, 2017'de akıllı telefon benimsenmesiyle eş zamanlı olarak gençlerin ruh sağlığında keskin düşüşler gösteren bir araştırma yayınladı. Eleştirmenler, korelasyonun nedenselliği kanıtlamadığını ve çevrimiçi bağlantının potansiyel faydalarına işaret ediyor.\n\nYanlış bilgiler sosyal ağlar aracılığıyla hızla yayılıyor ve bilgi ekosistemine meydan okuyor. MIT'den Mart 2018'de Science'ta yayınlanan araştırmaya göre, yanlış hikayeler daha hızlı yayılıyor ve doğru raporlardan daha fazla kişiye ulaşıyor. Platformlar, yanıltıcı içerikle mücadele etmek için gerçekleri kontrol etme programları, uyarı etiketleri ve algoritmik değişiklikler uyguladı. Bu çabalar karışık sonuçlar veriyor ve sansür ve teknoloji şirketlerinin gerçeği belirlemedeki rolü hakkında soruları gündeme getiriyor.\n\nGizlilik endişeleri, sosyal medyayı ilk günlerinden itibaren takip etti. Şirketler, reklamları dikkate değer bir hassasiyetle hedeflemek için büyük miktarda kişisel veri topluyor. 2018'deki Cambridge Analytica skandalı, bir siyasi danışmanlık firmasının 87 milyon Facebook kullanıcısından izin almadan veri topladığını ortaya çıkardı. Avrupa Genel Veri Koruma Yönetmeliği gibi düzenlemeler, kullanıcılara bilgileri üzerinde daha fazla kontrol sağlamaya çalışıyor.\n\nSosyal medyanın geleceği, yeni teknolojiler ve değişen tercihler ortamı yeniden şekillendirirken hızla gelişmeye devam ediyor. Sanal gerçeklik platformları, daha sürükleyici sosyal deneyimler vaat ediyor. Blockchain teknolojisi üzerine kurulu merkezi olmayan ağlar, kullanıcılara daha fazla kontrol sağlamayı amaçlıyor. Gençler giderek genel yayınlar yerine özel mesajlaşmayı tercih ediyor. Hangi şekilleri alırsa alsın, dijital platformlar aracılığıyla sosyal bağlantı, gelecek nesiller boyunca insan iletişiminin merkezinde kalmaya devam edecek.",
    "wordCount": 749,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Makalede bahsedilen ilk sosyal ağ sitesi hangisiydi?",
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
        "question": "Google, 2006 yılında YouTube'u satın almak için ne kadar ödedi?",
        "options": [
          "1 milyar dolar",
          "1.65 milyar dolar",
          "2 milyar dolar",
          "10 milyar dolar"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Hangi platformlar Meta'nın uygulama ailesinin bir parçasıdır? Geçerli olanların hepsini seçin.",
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
        "question": "TikTok, daha önce hiçbir sosyal medya platformunun ulaşamadığı kadar hızlı bir şekilde bir milyar aylık kullanıcıya ulaştı.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Cambridge Analytica skandalında kaç Facebook kullanıcısının verileri toplandı (milyonlar cinsinden)?",
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
        "question": "Facebook ne zaman bir milyar aylık aktif kullanıcıya ulaştı?",
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
    "title": "Dijital Gizlilik Devrimi",
    "content": "Dijital gizlilik, teknoloji şirketlerinin benzeri görülmemiş miktarda kişisel bilgi topladığı ve hükümetlerin gözetim yeteneklerini sadece birkaç on yıl önce distopik görünen seviyelere genişlettiği yirmi birinci yüzyılın tanımlayıcı sorunlarından biri olarak ortaya çıktı. Veriye dayalı hizmetlerin faydaları ile yaygın izlemenin riskleri arasındaki gerilim, küresel olarak politika tartışmalarını, iş modellerini ve bireysel seçimleri şekillendiriyor. Bu karmaşık manzarayı anlamak, hem gözetimi hem de gizlilik korumasını sağlayan teknolojileri, yeniliklere ayak uydurmakta zorlanan yasal çerçeveleri ve her yerde bulunan bağlantısallığın olduğu bir çağda gizliliğin ne anlama geldiğine dair felsefi soruları incelemeyi gerektiriyor.\n\nBilgi gizliliği kavramı, dijital çağdan çok önce yasal tanınma kazanmıştı. Amerikalı hukuk akademisyenleri Samuel Warren ve Louis Brandeis, taşınabilir kameraların sağladığı müdahaleci gazeteciliğe yanıt olarak, 1890'da Harvard Law Review'da yayımladıkları dönüm noktası niteliğindeki makalede yalnız bırakılma hakkını savundular. Bu temel metin, gizliliği mülkiyet haklarından ve bedensel özerklikten ayrı olarak tanımladı. Brandeis daha sonra Yüksek Mahkeme yargıcı oldu ve hükümetin müdahalesine karşı gizlilik korumalarını genişleten etkili görüşler yazdı.\n\nİnternet, gizliliği soyut bir yasal kavramdan günlük pratik bir endişeye dönüştürdü. İlk web kullanıcıları, nasıl toplanıp kullanılabileceğinin farkında olmadan kişisel bilgileri gelişigüzel paylaştılar. Web tarayıcıları tarafından saklanan küçük metin dosyaları olan çerezler, 1994'ten itibaren web sitelerinin geri dönen ziyaretçileri tanımasını sağladı. Netscape mühendisi Lou Montulli, alışveriş sepetlerini koruma teknik sorununu çözmek için çerezleri icat etti, ancak hızla kullanıcıları web sitelerinde izleyen gözetim araçları haline geldiler.\n\nGoogle, arama sorgularını kullanıcı ilgi alanlarına dikkate değer bir hassasiyetle bağlayarak dijital reklamcılıkta devrim yarattı. Şirketin kurucuları başlangıçta reklam destekli iş modellerinden rahatsızlık duyduklarını ifade ederek, 1998 tarihli akademik makalelerinde reklamcılığın reklamverenleri kullanıcılara önceliklendirme konusunda karışık teşvikler yarattığını yazdılar. Yine de Google AdWords Ekim 2000'de ve Google AdSense 2003'te piyasaya sürüldü ve yüz milyarlarca gelir elde edecek hedefli reklamcılık altyapısını oluşturdu.\n\nFacebook, veri toplamayı sosyal ilişkilere ve kişisel iletişime kadar genişletti. Platform, Şubat 2004'te insanları birbirine bağlama vaadiyle piyasaya sürüldü, ancak iş modeli reklamverenlere ayrıntılı kullanıcı profilleri satmaya dayanıyordu. Kullanıcılar, bu bilgilerin nasıl paraya çevrileceğini anlamadan fotoğraflar, konum verileri, siyasi görüşler ve ilişki durumu paylaştılar. 2018'e gelindiğinde Facebook, dünya çapında tahmini 2,2 milyar kullanıcı hakkında veri topluyordu.\n\nCambridge Analytica skandalı, Mart 2018'de üçüncü taraf uygulamalarının milyonlarca Facebook kullanıcısından bilgileri bilgileri olmadan nasıl topladığını ortaya çıkararak kamuoyunun bilincine yerleşti. İngiliz danışmanlık firması Cambridge Analytica, Facebook'un API izinlerini kullanan bir kişilik testi uygulaması aracılığıyla 87 milyon kullanıcının kişisel bilgilerini elde etti. Şirket, bu verileri 2016 Amerika Birleşik Devletleri başkanlık seçimleri ve Brexit referandumu sırasında siyasi reklamcılık için kullandı. Facebook, birden fazla kıtada düzenleyici soruşturmalarla karşı karşıya kaldı ve Temmuz 2019'da Federal Ticaret Komisyonu'na rekor 5 milyar dolar para cezası ödedi.\n\nEdward Snowden'ın Haziran 2013'teki ifşaatları, dijital iletişimlerin sağladığı hükümet gözetiminin ölçeğini ortaya çıkardı. Eski Ulusal Güvenlik Ajansı yüklenicisi, gazeteciler Glenn Greenwald, Laura Poitras ve Ewen MacAskill'e gizli belgeler sızdırdı. Bu belgeler, milyonlarca Amerikalının telefon meta verilerini toplayan, uluslararası iletişimleri taşıyan fiber optik kablolara bağlanan ve teknoloji ürünlerindeki güvenlik açıklarından yararlanan programları ortaya çıkardı. İfşaatlar, güvenlik ve gizlilik arasındaki denge hakkında küresel tartışmalara yol açtı.\n\nPRISM programı, NSA'nın Google, Facebook, Apple ve Microsoft dahil olmak üzere büyük teknoloji şirketlerinin sunucularından doğrudan veri toplamasını sağladı. Şirketler başlangıçta program hakkında bilgi sahibi olmadıklarını reddettiler, ancak sonraki raporlar, bazen mahkemelerde genişleyen gözetimle mücadele ederken yasal emirlere uyduklarını açıkladı. Snowden, Hong Kong'a kaçtı ve sonunda 2024 itibariyle bulunduğu Rusya'da sığınma hakkı aldı. Amerika Birleşik Devletleri onu casusluk ve hükümet malını çalmakla suçladı.\n\nŞifreleme, hem hükümet gözetimine hem de cezai önlemeye karşı birincil teknik savunmayı sağlar. Uçtan uca şifreleme, yalnızca gönderen ve alıcının mesajları okuyabilmesini ve hizmet sağlayıcının bile içeriğe erişememesini sağlar. WhatsApp, kriptograf Moxie Marlinspike tarafından geliştirilen Signal Protokolünü kullanarak Nisan 2016'da 1,5 milyar kullanıcısı için uçtan uca şifreleme uyguladı. Apple da benzer şekilde iMessage iletişimlerini şifreler ve arka kapı erişimi için hükümet taleplerine alenen direnmiştir.\n\nEmniyet teşkilatları, şifrelemenin suçluların cezasız bir şekilde faaliyet gösterdiği bölgeler yarattığını savunuyor. FBI, Şubat 2016'da şirketi San Bernardino'daki terörist saldırganlardan biri tarafından kullanılan bir iPhone'un kilidini açmaya zorlamak için Apple'a dava açtı. Apple, bir arka kapı oluşturmanın tüm kullanıcılar için güvenliği tehlikeye atacağını savunarak reddetti. FBI sonuç olarak telefonun güvenliğini aşmak için üçüncü taraf bir yükleniciye yaklaşık bir milyon dolar ödedi. Bu dava, gizlilik ve güvenlik çıkarları arasındaki devam eden çatışmayı gösterdi.\n\nAvrupa Birliği, genellikle GDPR olarak bilinen ve 25 Mayıs 2018'de yürürlüğe giren Genel Veri Koruma Yönetmeliği'ni yürürlüğe koydu. Bu kapsamlı çerçeve, AB sakinlerinin kişisel verilerini toplama, saklama ve işleme konusunda katı kurallar oluşturdu. Kuruluşlar, veri toplamadan önce açık izin almak, saklanan bilgilere erişim sağlamak ve talep üzerine verileri silmek zorundadır. İhlaller, küresel yıllık gelirin %4'üne veya 20 milyon Euro'ya kadar para cezasıyla sonuçlanabilir, hangisi daha büyükse. Amazon, Temmuz 2021'de 746 milyon Euro'luk en büyük GDPR cezasını aldı.\n\nKaliforniya, 1 Ocak 2020'de yürürlüğe giren ve eyalet sakinleri için benzer korumalar sağlayan California Tüketici Gizliliği Yasası'nı kabul etti. Yasa, tüketicilere işletmelerin hangi kişisel bilgileri topladığını bilme, bu bilgileri silme ve satışından vazgeçme hakları veriyor. Kasım 2020'de seçmenler tarafından onaylanan California Gizlilik Hakları Yasası, bu korumaları daha da güçlendirdi. Virginia, Colorado ve Connecticut dahil olmak üzere diğer eyaletler de benzer yasalar çıkararak Amerika Birleşik Devletleri genelinde bir gizlilik gereksinimleri ağı oluşturdu.\n\nVeri aracıları, büyük ölçüde kamuoyunun farkındalığı dışında faaliyet göstererek, kamu kayıtlarından, satın alma geçmişlerinden, sosyal medya etkinliklerinden ve sayısız diğer kaynaklardan ayrıntılı profiller derlemektedir. Acxiom, Experian ve Oracle Data Cloud gibi şirketler, yüz milyonlarca kişiyi kapsayan veri tabanları tutmaktadır. Bu profiller, kredi kararlarını, işe alım taramasını, sigorta oranlarını ve hedeflenen reklamcılığı etkiliyor. Aracı kurumlar, bu bilgilere işletmelere, siyasi kampanyalara ve bazen kötü niyetli aktörlere erişim satmaktadır.\n\nAkıllı telefonların sürekli olarak kullanıcı konumlarını bildirmesi nedeniyle, konum izleme özellikle tartışmalı hale geldi. Mobil uygulamalar, hava durumu tahminlerinden restoran tavsiyelerine kadar değişen işlevler için rutin olarak konum erişimi talep etmektedir. Bu veriler, tıbbi ziyaretler, dini uygulamalar, siyasi faaliyetler ve kişisel ilişkiler hakkında hassas bilgiler ortaya koymaktadır. The Wall Street Journal, Aralık 2018'de düzinelerce şirketin popüler uygulamalardan kesin konum verileri aldığını ve kapsamlı hareket geçmişleri oluşturduğunu bildirdi.\n\nYüz tanıma teknolojisi, rıza veya farkındalık olmaksızın kimlik tespiti sağlayarak ayrı gizlilik endişelerini artırmaktadır. Emniyet teşkilatları, aranabilir bir veri tabanı oluşturmak için sosyal medyadan milyarlarca fotoğraf kazıyan Clearview AI gibi şirketlerin sistemlerini kullanmaktadır. San Francisco, Boston ve Portland dahil olmak üzere birçok şehir, yüz tanıma kullanımını yasakladı. Avrupa Birliği, kamusal alanlarda biyometrik gözetim konusunda kısıtlamaları tartıştı. Çin, yüz tanımayı yaygın olarak kullanmakta, özellikle Uygur azınlıkları hedef alan sosyal kontrol önlemleri için kullanmaktadır.\n\nUnutulma hakkı, Avrupa Adalet Divanı'nın 2014 yılında Google'ın talep üzerine belirli arama sonuçlarını kaldırmasını gerektiren bir kararından doğdu. İspanyol vatandaşı Mario Costeja Gonzalez, 1998'deki mali zorlukları hakkında çıkan gazete haberlerine verilen bağlantıların artık alakalı olmadığını başarılı bir şekilde savundu. Google, karardan bu yana yaklaşık 6 milyon URL'yi etkileyen 1,6 milyondan fazla kaldırma talebini işleme koydu. Eleştirmenler bunun sansür anlamına geldiğini savunurken, destekçiler bunu kişisel haysiyet ve rehabilitasyon için gerekli görüyor.\n\nGizliliği koruyan teknolojiler, gözetim ekonomisine alternatifler sunmaktadır. Sanal özel ağlar, internet trafiğini şifreler ve kullanıcı konumlarını maskeler. Tor tarayıcısı, izlemeyi önlemek için iletişimleri birden çok sunucu üzerinden yönlendirir. DuckDuckGo gibi gizliliğe odaklı arama motorları, kişisel veri toplamadan sorguları işler. Signal, minimum meta veri toplayan şifreli mesajlaşma sağlar. Bu araçlar, benimsenmeyi sınırlayan teknik bir karmaşıklık gerektirir, ancak gizliliğe saygılı hizmetlerin teknik olarak mümkün olduğunu gösterir.\n\nÇocukların savunmasızlığı ve anlamlı rıza gösterme yetersizliği göz önüne alındığında, çocukların gizliliği özel yasal koruma görmektedir. 1998'de yürürlüğe giren Çocukların Çevrimiçi Gizliliğini Koruma Yasası, Amerika Birleşik Devletleri'nde 13 yaşın altındaki çocuklardan kişisel bilgi toplanmasını kısıtlamaktadır. TikTok, çocukların verilerini yasa dışı bir şekilde toplama suçlamalarını kapatmak için Şubat 2019'da 5,7 milyon dolar ödedi. Birleşik Krallık'ın Eylül 2021'de yürürlüğe giren Yaşa Uygun Tasarım Kodu, çevrimiçi hizmetlerin 18 yaşın altındaki kullanıcılar için yüksek gizlilik varsayılanları sağlamasını gerektirmektedir.\n\nDijital gizliliğin geleceği, teknolojik yeniliklere, düzenleyici gelişmelere ve veri paylaşımına yönelik kültürel tutumlara bağlıdır. Merkeziyetsiz kimlik sistemleri, bireylere kişisel bilgileri üzerinde kontrol sağlayabilir. Diferansiyel gizlilik teknikleri, bireysel kayıtları korurken faydalı veri analizini mümkün kılar. Düzenleyici yakınsama, parçalı ulusal yaklaşımlardan ziyade küresel standartlar oluşturabilir. Veri kullanışlılığı ile gizlilik koruması arasındaki temel gerilim devam edecektir, ancak aralarındaki denge demokratik tartışmaya ve bireysel tercihlere tabidir.",
    "wordCount": 1303,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "When did Samuel Warren and Louis Brandeis publish their landmark privacy article in the Harvard Law Review?",
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
        "question": "Which companies were revealed to be part of the NSA PRISM program? Select all that apply.",
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
        "question": "The Cambridge Analytica scandal involved data from 87 million Facebook users.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "How much did Facebook pay in its FTC fine in July 2019 (in billions of dollars)?",
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
        "question": "When did Edward Snowden leak classified NSA documents?",
        "options": [
          "June 2011",
          "June 2013",
          "June 2015",
          "June 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "When did GDPR take effect?",
        "options": [
          "May 25, 2016",
          "May 25, 2017",
          "May 25, 2018",
          "May 25, 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "How much was Amazon's GDPR fine in July 2021 (in millions of euros)?",
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
        "question": "WhatsApp implemented end-to-end encryption for its users in April 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "When did the California Consumer Privacy Act take effect?",
        "options": [
          "January 1, 2018",
          "January 1, 2019",
          "January 1, 2020",
          "January 1, 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "When was the Children's Online Privacy Protection Act enacted?",
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
        "question": "Who invented web cookies in 1994?",
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
        "question": "When did Google AdWords launch?",
        "options": [
          "October 1998",
          "October 2000",
          "October 2002",
          "October 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "How much did TikTok pay in February 2019 to settle children's data charges (in millions of dollars)?",
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
        "question": "San Francisco has banned government use of facial recognition technology.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "When was the right to be forgotten ruling by the European Court of Justice?",
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
        "question": "Which journalists received Edward Snowden's leaked documents? Select all that apply.",
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
    "title": "Blockchain Teknolojisinin Devrimci Dünyası",
    "content": "Blockchain teknolojisi, karanlık bir kriptografik kavramdan, dijital para birimlerindeki kökenlerinin çok ötesinde endüstrileri yeniden şekillendiren dönüştürücü bir güce evrildi. Bu dağıtık defter sistemi, kayıt tutma ve güvene yönelik geleneksel yaklaşımlara meydan okuyan benzeri görülmemiş bir şeffaflık, güvenlik ve merkeziyetsizlik sunuyor. Blockchain'i anlamak, teknoloji uzmanlarının neden onu internetin kendisinden bu yana en önemli yeniliklerden biri olarak gördüğünü ortaya koyuyor.\n\nSatoshi Nakamoto, takma adlı bir kişi veya grup, 31 Ekim 2008'de yayınlanan Bitcoin teknik incelemesi aracılığıyla blockchain'i dünyaya tanıttı. Zamanlama, Lehman Brothers'ın çöküşünün küresel mali krizi tetiklemesinden sadece haftalar sonra geldiği için oldukça isabetliydi. Nakamoto, bankalar gibi güvenilir aracılara olan ihtiyacı ortadan kaldıracak eşler arası bir elektronik nakit sistemi önerdi. İlk Bitcoin bloğu, \"genesis block\" olarak adlandırılan blok, 3 Ocak 2009'da çıkarıldı ve teknolojinin motivasyonlarının kalıcı bir hatırlatıcısı olarak banka kurtarma paketleriyle ilgili bir gazete başlığını gömdü.\n\nBir blockchain, düğümler olarak adlandırılan bir bilgisayar ağı üzerinde paylaşılan dağıtık bir veritabanı olarak işlev görür. Her blok, bir işlem listesi, bir zaman damgası ve onu önceki bloğa bağlayan bir kriptografik özet (hash) içerir. Bu özetler zinciri, ağın çoğunluğunu kontrol etmeden geçmiş kayıtlarını değiştirmeyi pratik olarak imkansız hale getirir. Birisi eski bir işlemi değiştirmeye çalıştığında, özet değişir, zinciri kırar ve diğer düğümleri kurcalama girişimine karşı uyarır.\n\nKonsensüs mekanizmaları, tüm düğümlerin merkezi bir otoriteye ihtiyaç duymadan blockchain'in içeriği üzerinde anlaşmasını sağlar. Bitcoin, bilgisayarların karmaşık matematiksel bulmacaları çözmek için yarıştığı iş kanıtı (proof of work) kullanır. Bir çözümü ilk bulan, bir sonraki bloğu ekleme hakkını kazanır ve yeni oluşturulan bitcoin'leri ödül olarak alır. Madencilik olarak adlandırılan bu süreç, 2023'te yaklaşık 127 terawatt-saat elektrik tüketti; bu, Norveç'in yıllık enerji kullanımına eşdeğerdir.\n\nProgramcı Vitalik Buterin tarafından Temmuz 2015'te başlatılan Ethereum, blockchain'i basit işlemlerin ötesine, programlanabilir akıllı sözleşmelere genişletti. Bu kendi kendine yürüyen anlaşmalar, önceden tanımlanmış koşullar karşılandığında şartlarını otomatik olarak uygular. Bir emlak için bir akıllı sözleşme, her iki taraf da yükümlülüklerini yerine getirdiğinde aynı anda bir satıcıya ödeme yapabilir ve mülkiyeti bir alıcıya devredebilir. İşlemi doğrulamak için avukatlara, emanet acentelerine veya bankalara gerek yoktur.\n\nMerkeziyetsiz finans, yaygın olarak DeFi olarak adlandırılır, geleneksel finansal hizmetleri aracılar olmadan yeniden yaratmak için akıllı sözleşmeleri kullanır. Borç verme platformları, kullanıcıların teminat sağlayarak kripto para birimi ödünç almalarına olanak tanır ve faiz oranları bankacılardan ziyade algoritmalar tarafından belirlenir. Merkeziyetsiz borsalar, bir şirketin fonlarını tutmadan kullanıcılar arasında doğrudan ticareti mümkün kılar. Kasım 2021'deki zirvesinde, DeFi protokolleri 180 milyar doların üzerinde varlık tutuyordu.\n\nNon-fungible tokenler (NFT'ler) olarak bilinen değiştirilemeyen token'lar, blockchain'i dijital mülkiyete ve kaynağa uygular. Her NFT, blockchain üzerinde doğrulanan benzersiz bir varlığı temsil eder, en yaygın olarak dijital sanat veya koleksiyon ürünlerini. Dijital sanatçı Beeple, Mart 2021'de Christie's müzayede evinde 69,3 milyon dolara bir NFT sanat eseri sattı ve bu teknolojiyi ana akım bilincine fırlattı. Eleştirmenler, NFT'lerin kalıcı bir değere sahip olup olmadığını sorgularken, destekçiler yaratıcıların dijital çalışmaları nasıl paraya çevirdiğini temelden değiştirdiğini savunuyor.\n\nTedarik zinciri yönetimi, blockchain teknolojisi için zorlayıcı pratik uygulamalar sunar. Şirketler, ham maddelerden imalata ve perakende raflarına kadar ürünleri her adımda değiştirilemez kayıtlarla takip edebilir. Walmart, yiyecek ürünlerinin kökenini önceden gereken haftalar yerine saniyeler içinde izleyen bir blockchain sistemi üzerinde IBM ile ortaklık kurdu. Bu yetenek, kontamine partileri hızla tanımlamanın hayat kurtardığı gıda güvenliği geri çağırmaları sırasında paha biçilmez olduğunu kanıtlıyor.\n\nHükümetler, kimlik doğrulama, oylama sistemleri ve kamu kayıtları için blockchain'i araştırıyor. Dijital yönetişimde öncü olan Estonya, 1,3 milyon vatandaşı için sağlık kayıtlarını, iş kayıtlarını ve mahkeme belgelerini güvence altına almak için blockchain kullanıyor. Batı Virginia dışişleri bakanı, 2018 ara seçimleri sırasında denizaşırı ülkelerde görev yapan askeri personel için blockchain tabanlı bir oylama pilotu gerçekleştirdi. Bu deneyler, teknolojinin demokratik kurumları tehdit etmek yerine geliştirip geliştiremeyeceğini test ediyor.\n\nBlockchain'i çevreleyen çevresel endişeler önemli bir teknolojik evrimi tetikledi. Ethereum, Eylül 2022'de enerji yoğun iş kanıtından pay kanıtına geçti ve elektrik tüketimini tahmini olarak yüzde 99,95 azalttı. Pay kanıtı, doğrulayıcıları hesaplama gücünden ziyade teminat olarak verdikleri kripto para birimine göre seçer. Bu değişim, blockchain'in güvenliği korurken çevresel ayak izini ele alabileceğini gösteriyor.\n\nÖlçeklenebilirlik sorunları, blockchain'in günlük işlemler için benimsenmesini sınırlar. Bitcoin, Visa ağının 24.000 kapasitesine kıyasla saniyede kabaca yedi işlem gerçekleştirir. Katman iki çözümleri, mevcut blockchain'lerin üzerine daha hızlı ödeme kanalları oluşturur. Lightning Network, yalnızca nihai bakiyeleri ana blockchain'e yerleştirerek neredeyse anında Bitcoin işlemlerini mümkün kılar. Bu yenilikler, blockchain'i günlük alımlar için pratik hale getirmeyi amaçlamaktadır.\n\nBlockchain'in geleceği, yaratıcılarının asla hayal edemediği alanlara uzanıyor. Merkeziyetsiz otonom organizasyonlar (DAO'lar), geleneksel kurumsal yapılar olmadan toplulukları yönetmek ve hazineleri yönetmek için token oylamasını kullanır. Dijital kimlik sistemleri, bireylere işverenlere, ev sahiplerine veya hükümetlere kimlik bilgilerini kanıtlarken kişisel verileri üzerinde kontrol sağlayabilir. Blockchain'in devrimci potansiyelini gerçekleştirip gerçekleştirmeyeceği veya niş bir role yerleşip yerleşmeyeceği belirsizliğini koruyor, ancak teknoloji ve toplum üzerindeki etkisi zaten önemli ve kalıcı olduğunu kanıtladı.",
    "wordCount": 761,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Bitcoin teknik incelemesi (whitepaper) ne zaman yayınlandı?",
        "options": [
          "3 Ocak 2009",
          "31 Ekim 2008",
          "Temmuz 2015",
          "Eylül 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Kripto para biriminin ötesinde, blok zinciri uygulamaları olarak hangileri belirtilmiştir? Uygun olanların tümünü seçin.",
        "options": [
          "Tedarik zinciri yönetimi",
          "Dijital kimlik",
          "Oy verme sistemleri",
          "Video akışı"
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
        "question": "Ethereum, Eylül 2022'de hisse kanıtına (proof of stake) geçti ve elektrik tüketimini yüzde 99,95 oranında azalttı.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Beeple'ın NFT eseri Mart 2021'de Christie's'de ne kadara satıldı (milyon dolar cinsinden)?",
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
        "question": "Ethereum'u Temmuz 2015'te kim başlattı?",
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
        "question": "Bitcoin ağı saniyede kaç işlem gerçekleştirebilir?",
        "options": [
          "Yaklaşık 7",
          "Yaklaşık 70",
          "Yaklaşık 700",
          "Yaklaşık 7.000"
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
    "title": "Bulut Bilişim Devrimi",
    "content": "Bulut bilişim, işletmelerin ve bireylerin teknolojiyi kullanma biçimini temelden değiştirdi; yazılım ve veri depolamasını yerel cihazlardan uzak sunucuların geniş ağlarına kaydırdı. Bu mimari devrim, sadece yirmi yıl önce imkansız görünen, yayın eğlencesinden herhangi bir cihazdan erişilebilen yapay zeka hizmetlerine kadar yetenekler sağlıyor. Bulut, modern yaşamın o kadar ayrılmaz bir parçası haline geldi ki, çoğu insan bilinçli farkındalık olmadan günlük olarak kullanıyor.\n\nAmazon Web Services, ilk bulut ürünlerini Mart 2006'da piyasaya sürerek, teknoloji endüstrisini yeniden şekillendirecek hizmet olarak altyapı modeline öncülük etti. Şirket, Kara Cuma gibi yoğun alışveriş dönemlerini yönetmek için devasa bir bilgi işlem kapasitesi oluşturmuştu ve kullanılmayan kapasiteyi diğer işletmelere kiralayabileceğini fark etti. AWS'yi kuruluşundan bu yana yöneten Andy Jassy, bölümü yıllık 80 milyar doların üzerinde gelir üreten bir kâr motoruna dönüştürdü. Bu iş modeli o kadar başarılı oldu ki, rakipler kendi bulut platformlarını oluşturmak için acele ettiler.\n\nMicrosoft Azure, Şubat 2010'da bulut pazarına girdi ve şirketin kurumsal müşterilerle olan derin ilişkilerinden yararlandı. 2014 yılında liderliği devralan CEO Satya Nadella, Microsoft'un stratejisini bulut hizmetleri etrafında şekillendirdi. Azure, küçük işletme web sitelerinden LinkedIn profesyonel ağına kadar her şeyi destekleyerek ikinci en büyük bulut sağlayıcısı haline geldi. Microsoft'un bulut dönüşümü, birçoğunun modasının geçtiğini düşündüğü bir şirketi canlandırdı.\n\nGoogle Cloud Platform, arama devinin dağıtık bilgi işlem ve makine öğrenimi konusundaki uzmanlığını kurumsal müşterilere getiriyor. Tüm interneti indeksleyen ve günde milyarlarca arama sorgusunu işleyen şirket, bu altyapıyı her büyüklükteki işletmeye sunuyor. Google'ın denizaltı kablolarına ve onlarca ülkeyi kapsayan veri merkezlerine yaptığı yatırımlar, dünyanın hemen her yerinden düşük gecikmeli erişim sağlıyor. Platform özellikle veri analizi ve yapay zeka iş yüklerinde öne çıkıyor.\n\nBulut bilişim, birbirinin üzerine katmanlar halinde yığılan üç ana hizmet modeli sunar. Hizmet Olarak Altyapı, müşterilerin kendilerinin yapılandırdığı sanal makineler, depolama ve ağ iletişimi sağlar. Hizmet Olarak Platform, işletim sistemleri, veritabanları ve geliştirme araçları ekler. Hizmet Olarak Yazılım, web tarayıcıları aracılığıyla eksiksiz uygulamalar sunarak kurulum ve bakımı tamamen ortadan kaldırır. Çoğu insan, e-posta, belge düzenleme ve iş uygulamaları aracılığıyla günlük olarak SaaS ürünleriyle etkileşim kurar.\n\nBulut bilişimin ekonomisi, neredeyse her büyüklükteki kuruluş için avantajlar yaratır. Yeni kurulan şirketler, pahalı donanım satın almadan veya veri merkezlerini yönetmek için uzman personel işe almadan faaliyete geçer. Yalnızca tüketilen kaynaklar için ödeme yaparlar, yoğun dönemlerde ölçeklenir ve yavaş dönemlerde küçülürler. Bu esneklik, bir teknoloji şirketi kurmanın ekonomisini dönüştürdü. Altyapı yatırımı için milyonlar gerektirebilecek bir hizmet, artık minimum sermaye ile başlatılabilir.\n\nKurumsal kuruluşlar, şirket içi veri merkezlerinden bulut platformlarına giderek daha fazla geçiş yapıyor. General Electric, 2014'ten başlayarak yüzlerce veri merkezini hibrit bir bulut mimarisinde birleştirdi. Amerika'nın en büyük bankalarından biri olan Capital One, 2020'de tamamen AWS'ye geçtikten sonra son veri merkezini kapattığını duyurdu. Bu dönüşümler yıllar ve milyarlarca dolar alır, ancak sonuçta maliyetleri düşürürken yetenekleri artırır.\n\nBulutta güvenlik, geleneksel yaklaşımlardan temelden farklıdır, ancak genellikle kuruluşların bağımsız olarak başardıklarının ötesine geçer. Büyük bulut sağlayıcıları binlerce güvenlik uzmanı istihdam eder ve koruyucu teknolojilere milyarlarca yatırım yapar. Gizli devlet bilgilerini ve hassas finansal verileri işlemek için sertifikaları vardır. Paylaşılan sorumluluk modelleri, sağlayıcıların altyapıyı güvence altına alması, müşterilerin ise kendi uygulamalarını ve veri yapılandırmalarını güvence altına alması anlamına gelir.\n\nBulut veri merkezlerinin coğrafi dağılımı, performans optimizasyonunun ötesinde amaçlara hizmet eder. Birçok ülkedeki düzenlemeler, belirli verilerin ulusal sınırlar içinde kalmasını gerektirir. Bulut sağlayıcıları, bu egemenlik gereksinimlerini karşılamak için bölgesel veri merkezleri kurar. Avrupalı müşteriler, verilerinin Frankfurt veya Amsterdam'da kalmasını sağlayabilir. Avustralyalı işletmeler, bilgileri kendi ülkelerinde tutar. Bu dağıtık mimari aynı zamanda, çok az kuruluşun bağımsız olarak karşılayabileceği olağanüstü durum kurtarma yetenekleri sağlar.\n\nUç bilişim, bulut yeteneklerini verilerin kaynağına daha yakın bir yere genişletir. Her şeyi uzak veri merkezlerine göndermek yerine, uç sistemler anında yanıt gerektiren uygulamalar için bilgileri yerel olarak işler. Otonom araçlar, frenlemeye karar vermeden önce verilerin binlerce kilometre yol katetmesini bekleyemez. Ekipman titreşimlerini analiz eden endüstriyel sensörlerin anında anormallik tespiti yapması gerekir. Uç bilişim, milisaniyelerin önemli olduğu senaryolara bulut zekasını getirir.\n\nSunucusuz bilişim, bulut mimarisinin en yeni evrimini temsil eder. Bu modelde, geliştiriciler herhangi bir altyapıyı yönetmeden kod yazarlar. Bulut platformları, kod çalıştığında kaynakları otomatik olarak ayırır ve yalnızca gerçek yürütme süresi için ücretlendirir. 100 milisaniye çalışan bir fonksiyon, bir kuruşun çok küçük bir kısmına mal olur. Uygulamalar, sıfırdan milyonlarca isteği işlemeye herhangi bir yapılandırma değişikliği olmadan ölçeklenebilir.\n\nBulut bilişimin çevresel etkisi hem endişeler hem de fırsatlar yaratıyor. Veri merkezleri, küresel elektriğin yaklaşık yüzde 1,5'ini tüketiyor ve bu pay artmaya devam ediyor. Ancak, bulut sağlayıcıları tipik kurumsal veri merkezlerinden çok daha verimli çalışır. Google, tesislerinin ortalama 1,1 güç kullanım verimliliğine ulaştığını, sektör ortalamasının ise 1,5'in üzerinde olduğunu iddia ediyor. Bulut platformları, operasyonları giderek yenilenebilir enerjiyle destekliyor ve Microsoft 2030 yılına kadar karbon negatif olmayı taahhüt ediyor.\n\nYapay zeka ve makine öğrenimi, bulut platformlarının tanımlayıcı özellikleri haline geldi. Görüntü tanıma, doğal dil işleme ve konuşma sentezi için önceden eğitilmiş modeller, basit programlama arayüzleri aracılığıyla kullanılabilir. Makine öğrenimi uzmanlığı olmayan kuruluşlar, uygulamalarına gelişmiş yetenekler ekleyebilir. Bulut sağlayıcıları, her biri doğruluk, kullanım kolaylığı ve mevcut modellerin genişliği konusunda avantaj iddia ederek yapay zeka özellikleri konusunda agresif bir şekilde rekabet ediyor.\n\nÇoklu bulut stratejileri, kuruluşların aynı anda birden fazla sağlayıcıyı kullanmasına ve herhangi bir tek satıcıya bağımlılıktan kaçınmasına olanak tanır. Başlangıçta Google tarafından geliştirilen açık kaynaklı bir konteyner orkestrasyon sistemi olan Kubernetes, iş yüklerinin bulutlar arasında taşınmasını sağlar. Şirketler, maliyet, performans veya özel yeteneklere göre farklı iş yükleri için farklı sağlayıcılar seçer. Bu esneklik ek karmaşıklık gerektirir, ancak satıcıya bağımlılık endişelerini azaltır.\n\nBulut bilişimin geleceği, günlük yaşam ve iş operasyonlarıyla daha da fazla entegrasyona işaret ediyor. Kuantum bilişim kaynakları zaten bulut platformlarında görünüyor, ancak pratik uygulamalar sınırlı kalmaya devam ediyor. Yapay zeka, daha fazla altyapı yönetimini otomatik hale getirecek ve karmaşık sistemleri dağıtmak için gereken uzmanlığı azaltacaktır. Bağlantı geliştikçe ve uç bilişim olgunlaştıkça, yerel cihazlar ve bulut kaynakları arasındaki çizgi daha da bulanıklaşacaktır. Hangi özel teknolojiler ortaya çıkarsa çıksın, sahip olunan altyapıdan kiralanan hizmetlere geçiş, insanlığın bilişim yapma biçimini yeniden şekillendirmeye devam edecektir.",
    "wordCount": 950,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Amazon Web Services ilk bulut ürünlerini ne zaman piyasaya sürdü?",
        "options": [
          "Mart 2006",
          "Şubat 2010",
          "Ocak 2014",
          "Kasım 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Bahsedilen üç ana bulut hizmet modeli hangileridir? Uygun olanların tümünü seçin.",
        "options": [
          "Hizmet Olarak Altyapı (Infrastructure as a Service)",
          "Hizmet Olarak Platform (Platform as a Service)",
          "Hizmet Olarak Yazılım (Software as a Service)",
          "Hizmet Olarak Donanım (Hardware as a Service)"
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
        "question": "Capital One, 2020'de AWS'ye tamamen geçtikten sonra son veri merkezini kapattığını duyurdu.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Veri merkezleri küresel elektrik tüketiminin yüzde kaçını oluşturur?",
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
        "question": "Hangi CEO, 2014'ten itibaren Microsoft'un stratejisini bulut hizmetleri etrafında şekillendirdi?",
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
        "question": "Hangi açık kaynak sistemi, iş yüklerinin farklı bulut sağlayıcıları arasında taşınmasını sağlar?",
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
        "question": "AWS'nin yıllık geliri ne kadardır (milyar dolar cinsinden)?",
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
        "question": "Microsoft hangi yıla kadar karbon negatif olmayı taahhüt etti?",
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
    "id": "technology-internet-p07",
    "topicId": "technology-internet",
    "title": "Küresel Yarı İletken Endüstrisi",
    "content": "Yarı iletkenler, akıllı telefonlardan otomobillere, tıbbi cihazlardan ulusların güvenliği için bel bağladığı askeri sistemlere kadar her şeyi güçlendirerek modern uygarlığın temeli haline geldi. Milyarlarca transistörü barındıran bu minik çipler, atomlarla ölçülen hassasiyet gerektiren süreçlerle üretilen, insanlık tarafından üretilmiş en karmaşık nesneleri temsil ediyor. Yarı iletken teknolojisini kontrol etme konusundaki küresel rekabet, bu endüstriyi ekonomik refah ve dünya çapında ulusal güvenlik için sonuçları olan jeopolitik bir çatışma noktasına dönüştürdü.\n\nYarı iletken yolculuğu, 23 Aralık 1947'de New Jersey'deki Bell Labs'de, fizikçiler John Bardeen, Walter Brattain ve William Shockley'nin ilk transistörü göstermesiyle başladı. Bu cihaz, vakum tüplerinin ısısı ve kırılganlığı olmadan elektrik sinyallerini yükseltebiliyordu ve mucitlerine 1956'da Nobel Fizik Ödülü'nü kazandırdı. Transistörün minyatürleştirme potansiyeli, sonunda insan toplumunu yeniden şekillendiren dijital devrimi mümkün kılacaktı.\n\nTexas Instruments'tan Jack Kilby ve Fairchild Semiconductor'dan Robert Noyce, 1958 ve 1959'da bağımsız olarak entegre devreyi icat ederek, birden fazla transistörü tek bir yarı iletken malzeme üzerinde birleştirdi. Bu atılım, bireysel bileşenleri elle kablolama ihtiyacını ortadan kaldırdı ve ölçekli üretimi mümkün kıldı. Kilby, modern elektroniği mümkün kılan bu katkısından dolayı 2000 yılında Nobel Fizik Ödülü'nü aldı.\n\nIntel'in kurucu ortağı Gordon Moore, 1965'te entegre devrelerdeki transistör sayısının yaklaşık iki yılda bir ikiye katlanırken maliyetlerin sabit kaldığını gözlemledi. Moore Yasası olarak bilinen bu gözlem, endüstriye altı on yıllık üstel iyileşme boyunca rehberlik etti. Modern işlemciler, her biri yalnızca birkaç nanometre çapında, kabaca 20 silikon atomunun genişliğinde olan 100 milyardan fazla transistör içerir.\n\nYarı iletken üretim süreci, aylarca süren hassas işlemleri kapsayan yüzlerce adımdan oluşur. Mühendisler, 1400 santigrat derecenin üzerindeki sıcaklıklarda erimiş malzemeden yetiştirilen ultra saf silikon silindirleriyle başlar. Bu külçeler ince gofretler halinde kesilir ve atomik pürüzsüzlüğe kadar parlatılır. Fotolitografi, ultraviyole ışık kullanarak gofretler üzerine devre desenleri yansıtır; en gelişmiş makineler yalnızca 13,5 nanometre olan aşırı ultraviyole dalga boylarını kullanır.\n\nTaiwan Semiconductor Manufacturing Company, TSMC olarak bilinir, dünyanın en kritik yarı iletken üreticisi olarak ortaya çıkmıştır. Morris Chang tarafından 1987'de kurulan TSMC, diğer şirketler tarafından tasarlanan çiplerin üretiminde dökümhane modeline öncülük etti. 2023 itibarıyla TSMC, Apple, AMD ve Nvidia için işlemciler de dahil olmak üzere dünyanın en gelişmiş çiplerinin yüzde 90'ından fazlasını üretiyordu. Çin'den toprak talepleriyle karşı karşıya olan bir adadaki bu yetenek yoğunlaşması, önemli bir jeopolitik endişe haline geldi.\n\nGelişmiş yarı iletkenleri üretmek için gereken ekipman, hayret verici bir teknolojik başarıyı temsil ediyor. Hollandalı bir şirket olan ASML, her biri yaklaşık 200 milyon dolara mal olan ve 180.000 kilogram ağırlığında olan aşırı ultraviyole litografi makinelerinde tekel konumundadır. Bu sistemler, gereken hassas ışık dalga boylarını oluşturmak için 220.000 santigrat dereceye kadar ısıtılmış plazma kullanır. ASML, onlarca yıllık geliştirmeden sonra bu yeteneğe ulaşmak için optik tedarikçisi Zeiss, ışık kaynağı geliştiricisi Cymer ve çok sayıda başka ortaktan katkı aldı.\n\nSamsung Electronics ve Intel, gelişmiş üretim liderliği için TSMC ile rekabet ediyor, ancak her ikisi de son yıllarda geride kaldı. Samsung, çeşitli müşteriler için kendi ürünlerinin yanı sıra çipler üreten Güney Kore ve Teksas'ta büyük üretim tesisleri işletiyor. Tarihsel olarak teknoloji lideri olan Intel, üretim gecikmeleriyle mücadele etti ve 2021'den itibaren CEO Pat Gelsinger yönetiminde agresif yatırım planları açıklamadan önce pazar payı kaybetti.\n\nÇin, yarı iletken bağımsızlığını ulusal bir öncelik haline getirdi ve Ulusal Entegre Devre Endüstrisi Yatırım Fonu ve diğer programlar aracılığıyla 150 milyar doların üzerinde yatırım yaptı. Semiconductor Manufacturing International Corporation, Çin'in en gelişmiş yerli üreticisini temsil ediyor, ancak TSMC'nin birkaç nesil gerisinde kalmaya devam ediyor. Ekim 2022'de başlayan Amerikan ihracat kontrolleri, Çin'in gelişmiş üretim ekipmanlarına ve çip tasarımlarına erişimini kısıtlayarak yerli gelişim üzerindeki baskıyı yoğunlaştırıyor.\n\nOtomotiv endüstrisi, 2020'de başlayan küresel çip kıtlığı sırasında yarı iletkenlere tehlikeli bağımlılığını keşfetti. Pandemi kilitlenmeleri tedarik zincirlerini bozduğunda, otomobil üreticileri zayıf talep beklentisiyle siparişleri iptal etti. Talep beklenenden daha hızlı toparlandığında, yarı iletken fabrikaları kapasiteyi diğer müşterilere tahsis etmişti. General Motors, Ford ve Toyota, çip beklerken iki yıldan fazla bir süre boyunca üretim hatlarını aralıklı olarak kapattı. Kıtlık, otomotiv endüstrisine tahmini olarak 210 milyar dolarlık gelir kaybına mal oldu.\n\nDünya çapındaki hükümetler, yerli yarı iletken kapasitesi oluşturmak için büyük programlar başlattı. Amerika Birleşik Devletleri, Ağustos 2022'de yarı iletken üretimi ve araştırması için 52 milyar dolar ayıran CHIPS ve Bilim Yasası'nı kabul etti. Avrupa Çip Yasası, benzer hedeflere 43 milyar avro taahhüt etti. Japonya, TSMC, Samsung ve Micron fabrikalarını çekmek için 2 trilyon yen sübvansiyon açıkladı. Hindistan, ilk gelişmiş üretim tesisini arayan 10 milyar dolarlık bir program başlattı.\n\nBellek çipleri, mantık işlemcilerinden farklı oyuncuların hakim olduğu ayrı bir yarı iletken kategorisini temsil ediyor. Samsung, Güney Kore'den SK Hynix ve Amerika Birleşik Devletleri'nden Micron, bilgisayar belleği için DRAM pazarına hakim. Akıllı telefonlarda ve katı hal sürücülerinde veri depolayan flash bellek endüstrisi, aynı Koreli oyuncuların yanı sıra Japon üretici Kioxia'yı da içeriyor. Bellek fiyatları, arz ve talep döngüleriyle önemli ölçüde dalgalanarak yatırım kararlarını karmaşıklaştıran yükseliş ve düşüş kalıpları yaratır.\n\nYarı iletken tasarım endüstrisi, muazzam kaynaklara sahip birkaç önde gelen şirketin etrafında yoğunlaşmıştır. Jensen Huang tarafından 1993 yılında kurulan Nvidia, bir grafik kartı şirketinden dünya çapındaki veri merkezlerini güçlendiren çiplerle bir yapay zeka devi haline geldi. Şirketin piyasa değeri Haziran 2023'te bir trilyon doları aştı. Qualcomm, neredeyse her akıllı telefon üreticisine lisanslanan teknolojiyle mobil işlemcilere hakim. AMD, CEO Lisa Su yönetiminde kişisel bilgisayarlarda ve sunucularda Intel'e ciddi bir rakip olarak ortaya çıktı.\n\nYarı iletken ekipman tedarikçileri, endüstri ekosisteminin kritik ancak genellikle göz ardı edilen bir katmanını oluşturur. Amerika Birleşik Devletleri'nden Applied Materials, Lam Research ve KLA Corporation, üretim için gerekli olan biriktirme, aşındırma ve inceleme ekipmanları sağlar. Japonya'dan Tokyo Electron, kaplama ve temizleme sistemlerine katkıda bulunur. Bu şirketler, üretim hassasiyetinin sınırlarını zorlamak için yıllık olarak milyarlarca doları araştırma ve geliştirmeye yatırıyor.\n\nYarı iletken üretiminin çevresel ayak izi, endüstrinin giderek ele aldığı sürdürülebilirlik endişelerini artırıyor. Modern bir üretim tesisi, küçük bir şehre eşdeğer elektrik tüketir ve Tayvan'daki bazı tesisler 300.000 ev kadar güç kullanır. Su tüketimi, soğutma ve temizleme işlemleri için günlük milyonlarca galona ulaşır. Endüstri, çevresel etkiyi azaltmak için yenilenebilir enerji benimsenmesine ve su geri dönüşümüne kendini adamıştır; TSMC, 2050 yılına kadar net sıfır emisyon sözü vermiştir.\n\nGelişmiş paketleme teknolojileri, yarı iletken performansını tek başına transistör minyatürleştirmesinin ötesine genişletir. Çiplet mimarileri, birden fazla küçük çipi tek işlemci olarak işlev gören paketlerde birleştirir. Üç boyutlu istifleme, mikroskobik sütunlarla dikey olarak bağlanan çipleri yerleştirir. Bu teknikler, atomik sınırlara yaklaşmak geleneksel ölçeklendirmeyi tehdit etse bile sürekli iyileştirmeyi sağlar. AMD'nin en son işlemcileri, üretim maliyetlerini düşürürken performansı artıran çiplet tasarımları kullanır.\n\nYarı iletken üretiminin işgücü talepleri, endüstri genişlemesi için zorluklar yaratır. Üretim ekipmanlarını çalıştıran yetenekli teknisyenler, yıllarca süren eğitim gerektirir. Yeni nesil süreçler tasarlayan mühendislerin ileri derecelere ve uzmanlaşmış uzmanlığa ihtiyacı vardır. Amerika Birleşik Devletleri, onlarca yıllık üretim düşüşünden sonra özellikle sıkıntılarla karşı karşıyadır. Ülkelerin inşa etmek için yarıştıkları üretim tesislerinde personel çalıştırıp çalıştıramayacaklarını eğitim girişimleri ve göçmenlik politikaları belirleyecektir.\n\nÇipler, uluslar arasındaki teknolojik rekabette silah haline geldikçe, güvenlik endişeleri yarı iletken endüstrisine yayılıyor. Savunma sistemleri, gizli güvenlik açıklarından arınmış güvenilir çip kaynaklarına bağlıdır. Ekonomik refah, yapay zeka, otonom araçlar ve diğer gelişmekte olan uygulamalar için en gelişmiş teknolojilere erişim gerektirir. Yarı iletkenlerin stratejik önemi, hükümetlerin algılanan ulusal çıkarları korumak için ağır yatırım yapmaya ve ihracatı kısıtlamaya devam etmesini sağlar.\n\nÖnümüzdeki on yıl, yarı iletken endüstrisinin Doğu Asya'da yoğunlaşmaya devam edip etmeyeceğini veya küresel olarak çeşitlenip çeşitlenmeyeceğini belirleyecektir. Yeni üretim tesislerine yapılan muazzam yatırımların üretken hale gelmesi yıllar alacaktır. Transistörler temel fiziksel sınırlara yaklaştıkça teknolojik zorluklar artıyor. Kuantum işleme ve nöromorfik çipler de dahil olmak üzere yeni bilgi işlem paradigmaları, sonunda geleneksel yarı iletkenleri tamamlayabilir veya değiştirebilir. Endüstri hangi yönlere giderse gitsin, bu minik çipler öngörülebilir gelecekte modern yaşam için vazgeçilmez olmaya devam edecek.",
    "wordCount": 1219,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "When was the first transistor demonstrated at Bell Labs?",
        "options": [
          "December 23, 1945",
          "December 23, 1947",
          "December 23, 1950",
          "December 23, 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Which companies are mentioned as memory chip manufacturers? Select all that apply.",
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
        "question": "TSMC produced over 90 percent of the world's most advanced chips by 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "How much does an ASML extreme ultraviolet lithography machine cost (in millions of dollars)?",
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
        "question": "Who founded TSMC in 1987?",
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
        "question": "How much did the CHIPS and Science Act allocate for semiconductors in August 2022?",
        "options": [
          "32 billion dollars",
          "42 billion dollars",
          "52 billion dollars",
          "62 billion dollars"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "How much did the automotive chip shortage cost the industry in lost revenue (in billions of dollars)?",
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
        "question": "Nvidia's market capitalization exceeded one trillion dollars in June 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "What temperature is the plasma heated to in ASML EUV machines?",
        "options": [
          "22,000 degrees Celsius",
          "120,000 degrees Celsius",
          "220,000 degrees Celsius",
          "1,400 degrees Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "How many billion transistors do modern processors contain?",
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
        "question": "When did Jack Kilby invent the integrated circuit at Texas Instruments?",
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
    "title": "Yayın Medyasının Evrimi",
    "content": "Yayın medyası, insanlığın eğlence, eğitim ve bilgi tüketme biçimini temelden değiştirdi; fiziksel medyayı ve yayın programlarını, internete bağlı herhangi bir cihazdan neredeyse sınırsız içeriğe anında erişimle değiştirdi. 1990'larda grenli video klipleriyle başlayan bu teknolojik devrim, artık dünya çapında milyarlarca kullanıcıya ultra yüksek çözünürlüklü filmler, canlı konserler ve etkileşimli deneyimler sunuyor. Yayının hikayesi, sıkıştırma, bant genişliği ve iş modellerindeki gelişmelerin tüm sektörleri nasıl yeniden şekillendirdiğini ortaya koyuyor.\n\nYayının teknik temelleri, 1980'ler ve 1990'lar boyunca video sıkıştırma ve ağ protokolleri üzerine yapılan araştırmalardan doğdu. Hareketli Resim Uzmanları Grubu mühendisleri, dijital videoyu pratik hale getiren MPEG standartlarını geliştirdi; MPEG-1 1993'te ve MPEG-4 1998'de ortaya çıktı. Bu sıkıştırma algoritmaları, kareler arasındaki yedek bilgileri ortadan kaldırarak ve insan gözünün fark etmeyeceği ayrıntıları yaklaşık olarak tahmin ederek video dosyalarını yönetilebilir boyutlara indirdi. Bu tür bir sıkıştırma olmadan, yayın videosu, ağların sağlayabileceğinden çok daha fazla bant genişliği gerektirecekti.\n\nRealNetworks, 1995 yılında RealPlayer'ı piyasaya sürerek, erken internet bağlantıları üzerinden ses ve video yayıncılığına öncülük etti. Şirketin RealAudio formatı, radyo istasyonlarının ilk kez web üzerinden yayın yapmasına olanak sağladı. RealVideo, 1997'de onu izledi, ancak pul büyüklüğündeki, kesik kesik videolar modern yayına pek benzemiyordu. 2000 civarında zirvede olan RealPlayer, internete bağlı bilgisayarların %85'inden fazlasına kurulmuştu.\n\nApple, başlangıçta yerel video dosyalarını oynatmak için 1991'de piyasaya sürülen QuickTime ile yayıncılık arenasına girdi. Şirket, 1990'lar boyunca yayın özelliklerini ekledi ve Ocak 2001'de iTunes'u piyasaya sürerken bu teknolojiden yararlandı. iTunes başlangıçta müzik indirmeye odaklanmış olsa da, anında dijital erişime olan tüketici iştahını gösterdi. Apple, ilk yılında iTunes üzerinden 70 milyondan fazla şarkı sattı.\n\nEski PayPal çalışanları Chad Hurley, Steve Chen ve Jawed Karim tarafından Şubat 2005'te YouTube'un kurulması, video yayıncılığının ana akım döneminin başlangıcı oldu. Platform, teknik uzmanlığı olmayan sıradan kullanıcılar için video yükleme ve paylaşmayı basit hale getirdi. Karim'i San Diego Hayvanat Bahçesi'nde gösteren ilk video, 23 Nisan 2005'te yayınlandı. Google, YouTube'un potansiyelini fark etti ve şirketi kuruluşundan sadece on sekiz ay sonra, Ekim 2006'da 1.65 milyar dolara satın aldı.\n\nNetflix, 1997'de Reed Hastings ve Marc Randolph tarafından Scotts Valley, Kaliforniya'da kurulan bir DVD kiralama hizmeti olarak başladı. Şirket, 1999'da aylık abonelik ücreti karşılığında sınırsız kiralama hizmeti sunarak Blockbuster'ın kiralama başına modeline meydan okudu. Netflix, Ocak 2007'de yayın videosunu başlattı, başlangıçta DVD hizmetine ek olarak. Aboneler, disklerin gelmesini beklemeden sınırlı sayıda film ve televizyon programını doğrudan bilgisayarlarında izleyebiliyordu.\n\nİnternet hızları arttıkça ve içerik kütüphaneleri genişledikçe, DVD'lerden yayına geçiş 2010'lar boyunca hızlandı. Netflix, Şubat 2013'te eleştirmenlerce beğenilen ve yayın platformlarının yetenek ve kalite için geleneksel ağlarla rekabet edebileceğini gösteren House of Cards'ın yayınlanmasıyla orijinal programlar üretmeye başladı. Şirket, orijinal içeriğe büyük yatırım yaptı ve 2022'ye kadar programlamaya yıllık 17 milyar doların üzerinde harcama yaptı.\n\nSpotify, İsveçli kurucuları Daniel Ek ve Martin Lorentzon'un hizmeti Ekim 2008'de başlatmasının ardından müzik yayıncılığında devrim yarattı. Platform, hem ücretsiz reklam destekli dinleme hem de reklamsız premium abonelikler sundu. Spotify, korsanlığın yıkıcı etkisinden hala kurtulmakta olan bir sektörün ilk direncine rağmen, büyük plak şirketleriyle lisans anlaşmaları yaptı. Aralık 2023 itibarıyla Spotify, 602 milyon aylık aktif kullanıcı ve 236 milyondan fazla ücretli abone bildirdi.\n\nAmazon Prime Video, Amazon'un 2006'da Amazon Unbox haline gelen video hizmetini satın almasından doğdu. Şirket, Şubat 2011'den itibaren yayın videosunu Prime üyeliğiyle birlikte paketleyerek, daha önce yalnızca daha hızlı gönderi sunan aboneliğe değer kattı. Amazon, 2013 yılında orijinal içerik üretmeye başladı ve o zamandan beri yapımları için Emmy Ödülleri ve Akademi Ödülleri kazandı. Video yayıncılığının alışveriş avantajlarıyla birleşimi, benzersiz rekabet avantajları yaratıyor.\n\nDisney, Marvel, Star Wars, Pixar ve National Geographic mülkleri de dahil olmak üzere geniş içerik kütüphanesinden yararlanarak 12 Kasım 2019'da Disney Plus'ı başlattı. Hizmet, ilk gününde 10 milyon abone çekerek sevilen franchise'ların ve agresif fiyatlandırmanın gücünü gösterdi. Disney Plus, dört yıl içinde 160 milyondan fazla aboneye ulaştı, ancak şirket, ağır içerik yatırımlarından kaynaklanan ilk kayıplardan sonra karlılığa ulaşma konusunda baskı altında kaldı.\n\nCanlı yayın, eğlencenin ötesine geçerek oyun, eğitim, fitness ve sayısız başka alanı kapsayacak şekilde genişledi. 2011'de kurulan ve 2014'te Amazon tarafından 970 milyon dolara satın alınan Twitch, canlı video oyunu yayınını popüler hale getirdi. Profesyonel oyuncular, abonelikler ve bağışlar yoluyla gelir elde ederken milyonlarca izleyiciye yayın yapıyor. Platform, 2023'e kadar günde ortalama 31 milyondan fazla ziyaretçi alarak genç izleyiciler için geleneksel spor yayınlarıyla rekabet ediyor.\n\nTeknik yenilikler, yayın kalitesini ve verimliliğini artırmaya devam ediyor. Uyarlanabilir bit hızı yayını, mevcut bant genişliğine göre video kalitesini otomatik olarak ayarlayarak, bağlantılar izin verdiğinde çözünürlüğü en üst düzeye çıkarırken arabelleğe almayı önler. İçerik dağıtım ağları, sunucuları izleyicilere coğrafi olarak yakın konumlandırarak gecikmeyi azaltır ve güvenilirliği artırır. H.265 ve AV1 dahil olmak üzere codec iyileştirmeleri, sınırlı bağlantılarda bile 4K ve 8K yayını sağlayarak daha düşük bit hızlarında daha yüksek kalite sunar.\n\nYayın hizmetlerini destekleyen altyapı, veri merkezlerine ve ağ kapasitesine büyük yatırım gerektiriyor. Netflix içerik dağıtımı, uzun mesafeli veri aktarımını azaltmak için popüler başlıkların kopyalarını yerel olarak depolayarak internet servis sağlayıcı ağları içindeki sunucularda bulunur. Akşamın yoğun saatlerinde, yayın videosu Kuzey Amerika'daki internet trafiğinin %60'ından fazlasını oluşturuyor. Bu yoğunlaşma, ağ tarafsızlığı ve yayın hizmetlerinin öncelikli dağıtım için ödeme yapıp yapmaması gerektiği konusunda tartışmalara yol açtı.\n\nMüzik yayıncılığı, sanatçıların gelir elde etme ve plak şirketlerinin çalışma şeklini temelden değiştirdi. Spotify, sanatçılara yayın başına yaklaşık 0,003 ila 0,005 dolar ödüyor ve anlamlı gelir elde etmek için milyonlarca kez çalınması gerekiyor. Bu model, büyük, ilgili takipçileri olan sanatçıları desteklerken, yükselen müzisyenlerin kariyerlerini sürdürmesini zorlaştırıyor. Taylor Swift, nihayetinde geri dönmeden önce, yayıncılığın ekonomisini protesto ederek, 2014'ten 2017'ye kadar müziğini Spotify'dan kaldırdı.\n\nPodcast yayını, niş bir mecradan milyarlarca dolarlık yatırım çeken büyük bir içerik kategorisine dönüştü. Spotify, Şubat 2019'da podcast şirketleri Gimlet Media ve Anchor'u toplamda yaklaşık 340 milyon dolara satın aldı. 2005'ten itibaren iTunes entegrasyonu yoluyla podcast'leri popüler hale getiren Apple, Spotify ve Amazon'dan artan rekabetle karşı karşıya. 2023 itibarıyla 48 milyondan fazla bölüm içeren 2 milyondan fazla podcast vardı.\n\nGeleneksel medya şirketleri rekabet eden hizmetler başlattıkça yayın savaşları yoğunlaştı. HBO Max, Paramount Plus, Peacock ve Apple TV Plus, 2019 ile 2020 arasında pazara girdi. Bu parçalanma, tüketicileri tüm istedikleri içeriğe erişmek için birden fazla hizmete abone olmaya zorlayarak, ironik bir şekilde yayının başlangıçta ortadan kaldırmayı vaat ettiği kablolu televizyon paketlerinin bazı rahatsızlıklarını yeniden yaratıyor. Sektör analistleri, daha küçük hizmetler rekabet etmekte zorlanırken konsolidasyonun olacağını tahmin ediyor.\n\nUluslararası genişleme, yayın platformları için hem fırsatlar hem de zorluklar sunuyor. Netflix, 190'dan fazla ülkede faaliyet gösteriyor ve düzinelerce dilde içerik üretiyor. Kore dizisi Squid Game, Eylül 2021'de Netflix'in şimdiye kadar en çok izlenen şovu oldu ve İngilizce olmayan içeriğe küresel iştahı gösterdi. Hindistan'daki Hotstar, Çin'deki iQiyi ve Brezilya'daki Globoplay gibi yerel rakipler, kendi pazarlarında güçlü konumlarını koruyor.\n\nYayın hizmetleriyle ilgili düzenleyici kaygılar, baskın eğlence platformları haline geldikçe artıyor. Veri gizliliği, içerik denetimi, çalışma uygulamaları ve pazar yoğunlaşması ile ilgili sorular politika yapıcıların dikkatini çekiyor. Avrupa Birliği, yayın hizmetlerinin kataloglarının %30'unun Avrupa eserlerinden oluşmasını sağlamasını gerektiriyor. Bazı ülkeler, yerel içerik üretimini finanse etmek için yayın aboneliklerine vergi uyguluyor.\n\nYayının geleceği, daha fazla etkileşim, sürükleyicilik ve kişiselleştirmeye işaret ediyor. Microsoft, Sony ve diğer şirketlerin bulut oyun hizmetleri, pahalı donanım gerektirmeden video oyunları yayınlıyor. Sanal gerçeklik deneyimleri sonunda hafif kulaklıklara yayınlanabilir. Yapay zeka algoritmaları, önerileri iyileştirmeye ve potansiyel olarak kişiselleştirilmiş içerik oluşturmaya devam edecek. Hangi özel teknolojiler ortaya çıkarsa çıksın, yayın, yaratıcılar ve izleyiciler arasındaki ilişkiyi kalıcı olarak dönüştürdü.",
    "wordCount": 1172,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "When did Netflix launch its streaming video service?",
        "options": [
          "January 2005",
          "January 2007",
          "January 2009",
          "January 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Which companies founded major streaming platforms? Select all that apply.",
        "options": [
          "Chad Hurley co-founded YouTube",
          "Reed Hastings co-founded Netflix",
          "Daniel Ek co-founded Spotify",
          "Bill Gates founded Disney Plus"
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
        "question": "Google acquired YouTube for 1.65 billion dollars in October 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "How many million subscribers did Spotify report as paying subscribers by December 2023?",
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
        "question": "When was the first YouTube video uploaded?",
        "options": [
          "February 14, 2005",
          "April 23, 2005",
          "July 4, 2005",
          "October 9, 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "How many subscribers did Disney Plus attract on its first day?",
        "options": [
          "1 million",
          "5 million",
          "10 million",
          "20 million"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "How much did Amazon pay to acquire Twitch in 2014 (in millions of dollars)?",
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
        "question": "Netflix began as a DVD-by-mail rental service in 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Which Netflix original series was released in February 2013?",
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
        "question": "What percentage of internet traffic in North America does streaming video account for during peak hours?",
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
        "question": "Which Korean series became Netflix's most-watched show ever in September 2021?",
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
    "title": "Arama Motorlarının Bilimi",
    "content": "Arama motorları, insanlığın internet üzerindeki devasa bilgi havuzuna eriştiği başlıca kapılar haline geldi. Her gün milyarlarca sorguyu işleyerek insanların dünyayı nasıl keşfettiğini, değerlendirdiğini ve anladığını şekillendiriyorlar. Bu sistemlere güç veren karmaşık algoritmalar, bilgi erişimi, doğal dil işleme, makine öğrenimi ve dağıtık bilişimden teknikleri birleştiren, şimdiye kadar geliştirilmiş en karmaşık yazılımlardan bazılarını temsil ediyor. Arama motorlarının nasıl çalıştığını anlamak, hem onların olağanüstü yeteneklerini hem de insan bilgisi ve davranışı üzerindeki derin etkilerini ortaya koyuyor.\n\nWeb aramasının kökenleri, internetin manuel olarak derlenen dizinler için çok büyüdüğü 1990'ların başlarına dayanır. Alan Emtage tarafından 1990'da Montreal'deki McGill Üniversitesi'nde oluşturulan Archie, FTP sunucularındaki dosya adlarını indeksliyordu ancak web sayfalarını aramıyordu. Matthew Gray tarafından 1993'te MIT'de geliştirilen World Wide Web Wanderer, internetin büyümesini sayfaları otomatik olarak ziyaret ederek ölçen ilk web tarayıcısı oldu. Bu ilkel araçlar, daha karmaşık sistemlerin temelini attı.\n\nAltaVista, Aralık 1995'te piyasaya sürüldü ve hızla çağının lider arama motoru haline geldi. Palo Alto, Kaliforniya'daki Digital Equipment Corporation'daki araştırmacılar tarafından geliştirilen AltaVista, tam metin indeksleme kullanarak 20 milyon web sayfasından oluşan bir veritabanını arayabiliyordu. Kullanıcılar, milyonlarca belge arasında yapılan sorgular için saniyeler içinde görünen sonuçlara hayran kalıyordu. AltaVista, 1997'deki zirvesinde günde 80 milyon arama sorgusunu işliyordu.\n\nLarry Page ve Sergey Brin, 1996'da Stanford Üniversitesi araştırma projesi olarak Google'ı yarattı ve aramayı dönüştürecek PageRank algoritmasını tanıttı. Onların içgörüsü, web sayfaları arasındaki bağlantıların alaka ve otorite hakkında değerli bilgiler içerdiğiydi. Özellikle önemli sayfalar tarafından bağlantı verilen bir sayfa, az bağlantısı olan bir sayfadan daha yüksek sıralamada yer almalıdır. Bu yaklaşım, sayfaları öncelikle anahtar kelime sıklığına göre sıralayan rakiplerinden önemli ölçüde daha iyi sonuçlar üretti.\n\nPageRank, rastgele bağlantıları tıklayan ve zaman zaman tamamen rastgele bir sayfaya atlayan rastgele bir web sörfçüsünü simüle eder. Bu varsayımsal sörfçünün herhangi bir sayfayı ziyaret etme olasılığı, PageRank puanı olur. Yüksek PageRank'li sayfalardan birçok bağlantı alan sayfalar, kendileri daha yüksek puanlar toplar. Page ve Brin'in doktora öğrencisiyken yayınladıkları 1998 tarihli makalesinde ayrıntılı olarak açıklanan bu matematiksel model, sayısız sonraki iyileştirmelere rağmen Google'ın sıralamasının temelini oluşturmaya devam ediyor.\n\nWeb tarama işlemi, örümcekler veya tarayıcılar olarak adlandırılan otomatik programların ziyaret ettiği bilinen URL'lerin bir listesiyle başlar. Tarayıcı, her sayfanın içeriğini indirir ve içerdiği tüm köprüleri çıkarır. Yeni URL'ler, gelecekteki tarama için sıraya eklenir. Başlangıçta BackRub ve daha sonra Googlebot olarak adlandırılan Google'ın tarayıcısı, sıklıkla güncellenen sitelere ve birçok gelen bağlantıya sahip olanlara öncelik vererek sürekli olarak milyarlarca sayfayı ziyaret ediyor. Web'in tam bir taraması haftalar sürer, ancak popüler sayfalar çok daha sık yeniden taranır.\n\nİndeksleme, ham web sayfası içeriğini hızlı erişimi sağlayan yapılandırılmış verilere dönüştürür. Arama motorları, her kelimeyi onu içeren belgelerin listesine eşleyen ters indeksler oluşturur. Bir terim aradığınızda, motor her belgeyi taramak yerine o terimin gönderi listesini arar. Ek veri yapıları, ifade eşleştirme için kelime konumları, gelen bağlantılardan gelen bağlantı metni ve sayfa başlıkları ve değişiklik tarihleri ​​gibi meta veriler hakkında bilgi depolar.\n\nSorgu işleme, kullanıcıların arama terimlerini yazarken aslında ne istediklerini yorumlar. Doğal dil anlama, arama motorlarının koşu ayakkabıları için yapılan bir aramanın, koşuşturan ayakkabılar hakkında bilgi yerine muhtemelen ürün aradığını anlamasına yardımcı olur. Varlık tanıma, kişiler, yerler, kuruluşlar ve kavramlar için yapılan aramaları tanımlar. Sorgu genişletme, geri çağırmayı iyileştirmek için eşanlamlıları ve ilgili terimleri ekler. Yazım denetimi, aramaları yürütmeden önce yazım hatalarını düzeltir ve Google tüm sorguların yaklaşık yüzde 10'unu düzeltir.\n\nSıralama algoritmaları, her sorguyu en iyi yanıtlayan sayfaları belirlemek için yüzlerce sinyali birleştirir. PageRank'in ötesinde Google, başlık ve başlıklardaki anahtar kelime varlığı, içerik tazeliği, mobil uyumluluk, sayfa yükleme hızı ve coğrafi alaka düzeyi gibi faktörleri dikkate alır. Kullanıcı davranışının geniş veri kümeleri üzerinde eğitilmiş makine öğrenimi modelleri, büyük ölçüde el yapımı sıralama formüllerinin yerini almıştır. 2015'te tanıtılan RankBrain, belirsiz sorguları yorumlamak ve alakalı sonuçları belirlemek için sinir ağlarını kullanır.\n\nKullanıcı davranışı, arama motorlarının sıralamaları iyileştirmek için kullandığı çok önemli geri bildirim sağlar. Tıklama oranları, kullanıcıların hangi sonuçları umut verici bulduğunu gösterir. Tıkladıktan sonra sayfalarda geçirilen süre, sonuçların sorguyu tatmin edip etmediğini gösterir. Arama sonuçlarına geri dönme ve farklı bağlantıları tıklama örüntüsü olan pogo-çubuklama, ilk sonuçların yardımcı olmadığını gösterir. Arama motorları, algoritmalarını iyileştirmek için her gün bu tür milyarlarca sinyali analiz eder.\n\nBilgi grafikleri, varlıklar ve aralarındaki ilişkiler hakkında yapılandırılmış veritabanlarında bilgi temsil eder. Google'ın Mayıs 2012'de tanıtılan Bilgi Grafiği, kişiler, yerler, şeyler ve kavramlar hakkında milyarlarca gerçek içerir. Ünlü bir kişiyi aradığınızda, sonuçların yanında görünen bilgi paneli bu yapılandırılmış verilerden yararlanır. Wikimedia Vakfı tarafından işletilen işbirlikçi bir bilgi tabanı olan Wikidata, bu sistemlere önemli ölçüde katkıda bulunur.\n\nÖne çıkan snippet'ler ve doğrudan yanıtlar, kullanıcıların web sitelerine tıklamasını gerektirmeden sorguları karşılamayı amaçlar. Google, web sayfalarından alakalı pasajları çıkarır ve bunları sorular için belirgin bir şekilde görüntüler. Sesli asistanlar, yalnızca sesli cihazlarda kullanıcılar bağlantıları tıklayamadığından, bu doğrudan yanıtlara büyük ölçüde güvenir. Yayıncılar, öne çıkan snippet'lerin trafiği yönlendirerek yardımcı olup olmadığını veya azaltarak zarar verip vermediğini tartışıyor ve bazıları snippet seçiminden tamamen vazgeçiyor.\n\nYerel arama, sorguları yakındaki işletmelere ve hizmetlere bağlar. Birisi kahve dükkanlarını veya tesisatçıları aradığında, arama motoru alakalı yerel seçenekleri göstermek için konumlarını dahil eder. Google Benim İşletmem profilleri, işletmelerin doğrudan bilgi sağlamasına olanak tanır. Çeşitli kaynaklardan toplanan incelemeler, kullanıcıların seçenekler arasında seçim yapmasına yardımcı olur. Yerel arama, reklam yoluyla önemli miktarda gelir elde eder ve işletmeler ticari sorgular için belirgin bir şekilde görünmek için ödeme yapar.\n\nArama reklamcılığı, Google'ı dünyanın en değerli şirketlerinden birine dönüştürdü. Reklamverenler anahtar kelimelere teklif verir ve yalnızca kullanıcılar reklamlarını tıkladığında ödeme yapar. Google'ın açık artırma sistemi, hangi reklamların görüneceğini ve hangi sırada görüneceğini belirlemek için hem teklif tutarlarını hem de reklam kalitesini dikkate alır. Arama reklamcılığı, Google'ın ana şirketi Alphabet için 2022'de 162 milyar dolardan fazla gelir elde etti. Bu iş modeli, kullanıcıların arama sonuçlarıyla etkileşimini en üst düzeye çıkarmak için teşvikler yaratır.\n\nSpam ve manipülasyon, en eski günlerinden beri arama motorlarını rahatsız etti. Vicdansız web sitesi operatörleri, sayfaları gizli anahtar kelimelerle doldurur, yapay bağlantılardan oluşan ağlar oluşturur ve sıralamaları bozmak için sayısız başka taktik kullanır. Arama motorları, bu tür manipülasyona karşı sürekli bir silahlanma yarışına girer. Google'ın Nisan 2012'deki Penguin güncellemesi, doğal olmayan bağlantı desenlerine sahip siteleri cezalandırdı. Şirket, arama sonuçlarını ayrıntılı yönergelere göre değerlendiren binlerce kalite derecelendiricisi çalıştırıyor.\n\nGizlilik endişeleri, arama motorlarının kullanıcı sorguları ve davranışları hakkında topladığı çok büyük veriyi kuşatır. Arama geçmişleri, sağlık sorunlarını, mali durumları, ilişki sorunlarını ve sayısız diğer mahrem ayrıntıyı ortaya çıkarır. Google, varsayılan olarak hesaplara bağlı arama verilerini saklar ve bunları kişiselleştirme ve reklam hedefleme için kullanır. DuckDuckGo gibi alternatifler, bazı kişiselleştirme yeteneklerinden ödün verseler de, kullanıcıları izlememe sözü vererek kendilerini farklılaştırır.\n\nArama motoru rekabeti, dünya çapındaki düzenleyici incelemeye rağmen sınırlı kalmıştır. StatCounter'dan 2023 verilerine göre Google, küresel arama motoru pazar payının yaklaşık yüzde 91'ini elinde tutuyor. Microsoft'un arama motoru Bing, küresel olarak yaklaşık yüzde 3'lük bir paya sahip ancak Amerika Birleşik Devletleri'nde daha iyi performans gösteriyor. Çin'deki Baidu ve Rusya'daki Yandex dahil olmak üzere bölgesel alternatifler, kendi pazarlarına hakim. Avrupa Birliği, Haziran 2017'de Google'a, kendi alışveriş karşılaştırma hizmetini arama sonuçlarında desteklediği için 2,42 milyar avro para cezası verdi.\n\nYapay zeka, doğal dili anlayan ve üreten büyük dil modelleri aracılığıyla aramayı dönüştürüyor. ChatGPT'nin Kasım 2022'deki lansmanı, konuşma yapay zekasının geleneksel aramayı bozabileceği endişelerini tetikledi. Microsoft, Şubat 2023'te GPT-4'ü Bing'e entegre etti. Google, Bard ve ardından Gemini ile yanıt verdi. Bu sistemler, birden çok kaynaktan bilgi sentezleyebilir ve diyaloga girebilir, bu da insanların çevrimiçi bilgi bulma şeklini potansiyel olarak değiştirebilir.\n\nAramanın geleceği, metin sorgularının ötesine, görüntülere, sese ve çok modlu girdilere uzanıyor. Google Lens, akıllı telefon kameralarını kullanarak arama yapmaya, nesneleri tanımlamaya, metin çevirmeye ve görüntülerden matematik problemlerini çözmeye olanak tanır. Akıllı hoparlörler ve akıllı telefonlar aracılığıyla yapılan sesli aramalar, sorguların giderek artan bir payını oluşturuyor. Arama motorları, kullanıcıların beklediği hızı ve doğruluğu korurken yeni cihazlara ve etkileşim kalıplarına uyum sağlamalıdır.",
    "wordCount": 1244,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Who created the first web crawler called World Wide Web Wanderer in 1993?",
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
        "question": "Which factors do search engines consider when ranking pages? Select all that apply.",
        "options": [
          "PageRank link analysis",
          "Content freshness",
          "Page loading speed",
          "File size only"
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
        "question": "AltaVista processed 80 million search queries per day at its peak in 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "What percentage of global search market share does Google hold according to 2023 data?",
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
        "question": "When was Google's Knowledge Graph introduced?",
        "options": [
          "May 2010",
          "May 2012",
          "May 2014",
          "May 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "When did Google's Penguin update penalize sites with unnatural link patterns?",
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
        "question": "How much revenue did search advertising generate for Alphabet in 2022 (in billions of dollars)?",
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
        "question": "Google corrects approximately 10 percent of all search queries for spelling errors.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "When did Microsoft integrate GPT-4 into Bing?",
        "options": [
          "November 2022",
          "February 2023",
          "June 2023",
          "October 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "How much did the European Union fine Google in June 2017 (in billions of euros)?",
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
        "question": "When was RankBrain introduced by Google?",
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
        "question": "When did AltaVista launch?",
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
    "title": "Otonom Araçlar ve Ulaşımın Geleceği",
    "content": "Otonom araçlar, kazaları azaltabilecek, şehir manzaralarını dönüştürebilecek ve insanlığın insanları ve malları küçük ve büyük mesafelerde nasıl hareket ettirdiğini temelden değiştirebilecek kendi kendine sürüş teknolojisiyle ulaşımda devrim yaratma vaadi sunuyor. Bu iddialı vizyon, otomobil üreticilerinden, teknoloji devlerinden ve ilgili devasa teknik, düzenleyici ve sosyal zorlukları çözmek için yarışan start-up'lardan yüz milyarlarca dolarlık yatırım çekti. Gerçekten otonom araçlara doğru yolculuk, bu dönüştürücü teknolojinin mevcut durumunu ve kendi kendine giden arabaların yaygınlaşmasından önce kalan engelleri ortaya koyuyor.\n\nKendi kendine giden araçların hayali, dijital bilgisayarın kendisinden bile önceye dayanıyor. Norman Bel Geddes, 1939'da New York'ta düzenlenen Dünya Fuarı'nda, arabaların 1960'lara kadar insan müdahalesi olmadan güvenli bir şekilde seyahat edeceği otomatik otoyolları tasvir eden Futurama sergisini sundu. Serginin sponsoru olan General Motors, daha sonra 1964'te yollara gömülü kabloları takip edebilen elektronik yönlendirme sistemlerine sahip Firebird IV konsept otomobilini geliştirmek için RCA ile ortaklık kurdu. Bu ilk vizyonlar, araç zekasından ziyade altyapı değişiklikleri gerektiriyordu.\n\nModern otonom araç geliştirme, 2004'ten itibaren akademik ve endüstri araştırmalarını katalize eden DARPA Büyük Mücadelesi yarışmalarıyla başladı. Mojave Çölü'nde düzenlenen ilk mücadele, insan müdahalesi olmadan 240 kilometrelik (150 mil) bir parkuru tamamlayabilecek herhangi bir araca bir milyon dolar ödül teklif etti. Tüm katılımcılar başarısız oldu ve en uzağa giden araç, takılmadan önce yalnızca 12 kilometre (7.4 mil) yol katetti. 2005'teki mücadelede beş araç parkuru tamamladı ve Stanford Üniversitesi'nden Stanley 6 saat 53 dakikada kazandı.\n\nOtomotiv Mühendisleri Topluluğu, endüstri standardı haline gelen altı sürüş otomasyonu seviyesini tanımlar. Seviye 0, hiçbir otomasyon olmadığı, tüm sürüş görevlerini insanların kontrol ettiği anlamına gelir. Seviye 1, adaptif hız sabitleyici gibi temel yardımları içerir. Seviye 2, birden fazla yardım özelliğini birleştirir, ancak sürekli insan gözetimi gerektirir. Seviye 3, insanın müdahale etmeye hazır kalması koşuluyla, aracın sınırlı koşullarda tüm sürüşü gerçekleştirmesine olanak tanır. Seviye 4, tanımlanmış operasyonel alanlarda tam otomasyona ulaşır. Seviye 5, her koşulda tam otomasyon, her yerde insan yeteneğini eşleştirme veya aşma anlamına gelir.\n\nSensör sistemleri, otonom araçlara güvenli navigasyon için gerekli algılama yeteneklerini sağlar. Kameralar, şeritler, işaretler, trafik ışıkları ve diğer yol kullanıcıları hakkında görsel bilgiler yakalar. Radar, aydınlatma veya hava koşullarından bağımsız olarak çalışan radyo dalgaları aracılığıyla yakındaki nesnelerin hızını ve mesafesini ölçer. Lidar, çevrenin ayrıntılı üç boyutlu haritalarını oluşturmak için lazer darbeleri kullanır ve bazı sistemler saniyede iki milyondan fazla veri noktası üretir. Ultrasonik sensörler, park manevraları sırasında yakın mesafedeki engelleri algılar.\n\nAlphabet'in otonom araç iştiraki olan Waymo, 2009'da başlayan Google kendi kendine giden araba projesinden doğdu. Stanford'un DARPA'yı kazanan ekibine liderlik eden Sebastian Thrun, ilk araştırmayı yönetti. Proje, Waymo'nun Aralık 2018'de Phoenix, Arizona'da ticari robotaksi hizmetini başlatmadan önce birden fazla eyalette milyonlarca test mili biriktirdi. Ekim 2023'e kadar Waymo araçları, öncelikle Phoenix ve San Francisco'da olmak üzere, halka açık yollarda güvenlik sürücüleri olmadan 11,2 milyon kilometreden (7 milyon milden) fazla yol katetti.\n\nTesla, Autopilot ve Tam Otonom Sürüş sistemleri aracılığıyla otonomiye farklı bir yaklaşım izledi. Tesla, pahalı lidar yerine, milyonlarca müşteri aracından elde edilen veriler üzerinde eğitilmiş kameralara ve bilgisayar görüşüne güveniyor. CEO Elon Musk, sürekli olarak yakın zamanda tam otonomi olacağını tahmin ederek, 2016'da bir Tesla'nın 2017'ye kadar Los Angeles'tan New York'a kendiliğinden gideceğini iddia etti. Bu tahmin ve sonraki birçok tahmin gerçekleşmedi, ancak Tesla araçları giderek daha yetenekli sürücü yardım özellikleri sunuyor.\n\nÇoğunluğu General Motors'a ait olan Cruise, bir aracın bir yayaya çarpıp sürüklediği bir olayın ardından Kaliforniya Motorlu Taşıtlar Departmanı'nın Ekim 2023'te izinlerini iptal etmesine kadar San Francisco'da robotaksi hizmetleri işletiyordu. Şirket, birden fazla şehirde yüzlerce araç işleten agresif bir şekilde genişlemişti. İzin iptali, sektörün karşılaştığı düzenleyici zorlukları ve ölçekte güvenliği sağlamanın zorluğunu vurguladı.\n\nÇinli şirketler, otonom araç geliştirme alanında önemli oyuncular olarak ortaya çıktı. Baidu'nun Apollo platformu 2017'de geliştirilmeye başlandı ve 100 milyon kilometreden fazla yol testi biriktirdi. 2016 yılında kurulan Pony.ai, birden fazla Çin şehri ve Kaliforniya'da robotaksi hizmetleri işletiyor. WeRide, Nissan ile ortaklık kurdu ve Orta Doğu'da operasyonlar kurdu. Wuhan, Guangzhou ve Shenzhen dahil olmak üzere Çin şehirleri, önemli kentsel alanları kapsayan ticari robotaksi operasyonlarına izin verdi.\n\nOtonom araçları süren yapay zeka sistemleri, olağanüstü karmaşıklıkla başa çıkmalıdır. Bilgisayar görüşü algoritmaları, yayalar ve bisikletlilerden inşaat alanlarına ve acil durum araçlarına kadar binlerce nesne türünü tanımlar ve sınıflandırır. Tahmin modelleri, diğer yol kullanıcılarının önümüzdeki birkaç saniye içinde nasıl davranacağını tahmin eder. Planlama algoritmaları, hedeflere güvenli ve verimli bir şekilde ulaşan yörüngeler seçer. Tüm bu hesaplamalar, belirsizliği ve nadir senaryoları hesaba katarken milisaniyeler içinde yürütülmelidir.\n\nUç durumlar, otonom sistemler için özel zorluklar yaratır. Bir otoyolda uçuşan bir plastik torba ve yola koşan bir çocuk sensörlere benzer görünebilir, ancak tamamen farklı yanıtlar gerektirir. El hareketleriyle trafiği yöneten inşaat işçileri, normal trafik kurallarını geçersiz kılar. Gizlenmiş açılardan yaklaşan acil durum araçları, acil eylem gerektirir. Eğitim verileri muhtemelen her senaryoyu kapsayamaz ve araçların benzer deneyimlerden uygun şekilde genelleme yapmasını gerektirir.\n\nGüvenlik doğrulaması, otonom araçların konuşlandırılmaya hazır olduğunu nasıl göstereceğimiz konusunda temel sorular ortaya koymaktadır. İnsan sürücüler, Amerika Birleşik Devletleri'nde ortalama olarak her 160 milyon kilometrede (100 milyon mil) bir ölümcül kazaya neden olmaktadır. İstatistiksel olarak bir otonom sistemin bu ölçütü karşıladığını veya aştığını kanıtlamak, pratik olmayan bir standart olan milyarlarca test mili gerektirecektir. Şirketler bunun yerine simülasyon, kapalı devre testi ve aşamalı dağıtım kullanırken gerçek dünya performansını sürekli olarak izlerler.\n\nOtonom araçlar için düzenleyici çerçeveler, yargı bölgeleri arasında önemli ölçüde farklılık gösterir. Kaliforniya, insan güvenlik sürücülerinin kontrolü ele geçirmesi durumunda şirketlerin bağlantıyı kesmeleri bildirmesini şart koşuyor. Arizona, test faaliyetlerini çeken izin verici bir yaklaşım benimsedi. Almanya, 2021'de belirli koşullar altında Seviye 4 araçlara halka açık yollarda izin veren bir yasa çıkardı. Çin, bazı şehirleri kademeli olarak genişleyen operasyonel alanlara sahip test bölgeleri olarak belirledi. Bu düzenlemeler mozaiği, uluslararası dağıtım stratejilerini karmaşıklaştırmaktadır.\n\nOtonom araçların potansiyel faydaları, rahatlığın çok ötesine uzanmaktadır. Araç kazaları dünya çapında yılda yaklaşık 1,35 milyon insanı öldürmektedir ve insan hatası kazaların yüzde 90'ından fazlasına katkıda bulunmaktadır. Otonom sistemlerin dikkati dağılmaz, yorulmaz veya bozulmaz. Güvenlik performansları insan sürücüleri aşarsa bu sayıyı önemli ölçüde azaltabilirler. Ulaşım, şu anda kendileri araç kullanamayan yaşlı, engelli ve genç nüfus için erişilebilir hale gelecektir.\n\nOtonom ulaşımın ekonomik etkileri, tüm sektörleri yeniden şekillendirebilir. Kamyon şoförleri, taksi operatörleri ve dağıtım işçileri de dahil olmak üzere profesyonel sürücüler potansiyel yer değiştirme ile karşı karşıyadır. Uber ve Lyft gibi araç çağırma şirketleri, en büyük maliyetlerini ortadan kaldırmak umuduyla otonomiye büyük yatırım yapmaktadır. İnsan sürücülerin artık araçları kontrol etmediği durumlarda sigorta modelleri uyum sağlamalıdır. Şehir planlamacıları, paylaşımlı otonom araçlar toplam araç sayılarını azaltırken, daha az otopark ve daha dar yollara sahip şehirler öngörmektedir.\n\nKamyon uygulamaları, daha öngörülebilir otoyol ortamları nedeniyle yolcu robotaksilerinden önce ticari uygulanabilirlik elde edebilir. Google, Tesla ve Uber otonom programlarının eski liderleri tarafından kurulan Aurora, öncelikle kargoya odaklanmaktadır. TuSimple, 2023'te finansal zorluklar stratejik bir yeniden yapılandırmaya zorlamadan önce Phoenix ve Dallas arasında tamamen otonom otoyol seferleri gerçekleştirdi. Embark, Kodiak ve çok sayıda başka şirket benzer uzun yol kamyonu uygulamaları izlemektedir.\n\nOtonom araçların yaygın olarak benimsenmesi için zaman çizelgesi, onlarca yıllık geliştirme ve büyük yatırıma rağmen hala oldukça belirsizliğini koruyor. 2010'ların ortalarından itibaren yapılan iyimser projeksiyonlar, 2020'lerin başlarında her yerde bulunan robotaksileri öngörüyordu. Gerçeklik, beklenenden çok daha zorlu olduğunu kanıtladı. Sektör uzmanları artık genel olarak ani bir dönüşümden ziyade onlarca yıl boyunca kademeli bir dağıtım bekliyor. Teknoloji muhtemelen artımlı olarak iyileşecek ve sınırlı operasyonel alanlardan yıllar içinde daha geniş yeteneklere doğru genişleyecektir.",
    "wordCount": 1173,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "When was the first DARPA Grand Challenge held?",
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
        "question": "Which sensor types do autonomous vehicles use? Select all that apply.",
        "options": [
          "Cameras",
          "Radar",
          "Lidar",
          "X-ray sensors"
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
        "question": "Stanford University's vehicle named Stanley won the 2005 DARPA Grand Challenge.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "How many miles had Waymo vehicles driven without safety drivers by October 2023 (in millions)?",
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
        "question": "When did Waymo launch commercial robotaxi service in Phoenix?",
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
        "question": "How many levels of driving automation does the Society of Automotive Engineers define?",
        "options": [
          "Four",
          "Five",
          "Six",
          "Seven"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "How many people are killed annually in vehicle crashes worldwide (in millions)?",
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
        "question": "Human error contributes to over 90 percent of vehicle accidents.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "When did Germany pass legislation allowing Level 4 vehicles on public roads?",
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
        "question": "How many miles did the farthest vehicle travel in the 2004 DARPA Grand Challenge?",
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
        "question": "When did Baidu's Apollo autonomous driving platform begin development?",
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
        "question": "When was the Futurama exhibit at the World's Fair?",
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
        "question": "How many data points per second can some lidar systems generate (in millions)?",
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
        "question": "When did the California DMV revoke Cruise's autonomous vehicle permits?",
        "options": [
          "October 2022",
          "October 2023",
          "January 2023",
          "June 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
