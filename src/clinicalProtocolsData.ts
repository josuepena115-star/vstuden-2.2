export interface ClinicalProtocol {
  id: string;
  title: string;
  category: string;
  description: string;
  activationCriteria: string[];
  algorithm: {
    step: string;
    action: string;
    details: string;
  }[];
  resuscitationGoals: string[];
}

export const CLINICAL_PROTOCOLS: ClinicalProtocol[] = [
  {
    id: "prot_cad",
    title: "Manejo de Cetoacidosis Diabética (CAD)",
    category: "Endocrinología",
    description: "Protocolo estructurado para el diagnóstico y corrección aguda de la CAD en adultos.",
    activationCriteria: [
      "Glucosa sérica > 250 mg/dL",
      "Gasometría: pH arterial < 7.3",
      "Bicarbonato (HCO3) < 18 mEq/L",
      "Cetonemia (beta-hidroxibutirato > 3.0 mmol/L) o Cetonuria moderada/severa",
      "Anión Gap elevado (> 10-12)"
    ],
    algorithm: [
      {
        step: "Paso 1: Fluidoterapia (Hora 0)",
        action: "Expansión de volumen inicial rápida.",
        details: "Administrar Solución Salina (NaCl 0.9%) a 15-20 ml/kg/h o 1-1.5 L durante la primera hora. Evaluar estado de hidratación post-infusión."
      },
      {
        step: "Paso 2: Evaluación del Potasio (K+)",
        action: "Verificar niveles de K+ antes de iniciar insulina.",
        details: "Si K+ < 3.3 mEq/L: RETRASAR INSULINA. Reponer 20-30 mEq K+/hora hasta K+ > 3.3. Si K+ es 3.3 - 5.2 mEq/L: Dar 20-30 mEq K+ por cada litro de líquido. Si K+ > 5.2 mEq/L: NO dar K+, pero monitorear cada 2 h."
      },
      {
        step: "Paso 3: Terapia con Insulina",
        action: "Bolo e infusión continua IV de Insulina Regular.",
        details: "Dar bolo IV de 0.1 U/kg seguido de infusión de 0.1 U/kg/h. Objetivo: reducir glucosa capilar de 50 a 70 mg/dL por hora."
      },
      {
        step: "Paso 4: Cambio de Fluidos",
        action: "Agregar Dextrosa cuando la glucosa caiga.",
        details: "Cuando Glucosa < 200 mg/dL, cambiar líquidos a SG 5% con NaCl 0.45% a 150-250 ml/h, reduciendo velocidad de insulina a 0.02 - 0.05 U/kg/h para mantener glucosa entre 150-200 mg/dL."
      },
      {
        step: "Paso 5: Evaluación Ácido-Base",
        action: "Evaluación de la necesidad de Bicarbonato.",
        details: "Sólo si pH < 6.9: administrar 100 mmol Bicarbonato de Sodio en 400 mL de agua destilada con 20 mEq de KCl en 2 horas."
      }
    ],
    resuscitationGoals: [
      "Glucosa sérica < 200 mg/dL",
      "Bicarbonato >= 15 mEq/L / pH Venoso > 7.3",
      "Anión Gap cerrado (<= 12)",
      "Capacidad del paciente de tolerar vía oral (transición a esquema SC)"
    ]
  },
  {
    id: "prot_sepsis",
    title: "Campaña Sobrevivir a la Sepsis (Pilar 1 hora)",
    category: "Cuidado Crítico",
    description: "Paquete de medidas inmediatas (Bundle de 1 hora) para el manejo de Sepsis y Choque Séptico.",
    activationCriteria: [
      "Foco infeccioso sospechado o documentado",
      "qSOFA >= 2 o aumento de SOFA >= 2 puntos",
      "Hipotensión (TAM < 65 mmHg) o Lactato > 2 mmol/L"
    ],
    algorithm: [
      {
        step: "Paso 1: Medición de Lactato",
        action: "Obtención de gasometría y lactato sérico.",
        details: "Medir el nivel de lactato. Volver a medir si el lactato inicial es > 2 mmol/L. Guiar la reanimación para normalizar el lactato."
      },
      {
        step: "Paso 2: Cultivos",
        action: "Toma de hemocultivos.",
        details: "Obtener hemocultivos (y otros cultivos como urocultivo, esputo, según foco) ANTES de la administración de antibióticos."
      },
      {
        step: "Paso 3: Antibioticoterapia",
        action: "Administrar antibióticos de amplio espectro de inmediato.",
        details: "Iniciar empíricamente en la primera hora. La elección debe cubrir patógenos probables según epidemiología local y foco."
      },
      {
        step: "Paso 4: Fluidoterapia Rápida",
        action: "Resucitación con cristaloides.",
        details: "Administrar bolo rápido de 30 ml/kg de cristaloides (Lactato de Ringer o NaCl 0.9%) en caso de hipotensión o lactato >= 4 mmol/L."
      },
      {
        step: "Paso 5: Vasopresores",
        action: "Uso de aminas vasoactivas si hipotensión persiste.",
        details: "Iniciar vasopresores (Noradrenalina de primera elección) durante o después de la fluidoterapia para mantener Tensión Arterial Media (TAM) >= 65 mmHg."
      }
    ],
    resuscitationGoals: [
      "TAM >= 65 mmHg",
      "Diuresis >= 0.5 mL/kg/h",
      "Normalización del Lactato Sérico",
      "Saturación venosa central de oxígeno (ScvO2) >= 70% (si se monotoriza)"
    ]
  },
  {
    id: "prot_eap",
    title: "Manejo de Edema Agudo de Pulmón (EAP)",
    category: "Cardiología",
    description: "Algoritmo para el reconocimiento y estabilización de la insuficiencia circulatoria pulmonar aguda.",
    activationCriteria: [
      "Disnea severa de inicio súbito, ortopnea aguda.",
      "Estertores crepitantes bilaterales (marea montante).",
      "Hipoxemia (SpO2 < 90%).",
      "Esputo asalmonado o rosado espumoso."
    ],
    algorithm: [
      {
        step: "Paso 1: Posicionamiento y Oxígeno",
        action: "Soporte respiratorio estructurado.",
        details: "Colocar al paciente sentado (con los pies colgando). Administrar O2 suplementario; preferir VNI (CPAP/BiPAP) de forma temprana si hay fatiga respiratoria."
      },
      {
        step: "Paso 2: Vasodilatación Endovenosa",
        action: "Reducir precarga y poscarga (si PAS > 90 mmHg).",
        details: "Administrar Nitroglicerina IV o sublingual inicialmente y progresar a infusión continua (10-20 mcg/min, titulando). NO dar si hay hipotensión ni choque cardiogénico."
      },
      {
        step: "Paso 3: Diuresis de Asa",
        action: "Disminuir sobrecarga hídrica vascular.",
        details: "Furosemida IV bolo inicial de 40 mg (o igual a la dosis oral habitual diaria si ya tomaba). Evaluar respuesta urinaria en la siguiente hora."
      },
      {
        step: "Paso 4: Identificación Causal",
        action: "Abuscar desencadenante agudo (CHAMP).",
        details: "Realizar EKG (C: Coronario / H: Hipertensión / A: Arritmia / M: Mecánica / P: Pulmonar, buscar causa)."
      },
      {
        step: "Paso 5: Ansiedad / Opioides",
        action: "Sedación ligera prudente.",
        details: "El uso rutinario de morfina no está recomendado. Considerar morfina (2-3 mg IV p.r.n) solo para disnea/ansiedad refractaria controlando depresión respiratoria."
      }
    ],
    resuscitationGoals: [
      "SpO2 > 90-92%",
      "Resolución del distress respiratorio clínico",
      "Volumen urinario adecuado negativo (diuresis inducida)",
      "Normalización de la PAS (resolución de crisis hipertensiva asociada)"
    ]
  },
  {
    id: "prot_scacest",
    title: "Código Infarto: SCACEST",
    category: "Cardiología",
    description: "Protocolo de reperfusión de emergencia para el Síndrome Coronario Agudo con Elevación del Segmento ST.",
    activationCriteria: [
      "Dolor torácico típico > 20 minutos de duración.",
      "EKG a los 10 minutos con elevación de ST >= 1 mm en al menos 2 derivaciones contiguas.",
      "Elevación de Troponinas (no esperar al resultado para activar trombolisis/ICP)."
    ],
    algorithm: [
      {
        step: "Paso 1: Oxígeno y Analgesia",
        action: "Manejo sintomático rápido.",
        details: "Oxígeno SÓLO si SpO2 < 90%. Para dolor refractario: Morfina IV (2-4 mg) con cuidado si el infarto es de cara inferior (riesgo bradicardia/hipotensión)."
      },
      {
        step: "Paso 2: Antiagregación Dual Inmediata",
        action: "AAS y antiagregante inhibitorio del P2Y12.",
        details: "Aspirina 300 mg masticada STAT, más Clopidogrel (300 mg si trombolisis, 600 mg si ICP) o Ticagrelor 180 mg."
      },
      {
        step: "Paso 3: Anticoagulación",
        action: "Prevenir extensión del trombo.",
        details: "Enoxaparina 30 mg IV bolo STAT, luego 1 mg/kg SC cada 12 h (ajustar en enfermedad renal/adultos mayores) o Heparina no fraccionada."
      },
      {
        step: "Paso 4: Decisión de Reperfusión",
        action: "ICP Primaria vs Trombolisis Fibrinolítica.",
        details: "ICP primaria si el retraso anticipado es < 120 min de sala hemodinamia. Fibrinolisis (Ej. Tenecteplase) si retraso es > 120 min de otra manera en < 10 mins desde el diagnóstico EKG."
      },
      {
        step: "Paso 5: Terapia Satélite",
        action: "Estatinas y Betabloqueantes.",
        details: "Atorvastatina 80 mg STAT. Considerar betabloqueantes en las primeras 24h si el paciente está hemodinámicamente estable (no falla cardíaca, no bajo gasto, no bradicardia severa)."
      }
    ],
    resuscitationGoals: [
      "Reducción del supradesnivel del ST en un >50% a los 60 min (si fibrolinisis).",
      "Alivio completo del dolor.",
      "Flujo TIMI 3 tras ICP.",
      "Estabilidad hemodinámica sin arritmias ventriculares."
    ]
  },
  {
    id: "prot_epilepticus",
    title: "Estatus Epiléptico",
    category: "Neurología",
    description: "Manejo urgente de convulsiones persistentes más allá de 5 minutos o recurrentes sin recuperación basal.",
    activationCriteria: [
      "Actividad convulsiva tónico-clónica continua > 5 minutos.",
      "Dos o más crisis sin recuperación del estado de consciencia entre las mismas."
    ],
    algorithm: [
      {
        step: "Paso 1: Estabilización Inicial (0-5 minutos)",
        action: "ABCDE Vitales.",
        details: "Proteger vía aérea, O2 al 100%, monitorización, acceso venoso. Extraer analítica (Glicemia de dedo SÚPER prioritaria, ES con Ca y Mg)."
      },
      {
        step: "Paso 2: Terapia Inicial - Benzodiacepinas (5-20 mins)",
        action: "Abordaje farmacológico de primera línea.",
        details: "Lorazepam 0.1 mg/kg IV (max 4mg) o Diazepam 0.15 mg/kg IV (max 10mg) o Midazolam 10 mg IM si no hay vía IV."
      },
      {
        step: "Paso 3: Segunda Terapia - Fármacos Antiepilépticos (20-40 mins)",
        action: "Dosis de carga si la crisis no cede o para prevención.",
        details: "Levetiracetam (60 mg/kg, máx 4.5g) IV, Ácido Valproico (40 mg/kg, máx 3g) IV, o Fenitoína (20 mg/kg) - vigilar bradicardia y QTc con fenitoína."
      },
      {
        step: "Paso 4: Estatus Epiléptico Refractario (> 40 mins)",
        action: "Ingreso a UCI para Anestesia General.",
        details: "Si persisten crisis, proceder a intubación, VM y perfusión de Propofol, Midazolam o Tiopental con monitoreo cEEG continuo (EEG)."
      },
      {
        step: "Paso 5: Investigación Causal Inmediata",
        action: "Tratar etiología de base.",
        details: "Si hipoglucemia: dar SG 50%. TC Craneal urgente post estabilización aguda, punción lumbar si hay sospecha de infección, monitorizar niveles de drogas."
      }
    ],
    resuscitationGoals: [
      "Cese clínico y electrográfico de la crisis convulsiva.",
      "Prevención de injuria cerebral secundaria y aspiración.",
      "Glucosa sérica > 70 mg/dL.",
      "Recuperación gradual de la escala de Glasgow hacia estado basal."
    ]
  },
  {
    id: "prot_hyper_k",
    title: "Manejo de Hiperpotasemia (K+ > 5.5 mEq/L)",
    category: "Nefrología / Medio Interno",
    description: "Protocolo de emergencia para la estabilización de membrana y desplazamiento de potasio intracelular.",
    activationCriteria: [
      "Potasio sérico (K+) > 5.5 mEq/L.",
      "Cambios en el EKG: ondas T picudas, ensanchamiento QRS, pérdida de onda P.",
      "Debilidad muscular o parálisis ascendente.",
      "Sospecha diagnóstica en pacientes con IRA/IRC o lisis tumoral."
    ],
    algorithm: [
      {
        step: "Paso 1: Estabilización de Membrana",
        action: "Administrar Calcio (Sólo si hay cambios EKG).",
        details: "Gluconato de Calcio al 10% 10 ml IV en 5-10 min (repetir si EKG no mejora en 10 min). Cloruro de Calcio es preferible si hay shock/paro."
      },
      {
        step: "Paso 2: Redistribución Intracelular (Shifting)",
        action: "Insulina y Glucosa.",
        details: "10 unidades de Insulina Rápida IV + 50 ml de Dextrosa al 50% (D50W) en bolo. Vigilar hipoglucemia."
      },
      {
        step: "Paso 3: Terapia Coadyuvante",
        action: "Beta-agonistas y Bicarbonato.",
        details: "Salbutamol nebulizado 10-20 mg (dosis altas). Bicarbonato de Sodio (1 mEq/kg) sólo si hay acidosis metabólica concomitante severa."
      },
      {
        step: "Paso 4: Eliminación de Potasio",
        action: "Diuréticos y Resinas.",
        details: "Furosemida IV 40-80 mg (si hay función renal). Resinas de intercambio iónico (Patiromer o Ciclosilicato) oral. Kayexalate está en desuso por baja eficacia aguda."
      },
      {
        step: "Paso 5: Terapia Definitiva",
        action: "Hemodiálisis.",
        details: "Indicada si: Hiperpotasemia refractaria, anuria/oliguria severa, falla renal con sobrecarga o cambios EKG persistentes pese a manejo médico."
      }
    ],
    resuscitationGoals: [
      "K+ sérico < 5.0 mEq/L.",
      "Resolución de cambios electrocardiográficos.",
      "Gasto urinario adecuado (si es posible).",
      "Prevención de arritmias ventriculares fatales."
    ]
  },
  {
    id: "prot_htn_crisis",
    title: "Manejo de Crisis Hipertensiva (Emergencia vs Urgencia)",
    category: "Cardiología / Medicina Interna",
    description: "Protocolo para la diferenciación y manejo agudo de elevaciones críticas de la presión arterial.",
    activationCriteria: [
      "Presión Arterial Sistólica (PAS) >= 180 mmHg y/o Presión Arterial Diastólica (PAD) >= 120 mmHg.",
      "Emergencia: Presencia de daño agudo de órgano blanco (cerebro, corazón, riñón, retina).",
      "Urgencia: Ausencia de daño agudo de órgano blanco."
    ],
    algorithm: [
      {
        step: "Paso 1: Clasificación de la Crisis",
        action: "Evaluar daño de órgano blanco.",
        details: "Realizar Fondo de Ojo (papiledema), EKG (isquemia), Función Renal (IRA), Estado Mental. Si hay daño: EMERGENCIA (Manejo IV). Si no hay daño: URGENCIA (Manejo VO)."
      },
      {
        step: "Paso 2: Manejo de Emergencia (Hospitalario)",
        action: "Descenso gradual controlado de la Presión Arterial.",
        details: "Labetalol IV (20 mg bolo, luego infusión) o Nitroglicerina IV. Objetivo: reducir PAM no más del 25% en la primera hora, luego hacia 160/100 en 2-6 horas. EXCEPCIÓN: ACV Isquémico (no bajar si <220/120) o Disección Aórtica (bajar <120/80 de inmediato)."
      },
      {
        step: "Paso 3: Manejo de Urgencia (Ambulatorio/Observación)",
        action: "Control con medicación vía oral.",
        details: "NO usar nifedipino sublingual (riesgo de isquemia cerebral). Usar Captopril 25 mg VO, Labetalol VO o Amlodipino. Objetivo: Normalización en 24-48 horas."
      },
      {
        step: "Paso 4: Evaluación de Causas Secundarias",
        action: "Investigación etiológica.",
        details: "Considerar feocromocitoma, estenosis arteria renal, consumo de cocaína, incumplimiento terapéutico (causa más común)."
      },
      {
        step: "Paso 5: Seguimiento Post-Crisis",
        action: "Ajuste de terapia crónica.",
        details: "Asegurar cita de seguimiento en 1 semana. Revisar adherencia y factores de riesgo cardiovascular."
      }
    ],
    resuscitationGoals: [
      "PAM reducida un 20-25% en la primera hora (Emergencia).",
      "PA < 160/100 mmHg en las primeras 6 horas.",
      "Ausencia de progresión de daño de órgano blanco.",
      "Estabilidad clínica y control sintomático."
    ]
  }
];
