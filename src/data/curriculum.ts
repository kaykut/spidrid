import { Topic, Article } from '../types/learning';

export const TOPICS: Topic[] = [
  {
    id: 'science',
    name: 'Science',
    description: 'Explore discoveries and natural phenomena',
    icon: '🔬',
    color: '#4dabf7',
    articleCount: 3,
  },
  {
    id: 'history',
    name: 'History',
    description: 'Journey through time and civilizations',
    icon: '📜',
    color: '#fab005',
    articleCount: 3,
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Innovations shaping our world',
    icon: '💻',
    color: '#69db7c',
    articleCount: 3,
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Wildlife and ecosystems',
    icon: '🌿',
    color: '#38d9a9',
    articleCount: 3,
  },
  {
    id: 'space',
    name: 'Space',
    description: 'The cosmos and exploration',
    icon: '🚀',
    color: '#9775fa',
    articleCount: 3,
  },
  {
    id: 'psychology',
    name: 'Psychology',
    description: 'Understanding the mind',
    icon: '🧠',
    color: '#f783ac',
    articleCount: 3,
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Markets, trade, and finance',
    icon: '📈',
    color: '#ffa94d',
    articleCount: 3,
  },
];

export const ARTICLES: Article[] = [
  // Science articles
  {
    id: 'sci-1',
    topicId: 'science',
    title: 'The Water Cycle',
    difficulty: 'beginner',
    wordCount: 85,
    content: `Water moves through our planet in a continuous cycle. The sun heats water in oceans, lakes, and rivers, causing it to evaporate into the atmosphere. This water vapor rises and cools, forming clouds through condensation. When clouds become heavy with water droplets, precipitation occurs as rain or snow. Water then flows back to bodies of water through rivers and underground streams. This cycle has been repeating for billions of years, constantly recycling the same water.`,
    questions: [
      {
        id: 'sci-1-q1',
        question: 'What causes water to evaporate?',
        options: ['The moon', 'The sun', 'The wind', 'Gravity'],
        correctIndex: 1,
      },
      {
        id: 'sci-1-q2',
        question: 'What forms when water vapor cools?',
        options: ['Rivers', 'Ice', 'Clouds', 'Steam'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'sci-2',
    topicId: 'science',
    title: 'Photosynthesis Explained',
    difficulty: 'intermediate',
    wordCount: 95,
    content: `Plants convert sunlight into energy through photosynthesis. This remarkable process takes place primarily in leaves, where chlorophyll absorbs light energy. The plant combines carbon dioxide from the air with water from the soil, using light energy to create glucose. Oxygen is released as a byproduct, which is essential for most life on Earth. A single large tree can produce enough oxygen for two people daily. Without photosynthesis, life as we know it would not exist on our planet.`,
    questions: [
      {
        id: 'sci-2-q1',
        question: 'What substance absorbs light in plants?',
        options: ['Glucose', 'Chlorophyll', 'Carbon dioxide', 'Water'],
        correctIndex: 1,
      },
      {
        id: 'sci-2-q2',
        question: 'What is released as a byproduct of photosynthesis?',
        options: ['Carbon dioxide', 'Glucose', 'Water', 'Oxygen'],
        correctIndex: 3,
      },
    ],
  },
  {
    id: 'sci-3',
    topicId: 'science',
    title: 'How Vaccines Work',
    difficulty: 'advanced',
    wordCount: 110,
    content: `Vaccines train your immune system to recognize and fight specific pathogens. They contain weakened or inactive parts of a virus or bacteria, which cannot cause disease but do trigger an immune response. Your body produces antibodies and memory cells that remember the pathogen. If you encounter the real pathogen later, your immune system can respond quickly and effectively before you become seriously ill. This concept of immunization dates back to 1796 when Edward Jenner developed the first vaccine against smallpox. Today, vaccines have eradicated or controlled numerous deadly diseases worldwide.`,
    questions: [
      {
        id: 'sci-3-q1',
        question: 'Who developed the first vaccine?',
        options: ['Louis Pasteur', 'Edward Jenner', 'Alexander Fleming', 'Jonas Salk'],
        correctIndex: 1,
      },
      {
        id: 'sci-3-q2',
        question: 'What do memory cells do?',
        options: ['Create vaccines', 'Attack healthy cells', 'Remember pathogens', 'Produce viruses'],
        correctIndex: 2,
      },
    ],
  },

  // History articles
  {
    id: 'hist-1',
    topicId: 'history',
    title: 'Ancient Egypt',
    difficulty: 'beginner',
    wordCount: 90,
    content: `Ancient Egypt flourished along the Nile River for over three thousand years. The Egyptians built massive pyramids as tombs for their pharaohs, believing rulers needed provisions for the afterlife. They developed hieroglyphics, one of the earliest writing systems. The Nile's annual floods brought fertile soil that allowed agriculture to thrive. Egyptian innovations included paper from papyrus plants, a 365-day calendar, and advanced medicine. Their civilization influenced art, architecture, and religion across the Mediterranean world for millennia.`,
    questions: [
      {
        id: 'hist-1-q1',
        question: 'Why were pyramids built?',
        options: ['As homes', 'As temples', 'As tombs', 'As markets'],
        correctIndex: 2,
      },
      {
        id: 'hist-1-q2',
        question: 'What writing system did Egyptians use?',
        options: ['Cuneiform', 'Hieroglyphics', 'Alphabet', 'Pictographs'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'hist-2',
    topicId: 'history',
    title: 'The Industrial Revolution',
    difficulty: 'intermediate',
    wordCount: 100,
    content: `The Industrial Revolution transformed society between 1760 and 1840, beginning in Britain. New machines powered by steam engines replaced manual labor in factories. Textiles, iron, and coal industries expanded rapidly. People moved from rural farms to growing cities seeking factory work. While production increased dramatically, working conditions were often dangerous and hours were long. Child labor was common. This period sparked innovations in transportation including railways and steamships. The revolution spread to Europe and America, fundamentally changing how goods were made and how people lived and worked.`,
    questions: [
      {
        id: 'hist-2-q1',
        question: 'Where did the Industrial Revolution begin?',
        options: ['France', 'Germany', 'Britain', 'America'],
        correctIndex: 2,
      },
      {
        id: 'hist-2-q2',
        question: 'What powered the new factory machines?',
        options: ['Electricity', 'Wind', 'Steam engines', 'Water wheels'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'hist-3',
    topicId: 'history',
    title: 'The Moon Landing',
    difficulty: 'advanced',
    wordCount: 115,
    content: `On July 20, 1969, Apollo 11 astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. The mission fulfilled President Kennedy's 1961 goal of landing a man on the Moon before the decade ended. The Saturn V rocket carried the crew over 238,000 miles through space. Armstrong's first words upon stepping onto the lunar surface became iconic: "That's one small step for man, one giant leap for mankind." Michael Collins orbited above in the command module. The astronauts collected samples, planted the American flag, and safely returned to Earth. This achievement demonstrated American technological supremacy during the Space Race.`,
    questions: [
      {
        id: 'hist-3-q1',
        question: 'Who was the first human to walk on the Moon?',
        options: ['Buzz Aldrin', 'Michael Collins', 'Neil Armstrong', 'John Glenn'],
        correctIndex: 2,
      },
      {
        id: 'hist-3-q2',
        question: 'Which president set the Moon landing goal?',
        options: ['Nixon', 'Johnson', 'Kennedy', 'Eisenhower'],
        correctIndex: 2,
      },
    ],
  },

  // Technology articles
  {
    id: 'tech-1',
    topicId: 'technology',
    title: 'How the Internet Works',
    difficulty: 'beginner',
    wordCount: 88,
    content: `The internet connects billions of devices worldwide through a network of networks. When you visit a website, your computer sends a request through your internet provider. This request travels through cables, routers, and servers to reach the destination. The website's server sends data back in small packets that your browser assembles into a webpage. This all happens in milliseconds. The internet began as a military project in the 1960s and became publicly available in the 1990s, transforming communication, commerce, and entertainment forever.`,
    questions: [
      {
        id: 'tech-1-q1',
        question: 'When did the internet become publicly available?',
        options: ['1960s', '1970s', '1980s', '1990s'],
        correctIndex: 3,
      },
      {
        id: 'tech-1-q2',
        question: 'How is data sent across the internet?',
        options: ['As packets', 'As waves', 'As files', 'As streams'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'tech-2',
    topicId: 'technology',
    title: 'Artificial Intelligence',
    difficulty: 'intermediate',
    wordCount: 105,
    content: `Artificial intelligence enables machines to learn from experience and perform human-like tasks. Machine learning, a subset of AI, allows systems to improve automatically through exposure to data. Neural networks mimic the human brain's structure, processing information through interconnected nodes. AI powers voice assistants, recommendation systems, and self-driving cars. Deep learning has achieved remarkable results in image recognition and natural language processing. While AI offers tremendous benefits in healthcare, science, and productivity, it also raises questions about job displacement, privacy, and algorithmic bias that society must address.`,
    questions: [
      {
        id: 'tech-2-q1',
        question: 'What does machine learning allow systems to do?',
        options: ['Replace humans', 'Improve automatically', 'Think creatively', 'Feel emotions'],
        correctIndex: 1,
      },
      {
        id: 'tech-2-q2',
        question: 'What do neural networks mimic?',
        options: ['Computers', 'The human brain', 'The internet', 'Robots'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tech-3',
    topicId: 'technology',
    title: 'Blockchain Technology',
    difficulty: 'advanced',
    wordCount: 112,
    content: `Blockchain is a distributed ledger technology that records transactions across many computers. Each block contains transaction data, a timestamp, and a cryptographic hash of the previous block. This creates an immutable chain where altering one record would require changing all subsequent blocks. Originally developed for Bitcoin in 2008, blockchain now has applications beyond cryptocurrency. Smart contracts automatically execute when conditions are met. Supply chain tracking ensures product authenticity. Healthcare systems secure patient records. Governments explore blockchain for voting and identity verification. The technology's decentralized nature eliminates the need for trusted intermediaries in many transactions.`,
    questions: [
      {
        id: 'tech-3-q1',
        question: 'When was blockchain originally developed?',
        options: ['2000', '2005', '2008', '2015'],
        correctIndex: 2,
      },
      {
        id: 'tech-3-q2',
        question: 'What makes blockchain records difficult to alter?',
        options: ['Passwords', 'Cryptographic hashes', 'Firewalls', 'Encryption keys'],
        correctIndex: 1,
      },
    ],
  },

  // Nature articles
  {
    id: 'nat-1',
    topicId: 'nature',
    title: 'Coral Reefs',
    difficulty: 'beginner',
    wordCount: 82,
    content: `Coral reefs are underwater ecosystems built by tiny animals called coral polyps. These structures support about 25% of all marine species despite covering less than 1% of the ocean floor. Fish, sea turtles, and countless invertebrates depend on reefs for food and shelter. Coral polyps have a symbiotic relationship with algae that live in their tissues. Rising ocean temperatures cause coral bleaching, threatening these vital ecosystems. Conservation efforts worldwide aim to protect remaining reefs and restore damaged areas.`,
    questions: [
      {
        id: 'nat-1-q1',
        question: 'What percentage of marine species do reefs support?',
        options: ['10%', '25%', '50%', '75%'],
        correctIndex: 1,
      },
      {
        id: 'nat-1-q2',
        question: 'What causes coral bleaching?',
        options: ['Pollution', 'Rising temperatures', 'Overfishing', 'Storms'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'nat-2',
    topicId: 'nature',
    title: 'Migration Patterns',
    difficulty: 'intermediate',
    wordCount: 98,
    content: `Animal migration is one of nature's most impressive phenomena. Birds, whales, and butterflies travel thousands of miles following seasonal patterns. Arctic terns make the longest journey, flying from Arctic to Antarctic and back each year. Monarch butterflies migrate up to 3,000 miles from Canada to Mexico. Animals navigate using the sun, stars, Earth's magnetic field, and even smell. Migration allows species to find food, escape harsh weather, and breed in optimal conditions. Climate change is disrupting these ancient patterns, forcing many species to adapt their routes and timing.`,
    questions: [
      {
        id: 'nat-2-q1',
        question: 'Which bird makes the longest migration?',
        options: ['Swallow', 'Arctic tern', 'Goose', 'Eagle'],
        correctIndex: 1,
      },
      {
        id: 'nat-2-q2',
        question: 'How far do monarch butterflies migrate?',
        options: ['100 miles', '500 miles', '3,000 miles', '10,000 miles'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'nat-3',
    topicId: 'nature',
    title: 'Rainforest Ecosystems',
    difficulty: 'advanced',
    wordCount: 108,
    content: `Tropical rainforests cover just 6% of Earth's surface but contain over half of all plant and animal species. These complex ecosystems have distinct vertical layers: the forest floor, understory, canopy, and emergent layer. Each layer supports unique communities of organisms. The Amazon rainforest alone produces 20% of the world's oxygen. Rainforests regulate global climate by absorbing carbon dioxide and releasing water vapor. Indigenous communities have lived sustainably in these forests for millennia. Deforestation for agriculture and logging threatens this biodiversity. Scientists estimate we lose 80,000 acres of rainforest daily, along with countless undiscovered species.`,
    questions: [
      {
        id: 'nat-3-q1',
        question: 'What percentage of Earth does rainforest cover?',
        options: ['2%', '6%', '15%', '25%'],
        correctIndex: 1,
      },
      {
        id: 'nat-3-q2',
        question: 'How many acres of rainforest are lost daily?',
        options: ['8,000', '18,000', '80,000', '800,000'],
        correctIndex: 2,
      },
    ],
  },

  // Space articles
  {
    id: 'space-1',
    topicId: 'space',
    title: 'Our Solar System',
    difficulty: 'beginner',
    wordCount: 85,
    content: `Our solar system contains eight planets orbiting the Sun. The inner rocky planets are Mercury, Venus, Earth, and Mars. Beyond the asteroid belt lie the gas giants Jupiter and Saturn, and ice giants Uranus and Neptune. Pluto was reclassified as a dwarf planet in 2006. The Sun contains 99.8% of the solar system's mass. Light from the Sun takes about 8 minutes to reach Earth. Scientists continue discovering new objects in the outer solar system, including potential dwarf planets.`,
    questions: [
      {
        id: 'space-1-q1',
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctIndex: 1,
      },
      {
        id: 'space-1-q2',
        question: 'How long does sunlight take to reach Earth?',
        options: ['8 seconds', '8 minutes', '8 hours', '8 days'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'space-2',
    topicId: 'space',
    title: 'Black Holes',
    difficulty: 'intermediate',
    wordCount: 102,
    content: `Black holes are regions of space where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their lives. The boundary around a black hole is called the event horizon. Once anything crosses this point, it cannot return. Supermassive black holes millions of times the Sun's mass exist at the centers of most galaxies. In 2019, scientists captured the first image of a black hole's shadow. Black holes warp space and time around them, confirming predictions from Einstein's theory of general relativity.`,
    questions: [
      {
        id: 'space-2-q1',
        question: 'What is the boundary of a black hole called?',
        options: ['The singularity', 'The event horizon', 'The corona', 'The accretion disk'],
        correctIndex: 1,
      },
      {
        id: 'space-2-q2',
        question: 'When was the first black hole image captured?',
        options: ['2015', '2017', '2019', '2021'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'space-3',
    topicId: 'space',
    title: 'Mars Exploration',
    difficulty: 'advanced',
    wordCount: 115,
    content: `Mars has fascinated humanity for centuries and remains a primary target for space exploration. The red planet has polar ice caps, ancient river valleys, and the largest volcano in the solar system. NASA's rovers Spirit, Opportunity, Curiosity, and Perseverance have explored the Martian surface, finding evidence that liquid water once existed there. The Ingenuity helicopter achieved the first powered flight on another planet. Multiple agencies and private companies plan crewed missions to Mars within the next two decades. Challenges include the six-month journey, radiation exposure, and establishing sustainable habitats. Mars represents humanity's next giant leap in space exploration.`,
    questions: [
      {
        id: 'space-3-q1',
        question: 'What did Ingenuity achieve on Mars?',
        options: ['First landing', 'First powered flight', 'First water discovery', 'First sample return'],
        correctIndex: 1,
      },
      {
        id: 'space-3-q2',
        question: 'How long is the journey to Mars?',
        options: ['3 months', '6 months', '1 year', '2 years'],
        correctIndex: 1,
      },
    ],
  },

  // Psychology articles
  {
    id: 'psych-1',
    topicId: 'psychology',
    title: 'Memory and Learning',
    difficulty: 'beginner',
    wordCount: 88,
    content: `Our brains store and retrieve information through complex memory systems. Short-term memory holds information for seconds to minutes. With repetition and meaning, information transfers to long-term memory. Sleep plays a crucial role in consolidating memories. The hippocampus acts as a gateway between short and long-term storage. Spaced repetition, where you review information at increasing intervals, improves retention dramatically. Emotional experiences create stronger memories. Understanding how memory works can help students study more effectively and everyone remember important information better.`,
    questions: [
      {
        id: 'psych-1-q1',
        question: 'What brain region is key for memory storage?',
        options: ['Cerebellum', 'Hippocampus', 'Frontal lobe', 'Brain stem'],
        correctIndex: 1,
      },
      {
        id: 'psych-1-q2',
        question: 'What improves memory retention?',
        options: ['Cramming', 'Spaced repetition', 'Multitasking', 'Speed reading'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'psych-2',
    topicId: 'psychology',
    title: 'Decision Making',
    difficulty: 'intermediate',
    wordCount: 100,
    content: `Every day we make thousands of decisions, from trivial to life-changing. Cognitive biases systematically affect our choices. Confirmation bias leads us to favor information that supports existing beliefs. The availability heuristic causes us to overweight recent or memorable events. Loss aversion means we feel losses more strongly than equivalent gains. Decision fatigue reduces our willpower throughout the day. Understanding these patterns helps us make better choices. Taking breaks, limiting options, and using structured frameworks can improve decision quality. Awareness of our biases is the first step toward overcoming them.`,
    questions: [
      {
        id: 'psych-2-q1',
        question: 'What is loss aversion?',
        options: ['Fear of making decisions', 'Feeling losses more than gains', 'Avoiding all risk', 'Preferring the familiar'],
        correctIndex: 1,
      },
      {
        id: 'psych-2-q2',
        question: 'What causes us to favor supporting information?',
        options: ['Decision fatigue', 'Loss aversion', 'Confirmation bias', 'Availability heuristic'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'psych-3',
    topicId: 'psychology',
    title: 'The Science of Habits',
    difficulty: 'advanced',
    wordCount: 112,
    content: `Habits are automatic behaviors triggered by specific cues. The habit loop consists of three parts: cue, routine, and reward. Your brain creates habits to conserve energy, allowing complex behaviors to become automatic. The basal ganglia stores habitual patterns while the prefrontal cortex handles conscious decisions. To change a habit, identify the cue and reward, then substitute a new routine. Keystone habits like exercise trigger positive changes across multiple life areas. Research shows habits take an average of 66 days to form, not the commonly cited 21 days. Understanding habit mechanics empowers personal transformation and behavior change.`,
    questions: [
      {
        id: 'psych-3-q1',
        question: 'What are the three parts of the habit loop?',
        options: ['Start, middle, end', 'Cue, routine, reward', 'Thought, action, result', 'Goal, effort, outcome'],
        correctIndex: 1,
      },
      {
        id: 'psych-3-q2',
        question: 'How long do habits typically take to form?',
        options: ['21 days', '30 days', '66 days', '90 days'],
        correctIndex: 2,
      },
    ],
  },

  // Economics articles
  {
    id: 'econ-1',
    topicId: 'economics',
    title: 'Supply and Demand',
    difficulty: 'beginner',
    wordCount: 86,
    content: `Supply and demand is the fundamental principle of economics. When demand for a product exceeds supply, prices rise. When supply exceeds demand, prices fall. The point where supply equals demand is called equilibrium. Many factors affect these curves: consumer preferences, income levels, production costs, and available substitutes. Markets naturally move toward equilibrium as buyers and sellers respond to price signals. Understanding this basic concept helps explain everything from gas prices to housing markets to the cost of concert tickets.`,
    questions: [
      {
        id: 'econ-1-q1',
        question: 'What happens when demand exceeds supply?',
        options: ['Prices fall', 'Prices rise', 'Prices stay same', 'Supply increases'],
        correctIndex: 1,
      },
      {
        id: 'econ-1-q2',
        question: 'What is equilibrium?',
        options: ['Maximum profit', 'Minimum cost', 'Supply equals demand', 'Zero inflation'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'econ-2',
    topicId: 'economics',
    title: 'Inflation Explained',
    difficulty: 'intermediate',
    wordCount: 98,
    content: `Inflation is the rate at which prices rise over time, reducing purchasing power. Central banks target low, stable inflation around 2% annually. Higher inflation erodes savings and creates economic uncertainty. Deflation, or falling prices, can be equally harmful as consumers delay purchases expecting lower prices. Governments measure inflation through price indices like the Consumer Price Index. Causes include increased money supply, rising production costs, and strong consumer demand. Central banks use interest rates to control inflation: raising rates slows borrowing and spending. Understanding inflation helps individuals make better financial decisions.`,
    questions: [
      {
        id: 'econ-2-q1',
        question: 'What inflation rate do central banks typically target?',
        options: ['0%', '2%', '5%', '10%'],
        correctIndex: 1,
      },
      {
        id: 'econ-2-q2',
        question: 'How do central banks control inflation?',
        options: ['Printing money', 'Adjusting interest rates', 'Setting prices', 'Taxing goods'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'econ-3',
    topicId: 'economics',
    title: 'Global Trade',
    difficulty: 'advanced',
    wordCount: 110,
    content: `International trade allows countries to specialize in producing goods where they have comparative advantage. This principle, established by economist David Ricardo, shows that trade benefits all participants even when one country produces everything more efficiently. Trade agreements reduce tariffs and barriers between nations. Global supply chains distribute production across multiple countries for efficiency. While trade increases overall wealth, it creates winners and losers within economies. Manufacturing workers in developed nations often face job losses as production moves to lower-cost regions. Governments balance free trade benefits against protecting domestic industries and workers through various policy tools.`,
    questions: [
      {
        id: 'econ-3-q1',
        question: 'Who established comparative advantage theory?',
        options: ['Adam Smith', 'David Ricardo', 'John Keynes', 'Milton Friedman'],
        correctIndex: 1,
      },
      {
        id: 'econ-3-q2',
        question: 'What do trade agreements primarily reduce?',
        options: ['Wages', 'Production', 'Tariffs', 'Employment'],
        correctIndex: 2,
      },
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id);
}

export function getArticlesByTopic(topicId: string): Article[] {
  return ARTICLES.filter(a => a.topicId === topicId);
}

export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find(a => a.id === id);
}
