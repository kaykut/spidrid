import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Como a Internet Funciona",
    "content": "A internet conecta bilhões de dispositivos em todo o mundo através de uma intrincada rede de redes que abrange todos os continentes da Terra. Cada vez que você visita um website, envia um e-mail ou assiste a um vídeo em streaming, os dados viajam por essa vasta infraestrutura digital em meros milissegundos. Compreender este notável sistema ajuda-nos a apreciar a tecnologia que transformou a comunicação moderna.\n\nQuando você digita um endereço de website no seu navegador, um processo complexo começa instantaneamente. Seu computador primeiro contacta um servidor do Sistema de Nomes de Domínio, que traduz o endereço legível para humanos num endereço IP numérico que os computadores entendem. Isso funciona de maneira semelhante a procurar um número de telefone em uma lista telefônica, correspondendo nomes a informações de contato reais.\n\nSeu pedido então viaja através do seu Provedor de Serviços de Internet para redes de backbone que formam a principal infraestrutura da internet. Estes cabos de fibra óptica de alta capacidade abrangem continentes e cruzam oceanos a profundidades superiores a 6.000 metros. Eles transportam enormes quantidades de dados a quase a velocidade da luz, lidando com mais de 500 trilhões de bytes de informação diariamente.\n\nOs dados não viajam como uma única unidade através da internet. Em vez disso, eles são divididos em pequenos pacotes, cada um contendo parte da informação mais detalhes de endereçamento. Estes pacotes podem seguir diferentes rotas para chegar ao seu destino, encontrando caminhos em torno de congestionamentos ou falhas. No destino, eles são remontados na ordem correta para recriar a mensagem original.\n\nOs roteadores servem como os controladores de tráfego da internet, tomando decisões críticas a cada momento. Estes dispositivos especializados examinam o destino de cada pacote e determinam o melhor caminho a seguir. Eles tomam estas decisões de roteamento bilhões de vezes por segundo, mantendo os dados fluindo suavemente através de redes pertencentes a milhares de organizações diferentes.\n\nA internet começou como ARPANET em 1969, um projeto de pesquisa militar dos Estados Unidos projetado para sobreviver a interrupções de comunicação durante potenciais ataques. Vint Cerf e Bob Kahn desenvolveram os protocolos TCP/IP na década de 1970, criando a base técnica que ainda sustenta a internet hoje. Seu design descentralizado garante que nenhum ponto único de falha possa derrubar toda a rede.\n\nTim Berners-Lee inventou a World Wide Web em 1989 enquanto trabalhava no CERN, na Suíça. Ele criou o sistema de hiperlinks e navegadores web que tornou a internet acessível a todos. A web tornou-se publicamente disponível em agosto de 1991, e dentro de uma década a internet tinha-se transformado de uma ferramenta de pesquisa numa plataforma de comunicação global usada por centenas de milhões de pessoas.",
    "wordCount": 443,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "Quem inventou a World Wide Web?",
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
        "question": "Quem desenvolveu os protocolos TCP/IP? Selecione todas as opções aplicáveis.",
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
        "question": "Os dados viajam pela internet como arquivos únicos e completos, em vez de serem divididos em pacotes.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "Em que ano a ARPANET, a predecessora da internet, começou?",
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
    "title": "A Ascensão da Inteligência Artificial",
    "content": "A inteligência artificial evoluiu de uma fantasia de ficção científica para uma tecnologia prática que afeta quase todos os aspectos da vida moderna. De assistentes de smartphones a sistemas de diagnóstico médico, a IA agora executa tarefas que antes exigiam inteligência humana. Essa transformação representa uma das mudanças tecnológicas mais significativas desde a invenção da própria computação.\n\nO conceito de inteligência artificial surgiu em um workshop realizado no Dartmouth College em New Hampshire durante o verão de 1956. O cientista da computação John McCarthy cunhou o termo e reuniu pesquisadores que acreditavam que máquinas poderiam ser feitas para simular a inteligência humana. Esses pioneiros imaginaram criar máquinas pensantes em uma única geração, embora o progresso tenha se mostrado muito mais lento do que suas previsões otimistas.\n\nAs primeiras pesquisas em IA se concentraram no raciocínio simbólico, programando computadores com regras explícitas sobre como resolver problemas. Os pesquisadores criaram sistemas especialistas que codificavam o conhecimento humano em árvores de decisão e regras lógicas. Esses sistemas alcançaram resultados impressionantes em domínios específicos, como xadrez e diagnóstico médico, mas tiveram dificuldades com tarefas que exigiam bom senso ou o tratamento de informações ambíguas.\n\nA revolução do aprendizado de máquina começou a transformar a IA na década de 1990 e acelerou dramaticamente após 2010. Em vez de programar regras explícitas, os pesquisadores treinaram algoritmos para descobrir padrões em grandes conjuntos de dados. As redes neurais, vagamente inspiradas em estruturas cerebrais biológicas, provaram ser especialmente poderosas no reconhecimento de imagens, compreensão da fala e geração de texto semelhante ao humano.\n\nO aprendizado profundo emergiu como a abordagem dominante para a IA após um avanço em 2012. Geoffrey Hinton e seus alunos da Universidade de Toronto demonstraram que redes neurais profundas com muitas camadas poderiam superar drasticamente os métodos anteriores em tarefas de reconhecimento de imagem. Seu sistema reduziu as taxas de erro em mais de 40 por cento em comparação com as melhores abordagens anteriores.\n\nO treinamento de sistemas de IA modernos exige enormes recursos computacionais e vastas quantidades de dados. Grandes modelos de linguagem podem conter centenas de bilhões de parâmetros e exigir milhares de processadores especializados trabalhando por meses. Empresas de tecnologia como Google, Microsoft e OpenAI investiram bilhões de dólares na construção da infraestrutura necessária para treinar esses sistemas cada vez mais capazes.\n\nAs capacidades dos sistemas de IA se expandiram notavelmente nos últimos anos. Os sistemas de visão computacional agora podem identificar objetos, rostos e atividades em imagens com precisão sobre-humana. O processamento de linguagem natural avançou a ponto de a IA poder se envolver em conversas sutis, escrever ensaios coerentes e traduzir entre dezenas de idiomas. Os sistemas de IA agora compõem música, geram obras de arte e escrevem código de computador.\n\nA IA já alimenta muitos serviços que as pessoas usam diariamente sem consciência. Algoritmos de recomendação sugerem vídeos no YouTube e produtos na Amazon com base em preferências aprendidas. Filtros de e-mail usam aprendizado de máquina para separar mensagens importantes de spam. Aplicativos de navegação preveem padrões de tráfego e sugerem rotas otimizadas. Assistentes de voz como Siri e Alexa usam IA para entender comandos falados.\n\nA área da saúde representa uma das aplicações mais promissoras para a inteligência artificial. Os sistemas de IA podem analisar imagens médicas para detectar câncer mais cedo do que radiologistas humanos em alguns casos. A descoberta de medicamentos usa aprendizado de máquina para identificar compostos promissores e prever seus efeitos. Assistentes de IA ajudam os médicos a se manterem atualizados com a literatura médica em rápida expansão e sugerem opções de tratamento baseadas em evidências.\n\nAs preocupações com a segurança da IA e o impacto social cresceram junto com suas capacidades. Os pesquisadores se preocupam com sistemas que buscam objetivos de maneiras inesperadas ou prejudiciais. Os eticistas levantam questões sobre o viés em sistemas de IA treinados em dados históricos que refletem preconceitos humanos. Os economistas debatem como a automação afetará o emprego, à medida que a IA assume tarefas antes desempenhadas por trabalhadores humanos.\n\nGovernos em todo o mundo começaram a desenvolver regulamentações para a inteligência artificial. A União Europeia aprovou uma legislação abrangente sobre IA em 2024 que categoriza os sistemas por nível de risco e impõe requisitos para aplicações de alto risco. A China implementou regras que regem algoritmos de recomendação e IA generativa. Os Estados Unidos emitiram ordens executivas abordando a segurança da IA enquanto debatem uma legislação mais abrangente.\n\nO futuro da inteligência artificial permanece incerto, mas parece provável que traga avanços rápidos contínuos. Os pesquisadores buscam a inteligência geral artificial que possa igualar a capacidade humana em todas as tarefas cognitivas, embora as estimativas de quando isso pode ocorrer variem de anos a nunca. O que parece certo é que a IA continuará remodelando as indústrias, criando novas possibilidades e levantando questões profundas sobre a relação entre a inteligência humana e a máquina.\n\nCompreender a inteligência artificial tornou-se um conhecimento essencial para navegar no mundo moderno. Seja como usuários, trabalhadores, cidadãos ou formuladores de políticas, as pessoas precisam cada vez mais compreender o que a IA pode e não pode fazer. Esta tecnologia continuará evoluindo e o envolvimento informado com o seu desenvolvimento ajudará a garantir que a IA beneficie a humanidade de forma geral.",
    "wordCount": 869,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "Onde e quando o termo \"inteligência artificial\" se originou?",
        "options": [
          "MIT em 1960",
          "Dartmouth College em 1956",
          "Stanford University em 1965",
          "Bell Labs em 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "Quais aplicações de IA na área da saúde são mencionadas no artigo? Selecione todas as que se aplicam.",
        "options": [
          "Analisar imagens médicas para detectar câncer",
          "Realizar cirurgias robóticas",
          "Descoberta de drogas",
          "Sugerir opções de tratamento"
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
        "question": "A pesquisa inicial em IA se concentrou principalmente no aprendizado de máquina em vez do raciocínio simbólico.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "Em que ano Geoffrey Hinton e seus alunos demonstraram um avanço no aprendizado profundo?",
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
        "question": "Quem cunhou o termo \"inteligência artificial\"?",
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
        "question": "Em quanto as redes neurais profundas reduziram as taxas de erro em comparação com os métodos anteriores em 2012?",
        "options": [
          "Mais de 20 por cento",
          "Mais de 30 por cento",
          "Mais de 40 por cento",
          "Mais de 50 por cento"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "Em que ano a União Europeia aprovou uma legislação abrangente sobre IA?",
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
    "title": "Cibersegurança: Protegendo o Mundo Digital",
    "content": "A cibersegurança protege computadores, redes e dados de ataques digitais que ameaçam bilhões de pessoas diariamente. Hackers têm como alvo desde contas bancárias pessoais até infraestruturas críticas como redes de energia e hospitais. O campo cresceu de uma especialidade de nicho para uma das disciplinas mais importantes da tecnologia moderna.\n\nO primeiro grande vírus de computador, chamado Brain, apareceu no Paquistão em janeiro de 1986. Dois irmãos chamados Basit e Amjad Farooq Alvi o criaram para rastrear cópias ilegais de seu software médico. O vírus se espalhou lentamente através de disquetes infectados, levando meses para atingir computadores em todo o mundo. Hoje, o malware se espalha pela internet em segundos, infectando milhões de dispositivos antes que os especialistas em segurança possam responder.\n\nAtaques de phishing permanecem o método mais comum que os criminosos usam para roubar informações confidenciais. Esses e-mails enganosos fingem vir de fontes confiáveis, como bancos, empregadores ou sites populares. Eles enganam os destinatários para que cliquem em links maliciosos ou insiram senhas em sites falsos. O FBI relatou que ataques de phishing causaram mais de 10 bilhões de dólares em perdas apenas em 2022.\n\nRansomware representa um dos tipos mais destrutivos de ataques cibernéticos modernos. Este software malicioso criptografa os arquivos de uma vítima e exige pagamento pela chave de descriptografia. O ataque WannaCry em maio de 2017 infectou mais de 200.000 computadores em 150 países em apenas quatro dias. Hospitais no Reino Unido tiveram que cancelar milhares de consultas médicas e desviar ambulâncias para instalações não afetadas.\n\nSenhas fortes formam a base da cibersegurança pessoal. Especialistas em segurança recomendam usar pelo menos 12 caracteres combinando letras maiúsculas, letras minúsculas, números e símbolos. Cada conta deve ter uma senha única para evitar que uma única violação comprometa vários serviços. Gerenciadores de senhas ajudam os usuários a gerar e armazenar senhas complexas sem memorizá-las.\n\nA autenticação de dois fatores adiciona uma segunda camada crucial de segurança além das senhas. Este sistema requer algo que você sabe, como uma senha, mais algo que você tem, como um telefone que recebe códigos de verificação. Mesmo que os hackers roubem sua senha, eles não podem acessar sua conta sem o segundo fator. O Google relatou que a autenticação de dois fatores bloqueia 99,9% dos ataques automatizados em contas.\n\nA criptografia embaralha os dados em um código ilegível que apenas partes autorizadas podem descriptografar. Quando você vê um ícone de cadeado na barra de endereço do seu navegador, a criptografia protege sua conexão com esse site. A criptografia de ponta a ponta em aplicativos de mensagens garante que apenas você e seu destinatário possam ler suas mensagens. Mesmo a empresa que fornece o serviço não pode acessar o conteúdo criptografado.\n\nGovernos e corporações investem bilhões em defesa da cibersegurança. A Agência de Cibersegurança e Segurança de Infraestrutura dos Estados Unidos, conhecida como CISA, protege as redes federais e ajuda as empresas privadas a se defenderem contra ataques. Grandes empresas de tecnologia empregam milhares de pesquisadores de segurança que procuram vulnerabilidades e desenvolvem medidas de proteção.\n\nHackers éticos desempenham um papel vital na melhoria da segurança, encontrando fraquezas antes que os criminosos o façam. As empresas pagam recompensas que variam de centenas a milhões de dólares por relatos de vulnerabilidades graves. A Apple lançou seu programa de recompensas por bugs em 2016 e agora oferece até 2 milhões de dólares pelas falhas de segurança mais críticas do iPhone. Esses programas transformam potenciais atacantes em defensores que fortalecem a infraestrutura digital.\n\nO futuro da cibersegurança enfrenta novos desafios das tecnologias emergentes. Os computadores quânticos podem eventualmente quebrar a criptografia que atualmente protege os bancos, as comunicações e os segredos do governo. Pesquisadores de segurança já estão desenvolvendo algoritmos resistentes à computação quântica para se prepararem para essa ameaça. A inteligência artificial cria novos métodos de ataque e novas capacidades defensivas em uma contínua corrida armamentista tecnológica.",
    "wordCount": 642,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "Qual foi o nome do primeiro vírus de computador de grande porte?",
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
        "question": "De acordo com o Google, qual a porcentagem de ataques automatizados que a autenticação de dois fatores bloqueia?",
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
        "question": "Quais são as práticas recomendadas para uma senha forte? Selecione todas as opções aplicáveis.",
        "options": [
          "Usar pelo menos 12 caracteres",
          "Usar a mesma senha para todas as contas",
          "Combinar letras maiúsculas, minúsculas, números e símbolos",
          "Usar um gerenciador de senhas"
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
        "question": "O ataque de ransomware WannaCry infectou computadores em mais de 150 países.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "Quanto dinheiro os ataques de phishing causaram em perdas durante 2022 (em bilhões de dólares)?",
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
    "title": "A Internet das Coisas: Um Mundo Conectado",
    "content": "A Internet das Coisas (IoT) teceu inteligência digital no tecido da vida cotidiana, conectando bilhões de dispositivos que sentem, comunicam e agem sem intervenção humana. De termostatos inteligentes que aprendem suas preferências a sensores industriais monitorando equipamentos em todos os continentes, essa revolução tecnológica estende a internet além de computadores e telefones para o mundo físico. Compreender este ecossistema interconectado revela tanto possibilidades notáveis quanto desafios significativos que moldarão as próximas décadas.\n\nKevin Ashton, um pioneiro da tecnologia britânico que trabalhava na Procter and Gamble, cunhou o termo Internet das Coisas em 1999 enquanto desenvolvia sistemas de identificação por radiofrequência para rastrear produtos através de cadeias de suprimentos. Ele imaginou computadores coletando informações sobre o mundo físico independentemente, em vez de depender de humanos para inserir dados. Essa visão levou décadas para se materializar, à medida que os sensores se tornaram mais baratos, a conectividade sem fio melhorou e a computação em nuvem forneceu a infraestrutura para processar vastos fluxos de dados.\n\nO número de dispositivos conectados cresceu exponencialmente desde que a adoção comercial da IoT começou por volta de 2010. Analistas da Statista estimaram 15,1 bilhões de dispositivos IoT em todo o mundo em 2020, com projeção de atingir 29 bilhões até 2030. Cada dispositivo gera dados continuamente, criando fluxos de informações que superam o tráfego de internet tradicional. Uma única fábrica conectada pode produzir terabytes de dados de sensores diariamente a partir de milhares de pontos de monitoramento.\n\nA tecnologia de casas inteligentes representa a aplicação de consumo mais visível dos princípios da IoT. O Nest Learning Thermostat, introduzido pelo ex-engenheiro da Apple, Tony Fadell, em outubro de 2011, foi pioneiro na adoção mainstream de casas inteligentes. O dispositivo observava quando os moradores estavam em casa e suas preferências de temperatura, ajustando automaticamente o aquecimento e o resfriamento para economizar energia. O Google adquiriu a Nest Labs por 3,2 bilhões de dólares em janeiro de 2014, sinalizando o compromisso das principais empresas de tecnologia com este mercado.\n\nOs assistentes de voz se tornaram hubs centrais para ecossistemas de casas inteligentes. A Amazon lançou o alto-falante Echo com Alexa em novembro de 2014, seguido pelo Google Home em 2016 e o HomePod da Apple em 2018. Esses dispositivos respondem a comandos de voz para controlar luzes, fechaduras, termostatos e sistemas de entretenimento. Em 2024, mais de 200 milhões de residências em todo o mundo possuíam alto-falantes inteligentes, usando-os para tarefas que variam desde a definição de temporizadores até o pedido de mantimentos.\n\nDispositivos vestíveis rastreiam métricas de saúde com crescente sofisticação e precisão. O Apple Watch, lançado em abril de 2015, evoluiu de um acessório de moda para um dispositivo médico capaz de detectar ritmos cardíacos irregulares e quedas. Um estudo publicado no New England Journal of Medicine em novembro de 2019 descobriu que o relógio identificou fibrilação atrial, uma condição cardíaca grave, com 84% de precisão. Monitores contínuos de glicose permitem que diabéticos rastreiem o açúcar no sangue sem picadas nos dedos, transmitindo dados para smartphones e alertando os usuários sobre níveis perigosos.\n\nA IoT industrial, às vezes chamada de Indústria 4.0, transforma a manufatura com visibilidade e controle sem precedentes. Sensores incorporados em máquinas detectam vibrações, temperaturas e consumo de energia que indicam falhas iminentes antes que ocorram quebras. A General Electric foi pioneira na manutenção preditiva através de sua plataforma Predix, alegando economizar bilhões aos clientes em tempo de inatividade evitado. Um único motor a jato gera 10 terabytes de dados durante um voo transatlântico, analisados continuamente para otimizar o desempenho e agendar a manutenção.\n\nA agricultura abraça a IoT para aumentar a produção, reduzindo o impacto ambiental. Sensores de umidade do solo acionam a irrigação somente quando as plantas precisam de água, reduzindo o consumo em até 30% em comparação com a irrigação programada. Drones equipados com câmeras multiespectrais identificam estresse da colheita, infestações de pragas e deficiências de nutrientes em vastos campos. A John Deere, a empresa de equipamentos agrícolas de 185 anos, agora coleta dados de milhões de máquinas conectadas e vende serviços de análise para agricultores junto com tratores.\n\nCidades inteligentes implantam infraestrutura de IoT para gerenciar sistemas urbanos de forma mais eficiente. Barcelona implementou um dos programas de cidades inteligentes mais abrangentes a partir de 2012, instalando sensores em toda a cidade para monitorar a disponibilidade de estacionamento, níveis de lixeiras, qualidade do ar e necessidades de irrigação. A cidade alega economias anuais de 75 milhões de dólares, melhorando os serviços para os residentes. Singapura, Copenhague e Seul realizaram iniciativas semelhantes, usando sensores conectados para otimizar o fluxo de tráfego, o consumo de energia e a resposta a emergências.\n\nAs aplicações de saúde se estendem muito além dos dispositivos vestíveis para o monitoramento remoto de pacientes e ambientes clínicos. Pacientes em recuperação de cirurgia ou gerenciando condições crônicas podem ser monitorados em casa com dispositivos conectados que alertam as equipes de atendimento sobre mudanças preocupantes. Os hospitais rastreiam a localização e o status de equipamentos críticos em tempo real. Ensaios clínicos usam dispositivos IoT para coletar dados mais precisos sobre a saúde dos participantes entre as visitas. A pandemia de COVID-19 acelerou a adoção de tecnologias de monitoramento remoto que antes enfrentavam lenta aceitação.\n\nAs preocupações de segurança em torno dos dispositivos IoT provaram ser perturbadoramente válidas. Muitos fabricantes priorizam recursos e preços baixos em vez de segurança robusta, enviando dispositivos com senhas padrão e vulnerabilidades não corrigidas. O ataque da botnet Mirai em outubro de 2016 sequestrou centenas de milhares de webcams e DVRs não seguros para lançar ataques distribuídos de negação de serviço que interromperam os principais sites, incluindo Twitter, Netflix e PayPal. Pesquisadores demonstram regularmente vulnerabilidades alarmantes em babás eletrônicas, carros, dispositivos médicos e sistemas industriais.\n\nAs implicações de privacidade da detecção generalizada levantam questões profundas sobre vigilância e propriedade de dados. Assistentes de voz gravam conversas em casas. Rastreadores de fitness revelam detalhes íntimos sobre saúde e rotinas diárias. Carros conectados transmitem dados de localização que revelam onde os motoristas vão e como dirigem. As empresas coletam essas informações para melhoria do serviço e publicidade direcionada, enquanto os governos buscam cada vez mais acesso para fins de aplicação da lei e segurança nacional.\n\nOs desafios de interoperabilidade fragmentam o cenário da IoT em ecossistemas incompatíveis. Dispositivos de diferentes fabricantes geralmente não conseguem se comunicar diretamente, exigindo que os consumidores escolham plataformas e limitem a funcionalidade. O protocolo Matter, lançado em novembro de 2022 por um consórcio incluindo Apple, Google, Amazon e Samsung, visa criar um padrão universal para dispositivos de casas inteligentes. Esta iniciativa representa o reconhecimento da indústria de que a fragmentação impede a adoção e a inovação.\n\nA computação de borda aborda as limitações de latência e largura de banda de enviar todos os dados da IoT para servidores de nuvem distantes. Processar informações localmente nos ou perto dos dispositivos permite respostas em tempo real para aplicações como veículos autônomos e robótica industrial. Um carro autônomo não pode esperar que os dados viajem para um servidor de nuvem e voltem antes de decidir frear. As arquiteturas de borda distribuem a inteligência por todas as redes, em vez de concentrá-la em data centers centralizados.\n\nAs restrições de energia moldam o design e a implantação de dispositivos IoT. Sensores alimentados por bateria devem operar por anos sem substituição em locais que podem ser inacessíveis ou perigosos. Tecnologias de rede de área ampla de baixa potência, como LoRaWAN e Sigfox, permitem que os dispositivos se comuniquem por quilômetros enquanto consomem energia mínima. A coleta de energia de fontes solares, térmicas ou cinéticas permite que alguns dispositivos operem indefinidamente sem baterias.\n\nA pegada ambiental de bilhões de dispositivos conectados exige atenção à medida que a IoT se expande. A fabricação desses produtos consome recursos e energia. A maioria dos dispositivos carece de provisões para reciclagem de seus componentes eletrônicos. A conectividade de rede contínua requer energia tanto dos dispositivos quanto da infraestrutura. No entanto, aplicações IoT em gerenciamento de energia, agricultura e transporte podem reduzir o impacto ambiental geral quando implementadas de forma criteriosa.\n\nO futuro da IoT aponta para a inteligência ambiente que antecipa as necessidades e responde automaticamente às condições variáveis. Gêmeos digitais criam réplicas virtuais de sistemas físicos para simulação e otimização. A inteligência artificial aplicada a dados de sensores permite previsões e automações além do que a programação explícita poderia alcançar. A fronteira entre os mundos físico e digital continua a se confundir à medida que a inteligência conectada se espalha por todo o ambiente que habitamos.",
    "wordCount": 1412,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "Quem cunhou o termo \"Internet das Coisas\" em 1999?",
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
        "question": "Quais empresas lançaram dispositivos assistentes de voz importantes? Selecione todas as opções aplicáveis.",
        "options": [
          "Amazon com Echo",
          "Google com Google Home",
          "Apple com HomePod",
          "Microsoft com alto-falante Cortana"
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
        "question": "O ataque botnet Mirai em outubro de 2016 sequestrou centenas de milhares de webcams e DVRs não seguros.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "Quanto a Google pagou para adquirir a Nest Labs em janeiro de 2014 (em bilhões de dólares)?",
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
        "question": "Quando o Apple Watch foi lançado?",
        "options": [
          "Outubro de 2011",
          "Janeiro de 2014",
          "Abril de 2015",
          "Novembro de 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "Qual cidade implementou um dos programas de cidade inteligente mais abrangentes a partir de 2012?",
        "options": [
          "Singapura",
          "Barcelona",
          "Copenhague",
          "Seul"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "Quantos dispositivos IoT estão projetados para existir mundialmente até 2030 (em bilhões)?",
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
        "question": "O protocolo Matter foi lançado para criar um padrão universal para dispositivos domésticos inteligentes.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "Com que precisão o Apple Watch identificou a fibrilação atrial de acordo com o estudo do New England Journal of Medicine?",
        "options": [
          "74 por cento",
          "84 por cento",
          "94 por cento",
          "99 por cento"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "Quais aplicações de IoT na agricultura são mencionadas? Selecione todas as opções aplicáveis.",
        "options": [
          "Sensores de umidade do solo para irrigação",
          "Drones com câmeras multiespectrais",
          "Tratores conectados com análises",
          "Colheita robótica"
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
    "title": "A Evolução das Mídias Sociais",
    "content": "As mídias sociais transformaram a forma como os humanos se comunicam, compartilham informações e constroem comunidades de maneiras que ninguém previu quando a internet surgiu pela primeira vez. Plataformas conectando bilhões de usuários remodelaram a política, o comércio, o entretenimento e as relações pessoais em todos os continentes. A história das mídias sociais revela tanto uma inovação notável quanto desafios profundos para a sociedade moderna.\n\nOs primeiros sites de redes sociais surgiram no final da década de 1990, quando a internet se tornou acessível às pessoas comuns. O SixDegrees foi lançado em 1997, permitindo que os usuários criassem perfis e se conectassem com amigos. O site atraiu aproximadamente 3,5 milhões de membros antes de ser desativado em 2001. O Friendster seguiu em 2002, sendo pioneiro em recursos que se tornariam padrão em todo o setor. O MySpace dominou de 2005 a 2008, tornando-se o site mais visitado nos Estados Unidos e lançando as carreiras de músicos como Arctic Monkeys.\n\nO Facebook surgiu de um dormitório da Universidade de Harvard em fevereiro de 2004. Mark Zuckerberg e seus colegas de quarto criaram o site inicialmente apenas para estudantes universitários. A plataforma foi aberta a todos com 13 anos ou mais em setembro de 2006. Em 2012, o Facebook atingiu um bilhão de usuários ativos mensais, um marco que nenhuma rede social jamais havia alcançado. A empresa agora opera como Meta e relata mais de 3 bilhões de usuários mensais em sua família de aplicativos, incluindo Instagram e WhatsApp.\n\nO Twitter introduziu um novo formato para comunicação social quando foi lançado em julho de 2006. A plataforma limitava as postagens a 140 caracteres, posteriormente expandido para 280, forçando os usuários a expressar seus pensamentos de forma concisa. O Twitter se tornou essencial para notícias de última hora, discurso político e engajamento de celebridades. O serviço desempenhou papéis notáveis durante os protestos da Primavera Árabe em 2011 e moldou a conversa pública sobre inúmeras questões desde então.\n\nO YouTube revolucionou o compartilhamento de vídeos depois que três ex-funcionários do PayPal o fundaram em fevereiro de 2005. O primeiro vídeo, intitulado \"Me at the zoo\", mostrou o co-fundador Jawed Karim no Zoológico de San Diego por apenas 18 segundos. O Google comprou o YouTube por 1,65 bilhão de dólares em outubro de 2006. Hoje, os usuários carregam mais de 500 horas de conteúdo de vídeo a cada minuto, e a plataforma alcança mais pessoas de 18 a 49 anos do que todas as redes de TV a cabo juntas.\n\nO Instagram trouxe o compartilhamento de fotos para dispositivos móveis quando Kevin Systrom e Mike Krieger o lançaram em outubro de 2010. O aplicativo ganhou 25.000 usuários em seu primeiro dia e atingiu um milhão em dois meses. O Facebook adquiriu o Instagram por um bilhão de dólares em abril de 2012. A plataforma introduziu os Stories em 2016 e os Reels em 2020, adaptando recursos popularizados por concorrentes como Snapchat e TikTok.\n\nO TikTok se tornou a plataforma social de crescimento mais rápido da história após seu lançamento internacional em 2017. A empresa chinesa ByteDance o criou fundindo-se com o Musical.ly, um aplicativo popular entre adolescentes americanos. O algoritmo do TikTok recomenda vídeos com base no comportamento de visualização, em vez de seguir relacionamentos, criando uma experiência diferente das plataformas anteriores. O aplicativo atingiu um bilhão de usuários mensais em setembro de 2021, alcançando esse marco mais rápido do que qualquer predecessor.\n\nAs mídias sociais criaram novas oportunidades econômicas que valem bilhões de dólares anualmente. Influenciadores ganham rendas substanciais ao fazer parceria com marcas e promover produtos para seus seguidores. A economia de criadores empregou cerca de 50 milhões de pessoas em todo o mundo em 2022. Pequenas empresas usam plataformas sociais para alcançar clientes sem publicidade tradicional cara. Setores inteiros surgiram em torno do gerenciamento da presença nas mídias sociais para organizações e indivíduos.\n\nPreocupações com a saúde mental em torno das mídias sociais geraram um intenso debate entre pesquisadores e formuladores de políticas. Estudos ligam o uso intenso de mídias sociais a taxas aumentadas de ansiedade, depressão e solidão, principalmente entre adolescentes. A Dra. Jean Twenge, da Universidade Estadual de San Diego, publicou uma pesquisa em 2017 mostrando declínios acentuados na saúde mental dos adolescentes coincidindo com a adoção de smartphones. Os críticos argumentam que a correlação não prova a causalidade e apontam para os benefícios potenciais da conexão online.\n\nA desinformação se espalha rapidamente pelas redes sociais, desafiando o ecossistema de informações. Notícias falsas viajam mais rápido e atingem mais pessoas do que relatos precisos, de acordo com uma pesquisa do MIT publicada na Science em março de 2018. As plataformas implementaram programas de verificação de fatos, selos de aviso e mudanças algorítmicas para combater conteúdo enganoso. Esses esforços produzem resultados mistos e levantam questões sobre censura e o papel das empresas de tecnologia na determinação da verdade.\n\nPreocupações com a privacidade seguiram as mídias sociais desde seus primeiros dias. As empresas coletam vastas quantidades de dados pessoais para direcionar a publicidade com notável precisão. O escândalo da Cambridge Analytica em 2018 revelou que uma empresa de consultoria política havia coletado dados de 87 milhões de usuários do Facebook sem consentimento. Regulamentos como o Regulamento Geral de Proteção de Dados Europeu tentam dar aos usuários mais controle sobre suas informações.\n\nO futuro das mídias sociais continua evoluindo rapidamente à medida que novas tecnologias e mudanças nas preferências remodelam o cenário. As plataformas de realidade virtual prometem experiências sociais mais imersivas. Redes descentralizadas construídas com tecnologia blockchain visam dar aos usuários mais controle. Os jovens preferem cada vez mais mensagens privadas a postagens públicas. Quaisquer que sejam as formas que assuma, a conexão social por meio de plataformas digitais permanecerá central para a comunicação humana nas próximas gerações.",
    "wordCount": 956,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "Qual foi a primeira rede social mencionada no artigo?",
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
        "question": "Quanto o Google pagou para adquirir o YouTube em 2006?",
        "options": [
          "1 bilhão de dólares",
          "1,65 bilhão de dólares",
          "2 bilhões de dólares",
          "10 bilhões de dólares"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "Quais plataformas fazem parte da família de aplicativos da Meta? Selecione todas as opções aplicáveis.",
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
        "question": "O TikTok atingiu um bilhão de usuários mensais mais rápido do que qualquer plataforma de mídia social anterior.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "Quantos usuários do Facebook tiveram seus dados coletados no escândalo da Cambridge Analytica (em milhões)?",
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
        "question": "Quando o Facebook atingiu um bilhão de usuários ativos mensais?",
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
    "title": "A Revolução da Privacidade Digital",
    "content": "A privacidade digital emergiu como uma das questões definidoras do século XXI, à medida que as empresas de tecnologia acumulam quantidades sem precedentes de informações pessoais, enquanto os governos expandem as capacidades de vigilância a níveis que teriam parecido distópicos há apenas algumas décadas. A tensão entre os benefícios dos serviços orientados por dados e os riscos do monitoramento generalizado molda debates políticos, modelos de negócios e escolhas individuais em todo o mundo. Compreender este cenário complexo exige examinar as tecnologias que permitem tanto a vigilância quanto a proteção da privacidade, os marcos legais que lutam para acompanhar a inovação e as questões filosóficas sobre o que significa privacidade em uma era de conectividade ubíqua.\n\nO conceito de privacidade informacional ganhou reconhecimento legal muito antes da era digital. Os juristas americanos Samuel Warren e Louis Brandeis publicaram seu artigo histórico de 1890 na Harvard Law Review, defendendo o direito de ser deixado em paz em resposta ao jornalismo intrusivo possibilitado por câmeras portáteis. Este texto fundamental estabeleceu a privacidade como distinta dos direitos de propriedade e da autonomia corporal. Brandeis mais tarde se tornou um juiz da Suprema Corte e escreveu opiniões influentes que estenderam as proteções de privacidade contra a intrusão do governo.\n\nA internet transformou a privacidade de um conceito jurídico abstrato em uma preocupação prática diária. Os primeiros usuários da web compartilhavam informações pessoais casualmente, sem perceber como elas poderiam ser coletadas e usadas. Os cookies, pequenos arquivos de texto armazenados pelos navegadores da web, permitiram que os sites reconhecessem visitantes recorrentes a partir de 1994. O engenheiro da Netscape, Lou Montulli, inventou os cookies para resolver o problema técnico de manutenção dos carrinhos de compras, mas eles rapidamente se tornaram ferramentas de vigilância rastreando os usuários em vários sites.\n\nO Google revolucionou a publicidade digital conectando consultas de pesquisa aos interesses dos usuários com notável precisão. Os fundadores da empresa inicialmente expressaram desconforto com os modelos de negócios baseados em publicidade, escrevendo em seu artigo acadêmico de 1998 que a publicidade cria incentivos mistos para priorizar os anunciantes em detrimento dos usuários. No entanto, o Google AdWords foi lançado em outubro de 2000 e o Google AdSense em 2003, criando a infraestrutura de publicidade direcionada que geraria centenas de bilhões em receita.\n\nO Facebook estendeu a coleta de dados para relacionamentos sociais e comunicações pessoais. A plataforma foi lançada em fevereiro de 2004 com a promessa de conectar pessoas, mas seu modelo de negócios dependia da venda de perfis detalhados de usuários para anunciantes. Os usuários compartilhavam fotos, dados de localização, opiniões políticas e status de relacionamento, muitas vezes sem entender como essas informações seriam monetizadas. Em 2018, o Facebook coletava dados de cerca de 2,2 bilhões de usuários em todo o mundo.\n\nO escândalo da Cambridge Analytica explodiu na consciência pública em março de 2018, revelando como aplicativos de terceiros poderiam coletar dados de milhões de usuários do Facebook sem seu conhecimento. A empresa de consultoria britânica Cambridge Analytica obteve informações pessoais de 87 milhões de usuários por meio de um aplicativo de teste de personalidade que explorava as permissões da API do Facebook. A empresa usou esses dados para publicidade política durante a eleição presidencial dos Estados Unidos de 2016 e o referendo do Brexit. O Facebook enfrentou investigações regulatórias em vários continentes e pagou uma multa recorde de 5 bilhões de dólares à Federal Trade Commission em julho de 2019.\n\nAs revelações de Edward Snowden em junho de 2013 expuseram a escala da vigilância governamental possibilitada pelas comunicações digitais. O ex-contratado da Agência de Segurança Nacional vazou documentos confidenciais para os jornalistas Glenn Greenwald, Laura Poitras e Ewen MacAskill. Esses documentos revelaram programas que coletavam metadados de telefones de milhões de americanos, interceptavam cabos de fibra óptica que transportavam comunicações internacionais e exploravam vulnerabilidades em produtos de tecnologia. As divulgações provocaram debates globais sobre o equilíbrio entre segurança e privacidade.\n\nO programa PRISM permitiu que a NSA coletasse dados diretamente dos servidores das principais empresas de tecnologia, incluindo Google, Facebook, Apple e Microsoft. As empresas inicialmente negaram o conhecimento do programa, embora relatórios subsequentes tenham esclarecido que elas cumpriram as ordens judiciais, ao mesmo tempo em que, às vezes, lutavam contra a expansão da vigilância nos tribunais. Snowden fugiu para Hong Kong e acabou recebendo asilo na Rússia, onde permaneceu em 2024. Os Estados Unidos o acusaram de espionagem e roubo de propriedade do governo.\n\nA criptografia fornece a principal defesa técnica contra a vigilância governamental e a interceptação criminal. A criptografia de ponta a ponta garante que apenas o remetente e o destinatário possam ler as mensagens, com até mesmo o provedor de serviços incapaz de acessar o conteúdo. O WhatsApp implementou a criptografia de ponta a ponta para seus 1,5 bilhão de usuários em abril de 2016, usando o Protocolo Signal desenvolvido pelo criptógrafo Moxie Marlinspike. A Apple também criptografa as comunicações iMessage e resistiu publicamente às demandas do governo por acesso backdoor.\n\nAs agências de aplicação da lei argumentam que a criptografia cria zonas onde os criminosos operam com impunidade. O FBI processou a Apple em fevereiro de 2016 para forçar a empresa a ajudar a desbloquear um iPhone usado por um dos terroristas de San Bernardino. A Apple se recusou, argumentando que a criação de um backdoor comprometeria a segurança de todos os usuários. O FBI acabou pagando a um contratado terceirizado aproximadamente um milhão de dólares para contornar a segurança do telefone. Este caso ilustrou o conflito contínuo entre os interesses de privacidade e segurança.\n\nA União Europeia promulgou o Regulamento Geral de Proteção de Dados, comumente conhecido como GDPR, que entrou em vigor em 25 de maio de 2018. Esta estrutura abrangente estabeleceu regras estritas para coletar, armazenar e processar dados pessoais de residentes da UE. As organizações devem obter consentimento explícito antes de coletar dados, fornecer acesso às informações armazenadas e excluir os dados mediante solicitação. As violações podem resultar em multas de até 4% da receita anual global ou 20 milhões de euros, o que for maior. A Amazon recebeu a maior multa do GDPR de 746 milhões de euros em julho de 2021.\n\nA Califórnia aprovou a Lei de Privacidade do Consumidor da Califórnia, em vigor desde 1º de janeiro de 2020, estabelecendo proteções semelhantes para os residentes do estado. A lei concede aos consumidores o direito de saber quais informações pessoais as empresas coletam, excluir essas informações e optar por não vendê-las. A Lei de Direitos de Privacidade da Califórnia, aprovada pelos eleitores em novembro de 2020, fortaleceu ainda mais essas proteções. Outros estados, incluindo Virgínia, Colorado e Connecticut, promulgaram legislação comparável, criando uma colcha de retalhos de requisitos de privacidade nos Estados Unidos.\n\nOs corretores de dados operam em grande parte fora da conscientização pública, compilando perfis detalhados de registros públicos, históricos de compras, atividades de mídia social e inúmeras outras fontes. Empresas como Acxiom, Experian e Oracle Data Cloud mantêm bancos de dados que cobrem centenas de milhões de indivíduos. Esses perfis influenciam decisões de crédito, triagem de emprego, taxas de seguro e publicidade direcionada. Os corretores vendem acesso a essas informações para empresas, campanhas políticas e, às vezes, atores maliciosos.\n\nO rastreamento de localização tornou-se particularmente controverso, pois os smartphones relatam continuamente as posições dos usuários. Os aplicativos móveis solicitam rotineiramente acesso à localização para funcionalidades que variam de previsões meteorológicas a recomendações de restaurantes. Esses dados revelam informações confidenciais sobre consultas médicas, práticas religiosas, atividades políticas e relacionamentos pessoais. O Wall Street Journal informou em dezembro de 2018 que dezenas de empresas recebem dados de localização precisos de aplicativos populares, criando históricos de movimento abrangentes.\n\nA tecnologia de reconhecimento facial levanta distintas preocupações com a privacidade, permitindo a identificação sem consentimento ou conhecimento. As agências de aplicação da lei usam sistemas de empresas como a Clearview AI, que coletou bilhões de fotos de mídia social para construir um banco de dados pesquisável. Várias cidades, incluindo São Francisco, Boston e Portland, proibiram o uso governamental do reconhecimento facial. A União Europeia debateu restrições à vigilância biométrica em espaços públicos. A China implantou o reconhecimento facial extensivamente, usando-o para medidas de controle social, particularmente visando minorias uigures.\n\nO direito ao esquecimento surgiu de uma decisão de 2014 do Tribunal de Justiça Europeu, exigindo que o Google removesse certos resultados de pesquisa mediante solicitação. Mario Costeja Gonzalez, um cidadão espanhol, argumentou com sucesso que os links para artigos de jornal de 1998 sobre suas dificuldades financeiras não eram mais relevantes. O Google processou mais de 1,6 milhão de solicitações de remoção, afetando quase 6 milhões de URLs desde a decisão. Os críticos argumentam que isso equivale à censura, enquanto os apoiadores o veem como essencial para a dignidade pessoal e a reabilitação.\n\nAs tecnologias de preservação da privacidade oferecem alternativas à economia de vigilância. As redes virtuais privadas criptografam o tráfego da Internet e mascaram a localização do usuário. O navegador Tor roteia as comunicações por meio de vários servidores para impedir o rastreamento. Mecanismos de pesquisa focados na privacidade, como o DuckDuckGo, processam consultas sem coletar dados pessoais. O Signal fornece mensagens criptografadas que coletam metadados mínimos. Essas ferramentas exigem sofisticação técnica que limita a adoção, mas demonstram que os serviços que respeitam a privacidade são tecnicamente viáveis.\n\nA privacidade das crianças recebe proteção legal especial, dada sua vulnerabilidade e incapacidade de fornecer consentimento significativo. A Lei de Proteção à Privacidade Online das Crianças, promulgada em 1998, restringe a coleta de informações pessoais de crianças menores de 13 anos nos Estados Unidos. O TikTok pagou 5,7 milhões de dólares em fevereiro de 2019 para resolver acusações de coleta ilegal de dados de crianças. O Código de Design Apropriado para a Idade do Reino Unido, em vigor desde setembro de 2021, exige que os serviços online forneçam configurações padrão de alta privacidade para usuários menores de 18 anos.\n\nO futuro da privacidade digital depende da inovação tecnológica, do desenvolvimento regulatório e das atitudes culturais em relação ao compartilhamento de dados. Os sistemas de identidade descentralizados podem dar aos indivíduos controle sobre suas informações pessoais. As técnicas de privacidade diferencial permitem a análise útil de dados, protegendo os registros individuais. A convergência regulatória pode estabelecer padrões globais em vez de abordagens nacionais fragmentadas. A tensão fundamental entre a utilidade dos dados e a proteção da privacidade persistirá, mas o equilíbrio entre eles permanece sujeito à contestação democrática e às escolhas individuais.",
    "wordCount": 1728,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "Quando Samuel Warren e Louis Brandeis publicaram seu importante artigo sobre privacidade na Harvard Law Review?",
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
        "question": "Quais empresas foram reveladas como parte do programa PRISM da NSA? Selecione todas as que se aplicam.",
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
        "question": "O escândalo da Cambridge Analytica envolveu dados de 87 milhões de usuários do Facebook.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "Quanto o Facebook pagou em sua multa da FTC em julho de 2019 (em bilhões de dólares)?",
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
        "question": "Quando Edward Snowden vazou documentos classificados da NSA?",
        "options": [
          "Junho de 2011",
          "Junho de 2013",
          "Junho de 2015",
          "Junho de 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "Quando o GDPR entrou em vigor?",
        "options": [
          "25 de maio de 2016",
          "25 de maio de 2017",
          "25 de maio de 2018",
          "25 de maio de 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "Qual foi o valor da multa do GDPR da Amazon em julho de 2021 (em milhões de euros)?",
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
        "question": "O WhatsApp implementou criptografia de ponta a ponta para seus usuários em abril de 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "Quando a Lei de Privacidade do Consumidor da Califórnia entrou em vigor?",
        "options": [
          "1 de janeiro de 2018",
          "1 de janeiro de 2019",
          "1 de janeiro de 2020",
          "1 de janeiro de 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "Quando foi promulgada a Lei de Proteção à Privacidade Online das Crianças?",
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
        "question": "Quem inventou os cookies da web em 1994?",
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
        "question": "Quando foi lançado o Google AdWords?",
        "options": [
          "Outubro de 1998",
          "Outubro de 2000",
          "Outubro de 2002",
          "Outubro de 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "Quanto o TikTok pagou em fevereiro de 2019 para resolver acusações de dados de crianças (em milhões de dólares)?",
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
        "question": "São Francisco proibiu o uso governamental da tecnologia de reconhecimento facial.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "Quando foi a decisão sobre o direito de ser esquecido pelo Tribunal de Justiça Europeu?",
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
        "question": "Quais jornalistas receberam os documentos vazados de Edward Snowden? Selecione todas as que se aplicam.",
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
    "title": "O Mundo Revolucionário da Tecnologia Blockchain",
    "content": "A tecnologia blockchain evoluiu de um conceito criptográfico obscuro para uma força transformadora, remodelando indústrias muito além de suas origens na moeda digital. Este sistema de livro razão distribuído oferece transparência, segurança e descentralização sem precedentes, desafiando as abordagens tradicionais de manutenção de registros e confiança. Compreender a blockchain revela por que os tecnólogos a consideram uma das inovações mais significativas desde a própria internet.\n\nSatoshi Nakamoto, um indivíduo ou grupo pseudônimo, apresentou a blockchain ao mundo através do whitepaper do Bitcoin, publicado em 31 de outubro de 2008. O momento se mostrou notavelmente profético, chegando apenas semanas após o colapso do Lehman Brothers ter desencadeado a crise financeira global. Nakamoto propôs um sistema de dinheiro eletrônico peer-to-peer que eliminaria a necessidade de intermediários confiáveis, como bancos. O primeiro bloco Bitcoin, chamado bloco gênesis, foi minerado em 3 de janeiro de 2009, incorporando uma manchete de jornal sobre resgates bancários como um lembrete permanente das motivações da tecnologia.\n\nUma blockchain funciona como um banco de dados distribuído compartilhado através de uma rede de computadores chamados nós. Cada bloco contém uma lista de transações, um timestamp e um hash criptográfico que o vincula ao bloco anterior. Essa cadeia de hashes torna a alteração de registros históricos praticamente impossível sem controlar a maioria da rede. Quando alguém tenta alterar uma transação antiga, o hash muda, quebrando a cadeia e alertando outros nós sobre a tentativa de adulteração.\n\nMecanismos de consenso garantem que todos os nós concordem com o conteúdo da blockchain sem exigir uma autoridade central. O Bitcoin usa prova de trabalho, onde os computadores competem para resolver quebra-cabeças matemáticos complexos. O primeiro a encontrar uma solução ganha o direito de adicionar o próximo bloco e receber bitcoins recém-criados como recompensa. Este processo, chamado mineração, consumiu aproximadamente 127 terawatt-horas de eletricidade em 2023, comparável ao uso anual de energia da Noruega.\n\nEthereum, lançado pelo programador Vitalik Buterin em julho de 2015, expandiu a blockchain além de simples transações para contratos inteligentes programáveis. Esses acordos autoexecutáveis aplicam automaticamente seus termos quando as condições predefinidas são atendidas. Um contrato inteligente para imóveis poderia liberar o pagamento para um vendedor e transferir a propriedade para um comprador simultaneamente, uma vez que ambas as partes cumpram suas obrigações. Nenhum advogado, agente de custódia ou banco precisa verificar a transação.\n\nFinanças descentralizadas, comumente chamadas de DeFi, usam contratos inteligentes para recriar serviços financeiros tradicionais sem intermediários. Plataformas de empréstimo permitem que os usuários tomem criptomoedas emprestadas fornecendo garantias, com taxas de juros determinadas por algoritmos em vez de banqueiros. As exchanges descentralizadas permitem a negociação direta entre usuários sem que uma empresa mantenha seus fundos. Em seu pico em novembro de 2021, os protocolos DeFi detinham mais de 180 bilhões de dólares em ativos.\n\nTokens não fungíveis, conhecidos como NFTs, aplicam blockchain à propriedade digital e à procedência. Cada NFT representa um ativo exclusivo verificado na blockchain, mais comumente arte digital ou colecionáveis. O artista digital Beeple vendeu uma obra de arte NFT na casa de leilões Christie's em março de 2021 por 69,3 milhões de dólares, catapultando esta tecnologia para a consciência geral. Os críticos questionam se os NFTs mantêm valor duradouro, enquanto os apoiadores argumentam que eles mudam fundamentalmente a forma como os criadores monetizam obras digitais.\n\nO gerenciamento da cadeia de suprimentos oferece aplicações práticas atraentes para a tecnologia blockchain. As empresas podem rastrear produtos de matérias-primas através da fabricação até as prateleiras do varejo com registros imutáveis em cada etapa. O Walmart fez parceria com a IBM em um sistema blockchain que rastreia a origem dos produtos alimentícios em segundos, em vez da semana exigida anteriormente. Essa capacidade se mostra inestimável durante os recalls de segurança alimentar, quando a identificação rápida de lotes contaminados salva vidas.\n\nOs governos exploram a blockchain para verificação de identidade, sistemas de votação e registros públicos. A Estônia, pioneira na governança digital, usa a blockchain para proteger registros de saúde, registros comerciais e documentos judiciais para seus 1,3 milhão de cidadãos. O secretário de estado da Virgínia Ocidental conduziu um projeto piloto de votação baseado em blockchain para militares estacionados no exterior durante as eleições de meio de mandato de 2018. Esses experimentos testam se a tecnologia pode aprimorar em vez de ameaçar as instituições democráticas.\n\nAs preocupações ambientais em torno da blockchain levaram a uma evolução tecnológica significativa. O Ethereum fez a transição da prova de trabalho com uso intensivo de energia para a prova de participação em setembro de 2022, reduzindo seu consumo de eletricidade em cerca de 99,95 por cento. A prova de participação seleciona validadores com base na criptomoeda que eles prometem como garantia, em vez de poder computacional. Essa mudança demonstra que a blockchain pode abordar sua pegada ambiental, mantendo a segurança.\n\nDesafios de escalabilidade limitam a adoção da blockchain para transações cotidianas. O Bitcoin processa aproximadamente sete transações por segundo, em comparação com a capacidade da rede Visa para 24.000. Soluções de camada dois constroem canais de pagamento mais rápidos em cima das blockchains existentes. A Lightning Network permite transações Bitcoin quase instantâneas, liquidando apenas os saldos finais na blockchain principal. Essas inovações visam tornar a blockchain prática para compras diárias.\n\nO futuro da blockchain se estende a reinos que seus criadores nunca imaginaram. As organizações autônomas descentralizadas, ou DAOs, usam a votação por token para governar comunidades e gerenciar tesourarias sem estruturas corporativas tradicionais. Os sistemas de identidade digital podem dar aos indivíduos controle sobre seus dados pessoais, ao mesmo tempo em que comprovam as credenciais para empregadores, proprietários ou governos. Se a blockchain cumprirá seu potencial revolucionário ou se estabelecerá em um nicho, permanece incerto, mas seu impacto na tecnologia e na sociedade já se mostrou substancial e duradouro.",
    "wordCount": 949,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "Quando foi publicado o whitepaper do Bitcoin?",
        "options": [
          "3 de janeiro de 2009",
          "31 de outubro de 2008",
          "Julho de 2015",
          "Setembro de 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "Quais são mencionadas como aplicações de blockchain além da criptomoeda? Selecione todas as que se aplicam.",
        "options": [
          "Gestão da cadeia de suprimentos",
          "Identidade digital",
          "Sistemas de votação",
          "Streaming de vídeo"
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
        "question": "O Ethereum fez a transição para prova de participação em setembro de 2022, reduzindo o consumo de eletricidade em 99,95 por cento.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "Por quanto a obra de arte Beeple NFT foi vendida na Christie's em março de 2021 (em milhões de dólares)?",
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
        "question": "Quem lançou o Ethereum em julho de 2015?",
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
        "question": "Quantas transações por segundo a rede Bitcoin pode processar?",
        "options": [
          "Cerca de 7",
          "Cerca de 70",
          "Cerca de 700",
          "Cerca de 7.000"
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
    "title": "A Revolução da Computação em Nuvem",
    "content": "A computação em nuvem transformou fundamentalmente a forma como empresas e indivíduos usam a tecnologia, transferindo software e armazenamento de dados de dispositivos locais para vastas redes de servidores remotos. Essa revolução arquitetônica possibilita recursos que pareciam impossíveis há apenas duas décadas, desde streaming de entretenimento até serviços de inteligência artificial acessíveis a partir de qualquer dispositivo. A nuvem se tornou tão essencial para a vida moderna que a maioria das pessoas a usa diariamente sem perceber conscientemente.\n\nA Amazon Web Services lançou seus primeiros produtos de nuvem em março de 2006, sendo pioneira no modelo de infraestrutura como serviço que remodelaria a indústria de tecnologia. A empresa havia construído uma enorme capacidade computacional para lidar com os períodos de pico de compras, como a Black Friday, e percebeu que poderia alugar a capacidade não utilizada para outras empresas. Andy Jassy, que liderou a AWS desde a sua fundação, transformou a divisão em um motor de lucro que gera mais de 80 bilhões de dólares em receita anual. Este modelo de negócios se mostrou tão bem-sucedido que os concorrentes correram para construir suas próprias plataformas de nuvem.\n\nO Microsoft Azure entrou no mercado de nuvem em fevereiro de 2010, alavancando os profundos relacionamentos da empresa com clientes empresariais. O CEO Satya Nadella, que assumiu a liderança em 2014, pivotou a estratégia da Microsoft em torno de serviços de nuvem. O Azure cresceu para se tornar o segundo maior provedor de nuvem, alimentando tudo, desde sites de pequenas empresas até a rede profissional LinkedIn. A transformação da Microsoft na nuvem reviveu uma empresa que muitos haviam descartado como ultrapassada.\n\nO Google Cloud Platform traz a experiência do gigante das buscas em computação distribuída e aprendizado de máquina para clientes empresariais. A empresa que indexa toda a internet e processa bilhões de consultas de pesquisa diariamente oferece essa infraestrutura para empresas de todos os tamanhos. Os investimentos do Google em cabos submarinos e data centers que abrangem dezenas de países permitem acesso de baixa latência de praticamente qualquer lugar da Terra. A plataforma se destaca particularmente em análise de dados e cargas de trabalho de inteligência artificial.\n\nA computação em nuvem oferece três modelos de serviço primários que se empilham uns sobre os outros como camadas. A Infraestrutura como Serviço fornece máquinas virtuais, armazenamento e rede que os clientes configuram sozinhos. A Plataforma como Serviço adiciona sistemas operacionais, bancos de dados e ferramentas de desenvolvimento. O Software como Serviço entrega aplicativos completos por meio de navegadores da web, eliminando totalmente a instalação e a manutenção. A maioria das pessoas interage com produtos SaaS diariamente por meio de e-mail, edição de documentos e aplicativos de negócios.\n\nA economia da computação em nuvem cria vantagens para organizações de quase todos os tamanhos. As startups são lançadas sem comprar hardware caro ou contratar pessoal especializado para manter data centers. Elas pagam apenas pelos recursos consumidos, aumentando a escala durante os períodos de pico e diminuindo durante os períodos de baixa. Essa flexibilidade transformou a economia de iniciar uma empresa de tecnologia. Um serviço que poderia ter exigido milhões em investimento em infraestrutura agora pode ser lançado com capital mínimo.\n\nAs organizações empresariais migram cada vez mais de data centers locais para plataformas de nuvem. A General Electric consolidou centenas de data centers em uma arquitetura de nuvem híbrida a partir de 2014. O Capital One, um dos maiores bancos da América, anunciou em 2020 que havia fechado seu último data center após migrar inteiramente para a AWS. Essas transformações levam anos e bilhões de dólares, mas, em última análise, reduzem os custos e aumentam os recursos.\n\nA segurança na nuvem difere fundamentalmente das abordagens tradicionais, mas geralmente excede o que as organizações alcançam de forma independente. Os principais provedores de nuvem empregam milhares de especialistas em segurança e investem bilhões em tecnologias de proteção. Eles possuem certificações para lidar com informações governamentais confidenciais e dados financeiros confidenciais. Modelos de responsabilidade compartilhada significam que os provedores protegem a infraestrutura, enquanto os clientes protegem seus próprios aplicativos e configurações de dados.\n\nA distribuição geográfica de data centers de nuvem serve a propósitos além da otimização de desempenho. As regulamentações em muitos países exigem que certos dados permaneçam dentro das fronteiras nacionais. Os provedores de nuvem constroem data centers regionais para cumprir esses requisitos de soberania. Os clientes europeus podem garantir que seus dados permaneçam em Frankfurt ou Amsterdã. As empresas australianas mantêm informações dentro de seu país. Essa arquitetura distribuída também fornece recursos de recuperação de desastres que poucas organizações poderiam pagar de forma independente.\n\nA computação de borda estende os recursos da nuvem para mais perto de onde os dados se originam. Em vez de enviar tudo para data centers distantes, os sistemas de borda processam informações localmente para aplicativos que exigem resposta imediata. Veículos autônomos não podem esperar que os dados viajem milhares de quilômetros antes de decidir frear. Sensores industriais que analisam vibrações de equipamentos precisam de detecção instantânea de anomalias. A computação de borda traz inteligência de nuvem para cenários onde milissegundos importam.\n\nA computação sem servidor representa a evolução mais recente da arquitetura de nuvem. Neste modelo, os desenvolvedores escrevem código sem gerenciar nenhuma infraestrutura. As plataformas de nuvem alocam automaticamente recursos quando o código é executado e cobram apenas pelo tempo de execução real. Uma função que é executada por 100 milissegundos custa uma pequena fração de um centavo. Os aplicativos podem escalar de zero para lidar com milhões de solicitações sem nenhuma alteração de configuração.\n\nO impacto ambiental da computação em nuvem gera preocupações e oportunidades. Os data centers consomem aproximadamente 1,5 por cento da eletricidade global e essa participação continua a crescer. No entanto, os provedores de nuvem operam com muito mais eficiência do que os data centers corporativos típicos. O Google afirma que suas instalações atingem uma eficácia média de uso de energia de 1,1 em comparação com a média da indústria acima de 1,5. As plataformas de nuvem alimentam cada vez mais as operações com energia renovável, com a Microsoft prometendo ser carbono negativo até 2030.\n\nA inteligência artificial e o aprendizado de máquina se tornaram características definidoras das plataformas de nuvem. Modelos pré-treinados para reconhecimento de imagem, processamento de linguagem natural e síntese de fala estão disponíveis por meio de interfaces de programação simples. Organizações sem experiência em aprendizado de máquina podem adicionar recursos sofisticados aos seus aplicativos. Os provedores de nuvem competem agressivamente em recursos de IA, cada um reivindicando vantagens em precisão, facilidade de uso e amplitude de modelos disponíveis.\n\nAs estratégias de multi-nuvem permitem que as organizações usem vários provedores simultaneamente, evitando a dependência de um único fornecedor. O Kubernetes, um sistema de orquestração de contêineres de código aberto originalmente desenvolvido pelo Google, permite que as cargas de trabalho se movam entre as nuvens. As empresas selecionam diferentes provedores para diferentes cargas de trabalho com base no custo, desempenho ou recursos especializados. Essa flexibilidade exige complexidade adicional, mas reduz as preocupações com o bloqueio do fornecedor.\n\nO futuro da computação em nuvem aponta para uma integração ainda maior com a vida diária e as operações de negócios. Os recursos de computação quântica já aparecem nas plataformas de nuvem, embora as aplicações práticas permaneçam limitadas. A inteligência artificial automatizará mais gerenciamento de infraestrutura, reduzindo a experiência necessária para implantar sistemas sofisticados. A linha entre dispositivos locais e recursos de nuvem se tornará ainda mais tênue à medida que a conectividade melhorar e a computação de borda amadurecer. Quaisquer que sejam as tecnologias específicas que surjam, a mudança fundamental da infraestrutura própria para serviços alugados continuará a remodelar como a humanidade computa.",
    "wordCount": 1267,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "Quando a Amazon Web Services lançou seus primeiros produtos de nuvem?",
        "options": [
          "Março de 2006",
          "Fevereiro de 2010",
          "Janeiro de 2014",
          "Novembro de 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "Quais são os três modelos primários de serviço de nuvem mencionados? Selecione todas as opções aplicáveis.",
        "options": [
          "Infraestrutura como Serviço",
          "Plataforma como Serviço",
          "Software como Serviço",
          "Hardware como Serviço"
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
        "question": "A Capital One anunciou em 2020 que havia fechado seu último data center após migrar inteiramente para a AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "Qual porcentagem da eletricidade global os data centers consomem?",
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
        "question": "Qual CEO direcionou a estratégia da Microsoft em torno dos serviços de nuvem a partir de 2014?",
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
        "question": "Qual sistema de código aberto permite que as cargas de trabalho se movam entre diferentes provedores de nuvem?",
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
        "question": "Qual a receita anual que a AWS gera (em bilhões de dólares)?",
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
        "question": "Até quando a Microsoft se comprometeu a ser carbono negativo?",
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
    "title": "A Revolução da Computação Quântica",
    "content": "A computação quântica representa a transformação mais profunda no poder computacional desde a invenção do transistor, prometendo resolver problemas que levariam mais tempo para computadores clássicos do que a idade do universo para serem concluídos. Essas máquinas aproveitam as propriedades bizarras da mecânica quântica para realizar cálculos de maneiras fundamentalmente novas que desafiam a intuição cotidiana. Compreender esta tecnologia revolucionária revela tanto o seu extraordinário potencial quanto os formidáveis desafios que permanecem antes que os computadores quânticos alcancem sua promessa total.\n\nOs computadores clássicos codificam informações como bits que existem como zero ou um em qualquer momento. Cada fotografia, documento e vídeo em seus dispositivos se reduz a longas sequências desses dígitos binários manipulados por meio de operações lógicas. Essa abordagem impulsionou um progresso notável desde a década de 1940, com processadores contendo agora bilhões de transistores em chips menores que uma unha. No entanto, certos problemas permanecem teimosamente fora de alcance porque o número de cálculos necessários cresce exponencialmente com o tamanho do problema.\n\nOs computadores quânticos usam bits quânticos, chamados qubits, que podem existir em superposição, representando zero e um simultaneamente até serem medidos. Essa propriedade permite que os sistemas quânticos explorem muitas soluções possíveis ao mesmo tempo, em vez de verificá-las uma por uma. Quando vários qubits se tornam entrelaçados, medir um afeta instantaneamente os outros, independentemente da distância física. Esses fenômenos quânticos habilitam algoritmos que superam drasticamente as abordagens clássicas para tipos de problemas específicos.\n\nRichard Feynman, o físico ganhador do Prêmio Nobel, propôs o conceito de computação quântica durante uma palestra no Instituto de Tecnologia da Califórnia em maio de 1981. Ele observou que simular sistemas mecânicos quânticos em computadores clássicos exigia recursos que cresciam exponencialmente à medida que o tamanho do sistema aumentava. Feynman sugeriu que apenas um computador mecânico quântico poderia simular eficientemente a física quântica. Essa percepção lançou um campo que se desenvolveria lentamente por décadas antes que avanços recentes acelerassem o progresso.\n\nDavid Deutsch, da Universidade de Oxford, formalizou a teoria da computação quântica em 1985, descrevendo como um computador quântico universal poderia explorar a superposição e a interferência. Peter Shor, no Bell Labs, tornou a computação quântica famosa em 1994, quando desenvolveu um algoritmo que poderia fatorar grandes números exponencialmente mais rápido do que qualquer método clássico conhecido. Essa descoberta ameaçou a criptografia RSA que protege as comunicações da internet, tornando repentinamente a computação quântica uma questão de segurança nacional.\n\nConstruir computadores quânticos reais provou ser extraordinariamente difícil porque os qubits são frágeis e facilmente perturbados pelo seu ambiente. Qualquer interação com o mundo exterior causa decoerência, colapsando a superposição e destruindo informações quânticas. Os primeiros experimentos mantiveram a coerência por apenas nanossegundos. Os pesquisadores desenvolveram técnicas de isolamento elaboradas, incluindo circuitos supercondutores resfriados a temperaturas mais frias do que o espaço sideral, tipicamente em torno de 15 milikelvins, mal acima do zero absoluto.\n\nA IBM colocou o primeiro computador quântico acessível via nuvem, chamado IBM Quantum Experience, online em maio de 2016, permitindo que pesquisadores e entusiastas de todo o mundo experimentassem hardware quântico real. O sistema inicial continha apenas cinco qubits, mal o suficiente para demonstrações simples. Em 2023, a IBM implantou sistemas que excederam 1.000 qubits e anunciou planos para sistemas de 100.000 qubits até 2033. Essas máquinas permanecem longe de substituir os computadores clássicos, mas demonstram um progresso constante em direção à utilidade prática.\n\nO Google alcançou um marco chamado supremacia quântica em outubro de 2019, quando seu processador Sycamore de 53 qubits realizou um cálculo em 200 segundos que levaria aproximadamente 10.000 anos para o supercomputador mais rápido do mundo. Os críticos contestaram a comparação, com a IBM argumentando que seus supercomputadores poderiam concluir a tarefa em dias, em vez de milênios. No entanto, a conquista demonstrou que os computadores quânticos poderiam superar os sistemas clássicos em pelo menos algumas tarefas.\n\nA correção de erros representa talvez o maior obstáculo para a computação quântica útil. Os qubits físicos são muito ruidosos e não confiáveis para cálculos complexos. A correção de erros quânticos codifica um qubit lógico em muitos qubits físicos para detectar e corrigir erros, mas as abordagens atuais exigem milhares de qubits físicos por qubit lógico. Um computador quântico que resolva problemas práticos pode precisar de milhões de qubits físicos, muito além das capacidades atuais.\n\nDiferentes tecnologias competem para construir os melhores qubits para futuros computadores quânticos. Os circuitos supercondutores, usados pela IBM e pelo Google, aproveitam técnicas de fabricação estabelecidas da indústria de semicondutores. Íons aprisionados, perseguidos pela IonQ e Honeywell, mantêm átomos carregados em campos eletromagnéticos com excepcional precisão. Sistemas fotônicos codificam informações em partículas de luz que podem viajar longas distâncias sem decoerência. Os qubits topológicos, ainda em grande parte teóricos, armazenariam informações em padrões resistentes a distúrbios locais.\n\nAs aplicações de química quântica podem oferecer as primeiras vantagens práticas da computação quântica. Simular moléculas para projetar novos medicamentos, materiais e catalisadores requer cálculos mecânicos quânticos que escalam exponencialmente em computadores clássicos. Um computador quântico poderia modelar reações químicas em nível atômico, potencialmente acelerando a descoberta de medicamentos, fertilizantes e tecnologias de energia limpa. Empresas como Roche, Merck e BASF lançaram programas de pesquisa em computação quântica antecipando essas capacidades.\n\nOs problemas de otimização que abrangem logística, finanças e aprendizado de máquina representam outra área de aplicação promissora. Encontrar a melhor rota para caminhões de entrega, portfólios ideais para investidores ou parâmetros ideais para redes neurais envolve a busca em vastos espaços de solução. O recozimento quântico, uma forma especializada de computação quântica comercializada pela D-Wave Systems desde 2011, aborda a otimização diretamente. Grandes corporações, incluindo Volkswagen, JPMorgan Chase e Lockheed Martin, exploraram a otimização quântica para desafios de negócios reais.\n\nA criptografia enfrenta ameaças e oportunidades do avanço da computação quântica. O algoritmo de Shor pode quebrar a criptografia amplamente utilizada quando existirem computadores quânticos suficientemente poderosos. O National Institute of Standards and Technology selecionou novos padrões criptográficos pós-quânticos em julho de 2022, após uma competição de seis anos para identificar algoritmos resistentes a ataques quânticos. Enquanto isso, a distribuição de chaves quânticas usa a física da medição quântica para criar criptografia teoricamente inquebrável para as comunicações mais sensíveis.\n\nA China investiu pesadamente em tecnologia quântica, estabelecendo a Universidade de Ciência e Tecnologia da China como líder mundial sob o físico Pan Jianwei. Em 2017, a China lançou o Micius, um satélite que demonstrou comunicações com segurança quântica entre estações terrestres separadas por 1.200 quilômetros. Pesquisadores chineses reivindicaram a supremacia quântica com um sistema fotônico chamado Jiuzhang em dezembro de 2020. Os Estados Unidos responderam com o National Quantum Initiative Act de 2018, alocando 1,2 bilhão de dólares ao longo de cinco anos para manter a competitividade.\n\nA indústria de computação quântica atraiu um enorme investimento, apesar dos prazos incertos para retornos práticos. O financiamento de capital de risco para startups quânticas excedeu 2,5 bilhões de dólares em 2022. Grandes empresas de tecnologia, incluindo Microsoft, Amazon e Alibaba, lançaram serviços de nuvem quântica, juntamente com empresas de hardware dedicadas. Os analistas projetam que o mercado de computação quântica atingirá 65 bilhões de dólares até 2030, embora as estimativas variem amplamente devido à incerteza tecnológica.\n\nO futuro da computação quântica depende do progresso contínuo em várias frentes simultaneamente. O hardware deve melhorar em escala, coerência e conectividade. O software deve desenvolver algoritmos eficientes e ferramentas de programação acessíveis além dos especialistas em física quântica. As aplicações devem demonstrar vantagens claras sobre as alternativas clássicas para problemas do mundo real. A jornada das demonstrações de laboratório para a utilidade prática pode levar décadas, mas as recompensas potenciais justificam o investimento e o esforço contínuos.",
    "wordCount": 1262,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "Quem propôs o conceito de computação quântica em maio de 1981?",
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
        "question": "Quais tecnologias são mencionadas como abordagens para construir qubits? Selecione todas as opções aplicáveis.",
        "options": [
          "Circuitos supercondutores",
          "Íons aprisionados",
          "Sistemas fotônicos",
          "Transistores de grafeno"
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
        "question": "A IBM colocou o primeiro computador quântico acessível pela nuvem online em maio de 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "Quantos segundos o processador Sycamore do Google levou para concluir seu cálculo de supremacia quântica?",
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
        "question": "Quando Peter Shor desenvolveu seu famoso algoritmo de fatoração?",
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
        "question": "A que temperatura os computadores quânticos supercondutores são normalmente resfriados?",
        "options": [
          "Cerca de 100 kelvin",
          "Cerca de 4 kelvin",
          "Cerca de 15 millikelvin",
          "Cerca de 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "Quanto financiamento a Lei da Iniciativa Nacional Quântica alocou ao longo de cinco anos (em bilhões de dólares)?",
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
        "question": "A China lançou um satélite de comunicação quântica chamado Micius em 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "Quando o NIST selecionou novos padrões criptográficos pós-quânticos?",
        "options": [
          "Julho de 2020",
          "Julho de 2021",
          "Julho de 2022",
          "Julho de 2023"
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
    "title": "A Indústria Global de Semicondutores",
    "content": "Os semicondutores tornaram-se a base da civilização moderna, alimentando tudo, desde smartphones e automóveis até dispositivos médicos e sistemas militares dos quais as nações dependem para a segurança. Esses minúsculos chips, contendo bilhões de transistores, representam os objetos mais complexos já fabricados pela humanidade, produzidos através de processos que exigem precisão medida em átomos. A competição global para controlar a tecnologia de semicondutores transformou esta indústria num ponto crítico de rivalidade geopolítica, com implicações para a prosperidade económica e a segurança nacional em todo o mundo.\n\nA jornada dos semicondutores começou no Bell Labs, em Nova Jersey, em 23 de dezembro de 1947, quando os físicos John Bardeen, Walter Brattain e William Shockley demonstraram o primeiro transistor. Este dispositivo podia amplificar sinais elétricos sem o calor e a fragilidade das válvulas de vácuo, o que rendeu aos seus inventores o Prêmio Nobel de Física em 1956. O potencial de miniaturização do transistor acabaria por permitir a revolução digital que remodelou a sociedade humana.\n\nJack Kilby, da Texas Instruments, e Robert Noyce, da Fairchild Semiconductor, inventaram independentemente o circuito integrado em 1958 e 1959, combinando vários transistores numa única peça de material semicondutor. Este avanço eliminou a necessidade de cablagem manual de componentes individuais e permitiu a fabricação em escala. Kilby recebeu o Prêmio Nobel de Física em 2000 por esta contribuição que tornou possível a eletrônica moderna.\n\nGordon Moore, cofundador da Intel, observou em 1965 que o número de transistores em circuitos integrados dobrava aproximadamente a cada dois anos, enquanto os custos permaneciam constantes. Esta observação, conhecida como Lei de Moore, orientou a indústria durante seis décadas de melhoria exponencial. Os processadores modernos contêm mais de 100 bilhões de transistores, cada um medindo apenas alguns nanômetros de largura, aproximadamente a largura de 20 átomos de silício.\n\nO processo de fabricação de semicondutores envolve centenas de etapas que abrangem meses de operações precisas. Os engenheiros começam com cilindros de silício ultrapuro cultivados a partir de material fundido a temperaturas superiores a 1.400 graus Celsius. Esses lingotes são cortados em finas wafers e polidos até obterem uma suavidade atômica. A fotolitografia projeta padrões de circuito em wafers usando luz ultravioleta, com as máquinas mais avançadas usando comprimentos de onda ultravioleta extrema de apenas 13,5 nanômetros.\n\nA Taiwan Semiconductor Manufacturing Company, conhecida como TSMC, emergiu como a fabricante de semicondutores mais importante do mundo. Fundada por Morris Chang em 1987, a TSMC foi pioneira no modelo de fundição de fabricação de chips projetados por outras empresas. Em 2023, a TSMC produziu mais de 90% dos chips mais avançados do mundo, incluindo processadores para Apple, AMD e Nvidia. Esta concentração de capacidade numa ilha que enfrenta reivindicações territoriais da China tornou-se uma grande preocupação geopolítica.\n\nO equipamento necessário para fabricar semicondutores avançados representa uma conquista tecnológica impressionante. A ASML, uma empresa holandesa, detém o monopólio das máquinas de litografia ultravioleta extrema, que custam aproximadamente 200 milhões de dólares cada e pesam 180.000 quilogramas. Esses sistemas usam plasma aquecido a 220.000 graus Celsius para gerar os comprimentos de onda de luz precisos necessários. A ASML exigiu contribuições do fornecedor de ótica Zeiss, do desenvolvedor de fontes de luz Cymer e de inúmeros outros parceiros para alcançar essa capacidade após décadas de desenvolvimento.\n\nA Samsung Electronics e a Intel competem com a TSMC pela liderança na fabricação avançada, embora ambas tenham ficado para trás nos últimos anos. A Samsung opera grandes instalações de fabricação na Coreia do Sul e no Texas, produzindo chips para vários clientes, além de seus próprios produtos. A Intel, historicamente líder em tecnologia, enfrentou atrasos na fabricação e perdeu participação de mercado antes de anunciar planos de investimento agressivos sob o comando do CEO Pat Gelsinger a partir de 2021.\n\nA China tornou a independência dos semicondutores uma prioridade nacional, investindo mais de 150 bilhões de dólares através do seu Fundo Nacional de Investimento na Indústria de Circuitos Integrados e outros programas. A Semiconductor Manufacturing International Corporation representa a fabricante doméstica mais avançada da China, embora permaneça várias gerações atrás da TSMC. Os controles de exportação americanos impostos a partir de outubro de 2022 restringem o acesso da China a equipamentos de fabricação avançados e projetos de chips, intensificando a pressão sobre o desenvolvimento indígena.\n\nA indústria automotiva descobriu sua perigosa dependência de semicondutores durante a escassez global de chips que começou em 2020. À medida que os bloqueios pandêmicos interromperam as cadeias de suprimentos, as montadoras cancelaram pedidos esperando uma demanda fraca. Quando a demanda se recuperou mais rápido do que o esperado, as fábricas de semicondutores alocaram capacidade para outros clientes. A General Motors, a Ford e a Toyota fecharam linhas de produção intermitentemente por mais de dois anos enquanto esperavam por chips. A escassez custou à indústria automotiva cerca de 210 bilhões de dólares em receita perdida.\n\nOs governos de todo o mundo lançaram programas massivos para construir capacidade doméstica de semicondutores. Os Estados Unidos aprovaram a Lei CHIPS e Ciência em agosto de 2022, alocando 52 bilhões de dólares para fabricação e pesquisa de semicondutores. A Lei Europeia de Chips comprometeu 43 bilhões de euros com objetivos semelhantes. O Japão anunciou 2 trilhões de ienes em subsídios para atrair fábricas da TSMC, Samsung e Micron. A Índia lançou um programa de 10 bilhões de dólares buscando sua primeira instalação de fabricação avançada.\n\nOs chips de memória representam uma categoria distinta de semicondutores dominada por diferentes players do que os processadores lógicos. A Samsung, a SK Hynix da Coreia do Sul e a Micron dos Estados Unidos controlam o mercado de DRAM para memória de computador. A indústria de memória flash, que armazena dados em smartphones e unidades de estado sólido, envolve os mesmos players coreanos, além da fabricante japonesa Kioxia. Os preços da memória flutuam drasticamente com os ciclos de oferta e demanda, criando padrões de expansão e queda que complicam as decisões de investimento.\n\nA indústria de design de semicondutores concentrou-se em torno de algumas empresas líderes que comandam enormes recursos. A Nvidia, fundada por Jensen Huang em 1993, transformou-se de uma empresa de placas gráficas em uma potência de inteligência artificial com chips que alimentam data centers em todo o mundo. A capitalização de mercado da empresa ultrapassou um trilhão de dólares em junho de 2023. A Qualcomm domina os processadores móveis com tecnologia licenciada para quase todos os fabricantes de smartphones. A AMD emergiu como um concorrente sério da Intel em computadores pessoais e servidores sob o comando da CEO Lisa Su.\n\nOs fornecedores de equipamentos de semicondutores formam uma camada crítica, mas muitas vezes negligenciada, do ecossistema da indústria. A Applied Materials, a Lam Research e a KLA Corporation dos Estados Unidos fornecem equipamentos de deposição, gravação e inspeção essenciais para a fabricação. A Tokyo Electron do Japão contribui com sistemas de revestimento e limpeza. Essas empresas investem bilhões anualmente em pesquisa e desenvolvimento para ultrapassar os limites da precisão da fabricação.\n\nA pegada ambiental da fabricação de semicondutores levanta preocupações de sustentabilidade que a indústria aborda cada vez mais. Uma instalação de fabricação moderna consome eletricidade equivalente a uma pequena cidade, com algumas plantas em Taiwan usando tanta energia quanto 300.000 residências. O consumo de água chega a milhões de galões por dia para processos de resfriamento e limpeza. A indústria comprometeu-se com a adoção de energia renovável e a reciclagem de água para reduzir o impacto ambiental, com a TSMC prometendo emissões líquidas zero até 2050.\n\nAs tecnologias avançadas de embalagem estendem o desempenho dos semicondutores além do que a miniaturização de transistores por si só pode alcançar. As arquiteturas de chiplets combinam vários chips menores em pacotes que funcionam como processadores únicos. O empilhamento tridimensional coloca os chips verticalmente conectados por pilares microscópicos. Essas técnicas permitem a melhoria contínua, mesmo quando a aproximação dos limites atômicos ameaça o dimensionamento tradicional. Os processadores mais recentes da AMD usam designs de chiplets que reduzem os custos de fabricação e melhoram o desempenho.\n\nAs demandas de força de trabalho da fabricação de semicondutores criam desafios para a expansão da indústria. Técnicos qualificados que operam equipamentos de fabricação exigem anos de treinamento. Os engenheiros que projetam processos de próxima geração precisam de diplomas avançados e experiência especializada. Os Estados Unidos enfrentam escassez particular após décadas de declínio na fabricação. Iniciativas educacionais e políticas de imigração determinarão se os países podem contratar as instalações de fabricação que estão correndo para construir.\n\nAs preocupações com a segurança permeiam a indústria de semicondutores à medida que os chips se tornam armas na competição tecnológica entre as nações. Os sistemas de defesa dependem de suprimentos de chips confiáveis, livres de vulnerabilidades ocultas. A prosperidade económica exige acesso às tecnologias mais avançadas para inteligência artificial, veículos autónomos e outras aplicações emergentes. A importância estratégica dos semicondutores garante que os governos continuarão a investir pesadamente e a restringir as exportações para proteger os interesses nacionais percebidos.\n\nA próxima década determinará se a indústria de semicondutores permanece concentrada no leste da Ásia ou se diversifica globalmente. Enormes investimentos em novas instalações de fabricação levarão anos para se tornarem produtivos. Os desafios tecnológicos se multiplicam à medida que os transistores se aproximam dos limites físicos fundamentais. Novos paradigmas de computação, incluindo processamento quântico e chips neuromórficos, podem eventualmente complementar ou substituir os semicondutores tradicionais. Quaisquer que sejam os rumos que a indústria tome, esses pequenos chips permanecerão essenciais para a vida moderna no futuro previsível.",
    "wordCount": 1562,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "Quando o primeiro transistor foi demonstrado nos Bell Labs?",
        "options": [
          "23 de dezembro de 1945",
          "23 de dezembro de 1947",
          "23 de dezembro de 1950",
          "23 de dezembro de 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "Quais empresas são mencionadas como fabricantes de chips de memória? Selecione todas as que se aplicam.",
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
        "question": "A TSMC produziu mais de 90% dos chips mais avançados do mundo até 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "Quanto custa uma máquina de litografia ultravioleta extrema da ASML (em milhões de dólares)?",
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
        "question": "Quem fundou a TSMC em 1987?",
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
        "question": "Quanto o CHIPS and Science Act alocou para semicondutores em agosto de 2022?",
        "options": [
          "32 bilhões de dólares",
          "42 bilhões de dólares",
          "52 bilhões de dólares",
          "62 bilhões de dólares"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "Quanto a escassez de chips automotivos custou à indústria em receita perdida (em bilhões de dólares)?",
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
        "question": "A capitalização de mercado da Nvidia excedeu um trilhão de dólares em junho de 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "A que temperatura o plasma é aquecido nas máquinas EUV da ASML?",
        "options": [
          "22.000 graus Celsius",
          "120.000 graus Celsius",
          "220.000 graus Celsius",
          "1.400 graus Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "Quantos bilhões de transistores os processadores modernos contêm?",
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
        "question": "Quando Jack Kilby inventou o circuito integrado na Texas Instruments?",
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
    "title": "A Evolução do Streaming de Mídia",
    "content": "O streaming de mídia transformou fundamentalmente a forma como a humanidade consome entretenimento, educação e informação, substituindo mídias físicas e programações de transmissão por acesso instantâneo a conteúdo virtualmente ilimitado a partir de qualquer dispositivo conectado à internet. Essa revolução tecnológica, que começou com vídeos granulados na década de 1990, agora oferece filmes em ultra-alta definição, concertos ao vivo e experiências interativas para bilhões de usuários em todo o mundo. A história do streaming revela como avanços em compressão, largura de banda e modelos de negócios se combinaram para remodelar indústrias inteiras.\n\nAs bases técnicas do streaming surgiram de pesquisas sobre compressão de vídeo e protocolos de rede durante as décadas de 1980 e 1990. Engenheiros do Moving Picture Experts Group desenvolveram os padrões MPEG que tornaram o vídeo digital prático, com o MPEG-1 surgindo em 1993 e o MPEG-4 em 1998. Esses algoritmos de compressão reduziram os arquivos de vídeo a tamanhos gerenciáveis, eliminando informações redundantes entre os frames e aproximando detalhes que o olho humano não notaria. Sem tal compressão, o streaming de vídeo exigiria uma largura de banda muito superior à que as redes poderiam fornecer.\n\nA RealNetworks lançou o RealPlayer em 1995, sendo pioneira no streaming de áudio e vídeo através das primeiras conexões de internet. O formato RealAudio da empresa permitiu que as estações de rádio transmitissem pela web pela primeira vez. O RealVideo seguiu em 1997, embora os vídeos do tamanho de um selo postal e gaguejantes tivessem pouca semelhança com o streaming moderno. No seu auge, por volta de 2000, o RealPlayer estava instalado em mais de 85% dos computadores conectados à internet.\n\nA Apple entrou na arena do streaming com o QuickTime, lançado originalmente em 1991 para reproduzir arquivos de vídeo locais. A empresa adicionou recursos de streaming ao longo da década de 1990 e alavancou a tecnologia ao lançar o iTunes em janeiro de 2001. Embora o iTunes inicialmente se concentrasse no download de músicas em vez de streaming, ele demonstrou o apetite do consumidor por acesso digital instantâneo. A Apple vendeu mais de 70 milhões de músicas através do iTunes no seu primeiro ano.\n\nA fundação do YouTube em fevereiro de 2005 pelos ex-funcionários do PayPal Chad Hurley, Steve Chen e Jawed Karim marcou o início da era mainstream do streaming de vídeo. A plataforma tornou o upload e o compartilhamento de vídeos simples para usuários comuns, sem conhecimento técnico. O primeiro vídeo, mostrando Karim no Zoológico de San Diego, foi ao ar em 23 de abril de 2005. O Google reconheceu o potencial do YouTube e adquiriu a empresa por 1,65 bilhão de dólares em outubro de 2006, apenas dezoito meses após sua fundação.\n\nA Netflix começou como um serviço de aluguel de DVDs por correio em 1997, fundada por Reed Hastings e Marc Randolph em Scotts Valley, Califórnia. A empresa introduziu aluguéis ilimitados por uma taxa de assinatura mensal em 1999, desafiando o modelo de aluguel por unidade da Blockbuster. A Netflix lançou streaming de vídeo em janeiro de 2007, inicialmente como um complemento ao seu serviço de DVD. Os assinantes podiam assistir a uma seleção limitada de filmes e programas de televisão diretamente em seus computadores, sem esperar que os discos chegassem.\n\nA transição dos DVDs para o streaming acelerou-se ao longo da década de 2010 à medida que as velocidades da internet melhoraram e as bibliotecas de conteúdo se expandiram. A Netflix começou a produzir programação original com o lançamento de House of Cards em fevereiro de 2013, que recebeu aclamação da crítica e demonstrou que as plataformas de streaming poderiam competir com as redes tradicionais por talento e qualidade. A empresa investiu pesadamente em conteúdo original, gastando mais de 17 bilhões de dólares anualmente em programação até 2022.\n\nO Spotify revolucionou o streaming de música depois que seus fundadores suecos Daniel Ek e Martin Lorentzon lançaram o serviço em outubro de 2008. A plataforma oferecia audição gratuita com suporte de publicidade e assinaturas premium sem anúncios. O Spotify negociou acordos de licenciamento com as principais gravadoras, apesar da resistência inicial de uma indústria ainda se recuperando do impacto devastador da pirataria. Em dezembro de 2023, o Spotify registrou 602 milhões de usuários ativos mensais e mais de 236 milhões de assinantes pagantes.\n\nO Amazon Prime Video surgiu da aquisição do serviço de vídeo que se tornou Amazon Unbox pela Amazon em 2006. A empresa agrupou streaming de vídeo com a assinatura Prime a partir de fevereiro de 2011, agregando valor à assinatura que anteriormente oferecia apenas frete mais rápido. A Amazon começou a produzir conteúdo original em 2013 e desde então ganhou prêmios Emmy e Academy Awards por suas produções. A combinação de streaming de vídeo com benefícios de compras cria vantagens competitivas únicas.\n\nA Disney lançou o Disney Plus em 12 de novembro de 2019, alavancando sua vasta biblioteca de conteúdo, incluindo as propriedades Marvel, Star Wars, Pixar e National Geographic. O serviço atraiu 10 milhões de assinantes no seu primeiro dia, demonstrando o poder de franquias amadas e preços agressivos. O Disney Plus atingiu mais de 160 milhões de assinantes em quatro anos, embora a empresa tenha enfrentado pressão para alcançar a lucratividade após perdas iniciais devido ao forte investimento em conteúdo.\n\nO streaming ao vivo expandiu-se para além do entretenimento para abranger jogos, educação, fitness e inúmeros outros domínios. O Twitch, fundado em 2011 e adquirido pela Amazon por 970 milhões de dólares em 2014, popularizou o streaming ao vivo de videogames. Jogadores profissionais transmitem para milhões de espectadores enquanto ganham renda por meio de assinaturas e doações. A plataforma teve uma média de mais de 31 milhões de visitantes diários em 2023, rivalizando com as transmissões esportivas tradicionais para o público jovem.\n\nAs inovações técnicas continuam a melhorar a qualidade e a eficiência do streaming. O streaming de taxa de bits adaptável ajusta automaticamente a qualidade do vídeo com base na largura de banda disponível, evitando o buffering e maximizando a resolução quando as conexões permitem. As redes de entrega de conteúdo posicionam os servidores geograficamente próximos aos espectadores, reduzindo a latência e melhorando a confiabilidade. Melhorias de codec, incluindo H.265 e AV1, oferecem maior qualidade com taxas de bits mais baixas, permitindo streaming 4K e 8K, mesmo em conexões limitadas.\n\nA infraestrutura que suporta os serviços de streaming exige um investimento massivo em data centers e capacidade de rede. A entrega de conteúdo da Netflix usa servidores posicionados dentro das redes de provedores de serviços de internet, armazenando cópias de títulos populares localmente para reduzir a transferência de dados de longa distância. Durante as horas de pico da noite, o streaming de vídeo representa mais de 60% do tráfego da internet na América do Norte. Essa concentração gerou debates sobre a neutralidade da rede e se os serviços de streaming devem pagar pela entrega prioritária.\n\nO streaming de música alterou fundamentalmente a forma como os artistas ganham renda e como as gravadoras operam. O Spotify paga aos artistas aproximadamente 0,003 a 0,005 dólares por stream, exigindo milhões de reproduções para gerar receita significativa. Este modelo favorece artistas com grandes seguidores engajados, ao mesmo tempo que torna mais difícil para os músicos emergentes sustentarem suas carreiras. Taylor Swift removeu notoriamente sua música do Spotify de 2014 a 2017, protestando contra a economia do streaming antes de finalmente retornar.\n\nO streaming de podcasts explodiu de um meio de nicho para uma grande categoria de conteúdo, atraindo bilhões em investimento. O Spotify adquiriu as empresas de podcast Gimlet Media e Anchor em fevereiro de 2019 por aproximadamente 340 milhões de dólares combinados. A Apple, que popularizou os podcasts através da integração com o iTunes a partir de 2005, enfrenta maior concorrência do Spotify e da Amazon. Mais de 2 milhões de podcasts com mais de 48 milhões de episódios existiam em 2023.\n\nAs guerras de streaming se intensificaram à medida que as empresas de mídia tradicionais lançam serviços concorrentes. HBO Max, Paramount Plus, Peacock e Apple TV Plus entraram no mercado entre 2019 e 2020. Essa fragmentação força os consumidores a assinarem vários serviços para acessar todo o conteúdo desejado, ironicamente recriando alguns dos inconvenientes dos pacotes de televisão a cabo que o streaming inicialmente prometeu eliminar. Analistas da indústria preveem consolidação à medida que os serviços menores lutam para competir.\n\nA expansão internacional apresenta oportunidades e desafios para as plataformas de streaming. A Netflix opera em mais de 190 países e produz conteúdo em dezenas de idiomas. A série coreana Squid Game tornou-se o programa mais assistido da Netflix em setembro de 2021, demonstrando o apetite global por conteúdo não inglês. Concorrentes locais, incluindo Hotstar na Índia, iQiyi na China e Globoplay no Brasil, mantêm posições fortes em seus mercados domésticos.\n\nAs preocupações regulatórias em torno dos serviços de streaming se multiplicam à medida que eles se tornam plataformas de entretenimento dominantes. Questões sobre privacidade de dados, moderação de conteúdo, práticas trabalhistas e concentração de mercado chamam a atenção dos formuladores de políticas. A União Europeia exige que os serviços de streaming garantam que 30% de seus catálogos consistam em obras europeias. Alguns países impõem impostos sobre assinaturas de streaming para financiar a produção de conteúdo local.\n\nO futuro do streaming aponta para maior interatividade, imersão e personalização. Os serviços de jogos na nuvem da Microsoft, Sony e outros transmitem videogames sem exigir hardware caro. As experiências de realidade virtual podem eventualmente ser transmitidas para headsets leves. Os algoritmos de inteligência artificial continuarão a refinar as recomendações e, potencialmente, gerar conteúdo personalizado. Quaisquer que sejam as tecnologias específicas que surjam, o streaming transformou permanentemente a relação entre criadores e audiências em todo o mundo.",
    "wordCount": 1602,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "Quando a Netflix lançou seu serviço de streaming de vídeo?",
        "options": [
          "Janeiro de 2005",
          "Janeiro de 2007",
          "Janeiro de 2009",
          "Janeiro de 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "Quais empresas fundaram as principais plataformas de streaming? Selecione todas as opções aplicáveis.",
        "options": [
          "Chad Hurley co-fundou o YouTube",
          "Reed Hastings co-fundou a Netflix",
          "Daniel Ek co-fundou o Spotify",
          "Bill Gates fundou o Disney Plus"
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
        "question": "O Google adquiriu o YouTube por 1,65 bilhão de dólares em outubro de 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "Quantos milhões de assinantes o Spotify reportou como assinantes pagantes em dezembro de 2023?",
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
        "question": "Quando foi enviado o primeiro vídeo para o YouTube?",
        "options": [
          "14 de fevereiro de 2005",
          "23 de abril de 2005",
          "4 de julho de 2005",
          "9 de outubro de 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "Quantos assinantes o Disney Plus atraiu no seu primeiro dia?",
        "options": [
          "1 milhão",
          "5 milhões",
          "10 milhões",
          "20 milhões"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "Quanto a Amazon pagou para adquirir o Twitch em 2014 (em milhões de dólares)?",
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
        "question": "A Netflix começou como um serviço de aluguel de DVDs por correio em 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "Qual série original da Netflix foi lançada em fevereiro de 2013?",
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
        "question": "Qual porcentagem do tráfego da internet na América do Norte o streaming de vídeo representa durante os horários de pico?",
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
        "question": "Qual série coreana se tornou o programa mais assistido da Netflix em setembro de 2021?",
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
    "title": "A Ciência dos Mecanismos de Busca",
    "content": "Os mecanismos de busca se tornaram os principais portais através dos quais a humanidade acessa o vasto repositório de informações na internet, processando bilhões de consultas diariamente e moldando como as pessoas descobrem, avaliam e entendem o mundo ao seu redor. Os algoritmos sofisticados que impulsionam esses sistemas representam alguns dos softwares mais complexos já desenvolvidos, combinando técnicas de recuperação de informação, processamento de linguagem natural, aprendizado de máquina e computação distribuída. Entender como os mecanismos de busca funcionam revela tanto suas capacidades notáveis quanto sua profunda influência no conhecimento e comportamento humano.\n\nAs origens da busca na web remontam ao início da década de 1990, quando a internet estava crescendo demais para diretórios com curadoria manual. Archie, criado por Alan Emtage na Universidade McGill em Montreal em 1990, indexava nomes de arquivos em servidores FTP, mas não pesquisava páginas da web. O World Wide Web Wanderer, desenvolvido por Matthew Gray no MIT em 1993, tornou-se o primeiro rastreador da web, medindo o crescimento da internet visitando páginas automaticamente. Essas ferramentas primitivas lançaram as bases para sistemas mais sofisticados.\n\nAltaVista foi lançado em dezembro de 1995 e rapidamente se tornou o principal mecanismo de busca de sua época. Desenvolvido por pesquisadores da Digital Equipment Corporation em Palo Alto, Califórnia, o AltaVista podia pesquisar um banco de dados de 20 milhões de páginas da web usando indexação de texto completo. Os usuários se maravilhavam com os resultados que apareciam em segundos para consultas em milhões de documentos. Em seu auge em 1997, o AltaVista processava 80 milhões de consultas de pesquisa por dia.\n\nLarry Page e Sergey Brin criaram o Google como um projeto de pesquisa da Universidade de Stanford em 1996, introduzindo o algoritmo PageRank que transformaria a busca. A percepção deles era que os links entre as páginas da web continham informações valiosas sobre relevância e autoridade. Uma página vinculada por muitas outras páginas, particularmente páginas importantes, deveria ter uma classificação mais alta do que uma com poucos links. Esta abordagem produziu resultados dramaticamente melhores do que os concorrentes que classificavam as páginas principalmente pela frequência de palavras-chave.\n\nO PageRank simula um surfista da web aleatório que clica em links aleatoriamente e ocasionalmente salta para uma página completamente aleatória. A probabilidade de que este surfista hipotético visite qualquer página em particular se torna sua pontuação PageRank. As páginas que recebem muitos links de páginas com PageRank alto acumulam pontuações mais altas. Este modelo matemático, detalhado no artigo de Page e Brin de 1998 publicado enquanto eles eram estudantes de doutorado, permanece fundamental para a classificação do Google, apesar de inúmeros refinamentos subsequentes.\n\nO processo de rastreamento da web começa com uma lista de URLs conhecidos que programas automatizados chamados de aranhas ou rastreadores visitam. O rastreador baixa o conteúdo de cada página e extrai todos os hiperlinks que contém. Novos URLs são adicionados à fila para rastreamento futuro. O rastreador do Google, originalmente chamado BackRub e mais tarde Googlebot, visita bilhões de páginas continuamente, priorizando sites frequentemente atualizados e aqueles com muitos links de entrada. Um rastreamento completo da web leva semanas, embora as páginas populares sejam rastreadas novamente com muito mais frequência.\n\nA indexação transforma o conteúdo bruto da página da web em dados estruturados que permitem a recuperação rápida. Os mecanismos de busca constroem índices invertidos que mapeiam cada palavra para a lista de documentos que a contém. Quando você pesquisa um termo, o mecanismo procura a lista de postagem desse termo em vez de escanear todos os documentos. Estruturas de dados adicionais armazenam informações sobre posições de palavras para correspondência de frases, texto âncora de links de entrada e metadados como títulos de páginas e datas de modificação.\n\nO processamento de consulta interpreta o que os usuários realmente desejam quando digitam termos de pesquisa. O entendimento da linguagem natural ajuda os mecanismos de busca a reconhecer que uma pesquisa por tênis de corrida provavelmente busca produtos em vez de informações sobre calçados que correm. O reconhecimento de entidades identifica pesquisas por pessoas, lugares, organizações e conceitos. A expansão de consulta adiciona sinônimos e termos relacionados para melhorar o recall. A correção ortográfica corrige erros de digitação antes de executar as pesquisas, com o Google corrigindo aproximadamente 10% de todas as consultas.\n\nOs algoritmos de classificação combinam centenas de sinais para determinar quais páginas respondem melhor a cada consulta. Além do PageRank, o Google considera fatores como a presença de palavras-chave em títulos e cabeçalhos, a atualização do conteúdo, a compatibilidade com dispositivos móveis, a velocidade de carregamento da página e a relevância geográfica. Modelos de aprendizado de máquina treinados em vastos conjuntos de dados de comportamento do usuário substituíram amplamente as fórmulas de classificação criadas manualmente. O RankBrain, introduzido em 2015, usa redes neurais para interpretar consultas ambíguas e identificar resultados relevantes.\n\nO comportamento do usuário fornece feedback crucial que os mecanismos de busca usam para melhorar as classificações. As taxas de cliques indicam quais resultados os usuários acham promissores. O tempo gasto nas páginas após clicar sugere se os resultados satisfizeram a consulta. O padrão de retornar aos resultados da pesquisa e clicar em links diferentes, chamado de pogo-sticking, indica que os resultados iniciais não foram úteis. Os mecanismos de busca analisam bilhões de sinais desse tipo diariamente para refinar seus algoritmos.\n\nOs gráficos de conhecimento representam informações sobre entidades e seus relacionamentos em bancos de dados estruturados. O Gráfico de Conhecimento do Google, introduzido em maio de 2012, contém bilhões de fatos sobre pessoas, lugares, coisas e conceitos. Quando você pesquisa uma pessoa famosa, o painel de conhecimento que aparece ao lado dos resultados é retirado desses dados estruturados. O Wikidata, uma base de conhecimento colaborativa operada pela Wikimedia Foundation, contribui substancialmente para esses sistemas.\n\nOs snippets em destaque e as respostas diretas visam satisfazer as consultas sem exigir que os usuários cliquem nos sites. O Google extrai trechos relevantes de páginas da web e os exibe com destaque para perguntas. Os assistentes de voz dependem fortemente dessas respostas diretas, pois os usuários não podem clicar em links em dispositivos somente de áudio. Os editores debatem se os snippets em destaque ajudam, direcionando o tráfego, ou prejudicam, reduzindo-o, com alguns optando por não participar da seleção de snippets.\n\nA pesquisa local conecta consultas a empresas e serviços próximos. Quando alguém pesquisa por cafeterias ou encanadores, o mecanismo de busca incorpora sua localização para mostrar opções locais relevantes. Os perfis do Google Meu Negócio permitem que as empresas forneçam informações diretamente. As avaliações agregadas de várias fontes ajudam os usuários a escolher entre as opções. A pesquisa local gera receita substancial por meio de publicidade, com empresas pagando para aparecer com destaque para consultas comerciais.\n\nA publicidade de pesquisa transformou o Google em uma das empresas mais valiosas do mundo. Os anunciantes dão lances em palavras-chave, pagando apenas quando os usuários clicam em seus anúncios. O sistema de leilão do Google considera tanto os valores dos lances quanto a qualidade dos anúncios para determinar quais anúncios aparecem e em que ordem. A publicidade de pesquisa gerou mais de 162 bilhões de dólares em receita para a empresa controladora do Google, a Alphabet, em 2022. Este modelo de negócios cria incentivos para maximizar o envolvimento do usuário com os resultados da pesquisa.\n\nSpam e manipulação têm atormentado os mecanismos de busca desde seus primeiros dias. Operadores de sites inescrupulosos enchem páginas com palavras-chave ocultas, criam redes de links artificiais e empregam inúmeras outras táticas para manipular as classificações. Os mecanismos de busca se envolvem em constantes corridas armamentistas contra essa manipulação. A atualização Penguin do Google em abril de 2012 penalizou sites com padrões de links não naturais. A empresa emprega milhares de avaliadores de qualidade que avaliam os resultados da pesquisa de acordo com diretrizes detalhadas.\n\nAs preocupações com a privacidade cercam os vastos dados que os mecanismos de busca coletam sobre as consultas e o comportamento do usuário. Os históricos de pesquisa revelam preocupações com a saúde, situações financeiras, problemas de relacionamento e inúmeros outros detalhes íntimos. O Google retém dados de pesquisa vinculados a contas por padrão, usando-os para personalização e segmentação de publicidade. Alternativas como o DuckDuckGo se diferenciam prometendo não rastrear os usuários, embora sacrifiquem algumas capacidades de personalização.\n\nA concorrência na pesquisa permaneceu limitada, apesar do escrutínio regulatório em todo o mundo. O Google detém aproximadamente 91% da participação no mercado global de pesquisa, de acordo com dados da StatCounter de 2023. O Bing, mecanismo de busca da Microsoft, reivindica cerca de 3% globalmente, mas tem um desempenho melhor nos Estados Unidos. Alternativas regionais, incluindo Baidu na China e Yandex na Rússia, dominam seus mercados domésticos. A União Europeia multou o Google em 2,42 bilhões de euros em junho de 2017 por favorecer seu próprio serviço de comparação de compras nos resultados da pesquisa.\n\nA inteligência artificial está transformando a pesquisa por meio de grandes modelos de linguagem que entendem e geram linguagem natural. O lançamento do ChatGPT em novembro de 2022 gerou preocupações de que a IA conversacional pudesse interromper a pesquisa tradicional. A Microsoft integrou o GPT-4 ao Bing em fevereiro de 2023. O Google respondeu com o Bard e, posteriormente, o Gemini. Esses sistemas podem sintetizar informações de várias fontes e se envolver em diálogo, potencialmente mudando a forma como as pessoas encontram informações online.\n\nO futuro da pesquisa se estende além das consultas de texto para imagens, voz e entradas multimodais. O Google Lens permite pesquisar usando câmeras de smartphones, identificando objetos, traduzindo textos e resolvendo problemas de matemática a partir de imagens. A pesquisa por voz por meio de alto-falantes inteligentes e smartphones representa uma parcela crescente das consultas. Os mecanismos de busca devem se adaptar a novos dispositivos e padrões de interação, mantendo a velocidade e a precisão que os usuários esperam.",
    "wordCount": 1628,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "Quem criou o primeiro rastreador da web chamado World Wide Web Wanderer em 1993?",
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
        "question": "Quais fatores os mecanismos de busca consideram ao classificar as páginas? Selecione todas as opções aplicáveis.",
        "options": [
          "Análise de links PageRank",
          "Atualidade do conteúdo",
          "Velocidade de carregamento da página",
          "Apenas tamanho do arquivo"
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
        "question": "O AltaVista processou 80 milhões de consultas de pesquisa por dia no seu auge em 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "Qual a porcentagem da participação de mercado global de buscas que o Google detém, de acordo com dados de 2023?",
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
        "question": "Quando foi introduzido o Knowledge Graph do Google?",
        "options": [
          "Maio de 2010",
          "Maio de 2012",
          "Maio de 2014",
          "Maio de 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "Quando a atualização Penguin do Google penalizou sites com padrões de links não naturais?",
        "options": [
          "Abril de 2010",
          "Abril de 2012",
          "Abril de 2014",
          "Abril de 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q7",
        "type": "numeric",
        "question": "Qual a receita que a publicidade em pesquisa gerou para a Alphabet em 2022 (em bilhões de dólares)?",
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
        "question": "O Google corrige aproximadamente 10 por cento de todas as consultas de pesquisa para erros de ortografia.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "Quando a Microsoft integrou o GPT-4 ao Bing?",
        "options": [
          "Novembro de 2022",
          "Fevereiro de 2023",
          "Junho de 2023",
          "Outubro de 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "Quanto a União Europeia multou o Google em junho de 2017 (em bilhões de euros)?",
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
        "question": "Quando o RankBrain foi introduzido pelo Google?",
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
        "question": "Quando o AltaVista foi lançado?",
        "options": [
          "Dezembro de 1993",
          "Dezembro de 1995",
          "Dezembro de 1997",
          "Dezembro de 1999"
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
    "title": "Veículos Autônomos e o Futuro do Transporte",
    "content": "Veículos autônomos prometem revolucionar o transporte com tecnologia de direção autônoma que poderia reduzir acidentes, transformar paisagens urbanas e alterar fundamentalmente a forma como a humanidade move pessoas e bens por distâncias pequenas e grandes. Essa visão ambiciosa atraiu centenas de bilhões de dólares em investimentos de montadoras de automóveis, gigantes da tecnologia e startups correndo para resolver os imensos desafios técnicos, regulatórios e sociais envolvidos. A jornada em direção a veículos verdadeiramente autônomos revela o estado atual desta tecnologia transformadora e os obstáculos que permanecem antes que os carros autônomos se tornem comuns.\n\nO sonho de veículos autônomos precede o próprio computador digital. Norman Bel Geddes apresentou a exposição Futurama na Feira Mundial de Nova York de 1939, retratando rodovias automatizadas onde os carros viajariam com segurança sem intervenção humana na década de 1960. A General Motors, que patrocinou a exposição, mais tarde fez parceria com a RCA para desenvolver o carro conceito Firebird IV em 1964, apresentando sistemas de orientação eletrônica que poderiam seguir fios embutidos nas estradas. Essas primeiras visões exigiam mudanças na infraestrutura, em vez de inteligência veicular.\n\nO desenvolvimento moderno de veículos autônomos começou com as competições DARPA Grand Challenge que catalisaram a pesquisa acadêmica e da indústria a partir de 2004. O primeiro desafio, realizado no Deserto de Mojave, ofereceu um milhão de dólares para qualquer veículo que pudesse completar um percurso de 241 quilômetros (150 milhas) sem intervenção humana. Todos os participantes falharam, com o veículo mais distante viajando apenas 11,9 quilômetros (7,4 milhas) antes de ficar preso. O desafio de 2005 viu cinco veículos completarem o percurso, com o Stanley da Universidade de Stanford vencendo em 6 horas e 53 minutos.\n\nA Society of Automotive Engineers define seis níveis de automação de direção que se tornaram padrão da indústria. O Nível 0 significa nenhuma automação, com humanos controlando todas as tarefas de direção. O Nível 1 inclui assistência básica como controle de cruzeiro adaptativo. O Nível 2 combina múltiplos recursos de assistência, mas exige supervisão humana constante. O Nível 3 permite que o veículo lide com toda a direção em condições limitadas, enquanto os humanos permanecem prontos para intervir. O Nível 4 atinge a automação completa dentro de domínios operacionais definidos. O Nível 5 significa automação completa em todas as condições, igualando ou excedendo a capacidade humana em todos os lugares.\n\nSistemas de sensores fornecem aos veículos autônomos as capacidades de percepção necessárias para uma navegação segura. As câmeras capturam informações visuais sobre faixas, sinais, semáforos e outros usuários da estrada. O radar mede a velocidade e a distância de objetos próximos através de ondas de rádio que funcionam independentemente da iluminação ou do clima. O Lidar usa pulsos de laser para criar mapas tridimensionais detalhados do ambiente, com alguns sistemas gerando mais de dois milhões de pontos de dados por segundo. Sensores ultrassônicos detectam obstáculos de curto alcance durante manobras de estacionamento.\n\nWaymo, a subsidiária de veículos autônomos da Alphabet, surgiu do projeto de carro autônomo do Google que começou em 2009. Sebastian Thrun, que liderou a equipe vencedora do DARPA de Stanford, dirigiu a pesquisa inicial. O projeto acumulou milhões de milhas de teste em vários estados antes da Waymo lançar o serviço comercial de robotáxi em Phoenix, Arizona, em dezembro de 2018. Em outubro de 2023, os veículos da Waymo haviam percorrido mais de 11,2 milhões de quilômetros (7 milhões de milhas) em vias públicas sem motoristas de segurança, principalmente em Phoenix e São Francisco.\n\nA Tesla tem buscado uma abordagem diferente para a autonomia através de seus sistemas Autopilot e Full Self-Driving. Em vez de Lidar caro, a Tesla conta com câmeras e visão computacional treinadas em dados de milhões de veículos de clientes. O CEO Elon Musk previu repetidamente a autonomia total iminente, alegando em 2016 que um Tesla se dirigiria sozinho de Los Angeles a Nova York até 2017. Esta previsão e muitas subsequentes não se concretizaram, embora os veículos Tesla ofereçam recursos de assistência ao motorista cada vez mais capazes.\n\nA Cruise, controlada majoritariamente pela General Motors, operava serviços de robotáxi em São Francisco até que o Departamento de Veículos Motorizados da Califórnia revogou suas licenças em outubro de 2023, após um incidente em que um veículo atingiu e arrastou um pedestre. A empresa havia se expandido agressivamente, operando centenas de veículos em várias cidades. A revogação da licença destacou os desafios regulatórios enfrentados pela indústria e a dificuldade de garantir a segurança em escala.\n\nEmpresas chinesas surgiram como importantes players no desenvolvimento de veículos autônomos. A plataforma Apollo da Baidu começou o desenvolvimento em 2017 e acumulou mais de 100 milhões de quilômetros de testes em estrada. A Pony.ai, fundada em 2016, opera serviços de robotáxi em várias cidades chinesas e na Califórnia. A WeRide fez parceria com a Nissan e estabeleceu operações no Oriente Médio. Cidades chinesas, incluindo Wuhan, Guangzhou e Shenzhen, permitiram operações comerciais de robotáxi cobrindo áreas urbanas significativas.\n\nOs sistemas de inteligência artificial que impulsionam os veículos autônomos devem lidar com uma complexidade extraordinária. Algoritmos de visão computacional identificam e classificam milhares de tipos de objetos, desde pedestres e ciclistas até zonas de construção e veículos de emergência. Modelos de previsão antecipam como outros usuários da estrada se comportarão nos próximos segundos. Algoritmos de planejamento escolhem trajetórias que chegam aos destinos com segurança e eficiência. Todos esses cálculos devem ser executados em milissegundos, levando em conta a incerteza e cenários raros.\n\nCasos extremos apresentam desafios particulares para sistemas autônomos. Um saco plástico voando em uma rodovia e uma criança correndo para a rua podem parecer semelhantes aos sensores, mas exigem respostas completamente diferentes. Trabalhadores da construção civil dirigindo o tráfego com gestos manuais substituem as regras de trânsito normais. Veículos de emergência se aproximando de ângulos obscuros exigem ação imediata. Os dados de treinamento não podem cobrir todos os cenários, exigindo que os veículos generalizem adequadamente a partir de experiências semelhantes.\n\nA validação de segurança levanta questões fundamentais sobre como demonstrar que os veículos autônomos estão prontos para a implantação. Motoristas humanos têm em média aproximadamente um acidente fatal por 160 milhões de quilômetros (100 milhões de milhas) percorridos nos Estados Unidos. Provar estatisticamente que um sistema autônomo atende ou excede essa referência exigiria bilhões de quilômetros de teste, um padrão impraticável. As empresas, em vez disso, empregam simulação, testes em circuito fechado e implantação gradual, monitorando continuamente o desempenho no mundo real.\n\nOs marcos regulatórios para veículos autônomos variam drasticamente entre as jurisdições. A Califórnia exige que as empresas relatem as desconexões quando os motoristas de segurança humana assumem o controle. O Arizona adotou uma abordagem permissiva que atraiu atividades de teste. A Alemanha aprovou uma legislação em 2021 permitindo veículos de Nível 4 em vias públicas sob condições específicas. A China designou certas cidades como zonas de teste com domínios operacionais gradualmente expandidos. Essa colcha de retalhos de regulamentos complica as estratégias de implantação internacional.\n\nOs benefícios potenciais dos veículos autônomos vão muito além da conveniência. Acidentes de veículos matam aproximadamente 1,35 milhão de pessoas em todo o mundo anualmente, com erro humano contribuindo para mais de 90% dos acidentes. Sistemas autônomos não se distraem, ficam fatigados ou incapacitados. Eles poderiam reduzir drasticamente essa taxa se seu desempenho de segurança exceder o dos motoristas humanos. O transporte se tornaria acessível a populações idosas, deficientes e jovens atualmente incapazes de dirigir sozinhas.\n\nAs implicações econômicas do transporte autônomo poderiam remodelar indústrias inteiras. Motoristas profissionais, incluindo caminhoneiros, operadores de táxi e entregadores, enfrentam potencial deslocamento. Empresas de transporte como Uber e Lyft investem pesadamente em autonomia esperando eliminar seu maior custo. Os modelos de seguro devem se adaptar quando os motoristas humanos não controlam mais os veículos. Planejadores urbanos imaginam cidades com menos estacionamentos e estradas mais estreitas, à medida que veículos autônomos compartilhados reduzem a contagem total de veículos.\n\nAs aplicações de caminhões podem atingir a viabilidade comercial antes dos robotáxis de passageiros devido a ambientes rodoviários mais previsíveis. A Aurora, co-fundada por ex-líderes dos programas autônomos do Google, Tesla e Uber, concentra-se principalmente em frete. A TuSimple conduziu trajetos rodoviários totalmente autônomos entre Phoenix e Dallas antes que dificuldades financeiras forçassem uma reestruturação estratégica em 2023. Embark, Kodiak e inúmeras outras empresas buscam aplicações semelhantes de transporte rodoviário de longa distância.\n\nO cronograma para a adoção generalizada de veículos autônomos permanece altamente incerto, apesar de décadas de desenvolvimento e investimentos maciços. Projeções otimistas de meados da década de 2010 previram robotáxis onipresentes no início da década de 2020. A realidade provou ser muito mais desafiadora do que o esperado. Especialistas da indústria agora geralmente esperam uma implantação gradual ao longo de décadas, em vez de uma transformação repentina. A tecnologia provavelmente melhorará incrementalmente, expandindo de domínios operacionais limitados para capacidades mais amplas ao longo de muitos anos.",
    "wordCount": 1459,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "Quando foi realizado o primeiro DARPA Grand Challenge?",
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
        "question": "Quais tipos de sensores os veículos autônomos usam? Selecione todas as opções aplicáveis.",
        "options": [
          "Câmeras",
          "Radar",
          "Lidar",
          "Sensores de raio-X"
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
        "question": "O veículo da Universidade de Stanford chamado Stanley venceu o DARPA Grand Challenge de 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "Quantos milhões de milhas os veículos Waymo dirigiram sem motoristas de segurança até outubro de 2023?",
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
        "question": "Quando a Waymo lançou o serviço comercial de robotáxi em Phoenix?",
        "options": [
          "Dezembro de 2016",
          "Dezembro de 2018",
          "Dezembro de 2020",
          "Dezembro de 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "Quantos níveis de automação de direção a Society of Automotive Engineers define?",
        "options": [
          "Quatro",
          "Cinco",
          "Seis",
          "Sete"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "Quantas pessoas morrem anualmente em acidentes de veículos em todo o mundo (em milhões)?",
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
        "question": "O erro humano contribui para mais de 90% dos acidentes de veículos.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "Quando a Alemanha aprovou uma legislação permitindo veículos de Nível 4 em vias públicas?",
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
        "question": "Quantas milhas o veículo mais distante percorreu no DARPA Grand Challenge de 2004?",
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
        "question": "Quando a plataforma de direção autônoma Apollo da Baidu começou a ser desenvolvida?",
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
        "question": "Quando foi a exibição Futurama na Feira Mundial?",
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
        "question": "Quantos pontos de dados por segundo alguns sistemas lidar podem gerar (em milhões)?",
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
        "question": "Quando o DMV da Califórnia revogou as licenças de veículos autônomos da Cruise?",
        "options": [
          "Outubro de 2022",
          "Outubro de 2023",
          "Janeiro de 2023",
          "Junho de 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
