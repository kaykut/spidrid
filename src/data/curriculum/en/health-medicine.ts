import { Article } from '../../../types/learning';

export const HEALTH_MEDICINE_ARTICLES: Article[] = [
  {
    id: 'health-medicine-p01',
    topicId: 'health-medicine',
    title: 'How Vaccines Work',
    difficulty: 'beginner',
    wordCount: 500,
    articleType: 'practice',
    orderIndex: 1,
    content: `Vaccines train your immune system to recognize and fight specific pathogens before they cause serious illness. They contain weakened or inactive parts of a virus or bacteria, which cannot cause disease but do trigger a protective immune response. Your body produces antibodies and memory cells that remember the pathogen for years.

When you receive a vaccine, specialized cells called antigen-presenting cells detect the foreign material immediately. These cells process the vaccine components and display fragments on their surface for other immune cells to examine. Helper T cells recognize these fragments and activate B cells, which produce antibodies specific to that pathogen.

The concept of immunization dates back to 1796 when Edward Jenner developed the first vaccine against smallpox in England. He observed that milkmaids who had contracted cowpox seemed protected from the more deadly smallpox disease. His experiment on an eight-year-old boy named James Phipps proved that cowpox exposure provided immunity.

Some B cells become plasma cells that produce large quantities of antibodies immediately after vaccination. Others become memory B cells that persist in your body for years or even decades. When the real pathogen appears, these memory cells recognize it and rapidly multiply to produce antibodies.

Different vaccines use different approaches to create immunity. Live attenuated vaccines contain weakened forms of the pathogen that can replicate but not cause disease. Inactivated vaccines use killed pathogens that cannot replicate at all. Subunit vaccines contain only specific proteins from the pathogen surface.

More recently, mRNA vaccines have emerged as a powerful new technology. These vaccines deliver genetic instructions that teach your cells to produce a harmless piece of the pathogen, triggering an immune response. The first mRNA vaccines received approval in December 2020 during the COVID-19 pandemic after remarkably fast development.

Vaccines have eradicated smallpox completely and nearly eliminated polio from the entire world. They have dramatically reduced deaths from measles, diphtheria, tetanus, and many other diseases that once killed millions each year. The World Health Organization estimates that vaccines prevent 4 to 5 million deaths annually worldwide.

Modern vaccine research continues advancing with new platforms and delivery methods. Scientists at institutions like Oxford University and the National Institutes of Health work to develop vaccines against diseases that still lack preventive treatments. Vaccines remain one of the most cost-effective public health interventions ever developed.`,
    questions: [
      {
        id: 'health-medicine-p01-q1',
        type: 'single_choice',
        question: 'Who developed the first vaccine against smallpox?',
        options: ['Louis Pasteur', 'Edward Jenner', 'Alexander Fleming', 'Jonas Salk'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p01-q2',
        type: 'multiple_select',
        question: 'Which types of vaccines are mentioned in the article? Select all that apply.',
        options: ['Live attenuated vaccines', 'mRNA vaccines', 'DNA vaccines', 'Inactivated vaccines'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p01-q3',
        type: 'true_false',
        question: 'Memory B cells can persist in your body for years or even decades.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p01-q4',
        type: 'numeric',
        question: 'In what year did Edward Jenner develop the first vaccine?',
        correctValue: 1796,
        tolerance: 0,
        min: 1700,
        max: 1900,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'health-medicine-p02',
    topicId: 'health-medicine',
    title: 'The Human Brain: Command Center of the Body',
    difficulty: 'beginner',
    wordCount: 750,
    articleType: 'practice',
    orderIndex: 2,
    content: `The human brain weighs approximately three pounds and contains roughly 86 billion neurons connected by trillions of synapses. This remarkable organ controls every thought, movement, sensation, and emotion you experience. Understanding how the brain works has become one of medicine's most important frontiers.

The brain consists of three main regions that work together seamlessly. The cerebrum, the largest part, handles conscious thought, learning, memory, and voluntary movement. The cerebellum at the back of the skull coordinates balance, posture, and fine motor control. The brainstem connects the brain to the spinal cord and regulates vital functions like breathing, heart rate, and sleep.

The cerebrum is divided into two hemispheres connected by a thick bundle of nerve fibers called the corpus callosum. Each hemisphere controls the opposite side of the body, so the left hemisphere controls the right hand and vice versa. While both hemispheres share most functions, the left side tends to dominate language processing in most right-handed people.

The cerebral cortex, the brain's wrinkled outer layer, is only about 3 millimeters thick but contains most of our neurons. Its folds dramatically increase surface area, allowing more processing power to fit inside the skull. Different regions of the cortex specialize in different functions, from processing visual information to planning complex actions.

Neurons communicate through electrical impulses and chemical signals called neurotransmitters. When a neuron fires, it releases neurotransmitters across tiny gaps called synapses to neighboring neurons. This process happens billions of times per second throughout your brain, creating the patterns of activity that produce thoughts and behaviors.

Santiago Ramon y Cajal, a Spanish scientist, made groundbreaking discoveries about neuron structure in the late 1800s. He developed staining techniques that revealed individual neurons for the first time, proving that the nervous system consisted of discrete cells rather than a continuous network. His work earned him the Nobel Prize in Physiology or Medicine in 1906.

The brain consumes about 20 percent of your body's energy despite comprising only 2 percent of body weight. Neurons require constant supplies of oxygen and glucose to function properly. Even brief interruptions in blood flow can cause permanent damage, which is why strokes are medical emergencies requiring immediate treatment.

Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This remarkable capacity allows people to learn new skills, recover from injuries, and adapt to changing circumstances. Research by Michael Merzenich and other scientists in the 1980s demonstrated that adult brains remain far more changeable than previously believed.

Sleep plays a crucial role in brain health and cognitive function. During sleep, the brain consolidates memories, clears metabolic waste products, and repairs cellular damage. Adults need seven to nine hours of sleep per night for optimal brain function. Chronic sleep deprivation impairs attention, decision-making, and emotional regulation.

Modern imaging technologies have revolutionized our understanding of the brain. Functional MRI, developed in the early 1990s, allows scientists to observe brain activity in real time by detecting changes in blood flow. This technology has revealed which brain regions activate during different tasks, from recognizing faces to experiencing emotions.

Researchers at institutions like the National Institutes of Health continue advancing our knowledge of brain disorders. Conditions like Alzheimer's disease, Parkinson's disease, and depression affect millions of people worldwide. Understanding the neural basis of these conditions is essential for developing effective treatments that could improve countless lives.`,
    questions: [
      {
        id: 'health-medicine-p02-q1',
        type: 'single_choice',
        question: 'Which part of the brain coordinates balance and fine motor control?',
        options: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Corpus callosum'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q2',
        type: 'single_choice',
        question: 'Who discovered that the nervous system consists of discrete cells?',
        options: ['Michael Merzenich', 'Santiago Ramon y Cajal', 'Louis Pasteur', 'William Harvey'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p02-q3',
        type: 'multiple_select',
        question: 'What happens during sleep? Select all that apply.',
        options: ['Memory consolidation', 'Clearing metabolic waste', 'Creating new neurons', 'Repairing cellular damage'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p02-q4',
        type: 'true_false',
        question: 'The brain consumes about 20 percent of the body\'s energy.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p02-q5',
        type: 'numeric',
        question: 'Approximately how many neurons does the human brain contain (in billions)?',
        correctValue: 86,
        tolerance: 10,
        min: 50,
        max: 150,
        step: 5,
        unit: 'billion neurons',
      },
    ],
  },
  {
    id: 'health-medicine-p03',
    topicId: 'health-medicine',
    title: 'The Immune System: Your Body\'s Defense Force',
    difficulty: 'beginner',
    wordCount: 1000,
    articleType: 'practice',
    orderIndex: 3,
    content: `The human immune system is a complex network of cells, tissues, and organs that protects the body from harmful invaders. Every day, your immune system identifies and destroys millions of bacteria, viruses, fungi, and parasites that could cause disease. This remarkable defense system has evolved over millions of years to keep you healthy.

The immune system operates through two main branches that work together to provide protection. The innate immune system provides immediate, nonspecific defense against pathogens. The adaptive immune system develops targeted responses to specific threats and remembers them for future encounters. Both systems must function properly to maintain health.

Physical barriers form the first line of defense against infection. Skin creates a nearly impenetrable wall that most pathogens cannot cross. Mucous membranes in the nose, throat, and lungs trap foreign particles before they can enter the body. Stomach acid kills many bacteria in contaminated food before they can cause harm.

When pathogens breach these barriers, the innate immune system responds within minutes. White blood cells called neutrophils rush to the site of infection and engulf invaders through a process called phagocytosis. Macrophages, larger cells that patrol tissues throughout the body, also consume pathogens and signal other immune cells to join the fight.

Inflammation is a crucial part of the innate immune response that helps contain and eliminate infections. Blood vessels dilate, allowing more immune cells to reach the affected area. The familiar signs of inflammation include redness, warmth, swelling, and pain. While uncomfortable, these symptoms indicate your immune system is working correctly.

The adaptive immune system takes longer to activate but provides highly specific and powerful responses. T cells and B cells are the main soldiers of adaptive immunity, each with distinct roles in fighting infection. These cells can recognize specific pathogens and develop targeted strategies to eliminate them.

B cells produce antibodies, specialized proteins that bind to specific pathogens and mark them for destruction. Each B cell produces antibodies that recognize just one type of foreign molecule called an antigen. When activated, B cells multiply rapidly and produce millions of antibodies that circulate throughout the bloodstream.

T cells come in several varieties with different functions. Helper T cells coordinate immune responses by releasing chemical signals called cytokines that activate other immune cells. Cytotoxic T cells directly kill infected cells by releasing toxic proteins that punch holes in cell membranes. Regulatory T cells help prevent the immune system from attacking healthy tissues.

Paul Ehrlich, a German scientist, proposed the concept of antibodies in 1897 and developed the first effective treatment for syphilis. His work on immunology earned him the Nobel Prize in Physiology or Medicine in 1908, which he shared with Ilya Metchnikoff, who discovered phagocytosis. Their discoveries laid the foundation for modern immunology.

Immunological memory allows the adaptive immune system to respond faster and more effectively to previously encountered pathogens. Memory B cells and memory T cells persist in the body for years or decades after an infection. When the same pathogen appears again, these cells activate quickly and often prevent illness entirely.

Autoimmune diseases occur when the immune system mistakenly attacks healthy tissues. Conditions like rheumatoid arthritis, type 1 diabetes, and multiple sclerosis affect millions of people worldwide. These diseases often result from a combination of genetic susceptibility and environmental triggers that cause immune dysfunction.

Allergies represent another form of immune system malfunction in which the body overreacts to harmless substances like pollen, pet dander, or certain foods. During an allergic reaction, immune cells release histamine and other chemicals that cause symptoms ranging from sneezing to potentially life-threatening anaphylaxis.

The immune system changes throughout life in response to age and experience. Newborns receive temporary protection from maternal antibodies passed through the placenta and breast milk. The immune system strengthens through childhood as children encounter and develop immunity to common pathogens. In elderly adults, immune function gradually declines, increasing susceptibility to infections.

Lifestyle factors significantly influence immune function. Adequate sleep, regular exercise, and proper nutrition support immune health. Chronic stress releases cortisol and other hormones that suppress immune responses over time. Avoiding excessive alcohol and tobacco helps maintain immune defenses at optimal levels.

Modern medicine continues developing ways to harness the immune system for treating disease. Immunotherapy has revolutionized cancer treatment by training immune cells to recognize and destroy tumors. The 2018 Nobel Prize in Physiology or Medicine recognized James Allison and Tasuku Honjo for pioneering work on cancer immunotherapy that has saved thousands of lives.`,
    questions: [
      {
        id: 'health-medicine-p03-q1',
        type: 'single_choice',
        question: 'Which cells produce antibodies?',
        options: ['T cells', 'B cells', 'Neutrophils', 'Macrophages'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q2',
        type: 'single_choice',
        question: 'Who proposed the concept of antibodies in 1897?',
        options: ['Ilya Metchnikoff', 'Paul Ehrlich', 'James Allison', 'Tasuku Honjo'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p03-q3',
        type: 'single_choice',
        question: 'What is phagocytosis?',
        options: ['The production of antibodies', 'The release of histamine', 'The process of engulfing and destroying pathogens', 'The formation of memory cells'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p03-q4',
        type: 'multiple_select',
        question: 'Which are signs of inflammation? Select all that apply.',
        options: ['Redness', 'Coldness', 'Swelling', 'Pain'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-p03-q5',
        type: 'true_false',
        question: 'The innate immune system develops targeted responses to specific pathogens.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p03-q6',
        type: 'numeric',
        question: 'In what year did Paul Ehrlich win the Nobel Prize for his work on immunology?',
        correctValue: 1908,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'health-medicine-p04',
    topicId: 'health-medicine',
    title: 'Antibiotics: The War Against Bacteria',
    difficulty: 'intermediate',
    wordCount: 1300,
    articleType: 'practice',
    orderIndex: 4,
    content: `Antibiotics have saved more lives than any other class of drugs in medical history. These remarkable medications kill bacteria or prevent them from reproducing, allowing the body's immune system to eliminate infections. Since their discovery in the early twentieth century, antibiotics have transformed medicine and extended human lifespans dramatically.

Alexander Fleming discovered the first antibiotic by accident on September 28, 1928, at St. Mary's Hospital in London. Fleming noticed that a mold called Penicillium notatum had contaminated one of his bacterial cultures and killed the surrounding bacteria. Rather than discarding the contaminated plate, he investigated further and identified the antibacterial substance, which he named penicillin. Fleming published his findings in 1929 but lacked the resources to develop penicillin into a usable drug.

Howard Florey and Ernst Boris Chain at Oxford University transformed penicillin from a laboratory curiosity into a practical medicine during the early 1940s. They developed methods to purify and mass-produce the drug, conducting the first successful human trials in February 1941. Wartime demand accelerated production dramatically, and by D-Day in June 1944, enough penicillin existed to treat all Allied wounded soldiers. Fleming, Florey, and Chain shared the Nobel Prize in Physiology or Medicine in 1945.

Antibiotics work through several different mechanisms to attack bacterial cells while sparing human cells. Penicillin and related drugs interfere with cell wall construction, causing bacteria to burst under their own internal pressure. Tetracyclines and aminoglycosides block bacterial ribosomes from making proteins. Fluoroquinolones prevent bacteria from copying their DNA. These different attack strategies explain why certain antibiotics work better against particular infections.

The discovery of new antibiotic classes proceeded rapidly during what scientists call the golden age of antibiotic discovery from 1940 to 1962. Streptomycin, discovered by Selman Waksman at Rutgers University in 1943, became the first effective treatment for tuberculosis. Scientists found tetracycline in 1948, erythromycin in 1952, and vancomycin in 1958. Each new class expanded the range of infections doctors could treat successfully.

Antibiotic resistance emerged almost immediately as a consequence of bacterial evolution and natural selection. Bacteria reproduce rapidly, sometimes doubling their population every twenty minutes under favorable conditions. Random mutations occasionally produce resistance to antibiotics, and these resistant bacteria survive while others die. Within years of penicillin's introduction, resistant Staphylococcus bacteria appeared in hospitals worldwide.

The overuse and misuse of antibiotics has accelerated resistance dramatically in recent decades. Doctors sometimes prescribe antibiotics for viral infections like colds and flu, where they provide no benefit. Agricultural operations feed antibiotics to livestock to promote growth, exposing huge bacterial populations to selective pressure. Patients who stop taking antibiotics early leave resistant bacteria alive to multiply and spread.

Methicillin-resistant Staphylococcus aureus, known as MRSA, demonstrates the danger of antibiotic resistance. This superbug emerged in British hospitals in 1961, just two years after methicillin's introduction. MRSA now causes approximately 120,000 infections and 20,000 deaths annually in the United States alone. Some strains have developed resistance to nearly all available antibiotics, leaving doctors with few treatment options.

The World Health Organization declared antibiotic resistance one of the greatest threats to global health in 2014. Without effective antibiotics, routine surgeries become dangerous, cancer chemotherapy grows riskier, and minor infections turn deadly. The WHO estimates that drug-resistant infections already cause 700,000 deaths annually worldwide and could cause 10 million deaths per year by 2050 if current trends continue.

Pharmaceutical companies have largely abandoned antibiotic research because developing new drugs costs billions of dollars while bacteria develop resistance within years. Only two new antibiotic classes have reached the market since 1962. Government incentives and nonprofit initiatives now work to encourage antibiotic development, but the pipeline of new drugs remains dangerously thin.

Preserving antibiotic effectiveness requires action from doctors, patients, farmers, and governments worldwide. Doctors should prescribe antibiotics only when necessary and choose narrow-spectrum drugs when possible. Patients must complete their full course of treatment even after feeling better. Agricultural reforms can reduce antibiotic use in livestock while maintaining food production. International cooperation is essential because resistant bacteria cross borders freely.

New approaches to fighting bacterial infections offer hope for the future. Bacteriophages are viruses that naturally infect and kill bacteria, offering an alternative to chemical antibiotics. Scientists are developing vaccines against bacteria currently treated with antibiotics. Researchers explore compounds that disable bacterial defenses without killing the bacteria, reducing selective pressure for resistance. These innovations may eventually supplement or replace traditional antibiotics.

The history of antibiotics teaches important lessons about the ongoing contest between human medicine and microbial evolution. Each new weapon we develop eventually loses effectiveness as bacteria adapt. Maintaining our edge requires continuous research, responsible use of existing drugs, and recognition that this battle will never end.`,
    questions: [
      {
        id: 'health-medicine-p04-q1',
        type: 'single_choice',
        question: 'Who discovered penicillin in 1928?',
        options: ['Howard Florey', 'Ernst Boris Chain', 'Alexander Fleming', 'Selman Waksman'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p04-q2',
        type: 'single_choice',
        question: 'What does MRSA stand for?',
        options: ['Multiple-resistant Staphylococcus aureus', 'Methicillin-resistant Staphylococcus aureus', 'Multi-drug resistant Streptococcus aureus', 'Methicillin-resistant Streptococcus aureus'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p04-q3',
        type: 'multiple_select',
        question: 'Which mechanisms do antibiotics use to attack bacteria? Select all that apply.',
        options: ['Interfering with cell wall construction', 'Blocking ribosomes from making proteins', 'Attacking human cells', 'Preventing DNA replication'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p04-q4',
        type: 'true_false',
        question: 'The golden age of antibiotic discovery lasted from 1940 to 1962.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p04-q5',
        type: 'numeric',
        question: 'Approximately how many deaths does MRSA cause annually in the United States?',
        correctValue: 20000,
        tolerance: 2000,
        min: 5000,
        max: 50000,
        step: 1000,
        unit: 'deaths',
      },
      {
        id: 'health-medicine-p04-q6',
        type: 'single_choice',
        question: 'Who developed methods to mass-produce penicillin at Oxford University?',
        options: ['Alexander Fleming and Selman Waksman', 'Howard Florey and Ernst Boris Chain', 'Robert Koch and Louis Pasteur', 'Edward Jenner and Jonas Salk'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'health-medicine-p05',
    topicId: 'health-medicine',
    title: 'Sleep: The Science of Rest and Recovery',
    difficulty: 'intermediate',
    wordCount: 1700,
    articleType: 'practice',
    orderIndex: 5,
    content: `Sleep remains one of the most essential yet poorly understood aspects of human biology. Every person spends roughly one-third of their life asleep, yet scientists only began unraveling sleep's mysteries in the twentieth century. Modern research reveals that sleep performs crucial functions for physical health, mental performance, and emotional wellbeing that cannot be replaced by any amount of rest while awake.

The discovery of rapid eye movement sleep in 1953 by Eugene Aserinsky and Nathaniel Kleitman at the University of Chicago revolutionized sleep science. They observed that sleeping subjects' eyes moved rapidly beneath closed lids during certain periods, and brain activity during these phases resembled waking activity. REM sleep, as they named it, turned out to be when most vivid dreaming occurs. This finding transformed sleep from a passive state into an active process worthy of scientific investigation.

Sleep occurs in cycles lasting approximately ninety minutes each, with most adults completing four to six cycles per night. Each cycle contains distinct stages that perform different functions. Non-REM sleep begins with light sleep during which muscle activity decreases and body temperature drops. Deeper non-REM stages follow, during which the body repairs tissues, strengthens the immune system, and releases growth hormone.

REM sleep increases in duration as the night progresses, with the longest REM periods occurring toward morning. During REM sleep, the brain becomes highly active while voluntary muscles become temporarily paralyzed. This paralysis prevents people from acting out their dreams, though REM sleep behavior disorder can disrupt this mechanism with potentially dangerous results. Most REM sleep occurs during the final third of the night.

The brain's glymphatic system, discovered by Maiken Nedergaard at the University of Rochester in 2012, revealed one crucial function of sleep. This waste clearance system removes toxic proteins from brain tissue, including beta-amyloid associated with Alzheimer's disease. The glymphatic system operates primarily during deep non-REM sleep when brain cells shrink by approximately 60 percent, allowing cerebrospinal fluid to flush between neurons.

Memory consolidation represents another vital sleep function that researchers have documented extensively. During sleep, the brain replays and strengthens neural connections formed during waking learning experiences. Studies by Robert Stickgold at Harvard Medical School demonstrated that subjects who slept after learning new skills performed significantly better than those who stayed awake the same duration.

Sleep deprivation produces severe cognitive and physical impairments that accumulate over time. After just seventeen hours without sleep, reaction times and judgment decline to levels equivalent to legal intoxication. The Exxon Valdez oil spill in March 1989 and the Chernobyl nuclear disaster in April 1986 both involved fatigued workers making critical errors. Chronic sleep deprivation increases risks of obesity, diabetes, heart disease, and early death.

Circadian rhythms regulate sleep timing through a biological clock located in the brain's suprachiasmatic nucleus. This tiny cluster of about 20,000 neurons receives light signals from the eyes and coordinates daily cycles of alertness, body temperature, hormone release, and countless other functions. The circadian clock runs slightly longer than 24 hours and must be reset daily by exposure to light.

Melatonin, a hormone produced by the pineal gland, signals darkness to the body and promotes sleep onset. The brain begins releasing melatonin in the evening hours, typically two hours before habitual bedtime. Exposure to bright light, especially blue wavelengths from electronic screens, suppresses melatonin production and can delay sleep. This explains why using phones and computers before bed often disrupts sleep.

Adenosine builds up in the brain during waking hours and creates increasing pressure to sleep. This chemical accumulates as a byproduct of brain activity and binds to receptors that promote drowsiness. Caffeine works by blocking adenosine receptors, temporarily masking fatigue without eliminating the underlying sleep debt. When caffeine wears off, accumulated adenosine produces the familiar crash that coffee drinkers experience.

Sleep disorders affect millions of people and take many forms beyond simple insomnia. Obstructive sleep apnea causes repeated breathing interruptions during sleep, affecting approximately 25 million American adults. This condition increases risks of high blood pressure, heart attack, stroke, and diabetes. Continuous positive airway pressure machines that keep airways open during sleep provide effective treatment for most patients.

Narcolepsy, a neurological disorder affecting about 200,000 Americans, causes overwhelming daytime sleepiness and sudden sleep attacks. Researchers discovered in 1999 that narcolepsy results from the destruction of neurons that produce hypocretin, a neurotransmitter that maintains wakefulness. This discovery by Emmanuel Mignot at Stanford University opened new treatment possibilities and illustrated how studying sleep disorders advances understanding of normal sleep.

Age profoundly affects sleep patterns throughout the human lifespan. Newborns sleep up to seventeen hours daily, spending about half that time in REM sleep. Teenagers experience a biological shift toward later sleep timing that conflicts with early school start times. Older adults sleep less deeply and wake more frequently, though their sleep needs do not necessarily decrease.

Modern society often treats sleep as expendable time that can be traded for productivity or entertainment. This attitude ignores overwhelming scientific evidence that adequate sleep is essential for health and performance. The Centers for Disease Control and Prevention declared insufficient sleep a public health epidemic in 2014, estimating that one-third of American adults sleep less than the recommended seven hours per night.

Improving sleep habits requires consistent schedules, appropriate sleep environments, and behavioral changes. Going to bed and waking at the same times each day strengthens circadian rhythms. Cool, dark, quiet bedrooms promote sleep quality. Avoiding caffeine after noon, limiting alcohol before bed, and reducing evening screen time all support better sleep. Exercise improves sleep quality when performed earlier in the day.

Understanding sleep science empowers individuals to make informed choices about this fundamental human need. Sleep is not wasted time but an active investment in physical health, cognitive function, and emotional resilience. The growing body of research confirms what common experience suggests: adequate sleep is essential for living well.`,
    questions: [
      {
        id: 'health-medicine-p05-q1',
        type: 'single_choice',
        question: 'Who discovered REM sleep in 1953?',
        options: ['Robert Stickgold and Matthew Walker', 'Eugene Aserinsky and Nathaniel Kleitman', 'Maiken Nedergaard and Emmanuel Mignot', 'William Dement and Allan Rechtschaffen'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q2',
        type: 'single_choice',
        question: 'What does the glymphatic system do during sleep?',
        options: ['Consolidates memories', 'Removes toxic proteins from brain tissue', 'Regulates circadian rhythms', 'Produces melatonin'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q3',
        type: 'multiple_select',
        question: 'Which conditions are associated with chronic sleep deprivation? Select all that apply.',
        options: ['Obesity', 'Heart disease', 'Improved immune function', 'Diabetes'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p05-q4',
        type: 'true_false',
        question: 'Caffeine eliminates sleep debt by restoring adenosine levels.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p05-q5',
        type: 'numeric',
        question: 'Approximately how long does each sleep cycle last in minutes?',
        correctValue: 90,
        tolerance: 10,
        min: 30,
        max: 180,
        step: 5,
        unit: 'minutes',
      },
      {
        id: 'health-medicine-p05-q6',
        type: 'single_choice',
        question: 'What causes narcolepsy?',
        options: ['Excessive melatonin production', 'Destruction of hypocretin-producing neurons', 'Blocked adenosine receptors', 'Disrupted circadian rhythms'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p05-q7',
        type: 'single_choice',
        question: 'Where is the biological clock located in the brain?',
        options: ['Pineal gland', 'Hippocampus', 'Suprachiasmatic nucleus', 'Cerebellum'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p05-q8',
        type: 'numeric',
        question: 'Approximately how many American adults are affected by obstructive sleep apnea (in millions)?',
        correctValue: 25,
        tolerance: 5,
        min: 5,
        max: 50,
        step: 1,
        unit: 'million',
      },
    ],
  },
  {
    id: 'health-medicine-p06',
    topicId: 'health-medicine',
    title: 'The Gut Microbiome: Your Inner Ecosystem',
    difficulty: 'intermediate',
    wordCount: 2100,
    articleType: 'practice',
    orderIndex: 6,
    content: `The human gut contains trillions of microorganisms that influence health in ways scientists are only beginning to understand. This complex ecosystem, known as the gut microbiome, plays essential roles in digestion, immunity, mental health, and disease prevention. Research into this hidden world has revolutionized how medical professionals think about human biology and opened promising new approaches to treating illness.

The average adult carries approximately 38 trillion bacterial cells, roughly equal to the number of human cells in the body. Most of these microbes inhabit the gastrointestinal tract, particularly the large intestine, where conditions favor bacterial growth. Over 1,000 different bacterial species have been identified in human guts, though each individual typically hosts between 150 and 250 species. This microbial community weighs between one and two kilograms in a typical adult.

The gut microbiome begins developing at birth and continues changing throughout life. Babies born vaginally acquire their initial microbes from the birth canal, while cesarean-delivered infants first encounter bacteria from hospital environments and skin contact. Breastfeeding further shapes the developing microbiome by providing both nutrients and beneficial bacteria. The gut community remains relatively unstable during early childhood before settling into adult patterns by around age three.

Dutch scientist Antonie van Leeuwenhoek first observed microorganisms in 1676 using microscopes he built himself, but understanding of gut bacteria remained limited for centuries. Russian biologist Elie Metchnikoff proposed in 1907 that certain bacteria could benefit human health, observing that Bulgarian peasants who consumed fermented milk products lived unusually long lives. His ideas about probiotics earned skepticism from contemporaries but anticipated discoveries that would come decades later.

Modern microbiome research accelerated dramatically after the Human Microbiome Project launched in 2007 with funding from the National Institutes of Health. This ambitious initiative aimed to identify and characterize microorganisms living in and on the human body. Advances in DNA sequencing technology made it possible to identify bacteria without needing to grow them in laboratory cultures. Scientists discovered that the gut microbiome contains approximately 100 times more genes than the human genome itself.

The gut microbiome performs essential functions that human cells cannot accomplish independently. Certain bacteria break down dietary fibers that human enzymes cannot digest, producing short-chain fatty acids that nourish intestinal cells. Other microbes synthesize vitamins including vitamin K and several B vitamins that the body requires. The gut community also helps train the immune system to distinguish between harmful pathogens and beneficial organisms.

Diet profoundly influences microbiome composition and function. People who consume diets rich in fiber typically harbor more diverse bacterial communities than those eating processed foods high in sugar and fat. Traditional diets in rural Africa, rich in plant fiber, produce microbiomes dramatically different from those seen in Western populations. Dietary changes can shift microbiome composition within just 24 hours, though returning to old eating patterns typically restores previous bacterial populations.

Antibiotics devastate gut bacterial communities along with the harmful organisms they target. A single course of antibiotics can eliminate beneficial species that may take months or years to recover. Some species never return, permanently altering microbiome composition. This collateral damage has prompted growing concern about antibiotic overuse and interest in strategies to protect or restore gut communities during treatment.

Research has linked microbiome disturbances to an expanding list of health conditions. Inflammatory bowel diseases, including Crohn's disease and ulcerative colitis, involve altered bacterial communities that may trigger or worsen intestinal inflammation. Obesity appears connected to microbiome composition, with studies showing that transplanting gut bacteria from obese mice into lean mice causes weight gain. Type 2 diabetes, autoimmune conditions, and allergies have all been associated with microbiome changes.

The gut-brain axis represents one of the most surprising frontiers in microbiome research. Bacteria in the intestine communicate with the brain through multiple pathways, including the vagus nerve and chemical messengers that enter the bloodstream. Studies have found differences in gut bacteria between people with depression or anxiety and those without these conditions. Research by John Cryan at University College Cork has demonstrated that specific bacterial strains can influence mood and behavior in both animals and humans.

Fecal microbiota transplantation has emerged as a remarkably effective treatment for recurrent Clostridioides difficile infections. This procedure, which transfers stool from a healthy donor into a patient's intestine, cures approximately 90 percent of cases that failed to respond to antibiotics. The first successful fecal transplant for this condition was performed in 1958 by Ben Eiseman at Denver Veterans Administration Hospital, but the treatment remained obscure until antibiotic-resistant C. difficile became a major problem.

Probiotics, live microorganisms intended to provide health benefits, have become a billion-dollar industry despite limited evidence for many claimed benefits. Some probiotic strains have shown effectiveness for specific conditions, including antibiotic-associated diarrhea and certain digestive disorders. However, many commercial products lack proof of effectiveness, and probiotics that help one person may not benefit another due to individual microbiome differences.

Prebiotics offer an alternative approach by feeding beneficial bacteria already present in the gut. These non-digestible food components, found in foods like garlic, onions, bananas, and whole grains, selectively promote growth of helpful bacterial species. Combining prebiotics with probiotics creates synbiotics that may provide enhanced benefits, though research continues to determine optimal combinations and doses.

The microbiome varies significantly between individuals, making personalized approaches increasingly important. Researchers at the Weizmann Institute of Science in Israel demonstrated in 2015 that blood sugar responses to identical foods differ dramatically between people, with microbiome composition helping explain this variation. This finding suggests that dietary recommendations might eventually be tailored based on individual microbiome profiles.

Future applications of microbiome science could transform medicine in profound ways. Researchers are developing techniques to precisely edit microbiome composition, adding or removing specific species to treat disease. Engineered bacteria might deliver medications directly to diseased tissues or produce therapeutic molecules within the gut. Understanding how the microbiome influences drug metabolism could improve treatment effectiveness and reduce side effects.

The gut microbiome reminds us that humans are not isolated organisms but ecosystems hosting countless microbial partners. These unseen inhabitants influence our health, mood, and even behavior through mechanisms we are only beginning to appreciate. Nurturing this inner ecosystem through diet, lifestyle choices, and judicious use of antibiotics may prove as important as any other health practice we adopt.`,
    questions: [
      {
        id: 'health-medicine-p06-q1',
        type: 'single_choice',
        question: 'Approximately how many bacterial cells does the average adult carry?',
        options: ['1 trillion', '10 trillion', '38 trillion', '100 trillion'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q2',
        type: 'single_choice',
        question: 'When did the Human Microbiome Project launch?',
        options: ['1958', '1976', '2007', '2015'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q3',
        type: 'multiple_select',
        question: 'Which functions does the gut microbiome perform? Select all that apply.',
        options: ['Breaking down dietary fibers', 'Synthesizing vitamins', 'Pumping blood', 'Training the immune system'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p06-q4',
        type: 'true_false',
        question: 'Elie Metchnikoff proposed in 1907 that certain bacteria could benefit human health.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p06-q5',
        type: 'numeric',
        question: 'What percentage of recurrent C. difficile infections does fecal microbiota transplantation cure?',
        correctValue: 90,
        tolerance: 5,
        min: 50,
        max: 100,
        step: 5,
        unit: 'percent',
      },
      {
        id: 'health-medicine-p06-q6',
        type: 'single_choice',
        question: 'Who performed the first successful fecal transplant for C. difficile?',
        options: ['Antonie van Leeuwenhoek', 'Elie Metchnikoff', 'Ben Eiseman', 'John Cryan'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q7',
        type: 'single_choice',
        question: 'At approximately what age does the gut microbiome settle into adult patterns?',
        options: ['At birth', 'Age one', 'Age three', 'Adolescence'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p06-q8',
        type: 'numeric',
        question: 'How many different bacterial species have been identified in human guts (over what number)?',
        correctValue: 1000,
        tolerance: 100,
        min: 500,
        max: 2000,
        step: 100,
        unit: 'species',
      },
      {
        id: 'health-medicine-p06-q9',
        type: 'true_false',
        question: 'The gut microbiome contains approximately 100 times more genes than the human genome.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-p07',
    topicId: 'health-medicine',
    title: 'Genetics and Heredity: The Code of Life',
    difficulty: 'advanced',
    wordCount: 2500,
    articleType: 'practice',
    orderIndex: 7,
    content: `Genetics is the science of heredity, explaining how traits pass from parents to offspring through information encoded in DNA. This field has transformed our understanding of life itself and enabled medical advances ranging from genetic testing to gene therapy. The story of genetics spans from ancient observations about inheritance to cutting-edge technologies that can edit the very blueprint of living organisms.

Gregor Mendel, an Augustinian friar working in a monastery garden in Brno, Austria, discovered the fundamental laws of inheritance through careful experiments with pea plants. Between 1856 and 1863, Mendel crossbred approximately 29,000 pea plants, meticulously recording how traits like seed color, pod shape, and plant height passed from generation to generation. His work revealed that hereditary factors come in pairs, with offspring receiving one factor from each parent.

Mendel presented his findings to the Natural History Society of Brno in February and March of 1865, then published them the following year. The scientific community largely ignored his revolutionary discoveries during his lifetime. Mendel died in January 1884 without knowing that his work would eventually earn him recognition as the father of genetics. Three scientists independently rediscovered his principles in 1900, finally bringing attention to insights made decades earlier.

Chromosomes, the structures that carry genetic information, were discovered in the late nineteenth century. German biologist Walther Flemming observed chromosomes during cell division in 1882 and described the process he named mitosis. American scientist Walter Sutton proposed in 1902 that chromosomes carry Mendel's hereditary factors, connecting cell biology to the emerging science of genetics.

Thomas Hunt Morgan established the chromosome theory of inheritance through experiments with fruit flies conducted at Columbia University starting in 1908. His fly room became legendary for groundbreaking discoveries about how genes are arranged on chromosomes. Morgan found that certain traits tend to be inherited together because the genes controlling them lie on the same chromosome. He received the Nobel Prize in Physiology or Medicine in 1933 for demonstrating the role of chromosomes in heredity.

The nature of genes themselves remained mysterious until molecular biology revealed their chemical basis. Oswald Avery and colleagues demonstrated in 1944 that DNA carries genetic information, though many scientists remained skeptical for years afterward. James Watson and Francis Crick determined DNA's double helix structure in 1953, opening the modern era of molecular genetics. Their discovery explained how genetic information could be stored and copied with remarkable fidelity.

DNA consists of two strands wound around each other, connected by base pairs following specific pairing rules. Adenine always pairs with thymine, while guanine always pairs with cytosine. This complementary structure means each strand can serve as a template for producing an identical copy during cell division. The sequence of bases along a DNA strand encodes genetic information much like letters spell out words in a sentence.

Genes are segments of DNA that contain instructions for building proteins, the molecules that perform most cellular functions. The human genome contains approximately 20,000 protein-coding genes spread across 23 pairs of chromosomes. Each gene can exist in different versions called alleles, explaining why individuals differ in specific traits. The complete set of genetic instructions in an organism is called its genome.

The genetic code was deciphered during the 1960s through work by multiple research groups. Marshall Nirenberg and Heinrich Matthaei cracked the first codon in 1961, showing that three DNA bases specify one amino acid. By 1966, scientists had determined how all 64 possible three-base combinations correspond to the 20 amino acids used to build proteins. This universal code operates in virtually all life forms, from bacteria to humans.

Genetic mutations occur when DNA sequences change, sometimes affecting the proteins they encode. Some mutations arise spontaneously during DNA replication, while others result from environmental factors like radiation or certain chemicals. Most mutations have little or no effect, but some cause genetic diseases while others occasionally provide advantages that evolution can select. Sickle cell disease, cystic fibrosis, and Huntington's disease all result from specific genetic mutations.

The Human Genome Project, launched in 1990 and completed in April 2003, determined the complete sequence of human DNA. This international effort involved scientists from 20 institutions across six countries and cost approximately 2.7 billion dollars. The project identified the location of all human genes and provided a reference sequence that has enabled countless subsequent discoveries. Today, sequencing an individual's genome costs less than one thousand dollars and takes only hours.

Genetic testing has become increasingly accessible, allowing individuals to learn about their genetic makeup and disease risks. Tests can identify carriers of conditions like Tay-Sachs disease or sickle cell anemia who might pass these traits to children. Screening newborns for treatable genetic conditions has become standard practice in most developed countries. Direct-to-consumer genetic testing services launched by companies like 23andMe have brought genetic information to millions of people.

Pharmacogenomics studies how genetic variations affect responses to medications. Some people metabolize certain drugs quickly while others process them slowly, affecting both effectiveness and side effects. The FDA has updated labels for over 200 drugs with genetic information relevant to their use. Physicians increasingly use genetic testing to select medications and doses best suited to individual patients.

Gene therapy aims to treat genetic diseases by introducing functional copies of defective genes into patients' cells. The first successful gene therapy in humans occurred in September 1990 when William French Anderson treated a four-year-old girl with severe combined immunodeficiency at the National Institutes of Health. Progress was slow due to technical challenges and safety concerns, but recent years have seen multiple gene therapies receive regulatory approval.

CRISPR-Cas9 gene editing technology, developed from bacterial immune systems, has revolutionized genetic research since Jennifer Doudna and Emmanuelle Charpentier published their landmark paper in June 2012. This tool allows scientists to make precise changes to DNA sequences with unprecedented ease and accuracy. Doudna and Charpentier received the Nobel Prize in Chemistry in 2020 for their discovery. CRISPR has potential applications ranging from treating genetic diseases to creating disease-resistant crops.

The ethical implications of genetic technologies continue generating debate. Genetic testing raises questions about privacy, discrimination, and psychological impacts of learning disease risks. Gene therapy and editing force consideration of which conditions should be treated and whether enhancement of normal traits is acceptable. The birth of the first gene-edited babies in China in November 2018 sparked international condemnation and highlighted the need for oversight of genetic technologies.

Genetics has transformed from observing inheritance patterns in garden peas to reading and editing the molecular code of life. This knowledge brings both tremendous promise and significant responsibility. Understanding genetics empowers individuals to make informed health decisions while challenging society to grapple with profound questions about what it means to be human in an age when our genetic destiny is no longer fixed.`,
    questions: [
      {
        id: 'health-medicine-p07-q1',
        type: 'single_choice',
        question: 'How many pea plants did Gregor Mendel crossbreed in his experiments?',
        options: ['Approximately 5,000', 'Approximately 10,000', 'Approximately 29,000', 'Approximately 50,000'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q2',
        type: 'single_choice',
        question: 'Who received the Nobel Prize in 1933 for demonstrating the role of chromosomes in heredity?',
        options: ['Gregor Mendel', 'Thomas Hunt Morgan', 'Walter Sutton', 'Walther Flemming'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q3',
        type: 'multiple_select',
        question: 'Which scientists contributed to discovering DNA\'s structure or function? Select all that apply.',
        options: ['Oswald Avery', 'James Watson', 'Francis Crick', 'Gregor Mendel'],
        correctIndices: [0, 1, 2],
      },
      {
        id: 'health-medicine-p07-q4',
        type: 'true_false',
        question: 'The Human Genome Project was completed in April 2003.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p07-q5',
        type: 'numeric',
        question: 'Approximately how many protein-coding genes does the human genome contain?',
        correctValue: 20000,
        tolerance: 2000,
        min: 10000,
        max: 40000,
        step: 1000,
        unit: 'genes',
      },
      {
        id: 'health-medicine-p07-q6',
        type: 'single_choice',
        question: 'When was the first successful gene therapy in humans performed?',
        options: ['January 1884', 'September 1990', 'April 2003', 'June 2012'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p07-q7',
        type: 'single_choice',
        question: 'Who developed CRISPR-Cas9 gene editing technology?',
        options: ['Watson and Crick', 'Mendel and Morgan', 'Doudna and Charpentier', 'Nirenberg and Matthaei'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q8',
        type: 'numeric',
        question: 'How much did the Human Genome Project cost (in billions of dollars)?',
        correctValue: 2.7,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'billion dollars',
      },
      {
        id: 'health-medicine-p07-q9',
        type: 'true_false',
        question: 'Adenine always pairs with guanine in DNA.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p07-q10',
        type: 'single_choice',
        question: 'In what year did Doudna and Charpentier publish their landmark CRISPR paper?',
        options: ['2003', '2008', '2012', '2020'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p07-q11',
        type: 'numeric',
        question: 'In what year did three scientists independently rediscover Mendel\'s principles?',
        correctValue: 1900,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'health-medicine-p08',
    topicId: 'health-medicine',
    title: 'Infectious Diseases: The Battle Against Pathogens',
    difficulty: 'advanced',
    wordCount: 2800,
    articleType: 'practice',
    orderIndex: 8,
    content: `Infectious diseases have shaped human history more dramatically than wars, famines, or natural disasters, killing billions of people and altering the course of civilizations. These illnesses result from pathogenic microorganisms including bacteria, viruses, fungi, and parasites that invade the body and disrupt normal functions. Understanding how these pathogens spread and cause disease has enabled medical interventions that have saved countless lives.

The germ theory of disease, developed in the nineteenth century, transformed medicine by establishing that specific microorganisms cause specific diseases. French chemist Louis Pasteur conducted pivotal experiments in the 1860s demonstrating that microorganisms caused fermentation and spoilage, then extended this work to show that germs could cause disease in animals and humans. German physician Robert Koch established rigorous criteria for proving that a particular microorganism causes a particular disease, publishing his famous postulates in 1890.

Koch's work on tuberculosis exemplified the power of the new approach to infectious disease. He identified Mycobacterium tuberculosis as the causative agent of tuberculosis in 1882, a discovery that earned him the Nobel Prize in Physiology or Medicine in 1905. Tuberculosis had killed approximately one-quarter of all adults in Europe during the nineteenth century, making Koch's identification of the bacterium a major public health milestone.

Bacteria are single-celled organisms that can survive and reproduce independently of host cells. Some bacteria cause disease by producing toxins, while others damage tissues directly through their growth and metabolism. Antibiotics work against bacterial infections by targeting features unique to bacterial cells, such as cell wall synthesis or protein production mechanisms that differ from those in human cells.

Viruses represent a fundamentally different type of pathogen that cannot reproduce outside of host cells. These tiny particles consist of genetic material surrounded by a protein coat and sometimes an outer membrane. Viruses hijack the cellular machinery of infected cells to produce copies of themselves, often killing the host cell in the process. Antibiotics have no effect on viral infections, making prevention through vaccination and antiviral medications the primary strategies against viral diseases.

The 1918 influenza pandemic demonstrated the devastating potential of viral diseases in the modern world. This outbreak infected approximately 500 million people, roughly one-third of the world's population at the time. Death estimates range from 50 to 100 million people, making it one of the deadliest events in human history. The virus spread rapidly through troop movements during World War I and overwhelmed medical systems that had no antibiotics or antiviral medications to offer.

HIV and AIDS emerged as a new infectious disease threat in the early 1980s, eventually killing over 40 million people worldwide. American researchers Robert Gallo and French scientists Luc Montagnier and Francoise Barre-Sinoussi identified the virus in 1983 and 1984. The development of antiretroviral therapy in the mid-1990s transformed HIV from a death sentence into a manageable chronic condition for those with access to treatment. Montagnier and Barre-Sinoussi received the Nobel Prize in Physiology or Medicine in 2008 for their discovery.

Parasitic diseases affect billions of people worldwide, primarily in tropical and subtropical regions. Malaria, caused by Plasmodium parasites transmitted through mosquito bites, kills approximately 600,000 people annually, mostly children under five years old in sub-Saharan Africa. Chinese scientist Tu Youyou discovered artemisinin as an effective antimalarial treatment by studying traditional Chinese medicine, earning the Nobel Prize in 2015 for this life-saving contribution.

Fungi cause infections ranging from minor skin conditions to life-threatening systemic diseases. Fungal infections have increased in recent decades as immunosuppressive treatments and medical devices create opportunities for opportunistic pathogens. Candida auris, first identified in Japan in 2009, has spread globally and resists multiple antifungal medications, representing an emerging threat that particularly affects hospitalized patients.

Transmission routes vary among different pathogens and determine appropriate prevention strategies. Respiratory pathogens spread through droplets or aerosols produced when infected individuals cough, sneeze, or breathe. Gastrointestinal pathogens spread through contaminated food or water. Blood-borne pathogens require direct contact with infected blood or body fluids. Vector-borne pathogens use insects or other animals to carry them between human hosts.

Epidemiology studies how diseases spread through populations and identifies factors that influence transmission. John Snow conducted pioneering epidemiological work during London's 1854 cholera outbreak, mapping cases and determining that contaminated water from the Broad Street pump was spreading the disease. His work predated germ theory but demonstrated the power of systematic investigation to identify disease sources and prevent further spread.

Vaccination remains the most effective tool for preventing infectious diseases. Smallpox eradication, certified by the World Health Organization on December 9, 1979, demonstrated that coordinated vaccination campaigns could eliminate a disease entirely. Polio has been reduced by over 99 percent since the Global Polio Eradication Initiative launched in 1988, with only scattered cases remaining in a few countries.

Public health measures beyond vaccination play crucial roles in controlling infectious diseases. Clean water and sanitation dramatically reduced waterborne disease transmission in developed countries during the twentieth century. Hand hygiene, promoted by Hungarian physician Ignaz Semmelweis in the 1840s, prevents transmission of many pathogens. Quarantine and isolation measures slow the spread of contagious diseases by separating infected or exposed individuals from the healthy population.

Antimicrobial resistance threatens to reverse progress against infectious diseases by making pathogens unresponsive to treatments that once worked effectively. The World Health Organization estimates that antimicrobial-resistant infections already cause approximately 1.27 million deaths annually worldwide. Overuse and misuse of antibiotics in medicine and agriculture accelerate resistance development, while the pharmaceutical industry has largely abandoned antibiotic research due to limited profit potential.

The COVID-19 pandemic that began in late 2019 demonstrated both the ongoing threat of emerging infectious diseases and the power of modern medical science to respond. The SARS-CoV-2 virus spread globally within months, infecting hundreds of millions of people and killing over 6 million by 2023. Scientists developed effective vaccines in under a year using new mRNA technology, a remarkable achievement that built on decades of prior research.

Climate change affects infectious disease patterns by altering the geographic ranges of disease-carrying insects and the conditions that allow pathogens to survive in the environment. Mosquitoes carrying dengue fever, Zika virus, and other diseases are expanding into previously temperate regions. Warming temperatures may release ancient pathogens preserved in permafrost as it thaws. These changes require ongoing surveillance and adaptation of public health strategies.

Global health security depends on international cooperation to detect and respond to disease outbreaks before they spread. The World Health Organization coordinates global surveillance and response efforts under the International Health Regulations adopted in 2005. However, political tensions, resource limitations, and varying national capacities challenge effective coordination. The COVID-19 pandemic revealed both the importance of global cooperation and the difficulties of achieving it in practice.

Research continues advancing our understanding of infectious diseases and developing new tools to combat them. Genomic sequencing allows rapid identification of pathogens and tracking of disease spread. Artificial intelligence assists in drug discovery and outbreak prediction. New vaccine platforms promise faster development of vaccines against emerging threats. These advances offer hope that humanity can continue winning battles against the microorganisms that have threatened us throughout history.`,
    questions: [
      {
        id: 'health-medicine-p08-q1',
        type: 'single_choice',
        question: 'Who developed the germ theory of disease through pivotal experiments in the 1860s?',
        options: ['Robert Koch', 'Louis Pasteur', 'John Snow', 'Ignaz Semmelweis'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q2',
        type: 'single_choice',
        question: 'When was Robert Koch\'s identification of the tuberculosis bacterium published?',
        options: ['1854', '1882', '1890', '1905'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p08-q3',
        type: 'multiple_select',
        question: 'Which types of pathogens cause infectious diseases? Select all that apply.',
        options: ['Bacteria', 'Viruses', 'Antibodies', 'Parasites'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p08-q4',
        type: 'true_false',
        question: 'Antibiotics are effective against viral infections.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p08-q5',
        type: 'numeric',
        question: 'Approximately how many people were infected during the 1918 influenza pandemic (in millions)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'million',
      },
      {
        id: 'health-medicine-p08-q6',
        type: 'single_choice',
        question: 'Who conducted pioneering epidemiological work during London\'s 1854 cholera outbreak?',
        options: ['Louis Pasteur', 'Robert Koch', 'John Snow', 'Tu Youyou'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q7',
        type: 'single_choice',
        question: 'When was smallpox eradication certified by the World Health Organization?',
        options: ['December 9, 1979', 'January 1, 1988', 'October 15, 1990', 'March 28, 2000'],
        correctIndex: 0,
      },
      {
        id: 'health-medicine-p08-q8',
        type: 'numeric',
        question: 'How many deaths does malaria cause annually (approximately)?',
        correctValue: 600000,
        tolerance: 100000,
        min: 300000,
        max: 1000000,
        step: 50000,
        unit: 'deaths',
      },
      {
        id: 'health-medicine-p08-q9',
        type: 'true_false',
        question: 'Tu Youyou discovered artemisinin by studying traditional Chinese medicine.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p08-q10',
        type: 'single_choice',
        question: 'When was Candida auris first identified?',
        options: ['1995 in the United States', '2002 in Europe', '2009 in Japan', '2015 in Brazil'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p08-q11',
        type: 'numeric',
        question: 'How many deaths annually are estimated to be caused by antimicrobial-resistant infections (in millions)?',
        correctValue: 1.27,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'million',
      },
    ],
  },
  {
    id: 'health-medicine-p09',
    topicId: 'health-medicine',
    title: 'The Nervous System: Understanding Our Neural Networks',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 9,
    content: `The nervous system coordinates all activities of the human body through an intricate network of specialized cells that transmit electrical and chemical signals at remarkable speeds. This system processes sensory information from the environment, controls muscle movements, regulates organ functions, and generates the conscious experience we call the mind. Understanding how neurons work has revolutionized medicine and deepened our appreciation for the complexity of human biology.

The nervous system consists of two main divisions that work together seamlessly. The central nervous system includes the brain and spinal cord, serving as the command center that processes information and generates responses. The peripheral nervous system comprises all the nerves extending throughout the body, carrying signals between the central nervous system and muscles, organs, and sensory receptors.

Neurons, the fundamental units of the nervous system, number approximately 86 billion in the human brain alone. Each neuron consists of a cell body containing the nucleus, dendrites that receive signals from other neurons, and an axon that transmits signals to target cells. Some axons extend over a meter in length, connecting the spinal cord to distant muscles in the feet.

Electrical signals travel along neurons through a process called action potential propagation. At rest, neurons maintain a negative electrical charge inside relative to outside the cell membrane. When stimulated sufficiently, voltage-gated ion channels open, allowing sodium ions to rush in and reversing the membrane potential. This depolarization travels along the axon like a wave, reaching speeds up to 120 meters per second in myelinated neurons.

Myelin, a fatty substance produced by glial cells, wraps around axons and dramatically increases signal transmission speed. In the central nervous system, oligodendrocytes produce myelin, while Schwann cells perform this function in the peripheral nervous system. Multiple sclerosis, a disease affecting approximately 2.8 million people worldwide, results from immune system attacks on myelin that disrupt nerve signal transmission.

Synapses are the junctions where neurons communicate with each other or with target cells like muscles. When an action potential reaches the end of an axon, it triggers the release of chemical messengers called neurotransmitters. These molecules cross the synaptic gap and bind to receptors on the receiving cell, either exciting it to fire or inhibiting its activity. The human brain contains an estimated 100 trillion synaptic connections.

Neurotransmitters include a diverse array of chemicals with different functions throughout the nervous system. Dopamine plays crucial roles in motivation, reward, and movement control, with its dysfunction contributing to Parkinson's disease and addiction. Serotonin regulates mood, sleep, and appetite, making it a target for many antidepressant medications. Acetylcholine controls muscle contraction and is involved in memory formation in the brain.

The brain displays remarkable organization with different regions specialized for different functions. The cerebral cortex, the wrinkled outer layer covering the cerebrum, contains the neural circuitry for conscious thought, sensory perception, language, and voluntary movement. The cerebellum coordinates balance and fine motor control through connections with other brain regions. The brainstem regulates vital functions like breathing, heart rate, and sleep-wake cycles.

Paul Broca identified a region in the left frontal lobe essential for speech production after studying patients with language deficits in 1861. Carl Wernicke discovered another region in the left temporal lobe important for language comprehension in 1874. These findings demonstrated that specific brain regions perform specific functions, a principle called localization that guides modern neuroscience.

The limbic system, a collection of structures deep within the brain, generates emotions and processes memories. The amygdala detects threats and triggers fear responses that prepare the body for danger. The hippocampus converts short-term memories into long-term storage, explaining why damage to this structure causes severe memory impairments. Patient H.M., whose hippocampus was surgically removed in 1953 to treat severe epilepsy, became unable to form new memories while retaining older ones.

Neuroplasticity describes the brain's ability to reorganize itself by forming new neural connections throughout life. This capacity allows recovery from injuries, learning of new skills, and adaptation to changing circumstances. Research by Michael Merzenich and colleagues in the 1980s demonstrated that adult brains retain far more plasticity than previously believed, opening new possibilities for rehabilitation after stroke and other injuries.

The autonomic nervous system controls involuntary functions like heart rate, digestion, and breathing without conscious effort. The sympathetic division activates during stress, increasing heart rate, dilating pupils, and diverting blood to muscles in preparation for action. The parasympathetic division dominates during rest, slowing the heart, stimulating digestion, and promoting relaxation. Balance between these divisions maintains homeostasis.

Sensory systems translate physical stimuli from the environment into neural signals the brain can interpret. The visual system processes light entering the eyes through a hierarchy of processing stages from retina to visual cortex. The auditory system converts sound waves into neural signals beginning in the cochlea of the inner ear. Touch, temperature, and pain receptors throughout the skin send signals through the spinal cord to the somatosensory cortex.

Motor systems coordinate the hundreds of muscles required for even simple movements. The primary motor cortex contains a map of the body, with different regions controlling different muscles. The basal ganglia help initiate and coordinate voluntary movements, with their dysfunction causing the tremors and rigidity of Parkinson's disease. Approximately 1 million Americans currently live with Parkinson's disease, a number expected to double by 2030.

Sleep involves dramatic changes in brain activity that serve essential functions still being understood. During REM sleep, the brain becomes highly active while muscles are temporarily paralyzed, a state associated with vivid dreaming. Slow-wave sleep appears important for memory consolidation and physical restoration. Sleep deprivation impairs cognitive function, immune response, and emotional regulation, demonstrating how crucial this state is for brain health.

Neurological diseases affect millions of people and pose growing challenges as populations age. Alzheimer's disease currently affects approximately 6.7 million Americans and causes progressive memory loss and cognitive decline through the accumulation of abnormal proteins in the brain. Stroke, caused by blocked or ruptured blood vessels in the brain, is a leading cause of long-term disability. Research into these conditions has intensified as their prevalence increases.

Modern neuroscience employs increasingly sophisticated tools to study the brain. Functional MRI measures brain activity by detecting changes in blood flow, revealing which regions activate during different tasks. Electroencephalography records electrical activity at the scalp surface, providing precise timing information about neural processes. Optogenetics, developed by Karl Deisseroth and colleagues in the early 2000s, allows researchers to control specific neurons using light, enabling unprecedented precision in studying brain circuits.

The nervous system represents one of nature's most remarkable achievements, enabling organisms to sense their environment, make decisions, and execute coordinated behaviors. Despite tremendous advances, many mysteries remain about how neural activity gives rise to consciousness, emotion, and thought. Continued research promises both deeper understanding of human nature and better treatments for the neurological conditions that affect so many lives.`,
    questions: [
      {
        id: 'health-medicine-p09-q1',
        type: 'single_choice',
        question: 'Approximately how many neurons are in the human brain?',
        options: ['1 billion', '10 billion', '86 billion', '200 billion'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q2',
        type: 'single_choice',
        question: 'Who identified a region in the left frontal lobe essential for speech production in 1861?',
        options: ['Carl Wernicke', 'Paul Broca', 'Michael Merzenich', 'Karl Deisseroth'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q3',
        type: 'multiple_select',
        question: 'Which neurotransmitters are mentioned in the article? Select all that apply.',
        options: ['Dopamine', 'Serotonin', 'Insulin', 'Acetylcholine'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-p09-q4',
        type: 'true_false',
        question: 'Multiple sclerosis results from immune system attacks on myelin.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p09-q5',
        type: 'numeric',
        question: 'Approximately how many people worldwide are affected by multiple sclerosis (in millions)?',
        correctValue: 2.8,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'million',
      },
      {
        id: 'health-medicine-p09-q6',
        type: 'single_choice',
        question: 'What is the function of the hippocampus?',
        options: ['Detecting threats and triggering fear', 'Converting short-term memories to long-term storage', 'Controlling muscle contraction', 'Regulating heart rate'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q7',
        type: 'single_choice',
        question: 'What does the sympathetic nervous system do during stress?',
        options: ['Slows heart rate and stimulates digestion', 'Increases heart rate and dilates pupils', 'Promotes sleep and relaxation', 'Reduces blood pressure'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q8',
        type: 'numeric',
        question: 'How many synaptic connections are estimated in the human brain (in trillions)?',
        correctValue: 100,
        tolerance: 10,
        min: 50,
        max: 200,
        step: 10,
        unit: 'trillion',
      },
      {
        id: 'health-medicine-p09-q9',
        type: 'true_false',
        question: 'Patient H.M. was able to form new memories after his hippocampus was removed.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-p09-q10',
        type: 'single_choice',
        question: 'What is optogenetics?',
        options: ['A brain imaging technique', 'A method to control specific neurons using light', 'A treatment for Parkinson\'s disease', 'A type of electroencephalography'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p09-q11',
        type: 'numeric',
        question: 'How many Americans currently live with Parkinson\'s disease (in millions)?',
        correctValue: 1,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'million',
      },
      {
        id: 'health-medicine-p09-q12',
        type: 'single_choice',
        question: 'At what maximum speed can signals travel in myelinated neurons (meters per second)?',
        options: ['10 meters per second', '50 meters per second', '120 meters per second', '300 meters per second'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p09-q13',
        type: 'numeric',
        question: 'How many Americans are currently affected by Alzheimer\'s disease (in millions)?',
        correctValue: 6.7,
        tolerance: 0.5,
        min: 4,
        max: 10,
        step: 0.1,
        unit: 'million',
      },
    ],
  },
  {
    id: 'health-medicine-p10',
    topicId: 'health-medicine',
    title: 'Medical Imaging: Seeing Inside the Human Body',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'practice',
    orderIndex: 10,
    content: `Medical imaging technologies have transformed diagnosis and treatment by allowing physicians to see inside the human body without surgery. These tools reveal anatomical structures, detect diseases, guide interventions, and monitor treatment responses with increasing precision and safety. The development of imaging represents one of medicine's greatest advances, earning multiple Nobel Prizes and saving countless lives.

Wilhelm Conrad Rontgen discovered X-rays on November 8, 1895, in Wurzburg, Germany, while experimenting with cathode ray tubes. He noticed that a fluorescent screen across the room glowed when his tube was activated, indicating that some invisible rays were passing through objects. Within weeks, Rontgen produced the first X-ray image of a human body part, his wife Anna's hand, clearly showing her bones and wedding ring. The discovery earned him the first Nobel Prize in Physics in 1901.

X-rays work by passing electromagnetic radiation through the body, with different tissues absorbing different amounts. Dense structures like bones absorb more X-rays and appear white on images, while soft tissues appear gray and air appears black. This contrast allows detection of fractures, tumors, pneumonia, and many other conditions. However, X-ray exposure carries small radiation risks that must be balanced against diagnostic benefits.

Computed tomography, or CT scanning, revolutionized imaging by producing detailed cross-sectional images of the body. British engineer Godfrey Hounsfield and South African physicist Allan Cormack independently developed the mathematical and engineering principles behind CT, sharing the Nobel Prize in Physiology or Medicine in 1979. The first clinical CT scanner was installed at Atkinson Morley Hospital in London in 1971, and the technology spread rapidly worldwide.

CT scanners rotate X-ray sources around the patient while detectors measure radiation passing through from multiple angles. Computers reconstruct these measurements into detailed images of body slices. Modern CT scanners can image the entire body in seconds, producing three-dimensional reconstructions that reveal anatomy in remarkable detail. CT now guides countless medical decisions, from cancer staging to trauma assessment to coronary artery evaluation.

Magnetic resonance imaging, or MRI, produces detailed images using powerful magnetic fields and radio waves rather than ionizing radiation. American physician Raymond Damadian demonstrated in 1971 that tumors and normal tissues have different magnetic properties that could be used for diagnosis. Paul Lauterbur and Peter Mansfield developed techniques to create spatial images from these signals, sharing the Nobel Prize in Physiology or Medicine in 2003.

MRI scanners place patients inside powerful magnets that align hydrogen atoms in body water. Radio pulses disturb this alignment, and the atoms emit signals as they return to their original state. Different tissues emit different signals based on their water content and chemical environment, creating contrast that reveals soft tissue details invisible to X-rays. MRI excels at imaging the brain, spinal cord, joints, and many other structures.

Ultrasound imaging uses high-frequency sound waves to visualize internal structures in real time without radiation exposure. A transducer sends sound pulses into the body and detects echoes returning from tissue boundaries. Ian Donald, a Scottish obstetrician, pioneered medical ultrasound in the 1950s and published the first clinical paper on obstetric ultrasound in 1958. Today, ultrasound is the standard method for monitoring pregnancy and is widely used for many other applications.

Echocardiography applies ultrasound technology specifically to the heart, revealing chamber sizes, valve function, blood flow patterns, and wall motion abnormalities. Cardiologists use echocardiography to diagnose heart valve disease, heart failure, congenital abnormalities, and many other conditions. The technique is safe, widely available, and can be performed at the bedside, making it essential for cardiac diagnosis.

Nuclear medicine imaging detects radiation emitted by radioactive tracers injected into patients. Positron emission tomography, or PET scanning, uses tracers that emit positrons, which produce gamma rays when they encounter electrons. PET reveals metabolic activity rather than anatomy, making it valuable for detecting cancer, evaluating brain function, and assessing heart viability. Combined PET-CT scanners merge metabolic and anatomical information in single examinations.

Molecular imaging represents the frontier of diagnostic visualization, revealing biological processes at the cellular and molecular level. Targeted tracers that bind to specific receptors or enzymes can identify disease processes before anatomical changes become visible. This approach enables earlier detection, more precise characterization of diseases, and monitoring of treatment responses at the molecular level.

Interventional radiology uses imaging guidance to perform minimally invasive procedures that once required open surgery. Fluoroscopy provides real-time X-ray images that guide catheter placement during angioplasty, stent insertion, and other vascular procedures. CT guidance allows precise needle placement for biopsies and tumor ablation. These techniques reduce recovery times, complications, and costs compared to traditional surgery.

Artificial intelligence is transforming medical imaging through machine learning algorithms that can detect abnormalities, quantify disease severity, and predict outcomes. Deep learning systems have matched or exceeded human radiologists in detecting some conditions, including certain cancers and fractures. AI tools can prioritize urgent cases, reduce interpretation times, and potentially improve consistency across different readers and institutions.

Radiation safety remains an important consideration as imaging volume continues growing. The average American now receives about 3 millisieverts of medical radiation exposure annually, roughly equal to natural background radiation. Dose optimization strategies aim to maintain image quality while minimizing radiation exposure. The ALARA principle, meaning as low as reasonably achievable, guides decisions about imaging utilization and technique selection.

Cost and access present ongoing challenges for advanced imaging technologies. A single MRI or CT scanner costs several million dollars, with substantial ongoing expenses for maintenance, supplies, and personnel. These costs contribute to healthcare spending and create disparities in access between wealthy and poor nations and communities. Efforts to develop lower-cost imaging alternatives for underserved regions continue worldwide.

The future of medical imaging promises continued innovation in resolution, speed, and specificity. Photon-counting CT detectors offer improved image quality at lower radiation doses. Ultra-high-field MRI magnets reveal brain structures at unprecedented detail. Hybrid imaging systems combine multiple technologies to provide complementary information in single examinations. These advances will further expand the ability of physicians to see inside the human body and understand what they find there.

Medical imaging exemplifies how physics and engineering can transform medicine when applied creatively to clinical problems. From Rontgen's accidental discovery to modern AI-enhanced interpretation, this field has continuously evolved to meet changing clinical needs. The ability to see inside the body without cutting it open remains one of medicine's most valuable capabilities, guiding diagnosis and treatment for patients worldwide.`,
    questions: [
      {
        id: 'health-medicine-p10-q1',
        type: 'single_choice',
        question: 'When did Wilhelm Rontgen discover X-rays?',
        options: ['October 15, 1890', 'November 8, 1895', 'January 1, 1901', 'March 12, 1910'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q2',
        type: 'single_choice',
        question: 'Who developed the CT scanner and won the Nobel Prize in 1979?',
        options: ['Wilhelm Rontgen and Ian Donald', 'Raymond Damadian and Peter Mansfield', 'Godfrey Hounsfield and Allan Cormack', 'Paul Lauterbur and Peter Mansfield'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q3',
        type: 'multiple_select',
        question: 'Which imaging technologies do NOT use ionizing radiation? Select all that apply.',
        options: ['MRI', 'CT scan', 'Ultrasound', 'X-ray'],
        correctIndices: [0, 2],
      },
      {
        id: 'health-medicine-p10-q4',
        type: 'true_false',
        question: 'MRI uses powerful magnetic fields and radio waves to create images.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q5',
        type: 'numeric',
        question: 'In what year was the first clinical CT scanner installed?',
        correctValue: 1971,
        tolerance: 0,
        min: 1960,
        max: 1980,
        step: 1,
        unit: 'year',
      },
      {
        id: 'health-medicine-p10-q6',
        type: 'single_choice',
        question: 'Who pioneered medical ultrasound in the 1950s?',
        options: ['Raymond Damadian', 'Ian Donald', 'Paul Lauterbur', 'Wilhelm Rontgen'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q7',
        type: 'single_choice',
        question: 'What does PET scanning reveal that is different from CT or MRI?',
        options: ['Bone density', 'Blood vessel anatomy', 'Metabolic activity', 'Tissue elasticity'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-p10-q8',
        type: 'numeric',
        question: 'What is the average annual medical radiation exposure for Americans (in millisieverts)?',
        correctValue: 3,
        tolerance: 0.5,
        min: 1,
        max: 5,
        step: 0.5,
        unit: 'millisieverts',
      },
      {
        id: 'health-medicine-p10-q9',
        type: 'true_false',
        question: 'Raymond Damadian demonstrated in 1971 that tumors and normal tissues have different magnetic properties.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q10',
        type: 'single_choice',
        question: 'What does ALARA stand for in radiation safety?',
        options: ['Always Lower All Radiation Applications', 'As Low As Reasonably Achievable', 'Applied Limits And Radiation Assessment', 'Appropriate Levels And Risk Analysis'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q11',
        type: 'single_choice',
        question: 'Who shared the Nobel Prize in 2003 for MRI development?',
        options: ['Godfrey Hounsfield and Allan Cormack', 'Paul Lauterbur and Peter Mansfield', 'Raymond Damadian and Ian Donald', 'Wilhelm Rontgen and Ian Donald'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-p10-q12',
        type: 'numeric',
        question: 'In what year did Ian Donald publish the first clinical paper on obstetric ultrasound?',
        correctValue: 1958,
        tolerance: 1,
        min: 1950,
        max: 1970,
        step: 1,
        unit: 'year',
      },
      {
        id: 'health-medicine-p10-q13',
        type: 'true_false',
        question: 'Deep learning systems have matched or exceeded human radiologists in detecting some conditions.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-p10-q14',
        type: 'single_choice',
        question: 'What is interventional radiology?',
        options: ['A type of radiation therapy', 'Using imaging guidance for minimally invasive procedures', 'A method for detecting cancer', 'An advanced MRI technique'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'health-medicine-c1',
    topicId: 'health-medicine',
    title: 'The Human Heart: Engine of Life',
    difficulty: 'intermediate',
    wordCount: 1000,
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    content: `The human heart beats approximately 100,000 times every day, pumping about 2,000 gallons of blood through 60,000 miles of blood vessels. This remarkable muscle works continuously from before birth until death, adapting to the body's changing demands without conscious control. Understanding how the heart functions helps us appreciate this vital organ and protect it from disease.

The heart is roughly the size of a clenched fist and weighs between 8 and 12 ounces in healthy adults. It sits slightly left of center in the chest, protected by the ribcage and breastbone. The heart consists of four chambers that work together in a precisely coordinated rhythm established by specialized electrical cells.

The two upper chambers, called atria, receive blood returning to the heart. The right atrium collects oxygen-depleted blood from the body through two large veins called the superior and inferior vena cava. The left atrium receives oxygen-rich blood returning from the lungs through four pulmonary veins. These chambers have relatively thin walls since they only need to push blood into the ventricles below.

The two lower chambers, called ventricles, do the heavy pumping work. The right ventricle pushes blood to the lungs where it picks up oxygen and releases carbon dioxide. The left ventricle pumps oxygen-rich blood to every organ and tissue in the body. The left ventricle has much thicker walls because it must generate enough pressure to send blood throughout the entire circulatory system.

Four valves ensure blood flows in only one direction through the heart. The tricuspid valve separates the right atrium from the right ventricle, while the mitral valve performs the same function on the left side. The pulmonary and aortic valves control blood leaving the heart. When these valves close, they create the familiar lub-dub sound we recognize as a heartbeat.

The heart's electrical system controls the timing of each beat with remarkable precision. The sinoatrial node, located in the right atrium, serves as the natural pacemaker. This cluster of specialized cells generates electrical impulses about 60 to 100 times per minute in a resting adult. These impulses spread through the atria, causing them to contract and push blood into the ventricles.

After a brief delay at the atrioventricular node, which allows the ventricles to fill completely, the electrical signal travels down specialized fibers called the bundle of His. These fibers divide into left and right branches that spread throughout the ventricle walls. This coordinated electrical activation causes the ventricles to contract powerfully and simultaneously, ejecting blood into the arteries.

William Harvey, an English physician, first described the circulation of blood in 1628 after years of careful observation and experimentation. His work contradicted centuries of medical belief established by Galen, who thought blood was continuously produced and consumed by the body. Harvey demonstrated that blood circulates in a closed loop, returning to the heart to be pumped again.

Coronary arteries supply the heart muscle itself with oxygen and nutrients. The left coronary artery divides into two main branches that supply the left side and front of the heart. The right coronary artery supplies the right ventricle and bottom of the heart. Blockages in these arteries cause heart attacks, which kill portions of heart muscle deprived of blood flow.

Heart disease remains the leading cause of death worldwide, claiming approximately 18 million lives each year according to the World Health Organization. Risk factors include high blood pressure, high cholesterol, smoking, diabetes, obesity, and physical inactivity. Many of these factors respond to lifestyle changes including diet modification and regular exercise.

Modern medicine has developed remarkable treatments for heart disease. Medications can control blood pressure, lower cholesterol, and prevent blood clots. Procedures like angioplasty open blocked arteries using tiny balloons and metal stents. Bypass surgery creates new routes for blood flow around blocked coronary arteries using vessels taken from other parts of the body.

The first successful human heart transplant was performed by Dr. Christiaan Barnard in Cape Town, South Africa on December 3, 1967. The patient, Louis Washkansky, received the heart of a young woman who had died in a car accident. Although Washkansky lived only 18 days, this groundbreaking surgery demonstrated that heart transplantation was possible and opened the door to modern transplant medicine.

Taking care of your heart requires attention to daily habits. Regular aerobic exercise strengthens the heart muscle and improves its efficiency. A diet rich in fruits, vegetables, whole grains, and lean proteins supports cardiovascular health. Avoiding tobacco, limiting alcohol, managing stress, and maintaining a healthy weight all reduce the risk of heart disease significantly.`,
    questions: [
      {
        id: 'health-medicine-c1-q1',
        type: 'single_choice',
        question: 'Which chamber of the heart has the thickest walls?',
        options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
        correctIndex: 3,
      },
      {
        id: 'health-medicine-c1-q2',
        type: 'multiple_select',
        question: 'Which are risk factors for heart disease mentioned in the article? Select all that apply.',
        options: ['High blood pressure', 'Low cholesterol', 'Smoking', 'Physical inactivity'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c1-q3',
        type: 'true_false',
        question: 'William Harvey discovered that blood is continuously produced and consumed by the body.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c1-q4',
        type: 'numeric',
        question: 'Approximately how many times does the human heart beat each day?',
        correctValue: 100000,
        tolerance: 10000,
        min: 50000,
        max: 200000,
        step: 10000,
        unit: 'beats',
      },
      {
        id: 'health-medicine-c1-q5',
        type: 'single_choice',
        question: 'Who performed the first successful human heart transplant?',
        options: ['William Harvey', 'Louis Pasteur', 'Christiaan Barnard', 'Jonas Salk'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c1-q6',
        type: 'single_choice',
        question: 'What serves as the heart\'s natural pacemaker?',
        options: ['The atrioventricular node', 'The sinoatrial node', 'The bundle of His', 'The mitral valve'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c1-q7',
        type: 'numeric',
        question: 'In what year did William Harvey first describe the circulation of blood?',
        correctValue: 1628,
        tolerance: 0,
        min: 1500,
        max: 1800,
        step: 1,
        unit: 'year',
      },
    ],
  },
  {
    id: 'health-medicine-c2',
    topicId: 'health-medicine',
    title: 'Cancer: Understanding and Fighting the Disease',
    difficulty: 'intermediate',
    wordCount: 2000,
    articleType: 'certification',
    orderIndex: 2,
    certificationLength: 'medium',
    content: `Cancer remains one of humanity's most formidable health challenges, affecting millions of lives worldwide each year. This collection of diseases occurs when cells grow uncontrollably and spread to surrounding tissues, disrupting normal body functions. Understanding cancer requires knowledge of cell biology, genetics, and the remarkable progress researchers have made in developing treatments over the past century.

The American Cancer Society estimates that approximately 1.9 million new cancer cases were diagnosed in the United States in 2023, with about 609,000 deaths from the disease. Cancer ranks as the second leading cause of death in most developed countries, trailing only heart disease. However, survival rates have improved dramatically over recent decades thanks to advances in detection, treatment, and prevention strategies.

Cancer develops through a multistep process that typically takes years or decades to complete. Normal cells grow, divide, and die according to tightly regulated genetic programs. Cancer begins when mutations accumulate in genes that control these processes. Oncogenes, when activated, drive excessive cell growth. Tumor suppressor genes, when inactivated, remove crucial brakes on cell division. Most cancers require mutations in multiple genes before they become malignant.

Environmental factors cause many of the mutations that lead to cancer. Tobacco smoke contains over 70 known carcinogens that damage DNA in lung, throat, and other tissues. The Surgeon General's 1964 report definitively linked smoking to lung cancer, eventually leading to public health campaigns that reduced smoking rates in many countries. Ultraviolet radiation from sunlight damages skin cell DNA, causing melanoma and other skin cancers. Industrial chemicals, certain viruses, and radiation exposure also increase cancer risk.

Hereditary factors account for approximately 5 to 10 percent of all cancers. BRCA1 and BRCA2 gene mutations dramatically increase risks of breast and ovarian cancer. Actress Angelina Jolie brought attention to these genes in May 2013 when she publicly discussed her preventive mastectomy after testing positive for BRCA1. Lynch syndrome causes inherited susceptibility to colorectal and several other cancers. Genetic testing can identify individuals at high risk who may benefit from increased surveillance or preventive interventions.

The immune system normally recognizes and destroys abnormal cells, but cancer cells evolve mechanisms to evade immune detection. They may display fewer identifying markers on their surfaces or release chemicals that suppress immune responses. Understanding these evasion strategies has led to revolutionary immunotherapy treatments that restore the immune system's ability to fight cancer.

Surgery remains the primary treatment for many solid tumors and can cure cancer when detected early before spreading to other locations. Ancient Egyptian physicians described surgical removal of tumors in the Edwin Smith Papyrus around 1600 BCE. Modern surgical techniques allow precise tumor removal while preserving surrounding healthy tissue. Surgeons may also remove nearby lymph nodes to check for cancer spread and prevent recurrence.

Radiation therapy uses high-energy beams to damage cancer cell DNA, preventing them from dividing. Wilhelm Rontgen discovered X-rays in November 1895, and physicians began using radiation to treat cancer within months. Modern radiation therapy can target tumors precisely while minimizing damage to surrounding tissues. Linear accelerators deliver radiation from multiple angles, concentrating the dose where beams intersect at the tumor.

Chemotherapy uses drugs that kill rapidly dividing cells throughout the body. The first chemotherapy agents emerged from World War II research on mustard gas, which was found to suppress bone marrow activity. Sidney Farber achieved the first remission of childhood leukemia using aminopterin in 1948 at Children's Hospital in Boston. Today dozens of chemotherapy drugs attack cancer cells through various mechanisms, though side effects remain significant because the drugs also affect normal rapidly dividing cells.

Targeted therapies attack specific molecular features of cancer cells while sparing normal cells. The drug imatinib, approved in May 2001, revolutionized treatment of chronic myeloid leukemia by blocking a specific abnormal protein that drives the disease. Nearly 90 percent of patients with this once-fatal leukemia now survive long-term with imatinib treatment. Researchers have since developed targeted drugs for many other cancers with specific molecular vulnerabilities.

Immunotherapy has emerged as the most exciting frontier in cancer treatment during recent years. Checkpoint inhibitors remove molecular brakes that cancer cells use to evade immune attack. James Allison at MD Anderson Cancer Center and Tasuku Honjo at Kyoto University independently discovered these checkpoint mechanisms in the 1990s. Their work earned them the Nobel Prize in Physiology or Medicine in 2018. Checkpoint inhibitors have produced lasting remissions in patients with advanced melanoma, lung cancer, and several other tumor types.

CAR-T cell therapy represents another immunotherapy breakthrough that engineers patients' own immune cells to fight cancer. Scientists remove T cells from a patient's blood and genetically modify them to recognize cancer cells. After multiplying these modified cells in the laboratory, doctors infuse them back into the patient. The FDA approved the first CAR-T therapy for childhood leukemia in August 2017 after clinical trials showed remarkable response rates in patients who had failed other treatments.

Cancer screening programs detect cancers earlier when they are more treatable. Mammography reduces breast cancer deaths by identifying tumors before they spread. Colonoscopy can prevent colorectal cancer by removing precancerous polyps. Pap smears have dramatically reduced cervical cancer deaths since their introduction by George Papanicolaou in the 1940s. HPV vaccination now prevents the infections that cause most cervical cancers.

Prevention remains the most effective strategy against many cancers. Not smoking prevents approximately 30 percent of all cancer deaths. Maintaining healthy weight through diet and exercise reduces risks of many cancer types. Limiting alcohol consumption, protecting skin from sun exposure, and avoiding known carcinogens all decrease cancer risk. Vaccination against hepatitis B and human papillomavirus prevents liver and cervical cancers respectively.

Cancer treatment increasingly involves personalized approaches based on each patient's specific tumor characteristics. Genetic sequencing can identify mutations that suggest which treatments will be most effective. Liquid biopsies detect cancer DNA in blood samples, allowing monitoring of treatment response without invasive procedures. Artificial intelligence helps pathologists analyze tissue samples and identify subtle patterns that predict outcomes.

The economic burden of cancer is staggering, with treatment costs exceeding 200 billion dollars annually in the United States alone. Many patients face financial hardship from treatment expenses, lost income, and related costs. Health policy debates continue about how to balance innovation incentives with affordable access to cancer drugs, some of which cost over 100,000 dollars per year.

Despite tremendous progress, cancer research still faces enormous challenges. Tumor heterogeneity means cancer cells within a single patient can have different mutations, allowing some to survive treatments that kill others. Metastatic cancer, which has spread to distant sites, remains largely incurable for most tumor types. Drug resistance develops when cancer cells evolve mechanisms to survive treatment.

The past decades have transformed cancer from a uniformly fatal diagnosis to a manageable chronic condition for many patients. Five-year survival rates for all cancers combined have increased from approximately 50 percent in the 1970s to over 68 percent today. Some cancers that were once death sentences now have cure rates exceeding 90 percent when caught early. Continued research and investment offer hope that future generations will see even greater progress against this ancient enemy.`,
    questions: [
      {
        id: 'health-medicine-c2-q1',
        type: 'single_choice',
        question: 'What percentage of cancers are caused by hereditary factors?',
        options: ['1 to 2 percent', '5 to 10 percent', '20 to 30 percent', '40 to 50 percent'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q2',
        type: 'single_choice',
        question: 'Who achieved the first remission of childhood leukemia using chemotherapy?',
        options: ['Wilhelm Rontgen', 'George Papanicolaou', 'Sidney Farber', 'James Allison'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q3',
        type: 'multiple_select',
        question: 'Which are environmental factors that can cause cancer? Select all that apply.',
        options: ['Tobacco smoke', 'Ultraviolet radiation', 'BRCA gene mutations', 'Certain viruses'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c2-q4',
        type: 'true_false',
        question: 'Checkpoint inhibitors work by directly killing cancer cells with radiation.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c2-q5',
        type: 'numeric',
        question: 'In what year was the Surgeon General\'s report linking smoking to lung cancer released?',
        correctValue: 1964,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'year',
      },
      {
        id: 'health-medicine-c2-q6',
        type: 'single_choice',
        question: 'What drug revolutionized treatment of chronic myeloid leukemia?',
        options: ['Aminopterin', 'Imatinib', 'Methotrexate', 'Cisplatin'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c2-q7',
        type: 'single_choice',
        question: 'What does CAR-T cell therapy do?',
        options: ['Uses radiation to kill cancer cells', 'Removes tumors surgically', 'Engineers patients\' immune cells to fight cancer', 'Blocks blood supply to tumors'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c2-q8',
        type: 'multiple_select',
        question: 'Who won the Nobel Prize in 2018 for discoveries leading to checkpoint inhibitor therapy? Select all that apply.',
        options: ['Sidney Farber', 'James Allison', 'George Papanicolaou', 'Tasuku Honjo'],
        correctIndices: [1, 3],
      },
      {
        id: 'health-medicine-c2-q9',
        type: 'numeric',
        question: 'Approximately what percentage of cancer deaths could be prevented by not smoking?',
        correctValue: 30,
        tolerance: 5,
        min: 10,
        max: 50,
        step: 5,
        unit: 'percent',
      },
      {
        id: 'health-medicine-c2-q10',
        type: 'true_false',
        question: 'The FDA approved the first CAR-T therapy in August 2017.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'health-medicine-c3',
    topicId: 'health-medicine',
    title: 'Mental Health: Understanding the Mind and Its Disorders',
    difficulty: 'advanced',
    wordCount: 3000,
    articleType: 'certification',
    orderIndex: 3,
    certificationLength: 'long',
    content: `Mental health conditions affect hundreds of millions of people worldwide, influencing thoughts, emotions, behaviors, and relationships in ways that can be profoundly disabling. These disorders result from complex interactions between biological, psychological, and social factors that scientists are only beginning to understand fully. Advances in neuroscience and psychology have transformed treatment, yet stigma and limited access to care remain significant barriers for many who need help.

The World Health Organization estimates that approximately one billion people worldwide currently live with a mental disorder. Depression affects over 280 million people globally and ranks among the leading causes of disability. Anxiety disorders affect approximately 301 million people, manifesting as excessive worry, panic attacks, and avoidance behaviors. These conditions cause immense suffering and substantial economic costs through lost productivity and healthcare expenses.

The history of mental health treatment includes many dark chapters that modern approaches have sought to correct. Before the development of effective medications, people with serious mental illness often faced confinement in asylums with minimal therapeutic benefit. Treatments including lobotomy, first performed by Portuguese neurologist Antonio Egas Moniz in 1935, caused irreversible brain damage while occasionally producing temporary symptom improvement. The deinstitutionalization movement of the 1960s and 1970s closed many psychiatric hospitals but often failed to provide adequate community-based alternatives.

The discovery of chlorpromazine in 1950 by French pharmaceutical company Rhone-Poulenc marked the beginning of modern psychiatric pharmacology. Henri Laborit, a French surgeon, first recognized its sedative and psychological effects, leading to trials in psychiatric patients. Jean Delay and Pierre Deniker at Sainte-Anne Hospital in Paris demonstrated its effectiveness for schizophrenia in 1952. This breakthrough showed that mental illness could be treated with medications, transforming the field's therapeutic possibilities.

Antidepressant medications emerged in the late 1950s through two parallel discoveries. Iproniazid, originally developed to treat tuberculosis, was found to improve mood in some patients in 1957. Imipramine, synthesized by Swiss pharmaceutical company Geigy, proved effective for depression after Roland Kuhn's clinical trials in 1958. These medications worked through different mechanisms, launching research into the neurochemical basis of depression that continues today.

The monoamine hypothesis proposed that depression results from deficiencies in neurotransmitters including serotonin, norepinephrine, and dopamine. This theory guided development of selective serotonin reuptake inhibitors, or SSRIs, which became available starting with fluoxetine in 1987. SSRIs offered improved safety compared to earlier antidepressants and became among the most widely prescribed medications worldwide. However, the monoamine hypothesis is now recognized as oversimplified, and many patients do not respond adequately to these medications.

Psychotherapy provides effective treatment for many mental health conditions either alone or combined with medication. Sigmund Freud developed psychoanalysis in Vienna during the late nineteenth century, emphasizing unconscious conflicts and early childhood experiences. While many of Freud's specific theories have been questioned, his recognition that psychological factors influence mental health fundamentally shaped the field.

Cognitive behavioral therapy, developed by Aaron Beck in the 1960s, focuses on identifying and changing negative thought patterns that contribute to emotional distress. Clinical trials have demonstrated CBT's effectiveness for depression, anxiety disorders, eating disorders, and many other conditions. The treatment typically requires 12 to 20 sessions and teaches skills that patients can continue applying independently. Beck developed the approach initially for depression after observing that his patients reported consistent patterns of negative automatic thoughts.

Anxiety disorders encompass several distinct conditions sharing excessive fear or worry as core features. Generalized anxiety disorder involves persistent worry about multiple life domains that is difficult to control. Panic disorder causes sudden episodes of intense fear with physical symptoms including rapid heartbeat, sweating, and difficulty breathing. Social anxiety disorder creates intense fear of social situations where one might be negatively evaluated by others. Specific phobias involve excessive fear of particular objects or situations like heights, spiders, or enclosed spaces.

Post-traumatic stress disorder develops in some people following exposure to severe trauma including combat, assault, accidents, or natural disasters. Symptoms include intrusive memories, nightmares, avoidance of trauma reminders, negative mood changes, and heightened arousal responses. The condition affects approximately 3.5 percent of Americans each year, with lifetime prevalence around 7 percent. Women are roughly twice as likely as men to develop PTSD following trauma exposure.

Schizophrenia affects approximately 24 million people worldwide and causes profound disruptions in thinking, perception, emotions, and behavior. Positive symptoms include hallucinations, delusions, and disorganized speech. Negative symptoms include reduced emotional expression, diminished motivation, and social withdrawal. The disorder typically emerges in late adolescence or early adulthood and often follows a chronic course requiring long-term management.

Bipolar disorder involves episodes of mania or hypomania alternating with depression. Manic episodes include elevated mood, decreased need for sleep, racing thoughts, and risky behavior. The condition affects approximately 40 million people worldwide. Kay Redfield Jamison, a psychologist at Johns Hopkins University who herself has bipolar disorder, has written influential works exploring the condition's relationship to creativity while documenting its devastating effects.

Eating disorders including anorexia nervosa, bulimia nervosa, and binge eating disorder involve serious disturbances in eating behavior and related thoughts and emotions. Anorexia nervosa has the highest mortality rate of any psychiatric disorder, with approximately 5 percent of those affected dying from medical complications or suicide. These conditions most commonly develop during adolescence and predominantly affect women, though men can also be affected.

Substance use disorders involve compulsive use of alcohol, drugs, or other substances despite harmful consequences. The opioid epidemic in the United States has killed over 500,000 people since 1999 through overdose deaths. Treatment approaches include medications such as methadone and buprenorphine for opioid addiction, along with behavioral therapies addressing underlying psychological factors. Twelve-step programs like Alcoholics Anonymous provide peer support that many find essential for recovery.

Suicide claims approximately 700,000 lives globally each year, making it a major public health concern. Men die by suicide at higher rates than women in most countries, though women attempt suicide more frequently. Risk factors include prior attempts, mental disorders, substance abuse, access to lethal means, and recent losses or crises. Prevention strategies include restricting access to means, promoting help-seeking behavior, and training healthcare providers to recognize warning signs.

Stigma remains a significant barrier to mental health treatment. People with mental illness often face discrimination in employment, housing, and social relationships. Fear of being labeled may prevent individuals from seeking help or disclosing their conditions to others. Anti-stigma campaigns emphasize that mental disorders are treatable medical conditions rather than personal failings or character defects.

Access to mental health services varies dramatically across regions and socioeconomic groups. In low-income countries, there may be only one psychiatrist per million people, compared to over 100 per million in high-income countries. Even in wealthy nations, many cannot afford treatment or face long waits for appointments. Telehealth expanded access during the COVID-19 pandemic and may permanently change how mental health services are delivered.

Research continues advancing understanding of mental health and developing new treatments. Brain imaging studies reveal structural and functional differences associated with various disorders. Genetic studies identify risk variants that influence vulnerability to mental illness. Psychedelic compounds including psilocybin and MDMA are being investigated as potential treatments for depression and PTSD after decades of research prohibition. Ketamine and esketamine have received approval for treatment-resistant depression, working through mechanisms different from traditional antidepressants.

Mental health is increasingly recognized as essential to overall wellbeing and functioning rather than a separate concern from physical health. The mind-body connection means that psychological factors influence physical health while physical conditions affect mental states. Integrated care models address both mental and physical health needs together. Promoting mental health throughout life, from early childhood through old age, benefits individuals and communities alike.`,
    questions: [
      {
        id: 'health-medicine-c3-q1',
        type: 'single_choice',
        question: 'How many people worldwide live with a mental disorder according to the WHO?',
        options: ['Approximately 100 million', 'Approximately 500 million', 'Approximately one billion', 'Approximately two billion'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q2',
        type: 'single_choice',
        question: 'Who performed the first lobotomy in 1935?',
        options: ['Henri Laborit', 'Aaron Beck', 'Antonio Egas Moniz', 'Roland Kuhn'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q3',
        type: 'multiple_select',
        question: 'Which neurotransmitters are involved in the monoamine hypothesis of depression? Select all that apply.',
        options: ['Serotonin', 'Norepinephrine', 'Acetylcholine', 'Dopamine'],
        correctIndices: [0, 1, 3],
      },
      {
        id: 'health-medicine-c3-q4',
        type: 'true_false',
        question: 'Cognitive behavioral therapy was developed by Sigmund Freud in Vienna.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q5',
        type: 'numeric',
        question: 'How many people globally does depression affect (in millions)?',
        correctValue: 280,
        tolerance: 30,
        min: 200,
        max: 400,
        step: 10,
        unit: 'million',
      },
      {
        id: 'health-medicine-c3-q6',
        type: 'single_choice',
        question: 'When was chlorpromazine demonstrated to be effective for schizophrenia?',
        options: ['1935', '1950', '1952', '1987'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q7',
        type: 'single_choice',
        question: 'Who developed cognitive behavioral therapy in the 1960s?',
        options: ['Sigmund Freud', 'Aaron Beck', 'Jean Delay', 'Kay Redfield Jamison'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q8',
        type: 'numeric',
        question: 'Approximately how many people worldwide are affected by schizophrenia (in millions)?',
        correctValue: 24,
        tolerance: 3,
        min: 10,
        max: 40,
        step: 1,
        unit: 'million',
      },
      {
        id: 'health-medicine-c3-q9',
        type: 'true_false',
        question: 'Anorexia nervosa has the highest mortality rate of any psychiatric disorder.',
        correctAnswer: true,
      },
      {
        id: 'health-medicine-c3-q10',
        type: 'single_choice',
        question: 'When did fluoxetine, the first SSRI, become available?',
        options: ['1958', '1972', '1987', '1995'],
        correctIndex: 2,
      },
      {
        id: 'health-medicine-c3-q11',
        type: 'multiple_select',
        question: 'Which are positive symptoms of schizophrenia? Select all that apply.',
        options: ['Hallucinations', 'Reduced emotional expression', 'Delusions', 'Disorganized speech'],
        correctIndices: [0, 2, 3],
      },
      {
        id: 'health-medicine-c3-q12',
        type: 'numeric',
        question: 'How many lives has the opioid epidemic in the United States claimed since 1999 (in thousands)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'thousand',
      },
      {
        id: 'health-medicine-c3-q13',
        type: 'single_choice',
        question: 'What is the approximate lifetime prevalence of PTSD in Americans?',
        options: ['About 3 percent', 'About 7 percent', 'About 15 percent', 'About 25 percent'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q14',
        type: 'numeric',
        question: 'Approximately how many lives are claimed by suicide globally each year (in thousands)?',
        correctValue: 700,
        tolerance: 50,
        min: 500,
        max: 1000,
        step: 50,
        unit: 'thousand',
      },
      {
        id: 'health-medicine-c3-q15',
        type: 'true_false',
        question: 'Women die by suicide at higher rates than men in most countries.',
        correctAnswer: false,
      },
      {
        id: 'health-medicine-c3-q16',
        type: 'single_choice',
        question: 'Which treatments are being investigated for depression and PTSD after decades of prohibition?',
        options: ['SSRIs and MAOIs', 'Psilocybin and MDMA', 'Imipramine and iproniazid', 'Chlorpromazine and haloperidol'],
        correctIndex: 1,
      },
      {
        id: 'health-medicine-c3-q17',
        type: 'numeric',
        question: 'How many sessions does CBT typically require?',
        correctValue: 16,
        tolerance: 4,
        min: 8,
        max: 30,
        step: 2,
        unit: 'sessions',
      },
    ],
  },
];
