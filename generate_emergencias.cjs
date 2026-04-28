const fs = require('fs');
const content = fs.readFileSync('src/medicalData.ts', 'utf8');

const emergenciasData = `  {
    "id": "em_cv_1",
    "nombre": "Infarto (IAMEST / IAMNEST)",
    "servicio": "Emergencias",
    "system": "Cardiovascular",
    "color": "#FFEBEE",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Dolor retroesternal opresivo irradiado a mandíbula/brazo izquierdo",
        "Diaforesis",
        "Disnea",
        "Náuseas/Gusto metálico"
      ],
      "maniobraExploracion": "Evaluación de repercusión hemodinámica (auscultación en busca de estertores S3/S4 para descartar fallo de bomba).",
      "banderasRojas": [
        "Hipotensión sostenida",
        "Arritmias ventriculares de inicio reciente",
        "Signos de shock cardiogénico"
      ],
      "cita": "AHA/ACC Guías de IAM"
    },
    "fisiopatologia": {
      "textoTecnico": "Obstrucción aguda de una arteria coronaria, secundaria a la ruptura de una placa aterosclerótica, con posterior trombosis y disminución aguda del flujo miocárdico.",
      "esquemaMental": {
        "inicio": "Ruptura de placa coronaria vascular.",
        "dano": "Formación de trombo oclusivo.",
        "consecuencia": "Necrosis isquémica miocárdica de espesor parcial o total."
      },
      "cita": "Harrison, pág. 1450"
    },
    "manejo": {
      "diagnostico": "Electrocardiograma de 12 derivaciones en <10 minutos. Troponinas I/T ultra sensibles seriadas.",
      "tratamiento": "MONA (Morfina, Oxígeno, Nitroglicerina, Aspirina) - ajustado a guías actuales. Terapia de reperfusión (ICP primaria <90 min o Fibrinólisis <30 min si IAMEST).",
      "cita": "Guía ESC/AHA Manejo IAM"
    },
    "enfermeria": {
      "nanda": "00029 Disminución del gasto cardíaco",
      "intervenciones": [
        { "accion": "Realizar EKG a primera hora.", "razon": "Diagnóstico de daño y derivación prioritaria." },
        { "accion": "Vía venosa periférica de calibre grueso.", "razon": "Administración de fármacos vasoactivos o de rescate." },
        { "accion": "Administración de oxígeno si SatO2 < 90%.", "razon": "Mejora de la oferta de O2 al tejido miocárdico." }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_cv_2",
    "nombre": "Disección Aórtica",
    "servicio": "Emergencias",
    "system": "Cardiovascular",
    "color": "#FFEBEE",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Dolor torácico lancinante o desgarrador de inicio súbito",
        "Irradiación interescapular/espalda",
        "Asimetría de pulsos periféricos y de PA entre brazos",
        "Déficit neurológico focal (si afecta carótidas)"
      ],
      "maniobraExploracion": "Palpación compada de pulsos en extremidades superiores e inferiores. Auscultación buscando soplo de insuficiencia aórtica.",
      "banderasRojas": [
        "Síncope",
        "Taponamiento pericárdico",
        "Isquemia aguda de extremidades o mesentérica"
      ],
      "cita": "Guía ESC de Síndromes Aórticos Agudos"
    },
    "fisiopatologia": {
      "textoTecnico": "Desgarro de la íntima aórtica que permite la entrada de sangre a presión hacia la capa media, creando una falsa luz que se diseca longitudinalmente a través de la arteria.",
      "esquemaMental": {
        "inicio": "Estrés parietal en aorta (ej. HTA mal controlada).",
        "dano": "Ruptura de la capa íntima sanguínea.",
        "consecuencia": "Formación del lumen falso y propagación de isquemia sistémica."
      },
      "cita": "Harrison, pág. 1822"
    },
    "manejo": {
      "diagnostico": "Angio-TC de aorta con contraste (Gold Standard). ETE en inestables. Radiografía (ensanchamiento mediastínico).",
      "tratamiento": "Reducción agresiva y rápida de FC (Esmolol, Labetalol) y PA (Nitroprusiato) para PAS <120 y FC <60. Evaluación quirúrgica de emergencia (Especialmente tipo A de Stanford).",
      "cita": "GPC de Aorta"
    },
    "enfermeria": {
      "nanda": "00204 Perfusión tisular periférica ineficaz",
      "intervenciones": [
        { "accion": "Monitoreo invasivo o no invasivo continuo de PA estricto.", "razon": "Minimizar estrés en la pared arterial y prevenir extensión del desgarro." },
        { "accion": "Analgesia potentes (opiodes).", "razon": "Controlar el dolor, lo cual diminuye la liberación de catecolaminas y la HTA reactiva." }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_cv_3",
    "nombre": "Edema Agudo de Pulmón (EAP)",
    "servicio": "Emergencias",
    "system": "Cardiovascular",
    "color": "#FFEBEE",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Disnea severa y súbita, sed de aire",
        "Ortopnea extrema (necesita estar sentado)",
        "Expectoración espumosa rosada/asalmonada",
        "Sudoración profusa y cianosis"
      ],
      "maniobraExploracion": "Auscultación pulmonar con estertores crepitantes bilaterales ascendentes (marea montante). Auscultación cardíaca de tercer ruido (S3).",
      "banderasRojas": [
        "Fatiga respiratoria e inminencia de paro",
        "Somnolencia o caída de Glasgow (Hipercapnia)",
        "Hipotensión (Shock cardiogénico asociado)"
      ],
      "cita": "Guía Insuficiencia Cardiaca ESC"
    },
    "fisiopatologia": {
      "textoTecnico": "Incapacidad abrupta o progresiva del corazón izquierdo para movilizar la sangre. Genera el aumento retrógrado de presión hidrostática en la vasculatura pulmonar que vence la presión oncótica, filtrando suero a los alvéolos.",
      "esquemaMental": {
        "inicio": "Falla del ventrículo izquierdo (Disfunción sistólica/diastólica).",
        "dano": "Congestión retrógrada masiva hacia venas pulmonares.",
        "consecuencia": "Trasudado capilar e inundación alveolar (disminución del intercambio gaseoso)."
      },
      "cita": "Harrison, pág. 1650"
    },
    "manejo": {
      "diagnostico": "Clínico. Rx de tórax (Alas de mariposa, líneas B de Kerley). BNP/NT-proBNP. Ecocardiograma point-of-care.",
      "tratamiento": "Ventilación No Invasiva (VNI - CPAP/BiPAP) idealmente. Furosemida IV para diuresis y venodilatación. Nitroglicerina IV si PAS >110 mmHg. Posición de sentada.",
      "cita": "AHA/ESC Falla Cardiaca"
    },
    "enfermeria": {
      "nanda": "00030 Deterioro del intercambio de gases",
      "intervenciones": [
        { "accion": "Posicionamiento Fowler o sedestación al costado de la cama con pies colgando.", "razon": "Disminuye el retorno venoso y asiste mecánicamente la expansión torácica." },
        { "accion": "Control estricto de balances hídricos, pesaje.", "razon": "Valorar eficacia de la terapia diurética y fluidos." }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_resp_1",
    "nombre": "Crisis Asmática Grave",
    "servicio": "Emergencias",
    "system": "Respiratorio",
    "color": "#E3F2FD",
    "icon": "Wind",
    "clinica": {
      "signosSintomas": [
        "Disnea de reposo y sensación de opresión severa",
        "Agitación / Imposibilidad de pronunciar frases completas",
        "Taquipnea y Taquicardia marcadas",
        "Uso evidente de musculatura accesoria / Tirajes"
      ],
      "maniobraExploracion": "Auscultación revelando silencio auscultatorio (tórax silente) en casos extremos o sibilancias difusas bilaterales intensas en casos severos.",
      "banderasRojas": [
        "Tórax silente",
        "Bradicardia / Hipotensión (fase pre-paro)",
        "Movimiento toraco-abdominal paradójico",
        "Estado mental alterado"
      ],
      "cita": "Guía GINA"
    },
    "fisiopatologia": {
      "textoTecnico": "Exacerbación aguda inflamatoria mediada por respuestas tipo Th2 o no-Th2 del epitelio respiratorio. Genera broncoconstricción masiva, edema de pared bronquial y tapones mucosos espesos. Resulta en hiperinsuflación, aumento del espacio muerto y mismatch V/Q.",
      "esquemaMental": {
        "inicio": "Exposición a desencadenante alérgico/infeccioso.",
        "dano": "Hiperreactividad bronquial, edema y moco abundante.",
        "consecuencia": "Obstrucción alta al flujo aéreo (principalmente espiratorio) e hipoxia."
      },
      "cita": "Bates, pág. 420"
    },
    "manejo": {
      "diagnostico": "Evaluación clínica. Oximetría de pulso periférica. Gasometría (buscando retención de CO2 como signo de fatiga inminente). Peak Flow <50% de su mejor marca.",
      "tratamiento": "Oxígeno objetivo >90%. Broncodilatadores de acción corta (Salbutamol inhalado/nebulizado) alta dosis + Bromuro de Ipratropio. Corticoides sistémicos (Metilprednisolona o Hidrocortisona IV). Magnesio IV en refractarios.",
      "cita": "GINA 2023"
    },
    "enfermeria": {
      "nanda": "00031 Limpieza ineficaz de vías aéreas",
      "intervenciones": [
        { "accion": "Acompañar y brindar soporte emocional (disminuir ansiedad).", "razon": "La ansiedad empeora el trabajo y demanda respiratoria." },
        { "accion": "Administración y supervisión de la técnica de MDI con aerocámara.", "razon": "Garantizar llegada del fármaco a vía aérea pequeña." }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_resp_2",
    "nombre": "Neumotórax a Tensión",
    "servicio": "Emergencias",
    "system": "Respiratorio",
    "color": "#E3F2FD",
    "icon": "Wind",
    "clinica": {
      "signosSintomas": [
        "Dolor pleurítico torácico agudo unilateral",
        "Disnea que rápidamente se agrava",
        "Inestabilidad hemodinámica rápida",
        "Ingurgitación yugular evidente"
      ],
      "maniobraExploracion": "Asimetría en la expansión torácica. Auscultación del pulmón afectado con MVC (Murmullo Vesicular) abolido y percusión timpánica. Desviación de tráquea contralateral (Tardío).",
      "banderasRojas": [
        "Desviación traqueal",
        "Colapso cardiovascular masivo",
        "Asimetría masiva de hemitórax"
      ],
      "cita": "ATLS Trauma Torácico"
    },
    "fisiopatologia": {
      "textoTecnico": "Laceración pleural que actúa como válvula unidireccional permitiendo la entrada de aire en la cavidad pleural durante la inspiración, sin salida en la espiración. El aumento de presión intratorácica colapsa el pulmón, desplaza el mediastino, reduce severamente el retorno venoso, comprimiendo cavidades derechas cardíacas y precipitando un shock obstructivo fatal.",
      "esquemaMental": {
        "inicio": "Ruptura pleural en válvula unidireccional.",
        "dano": "Acumulación progresiva e insoportable aire a presión.",
        "consecuencia": "Colapso venoso (Shock Obstructivo) y desplazamiento mediastinal."
      },
      "cita": "ATLS 10ma Ed."
    },
    "manejo": {
      "diagnostico": "Clínico en su totalidad en contexto de emergencia extrema. El eco pulmonar y la Rx son complementos pero no retrasan la acción si es altamente sospechoso.",
      "tratamiento": "Descompresión con aguja inmediata en línea media clavicular 2do espacio intercostal ó 5to espacio línea axilar anterior. Colocación subsecuente de tubo de pleurostomía.",
      "cita": "Guías ATLS"
    },
    "enfermeria": {
      "nanda": "00032 Patrón respiratorio ineficaz",
      "intervenciones": [
        { "accion": "Preparar material de toracocentesis inmediata y trampa de agua.", "razon": "Facilitación del tratamiento de emergencia vital in situ." },
        { "accion": "Soporte oxigenatorio y monitorización cardíaca continua.", "razon": "Se requiere para optimizar la limitada capacidad cardiopulmonar remanente." }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_resp_3",
    "nombre": "Obstrucción de Vía Aérea (OVACE)",
    "servicio": "Emergencias",
    "system": "Respiratorio",
    "color": "#E3F2FD",
    "icon": "Wind",
    "clinica": {
      "signosSintomas": [
        "Signo universal de atragantamiento (manos al cuello)",
        "Dificultad evidente repentina para el fonema",
        "Estridor inspiratorio (obstrucción parcial)",
        "Cianosis o pérdida de estado de conciencia"
      ],
      "maniobraExploracion": "Visualizar la cavidad oral. Evaluar si la tos es efectiva o inefectiva. Observación directa del deterioro del intercambio.",
      "banderasRojas": [
        "Tos débil, silenciosa o sin sonido",
        "Coloración violácea de piel repentina",
        "Pérdida inminente de tonicidad e inconciencia"
      ],
      "cita": "BLS / AHA"
    },
    "fisiopatologia": {
      "textoTecnico": "Atrapamiento agudo de un cuerpo extraño (alimento, partes mecánicas, coágulos) en encrucijada faringolaríngea o árbol traqueal. Bloquea el flujo ventilatorio e interrumpe radicalmente la entrada de O2 y salida de CO2.",
      "esquemaMental": {
        "inicio": "Tránsito de cuerpo extraño descontrolado.",
        "dano": "Obstrucción de luces traqueales/laríngeas prestando oclusión física a gases.",
        "consecuencia": "Asfixia mecánica, hipoxia central rápida e isquemia."
      },
      "cita": "Guía AHA RCP"
    },
    "manejo": {
      "diagnostico": "Clínico. Identificación inminente en persona que colapsa mientras comía o con objetos en boca.",
      "tratamiento": "Estimular que tosa. Si se ahoga: Maniobra de Heimlich (compresiones abdominales). Si colapsa y pierde inconsciencia: Iniciar RCP y revisar la boca visualmente antes de proporcionar ventilaciones de rescate. Laringoscopia directa con pinzas Magill si visualiza el objeto a nivel hospitalario.",
      "cita": "AHA Manejo Vía Aérea"
    },
    "enfermeria": {
      "nanda": "00039 Riesgo de aspiración",
      "intervenciones": [
        { "accion": "Ejecutar maniobra de Heimlich con destreza in situ.", "razon": "Técnica puramente mecánica superior a oxigenoterapia en estado oclusivo." },
        { "accion": "Alistar equipo de laringoscopia inmediata, tubo endotraqueal y succión rígida.", "razon": "Providenciar acceso para extracción armada o cricotirotomía si no expulsa y pierde tono." }
      ],
      "cita": "Guías CPR"
    }
  },
  {
    "id": "em_neuro_1",
    "nombre": "Ictus (Escala de Cincinnati)",
    "servicio": "Emergencias",
    "system": "Neurológico",
    "color": "#F3E5F5",
    "icon": "Brain",
    "clinica": {
      "signosSintomas": [
        "Paresia o asimetría facial de inicio súbito",
        "Debilidad motora en brazo o pierna (frecuente hemiparesia)",
        "Disartria o afasia (dificultad para hablar o entender)",
        "Alteraciones súbitas visuales o del equilibrio"
      ],
      "maniobraExploracion": "Aplicación de Escala de Cincinnati. Exploración neurológica rápida de nervios craneales, motricidad (fuerza 0/5), sensibilidad y lenguaje. Medir nivel de glucosa capilar (para descartar hipoglucemia).",
      "banderasRojas": [
        "Tiempo de evolución desconocido o >4.5 horas (ventana de trombolisis)",
        "Depresión rápida del Glasgow",
        "Vómito en proyectil"
      ],
      "cita": "AHA/ASA Stroke Guidelines"
    },
    "fisiopatologia": {
      "textoTecnico": "Interrupción de la perfusión cerebral ocasionada por trombo isquémico en vaso arterial y/o por ruptura vascular, lo que ocasiona isquemia y potencial cascada de infarto en área de penumbra del cerebro.",
      "esquemaMental": {
        "inicio": "Bloqueo circulatorio (ictus isquémico) o ruptura (ictus hemorrágico).",
        "dano": "Privación crítica de oxígeno e hidratos al parénquima.",
        "consecuencia": "Necrosis citotóxica neuronal focal con su clínica de desconexión."
      },
      "cita": "Guía Fisiopatología Nerviosa"
    },
    "manejo": {
      "diagnostico": "TC de cabeza (simple) INMEDIATA para diferenciar hemorrágico de isquémico. Signos precoces de infarto.",
      "tratamiento": "Reperfusión si es candidato isquémico (Alteplasa/TNK en ventana <4.5h, trombectomía mecánica). Control estricto de glucosa y PA (<180/105 si reperfusión, <220/120 si no es candidato).",
      "cita": "AHA Stroke"
    },
    "enfermeria": {
      "nanda": "00201 Riesgo de perfusión tisular cerebral ineficaz",
      "intervenciones": [
        { "accion": "Realizar glucemia capilar y tomar vía periférica sin soluciones que contengan dextrosa.", "razon": "Evitar daño secundario y confusores de evento cerebral." },
        { "accion": "Movilizar equipo a TAC de emergencia sin retrasos.", "razon": "El tiempo es cerebro (Time is Brain)." }
      ],
      "cita": "Manual Neurológico"
    }
  },
  {
    "id": "em_neuro_2",
    "nombre": "Estado Epiléptico",
    "servicio": "Emergencias",
    "system": "Neurológico",
    "color": "#F3E5F5",
    "icon": "Brain",
    "clinica": {
      "signosSintomas": [
        "Actividad motora compulsiva sostenida > 5 min",
        "O repetición de convulsiones sin retorno a línea de base interictal",
        "Mandíbulas tensadas/relajación de esfínteres (frecuente)",
        "Alteración autonómica respiratoria"
      ],
      "maniobraExploracion": "Procurar estabilización ABCDE para trauma cervical. Vigilar protección de la vía aérea en pacientes con crisis repetidas.",
      "banderasRojas": [
        "Tiempo de actividad > 30 minutos",
        "Signos de hipoxia por incompetencia ventilatoria",
        "Fiebre aguda originada, pensar en meningoencefalitis"
      ],
      "cita": "NCS Status Epilepticus Guidelin"
    },
    "fisiopatologia": {
      "textoTecnico": "Fallo en los mecanismos responsables de la terminación de la crisis o factores neuroquímicos que generan descargas neuronales excesivamente prolongadas causando lesión neuronal exocitotóxica global.",
      "esquemaMental": {
        "inicio": "Umbral convulsivo roto en la corteza cerebral.",
        "dano": "Hiperactivación prolongada sostenida del tejido nervioso.",
        "consecuencia": "Necrosis cortical isquémica/metabólica si no se revierte."
      },
      "cita": "Guía Europea Neurología"
    },
    "manejo": {
      "diagnostico": "Clínico. EEG en fases tardías y refractarias. Labs completos de electrolitos y toxicológico si dudas etiologicas.",
      "tratamiento": "Línea 1: Benzodiazepinas (Lorazepam 4mg IV o Diazepam, Midazolam IM). Línea 2: Fenitoína/Levetiracetam/Valproato de carga. Línea 3: Propofol o Midazolam en infusión + Intubación (Status Refractario).",
      "cita": "Neurocritical Care Society"
    },
    "enfermeria": {
      "nanda": "00039 Riesgo de aspiración",
      "intervenciones": [
        { "accion": "Prevenir caídas, colocar paciente decúbito lateral. Nunca forzar material en boca.", "razon": "Minimizar trauma perilesional." },
        { "accion": "Cronometrar desde el inicio de las convulsiones.", "razon": "Define escalada a línea 1, 2 o 3." }
      ],
      "cita": "Manual de Urgencias Neurológicas"
    }
  },
  {
    "id": "em_neuro_3",
    "nombre": "Hemorragia Intracraneal",
    "servicio": "Emergencias",
    "system": "Neurológico",
    "color": "#F3E5F5",
    "icon": "Brain",
    "clinica": {
      "signosSintomas": [
        "Cefalea explosiva o 'la peor de su vida' (signo clásico de Hemorragia Subaracnoidea)",
        "Deterioro de la conciencia brusco o coma (Hemorragia parenquimatosa)",
        "Vómito sin náusea (proyectil), alteración del pulso, hipertensión extrema",
        "Focalidad intensa (hemiplejía, midriasis unilateral)"
      ],
      "maniobraExploracion": "Examen pupilar exhaustivo. Reactividad motora y dolor. Identificación de la tríada de Cushing (bradicardia, hipertensión, alteración respiratoria) como signo ominoso de herniación.",
      "banderasRojas": [
        "Tríada de Cushing activa",
        "Caída vertiginosa del score de Glasgow a niveles <8 pts",
        "Anisocoria aguda"
      ],
      "cita": "Guía Hemorragia AHA/ASA"
    },
    "fisiopatologia": {
      "textoTecnico": "Rotura de aneurisma preexistente o daño directo por hipertensión brusca de arteriolas con paso de sangre hacia el tejido encefálico. Crea aumento de masa dentro de la bóveda craneal e induce un efecto de presión y necrosis, desencadenando la hipertensión endocraneana (HTE).",
      "esquemaMental": {
        "inicio": "Ruptura vascular focal.",
        "dano": "Sangrado en cavidad no expansible (bóveda).",
        "consecuencia": "Aumento de presión, isquemia en vasos oprimidos y riesgo de herniación."
      },
      "cita": "Neurociencia Aplicada"
    },
    "manejo": {
      "diagnostico": "TAC de cráneo simple sin contraste es la principal elección inicial. Si es negativa pero sospecha alta de hemorragia subaracnoidea, se hace punción lumbar.",
      "tratamiento": "Aseguramiento de A, B, C. Manejo inmediato de picos hipertensivos (Labetalol) asegurando PAS <140 mmHg. Cabeza a 30 grados, analgesia. Neurocirugía interconsultada urgentemente.",
      "cita": "AHA Stroke Council"
    },
    "enfermeria": {
      "nanda": "00201 Riesgo de perfusión tisular cerebral ineficaz",
      "intervenciones": [
        { "accion": "Elevar cabecera y mantener cuello neutro.", "razon": "Favorecer la dinámica del drenaje de venas yugulares." },
        { "accion": "Monitoreo invasivo y cuidados neurológicos de HTE.", "razon": "Alertar en forma precoz de un resangrado o de vasoespasmos." }
      ],
      "cita": "Protocolo de Urgencias N."
    }
  },
  {
    "id": "em_trauma_1",
    "nombre": "Manejo del Politraumatizado (ATLS)",
    "servicio": "Emergencias",
    "system": "Trauma",
    "color": "#FFF3E0",
    "icon": "Shield",
    "clinica": {
      "signosSintomas": [
        "Daño anatómico en más de dos sistemas por mecanismo de alta energía",
        "Marcas evidentes de abrasiones, deformidades pélvicas o fracturas inestables",
        "Posible hipotensión, sangrado profuso o colapso generalizado",
        "Alteración de conciencia progresiva"
      ],
      "maniobraExploracion": "Examen integral secuencial XABCDE de Soporte Vital de Trauma y luego examen secundario ampliado.",
      "banderasRojas": [
        "Cinemática del trauma de alto impacto (Caída >3m, eyección vehicular)",
        "Choque de patrón hipovolémico sin sangre evidente = Hemorragia interna",
        "Glasgow < 8 en el teatro prehospitalario"
      ],
      "cita": "Manual ATLS/ACS"
    },
    "fisiopatologia": {
      "textoTecnico": "Síndrome de lesiones multiorgánicas que provocan un estado severo y multifactorial donde el consumo de las reservas hematopoyéticas y enzimáticas lleva a la tríada letal del trauma: hipotermia, coagulopatía y acidosis.",
      "esquemaMental": {
        "inicio": "Exposición violenta a energía térmica o cinética.",
        "dano": "Destrucción generalizada de membranas de órganos clave.",
        "consecuencia": "Choque complejo y cascada hacia la muerte celular de no revertir shock y acidosis."
      },
      "cita": "Fisiología Quirúrgica Trauma"
    },
    "manejo": {
      "diagnostico": "Eco FAST y estudios de imagen enfocados primarios (Cervical lateral, Torax AP y Pelvis AP). Gasometría en punto de cuidado (POC).",
      "tratamiento": "X: Exanguinación; A: Vía aérea e intubación + control cervical; B: Ventilar/Tórax; C: Control 2 accesos venosos e id hemorragias, Transfusión masiva (ácido tranexámico); D: Discapacidad Neuro; E: Exposición + control térmico. Control de Daños quirúrgico.",
      "cita": "Advanced Trauma Life Support 10th Ed"
    },
    "enfermeria": {
      "nanda": "00024 Perfusión tisular ineficaz",
      "intervenciones": [
        { "accion": "Aplicación de presión directa o faja pélvica a evidencia de diástasis pélvica.", "razon": "Inmovilización detiene parcialmente hemorragias masivas retroperitoneales." },
        { "accion": "Administración perentoria de fluidos calentados.", "razon": "Hipotermia induce coagulopatía e interfiere con los tiempos de la cascada y funciones plaquetarias." }
      ],
      "cita": "Manual Urgencias en Trauma"
    }
  },
  {
    "id": "em_trauma_2",
    "nombre": "Quemaduras Graves",
    "servicio": "Emergencias",
    "system": "Trauma",
    "color": "#FFF3E0",
    "icon": "Shield",
    "clinica": {
      "signosSintomas": [
        "Compromiso dermal y epidérmico difuso > 20% SCT.",
        "Vibrisas nasales chamuscadas, estrídon espiratorio, hollín orofaringeo",
        "Flictenas / Escaras gruesas de textura de cuero con pérdida del dolor cutáneo",
        "Hipotermia evidente en la evaluación sistémica"
      ],
      "maniobraExploracion": "Evaluación rápida de compromiso de la vía aérea. Medición del Área de Superficie Corporal Quemada mediante la Regla de los 9 (Wallace) o tabla de Lund y Browder.",
      "banderasRojas": [
        "Quemadura de cara, cuello, o áreas en circunferencia",
        "Inhalación de humo obvia (en voz o clínica respiratoria)",
        "Extensión extrema que prevé la necesidad de fluidos altísimos (>fluid creep)"
      ],
      "cita": "ABA (American Burn Association) Manuals"
    },
    "fisiopatologia": {
      "textoTecnico": "Respuesta inmediata del cuerpo al daño térmico donde se aumenta drásticamente la permeabilidad endotelial y hay extravasación general de líquidos perdiendo líquidos intravascular y produciendo una intensa liberación de mediadores sistémicos desencadenando choque tipo hipovolémico mixto.",
      "esquemaMental": {
        "inicio": "Estrés térmico al epitelio que descompone matriz extracelular.",
        "dano": "Ruptura de barrera principal y filtración difusa (Third Spacing).",
        "consecuencia": "Choque por extravasación vascular e inmunosupresión global a repetición infecciosa."
      },
      "cita": "Bates 13.ª Ed./ Tratado Fisiopatología Quemaduras"
    },
    "manejo": {
      "diagnostico": "Clínico en extensión por tablas métricas (SCT), y cálculo de requerimiento hídrico. Broncofibroscopia si hay duda sobre injuria inhalatoria térmica.",
      "tratamiento": "Manejo A (Vía Aérea protectora precozmente si hay signos inhalatorios), oxigenoterapia de > 10 L. Cristaloides de Fórmula de Parkland / Brooke revisadas: (2-4 mL * kg * %SCT) primera mitad en 8 horas post quemadura. Limpieza y vendajes estériles, sedoanalgesia profunda y manejo por unidad de especialidad.",
      "cita": "Protocolo Manejo Quemados Críticos"
    },
    "enfermeria": {
      "nanda": "00046 Deterioro de la integridad cutánea",
      "intervenciones": [
        { "accion": "Iniciar dos vías IV antes de que el edema masivo oculte la anatomía vascular.", "razon": "El secuestro capilar del choque del gran quemado limitará posteriores accesos." },
        { "accion": "Retirar joyería e inmoviliar de manera laxa.", "razon": "Edema compromete compartimentos produciendo efecto de torniquete vascular." }
      ],
      "cita": "Guía de Urgencias en Unidad Quemados"
    }
  }
`;

const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('"id": "em1",'));
const endIndexList = lines.findIndex(l => l.includes("id: 'int_0_nac'"));
// We want to delete from the object enclosing em1 down to just before int_0_nac
let startReplace = startIndex;
while (!lines[startReplace].includes('{')) {
  startReplace--;
}

let endReplace = endIndexList;
while (!lines[endReplace].includes('// MEDICINA INTERNA')) {
  endReplace--;
}

const newContent = lines.slice(0, startReplace).join('\n') + '\n' + emergenciasData + '\n  ,\n  ' + lines.slice(endReplace).join('\n');
fs.writeFileSync('src/medicalData.ts', newContent);
console.log("Done");
