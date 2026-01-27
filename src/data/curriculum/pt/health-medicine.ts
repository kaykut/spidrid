import { Article } from '../../../types/learning';

export const HEALTH_MEDICINE_ARTICLES: Article[] = [
  {
    id: 'health-medicine-p01',
    topicId: 'health-medicine',
    title: 'Como Funcionam as Vacinas',
    difficulty: 'beginner',
    wordCount: 536,
    articleType: 'practice',
    orderIndex: 1,
    content: `As vacinas treinam o seu sistema imunitário para reconhecer e combater patógenos específicos antes de causarem doenças graves. Contêm partes enfraquecidas ou inativas de um vírus ou bactéria, que não podem causar doença mas desencadeiam uma resposta imunitária protetora. O seu corpo produz anticorpos e células de memória que recordam o patógeno durante anos.

Quando recebe uma vacina, células especializadas chamadas células apresentadoras de antigénios detetam imediatamente o material estranho. Estas células processam os componentes da vacina e exibem fragmentos na sua superfície para outras células imunitárias examinarem. As células T auxiliares reconhecem estes fragmentos e ativam as células B, que produzem anticorpos específicos para esse patógeno.

O conceito de imunização remonta a 1796, quando Edward Jenner desenvolveu a primeira vacina contra a varíola em Inglaterra. Observou que as ordenhadoras que tinham contraído varíola bovina pareciam protegidas da doença mais mortal, a varíola humana. A sua experiência num rapaz de oito anos chamado James Phipps provou que a exposição à varíola bovina conferia imunidade.

Algumas células B tornam-se células plasmáticas que produzem grandes quantidades de anticorpos imediatamente após a vacinação. Outras tornam-se células B de memória que persistem no seu corpo durante anos ou até décadas. Quando o patógeno real aparece, estas células de memória reconhecem-no e multiplicam-se rapidamente para produzir anticorpos.

Diferentes vacinas utilizam diferentes abordagens para criar imunidade. As vacinas vivas atenuadas contêm formas enfraquecidas do patógeno que podem replicar-se mas não causar doença. As vacinas inativadas utilizam patógenos mortos que não podem replicar-se de todo. As vacinas de subunidades contêm apenas proteínas específicas da superfície do patógeno.

Mais recentemente, as vacinas de mRNA surgiram como uma poderosa nova tecnologia. Estas vacinas fornecem instruções genéticas que ensinam as suas células a produzir uma parte inofensiva do patógeno, desencadeando uma resposta imunitária. As primeiras vacinas de mRNA receberam aprovação em dezembro de 2020 durante a pandemia de COVID-19, após um desenvolvimento notavelmente rápido.

As vacinas erradicaram completamente a varíola e quase eliminaram a poliomielite de todo o mundo. Reduziram drasticamente as mortes por sarampo, difteria, tétano e muitas outras doenças que outrora matavam milhões de pessoas todos os anos. A Organização Mundial de Saúde estima que as vacinas previnem 4 a 5 milhões de mortes anualmente em todo o mundo.

A investigação moderna sobre vacinas continua a avançar com novas plataformas e métodos de administração. Cientistas de instituições como a Universidade de Oxford e os Institutos Nacionais de Saúde trabalham para desenvolver vacinas contra doenças que ainda carecem de tratamentos preventivos. As vacinas continuam a ser uma das intervenções de saúde pública mais rentáveis alguma vez desenvolvidas.`,
    questions: [
      {
        id: 'health-medicine-p01-q1',
        type: 'single_choice',
        question: 'Quem desenvolveu a primeira vacina contra a varíola?',
        options: [
          'Louis Pasteur',
          'Edward Jenner',
          'Alexander Fleming',
          'Jonas Salk'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p01-q2',
        type: 'multiple_select',
        question: 'Que tipos de vacinas são mencionados no artigo? Selecione todas as opções aplicáveis.',
        options: [
          'Vacinas vivas atenuadas',
          'Vacinas de mRNA',
          'Vacinas de DNA',
          'Vacinas inativadas'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p01-q3',
        type: 'true_false',
        question: 'As células B de memória podem persistir no seu corpo durante anos ou até décadas.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p01-q4',
        type: 'numeric',
        question: 'Em que ano Edward Jenner desenvolveu a primeira vacina?',
        correctValue: 1796,
        tolerance: 0,
        min: 1700,
        max: 1900,
        step: 1,
        unit: 'year'
      }
    ]
  },
  {
    id: 'health-medicine-p02',
    topicId: 'health-medicine',
    title: 'O Cérebro Humano: Centro de Comando do Corpo',
    difficulty: 'beginner',
    wordCount: 795,
    articleType: 'practice',
    orderIndex: 2,
    content: `O cérebro humano pesa aproximadamente três libras e contém cerca de 86 mil milhões de neurónios ligados por triliões de sinapses. Este órgão notável controla cada pensamento, movimento, sensação e emoção que experiencia. Compreender como o cérebro funciona tornou-se uma das fronteiras mais importantes da medicina.

O cérebro consiste em três regiões principais que trabalham juntas de forma perfeita. O cérebro, a parte maior, processa o pensamento consciente, a aprendizagem, a memória e o movimento voluntário. O cerebelo, na parte posterior do crânio, coordena o equilíbrio, a postura e o controlo motor fino. O tronco cerebral liga o cérebro à medula espinhal e regula funções vitais como a respiração, o ritmo cardíaco e o sono.

O cérebro está dividido em dois hemisférios ligados por um espesso feixe de fibras nervosas chamado corpo caloso. Cada hemisfério controla o lado oposto do corpo, pelo que o hemisfério esquerdo controla a mão direita e vice-versa. Embora ambos os hemisférios partilhem a maioria das funções, o lado esquerdo tende a dominar o processamento da linguagem na maioria das pessoas destras.

O córtex cerebral, a camada exterior enrugada do cérebro, tem apenas cerca de 3 milímetros de espessura, mas contém a maioria dos nossos neurónios. As suas dobras aumentam drasticamente a área de superfície, permitindo que mais poder de processamento caiba dentro do crânio. Diferentes regiões do córtex especializam-se em diferentes funções, desde o processamento de informação visual até ao planeamento de ações complexas.

Os neurónios comunicam através de impulsos elétricos e sinais químicos chamados neurotransmissores. Quando um neurónio dispara, liberta neurotransmissores através de pequenos espaços chamados sinapses para neurónios vizinhos. Este processo ocorre milhares de milhões de vezes por segundo em todo o seu cérebro, criando os padrões de atividade que produzem pensamentos e comportamentos.

Santiago Ramón y Cajal, um cientista espanhol, fez descobertas pioneiras sobre a estrutura dos neurónios no final dos anos 1800. Desenvolveu técnicas de coloração que revelaram neurónios individuais pela primeira vez, provando que o sistema nervoso consistia em células discretas em vez de uma rede contínua. O seu trabalho valeu-lhe o Prémio Nobel de Fisiologia ou Medicina em 1906.

O cérebro consome cerca de 20 por cento da energia do seu corpo, apesar de compreender apenas 2 por cento do peso corporal. Os neurónios requerem fornecimentos constantes de oxigénio e glucose para funcionar corretamente. Mesmo breves interrupções no fluxo sanguíneo podem causar danos permanentes, razão pela qual os AVCs são emergências médicas que requerem tratamento imediato.

A neuroplasticidade refere-se à capacidade do cérebro de se reorganizar formando novas ligações neurais ao longo da vida. Esta capacidade notável permite que as pessoas aprendam novas competências, recuperem de lesões e se adaptem a circunstâncias em mudança. Investigação de Michael Merzenich e outros cientistas nos anos 1980 demonstrou que os cérebros adultos permanecem muito mais mutáveis do que se pensava anteriormente.

O sono desempenha um papel crucial na saúde cerebral e função cognitiva. Durante o sono, o cérebro consolida memórias, remove produtos de resíduos metabólicos e repara danos celulares. Os adultos precisam de sete a nove horas de sono por noite para uma função cerebral ótima. A privação crónica de sono prejudica a atenção, a tomada de decisões e a regulação emocional.

As tecnologias de imagem modernas revolucionaram a nossa compreensão do cérebro. A ressonância magnética funcional, desenvolvida no início dos anos 1990, permite aos cientistas observar a atividade cerebral em tempo real detetando alterações no fluxo sanguíneo. Esta tecnologia revelou que regiões cerebrais se ativam durante diferentes tarefas, desde reconhecer rostos até experienciar emoções.

Investigadores de instituições como os Institutos Nacionais de Saúde continuam a avançar o nosso conhecimento sobre distúrbios cerebrais. Condições como a doença de Alzheimer, a doença de Parkinson e a depressão afetam milhões de pessoas em todo o mundo. Compreender a base neural destas condições é essencial para desenvolver tratamentos eficazes que possam melhorar inúmeras vidas.`,
    questions: [
      {
        id: 'health-medicine-p02-q1',
        type: 'single_choice',
        question: 'Que parte do cérebro coordena o equilíbrio e o controlo motor fino?',
        options: [
          'Cérebro',
          'Cerebelo',
          'Tronco cerebral',
          'Corpo caloso'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p02-q2',
        type: 'single_choice',
        question: 'Quem descobriu que o sistema nervoso consiste em células discretas?',
        options: [
          'Michael Merzenich',
          'Santiago Ramón y Cajal',
          'Louis Pasteur',
          'William Harvey'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p02-q3',
        type: 'multiple_select',
        question: 'O que acontece durante o sono? Selecione todas as opções aplicáveis.',
        options: [
          'Consolidação de memória',
          'Remoção de resíduos metabólicos',
          'Criação de novos neurónios',
          'Reparação de danos celulares'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p02-q4',
        type: 'true_false',
        question: 'O cérebro consome cerca de 20 por cento da energia do corpo.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p02-q5',
        type: 'numeric',
        question: 'Aproximadamente quantos neurónios contém o cérebro humano (em milhares de milhões)?',
        correctValue: 86,
        tolerance: 10,
        min: 50,
        max: 150,
        step: 5,
        unit: 'billion neurons'
      }
    ]
  },
  {
    id: 'health-medicine-p03',
    topicId: 'health-medicine',
    title: 'O Sistema Imunitário: A Força de Defesa do Seu Corpo',
    difficulty: 'beginner',
    wordCount: 1067,
    articleType: 'practice',
    orderIndex: 3,
    content: `O sistema imunitário humano é uma rede complexa de células, tecidos e órgãos que protege o corpo de invasores prejudiciais. Todos os dias, o seu sistema imunitário identifica e destrói milhões de bactérias, vírus, fungos e parasitas que poderiam causar doenças. Este notável sistema de defesa evoluiu ao longo de milhões de anos para o manter saudável.

O sistema imunitário opera através de dois ramos principais que trabalham juntos para fornecer proteção. O sistema imunitário inato fornece defesa imediata e não específica contra patógenos. O sistema imunitário adaptativo desenvolve respostas direcionadas a ameaças específicas e recorda-as para encontros futuros. Ambos os sistemas devem funcionar corretamente para manter a saúde.

As barreiras físicas formam a primeira linha de defesa contra infeções. A pele cria uma parede quase impenetrável que a maioria dos patógenos não consegue atravessar. As membranas mucosas no nariz, garganta e pulmões retêm partículas estranhas antes que possam entrar no corpo. O ácido gástrico mata muitas bactérias em alimentos contaminados antes que possam causar danos.

Quando os patógenos ultrapassam estas barreiras, o sistema imunitário inato responde em minutos. Glóbulos brancos chamados neutrófilos correm para o local da infeção e englobam invasores através de um processo chamado fagocitose. Os macrófagos, células maiores que patrulham tecidos por todo o corpo, também consomem patógenos e sinalizam outras células imunitárias para se juntarem à luta.

A inflamação é uma parte crucial da resposta imunitária inata que ajuda a conter e eliminar infeções. Os vasos sanguíneos dilatam, permitindo que mais células imunitárias cheguem à área afetada. Os sinais familiares de inflamação incluem vermelhidão, calor, inchaço e dor. Embora desconfortáveis, estes sintomas indicam que o seu sistema imunitário está a funcionar corretamente.

O sistema imunitário adaptativo demora mais tempo a ativar, mas fornece respostas altamente específicas e poderosas. As células T e as células B são os principais soldados da imunidade adaptativa, cada uma com papéis distintos no combate à infeção. Estas células podem reconhecer patógenos específicos e desenvolver estratégias direcionadas para os eliminar.

As células B produzem anticorpos, proteínas especializadas que se ligam a patógenos específicos e os marcam para destruição. Cada célula B produz anticorpos que reconhecem apenas um tipo de molécula estranha chamada antigénio. Quando ativadas, as células B multiplicam-se rapidamente e produzem milhões de anticorpos que circulam por toda a corrente sanguínea.

As células T vêm em várias variedades com diferentes funções. As células T auxiliares coordenam respostas imunitárias libertando sinais químicos chamados citocinas que ativam outras células imunitárias. As células T citotóxicas matam diretamente células infetadas libertando proteínas tóxicas que perfuram membranas celulares. As células T reguladoras ajudam a prevenir que o sistema imunitário ataque tecidos saudáveis.

Paul Ehrlich, um cientista alemão, propôs o conceito de anticorpos em 1897 e desenvolveu o primeiro tratamento eficaz para a sífilis. O seu trabalho em imunologia valeu-lhe o Prémio Nobel de Fisiologia ou Medicina em 1908, que partilhou com Ilya Metchnikoff, que descobriu a fagocitose. As suas descobertas estabeleceram os fundamentos da imunologia moderna.

A memória imunológica permite ao sistema imunitário adaptativo responder mais rapidamente e eficazmente a patógenos previamente encontrados. As células B de memória e as células T de memória persistem no corpo durante anos ou décadas após uma infeção. Quando o mesmo patógeno aparece novamente, estas células ativam-se rapidamente e muitas vezes previnem a doença totalmente.

As doenças autoimunes ocorrem quando o sistema imunitário ataca erroneamente tecidos saudáveis. Condições como a artrite reumatoide, a diabetes tipo 1 e a esclerose múltipla afetam milhões de pessoas em todo o mundo. Estas doenças resultam frequentemente de uma combinação de suscetibilidade genética e fatores ambientais desencadeantes que causam disfunção imunitária.

As alergias representam outra forma de mau funcionamento do sistema imunitário na qual o corpo reage excessivamente a substâncias inofensivas como pólen, pelos de animais ou certos alimentos. Durante uma reação alérgica, as células imunitárias libertam histamina e outros químicos que causam sintomas que variam de espirros a anafilaxia potencialmente fatal.

O sistema imunitário muda ao longo da vida em resposta à idade e experiência. Os recém-nascidos recebem proteção temporária de anticorpos maternos passados através da placenta e leite materno. O sistema imunitário fortalece-se durante a infância à medida que as crianças encontram e desenvolvem imunidade a patógenos comuns. Em adultos idosos, a função imunitária declina gradualmente, aumentando a suscetibilidade a infeções.

Os fatores de estilo de vida influenciam significativamente a função imunitária. Sono adequado, exercício regular e nutrição adequada apoiam a saúde imunitária. O stress crónico liberta cortisol e outras hormonas que suprimem respostas imunitárias ao longo do tempo. Evitar álcool excessivo e tabaco ajuda a manter as defesas imunitárias em níveis ótimos.

A medicina moderna continua a desenvolver formas de aproveitar o sistema imunitário para tratar doenças. A imunoterapia revolucionou o tratamento do cancro ao treinar células imunitárias para reconhecer e destruir tumores. O Prémio Nobel de Fisiologia ou Medicina de 2018 reconheceu James Allison e Tasuku Honjo pelo trabalho pioneiro em imunoterapia oncológica que salvou milhares de vidas.`,
    questions: [
      {
        id: 'health-medicine-p03-q1',
        type: 'single_choice',
        question: 'Que células produzem anticorpos?',
        options: [
          'Células T',
          'Células B',
          'Neutrófilos',
          'Macrófagos'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p03-q2',
        type: 'single_choice',
        question: 'Quem propôs o conceito de anticorpos em 1897?',
        options: [
          'Ilya Metchnikoff',
          'Paul Ehrlich',
          'James Allison',
          'Tasuku Honjo'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p03-q3',
        type: 'single_choice',
        question: 'O que é fagocitose?',
        options: [
          'A produção de anticorpos',
          'A libertação de histamina',
          'O processo de englobar e destruir patógenos',
          'A formação de células de memória'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p03-q4',
        type: 'multiple_select',
        question: 'Quais são sinais de inflamação? Selecione todas as opções aplicáveis.',
        options: [
          'Vermelhidão',
          'Frieza',
          'Inchaço',
          'Dor'
        ],
        correctIndices: [
          0,
          2,
          3
        ]
      },
      {
        id: 'health-medicine-p03-q5',
        type: 'true_false',
        question: 'O sistema imunitário inato desenvolve respostas direcionadas a patógenos específicos.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-p03-q6',
        type: 'numeric',
        question: 'Em que ano Paul Ehrlich ganhou o Prémio Nobel pelo seu trabalho em imunologia?',
        correctValue: 1908,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'year'
      }
    ]
  },
  {
    id: 'health-medicine-p04',
    topicId: 'health-medicine',
    title: 'Antibióticos: A Guerra Contra as Bactérias',
    difficulty: 'intermediate',
    wordCount: 1392,
    articleType: 'practice',
    orderIndex: 4,
    content: `Os antibióticos salvaram mais vidas do que qualquer outra classe de medicamentos na história da medicina. Estes medicamentos notáveis matam bactérias ou impedem-nas de se reproduzir, permitindo que o sistema imunitário do corpo elimine infeções. Desde a sua descoberta no início do século XX, os antibióticos transformaram a medicina e prolongaram dramaticamente a esperança de vida humana.

Alexander Fleming descobriu o primeiro antibiótico por acidente a 28 de setembro de 1928, no Hospital St. Mary em Londres. Fleming notou que um bolor chamado Penicillium notatum tinha contaminado uma das suas culturas bacterianas e matado as bactérias circundantes. Em vez de descartar a placa contaminada, investigou mais e identificou a substância antibacteriana, à qual chamou penicilina. Fleming publicou as suas descobertas em 1929, mas não tinha recursos para desenvolver a penicilina num medicamento utilizável.

Howard Florey e Ernst Boris Chain na Universidade de Oxford transformaram a penicilina de uma curiosidade laboratorial num medicamento prático durante o início dos anos 1940. Desenvolveram métodos para purificar e produzir em massa o medicamento, conduzindo os primeiros ensaios humanos bem-sucedidos em fevereiro de 1941. A procura em tempo de guerra acelerou dramaticamente a produção, e no Dia D em junho de 1944, existia penicilina suficiente para tratar todos os soldados aliados feridos. Fleming, Florey e Chain partilharam o Prémio Nobel de Fisiologia ou Medicina em 1945.

Os antibióticos funcionam através de vários mecanismos diferentes para atacar células bacterianas poupando células humanas. A penicilina e medicamentos relacionados interferem com a construção da parede celular, fazendo com que as bactérias rebentem sob a sua própria pressão interna. As tetraciclinas e aminoglicosídeos bloqueiam os ribossomas bacterianos de produzir proteínas. As fluoroquinolonas impedem as bactérias de copiar o seu DNA. Estas diferentes estratégias de ataque explicam por que certos antibióticos funcionam melhor contra infeções particulares.

A descoberta de novas classes de antibióticos prosseguiu rapidamente durante o que os cientistas chamam a era dourada da descoberta de antibióticos de 1940 a 1962. A estreptomicina, descoberta por Selman Waksman na Universidade Rutgers em 1943, tornou-se o primeiro tratamento eficaz para a tuberculose. Os cientistas encontraram a tetraciclina em 1948, a eritromicina em 1952 e a vancomicina em 1958. Cada nova classe expandiu a gama de infeções que os médicos podiam tratar com sucesso.

A resistência aos antibióticos surgiu quase imediatamente como consequência da evolução bacteriana e seleção natural. As bactérias reproduzem-se rapidamente, às vezes duplicando a sua população a cada vinte minutos em condições favoráveis. Mutações aleatórias produzem ocasionalmente resistência aos antibióticos, e estas bactérias resistentes sobrevivem enquanto outras morrem. Poucos anos após a introdução da penicilina, apareceram bactérias Staphylococcus resistentes em hospitais em todo o mundo.

O uso excessivo e indevido de antibióticos acelerou dramaticamente a resistência nas últimas décadas. Os médicos às vezes prescrevem antibióticos para infeções virais como constipações e gripes, onde não fornecem benefício. As operações agrícolas alimentam antibióticos ao gado para promover o crescimento, expondo enormes populações bacterianas a pressão seletiva. Os pacientes que param de tomar antibióticos cedo deixam bactérias resistentes vivas para se multiplicar e espalhar.

O Staphylococcus aureus resistente à meticilina, conhecido como MRSA, demonstra o perigo da resistência aos antibióticos. Este supermicróbio surgiu em hospitais britânicos em 1961, apenas dois anos após a introdução da meticilina. O MRSA causa agora aproximadamente 120.000 infeções e 20.000 mortes anualmente apenas nos Estados Unidos. Algumas estirpes desenvolveram resistência a quase todos os antibióticos disponíveis, deixando os médicos com poucas opções de tratamento.

A Organização Mundial de Saúde declarou a resistência aos antibióticos uma das maiores ameaças à saúde global em 2014. Sem antibióticos eficazes, cirurgias de rotina tornam-se perigosas, a quimioterapia do cancro torna-se mais arriscada e infeções menores tornam-se mortais. A OMS estima que as infeções resistentes a medicamentos já causam 700.000 mortes anualmente em todo o mundo e poderiam causar 10 milhões de mortes por ano até 2050 se as tendências atuais continuarem.

As empresas farmacêuticas abandonaram em grande parte a investigação de antibióticos porque desenvolver novos medicamentos custa milhares de milhões de dólares enquanto as bactérias desenvolvem resistência em anos. Apenas duas novas classes de antibióticos chegaram ao mercado desde 1962. Incentivos governamentais e iniciativas sem fins lucrativos trabalham agora para encorajar o desenvolvimento de antibióticos, mas o pipeline de novos medicamentos permanece perigosamente escasso.

Preservar a eficácia dos antibióticos requer ação de médicos, pacientes, agricultores e governos em todo o mundo. Os médicos devem prescrever antibióticos apenas quando necessário e escolher medicamentos de espetro estreito quando possível. Os pacientes devem completar o seu curso completo de tratamento mesmo após se sentirem melhor. As reformas agrícolas podem reduzir o uso de antibióticos no gado mantendo a produção alimentar. A cooperação internacional é essencial porque as bactérias resistentes atravessam fronteiras livremente.

Novas abordagens para combater infeções bacterianas oferecem esperança para o futuro. Os bacteriófagos são vírus que naturalmente infetam e matam bactérias, oferecendo uma alternativa aos antibióticos químicos. Os cientistas estão a desenvolver vacinas contra bactérias atualmente tratadas com antibióticos. Os investigadores exploram compostos que desativam defesas bacterianas sem matar as bactérias, reduzindo a pressão seletiva para resistência. Estas inovações podem eventualmente complementar ou substituir os antibióticos tradicionais.

A história dos antibióticos ensina lições importantes sobre a competição contínua entre a medicina humana e a evolução microbiana. Cada nova arma que desenvolvemos eventualmente perde eficácia à medida que as bactérias se adaptam. Manter a nossa vantagem requer investigação contínua, uso responsável de medicamentos existentes e reconhecimento de que esta batalha nunca terminará.`,
    questions: [
      {
        id: 'health-medicine-p04-q1',
        type: 'single_choice',
        question: 'Quem descobriu a penicilina em 1928?',
        options: [
          'Howard Florey',
          'Ernst Boris Chain',
          'Alexander Fleming',
          'Selman Waksman'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p04-q2',
        type: 'single_choice',
        question: 'O que significa MRSA?',
        options: [
          'Staphylococcus aureus múltiplo-resistente',
          'Staphylococcus aureus resistente à meticilina',
          'Streptococcus aureus multirresistente a medicamentos',
          'Streptococcus aureus resistente à meticilina'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p04-q3',
        type: 'multiple_select',
        question: 'Que mecanismos os antibióticos utilizam para atacar bactérias? Selecione todas as opções aplicáveis.',
        options: [
          'Interferir com a construção da parede celular',
          'Bloquear ribossomas de produzir proteínas',
          'Atacar células humanas',
          'Prevenir a replicação de DNA'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p04-q4',
        type: 'true_false',
        question: 'A era dourada da descoberta de antibióticos durou de 1940 a 1962.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p04-q5',
        type: 'numeric',
        question: 'Aproximadamente quantas mortes o MRSA causa anualmente nos Estados Unidos?',
        correctValue: 20000,
        tolerance: 2000,
        min: 5000,
        max: 50000,
        step: 1000,
        unit: 'deaths'
      },
      {
        id: 'health-medicine-p04-q6',
        type: 'single_choice',
        question: 'Quem desenvolveu métodos para produzir em massa a penicilina na Universidade de Oxford?',
        options: [
          'Alexander Fleming e Selman Waksman',
          'Howard Florey e Ernst Boris Chain',
          'Robert Koch e Louis Pasteur',
          'Edward Jenner e Jonas Salk'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'health-medicine-p05',
    topicId: 'health-medicine',
    title: 'Sono: A Ciência do Descanso e Recuperação',
    difficulty: 'intermediate',
    wordCount: 1817,
    articleType: 'practice',
    orderIndex: 5,
    content: `O sono continua a ser um dos aspetos mais essenciais mas mal compreendidos da biologia humana. Cada pessoa passa aproximadamente um terço da sua vida a dormir, no entanto os cientistas só começaram a desvendar os mistérios do sono no século XX. A investigação moderna revela que o sono desempenha funções cruciais para a saúde física, desempenho mental e bem-estar emocional que não podem ser substituídas por qualquer quantidade de descanso acordado.

A descoberta do sono REM em 1953 por Eugene Aserinsky e Nathaniel Kleitman na Universidade de Chicago revolucionou a ciência do sono. Observaram que os olhos dos sujeitos adormecidos se moviam rapidamente sob pálpebras fechadas durante certos períodos, e a atividade cerebral durante estas fases assemelhava-se à atividade de vigília. O sono REM, como o denominaram, revelou-se o momento em que ocorrem os sonhos mais vívidos. Esta descoberta transformou o sono de um estado passivo num processo ativo digno de investigação científica.

O sono ocorre em ciclos que duram aproximadamente noventa minutos cada, com a maioria dos adultos a completar quatro a seis ciclos por noite. Cada ciclo contém fases distintas que desempenham funções diferentes. O sono não-REM começa com sono leve durante o qual a atividade muscular diminui e a temperatura corporal baixa. Seguem-se fases não-REM mais profundas, durante as quais o corpo repara tecidos, fortalece o sistema imunitário e liberta hormona de crescimento.

O sono REM aumenta em duração à medida que a noite avança, com os períodos REM mais longos a ocorrerem perto da manhã. Durante o sono REM, o cérebro torna-se altamente ativo enquanto os músculos voluntários ficam temporariamente paralisados. Esta paralisia impede as pessoas de representar os seus sonhos, embora a perturbação comportamental do sono REM possa perturbar este mecanismo com resultados potencialmente perigosos. A maior parte do sono REM ocorre durante o terço final da noite.

O sistema glinfático do cérebro, descoberto por Maiken Nedergaard na Universidade de Rochester em 2012, revelou uma função crucial do sono. Este sistema de remoção de resíduos remove proteínas tóxicas do tecido cerebral, incluindo beta-amilóide associada à doença de Alzheimer. O sistema glinfático opera principalmente durante o sono não-REM profundo, quando as células cerebrais encolhem aproximadamente 60 por cento, permitindo que o líquido cefalorraquidiano circule entre neurónios.

A consolidação de memória representa outra função vital do sono que os investigadores documentaram extensivamente. Durante o sono, o cérebro reproduz e fortalece ligações neurais formadas durante experiências de aprendizagem em vigília. Estudos de Robert Stickgold na Escola Médica de Harvard demonstraram que sujeitos que dormiam após aprender novas competências tiveram um desempenho significativamente melhor do que aqueles que permaneceram acordados durante a mesma duração.

A privação de sono produz graves deficiências cognitivas e físicas que se acumulam ao longo do tempo. Após apenas dezassete horas sem dormir, os tempos de reação e julgamento declinam para níveis equivalentes a intoxicação legal. O derrame de petróleo do Exxon Valdez em março de 1989 e o desastre nuclear de Chernobyl em abril de 1986 envolveram trabalhadores fatigados a cometer erros críticos. A privação crónica de sono aumenta os riscos de obesidade, diabetes, doenças cardíacas e morte prematura.

Os ritmos circadianos regulam o tempo de sono através de um relógio biológico localizado no núcleo supraquiasmático do cérebro. Este minúsculo aglomerado de cerca de 20.000 neurónios recebe sinais de luz dos olhos e coordena ciclos diários de alerta, temperatura corporal, libertação hormonal e inúmeras outras funções. O relógio circadiano funciona ligeiramente mais de 24 horas e deve ser reposto diariamente pela exposição à luz.

A melatonina, uma hormona produzida pela glândula pineal, sinaliza escuridão ao corpo e promove o início do sono. O cérebro começa a libertar melatonina nas horas da noite, tipicamente duas horas antes da hora habitual de deitar. A exposição a luz brilhante, especialmente comprimentos de onda azuis de ecrãs eletrónicos, suprime a produção de melatonina e pode atrasar o sono. Isto explica por que usar telemóveis e computadores antes de dormir frequentemente perturba o sono.

A adenosina acumula-se no cérebro durante as horas de vigília e cria uma pressão crescente para dormir. Este químico acumula-se como subproduto da atividade cerebral e liga-se a recetores que promovem sonolência. A cafeína funciona bloqueando recetores de adenosina, mascarando temporariamente a fadiga sem eliminar a dívida de sono subjacente. Quando a cafeína passa, a adenosina acumulada produz a queda familiar que os bebedores de café experienciam.

As perturbações do sono afetam milhões de pessoas e assumem muitas formas além da simples insónia. A apneia obstrutiva do sono causa interrupções repetidas da respiração durante o sono, afetando aproximadamente 25 milhões de adultos americanos. Esta condição aumenta os riscos de hipertensão arterial, ataque cardíaco, AVC e diabetes. Máquinas de pressão positiva contínua nas vias aéreas que mantêm as vias aéreas abertas durante o sono fornecem tratamento eficaz para a maioria dos pacientes.

A narcolepsia, uma perturbação neurológica que afeta cerca de 200.000 americanos, causa sonolência diurna avassaladora e ataques súbitos de sono. Os investigadores descobriram em 1999 que a narcolepsia resulta da destruição de neurónios que produzem hipocretina, um neurotransmissor que mantém a vigília. Esta descoberta por Emmanuel Mignot na Universidade de Stanford abriu novas possibilidades de tratamento e ilustrou como estudar perturbações do sono avança a compreensão do sono normal.

A idade afeta profundamente os padrões de sono ao longo da vida humana. Os recém-nascidos dormem até dezassete horas diárias, passando cerca de metade desse tempo em sono REM. Os adolescentes experienciam uma mudança biológica para o sono mais tardio que entra em conflito com horários escolares matinais. Os adultos mais velhos dormem menos profundamente e acordam com mais frequência, embora as suas necessidades de sono não diminuam necessariamente.

A sociedade moderna frequentemente trata o sono como tempo dispensável que pode ser trocado por produtividade ou entretenimento. Esta atitude ignora evidência científica esmagadora de que o sono adequado é essencial para saúde e desempenho. Os Centros de Controlo e Prevenção de Doenças declararam o sono insuficiente uma epidemia de saúde pública em 2014, estimando que um terço dos adultos americanos dorme menos das sete horas recomendadas por noite.

Melhorar os hábitos de sono requer horários consistentes, ambientes de sono apropriados e mudanças comportamentais. Ir para a cama e acordar às mesmas horas todos os dias fortalece os ritmos circadianos. Quartos frescos, escuros e silenciosos promovem a qualidade do sono. Evitar cafeína após o meio-dia, limitar o álcool antes de dormir e reduzir o tempo de ecrã à noite apoiam um melhor sono. O exercício melhora a qualidade do sono quando realizado mais cedo no dia.

Compreender a ciência do sono capacita os indivíduos a fazer escolhas informadas sobre esta necessidade humana fundamental. O sono não é tempo desperdiçado, mas um investimento ativo na saúde física, função cognitiva e resiliência emocional. O crescente corpo de investigação confirma o que a experiência comum sugere: sono adequado é essencial para viver bem.`,
    questions: [
      {
        id: 'health-medicine-p05-q1',
        type: 'single_choice',
        question: 'Quem descobriu o sono REM em 1953?',
        options: [
          'Robert Stickgold e Matthew Walker',
          'Eugene Aserinsky e Nathaniel Kleitman',
          'Maiken Nedergaard e Emmanuel Mignot',
          'William Dement e Allan Rechtschaffen'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p05-q2',
        type: 'single_choice',
        question: 'O que faz o sistema glinfático durante o sono?',
        options: [
          'Consolida memórias',
          'Remove proteínas tóxicas do tecido cerebral',
          'Regula ritmos circadianos',
          'Produz melatonina'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p05-q3',
        type: 'multiple_select',
        question: 'Que condições estão associadas à privação crónica de sono? Selecione todas as opções aplicáveis.',
        options: [
          'Obesidade',
          'Doença cardíaca',
          'Função imunitária melhorada',
          'Diabetes'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p05-q4',
        type: 'true_false',
        question: 'A cafeína elimina a dívida de sono ao restaurar os níveis de adenosina.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-p05-q5',
        type: 'numeric',
        question: 'Aproximadamente quanto tempo dura cada ciclo de sono em minutos?',
        correctValue: 90,
        tolerance: 10,
        min: 30,
        max: 180,
        step: 5,
        unit: 'minutes'
      },
      {
        id: 'health-medicine-p05-q6',
        type: 'single_choice',
        question: 'O que causa a narcolepsia?',
        options: [
          'Produção excessiva de melatonina',
          'Destruição de neurónios produtores de hipocretina',
          'Recetores de adenosina bloqueados',
          'Ritmos circadianos perturbados'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p05-q7',
        type: 'single_choice',
        question: 'Onde está localizado o relógio biológico no cérebro?',
        options: [
          'Glândula pineal',
          'Hipocampo',
          'Núcleo supraquiasmático',
          'Cerebelo'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p05-q8',
        type: 'numeric',
        question: 'Aproximadamente quantos adultos americanos são afetados por apneia obstrutiva do sono (em milhões)?',
        correctValue: 25,
        tolerance: 5,
        min: 5,
        max: 50,
        step: 1,
        unit: 'million'
      }
    ]
  },
  {
    id: 'health-medicine-p06',
    topicId: 'health-medicine',
    title: 'O Microbioma Intestinal: O Seu Ecossistema Interior',
    difficulty: 'intermediate',
    wordCount: 1853,
    articleType: 'practice',
    orderIndex: 6,
    content: `O intestino humano contém triliões de microrganismos que influenciam a saúde de formas que os cientistas estão apenas a começar a compreender. Este ecossistema complexo, conhecido como microbioma intestinal, desempenha papéis essenciais na digestão, imunidade, saúde mental e prevenção de doenças. A investigação sobre este mundo oculto revolucionou a forma como os profissionais médicos pensam sobre a biologia humana e abriu novas abordagens promissoras para tratar doenças.

O adulto médio transporta aproximadamente 38 triliões de células bacterianas, aproximadamente igual ao número de células humanas no corpo. A maioria destes micróbios habita o trato gastrointestinal, particularmente o intestino grosso, onde as condições favorecem o crescimento bacteriano. Mais de 1.000 espécies bacterianas diferentes foram identificadas nos intestinos humanos, embora cada indivíduo normalmente abrigue entre 150 e 250 espécies. Esta comunidade microbiana pesa entre um e dois quilogramas num adulto típico.

O microbioma intestinal começa a desenvolver-se no nascimento e continua a mudar ao longo da vida. Bebés nascidos por via vaginal adquirem os seus micróbios iniciais do canal de parto, enquanto bebés nascidos por cesariana encontram primeiro bactérias de ambientes hospitalares e contacto com a pele. A amamentação molda ainda mais o microbioma em desenvolvimento ao fornecer nutrientes e bactérias benéficas. A comunidade intestinal permanece relativamente instável durante a primeira infância antes de se estabelecer em padrões adultos por volta dos três anos de idade.

O cientista holandês Antonie van Leeuwenhoek observou pela primeira vez microrganismos em 1676 usando microscópios que ele próprio construiu, mas a compreensão das bactérias intestinais permaneceu limitada durante séculos. O biólogo russo Elie Metchnikoff propôs em 1907 que certas bactérias poderiam beneficiar a saúde humana, observando que camponeses búlgaros que consumiam produtos lácteos fermentados viviam vidas invulgarmente longas. As suas ideias sobre probióticos geraram ceticismo dos contemporâneos, mas anteciparam descobertas que viriam décadas mais tarde.

A investigação moderna sobre o microbioma acelerou dramaticamente após o lançamento do Projeto Microbioma Humano em 2007 com financiamento dos Institutos Nacionais de Saúde. Esta iniciativa ambiciosa visava identificar e caracterizar microrganismos que vivem no corpo humano. Os avanços na tecnologia de sequenciação de DNA tornaram possível identificar bactérias sem precisar de as cultivar em culturas laboratoriais. Os cientistas descobriram que o microbioma intestinal contém aproximadamente 100 vezes mais genes do que o próprio genoma humano.

O microbioma intestinal desempenha funções essenciais que as células humanas não podem realizar de forma independente. Certas bactérias decompõem fibras alimentares que as enzimas humanas não conseguem digerir, produzindo ácidos gordos de cadeia curta que nutrem as células intestinais. Outros micróbios sintetizam vitaminas, incluindo vitamina K e várias vitaminas B que o corpo requer. A comunidade intestinal também ajuda a treinar o sistema imunitário para distinguir entre patógenos prejudiciais e organismos benéficos.

A dieta influencia profundamente a composição e função do microbioma. Pessoas que consomem dietas ricas em fibra normalmente abrigam comunidades bacterianas mais diversas do que aquelas que comem alimentos processados ricos em açúcar e gordura. Dietas tradicionais na África rural, ricas em fibra vegetal, produzem microbiomas dramaticamente diferentes dos observados em populações ocidentais. As mudanças alimentares podem alterar a composição do microbioma em apenas 24 horas, embora o retorno a padrões alimentares antigos normalmente restaure populações bacterianas anteriores.

Os antibióticos devastam as comunidades bacterianas intestinais juntamente com os organismos prejudiciais que visam. Um único curso de antibióticos pode eliminar espécies benéficas que podem levar meses ou anos a recuperar. Algumas espécies nunca regressam, alterando permanentemente a composição do microbioma. Este dano colateral provocou crescente preocupação sobre o uso excessivo de antibióticos e interesse em estratégias para proteger ou restaurar comunidades intestinais durante o tratamento.

A investigação ligou perturbações do microbioma a uma lista crescente de condições de saúde. Doenças inflamatórias intestinais, incluindo doença de Crohn e colite ulcerosa, envolvem comunidades bacterianas alteradas que podem desencadear ou piorar a inflamação intestinal. A obesidade parece ligada à composição do microbioma, com estudos a mostrar que o transplante de bactérias intestinais de ratos obesos para ratos magros causa ganho de peso. Diabetes tipo 2, condições autoimunes e alergias foram todas associadas a mudanças no microbioma.

O eixo intestino-cérebro representa uma das fronteiras mais surpreendentes na investigação do microbioma. As bactérias no intestino comunicam com o cérebro através de múltiplos caminhos, incluindo o nervo vago e mensageiros químicos que entram na corrente sanguínea. Estudos encontraram diferenças nas bactérias intestinais entre pessoas com depressão ou ansiedade e aquelas sem estas condições. A investigação de John Cryan na University College Cork demonstrou que estirpes bacterianas específicas podem influenciar o humor e comportamento tanto em animais como em humanos.

O transplante de microbiota fecal emergiu como um tratamento notavelmente eficaz para infeções recorrentes de Clostridioides difficile. Este procedimento, que transfere fezes de um dador saudável para o intestino de um paciente, cura aproximadamente 90 por cento dos casos que não responderam a antibióticos. O primeiro transplante fecal bem-sucedido para esta condição foi realizado em 1958 por Ben Eiseman no Hospital da Administração de Veteranos de Denver, mas o tratamento permaneceu obscuro até que o C. difficile resistente a antibióticos se tornou um problema importante.

Os probióticos, microrganismos vivos destinados a fornecer benefícios para a saúde, tornaram-se uma indústria de milhares de milhões de dólares apesar de evidências limitadas para muitos benefícios alegados. Algumas estirpes probióticas mostraram eficácia para condições específicas, incluindo diarreia associada a antibióticos e certas perturbações digestivas. No entanto, muitos produtos comerciais carecem de prova de eficácia, e probióticos que ajudam uma pessoa podem não beneficiar outra devido a diferenças individuais no microbioma.

Os prebióticos oferecem uma abordagem alternativa ao alimentar bactérias benéficas já presentes no intestino. Estes componentes alimentares não digeríveis, encontrados em alimentos como alho, cebola, banana e cereais integrais, promovem seletivamente o crescimento de espécies bacterianas úteis. Combinar prebióticos com probióticos cria simbióticos que podem fornecer benefícios melhorados, embora a investigação continue a determinar combinações e doses ótimas.

O microbioma varia significativamente entre indivíduos, tornando as abordagens personalizadas cada vez mais importantes. Investigadores do Instituto Weizmann de Ciência em Israel demonstraram em 2015 que as respostas de açúcar no sangue a alimentos idênticos diferem dramaticamente entre pessoas, com a composição do microbioma a ajudar a explicar esta variação. Esta descoberta sugere que as recomendações alimentares poderiam eventualmente ser adaptadas com base em perfis individuais do microbioma.

As aplicações futuras da ciência do microbioma poderiam transformar a medicina de formas profundas. Os investigadores estão a desenvolver técnicas para editar precisamente a composição do microbioma, adicionando ou removendo espécies específicas para tratar doenças. Bactérias engenhadas poderiam fornecer medicamentos diretamente aos tecidos doentes ou produzir moléculas terapêuticas dentro do intestino. Compreender como o microbioma influencia o metabolismo de medicamentos poderia melhorar a eficácia do tratamento e reduzir efeitos secundários.

O microbioma intestinal lembra-nos que os humanos não são organismos isolados, mas ecossistemas que abrigam inúmeros parceiros microbianos. Estes habitantes invisíveis influenciam a nossa saúde, humor e até comportamento através de mecanismos que estamos apenas a começar a apreciar. Nutrir este ecossistema interior através da dieta, escolhas de estilo de vida e uso criterioso de antibióticos pode revelar-se tão importante quanto qualquer outra prática de saúde que adotamos.`,
    questions: [
      {
        id: 'health-medicine-p06-q1',
        type: 'single_choice',
        question: 'Aproximadamente quantas células bacterianas transporta o adulto médio?',
        options: [
          '1 trilião',
          '10 triliões',
          '38 triliões',
          '100 triliões'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p06-q2',
        type: 'single_choice',
        question: 'Quando foi lançado o Projeto Microbioma Humano?',
        options: [
          '1958',
          '1976',
          '2007',
          '2015'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p06-q3',
        type: 'multiple_select',
        question: 'Que funções desempenha o microbioma intestinal? Selecione todas as opções aplicáveis.',
        options: [
          'Decompor fibras alimentares',
          'Sintetizar vitaminas',
          'Bombear sangue',
          'Treinar o sistema imunitário'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p06-q4',
        type: 'true_false',
        question: 'Elie Metchnikoff propôs em 1907 que certas bactérias poderiam beneficiar a saúde humana.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p06-q5',
        type: 'numeric',
        question: 'Que percentagem de infeções recorrentes de C. difficile cura o transplante de microbiota fecal?',
        correctValue: 90,
        tolerance: 5,
        min: 50,
        max: 100,
        step: 5,
        unit: 'percent'
      },
      {
        id: 'health-medicine-p06-q6',
        type: 'single_choice',
        question: 'Quem realizou o primeiro transplante fecal bem-sucedido para C. difficile?',
        options: [
          'Antonie van Leeuwenhoek',
          'Elie Metchnikoff',
          'Ben Eiseman',
          'John Cryan'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p06-q7',
        type: 'single_choice',
        question: 'Com que idade aproximada o microbioma intestinal se estabelece em padrões adultos?',
        options: [
          'No nascimento',
          'Um ano',
          'Três anos',
          'Adolescência'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p06-q8',
        type: 'numeric',
        question: 'Quantas espécies bacterianas diferentes foram identificadas nos intestinos humanos (acima de que número)?',
        correctValue: 1000,
        tolerance: 100,
        min: 500,
        max: 2000,
        step: 100,
        unit: 'species'
      },
      {
        id: 'health-medicine-p06-q9',
        type: 'true_false',
        question: 'O microbioma intestinal contém aproximadamente 100 vezes mais genes do que o genoma humano.',
        correctAnswer: true
      }
    ]
  },
  {
    id: 'health-medicine-p07',
    topicId: 'health-medicine',
    title: 'Genética e Hereditariedade: O Código da Vida',
    difficulty: 'advanced',
    wordCount: 2192,
    articleType: 'practice',
    orderIndex: 7,
    content: `A genética é a ciência da hereditariedade, explicando como as características passam dos pais para os descendentes através de informação codificada no DNA. Este campo transformou a nossa compreensão da própria vida e possibilitou avanços médicos que vão desde testes genéticos até terapia génica. A história da genética abrange desde observações antigas sobre herança até tecnologias de ponta que podem editar o próprio projeto dos organismos vivos.

Gregor Mendel, um frade agostiniano a trabalhar num jardim de mosteiro em Brno, Áustria, descobriu as leis fundamentais da herança através de experiências cuidadosas com ervilheiras. Entre 1856 e 1863, Mendel cruzou aproximadamente 29.000 plantas de ervilha, registando meticulosamente como características como cor da semente, forma da vagem e altura da planta passavam de geração em geração. O seu trabalho revelou que os fatores hereditários vêm em pares, com os descendentes a receber um fator de cada progenitor.

Mendel apresentou as suas descobertas à Sociedade de História Natural de Brno em fevereiro e março de 1865, depois publicou-as no ano seguinte. A comunidade científica ignorou amplamente as suas descobertas revolucionárias durante a sua vida. Mendel morreu em janeiro de 1884 sem saber que o seu trabalho eventualmente lhe valeria o reconhecimento como pai da genética. Três cientistas redescobriram independentemente os seus princípios em 1900, finalmente trazendo atenção a descobertas feitas décadas antes.

Os cromossomas, as estruturas que transportam informação genética, foram descobertos no final do século XIX. O biólogo alemão Walther Flemming observou cromossomas durante a divisão celular em 1882 e descreveu o processo que denominou mitose. O cientista americano Walter Sutton propôs em 1902 que os cromossomas transportam os fatores hereditários de Mendel, ligando a biologia celular à ciência emergente da genética.

Thomas Hunt Morgan estabeleceu a teoria cromossómica da herança através de experiências com moscas da fruta realizadas na Universidade de Columbia a partir de 1908. A sua sala das moscas tornou-se lendária por descobertas revolucionárias sobre como os genes estão dispostos nos cromossomas. Morgan descobriu que certas características tendem a ser herdadas juntas porque os genes que as controlam estão no mesmo cromossoma. Recebeu o Prémio Nobel de Fisiologia ou Medicina em 1933 por demonstrar o papel dos cromossomas na hereditariedade.

A natureza dos próprios genes permaneceu misteriosa até a biologia molecular revelar a sua base química. Oswald Avery e colegas demonstraram em 1944 que o DNA transporta informação genética, embora muitos cientistas permanecessem céticos durante anos depois. James Watson e Francis Crick determinaram a estrutura de dupla hélice do DNA em 1953, abrindo a era moderna da genética molecular. A sua descoberta explicou como a informação genética poderia ser armazenada e copiada com fidelidade notável.

O DNA consiste em duas cadeias enroladas uma em torno da outra, ligadas por pares de bases que seguem regras de emparelhamento específicas. A adenina emparelha sempre com timina, enquanto a guanina emparelha sempre com citosina. Esta estrutura complementar significa que cada cadeia pode servir como modelo para produzir uma cópia idêntica durante a divisão celular. A sequência de bases ao longo de uma cadeia de DNA codifica informação genética muito como letras soletram palavras numa frase.

Os genes são segmentos de DNA que contêm instruções para construir proteínas, as moléculas que desempenham a maioria das funções celulares. O genoma humano contém aproximadamente 20.000 genes codificadores de proteínas espalhados por 23 pares de cromossomas. Cada gene pode existir em diferentes versões chamadas alelos, explicando por que os indivíduos diferem em características específicas. O conjunto completo de instruções genéticas num organismo chama-se o seu genoma.

O código genético foi decifrado durante a década de 1960 através do trabalho de múltiplos grupos de investigação. Marshall Nirenberg e Heinrich Matthaei desvendaram o primeiro codão em 1961, mostrando que três bases de DNA especificam um aminoácido. Em 1966, os cientistas tinham determinado como todas as 64 combinações possíveis de três bases correspondem aos 20 aminoácidos usados para construir proteínas. Este código universal opera em praticamente todas as formas de vida, desde bactérias a humanos.

As mutações genéticas ocorrem quando as sequências de DNA mudam, às vezes afetando as proteínas que codificam. Algumas mutações surgem espontaneamente durante a replicação do DNA, enquanto outras resultam de fatores ambientais como radiação ou certos químicos. A maioria das mutações tem pouco ou nenhum efeito, mas algumas causam doenças genéticas enquanto outras ocasionalmente fornecem vantagens que a evolução pode selecionar. A doença das células falciformes, a fibrose cística e a doença de Huntington resultam todas de mutações genéticas específicas.

O Projeto Genoma Humano, lançado em 1990 e concluído em abril de 2003, determinou a sequência completa do DNA humano. Este esforço internacional envolveu cientistas de 20 instituições em seis países e custou aproximadamente 2,7 mil milhões de dólares. O projeto identificou a localização de todos os genes humanos e forneceu uma sequência de referência que possibilitou inúmeras descobertas subsequentes. Hoje, sequenciar o genoma de um indivíduo custa menos de mil dólares e leva apenas horas.

Os testes genéticos tornaram-se cada vez mais acessíveis, permitindo aos indivíduos aprender sobre a sua composição genética e riscos de doenças. Os testes podem identificar portadores de condições como doença de Tay-Sachs ou anemia falciforme que podem transmitir estas características aos filhos. A triagem de recém-nascidos para condições genéticas tratáveis tornou-se prática padrão na maioria dos países desenvolvidos. Serviços de testes genéticos diretos ao consumidor lançados por empresas como a 23andMe trouxeram informação genética a milhões de pessoas.

A farmacogenómica estuda como as variações genéticas afetam as respostas aos medicamentos. Algumas pessoas metabolizam certos medicamentos rapidamente enquanto outras processam-nos lentamente, afetando tanto a eficácia como os efeitos secundários. A FDA atualizou rótulos para mais de 200 medicamentos com informação genética relevante ao seu uso. Os médicos usam cada vez mais testes genéticos para selecionar medicamentos e doses mais adequadas a pacientes individuais.

A terapia génica visa tratar doenças genéticas ao introduzir cópias funcionais de genes defeituosos nas células dos pacientes. A primeira terapia génica bem-sucedida em humanos ocorreu em setembro de 1990 quando William French Anderson tratou uma menina de quatro anos com imunodeficiência combinada grave nos Institutos Nacionais de Saúde. O progresso foi lento devido a desafios técnicos e preocupações de segurança, mas anos recentes viram múltiplas terapias génicas receber aprovação regulamentar.

A tecnologia de edição genética CRISPR-Cas9, desenvolvida a partir de sistemas imunitários bacterianos, revolucionou a investigação genética desde que Jennifer Doudna e Emmanuelle Charpentier publicaram o seu artigo histórico em junho de 2012. Esta ferramenta permite aos cientistas fazer mudanças precisas em sequências de DNA com facilidade e precisão sem precedentes. Doudna e Charpentier receberam o Prémio Nobel de Química em 2020 pela sua descoberta. O CRISPR tem aplicações potenciais que vão desde tratar doenças genéticas até criar culturas resistentes a doenças.

As implicações éticas das tecnologias genéticas continuam a gerar debate. Os testes genéticos levantam questões sobre privacidade, discriminação e impactos psicológicos de conhecer riscos de doenças. A terapia e edição génica forçam a consideração de que condições devem ser tratadas e se o melhoramento de características normais é aceitável. O nascimento dos primeiros bebés geneticamente editados na China em novembro de 2018 provocou condenação internacional e destacou a necessidade de supervisão das tecnologias genéticas.

A genética transformou-se de observar padrões de herança em ervilheiras até ler e editar o código molecular da vida. Este conhecimento traz promessa tremenda e responsabilidade significativa. Compreender a genética capacita os indivíduos a tomar decisões informadas sobre saúde enquanto desafia a sociedade a lidar com questões profundas sobre o que significa ser humano numa era em que o nosso destino genético já não é fixo.`,
    questions: [
      {
        id: 'health-medicine-p07-q1',
        type: 'single_choice',
        question: 'Quantas plantas de ervilha Gregor Mendel cruzou nas suas experiências?',
        options: [
          'Aproximadamente 5.000',
          'Aproximadamente 10.000',
          'Aproximadamente 29.000',
          'Aproximadamente 50.000'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p07-q2',
        type: 'single_choice',
        question: 'Quem recebeu o Prémio Nobel em 1933 por demonstrar o papel dos cromossomas na hereditariedade?',
        options: [
          'Gregor Mendel',
          'Thomas Hunt Morgan',
          'Walter Sutton',
          'Walther Flemming'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p07-q3',
        type: 'multiple_select',
        question: 'Que cientistas contribuíram para descobrir a estrutura ou função do DNA? Selecione todas as opções aplicáveis.',
        options: [
          'Oswald Avery',
          'James Watson',
          'Francis Crick',
          'Gregor Mendel'
        ],
        correctIndices: [
          0,
          1,
          2
        ]
      },
      {
        id: 'health-medicine-p07-q4',
        type: 'true_false',
        question: 'O Projeto Genoma Humano foi concluído em abril de 2003.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p07-q5',
        type: 'numeric',
        question: 'Aproximadamente quantos genes codificadores de proteínas contém o genoma humano?',
        correctValue: 20000,
        tolerance: 2000,
        min: 10000,
        max: 40000,
        step: 1000,
        unit: 'genes'
      },
      {
        id: 'health-medicine-p07-q6',
        type: 'single_choice',
        question: 'Quando foi realizada a primeira terapia génica bem-sucedida em humanos?',
        options: [
          'Janeiro de 1884',
          'Setembro de 1990',
          'Abril de 2003',
          'Junho de 2012'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p07-q7',
        type: 'single_choice',
        question: 'Quem desenvolveu a tecnologia de edição genética CRISPR-Cas9?',
        options: [
          'Watson e Crick',
          'Mendel e Morgan',
          'Doudna e Charpentier',
          'Nirenberg e Matthaei'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p07-q8',
        type: 'numeric',
        question: 'Quanto custou o Projeto Genoma Humano (em milhares de milhões de dólares)?',
        correctValue: 2.7,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'billion dollars'
      },
      {
        id: 'health-medicine-p07-q9',
        type: 'true_false',
        question: 'A adenina emparelha sempre com guanina no DNA.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-p07-q10',
        type: 'single_choice',
        question: 'Em que ano Doudna e Charpentier publicaram o seu artigo histórico sobre CRISPR?',
        options: [
          '2003',
          '2008',
          '2012',
          '2020'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p07-q11',
        type: 'numeric',
        question: 'Em que ano três cientistas redescobriram independentemente os princípios de Mendel?',
        correctValue: 1900,
        tolerance: 0,
        min: 1850,
        max: 1950,
        step: 1,
        unit: 'year'
      }
    ]
  },
  {
    id: 'health-medicine-p08',
    topicId: 'health-medicine',
    title: 'Doenças Infeciosas: A Batalha Contra os Patógenos',
    difficulty: 'advanced',
    wordCount: 2445,
    articleType: 'practice',
    orderIndex: 8,
    content: `As doenças infeciosas moldaram a história humana de forma mais dramática do que guerras, fomes ou desastres naturais, matando milhares de milhões de pessoas e alterando o curso das civilizações. Estas doenças resultam de microrganismos patogénicos, incluindo bactérias, vírus, fungos e parasitas que invadem o corpo e perturbam as funções normais. Compreender como estes patógenos se espalham e causam doença possibilitou intervenções médicas que salvaram inúmeras vidas.

A teoria microbiana da doença, desenvolvida no século XIX, transformou a medicina ao estabelecer que microrganismos específicos causam doenças específicas. O químico francês Louis Pasteur realizou experiências fundamentais na década de 1860 demonstrando que microrganismos causavam fermentação e deterioração, depois estendeu este trabalho para mostrar que germes podiam causar doença em animais e humanos. O médico alemão Robert Koch estabeleceu critérios rigorosos para provar que um microrganismo particular causa uma doença particular, publicando os seus famosos postulados em 1890.

O trabalho de Koch sobre a tuberculose exemplificou o poder da nova abordagem às doenças infeciosas. Identificou a Mycobacterium tuberculosis como agente causador da tuberculose em 1882, uma descoberta que lhe valeu o Prémio Nobel de Fisiologia ou Medicina em 1905. A tuberculose tinha matado aproximadamente um quarto de todos os adultos na Europa durante o século XIX, tornando a identificação da bactéria por Koch um marco importante de saúde pública.

As bactérias são organismos unicelulares que podem sobreviver e reproduzir-se independentemente das células hospedeiras. Algumas bactérias causam doença ao produzir toxinas, enquanto outras danificam tecidos diretamente através do seu crescimento e metabolismo. Os antibióticos funcionam contra infeções bacterianas ao visar características únicas das células bacterianas, como a síntese da parede celular ou mecanismos de produção de proteínas que diferem dos das células humanas.

Os vírus representam um tipo fundamentalmente diferente de patógeno que não pode reproduzir-se fora das células hospedeiras. Estas partículas minúsculas consistem em material genético rodeado por uma capa proteica e por vezes uma membrana exterior. Os vírus sequestram a maquinaria celular das células infetadas para produzir cópias de si mesmos, muitas vezes matando a célula hospedeira no processo. Os antibióticos não têm efeito em infeções virais, tornando a prevenção através da vacinação e medicamentos antivirais as estratégias primárias contra doenças virais.

A pandemia de gripe de 1918 demonstrou o potencial devastador das doenças virais no mundo moderno. Este surto infetou aproximadamente 500 milhões de pessoas, cerca de um terço da população mundial na altura. As estimativas de mortes variam de 50 a 100 milhões de pessoas, tornando-o um dos eventos mais mortais da história humana. O vírus espalhou-se rapidamente através de movimentos de tropas durante a Primeira Guerra Mundial e sobrecarregou sistemas médicos que não tinham antibióticos ou medicamentos antivirais para oferecer.

O VIH e a SIDA emergiram como uma nova ameaça de doença infeciosa no início da década de 1980, eventualmente matando mais de 40 milhões de pessoas em todo o mundo. Os investigadores americanos Robert Gallo e os cientistas franceses Luc Montagnier e Françoise Barré-Sinoussi identificaram o vírus em 1983 e 1984. O desenvolvimento da terapia antirretroviral em meados da década de 1990 transformou o VIH de sentença de morte numa condição crónica tratável para aqueles com acesso a tratamento. Montagnier e Barré-Sinoussi receberam o Prémio Nobel de Fisiologia ou Medicina em 2008 pela sua descoberta.

As doenças parasitárias afetam milhares de milhões de pessoas em todo o mundo, principalmente em regiões tropicais e subtropicais. A malária, causada por parasitas Plasmodium transmitidos através de picadas de mosquito, mata aproximadamente 600.000 pessoas anualmente, maioritariamente crianças menores de cinco anos na África subsariana. A cientista chinesa Tu Youyou descobriu a artemisinina como tratamento antimalárico eficaz ao estudar medicina tradicional chinesa, ganhando o Prémio Nobel em 2015 por esta contribuição salvadora de vidas.

Os fungos causam infeções que variam de condições cutâneas menores a doenças sistémicas potencialmente fatais. As infeções fúngicas aumentaram nas últimas décadas à medida que tratamentos imunossupressores e dispositivos médicos criam oportunidades para patógenos oportunistas. A Candida auris, identificada pela primeira vez no Japão em 2009, espalhou-se globalmente e resiste a múltiplos medicamentos antifúngicos, representando uma ameaça emergente que afeta particularmente pacientes hospitalizados.

As vias de transmissão variam entre diferentes patógenos e determinam estratégias de prevenção apropriadas. Os patógenos respiratórios espalham-se através de gotículas ou aerossóis produzidos quando indivíduos infetados tossem, espirram ou respiram. Os patógenos gastrointestinais espalham-se através de alimentos ou água contaminados. Os patógenos transmitidos pelo sangue requerem contacto direto com sangue ou fluidos corporais infetados. Os patógenos transmitidos por vetores usam insetos ou outros animais para os transportar entre hospedeiros humanos.

A epidemiologia estuda como as doenças se espalham pelas populações e identifica fatores que influenciam a transmissão. John Snow realizou trabalho epidemiológico pioneiro durante o surto de cólera em Londres em 1854, mapeando casos e determinando que água contaminada da bomba de Broad Street estava a espalhar a doença. O seu trabalho precedeu a teoria microbiana, mas demonstrou o poder da investigação sistemática para identificar fontes de doença e prevenir maior propagação.

A vacinação permanece a ferramenta mais eficaz para prevenir doenças infeciosas. A erradicação da varíola, certificada pela Organização Mundial de Saúde a 9 de dezembro de 1979, demonstrou que campanhas coordenadas de vacinação podiam eliminar completamente uma doença. A poliomielite foi reduzida em mais de 99 por cento desde que a Iniciativa Global de Erradicação da Poliomielite foi lançada em 1988, com apenas casos dispersos a permanecer em alguns países.

As medidas de saúde pública além da vacinação desempenham papéis cruciais no controlo de doenças infeciosas. Água limpa e saneamento reduziram dramaticamente a transmissão de doenças transmitidas pela água em países desenvolvidos durante o século XX. A higiene das mãos, promovida pelo médico húngaro Ignaz Semmelweis na década de 1840, previne a transmissão de muitos patógenos. As medidas de quarentena e isolamento retardam a propagação de doenças contagiosas ao separar indivíduos infetados ou expostos da população saudável.

A resistência antimicrobiana ameaça reverter o progresso contra doenças infeciosas ao tornar os patógenos irresponsivos a tratamentos que outrora funcionavam eficazmente. A Organização Mundial de Saúde estima que infeções resistentes a antimicrobianos já causam aproximadamente 1,27 milhões de mortes anualmente em todo o mundo. O uso excessivo e indevido de antibióticos na medicina e agricultura aceleram o desenvolvimento de resistência, enquanto a indústria farmacêutica abandonou em grande parte a investigação de antibióticos devido ao potencial de lucro limitado.

A pandemia de COVID-19 que começou no final de 2019 demonstrou tanto a ameaça contínua de doenças infeciosas emergentes como o poder da ciência médica moderna para responder. O vírus SARS-CoV-2 espalhou-se globalmente em meses, infetando centenas de milhões de pessoas e matando mais de 6 milhões até 2023. Os cientistas desenvolveram vacinas eficazes em menos de um ano usando a nova tecnologia de mRNA, uma realização notável que se baseou em décadas de investigação anterior.

As alterações climáticas afetam padrões de doenças infeciosas ao alterar as áreas geográficas de insetos portadores de doenças e as condições que permitem aos patógenos sobreviver no ambiente. Os mosquitos portadores de dengue, vírus Zika e outras doenças estão a expandir-se para regiões anteriormente temperadas. O aquecimento das temperaturas pode libertar patógenos antigos preservados no permafrost à medida que este descongela. Estas mudanças requerem vigilância contínua e adaptação das estratégias de saúde pública.

A segurança sanitária global depende da cooperação internacional para detetar e responder a surtos de doenças antes que se espalhem. A Organização Mundial de Saúde coordena esforços globais de vigilância e resposta sob o Regulamento Sanitário Internacional adotado em 2005. No entanto, tensões políticas, limitações de recursos e capacidades nacionais variáveis desafiam a coordenação eficaz. A pandemia de COVID-19 revelou tanto a importância da cooperação global como as dificuldades de a alcançar na prática.

A investigação continua a avançar a nossa compreensão das doenças infeciosas e a desenvolver novas ferramentas para as combater. A sequenciação genómica permite a identificação rápida de patógenos e o rastreamento da propagação de doenças. A inteligência artificial ajuda na descoberta de medicamentos e previsão de surtos. Novas plataformas de vacinas prometem desenvolvimento mais rápido de vacinas contra ameaças emergentes. Estes avanços oferecem esperança de que a humanidade pode continuar a ganhar batalhas contra os microrganismos que nos ameaçaram ao longo da história.`,
    questions: [
      {
        id: 'health-medicine-p08-q1',
        type: 'single_choice',
        question: 'Quem desenvolveu a teoria microbiana da doença através de experiências fundamentais na década de 1860?',
        options: [
          'Robert Koch',
          'Louis Pasteur',
          'John Snow',
          'Ignaz Semmelweis'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p08-q2',
        type: 'single_choice',
        question: 'Quando foi publicada a identificação da bactéria da tuberculose por Robert Koch?',
        options: [
          '1854',
          '1882',
          '1890',
          '1905'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p08-q3',
        type: 'multiple_select',
        question: 'Que tipos de patógenos causam doenças infeciosas? Selecione todas as opções aplicáveis.',
        options: [
          'Bactérias',
          'Vírus',
          'Anticorpos',
          'Parasitas'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p08-q4',
        type: 'true_false',
        question: 'Os antibióticos são eficazes contra infeções virais.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-p08-q5',
        type: 'numeric',
        question: 'Aproximadamente quantas pessoas foram infetadas durante a pandemia de gripe de 1918 (em milhões)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'million'
      },
      {
        id: 'health-medicine-p08-q6',
        type: 'single_choice',
        question: 'Quem realizou trabalho epidemiológico pioneiro durante o surto de cólera em Londres em 1854?',
        options: [
          'Louis Pasteur',
          'Robert Koch',
          'John Snow',
          'Tu Youyou'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p08-q7',
        type: 'single_choice',
        question: 'Quando foi certificada a erradicação da varíola pela Organização Mundial de Saúde?',
        options: [
          '9 de dezembro de 1979',
          '1 de janeiro de 1988',
          '15 de outubro de 1990',
          '28 de março de 2000'
        ],
        correctIndex: 0
      },
      {
        id: 'health-medicine-p08-q8',
        type: 'numeric',
        question: 'Quantas mortes a malária causa anualmente (aproximadamente)?',
        correctValue: 600000,
        tolerance: 100000,
        min: 300000,
        max: 1000000,
        step: 50000,
        unit: 'deaths'
      },
      {
        id: 'health-medicine-p08-q9',
        type: 'true_false',
        question: 'Tu Youyou descobriu a artemisinina ao estudar medicina tradicional chinesa.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p08-q10',
        type: 'single_choice',
        question: 'Quando foi identificada pela primeira vez a Candida auris?',
        options: [
          '1995 nos Estados Unidos',
          '2002 na Europa',
          '2009 no Japão',
          '2015 no Brasil'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p08-q11',
        type: 'numeric',
        question: 'Quantas mortes anualmente são estimadas ser causadas por infeções resistentes a antimicrobianos (em milhões)?',
        correctValue: 1.27,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'million'
      }
    ]
  },
  {
    id: 'health-medicine-p09',
    topicId: 'health-medicine',
    title: 'O Sistema Nervoso: Compreender as Nossas Redes Neurais',
    difficulty: 'advanced',
    wordCount: 2619,
    articleType: 'practice',
    orderIndex: 9,
    content: `O sistema nervoso coordena todas as atividades do corpo humano através de uma rede intrincada de células especializadas que transmitem sinais elétricos e químicos a velocidades notáveis. Este sistema processa informação sensorial do ambiente, controla movimentos musculares, regula funções de órgãos e gera a experiência consciente que chamamos mente. Compreender como os neurónios funcionam revolucionou a medicina e aprofundou a nossa apreciação pela complexidade da biologia humana.

O sistema nervoso consiste em duas divisões principais que trabalham juntas de forma perfeita. O sistema nervoso central inclui o cérebro e a medula espinhal, servindo como centro de comando que processa informação e gera respostas. O sistema nervoso periférico compreende todos os nervos que se estendem por todo o corpo, transportando sinais entre o sistema nervoso central e músculos, órgãos e recetores sensoriais.

Os neurónios, as unidades fundamentais do sistema nervoso, totalizam aproximadamente 86 mil milhões apenas no cérebro humano. Cada neurónio consiste num corpo celular contendo o núcleo, dendrites que recebem sinais de outros neurónios e um axónio que transmite sinais a células-alvo. Alguns axónios estendem-se mais de um metro de comprimento, ligando a medula espinhal a músculos distantes nos pés.

Os sinais elétricos viajam ao longo dos neurónios através de um processo chamado propagação do potencial de ação. Em repouso, os neurónios mantêm uma carga elétrica negativa no interior relativamente ao exterior da membrana celular. Quando suficientemente estimulados, canais iónicos dependentes de voltagem abrem-se, permitindo que iões de sódio entrem precipitadamente e revertam o potencial de membrana. Esta despolarização viaja ao longo do axónio como uma onda, atingindo velocidades até 120 metros por segundo em neurónios mielinizados.

A mielina, uma substância gordurosa produzida por células da glia, envolve os axónios e aumenta dramaticamente a velocidade de transmissão de sinal. No sistema nervoso central, os oligodendrócitos produzem mielina, enquanto as células de Schwann desempenham esta função no sistema nervoso periférico. A esclerose múltipla, uma doença que afeta aproximadamente 2,8 milhões de pessoas em todo o mundo, resulta de ataques do sistema imunitário à mielina que perturbam a transmissão de sinais nervosos.

As sinapses são as junções onde os neurónios comunicam uns com os outros ou com células-alvo como músculos. Quando um potencial de ação atinge o fim de um axónio, desencadeia a libertação de mensageiros químicos chamados neurotransmissores. Estas moléculas atravessam o espaço sináptico e ligam-se a recetores na célula recetora, excitando-a a disparar ou inibindo a sua atividade. O cérebro humano contém um estimado de 100 triliões de ligações sinápticas.

Os neurotransmissores incluem uma variedade diversa de químicos com funções diferentes em todo o sistema nervoso. A dopamina desempenha papéis cruciais na motivação, recompensa e controlo de movimento, com a sua disfunção a contribuir para a doença de Parkinson e dependência. A serotonina regula o humor, sono e apetite, tornando-a alvo de muitos medicamentos antidepressivos. A acetilcolina controla a contração muscular e está envolvida na formação de memória no cérebro.

O cérebro exibe organização notável com diferentes regiões especializadas para funções diferentes. O córtex cerebral, a camada exterior enrugada que cobre o cérebro, contém os circuitos neurais para pensamento consciente, perceção sensorial, linguagem e movimento voluntário. O cerebelo coordena equilíbrio e controlo motor fino através de ligações com outras regiões cerebrais. O tronco cerebral regula funções vitais como respiração, ritmo cardíaco e ciclos de sono-vigília.

Paul Broca identificou uma região no lobo frontal esquerdo essencial para a produção da fala após estudar pacientes com défices de linguagem em 1861. Carl Wernicke descobriu outra região no lobo temporal esquerdo importante para a compreensão da linguagem em 1874. Estas descobertas demonstraram que regiões cerebrais específicas desempenham funções específicas, um princípio chamado localização que orienta a neurociência moderna.

O sistema límbico, uma coleção de estruturas profundas dentro do cérebro, gera emoções e processa memórias. A amígdala deteta ameaças e desencadeia respostas de medo que preparam o corpo para o perigo. O hipocampo converte memórias de curto prazo em armazenamento de longo prazo, explicando por que danos a esta estrutura causam deficiências graves de memória. O paciente H.M., cujo hipocampo foi removido cirurgicamente em 1953 para tratar epilepsia grave, tornou-se incapaz de formar novas memórias enquanto retinha as mais antigas.

A neuroplasticidade descreve a capacidade do cérebro de se reorganizar formando novas ligações neurais ao longo da vida. Esta capacidade permite recuperação de lesões, aprendizagem de novas competências e adaptação a circunstâncias em mudança. A investigação de Michael Merzenich e colegas na década de 1980 demonstrou que os cérebros adultos retêm muito mais plasticidade do que se acreditava anteriormente, abrindo novas possibilidades para reabilitação após AVC e outras lesões.

O sistema nervoso autónomo controla funções involuntárias como ritmo cardíaco, digestão e respiração sem esforço consciente. A divisão simpática ativa-se durante o stress, aumentando o ritmo cardíaco, dilatando as pupilas e desviando sangue para os músculos em preparação para a ação. A divisão parassimpática domina durante o descanso, desacelerando o coração, estimulando a digestão e promovendo o relaxamento. O equilíbrio entre estas divisões mantém a homeostase.

Os sistemas sensoriais traduzem estímulos físicos do ambiente em sinais neurais que o cérebro pode interpretar. O sistema visual processa luz que entra nos olhos através de uma hierarquia de estádios de processamento da retina ao córtex visual. O sistema auditivo converte ondas sonoras em sinais neurais começando na cóclea do ouvido interno. Recetores de tato, temperatura e dor por toda a pele enviam sinais através da medula espinhal para o córtex somatossensorial.

Os sistemas motores coordenam as centenas de músculos necessários para até movimentos simples. O córtex motor primário contém um mapa do corpo, com diferentes regiões a controlar músculos diferentes. Os gânglios basais ajudam a iniciar e coordenar movimentos voluntários, com a sua disfunção a causar os tremores e rigidez da doença de Parkinson. Aproximadamente 1 milhão de americanos vivem atualmente com a doença de Parkinson, um número que se espera duplicar até 2030.

O sono envolve mudanças dramáticas na atividade cerebral que servem funções essenciais ainda em compreensão. Durante o sono REM, o cérebro torna-se altamente ativo enquanto os músculos ficam temporariamente paralisados, um estado associado a sonhos vívidos. O sono de ondas lentas parece importante para consolidação de memória e restauração física. A privação de sono prejudica a função cognitiva, resposta imunitária e regulação emocional, demonstrando quão crucial este estado é para a saúde cerebral.

As doenças neurológicas afetam milhões de pessoas e representam desafios crescentes à medida que as populações envelhecem. A doença de Alzheimer afeta atualmente aproximadamente 6,7 milhões de americanos e causa perda progressiva de memória e declínio cognitivo através da acumulação de proteínas anormais no cérebro. O AVC, causado por vasos sanguíneos bloqueados ou rompidos no cérebro, é uma causa principal de incapacidade a longo prazo. A investigação sobre estas condições intensificou-se à medida que a sua prevalência aumenta.

A neurociência moderna emprega ferramentas cada vez mais sofisticadas para estudar o cérebro. A ressonância magnética funcional mede a atividade cerebral ao detetar mudanças no fluxo sanguíneo, revelando que regiões se ativam durante diferentes tarefas. A eletroencefalografia regista atividade elétrica na superfície do couro cabeludo, fornecendo informação temporal precisa sobre processos neurais. A optogenética, desenvolvida por Karl Deisseroth e colegas no início dos anos 2000, permite aos investigadores controlar neurónios específicos usando luz, permitindo precisão sem precedentes no estudo de circuitos cerebrais.

O sistema nervoso representa uma das realizações mais notáveis da natureza, permitindo aos organismos sentir o seu ambiente, tomar decisões e executar comportamentos coordenados. Apesar de tremendos avanços, muitos mistérios permanecem sobre como a atividade neural dá origem à consciência, emoção e pensamento. A investigação continuada promete compreensão mais profunda da natureza humana e melhores tratamentos para as condições neurológicas que afetam tantas vidas.`,
    questions: [
      {
        id: 'health-medicine-p09-q1',
        type: 'single_choice',
        question: 'Aproximadamente quantos neurónios existem no cérebro humano?',
        options: [
          '1 mil milhão',
          '10 mil milhões',
          '86 mil milhões',
          '200 mil milhões'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p09-q2',
        type: 'single_choice',
        question: 'Quem identificou uma região no lobo frontal esquerdo essencial para a produção da fala em 1861?',
        options: [
          'Carl Wernicke',
          'Paul Broca',
          'Michael Merzenich',
          'Karl Deisseroth'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p09-q3',
        type: 'multiple_select',
        question: 'Que neurotransmissores são mencionados no artigo? Selecione todas as opções aplicáveis.',
        options: [
          'Dopamina',
          'Serotonina',
          'Insulina',
          'Acetilcolina'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-p09-q4',
        type: 'true_false',
        question: 'A esclerose múltipla resulta de ataques do sistema imunitário à mielina.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p09-q5',
        type: 'numeric',
        question: 'Aproximadamente quantas pessoas em todo o mundo são afetadas pela esclerose múltipla (em milhões)?',
        correctValue: 2.8,
        tolerance: 0.3,
        min: 1,
        max: 5,
        step: 0.1,
        unit: 'million'
      },
      {
        id: 'health-medicine-p09-q6',
        type: 'single_choice',
        question: 'Qual é a função do hipocampo?',
        options: [
          'Detetar ameaças e desencadear medo',
          'Converter memórias de curto prazo em armazenamento de longo prazo',
          'Controlar a contração muscular',
          'Regular o ritmo cardíaco'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p09-q7',
        type: 'single_choice',
        question: 'O que faz o sistema nervoso simpático durante o stress?',
        options: [
          'Desacelera o ritmo cardíaco e estimula a digestão',
          'Aumenta o ritmo cardíaco e dilata as pupilas',
          'Promove o sono e relaxamento',
          'Reduz a pressão arterial'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p09-q8',
        type: 'numeric',
        question: 'Quantas ligações sinápticas são estimadas existir no cérebro humano (em triliões)?',
        correctValue: 100,
        tolerance: 10,
        min: 50,
        max: 200,
        step: 10,
        unit: 'trillion'
      },
      {
        id: 'health-medicine-p09-q9',
        type: 'true_false',
        question: 'O paciente H.M. foi capaz de formar novas memórias após a remoção do seu hipocampo.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-p09-q10',
        type: 'single_choice',
        question: 'O que é optogenética?',
        options: [
          'Uma técnica de imagem cerebral',
          'Um método para controlar neurónios específicos usando luz',
          'Um tratamento para a doença de Parkinson',
          'Um tipo de eletroencefalografia'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p09-q11',
        type: 'numeric',
        question: 'Quantos americanos vivem atualmente com a doença de Parkinson (em milhões)?',
        correctValue: 1,
        tolerance: 0.2,
        min: 0.5,
        max: 2,
        step: 0.1,
        unit: 'million'
      },
      {
        id: 'health-medicine-p09-q12',
        type: 'single_choice',
        question: 'A que velocidade máxima podem viajar sinais em neurónios mielinizados (metros por segundo)?',
        options: [
          '10 metros por segundo',
          '50 metros por segundo',
          '120 metros por segundo',
          '300 metros por segundo'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p09-q13',
        type: 'numeric',
        question: 'Quantos americanos são atualmente afetados pela doença de Alzheimer (em milhões)?',
        correctValue: 6.7,
        tolerance: 0.5,
        min: 4,
        max: 10,
        step: 0.1,
        unit: 'million'
      }
    ]
  },
  {
    id: 'health-medicine-p10',
    topicId: 'health-medicine',
    title: 'Imagem Médica: Ver Dentro do Corpo Humano',
    difficulty: 'advanced',
    wordCount: 2619,
    articleType: 'practice',
    orderIndex: 10,
    content: `As tecnologias de imagem médica transformaram o diagnóstico e tratamento ao permitir que os médicos vejam dentro do corpo humano sem cirurgia. Estas ferramentas revelam estruturas anatómicas, detetam doenças, orientam intervenções e monitorizam respostas ao tratamento com precisão e segurança crescentes. O desenvolvimento da imagiologia representa um dos maiores avanços da medicina, tendo conquistado múltiplos Prémios Nobel e salvado inúmeras vidas.

Wilhelm Conrad Röntgen descobriu os raios-X a 8 de novembro de 1895, em Würzburg, Alemanha, enquanto experimentava com tubos de raios catódicos. Notou que um ecrã fluorescente do outro lado da sala brilhava quando o seu tubo estava ativado, indicando que alguns raios invisíveis estavam a passar através de objetos. Em semanas, Röntgen produziu a primeira imagem de raios-X de uma parte do corpo humano, a mão da sua esposa Anna, mostrando claramente os seus ossos e anel de casamento. A descoberta valeu-lhe o primeiro Prémio Nobel de Física em 1901.

Os raios-X funcionam ao passar radiação eletromagnética através do corpo, com diferentes tecidos a absorver quantidades diferentes. Estruturas densas como os ossos absorvem mais raios-X e aparecem brancas nas imagens, enquanto os tecidos moles aparecem cinzentos e o ar aparece preto. Este contraste permite a deteção de fraturas, tumores, pneumonia e muitas outras condições. No entanto, a exposição a raios-X acarreta pequenos riscos de radiação que devem ser equilibrados com benefícios diagnósticos.

A tomografia computorizada, ou TAC, revolucionou a imagiologia ao produzir imagens transversais detalhadas do corpo. O engenheiro britânico Godfrey Hounsfield e o físico sul-africano Allan Cormack desenvolveram independentemente os princípios matemáticos e de engenharia por trás da TAC, partilhando o Prémio Nobel de Fisiologia ou Medicina em 1979. O primeiro scanner TAC clínico foi instalado no Hospital Atkinson Morley em Londres em 1971, e a tecnologia espalhou-se rapidamente por todo o mundo.

Os scanners TAC rodam fontes de raios-X em torno do paciente enquanto detetores medem a radiação que passa através de múltiplos ângulos. Os computadores reconstroem estas medições em imagens detalhadas de secções do corpo. Os scanners TAC modernos podem imagiar o corpo inteiro em segundos, produzindo reconstruções tridimensionais que revelam anatomia em detalhe notável. A TAC orienta agora inúmeras decisões médicas, desde estadiamento de cancro até avaliação de trauma até avaliação de artérias coronárias.

A ressonância magnética, ou RM, produz imagens detalhadas usando campos magnéticos poderosos e ondas de rádio em vez de radiação ionizante. O médico americano Raymond Damadian demonstrou em 1971 que tumores e tecidos normais têm propriedades magnéticas diferentes que poderiam ser usadas para diagnóstico. Paul Lauterbur e Peter Mansfield desenvolveram técnicas para criar imagens espaciais a partir destes sinais, partilhando o Prémio Nobel de Fisiologia ou Medicina em 2003.

Os scanners de RM colocam pacientes dentro de ímanes poderosos que alinham átomos de hidrogénio na água do corpo. Pulsos de rádio perturbam este alinhamento, e os átomos emitem sinais à medida que regressam ao seu estado original. Diferentes tecidos emitem sinais diferentes com base no seu conteúdo de água e ambiente químico, criando contraste que revela detalhes de tecidos moles invisíveis aos raios-X. A RM excele na imagiologia do cérebro, medula espinhal, articulações e muitas outras estruturas.

A imagiologia por ultrassom usa ondas sonoras de alta frequência para visualizar estruturas internas em tempo real sem exposição à radiação. Um transdutor envia pulsos sonoros para o corpo e deteta ecos que regressam das fronteiras dos tecidos. Ian Donald, um obstetra escocês, foi pioneiro do ultrassom médico na década de 1950 e publicou o primeiro artigo clínico sobre ultrassom obstétrico em 1958. Hoje, o ultrassom é o método padrão para monitorizar a gravidez e é amplamente usado para muitas outras aplicações.

A ecocardiografia aplica tecnologia de ultrassom especificamente ao coração, revelando tamanhos de câmaras, função valvular, padrões de fluxo sanguíneo e anomalias de movimento da parede. Os cardiologistas usam ecocardiografia para diagnosticar doença valvular cardíaca, insuficiência cardíaca, anomalias congénitas e muitas outras condições. A técnica é segura, amplamente disponível e pode ser realizada à cabeceira, tornando-a essencial para diagnóstico cardíaco.

A imagiologia de medicina nuclear deteta radiação emitida por marcadores radioativos injetados nos pacientes. A tomografia por emissão de positrões, ou PET, usa marcadores que emitem positrões, que produzem raios gama quando encontram eletrões. A PET revela atividade metabólica em vez de anatomia, tornando-a valiosa para detetar cancro, avaliar função cerebral e avaliar viabilidade cardíaca. Scanners PET-TAC combinados fundem informação metabólica e anatómica em exames únicos.

A imagiologia molecular representa a fronteira da visualização diagnóstica, revelando processos biológicos ao nível celular e molecular. Marcadores direcionados que se ligam a recetores ou enzimas específicos podem identificar processos de doença antes que mudanças anatómicas se tornem visíveis. Esta abordagem permite deteção mais precoce, caracterização mais precisa de doenças e monitorização de respostas ao tratamento ao nível molecular.

A radiologia de intervenção usa orientação por imagem para realizar procedimentos minimamente invasivos que outrora requeriam cirurgia aberta. A fluoroscopia fornece imagens de raios-X em tempo real que orientam a colocação de cateteres durante angioplastia, inserção de stent e outros procedimentos vasculares. A orientação por TAC permite colocação precisa de agulhas para biópsias e ablação de tumores. Estas técnicas reduzem tempos de recuperação, complicações e custos em comparação com cirurgia tradicional.

A inteligência artificial está a transformar a imagiologia médica através de algoritmos de aprendizagem automática que podem detetar anomalias, quantificar gravidade de doenças e prever resultados. Sistemas de aprendizagem profunda igualaram ou excederam radiologistas humanos na deteção de algumas condições, incluindo certos cancros e fraturas. Ferramentas de IA podem priorizar casos urgentes, reduzir tempos de interpretação e potencialmente melhorar a consistência entre diferentes leitores e instituições.

A segurança radiológica permanece uma consideração importante à medida que o volume de imagiologia continua a crescer. O americano médio recebe agora cerca de 3 milisieverts de exposição à radiação médica anualmente, aproximadamente igual à radiação natural de fundo. Estratégias de otimização de dose visam manter a qualidade de imagem enquanto minimizam a exposição à radiação. O princípio ALARA, significando tão baixo quanto razoavelmente alcançável, orienta decisões sobre utilização de imagiologia e seleção de técnica.

O custo e acesso apresentam desafios contínuos para tecnologias de imagiologia avançadas. Um único scanner de RM ou TAC custa vários milhões de dólares, com despesas contínuas substanciais para manutenção, suprimentos e pessoal. Estes custos contribuem para despesas de saúde e criam disparidades no acesso entre nações e comunidades ricas e pobres. Esforços para desenvolver alternativas de imagiologia de menor custo para regiões carenciadas continuam em todo o mundo.

O futuro da imagiologia médica promete inovação contínua em resolução, velocidade e especificidade. Detetores de TAC de contagem de fotões oferecem qualidade de imagem melhorada com doses de radiação mais baixas. Ímanes de RM de campo ultra-alto revelam estruturas cerebrais em detalhe sem precedentes. Sistemas de imagiologia híbridos combinam múltiplas tecnologias para fornecer informação complementar em exames únicos. Estes avanços expandirão ainda mais a capacidade dos médicos de ver dentro do corpo humano e compreender o que lá encontram.

A imagiologia médica exemplifica como a física e engenharia podem transformar a medicina quando aplicadas criativamente a problemas clínicos. Desde a descoberta acidental de Röntgen até à interpretação moderna melhorada por IA, este campo evoluiu continuamente para atender necessidades clínicas em mudança. A capacidade de ver dentro do corpo sem o abrir permanece uma das capacidades mais valiosas da medicina, orientando diagnóstico e tratamento para pacientes em todo o mundo.`,
    questions: [
      {
        id: 'health-medicine-p10-q1',
        type: 'single_choice',
        question: 'Quando Wilhelm Röntgen descobriu os raios-X?',
        options: [
          '15 de outubro de 1890',
          '8 de novembro de 1895',
          '1 de janeiro de 1901',
          '12 de março de 1910'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p10-q2',
        type: 'single_choice',
        question: 'Quem desenvolveu o scanner TAC e ganhou o Prémio Nobel em 1979?',
        options: [
          'Wilhelm Röntgen e Ian Donald',
          'Raymond Damadian e Peter Mansfield',
          'Godfrey Hounsfield e Allan Cormack',
          'Paul Lauterbur e Peter Mansfield'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p10-q3',
        type: 'multiple_select',
        question: 'Que tecnologias de imagiologia NÃO usam radiação ionizante? Selecione todas as opções aplicáveis.',
        options: [
          'RM',
          'TAC',
          'Ultrassom',
          'Raios-X'
        ],
        correctIndices: [
          0,
          2
        ]
      },
      {
        id: 'health-medicine-p10-q4',
        type: 'true_false',
        question: 'A RM usa campos magnéticos poderosos e ondas de rádio para criar imagens.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p10-q5',
        type: 'numeric',
        question: 'Em que ano foi instalado o primeiro scanner TAC clínico?',
        correctValue: 1971,
        tolerance: 0,
        min: 1960,
        max: 1980,
        step: 1,
        unit: 'year'
      },
      {
        id: 'health-medicine-p10-q6',
        type: 'single_choice',
        question: 'Quem foi pioneiro do ultrassom médico na década de 1950?',
        options: [
          'Raymond Damadian',
          'Ian Donald',
          'Paul Lauterbur',
          'Wilhelm Röntgen'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p10-q7',
        type: 'single_choice',
        question: 'O que revela a PET que é diferente da TAC ou RM?',
        options: [
          'Densidade óssea',
          'Anatomia dos vasos sanguíneos',
          'Atividade metabólica',
          'Elasticidade dos tecidos'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-p10-q8',
        type: 'numeric',
        question: 'Qual é a exposição média anual à radiação médica para americanos (em milisieverts)?',
        correctValue: 3,
        tolerance: 0.5,
        min: 1,
        max: 5,
        step: 0.5,
        unit: 'millisieverts'
      },
      {
        id: 'health-medicine-p10-q9',
        type: 'true_false',
        question: 'Raymond Damadian demonstrou em 1971 que tumores e tecidos normais têm propriedades magnéticas diferentes.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p10-q10',
        type: 'single_choice',
        question: 'O que significa ALARA em segurança radiológica?',
        options: [
          'Baixar Sempre Todas as Aplicações de Radiação',
          'Tão Baixo Quanto Razoavelmente Alcançável',
          'Limites Aplicados e Avaliação de Radiação',
          'Níveis Apropriados e Análise de Risco'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p10-q11',
        type: 'single_choice',
        question: 'Quem partilhou o Prémio Nobel em 2003 pelo desenvolvimento da RM?',
        options: [
          'Godfrey Hounsfield e Allan Cormack',
          'Paul Lauterbur e Peter Mansfield',
          'Raymond Damadian e Ian Donald',
          'Wilhelm Röntgen e Ian Donald'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-p10-q12',
        type: 'numeric',
        question: 'Em que ano Ian Donald publicou o primeiro artigo clínico sobre ultrassom obstétrico?',
        correctValue: 1958,
        tolerance: 1,
        min: 1950,
        max: 1970,
        step: 1,
        unit: 'year'
      },
      {
        id: 'health-medicine-p10-q13',
        type: 'true_false',
        question: 'Sistemas de aprendizagem profunda igualaram ou excederam radiologistas humanos na deteção de algumas condições.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-p10-q14',
        type: 'single_choice',
        question: 'O que é radiologia de intervenção?',
        options: [
          'Um tipo de radioterapia',
          'Usar orientação por imagem para procedimentos minimamente invasivos',
          'Um método para detetar cancro',
          'Uma técnica avançada de RM'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'health-medicine-c1',
    topicId: 'health-medicine',
    title: 'O Coração Humano: Motor da Vida',
    difficulty: 'intermediate',
    wordCount: 1087,
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    content: `O coração humano bate aproximadamente 100.000 vezes todos os dias, bombeando cerca de 7.500 litros de sangue através de 96.000 quilómetros de vasos sanguíneos. Este músculo notável trabalha continuamente desde antes do nascimento até à morte, adaptando-se às necessidades em mudança do corpo sem controlo consciente. Compreender como o coração funciona ajuda-nos a apreciar este órgão vital e a protegê-lo de doenças.

O coração tem aproximadamente o tamanho de um punho cerrado e pesa entre 250 e 350 gramas em adultos saudáveis. Situa-se ligeiramente à esquerda do centro do tórax, protegido pela caixa torácica e pelo esterno. O coração consiste em quatro câmaras que trabalham juntas num ritmo precisamente coordenado estabelecido por células elétricas especializadas.

As duas câmaras superiores, chamadas aurículas, recebem sangue que regressa ao coração. A aurícula direita recolhe sangue pobre em oxigénio do corpo através de duas grandes veias chamadas veia cava superior e inferior. A aurícula esquerda recebe sangue rico em oxigénio que regressa dos pulmões através de quatro veias pulmonares. Estas câmaras têm paredes relativamente finas, uma vez que apenas precisam de empurrar sangue para os ventrículos abaixo.

As duas câmaras inferiores, chamadas ventrículos, fazem o trabalho pesado de bombeamento. O ventrículo direito empurra sangue para os pulmões, onde capta oxigénio e liberta dióxido de carbono. O ventrículo esquerdo bombeia sangue rico em oxigénio para todos os órgãos e tecidos do corpo. O ventrículo esquerdo tem paredes muito mais espessas porque deve gerar pressão suficiente para enviar sangue por todo o sistema circulatório.

Quatro válvulas garantem que o sangue flui apenas numa direção através do coração. A válvula tricúspide separa a aurícula direita do ventrículo direito, enquanto a válvula mitral desempenha a mesma função no lado esquerdo. As válvulas pulmonar e aórtica controlam o sangue que sai do coração. Quando estas válvulas se fecham, criam o som familiar tum-tum que reconhecemos como batimento cardíaco.

O sistema elétrico do coração controla a temporização de cada batimento com precisão notável. O nódulo sinoauricular, localizado na aurícula direita, serve como pacemaker natural. Este aglomerado de células especializadas gera impulsos elétricos cerca de 60 a 100 vezes por minuto num adulto em repouso. Estes impulsos espalham-se pelas aurículas, fazendo-as contrair e empurrar sangue para os ventrículos.

Após um breve atraso no nódulo auriculoventricular, que permite que os ventrículos se encham completamente, o sinal elétrico viaja por fibras especializadas chamadas feixe de His. Estas fibras dividem-se em ramos esquerdo e direito que se espalham pelas paredes ventriculares. Esta ativação elétrica coordenada faz com que os ventrículos se contraiam poderosamente e simultaneamente, ejetando sangue para as artérias.

William Harvey, um médico inglês, descreveu pela primeira vez a circulação do sangue em 1628 após anos de observação e experimentação cuidadosas. O seu trabalho contrariou séculos de crença médica estabelecida por Galeno, que pensava que o sangue era continuamente produzido e consumido pelo corpo. Harvey demonstrou que o sangue circula num circuito fechado, regressando ao coração para ser bombeado novamente.

As artérias coronárias fornecem ao próprio músculo cardíaco oxigénio e nutrientes. A artéria coronária esquerda divide-se em dois ramos principais que fornecem o lado esquerdo e a frente do coração. A artéria coronária direita fornece o ventrículo direito e a parte inferior do coração. Bloqueios nestas artérias causam ataques cardíacos, que matam porções de músculo cardíaco privadas de fluxo sanguíneo.

As doenças cardíacas continuam a ser a principal causa de morte em todo o mundo, reclamando aproximadamente 18 milhões de vidas todos os anos segundo a Organização Mundial de Saúde. Os fatores de risco incluem pressão arterial alta, colesterol elevado, tabagismo, diabetes, obesidade e inatividade física. Muitos destes fatores respondem a mudanças no estilo de vida, incluindo modificação da dieta e exercício regular.

A medicina moderna desenvolveu tratamentos notáveis para doenças cardíacas. Medicamentos podem controlar a pressão arterial, baixar o colesterol e prevenir coágulos sanguíneos. Procedimentos como a angioplastia abrem artérias bloqueadas usando pequenos balões e stents metálicos. A cirurgia de bypass cria novas rotas para o fluxo sanguíneo contornar artérias coronárias bloqueadas usando vasos retirados de outras partes do corpo.

O primeiro transplante cardíaco humano bem-sucedido foi realizado pelo Dr. Christiaan Barnard na Cidade do Cabo, África do Sul, a 3 de dezembro de 1967. O paciente, Louis Washkansky, recebeu o coração de uma jovem mulher que tinha morrido num acidente de carro. Embora Washkansky tenha vivido apenas 18 dias, esta cirurgia pioneira demonstrou que o transplante cardíaco era possível e abriu a porta à medicina de transplante moderna.

Cuidar do seu coração requer atenção aos hábitos diários. O exercício aeróbico regular fortalece o músculo cardíaco e melhora a sua eficiência. Uma dieta rica em frutas, vegetais, cereais integrais e proteínas magras apoia a saúde cardiovascular. Evitar o tabaco, limitar o álcool, gerir o stress e manter um peso saudável reduzem significativamente o risco de doenças cardíacas.`,
    questions: [
      {
        id: 'health-medicine-c1-q1',
        type: 'single_choice',
        question: 'Qual câmara do coração tem as paredes mais espessas?',
        options: [
          'Aurícula direita',
          'Aurícula esquerda',
          'Ventrículo direito',
          'Ventrículo esquerdo'
        ],
        correctIndex: 3
      },
      {
        id: 'health-medicine-c1-q2',
        type: 'multiple_select',
        question: 'Quais são fatores de risco para doenças cardíacas mencionados no artigo? Selecione todas as opções aplicáveis.',
        options: [
          'Pressão arterial alta',
          'Colesterol baixo',
          'Tabagismo',
          'Inatividade física'
        ],
        correctIndices: [
          0,
          2,
          3
        ]
      },
      {
        id: 'health-medicine-c1-q3',
        type: 'true_false',
        question: 'William Harvey descobriu que o sangue é continuamente produzido e consumido pelo corpo.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-c1-q4',
        type: 'numeric',
        question: 'Aproximadamente quantas vezes o coração humano bate todos os dias?',
        correctValue: 100000,
        tolerance: 10000,
        min: 50000,
        max: 200000,
        step: 10000,
        unit: 'batimentos'
      },
      {
        id: 'health-medicine-c1-q5',
        type: 'single_choice',
        question: 'Quem realizou o primeiro transplante cardíaco humano bem-sucedido?',
        options: [
          'William Harvey',
          'Louis Pasteur',
          'Christiaan Barnard',
          'Jonas Salk'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c1-q6',
        type: 'single_choice',
        question: 'O que serve como pacemaker natural do coração?',
        options: [
          'O nódulo auriculoventricular',
          'O nódulo sinoauricular',
          'O feixe de His',
          'A válvula mitral'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c1-q7',
        type: 'numeric',
        question: 'Em que ano William Harvey descreveu pela primeira vez a circulação do sangue?',
        correctValue: 1628,
        tolerance: 0,
        min: 1500,
        max: 1800,
        step: 1,
        unit: 'ano'
      }
    ]
  },
  {
    id: 'health-medicine-c2',
    topicId: 'health-medicine',
    title: 'Cancro: Compreender e Combater a Doença',
    difficulty: 'intermediate',
    wordCount: 2257,
    articleType: 'certification',
    orderIndex: 2,
    certificationLength: 'medium',
    content: `O cancro permanece um dos desafios de saúde mais formidáveis da humanidade, afetando milhões de vidas em todo o mundo todos os anos. Esta coleção de doenças ocorre quando as células crescem descontroladamente e se espalham para tecidos circundantes, perturbando as funções corporais normais. Compreender o cancro requer conhecimento de biologia celular, genética e o notável progresso que os investigadores fizeram no desenvolvimento de tratamentos ao longo do século passado.

A Sociedade Americana do Cancro estima que aproximadamente 1,9 milhões de novos casos de cancro foram diagnosticados nos Estados Unidos em 2023, com cerca de 609.000 mortes pela doença. O cancro classifica-se como a segunda principal causa de morte na maioria dos países desenvolvidos, ficando apenas atrás das doenças cardíacas. No entanto, as taxas de sobrevivência melhoraram dramaticamente nas últimas décadas graças aos avanços na deteção, tratamento e estratégias de prevenção.

O cancro desenvolve-se através de um processo de múltiplas etapas que normalmente leva anos ou décadas a completar. As células normais crescem, dividem-se e morrem de acordo com programas genéticos rigidamente regulados. O cancro começa quando mutações se acumulam em genes que controlam estes processos. Os oncogenes, quando ativados, impulsionam o crescimento celular excessivo. Os genes supressores tumorais, quando inativados, removem travões cruciais na divisão celular. A maioria dos cancros requer mutações em múltiplos genes antes de se tornarem malignos.

Os fatores ambientais causam muitas das mutações que levam ao cancro. O fumo do tabaco contém mais de 70 carcinogénios conhecidos que danificam o ADN nos pulmões, garganta e outros tecidos. O relatório do Cirurgião-Geral de 1964 ligou definitivamente o tabagismo ao cancro do pulmão, levando eventualmente a campanhas de saúde pública que reduziram as taxas de tabagismo em muitos países. A radiação ultravioleta da luz solar danifica o ADN das células da pele, causando melanoma e outros cancros de pele. Químicos industriais, certos vírus e exposição à radiação também aumentam o risco de cancro.

Os fatores hereditários são responsáveis por aproximadamente 5 a 10 por cento de todos os cancros. As mutações nos genes BRCA1 e BRCA2 aumentam dramaticamente os riscos de cancro da mama e ovário. A atriz Angelina Jolie trouxe atenção a estes genes em maio de 2013 quando discutiu publicamente a sua mastectomia preventiva após testar positivo para BRCA1. A síndrome de Lynch causa suscetibilidade hereditária ao cancro colorretal e vários outros cancros. Os testes genéticos podem identificar indivíduos em alto risco que podem beneficiar de vigilância aumentada ou intervenções preventivas.

O sistema imunitário normalmente reconhece e destrói células anormais, mas as células cancerígenas desenvolvem mecanismos para escapar à deteção imunitária. Podem exibir menos marcadores identificadores nas suas superfícies ou libertar químicos que suprimem respostas imunitárias. Compreender estas estratégias de evasão levou a tratamentos revolucionários de imunoterapia que restauram a capacidade do sistema imunitário de combater o cancro.

A cirurgia permanece o tratamento primário para muitos tumores sólidos e pode curar o cancro quando detetado precocemente antes de se espalhar para outras localizações. Médicos egípcios antigos descreveram a remoção cirúrgica de tumores no Papiro de Edwin Smith por volta de 1600 a.C. As técnicas cirúrgicas modernas permitem a remoção precisa de tumores preservando o tecido saudável circundante. Os cirurgiões também podem remover gânglios linfáticos próximos para verificar a propagação do cancro e prevenir a recorrência.

A radioterapia usa feixes de alta energia para danificar o ADN das células cancerígenas, impedindo-as de se dividir. Wilhelm Röntgen descobriu os raios X em novembro de 1895, e os médicos começaram a usar radiação para tratar cancro em meses. A radioterapia moderna pode atingir tumores com precisão minimizando danos aos tecidos circundantes. Os aceleradores lineares fornecem radiação de múltiplos ângulos, concentrando a dose onde os feixes se intersetam no tumor.

A quimioterapia usa fármacos que matam células em rápida divisão por todo o corpo. Os primeiros agentes de quimioterapia emergiram da investigação sobre gás mostarda da Segunda Guerra Mundial, que foi encontrado a suprimir a atividade da medula óssea. Sidney Farber alcançou a primeira remissão de leucemia infantil usando aminopterina em 1948 no Hospital Infantil de Boston. Hoje, dezenas de fármacos de quimioterapia atacam células cancerígenas através de vários mecanismos, embora os efeitos secundários permaneçam significativos porque os fármacos também afetam células normais em rápida divisão.

As terapias direcionadas atacam características moleculares específicas das células cancerígenas poupando células normais. O fármaco imatinib, aprovado em maio de 2001, revolucionou o tratamento da leucemia mieloide crónica bloqueando uma proteína anormal específica que impulsiona a doença. Quase 90 por cento dos pacientes com esta leucemia outrora fatal sobrevivem agora a longo prazo com tratamento com imatinib. Os investigadores desenvolveram desde então fármacos direcionados para muitos outros cancros com vulnerabilidades moleculares específicas.

A imunoterapia emergiu como a fronteira mais emocionante no tratamento do cancro nos últimos anos. Os inibidores de pontos de controlo removem travões moleculares que as células cancerígenas usam para escapar ao ataque imunitário. James Allison no MD Anderson Cancer Center e Tasuku Honjo na Universidade de Quioto descobriram independentemente estes mecanismos de pontos de controlo nos anos 1990. O seu trabalho valeu-lhes o Prémio Nobel de Fisiologia ou Medicina em 2018. Os inibidores de pontos de controlo produziram remissões duradouras em pacientes com melanoma avançado, cancro do pulmão e vários outros tipos de tumor.

A terapia com células CAR-T representa outro avanço de imunoterapia que engenharia células imunitárias dos próprios pacientes para combater o cancro. Os cientistas removem células T do sangue de um paciente e modificam-nas geneticamente para reconhecer células cancerígenas. Após multiplicar estas células modificadas em laboratório, os médicos infundem-nas de volta no paciente. A FDA aprovou a primeira terapia CAR-T para leucemia infantil em agosto de 2017 após ensaios clínicos mostrarem taxas de resposta notáveis em pacientes que tinham falhado outros tratamentos.

Os programas de rastreio do cancro detetam cancros mais cedo quando são mais tratáveis. A mamografia reduz as mortes por cancro da mama identificando tumores antes de se espalharem. A colonoscopia pode prevenir o cancro colorretal removendo pólipos pré-cancerosos. Os testes de Papanicolau reduziram dramaticamente as mortes por cancro cervical desde a sua introdução por George Papanicolaou nos anos 1940. A vacinação contra o HPV previne agora as infeções que causam a maioria dos cancros cervicais.

A prevenção permanece a estratégia mais eficaz contra muitos cancros. Não fumar previne aproximadamente 30 por cento de todas as mortes por cancro. Manter um peso saudável através de dieta e exercício reduz os riscos de muitos tipos de cancro. Limitar o consumo de álcool, proteger a pele da exposição solar e evitar carcinogénios conhecidos diminuem o risco de cancro. A vacinação contra hepatite B e papilomavírus humano previne cancros do fígado e cervicais, respetivamente.

O tratamento do cancro envolve cada vez mais abordagens personalizadas baseadas nas características específicas do tumor de cada paciente. A sequenciação genética pode identificar mutações que sugerem quais tratamentos serão mais eficazes. As biópsias líquidas detetam ADN cancerígeno em amostras de sangue, permitindo monitorização da resposta ao tratamento sem procedimentos invasivos. A inteligência artificial ajuda patologistas a analisar amostras de tecido e identificar padrões subtis que preveem resultados.

O fardo económico do cancro é impressionante, com custos de tratamento excedendo 200 mil milhões de dólares anualmente apenas nos Estados Unidos. Muitos pacientes enfrentam dificuldades financeiras com despesas de tratamento, perda de rendimento e custos relacionados. Os debates sobre políticas de saúde continuam sobre como equilibrar incentivos à inovação com acesso acessível a fármacos oncológicos, alguns dos quais custam mais de 100.000 dólares por ano.

Apesar do tremendo progresso, a investigação do cancro ainda enfrenta desafios enormes. A heterogeneidade tumoral significa que as células cancerígenas dentro de um único paciente podem ter mutações diferentes, permitindo que algumas sobrevivam a tratamentos que matam outras. O cancro metastático, que se espalhou para locais distantes, permanece em grande parte incurável para a maioria dos tipos de tumor. A resistência aos fármacos desenvolve-se quando as células cancerígenas evoluem mecanismos para sobreviver ao tratamento.

As últimas décadas transformaram o cancro de um diagnóstico uniformemente fatal numa condição crónica manejável para muitos pacientes. As taxas de sobrevivência a cinco anos para todos os cancros combinados aumentaram de aproximadamente 50 por cento nos anos 1970 para mais de 68 por cento hoje. Alguns cancros que outrora eram sentenças de morte têm agora taxas de cura excedendo 90 por cento quando apanhados cedo. A investigação e investimento contínuos oferecem esperança de que as gerações futuras verão ainda maior progresso contra este inimigo antigo.`,
    questions: [
      {
        id: 'health-medicine-c2-q1',
        type: 'single_choice',
        question: 'Que percentagem de cancros é causada por fatores hereditários?',
        options: [
          '1 a 2 por cento',
          '5 a 10 por cento',
          '20 a 30 por cento',
          '40 a 50 por cento'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c2-q2',
        type: 'single_choice',
        question: 'Quem alcançou a primeira remissão de leucemia infantil usando quimioterapia?',
        options: [
          'Wilhelm Röntgen',
          'George Papanicolaou',
          'Sidney Farber',
          'James Allison'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c2-q3',
        type: 'multiple_select',
        question: 'Quais são fatores ambientais que podem causar cancro? Selecione todas as opções aplicáveis.',
        options: [
          'Fumo do tabaco',
          'Radiação ultravioleta',
          'Mutações no gene BRCA',
          'Certos vírus'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-c2-q4',
        type: 'true_false',
        question: 'Os inibidores de pontos de controlo funcionam matando diretamente células cancerígenas com radiação.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-c2-q5',
        type: 'numeric',
        question: 'Em que ano foi lançado o relatório do Cirurgião-Geral ligando o tabagismo ao cancro do pulmão?',
        correctValue: 1964,
        tolerance: 0,
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'ano'
      },
      {
        id: 'health-medicine-c2-q6',
        type: 'single_choice',
        question: 'Que fármaco revolucionou o tratamento da leucemia mieloide crónica?',
        options: [
          'Aminopterina',
          'Imatinib',
          'Metotrexato',
          'Cisplatina'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c2-q7',
        type: 'single_choice',
        question: 'O que faz a terapia com células CAR-T?',
        options: [
          'Usa radiação para matar células cancerígenas',
          'Remove tumores cirurgicamente',
          'Engenharia células imunitárias dos pacientes para combater o cancro',
          'Bloqueia o fornecimento de sangue aos tumores'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c2-q8',
        type: 'multiple_select',
        question: 'Quem ganhou o Prémio Nobel em 2018 pelas descobertas que levaram à terapia com inibidores de pontos de controlo? Selecione todas as opções aplicáveis.',
        options: [
          'Sidney Farber',
          'James Allison',
          'George Papanicolaou',
          'Tasuku Honjo'
        ],
        correctIndices: [
          1,
          3
        ]
      },
      {
        id: 'health-medicine-c2-q9',
        type: 'numeric',
        question: 'Aproximadamente que percentagem de mortes por cancro poderia ser prevenida não fumando?',
        correctValue: 30,
        tolerance: 5,
        min: 10,
        max: 50,
        step: 5,
        unit: 'percentagem'
      },
      {
        id: 'health-medicine-c2-q10',
        type: 'true_false',
        question: 'A FDA aprovou a primeira terapia CAR-T em agosto de 2017.',
        correctAnswer: true
      }
    ]
  },
  {
    id: 'health-medicine-c3',
    topicId: 'health-medicine',
    title: 'Saúde Mental: Compreender a Mente e as Suas Perturbações',
    difficulty: 'advanced',
    wordCount: 3383,
    articleType: 'certification',
    orderIndex: 3,
    certificationLength: 'long',
    content: `As condições de saúde mental afetam centenas de milhões de pessoas em todo o mundo, influenciando pensamentos, emoções, comportamentos e relacionamentos de formas que podem ser profundamente incapacitantes. Estas perturbações resultam de interações complexas entre fatores biológicos, psicológicos e sociais que os cientistas estão apenas a começar a compreender completamente. Os avanços na neurociência e psicologia transformaram o tratamento, mas o estigma e o acesso limitado aos cuidados permanecem barreiras significativas para muitos que precisam de ajuda.

A Organização Mundial de Saúde estima que aproximadamente mil milhões de pessoas em todo o mundo vivem atualmente com uma perturbação mental. A depressão afeta mais de 280 milhões de pessoas globalmente e classifica-se entre as principais causas de incapacidade. As perturbações de ansiedade afetam aproximadamente 301 milhões de pessoas, manifestando-se como preocupação excessiva, ataques de pânico e comportamentos de evitação. Estas condições causam imenso sofrimento e custos económicos substanciais através de produtividade perdida e despesas com cuidados de saúde.

A história do tratamento da saúde mental inclui muitos capítulos sombrios que as abordagens modernas procuraram corrigir. Antes do desenvolvimento de medicamentos eficazes, as pessoas com doença mental grave enfrentavam frequentemente confinamento em asilos com benefício terapêutico mínimo. Tratamentos incluindo a lobotomia, realizada pela primeira vez pelo neurologista português António Egas Moniz em 1935, causaram danos cerebrais irreversíveis enquanto ocasionalmente produziam melhoria temporária dos sintomas. O movimento de desinstitucionalização dos anos 1960 e 1970 fechou muitos hospitais psiquiátricos mas frequentemente falhou em fornecer alternativas adequadas baseadas na comunidade.

A descoberta da clorpromazina em 1950 pela empresa farmacêutica francesa Rhône-Poulenc marcou o início da farmacologia psiquiátrica moderna. Henri Laborit, um cirurgião francês, reconheceu primeiro os seus efeitos sedativos e psicológicos, levando a ensaios em pacientes psiquiátricos. Jean Delay e Pierre Deniker no Hospital Sainte-Anne em Paris demonstraram a sua eficácia para a esquizofrenia em 1952. Este avanço mostrou que a doença mental podia ser tratada com medicamentos, transformando as possibilidades terapêuticas do campo.

Os medicamentos antidepressivos emergiram no final dos anos 1950 através de duas descobertas paralelas. A iproniazida, originalmente desenvolvida para tratar tuberculose, foi encontrada a melhorar o humor em alguns pacientes em 1957. A imipramina, sintetizada pela empresa farmacêutica suíça Geigy, provou-se eficaz para a depressão após os ensaios clínicos de Roland Kuhn em 1958. Estes medicamentos funcionavam através de mecanismos diferentes, lançando a investigação sobre a base neuroquímica da depressão que continua hoje.

A hipótese monoaminérgica propôs que a depressão resulta de deficiências em neurotransmissores incluindo serotonina, noradrenalina e dopamina. Esta teoria orientou o desenvolvimento de inibidores seletivos da recaptação da serotonina, ou ISRS, que ficaram disponíveis começando com a fluoxetina em 1987. Os ISRS ofereceram segurança melhorada comparada aos antidepressivos anteriores e tornaram-se entre os medicamentos mais amplamente prescritos no mundo. No entanto, a hipótese monoaminérgica é agora reconhecida como excessivamente simplificada, e muitos pacientes não respondem adequadamente a estes medicamentos.

A psicoterapia fornece tratamento eficaz para muitas condições de saúde mental sozinha ou combinada com medicação. Sigmund Freud desenvolveu a psicanálise em Viena durante o final do século XIX, enfatizando conflitos inconscientes e experiências da primeira infância. Embora muitas das teorias específicas de Freud tenham sido questionadas, o seu reconhecimento de que fatores psicológicos influenciam a saúde mental moldou fundamentalmente o campo.

A terapia cognitivo-comportamental, desenvolvida por Aaron Beck nos anos 1960, concentra-se em identificar e mudar padrões de pensamento negativos que contribuem para o sofrimento emocional. Ensaios clínicos demonstraram a eficácia da TCC para depressão, perturbações de ansiedade, perturbações alimentares e muitas outras condições. O tratamento normalmente requer 12 a 20 sessões e ensina competências que os pacientes podem continuar a aplicar independentemente. Beck desenvolveu a abordagem inicialmente para depressão após observar que os seus pacientes relatavam padrões consistentes de pensamentos automáticos negativos.

As perturbações de ansiedade englobam várias condições distintas que partilham medo ou preocupação excessivos como características centrais. A perturbação de ansiedade generalizada envolve preocupação persistente sobre múltiplos domínios da vida que é difícil de controlar. A perturbação de pânico causa episódios súbitos de medo intenso com sintomas físicos incluindo batimento cardíaco rápido, sudorese e dificuldade em respirar. A perturbação de ansiedade social cria medo intenso de situações sociais onde se pode ser negativamente avaliado por outros. As fobias específicas envolvem medo excessivo de objetos ou situações particulares como alturas, aranhas ou espaços fechados.

A perturbação de stress pós-traumático desenvolve-se em algumas pessoas após exposição a trauma grave incluindo combate, agressão, acidentes ou desastres naturais. Os sintomas incluem memórias intrusivas, pesadelos, evitação de lembretes do trauma, mudanças de humor negativas e respostas de alerta aumentadas. A condição afeta aproximadamente 3,5 por cento dos americanos todos os anos, com prevalência ao longo da vida em torno de 7 por cento. As mulheres são aproximadamente duas vezes mais propensas que os homens a desenvolver PTSD após exposição ao trauma.

A esquizofrenia afeta aproximadamente 24 milhões de pessoas em todo o mundo e causa perturbações profundas no pensamento, perceção, emoções e comportamento. Os sintomas positivos incluem alucinações, delírios e discurso desorganizado. Os sintomas negativos incluem expressão emocional reduzida, motivação diminuída e retraimento social. A perturbação normalmente emerge no final da adolescência ou início da idade adulta e frequentemente segue um curso crónico que requer gestão a longo prazo.

A perturbação bipolar envolve episódios de mania ou hipomania alternando com depressão. Os episódios maníacos incluem humor elevado, necessidade diminuída de sono, pensamentos acelerados e comportamento arriscado. A condição afeta aproximadamente 40 milhões de pessoas em todo o mundo. Kay Redfield Jamison, uma psicóloga na Universidade Johns Hopkins que ela própria tem perturbação bipolar, escreveu obras influentes explorando a relação da condição com a criatividade enquanto documenta os seus efeitos devastadores.

As perturbações alimentares incluindo anorexia nervosa, bulimia nervosa e perturbação de ingestão alimentar compulsiva envolvem perturbações sérias no comportamento alimentar e pensamentos e emoções relacionados. A anorexia nervosa tem a taxa de mortalidade mais alta de qualquer perturbação psiquiátrica, com aproximadamente 5 por cento dos afetados morrendo de complicações médicas ou suicídio. Estas condições desenvolvem-se mais comumente durante a adolescência e afetam predominantemente mulheres, embora os homens também possam ser afetados.

As perturbações de uso de substâncias envolvem uso compulsivo de álcool, drogas ou outras substâncias apesar de consequências prejudiciais. A epidemia de opioides nos Estados Unidos matou mais de 500.000 pessoas desde 1999 através de mortes por overdose. As abordagens de tratamento incluem medicamentos como metadona e buprenorfina para dependência de opioides, juntamente com terapias comportamentais abordando fatores psicológicos subjacentes. Programas de doze passos como Alcoólicos Anónimos fornecem apoio de pares que muitos consideram essencial para a recuperação.

O suicídio reclama aproximadamente 700.000 vidas globalmente todos os anos, tornando-o uma grande preocupação de saúde pública. Os homens morrem por suicídio a taxas mais altas que as mulheres na maioria dos países, embora as mulheres tentem suicídio com mais frequência. Os fatores de risco incluem tentativas anteriores, perturbações mentais, abuso de substâncias, acesso a meios letais e perdas ou crises recentes. As estratégias de prevenção incluem restringir o acesso a meios, promover comportamento de busca de ajuda e treinar profissionais de saúde para reconhecer sinais de aviso.

O estigma permanece uma barreira significativa ao tratamento da saúde mental. As pessoas com doença mental enfrentam frequentemente discriminação no emprego, habitação e relacionamentos sociais. O medo de ser rotulado pode impedir indivíduos de procurar ajuda ou divulgar as suas condições a outros. As campanhas anti-estigma enfatizam que as perturbações mentais são condições médicas tratáveis em vez de falhas pessoais ou defeitos de caráter.

O acesso aos serviços de saúde mental varia dramaticamente entre regiões e grupos socioeconómicos. Em países de baixo rendimento, pode haver apenas um psiquiatra por milhão de pessoas, comparado com mais de 100 por milhão em países de alto rendimento. Mesmo em nações ricas, muitos não podem pagar o tratamento ou enfrentam longas esperas por consultas. A telessaúde expandiu o acesso durante a pandemia de COVID-19 e pode permanentemente mudar como os serviços de saúde mental são prestados.

A investigação continua a avançar a compreensão da saúde mental e a desenvolver novos tratamentos. Os estudos de imagem cerebral revelam diferenças estruturais e funcionais associadas a várias perturbações. Os estudos genéticos identificam variantes de risco que influenciam a vulnerabilidade à doença mental. Os compostos psicodélicos incluindo psilocibina e MDMA estão a ser investigados como tratamentos potenciais para depressão e PTSD após décadas de proibição de investigação. A cetamina e esketamina receberam aprovação para depressão resistente ao tratamento, funcionando através de mecanismos diferentes dos antidepressivos tradicionais.

A saúde mental é cada vez mais reconhecida como essencial ao bem-estar e funcionamento gerais em vez de uma preocupação separada da saúde física. A conexão mente-corpo significa que fatores psicológicos influenciam a saúde física enquanto condições físicas afetam estados mentais. Os modelos de cuidados integrados abordam necessidades de saúde mental e física juntos. Promover a saúde mental ao longo da vida, desde a primeira infância até à velhice, beneficia indivíduos e comunidades igualmente.`,
    questions: [
      {
        id: 'health-medicine-c3-q1',
        type: 'single_choice',
        question: 'Quantas pessoas em todo o mundo vivem com uma perturbação mental segundo a OMS?',
        options: [
          'Aproximadamente 100 milhões',
          'Aproximadamente 500 milhões',
          'Aproximadamente mil milhões',
          'Aproximadamente dois mil milhões'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c3-q2',
        type: 'single_choice',
        question: 'Quem realizou a primeira lobotomia em 1935?',
        options: [
          'Henri Laborit',
          'Aaron Beck',
          'António Egas Moniz',
          'Roland Kuhn'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c3-q3',
        type: 'multiple_select',
        question: 'Quais neurotransmissores estão envolvidos na hipótese monoaminérgica da depressão? Selecione todas as opções aplicáveis.',
        options: [
          'Serotonina',
          'Noradrenalina',
          'Acetilcolina',
          'Dopamina'
        ],
        correctIndices: [
          0,
          1,
          3
        ]
      },
      {
        id: 'health-medicine-c3-q4',
        type: 'true_false',
        question: 'A terapia cognitivo-comportamental foi desenvolvida por Sigmund Freud em Viena.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-c3-q5',
        type: 'numeric',
        question: 'Quantas pessoas globalmente a depressão afeta (em milhões)?',
        correctValue: 280,
        tolerance: 30,
        min: 200,
        max: 400,
        step: 10,
        unit: 'milhões'
      },
      {
        id: 'health-medicine-c3-q6',
        type: 'single_choice',
        question: 'Quando foi demonstrado que a clorpromazina era eficaz para a esquizofrenia?',
        options: [
          '1935',
          '1950',
          '1952',
          '1987'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c3-q7',
        type: 'single_choice',
        question: 'Quem desenvolveu a terapia cognitivo-comportamental nos anos 1960?',
        options: [
          'Sigmund Freud',
          'Aaron Beck',
          'Jean Delay',
          'Kay Redfield Jamison'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c3-q8',
        type: 'numeric',
        question: 'Aproximadamente quantas pessoas em todo o mundo são afetadas pela esquizofrenia (em milhões)?',
        correctValue: 24,
        tolerance: 3,
        min: 10,
        max: 40,
        step: 1,
        unit: 'milhões'
      },
      {
        id: 'health-medicine-c3-q9',
        type: 'true_false',
        question: 'A anorexia nervosa tem a taxa de mortalidade mais alta de qualquer perturbação psiquiátrica.',
        correctAnswer: true
      },
      {
        id: 'health-medicine-c3-q10',
        type: 'single_choice',
        question: 'Quando ficou disponível a fluoxetina, o primeiro ISRS?',
        options: [
          '1958',
          '1972',
          '1987',
          '1995'
        ],
        correctIndex: 2
      },
      {
        id: 'health-medicine-c3-q11',
        type: 'multiple_select',
        question: 'Quais são sintomas positivos da esquizofrenia? Selecione todas as opções aplicáveis.',
        options: [
          'Alucinações',
          'Expressão emocional reduzida',
          'Delírios',
          'Discurso desorganizado'
        ],
        correctIndices: [
          0,
          2,
          3
        ]
      },
      {
        id: 'health-medicine-c3-q12',
        type: 'numeric',
        question: 'Quantas vidas a epidemia de opioides nos Estados Unidos reclamou desde 1999 (em milhares)?',
        correctValue: 500,
        tolerance: 50,
        min: 300,
        max: 700,
        step: 50,
        unit: 'milhares'
      },
      {
        id: 'health-medicine-c3-q13',
        type: 'single_choice',
        question: 'Qual é a prevalência ao longo da vida aproximada de PTSD em americanos?',
        options: [
          'Cerca de 3 por cento',
          'Cerca de 7 por cento',
          'Cerca de 15 por cento',
          'Cerca de 25 por cento'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c3-q14',
        type: 'numeric',
        question: 'Aproximadamente quantas vidas são reclamadas pelo suicídio globalmente todos os anos (em milhares)?',
        correctValue: 700,
        tolerance: 50,
        min: 500,
        max: 1000,
        step: 50,
        unit: 'milhares'
      },
      {
        id: 'health-medicine-c3-q15',
        type: 'true_false',
        question: 'As mulheres morrem por suicídio a taxas mais altas que os homens na maioria dos países.',
        correctAnswer: false
      },
      {
        id: 'health-medicine-c3-q16',
        type: 'single_choice',
        question: 'Quais tratamentos estão a ser investigados para depressão e PTSD após décadas de proibição?',
        options: [
          'ISRS e IMAO',
          'Psilocibina e MDMA',
          'Imipramina e iproniazida',
          'Clorpromazina e haloperidol'
        ],
        correctIndex: 1
      },
      {
        id: 'health-medicine-c3-q17',
        type: 'numeric',
        question: 'Quantas sessões a TCC normalmente requer?',
        correctValue: 16,
        tolerance: 4,
        min: 8,
        max: 30,
        step: 2,
        unit: 'sessões'
      }
    ]
  }
];
