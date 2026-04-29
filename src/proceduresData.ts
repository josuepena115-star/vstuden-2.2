export interface Procedure {
  id: string;
  nombre: string;
  categoria: string;
  uso: string;
  indicaciones: string[];
  contraindicaciones: string[];
  maneraRealizarlo: string[];
  tipoTecnica: string;
  cuidadosEnfermeria: string[];
  materialNecesario: string[];
}

export const PROCEDURE_CATEGORIES = [
  { name: "Accesos Vasculares y Terapia Infusional", icon: "Syringe" },
  { name: "Eliminación y Drenajes", icon: "Droplet" },
  { name: "Soporte Respiratorio y Manejo de Vía Aérea", icon: "Wind" },
  { name: "Nutrición y Soporte Metabólico", icon: "Activity" },
  { name: "Integridad Cutánea y Heridas", icon: "Shield" }
];

export const PROCEDURES: Procedure[] = [
  {
    "id": "proc1",
    "nombre": "Canalización de Vía Venosa Periférica",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Acceso al sistema venoso para administración de fluidos, fármacos o hemoderivados.",
    "indicaciones": [
      "Administración de fluidos",
      "Administración de fármacos intravenosos",
      "Transfusión de hemoderivados"
    ],
    "contraindicaciones": [
      "Zonas de flexión",
      "Miembros con fístulas arteriovenosas",
      "Lado de mastectomía con vaciamiento ganglionar",
      "Zonas con infección o quemaduras"
    ],
    "maneraRealizarlo": [
      "Selección de la vena: Preferir venas distales (dorso de la mano, antebrazo).",
      "Colocación del torniquete: Aplicar 10-15 cm por encima del sitio de punción elegido.",
      "Antisepsia: Limpiar el sitio de punción con fricción en espiral de adentro hacia afuera o en rejilla. Dejar secar completamente.",
      "Punción: Fijar la piel traccionando suavemente hacia abajo. Insertar el catéter con el bisel hacia arriba en un ángulo de 15-30 grados.",
      "Retorno venoso: Al observar sangre en la cámara trasera, disminuir el ángulo casi paralelo a la piel.",
      "Avance del catéter: Avanzar el catéter de teflón sobre la aguja guía hacia el interior de la vena. NO reintroducir la aguja si se saca.",
      "Retirada de aguja y torniquete: Soltar el torniquete. Presionar la vena por encima de la punta del catéter para evitar sangrado y retirar la aguja guía (desechar en guardián).",
      "Conexión: Conectar rápidamente el equipo de venoclisis o la llave de 3 vías previamente purgada.",
      "Comprobación: Lavar con suero fisiológico para confirmar permeabilidad y ausencia de infiltración.",
      "Fijación: Cubrir el sitio de inserción con el apósito transparente. Fijar el equipo con esparadrapo (técnica de corbata). Rotular con fecha, calibre y responsable."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Tip de Seguridad: Si la vena se \"poncha\" (se rompe y hace hematoma), retirar inmediatamente, presionar y buscar otro acceso más proximal o en el otro brazo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar signos de flebitis, infiltración o extravasación. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Cambiar fijación si está sucia, húmeda o despegada. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Catéter periférico (calibre según necesidad)",
      "Torniquete",
      "Torundas con alcohol 70% o clorhexidina",
      "Apósito transparente (Tegaderm)",
      "Esparadrapo",
      "Guantes no estériles",
      "Jeringa con suero fisiológico (flush)"
    ]
  },
  {
    "id": "proc2",
    "nombre": "Toma de Gasometría Arterial",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Extracción de sangre arterial para análisis de gases (O2, CO2), pH y equilibrio ácido-base.",
    "indicaciones": [
      "Evaluación de gases en sangre",
      "Medición de pH y equilibrio ácido-base",
      "Insuficiencia respiratoria"
    ],
    "contraindicaciones": [
      "Test de Allen negativo (indica mala circulación colateral)",
      "Infección en el sitio de punción",
      "Fístula arteriovenosa",
      "Coagulopatía severa (relativa)"
    ],
    "maneraRealizarlo": [
      "Selección del sitio: Arteria radial (de elección). Alternativas: braquial o femoral.",
      "Test de Allen (Obligatorio para radial): Comprimir arterias radial y cubital. Pedir al paciente que abra y cierre la mano hasta que palidezca. Soltar la arteria cubital; la mano debe recuperar el color en <10 seg.",
      "Posición: Hiperextender ligeramente la muñeca apoyándola sobre un rodillo.",
      "Antisepsia: Limpiar la zona de punción.",
      "Palpación: Palpar el pulso arterial con los dedos índice y medio de la mano no dominante.",
      "Punción: Insertar la aguja en un ángulo de 45° (radial) o 90° (femoral) justo en el punto de máximo impulso.",
      "Extracción: La sangre arterial subirá sola a la jeringa por la presión (no es necesario aspirar). Extraer 1-2 ml.",
      "Retirada y hemostasia: Retirar la aguja y aplicar presión directa con una gasa seca durante al menos 5 minutos (10 min si usa anticoagulantes).",
      "Manejo de la muestra: Expulsar burbujas de aire de la jeringa, sellar, mezclar rotando la jeringa y enviar al laboratorio inmediatamente."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Tip de Seguridad: Las burbujas de aire en la jeringa alteran los resultados (aumentan la PaO2 artificialmente). Expúlsalas inmediatamente. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Asegurar hemostasia adecuada para evitar hematomas o pseudoaneurismas. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Procesar la muestra rápidamente (en hielo si demora más de 10-15 min). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Jeringa heparinizada para gasometría",
      "Aguja fina (22G o 23G)",
      "Torundas con antiséptico",
      "Gasa seca",
      "Esparadrapo",
      "Guantes no estériles",
      "Contenedor con hielo (si el proceso demora)"
    ]
  },
  {
    "id": "proc_cvc",
    "nombre": "Mantenimiento y Curación de Catéter Venoso Central (CVC)",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Mantenimiento de la permeabilidad y prevención de infecciones en vías centrales.",
    "indicaciones": [
      "Catéter venoso central insertado",
      "Cambio de apósito programado (cada 7 días si es transparente, 48h si es gasa)",
      "Apósito sucio, húmedo o despegado"
    ],
    "contraindicaciones": [
      "Retirada sin orden médica",
      "Manipulación sin técnica estéril"
    ],
    "maneraRealizarlo": [
      "Higiene de manos y colocación de mascarilla (paciente y enfermero).",
      "Retirar apósito antiguo con guantes limpios, estirando los bordes paralelos a la piel.",
      "Inspeccionar el sitio de inserción (eritema, exudado).",
      "Higiene de manos y colocación de guantes estériles.",
      "Limpieza con clorhexidina al 2% (o yodopovidona si hay alergia), con fricción de 30 segundos, abarcando un área mayor al apósito.",
      "Dejar secar al aire completamente (no soplar ni abanicar).",
      "Aplicar apósito transparente semipermeable (ej. Tegaderm) centrado en la inserción.",
      "Rotular con fecha, hora y responsable."
    ],
    "tipoTecnica": "Estéril",
    "cuidadosEnfermeria": [
      "Intervención: Vigilar signos de infección local o sistémica. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Asegurar la permeabilidad de todas las luces realizando lavado (flush) con 10-20 cc de suero fisiológico usando técnica de presión positiva (push-pause). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: En catéteres de diálisis o reservorios subcutáneos sin uso activo a corto plazo, el sellado (lock) se realizará con heparina sódica (dilución frecuente entre 100 UI/ml a 500 UI/ml, dependiendo del protocolo y volumen del lumen) para prevenir riesgo inminente de trombosis del dispositivo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Cambiar los sistemas de infusión según protocolo (generalmente cada 72-96h, lípidos cada 24h). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado."
    ],
    "materialNecesario": [
      "Equipo de curación estéril",
      "Clorhexidina al 2% (preferible) o Yodopovidona",
      "Apósito transparente semipermeable",
      "Guantes estériles y limpios",
      "Mascarillas",
      "Suero fisiológico para lavado"
    ]
  },
  {
    "id": "proc_hemoderivados",
    "nombre": "Administración de Hemoderivados",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Transfusión de sangre total, concentrado de hematíes, plaquetas o plasma.",
    "indicaciones": [
      "Anemia severa",
      "Hemorragia aguda",
      "Coagulopatías",
      "Trombocitopenia"
    ],
    "contraindicaciones": [
      "Rechazo del paciente (motivos religiosos/personales sin orden judicial)",
      "Incompatibilidad de grupo/Rh"
    ],
    "maneraRealizarlo": [
      "Verificación cruzada (doble chequeo) al pie de la cama por dos enfermeros: paciente, grupo, Rh, número de unidad y fecha de caducidad.",
      "Toma de constantes vitales basales antes de iniciar.",
      "Utilizar un equipo de transfusión con filtro estándar (170-260 micras).",
      "Iniciar la transfusión lentamente (ej. 2 ml/min) durante los primeros 15 minutos.",
      "Permanecer con el paciente los primeros 15 minutos observando posibles reacciones.",
      "Ajustar el ritmo según prescripción. Tiempo máximo de infusión: 4 horas (para evitar proliferación bacteriana).",
      "Toma de constantes vitales a los 15 min, a la mitad y al finalizar.",
      "Lavar la vía con suero fisiológico al terminar."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Vigilar signos de reacción transfusional (fiebre, escalofríos, prurito, disnea, dolor lumbar). Si ocurren: DETENER la transfusión inmediatamente, mantener vía con suero fisiológico y avisar al médico. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: No administrar NINGÚN medicamento por la misma vía simultáneamente (excepto suero fisiológico 0.9%). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados.",
      "Intervención: Aplicar estrictamente los principios de asepsia durante la preparación. Razón: Minimiza la carga bacteriana local y previene infecciones cruzadas o asociadas a la atención en salud (IAAS)."
    ],
    "materialNecesario": [
      "Unidad de hemoderivado",
      "Equipo de transfusión con filtro",
      "Suero fisiológico 0.9%",
      "Guantes limpios",
      "Equipo para toma de signos vitales"
    ]
  },
  {
    "id": "proc_bombas",
    "nombre": "Montaje y Programación de Bombas de Infusión",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Administración precisa y controlada de fluidos y medicamentos intravenosos.",
    "indicaciones": [
      "Drogas vasoactivas",
      "Nutrición parenteral",
      "Electrolitos concentrados",
      "Pediatría/Neonatología",
      "Control estricto de volumen"
    ],
    "contraindicaciones": [
      "Administración de bolos rápidos manuales a través de la bomba sin usar la función específica"
    ],
    "maneraRealizarlo": [
      "Preparar la solución o medicamento.",
      "Conectar el equipo de bomba (cassette o línea) a la solución.",
      "Purgar el equipo completamente, asegurando que no haya burbujas de aire (algunas bombas requieren purgado manual, otras automático).",
      "Instalar el equipo en la bomba según las instrucciones del fabricante.",
      "Encender la bomba y programar los parámetros: Volumen Total a Infundir (VTBI) y Velocidad de Infusión (ml/hr).",
      "Conectar al paciente y presionar \"Start/Iniciar\".",
      "Verificar que las gotas caigan en la cámara (si aplica) y que no haya alarmas."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Verificar la programación (doble chequeo para medicamentos de alto riesgo). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Atender las alarmas inmediatamente (oclusión, aire en línea, infusión completa). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Etiquetar las líneas cerca del paciente y cerca de la bomba para evitar confusiones en pacientes con múltiples infusiones. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Bomba de infusión",
      "Equipo (set) específico para la bomba",
      "Solución a infundir",
      "Guantes limpios"
    ]
  },
  {
    "id": "proc_med_iv",
    "nombre": "Administración de Medicación Intravenosa (Bolo vs. Perfusión)",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Administración de fármacos directamente en el torrente sanguíneo.",
    "indicaciones": [
      "Necesidad de efecto rápido",
      "Fármacos que no se absorben por otras vías",
      "Pacientes inconscientes o en NPO"
    ],
    "contraindicaciones": [
      "Fármacos no diseñados para vía IV",
      "Incompatibilidad con fluidos concurrentes"
    ],
    "maneraRealizarlo": [
      "Verificar los 10 correctos de la administración de medicamentos.",
      "Bolo (Push): Administrar el medicamento directamente con jeringa en el puerto de inyección más cercano al paciente. Hacerlo lentamente (generalmente 1-5 minutos según el fármaco).",
      "Perfusión (Intermitente/Continua): Diluir el medicamento en un volumen mayor (ej. 50-100 ml de SS 0.9% o D5W) y administrar en un tiempo determinado (ej. 30-60 min) usando microgotero o bomba.",
      "Lavado de vía (Flush): Antes y después de administrar, lavar la vía con 3-5 ml de suero fisiológico. Si se administran múltiples medicamentos, lavar SIEMPRE entre ellos para evitar precipitados (incompatibilidad)."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Conocer la velocidad de administración y dilución adecuada de cada fármaco. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar signos de flebitis química o extravasación (especialmente con vesicantes). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Comprobar siempre la permeabilidad de la vía antes de administrar. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Medicamento preparado",
      "Jeringas con suero fisiológico para lavado",
      "Torundas con alcohol",
      "Guantes limpios",
      "Buretrol o bomba de infusión (si es perfusión)"
    ]
  },
  {
    "id": "proc_intraosea",
    "nombre": "Manejo de la Vía Intraósea (Acceso de Emergencia)",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Acceso vascular de emergencia a través de la cavidad medular del hueso.",
    "indicaciones": [
      "Paro cardiorrespiratorio",
      "Shock severo",
      "Imposibilidad de acceso venoso periférico en < 90 segundos o tras 3 intentos (especialmente en pediatría)"
    ],
    "contraindicaciones": [
      "Fractura en el hueso elegido",
      "Infección en el sitio de punción",
      "Intento previo en el mismo hueso",
      "Osteogénesis imperfecta"
    ],
    "maneraRealizarlo": [
      "Sitios comunes: Tibia proximal (elección), tibia distal, fémur distal, húmero proximal.",
      "Posicionar la extremidad.",
      "Antisepsia amplia del sitio.",
      "Identificar los puntos anatómicos (ej. tibia proximal: 1-2 cm medial a la tuberosidad tibial).",
      "Insertar la aguja intraósea (manual o con taladro) perpendicular al hueso con presión firme y rotación.",
      "Detenerse al sentir una pérdida repentina de resistencia (\"pop\").",
      "Retirar el estilete.",
      "Aspirar para confirmar retorno de médula ósea (no siempre presente).",
      "Lavar con 5-10 ml de suero fisiológico (puede ser doloroso en pacientes conscientes, considerar lidocaína previa según protocolo).",
      "Fijar la aguja y conectar el sistema de infusión."
    ],
    "tipoTecnica": "Estéril (inserción)",
    "cuidadosEnfermeria": [
      "Intervención: Es un acceso temporal (máximo 24 horas). Buscar acceso venoso definitivo lo antes posible. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Cualquier medicamento o fluido IV puede administrarse por vía intraósea. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar signos de extravasación (hinchazón del miembro) o síndrome compartimental. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Dispositivo intraóseo (agujas manuales o taladro tipo EZ-IO)",
      "Antiséptico",
      "Jeringa con suero fisiológico",
      "Sistema de fijación",
      "Guantes estériles"
    ]
  },
  {
    "id": "proc_npt",
    "nombre": "Preparación y Cuidado de la Nutrición Parenteral Total (NPT)",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Administración de nutrientes (carbohidratos, proteínas, lípidos, vitaminas) por vía intravenosa central.",
    "indicaciones": [
      "Tracto gastrointestinal no funcional",
      "Obstrucción intestinal",
      "Fístulas de alto débito",
      "Desnutrición severa preoperatoria"
    ],
    "contraindicaciones": [
      "Tracto gastrointestinal funcionante (preferir nutrición enteral)",
      "Inestabilidad hemodinámica severa"
    ],
    "maneraRealizarlo": [
      "La preparación se realiza en farmacia bajo campana de flujo laminar.",
      "Verificar la bolsa de NPT: paciente, componentes, fecha de caducidad, integridad de la bolsa (sin precipitados ni separación de fases).",
      "Proteger la bolsa de la luz si contiene vitaminas fotosensibles.",
      "Utilizar un lumen EXCLUSIVO del catéter venoso central para la NPT.",
      "Conectar utilizando técnica aséptica estricta.",
      "Administrar SIEMPRE con bomba de infusión.",
      "Cambiar el equipo de infusión y la bolsa cada 24 horas."
    ],
    "tipoTecnica": "Aséptica estricta",
    "cuidadosEnfermeria": [
      "Intervención: Control estricto de glucemia capilar (riesgo de hiper/hipoglucemia). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: NUNCA administrar medicamentos, extraer sangre ni medir PVC por el lumen de la NPT. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar signos de infección (la NPT es un excelente medio de cultivo). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Control de peso diario y balance de líquidos. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado."
    ],
    "materialNecesario": [
      "Bolsa de NPT",
      "Equipo de infusión opaco (si requiere protección de luz)",
      "Bomba de infusión",
      "Guantes estériles, mascarilla, clorhexidina (para la conexión)"
    ]
  },
  {
    "id": "proc_retirada_flebitis",
    "nombre": "Retirada de Accesos Vasculares y Prevención de Flebitis",
    "categoria": "Accesos Vasculares y Terapia Infusional",
    "uso": "Extracción segura de catéteres y evaluación de complicaciones locales.",
    "indicaciones": [
      "Fin del tratamiento",
      "Sospecha de infección/flebitis",
      "Extravasación",
      "Tiempo máximo de permanencia cumplido (según protocolo institucional)"
    ],
    "contraindicaciones": [
      "Ninguna absoluta (precaución en pacientes con coagulopatías)"
    ],
    "maneraRealizarlo": [
      "Higiene de manos y guantes limpios.",
      "Cerrar la infusión.",
      "Retirar el apósito y esparadrapo suavemente (usar removedor de adhesivo si es necesario).",
      "Colocar una gasa seca sobre el sitio de inserción.",
      "Retirar el catéter con un movimiento suave y continuo, paralelo a la piel.",
      "Aplicar presión directa sobre el sitio con la gasa durante 2-3 minutos (más tiempo si usa anticoagulantes).",
      "Inspeccionar el catéter extraído (asegurar que esté íntegro).",
      "Evaluar el sitio de punción usando la Escala Visual de Flebitis (Maddox).",
      "Colocar un apósito o curita."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Escala de Maddox (Flebitis): 0 (Sin síntomas), 1 (Eritema con/sin dolor), 2 (Dolor, eritema y/o edema), 3 (Dolor, eritema, cordón venoso palpable), 4 (Igual a 3 + cordón >2.5cm, drenaje purulento). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Si hay sospecha de infección asociada a catéter, cortar la punta con tijeras estériles y enviar a cultivo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Documentar el motivo de retirada y el estado del sitio. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Guantes limpios",
      "Gasas estériles",
      "Apósito o curita",
      "Tijeras estériles y frasco de cultivo (si se sospecha infección)"
    ]
  },
  {
    "id": "proc_foley",
    "nombre": "Sondaje Vesical Permanente (Foley) y Evacuante",
    "categoria": "Eliminación y Drenajes",
    "uso": "Drenaje continuo o intermitente de la vejiga urinaria.",
    "indicaciones": [
      "Retención urinaria aguda o crónica",
      "Control estricto de diuresis en pacientes críticos",
      "Cirugía urológica o pélvica",
      "Curación de úlceras sacras en pacientes incontinentes"
    ],
    "contraindicaciones": [
      "Trauma uretral sospechado (sangre en meato, fractura de pelvis)",
      "Prostatitis aguda",
      "Infección uretral aguda"
    ],
    "maneraRealizarlo": [
      "Posición: Decúbito supino con piernas flexionadas y separadas (mujer) o estiradas (hombre).",
      "Asepsia previa: Lavado de la zona genital con agua y jabón usando guantes no estériles.",
      "Campo estéril: Abrir el equipo, colocarse guantes estériles y preparar el campo fenestrado.",
      "Antisepsia: Limpiar el meato urinario con gasas impregnadas en antiséptico (clorhexidina acuosa).",
      "Elección de sonda: Seleccionar el calibre adecuado (generalmente 14-16 French en adultos).",
      "Comprobación del balón: Inyectar aire o agua en la vía del balón para verificar integridad. Desinflar.",
      "Lubricación: Aplicar abundante gel urológico anestésico en la punta de la sonda (y en la uretra en hombres).",
      "Inserción: Introducir la sonda suavemente por el meato hasta obtener retorno de orina. En hombres, colocar el pene en ángulo de 90°.",
      "Fijación interna: Al salir orina, introducir 2-3 cm más. Inflar el balón EXCLUSIVAMENTE con agua bidestilada (nunca solución salina para evitar cristalización) con el volumen indicado (ej. 10cc).",
      "Tracción y conexión: Traccionar suavemente hasta sentir resistencia. Conectar a la bolsa colectora en circuito cerrado.",
      "Fijación externa: Fijar la sonda en la cara interna del muslo (mujeres) o región suprapúbica/muslo (hombres)."
    ],
    "tipoTecnica": "Estéril (Aséptica estricta)",
    "cuidadosEnfermeria": [
      "Intervención: Nunca inflar el balón si no hay retorno de orina. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Mantener la bolsa colectora siempre por debajo del nivel de la vejiga para evitar reflujo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Aseo perineal diario y vaciado regular de la bolsa colectora. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Sonda Foley (calibre adecuado en French)",
      "Bolsa colectora de circuito cerrado",
      "Guantes estériles y no estériles",
      "Gasas y antiséptico (clorhexidina acuosa)",
      "Lubricante urológico anestésico",
      "Jeringa de 10cc y Agua bidestilada"
    ]
  },
  {
    "id": "proc_balance_hidrico",
    "nombre": "Balance Hídrico Estricto (Ingresos y Egresos)",
    "categoria": "Eliminación y Drenajes",
    "uso": "Cuantificación exacta de los líquidos administrados y eliminados para evaluar el estado de hidratación.",
    "indicaciones": [
      "Pacientes críticos (UCI)",
      "Insuficiencia renal o cardíaca",
      "Postoperatorio mayor",
      "Deshidratación severa",
      "Terapia diurética intensiva"
    ],
    "contraindicaciones": [
      "Ninguna. Requiere indicación médica para ser \"estricto\"."
    ],
    "maneraRealizarlo": [
      "Ingresos (Aportes): Registrar todo líquido administrado (Vía oral, enteral, fluidoterapia IV, medicación IV, hemoderivados).",
      "Egresos (Pérdidas): Cuantificar orina (diuresis), deposiciones (si son líquidas), vómitos, aspirado gástrico, drenajes quirúrgicos, sangrado.",
      "Pérdidas Insensibles: Calcular y sumar las pérdidas por piel y respiración (Fórmula estándar: 0.5 ml/kg/h).",
      "Ajustes por fiebre/polipnea: Sumar 0.2 ml/kg/h por cada 0.1°C sobre 37°C, y 1 ml/h por cada respiración sobre 20 rpm.",
      "Cálculo final: Balance = Ingresos Totales - Egresos Totales (incluyendo pérdidas insensibles).",
      "Interpretación: Balance positivo (retiene líquidos), Balance negativo (pierde líquidos), Balance neutro (equilibrio)."
    ],
    "tipoTecnica": "Limpia (Registro clínico)",
    "cuidadosEnfermeria": [
      "Intervención: El registro debe ser exacto y horario en pacientes críticos. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Pesar pañales o apósitos si es necesario (1 gramo = 1 ml). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Avisar al médico si hay un balance positivo o negativo extremo no esperado. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Hoja de registro de balance hídrico",
      "Recipientes medidores (jarras, probetas)",
      "Báscula (para pesar pañales/apósitos)",
      "Calculadora"
    ]
  },
  {
    "id": "proc_drenajes_quirurgicos",
    "nombre": "Manejo y Medición de Drenajes Quirúrgicos",
    "categoria": "Eliminación y Drenajes",
    "uso": "Evacuación de colecciones líquidas o gaseosas de una cavidad corporal o lecho quirúrgico.",
    "indicaciones": [
      "Postoperatorio de cirugías mayores",
      "Prevención de hematomas o seromas",
      "Drenaje de abscesos",
      "Neumotórax/Hemotórax (Pleur-evac)"
    ],
    "contraindicaciones": [
      "Retirada sin orden médica"
    ],
    "maneraRealizarlo": [
      "Higiene de manos y colocación de guantes limpios.",
      "Identificar el tipo de drenaje: Pasivo (Penrose) o Activo/Aspirativo (Jackson-Pratt, Redon, Hemovac).",
      "Para vaciar drenajes activos: Pinzar el tubo cerca del paciente (si el protocolo lo indica) para no perder el vacío en la cavidad.",
      "Abrir el tapón del reservorio y vaciar el contenido en un recipiente medidor sin tocar los bordes.",
      "Restablecer el vacío: Comprimir el reservorio (Jackson-Pratt/Hemovac) completamente y colocar el tapón mientras está comprimido.",
      "Despinzar el tubo.",
      "Medir la cantidad exacta a nivel de los ojos.",
      "Observar características del líquido: Seroso (claro/amarillento), Sanguinolento/Hemático (rojo), Serosanguinolento (rosado), Purulento (opaco/espeso), Bilioso (verde/amarillo)."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Mantener el drenaje por debajo del nivel de la herida. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar la permeabilidad (que no esté acodado o coagulado). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Avisar si hay un cambio brusco en la cantidad o color del drenaje (ej. sangrado activo repentino). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Guantes limpios",
      "Recipiente medidor graduado",
      "Gasas estériles y antiséptico (para limpiar el tapón si es necesario)",
      "Hoja de registro"
    ]
  },
  {
    "id": "proc_sng_descompresiva",
    "nombre": "Sondaje Nasogástrico (SNG) con Fines Descompresivos",
    "categoria": "Eliminación y Drenajes",
    "uso": "Drenaje de contenido gástrico y aire para aliviar la presión abdominal.",
    "indicaciones": [
      "Obstrucción intestinal",
      "Íleo paralítico",
      "Lavado gástrico",
      "Prevención de broncoaspiración en pacientes intubados"
    ],
    "contraindicaciones": [
      "Trauma maxilofacial severo",
      "Fractura de base de cráneo",
      "Atresia de coanas",
      "Varices esofágicas severas"
    ],
    "maneraRealizarlo": [
      "Posición: Paciente en Fowler alta (45-90 grados).",
      "Medición: Desde la punta de la nariz, al lóbulo de la oreja, y al apéndice xifoides. Marcar la sonda.",
      "Lubricar los primeros 10-15 cm.",
      "Introducir por la fosa nasal dirigiéndola hacia atrás y abajo.",
      "Al llegar a la orofaringe, pedir al paciente que trague (agua o saliva) y avanzar con cada deglución.",
      "Verificación (CRÍTICO): 1) Aspirar contenido gástrico y medir pH (< 5 indica estómago). 2) Auscultar epigastrio inyectando 20cc de aire. 3) Rx de abdomen (Gold Standard).",
      "Fijación: Fijar al puente nasal con esparadrapo.",
      "Conexión: Conectar a bolsa colectora a gravedad o a sistema de aspiración continua/intermitente a baja presión."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Retirar inmediatamente la sonda si el paciente tose incontrolablemente, presenta cianosis o disnea durante la inserción. Razón: Estos signos clínicos indican que la sonda se ha desviado inadvertidamente hacia la vía respiratoria (tráquea/bronquios), lo cual es una emergencia pulmonar.",
      "Intervención: Mantener la permeabilidad de la sonda realizando lavados con 20 a 30 cc de agua destilada o suero fisiológico cada 4-6 horas o según el protocolo institucional. Razón: Prevenir la obstrucción mecánica del lumen por acumulación progresiva de restos gástricos secos o mucosidad espesa, garantizando así su continua y correcta función descompresiva.",
      "Intervención: Realizar estricto aseo de la mucosa oral (enjuagues) y cambio frecuente de la fijación (esparadrapo) en el puente nasal alternando los puntos de anclaje. Razón: La respiración bucal forzada favorece sequedad y aparición de infecciones orales (ej. candidiasis o mucositis); además, la presión sostenida y el roce en el delicado cartílago nasal pueden provocar úlceras por presión graves mecánicas en pocas horas.",
      "Intervención: Corroborar estrictamente la posición intraluminal midiendo el pH del aspirado gástrico (pH < 5) antes de instilar alimentos o grandes volúmenes de líquidos. Razón: Asegura que los fluidos entren al estómago y no a los pulmones, previniendo eficazmente una broncoaspiración mortal, neumonitis química o neumonía asociada a ventilación/aspiración.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado."
    ],
    "materialNecesario": [
      "Sonda Levin o Salem Sump (calibre 14-18Fr adultos)",
      "Lubricante hidrosoluble",
      "Jeringa de 50cc (pico Toomey)",
      "Estetoscopio",
      "Esparadrapo y bolsa colectora"
    ]
  },
  {
    "id": "proc_ostomias",
    "nombre": "Cuidados y Manejo de Ostomías (Colostomía/Ileostomía)",
    "categoria": "Eliminación y Drenajes",
    "uso": "Mantenimiento de la higiene y protección de la piel en estomas intestinales.",
    "indicaciones": [
      "Pacientes portadores de colostomía o ileostomía",
      "Cambio rutinario del dispositivo",
      "Fugas de efluente"
    ],
    "contraindicaciones": [
      "Ninguna"
    ],
    "maneraRealizarlo": [
      "Retirar el dispositivo antiguo suavemente, de arriba hacia abajo, sujetando la piel.",
      "Limpiar el estoma y la piel periestomal con agua tibia y jabón neutro usando esponjas suaves (no usar gasas que dejen pelusa).",
      "Secar la piel periestomal con toques suaves (sin frotar).",
      "Valorar el estoma (debe ser rojo/rosado y húmedo) y la piel periestomal (buscar irritación, maceración o dermatitis).",
      "Medir el diámetro del estoma con la plantilla.",
      "Recortar la barrera cutánea (disco) dejando 1-2 mm de margen respecto al estoma.",
      "Aplicar pasta protectora o polvo de ostomía si la piel está irritada o hay desniveles.",
      "Retirar el papel protector y pegar el disco sobre la piel, presionando suavemente de adentro hacia afuera.",
      "Acoplar la bolsa recolectora (si es sistema de dos piezas) y cerrar el extremo inferior."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Vaciar la bolsa cuando esté a 1/3 o 1/2 de su capacidad para evitar que el peso despegue el disco. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Un estoma pálido, oscuro o negro indica isquemia/necrosis y es una urgencia médica. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Educar al paciente sobre el autocuidado. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Dispositivo de ostomía (bolsa y disco/barrera)",
      "Plantilla medidora y tijeras curvas",
      "Agua tibia, jabón neutro, esponjas suaves",
      "Pasta protectora o polvo (opcional)",
      "Bolsa para desechos"
    ]
  },
  {
    "id": "proc_irrigacion_vesical",
    "nombre": "Irrigación Vesical Continua (Lavado Vesical)",
    "categoria": "Eliminación y Drenajes",
    "uso": "Lavado continuo de la vejiga para prevenir la formación de coágulos y mantener la permeabilidad de la sonda.",
    "indicaciones": [
      "Postoperatorio de resección transuretral de próstata (RTUP)",
      "Hematuria macroscópica con coágulos",
      "Cirugías vesicales"
    ],
    "contraindicaciones": [
      "Rotura vesical sospechada"
    ],
    "maneraRealizarlo": [
      "Requiere una sonda Foley de 3 vías (una para inflar balón, una para drenaje, una para irrigación).",
      "Conectar el suero de irrigación (generalmente Suero Fisiológico de 3000 ml) al sistema de irrigación.",
      "Purgar el sistema para eliminar el aire.",
      "Conectar el sistema a la vía de irrigación de la sonda de 3 vías.",
      "Regular el ritmo de goteo: El objetivo es que el líquido drenado sea claro o ligeramente rosado (lavado de carne). Si es muy hemático, aumentar el ritmo; si es claro, disminuirlo.",
      "Vigilar constantemente que el volumen drenado sea igual o mayor al volumen irrigado."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: Cálculo de Orina Real: Orina Real = Volumen Total Drenado en la bolsa - Volumen Total Irrigado. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Si el paciente presenta dolor intenso, espasmos vesicales o el líquido no drena, detener la irrigación inmediatamente (posible obstrucción por coágulo) y avisar al médico. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Nunca dejar que se vacíe completamente el suero de irrigación para evitar entrada de aire. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Sonda Foley de 3 vías",
      "Suero Fisiológico para irrigación (bolsas de 3000 ml)",
      "Equipo de irrigación (macrogotero especial)",
      "Soporte de suero",
      "Bolsa colectora de gran capacidad"
    ]
  },
  {
    "id": "proc_diuresis_horaria",
    "nombre": "Control de Diuresis Horaria",
    "categoria": "Eliminación y Drenajes",
    "uso": "Monitorización estricta y hora a hora de la producción de orina.",
    "indicaciones": [
      "Shock (hipovolémico, séptico, cardiogénico)",
      "Fallo renal agudo",
      "Pacientes en UCI",
      "Uso de drogas vasoactivas o diuréticos de asa en infusión"
    ],
    "contraindicaciones": [
      "Ninguna"
    ],
    "maneraRealizarlo": [
      "Asegurar que el paciente tenga una sonda vesical conectada a un sistema recolector con urómetro (cámara medidora rígida).",
      "Cada hora en punto, leer la cantidad de orina en la cámara del urómetro a nivel de los ojos.",
      "Registrar el valor en la gráfica de constantes/balance.",
      "Abrir la llave del urómetro para vaciar la orina hacia la bolsa colectora principal y cerrar la llave inmediatamente.",
      "Calcular el Gasto Urinario (ml/kg/hr) usando el peso ideal del paciente."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Alerta Clínica: Si el Gasto Urinario es < 0.5 ml/kg/hr durante 2 horas consecutivas (Oliguria), avisar al médico inmediatamente. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Verificar siempre que la sonda no esté acodada y que la bolsa esté por debajo de la vejiga antes de asumir oliguria. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Mantener el sistema cerrado para prevenir ITU. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Sonda vesical instalada",
      "Bolsa colectora con urómetro",
      "Hoja de registro",
      "Guantes limpios"
    ]
  },
  {
    "id": "proc_enemas",
    "nombre": "Administración de Enemas (Limpieza o Medicados)",
    "categoria": "Eliminación y Drenajes",
    "uso": "Introducción de líquidos en el recto y colon sigmoide para promover la defecación o administrar medicación.",
    "indicaciones": [
      "Estreñimiento severo / Fecaloma",
      "Preparación para cirugías o endoscopias digestivas bajas",
      "Administración de medicamentos (ej. Kayexalate para hiperpotasemia)"
    ],
    "contraindicaciones": [
      "Obstrucción intestinal mecánica",
      "Perforación intestinal sospechada",
      "Cirugía de colon reciente",
      "Hemorragia digestiva baja activa"
    ],
    "maneraRealizarlo": [
      "Preparar la solución prescrita a temperatura templada (37-40°C).",
      "Posición: Colocar al paciente en posición de Sims izquierda (decúbito lateral izquierdo con la pierna derecha flexionada).",
      "Lubricar la cánula o sonda rectal (5-8 cm).",
      "Purgar el sistema para eliminar el aire.",
      "Separar los glúteos e introducir la cánula suavemente en dirección al ombligo (7-10 cm en adultos).",
      "Elevar el irrigador a unos 30-45 cm por encima del ano y abrir la llave.",
      "Administrar el líquido lentamente. Si el paciente refiere dolor o calambres, detener la infusión temporalmente o bajar el irrigador.",
      "Pedir al paciente que retenga el líquido el tiempo indicado (5-10 min para limpieza, más tiempo para retención/medicados)."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: La posición de Sims izquierda facilita el flujo del líquido hacia el colon sigmoide y descendente por gravedad. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: No forzar la entrada de la cánula si hay resistencia. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Proporcionar intimidad y tener cerca la cuña o acceso rápido al baño. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Equipo de enema (irrigador o bolsa prellenada)",
      "Solución prescrita",
      "Lubricante hidrosoluble",
      "Guantes limpios",
      "Empapador/Protector de cama",
      "Cuña o inodoro"
    ]
  },
  {
    "id": "proc_dialisis_peritoneal",
    "nombre": "Cuidados del Catéter de Diálisis Peritoneal",
    "categoria": "Eliminación y Drenajes",
    "uso": "Mantenimiento del acceso peritoneal para terapia de reemplazo renal.",
    "indicaciones": [
      "Pacientes con Enfermedad Renal Crónica en programa de diálisis peritoneal"
    ],
    "contraindicaciones": [
      "Manipulación sin técnica estéril estricta"
    ],
    "maneraRealizarlo": [
      "Curación del orificio de salida (diaria o según protocolo):",
      "Higiene de manos exhaustiva y uso de mascarilla.",
      "Retirar el apósito antiguo y observar el orificio (buscar enrojecimiento, supuración, dolor).",
      "Limpiar con suero fisiológico y jabón neutro o antiséptico (según protocolo del centro), desde el orificio hacia afuera en círculos.",
      "Secar perfectamente con gasas estériles.",
      "Inmovilizar el catéter con esparadrapo para evitar tirones y traumatismos en el orificio.",
      "Cubrir con apósito estéril transpirable."
    ],
    "tipoTecnica": "Estéril",
    "cuidadosEnfermeria": [
      "Intervención: Signo de Alarma CRÍTICO: Líquido de drenaje turbio indica Peritonitis. Avisar inmediatamente y tomar muestra para cultivo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Evitar inmersión en baños, piscinas o jacuzzis (preferir ducha). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar el peso diario y el balance de líquidos de los recambios. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Gasas estériles",
      "Suero fisiológico y antiséptico/jabón",
      "Apósito estéril",
      "Esparadrapo hipoalergénico",
      "Mascarilla y guantes estériles"
    ]
  },
  {
    "id": "proc_urocultivo_sonda",
    "nombre": "Recolección de Muestras Estériles (Urocultivo por Sonda)",
    "categoria": "Eliminación y Drenajes",
    "uso": "Obtención de orina estéril para cultivo microbiológico en pacientes portadores de sonda vesical.",
    "indicaciones": [
      "Sospecha de Infección del Tracto Urinario (ITU) en paciente sondado",
      "Control post-tratamiento antibiótico"
    ],
    "contraindicaciones": [
      "Desconectar la sonda de la bolsa colectora para tomar la muestra (rompe el circuito cerrado y causa infección)"
    ],
    "maneraRealizarlo": [
      "Pinzar la sonda vesical unos centímetros por debajo del puerto de toma de muestras durante 15-30 minutos para que se acumule orina fresca.",
      "Higiene de manos y colocación de guantes limpios.",
      "Desinfectar el puerto de toma de muestras de la sonda con alcohol al 70% o clorhexidina.",
      "Insertar una jeringa estéril (con o sin aguja, según el diseño del puerto) en el puerto de muestreo.",
      "Aspirar 5-10 ml de orina.",
      "Retirar la jeringa y transferir la orina al frasco estéril de urocultivo sin tocar los bordes.",
      "DESPINZAR la sonda inmediatamente.",
      "Rotular el frasco y enviar al laboratorio."
    ],
    "tipoTecnica": "Aséptica",
    "cuidadosEnfermeria": [
      "Intervención: NUNCA tomar la muestra de la bolsa colectora (la orina está estancada y contaminada). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Olvidar despinzar la sonda puede causar retención urinaria aguda, reflujo y daño renal. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Enviar la muestra al laboratorio en menos de 1 hora o refrigerar. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Pinza de clampaje",
      "Torundas con alcohol/antiséptico",
      "Jeringa estéril de 10cc",
      "Frasco estéril para urocultivo",
      "Guantes limpios"
    ]
  },
  {
    "id": "proc_oxigeno_bajo_flujo",
    "nombre": "Oxigenoterapia de Bajo Flujo",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Manejo inicial del paciente estable que requiere suplemento de oxígeno.",
    "indicaciones": [
      "Hipoxemia leve a moderada",
      "Dificultad respiratoria leve",
      "Soporte postoperatorio"
    ],
    "contraindicaciones": [
      "Pacientes que requieren FiO2 exacta (ej. EPOC retenedor de CO2)",
      "Hipoxemia severa que requiere ventilación mecánica"
    ],
    "maneraRealizarlo": [
      "Cánula Nasal (Bigotera): Ajustar flujo de 1 a 5 LPM (FiO2 24-40%). Colocar las puntas en las narinas y ajustar detrás de las orejas.",
      "Mascarilla Simple: Ajustar flujo de 5 a 8 LPM (FiO2 40-60%). Colocar sobre nariz y boca.",
      "Mascarilla con Reservorio (No recirculante): Ajustar flujo a 10-15 LPM para mantener la bolsa inflada (FiO2 hasta 90-100%). Fundamental para pacientes críticos."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Humidificar el oxígeno si el flujo es mayor a 4 LPM. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar puntos de presión (orejas, mejillas) para prevenir úlceras. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Evaluar la saturación de oxígeno (SatO2) y el patrón respiratorio continuamente. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Fuente de oxígeno y flujómetro",
      "Humidificador y agua bidestilada",
      "Cánula nasal o mascarilla (simple/reservorio)"
    ]
  },
  {
    "id": "proc_oxigeno_alto_flujo",
    "nombre": "Oxigenoterapia de Alto Flujo (Sistema Venturi)",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Administración de oxígeno con una concentración (FiO2) exacta y constante.",
    "indicaciones": [
      "Pacientes con EPOC (retenedores de CO2)",
      "Hipoxemia moderada que requiere control estricto de FiO2"
    ],
    "contraindicaciones": [
      "Necesidad de intubación inminente"
    ],
    "maneraRealizarlo": [
      "Seleccionar el dispositivo (válvula de color) según la FiO2 deseada (ej. 24%, 28%, 35%, 40%, 50%).",
      "Ajustar el flujómetro al litraje exacto indicado en la válvula seleccionada.",
      "Ensamblar el sistema (mascarilla, tubo corrugado, válvula Venturi).",
      "Colocar la mascarilla al paciente asegurando un buen sellado."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: No tapar los orificios de arrastre de aire de la válvula Venturi, ya que alteraría la FiO2. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Mantener el tubo corrugado libre de acodaduras y condensación de agua. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Monitorizar SatO2 y gases arteriales si está indicado. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Mascarilla Venturi con set de válvulas de colores",
      "Tubo corrugado",
      "Fuente de oxígeno y flujómetro"
    ]
  },
  {
    "id": "proc_aspiracion_secreciones",
    "nombre": "Aspiración de Secreciones (Técnica Abierta y Cerrada)",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Eliminación de secreciones del tracto respiratorio para mantener la permeabilidad de la vía aérea.",
    "indicaciones": [
      "Secreciones visibles o audibles",
      "Desaturación por tapón mucoso",
      "Incapacidad del paciente para expectorar"
    ],
    "contraindicaciones": [
      "Broncoespasmo severo (relativa)",
      "Coagulopatía severa (relativa)"
    ],
    "maneraRealizarlo": [
      "Preoxigenar al paciente al 100% durante 1-2 minutos.",
      "Ajustar la presión del aspirador (80-120 mmHg en adultos).",
      "Técnica Abierta: Usar guantes estériles. Introducir la sonda sin aspirar hasta sentir resistencia o provocar tos. Retirar 1 cm y aspirar de forma intermitente mientras se retira la sonda con movimientos rotatorios.",
      "Técnica Cerrada: Usar el sistema integrado en el circuito del ventilador. Introducir la sonda envuelta en su funda y aspirar al retirar.",
      "Tiempo máximo de succión: 10-15 segundos por intento.",
      "Reoxigenar al paciente entre aspiraciones."
    ],
    "tipoTecnica": "Estéril (Abierta) / Aséptica (Cerrada)",
    "cuidadosEnfermeria": [
      "Intervención: Vigilar la frecuencia cardíaca y SatO2 durante el procedimiento (riesgo de bradicardia por reflejo vagal o hipoxemia). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Evaluar las características de las secreciones (cantidad, color, consistencia). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados.",
      "Intervención: Aplicar estrictamente los principios de asepsia durante la preparación. Razón: Minimiza la carga bacteriana local y previene infecciones cruzadas o asociadas a la atención en salud (IAAS)."
    ],
    "materialNecesario": [
      "Sonda de aspiración (abierta) o sistema cerrado",
      "Aspirador de vacío",
      "Guantes estériles (técnica abierta)",
      "Gafas y mascarilla de protección",
      "Suero fisiológico para lavar la sonda"
    ]
  },
  {
    "id": "proc_cuidados_traqueostomia",
    "nombre": "Cuidados de la Traqueostomía",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Mantenimiento de la permeabilidad y prevención de infecciones en pacientes con soporte respiratorio prolongado.",
    "indicaciones": [
      "Paciente portador de traqueostomía",
      "Secreciones acumuladas en el estoma",
      "Cambio programado de cintas o cánula interna"
    ],
    "contraindicaciones": [
      "Manipulación sin técnica aséptica"
    ],
    "maneraRealizarlo": [
      "Higiene de manos y colocación de equipo de protección personal.",
      "Aspirar secreciones si es necesario antes de la cura.",
      "Retirar el apósito sucio.",
      "Limpieza de la cánula interna: Retirar, lavar con suero fisiológico (y cepillo si es reutilizable) o reemplazar por una nueva.",
      "Cuidado del estoma: Limpiar la piel alrededor del estoma con suero fisiológico y gasas estériles (técnica aséptica, ej. protocolo Reina Sofía). Secar bien.",
      "Cambio de cintas de fijación: Realizarlo entre dos personas para evitar la decanulación accidental. Dejar espacio de un dedo entre la cinta y el cuello.",
      "Colocar un apósito estéril nuevo (babero) bajo las aletas de la cánula."
    ],
    "tipoTecnica": "Estéril / Aséptica estricta",
    "cuidadosEnfermeria": [
      "Intervención: Mantener siempre un obturador y una cánula de repuesto (del mismo número y uno menor) en la cabecera del paciente. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar signos de infección en el estoma o enfisema subcutáneo. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados.",
      "Intervención: Aplicar estrictamente los principios de asepsia durante la preparación. Razón: Minimiza la carga bacteriana local y previene infecciones cruzadas o asociadas a la atención en salud (IAAS)."
    ],
    "materialNecesario": [
      "Equipo de curación estéril (gasas, pinzas)",
      "Suero fisiológico",
      "Cintas de fijación para traqueostomía",
      "Apósito para traqueostomía (babero)",
      "Cánula interna de repuesto (si aplica)",
      "Guantes estériles y limpios"
    ]
  },
  {
    "id": "proc_nebuloterapia",
    "nombre": "Nebuloterapia y Aerosolterapia",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Administración de medicamentos en forma de aerosol directamente al tracto respiratorio.",
    "indicaciones": [
      "Broncoespasmo (asma, EPOC)",
      "Inflamación de la vía aérea",
      "Necesidad de fluidificar secreciones"
    ],
    "contraindicaciones": [
      "Alergia al fármaco a nebulizar"
    ],
    "maneraRealizarlo": [
      "Preparar el medicamento (ej. Salbutamol, Ipratropio) diluido en suero fisiológico (generalmente hasta un volumen total de 3-5 ml).",
      "Colocar la mezcla en el reservorio del nebulizador.",
      "Conectar el nebulizador a la fuente de oxígeno o aire comprimido.",
      "Ajustar el flujo a 6-8 LPM hasta observar una niebla fina y constante.",
      "Colocar la mascarilla o boquilla al paciente.",
      "Instruir al paciente para que respire por la boca de forma lenta y profunda hasta que se acabe el líquido (aprox. 10-15 min)."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Evaluar la frecuencia cardíaca antes y después (los broncodilatadores pueden causar taquicardia). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Vigilar la aparición de temblores o palpitaciones. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Lavar y secar el equipo de nebulización después de cada uso para evitar contaminación bacteriana. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Mascarilla de nebulización o boquilla con reservorio",
      "Fármaco prescrito",
      "Suero fisiológico y jeringa",
      "Fuente de O2 o aire comprimido"
    ]
  },
  {
    "id": "proc_fisioterapia_respiratoria",
    "nombre": "Fisioterapia Respiratoria y Drenaje Postural",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Facilitar la movilización y expulsión de secreciones del árbol traqueobronquial.",
    "indicaciones": [
      "Acumulación de secreciones",
      "Atelectasias",
      "Fibrosis quística",
      "Bronquiectasias",
      "Especialmente útil en Pediatría o Neumología"
    ],
    "contraindicaciones": [
      "Hemoptisis reciente",
      "Fracturas costales",
      "Neumotórax no drenado",
      "Inestabilidad hemodinámica",
      "Aumento de la presión intracraneal"
    ],
    "maneraRealizarlo": [
      "Drenaje Postural: Colocar al paciente en posiciones específicas que utilicen la gravedad para drenar diferentes segmentos pulmonares (ej. Trendelenburg para bases pulmonares). Mantener la posición 10-15 minutos.",
      "Percusión (Clapping): Con las manos en forma de copa, percutir rítmicamente la pared torácica sobre el segmento a drenar durante 3-5 minutos. Evitar columna, esternón y riñones.",
      "Vibración: Aplicar presión vibratoria manual sobre el tórax durante la espiración del paciente.",
      "Estimular la tos productiva al finalizar."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Realizar el procedimiento antes de las comidas o al menos 1.5 - 2 horas después para evitar vómitos y aspiración. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Auscultar los pulmones antes y después para evaluar la eficacia. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Suspender si el paciente presenta disnea severa, cianosis o dolor. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Almohadas para posicionamiento",
      "Cama articulada",
      "Fonendoscopio",
      "Pañuelos desechables y recipiente para esputo"
    ]
  },
  {
    "id": "proc_manejo_idm",
    "nombre": "Manejo del Inhalador de Dosis Medida (IDM)",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Administración eficiente de fármacos inhalados (broncodilatadores, corticoides).",
    "indicaciones": [
      "Asma",
      "EPOC",
      "Enfermedades reactivas de la vía aérea"
    ],
    "contraindicaciones": [
      "Incapacidad del paciente para cooperar (si no se usa aerocámara con mascarilla)"
    ],
    "maneraRealizarlo": [
      "Agitar el inhalador vigorosamente.",
      "Conectar el inhalador a la aerocámara (espaciador).",
      "Pedir al paciente que exhale completamente.",
      "Colocar la boquilla de la aerocámara en la boca del paciente (o la mascarilla sobre nariz y boca).",
      "Presionar el inhalador (un solo disparo/puff).",
      "Instruir al paciente para que inhale lenta y profundamente, y contenga la respiración durante 10 segundos.",
      "Si se requiere otro puff, esperar 1 minuto entre dosis.",
      "Enjuague bucal: Si el medicamento es un corticoide, el paciente DEBE enjuagarse la boca y escupir el agua al finalizar."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: El uso de aerocámara es fundamental para asegurar que el fármaco llegue a los pulmones y no se quede en la orofaringe. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: El enjuague bucal previene la candidiasis oral (algodoncillo). Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Educar al paciente sobre la técnica correcta, ya que suele ser incorrecta frecuentemente. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Inhalador de Dosis Medida (IDM)",
      "Aerocámara (espaciador) con o sin mascarilla",
      "Agua para enjuague bucal"
    ]
  },
  {
    "id": "proc_oximetria_capnografia",
    "nombre": "Oximetría de Pulso y Capnografía Básica",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Monitorización no invasiva de la saturación de oxígeno (SatO2) y el dióxido de carbono exhalado (EtCO2).",
    "indicaciones": [
      "Monitorización continua en pacientes críticos, anestesiados o con distrés respiratorio",
      "Evaluación rápida de la oxigenación"
    ],
    "contraindicaciones": [
      "Ninguna absoluta"
    ],
    "maneraRealizarlo": [
      "Oximetría: Limpiar el dedo del paciente (retirar esmalte si es necesario). Colocar el sensor de modo que la luz emisora y el receptor estén alineados. Esperar a que la onda pletismográfica sea regular para leer la SatO2.",
      "Capnografía: Conectar el sensor de capnografía al tubo endotraqueal o usar una cánula nasal especial para capnografía. Observar la curva y el valor numérico del EtCO2 (normal 35-45 mmHg)."
    ],
    "tipoTecnica": "Limpia",
    "cuidadosEnfermeria": [
      "Intervención: Factores que alteran la lectura de oximetría (según Bates): Esmalte de uñas (especialmente oscuro), frío/vasoconstricción, hipoperfusión (shock), movimiento excesivo, luz ambiental intensa. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Rotar el sitio del sensor de oximetría cada 4-6 horas para evitar lesiones por presión. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: La capnografía es el gold standard para confirmar la correcta intubación endotraqueal. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Oxímetro de pulso (sensor de dedo, lóbulo de oreja o frente)",
      "Monitor con módulo de capnografía",
      "Quitaesmalte (si aplica)"
    ]
  },
  {
    "id": "proc_asistencia_intubacion",
    "nombre": "Asistencia en la Intubación Endotraqueal",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Asegurar una vía aérea permeable y permitir la ventilación mecánica.",
    "indicaciones": [
      "Paro cardiorrespiratorio",
      "Insuficiencia respiratoria aguda severa",
      "Protección de la vía aérea (Glasgow < 8)",
      "Anestesia general"
    ],
    "contraindicaciones": [
      "Orden de no intubar (DNI)"
    ],
    "maneraRealizarlo": [
      "Rol del interno/enfermero: Tener todo el equipo listo (Checklist).",
      "Preparar el laringoscopio: Ensamblar la hoja y verificar que la luz funcione (probar pilas/foco).",
      "Preparar el Tubo Endotraqueal (TET): Tener listos varios calibres (ej. 7.0, 7.5, 8.0 para adultos). Insertar la guía metálica (fiador) sin que sobresalga de la punta del tubo.",
      "Preparar la jeringa: Conectar una jeringa de 10cc al balón de neumotaponamiento para probar que no tenga fugas, luego desinflarlo completamente.",
      "Preoxigenar al paciente con bolsa-válvula-mascarilla (Ambu) conectada a O2 al 100%.",
      "Asistir al médico durante la laringoscopia (ej. maniobra de BURP si se solicita).",
      "Una vez insertado el tubo, inflar el neumotaponamiento, retirar la guía y conectar al ventilador o Ambu.",
      "Fijar el tubo firmemente (con venda, esparadrapo o fijador comercial) anotando la marca de profundidad a nivel de la comisura labial."
    ],
    "tipoTecnica": "Aséptica / Estéril (manejo del tubo)",
    "cuidadosEnfermeria": [
      "Intervención: Confirmar la posición del tubo: Auscultación epigástrica (negativa) y pulmonar bilateral (positiva), capnografía (EtCO2), y Rx de tórax posterior. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Monitorizar signos vitales continuamente durante el procedimiento. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Tener listo el equipo de aspiración encendido y funcional. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado.",
      "Intervención: Documentar de forma veraz, legible y oportuna en la bitácora clínica. Razón: Proporciona evidencia legal, mejora la comunicación del equipo y asegura la continuidad de los cuidados."
    ],
    "materialNecesario": [
      "Laringoscopio con hojas curvas (Macintosh) y rectas (Miller)",
      "Tubos endotraqueales de varios calibres y guía metálica (fiador)",
      "Jeringa de 10cc",
      "Bolsa-válvula-mascarilla (Ambu) con reservorio y fuente de oxígeno",
      "Aspirador y sondas",
      "Material de fijación",
      "Fármacos de inducción/parálisis (preparados según indicación)"
    ]
  },
  {
    "id": "proc_muestra_esputo",
    "nombre": "Recolección de Muestra de Esputo (Baciloscopía)",
    "categoria": "Soporte Respiratorio y Manejo de Vía Aérea",
    "uso": "Obtención de muestra de secreción bronquial para diagnóstico de Tuberculosis (TB) u otras infecciones.",
    "indicaciones": [
      "Sintomático respiratorio (tos y flema por más de 15 días)",
      "Sospecha de tuberculosis pulmonar",
      "Neumonías atípicas"
    ],
    "contraindicaciones": [
      "Ninguna absoluta"
    ],
    "maneraRealizarlo": [
      "Instruir al paciente: La mejor muestra es la de \"primera mañana\".",
      "El paciente debe enjuagarse la boca solo con agua (sin pasta dental ni enjuagues) antes de la recolección.",
      "Pedir al paciente que inspire profundamente, retenga el aire un momento y luego realice un esfuerzo de tos profunda desde el pecho (no saliva).",
      "Expectorar directamente dentro del frasco estéril de boca ancha.",
      "Cerrar el frasco herméticamente de inmediato.",
      "Normativa GPC Tuberculosis: Generalmente se requieren 2 o 3 muestras seriadas."
    ],
    "tipoTecnica": "Limpia (con precauciones de transmisión por aire)",
    "cuidadosEnfermeria": [
      "Intervención: Medidas de bioseguridad: El personal debe usar mascarilla N95 si asiste directamente en la recolección en un paciente con sospecha de TB. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Realizar el procedimiento en una habitación bien ventilada o al aire libre si es posible. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Asegurarse de que la muestra sea esputo (mucopurulento) y no solo saliva. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Rotular el frasco correctamente y enviar al laboratorio lo antes posible. Razón: Garantiza la seguridad del paciente, optimiza el efecto terapéutico y minimiza la aparición de complicaciones yatrogénicas o fallos agudos.",
      "Intervención: Explicar el procedimiento al paciente de forma clara. Razón: Fomenta la cooperación, reduce la ansiedad basal del paciente y asegura el consentimiento informado."
    ],
    "materialNecesario": [
      "Frasco estéril de boca ancha (tapa rosca)",
      "Mascarilla N95 para el personal",
      "Guantes limpios",
      "Formulario de solicitud de baciloscopía"
    ]
  },
  {
    "id": "nutri1",
    "nombre": "Alimentación y Soporte Nutricional",
    "categoria": "Nutrición y Soporte Metabólico",
    "uso": "Ejecución de la nutrición según la vía de acceso y la condición del paciente.",
    "indicaciones": [
      "Pacientes con requerimientos nutricionales específicos",
      "Pacientes con ostomías",
      "Recién nacidos (Lactancia Materna)",
      "Pacientes que requieren hidratación intravenosa"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Alimentación del paciente: Incluye tanto la asistencia por vía oral como el manejo de la nutrición enteral.",
      "Manejo de Ostomías: Cuidado específico para pacientes con gastrostomías o ileostomías destinadas a la alimentación.",
      "Lactancia Materna: Educación, promoción y apoyo técnico para asegurar el apego precoz y el soporte nutricional del recién nacido.",
      "Hidratación: Control estricto de la administración de líquidos intravenosos y balance hídrico."
    ],
    "tipoTecnica": "Soporte Nutricional",
    "cuidadosEnfermeria": [
      "Monitorizar signos de intolerancia alimentaria",
      "Curación y mantenimiento de ostomías de alimentación",
      "Evaluación del balance hídrico estricto",
      "Fomentar técnica adecuada de lactancia materna"
    ],
    "materialNecesario": ["Fórmulas enterales", "Sondas o equipo de ostomía", "Soluciones intravenosas", "Equipo de venoclisis"]
  },
  {
    "id": "nutri2",
    "nombre": "Control Metabólico y Glucemia",
    "categoria": "Nutrición y Soporte Metabólico",
    "uso": "Monitorear el estado metabólico inmediato del paciente.",
    "indicaciones": [
      "Pacientes diabéticos",
      "Pacientes con alteraciones metabólicas crónicas o agudas",
      "Pacientes recibiendo nutrición parenteral"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Glicemias Capilares: Realización de la prueba y registro de valores según la prescripción.",
      "Administración de Insulina: Manejo farmacológico de acuerdo a los resultados de la glicemia."
    ],
    "tipoTecnica": "Control Metabólico",
    "cuidadosEnfermeria": [
      "Rotación de sitios de punción capilar",
      "Registro exacto de valores de glucemia",
      "Doble verificación en la administración de insulina",
      "Vigilancia de signos de hipoglucemia o hiperglucemia"
    ],
    "materialNecesario": ["Glucómetro", "Tiras reactivas", "Lancetas", "Insulina prescrita", "Jeringas de insulina"]
  },
  {
    "id": "nutri3",
    "nombre": "Suplementación y Prevención",
    "categoria": "Nutrición y Soporte Metabólico",
    "uso": "Acciones preventivas de salud nutricional, especialmente en áreas comunitarias y maternas.",
    "indicaciones": [
      "Embarazadas",
      "Población infantil en riesgo de desnutrición",
      "Campañas comunitarias de prevención"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Administración de Vitaminas y Minerales: Suplementación con vitamina A, hierro, ácido fólico y otros micronutrientes."
    ],
    "tipoTecnica": "Prevención Nutricional",
    "cuidadosEnfermeria": [
      "Verificar dosis adecuada según edad y peso",
      "Educación sobre efectos secundarios comunes (ej. hierro)",
      "Llevar registro en tarjeta de control o sistema"
    ],
    "materialNecesario": ["Suplementos vitamínicos", "Hierro/Ácido Fólico", "Insumos para administración oral o intramuscular"]
  },
  {
    "id": "nutri4",
    "nombre": "Valoración Antropométrica y Diagnóstica",
    "categoria": "Nutrición y Soporte Metabólico",
    "uso": "Evaluar el estado nutricional y la respuesta al tratamiento del paciente.",
    "indicaciones": [
      "Control de niño sano",
      "Gestantes en control prenatal",
      "Pacientes hospitalizados críticos",
      "Evaluación nutricional de rutina"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Medidas Antropométricas: Toma de peso, talla y perímetros en adultos, gestantes, niños y recién nacidos.",
      "Interpretación de Laboratorio: Análisis de resultados relevantes como glucosa, electrolitos (sodio, potasio), hemoglobina y tamizaje neonatal.",
      "Control de Ingesta y Excreta: Registro detallado para evaluar el balance metabólico y la función renal."
    ],
    "tipoTecnica": "Valoración Nutricional",
    "cuidadosEnfermeria": [
      "Calibrar balanzas y equipos antropométricos diariamente",
      "Asegurar privacidad del paciente durante la medición",
      "Conocer valores de referencia normales de laboratorio",
      "Precisar y registrar exactamente volúmenes en el control de líquidos"
    ],
    "materialNecesario": ["Báscula", "Tallímetro", "Cinta métrica", "Recipientes graduados para excreta", "Formularios de registro"]
  },
  {
    "id": "nutri5",
    "nombre": "Educación para la Salud",
    "categoria": "Nutrición y Soporte Metabólico",
    "uso": "Fomentar estilos de vida saludables y nutrición adecuada.",
    "indicaciones": [
      "Embarazadas",
      "Adultos mayores",
      "Pacientes con enfermedades crónicas no transmisibles",
      "Comunidad en general"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Charlas educativas: Enfoque en estilos de vida saludables y nutrición adecuada para grupos específicos como embarazadas o adultos mayores."
    ],
    "tipoTecnica": "Educación Sanitaria",
    "cuidadosEnfermeria": [
      "Adaptar el lenguaje al nivel de comprensión de la comunidad o paciente",
      "Promover la participación activa y resolución de dudas",
      "Uso de material didáctico apropiado"
    ],
    "materialNecesario": ["Material didáctico impreso o digital", "Trípticos", "Guías alimentarias"]
  },
  {
    "id": "heridas1",
    "nombre": "Cuidado y Tratamiento de Heridas",
    "categoria": "Integridad Cutánea y Heridas",
    "uso": "Intervención directa sobre lesiones en la piel.",
    "indicaciones": [
      "Heridas clínicas o quirúrgicas",
      "Puntos de sutura",
      "Drenajes colocados"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Realización de curaciones: Procedimientos técnicos para limpiar y proteger heridas clínicas o quirúrgicas.",
      "Retiro de puntos: Técnica para la remoción de suturas una vez cumplido el tiempo de cicatrización.",
      "Suturas: Participación o ejecución de cierres de heridas simples (común en el área comunitaria).",
      "Control de drenajes: Monitoreo de la cantidad y características del exudado para prevenir maceración de la piel circundante."
    ],
    "tipoTecnica": "Cuidado de Heridas",
    "cuidadosEnfermeria": [
      "Evaluar signos de infección",
      "Control de bordes de herida",
      "Registro de características del exudado"
    ],
    "materialNecesario": [
      "Set de curación",
      "Suero fisiológico",
      "Gasas estériles",
      "Antiséptico (Clorhexidina, Povidona, etc.)",
      "Material de sutura o retiro de puntos"
    ]
  },
  {
    "id": "heridas2",
    "nombre": "Prevención de Lesiones por Presión (LPP)",
    "categoria": "Integridad Cutánea y Heridas",
    "uso": "Acciones proactivas para mantener la piel intacta en pacientes con movilidad limitada.",
    "indicaciones": [
      "Pacientes postrados o encamados",
      "Movilidad reducida",
      "Pacientes geriátricos o en UCI"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Cambios de posición: Movilización protocolizada del paciente encamado para liberar puntos de presión.",
      "Valoración de Escala de Norton o Braden: Herramienta para medir el riesgo de que un paciente desarrolle escaras o úlceras.",
      "Higiene y confort: Baño del paciente y cuidado de la higiene personal como base para la salud dérmica.",
      "Mecánica corporal: Aplicación de técnicas de movimiento seguro para evitar lesiones por fricción o cizallamiento al movilizar al paciente."
    ],
    "tipoTecnica": "Prevención",
    "cuidadosEnfermeria": [
      "Uso de cojines y protectores",
      "Inspección diaria de prominencias óseas",
      "Lubricación e hidratación de piel intacta evitando masajear zonas enrojecidas"
    ],
    "materialNecesario": [
      "Almohadas/cojines",
      "Sábanas limpias y sin arrugas",
      "Ácidos grasos hiperoxigenados",
      "Cremas hidratantes"
    ]
  },
  {
    "id": "heridas3",
    "nombre": "Área Quirúrgica y Asepsia Avanzada",
    "categoria": "Integridad Cutánea y Heridas",
    "uso": "Procedimientos de alta especificidad para evitar infecciones de sitio quirúrgico.",
    "indicaciones": [
      "Previo a intervenciones quirúrgicas",
      "Manejo de material estéril",
      "Personal en quirófano"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Higiene de manos quirúrgica: Técnica de lavado exhaustivo antes de cualquier intervención.",
      "Colocación de ropa estéril: Uso correcto de bata y calzado de guantes estériles para mantener el campo quirúrgico.",
      "Preparación del material estéril: Organización de textiles y equipos que entrarán en contacto con la piel del paciente durante la cirugía.",
      "Manejo de muestras de tejido: Protección y etiquetado de muestras derivadas del acto quirúrgico (biopsias)."
    ],
    "tipoTecnica": "Asepsia y Antisepsia",
    "cuidadosEnfermeria": [
      "Mantener rigurosamente la técnica aséptica",
      "Verificar caducidad de esterilización",
      "Manejo seguro de instrumental cortopunzante",
      "Manejo adecuado del recipiente para muestras"
    ],
    "materialNecesario": [
      "Jabón quirúrgico (ej. Clorhexidina)",
      "Bata estéril",
      "Guantes estériles",
      "Recipiente para biopsia con formol",
      "Campos quirúrgicos"
    ]
  },
  {
    "id": "heridas4",
    "nombre": "Cuidado Cutáneo Especializado",
    "categoria": "Integridad Cutánea y Heridas",
    "uso": "Enfoque en áreas específicas según la rotación (neonatología, gineco-obstetricia, ostomías).",
    "indicaciones": [
      "Recién nacidos (cordón umbilical)",
      "Madres lactantes",
      "Pacientes con ostomías"
    ],
    "contraindicaciones": [],
    "maneraRealizarlo": [
      "Cuidado del cordón umbilical: Limpieza y vigilancia del muñón umbilical en el recién nacido para evitar onfalitis.",
      "Valoración de las mamas: Evaluación de la integridad del pezón y la piel mamaria en la madre lactante.",
      "Manejo de ostomías: Cuidado de la piel periestomal en pacientes con traqueotomía, gastrostomía o ileostomía para evitar dermatitis química."
    ],
    "tipoTecnica": "Cuidado Especializado",
    "cuidadosEnfermeria": [
      "Observación de signos de infección umbilical (eritema, mal olor)",
      "Capacitación a la madre sobre cuidados del pezón durante la lactancia",
      "Cambio oportuno de dispositivos de ostomía y limpieza de piel periestomal"
    ],
    "materialNecesario": [
      "Alcohol al 70% o clorhexidina",
      "Gasas estériles",
      "Guantes de manejo",
      "Barreras cutáneas y dispositivos de ostomía"
    ]
  }
];
