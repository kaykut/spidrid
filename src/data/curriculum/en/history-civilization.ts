import { Article } from '../../../types/learning';

export const HISTORY_CIVILIZATION_ARTICLES: Article[] = [
  {
    id: 'history-civilization-p01',
    topicId: 'history-civilization',
    title: 'Ancient Egypt: Land of the Pharaohs',
    difficulty: 'beginner',
    wordCount: 500,
    articleType: 'practice',
    orderIndex: 1,
    content: `Ancient Egypt flourished along the Nile River for over three thousand years, creating one of humanity's most remarkable civilizations. The Egyptians built massive pyramids as tombs for their pharaohs, believing these divine rulers needed provisions for their eternal journey through the afterlife.

The Nile River was the lifeblood of Egyptian civilization, flowing over 4,000 miles from central Africa to the Mediterranean Sea. Its annual floods deposited rich, fertile soil along its banks, allowing agriculture to thrive in an otherwise desert landscape. Egyptian farmers developed sophisticated irrigation systems to maximize the benefits of these predictable floods.

Egyptian society was highly organized with the pharaoh at the top of a rigid hierarchy. Believed to be a living god on Earth, the pharaoh held absolute power over all aspects of Egyptian life. Below the pharaoh were priests, nobles, scribes, craftsmen, and farmers, each with specific roles and responsibilities in this ancient society.

The Egyptians developed hieroglyphics around 3200 BCE, creating one of the earliest and most elaborate writing systems ever invented. These pictorial symbols served religious, administrative, and commemorative purposes throughout Egyptian history. Scribes were highly respected members of society who spent years mastering this complex writing system at temple schools.

Egyptian innovations transformed ancient technology and left lasting influences on world culture. They created paper from papyrus plants growing along the Nile, developed a 365-day calendar remarkably similar to our modern one, and advanced medical knowledge through systematic observation and documented treatment methods.

The Great Pyramid of Giza, built around 2560 BCE for Pharaoh Khufu, stood as the tallest human-made structure for over 3,800 years. Its construction required an estimated 2.3 million stone blocks, each weighing an average of 2.5 tons. Modern engineers still marvel at how ancient workers achieved such precise construction without modern tools.

Egyptian religion centered on preparing for the afterlife through elaborate burial practices and rituals. Mummification preserved bodies for eternity using natron salt and linen wrappings over a 70-day process. The famous golden death mask of Tutankhamun, discovered by Howard Carter in 1922, demonstrates the extraordinary wealth and artistry devoted to royal burials.

Egyptian influence spread throughout the Mediterranean world and beyond, shaping art, architecture, and religious thought for millennia. Their achievements in mathematics, astronomy, and engineering laid foundations for later Greek and Roman civilizations.`,
    questions: [
      {
        id: 'history-civilization-p01-q1',
        type: 'single_choice',
        question: 'Why were pyramids built in ancient Egypt?',
        options: ['As homes for nobles', 'As religious temples', 'As tombs for pharaohs', 'As astronomical observatories'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p01-q2',
        type: 'multiple_select',
        question: 'Which innovations did the ancient Egyptians develop? Select all that apply.',
        options: ['Paper from papyrus', 'A 365-day calendar', 'The printing press', 'Hieroglyphic writing'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'history-civilization-p01-q3',
        type: 'true_false',
        question: 'The Great Pyramid of Giza was the tallest human-made structure for over 3,800 years.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p01-q4',
        type: 'numeric',
        question: 'Approximately when was the Great Pyramid of Giza built (BCE)?',
        correctValue: 2560,
        tolerance: 100,
        min: 2000,
        max: 3500,
        step: 50,
        unit: 'BCE',
      },
    ],
  },
  {
    id: 'history-civilization-p02',
    topicId: 'history-civilization',
    title: 'The Renaissance: Rebirth of European Culture',
    difficulty: 'beginner',
    wordCount: 750,
    articleType: 'practice',
    orderIndex: 2,
    content: `The Renaissance began in Florence, Italy around 1400 and spread throughout Europe over the following two centuries. This cultural movement marked a dramatic shift from medieval thinking toward renewed interest in classical Greek and Roman ideas. Artists, scholars, and scientists transformed European civilization during this remarkable period.

The word Renaissance comes from the French word meaning rebirth, perfectly capturing the era's spirit of rediscovery and innovation. Wealthy merchant families like the Medici of Florence patronized artists and scholars, funding projects that shaped Western culture. Cosimo de Medici and his grandson Lorenzo the Magnificent spent fortunes supporting creative geniuses during the fifteenth century.

Leonardo da Vinci exemplified the Renaissance ideal of the universal man who excelled in multiple fields. Born in 1452 near Florence, he became a painter, sculptor, architect, musician, mathematician, engineer, and anatomist. His Mona Lisa and The Last Supper remain among history's most famous paintings, while his notebooks reveal designs for flying machines centuries ahead of their time.

Michelangelo Buonarroti created masterpieces that still inspire awe over five hundred years later. Pope Julius II commissioned him to paint the Sistine Chapel ceiling, which Michelangelo completed between 1508 and 1512 while lying on scaffolding high above the floor. His sculpture of David, carved from a single block of marble in Florence, demonstrates his extraordinary understanding of human anatomy.

Renaissance artists developed techniques that revolutionized visual representation. Filippo Brunelleschi formalized linear perspective around 1415, allowing painters to create realistic three-dimensional spaces on flat surfaces. Artists studied light, shadow, and human anatomy to achieve unprecedented naturalism in their work.

The printing press, invented by Johannes Gutenberg in Mainz, Germany around 1440, accelerated the spread of Renaissance ideas. His movable type technology made books far cheaper and faster to produce than hand-copied manuscripts. By 1500, printing presses across Europe had produced approximately 20 million volumes, dramatically expanding literacy and knowledge.

Humanism emerged as the defining intellectual movement of the Renaissance era. Humanist scholars focused on studying classical texts in their original Greek and Latin rather than medieval translations. They emphasized human potential, individual achievement, and secular concerns alongside traditional religious values. Petrarch, often called the father of humanism, pioneered this approach in the fourteenth century.

Scientific thinking advanced significantly during the Renaissance period. Nicolaus Copernicus proposed in 1543 that Earth and other planets orbit the Sun, challenging the prevailing belief that Earth sat motionless at the universe's center. His heliocentric theory sparked a scientific revolution that would transform human understanding of the cosmos.

Renaissance architecture drew heavily on classical Roman models while adding innovative elements. Brunelleschi designed the magnificent dome of Florence Cathedral, completed in 1436, using techniques inspired by ancient Roman construction. This dome remains the largest masonry dome ever built and demonstrated that contemporary architects could rival ancient achievements.

The Renaissance eventually spread from Italy to northern Europe, taking on distinctive regional characteristics. German artist Albrecht Durer combined Italian techniques with northern European traditions in his paintings and prints. The Low Countries produced masters like Jan van Eyck, whose oil painting techniques achieved remarkable detail and luminosity.

The Renaissance laid foundations for the modern world by emphasizing observation, experimentation, and individual expression. This era produced not only extraordinary art but also new ways of thinking about humanity's place in the universe. The confidence and creativity of Renaissance culture continue influencing civilization today.`,
    questions: [
      {
        id: 'history-civilization-p02-q1',
        type: 'single_choice',
        question: 'Where did the Renaissance begin?',
        options: ['Rome, Italy', 'Florence, Italy', 'Paris, France', 'London, England'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p02-q2',
        type: 'single_choice',
        question: 'Who invented the printing press around 1440?',
        options: ['Leonardo da Vinci', 'Filippo Brunelleschi', 'Johannes Gutenberg', 'Nicolaus Copernicus'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p02-q3',
        type: 'multiple_select',
        question: 'Which fields did Leonardo da Vinci work in? Select all that apply.',
        options: ['Painting', 'Engineering', 'Politics', 'Anatomy'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'history-civilization-p02-q4',
        type: 'true_false',
        question: 'Michelangelo painted the Sistine Chapel ceiling while lying on scaffolding.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p02-q5',
        type: 'numeric',
        question: 'In what year did Michelangelo complete the Sistine Chapel ceiling?',
        correctValue: 1512,
        tolerance: 0,
        min: 1400,
        max: 1600,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'history-civilization-p03',
    topicId: 'history-civilization',
    title: 'The Industrial Revolution: Transforming Human Society',
    difficulty: 'beginner',
    wordCount: 1000,
    articleType: 'practice',
    orderIndex: 3,
    content: `The Industrial Revolution began in Britain during the mid-eighteenth century and fundamentally transformed how humans live, work, and interact with the world. This period saw the transition from hand production methods to machine manufacturing, creating changes in society that continue shaping our lives today.

Several factors made Britain the birthplace of industrialization. The country possessed abundant coal and iron ore deposits essential for powering and building machinery. Its extensive canal and river network facilitated transportation of raw materials and finished goods. A stable political system and growing banking industry provided conditions favorable for investment and innovation.

The textile industry led the Industrial Revolution through a series of breakthrough inventions. James Hargreaves patented the spinning jenny in 1770, which allowed a single worker to operate eight spindles simultaneously instead of just one. Richard Arkwright developed the water frame in 1769, using water power to spin stronger thread. Edmund Cartwright invented the power loom in 1785, mechanizing the weaving process and dramatically increasing cloth production.

James Watt's improvements to the steam engine in the 1760s provided the power source that drove industrialization forward. Watt's engines were far more efficient than earlier designs, consuming less coal while producing more power. His partnership with manufacturer Matthew Boulton spread steam power throughout British industry, freeing factories from dependence on water power and allowing them to locate anywhere.

The factory system replaced traditional cottage industries where families worked at home producing goods by hand. Factory workers operated machines in large buildings, often working twelve to sixteen hours per day under harsh conditions. Children as young as five years old labored in mines and textile mills until reform movements gradually improved working conditions.

Transportation improvements connected industrial centers to markets and raw material sources. George Stephenson built the first public railway using steam locomotives, the Stockton and Darlington Railway, which opened in 1825. Railways soon crisscrossed Britain and spread across Europe and North America, moving goods and people at unprecedented speeds.

Urbanization accelerated dramatically as workers moved from rural areas to factory towns seeking employment. Manchester's population grew from approximately 25,000 in 1772 to over 300,000 by 1850. Cities expanded rapidly without adequate planning, creating overcrowded slums with poor sanitation that bred disease outbreaks including cholera epidemics.

The Industrial Revolution spread from Britain to continental Europe and North America during the nineteenth century. Belgium industrialized first, followed by France and Germany. The United States began industrializing after 1800, and by 1900 American industrial production exceeded that of any European nation.

New social classes emerged from industrial capitalism. Factory owners and industrialists accumulated vast wealth, forming a powerful bourgeoisie that challenged the traditional aristocracy's political dominance. Industrial workers formed a new urban working class that would eventually organize labor unions to fight for better wages and conditions.

Karl Marx and Friedrich Engels published The Communist Manifesto in 1848, analyzing industrial capitalism's effects on society and predicting that workers would eventually overthrow the capitalist system. Their ideas influenced political movements throughout the nineteenth and twentieth centuries, though events did not unfold exactly as they predicted.

Environmental consequences of industrialization became apparent as factories polluted air and water. Coal smoke blackened buildings and damaged lungs in industrial cities. Rivers became open sewers carrying industrial waste and human effluent. These problems sparked early environmental awareness and eventually led to pollution control measures.

The Industrial Revolution created the modern world of mass production, global trade, and technological innovation. Living standards eventually rose dramatically despite initial hardships, as industrial productivity generated unprecedented wealth. Agricultural innovations freed workers from farms, allowing population growth that supported expanding industries.

Scientific and technological advances accelerated throughout the nineteenth century. Michael Faraday's work on electromagnetism in the 1830s laid foundations for electrical power generation. The second industrial revolution of the late nineteenth century brought steel, chemicals, petroleum, and electricity, further transforming economies and daily life.

Understanding the Industrial Revolution helps us recognize patterns still relevant today. Questions about workers' rights, environmental protection, urban planning, and technological disruption echo concerns first raised during industrialization. This transformative period reminds us that economic and technological changes carry profound social consequences.`,
    questions: [
      {
        id: 'history-civilization-p03-q1',
        type: 'single_choice',
        question: 'Where did the Industrial Revolution begin?',
        options: ['France', 'Germany', 'Britain', 'United States'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p03-q2',
        type: 'single_choice',
        question: 'Who made crucial improvements to the steam engine in the 1760s?',
        options: ['George Stephenson', 'James Watt', 'Edmund Cartwright', 'Richard Arkwright'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p03-q3',
        type: 'single_choice',
        question: 'What was the first public railway using steam locomotives?',
        options: ['Liverpool and Manchester Railway', 'Stockton and Darlington Railway', 'London and Birmingham Railway', 'Great Western Railway'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p03-q4',
        type: 'multiple_select',
        question: 'Which inventions advanced the textile industry? Select all that apply.',
        options: ['Spinning jenny', 'Steam locomotive', 'Power loom', 'Water frame'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'history-civilization-p03-q5',
        type: 'true_false',
        question: 'By 1900, American industrial production exceeded that of any European nation.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p03-q6',
        type: 'numeric',
        question: 'In what year was The Communist Manifesto published?',
        correctValue: 1848,
        tolerance: 0,
        min: 1800,
        max: 1900,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'history-civilization-p04',
    topicId: 'history-civilization',
    title: 'The Silk Road: Ancient Highway of Commerce and Culture',
    difficulty: 'intermediate',
    wordCount: 1300,
    articleType: 'practice',
    orderIndex: 4,
    content: `The Silk Road connected East and West for nearly two thousand years, facilitating the exchange of goods, ideas, religions, and technologies across vast distances. This network of trade routes stretched over 4,000 miles from Chang'an in China to the Mediterranean ports of the Roman Empire. The name itself was coined by German geographer Ferdinand von Richthofen in 1877, though the routes had operated for centuries before Europeans understood their full extent.

Chinese silk gave the route its name because this luxury fabric was among the most valuable commodities traveling westward. Silk production remained a closely guarded Chinese secret for centuries, with harsh penalties for anyone who revealed the process to foreigners. According to legend, two Byzantine monks smuggled silkworm eggs out of China hidden in hollow bamboo walking sticks around 550 CE, finally breaking China's monopoly on silk production.

The Silk Road emerged during the Han Dynasty when Emperor Wu sent his envoy Zhang Qian westward in 138 BCE to seek military allies against nomadic threats. Zhang Qian's journey took thirteen years and covered territories never before visited by Chinese officials. Though he failed to secure the alliance he sought, his reports of wealthy kingdoms to the west sparked Chinese interest in trade and diplomacy across Central Asia.

Caravans traveling the Silk Road faced extraordinary challenges that tested human endurance and ingenuity. The Taklamakan Desert, whose name means "place of no return" in Uyghur, claimed countless lives with its extreme temperatures and shifting sand dunes. Mountain passes through the Pamir and Tian Shan ranges reached elevations exceeding 15,000 feet, where thin air and harsh weather endangered travelers and animals alike.

Oasis cities along the route became prosperous trading centers where merchants exchanged goods and replenished supplies. Samarkand in modern Uzbekistan flourished as a crossroads where Chinese, Indian, Persian, and Mediterranean traders met to conduct business. Kashgar served as the gateway where routes diverged around the Taklamakan Desert before rejoining on the other side. These cities developed sophisticated irrigation systems that transformed desert landscapes into productive agricultural zones.

Goods flowing eastward from Mediterranean lands included glassware, gold and silver jewelry, wool textiles, and exotic animals for Chinese imperial menageries. Westward traffic carried not only silk but also spices, tea, porcelain, paper, and gunpowder. The exact origins of many products remained mysteries to consumers at the routes' endpoints, who knew only that caravans brought remarkable goods from distant lands.

Religion traveled the Silk Road alongside merchandise, profoundly shaping civilizations across the Asian continent. Buddhism spread from India into Central Asia and China through missionary activity along the trade routes. Buddhist monasteries dotted the landscape from Afghanistan to Japan by the first millennium CE. Islam later followed similar paths, converting populations across Central Asia from the seventh century onward.

Technology and knowledge crossed cultural boundaries through Silk Road contacts with transformative effects. Papermaking spread from China westward, reaching Baghdad by the eighth century and eventually revolutionizing European intellectual life. Chinese innovations in metalwork, textile production, and agricultural techniques enriched societies from Persia to Byzantium. Medical knowledge, astronomical observations, and mathematical concepts flowed in multiple directions.

The Mongol Empire under Genghis Khan and his successors created unprecedented conditions for Silk Road commerce during the thirteenth and fourteenth centuries. Mongol rule stretched from Korea to Eastern Europe, establishing the largest contiguous land empire in history. The Pax Mongolica provided security for merchants and travelers, with Mongol law punishing bandits severely. Marco Polo famously traveled from Venice to the court of Kublai Khan during this period, returning with detailed accounts that fascinated European readers.

The Black Death demonstrated the Silk Road's potential for spreading destruction alongside prosperity. This devastating plague outbreak originated in Central Asia and traveled westward along trade routes during the 1340s. Arriving in Europe in October 1347 aboard ships from the Black Sea, the plague killed approximately one-third of Europe's population within five years. The pandemic disrupted trade networks and contributed to the Silk Road's gradual decline.

Maritime trade routes eventually supplanted the overland Silk Road as technological advances made sea travel more efficient and profitable. Portuguese explorer Vasco da Gama reached India by sailing around Africa in 1498, establishing direct European access to Asian goods. Sea routes could transport larger quantities more cheaply than camel caravans crossing dangerous terrain. By the sixteenth century, maritime commerce dominated intercontinental trade.

The Silk Road's legacy extends far beyond its commercial importance, representing humanity's capacity for exchange across cultural boundaries. Artistic styles, architectural techniques, musical instruments, and culinary traditions all spread along these ancient routes. The genetic mixing of populations created new ethnic communities whose descendants still inhabit Silk Road cities. Modern initiatives like China's Belt and Road project consciously invoke Silk Road imagery to promote contemporary economic connections.

Understanding the Silk Road reveals how interconnected ancient civilizations were despite distances that seemed insurmountable. The goods in a Roman aristocrat's home or a Tang Dynasty palace reflected trade networks spanning continents. This history reminds us that globalization is not a modern invention but a recurring pattern in human affairs, with both benefits and costs that echo across millennia.`,
    questions: [
      {
        id: 'history-civilization-p04-q1',
        type: 'single_choice',
        question: 'Who coined the term "Silk Road"?',
        options: ['Marco Polo', 'Zhang Qian', 'Ferdinand von Richthofen', 'Genghis Khan'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p04-q2',
        type: 'single_choice',
        question: 'When did Emperor Wu send Zhang Qian westward?',
        options: ['550 CE', '138 BCE', '1498 CE', '1347 CE'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p04-q3',
        type: 'multiple_select',
        question: 'Which goods traveled westward on the Silk Road? Select all that apply.',
        options: ['Silk', 'Glassware', 'Paper', 'Spices'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'history-civilization-p04-q4',
        type: 'true_false',
        question: 'The Mongol Empire made the Silk Road more dangerous for merchants.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p04-q5',
        type: 'numeric',
        question: 'Approximately how many miles did the Silk Road stretch?',
        correctValue: 4000,
        tolerance: 500,
        min: 1000,
        max: 8000,
        step: 500,
        unit: 'miles',
      },
      {
        id: 'history-civilization-p04-q6',
        type: 'single_choice',
        question: 'Which city served as a gateway where routes diverged around the Taklamakan Desert?',
        options: ['Samarkand', 'Chang\'an', 'Kashgar', 'Baghdad'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'history-civilization-p05',
    topicId: 'history-civilization',
    title: 'The French Revolution: Birth of Modern Politics',
    difficulty: 'intermediate',
    wordCount: 1700,
    articleType: 'practice',
    orderIndex: 5,
    content: `The French Revolution transformed not only France but the entire Western world, establishing principles of popular sovereignty and individual rights that remain foundational to modern political systems. Beginning in 1789 and continuing for a decade of turmoil, the revolution overthrew a centuries-old monarchy, executed a king, and unleashed forces that would reshape European society. The events in France demonstrated both the power of revolutionary ideals and the dangers of political extremism.

France in the 1780s faced a perfect storm of crises that made revolution increasingly likely. The government teetered on the edge of bankruptcy after decades of expensive wars, including costly support for American independence. A series of poor harvests drove bread prices to unprecedented levels, causing widespread hunger among common people. The rigid social structure divided French society into three estates, with the clergy and nobility enjoying privileges that the commoners deeply resented.

King Louis XVI, who had ascended the throne in 1774 at age nineteen, proved unable to navigate these challenges effectively. His attempts at financial reform foundered against aristocratic resistance. In desperation, Louis summoned the Estates-General in May 1789 for the first time since 1614, hoping to raise new taxes. This decision set in motion a chain of events that would ultimately cost him his crown and his life.

The Third Estate, representing over 95 percent of the French population, demanded greater political representation. When the king rejected their demands, representatives of the Third Estate declared themselves the National Assembly on June 17, 1789, claiming authority to govern France. Three days later, finding themselves locked out of their meeting hall, the delegates gathered in a nearby tennis court and swore not to disband until they had given France a constitution.

Popular unrest exploded on July 14, 1789, when a Parisian mob stormed the Bastille fortress seeking weapons and gunpowder. The prison held only seven inmates at the time, but the Bastille symbolized royal tyranny in the public imagination. The storming of this fortress became the defining image of the revolution, and July 14 remains France's national holiday. News of the event sparked peasant uprisings throughout the countryside as commoners attacked noble estates and destroyed feudal records.

The National Assembly moved quickly to dismantle the old regime's foundations. On August 4, 1789, nobles voluntarily surrendered their feudal privileges in an emotional late-night session. Three weeks later, the assembly adopted the Declaration of the Rights of Man and of the Citizen, proclaiming that all men are born free and equal in rights. This document, influenced by American precedents and Enlightenment philosophy, established principles that would guide democratic movements worldwide.

The revolution radicalized steadily as conflicts intensified between competing factions. The royal family's attempted flight to Austrian territory in June 1791 destroyed remaining popular trust in the monarchy. War with Austria and Prussia beginning in April 1792 created both external threats and internal paranoia about traitors. The September Massacres of 1792 saw Parisian mobs kill over one thousand prisoners suspected of counter-revolutionary sympathies.

The Convention that replaced the National Assembly abolished the monarchy on September 21, 1792, and declared France a republic. Louis XVI faced trial for treason in December and was found guilty by an overwhelming vote. The Convention narrowly approved his execution by a margin of just one vote. Louis died by guillotine on January 21, 1793, in a public execution witnessed by thousands in what is now the Place de la Concorde.

The Reign of Terror under Maximilien Robespierre and the Committee of Public Safety brought revolutionary violence to its most extreme phase. Between September 1793 and July 1794, approximately 17,000 people were officially executed, with many more dying in prisons or summary killings. The guillotine claimed victims ranging from Queen Marie Antoinette to revolutionary leaders like Georges Danton who had questioned the terror's necessity. Even the chemist Antoine Lavoisier, father of modern chemistry, was executed.

Robespierre himself fell victim to the forces he had unleashed when the Convention turned against him on 9 Thermidor Year II by the revolutionary calendar, corresponding to July 27, 1794. He was executed the following day along with close supporters. The Thermidorian Reaction that followed rolled back the most radical revolutionary measures and eventually established a more moderate government called the Directory.

The Directory governed France from 1795 to 1799 but never achieved stability or legitimacy. Economic problems persisted, political factions battled constantly, and military threats continued from European monarchies alarmed by revolutionary contagion. The government relied increasingly on the army to suppress domestic unrest and defend against foreign invasion. This dependence on military force would prove fatal to the republic.

Napoleon Bonaparte seized power in a coup on November 9, 1799, ending the revolutionary decade and beginning a new era of French and European history. The young general had risen to prominence through brilliant military campaigns in Italy and Egypt. His coup established the Consulate, with Napoleon as First Consul and effective dictator. He would crown himself Emperor in 1804, founding a dynasty that represented both the revolution's achievements and its betrayal.

The French Revolution's legacy proved both enduring and contested. Revolutionary ideals of liberty, equality, and fraternity inspired democratic movements across Europe and Latin America throughout the nineteenth century. The revolution established the template for modern nationalism, with the citizen army and mass political mobilization that would characterize subsequent conflicts. Legal reforms codified under Napoleon spread French revolutionary principles across much of Europe.

Critics pointed to the revolution's violence, instability, and ultimate failure to establish lasting democratic institutions. Edmund Burke's Reflections on the Revolution in France, published in 1790, articulated conservative concerns about radical change that continue influencing political thought. The debate between revolutionary transformation and gradual reform remains central to political philosophy.

The French Revolution demonstrated that ordinary people could overthrow seemingly permanent institutions and remake society according to new principles. It showed both the possibilities and the perils of revolutionary politics, creating a template that subsequent movements would follow and learn from. The questions it raised about democracy, violence, and social change remain relevant more than two centuries later.`,
    questions: [
      {
        id: 'history-civilization-p05-q1',
        type: 'single_choice',
        question: 'When did the storming of the Bastille occur?',
        options: ['June 17, 1789', 'July 14, 1789', 'August 4, 1789', 'January 21, 1793'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p05-q2',
        type: 'single_choice',
        question: 'What document proclaimed that all men are born free and equal in rights?',
        options: ['The Tennis Court Oath', 'The Declaration of the Rights of Man and of the Citizen', 'The Constitution of Year III', 'The Civil Constitution of the Clergy'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p05-q3',
        type: 'multiple_select',
        question: 'Which factors contributed to the French Revolution? Select all that apply.',
        options: ['Government bankruptcy', 'Poor harvests causing hunger', 'Successful tax reform', 'Rigid social structure with privileged estates'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'history-civilization-p05-q4',
        type: 'true_false',
        question: 'Louis XVI was executed on January 21, 1793.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p05-q5',
        type: 'numeric',
        question: 'Approximately how many people were officially executed during the Reign of Terror?',
        correctValue: 17000,
        tolerance: 2000,
        min: 5000,
        max: 50000,
        step: 1000,
        unit: 'people',
      },
      {
        id: 'history-civilization-p05-q6',
        type: 'single_choice',
        question: 'Who led the Committee of Public Safety during the Reign of Terror?',
        options: ['Napoleon Bonaparte', 'Georges Danton', 'Maximilien Robespierre', 'King Louis XVI'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p05-q7',
        type: 'single_choice',
        question: 'When did Napoleon Bonaparte seize power in France?',
        options: ['July 14, 1789', 'January 21, 1793', 'July 27, 1794', 'November 9, 1799'],
        correctIndex: 3,
      },
      {
        id: 'history-civilization-p05-q8',
        type: 'numeric',
        question: 'How old was Louis XVI when he became king in 1774?',
        correctValue: 19,
        tolerance: 0,
        min: 10,
        max: 40,
        step: 1,
        unit: 'years old',
      },
    ],
  },
  {
    id: 'history-civilization-p06',
    topicId: 'history-civilization',
    title: 'The Age of Exploration: When Europe Reached the World',
    difficulty: 'intermediate',
    wordCount: 2100,
    articleType: 'practice',
    orderIndex: 6,
    content: `The Age of Exploration transformed global history between the fifteenth and seventeenth centuries as European sailors ventured into unknown waters seeking trade routes, riches, and new lands. These voyages connected continents that had developed in isolation for thousands of years, launching an era of exchange, colonization, and conflict that shaped the modern world. The consequences of this age continue reverberating through economics, politics, and culture today.

Portugal pioneered European exploration under the leadership of Prince Henry the Navigator, who established a navigation school at Sagres around 1420. Henry sponsored expeditions down the African coast, seeking gold, slaves, and a sea route to Asian spice markets. Portuguese sailors gradually extended their reach southward, reaching the equator by 1471 and the Cape of Good Hope at Africa's southern tip in 1488 when Bartolomeu Dias rounded this treacherous point during a violent storm.

The search for a westward route to Asia led to the most consequential voyage in world history. Christopher Columbus, a Genoese sailor sponsored by Spanish monarchs Ferdinand and Isabella, departed Spain on August 3, 1492, with three ships and approximately 90 crew members. After 36 days sailing across the Atlantic, Columbus reached the Bahamas on October 12, 1492, believing he had found islands near Japan. He died in 1506 still convinced he had reached Asia, never realizing he had stumbled upon continents unknown to Europeans.

Vasco da Gama completed the first direct sea voyage from Europe to India, departing Lisbon on July 8, 1497, with four ships. His expedition rounded Africa, crossed the Indian Ocean, and reached Calicut on India's southwestern coast on May 20, 1498. This journey of over 24,000 miles established a sea route that would make Portugal immensely wealthy from the spice trade. Da Gama returned home with cargo worth 60 times the cost of the entire expedition.

Ferdinand Magellan organized the first expedition to circumnavigate the globe, departing Spain on September 20, 1519, with 270 men aboard five ships. The voyage proved extraordinarily difficult, with mutinies, starvation, and Magellan's own death in a battle with indigenous warriors in the Philippines on April 27, 1521. Only one ship, the Victoria, completed the journey, arriving in Spain on September 6, 1522, with just 18 surviving crew members under the command of Juan Sebastian Elcano.

The Treaty of Tordesillas, signed on June 7, 1494, divided newly discovered lands between Spain and Portugal along a line approximately 1,700 miles west of the Cape Verde Islands. Lands east of this line belonged to Portugal, explaining why Brazil became Portuguese while the rest of South America became Spanish. This agreement, blessed by Pope Alexander VI, ignored the rights of indigenous peoples and set precedents for European claims to territories occupied by others.

Spanish conquistadors rapidly conquered vast territories in the Americas during the early sixteenth century. Hernan Cortes landed in Mexico in February 1519 with approximately 600 men and, exploiting indigenous divisions and European diseases, conquered the Aztec Empire by August 1521. Francisco Pizarro captured the Inca emperor Atahualpa in November 1532 with fewer than 200 soldiers, dismantling another great civilization. These conquests brought unprecedented wealth to Spain and devastation to native populations.

The Columbian Exchange describes the transfer of plants, animals, diseases, and ideas between the Old and New Worlds following Columbus's voyages. Europeans brought horses, cattle, wheat, and smallpox to the Americas, while receiving potatoes, tomatoes, corn, and chocolate in return. The demographic consequences proved catastrophic for indigenous Americans, as diseases to which they had no immunity killed an estimated 90 percent of the pre-contact population within a century.

European powers competed intensely for colonies and trade routes throughout the exploration era. The Dutch established the Dutch East India Company in 1602, creating the world's first multinational corporation and building a trading empire across Asia. England chartered its own East India Company in 1600 and gradually expanded from trading posts to territorial control in India. France, England, Spain, and the Netherlands all claimed territories in North America, leading to conflicts that continued for centuries.

The transatlantic slave trade emerged as one of the most tragic consequences of European expansion. Portuguese traders began transporting enslaved Africans to Brazil in the 1530s, and the practice spread throughout the Americas. Between 1500 and 1870, approximately 12.5 million Africans were forcibly transported across the Atlantic under horrific conditions. This human catastrophe provided labor for plantation agriculture while devastating African societies through warfare and depopulation.

Navigation technology advanced significantly during the exploration era. The magnetic compass, adopted from Chinese invention, allowed sailors to determine direction regardless of weather or visibility. The astrolabe and cross-staff enabled calculation of latitude by measuring the angle of the sun or stars above the horizon. Portuguese and Spanish cartographers created increasingly accurate maps that accumulated knowledge from each successive voyage.

The Age of Exploration permanently altered global power dynamics and established patterns that persisted for centuries. European nations gained vast colonial empires that they would maintain until the twentieth century. The exchange of crops transformed agriculture and diets on every continent. Global trade networks emerged that would eventually create the interconnected world economy we know today. The encounter between civilizations, while often catastrophic for non-European peoples, began the process of creating a truly global human community.

Understanding this period requires acknowledging both its achievements and its costs. European explorers displayed remarkable courage and skill in navigating unknown waters. Their voyages expanded human knowledge and created connections that shaped modern civilization. Yet these same expeditions enabled conquest, colonization, and slavery that inflicted immeasurable suffering on millions. The Age of Exploration thus represents a pivotal era whose complex legacy continues demanding careful examination and honest assessment.`,
    questions: [
      {
        id: 'history-civilization-p06-q1',
        type: 'single_choice',
        question: 'Who established a navigation school at Sagres around 1420?',
        options: ['Christopher Columbus', 'Vasco da Gama', 'Prince Henry the Navigator', 'Ferdinand Magellan'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p06-q2',
        type: 'single_choice',
        question: 'When did Columbus reach the Bahamas?',
        options: ['August 3, 1492', 'October 12, 1492', 'July 8, 1497', 'September 20, 1519'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p06-q3',
        type: 'multiple_select',
        question: 'Which items were brought from the Americas to Europe in the Columbian Exchange? Select all that apply.',
        options: ['Potatoes', 'Horses', 'Tomatoes', 'Wheat'],
        correctIndices: [0, 2],
      },
      {
        id: 'history-civilization-p06-q4',
        type: 'true_false',
        question: 'Ferdinand Magellan completed the first circumnavigation of the globe.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p06-q5',
        type: 'numeric',
        question: 'How many surviving crew members completed Magellan\'s circumnavigation aboard the Victoria?',
        correctValue: 18,
        tolerance: 2,
        min: 5,
        max: 50,
        step: 1,
        unit: 'crew members',
      },
      {
        id: 'history-civilization-p06-q6',
        type: 'single_choice',
        question: 'Who conquered the Aztec Empire by August 1521?',
        options: ['Francisco Pizarro', 'Hernan Cortes', 'Juan Sebastian Elcano', 'Bartolomeu Dias'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p06-q7',
        type: 'single_choice',
        question: 'When was the Treaty of Tordesillas signed?',
        options: ['October 12, 1492', 'June 7, 1494', 'May 20, 1498', 'February 1519'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p06-q8',
        type: 'numeric',
        question: 'Approximately how many Africans were forcibly transported across the Atlantic between 1500 and 1870 (in millions)?',
        correctValue: 12.5,
        tolerance: 1,
        min: 5,
        max: 20,
        step: 0.5,
        unit: 'million people',
      },
      {
        id: 'history-civilization-p06-q9',
        type: 'true_false',
        question: 'The Dutch East India Company was established in 1602.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'history-civilization-p07',
    topicId: 'history-civilization',
    title: 'The Cold War: Superpower Standoff That Shaped the Modern World',
    difficulty: 'advanced',
    wordCount: 2500,
    articleType: 'practice',
    orderIndex: 7,
    content: `The Cold War dominated international relations from 1947 until 1991, pitting the United States and Soviet Union against each other in an ideological, political, and military struggle that shaped every corner of the globe. Unlike previous great power conflicts, this confrontation never erupted into direct warfare between the superpowers, though it spawned numerous proxy conflicts and brought humanity perilously close to nuclear annihilation. Understanding the Cold War is essential for comprehending the world that emerged from its conclusion.

The alliance that defeated Nazi Germany fractured almost immediately after World War II ended. The Soviet Union, having lost approximately 27 million people during the war, sought security through buffer states in Eastern Europe and spread communist influence wherever possible. The United States, emerging from the war as the world's dominant economic and military power, committed to containing Soviet expansion and promoting democratic capitalism. These incompatible visions guaranteed conflict.

Winston Churchill captured the emerging division in a speech at Westminster College in Fulton, Missouri on March 5, 1946, declaring that an iron curtain had descended across Europe from Stettin in the Baltic to Trieste in the Adriatic. This vivid phrase became synonymous with the division between communist Eastern Europe and democratic Western Europe. Behind the curtain, Soviet-backed governments took power in Poland, Czechoslovakia, Hungary, Romania, Bulgaria, and East Germany.

President Harry Truman articulated American strategy in an address to Congress on March 12, 1947, requesting aid for Greece and Turkey to resist communist pressure. The Truman Doctrine committed the United States to supporting free peoples resisting subjugation by armed minorities or outside pressures. This policy of containment, developed by diplomat George Kennan, would guide American foreign policy throughout the Cold War.

The Marshall Plan, announced by Secretary of State George Marshall on June 5, 1947, provided approximately 13 billion dollars to rebuild European economies devastated by war. This aid strengthened Western European governments against communist influence while creating markets for American goods. The Soviet Union rejected Marshall Plan assistance and prevented Eastern European nations from accepting it, deepening the continental divide.

Berlin became the Cold War's most dangerous flashpoint during the late 1940s. The city lay deep within Soviet-occupied Germany but was divided into American, British, French, and Soviet sectors. When Western powers introduced a new currency in their zones in June 1948, the Soviets blockaded all land routes to West Berlin. American and British aircraft responded with a massive airlift, delivering up to 8,000 tons of supplies daily for nearly a year until the Soviets lifted the blockade in May 1949.

The formation of rival military alliances institutionalized the division of Europe. The North Atlantic Treaty Organization, established on April 4, 1949, bound the United States, Canada, and Western European nations in collective defense. The Soviet Union countered by creating the Warsaw Pact on May 14, 1955, uniting communist Eastern European states under Moscow's military leadership. These alliances faced each other across the Iron Curtain with millions of troops and thousands of nuclear weapons.

The Cold War turned hot in Korea when communist North Korea invaded South Korea on June 25, 1950. The United States led a United Nations coalition that pushed North Korean forces back, then approached the Chinese border. China entered the war in October 1950, driving UN forces southward. Fighting stabilized near the original boundary and continued until an armistice on July 27, 1953. The Korean War killed approximately 2.5 million people and left the peninsula divided to this day.

The nuclear arms race escalated throughout the Cold War, creating arsenals capable of destroying civilization multiple times over. The United States developed atomic bombs during World War II and remained the sole nuclear power until the Soviet Union tested its first atomic device on August 29, 1949. Both nations subsequently developed hydrogen bombs hundreds of times more powerful than the weapons that destroyed Hiroshima and Nagasaki. By the 1980s, each side possessed over 20,000 nuclear warheads.

The Cuban Missile Crisis of October 1962 brought the world closer to nuclear war than at any other time. American reconnaissance discovered Soviet nuclear missiles being installed in Cuba, just 90 miles from Florida. President John F. Kennedy demanded their removal and ordered a naval blockade of the island. For thirteen days, the superpowers stood at the brink of catastrophe before Soviet Premier Nikita Khrushchev agreed to withdraw the missiles in exchange for American promises not to invade Cuba and to remove missiles from Turkey.

The space race emerged as another arena of superpower competition. The Soviet Union achieved the first satellite launch on October 4, 1957, when Sputnik orbited the Earth, shocking Americans who believed in their technological superiority. Soviet cosmonaut Yuri Gagarin became the first human in space on April 12, 1961. The United States responded with President Kennedy's commitment to land a man on the Moon by the end of the decade, achieved when Neil Armstrong stepped onto the lunar surface on July 20, 1969.

Vietnam became the Cold War's most divisive proxy conflict. The United States gradually increased its involvement in South Vietnam during the 1960s, eventually deploying over 500,000 troops to prevent communist takeover. The war killed approximately 58,000 Americans and millions of Vietnamese before American withdrawal in 1973. Communist forces conquered South Vietnam in April 1975, representing a major American defeat that constrained interventionist policies for years afterward.

Detente, a period of reduced tensions, characterized Soviet-American relations during the 1970s. Arms control agreements including the Strategic Arms Limitation Talks limited nuclear arsenals for the first time. Trade and cultural exchanges increased between East and West. However, the Soviet invasion of Afghanistan in December 1979 ended detente and initiated a renewed confrontation during President Ronald Reagan's administration.

Reagan's military buildup and confrontational rhetoric challenged Soviet power during the 1980s. He labeled the Soviet Union an evil empire and initiated the Strategic Defense Initiative, proposing a space-based missile defense system that would have negated Soviet nuclear capabilities. Soviet leader Mikhail Gorbachev, facing economic stagnation and technological inferiority, introduced reforms called glasnost and perestroika that would inadvertently unravel communist control.

The Cold War ended with stunning rapidity between 1989 and 1991. Communist governments fell across Eastern Europe in 1989, symbolized most dramatically by the fall of the Berlin Wall on November 9, 1989. East and West Germany reunified on October 3, 1990. Constituent republics declared independence from the Soviet Union, which formally dissolved on December 26, 1991. The United States emerged as the world's sole superpower, and capitalism and democracy appeared triumphant.

The Cold War's legacy includes both the avoidance of great power war and the proxy conflicts, interventions, and repressions that killed millions in its shadow. Nuclear arsenals developed during this era continue threatening humanity decades after the confrontation ended. Institutions created to wage the Cold War, including NATO and the national security state, persist in modified forms. Regional conflicts from Korea to the Middle East remain shaped by Cold War dynamics.

Understanding the Cold War helps illuminate current international tensions, including renewed rivalry between the United States and Russia, competition with China, and debates over American military commitments worldwide. The choices made during those dangerous decades continue influencing a world that has neither achieved the perpetual peace some predicted nor returned to the devastation of great power warfare.`,
    questions: [
      {
        id: 'history-civilization-p07-q1',
        type: 'single_choice',
        question: 'Who delivered the "Iron Curtain" speech in March 1946?',
        options: ['Harry Truman', 'George Marshall', 'Winston Churchill', 'George Kennan'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p07-q2',
        type: 'single_choice',
        question: 'How much aid did the Marshall Plan provide to rebuild European economies?',
        options: ['Approximately 3 billion dollars', 'Approximately 8 billion dollars', 'Approximately 13 billion dollars', 'Approximately 20 billion dollars'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p07-q3',
        type: 'multiple_select',
        question: 'Which events occurred in 1949? Select all that apply.',
        options: ['NATO was established', 'The Berlin Wall fell', 'The Soviet Union tested its first atomic bomb', 'The Korean War began'],
        correctIndices: [0, 2],
      },
      {
        id: 'history-civilization-p07-q4',
        type: 'true_false',
        question: 'The Cuban Missile Crisis occurred in October 1962.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p07-q5',
        type: 'numeric',
        question: 'Approximately how many American troops were deployed to Vietnam at the peak?',
        correctValue: 500000,
        tolerance: 50000,
        min: 100000,
        max: 1000000,
        step: 50000,
        unit: 'troops',
      },
      {
        id: 'history-civilization-p07-q6',
        type: 'single_choice',
        question: 'When did the Berlin Wall fall?',
        options: ['October 3, 1990', 'November 9, 1989', 'December 26, 1991', 'June 25, 1950'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p07-q7',
        type: 'single_choice',
        question: 'Who was the first human in space?',
        options: ['Neil Armstrong', 'John Glenn', 'Yuri Gagarin', 'Alan Shepard'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p07-q8',
        type: 'numeric',
        question: 'When did Neil Armstrong land on the Moon (day of July 1969)?',
        correctValue: 20,
        tolerance: 0,
        min: 1,
        max: 31,
        step: 1,
        unit: 'July 1969',
      },
      {
        id: 'history-civilization-p07-q9',
        type: 'true_false',
        question: 'The Warsaw Pact was established before NATO.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p07-q10',
        type: 'single_choice',
        question: 'When did the Soviet Union formally dissolve?',
        options: ['November 9, 1989', 'October 3, 1990', 'August 29, 1991', 'December 26, 1991'],
        correctIndex: 3,
      },
      {
        id: 'history-civilization-p07-q11',
        type: 'numeric',
        question: 'Approximately how many people were killed in the Korean War (in millions)?',
        correctValue: 2.5,
        tolerance: 0.5,
        min: 1,
        max: 5,
        step: 0.5,
        unit: 'million people',
      },
      {
        id: 'history-civilization-p07-q12',
        type: 'single_choice',
        question: 'What Soviet leader introduced glasnost and perestroika?',
        options: ['Nikita Khrushchev', 'Leonid Brezhnev', 'Mikhail Gorbachev', 'Joseph Stalin'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'history-civilization-p08',
    topicId: 'history-civilization',
    title: 'The Ottoman Empire: Rise and Fall of a Global Power',
    difficulty: 'advanced',
    wordCount: 2800,
    articleType: 'practice',
    orderIndex: 8,
    content: `The Ottoman Empire dominated the crossroads of Europe, Asia, and Africa for over six centuries, building one of history's most powerful and enduring states. From humble origins as a small Turkish principality, the Ottomans expanded to control vast territories stretching from Hungary to Yemen and from Algeria to Iraq. The empire's rise, peak, and eventual dissolution profoundly shaped the modern world.

Osman I founded the Ottoman dynasty around 1299 in northwestern Anatolia, where Turkish tribes had settled following the decline of Seljuk power. The name Ottoman derives from Osman, whose descendants would rule for over 600 years. Early Ottoman success came from skilled leadership, effective military organization, and strategic position along Byzantine frontiers. Within a century, the Ottomans had expanded across much of Anatolia and into southeastern Europe.

The capture of Constantinople on May 29, 1453, marked the empire's emergence as a global power. Sultan Mehmed II, just 21 years old, besieged the ancient Byzantine capital with over 80,000 troops and massive cannons that could breach the legendary walls. The fall of Constantinople ended the Byzantine Empire after 1,100 years and gave the Ottomans control of the strategic waterway between the Black Sea and Mediterranean. Mehmed renamed the city Istanbul and made it his capital.

Ottoman military power rested on several innovative institutions that distinguished the empire from its rivals. The Janissary corps, formed from Christian boys taken through the devshirme system and raised as elite soldiers loyal only to the sultan, provided disciplined infantry unmatched in contemporary Europe. The timar system granted cavalry warriors land grants in exchange for military service, creating a feudal structure that could rapidly mobilize large armies.

Sultan Suleiman the Magnificent, who reigned from 1520 to 1566, led the empire to its territorial and cultural peak. His armies conquered Belgrade in 1521, Rhodes in 1522, and most of Hungary after the Battle of Mohacs in 1526. Suleiman besieged Vienna in 1529, representing the high-water mark of Ottoman expansion into central Europe. His reign also saw flourishing arts, architecture, and legal codification that earned him the title Lawgiver among his subjects.

The Ottoman system of administration governed diverse populations across three continents with remarkable effectiveness. The millet system granted religious communities substantial autonomy to manage their own internal affairs. Orthodox Christians, Armenian Christians, and Jews maintained their own courts, schools, and community organizations under Ottoman protection. This tolerance, though not equality, allowed diverse populations to coexist relatively peacefully for centuries.

Ottoman architecture blended Byzantine, Persian, and Islamic influences to create distinctive masterpieces. The architect Mimar Sinan, who served as chief imperial architect from 1538 to 1588, designed over 300 structures including the Suleymaniye Mosque in Istanbul. His works influenced architecture throughout the empire and beyond. Istanbul became a cosmopolitan center of art, learning, and commerce rivaling any European capital.

The Battle of Lepanto on October 7, 1571, marked the first major Ottoman naval defeat, though the empire quickly rebuilt its fleet. A combined Christian armada destroyed most of the Ottoman navy in the Gulf of Patras, killing approximately 30,000 Ottoman sailors and soldiers. Despite this setback, the Ottomans continued to dominate the eastern Mediterranean for another century. The battle's significance was more psychological than strategic, showing that Ottoman power was not invincible.

The empire's long decline began in the late seventeenth century as military, administrative, and economic problems accumulated. The failed siege of Vienna in 1683 and subsequent Treaty of Karlowitz in 1699 marked the first significant territorial losses to European powers. Military technology that had once given Ottomans advantages increasingly lagged behind European innovations. Corruption and inefficiency weakened administration while economic competition from Atlantic trading powers undermined traditional revenue sources.

Reform efforts attempted to modernize the empire and halt its decline throughout the eighteenth and nineteenth centuries. Sultan Selim III introduced the Nizam-i Cedid military reforms in 1792 before conservative forces overthrew and killed him. The Tanzimat period from 1839 to 1876 brought legal, educational, and administrative modernization modeled on European examples. These reforms achieved partial success but could not fundamentally transform the empire or prevent further territorial losses.

The Eastern Question dominated European diplomacy as great powers competed for influence over Ottoman territories and the strategic straits. Russia sought warm-water port access and protection of Orthodox Christians. Britain generally supported Ottoman territorial integrity to block Russian expansion. France and Austria-Hungary had their own ambitions in Ottoman territories. This complex competition delayed the empire's collapse while subjecting it to foreign interference.

Greek independence in 1832 demonstrated that nationalist movements could successfully break away from Ottoman control. The emergence of Serbian, Romanian, and Bulgarian autonomy followed during the nineteenth century. The empire increasingly earned the sobriquet Sick Man of Europe as internal revolts and external pressures continued mounting. By 1900, the Ottomans had lost most of their European territories that had once extended to the gates of Vienna.

The Young Turk Revolution of 1908 forced Sultan Abdulhamid II to restore the constitution he had suspended in 1878. The Committee of Union and Progress, dominated by military officers, effectively controlled the government thereafter. These young reformers sought to save the empire through modernization and centralization, but their policies often alienated non-Turkish populations and hastened the empire's disintegration.

World War I proved fatal to the Ottoman Empire. Alliance with Germany and Austria-Hungary against Britain, France, and Russia placed enormous strains on the already weakened state. The Gallipoli campaign of 1915-1916 provided a rare victory when Ottoman forces repelled Allied invasion, killing approximately 44,000 British and Commonwealth soldiers. Mustafa Kemal, later known as Ataturk, emerged as a hero of this defense.

The Armenian Genocide of 1915-1917 represented the darkest chapter of Ottoman history. The Young Turk government ordered deportation of the Armenian population from Anatolia, resulting in mass killings, death marches, and starvation that killed an estimated 1.5 million people. This systematic destruction of an ancient Christian minority remains officially recognized as genocide by many nations, though Turkey disputes this characterization.

The empire collapsed following World War I, with the Treaty of Sevres in 1920 partitioning remaining territories among victorious powers. Mustafa Kemal led a nationalist movement that rejected this settlement and fought a war of independence against occupying forces. His victory led to the Treaty of Lausanne in 1923, which established the borders of the modern Turkish Republic. The Ottoman sultanate was abolished on November 1, 1922, ending 623 years of dynastic rule.

The Ottoman legacy shapes the modern Middle East, Balkans, and beyond in countless ways. National borders drawn during and after the empire's dissolution often ignored ethnic and religious realities, contributing to ongoing conflicts. Architectural and cultural influences persist from Cairo to Sarajevo. Understanding Ottoman history is essential for comprehending the regions that once comprised this vast and influential empire.`,
    questions: [
      {
        id: 'history-civilization-p08-q1',
        type: 'single_choice',
        question: 'Who founded the Ottoman dynasty around 1299?',
        options: ['Mehmed II', 'Suleiman I', 'Osman I', 'Selim III'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p08-q2',
        type: 'single_choice',
        question: 'When was Constantinople captured by the Ottomans?',
        options: ['May 29, 1299', 'May 29, 1453', 'October 7, 1571', 'November 1, 1922'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p08-q3',
        type: 'multiple_select',
        question: 'Which military innovations supported Ottoman power? Select all that apply.',
        options: ['Janissary corps', 'Timar system', 'Devshirme system', 'Steam-powered ships'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'history-civilization-p08-q4',
        type: 'true_false',
        question: 'Suleiman the Magnificent successfully conquered Vienna in 1529.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p08-q5',
        type: 'numeric',
        question: 'How many structures did Mimar Sinan design as chief imperial architect?',
        correctValue: 300,
        tolerance: 30,
        min: 200,
        max: 500,
        step: 10,
        unit: 'structures',
      },
      {
        id: 'history-civilization-p08-q6',
        type: 'single_choice',
        question: 'When was the Battle of Lepanto fought?',
        options: ['May 29, 1453', 'October 7, 1571', 'November 1, 1922', 'July 4, 1683'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p08-q7',
        type: 'single_choice',
        question: 'What was the millet system?',
        options: ['A military training program', 'A system granting religious communities autonomy', 'A land grant system for cavalry', 'A tax collection method'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p08-q8',
        type: 'numeric',
        question: 'Approximately how many people died in the Armenian Genocide (in millions)?',
        correctValue: 1.5,
        tolerance: 0.2,
        min: 1,
        max: 2,
        step: 0.1,
        unit: 'million',
      },
      {
        id: 'history-civilization-p08-q9',
        type: 'true_false',
        question: 'The Treaty of Karlowitz in 1699 marked the first significant Ottoman territorial losses to European powers.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p08-q10',
        type: 'single_choice',
        question: 'When was the Ottoman sultanate abolished?',
        options: ['1918', 'November 1, 1922', '1923', '1924'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p08-q11',
        type: 'numeric',
        question: 'How many years did the Ottoman dynasty rule?',
        correctValue: 623,
        tolerance: 5,
        min: 600,
        max: 700,
        step: 10,
        unit: 'years',
      },
    ],
  },
  {
    id: 'history-civilization-p09',
    topicId: 'history-civilization',
    title: 'The Scientific Revolution: Changing How Humanity Understood the Universe',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 9,
    content: `The Scientific Revolution of the sixteenth and seventeenth centuries transformed how humans understood the natural world, replacing ancient authorities with observation and experimentation. This intellectual upheaval established the methods and institutions that would produce modern science. The revolution's heroes include some of history's greatest thinkers, whose insights continue shaping our understanding of reality.

The revolution's origins trace to dissatisfaction with ancient knowledge systems that had dominated European thought for centuries. Aristotelian physics and Ptolemaic astronomy provided coherent but ultimately incorrect explanations of natural phenomena. Renaissance humanism encouraged direct examination of classical texts, revealing inconsistencies and errors in received knowledge. Growing awareness of the New World demonstrated that ancient authorities had not known everything about Earth.

Nicolaus Copernicus, a Polish clergyman and astronomer, initiated the astronomical revolution with his heliocentric theory. His great work De Revolutionibus Orbium Coelestium, published in 1543, proposed that Earth and other planets orbit the Sun rather than everything revolving around a stationary Earth. Copernicus developed this theory partly for mathematical simplicity, finding that planetary positions could be calculated more elegantly with the Sun at center. He delayed publication until his death, fearing controversy.

Tycho Brahe, a Danish nobleman, accumulated the most precise astronomical observations made before the telescope. From his observatory on the island of Hven, Brahe recorded planetary positions with unprecedented accuracy between 1576 and 1597. His observations of a supernova in 1572 and a comet in 1577 challenged the Aristotelian doctrine that the heavens were unchanging. Brahe proposed his own model with planets orbiting the Sun while the Sun orbited Earth, a compromise that maintained Earth's special position.

Johannes Kepler used Brahe's observations to discover the laws of planetary motion that bear his name. Working as Brahe's assistant in Prague, Kepler inherited the precious observational data after Brahe's death in 1601. His analysis revealed that planets move in elliptical orbits with the Sun at one focus, not perfect circles as everyone had assumed. Kepler published his first two laws in 1609 and his third law in 1619, providing the mathematical description that Newton would later explain.

Galileo Galilei transformed astronomy by turning a telescope toward the heavens in 1609, making observations that supported the Copernican theory. He discovered mountains on the Moon, showing it was not a perfect sphere. He observed four moons orbiting Jupiter, demonstrating that not everything orbits Earth. He documented phases of Venus that matched Copernican predictions but contradicted Ptolemaic theory. His Dialogue Concerning the Two Chief World Systems in 1632 advocated so effectively for heliocentrism that the Catholic Church condemned him to house arrest for the remaining years of his life.

Francis Bacon articulated the philosophical foundations of scientific method in works including Novum Organum, published in 1620. Bacon criticized reliance on ancient authorities and deductive reasoning from unexamined premises. He advocated systematic observation, careful experimentation, and inductive reasoning from accumulated evidence. While Bacon himself made few scientific discoveries, his vision of organized research programs advancing human knowledge through methodical investigation profoundly influenced the development of modern science.

Rene Descartes contributed both philosophical foundations and specific scientific advances to the revolution. His Discourse on Method, published in 1637, emphasized systematic doubt and clear reasoning. Descartes developed analytical geometry, connecting algebra and geometry in ways that proved essential for later physics. His mechanical philosophy explained natural phenomena through matter and motion alone, rejecting occult forces and opening the way for mathematical physics.

Isaac Newton synthesized the revolution's advances into a comprehensive system of natural philosophy that dominated science for over two centuries. His Principia Mathematica, published in 1687 with encouragement from Edmond Halley, established the laws of motion and universal gravitation. Newton demonstrated that the same force pulling apples to Earth also keeps the Moon in orbit and planets circling the Sun. His work unified terrestrial and celestial physics, showing that the same natural laws operate throughout the universe.

Newton's development of calculus provided the mathematical tools necessary for his physics, though credit for the invention remained disputed during his lifetime. German mathematician Gottfried Wilhelm Leibniz developed calculus independently around the same time, and the notation he introduced is still used today. The priority dispute between Newton and Leibniz became one of history's bitterest scientific controversies, dividing British and Continental mathematics for generations.

Robert Boyle helped establish chemistry as a rigorous science distinct from alchemy. His book The Sceptical Chymist, published in 1661, criticized both Aristotelian elements and alchemical principles. Boyle's law, describing the inverse relationship between gas pressure and volume at constant temperature, demonstrated that chemical phenomena could be analyzed mathematically. His experimental approach and insistence on reproducible results influenced later chemical research.

William Harvey demonstrated the circulation of blood through experiments described in De Motu Cordis, published in 1628. His work overturned Galenic medicine, which had taught that blood was continuously produced and consumed rather than circulating. Harvey showed that the heart pumped blood through arteries, which returned through veins to be pumped again. This discovery exemplified how systematic observation and reasoning could overturn millennia of medical tradition.

The establishment of scientific societies institutionalized the new approach to natural knowledge. The Royal Society of London, founded in 1660, provided a forum for sharing discoveries and debating interpretations. The French Academy of Sciences, established in 1666 under Louis XIV, received government support for organized research programs. These institutions published journals, awarded prizes, and created communities of investigators who could build on each other's work.

The Scientific Revolution raised profound questions about the relationship between science and religion that remain relevant today. Some saw new discoveries as revealing God's handiwork in ever greater detail. Others worried that mechanical explanations left no room for divine intervention. The conflict between Galileo and the Catholic Church became emblematic of potential tensions, though many scientists were devout believers who saw no contradiction between faith and investigation.

The revolution's social dimensions included the emergence of a community of natural philosophers who corresponded across national boundaries. Networks of letters connected investigators throughout Europe, sharing observations and debating interpretations. Scientific literacy spread through public demonstrations, popular lectures, and vernacular publications. Science became increasingly viewed as a path to practical improvements in agriculture, manufacturing, and medicine.

The Scientific Revolution established methods and institutions that would accelerate the pace of discovery in subsequent centuries. The conviction that nature follows discoverable laws, that observation and experiment reveal truth more reliably than authority or tradition, and that knowledge should be shared and tested publicly all emerged from this transformative period. Modern science, technology, and medicine all rest on foundations laid during the sixteenth and seventeenth centuries.`,
    questions: [
      {
        id: 'history-civilization-p09-q1',
        type: 'single_choice',
        question: 'When was Copernicus\'s De Revolutionibus published?',
        options: ['1520', '1543', '1609', '1687'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p09-q2',
        type: 'single_choice',
        question: 'Who discovered the elliptical orbits of planets?',
        options: ['Copernicus', 'Galileo', 'Kepler', 'Newton'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p09-q3',
        type: 'multiple_select',
        question: 'What did Galileo observe through his telescope? Select all that apply.',
        options: ['Mountains on the Moon', 'Moons orbiting Jupiter', 'Phases of Venus', 'Rings of Saturn'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'history-civilization-p09-q4',
        type: 'true_false',
        question: 'Francis Bacon made many important scientific discoveries himself.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p09-q5',
        type: 'numeric',
        question: 'In what year was Newton\'s Principia Mathematica published?',
        correctValue: 1687,
        tolerance: 0,
        min: 1600,
        max: 1750,
        step: 1,
        unit: 'year',
      },
      {
        id: 'history-civilization-p09-q6',
        type: 'single_choice',
        question: 'Who demonstrated the circulation of blood?',
        options: ['Robert Boyle', 'William Harvey', 'Rene Descartes', 'Tycho Brahe'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p09-q7',
        type: 'single_choice',
        question: 'When was the Royal Society of London founded?',
        options: ['1543', '1620', '1660', '1687'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p09-q8',
        type: 'numeric',
        question: 'When did Tycho Brahe observe the supernova that challenged Aristotelian doctrine?',
        correctValue: 1572,
        tolerance: 1,
        min: 1550,
        max: 1600,
        step: 1,
        unit: 'year',
      },
      {
        id: 'history-civilization-p09-q9',
        type: 'true_false',
        question: 'Galileo was condemned to house arrest by the Catholic Church for advocating heliocentrism.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-p09-q10',
        type: 'single_choice',
        question: 'Who developed analytical geometry, connecting algebra and geometry?',
        options: ['Isaac Newton', 'Rene Descartes', 'Francis Bacon', 'Robert Boyle'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p09-q11',
        type: 'single_choice',
        question: 'Who independently developed calculus around the same time as Newton?',
        options: ['Edmond Halley', 'Robert Boyle', 'Gottfried Wilhelm Leibniz', 'William Harvey'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p09-q12',
        type: 'numeric',
        question: 'When was Harvey\'s De Motu Cordis published?',
        correctValue: 1628,
        tolerance: 1,
        min: 1600,
        max: 1650,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'history-civilization-p10',
    topicId: 'history-civilization',
    title: 'The American Civil War: A Nation Divided',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 10,
    content: `The American Civil War from 1861 to 1865 remains the bloodiest conflict in United States history, killing approximately 620,000 soldiers and leaving wounds in the national fabric that have never fully healed. This war decided fundamental questions about the nature of the Union and the future of slavery that the Founding Fathers had left unresolved. The conflict's outcome shaped American democracy and race relations in ways that continue resonating today.

Tensions between North and South had simmered since the nation's founding, with slavery at the heart of the conflict. The Constitution had compromised on slavery, counting enslaved people as three-fifths of a person for representation while allowing the slave trade to continue until 1808. As the nation expanded westward, each new territory's status as free or slave provoked bitter controversy. The Missouri Compromise of 1820 and Compromise of 1850 temporarily papered over these divisions.

The election of Abraham Lincoln on November 6, 1860, triggered Southern secession despite Lincoln's assurance that he would not interfere with slavery where it existed. Lincoln won with only 40 percent of the popular vote in a four-way race, carrying no Southern states. His Republican Party platform opposed slavery's expansion into new territories. South Carolina seceded on December 20, 1860, followed by six more Deep South states before Lincoln took office.

Confederate forces fired on Fort Sumter in Charleston Harbor on April 12, 1861, beginning the war. Lincoln called for 75,000 volunteers to suppress the rebellion, prompting four more states to join the Confederacy. The Confederate capital moved to Richmond, Virginia, just 100 miles from Washington. Both sides expected a short war, with one decisive battle settling the matter.

The First Battle of Bull Run on July 21, 1861, shattered illusions of a quick war. Confederate forces routed the Union army, which fled in disorder back to Washington. Spectators who had brought picnic lunches to watch what they expected to be an easy Union victory fled alongside retreating soldiers. The battle demonstrated that this would be a long, bloody struggle requiring massive mobilization of men and resources.

Military technology had advanced far beyond tactics, producing unprecedented casualties. Rifled muskets accurate at 400 yards replaced smoothbore weapons effective at 100 yards, making traditional infantry charges suicidal. Artillery became more deadly with explosive shells and improved accuracy. Generals on both sides clung to Napoleonic tactics poorly suited to these new weapons, leading to horrific slaughter in battle after battle.

The war's turning point came in 1863 with Union victories at Gettysburg and Vicksburg. The Battle of Gettysburg from July 1 to 3, 1863, killed approximately 51,000 soldiers in three days of fighting in Pennsylvania. Pickett's Charge on the final day sent 12,500 Confederate soldiers across open ground against entrenched Union positions, resulting in over 50 percent casualties. The day after Gettysburg, Vicksburg surrendered after a prolonged siege, giving the Union control of the Mississippi River and splitting the Confederacy in two.

Lincoln issued the Emancipation Proclamation on January 1, 1863, declaring slaves in rebel states to be forever free. This executive order transformed the war's purpose from preserving the Union to ending slavery. Approximately 180,000 Black soldiers and sailors served in Union forces by war's end, fighting in segregated units often led by white officers. Frederick Douglass, the formerly enslaved abolitionist, recruited Black troops and advocated for their equal treatment.

General Ulysses S. Grant's appointment as Union commander in March 1864 brought a relentless strategy of attrition against Confederate forces. Grant understood that the North's advantages in manpower and industry would prove decisive if applied persistently. His Overland Campaign against Robert E. Lee's Army of Northern Virginia suffered approximately 55,000 casualties in a month but kept constant pressure on Confederate forces. Grant's telegram to Washington declaring I propose to fight it out on this line if it takes all summer captured his determined approach.

William Tecumseh Sherman's March to the Sea from November to December 1864 demonstrated the Union's strategy of total war against Confederate resources. Sherman's army of 62,000 men marched from Atlanta to Savannah, destroying railroads, factories, and supplies while freeing enslaved people along the route. This campaign broke the Confederacy's economic capacity to continue fighting and demoralized the Southern population.

Confederate surrender began at Appomattox Court House on April 9, 1865, when Lee surrendered his army to Grant. Grant offered generous terms, allowing Confederate soldiers to return home with their horses and without prosecution for treason. Other Confederate forces surrendered over the following weeks, effectively ending the war. The total cost included approximately 620,000 military deaths, roughly 2 percent of the entire population, equivalent to over 6 million deaths at today's population.

Lincoln's assassination on April 14, 1865, just days after Lee's surrender, deprived the nation of the leader who might have managed Reconstruction with wisdom and compassion. John Wilkes Booth shot Lincoln at Ford's Theatre in Washington during a performance of Our American Cousin. Lincoln died the next morning, becoming a martyr for the cause of Union and emancipation. His successor, Andrew Johnson, lacked Lincoln's political skill and moral authority.

The Reconstruction era from 1865 to 1877 attempted to integrate formerly enslaved people into American society while rebuilding the devastated South. The Thirteenth Amendment, ratified in December 1865, abolished slavery throughout the nation. The Fourteenth Amendment granted citizenship and equal protection of laws. The Fifteenth Amendment prohibited denying voting rights based on race. Black men voted, held office, and served in Congress during this brief period of progress.

Reconstruction's end came with the disputed election of 1876 and subsequent Compromise of 1877, which gave the presidency to Republican Rutherford B. Hayes in exchange for removing federal troops from the South. White Southern Democrats regained political control and implemented Jim Crow laws that stripped Black citizens of rights won during Reconstruction. Legal segregation and disenfranchisement persisted for nearly a century until the Civil Rights Movement.

The Civil War's legacy continues shaping American society and politics. Debates over Confederate monuments, the meaning of states' rights, and the persistence of racial inequality all trace back to issues that war left unresolved. The conflict established federal supremacy over states and ended slavery, but achieving true equality for all Americans remains an ongoing project. Understanding the Civil War is essential for understanding American history and contemporary challenges.`,
    questions: [
      {
        id: 'history-civilization-p10-q1',
        type: 'single_choice',
        question: 'When was Abraham Lincoln elected president?',
        options: ['November 6, 1858', 'November 6, 1860', 'April 12, 1861', 'January 1, 1863'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p10-q2',
        type: 'single_choice',
        question: 'Which state was the first to secede from the Union?',
        options: ['Virginia', 'Georgia', 'South Carolina', 'Texas'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p10-q3',
        type: 'multiple_select',
        question: 'Which amendments were passed during and after the Civil War? Select all that apply.',
        options: ['Thirteenth Amendment', 'Fourteenth Amendment', 'Fifteenth Amendment', 'Sixteenth Amendment'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'history-civilization-p10-q4',
        type: 'true_false',
        question: 'The Emancipation Proclamation freed all slaves in the United States.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p10-q5',
        type: 'numeric',
        question: 'Approximately how many soldiers died in the Battle of Gettysburg?',
        correctValue: 51000,
        tolerance: 5000,
        min: 30000,
        max: 70000,
        step: 1000,
        unit: 'soldiers',
      },
      {
        id: 'history-civilization-p10-q6',
        type: 'single_choice',
        question: 'When was the Emancipation Proclamation issued?',
        options: ['April 12, 1861', 'July 3, 1863', 'January 1, 1863', 'April 9, 1865'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p10-q7',
        type: 'single_choice',
        question: 'Where did Lee surrender to Grant?',
        options: ['Richmond', 'Gettysburg', 'Appomattox Court House', 'Ford\'s Theatre'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p10-q8',
        type: 'numeric',
        question: 'Approximately how many Black soldiers and sailors served in Union forces?',
        correctValue: 180000,
        tolerance: 20000,
        min: 100000,
        max: 250000,
        step: 10000,
        unit: 'soldiers',
      },
      {
        id: 'history-civilization-p10-q9',
        type: 'true_false',
        question: 'Lincoln won the 1860 election with a majority of the popular vote.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-p10-q10',
        type: 'single_choice',
        question: 'Who led the March to the Sea in 1864?',
        options: ['Ulysses S. Grant', 'Robert E. Lee', 'William Tecumseh Sherman', 'George McClellan'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p10-q11',
        type: 'numeric',
        question: 'Approximately how many soldiers died in the Civil War?',
        correctValue: 620000,
        tolerance: 50000,
        min: 400000,
        max: 800000,
        step: 50000,
        unit: 'soldiers',
      },
      {
        id: 'history-civilization-p10-q12',
        type: 'single_choice',
        question: 'When was Lincoln assassinated?',
        options: ['April 9, 1865', 'April 14, 1865', 'December 1865', 'January 1866'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-p10-q13',
        type: 'single_choice',
        question: 'What ended Reconstruction in 1877?',
        options: ['Lincoln\'s assassination', 'The Thirteenth Amendment', 'The Compromise of 1877', 'The Battle of Gettysburg'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-p10-q14',
        type: 'numeric',
        question: 'What percentage of the popular vote did Lincoln win in 1860?',
        correctValue: 40,
        tolerance: 2,
        min: 30,
        max: 50,
        step: 1,
        unit: 'percent',
      },
    ],
  },
  {
    id: 'history-civilization-c1',
    topicId: 'history-civilization',
    title: 'The Fall of Rome: End of an Empire',
    difficulty: 'intermediate',
    wordCount: 1000,
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    content: `The Roman Empire dominated the Mediterranean world for centuries before its western half collapsed in 476 CE. This monumental event marked the end of ancient history and the beginning of the medieval period in Europe. Understanding why Rome fell helps us recognize patterns that affect all great civilizations.

At its peak under Emperor Trajan around 117 CE, the Roman Empire stretched from Britain to Mesopotamia, encompassing approximately 5 million square kilometers. Over 55 million people lived within its borders, united by Roman law, Latin language, and an extensive network of roads spanning over 250,000 miles. The empire seemed invincible to those who lived within its protective boundaries.

Rome's decline resulted from a complex combination of internal weaknesses and external pressures that accumulated over several centuries. No single cause brought down this mighty empire, but rather a perfect storm of problems that Roman institutions could no longer manage effectively.

Political instability plagued the empire during its final centuries. Between 235 and 284 CE, Rome experienced the Crisis of the Third Century, during which over twenty emperors ruled in rapid succession. Many gained power through military force and died violently, creating uncertainty that undermined public confidence and economic stability throughout Roman territories.

Emperor Diocletian attempted to solve the leadership problem in 284 CE by dividing the empire into eastern and western halves, each with its own emperor. His successor Constantine founded Constantinople in 330 CE as a new eastern capital, shifting Roman power toward the wealthier and more stable east. This division eventually became permanent, with the two halves following different historical paths.

Economic troubles weakened Rome's ability to defend its borders and maintain infrastructure. Heavy taxation drove farmers off their land and into cities where they became dependent on grain doles from the government. Trade declined as roads fell into disrepair and pirates threatened Mediterranean shipping lanes. Currency devaluation caused inflation that eroded savings and disrupted commerce.

The Roman army transformed from a professional fighting force of citizen soldiers into a mercenary force increasingly staffed by Germanic warriors. These soldiers often had little loyalty to Rome and sometimes turned against the emperors they served. The practice of paying tribute to barbarian tribes rather than fighting them drained imperial treasuries without providing lasting security.

Germanic tribes pressing against Roman frontiers posed an escalating military threat. The Visigoths, fleeing from Hunnic invaders in central Asia, crossed the Danube River in 376 CE seeking refuge within Roman territory. Poor treatment by Roman officials led to rebellion, and in 378 CE the Visigoths destroyed a Roman army at Adrianople, killing Emperor Valens himself.

The sack of Rome in 410 CE by Alaric and his Visigoth army shocked the Mediterranean world. For the first time in 800 years, foreign invaders had breached the walls of the eternal city. Saint Augustine wrote his famous work "The City of God" partly in response to this traumatic event, arguing that earthly empires inevitably fall but spiritual kingdoms endure.

The final blow came on September 4, 476 CE, when the Germanic chieftain Odoacer deposed Romulus Augustulus, the last Western Roman Emperor. Odoacer chose not to name a replacement, instead sending the imperial regalia to Constantinople and ruling Italy as a barbarian king. This date traditionally marks the end of ancient Rome and the beginning of the Middle Ages.

The Eastern Roman Empire, later called the Byzantine Empire, survived for nearly a thousand more years until Constantinople fell to the Ottoman Turks in 1453. The Byzantines preserved Roman law, Greek learning, and Christian traditions that would later help spark the Renaissance in Western Europe.

Rome's legacy persisted despite its political collapse. Latin evolved into the Romance languages including Italian, French, Spanish, Portuguese, and Romanian. Roman law forms the basis of legal systems throughout Europe and Latin America today. The Catholic Church preserved Roman administrative structures and carried classical learning through the medieval period.

The fall of Rome reminds us that even the mightiest civilizations can decline when institutions fail to adapt to changing circumstances. Internal division, economic inequality, military overextension, and leadership failures all contributed to Rome's collapse. Historians continue debating the relative importance of these factors, finding new relevance in Rome's story for understanding contemporary challenges.`,
    questions: [
      {
        id: 'history-civilization-c1-q1',
        type: 'single_choice',
        question: 'Who deposed the last Western Roman Emperor?',
        options: ['Alaric', 'Diocletian', 'Odoacer', 'Constantine'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c1-q2',
        type: 'multiple_select',
        question: 'Which factors contributed to Rome\'s decline according to the article? Select all that apply.',
        options: ['Political instability', 'Climate change', 'Economic troubles', 'Heavy taxation'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'history-civilization-c1-q3',
        type: 'true_false',
        question: 'The Visigoths sacked Rome in 476 CE.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-c1-q4',
        type: 'numeric',
        question: 'In what year did the western half of the Roman Empire collapse?',
        correctValue: 476,
        tolerance: 0,
        min: 300,
        max: 600,
        step: 1,
        unit: 'CE',
      },
      {
        id: 'history-civilization-c1-q5',
        type: 'single_choice',
        question: 'Who founded Constantinople as a new eastern capital?',
        options: ['Trajan', 'Diocletian', 'Constantine', 'Valens'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c1-q6',
        type: 'single_choice',
        question: 'What happened at the Battle of Adrianople in 378 CE?',
        options: ['The Visigoths sacked Rome', 'The Roman army was destroyed and Emperor Valens was killed', 'Constantine became emperor', 'The empire was divided in two'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c1-q7',
        type: 'numeric',
        question: 'Approximately how many square kilometers did the Roman Empire cover at its peak?',
        correctValue: 5000000,
        tolerance: 500000,
        min: 2000000,
        max: 10000000,
        step: 500000,
        unit: 'square kilometers',
      },
    ],
  },
  {
    id: 'history-civilization-c2',
    topicId: 'history-civilization',
    title: 'World War I: The Conflict That Shaped the Modern World',
    difficulty: 'intermediate',
    wordCount: 2000,
    articleType: 'certification',
    orderIndex: 2,
    certificationLength: 'medium',
    content: `World War I erupted in the summer of 1914 and reshaped the global order more dramatically than any conflict before it. This catastrophic war killed approximately 17 million people, destroyed four empires, and redrew the map of Europe and the Middle East. The political, social, and technological changes unleashed by this conflict continue influencing world affairs more than a century later.

The assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, in Sarajevo provided the spark that ignited the war. A Bosnian Serb nationalist named Gavrilo Princip shot the heir to the Austro-Hungarian throne and his wife Sophie during an official visit. Austria-Hungary blamed Serbia for the assassination and issued an ultimatum designed to be rejected. Within weeks, the alliance systems that had developed over previous decades pulled all major European powers into war.

Europe in 1914 was divided into two major alliance blocs that transformed what might have been a local Balkan conflict into a continental catastrophe. The Triple Alliance linked Germany, Austria-Hungary, and Italy, though Italy would later switch sides. The Triple Entente joined France, Russia, and Britain. When Austria-Hungary declared war on Serbia on July 28, 1914, Russia mobilized to support its Slavic ally. Germany declared war on Russia on August 1 and on France two days later.

The German war plan, developed by Count Alfred von Schlieffen and modified by Helmuth von Moltke, called for a rapid invasion of France through neutral Belgium before turning east to face the slower-mobilizing Russian army. This strategy brought Britain into the war on August 4, 1914, since Britain had guaranteed Belgian neutrality in an 1839 treaty. The violation of Belgian sovereignty also generated international condemnation that damaged Germany's diplomatic position throughout the war.

Initial expectations of a short, decisive war quickly proved tragically mistaken. The German advance through Belgium stalled short of Paris in September 1914 at the First Battle of the Marne. Both sides then attempted to outflank each other in what became known as the Race to the Sea. By November, continuous trench lines stretched from the English Channel to Switzerland, establishing the Western Front that would consume millions of lives over the next four years.

Trench warfare produced conditions of unprecedented misery and deadlock. Soldiers lived in muddy ditches surrounded by rats, lice, and the constant threat of enemy fire. The space between opposing trenches, called no man's land, was swept by machine gun fire that made frontal attacks suicidal. Artillery bombardments churned the landscape into a moonscape of craters and destroyed villages. The combination of defensive firepower and offensive tactics that had not yet adapted to industrial warfare created a stalemate that generals struggled to break.

The Battle of the Somme, launched by British and French forces on July 1, 1916, exemplified the war's horrific waste of human life. The British army suffered nearly 60,000 casualties on the first day alone, making it the bloodiest day in British military history. The offensive continued for over four months but advanced only six miles at a cost of over one million total casualties on both sides. Similar carnage occurred at Verdun, where German and French forces fought from February to December 1916 with approximately 700,000 combined casualties.

The Eastern Front remained more fluid than the Western Front but proved equally devastating. Russian forces initially advanced into German East Prussia before suffering a crushing defeat at the Battle of Tannenberg in late August 1914. The war placed enormous strain on the Russian economy and political system, contributing to the revolution that overthrew Tsar Nicholas II in February 1917. The Bolshevik seizure of power in November 1917 led to Russia's withdrawal from the war through the Treaty of Brest-Litovsk in March 1918.

New weapons and technologies transformed warfare during the conflict. Poison gas was first used on a large scale by German forces at Ypres in April 1915, creating a new form of terror on the battlefield. Tanks, developed by the British, made their debut at the Somme in September 1916 and would eventually help restore mobility to ground warfare. Aircraft evolved from reconnaissance platforms to fighters and bombers capable of striking enemy territory. Submarines, particularly German U-boats, threatened supply lines and played a crucial role in bringing the United States into the war.

The United States entered World War I on April 6, 1917, after German resumption of unrestricted submarine warfare threatened American shipping and lives. The Zimmermann Telegram, a German diplomatic communication proposing a military alliance with Mexico against the United States, further inflamed American public opinion when British intelligence revealed it in February 1917. American troops began arriving in France in significant numbers by spring 1918, providing fresh manpower that helped tip the balance against Germany.

Germany launched massive offensives in spring 1918, hoping to win before American strength became decisive. These attacks, named after German military heroes, achieved stunning initial success using new infiltration tactics. German forces advanced to within 50 miles of Paris by June 1918. However, the offensives exhausted German reserves without achieving a decisive breakthrough. Allied counteroffensives beginning in July steadily pushed German forces back, and by autumn Germany faced military collapse.

The armistice ending the fighting took effect at 11:00 AM on November 11, 1918. Kaiser Wilhelm II had abdicated two days earlier, and Germany was declared a republic. Austria-Hungary had already dissolved into multiple successor states as its component nationalities declared independence. The Ottoman Empire, which had entered the war on Germany's side, faced partition by the victorious Allies. These changes redrew the map of Europe and the Middle East in ways that continue shaping global politics.

The Paris Peace Conference that convened in January 1919 produced the Treaty of Versailles, signed on June 28, 1919, exactly five years after the assassination that started the war. The treaty imposed harsh terms on Germany, including territorial losses, military restrictions, and massive reparations payments. Article 231, the war guilt clause, held Germany responsible for the war and its damages. These terms created resentment that Adolf Hitler would later exploit in his rise to power.

World War I shattered the optimism and confidence that had characterized prewar European civilization. The unprecedented casualties traumatized an entire generation and produced literature, art, and philosophy reflecting disillusionment with traditional values. The war weakened European colonial empires by demonstrating that European powers could destroy themselves. Nationalist movements in Asia, Africa, and the Middle East gained momentum as colonial subjects questioned their rulers' claims to superiority.

The League of Nations, established by the peace treaties, represented an attempt to prevent future wars through collective security and international cooperation. However, the organization was fatally weakened when the United States Senate refused to ratify the Treaty of Versailles and the nation never joined. Without American participation and lacking enforcement mechanisms, the League proved unable to prevent aggression during the 1930s.

World War I created conditions that led directly to World War II just two decades later. The Treaty of Versailles left Germany bitter and humiliated but not permanently weakened. Economic chaos during the Great Depression radicalized German politics and brought the Nazis to power. The failure of the democracies to enforce the peace settlement emboldened aggressive regimes in Germany, Italy, and Japan. Understanding World War I is essential for comprehending the turbulent century that followed.`,
    questions: [
      {
        id: 'history-civilization-c2-q1',
        type: 'single_choice',
        question: 'What event sparked the outbreak of World War I?',
        options: ['German invasion of Belgium', 'Assassination of Archduke Franz Ferdinand', 'The Zimmermann Telegram', 'The Russian Revolution'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c2-q2',
        type: 'single_choice',
        question: 'How many casualties did the British suffer on the first day of the Battle of the Somme?',
        options: ['Nearly 20,000', 'Nearly 40,000', 'Nearly 60,000', 'Nearly 80,000'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c2-q3',
        type: 'multiple_select',
        question: 'Which new weapons or technologies were introduced or widely used during World War I? Select all that apply.',
        options: ['Poison gas', 'Tanks', 'Nuclear weapons', 'Military aircraft'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'history-civilization-c2-q4',
        type: 'true_false',
        question: 'The United States joined the League of Nations after World War I.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-c2-q5',
        type: 'numeric',
        question: 'On what date did the armistice ending the fighting take effect (day of the month)?',
        correctValue: 11,
        tolerance: 0,
        min: 1,
        max: 30,
        step: 1,
        unit: 'November 1918',
      },
      {
        id: 'history-civilization-c2-q6',
        type: 'single_choice',
        question: 'What brought Britain into World War I?',
        options: ['The assassination of Franz Ferdinand', 'Germany\'s violation of Belgian neutrality', 'The sinking of the Lusitania', 'The Zimmermann Telegram'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c2-q7',
        type: 'single_choice',
        question: 'When did the United States enter World War I?',
        options: ['August 1914', 'February 1917', 'April 1917', 'November 1918'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c2-q8',
        type: 'multiple_select',
        question: 'Which empires collapsed as a result of World War I? Select all that apply.',
        options: ['Austria-Hungary', 'British Empire', 'Ottoman Empire', 'German Empire'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'history-civilization-c2-q9',
        type: 'numeric',
        question: 'Approximately how many people were killed during World War I (in millions)?',
        correctValue: 17,
        tolerance: 3,
        min: 5,
        max: 30,
        step: 1,
        unit: 'million',
      },
      {
        id: 'history-civilization-c2-q10',
        type: 'true_false',
        question: 'The Treaty of Versailles was signed on June 28, 1919, exactly five years after the assassination of Franz Ferdinand.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'history-civilization-c3',
    topicId: 'history-civilization',
    title: 'The Industrial Revolution: Transforming Society',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'certification',
    orderIndex: 3,
    certificationLength: 'long',
    content: `The Industrial Revolution transformed human civilization more profoundly than any development since the invention of agriculture, shifting the basis of economic life from farming and handicrafts to factory production and mechanized industry. Beginning in Britain during the late eighteenth century, this transformation spread across Europe, North America, and eventually the world. Understanding the Industrial Revolution is essential for comprehending the modern world it created.

Historians traditionally date the Industrial Revolution's beginnings to the 1760s, when several key innovations emerged in rapid succession. Britain's unique combination of coal resources, navigable rivers, colonial markets, stable government, and entrepreneurial culture created conditions favorable for industrialization. The revolution proceeded through successive waves of innovation that built upon each other in accelerating cycles of change.

The textile industry led the way, with innovations in spinning and weaving dramatically increasing production capacity. James Hargreaves invented the spinning jenny around 1764, allowing one worker to operate multiple spindles simultaneously. Richard Arkwright patented the water frame in 1769, producing stronger thread suitable for warp as well as weft. Samuel Crompton combined features of both machines in his spinning mule of 1779, which produced fine, strong thread in large quantities.

Edmund Cartwright's power loom, patented in 1785, mechanized weaving to match the increased output of spinning machinery. These innovations transformed cotton from a luxury import into Britain's leading manufactured export. Cotton production increased from 2.5 million pounds in 1760 to 366 million pounds by 1800. Mills employing hundreds of workers replaced domestic production by families in cottages.

The steam engine provided the power that drove industrial expansion beyond what water and wind could sustain. Thomas Newcomen built the first practical steam engine in 1712, used primarily for pumping water from coal mines. James Watt dramatically improved the engine's efficiency starting in 1765 by adding a separate condenser that prevented constant heating and cooling of the cylinder. His partnership with manufacturer Matthew Boulton from 1774 brought steam power to factories throughout Britain.

Coal extraction expanded rapidly to fuel steam engines and iron production. Britain's coal output grew from approximately 5 million tons in 1750 to over 80 million tons by 1850. Mining operations grew larger and deeper, requiring increasingly sophisticated pumping and ventilation systems. Coal mining became one of the most dangerous occupations, with frequent accidents killing thousands of workers annually.

Iron production revolutionized with Abraham Darby's discovery around 1709 that coke derived from coal could replace charcoal in smelting iron ore. This innovation freed iron production from dependence on increasingly scarce wood supplies. Henry Cort's puddling process of 1784 enabled mass production of wrought iron suitable for machinery and construction. Iron output increased from approximately 30,000 tons in 1760 to over 2 million tons by 1850.

Transportation improvements facilitated the movement of raw materials and finished goods across expanding markets. Canal construction peaked between 1790 and 1810, creating a network of inland waterways that linked industrial centers with ports. Road improvements including macadamized surfaces made overland transport more reliable. Most dramatically, railways transformed transportation after George Stephenson's Rocket demonstrated the potential of steam locomotives in 1829.

The Liverpool and Manchester Railway, opened in 1830, established the template for railway development worldwide. Passenger service proved unexpectedly popular, while freight rates dropped dramatically compared to canal and road transport. Railway construction created enormous demand for iron, coal, and labor while opening new markets for industrial goods. By 1850, Britain had over 6,000 miles of railway track.

Factory organization represented as significant a change as new technologies. Gathering workers under one roof allowed close supervision, coordination of specialized tasks, and efficient use of powered machinery. Clock time replaced task-oriented work rhythms of agricultural and artisanal labor. Factory discipline required new patterns of behavior that workers often resisted.

Working conditions in early factories horrified contemporary observers and continue to trouble historical conscience. Workdays of 14 to 16 hours were common, with few holidays beyond Christmas and Easter. Children as young as five years old worked in textile mills and coal mines. Accidents from unguarded machinery caused frequent injuries and deaths. Lung diseases from dust and toxic fumes shortened workers' lives.

Urban growth accelerated as workers migrated from countryside to industrial towns. Manchester grew from approximately 25,000 inhabitants in 1770 to over 300,000 by 1850. Liverpool, Birmingham, Leeds, and other industrial centers experienced similar explosive growth. Housing construction could not keep pace, resulting in overcrowded slums lacking sanitation, clean water, and adequate ventilation.

Public health suffered from industrial pollution and urban overcrowding. Life expectancy in industrial cities fell below that of rural areas. Cholera epidemics struck repeatedly, killing tens of thousands in outbreaks in 1831, 1848, and 1854. Edwin Chadwick's 1842 Report on the Sanitary Condition of the Labouring Population documented these horrors and advocated reforms that would eventually transform urban environments.

Social responses to industrialization included both worker movements and elite reform efforts. Luddites destroyed machinery they blamed for unemployment and declining wages between 1811 and 1816. Trade unions emerged despite legal prohibitions, gaining legal recognition in 1824. Chartists demanded political reforms including universal male suffrage through the 1830s and 1840s. Factory acts gradually restricted child labor and working hours.

Karl Marx and Friedrich Engels developed their critique of capitalism while observing industrial conditions, publishing The Communist Manifesto in 1848. Marx's analysis of class conflict, surplus value extraction, and historical materialism emerged from direct engagement with industrial society. Their work influenced political movements that would reshape the twentieth century.

The Industrial Revolution spread from Britain to continental Europe and North America during the nineteenth century. Belgium industrialized rapidly after independence in 1830, exploiting coal and iron resources similar to Britain's. France, Germany, and the United States developed their own industrial sectors, often with more state involvement than Britain's laissez-faire approach.

American industrialization accelerated after the Civil War, combining British technologies with continental scale and massive immigration. The railroad network expanded from 30,000 miles in 1860 to over 200,000 miles by 1900. Steel production, led by Andrew Carnegie, grew from 77,000 tons in 1870 to over 10 million tons by 1900. America would surpass Britain as the world's leading industrial power by 1900.

The second Industrial Revolution of the late nineteenth century brought new industries based on steel, chemicals, and electricity. Henry Bessemer's converter, patented in 1855, enabled mass production of steel that replaced iron for railways, bridges, and buildings. Chemical industries produced dyes, fertilizers, and explosives. Thomas Edison's power station in New York opened in 1882, beginning electrification of industry and daily life.

Environmental consequences of industrialization began accumulating immediately and continue intensifying today. Air pollution from coal burning created London's notorious fogs that killed thousands during severe episodes. Water pollution destroyed fisheries and contaminated drinking supplies. Deforestation for fuel and raw materials altered landscapes across Europe. These effects would accelerate globally as industrialization spread.

The Industrial Revolution created the world we inhabit today, with its mass production, urbanization, and technological complexity. It generated unprecedented wealth while distributing it unequally. It established patterns of energy use that now threaten global climate stability. Understanding how this transformation occurred, and the choices made along the way, illuminates both opportunities and perils facing humanity in an industrial age.`,
    questions: [
      {
        id: 'history-civilization-c3-q1',
        type: 'single_choice',
        question: 'When did the Industrial Revolution traditionally begin?',
        options: ['The 1710s', 'The 1760s', 'The 1810s', 'The 1850s'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c3-q2',
        type: 'single_choice',
        question: 'Who patented the water frame in 1769?',
        options: ['James Hargreaves', 'Richard Arkwright', 'Samuel Crompton', 'Edmund Cartwright'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c3-q3',
        type: 'multiple_select',
        question: 'Which innovations transformed the textile industry? Select all that apply.',
        options: ['Spinning jenny', 'Water frame', 'Steam engine', 'Power loom'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'history-civilization-c3-q4',
        type: 'true_false',
        question: 'James Watt invented the first practical steam engine in 1712.',
        correctAnswer: false,
      },
      {
        id: 'history-civilization-c3-q5',
        type: 'numeric',
        question: 'How much cotton (in millions of pounds) did Britain produce by 1800?',
        correctValue: 366,
        tolerance: 30,
        min: 200,
        max: 500,
        step: 10,
        unit: 'million pounds',
      },
      {
        id: 'history-civilization-c3-q6',
        type: 'single_choice',
        question: 'When did the Liverpool and Manchester Railway open?',
        options: ['1815', '1825', '1830', '1850'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c3-q7',
        type: 'single_choice',
        question: 'Who discovered that coke could replace charcoal in iron smelting?',
        options: ['Henry Cort', 'Abraham Darby', 'Henry Bessemer', 'James Watt'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c3-q8',
        type: 'numeric',
        question: 'How many miles of railway track did Britain have by 1850?',
        correctValue: 6000,
        tolerance: 500,
        min: 3000,
        max: 10000,
        step: 500,
        unit: 'miles',
      },
      {
        id: 'history-civilization-c3-q9',
        type: 'true_false',
        question: 'Trade unions were legally recognized in Britain in 1824.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-c3-q10',
        type: 'single_choice',
        question: 'Who published the Report on the Sanitary Condition of the Labouring Population in 1842?',
        options: ['Karl Marx', 'Friedrich Engels', 'Edwin Chadwick', 'Robert Owen'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c3-q11',
        type: 'numeric',
        question: 'What was the population of Manchester by 1850 (approximately)?',
        correctValue: 300000,
        tolerance: 30000,
        min: 200000,
        max: 400000,
        step: 25000,
        unit: 'people',
      },
      {
        id: 'history-civilization-c3-q12',
        type: 'single_choice',
        question: 'When was The Communist Manifesto published?',
        options: ['1842', '1848', '1855', '1867'],
        correctIndex: 1,
      },
      {
        id: 'history-civilization-c3-q13',
        type: 'multiple_select',
        question: 'Which groups responded to industrialization? Select all that apply.',
        options: ['Luddites', 'Chartists', 'Trade unions', 'Jacobins'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'history-civilization-c3-q14',
        type: 'numeric',
        question: 'How much steel (in millions of tons) did America produce by 1900?',
        correctValue: 10,
        tolerance: 1,
        min: 5,
        max: 15,
        step: 1,
        unit: 'million tons',
      },
      {
        id: 'history-civilization-c3-q15',
        type: 'true_false',
        question: 'America surpassed Britain as the world\'s leading industrial power by 1900.',
        correctAnswer: true,
      },
      {
        id: 'history-civilization-c3-q16',
        type: 'single_choice',
        question: 'When did Thomas Edison open his first power station in New York?',
        options: ['1870', '1876', '1882', '1890'],
        correctIndex: 2,
      },
      {
        id: 'history-civilization-c3-q17',
        type: 'numeric',
        question: 'What was Britain\'s coal output by 1850 (in millions of tons)?',
        correctValue: 80,
        tolerance: 10,
        min: 40,
        max: 120,
        step: 5,
        unit: 'million tons',
      },
    ],
  },
];
