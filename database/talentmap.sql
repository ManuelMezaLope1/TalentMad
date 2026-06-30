-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: talentmap
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `beca`
--

DROP TABLE IF EXISTS `beca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beca` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(500) NOT NULL,
  `duracion` int NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `requisito` varchar(500) NOT NULL,
  `restriccion` varchar(500) NOT NULL,
  `tipo_beca` varchar(255) NOT NULL,
  `url` varchar(3000) NOT NULL,
  `beneficio` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beca`
--

LOCK TABLES `beca` WRITE;
/*!40000 ALTER TABLE `beca` DISABLE KEYS */;
INSERT INTO `beca` VALUES (3,'Está dirigida a los estudiantes del quinto grado de la secundaria o egresados del colegio que cuenten con alto rendimiento académico en los dos últimos grados de la secundaria y se encuentren en condición de pobreza o pobreza extrema, según el Sistema de Focalización de Hogares (Sisfoh), o en condición de vulnerabilidad o en situación especial.',10,'Beca 18','Culminar el nivel secundario, Acreditar alto rendimiento los dos últimos grados, Haber ingresado a una institución de educación superior, Presentar declaraciones juradas y formatos generados por el módulo de postulación para la selección.','Haber cursado o estar cursando estudios superiores, Haber sido adjudicado con otra beca del Estado para el pregrado, Haber renunciado o perdido a una beca gestiona por el Pronabec, Haber falseado la información socioeconómica y/o académica para hacerse acreedor de la beca, Mantener deudas con el Gobierno Peruano, Ser becario o encontrarse postulando a otra beca gestiona por el Pronabec.','Excelencia Académica','https://www.pronabec.gob.pe/beca-18/','Matrícula, Pensión de estudios, Idioma inglés, Obtención de grado y título, Alimentación, Alojamiento, Materiales de estudio, Movilidad local, Computadora portátil, Útiles de escritorio.'),(4,'Beneficio dirigido a estudiantes continuos de Pregrado Regular y Carrera para Gente que Trabaja (CGT) que atraviesan una situación económica familiar imprevista y temporal. La beca consiste en un descuento sobre las pensiones académicas, sujeto a evaluación socioeconómica realizada por la universidad.',10,'Beca Socioeconómica - UTP','Ser estudiante continuo de Pregrado Regular o CGT, Presentar una situación económica familiar que justifique la solicitud del beneficio, Registrar la solicitud a través del portal institucional, Presentar la documentación sustentatoria requerida, Cumplir con los requisitos académicos establecidos en el Reglamento de Becas de la universidad, Completar correctamente el expediente dentro de las fechas establecidas.','No aplica para estudiantes ingresantes, El descuento no cubre el pago de matrícula, El beneficio está sujeto a evaluación y aprobación de la universidad, Los resultados de la evaluación son de carácter inapelable, Para mantener el beneficio es necesario cumplir con los requisitos académicos vigentes, La renovación requiere presentar una nueva solicitud y expediente.','Socioeconómica','https://info.utp.edu.pe/articulo/KA-01958','Descuento en las pensiones de estudio, El porcentaje de descuento puede variar entre el 10 % y el 50 %, según la evaluación realizada, Acompañamiento durante el proceso de evaluación del beneficio.'),(5,'Programa desarrollado en alianza entre la Universidad Peruana de Ciencias Aplicadas y el Patronato BCP, cuyo objetivo es brindar acceso a educación superior de calidad a jóvenes talentosos con limitaciones económicas que estén iniciando sus estudios universitarios.',10,'Programa de Becas Patronato BCP','Tener nacionalidad peruana o residencia permanente en el Perú, Demostrar necesidad económica, Haber culminado la educación secundaria en los años 2022, 2023 o 2024, Acreditar excelencia académica, Aprobar el examen de admisión del Programa Becas BCP, Tener interés en alguna de las carreras financiadas por el programa, Encontrarse en la última categoría de pago asignada a la carrera., Estar iniciando estudios universitarios por primera vez','Solo aplica para estudiantes que inician una carrera universitaria por primera vez, Está dirigida exclusivamente a postulantes de pregrado, Solo financia determinadas carreras incluidas en el programa, Requiere demostrar necesidad económica y excelencia académica, Se debe aprobar el proceso de selección y evaluación del programa.','Socioeconómica','https://www.upc.edu.pe/admision/becas-y-financiamiento/becas-externas-postulantes/#bcp','Cobertura de matrícula y pensiones académicas, Cobertura de costos administrativos para obtención del grado o título profesional, Programa de acompañamiento y tutoría, Programa de desarrollo de talento, Entrega de laptop, Plan de salud'),(6,'Es una beca otorgada por la Universidad César Vallejo (UCV) dirigida a estudiantes que presentan dificultades económicas que podrían afectar la continuidad de sus estudios universitarios. Su finalidad es brindar apoyo financiero para que los estudiantes puedan continuar su formación académica.',10,'Beca por Situación Económica','Ser estudiante de la UCV o cumplir con los requisitos establecidos en la convocatoria, Acreditar una condición socioeconómica vulnerable o precaria, Presentar la documentación solicitada por la universidad para la evaluación socioeconómica, Cumplir con los requisitos académicos y administrativos establecidos por la UCV.','El beneficio está sujeto a una evaluación socioeconómica previa, Puede perderse si el estudiante proporciona información falsa o incumple las normas de la universidad, La beca puede estar sujeta a las condiciones y plazos establecidos en cada convocatoria, No garantiza la cobertura total de los gastos universitarios.','Socioeconómica','https://www.ucv.edu.pe/noticias/becas-para-estudiantes-universitarios','Reducción significativa en los costos de matrícula y pensiones, Apoyo económico que facilita la permanencia del estudiante en la universidad, Mayor acceso a una educación superior de calidad para estudiantes con recursos limitados.'),(7,'La Beca Líderes con Propósito es un programa de la Universidad del Pacífico que busca reconocer a estudiantes con excelencia académica y potencial de liderazgo. Está dirigida a nuevos ingresantes seleccionados mediante las modalidades de Admisión por Excelencia Académica o Admisión Selectiva, brindándoles la oportunidad de acceder a una educación superior de calidad y desarrollar su potencial para contribuir al progreso de la sociedad.',11,'Beca Líderes con Propósito ','Postular a cualquiera de las carreras de pregrado de la Universidad del Pacífico mediante las modalidades de Admisión por Excelencia Académica o Admisión Selectiva, Haber obtenido la condición de seleccionado(a) en el proceso de admisión, Completar el Formulario de Aplicación en línea dentro de las fechas establecidas, Participar y aprobar las etapas de evaluación del concurso de becas (evaluación de conocimientos, aptitudes y entrevista personal).','No cubre cursos desaprobados o retirados, No cubre trámites administrativos por retiro de cursos, No financia cursos extraordinarios, dobles grados ni agregación de carrera, No cubre gastos de pasajes, alojamiento u otros relacionados con intercambios estudiantiles, El estudiante debe mantener un promedio semestral mínimo de 12.5, No debe retirarse del ciclo académico ni recibir sanciones disciplinarias, Debe cumplir con el Compromiso de Honor establecido por la universidad.','Excelencia Académica','https://admision.up.edu.pe/becas/','Cobertura de hasta el 100 % de la matrícula y derechos de enseñanza, Financiamiento de hasta 11 semestres académicos, o 13 semestres para la carrera de Derecho, Posibilidad de contar con un semestre de reserva de matrícula, Acceso a talleres de preparación y éxito universitario, Sesiones de tutoría y acompañamiento académico durante los estudios.'),(8,'La Beca Socioeconómica es un beneficio económico dirigido a estudiantes de Pregrado Regular de la Universidad Científica del Sur. Consiste en el otorgamiento de un porcentaje de descuento sobre el pago de los derechos de enseñanza, con el objetivo de apoyar a estudiantes que requieren ayuda financiera para continuar sus estudios.',1,'Beca Socioeconómica - UCS','Estar ubicado en la escala más baja de pagos, Tener un promedio ponderado histórico igual o superior a 15.00, Ser estudiante regular de pregrado, Encontrarse cursando como mínimo el segundo ciclo de estudios, Cumplir con las disposiciones establecidas en el Reglamento de Condiciones Financieras de la universidad.','No está dirigida a estudiantes de primer ciclo, Solo pueden postular estudiantes que pertenezcan a la escala más baja de pagos, La asignación del beneficio está sujeta a evaluación y disponibilidad, El estudiante debe cumplir con los requisitos académicos y administrativos establecidos por la universidad, Las solicitudes presentadas fuera de las fechas establecidas no son consideradas.','Socioeconómica','https://web.cientifica.edu.pe/cobranzas-y-recuperaciones/beneficios','Descuento parcial en los derechos de enseñanza, Apoyo económico para reducir la carga financiera del estudiante, Facilita la continuidad y permanencia en la educación superior.');
/*!40000 ALTER TABLE `beca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(500) NOT NULL,
  `duracion` int NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `tipo_carrera` varchar(255) NOT NULL,
  `combinacion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (9,'Estudia la creación de software confiable y de calidad, basándose en métodos y técnicas de ingeniería, y brindando soporte operacional y de mantenimiento.',10,'Ingeniería de Software','Ingeniería','IRC, ICR, RIC, CIR, IER'),(10,'Estudia y comprende la realidad, con el enfoque de implementar u optimizar sistemas complejos. Puede también verse como la aplicación tecnológica de la teoría de sistemas a los esfuerzos de la ingeniería, adoptando en todo este trabajo el paradigma sistémico.',10,'Ingeniería de Sistemas','Ingeniería','IRC, ICR, RIC, CIR, RCI'),(11,'Emplea conocimientos de cálculo, mecánica, hidráulica y física para encargarse del diseño, construcción y mantenimiento de las infraestructuras emplazadas en el entorno, incluyendo carreteras, ferrocarriles, puentes, canales, presas, puertos, aeropuertos, diques y otras construcciones relacionadas.',10,'Ingeniería Civil','Ingeniería','RIC, RIE, RCI, IRC, RCE'),(12,'Se ocupa de la optimización de procesos, sistemas u organizaciones complejos mediante el desarrollo, la mejora y la implementación de sistemas integrados de personas (recursos humanos), riqueza, conocimiento, información y equipamiento, energía, materiales y procesos.',10,'Ingeniería Industrial','Ingeniería','RIC, REC, RCE, IRC, ERC'),(14,'Se ocupa de la extracción de los recursos minerales. Esta extracción es mediante técnicas y labores mineras de los recursos minerales. El conocimiento y el uso en la ingeniería de explosivos.',10,'Ingeniería de Minas','Ingeniería','RIE, RIC, RCE, IRC'),(16,'Es el arte y la técnica de proyectar, diseñar y construir, modificando el hábitat humano y considerando criterios de estética, funcionalidad y uso del espacio arquitectónico, espacio urbano o paisa',10,'Arquitectura','Arquitectura','RIA, RAI, AIR, RIC, RAE'),(17,'Estudia los problemas del planeta de forma científica e integrada, teniendo en cuenta sus dimensiones científicas: químicas, físicas, ecológicas, biológicas, geológicas, sociales, económicas y tecnoló',10,'Ingeniería Ambiental','Ingeniería','IRC, RIC, ISC, RSC'),(18,'Trata el estudio y el análisis de la conducta y los procesos mentales de los individuos y de grupos humanos en distintas situaciones.',10,'Psicología','Psicología','ISA, SIA, IES, SEI'),(19,'Profesión cuya actividad consiste en proyectar comunicaciones visuales destinadas a transmitir mensajes específicos a grupos sociales con objetivos determinados.',10,'Diseño Gráfico','Arte y Diseño','AIR, AIE, AEI, IAC, ACI'),(20,'Disciplina que se enfoca en la planificación, organización y control de recursos de una organización, con el objetivo de alcanzar metas de manera eficiente y eficaz dentro de un entorno competitivo.',10,'Administración de Empresas','Administración','ESC, SEC, ECS, EIC, REC'),(21,'Es la ciencia que estudia al ser humano de una forma integral, en sus características físicas como animales y de su cultura.',10,'Antropología','Ciencias Sociales','IAS, ISA, AIS'),(22,'Tratan los asuntos extranjeros y las grandes cuestiones del sistema internacional en materia política, económica, jurídica y diplomática.',10,'Relaciones Internacionales','Negocios','EIS, SEC, IES'),(23,'Es la ciencia social que se encarga del análisis de la sociedad humana o población global.',10,'Sociología','Ciencias Sociales','ISC, SIE, SIC, ISE'),(24,'Dominarás competencias avanzadas en pedagogía infantil, neurociencia del aprendizaje y metodologías innovadoras como el aprendizaje basado en proyectos, capacitándote para diseñar experiencias educativas enriquecedoras que potencien el desarrollo pleno y la felicidad de los niños de 0 a 5 años.',10,'Educación Inicial','Educación','SAI, SAC, ASE, SIA'),(25,'Diseñada para jóvenes con iniciativa, responsabilidad y creatividad que acepten el reto de acompañar en su formación a niños y niñas entre 6 y 12 años de edad, que disfruten del trabajo con ellos, y que sean sensibles a sus necesidades, capaces de generar oportunidades de aprendizaje originales que desarrollen el inmenso potencial de los niños.',10,'Educación Primaria','Educación','SAI, SAC, SIA'),(26,'Forma profesionales con competencias en el diseño, ejecución y evaluación de los procesos de enseñanza aprendizaje, capaces de generar experiencias educativas significativas y respetuosas de los derechos, las características, los intereses y las necesidades de los adolescentes del país en el contexto global.',10,'Educación Secundaria','Educación','SIC, SIE, ISC, SAI'),(27,'Se encarga del análisis del patrimonio y de la situación patrimonial, económica y financiera de una entidad, ya sea una empresa, organización o persona. Su finalidad es proporcionar información estructurada, fiable y relevante que facilite la toma de decisiones internas y el control externo de la gestión.',10,'Contabilidad','Ciencias Económicas','CIE, ECI, ICE, CEI'),(28,'Aporta al desarrollo de nuestro país. Genera nuevos conceptos de productos creados industrialmente para resolver las relaciones de forma–función, así como para optimizar su uso, funcionamiento, producción, sustentabilidad, venta y distribución.',10,'Diseño Industrial','Arte y Diseño','RAI, AIR, RIA, REA'),(29,'Desarrolla una visión integral sobre la creación, difusión y gestión del diseño y de la moda, explorando sus componentes culturales, estratégicos, creativos y comunicativos desde una propuesta de valoración sustantiva del patrimonio peruano de textiles, vestimenta y accesorios.',10,'Arte, Moda y Diseño Textil','Arte y Diseño','RAE, AER, ARE, SEA'),(30,'Forma creadores, productores e investigadores que conocen los procesos que hacen posible el diseño, la realización y sostenibilidad de proyectos de artes escénicas que conecten con el público e impacten en la sociedad.',10,'Creación y Producción Escénica','Artes Escénicas','ASE, RAE'),(31,'Estudia los procesos de producción, distribución y consumo de bienes y servicios en la sociedad. Intenta explicar cómo funcionan los mercados al asignar recursos que los individuos y la sociedad disponen para producir riqueza y alcanzar el bienestar de sus integrantes.',10,'Economía','Ciencias Económicas','IEC, ICE, EIC, CEI'),(32,'Estudia la asignación de capital o inversión entre agentes económicos para atender las necesidades de financiamiento. Estos agentes pueden ser individuos, empresas, otro tipo de entidades o, inclusive Estados.',10,'Finanzas','Ciencias Económicas','IEC, ICE, EIC, CIE'),(33,'Estudia y permite comprender las relaciones de poder en general, y, en particular, el funcionamiento de las instituciones públicas y el proceso de toma de decisiones de Estado y de política pública, en el que intervienen diversos actores políticos y sociales.',10,'Ciencias Políticas','Ciencias Sociales','EIS, IES, SEC, ISC'),(34,'Como ingeniero de telecomunicaciones, te encargarás de planificar, diseñar y de mantener operativa esta infraestructura. También, construirás y configurarás las aplicaciones que permitan su funcionamiento, y determinen los costos y tiempos de operación de un servicio eficaz, seguro y eficiente.',10,'Ingeniería de Telecomunicaciones','Ingeniería','IRC, ICR, RIC, CIR'),(35,'Se encarga de resolver problemas de la ingeniería tales como el control de procesos industriales y de sistemas electrónicos de potencia, instrumentación y control, así como la transformación de electricidad para el funcionamiento de diversos aparatos eléctricos.',10,'Ingeniería Electrónica','Ingeniería','RIC, IRC, RIE, CIR'),(36,'Es la rama de la ingeniería que se dedica a los proyectos de ingeniería relacionados con los procesos, materiales y recursos de la tierra (y los planetas).',10,'Ingeniería Geológica','Ingeniería','RCI'),(37,'Disciplina que estudia y perfecciona diversos principios como la termodinámica, transferencia de calor, mecánica, análisis estructural, trigonometría, teoría de control, etc. Estos principios sirve para el diseño y análisis de diversos elementos usados en la actualidad como maquinaria térmica, hidraúlica, robótica, etc.',10,'Ingeniería Mecánica','Ingeniería','RIE, RIC, IRC, RCE'),(38,'Engloba las ramas de sistemas, electrónica, mecánica y control; ya que tanto sistemas de control como procesos inteligentes con el objetivo de crear maquinaria más compleja para facilitar las actividades del ser humano.',10,'Ingeniería Mecatrónica','Ingeniería','RIE, IRC, RIC, IER'),(39,'Se encarga del estudio, diseño, manutención, evaluación, optimización, simulación, construcción y operación de todo tipo de elementos en la industria de procesos, que es aquella relacionada con la producción industrial de compuestos y productos cuya elaboración requiere de sofisticadas transformaciones físicas y químicas de la materia.',10,'Ingeniería Química','Ingeniería','IRC, RIC, ICR, ISC'),(40,'Es una rama de la ingeniería mecánica aplicada a los vehículos, que incorpora elementos de mecánica, electricidad, electrónica, software e ingeniería de seguridad aplicándolos al diseño, manufactura y operación de motocicletas, automóviles, autobuses y camiones y sus respectivos subsistemas de ingeniería.',10,'Ingeniería Automotriz','Ingeniería','RIE, RIC, RCE'),(41,'Esta ingeniería se dedica principalmente al diseño y construcción de productos sanitarios y tecnologías sanitarias tales como los equipos médicos, las prótesis, dispositivos médicos, dispositivos de diagnóstico (imagenología médica) y de terapia.',10,'Ingeniería Biomédica','Ingeniería','IRE, IRC, ISR, RIC'),(42,'Es el campo de la ingeniería que se ocupa del estudio y la aplicación de la electricidad, electromagnetismo, electromecánica y la electrónica a sistemas eléctricos de potencia.',10,'Ingeniería Eléctrica','Ingeniería','RIC, IRC, RIE, CIR'),(43,'Aplica conocimientos científicos, tecnológicos y empresariales, y que se ocupa de la optimización de uso de recursos humanos, técnicos, informativos así como el manejo y gestión óptimos de los sistemas empresariales.',10,'Ingeniería Empresarial','Ingeniería','EIC, EIR, ESC, REC'),(44,'Es la ciencia de la salud dedicada a la prevención, diagnóstico, pronóstico y tratamiento de las enfermedades, lesiones y problemas de salud de los seres humanos.',14,'Medicina','Medicina','ISR, SIR, IRS, RSI'),(45,'Estudia los patrones, propiedades, estructuras y relaciones presentes en sistemas lógicos y abstractos creados por los humanos, conceptos tales como cantidad, forma, espacio y número se podrían considerar como el objeto de estudio de la matemática.',10,'Matemática','Ciencias Básicas','IRC'),(46,'La estadística se emplea como herramienta metodológica para la recolección, organización, análisis, interpretación y presentación de los datos obtenidos durante la investigación. Este proceso permite extraer conclusiones a partir de muestras y formular inferencias sobre las poblaciones de origen.',10,'Estadística','Ciencias Básicas','IRC'),(47,'Estudia la naturaleza de los componentes y fenómenos más fundamentales del Universo como lo son la energía, la materia, la fuerza, el movimiento, el espacio-tiempo, las magnitudes y propiedades naturales fundamentales y las interacciones fundamentales.',10,'Física','Ciencias Básicas','IRC, RIC'),(48,'Estudia y analiza la composición, estructura y propiedades de la materia, ya sea en forma de elementos, especies, compuestos, mezclas u otras sustancias, así como los cambios que estas experimentan durante las reacciones y su relación con la energía química.',10,'Química','Ciencias Básicas','IRC'),(49,'Representa historias actuadas frente a los espectadores o frente a una cámara usando una combinación de discurso, gestos, escenografía, música, sonido y espectáculo.',10,'Teatro','Artes Escénicas','ARS, ASR, ESA'),(50,'Es un arte donde se utiliza el movimiento del cuerpo, normalmente con música, como una forma de expresión y de interacción social con fines de entretenimiento y artísticos.',10,'Danza','Artes Escénicas','ARS, ASR, AER'),(51,'Es el arte de crear y organizar sonidos y silencios que se combinan para formar melodías, ritmos y armonías en el tiempo mediante la intervención de complejos procesos psicoanímicos.',10,'Música','Artes Escénicas','ASE, RAS'),(52,'Disciplina que se dedica al cuidado y atención de enfermos y heridos, así como a otras tareas de asistencia sanitaria, clínicas y a la promoción de la salud y prevención de la enfermedad.',10,'Enfermería','Ciencias de la Salud','SIR, ISR, RIS, SRC'),(53,'Un químico farmacéutico se encarga de desarrollar productos farmacéuticos, analizar sus efectos en el cuerpo humano y aplicar conocimientos científicos, técnicos y humanísticos.',10,'Farmacia y Bioquímica','Ciencias de la Salud','IRC, ISR, RIC'),(54,'Un nutricionista dietético orienta a las personas en la adopción de una alimentación equilibrada, adaptada a sus necesidades, y en la gestión de problemas de salud vinculados a la dieta.',10,'Nutrición y Dietética','Ciencias de la Salud','SIR, ISR, SIC'),(55,'Se encarga del embarazo, el parto y el puerperio (incluyendo la atención del recién nacido), además de la salud sexual y reproductiva de la mujer a lo largo de toda su vida.',10,'Obstetricia','Ciencias de la Salud','SIR, ISR, SAI'),(56,'Se encarga del diagnóstico, tratamiento y prevención de las enfermedades del aparato estomatognático, el cual incluye además de los dientes, las encías, el tejido periodontal, el maxilar superior, el maxilar inferior y la articulación temporomandibular.',10,'Odontología','Ciencias de la Salud','ISR, SIR, RIC'),(57,'Ofrece tratamiento y rehabilitación física para diagnosticar, prevenir y tratar síntomas de múltiples patologías, tanto agudas como crónicas, por medio de ejercicios terapéuticos[2] y agentes físicos como la electricidad, ultrasonido, láser, calor, frío, agua y técnicas manuales como estiramientos, tracciones y masoterapia.',10,'Terapia Física','Ciencias de la Salud','RSC, SIR, RSR'),(58,'Se enfoca en la protección de la infraestructura computacional y todo lo vinculado con la misma, y especialmente la información contenida en una computadora o circulante a través de las redes de computadoras.',10,'Ciberseguridad','Computación','RIC'),(59,'Utiliza matemáticas, estadística, computación científica, método científico, procesos ingenieriles y algoritmos para obtener (recolectar o extraer), tratar, analizar y presentar informes a partir de datos ruidosos, estructurados y no estructurados.',10,'Ciencia de Datos','Computación',''),(60,'En informática, los sistemas de información ayudan a administrar, recolectar, recuperar, procesar, almacenar y distribuir información relevante para los procesos fundamentales y las particularidades de cada organización.',10,'Sistemas de Información','Computación','RIC'),(61,'Son un conjunto de ciencias formales que estudian los fundamentos teóricos de la información y de la computación, así como sus aplicaciones prácticas en los sistemas de información y en los sistemas informáticos.',10,'Ciencias de la Computación','Computación','IRC'),(62,'Analizan, estudian y discuten los fenómenos relacionados con la información y el efecto de la acción de la comunicación humana. Se encargan de observar y examinar los medios de difusión masivos (desde su legislación, hasta la producción y recepción de los contenidos), las industrias culturales, el consumo y el conjunto semiótico que estos construyen.',10,'Ciencias de la Comunicación','Comunicaciones','AES, EAS, SAC, IAE'),(63,'Un comunicador audiovisual planifica, estructura y realiza productos desde una perspectiva creativa, estética y tecnológica, y los expresa a través de imágenes y sonidos. Para tal fin, integra el uso de los lenguajes audiovisuales, la apreciación estética y el conocimiento de las estructuras narrativas.',10,'Comunicación Audiovisual','Comunicaciones','AER, EAS, AIR, ASE'),(64,'Un publicista se ocupa del diseño y aplicación de estrategias de comunicación basadas en la filosofía de la organización y en el estudio de los públicos y de sus mercados. De esta forma, otorga mayor credibilidad a las marcas y confiabilidad a sus productos, y eleva su valor, lo que promueve su venta y estimula el cambio de los hábitos de consumo.',10,'Publicidad','Comunicaciones','EIA, ASE, AIE, EAS'),(65,'Es una actividad profesional que consiste en la obtención, investigación, tratamiento, difusión y análisis de la información, a través de los medios de comunicación social como la prensa, la radio, la televisión, el Internet, entre otros.',10,'Periodismo','Comunicaciones','IAS, IAC, ISA'),(66,'Un abogado se encarga de dar asesoramiento jurídico, representar legalmente a sus clientes y defiende sus derechos e intereses en los tribunales.',10,'Derecho','Derecho','ESC, SEC, EIS, ICS'),(67,'La gastronomía además de estudiar el cómo las personas están conectadas en cuanto a su nutrición, también estudia su procedencia. Esto quiere decir que se estudian factores como las costumbres, el lugar, credo religioso e historia, estos cuatro componentes son también los objetos de estudios que la gastronomía utiliza para estudiar a fondo su procedencia.',10,'Gastronomía','Gastronomía, Hotelería y Turismo','RSE, RES, AER, SER'),(68,'Es el nombre genérico de las actividades económicas consistentes en la prestación de servicios ligados al alojamiento, hospitalidad y la alimentación esporádicos, muy usualmente ligados al turismo.',10,'Hotelería','Gastronomía, Hotelería y Turismo','RES, RSE, ESC'),(69,'Podrás ser un profesional con un alto sentido ético que es capaz de relacionarse óptimamente con el entorno. De esta forma, tu relación con el mismo se dará mediante la gestión de proyectos y de destinos turísticos, así como de experiencias innovadoras para cada tipo de turista.',10,'Turismo','Gastronomía, Hotelería y Turismo','SEA, ESA, ASE'),(70,'La carrera de Gestión se centra en la creación de valor para todo tipo de organizaciones, brindando soluciones y aprovechando oportunidades. Prepara a sus estudiantes para innovar y lograr objetivos organizacionales considerando el desarrollo, la ética y la sostenibilidad.',10,'Gestión','Gestión y Alta Dirección','SCE'),(71,'Podrás tener una reflexión propia y creativa con respecto a tu realidad y podrás convertirte en un investigador que cuestiona los presupuestos sobre los cuales se fundan nuestras creencias y acciones.',10,'Filosofía','Letras y Ciencias Humanas','IAC, IAS, ISA, ISC'),(72,'Es una ciencia que estudia, reconstruye y analiza los procesos históricos de las sociedades a través del tiempo, para poder comprender el presente con una visión de futuro. Su estudio forma la conciencia histórica de los ciudadanos.',10,'Historia','Letras y Ciencias Humanas','IAC, IAS, ISC'),(73,'Estudian los aspectos esenciales de la existencia humana, incluyendo la cultura, la sociedad, el pensamiento, el arte, la historia, la literatura, la filosofía y otros ámbitos característicos de la vida y expresión humana.',10,'Humanidades','Letras y Ciencias Humanas','IAS, ISA, IAC'),(74,'La lingüística se interesa por analizar la estructura del lenguaje, estudiar su evolución histórica, y observar las relaciones entre el lenguaje y la sociedad.',10,'Lingüística','Letras y Ciencias Humanas','IAS, ISA, IAC'),(75,'La literatura se interesa por los mecanismos creativos que permiten el uso de la lengua con una finalidad estética, la formación de tradiciones discursivas y el lugar social de la obra literaria.',10,'Literatura','Letras y Ciencias Humanas','IAC, IAS, ISA'),(76,'Se encarga de mejorar la visibilidad de una empresa, atraer nuevos clientes, fidelizar a los existentes y aumentar las ventas.',10,'Administración y Marketing','Administración','EIA, ASE, ESA, EIC');
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera_beca`
--

DROP TABLE IF EXISTS `carrera_beca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera_beca` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `beca_id` bigint DEFAULT NULL,
  `carrera_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKje3opseuhav9nfeqe37o19mgr` (`beca_id`),
  KEY `FKhjstpgvstrl9dht5qi89hlnra` (`carrera_id`),
  CONSTRAINT `FKhjstpgvstrl9dht5qi89hlnra` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`),
  CONSTRAINT `FKje3opseuhav9nfeqe37o19mgr` FOREIGN KEY (`beca_id`) REFERENCES `beca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera_beca`
--

LOCK TABLES `carrera_beca` WRITE;
/*!40000 ALTER TABLE `carrera_beca` DISABLE KEYS */;
INSERT INTO `carrera_beca` VALUES (4,3,12),(7,3,20),(8,5,20),(9,5,32),(10,5,76),(11,5,61),(12,5,27),(13,5,28),(14,5,31),(15,5,68),(16,5,17),(17,5,41),(18,5,11),(19,5,10),(20,5,35),(21,5,12),(22,5,38),(23,5,43),(24,5,9),(25,5,69);
/*!40000 ALTER TABLE `carrera_beca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_preguntas`
--

DROP TABLE IF EXISTS `categoria_preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_preguntas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_preguntas`
--

LOCK TABLES `categoria_preguntas` WRITE;
/*!40000 ALTER TABLE `categoria_preguntas` DISABLE KEYS */;
INSERT INTO `categoria_preguntas` VALUES (13,'Realista'),(14,'Investigador'),(15,'Artístico'),(16,'Social'),(17,'Emprendedor'),(18,'Convencional');
/*!40000 ALTER TABLE `categoria_preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Amazonas'),(2,'Áncash'),(3,'Apurímac'),(4,'Arequipa'),(5,'Ayacucho'),(6,'Cajamarca'),(7,'Cusco'),(8,'Huancavelica'),(9,'Huánuco'),(10,'Ica'),(11,'Junín'),(12,'La Libertad'),(13,'Lambayeque'),(14,'Lima'),(15,'Loreto'),(16,'Madre de Dios'),(17,'Moquegua'),(18,'Pasco'),(19,'Piura'),(20,'Puno'),(21,'San Martín'),(22,'Tacna'),(23,'Tumbes'),(24,'Ucayali');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultad`
--

DROP TABLE IF EXISTS `facultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (2,'Ingeniería'),(3,'Arte y Diseño'),(4,'Artes Escénicas'),(5,'Ciencias Económicas'),(6,'Ciencias Sociales'),(7,'Educación'),(8,'Derecho'),(9,'Gastronomía, Hotelería y Turismo'),(10,'Letras y Ciencias Humanas'),(11,'Psicología'),(12,'Negocios'),(13,'Ciencias de la Salud'),(14,'Comunicaciones'),(15,'Medicina'),(16,'Administración'),(17,'Ciencias Agrarias y Ambientales'),(18,'Computación'),(19,'Arquitectura y Urbanismo');
/*!40000 ALTER TABLE `facultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `carreras` varchar(1000) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `puntaje_artistico` varchar(255) NOT NULL,
  `puntaje_convencional` varchar(255) NOT NULL,
  `puntaje_emprendedor` varchar(255) NOT NULL,
  `puntaje_investigador` varchar(255) NOT NULL,
  `puntaje_realista` varchar(255) NOT NULL,
  `puntaje_social` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbvhkf7khj43q0xgb81phbbyfi` (`usuario_id`),
  CONSTRAINT `FKbvhkf7khj43q0xgb81phbbyfi` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
INSERT INTO `historial` VALUES (1,'Publicidad, Administración y Marketing','EIA','5/6/2026, 23:51:01','nombre.apellido@gmail.com',8,'','','','','',''),(2,'Publicidad, Administración y Marketing','EIA','5/6/2026, 23:52:08','nombre.apellido@gmail.com',8,'','','','','',''),(3,'Antropología, Periodismo, Filosofía, Historia, Humanidades, Lingüística, Literatura','IAS','6/6/2026, 15:32:30','nombre.apellido@gmail.com',8,'30','22','29','30','27','30'),(4,'Ingeniería de Software, Ingeniería de Sistemas, Ingeniería Civil, Ingeniería Industrial, Ingeniería de Minas, Arquitectura, Ingeniería Ambiental, Ingeniería de Telecomunicaciones, Ingeniería Electrónica, Ingeniería Mecánica, Ingeniería Mecatrónica, Ingeniería Química, Ingeniería Automotriz, Ingeniería Biomédica, Ingeniería Eléctrica, Física, Farmacia y Bioquímica, Odontología, Ciberseguridad, Sistemas de Información','RIC','6/6/2026, 21:10:02','nombre.apellido@gmail.com',8,'10','50','13','50','50','15'),(5,'Ingeniería de Software, Ingeniería de Sistemas, Ingeniería Civil, Ingeniería Industrial, Ingeniería de Minas, Arquitectura, Ingeniería Ambiental, Ingeniería de Telecomunicaciones, Ingeniería Electrónica, Ingeniería Mecánica, Ingeniería Mecatrónica, Ingeniería Química, Ingeniería Automotriz, Ingeniería Biomédica, Ingeniería Eléctrica, Física, Farmacia y Bioquímica, Odontología, Ciberseguridad, Sistemas de Información','RIC','23/6/2026, 00:47:59','nombre.apellido@gmail.com',8,'10','50','14','50','50','10');
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelinteres`
--

DROP TABLE IF EXISTS `nivelinteres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivelinteres` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelinteres`
--

LOCK TABLES `nivelinteres` WRITE;
/*!40000 ALTER TABLE `nivelinteres` DISABLE KEYS */;
INSERT INTO `nivelinteres` VALUES (1,'Estudiante de Secundaria'),(2,'Estudiante Universitario'),(3,'Cambio de Carrera');
/*!40000 ALTER TABLE `nivelinteres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `preguntas` varchar(200) NOT NULL,
  `categoria_preguntas_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKh70h3q758xfjrdputoxv2ek54` (`categoria_preguntas_id`),
  CONSTRAINT `FKh70h3q758xfjrdputoxv2ek54` FOREIGN KEY (`categoria_preguntas_id`) REFERENCES `categoria_preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (181,'Construir muebles de cocina.',13),(182,'Colocar ladrillos o mayólicas en una construcción.',13),(183,'Reparar electrodomésticos.',13),(184,'Trabajar en la crianza de peces.',13),(185,'Ensamblar componentes electrónicos.',13),(186,'Conducir un camión para repartir paquetes.',13),(187,'Revisar la calidad de productos antes de enviarlos.',13),(188,'Reparar e instalar cerraduras.',13),(189,'Operar máquinas para fabricar productos.',13),(190,'Participar en labores de control de incendios forestales.',13),(191,'Desarrollar un nuevo medicamento.',14),(192,'Investigar formas de reducir la contaminación del agua.',14),(193,'Realizar experimentos químicos.',14),(194,'Estudiar el movimiento de los planetas.',14),(195,'Analizar muestras de sangre con un microscopio.',14),(196,'Investigar las causas de un incendio.',14),(197,'Desarrollar métodos para mejorar la predicción del clima.',14),(198,'Trabajar en un laboratorio de biología.',14),(199,'Crear un sustituto del azúcar mediante investigación científica.',14),(200,'Realizar pruebas de laboratorio para identificar enfermedades.',14),(201,'Escribir libros o obras de teatro.',15),(202,'Tocar un instrumento musical.',15),(203,'Componer o arreglar música.',15),(204,'Dibujar o ilustrar.',15),(205,'Crear efectos especiales para películas.',15),(206,'Diseñar y pintar escenografías para obras teatrales.',15),(207,'Escribir guiones para cine o televisión.',15),(208,'Practicar danza artística.',15),(209,'Cantar en una banda o agrupación musical.',15),(210,'Editar producciones audiovisuales.',15),(211,'Enseñar una rutina de ejercicios a una persona.',16),(212,'Ayudar a personas con problemas personales o emocionales.',16),(213,'Brindar orientación vocacional o profesional.',16),(214,'Realizar terapias de rehabilitación.',16),(215,'Participar como voluntario en una organización sin fines de lucro.',16),(216,'Enseñar deportes a niños y adolescentes.',16),(217,'Enseñar lengua de señas a personas con discapacidad auditiva.',16),(218,'Apoyar en sesiones de terapia grupal.',16),(219,'Cuidar niños en un centro de atención infantil.',16),(220,'Dictar clases en una institución educativa de nivel secundario.',16),(221,'Comprar y vender acciones o inversiones financieras.',17),(222,'Administrar una tienda.',17),(223,'Dirigir un salón de belleza o barbería.',17),(224,'Gestionar un área dentro de una gran empresa.',17),(225,'Crear tu propio negocio.',17),(226,'Negociar contratos comerciales.',17),(227,'Representar a un cliente en un proceso legal.',17),(228,'Promocionar una nueva línea de ropa.',17),(229,'Vender productos en una tienda por departamentos.',17),(230,'Administrar una tienda de ropa.',17),(231,'Crear hojas de cálculo utilizando software informático.',18),(232,'Revisar documentos y registros para detectar errores.',18),(233,'Instalar software en varias computadoras de una red.',18),(234,'Utilizar una calculadora para realizar operaciones.',18),(235,'Llevar registros de inventario y control de productos.',18),(236,'Calcular pagos o remuneraciones de trabajadores.',18),(237,'Registrar y controlar suministros utilizando herramientas digitales.',18),(238,'Registrar pagos de alquiler u otros ingresos.',18),(239,'Mantener registros de envíos y recepciones.',18),(240,'Clasificar, sellar y distribuir correspondencia dentro de una organización.',18);
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_universidad`
--

DROP TABLE IF EXISTS `tipo_universidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_universidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_universidad`
--

LOCK TABLES `tipo_universidad` WRITE;
/*!40000 ALTER TABLE `tipo_universidad` DISABLE KEYS */;
INSERT INTO `tipo_universidad` VALUES (1,'Pública'),(2,'Privada');
/*!40000 ALTER TABLE `tipo_universidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad`
--

DROP TABLE IF EXISTS `universidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `tipo_universidad_id` bigint DEFAULT NULL,
  `departamento_id` bigint DEFAULT NULL,
  `costo_mensual_maximo` double NOT NULL,
  `costo_mensual_minimo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdq8nfo46umbxllprguoanxvj0` (`tipo_universidad_id`),
  KEY `FK7kaq5r4lt5l1s6nsgi269ri9t` (`departamento_id`),
  CONSTRAINT `FK7kaq5r4lt5l1s6nsgi269ri9t` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`id`),
  CONSTRAINT `FKdq8nfo46umbxllprguoanxvj0` FOREIGN KEY (`tipo_universidad_id`) REFERENCES `tipo_universidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad`
--

LOCK TABLES `universidad` WRITE;
/*!40000 ALTER TABLE `universidad` DISABLE KEYS */;
INSERT INTO `universidad` VALUES (8,'Pontificia Universidad Católica del Perú - Sede Lima',2,14,4653,1218),(9,'Universidad Andina del Cusco - Sede Cusco',2,7,2790,464),(10,'Universidad Antonio Ruiz de Montoya - Sede Lima',2,14,3591,1210),(11,'Universidad Católica de Trujillo - Sede Trujillo',2,12,450,250),(12,'Universidad Católica de San Pablo - Campus San Lázaro',2,4,3864,1257),(13,'Universidad Católica Sedes Sapientiae - Filial Atalaya',2,24,650,400),(14,'Universidad Católica Sedes Sapientiae - Filial Morropón',2,19,650,400),(15,'Universidad Católica Sedes Sapientiae - Filial Huaura',2,14,650,400),(16,'Universidad Católica Sedes Sapientiae - Filial Rioja',2,21,650,400),(17,'Universidad Católica Sedes Sapientiae - Filial Tarma',2,11,650,400),(18,'Universidad César Vallejo - Sede Trujillo',2,12,2000,450),(19,'Universidad César Vallejo - Sede Los Olivos',2,14,2000,450),(20,'Universidad César Vallejo - Sede Piura',2,19,2000,450),(22,'Universidad César Vallejo - Sede Chimbote',2,2,2000,450),(23,'Universidad César Vallejo - Sede Tarapoto',2,21,2000,450),(24,'Universidad Científica del Sur - Campus Villa',2,14,4500,1050),(25,'Universidad Continental - Campus Huancayo',2,11,9720,2340),(26,'Universidad Continental - Campus Los Olivos',2,14,9720,2340),(27,'Universidad Continental - Campus Arequipa',2,4,9720,2340),(28,'Universidad Continental - Campus Cusco',2,7,9720,2340),(29,'Universidad Continental - Campus Ica',2,10,9720,2340),(30,'Universidad Continental - Campus Ayacucho',2,5,9720,2340),(31,'Universidad de Ingeniería y Tecnología - Sede Lima',2,14,4500,2200),(32,'Universidad de Lima - Sede Lima',2,14,3916,1840),(33,'Universidad de Piura - Sede Piura',2,19,3000,1400),(34,'Universidad de San Martín de Porres - Sede Lima',2,14,3200,1140),(35,'Universidad de San Martín de Porres - Sede Chiclayo',2,13,3200,1140),(36,'Universidad de San Martín de Porres - Sede Arequipa',2,4,3200,1140),(37,'Universidad Esan - Sede Surco',2,14,3400,1725),(38,'Universidad Peruana Cayetano Heredia - Campus San Martín',2,14,6200,1400),(39,'Universidad Peruana de Ciencias Aplicadas - Campus Monterico',2,14,6594,1019),(40,'Universidad Peruana Los Andes - Sede Huancayo',2,11,2050,450),(41,'Universidad Privada Antenor Orrego - Campus Trujillo',2,12,1840,420),(42,'Universidad Privada Antenor Orrego - Campus Piura',2,19,1840,420),(43,'Universidad Privada de Tacna - Sede Tacna',2,22,2188.7,387.65),(44,'Universidad Privada del Norte - Sede Ate',2,14,819,443),(45,'Universidad Privada del Norte - Sede Cajamarca',2,6,819,443),(46,'Universidad Privada del Norte - Sede Trujillo El Molino',2,12,819,443),(47,'Universidad Privada San Ignacio de Loyola - Campus La Molina',2,14,3000,1421),(48,'Universidad Tecnológica del Perú - Sede Centro',2,14,850,450),(49,'Universidad Tecnológica del Perú - Sede Trujillo',2,12,850,450),(50,'Universidad Tecnológica del Perú - Sede Iquitos',2,15,850,450),(51,'Universidad Tecnológica del Perú - Sede Tacna',2,22,850,450),(52,'Universidad Tecnológica del Perú - Sede Pucallpa',2,24,850,450),(53,'Universidad Tecnológica del Perú - Sede Arequipa',2,4,850,450),(54,'Universidad Tecnológica del Perú - Sede Chiclayo',2,13,850,450),(55,'Universidad Tecnológica del Perú - Sede Áncash',2,2,850,450),(56,'Universidad Tecnológica del Perú - Sede Piura',2,19,850,450),(57,'Universidad Tecnológica del Perú - Sede Huancayo',2,11,850,450),(58,'Universidad Tecnológica del Perú - Sede Ica',2,10,850,450),(59,'Universidad Tecnológica del Perú -  Sede SJL',2,14,850,450),(60,'Universidad Tecnológica del Perú - Sede Norte',2,14,850,450),(61,'Universidad Tecnológica del Perú - Sede Sur',2,14,850,450),(62,'Universidad Tecnológica del Perú - Sede Ate',2,14,850,450),(63,'Universidad César Vallejo - Sede Callao',2,14,2000,450),(64,'Universidad César Vallejo - Sede Huaraz',2,2,2000,450),(65,'Universidad César Vallejo - Sede Chiclayo',2,13,2000,450),(66,'Universidad César Vallejo - Sede SJL',2,14,2000,450),(67,'Universidad César Vallejo - Sede Ate',2,14,2000,450),(68,'Universidad César Vallejo - Sede Moyobamba',2,21,2000,450),(69,'Universidad César Vallejo - Sede Chepén',2,12,2000,450),(70,'Universidad Católica de San Pablo - Campus Sucre',2,4,3864,1257),(71,'Universidad Continental - Campus Miraflores',2,14,9720,2340),(72,'Universidad de San Martín de Porres - Sede Santa Anita',2,14,3200,1140),(73,'Universidad de San Martín de Porres - Sede Comas',2,14,3200,1140),(74,'Universidad Privada del Norte - Sede Trujillo San Isidro',2,12,819,443),(75,'Universidad Privada del Norte - Sede Chorrillos',2,14,819,443),(76,'Universidad Privada del Norte - Sede Los Olivos',2,14,819,443),(77,'Universidad Privada del Norte - Sede SJL',2,14,819,443),(78,'Universidad Privada del Norte - Sede Comas',2,14,819,443),(79,'Universidad Privada del Norte - Sede Breña',2,14,819,443),(80,'Universidad Privada del Norte - Sede Sur',2,14,819,443),(81,'Universidad Peruana Los Andes - Sede Chanchamayo',2,11,2050,450),(82,'Universidad Científica del Sur - Campus Norte',2,14,4500,1050),(83,'Universidad Científica del Sur - Campus Ate',2,14,4500,1050),(84,'Universidad Científica del Sur - Campus Aramburú',2,14,4500,1050),(85,'Universidad Peruana Cayetano Heredia - Campus La Molina',2,14,6200,1400),(86,'Universidad Peruana Cayetano Heredia - Sede Miraflores',2,14,6200,1400),(87,'Universidad Peruana Cayetano Heredia - Sede San Isidro',2,14,6200,1400),(88,'Universidad Peruana de Ciencias Aplicadas - Campus Villa',2,14,6594,1019),(89,'Universidad Peruana de Ciencias Aplicadas - Campus San Isdro',2,14,6594,1019),(90,'Universidad Peruana de Ciencias Aplicadas - Campus San Migul',2,14,6594,1019),(91,'Universidad Privada San Ignacio de Loyola - Campus Norte',2,14,3000,1421),(92,'Universidad Privada San Ignacio de Loyola - Campus Magdalena',2,14,3000,1421),(93,'Universidad Privada San Ignacio de Loyola - Campus Pachcamác',2,14,3000,1421),(94,'Universidad Católica Sedes Sapientiae - Sede Lima',2,14,650,400),(95,'Universidad de Piura - Sede Lima',1,14,3000,1400),(96,'Universidad del Pacífico - Sede Jesús Maria',2,14,5593,1216);
/*!40000 ALTER TABLE `universidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad_beca`
--

DROP TABLE IF EXISTS `universidad_beca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad_beca` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `beca_id` bigint DEFAULT NULL,
  `universidad_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9t8wuqj3709ifsodja81wmvlv` (`beca_id`),
  KEY `FKp866ga5jxvh2yyb94y962esx3` (`universidad_id`),
  CONSTRAINT `FK9t8wuqj3709ifsodja81wmvlv` FOREIGN KEY (`beca_id`) REFERENCES `beca` (`id`),
  CONSTRAINT `FKp866ga5jxvh2yyb94y962esx3` FOREIGN KEY (`universidad_id`) REFERENCES `universidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad_beca`
--

LOCK TABLES `universidad_beca` WRITE;
/*!40000 ALTER TABLE `universidad_beca` DISABLE KEYS */;
INSERT INTO `universidad_beca` VALUES (1,4,59),(2,4,48),(3,4,49),(4,4,50),(5,4,51),(6,4,52),(7,4,53),(8,4,54),(9,4,55),(10,4,56),(11,4,57),(12,4,58),(13,4,60),(14,4,61),(15,4,62),(16,5,39),(17,5,88),(18,5,89),(19,5,90),(20,6,18),(21,6,18),(22,6,19),(23,6,22),(24,6,23),(25,6,63),(26,6,64),(27,6,65),(28,6,66),(29,6,67),(30,6,68),(31,6,69),(32,8,24),(33,8,82),(34,8,83),(35,8,84),(36,7,96);
/*!40000 ALTER TABLE `universidad_beca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad_carrera`
--

DROP TABLE IF EXISTS `universidad_carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad_carrera` (
  `carrera_id` bigint NOT NULL,
  `universidad_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKow4elwu6cluehieqogmrauydt` (`universidad_id`),
  KEY `FKqtvw613k8bfbjbi16vxlki1he` (`carrera_id`),
  CONSTRAINT `FKow4elwu6cluehieqogmrauydt` FOREIGN KEY (`universidad_id`) REFERENCES `universidad` (`id`),
  CONSTRAINT `FKqtvw613k8bfbjbi16vxlki1he` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5681 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad_carrera`
--

LOCK TABLES `universidad_carrera` WRITE;
/*!40000 ALTER TABLE `universidad_carrera` DISABLE KEYS */;
INSERT INTO `universidad_carrera` VALUES (36,8,23),(45,8,28),(46,8,29),(48,8,31),(70,8,42),(70,11,83),(61,12,103),(59,12,104),(70,94,157),(70,18,181),(58,18,187),(59,18,188),(70,19,210),(58,19,216),(59,19,217),(70,20,239),(58,20,245),(59,20,246),(70,22,268),(58,22,274),(59,22,275),(70,23,297),(58,23,303),(59,23,304),(70,64,326),(58,64,332),(59,64,333),(70,63,355),(58,63,361),(59,63,362),(70,65,384),(58,65,390),(59,65,391),(70,66,413),(58,66,419),(59,66,420),(70,67,442),(58,67,448),(59,67,449),(70,68,471),(58,68,477),(59,68,478),(70,69,500),(58,69,506),(59,69,507),(58,24,531),(59,24,539),(60,24,540),(58,82,566),(59,82,574),(60,82,575),(58,83,601),(59,83,609),(60,83,610),(58,84,636),(59,84,644),(60,84,645),(70,25,658),(70,26,683),(70,27,708),(70,28,733),(70,29,758),(70,30,783),(70,71,808),(60,31,831),(59,31,832),(61,31,833),(58,31,834),(70,34,886),(58,34,899),(59,34,900),(70,35,910),(58,35,923),(59,35,924),(70,36,934),(58,36,947),(59,36,948),(70,72,958),(58,72,971),(59,72,972),(70,73,982),(58,73,995),(59,73,996),(59,37,1012),(70,38,1021),(48,38,1027),(70,85,1034),(48,85,1040),(70,86,1047),(48,86,1053),(70,87,1060),(48,87,1066),(59,39,1089),(58,39,1093),(61,39,1095),(59,88,1129),(58,88,1133),(61,88,1135),(59,89,1169),(58,89,1173),(61,89,1175),(59,90,1209),(58,90,1213),(61,90,1215),(70,81,1233),(70,40,1243),(70,74,1305),(70,75,1335),(70,76,1365),(70,77,1395),(70,78,1425),(70,79,1455),(70,80,1485),(70,44,1515),(70,45,1545),(70,46,1575),(70,47,1605),(58,47,1626),(59,47,1631),(70,91,1634),(58,91,1655),(59,91,1660),(70,92,1663),(58,92,1684),(59,92,1689),(70,93,1692),(58,93,1713),(59,93,1718),(61,70,2188),(59,70,2189),(47,8,2994),(47,31,2995),(51,8,3303),(51,34,3304),(51,35,3305),(51,36,3306),(51,72,3307),(51,73,3308),(51,39,3309),(51,88,3310),(51,89,3311),(51,90,3312),(51,47,3313),(51,91,3314),(51,92,3315),(51,93,3316),(30,8,3435),(30,24,3436),(30,82,3437),(30,83,3438),(30,84,3439),(30,39,3440),(30,88,3441),(30,89,3442),(30,90,3443),(10,9,3588),(10,11,3589),(10,17,3590),(10,16,3591),(10,94,3592),(10,18,3593),(10,19,3594),(10,20,3595),(10,22,3596),(10,23,3597),(10,64,3598),(10,63,3599),(10,65,3600),(10,66,3601),(10,67,3602),(10,68,3603),(10,69,3604),(10,24,3605),(10,82,3606),(10,83,3607),(10,84,3608),(10,25,3609),(10,26,3610),(10,27,3611),(10,28,3612),(10,29,3613),(10,30,3614),(10,71,3615),(10,32,3616),(10,33,3617),(10,95,3618),(10,34,3619),(10,35,3620),(10,36,3621),(10,72,3622),(10,73,3623),(10,37,3624),(10,39,3625),(10,88,3626),(10,89,3627),(10,90,3628),(10,40,3629),(10,41,3630),(10,43,3631),(10,74,3632),(10,75,3633),(10,76,3634),(10,77,3635),(10,78,3636),(10,79,3637),(10,80,3638),(10,44,3639),(10,45,3640),(10,46,3641),(10,47,3642),(10,91,3643),(10,92,3644),(10,93,3645),(10,48,3646),(10,49,3647),(10,50,3648),(10,51,3649),(10,52,3650),(10,53,3651),(10,54,3652),(10,55,3653),(10,56,3654),(10,57,3655),(10,58,3656),(10,59,3657),(10,60,3658),(10,61,3659),(10,62,3660),(9,24,3661),(9,82,3662),(9,83,3663),(9,84,3664),(9,33,3665),(9,37,3666),(9,39,3667),(9,88,3668),(9,89,3669),(9,90,3670),(9,74,3671),(9,75,3672),(9,76,3673),(9,77,3674),(9,78,3675),(9,79,3676),(9,80,3677),(9,44,3678),(9,45,3679),(9,46,3680),(9,47,3681),(9,91,3682),(9,92,3683),(9,93,3684),(9,48,3685),(9,49,3686),(9,50,3687),(9,51,3688),(9,52,3689),(9,53,3690),(9,54,3691),(9,55,3692),(9,56,3693),(9,57,3694),(9,58,3695),(9,59,3696),(9,60,3697),(9,61,3698),(9,62,3699),(11,8,3700),(11,9,3701),(11,11,3702),(11,12,3703),(11,17,3704),(11,16,3705),(11,14,3706),(11,94,3707),(11,18,3708),(11,19,3709),(11,20,3710),(11,22,3711),(11,23,3712),(11,64,3713),(11,63,3714),(11,65,3715),(11,66,3716),(11,67,3717),(11,68,3718),(11,69,3719),(11,24,3720),(11,82,3721),(11,83,3722),(11,84,3723),(11,25,3724),(11,26,3725),(11,27,3726),(11,28,3727),(11,29,3728),(11,30,3729),(11,71,3730),(11,31,3731),(11,32,3732),(11,33,3733),(11,34,3734),(11,35,3735),(11,36,3736),(11,72,3737),(11,73,3738),(11,39,3739),(11,88,3740),(11,89,3741),(11,90,3742),(11,81,3743),(11,40,3744),(11,41,3745),(11,42,3746),(11,43,3747),(11,74,3748),(11,75,3749),(11,76,3750),(11,77,3751),(11,78,3752),(11,79,3753),(11,80,3754),(11,44,3755),(11,45,3756),(11,46,3757),(11,47,3758),(11,91,3759),(11,92,3760),(11,93,3761),(11,48,3762),(11,49,3763),(11,50,3764),(11,51,3765),(11,52,3766),(11,53,3767),(11,54,3768),(11,55,3769),(11,56,3770),(11,57,3771),(11,58,3772),(11,59,3773),(11,60,3774),(11,61,3775),(11,62,3776),(11,70,3777),(12,8,3778),(12,9,3779),(12,10,3780),(12,11,3781),(12,12,3782),(12,17,3783),(12,94,3784),(12,18,3785),(12,19,3786),(12,20,3787),(12,22,3788),(12,23,3789),(12,64,3790),(12,63,3791),(12,65,3792),(12,66,3793),(12,67,3794),(12,68,3795),(12,69,3796),(12,24,3797),(12,82,3798),(12,83,3799),(12,84,3800),(12,25,3801),(12,26,3802),(12,27,3803),(12,28,3804),(12,29,3805),(12,30,3806),(12,71,3807),(12,31,3808),(12,32,3809),(12,33,3810),(12,95,3811),(12,34,3812),(12,35,3813),(12,36,3814),(12,72,3815),(12,73,3816),(12,37,3817),(12,38,3818),(12,85,3819),(12,86,3820),(12,87,3821),(12,39,3822),(12,88,3823),(12,89,3824),(12,90,3825),(12,40,3826),(12,41,3827),(12,42,3828),(12,43,3829),(12,74,3830),(12,75,3831),(12,76,3832),(12,77,3833),(12,78,3834),(12,79,3835),(12,80,3836),(12,44,3837),(12,45,3838),(12,46,3839),(12,47,3840),(12,91,3841),(12,92,3842),(12,93,3843),(12,48,3844),(12,49,3845),(12,50,3846),(12,51,3847),(12,52,3848),(12,53,3849),(12,54,3850),(12,55,3851),(12,56,3852),(12,57,3853),(12,58,3854),(12,59,3855),(12,60,3856),(12,61,3857),(12,62,3858),(12,70,3859),(14,8,3860),(14,11,3861),(14,18,3862),(14,19,3863),(14,20,3864),(14,22,3865),(14,23,3866),(14,64,3867),(14,63,3868),(14,65,3869),(14,66,3870),(14,67,3871),(14,68,3872),(14,69,3873),(14,24,3874),(14,82,3875),(14,83,3876),(14,84,3877),(14,25,3878),(14,26,3879),(14,27,3880),(14,28,3881),(14,29,3882),(14,30,3883),(14,71,3884),(14,74,3885),(14,75,3886),(14,76,3887),(14,77,3888),(14,78,3889),(14,79,3890),(14,80,3891),(14,44,3892),(14,45,3893),(14,46,3894),(14,48,3895),(14,49,3896),(14,50,3897),(14,51,3898),(14,52,3899),(14,53,3900),(14,54,3901),(14,55,3902),(14,56,3903),(14,57,3904),(14,58,3905),(14,59,3906),(14,60,3907),(14,61,3908),(14,62,3909),(17,8,3910),(17,9,3911),(17,11,3912),(17,12,3913),(17,17,3914),(17,15,3915),(17,16,3916),(17,14,3917),(17,94,3918),(17,18,3919),(17,19,3920),(17,20,3921),(17,22,3922),(17,23,3923),(17,64,3924),(17,63,3925),(17,65,3926),(17,66,3927),(17,67,3928),(17,68,3929),(17,69,3930),(17,24,3931),(17,82,3932),(17,83,3933),(17,84,3934),(17,25,3935),(17,26,3936),(17,27,3937),(17,28,3938),(17,29,3939),(17,30,3940),(17,71,3941),(17,31,3942),(17,32,3943),(17,37,3944),(17,38,3945),(17,85,3946),(17,86,3947),(17,87,3948),(17,39,3949),(17,88,3950),(17,89,3951),(17,90,3952),(17,43,3953),(17,74,3954),(17,75,3955),(17,76,3956),(17,77,3957),(17,78,3958),(17,79,3959),(17,80,3960),(17,44,3961),(17,45,3962),(17,46,3963),(17,47,3964),(17,91,3965),(17,92,3966),(17,93,3967),(17,48,3968),(17,49,3969),(17,50,3970),(17,51,3971),(17,52,3972),(17,53,3973),(17,54,3974),(17,55,3975),(17,56,3976),(17,57,3977),(17,58,3978),(17,59,3979),(17,60,3980),(17,61,3981),(17,62,3982),(17,70,3983),(34,8,3984),(34,12,3985),(34,48,3986),(34,49,3987),(34,50,3988),(34,51,3989),(34,52,3990),(34,53,3991),(34,54,3992),(34,55,3993),(34,56,3994),(34,57,3995),(34,58,3996),(34,59,3997),(34,60,3998),(34,61,3999),(34,62,4000),(34,70,4001),(35,8,4002),(35,12,4003),(35,24,4004),(35,82,4005),(35,83,4006),(35,84,4007),(35,39,4008),(35,88,4009),(35,89,4010),(35,90,4011),(35,41,4012),(35,43,4013),(35,74,4014),(35,75,4015),(35,76,4016),(35,77,4017),(35,78,4018),(35,79,4019),(35,80,4020),(35,44,4021),(35,45,4022),(35,46,4023),(35,48,4024),(35,49,4025),(35,50,4026),(35,51,4027),(35,52,4028),(35,53,4029),(35,54,4030),(35,55,4031),(35,56,4032),(35,57,4033),(35,58,4034),(35,59,4035),(35,60,4036),(35,61,4037),(35,62,4038),(35,70,4039),(37,8,4040),(37,11,4041),(37,18,4042),(37,19,4043),(37,20,4044),(37,22,4045),(37,23,4046),(37,64,4047),(37,63,4048),(37,65,4049),(37,66,4050),(37,67,4051),(37,68,4052),(37,69,4053),(37,25,4054),(37,26,4055),(37,27,4056),(37,28,4057),(37,29,4058),(37,30,4059),(37,71,4060),(37,31,4061),(37,33,4062),(37,48,4063),(37,49,4064),(37,50,4065),(37,51,4066),(37,52,4067),(37,53,4068),(37,54,4069),(37,55,4070),(37,56,4071),(37,57,4072),(37,58,4073),(37,59,4074),(37,60,4075),(37,61,4076),(37,62,4077),(38,8,4078),(38,12,4079),(38,25,4080),(38,26,4081),(38,27,4082),(38,28,4083),(38,29,4084),(38,30,4085),(38,71,4086),(38,32,4087),(38,39,4088),(38,88,4089),(38,89,4090),(38,90,4091),(38,41,4092),(38,47,4093),(38,91,4094),(38,92,4095),(38,93,4096),(38,48,4097),(38,49,4098),(38,50,4099),(38,51,4100),(38,52,4101),(38,53,4102),(38,54,4103),(38,55,4104),(38,56,4105),(38,57,4106),(38,58,4107),(38,59,4108),(38,60,4109),(38,61,4110),(38,62,4111),(38,70,4112),(39,8,4113),(39,31,4114),(40,48,4115),(40,49,4116),(40,50,4117),(40,51,4118),(40,52,4119),(40,53,4120),(40,54,4121),(40,55,4122),(40,56,4123),(40,57,4124),(40,58,4125),(40,59,4126),(40,60,4127),(40,61,4128),(40,62,4129),(41,8,4130),(41,24,4131),(41,82,4132),(41,83,4133),(41,84,4134),(41,38,4135),(41,85,4136),(41,86,4137),(41,87,4138),(41,39,4139),(41,88,4140),(41,89,4141),(41,90,4142),(41,74,4143),(41,75,4144),(41,76,4145),(41,77,4146),(41,78,4147),(41,79,4148),(41,80,4149),(41,44,4150),(41,45,4151),(41,46,4152),(41,47,4153),(41,91,4154),(41,92,4155),(41,93,4156),(41,48,4157),(41,49,4158),(41,50,4159),(41,51,4160),(41,52,4161),(41,53,4162),(41,54,4163),(41,55,4164),(41,56,4165),(41,57,4166),(41,58,4167),(41,59,4168),(41,60,4169),(41,61,4170),(41,62,4171),(42,25,4172),(42,26,4173),(42,27,4174),(42,28,4175),(42,29,4176),(42,30,4177),(42,71,4178),(42,33,4179),(42,48,4180),(42,49,4181),(42,50,4182),(42,51,4183),(42,52,4184),(42,53,4185),(42,54,4186),(42,55,4187),(42,56,4188),(42,57,4189),(42,58,4190),(42,59,4191),(42,60,4192),(42,61,4193),(42,62,4194),(43,18,4195),(43,19,4196),(43,20,4197),(43,22,4198),(43,23,4199),(43,64,4200),(43,63,4201),(43,65,4202),(43,66,4203),(43,67,4204),(43,68,4205),(43,69,4206),(43,24,4207),(43,82,4208),(43,83,4209),(43,84,4210),(43,25,4211),(43,26,4212),(43,27,4213),(43,28,4214),(43,29,4215),(43,30,4216),(43,71,4217),(43,39,4218),(43,88,4219),(43,89,4220),(43,90,4221),(43,74,4222),(43,75,4223),(43,76,4224),(43,77,4225),(43,78,4226),(43,79,4227),(43,80,4228),(43,44,4229),(43,45,4230),(43,46,4231),(43,47,4232),(43,91,4233),(43,92,4234),(43,93,4235),(43,48,4236),(43,49,4237),(43,50,4238),(43,51,4239),(43,52,4240),(43,53,4241),(43,54,4242),(43,55,4243),(43,56,4244),(43,57,4245),(43,58,4246),(43,59,4247),(43,60,4248),(43,61,4249),(43,62,4250),(16,8,4251),(16,9,4252),(16,11,4253),(16,12,4254),(16,18,4255),(16,19,4256),(16,20,4257),(16,22,4258),(16,23,4259),(16,64,4260),(16,63,4261),(16,65,4262),(16,66,4263),(16,67,4264),(16,68,4265),(16,69,4266),(16,24,4267),(16,82,4268),(16,83,4269),(16,84,4270),(16,25,4271),(16,26,4272),(16,27,4273),(16,28,4274),(16,29,4275),(16,30,4276),(16,71,4277),(16,32,4278),(16,33,4279),(16,34,4280),(16,35,4281),(16,36,4282),(16,72,4283),(16,73,4284),(16,39,4285),(16,88,4286),(16,89,4287),(16,90,4288),(16,40,4289),(16,41,4290),(16,42,4291),(16,43,4292),(16,74,4293),(16,75,4294),(16,76,4295),(16,77,4296),(16,78,4297),(16,79,4298),(16,80,4299),(16,44,4300),(16,45,4301),(16,46,4302),(16,47,4303),(16,91,4304),(16,92,4305),(16,93,4306),(16,48,4307),(16,49,4308),(16,50,4309),(16,51,4310),(16,52,4311),(16,53,4312),(16,54,4313),(16,55,4314),(16,56,4315),(16,57,4316),(16,58,4317),(16,59,4318),(16,60,4319),(16,61,4320),(16,62,4321),(16,70,4322),(19,8,4323),(19,18,4324),(19,19,4325),(19,20,4326),(19,22,4327),(19,23,4328),(19,64,4329),(19,63,4330),(19,65,4331),(19,66,4332),(19,67,4333),(19,68,4334),(19,69,4335),(19,24,4336),(19,82,4337),(19,83,4338),(19,84,4339),(19,39,4340),(19,88,4341),(19,89,4342),(19,90,4343),(19,74,4344),(19,75,4345),(19,76,4346),(19,77,4347),(19,78,4348),(19,79,4349),(19,80,4350),(19,44,4351),(19,45,4352),(19,46,4353),(19,48,4354),(19,60,4355),(28,8,4356),(28,39,4357),(28,88,4358),(28,89,4359),(28,90,4360),(28,74,4361),(28,75,4362),(28,76,4363),(28,77,4364),(28,78,4365),(28,79,4366),(28,80,4367),(28,44,4368),(28,45,4369),(28,46,4370),(28,47,4371),(28,91,4372),(28,92,4373),(28,93,4374),(29,8,4375),(29,39,4376),(29,88,4377),(29,89,4378),(29,90,4379),(20,9,4380),(20,10,4381),(20,11,4382),(20,13,4383),(20,94,4384),(20,18,4385),(20,19,4386),(20,20,4387),(20,22,4388),(20,23,4389),(20,64,4390),(20,63,4391),(20,65,4392),(20,66,4393),(20,67,4394),(20,68,4395),(20,69,4396),(20,24,4397),(20,82,4398),(20,83,4399),(20,84,4400),(20,25,4401),(20,26,4402),(20,27,4403),(20,28,4404),(20,29,4405),(20,30,4406),(20,71,4407),(20,32,4408),(20,33,4409),(20,95,4410),(20,34,4411),(20,35,4412),(20,36,4413),(20,72,4414),(20,73,4415),(20,37,4416),(20,38,4417),(20,85,4418),(20,86,4419),(20,87,4420),(20,39,4421),(20,88,4422),(20,89,4423),(20,90,4424),(20,81,4425),(20,40,4426),(20,41,4427),(20,42,4428),(20,43,4429),(20,74,4430),(20,75,4431),(20,76,4432),(20,77,4433),(20,78,4434),(20,79,4435),(20,80,4436),(20,44,4437),(20,45,4438),(20,46,4439),(20,47,4440),(20,91,4441),(20,92,4442),(20,93,4443),(20,48,4444),(20,49,4445),(20,50,4446),(20,51,4447),(20,52,4448),(20,53,4449),(20,54,4450),(20,55,4451),(20,56,4452),(20,57,4453),(20,58,4454),(20,59,4455),(20,60,4456),(20,61,4457),(20,62,4458),(27,8,4459),(27,9,4460),(27,10,4461),(27,11,4462),(27,12,4463),(27,13,4464),(27,15,4465),(27,16,4466),(27,14,4467),(27,94,4468),(27,18,4469),(27,19,4470),(27,20,4471),(27,22,4472),(27,23,4473),(27,64,4474),(27,63,4475),(27,65,4476),(27,66,4477),(27,67,4478),(27,68,4479),(27,69,4480),(27,24,4481),(27,82,4482),(27,83,4483),(27,84,4484),(27,25,4485),(27,26,4486),(27,27,4487),(27,28,4488),(27,29,4489),(27,30,4490),(27,71,4491),(27,32,4492),(27,33,4493),(27,34,4494),(27,35,4495),(27,36,4496),(27,72,4497),(27,73,4498),(27,37,4499),(27,39,4500),(27,88,4501),(27,89,4502),(27,90,4503),(27,81,4504),(27,40,4505),(27,41,4506),(27,43,4507),(27,74,4508),(27,75,4509),(27,76,4510),(27,77,4511),(27,78,4512),(27,79,4513),(27,80,4514),(27,44,4515),(27,45,4516),(27,46,4517),(27,48,4518),(27,49,4519),(27,50,4520),(27,51,4521),(27,52,4522),(27,53,4523),(27,54,4524),(27,55,4525),(27,56,4526),(27,57,4527),(27,58,4528),(27,59,4529),(27,60,4530),(27,61,4531),(27,62,4532),(27,70,4533),(31,8,4534),(31,9,4535),(31,10,4536),(31,94,4537),(31,18,4538),(31,19,4539),(31,20,4540),(31,22,4541),(31,23,4542),(31,64,4543),(31,63,4544),(31,65,4545),(31,66,4546),(31,67,4547),(31,68,4548),(31,69,4549),(31,24,4550),(31,82,4551),(31,83,4552),(31,84,4553),(31,25,4554),(31,26,4555),(31,27,4556),(31,28,4557),(31,29,4558),(31,30,4559),(31,71,4560),(31,32,4561),(31,33,4562),(31,95,4563),(31,34,4564),(31,35,4565),(31,36,4566),(31,72,4567),(31,73,4568),(31,37,4569),(31,39,4570),(31,88,4571),(31,89,4572),(31,90,4573),(31,41,4574),(31,42,4575),(31,43,4576),(31,74,4577),(31,75,4578),(31,76,4579),(31,77,4580),(31,78,4581),(31,79,4582),(31,80,4583),(31,44,4584),(31,45,4585),(31,46,4586),(31,47,4587),(31,91,4588),(31,92,4589),(31,93,4590),(31,48,4591),(31,49,4592),(31,50,4593),(31,51,4594),(31,52,4595),(31,53,4596),(31,54,4597),(31,55,4598),(31,56,4599),(31,57,4600),(31,58,4601),(31,59,4602),(31,60,4603),(31,61,4604),(31,62,4605),(32,8,4606),(32,15,4607),(32,16,4608),(32,18,4609),(32,19,4610),(32,20,4611),(32,22,4612),(32,23,4613),(32,64,4614),(32,63,4615),(32,65,4616),(32,66,4617),(32,67,4618),(32,68,4619),(32,69,4620),(32,24,4621),(32,82,4622),(32,83,4623),(32,84,4624),(32,25,4625),(32,26,4626),(32,27,4627),(32,28,4628),(32,29,4629),(32,30,4630),(32,71,4631),(32,32,4632),(32,34,4633),(32,35,4634),(32,36,4635),(32,72,4636),(32,73,4637),(32,37,4638),(32,39,4639),(32,88,4640),(32,89,4641),(32,90,4642),(32,81,4643),(32,40,4644),(32,41,4645),(32,74,4646),(32,75,4647),(32,76,4648),(32,77,4649),(32,78,4650),(32,79,4651),(32,80,4652),(32,44,4653),(32,45,4654),(32,46,4655),(32,47,4656),(32,91,4657),(32,92,4658),(32,93,4659),(76,9,4660),(76,18,4661),(76,19,4662),(76,20,4663),(76,22,4664),(76,23,4665),(76,64,4666),(76,63,4667),(76,65,4668),(76,66,4669),(76,67,4670),(76,68,4671),(76,69,4672),(76,24,4673),(76,82,4674),(76,83,4675),(76,84,4676),(76,25,4677),(76,26,4678),(76,27,4679),(76,28,4680),(76,29,4681),(76,30,4682),(76,71,4683),(76,32,4684),(76,33,4685),(76,95,4686),(76,34,4687),(76,35,4688),(76,36,4689),(76,72,4690),(76,73,4691),(76,37,4692),(76,39,4693),(76,88,4694),(76,89,4695),(76,90,4696),(76,41,4697),(76,42,4698),(76,74,4699),(76,75,4700),(76,76,4701),(76,77,4702),(76,78,4703),(76,79,4704),(76,80,4705),(76,44,4706),(76,45,4707),(76,46,4708),(76,47,4709),(76,91,4710),(76,92,4711),(76,93,4712),(76,48,4713),(76,49,4714),(76,50,4715),(76,51,4716),(76,52,4717),(76,53,4718),(76,54,4719),(76,55,4720),(76,56,4721),(76,57,4722),(76,58,4723),(76,59,4724),(76,60,4725),(76,61,4726),(76,62,4727),(18,8,4728),(18,9,4729),(18,10,4730),(18,11,4731),(18,12,4732),(18,17,4733),(18,15,4734),(18,16,4735),(18,94,4736),(18,18,4737),(18,19,4738),(18,20,4739),(18,22,4740),(18,23,4741),(18,64,4742),(18,63,4743),(18,65,4744),(18,66,4745),(18,67,4746),(18,68,4747),(18,69,4748),(18,24,4749),(18,82,4750),(18,83,4751),(18,84,4752),(18,25,4753),(18,26,4754),(18,27,4755),(18,28,4756),(18,29,4757),(18,30,4758),(18,71,4759),(18,32,4760),(18,33,4761),(18,95,4762),(18,34,4763),(18,35,4764),(18,36,4765),(18,72,4766),(18,73,4767),(18,37,4768),(18,38,4769),(18,85,4770),(18,86,4771),(18,87,4772),(18,39,4773),(18,88,4774),(18,89,4775),(18,90,4776),(18,81,4777),(18,40,4778),(18,41,4779),(18,42,4780),(18,43,4781),(18,74,4782),(18,75,4783),(18,76,4784),(18,77,4785),(18,78,4786),(18,79,4787),(18,80,4788),(18,44,4789),(18,45,4790),(18,46,4791),(18,47,4792),(18,91,4793),(18,92,4794),(18,93,4795),(18,48,4796),(18,49,4797),(18,50,4798),(18,51,4799),(18,52,4800),(18,53,4801),(18,54,4802),(18,55,4803),(18,56,4804),(18,57,4805),(18,58,4806),(18,59,4807),(18,60,4808),(18,61,4809),(18,62,4810),(18,70,4811),(23,8,4812),(21,8,4813),(33,8,4847),(33,10,4848),(33,39,4849),(33,88,4850),(33,89,4851),(33,90,4852),(71,8,4857),(71,10,4858),(72,8,4859),(72,33,4860),(72,95,4861),(73,8,4862),(73,43,4863),(74,8,4865),(75,8,4866),(24,8,4867),(24,9,4868),(24,10,4869),(24,11,4870),(24,12,4871),(24,13,4872),(24,15,4873),(24,16,4874),(24,94,4875),(24,18,4876),(24,19,4877),(24,20,4878),(24,22,4879),(24,23,4880),(24,64,4881),(24,63,4882),(24,65,4883),(24,66,4884),(24,67,4885),(24,68,4886),(24,69,4887),(24,24,4888),(24,82,4889),(24,83,4890),(24,84,4891),(24,33,4892),(24,34,4893),(24,35,4894),(24,36,4895),(24,72,4896),(24,73,4897),(24,38,4898),(24,85,4899),(24,86,4900),(24,87,4901),(24,39,4902),(24,88,4903),(24,89,4904),(24,90,4905),(24,81,4906),(24,40,4907),(24,41,4908),(24,43,4909),(24,47,4910),(24,91,4911),(24,92,4912),(24,93,4913),(24,48,4914),(24,49,4915),(24,50,4916),(24,51,4917),(24,52,4918),(24,53,4919),(24,54,4920),(24,55,4921),(24,56,4922),(24,57,4923),(24,58,4924),(24,59,4925),(24,60,4926),(24,61,4927),(24,62,4928),(24,70,4929),(25,8,4930),(25,9,4931),(25,10,4932),(25,11,4933),(25,12,4934),(25,13,4935),(25,94,4936),(25,18,4937),(25,19,4938),(25,20,4939),(25,22,4940),(25,23,4941),(25,64,4942),(25,63,4943),(25,65,4944),(25,66,4945),(25,67,4946),(25,68,4947),(25,69,4948),(25,24,4949),(25,82,4950),(25,83,4951),(25,84,4952),(25,33,4953),(25,34,4954),(25,35,4955),(25,36,4956),(25,72,4957),(25,73,4958),(25,38,4959),(25,85,4960),(25,86,4961),(25,87,4962),(25,81,4963),(25,40,4964),(25,43,4965),(25,48,4966),(25,49,4967),(25,50,4968),(25,51,4969),(25,52,4970),(25,53,4971),(25,54,4972),(25,55,4973),(25,56,4974),(25,57,4975),(25,58,4976),(25,59,4977),(25,60,4978),(25,61,4979),(25,62,4980),(25,70,4981),(26,8,4982),(26,10,4983),(26,11,4984),(26,94,4985),(26,33,4986),(26,47,4987),(26,91,4988),(26,92,4989),(26,93,4990),(44,9,4991),(44,12,4992),(44,18,4993),(44,19,4994),(44,20,4995),(44,22,4996),(44,23,4997),(44,64,4998),(44,63,4999),(44,65,5000),(44,66,5001),(44,67,5002),(44,68,5003),(44,69,5004),(44,24,5005),(44,82,5006),(44,83,5007),(44,84,5008),(44,25,5009),(44,26,5010),(44,27,5011),(44,28,5012),(44,29,5013),(44,30,5014),(44,71,5015),(44,95,5016),(44,34,5017),(44,35,5018),(44,36,5019),(44,72,5020),(44,73,5021),(44,38,5022),(44,85,5023),(44,86,5024),(44,87,5025),(44,39,5026),(44,88,5027),(44,89,5028),(44,90,5029),(44,40,5030),(44,41,5031),(44,42,5032),(44,43,5033),(44,74,5034),(44,75,5035),(44,76,5036),(44,77,5037),(44,78,5038),(44,79,5039),(44,80,5040),(44,44,5041),(44,45,5042),(44,46,5043),(44,47,5044),(44,91,5045),(44,92,5046),(44,93,5047),(44,48,5048),(44,53,5049),(44,54,5050),(44,70,5051),(52,9,5052),(52,11,5053),(52,15,5054),(52,16,5055),(52,94,5056),(52,18,5057),(52,19,5058),(52,20,5059),(52,22,5060),(52,23,5061),(52,64,5062),(52,63,5063),(52,65,5064),(52,66,5065),(52,67,5066),(52,68,5067),(52,69,5068),(52,24,5069),(52,82,5070),(52,83,5071),(52,84,5072),(52,25,5073),(52,26,5074),(52,27,5075),(52,28,5076),(52,29,5077),(52,30,5078),(52,71,5079),(52,34,5080),(52,35,5081),(52,36,5082),(52,72,5083),(52,73,5084),(52,38,5085),(52,85,5086),(52,86,5087),(52,87,5088),(52,39,5089),(52,88,5090),(52,89,5091),(52,90,5092),(52,81,5093),(52,40,5094),(52,41,5095),(52,42,5096),(52,74,5097),(52,75,5098),(52,76,5099),(52,77,5100),(52,78,5101),(52,79,5102),(52,80,5103),(52,44,5104),(52,45,5105),(52,46,5106),(52,47,5107),(52,91,5108),(52,92,5109),(52,93,5110),(52,48,5111),(52,49,5112),(52,50,5113),(52,51,5114),(52,52,5115),(52,53,5116),(52,54,5117),(52,55,5118),(52,56,5119),(52,57,5120),(52,58,5121),(52,60,5122),(52,61,5123),(52,62,5124),(53,11,5125),(53,24,5126),(53,82,5127),(53,83,5128),(53,84,5129),(53,25,5130),(53,26,5131),(53,27,5132),(53,28,5133),(53,29,5134),(53,30,5135),(53,71,5136),(53,38,5137),(53,85,5138),(53,86,5139),(53,87,5140),(53,39,5141),(53,88,5142),(53,89,5143),(53,90,5144),(53,40,5145),(53,74,5146),(53,75,5147),(53,76,5148),(53,77,5149),(53,78,5150),(53,79,5151),(53,80,5152),(53,44,5153),(53,45,5154),(53,46,5155),(53,48,5156),(53,49,5157),(53,50,5158),(53,51,5159),(53,52,5160),(53,53,5161),(53,54,5162),(53,55,5163),(53,56,5164),(53,57,5165),(53,58,5166),(53,60,5167),(53,61,5168),(53,62,5169),(54,11,5170),(54,14,5171),(54,94,5172),(54,18,5173),(54,19,5174),(54,20,5175),(54,22,5176),(54,23,5177),(54,64,5178),(54,63,5179),(54,65,5180),(54,66,5181),(54,67,5182),(54,68,5183),(54,69,5184),(54,24,5185),(54,82,5186),(54,83,5187),(54,84,5188),(54,25,5189),(54,26,5190),(54,27,5191),(54,28,5192),(54,29,5193),(54,30,5194),(54,71,5195),(54,38,5196),(54,85,5197),(54,86,5198),(54,87,5199),(54,39,5200),(54,88,5201),(54,89,5202),(54,90,5203),(54,40,5204),(54,74,5205),(54,75,5206),(54,76,5207),(54,77,5208),(54,78,5209),(54,79,5210),(54,80,5211),(54,44,5212),(54,45,5213),(54,46,5214),(54,47,5215),(54,91,5216),(54,92,5217),(54,93,5218),(54,48,5219),(54,49,5220),(54,50,5221),(54,51,5222),(54,52,5223),(54,53,5224),(54,54,5225),(54,55,5226),(54,56,5227),(54,57,5228),(54,58,5229),(54,60,5230),(54,61,5231),(54,62,5232),(56,24,5233),(56,82,5234),(56,83,5235),(56,84,5236),(56,25,5237),(56,26,5238),(56,27,5239),(56,28,5240),(56,29,5241),(56,30,5242),(56,71,5243),(56,34,5244),(56,35,5245),(56,36,5246),(56,72,5247),(56,73,5248),(56,39,5249),(56,88,5250),(56,89,5251),(56,90,5252),(56,40,5253),(56,43,5254),(56,48,5255),(56,49,5256),(56,50,5257),(56,51,5258),(56,52,5259),(56,53,5260),(56,54,5261),(56,55,5262),(56,56,5263),(56,57,5264),(56,58,5265),(56,60,5266),(56,61,5267),(56,62,5268),(55,9,5269),(55,24,5270),(55,82,5271),(55,83,5272),(55,84,5273),(55,34,5274),(55,35,5275),(55,36,5276),(55,72,5277),(55,73,5278),(55,40,5279),(55,41,5280),(55,42,5281),(55,74,5282),(55,75,5283),(55,76,5284),(55,77,5285),(55,78,5286),(55,79,5287),(55,80,5288),(55,44,5289),(55,45,5290),(55,46,5291),(55,48,5292),(55,49,5293),(55,50,5294),(55,51,5295),(55,52,5296),(55,53,5297),(55,54,5298),(55,55,5299),(55,56,5300),(55,57,5301),(55,58,5302),(55,60,5303),(55,61,5304),(55,62,5305),(57,11,5306),(57,17,5307),(57,14,5308),(57,94,5309),(57,18,5310),(57,19,5311),(57,20,5312),(57,22,5313),(57,23,5314),(57,64,5315),(57,63,5316),(57,65,5317),(57,66,5318),(57,67,5319),(57,68,5320),(57,69,5321),(57,25,5322),(57,26,5323),(57,27,5324),(57,28,5325),(57,29,5326),(57,30,5327),(57,71,5328),(57,39,5329),(57,88,5330),(57,89,5331),(57,90,5332),(57,74,5333),(57,75,5334),(57,76,5335),(57,77,5336),(57,78,5337),(57,79,5338),(57,80,5339),(57,44,5340),(57,45,5341),(57,46,5342),(57,47,5343),(57,91,5344),(57,92,5345),(57,93,5346),(57,48,5347),(57,49,5348),(57,50,5349),(57,51,5350),(57,52,5351),(57,53,5352),(57,54,5353),(57,55,5354),(57,56,5355),(57,57,5356),(57,58,5357),(57,60,5358),(57,61,5359),(57,62,5360),(62,8,5361),(62,11,5362),(62,18,5363),(62,19,5364),(62,20,5365),(62,22,5366),(62,23,5367),(62,64,5368),(62,63,5369),(62,65,5370),(62,66,5371),(62,67,5372),(62,68,5373),(62,69,5374),(62,25,5375),(62,26,5376),(62,27,5377),(62,28,5378),(62,29,5379),(62,30,5380),(62,71,5381),(62,34,5382),(62,35,5383),(62,36,5384),(62,72,5385),(62,73,5386),(62,43,5387),(62,48,5388),(62,60,5389),(63,8,5390),(63,24,5391),(63,82,5392),(63,83,5393),(63,84,5394),(63,33,5395),(63,39,5396),(63,88,5397),(63,89,5398),(63,90,5399),(63,41,5400),(63,42,5401),(63,74,5402),(63,75,5403),(63,76,5404),(63,77,5405),(63,78,5406),(63,79,5407),(63,80,5408),(63,44,5409),(63,45,5410),(63,46,5411),(64,8,5412),(64,24,5413),(64,82,5414),(64,83,5415),(64,84,5416),(64,39,5417),(64,88,5418),(64,89,5419),(64,90,5420),(64,74,5421),(64,75,5422),(64,76,5423),(64,77,5424),(64,78,5425),(64,79,5426),(64,80,5427),(64,44,5428),(64,45,5429),(64,46,5430),(64,48,5431),(64,60,5432),(65,8,5433),(65,10,5434),(65,33,5435),(65,39,5436),(65,88,5437),(65,89,5438),(65,90,5439),(65,74,5440),(65,75,5441),(65,76,5442),(65,77,5443),(65,78,5444),(65,79,5445),(65,80,5446),(65,44,5447),(65,45,5448),(65,46,5449),(49,8,5450),(50,8,5451),(66,8,5452),(66,9,5453),(66,10,5454),(66,11,5455),(66,12,5456),(66,15,5457),(66,16,5458),(66,94,5459),(66,18,5460),(66,19,5461),(66,20,5462),(66,22,5463),(66,23,5464),(66,64,5465),(66,63,5466),(66,65,5467),(66,66,5468),(66,67,5469),(66,68,5470),(66,69,5471),(66,24,5472),(66,82,5473),(66,83,5474),(66,84,5475),(66,25,5476),(66,26,5477),(66,27,5478),(66,28,5479),(66,29,5480),(66,30,5481),(66,71,5482),(66,32,5483),(66,33,5484),(66,95,5485),(66,34,5486),(66,35,5487),(66,36,5488),(66,72,5489),(66,73,5490),(66,37,5491),(66,39,5492),(66,88,5493),(66,89,5494),(66,90,5495),(66,81,5496),(66,40,5497),(66,41,5498),(66,42,5499),(66,43,5500),(66,74,5501),(66,75,5502),(66,76,5503),(66,77,5504),(66,78,5505),(66,79,5506),(66,80,5507),(66,44,5508),(66,45,5509),(66,46,5510),(66,47,5511),(66,91,5512),(66,92,5513),(66,93,5514),(66,48,5515),(66,49,5516),(66,50,5517),(66,51,5518),(66,52,5519),(66,53,5520),(66,54,5521),(66,55,5522),(66,56,5523),(66,57,5524),(66,58,5525),(66,59,5526),(66,60,5527),(66,61,5528),(66,62,5529),(66,70,5530),(22,8,5531),(22,9,5532),(22,10,5533),(22,15,5534),(22,16,5535),(22,14,5536),(22,94,5537),(22,18,5538),(22,19,5539),(22,20,5540),(22,22,5541),(22,23,5542),(22,64,5543),(22,63,5544),(22,65,5545),(22,66,5546),(22,67,5547),(22,68,5548),(22,69,5549),(22,24,5550),(22,82,5551),(22,83,5552),(22,84,5553),(22,33,5554),(22,95,5555),(22,39,5556),(22,88,5557),(22,89,5558),(22,90,5559),(22,47,5560),(22,91,5561),(22,92,5562),(22,93,5563),(67,8,5564),(67,11,5565),(67,39,5566),(67,88,5567),(67,89,5568),(67,90,5569),(67,74,5570),(67,75,5571),(67,76,5572),(67,77,5573),(67,78,5574),(67,79,5575),(67,80,5576),(67,44,5577),(67,45,5578),(67,46,5579),(67,47,5580),(67,91,5581),(67,92,5582),(67,93,5583),(68,8,5584),(68,18,5585),(68,19,5586),(68,20,5587),(68,22,5588),(68,23,5589),(68,64,5590),(68,63,5591),(68,65,5592),(68,66,5593),(68,67,5594),(68,68,5595),(68,69,5596),(68,24,5597),(68,82,5598),(68,83,5599),(68,84,5600),(68,34,5601),(68,35,5602),(68,36,5603),(68,72,5604),(68,73,5605),(68,39,5606),(68,88,5607),(68,89,5608),(68,90,5609),(68,47,5610),(68,91,5611),(68,92,5612),(68,93,5613),(68,48,5614),(68,49,5615),(68,50,5616),(68,51,5617),(68,52,5618),(68,53,5619),(68,54,5620),(68,55,5621),(68,56,5622),(68,57,5623),(68,58,5624),(68,59,5625),(68,60,5626),(68,61,5627),(68,62,5628),(69,8,5629),(69,9,5630),(69,94,5631),(69,18,5632),(69,19,5633),(69,20,5634),(69,22,5635),(69,23,5636),(69,64,5637),(69,63,5638),(69,65,5639),(69,66,5640),(69,67,5641),(69,68,5642),(69,69,5643),(69,24,5644),(69,82,5645),(69,83,5646),(69,84,5647),(69,34,5648),(69,35,5649),(69,36,5650),(69,72,5651),(69,73,5652),(69,39,5653),(69,88,5654),(69,89,5655),(69,90,5656),(69,48,5657),(69,49,5658),(69,50,5659),(69,51,5660),(69,52,5661),(69,53,5662),(69,54,5663),(69,55,5664),(69,56,5665),(69,57,5666),(69,58,5667),(69,59,5668),(69,60,5669),(69,61,5670),(69,62,5671),(31,96,5672),(71,96,5673),(33,96,5674),(20,96,5675),(27,96,5676),(66,96,5677),(32,96,5678),(43,96,5679),(76,96,5680);
/*!40000 ALTER TABLE `universidad_carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad_carrera_beca`
--

DROP TABLE IF EXISTS `universidad_carrera_beca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad_carrera_beca` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `beca_id` bigint DEFAULT NULL,
  `universidad_carrera_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKolgmv2jwsy3fb0u4sq2ic55t4` (`beca_id`),
  KEY `FKjc7ve9u1ub879ei14two9au9e` (`universidad_carrera_id`),
  CONSTRAINT `FKolgmv2jwsy3fb0u4sq2ic55t4` FOREIGN KEY (`beca_id`) REFERENCES `beca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad_carrera_beca`
--

LOCK TABLES `universidad_carrera_beca` WRITE;
/*!40000 ALTER TABLE `universidad_carrera_beca` DISABLE KEYS */;
/*!40000 ALTER TABLE `universidad_carrera_beca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `usuario_id` bigint NOT NULL,
  `rol_id` bigint NOT NULL,
  KEY `FK610kvhkwcqk2pxeewur4l7bd1` (`rol_id`),
  KEY `FKktsemf1f6awjww4da0ocv4n32` (`usuario_id`),
  CONSTRAINT `FK610kvhkwcqk2pxeewur4l7bd1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`),
  CONSTRAINT `FKktsemf1f6awjww4da0ocv4n32` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (1,1),(2,1),(8,2),(9,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `departamento_id` bigint DEFAULT NULL,
  `rol_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5gmfjqr63gaxj9wcwpdvfmevh` (`departamento_id`),
  CONSTRAINT `FK5gmfjqr63gaxj9wcwpdvfmevh` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Meza','Manuel','$2a$10$HrrTKwM0JnaKmZ/TRiSOBujyFJ7H1yRwGIJKzwXQONbBJuGE7oB8O','987654321','mezalopem@gmail.com',NULL,NULL),(2,'Gomez','Jose','$2a$10$t0UtwSuukUnPxDrta/j6huqoy0Yk.upyptm8gS09VzrWY5Se3.33S','87561','jofe@ou.com',NULL,NULL),(8,'Apellido','Nombre','$2a$10$01yUvoYrJ8bvaMqVUvJwy.WzuE1qjbwKdHAJRnSpPzyemG7v8QBUu','987654321','nombre.apellido@gmail.com',14,NULL),(9,'Meza','Manuel','$2a$10$XCZGa/Uy3.M5f.9UMJ5qvOL8Kq0Wm6gWhhxUy4BQcr0m0mPMlG8He','987654321','mezalopem@gmail.com',NULL,NULL),(11,'Garcia','Juan','$2a$10$sqmBpP6JVAEw7JWKjBZ28umTuZE1pDRBFn971yV1la5og2jdI0Zq6','987456132','juan.garcia@gmail.com',8,NULL),(12,'Garcia','Choledo','$2a$10$UNMs3JXGquNKHrbV7BN1y.JlCeyonMPYMeyiJGDrN7SEIPZnTSx/G','977777744','lala@gmail.com',1,NULL),(13,'Garcia','Manolas','$2a$10$fW0EZg.yArOMrtvYk3PIJuXtILXPFI.HtuU2QNjv1YU5QIDFi.f1i','977777744','gaga@gmail.com',2,NULL),(14,'caire','diego','$2a$10$96Mh9RFwqCVfvdDO48evoOusE3v927lqGyA8PnrX/m109TrMRAzW6','977777744','didi@gmail.com',20,NULL),(15,'quino','diego','$2a$10$1wEnEH2tzpHe2uGcquKhe.YxuZMKk6f7RpB6vSoXm6eTxrGB.4.Yu','958632147','diego123@gmail.com',14,NULL),(16,'Meza','Manuel','$2a$10$ZebkarABNZozhdVH383GyeWBUyQya3VYdgdo/AvzeyB7GNMb1WKZm','987654321','ejemplo@gmail.com',15,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-23  1:04:50
