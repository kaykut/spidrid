import { Article } from '../../../types/learning';

export const SCIENCE_DISCOVERY_ARTICLES: Article[] = [
  // Practice articles (P01-P10) - progressively longer
  {
    id: 'science-discovery-p01',
    topicId: 'science-discovery',
    title: 'The Water Cycle',
    difficulty: 'beginner',
    wordCount: 500,
    articleType: 'practice',
    orderIndex: 1,
    content: `Water moves through our planet in a continuous cycle that has been repeating for billions of years. The sun heats water in oceans, lakes, and rivers, causing it to evaporate into the atmosphere as water vapor. This invisible gas rises high into the sky where temperatures are much cooler.

As water vapor rises and cools, it undergoes a process called condensation. The water molecules slow down and come together, forming tiny droplets that cling to particles of dust and pollen in the air. These droplets gather together to form clouds that float across the sky, carried by wind currents.

When clouds become heavy with water droplets, precipitation occurs. Depending on temperature conditions, this water falls back to Earth as rain, snow, sleet, or hail. In warmer regions, rain is most common, while colder areas experience more snow and ice.

Once water reaches the ground, it begins its journey back to larger bodies of water. Some water flows across the surface as runoff, collecting in streams and rivers that eventually reach the ocean. Other water seeps into the ground, becoming groundwater that moves slowly through soil and rock layers.

Plants play an important role in the water cycle through a process called transpiration. Trees and plants absorb water through their roots and release it back into the atmosphere through tiny pores in their leaves. A single large oak tree can release over 100 gallons of water into the air each day.

The water cycle is essential for life on Earth. It distributes heat around the planet, shapes landscapes through erosion, and provides fresh water for drinking, agriculture, and industry. Scientists study this cycle to understand climate patterns and predict weather changes.

Climate change is affecting the water cycle in significant ways. Warmer temperatures increase evaporation rates and change precipitation patterns. Some regions experience more intense storms while others face prolonged droughts. Understanding these changes helps communities prepare for future water challenges.

The same water molecules that exist today have been cycling through our planet for billions of years. The water you drink may have once been part of a dinosaur's lake or a glacier during the ice age. This remarkable recycling system connects all life on Earth across time and space.`,
    questions: [
      {
        id: 'science-discovery-p01-q1',
        type: 'single_choice',
        question: 'What causes water to evaporate from oceans and lakes?',
        options: ['The moon\'s gravity', 'Heat from the sun', 'Wind currents', 'Ocean currents'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p01-q2',
        type: 'single_choice',
        question: 'What process occurs when water vapor cools and forms droplets?',
        options: ['Evaporation', 'Precipitation', 'Condensation', 'Transpiration'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p01-q3',
        type: 'true_false',
        question: 'Plants release water into the atmosphere through transpiration.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'science-discovery-p02',
    topicId: 'science-discovery',
    title: 'Photosynthesis: Nature\'s Energy Factory',
    difficulty: 'beginner',
    wordCount: 750,
    articleType: 'practice',
    orderIndex: 2,
    content: `Photosynthesis is one of the most important chemical processes on Earth. It allows plants, algae, and certain bacteria to convert sunlight into chemical energy stored in glucose. This remarkable process sustains nearly all life on our planet by producing food and oxygen.

The word photosynthesis comes from Greek roots meaning "light" and "putting together." This perfectly describes what happens during the process. Plants combine simple ingredients using light energy to create complex sugar molecules. The basic equation is straightforward: carbon dioxide plus water plus light energy yields glucose plus oxygen.

Leaves are the primary factories where photosynthesis occurs. Their flat, broad shape maximizes exposure to sunlight. Inside each leaf, millions of cells contain specialized structures called chloroplasts. These tiny organelles are filled with chlorophyll, the green pigment that gives plants their characteristic color and captures light energy.

Chlorophyll molecules are remarkably efficient at absorbing light. They primarily capture red and blue wavelengths while reflecting green light back to our eyes. This is why most plants appear green to us. Some plants have additional pigments that create red, purple, or orange colors, but chlorophyll remains the key player in photosynthesis.

The process of photosynthesis occurs in two main stages. The light-dependent reactions happen first, taking place in the thylakoid membranes inside chloroplasts. Here, chlorophyll captures light energy and uses it to split water molecules. This releases oxygen as a byproduct and creates energy-carrying molecules that power the next stage.

The second stage, called the Calvin cycle, occurs in the fluid-filled region of the chloroplast called the stroma. During this stage, the plant uses the energy captured earlier to convert carbon dioxide from the air into glucose. This sugar serves as the plant's primary food source and building material for growth.

Plants use glucose in several ways. Some is immediately broken down through cellular respiration to release energy for growth and other life processes. Some is converted into starches and stored for later use. The rest becomes structural materials like cellulose that form cell walls and other plant tissues.

The oxygen produced during photosynthesis is essential for most life on Earth. Animals, including humans, breathe this oxygen and use it in cellular respiration to release energy from food. In return, we exhale carbon dioxide that plants use for photosynthesis. This beautiful cycle connects all living things.

Photosynthesis has shaped Earth's atmosphere over billions of years. Early photosynthetic organisms, likely cyanobacteria, began producing oxygen about 2.7 billion years ago. This gradually transformed Earth's atmosphere from one dominated by carbon dioxide and methane to the oxygen-rich air we breathe today. This change, called the Great Oxygenation Event, made complex life possible.

Scientists study photosynthesis intensively because of its potential applications. Researchers hope to create artificial photosynthesis systems that could produce clean fuel from sunlight and water. Others work to enhance photosynthesis in crop plants to increase food production and help feed our growing population.

Climate change adds urgency to understanding photosynthesis. Plants absorb about 30 percent of human carbon dioxide emissions through photosynthesis. Protecting and expanding forests is crucial for managing atmospheric carbon levels. However, rising temperatures and changing conditions may affect how efficiently plants photosynthesize in the future.`,
    questions: [
      {
        id: 'science-discovery-p02-q1',
        type: 'single_choice',
        question: 'What pigment is primarily responsible for capturing light energy in plants?',
        options: ['Glucose', 'Chlorophyll', 'Cellulose', 'Carotene'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p02-q2',
        type: 'single_choice',
        question: 'Where does the Calvin cycle occur?',
        options: ['In the thylakoid membranes', 'In the stroma', 'In the cell wall', 'In the nucleus'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p02-q3',
        type: 'multiple_select',
        question: 'What are the products of photosynthesis? Select all that apply.',
        options: ['Glucose', 'Oxygen', 'Carbon dioxide', 'Water'],
        correctIndices: [0, 1],
      },
      {
        id: 'science-discovery-p02-q4',
        type: 'numeric',
        question: 'Approximately when did early organisms begin producing oxygen (in billions of years ago)?',
        correctValue: 2.7,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'billion years',
      },
      {
        id: 'science-discovery-p02-q5',
        type: 'true_false',
        question: 'The Great Oxygenation Event made complex life possible on Earth.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'science-discovery-p03',
    topicId: 'science-discovery',
    title: 'The Solar System: Our Cosmic Neighborhood',
    difficulty: 'beginner',
    wordCount: 1000,
    articleType: 'practice',
    orderIndex: 3,
    content: `Our solar system formed approximately 4.6 billion years ago from a massive cloud of gas and dust called a solar nebula. Gravity pulled this material together, with most of it collapsing to form the Sun at the center. The remaining debris eventually coalesced into planets, moons, asteroids, and comets that orbit our star today.

The Sun contains over 99 percent of the total mass in our solar system. This enormous ball of hot plasma generates energy through nuclear fusion, converting hydrogen into helium in its core where temperatures reach 27 million degrees Fahrenheit. The energy produced travels outward and eventually reaches Earth as sunlight, sustaining all life on our planet.

Mercury is the closest planet to the Sun, orbiting at an average distance of just 36 million miles. Despite its proximity to our star, Mercury is not the hottest planet because it lacks an atmosphere to trap heat. Temperatures on Mercury swing wildly from 800 degrees Fahrenheit during the day to minus 290 degrees at night.

Venus, often called Earth's twin because of its similar size, has a thick atmosphere composed primarily of carbon dioxide. This creates an extreme greenhouse effect that makes Venus the hottest planet in our solar system, with surface temperatures reaching 900 degrees Fahrenheit. Soviet spacecraft Venera 7 became the first probe to transmit data from Venus's surface in December 1970.

Earth is the third planet from the Sun and the only known world to harbor life. Our planet sits in what astronomers call the habitable zone, where temperatures allow liquid water to exist on the surface. Earth's atmosphere protects us from harmful radiation while maintaining temperatures suitable for life through a balanced greenhouse effect.

Mars, the fourth planet, has fascinated humans for centuries with its distinctive red color caused by iron oxide on its surface. NASA's Perseverance rover landed in Jezero Crater on February 18, 2021, beginning its search for signs of ancient microbial life. Scientists believe Mars once had rivers and lakes billions of years ago when its atmosphere was thicker.

The asteroid belt separates the inner rocky planets from the outer gas giants. This region contains millions of rocky objects ranging from small boulders to the dwarf planet Ceres, which measures 590 miles in diameter. The asteroid belt formed from material that never coalesced into a planet due to Jupiter's powerful gravitational influence.

Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined. This gas giant has no solid surface, just layers of hydrogen and helium that become denser with depth. The Great Red Spot is a massive storm larger than Earth that has been raging for at least 400 years since astronomers first observed it in the 1600s.

Saturn is famous for its spectacular ring system, which consists of billions of particles of ice and rock. Italian astronomer Galileo Galilei first observed Saturn's rings in 1610, though his telescope was too primitive to resolve them clearly. The Cassini spacecraft orbited Saturn from 2004 to 2017, revealing incredible details about the planet and its 146 known moons.

Uranus rotates on its side, likely due to a collision with an Earth-sized object early in the solar system's history. British astronomer William Herschel discovered Uranus on March 13, 1781, making it the first planet found using a telescope. The planet appears blue-green due to methane in its atmosphere, which absorbs red light from the Sun.

Neptune, the eighth and most distant planet, was discovered through mathematical prediction in 1846. Astronomers noticed that Uranus was not following its expected orbit and calculated that another planet's gravity must be affecting it. German astronomer Johann Galle found Neptune within one degree of the predicted position.

Beyond Neptune lies the Kuiper Belt, a vast region of icy bodies including the dwarf planet Pluto. The International Astronomical Union reclassified Pluto as a dwarf planet in August 2006 because it has not cleared the neighborhood around its orbit. NASA's New Horizons spacecraft flew past Pluto on July 14, 2015, revealing a complex world with mountains, glaciers, and a thin atmosphere.

Our understanding of the solar system continues to expand as new missions explore these distant worlds. Scientists have discovered over 5,500 planets orbiting other stars, suggesting that planetary systems are common throughout the universe. The search for life beyond Earth remains one of humanity's most profound scientific endeavors.`,
    questions: [
      {
        id: 'science-discovery-p03-q1',
        type: 'single_choice',
        question: 'Which planet is the hottest in our solar system?',
        options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p03-q2',
        type: 'single_choice',
        question: 'Who discovered Uranus?',
        options: ['Galileo Galilei', 'Johann Galle', 'William Herschel', 'Isaac Newton'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p03-q3',
        type: 'multiple_select',
        question: 'Which statements about Jupiter are true? Select all that apply.',
        options: ['It has a solid surface', 'It is the largest planet', 'The Great Red Spot is a massive storm', 'It has a mass greater than all other planets combined'],
        correctIndices: [1, 2, 3],
      },
      {
        id: 'science-discovery-p03-q4',
        type: 'true_false',
        question: 'Pluto was reclassified as a dwarf planet in 2006.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p03-q5',
        type: 'numeric',
        question: 'Approximately how old is our solar system (in billions of years)?',
        correctValue: 4.6,
        tolerance: 0.2,
        min: 3,
        max: 6,
        step: 0.1,
        unit: 'billion years',
      },
      {
        id: 'science-discovery-p03-q6',
        type: 'single_choice',
        question: 'What separates the inner rocky planets from the outer gas giants?',
        options: ['The Kuiper Belt', 'The Oort Cloud', 'The asteroid belt', 'The habitable zone'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'science-discovery-p04',
    topicId: 'science-discovery',
    title: 'The Theory of Evolution: Life\'s Grand Story',
    difficulty: 'intermediate',
    wordCount: 1300,
    articleType: 'practice',
    orderIndex: 4,
    content: `Charles Darwin published On the Origin of Species on November 24, 1859, forever changing how humans understand life on Earth. His theory of evolution by natural selection explained how species change over time and how the remarkable diversity of life arose from common ancestors. This revolutionary idea remains the foundation of modern biology nearly two centuries later.

Darwin developed his theory during a five-year voyage aboard HMS Beagle, which departed Plymouth, England in December 1831. The ship's mission was to survey South American coastlines, but Darwin used this opportunity to observe wildlife across multiple continents. His observations in the Galapagos Islands proved particularly influential when he noticed that finches on different islands had distinctly shaped beaks adapted to local food sources.

Natural selection works through a simple but powerful mechanism that Darwin described after years of careful thought. All organisms produce more offspring than can survive given limited resources like food and territory. Individuals within a species vary in their traits, and some of these variations provide advantages in the struggle for survival. Those individuals with beneficial traits survive longer and reproduce more successfully than those without them.

Offspring inherit traits from their parents, so advantageous characteristics become more common in each successive generation. Over thousands and millions of years, small changes accumulate to produce major transformations. Populations gradually adapt to their environments, and given enough time, new species emerge from ancestral forms. Darwin called this process descent with modification.

The fossil record provides compelling evidence for evolution by documenting life's history in stone. Paleontologists have discovered thousands of transitional forms showing intermediate stages between major groups. Archaeopteryx, found in Germany in 1861, displays both dinosaur and bird features, supporting the evolutionary connection between these groups. Tiktaalik, discovered in Arctic Canada in 2004, shows how fish evolved features necessary for life on land approximately 375 million years ago.

DNA evidence has revolutionized our understanding of evolutionary relationships since James Watson and Francis Crick discovered its structure in 1953. All living organisms use the same genetic code, demonstrating their common ancestry. Scientists can compare DNA sequences to determine how closely related different species are and when their evolutionary paths diverged. Human DNA shares approximately 98.8 percent of its sequence with chimpanzee DNA, confirming our close evolutionary relationship.

Evolution continues occurring today, sometimes fast enough for scientists to observe directly. Bacteria develop antibiotic resistance within years or even months because their short generation times allow rapid natural selection. Darwin's finches in the Galapagos showed measurable beak changes after a severe drought in 1977 favored birds that could crack larger seeds. The peppered moth in England evolved darker coloring during the Industrial Revolution when pollution darkened tree bark.

Alfred Russel Wallace independently developed a nearly identical theory while studying wildlife in Southeast Asia during the 1850s. Wallace wrote to Darwin describing his ideas in February 1858, prompting Darwin to finally publish his long-delayed work. Both scientists presented their theories jointly at the Linnean Society of London on July 1, 1858, though Darwin's book appeared the following year and received most of the credit.

The theory of evolution faced significant opposition when first proposed, particularly from religious groups who saw it as contradicting biblical accounts of creation. However, overwhelming evidence accumulated over subsequent decades convinced the scientific community. Today virtually all biologists accept evolution as the best explanation for life's diversity, supported by evidence from paleontology, genetics, anatomy, embryology, and direct observation.

Evolution has practical applications beyond pure scientific understanding. Medical researchers use evolutionary principles to track disease outbreaks and predict how viruses might mutate. Agricultural scientists apply evolutionary thinking to develop crops resistant to pests and diseases. Conservation biologists use evolutionary analysis to identify genetically distinct populations that deserve protection.

Understanding evolution helps us appreciate our place in the history of life on Earth. Humans are not separate from nature but products of the same evolutionary processes that shaped all other species. Our ancestors lived in trees, walked on four legs, and swam in ancient seas billions of years ago. The atoms in our bodies were forged in dying stars before Earth existed. Evolution connects us to all living things in a grand story spanning nearly four billion years.`,
    questions: [
      {
        id: 'science-discovery-p04-q1',
        type: 'single_choice',
        question: 'When did Darwin publish On the Origin of Species?',
        options: ['November 24, 1831', 'November 24, 1859', 'July 1, 1858', 'February 12, 1809'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p04-q2',
        type: 'single_choice',
        question: 'What fossil discovery shows intermediate features between fish and land animals?',
        options: ['Archaeopteryx', 'Tiktaalik', 'Australopithecus', 'Megalodon'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p04-q3',
        type: 'multiple_select',
        question: 'Which statements about natural selection are true? Select all that apply.',
        options: ['Organisms produce more offspring than can survive', 'Individuals with beneficial traits reproduce more successfully', 'All offspring are identical to their parents', 'Small changes accumulate over millions of years'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'science-discovery-p04-q4',
        type: 'true_false',
        question: 'Alfred Russel Wallace independently developed a theory of evolution similar to Darwin\'s.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p04-q5',
        type: 'numeric',
        question: 'Approximately what percentage of DNA do humans share with chimpanzees?',
        correctValue: 98.8,
        tolerance: 0.5,
        min: 90,
        max: 100,
        step: 0.1,
        unit: 'percent',
      },
      {
        id: 'science-discovery-p04-q6',
        type: 'single_choice',
        question: 'Who discovered the structure of DNA in 1953?',
        options: ['Charles Darwin and Alfred Wallace', 'James Watson and Francis Crick', 'Gregor Mendel and Thomas Hunt Morgan', 'Louis Pasteur and Robert Koch'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'science-discovery-p05',
    topicId: 'science-discovery',
    title: 'Quantum Mechanics: The Strange World of the Very Small',
    difficulty: 'intermediate',
    wordCount: 1700,
    articleType: 'practice',
    orderIndex: 5,
    content: `Quantum mechanics describes the behavior of matter and energy at the smallest scales, where particles act in ways that defy everyday intuition. This revolutionary branch of physics emerged in the early twentieth century when scientists discovered that classical physics could not explain certain phenomena. Today quantum mechanics underlies technologies from lasers to smartphones to medical imaging equipment.

The quantum revolution began when German physicist Max Planck proposed in December 1900 that energy comes in discrete packets called quanta rather than flowing continuously. Planck made this suggestion to solve a problem in physics called the ultraviolet catastrophe, where classical theory predicted that hot objects should emit infinite amounts of high-frequency radiation. His quantum hypothesis accurately described the actual radiation patterns that scientists observed in laboratory experiments.

Albert Einstein extended Planck's ideas in 1905 by proposing that light itself consists of discrete particles now called photons. Einstein used this concept to explain the photoelectric effect, where light striking metal surfaces releases electrons in patterns that classical wave theory could not predict. He showed that only light above a certain frequency would eject electrons, regardless of intensity, because individual photons needed sufficient energy. This work earned Einstein the Nobel Prize in Physics in 1921.

Danish physicist Niels Bohr applied quantum concepts to atomic structure in 1913, explaining why atoms emit light at specific wavelengths. Bohr proposed that electrons orbit the nucleus only at certain allowed distances, each corresponding to a specific energy level. When electrons jump between levels, they absorb or emit photons with energy exactly equal to the difference between levels. This model explained the spectral lines that scientists had observed for decades without understanding their origin.

Werner Heisenberg and Erwin Schrodinger developed more complete mathematical frameworks for quantum mechanics during the 1920s. Heisenberg formulated matrix mechanics in 1925, while Schrodinger introduced his famous wave equation in 1926. Though these approaches initially appeared different, physicists soon proved they were mathematically equivalent ways of describing the same underlying reality.

The uncertainty principle, which Heisenberg announced in 1927, reveals a fundamental limit on what we can know about quantum particles. This principle states that we cannot simultaneously measure both the position and momentum of a particle with perfect accuracy. The more precisely we determine one quantity, the less precisely we can know the other. This limitation is not due to imperfect instruments but reflects the intrinsic nature of quantum reality.

Wave-particle duality represents another deeply counterintuitive aspect of quantum mechanics. Experiments show that particles like electrons behave as waves under some circumstances and as particles under others. The famous double-slit experiment demonstrates this strangeness dramatically. When electrons pass through two parallel slits, they create an interference pattern characteristic of waves, even when sent through one at a time. Yet when scientists attempt to detect which slit each electron passes through, the interference pattern disappears and the electrons behave as particles.

Quantum superposition allows particles to exist in multiple states simultaneously until measured. Schrodinger illustrated this concept with his famous thought experiment involving a cat in a sealed box with a quantum trigger that might or might not release poison. According to quantum mechanics, until someone opens the box and observes the outcome, the cat exists in a superposition of alive and dead states. While macroscopic objects like cats do not actually exhibit such behavior due to rapid environmental interactions, individual particles genuinely exist in superposition states.

Quantum entanglement connects particles in ways Einstein famously called spooky action at a distance. When two particles become entangled, measuring one instantly affects the other regardless of the distance separating them. Einstein believed this implied some flaw in quantum mechanics, but experiments since the 1980s have confirmed that entanglement is real. Scientists led by Alain Aspect performed landmark tests in Paris in 1982 that ruled out classical explanations for entanglement correlations.

Quantum mechanics has enabled technologies that transformed modern life beyond recognition. Transistors, the building blocks of all electronic devices, rely on quantum mechanical behavior of electrons in semiconductors. The first working transistor was demonstrated at Bell Labs on December 23, 1947, by John Bardeen, Walter Brattain, and William Shockley. Lasers, which produce coherent light through quantum processes, enable everything from fiber optic communications to barcode scanners to eye surgery.

Quantum computing represents the next frontier in applying quantum principles to technology. Unlike classical computers that process information as bits valued at either zero or one, quantum computers use quantum bits or qubits that can exist in superposition of both values simultaneously. This allows quantum computers to explore many possible solutions at once for certain problems. Google announced in October 2019 that its 53-qubit processor performed a calculation in 200 seconds that would take the most powerful classical supercomputer approximately 10,000 years.

Medical imaging technologies including MRI scanners depend on quantum mechanical phenomena. Magnetic resonance imaging exploits the quantum spin properties of hydrogen atoms in body tissues. By placing patients in strong magnetic fields and applying radio pulses, MRI machines can create detailed images of internal organs without using harmful radiation. This technology has revolutionized diagnosis of neurological conditions, joint injuries, and many other medical problems.

The interpretation of quantum mechanics remains philosophically controversial despite its mathematical precision and predictive success. The Copenhagen interpretation, developed primarily by Bohr and Heisenberg, holds that particles do not have definite properties until measured. The many-worlds interpretation, proposed by Hugh Everett in 1957, suggests that all possible measurement outcomes actually occur in branching parallel universes. Physicists continue debating these foundational questions while using quantum mechanics successfully in practical applications.

Quantum mechanics reveals a universe far stranger than our everyday experience suggests. At the smallest scales, certainty gives way to probability, particles become waves, and observers affect what they observe. This revolutionary theory has passed every experimental test while enabling technologies that previous generations could scarcely imagine.`,
    questions: [
      {
        id: 'science-discovery-p05-q1',
        type: 'single_choice',
        question: 'Who first proposed that energy comes in discrete packets called quanta?',
        options: ['Albert Einstein', 'Niels Bohr', 'Max Planck', 'Werner Heisenberg'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p05-q2',
        type: 'single_choice',
        question: 'For which discovery did Einstein win the Nobel Prize in Physics in 1921?',
        options: ['Theory of relativity', 'Explanation of the photoelectric effect', 'Discovery of quantum entanglement', 'Development of the atomic bomb'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p05-q3',
        type: 'multiple_select',
        question: 'Which technologies depend on quantum mechanics? Select all that apply.',
        options: ['Transistors', 'MRI scanners', 'Steam engines', 'Lasers'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'science-discovery-p05-q4',
        type: 'true_false',
        question: 'The uncertainty principle states that we cannot simultaneously measure both the position and momentum of a particle with perfect accuracy.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p05-q5',
        type: 'numeric',
        question: 'In what year was the first working transistor demonstrated at Bell Labs?',
        correctValue: 1947,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-p05-q6',
        type: 'single_choice',
        question: 'Who performed landmark experiments in 1982 confirming quantum entanglement?',
        options: ['Erwin Schrodinger', 'Hugh Everett', 'Alain Aspect', 'Richard Feynman'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p05-q7',
        type: 'single_choice',
        question: 'What is the many-worlds interpretation of quantum mechanics?',
        options: ['Particles do not have definite properties until measured', 'All possible measurement outcomes occur in parallel universes', 'Quantum effects only occur at absolute zero temperature', 'Entangled particles communicate faster than light'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p05-q8',
        type: 'numeric',
        question: 'How many qubits did Google\'s quantum processor have when it achieved quantum supremacy?',
        correctValue: 53,
        tolerance: 2,
        min: 10,
        max: 100,
        step: 1,
        unit: 'qubits',
      },
    ],
  },
  {
    id: 'science-discovery-p06',
    topicId: 'science-discovery',
    title: 'Black Holes: Gravity\'s Ultimate Mystery',
    difficulty: 'intermediate',
    wordCount: 2100,
    articleType: 'practice',
    orderIndex: 6,
    content: `Black holes represent some of the most extreme objects in the universe, where gravity becomes so powerful that nothing can escape, not even light itself. These cosmic phenomena challenge our understanding of physics and continue revealing secrets about space, time, and the fundamental nature of reality. Scientists have transformed black holes from theoretical curiosities into observational targets that help unlock the mysteries of the cosmos.

Albert Einstein's general theory of relativity, published in November 1915, predicted the existence of black holes as a mathematical consequence of how mass warps spacetime. German physicist Karl Schwarzschild calculated the first exact solution to Einstein's equations while serving on the Russian front during World War I, describing what we now call a Schwarzschild black hole. He completed this groundbreaking work in December 1915, just weeks after Einstein presented his theory, and died from illness the following May at age 42.

The term black hole was not coined until 1967, when American physicist John Wheeler popularized it during a lecture at the Goddard Institute for Space Studies in New York City. Before this catchy name gained acceptance, scientists called these objects frozen stars or collapsed stars. Wheeler's memorable phrase captured public imagination and helped black holes become icons of modern cosmology and popular science fiction.

Black holes form through several different processes depending on their size and origin. Stellar black holes result when massive stars exhaust their nuclear fuel and collapse under their own gravity. Stars with masses greater than about 20 times our Sun can produce black holes when they die in supernova explosions. The core collapses to a point while outer layers blast outward, leaving behind an invisible gravitational remnant typically containing between 5 and 30 solar masses.

Supermassive black holes lurk at the centers of most large galaxies, containing millions or even billions of times the mass of our Sun. The Milky Way's central black hole, called Sagittarius A*, contains approximately 4 million solar masses packed into a region smaller than Mercury's orbit around the Sun. Astronomers Reinhard Genzel and Andrea Ghez shared the 2020 Nobel Prize in Physics for decades of observations proving this monster exists by tracking stars orbiting the invisible mass at our galaxy's heart.

The event horizon defines the boundary from which nothing can return once crossed. This spherical surface marks the point of no return, where escape velocity equals the speed of light. For a black hole with the mass of our Sun, the event horizon would be roughly 6 kilometers in diameter. Supermassive black holes have proportionally larger event horizons, with Sagittarius A* spanning roughly 24 million kilometers.

Spacetime becomes increasingly warped as objects approach a black hole, creating effects that seem like science fiction but follow directly from Einstein's equations. Time runs slower near the event horizon compared to distant locations, a phenomenon called gravitational time dilation. An astronaut falling toward a black hole would observe the outside universe speeding up while observers watching from afar would see the astronaut appearing to freeze at the event horizon.

Tidal forces near smaller black holes would stretch any object falling inward through a process scientists grimly call spaghettification. The gravity acting on closer portions of the object exceeds that on farther portions, pulling it apart lengthwise while compressing it from the sides. Supermassive black holes actually pose less immediate danger from tidal forces because their event horizons are relatively farther from the central singularity.

The singularity at a black hole's center represents our physics breaking down entirely. General relativity predicts that matter falling inward eventually compresses to a point of infinite density where known physical laws cease to apply. Most physicists believe this prediction reveals the limits of our current theories rather than describing actual infinite density. A complete theory of quantum gravity might explain what really happens at the singularity.

Stephen Hawking revolutionized black hole physics in 1974 when he proposed that black holes emit radiation through quantum effects near the event horizon. This Hawking radiation causes black holes to slowly evaporate over immense timescales, with smaller black holes radiating faster than larger ones. A stellar mass black hole would take far longer than the current age of the universe to evaporate completely, but the theoretical breakthrough connected gravity, quantum mechanics, and thermodynamics in profound new ways.

Black holes do not simply swallow everything nearby but can power spectacular cosmic fireworks. Matter falling toward a black hole forms a swirling accretion disk that heats to millions of degrees through friction and compression. This superheated material emits intense radiation across the electromagnetic spectrum before crossing the event horizon. Some black holes produce jets of particles traveling at nearly the speed of light that extend thousands of light-years into space.

Quasars are among the brightest objects in the universe, powered by supermassive black holes actively consuming surrounding matter. These cosmic beacons can outshine their entire host galaxies by factors of hundreds or thousands. The most distant known quasar, discovered in January 2021, existed when the universe was only 670 million years old and contains a black hole with 1.6 billion solar masses.

The Event Horizon Telescope collaboration achieved a historic milestone on April 10, 2019, when they released the first direct image of a black hole's shadow. This image captured the supermassive black hole at the center of galaxy M87, located 55 million light-years from Earth. The project combined data from radio telescopes spanning the globe to create an Earth-sized virtual telescope capable of resolving details smaller than 20 microarcseconds.

Gravitational waves from colliding black holes provided another revolution in observational astronomy. The Laser Interferometer Gravitational-Wave Observatory, known as LIGO, detected ripples in spacetime from two merging black holes on September 14, 2015. This observation confirmed another prediction from Einstein's theory while opening an entirely new window for studying the universe. The discovery earned Rainer Weiss, Kip Thorne, and Barry Barish the 2017 Nobel Prize in Physics.

Scientists continue discovering surprises about black holes as observational techniques improve. The detection of unexpectedly massive black hole mergers suggests that some black holes form through processes we do not yet understand. Intermediate-mass black holes, larger than stellar black holes but smaller than supermassive ones, remain elusive targets that might reveal how the largest black holes grow. Future space-based gravitational wave detectors will hear collisions involving supermassive black holes across the observable universe.

Black holes have transformed from mathematical abstractions into real objects that astronomers observe and study regularly. They challenge our intuitions about space and time while driving fundamental advances in theoretical physics. The ongoing exploration of these extreme environments promises continued discoveries about how the universe works at its most extreme limits.`,
    questions: [
      {
        id: 'science-discovery-p06-q1',
        type: 'single_choice',
        question: 'Who coined the term "black hole" in 1967?',
        options: ['Albert Einstein', 'Stephen Hawking', 'John Wheeler', 'Karl Schwarzschild'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p06-q2',
        type: 'single_choice',
        question: 'What is the name of the supermassive black hole at the center of the Milky Way?',
        options: ['M87', 'Cygnus X-1', 'Sagittarius A*', 'Quasar 3C 273'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p06-q3',
        type: 'multiple_select',
        question: 'Which scientists won Nobel Prizes for black hole research? Select all that apply.',
        options: ['Reinhard Genzel', 'Stephen Hawking', 'Andrea Ghez', 'Kip Thorne'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'science-discovery-p06-q4',
        type: 'true_false',
        question: 'Karl Schwarzschild calculated his solution to Einstein\'s equations while serving on the Russian front during World War I.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p06-q5',
        type: 'numeric',
        question: 'Approximately how many solar masses does Sagittarius A* contain (in millions)?',
        correctValue: 4,
        tolerance: 0.5,
        min: 1,
        max: 10,
        step: 0.5,
        unit: 'million solar masses',
      },
      {
        id: 'science-discovery-p06-q6',
        type: 'single_choice',
        question: 'When did LIGO first detect gravitational waves from merging black holes?',
        options: ['April 10, 2019', 'September 14, 2015', 'January 2021', 'November 1915'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p06-q7',
        type: 'single_choice',
        question: 'What is Hawking radiation?',
        options: ['Light emitted from accretion disks', 'Radiation that causes black holes to slowly evaporate', 'X-rays from colliding black holes', 'Radio waves from quasars'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p06-q8',
        type: 'numeric',
        question: 'In what year did Stephen Hawking propose that black holes emit radiation?',
        correctValue: 1974,
        tolerance: 0,
        min: 1950,
        max: 2000,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-p06-q9',
        type: 'true_false',
        question: 'The Event Horizon Telescope produced the first direct image of a black hole in 2019.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'science-discovery-p07',
    topicId: 'science-discovery',
    title: 'Plate Tectonics: The Moving Earth Beneath Our Feet',
    difficulty: 'advanced',
    wordCount: 2500,
    articleType: 'practice',
    orderIndex: 7,
    content: `The theory of plate tectonics revolutionized Earth science by explaining how continents drift, mountains rise, earthquakes strike, and volcanoes erupt through the movement of massive slabs of rock covering our planet's surface. This unifying framework connects phenomena that scientists once studied in isolation, revealing Earth as a dynamic system constantly reshaping itself over millions of years. The journey from initial hypothesis to scientific consensus transformed our understanding of the ground beneath our feet.

German meteorologist Alfred Wegener proposed the theory of continental drift in January 1912 at a meeting of the German Geological Society in Frankfurt. He noticed that the coastlines of Africa and South America fit together like puzzle pieces and gathered evidence from fossils, rock formations, and ancient climate patterns suggesting these continents were once joined. His book The Origin of Continents and Oceans, published in 1915, presented comprehensive arguments that the continents had moved vast distances over geological time.

The scientific establishment rejected Wegener's ideas for decades because he could not explain what force moved entire continents. Critics dismissed his matching coastlines as coincidence and his fossil evidence as flawed. Wegener died during an expedition to Greenland in November 1930 at age 50, never seeing his revolutionary concept gain acceptance. Only after World War II did new discoveries finally provide the mechanism that Wegener lacked.

Exploration of the ocean floor revealed features that transformed geological thinking. American geologist Harry Hess proposed in 1962 that new oceanic crust forms at underwater mountain chains called mid-ocean ridges, where molten rock rises from Earth's interior. He suggested that this seafloor spreading pushes older crust sideways in a process like a conveyor belt. Hess called his idea geopoetry because it remained speculative, but evidence soon confirmed his vision.

The Mid-Atlantic Ridge runs down the center of the Atlantic Ocean for over 10,000 miles, making it the longest mountain range on Earth. Hot magma wells up along this ridge, solidifying into new oceanic crust that then moves away at rates of roughly 2.5 centimeters per year. This speed seems trivially slow but produces significant motion over geological timescales. The Atlantic Ocean has widened by approximately 2,000 miles since the dinosaurs went extinct 66 million years ago.

Magnetic patterns recorded in oceanic rocks provided stunning confirmation of seafloor spreading during the early 1960s. Earth's magnetic field periodically reverses polarity, with magnetic north and south switching places over intervals ranging from tens of thousands to millions of years. Newly formed rocks record the magnetic orientation existing when they cooled. British geophysicists Frederick Vine and Drummond Matthews discovered in 1963 that oceanic crust displays symmetric stripes of alternating magnetic polarity on either side of mid-ocean ridges.

These magnetic stripes created a barcode-like pattern that confirmed rocks were forming at ridges and moving outward on both sides. The symmetry proved that new material was continuously being added at the center while older material moved away. This evidence, combined with increasingly precise dating of oceanic rocks, demonstrated that Hess's seafloor spreading hypothesis was fundamentally correct.

The surface of Earth consists of roughly a dozen major tectonic plates and numerous smaller ones that fit together like a cracked eggshell. These plates include both oceanic crust, which is relatively thin and dense, and continental crust, which is thicker and more buoyant. The Pacific Plate is the largest, covering approximately 103 million square kilometers of Earth's surface. The North American Plate includes not only the continent but extends halfway across the Atlantic Ocean.

Plate boundaries come in three varieties that produce different geological features. Divergent boundaries occur where plates move apart, allowing magma to rise and create new crust. The East African Rift represents a divergent boundary currently splitting the African continent, with the Somali Plate separating from the larger African Plate at roughly 6 to 7 millimeters per year. Given enough time, a new ocean basin will form where this rift widens.

Convergent boundaries form where plates collide with dramatic consequences depending on what type of crust is involved. When oceanic crust meets continental crust, the denser oceanic plate dives beneath the lighter continental plate in a process called subduction. This creates deep ocean trenches like the Mariana Trench, which reaches nearly 11,000 meters below sea level. Subducting plates also generate volcanic arcs as water released from descending crust triggers melting in the overlying mantle.

The collision of two continental plates produces the most spectacular mountain ranges on Earth. The Himalayas formed when the Indian subcontinent collided with the Eurasian plate beginning approximately 50 million years ago. This collision continues today, pushing Mount Everest higher by roughly 4 millimeters each year. The Alps, Appalachians, and other major mountain chains all record ancient continental collisions that compressed and uplifted rock layers.

Transform boundaries occur where plates slide horizontally past each other without creating or destroying crust. The San Andreas Fault in California represents the most famous example, where the Pacific Plate moves northward relative to the North American Plate at about 46 millimeters per year. Los Angeles sits on the Pacific Plate while San Francisco sits on the North American Plate. In roughly 15 million years, these cities will be neighbors as the Pacific Plate carries Los Angeles northward.

Earthquakes result primarily from stress accumulating and suddenly releasing along plate boundaries. Friction temporarily locks plates together as they attempt to move past each other. Strain builds over years or decades until rocks finally rupture, releasing energy as seismic waves. The 2011 Tohoku earthquake in Japan released energy equivalent to approximately 600 million Hiroshima atomic bombs when the Pacific Plate suddenly lurched beneath the Eurasian Plate.

Volcanic activity concentrates along plate boundaries where conditions favor magma generation and ascent. The Ring of Fire encircling the Pacific Ocean contains about 75 percent of the world's active volcanoes and generates about 90 percent of earthquakes. This horseshoe-shaped zone stretches 40,000 kilometers from New Zealand through Indonesia, Japan, and Alaska to the western coasts of North and South America. The concentration of volcanic and seismic activity directly reflects the many convergent and transform boundaries surrounding the Pacific Plate.

Hot spots provide exceptions to the boundary-focused pattern, creating volcanic activity in plate interiors. The Hawaiian Islands formed as the Pacific Plate moved over a stationary plume of hot material rising from deep in the mantle. The youngest island, Hawaii itself, currently sits over the hot spot and hosts active volcanoes. Older islands extending northwestward were once positioned over the same hot spot millions of years ago but have since been carried away by plate motion.

Understanding plate tectonics helps predict geological hazards and locate natural resources. Earthquake monitoring networks track seismic activity to assess risk in populated areas. Oil and mineral deposits often concentrate in specific geological settings that plate tectonics helps identify. Climate scientists study how continental positions affected past climates by altering ocean circulation and atmospheric patterns.

The movement of continents has profoundly influenced the evolution and distribution of life on Earth. When landmasses were connected, organisms could migrate freely across what are now separate continents. The supercontinent Pangaea, which existed from about 335 to 175 million years ago, allowed similar species to spread across regions now separated by oceans. When continents rifted apart, populations became isolated and evolved independently, producing the distinct flora and fauna we see on different continents today.

Earth remains a geologically active planet with tectonic processes continuing to reshape its surface. The Atlantic Ocean continues widening while the Pacific shrinks. Australia drifts northward toward Asia at roughly 70 millimeters per year. Africa is slowly rifting apart along the East African Rift. Over hundreds of millions of years, these movements will create entirely new continental configurations as Earth's restless surface continues its endless dance.`,
    questions: [
      {
        id: 'science-discovery-p07-q1',
        type: 'single_choice',
        question: 'Who first proposed the theory of continental drift in 1912?',
        options: ['Harry Hess', 'Alfred Wegener', 'Frederick Vine', 'Drummond Matthews'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p07-q2',
        type: 'single_choice',
        question: 'What mechanism did Harry Hess propose in 1962 to explain plate movement?',
        options: ['Continental drift', 'Seafloor spreading', 'Volcanic eruption', 'Magnetic reversal'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p07-q3',
        type: 'multiple_select',
        question: 'Which types of plate boundaries are described in the article? Select all that apply.',
        options: ['Divergent boundaries', 'Convergent boundaries', 'Transform boundaries', 'Circular boundaries'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'science-discovery-p07-q4',
        type: 'true_false',
        question: 'The Mid-Atlantic Ridge is over 10,000 miles long, making it the longest mountain range on Earth.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p07-q5',
        type: 'numeric',
        question: 'At approximately what rate (in millimeters per year) does the Pacific Plate move past the North American Plate along the San Andreas Fault?',
        correctValue: 46,
        tolerance: 5,
        min: 20,
        max: 80,
        step: 1,
        unit: 'millimeters per year',
      },
      {
        id: 'science-discovery-p07-q6',
        type: 'single_choice',
        question: 'What provided the evidence that confirmed seafloor spreading in 1963?',
        options: ['Fossil distributions', 'Coastline matching', 'Magnetic stripe patterns in oceanic crust', 'Earthquake measurements'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p07-q7',
        type: 'single_choice',
        question: 'How did the Hawaiian Islands form?',
        options: ['At a divergent boundary', 'At a convergent boundary', 'Over a hot spot in the mantle', 'Along a transform boundary'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p07-q8',
        type: 'numeric',
        question: 'Approximately how deep is the Mariana Trench (in meters below sea level)?',
        correctValue: 11000,
        tolerance: 500,
        min: 5000,
        max: 15000,
        step: 500,
        unit: 'meters',
      },
      {
        id: 'science-discovery-p07-q9',
        type: 'true_false',
        question: 'Wegener lived to see his continental drift theory accepted by the scientific community.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-p07-q10',
        type: 'single_choice',
        question: 'What percentage of earthquakes occur within the Ring of Fire?',
        options: ['About 50 percent', 'About 75 percent', 'About 90 percent', 'About 99 percent'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p07-q11',
        type: 'numeric',
        question: 'When did the Indian subcontinent begin colliding with the Eurasian plate (millions of years ago)?',
        correctValue: 50,
        tolerance: 5,
        min: 20,
        max: 100,
        step: 5,
        unit: 'million years ago',
      },
    ],
  },
  {
    id: 'science-discovery-p08',
    topicId: 'science-discovery',
    title: 'The Chemistry of Life: From Atoms to Organisms',
    difficulty: 'advanced',
    wordCount: 2800,
    articleType: 'practice',
    orderIndex: 8,
    content: `Chemistry provides the foundation for understanding how living things function at their most fundamental level. Every process occurring in your body right now depends on chemical reactions between atoms and molecules that have been refined over billions of years of evolution. The study of biochemistry reveals how simple elements combine to create the extraordinary complexity we call life.

Carbon forms the backbone of virtually all biological molecules because of its unique ability to form four stable bonds with other atoms. This versatility allows carbon to create chains, rings, and complex three-dimensional structures that no other element can match. Life as we know it is carbon-based, leading scientists to describe Earth's biology as carbon chauvinism when speculating about possible alternative biochemistries elsewhere in the universe.

Water constitutes approximately 60 percent of the human body and serves as the medium in which all biochemical reactions occur. The water molecule's bent shape creates a partial positive charge on the hydrogen atoms and a partial negative charge on the oxygen atom, making water an excellent solvent. This polarity allows water to dissolve ionic compounds like salt and interact with other polar molecules essential for life.

Proteins perform most of the work in living cells, from catalyzing reactions to providing structural support to transporting molecules across membranes. Each protein consists of a unique sequence of amino acids linked together by peptide bonds. The human body uses twenty different amino acids to construct the tens of thousands of different proteins required for life. Linus Pauling determined the alpha helix structure of proteins in 1951, earning him the first of his two Nobel Prizes.

Enzymes are specialized proteins that catalyze biochemical reactions by lowering the activation energy required for reactions to proceed. Without enzymes, most reactions essential for life would occur too slowly to sustain metabolism. The enzyme lactase, for example, breaks down the milk sugar lactose in your intestines. People who lack sufficient lactase experience lactose intolerance, affecting approximately 68 percent of the world's adult population.

Carbohydrates serve as the primary energy source for most organisms and also provide structural support in plants and some animals. Glucose, a simple sugar with the formula C6H12O6, fuels cellular respiration in virtually all living things. Plants store glucose as starch, while animals convert it to glycogen for storage in the liver and muscles. Cellulose, another glucose polymer, provides the rigid cell walls that give plants their structure.

Lipids, commonly called fats, store concentrated energy and form the membranes that surround every cell in your body. The cell membrane consists of a double layer of phospholipid molecules arranged with their water-loving heads facing outward and their water-fearing tails pointing inward. This arrangement creates a barrier that separates the cell's interior from its external environment while allowing selective passage of specific molecules.

Nucleic acids store and transmit genetic information through generations. DNA contains the instructions for building proteins, while RNA carries these instructions from the nucleus to the ribosomes where protein synthesis occurs. The four nucleotide bases in DNA pair specifically, with adenine always bonding to thymine and guanine always bonding to cytosine. This complementary base pairing enables accurate replication of genetic information during cell division.

ATP, or adenosine triphosphate, functions as the universal energy currency of living cells. When ATP loses one of its phosphate groups to become ADP, the reaction releases energy that powers cellular processes. Your body produces and consumes approximately 40 kilograms of ATP every day, though only about 250 grams exist in your body at any moment because ATP is constantly recycled.

Metabolism encompasses all the chemical reactions occurring in living organisms, divided into catabolism and anabolism. Catabolic reactions break down large molecules into smaller ones, releasing energy in the process. Anabolic reactions build large molecules from smaller ones, requiring energy input. Hans Krebs described the citric acid cycle, also called the Krebs cycle, in 1937, revealing a central pathway in cellular metabolism that earned him the Nobel Prize in 1953.

Cellular respiration extracts energy from glucose through a series of carefully controlled reactions. Glycolysis breaks glucose into two pyruvate molecules in the cytoplasm. The pyruvate then enters mitochondria, where the citric acid cycle and electron transport chain complete the extraction of energy. This process produces up to 38 ATP molecules from a single glucose molecule, representing approximately 40 percent efficiency in capturing the available energy.

Photosynthesis reverses cellular respiration by capturing light energy and using it to build glucose from carbon dioxide and water. This process occurs in chloroplasts, organelles found in plant cells that contain the green pigment chlorophyll. The light-dependent reactions split water molecules and capture energy in ATP and NADPH. The Calvin cycle then uses this energy to fix carbon dioxide into glucose, completing the transformation of light energy into chemical energy.

pH measures the concentration of hydrogen ions in a solution and profoundly affects biochemical reactions. Most cellular processes operate optimally near neutral pH around 7, though some environments like the stomach maintain extreme acidity with pH values below 2. Buffers help maintain stable pH levels in biological systems by absorbing or releasing hydrogen ions as conditions change.

Vitamins and minerals serve as essential cofactors that enzymes require to function properly. Vitamin C, for example, is necessary for producing collagen, the protein that provides structure to skin, bones, and blood vessels. British sailors who lacked vitamin C on long voyages developed scurvy, leading the Royal Navy to require citrus juice consumption starting in 1795. This preventive measure earned British sailors the nickname limeys.

Hormones coordinate cellular activities across different organs and tissues in complex organisms. These chemical messengers travel through the bloodstream to reach target cells throughout the body. Insulin, discovered by Frederick Banting and Charles Best in Toronto in 1921, regulates blood glucose levels and transformed diabetes from a death sentence into a manageable condition. Banting received the Nobel Prize in Physiology or Medicine in 1923 for this life-saving discovery.

The chemistry of life operates within narrow parameters that organisms must maintain through homeostasis. Body temperature, blood pressure, pH levels, and countless other variables must stay within specific ranges for cells to function properly. This delicate balance represents the culmination of chemical processes refined over 3.8 billion years of evolution on Earth.

Understanding biochemistry enables medical advances that save millions of lives annually. Drug development relies on detailed knowledge of enzyme structures and metabolic pathways. Genetic engineering allows production of human insulin in bacteria, eliminating the need to extract it from animal pancreases. The emerging field of synthetic biology aims to design entirely new biochemical systems that could produce biofuels, medications, and materials.

The chemistry of life reveals the remarkable fact that consciousness, emotion, and thought all emerge from molecules interacting according to the same physical laws that govern non-living matter. Your experience of reading this sentence depends on neurotransmitters crossing synapses, ions flowing through channels, and proteins changing shape in response to chemical signals. This molecular perspective does not diminish the wonder of life but rather deepens our appreciation for how nature builds extraordinary complexity from simple chemical foundations.`,
    questions: [
      {
        id: 'science-discovery-p08-q1',
        type: 'single_choice',
        question: 'Why is carbon so important for biological molecules?',
        options: ['It is the most abundant element on Earth', 'It can form four stable bonds with other atoms', 'It is the lightest element', 'It is found only in living things'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p08-q2',
        type: 'single_choice',
        question: 'Who determined the alpha helix structure of proteins in 1951?',
        options: ['Hans Krebs', 'Frederick Banting', 'Linus Pauling', 'Charles Best'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p08-q3',
        type: 'multiple_select',
        question: 'Which molecules are mentioned as primary types of biological molecules? Select all that apply.',
        options: ['Proteins', 'Carbohydrates', 'Noble gases', 'Lipids'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'science-discovery-p08-q4',
        type: 'true_false',
        question: 'ATP is constantly recycled in the body, with approximately 40 kilograms produced and consumed daily.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p08-q5',
        type: 'numeric',
        question: 'Approximately what percentage of the world\'s adult population is lactose intolerant?',
        correctValue: 68,
        tolerance: 5,
        min: 40,
        max: 90,
        step: 1,
        unit: 'percent',
      },
      {
        id: 'science-discovery-p08-q6',
        type: 'single_choice',
        question: 'In what year did the Royal Navy require citrus juice consumption to prevent scurvy?',
        options: ['1751', 'It was never required', '1795', '1823'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p08-q7',
        type: 'single_choice',
        question: 'Who discovered insulin and where?',
        options: ['Hans Krebs in Germany', 'Frederick Banting and Charles Best in Toronto', 'Linus Pauling in California', 'James Watson in Cambridge'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p08-q8',
        type: 'numeric',
        question: 'What percentage of the human body is composed of water?',
        correctValue: 60,
        tolerance: 5,
        min: 40,
        max: 80,
        step: 5,
        unit: 'percent',
      },
      {
        id: 'science-discovery-p08-q9',
        type: 'true_false',
        question: 'Catabolic reactions build large molecules from smaller ones.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-p08-q10',
        type: 'single_choice',
        question: 'What is the function of buffers in biological systems?',
        options: ['To speed up chemical reactions', 'To maintain stable pH levels', 'To transport oxygen', 'To store genetic information'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p08-q11',
        type: 'numeric',
        question: 'Up to how many ATP molecules can be produced from a single glucose molecule?',
        correctValue: 38,
        tolerance: 2,
        min: 20,
        max: 50,
        step: 2,
        unit: 'ATP molecules',
      },
    ],
  },
  {
    id: 'science-discovery-p09',
    topicId: 'science-discovery',
    title: 'Earthquakes and Volcanic Eruptions: Forces That Shape Our Planet',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 9,
    content: `Earthquakes and volcanic eruptions represent the most dramatic expressions of Earth's dynamic interior, releasing enormous energy that shapes landscapes and affects human societies in profound ways. These geological phenomena result from the same underlying processes that drive plate tectonics, connecting surface events to forces operating hundreds of kilometers below our feet. Understanding these powerful forces helps scientists predict hazards and protect communities living in vulnerable regions.

Earthquakes occur when accumulated stress in rocks exceeds their strength, causing sudden rupture along geological faults. The point where rupture begins is called the hypocenter or focus, while the point directly above on the surface is the epicenter. Seismic waves radiate outward from the rupture, shaking the ground and potentially causing destruction far from the earthquake's origin. Scientists recorded over 1.4 million earthquakes in 2022 alone, though most were too small for humans to feel.

The Richter scale, developed by Charles Richter at the California Institute of Technology in 1935, provided the first standardized measure of earthquake magnitude. This logarithmic scale means each whole number increase represents approximately 32 times more energy released. A magnitude 6 earthquake releases about 32 times more energy than a magnitude 5, and a magnitude 7 releases about 1,000 times more than a magnitude 5. Modern seismologists typically use the moment magnitude scale, which more accurately reflects the physical properties of large earthquakes.

The 2011 Tohoku earthquake off Japan's Pacific coast registered magnitude 9.1, making it the fourth-largest earthquake recorded since modern instrumentation began. The earthquake struck at 2:46 PM local time on March 11, triggering a devastating tsunami that reached heights exceeding 40 meters in some locations. The combined disaster killed approximately 19,500 people and caused the Fukushima Daiichi nuclear accident. Ground motion shifted Japan's main island approximately 2.4 meters eastward and dropped the coastline in some areas by over 60 centimeters.

Seismic waves come in several varieties that travel at different speeds and cause different types of ground motion. Primary waves, or P-waves, compress and expand rock in the direction of wave travel, moving fastest through Earth's interior at approximately 6 kilometers per second in crustal rocks. Secondary waves, or S-waves, move rock perpendicular to their direction of travel and cannot pass through liquids, which is how scientists discovered Earth's outer core is molten.

Surface waves, including Love waves and Rayleigh waves, travel along Earth's surface and cause the most damage during earthquakes. Love waves shake the ground horizontally, while Rayleigh waves create a rolling motion like ocean swells. These waves travel more slowly than body waves but carry more energy and produce larger ground displacements. Buildings and other structures often fail when surface wave frequencies match their natural resonance frequencies.

The San Andreas Fault in California extends approximately 1,200 kilometers from the Salton Sea to Cape Mendocino. This transform boundary separates the Pacific Plate from the North American Plate, with the Pacific side moving northward at about 46 millimeters per year. The fault has produced major earthquakes including the devastating 1906 San Francisco earthquake, which killed approximately 3,000 people and destroyed much of the city through shaking and subsequent fires.

Volcanic eruptions occur when magma reaches Earth's surface, releasing dissolved gases and molten rock. Magma forms through various processes including decompression melting at divergent boundaries, flux melting above subducting plates, and hot spot activity beneath oceanic and continental crust. The composition of magma determines eruption style, with silica-rich magmas producing explosive eruptions while basaltic magmas typically flow more gently.

The 1815 eruption of Mount Tambora in Indonesia ranks as the most powerful volcanic eruption in recorded history. The explosion on April 10, 1815, ejected approximately 160 cubic kilometers of material and killed an estimated 71,000 people directly. Global climate effects from atmospheric ash and sulfur dioxide caused 1816 to become known as the Year Without a Summer. Crop failures and cold temperatures persisted across North America and Europe, causing widespread famine and social disruption.

Hawaiian volcanoes demonstrate effusive eruption styles characterized by relatively gentle lava flows rather than explosive blasts. Kilauea has been erupting almost continuously since 1983, producing approximately 4.3 cubic kilometers of lava that has added over 200 hectares of new land to Hawaii's coastline. The volcano's 2018 eruption was more destructive, with fissures opening in residential areas and destroying over 700 homes. Hawaiian eruptions are generally less dangerous than explosive eruptions but still pose significant hazards to nearby communities.

Volcanic explosivity is measured using the Volcanic Explosivity Index, developed by Chris Newhall and Stephen Self in 1982. This scale ranges from 0 to 8, with each level representing roughly a tenfold increase in erupted material. A VEI 8 supereruption has not occurred in recorded history, though the Yellowstone hotspot produced such events approximately 640,000 and 2.1 million years ago. The Yellowstone caldera remains active today, with scientists monitoring its behavior through an extensive network of instruments.

Pyroclastic flows represent the deadliest volcanic hazard, consisting of superheated gas and rock fragments traveling at speeds exceeding 100 kilometers per hour. The 79 CE eruption of Mount Vesuvius buried the Roman cities of Pompeii and Herculaneum under pyroclastic deposits, preserving remarkable archaeological evidence of daily life in the ancient world. More recently, the 1902 eruption of Mount Pelee on Martinique killed approximately 29,000 people when a pyroclastic flow swept through the city of Saint-Pierre.

Lahars, volcanic mudflows composed of water-saturated debris, can travel tens of kilometers from volcanoes and devastate valleys downstream. The 1985 eruption of Nevado del Ruiz in Colombia triggered lahars that buried the town of Armero under several meters of mud, killing approximately 23,000 people in just minutes. This disaster led to improved warning systems and hazard mapping at volcanoes worldwide.

Scientists monitor active volcanoes using multiple techniques to detect signs of impending eruptions. Seismometers record the small earthquakes that accompany magma movement underground. Tiltmeters and GPS stations detect ground deformation as magma accumulates beneath volcanic edifices. Satellite instruments measure gas emissions and thermal anomalies that may indicate changing conditions. These monitoring efforts have enabled successful evacuations at numerous volcanoes, saving thousands of lives.

The eruption of Mount Pinatubo in the Philippines on June 15, 1991, demonstrates both the power of volcanic events and the value of scientific monitoring. The eruption, the second-largest of the twentieth century after Mount Novarupta in Alaska in 1912, ejected approximately 10 cubic kilometers of material into the atmosphere. Timely warnings from volcanologists enabled evacuation of nearly 200,000 people, dramatically reducing casualties despite the eruption's intensity. The volcanic aerosols injected into the stratosphere cooled global temperatures by approximately 0.5 degrees Celsius for about two years.

Earthquake prediction remains an elusive goal despite decades of research. While scientists can identify regions likely to experience large earthquakes over decades, reliably predicting specific events days or weeks in advance has proved impossible. The complex physics of fault rupture involves chaotic processes that may be fundamentally unpredictable. However, early warning systems can provide seconds to minutes of warning after an earthquake begins but before strong shaking arrives at more distant locations.

Communities in seismically active regions protect themselves through building codes, emergency planning, and public education. Japan requires earthquake-resistant construction that has saved countless lives during major earthquakes. California's ShakeAlert system provides automated warnings to millions of people. The Great ShakeOut drill, held annually in October, encourages earthquake preparedness across the western United States and other participating regions.

Understanding earthquakes and volcanoes connects to broader questions about Earth's past and future. Mass extinctions correlate with massive volcanic episodes called large igneous provinces. The Deccan Traps in India erupted around the time of the dinosaur extinction 66 million years ago. Climate variations throughout Earth history reflect volcanic influences on atmospheric composition. These geological forces will continue shaping our planet long after human concerns fade into geological time.`,
    questions: [
      {
        id: 'science-discovery-p09-q1',
        type: 'single_choice',
        question: 'Who developed the Richter scale and where?',
        options: ['Chris Newhall at the USGS', 'Charles Richter at the California Institute of Technology', 'Stephen Self at the University of Hawaii', 'Harry Hess at Princeton University'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p09-q2',
        type: 'single_choice',
        question: 'What was the magnitude of the 2011 Tohoku earthquake off Japan?',
        options: ['Magnitude 7.9', 'Magnitude 8.5', 'Magnitude 9.1', 'Magnitude 9.5'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p09-q3',
        type: 'multiple_select',
        question: 'Which types of seismic waves are mentioned in the article? Select all that apply.',
        options: ['P-waves', 'S-waves', 'Love waves', 'Gamma waves'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'science-discovery-p09-q4',
        type: 'true_false',
        question: 'S-waves can pass through liquids, which is how scientists discovered Earth\'s outer core.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-p09-q5',
        type: 'numeric',
        question: 'Approximately how many people were killed in the 1815 Mount Tambora eruption?',
        correctValue: 71000,
        tolerance: 5000,
        min: 50000,
        max: 100000,
        step: 1000,
        unit: 'people',
      },
      {
        id: 'science-discovery-p09-q6',
        type: 'single_choice',
        question: 'What year became known as the Year Without a Summer due to Mount Tambora\'s eruption?',
        options: ['1815', '1816', '1817', '1902'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p09-q7',
        type: 'single_choice',
        question: 'How long is the San Andreas Fault?',
        options: ['Approximately 500 kilometers', 'Approximately 800 kilometers', 'Approximately 1,200 kilometers', 'Approximately 2,000 kilometers'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p09-q8',
        type: 'numeric',
        question: 'How many earthquakes were recorded in 2022?',
        correctValue: 1400000,
        tolerance: 100000,
        min: 500000,
        max: 2000000,
        step: 100000,
        unit: 'earthquakes',
      },
      {
        id: 'science-discovery-p09-q9',
        type: 'true_false',
        question: 'A VEI 8 supereruption has occurred in recorded human history.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-p09-q10',
        type: 'single_choice',
        question: 'What volcanic hazard buried Pompeii and Herculaneum in 79 CE?',
        options: ['Lava flows', 'Lahars', 'Pyroclastic flows', 'Volcanic gases'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p09-q11',
        type: 'numeric',
        question: 'How many people were evacuated before the 1991 Mount Pinatubo eruption?',
        correctValue: 200000,
        tolerance: 20000,
        min: 100000,
        max: 300000,
        step: 10000,
        unit: 'people',
      },
      {
        id: 'science-discovery-p09-q12',
        type: 'single_choice',
        question: 'What is a lahar?',
        options: ['A type of seismic wave', 'A volcanic mudflow', 'A volcanic gas emission', 'A type of earthquake fault'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'science-discovery-p10',
    topicId: 'science-discovery',
    title: 'The Periodic Table: Organizing the Building Blocks of Matter',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 10,
    content: `The periodic table stands as one of science's greatest achievements, organizing all known elements into a framework that reveals fundamental patterns in atomic behavior and enables predictions about chemical properties. This elegant arrangement transforms the apparent chaos of over 100 different elements into a coherent system that students and researchers use daily. The story of how scientists discovered this order illuminates the process of scientific discovery itself.

Dmitri Mendeleev, a Russian chemist, created the first widely accepted periodic table in March 1869, arranging the 63 elements then known by increasing atomic weight while grouping those with similar properties into columns. His genius lay not only in organizing known elements but in predicting the existence and properties of undiscovered ones. Mendeleev left gaps in his table for elements he was certain would be found, even specifying their atomic weights and chemical behaviors.

The discovery of gallium in 1875 by French chemist Paul Emile Lecoq de Boisbaudran provided stunning confirmation of Mendeleev's predictions. Mendeleev had predicted this element, which he called eka-aluminum, would have an atomic weight around 68 and properties similar to aluminum. When Lecoq de Boisbaudran found gallium's properties matched Mendeleev's predictions almost exactly, the scientific community gained confidence in the periodic table's validity.

German chemist Lothar Meyer independently developed a similar periodic arrangement around the same time as Mendeleev. Meyer emphasized the physical properties of elements, particularly atomic volume, and created graphs showing periodic variations in these properties. History generally credits Mendeleev more prominently because he published first and made more explicit predictions about undiscovered elements.

The discovery of noble gases in the 1890s required adding an entirely new column to the periodic table. Scottish chemist William Ramsay discovered argon in 1894, helium in 1895, and neon, krypton, and xenon in 1898 along with Morris Travers. These chemically inert elements initially seemed to contradict the periodic law but ultimately found a natural place as a new group. Ramsay received the Nobel Prize in Chemistry in 1904 for discovering these elusive elements.

Henry Moseley, a young British physicist, revolutionized understanding of the periodic table in 1913 by demonstrating that atomic number, not atomic weight, determined an element's position. Moseley measured the X-ray spectra of various elements and found a mathematical relationship between spectral frequencies and atomic numbers. His work explained why a few elements appeared out of order by atomic weight and predicted exactly how many elements remained to be discovered. Tragically, Moseley died at age 27 during the Battle of Gallipoli in 1915, cutting short a career of exceptional promise.

Atomic number represents the number of protons in an atom's nucleus, which determines how many electrons surround the nucleus and thus the element's chemical behavior. Hydrogen, with one proton, is element number 1, while uranium, with 92 protons, is element 92. The periodic table currently extends to element 118, oganesson, though elements beyond uranium do not occur naturally and must be created artificially.

The periodic table's rows, called periods, correspond to electron shells that fill progressively with increasing atomic number. The first period contains only two elements, hydrogen and helium, because the first electron shell holds only two electrons. The second and third periods contain eight elements each, corresponding to the capacity of their respective shells. Longer periods in the table's lower regions reflect the additional capacity of higher electron shells.

Columns in the periodic table, called groups or families, contain elements with similar chemical properties because they have the same number of electrons in their outermost shell. The alkali metals in group 1 all have one outer electron and react vigorously with water. The halogens in group 17 all have seven outer electrons and readily form salts with metals. This pattern explains why elements in the same column behave similarly despite very different masses.

The transition metals occupy the middle of the table and display more complex behavior because their inner electron shells are being filled rather than their outermost shells. These elements include familiar metals like iron, copper, silver, and gold. Many transition metals can form compounds with multiple oxidation states, giving them varied chemistry. They often have colored compounds, catalytic properties, and form important alloys.

Lanthanides and actinides, sometimes called inner transition metals, appear below the main table to prevent it from becoming unwieldy. The lanthanides, elements 57 through 71, share remarkably similar properties because electrons are filling an inner shell that has little effect on chemical behavior. The actinides, elements 89 through 103, include all the naturally occurring and artificially produced elements heavier than uranium. All actinides are radioactive, with some having extremely short half-lives.

Scientists have created elements beyond the naturally occurring ones through nuclear reactions in particle accelerators and nuclear reactors. Glenn Seaborg and colleagues at the University of California, Berkeley, synthesized plutonium in 1941 and subsequently discovered nine more elements. Seaborg received the Nobel Prize in Chemistry in 1951 and had element 106, seaborgium, named in his honor while still alive, a rare distinction.

The heaviest elements exist for mere fractions of seconds before decaying radioactively into lighter elements. Element 118, oganesson, was first created in 2002 by a joint Russian-American team led by Yuri Oganessian at the Joint Institute for Nuclear Research in Dubna, Russia. Only a few atoms of oganesson have ever been produced, and its chemical properties remain largely unknown due to its extreme instability.

The periodic table predicts chemical properties with remarkable accuracy. Electronegativity, the tendency to attract electrons in chemical bonds, increases moving right across a period and decreases moving down a group. Atomic radius generally decreases across periods as nuclear charge pulls electrons closer but increases down groups as additional electron shells expand the atom's size. These trends allow chemists to predict how unfamiliar elements will behave based on their position in the table.

Metalloids occupy a diagonal region between metals and nonmetals, displaying properties intermediate between these two categories. Silicon, the most important metalloid, forms the basis of semiconductor technology that powers computers and electronic devices. Germanium, another metalloid, was predicted by Mendeleev as eka-silicon and discovered in 1886 with properties closely matching his predictions.

The periodic table continues evolving as scientists explore the limits of nuclear stability. Theoretical calculations suggest an island of stability may exist around element 114 or beyond, where certain combinations of protons and neutrons might be unusually stable. Researchers at laboratories in Russia, Germany, Japan, and the United States compete to create new elements and explore these fundamental questions about matter.

Applications of periodic table knowledge pervade modern technology and medicine. Rare earth elements, the lanthanides plus scandium and yttrium, are essential for smartphones, wind turbines, and electric vehicles. Radioactive isotopes produced in nuclear reactors provide medical diagnostics and cancer treatments. Battery technologies depend on understanding how lithium, cobalt, and other elements behave in electrochemical reactions.

The periodic table demonstrates how organizing knowledge reveals underlying patterns and enables prediction. What began as a classification scheme became a powerful tool for understanding atomic structure and chemical bonding. Every chemistry student learns the periodic table, and every working chemist consults it regularly. This elegant arrangement of elements will remain central to science as long as humans investigate the material world.`,
    questions: [
      {
        id: 'science-discovery-p10-q1',
        type: 'single_choice',
        question: 'Who created the first widely accepted periodic table in 1869?',
        options: ['Lothar Meyer', 'Henry Moseley', 'Dmitri Mendeleev', 'William Ramsay'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p10-q2',
        type: 'single_choice',
        question: 'What element was discovered in 1875 that confirmed Mendeleev\'s predictions?',
        options: ['Argon', 'Gallium', 'Germanium', 'Helium'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p10-q3',
        type: 'multiple_select',
        question: 'Which noble gases did William Ramsay discover? Select all that apply.',
        options: ['Argon', 'Helium', 'Oxygen', 'Neon'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'science-discovery-p10-q4',
        type: 'true_false',
        question: 'Henry Moseley demonstrated that atomic weight, not atomic number, determined an element\'s position in the periodic table.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-p10-q5',
        type: 'numeric',
        question: 'How many elements were known when Mendeleev created his periodic table?',
        correctValue: 63,
        tolerance: 3,
        min: 40,
        max: 80,
        step: 1,
        unit: 'elements',
      },
      {
        id: 'science-discovery-p10-q6',
        type: 'single_choice',
        question: 'Who synthesized plutonium and discovered nine additional elements?',
        options: ['Henry Moseley', 'William Ramsay', 'Glenn Seaborg', 'Yuri Oganessian'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p10-q7',
        type: 'single_choice',
        question: 'What is element 118 called?',
        options: ['Seaborgium', 'Oganesson', 'Plutonium', 'Gallium'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p10-q8',
        type: 'numeric',
        question: 'In what year did Henry Moseley die during World War I?',
        correctValue: 1915,
        tolerance: 0,
        min: 1910,
        max: 1920,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-p10-q9',
        type: 'true_false',
        question: 'Glenn Seaborg had an element named after him while he was still alive.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-p10-q10',
        type: 'single_choice',
        question: 'What determines an element\'s atomic number?',
        options: ['The number of electrons', 'The number of neutrons', 'The number of protons', 'The atomic weight'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-p10-q11',
        type: 'numeric',
        question: 'How many protons does uranium have?',
        correctValue: 92,
        tolerance: 0,
        min: 80,
        max: 100,
        step: 1,
        unit: 'protons',
      },
      {
        id: 'science-discovery-p10-q12',
        type: 'single_choice',
        question: 'Which metalloid predicted by Mendeleev was discovered in 1886?',
        options: ['Silicon', 'Germanium', 'Gallium', 'Argon'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-p10-q13',
        type: 'numeric',
        question: 'In what year was oganesson first created?',
        correctValue: 2002,
        tolerance: 1,
        min: 1990,
        max: 2010,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-p10-q14',
        type: 'true_false',
        question: 'All actinides are radioactive.',
        correctAnswer: true,
      },
    ],
  },
  // Certification texts (C1-C3)
  {
    id: 'science-discovery-c1',
    topicId: 'science-discovery',
    title: 'The Scientific Method: How We Know What We Know',
    difficulty: 'intermediate',
    wordCount: 1000,
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    content: `The scientific method is the foundation of modern scientific inquiry. This systematic approach to understanding the natural world has transformed human knowledge over the past several centuries. From medicine to physics, from biology to chemistry, the scientific method provides a reliable way to test ideas and build understanding.

At its core, the scientific method involves making observations, forming hypotheses, conducting experiments, and drawing conclusions. This cycle repeats as scientists refine their understanding. No idea is ever considered absolutely proven; instead, theories are constantly tested and updated as new evidence emerges.

The process typically begins with observation. Scientists notice something in the natural world that sparks curiosity. Perhaps they observe an unusual pattern, an unexpected result, or a phenomenon that existing theories cannot explain. This observation leads to questions about why or how something occurs.

From these questions, scientists develop hypotheses. A hypothesis is a proposed explanation that can be tested. Good hypotheses are specific and falsifiable, meaning they make predictions that could potentially be proven wrong. A hypothesis that cannot possibly be disproven is not scientifically useful.

Testing hypotheses requires carefully designed experiments. Scientists identify variables they will manipulate and measure, while controlling other factors that might influence results. They establish control groups for comparison and determine what observations would support or refute their hypothesis.

Data collection during experiments must be rigorous and unbiased. Scientists record observations systematically, often using standardized measurements and instruments. They take multiple measurements to ensure reliability. Statistical analysis helps determine whether results are significant or merely due to random chance.

After analyzing data, scientists draw conclusions about whether the evidence supports their hypothesis. If results contradict the hypothesis, scientists must revise or reject it. If results support the hypothesis, scientists design additional experiments to further test the idea from different angles.

Peer review is crucial to the scientific process. Before publishing results, scientists submit their work to other experts in their field for evaluation. These reviewers scrutinize the methodology, data analysis, and conclusions. This process helps catch errors and ensures quality, though it is not perfect.

Replication is another essential component. Other scientists should be able to repeat an experiment and achieve similar results. When multiple independent researchers confirm findings, confidence in those results increases dramatically. Findings that cannot be replicated are viewed with skepticism.

The scientific method has evolved significantly since its origins. Ancient Greek philosophers made important observations about nature but rarely conducted experiments. Medieval Islamic scholars made advances in systematic observation and experimentation. During the Scientific Revolution of the 16th and 17th centuries, figures like Francis Bacon and Galileo Galilei formalized experimental methodology.

Today, the scientific method faces new challenges. Big data and computational methods allow analysis of massive datasets, changing how hypotheses are generated and tested. Interdisciplinary research blurs traditional boundaries between fields. Questions about reproducibility in some areas have sparked important discussions about research practices.

Understanding the scientific method helps people evaluate claims critically. Not all studies are equally reliable. Sample size, methodology, statistical analysis, and potential biases all affect how much weight we should give particular findings. Scientific literacy empowers citizens to make informed decisions about health, policy, and personal choices.

The scientific method is not limited to professional scientists. Anyone can apply its principles to everyday questions. From testing which plant food works best in your garden to evaluating whether a new exercise routine actually improves your fitness, systematic observation and testing lead to better understanding than intuition alone.

Science is a human endeavor with all the strengths and weaknesses that implies. Scientists make mistakes, have biases, and sometimes pursue wrong paths. The self-correcting nature of the scientific method, however, gradually identifies errors and moves toward better understanding. This process has produced remarkable advances in our knowledge of the universe and our ability to improve human life.`,
    questions: [
      {
        id: 'science-discovery-c1-q1',
        type: 'single_choice',
        question: 'What characteristic makes a hypothesis scientifically useful?',
        options: ['It must be proven true', 'It must be falsifiable', 'It must be complex', 'It must be original'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c1-q2',
        type: 'single_choice',
        question: 'What is the primary purpose of peer review?',
        options: ['To publish research faster', 'To scrutinize methodology and catch errors', 'To determine funding priorities', 'To assign credit to researchers'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c1-q3',
        type: 'multiple_select',
        question: 'Who contributed to formalizing experimental methodology during the Scientific Revolution?',
        options: ['Francis Bacon', 'Galileo Galilei', 'Albert Einstein', 'Charles Darwin'],
        correctIndices: [0, 1],
      },
      {
        id: 'science-discovery-c1-q4',
        type: 'true_false',
        question: 'Scientific theories are considered absolutely proven once enough evidence supports them.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-c1-q5',
        type: 'single_choice',
        question: 'Why is replication important in science?',
        options: ['It speeds up research', 'It reduces costs', 'It increases confidence in findings', 'It simplifies experiments'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-c1-q6',
        type: 'single_choice',
        question: 'What does statistical analysis help determine?',
        options: ['What hypothesis to test', 'Whether results are significant or due to chance', 'Which journal to publish in', 'How to design experiments'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'science-discovery-c2',
    topicId: 'science-discovery',
    title: 'The Discovery of DNA: Unlocking Life\'s Blueprint',
    difficulty: 'intermediate',
    wordCount: 2000,
    articleType: 'certification',
    orderIndex: 2,
    certificationLength: 'medium',
    content: `The discovery of DNA's structure stands among the greatest scientific achievements of the twentieth century. This breakthrough revealed how genetic information is stored and transmitted across generations, transforming our understanding of life itself. The path to this discovery involved brilliant insights, fierce competition, and contributions from scientists across multiple disciplines over nearly a century.

Swiss physician Friedrich Miescher made the first step toward understanding DNA in 1869 when he isolated a new substance from the nuclei of white blood cells. Working in a laboratory at Tubingen Castle in Germany, Miescher extracted pus-soaked bandages from a nearby hospital to obtain cells for his experiments. He discovered a phosphorus-rich compound unlike any known protein, which he named nuclein. Though Miescher suspected this substance might be important, the scientific tools of his era could not reveal its structure or function.

Scientists gradually learned more about nuclein throughout the following decades. In 1919, Russian-American biochemist Phoebus Levene identified the basic components of DNA: a sugar called deoxyribose, phosphate groups, and four nitrogen-containing bases named adenine, thymine, guanine, and cytosine. Levene proposed that these components formed repeating units called nucleotides, though he incorrectly believed DNA was too simple a molecule to carry genetic information.

The question of what substance carries hereditary information remained controversial into the 1940s. Many scientists assumed proteins must serve this function because they were more complex and varied than DNA. In 1944, Oswald Avery, Colin MacLeod, and Maclyn McCarty at Rockefeller University in New York demonstrated that DNA alone could transform bacteria from one form to another. Their experiment provided strong evidence that DNA carried genetic information, though skeptics remained unconvinced.

Alfred Hershey and Martha Chase settled the debate with elegant experiments in 1952 at Cold Spring Harbor Laboratory on Long Island. They studied bacteriophages, viruses that infect bacteria, using radioactive labels to track DNA and protein separately. Their results showed conclusively that DNA entered bacteria during infection while protein remained outside. This Hershey-Chase experiment convinced most scientists that DNA was indeed the genetic material they had sought.

While biochemists established that DNA carried genetic information, understanding how required determining its physical structure. Erwin Chargaff at Columbia University made a crucial discovery in 1950 when he analyzed DNA from various organisms. He found that the amount of adenine always equaled the amount of thymine, while guanine always equaled cytosine. These relationships, known as Chargaff's rules, provided an essential clue that would help solve the structural puzzle.

The race to determine DNA's three-dimensional structure intensified in the early 1950s. At King's College London, biophysicist Rosalind Franklin produced remarkably detailed X-ray diffraction images of DNA fibers. Her famous Photograph 51, taken in May 1952, clearly showed that DNA formed a helix with specific dimensions. Franklin methodically analyzed her data, calculating that the phosphate groups must lie on the outside of the structure and determining key measurements.

James Watson, a young American biologist, and Francis Crick, a British physicist, worked together at Cambridge University's Cavendish Laboratory to build physical models of possible DNA structures. Watson had arrived in Cambridge in 1951 specifically hoping to solve the DNA structure. Crick brought expertise in X-ray crystallography and a talent for theoretical analysis. Neither had produced the crucial experimental data themselves, but they excelled at synthesizing information from multiple sources.

Watson attended a lecture by Franklin in November 1951 and attempted to build a model based on what he remembered. His first attempt placed the bases on the outside and got the water content wrong. Franklin quickly demolished this incorrect model when she saw it, pointing out numerous errors. Watson and Crick were temporarily banned from working on DNA by the head of their laboratory.

The breakthrough came in early 1953 after Watson saw Photograph 51 without Franklin's knowledge or permission. Maurice Wilkins, Franklin's colleague at King's College, showed Watson the image during a visit on January 30, 1953. Watson immediately recognized that it confirmed a helical structure. Crick obtained additional crucial data from a research report that Franklin had submitted to the Medical Research Council.

Armed with this information, Watson and Crick resumed model building with intense focus. They struggled with how the bases might pair together in the interior of the helix. Watson initially proposed pairing like bases together, but this created a structure with irregular width. American chemist Jerry Donohue, who shared their office, pointed out that Watson was using incorrect structures for the bases. When Watson cut out cardboard shapes of the correct base structures, he discovered that adenine paired perfectly with thymine through two hydrogen bonds, while guanine paired with cytosine through three bonds.

Watson and Crick completed their model on March 7, 1953. The double helix structure they proposed elegantly explained both DNA's stability and its ability to replicate. The two strands wound around each other with bases facing inward like rungs on a twisted ladder. Because of the specific base pairing rules, each strand contained all the information needed to reconstruct its partner. The structure immediately suggested a copying mechanism for genetic information.

Watson and Crick published their findings in the journal Nature on April 25, 1953, in a paper remarkable for its brevity. The famous article, only 900 words long, ended with one of science's most understated sentences: "It has not escaped our notice that the specific pairing we have postulated immediately suggests a possible copying mechanism for the genetic material." Franklin's paper describing her experimental data appeared in the same issue but without acknowledgment of how crucial her work had been.

The discovery's implications unfolded rapidly over the following years. Matthew Meselson and Franklin Stahl confirmed the replication mechanism through elegant experiments at Caltech in 1958. Scientists deciphered the genetic code by 1966, revealing how sequences of bases specify amino acids in proteins. The tools of molecular biology that emerged from understanding DNA structure led to modern genetic engineering, DNA sequencing, and countless medical advances.

Watson, Crick, and Wilkins received the Nobel Prize in Physiology or Medicine in 1962. Rosalind Franklin, who had died of ovarian cancer in 1958 at age 37, could not share the award since Nobel Prizes are not given posthumously. Her essential contributions went largely unrecognized for decades, though historians have since documented how crucial her experimental work was to the discovery. Franklin's story has become emblematic of the obstacles women scientists faced during this era.

The human genome project completed the first full sequence of human DNA in April 2003, fifty years after Watson and Crick's discovery. This massive international effort involving scientists from twenty institutions in six countries identified approximately 20,000 genes spread across 3 billion base pairs. Today, personal genome sequencing costs less than one thousand dollars and takes just days, advances unimaginable to the pioneers who first revealed life's blueprint.

DNA technology has transformed medicine, agriculture, criminal justice, and our understanding of human history. Genetic testing can reveal disease risks before symptoms appear, allowing preventive interventions. CRISPR gene editing technology, developed from bacterial immune systems, now enables precise modifications to DNA sequences. Scientists can trace human migrations across tens of thousands of years by analyzing DNA preserved in ancient bones.

The discovery of DNA's structure demonstrates how scientific progress often requires contributions from many individuals working across different disciplines. Miescher's initial isolation, Chargaff's chemical analysis, Franklin's crystallography, and Watson and Crick's model building all played essential roles. Understanding this history helps us appreciate both the cumulative nature of scientific knowledge and the human stories behind transformative discoveries.`,
    questions: [
      {
        id: 'science-discovery-c2-q1',
        type: 'single_choice',
        question: 'Who first isolated DNA (then called nuclein) in 1869?',
        options: ['Erwin Chargaff', 'Friedrich Miescher', 'Phoebus Levene', 'Rosalind Franklin'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c2-q2',
        type: 'single_choice',
        question: 'What was the significance of Chargaff\'s rules?',
        options: ['They proved DNA was the genetic material', 'They showed adenine equals thymine and guanine equals cytosine', 'They described how DNA replicates', 'They identified the components of nucleotides'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c2-q3',
        type: 'multiple_select',
        question: 'Which scientists worked at King\'s College London on DNA structure? Select all that apply.',
        options: ['James Watson', 'Rosalind Franklin', 'Maurice Wilkins', 'Francis Crick'],
        correctIndices: [1, 2],
      },
      {
        id: 'science-discovery-c2-q4',
        type: 'true_false',
        question: 'Rosalind Franklin shared the Nobel Prize in 1962 for the DNA discovery.',
        correctAnswer: false,
      },
      {
        id: 'science-discovery-c2-q5',
        type: 'numeric',
        question: 'In what year did Watson and Crick publish their DNA structure paper?',
        correctValue: 1953,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-c2-q6',
        type: 'single_choice',
        question: 'What did the Hershey-Chase experiment demonstrate?',
        options: ['The structure of DNA is a double helix', 'DNA carries genetic information, not protein', 'Adenine pairs with thymine', 'DNA can transform bacteria'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c2-q7',
        type: 'single_choice',
        question: 'Who pointed out that Watson was using incorrect base structures during model building?',
        options: ['Francis Crick', 'Rosalind Franklin', 'Jerry Donohue', 'Maurice Wilkins'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-c2-q8',
        type: 'multiple_select',
        question: 'Which bases pair together in DNA according to Watson and Crick\'s model? Select all correct pairings.',
        options: ['Adenine with thymine', 'Adenine with guanine', 'Guanine with cytosine', 'Thymine with cytosine'],
        correctIndices: [0, 2],
      },
      {
        id: 'science-discovery-c2-q9',
        type: 'numeric',
        question: 'Approximately how many genes did the Human Genome Project identify?',
        correctValue: 20000,
        tolerance: 2000,
        min: 10000,
        max: 50000,
        step: 1000,
        unit: 'genes',
      },
      {
        id: 'science-discovery-c2-q10',
        type: 'true_false',
        question: 'Watson and Crick produced the X-ray diffraction images that revealed DNA\'s helical structure.',
        correctAnswer: false,
      },
    ],
  },
  {
    id: 'science-discovery-c3',
    topicId: 'science-discovery',
    title: 'Climate Science: Understanding Earth\'s Changing Weather Patterns',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'certification',
    orderIndex: 3,
    certificationLength: 'long',
    content: `Climate science examines how Earth's atmosphere, oceans, land surfaces, and ice sheets interact to produce the weather patterns and long-term climate conditions that shape life on our planet. This interdisciplinary field draws on physics, chemistry, biology, and geology to understand past climate changes and predict future trends. The scientific consensus that human activities are warming Earth's climate rests on evidence accumulated over more than a century of research.

Joseph Fourier, a French mathematician, first proposed in 1824 that Earth's atmosphere traps heat from the sun, keeping the planet warmer than it would otherwise be. Fourier compared this effect to a glass box that lets light in but prevents heat from escaping, though he did not identify which atmospheric gases were responsible. His insight laid the foundation for what we now call the greenhouse effect, one of the most fundamental concepts in climate science.

Irish physicist John Tyndall conducted laboratory experiments in 1859 demonstrating that certain gases absorb infrared radiation while others do not. He showed that water vapor and carbon dioxide strongly absorb heat radiation, while nitrogen and oxygen, which make up most of the atmosphere, allow it to pass freely. Tyndall recognized that these properties explained both daily temperature variations and the existence of Earth's ice ages.

Swedish chemist Svante Arrhenius calculated in 1896 how changes in atmospheric carbon dioxide would affect global temperatures. Using measurements available at the time, he estimated that doubling carbon dioxide would raise average temperatures by approximately 5 to 6 degrees Celsius. Though his calculation method was crude by modern standards, his result falls within the range of current climate model predictions. Arrhenius also recognized that burning fossil fuels would increase atmospheric carbon dioxide, though he did not anticipate the scale of industrial growth that would follow.

Charles David Keeling began systematic measurements of atmospheric carbon dioxide at Mauna Loa Observatory in Hawaii in March 1958, creating the most important climate record of the modern era. The Keeling Curve, as the data series is now known, shows atmospheric carbon dioxide rising from 315 parts per million in 1958 to over 420 parts per million today. This increase of more than 30 percent represents the highest carbon dioxide concentration in at least 800,000 years, based on ice core records.

Ice cores drilled from Antarctica and Greenland provide detailed records of past atmospheric composition and temperature stretching back hundreds of thousands of years. Air bubbles trapped in ancient ice preserve samples of past atmospheres that scientists can analyze directly. These records reveal a close correlation between carbon dioxide levels and global temperature throughout multiple ice age cycles. They also show that current carbon dioxide levels exceed anything in the natural record of the past several hundred millennia.

Ocean temperature measurements collected since the nineteenth century document warming of the global ocean system. The ocean absorbs approximately 90 percent of the excess heat trapped by greenhouse gases, moderating surface temperature increases but causing other problems. Warmer oceans expand, contributing to sea level rise, and become more acidic as they absorb carbon dioxide. Marine ecosystems face unprecedented stress from warming waters and changing chemistry.

Sea level has risen approximately 20 centimeters since 1900, with the rate of rise accelerating in recent decades. Two processes drive this increase: thermal expansion as warming oceans take up more volume, and melting of glaciers and ice sheets that transfers water from land to sea. Continued warming threatens to raise sea levels by a meter or more by 2100, imperiling coastal cities where hundreds of millions of people live.

The Greenland and Antarctic ice sheets contain enough water to raise global sea level by approximately 65 meters if they melted completely. While complete melting would take centuries or millennia, even partial loss threatens significant impacts. Greenland is currently losing ice at approximately 280 billion metric tons per year, with the rate increasing over time. Antarctica is losing approximately 150 billion metric tons annually, with most losses coming from the rapidly warming Antarctic Peninsula.

Climate models simulate Earth's climate system by dividing the atmosphere and ocean into millions of grid cells and calculating how energy, moisture, and momentum flow between them. Early models in the 1960s were crude by today's standards, but computing power has enabled increasingly sophisticated simulations. Modern models accurately reproduce observed climate changes when historical greenhouse gas concentrations are included, providing confidence in their projections of future warming.

The Intergovernmental Panel on Climate Change, established by the United Nations in 1988, assesses and synthesizes climate research from scientists worldwide. IPCC reports represent the most authoritative summaries of climate science and have guided international policy discussions. The panel's sixth assessment report, released in stages between 2021 and 2023, concluded that human influence has unequivocally warmed the planet and that continued emissions will cause further warming.

Attribution science has advanced dramatically in recent years, allowing researchers to quantify how human activities influence specific weather events. Studies have shown that many heat waves, droughts, and heavy precipitation events were made more likely or more severe by human-caused warming. The 2021 Pacific Northwest heat dome, which broke temperature records by several degrees across Washington, Oregon, and British Columbia, was found to be virtually impossible without climate change.

Feedback mechanisms can amplify or dampen initial climate changes, making accurate prediction challenging. Ice-albedo feedback amplifies warming because melting ice exposes darker surfaces that absorb more sunlight. Water vapor feedback also amplifies warming because warmer air holds more water vapor, which is itself a greenhouse gas. Some feedbacks, like increased cloud cover reflecting more sunlight, may partially offset warming, but the net effect of known feedbacks is to amplify temperature changes.

Tipping points represent thresholds beyond which changes become self-reinforcing and potentially irreversible. Scientists have identified several potential tipping points including collapse of major ice sheets, dieback of the Amazon rainforest, thawing of permafrost containing vast stores of carbon, and shutdown of the Atlantic Ocean circulation system. Crossing these thresholds could trigger changes that would persist for centuries or millennia regardless of subsequent emission reductions.

Climate change affects ecosystems and biodiversity in multiple ways that scientists are still working to understand fully. Species are shifting their ranges toward the poles and to higher elevations as temperatures rise. Timing mismatches occur when temperature-dependent events like flowering or insect emergence no longer coincide with the life cycles of dependent species. Ocean acidification threatens coral reefs and shellfish that cannot build their calcium carbonate structures in more acidic water.

Human health faces increasing threats from climate change through multiple pathways. Heat waves kill tens of thousands of people annually, with deaths projected to increase as extreme heat becomes more common. Changing precipitation patterns affect water supplies and agricultural productivity. The geographic ranges of disease-carrying insects are expanding, bringing malaria, dengue fever, and other illnesses to previously unaffected regions.

Mitigation efforts aim to reduce greenhouse gas emissions through transitioning to renewable energy, improving energy efficiency, and changing land use practices. Solar and wind power have become the cheapest sources of new electricity generation in most of the world. Electric vehicles are rapidly replacing internal combustion engines in many markets. However, emissions continue rising globally despite these advances, as economic growth and population increase outpace efficiency gains.

Adaptation strategies help communities cope with climate impacts that can no longer be avoided. Coastal defenses protect against sea level rise and storm surges. Drought-resistant crops maintain agricultural productivity under changing conditions. Early warning systems save lives during extreme weather events. Equity concerns arise because the poorest communities, which have contributed least to emissions, often face the greatest impacts and have the fewest resources for adaptation.

The Paris Agreement, adopted in December 2015, commits signatory nations to limiting warming to well below 2 degrees Celsius above pre-industrial levels while pursuing efforts to limit warming to 1.5 degrees. Countries submit nationally determined contributions specifying their emission reduction plans, though current commitments remain insufficient to meet these goals. The agreement recognizes the need for financial and technical support to help developing nations reduce emissions and adapt to impacts.

Scientific understanding of climate change continues advancing through improved observations, more sophisticated models, and research into previously understudied aspects of the climate system. Satellite observations now provide comprehensive monitoring of ice sheets, sea level, atmospheric composition, and surface temperature. Paleoclimate research extends our understanding of past climate variations and how ecosystems responded. International research programs coordinate efforts across institutions and national boundaries.

The climate challenge requires unprecedented cooperation across nations, sectors, and generations. Decisions made in coming decades will determine conditions that future generations inherit for centuries or millennia. The scientific evidence clearly indicates both the risks of continued inaction and the potential benefits of rapid emission reductions. Translating scientific understanding into effective policy remains one of humanity's most pressing challenges.`,
    questions: [
      {
        id: 'science-discovery-c3-q1',
        type: 'single_choice',
        question: 'Who first proposed that Earth\'s atmosphere traps heat from the sun in 1824?',
        options: ['John Tyndall', 'Svante Arrhenius', 'Joseph Fourier', 'Charles Keeling'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-c3-q2',
        type: 'single_choice',
        question: 'What did John Tyndall demonstrate through laboratory experiments in 1859?',
        options: ['How carbon dioxide levels affect temperature', 'That certain gases absorb infrared radiation', 'How ice cores record past climates', 'The rate of sea level rise'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c3-q3',
        type: 'multiple_select',
        question: 'Which greenhouse gases did Tyndall identify as absorbing heat radiation? Select all that apply.',
        options: ['Nitrogen', 'Water vapor', 'Carbon dioxide', 'Oxygen'],
        correctIndices: [1, 2],
      },
      {
        id: 'science-discovery-c3-q4',
        type: 'true_false',
        question: 'Svante Arrhenius estimated that doubling carbon dioxide would raise temperatures by 5 to 6 degrees Celsius.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-c3-q5',
        type: 'numeric',
        question: 'In what year did Charles Keeling begin measuring atmospheric carbon dioxide at Mauna Loa?',
        correctValue: 1958,
        tolerance: 0,
        min: 1940,
        max: 1980,
        step: 1,
        unit: 'year',
      },
      {
        id: 'science-discovery-c3-q6',
        type: 'single_choice',
        question: 'What percentage of excess heat trapped by greenhouse gases does the ocean absorb?',
        options: ['About 50 percent', 'About 70 percent', 'About 90 percent', 'About 100 percent'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-c3-q7',
        type: 'numeric',
        question: 'Approximately how much has sea level risen since 1900 (in centimeters)?',
        correctValue: 20,
        tolerance: 3,
        min: 5,
        max: 40,
        step: 1,
        unit: 'centimeters',
      },
      {
        id: 'science-discovery-c3-q8',
        type: 'single_choice',
        question: 'When was the Intergovernmental Panel on Climate Change established?',
        options: ['1972', '1988', '1997', '2015'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c3-q9',
        type: 'true_false',
        question: 'Current carbon dioxide levels are the highest in at least 800,000 years.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-c3-q10',
        type: 'multiple_select',
        question: 'Which are identified as potential climate tipping points? Select all that apply.',
        options: ['Collapse of major ice sheets', 'Amazon rainforest dieback', 'Volcanic eruptions', 'Permafrost thawing'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'science-discovery-c3-q11',
        type: 'numeric',
        question: 'How much ice is Greenland currently losing annually (in billions of metric tons)?',
        correctValue: 280,
        tolerance: 30,
        min: 100,
        max: 400,
        step: 10,
        unit: 'billion metric tons',
      },
      {
        id: 'science-discovery-c3-q12',
        type: 'single_choice',
        question: 'What is the ice-albedo feedback?',
        options: ['Melting ice releases stored carbon dioxide', 'Darker surfaces exposed by melting ice absorb more sunlight', 'Ice reflects heat back to space', 'Warmer air holds more water vapor'],
        correctIndex: 1,
      },
      {
        id: 'science-discovery-c3-q13',
        type: 'single_choice',
        question: 'When was the Paris Agreement adopted?',
        options: ['1997', '2009', '2015', '2021'],
        correctIndex: 2,
      },
      {
        id: 'science-discovery-c3-q14',
        type: 'numeric',
        question: 'What was the atmospheric carbon dioxide concentration in parts per million when Keeling started measuring in 1958?',
        correctValue: 315,
        tolerance: 5,
        min: 280,
        max: 350,
        step: 5,
        unit: 'parts per million',
      },
      {
        id: 'science-discovery-c3-q15',
        type: 'true_false',
        question: 'The Paris Agreement aims to limit warming to well below 2 degrees Celsius above pre-industrial levels.',
        correctAnswer: true,
      },
      {
        id: 'science-discovery-c3-q16',
        type: 'single_choice',
        question: 'How much could sea level rise if the Greenland and Antarctic ice sheets melted completely?',
        options: ['About 10 meters', 'About 25 meters', 'About 65 meters', 'About 100 meters'],
        correctIndex: 2,
      },
    ],
  },
];
