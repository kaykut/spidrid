import { Article } from '../../../types/learning';

export const TECHNOLOGY_INTERNET_ARTICLES: Article[] = [
  {
    "id": "technology-internet-p01",
    "topicId": "technology-internet",
    "title": "Cómo Funciona Internet",
    "content": "Internet conecta miles de millones de dispositivos en todo el mundo a través de una intrincada red de redes que se extiende por todos los continentes de la Tierra. Cada vez que visitas un sitio web, envías un correo electrónico o reproduces un video, los datos viajan a través de esta vasta infraestructura digital en meros milisegundos. Comprender este notable sistema nos ayuda a apreciar la tecnología que ha transformado la comunicación moderna.\n\nCuando escribes una dirección web en tu navegador, un proceso complejo comienza instantáneamente. Tu computadora primero se pone en contacto con un servidor del Sistema de Nombres de Dominio (DNS), que traduce la dirección legible por humanos en una dirección IP numérica que las computadoras entienden. Esto funciona de manera similar a buscar un número de teléfono en un directorio, haciendo coincidir los nombres con la información de contacto real.\n\nTu solicitud viaja entonces a través de tu Proveedor de Servicios de Internet (ISP) a las redes centrales que forman la infraestructura principal de Internet. Estos cables de fibra óptica de alta capacidad se extienden por los continentes y cruzan los océanos a profundidades que superan los 6.000 metros. Transportan enormes cantidades de datos a casi la velocidad de la luz, gestionando más de 500 billones de bytes de información diariamente.\n\nLos datos no viajan como una sola unidad a través de Internet. En cambio, se dividen en pequeños paquetes, cada uno de los cuales contiene parte de la información más los detalles de la dirección. Estos paquetes pueden tomar diferentes rutas para llegar a su destino, encontrando caminos alrededor de la congestión o fallas. En el destino, se vuelven a ensamblar en el orden correcto para recrear el mensaje original.\n\nLos enrutadores (routers) sirven como los controladores de tráfico de Internet, tomando decisiones críticas a cada momento. Estos dispositivos especializados examinan el destino de cada paquete y determinan la mejor ruta a seguir. Toman estas decisiones de enrutamiento miles de millones de veces por segundo, manteniendo el flujo de datos sin problemas a través de redes propiedad de miles de organizaciones diferentes.\n\nInternet comenzó como ARPANET en 1969, un proyecto de investigación militar de los Estados Unidos diseñado para sobrevivir a las interrupciones de la comunicación durante posibles ataques. Vint Cerf y Bob Kahn desarrollaron los protocolos TCP/IP en la década de 1970, creando la base técnica que aún sustenta Internet en la actualidad. Su diseño descentralizado asegura que ningún punto único de falla pueda derribar toda la red.\n\nTim Berners-Lee inventó la World Wide Web en 1989 mientras trabajaba en el CERN en Suiza. Creó el sistema de hipervínculos y navegadores web que hizo que Internet fuera accesible para todos. La web se puso a disposición del público en agosto de 1991, y en una década Internet se había transformado de una herramienta de investigación en una plataforma de comunicación global utilizada por cientos de millones de personas.",
    "wordCount": 483,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p01-q1",
        "type": "single_choice",
        "question": "¿Quién inventó la World Wide Web?",
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
        "question": "¿Quiénes desarrollaron los protocolos TCP/IP? Selecciona todas las que correspondan.",
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
        "question": "Los datos viajan a través de Internet como archivos completos individuales en lugar de dividirse en paquetes.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-p01-q4",
        "type": "numeric",
        "question": "¿En qué año comenzó ARPANET, el predecesor de Internet?",
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
    "title": "El Ascenso de la Inteligencia Artificial",
    "content": "La inteligencia artificial ha evolucionado desde una fantasía de ciencia ficción hasta una tecnología práctica que afecta casi todos los aspectos de la vida moderna. Desde los asistentes de teléfonos inteligentes hasta los sistemas de diagnóstico médico, la IA ahora realiza tareas que antes requerían inteligencia humana. Esta transformación representa uno de los cambios tecnológicos más significativos desde la invención de la computación misma.\n\nEl concepto de inteligencia artificial surgió en un taller celebrado en Dartmouth College en New Hampshire durante el verano de 1956. El científico informático John McCarthy acuñó el término y reunió a investigadores que creían que se podían crear máquinas para simular la inteligencia humana. Estos pioneros imaginaron la creación de máquinas pensantes en una sola generación, aunque el progreso resultó ser mucho más lento que sus optimistas predicciones.\n\nLa investigación inicial en IA se centró en el razonamiento simbólico, programando computadoras con reglas explícitas sobre cómo resolver problemas. Los investigadores crearon sistemas expertos que codificaban el conocimiento humano en árboles de decisión y reglas lógicas. Estos sistemas lograron resultados impresionantes en dominios estrechos como el ajedrez y el diagnóstico médico, pero tuvieron dificultades con tareas que requerían sentido común o el manejo de información ambigua.\n\nLa revolución del aprendizaje automático comenzó a transformar la IA en la década de 1990 y se aceleró drásticamente después de 2010. En lugar de programar reglas explícitas, los investigadores entrenaron algoritmos para descubrir patrones en grandes conjuntos de datos. Las redes neuronales, vagamente inspiradas en las estructuras biológicas del cerebro, demostraron ser especialmente poderosas para reconocer imágenes, comprender el habla y generar texto similar al humano.\n\nEl aprendizaje profundo surgió como el enfoque dominante de la IA después de un gran avance en 2012. Geoffrey Hinton y sus estudiantes de la Universidad de Toronto demostraron que las redes neuronales profundas con muchas capas podían superar drásticamente los métodos anteriores en tareas de reconocimiento de imágenes. Su sistema redujo las tasas de error en más del 40 por ciento en comparación con los mejores enfoques anteriores.\n\nEl entrenamiento de los sistemas modernos de IA requiere enormes recursos computacionales y vastas cantidades de datos. Los grandes modelos lingüísticos pueden contener cientos de miles de millones de parámetros y requerir miles de procesadores especializados trabajando durante meses. Empresas tecnológicas como Google, Microsoft y OpenAI han invertido miles de millones de dólares en la construcción de la infraestructura necesaria para entrenar estos sistemas cada vez más capaces.\n\nLas capacidades de los sistemas de IA se han expandido notablemente en los últimos años. Los sistemas de visión artificial ahora pueden identificar objetos, rostros y actividades en imágenes con una precisión sobrehumana. El procesamiento del lenguaje natural ha avanzado hasta el punto en que la IA puede participar en conversaciones matizadas, escribir ensayos coherentes y traducir entre docenas de idiomas. Los sistemas de IA ahora componen música, generan obras de arte y escriben código informático.\n\nLa IA ya impulsa muchos servicios que las personas utilizan a diario sin conciencia consciente. Los algoritmos de recomendación sugieren videos en YouTube y productos en Amazon basándose en las preferencias aprendidas. Los filtros de correo electrónico utilizan el aprendizaje automático para separar los mensajes importantes del spam. Las aplicaciones de navegación predicen patrones de tráfico y sugieren rutas óptimas. Los asistentes de voz como Siri y Alexa utilizan la IA para comprender los comandos hablados.\n\nLa atención médica representa una de las aplicaciones más prometedoras para la inteligencia artificial. Los sistemas de IA pueden analizar imágenes médicas para detectar el cáncer antes que los radiólogos humanos en algunos casos. El descubrimiento de fármacos utiliza el aprendizaje automático para identificar compuestos prometedores y predecir sus efectos. Los asistentes de IA ayudan a los médicos a mantenerse al día con la literatura médica en rápida expansión y sugieren opciones de tratamiento basadas en la evidencia.\n\nLas preocupaciones sobre la seguridad de la IA y el impacto social han crecido junto con sus capacidades. A los investigadores les preocupan los sistemas que persiguen objetivos de formas inesperadas o dañinas. Los eticistas plantean preguntas sobre el sesgo en los sistemas de IA entrenados con datos históricos que reflejan los prejuicios humanos. Los economistas debaten cómo la automatización afectará al empleo a medida que la IA asuma tareas que antes realizaban trabajadores humanos.\n\nLos gobiernos de todo el mundo han comenzado a desarrollar regulaciones para la inteligencia artificial. La Unión Europea aprobó una legislación integral sobre IA en 2024 que clasifica los sistemas por nivel de riesgo e impone requisitos a las aplicaciones de alto riesgo. China ha implementado reglas que rigen los algoritmos de recomendación y la IA generativa. Estados Unidos ha emitido órdenes ejecutivas que abordan la seguridad de la IA mientras se debate una legislación más completa.\n\nEl futuro de la inteligencia artificial sigue siendo incierto, pero parece probable que traiga un avance rápido continuo. Los investigadores persiguen la inteligencia artificial general que podría igualar la capacidad humana en todas las tareas cognitivas, aunque las estimaciones de cuándo podría ocurrir esto varían desde años hasta nunca. Lo que parece seguro es que la IA continuará remodelando las industrias, creando nuevas posibilidades y planteando preguntas profundas sobre la relación entre la inteligencia humana y la de las máquinas.\n\nComprender la inteligencia artificial se ha convertido en un conocimiento esencial para desenvolverse en el mundo moderno. Ya sea como usuarios, trabajadores, ciudadanos o legisladores, las personas necesitan cada vez más comprender lo que la IA puede y no puede hacer. Esta tecnología seguirá evolucionando, y la participación informada en su desarrollo ayudará a garantizar que la IA beneficie a la humanidad en general.",
    "wordCount": 930,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c1-q1",
        "type": "single_choice",
        "question": "¿Dónde y cuándo se originó el término \"inteligencia artificial\"?",
        "options": [
          "MIT en 1960",
          "Dartmouth College en 1956",
          "Stanford University en 1965",
          "Bell Labs en 1950"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c1-q2",
        "type": "multiple_select",
        "question": "¿Qué aplicaciones de la IA en la atención médica se mencionan en el artículo? Seleccione todas las que correspondan.",
        "options": [
          "Analizar imágenes médicas para detectar cáncer",
          "Realizar cirugías robóticas",
          "Descubrimiento de fármacos",
          "Sugerir opciones de tratamiento"
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
        "question": "La investigación temprana de la IA se centró principalmente en el aprendizaje automático en lugar del razonamiento simbólico.",
        "correctAnswer": false
      },
      {
        "id": "technology-internet-c1-q4",
        "type": "numeric",
        "question": "¿En qué año Geoffrey Hinton y sus estudiantes demostraron un avance en el aprendizaje profundo?",
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
        "question": "¿Quién acuñó el término \"inteligencia artificial\"?",
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
        "question": "¿En cuánto redujeron las redes neuronales profundas las tasas de error en comparación con los métodos anteriores en 2012?",
        "options": [
          "Más del 20 por ciento",
          "Más del 30 por ciento",
          "Más del 40 por ciento",
          "Más del 50 por ciento"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c1-q7",
        "type": "numeric",
        "question": "¿En qué año aprobó la Unión Europea una legislación integral sobre IA?",
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
    "title": "Ciberseguridad: Protegiendo el Mundo Digital",
    "content": "La ciberseguridad protege computadoras, redes y datos de ataques digitales que amenazan a miles de millones de personas diariamente. Los hackers atacan todo, desde cuentas bancarias personales hasta infraestructura crítica como redes eléctricas y hospitales. El campo ha crecido desde una especialidad de nicho hasta una de las disciplinas más importantes en la tecnología moderna.\n\nEl primer virus informático importante, llamado Brain, apareció en Pakistán en enero de 1986. Dos hermanos llamados Basit y Amjad Farooq Alvi lo crearon para rastrear copias ilegales de su software médico. El virus se propagó lentamente a través de disquetes infectados, tardando meses en llegar a computadoras de todo el mundo. Hoy en día, el malware se propaga a través de Internet en segundos, infectando millones de dispositivos antes de que los expertos en seguridad puedan responder.\n\nLos ataques de phishing siguen siendo el método más común que utilizan los delincuentes para robar información confidencial. Estos correos electrónicos engañosos simulan provenir de fuentes confiables como bancos, empleadores o sitios web populares. Engañan a los destinatarios para que hagan clic en enlaces maliciosos o ingresen contraseñas en sitios web falsos. El FBI informó que los ataques de phishing causaron pérdidas de más de 10 mil millones de dólares durante 2022 solamente.\n\nEl ransomware representa uno de los tipos más destructivos de ataques cibernéticos modernos. Este software malicioso encripta los archivos de una víctima y exige el pago de la clave de descifrado. El ataque de WannaCry en mayo de 2017 infectó a más de 200,000 computadoras en 150 países en solo cuatro días. Hospitales en el Reino Unido tuvieron que cancelar miles de citas médicas y desviar ambulancias a instalaciones no afectadas.\n\nLas contraseñas seguras forman la base de la ciberseguridad personal. Los expertos en seguridad recomiendan usar al menos 12 caracteres que combinen letras mayúsculas, letras minúsculas, números y símbolos. Cada cuenta debe tener una contraseña única para evitar que una sola brecha comprometa múltiples servicios. Los administradores de contraseñas ayudan a los usuarios a generar y almacenar contraseñas complejas sin tener que memorizarlas.\n\nLa autenticación de dos factores agrega una segunda capa crucial de seguridad más allá de las contraseñas. Este sistema requiere algo que usted sabe, como una contraseña, más algo que usted tiene, como un teléfono que recibe códigos de verificación. Incluso si los hackers roban su contraseña, no pueden acceder a su cuenta sin el segundo factor. Google informó que la autenticación de dos factores bloquea el 99,9 por ciento de los ataques automatizados a las cuentas.\n\nEl cifrado codifica los datos en un código ilegible que solo las partes autorizadas pueden descifrar. Cuando ve un icono de candado en la barra de direcciones de su navegador, el cifrado protege su conexión a ese sitio web. El cifrado de extremo a extremo en las aplicaciones de mensajería garantiza que solo usted y su destinatario puedan leer sus mensajes. Incluso la empresa que proporciona el servicio no puede acceder al contenido cifrado.\n\nLos gobiernos y las corporaciones invierten miles de millones en defensa de la ciberseguridad. La Agencia de Ciberseguridad e Infraestructura de Seguridad de los Estados Unidos, conocida como CISA, protege las redes federales y ayuda a las empresas privadas a defenderse contra los ataques. Las grandes empresas de tecnología emplean a miles de investigadores de seguridad que buscan vulnerabilidades y desarrollan medidas de protección.\n\nLos hackers éticos desempeñan un papel vital en la mejora de la seguridad al encontrar debilidades antes de que lo hagan los delincuentes. Las empresas pagan recompensas que oscilan entre cientos y millones de dólares por informes de vulnerabilidades graves. Apple lanzó su programa de recompensas por errores en 2016 y ahora ofrece hasta 2 millones de dólares por los fallos de seguridad más críticos del iPhone. Estos programas convierten a los atacantes potenciales en defensores que fortalecen la infraestructura digital.\n\nEl futuro de la ciberseguridad enfrenta nuevos desafíos de las tecnologías emergentes. Las computadoras cuánticas pueden eventualmente romper el cifrado que actualmente protege la banca, las comunicaciones y los secretos gubernamentales. Los investigadores de seguridad ya están desarrollando algoritmos resistentes a la cuántica para prepararse para esta amenaza. La inteligencia artificial crea tanto nuevos métodos de ataque como nuevas capacidades defensivas en una carrera armamentista tecnológica en curso.",
    "wordCount": 704,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p02-q1",
        "type": "single_choice",
        "question": "¿Cuál fue el nombre del primer virus informático importante?",
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
        "question": "¿Qué porcentaje de ataques automatizados bloquea la autenticación de dos factores según Google?",
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
        "question": "¿Cuáles son las prácticas recomendadas para una seguridad de contraseñas sólida? Seleccione todas las que correspondan.",
        "options": [
          "Usar al menos 12 caracteres",
          "Usar la misma contraseña para todas las cuentas",
          "Combinar mayúsculas, minúsculas, números y símbolos",
          "Usar un administrador de contraseñas"
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
        "question": "El ataque de ransomware WannaCry infectó computadoras en más de 150 países.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p02-q5",
        "type": "numeric",
        "question": "¿Cuánto dinero causaron los ataques de phishing en pérdidas durante 2022 (en miles de millones de dólares)?",
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
    "title": "El Internet de las Cosas: Un Mundo Conectado",
    "content": "El Internet de las Cosas ha tejido inteligencia digital en el entramado de la vida cotidiana, conectando miles de millones de dispositivos que sienten, se comunican y actúan sin intervención humana. Desde termostatos inteligentes que aprenden tus preferencias hasta sensores industriales que monitorizan equipos a través de continentes, esta revolución tecnológica extiende el internet más allá de ordenadores y teléfonos al mundo físico. Entender este ecosistema interconectado revela tanto posibilidades notables como desafíos significativos que darán forma a las próximas décadas.\n\nKevin Ashton, un pionero tecnológico británico que trabajaba en Procter and Gamble, acuñó el término Internet de las Cosas en 1999 mientras desarrollaba sistemas de identificación por radiofrecuencia para rastrear productos a través de las cadenas de suministro. Él imaginó ordenadores recopilando información sobre el mundo físico independientemente en lugar de depender de que los humanos introdujeran datos. Esta visión tardó décadas en materializarse a medida que los sensores se abarataron, la conectividad inalámbrica mejoró y la computación en la nube proporcionó la infraestructura para procesar vastos flujos de datos.\n\nEl número de dispositivos conectados ha crecido exponencialmente desde que la adopción comercial del IoT comenzó alrededor de 2010. Analistas de Statista estimaron 15.100 millones de dispositivos IoT en todo el mundo en 2020, proyectando alcanzar los 29.000 millones para 2030. Cada dispositivo genera datos continuamente, creando flujos de información que empequeñecen el tráfico tradicional de internet. Una sola fábrica conectada podría producir terabytes de datos de sensores diariamente desde miles de puntos de monitorización.\n\nLa tecnología del hogar inteligente representa la aplicación de consumo más visible de los principios del IoT. El Nest Learning Thermostat, introducido por el ex ingeniero de Apple, Tony Fadell, en octubre de 2011, fue pionero en la adopción generalizada del hogar inteligente. El dispositivo observaba cuándo los residentes estaban en casa y sus preferencias de temperatura, luego ajustaba automáticamente la calefacción y la refrigeración para ahorrar energía. Google adquirió Nest Labs por 3.200 millones de dólares en enero de 2014, señalando el compromiso de las principales empresas de tecnología con este mercado.\n\nLos asistentes de voz se han convertido en centros neurálgicos para los ecosistemas de hogar inteligente. Amazon lanzó el altavoz Echo con Alexa en noviembre de 2014, seguido por Google Home en 2016 y HomePod de Apple en 2018. Estos dispositivos responden a comandos de voz para controlar luces, cerraduras, termostatos y sistemas de entretenimiento. Para 2024, más de 200 millones de hogares en todo el mundo poseían altavoces inteligentes, utilizándolos para tareas que van desde configurar temporizadores hasta pedir comida a domicilio.\n\nLos dispositivos portátiles rastrean métricas de salud con creciente sofisticación y precisión. El Apple Watch, lanzado en abril de 2015, evolucionó de un accesorio de moda a un dispositivo médico capaz de detectar ritmos cardíacos irregulares y caídas. Un estudio publicado en el New England Journal of Medicine en noviembre de 2019 encontró que el reloj identificaba la fibrilación auricular, una afección cardíaca grave, con un 84 por ciento de precisión. Los monitores continuos de glucosa permiten a los diabéticos rastrear el azúcar en la sangre sin pinchazos en los dedos, transmitiendo datos a los teléfonos inteligentes y alertando a los usuarios sobre niveles peligrosos.\n\nEl IoT industrial, a veces llamado Industria 4.0, transforma la fabricación con una visibilidad y control sin precedentes. Los sensores integrados en la maquinaria detectan vibraciones, temperaturas y consumo de energía que indican fallas inminentes antes de que ocurran averías. General Electric fue pionera en el mantenimiento predictivo a través de su plataforma Predix, afirmando ahorrar a los clientes miles de millones en tiempo de inactividad evitado. Un solo motor a reacción genera 10 terabytes de datos durante un vuelo transatlántico, analizados continuamente para optimizar el rendimiento y programar el mantenimiento.\n\nLa agricultura adopta el IoT para aumentar los rendimientos y reducir el impacto ambiental. Los sensores de humedad del suelo activan el riego solo cuando las plantas necesitan agua, reduciendo el consumo hasta en un 30 por ciento en comparación con el riego programado. Los drones equipados con cámaras multiespectrales identifican el estrés de los cultivos, las infestaciones de plagas y las deficiencias de nutrientes en vastos campos. John Deere, la empresa de equipos agrícolas de 185 años, ahora recopila datos de millones de máquinas conectadas y vende servicios de análisis a los agricultores junto con los tractores.\n\nLas ciudades inteligentes despliegan infraestructura IoT para gestionar los sistemas urbanos de forma más eficiente. Barcelona implementó uno de los programas de ciudades inteligentes más completos a partir de 2012, instalando sensores en toda la ciudad para monitorizar la disponibilidad de aparcamiento, los niveles de los contenedores de basura, la calidad del aire y las necesidades de riego. La ciudad reclama ahorros anuales de 75 millones de dólares al tiempo que mejora los servicios para los residentes. Singapur, Copenhague y Seúl han emprendido iniciativas similares, utilizando sensores conectados para optimizar el flujo de tráfico, el consumo de energía y la respuesta a emergencias.\n\nLas aplicaciones sanitarias se extienden mucho más allá de los dispositivos portátiles al monitoreo remoto de pacientes y entornos clínicos. Los pacientes que se recuperan de una cirugía o que gestionan afecciones crónicas pueden ser monitorizados en casa con dispositivos conectados que alertan a los equipos de atención sobre cambios preocupantes. Los hospitales rastrean la ubicación y el estado de los equipos críticos en tiempo real. Los ensayos clínicos utilizan dispositivos IoT para recopilar datos más precisos sobre la salud de los participantes entre visitas. La pandemia de COVID-19 aceleró la adopción de tecnologías de monitoreo remoto que anteriormente habían enfrentado una lenta aceptación.\n\nLas preocupaciones de seguridad que rodean a los dispositivos IoT han demostrado ser inquietantemente válidas. Muchos fabricantes priorizan las características y los precios bajos sobre una seguridad robusta, enviando dispositivos con contraseñas predeterminadas y vulnerabilidades sin parchear. El ataque de la botnet Mirai en octubre de 2016 secuestró cientos de miles de cámaras web y DVR no asegurados para lanzar ataques distribuidos de denegación de servicio que interrumpieron importantes sitios web como Twitter, Netflix y PayPal. Los investigadores demuestran regularmente vulnerabilidades alarmantes en monitores para bebés, coches, dispositivos médicos y sistemas industriales.\n\nLas implicaciones de privacidad de la detección generalizada plantean profundas preguntas sobre la vigilancia y la propiedad de los datos. Los asistentes de voz graban conversaciones en los hogares. Los rastreadores de actividad física revelan detalles íntimos sobre la salud y las rutinas diarias. Los coches conectados transmiten datos de ubicación que revelan a dónde van los conductores y cómo conducen. Las empresas recopilan esta información para mejorar el servicio y la publicidad dirigida, mientras que los gobiernos buscan cada vez más acceso para la aplicación de la ley y fines de seguridad nacional.\n\nLos desafíos de interoperabilidad fragmentan el panorama del IoT en ecosistemas incompatibles. Los dispositivos de diferentes fabricantes a menudo no pueden comunicarse directamente, lo que obliga a los consumidores a elegir plataformas y limita la funcionalidad. El protocolo Matter, lanzado en noviembre de 2022 por un consorcio que incluye a Apple, Google, Amazon y Samsung, tiene como objetivo crear un estándar universal para dispositivos domésticos inteligentes. Esta iniciativa representa el reconocimiento de la industria de que la fragmentación dificulta la adopción y la innovación.\n\nLa computación en el borde (edge computing) aborda las limitaciones de latencia y ancho de banda de enviar todos los datos del IoT a servidores en la nube distantes. Procesar la información localmente, en o cerca de los dispositivos, permite respuestas en tiempo real para aplicaciones como vehículos autónomos y robótica industrial. Un coche autónomo no puede esperar a que los datos viajen a un servidor en la nube y regresen antes de decidir frenar. Las arquitecturas de borde distribuyen la inteligencia a través de las redes en lugar de concentrarla en centros de datos centralizados.\n\nLas restricciones energéticas dan forma al diseño y despliegue de dispositivos IoT. Los sensores alimentados por baterías deben funcionar durante años sin reemplazo en lugares que pueden ser inaccesibles o peligrosos. Las tecnologías de red de área amplia de baja potencia como LoRaWAN y Sigfox permiten a los dispositivos comunicarse a través de kilómetros mientras consumen una energía mínima. La recolección de energía de fuentes solares, térmicas o cinéticas permite que algunos dispositivos funcionen indefinidamente sin baterías.\n\nLa huella ambiental de miles de millones de dispositivos conectados exige atención a medida que el IoT se expande. La fabricación de estos productos consume recursos y energía. La mayoría de los dispositivos carecen de disposiciones para el reciclaje de sus componentes electrónicos. La conectividad de red continua requiere energía tanto de los dispositivos como de la infraestructura. Sin embargo, las aplicaciones del IoT en la gestión de la energía, la agricultura y el transporte pueden reducir el impacto ambiental general cuando se despliegan cuidadosamente.\n\nEl futuro del IoT apunta hacia la inteligencia ambiental que anticipa las necesidades y responde automáticamente a las condiciones cambiantes. Los gemelos digitales crean réplicas virtuales de sistemas físicos para la simulación y la optimización. La inteligencia artificial aplicada a los datos de los sensores permite predicciones y automatizaciones más allá de lo que la programación explícita podría lograr. La frontera entre los mundos físico y digital continúa desdibujándose a medida que la inteligencia conectada se extiende por todo el entorno que habitamos.",
    "wordCount": 1534,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-c2-q1",
        "type": "single_choice",
        "question": "¿Quién acuñó el término \"Internet de las Cosas\" en 1999?",
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
        "question": "¿Qué compañías lanzaron dispositivos de asistente de voz importantes? Seleccione todas las que correspondan.",
        "options": [
          "Amazon con Echo",
          "Google con Google Home",
          "Apple con HomePod",
          "Microsoft con altavoz Cortana"
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
        "question": "El ataque de la botnet Mirai en octubre de 2016 secuestró cientos de miles de webcams y DVRs no seguros.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q4",
        "type": "numeric",
        "question": "¿Cuánto pagó Google para adquirir Nest Labs en enero de 2014 (en miles de millones de dólares)?",
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
        "question": "¿Cuándo se lanzó el Apple Watch?",
        "options": [
          "Octubre de 2011",
          "Enero de 2014",
          "Abril de 2015",
          "Noviembre de 2016"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c2-q6",
        "type": "single_choice",
        "question": "¿Qué ciudad implementó uno de los programas de ciudad inteligente más completos a partir de 2012?",
        "options": [
          "Singapur",
          "Barcelona",
          "Copenhague",
          "Seúl"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q7",
        "type": "numeric",
        "question": "¿Cuántos dispositivos IoT se prevé que existirán en todo el mundo para 2030 (en miles de millones)?",
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
        "question": "El protocolo Matter se lanzó para crear un estándar universal para dispositivos domésticos inteligentes.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c2-q9",
        "type": "single_choice",
        "question": "¿Con qué precisión identificó el Apple Watch la fibrilación auricular según el estudio del New England Journal of Medicine?",
        "options": [
          "74 por ciento",
          "84 por ciento",
          "94 por ciento",
          "99 por ciento"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c2-q10",
        "type": "multiple_select",
        "question": "¿Qué aplicaciones de IoT en la agricultura se mencionan? Seleccione todas las que correspondan.",
        "options": [
          "Sensores de humedad del suelo para riego",
          "Drones con cámaras multiespectrales",
          "Tractores conectados con análisis",
          "Cosecha robótica"
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
    "title": "La Evolución de las Redes Sociales",
    "content": "Las redes sociales han transformado la forma en que los humanos se comunican, comparten información y construyen comunidades de maneras que nadie predijo cuando internet surgió por primera vez. Las plataformas que conectan a miles de millones de usuarios han remodelado la política, el comercio, el entretenimiento y las relaciones personales en todos los continentes. La historia de las redes sociales revela tanto una innovación notable como profundos desafíos para la sociedad moderna.\n\nLos primeros sitios de redes sociales aparecieron a finales de la década de 1990, cuando internet se hizo accesible para la gente común. SixDegrees se lanzó en 1997, permitiendo a los usuarios crear perfiles y conectarse con amigos. El sitio atrajo aproximadamente a 3,5 millones de miembros antes de cerrar en 2001. Friendster le siguió en 2002, siendo pionero en características que se convertirían en estándar en toda la industria. MySpace dominó de 2005 a 2008, convirtiéndose en el sitio web más visitado en los Estados Unidos y lanzando las carreras de músicos como Arctic Monkeys.\n\nFacebook surgió de una habitación de la residencia universitaria de Harvard en febrero de 2004. Mark Zuckerberg y sus compañeros de habitación crearon el sitio inicialmente solo para estudiantes universitarios. La plataforma se abrió a todos los mayores de 13 años en septiembre de 2006. Para 2012, Facebook alcanzó los mil millones de usuarios activos mensuales, un hito que ninguna red social había logrado jamás. La compañía ahora opera como Meta e informa de más de 3 mil millones de usuarios mensuales en su familia de aplicaciones, incluidas Instagram y WhatsApp.\n\nTwitter introdujo un nuevo formato para la comunicación social cuando se lanzó en julio de 2006. La plataforma limitó las publicaciones a 140 caracteres, que luego se ampliaron a 280, obligando a los usuarios a expresar sus pensamientos de forma concisa. Twitter se convirtió en esencial para las noticias de última hora, el discurso político y la interacción con celebridades. El servicio desempeñó papeles notables durante las protestas de la Primavera Árabe en 2011 y ha dado forma a la conversación pública sobre innumerables temas desde entonces.\n\nYouTube revolucionó el intercambio de videos después de que tres exempleados de PayPal lo fundaran en febrero de 2005. El primer video, titulado \"Yo en el zoológico\", mostró al cofundador Jawed Karim en el zoológico de San Diego durante solo 18 segundos. Google compró YouTube por 1.650 millones de dólares en octubre de 2006. Hoy en día, los usuarios suben más de 500 horas de contenido de video cada minuto, y la plataforma llega a más personas de 18 a 49 años que todas las cadenas de televisión por cable combinadas.\n\nInstagram llevó el intercambio de fotos a los dispositivos móviles cuando Kevin Systrom y Mike Krieger lo lanzaron en octubre de 2010. La aplicación ganó 25.000 usuarios en su primer día y alcanzó el millón en dos meses. Facebook adquirió Instagram por mil millones de dólares en abril de 2012. La plataforma introdujo Stories en 2016 y Reels en 2020, adaptando características popularizadas por competidores como Snapchat y TikTok.\n\nTikTok se convirtió en la plataforma social de más rápido crecimiento en la historia después de su lanzamiento internacional en 2017. La compañía china ByteDance la creó al fusionarse con Musical.ly, una aplicación popular entre los adolescentes estadounidenses. El algoritmo de TikTok recomienda videos basados en el comportamiento de visualización en lugar de seguir las relaciones, creando una experiencia diferente a las plataformas anteriores. La aplicación alcanzó los mil millones de usuarios mensuales en septiembre de 2021, logrando este hito más rápido que cualquier predecesor.\n\nLas redes sociales han creado nuevas oportunidades económicas por valor de miles de millones de dólares anuales. Los influencers obtienen ingresos sustanciales al asociarse con marcas y promocionar productos entre sus seguidores. La economía de los creadores empleó a un estimado de 50 millones de personas en todo el mundo para 2022. Las pequeñas empresas utilizan las plataformas sociales para llegar a los clientes sin publicidad tradicional costosa. Industrias enteras han surgido en torno a la gestión de la presencia en redes sociales para organizaciones e individuos.\n\nLas preocupaciones sobre la salud mental en torno a las redes sociales han provocado un intenso debate entre investigadores y responsables políticos. Los estudios vinculan el uso intensivo de las redes sociales con mayores tasas de ansiedad, depresión y soledad, particularmente entre los adolescentes. La Dra. Jean Twenge de la Universidad Estatal de San Diego publicó una investigación en 2017 que muestra una fuerte disminución en la salud mental de los adolescentes que coincide con la adopción de teléfonos inteligentes. Los críticos argumentan que la correlación no prueba la causalidad y señalan los beneficios potenciales de la conexión en línea.\n\nLa desinformación se propaga rápidamente a través de las redes sociales, desafiando el ecosistema de la información. Las historias falsas viajan más rápido y llegan a más personas que los informes precisos, según una investigación del MIT publicada en Science en marzo de 2018. Las plataformas han implementado programas de verificación de hechos, etiquetas de advertencia y cambios algorítmicos para combatir el contenido engañoso. Estos esfuerzos producen resultados mixtos y plantean preguntas sobre la censura y el papel de las empresas de tecnología en la determinación de la verdad.\n\nLas preocupaciones por la privacidad han seguido a las redes sociales desde sus primeros días. Las empresas recopilan grandes cantidades de datos personales para dirigir la publicidad con notable precisión. El escándalo de Cambridge Analytica en 2018 reveló que una firma de consultoría política había recopilado datos de 87 millones de usuarios de Facebook sin consentimiento. Regulaciones como el Reglamento General de Protección de Datos Europeo intentan dar a los usuarios más control sobre su información.\n\nEl futuro de las redes sociales continúa evolucionando rápidamente a medida que las nuevas tecnologías y las preferencias cambiantes remodelan el panorama. Las plataformas de realidad virtual prometen experiencias sociales más inmersivas. Las redes descentralizadas construidas sobre la tecnología blockchain tienen como objetivo dar a los usuarios más control. Los jóvenes prefieren cada vez más la mensajería privada a la publicación pública. Cualquiera que sea la forma que adopte, la conexión social a través de plataformas digitales seguirá siendo fundamental para la comunicación humana durante generaciones venideras.",
    "wordCount": 1031,
    "difficulty": "beginner",
    "questions": [
      {
        "id": "technology-internet-p03-q1",
        "type": "single_choice",
        "question": "¿Cuál fue la primera red social mencionada en el artículo?",
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
        "question": "¿Cuánto pagó Google para adquirir YouTube en 2006?",
        "options": [
          "1 mil millones de dólares",
          "1.65 mil millones de dólares",
          "2 mil millones de dólares",
          "10 mil millones de dólares"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p03-q3",
        "type": "multiple_select",
        "question": "¿Qué plataformas forman parte de la familia de aplicaciones de Meta? Selecciona todas las que correspondan.",
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
        "question": "TikTok alcanzó mil millones de usuarios mensuales más rápido que cualquier plataforma de redes sociales anterior.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p03-q5",
        "type": "numeric",
        "question": "¿Cuántos usuarios de Facebook tuvieron sus datos extraídos en el escándalo de Cambridge Analytica (en millones)?",
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
        "question": "¿Cuándo alcanzó Facebook mil millones de usuarios activos mensuales?",
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
    "title": "La Revolución de la Privacidad Digital",
    "content": "La privacidad digital ha emergido como uno de los temas definitorios del siglo XXI, a medida que las empresas tecnológicas acumulan cantidades sin precedentes de información personal y los gobiernos expanden sus capacidades de vigilancia a niveles que habrían parecido distópicos hace solo unas décadas. La tensión entre los beneficios de los servicios basados en datos y los riesgos de una monitorización generalizada configura debates políticos, modelos de negocio y decisiones individuales en todo el mundo. Comprender este complejo panorama requiere examinar las tecnologías que permiten tanto la vigilancia como la protección de la privacidad, los marcos legales que luchan por seguir el ritmo de la innovación y las cuestiones filosóficas sobre lo que significa la privacidad en una era de conectividad ubicua.\n\nEl concepto de privacidad de la información obtuvo reconocimiento legal mucho antes de la era digital. Los juristas estadounidenses Samuel Warren y Louis Brandeis publicaron su histórico artículo de 1890 en la Harvard Law Review, argumentando a favor del derecho a ser dejado en paz en respuesta al periodismo intrusivo facilitado por las cámaras portátiles. Este texto fundacional estableció la privacidad como algo distinto de los derechos de propiedad y la autonomía corporal. Brandeis más tarde se convirtió en juez del Tribunal Supremo y escribió influyentes opiniones que extendían las protecciones de la privacidad contra la intrusión gubernamental.\n\nInternet transformó la privacidad de un concepto legal abstracto en una preocupación práctica diaria. Los primeros usuarios de la web compartían información personal de forma casual, sin ser conscientes de cómo podía ser recopilada y utilizada. Las cookies, pequeños archivos de texto almacenados por los navegadores web, permitieron a los sitios web reconocer a los visitantes que regresaban a partir de 1994. El ingeniero de Netscape, Lou Montulli, inventó las cookies para resolver el problema técnico de mantener los carritos de la compra, pero rápidamente se convirtieron en herramientas de vigilancia que rastreaban a los usuarios en todos los sitios web.\n\nGoogle revolucionó la publicidad digital al conectar las consultas de búsqueda con los intereses de los usuarios con una precisión notable. Los fundadores de la empresa inicialmente expresaron incomodidad con los modelos de negocio basados en la publicidad, escribiendo en su documento académico de 1998 que la publicidad crea incentivos mixtos para priorizar a los anunciantes sobre los usuarios. Sin embargo, Google AdWords se lanzó en octubre de 2000 y Google AdSense le siguió en 2003, creando la infraestructura de publicidad dirigida que generaría cientos de miles de millones de ingresos.\n\nFacebook extendió la recopilación de datos a las relaciones sociales y las comunicaciones personales. La plataforma se lanzó en febrero de 2004 con la promesa de conectar a la gente, pero su modelo de negocio dependía de la venta de perfiles de usuario detallados a los anunciantes. Los usuarios compartían fotos, datos de localización, opiniones políticas y estado sentimental, a menudo sin entender cómo se monetizaría esta información. En 2018, Facebook recopilaba datos de unos 2.200 millones de usuarios en todo el mundo.\n\nEl escándalo de Cambridge Analytica estalló en la conciencia pública en marzo de 2018, revelando cómo las aplicaciones de terceros podían recolectar datos de millones de usuarios de Facebook sin su conocimiento. La consultora británica Cambridge Analytica obtuvo información personal de 87 millones de usuarios a través de una aplicación de cuestionario de personalidad que explotaba los permisos de la API de Facebook. La empresa utilizó estos datos para publicidad política durante las elecciones presidenciales de Estados Unidos de 2016 y el referéndum del Brexit. Facebook se enfrentó a investigaciones regulatorias en varios continentes y pagó una multa récord de 5.000 millones de dólares a la Comisión Federal de Comercio en julio de 2019.\n\nLas revelaciones de Edward Snowden en junio de 2013 expusieron la escala de la vigilancia gubernamental facilitada por las comunicaciones digitales. El antiguo contratista de la Agencia de Seguridad Nacional filtró documentos clasificados a los periodistas Glenn Greenwald, Laura Poitras y Ewen MacAskill. Estos documentos revelaron programas que recopilaban metadatos telefónicos de millones de estadounidenses, interceptaban cables de fibra óptica que transportaban comunicaciones internacionales y explotaban vulnerabilidades en productos tecnológicos. Las revelaciones desataron debates mundiales sobre el equilibrio entre seguridad y privacidad.\n\nEl programa PRISM permitió a la NSA recopilar datos directamente de los servidores de las principales empresas tecnológicas, entre ellas Google, Facebook, Apple y Microsoft. Las empresas inicialmente negaron tener conocimiento del programa, aunque informes posteriores aclararon que cumplían con las órdenes judiciales, aunque a veces luchaban contra la ampliación de la vigilancia en los tribunales. Snowden huyó a Hong Kong y finalmente recibió asilo en Rusia, donde permanecía en 2024. Estados Unidos le acusó de espionaje y robo de propiedad gubernamental.\n\nEl cifrado proporciona la principal defensa técnica contra la vigilancia gubernamental y la intercepción criminal. El cifrado de extremo a extremo garantiza que solo el remitente y el destinatario puedan leer los mensajes, sin que ni siquiera el proveedor de servicios pueda acceder al contenido. WhatsApp implementó el cifrado de extremo a extremo para sus 1.500 millones de usuarios en abril de 2016, utilizando el protocolo Signal desarrollado por el criptógrafo Moxie Marlinspike. Apple cifra de forma similar las comunicaciones de iMessage y se ha resistido públicamente a las demandas gubernamentales de acceso trasero.\n\nLos organismos encargados de hacer cumplir la ley argumentan que el cifrado crea zonas donde los delincuentes operan con impunidad. El FBI demandó a Apple en febrero de 2016 para obligar a la empresa a ayudar a desbloquear un iPhone utilizado por uno de los terroristas de San Bernardino. Apple se negó, argumentando que la creación de una puerta trasera comprometería la seguridad de todos los usuarios. El FBI finalmente pagó a un contratista externo aproximadamente un millón de dólares para eludir la seguridad del teléfono. Este caso ilustró el conflicto continuo entre los intereses de privacidad y seguridad.\n\nLa Unión Europea promulgó el Reglamento General de Protección de Datos, comúnmente conocido como RGPD, que entró en vigor el 25 de mayo de 2018. Este marco integral estableció normas estrictas para la recopilación, el almacenamiento y el procesamiento de datos personales de los residentes de la UE. Las organizaciones deben obtener el consentimiento explícito antes de recopilar datos, proporcionar acceso a la información almacenada y eliminar los datos a petición. Las infracciones pueden resultar en multas de hasta el 4 por ciento de los ingresos anuales globales o 20 millones de euros, lo que sea mayor. Amazon recibió la mayor multa del RGPD de 746 millones de euros en julio de 2021.\n\nCalifornia aprobó la Ley de Privacidad del Consumidor de California, que entró en vigor el 1 de enero de 2020, estableciendo protecciones similares para los residentes del estado. La ley otorga a los consumidores el derecho a saber qué información personal recopilan las empresas, a eliminar esa información y a oponerse a su venta. La Ley de Derechos de Privacidad de California, aprobada por los votantes en noviembre de 2020, fortaleció aún más estas protecciones. Otros estados, incluidos Virginia, Colorado y Connecticut, han promulgado legislación comparable, creando un mosaico de requisitos de privacidad en todo Estados Unidos.\n\nLos corredores de datos operan en gran medida fuera de la conciencia pública, recopilando perfiles detallados de registros públicos, historiales de compras, actividad en redes sociales y numerosas otras fuentes. Empresas como Acxiom, Experian y Oracle Data Cloud mantienen bases de datos que cubren a cientos de millones de personas. Estos perfiles influyen en las decisiones crediticias, la selección de empleo, las tarifas de seguros y la publicidad dirigida. Los corredores venden acceso a esta información a empresas, campañas políticas y, a veces, a actores maliciosos.\n\nEl rastreo de la ubicación se ha vuelto particularmente controvertido a medida que los teléfonos inteligentes informan continuamente las posiciones de los usuarios. Las aplicaciones móviles solicitan rutinariamente acceso a la ubicación para funcionalidades que van desde pronósticos meteorológicos hasta recomendaciones de restaurantes. Estos datos revelan información confidencial sobre visitas médicas, prácticas religiosas, actividades políticas y relaciones personales. The Wall Street Journal informó en diciembre de 2018 que docenas de empresas reciben datos de ubicación precisos de aplicaciones populares, creando historiales de movimiento integrales.\n\nLa tecnología de reconocimiento facial plantea preocupaciones de privacidad distintas al permitir la identificación sin consentimiento ni conocimiento. Los organismos encargados de hacer cumplir la ley utilizan sistemas de empresas como Clearview AI, que rastreó miles de millones de fotos de las redes sociales para construir una base de datos de búsqueda. Varias ciudades, incluidas San Francisco, Boston y Portland, han prohibido el uso gubernamental del reconocimiento facial. La Unión Europea ha debatido restricciones a la vigilancia biométrica en espacios públicos. China ha desplegado ampliamente el reconocimiento facial, utilizándolo para medidas de control social dirigidas particularmente a las minorías uigures.\n\nEl derecho al olvido surgió de una sentencia del Tribunal de Justicia Europeo de 2014 que exigía a Google eliminar determinados resultados de búsqueda a petición. Mario Costeja González, un ciudadano español, argumentó con éxito que los enlaces a artículos de prensa de 1998 sobre sus dificultades financieras ya no eran relevantes. Google ha procesado más de 1,6 millones de solicitudes de eliminación que afectan a casi 6 millones de URL desde la sentencia. Los críticos argumentan que esto equivale a censura, mientras que los partidarios lo consideran esencial para la dignidad personal y la rehabilitación.\n\nLas tecnologías que preservan la privacidad ofrecen alternativas a la economía de la vigilancia. Las redes privadas virtuales cifran el tráfico de Internet y enmascaran las ubicaciones de los usuarios. El navegador Tor enruta las comunicaciones a través de varios servidores para evitar el rastreo. Los motores de búsqueda centrados en la privacidad como DuckDuckGo procesan las consultas sin recopilar datos personales. Signal proporciona mensajería cifrada que recopila metadatos mínimos. Estas herramientas requieren una sofisticación técnica que limita la adopción, pero demuestran que los servicios que respetan la privacidad son técnicamente factibles.\n\nLa privacidad de los niños recibe una protección legal especial dada su vulnerabilidad e incapacidad para dar un consentimiento significativo. La Ley de Protección de la Privacidad en Línea de los Niños, promulgada en 1998, restringe la recopilación de información personal de niños menores de 13 años en Estados Unidos. TikTok pagó 5,7 millones de dólares en febrero de 2019 para resolver los cargos de recopilación ilegal de datos de niños. El Código de Diseño Adecuado a la Edad del Reino Unido, que entró en vigor en septiembre de 2021, exige que los servicios en línea proporcionen valores predeterminados de alta privacidad para los usuarios menores de 18 años.\n\nEl futuro de la privacidad digital depende de la innovación tecnológica, el desarrollo regulatorio y las actitudes culturales hacia el intercambio de datos. Los sistemas de identidad descentralizados podrían dar a las personas control sobre su información personal. Las técnicas de privacidad diferencial permiten un análisis de datos útil al tiempo que protegen los registros individuales. La convergencia regulatoria podría establecer estándares globales en lugar de enfoques nacionales fragmentados. La tensión fundamental entre la utilidad de los datos y la protección de la privacidad persistirá, pero el equilibrio entre ellos sigue sujeto a la contestación democrática y las decisiones individuales.",
    "wordCount": 1844,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-c3-q1",
        "type": "single_choice",
        "question": "¿Cuándo publicaron Samuel Warren y Louis Brandeis su artículo histórico sobre privacidad en la Harvard Law Review?",
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
        "question": "¿Qué compañías se reveló que formaban parte del programa PRISM de la NSA? Seleccione todas las que correspondan.",
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
        "question": "El escándalo de Cambridge Analytica involucró datos de 87 millones de usuarios de Facebook.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q4",
        "type": "numeric",
        "question": "¿Cuánto pagó Facebook en su multa de la FTC en julio de 2019 (en miles de millones de dólares)?",
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
        "question": "¿Cuándo filtró Edward Snowden documentos clasificados de la NSA?",
        "options": [
          "Junio de 2011",
          "Junio de 2013",
          "Junio de 2015",
          "Junio de 2017"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q6",
        "type": "single_choice",
        "question": "¿Cuándo entró en vigor el RGPD?",
        "options": [
          "25 de mayo de 2016",
          "25 de mayo de 2017",
          "25 de mayo de 2018",
          "25 de mayo de 2019"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q7",
        "type": "numeric",
        "question": "¿De cuánto fue la multa de Amazon por el RGPD en julio de 2021 (en millones de euros)?",
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
        "question": "WhatsApp implementó el cifrado de extremo a extremo para sus usuarios en abril de 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q9",
        "type": "single_choice",
        "question": "¿Cuándo entró en vigor la Ley de Privacidad del Consumidor de California?",
        "options": [
          "1 de enero de 2018",
          "1 de enero de 2019",
          "1 de enero de 2020",
          "1 de enero de 2021"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-c3-q10",
        "type": "numeric",
        "question": "¿Cuándo se promulgó la Ley de Protección de la Privacidad en Línea de los Niños?",
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
        "question": "¿Quién inventó las cookies web en 1994?",
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
        "question": "¿Cuándo se lanzó Google AdWords?",
        "options": [
          "Octubre de 1998",
          "Octubre de 2000",
          "Octubre de 2002",
          "Octubre de 2004"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-c3-q13",
        "type": "numeric",
        "question": "¿Cuánto pagó TikTok en febrero de 2019 para resolver los cargos por datos de niños (en millones de dólares)?",
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
        "question": "San Francisco ha prohibido el uso gubernamental de la tecnología de reconocimiento facial.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-c3-q15",
        "type": "single_choice",
        "question": "¿Cuándo fue el fallo del derecho al olvido por el Tribunal de Justicia de la Unión Europea?",
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
        "question": "¿Qué periodistas recibieron los documentos filtrados de Edward Snowden? Seleccione todas las que correspondan.",
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
    "title": "El Mundo Revolucionario de la Tecnología Blockchain",
    "content": "La tecnología blockchain ha evolucionado desde un concepto criptográfico oscuro hasta una fuerza transformadora que remodela industrias mucho más allá de sus orígenes en la moneda digital. Este sistema de contabilidad distribuida ofrece una transparencia, seguridad y descentralización sin precedentes que desafía los enfoques tradicionales de mantenimiento de registros y confianza. Comprender blockchain revela por qué los tecnólogos la consideran una de las innovaciones más significativas desde la propia internet.\n\nSatoshi Nakamoto, un individuo o grupo seudónimo, presentó blockchain al mundo a través del libro blanco de Bitcoin publicado el 31 de octubre de 2008. El momento resultó notablemente profético, llegando apenas semanas después del colapso de Lehman Brothers que desencadenó la crisis financiera mundial. Nakamoto propuso un sistema de efectivo electrónico entre pares que eliminaría la necesidad de intermediarios de confianza como los bancos. El primer bloque de Bitcoin, llamado bloque génesis, se minó el 3 de enero de 2009, incrustando un titular de un periódico sobre los rescates bancarios como un recordatorio permanente de las motivaciones de la tecnología.\n\nUna blockchain funciona como una base de datos distribuida compartida a través de una red de ordenadores llamados nodos. Cada bloque contiene una lista de transacciones, una marca de tiempo y un hash criptográfico que lo vincula al bloque anterior. Esta cadena de hashes hace que la alteración de registros históricos sea prácticamente imposible sin controlar la mayoría de la red. Cuando alguien intenta cambiar una transacción antigua, el hash cambia, rompiendo la cadena y alertando a otros nodos sobre el intento de manipulación.\n\nLos mecanismos de consenso aseguran que todos los nodos estén de acuerdo con el contenido de la blockchain sin requerir una autoridad central. Bitcoin utiliza la prueba de trabajo, donde los ordenadores compiten para resolver complejos acertijos matemáticos. El primero en encontrar una solución se gana el derecho a agregar el siguiente bloque y recibir bitcoins recién creados como recompensa. Este proceso, llamado minería, consumió aproximadamente 127 teravatios-hora de electricidad en 2023, comparable al uso anual de energía de Noruega.\n\nEthereum, lanzado por el programador Vitalik Buterin en julio de 2015, expandió blockchain más allá de simples transacciones a contratos inteligentes programables. Estos acuerdos de auto-ejecución hacen cumplir automáticamente sus términos cuando se cumplen condiciones predefinidas. Un contrato inteligente para bienes raíces podría liberar el pago a un vendedor y transferir la propiedad a un comprador simultáneamente una vez que ambas partes cumplan con sus obligaciones. No es necesario que abogados, agentes de depósito en garantía o bancos verifiquen la transacción.\n\nLas finanzas descentralizadas, comúnmente llamadas DeFi, utilizan contratos inteligentes para recrear los servicios financieros tradicionales sin intermediarios. Las plataformas de préstamos permiten a los usuarios pedir prestadas criptomonedas proporcionando garantías, con tasas de interés determinadas por algoritmos en lugar de banqueros. Los intercambios descentralizados permiten el comercio directo entre usuarios sin que una empresa controle sus fondos. En su punto máximo en noviembre de 2021, los protocolos DeFi mantenían más de 180 mil millones de dólares en activos.\n\nLos tokens no fungibles, conocidos como NFT, aplican blockchain a la propiedad y procedencia digital. Cada NFT representa un activo único verificado en la blockchain, más comúnmente arte digital o coleccionables. El artista digital Beeple vendió una obra de arte NFT en la casa de subastas Christie's en marzo de 2021 por 69,3 millones de dólares, catapultando esta tecnología a la conciencia general. Los críticos cuestionan si los NFT tienen un valor duradero, mientras que los partidarios argumentan que cambian fundamentalmente la forma en que los creadores monetizan las obras digitales.\n\nLa gestión de la cadena de suministro ofrece aplicaciones prácticas convincentes para la tecnología blockchain. Las empresas pueden rastrear productos desde las materias primas a través de la fabricación hasta los estantes de las tiendas minoristas con registros inmutables en cada paso. Walmart se asoció con IBM en un sistema blockchain que rastrea el origen de los productos alimenticios en segundos en lugar de la semana que se requería anteriormente. Esta capacidad resulta invaluable durante las retiradas de alimentos cuando la identificación rápida de lotes contaminados salva vidas.\n\nLos gobiernos exploran blockchain para la verificación de identidad, los sistemas de votación y los registros públicos. Estonia, un pionero en el gobierno digital, utiliza blockchain para proteger los registros de salud, los registros comerciales y los documentos judiciales de sus 1,3 millones de ciudadanos. El secretario de estado de Virginia Occidental llevó a cabo un programa piloto de votación basado en blockchain para el personal militar estacionado en el extranjero durante las elecciones de mitad de período de 2018. Estos experimentos prueban si la tecnología puede mejorar en lugar de amenazar las instituciones democráticas.\n\nLas preocupaciones ambientales que rodean a blockchain han impulsado una importante evolución tecnológica. Ethereum hizo la transición de la prueba de trabajo de uso intensivo de energía a la prueba de participación en septiembre de 2022, reduciendo su consumo de electricidad en un estimado de 99,95 por ciento. La prueba de participación selecciona validadores en función de la criptomoneda que prometen como garantía en lugar de la potencia computacional. Este cambio demuestra que blockchain puede abordar su huella ambiental manteniendo la seguridad.\n\nLos desafíos de escalabilidad limitan la adopción de blockchain para las transacciones cotidianas. Bitcoin procesa aproximadamente siete transacciones por segundo en comparación con la capacidad de la red Visa para 24,000. Las soluciones de capa dos construyen canales de pago más rápidos sobre las blockchains existentes. La Lightning Network permite transacciones de Bitcoin casi instantáneas al liquidar solo los saldos finales en la blockchain principal. Estas innovaciones tienen como objetivo hacer que blockchain sea práctica para las compras diarias.\n\nEl futuro de blockchain se extiende a ámbitos que sus creadores nunca imaginaron. Las organizaciones autónomas descentralizadas, o DAO, utilizan la votación con tokens para gobernar comunidades y administrar tesorerías sin estructuras corporativas tradicionales. Los sistemas de identidad digital podrían dar a las personas el control sobre sus datos personales al tiempo que prueban sus credenciales a empleadores, propietarios o gobiernos. Si blockchain cumple con su potencial revolucionario o se establece en un papel nicho sigue siendo incierto, pero su impacto en la tecnología y la sociedad ya ha demostrado ser sustancial y duradero.",
    "wordCount": 1023,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p04-q1",
        "type": "single_choice",
        "question": "¿Cuándo se publicó el whitepaper de Bitcoin?",
        "options": [
          "3 de enero de 2009",
          "31 de octubre de 2008",
          "Julio de 2015",
          "Septiembre de 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p04-q2",
        "type": "multiple_select",
        "question": "¿Cuáles se mencionan como aplicaciones de blockchain más allá de la criptomoneda? Selecciona todas las que correspondan.",
        "options": [
          "Gestión de la cadena de suministro",
          "Identidad digital",
          "Sistemas de votación",
          "Transmisión de video"
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
        "question": "Ethereum hizo la transición a prueba de participación en septiembre de 2022, reduciendo el consumo de electricidad en un 99.95 por ciento.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p04-q4",
        "type": "numeric",
        "question": "¿Por cuánto se vendió la obra de arte NFT de Beeple en Christie's en marzo de 2021 (en millones de dólares)?",
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
        "question": "¿Quién lanzó Ethereum en julio de 2015?",
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
        "question": "¿Cuántas transacciones por segundo puede procesar la red Bitcoin?",
        "options": [
          "Alrededor de 7",
          "Alrededor de 70",
          "Alrededor de 700",
          "Alrededor de 7,000"
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
    "title": "La Revolución de la Computación en la Nube",
    "content": "La computación en la nube ha transformado fundamentalmente la forma en que las empresas y los individuos utilizan la tecnología, trasladando el software y el almacenamiento de datos desde dispositivos locales a vastas redes de servidores remotos. Esta revolución arquitectónica permite capacidades que parecían imposibles hace apenas dos décadas, desde la transmisión de entretenimiento hasta los servicios de inteligencia artificial accesibles desde cualquier dispositivo. La nube se ha vuelto tan integral en la vida moderna que la mayoría de la gente la usa a diario sin ser conscientes de ello.\n\nAmazon Web Services lanzó sus primeros productos en la nube en marzo de 2006, siendo pionera en el modelo de infraestructura como servicio (IaaS) que remodelaría la industria tecnológica. La compañía había construido una enorme capacidad informática para gestionar los periodos de mayor actividad comercial, como el Black Friday, y se dio cuenta de que podía alquilar la capacidad no utilizada a otras empresas. Andy Jassy, que dirigió AWS desde su fundación, convirtió la división en un motor de beneficios que genera más de 80.000 millones de dólares en ingresos anuales. Este modelo de negocio demostró ser tan exitoso que los competidores se apresuraron a construir sus propias plataformas en la nube.\n\nMicrosoft Azure entró en el mercado de la nube en febrero de 2010, aprovechando las profundas relaciones de la compañía con los clientes empresariales. El CEO Satya Nadella, que asumió el liderazgo en 2014, orientó la estrategia de Microsoft hacia los servicios en la nube. Azure creció hasta convertirse en el segundo proveedor de nube más grande, impulsando todo, desde sitios web para pequeñas empresas hasta la red profesional LinkedIn. La transformación en la nube de Microsoft revivió una empresa que muchos habían descartado como superada.\n\nGoogle Cloud Platform lleva la experiencia del gigante de las búsquedas en computación distribuida y aprendizaje automático a los clientes empresariales. La compañía que indexa todo Internet y procesa miles de millones de consultas de búsqueda diariamente ofrece esa infraestructura a empresas de todos los tamaños. Las inversiones de Google en cables submarinos y centros de datos que abarcan docenas de países permiten un acceso de baja latencia desde casi cualquier lugar de la Tierra. La plataforma destaca especialmente en el análisis de datos y las cargas de trabajo de inteligencia artificial.\n\nLa computación en la nube ofrece tres modelos de servicio primarios que se apilan unos sobre otros como capas. La Infraestructura como Servicio (IaaS) proporciona máquinas virtuales, almacenamiento y redes que los clientes configuran ellos mismos. La Plataforma como Servicio (PaaS) añade sistemas operativos, bases de datos y herramientas de desarrollo. El Software como Servicio (SaaS) ofrece aplicaciones completas a través de navegadores web, eliminando por completo la instalación y el mantenimiento. La mayoría de la gente interactúa con productos SaaS diariamente a través del correo electrónico, la edición de documentos y las aplicaciones empresariales.\n\nLa economía de la computación en la nube crea ventajas para las organizaciones de casi todos los tamaños. Las empresas emergentes se lanzan sin comprar hardware costoso o contratar personal especializado para mantener los centros de datos. Solo pagan por los recursos consumidos, aumentando la escala durante los periodos de mayor actividad y disminuyéndola durante los periodos de menor actividad. Esta flexibilidad transformó la economía del inicio de una empresa tecnológica. Un servicio que podría haber requerido millones en inversión en infraestructura ahora puede lanzarse con un capital mínimo.\n\nLas organizaciones empresariales migran cada vez más desde los centros de datos locales a las plataformas en la nube. General Electric consolidó cientos de centros de datos en una arquitectura de nube híbrida a partir de 2014. Capital One, uno de los bancos más grandes de Estados Unidos, anunció en 2020 que había cerrado su último centro de datos después de migrar completamente a AWS. Estas transformaciones llevan años y miles de millones de dólares, pero en última instancia reducen los costes al tiempo que aumentan las capacidades.\n\nLa seguridad en la nube difiere fundamentalmente de los enfoques tradicionales, pero a menudo supera lo que las organizaciones logran de forma independiente. Los principales proveedores de servicios en la nube emplean a miles de especialistas en seguridad e invierten miles de millones en tecnologías de protección. Poseen certificaciones para el manejo de información gubernamental clasificada y datos financieros sensibles. Los modelos de responsabilidad compartida significan que los proveedores aseguran la infraestructura, mientras que los clientes aseguran sus propias aplicaciones y configuraciones de datos.\n\nLa distribución geográfica de los centros de datos en la nube sirve a propósitos más allá de la optimización del rendimiento. Las regulaciones en muchos países exigen que ciertos datos permanezcan dentro de las fronteras nacionales. Los proveedores de la nube construyen centros de datos regionales para cumplir con estos requisitos de soberanía. Los clientes europeos pueden asegurar que sus datos permanezcan en Frankfurt o Ámsterdam. Las empresas australianas mantienen la información dentro de su país. Esta arquitectura distribuida también proporciona capacidades de recuperación ante desastres que pocas organizaciones podrían permitirse de forma independiente.\n\nLa computación en el borde (Edge computing) extiende las capacidades de la nube más cerca de donde se originan los datos. En lugar de enviar todo a centros de datos distantes, los sistemas perimetrales procesan la información localmente para aplicaciones que requieren una respuesta inmediata. Los vehículos autónomos no pueden esperar a que los datos viajen miles de kilómetros antes de decidir frenar. Los sensores industriales que analizan las vibraciones de los equipos necesitan una detección instantánea de anomalías. La computación en el borde lleva la inteligencia de la nube a escenarios donde los milisegundos importan.\n\nLa computación sin servidor (Serverless computing) representa la evolución más reciente de la arquitectura de la nube. En este modelo, los desarrolladores escriben código sin administrar ninguna infraestructura en absoluto. Las plataformas en la nube asignan automáticamente los recursos cuando se ejecuta el código y cobran solo por el tiempo de ejecución real. Una función que se ejecuta durante 100 milisegundos cuesta una pequeña fracción de un céntimo. Las aplicaciones pueden escalar de cero a manejar millones de solicitudes sin ningún cambio de configuración.\n\nEl impacto ambiental de la computación en la nube genera tanto preocupaciones como oportunidades. Los centros de datos consumen aproximadamente el 1,5 por ciento de la electricidad mundial y esa proporción sigue creciendo. Sin embargo, los proveedores de servicios en la nube operan de forma mucho más eficiente que los centros de datos corporativos típicos. Google afirma que sus instalaciones alcanzan una eficiencia media en el uso de la energía (PUE) de 1,1 en comparación con la media del sector, superior a 1,5. Las plataformas en la nube alimentan cada vez más las operaciones con energía renovable, y Microsoft se ha comprometido a ser negativo en emisiones de carbono para 2030.\n\nLa inteligencia artificial y el aprendizaje automático se han convertido en características definitorias de las plataformas en la nube. Los modelos pre-entrenados para el reconocimiento de imágenes, el procesamiento del lenguaje natural y la síntesis de voz están disponibles a través de interfaces de programación sencillas. Las organizaciones sin experiencia en aprendizaje automático pueden añadir capacidades sofisticadas a sus aplicaciones. Los proveedores de la nube compiten agresivamente en las características de la IA, cada uno reclamando ventajas en precisión, facilidad de uso y amplitud de los modelos disponibles.\n\nLas estrategias multi-nube permiten a las organizaciones utilizar múltiples proveedores simultáneamente, evitando la dependencia de un único proveedor. Kubernetes, un sistema de orquestación de contenedores de código abierto desarrollado originalmente por Google, permite que las cargas de trabajo se muevan entre nubes. Las empresas seleccionan diferentes proveedores para diferentes cargas de trabajo en función del coste, el rendimiento o las capacidades especializadas. Esta flexibilidad requiere una complejidad adicional, pero reduce las preocupaciones sobre el bloqueo del proveedor.\n\nEl futuro de la computación en la nube apunta hacia una integración aún mayor con la vida diaria y las operaciones empresariales. Los recursos de computación cuántica ya aparecen en las plataformas en la nube, aunque las aplicaciones prácticas siguen siendo limitadas. La inteligencia artificial automatizará más la gestión de la infraestructura, reduciendo la experiencia necesaria para desplegar sistemas sofisticados. La línea entre los dispositivos locales y los recursos de la nube se difuminará aún más a medida que mejore la conectividad y madure la computación en el borde. Sean cuales sean las tecnologías específicas que surjan, el cambio fundamental de la infraestructura propia a los servicios alquilados seguirá remodelando la forma en que la humanidad computa.",
    "wordCount": 1403,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p05-q1",
        "type": "single_choice",
        "question": "¿Cuándo lanzó Amazon Web Services sus primeros productos en la nube?",
        "options": [
          "Marzo de 2006",
          "Febrero de 2010",
          "Enero de 2014",
          "Noviembre de 2015"
        ],
        "correctIndex": 0
      },
      {
        "id": "technology-internet-p05-q2",
        "type": "multiple_select",
        "question": "¿Cuáles son los tres modelos principales de servicio en la nube mencionados? Seleccione todas las que correspondan.",
        "options": [
          "Infraestructura como Servicio",
          "Plataforma como Servicio",
          "Software como Servicio",
          "Hardware como Servicio"
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
        "question": "Capital One anunció en 2020 que había cerrado su último centro de datos después de migrar completamente a AWS.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p05-q4",
        "type": "numeric",
        "question": "¿Qué porcentaje de la electricidad mundial consumen los centros de datos?",
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
        "question": "¿Qué CEO cambió la estrategia de Microsoft hacia los servicios en la nube a partir de 2014?",
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
        "question": "¿Qué sistema de código abierto permite que las cargas de trabajo se muevan entre diferentes proveedores de la nube?",
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
        "question": "¿Cuántos ingresos anuales genera AWS (en miles de millones de dólares)?",
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
        "question": "¿Para cuándo se ha comprometido Microsoft a ser negativo en carbono?",
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
    "title": "La Revolución de la Computación Cuántica",
    "content": "La computación cuántica representa la transformación más profunda en la potencia computacional desde la invención del transistor, prometiendo resolver problemas que a las computadoras clásicas les tomaría más tiempo que la edad del universo. Estas máquinas aprovechan las extrañas propiedades de la mecánica cuántica para realizar cálculos de formas fundamentalmente nuevas que desafían la intuición cotidiana. Entender esta tecnología revolucionaria revela tanto su extraordinario potencial como los formidables desafíos que aún persisten antes de que las computadoras cuánticas alcancen su promesa completa.\n\nLas computadoras clásicas codifican información como bits que existen como cero o uno en cualquier momento dado. Cada fotografía, documento y video en sus dispositivos se reduce a largas cadenas de estos dígitos binarios manipulados mediante operaciones lógicas. Este enfoque ha impulsado un progreso notable desde la década de 1940, con procesadores que ahora contienen miles de millones de transistores en chips más pequeños que una uña. Sin embargo, ciertos problemas permanecen obstinadamente fuera de alcance porque el número de cálculos requeridos crece exponencialmente con el tamaño del problema.\n\nLas computadoras cuánticas utilizan bits cuánticos, llamados qubits, que pueden existir en superposición, representando cero y uno simultáneamente hasta que se miden. Esta propiedad permite que los sistemas cuánticos exploren muchas soluciones posibles a la vez en lugar de verificarlas una por una. Cuando múltiples qubits se entrelazan, medir uno afecta instantáneamente a los demás, independientemente de la distancia física. Estos fenómenos cuánticos permiten algoritmos que superan drásticamente los enfoques clásicos para tipos de problemas específicos.\n\nRichard Feynman, el físico ganador del Premio Nobel, propuso el concepto de computación cuántica durante una conferencia en el Instituto de Tecnología de California en mayo de 1981. Observó que la simulación de sistemas mecánicos cuánticos en computadoras clásicas requería recursos que aumentaban exponencialmente a medida que crecía el tamaño del sistema. Feynman sugirió que solo una computadora mecánica cuántica podría simular eficientemente la física cuántica. Esta idea lanzó un campo que se desarrollaría lentamente durante décadas antes de que los recientes avances aceleraran el progreso.\n\nDavid Deutsch en la Universidad de Oxford formalizó la teoría de la computación cuántica en 1985, describiendo cómo una computadora cuántica universal podría explotar la superposición y la interferencia. Peter Shor en Bell Labs hizo famosa la computación cuántica en 1994 cuando desarrolló un algoritmo que podía factorizar números grandes exponencialmente más rápido que cualquier método clásico conocido. Este descubrimiento amenazó el cifrado RSA que asegura las comunicaciones de Internet, convirtiendo repentinamente la computación cuántica en una cuestión de seguridad nacional.\n\nLa construcción de computadoras cuánticas reales resultó extraordinariamente difícil porque los qubits son frágiles y se perturban fácilmente por su entorno. Cualquier interacción con el mundo exterior causa decoherencia, colapsando la superposición y destruyendo la información cuántica. Los primeros experimentos mantuvieron la coherencia solo durante nanosegundos. Los investigadores desarrollaron técnicas de aislamiento elaboradas, incluidos circuitos superconductores enfriados a temperaturas más frías que el espacio exterior, típicamente alrededor de 15 milikelvin, apenas por encima del cero absoluto.\n\nIBM colocó la primera computadora cuántica accesible a través de la nube, llamada IBM Quantum Experience, en línea en mayo de 2016, permitiendo a investigadores y entusiastas de todo el mundo experimentar con hardware cuántico real. El sistema inicial contenía solo cinco qubits, apenas suficientes para demostraciones simples. Para 2023, IBM había desplegado sistemas que superaban los 1000 qubits y anunció planes para sistemas de 100.000 qubits para 2033. Estas máquinas están lejos de reemplazar a las computadoras clásicas, pero demuestran un progreso constante hacia la utilidad práctica.\n\nGoogle logró un hito llamado supremacía cuántica en octubre de 2019 cuando su procesador Sycamore de 53 qubits realizó un cálculo en 200 segundos que le tomaría a la supercomputadora más rápida del mundo aproximadamente 10.000 años. Los críticos disputaron la comparación, argumentando que las supercomputadoras de IBM podrían completar la tarea en días en lugar de milenios. Sin embargo, el logro demostró que las computadoras cuánticas podrían superar a los sistemas clásicos en al menos algunas tareas.\n\nLa corrección de errores representa quizás el mayor obstáculo para la computación cuántica útil. Los qubits físicos son demasiado ruidosos y poco confiables para cálculos complejos. La corrección de errores cuánticos codifica un qubit lógico en muchos qubits físicos para detectar y corregir errores, pero los enfoques actuales requieren miles de qubits físicos por qubit lógico. Una computadora cuántica que resuelva problemas prácticos podría necesitar millones de qubits físicos, mucho más allá de las capacidades actuales.\n\nDiferentes tecnologías compiten para construir los mejores qubits para futuras computadoras cuánticas. Los circuitos superconductores, utilizados por IBM y Google, aprovechan las técnicas de fabricación establecidas de la industria de semiconductores. Los iones atrapados, buscados por IonQ y Honeywell, mantienen átomos cargados en campos electromagnéticos con una precisión excepcional. Los sistemas fotónicos codifican información en partículas de luz que pueden viajar largas distancias sin decoherencia. Los qubits topológicos, todavía en gran medida teóricos, almacenarían información en patrones resistentes a las perturbaciones locales.\n\nLas aplicaciones de química cuántica pueden ofrecer las primeras ventajas prácticas de la computación cuántica. La simulación de moléculas para diseñar nuevos fármacos, materiales y catalizadores requiere cálculos mecánicos cuánticos que escalan exponencialmente en las computadoras clásicas. Una computadora cuántica podría modelar reacciones químicas a nivel atómico, acelerando potencialmente el descubrimiento de medicamentos, fertilizantes y tecnologías de energía limpia. Empresas como Roche, Merck y BASF han lanzado programas de investigación en computación cuántica anticipando estas capacidades.\n\nLos problemas de optimización que abarcan la logística, las finanzas y el aprendizaje automático representan otra área de aplicación prometedora. Encontrar la mejor ruta para los camiones de reparto, las carteras óptimas para los inversores o los parámetros ideales para las redes neuronales implica buscar en vastos espacios de solución. El recocido cuántico, una forma especializada de computación cuántica comercializada por D-Wave Systems desde 2011, aborda la optimización directamente. Las principales corporaciones, incluyendo Volkswagen, JPMorgan Chase y Lockheed Martin, han explorado la optimización cuántica para desafíos empresariales reales.\n\nLa criptografía enfrenta tanto amenazas como oportunidades derivadas del avance de la computación cuántica. El algoritmo de Shor podría romper el cifrado ampliamente utilizado una vez que existan computadoras cuánticas suficientemente potentes. El Instituto Nacional de Estándares y Tecnología seleccionó nuevos estándares criptográficos post-cuánticos en julio de 2022 después de una competencia de seis años para identificar algoritmos resistentes a los ataques cuánticos. Mientras tanto, la distribución cuántica de claves utiliza la física de la medición cuántica para crear un cifrado teóricamente irrompible para las comunicaciones más sensibles.\n\nChina ha invertido fuertemente en tecnología cuántica, estableciendo la Universidad de Ciencia y Tecnología de China como líder mundial bajo el físico Pan Jianwei. En 2017, China lanzó Micius, un satélite que demostró comunicaciones con seguridad cuántica entre estaciones terrestres separadas por 1.200 kilómetros. Investigadores chinos afirmaron la supremacía cuántica con un sistema fotónico llamado Jiuzhang en diciembre de 2020. Estados Unidos respondió con la Ley de la Iniciativa Nacional Cuántica de 2018, asignando 1.200 millones de dólares durante cinco años para mantener la competitividad.\n\nLa industria de la computación cuántica ha atraído una enorme inversión a pesar de los plazos inciertos para los retornos prácticos. La financiación de capital de riesgo para las startups cuánticas superó los 2.500 millones de dólares en 2022. Las principales empresas de tecnología, incluyendo Microsoft, Amazon y Alibaba, han lanzado servicios de nube cuántica junto con empresas de hardware dedicadas. Los analistas proyectan que el mercado de la computación cuántica alcanzará los 65.000 millones de dólares en 2030, aunque las estimaciones varían ampliamente dada la incertidumbre tecnológica.\n\nEl futuro de la computación cuántica depende del progreso sostenido en múltiples frentes simultáneamente. El hardware debe mejorar en escala, coherencia y conectividad. El software debe desarrollar algoritmos eficientes y herramientas de programación accesibles más allá de los especialistas en física cuántica. Las aplicaciones deben demostrar claras ventajas sobre las alternativas clásicas para problemas del mundo real. El viaje desde las demostraciones de laboratorio hasta la utilidad práctica puede llevar décadas, pero las recompensas potenciales justifican la inversión y el esfuerzo continuos.",
    "wordCount": 1321,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p06-q1",
        "type": "single_choice",
        "question": "¿Quién propuso el concepto de computación cuántica en mayo de 1981?",
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
        "question": "¿Qué tecnologías se mencionan como enfoques para construir cúbits? Seleccione todas las que correspondan.",
        "options": [
          "Circuitos superconductores",
          "Iones atrapados",
          "Sistemas fotónicos",
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
        "question": "IBM puso en línea la primera computadora cuántica accesible en la nube en mayo de 2016.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q4",
        "type": "numeric",
        "question": "¿Cuántos segundos tardó el procesador Sycamore de Google en completar su cálculo de supremacía cuántica?",
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
        "question": "¿Cuándo desarrolló Peter Shor su famoso algoritmo de factorización?",
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
        "question": "¿A qué temperatura se enfrían normalmente las computadoras cuánticas superconductoras?",
        "options": [
          "Alrededor de 100 kelvin",
          "Alrededor de 4 kelvin",
          "Alrededor de 15 milikelvin",
          "Alrededor de 1 kelvin"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p06-q7",
        "type": "numeric",
        "question": "¿Cuánta financiación asignó la Ley Nacional de Iniciativa Cuántica durante cinco años (en miles de millones de dólares)?",
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
        "question": "China lanzó un satélite de comunicaciones cuánticas llamado Micius en 2017.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p06-q9",
        "type": "single_choice",
        "question": "¿Cuándo seleccionó el NIST nuevos estándares criptográficos post-cuánticos?",
        "options": [
          "Julio de 2020",
          "Julio de 2021",
          "Julio de 2022",
          "Julio de 2023"
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
    "title": "La Industria Global de Semiconductores",
    "content": "Los semiconductores se han convertido en la base de la civilización moderna, impulsando todo, desde teléfonos inteligentes y automóviles hasta dispositivos médicos y sistemas militares de los que las naciones dependen para su seguridad. Estos diminutos chips, que contienen miles de millones de transistores, representan los objetos más complejos jamás fabricados por la humanidad, producidos a través de procesos que requieren una precisión medida en átomos. La competencia global por controlar la tecnología de semiconductores ha transformado esta industria en un punto álgido de rivalidad geopolítica con implicaciones para la prosperidad económica y la seguridad nacional en todo el mundo.\n\nEl viaje de los semiconductores comenzó en los Laboratorios Bell en Nueva Jersey el 23 de diciembre de 1947, cuando los físicos John Bardeen, Walter Brattain y William Shockley demostraron el primer transistor. Este dispositivo podía amplificar las señales eléctricas sin el calor y la fragilidad de los tubos de vacío, lo que valió a sus inventores el Premio Nobel de Física en 1956. El potencial de miniaturización del transistor eventualmente permitiría la revolución digital que remodeló la sociedad humana.\n\nJack Kilby en Texas Instruments y Robert Noyce en Fairchild Semiconductor inventaron independientemente el circuito integrado en 1958 y 1959, combinando múltiples transistores en una sola pieza de material semiconductor. Este avance eliminó la necesidad de cablear a mano los componentes individuales y permitió la fabricación a escala. Kilby recibió el Premio Nobel de Física en 2000 por esta contribución que hizo posible la electrónica moderna.\n\nGordon Moore, cofundador de Intel, observó en 1965 que el número de transistores en los circuitos integrados se duplicaba aproximadamente cada dos años, mientras que los costos se mantenían constantes. Esta observación, conocida como la Ley de Moore, ha guiado a la industria durante seis décadas de mejora exponencial. Los procesadores modernos contienen más de 100 mil millones de transistores, cada uno con un tamaño de sólo unos pocos nanómetros de ancho, aproximadamente el ancho de 20 átomos de silicio.\n\nEl proceso de fabricación de semiconductores implica cientos de pasos que abarcan meses de operaciones precisas. Los ingenieros comienzan con cilindros de silicio ultrapuro cultivado a partir de material fundido a temperaturas superiores a 1400 grados Celsius. Estos lingotes se cortan en finas obleas y se pulen hasta obtener una suavidad atómica. La fotolitografía proyecta patrones de circuito en las obleas utilizando luz ultravioleta, y las máquinas más avanzadas utilizan longitudes de onda ultravioleta extrema de sólo 13,5 nanómetros.\n\nTaiwan Semiconductor Manufacturing Company, conocida como TSMC, se ha convertido en el fabricante de semiconductores más importante del mundo. Fundada por Morris Chang en 1987, TSMC fue pionera en el modelo de fundición de fabricación de chips diseñados por otras empresas. Para 2023, TSMC produjo más del 90 por ciento de los chips más avanzados del mundo, incluidos los procesadores para Apple, AMD y Nvidia. Esta concentración de capacidad en una isla que enfrenta reclamos territoriales de China se ha convertido en una importante preocupación geopolítica.\n\nEl equipo necesario para fabricar semiconductores avanzados representa un asombroso logro tecnológico. ASML, una empresa holandesa, posee el monopolio de las máquinas de litografía ultravioleta extrema que cuestan aproximadamente 200 millones de dólares cada una y pesan 180.000 kilogramos. Estos sistemas utilizan plasma calentado a 220.000 grados Celsius para generar las longitudes de onda de luz precisas necesarias. ASML requirió contribuciones del proveedor de óptica Zeiss, el desarrollador de fuentes de luz Cymer y numerosos otros socios para lograr esta capacidad después de décadas de desarrollo.\n\nSamsung Electronics e Intel compiten con TSMC por el liderazgo en la fabricación avanzada, aunque ambos se han quedado atrás en los últimos años. Samsung opera importantes instalaciones de fabricación en Corea del Sur y Texas, produciendo chips para varios clientes junto con sus propios productos. Intel, históricamente el líder tecnológico, tuvo problemas con los retrasos en la fabricación y perdió cuota de mercado antes de anunciar agresivos planes de inversión bajo el liderazgo del CEO Pat Gelsinger a partir de 2021.\n\nChina ha hecho de la independencia de los semiconductores una prioridad nacional, invirtiendo más de 150 mil millones de dólares a través de su Fondo Nacional de Inversión en la Industria de Circuitos Integrados y otros programas. Semiconductor Manufacturing International Corporation representa el fabricante nacional más avanzado de China, aunque todavía está varias generaciones por detrás de TSMC. Los controles de exportación estadounidenses impuestos a partir de octubre de 2022 restringen el acceso de China a equipos de fabricación avanzados y diseños de chips, lo que intensifica la presión sobre el desarrollo indígena.\n\nLa industria automotriz descubrió su peligrosa dependencia de los semiconductores durante la escasez mundial de chips que comenzó en 2020. A medida que los bloqueos pandémicos interrumpieron las cadenas de suministro, los fabricantes de automóviles cancelaron pedidos esperando una demanda débil. Cuando la demanda se recuperó más rápido de lo previsto, las fábricas de semiconductores habían asignado capacidad a otros clientes. General Motors, Ford y Toyota cerraron líneas de producción intermitentemente durante más de dos años mientras esperaban chips. La escasez le costó a la industria automotriz unos 210 mil millones de dólares en ingresos perdidos.\n\nLos gobiernos de todo el mundo han lanzado programas masivos para construir capacidad nacional de semiconductores. Estados Unidos aprobó la Ley CHIPS y de Ciencia en agosto de 2022, asignando 52 mil millones de dólares para la fabricación e investigación de semiconductores. La Ley Europea de Chips comprometió 43 mil millones de euros a objetivos similares. Japón anunció 2 billones de yenes en subsidios para atraer fábricas de TSMC, Samsung y Micron. India lanzó un programa de 10 mil millones de dólares buscando su primera instalación de fabricación avanzada.\n\nLos chips de memoria representan una categoría distinta de semiconductores dominada por diferentes actores que los procesadores lógicos. Samsung, SK Hynix de Corea del Sur y Micron de Estados Unidos controlan el mercado de DRAM para la memoria de las computadoras. La industria de la memoria flash que almacena datos en teléfonos inteligentes y unidades de estado sólido involucra a los mismos actores coreanos más el fabricante japonés Kioxia. Los precios de la memoria fluctúan dramáticamente con los ciclos de oferta y demanda, creando patrones de auge y caída que complican las decisiones de inversión.\n\nLa industria del diseño de semiconductores se ha concentrado en torno a unas pocas empresas líderes que cuentan con enormes recursos. Nvidia, fundada por Jensen Huang en 1993, se transformó de una empresa de tarjetas gráficas en una potencia de inteligencia artificial con chips que alimentan centros de datos en todo el mundo. La capitalización de mercado de la empresa superó el billón de dólares en junio de 2023. Qualcomm domina los procesadores móviles con tecnología licenciada a casi todos los fabricantes de teléfonos inteligentes. AMD se ha convertido en un competidor serio de Intel en computadoras personales y servidores bajo el liderazgo de la CEO Lisa Su.\n\nLos proveedores de equipos de semiconductores forman una capa crítica pero a menudo pasada por alto del ecosistema de la industria. Applied Materials, Lam Research y KLA Corporation de Estados Unidos proporcionan equipos de deposición, grabado e inspección esenciales para la fabricación. Tokyo Electron de Japón contribuye con sistemas de recubrimiento y limpieza. Estas empresas invierten miles de millones anuales en investigación y desarrollo para superar los límites de la precisión de la fabricación.\n\nLa huella ambiental de la fabricación de semiconductores plantea preocupaciones de sostenibilidad que la industria aborda cada vez más. Una instalación de fabricación moderna consume electricidad equivalente a una ciudad pequeña, y algunas plantas en Taiwán utilizan tanta energía como 300.000 hogares. El consumo de agua alcanza millones de galones diarios para procesos de refrigeración y limpieza. La industria se ha comprometido con la adopción de energías renovables y el reciclaje de agua para reducir el impacto ambiental, y TSMC se ha comprometido a alcanzar cero emisiones netas para 2050.\n\nLas tecnologías de empaquetado avanzado extienden el rendimiento de los semiconductores más allá de lo que la miniaturización de los transistores por sí sola puede lograr. Las arquitecturas de chiplet combinan múltiples chips más pequeños en paquetes que funcionan como procesadores individuales. El apilamiento tridimensional coloca los chips verticalmente conectados por pilares microscópicos. Estas técnicas permiten una mejora continua incluso cuando el acercamiento a los límites atómicos amenaza el escalado tradicional. Los últimos procesadores de AMD utilizan diseños de chiplet que reducen los costos de fabricación al tiempo que mejoran el rendimiento.\n\nLas demandas de mano de obra de la fabricación de semiconductores crean desafíos para la expansión de la industria. Los técnicos cualificados que operan los equipos de fabricación requieren años de formación. Los ingenieros que diseñan procesos de próxima generación necesitan títulos avanzados y experiencia especializada. Estados Unidos enfrenta una escasez particular después de décadas de declive de la manufactura. Las iniciativas educativas y las políticas de inmigración determinarán si los países pueden contratar al personal de las instalaciones de fabricación que se apresuran a construir.\n\nLas preocupaciones de seguridad impregnan la industria de los semiconductores a medida que los chips se convierten en armas en la competencia tecnológica entre naciones. Los sistemas de defensa dependen de suministros de chips confiables, libres de vulnerabilidades ocultas. La prosperidad económica requiere acceso a las tecnologías más avanzadas para la inteligencia artificial, los vehículos autónomos y otras aplicaciones emergentes. La importancia estratégica de los semiconductores asegura que los gobiernos continuarán invirtiendo fuertemente y restringiendo las exportaciones para proteger los intereses nacionales percibidos.\n\nLa próxima década determinará si la industria de los semiconductores permanece concentrada en Asia Oriental o se diversifica a nivel mundial. Las enormes inversiones en nuevas instalaciones de fabricación tardarán años en ser productivas. Los desafíos tecnológicos se multiplican a medida que los transistores se acercan a los límites físicos fundamentales. Los nuevos paradigmas de computación, incluido el procesamiento cuántico y los chips neuromórficos, pueden eventualmente complementar o reemplazar a los semiconductores tradicionales. Cualquiera que sea la dirección que tome la industria, estos pequeños chips seguirán siendo esenciales para la vida moderna en el futuro previsible.",
    "wordCount": 1661,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p07-q1",
        "type": "single_choice",
        "question": "¿Cuándo se demostró el primer transistor en Bell Labs?",
        "options": [
          "23 de diciembre de 1945",
          "23 de diciembre de 1947",
          "23 de diciembre de 1950",
          "23 de diciembre de 1955"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p07-q2",
        "type": "multiple_select",
        "question": "¿Qué compañías se mencionan como fabricantes de chips de memoria? Seleccione todas las que correspondan.",
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
        "question": "TSMC produjo más del 90 por ciento de los chips más avanzados del mundo en 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q4",
        "type": "numeric",
        "question": "¿Cuánto cuesta una máquina de litografía ultravioleta extrema (EUV) de ASML (en millones de dólares)?",
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
        "question": "¿Quién fundó TSMC en 1987?",
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
        "question": "¿Cuánto asignó la Ley CHIPS y Ciencia para semiconductores en agosto de 2022?",
        "options": [
          "32 mil millones de dólares",
          "42 mil millones de dólares",
          "52 mil millones de dólares",
          "62 mil millones de dólares"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q7",
        "type": "numeric",
        "question": "¿Cuántos ingresos perdió la industria debido a la escasez de chips para automóviles (en miles de millones de dólares)?",
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
        "question": "La capitalización de mercado de Nvidia superó el billón de dólares en junio de 2023.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p07-q9",
        "type": "single_choice",
        "question": "¿A qué temperatura se calienta el plasma en las máquinas EUV de ASML?",
        "options": [
          "22.000 grados Celsius",
          "120.000 grados Celsius",
          "220.000 grados Celsius",
          "1.400 grados Celsius"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p07-q10",
        "type": "numeric",
        "question": "¿Cuántos miles de millones de transistores contienen los procesadores modernos?",
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
        "question": "¿Cuándo inventó Jack Kilby el circuito integrado en Texas Instruments?",
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
    "title": "La Evolución del Streaming Multimedia",
    "content": "El streaming multimedia ha transformado fundamentalmente la forma en que la humanidad consume entretenimiento, educación e información, reemplazando los medios físicos y los horarios de transmisión con acceso instantáneo a contenido virtualmente ilimitado desde cualquier dispositivo conectado a internet. Esta revolución tecnológica, que comenzó con clips de vídeo granulosos en la década de 1990, ahora ofrece películas en ultra alta definición, conciertos en vivo y experiencias interactivas a miles de millones de usuarios en todo el mundo. La historia del streaming revela cómo los avances en la compresión, el ancho de banda y los modelos de negocio se combinaron para remodelar industrias enteras.\n\nLas bases técnicas del streaming surgieron de la investigación sobre la compresión de vídeo y los protocolos de red durante las décadas de 1980 y 1990. Los ingenieros del Moving Picture Experts Group desarrollaron los estándares MPEG que hicieron práctico el vídeo digital, con MPEG-1 apareciendo en 1993 y MPEG-4 siguiendo en 1998. Estos algoritmos de compresión redujeron los archivos de vídeo a tamaños manejables al eliminar la información redundante entre fotogramas y aproximar los detalles que el ojo humano no notaría. Sin tal compresión, el streaming de vídeo requeriría un ancho de banda que excedería con creces lo que las redes podrían ofrecer.\n\nRealNetworks lanzó RealPlayer en 1995, siendo pionero en el streaming de audio y vídeo a través de las primeras conexiones a internet. El formato RealAudio de la compañía permitió a las estaciones de radio transmitir por la web por primera vez. RealVideo siguió en 1997, aunque los vídeos del tamaño de un sello de correos y tartamudeantes se parecían poco al streaming moderno. En su apogeo alrededor del año 2000, RealPlayer se había instalado en más del 85 por ciento de las computadoras conectadas a internet.\n\nApple entró en la arena del streaming con QuickTime, lanzado originalmente en 1991 para reproducir archivos de vídeo locales. La compañía añadió capacidades de streaming a lo largo de la década de 1990 y aprovechó la tecnología al lanzar iTunes en enero de 2001. Si bien iTunes se centró inicialmente en la descarga de música en lugar del streaming, demostró el apetito de los consumidores por el acceso digital instantáneo. Apple vendió más de 70 millones de canciones a través de iTunes en su primer año.\n\nLa fundación de YouTube en febrero de 2005 por los ex empleados de PayPal, Chad Hurley, Steve Chen y Jawed Karim, marcó el comienzo de la era principal del streaming de vídeo. La plataforma simplificó la subida y el intercambio de vídeos para los usuarios comunes sin experiencia técnica. El primer vídeo, que mostraba a Karim en el zoológico de San Diego, se publicó el 23 de abril de 2005. Google reconoció el potencial de YouTube y adquirió la compañía por 1.650 millones de dólares en octubre de 2006, solo dieciocho meses después de su fundación.\n\nNetflix comenzó como un servicio de alquiler de DVD por correo en 1997, fundado por Reed Hastings y Marc Randolph en Scotts Valley, California. La compañía introdujo alquileres ilimitados por una cuota de suscripción mensual en 1999, desafiando el modelo de alquiler por unidad de Blockbuster. Netflix lanzó el streaming de vídeo en enero de 2007, inicialmente como un complemento de su servicio de DVD. Los suscriptores podían ver una selección limitada de películas y programas de televisión directamente en sus computadoras sin esperar a que llegaran los discos.\n\nLa transición de los DVD al streaming se aceleró a lo largo de la década de 2010 a medida que mejoraron las velocidades de internet y se expandieron las bibliotecas de contenido. Netflix comenzó a producir programación original con el lanzamiento de House of Cards en febrero de 2013, que recibió elogios de la crítica y demostró que las plataformas de streaming podían competir con las redes tradicionales por el talento y la calidad. La compañía invirtió fuertemente en contenido original, gastando más de 17 mil millones de dólares anuales en programación para 2022.\n\nSpotify revolucionó el streaming de música después de que sus fundadores suecos Daniel Ek y Martin Lorentzon lanzaran el servicio en octubre de 2008. La plataforma ofrecía tanto escucha gratuita con publicidad como suscripciones premium sin publicidad. Spotify negoció acuerdos de licencia con los principales sellos discográficos a pesar de la resistencia inicial de una industria que aún se recuperaba del devastador impacto de la piratería. En diciembre de 2023, Spotify reportó 602 millones de usuarios activos mensuales y más de 236 millones de suscriptores de pago.\n\nAmazon Prime Video surgió de la adquisición por parte de Amazon en 2006 del servicio de vídeo que se convirtió en Amazon Unbox. La compañía incluyó el streaming de vídeo con la membresía Prime a partir de febrero de 2011, agregando valor a la suscripción que anteriormente solo ofrecía envíos más rápidos. Amazon comenzó a producir contenido original en 2013 y desde entonces ha ganado premios Emmy y premios de la Academia por sus producciones. La combinación del streaming de vídeo con los beneficios de compra crea ventajas competitivas únicas.\n\nDisney lanzó Disney Plus el 12 de noviembre de 2019, aprovechando su vasta biblioteca de contenido que incluye propiedades de Marvel, Star Wars, Pixar y National Geographic. El servicio atrajo a 10 millones de suscriptores en su primer día, lo que demuestra el poder de las franquicias queridas y los precios agresivos. Disney Plus alcanzó más de 160 millones de suscriptores en cuatro años, aunque la compañía enfrentó presión para lograr la rentabilidad después de las pérdidas iniciales por la fuerte inversión en contenido.\n\nEl streaming en vivo se ha expandido más allá del entretenimiento para abarcar los juegos, la educación, el fitness y muchos otros dominios. Twitch, fundado en 2011 y adquirido por Amazon por 970 millones de dólares en 2014, popularizó el streaming en vivo de videojuegos. Los jugadores profesionales transmiten a millones de espectadores mientras obtienen ingresos a través de suscripciones y donaciones. La plataforma promedió más de 31 millones de visitantes diarios para 2023, rivalizando con las transmisiones deportivas tradicionales para audiencias jóvenes.\n\nLas innovaciones técnicas continúan mejorando la calidad y la eficiencia del streaming. El streaming de bitrate adaptativo ajusta automáticamente la calidad del vídeo en función del ancho de banda disponible, evitando el buffering y maximizando la resolución cuando las conexiones lo permiten. Las redes de entrega de contenido (CDN) posicionan los servidores geográficamente cerca de los espectadores, reduciendo la latencia y mejorando la confiabilidad. Las mejoras de códec, incluyendo H.265 y AV1, ofrecen una mayor calidad a bitrates más bajos, permitiendo el streaming 4K y 8K incluso en conexiones limitadas.\n\nLa infraestructura que soporta los servicios de streaming requiere una inversión masiva en centros de datos y capacidad de red. La entrega de contenido de Netflix utiliza servidores posicionados dentro de las redes de los proveedores de servicios de internet, almacenando copias de títulos populares localmente para reducir la transferencia de datos a larga distancia. Durante las horas pico de la noche, el streaming de vídeo representa más del 60 por ciento del tráfico de internet en América del Norte. Esta concentración ha provocado debates sobre la neutralidad de la red y si los servicios de streaming deben pagar por la entrega priorizada.\n\nEl streaming de música ha alterado fundamentalmente la forma en que los artistas obtienen ingresos y cómo operan los sellos discográficos. Spotify paga a los artistas aproximadamente de 0.003 a 0.005 dólares por stream, lo que requiere millones de reproducciones para generar ingresos significativos. Este modelo favorece a los artistas con seguidores grandes y comprometidos, al tiempo que dificulta que los músicos emergentes mantengan sus carreras. Taylor Swift retiró famosamente su música de Spotify de 2014 a 2017, protestando por la economía del streaming antes de regresar eventualmente.\n\nEl streaming de podcasts ha explotado de un medio nicho a una categoría de contenido importante que atrae miles de millones en inversión. Spotify adquirió las compañías de podcasts Gimlet Media y Anchor en febrero de 2019 por aproximadamente 340 millones de dólares combinados. Apple, que popularizó los podcasts a través de la integración de iTunes a partir de 2005, enfrenta una mayor competencia de Spotify y Amazon. En 2023 existían más de 2 millones de podcasts con más de 48 millones de episodios.\n\nLas guerras del streaming se han intensificado a medida que las compañías de medios tradicionales lanzan servicios competidores. HBO Max, Paramount Plus, Peacock y Apple TV Plus entraron al mercado entre 2019 y 2020. Esta fragmentación obliga a los consumidores a suscribirse a múltiples servicios para acceder a todo el contenido deseado, recreando irónicamente algunos de los inconvenientes de los paquetes de televisión por cable que el streaming inicialmente prometió eliminar. Los analistas de la industria predicen la consolidación a medida que los servicios más pequeños luchan por competir.\n\nLa expansión internacional presenta tanto oportunidades como desafíos para las plataformas de streaming. Netflix opera en más de 190 países y produce contenido en docenas de idiomas. La serie coreana Squid Game se convirtió en el programa más visto de Netflix en septiembre de 2021, lo que demuestra el apetito mundial por contenido que no está en inglés. Los competidores locales, incluyendo Hotstar en India, iQiyi en China y Globoplay en Brasil, mantienen posiciones sólidas en sus mercados locales.\n\nLas preocupaciones regulatorias que rodean a los servicios de streaming se multiplican a medida que se convierten en plataformas de entretenimiento dominantes. Las preguntas sobre la privacidad de los datos, la moderación del contenido, las prácticas laborales y la concentración del mercado atraen la atención de los responsables políticos. La Unión Europea exige que los servicios de streaming garanticen que el 30 por ciento de sus catálogos consista en obras europeas. Algunos países imponen impuestos a las suscripciones de streaming para financiar la producción de contenido local.\n\nEl futuro del streaming apunta hacia una mayor interactividad, inmersión y personalización. Los servicios de juegos en la nube de Microsoft, Sony y otros transmiten videojuegos sin requerir hardware costoso. Las experiencias de realidad virtual eventualmente podrían transmitirse a auriculares ligeros. Los algoritmos de inteligencia artificial continuarán refinando las recomendaciones y potencialmente generando contenido personalizado. Independientemente de las tecnologías específicas que surjan, el streaming ha transformado permanentemente la relación entre creadores y audiencias en todo el mundo.",
    "wordCount": 1699,
    "difficulty": "intermediate",
    "questions": [
      {
        "id": "technology-internet-p08-q1",
        "type": "single_choice",
        "question": "¿Cuándo lanzó Netflix su servicio de video en streaming?",
        "options": [
          "Enero de 2005",
          "Enero de 2007",
          "Enero de 2009",
          "Enero de 2011"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q2",
        "type": "multiple_select",
        "question": "¿Qué compañías fundaron importantes plataformas de streaming? Selecciona todas las que correspondan.",
        "options": [
          "Chad Hurley cofundó YouTube",
          "Reed Hastings cofundó Netflix",
          "Daniel Ek cofundó Spotify",
          "Bill Gates fundó Disney Plus"
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
        "question": "Google adquirió YouTube por 1.650 millones de dólares en octubre de 2006.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q4",
        "type": "numeric",
        "question": "¿Cuántos millones de suscriptores reportó Spotify como suscriptores de pago en diciembre de 2023?",
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
        "question": "¿Cuándo se subió el primer video a YouTube?",
        "options": [
          "14 de febrero de 2005",
          "23 de abril de 2005",
          "4 de julio de 2005",
          "9 de octubre de 2005"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p08-q6",
        "type": "single_choice",
        "question": "¿Cuántos suscriptores atrajo Disney Plus en su primer día?",
        "options": [
          "1 millón",
          "5 millones",
          "10 millones",
          "20 millones"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p08-q7",
        "type": "numeric",
        "question": "¿Cuánto pagó Amazon para adquirir Twitch en 2014 (en millones de dólares)?",
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
        "question": "Netflix comenzó como un servicio de alquiler de DVD por correo en 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p08-q9",
        "type": "single_choice",
        "question": "¿Qué serie original de Netflix se lanzó en febrero de 2013?",
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
        "question": "¿Qué porcentaje del tráfico de internet en América del Norte representa el video en streaming durante las horas pico?",
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
        "question": "¿Qué serie coreana se convirtió en el programa más visto de Netflix en septiembre de 2021?",
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
    "title": "La Ciencia de los Motores de Búsqueda",
    "content": "Los motores de búsqueda se han convertido en las principales puertas de acceso a través de las cuales la humanidad accede al vasto depósito de información en Internet, procesando miles de millones de consultas diariamente y dando forma a cómo las personas descubren, evalúan y comprenden el mundo que les rodea. Los sofisticados algoritmos que impulsan estos sistemas representan algunos de los softwares más complejos jamás desarrollados, combinando técnicas de recuperación de información, procesamiento del lenguaje natural, aprendizaje automático y computación distribuida. Comprender cómo funcionan los motores de búsqueda revela tanto sus notables capacidades como su profunda influencia en el conocimiento y el comportamiento humanos.\n\nLos orígenes de la búsqueda web se remontan a principios de la década de 1990, cuando Internet estaba creciendo demasiado para los directorios seleccionados manualmente. Archie, creado por Alan Emtage en la Universidad McGill en Montreal en 1990, indexaba nombres de archivos en servidores FTP, pero no buscaba páginas web. The World Wide Web Wanderer, desarrollado por Matthew Gray en el MIT en 1993, se convirtió en el primer rastreador web, midiendo el crecimiento de Internet visitando páginas automáticamente. Estas herramientas primitivas sentaron las bases para sistemas más sofisticados.\n\nAltaVista se lanzó en diciembre de 1995 y rápidamente se convirtió en el motor de búsqueda líder de su época. Desarrollado por investigadores de Digital Equipment Corporation en Palo Alto, California, AltaVista podía buscar en una base de datos de 20 millones de páginas web utilizando la indexación de texto completo. Los usuarios se maravillaron de los resultados que aparecían en segundos para consultas en millones de documentos. En su apogeo en 1997, AltaVista procesó 80 millones de consultas de búsqueda por día.\n\nLarry Page y Sergey Brin crearon Google como un proyecto de investigación de la Universidad de Stanford en 1996, introduciendo el algoritmo PageRank que transformaría la búsqueda. Su idea fue que los enlaces entre las páginas web contenían información valiosa sobre la relevancia y la autoridad. Una página enlazada por muchas otras páginas, particularmente páginas importantes, debería clasificarse más alto que una con pocos enlaces. Este enfoque produjo resultados dramáticamente mejores que los competidores que clasificaban las páginas principalmente por la frecuencia de las palabras clave.\n\nPageRank simula a un surfista web aleatorio que hace clic en enlaces aleatoriamente y ocasionalmente salta a una página completamente aleatoria. La probabilidad de que este surfista hipotético visite cualquier página en particular se convierte en su puntaje PageRank. Las páginas que reciben muchos enlaces de páginas con alto PageRank acumulan puntajes más altos. Este modelo matemático, detallado en el artículo de Page y Brin de 1998 publicado cuando eran estudiantes de doctorado, sigue siendo fundamental para la clasificación de Google a pesar de las numerosas mejoras posteriores.\n\nEl proceso de rastreo web comienza con una lista de URL conocidas que los programas automatizados llamados arañas o rastreadores visitan. El rastreador descarga el contenido de cada página y extrae todos los hipervínculos que contiene. Las nuevas URL se agregan a la cola para futuros rastreos. El rastreador de Google, originalmente llamado BackRub y luego Googlebot, visita miles de millones de páginas continuamente, priorizando los sitios que se actualizan con frecuencia y aquellos con muchos enlaces entrantes. Un rastreo completo de la web lleva semanas, aunque las páginas populares se vuelven a rastrear con mucha más frecuencia.\n\nLa indexación transforma el contenido bruto de la página web en datos estructurados que permiten una recuperación rápida. Los motores de búsqueda construyen índices invertidos que mapean cada palabra a la lista de documentos que la contienen. Cuando busca un término, el motor busca la lista de publicaciones de ese término en lugar de escanear cada documento. Las estructuras de datos adicionales almacenan información sobre las posiciones de las palabras para la coincidencia de frases, el texto de anclaje de los enlaces entrantes y metadatos como títulos de página y fechas de modificación.\n\nEl procesamiento de consultas interpreta lo que los usuarios realmente quieren cuando escriben términos de búsqueda. La comprensión del lenguaje natural ayuda a los motores de búsqueda a reconocer que una búsqueda de zapatillas para correr probablemente busca productos en lugar de información sobre calzado para correr. El reconocimiento de entidades identifica búsquedas de personas, lugares, organizaciones y conceptos. La expansión de consultas agrega sinónimos y términos relacionados para mejorar el recuerdo. La corrección ortográfica corrige errores tipográficos antes de ejecutar las búsquedas, y Google corrige aproximadamente el 10 por ciento de todas las consultas.\n\nLos algoritmos de clasificación combinan cientos de señales para determinar qué páginas responden mejor a cada consulta. Más allá de PageRank, Google considera factores que incluyen la presencia de palabras clave en títulos y encabezados, la frescura del contenido, la compatibilidad con dispositivos móviles, la velocidad de carga de la página y la relevancia geográfica. Los modelos de aprendizaje automático entrenados en vastos conjuntos de datos del comportamiento del usuario han reemplazado en gran medida las fórmulas de clasificación hechas a mano. RankBrain, introducido en 2015, utiliza redes neuronales para interpretar consultas ambiguas e identificar resultados relevantes.\n\nEl comportamiento del usuario proporciona información crucial que los motores de búsqueda utilizan para mejorar las clasificaciones. Las tasas de clics indican qué resultados los usuarios encuentran prometedores. El tiempo que se pasa en las páginas después de hacer clic sugiere si los resultados satisficieron la consulta. El patrón de regresar a los resultados de búsqueda y hacer clic en diferentes enlaces, llamado pogo-sticking, indica que los resultados iniciales no fueron útiles. Los motores de búsqueda analizan miles de millones de estas señales diariamente para refinar sus algoritmos.\n\nLos gráficos de conocimiento representan información sobre entidades y sus relaciones en bases de datos estructuradas. El Gráfico de Conocimiento de Google, introducido en mayo de 2012, contiene miles de millones de datos sobre personas, lugares, cosas y conceptos. Cuando busca una persona famosa, el panel de conocimiento que aparece junto a los resultados se basa en estos datos estructurados. Wikidata, una base de conocimiento colaborativa operada por la Fundación Wikimedia, contribuye sustancialmente a estos sistemas.\n\nLos fragmentos destacados y las respuestas directas tienen como objetivo satisfacer las consultas sin requerir que los usuarios hagan clic en los sitios web. Google extrae pasajes relevantes de las páginas web y los muestra de manera destacada para las preguntas. Los asistentes de voz dependen en gran medida de estas respuestas directas, ya que los usuarios no pueden hacer clic en enlaces en dispositivos solo de audio. Los editores debaten si los fragmentos destacados ayudan al dirigir el tráfico o perjudican al reducirlo, y algunos optan por no participar en la selección de fragmentos por completo.\n\nLa búsqueda local conecta las consultas con negocios y servicios cercanos. Cuando alguien busca cafeterías o fontaneros, el motor de búsqueda incorpora su ubicación para mostrar opciones locales relevantes. Los perfiles de Google My Business permiten a las empresas proporcionar información directamente. Las reseñas agregadas de varias fuentes ayudan a los usuarios a elegir entre opciones. La búsqueda local genera ingresos sustanciales a través de la publicidad, y las empresas pagan para aparecer de manera destacada para las consultas comerciales.\n\nLa publicidad en búsquedas transformó a Google en una de las empresas más valiosas del mundo. Los anunciantes pujan por palabras clave, pagando solo cuando los usuarios hacen clic en sus anuncios. El sistema de subastas de Google considera tanto los montos de las ofertas como la calidad del anuncio para determinar qué anuncios aparecen y en qué orden. La publicidad en búsquedas generó más de 162 mil millones de dólares en ingresos para la empresa matriz de Google, Alphabet, en 2022. Este modelo de negocio crea incentivos para maximizar la participación del usuario con los resultados de búsqueda.\n\nEl spam y la manipulación han plagado los motores de búsqueda desde sus primeros días. Los operadores de sitios web sin escrúpulos llenan las páginas con palabras clave ocultas, crean redes de enlaces artificiales y emplean innumerables otras tácticas para manipular las clasificaciones. Los motores de búsqueda participan en continuas carreras armamentistas contra tal manipulación. La actualización Penguin de Google en abril de 2012 penalizó a los sitios con patrones de enlaces no naturales. La compañía emplea a miles de evaluadores de calidad que evalúan los resultados de búsqueda de acuerdo con directrices detalladas.\n\nLas preocupaciones de privacidad rodean la vasta cantidad de datos que los motores de búsqueda recopilan sobre las consultas y el comportamiento de los usuarios. Los historiales de búsqueda revelan problemas de salud, situaciones financieras, problemas de relaciones e innumerables otros detalles íntimos. Google retiene los datos de búsqueda vinculados a las cuentas de forma predeterminada, utilizándolos para la personalización y la orientación de la publicidad. Alternativas como DuckDuckGo se diferencian al prometer no rastrear a los usuarios, aunque sacrifican algunas capacidades de personalización.\n\nLa competencia en la búsqueda se ha mantenido limitada a pesar del escrutinio regulatorio en todo el mundo. Google posee aproximadamente el 91 por ciento de la cuota de mercado de búsqueda global según los datos de StatCounter de 2023. Bing, el motor de búsqueda de Microsoft, reclama alrededor del 3 por ciento a nivel mundial, pero funciona mejor en los Estados Unidos. Alternativas regionales, incluyendo Baidu en China y Yandex en Rusia, dominan sus mercados locales. La Unión Europea multó a Google con 2.42 mil millones de euros en junio de 2017 por favorecer su propio servicio de comparación de compras en los resultados de búsqueda.\n\nLa inteligencia artificial está transformando la búsqueda a través de grandes modelos de lenguaje que comprenden y generan lenguaje natural. El lanzamiento de ChatGPT en noviembre de 2022 generó preocupaciones de que la IA conversacional pudiera interrumpir la búsqueda tradicional. Microsoft integró GPT-4 en Bing en febrero de 2023. Google respondió con Bard y posteriormente Gemini. Estos sistemas pueden sintetizar información de múltiples fuentes e interactuar en diálogo, cambiando potencialmente la forma en que las personas encuentran información en línea.\n\nEl futuro de la búsqueda se extiende más allá de las consultas de texto a imágenes, voz y entradas multimodales. Google Lens permite buscar utilizando cámaras de teléfonos inteligentes, identificando objetos, traduciendo texto y resolviendo problemas matemáticos a partir de imágenes. La búsqueda por voz a través de altavoces inteligentes y teléfonos inteligentes representa una proporción creciente de las consultas. Los motores de búsqueda deben adaptarse a los nuevos dispositivos y patrones de interacción manteniendo la velocidad y la precisión que esperan los usuarios.",
    "wordCount": 1723,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p09-q1",
        "type": "single_choice",
        "question": "¿Quién creó el primer rastreador web llamado World Wide Web Wanderer en 1993?",
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
        "question": "¿Qué factores consideran los motores de búsqueda al clasificar las páginas? Seleccione todas las que correspondan.",
        "options": [
          "Análisis de enlaces PageRank",
          "Frescura del contenido",
          "Velocidad de carga de la página",
          "Tamaño del archivo solamente"
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
        "question": "AltaVista procesó 80 millones de consultas de búsqueda por día en su punto máximo en 1997.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q4",
        "type": "numeric",
        "question": "¿Qué porcentaje de la cuota de mercado de búsqueda global tiene Google según datos de 2023?",
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
        "question": "¿Cuándo se introdujo el Gráfico de Conocimiento de Google?",
        "options": [
          "Mayo de 2010",
          "Mayo de 2012",
          "Mayo de 2014",
          "Mayo de 2016"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q6",
        "type": "single_choice",
        "question": "¿Cuándo penalizó la actualización Penguin de Google a los sitios con patrones de enlaces no naturales?",
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
        "question": "¿Cuántos ingresos generó la publicidad de búsqueda para Alphabet en 2022 (en miles de millones de dólares)?",
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
        "question": "Google corrige aproximadamente el 10 por ciento de todas las consultas de búsqueda por errores de ortografía.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p09-q9",
        "type": "single_choice",
        "question": "¿Cuándo integró Microsoft GPT-4 en Bing?",
        "options": [
          "Noviembre de 2022",
          "Febrero de 2023",
          "Junio de 2023",
          "Octubre de 2023"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p09-q10",
        "type": "numeric",
        "question": "¿Cuánto multó la Unión Europea a Google en junio de 2017 (en miles de millones de euros)?",
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
        "question": "¿Cuándo fue introducido RankBrain por Google?",
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
        "question": "¿Cuándo se lanzó AltaVista?",
        "options": [
          "Diciembre de 1993",
          "Diciembre de 1995",
          "Diciembre de 1997",
          "Diciembre de 1999"
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
    "title": "Vehículos Autónomos y el Futuro del Transporte",
    "content": "Los vehículos autónomos prometen revolucionar el transporte con tecnología de conducción autónoma que podría reducir los accidentes, transformar los paisajes urbanos y alterar fundamentalmente la forma en que la humanidad mueve personas y bienes a través de distancias pequeñas y grandes. Esta ambiciosa visión ha atraído cientos de miles de millones de dólares en inversión de fabricantes de automóviles, gigantes tecnológicos y nuevas empresas que compiten para resolver los inmensos desafíos técnicos, regulatorios y sociales involucrados. El viaje hacia vehículos verdaderamente autónomos revela el estado actual de esta tecnología transformadora y los obstáculos que quedan antes de que los automóviles autónomos se vuelvan comunes.\n\nEl sueño de los vehículos autónomos es anterior a la propia computadora digital. Norman Bel Geddes presentó la exhibición Futurama en la Feria Mundial de Nueva York de 1939, representando autopistas automatizadas donde los automóviles viajarían con seguridad sin intervención humana para la década de 1960. General Motors, que patrocinó la exhibición, más tarde se asoció con RCA para desarrollar el prototipo Firebird IV en 1964, con sistemas de guía electrónica que podían seguir un cable incrustado en las carreteras. Estas primeras visiones requerían cambios en la infraestructura en lugar de inteligencia vehicular.\n\nEl desarrollo moderno de vehículos autónomos comenzó con las competiciones DARPA Grand Challenge que catalizaron la investigación académica y de la industria a partir de 2004. El primer desafío, celebrado en el Desierto de Mojave, ofreció un millón de dólares a cualquier vehículo que pudiera completar un recorrido de 241 kilómetros (150 millas) sin intervención humana. Todos los participantes fracasaron, y el vehículo que llegó más lejos recorrió solo 11,9 kilómetros (7,4 millas) antes de atascarse. El desafío de 2005 vio a cinco vehículos completar el recorrido, con el Stanley de la Universidad de Stanford ganando en 6 horas y 53 minutos.\n\nLa Sociedad de Ingenieros Automotrices define seis niveles de automatización de la conducción que se han convertido en estándar en la industria. El nivel 0 significa ninguna automatización, con humanos controlando todas las tareas de conducción. El nivel 1 incluye asistencia básica como el control de crucero adaptativo. El nivel 2 combina múltiples funciones de asistencia, pero requiere supervisión humana constante. El nivel 3 permite que el vehículo maneje toda la conducción en condiciones limitadas mientras los humanos permanecen listos para intervenir. El nivel 4 logra la automatización total dentro de dominios operativos definidos. El nivel 5 significa automatización completa en todas las condiciones, igualando o superando la capacidad humana en todas partes.\n\nLos sistemas de sensores proporcionan a los vehículos autónomos las capacidades de percepción necesarias para una navegación segura. Las cámaras capturan información visual sobre carriles, señales, semáforos y otros usuarios de la carretera. El radar mide la velocidad y la distancia de los objetos cercanos a través de ondas de radio que funcionan independientemente de la iluminación o el clima. El lidar utiliza pulsos láser para crear mapas tridimensionales detallados del entorno, con algunos sistemas que generan más de dos millones de puntos de datos por segundo. Los sensores ultrasónicos detectan obstáculos a corta distancia durante las maniobras de estacionamiento.\n\nWaymo, la subsidiaria de vehículos autónomos de Alphabet, surgió del proyecto de automóviles autónomos de Google que comenzó en 2009. Sebastian Thrun, quien dirigió el equipo ganador de Stanford DARPA, dirigió la investigación inicial. El proyecto acumuló millones de millas de prueba en varios estados antes de que Waymo lanzara el servicio comercial de robotaxis en Phoenix, Arizona, en diciembre de 2018. En octubre de 2023, los vehículos de Waymo habían recorrido más de 11,2 millones de kilómetros (7 millones de millas) en vías públicas sin conductores de seguridad, principalmente en Phoenix y San Francisco.\n\nTesla ha seguido un enfoque diferente a la autonomía a través de sus sistemas Autopilot y Full Self-Driving. En lugar de lidar costoso, Tesla se basa en cámaras y visión por computadora entrenadas con datos de millones de vehículos de clientes. El CEO Elon Musk predijo repetidamente la inminente autonomía total, afirmando en 2016 que un Tesla se conduciría solo desde Los Ángeles a Nueva York en 2017. Esta predicción y muchas posteriores no se han materializado, aunque los vehículos Tesla ofrecen funciones de asistencia al conductor cada vez más capaces.\n\nCruise, propiedad mayoritaria de General Motors, operaba servicios de robotaxis en San Francisco hasta que el Departamento de Vehículos Motorizados de California revocó sus permisos en octubre de 2023 luego de un incidente en el que un vehículo golpeó y arrastró a un peatón. La empresa se había expandido agresivamente, operando cientos de vehículos en varias ciudades. La revocación del permiso destacó los desafíos regulatorios que enfrenta la industria y la dificultad de garantizar la seguridad a escala.\n\nLas empresas chinas han surgido como actores importantes en el desarrollo de vehículos autónomos. La plataforma Apollo de Baidu comenzó su desarrollo en 2017 y ha acumulado más de 100 millones de kilómetros de pruebas en carretera. Pony.ai, fundada en 2016, opera servicios de robotaxis en varias ciudades chinas y California. WeRide se ha asociado con Nissan y ha establecido operaciones en Oriente Medio. Ciudades chinas como Wuhan, Guangzhou y Shenzhen han permitido operaciones comerciales de robotaxis que cubren importantes áreas urbanas.\n\nLos sistemas de inteligencia artificial que impulsan los vehículos autónomos deben manejar una complejidad extraordinaria. Los algoritmos de visión por computadora identifican y clasifican miles de tipos de objetos, desde peatones y ciclistas hasta zonas de construcción y vehículos de emergencia. Los modelos de predicción anticipan cómo se comportarán otros usuarios de la carretera en los próximos segundos. Los algoritmos de planificación eligen trayectorias que alcanzan los destinos de forma segura y eficiente. Todos estos cálculos deben ejecutarse en milisegundos teniendo en cuenta la incertidumbre y los escenarios raros.\n\nLos casos límite presentan desafíos particulares para los sistemas autónomos. Una bolsa de plástico que sopla a través de una carretera y un niño que corre hacia la calle pueden parecer similares a los sensores, pero requieren respuestas completamente diferentes. Los trabajadores de la construcción que dirigen el tráfico con gestos con las manos anulan las normas de tráfico normales. Los vehículos de emergencia que se acercan desde ángulos oscurecidos exigen una acción inmediata. Los datos de entrenamiento no pueden cubrir todos los escenarios posibles, lo que requiere que los vehículos generalicen adecuadamente a partir de experiencias similares.\n\nLa validación de la seguridad plantea preguntas fundamentales sobre cómo demostrar que los vehículos autónomos están listos para su despliegue. Los conductores humanos promedian aproximadamente un accidente fatal por cada 160 millones de kilómetros (100 millones de millas) recorridos en los Estados Unidos. Demostrar estadísticamente que un sistema autónomo cumple o supera este punto de referencia requeriría miles de millones de kilómetros de prueba, un estándar poco práctico. En cambio, las empresas emplean simulación, pruebas en circuitos cerrados y despliegue gradual mientras monitorean continuamente el rendimiento en el mundo real.\n\nLos marcos regulatorios para los vehículos autónomos varían drásticamente entre las jurisdicciones. California exige que las empresas informen sobre las desconexiones cuando los conductores de seguridad humanos toman el control. Arizona adoptó un enfoque permisivo que atrajo la actividad de prueba. Alemania aprobó una legislación en 2021 que permite vehículos de nivel 4 en vías públicas bajo condiciones específicas. China ha designado ciertas ciudades como zonas de prueba con dominios operativos que se expanden gradualmente. Este mosaico de regulaciones complica las estrategias de despliegue internacional.\n\nLos beneficios potenciales de los vehículos autónomos se extienden mucho más allá de la comodidad. Los accidentes automovilísticos matan aproximadamente a 1,35 millones de personas en todo el mundo anualmente, y el error humano contribuye a más del 90 por ciento de los accidentes. Los sistemas autónomos no se distraen, se fatigan ni se ven afectados. Podrían reducir drásticamente este número si su rendimiento de seguridad supera al de los conductores humanos. El transporte sería accesible para las poblaciones ancianas, discapacitadas y jóvenes que actualmente no pueden conducir por sí mismas.\n\nLas implicaciones económicas del transporte autónomo podrían remodelar industrias enteras. Los conductores profesionales, incluidos los camioneros, los operadores de taxis y los trabajadores de reparto, se enfrentan a un posible desplazamiento. Las empresas de transporte como Uber y Lyft invierten fuertemente en la autonomía con la esperanza de eliminar su mayor costo. Los modelos de seguros deben adaptarse cuando los conductores humanos ya no controlan los vehículos. Los planificadores urbanos prevén ciudades con menos estacionamientos y carreteras más estrechas a medida que los vehículos autónomos compartidos reducen el número total de vehículos.\n\nLas aplicaciones de camiones pueden lograr viabilidad comercial antes que los robotaxis de pasajeros debido a entornos de autopista más predecibles. Aurora, cofundada por antiguos líderes de los programas autónomos de Google, Tesla y Uber, se centra principalmente en el transporte de mercancías. TuSimple realizó recorridos totalmente autónomos en autopistas entre Phoenix y Dallas antes de que las dificultades financieras obligaran a una reestructuración estratégica en 2023. Embark, Kodiak y muchas otras empresas persiguen aplicaciones similares de camiones de larga distancia.\n\nEl cronograma para la adopción generalizada de vehículos autónomos sigue siendo muy incierto a pesar de décadas de desarrollo e inversión masiva. Las proyecciones optimistas de mediados de la década de 2010 predijeron robotaxis ubicuos para principios de la década de 2020. La realidad ha demostrado ser mucho más desafiante de lo previsto. Los expertos de la industria ahora generalmente esperan un despliegue gradual durante décadas en lugar de una transformación repentina. Es probable que la tecnología mejore incrementalmente, expandiéndose desde dominios operativos limitados hacia capacidades más amplias durante muchos años.",
    "wordCount": 1575,
    "difficulty": "advanced",
    "questions": [
      {
        "id": "technology-internet-p10-q1",
        "type": "single_choice",
        "question": "¿Cuándo se celebró el primer DARPA Grand Challenge?",
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
        "question": "¿Qué tipos de sensores utilizan los vehículos autónomos? Seleccione todas las que correspondan.",
        "options": [
          "Cámaras",
          "Radar",
          "Lidar",
          "Sensores de rayos X"
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
        "question": "El vehículo de la Universidad de Stanford llamado Stanley ganó el DARPA Grand Challenge de 2005.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q4",
        "type": "numeric",
        "question": "¿Cuántos millones de millas habían conducido los vehículos de Waymo sin conductores de seguridad para octubre de 2023?",
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
        "question": "¿Cuándo lanzó Waymo el servicio comercial de robotaxi en Phoenix?",
        "options": [
          "Diciembre de 2016",
          "Diciembre de 2018",
          "Diciembre de 2020",
          "Diciembre de 2022"
        ],
        "correctIndex": 1
      },
      {
        "id": "technology-internet-p10-q6",
        "type": "single_choice",
        "question": "¿Cuántos niveles de automatización de la conducción define la Sociedad de Ingenieros de Automoción?",
        "options": [
          "Cuatro",
          "Cinco",
          "Seis",
          "Siete"
        ],
        "correctIndex": 2
      },
      {
        "id": "technology-internet-p10-q7",
        "type": "numeric",
        "question": "¿Cuántas personas mueren anualmente en accidentes de vehículos en todo el mundo (en millones)?",
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
        "question": "El error humano contribuye a más del 90 por ciento de los accidentes de vehículos.",
        "correctAnswer": true
      },
      {
        "id": "technology-internet-p10-q9",
        "type": "single_choice",
        "question": "¿Cuándo aprobó Alemania la legislación que permite los vehículos de nivel 4 en las vías públicas?",
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
        "question": "¿Cuántas millas recorrió el vehículo más lejano en el DARPA Grand Challenge de 2004?",
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
        "question": "¿Cuándo comenzó el desarrollo de la plataforma de conducción autónoma Apollo de Baidu?",
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
        "question": "¿Cuándo fue la exhibición de Futurama en la Feria Mundial?",
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
        "question": "¿Cuántos puntos de datos por segundo pueden generar algunos sistemas lidar (en millones)?",
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
        "question": "¿Cuándo revocó el DMV de California los permisos de vehículos autónomos de Cruise?",
        "options": [
          "Octubre de 2022",
          "Octubre de 2023",
          "Enero de 2023",
          "Junio de 2023"
        ],
        "correctIndex": 1
      }
    ],
    "articleType": "practice",
    "orderIndex": 10
  }
];
