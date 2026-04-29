
export interface Disease {
  id: string;
  nombre: string;
  servicio: string;
  subtitle?: string;
  system?: string; // Para organizar por sistemas
  color?: string;
  icon?: string;
  
  // Pestaña 1: Resumen Ejecutivo (Clínica)
  clinica?: {
    signosSintomas: string[];
    maniobraExploracion: string;
    banderasRojas: string[];
    cita: string;
  };

  // Pestaña 2: El "Por Qué" (Fisiopatología)
  fisiopatologia?: {
    textoTecnico: string;
    esquemaMental: {
      inicio: string;
      dano: string;
      consecuencia: string;
    };
    cita: string;
  };

  // Pestaña 3: Plan de Acción (Manejo)
  manejo?: {
    diagnostico: string;
    tratamiento: string;
    tratamientoDetallado?: {
      farmacos: {
        nombre: string;
        dosis: string;
        frecuencia: string;
        observaciones: string;
      }[];
      medidasGenerales: string[];
    };
    monitoreo?: {
      parametros: string[];
      signosAlerta: string[];
    };
    evaluacion?: {
      criteriosExito: string[];
      criteriosFracaso: string[];
    };
    cita: string;
    criterioReferencia?: string;
    cuidadosEnfermeria?: string;
  };

  definicionCaso?: string;
  etiologia?: string;
  fisiopatologiaBasica?: string;
  complicaciones?: string[];
  riesgosNoTratado?: string[];
  sintomasClave?: string[];
  banderasRojas?: string[];
  procedimientos?: string[];

  // Pestaña 4: Rol de Enfermería (Seguridad)
  enfermeria?: {
    nanda: string;
    intervenciones: { accion: string; razon: string }[];
    cita: string;
  };

  // Legacy fields (for compatibility)
  mecanismoAccion?: string;
  esquemaManejo?: string;
  contraindicaciones?: string;
  nanda?: string;
  nic?: string[];
  educacion?: string;
  signosAlarma?: string;
  isLogistica?: boolean;
}

export interface Drug {
  id: string;
  nombreGenerico: string;
  familia: string;
  claseTerapeutica: string;
  mecanismoAccion: {
    dianaTerapeutica: string;
    fisiopatologiaAccion: string;
    efectoSistemico: string;
  };
  farmacocinetica: {
    inicioAccion: string;
    vidaMedia: string;
    metabolismoExcrecion: string;
  };
  administracionEnfermeria: {
    dilucionEstandar: string;
    compatibilidadY: string;
  };
  contraindicaciones: string;
  efectosAdversos: string;
  usosEnfermeria: string;
  presentaciones: string;
  color: string;
  icon: string;
}

export const DRUGS: Drug[] = [
  {
    "id": "d16",
    "nombreGenerico": "Furosemida",
    "familia": "Diurético de asa / Sulfonamida",
    "claseTerapeutica": "Diurético",
    "mecanismoAccion": {
      "dianaTerapeutica": "Cotransportador Na+/K+/2Cl- (NKCC2).",
      "fisiopatologiaAccion": "Al bloquear este transportador en la rama ascendente gruesa del asa de Henle, impide la reabsorción de electrolitos, aumentando la presión osmótica intraluminal y arrastrando agua.",
      "efectoSistemico": "Aumento de la diuresis, disminución de la precarga cardíaca y reducción de edemas."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5 min / VO: 30-60 min.",
      "vidaMedia": "2 horas.",
      "metabolismoExcrecion": "Renal 65%, biliar 35%."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Directo lento < 4mg/min para evitar ototoxicidad.",
      "compatibilidadY": "Incompatible con Milrinona, Dobutamina."
    },
    "contraindicaciones": "• Anuria o insuficiencia renal aguda anúrica\n• Hipovolemia o deshidratación severa\n• Hipopotasemia e hiponatremia graves\n• Hipersensibilidad a sulfonamidas\n• Cirrosis hepática con ascitis\n• Ototoxicidad previa por diuréticos\n• Hiperplasia prostática (riesgo de retención)\n• Desequilibrio electrolítico no corregido",
    "efectosAdversos": "• Hipopotasemia e hiponatremia\n• Ototoxicidad (especialmente en infusión rápida)\n• Hipotensión ortostática y mareo\n• Hiperuricemia (riesgo de gota)\n• Calambres musculares y deshidratación",
    "usosEnfermeria": "Intervención: Monitorizar balance hídrico y electrolitos (K, Na, Cl). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Control de peso diario a la misma hora. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar lento (<4mg/min) para evitar ototoxicidad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Control estricto de la presión arterial (riesgo de hipotensión). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de hipopotasemia (debilidad, calambres). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles de ácido úrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente en la mañana. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar turgencia de la piel y mucosas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 40mg; Amp 20mg/2ml.",
    "color": "#FFEBEE",
    "icon": "Droplet"
  },
  {
    "id": "d1",
    "nombreGenerico": "Paracetamol (Acetaminofén)",
    "familia": "Paraaminofenol",
    "claseTerapeutica": "Analgésico y Antipirético",
    "mecanismoAccion": {
      "dianaTerapeutica": "Inhibición de la síntesis de prostaglandinas en el SNC.",
      "fisiopatologiaAccion": "Actúa principalmente inhibiendo la COX-3 en el cerebro, elevando el umbral del dolor y actuando sobre el centro termorregulador hipotalámico.",
      "efectoSistemico": "Reducción de la fiebre y alivio del dolor leve a moderado sin efecto antiinflamatorio periférico significativo."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 30-60 min / IV: 5-10 min.",
      "vidaMedia": "2-3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (glucuronidación/sulfatación), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Infundir en 15 minutos.",
      "compatibilidadY": "Compatible con la mayoría de soluciones cristaloides."
    },
    "contraindicaciones": "• Hipersensibilidad al principio activo\n• Insuficiencia hepática grave o enfermedad hepática activa\n• Desnutrición crónica severa\n• Alcoholismo crónico\n• Deficiencia de glucosa-6-fosfato deshidrogenasa\n• Deshidratación severa\n• Malnutrición crónica\n• Hipovolemia",
    "efectosAdversos": "• Hepatotoxicidad (principalmente en sobredosis)\n• Erupciones cutáneas y urticaria\n• Náuseas y dolor abdominal\n• Anemia hemolítica (raro)\n• Trombocitopenia o leucopenia (muy raro)",
    "usosEnfermeria": "Intervención: Vigilar signos de hepatotoxicidad (ictericia, dolor en hipocondrio derecho). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Respetar dosis máxima (4g/día en adultos). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función hepática en tratamientos prolongados. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre el uso de otros fármacos que contengan paracetamol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar efectividad analgésica a los 30-60 min. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de reacción cutánea grave. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no exceder 4g al día. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar ingesta de alcohol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 500mg, 1g; Jbe 120mg/5ml; IV 1g/100ml.",
    "color": "#FFEBEE",
    "icon": "Pill"
  },
  {
    "id": "d6",
    "nombreGenerico": "Omeprazol",
    "familia": "Benzimidazol sustituido",
    "claseTerapeutica": "Inhibidor de la Bomba de Protones (IBP)",
    "mecanismoAccion": {
      "dianaTerapeutica": "Bomba de protones H+/K+-ATPasa.",
      "fisiopatologiaAccion": "Se une de forma irreversible a la bomba de protones en la célula parietal gástrica, bloqueando el paso final de la secreción de ácido clorhídrico.",
      "efectoSistemico": "Aumento del pH gástrico, cicatrización de úlceras y reducción del reflujo gastroesofágico."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1 hora / IV: 15-30 min.",
      "vidaMedia": "0.5 - 1 hora (pero efecto dura 24h por unión irreversible).",
      "metabolismoExcrecion": "Hepático (CYP2C19), excreción renal 80%."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Reconstituir con 10ml de solvente, administrar en 5 min.",
      "compatibilidadY": "Incompatible con soluciones ácidas."
    },
    "contraindicaciones": "• Hipersensibilidad a los IBP\n• Uso concomitante con nelfinavir\n• Osteoporosis severa (riesgo de fracturas)\n• Hipomagnesemia previa\n• Infección por Clostridium difficile activa\n• Lupus eritematoso sistémico\n• Nefritis intersticial aguda previa por IBP\n• Déficit de vitamina B12 severo",
    "efectosAdversos": "• Cefalea y mareo\n• Diarrea o estreñimiento\n• Hipomagnesemia (uso prolongado)\n• Náuseas y flatulencia\n• Riesgo aumentado de fracturas óseas y déficit de B12",
    "usosEnfermeria": "Intervención: Administrar 30 min antes del desayuno para máxima eficacia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No masticar ni triturar las cápsulas (son gastroresistentes). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de magnesio en tratamientos de larga duración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar aparición de diarrea persistente (riesgo de C. difficile). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de diarrea persistente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de calcio en uso crónico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar interacciones con clopidogrel. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Cápsulas 20mg; Vial 40mg.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d7",
    "nombreGenerico": "Ceftriaxona",
    "familia": "Cefalosporina de 3ra generación",
    "claseTerapeutica": "Antibiótico Betalactámico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Proteínas de unión a penicilina (PBPs).",
      "fisiopatologiaAccion": "Inhibe la síntesis de la pared celular bacteriana al unirse a las PBPs, lo que interfiere con la transpeptidación del peptidoglicano.",
      "efectoSistemico": "Acción bactericida contra una amplia gama de bacterias Gram-positivas y Gram-negativas."
    },
    "farmacocinetica": {
      "inicioAccion": "IM/IV: Rápido.",
      "vidaMedia": "6-9 horas (permite dosis única diaria).",
      "metabolismoExcrecion": "Renal 60%, biliar 40%."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 1g en 10ml de Agua Destilada o Solución Salina, administrar en 2-4 min.",
      "compatibilidadY": "INCOMPATIBLE con soluciones que contengan CALCIO (Ringer Lactato)."
    },
    "contraindicaciones": "• Alergia conocida a cefalosporinas o penicilinas\n• Neonatos con hiperbilirrubinemia (ictericia)\n• Uso concomitante con soluciones de calcio IV\n• Insuficiencia hepática y renal combinada grave\n• Antecedente de anemia hemolítica por cefalosporinas\n• Colelitiasis o barro biliar\n• Insuficiencia renal moderada (ajuste si hay falla hepática)\n• Recién nacidos prematuros hasta las 41 semanas",
    "efectosAdversos": "• Diarrea y náuseas\n• Reacciones alérgicas (erupción, prurito)\n• Dolor e inflamación en el sitio de inyección\n• Elevación transitoria de enzimas hepáticas\n• Barro biliar o pseudolitiasis biliar",
    "usosEnfermeria": "Intervención: Vigilar signos de anafilaxia durante la primera administración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No mezclar NUNCA con soluciones que contengan calcio (precipita). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función biliar si hay dolor abdominal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Rotar sitios de punción para evitar flebitis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de colitis pseudomembranosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar tiempo de protrombina en pacientes de riesgo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal y hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de rash cutáneo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 1g (IM/IV).",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d19",
    "nombreGenerico": "Adrenalina (Epinefrina)",
    "familia": "Catecolamina / Simpaticomimético",
    "claseTerapeutica": "Agonista Adrenérgico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos alfa-1, alfa-2, beta-1, beta-2.",
      "fisiopatologiaAccion": "Estimula el sistema nervioso simpático provocando vasoconstricción (alfa-1), aumento de frecuencia y contractilidad cardíaca (beta-1) y broncodilatación (beta-2).",
      "efectoSistemico": "Aumento de la presión arterial, gasto cardíaco y apertura de vías aéreas."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato / IM: 5-10 min.",
      "vidaMedia": "2-3 minutos.",
      "metabolismoExcrecion": "Metabolismo enzimático (MAO y COMT), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Paro: 1mg directo. Infusión: 1mg en 100ml Solución Salina.",
      "compatibilidadY": "Incompatible con soluciones alcalinas (Bicarbonato)."
    },
    "contraindicaciones": "• No hay contraindicaciones absolutas en emergencia vital\n• Glaucoma de ángulo estrecho (en uso no emergente)\n• Insuficiencia coronaria grave (salvo en RCP)\n• Hipertiroidismo no controlado\n• Parto (puede retrasar la segunda etapa)\n• Arteriosclerosis cerebral severa\n• Enfermedad orgánica del corazón\n• Dilatación cardíaca",
    "efectosAdversos": "• Taquicardia y arritmias ventriculares\n• Hipertensión arterial severa\n• Ansiedad, inquietud y temblores\n• Isquemia miocárdica o angina\n• Cefalea pulsátil y palidez",
    "usosEnfermeria": "Intervención: Monitorización continua de EKG, PA y saturación de O2. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vía central preferible para infusión continua para evitar necrosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Proteger la solución de la luz (se oxida rápidamente). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de isquemia distal en extremidades. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar sitio de inyección para evitar necrosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar perfusión tisular periférica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar glucemia (puede causar hiperglucemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de edema pulmonar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 1mg/1ml (1:1000).",
    "color": "#FFFDE7",
    "icon": "Car"
  },
  {
    "id": "d2",
    "nombreGenerico": "Ibuprofeno",
    "familia": "AINE (Derivado del ácido propiónico)",
    "claseTerapeutica": "Analgésico, Antiinflamatorio",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzimas COX-1 y COX-2.",
      "fisiopatologiaAccion": "Inhibición no selectiva de la ciclooxigenasa, reduciendo la síntesis de prostaglandinas proinflamatorias a partir del ácido araquidónico.",
      "efectoSistemico": "Reducción de la inflamación, el dolor periférico y la fiebre."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 30-60 min / IV: 15 min.",
      "vidaMedia": "2 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con alimentos. IV: Diluir en 100ml de Solución Salina o Suero Glucosado.",
      "compatibilidadY": "Incompatible con soluciones ácidas."
    },
    "contraindicaciones": "• Úlcera péptica activa o hemorragia gastrointestinal\n• Insuficiencia renal, hepática o cardíaca grave\n• Tercer trimestre de embarazo (cierre ductus arterioso)\n• Antecedente de asma o pólipos nasales por aspirina\n• Cirugía de bypass coronario reciente\n• Diátesis hemorrágica\n• Deshidratación severa en niños\n• Lupus eritematoso sistémico",
    "efectosAdversos": "• Dispepsia, náuseas y gastritis\n• Riesgo de sangrado gastrointestinal o úlcera\n• Edema y retención de líquidos\n• Mareo y cefalea\n• Tinnitus (acúfenos)",
    "usosEnfermeria": "Intervención: Administrar siempre con alimentos para reducir daño gástrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar función renal (creatinina) y diuresis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presencia de melenas o hematemesis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar escala visual analógica (EVA) para efectividad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial (puede elevarla). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función respiratoria en asmáticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de heces oscuras. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar peso por retención de líquidos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 400mg, 600mg; Susp 100mg/5ml; IV 400mg.",
    "color": "#FFF3E0",
    "icon": "Pill"
  },
  {
    "id": "d10",
    "nombreGenerico": "Ketorolaco",
    "familia": "AINE (Derivado del ácido pirrolizínico)",
    "claseTerapeutica": "Analgésico Potente",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzimas COX-1 y COX-2.",
      "fisiopatologiaAccion": "Potente inhibición de la síntesis de prostaglandinas periféricas. Posee una eficacia analgésica superior a otros AINEs.",
      "efectoSistemico": "Analgesia potente para dolor agudo moderado a severo, con mínimo efecto antiinflamatorio."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 10 min / IM: 30 min / VO: 30-60 min.",
      "vidaMedia": "4-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal (90%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV directo: Administrar en no menos de 15 segundos.",
      "compatibilidadY": "Incompatible con Tramadol en la misma jeringa."
    },
    "contraindicaciones": "• Hipersensibilidad a AINEs o aspirina\n• Úlcera gastroduodenal activa o perforación\n• Insuficiencia renal moderada a grave\n• Riesgo de hemorragia o postoperatorio de cirugía mayor\n• Hemorragia cerebrovascular sospechada\n• Pólipos nasales\n• Asma inducida por aspirina\n• Uso concomitante con otros AINEs",
    "efectosAdversos": "• Dolor abdominal y dispepsia\n• Náuseas y vómitos\n• Prolongación del tiempo de sangrado\n• Somnolencia y mareo\n• Edema y cefalea",
    "usosEnfermeria": "Intervención: No exceder 5 días de tratamiento por riesgo de falla renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de sangrado en mucosas o heridas quirúrgicas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV lento (mínimo 15 seg) para evitar dolor. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar diuresis y función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar sitio de inyección (puede ser doloroso). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar balance hídrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de hipersensibilidad inmediata. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles de creatinina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 30mg/1ml; Tab 10mg.",
    "color": "#FFF3E0",
    "icon": "Syringe"
  },
  {
    "id": "d11",
    "nombreGenerico": "Morfina",
    "familia": "Opioide natural (Fenantreno)",
    "claseTerapeutica": "Analgésico Opioide Mayor",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores opioides Mu (µ) en el SNC.",
      "fisiopatologiaAccion": "Agonista puro que mimetiza las endorfinas, inhibiendo la liberación de neurotransmisores del dolor (sustancia P) y alterando la percepción del dolor en la médula y cerebro.",
      "efectoSistemico": "Analgesia profunda, sedación, depresión respiratoria, miosis y disminución de la motilidad intestinal."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5-10 min / IM: 15-30 min.",
      "vidaMedia": "2-4 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (glucuronidación), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 10mg en 9ml de Solución Salina (1mg/ml), administrar lento.",
      "compatibilidadY": "Incompatible con Heparina, Fenitoína, Bicarbonato."
    },
    "contraindicaciones": "• Depresión respiratoria grave o asma bronquial agudo\n• Obstrucción intestinal confirmada o sospechada (íleo)\n• Traumatismo craneoencefálico con hipertensión endocraneana\n• Insuficiencia hepática grave\n• Pancreatitis aguda (espasmo esfínter de Oddi)\n• Alcoholismo agudo\n• Delirium tremens\n• Uso concomitante con IMAO",
    "efectosAdversos": "• Náuseas y vómitos\n• Estreñimiento (muy común)\n• Prurito y liberación de histamina\n• Depresión respiratoria (dosis dependiente)\n• Hipotensión y miosis (pupilas puntiformes)",
    "usosEnfermeria": "Intervención: Monitorizar frecuencia respiratoria (suspender si FR <10). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar nivel de conciencia y escala de sedación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener disponible Naloxona como antídoto de rescate. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Prevenir estreñimiento con dieta y laxantes si es crónico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar ruidos intestinales (riesgo de íleo). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar diuresis (riesgo de retención). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre cambios de posición lentos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar miosis pupilar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 10mg/1ml; Tab liberación prolongada.",
    "color": "#FCE4EC",
    "icon": "Droplet"
  },
  {
    "id": "d21",
    "nombreGenerico": "Tramadol",
    "familia": "Opioide sintético (Análogo de codeína)",
    "claseTerapeutica": "Analgésico Opioide Moderado",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Mu y transportadores de Serotonina/Noradrenalina.",
      "fisiopatologiaAccion": "Acción dual: agonista débil de receptores Mu e inhibidor de la recaptación de serotonina y noradrenalina, potenciando las vías inhibitorias descendentes.",
      "efectoSistemico": "Analgesia moderada a severa con menor impacto respiratorio y cardiovascular que los opioides potentes."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 30-60 min / IV: 5-10 min.",
      "vidaMedia": "6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2D6), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir en 100ml de Solución Salina, infundir en 20-30 min para evitar náuseas.",
      "compatibilidadY": "Incompatible con Diazepam, Aciclovir."
    },
    "contraindicaciones": "• Intoxicación aguda por alcohol, hipnóticos o analgésicos\n• Uso concomitante o reciente (14 días) de IMAO\n• Epilepsia no controlada con tratamiento\n• Insuficiencia respiratoria grave\n• Tendencia suicida o propensión a la adicción\n• Traumatismo craneal con aumento de PIC\n• Trastornos de la conciencia\n• Insuficiencia hepática moderada",
    "efectosAdversos": "• Mareo y somnolencia\n• Náuseas y vómitos (muy frecuente)\n• Sequedad de boca y sudoración\n• Estreñimiento\n• Riesgo de convulsiones (dosis altas)",
    "usosEnfermeria": "Intervención: Administrar antiemético profiláctico si hay náuseas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar riesgo de convulsiones, especialmente en dosis altas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar estado de alerta y riesgo de caídas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Diluir adecuadamente para infusión IV lenta. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar riesgo de síndrome serotoninérgico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de mareo y riesgo de caídas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no conducir vehículos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 50mg, 100mg; Cápsulas 50mg; Gotas 100mg/ml.",
    "color": "#FCE4EC",
    "icon": "Droplet"
  },
  {
    "id": "d22",
    "nombreGenerico": "Diclofenaco",
    "familia": "AINE (Derivado del ácido fenilacético)",
    "claseTerapeutica": "Analgésico, Antiinflamatorio",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzimas COX-1 y COX-2.",
      "fisiopatologiaAccion": "Inhibición potente de la síntesis de prostaglandinas. También puede reducir la concentración intracelular de ácido araquidónico libre.",
      "efectoSistemico": "Efecto antiinflamatorio, analgésico y antipirético marcado."
    },
    "farmacocinetica": {
      "inicioAccion": "IM: 15-30 min / VO: 30-60 min.",
      "vidaMedia": "1-2 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal (60%) y biliar (40%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IM: Inyección profunda en cuadrante superior externo. IV: Diluir 75mg en 100ml Solución Salina + Bicarbonato.",
      "compatibilidadY": "Inestable en soluciones ácidas."
    },
    "contraindicaciones": "• Hipersensibilidad al diclofenaco o a otros AINEs\n• Úlcera gástrica o intestinal activa o sangrado\n• Insuficiencia cardíaca grave (clase NYHA II a IV)\n• Enfermedad arterial periférica o cerebrovascular\n• Porfiria hepática\n• Insuficiencia renal leve a moderada\n• Antecedente de proctitis (si es supositorio)\n• Hipovolemia",
    "efectosAdversos": "• Dolor o abscesos en sitio de inyección IM\n• Epigastralgia y náuseas\n• Elevación de enzimas hepáticas (transaminasas)\n• Cefalea y mareo\n• Retención de líquidos e hipertensión",
    "usosEnfermeria": "Intervención: No mezclar con otros fármacos en la misma jeringa (precipita). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Aplicar IM profunda para evitar abscesos estériles. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar función renal y hepática en tratamientos largos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presión arterial (puede causar retención de sodio). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función hepática (transaminasas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de sangrado o hematomas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de visión borrosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 75mg/3ml; Tab 50mg, 100mg; Gel tópico.",
    "color": "#FFF3E0",
    "icon": "Syringe"
  },
  {
    "id": "d23",
    "nombreGenerico": "Metamizol (Dipirona)",
    "familia": "Pirazolona",
    "claseTerapeutica": "Analgésico, Antipirético, Antiespasmódico",
    "mecanismoAccion": {
      "dianaTerapeutica": "COX-3 (SNC) y canales de Calcio.",
      "fisiopatologiaAccion": "Inhibe la síntesis de prostaglandinas a nivel central y periférico. Posee un efecto relajante sobre el músculo liso.",
      "efectoSistemico": "Eficaz reducción de la fiebre y el dolor de tipo cólico o somático."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5-10 min / VO: 30-60 min.",
      "vidaMedia": "2.5 horas (metabolitos activos).",
      "metabolismoExcrecion": "Hidrólisis en TGI, metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar muy lento (1g en 10 min) para evitar hipotensión severa.",
      "compatibilidadY": "Compatible con Solución Salina y Suero Glucosado."
    },
    "contraindicaciones": "• Hipersensibilidad a pirazolonas o pirazolidinas\n• Porfiria intermitente aguda o déficit de G6PD\n• Insuficiencia renal o hepática grave\n• Hipotensión arterial preexistente o hipovolemia\n• Antecedente de asma por analgésicos\n• Tercer trimestre de embarazo\n• Niños menores de 3 meses o < 5kg\n• Glaucoma",
    "efectosAdversos": "• Hipotensión arterial (infusión rápida)\n• Agranulocitosis o leucopenia (raro pero grave)\n• Reacciones cutáneas (erupción, SSJ)\n• Náuseas y sequedad de boca\n• Coloración roja de la orina (metabolito inofensivo)",
    "usosEnfermeria": "Intervención: Monitorizar presión arterial durante y después de la infusión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV muy lento (mínimo 10 min para 1g). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de fiebre o dolor de garganta (agranulocitosis). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar reacciones alérgicas cutáneas inmediatas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de shock anafiláctico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar temperatura corporal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre coloración de orina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar presencia de dolor de garganta. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 1g/2ml; Tab 500mg; Jarabe.",
    "color": "#FFEBEE",
    "icon": "Pill"
  },
  {
    "id": "d3",
    "nombreGenerico": "Amoxicilina + Ácido Clavulánico",
    "familia": "Penicilina de amplio espectro + Inhibidor de betalactamasas",
    "claseTerapeutica": "Antibiótico Betalactámico",
    "mecanismoAccion": {
      "dianaTerapeutica": "PBPs (Proteínas de unión a penicilina) y Betalactamasas.",
      "fisiopatologiaAccion": "La amoxicilina inhibe la síntesis de la pared celular bacteriana. El ácido clavulánico se une de forma irreversible a las betalactamasas, evitando la degradación del antibiótico.",
      "efectoSistemico": "Acción bactericida contra patógenos productores y no productores de betalactamasas."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "1 hora.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal (60-80%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar al inicio de una comida para minimizar intolerancia gastrointestinal.",
      "compatibilidadY": "N/A (Uso principalmente oral)."
    },
    "contraindicaciones": "• Hipersensibilidad a penicilinas o cefalosporinas\n• Antecedente de ictericia o disfunción hepática por este fármaco\n• Mononucleosis infecciosa (riesgo de exantema)\n• Insuficiencia renal grave (requiere ajuste)\n• Antecedente de eritema multiforme\n• Leucemia linfática\n• Infecciones virales (mononucleosis)\n• Insuficiencia hepática previa por penicilinas",
    "efectosAdversos": "• Diarrea (muy común)\n• Náuseas y vómitos\n• Exantema cutáneo o urticaria\n• Candidiasis oral o vaginal\n• Elevación de enzimas hepáticas",
    "usosEnfermeria": "Intervención: Administrar al inicio de las comidas para mejorar absorción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de diarrea (descartar colitis pseudomembranosa). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre la importancia de no suspender el tratamiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función hepática y renal en uso prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar tolerancia gástrica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de sobreinfección fúngica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre completar el ciclo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar hidratación si hay diarrea. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 500/125mg, 875/125mg; Susp 400/57mg.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d12",
    "nombreGenerico": "Azitromicina",
    "familia": "Macrólido (Azálido)",
    "claseTerapeutica": "Antibiótico Bacteriostático",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad 50S del ribosoma bacteriano.",
      "fisiopatologiaAccion": "Inhibe la síntesis de proteínas dependiente de ARN al unirse a la subunidad 50S, bloqueando la translocación de los péptidos.",
      "efectoSistemico": "Control de infecciones respiratorias, de piel y tejidos blandos, y ETS."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 2-3 horas.",
      "vidaMedia": "68 horas (permite ciclos cortos de 3-5 días).",
      "metabolismoExcrecion": "Metabolismo hepático mínimo, excreción principalmente biliar."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Puede administrarse con o sin alimentos. IV: Reconstituir 500mg en 500ml Solución Salina.",
      "compatibilidadY": "Incompatible con soluciones que contengan Magnesio."
    },
    "contraindicaciones": "• Hipersensibilidad a macrólidos (eritromicina, claritromicina)\n• Insuficiencia hepática grave o colestasis\n• Uso concomitante con derivados del cornezuelo del centeno\n• Antecedente de prolongación del intervalo QT\n• Miastenia gravis\n• Insuficiencia renal grave\n• Uso concomitante con estatinas (riesgo rabdomiólisis)\n• Hipopotasemia no corregida",
    "efectosAdversos": "• Náuseas, vómitos y dolor abdominal\n• Diarrea y flatulencia\n• Prolongación del intervalo QT\n• Ototoxicidad transitoria (dosis altas)\n• Mareo y cefalea",
    "usosEnfermeria": "Intervención: Monitorizar función hepática (AST, ALT, Bilirrubinas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de arritmias o palpitaciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar 1h antes o 2h después de antiácidos con Mg/Al. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar audición en tratamientos prolongados o dosis altas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar EKG (intervalo QT). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función auditiva. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma alejada de antiácidos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar función hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 500mg; Susp 200mg/5ml; Vial 500mg.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d13",
    "nombreGenerico": "Ciprofloxacino",
    "familia": "Fluoroquinolona de 2da generación",
    "claseTerapeutica": "Antibiótico Bactericida",
    "mecanismoAccion": {
      "dianaTerapeutica": "ADN girasa (Topoisomerasa II) y Topoisomerasa IV.",
      "fisiopatologiaAccion": "Inhibe las enzimas necesarias para la replicación, transcripción, reparación y recombinación del ADN bacteriano.",
      "efectoSistemico": "Eficacia contra Gram-negativos, especialmente en infecciones urinarias y gastrointestinales."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Rápido.",
      "vidaMedia": "4 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal (40-50%) y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Infundir 400mg en 60 minutos para evitar irritación venosa.",
      "compatibilidadY": "Incompatible con soluciones alcalinas y Heparina."
    },
    "contraindicaciones": "• Hipersensibilidad a quinolonas\n• Uso concomitante de tizanidina (hipotensión severa)\n• Antecedente de patología tendinosa por quinolonas\n• Miastenia gravis (puede exacerbar debilidad)\n• Embarazo y lactancia\n• Niños en etapa de crecimiento\n• Uso concomitante con teofilina\n• Trastornos del SNC (epilepsia)",
    "efectosAdversos": "• Náuseas y diarrea\n• Mareo e insomnio\n• Tendinitis o ruptura de tendón (raro)\n• Fotosensibilidad (reacciones cutáneas al sol)\n• Prolongación del intervalo QT",
    "usosEnfermeria": "Intervención: Vigilar dolor o inflamación en tendones (especialmente Aquiles). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar exposición solar directa (riesgo de fototoxicidad). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar con lácteos o antiácidos (reducen absorción). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función renal y ajustar dosis si es necesario. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar dolor articular o tendinoso. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre protección solar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de glucosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 500mg; Vial 200mg/100ml.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d24",
    "nombreGenerico": "Vancomicina",
    "familia": "Glicopéptido",
    "claseTerapeutica": "Antibiótico Bactericida",
    "mecanismoAccion": {
      "dianaTerapeutica": "Precursores de la pared celular (D-alanil-D-alanina).",
      "fisiopatologiaAccion": "Inhibe la síntesis de la pared celular bacteriana al unirse a los precursores del peptidoglicano, impidiendo la polimerización.",
      "efectoSistemico": "Tratamiento de elección para MRSA y otras infecciones por Gram-positivos resistentes."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Rápido.",
      "vidaMedia": "4-6 horas.",
      "metabolismoExcrecion": "Excreción renal inalterada (80-90%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 1g en 250ml Solución Salina. Infundir en mínimo 60-90 minutos.",
      "compatibilidadY": "Incompatible con Heparina, Bicarbonato, Ceftriaxona."
    },
    "contraindicaciones": "• Hipersensibilidad conocida al fármaco\n• Antecedente de pérdida auditiva por vancomicina\n• Insuficiencia renal anúrica (salvo monitoreo estricto)\n• Uso concomitante con otros fármacos nefrotóxicos\n• Uso concomitante con aminoglucósidos (aumenta toxicidad)\n• Embarazo (solo si es necesario)\n• Deshidratación severa\n• Obstrucción intestinal (para uso oral)",
    "efectosAdversos": "• Síndrome del hombre rojo (infusión rápida)\n• Nefrotoxicidad (vigilar creatinina)\n• Ototoxicidad (pérdida auditiva)\n• Hipotensión y escalofríos\n• Flebitis en sitio de inyección",
    "usosEnfermeria": "Intervención: Infundir muy lento (mínimo 60 min) para evitar liberación de histamina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función renal (creatinina) y niveles séricos (valle). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de inserción venosa (altamente irritante). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar capacidad auditiva y presencia de acúfenos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles séricos (valle). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función auditiva periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de inserción venosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar balance hídrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 500mg, 1g.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d25",
    "nombreGenerico": "Meropenem",
    "familia": "Carbapenem",
    "claseTerapeutica": "Antibiótico de amplio espectro",
    "mecanismoAccion": {
      "dianaTerapeutica": "Proteínas de unión a penicilina (PBPs).",
      "fisiopatologiaAccion": "Inhibe la síntesis de la pared celular bacteriana con alta afinidad por las PBPs 2, 3 y 4 de E. coli y P. aeruginosa.",
      "efectoSistemico": "Acción bactericida potente contra Gram-positivos, Gram-negativos y anaerobios."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Rápido.",
      "vidaMedia": "1 hora.",
      "metabolismoExcrecion": "Excreción renal inalterada (70%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Reconstituir con Agua Destilada, diluir en 100ml Solución Salina. Infundir en 15-30 min.",
      "compatibilidadY": "Incompatible con Anfotericina B, Metronidazol."
    },
    "contraindicaciones": "• Hipersensibilidad a carbapenémicos o reacciones anafilácticas a betalactámicos\n• Antecedente de convulsiones\n• Insuficiencia renal grave (ajuste)\n• Hipersensibilidad a otros carbapenémicos\n• Embarazo (precaución)\n• Lactancia\n• Uso concomitante con Valproato de Sodio\n• Colitis pseudomembranosa",
    "efectosAdversos": "• Diarrea y náuseas\n• Vómitos y dolor abdominal\n• Cefalea e inflamación en sitio de inyección\n• Riesgo de convulsiones (especialmente en IR)\n• Erupción cutánea o prurito",
    "usosEnfermeria": "Intervención: Vigilar función renal. Ajustar dosis en insuficiencia renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función neurológica (convulsiones). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal (creatinina). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de anafilaxia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar recuento leucocitario. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de diarrea. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de dolor en sitio de inyección. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de erupción cutánea. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 500mg, 1g.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d26",
    "nombreGenerico": "Clindamicina",
    "familia": "Lincosamida",
    "claseTerapeutica": "Antibiótico Bacteriostático",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad 50S del ribosoma bacteriano.",
      "fisiopatologiaAccion": "Inhibe la síntesis de proteínas al unirse a la subunidad 50S, impidiendo la formación de enlaces peptídicos.",
      "efectoSistemico": "Eficaz contra anaerobios y Gram-positivos (incluyendo algunos MRSA)."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 45 min / IM: 1-3 horas.",
      "vidaMedia": "2.4 - 3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción biliar y renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 600mg en 100ml Solución Salina. Infundir en 20-30 min. No administrar en bolo.",
      "compatibilidadY": "Incompatible con Gluconato de Calcio, Fenitoína."
    },
    "contraindicaciones": "• Hipersensibilidad a lincosamidas\n• Antecedente de colitis pseudomembranosa\n• Insuficiencia hepática grave\n• Infecciones virales o fúngicas\n• Antecedente de enfermedad de Crohn\n• Colitis ulcerosa\n• Insuficiencia renal grave\n• Uso concomitante con bloqueantes neuromusculares",
    "efectosAdversos": "• Diarrea y náuseas\n• Colitis pseudomembranosa (por C. difficile)\n• Erupción cutánea o urticaria\n• Flebitis en sitio de inyección IV\n• Sabor metálico o alteración del gusto",
    "usosEnfermeria": "Intervención: Vigilar frecuencia y características de las deposiciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar IM más de 600mg por sitio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV lento (mínimo 20 min) para evitar paro cardíaco. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función hepática y renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar ruidos intestinales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de diarrea con sangre. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de inyección IM. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 600mg/4ml; Cápsulas 300mg.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d27",
    "nombreGenerico": "Gentamicina",
    "familia": "Aminoglucósido",
    "claseTerapeutica": "Antibiótico Bactericida",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad 30S del ribosoma bacteriano.",
      "fisiopatologiaAccion": "Se une a la subunidad 30S provocando una lectura errónea del código genético e inhibiendo la síntesis proteica.",
      "efectoSistemico": "Acción potente contra Gram-negativos aeróbicos."
    },
    "farmacocinetica": {
      "inicioAccion": "IM/IV: 30-60 min.",
      "vidaMedia": "2-3 horas.",
      "metabolismoExcrecion": "Excreción renal inalterada por filtración glomerular."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir en 50-100ml Solución Salina. Infundir en 30-60 min.",
      "compatibilidadY": "Incompatible con Penicilinas (se inactivan si se mezclan)."
    },
    "contraindicaciones": "• Hipersensibilidad a aminoglucósidos\n• Miastenia gravis (bloqueo neuromuscular)\n• Embarazo (ototoxicidad fetal)\n• Insuficiencia renal grave\n• Deshidratación severa\n• Uso concomitante con diuréticos de asa\n• Botulismo\n• Hipocalcemia",
    "efectosAdversos": "• Nefrotoxicidad (reversible si se detecta a tiempo)\n• Ototoxicidad irreversible (auditiva y vestibular)\n• Bloqueo neuromuscular (parálisis)\n• Mareo y náuseas\n• Erupción cutánea o prurito",
    "usosEnfermeria": "Intervención: Monitorizar función renal (creatinina) y diuresis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar capacidad auditiva y presencia de acúfenos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar hidratación adecuada del paciente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles séricos para evitar toxicidad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles séricos pico y valle. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar equilibrio y audición. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar diuresis horaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de creatinina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 80mg/2ml, 160mg/2ml.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d28",
    "nombreGenerico": "Piperacilina + Tazobactam",
    "familia": "Penicilina ureidopenicilina + Inhibidor de betalactamasas",
    "claseTerapeutica": "Antibiótico de amplio espectro",
    "mecanismoAccion": {
      "dianaTerapeutica": "Proteínas de unión a penicilina (PBPs) y Betalactamasas.",
      "fisiopatologiaAccion": "La piperacilina inhibe la síntesis de la pared celular. El tazobactam protege a la piperacilina de la degradación por betalactamasas plasmídicas y cromosómicas.",
      "efectoSistemico": "Acción bactericida potente contra Pseudomonas aeruginosa y anaerobios."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Rápido.",
      "vidaMedia": "0.7 - 1.2 horas.",
      "metabolismoExcrecion": "Excreción renal (60-80% inalterada)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 4.5g en 100ml Solución Salina. Infundir en 30 min o infusión extendida de 4 horas.",
      "compatibilidadY": "Incompatible con Aminoglucósidos (se inactivan mutuamente)."
    },
    "contraindicaciones": "• Hipersensibilidad a penicilinas o inhibidores de betalactamasas\n• Antecedente de anafilaxia a otros betalactámicos\n• Insuficiencia renal grave (requiere ajuste)\n• Fibrosis quística (riesgo de fiebre y exantema)\n• Insuficiencia renal moderada a grave\n• Fibrosis quística\n• Antecedente de convulsiones\n• Hipopotasemia",
    "efectosAdversos": "• Diarrea y náuseas\n• Exantema o erupción cutánea\n• Flebitis en sitio de infusión\n• Hipopotasemia\n• Prolongación del tiempo de sangrado (disfunción plaquetaria)",
    "usosEnfermeria": "Intervención: Vigilar función renal y niveles de potasio sérico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No mezclar con aminoglucósidos en la misma vía (se inactivan). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de sangrado o hematomas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar sitio de punción por riesgo de flebitis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de punción venosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 4.5g (4g/0.5g).",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d29",
    "nombreGenerico": "Metronidazol",
    "familia": "Nitroimidazol",
    "claseTerapeutica": "Antibiótico y Antiparasitario",
    "mecanismoAccion": {
      "dianaTerapeutica": "ADN bacteriano y protozoario.",
      "fisiopatologiaAccion": "El grupo nitro es reducido por proteínas de transporte electrónico en anaerobios, formando radicales libres que causan roturas en las hebras del ADN.",
      "efectoSistemico": "Acción bactericida contra anaerobios obligados y protozoarios (E. histolytica, G. lamblia)."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Rápido.",
      "vidaMedia": "8 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal (60-80%) y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 500mg/100ml listo para usar. Infundir en 20-60 min.",
      "compatibilidadY": "Incompatible con Aztreonam y Dopamina."
    },
    "contraindicaciones": "• Hipersensibilidad a nitroimidazoles\n• Primer trimestre de embarazo (uso restringido)\n• Consumo de alcohol (efecto disulfiram)\n• Enfermedad activa del SNC (epilepsia)\n• Trastornos hematológicos\n• Insuficiencia hepática severa\n• Segundo y tercer trimestre de embarazo (precaución)\n• Uso concomitante con litio",
    "efectosAdversos": "• Sabor metálico desagradable\n• Náuseas, vómitos y glositis\n• Orina oscura (pardo-rojiza)\n• Neuropatía periférica (en uso prolongado)\n• Mareo y cefalea",
    "usosEnfermeria": "Intervención: Advertir estrictamente sobre no consumir alcohol (efecto disulfiram). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de parestesias o debilidad (neuropatía). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar que la orina puede oscurecerse (es normal). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar con alimentos para reducir náuseas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no consumir alcohol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de glositis o estomatitis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de neuropatía. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar función hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 500mg/100ml; Tab 250mg, 500mg.",
    "color": "#E3F2FD",
    "icon": "Shield"
  },
  {
    "id": "d30",
    "nombreGenerico": "Levofloxacino",
    "familia": "Fluoroquinolona de 3ra generación",
    "claseTerapeutica": "Antibiótico Bactericida",
    "mecanismoAccion": {
      "dianaTerapeutica": "ADN girasa y Topoisomerasa IV.",
      "fisiopatologiaAccion": "Inhibe la replicación y reparación del ADN bacteriano. Mayor actividad contra Gram-positivos que ciprofloxacino.",
      "efectoSistemico": "Excelente penetración pulmonar, eficaz en neumonías adquiridas en la comunidad."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Rápido.",
      "vidaMedia": "6-8 horas.",
      "metabolismoExcrecion": "Excreción renal inalterada (>80%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 500mg en 100ml Solución Salina. Infundir en 60 min. No administrar rápido.",
      "compatibilidadY": "Incompatible con soluciones alcalinas y Heparina."
    },
    "contraindicaciones": "• Hipersensibilidad a fluoroquinolonas\n• Antecedente de tendinitis o rotura tendinosa por quinolonas\n• Epilepsia o trastornos convulsivos\n• Niños y adolescentes (riesgo de artropatía)\n• Antecedente de psicosis\n• Hipopotasemia o hipomagnesemia\n• Insuficiencia renal grave (ajuste)\n• Uso concomitante con antiarrítmicos clase IA o III",
    "efectosAdversos": "• Prolongación del intervalo QT\n• Tendinitis o rotura de tendón\n• Diarrea y náuseas\n• Mareo y cefalea\n• Fotosensibilidad",
    "usosEnfermeria": "Intervención: Monitorizar EKG en pacientes con riesgo de arritmias (QT largo). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar hidratación adecuada para evitar cristaluria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar dolor o inflamación en tendones (suspender si ocurre). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV lento (mínimo 60 min) para evitar hipotensión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar EKG (intervalo QT). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre hidratación adecuada. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de tendinitis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 500mg, 750mg; Vial 500mg/100ml.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d31",
    "nombreGenerico": "Linezolid",
    "familia": "Oxazolidinona",
    "claseTerapeutica": "Antibiótico Bacteriostático",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad 50S del ribosoma (complejo 70S).",
      "fisiopatologiaAccion": "Se une al sitio 23S de la subunidad 50S, impidiendo la formación del complejo de iniciación 70S funcional.",
      "efectoSistemico": "Actividad contra Gram-positivos multirresistentes (MRSA, VRE)."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Rápido.",
      "vidaMedia": "4.5 - 5.5 horas.",
      "metabolismoExcrecion": "Metabolismo hepático no enzimático, excreción renal (30%) y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 600mg/300ml listo para usar. Infundir en 30-120 min. Proteger de la luz.",
      "compatibilidadY": "Incompatible con Anfotericina B, Ceftriaxona, Diazepam."
    },
    "contraindicaciones": "• Hipersensibilidad al linezolid\n• Uso concomitante de inhibidores de la MAO\n• Hipertensión arterial no controlada\n• Feocromocitoma o tirotoxicosis\n• Hipertensión no controlada\n• Feocromocitoma\n• Tirotoxicosis\n• Uso concomitante con inhibidores de la recaptación de serotonina",
    "efectosAdversos": "• Trombocitopenia (uso mayor a 2 semanas)\n• Neuropatía óptica y periférica\n• Acidosis láctica (náuseas, fatiga)\n• Cefalea y mareo\n• Diarrea o náuseas",
    "usosEnfermeria": "Intervención: Monitorizar hemograma completo semanalmente (trombocitopenia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar interacciones con alimentos ricos en tiramina (quesos, vino). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar agudeza visual si el tratamiento es prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de acidosis láctica (náuseas, vómitos, fatiga). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar recuento plaquetario semanalmente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función visual (neuropatía óptica). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre dieta baja en tiramina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de síndrome serotoninérgico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 600mg; Bolsa IV 600mg/300ml.",
    "color": "#E3F2FD",
    "icon": "Shield"
  },
  {
    "id": "d32",
    "nombreGenerico": "Amikacina",
    "familia": "Aminoglucósido",
    "claseTerapeutica": "Antibiótico Bactericida",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad 30S del ribosoma bacteriano.",
      "fisiopatologiaAccion": "Se une de forma irreversible a la subunidad 30S, interfiriendo con el complejo de iniciación y causando lectura errónea del ARNm.",
      "efectoSistemico": "Acción potente contra bacilos Gram-negativos resistentes a otros aminoglucósidos."
    },
    "farmacocinetica": {
      "inicioAccion": "IM/IV: 30-60 min.",
      "vidaMedia": "2-3 horas.",
      "metabolismoExcrecion": "Excreción renal inalterada por filtración glomerular."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 500mg en 100ml Solución Salina. Infundir en 30-60 min.",
      "compatibilidadY": "Incompatible con Betalactámicos y Heparina."
    },
    "contraindicaciones": "• Hipersensibilidad a aminoglucósidos\n• Miastenia gravis\n• Insuficiencia renal grave (salvo monitoreo estricto)\n• Uso concomitante con diuréticos de asa potentes\n• Uso concomitante con cisplatino\n• Deshidratación severa\n• Botulismo\n• Hipocalcemia",
    "efectosAdversos": "• Nefrotoxicidad (vigilar creatinina)\n• Ototoxicidad auditiva y vestibular\n• Parálisis muscular (bloqueo neuromuscular)\n• Mareo y náuseas\n• Erupción cutánea",
    "usosEnfermeria": "Intervención: Monitorizar función renal (creatinina, BUN) y diuresis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar capacidad auditiva y equilibrio del paciente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Ajustar dosis según niveles séricos pico y valle. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar hidratación óptima durante el tratamiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles séricos pico y valle. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar audición y equilibrio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar diuresis horaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de creatinina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 100mg, 500mg, 1g.",
    "color": "#E3F2FD",
    "icon": "Syringe"
  },
  {
    "id": "d33",
    "nombreGenerico": "Enalapril",
    "familia": "IECA (Inhibidor de la Enzima Convertidora de Angiotensina)",
    "claseTerapeutica": "Antihipertensivo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima Convertidora de Angiotensina (ECA).",
      "fisiopatologiaAccion": "Bloquea la conversión de Angiotensina I en Angiotensina II (potente vasoconstrictor) y reduce la degradación de bradicinina.",
      "efectoSistemico": "Vasodilatación arterial y venosa, reducción de la resistencia periférica y disminución de la secreción de aldosterona."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1 hora (pico 4-6h).",
      "vidaMedia": "11 horas (Enalaprilat).",
      "metabolismoExcrecion": "Profármaco activado en hígado a Enalaprilat. Excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar independientemente de las comidas. IV: Enalaprilat 1.25mg en 5 min.",
      "compatibilidadY": "Compatible con Solución Salina y Suero Glucosado."
    },
    "contraindicaciones": "• Embarazo (teratogénico) y lactancia\n• Antecedente de angioedema por IECA\n• Estenosis bilateral de la arteria renal\n• Uso concomitante con aliskiren en diabéticos\n• Estenosis aórtica severa\n• Miocardiopatía hipertrófica\n• Antecedente de angioedema idiopático\n• Hiperpotasemia severa",
    "efectosAdversos": "• Tos seca persistente e irritativa\n• Hiperpotasemia\n• Hipotensión arterial (especialmente primera dosis)\n• Angioedema (edema de cara/lengua)\n• Mareo y cefalea",
    "usosEnfermeria": "Intervención: Monitorizar función renal y niveles de potasio sérico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de tos seca o edema facial/lingual. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presión arterial, especialmente tras la primera dosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre evitar suplementos de potasio sin indicación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de tos seca persistente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de angioedema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 5mg, 10mg, 20mg; Amp 1.25mg/ml.",
    "color": "#E8F5E9",
    "icon": "Activity"
  },
  {
    "id": "d34",
    "nombreGenerico": "Losartán",
    "familia": "ARA II (Antagonista de los Receptores de Angiotensina II)",
    "claseTerapeutica": "Antihipertensivo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor AT1 de la Angiotensina II.",
      "fisiopatologiaAccion": "Bloquea selectivamente la unión de la Angiotensina II a su receptor AT1, impidiendo sus efectos vasoconstrictores y de secreción de aldosterona.",
      "efectoSistemico": "Vasodilatación, reducción de la hipertrofia ventricular y protección renal en diabéticos."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "6-9 horas (metabolito activo).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2C9/3A4), excreción biliar (60%) y renal (35%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar una vez al día, preferiblemente a la misma hora.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Embarazo y lactancia\n• Insuficiencia hepática grave\n• Uso concomitante con aliskiren en pacientes con diabetes\n• Hipersensibilidad al componente\n• Estenosis de la arteria renal\n• Hipovolemia\n• Hiperpotasemia severa\n• Antecedente de angioedema",
    "efectosAdversos": "• Mareo y fatiga\n• Hipotensión arterial\n• Hiperpotasemia\n• Cefalea\n• Dolor muscular o de espalda",
    "usosEnfermeria": "Intervención: Controlar presión arterial y frecuencia cardíaca periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función renal y niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar presencia de mareos al cambiar de posición. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No produce tos seca como los IECA (ventaja clínica). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre cambios de posición lentos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar presencia de mareo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 50mg, 100mg.",
    "color": "#E8F5E9",
    "icon": "Activity"
  },
  {
    "id": "d35",
    "nombreGenerico": "Amlodipino",
    "familia": "Calcioantagonista (Dihidropiridina)",
    "claseTerapeutica": "Antihipertensivo, Antianginoso",
    "mecanismoAccion": {
      "dianaTerapeutica": "Canales de calcio tipo L en músculo liso vascular.",
      "fisiopatologiaAccion": "Inhibe la entrada de iones calcio a través de las membranas celulares, relajando el músculo liso arterial.",
      "efectoSistemico": "Vasodilatación periférica potente que reduce la resistencia vascular sistémica y la carga de trabajo cardíaco."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 6-12 horas para efecto máximo.",
      "vidaMedia": "30-50 horas (permite dosis única diaria).",
      "metabolismoExcrecion": "Metabolismo hepático extenso, excreción renal (60%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Puede tomarse con o sin alimentos.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipotensión severa o choque cardiogénico\n• Estenosis aórtica severa\n• Insuficiencia cardíaca inestable post-IAM\n• Hipersensibilidad a dihidropiridinas\n• Angina inestable (salvo Prinzmetal)\n• Insuficiencia hepática grave\n• Embarazo y lactancia\n• Obstrucción del tracto de salida del ventrículo izquierdo",
    "efectosAdversos": "• Edema maleolar (tobillos hinchados)\n• Rubor facial (sofocos)\n• Cefalea y mareo\n• Palpitaciones\n• Hiperplasia gingival (raro)",
    "usosEnfermeria": "Intervención: Vigilar aparición de edemas periféricos (especialmente tobillos). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presión arterial y frecuencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar cefalea o rubor facial como efectos secundarios. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre higiene postural para evitar mareos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presencia de edema maleolar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presión arterial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre higiene oral (hiperplasia gingival). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 5mg, 10mg.",
    "color": "#E8F5E9",
    "icon": "Activity"
  },
  {
    "id": "d36",
    "nombreGenerico": "Atenolol",
    "familia": "Beta-bloqueante (Cardioselectivo Beta-1)",
    "claseTerapeutica": "Antihipertensivo, Antiarrítmico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Beta-1 cardíacos.",
      "fisiopatologiaAccion": "Bloquea de forma competitiva los receptores beta-1, reduciendo la respuesta simpática en el corazón.",
      "efectoSistemico": "Disminución de la frecuencia cardíaca (cronotrópico -), contractilidad (inotrópico -) y demanda de oxígeno."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1 hora.",
      "vidaMedia": "6-7 horas.",
      "metabolismoExcrecion": "Mínimo metabolismo hepático, excreción renal inalterada (85%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar antes de las comidas o al acostarse.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Bradicardia sinusal severa (<50 lpm)\n• Bloqueo AV de 2do o 3er grado\n• Choque cardiogénico o IC descompensada\n• Asma bronquial o EPOC grave\n• Acidosis metabólica\n• Trastornos arteriales periféricos graves\n• Feocromocitoma no tratado\n• Hipotensión severa",
    "efectosAdversos": "• Bradicardia sinusal\n• Fatiga y debilidad muscular\n• Extremidades frías (vasoconstricción periférica)\n• Disfunción eréctil\n• Mareo y trastornos del sueño",
    "usosEnfermeria": "Intervención: Controlar pulso apical por 1 min antes de administrar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Suspender y avisar si FC <50-60 lpm o PA sistólica <90. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No suspender bruscamente (riesgo de efecto rebote). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de broncoespasmo en pacientes predispuestos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 50mg, 100mg.",
    "color": "#E8F5E9",
    "icon": "Heart"
  },
  {
    "id": "d37",
    "nombreGenerico": "Metoprolol",
    "familia": "Beta-bloqueante (Cardioselectivo Beta-1)",
    "claseTerapeutica": "Antihipertensivo, Antianginoso",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Beta-1.",
      "fisiopatologiaAccion": "Inhibe competitivamente los efectos de las catecolaminas en el corazón.",
      "efectoSistemico": "Reduce la frecuencia cardíaca, el gasto cardíaco y la presión arterial sistólica."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1 hora / IV: Inmediato.",
      "vidaMedia": "3-7 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (CYP2D6), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar 5mg en 1-2 min. VO: Con alimentos para aumentar biodisponibilidad.",
      "compatibilidadY": "Compatible con Solución Salina."
    },
    "contraindicaciones": "• Bradicardia severa o bloqueo AV de alto grado\n• Insuficiencia cardíaca descompensada (clase IV)\n• Choque cardiogénico\n• Enfermedad del seno enfermo\n• Asma bronquial o EPOC (precaución)\n• Hipotensión severa\n• Trastornos circulatorios periféricos graves\n• Feocromocitoma no tratado",
    "efectosAdversos": "• Mareo y cefalea\n• Fatiga y somnolencia\n• Bradicardia\n• Depresión o cambios de humor\n• Broncoespasmo (en dosis altas)",
    "usosEnfermeria": "Intervención: Monitorizar frecuencia cardíaca y presión arterial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar con alimentos para mejorar biodisponibilidad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Precaución en diabéticos (enmascara signos de hipoglucemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de insuficiencia cardíaca (edema, disnea). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 50mg, 100mg; Amp 5mg/5ml.",
    "color": "#E8F5E9",
    "icon": "Heart"
  },
  {
    "id": "d38",
    "nombreGenerico": "Carvedilol",
    "familia": "Beta-bloqueante no selectivo + Alfa-1 bloqueante",
    "claseTerapeutica": "Antihipertensivo, Manejo de IC",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Beta-1, Beta-2 y Alfa-1.",
      "fisiopatologiaAccion": "Bloqueo beta reduce FC y contractilidad; bloqueo alfa-1 produce vasodilatación periférica.",
      "efectoSistemico": "Reducción de la resistencia periférica y protección contra el remodelado cardíaco."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "7-10 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2D6/2C9), excreción biliar/fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con alimentos para reducir riesgo de hipotensión ortostática.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Asma bronquial o antecedentes de broncoespasmo\n• Bloqueo AV de 2do o 3er grado\n• Insuficiencia hepática grave\n• Choque cardiogénico\n• Bradicardia severa (<50 lpm)\n• Insuficiencia cardíaca descompensada\n• Hipotensión severa\n• Enfermedad del seno enfermo",
    "efectosAdversos": "• Hipotensión ortostática (mareo al levantarse)\n• Bradicardia\n• Aumento de peso y edema\n• Hiperglucemia (en diabéticos)\n• Fatiga y cefalea",
    "usosEnfermeria": "Intervención: Vigilar signos de insuficiencia cardíaca al inicio del tratamiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar peso diario y presencia de edemas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar con alimentos para reducir hipotensión ortostática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar glucemia en pacientes diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 6.25mg, 12.5mg, 25mg.",
    "color": "#E8F5E9",
    "icon": "Heart"
  },
  {
    "id": "d39",
    "nombreGenerico": "Bisoprolol",
    "familia": "Beta-bloqueante (Altamente cardioselectivo Beta-1)",
    "claseTerapeutica": "Antihipertensivo, Manejo de IC",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Beta-1.",
      "fisiopatologiaAccion": "Bloqueo selectivo que reduce la estimulación simpática cardíaca con mínimo efecto bronquial.",
      "efectoSistemico": "Disminución de la FC y la demanda de oxígeno miocárdico."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "9-12 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (50%), excreción renal (50%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Dosis única matutina.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Insuficiencia cardíaca aguda o descompensada\n• Choque cardiogénico\n• Bloqueo AV de 2do o 3er grado\n• Bradicardia severa (<50 lpm)\n• Asma bronquial o EPOC grave\n• Hipotensión severa\n• Enfermedad del seno enfermo\n• Trastornos circulatorios periféricos graves",
    "efectosAdversos": "• Fatiga y astenia\n• Mareo y cefalea\n• Bradicardia\n• Sensación de frío en extremidades\n• Náuseas y diarrea",
    "usosEnfermeria": "Intervención: Controlar frecuencia cardíaca y presión arterial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar tolerancia en pacientes con enfermedad pulmonar leve. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No suspender bruscamente el tratamiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de fatiga o debilidad muscular. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 2.5mg, 5mg, 10mg.",
    "color": "#E8F5E9",
    "icon": "Heart"
  },
  {
    "id": "d40",
    "nombreGenerico": "Propranolol",
    "familia": "Beta-bloqueante no selectivo",
    "claseTerapeutica": "Antihipertensivo, Antianginoso, Profilaxis Migraña",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Beta-1 y Beta-2.",
      "fisiopatologiaAccion": "Bloquea competitivamente ambos receptores beta, afectando corazón y bronquios.",
      "efectoSistemico": "Cronotrópico e inotrópico negativo; puede causar bronconstricción."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "3-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (primer paso), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar antes de las comidas.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Asma bronquial o antecedentes de broncoespasmo\n• EPOC grave\n• Bradicardia sinusal o bloqueo AV\n• Choque cardiogénico\n• Insuficiencia cardíaca descompensada\n• Acidosis metabólica\n• Ayuno prolongado\n• Feocromocitoma no tratado",
    "efectosAdversos": "• Broncoespasmo (en pacientes predispuestos)\n• Bradicardia\n• Fatiga y debilidad\n• Pesadillas y trastornos del sueño\n• Extremidades frías",
    "usosEnfermeria": "Intervención: Vigilar estrechamente la función respiratoria (riesgo de broncoespasmo). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar frecuencia cardíaca y presión arterial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar calidad del sueño (puede causar pesadillas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No usar en pacientes con antecedentes de hiperreactividad bronquial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 10mg, 40mg, 80mg.",
    "color": "#E8F5E9",
    "icon": "Heart"
  },
  {
    "id": "d41",
    "nombreGenerico": "Hidroclorotiazida",
    "familia": "Diurético Tiazídico",
    "claseTerapeutica": "Antihipertensivo, Diurético",
    "mecanismoAccion": {
      "dianaTerapeutica": "Cotransportador Na+/Cl- en el túbulo contorneado distal.",
      "fisiopatologiaAccion": "Inhibe la reabsorción de sodio y cloro, aumentando la excreción de agua, sodio, potasio y cloro.",
      "efectoSistemico": "Reducción del volumen plasmático y de la resistencia vascular periférica a largo plazo."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 2 horas.",
      "vidaMedia": "6-15 horas.",
      "metabolismoExcrecion": "No se metaboliza, excreción renal inalterada."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar en la mañana para evitar nicturia.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Anuria o insuficiencia renal grave\n• Hipersensibilidad a sulfonamidas o tiazidas\n• Hipopotasemia o hiponatremia refractaria\n• Hipercalcemia preexistente\n• Gota severa\n• Enfermedad de Addison\n• Embarazo (precaución)\n• Lactancia",
    "efectosAdversos": "• Hipopotasemia e hiponatremia\n• Hiperuricemia (puede desencadenar gota)\n• Hiperglucemia\n• Mareo y cefalea\n• Fotosensibilidad",
    "usosEnfermeria": "Intervención: Monitorizar electrolitos séricos (K, Na, Mg, Ca). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente en la mañana para evitar nicturia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles de ácido úrico en pacientes con gota. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de glucosa en pacientes diabéticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presión arterial. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma matutina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de hiperuricemia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de electrolitos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 12.5mg, 25mg, 50mg.",
    "color": "#E8F5E9",
    "icon": "Droplet"
  },
  {
    "id": "d42",
    "nombreGenerico": "Espironolactona",
    "familia": "Antagonista de la Aldosterona / Diurético ahorrador de potasio",
    "claseTerapeutica": "Diurético, Manejo de IC",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de mineralocorticoides en el túbulo distal.",
      "fisiopatologiaAccion": "Compite con la aldosterona, inhibiendo la reabsorción de sodio y la secreción de potasio.",
      "efectoSistemico": "Diuresis leve con retención de potasio; reduce la fibrosis miocárdica."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 24-48 horas para efecto máximo.",
      "vidaMedia": "1-2 horas (metabolitos activos duran más).",
      "metabolismoExcrecion": "Metabolismo hepático a canrenona, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con alimentos para mejorar absorción.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hiperpotasemia (>5.0 mEq/L)\n• Insuficiencia renal aguda o grave (CrCl <30 ml/min)\n• Enfermedad de Addison\n• Uso concomitante de otros diuréticos ahorradores de potasio\n• Hipersensibilidad a la espironolactona\n• Embarazo (precaución)\n• Lactancia\n• Uso concomitante con eplerenona",
    "efectosAdversos": "• Hiperpotasemia (riesgo de arritmias)\n• Ginecomastia (crecimiento mamario en hombres)\n• Irregularidades menstruales\n• Mareo y cefalea\n• Calambres musculares",
    "usosEnfermeria": "Intervención: Monitorizar estrictamente niveles de potasio sérico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar suplementos de potasio o sustitutos de sal con potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de ginecomastia o dolor mamario. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar función renal y balance hídrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre evitar sustitutos de sal con potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar presencia de ginecomastia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 25mg, 100mg.",
    "color": "#E8F5E9",
    "icon": "Droplet"
  },
  {
    "id": "d43",
    "nombreGenerico": "Digoxina",
    "familia": "Glucósido Cardíaco",
    "claseTerapeutica": "Inotrópico Positivo, Antiarrítmico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Bomba Na+/K+-ATPasa cardíaca.",
      "fisiopatologiaAccion": "Inhibe la bomba, aumentando el sodio intracelular, lo que favorece la entrada de calcio vía intercambiador Na+/Ca2+.",
      "efectoSistemico": "Aumenta la fuerza de contracción (inotrópico +) y disminuye la conducción AV (cronotrópico -)."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: 5-30 min.",
      "vidaMedia": "36-48 horas.",
      "metabolismoExcrecion": "Excreción renal inalterada (60-70%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar lento en al menos 5 min. Puede diluirse en Solución Salina.",
      "compatibilidadY": "Incompatible con Dobutamina."
    },
    "contraindicaciones": "• Fibrilación ventricular o taquicardia ventricular\n• Bloqueo AV completo o de 2do grado\n• Hipopotasemia o hipomagnesemia (aumentan toxicidad)\n• Síndrome de Wolff-Parkinson-White\n• Miocardiopatía hipertrófica obstructiva\n• Pericarditis constrictiva\n• Hipercalcemia\n• Hipersensibilidad a la digoxina",
    "efectosAdversos": "• Toxicidad digitálica (náuseas, vómitos)\n• Visión amarilla o con halos (xantopsia)\n• Arritmias cardíacas\n• Bradicardia extrema\n• Confusión o desorientación",
    "usosEnfermeria": "Intervención: Controlar frecuencia cardíaca apical por 1 min completo antes de dar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles séricos (rango terapéutico estrecho: 0.5-2 ng/ml). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de potasio (hipopotasemia predispone a toxicidad). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar signos de intoxicación: náuseas, vómitos, visión con halos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles séricos de digoxina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar frecuencia cardíaca apical. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de visión amarilla. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 0.25mg; Elixir 0.05mg/ml; Amp 0.5mg/2ml.",
    "color": "#E8F5E9",
    "icon": "Zap"
  },
  {
    "id": "d44",
    "nombreGenerico": "Amiodarona",
    "familia": "Antiarrítmico Clase III (Benzofurano)",
    "claseTerapeutica": "Antiarrítmico de amplio espectro",
    "mecanismoAccion": {
      "dianaTerapeutica": "Canales de Potasio (principalmente), Sodio y Calcio.",
      "fisiopatologiaAccion": "Prolonga la duración del potencial de acción y el periodo refractario al bloquear los canales de potasio.",
      "efectoSistemico": "Estabilización del ritmo cardíaco en arritmias supraventriculares y ventriculares."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Minutos / VO: Días a semanas.",
      "vidaMedia": "20 - 100 días (muy prolongada).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción biliar/fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir EXCLUSIVAMENTE en Suero Glucosado. Usar vía central si es posible.",
      "compatibilidadY": "Incompatible con Solución Salina (precipita), Heparina, Furosemida."
    },
    "contraindicaciones": "• Bradicardia sinusal severa o bloqueo AV de alto grado\n• Disfunción tiroidea previa (contiene yodo)\n• Hipersensibilidad conocida al yodo\n• Embarazo y lactancia (riesgo de bocio fetal)\n• Bloqueo AV de 2do o 3er grado (sin marcapasos)\n• Enfermedad pulmonar intersticial\n• Hipopotasemia severa\n• Prolongación del intervalo QT congénito",
    "efectosAdversos": "• Toxicidad pulmonar (fibrosis pulmonar)\n• Disfunción tiroidea (hipo o hipertiroidismo)\n• Microdepósitos corneales (visión borrosa)\n• Fotosensibilidad y coloración azulada de la piel\n• Bradicardia y bloqueos cardíacos",
    "usosEnfermeria": "Intervención: Monitorizar función tiroidea y hepática periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Realizar Rx de tórax basal y de seguimiento (fibrosis pulmonar). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar exposición solar y usar protector (fotosensibilidad). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Diluir exclusivamente en Suero Glucosado (precipita en Solución Salina). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función tiroidea. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función pulmonar (tos, disnea). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre protección solar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de bradicardia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 200mg; Amp 150mg/3ml.",
    "color": "#E8F5E9",
    "icon": "Zap"
  },
  {
    "id": "d45",
    "nombreGenerico": "Verapamilo",
    "familia": "Calcioantagonista (Fenilalquilamina)",
    "claseTerapeutica": "Antiarrítmico Clase IV, Antihipertensivo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Canales de calcio tipo L en miocardio y vasos.",
      "fisiopatologiaAccion": "Inhibe la entrada de calcio, con mayor selectividad por el tejido de conducción cardíaco que las dihidropiridinas.",
      "efectoSistemico": "Disminuye la FC, la conducción AV y produce vasodilatación coronaria y periférica."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: 1-5 min.",
      "vidaMedia": "3-7 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso, excreción renal (70%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar 5mg lento en 2-3 min bajo monitoreo EKG.",
      "compatibilidadY": "Incompatible con Albúmina, Anfotericina B."
    },
    "contraindicaciones": "• Hipotensión grave o choque cardiogénico\n• Bloqueo AV de 2do o 3er grado\n• Insuficiencia cardíaca con fracción de eyección reducida\n• Síndrome de Wolff-Parkinson-White con FA\n• Infarto agudo de miocardio complicado\n• Bradicardia severa\n• Uso concomitante con betabloqueantes IV\n• Hipersensibilidad al verapamilo",
    "efectosAdversos": "• Estreñimiento (muy frecuente)\n• Bradicardia y bloqueos AV\n• Edema periférico\n• Mareo y cefalea\n• Hipotensión arterial",
    "usosEnfermeria": "Intervención: Monitorizar EKG y presión arterial durante la administración IV. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estrechamente la aparición de estreñimiento (muy común). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar frecuencia cardíaca (suspender si bradicardia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar el consumo de jugo de toronja (aumenta niveles). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presencia de estreñimiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar EKG y PA. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre evitar jugo de toronja. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de edema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 80mg, 120mg; Amp 5mg/2ml.",
    "color": "#E8F5E9",
    "icon": "Activity"
  },
  {
    "id": "d46",
    "nombreGenerico": "Atorvastatina",
    "familia": "Estatina (Inhibidor de la HMG-CoA reductasa)",
    "claseTerapeutica": "Hipolipemiante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima HMG-CoA reductasa en el hígado.",
      "fisiopatologiaAccion": "Inhibe el paso limitante de la síntesis de colesterol, aumentando los receptores de LDL en los hepatocitos.",
      "efectoSistemico": "Reducción marcada de LDL y triglicéridos; ligero aumento de HDL. Efectos pleiotrópicos (estabiliza placa)."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: Efecto máximo en 2-4 semanas.",
      "vidaMedia": "14 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción biliar."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar preferiblemente en la noche.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Enfermedad hepática activa o elevación persistente de transaminasas\n• Embarazo y lactancia (categoría X)\n• Hipersensibilidad a las estatinas\n• Uso concomitante de inhibidores potentes de CYP3A4\n• Miopatía previa\n• Uso concomitante con ciclosporina\n• Alcoholismo crónico\n• Insuficiencia renal grave (precaución)",
    "efectosAdversos": "• Mialgias (dolor muscular)\n• Elevación de transaminasas hepáticas\n• Rabdomiólisis (destrucción muscular - raro)\n• Cefalea y mareo\n• Estreñimiento o flatulencia",
    "usosEnfermeria": "Intervención: Monitorizar perfil lipídico y enzimas hepáticas (ALT, AST). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir al paciente a reportar dolor o debilidad muscular (rabdomiólisis). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por la noche para mayor eficacia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre dieta baja en grasas y ejercicio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de CPK si hay dolor muscular. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función hepática periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma preferiblemente nocturna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de rabdomiólisis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 10mg, 20mg, 40mg, 80mg.",
    "color": "#F3E5F5",
    "icon": "Activity"
  },
  {
    "id": "d47",
    "nombreGenerico": "Aspirina (Ácido Acetilsalicílico)",
    "familia": "Salicilato / AINE",
    "claseTerapeutica": "Antiagregante Plaquetario",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima COX-1 plaquetaria.",
      "fisiopatologiaAccion": "Inhibición irreversible de la COX-1, bloqueando la formación de Tromboxano A2 (agregante plaquetario).",
      "efectoSistemico": "Prevención de la formación de trombos arteriales."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 15-30 min (efecto antiagregante).",
      "vidaMedia": "15-20 min (pero efecto dura toda la vida de la plaqueta: 7-10 días).",
      "metabolismoExcrecion": "Hidrólisis a salicilato, metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Tomar con alimentos para reducir irritación gástrica.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad a salicilatos o AINEs\n• Sangrado gastrointestinal activo o úlcera péptica\n• Niños con infecciones virales (riesgo de Síndrome de Reye)\n• Trastornos de la coagulación o trombocitopenia severa\n• Insuficiencia renal o hepática grave\n• Pólipos nasales asociados a asma\n• Tercer trimestre de embarazo\n• Cirugía mayor reciente",
    "efectosAdversos": "• Gastritis y dolor epigástrico\n• Úlcera péptica y sangrado digestivo\n• Acúfenos o tinnitus (en dosis altas)\n• Broncoespasmo (en pacientes sensibles)\n• Síndrome de Reye (en niños con virus)",
    "usosEnfermeria": "Intervención: Vigilar signos de sangrado (melenas, hematemesis, gingivorragia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Suspender 7-10 días antes de cirugías programadas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar con alimentos para reducir la irritación gástrica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar presencia de acúfenos o hipoacusia (signo de toxicidad). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de acúfenos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de heces oscuras. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar niveles de hemoglobina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 100mg (infantil), 500mg.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d48",
    "nombreGenerico": "Clopidogrel",
    "familia": "Tienopiridina",
    "claseTerapeutica": "Antiagregante Plaquetario",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor P2Y12 de ADP en las plaquetas.",
      "fisiopatologiaAccion": "Inhibe de forma irreversible la unión del ADP a su receptor, impidiendo la activación del complejo GPIIb/IIIa.",
      "efectoSistemico": "Inhibición de la agregación plaquetaria inducida por ADP."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 2 horas (dosis carga).",
      "vidaMedia": "6 horas.",
      "metabolismoExcrecion": "Profármaco activado por CYP2C19 en hígado. Excreción renal y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar una vez al día.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Sangrado patológico activo (úlcera, hemorragia intracraneal)\n• Insuficiencia hepática grave\n• Hipersensibilidad al clopidogrel\n• Lactancia\n• Embarazo (precaución)\n• Púrpura trombocitopénica trombótica previa\n• Uso concomitante con omeprazol (reduce eficacia)\n• Cirugía mayor programada en 7 días",
    "efectosAdversos": "• Sangrado y hematomas espontáneos\n• Púrpura trombocitopénica trombótica (raro)\n• Diarrea y dolor abdominal\n• Mareo y cefalea\n• Prurito o erupción cutánea",
    "usosEnfermeria": "Intervención: Vigilar signos de sangrado y aparición de hematomas espontáneos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar el uso de IBP como omeprazol (reducen su eficacia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar recuento de plaquetas periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar al paciente sobre el riesgo de sangrado prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar recuento plaquetario. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de hematomas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar interacciones con IBP. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 75mg.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d49",
    "nombreGenerico": "Enoxaparina",
    "familia": "Heparina de Bajo Peso Molecular (HBPM)",
    "claseTerapeutica": "Anticoagulante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Antitrombina III y Factor Xa.",
      "fisiopatologiaAccion": "Potencia la acción de la antitrombina III, inactivando preferentemente el factor Xa y en menor medida el factor IIa (trombina).",
      "efectoSistemico": "Prevención y tratamiento de la trombosis venosa y síndromes coronarios."
    },
    "farmacocinetica": {
      "inicioAccion": "SC: 3-5 horas para efecto máximo.",
      "vidaMedia": "4.5 - 7 horas.",
      "metabolismoExcrecion": "Metabolismo hepático mínimo, excreción renal (principalmente)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "SC: Inyectar en tejido celular subcutáneo abdominal. No purgar la burbuja de aire.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Sangrado activo mayor o trastornos de la coagulación\n• Antecedente de trombocitopenia inducida por heparina (HIT)\n• Endocarditis bacteriana aguda\n• Insuficiencia renal grave (requiere ajuste estricto)\n• Hipersensibilidad a la enoxaparina o heparina\n• Cirugía reciente de SNC o ojos\n• Hipertensión arterial grave no controlada\n• Bajo peso corporal (<45kg en mujeres, <57kg en hombres - precaución)",
    "efectosAdversos": "• Sangrado y hemorragias\n• Hematoma en sitio de inyección\n• Trombocitopenia (HIT)\n• Anemia y equimosis\n• Elevación de enzimas hepáticas",
    "usosEnfermeria": "Intervención: Aplicar SC en abdomen, rotando sitios y sin purgar la burbuja. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No masajear el sitio de inyección para evitar hematomas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar recuento de plaquetas y signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar función renal (aclaramiento de creatinina). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar sitio de inyección (no masajear). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de hematuria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar recuento de plaquetas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Jeringas prellenadas 20mg, 40mg, 60mg, 80mg.",
    "color": "#E1F5FE",
    "icon": "Droplet"
  },
  {
    "id": "d50",
    "nombreGenerico": "Warfarina",
    "familia": "Derivado de la Cumarina",
    "claseTerapeutica": "Anticoagulante Oral",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima Epóxido Reductasa de Vitamina K.",
      "fisiopatologiaAccion": "Inhibe la síntesis hepática de los factores de coagulación dependientes de Vitamina K (II, VII, IX, X).",
      "efectoSistemico": "Anticoagulación prolongada; requiere días para alcanzar efecto pleno."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 36-72 horas.",
      "vidaMedia": "20 - 60 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2C9), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar a la misma hora todos los días.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Embarazo (altamente teratogénico)\n• Sangrado activo o cirugía reciente de SNC/ojos\n• Hipertensión arterial grave no controlada\n• Insuficiencia hepática grave\n• Diátesis hemorrágica\n• Úlcera péptica activa\n• Alcoholismo crónico\n• Insuficiencia renal grave\n• Hipersensibilidad a la warfarina",
    "efectosAdversos": "• Hemorragia (principal riesgo)\n• Necrosis cutánea (raro)\n• Síndrome de los dedos morados\n• Náuseas y dolor abdominal\n• Alopecia o erupción cutánea",
    "usosEnfermeria": "Intervención: Monitorizar estrictamente el INR (rango meta usual 2.0-3.0). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre dieta constante en Vitamina K (vegetales verdes). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Advertir sobre interacciones con otros fármacos y alcohol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener disponible Vitamina K como antídoto de rescate. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar INR periódicamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de sangrado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre dieta estable en vitamina K. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar interacciones medicamentosas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 2mg, 5mg.",
    "color": "#E1F5FE",
    "icon": "Droplet"
  },
  {
    "id": "d51",
    "nombreGenerico": "Dobutamina",
    "familia": "Catecolamina Sintética",
    "claseTerapeutica": "Inotrópico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Beta-1 (principalmente).",
      "fisiopatologiaAccion": "Estimulación directa de receptores beta-1, aumentando la contractilidad y el volumen sistólico.",
      "efectoSistemico": "Aumento del gasto cardíaco con efecto vasodilatador periférico leve (beta-2)."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-2 min.",
      "vidaMedia": "2 minutos.",
      "metabolismoExcrecion": "Metabolismo hepático a metabolitos inactivos, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 250mg en 250ml Solución Salina o Suero Glucosado. Administrar por bomba de infusión.",
      "compatibilidadY": "Incompatible con Bicarbonato, Furosemida, Heparina."
    },
    "contraindicaciones": "• Estenosis subaórtica hipertrófica idiopática\n• Hipersensibilidad a la dobutamina\n• Taquiarritmias ventriculares graves\n• Miocardiopatía hipertrófica obstructiva\n• Pericarditis constrictiva\n• Taponamiento cardíaco\n• Hipovolemia no corregida\n• Uso concomitante con IMAO",
    "efectosAdversos": "• Taquicardia y palpitaciones\n• Arritmias ventriculares\n• Hipertensión arterial\n• Dolor torácico o anginoso\n• Náuseas y cefalea",
    "usosEnfermeria": "Intervención: Monitorización continua de EKG, PA y presión venosa central. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar exclusivamente por bomba de infusión continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de punción por riesgo de extravasación y necrosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar diuresis y signos de perfusión tisular. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial invasiva si es posible. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar gasto urinario horariamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de dolor torácico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de arritmias ventriculares. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 250mg/20ml.",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d52",
    "nombreGenerico": "Dopamina",
    "familia": "Catecolamina Natural",
    "claseTerapeutica": "Inotrópico, Vasopresor",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Dopaminérgicos, Beta-1 y Alfa-1 (dosis dependiente).",
      "fisiopatologiaAccion": "Dosis baja: vasodilatación renal. Dosis media: inotropismo +. Dosis alta: vasoconstricción periférica.",
      "efectoSistemico": "Aumento de la perfusión renal, gasto cardíaco y presión arterial según la dosis."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5 min.",
      "vidaMedia": "2 minutos.",
      "metabolismoExcrecion": "Metabolismo hepático, renal y plasmático (MAO/COMT). Excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 200mg en 250ml Solución Salina. Administrar por vía central preferiblemente.",
      "compatibilidadY": "Incompatible con Bicarbonato y soluciones alcalinas."
    },
    "contraindicaciones": "• Feocromocitoma (tumor productor de catecolaminas)\n• Taquiarritmias no controladas o fibrilación ventricular\n• Hipersensibilidad a la dopamina\n• Uso de IMAO en los últimos 14 días\n• Hipovolemia no corregida\n• Estenosis subaórtica hipertrófica\n• Taquicardia ventricular\n• Hipoxia severa",
    "efectosAdversos": "• Taquicardia y arritmias\n• Náuseas y vómitos\n• Vasoconstricción excesiva (isquemia distal)\n• Necrosis tisular por extravasación\n• Cefalea y ansiedad",
    "usosEnfermeria": "Intervención: Monitorización hemodinámica estricta (FC, PA, PVC). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por vía central para evitar necrosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar diuresis horaria (indicador de perfusión renal). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener Fentolamina lista en caso de extravasación accidental. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar sitio de infusión (riesgo de necrosis). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar perfusión distal (llenado capilar). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de cefalea intensa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar diuresis (efecto dosis dependiente). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 200mg/5ml.",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d53",
    "nombreGenerico": "Noradrenalina (Norepinefrina)",
    "familia": "Catecolamina / Simpaticomimético",
    "claseTerapeutica": "Vasopresor Potente",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Alfa-1 (potente) y Beta-1 (moderado).",
      "fisiopatologiaAccion": "Vasoconstricción periférica intensa y aumento moderado de la contractilidad cardíaca.",
      "efectoSistemico": "Aumento marcado de la presión arterial sistémica y resistencia vascular periférica."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato.",
      "vidaMedia": "1-2 minutos.",
      "metabolismoExcrecion": "Metabolismo hepático y tisular, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 4mg en 100ml Suero Glucosado. ADMINISTRAR SOLO POR VÍA CENTRAL.",
      "compatibilidadY": "Incompatible con Solución Salina (se oxida más rápido), Bicarbonato."
    },
    "contraindicaciones": "• Hipotensión por hipovolemia (corregir volumen primero)\n• Trombosis vascular mesentérica o periférica\n• Hipersensibilidad a las catecolaminas\n• Uso concomitante con anestésicos halogenados\n• Hipoxia grave o hipercapnia\n• Hipovolemia no corregida\n• Enfermedad vascular periférica\n• Hipertensión arterial severa",
    "efectosAdversos": "• Isquemia periférica (dedos fríos/cianóticos)\n• Bradicardia refleja\n• Arritmias cardíacas\n• Necrosis tisular severa por extravasación\n• Ansiedad y disnea",
    "usosEnfermeria": "Intervención: ADMINISTRAR ÚNICAMENTE POR VÍA CENTRAL (riesgo alto de necrosis). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización invasiva de la presión arterial (línea arterial). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar perfusión distal y coloración de extremidades. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Diluir preferiblemente en Suero Glucosado para evitar oxidación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial cada 5-15 min. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar coloración de extremidades. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de dolor en sitio de punción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de extravasación (antídoto: fentolamina). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 4mg/4ml.",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d54",
    "nombreGenerico": "Nitroglicerina",
    "familia": "Nitrato Orgánico",
    "claseTerapeutica": "Vasodilatador, Antianginoso",
    "mecanismoAccion": {
      "dianaTerapeutica": "Músculo liso vascular (vía óxido nítrico).",
      "fisiopatologiaAccion": "Se convierte en óxido nítrico, activando la guanilato ciclasa y aumentando el GMPc, lo que relaja el músculo liso.",
      "efectoSistemico": "Vasodilatación venosa (predominante) y arterial, reduciendo precarga y demanda de oxígeno."
    },
    "farmacocinetica": {
      "inicioAccion": "SL: 1-3 min / IV: Inmediato.",
      "vidaMedia": "1-4 minutos.",
      "metabolismoExcrecion": "Metabolismo hepático rápido, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: 50mg en 250ml Solución Salina. Usar sistemas de infusión no absorbentes (vidrio o polietileno).",
      "compatibilidadY": "Incompatible con Fenitoína, Alteplasa."
    },
    "contraindicaciones": "• Hipotensión severa o choque cardiogénico\n• Uso de inhibidores de la PDE-5 (Sildenafilo, Tadalafilo)\n• Anemia grave o hemorragia intracraneal\n• Pericarditis constrictiva o taponamiento cardíaco\n• Glaucoma de ángulo cerrado\n• Traumatismo craneoencefálico (aumenta PIC)\n• Hipovolemia no corregida\n• Hipersensibilidad a los nitratos",
    "efectosAdversos": "• Cefalea pulsátil intensa\n• Hipotensión ortostática y mareo\n• Rubor facial y sofocos\n• Taquicardia refleja\n• Síncope (en dosis altas)",
    "usosEnfermeria": "Intervención: Monitorizar presión arterial antes y durante la administración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Usar sistemas de infusión de vidrio o polietileno (no PVC). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Proteger la solución y el sistema de la luz solar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir al paciente a no levantarse bruscamente (hipotensión). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial (riesgo de hipotensión severa). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de cefalea (efecto común). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre cambios de posición lentos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de tolerancia al fármaco. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab SL 0.5mg; Amp 50mg/10ml; Parches.",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d55",
    "nombreGenerico": "Captopril",
    "familia": "IECA",
    "claseTerapeutica": "Antihipertensivo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima Convertidora de Angiotensina (ECA).",
      "fisiopatologiaAccion": "Inhibición directa de la ECA. Es el IECA de acción más rápida.",
      "efectoSistemico": "Reducción rápida de la PA; útil en urgencias hipertensivas."
    },
    "farmacocinetica": {
      "inicioAccion": "VO/SL: 15-30 min.",
      "vidaMedia": "2 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar 1 hora antes de las comidas.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Embarazo (teratogénico) y lactancia\n• Antecedente de angioedema por IECA\n• Estenosis bilateral de la arteria renal\n• Insuficiencia renal grave (requiere ajuste)\n• Estenosis aórtica severa\n• Miocardiopatía hipertrófica\n• Antecedente de angioedema idiopático\n• Hiperpotasemia severa",
    "efectosAdversos": "• Tos seca e irritativa\n• Hipotensión arterial\n• Disgeusia (alteración del gusto)\n• Hiperpotasemia\n• Mareo y angioedema",
    "usosEnfermeria": "Intervención: Administrar 1 hora antes de las comidas para mejor absorción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presión arterial rápidamente tras la administración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de potasio y función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de tos seca o reacciones alérgicas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial (primera dosis). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar niveles de potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de tos seca persistente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de angioedema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 25mg, 50mg.",
    "color": "#E8F5E9",
    "icon": "Activity"
  },
  {
    "id": "d56",
    "nombreGenerico": "Metoclopramida",
    "familia": "Benzamida / Antagonista Dopaminérgico",
    "claseTerapeutica": "Antiemético, Procinético",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Dopaminérgicos D2 y Serotoninérgicos 5-HT4.",
      "fisiopatologiaAccion": "Bloquea los receptores D2 en la zona gatillo quimiorreceptora y estimula los receptores 5-HT4 en el tracto digestivo superior.",
      "efectoSistemico": "Aumento del tono del esfínter esofágico inferior, aceleración del vaciamiento gástrico y prevención del vómito."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-3 min / IM: 10-15 min / VO: 30-60 min.",
      "vidaMedia": "5-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal (85%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar lento en 1-2 min para evitar acatisia.",
      "compatibilidadY": "Compatible con Solución Salina y Suero Glucosado."
    },
    "contraindicaciones": "• Obstrucción mecánica, perforación o hemorragia digestiva\n• Feocromocitoma (riesgo de crisis hipertensiva)\n• Epilepsia o trastornos convulsivos\n• Hipersensibilidad a la metoclopramida\n• Antecedente de discinesia tardía por neurolépticos\n• Enfermedad de Parkinson\n• Uso concomitante con levodopa\n• Lactancia",
    "efectosAdversos": "• Somnolencia y fatiga\n• Reacciones extrapiramidales (acatisia, distonía)\n• Hiperprolactinemia (galactorrea/ginecomastia)\n• Diarrea o estreñimiento\n• Mareo",
    "usosEnfermeria": "Intervención: Administrar IV lento (1-2 min) para evitar acatisia intensa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de movimientos involuntarios o rigidez. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar junto con otros neurolépticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar estado de conciencia y riesgo de caídas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos extrapiramidales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar nivel de conciencia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de movimientos involuntarios. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar tolerancia gástrica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 10mg/2ml; Tab 10mg; Gotas 4mg/ml.",
    "color": "#E0F7FA",
    "icon": "RefreshCw"
  },
  {
    "id": "d57",
    "nombreGenerico": "Ondansetrón",
    "familia": "Antagonista de Receptores 5-HT3",
    "claseTerapeutica": "Antiemético Potente",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de Serotonina 5-HT3 periféricos y centrales.",
      "fisiopatologiaAccion": "Bloquea de forma selectiva los receptores 5-HT3 en las terminaciones nerviosas del vago y en la zona gatillo quimiorreceptora.",
      "efectoSistemico": "Prevención y control de náuseas y vómitos inducidos por quimioterapia, radioterapia o cirugía."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato / VO: 30-60 min.",
      "vidaMedia": "3-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (CYP3A4, 2D6, 1A2), excreción renal (5%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 4-8mg en 50ml Solución Salina, infundir en 15 min.",
      "compatibilidadY": "Incompatible con soluciones alcalinas."
    },
    "contraindicaciones": "• Hipersensibilidad al ondansetrón u otros antagonistas 5-HT3\n• Uso concomitante con apomorfina (hipotensión profunda)\n• Síndrome de QT largo congénito\n• Insuficiencia hepática grave (requiere ajuste)\n• Hipopotasemia o hipomagnesemia no corregida\n• Embarazo (primer trimestre - precaución)\n• Lactancia\n• Fenilcetonuria (si contiene aspartamo)",
    "efectosAdversos": "• Cefalea (muy común)\n• Estreñimiento severo\n• Prolongación del intervalo QT\n• Mareo y somnolencia\n• Elevación transitoria de transaminasas",
    "usosEnfermeria": "Intervención: Monitorizar EKG en pacientes con riesgo de arritmias. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV lento o diluido en 15 minutos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar tránsito intestinal (puede causar estreñimiento severo). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar efectividad en el control de náuseas y vómitos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar EKG (intervalo QT). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de estreñimiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre reporte de palpitaciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar función hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 4mg/2ml, 8mg/4ml; Tab 4mg, 8mg.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d58",
    "nombreGenerico": "Ranitidina",
    "familia": "Antagonista de Receptores H2",
    "claseTerapeutica": "Antisecretor Gástrico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores H2 de histamina en células parietales.",
      "fisiopatologiaAccion": "Inhibe de forma competitiva la unión de la histamina a sus receptores, reduciendo la secreción de ácido basal y estimulada.",
      "efectoSistemico": "Reducción del volumen y la concentración de ácido clorhídrico en el estómago."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 15 min / VO: 1-2 horas.",
      "vidaMedia": "2-3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal (70% inalterada)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 50mg en 20ml Solución Salina, administrar lento en 5 min.",
      "compatibilidadY": "Compatible con la mayoría de soluciones IV."
    },
    "contraindicaciones": "• Hipersensibilidad a la ranitidina u otros antagonistas H2\n• Antecedente de porfiria aguda\n• Insuficiencia renal moderada a grave (ajustar dosis)\n• Lactancia\n• Embarazo (precaución)\n• Insuficiencia hepática severa\n• Antecedente de arritmias cardíacas\n• Hipoclorhidria",
    "efectosAdversos": "• Cefalea y mareo\n• Confusión mental (especialmente en ancianos)\n• Bradicardia (por infusión rápida)\n• Estreñimiento o diarrea\n• Erupción cutánea",
    "usosEnfermeria": "Intervención: No administrar en bolo rápido (riesgo de bradicardia e hipotensión). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estado mental en pacientes adultos mayores (confusión). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función renal para ajuste de dosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por la noche o antes de comidas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar estado mental en ancianos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar función renal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma nocturna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar frecuencia cardíaca (si es IV rápido). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 50mg/2ml; Tab 150mg, 300mg.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d59",
    "nombreGenerico": "Hioscina (Butilbromuro)",
    "familia": "Anticolinérgico / Alcaloide de la belladona",
    "claseTerapeutica": "Antiespasmódico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Muscarínicos en músculo liso visceral.",
      "fisiopatologiaAccion": "Bloquea la acción de la acetilcolina en los receptores muscarínicos del tracto gastrointestinal, biliar y genitourinario.",
      "efectoSistemico": "Relajación del músculo liso, aliviando el espasmo y el dolor cólico."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 2-5 min / VO: 30-60 min.",
      "vidaMedia": "5 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar lento. Puede darse directo o diluido en Solución Salina.",
      "compatibilidadY": "Incompatible con soluciones alcalinas."
    },
    "contraindicaciones": "• Glaucoma de ángulo estrecho no tratado\n• Miastenia gravis\n• Megacolon u obstrucción intestinal mecánica\n• Hipertrofia prostática con retención urinaria\n• Taquicardia severa\n• Megacolon tóxico\n• Obstrucción del cuello vesical\n• Hipersensibilidad a los alcaloides de la belladona",
    "efectosAdversos": "• Sequedad de boca (xerostomía)\n• Visión borrosa y midriasis\n• Taquicardia y palpitaciones\n• Retención urinaria\n• Estreñimiento",
    "usosEnfermeria": "Intervención: Monitorizar frecuencia cardíaca (puede causar taquicardia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar diuresis, especialmente en pacientes con riesgo de retención. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Precaución en climas cálidos por reducción de la sudoración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar sobre visión borrosa transitoria tras administración IV. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de retención urinaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre sequedad de boca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de visión borrosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 20mg/1ml; Tab 10mg; Gotas.",
    "color": "#E0F7FA",
    "icon": "Activity"
  },
  {
    "id": "d60",
    "nombreGenerico": "Loperamida",
    "familia": "Opioide sintético (Derivado de piperidina)",
    "claseTerapeutica": "Antidiarréico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores opioides Mu (µ) en el plexo mientérico.",
      "fisiopatologiaAccion": "Se une a los receptores opioides en la pared intestinal, inhibiendo la liberación de acetilcolina y prostaglandinas.",
      "efectoSistemico": "Disminución del peristaltismo, aumento del tiempo de tránsito y mejora de la absorción de agua y electrolitos."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-3 horas.",
      "vidaMedia": "9-14 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (CYP3A4/2C8), excreción fecal (principalmente)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con abundante agua.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Colitis pseudomembranosa o colitis ulcerosa aguda\n• Disentería aguda (fiebre alta, sangre en heces)\n• Niños menores de 2 años\n• Hipersensibilidad a la loperamida\n• Embarazo y lactancia (precaución)\n• Dolor abdominal sin diarrea\n• Obstrucción intestinal\n• Megacolon tóxico",
    "efectosAdversos": "• Estreñimiento y distensión abdominal\n• Dolor abdominal y cólicos\n• Mareo y somnolencia\n• Náuseas y sequedad de boca\n• Megacolon tóxico (raro)",
    "usosEnfermeria": "Intervención: Vigilar distensión abdominal y ruidos hidroaéreos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No usar si se sospecha diarrea de origen bacteriano invasivo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar una hidratación oral o IV adecuada. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Suspender si no hay mejoría en 48 horas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia de deposiciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar estado de hidratación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no exceder dosis máxima. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de distensión abdominal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 2mg.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d61",
    "nombreGenerico": "Lactulosa",
    "familia": "Disacárido sintético",
    "claseTerapeutica": "Laxante Osmótico, Tratamiento de Hiperamonemia",
    "mecanismoAccion": {
      "dianaTerapeutica": "Luz intestinal (colon).",
      "fisiopatologiaAccion": "Las bacterias del colon la desdoblan en ácidos orgánicos que aumentan la presión osmótica y acidifican el contenido colónico.",
      "efectoSistemico": "Ablandamiento de heces y atrapamiento de amoníaco (NH3) para su eliminación en encefalopatía hepática."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 24-48 horas.",
      "vidaMedia": "N/A (Acción local).",
      "metabolismoExcrecion": "Metabolismo bacteriano colónico, excreción renal mínima (<3%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Puede mezclarse con jugos o agua para mejorar sabor.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Galactosemia (incapacidad de metabolizar galactosa)\n• Obstrucción intestinal mecánica o sospecha de perforación\n• Hipersensibilidad a la lactulosa\n• Dolor abdominal de origen desconocido\n• Intolerancia a la lactosa\n• Apendicitis o sospecha de abdomen agudo\n• Deshidratación severa\n• Diabetes mellitus (precaución por contenido de azúcares)",
    "efectosAdversos": "• Flatulencia y meteorismo\n• Calambres abdominales y borborigmos\n• Diarrea (por dosis excesiva)\n• Desequilibrio electrolítico (uso crónico)\n• Náuseas",
    "usosEnfermeria": "Intervención: Monitorizar número y consistencia de deposiciones (meta 2-3 blandas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de electrolitos en uso prolongado (riesgo de hipopotasemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Puede mezclarse con agua o jugos para mejorar su palatabilidad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar estado de conciencia en pacientes con encefalopatía hepática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de amonio (en encefalopatía). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar balance hídrico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma con alimentos o jugos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de deshidratación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Jarabe 66.7g/100ml.",
    "color": "#E0F7FA",
    "icon": "Droplet"
  },
  {
    "id": "d62",
    "nombreGenerico": "Hidróxido de Aluminio y Magnesio",
    "familia": "Antiácido combinado",
    "claseTerapeutica": "Antiácido",
    "mecanismoAccion": {
      "dianaTerapeutica": "Ácido clorhídrico en la luz gástrica.",
      "fisiopatologiaAccion": "Reacción de neutralización química que eleva el pH gástrico, reduciendo la actividad de la pepsina.",
      "efectoSistemico": "Alivio sintomático de la pirosis y la dispepsia ácida."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 15-30 min.",
      "vidaMedia": "Acción local (20-60 min en estómago vacío).",
      "metabolismoExcrecion": "Excreción fecal (sales insolubles) y renal (mínima absorción de Mg/Al)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar 1-3 horas después de las comidas y al acostarse.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Insuficiencia renal grave (riesgo de toxicidad por Al/Mg)\n• Hipofosfatemia preexistente\n• Obstrucción intestinal o apendicitis\n• Hipersensibilidad a los componentes\n• Hemorragia gastrointestinal de origen desconocido\n• Enfermedad de Alzheimer (precaución con Al)\n• Deshidratación severa\n• Hipocalcemia",
    "efectosAdversos": "• Estreñimiento (por aluminio)\n• Diarrea (por magnesio)\n• Hipofosfatemia (uso crónico)\n• Náuseas y vómitos\n• Calambres abdominales",
    "usosEnfermeria": "Intervención: Separar administración de otros fármacos al menos 2 horas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Agitar bien la suspensión antes de cada dosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de fósforo y magnesio en uso crónico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar hábito intestinal (equilibrio entre estreñimiento y diarrea). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de magnesio y fósforo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar hábito intestinal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre separación de otros fármacos (2h). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de debilidad muscular (hipermagnesemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Suspensión; Tabletas masticables.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d63",
    "nombreGenerico": "Pantoprazol",
    "familia": "IBP",
    "claseTerapeutica": "Antisecretor Gástrico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Bomba de protones H+/K+-ATPasa.",
      "fisiopatologiaAccion": "Inhibición irreversible de la bomba de protones. Posee menor interacción con CYP450 que omeprazol.",
      "efectoSistemico": "Supresión potente y prolongada de la secreción ácida gástrica."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 2-3 horas / IV: 15-30 min.",
      "vidaMedia": "1 hora (efecto dura 24h).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2C19), excreción renal (80%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Reconstituir 40mg con 10ml Solución Salina, administrar en 2-5 min.",
      "compatibilidadY": "Incompatible con soluciones ácidas y Midazolam."
    },
    "contraindicaciones": "• Hipersensibilidad al pantoprazol o a otros IBP\n• Uso concomitante con atazanavir\n• Insuficiencia hepática grave (requiere ajuste)\n• Lactancia\n• Hipomagnesemia severa\n• Uso concomitante con rilpivirina\n• Osteoporosis severa (precaución uso crónico)\n• Gastritis atrófica",
    "efectosAdversos": "• Cefalea y mareo\n• Diarrea o estreñimiento\n• Náuseas y flatulencia\n• Reacciones en sitio de inyección (flebitis)\n• Hipomagnesemia (uso crónico)",
    "usosEnfermeria": "Intervención: No triturar, masticar ni romper las tabletas (gastroresistentes). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar integridad de la vía venosa y signos de flebitis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente 30-60 min antes del desayuno. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de magnesio en tratamientos prolongados. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar integridad de la vía periférica (si es IV). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma en ayunas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de diarrea persistente (C. difficile). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de magnesio en uso crónico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 20mg, 40mg; Vial 40mg.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d64",
    "nombreGenerico": "Sucralfato",
    "familia": "Complejo de sacarosa y aluminio",
    "claseTerapeutica": "Citoprotector Gástrico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Base de la úlcera gástrica/duodenal.",
      "fisiopatologiaAccion": "En medio ácido forma un polímero viscoso que se adhiere a las proteínas del cráter ulceroso, creando una barrera protectora.",
      "efectoSistemico": "Protección de la mucosa contra el ácido, la pepsina y las sales biliares."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "Acción local (6 horas de protección).",
      "metabolismoExcrecion": "Excreción fecal (95-98% inalterado)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con el estómago vacío (1h antes de comidas).",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Insuficiencia renal crónica (riesgo de toxicidad por aluminio)\n• Obstrucción intestinal\n• Hipersensibilidad al sucralfato\n• Hipofosfatemia\n• Uso concomitante con citratos\n• Gastroparesia severa\n• Hemorragia digestiva activa\n• Niños menores de 14 años",
    "efectosAdversos": "• Estreñimiento (muy frecuente)\n• Sequedad de boca\n• Náuseas y flatulencia\n• Indigestión o dispepsia\n• Erupción cutánea o prurito",
    "usosEnfermeria": "Intervención: Administrar con el estómago vacío (1h antes de las comidas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar simultáneamente con antiácidos (requiere pH ácido). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Separar de otros fármacos al menos 2 horas (impide absorción). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estreñimiento y recomendar ingesta de líquidos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de fósforo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de estreñimiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma 1h antes de comidas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar interacciones con otros medicamentos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 1g; Suspensión 1g/5ml.",
    "color": "#E0F7FA",
    "icon": "Shield"
  },
  {
    "id": "d65",
    "nombreGenerico": "Bisacodilo",
    "familia": "Derivado del difenilmetano",
    "claseTerapeutica": "Laxante Estimulante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Plexo mientérico del colon.",
      "fisiopatologiaAccion": "Estimulación directa de las terminaciones nerviosas sensoriales de la mucosa colónica, aumentando el peristaltismo.",
      "efectoSistemico": "Evacuación intestinal rápida y efectiva."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 6-12 horas / Rectal: 15-60 min.",
      "vidaMedia": "N/A (Acción local).",
      "metabolismoExcrecion": "Metabolismo hepático (mínima absorción), excreción fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: No tomar con leche o antiácidos (disuelven la capa entérica).",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Obstrucción intestinal o íleo paralítico\n• Abdomen agudo quirúrgico o apendicitis\n• Deshidratación severa con pérdida de electrolitos\n• Enfermedad inflamatoria intestinal aguda\n• Hipersensibilidad al bisacodilo\n• Hemorragia rectal de origen desconocido\n• Niños menores de 2 años\n• Embarazo y lactancia (precaución)",
    "efectosAdversos": "• Cólicos abdominales intensos\n• Diarrea y deshidratación\n• Desequilibrio electrolítico\n• Náuseas y vómitos\n• Irritación rectal (supositorios)",
    "usosEnfermeria": "Intervención: No triturar ni masticar las tabletas (capa entérica). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar con leche o antiácidos (evita disolución prematura). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por la noche para evacuación matutina. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar equilibrio hidroelectrolítico en uso prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar equilibrio electrolítico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar ruidos intestinales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no masticar tabletas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de dependencia a laxantes. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 5mg; Supositorios 10mg.",
    "color": "#E0F7FA",
    "icon": "Droplet"
  },
  {
    "id": "d66",
    "nombreGenerico": "Salbutamol (Albuterol)",
    "familia": "Agonista Beta-2 adrenérgico de acción corta (SABA)",
    "claseTerapeutica": "Broncodilatador",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores adrenérgicos Beta-2 en el músculo liso bronquial.",
      "fisiopatologiaAccion": "Estimula los receptores beta-2, activando la adenilato ciclasa y aumentando el AMPc intracelular, lo que relaja el músculo liso.",
      "efectoSistemico": "Broncodilatación rápida y alivio del broncoespasmo agudo."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: 5-15 min / VO: 30 min.",
      "vidaMedia": "3-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático parcial, excreción renal (70%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: 100-200mcg (1-2 pufs). Nebulizado: 2.5-5mg en 3ml Solución Salina.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad al salbutamol o componentes\n• Amenaza de aborto en el 1er o 2do trimestre\n• Uso concomitante con betabloqueantes no selectivos\n• Taquiarritmias cardíacas graves\n• Tirotoxicosis\n• Diabetes mellitus descompensada\n• Cardiopatía isquémica grave\n• Hipopotasemia previa",
    "efectosAdversos": "• Taquicardia y palpitaciones\n• Temblor fino de extremidades\n• Hipopotasemia (dosis altas)\n• Ansiedad y nerviosismo\n• Cefalea y mareo",
    "usosEnfermeria": "Intervención: Monitorizar frecuencia cardíaca y ruidos respiratorios. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Enseñar técnica adecuada de inhalación (uso de espaciador). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de potasio en pacientes con dosis altas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Esperar 1-2 minutos entre cada pulsación (puf). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y temblor fino. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar técnica de inhalación (uso de espaciador). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre limpieza del dispositivo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de potasio (riesgo de hipopotasemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Inhalador 100mcg/dosis; Solución para nebulizar 5mg/ml; Tab 4mg.",
    "color": "#E1F5FE",
    "icon": "Wind"
  },
  {
    "id": "d67",
    "nombreGenerico": "Bromuro de Ipratropio",
    "familia": "Anticolinérgico derivado de la atropina (SAMA)",
    "claseTerapeutica": "Broncodilatador",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Muscarínicos M3 en el músculo liso bronquial.",
      "fisiopatologiaAccion": "Bloquea de forma competitiva los receptores muscarínicos, inhibiendo el tono vagal bronconstrictor.",
      "efectoSistemico": "Broncodilatación, especialmente útil en EPOC y crisis asmática severa (combinado)."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: 15-30 min.",
      "vidaMedia": "2 horas.",
      "metabolismoExcrecion": "Mínima absorción sistémica, excreción fecal principalmente."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: 20-40mcg. Nebulizado: 250-500mcg en 3ml Solución Salina.",
      "compatibilidadY": "Compatible con Salbutamol en la misma nebulización."
    },
    "contraindicaciones": "• Hipersensibilidad a la atropina o derivados\n• Glaucoma de ángulo estrecho no tratado\n• Obstrucción del flujo urinario (hipertrofia prostática)\n• Miastenia gravis\n• Obstrucción del cuello vesical\n• Fibrosis quística (precaución)\n• Embarazo y lactancia (precaución)\n• Estenosis pilórica",
    "efectosAdversos": "• Sequedad de boca (xerostomía)\n• Tos e irritación de garganta\n• Cefalea y mareo\n• Visión borrosa (por contacto ocular)\n• Náuseas y mal sabor de boca",
    "usosEnfermeria": "Intervención: Evitar contacto con los ojos (usar boquilla en vez de mascarilla). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar retención urinaria y estreñimiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Enjuagar la boca tras el uso para reducir la sequedad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar que el sabor puede ser amargo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar sequedad de mucosas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de retención urinaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre enjuague bucal post-uso. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de visión borrosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Inhalador 20mcg/dosis; Solución para nebulizar 250mcg/ml.",
    "color": "#E1F5FE",
    "icon": "Wind"
  },
  {
    "id": "d68",
    "nombreGenerico": "Budesonida",
    "familia": "Glucocorticoide sintético",
    "claseTerapeutica": "Antiinflamatorio Esteroideo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de glucocorticoides intracitoplasmáticos.",
      "fisiopatologiaAccion": "Inhibe la liberación de mediadores inflamatorios y reduce la hiperreactividad bronquial.",
      "efectoSistemico": "Reducción del edema de la mucosa bronquial y de la producción de moco."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: Efecto máximo en 1-2 semanas.",
      "vidaMedia": "2-3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (CYP3A4), excreción renal y biliar."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: 200-400mcg c/12h. Nebulizado: 0.25-0.5mg.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad a la budesonida\n• Tuberculosis pulmonar activa no tratada\n• Infecciones fúngicas, virales o bacterianas respiratorias graves\n• Estado asmático (no es para rescate)\n• Cirrosis hepática (aumenta niveles sistémicos)\n• Hipersensibilidad a la proteína de leche (algunas presentaciones)\n• Osteoporosis severa\n• Glaucoma o cataratas",
    "efectosAdversos": "• Candidiasis orofaríngea (placas blancas)\n• Disfonía o ronquera\n• Tos por irritación laríngea\n• Irritación de garganta\n• Cefalea y náuseas",
    "usosEnfermeria": "Intervención: Enjuagar la boca con agua tras la inhalación para prevenir candidiasis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar que no es un fármaco de rescate para crisis agudas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Limpiar el dispositivo inhalador regularmente según instrucciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de placas blancas en la mucosa oral. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar aparición de candidiasis oral. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar técnica de inhalación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre enjuague bucal obligatorio post-uso. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de supresión adrenal en dosis altas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Inhalador 200mcg/dosis; Suspensión para nebulizar 0.25mg/ml.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d69",
    "nombreGenerico": "Fluticasona",
    "familia": "Corticosteroide potente",
    "claseTerapeutica": "Antiinflamatorio Respiratorio",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de glucocorticoides.",
      "fisiopatologiaAccion": "Potente acción antiinflamatoria local en los pulmones con mínima actividad sistémica a dosis terapéuticas.",
      "efectoSistemico": "Control a largo plazo de la inflamación de las vías respiratorias en asma y EPOC."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: 4-7 días para efecto pleno.",
      "vidaMedia": "8 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción fecal (principalmente)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: 100-250mcg c/12h.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad a la fluticasona\n• Infecciones fúngicas, virales o bacterianas no tratadas\n• Episodio agudo de asma o EPOC (no es de rescate)\n• Niños menores de 4 años (según presentación)\n• Tuberculosis pulmonar latente o activa\n• Herpes simple ocular\n• Cirugía nasal reciente\n• Embarazo y lactancia (precaución)",
    "efectosAdversos": "• Candidiasis oral y faríngea\n• Ronquera o disfonía\n• Cefalea y mareo\n• Faringitis e irritación nasal\n• Tos y epistaxis (sangrado nasal)",
    "usosEnfermeria": "Intervención: Uso de espaciador para mejorar depósito pulmonar y reducir efectos locales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Higiene oral post-uso (gárgaras con agua). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar crecimiento en niños con uso prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educar sobre la importancia de la adherencia diaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar técnica de inhalación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre higiene oral post-uso. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de infección respiratoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar crecimiento en niños con uso prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Inhalador 50mcg, 125mcg, 250mcg/dosis.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d70",
    "nombreGenerico": "Teofilina",
    "familia": "Metilxantina",
    "claseTerapeutica": "Broncodilatador, Estimulante Respiratorio",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enzima Fosfodiesterasa (PDE) y receptores de Adenosina.",
      "fisiopatologiaAccion": "Inhibe la PDE aumentando el AMPc y bloquea los receptores de adenosina que causan bronconstricción.",
      "efectoSistemico": "Broncodilatación, aumento de la fuerza de los músculos respiratorios y estimulación del centro respiratorio."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Rápido.",
      "vidaMedia": "8 horas (muy variable según edad y tabaquismo).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP1A2), excreción renal (10% inalterada)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir en 100-250ml Solución Salina, infundir lento en 20-30 min.",
      "compatibilidadY": "Incompatible con Ciprofloxacino, Ceftriaxona."
    },
    "contraindicaciones": "• Hipersensibilidad a xantinas (cafeína, teobromina)\n• Infarto agudo de miocardio reciente\n• Taquiarritmias cardíacas graves\n• Gastritis o úlcera péptica activa\n• Insuficiencia hepática grave\n• Hipertiroidismo no controlado\n• Niños menores de 6 meses\n• Trastornos convulsivos (epilepsia)",
    "efectosAdversos": "• Náuseas y vómitos persistentes\n• Insomnio y agitación\n• Taquicardia y palpitaciones\n• Convulsiones (signo de toxicidad grave)\n• Arritmias cardíacas y cefalea",
    "usosEnfermeria": "Intervención: Monitorizar niveles séricos (rango terapéutico estrecho: 10-20 mcg/ml). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de toxicidad (vómitos en poso de café, arritmias). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV muy lento y diluido para evitar hipotensión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evitar consumo excesivo de bebidas con cafeína. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de toxicidad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre evitar exceso de cafeína. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar interacciones medicamentosas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles séricos (rango terapéutico estrecho). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab liberación prolongada 100mg, 200mg, 300mg; Amp 240mg/10ml (Aminofilina).",
    "color": "#E1F5FE",
    "icon": "Zap"
  },
  {
    "id": "d71",
    "nombreGenerico": "Montelukast",
    "familia": "Antagonista de receptores de leucotrienos",
    "claseTerapeutica": "Antiasmático, Antialérgico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de Cisteinil-leucotrienos (CysLT1).",
      "fisiopatologiaAccion": "Bloquea selectivamente los receptores de leucotrienos, mediadores que causan edema, bronconstricción y secreción mucosa.",
      "efectoSistemico": "Reducción de la inflamación de las vías aéreas y prevención de síntomas de asma y rinitis."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 2-4 horas.",
      "vidaMedia": "3-6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso (CYP3A4, 2C9), excreción biliar/fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar una vez al día en la noche.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad al montelukast\n• Insuficiencia hepática grave (precaución)\n• No indicado para el tratamiento de crisis asmática aguda\n• Fenilcetonuria (si las tabletas contienen aspartamo)\n• Antecedente de trastornos neuropsiquiátricos graves\n• Niños menores de 6 meses\n• Uso concomitante con fenobarbital\n• Embarazo y lactancia (precaución)",
    "efectosAdversos": "• Cefalea y mareo\n• Dolor abdominal y náuseas\n• Alteraciones neuropsiquiátricas (pesadillas)\n• Agresividad o irritabilidad (raro)\n• Fatiga y somnolencia",
    "usosEnfermeria": "Intervención: Vigilar cambios en el comportamiento o estado de ánimo (pesadillas). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar que no es un fármaco para rescate agudo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por la noche para asma. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Las tabletas masticables pueden tomarse sin agua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar efectividad en asma por ejercicio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre toma nocturna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de pesadillas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar cambios en el comportamiento o estado de ánimo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 10mg; Tab masticables 4mg, 5mg.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d72",
    "nombreGenerico": "Bromuro de Tiotropio",
    "familia": "Anticolinérgico de acción prolongada (LAMA)",
    "claseTerapeutica": "Broncodilatador de larga duración",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Muscarínicos M1, M2 y M3.",
      "fisiopatologiaAccion": "Disociación lenta de los receptores M3, lo que proporciona una broncodilatación prolongada por más de 24 horas.",
      "efectoSistemico": "Mejora de la función pulmonar y reducción de exacerbaciones en EPOC."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: 30 min (efecto pleno en 1 semana).",
      "vidaMedia": "25 - 44 horas.",
      "metabolismoExcrecion": "Mínima absorción, excreción renal (7%) y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: Una vez al día (18mcg o 2 pufs de Respimat).",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad al tiotropio o a la atropina\n• Glaucoma de ángulo estrecho\n• Hipertrofia prostática o cuello vesical obstruido\n• Insuficiencia renal moderada-grave (vigilar estrechamente)\n• Miastenia gravis\n• Embarazo y lactancia (precaución)\n• Niños menores de 18 años\n• Estenosis pilórica",
    "efectosAdversos": "• Sequedad de boca (muy común)\n• Estreñimiento y dolor abdominal\n• Retención urinaria\n• Visión borrosa y mareo\n• Tos y faringitis",
    "usosEnfermeria": "Intervención: Asegurar que el paciente no trague las cápsulas (son para inhalar). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar función urinaria y frecuencia de deposiciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Enseñar el uso correcto del dispositivo HandiHaler o Respimat. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Limpiar la boquilla del dispositivo semanalmente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar frecuencia de deposiciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre uso correcto del dispositivo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sequedad de boca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar función urinaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Cápsulas para inhalar 18mcg; Sistema Respimat.",
    "color": "#E1F5FE",
    "icon": "Wind"
  },
  {
    "id": "d73",
    "nombreGenerico": "N-Acetilcisteína (NAC)",
    "familia": "Derivado de aminoácido (Cisteína)",
    "claseTerapeutica": "Mucolítico, Antídoto",
    "mecanismoAccion": {
      "dianaTerapeutica": "Enlaces disulfuro de las mucoproteínas.",
      "fisiopatologiaAccion": "Rompe los puentes disulfuro, disminuyendo la viscosidad del moco. Como antídoto, restaura los niveles de glutatión.",
      "efectoSistemico": "Facilita la expectoración y protege el hígado en intoxicación por paracetamol."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas / IV: Inmediato.",
      "vidaMedia": "6 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Disolver en agua. IV: Diluir en 250ml Suero Glucosado (Protocolo antídoto).",
      "compatibilidadY": "Incompatible con algunos antibióticos (mezcla directa)."
    },
    "contraindicaciones": "• Úlcera gastroduodenal activa\n• Asma bronquial (riesgo de broncoespasmo por inhalación)\n• Hipersensibilidad a la acetilcisteína\n• Niños menores de 2 años\n• Insuficiencia respiratoria grave\n• Embarazo y lactancia (precaución)\n• Varices esofágicas\n• Cirrosis hepática (precaución)",
    "efectosAdversos": "• Náuseas y vómitos\n• Broncoespasmo (especialmente inhalado)\n• Reacciones anafilactoides (en administración IV)\n• Estomatitis (inflamación de mucosa oral)\n• Rinorrea y fiebre",
    "usosEnfermeria": "Intervención: Vigilar aparición de broncoespasmo en pacientes asmáticos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Informar sobre el olor característico a azufre (huevo podrido). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Lavar la cara tras nebulización para eliminar residuos pegajosos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: En intoxicación por paracetamol, seguir protocolo IV estrictamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar viscosidad de las secreciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre olor característico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar reacciones anafilactoides (si es IV). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar aparición de broncoespasmo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab efervescentes 600mg; Amp 300mg/3ml.",
    "color": "#E1F5FE",
    "icon": "Droplet"
  },
  {
    "id": "d74",
    "nombreGenerico": "Dextrometorfano",
    "familia": "Derivado sintético de la morfina (sin efecto opioide)",
    "claseTerapeutica": "Antitusígeno",
    "mecanismoAccion": {
      "dianaTerapeutica": "Centro de la tos en el bulbo raquídeo.",
      "fisiopatologiaAccion": "Eleva el umbral del centro de la tos mediante la inhibición de receptores NMDA.",
      "efectoSistemico": "Supresión de la tos seca no productiva."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 15-30 min.",
      "vidaMedia": "3-4 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP2D6), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con o sin alimentos.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Tos productiva (necesaria para limpieza de vías aéreas)\n• Asma o insuficiencia respiratoria\n• Uso concomitante de IMAO (riesgo de síndrome serotoninérgico)\n• Niños menores de 2 años\n• Enfermedad hepática grave\n• Embarazo y lactancia (precaución)\n• Hipersensibilidad al dextrometorfano\n• Tos persistente por tabaquismo",
    "efectosAdversos": "• Mareo y vértigo\n• Somnolencia y fatiga\n• Náuseas y molestias gastrointestinales\n• Estreñimiento\n• Dolor abdominal leve",
    "usosEnfermeria": "Intervención: No usar en tos con abundantes secreciones (riesgo de retención). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar nivel de sedación o somnolencia excesiva. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No administrar junto con jugos cítricos (pueden aumentar niveles). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar la causa de la tos antes de suprimirla. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar causa de la tos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no administrar con jugos cítricos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de somnolencia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar nivel de sedación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Jarabe 15mg/5ml; Cápsulas.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d75",
    "nombreGenerico": "Prednisona",
    "familia": "Glucocorticoide sintético",
    "claseTerapeutica": "Antiinflamatorio, Inmunosupresor",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de glucocorticoides citoplasmáticos.",
      "fisiopatologiaAccion": "Modula la transcripción génica, reduciendo la producción de citocinas y la migración leucocitaria.",
      "efectoSistemico": "Potente efecto antiinflamatorio sistémico; reduce la inflamación bronquial en crisis."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas (efecto pleno en horas).",
      "vidaMedia": "18 - 36 horas (biológica).",
      "metabolismoExcrecion": "Profármaco convertido en prednisolona en hígado. Excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar en la mañana con alimentos.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Infecciones fúngicas sistémicas\n• Úlcera péptica activa\n• Vacunas de virus vivos o atenuados\n• Hipersensibilidad a los corticoides\n• Osteoporosis severa\n• Diabetes mellitus descompensada\n• Hipertensión arterial grave\n• Psicosis aguda",
    "efectosAdversos": "• Hiperglucemia (especialmente en diabéticos)\n• Retención de líquidos y edema\n• Hipertensión arterial\n• Insomnio y cambios de humor\n• Osteoporosis y debilidad muscular (uso crónico)",
    "usosEnfermeria": "Intervención: Monitorizar niveles de glucosa en sangre (hiperglucemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar presión arterial y peso corporal (retención hídrica). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No suspender bruscamente tras uso prolongado (pauta de descenso). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por la mañana con alimentos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presión arterial y peso corporal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de infección. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de glucosa en sangre. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 5mg, 20mg, 50mg.",
    "color": "#E1F5FE",
    "icon": "Shield"
  },
  {
    "id": "d76",
    "nombreGenerico": "Diazepam",
    "familia": "Benzodiazepina de acción prolongada",
    "claseTerapeutica": "Ansiolítico, Sedante, Anticonvulsivante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A en el SNC.",
      "fisiopatologiaAccion": "Facilita la unión del GABA a su receptor, aumentando la frecuencia de apertura de los canales de cloro y provocando hiperpolarización neuronal.",
      "efectoSistemico": "Sedación, reducción de la ansiedad, relajación muscular y cese de actividad convulsiva."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-5 min / VO: 30-60 min.",
      "vidaMedia": "20 - 50 horas (metabolitos activos prolongan el efecto).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4, 2C19), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar directo lento (5mg/min). No diluir con Solución Salina (precipita).",
      "compatibilidadY": "Muy incompatible con la mayoría de soluciones y fármacos."
    },
    "contraindicaciones": "• Miastenia gravis\n• Insuficiencia respiratoria grave o apnea del sueño\n• Glaucoma de ángulo estrecho\n• Insuficiencia hepática grave\n• Intoxicación aguda por alcohol\n• Coma o choque\n• Embarazo y lactancia (precaución)\n• Niños menores de 6 meses",
    "efectosAdversos": "• Somnolencia y sedación\n• Ataxia (falta de coordinación)\n• Depresión respiratoria (dosis altas)\n• Hipotensión (especialmente IV rápido)\n• Debilidad muscular y mareo",
    "usosEnfermeria": "Intervención: Vigilar estrechamente el patrón respiratorio y nivel de conciencia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV directo muy lento (máximo 5mg/min). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No diluir con Solución Salina en la misma jeringa (precipita). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener Flumazenil disponible como antídoto de rescate. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar riesgo de caídas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre evitar alcohol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de sedación excesiva. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar patrón respiratorio y nivel de conciencia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 10mg/2ml; Tab 5mg, 10mg.",
    "color": "#F3E5F5",
    "icon": "Moon"
  },
  {
    "id": "d77",
    "nombreGenerico": "Midazolam",
    "familia": "Benzodiazepina de acción corta",
    "claseTerapeutica": "Sedante, Hipnótico, Anestésico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A.",
      "fisiopatologiaAccion": "Potencia el efecto inhibitorio del GABA. Alta afinidad por receptores en el SNC, lo que permite un inicio de acción muy rápido.",
      "efectoSistemico": "Sedación profunda, amnesia anterógrada y relajación muscular."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-3 min / IM: 5-15 min.",
      "vidaMedia": "1.5 - 2.5 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Puede darse directo o diluido en Solución Salina o Suero Glucosado.",
      "compatibilidadY": "Incompatible con soluciones alcalinas."
    },
    "contraindicaciones": "• Choque o coma con depresión de signos vitales\n• Intoxicación etílica aguda\n• Glaucoma de ángulo estrecho\n• Hipersensibilidad a benzodiazepinas\n• Insuficiencia respiratoria grave\n• Miastenia gravis\n• Embarazo y lactancia (precaución)\n• Insuficiencia hepática grave",
    "efectosAdversos": "• Depresión respiratoria y apnea\n• Hipotensión arterial\n• Hipo persistente\n• Somnolencia y sedación profunda\n• Amnesia anterógrada",
    "usosEnfermeria": "Intervención: Monitorización continua de oximetría de pulso y FC. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener equipo de manejo de vía aérea a la mano. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar IV lento para minimizar riesgo de apnea. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar nivel de sedación mediante escalas (Ramsay/RASS). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar nivel de sedación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre amnesia anterógrada. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de depresión respiratoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización continua de oximetría y FC. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 5mg/5ml, 15mg/3ml, 50mg/10ml.",
    "color": "#F3E5F5",
    "icon": "Moon"
  },
  {
    "id": "d78",
    "nombreGenerico": "Lorazepam",
    "familia": "Benzodiazepina de acción intermedia",
    "claseTerapeutica": "Ansiolítico, Sedante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A.",
      "fisiopatologiaAccion": "Aumenta la inhibición neuronal mediada por GABA. Menos dependiente del metabolismo oxidativo hepático que otras benzos.",
      "efectoSistemico": "Alivio de la ansiedad severa y sedación preoperatoria."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5-15 min / VO: 20-30 min.",
      "vidaMedia": "10 - 20 horas.",
      "metabolismoExcrecion": "Conjugación hepática (glucuronidación), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir con igual volumen de solvente compatible (Solución Salina o Agua Destilada).",
      "compatibilidadY": "Compatible con la mayoría de soluciones cristaloides."
    },
    "contraindicaciones": "• Hipersensibilidad a benzodiazepinas\n• Insuficiencia respiratoria severa o apnea del sueño\n• Glaucoma de ángulo estrecho\n• Miastenia gravis\n• Insuficiencia hepática grave\n• Intoxicación aguda por alcohol\n• Embarazo y lactancia (precaución)\n• Coma o choque",
    "efectosAdversos": "• Sedación excesiva y somnolencia\n• Mareo y vértigo\n• Debilidad muscular\n• Amnesia y confusión mental\n• Fatiga y astenia",
    "usosEnfermeria": "Intervención: Vigilar en ancianos por alto riesgo de caídas y confusión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No suspender bruscamente el tratamiento (riesgo de convulsiones). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos vitales tras administración parenteral. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar la necesidad de barandales en cama por seguridad. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar riesgo de caídas en ancianos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no suspender bruscamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar nivel de sedación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos vitales tras administración parenteral. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 1mg, 2mg; Amp 2mg/ml, 4mg/ml.",
    "color": "#F3E5F5",
    "icon": "Moon"
  },
  {
    "id": "d79",
    "nombreGenerico": "Propofol",
    "familia": "Alquilfenol / Anestésico general",
    "claseTerapeutica": "Sedante-Hipnótico de acción ultracorta",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A y canales de sodio.",
      "fisiopatologiaAccion": "Potencia la transmisión inhibitoria del GABA y disminuye la tasa de disociación del GABA de su receptor.",
      "efectoSistemico": "Inducción rápida del sueño, disminución del metabolismo cerebral y de la presión intracraneal."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: < 40 segundos.",
      "vidaMedia": "30 - 60 min (distribución rápida).",
      "metabolismoExcrecion": "Metabolismo hepático rápido, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Emulsión lipídica. No mezclar con otros fármacos en la misma vía.",
      "compatibilidadY": "Compatible con Suero Glucosado (para dilución si es necesario)."
    },
    "contraindicaciones": "• Alergia conocida al huevo, soja o cacahuete\n• Inestabilidad hemodinámica grave (choque)\n• Hipersensibilidad al propofol\n• Niños menores de 1 mes (para inducción)\n• Insuficiencia cardíaca descompensada\n• Embarazo y lactancia (precaución)\n• Trastornos del metabolismo lipídico\n• Hipertensión intracraneal severa",
    "efectosAdversos": "• Hipotensión arterial (frecuente)\n• Bradicardia\n• Dolor en el sitio de inyección\n• Apnea transitoria tras inducción\n• Síndrome de infusión de propofol (uso prolongado)",
    "usosEnfermeria": "Intervención: Técnica aséptica rigurosa (emulsión lipídica favorece bacterias). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Cambiar el sistema de infusión y el vial cada 12 horas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial y frecuencia cardíaca continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar niveles de triglicéridos en infusiones prolongadas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar niveles de triglicéridos en infusiones prolongadas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre técnica aséptica rigurosa. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de síndrome de infusión de propofol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial y frecuencia cardíaca continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp/Vial 1% (10mg/ml).",
    "color": "#F3E5F5",
    "icon": "Zap"
  },
  {
    "id": "d80",
    "nombreGenerico": "Dexmedetomidina",
    "familia": "Agonista selectivo de receptores Alfa-2 adrenérgicos",
    "claseTerapeutica": "Sedante, Analgésico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Alfa-2 adrenérgicos presinápticos en el locus coeruleus.",
      "fisiopatologiaAccion": "Inhibe la liberación de noradrenalina, provocando una sedación \"cooperativa\" similar al sueño fisiológico.",
      "efectoSistemico": "Sedación sin depresión respiratoria significativa, analgesia y disminución del tono simpático."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 5-10 min.",
      "vidaMedia": "2 horas.",
      "metabolismoExcrecion": "Metabolismo hepático extenso, excreción renal (95%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 200mcg en 48ml Solución Salina (4mcg/ml). Infusión continua.",
      "compatibilidadY": "Compatible con Solución Salina, Suero Glucosado, Ringer Lactato."
    },
    "contraindicaciones": "• Bloqueo cardíaco avanzado (2do o 3er grado)\n• Hipotensión severa no controlada\n• Hipersensibilidad a la dexmedetomidina\n• Bradicardia severa preexistente\n• Enfermedad cerebrovascular grave\n• Insuficiencia cardíaca aguda\n• Embarazo y lactancia (precaución)\n• Niños menores de 18 años (precaución)",
    "efectosAdversos": "• Bradicardia (disminución de FC)\n• Hipotensión arterial\n• Hipertensión transitoria (al inicio)\n• Sequedad de boca\n• Náuseas postoperatorias",
    "usosEnfermeria": "Intervención: Monitorización cardíaca y de presión arterial continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No requiere interrupción para evaluación neurológica (sedación consciente). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar mediante bomba de infusión de precisión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de bradicardia extrema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar nivel de sedación consciente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre administración mediante bomba de infusión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de bradicardia extrema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización cardíaca y de presión arterial continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 200mcg/2ml.",
    "color": "#F3E5F5",
    "icon": "Activity"
  },
  {
    "id": "d81",
    "nombreGenerico": "Fentanilo",
    "familia": "Opioide sintético (Derivado de fenilpiperidina)",
    "claseTerapeutica": "Analgésico Opioide / Sedante Potente",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores opioides Mu (µ) en el SNC.",
      "fisiopatologiaAccion": "Agonista puro de los receptores Mu, inhibiendo las vías ascendentes del dolor y alterando la percepción del mismo.",
      "efectoSistemico": "Analgesia intensa, sedación profunda y supresión del impulso respiratorio."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-2 min / Parche: 12-24 horas.",
      "vidaMedia": "2 - 4 horas (vida media sensible al contexto aumenta con infusión prolongada).",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción renal (75%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 0.5mg (10ml) en 40ml Solución Salina para bomba de infusión.",
      "compatibilidadY": "Compatible con Midazolam y Propofol."
    },
    "contraindicaciones": "• Depresión respiratoria severa no asistida\n• Intolerancia o hipersensibilidad a opioides\n• Traumatismo craneoencefálico con hipertensión intracraneal\n• Miastenia gravis\n• Obstrucción intestinal o íleo paralítico\n• Embarazo y lactancia (precaución)\n• Insuficiencia hepática grave\n• Uso concomitante con IMAO",
    "efectosAdversos": "• Depresión respiratoria (efecto crítico)\n• Rigidez muscular (tórax en tabla)\n• Bradicardia e hipotensión\n• Estreñimiento y náuseas\n• Prurito (picazón) y retención urinaria",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Monitorización continua de SpO2 y capnografía. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener Naloxona disponible de inmediato como antídoto. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de rigidez torácica (tórax en tabla) en infusión rápida. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar escala de dolor y nivel de sedación frecuentemente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar aparición de rigidez torácica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre escala de dolor. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar nivel de sedación frecuentemente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización continua de SpO2 y capnografía. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 0.1mg/2ml, 0.5mg/10ml; Parches transdérmicos.",
    "color": "#FFEBEE",
    "icon": "AlertTriangle"
  },
  {
    "id": "d82",
    "nombreGenerico": "Ketamina",
    "familia": "Derivado de la fenciclidina",
    "claseTerapeutica": "Anestésico Disociativo",
    "mecanismoAccion": {
      "dianaTerapeutica": "Antagonista de receptores NMDA de glutamato.",
      "fisiopatologiaAccion": "Interrumpe las vías de asociación cerebral entre el sistema límbico y el tálamo, provocando un estado de \"disociación\".",
      "efectoSistemico": "Analgesia profunda, amnesia, sedación y estimulación simpática (mantiene PA y FC)."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 30 seg / IM: 3-4 min.",
      "vidaMedia": "2 - 3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (N-desmetilación), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Puede administrarse directo lento o diluido en Solución Salina.",
      "compatibilidadY": "Incompatible con Barbitúricos y Diazepam."
    },
    "contraindicaciones": "• Hipertensión severa no controlada\n• Eclampsia o preeclampsia grave\n• Insuficiencia cardíaca grave o procesos con aumento de PIC\n• Antecedente de accidente cerebrovascular\n• Glaucoma o lesión ocular abierta\n• Hipertiroidismo no controlado\n• Psicosis o esquizofrenia\n• Hipersensibilidad a la ketamina",
    "efectosAdversos": "• Alucinaciones y sueños vívidos\n• Reacción de emergencia (agitación)\n• Aumento de secreciones bronquiales\n• Hipertensión y taquicardia\n• Diplopía (visión doble) y nistagmo",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Mantener ambiente tranquilo durante la recuperación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar junto con una benzodiazepina para reducir alucinaciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial y frecuencia cardíaca continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de laringoespasmo o aumento de secreciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar aparición de alucinaciones. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre administración junto con benzodiazepinas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar presión arterial y FC continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Mantener ambiente tranquilo durante la recuperación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 500mg/10ml.",
    "color": "#FFEBEE",
    "icon": "AlertTriangle"
  },
  {
    "id": "d83",
    "nombreGenerico": "Etomidato",
    "familia": "Derivado carboxilado del imidazol",
    "claseTerapeutica": "Sedante-Hipnótico Anestésico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A.",
      "fisiopatologiaAccion": "Potencia la neurotransmisión inhibitoria del GABA. Tiene mínima repercusión sobre el sistema cardiovascular.",
      "efectoSistemico": "Inducción anestésica rápida con gran estabilidad hemodinámica."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 30-60 segundos.",
      "vidaMedia": "2 - 5 min (duración del efecto).",
      "metabolismoExcrecion": "Hidrólisis hepática y plasmática, excreción renal (85%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar directo lento en 30-60 seg.",
      "compatibilidadY": "Compatible con la mayoría de soluciones cristaloides."
    },
    "contraindicaciones": "• Hipersensibilidad al etomidato\n• Niños menores de 10 años (seguridad no establecida)\n• Insuficiencia suprarrenal conocida\n• Sepsis severa (por supresión adrenal)\n• Embarazo y lactancia (precaución)\n• Porfiria aguda\n• Inmunosupresión severa\n• Uso prolongado en infusión (prohibido)",
    "efectosAdversos": "• Dolor en sitio de inyección\n• Mioclonías (movimientos involuntarios)\n• Supresión adrenocortical transitoria\n• Náuseas y vómitos\n• Hipo y tos",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Ideal para inducción en shock por estabilidad cardíaca. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de mioclonías durante la inducción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos de insuficiencia suprarrenal en uso prolongado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar a través de una vía venosa de gran calibre. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de insuficiencia suprarrenal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre administración a través de vía venosa de gran calibre. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar estabilidad hemodinámica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de mioclonías durante la inducción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 20mg/10ml.",
    "color": "#FFEBEE",
    "icon": "AlertTriangle"
  },
  {
    "id": "d84",
    "nombreGenerico": "Alprazolam",
    "familia": "Benzodiazepina de acción intermedia",
    "claseTerapeutica": "Ansiolítico, Sedante",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A.",
      "fisiopatologiaAccion": "Potencia la inhibición neuronal mediada por GABA en el sistema límbico y la formación reticular.",
      "efectoSistemico": "Reducción rápida de la ansiedad, sedación leve y efecto antidepresivo coadyuvante."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 1-2 horas.",
      "vidaMedia": "12 - 15 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar con o sin alimentos.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Glaucoma de ángulo estrecho\n• Insuficiencia respiratoria grave o apnea del sueño\n• Miastenia gravis\n• Insuficiencia hepática severa\n• Intoxicación aguda por alcohol\n• Embarazo (especialmente 1er trimestre)\n• Lactancia\n• Hipersensibilidad a las benzodiazepinas",
    "efectosAdversos": "• Somnolencia y sedación diurna\n• Fatiga y debilidad\n• Irritabilidad y cambios de humor\n• Dependencia física y psíquica\n• Sequedad de boca y mareo",
    "usosEnfermeria": "Intervención: Vigilar estrechamente el riesgo de dependencia y tolerancia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Educación sobre no consumir alcohol ni otros depresores del SNC. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar riesgo de caídas y nivel de sedación diurna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No suspender bruscamente el tratamiento. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar riesgo de caídas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no consumir alcohol. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar nivel de sedación diurna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estrechamente el riesgo de dependencia y tolerancia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 0.25mg, 0.5mg, 1mg, 2mg.",
    "color": "#F3E5F5",
    "icon": "Moon"
  },
  {
    "id": "d85",
    "nombreGenerico": "Zolpidem",
    "familia": "Imidazopiridina (No benzodiazepínico)",
    "claseTerapeutica": "Hipnótico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Subunidad Alfa-1 del receptor GABA-A.",
      "fisiopatologiaAccion": "Se une de forma selectiva a los receptores omega-1, lo que le otorga propiedades hipnóticas puras con mínimos efectos ansiolíticos o miorrelajantes.",
      "efectoSistemico": "Inducción rápida del sueño y mejora de la calidad del mismo."
    },
    "farmacocinetica": {
      "inicioAccion": "VO: 30 min.",
      "vidaMedia": "2 - 3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático (CYP3A4), excreción renal y fecal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "VO: Administrar inmediatamente antes de acostarse.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Insuficiencia respiratoria grave o apnea del sueño\n• Insuficiencia hepática severa\n• Niños menores de 18 años (falta de datos)\n• Hipersensibilidad al zolpidem\n• Antecedente de comportamientos complejos del sueño (sonambulismo)\n• Miastenia gravis\n• Embarazo y lactancia (precaución)\n• Intoxicación aguda por alcohol",
    "efectosAdversos": "• Sonambulismo y conductas automáticas\n• Mareo y vértigo\n• Amnesia anterógrada\n• Somnolencia residual matutina\n• Cefalea y náuseas",
    "usosEnfermeria": "Intervención: Asegurar que el paciente pueda dormir 7-8 horas seguidas tras la dosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar conductas automáticas durante el sueño (sonambulismo). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar inmediatamente antes de apagar las luces. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Valorar estado de alerta a la mañana siguiente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar conductas automáticas durante el sueño. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre administración inmediata antes de acostarse. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estado de alerta matutino. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar que el paciente pueda dormir 7-8 horas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Tab 10mg.",
    "color": "#F3E5F5",
    "icon": "Moon"
  },
  {
    "id": "d86",
    "nombreGenerico": "Tiopental Sódico",
    "familia": "Barbitúrico de acción ultracorta",
    "claseTerapeutica": "Sedante, Hipnótico, Anestésico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A.",
      "fisiopatologiaAccion": "Aumenta la duración de la apertura de los canales de cloro, provocando una profunda inhibición del SNC.",
      "efectoSistemico": "Inducción anestésica rápida, disminución del consumo de oxígeno cerebral y de la PIC."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 30-60 segundos.",
      "vidaMedia": "11 - 12 horas (pero efecto clínico dura 5-10 min por redistribución).",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Reconstituir con Agua Destilada para obtener solución al 2.5% (25mg/ml).",
      "compatibilidadY": "Altamente alcalino. Incompatible con casi todos los fármacos (precipita)."
    },
    "contraindicaciones": "• Porfiria intermitente aguda (absoluta)\n• Estado asmático o insuficiencia respiratoria grave\n• Hipersensibilidad a barbitúricos\n• Shock severo sin reposición de volumen\n• Enfermedad cardiovascular grave\n• Miastenia gravis\n• Insuficiencia hepática o renal grave\n• Obstrucción de la vía aérea",
    "efectosAdversos": "• Depresión respiratoria severa\n• Laringoespasmo y broncoespasmo\n• Hipotensión arterial\n• Necrosis tisular por extravasación\n• Somnolencia prolongada",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Asegurar permeabilidad de la vía venosa (altamente alcalino). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización estricta de PA, FC y saturación de O2. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener equipo de manejo de vía aérea avanzada listo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de laringoespasmo tras la inducción. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización estricta de PA, FC y saturación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre equipo de vía aérea avanzada. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de laringoespasmo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar permeabilidad de la vía venosa (altamente alcalino). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 500mg, 1g (polvo).",
    "color": "#FFEBEE",
    "icon": "AlertTriangle"
  },
  {
    "id": "d87",
    "nombreGenerico": "Remifentanilo",
    "familia": "Opioide sintético de acción ultracorta",
    "claseTerapeutica": "Analgésico Opioide / Sedante en UCI",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores opioides Mu (µ).",
      "fisiopatologiaAccion": "Agonista selectivo de receptores Mu. Se metaboliza por esterasas plasmáticas inespecíficas.",
      "efectoSistemico": "Analgesia y sedación potente con desaparición casi inmediata del efecto al suspender la infusión."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-2 min.",
      "vidaMedia": "3 - 10 min (independiente de la duración de la infusión).",
      "metabolismoExcrecion": "Hidrólisis por esterasas plasmáticas y tisulares."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir 2mg o 5mg en 50ml Solución Salina para infusión continua.",
      "compatibilidadY": "Compatible con Propofol y Midazolam."
    },
    "contraindicaciones": "• Hipersensibilidad a derivados del fentanilo\n• No usar por vía epidural o intratecal (contiene glicina)\n• Uso como único agente en anestesia general\n• Depresión respiratoria severa\n• Miastenia gravis\n• Traumatismo craneoencefálico con hipertensión intracraneal\n• Insuficiencia hepática grave\n• Lactancia",
    "efectosAdversos": "• Depresión respiratoria aguda\n• Bradicardia e hipotensión\n• Rigidez muscular (tórax en tabla)\n• Náuseas y vómitos\n• Prurito y mareo",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Requiere bomba de infusión de alta precisión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización hemodinámica y respiratoria continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de bradicardia extrema o hipotensión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Preparar analgesia postoperatoria previa a suspender la infusión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización continua de la función respiratoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar desaparición rápida del efecto al suspender. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre administración mediante bomba de infusión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de rigidez muscular. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Vial 1mg, 2mg, 5mg (polvo).",
    "color": "#FFEBEE",
    "icon": "AlertTriangle"
  },
  {
    "id": "d88",
    "nombreGenerico": "Sevoflurano",
    "familia": "Éter halogenado / Anestésico inhalado",
    "claseTerapeutica": "Anestésico General Inhalatorio",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores GABA-A, Glicina y canales de potasio.",
      "fisiopatologiaAccion": "Altera la función de las proteínas de membrana en las neuronas, interrumpiendo la transmisión sináptica.",
      "efectoSistemico": "Pérdida de conciencia, amnesia y relajación muscular moderada."
    },
    "farmacocinetica": {
      "inicioAccion": "Inhalado: Rápido (baja solubilidad en sangre).",
      "vidaMedia": "Eliminación pulmonar rápida.",
      "metabolismoExcrecion": "Pulmonar (95%), hepático mínimo (5%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Inhalado: Administrado mediante vaporizador específico.",
      "compatibilidadY": "N/A"
    },
    "contraindicaciones": "• Hipersensibilidad a agentes halogenados\n• Susceptibilidad conocida o genética a hipertermia maligna\n• Antecedente de disfunción hepática por anestésicos inhalados\n• Hipertensión intracraneal severa\n• Porfiria aguda\n• Embarazo (primer trimestre)\n• Hipovolemia no corregida\n• Miastenia gravis",
    "efectosAdversos": "• Hipotensión arterial\n• Náuseas y vómitos postoperatorios\n• Agitación al despertar (niños)\n• Bradicardia y arritmias\n• Hipertermia maligna (muy raro)",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO: Vigilancia estrecha de la temperatura corporal. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener Dantroleno disponible en caso de sospecha de hipertermia maligna. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar profundidad anestésica y parámetros respiratorios. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar náuseas y vómitos en el postoperatorio inmediato. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar saturación de oxígeno y capnografía. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar nivel de conciencia al despertar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre técnica de inducción inhalatoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de escalofríos o temblores. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Frasco 250ml (líquido volátil).",
    "color": "#FFEBEE",
    "icon": "Wind"
  },
  {
    "id": "d89",
    "nombreGenerico": "Adrenalina (Epinefrina)",
    "familia": "Agonista adrenérgico Alfa y Beta",
    "claseTerapeutica": "Vasopresor, Estimulante cardíaco, Broncodilatador",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Alfa-1, Beta-1 y Beta-2 adrenérgicos.",
      "fisiopatologiaAccion": "Estimula el sistema nervioso simpático, provocando vasoconstricción (Alfa-1), aumento de la contractilidad y FC (Beta-1) y broncodilatación (Beta-2).",
      "efectoSistemico": "Aumento de la presión arterial, gasto cardíaco y flujo de aire pulmonar. Crucial en RCP."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato / SC: 5-10 min.",
      "vidaMedia": "2 - 3 minutos.",
      "metabolismoExcrecion": "Metabolismo por enzimas MAO y COMT, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Directo en RCP. Infusión: 1mg en 100ml Solución Salina o Suero Glucosado.",
      "compatibilidadY": "Incompatible con soluciones alcalinas (Bicarbonato) - se oxida."
    },
    "contraindicaciones": "• No hay contraindicaciones absolutas en situaciones de emergencia vital\n• Glaucoma de ángulo estrecho\n• Insuficiencia coronaria grave\n• Hipertiroidismo no controlado\n• Parto (puede retrasar la segunda etapa)\n• Arteriosclerosis cerebral severa\n• Enfermedad orgánica del corazón\n• Dilatación cardíaca",
    "efectosAdversos": "• Taquicardia y arritmias cardíacas severas\n• Hipertensión arterial marcada\n• Ansiedad y nerviosismo\n• Temblor y cefalea\n• Isquemia miocárdica\n• Edema pulmonar agudo",
    "usosEnfermeria": "Intervención: MEDICAMENTO DE ALTO RIESGO / COCHE DE PARO: Monitorización ECG continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Proteger la solución de la luz y vigilar cambios de coloración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar preferiblemente por vía central en infusión continua. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar sitio de punción por riesgo de necrosis por extravasación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar presión arterial invasiva si es posible. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar perfusión tisular periférica. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Controlar glucemia (riesgo de hiperglucemia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar aparición de edema pulmonar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 1mg/1ml (1:1000).",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d90",
    "nombreGenerico": "Atropina",
    "familia": "Anticolinérgico / Antimuscarínico",
    "claseTerapeutica": "Antiaarrítmico, Antídoto",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores muscarínicos de acetilcolina.",
      "fisiopatologiaAccion": "Bloquea competitivamente la acetilcolina en los receptores muscarínicos, inhibiendo los efectos del sistema parasimpático.",
      "efectoSistemico": "Aumento de la frecuencia cardíaca (bloqueo vagal), disminución de secreciones y midriasis."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 2-4 min.",
      "vidaMedia": "2 - 3 horas.",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal (70-90%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar directo rápido. Dosis mínima 0.5mg para evitar bradicardia paradójica.",
      "compatibilidadY": "Compatible con la mayoría de soluciones cristaloides."
    },
    "contraindicaciones": "• Glaucoma de ángulo estrecho\n• Uropatía obstructiva o hipertrofia prostática\n• Miastenia gravis\n• Íleo paralítico o megacolon tóxico\n• Estenosis pilórica\n• Taquicardia severa\n• Hipersensibilidad a la atropina\n• Asma bronquial (puede espesar secreciones)",
    "efectosAdversos": "• Taquicardia y palpitaciones\n• Sequedad de boca intensa\n• Visión borrosa y fotofobia\n• Retención urinaria\n• Confusión mental y alucinaciones\n• Estreñimiento",
    "usosEnfermeria": "Intervención: COCHE DE PARO: Indicado en bradicardia sinusal sintomática. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia cardíaca y aparición de arritmias. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estado mental, especialmente en adultos mayores. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Asegurar dosis mínima de 0.5mg para evitar efecto paradójico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar ruidos intestinales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de retención urinaria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre sequedad de mucosas. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar temperatura corporal (riesgo de hipertermia). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 1mg/1ml.",
    "color": "#E3F2FD",
    "icon": "Car"
  },
  {
    "id": "d91",
    "nombreGenerico": "Adenosina",
    "familia": "Nucleósido endógeno",
    "claseTerapeutica": "Antiarrítmico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores A1 de adenosina en el nodo AV.",
      "fisiopatologiaAccion": "Ralentiza el tiempo de conducción a través del nodo AV e interrumpe las vías de reentrada.",
      "efectoSistemico": "Restauración del ritmo sinusal en taquicardias supraventriculares (TSVP). El \"reset\" cardíaco."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato.",
      "vidaMedia": "< 10 segundos.",
      "metabolismoExcrecion": "Captación celular rápida y metabolismo enzimático en sangre."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Técnica de 2 jeringas. Bolo rápido seguido de 20ml Solución Salina. Brazo elevado.",
      "compatibilidadY": "No requiere dilución."
    },
    "contraindicaciones": "• Bloqueo AV de 2do o 3er grado\n• Síndrome del seno enfermo (salvo marcapasos funcionante)\n• Asma bronquial (riesgo de broncoespasmo)\n• Hipersensibilidad a la adenosina\n• Enfermedad pulmonar obstructiva crónica (EPOC)\n• Estenosis carotídea bilateral\n• Hipovolemia no corregida\n• Uso concomitante con dipiridamol",
    "efectosAdversos": "• Asistolia transitoria (segundos)\n• Rubor facial y sofocos\n• Disnea y opresión torácica\n• Dolor torácico\n• Sensación de muerte inminente\n• Náuseas y mareo",
    "usosEnfermeria": "Intervención: COCHE DE PARO: Técnica de 2 jeringas (bolo rápido + 20ml Solución Salina). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Explicar al paciente la sensación de malestar breve y opresión. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización ECG obligatoria con registro de tira de ritmo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar en la vía venosa más proximal al corazón. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar saturación de oxígeno. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar ritmo sinusal post-administración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre técnica de 2 jeringas con brazo elevado. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de broncoespasmo. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 6mg/2ml.",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "d92",
    "nombreGenerico": "Bicarbonato de Sodio",
    "familia": "Agente alcalinizante",
    "claseTerapeutica": "Electrolito / Alcalinizante sistémico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Iones de hidrógeno en el plasma.",
      "fisiopatologiaAccion": "Aumenta la concentración de bicarbonato plasmático, amortiguando el exceso de iones de hidrógeno y elevando el pH sanguíneo.",
      "efectoSistemico": "Corrección de la acidosis metabólica y estabilización de membrana en hiperpotasemia."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato.",
      "vidaMedia": "Variable según estado ácido-base.",
      "metabolismoExcrecion": "Disociación en agua y CO2 (exhalado), excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar lento. No mezclar con Calcio (precipita) ni Adrenalina.",
      "compatibilidadY": "Muy incompatible con la mayoría de fármacos."
    },
    "contraindicaciones": "• Alcalosis metabólica o respiratoria preexistente\n• Hipocalcemia severa\n• Hipopotasemia (puede agravarse)\n• Hipernatremia severa\n• Edema pulmonar severo\n• Insuficiencia renal grave\n• Hipertensión arterial severa\n• Pérdida excesiva de cloruro",
    "efectosAdversos": "• Alcalosis metabólica\n• Hipernatremia (exceso de sodio)\n• Hipopotasemia\n• Sobrecarga de líquidos y edema\n• Hipocalcemia transitoria",
    "usosEnfermeria": "Intervención: COCHE DE PARO: Lavar la vía venosa antes y después de administrar. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: No mezclar con sales de calcio en la misma vía (precipita). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar estado ácido-base (gasometría) y electrolitos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar distensión abdominal y estado respiratorio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de sodio y potasio. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar presencia de edema. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre no mezclar con fármacos ácidos. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar integridad de la vía venosa (irritante). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 8.4% (1 mEq/ml).",
    "color": "#E3F2FD",
    "icon": "Car"
  },
  {
    "id": "d93",
    "nombreGenerico": "Gluconato de Calcio",
    "familia": "Sal de calcio",
    "claseTerapeutica": "Electrolito / Cardioprotector",
    "mecanismoAccion": {
      "dianaTerapeutica": "Canales de calcio y potencial de membrana.",
      "fisiopatologiaAccion": "Estabiliza la membrana del miocito ante la hiperpotasemia, antagonizando los efectos cardíacos del potasio elevado.",
      "efectoSistemico": "Prevención de arritmias fatales en hiperpotasemia y corrección de hipocalcemia aguda."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-3 min.",
      "vidaMedia": "30 - 60 min (efecto cardioprotector).",
      "metabolismoExcrecion": "Excreción renal (20%) y fecal (80%)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Diluir en 100ml Solución Salina o Suero Glucosado. Administrar lento (10 min).",
      "compatibilidadY": "Incompatible con Bicarbonato y Fosfatos."
    },
    "contraindicaciones": "• Hipercalcemia\n• Toxicidad por digoxina (riesgo de arritmias fatales)\n• Sarcoidosis\n• Cálculos renales de calcio\n• Fibrilación ventricular en RCP (salvo hipocalcemia)\n• Insuficiencia renal grave\n• Uso concomitante con ceftriaxona en neonatos\n• Hipofosfatemia",
    "efectosAdversos": "• Bradicardia e hipotensión\n• Sensación de calor y rubor\n• Necrosis tisular por extravasación\n• Estreñimiento\n• Náuseas y vómitos",
    "usosEnfermeria": "Intervención: COCHE DE PARO: Asegurar vía venosa periférica de gran calibre o central. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Administrar muy lento (máximo 1.5-2 ml/min) para evitar paro cardíaco. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorización cardíaca continua durante la administración. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar estrechamente el sitio de punción (altamente irritante). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar niveles de calcio sérico. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar ruidos intestinales. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre sensación de calor transitoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar signos de hipercalcemia. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 10% (1g/10ml).",
    "color": "#E3F2FD",
    "icon": "Car"
  },
  {
    "id": "d94",
    "nombreGenerico": "Naloxona",
    "familia": "Antagonista opioide puro",
    "claseTerapeutica": "Antídoto",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores opioides Mu, Kappa y Delta.",
      "fisiopatologiaAccion": "Compite y desplaza a los opioides de sus receptores en el SNC, revirtiendo sus efectos.",
      "efectoSistemico": "Reversión rápida de la depresión respiratoria y sedación inducida por opioides."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-2 min / IM: 2-5 min.",
      "vidaMedia": "60 - 90 minutos (menor que muchos opioides, riesgo de resedación).",
      "metabolismoExcrecion": "Metabolismo hepático, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Puede darse directo o diluido en Solución Salina.",
      "compatibilidadY": "Compatible con la mayoría de soluciones."
    },
    "contraindicaciones": "• Hipersensibilidad conocida a la naloxona\n• Recién nacidos de madres dependientes a opioides (abstinencia grave)\n• Hipertensión arterial severa\n• Enfermedad cardíaca preexistente\n• Embarazo (salvo emergencia vital)\n• Lactancia\n• Uso crónico de opioides (precaución por abstinencia)\n• Hipersensibilidad a componentes",
    "efectosAdversos": "• Síndrome de abstinencia agudo\n• Hipertensión y taquicardia\n• Edema pulmonar (raro)\n• Náuseas y vómitos\n• Agitación y sudoración",
    "usosEnfermeria": "Intervención: EMERGENCIA: Vigilar resedación (vida media más corta que el opioide). Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Titular dosis lentamente para evitar dolor súbito y agitación. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar signos vitales y nivel de conciencia continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Tener equipo de manejo de vía aérea disponible. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Monitorizar frecuencia respiratoria. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Evaluar signos de abstinencia aguda. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Instruir sobre titulación lenta de dosis. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.\nIntervención: Vigilar nivel de conciencia continuamente. Razón: Asegura la correcta absorción, distribución y eficacia farmacológica, al mismo tiempo que limita la toxicidad sistémica.",
    "presentaciones": "Amp 0.4mg/1ml.",
    "color": "#E3F2FD",
    "icon": "Car"
  },
  {
    "id": "d95",
    "nombreGenerico": "Flumazenil",
    "familia": "Antagonista de benzodiazepinas",
    "claseTerapeutica": "Antídoto",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor GABA-A (sitio de unión de benzos).",
      "fisiopatologiaAccion": "Antagonista competitivo que bloquea los efectos de las benzodiazepinas en el SNC.",
      "efectoSistemico": "Reversión de la sedación y depresión respiratoria por benzos."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: 1-2 min.",
      "vidaMedia": "40 - 80 minutos.",
      "metabolismoExcrecion": "Metabolismo hepático rápido, excreción renal."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Administrar en bolos lentos de 0.2mg.",
      "compatibilidadY": "Compatible con Solución Salina y Suero Glucosado."
    },
    "contraindicaciones": "• Hipersensibilidad a benzodiazepinas o flumazenil\n• Pacientes con epilepsia en tratamiento prolongado con benzos\n• Intoxicación mixta con antidepresivos tricíclicos (riesgo convulsivo)\n• Hipertensión intracraneal severa\n• Antecedente de crisis convulsivas recurrentes\n• Uso de benzos para control de presión intracraneal\n• Dependencia física a benzodiazepinas\n• Traumatismo craneoencefálico severo",
    "efectosAdversos": "• Convulsiones (en dependientes)\n• Agitación e irritabilidad\n• Náuseas y vómitos\n• Arritmias cardíacas\n• Mareo y fatiga",
    "usosEnfermeria": "Administrar en dosis tituladas (0.2mg cada minuto).",
    "presentaciones": "Amp 20% (2g/10ml).",
    "color": "#FFEBEE",
    "icon": "Car"
  },
  {
    "id": "dg_atx",
    "nombreGenerico": "Ácido Tranexámico",
    "familia": "Antifibrinolítico Analógo a Lisina",
    "claseTerapeutica": "Emergencia / Hemostático",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores de lisina en el Plasminógeno.",
      "fisiopatologiaAccion": "Inhibe la activación del plasminógeno a plasmina mediante el bloqueo competitivo, impidiendo que la plasmina disuelva el fibrinógeno y la matriz de fibrina. Consolidando el coágulo en formación.",
      "efectoSistemico": "Previene la degradación patológica del coágulo blando en las heridas (Lecho Placentario / Laceraciones). Actúa como 'pegamento protector'. Es vital por su respaldo mundial (Estudio WOMAN) bajando la mortalidad radicalmente si se da < 3h de la PPH."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato. (Concentración base a los pocos minutos).",
      "vidaMedia": "2 horas (Líquido sinovial articular/histerio y plasma).",
      "metabolismoExcrecion": "Apenas metabolizado, eliminación renal pura (95% inalterado)."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "1 g (1000 mg) diluido lento (bolución con 10 o 20cc isotónico) o paso estricto cronometrado en bomba.",
      "compatibilidadY": "Evitar coadministración en misma vía IV con penicilinas y derivados de la sangre."
    },
    "contraindicaciones": "• Tromboembolismo venoso/arterial Agudo evidente o activo (TVP masiva, TEP de evento inminente).\n• Coagulación Intravascular Diseminada (CID) fibrinolítica por consumo severo.\n• Hematuria colosal por riesgo de coágulo duro obstructivo renal.",
    "efectosAdversos": "• Hipotensión ortostática severa y mareo (SOLO SI se administra en Inyección IV Rápida).\n• Trastornos de la visión de colores / convulsiones (toxicidad cortical directa).\n• Náuseas transitorias.\n• Aumento muy leve de riesgos de tromboembolia aislada.",
    "usosEnfermeria": "Intervención: Inyectar 1 gramo LENTAMENTE vía Intravenosa (a 100mg/min) durante 10 Minutos estrictos. Razón: Administrar Ácido Tranexámico velozmente en bolo genera Hipertensión intracraneal brusca o hipotensión aguda paradójica.\nIntervención: Confirmar momento del sangrado (Hora Cero). Razón: Usarlo pasadas las 3-4 horas de HPP activa no otorga beneficio estadístico y aumenta tasas de microtrombos.\nIntervención: Puede repetirse la dosis a la media hora. Razón: Útil ante el protocolo de choque de sangrado no erradicado.",
    "presentaciones": "Ampollas inyectables de 1 g (1000 mg) en 10 ml de líquido acuoso y 500mg en 5ml.",
    "color": "#E0F7FA",
    "icon": "Ambulance"
  },
  {
    "id": "dg_erg",
    "nombreGenerico": "Metilergonovina / Ergonovina",
    "familia": "Alcaloide del Cornezuelo de Centeno (Ergot)",
    "claseTerapeutica": "Emergencia / Uterotónico",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptores Alfa-Adrenérgicos y Serotoninérgicos lisos.",
      "fisiopatologiaAccion": "Provoca vasoconstricción periférica muy potente acoplada a excitación adrenérgica tónica de la placa uterina preñada generando isquemia y calambre basal.",
      "efectoSistemico": "Hipertensión vascular abrupta y tetania de músculo liso uterino prolongada y firme. Su posición es Tercera Línea o posterior por sus fatales contraindicaciones en Trastornos Hipertensivos del Embarazo y alta cascada vasopresora tóxica."
    },
    "farmacocinetica": {
      "inicioAccion": "IM: 2 a 5 Minutos.",
      "vidaMedia": "0.5 a 2 horas (efecto tetánico basal muy prolongado por cierre espástico).",
      "metabolismoExcrecion": "Metabolismo hepático severo y excreción biliar copiosa."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación IM puro directo profundo en glúteo o vasto lateral.",
      "compatibilidadY": "Altísima toxicidad vascular endovenosa directa."
    },
    "contraindicaciones": "• ABSOLUTAS en Clave Azul: Preeclampsia, Eclampsia o HTA crónica activa gestacional.\n• Sangrados no confirmados y placenta retenida asíncrona total.\n• Cardiopatía isquémica, Enfermedad de Raynaud.\n• Falla hepato-renal aguda.",
    "efectosAdversos": "• Evento Cerebrovascular isquémico (Derrame o ACV) y/o Infarto al Miocardio.\n• Cefalea pulsátil tremenda o Vómito severo inducido neuro-génicamente.\n• Necrosis por isquemia periférica extensa en altas dosis (Ergotismo).",
    "usosEnfermeria": "Intervención: Verificar religiosamente Tensión Arterial PREVIA a su administración. Razón: Una TA de >140/90 es contraindicación; produce un pico presor hipertensivo súbito muy mortal.\nIntervención: Administrar exclusivamente por vía Intramuscular profunda. Razón: La vía Venosa Intravenosa desencadena shock coronario inmediato, isquemia cerebral u oclusiva arterial grave.\nIntervención: Guardar estricta refrigeración (2°-8°C) protegiendo ampolla de la luz lumínica directa. Razón: Los alcaloides ergóticos son altamente fotosensibles y cambian de valencia química si reciben calor.",
    "presentaciones": "Ampollas de 0.20 mg (200 mcg) / 1 ml inyectable IM (Raramente IV). Grageas orales limitadas.",
    "color": "#FBE9E7",
    "icon": "AlertTriangle"
  },
  {
    "id": "cloruro_potasio",
    "nombreGenerico": "Cloruro de Potasio (KCl)",
    "familia": "Electrolito",
    "claseTerapeutica": "Electrolito",
    "mecanismoAccion": {
      "dianaTerapeutica": "Equilibrio iónico intracelular.",
      "fisiopatologiaAccion": "El potasio es el catión intracelular principal; esencial para la transmisión de impulsos nerviosos, contracción muscular (incluyendo el miocardio) y el mantenimiento del potencial de membrana.",
      "efectoSistemico": "Restaura los niveles de potasio, previniendo arritmias letales y debilidad muscular."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato. VO: 30 minutos.",
      "vidaMedia": "Depende de la función renal.",
      "metabolismoExcrecion": "Principalmente renal (90%). No se metaboliza."
    },
    "contraindicaciones": "• Hiperpotasemia\n• Insuficiencia renal aguda o crónica grave\n• Oliguria/Anuria\n• Enfermedad de Addison no tratada\n• Deshidratación aguda severa",
    "efectosAdversos": "• Flebitis y dolor en sitio de inyección (muy común)\n• Hiperpotasemia (arritmias, paro cardíaco)\n• Flebitis, irritación venosa\n• Náuseas y vómitos",
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: NUNCA en bolo. Diluir en Solución Salina o Dextrosa (max 40 mEq/L por periférica).",
      "compatibilidadY": "Incompatible con Amikacina, Anfotericina B, Diazepam libres."
    },
    "usosEnfermeria": "Intervención: NUNCA administrar en push IV (bolo) directo. Causa paro cardíaco. Razón: El potasio en bolo altera el potencial de reposo miocárdico instantáneamente.\nIntervención: Administrar con bomba de infusión. Razón: Permite un control estricto de la velocidad (max 10-20 mEq/h).\nIntervención: Monitorizar electrocardiograma continuo. Razón: Detectar signos tempranos de hiperpotasemia (ondas T picudas) o arritmias.\nIntervención: Evaluar sitio de punción por posible flebitis vesicante. Razón: El potasio es sumamente irritante para la capa endotelial venosa.\nIntervención: Monitoreo estricto del gasto urinario horario (diuresis). Razón: Si hay oliguria, el potasio se acumula rápidamente hasta niveles tóxicos.",
    "presentaciones": "Ampollas al 10% y 20% (Natrol)",
    "color": "#FEF3C7",
    "icon": "Activity"
  },
  {
    "id": "cloruro_sodio",
    "nombreGenerico": "Cloruro de Sodio 20% (Ampujett)",
    "familia": "Electrolito",
    "claseTerapeutica": "Electrolito",
    "mecanismoAccion": {
      "dianaTerapeutica": "Espacio extracelular vascular.",
      "fisiopatologiaAccion": "Aporta sodio y cloruro altamente concentrados (solución hipertónica) jalando agua al espacio intravascular y subiendo la osmolaridad de la sangre.",
      "efectoSistemico": "Aumento del sodio sérico, retención de agua mediada o osmolar."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato.",
      "vidaMedia": "Desconocida (se integra al pool hídrico corporal).",
      "metabolismoExcrecion": "Renal, sudor y heces."
    },
    "contraindicaciones": "• Hipernatremia preexistente\n• Falla cardíaca descompensada / Edema agudo de pulmón\n• Estados de sobrecarga de fluidos",
    "efectosAdversos": "• Sobrecarga de fluidos y Edema Pulmonar\n• Hipernatremia\n• Síndrome de desmielinización osmótica (si la corrección es brusca)\n• Flebitis en el sitio venoso de infusión",
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Normalmente se diluye junto a otras soluciones (ej: Dextrosa). NO administrar directo sin diluir (salvo reanimación bajo extrema cautela).",
      "compatibilidadY": "Generalmente compatible con la mayoría de medicaciones hidrofílicas."
    },
    "usosEnfermeria": "Intervención: Administrar SÓLO usando bomba de infusión y muy lentamente. Razón: Corregir sodio muy rápido produce Mielinólisis Pontina Central (daño cerebral irreversible).\nIntervención: Medir niveles de Sodio en sangre periódicamente (cada 4 a 6 horas). Razón: Evalúa la corrección sin pasarse del límite.\nIntervención: Observar el sitio periférico de venopunción de cerca. Razón: Solución fuertemente hiperosmolar (vesicante si se extravasa).\nIntervención: Controlar rigurosamente el ingreso y egreso de volumen. Razón: Las soluciones hipertónicas generan una rápida expansión del plasma y obligan al riñón a trabajar más.\nIntervención: Escuchar por crépitos pulmonares. Razón: Peligro de edema agudo de pulmón por sobrecarga de volemia.",
    "presentaciones": "Ampollas de 10 ml y 20 ml al 20%.",
    "color": "#FEF3C7",
    "icon": "Activity"
  },
  {
    "id": "insulina_rapida",
    "nombreGenerico": "Insulina Acción Rápida (Lispro/Aspart/Glulisina)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción rápida",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Se absorbe rápidamente en el torrente sanguíneo, facilitando la captación de glucosa por las células musculares y adiposas.",
      "efectoSistemico": "Control glucémico postprandial inmediato."
    },
    "farmacocinetica": {
      "inicioAccion": "~15 minutos",
      "vidaMedia": "Pico: 1-2 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC. Se puede usar IV en casos específicos por protocolo.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección\n• Edema, prurito o rash",
    "usosEnfermeria": "Intervención: Administrar justo antes de las comidas. Razón: Inicio rápido de acción.",
    "presentaciones": "Plumas precargadas, viales.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_corta",
    "nombreGenerico": "Insulina Regular (Acción Corta)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción corta",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Facilita la absorción de glucosa en tejidos periféricos y su almacenamiento en forma de glucógeno en el hígado.",
      "efectoSistemico": "Control glucémico preprandial."
    },
    "farmacocinetica": {
      "inicioAccion": "30-60 minutos",
      "vidaMedia": "Pico: 2-3 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (30-60 min antes de comidas). IV o IM según protocolo.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección",
    "usosEnfermeria": "Intervención: Administrar 30-60 min antes de la comida. Razón: Tiempo de inicio más lento.",
    "presentaciones": "Viales.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_intermedia",
    "nombreGenerico": "Insulina NPH (Acción Intermedia)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción intermedia",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Proporciona niveles sostenidos de insulina para controlar la glucosa entre las comidas y durante la noche.",
      "efectoSistemico": "Control glucémico basal."
    },
    "farmacocinetica": {
      "inicioAccion": "2-4 horas",
      "vidaMedia": "Pico: 4-12 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (2 veces al día). Agitar suavemente antes de usar.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección",
    "usosEnfermeria": "Intervención: Agitar suavemente antes de administrar. Razón: Suspensión de aspecto lechoso.",
    "presentaciones": "Viales, plumas.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_prolongada",
    "nombreGenerico": "Insulina Glargina/Detemir (Prolongada)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción prolongada",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Mantiene niveles constantes de insulina, reduciendo la producción hepática de glucosa.",
      "efectoSistemico": "Control glucémico basal estable."
    },
    "farmacocinetica": {
      "inicioAccion": "1-4 horas",
      "vidaMedia": "Sin pico definido, hasta 24 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (1 vez al día). No mezclar con otras insulinas.",
      "compatibilidadY": "Generalmente no mezclar en la misma jeringa."
    },
    "contraindicaciones": "• Hipoglucemia\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Reacciones locales en sitio de inyección",
    "usosEnfermeria": "Intervención: Administrar a la misma hora diariamente. Razón: Mantener niveles basales constantes.",
    "presentaciones": "Plumas precargadas.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "cloruro_potasio_dup",
    "nombreGenerico": "Cloruro de Potasio (KCl)",
    "familia": "Electrolito",
    "claseTerapeutica": "Electrolito",
    "mecanismoAccion": {
      "dianaTerapeutica": "Equilibrio iónico intracelular.",
      "fisiopatologiaAccion": "El potasio es el catión intracelular principal; esencial para la transmisión de impulsos nerviosos, contracción muscular (incluyendo el miocardio) y el mantenimiento del potencial de membrana.",
      "efectoSistemico": "Restaura los niveles de potasio, previniendo arritmias letales y debilidad muscular."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato. VO: 30 minutos.",
      "vidaMedia": "Depende de la función renal.",
      "metabolismoExcrecion": "Principalmente renal (90%). No se metaboliza."
    },
    "contraindicaciones": "• Hiperpotasemia\n• Insuficiencia renal aguda o crónica grave\n• Oliguria/Anuria\n• Enfermedad de Addison no tratada\n• Deshidratación aguda severa",
    "efectosAdversos": "• Flebitis y dolor en sitio de inyección (muy común)\n• Hiperpotasemia (arritmias, paro cardíaco)\n• Flebitis, irritación venosa\n• Náuseas y vómitos",
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: NUNCA en bolo. Diluir en Solución Salina o Dextrosa (max 40 mEq/L por periférica).",
      "compatibilidadY": "Incompatible con Amikacina, Anfotericina B, Diazepam libres."
    },
    "usosEnfermeria": "Intervención: NUNCA administrar en push IV (bolo) directo. Causa paro cardíaco. Razón: El potasio en bolo altera el potencial de reposo miocárdico instantáneamente.\nIntervención: Administrar con bomba de infusión. Razón: Permite un control estricto de la velocidad (max 10-20 mEq/h).\nIntervención: Monitorizar electrocardiograma continuo. Razón: Detectar signos tempranos de hiperpotasemia (ondas T picudas) o arritmias.\nIntervención: Evaluar sitio de punción por posible flebitis vesicante. Razón: El potasio es sumamente irritante para la capa endotelial venosa.\nIntervención: Monitoreo estricto del gasto urinario horario (diuresis). Razón: Si hay oliguria, el potasio se acumula rápidamente hasta niveles tóxicos.",
    "presentaciones": "Ampollas al 10% y 20% (Natrol)",
    "color": "#FEF3C7",
    "icon": "Activity"
  },
  {
    "id": "cloruro_sodio_dup",
    "nombreGenerico": "Cloruro de Sodio 20% (Ampujett)",
    "familia": "Electrolito",
    "claseTerapeutica": "Electrolito",
    "mecanismoAccion": {
      "dianaTerapeutica": "Espacio extracelular vascular.",
      "fisiopatologiaAccion": "Aporta sodio y cloruro altamente concentrados (solución hipertónica) jalando agua al espacio intravascular y subiendo la osmolaridad de la sangre.",
      "efectoSistemico": "Aumento del sodio sérico, retención de agua mediada o osmolar."
    },
    "farmacocinetica": {
      "inicioAccion": "IV: Inmediato.",
      "vidaMedia": "Desconocida (se integra al pool hídrico corporal).",
      "metabolismoExcrecion": "Renal, sudor y heces."
    },
    "contraindicaciones": "• Hipernatremia preexistente\n• Falla cardíaca descompensada / Edema agudo de pulmón\n• Estados de sobrecarga de fluidos",
    "efectosAdversos": "• Sobrecarga de fluidos y Edema Pulmonar\n• Hipernatremia\n• Síndrome de desmielinización osmótica (si la corrección es brusca)\n• Flebitis en el sitio venoso de infusión",
    "administracionEnfermeria": {
      "dilucionEstandar": "IV: Normalmente se diluye junto a otras soluciones (ej: Dextrosa). NO administrar directo sin diluir (salvo reanimación bajo extrema cautela).",
      "compatibilidadY": "Generalmente compatible con la mayoría de medicaciones hidrofílicas."
    },
    "usosEnfermeria": "Intervención: Administrar SÓLO usando bomba de infusión y muy lentamente. Razón: Corregir sodio muy rápido produce Mielinólisis Pontina Central (daño cerebral irreversible).\nIntervención: Medir niveles de Sodio en sangre periódicamente (cada 4 a 6 horas). Razón: Evalúa la corrección sin pasarse del límite.\nIntervención: Observar el sitio periférico de venopunción de cerca. Razón: Solución fuertemente hiperosmolar (vesicante si se extravasa).\nIntervención: Controlar rigurosamente el ingreso y egreso de volumen. Razón: Las soluciones hipertónicas generan una rápida expansión del plasma y obligan al riñón a trabajar más.\nIntervención: Escuchar por crépitos pulmonares. Razón: Peligro de edema agudo de pulmón por sobrecarga de volemia.",
    "presentaciones": "Ampollas de 10 ml y 20 ml al 20%.",
    "color": "#FEF3C7",
    "icon": "Activity"
  },
  {
    "id": "insulina_rapida_dup",
    "nombreGenerico": "Insulina Acción Rápida (Lispro/Aspart/Glulisina)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción rápida",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Se absorbe rápidamente en el torrente sanguíneo, facilitando la captación de glucosa por las células musculares y adiposas.",
      "efectoSistemico": "Control glucémico postprandial inmediato."
    },
    "farmacocinetica": {
      "inicioAccion": "~15 minutos",
      "vidaMedia": "Pico: 1-2 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC. Se puede usar IV en casos específicos por protocolo.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección\n• Edema, prurito o rash",
    "usosEnfermeria": "Intervención: Administrar justo antes de las comidas. Razón: Inicio rápido de acción.",
    "presentaciones": "Plumas precargadas, viales.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_corta_dup",
    "nombreGenerico": "Insulina Regular (Acción Corta)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción corta",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Facilita la absorción de glucosa en tejidos periféricos y su almacenamiento en forma de glucógeno en el hígado.",
      "efectoSistemico": "Control glucémico preprandial."
    },
    "farmacocinetica": {
      "inicioAccion": "30-60 minutos",
      "vidaMedia": "Pico: 2-3 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (30-60 min antes de comidas). IV o IM según protocolo.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección",
    "usosEnfermeria": "Intervención: Administrar 30-60 min antes de la comida. Razón: Tiempo de inicio más lento.",
    "presentaciones": "Viales.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_intermedia_dup",
    "nombreGenerico": "Insulina NPH (Acción Intermedia)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción intermedia",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Proporciona niveles sostenidos de insulina para controlar la glucosa entre las comidas y durante la noche.",
      "efectoSistemico": "Control glucémico basal."
    },
    "farmacocinetica": {
      "inicioAccion": "2-4 horas",
      "vidaMedia": "Pico: 4-12 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (2 veces al día). Agitar suavemente antes de usar.",
      "compatibilidadY": "Generalmente compatible con soluciones cristaloides."
    },
    "contraindicaciones": "• Hipoglucemia (debe ajustarse dosis)\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Lipodistrofia en sitio de inyección",
    "usosEnfermeria": "Intervención: Agitar suavemente antes de administrar. Razón: Suspensión de aspecto lechoso.",
    "presentaciones": "Viales, plumas.",
    "color": "#FEE2E2",
    "icon": "Activity"
  },
  {
    "id": "insulina_prolongada_dup",
    "nombreGenerico": "Insulina Glargina/Detemir (Prolongada)",
    "familia": "Insulina",
    "claseTerapeutica": "Insulina de acción prolongada",
    "mecanismoAccion": {
      "dianaTerapeutica": "Receptor de Insulina",
      "fisiopatologiaAccion": "Mantiene niveles constantes de insulina, reduciendo la producción hepática de glucosa.",
      "efectoSistemico": "Control glucémico basal estable."
    },
    "farmacocinetica": {
      "inicioAccion": "1-4 horas",
      "vidaMedia": "Sin pico definido, hasta 24 horas",
      "metabolismoExcrecion": "Hígado y riñones."
    },
    "administracionEnfermeria": {
      "dilucionEstandar": "Aplicación SC (1 vez al día). No mezclar con otras insulinas.",
      "compatibilidadY": "Generalmente no mezclar en la misma jeringa."
    },
    "contraindicaciones": "• Hipoglucemia\n• Hipersensibilidad al fármaco",
    "efectosAdversos": "• Hipoglucemia\n• Reacciones locales en sitio de inyección",
    "usosEnfermeria": "Intervención: Administrar a la misma hora diariamente. Razón: Mantener niveles basales constantes.",
    "presentaciones": "Plumas precargadas.",
    "color": "#FEE2E2",
    "icon": "Activity"
  }
];

export const SERVICIOS = [
  { name: "Salud Comunitaria", icon: "Users" },
  { name: "Gineco-Obstetricia", icon: "Baby" },
  { name: "Cirugía", icon: "Scissors" },
  { name: "Medicina Interna", icon: "Stethoscope" },
  { name: "Emergencias", icon: "Ambulance" }
];

export const DISEASES: Disease[] = [
  {
    "id": "go12",
    "nombre": "Atonía Uterina",
    "servicio": "Gineco-Obstetricia",
    "definicionCaso": "La Atonía Uterina es la incapacidad del miometrio para alcanzar una contracción sostenida y vigorosa tras el alumbramiento. Fisiopatológicamente, el miometrio funciona como una 'ligadura viva' que comprime mecánicamente los vasos espirales del lecho placentario tras el desprendimiento de la placenta. Cuando esta contracción falla, los vasos arteriales y venosos, que reciben un flujo sanguíneo de 600-700 ml/min en el útero gravídico, permanecen abiertos, desencadenando una hemorragia arterial libre y masiva. Esta pérdida hemática rápida satura los mecanismos hemostáticos, agota rápidamente los factores de coagulación y lleva inminentemente a un choque hipovolémico por exanguinación sistémica.",
    "etiologia": "Asociada a sobredistensión uterina (embarazo múltiple, polihidramnios, feto macrosómico), corioamnionitis, uso de relajantes uterinos (anestésicos halotánicos), trabajo de parto prolongado o precipitado, y paridad elevada.",
    "fisiopatologiaBasica": "El mecanismo central es la falla en la retracción y contracción del miometrio post-alumbramiento. Al no producirse el cierre mecánico de los vasos espirales del lecho placentario (ligadura viva), se pierde el principal mecanismo hemostático uterino. Esto conduce a una hemorragia masiva, que a su vez causa hipoperfusión sistémica, choque hipovolémico, coagulopatía por consumo y falla orgánica múltiple.",
    "complicaciones": [
      "Choque Hipovolémico Grado IV",
      "Coagulopatía de Consumo (CID)",
      "Insuficiencia Renal Aguda (Necrosis Tubular)",
      "Síndrome de Sheehan (Necrosis Hipofisaria)",
      "Histerectomía obstétrica de emergencia"
    ],
    "riesgosNoTratado": [
      "Muerte materna en minutos por exanguinación",
      "Histerectomía con pérdida de fertilidad",
      "Disfunción orgánica múltiple por hipoperfusión",
      "Necesidad de transfusión masiva de hemoderivados"
    ],
    "banderasRojas": [
      "Sangrado vaginal rutilante continuo y masivo",
      "Útero blando/no palpable por encima de la sínfisis",
      "Hipotensión y Taquicardia (signos de choque)",
      "Alteración del nivel de conciencia",
      "Palidez cutánea extrema"
    ],
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Pérdida de sangre excesiva por vía vaginal post-parto (>500 ml parto vaginal o >1000 ml cesárea).",
        "Útero blando, flácido y que no se contrae ('útero de Couvelaire' o falta de globo de seguridad de Pinard).",
        "Fondo uterino por encima de la cicatriz umbilical.",
        "Cambios hemodinámicos tempranos: Taquicardia (>100 lpm).",
        "Hipotensión arterial (tardía o signo de choque descompensado).",
        "Palidez de piel y mucosas, diaforesis, llenado capilar prolongado.",
        "Olíguria (disminución de la producción de orina).",
        "Alteración del estado de conciencia (confusión, letargo, agitación).",
        "Expulsión de grandes coágulos vaginales.",
        "Sensación de mareo, vértigo o lipotimia al incorporarse."
      ],
      "maniobraExploracion": "Palpación abdominal (búsqueda del fondo uterino, consistencia 'leñosa' ausente). Exploración bimanual (compresión del útero entre el puño en fondo de saco vaginal y la mano abdominal). Revisión sistemática del canal de parto (para descartar desgarros o restos, aplicando mnemotecnia de las 4 Ts).",
      "banderasRojas": [
        "1. Sangrado masivo que no cesa con masaje ni uterotónicos de primera línea.",
        "2. Índice de choque ≥ 1 (FC / TAS).",
        "3. Caída rápida de la presión sistólica < 90 mmHg.",
        "4. Alteración del estado mental (choque hipovolémico severo).",
        "5. Frecuencia Cardíaca > 120 lpm.",
        "6. Falta de respuesta a la compresión bimanual y oxitocina.",
        "7. Coagulopatía secundaria incipiente (sangrado que no coagula).",
        "8. Requerimiento inmediato de transfusión (Activación Clave Roja)."
      ],
      "cita": "GPC MSP Ecuador, Atención Integral de la Hemorragia Posparto"
    },
    "manejo": {
      "diagnostico": "Se requiere ACTIVACIÓN DE CLAVE ROJA. Evaluacion y manejo se realizan al mismo tiempo con el equipo.",
      "tratamiento": "Oxitocina, Balòn de Bakri, y reposición de volumen.",
      "criterioReferencia": "Transferencia a unidad con capacidad quirúrgica y cuidados intensivos si no hay respuesta a medidas iniciales.",
      "cuidadosEnfermeria": "• Masaje uterino bimanual continuo y vigoroso.\n• Vigilar tono uterino y altura del fondo cada 15 min.\n• Cuantificación estricta de sangrado (pesado de apósitos).\n• Asegurar dos vías periféricas exclusivas (calibre 16).\n• Control de signos vitales cada 5-15 minutos.",
      "tratamientoDetallado": {
        "medidasGenerales": [
          "ACTIVAR CÓDIGO/CLAVE ROJA inmediatamente.",
          "Solicitar ayuda urgente (médico especialista, enfermería, laboratorio, banco de sangre).",
          "Asegurar vía aérea, administrar oxígeno suplementario a demanda.",
          "Establecer dos accesos venosos periféricos de grueso calibre (14G o 16G).",
          "Sondaje vesical (sonda Foley) para cuantificar diuresis (>30ml/hr) y descompresión vesical para favorecer la contracción uterina.",
          "Masaje uterino bimanual continuo hasta que el útero responda."
        ],
        "farmacos": [
          {
            "nombre": "Oxitocina",
            "dosis": "10 - 40 UI en 1000 cc de Cristaloides",
            "frecuencia": "Infusión IV continua a titular según sangrado.",
            "observaciones": "Uterotónico de elección. Diluir siempre; no dar paso rápido sin diluir (riesgo de hipotensión severa)."
          },
          {
            "nombre": "Misoprostol",
            "dosis": "800 - 1000 mcg",
            "frecuencia": "Dosis única intrarrectal (o sublingual).",
            "observaciones": "Causará fiebre y escalofríos. Segunda línea para estimular la contracción."
          },
          {
            "nombre": "Ácido Tranexámico",
            "dosis": "1 g IV",
            "frecuencia": "Lento en 10 minutos (100 mg/min).",
            "observaciones": "No es uterotónico, es hemostático. Crucial en Clave Roja."
          }
        ]
      },
      "cita": "GPC MSP Ecuador, Manejo de la Hemorragia Posparto"
    }
  },
  {
    "id": "sc1",
    "nombre": "Hipertensión Arterial (HTA)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Asintomática (El asesino silencioso)",
        "Cefalea occipital persistente (matutina)",
        "Acúfenos (zumbidos o ruidos en los oídos)",
        "Fosfenos (destellos de luz o visión de manchas)",
        "Palpitaciones y dolor torácico atípico",
        "Mareo o inestabilidad",
        "Epistaxis (sangrado nasal) recurrente"
      ],
      "maniobraExploracion": "1. Medición Protocolizada: Paciente en reposo 5 min, sin haber tomado cafeína/tabaco. 2. Técnica: Brazo a nivel del corazón, manguito cubriendo 80% del brazo. Búsqueda de 'Gap Auscultatorio'. 3. Fondo de Ojo: Para evaluar retinopatía hipertensiva (grados I-IV). 4. Palpación de pulsos periféricos y búsqueda de soplos carotídeos.",
      "banderasRojas": [
        "Emergencia Hipertensiva: PA > 180/120 + Daño a órgano blanco (ACV, EAP, IAM)",
        "Cefalea súbita intensa ('el peor dolor de su vida')",
        "Déficit motor o sensitivo súbito",
        "Visión borrosa o pérdida súbita de la visión",
        "Dolor torácico opresivo irradiado"
      ],
      "cita": "Guía Europea de Hipertensión (ESC/ESH) 2023 / Bates 13ra Ed."
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Hipertensión Arterial (HTA) no es un simple número elevado, sino un síndrome cardiovascular progresivo. El evento disparador es la pérdida del equilibrio dinámico entre el gasto cardíaco y la resistencia vascular periférica, originado por una interacción compleja entre genética, sobrecarga de sodio e hiperactivación vascular.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Disfunción Endotelial:** El endotelio vascular pierde su capacidad protectora de sintetizar óxido nítrico y eleva la endotelina.\\n- **Remodelado Vascular:** Los vasos sanguíneos se esclerosan, estrechan su luz interior y se vuelven rígidos (hipertrofia de la capa media).\\n- **Sobrecarga Ventricular:** La bomba cardíaca izquierda debe lidiar permanentemente con un muro de alta resistencia, derivando en hipertrofia patológica compensatoria.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Cardiovascular:** Angina microvascular, disfunción diastólica franca e incremento abismal del riesgo a Infartos.\\n- **Sistema Renal:** La alta presión sostenida calcifica las arteriolas aferentes, acribillando el filtro glomerular, provocando proteinuria e insuficiencia renal.\\n- **Sistema Neurológico:** Endurecimiento progresivo de microvasos cerebrales que predispondrá a hemorragias letales u oclusiones lentas.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Sistema Renina-Angiotensina-Aldosterona (SRAA):** Hiperactivado nocivamente, inunda la sangre de Angiotensina II (el vasoconstrictor maestro) y Aldosterona (el secuestrador de sodio tubular).\\n- **Hiperactividad Simpática:** Un tono adrenérgico de fondo patológicamente elevado perpetúa el aumento constante del pulso.\\n\\n### Correlación con Comorbilidades\\n- **Síndrome Metabólico y Diabetes:** Potencian sinérgicamente el fracaso endotelial y la inflamación vascular crónica.\\n- **Obesidad:** El adipocito libera adipocinas pro-hipertensivas que alimentan la resistencia vascular y renal.",
      "esquemaMental": {
        "inicio": "Disfunción del SRAA + Ingesta excesiva de Sodio + Genética.",
        "dano": "Vasoconstricción sostenida y aumento de la rigidez arterial.",
        "consecuencia": "Hipertrofia ventricular izquierda, aterosclerosis acelerada y daño renal."
      },
      "cita": "Harrison, Principios de Medicina Interna, 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Diagnóstico con PA ≥140/90 mmHg en consulta (2-3 visitas) o ≥135/85 mmHg en MAPA/MDPA. Cribado de daño en órgano diana: EKG, Cociente Albúmina/Creatinina, Fondo de ojo.",
      "tratamiento": "1. Cambios estilo de vida (DASH, <5g sal/día). 2. Farmacoterapia (IECA/ARA II + Calcioantagonista o Diurético). Enalapril: iniciar con 5-10 mg/día (hasta 40 mg/día VO dividida en 1 o 2 tomas). Losartán: iniciar con 50 mg/día (hasta 100 mg/día VO en 1 o 2 tomas). NOTA CLINICA: Es mandatorio vigilar los electrolitos séricos (K+) y la creatinina, ya que IECA/ARA II inducen retención de potasio y pueden desencadenar hiperpotasemia fatal o fallo renal.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Enalapril (IECA)", "dosis": "5 - 10 mg (Inicio) hasta 40 mg máximo", "frecuencia": "VO cada 12 o 24 horas", "observaciones": "Riesgo de tos seca y angioedema. Vigilar hiperpotasemia y creatinina sérica." },
          { "nombre": "Losartán (ARA II)", "dosis": "50 mg (Inicio) hasta 100 mg máximo", "frecuencia": "VO cada 12 o 24 horas", "observaciones": "Alternativa de elección si se presenta tos refractaria con IECA. Mismos riesgos de protección/falla renal combinada." },
          { "nombre": "Amlodipino (Calcioantagonista)", "dosis": "5 - 10 mg", "frecuencia": "VO cada 24 horas", "observaciones": "Frecuente desarrollo de edema maleolar periférico bilateral (tobillos) que no responde a diuréticos." }
        ],
        "medidasGenerales": [
          "Dieta DASH: Enfoque dietético para detener la hipertensión (Alta en verduras, lácteos desnatados).",
          "Restricción profiláctica de Sodio < 5 gramos de sal o < 2 gramos de sodio por día absoluto.",
          "Evitar tabaquismo y moderar extremo consumo de OH y café matutino."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Lecturas sistemáticas de MDPA (Medición Domiciliaria) matutinas y nocturnas.",
          "Cuantificación de Sodio, Potasio y Relación Albúmina/Creatina en orina programada anual.",
          "Ecocardiograma de base revisando HVI (hipertrofia trans-ventricular) inicial."
        ],
        "signosAlerta": [
          "Cefalea persistente fulgurante y trastornos visuales progresivos (Posible Emergencia HTE).",
          "Dolor precordial típico al ejercicio asociado a un mal control subyacente.",
          "Desarrollo sostenido de hipotensión ortostática, sobre todo en adultos mayores al levantarse."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Presión < 130/80 mmHg en múltiples lecturas durante el control.",
          "Regresión del grosor de la pared ventricular al eco de control inter-anual.",
          "Mantenimiento absoluto de la filtración glomerular estable."
        ],
        "criteriosFracaso": [
          "HTA Resistente: Tensión Arterial mantenida lejos de metras a pesar de usar 3 o más fármacos a dosis óptica (incluyendo 1 de asa).",
          "Deterioros renales marcados o episodios de isquemia global neurológica incipientes."
        ]
      },
      "cita": "GPC MSP Ecuador 2019 / Guía ISH 2020",
      "criterioReferencia": "HTA resistente, sospecha de HTA secundaria, embarazo, daño agudo de órgano diana."
    },
    "definicionCaso": "Presión arterial sistólica ≥140 mmHg y/o diastólica ≥90 mmHg en al menos dos mediciones en dos o más visitas.",
    "sintomasClave": [
      "Cefalea",
      "Tinnitus",
      "Fosfenos"
    ],
    "enfermeria": {
      "nanda": "00267 Riesgo de presión arterial inestable",
      "intervenciones": [
        {
          "accion": "Monitorización de la PA en ambos brazos (descartar diferencia >15mmHg).",
          "razon": "Identificar posibles estenosis arteriales o errores de medición."
        },
        {
          "accion": "Educación sobre adherencia terapéutica y técnica de MDPA.",
          "razon": "El control domiciliario mejora el pronóstico y reduce el efecto de bata blanca."
        },
        {
          "accion": "Vigilancia de signos de crisis hipertensiva.",
          "razon": "Detección temprana de emergencias que requieren manejo hospitalario."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "NANDA-I 2021-2023 / Manual de Enfermería Médica"
    }
  },
  {
    "id": "sc2",
    "nombre": "Diabetes Mellitus Tipo 2",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Poliuria (micción frecuente y abundante)",
        "Polidipsia (sed intensa e insaciable)",
        "Polifagia (aumento exagerado del apetito)",
        "Pérdida de peso inexplicable",
        "Acantosis Nigricans (hiperpigmentación en cuello y axilas)",
        "Astenia (fatiga crónica)",
        "Parestesias en miembros inferiores ('hormigueo' o ardor)",
        "Mala cicatrización de heridas"
      ],
      "maniobraExploracion": "1. Evaluación con Monofilamento de Semmes-Weinstein: Prueba de sensibilidad en 10 puntos del pie para detectar neuropatía. 2. Vibración: Uso del diapasón de 128 Hz en el primer metatarsiano o maléolos. 3. Inspección: Búsqueda de micosis interdigital, callosidades o úlceras (Pie Diabético).",
      "banderasRojas": [
        "Estado Hiperosmolar Hiperglucémico (Glucosa >600, deshidratación profunda, sin acidosis)",
        "Cetoacidosis Diabética (Dolor abdominal, respiración de Kussmaul, aliento cetónico)",
        "Hipoglucemia Grave (< 54 mg/dL o alteración de conciencia)",
        "Pérdida súbita de visión (Hemorragia vítrea)"
      ],
      "cita": "ADA Standards of Care in Diabetes 2024"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Diabetes Mellitus Tipo 2 es una alteración metabólica global devastadora. El evento disparador es el fracaso de los receptores celulares de insulina frente al constante y anormal bombardeo energético provocado por el sedentarismo y la obesidad visceral; el hígado y músculo desarrollan una feroz 'Resistencia a la Insulina'.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Resistencia Inicial:** Las células musculares rechazan la glucosa extracelular por saturación lipídica.\\n- **Hiperinsulinemia Tóxica:** El páncreas se desespera y derrama cantidades suicidas de insulina al torrente para forzar la entrada de combustible celular.\\n- **El Agotamiento (Fallo de la Célula Beta):** Las células beta sucumben ante la glucotoxicidad celular, iniciando su muerte programada y cesando la producción de insulina.\\n- **Descontrol Glucémico:** Sin insulina efectiva, el azúcar y los ácidos grasos colapsan los vasos sanguíneos sistémicos inflamándolos como fuego.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Neurológico:** Se masacra la vaina de mielina de los miembros inferiores (Neuropatía Periférica) perdiendo totalmente el dolor protector de las heridas.\\n- **Sistema Microvascular:** La glucosa anula capilares finos de la retina desembocando en ceguera irremediable e interfiere irremediablemente con la mecánica de filtración renal.\\n- **Sistema Macrovascular:** Incremento cataclísmico en la tasa formativa de placas de colesterol (ateromas intratables).\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Glicación No Enzimática:** Las moléculas de glucosa excedentes bombardean y se adhieren a los tejidos de forma destructiva (AGEs o proteínas tostadas), arruinando colágeno y receptores.\\n- **Glucagón Sin Control:** El hígado recibe ordenes invertidas por la ausencia de insulina e inicia una mortífera gluconeogénesis extra.\\n\\n### Correlación con Comorbilidades\\n- **Hipertensión Arterial y Dislipidemia Quirúrgica:** Tres enfermedades gemelas que aseguran el fallo orgánico final del ser humano si se ignoran en el corto plazo.",
      "esquemaMental": {
        "inicio": "Resistencia a la insulina (obesidad/sedentarismo) + Predisposición genética.",
        "dano": "Hiperglucemia persistente y agotamiento de la reserva pancreática.",
        "consecuencia": "Microangiopatía (retina, riñón) y Macroangiopatía (corazón, cerebro)."
      },
      "cita": "Robbins, Patología Humana 10ma Ed."
    },
    "manejo": {
      "diagnostico": "1. Glucosa ayunas ≥126 mg/dL. 2. HbA1c ≥6.5%. 3. Glucosa al azar ≥200 mg/dL + síntomas. 4. Curva de tolerancia (75g) ≥200 mg/dL a las 2h.",
      "tratamiento": "Pilar 1: Metformina (inicio 500-850mg). Pilar 2: Estilo de vida (pérdida de peso 7-10%). Pilar 3: Control de riesgo CV (Estatinas, IECA). Si HbA1c >9% considerar insulinización temprana.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Metformina (Biguanida)", "dosis": "500 mg inicial, titulación clínica a 2000 mg", "frecuencia": "Diaria VO con las comidas más pesadas", "observaciones": "Causa GI en primeras semanas. FALSAMENTE prohibida en falla renal leve/mod; suspender si FG < 30 mL/min." },
          { "nombre": "Empagliflozina / Dapagliflozina (iSGLT2)", "dosis": "10 mg a 25 mg diarios", "frecuencia": "Diaria VO, idealmente en la mañana", "observaciones": "Protección cardio-renal validada. Alto riesgo de Cetoacidosis Euglucémica e Infecciones urinarias crónicas." },
          { "nombre": "Insulina Glargina (Basal)", "dosis": "A partir de 10 UI, o a 0.1-0.2 UI/kg", "frecuencia": "SC Nocturna (Aplicar en horario estable)", "observaciones": "Iniciada temprano si curva HbA > 9% o 10%. Riesgo de hipoglucemia nocturna." }
        ],
        "medidasGenerales": [
          "Inspección exhaustiva intra-consultorio de calzado y pies en cada visita del paciente sin falta.",
          "Asesoramiento y dieta para baja de 5%-10% de peso que puede incluso inducir remisión funcional incipiente.",
          "Combinar aeróbico con resistencia anaeróbica 150min/semana mejora drásticamente sensibilidad periférica."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Hemoglobina Glicosilada (HbA1c) por normatividad testada cada 3 a 6 meses.",
          "Bitácora de glicemias capilares basales matutinos y control post-prandial según avance.",
          "Fondo de ojo (Cámara de rastreo o midriático) inicial desde el diagnóstico en el Tipo 2."
        ],
        "signosAlerta": [
          "Triada hipoglucémica (Neuroglicopenia/Adreneérgica): Palidez, temblor frío, sudoración taquicardia post pinchazo SC.",
          "Neuropatía precoz de fibras pequeñas: Sensación 'quemante' u 'hormigueo en medias' dolorosa e irritante de noche al dormir.",
          "Polidipsia severa (Sed extrema incontrolable con mucha orina espumosa)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "HbA1c meta para general en red ambulatoria < 7.0%. HbA1c para frágiles de >75 años permitida < 8.0%.",
          "Capilar Basal Ayuno pre: 80 - 130 mg/dL. Capilar Pósprandial (2 hrs post): < 180 mg/dL.",
          "Peso descendiendo progresivamente."
        ],
        "criteriosFracaso": [
          "Hiperglucemia en niveles de > 300 con evolución a cetonuria asintomática.",
          "Progresión masiva de la Retinopatía impidiendo buena visión."
        ]
      },
      "cita": "GPC MSP Ecuador 2017 / ADA 2024",
      "criterioReferencia": "Complicaciones agudas (CAD, EHH), pie diabético infectado, falla renal progresiva, mal control con terapia triple."
    },
    "definicionCaso": "Enfermedad metabólica caracterizada por hiperglucemia crónica debida a defectos en la secreción o acción de la insulina.",
    "sintomasClave": [
      "Poliuria",
      "Polidipsia",
      "Polifagia"
    ],
    "enfermeria": {
      "nanda": "00179 Riesgo de nivel de glucemia inestable",
      "intervenciones": [
        {
          "accion": "Enseñanza del automonitoreo glucémico y técnica de inyección de insulina.",
          "razon": "Empoderar al paciente reduce complicaciones agudas y mejora el control metabólico."
        },
        {
          "accion": "Inspección diaria de pies y calzado.",
          "razon": "Detección precoz de lesiones para evitar el pie diabético y amputaciones."
        },
        {
          "accion": "Educación sobre reconocimiento de hipoglucemia (triada de Whipple).",
          "razon": "La hipoglucemia es la complicación aguda más peligrosa del tratamiento."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería en Diabetes"
    }
  },
  {
    "id": "sc3",
    "nombre": "Tuberculosis Pulmonar (TBC)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Tos productiva persistente (> 15 días)",
        "Hemoptisis (expectoración con sangre)",
        "Derrame pleural (disminución del murmullo vesicular)",
        "Astenia, adinamia e hiporexia (pérdida de apetito)",
        "Fiebre vespertina / nocturna persistente",
        "Pérdida de peso significativa (caquexia)",
        "Diaforesis (sudoración) nocturna profusa"
      ],
      "maniobraExploracion": "1. Inspección: Signos de pérdida de peso y uso de músculos accesorios. 2. Auscultación: Búsqueda de estertores crepitantes apicales (frecuentes en reactivación). 3. Percusión: Matidez si hay consolidación o derrame pleural.",
      "banderasRojas": [
        "Hemoptisis masiva (sangrado amenazante)",
        "Insuficiencia respiratoria aguda",
        "Signos de TB Meníngea (rigidez de nuca, cefalea intensa)",
        "Pancitopenia (TB Miliar)",
        "Derrame pericárdico (taponamiento)"
      ],
      "cita": "Manual de Normas de Tuberculosis MSP Ecuador 2023"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Tuberculosis Pulmonar (TBC) es una invasión crónica que consume los recursos biológicos enteros del huésped. El evento disparador es la inhalación de un paciente bacilífero y llegada del letal Mycobacterium tuberculosis a los alvéolos. La bacteria, portando una coraza lipídica virtualmente impenetrable, utiliza trucos para sabotear su propia digestión.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Secuestro Macrófago:** La bacteria desactiva el fagosoma del macrófago alveolar, utilizándolo como Caballo de Troya para replicarse silenciosamente en sus entrañas.\\n- **El Bloqueo (Granuloma):** El sistema inmune del huésped responde de manera desesperada emparedando a las bacterias infectadas mediante anillos de linfocitos T, dando a luz al Granuloma (Foco de Ghon).\\n- **El Colapso Cavitario:** Si la inmunidad declina ligeramente, las enzimas defensivas derriten el centro del granuloma desencadenando una Necrosis Caseosa (queso suizo).\\n- **Licuefacción y Diseminación:** Estas cavidades revientan y vomitan millones de micobacterias infectantes destructivas nuevamente al árbol broncopulmonar.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Respiratorio:** Abscesos, cavitaciones y fibrosis pulmonar extrema que amputan la capacidad ventilatoria llevando a Insuficiencia Respiratoria Crónica.\\n- **Sistema Vascular Pulmonar:** Remodelado de vasos que produce la expectoración sanguinolenta característica y severa (Hemoptisis y erosión).\\n- **Miliariasis (Afectación Sistémica):** En formas graves, los bacilos navegan el torrente sanguíneo, devastando riñones, meninges y huesos.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Tormenta Crónica de TNF-alfa:** Las células inmunes intentando batallar por su parte estallan liberando Factor de Necrosis Tumoral perpetuamente, el causante cardinal por el que el paciente sufre sudoraciones nocturnas letales y caquexia.\\n\\n### Correlación con Comorbilidades\\n- **Infección Humana por VIH:** El sida vacía las reservas de Linfocitos T-CD4, lo cual anula totalmente la muralla defensiva del granuloma y acelera explosivamente la diseminación bacteriana mortal.\\n- **Diabetes y Hacinamiento Desnutricional:** Factores comunitarios y de inmunosupresión crónica.",
      "esquemaMental": {
        "inicio": "Inhalación de bacilo de Koch y fagocitosis.",
        "dano": "Formación de granuloma y necrosis caseosa central.",
        "consecuencia": "Destrucción del parénquima y diseminación sistémica."
      },
      "cita": "Harrison Principios de Medicina Interna, 21ra Ed."
    },
    "manejo": {
      "diagnostico": "1. Baciloscopia seriada (BK). 2. GeneXpert (Prueba molecular - Gold Standard inicial). 3. Cultivo (Lowenstein-Jensen). 4. Rx Tórax (Infiltrados apicales/cavernas).",
      "tratamiento": "Estrategia DOTS. Fase I (2 meses): HRZE (Isoniazida, Rifampicina, Pirazinamida, Etambutol). Fase II (4 meses): HR (Isoniazida, Rifampicina).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Isoniazida (H)", "dosis": "5 mg/kg. Max 300 mg", "frecuencia": "Diario Lunes-Sábado (DOTS Directo)", "observaciones": "Riesgo de Neuropatía periférica. Se previene con Piridoxina (Vitamina B6)." },
          { "nombre": "Rifampicina (R)", "dosis": "10 mg/kg. Max 600 mg", "frecuencia": "Diario", "observaciones": "Hepatotoxicidad fuerte. Puede teñir secreciones (orina, lágrimas) de color naranja." },
          { "nombre": "Pirazinamida (Z) y Etambutol (E)", "dosis": "Z: 25mg/kg. E: 15-20mg/kg", "frecuencia": "Diario en Fase 1 (2 meses)", "observaciones": "Z eleva ácido úrico. E puede causar toxicidad del nervio óptico." }
        ],
        "medidasGenerales": [
          "Supervisión directa de la toma del medicamento (DOTS).",
          "Uso de mascarilla N-95 por el personal y quirúrgica por el paciente.",
          "Estudio de contactos (círculo íntimo)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Baciloscopía (BK) mensual.",
          "Perfil Hepático basal y a los 15 días.",
          "Control de peso mensual."
        ],
        "signosAlerta": [
          "Ictericia o dolor abdominal (Hepatotoxicidad).",
          "Alteraciones visuales (Toxicidad por Etambutol).",
          "Hemoptisis persistente."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "BK negativo al final del tratamiento.",
          "Ganancia de peso.",
          "Mejoría radiológica."
        ],
        "criteriosFracaso": [
          "BK positivo persistente tras 2 meses de tratamiento.",
          "Sospecha de resistencia (MDR/XDR)."
        ]
      },
      "cita": "Estrategia Fin a la TB, OMS / MSP Ecuador",
      "criterioReferencia": "TB MDR, RAMs graves, coinfección VIH-SIDA."
    },
    "enfermeria": {
      "nanda": "00031 Limpieza ineficaz de las vías aéreas",
      "intervenciones": [
        {
          "accion": "Garantizar la toma del fármaco (Estrategia DOTS).",
          "razon": "Prevenir el abandono y la aparición de cepas resistentes."
        },
        {
          "accion": "Educación sobre etiqueta de tos y eliminación de esputo.",
          "razon": "Cortar la cadena de transmisión en el hogar y comunidad."
        },
        {
          "accion": "Monitorizar signos vitales y estado nutricional.",
          "razon": "Identificar deterioro agudo o complicaciones sistémicas."
        }
      ],
      "cita": "Manual de Enfermería en Salud Pública"
    }
  },
  {
    "id": "sc4",
    "nombre": "Anemia Ferropénica",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Droplet",
    "clinica": {
      "signosSintomas": [
        "Palidez cutáneo-mucosa (palma de manos, conjuntivas)",
        "Astenia y adinamia",
        "Pica (deseo de comer tierra/hielo)",
        "Glositis (lengua lisa)",
        "Coiloniquia (uñas en cuchara)"
      ],
      "maniobraExploracion": "Inspección de conjuntivas y lechos ungueales. Auscultación cardíaca: Soplo sistólico funcional por hiperdinamia.",
      "banderasRojas": [
        "Disnea de reposo",
        "Taquicardia extrema",
        "Alteración del sensorio",
        "Insuficiencia cardíaca de alto gasto"
      ],
      "cita": "Bates 13ra Ed. / GPC MSP Anemia"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Anemia Ferropénica es el déficit carencial más crónico de la humanidad. El evento disparador es el fracaso en el equilibrio entre las pérdidas de hierro (sangrados crónicos) y los aportes nutricionales. Al faltar el catión Hierro (Fe), la médula ósea es incapaz de forjar el núcleo hemo de la Hemoglobina, fabricando eritrocitos pálidos y esqueléticos.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Agotamiento de Reservas:** El cuerpo exprime la Ferritina (banco de reserva en hígado) para intentar sostener la producción de sangre hasta que los niveles caen a cero.\\n- **Eritropoyesis Ineficaz:** Sin hierro, los glóbulos rojos que nacen son extremadamente minúsculos (Microcitosis) y despintados (Hipocromía), incapaces de acarrear oxígeno con eficiencia.\\n- **Hipoxia Tisular Universal:** Todos los órganos del cuerpo comienzan a sufrir asfixia celular crónica ante la pobre calidad metabólica de su sangre circulante.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Neurológico:** Cansancio paralizante (Astenia), déficit de atención en niños e irritabilidad cerebral.\\n- **Sistema Cardiovascular:** El corazón acelera su compás perpetuamente (Taquicardia Compensatoria) para forzar que los glóbulos rojos moribundos pasen más rápido, derivando en soplos.\\n- **Tejidos Epiteliales:** Uñas quebradizas en forma de cuchara (Coiloniquia), caída brutal de cabello y lenguas lisas y ardientes (Glositis atrófica).\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Eritropoyetina (EPO):** El riñón, ahogándose por la hipoxia, dispara niveles estratosféricos de EPO hacia la médula ósea rogando por más sangre.\\n- **Transportadores Carentes:** El hígado produce Transferrina masivamente como un esfuerzo inútil para pescar el poco hierro inexistente en el intestino.\\n\\n### Correlación con Comorbilidades\\n- **Hemorragias Ocultas:** Todo sangrado digestivo (úlceras/cáncer) en adultos o menorragia descontrolada en mujeres garantiza esta anemia.\\n- **Parasitosis Intestinal (Uncinariasis):** En áreas endémicas se convierte en una succión crónica del escaso aporte alimentario.",
      "esquemaMental": {
        "inicio": "Baja ingesta de hierro o pérdida crónica (sangrado).",
        "dano": "Agotamiento de depósitos y falla en síntesis de hemoglobina.",
        "consecuencia": "Hipoxia tisular y síntomas de anemia."
      },
      "cita": "Robbins Patología 10ma Ed."
    },
    "manejo": {
      "diagnostico": "Biometría (Hb baja, VCM <80, HCM baja). Ferritina sérica (Gold Standard: <15-30 ng/mL).",
      "tratamiento": "Hierro oral (Sulfato Ferroso). Adultos: 150-200mg hierro elemental/día. Niños: 3-6mg/kg/día. Mantener 3 meses tras normalizar Hb.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Hierro Elemental (Sulfato/Fumarato/Polimaltosado)", "dosis": "Adultos: 100-200 mg / Niños: 3 a 6 mg/kg", "frecuencia": "Diario inter-día, alejado de comidas sólidas.", "observaciones": "La absorción aumenta mucho con el estómago vacío y Vit C. NUNCA darlo con Té, lácteos de vaca ni calcio." },
          { "nombre": "Hierro Parenteral (Sacarato / Carboximaltosa)", "dosis": "Cálculo en base a Déficit de Hierro de Ganzoni", "frecuencia": "En infusión clínica programada intra-hospitalaria por vía periférica.", "observaciones": "Pilar cuando hay intolerancia total gastrointestinal severa, o anemia pernio quirúrgica acelerada." }
        ],
        "medidasGenerales": [
          "Instruir y desmitificar la carne: Promocionar fuertemente morcilla, hígado, sangrecita, y leguminosas.",
          "Combinación ideal sinérgica nutricional: Lentejas + Zumo de Naranja, y NUNCA combinadas con un Té negro digestivo."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Conteo fresco de Reticulocitos a los picos de 7 a 10 días tras inicio del manejo con hierro oral.",
          "Control posterior de la Hemoglobina esperable: Sube alrededor de 1 gramo íntegro cada un mes.",
          "Ferritina libre sérica: Examen más fidedigno en sangre para ver si las bodegas de hueso se recargaron full."
        ],
        "signosAlerta": [
          "Melena constante posterior persistente que agrava o nunca deja al nivel (Señal inequívoca de fuga GI contínua superior).",
          "Desórdenes GI extremos tras la cápsula o alergias fatales tras la hierro-infusión parenteral IV sistémica.",
          "En niños, desarrollo de pica incontrolable extrema."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Primer éxito temporal: El Pico de Reticulocitos positivo.",
          "Ascenso progresable a la Normalidad Hemoglóbica general de la OMS.",
          "Normalización exitosa global y real al cerrar depósitos (Mantener la tableta hasta 3 a 6 meses extra una vez curado laboratorialmente)."
        ],
        "criteriosFracaso": [
          "Incapacidad completa temporal de absorción por una enfermedad celiaca oculta en el infante.",
          "Hemorragia mayormente en mujeres (ginecológica/miomatosis) que devora hierro más rápido que la terapia."
        ]
      },
      "cita": "GPC MSP Ecuador 2016"
    },
    "enfermeria": {
      "nanda": "00093 Fatiga",
      "intervenciones": [
        {
          "accion": "Educación sobre ingesta de hierro con Vitamina C (jugo de naranja).",
          "razon": "El medio ácido favorece la absorción del hierro no hemo."
        },
        {
          "accion": "Advertir sobre efectos secundarios (heces oscuras, estreñimiento).",
          "razon": "Evitar el abandono del tratamiento por confusión con sangrado."
        },
        {
          "accion": "Fomentar consumo de alimentos ricos en hierro hemo (vísceras, carnes rojas).",
          "razon": "El hierro de origen animal tiene mayor biodisponibilidad."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería Comunitaria"
    }
  },
  {
    "id": "sc5",
    "nombre": "Desnutrición Crónica Infantil (DCI)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Talla baja para la edad (Z-score T/E < -2 DE)",
        "Retraso en el desarrollo psicomotor",
        "Infecciones recurrentes",
        "Pelo quebradizo y piel seca"
      ],
      "maniobraExploracion": "Antropometría estricta: Peso, Talla/Longitud, Perímetro cefálico. Uso de curvas de crecimiento de la OMS.",
      "banderasRojas": [
        "Edema (Kwashiorkor)",
        "Emaciación extrema (Marasmo)",
        "Letargia profunda",
        "Hipotermia"
      ],
      "cita": "Norma de Vigilancia Antropométrica MSP Ecuador"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Desnutrición Crónica Infantil (DCI) es la amputación biológica del potencial máximo del ser humano. El evento disparador es una privación energética, proteica y de micronutrientes sostenida durante la ventana de máxima maleabilidad del cuerpo (los primeros 1.000 días de vida), forzando al metabolismo a priorizar la supervivencia pura al detener funciones de crecimiento y desarrollo.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Ahorro Extremo (El Apagón):** El organismo anula rutas metabólicas constructoras frenando en seco la mitosis osteomuscular para mantener el cerebro y corazón latiendo.\\n- **Catabolismo Inversivo:** Para compensar la inanición, el cuerpo deborará sus propias reservas, disolviendo primero grasas (emaciación) y luego el músculo (sarcopenia extrema).\\n- **Parada Epigenética:** Tallas estancadas de por vida, puesto que la maquinaria celular desactiva el eje del crecimiento ante la emergencia alimentaria.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Inmunitario:** Timectomía química y caída masiva de defensas. Cualquier gripe estacional se vuelve una pulmonía fulminante.\\n- **Sistema Neurológico:** Sin grasas y proteínas estructurales (mielina celular), las redes neuronales quedan aisladas pobremente, sentenciando permanentemente el cociente intelectual (Retardo en el neurodesarrollo).\\n- **Sistema Gastrointestinal:** El intestino aplanará sus vellosidades atrofiándose, perdiendo la capacidad absoluta de absorber nutrientes futuros, lo que auto-perpetúa el síndrome (Gastroenteropatía perdedora de proteínas).\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Hormona del Crecimiento (GH):** Irónicamente se encuentra elevadísima, pero su efector final hepatocítico (IGF-1) se paraliza y colapsa (resistencia a la GH). \\n- **Corticoides Tóxicos:** El cortisol basal altísimo por el estrés de inanición debilita inmunidad defensiva y genera desgaste esquelético generalizado.\\n\\n### Correlación con Comorbilidades\\n- **Diarreas Recurrentes:** Las diarreas mecánicas destruyen mecánicamente al intestino, arruinan las ingestas cortas y disparan la DCI.\\n- **Disbiosis y Parásitos:** Un microbioma devastado garantiza un crecimiento estancado e inhibe a las hormonas intestinales absorbtivas.",
      "esquemaMental": {
        "inicio": "Inseguridad alimentaria + Falta de saneamiento + Infecciones.",
        "dano": "Déficit calórico-proteico sostenido y adaptación metabólica.",
        "consecuencia": "Retraso irreversible en crecimiento y desarrollo cognitivo."
      },
      "cita": "Nelson Tratado de Pediatría 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Indicador Talla para la Edad (T/E) por debajo de -2 desviaciones estándar.",
      "tratamiento": "Suplementación con micronutrientes (Chispas), fomento de Lactancia Materna exclusiva (6 meses) y continuada (2 años). Consejería nutricional.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Micronutrientes (Chispas en Polvo Especial)", "dosis": "1 sobre íntegro diario exclusivo en lactantes", "frecuencia": "Por 60 a 90 días (mezclar exacto frío en primera cucharada)", "observaciones": "NUNCA en calientes, destruye labilidad biológica. Altera el color de deposición." },
          { "nombre": "Fórmula Terapéutica General (F-75 y F-100)", "dosis": "Calculada según déficit peso/cal/día", "frecuencia": "Múltiple diario", "observaciones": "Exclusivo de Desnutriciones Agudas Severas. Requiere internación pediátrica." },
          { "nombre": "Mebendazol o Albendazol", "dosis": "Albendazol 200mg (1-2a) o 400mg (>2a)", "frecuencia": "Dosis profilaxis por 1 o 2 ciclos año", "observaciones": "Trata parasitosis co-subyacente." }
        ],
        "medidasGenerales": [
          "Nutrición en los primeros 1,000 días (ventana crítica cerebral base): Fomento riguroso de la LME primeros 6 meses.",
          "Alimentación complementaria altamente calórica e higiénica libre total de azúcares y edulcorantes perversos."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Tablas Antropométricas Z-Score peso para la talla (Desnutrición Aguda/Global) y Talla para la Edad (D. Crónica / Retardo en el crecimiento).",
          "Signos precoces vitales de Síndrome de Realimentación Crítico intra-hospitalaria (Caída mortal de fósforo sérico y potasio).",
          "Desarrollo Psicomotor Escala gruesa (DENVER modificado para lactantes desnutridos apáticos)."
        ],
        "signosAlerta": [
          "Deterioro franco que lo cruce de una desnutrición crónica (Talla Baja a destiempo) a una AGUDA SEVERA clínica (Kwashiorkor agudo edematoso).",
          "Inapetencia/rechazo activo por marasmo apático con hipotermia.",
          "Aparición simultánea y repetitiva de llagas por EDA rotavírica en el niño en vías de superación oral."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Recuperación global de puntos del indicador de z-score (-2 hasta los -1 funcionales) como mínimo.",
          "Cierre cognitivo y afectivo en el retorno lúdico de infante.",
          "Mamá con técnica exitosa total certificada por comité."
        ],
        "criteriosFracaso": [
          "Caída irrecuperable en estatus Crónico o 'Enanismo carencial en Salud' permanente."
        ]
      },
      "cita": "Estrategia Ecuador Crece Sin Desnutrición"
    },
    "enfermeria": {
      "nanda": "00002 Desequilibrio nutricional: inferior a las necesidades corporales",
      "intervenciones": [
        {
          "accion": "Seguimiento nominal del crecimiento y desarrollo.",
          "razon": "Detectar desviaciones tempranas para intervención oportuna."
        },
        {
          "accion": "Demostración de preparación de alimentos locales nutritivos.",
          "razon": "Mejorar la calidad de la dieta con recursos disponibles en territorio."
        },
        {
          "accion": "Vigilancia del esquema de vacunación completo.",
          "razon": "Prevenir infecciones que agraven el estado nutricional."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Atención Integral a la Niñez"
    }
  },
  {
    "id": "sc6",
    "nombre": "Infecciones de Vías Urinarias (IVU)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Droplet",
    "clinica": {
      "signosSintomas": [
        "Disuria (ardor)",
        "Polaquiuria (frecuencia)",
        "Urgencia miccional",
        "Dolor suprapúbico",
        "Orina fétida/turbia"
      ],
      "maniobraExploracion": "Puño percusión lumbar (PPL) para descartar pielonefritis. Palpación de puntos ureterales.",
      "banderasRojas": [
        "Fiebre alta y escalofríos",
        "Dolor lumbar intenso",
        "Vómitos y deshidratación",
        "Sepsis"
      ],
      "cita": "Bates 13ra Ed. / GPC IVU"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Infección de Vías Urinarias (IVU) es la colonización agresiva del tracto excretorio estéril. El evento disparador es el ascenso bacteriano retrógrado (usualmente *E. coli* fecal) a través de la uretra. Las bacterias aprovechan vellosidades adhesivas especiales (pilis P y Tipo 1) para anclarse a la pared de la vejiga humana, evadiendo ser arrastradas por el simple chorro de la orina.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Colonización y Adhesión Úrotelial:** El patógeno usa sus pelos adherentes invasivos (pilis) engañando a la mucosa vesical para no ser enjuagados hacia el exterior.\\n- **Reacción Inflamatoria Local (Cistitis):** La mucosa urinaria, ultra-irritada, genera señales de urgencia que provocan espasmos vesicales desordenados (disuria y polaquiuria).\\n- **Ascenso Silencioso (Pielonefritis):** Si vencen la válvula musculovesical, los gérmenes ascienden reptando por los uréteres y detonan una infección masiva al tejido filtrador profundo de los riñones.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Tracto Urinario Inferior:** Vejiga engrosada, sumamente irritable y sangrante en sus paredes mucosas internas (Hematuria).\\n- **Parénquima Renal (Pielonefritis):** Si la infección se asienta en el riñón, causa abscesos microcefálicos supurativos y daño inflamatorio que resulta en fiebre alta y temblores escalofriantes violentos.\\n- **Sistema Sanguíneo Comunitario:** Las bacteriemias de origen urinario (Urosepsis) conforman una de las causas extra-respiratorias más fulminantes de muerte por shock séptico.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Nitritos y Estereasa Leucocitaria:** La enzima bacteriana tritura los nitratos dietarios en la orina generando Nitritos radiantes como biomarcadores letales; la leucocitosis local expulsa el pus blanquecino en orinas densas (Piuria).\\n\\n### Correlación con Comorbilidades\\n- **Diabetes Mellitus Mal Controlada:** La orina endulzada por la glucosa es literalmente abono orgánico extra para la explosión bacteriana.\\n- **Hiperplasia Prostática e Incontinencia:** Los retenciones de orinas estancadas (globo vesical en hombres y mujeres en cama) garantizan una invasión por falta de recambio líquido.",
      "esquemaMental": {
        "inicio": "Ascenso de bacterias desde el periné a la uretra.",
        "dano": "Adhesión bacteriana e inflamación de la mucosa vesical.",
        "consecuencia": "Cistitis o progresión a Pielonefritis si no se trata."
      },
      "cita": "Harrison 21ra Ed."
    },
    "manejo": {
      "diagnostico": "EMO (Nitritos +, Esterasa leucocitaria +, Bacteriuria). Urocultivo (Gold Standard: >100,000 UFC/ml).",
      "tratamiento": "Cistitis no complicada: Nitrofurantoína 100mg c/12h por 5 días o Fosfomicina 3g dosis única.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Fosfomicina Trometamol", "dosis": "3 Gramos exactos como un sachet", "frecuencia": "Dosis única stat", "observaciones": "El gold standard de cistitis en embarazo actual y la general, tomar lejos absoluto de comidas antes y vaciando el meato." },
          { "nombre": "Nitrofurantoína (Macrocristales)", "dosis": "100 mg clínicos regulares", "frecuencia": "VO cada 12 hrs completando 5 días puros", "observaciones": "No penetra buen tejido intersticial de riñón, INÚTIL e insegura en Pielonefritis Altas y FG <30." },
          { "nombre": "Cefalexina o  Cefuroxima", "dosis": "500 mg usuales", "frecuencia": "VO c/ 12 horas por 7 días embarazo", "observaciones": "Alternativas beta-lactámicas seguras globales." }
        ],
        "medidasGenerales": [
          "No re-testear EMO asintomático. La bacteriuria puramente asintomática NO se prescribe tratamiento global a no ser en pacientes en curso de embarazo o inminente cirugía prostática.",
          "Alta hidratación acuosa para forzar barrido meatal fisiológico y micciones recurrentes."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Remisión clínica final de la disuria baja al tercer día en 90%, no requiere test of cure laboratorial global si se es sano.",
          "Signos de evolución general a Pielonefritis superior (Punopuño percusión posterior dolorosa)."
        ],
        "signosAlerta": [
          "Picos febriles francos con náusea o hipotensión de choque en cistitis (Señal de ascenso bacteriano o Urosepsis en seniles).",
          "No mejor clínico a las 72h con Nitrofurantoína u otros (Hacer rápido un Antibiograma de emergencia)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Claridad clínica de orina lograda de 3-5 días y cese absoluto del pujo/tenesmo uretral."
        ],
        "criteriosFracaso": [
          "Frente a fracaso y urocultivo E. coli BLEE positiva, requiere salto a tratamiento parenteral a nivel de sala con carbapenemas."
        ]
      },
      "cita": "GPC MSP Ecuador IVU 2019"
    },
    "enfermeria": {
      "nanda": "00016 Deterioro de la eliminación urinaria",
      "intervenciones": [
        {
          "accion": "Fomentar la ingesta hídrica abundante.",
          "razon": "Favorece el barrido mecánico de las bacterias."
        },
        {
          "accion": "Educación sobre higiene perineal (limpieza de adelante hacia atrás).",
          "razon": "Evitar la translocación de bacterias fecales a la uretra."
        },
        {
          "accion": "Vigilancia de la adherencia al antibiótico.",
          "razon": "Prevenir recurrencias y resistencia bacteriana."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería"
    }
  },
  {
    "id": "sc7",
    "nombre": "Faringoamigdalitis Bacteriana",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Odinofagia súbita",
        "Fiebre >38°C",
        "Exudado amigdalino blanquecino",
        "Adenopatías cervicales dolorosas",
        "Ausencia de tos"
      ],
      "maniobraExploracion": "Inspección de orofaringe: Amígdalas hipertróficas, eritematosas y con placas. Palpación de ganglios submandibulares.",
      "banderasRojas": [
        "Sialorrea (incapacidad de tragar saliva)",
        "Estridor laríngeo",
        "Trismus",
        "Desviación de la úvula (Absceso)"
      ],
      "cita": "Criterios de Centor / McIsaac"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Faringoamigdalitis Bacteriana es una tormenta purulenta amigdalina. El evento disparador es la adherencia violenta y multiplicación del *Streptococcus pyogenes* (SBHGA) a las criptas del tejido linfoide faríngeo posterior. El microbio ataca utilizando enzimas súper-agresivas evadiendo destructivamente las barreras naturales del anillo amigdalino local.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Adherencia de Proteína M:** La bacteria utiliza una cápsula inhibidora (La proteína M) que impide cínicamente que los glóbulos blancos fagociten al patógeno invasor.\\n- **Destrucción Local:** Exotoxinas líticas disuelven eritrocitos y tejido blando, generando hiperemia y el exudado blanquecino putrefacto del pus (placas amigdalinas).\\n- **El Fenómeno Inmunonegligente:** Un fallo posterior por el cual los anticuerpos humanos que batallan al estreptococo, se confunden temporal y peligrosamente al cruzarse con tejidos estructurales del propio cuerpo humano por parecido genético.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Aparato Respiratorio Superior:** Inflamación dolorosa colosal de toda la faringe, ganglios linfa-cervicales reactivos gigantes y dolor ardiente agudo al deglutir boca.\\n- **Corazón y Articulaciones (Fiebre Reumática):** Las válvulas mitrales y tejido articular sufren agresiones severas del cruce anticuerpo de post-infección si la flora invasora no se extingue prematuramente con penicilina.\\n- **Aparato Renal:** Glomerulonefritis aguda mortal postestreptocócica mediante complejos inmunes aglutinados que tapan el flujo de sangre.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Toxinas Pirogénicas (Escarlatina):** La sangre transporta eritrotoxinas que obligan a liberar pirógenos desatando cuadros térmicos súbitos altos indomables, acompañados simultáneamente de descamación abrasiva (sarpullido de fresa roja) de todo el torso cutáneo.\\n\\n### Correlación con Comorbilidades\\n- **Asinamiento Infanto-Juvenil (Salud Comunitaria):** Su rápida explosión depende estrictamente del microambiente húmedo y hacinado del salón de clases.",
      "esquemaMental": {
        "inicio": "Transmisión por gotas y colonización faríngea.",
        "dano": "Invasión tisular y formación de exudado purulento.",
        "consecuencia": "Resolución o complicaciones (Absceso, Fiebre Reumática)."
      },
      "cita": "Nelson Pediatría 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Clínico mediante Criterios de Centor (≥3 puntos sugieren etiología bacteriana). Test rápido de antígeno o Cultivo faríngeo.",
      "tratamiento": "Penicilina V potásica o Amoxicilina por 10 días. Penicilina Benzatínica 1.2M UI dosis única IM.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Amoxicilina (Pilar General de 1ra)", "dosis": "500 mg VO adulto / Niños: 50 mg/kg/día", "frecuencia": "Cada 12 u 8 horas, 10 días inexcusables", "observaciones": "Cumplir los 10 días previene la Enfermedad Reumática general. No es útil acortar terapias por 'sentirse bien'." },
          { "nombre": "Penicilina Benzatinica G", "dosis": "1,200,000 UI en adulto o en paciente pesado de más > 27 kilos", "frecuencia": "Dosis única dolorosa Intramuscular Fuerte", "observaciones": "Aplicar de fondo en región glútea profunda superior externa. Mantener carro de parada en box para manejo de anafilaxia." },
          { "nombre": "Azitromicina o Claritromicina", "dosis": "Dosis inicial 500mg (Azi)", "frecuencia": "Diario por total de 3 o 5 días", "observaciones": "Para perfil de severa alergia confirmada y grave (anafiláctica pura) a la Penicilina en la familia." }
        ],
        "medidasGenerales": [
          "Lavado activo y cambio total de los propios cepillos en zona de dientes en casas superando las primeras 24-48hrs.",
          "Analgesia local (AINE y/o Ibuprofeno para dolor disfágico, si es grave)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Escala de puntuación CENTOR de base Modificada de pre-probabilidad (Fiebre pre 38°C, Sin Tos, Adenopatías palpadas cervicales y Exudado purulento tonsilar grueso).",
          "Evolución correcta pre 48 hrs y mejora deglutible en la familia."
        ],
        "signosAlerta": [
          "Desviación masiva uvular lateralizada y trismus crudo (No se puede abrir bien la boca). SOSPECHAR ABSCESO PERIAMIGDALINO inminente (Requiere emergencia).",
          "Persistencia y diseminación de parches con seudomembranas (Sospechoso Mononucleosis subyacente asociada o Difteria en crudo si es del esquema)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Desaparición precoz de dolor total global post día 3 o día 4 de iniciada beta-lactámica pura de espectro corto."
        ],
        "criteriosFracaso": [
          "Incidencia post 3 semanas re-estreptocócica purulenta grave a nivel basal crónico y fiebre re-mática general y daño endocaritíco valvular."
        ]
      },
      "cita": "GPC MSP Ecuador"
    },
    "enfermeria": {
      "nanda": "00132 Dolor agudo",
      "intervenciones": [
        {
          "accion": "Fomentar gárgaras con agua tibia salada.",
          "razon": "Alivio sintomático local por efecto osmótico."
        },
        {
          "accion": "Educación sobre no suspender el antibiótico.",
          "razon": "Completar los 10 días es vital para prevenir la Fiebre Reumática."
        },
        {
          "accion": "Control de la temperatura.",
          "razon": "Manejo de la fiebre y prevención de deshidratación."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería Pediátrica"
    }
  },
  {
    "id": "sc8",
    "nombre": "Dengue (Sin signos de alarma)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Fiebre alta súbita",
        "Dolor retroocular",
        "Mialgias y artralgias intensas (fiebre quebrantahuesos)",
        "Exantema maculopapular",
        "Leucopenia"
      ],
      "maniobraExploracion": "Prueba del torniquete: Insuflar manguito entre sistólica y diastólica por 5 min. Positiva si >20 petequias en 2.5cm².",
      "banderasRojas": [
        "Dolor abdominal intenso y continuo",
        "Vómitos persistentes",
        "Sangrado de mucosas",
        "Letargia o irritabilidad",
        "Hepatomegalia >2cm"
      ],
      "cita": "Guía OPS/OMS Dengue 2022"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nEl Dengue es un fuego ardiente multiorgánico fulminante viral. El evento disparador es la inyección inoculadora del Flavivirus a través de la trompa del zancudo *Aedes aegypti* a nivel capilar dérmico. Los viriones son fagocitados engañosamente veloz por las dendritas macrófagas quienes intentan consumirlos para perecer multiplicándolos en la sangre.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Asalto Dendrítico (Tropismo Inmunológico):** El virus usa como base replicadora la médula ósea y el hígado, derramando viriones al torrente sanguíneo con avidez destructiva.\\n- **Lisis Celular Sistémica:** Destrucción en masa inducida viral de las plaquetas activadas (Disminuyendo exponencialmente contajes en hemograma).\\n- **Fuga Capilar Endotelial (El Gran Fuego):** Es el pilar fisiopatológico grave. La explosión de citocinas inflama de tal manera los capilares que se hacen permeables abriendo compuertas para que el líquido sanguíneo se evapore silenciosamente fuera del torrente hacia los tejidos (Ascitis, derrames).\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Hematopoyético:** Plaquetopenia fulminante asintomática con predisposición instantánea a un sangrado masivo inintencionable general.\\n- **Aparato Cardio-Vascular:** Hipovolemia de fondo grave con riesgo al 'Shock del Dengue' que devasta niños mediante una caída precipitada de la tensión circulatoria perdiendo sangre y agua combinadas.\\n- **El Hígado:** Destrucción y hepatitis viral anexa constante de tipo necrotizante.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Hemoconcentración Silente:** El hematocrito se eleva vertiginosamente engañoso. El plasma se pierde, por lo que las células rojas que quedan parecen más concentradas advirtiendo un shock hemorrágico letal.\\n- **Citocinas Trombocitopénicas (IL-8):** Actúan paralizando temporal y brutalmente la salida de plaquetas funcionales medulares.\\n\\n### Correlación con Comorbilidades\\n- **Infecciones Previas Cruzadas:** Contraer un serotipo por segunda oportunidad mediante el anticuerpo no-neutralizador previo precipita la tormenta fatal capilar masiva (Dengue Grave/Hemorrágico).",
      "esquemaMental": {
        "inicio": "Picadura de mosquito e inoculación viral.",
        "dano": "Viremia y tormenta de citocinas proinflamatorias.",
        "consecuencia": "Extravasación de plasma (en formas graves) y trombocitopenia."
      },
      "cita": "Harrison 21ra Ed."
    },
    "manejo": {
      "diagnostico": "NS1 (primeros 5 días), IgM/IgG (después del 5to día). Hemograma: Vigilancia de Hematocrito (hemoconcentración) y Plaquetas.",
      "tratamiento": "Reposo, hidratación oral abundante (SRO). Paracetamol (Máx 4g/día). PROHIBIDO: AINEs, Aspirina, Inyecciones IM.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Paracetamol (Analgésico/Antipirético)", "dosis": "500 a 1000 mg", "frecuencia": "VO cada 6 a 8 horas clínico si dolor/fiebre lo amerita", "observaciones": "No sobrepasar en dengue límite tóxico 4g día, hígado ya sobrecargado. PROHIBICIÓN GRAVE ABSOLUTA DE IBUPROFENO/ASPIRINAS POR MUERTE HEMORRÁGICA." },
          { "nombre": "Fluidoterapia Pura Hospitalaria (Si en grupo crítico de B y C sin VO)", "dosis": "Cloruro o Lactato a dosis 5–7 mL/kg/hora", "frecuencia": "Titulación cada dos horas y observar clínica", "observaciones": "Respuesta controlada para no encharcar el pulmón total en las reabsorciones basales." },
          { "nombre": "Sales de Rehidratación Oral", "dosis": "Titulado a volumen general de pérdida y tolerancia", "frecuencia": "Libre demanda", "observaciones": "La vía oral es la Reina total del dengue seguro del Grupo A." }
        ],
        "medidasGenerales": [
          "Protección absoluta mosquitera: El paciente con dengue activo en 5 días requiere estar tapado por tul con toldo estricto para no enfermar y vectorizar por picadura a su familia o barriada.",
          "No inyecciones intramusculares absolutistas en todos los días base general (Prevención de hematomas catastróficos)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Hematocrito diario en biometría o capilar a microhematocritos (Subida de un 20% basal marca pase a fuga extrema).",
          "Conteo de descenso trombótico plaquetario crudo al día.",
          "PAM basal y presión de pulso de cierre de acortamiento puro basal diurno."
        ],
        "signosAlerta": [
          "1. Dolor local abdominal severo y sostenido. 2. Sangrado activo mucoso (Nariz encías abundantes).",
          "3. Hepatoesplenomegalia clínica. 4. Ascitis libre visible crónicamente global u otro derrame periférico.",
          "5. Vomitos continuos e intolerancia cruda global pre oral que marcan Grupo B con Signos alerta rojos totales de Choque en horas pre."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Retorno a normal en las cifras trombos crudas plaquetares y caída de base estable de la hemoconcentración por hidratación.",
          "Dengue curado pre los catorce o veinte días y fase global de prurito palmar transitoria superada de éxito."
        ],
        "criteriosFracaso": [
          "Entrada a la fase global roja mortal de Dengue Grave con Daño general sistémico y SDRA respiratorio orgánico a UCI o muerte."
        ]
      },
      "cita": "Guía de Manejo Dengue MSP Ecuador 2023",
      "criterioReferencia": "Presencia de signos de alarma, intolerancia oral, comorbilidades (embarazo, extremos de la vida)."
    },
    "definicionCaso": "Paciente con fiebre de menos de 7 días, sin afección de vías aéreas superiores y con dos o más de los siguientes: cefalea, dolor retroocular, mialgias, artralgias, erupción cutánea.",
    "sintomasClave": [
      "Fiebre alta",
      "Dolor retroocular",
      "Exantema"
    ],
    "enfermeria": {
      "nanda": "00007 Hipertermia",
      "intervenciones": [
        {
          "accion": "Uso de medios físicos para la fiebre.",
          "razon": "Reducir la temperatura sin exceder dosis de paracetamol."
        },
        {
          "accion": "Educación sobre signos de alarma (vigilancia en casa).",
          "razon": "Detección inmediata de la fase crítica (extravasación de plasma)."
        },
        {
          "accion": "Eliminación de criaderos de mosquitos en el hogar.",
          "razon": "Control vectorial para prevenir nuevos casos."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería en Enfermedades Transmisibles"
    }
  },
  {
    "id": "sc9",
    "nombre": "Parasitosis Intestinal",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Dolor abdominal difuso",
        "Meteorismo (gases)",
        "Diarrea o estreñimiento",
        "Prurito anal (Oxiuros)",
        "Expulsión de parásitos"
      ],
      "maniobraExploracion": "Palpación abdominal: Sensibilidad difusa. Inspección perianal (test de Graham para Oxiuros).",
      "banderasRojas": [
        "Obstrucción intestinal (Ascaris)",
        "Anemia severa (Uncinarias)",
        "Prolapso rectal (Tricocéfalos)",
        "Convulsiones (Cisticercosis)"
      ],
      "cita": "Bates 13ra Ed."
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Parasitosis Intestinal o Helmintiasis representa un secuestro malicioso de la absorción local nutricional. El evento disparador ocurre por la ingesta accidental o invasión percutánea de huevecillos y larvas provenientes de heces infectadas o agua no salubre, germinando parasitológicamente dentro de los estratos vellosos humanos del tracto gástrico.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Fijación Intestinal Perforante:** Patógenos como Ancylostoma y Necator se muerden mecánicamente con placas cortantes dentadas directamente a la mucosa sangrante del intestino ciego.\\n- **Bloqueo Secuestrativo:** Gusanos enormes como Ascaris roban masivamente metabolitos flotantes de azúcar y vitaminas (especialmente vitaminas de complejo orgánico).\\n- **Micro-Descamación Sangrante:** Su actividad motriz disuelve la capa inflamatoria creando una enteropatía exudativa silente con micro-sangrado perpetuo anémico.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Sistema Gastrointestinal:** Irritabilidad severa cólica constante, diarreas mucopurulentas sin explicación asintomáticas (Amebiasis y Giardia).\\n- **Pulmones Eosinofílicos:** El Síndrome de Löffler, donde gusanos jóvenes al nacer deciden surcar las venas cavitarias hasta las ramas alveolares estallando inflamación de tos y ahogos simulando asma falso.\\n- **Vías Biliares y Páncreas:** Oclusión catastrófica directa e impactante (taponamiento biliar) propiciando pancreatitis aguda biliar vermífuga.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Tormenta Eosinofílica (Inmunidad Parásito):** La médula ósea secreta legiones de glóbulos Eosinófilos encargados de derramar químicos tóxicos neuro-musculares a los parásitos, que a menudo causan picor prurito general indeseado.\\n- **Caída de Ferritina Universal:** Hemorragia incesante anémica que debilita el núcleo celular entero.\\n\\n### Correlación con Comorbilidades\\n- **Desnutrición Infantil Estancada:** Son los autores criminales mundiales silencios del frenado mental y del crecimiento fisiológico de todas las comunidades periféricas tercer-mundistas.",
      "esquemaMental": {
        "inicio": "Ingesta de agua/alimentos contaminados con quistes/huevos.",
        "dano": "Colonización intestinal y competencia por nutrientes.",
        "consecuencia": "Malabsorción, anemia y retraso en el crecimiento."
      },
      "cita": "Robbins Patología 10ma Ed."
    },
    "manejo": {
      "diagnostico": "Coproparasitario seriado (3 muestras). Test de Graham.",
      "tratamiento": "Para Giardiasis: Metronidazol 250-500mg VO c/8h por 5 a 7 días. Para Amebiasis intestinal: Metronidazol 500-750mg VO c/8h por 7 a 10 días. Para Helmintos: Albendazol 400mg dosis única.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Metronidazol", "dosis": "Ameba: 500-750mg / Giardia: 250-500mg", "frecuencia": "VO cada 8h (Días según tipo, 5 a 10)", "observaciones": "Efecto Antabus general grave (Alergia y vómito puro por consumo mínimo concomitante craso y vitalicio de alcohol en el periodo de 72 pre y post toma tab)." },
          { "nombre": "Albendazol (Profilaxis anual y Curativo simple)", "dosis": "400 mg tab simple (Adultos y Niños sup 2a)", "frecuencia": "Dosis única global para Helmintos regulares", "observaciones": "Si hay sospecha ascaridea pre invasiva aguda masiva global dar por 3 crudos días general." },
          { "nombre": "Pamoato de Pirantel y Oxantel", "dosis": "10 - 20 mg/kg de base clínica simple y mixta en parásitos generales.", "frecuencia": "Oral dosis estricta pura según parasito crudo y Oxiuriasis general anal con repetición al 15avo día general subyacente absoluto en la familia del nido y fómites de cama sábanas e inodoros.", "observaciones": "Se debe advertir a los padres que las heces pueden teñirse crasamente de un color muy rojo fuerte/naranja crudo engañando visual como falsa melena basal o hematemesis baja general pediátrica pura por tintes de excipientes crudos pre metabólicos basales." }
        ],
        "medidasGenerales": [
          "Oxiuros de rascado global pélvico: Exige planchado exhaustivo de las sabanas de los niños diario y cortado profiláctico clínico puro de sus uñas de mano crudo contra contagios orofecales e ingesta del mismo huevo vivo.",
          "Hervir activamente todo líquido hídrico de comunidad profunda no procesada u ozonizada pre ingestas orales."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Coproparasitario de control programado negativo y erradicado clínico superada las tres y cinco semanas post dosis base del primer anti-parasitario crudo.",
          "Restauración total visible de los niveles séricos orgánicos en hierro si cursaba anemia secundaria fuerte (ejm general en cuadros de Uncinarias profundas)."
        ],
        "signosAlerta": [
          "Expulsión basal pulmonar y sintomática respiratoria pura por tos larvacea general de Síndrome global Löffler (Asma + Eosinofilia clínica y de parásitos base).",
          "Abdomen muy muy globoso teso con constipación y vomito fecaloideo masivo (Obstrucción cruda quirúrgica real ascaroidea por ovillos en ileon clínico local puramente general agudo pediátrico de nivel operatorio de urgencia)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Clínica sin cuadro pre diarreicos acuosos (si era giardiasica estricta general base).",
          "Recuperación crasamente general en el peso clínico puro general pre pediátrica cruda de desnutridos."
        ],
        "criteriosFracaso": [
          "No curación masiva o diseminación severa base cerebral de tenias cisticerco crónico (Ojo si era focalizada pura motora base pre y focalidad post postura general asintomático inicial).",
          "Perforaciones generales de abscesos amebianos rotos mortales hepático-peritoneal abdominal."
        ]
      },
      "cita": "GPC MSP Ecuador"
    },
    "enfermeria": {
      "nanda": "00013 Diarrea",
      "intervenciones": [
        {
          "accion": "Educación sobre lavado de manos y manejo de excretas.",
          "razon": "Cortar el ciclo de transmisión fecal-oral."
        },
        {
          "accion": "Hervido del agua de consumo.",
          "razon": "Eliminar quistes y huevos resistentes al cloro."
        },
        {
          "accion": "Tratamiento a todo el núcleo familiar.",
          "razon": "Evitar la reinfección constante entre convivientes."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería Comunitaria"
    }
  },
  {
    "id": "sc10",
    "nombre": "Escabiosis (Sarna)",
    "servicio": "Salud Comunitaria",
    "color": "#E3F2FD",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Prurito intenso de predominio nocturno",
        "Surcos acarinos (líneas grisáceas)",
        "Pápulas y vesículas",
        "Localización: espacios interdigitales, muñecas, axilas, genitales"
      ],
      "maniobraExploracion": "Inspección con lupa de los surcos. Signo de la \"delta\" (visualización del ácaro).",
      "banderasRojas": [
        "Sobreinfección bacteriana (Impetiginización)",
        "Sarna noruega (costrosa en inmunodeprimidos)",
        "Fiebre (sugiere celulitis secundaria)"
      ],
      "cita": "Fitzpatrick Dermatología"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Escabiosis (Sarna humana) es una invasión parasitaria epitelial túnel-infecciosa profunda. El evento disparador es el contacto prolongado y directo del arácnido microscópico letal patógeno *Sarcoptes scabiei*, cuya hembra preñada utiliza excreciones mandibulares y garras para derretir la queratina cavando verdaderos túneles bajo el tejido blando cutáneo humano para ocultar e incubar sus nuevos embriones vitales.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Túnel y Oviposición:** La hembra ácaro viaja silenciosamente debajo del estrato córneo de la piel, desovando material vivo diariamente empujado hacia atrás en una larga galería.\\n- **Hipersensibilidad de Contacto Extremo:** El sistema defensivo local nota el excremento parasitario forastero, reaccionando explosiva a ello con liberación de histamina de células capilares masivas alergénicas.\\n- **Inflamación Neuronal Pruriginosa:** Prurito intenso letal, de predominio absoluto horario nocturno, en extremidades interdigitales y pliegues.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Barrera Dérmica Primaria:** Aparecen líneas patognomónicas rojas excavadoras en las manos de base blanquecina con formación brutal de vesículas secundarias impetiginizadas rascadas superficiales dolorosas.\\n- **Piel Secundaria Complicada (Sistema de Co-Infección):** Las úlceras rascadas sangrantes de uñas contaminadas provocan la siembra paralela secundaria letal rápida de infección celular difusa masiva y celulitis purulenta estafilocócica perdiendo la barrera natural externa contra infecciones.\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Derrame IgE Inflamatorio Abrasivo:** Formación sistémica humoral hiperinmune destructiva con linfocitos y mastocitos exacerbados intentando quemar el arácnido de manera ciega resultando en erupciones atópicas lejanas al insecto matriz principal generalizados.\\n\\n### Correlación con Comorbilidades\\n- **Paciente VIH Inmunodeficiente:** Produce una monstruosa reacción atípica hiperqueratósica conocida como 'Sarna Costrosa' al poseer imposibilidad de contener la cría parasitaria general de millón ácaros expandibles diseminada.",
      "esquemaMental": {
        "inicio": "Contacto directo piel con piel con persona infestada.",
        "dano": "Excavación de túneles y respuesta inmunológica alérgica.",
        "consecuencia": "Lesiones por rascado y riesgo de piodermitis."
      },
      "cita": "Harrison 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Clínico por patrón de lesiones y prurito nocturno. Raspado de piel (ácaro al microscopio).",
      "tratamiento": "Permetrina 5% crema (aplicar de cuello a pies, dejar 8-12h y lavar). Repetir en 7 días. Ivermectina oral 200ug/kg.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Permetrina tópica en Crema de amplio uso al 5%", "dosis": "Una buena capa que se visualice fina global pre dermatología completa.", "frecuencia": "Solo de noche por único día total y lavarla muy bien al primer rayo de sol clínico general base en mañana para retirarla. Segunda etapa y única globalmente a los puros y estrictos pre-7 días del calendario.", "observaciones": "El paciente SIEMPRE se rascará y generalizará más piquiña post-primera noche y primera crema y es la reaccion puramente normal alérgica a los ácaros fallecidos internos generales sub-piel de sarcoptes y sus sub-heces crudas alérgicas." },
          { "nombre": "Ivermectina Oral estricta pura micro", "dosis": "200 microgramos/kg (Ug/kg) de dosis basal estricta general pre gota clínica.", "frecuencia": "Dosis inicial para adulto / niños + 15 kg general basal con resfuerzo ideal a los estrictos 14 post-días.", "observaciones": "Para casos noruegos fuertes institucionales epidémicos o muy complicados de erradicaciones cremosas." },
          { "nombre": "Detecciones de Antihistamínicos 2da G base y Corticoides local", "dosis": "Betametasona clínica cremar si y solo si prurito residual es invivible, y Certirizina 10 mg oral de noche.", "frecuencia": "Hasta resolución base del prurito general residual de días pre general base sub.", "observaciones": "Evita sobre infeccion crasa puramente general piodérmica por el grataje de uñas sucias." }
        ],
        "medidasGenerales": [
          "TRATAR innegociable a toditito el grupo hogar conviviendo estricta casa aunque estén o se juren puros y sin los clásicos síntomas actuales pre (Efecto ping pong estricto si no es unísono preventivo base familiar).",
          "Al siguiente día inicial base lavado profiláctico rudo general a unos 60ºC caldosos con bolsa del hogar craso de la ropa pura cama local pre general usada."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Evolución estricta clínica general puramente base surco pre acariana en espacios crudos sub-interdigital puro axilar inguinal y pre cinturones y pezones."
        ],
        "signosAlerta": [
          "Infección cruzada cruda general base super bacteriana (Impetiginización real visible con base purulenta o estreptococo basal que cause global post-glomerulo general a largo y fallo craso puramente de orinas locales puras nefrológicas masivas crudas)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Cese crudo fundamental clínico puro nocturno de exacerbación del rasquiñado base general sub en menos d 2 o 3 pre semanas sanas."
        ],
        "criteriosFracaso": [
          "Evolución epidémica a gran Asilo pre o global sarna costrosa de altísimo rango craso contagiante basal inmune de general local."
        ]
      },
      "cita": "GPC MSP Ecuador"
    },
    "enfermeria": {
      "nanda": "00046 Deterioro de la integridad cutánea",
      "intervenciones": [
        {
          "accion": "Educación sobre lavado de ropa y sábanas con agua caliente.",
          "razon": "Eliminar ácaros presentes en fómites."
        },
        {
          "accion": "Tratamiento simultáneo de todos los contactos estrechos.",
          "razon": "Prevenir el efecto \"ping-pong\" de reinfestación."
        },
        {
          "accion": "Mantener uñas cortas y limpias.",
          "razon": "Reducir el daño por rascado y el riesgo de sobreinfección."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual de Enfermería"
    }
  },
  {
    "id": "vig1",
    "nombre": "Sarampión / Rubeola",
    "servicio": "Salud Comunitaria",
    "color": "#FFEB3B",
    "icon": "AlertTriangle",
    "clinica": {
      "signosSintomas": [
        "Fiebre alta",
        "Tos",
        "Coriza",
        "Conjuntivitis",
        "Manchas de Koplik",
        "Exantema maculopapular descendente"
      ],
      "maniobraExploracion": "Inspección de mucosa yugal (Koplik). Evaluación de ganglios retroauriculares y cervicales.",
      "banderasRojas": [
        "Dificultad respiratoria (Neumonía)",
        "Alteración del estado de conciencia (Encefalitis)",
        "Diarrea severa"
      ],
      "cita": "Protocolo Vigilancia MSP"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nEl Sarampión es la enfermedad vírica más dramáticamente contagiable, agresiva respiratoria infantil de tipo aéreo exantemático de la medicina moderna. El evento disparador es el asalto microscópico volador del *Morbillivirus* directamente en células defensivas bronquiales faríngeas. Usa la proteína Hemaglutinina mortal enganchándose veloz al receptor universal CD46 atacando linfocitos.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Contagio T-Macrófago:** Los macrófagos y células linfocíticas en lugar de asesinar al intruso, sufren parasitismo al transportarlo y multiplicarlo para esparcirlo hacia nodos gástricos y hematológicos.\\n- **Tormenta Replicacional Viremia-Multiórgano:** Diseminación colosal, de tejido a tejido afectando piel, pulmones y paredes digestivas epiteliales.\\n- **Ataque Exantémico Destructivo Macular:** La reacción de la piel eruptiva maculopapulosa manchada es técnicamente el esfuerzo en furia destructora inmune del mismo cuerpo de aplastar al virus al rojo vivo en los vasos de la cara superior fluyendo al cuerpo hacia los talones.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Órganos Vaso-Epiteliales (Córnea, Mucosa):** Invasión agresiva conjuntival quemante fotofóbico doloroso incesante ocular y manchas faríngeas patognomónicas (Signo de Koplik) pre-eruptivas sangrantes y dolorosas.\\n- **Tormenta Parenquimatosa Pulmonar Lisis:** Inflamación pulmonar aguda letal provocando una neumonía fatal y fallo del oxígeno directo vírico por macrófagos gigantes bloqueadores de aire terminal.\\n- **Complicador Neuronal Cerebral:** Encefalitis grave inflamatoria supurada en la niñez aguda (letal al cerebro).\\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Amnesia Inmunológica Brutal Paralizante:** Uno de los efectos asesinos biológicos silenciados letales: Ataca la médula ósea y extermina sistemáticamente a todas las células T memoria creadas previamente, devolviendo el cronometro inmunitario del recién nacido literalmente 'al nivel cero' siendo susceptible a infecciones mínimas por seis meses perpetuos subsiguientes.\\n\\n### Correlación con Comorbilidades\\n- **Niños y Desnutrición Vitaminica (Vit A):** Devasta los recursos limitados de querato-regeneración de la desnutrición desatando un agravio con destrucción de la córnea blanda final resultando una de las más grandes causas de ceguera infante evitable.",
      "esquemaMental": {
        "inicio": "Transmisión por gotas respiratorias.",
        "dano": "Viremia y respuesta inflamatoria sistémica.",
        "consecuencia": "Inmunosupresión transitoria y riesgo de complicaciones graves."
      },
      "cita": "Harrison 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Notificación inmediata (EPI-1). Toma de muestra de suero (IgM) e hisopado nasofaríngeo.",
      "tratamiento": "Sintomático. Vitamina A (2 dosis). Aislamiento respiratorio.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Paracetamol Clínico/Físico general fiebre base pura.", "dosis": "10-15 mg/kg dosis pediatría general puro fiebre pura.", "frecuencia": "Cuantas vez cada base profilaxia de fiebre de 6 a 8 hrs puro basal pre malestar en general agudo.", "observaciones": "Control hiper térmico por altísimos niveles mortales de las temperaturas globales pre crudas exantemas." },
          { "nombre": "Gotas Orogástricas Altas Perfil Dosis Cruda VITAMINA A clínica mundial profilaxis", "dosis": "Lactantes base general 50k a 200k UI altas UI crudas base de su edad estricta pediátrica global y de manual.", "frecuencia": "En primer inicial momento del dx agudo pre general confirmatorio base y en el puro día estricto segundo del mañana de post control inicial masivo general profilaxia OMS.", "observaciones": "Evitar pre complicaciones catastróficas puro oftalmólogas y reduce muerte real mundial del malnutrido." }
        ],
        "medidasGenerales": [
          "AISLAMIENTO aéreo estricto general del cuarto si hay pre hermanitos general basales sub expuestos (usar profilaxis de pre SPR al contacto si califica menor temporal a pre 72 hrs estrictas vacunables puramente crasas).",
          "Evidente control base del MSP, Ficha epi base general y bloqueo rápido cerco de los 5kms pre pura cuadra focal estricta."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Trabajo respiratorio (OIR PUMONES EN BUSCA EVIDENCIA PRE NEUMONIA VIRICA FATAL secundaria y control letal de las complicaciones auditivas basales - Otis Media general profilaxis puramente pre base médica pura).",
          "Observación del borrado global crudo en sentido idéntico a aparición céfalo base crasa puro caudal post días maculares crudos pre general base."
        ],
        "signosAlerta": [
          "Convulsiones y deterioro basal y mental (Raro pero fatídico crudo y general pre encefalitis base global saram pionica de secuela neurológica pura general pan-esclerosante de pre base lenta letal agudo general crudo o sub-largo plazo pan)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Supervivencia pura y general caída sin focos ni fiebres pre sin pre y signos secundarios base post superado su rash macular liso de fase de y puro general descamactivo furfuráceo estricto global base de alta sin secuelas crudo de crines y puramente respiratorias o cegueras visuales base de carencia vitamina pura A alta Dosis."
        ],
        "criteriosFracaso": [
          "Muerte del crudo de infante base pura o secuelas generales ceguera base crudas sorderas neurológicas."
        ]
      },
      "cita": "Manual de Vigilancia Epidemiológica Ecuador"
    },
    "enfermeria": {
      "nanda": "00007 Hipertermia",
      "intervenciones": [
        {
          "accion": "Notificación obligatoria en menos de 24 horas.",
          "razon": "Activar el cerco epidemiológico y búsqueda activa de casos."
        },
        {
          "accion": "Administración de Vitamina A según edad.",
          "razon": "Reducir la mortalidad y complicaciones oculares/respiratorias."
        },
        {
          "accion": "Aislamiento del paciente.",
          "razon": "Evitar brotes en la comunidad."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Protocolos MSP"
    }
  },
  {
    "id": "vig2",
    "nombre": "Parálisis Flácida Aguda (Poliomielitis)",
    "servicio": "Salud Comunitaria",
    "color": "#FFEB3B",
    "icon": "AlertTriangle",
    "clinica": {
      "signosSintomas": [
        "Debilidad muscular aguda",
        "Flacidez",
        "Hiporreflexia o arreflexia",
        "Sin causa traumática evidente"
      ],
      "maniobraExploracion": "Evaluación de fuerza muscular y reflejos osteotendinosos. Signos meníngeos.",
      "banderasRojas": [
        "Insuficiencia respiratoria (parálisis diafragmática)",
        "Disfagia",
        "Progresión rápida de la debilidad"
      ],
      "cita": "Protocolo Erradicación Polio MSP"
    },
    "fisiopatologia": {
      "textoTecnico": "### Introducción: El Evento Disparador\\nLa Poliomielitis Viral paralizante (Ataque PFA) es una agresión directa feca-bucal de nervios medulares motrices silentes. El evento disparador es la entrada siliente intestinal letal del voraz Poliovirus (família Picornavirus) enganchándose biológicamente agresivo a las células digestivas (Peyer) sin provocar síntomas evidentes mayores al comienzo letal encubado gástrico inicial.\\n\\n### Desenlace: La Cascada de Disfunción\\n**Mecanismo de Progresión (El Mapa):**\\n- **Barrido Viremio Intestinal Linfoide:** Salta del tejido digestivo linfático para viajar libre al fluido sanguíneo sistémico con un único receptor letal magnético de destino fijado de tropismo nervioso asesino principal (Receptor CD155).\\n- **El Asedio del Motor Anterior Neuronal:** Penetra masiva a través de barreras cerebrales descendentes a buscar su gran meta única: Las neuronas del asta anterior motora espinal medular raquídea humana, apoderándose brutalmente del núcleo de su metabolismo.\\n- **Muerte Apoptótica Celular Destructora (Parálisis):** Una invasión a células grises motores musculares raquídeas colosales, al estallar destruyendolas de raíz y masacrando a la neurona que emite las corrientes paralizan todos los músculos a los que suplen inactivos para el resto de la vida sin remisión biológica general posterior.\\n\\n### Afectación de Órganos y Sistemas Relacionados\\n- **Asta Motor Periférico Sensitivo Paralítico Flácido:** Destrucción y flacidez asimétrica abrumante sin dolor directo pero de parálisis muscular profunda terminal definitiva.\\n- **Tronco Bulbar Cardiorrespiratorio Mortuorio:** Las infecciones extensas escalan rápidamente de extremidades superiores bulbares deprimibles letales al paralizar súbito a toda forma al músculo del Diafragma y la capacidad de respiración autónoma (El terror de los 'Pulmones de Hierro' históricos y paros). \\n\\n### Alteraciones Hormonales y Bioquímicas (Eje Químico)\\n- **Degeneración Retrograda Desnervante de Fosfocreatinina:** La inacción muscular desencadena miopatía atrófica profunda liberada en sangre muscular destructiva en un proceso por el que el tejido biológicamente al perder axón degenera como grasa inútil por atrofia paralítica química general muscular de reemplazo.\\n\\n### Correlación con Comorbilidades\\n- **No-Inmunidad Fecal Ambiental Pobreza:** De total salud comunitaria masiva y pobre eliminación del excremento masivo infeccioso fecal al carecer vacunas primarias de gotas orales neutralizantes sabin-salk locales del bloque masivo universal infeccioso ambiental libre.",
      "esquemaMental": {
        "inicio": "Transmisión fecal-oral.",
        "dano": "Destrucción de neuronas motoras inferiores.",
        "consecuencia": "Parálisis permanente o muerte por falla respiratoria."
      },
      "cita": "Harrison 21ra Ed."
    },
    "manejo": {
      "diagnostico": "Notificación inmediata. Toma de 2 muestras de heces (separadas por 24h) dentro de los 14 días del inicio.",
      "tratamiento": "Soporte. Fisioterapia precoz.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Solo puro y exclusivo Sintomatológico Neurológico paliativo analgésico y de pre espasmos de atróficos musculares puros. (AINE y Relajadores)", "dosis": "Variada pre general pura clínica y sub-protocolo del neuro base central crudo sintomático focal", "frecuencia": "Libre al clínico.", "observaciones": "El polio estricto en clínica y general fase motora no tiene cese causal antibiótico y puro global retro viral pre directo que la pare. Solo rehabilitamos dolor y post base y puro sostén craso vitalicio." }
        ],
        "medidasGenerales": [
          "Denuncia de pre inminente urgencia EPIDEMIOLÓGICA base a MSP puros local de nivel puramente nacion e inter global (Errastigamiento). Muestras puras y focales de 2 o hasta puras y buenas 3 tomas de pre crudo material fecal c/ 24 horas y frio global basal a centro referencial de puro y general CDC local basal profilaxis sub virológica en la base para aislar la genoma."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Monitoreo Crítico Crudo de los base pre músculos bulbares crudos (Disfagias, dificultad e implosiones diafragmáticas sub clínicas puras o apnea pre pulmonar aguda pre basal puramente global)."
        ],
        "signosAlerta": [
          "Pérdida rápida cruda del esfuerzo general de pulmón diafragma para iniciar general y de soporte puro intubación UCI preventiva (Uso pulmón hierro en la histórica).",
          "Asimetrías totales crudas pre flácidas atónicas puras con las ausencias reales clínicas puras de reflejos profundos espinales miotáticos puros en de y la clínica pediatría de días basal general puro pre febril de virosis."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Evitada base mortandad cruda paralítica fatal asfixia pura y cruda y general re adaptación ortopédica total general post y de la base clínica pura secuela ortetósica funcional general de silla crudo bastones local y cirugía osteo."
        ],
        "criteriosFracaso": [
          "Desarrollo de dependencia crónica al ventilador crudo."
        ]
      },
      "cita": "Manual de Vigilancia Epidemiológica Ecuador"
    },
    "enfermeria": {
      "nanda": "00085 Deterioro de la movilidad física",
      "intervenciones": [
        {
          "accion": "Notificación inmediata ante todo caso de PFA en <15 años.",
          "razon": "Mantener el estatus de país libre de polio."
        },
        {
          "accion": "Recolección adecuada de muestras de heces.",
          "razon": "Garantizar la viabilidad del virus para el diagnóstico de laboratorio."
        },
        {
          "accion": "Vigilancia de la función respiratoria.",
          "razon": "Detección temprana de compromiso de músculos respiratorios."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Protocolos MSP"
    }
  },
  {
    "id": "go1",
    "nombre": "Preeclampsia",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Tensión arterial sistólica ≥ 140 mmHg y/o diastólica ≥ 90 mmHg.",
        "Proteinuria (≥ 300 mg en 24h o tirilla reactiva ≥ 1+).",
        "Signos de gravedad: TAS ≥ 160 o TAD ≥ 110 mmHg.",
        "Cefalea persistente, alteraciones visuales (escotomas, visión borrosa).",
        "Dolor epigástrico o en cuadrante superior derecho.",
        "Edema pulmonar, oliguria."
      ],
      "maniobraExploracion": "Evaluación de reflejos osteotendinosos (hiperreflexia) y búsqueda de clonus. Palpación de hipocondrio derecho (signo de Chaussier).",
      "banderasRojas": [
        "Epigastralgia intensa",
        "Alteraciones visuales",
        "Disnea",
        "Oliguria",
        "Convulsiones (Eclampsia)"
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "fisiopatologia": {
      "textoTecnico": "La preeclampsia se origina por una invasión trofoblástica defectuosa de las arterias espirales uterinas, lo que resulta en una perfusión placentaria reducida y estrés oxidativo.\n\nEste estado libera factores antiangiogénicos (sFlt-1) a la circulación materna, provocando disfunción endotelial sistémica, aumento de la permeabilidad vascular y activación de la cascada de coagulación.",
      "esquemaMental": {
        "inicio": "Isquemia placentaria por mala remodelación arterial.",
        "dano": "Liberación de factores antiangiogénicos y daño endotelial.",
        "consecuencia": "Hipertensión, daño multiorgánico y riesgo de eclampsia."
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "manejo": {
      "diagnostico": "Medición de PA (2 tomas separadas por 15 min). Proteinuria en 24h o tirilla reactiva. Pruebas de función hepática, renal y plaquetas para descartar gravedad.",
      "tratamiento": "Manejo conservador si < 34 semanas sin signos de gravedad. Antihipertensivos: Nifedipina (10-40 mg/día), Labetalol o Alfa Metildopa. Emergencia hipertensiva: Nifedipina 10 mg VO cada 20-30 min. Prevención de eclampsia: Sulfato de Magnesio (Impregnación 4g IV en 20 min, mantenimiento 1g/h). Terminación del embarazo a las 37 semanas o antes si hay inestabilidad.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Metildopa (Acción Central)", "dosis": "250 - 500 mg", "frecuencia": "VO cada 8 a 12 horas (Mantenimiento Crónico)", "observaciones": "El fármaco más seguro y testeado en el embarazo a largo plazo. Rara vez causa disfunción hepática basal." },
          { "nombre": "Nifedipina (Calcioantagonista)", "dosis": "10 mg a 20 mg", "frecuencia": "VO (Acción corta en crisis cada 30 min, mantenimientos diarios c/8h)", "observaciones": "En crisis hipertensiva obstétrica iniciar cápsulas vía oral (NO SUBLINGUAL POR EFECTO MORTAL FETAL BRUSCO)." },
          { "nombre": "Sulfato de Magnesio (Prevención Neural)", "dosis": "Impregnación de 4 Gramos IV (En unos 20-30 min)", "frecuencia": "Mantenimiento 1 a 2 Gramos/Hora infusión IV contínua", "observaciones": "Anticonvulsivante de elección, PREVIENE el paso a Eclampsia en pacientes con preeclampsia con signos graves. Requiere vigilar toxicidad (Gluconato de Calcio)." }
        ],
        "medidasGenerales": [
          "Terminación URGENTE del embarazo si cruza la semana 37, o si <34 semanas y presenta inestabilidad (Manejo activo expectante abolido con distress fetal).",
          "Reposo clínico relativo en decúbito lateral izquierdo a nivel hospitalario o domiciliario estricto (previene compresión aortocava)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Examen clínico riguroso CADA TURNO del estado de reflejos osteotendinosos rotulianos (Signo 1 de intoxicación Mg).",
          "Monitoreo Fetal basal sin estrés (NST) y Perfil Biofísico bi-semanal si hay un manejo 'conservador'.",
          "Proteínas de 24 horas y Uricemias cada 72 horas para descartar progresión."
        ],
        "signosAlerta": [
          "Escotomas visuales puros (Ver destellos), Acúfenos graves (Zumbidos en altos volúmenes).",
          "Epigastralgia en 'Cinturón' (Ojo: Marca rotura de cápsula hepática inminente).",
          "Bradipnea contundente < 12 rpm (Intoxicación masiva y crasa por Magnesio)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Mantenimiento de Tensión arterial diastólica menor a los clásicos 90 mmHg.",
          "Mantenimiento de un curso expectante fetal ganancioso hasta la semana ideal 37 o cercana (Madurez global)."
        ],
        "criteriosFracaso": [
          "Avance a convulsionamientos generalizados activos severos pre parto o en fase de trabajo parto puerperal (Eclampsia Instalada).",
          "Desprendimiento brusco agudo de placenta retro normoinserta mortal."
        ]
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "enfermeria": {
      "nanda": "00209 Riesgo de alteración de la diada materno/fetal r/c hipertensión inducida por el embarazo.",
      "intervenciones": [
        {
          "accion": "Monitorización estricta de presión arterial.",
          "razon": "Detectar oportunamente crisis hipertensivas."
        },
        {
          "accion": "Control de diuresis horaria con sonda vesical.",
          "razon": "Evaluar función renal y prevenir toxicidad por sulfato de magnesio (mantener > 30 ml/h)."
        },
        {
          "accion": "Valoración de reflejos osteotendinosos y frecuencia respiratoria.",
          "razon": "Signos tempranos de toxicidad por sulfato de magnesio."
        },
        {
          "accion": "Administración de antihipertensivos y sulfato de magnesio según prescripción.",
          "razon": "Controlar cifras tensionales y prevenir convulsiones."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        }
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    }
  },
  {
    "id": "go2",
    "nombre": "Eclampsia",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Convulsiones tónico-clónicas generalizadas y/o coma.",
        "Antecedente de preeclampsia (aunque puede presentarse sin signos previos).",
        "Hipertensión arterial severa.",
        "Cefalea intensa, alteraciones visuales, dolor epigástrico previos a la convulsión."
      ],
      "maniobraExploracion": "Asegurar vía aérea. Evaluación de la escala de Glasgow post-ictal. Monitoreo de frecuencia cardíaca fetal.",
      "banderasRojas": [
        "Estatus epiléptico",
        "Coma prolongado",
        "Signos de focalidad neurológica",
        "Desprendimiento de placenta"
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "fisiopatologia": {
      "textoTecnico": "La eclampsia representa la fase convulsiva de la preeclampsia, caracterizada por encefalopatía hipertensiva y edema cerebral vasogénico.\n\nLa ruptura de la barrera hematoencefálica debido a la hipertensión extrema permite la extravasación de fluidos y proteínas, desencadenando la actividad eléctrica anormal.",
      "esquemaMental": {
        "inicio": "Hipertensión severa no controlada en preeclampsia.",
        "dano": "Edema cerebral y pérdida de autorregulación del flujo sanguíneo.",
        "consecuencia": "Convulsiones generalizadas y riesgo de hemorragia cerebral."
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "manejo": {
      "diagnostico": "Clínico (presencia de convulsiones en paciente obstétrica).",
      "tratamiento": "Soporte vital (vía aérea, oxígeno). Sulfato de Magnesio: Impregnación 6g IV en 20 min, mantenimiento 2g/h. Control de PA con Nifedipina o Labetalol. Terminación del embarazo (parto o cesárea) una vez estabilizada la paciente (idealmente antes de 12h).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Sulfato de Magnesio (Tratamiento Clínico Curativo Activo)", "dosis": "Impregnación subida a 6 Gramos IV", "frecuencia": "Pase global intenso en los 20 min iniciales, Mantenimiento 2g/h", "observaciones": "El sulfato NO ES hipotensor puro, es relajante de espiga convulsiva central. Única cura total es sacar la placenta." },
          { "nombre": "Labetalol IV / Hidralazina (Alternativa Pura)", "dosis": "Bolos titulables IV 20 mg", "frecuencia": "Hasta control estricto PAM límite basal", "observaciones": "Baja la TA de manera menos brutal salvando la asfixia letal aguda del neonato." },
          { "nombre": "Gluconato de Calcio al 10%", "dosis": "1 ampolla clínica 1 Gramo", "frecuencia": "En 3 min en bolo letneo", "observaciones": "Antídoto obligatorio precargado que siempre debe estar a mano junto al Mg." }
        ],
        "medidasGenerales": [
          "Código Mater (Oro) Activo Inmediato: Todo el hospital debe acudir. Preparación a un C-Section crudo clase 1.",
          "Estabilizar vía aérea primero antes del parto basal. No se manda al quirófano a una paciente que aun convulsiona, se la estabiliza al menos por las puras 2 - 4 horas inicial."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Gasto Fley Urinario HORARIO riguroso (Aclaramiento de Magnesio depende exclusivamente del riñón, si oliguria, la paciente entrará en paro por Magnesiemia base pura).",
          "Dinámica pulmonar contínua en decúbitos profilácticos contra vómitos crasos aspirativos puros."
        ],
        "signosAlerta": [
          "Caída del estado Glasgow estricta > 2 puntos post medicación.",
          "Sangrados de las encías y petequias puras rojas basales en cuello u ojos (Instauración pura del inminente CID)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Extracción viva cruda local del feto pre sin infarto focal u daño puro hipóxico masivo pre general base.",
          "Cese crudo post parto de los picos crudos tonico clónicos estadios puros."
        ],
        "criteriosFracaso": [
          "Coma epiléptico y pre cerebral post eclampsia fulminante estatus refractario craso puramente grave general materno a UCI."
        ]
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "enfermeria": {
      "nanda": "00035 Riesgo de lesión r/c actividad convulsiva.",
      "intervenciones": [
        {
          "accion": "Proteger la vía aérea y colocar en decúbito lateral izquierdo.",
          "razon": "Prevenir broncoaspiración y mejorar retorno venoso."
        },
        {
          "accion": "Colocar cánula de Guedel y aspirar secreciones.",
          "razon": "Mantener permeabilidad de la vía aérea."
        },
        {
          "accion": "Administrar oxígeno por mascarilla.",
          "razon": "Tratar la hipoxia generada durante la convulsión."
        },
        {
          "accion": "Colocar dos vías periféricas gruesas (14G o 16G) y sonda Foley.",
          "razon": "Asegurar acceso para medicamentos y control estricto de líquidos."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        }
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    }
  },
  {
    "id": "go3",
    "nombre": "Síndrome de HELLP",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Hemólisis (esquistocitos, bilirrubina indirecta elevada).",
        "Enzimas hepáticas elevadas (AST/ALT ≥ 70 UI/L).",
        "Plaquetopenia (< 100.000 /µL).",
        "Dolor epigástrico o en hipocondrio derecho.",
        "Náuseas, vómitos, malestar general."
      ],
      "maniobraExploracion": "Palpación profunda de hígado buscando sensibilidad o hepatomegalia. Evaluación de signos de sangrado (petequias, equimosis).",
      "banderasRojas": [
        "Hematoma subcapsular hepático",
        "Ruptura hepática",
        "Insuficiencia renal aguda",
        "Desprendimiento de placenta"
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "fisiopatologia": {
      "textoTecnico": "Variante grave de la preeclampsia caracterizada por Hemólisis, Enzimas hepáticas elevadas y Plaquetas bajas.\n\nLa microangiopatía trombótica causa fragmentación de eritrocitos (esquistocitos) y depósitos de fibrina en los sinusoides hepáticos, lo que provoca isquemia y necrosis hepatocelular.",
      "esquemaMental": {
        "inicio": "Disfunción endotelial microvascular severa.",
        "dano": "Activación plaquetaria y daño mecánico a eritrocitos.",
        "consecuencia": "Falla hepática, coagulopatía y riesgo de muerte materna."
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "manejo": {
      "diagnostico": "Laboratorio: Plaquetas < 100.000, AST/ALT elevadas, LDH > 600 UI/L, bilirrubina indirecta elevada.",
      "tratamiento": "Prevención de convulsiones con Sulfato de Magnesio. Transfusión de plaquetas si < 50.000 y sangrado activo o previo a cesárea. Terminación del embarazo. No se recomienda uso rutinario de corticoides para el síndrome en sí, salvo para maduración pulmonar fetal.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Plaquetas (Hemoderivados Especiales)", "dosis": "Aféresis de Pool 1 unidad crasa", "frecuencia": "Solo si caen < 50,000 en parto vaginal o < 100,000 en raquidia / cesárea.", "observaciones": "No reponer al puro loco profiláctic. Si hay coagulopatía general añadir los pre Crio Precipitados o Plasmas Frescos." },
          { "nombre": "Sulfato de Magnesio Pediátrico Neurológico", "dosis": "Terapia Protocolizada estándar 4g Carga", "frecuencia": "Infusión pre quirúrgica y 24 hr post quirúrgica", "observaciones": "Todo Hellp debe manejarse como Eclampsia Inminente." },
          { "nombre": "Dexametasona / Betametasona", "dosis": "12 mg IM totales", "frecuencia": "Estricto de 2 dosis a las críticas 24 h basal", "observaciones": "Solo para Maduración de la base pulmonar del neonato menor a las puras 34 sdg. Sin efectos de reverso en el daño materno." }
        ],
        "medidasGenerales": [
          "Drenar o terminar el embarazo INDEPENDIENTEMENTE total crudo de las semanas gestacionales puras, el Hellp avanza y revienta el hígado de manera aguda.",
          "Cesárea de pre urgencia cruda bajo un enfoque anestésico ideal general si la plaquetopenia global impide el estricto uso de la Epidural pura baso raquídea."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Plaquetas de serie estricta cruda diaria / LDHs crudas hepáticas y el frote sangre de Esquistocitos maduros puramente puros basales hemolíticos general."
        ],
        "signosAlerta": [
          "El gran terrible dolor hipocondríaco puro global extremo masivo sub costal referencial general o del hombro (Capsular de Glisson puramente rompiéndose - Muerte Hepática de urgencia Qx)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Supervivencia cruda base clínica puro de madre reestableciendo las diuresis post puras crudas y caídas en las DHL puras 72 hrs generalizadas."
        ],
        "criteriosFracaso": [
          "CID puramente local (Coagulación puramente intra vascular crasa y general Diseminada) letal base sangrados u organo falla general aguda masivo."
        ]
      },
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    },
    "enfermeria": {
      "nanda": "00206 Riesgo de sangrado r/c disminución de plaquetas y coagulopatía.",
      "intervenciones": [
        {
          "accion": "Monitorización estricta de signos vitales y sangrado.",
          "razon": "Detección temprana de choque hemorrágico."
        },
        {
          "accion": "Preparación para transfusión de hemoderivados (plaquetas, paquetes globulares).",
          "razon": "Corregir la plaquetopenia y anemia severa."
        },
        {
          "accion": "Control de laboratorios seriados (plaquetas cada 24h).",
          "razon": "Evaluar progresión o resolución del síndrome."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "GPC Trastornos hipertensivos del embarazo, MSP 2016."
    }
  },
  {
    "id": "go4",
    "nombre": "Hemorragia Posparto",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Pérdida de sangre > 500 ml (parto vaginal) o > 1000 ml (cesárea).",
        "Útero blando y no retraído (Atonía uterina - 70%).",
        "Sangrado rutilante continuo, taquicardia, hipotensión, signos de shock.",
        "Placenta retenida o incompleta."
      ],
      "maniobraExploracion": "Masaje uterino bimanual para evaluar el tono (4Ts: Tono, Trauma, Tejido, Trombina). Revisión del canal del parto.",
      "banderasRojas": [
        "Choque hipovolémico severo",
        "Inversión uterina",
        "Coagulación Intravascular Diseminada (CID)",
        "Pérdida de conciencia"
      ],
      "cita": "GPC Prevención, diagnóstico y tratamiento de la hemorragia posparto, MSP 2013."
    },
    "fisiopatologia": {
      "textoTecnico": "Pérdida hemática superior a la esperada que compromete la estabilidad hemodinámica de la paciente en las primeras 24 horas postparto.\n\nLa causa más común es la atonía uterina (falta de contracción del miometrio para ocluir los vasos espirales), seguida por laceraciones, retención de restos y trastornos de la coagulación.",
      "esquemaMental": {
        "inicio": "Falla en los mecanismos de hemostasia postparto.",
        "dano": "Hemorragia masiva y depleción de factores de coagulación.",
        "consecuencia": "Choque hemorrágico y necesidad de histerectomía de urgencia."
      },
      "cita": "GPC Prevención, diagnóstico y tratamiento de la hemorragia posparto, MSP 2013."
    },
    "manejo": {
      "diagnostico": "Estimación visual o pesaje de la pérdida sanguínea. Evaluación clínica de signos de shock. Revisión de canal de parto y placenta.",
      "tratamiento": "Manejo simultáneo: Pedir ayuda, reanimación (2 vías 14-16G, cristaloides), masaje uterino bimanual. Fármacos: Oxitocina 10 UI IM o 5 UI IV, Misoprostol 800 mcg sublingual, Metilergonovina 0.2 mg IM. Si no responde: taponamiento uterino, suturas hemostáticas (B-Lynch), ligadura arterial o histerectomía.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Oxitocina Pura Hormonal (Pilar número UNO)", "dosis": "10 a 40 UI puras", "frecuencia": "Diluidas crasamente en puros 1000 cc estricto Lactato a gran chorrito continuo", "observaciones": "Produce contracción tetánica estricta cruda del útero pre atonaico masivo. Causa de leve caída o bajones crudos hipotensores." },
          { "nombre": "Misoprostol (Analogo basal Prostaglandínico)", "dosis": "800 mcg puramente (4 a las puros pastillas crudos en 200mcg)", "frecuencia": "Sublingual o global intra rectal inmediata crasa única", "observaciones": "Altísimo puramente febrícula secundaria con intenso tiritón frio pre general esperable en pre y post puro parto. Cierre masivo tónico arteriolario." },
          { "nombre": "Acido Tranexámico profiláctico de control hemato puro coagulable antifibrila", "dosis": "1 Gramo IV pura e inicial en puros", "frecuencia": "Pasado basal sobre los 10 minutos intra venosos lentos globales.", "observaciones": "Impide la de-general crasa de los basales crudos puros tapones plaquetarios puro general. Altísima vidal en los 3 primeras horas del trauma hemato post." }
        ],
        "medidasGenerales": [
          "Masaje Bimanual Uterino (COMPRESION PURA): Presionar los puros puños interno craso desde el fondo pre uterino puro por encima basal crudo y por de la sínfisis puramente intra vaginal pre sostenida mínima 20 mins a los puros 40.",
          "Balon puramente basal de Bakri insuflado o de la sonda de condón puramente general hidrostática pre armada intramural crasa para causar estricta presión base en endometrio vivo."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Cuantificación real VISUAL general mas pesada de sangre pura usando puras fundas de V drape en el colchón base perineal crudo (Calculo de shock class).",
          "Índice Puro de Choque Crudo = (FC estricta cruda / TA Sistólica cruda pura). Si está pre y peor del > 0.9 es mal o puro shock post letneo inicial general masivo."
        ],
        "signosAlerta": [
          "Aparición pura masiva general del CID con base acro crasa distal puro en purpuras pre encías o nariz pura post succión cruda."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Globo pélvico post de Seguridad Pura y basal de el general parto Palpable periumbilical crudo (Útero tan rígido puro como piedra general viva estricta).",
          "Caída del puramente gasto puro del flujo pre loquios basales rojo vivo."
        ],
        "criteriosFracaso": [
          "Histerectomía pura de Urgencia pre obstétrica crasa total obligatoria post base pura de los fallos masivos del B-Lynch o del global suturaje puramente de arteria basal Uterina / Hipogástrica local cruda."
        ]
      },
      "cita": "GPC Prevención, diagnóstico y tratamiento de la hemorragia posparto, MSP 2013."
    },
    "enfermeria": {
      "nanda": "00027 Déficit de volumen de líquidos r/c pérdida activa de sangre.",
      "intervenciones": [
        {
          "accion": "Activar Clave Roja y pedir ayuda.",
          "razon": "Movilizar equipo multidisciplinario rápidamente."
        },
        {
          "accion": "Canalizar dos vías venosas de grueso calibre (14G o 16G) y administrar cristaloides a chorro.",
          "razon": "Reponer volumen intravascular y tratar el shock."
        },
        {
          "accion": "Realizar masaje uterino continuo.",
          "razon": "Estimular la contracción miometrial para ocluir vasos sangrantes."
        },
        {
          "accion": "Administrar uterotónicos (Oxitocina, Misoprostol) según protocolo.",
          "razon": "Favorecer la retracción uterina farmacológicamente."
        },
        {
          "accion": "Colocar sonda vesical.",
          "razon": "Monitorizar gasto urinario y vaciar vejiga para facilitar contracción uterina."
        }
      ],
      "cita": "GPC Prevención, diagnóstico y tratamiento de la hemorragia posparto, MSP 2013."
    }
  },
  {
    "id": "go5",
    "nombre": "Aborto Espontáneo",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Baby",
    "clinica": {
      "signosSintomas": [
        "Sangrado vaginal (metrorragia) de magnitud variable.",
        "Dolor tipo cólico en hipogastrio.",
        "Modificaciones cervicales (cuello abierto en aborto en curso/incompleto).",
        "Expulsión de restos ovulares o fetales."
      ],
      "maniobraExploracion": "Especuloscopía para evaluar origen del sangrado y estado del cérvix. Tacto vaginal bimanual para evaluar tamaño uterino y dilatación cervical.",
      "banderasRojas": [
        "Sangrado profuso con inestabilidad hemodinámica",
        "Fiebre, flujo fétido (Aborto séptico)",
        "Dolor abdominal severo con irritación peritoneal"
      ],
      "cita": "GPC Diagnóstico y tratamiento del aborto espontáneo, incompleto, diferido y recurrente, MSP 2013."
    },
    "fisiopatologia": {
      "textoTecnico": "Interrupción espontánea del embarazo antes de las 20 semanas o con feto < 500g. Causas frecuentes: anomalías cromosómicas (50%), alteraciones endocrinas, inmunológicas (Síndrome antifosfolipídico), anatómicas o infecciones.",
      "esquemaMental": {
        "inicio": "Falla en el desarrollo embrionario o factores maternos adversos.",
        "dano": "Desprendimiento del saco gestacional y sangrado decidual.",
        "consecuencia": "Expulsión parcial o total del producto de la concepción."
      },
      "cita": "GPC Diagnóstico y tratamiento del aborto espontáneo, incompleto, diferido y recurrente, MSP 2013."
    },
    "manejo": {
      "diagnostico": "Clínico (especuloscopía, tacto vaginal). Ecografía transvaginal (para confirmar viabilidad o retención de restos). Cuantificación de β-hCG.",
      "tratamiento": "Farmacológico: Misoprostol (ej. 600 µg VO o 800 µg vaginal para aborto incompleto). Quirúrgico: Aspiración Manual Endouterina (AMEU) preferida sobre Legrado Uterino Instrumental (LUI) para < 12 semanas. Profilaxis antibiótica (Azitromicina + Metronidazol). Profilaxis anti-D en Rh negativas.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Misoprostol (Tratamiento Farmacológico Restos)", "dosis": "Variada (600 a 800 sub micro)", "frecuencia": "Vaginal en crasa local pura sub lingual general basal una sola tanda de limpieza", "observaciones": "La dosis varía si el feto pura y crasamente está vivo y retenido general craso vs resto local puro abortivo parcial incompleto." },
          { "nombre": "Inmunoglobulina base pura inyectable Antihumana Anti-D puramente Rho (Rhogam)", "dosis": "Dosis 300 micro gramos IM general intramusculares puros.", "frecuencia": "Dosis general estat y pre rápida profilaxia única. Cerca a puras de las 72 pre de hrs post del cese masivo.", "observaciones": "Indispensable y mandatoria SOLO PARA TODAS madres puramente O- / A- o base negativas pura crasa." }
        ],
        "medidasGenerales": [
          "Preparación rápida a AMEU."
        ]
      },
      "monitoreo": {
        "parametros": ["Sangrado vaginal"],
        "signosAlerta": ["Sangrado masivo"]
      },
      "evaluacion": {
        "criteriosExito": ["Útero vacío"],
        "criteriosFracaso": ["Persistencia de restos"]
      },
      "cita": "GPC Aborto, MSP 2013."
    },
    "enfermeria": {
      "nanda": "00132 Dolor agudo r/c contracciones uterinas.",
      "intervenciones": [
        { "accion": "Control de signos vitales.", "razon": "Detectar shock." }
      ],
      "cita": "Manual de Enfermería"
    }
  },
  {
    "id": "go11",
    "nombre": "Mastitis Puerperal",
    "servicio": "Gineco-Obstetricia",
    "color": "#FCE4EC",
    "icon": "Zap",
    "clinica": {
      "signosSintomas": [
        "Dolor localizado en un cuadrante de la mama.",
        "Eritema, calor y endurecimiento regional.",
        "Fiebre (> 38.3°C), escalofríos y mialgias (síndrome gripal).",
        "Fisuras en el pezón frecuentes."
      ],
      "maniobraExploracion": "Examen de ambas mamas buscando áreas de flutuación (absceso) o linfangitis.",
      "banderasRojas": [
        "Flutuación (sugiere absceso mamario)",
        "Persistencia de fiebre tras 48h de antibiótico",
        "Afectación bilateral severa"
      ],
      "cita": "Protocolos de Obstetricia, Hospital Clínic Barcelona."
    },
    "fisiopatologia": {
      "textoTecnico": "Inflamación de la glándula mamaria que puede o no ser infecciosa. El estasis de leche (vaciamiento incompleto) es el factor precipitante. La infección suele ser por S. aureus proveniente de la orofaringe del lactante o la piel materna.",
      "esquemaMental": {
        "inicio": "Estasis de leche y obstrucción de conductos.",
        "dano": "Proliferación bacteriana en la leche estancada.",
        "consecuencia": "Celulitis del tejido conectivo interlobulillar."
      },
      "cita": "Harrison, pág. 630"
    },
    "manejo": {
      "diagnostico": "Clínico. El cultivo de leche solo se indica en casos recurrentes o graves.",
      "tratamiento": "1. Vaciado eficaz de la mama (Lactancia frecuente o extracción). ¡NO suspender lactancia!\n2. Analgesia (Ibuprofeno).\n3. Antibióticos (Dicloxacilina 500mg c/6h o Cefalexina 500mg c/6h por 10-14 días).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Dicloxacilina Base y General crudo Cefalexina local oral pura", "dosis": "500 pura masiva general y cruda de mg basal", "frecuencia": "VO puro c al general cada pre 6 puro de h hr hs", "observaciones": "Penetra base súper y crudo general y excelente al mamario puro estricto por de con afinidad base en el y en Staph puro y general craso áureos local base." },
          { "nombre": "Ibuprofeno / Para masivos y puros crudos de general zetamoles", "dosis": "Clínicas puramente y de dolor pre base regular oral general.", "frecuencia": "A demandar puramente el pre y la dolor puro mamario craso al base el acople materno.", "observaciones": "Para masiva inflamatorio basal." }
        ],
        "medidasGenerales": [
          "Vaciado mamario frecuente (lactancia a demanda).",
          "Aplicación de calor local antes y frío después de la toma.",
          "Masaje suave durante la toma para favorecer el vaciado."
        ]
      },
      "cita": "Protocolos de Obstetricia"
    },
    "enfermeria": {
      "nanda": "00030 Deterioro de la integridad cutánea (pezón)",
      "intervenciones": [
        {
          "accion": "Valorar técnica de lactancia.",
          "razon": "Corregir el acople previene traumas."
        },
        {
          "accion": "Limpieza y secado de la zona.",
          "razon": "Prevenir maceración."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi1",
    "nombre": "Insuficiencia Renal Crónica (IRC)",
    "servicio": "Medicina Interna",
    "system": "Sistema Nefrodinámico / Medio Interno",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Edema maleolar y bipalpebral (matutino)",
        "Asterixis (flapping tremor o temblor aleteante)",
        "Oliguria o anuria (tardío)",
        "Prurito generalizado intenso (por depósito de cristales de calcio)",
        "Aliento urémico (olor amoniacal)",
        "Escarcha urémica (cristales blancos en piel - muy tardío)",
        "Astenia, adinamia y anemia (normocrómica normocítica)"
      ],
      "maniobraExploracion": "1. Evaluación de edema con fóvea (Grado I-IV). 2. Maniobra de Asterixis: Pedir al paciente que extienda los brazos y las muñecas hacia atrás (dorsiflexión). 3. Auscultación cardíaca: Búsqueda de frote pericárdico (urgencia dialítica). 4. Palpación renal: Riñones pequeños y firmes (excepto en poliquistosis).",
      "banderasRojas": [
        "Hiperpotasemia K > 6.5 (Cambios en ECG: Ondas T picudas)",
        "Edema Agudo de Pulmón (sobrecarga que no responde a diuréticos)",
        "Encefalopatía urémica (obnubilación, convulsiones)",
        "Pericarditis urémica (frote + dolor pericárdico)",
        "Acidosis metabólica grave refractaria (pH < 7.1)"
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "La IRC es el resultado final de la pérdida progresiva de nefronas funcionales, lo que lleva a una disminución de la tasa de filtración glomerular (TFG).\n\nEsto provoca la acumulación de toxinas urémicas, desequilibrio hidroelectrolítico y alteraciones endocrinas (déficit de eritropoyetina y vitamina D activa).",
      "esquemaMental": {
        "inicio": "Daño renal crónico (DM, HTA, Glomerulopatías).",
        "dano": "Esclerosis glomerular y fibrosis tubulointersticial.",
        "consecuencia": "Falla renal terminal y necesidad de terapia dialítica."
      },
      "cita": "Harrison, pág. 1900"
    },
    "manejo": {
      "diagnostico": "Evaluar TFG (Estadios G1-G5) y Clasificación A1-A3 de Albuminuria. Ecografía renal.",
      "tratamiento": "Nefroprotección (IECA/ARA II), control de presión arterial, manejo de fósforo-calcio, tratamiento de anemia.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Enalapril / Losartán", "dosis": "10-20 mg/día (ajustar tolerancia)", "frecuencia": "Cada 24 horas", "observaciones": "Nefroprotección: reducir proteinuria. Vigilar hiperpotasemia inminente." },
          { "nombre": "Eritropoyetina Humana Recombinante", "dosis": "4000-8000 UI/semana", "frecuencia": "SC (1-3 dosis/semana)", "observaciones": "Para anemia renal (Hb objetivo 10-12 g/dL). Requiere depósitos de hierro (Ferritina >100)." },
          { "nombre": "Carbonato de Calcio / Sevelamer", "dosis": "800-1600 mg/comida", "frecuencia": "Junto con comidas principales", "observaciones": "Quelantes de fósforo para prevenir osteodistrofia renal." }
        ],
        "medidasGenerales": [
          "Restricción de sodio (< 2g/día).",
          "Restricción de proteínas (0.6-0.8 g/kg/día en pre-diálisis).",
          "Control estricto de diuresis (diuresis residuo + 500cc si anúrico)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Creatinina sérica y TFG estimada (trimestral).",
          "Potasio y Fósforo sérico.",
          "Hemoglobina, Hierro y Ferritina."
        ],
        "signosAlerta": [
          "Hiperpotasemia (K > 6.0 mEq/L, cambios ECG).",
          "Oliguria o anuria súbita.",
          "Edema agudo de pulmón (sobrecarga).",
          "Encefalopatía urémica (confusión, asterixis)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "TFG estable o descenso < 5 ml/min/año.",
          "Control de TA < 130/80 mmHg.",
          "Hemoglobina > 10 g/dL."
        ],
        "criteriosFracaso": [
          "Necesidad de diálisis de emergencia.",
          "Hiperpotasemia refractaria al tratamiento médico."
        ]
      },
      "cita": "GPC MSP Ecuador, Enfermedad Renal Crónica"
    },
    "enfermeria": {
      "nanda": "00026 Exceso de volumen de líquidos",
      "intervenciones": [
        {
          "accion": "Control estricto de peso diario.",
          "razon": "Indicador más sensible de retención hídrica en pacientes renales."
        },
        {
          "accion": "Cuidado del acceso vascular (fístula/catéter).",
          "razon": "Prevenir infecciones y asegurar la viabilidad para la hemodiálisis."
        },
        {
          "accion": "Monitorización de electrolitos (K, P, Ca).",
          "razon": "Prevenir complicaciones cardíacas y óseas graves."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi2",
    "nombre": "Insuficiencia Cardíaca Congestiva (ICC)",
    "servicio": "Medicina Interna",
    "system": "Sistema Cardiovascular",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Disnea progresiva (de esfuerzo, ortopnea, DPN)",
        "Tercer ruido cardíaco (S3) - Ritmo de galope ventricular",
        "Cuarto ruido cardíaco (S4) - Galope auricular",
        "Edema de miembros inferiores (vespertino, con fóvea)",
        "Ingurgitación yugular a 45°",
        "Hepatomegalia congestiva (dolorosa al tacto)",
        "Reflujo hepatoyugular positivo",
        "Estertores crepitantes basales ('en marea')"
      ],
      "maniobraExploracion": "1. Criterios de Framingham (Dx con 2 mayores o 1 mayor y 2 menores). 2. Medición de Ingurgitación Yugular midiendo la distensión venosa sobre el ángulo de Louis. 3. Evaluación del reflujo hepatoyugular manteniendo presión en cuadrante superior derecho por 10-30 seg.",
      "banderasRojas": [
        "Disnea en reposo absoluta",
        "Expectoración asalmonada, espumosa (Edema Agudo de Pulmón)",
        "Hipotensión o Choque cardiogénico",
        "Saturación de oxígeno < 90% con aire ambiente",
        "Alteración del estado mental"
      ],
      "cita": "Bates Guía de Exploración Física e Historia Clínica"
    },
    "fisiopatologia": {
      "textoTecnico": "Incapacidad del corazón para bombear sangre en volúmenes adecuados para satisfacer las demandas metabólicas o hacerlo solo con presiones de llenado elevadas.\n\nLa activación neurohormonal (SRAA y Sistema Simpático) inicialmente compensa, pero a largo plazo causa remodelado ventricular adverso y mayor deterioro funcional.",
      "esquemaMental": {
        "inicio": "Sobrecarga de presión o volumen (HTA, IAM).",
        "dano": "Hipertrofia y dilatación ventricular con fibrosis.",
        "consecuencia": "Congestión pulmonar/sistémica y bajo gasto cardíaco."
      },
      "cita": "Harrison, pág. 1500"
    },
    "manejo": {
      "diagnostico": "Criterios de Framingham. Ecocardiograma (FEVI). NT-proBNP.",
      "tratamiento": "Cuádruple terapia: ARNI + Beta-bloqueador + Antagonista de Aldosterona + iSGLT2. Diurético de asa (Furosemida) para congestión.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Sacubitril/Valsartán (ARNI)", "dosis": "Titulación progresiva (dosis mayor según tolerancia)", "frecuencia": "Cada 12 horas", "observaciones": "Primera línea sobre IECA en HFrEF. Vigilar hipotensión." },
          { "nombre": "Beta-bloqueadores (Ej. Bisoprolol)", "dosis": "Iniciar dosis muy bajas, titular semanalmente", "frecuencia": "Diario", "observaciones": "Anti-remodelado. No iniciar en descompensación aguda húmeda." },
          { "nombre": "Espironolactona", "dosis": "12.5 - 25 mg", "frecuencia": "Diario", "observaciones": "Monitorear K+ y función renal (riesgo hiperpotasemia)." },
          { "nombre": "Dapagliflozina / Empagliflozina (iSGLT2)", "dosis": "10 mg", "frecuencia": "Diario", "observaciones": "Beneficio cardiovascular independiente de diabetes." },
          { "nombre": "Furosemida", "dosis": "Según grado de congestión (ej. 20-80 mg)", "frecuencia": "Según estado hídrico (diario/prn)", "observaciones": "Solo para alivio sintomático de la congestión." }
        ],
        "medidasGenerales": [
          "Restricción de sodio y líquidos personalizada.",
          "Control diario de peso (alerta si >1kg en 24h)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Peso diario.",
          "Presión arterial y FC.",
          "Función renal y Potasio."
        ],
        "signosAlerta": [
          "Disnea en reposo o nocturna (DPN).",
          "Ganancia de peso rápida (>1kg/día).",
          "Edema progresivo."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Clase funcional NYHA mejorada.",
          "Ausencia de edemas y congestión pulmonar.",
          "FEVI en seguimiento ecocardiográfico."
        ],
        "criteriosFracaso": [
          "Reingreso hospitalario por descompensación.",
          "Hipotensión sintomática o bajo gasto."
        ]
      },
      "cita": "Guías ESC 2021 Insuficiencia Cardíaca"
    },
    "enfermeria": {
      "nanda": "00029 Disminución del gasto cardíaco",
      "intervenciones": [
        {
          "accion": "Balance hídrico estricto.",
          "razon": "Evaluar la respuesta a diuréticos y evitar la sobrecarga de volumen."
        },
        {
          "accion": "Posición Fowler alta.",
          "razon": "Disminuir el retorno venoso y mejorar la mecánica respiratoria."
        },
        {
          "accion": "Educación sobre restricción de sodio y líquidos.",
          "razon": "Prevenir descompensaciones agudas por sobrecarga hídrica."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi3",
    "nombre": "EPOC (Enfermedad Pulmonar Obstructiva Crónica)",
    "servicio": "Medicina Interna",
    "system": "Sistema Respiratorio",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Disnea progresiva al esfuerzo",
        "Tos crónica con o sin expectoración",
        "Tórax en tonel (diámetro AP aumentado)",
        "Uso de músculos accesorios (esternocleidomastoideo)",
        "Sibilancias y espiración prolongada",
        "Respiración con labios fruncidos",
        "Signo de Hoover (movimiento paradójico del tórax)"
      ],
      "maniobraExploracion": "1. Inspección estática del tórax (hiperinsuflación). 2. Percusión: Hiperresonancia generalizada. 3. Auscultación: Disminución del murmullo vesicular y aumento del tiempo espiratorio. Búsqueda de sibilancias espiratorias.",
      "banderasRojas": [
        "Exacerbación aguda (aumento de tos, disnea y volumen/purulencia de esputo)",
        "Signos de Cor Pulmonale (edema sistémico, IY)",
        "Frecuencia respiratoria > 30 lpm",
        "Uso masivo de músculos accesorios",
        "Somnolencia o confusión (Narcosis por CO2)"
      ],
      "cita": "GOLD (Global Initiative for Chronic Obstructive Lung Disease) 2024"
    },
    "fisiopatologia": {
      "textoTecnico": "Limitación persistente del flujo aéreo causada por una respuesta inflamatoria crónica en las vías respiratorias y el parénquima pulmonar ante partículas o gases nocivos (tabaquismo).\n\nCombina bronquitis crónica (inflamación y moco) y enfisema (destrucción alveolar), lo que reduce la elasticidad pulmonar y atrapa aire.",
      "esquemaMental": {
        "inicio": "Exposición crónica a irritantes (Humo de tabaco/biomasa).",
        "dano": "Inflamación de vías aéreas y destrucción de tabiques alveolares.",
        "consecuencia": "Obstrucción irreversible del flujo aéreo e hipoxemia."
      },
      "cita": "Harrison, pág. 1550"
    },
    "manejo": {
      "diagnostico": "Espirometría (VEF1/CVF <0.70 post-broncodilatador). Rx tórax descarta otras patologías.",
      "tratamiento": "Broncodilatadores de larga acción (LAMA/LABA). Corticoides inhalados (si indicados). Oxigenoterapia (si indica).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Doble broncodilatador (LAMA+LABA: Tiotropio+Olodaterol)", "dosis": "Según dispositivo (1-2 puffs)", "frecuencia": "Diario", "observaciones": "Terapia GOLD para control de síntomas." },
          { "nombre": "Corticoides Inhalados", "dosis": "Según gravedad", "frecuencia": "12/24 horas", "observaciones": "Solo pacientes con exacerbaciones frecuentes o fenotipo eosinofílico." },
          { "nombre": "Oxígeno domiciliario", "dosis": "1-2 L/min", "frecuencia": ">15 horas/día", "observaciones": "Indicado si PaO2 <55 mmHg o SaO2 <88%." }
        ],
        "medidasGenerales": [
          "Cese tabáquico absoluto (esencial).",
          "Vacunación antigripal y neumocócica."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Espirometría serie (FEV1).",
          "Saturación de oxígeno (oximetría)."
        ],
        "signosAlerta": [
          "Aumento súbito de disnea.",
          "Cambio en cantidad/color esputo.",
          "Cianosis."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Reducción de exacerbaciones.",
          "Mejora en escala disnea (mMRC).",
          "Estabilidad de SaO2."
        ],
        "criteriosFracaso": [
          "Exacerbaciones frecuentes a pesar de tratamiento.",
          "Insuficiencia respiratoria inminente."
        ]
      },
      "cita": "GOLD, 2023"
    },
    "enfermeria": {
      "nanda": "00030 Deterioro del intercambio de gases",
      "intervenciones": [
        {
          "accion": "Enseñanza de técnicas de respiración (labios fruncidos).",
          "razon": "Aumentar la presión en las vías aéreas y facilitar la exhalación del aire atrapado."
        },
        {
          "accion": "Fomento de la vacunación (Influenza/Neumococo).",
          "razon": "Prevenir infecciones respiratorias que desencadenen exacerbaciones graves."
        },
        {
          "accion": "Ajuste de la oxigenoterapia (mantener SatO2 88-92%).",
          "razon": "Evitar la supresión del impulso respiratorio hipóxico en retenedores crónicos de CO2."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi4",
    "nombre": "Cirrosis Hepática",
    "servicio": "Medicina Interna",
    "system": "Sistema Gastrointestinal / Hepático",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Ictericia de piel y escleras",
        "Ascitis (distensión abdominal con ombligo evertido)",
        "Arañas vasculares (telangiectasias en tórax superior)",
        "Eritema palmar (palmas rojas, cálidas)",
        "Ginecomastia y atrofia testicular (por hipoandrogenismo)",
        "Contracción de Dupuytren (engrosamiento fascia palmar)",
        "Fetor hepático (olor dulce-rancio del aliento)",
        "Asterixis (temblor en aleteo o flapping tremor)"
      ],
      "maniobraExploracion": "1. Palpación: Hígado con borde cortante, duro o nodular. 2. Evaluación de Ascitis: Matidez desplazable (cambio de sonido a la percusión al girar al paciente) y Signo de la Ola (transmisión de onda líquida). 3. Inspección: Cabeza de Medusa (circulación colateral peri-umbilical).",
      "banderasRojas": [
        "Hematemesis o Melenas (sangrado por várices esofágicas)",
        "Fiebre y dolor abdominal difuso (Peritonitis Bacteriana Espontánea)",
        "Desorientación, asterixis o letargia (Encefalopatía Hepática)",
        "Oliguria súbita o elevación de creatinina (Síndrome Hepatorrenal)",
        "Dolor en hipocondrio derecho y pérdida de peso (Hepatocarcinoma)"
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Estadio final de la fibrosis hepática caracterizado por la distorsión de la arquitectura hepática y la formación de nódulos de regeneración.\n\nLa fibrosis aumenta la resistencia al flujo sanguíneo portal (hipertensión portal) y disminuye la capacidad sintética y desintoxicante del hígado.",
      "esquemaMental": {
        "inicio": "Agresión hepática crónica (Alcohol, Hepatitis B/C, NASH).",
        "dano": "Activación de células estelares y depósito masivo de colágeno.",
        "consecuencia": "Hipertensión portal e insuficiencia hepatocelular."
      },
      "cita": "Harrison, pág. 2050"
    },
    "manejo": {
      "diagnostico": "Ecografía abdominal. Perfil hepático (Albúmina, Bilirrubinas, INR). Endoscopia digestiva alta.",
      "tratamiento": "Diuréticos (Espironolactona). Betabloqueadores (Propranolol) para varices. Lactulosa para encefalopatía.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Propranolol (o Nadolol)", "dosis": "Titular FC 55-60 lpm", "frecuencia": "Diario", "observaciones": "Prevención primaria de sangrado por várices esofágicas." },
          { "nombre": "Espironolactona + Furosemida", "dosis": "Ratio 100mg:40mg", "frecuencia": "Diario", "observaciones": "Diuréticos para ascitis. Vigilar electrolitos." },
          { "nombre": "Lactulosa", "dosis": "Titular según deposiciones (2-3/día)", "frecuencia": "C/ 8-12h", "observaciones": "Atrapa amoníaco. Evita encefalopatía." }
        ],
        "medidasGenerales": [
          "Paracentesis evacuatoria + Albúmina IV (indicación específica).",
          "Dieta hiposódica estricta."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Electrolitos y Creatinina.",
          "Perfil hepático (INR, Albúmina) y escalas (Child-Pugh, MELD)."
        ],
        "signosAlerta": [
          "Hemorragia digestiva (hematemesis/melenas).",
          "Desorientación/asterixis (encefalopatía).",
          "Fiebre/dolor abdominal (Peritonitis Bacteriana Espontánea)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Reducción de ascitis.",
          "Estabilidad en escalas Child-Pugh.",
          "Ausencia de sangrado digestivo."
        ],
        "criteriosFracaso": [
          "Encefalopatía refractaria.",
          "Síndrome hepatorrenal.",
          "Infección bacteriana espontánea."
        ]
      },
      "cita": "GPC MSP Ecuador, Cirrosis Hepática"
    },
    "enfermeria": {
      "nanda": "00026 Exceso de volumen de líquidos",
      "intervenciones": [
        {
          "accion": "Medición diaria del perímetro abdominal.",
          "razon": "Monitorizar de forma objetiva la progresión o resolución de la ascitis."
        },
        {
          "accion": "Vigilancia del estado neurológico (Escala de West Haven).",
          "razon": "Detección temprana de encefalopatía hepática por niveles de amonio."
        },
        {
          "accion": "Restricción estricta de sodio en la dieta.",
          "razon": "Disminuir la retención hídrica y la formación de edema/ascitis."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua y rigurosa según la condición clínica.",
          "razon": "Permite identificar precozmente deterioro hemodinámico, neurológico o ventilatorio para intervención oportuna."
        },
        {
          "accion": "Proporcionar educación sanitaria sistemática al paciente y a los familiares primarios.",
          "razon": "Fomenta el autocuidado a largo plazo, empodera al entorno y mejora significativamente la adherencia al plan terapéutico."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi5",
    "nombre": "Hipotiroidismo",
    "servicio": "Medicina Interna",
    "system": "Sistema Endocrino",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Astenia y adinamia (fatiga extrema)",
        "Intolerancia al frío",
        "Piel seca y fría",
        "Estreñimiento",
        "Aumento de peso (a expensas de mixedema)",
        "Bradipsiquia (pensamiento lento)",
        "Macroglosia (lengua ensanchada)",
        "Alopecia del tercio externo de las cejas (Signo de Hertoghe)"
      ],
      "maniobraExploracion": "1. Palpación de Tiroides: Búsqueda de bocio o glándula atrófica (Técnica de Quervain). 2. Reflejos Osteotendinosos: Fase de relajación prolongada (reflejo aquiliano). 3. Inspección: Facies mixedematosa (edema palpebral, rostro inexpresivo).",
      "banderasRojas": [
        "Coma Mixedematoso (Hipotermia, Hipoventilación, Bradicardia, Alteración de conciencia)",
        "Insuficiencia cardíaca (por bradicardia o derrame pericárdico)",
        "Hiponatremia grave"
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Síndrome clínico resultante de la deficiente producción de hormonas tiroideas (T3 y T4) o de la resistencia a su acción. La causa más común en zonas no deficientes de yodo es la Tiroiditis de Hashimoto (autoinmune).\n\nEsto provoca una ralentización generalizada de los procesos metabólicos y acumulación de glucoaminoglicanos en el espacio intersticial (mixedema).",
      "esquemaMental": {
        "inicio": "Destrucción glandular (Hashimoto, Ablación l-131, Cirugía).",
        "dano": "Caída de T4 libre con aumento compensatorio de TSH (Hipotiroidismo Primario).",
        "consecuencia": "Hipometabolismo sistémico y depósito de matriz mucinosa."
      },
      "cita": "Harrison, pág. 2350"
    },
    "manejo": {
      "diagnostico": "TSH elevada (> 4.5 mIU/L) y T4 libre disminuida. Anticuerpos Anti-TPO para confirmar etiología autoinmune.",
      "tratamiento": "Levotiroxina sódica (L-T4) en ayunas.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Levotiroxina Sódica", "dosis": "1.6 mcg/kg/día (Adultos jóvenes). Iniciar 25-50 mcg en adultos mayores/cardiópatas.", "frecuencia": "Diaria VO, en ayunas (30-60 min antes del desayuno)", "observaciones": "El objetivo es normalizar TSH. Evitar toma con hierro, calcio o inhibidores de bomba de protones." }
        ],
        "medidasGenerales": [
          "Educar sobre la toma permanente del medicamento.",
          "Evitar cambios de marcas comerciales (variabilidad de biodisponibilidad).",
          "Control de perfil lipídico (frecuente hipercolesterolemia)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "TSH sérica (Control cada 6-8 semanas tras ajuste de dosis).",
          "Frecuencia cardíaca y estado mental."
        ],
        "signosAlerta": [
          "Somnolencia extrema o hipotermia (Coma mixedematoso).",
          "Arritmias o dolor precordial (si se reemplaza hormona muy rápido en ancianos)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "TSH en rango normal (0.45 - 4.1 mIU/L).",
          "Resolución de síntomas (adinamia, estreñimiento).",
          "Pérdida del peso hídrico inicial."
        ],
        "criteriosFracaso": [
          "Persistencia de TSH elevada pese a dosis altas (revisar adherencia).",
          "Desarrollo de hipertiroidismo iatrogénico (TSH suprimida)."
        ]
      },
      "cita": "GPC MSP Ecuador, Hipotiroidismo"
    },
    "enfermeria": {
      "nanda": "00093 Fatiga / 00011 Estreñimiento",
      "intervenciones": [
        {
          "accion": "Monitorizar la tolerancia a la actividad.",
          "razon": "El hipometabolismo reduce la capacidad funcional; se deben planificar periodos de descanso."
        },
        {
          "accion": "Fomento de dieta rica en fibra e hidratación.",
          "razon": "Manejar el estreñimiento crónico asociado a la disminución del peristaltismo."
        },
        {
          "accion": "Vigilar el estado de la piel y proteger de agresiones.",
          "razon": "La piel seca y fría es propensa a lesiones por presión y descamación."
        },
        {
          "accion": "Asegurar la correcta administración del fármaco en ayunas.",
          "razon": "Garantizar la absorción máxima y estable de la levotiroxina."
        }
      ],
      "cita": "NIC-NOC"
    }
  },
  {
    "id": "mi6",
    "nombre": "Artritis Reumatoide (AR)",
    "servicio": "Medicina Interna",
    "system": "Sistema Osteoartromuscular / Inmunológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Dolor articular inflamatorio (empeora con el reposo)",
        "Rigidez matutina persistente (> 1 hora)",
        "Tumefacción simétrica (muñecas, MCF, IFP)",
        "Deformidad en 'Ráfaga cubital' (tardío)",
        "Nódulos reumatoideos (superficies de extensión)",
        "Astenia y febrícula persistente",
        "Ojo seco y boca seca (Síndrome de Sjögren asociado)"
      ],
      "maniobraExploracion": "1. Inspección: Búsqueda de sinovitis (articulación 'afelpada'). 2. Maniobra de Gaenslen (Squeeze test): Dolor a la compresión de las articulaciones MCF o MTF. 3. Evaluación de deformidades: Dedos en ojal (Boutonnière) o en cuello de cisne.",
      "banderasRojas": [
        "Subluxación Atloaxoidea (C1-C2): Dolor cervical intenso o mielopatía",
        "Vasculitis Reumatoide (isquemia digital, úlceras)",
        "Manifestaciones extra-articulares graves (Derrame pleural, Pericarditis)",
        "Uveítis persistente"
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Enfermedad autoinmune sistémica crónica caracterizada por sinovitis erosiva. La pérdida de tolerancia inmunológica lleva a la activación de linfocitos T y B, produciendo citoquinas proinflamatorias (TNF-α, IL-6). Esto induce la formación de 'Pannus' (tejido sinovial hipertrófico) que invade y destruye el cartílago y el hueso subcondral.",
      "esquemaMental": {
        "inicio": "Predisposición genética (HLA-DRB1) + Gatillo ambiental (Tabaquismo).",
        "dano": "Inflamación sinovial crónica y formación de Pannus erosivo.",
        "consecuencia": "Destrucción articular, deformidad irreversible y discapacidad."
      },
      "cita": "Harrison, pág. 2600"
    },
    "manejo": {
      "diagnostico": "Criterios ACR/EULAR 2010. Laboratorio: Factor Reumatoide (FR) y Anticuerpos Anti-Péptido Cíclico Citrulinado (Anti-CCP - más específico). VSG y PCR activas.",
      "tratamiento": "Fármacos Modificadores de la Enfermedad (FAMEs/DMARDs).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Metotrexato", "dosis": "15-25 mg/semana", "frecuencia": "Dosis SEMANAL (Nunca diaria)", "observaciones": "Pilar de tratamiento (Anchor drug). Requiere suplemento mensual de Ácido Fólico (5mg) para reducir toxicidad." },
          { "nombre": "Leflunomida", "dosis": "20 mg/día", "frecuencia": "Diaria VO", "observaciones": "Alternativa o adyuvante al metotrexato. Teratogenicidad absoluta." },
          { "nombre": "Corticoides (Prednisona)", "dosis": "Bajas dosis (< 7.5 - 10 mg)", "frecuencia": "Diaria (Terapia puente)", "observaciones": "Solo para control de síntomas inicial mientras el FAME hace efecto." }
        ],
        "medidasGenerales": [
          "Fisioterapia activa para preservar rangos de movimiento.",
          "Cese tabáquico (el tabaco aumenta la citrulinación y severidad).",
          "Protección articular y uso de férulas si es necesario."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Índices de actividad: DAS28 (Disease Activity Score).",
          "Hemograma y Perfil Hepático (control de toxicidad de FAMEs).",
          "Radiografía de manos y pies anual (búsqueda de erosiones)."
        ],
        "signosAlerta": [
          "Tos seca y disnea (Toxicidad pulmonar por Metotrexato).",
          "Elevación de transaminasas > 3x normal.",
          "Citopenias en sangre periférica."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Remisión clínica (DAS28 < 2.6).",
          "Ausencia de progresión radiográfica (erosiones).",
          "Mejoría del estatus funcional (HAQ score)."
        ],
        "criteriosFracaso": [
          "Actividad persistente pese a FAMEs sintéticos (indica paso a Terapia Biológica: Anti-TNF).",
          "Deformidades incapacitantes progresivas."
        ]
      },
      "cita": "GPC MSP Ecuador, Artritis Reumatoide"
    },
    "enfermeria": {
      "nanda": "00132 Dolor agudo / 00085 Deterioro de la movilidad física",
      "intervenciones": [
        {
          "accion": "Aplicación de termoterapia (calor matutino).",
          "razon": "Ayuda a reducir la rigidez matutina y mejora la flexibilidad sinovial."
        },
        {
          "accion": "Educar sobre la toma semanal del Metotrexato.",
          "razon": "Error crítico: La toma diaria de Metotrexato es letal por supresión medular."
        },
        {
          "accion": "Fomento del ejercicio de bajo impacto (natación).",
          "razon": "Mantener fuerza muscular sin sobrecargar la articulación inflamada."
        },
        {
          "accion": "Monitorizar signos vitales de manera continua.",
          "razon": "Detección de posibles complicaciones sistémicas o infecciosas por inmunosupresión."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi7",
    "nombre": "Enfermedad de Parkinson",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Temblor de reposo ('cuenta monedas')",
        "Bradicinesia (lentitud de movimientos)",
        "Rigidez en 'rueda dentada'",
        "Inestabilidad postural (tardío)",
        "Micrografía (letra pequeña)",
        "Facies inexpresiva (máscara parkinsoniana)",
        "Marcha festinante (pasos cortos, rápidos, sin braceo)",
        "Sialorrea (exceso de salivación)"
      ],
      "maniobraExploracion": "1. Evaluación del Temblor: Observar al paciente en reposo absoluto. 2. Tono Muscular: Movilización pasiva de extremidades para detectar rigidez. 3. Prueba de Impulso (Pull test): Evaluación de reflejos posturales. 4. Evaluación de la marcha: Observar inicio de marcha y giros.",
      "banderasRojas": [
        "Caídas frecuentes al inicio (sugiere Parálisis Supranuclear Progresiva)",
        "Disfagia grave de inicio temprano",
        "Hipotensión ortostática marcada",
        "Alucinaciones visuales espontáneas (sugiere Demencia por cuerpos de Lewy)"
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Trastorno neurodegenerativo caracterizado por la pérdida progresiva de neuronas dopaminérgicas en la pars compacta de la sustancia negra y la acumulación intracelular de alfa-sinucleína (Cuerpos de Lewy).\n\nEsto genera una denervación del estriado, alterando los circuitos de los ganglios basales y resultando en la tríada motora clásica.",
      "esquemaMental": {
        "inicio": "Estrés oxidativo y agregación de alfa-sinucleína.",
        "dano": "Degeneración de la vía nigroestriatal y déficit de dopamina.",
        "consecuencia": "Disfunción de la vía motora extrapiramidal."
      },
      "cita": "Harrison, pág. 3120"
    },
    "manejo": {
      "diagnostico": "Clínico (Tríada motora) + Respuesta positiva a Levodopa. El DAT-scan se reserva para dudas diagnósticas.",
      "tratamiento": "Reposición de Dopamina y Agonistas dopaminérgicos.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Levodopa / Carbidopa", "dosis": "100/25 mg tid inicial", "frecuencia": "TID (Tres veces al día)", "observaciones": "Fármaco más eficaz. Tomar 30 min antes o 1h después de proteínas (compiten por transporte)." },
          { "nombre": "Pramipexol (Agonista)", "dosis": "0.125 mg tid inicial", "frecuencia": "TID", "observaciones": "Útil en etapas iniciales. Riesgo de trastornos del control de impulsos (juego, compras)." },
          { "nombre": "Rasagilina (iMAO-B)", "dosis": "1 mg/día", "frecuencia": "Diaria", "observaciones": "Neuroprotector potencial. Útil en síntomas leves." }
        ],
        "medidasGenerales": [
          "Fisioterapia enfocada en equilibrio y marcha.",
          "Terapia ocupacional para actividades de la vida diaria.",
          "Dieta redistribuida (proteínas preferiblemente en la cena)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Escala UPDRS (Unified Parkinson's Disease Rating Scale).",
          "Evaluación de fluctuaciones motoras (períodos 'on-off').",
          "Presencia de discinesias (movimientos involuntarios anormales)."
        ],
        "signosAlerta": [
          "Psicosis o delirium (frecuentemente iatrogénico por agonistas).",
          "Disfagia severa con riesgo de aspiración.",
          "Congelación de la marcha (Freezing)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Mejoría significativa de la bradicinesia y el temblor.",
          "Mantenimiento de la independencia funcional.",
          "Ausencia de caídas."
        ],
        "criteriosFracaso": [
          "Fluctuaciones motoras intratables con medicación oral.",
          "Demencia asociada grave."
        ]
      },
      "cita": "GPC MSP Ecuador, Enfermedad de Parkinson"
    },
    "enfermeria": {
      "nanda": "00085 Deterioro de la movilidad física / 00103 Deterioro de la deglución",
      "intervenciones": [
        {
          "accion": "Proporcionar utensilios adaptados para la alimentación.",
          "razon": "Compensa el temblor y mejora la autonomía nutricional."
        },
        {
          "accion": "Entrenamiento en técnicas de deglución segura.",
          "razon": "Prevenir la neumonía por aspiración, complicación letal frecuente."
        },
        {
          "accion": "Prevención de caídas (eliminación de alfombras, luz nocturna).",
          "razon": "La inestabilidad postural aumenta drásticamente el riesgo de fracturas."
        },
        {
          "accion": "Monitorizar efectos adversos de la levodopa (hipotensión ortostática).",
          "razon": "Seguridad del paciente durante la deambulación."
        }
      ],
      "cita": "NIC-NOC"
    }
  },
  {
    "id": "mi8",
    "nombre": "Migraña y Cefaleas Primarias",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Migraña: Dolor hemicraneal, pulsátil, con náuseas, fotofobia y fonofobia.",
        "Aura: Síntomas neurológicos focales (visuales como escotomas) antes del dolor.",
        "Cefalea Tensional: Dolor opresivo 'en banda', bilateral, sin síntomas sistémicos.",
        "Cefalea en Racimos (Cluster): Dolor orbitario lancinante, unilateral, con lagrimeo y rinorrea."
      ],
      "maniobraExploracion": "1. Fondo de Ojo: Imprescindible para descartar papiledema (HTE). 2. Exploración de pares craneales y fuerza. 3. Signos meníngeos: Para descartar causas secundarias agudas.",
      "banderasRojas": [
        "Sustancia (Infección systemic/VIH, Cáncer)",
        "Neurological symptoms (Deficit focal, Papiledema)",
        "Onset (Súbita, explosiva)",
        "Older (Inicio > 50 años)",
        "Progression (Cambio en el patrón habitual)"
      ],
      "cita": "IHS (International Headache Society) ICHD-3"
    },
    "fisiopatologia": {
      "textoTecnico": "La migraña implica una disfunción del sistema trigémino-vascular. Se cree que una depresión cortical propagada (CSD) activa los nociceptores del trigémino en las meninges, liberando neuropéptidos proinflamatorios (como CGRP), lo que causa vasodilatación y sensibilización central.",
      "esquemaMental": {
        "inicio": "Desencadenantes (estrés, dieta, hormonas) + Predisposición genética.",
        "dano": "Activación del sistema trigémino-vascular y liberación de CGRP.",
        "consecuencia": "Dolor pulsátil e hipersensibilidad sensorial generalizada."
      },
      "cita": "Harrison, pág. 3180"
    },
    "manejo": {
      "diagnostico": "Clínico según criterios ICHD-3. Neuroimagen solo si hay banderas rojas.",
      "tratamiento": "Tratamiento del episodio agudo y profilaxis si > 3 crisis/mes.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Sumatriptán (Triptanes)", "dosis": "50-100 mg VO", "frecuencia": "Al inicio del dolor", "observaciones": "Específico para migraña. Contraindicado en enfermedad coronaria o ACV previo." },
          { "nombre": "AINEs (Naproxeno/Ibuprofeno)", "dosis": "Naproxeno 500 mg", "frecuencia": "Rescate agudo", "observaciones": "Primera línea en crisis leves-moderadas." },
          { "nombre": "Propranolol / Amitriptilina (Profilaxis)", "dosis": "Propranolol 40-80 mg/día", "frecuencia": "Diaria", "observaciones": "Reducen frecuencia y severidad. Tomar por al menos 3-6 meses." }
        ],
        "medidasGenerales": [
          "Identificar y evitar gatillos (sueño irregular, ayuno, ciertos alimentos).",
          "Reposo en ambiente oscuro y silencioso durante la crisis.",
          "Diario de cefaleas para monitorizar respuesta."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Frecuencia de crisis al mes.",
          "Intensidad (EVA) y duración.",
          "Impacto funcional (Escala MIDAS)."
        ],
        "signosAlerta": [
          "Cefalea explosiva súbita.",
          "Cambio brusco en la clínica habitual.",
          "Cefalea que no cede con triptanes."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Reducción > 50% en la frecuencia de crisis.",
          "Manejo exitoso de crisis agudas en < 2 horas.",
          "Mejoría en la calidad de vida."
        ],
        "criteriosFracaso": [
          "Cefalea crónica diaria (> 15 días/mes).",
          "Uso excesivo de analgésicos (Cefalea de rebote)."
        ]
      },
      "cita": "GPC MSP Ecuador, Manejo de Cefaleas"
    },
    "enfermeria": {
      "nanda": "00132 Dolor agudo",
      "intervenciones": [
        {
          "accion": "Control ambiental: Oscuridad y silencio.",
          "razon": "Minimizar los estímulos que exacerban la fotofobia y fonofobia."
        },
        {
          "accion": "Educar sobre el uso temprano del triptán.",
          "razon": "La eficacia es mayor si se administra al inicio del dolor."
        },
        {
          "accion": "Vigilar signos de abuso de analgésicos.",
          "razon": "Prevenir la cronificación de la cefalea por efecto rebote."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi9",
    "nombre": "Enfermedad de Alzheimer",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Pérdida de memoria episódica reciente (olvida eventos de hoy).",
        "Desorientación temporal y espacial.",
        "Dificultad para encontrar palabras (anomia).",
        "Apraxia (problemas para vestirse o usar cubiertos).",
        "Agnosia (no reconoce rostros familiares).",
        "Cambios en la personalidad y conducta (apatía, irritabilidad).",
        "Vagabundeo y alteraciones del sueño."
      ],
      "maniobraExploracion": "1. Mini-Mental State Examination (MMSE): Detección rápida de deterioro cognitivo. 2. Test del Dibujo del Reloj: Evaluación de funciones ejecutivas y visuoespaciales. 3. Evaluación Funcional (Katz/Lawton): Grado de dependencia en vida diaria.",
      "banderasRojas": [
        "Delirium sobreañadido (cambio brusco del sensorio).",
        "Caídas a repetición.",
        "Disfagia avanzada.",
        "Agresividad física o agitación psicomotriz extrema."
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Neurodegeneración caracterizada por el depósito extracelular de placas de proteína beta-amiloide y la formación intracelular de ovillos neurofibrilares de proteína tau hiperfosforilada.\n\nEsto causa disfunción sináptica masiva y muerte neuronal, afectando inicialmente el hipocampo y la corteza entorrinal.",
      "esquemaMental": {
        "inicio": "Acúmulo de amiloide y tau inflamatorio.",
        "dano": "Degeneración colinérgica y atrofia cerebral cortical.",
        "consecuencia": "Deterioro cognitivo progresivo e irreversible."
      },
      "cita": "Harrison, pág. 3200"
    },
    "manejo": {
      "diagnostico": "Criterios NIA-AA (clínico). Resonancia Magnética para ver atrofia hipocampal. Descartar causas reversibles (Hipo T4, déficit B12, Sífilis).",
      "tratamiento": "Inhibidores de la Acetilcolinesterasa y Antagonistas del NMDA.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Donepezilo", "dosis": "5-10 mg/día", "frecuencia": "Diaria, preferiblemente nocturna", "observaciones": "Mejora levemente la cognición. Efectos GI frecuentes (diarrea, bradicardia)." },
          { "nombre": "Memantina", "dosis": "10-20 mg/día", "frecuencia": "Diaria", "observaciones": "Útil en fases moderadas-graves. Protector contra la excitotoxicidad por glutamato." }
        ],
        "medidasGenerales": [
          "Estimulación cognitiva y mantenimiento de rutinas.",
          "Adaptación del hogar para evitar accidentes.",
          "Apoyo psicológico y respiro para el cuidador principal."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Evolución funcional y conductual.",
          "Estado nutricional y dental.",
          "Integridad de la piel (escaras en fases avanzadas)."
        ],
        "signosAlerta": [
          "Infecciones urinarias recurrentes (causa común de agitación).",
          "Pérdida de peso inexplicable.",
          "Signos de maltrato o negligencia del cuidador."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Estabilización de los síntomas cognitivos.",
          "Control satisfactorio de las alteraciones de conducta.",
          "Prevención de complicaciones por inmovilidad."
        ],
        "criteriosFracaso": [
          "Progresión rápida a estado vegetativo persistent.",
          "Burnout (síndrome de desgaste) severo del cuidador."
        ]
      },
      "cita": "GPC MSP Ecuador, Demencias"
    },
    "enfermeria": {
      "nanda": "00128 Confusión crónica / 00131 Deterioro de la memoria",
      "intervenciones": [
        {
          "accion": "Orientación a la realidad (calendarios, relojes grandes).",
          "razon": "Reduce la ansiedad derivada de la desorientación."
        },
        {
          "accion": "Establecer una rutina diaria estructurada.",
          "razon": "Brinda seguridad y reduce la agitación."
        },
        {
          "accion": "Promover la comunicación clara y sencilla.",
          "razon": "Facilita la interacción y reduce la frustración del paciente."
        }
      ],
      "cita": "NIC-NOC"
    }
  },
  {
    "id": "mi10",
    "nombre": "Meningitis Bacteriana Aguda",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Tríada Clásica: Fiebre + Rigidez de nuca + Alteración del sensorio.",
        "Cefalea intensa y persistente.",
        "Fotofobia y vómitos.",
        "Rash petequial (sugiere Meningococcemia).",
        "Crisis convulsivas de inicio reciente."
      ],
      "maniobraExploracion": "1. Signo de Brudzinski: Flexión involuntaria de caderas al flexionar el cuello. 2. Signo de Kernig: Dolor al intentar extender la pierna con la cadera flexionada. 3. Fondo de Ojo: Para descartar hipertensión endocraneal antes de punción lumbar.",
      "banderasRojas": [
        "Púrpura fulminans (Shock meningocócico).",
        "Glasgow < 10.",
        "Focalidad neurológica (sugiere absceso o infarto).",
        "Inestabilidad hemodinámica profunda."
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Colonización nasofaríngea seguida de invasión hemática y cruce de la barrera hematoencefálica. La replicación bacteriana en el LCR desencadena una respuesta inflamatoria purulenta masiva, aumentando la presión intracraneal y causando edema cerebral.",
      "esquemaMental": {
        "inicio": "Bacteriemia y cruce de barrera hematoencefálica.",
        "dano": "Inflamación purulenta de las meninges y exudado.",
        "consecuencia": "Edema cerebral, aumento de PIC y daño neuronal focal."
      },
      "cita": "Harrison, pág. 3250"
    },
    "manejo": {
      "diagnostico": "Punción Lumbar (LCR: Pleocitosis neutrofílica, hipoglucorraquia, hiperproteinorraquia). Tinción de Gram y Cultivo. TC previo si sospecha de masa o HTE.",
      "tratamiento": "Antibioticoterapia empírica inmediata + Dexametasona.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Ceftriaxona", "dosis": "2 g c/12h IV", "frecuencia": "c/12h", "observaciones": "Cubre S. pneumoniae y N. meningitidis." },
          { "nombre": "Vancomicina", "dosis": "15 mg/kg c/8-12h", "frecuencia": "Ajustada a niveles", "observaciones": "Para S. pneumoniae resistente a penicilina." },
          { "nombre": "Dexametasona", "dosis": "10 mg IV", "frecuencia": "20 min antes o con la 1ra dosis de ATB", "observaciones": "Reduce morbilidad y pérdida auditiva en S. pneumoniae." }
        ],
        "medidasGenerales": [
          "Aislamiento por gotas (primeras 24h de ATB).",
          "Manejo de la fiebre y control de líquidos.",
          "Quimioprofilaxis a contactos (si es N. meningitidis o H. influenzae)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Nivel de conciencia (Glasgow).",
          "Aparición de signos de focalidad neurológica.",
          "Diuresis y balance hídrico (riesgo de SIADH)."
        ],
        "signosAlerta": [
          "Signos de herniación (anisocoria, bradicardia).",
          "Extensión de lesiones purpúricas.",
          "Hipoacusia súbita."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Negativización de cultivos en 24-48h.",
          "Resolución de la fiebre y signos meníngeos.",
          "Recuperación completa del sensorio."
        ],
        "criteriosFracaso": [
          "Secuelas neurológicas permanentes (sordera, parálisis).",
          "Muerte por shock séptico o HTE."
        ]
      },
      "cita": "GPC MSP Ecuador, Meningitis Bacteriana"
    },
    "enfermeria": {
      "nanda": "00132 Dolor agudo / 00007 Hipertermia",
      "intervenciones": [
        {
          "accion": "Aislamiento respiratorio estricto inicial.",
          "razon": "Evitar brotes de meningitis meningocócica en el hospital."
        },
        {
          "accion": "Control riguroso de temperatura y administración de antipiréticos.",
          "razon": "Reducir la demanda metabólica cerebral."
        },
        {
          "accion": "Mantener cabecera a 30° y ambiente tranquilo.",
          "razon": "Favorecer el drenaje venoso y reducir la cefalea/PIC."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi11",
    "nombre": "Miastenia Gravis",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Debilidad muscular fluctuante (empeora con el uso y mejora con el reposo).",
        "Ptosis palpebral (caída del párpado) unilateral o bilateral.",
        "Diplopía (visión doble) intermitente.",
        "Voz nasal o disartria tras hablar por tiempo prolongado.",
        "Disfagia (dificultad para tragar sólidos/líquidos).",
        "Debilidad proximal de extremidades.",
        "Facies inexpresiva ('sonrisa miasténica')."
      ],
      "maniobraExploracion": "1. Prueba de Provocación Visual: Pedir al paciente que mantenga la mirada hacia arriba por 1-2 min (observar ptosis). 2. Prueba del Hielo: Aplicar hielo sobre el párpado ptósico por 2 min (mejora si es miastenia). 3. Evaluación de la voz: Contar hasta 50 en voz alta (observar fatiga vocal).",
      "banderasRojas": [
        "Crisis Miasténica: Insuficiencia respiratoria aguda por debilidad de músculos diafragmáticos.",
        "Disfagia severa con riesgo de aspiración inminente.",
        "Incapacidad para sostener la cabeza ('head drop')."
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Enfermedad autoinmune mediada por anticuerpos (principalmente anti-AChR) que bloquean o destruyen los receptores de acetilcolina en la unión neuromuscular postsináptica.\n\nEsto reduce el número de receptores funcionantes, disminuyendo la amplitud del potencial de placa terminal y causando fatiga muscular característica.",
      "esquemaMental": {
        "inicio": "Producción de autoanticuerpos (anti-AChR, anti-MuSK).",
        "dano": "Destrucción de la unión neuromuscular postsináptica.",
        "consecuencia": "Fallo en la transmisión del impulso y debilidad muscular fatigable."
      },
      "cita": "Harrison, pág. 3310"
    },
    "manejo": {
      "diagnostico": "Anticuerpos anti-AChR (positivos en 85%). Electromiografía de fibra única. Prueba de Edrofonio (Tensilon) - poco usada hoy por riesgo cardíaco.",
      "tratamiento": "Inhibidores de la Acetilcolinesterasa e Inmunosupresores.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Piridostigmina", "dosis": "30-60 mg c/4-6h", "frecuencia": "c/4-6h VO", "observaciones": "Tratamiento sintomático de primera línea. Ajustar dosis según respuesta." },
          { "nombre": "Prednisona", "dosis": "1 mg/kg/día inicial", "frecuencia": "Diaria", "observaciones": "Terapia inmunosupresora. Ojo: puede empeorar la debilidad al inicio." },
          { "nombre": "Azatioprina", "dosis": "2-3 mg/kg/día", "frecuencia": "Diaria", "observaciones": "Ahorrador de corticoides a largo plazo." }
        ],
        "medidasGenerales": [
          "Evitar fármacos que empeoran la miastenia (Aminoglucósidos, Quinolonas, Betabloqueantes, Magnesio).",
          "Timectomía: Indicada en pacientes con Timoma o AR positivas < 60 años.",
          "Plasmaféresis o Inmunoglobulina IV: Reservado para crisis miasténica o previo a cirugía."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Capacidad Vital Forzada (CVF) si hay sospecha de crisis respiratoria.",
          "Capacidad de deglución y manejo de secreciones.",
          "Efectos adversos colinérgicos (diarrea, bradicardia, sialorrea)."
        ],
        "signosAlerta": [
          "Dificultad respiratoria o uso de músculos accesorios.",
          "Incapacidad para tragar saliva.",
          "Crisis Colinérgica vs Miasténica (diferenciar por la clínica)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Estabilidad de la fuerza muscular durante el día.",
          "Mantenimiento de CVF normal.",
          "Reducción de la dosis de corticoides."
        ],
        "criteriosFracaso": [
          "Requerimiento de ventilación mecánica invasiva.",
          "Incapacidad para la deglución persistente."
        ]
      },
      "cita": "GPC MSP Ecuador, Miastenia Gravis"
    },
    "enfermeria": {
      "nanda": "00032 Patrón respiratorio ineficaz / 00103 Deterioro de la deglución",
      "intervenciones": [
        {
          "accion": "Planificar actividades en los momentos de mayor fuerza (tras medicación).",
          "razon": "Optimizar la energía y autonomía del paciente."
        },
        {
          "accion": "Vigilar estrechamente la mecánica respiratoria.",
          "razon": "Identificar precozmente una crisis miasténica inminente."
        },
        {
          "accion": "Administrar la piridostigmina 30-45 min antes de las comidas.",
          "razon": "Maximizar la fuerza de los músculos deglutorios durante la ingesta."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "mi12",
    "nombre": "Esclerosis Múltiple (EM)",
    "servicio": "Medicina Interna",
    "system": "Sistema Neurológico",
    "color": "#FFF3E0",
    "icon": "Stethoscope",
    "clinica": {
      "signosSintomas": [
        "Neuritis Óptica: Pérdida visual unilateral con dolor al mover el ojo.",
        "Mielitis Transversa: Debilidad o entumecimiento en extremidades con nivel sensitivo.",
        "Signo de Lhermitte: Sensación de descarga eléctrica al flexionar el cuello.",
        "Fenómeno de Uhthoff: Empeoramiento de síntomas con el calor (ej. ducha caliente).",
        "Diplopía por Oftalmoplejía Internuclear (OIN).",
        "Ataxia y temblor intencional (cerebeloso).",
        "Fatiga extrema e incontinencia urinaria."
      ],
      "maniobraExploracion": "1. Examen de Sensibilidad: Búsqueda de niveles sensitivos medulares. 2. Reflejos Osteotendinosos: Búsqueda de hiperreflexia y signo de Babinski (vía piramidal). 3. Evaluación de Marcha: Búsqueda de ataxia o espasticidad. 4. Fondo de Ojo: Detección de palidez papilar post-neuritis.",
      "banderasRojas": [
        "Pérdida visual bilateral súbita.",
        "Déficit motor motor ascendente rápido.",
        "Disfonía o disfagia severa.",
        "Retención urinaria aguda."
      ],
      "cita": "Harrison Principios de Medicina Interna, 21 ed."
    },
    "fisiopatologia": {
      "textoTecnico": "Enfermedad desmielinizante inmunomediada del Sistema Nervioso Central. Linfocitos T autorreactivos cruzan la barrera hematoencefálica, atacando la vaina de mielina y los axones, lo que genera placas de desmielinizacion y Gliosis.",
      "esquemaMental": {
        "inicio": "Activación inmune periférica contra antígenos de la mielina.",
        "dano": "Inflamación, desmielinización focal y degeneración axonal.",
        "consecuencia": "Interrupción de la conducción nerviosa (diseminación en espacio y tiempo)."
      },
      "cita": "Harrison, pág. 3340"
    },
    "manejo": {
      "diagnostico": "Criterios de McDonald 2017 (Diseminación en Espacio y Tiempo). Resonancia Magnética (Gadolinio) - Placas de desmielinización peri-ventriculares. Bandas oligoclonales en LCR.",
      "tratamiento": "Tratamiento de brotes con corticoides y Modificadores de la Enfermedad (DMT).",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Metilprednisolona", "dosis": "1 g/día IV", "frecuencia": "Por 3 a 5 días", "observaciones": "Solo para el manejo de brotes agudos incapacitantes." },
          { "nombre": "Interferón Beta / Acetato de Glatirámero", "dosis": "Según presentación", "frecuencia": "Subcutánea/IM", "observaciones": "Fármacos de primera línea clásicos para reducir la tasa de brotes." },
          { "nombre": "Fingolimod / Ocrelizumab", "dosis": "Variable", "frecuencia": "Oral / Infusión", "observaciones": "Terapias de alta eficacia para formas agresivas." }
        ],
        "medidasGenerales": [
          "Rehabilitación física y ocupacional.",
          "Tratamiento sintomático de la espasticidad (Baclofeno) y fatiga (Amantadina).",
          "Suplementación con Vitamina D si hay déficit."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Escala EDSS (Expanded Disability Status Scale).",
          "RM de control anual para detectar nuevas lesiones asintomáticas.",
          "Evaluación de la función vesical y sexual."
        ],
        "signosAlerta": [
          "Infecciones oportunistas (ej. Leucoencefalopatía Multifocal Progresiva - LMP) asociadas a biológicos.",
          "Deterioro cognitivo progresivo.",
          "Depresión y riesgo suicida."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "NEDA (No Evidence of Disease Activity): Sin brotes, sin progresión en EDSS, sin nuevas lesiones en RM.",
          "Mantenimiento de la deambulación independiente.",
          "Control de la fatiga."
        ],
        "criteriosFracaso": [
          "Progresión rápida a silla de ruedas (EDSS > 6).",
          "Acúmulo de carga lesional masiva en fosa posterior."
        ]
      },
      "cita": "GPC MSP Ecuador, Esclerosis Múltiple"
    },
    "enfermeria": {
      "nanda": "00085 Deterioro de la movilidad física / 00094 Riesgo de intolerancia a la actividad",
      "intervenciones": [
        {
          "accion": "Educar sobre el fenómeno de Uhthoff.",
          "razon": "Evitar exposiciones al calor que puedan simular un falso rebrote."
        },
        {
          "accion": "Fomentar el cateterismo intermitente si hay vejiga neurogénica.",
          "razon": "Prevenir infecciones urinarias recurrentes y daño renal."
        },
        {
          "accion": "Apoyo emocional y derivación a grupos de ayuda.",
          "razon": "La cronicidad y la incertidumbre de la enfermedad afectan la salud mental."
        }
      ],
      "cita": "Manual Reina Sofía"
    }
  },
  {
    "id": "em_cv_1",
    "nombre": "Infarto (IAMEST / IAMNEST)",
    "servicio": "Emergencias",
    "definicionCaso": "El Infarto Agudo de Miocardio es la necrosis coagulativa irreversible del músculo cardíaco secundaria a un desequilibrio crítico entre el aporte y la demanda de oxígeno, casi invariablemente debido a la oclusión coronaria brusca. El evento iniciador es frecuentemente la ruptura o erosión de una placa ateroesclerótica vulnerable, que expone al subendotelio al torrente sanguíneo, desencadenando una cascada de agregación plaquetaria y formación de un trombo oclusivo (parcial en IAMNEST, total en IAMEST). Este proceso impone un cambio metabólico severo del miocito hacia la glucólisis anaerobia, llevando a la acumulación de metabolitos ácidos, pérdida del potencial de membrana y, finalmente, a la muerte celular que progresa desde el endocardio hacia el epicardio (fenómeno de 'frente de onda').",
    "etiologia": "Primariamente aterosclerosis coronaria, agravada por factores predisponentes (hipertensión, dislipidemia, diabetes, tabaquismo). Factores precipitantes agudos incluyen esfuerzo físico extenuante, estrés emocional severo, arritmias rápidas o crisis hipertensivas que aumentan la demanda miocárdica de oxígeno.",
    "fisiopatologia": {
      "textoTecnico": "La oclusión coronaria abrupta detiene el flujo sanguíneo anterógrado, privando de oxígeno y sustratos al tejido miocárdico. Esto desencadena una serie de eventos: aturdimiento miocárdico (fase reversible), seguido de daño estructural irreversible (necrosis). La falta de ATP detiene las bombas iónicas, lo que causa edema celular y arritmias, y reduce la contractilidad segmentaria, manifestándose clínicamente como dolor opresivo y fallo de bomba.",
      "esquemaMental": {
        "inicio": "Oclusión coronaria abrupta por placa vulnerable.",
        "dano": "Necrosis miocárdica (isquemia irreversible) y pérdida de ATP.",
        "consecuencia": "Arritmias, fallo cardíaco y posible choque cardiogénico."
      },
      "cita": "Harrison, pág. 1450"
    },
    "complicaciones": [
      "Choque Cardiogénico",
      "Arritmias ventriculares letales (FV/TV)",
      "Insuficiencia Cardíaca Aguda",
      "Ruptura de pared libre o músculo papilar",
      "Pericarditis post-infarto",
      "Angina residual/reinfarto"
    ],
    "riesgosNoTratado": [
      "Muerte súbita por arritmia",
      "Insuficiencia cardíaca terminal (fracción de eyección muy baja)",
      "Aneurisma ventricular",
      "Tromboembolismo sistémico"
    ],
    "banderasRojas": [
      "Dolor torácico >20 min que no cede con reposo",
      "Hipotensión y signos de mala perfusión",
      "Congestión pulmonar (estertores)",
      "Nuevos soplos cardíacos",
      "Alteraciones dinámicas en el ECG (Supradesnivel ST)",
      "Elevación segmento ST (ECG)",
      "Arritmias ventriculares",
      "Fallo de bomba"
    ],
    "system": "Cardiovascular",
    "color": "#FFEBEE",
    "icon": "Activity",
    "clinica": {
      "signosSintomas": [
        "Dolor retroesternal opresivo irradiado a mandíbula/brazo izquierdo",
        "Diaforesis abundate",
        "Disnea de esfuerzo",
        "Náuseas y vómitos",
        "Gusto metálico o ansiedad severa"
      ],
      "maniobraExploracion": "Evaluación de repercusión hemodinámica (auscultación en busca de estertores S3/S4 para descartar fallo de bomba).",
      "banderasRojas": [
        "Hipotensión sostenida",
        "Arritmias ventriculares de inicio reciente",
        "Signos de shock cardiogénico",
        "Dolor sin respuesta a nitroglicerina"
      ],
      "cita": "AHA/ACC Guías de IAM"
    },
    "sintomasClave": [
        "Dolor retroesternal opresivo",
        "Irradiación a mandíbula o brazo",
        "Diaforesis",
        "Disnea",
        "Sensación de muerte inminente"
    ],
    "procedimientos": [
        "Realizar ECG de 12 derivaciones",
        "Acceso vascular periférico",
        "Administración de antiagregantes",
        "Monitorización hemodinámica continua"
    ],
    "manejo": {
      "diagnostico": "Electrocardiograma de 12 derivaciones en <10 minutos. Troponinas I/T ultra sensibles seriadas.",
      "tratamiento": "MONA (Morfina, Oxígeno, Nitroglicerina, Aspirina) - ajustado a guías actuales. Terapia de reperfusión (ICP primaria <90 min o Fibrinólisis <30 min si IAMEST).",
      "criterioReferencia": "Transferencia inmediata a unidad con capacidad quirúrgica y hemodinamia (ICP primaria < 90 min).",
      "cuidadosEnfermeria": "• Monitorización continua del segmento ST y ritmo cardíaco.\n• Reposo absoluto en cama en fase aguda (disposo de O2).\n• Asegurar dos accesos venosos periféricos permeables.\n• Administración oportuna de antiagregantes y anticoagulantes.\n• Valoración estricta del dolor torácico (escala EVA) y signos de falla de bomba.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Aspirina (Ácido Acetilsalicílico)", "dosis": "162 a 325 mg (masticada)", "frecuencia": "Dosis única inicial, luego 81-100 mg/día", "observaciones": "Contraindicada si hay alergia o sospecha de disección aórtica." },
          { "nombre": "Clopidogrel (o Ticagrelor)", "dosis": "Carga de 300-600 mg VO", "frecuencia": "Dosis única, luego 75 mg/día", "observaciones": "La dosis de carga depende si el paciente va a ICP o fibrinólisis." },
          { "nombre": "Nitroglicerina Sublingual", "dosis": "0.4 mg", "frecuencia": "Cada 5 min hasta 3 dosis", "observaciones": "Precaución: Contraindicada si PAS < 90 mmHg o si IAM es de ventrículo derecho." },
          { "nombre": "Heparina No Fraccionada (HNF)", "dosis": "Bolo 60 U/kg", "frecuencia": "Infusión 12 U/kg/h", "observaciones": "Titular según aPTT buscando rango terapéutico." }
        ],
        "medidasGenerales": [
          "Oxígeno suplementario solo si SatO2 < 90% o clínica de dificultad respiratoria.",
          "Preparar red para activación de Código Infarto y hemodinamia en < 90 min."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Electrocardiograma continuo de 12 derivaciones",
          "Presión arterial media y oximetría de pulso estricta",
          "Signos de hipoperfusión (Llenado capilar, estado de conciencia, diuresis)"
        ],
        "signosAlerta": [
          "Bradicardia extrema o Taquicardia Ventricular súbita",
          "Caída de PAS > 30 mmHg de la basal o < 90 mmHg (Shock Cardiogénico)",
          "Aparición repentina de nuevo soplo sistólico (Rotura de pared/papilar)",
          "Desaturación que requiere ventilación mecánica"
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Resolución del segmento ST en EKG de control tras reperfusión (> 50%).",
          "Alivio completo o parcial significativo del dolor anginoso.",
          "Estabilidad hemodinámica y perfusión tisular adecuada (Lactato normal)."
        ],
        "criteriosFracaso": [
          "Dolor persistente, refractario a nitratos y opioides.",
          "Falla de reperfusión (no mejora el ST tras fibrinolíticos).",
          "Desarrollo de insuficiencia cardíaca aguda / edema pulmonar (Killip III-IV)."
        ]
      },
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
    "definicionCaso": "La disección aórtica es una emergencia cardiovascular devastadora caracterizada por la ruptura de la túnica íntima, permitiendo el paso de sangre a alta presión hacia la túnica media arterial. Fisiopatológicamente, esto crea una 'falsa luz' dentro de la pared aórtica que propaga la disección longitudinalmente a lo largo del vaso. La falsa luz puede comprometer mecánicamente la luz verdadera (obstrucción de flujo) o invadir ramas arteriales críticas (coronarias, cerebrales, renales), generando isquemia de órgano blanco. Paralelamente, la presión transmural sobre la pared adelgazada puede llevar a una ruptura externa catastrófica, comúnmente hacia el saco pericárdico (causando taponamiento) o al espacio pleural (exanguinación), comprometiendo fatalmente la perfusión sistémica.",
    "etiologia": "Causada por hipertensión arterial crónica no controlada (factor principal), trastornos genéticos del tejido conectivo (ej. Síndrome de Marfan, Ehlers-Danlos), válvula aórtica bicúspide o trauma torácico de alta energía.",
    "fisiopatologia": {
      "textoTecnico": "La disfunción preexistente de la túnica media (degeneración quística o fibrosis) reduce la resistencia de la pared. Ante una oleada hipertensiva, el estrés de cizallamiento (shear stress) desgarra la íntima dañada. La sangre a alta presión diseca la capa media, propagando el desgarro. Esto puede ocluir la luz verdadera de las arterias ramificadas, causando infartos específicos de órgano (cerebral, cardíaco, renal), o debilitar la pared externa al punto de ruptura total.",
      "esquemaMental": {
        "inicio": "Estrés de cizallamiento hipertensivo sobre íntima debilitada.",
        "dano": "Formación de una falsa luz en la capa media con obstrucción o ruptura.",
        "consecuencia": "Isquemia multiorgánica y riesgo de ruptura catastrófica."
      },
      "cita": "Harrison, pág. 1822"
    },
    "complicaciones": [
      "Taponamiento cardíaco (por ruptura retrógrada)",
      "Accidente Cerebrovascular (oclusión de carótida)",
      "Isquemia mesentérica o renal aguda",
      "Insuficiencia aórtica aguda masiva",
      "Infarto de miocardio (si afecta ostium coronario)"
    ],
    "riesgosNoTratado": [
      "Muerte súbita por ruptura aórtica (exanguinación)",
      "Falla multiorgánica por isquemia sistémica",
      "Paro cardiorrespiratorio",
      "Choque hipovolémico/obstructivo irreversible"
    ],
    "banderasRojas": [
      "Dolor torácico 'desgarrador' o 'punzante' que migra",
      "Diferencia de PA >20 mmHg entre ambos brazos",
      "Ausencia de pulsos en extremidades",
      "Signos de insuficiencia aórtica nueva (soplo diastólico)",
      "Hipotensión severa inexplicable"
    ],
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
    "manejo": {
      "diagnostico": "Angio-TC de aorta con contraste (Gold Standard). ETE en inestables. Radiografía (ensanchamiento mediastínico).",
      "tratamiento": "Reducción agresiva y rápida de FC (Esmolol, Labetalol) y PA (Nitroprusiato) para PAS <120 y FC <60. Evaluación quirúrgica de emergencia (Especialmente tipo A de Stanford).",
      "criterioReferencia": "Transferencia emergente a tercer nivel con capacidad de Cirugía Cardiovascular para reparación urgente.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Esmolol (Betabloqueante)", "dosis": "Bolo 500 mcg/kg en 1 min", "frecuencia": "Infusión 50-200 mcg/kg/min", "observaciones": "Objetivo de FC estricto < 60 lpm. Debe administrarse ANTES que los vasodilatadores para evitar taquicardia refleja." },
          { "nombre": "Nitroprusiato de Sodio", "dosis": "Inicio 0.25 - 0.5 mcg/kg/min IV", "frecuencia": "Titulación continua", "observaciones": "Objetivo: PAS < 100-120 mmHg rápidamente." },
          { "nombre": "Morfina / Fentanilo", "dosis": "2 a 4 mg IV (Morfina) / 50-100 mcg IV (Fentanilo)", "frecuencia": "Según escala visual análoga (EVA)", "observaciones": "El control del dolor es crítico para reducir la descarga simpática y el desgarro aórtico." }
        ],
        "medidasGenerales": [
          "Evitar a toda costa la anticoagulación o fibrinolisis (Es un error común confundirlo con IAM).",
          "2 Vías periféricas de gran calibre y contacto inmediato con Cirugía Cardiovascular."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Presión intraarterial invasiva continua (línea arterial indispensable)",
          "Frecuencia y Ritmo Cardíaco continuo",
          "Pulsos periféricos en las 4 extremidades comparados cada 15 min",
          "Estado neurológico y Glasgow (riesgo isquémico)"
        ],
        "signosAlerta": [
          "Pérdida súbita de pulsos en extremidad (oclusión arterial periférica)",
          "Dolor precordial repentino + Hipotensión (Rotura al pericardio: Taponamiento)",
          "Falla renal oligúrica aguda (compromiso flujo arterias renales)",
          "Hemiparesia o afasia de inicio súbito (afectación carotídea)"
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "FC < 60 lpm y PAS < 120 mmHg sostenidas durante el traslado.",
          "Control estricto del dolor torácico.",
          "Aprobación y recepción inmediata en quirófano (Stanford A)."
        ],
        "criteriosFracaso": [
          "Desarrollo de hipotensión severa (Indica shock hemorrágico o taponamiento).",
          "Imposibilidad de controlar TA a pesar de terapia vasoplejica dual.",
          "Expansión documentada del área de desgarro en estudios secuenciales."
        ]
      },
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
    "definicionCaso": "Acumulación súbita y masiva de líquido en el espacio alveolar e intersticial pulmonar debido a un aumento crítico de la presión hidrostática capilar pulmonar, típicamente por fallo ventricular izquierdo agudo. La pérdida del gradiente de presión supera la permeabilidad endotelial y la capacidad de drenaje linfático, inundando los alvéolos, lo que causa una severa alteración de la barrera alvéolo-capilar impidiendo drásticamente el intercambio gaseoso.",
    "etiologia": "Principalmente causado por insuficiencia ventricular izquierda aguda (isquemia, arritmias, crisis hipertensiva). También puede ser no cardiogénico (SIRA, intoxicaciones).",
    "fisiopatologiaBasica": "El aumento de la presión hidrostática capilar supera la presión oncótica sanguínea, provocando la salida de líquido hacia los alvéolos, lo que genera hipoxemia severa y aumento del trabajo respiratorio.",
    "complicaciones": [
      "Falla respiratoria tipo I (hipoxémica)",
      "Choque cardiogénico",
      "Acidosis mixta (respiratoria y metabólica)",
      "Neumonía por aspiración",
      "Arritmias secundarias a hipoxia"
    ],
    "riesgosNoTratado": [
      "Muerte por asfixia súbita",
      "Paro cardiorrespiratorio",
      "Isquemia miocárdica secundaria a hipoxia",
      "Daño cerebral anóxico"
    ],
    "banderasRojas": [
      "Fatiga de músculos respiratorios (paradoja abdominal)",
      "Hipotensión severa",
      "Trastorno del sensorio",
      "Expectación rosada/asalmonada profusa",
      "Saturación de oxígeno <80% a pesar de O2"
    ],
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
      "criterioReferencia": "Transferencia a unidad de cuidados intensivos (UCI) si requiere ventilación mecánica o soporte inotrópico.",
      "cuidadosEnfermeria": "• Posición sentado (Fowler alto) con piernas colgando si es posible.\n• Monitorización estricta de balance hídrico y diuresis horaria.\n• Vigilancia de signos de fatiga muscular respiratoria e inminencia de intubación.\n• Control de electrolitos (especialmente potasio) por uso de diuréticos.\n• Vigilancia de presión arterial durante la infusión de vasodilatadores.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Furosemida (Diurético de Asa)", "dosis": "40 a 80 mg IV en bolo", "frecuencia": "Dosis inicial stat; luego valorar diuresis", "observaciones": "Promueve venodilatación temprana (< 5 min) y posterior diuresis (< 30 min). Doblar dosis oral domiciliaria si ya la usaba." },
          { "nombre": "Nitroglicerina (Infusión IV)", "dosis": "10 - 20 mcg/min inicial", "frecuencia": "Dosis en titulación progresiva cada 3-5 min", "observaciones": "Pilar para descargar el ventrículo y redistribuir volumen. Condicionado a PAS > 110 mmHg." }
        ],
        "medidasGenerales": [
          "Ventilación No Invasiva (CPAP/BiPAP): Presión de soporte mejora el intercambio y disminuye el retorno venoso.",
          "Sentar al paciente con las piernas colgando (vasopooling mecánico)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Trabajo respiratorio (Uso musculatura accesoria, frecuencia respiratoria)",
          "Oximetría continua y Gasometría Arterial horaria (Vigilancia de PaCO2 y PaO2)",
          "Control de diuresis (Volumen horario mediante sondaje vesical)",
          "Auscultación en tiempo real evaluando nivel de la marea crepitante"
        ],
        "signosAlerta": [
          "Alteración de conciencia, somnolencia extrema (Retención severa de CO2, fatiga).",
          "Caída abrupta de presión arterial < 90 mmHg (Inicia Shock Cardiogénico asociado).",
          "Taquipnea exahustiva > 40 rpm refractaria a soporte mecánico.",
          "Aparición de arritmias ventriculares de novo."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Aumento de la SatO2 > 93% y disminución franca de la disnea.",
          "Caída de la frecuencia respiratoria a < 24 rpm.",
          "Auscultación pulmonar que se aclara gradualmente (limpieza de bases).",
          "Diuresis efectiva de > 1-2 ml/kg/hr subsiguiente a la Furosemida."
        ],
        "criteriosFracaso": [
          "Fracaso de VNI: incapacidad para mantener SatO2 o PaO2 sin requerir intubación orotraqueal.",
          "Desarrollo de isquemia coronaria persistente secundaria a la hipoxia severa.",
          "Mantenimiento de acidosis respiratoria profunda por gasometría."
        ]
      },
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
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Salbutamol (Albuterol) IDM o NBZ", "dosis": "4-10 puffs (AeroCámara) o 2.5-5 mg (Nebulizado)", "frecuencia": "Cada 20 min en la 1ra hora", "observaciones": "Pilar angular. MDI con espaciador es igual de efectivo que nebulizador en urgencias." },
          { "nombre": "Bromuro de Ipratropio", "dosis": "4-8 puffs o 500 mcg NBZ", "frecuencia": "Cada 20 min en la 1ra hora (combinado)", "observaciones": "Sinergia probada. Retirar después de primera hora y continuar solo con b-agonistas." },
          { "nombre": "Metilprednisolona o Hidrocortisona", "dosis": "MetilP: 40-60mg IV / Hidro: 200mg IV", "frecuencia": "Bolo inicial, luego cada 6-8 hrs", "observaciones": "Reducción crucial del edema subepitelial tardío. Prednisona oral 50mg es opción viable si tolera V.O." },
          { "nombre": "Sulfato de Magnesio", "dosis": "1.2 a 2 gramos IV", "frecuencia": "Infusión única en 20-30 min", "observaciones": "Reservado para casos severos refractarios con FEV1 < 25-30%." }
        ],
        "medidasGenerales": [
          "Mantener oxigenación mediante mascarilla simple o reservorio. Objetivo SatO2: 93-95% (No exceder para evitar supresión de impulso y retención de CO2).",
          "Acompañamiento psicológico y control de ansiedad ambiental."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Peak Expiratory Flow (PEF) pre y post tratamiento",
          "Frecuencia respiratoria y uso efectivo del diafragma vs acccesorios",
          "Saturación de Oxígeno y capnografía continua si está disponible",
          "Frecuencia cardíaca (taquicardia es esperada por Salbutamol, pero vigilar disrritmias)"
        ],
        "signosAlerta": [
          "«Tórax Silente» (No se escuchan sibilancias por cierre crítico del lumen aéreo).",
          "Normalización repentina de la PaCO2 (40 mmHg) en una asma grave (Es señal de agotamiento inminente = Indicación de tubo).",
          "Pulsus paradoxus evidente y movimiento paradójico abdominal.",
          "Descenso del nivel de conciencia."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Desaparición del tiraje (uso de músculos accesorios).",
          "Mejora del Peak Flow a > 60-80% de su predicho o mejor personal.",
          "Mantenimiento de SatO2 > 92% en ambiente normal sin suplemento.",
          "Tolera el decúbito dorsal sin angustia."
        ],
        "criteriosFracaso": [
          "Requerimiento inevitable de Intubación Orotraqueal (IOT) y sedación profunda.",
          "Aparición de Neumomediastino / Neumotórax secundario al atrapamiento severo."
        ]
      },
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
    "definicionCaso": "Acumulación progresiva de aire en el espacio pleural que colapsa el pulmón ipsilateral. Actúa fisiológicamente como un mecanismo de válvula unidireccional que permite la entrada de aire pero no su salida, elevando peligrosamente la presión intratorácica. Esto desplaza el mediastino, reduce gravemente el retorno venoso al corazón por compresión de las venas cavas, resultando en un choque obstructivo de evolución rápida y letal.",
    "etiologia": "Generalmente secundario a trauma torácico penetrante o cerrado, ventilación por presión positiva mecánica, o complicaciones de procedimientos invasivos (vías centrales).",
    "fisiopatologiaBasica": "El aire entra al espacio pleural pero no puede salir (efecto válvula), aumentando la presión intratorácica, lo que colapsa el pulmón ipsilateral y empuja el corazón y grandes vasos hacia el lado opuesto.",
    "complicaciones": [
      "Choque Obstructivo",
      "Paro Cardiorrespiratorio",
      "Hipoxia severa refractaria",
      "Arritmias por desplazamiento mediastínico",
      "Enfisema subcutáneo masivo"
    ],
    "riesgosNoTratado": [
      "Muerte en minutos por colapso circulatorio",
      "Falla multiorgánica por hipoxia prolongada",
      "Daño cerebral hipóxico irreversible",
      "Acidosis respiratoria letal"
    ],
    "banderasRojas": [
      "Desviación de la tráquea al lado contralateral",
      "Ingurgitación yugular",
      "Hipotensión súbita (choque)",
      "Ausencia de ruidos respiratorios unilateral",
      "Timpanismo a la percusión"
    ],
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
      "criterioReferencia": "Referencia inmediata a tercer nivel tras estabilización (tubo de tórax) para manejo por Cirugía de Tórax.",
      "cuidadosEnfermeria": "• Posición Semi-Fowler (30-45°) para facilitar expansión.\n• Vigilancia del sistema de drenaje: burbujeo, nivel de agua, oscilación.\n• NUNCA pinzar el tubo durante el traslado (riesgo de neumotórax a tensión recidivante).\n• Curación diaria del sitio de inserción con técnica estéril.\n• Monitorización estricta de hemodinamia y SpO2.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Anestésico Local (Lidocaína 1-2%)", "dosis": "Según tamaño de zona, max 4mg/kg", "frecuencia": "Dosis única infiltrativa", "observaciones": "Infiltrar plano por plano si el tiempo y la emergencia lo permite pre-tubo." },
          { "nombre": "Fentanilo o Morfina (Analgesia IV)", "dosis": "Fentanilo 50-100 mcg IV", "frecuencia": "Bolos titulados", "observaciones": "Procedimiento muy doloroso. Titular para permitir confort sin depresión respiratoria extrema." }
        ],
        "medidasGenerales": [
          "Oxigenoterapia a alto flujo: Acelera la reabsorción del nitrógeno pleural.",
          "Descompresión inmediata con catéter angiogénico grueso (14G) y colocación de Tubo Torácico (28-32 Fr)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Burbujeo inicial en trampa de agua (confirmación de salida de aire pleural)",
          "Auscultación seriada confirmando re-expansión del murmullo",
          "Signos vitales de choque restrictivo: Presión Venosa Central y PAM"
        ],
        "signosAlerta": [
          "Re-acumulación súbita (Fuga masiva o tubo obstruido)",
          "Salida brusca de sangre por el tubo (> 1500 ml indica Toracotomía de emergencia)",
          "Edema pulmonar ex-vacuo (Re-expansión alveolar demasiado rápida provocando tos y esputo espumoso)"
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Retorno inmediato de la presión arterial por cese de compresión de vena cava.",
          "Resolución franca de la taquipnea y cianosis.",
          "Expansión pulmonar total confirmada en Rx Tórax de control."
        ],
        "criteriosFracaso": [
          "Persistencia o recidiva de inestabilidad hemodinámica post-tubo (descartar sangrado masivo o taponamiento).",
          "Fuga continua e insostenible de aire que impide la ventilación."
        ]
      },
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
      "tratamientoDetallado": {
        "farmacos": [
           { "nombre": "No Farmacológico (Soporte Vital Básico y Avanzado)", "dosis": "N/A", "frecuencia": "Continuo", "observaciones": "El enfoque inicial es puramente mecánico. Evitar fármacos depresores antes de asegurar A." }
        ],
        "medidasGenerales": [
          "Compresiones abdominales en 'J' (Maniobra de Heimlich) de pie hasta des-obstrucción o inconsciencia.",
          "Si hay inconsciencia: Compresiones cardíacas, laringoscopia directa e intento de extracción con Pinza Magill.",
          "Último recurso de emergencia pre-hospitalario: Cricotiroidotomía de urgencia."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Calidad de la tos y fonación persistente vs silenciada",
          "Tono muscular y nivel de conciencia de la víctima",
          "Saturación de oxígeno post-extracción y coloración de mucosa"
        ],
        "signosAlerta": [
          "Pérdida de tono y paso al paro cardiorrespiratorio",
          "Laceración traqueal o sangrado masivo post-extracción cruda",
          "Bradicardia periparada en niños especialmente"
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Expulsión física del estroma obstructivo.",
          "Recuperación inmediata del flujo aéreo y recuperación del reflejo tusígeno normal.",
          "Coloración retorna a rosada desde la cianosis en 1-2 minutos."
        ],
        "criteriosFracaso": [
          "Caída irreversible a asistolia que no responde a epinefrina/RCP.",
          "Incapacidad de realizar vía aérea quirúrgica en tiempo límite (3 mins cerebrales)."
        ]
      },
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
        "Paresia o asimetría facial de inicio súbito (B: Balance, E: Eyes, F: Face, A: Arms, S: Speech, T: Time)",
        "Debilidad motora en brazo o pierna (frecuente hemiparesia braquio-crural contra-lateral)",
        "Disartria (hablar traposo) o afasia (dificultad para emitir o comprender lenguaje)",
        "Alteraciones visuales (hemianopsia) o del equilibrio (ataxia súbita)",
        "Desviación oculocefálica ('mira la lesión')",
        "Cefalea súbita e intensa (más común en hemorrágicos, pero posible en isquémicos extensos)"
      ],
      "maniobraExploracion": "1. Escala de Cincinnati (Prehospitalario): Asimetría facial, caída del brazo, lenguaje anormal. 2. Escala NIHSS (Hospitalario): Evaluación sistematizada de 11 ítems (conciencia, mirada, campos visuales, paresia facial, motor, ataxia, sensibilidad, lenguaje, disartria, extinción). 3. Glucosa capilar obligatoria (descartar hipoglucemia). 4. Auscultación carotídea en busca de soplos.",
      "banderasRojas": [
        "NIHSS > 25 (Infarto masivo, alto riesgo de transformación hemorrágica)",
        "Tiempo de evolución desconocido o despertarse con el déficit (Wake-up stroke)",
        "Vómito súbito y depresión del sensorio (sugiere componente hemorrágico o HTE)",
        "Inestabilidad hemodinámica grave",
        "Signos de fosa posterior (vértigo intenso, diplopía, disfagia, compromiso de pares craneales)"
      ],
      "cita": "AHA/ASA Stroke Guidelines 2024"
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
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Alteplasa (rt-PA) Trombolítico", "dosis": "0.9 mg/kg (máx 90mg). 10% en bolo de 1 min, 90% restante en infusión de 60 min", "frecuencia": "Dosis inicial guiada por tiempo ventana de < 4.5 horas", "observaciones": "Altísimo riesgo hemorrágico. Firmar consentimiento. Solo para isquémicos documentados sin sangrado TC." },
          { "nombre": "Labetalol o Nicardipina", "dosis": "Labetalol 10-20 mg IV", "frecuencia": "Bolos IV repetibles / Infusión contínua", "observaciones": "Mantener PA < 180/105 antes de la alteplasa y durante las primeras 24h posteriores." },
          { "nombre": "Aspirina", "dosis": "160 a 300 mg VO/SNG", "frecuencia": "Dosis de carga (Solo 24h POST trombolisis)", "observaciones": "No dar simultáneamente con el rt-PA para no agravar riesgo sangrando cerebral." }
        ],
        "medidasGenerales": [
          "Posición en decúbito no > 30º de elevación si no tiene HTE (mejorar irrigación).",
          "NPO (Nada por Boca) estricto hasta evaluar maniobra de deglución de rutina (Escala GUSS)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Escala NIHSS pre y cada 2 horas (mide la severidad funcional)",
          "Examen pupilar y Glasgow detallado (riesgo de conversión hemorrágica sintomática)",
          "Glucemia capilar estricta, metas neurometabólicas de glucosa normo (140-180 mg/dL)"
        ],
        "signosAlerta": [
          "Cefalea repentina aguda o Vómitos post-trombolisis (Sugiere sangrado transformacional).",
          "PA que sobrepasa sistemáticamente límites marcados de 180 / 105.",
          "Desviación oculocefálica contraria o anisocoria que marca inicio de hernia."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Freno a la progresión del déficit isquémico medido por NIHSS.",
          "Recanalización evidente documentada (si aplica angiografía).",
          "Ausencia de complicaciones secundarias (neumonía broncoaspirativa, infección urinaria)."
        ],
        "criteriosFracaso": [
          "Transformación hemorrágica con caída mayor a 4 puntos en la NIHSS de base.",
          "Edema cerebral isquémico masivo (Infarto Maligno de la Cerebral Media) que requiere graneoctomía."
        ]
      },
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
        "Crisis convulsiva tónico-clónica generalizada > 5 minutos de duración (Tiempo T1)",
        "O repetición de convulsiones (≥ 2 crisis) sin recuperación completa del sensorio entre ellas",
        "Crisis focal persistente con alteración de conciencia (Status no convulsivo)",
        "Trismo (mandíbula trabada), cianosis perioral y sialorrea (salivación excesiva)",
        "Relajación de esfínteres e hipotensión/hipertensión reactiva",
        "Periodo postictal prolongado (> 20-30 min)"
      ],
      "maniobraExploracion": "1. Cronometraje estricto del tiempo desde el inicio (T1 a los 5 min, T2 irreversible a los 30 min). 2. Evaluación de vía aérea y protección de columna si hubo trauma. 3. Monitorización de temperatura (riesgo de hipertermia maligna por actividad muscular sostenida). 4. Búsqueda de papiledema (HTE) o signos meníngeos.",
      "banderasRojas": [
        "Tiempo de convulsión continua > 30 minutos (riesgo de daño cerebral permanente)",
        "Falla ventilatoria o hipoxemia refractaria",
        "Fiebre asociada (sospechar neuroinfección)",
        "Embarazo (Eclampsia - requiere sulfato de magnesio, no solo BZD)",
        "Traumatismo craneoencefálico concomitante"
      ],
      "cita": "NCS (Neurocritical Care Society) Guidelines for Status Epilepticus"
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
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Midazolam (Benzodiacepina)", "dosis": "10 mg IM (>40kg) o 0.2mg/kg", "frecuencia": "Terapia 1ra línea temprana de fácil acceso", "observaciones": "El lorazepam 4mg IV es el gold standard vascular, pero el midazolam IM es vital pre-hospitalario." },
          { "nombre": "Fenitoína (Antiepiléptico L2)", "dosis": "15-20 mg/kg IV en goteo lento", "frecuencia": "Dosis de carga única en 30 min", "observaciones": "Velocidad MAX 50mg/min para evitar hipotensión grave o bloqueo cardíaco. Administrar solo en Solución Salina." },
          { "nombre": "Levetiracetam (Antiepiléptico L2)", "dosis": "60 mg/kg (Max 4500mg)", "frecuencia": "Dosis de carga", "observaciones": "Seguro para pacientes hepatópatas, escasa interacción farmacológica y sin riesgo cardíaco." },
          { "nombre": "Propofol (Sedante L3)", "dosis": "Bolo 1-2 mg/kg, luego infusión", "frecuencia": "Mantenimiento contínuo estricto", "observaciones": "Solo bajo ventilación mecánica invasiva. Trata el estatus refractario inhibiendo el cerebro total." }
        ],
        "medidasGenerales": [
          "Colocar al paciente en posición de seguridad lateral si no sospecha LME.",
          "Preparar colchón antiescaras y proteger cabeza con almohadas. NUNCA forzar objetos bucales tipo mordedores."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Electroencefalograma (EEG) contínuo idealmente para descartar status epiléptico no convulsivo tras 1ra línea",
          "Signos de aspiración (SpO2, estertores roncantes pulmonares)",
          "Control de Temperatura, un status térmico prolongado produce rabdomiolisis"
        ],
        "signosAlerta": [
          "Ausencia de retorno a Glasgow base pasados 30 mins (sospechar coma o status no motor).",
          "Hipotensión sostenida y arritmias (Especialmente durante goteo de fenciones).",
          "Elevación hiperaguda de CPK (marcadora de daño renal inminente por mioglobinuria)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Cese clínico y neurográfico de toda espiga iterativa.",
          "Paciente despierto, cooperativo, siguiendo órdenes en las horas de recuperación.",
          "Estabilización ventilatoria respiratoria independiente."
        ],
        "criteriosFracaso": [
          "Reingreso al patrón epiléptico en cuanto se reduce la infusión tercera línea.",
          "Estatus Súper Refractario requiriendo ketamina o agentes inhalatorios experimentales."
        ]
      },
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
        "Cefalea súbita explosiva ('el peor dolor de mi vida') - Sugiere HSA",
        "Deterioro agudo del estado mental (Glasgow < 13 ó 15)",
        "Náuseas y vómitos en proyectil (por hipertensión endocraneana)",
        "Focalidad neurológica motora o sensitiva (hemiplejía)",
        "Alteraciones pupilares (anisocoria, midriasis parética)",
        "Rigidez de nuca (especialmente en HSA tardía o hematomas extensos)"
      ],
      "maniobraExploracion": "1. Escala de Glasgow detallada. 2. Búsqueda de Tríada de Cushing: Bradicardia + Hipertensión Arterial + Alteración en el patrón respiratorio (Indica herniación inminente). 3. Fondo de ojo para detectar Papiledema. 4. Evaluación exhaustiva de pares craneales (especialmente III, IV y VI).",
      "banderasRojas": [
        "Tríada de Cushing activa",
        "Pupila unilateral midriática y no reactiva (Hernia uncal)",
        "Postura de decorticación (flexión) o descerebración (extensión)",
        "Pérdida rápida del Glasgow (> 2 puntos en minutos)",
        "Crisis convulsivas post-hemorragia"
      ],
      "cita": "AHA/ASA Hemorrhagic Stroke Guidelines 2022"
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
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Labetalol / Nicardipina", "dosis": "Labetalol 10-20 mg IV en bolos", "frecuencia": "Titulado hasta PAS estricta < 140 mmHg", "observaciones": "Principal objetivo médico: Detener expansión del hematoma mediante control activo de tensión arterial." },
          { "nombre": "Manitol 20% / Salino Hipertónico", "dosis": "Manitol 0.5-1 g/kg IV central", "frecuencia": "Rescate de crisis", "observaciones": "Terapia osmótica de emergencia SOLO para herniación evidente (asimetría pupilar o cushing). Requiere Foley." },
          { "nombre": "Complejo Protrombínico (Reversor)", "dosis": "Según INR / Peso", "frecuencia": "Única, STAT", "observaciones": "Fundamental en pacientes anticoagulados con Warfarina o nuevos ACOS. (Junto con Vit K)." }
        ],
        "medidasGenerales": [
          "Cabecera neutra estricta a 30° para garantizar drenaje venoso yugular, cero compresión en cintos/collares.",
          "Tratamiento intensivo de fiebre, hiperglucemias (escala de insulina) y de crisis focales (profilactivo)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Presión Intracraneal (PIC) continua (Si hay drenaje ventricular colocado)",
          "Aniones y osmolaridad límite controlados cada 4-6 hrs",
          "Monitoreo neurológico mínimo cada 1 hora"
        ],
        "signosAlerta": [
          "Bradicardia asociada a Hipertensión Intratable (Tríada de Cushing clásica).",
          "Caída del GCS > 2 puntos.",
          "Pérdida súbita del tono del III par (Midriasis pupilar parético de Ojo ipsilateral)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Mantenimiento de presiones arteriales en meta, frenando el crecimiento tomográfico de la lesión.",
          "Resolución quirúrgica limpia de craniectomia u open de aneurisma y dren ventricular."
        ],
        "criteriosFracaso": [
          "Herniación trans-tentorial mortal a pesar de máximas medidas profilácticas de osmolar."
        ]
      },
      "criterioReferencia": "Solo transferir si no existe UCI neurológica o neurocirujano intrahospitalario. Su viaje pre-estabilizado exacerba el daño.",
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
        "Cinemática de alto impacto (eyección, caída > 6m, colisión alta velocidad)",
        "Alteración del estado de conciencia (Escala de Glasgow < 15)",
        "Dificultad respiratoria o ruidos ausentes (Neumotórax/Hemotórax)",
        "Hipotensión y taquicardia (Shock hipovolémico/obstructivo)",
        "Deformidades óseas evidentes o pelvis inestable",
        "Signos de irritación peritoneal (Hemorragia abdominal)"
      ],
      "maniobraExploracion": "1. Evaluación XABCDE (X: Exanguinación, A: Vía aérea + Control cervical, B: Respiración, C: Circulación, D: Déficit neurológico, E: Exposición). 2. Maniobra de compresión pélvica (solo una vez). 3. Tacto rectal (tono esfinteriano, próstata flotante). 4. Eco-FAST (Focalized Assessment with Sonography for Trauma).",
      "banderasRojas": [
        "Inestabilidad hemodinámica que no responde a cristaloides",
        "Tríada de la Muerte: Acidosis, Coagulopatía, Hipotermia",
        "Pupilas no reactivas o anisocoria (TEC grave)",
        "Tórax inestable (volet costal)"
      ],
      "cita": "Manual ATLS (Advanced Trauma Life Support), 10.ª ed."
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
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Ácido Tranexámico", "dosis": "1 gr IV en 10 min, luego 1 gr infusión de 8h", "frecuencia": "Administrar en < 3h tras trauma", "observaciones": "Bloquea fibrinólisis. Superado los >3 hrs aumenta perjudicialmente microtrombos diseminados." },
          { "nombre": "Hemoderivados Múltiples", "dosis": "Terapia Protocolo Masivo (1:1:1 de Plasma:G.R.:Plaquetas)", "frecuencia": "Bajo control de Tromboelastograma si disponible", "observaciones": "El shock clase 3 o 4 no responde solo a cristaloides de solución fisiológica; evitar darles exceso acuoso." },
          { "nombre": "Cloruro de Calcio o Gluconato", "dosis": "1 ampolla", "frecuencia": "Cada 4 transfundidas masivas", "observaciones": "Prevenir citrato-intoxicación hemostática." }
        ],
        "medidasGenerales": [
          "Cirugía de 'Control de Daños' (Damage Control): Operación corta de contención focal rápida sin búsqueda de perfección anatómica, dejando open abdomen.",
          "Calentamiento externo estricto: Bair Hugger, y calentadores M1 para líquidos en infusión (evita la hipotermia)."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Gasometría de control seriado de Base Excess (Déficit de Exceso de Base) y Lactato",
          "Gasto Urinario mediante foley (> 0.5 mL / Kg/ Hr es la meta general)",
          "Control contínuo espinal y alineación en log-roll"
        ],
        "signosAlerta": [
          "Desarrollo de Tríada de la Muerte Letal: Acidosis < 7.2, Hipotermia < 35 C, y PT/PTT coagulación alterado.",
          "Distensión y rigidez abdominal emergente post fluidoterapia (Sangrado esplénico o hepático contínuo).",
          "Síndrome Compartimental."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Estabilizar hemodinámica (PAM > 65), limpieza de lactato sérico en < 24 hrs post UTI.",
          "Transferencia fluida de quirófano en 60 mins posteriores de ingreso Shock Trauma."
        ],
        "criteriosFracaso": [
          "CID (Coagulación Intravascular Diseminada) refractario, hemorragias de las inserciones de las vías EV."
        ]
      },
      "criterioReferencia": "Solo transferir si no existe UCI neurológica o neurocirujano intrahospitalario.",
      "cita": "Advanced Trauma Life Support 10th Ed"
    },
    "enfermeria": {
      "nanda": "00024 Perfusión tisular ineficaz",
      "intervenciones": [
        { "accion": "Aplicación de presión directa o faja pélvica a evidencia de diástasis pélvica.", "razon": "Inmovilización detiene parcialmente hemorragias masivas retroperitoneales." },
        { "accion": "Administración perentoria de fluidos calentados.", "razon": "Hipotermia induce coagulopatía e interfiere con los funciones plaquetarias." }
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
        "Extensión > 20% de Superficie Corporal Total (SCT) en adultos",
        "Vibrisas nasales quemadas o esputo carbonáceo (Sugerente de Inhalación)",
        "Pérdida de sensibilidad en áreas de 3er grado (aspecto acartonado)",
        "Flictenas y dolor intenso en 2do grado",
        "Signos de hipovolemia (shock por quemadura)",
        "Estridor o sibilancias (Edema de vía aérea)"
      ],
      "maniobraExploracion": "1. Cálculo de SCT usando la Regla de los 9 (Wallace). 2. Evaluación de la profundidad (1°, 2° superficial/profunda, 3° grado). 3. Búsqueda de quemaduras circunferenciales (riesgo compartimental). 4. Laringoscopia si hay sospecha de compromiso subglótico.",
      "banderasRojas": [
        "Quemadura circunferencial en tórax o extremidades",
        "Evidencia de inhalación de humo (ronquera, estridor)",
        "Quemaduras por químicos o electricidad (daño interno oculto)",
        "Olíguria persistente (< 0.5 ml/kg/h)"
      ],
      "cita": "ABA (American Burn Association) Guidelines"
    },
    "fisiopatologia": {
      "textoTecnico": "Respuesta inmediata del cuerpo al daño térmico donde se aumenta la permeabilidad endotelial y hay extravasación general de líquidos perdiendo líquidos intravascular.",
      "esquemaMental": {
        "inicio": "Estrés térmico al epitelio que descompone matriz extracelular.",
        "dano": "Ruptura de barrera principal y filtración difusa (Third Spacing).",
        "consecuencia": "Choque por extravasación vascular e inmunosupresión global."
      },
      "cita": "Bates 13.ª Ed./ Tratado Fisiopatología Quemaduras"
    },
    "manejo": {
      "diagnostico": "Clínico en extensión por tablas métricas (SCT). Broncofibroscopia si hay sospecha de injuria inhalatoria térmica.",
      "tratamiento": "Manejo A (Vía Aérea protectora precozmente si hay signos inhalatorios), oxigenoterapia de > 10 L. Cristaloides de Fórmula de Parkland / Brooke revisadas: (2-4 mL * kg * %SCT) primera mitad en 8 horas post quemadura. Limpieza y vendajes estériles, sedoanalgesia profunda y manejo por unidad de especialidad.",
      "tratamientoDetallado": {
        "farmacos": [
          { "nombre": "Ringer Lactato", "dosis": "2 a 4 mL * Peso * %SCQ (Regla actual recomendada de 2ml)", "frecuencia": "Mitad del vol. total en primeras 8hs desde quemadura, el resto en 16hs.", "observaciones": "El Parkland ya no recomienda 4mL obligatorio, se da a 2mL para adultos térmicos evitando sobrehidratar (Fluid Creep)." },
          { "nombre": "Opiáceos Analgesia", "dosis": "Titulación estricta en bolo IV exclusivam.", "frecuencia": "Antes de debridamientos o apósitos continuos", "observaciones": "NUNCA por vía intramuscular/subcutánea, hay nula absorción en el paciente con edema periférico crítico." },
          { "nombre": "Toxoide Tetánico", "dosis": "0.5 mL IM", "frecuencia": "Paciente en urgencias", "observaciones": "Indispensable por herida grave y abierta." }
        ],
        "medidasGenerales": [
          "Colocación de sonda foley obligatoria a ingreso de la quemadura mayor al 15% SCT adulto.",
          "Vendajes con sulfadiazina argéntica previa limpieza clorexidina 1% o suero limpio/tibio."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Volumen urinario CADA HORA (Criterio oro de la reanimación hídrica: meta 0.5-1ml/kg/hr).",
          "Fibrobroncoscopía diaria si sospecha injuria térmica en vía",
          "Monitor cardiovascular y carboxihemoglobina basal arteria"
        ],
        "signosAlerta": [
          "Falta de pulso Doppler o extremidad cianótica en quemaduras en banda o escara circunferencial (Necesita Escharotomía urgente).",
          "Gasto Urinario < 30 mL en la primera hora (Escalar terapia de infusión)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Mantenimiento diuresis en 0.5 ml/kg/h con corrección a la baja progresiva de infusiones.",
          "Epitelización programada tras injertos tempranos en dermo/hipodermos."
        ],
        "criteriosFracaso": [
          "Evolución a Sepsis quemada de altísima morbidez por Pseudomonas aeruginosa."
        ]
      },
      "cita": "Protocolo Manejo Quemados Críticos"
    },
    "enfermeria": {
      "nanda": "00046 Deterioro de la integridad cutánea",
      "intervenciones": [
        { "accion": "Iniciar dos vías IV antes de que el edema masivo oculte la anatomía vascular.", "razon": "El secuestro capilar del choque del gran quemado limitará posteriores accesos." },
        { "accion": "Retirar joyería e inmovilizar de manera laxa.", "razon": "Edema compromete compartimentos produciendo efecto de torniquete vascular." }
      ],
      "cita": "Guía de Urgencias en Unidad Quemados"
    }
  },
  {
    "id": "em_trauma_3",
    "nombre": "Obstrucción Vía Aérea (OVACE)",
    "servicio": "Emergencias",
    "system": "Trauma",
    "color": "#FFF3E0",
    "icon": "Shield",
    "clinica": {
      "signosSintomas": [
        "Incapacidad para hablar o toser eficazmente",
        "Signo universal de atragantamiento (manos al cuello)",
        "Estridor laríngeo o ruidos respiratorios agudos",
        "Cianosis progresiva y agitación",
        "Pérdida de conciencia (en obstrucción completa prolongada)"
      ],
      "maniobraExploracion": "1. Evaluación de la tos (¿Puede toser?). 2. Inspección orofaríngea (solo si el objeto es visible y extraíble sin empujarlo). 3. Evaluación del estado de conciencia.",
      "banderasRojas": [
        "Silencio respiratorio absoluto",
        "Pérdida rápida del estado de alerta",
        "Bradicardia extrema (signo de hipoxia severa pre-paro)"
      ],
      "cita": "AHA CPR & ECC Guidelines"
    },
    "fisiopatologia": {
      "textoTecnico": "Bloqueo mecánico del flujo aéreo a nivel laríngeo o traqueal que impide la ventilación alveolar, provocando hipoxia hipercapnia rápida y paro cardiorrespiratorio por asfixia.",
      "esquemaMental": {
        "inicio": "Impacto de cuerpo extraño en la glotis.",
        "dano": "Cese total del intercambio gaseoso pulmonar.",
        "consecuencia": "Hipoxia cerebral irreversible en minutos."
      },
      "cita": "Manual de Medicina de Emergencia"
    },
    "manejo": {
      "diagnostico": "Clínico inmediato.",
      "tratamiento": "Maniobra de Heimlich (compresiones abdominales) en pacientes conscientes. Si inconsciente: RCP iniciando con compresiones y revisar vía aérea antes de ventilar. Criotiraidotomía de emergencia si falla maniobra básica.",
      "tratamientoDetallado": {
        "farmacos": [],
        "medidasGenerales": [
          "Compresiones abdominales subdiafragmáticas repetitivas.",
          "En lactantes: 5 golpes interescapulares y 5 compresiones torácicas.",
          "Intubación o cricotiroidotomía si el bloqueo no se resuelve."
        ]
      },
      "monitoreo": {
        "parametros": [
          "Saturación de oxígeno post-extracción",
          "Auscultación pulmonar bilateral"
        ],
        "signosAlerta": [
          "Persistencia de estridor tras extracción (indicativo de edema laríngeo)."
        ]
      },
      "evaluacion": {
        "criteriosExito": [
          "Expulsión del cuerpo extraño y recuperación de fonación/respiración espontánea."
        ],
        "criteriosFracaso": [
          "Paro cardiorrespiratorio no recuperable."
        ]
      },
      "cita": "AHA Guidelines"
    },
    "enfermeria": {
      "nanda": "00031 Limpieza ineficaz de vías aéreas",
      "intervenciones": [
        { "accion": "Realizar maniobras de desobstrucción según protocolo.", "razon": "Restablecer la ventilación de forma inmediata." },
        { "accion": "Preparar equipo de succión y vía aérea avanzada.", "razon": "Anticipar el fracaso de las maniobras manuales." }
      ],
      "cita": "NIC/NOC"
    },

  // MEDICINA INTERNA (Flashcards de Supervivencia)
  },
  {
    id: 'int_0_nac',
    nombre: 'NAC (Neumonía Adquirida en Comunidad)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Infección del parénquima pulmonar adquirida fuera hospitalaria.',
    sintomasClave: ['Tos productiva', 'Fiebre', 'Dolor pleurítico', 'Disnea'],
    clinica: {
      signosSintomas: [
        "Tos con expectoración (purulenta o herrumrosa).",
        "Fiebre (>38.5°C) y escalofríos.",
        "Dolor torácico tipo pleurítico.",
        "Taquipnea y uso de músculos accesorios.",
        "Crepitantes focalizados a la auscultación."
      ],
      maniobraExploracion: "1. Percusión: Matidez focalizada. 2. Auscultación: Estertores crepitantes y broncofonía. 3. Palpación: Aumento de vibraciones vocales.",
      banderasRojas: [
        "Confusión (Mental status change).",
        "Frecuencia Respiratoria > 30 rpm.",
        "Hipotensión arterial (PAS < 90 mmHg).",
        "Uremia (Urea > 20 mg/dL) o CURB-65 ≥ 2."
      ],
      cita: "ATS/IDSA Guidelines 2024"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Neumonía Adquirida en la Comunidad (NAC) es una infección aguda del tejido pulmonar. El evento disparador es la llegada y multiplicación de microorganismos patógenos (típicamente bacterias como *Streptococcus pneumoniae*) en los alvéolos, logrando evadir los mecanismos de defensa iniciales como el reflejo de la tos y los macrófagos alveolares.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Reacción Inflamatoria:** Al ser detectada la invasión bacteriana, el sistema inmunitario desencadena una oleada inflamatoria agresiva. Los capilares pulmonares se vuelven altamente permeables.
- **Formación del Exudado:** Plasma sanguíneo, glóbulos blancos, proteínas y eritrocitos invaden el interior de los alvéolos (Hepatización roja), ahogando el espacio donde antes había aire.
- **Consolidación:** Con los alvéolos obstruidos por pus y escombros celulares (Hepatización gris), esa región del pulmón se vuelve maciza como el hígado, incapaz de expandirse o llenarse de aire nuevo.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Las áreas "consolidadas" están llenas de líquido pero siguen recibiendo sangre (Efecto Shunt). La sangre pasa por el pulmón y sigue de largo sin recoger oxígeno, causando hipoxemia (bajada de oxígeno en sangre) que obliga al paciente a respirar rápido (taquipnea) y usar músculos auxiliares.
- **Sistema Cardiovascular:** El cuerpo intenta enviar aún más sangre para compensar la falta de oxígeno, aumentando la frecuencia cardíaca y la presión arterial. En casos graves, la inflamación sistémica provoca vasoplejía desencadenando Choque Séptico.
- **Sistema Seroso (Pleura):** Frecuentemente, la inflamación llega al borde exterior del pulmón, irritando la pleura y causando un dolor punzante al respirar profundo (Dolor pleurítico), y desencadenando un derrame pleural paraneumónico.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Respuesta de Fase Aguda:** El hígado recibe señales de estrés (citoquinas IL-6, TNF-alfa) y dispara la producción masiva de Proteína C Reactiva (PCR) y Procalcitonina (PCT), además de estimular la liberación de miles de leucocitos jóvenes desde la médula ósea al torrente sanguíneo (Leucocitosis con desviación a la izquierda).

### Correlación con Comorbilidades:
- **Enfermedad Pulmonar Obstructiva Crónica (EPOC):** Estos pacientes tienen el mecanismo de limpieza de las vías aéreas destruido por el tabaco, por lo que la bacteria se asienta y coloniza con extrema facilidad, transformando una NAC banal en un evento potencialmente mortal.`,
      esquemaMental: {
        inicio: "Inhalación/Aspiración de patógenos que evaden defensas locales.",
        dano: "Ocupación alveolar por exudado inflamatorio purulento.",
        consecuencia: "Consolidación pulmonar, alteración del intercambio gaseoso (hipoxemia) y sepsis."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: "RX Tórax (Infiltrado nuevo). Laboratorio: Procalcitonina (guía), Gram y Cultivo de esputo. Saturación O2.",
      tratamiento: "Antibioticoterapia empírica (Amoxi/Clav o Macrólidos). Oxigenoterapia si SatO2 <92%. Hidratación activa.",
      cita: "Guías GPC MSP Ecuador"
    },
    enfermeria: {
      nanda: '00031 Limpieza ineficaz de las vías aéreas',
      intervenciones: [
        { accion: 'Fisioterapia respiratoria y fomento de la tos.', razon: 'Ayuda a movilizar secreciones y mejorar la ventilación alveolar.' },
        { accion: 'Posición semi-Fowler (30-45°).', razon: 'Optimiza la expansión torácica y reduce el trabajo respiratorio.' },
        { accion: 'Control estricto de hidratación.', razon: 'Fluidifica las secreciones para facilitar su expulsión.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_1_epoc',
    nombre: 'EPOC (Exacerbación)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Limitación crónica al flujo aéreo, persistente y progresiva.',
    sintomasClave: ['Disnea crónica', 'Tos', 'Expectoración', 'Tabaquismo'],
    clinica: {
      signosSintomas: [
        "Aumento de la disnea y producción de esputo.",
        "Cambio en la purulencia del esputo (Criterios de Anthonisen).",
        "Tórax en tonel y respiración con labios fruncidos.",
        "Sibilancias y espiración prolongada.",
        "Uso de músculos accesorios (Signo de Hoover)."
      ],
      maniobraExploracion: "1. Inspección: Búsqueda de cianosis central y edemas (Cor pulmonale). 2. Auscultación: Disminución generalizada del murmullo vesicular.",
      banderasRojas: [
        "Fallo respiratorio agudo (PaO2 < 60 mmHg).",
        "Acidosis respiratoria (pH < 7.35).",
        "Confusión o somnolencia extrema.",
        "Inestabilidad hemodinámica asociada."
      ],
      cita: "Guide GOLD 2024"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una limitación crónica, progresiva y no totalmente reversible al flujo aéreo. El evento disparador es la exposición prolongada a partículas nocivas (tabaco o biomasa), lo que genera una inflamación persistente que remodela profundamente la arquitectura de las vías aéreas y el parénquima.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Bronquitis Crónica:** Hiperplasia de glándulas mucosas y estrechamiento de los bronquiolos, lo que aumenta la resistencia al paso del aire.
- **Enfisema:** Destrucción de las paredes alveolares y pérdida de la elasticidad pulmonar. Durante la espiración, la vía aérea pierde su sustento y colapsa prematuramente, atrapando aire en los pulmones (hiperinsuflación).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Aumento del volumen residual y aplanamiento del diafragma, lo que obliga al uso de músculos accesorios y genera fatiga respiratoria crónica.
- **Sistema Cardiovascular:** Vasoconstricción pulmonar hipóxica que deriva en hipertensión pulmonar y posterior fallo del ventrículo derecho (*Cor Pulmonale*).
- **Sistema Musculoesquelético:** Atrofia muscular sistémica debida a la inflamación crónica por citoquinas y el sedentarismo condicionado por la disnea.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Desequilibrio Proteasa-Antiproteasa:** El humo del tabaco inactiva la alfa-1 antitripsina y estimula las elastasas leucocitarias, degradando literalmente el tejido elástico del pulmón.
- **Estrés Oxidativo:** La liberación masiva de radicales libres de oxígeno perpetúa la inflamación incluso después de cesar la exposición al tabaco.

### Correlación con Comorbilidades:
- **Enfermedad Cardiovascular:** La inflamación sistémica del EPOC acelera la aterosclerosis y aumenta el riesgo de infarto de miocardio.
- **Osteoporosis:** Favorecida por el uso frecuente de corticoides, la inactividad física y el tabaquismo activo.`,
      esquemaMental: {
        inicio: "Exposición a tabaco/biomasa.",
        dano: "Bronquitis crónica y enfisema.",
        consecuencia: "Obstrucción irreversible al flujo aéreo."
      },
      cita: "Guide GOLD 2024"
    },
    manejo: {
      diagnostico: "Espirometría (VEF1/CVF < 0.70 post-broncodilatador). RX Tórax: Hiperinsuflación, aumento del espacio claro retroesternal.",
      tratamiento: "Broncodilatadores (SABA/SAMA o LABA/LAMA). Corticoides sistémicos si hay exacerbación. Oxígeno si SatO2 <88%.",
      cita: "Guías GOLD 2024"
    },
    enfermeria: {
      nanda: '00030 Deterioro del intercambio de gases',
      intervenciones: [
        { accion: 'Educación en respiración con labios fruncidos.', razon: 'Mantiene la presión positiva en la vía aérea y previene el colapso bronquial.' },
        { accion: 'Vigilar la administración de oxígeno alto flujo.', razon: 'En EPOC retenedor, el exceso de O2 puede suprimir el estímulo hipóxico respiratorio.' },
        { accion: 'Asistir en la nutrición fraccionada.', razon: 'Reduce el esfuerzo respiratorio durante la deglución.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_2_asmabronquial',
    nombre: 'Asma Bronquial (Crisis)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Inflamación de la vía aérea reversible con broncoespasmo variable.',
    sintomasClave: ['Sibilancias', 'Tos nocturna', 'Opresión torácica', 'Atopia'],
    clinica: {
      signosSintomas: [
        "Sibilancias espiratorias difusas.",
        "Tos seca persistente (frecuente en la noche).",
        "Sensación de opresión en el pecho.",
        "Prolongación del tiempo espiratorio.",
        "Taquipnea y taquicardia."
      ],
      maniobraExploracion: "1. Auscultación: Sibilancias polifónicas. 2. Palpación: Tórax hiperinsuflado. 3. Evaluación de la capacidad de hablar frases completas.",
      banderasRojas: [
        "Tórax silente (Obstrucción crítica).",
        "Uso de músculos accesorios marcado.",
        "Disminución de conciencia (Narcosis por CO2).",
        "Pulsus paradoxus > 20 mmHg.",
        "Hipotensión o bradicardia paradójica terminal."
      ],
      cita: "GINA 2023 Guidelines"
    },
    fisiopatologia: {
      textoTecnico: "Enfermedad inflamatoria crónica caracterizada por hiperreactividad de las vías aéreas y obstrucción reversible al flujo aéreo, mediada frecuentemente por una respuesta tipo I (IgE) que provoca remodelado crónico.",
      esquemaMental: {
        inicio: "Gatillo (Alergeno, frío, ejercicio).",
        dano: "Broncoconstricción e inflamación de la mucosa (mediada por Leucotrienos/histamina).",
        consecuencia: "Obstrucción variable y reversible al flujo aéreo y posible remodelado crónico."
      },
      cita: "GINA 2023 Guidelines"
    },
    manejo: {
      diagnostico: "Clínico + Espirometría (Reversibilidad >12% y 200ml post-BD). Peak Flow en crisis.",
      tratamiento: "SABA (Salbutamol) de rescate. Corticoides inhalados (mantenimiento). Corticoides sistémicos en crisis severas.",
      cita: "Guías GINA 2023"
    },
    complicaciones: [
      "Insuficiencia respiratoria aguda.",
      "Atelectasias pulmonares.",
      "Neumotórax secundario a barotrauma.",
      "Asma de difícil control (remodelado)."
    ],
    enfermeria: {
      nanda: '00031 Limpieza ineficaz de vías aéreas',
      intervenciones: [
        { accion: 'Instruir en el uso de inhaladores.', razon: 'La técnica correcta asegura que el medicamento llegue eficazmente a las vías respiratorias inferiores.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_8_tuberculosispulmonar',
    nombre: 'Tuberculosis Pulmonar (TB)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Infección por Mycobacterium tuberculosis afectando el parénquima.',
    sintomasClave: ['Tos crónica (>15 días)', 'Fiebre nocturna', 'Pérdida de peso', 'Hemoptisis'],
    clinica: {
      signosSintomas: [
        "Tos persistente con expectoración por más de 2 semanas.",
        "Sudoración nocturna y fiebre vespertina.",
        "Pérdida de peso involuntaria y anorexia.",
        "Astenia y adinamia marcadas.",
        "Hemoptisis en casos avanzados (Cavernas)."
      ],
      maniobraExploracion: "1. Auscultación: Estertores crepitantes en vértices pulmonares. 2. Búsqueda de adenopatías cervicales o supraclaviculares.",
      banderasRojas: [
        "Hemoptisis masiva (>500ml en 24h).",
        "Disnea súbita (posible Neumotórax o Derrame asociado).",
        "Signos de diseminación (Rigidez nuca, dolor lumbar).",
        "Insuficiencia respiratoria aguda.",
        "Confusión mental o estupor (hipoxia severa)."
      ],
      cita: "WHO TB consolidated guidelines 2024"
    },
    fisiopatologia: {
      textoTecnico: `La Tuberculosis (TB) es una infección granulomatosa crónica causada por *Mycobacterium tuberculosis*. El evento disparador es la inhalación de gotas de Flügge que transportan los bacilos hacia las zonas más oxigenadas del pulmón (lóbulos superiores), donde evaden la destrucción inicial por parte de los macrófagos alveolares, formando granulomas crónicos que posteriormente pueden cavitarse.`,
      esquemaMental: {
        inicio: "Inhalación de bacilos.",
        dano: "Inflamación granulomatosa crónica, necrosis caseosa y evasión inmunitaria.",
        consecuencia: "Cavitación pulmonar, destrucción tisular y diseminación."
      },
      cita: "Harrison's principles of medicine"
    },
    manejo: {
      diagnostico: "BK esputo, GeneXpert, RX Tórax.",
      tratamiento: "Esquema DOTS.",
      cita: "OMS"
    },
    complicaciones: [
      "Hemoptisis masiva.",
      "Insuficiencia respiratoria crónica.",
      "Bronquiectasias post-TB.",
      "Diseminación extrapulmonar."
    ],
    enfermeria: {
      nanda: '00104 Deterioro de la resiliencia',
      intervenciones: [
        { accion: 'Aislamiento respiratorio.', razon: 'Previene transmisión.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_11_cncerdepulmn',
    nombre: 'Cáncer de Pulmón',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Neoplasia maligna primaria de las vías respiratorias.',
    sintomasClave: ['Tos persistente', 'Hemoptisis', 'Pérdida de peso', 'Disnea'],
    clinica: {
      signosSintomas: [
        "Tos persistente que no cede con tratamiento habitual.",
        "Hemoptisis (expectoración con sangre).",
        "Disnea progresiva y dolor torácico sordo.",
        "Pérdida de peso involuntaria.",
        "Síndromes paraneoplásicos."
      ],
      maniobraExploracion: "1. Auscultación: Disminución de ruidos respiratorios focalizada. 2. Palpación: Adenopatías supraclaviculares.",
      banderasRojas: [
        "Síndrome de vena cava superior.",
        "Dolor óseo.",
        "Déficit neurológico focal."
      ],
      cita: "NCCN Guidelines"
    },
    fisiopatologia: {
      textoTecnico: "Neoplasia maligna derivada del epitelio bronquial, resultado de acumulación de mutaciones genéticas (oncogenes/supresores tumorales) que inducen proliferación incontrolada, invasión local y metástasis a distancia mediante vías linfáticas o hematógenas.",
      esquemaMental: {
        inicio: "Daño genético acumulado (tabaco, carcinógenos).",
        dano: "Proliferación celular descontrolada e invasión tisular.",
        consecuencia: "Fallo respiratorio, obstrucción de vía aérea y metástasis sistémica."
      },
      cita: "NCCN Guidelines"
    },
    manejo: {
      diagnostico: "TC tórax/abdomen + PET/CT, Broncoscopia/Biopsia.",
      tratamiento: "Cirugía, Quimioterapia, Radioterapia, Inmunoterapia según estadio.",
      cita: "NCCN Guidelines"
    },
    complicaciones: [
      "Síndrome de Vena Cava Superior.",
      "Metástasis óseas y cerebrales.",
      "Derrame pleural maligno/obstrucción bronquial."
    ],
    enfermeria: {
      nanda: '00032 Patrón respiratorio ineficaz',
      intervenciones: [
        { accion: 'Manejo del dolor oncológico.', razon: 'El dolor interfiere con la mecánica ventilatoria.' },
        { accion: 'Apoyo nutricional.', razon: 'Contrarrestate el estado catabólico.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_4_derramepleural',
    nombre: 'Derrame Pleural (Estudio)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Acumulación de líquido en el espacio pleural.',
    sintomasClave: ['Disnea', 'Dolor pleurítico', 'Tos seca'],
    clinica: {
      signosSintomas: [
        "Disnea progresiva.",
        "Dolor punzante que aumenta con la tos.",
        "Tos irritativa seca."
      ],
      maniobraExploracion: "1. Percusión: Matidez 'leñosa'. 2. Auscultación: Abolición del murmullo vesicular.",
      banderasRojas: ["Derrame masivo", "Empiema"],
      cita: "Harrison's"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Derrame Pleural es un desequilibrio entre formación y absorción de líquido.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión:**
- **Exudado vs Trasudado:** Diferenciado por los Criterios de Light.
- **Reducción del Volumen Inspiratorio:** El líquido comprime el pulmón afectado.

### Alteraciones Hormonales y Bioquímicas:
- **Proteínas y LDH:** Marcadores de inflamación pleural.
- **pH Pleural:** Un pH bajo sugiere derrame complicado.

### Correlación con Comorbilidades:
- **Cirrosis Hepática:** Puede causar hidrotórax hepático debido al paso directo de líquido ascítico a través de pequeños defectos en el diafragma.
- **Cáncer Metastásico:** La pleura es un sitio frecuente de siembra tumoral; el derrame neoplásico es habitualmente hemorrágico y recidivante.`,
      esquemaMental: {
        inicio: "Desequilibrio de fuerzas de Starling o inflamación pleural.",
        dano: "Ocupación de espacio pleural por líquido.",
        consecuencia: "Compresión pulmonar y restricción ventilatoria."
      },
      cita: "Bates' Guide to Physical Examination"
    },
    manejo: {
      diagnostico: "RX Tórax (Borro de ángulos costofrénicos). Ecografía pleural (más sensible). Toracocentesis para Criterios de Light (Proteínas, LDH).",
      tratamiento: "Drenaje del líquido (Toracocentesis terapéutica) si hay compromiso respiratorio. Tratamiento de la causa base (Falla cardiaca, Neumonía, Cáncer).",
      cita: "Guías BTS (British Thoracic Society)"
    },
    enfermeria: {
      nanda: '00032 Patrón respiratorio ineficaz',
      intervenciones: [
        { accion: 'Posicionar al paciente sobre el lado sano (inicialmente) o semi-Fowler.', razon: 'Mejora la expansión pulmonar del pulmón no afectado.' },
        { accion: 'Monitorear ruidos respiratorios tras toracocentesis.', razon: 'Identificar precozmente un neumotórax iatrogénico.' },
        { accion: 'Cuidados del tubo de tórax (si aplica).', razon: 'Asegurar la permeabilidad y hermeticidad del sistema de drenaje.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_5_abscesopulmonar',
    nombre: 'Absceso Pulmonar',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Necrosis del parénquima pulmonar con formación de cavidades.',
    sintomasClave: ['Fiebre prolongada', 'Vómica', 'Halitosis', 'Tos productiva'],
    clinica: {
      signosSintomas: [
        "Fiebre héctica (oscilante) y sudoración nocturna.",
        "Tos con vómica (expulsión brusca de gran cantidad de pus/moco fétido).",
        "Halitosis fétida (sugiere anaerobios).",
        "Pérdida de peso y anemia de procesos crónicos.",
        "Dolor torácico y astenia."
      ],
      maniobraExploracion: "1. Percusión: Matidez en zona afectada. 2. Auscultación: Soplo cavitario (si la cavidad es grande y está drenada) o crepitantes anfibios.",
      banderasRojas: [
        "Hemorragia pulmonar masiva (Hemoptisis masiva).",
        "Ruptura al espacio pleural (Empiema/Neumotórax a tensión).",
        "Sepsis refractaria.",
        "Incapacidad para drenar secreciones."
      ],
      cita: "Harrison's Principles of Internal Medicine"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Absceso Pulmonar es una infección necrotizante caracterizada por la formación de una cavidad llena de pus en el parénquima pulmonar. El evento disparador suele ser la microaspiración de contenido orofaríngeo (rico en bacterias anaerobias) en pacientes con disminución del estado de conciencia o mala higiene dental.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Neumonía Necrotizante Inicial:** La invasión bacteriana causa una respuesta inflamatoria tan intensa que destruye la arquitectura de los alvéolos.
- **Licuefacción y Drenaje:** El tejido muerto se desintegra formando pus; cuando este absceso "estalla" hacia un bronquio, el contenido se drena, permitiendo la entrada de aire y formando el nivel hidroaéreo característico en las imágenes.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** El drenaje espontáneo del absceso puede causar la asfixia del pulmón contralateral (Vómica). La cicatrización posterior puede dejar bronquiectasias locales permanentes.
- **Sistema Metabólico:** El estado supurativo crónico genera una anemia de procesos inflamatorios y una hipoproteinemia severa por el consumo de recursos inmunes.
- **Sistema Neurológico:** Riesgo de embolia séptica, donde bacterias del absceso pulmonar pasan a la circulación sistémica y provocan abscesos cerebrales metastásicos.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Enzimas Proteolíticas:** Liberadas por bacterias anaerobias y neutrófilos, degradan las fibras de colágeno y elastina del pulmón de forma irreversible.
- **Interleucina-6 (IL-6):** Marcador elevado que orquesta la respuesta de fase aguda y causa la fiebre héctica persistente.

### Correlación con Comorbilidades:
- **Alcoholismo y Epilepsia:** Son los dos principales factores de riesgo por el aumento masivo del riesgo de broncoaspiración durante episodios de inconsciencia.
- **Enfermedad Periodontal:** Proporciona un reservorio masivo de bacterias anaerobias (como *Fusobacterium*) que son las responsables directas de la necrosis gaseosa.`,
      esquemaMental: {
        inicio: "Aspiración de material orofaríngeo.",
        dano: "Inflamación supurativa y necrosis del parénquima.",
        consecuencia: "Cavitación y formación de niveles hidroaéreos."
      },
      cita: "Fisiopatología Quirúrgica"
    },
    manejo: {
      diagnostico: "RX Tórax (Imagen cavitada con nivel hidroaéreo). TAC de tórax (Define mejor la localización). Cultivo de líquido pleural o esputo.",
      tratamiento: "Antibioticoterapia prolongada (4-6 semanas: clindamicina o amoxi/clav). Fisioterapia respiratoria para drenaje postural.",
      cita: "Guías IDSA"
    },
    enfermeria: {
      nanda: '00031 Limpieza ineficaz de vías aéreas',
      intervenciones: [
        { accion: 'Drenaje postural según localización del absceso.', razon: 'La gravedad facilita la evacuación de las secreciones purulentas del absceso.' },
        { accion: 'Higiene bucal frecuente.', razon: 'Reduce la carga bacteriana orofaríngea y mejora el confort ante la halitosis.' },
        { accion: 'Vigilancia de la vómica.', razon: 'Prevenir la aspiración del material purulento al pulmón contralateral durante la expulsión.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_6_edemaagudodepulmneap',
    nombre: 'Edema Agudo de Pulmón (EAP)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Acumulación de líquido en los alvéolos por falla cardíaca aguda.',
    sintomasClave: ['Disnea severa', 'Ortopnea', 'Esputo asalmonado', 'Agitación'],
    clinica: {
      signosSintomas: [
        "Disnea súbita y extrema (sed de aire).",
        "Ortopnea (mejoría al sentarse).",
        "Expectoración espumosa de color rosado/asalmonado.",
        "Cianosis distal y diaforesis profusa.",
        "Sensación de muerte inminente."
      ],
      maniobraExploracion: "1. Auscultación: Estertores crepitantes bilaterales 'in crescendo' (marea montante). 2. Auscultación cardiaca: Presencia de S3 (galope ventricular).",
      banderasRojas: [
        "Fatiga de los músculos respiratorios.",
        "Hipoxia refractaria a oxígeno suplementario.",
        "Hipotensión (Shock cardiogénico asociado).",
        "Bradicardia extrema."
      ],
      cita: "ESC Guidelines on Heart Failure 2024"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Edema Agudo de Pulmón (EAP) es una emergencia médica caracterizada por la acumulación súbita de líquido en los espacios alveolares, impidiendo el intercambio gaseoso. El evento disparador suele ser un fallo agudo del ventrículo izquierdo, que provoca un aumento masivo de la presión retrógrada hacia los capilares pulmonares, superando la capacidad de drenaje de los vasos linfáticos.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Clasificación Hemodinámica:** La presión hidrostática capilar supera la presión oncótica, forzando la salida de trasudado hacia el intersticio y luego hacia el interior del alvéolo.
- **Fase de Inundación Alveolar:** El líquido diluye el surfactante pulmonar, provocando el colapso de los alvéolos (atelectasias microfocales) y una caída drástica de la distensibilidad pulmonar.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Shunt intrapulmonar masivo; la sangre pasa por alvéolos llenos de líquido sin oxigenarse, causando hipoxemia refractaria y acidosis respiratoria.
- **Sistema Cardiovascular:** El esfuerzo respiratorio heroico aumenta la presión intratorácica, lo que irónicamente puede ayudar a reducir la precarga pero a costa de un consumo de oxígeno miocárdico insostenible.
- **Sistema Nervioso:** La hipoxia cerebral genera una agitación psicomotriz extrema, lo que se traduce clínicamente como "sed de aire" y sensación de muerte inminente.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Péptidos Natriuréticos (BNP/NT-proBNP):** Sus niveles se disparan ante el estiramiento agudo de las paredes ventriculares, sirviendo como el marcador bioquímico de oro para diferenciar el origen cardíaco del pulmonar.
- **Catecolaminas:** La respuesta simpática masiva causa vasoconstricción periférica (palidez y sudoración fría) e hipertensión, aumentando la poscarga y empeorando el fallo de bomba.

### Correlación con Comorbilidades:
- **Hipertensión Arterial Crónica:** El ventrículo izquierdo hipertrófico es muy rígido; ante una elevación brusca de la TA, no puede relajarse y "se encharca" rápidamente.
- **Insuficiencia Renal:** La incapacidad de manejar el volumen de líquidos predispone a episodios de EAP por sobrecarga hídrica pura.`,
      esquemaMental: {
        inicio: "Disfunción cardíaca aguda (IAM, Crisis HTA).",
        dano: "Aumento de presión hidrostática en capilares pulmonares.",
        consecuencia: "Edema alveolar y fallo respiratorio hipoxémico."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: "RX Tórax (alas de mariposa), Pro-BNP, Ecocardiograma.",
      tratamiento: "LMNOP: Furosemida, Nitratos, Oxígeno (VNI), Posición.",
      cita: "ESC Guidelines"
    },
    enfermeria: {
      nanda: '00030 Deterioro del intercambio de gases r/c cambios en la membrana alveolocapilar p/v hipoxemia y estertores.',
      intervenciones: [
        { accion: 'Posicionamiento inmediato en Fowler alta o ortopneica con piernas declives.', razon: 'Reduce el retorno venoso y mejora la excursión diafragmática.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_9_bronquiectasias',
    nombre: 'Bronquiectasias',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Dilatación irreversible de los bronquios por inflamación crónica.',
    sintomasClave: ['Tos productiva crónica', 'Expectoración abundante', 'Hemoptisis', 'Infecciones recurrentes'],
    clinica: {
      signosSintomas: [
        "Tos crónica productiva con grandes volúmenes de esputo purulento.",
        "Hemoptisis de repetición.",
        "Disnea progresiva y sibilancias focalizadas.",
        "Halitosis y fatiga crónica."
      ],
      maniobraExploracion: "1. Auscultación: Crepitantes gruesos y roncantes.",
      banderasRojas: ["Hemoptisis masiva", "Insuficiencia respiratoria aguda"],
      cita: "Guías BTS"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Bronquiectasia es una dilatación anormal e irreversible de los bronquios. El evento disparador es un ciclo vicioso de infección e inflamación. Una agresión inicial (como una neumonía grave) impide la limpieza del moco, permitiendo que las bacterias colonicen y destruyan el cartílago bronquial.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Disfunción Mucociliar:** El moco se estanca, convirtiéndose en un caldo de cultivo bacteriano.
- **Destrucción de la Pared Bronquial:** Los neutrófilos liberan elastasas que degradan el soporte elástico y muscular de los bronquios.

### Afectación de Órganos y Sistemas Relacionados:
- **Respiratorio:** Las vías aéreas dilatadas colapsan durante la espiración, atrapando aire.
- **Cardiovascular:** La destrucción del lecho capilar y la hipoxia causan hipertensión pulmonar.`,
      esquemaMental: {
        inicio: "Infección/Inflamación crónica de la vía aérea.",
        dano: "Destrucción del cartílago y tejido elástico bronquial.",
        consecuencia: "Dilatación bronquial irreversible y retención de moco."
      },
      cita: "Fisiopatología Estándar"
    },
    manejo: {
      diagnostico: 'Laboratorios de rutina (BH, QS, ES), Biomarcadores específicos y gasometría si aplica.',
      tratamiento: 'Soporte vital avanzado (vía aérea, oxígeno, perfusión), terapia farmacológica dirigida causal y estabilización hidroelectrolítica.',
      cita: 'Protocolo Institucional'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Bronquiectasias y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_10_fibrosispulmonaridioptica',
    nombre: 'Fibrosis Pulmonar Idiopática (FPI)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Enfermedad intersticial crónica con cicatrización progresiva del parénquima.',
    sintomasClave: ['Disnea de esfuerzo', 'Tos seca', 'Estertores tipo Velcro'],
    clinica: {
      signosSintomas: ["Disnea de esfuerzo progresiva.", "Tos seca persistente.", "Fatiga."],
      maniobraExploracion: "1. Auscultación: Crepitantes finos tipo 'Velcro'.",
      banderasRojas: ["Exacerbación aguda", "Hipoxemia severa"],
      cita: "ATS/ERS Guidelines"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Fibrosis Pulmonar Idiopática (FPI) es una enfermedad intersticial crónica y devastadora caracterizada por la cicatrización progresiva del parénquima pulmonar. El evento disparador no es una inflamación clásica, sino un proceso de "reparación de heridas aberrante": el pulmón responde a microlesiones repetidas creando una red de colágeno rígido en lugar de tejido funcional.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Activación Fibroblástica:** Los neumocitos tipo II dañados liberan factores que atraen fibroblastos, los cuales se transforman en miofibroblastos agresivos.
- **Depósito de Colágeno:** Estas células sintetizan cantidades masivas de matriz extracelular, engrosando el intersticio y separando el aire de la sangre en el alvéolo.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Restricción pulmonar severa; los pulmones se vuelven pequeños y rígidos, requiriendo un esfuerzo inspiratorio heroico para movilizar aire. Se produce un fallo severo en la transferencia de gases (Difusión de CO disminuida).
- **Sistema Cardiovascular:** El estrechamiento de los capilares pulmonares por la fibrosis dispara la hipertensión pulmonar, llevando a una falla cardíaca derecha severa.
- **Morfología Digital:** La hipoxia crónica estimula factores de crecimiento que producen el engrosamiento de la punta de los dedos (Acropaquia o "dedos en palillo de tambor").

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Factor de Crecimiento Transformante Beta (TGF-β):** Es la molécula "villana" central, la señal bioquímica más potente para la producción de colágeno y fibrosis.
- **Acortamiento de Telómeros:** Se ha descubierto que muchos pacientes tienen una predisposición genética ligada al envejecimiento acelerado de las células pulmonares.

### Correlación con Comorbilidades:
- **Tabaquismo:** Actúa como el principal factor ambiental que "prende la mecha" del proceso fibrótico en individuos predispuestos.
- **Reflujo Gastroesofágico:** La microaspiración crónica de ácido estomacal se considera un factor irritante que perpetúa las microlesiones en el epitelio alveolar.`,
      esquemaMental: {
        inicio: "Microlesiones epiteliales alveolares repetidas.",
        dano: "Reparación aberrante con depósito excesivo de colágeno.",
        consecuencia: "Pulmón rígido con restricción ventilatoria severa."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: "TAC de alta resolución (Patrón de Neumonía Intersticial Usual - NIU). Espirometría (Patrón restrictivo). Biopsia pulmonar criogénica si el patrón no es claro.",
      tratamiento: "Nintedanib o Pirfenidona (Antifibróticos). Oxigenoterapia de alto flujo. Evaluación para trasplante pulmonar.",
      cita: "ATS/ERS/JRS/ALAT Clinical Practice Guidelines"
    },
    enfermeria: {
      nanda: '00032 Patrón respiratorio ineficaz',
      intervenciones: [
        { accion: 'Monitorización de la saturación de oxígeno en reposo y marcha.', razon: 'Detecta la desaturación por esfuerzo característica de la fibrosis.' },
        { accion: 'Administración de oxigenoterapia humidificada.', razon: 'Mantiene la permeabilidad de las vías aéreas y evita la sequedad de mucosas.' },
        { accion: 'Entrenamiento en técnicas de ahorro de energía.', razon: 'Reduce el consumo de oxígeno y la fatiga en actividades de la vida diaria.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_14_sndromededistrsrespiratorioagudosdra',
    nombre: 'Síndrome de Distrés Respiratorio Agudo (SDRA)',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Edema pulmonar no cardiogénico agudo con hipoxemia severa.',
    sintomasClave: ['Disnea súbita', 'Taquipnea', 'Hipoxemia refractaria', 'Infiltrados bilaterales'],
    clinica: {
      signosSintomas: [
        "Disnea severa de progresión rápida (sed de aire).",
        "Taquipnea extrema (>30 rpm) y uso de músculos accesorios.",
        "Cianosis distal y central que no mejora con oxígeno.",
        "Diaforesis y agitación psicomotriz.",
        "Crepitantes húmedos difusos a la auscultación."
      ],
      maniobraExploracion: "1. Auscultación: Estertores húmedos bilaterales desde bases hasta ápices. 2. Monitorización: Necesidad de FiO2 creciente para mantener saturación basal.",
      banderasRojas: [
        "Relación PaO2/FiO2 (Kirby) < 100 mmHg (Grave).",
        "Opacidades difusas en 'vidrio esmerilado' en RX o TAC.",
        "Fallo multiorgánico asociado (Sepsis).",
        "Bradicardia (signo de hipoxia terminal)."
      ],
      cita: "Definition Berlin 2012 / Lancet ARDS 2023"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Síndrome de Distrés Respiratorio Agudo (SDRA) es la forma más grave de insuficiencia respiratoria aguda, caracterizada por un edema pulmonar no cardiogénico difuso. El evento disparador es una injuria masiva (Sepsis, Neumonía grave, Aspiración o Politrauma) que desencadena una respuesta inflamatoria descontrolada en la membrana alvéolo-capilar.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Fase Exudativa (0-7 días):** Los capilares se vuelven "porosos", permitiendo que proteínas y líquido inunden el alvéolo. Se forman "Membranas Hialinas" que bloquean totalmente el oxígeno.
- **Fase Proliferativa (7-21 días):** El pulmón intenta reparar el daño, pero de forma desordenada, creando un tejido rígido y fibroso.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Caída dramática de la distensibilidad (*Compliance*) - el pulmón se vuelve "pequeño y rígido" (*Baby Lung*). Hipoxemia refractaria al oxígeno suplementario.
- **Sistema Cardiovascular:** El edema y el colapso alveolar disparan la resistencia vascular pulmonar, pudiendo causar un fallo súbito del corazón derecho (*Cor Pulmonale* Agudo).
- **Fallo Multiorgánico:** La liberación masiva de mediadores inflamatorios al torrente sanguíneo (*Biotrauma*) daña los riñones, el hígado y el cerebro.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Citoquinas (IL-1, IL-6, TNF):** Son las responsables del daño capilar masivo.
- **Surfactante:** Es totalmente destruido por las proteínas del edema, provocando un colapso alveolar universal difícil de revertir incluso con ventilación mecánica.

### Correlación con Comorbilidades:
- **Sepsis de cualquier origen:** Es el desencadenante más frecuente (40% de los casos); el pulmón es el primer órgano en "gritar" ante una infección sistémica.
- **Alcoholismo Crónico:** Los pacientes alcohólicos tienen niveles bajos de glutatión en el pulmón, lo que los hace mucho más susceptibles al daño oxidativo del SDRA.`,
      esquemaMental: {
        inicio: "Insulto sistémico/pulmonar grave (Sepsis, Trauma).",
        dano: "Daño difuso en la membrana alvéolo-capilar.",
        consecuencia: "Edema no cardiogénico e hipoxemia severa refractaria."
      },
      cita: "The Lancet Seminar: ARDS"
    },
    manejo: {
      diagnostico: "RX Tórax (Infiltrados bilaterales no explicados por falla cardíaca). PaO2/FiO2 < 300. Ecocardiograma para descartar edema hidrostático.",
      tratamiento: "Ventilación mecánica protectora (Bajo Vt: 6ml/kg). PEEP alto. Posición en PRONO (mínimo 16h/día). Bloqueo neuromuscular temprano.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Cisatracurio", dosis: "Infusión 37.5 mg/h", frecuencia: "Continua por 48h", observaciones: "Parálisis neuromuscular para mejorar sincronía con ventilador." },
          { nombre: "Dexametasona", dosis: "20 mg / día x 5 días", frecuencia: "Luego 10 mg / día x 5 días", observaciones: "Estudio DEXA-ARDS para reducción de mortalidad." }
        ],
        medidasGenerales: [
          "Balance hídrico negativo (Estrategia conservadora de fluidos).",
          "Nutrición enteral temprana rica en omega-3.",
          "Prevención de neumonía asociada al ventilador.",
          "Maniobras de reclutamiento alveolar (con precaución)."
        ]
      },
      monitoreo: {
        parametros: [
          "Relación PaO2/FiO2 cada 6-12 horas.",
          "Presión meseta (Plateau) < 30 cmH2O.",
          "Presión de conducción (Driving Pressure) < 15 cmH2O."
        ],
        signosAlerta: [
          "Hipotensión tras aumento de PEEP.",
          "Neumotórax por barotrauma (enfisema subcutáneo).",
          "Fallo de órganos distales."
        ]
      },
      cita: "Guidelines for ARDS - NEJM"
    },
    enfermeria: {
      nanda: '00030 Deterioro del intercambio de gases',
      intervenciones: [
        { accion: 'Gestión del paciente en decúbito prono.', razon: 'Mejora la relación V/Q y recluta alvéolos en zonas dorsales del pulmón.' },
        { accion: 'Aspiración de secreciones mediante circuito cerrado.', razon: 'Mantiene la PEEP y evita la dispersión de aerosoles.' },
        { accion: 'Control estricto de la sedación y analgesia (RASS -5).', razon: 'Evita la competencia con el ventilador y el daño inducido por el paciente.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_12_corpulmonale',
    nombre: 'Cor Pulmonale',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Hipertrofia/falla del VD por hipertensión pulmonar primaria.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: ['Fiebre/hipotermia', 'Taquicardia', 'Alteración del estado mental'],
      maniobraExploracion: 'Exploración física exhaustiva por sistemas.',
      banderasRojas: ['Inestabilidad hemodinámica', 'Fallo respiratorio', 'Deterioro neurológico agudo'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Cor Pulmonale es la hipertrofia y dilatación del ventrículo derecho (VD) como consecuencia de una enfermedad que afecta la estructura o la función de los pulmones. El evento disparador es la **Hipertensión Pulmonar**, que obliga al corazón derecho (diseñado para manejar bajas presiones) a trabajar contra una resistencia extenuante.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Vasoconstricción Hipóxica:** Ante la falta de oxígeno en los alvéolos, las arterias pulmonares se cierran para desviar la sangre, aumentando la presión global en el circuito pulmonar.
- **Remodelado del VD:** El ventrículo derecho se engrosa (hipertrofia) para vencer la presión, pero eventualmente se dilata y falla (insuficiencia cardíaca derecha).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** Disminución del gasto cardíaco izquierdo por interdependencia ventricular (el VD dilatado "empuja" el tabique y colapsa el ventrículo izquierdo).
- **Sistema Hepático:** Congestión pasiva del hígado (hígado "de choque" o en nuez moscada), pudiendo causar cirrosis cardíaca.
- **Sistema Renal:** La caída del gasto cardíaco y la congestión de las venas renales reducen la filtración glomerular, activando el sistema RAA y empeorando los edemas.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Péptido Natriurético Cerebral (BNP):** Elevado significativamente debido al estiramiento de las fibras del ventrículo derecho.
- **Eritropoyetina:** La hipoxia pulmonar crónica estimula la médula ósea para producir más glóbulos rojos (Poliglobulia), lo que aumenta la viscosidad de la sangre y empeora la carga de trabajo del VD.

### Correlación con Comorbilidades:
- **SAOS (Apnea del Sueño):** Los episodios repetidos de hipoxia nocturna disparan picos de hipertensión pulmonar que terminan causando Cor Pulmonale.
- **EPOC:** Es la causa más común; la destrucción del lecho vascular pulmonar y la hipoxia alveolar son los motores principales de la falla derecha.`,
      esquemaMental: {
        inicio: "Hipertensión pulmonar crónica (EPOC, Fibrosis).",
        dano: "Sobrecarga de presión en el ventrículo derecho.",
        consecuencia: "Fallo cardíaco derecho y congestión sistémica."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: 'Laboratorios de rutina (BH, QS, ES), Biomarcadores específicos y gasometría si aplica.',
      tratamiento: 'Soporte vital avanzado (vía aérea, oxígeno, perfusión), terapia farmacológica dirigida causal y estabilización hidroelectrolítica.',
      cita: 'Protocolo Institucional'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Cor Pulmonale y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_13_atelectasia',
    nombre: 'Atelectasia',
    servicio: 'Medicina Interna',
    system: 'Sistema Respiratorio',
    color: 'var(--primary)',
    definicionCaso: 'Colapso completo o parcial de un lóbulo pulmonar.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: ['Fiebre/hipotermia', 'Taquicardia', 'Alteración del estado mental'],
      maniobraExploracion: 'Exploración física exhaustiva por sistemas.',
      banderasRojas: ['Inestabilidad hemodinámica', 'Fallo respiratorio', 'Deterioro neurológico agudo'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Atelectasia es la pérdida de volumen del tejido pulmonar debido a la falta de expansión de los alvéolos. No es una enfermedad *per se*, sino una complicación mecánica. El evento disparador suele ser una obstrucción bronquial (moco, cuerpo extraño) o una compresión externa, que impide que el aire mantenga inflado el saco alveolar.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Atelectasia por Reabsorción:** Si un bronquio se obstruye, el aire atrapado en los alvéolos es absorbido por la sangre; al agotarse el aire, el alvéolo se colapsa.
- **Atelectasia por Compresión:** Líquido (derrame) o aire (neumotórax) en la pleura "aplastan" el pulmón hacia adentro.
- **Atelectasia por Contracción:** Fibrosis en la pleura o el parénquima tira del tejido, impidiendo su expansión.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Creación de un cortocircuito (*Shunt*) pulmonar: la sangre pasa por zonas colapsadas donde no hay oxígeno, regresando al corazón sin oxigenarse.
- **Mediastino:** Las atelectasias masivas generan una presión negativa que "tira" de la tráquea y del corazón hacia el lado afectado (desviación ipsilateral).
- **Sistema Inmune:** El tejido colapsado y falto de ventilación es el caldo de cultivo ideal para la colonización bacteriana, derivando frecuentemente en neumonía.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Surfactante Pulmonar:** La falta de ventilación reduce la producción de surfactante, aumentando la tensión superficial y dificultando enormemente la reexpansión del pulmón.
- **Mediadores de la Hipoxia:** La vasoconstricción local busca reducir el Shunt, pero aumenta la presión en la arteria pulmonar de esa zona.

### Correlación con Comorbilidades:
- **Postoperatorio de Cirugía Abdominal/Torácica:** Es la causa más frecuente debido al dolor al respirar profundo y al efecto de la anestesia sobre el diafragma.
- **Obesidad:** El exceso de peso abdominal comprime las bases de los pulmones, provocando micro-atelectasias constantes durante el reposo.`,
      esquemaMental: {
        inicio: "Obstrucción o compresión alveolar.",
        dano: "Reabsorción del aire alveolar y colapso del tejido.",
        consecuencia: "Disminución del intercambio gaseoso y Shunt funcional."
      },
      cita: "Fisiopatología Estándar"
    },
    manejo: {
      diagnostico: 'Laboratorios de rutina (BH, QS, ES), Biomarcadores específicos y gasometría si aplica.',
      tratamiento: 'Soporte vital avanzado (vía aérea, oxígeno, perfusión), terapia farmacológica dirigida causal y estabilización hidroelectrolítica.',
      cita: 'Protocolo Institucional'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Atelectasia y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_15_icc',
    nombre: 'ICC',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Insuficiencia Cardíaca Congestiva.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: [
        '1. Disnea de esfuerzo',
        '2. Ortopnea',
        '3. Disnea paroxística nocturna',
        '4. Fatiga y debilidad',
        '5. Edema de miembros inferiores',
        '6. Ingurgitación yugular',
        '7. Hepatomegalia (congestión)',
        '8. Crepitantes pulmonares',
        '9. Ascitis',
        '10. Taquicardia'
      ],
      maniobraExploracion: 'Auscultación pulmonar (crepitantes bibasales); auscultación cardíaca (tercer tono - S3, soplos); evaluación de presión venosa yugular (PVY); palpación abdominal (hepatomegalia, reflujo hepatoyugular); evaluación de edema periférico con fóvea.',
      banderasRojas: [
        'Edema agudo de pulmón (EAP) inminente',
        'Hipotensión severa o shock cardiogénico',
        'Hipoperfusión tisular (cianosis, oliguria, alteración mental)',
        'Arritmias ventriculares o FA con RC rápida',
        'Desaturación grave que no responde a oxígeno',
        'Dolor torácico asociado (sospecha de SCA)',
        'Respiración de Cheyne-Stokes evidente',
        'Signos de bajo gasto cardíaco sostenido'
      ],
      cita: 'Guías ESC insuficiencia cardiaca aguda'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La ICC no es una enfermedad aislada, sino el estadio final de cualquier injuria miocárdica (infartos, hipertensión crónica o valvulopatías). Se define por la incapacidad del ventrículo para mantener un gasto cardíaco suficiente para satisfacer las demandas metabólicas del organismo, o lograrlo solo a expensas de un aumento crítico en las presiones de llenado. El evento disparador es la pérdida de la contractilidad o la distensibilidad, lo que genera un remanente de sangre en las cavidades cardiacas al final de cada latido.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
Ante el descenso del volumen sistólico, el cuerpo activa mecanismos compensatorios que, a largo plazo, son los que destruyen al paciente.
- **Ley de Frank-Starling:** El corazón se estira para intentar bombear más (dilatación), pero al sobrepasar el límite elástico, la fuerza de contracción cae drásticamente.
- **Remodelado Ventricular:** El miocardio sufre hipertrofia y fibrosis, cambiando su estructura elástica por una rígida, lo que perpetúa el fallo diastólico.

### Afectación de Órganos y Sistemas Relacionados: (Efecto Dominó):
- **Sistema Pulmonar:** El aumento de presión en la aurícula izquierda se transmite hacia atrás a las venas pulmonares y capilares. Al superar la presión hidrostática a la oncótica, el líquido sale al espacio alveolar, causando edema pulmonar y disnea paroxística.
- **Sistema Renal:** La hipoperfusión renal es detectada como una "hemorragia falsa". El riñón, creyendo que falta volumen, retiene sodio y agua, aumentando la precarga y empeorando la congestión.
- **Sistema Hepático:** La falla derecha genera congestión venosa sistémica. El hígado se agranda (hepatomegalia congestiva) y puede desarrollar "hígado de choque" por falta de oxígeno.

### Alteraciones Hormonales y Bioquímicas (Eje Químico): (El Eje Neurohormonal):
- **Sistema RAA (Renina-Angiotensina-Aldosterona):** La Angiotensina II causa una vasoconstricción periférica severa para mantener la presión arterial, pero esto aumenta la poscarga, agotándolo más rápido.
- **Péptidos Natriuréticos (BNP/ANP):** El corazón libera estas hormonas para intentar orinar el exceso de líquido; su elevación es el marcador clave del fallo.
- **Catecolaminas:** La adrenalina aumenta la frecuencia cardiaca, lo cual reduce el tiempo de llenado coronario, provocando isquemia relativa.

### Correlación con Comorbilidades:
- **Enfermedad Renal Crónica (Síndrome Cardiorrenal):** El daño en un órgano acelera el daño en el otro por congestión venosa renal.
- **Diabetes Mellitus:** Genera productos de glicación avanzada que vuelven rígido al colágeno del corazón, impidiendo que se relaje.`,
      esquemaMental: {
        inicio: 'Lesión miocárdica (IAM, HTA, Valvulopatía).',
        dano: 'Descenso del volumen sistólico y sobrecarga de presiones.',
        consecuencia: 'Congestión sistémica/pulmonar e hipoperfusión tisular.'
      },
      cita: 'Braunwald\'s Heart Disease: A Textbook of Cardiovascular Medicine'
    },
    manejo: {
      diagnostico: 'Ecocardiograma (FEVI). NT-proBNP/BNP. RX Tórax (Cefalización, líneas de Kerley). ECG de 12 derivaciones.',
      tratamiento: 'Pilares: IECA/ARAII/ARNI + Betabloqueadores + iSGLT2 + Antag. Mineralocorticoides.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Furosemida', dosis: '20-40 mg IV/VO', frecuencia: 'Según volemia', observaciones: 'Diurético de asa para control de síntomas congestivos. Vigilar potasio.' },
          { nombre: 'Sacubitrilo / Valsartán (ARNI)', dosis: '24/26 mg a 97/103 mg', frecuencia: 'Cada 12 horas', observaciones: 'Sustituye a IECA/ARAII en falla cardíaca con FEVI reducida para reducción de mortalidad.' },
          { nombre: 'Dapagliflozina / Empagliflozina', dosis: '10 mg', frecuencia: 'Cada 24 horas', observaciones: 'Inhibidor de SGLT2 con beneficio demostrado en insuficiencia cardíaca con FEVI reducida y preservada.' }
        ],
        medidasGenerales: [
          'Restricción de sodio (< 2 g/día) y restricción hídrica en casos severos (1.5 - 2 L/día).',
          'Control de peso diario (reportar aumento > 2 kg en 3 días).',
          'Ejercicio aeróbico moderado según tolerancia funcional.'
        ]
      },
      monitoreo: {
        parametros: [
          'Función renal (Creatinina) y electrolitos (K+, Mg++) periódicos.',
          'Nivel de actividad física (NYHA Class).',
          'Presión arterial y frecuencia cardíaca.'
        ],
        signosAlerta: [
          'Ortopnea progresiva o disnea paroxística nocturna.',
          'Incremento súbito de peso con edema en esclavina.',
          'Síncope o palpitaciones rápidas.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Compensación clínica (NYHA I-II).',
          'Ausencia de reingresos hospitalarios.',
          'Estabilización de biomarcadores (BNP).'
        ],
        criteriosFracaso: [
          'Falla cardíaca refractaria (necesidad de inotrópicos).',
          'Disfunción renal progresiva secundaria (Síndrome cardiorrenal).'
        ]
      },
      cita: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para ICC y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_16_sca',
    nombre: 'SCA',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'El Síndrome Coronario Agudo (SCA) comprende todas las manifestaciones clínicas derivadas de la oclusión súbita de una arteria coronaria, generalmente provocada por la ruptura de una placa de ateroma inestable. Fisiopatológicamente, la exposición del núcleo lipídico de la placa al torrente sanguíneo desencadena una cascada protrombótica que forma un trombo (oclusivo en IAMEST/IAMCEST, no oclusivo en IAMNEST/angina inestable). Esta obstrucción compromete el aporte de oxígeno, obligando al miocardio a realizar un metabolismo anaeróbico, lo cual, de prolongarse, conlleva a la necrosis celular irreversible, inestabilidad eléctrica (arritmias) y disfunción mecánica ventricular.',
    etiologia: 'Primariamente aterosclerosis coronaria, agravada por factores predisponentes (hipertensión, diabetes, dislipidemia). Factores gatillo: estrés emocional, esfuerzo físico intenso, infecciones sistémicas o crisis hipertensivas que aumentan la demanda miocárdica.',
    fisiopatologiaBasica: 'La rotura de la placa inestable desencadena trombosis y reducción brusca del flujo sanguíneo coronario. La isquemia resultante altera primero el metabolismo miocárdico, luego la diástole, posteriormente la sístole, y finaliza con la necrosis irreversible del tejido si no se restablece la perfusión oportunamente.',
    complicaciones: [
      'Arritmias ventriculares letales (TV/FV)',
      'Falla Cardíaca Aguda / Shock Cardiogénico',
      'Complicaciones mecánicas (ruptura de pared libre, septum o músculo papilar)',
      'Bloqueos AV de alto grado',
      'Pericarditis post-infarto'
    ],
    riesgosNoTratado: [
      'Muerte súbita cardíaca',
      'Insuficiencia cardíaca terminal',
      'Aneurisma ventricular con riesgo de embolización',
      'Daño neurológico secundario a bajo gasto',
      'Cronicidad anginosa invalidante'
    ],
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    banderasRojas: [
      'Dolor retroesternal persistente (>20 min) refractario',
      'Cambios isquémicos significativos en el ECG (ST ↑ o ↓)',
      'Inestabilidad hemodinámica extrema',
      'Signos de falla de bomba (estertores agudos)',
      'Alteración de consciencia o soplo cardíaco de novo'
    ],
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El SCA es el resultado de la interrupción súbita del flujo sanguíneo coronario, generalmente debido a la erosión o ruptura de una placa de ateroma inestable. Este evento dispara una cascada protrombótica que reduce la luz arterial, imposibilitando que el miocardio reciba el oxígeno necesario para su función contráctil. La isquemia resultante progresa rápidamente a necrosis celular si no se restablece la perfusión.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Cascada Isquémica:** El primer cambio es metabólico (cambio a glucólisis anaerobia), seguido de fallo diastólico, luego sistólico y finalmente cambios en el ECG y dolor.
- **Aturdimiento Miocárdico:** Incluso tras reabrir la arteria, el tejido puede permanecer disfuncionante por horas o días debido al daño por reperfusión y radicales libres.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** Genera una caída del gasto cardíaco y riesgo inminente de arritmias ventriculares (TV/FV) por inestabilidad eléctrica en la zona de penumbra.
- **Sistema Pulmonar:** La falla del ventrículo izquierdo genera un aumento súbito de la presión diastólica final, derivando en edema agudo de pulmón "flash".
- **Sistema Nervioso:** El dolor extremo activa una respuesta simpática masiva que puede elevar la TA y FC, aumentando aún más el daño isquémico.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Biomarcadores de Necrosis:** El daño a la membrana del miocito libera Troponinas (I/T) y CPK-MB al torrente sanguíneo, siendo el estándar de oro diagnóstico.
- **Respuesta Adrenérgica:** La liberación de norepinefrina aumenta el inotropismo y cronotropismo, lo que irónicamente incrementa el consumo de oxígeno en un corazón que no lo tiene.

### Correlación con Comorbilidades:
- **Dislipidemia:** Es la base fisiopatológica de la formación de la placa vulnerable.
- **Tabaquismo:** Aumenta la adhesividad plaquetaria y favorece el vasoespasmo coronario agudo.`,
      esquemaMental: {
        inicio: 'Inestabilidad de placa aterosclerótica y trombosis.',
        dano: 'Isquemia miocárdica y muerte celular por hipoxia.',
        consecuencia: 'Disfunción ventricular, arritmias o complicaciones mecánicas.'
      },
      cita: 'ESC/ACC/AHA/WHF Universal Definition of Myocardial Infarction'
    },
    manejo: {
      diagnostico: 'ECG de 12 derivaciones (en menos de 10 min). Troponinas ultrasensibles. Ecocardiograma point-of-care.',
      tratamiento: 'MONA (Morfina, Oxígeno, Nitratos, Aspirina) + Revascularización (ICP o Fibrinolisis).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Aspirina', dosis: '162 - 325 mg (Carga)', frecuencia: 'Dosis única inicial', observaciones: 'Masticada para absorción rápida; antiagregación irreversible.' },
          { nombre: 'Clopidogrel / Ticagrelor', dosis: '300-600 mg / 180 mg', frecuencia: 'Carga inicial', observaciones: 'Inhibidor P2Y12; parte de la doble antiagregación plaquetaria (DAPT).' },
          { nombre: 'Atorvastatina', dosis: '80 mg', frecuencia: 'Cada 24 horas', observaciones: 'Efecto pleiotrópico estabilizador de placa en fase aguda.' }
        ],
        medidasGenerales: [
          'Monitorización electrocardiográfica continua (telemetría).',
          'Reposo absoluto inicial y ayuno preventivo por riesgo de intervención.',
          'Oxígeno suplementario solo si saturación < 90%.'
        ]
      },
      monitoreo: {
        parametros: [
          'Curva de Troponinas cada 3-6 horas.',
          'Segmento ST en monitor continuo.',
          'Presión arterial y signos de choque cardiogénico.'
        ],
        signosAlerta: [
          'Dolor torácico persistente o recurrente tras tratamiento.',
          'Arritmias ventriculares (TV/FV) o bloqueos post-IAM.',
          'Crepitantes pulmonares (falla cardíaca aguda).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Resolución del dolor isquémico.',
          'Reperfusión exitosa documentada (descenso ST > 50%).',
          'Preservación de la función sistólica ventricular.'
        ],
        criteriosFracaso: [
          'Shock cardiogénico refractario.',
          'Complicación mecánica (ruptura de pared libre, septum o músculo papilar).'
        ]
      },
      cita: '2023 ESC Guidelines for the management of acute coronary syndromes'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para SCA y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_17_crisishipertensiva',
    nombre: 'Crisis Hipertensiva',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Elevación aguda y severa de la PA (>180/120 mmHg) que supera los mecanismos de autorregulación vascular. Fisiopatológicamente, este aumento brusco genera fuerzas de cizallamiento que dañan el endotelio arterial, provocando necrosis fibrinoide de la pared vascular, activación plaquetaria, y formación de microtrombos, con la consecuente isquemia y daño estructural irreversible de órganos diana (cerebro, corazón, riñones).',
    etiologia: 'Generalmente causada por el abandono del tratamiento crónico, consumo excesivo de sodio, estrés severo, uso de drogas simpatomiméticas (cocaína) o patologías renales agudas.',
    fisiopatologiaBasica: 'El aumento brusco de presión supera la autorregulación vascular, causando daño mecánico directo al endotelio (vasculitis hipertensiva) y activando una cascada proinflamatoria y protrombótica.',
    complicaciones: [
      'Accidente Cerebrovascular (Hemorrágico o Isquémico)',
      'Edema Agudo de Pulmón Cardiopático',
      'Infarto Agudo de Miocardio',
      'Disección Aórtica',
      'Encefalopatía Hipertensiva',
      'Insuficiencia Renal Aguda'
    ],
    riesgosNoTratado: [
      'Muerte súbita cardiovascular',
      'Daño neurológico irreversible y discapacidad permanente',
      'Necesidad de diálisis crónica por falla renal fulminante',
      'Ceguera por desprendimiento de retina o hemorragia vítrea'
    ],
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    banderasRojas: [
      'Dolor torácico opresivo o desgarrador',
      'Déficit neurológico focal (parálisis, afasia)',
      'Visión borrosa o pérdida súbita de visión',
      'Disnea súbita con estertores rales',
      'Confusión o agitación extrema'
    ],
    clinica: {
      signosSintomas: [
        '1. Cefalea intensa u occipital',
        '2. Alteración del nivel de conciencia (encefalopatía)',
        '3. Visión borrosa o escotomas',
        '4. Dolor torácico severo (opresivo o desgarrador)',
        '5. Disnea aguda (clínica de EAP)',
        '6. Déficit neurológico focal',
        '7. Epistaxis persistente',
        '8. Náuseas y vómitos',
        '9. Palpitaciones o ansiedad severa',
        '10. Oliguria (lesión renal aguda)'
      ],
      maniobraExploracion: 'Toma de TA en ambos brazos; fondo de ojo (papiledema o hemorragias y exudados); auscultación cardíaca y pulmonar (S3, crepitantes, soplo aórtico); evaluación neurológica completa (fuerza, sensibilidad, pares craneales); palpación de pulsos (diferencia de presión y pulsos entre brazos).',
      banderasRojas: [
        'Papiledema en fondo de ojo (emergencia hipertensiva mayor)',
        'Signos focales neurológicos (ACV agudo)',
        'Asimetría de pulsos o dolor torácico desgarrador (Disección Aórtica)',
        'Signos de edema agudo de pulmón (crepitantes, disnea severa)',
        'Confusión profunda o convulsiones (Encefalopatía hipertensiva)',
        'Dolor opresivo torácico con cambios ECG (SCA)',
        'Elevación aguda de azoados',
        'PA diastólica confirmada persistentemente >120-130 mmHg'
      ],
      cita: 'Guías AHA/JNC Elevación de PA'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Crisis Hipertensiva es un aumento brusco de la presión arterial que supera los mecanismos protectores de la microcirculación. En la Emergencia Hipertensiva, este aumento es tan severo que provoca una necrosis fibrinoide de las arteriolas, rompiendo la barrera hematoencefálica o dañando directamente el endotelio glomerular y miocárdico. El evento crítico es el paso de una vasoconstricción funcional a un daño estructural vascular.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Activación de la Cascada de Coagulación:** El daño mecánico al endotelio expone colágeno subendotelial, activando plaquetas y formando microtrombos que perpetúan la hipoperfusión.
- **Hipovolemia Paradójica:** La presión alta genera una natriuresis por presión, lo que reduce el volumen plasmático y activa aún más el sistema RAA, elevando más la presión en un círculo vicioso.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cerebrovascular:** La pérdida de autorregulación cerebral puede causar edema vasogénico (Encefalopatía Hipertensiva) o rotura de vasos (Ictus Hemorrágico).
- **Sistema Renal:** Necrosis fibrinoide de las arteriolas aferentes, llevando a una pérdida aguda de la tasa de filtración glomerular.
- **Sistema Cardiovascular:** Sobrecarga aguda del ventrículo izquierdo, pudiendo desencadenar Edema Agudo de Pulmón o disección de la aorta.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Eje Renina-Angiotensina:** Se mantiene sobreactivado por la isquemia renal secundaria, a pesar de las cifras tensionales altísimas.
- **Estrés Oxidativo:** El aumento de angiotensina II genera radicales libres que inhiben el óxido nítrico, eliminando la capacidad de vasodilatación natural (vasospasmo persistente).

### Correlación con Comorbilidades:
- **Enfermedad Renal Preexistente:** Los pacientes renales tienen umbrales de autorregulación alterados, siendo más susceptibles a crisis hipertensivas malignas.
- **Abuso de Sustancias (Cocaína/Anfetaminas):** Generan crisis hipertensivas por tormentas adrenérgicas directas.`,
      esquemaMental: {
        inicio: 'Fallo de autorregulación vascular arterial.',
        dano: 'Lesión endotelial y necrosis fibrinoide arteriolar.',
        consecuencia: 'Isquemia aguda de órgano blanco (Cerebro, Corazón, Riñón).'
      },
      cita: 'Harrison\'s Principles of Internal Medicine'
    },
    manejo: {
      diagnostico: 'MAPA/AMPA (confirmación). Fondo de ojo. Función renal y EGO. Biomarcadores (si SCA/EAP). TC simple de cráneo (si focalidad).',
      tratamiento: 'Urgencia: Control oral (24-48h). Emergencia: Control IV inmediato (descenso 20-25% inicial).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Labetalol', dosis: '20 mg bolo inicial (luego 20-80 mg)', frecuencia: 'Cada 10 min PRN', observaciones: 'Alfa/Beta bloqueador de elección en la mayoría de emergencias, especialmente embarazo y disección.' },
          { nombre: 'Nitroprusiato de Sodio', dosis: '0.25 - 10 mcg/kg/min', frecuencia: 'Infusión continua', observaciones: 'Vasodilatador potente; requiere monitoreo invasivo de PA. Riesgo de toxicidad por cianuro.' },
          { nombre: 'Nitroglicerina IV', dosis: '5 - 200 mcg/min', frecuencia: 'Infusión continua', observaciones: 'De elección en emergencias hipertensivas asociadas a isquemia coronaria o EAP.' }
        ],
        medidasGenerales: [
          'Diferenciar claramente Urgencia (sin daño de órgano) de Emergencia (con daño).',
          'Evitar descensos bruscos de PA en ACV isquémico (salvo >185/110 si va a trombolisis).',
          'Paciente en decúbito supino en ambiente tranquilo.'
        ]
      },
      monitoreo: {
        parametros: [
          'Presión Arterial Media (PAM) horaria o continua (Línea arterial).',
          'Gasto urinario (vigilancia de falla renal aguda).',
          'Estado neurológico seriado.'
        ],
        signosAlerta: [
          'Confusión o focalización neurológica brusca.',
          'Dolor torácico nuevo o disnea.',
          'Anuria o hematuria franca.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Reducción controlada de la PA según metas específicas por patología.',
          'Ausencia de progresión del daño de órgano blanco.',
          'Transición exitosa a terapia oral.'
        ],
        criteriosFracaso: [
          'Ictus isquémico provocado por descenso excesivamente rápido de PA.',
          'Fallo multiorgánico progresivo.'
        ]
      },
      cita: '2020 International Society of Hypertension Global Hypertension Practice Guidelines'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Crisis Hipertensiva y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_18_fibrilacinauricularfa',
    nombre: 'Fibrilación Auricular (FA)',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Arritmia supraventricular más común.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: [
        '1. Palpitaciones rápidas e irregulares',
        '2. Disnea, especialmente al esfuerzo',
        '3. Fatiga y falta de aire inexplicable',
        '4. Mareo o aturdimiento',
        '5. Síncope o presíncope',
        '6. Dolor torácico opresivo intermitente',
        '7. Ansiedad o sensación de latidos erráticos',
        '8. Sudoración asociada a las palpitaciones',
        '9. Disminución de la tolerancia al ejercicio',
        '10. Asintomático (descubrimiento incidental)'
      ],
      maniobraExploracion: 'Auscultación cardíaca (ritmo irregularmente irregular sin onda a auricular visible en PVY); toma de presión capilar o pulso periférico (puede haber déficit de pulso entre auscultación y radial); evaluación pulmonar buscando signos de congestión.',
      banderasRojas: [
        'Inestabilidad hemodinámica (Hipotensión, shock)',
        'Frecuencia ventricular >150 lpm sostenida',
        'Evidencia de isquemia miocárdica clínica o ECG',
        'Signos de tromboembolismo grave extrínseco (ACV, isquemia mesentérica)',
        'Signos de edema agudo de pulmón inminente',
        'Alteración del nivel de conciencia',
        'Respuesta refractaria a fármacos frenadores',
        'Síndrome de preexcitación asociado'
      ],
      cita: 'Guías ESC de Fibrilación Auricular'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Fibrilación Auricular (FA) es la arritmia sostenida más frecuente, caracterizada por una activación eléctrica auricular desorganizada, rápida y caótica. En lugar de una contracción coordinada iniciada por el nodo sinusal, múltiples frentes de onda de reentrada bombardean el nodo auriculoventricular (AV), resultando en una respuesta ventricular irregular y a menudo taquicárdica. El evento disparador suele ser la actividad ectópica originada en las venas pulmonares.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **"La FA engendra FA":** La persistencia de la arritmia genera remodelado eléctrico (acortamiento del periodo refractario) y estructural (fibrosis), volviendo la arritmia permanente.
- **Pérdida de la "Patada Auricular":** La falta de contracción efectiva reduce el volumen sistólico final en un 20-30%, lo que puede precipitar falla cardíaca en ventrículos ya comprometidos.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** El ventrículo izquierdo sufre una "miocardiopatía inducida por taquicardia" si la respuesta ventricular no se controla adecuadamente.
- **Sistema Neurológico:** La falta de flujo vigoroso en las orejuelas auriculares permite la formación de trombos. Su desprendimiento causa el 15-20% de todos los ictus isquémicos, usualmente más extensos y graves.
- **Sistema Sistémico:** Hipoperfusión cerebral crónica sutil que contribuye al deterioro cognitivo y demencia vascular a largo plazo.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Péptidos Natriuréticos (ANP/BNP):** La distensión auricular crónica eleva estos marcadores, lo que puede confundir el diagnóstico de falla cardíaca congestiva.
- **Estado Protrombótico:** La activación de la cascada de coagulación por el flujo turbulento y el daño endotelial auricular (Tríada de Virchow).

### Correlación con Comorbilidades:
- **Apnea Obstructiva del Sueño (AOS):** Las presiones intratorácicas negativas durante la apnea estiran las aurículas, disparando episodios de FA.
- **Hipertensión Arterial:** Es el factor de riesgo más importante para el remodelado auricular estructural.`,
      esquemaMental: {
        inicio: 'Focos ectópicos (venas pulmonares) y reentrada.',
        dano: 'Activación auricular caótica y respuesta ventricular irregular.',
        consecuencia: 'Riesgo tromboembólico elevado y falla cardíaca diastólica.'
      },
      cita: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation'
    },
    manejo: {
      diagnostico: 'ECG 12 derivaciones (ausencia de ondas P, intervalos R-R irregulares). Ecocardiograma transesofágico (si sospecha de trombo).',
      tratamiento: 'Estrategia de control de ritmo o frecuencia + Anticoagulación (CHA2DS2-VASc).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Metoprolol', dosis: '25-50 mg', frecuencia: 'Cada 12 horas', observaciones: 'Betabloqueador de elección para control de frecuencia ventricular.' },
          { nombre: 'Amiodarona', dosis: '200 mg', frecuencia: 'Cada 8-24 horas', observaciones: 'Antiarrítmico de elección para control de ritmo, especialmente en falla cardíaca.' },
          { nombre: 'Apixabán / Rivaroxabán', dosis: '5 mg / 20 mg', frecuencia: 'Cada 12h / Cada 24h', observaciones: 'Anticoagulantes orales directos (DOACs) para prevención de ACV.' }
        ],
        medidasGenerales: [
          'Evaluación del riesgo embólico mediante escala CHA2DS2-VASc.',
          'Evaluación del riesgo hemorrágico mediante escala HAS-BLED.',
          'Considerar cardioversión eléctrica en pacientes inestables.'
        ]
      },
      monitoreo: {
        parametros: [
          'Frecuencia cardíaca en reposo (meta < 110 lpm).',
          'Estado de anticoagulación y signos de sangrado.',
          'Función tiroidea (especialmente si usa amiodarona).'
        ],
        signosAlerta: [
          'Déficit neurológico focal (ACV embólico).',
          'Síncope o palpitaciones incapacitantes.',
          'Disnea en reposo (falla cardíaca congestiva).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Control de síntomas.',
          'Ausencia de eventos embólicos.',
          'Mantenimiento del ritmo sinusal si se eligió control de ritmo.'
        ],
        criteriosFracaso: [
          'ACV isquémico.',
          'Taquimiocardiopatía por falta de control de frecuencia.'
        ]
      },
      cita: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Fibrilación Auricular (FA) y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_19_valvulopatas',
    nombre: 'Valvulopatías',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Estenosis o insuficiencias valvulares.',
    sintomasClave: ['Disnea', 'Soplos', 'Síncope', 'Angina'],
    clinica: {
      signosSintomas: ['Disnea de esfuerzo', 'Soplos cardiacos característicos', 'Angina', 'Síncope', 'Edema periférico'],
      maniobraExploracion: 'Auscultación cardiaca dinámica. Evaluación de pulsos periféricos.',
      banderasRojas: ['Síncope de esfuerzo', 'Edema agudo de pulmón', 'Angina inestable'],
      cita: 'Guías ESC'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
Las valvulopatías representan un fallo mecánico en las compuertas del corazón, pudiendo ser por Estenosis (incapacidad de apertura total) o Insuficiencia (cierre defectuoso con reflujo). Independientemente de la causa (reumática, degenerativa o congénita), el resultado es una alteración de la dinámica de fluidos intracardíacos que obliga al corazón a realizar un trabajo hemodinámico excesivo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Sobrecarga de Presión (Estenosis):** El ventrículo genera presiones masivas para vencer la obstrucción, provocando una hipertrofia concéntrica que reduce la distensibilidad.
- **Sobrecarga de Volumen (Insuficiencia):** El reflujo constante obliga al ventrículo a dilatarse (hipertrofia excéntrica) para manejar el exceso de sangre, llevando finalmente a un fallo sistólico irreversible.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Pulmonar:** En valvulopatías izquierdas (mitral/aórtica), el aumento de presiones retrógradas causa hipertensión pulmonar y edema intersticial crónico.
- **Sistema Cardiovascular:** Riesgo de muerte súbita (en estenosis aórtica severa) por desajuste entre masa miocárdica e irrigación coronaria.
- **Sistema Hepático/Digestivo:** En valvulopatías derechas (tricúspide), se genera congestión venosa sistémica con hepatomegalia y ascitis.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Estrés de Pared:** La ley de Laplace explica cómo el aumento del radio ventricular (dilatación) eleva la demanda de oxígeno, agotando las reservas miocárdicas.
- **Activación Simpática:** Intento crónico de mantener el gasto cardíaco mediante taquicardia, lo que acelera el desgaste de la arquitectura valvular y miocárdica.

### Correlación con Comorbilidades:
- **Edad Avanzada (Degeneración Fibrocálcica):** Es la principal causa actual de valvulopatía aórtica en el mundo desarrollado.
- **Endocarditis Infecciosa:** Las válvulas previamente dañadas son el sitio primario para la formación de vegetaciones sépticas.`,
      esquemaMental: {
        inicio: 'Daño estructural valvular (degenerativo, reumático, funcional)',
        dano: 'Estenosis (obstrucción) o Insuficiencia (reflujo)',
        consecuencia: 'Hipertrofia, dilatación ventricular y falla cardíaca retrógrada.'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'Ecocardiograma Doppler (Gold Standard). ECG. RX Tórax.',
      tratamiento: 'Manejo médico de síntomas y reparación/reemplazo valvular.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Furosemida', dosis: '20-40 mg', frecuencia: 'Diaria o PRN', observaciones: 'Para manejo de congestión en valvulopatías izquierdas.' },
          { nombre: 'Warfarina', dosis: 'Ajustada según INR', frecuencia: 'Diaria', observaciones: 'Necesaria en pacientes con válvulas mecánicas (Meta INR 2.5-3.5).' },
          { nombre: 'Penicilina G Benzatínica', dosis: '1.2 millones UI', frecuencia: 'Cada 3-4 semanas', observaciones: 'Profilaxis secundaria si la etiología es reumática.' }
        ],
        medidasGenerales: [
          'Profilaxis de endocarditis infecciosa antes de procedimientos dentales (en casos específicos).',
          'Control estricto de la presión arterial para reducir el estrés valvular.',
          'Seguimiento ecocardiográfico seriado para monitorizar la progresión.'
        ]
      },
      monitoreo: {
        parametros: [
          'Clasificación funcional de la disnea (NYHA).',
          'Presencia de soplos cardiacos (cambios en intensidad).',
          'Signos de falla cardíaca derecha (edema, ingurgitación yugular).'
        ],
        signosAlerta: [
          'Síncope de esfuerzo (típico de estenosis aórtica severa).',
          'Disnea súbita o edema agudo de pulmón.',
          'Embolismo sistémico (especialmente en valvulopatía mitral con FA).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Mantenimiento de la estabilidad hemodinámica.',
          'Resolución de los síntomas tras intervención valvular.',
          'Ausencia de complicaciones tromboembólicas.'
        ],
        criteriosFracaso: [
          'Muerte súbita (riesgo en estenosis aórtica severa sintomática).',
          'Instauración de falla cardíaca irreversible.'
        ]
      },
      cita: '2021 ESC/EACTS Guidelines for the management of valvular heart disease'
    },
    enfermeria: {
      nanda: '00029 Disminución del gasto cardíaco r/c alteración del flujo sanguíneo valvular p/v soplos y disnea.',
      intervenciones: [
        { accion: 'Auscultación periódica de ruidos cardíacos en los 4 focos principales.', razon: 'Permite identificar cambios en el timbre o intensidad de los soplos, sugiriendo progresión de la valvulopatía o complicación mecánica.' },
        { accion: 'Vigilancia de signos de bajo gasto (frialdad, llenado capilar lento, oliguria).', razon: 'Signos precoces de que la válvula ya no compensa las demandas del organismo.' },
        { accion: 'Educar sobre la profilaxis de endocarditis bacteriana.', razon: 'Las válvulas dañadas son susceptibles a colonización bacteriana durante procedimientos invasivos o dentales.' },
        { accion: 'Control de peso y balance hídrico estricto.', razon: 'La congestión sistémica y pulmonar es la principal complicación de las valvulopatías avanzadas.' },
        { accion: 'Preparación y cuidados pre/post-procedimiento de reemplazo valvular.', razon: 'Asegura la seguridad del paciente durante la transición al manejo quirúrgico o percutáneo (TAVI).' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_24_tvp',
    nombre: 'TVP',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'La Trombosis Venosa Profunda (TVP) es la formación de un coágulo (trombo) en el sistema venoso profundo. Fisiopatológicamente, se rige por la Tríada de Virchow: estasis sanguínea (falta de retorno venoso), daño endotelial (físico o inflamatorio) e hipercoagulabilidad. Este trombo no sólo obstruye el retorno venoso, elevando la presión hidrostática capilar y causando edema, sino que además actúa como un nido para la propagación proximal, con un riesgo inminente de desprendimiento de fragmentos (émbolos) que migran hacia la circulación pulmonar, desencadenando la complicación fatal: Tromboembolismo Pulmonar (TEP).',
    etiologia: 'Factores que alteran la tríada de Virchow: cirugía ortopédica, neoplasias malignas, inmovilidad prolongada, uso de anticonceptivos orales, embarazo, obesidad y trombofilias hereditarias o adquiridas.',
    fisiopatologiaBasica: 'La obstrucción genera hipertensión venosa distal. Esto aumenta la presión de filtración hidrostática a nivel capilar, provocando extravasación de líquido al intersticio (edema). Además, se libera una respuesta inflamatoria local que causa dolor y eritema.',
    complicaciones: [
      'Tromboembolismo Pulmonar (TEP)',
      'Síndrome Postrombótico (insuficiencia venosa crónica)',
      'Flegmasía Cerulea Dolens (isquemia arterial por compresión venosa masiva)',
      'Úlceras venosas crónicas',
      'Hipertensión pulmonar tromboembólica crónica'
    ],
    riesgosNoTratado: [
      'Muerte súbita por TEP masivo',
      'Discapacidad por síndrome postrombótico severo',
      'Necesidad de amputación en flegmasía fulminante',
      'Insuficiencia cardíaca derecha progresiva'
    ],
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    banderasRojas: [
      'Disnea súbita (TEP)',
      'Cianosis de la extremidad',
      'Pérdida de pulsos distales',
      'Dolor extremadamente intenso y desproporcionado'
    ],
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Trombosis Venosa Profunda (TVP) se origina por la formación de un coágulo hemático en el sistema venoso profundo, usualmente en los miembros inferiores. El evento disparador se rige por la **Tríada de Virchow**: estasis sanguínea, lesión endotelial e hipercoagulabilidad. A diferencia de la trombosis arterial, la TVP ocurre en un sistema de baja presión donde el trombo puede crecer longitudinalmente de forma silente.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Extensión Proximal:** El trombo puede progresar hacia venas más grandes (femorales, ilíacas), donde la adherencia a la pared es menor y el riesgo de desprendimiento es máximo.
- **Organización y Recanalización:** Con el tiempo, el trombo se retrae y se vuelve fibroso, pero el daño a las válvulas venosas es a menudo permanente.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** El riesgo más temido es el Tromboembolismo Pulmonar (TEP). Un fragmento del trombo viaja al corazón derecho y se aloja en las arterias pulmonares, bloqueando el intercambio gaseoso y pudiendo causar colapso circulatorio.
- **Sistema Vascular Periférico:** La obstrucción crónica y el daño valvular derivan en el **Síndrome Postrombótico**, caracterizado por edema crónico, dolor y úlceras por hipertensión venosa.
- **Microcirculación:** El edema severo puede comprimir la microcirculación arterial de la extremidad (Phlegmasia Cerulea Dolens), una emergencia quirúrgica.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Dímero D:** Es un producto de la degradación de la fibrina estable. Su presencia en sangre indica que hay una formación activa de coágulos y una posterior fibrinólisis.
- **Citoquinas Inflamatorias:** La presencia del trombo desencadena una respuesta inflamatoria local en la pared de la vena, lo que explica el dolor y el calor localizado.

### Correlación con Comorbilidades:
- **Cáncer (Estado de Hipercoagulabilidad):** Muchos tumores secretan sustancias procoagulantes que aumentan drásticamente el riesgo de TVP.
- **Inmovilidad Prolongada (Cirugía/Viajes largos):** Elimina la bomba muscular de la pantorrilla, generando el estasis necesario para la nucleación del trombo.`,
      esquemaMental: {
        inicio: 'Tríada de Virchow (Estasis, lesión endotelial, hipercoagulabilidad).',
        dano: 'Obstrucción del flujo venoso y respuesta inflamatoria',
        consecuencia: 'Riesgo de embolismo pulmonar o síndrome postrombótico'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'Dímero D (valor predictivo negativo). Ecografía Doppler venosa (Elección).',
      tratamiento: 'Anticoagulación (Heparinas o DOACs). Medias de compresión.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Enoxaparina', dosis: '1 mg/kg', frecuencia: 'Cada 12 horas SC', observaciones: 'Anticoagulación de inicio rápido. Ajustar en falla renal.' },
          { nombre: 'Rivaroxabán', dosis: '15 mg bid (21 días) luego 20 mg', frecuencia: 'Según esquema', observaciones: 'Anticoagulante oral directo; no requiere monitoreo de INR.' },
          { nombre: 'Warfarina', dosis: 'Variable (Meta INR 2.0-3.0)', frecuencia: 'Diaria', observaciones: 'Requiere puente con heparina al inicio.' }
        ],
        medidasGenerales: [
          'Movilización temprana una vez iniciada la anticoagulación efectiva.',
          'Uso de medias de compresión graduada para prevenir el síndrome postrombótico.',
          'Cribado de neoplasias ocultas en TVP idiopática.'
        ]
      },
      monitoreo: {
        parametros: [
          'Medición del perímetro de la extremidad afectada.',
          'Presencia de dolor y eritema.',
          'Signos de sangrado por anticoagulación.'
        ],
        signosAlerta: [
          'Dolor torácico súbito y hemoptisis (sospecha de TEP).',
          'Phlegmasia cerulea dolens (cianosis y dolor extremo).',
          'Sangrado mayor (digestivo, hematuria, SNC).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Resolución de la inflamación y el dolor local.',
          'Ausencia de embolismo pulmonar.',
          'Recanalización venosa documentada en Doppler de control.'
        ],
        criteriosFracaso: [
          'Extensión del trombo pese a tratamiento.',
          'Síndrome postrombótico crónico invalidante.'
        ]
      },
      cita: '2021 Chest Guideline and Expert Panel Report: Antithrombotic Therapy for VTE Disease'
    },
    enfermeria: {
      nanda: '00204 Perfusión tisular periférica ineficaz r/c interrupción del flujo venoso p/v edema y cambios en la coloración de la piel.',
      intervenciones: [
        { accion: 'Medición diaria del diámetro de la extremidad afectada.', razon: 'Es el parámetro clínico más objetivo para evaluar la progresión o resolución del edema y el riesgo de síndrome compartimental.' },
        { accion: 'Vigilancia estrecha de la función respiratoria (FR, SpO2, dolor torácico).', razon: 'Detección temprana de Tromboembolismo Pulmonar (TEP), la complicación más letal de la TVP.' },
        { accion: 'Instruir sobre el reposo en cama inicial con elevación de la extremidad (15-20°).', razon: 'Favorece el retorno venoso y disminuye la presión hidrostática, reduciendo el dolor y el edema.' },
        { accion: 'Administración y monitorización de anticoagulantes (Heparinas/ACOs).', razon: 'Previene la extensión del trombo y la formación de nuevos émbolos.' },
        { accion: 'Uso de medias de compresión graduada tras la fase aguda.', razon: 'Previene el síndrome postrombótico al mantener la competencia valvular venosa.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_25_arritmiasventriculares',
    nombre: 'Arritmias Ventriculares',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Trastornos del ritmo originados en los ventrículos (TV, FV).',
    sintomasClave: ['Palpitaciones', 'Síncope', 'Dolor torácico', 'Paro respiratorio'],
    clinica: {
      signosSintomas: ['Mareo', 'Hipotensión', 'Pérdida de consciencia', 'Pulso irregular o ausente'],
      maniobraExploracion: 'Monitorización ECG continua, evaluación de pulso y estado de alerta.',
      banderasRojas: ['TV sin pulso', 'Fibrilación ventricular', 'Intervalo QT prolongado'],
      cita: 'Guías AHA/ACC'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
Las Arritmias Ventriculares se originan por debajo del haz de His, en el tejido muscular o el sistema de conducción ventricular. El evento disparador suele ser la formación de un circuito de reentrada (común en cicatrices post-infarto) o el aumento del automatismo en focos ectópicos. A diferencia de las arritmias supraventriculares, estas comprometen directamente la eficacia del bombeo ventricular, pudiendo anular por completo el gasto cardíaco.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Reentrada y Disociación:** En la Taquicardia Ventricular (TV), los ventrículos laten tan rápido que no hay tiempo para el llenado diastólico.
- **Fibrilación Ventricular (FV):** El grado máximo de caos, donde el corazón solo "tiembla" y el flujo sanguíneo cesa instantáneamente, llevando a la muerte súbita si no se desfibrila.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico:** El cese del flujo sanguíneo cerebral causa pérdida de conciencia en segundos y daño irreversible a partir de los 4-6 minutos (muerte cerebral).
- **Sistema Cardiovascular:** Genera una isquemia miocárdica global debido a que la perfusión coronaria (que ocurre en diástole) desaparece por la taquicardia extrema o el paro.
- **Sistema Renal:** Isquemia aguda por hipoperfusión severa durante el evento arrítmico.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Electrolitos (Potasio/Magnesio):** El potasio extracelular elevado o bajo altera el potencial de membrana, siendo el factor bioquímico desencadenante más común.
- **Catecolaminas Adrenales:** El estrés del colapso libera adrenalina masiva, lo que puede perpetuar la arritmia al aumentar la excitabilidad ventricular.

### Correlación con Comorbilidades:
- **Cardiopatía Isquémica (IAM previo):** La cicatriz fibrótica es el sustrato perfecto para los circuitos de reentrada.
- **Insuficiencia Cardíaca:** La dilatación ventricular estira las fibras musculares, alterando los canales iónicos (remodelado eléctrico).`,
      esquemaMental: {
        inicio: 'Foco ectópico o circuito de reentrada ventricular',
        dano: 'Gasto cardiaco ineficaz o nulo',
        consecuencia: 'Muerte súbita cardiaca'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'ECG de 12 derivaciones (QRS ancho > 120ms). Holter de 24h. Electrolitos (K, Mg).',
      tratamiento: 'Desfibrilación (si es inestable). Amiodarona o Lidocaina (si es estable).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Amiodarona', dosis: '300 mg (Bolo en PCR) o 150 mg', frecuencia: 'Según protocolo ACLS', observaciones: 'Antiarrítmico de amplio espectro; de elección en pacientes con falla cardíaca.' },
          { nombre: 'Sulfato de Magnesio', dosis: '1 - 2 g IV', frecuencia: 'En 15-20 min', observaciones: 'De elección para el tratamiento de Torsade de Pointes (TV polimórfica).' },
          { nombre: 'Lidocaína', dosis: '1 - 1.5 mg/kg', frecuencia: 'Bolo inicial', observaciones: 'Alternativa en TV/FV refractaria; actúa sobre tejido isquémico.' }
        ],
        medidasGenerales: [
          'Monitorización electrocardiográfica continua en unidad de cuidados críticos.',
          'Identificación y corrección de factores reversibles (isquemia, electrolitos, hipoxia).',
          'Evaluación para implante de Desfibrilador Automático Implantable (DAI).'
        ]
      },
      monitoreo: {
        parametros: [
          'Telemetría continua (detección de salvas de TV).',
          'Intervalo QT corregido (QTc) si usa antiarrítmicos.',
          'Niveles de Potasio y Magnesio séricos.'
        ],
        signosAlerta: [
          'Síncope o presíncope.',
          'Disociación electromecánica.',
          'Dolor torácico isquémico persistente.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Supresión de la arritmia ventricular.',
          'Mantenimiento de la estabilidad hemodinámica.',
          'Prevención de la muerte súbita.'
        ],
        criteriosFracaso: [
          'Degeneración a Fibrilación Ventricular (FV).',
          'Tormenta eléctrica (3 o más episodios de TV en 24h).'
        ]
      },
      cita: '2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death'
    },
    enfermeria: {
      nanda: '00029 Disminución del gasto cardíaco r/c alteración de la frecuencia y el ritmo cardíaco p/v extrasístoles ventriculares y síncope.',
      intervenciones: [
        { accion: 'Monitorización continua de ECG y registro de episodios de arritmia.', razon: 'Identificar el tipo de arritmia y su repercusión hemodinámica inmediata.' },
        { accion: 'Asegurar la disponibilidad inmediata del desfibrilador en la unidad.', razon: 'Las arritmias ventriculares pueden degenerar en ritmos de paro (TVSP/FV) que requieren choque eléctrico inmediato.' },
        { accion: 'Monitorizar niveles séricos de fármacos antiarrítmicos (ej. Amiodarona).', razon: 'Asegura niveles terapéuticos y detecta toxicidad orgánica (tiroidea, pulmonar).' },
        { accion: 'Vigilancia de electrolitos (K+, Mg++, Ca++) y corrección vigorosa.', razon: 'La hipopotasemia e hipomagnesemia son los principales desencadenantes químicos de tormentas arrítmicas.' },
        { accion: 'Proporcionar un ambiente tranquilo y calmar la ansiedad del paciente.', razon: 'El estrés y las catecolaminas aumentan la excitabilidad ventricular y el riesgo de arritmia.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_26_miocarditis',
    nombre: 'Miocarditis',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Inflamación aguda del miocardio, frecuentemente viral.',
    sintomasClave: ['Dolor torácico pleurítico', 'Disnea', 'Fatiga', 'Arritmias'],
    clinica: {
      signosSintomas: ['Fiebre', 'Síntomas gripales previos', 'Soplos nuevos', 'Frote pericárdico'],
      maniobraExploracion: 'Auscultación cardiaca y pulmonar. Evaluación de signos de falla cardiaca.',
      banderasRojas: ['Choque cardiogénico', 'Bloqueos AV de alto grado', 'Derrame pericárdico severo'],
      cita: 'Guías ESC'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Miocarditis es una inflamación del músculo cardíaco, desencadenada habitualmente por una infección viral (ej. Coxsackie, COVID-19) o una respuesta autoinmune. El evento disparador es la entrada del patógeno al miocito o la identificación de antígenos cardíacos como extraños, lo que desata una infiltración leucocitaria masiva que destruye las proteínas contráctiles y la integridad celular.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Fase Aguda:** Destrucción directa de miocitos por el virus o por linfocitos T citotóxicos, causando caída de la fracción de eyección.
- **Fase Crónica (Remodelado):** Si la inflamación persiste, el tejido muscular es reemplazado por colágeno (fibrosis), lo que puede derivar en una Miocardiopatía Dilatada permanente.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** Genera una falla cardíaca aguda que puede ser fulminante. Además, las zonas inflamadas son focos de arritmias ventriculares letales.
- **Sistema Inmunitario:** Activación sistémica de citoquinas (Tormenta de citoquinas) que puede causar daño multiorgánico similar a una sepsis.
- **Sistema Hepático/Sustancia Blanca:** La hipoperfusión por falla de bomba afecta secundariamente la función metabólica general.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Troponinas:** Su elevación indica daño celular miocárdico activo y es fundamental para el diagnóstico.
- **Citoquinas (IL-6, TNF-alfa):** Niveles altos de estos mediadores inflamatorios aumentan la permeabilidad vascular y empeoran el edema miocárdico intersticial.

### Correlación con Comorbilidades:
- **Enfermedades Autoinmunes (Lupus/Artritis):** El paciente tiene una predisposición basal a que su sistema inmune ataque el tejido cardíaco ante cualquier gatillo.
- **Infecciones Recientes:** El antecedente de cuadro gripal o diarreico semanas antes es la clave diagnóstica clásica.`,
      esquemaMental: {
        inicio: 'Infección viral (Enterovirus, COVID-19, etc.)',
        dano: 'Inflamación y necrosis miocárdica',
        consecuencia: 'Miocardiopatía dilatada o insuficiencia cardiaca aguda'
      },
      cita: 'Harrison\'s'
    },
    manejo: {
      diagnostico: 'Troponinas I/T. ECG (elevación ST cóncavo). Resonancia Magnética Cardiaca (Criterios de Lake Louise).',
      tratamiento: 'Reposo estricto (3-6 meses). Manejo de falla cardíaca. AINEs (si hay pericarditis).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Enalapril / Losartán', dosis: 'Titulación progresiva', frecuencia: 'Cada 12-24 horas', observaciones: 'Para remodelado ventricular en caso de disfunción sistólica.' },
          { nombre: 'Carvedilol', dosis: '3.125 - 25 mg', frecuencia: 'Cada 12 horas', observaciones: 'Betabloqueador; iniciar solo cuando el paciente esté estable hemodinámicamente.' },
          { nombre: 'Paracetamol', dosis: '500 mg - 1 g', frecuencia: 'Cada 8 horas PRN', observaciones: 'Manejo de la fiebre y dolor; evitar AINEs a dosis altas en fase aguda si hay disfunción severa.' }
        ],
        medidasGenerales: [
          'Reposo físico absoluto durante la fase inflamatoria aguda (prevenir arritmias y progresión).',
          'Evitar el uso de esteroides de forma rutinaria (salvo causas autoinmunes específicas).',
          'Vacunación antigripal anual para reducir riesgos de nuevas infecciones virales.'
        ]
      },
      monitoreo: {
        parametros: [
          'Fracción de eyección del ventrículo izquierdo (FEVI) por ecocardiografía.',
          'Telemetría para detección de arritmias auriculares o ventriculares.',
          'Proteína C Reactiva (PCR) y VSG como marcadores inflamatorios.'
        ],
        signosAlerta: [
          'Disnea de reposo o paroxística (falla cardíaca fulminante).',
          'Síncope o mareo severo.',
          'Dolor torácico persistente que no cede con analgésicos.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Normalización de la FEVI.',
          'Ausencia de arritmias malignas.',
          'Resolución de los marcadores de inflamación miocárdica.'
        ],
        criteriosFracaso: [
          'Evolución a miocardiopatía dilatada crónica.',
          'Necesidad de trasplante cardíaco o asistencia ventricular.'
        ]
      },
      cita: 'Current Diagnostic and Treatment Strategies for Specific Dilated Cardiomyopathies: A Scientific Statement From the American Heart Association'
    },
    enfermeria: {
      nanda: '00029 Disminución del gasto cardíaco r/c inflamación del miocardio p/v fatiga y cambios enzimáticos.',
      intervenciones: [
        { accion: 'Promover el reposo estricto por periodos prolongados (semanas/meses).', razon: 'Crucial para permitir la resolución del proceso inflamatorio y prevenir la miocardiopatía dilatada.' },
        { accion: 'Monitorización hemodinámica estrecha (TA, FC, Diuresis).', razon: 'La miocarditis puede progresar de forma fulminante a falla cardíaca refractaria o shock.' },
        { accion: 'Valorar la aparición de arritmias en la monitorización continua.', razon: 'La inflamación miocárdica crea focos de inestabilidad eléctrica muy peligrosos.' },
        { accion: 'Control estricto de la ingesta de sodio y líquidos.', razon: 'Previene la sobrecarga de volumen en un miocardio debilitado e inflamado.' },
        { accion: 'Administración de tratamiento inmunosupresor o antiviral según prescripción.', razon: 'Abordaje directo de la etiología inflamatoria o infecciosa subyacente.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_27_shockcardiognico',
    nombre: 'Shock Cardiogénico',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Estado de hipoperfusión tisular crítica por falla primaria de la bomba cardiaca.',
    sintomasClave: ['Hipotensión PAS < 90', 'Oliguria', 'Piel fría/moteada', 'Congestión pulmonar'],
    clinica: {
      signosSintomas: ['Taquicardia compensatoria', 'Estertores crepitantes', 'Ingurgitación yugular', 'Confusión mental'],
      maniobraExploracion: 'Evaluación hemodinámica. Cálculo de presión de perfusión. Auscultación de S3/S4.',
      banderasRojas: ['Anuria', 'Acidosis láctica severa', 'Edema agudo pulmonar masivo'],
      cita: 'AHA Clinical Guidelines'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Shock Cardiogénico representa el grado máximo de insuficiencia cardíaca, donde el corazón no puede mantener una perfusión tisular mínima a pesar de presiones de llenado adecuadas. El evento disparador suele ser un infarto extenso (>40% del miocardio) o una complicación mecánica. Es un estado de hipoperfusión sistémica crítica donde el metabolismo celular pasa de aerobio a anaerobio de forma global.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Disfunción Sistólica Crítica:** La caída del gasto cardíaco baja la presión de perfusión coronaria, lo que aumenta la isquemia miocárdica y empeora aún más la fuerza de contracción (Círculo Vicioso de la Isquemia).
- **Respuesta Vasoconstrictora:** El cuerpo intenta mantener la TA mediante una vasoconstricción sistémica extrema (aumento de poscarga), lo cual es el "golpe de gracia" para un corazón que ya no puede bombear.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Oliguria o anuria inmediata por caída de la presión de filtración glomerular.
- **Sistema Neurológico:** Encefalopatía hipóxica, agitación y posterior pérdida de conciencia por falta de sustrato energético cerebral.
- **Sistema Hepato-Esplácnico:** Necrosis centrolobulillar hepática (hígado de choque) e isquemia intestinal que favorece la traslocación bacteriana.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Lactato Sérico:** El marcador bioquímico de hipoxia tisular; niveles elevados indican que las células están "asfixiándose" metabólicamente.
- **Acidosis Metabólica:** La acumulación de ácido láctico inhibe las enzimas celulares y reduce la respuesta del corazón a las catecolaminas endógenas y exógenas.

### Correlación con Comorbilidades:
- **Diabetes Mellitus:** Los pacientes diabéticos suelen tener enfermedad de múltiples vasos, lo que aumenta el riesgo de que un infarto progrese a shock.
- **Edad Avanzada:** La menor reserva fisiológica limita la capacidad de compensar la caída del gasto cardíaco.`,
      esquemaMental: {
        inicio: 'Infarto extenso o miocarditis severa',
        dano: 'Gasto cardiaco insuficiente para demandas metabólicas',
        consecuencia: 'Fallo multiorgánico e hipoxia tisular'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'Ecocardiograma urgente. Lactato sérico. Gasometría arterial y venosa.',
      tratamiento: 'Inotrópicos y vasopresores. Revascularización inmediata del IAM.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Noradrenalina', dosis: '0.05 - 1 mcg/kg/min', frecuencia: 'Infusión continua', observaciones: 'Vasopresor de elección inicial para mantener PAM > 65 mmHg.' },
          { nombre: 'Dobutamina', dosis: '2 - 20 mcg/kg/min', frecuencia: 'Infusión continua', observaciones: 'Inotrópico de elección para mejorar el índice cardíaco; vigilar arritmias.' },
          { nombre: 'Levosimendán', dosis: '0.05-0.2 mcg/kg/min', frecuencia: 'Infusión de 24h', observaciones: 'Inodilatador; sensibilizador al calcio útil en falla cardíaca aguda.' }
        ],
        medidasGenerales: [
          'Asegurar vía aérea y ventilación mecánica invasiva temprana para reducir el consumo de oxígeno.',
          'Revascularización urgente si la causa es SCA (Angioplastia primaria o Cirugía).',
          'Considerar dispositivos de asistencia circulatoria (Balón de contrapulsación, Impella, ECMO).'
        ]
      },
      monitoreo: {
        parametros: [
          'Presión Arterial Media (PAM) continua y Presión Venosa Central (PVC).',
          'Aclaramiento de Lactato cada 2-4 horas (marcador de perfusión).',
          'Saturación Venosa Central de Oxígeno (SvcO2 meta > 70%).'
        ],
        signosAlerta: [
          'Oliguria persistente (< 0.5 ml/kg/h).',
          'Piel fría, moteada o cianótica.',
          'Acidosis metabólica progresiva refractaria.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Estabilización hemodinámica sin necesidad de vasopresores.',
          'Normalización de los niveles de lactato plasmático.',
          'Recuperación de la función renal y estado mental.'
        ],
        criteriosFracaso: [
          'Fallo multiorgánico fulminante.',
          'Muerte pese a máxima terapia de soporte.'
        ]
      },
      cita: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure'
    },
    enfermeria: {
      nanda: '00029 Disminución del gasto cardíaco r/c fallo de la bomba miocárdica p/v hipotensión severa e hipoperfusión.',
      intervenciones: [
        { accion: 'Monitorización invasiva de presión arterial (Línea arterial).', razon: 'Proporciona una lectura continua y precisa latido a latido, necesaria para el ajuste fino de fármacos vasoactivos e inotrópicos.' },
        { accion: 'Vigilancia de la perfusión distal (color, temperatura, pulsos).', razon: 'Detecta signos de isquemia periférica secundaria a la vasoconstricción compensatoria extrema o uso de dosis altas de vasopresores.' },
        { accion: 'Control estricto de diuresis horaria (sonda vesical).', razon: 'El flujo urinario es el mejor indicador clínico de la perfusión de órganos vitales y del gasto cardíaco real.' },
        { accion: 'Asistencia en la inserción y manejo del balón de contrapulsación intraaórtico (BCIA).', razon: 'Mejora la perfusión coronaria y reduce la poscarga del ventrículo izquierdo debilitado.' },
        { accion: 'Optimización del soporte ventilatorio y monitorización de gases sanguíneos.', razon: 'Reduce el consumo de oxígeno de los músculos respiratorios y asegura una oxigenación miocárdica adecuada.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_28_insuficienciavenosacrnica',
    nombre: 'Insuficiencia Venosa Crónica',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Alteración prolongada del retorno venoso por disfunción valvular o hipertensión venosa.',
    sintomasClave: ['Pesadez de piernas', 'Varices', 'Edema que mejora con reposo', 'Prurito'],
    clinica: {
      signosSintomas: ['Telangiectasias', 'Cambios pigmentarios (Dermatitis ocre)', 'Lipodermatoesclerosis', 'Úlceras maleolares'],
      maniobraExploracion: 'Clasificación CEAP. Maniobra de Trendelenburg venosa.',
      banderasRojas: ['Úlcera infectada', 'Sangrado de varices (Varicorragia)', 'Dolor agudo (sugiere TVP asociada)'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Insuficiencia Venosa Crónica (IVC) es la incapacidad de las venas de las extremidades inferiores para transportar la sangre de retorno hacia el corazón. El evento disparador es la **hipertensión venosa**, generada habitualmente por la incompetencia de las válvulas (reflujo) o la obstrucción tras una trombosis. A diferencia del sistema arterial, aquí el problema no es la llegada, sino la evacuación eficiente del flujo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Incompetencia Valvular:** Al fallar las válvulas, la sangre cae por gravedad (reflujo), aumentando la presión hidrostática en las venas distales.
- **Teoría de las "Esposas de Leucocitos":** La hipertensión venosa reduce la velocidad del flujo en los capilares, permitiendo que los glóbulos blancos se adhieran al endotelio, liberando radicales libres y causando daño tisular crónico.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Tegumentario:** La extravasación de eritrocitos libera hemoglobina, que se degrada en hemosiderina, causando la coloración ocre (Dermatitis de estasis). A largo plazo, se produce fibrosis cutánea (Lipodermatoesclerosis).
- **Sistema Vascular Periférico:** Dilatación tortuosa de las venas superficiales (várices) debido a que el sistema profundo no tolera la presión y la deriva hacia afuera.
- **Tejido Celular Subcutáneo:** Edema crónico que favorece las infecciones (celulitis) y dificulta la cicatrización (úlceras venosas).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Metaloproteinasas de Matriz (MMP):** Estas enzimas se activan en exceso por la inflamación venosa crónica, degradando el colágeno de la piel y permitiendo la formación de úlceras.
- **Factores de Crecimiento:** Se encuentran alterados en el exudado de las úlceras, lo que perpetúa la falta de cierre de las heridas.

### Correlación con Comorbilidades:
- **Obesidad:** El exceso de presión intraabdominal dificulta el retorno venoso, actuando como un obstáculo mecánico constante.
- **Sedentarismo:** Elimina la "bomba muscular" de la pantorrilla, que es el motor principal del retorno venoso contra la gravedad.`,
      esquemaMental: {
        inicio: 'Incompetencia valvular venosa',
        dano: 'Hipertensión venosa persistente',
        consecuencia: 'Cambios tróficos cutáneos y ulceración'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'Eco Doppler venoso (Elección). Clasificación CEAP.',
      tratamiento: 'Terapia de compresión. Venotónicos. Cambios de estilo de vida.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Fracción flavonoica purificada (Diosmina/Hesperidina)', dosis: '500-1000 mg', frecuencia: 'Diaria', observaciones: 'Venotónico que disminuye la permeabilidad capilar y el edema.' },
          { nombre: 'Pentoxifilina', dosis: '400 mg', frecuencia: 'Cada 8 horas', observaciones: 'Coadyuvante en el manejo de úlceras venosas para mejorar la microcirculación.' },
          { nombre: 'Corticoides tópicos (solo fase aguda)', dosis: 'Capa fina', frecuencia: 'Según indicación', observaciones: 'Para el manejo de la dermatitis por estasis; uso limitado por riesgo de atrofia cutánea.' }
        ],
        medidasGenerales: [
          'Uso de medias de compresión elástica (grado II o III según severidad).',
          'Elevación de extremidades por encima del nivel del corazón durante el descanso.',
          'Evitar periodos largos de bipedestación o sedestación inmóvil.'
        ]
      },
      monitoreo: {
        parametros: [
          'Estado de la piel (presencia de eritema, eccema o induración).',
          'Grado de edema maleolar.',
          'Evolución de úlceras venosas (área, profundidad, exudado).'
        ],
        signosAlerta: [
          'Signos de celulitis o erisipela sobreañadida.',
          'Sangrado profuso de varices (Varicorragia - Emergencia).',
          'Dolor súbito incapacitante (sospecha de TVP concomitante).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Reducción del dolor y la pesadez de piernas.',
          'Cierre de úlceras venosas crónicas.',
          'Mejoría en la escala de severidad venosa (VCSS).'
        ],
        criteriosFracaso: [
          'Infecciones recurrentes de partes blandas.',
          'Progresión a lipodermatoesclerosis severa irreversible.'
        ]
      },
      cita: 'Society for Vascular Surgery and American Venous Forum Guidelines on management of chronic venous disease'
    },
    enfermeria: {
      nanda: '00204 Perfusión tisular periférica ineficaz r/c hipertensión venosa crónica p/v edema y cambios tróficos.',
      intervenciones: [
        { accion: 'Instruir y asegurar la colocación correcta de medias de compresión graduada.', razon: 'Reduce el diámetro de las venas superficiales y aumenta la velocidad del flujo venoso profundo, disminuyendo el reflujo.' },
        { accion: 'Fomentar la realización de ejercicios de dorsiflexión del tobillo.', razon: 'Activa la bomba muscular de la pantorrilla, facilitando el vaciado venoso hacia el corazón.' },
        { accion: 'Cuidado e hidratación de la piel de las extremidades.', razon: 'La piel con estasis venosa es frágil; la hidratación previene grietas y celulitis.' },
        { accion: 'Educación sobre el control de peso y evitar el bipedestismo prolongado.', razon: 'Reduce la presión hidrostática persistente sobre las válvulas venosas de los miembros inferiores.' },
        { accion: 'Vigilancia de úlceras venosas y aplicación de curas húmedas.', razon: 'Favorece la granulación y previene la cronificación de las lesiones cutáneas.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_29_cardiopatareumtica',
    nombre: 'Cardiopatía Reumática',
    servicio: 'Medicina Interna',
    system: 'Sistema Cardiovascular',
    color: 'var(--destructive)',
    definicionCaso: 'Secuela permanente de la fiebre reumática aguda que afecta principalmente las válvulas cardiacas.',
    sintomasClave: ['Disnea de esfuerzo', 'Palpitaciones (FA)', 'Eventos embólicos', 'Soplos cardiacos'],
    clinica: {
      signosSintomas: ['Soplo de estenosis mitral (el más frecuente)', 'Falla cardiaca derecha', 'Hemoptisis (en estenosis mitral severa)'],
      maniobraExploracion: 'Auscultación exhaustiva en busca de soplos valvulares y chasquidos de apertura.',
      banderasRojas: ['Edema agudo de pulmón', 'ACV embólico', 'Endocarditis infecciosa sobreañadida'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Cardiopatía Reumática es el daño permanente en las válvulas cardíacas tras episodios recurrentes de Fiebre Reumática Aguda. El evento disparador es una faringoamigdalitis por *Streptococcus pyogenes* que desencadena una respuesta autoinmune cruzada. Los anticuerpos contra la bacteria identifican erróneamente proteínas del corazón (como la miosina) como enemigas, atacando directamente las cúspides valvulares.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Valvulitis Aguda:** Inflamación inicial con formación de pequeñas verrugas en los bordes de cierre.
- **Fibrosis Crónica:** Tras años de inflamación, las válvulas sufren fibrosis, engrosamiento, fusión de las comisuras y acortamiento de las cuerdas tendinosas, llevando a estenosis o insuficiencia definitiva.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** La válvula mitral es la más afectada (90% de los casos). Genera una dilatación masiva de la aurícula izquierda, lo que deriva en Fibrilación Auricular crónica.
- **Sistema Pulmonar:** La estenosis mitral reumática causa hipertensión pulmonar severa secundaria a la congestión retrógrada.
- **Sistema Neurológico:** Alto riesgo de ictus embólico debido a la combinación de FA y estenosis mitral (formación de trombos en aurícula).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Mimetismo Molecular:** Es el proceso bioquímico clave donde las proteínas M del estreptococo "engañan" al sistema inmune para que ataque el colágeno tipo IV del corazón.
- **Reactantes de Fase Aguda (VSG/PCR):** Elevados durante los brotes de fiebre reumática, marcando la actividad de la enfermedad que daña la válvula.

### Correlación con Comorbilidades:
- **Condiciones Socioeconómicas:** La falta de acceso a antibióticos para faringitis es el principal factor de riesgo para desarrollar esta cardiopatía.
- **Embarazo:** El aumento de volumen plasmático durante el embarazo puede descompensar una estenosis mitral reumática previamente estable.`,
      esquemaMental: {
        inicio: 'Fiebre reumática recurrente',
        dano: 'Inflamación y posterior cicatrización valvular',
        consecuencia: 'Estenosis o insuficiencia valvular crónica'
      },
      cita: 'Fisiopatología Estándar'
    },
    manejo: {
      diagnostico: 'Ecocardiograma (Morfometría valvular). Antiestreptolisina O (ASLO). Criterios de Jones (para fiebre aguda).',
      tratamiento: 'Profilaxis antibiótica a largo plazo. Manejo valvular.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Penicilina G Benzatínica', dosis: '1.2 millones UI IM', frecuencia: 'Cada 3-4 semanas', observaciones: 'Profilaxis secundaria de por vida o hasta los 40 años según afectación.' },
          { nombre: 'Prednisona', dosis: '1-2 mg/kg/día', frecuencia: 'Diaria en fase aguda', observaciones: 'Uso en carditis reumática severa con falla cardíaca.' },
          { nombre: 'Warfarina', dosis: 'Meta INR 2.0-3.0', frecuencia: 'Diaria', observaciones: 'Indispensable en pacientes con estenosis mitral y Fibrilación Auricular.' }
        ],
        medidasGenerales: [
          'Erradicación del estreptococo en el paciente y contactos cercanos.',
          'Control odontológico riguroso para prevenir endocarditis bacteriana.',
          'Educación sobre la importancia de la adherencia a la profilaxis intramuscular.'
        ]
      },
      monitoreo: {
        parametros: [
          'Frecuencia cardíaca (detección de FA).',
          'Soplos cardiacos característicos (especialmente rodamiento diastólico mitral).',
          'Signos de congestión pulmonar.'
        ],
        signosAlerta: [
          'Hemoptisis (ruptura de venas bronquiales por hipertensión AI).',
          'Embolismo sistémico (SNC, extremidades).',
          'Disnea de esfuerzo rápidamente progresiva.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Ausencia de nuevos episodios de fiebre reumática.',
          'Estabilidad de la lesión valvular en ecocardiograma.',
          'Mantenimiento de la capacidad funcional.'
        ],
        criteriosFracaso: [
          'Hipertensión pulmonar severa secundaria.',
          'Fibrilación auricular de difícil control.'
        ]
      },
      cita: '2020 World Heart Federation guidelines for the diagnosis and management of rheumatic heart disease'
    },
    enfermeria: {
      nanda: '00029 Disminución del gasto cardíaco r/c daño valvular crónico p/v soplos e insuficiencia cardíaca.',
      intervenciones: [
        { accion: 'Monitorizar la adherencia a la profilaxis con penicilina benzatínica.', razon: 'Evita la recurrencia de ataques de fiebre reumática que causarían mayor daño valvular irreversible.' },
        { accion: 'Control estricto de peso diario y edema periférico.', razon: 'Detección precoz de descompensación hemodinámica hacia falla cardíaca derecha o congestiva.' },
        { accion: 'Monitorización del ritmo cardíaco buscando signos de Fibrilación Auricular.', razon: 'La dilatación auricular izquierda en la estenosis mitral reumática predispone altamente a FA y eventos embólicos.' },
        { accion: 'Educar sobre la higiene dental y profilaxis de endocarditis.', razon: 'Las válvulas reumáticas son sitios de predilección para la formación de vegetaciones bacterianas.' },
        { accion: 'Apoyo emocional y educación sobre la cronicidad de la enfermedad.', razon: 'Mejora el afrontamiento de una patología que requiere seguimiento y medicación de por vida.' }
      ],
      cita: 'NANDA-I, NIC, NOC'
    }
  },
  {
    id: 'int_30_ecvisqumico',
    nombre: 'ECV Isquémico (Ictus)',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Brain',
    definicionCaso: 'Déficit neurológico focal súbito por oclusión de una arteria cerebral.',
    sintomasClave: ['Hemiparesia', 'Afasia', 'Desviación de comisura labial', 'Pérdida de visión'],
    clinica: {
      signosSintomas: [
        "Hemiparesia o hemiplejía súbita (contralateral a la lesión).",
        "Afasia (Broca o Wernicke) o disartria.",
        "Desviación de la comisura bucal (parálisis facial central).",
        "Hemianopsia homónima o amaurosis fugax.",
        "Ataxia o vértigo (si afecta circulación posterior)."
      ],
      maniobraExploracion: "1. Escala de Cincinnati (Pre-hospitalaria). 2. Escala NIHSS (Evaluación cuantitativa de severidad). 3. Evaluación de reflejos y sensibilidad focal.",
      banderasRojas: [
        "NIHSS > 25 (Ictus extenso).",
        "Deterioro rápido del nivel de conciencia (sugiere edema cerebral o transformación hemorrágica).",
        "Crisis convulsivas al inicio.",
        "Signos de hipertensión endocraneana."
      ],
      cita: "AHA/ASA Stroke Guidelines 2024"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Evento Cerebrovascular (ECV) Isquémico, coloquialmente conocido como infarto cerebral, es la interrupción brusca del flujo sanguíneo a una región del cerebro. El evento disparador es la oclusión de una arteria cerebral, ya sea por un coágulo viajero (embolia) o por la formación in situ de un trombo sobre una placa de colesterol (aterotrombosis).

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Caída de Energía (Fallo de Bombas):** Sin oxígeno ni glucosa, las neuronas son incapaces de mantener sus bombas de sodio/potasio ATPasa. El sodio inunda las células, arrastrando agua y causando un hinchazón mortal (Edema Citotóxico).
- **El Núcleo del Infarto (Core):** El tejido en el centro de la oclusión se infarta (muere) en cuestión de escasos minutos. Esta necrosis es irreversible.
- **La Zona de Penumbra:** Alrededor del tejido muerto hay una zona que recibe un goteo de sangre por arterias colaterales. Estas neuronas están "aturdidas" y sin funcionar, pero vivas. Reabrir la arteria a tiempo salva la penumbra; si no, el infarto se expande y se "come" esta zona salvable.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico:** Pérdida inmediata de la función controlada por esa arteria. Si es el hemisferio izquierdo (en diestros), se pierde el habla (afasia) y la fuerza del lado derecho del cuerpo (hemiplejía).
- **Sistema Nervioso Autónomo / Cardiovascular:** En el intento visceral de forzar sangre hacia el cerebro atascado, el cuerpo dispara la presión arterial a niveles altísimos (Respuesta de Cushing refleja).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Excitotoxicidad por Glutamato:** Las neuronas agonizantes vomitan todo su glutamato al espacio exterior. Esto hiper-estimula a las neuronas vecinas hasta literalmente matarlas por sobrecarga de calcio (Apoptosis inducida).
- **Radicales Libres:** Si se restaura el flujo sanguíneo de golpe (reperfusión tardía), la avalancha de oxígeno sobre tejido dañado crea especies reactivas que destrozan las membranas celulares (Daño por Reperfusión).

### Correlación con Comorbilidades:
- **Fibrilación Auricular (FA):** Es el enemigo público número uno. El corazón late desordenado y estanca sangre, formando un trombo masivo que sale disparado directo al cerebro.
- **Diabetes Mellitus:** Genera daño microvascular (hialinosis), provocando micro-infartos profundos repetitivos (Infartos Lacunares) que silenciosamente llevan a la demencia vascular.`,
      esquemaMental: {
        inicio: "Oclusión arterial (trombosis, embolia o hipoperfusión).",
        dano: "Fracaso energético celular, edema citotóxico y excitotoxicidad glutamatérgica.",
        consecuencia: "Infarto irreversible (núcleo) rodeado de un área isquémica salvable (penumbra)."
      },
      cita: "AHA/ASA Guidelines for the Early Management of Patients With Acute Ischemic Stroke"
    },
    manejo: {
      diagnostico: "TAC Cráneo simple (Diferenciar de hemorrágico). Angio-TAC/RM (Localizar oclusión). Glucemia capilar (Descartar hipoglucemia).",
      tratamiento: "Trombólisis IV (rTPA) < 4.5h. Trombectomía mecánica < 24h en grandes vasos. Manejo de TA (meta <185/110 para rTPA).",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Alteplase (rTPA)", dosis: "0.9 mg/kg", frecuencia: "Bolo 10% y resto en 1h", observaciones: "Solo en ventana < 4.5h. Vigilar sangrado." },
          { nombre: "Aspirina", dosis: "160-325 mg", frecuencia: "Diaria", observaciones: "Iniciar tras 24h de rTPA o inmediato si no es candidato." },
          { nombre: "Atorvastatina", dosis: "80 mg", frecuencia: "Diaria", observaciones: "Prevención secundaria de alta intensidad." }
        ],
        medidasGenerales: [
          "Mantener cabecera a 30°.",
          "Evitar soluciones hipotónicas.",
          "Control estricto de glucemia (meta 140-180 mg/dL)."
        ]
      },
      monitoreo: {
        parametros: [
          "NIHSS seriado.",
          "Escala de Glasgow.",
          "Control de TA cada 15 min durante fibrinólisis."
        ],
        signosAlerta: [
          "Cefalea súbita intensa o vómitos (Sugerente de transformación hemorrágica).",
          "Aumento de 2 puntos en NIHSS."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Recanalización arterial comprobada.",
          "Mejoría en NIHSS a las 24 horas.",
          "Ausencia de complicaciones hemorrágicas."
        ],
        criteriosFracaso: [
          "Transformación hemorrágica sintomática.",
          "Muerte cerebral."
        ]
      },
      cita: "AHA/ASA 2024"
    },
    enfermeria: {
      nanda: '00201 Riesgo de perfusión tisular cerebral ineficaz',
      intervenciones: [
        { accion: 'Vigilancia estrecha de deglución (Prueba de vaso de agua).', razon: 'Prevenir neumonía por aspiración por disfagia post-ICTUS.' },
        { accion: 'Movilización pasiva y cambios posturales.', razon: 'Prevenir úlceras por presión y trombosis venosa profunda.' },
        { accion: 'Monitorización de signos de HIC.', razon: 'Intervención temprana ante edema cerebral post-infarto.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_31_ecvhemorrgico',
    nombre: 'ECV Hemorrágico (HIC)',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Brain',
    definicionCaso: 'Ruptura de un vaso sanguíneo intracerebral con formación de hematoma.',
    sintomasClave: ['Cefalea explosiva', 'Vómitos', 'Hipotensión', 'Deterioro de consciencia'],
    clinica: {
      signosSintomas: [
        "Cefalea súbita 'la peor de su vida'.",
        "Náuseas y vómitos 'en proyectil'.",
        "Disminución rápida del nivel de conciencia (Glasgow < 8 frecuente).",
        "Déficit neurológico focal según localización (putaminal, talámico).",
        "Crisis convulsivas."
      ],
      maniobraExploracion: "1. Escala de Glasgow (Nivel de conciencia). 2. Reflejos pupilares (Signos de herniación). 3. Fondo de ojo para ver papiledema.",
      banderasRojas: [
        "Midriasis unilateral (Herniación uncal).",
        "Tríada de Cushing (Bradicardia, HTA, alteraciones respiratorias).",
        "Extensión ventricular del sangrado.",
        "Glasgow < 8."
      ],
      cita: "AHA/ASA 2022 Guidelines for Spontaneous ICH"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Evento Cerebrovascular Hemorrágico es la rotura catastrófica de un vaso sanguíneo dentro del cráneo. El evento disparador suele ser la degeneración de las pequeñas arterias por hipertensión crónica (lipohialinosis), debilidades congénitas (aneurismas/malformaciones) o el uso de medicamentos anticoagulantes. 

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Daño Primario (El Martillazo Físico):** La sangre sale a alta presión dentro del tejido cerebral blando, desgarrándolo y aplastando las neuronas en segundos (Efecto de Masa). 
- **Edema Vasogénico:** La ruptura destruye la Barrera Hematoencefálica permitiendo que el suero inunde el cerebro, hinchándolo masivamente. El cráneo es una caja cerrada de hueso; al aumentar la presión adentro se aplastan todos los vasos del cerebro sano (Hipertensión Endocraneana).
- **Daño Secundario (Toxicidad Hematológica):** A las horas, los glóbulos rojos derramados mueren y liberan Hierro y productos de degradación que son tóxicos mortales para la neurona, induciendo inflamación neurotóxica extrema (Daño Perihematomal).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico:** Déficit focal abrupto, idéntico al isquémico, pero suele avanzar a coma profundo rápidamente si la presión empuja el cerebro hacia el agujero del cráneo (Herniación Cerebral).
- **Sistema Cardiovascular:** Se dispara la infame "Triada de Cushing" (Hipertensión brutal, Bradicardia y ritmo respiratorio irregular) que indica compresión inminente del tronco encefálico (el centro de soporte vital).
- **Sistema Digestivo:** Por estrés máximo, se pueden presentar úlceras esofágicas o gástricas masivas (Úlceras de Cushing).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Cascada de Coagulación:** La sangre derramada activa incesantemente factores de coagulación e inflamación celular, llenando el líquido cefalorraquídeo de macrófagos y leucocitos.
- **Citotoxicidad por Trombina:** La propia enzima de la sangre que hace los coágulos (la trombina) en altas dosis envenena al tejido cerebral induciendo su apoptosis suicida.

### Correlación con Comorbilidades:
- **Hipertensión Arterial Crónica:** Transforma las flexibles arteriolas lenticuloestriadas del cerebro en "tubos de cristal" (Microaneurismas de Charcot-Bouchard), listos para reventar con picos de enojo o esfuerzo.
- **Angiopatía Amiloide:** En ancianos, una proteína rara (amiloide) se incrusta en las arterias superficiales cerebrales, volviéndolas frágiles y produciendo sangrados repetitivos en la corteza.`,
      esquemaMental: {
        inicio: "Ruptura venosa/arterial no traumática intraparenquimatosa o subaracnoidea.",
        dano: "Disrupción mecánica neuronal, hipertensión endocraneana y neurotoxicidad por hemólisis.",
        consecuencia: "Edema severo perihematomal, daño isquémico periférico y riesgo de herniación."
      },
      cita: "AHA/ASA Guidelines for the Management of Spontaneous Intracerebral Hemorrhage"
    },
    manejo: {
      diagnostico: "TAC Cráneo simple (Gold standard). Angio-TAC para descartar aneurismas o MAV. Perfil de coagulación.",
      tratamiento: "Control agresivo de TA (Meta PAS < 140 mmHg). Manejo de PIC elevada (Manitol/Salino hipertónico). Reversión de anticoagulación.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Labetalol / Nicardipino", dosis: "5-20 mg bolo", frecuencia: "Según necesidad", observaciones: "Control estricto de TA para evitar expansión del hematoma." },
          { nombre: "Manitol 20%", dosis: "0.5 - 1 g/kg", frecuencia: "Cada 6-8h", observaciones: "Solo si hay signos de hipertensión endocraneana." },
          { nombre: "Vitamina K + Complejo Protrombínico", dosis: "Según INR", frecuencia: "Dosis única", observaciones: "En pacientes anticoagulados con warfarina." }
        ],
        medidasGenerales: [
          "Protección de vía aérea (IOT si Glasgow < 8).",
          "Cabecera a 30-45°.",
          "Analgesia y sedación (evitar maniobras de Valsalva)."
        ]
      },
      monitoreo: {
        parametros: [
          "Presión Intracraneal (en algunos casos).",
          "Escala de coma de Glasgow horaria.",
          "Presión Arterial Media (PAM)."
        ],
        signosAlerta: [
          "Anisocoria progresiva.",
          "Posturas de decorticación o descerebración.",
          "Bradicardia súbita."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Estabilidad del tamaño del hematoma en TAC control.",
          "Control de la PIC sin herniación.",
          "Supervivencia con mínima discapacidad."
        ],
        criteriosFracaso: [
          "Expansión del hematoma > 33%.",
          "Herniación cerebral irreversible."
        ]
      },
      cita: "AHA/ASA ICH Guidelines 2022"
    },
    enfermeria: {
      nanda: '00201 Riesgo de perfusión tisular cerebral ineficaz',
      intervenciones: [
        { accion: 'Mantener alineación neutra del cuello.', razon: 'Facilita el drenaje venoso cerebral y previene aumento de PIC.' },
        { accion: 'Evitar aspiración endotraqueal innecesaria.', razon: 'La aspiración aumenta bruscamente la PIC.' },
        { accion: 'Control estricto de temperatura.', razon: 'La fiebre aumenta el metabolismo cerebral y el daño secundario.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_32_meningitisbacterianaviral',
    nombre: 'Meningitis Aguda',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'ShieldAlert',
    definicionCaso: 'La Meningitis Aguda es una inflamación purulenta de las meninges (leptomeninges) desencadenada por una infección (bacteriana, viral o fúngica) dentro del espacio subaracnoideo. Fisiopatológicamente, los patógenos superan la barrera hematoencefálica y se multiplican rápidamente en el LCR. La escasa respuesta inmune local permite una proliferación bacteriana masiva, desencadenando una respuesta inflamatoria sistémica severa. Los fragmentos bacterianos (endotoxinas) provocan la liberación de citoquinas proinflamatorias, aumentando la permeabilidad vascular (edema vasogénico), elevando la presión intracraneal y provocando una obstrucción del flujo del LCR (hidrocefalia), lo que finalmente conduce a herniación cerebral y daño neuronal irreversible.',
    etiologia: 'Generalmente causada por S. pneumoniae, N. meningitidis, H. influenzae, Listeria monocytogenes o virus (enterovirus, VHS). La diseminación puede ser hematógena desde focos distantes, por contigüidad (sinusitis, otitis) o directa (trauma, neurocirugía).',
    fisiopatologiaBasica: 'La invasión del LCR desata una tormenta de citoquinas en el espacio subaracnoideo. El exudado purulento causa edema cerebral vasogénico, citotóxico e intersticial, elevando la presión intracraneal y dañando las estructuras neurales por hipoxia y toxicidad directa.',
    complicaciones: [
      'Discapacidad neurológica permanente (secuelas motoras/cognitivas)',
      'Hidrocefalia obstructiva aguda',
      'Hipoacusia sensorineural',
      'Crisis convulsivas epilépticas',
      'Síndrome de Waterhouse-Friderichsen (colapso suprarrenal)'
    ],
    riesgosNoTratado: [
      'Muerte por herniación cerebral',
      'Estado vegetativo persistente',
      'Daño cerebral hipóxico letal',
      'Sepsis fulminante y fallo multiorgánico'
    ],
    sintomasClave: ['Fiebre', 'Rigidez de nuca', 'Cefalea', 'Fotofobia'],
    banderasRojas: [
      'Púrpura fulminans (Meningococo).',
      'Signos de alarma de HIC (Papiledema).',
      'Crisis convulsivas persistentes.',
      'Hipotensión severa/Shock.'
    ],
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Meningitis es la inflamación purulenta de las meninges, las membranas que envuelven el cerebro y la médula. El evento disparador es la invasión de microorganismos (bacterias como *S. pneumoniae* o *N. meningitidis*, o virus) al líquido cefalorraquídeo (LCR), superando las defensas inmunológicas del sistema nervioso central, que está naturalmente "aislado" y poco armado contra infecciones.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Invasión y Multiplicación:** Las bacterias cruzan la barrera protectora del cerebro (Barrera Hematoencefálica). Al no haber suficientes glóbulos blancos circulando en el LCR normalmente, las bacterias se multiplican a velocidades astronómicas.
- **La Respuesta Sísmica:** Cuando los fragmentos de las bacterias finalmente son detectados, se desata una tormenta de inflamación brutal. El LCR se llena de pus (glóbulos blancos muertos, bacterias y proteínas).
- **Edema y Sofocación:** Toda esta inflamación vuelve porosos los vasos del cerebro (edema vasogénico). Además, la espesa sopa de pus tapa los "desagües" del cerebro, impidiendo que el líquido salga (Hidrocefalia). La presión en la bóveda craneal se dispara, aplastando literalmente el cerebro.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico:** La presión y la inflamación de las venas causan irritación extrema, lo que se traduce en un cuello tieso como madera (Rigidez de Nuca). La fiebre altísima junto a este proceso llevan al paciente al delirio y convulsiones.
- **Sistema Inmunitario (Sepsis):** El meningococo puede desatar una reacción en toda la sangre a la vez, causando coagulación descontrolada, tapando arterias que lleva a que se mueran los dedos y las glándulas suprarrenales (Síndrome de Waterhouse-Friderichsen).
- **Órganos de los Sentidos:** El denso líquido purulento baña y puede destruir los nervios que salen del cráneo, siendo típico dejar sordo al paciente (Daño del nervio auditivo).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Pleocitosis y Consumo de Glucosa:** Un LCR normal parece agua de roca. En meningitis bacteriana parece leche cortada (lleno de polimorfonucleares), con el azúcar (glucosa) casi en cero porque las billones de bacterias se la han comido.
- **Óxido Nítrico:** Sustancia liberada en masa que daña el tejido cerebral adyacente y altera el flujo de los vasos.

### Correlación con Comorbilidades:
- **Inmunosupresión o Asplenia (Falta de Bazo):** Pacientes sin bazo funcional fallan catastróficamente en defenderse contra bacterias "capsuladas" como el neumococo, siendo presas fáciles de meningitis fulminante.
- **Trauma Craneoencefálico / Fístula LCR:** Fracturas en la base de la nariz o el oído que "puentean" el acceso directo de los gérmenes de la calle al cerebro al romper la meninge mecánicamente.`,
      esquemaMental: {
        inicio: "Invasión microbiana hematógena del espacio subaracnoideo.",
        dano: "Respuesta inflamatoria masiva, producción de exudado purulento y vasculitis local.",
        consecuencia: "Edema cerebral difuso, hidrocefalia obstructiva y aumento de presión intracraneana."
      },
      cita: "IDSA Clinical Practice Guidelines for Bacterial Meningitis"
    },
    manejo: {
      diagnostico: "Punción Lumbar (PL) para citoquímico de LCR, Gram y Cultivo. (Predominio PMN en bacterias, Monocitos en virus). Glucosa LCR < 40% de glucemia (Bacteriana).",
      tratamiento: "Antibioticoterapia empírica inmediata (Ceftriaxona + Vancomicina). Dexametasona previa o con primera dosis de ATB (En S. pneumoniae).",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Ceftriaxona", dosis: "2 g", frecuencia: "Cada 12h", observaciones: "Bactericida de amplio espectro, buena penetración SNC." },
          { nombre: "Vancomicina", dosis: "15-20 mg/kg", frecuencia: "Cada 8-12h", observaciones: "Cubrimiento para S. pneumoniae resistente." },
          { nombre: "Dexametasona", dosis: "10 mg", frecuencia: "Cada 6h por 4 días", observaciones: "Reduce edema y secuelas auditivas/neurológicas." }
        ],
        medidasGenerales: [
          "Aislamiento por gotas (primeras 24h de ATB).",
          "Control de temperatura y analgesia.",
          "Hidratación con precaución (evitar SIADH)."
        ]
      },
      monitoreo: {
        parametros: [
          "Frecuencia respiratoria y saturación (Riesgo de paro).",
          "Escala de Glasgow.",
          "Diuresis (Controlar secreción inadecuada de ADH)."
        ],
        signosAlerta: [
          "Disminución rápida de Glasgow.",
          "Focalización neurológica súbita.",
          "Cambio en patrón respiratorio."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Cese de la fiebre en 48-72h.",
          "LCR claro en control (si se realiza).",
          "Recuperación del estado de alerta."
        ],
        criteriosFracaso: [
          "Secuelas permanentes (sordera, déficit motor).",
          "Fallecimiento por shock o HIC."
        ]
      },
      cita: "UpToDate: Bacterial Meningitis in Adults"
    },
    enfermeria: {
      nanda: '00004 Riesgo de infección / 00132 Dolor agudo',
      intervenciones: [
        { accion: 'Mantener ambiente tranquilo y luz tenue.', razon: 'Aliviar la fotofobia y evitar estímulos que aumenten la iritabilidad meníngea.' },
        { accion: 'Vigilar la sitio de punción lumbar.', razon: 'Detectar fugas de LCR o formación de hematomas.' },
        { accion: 'Administrar antibióticos sin demora (< 1 hora de ingreso).', razon: 'El retraso en el inicio de ATB aumenta drásticamente la mortalidad.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_33_estatusepilptico',
    nombre: 'Status Epiléptico',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Zap',
    definicionCaso: 'Crisis convulsiva duradera (>5 min) o crisis recurrentes sin recuperación entre ellas.',
    sintomasClave: ['Convulsión tónico-clónica persistente', 'Falta de respuesta', 'Cianosis', 'Trauma asociado'],
    clinica: {
      signosSintomas: [
        "Actividad motora tónico-clónica generalizada sin interrupción.",
        "Mirada fija o movimientos oculares anómalos.",
        "Incontinencia de esfínteres.",
        "Sialorrea y mordedura de lengua.",
        "Estado post-ictal prolongado (en el intervalo entre crisis)."
      ],
      maniobraExploracion: "1. Cronometrar la crisis (Vital). 2. Buscar trauma craneal asociado. 3. Monitorización de SatO2 y Glucemia capilar.",
      banderasRojas: [
        "Duración > 30 minutos (Status refractario, daño cerebral irreversible).",
        "Hipotensión extrema.",
        "Hipoxia severa refractaria.",
        "Trauma cervical sospechado por caída."
      ],
      cita: "AES (American Epilepsy Society) Status Epilepticus Algorithm"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Estatus Epiléptico es una emergencia neurológica equivalente a un "incendio eléctrico" en el cerebro que no se apaga. Se define como una convulsión continua de más de 5 minutos o varias seguidas sin recuperar la consciencia. El evento disparador es el fracaso agudo de los frenos inhibitorios del cerebro frente a una avalancha de excitaciones eléctricas.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Primeros minutos (La Tormenta de Membrana):** Millones de neuronas disparan a la vez debido a una inundación del transmisor excitatorio (Glutamato) y el fracaso/agotamiento de los receptores inhibitorios (GABA). Los músculos se contraen violentamente exigiendo oxígeno.
- **Fase de Consumo Acelerado:** El cerebro y los músculos consumen el oxígeno y la glucosa a una velocidad 3-4 veces mayor a la normal. Mientras el paciente sigue respirando, el sistema sobrevive, pero pronto falla y sobreviene hipoxia severa.
- **Fase Terminal (Daño Neuronal Permanente):** Pasados 30 a 60 minutos, la entrada brutal e incesante de Calcio dentro la neurona durante sus descargas continuas activa enzimas "tijeras" (proteasas intracelulares) que literalmente destruyen el citoesqueleto neuronal y la célula se suicida (Apoptosis por Excitotoxicidad).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Las convulsiones traban el diafragma y acumulan secreciones; se produce hipoventilación profunda con sofocación (hipoxia) y narcosis (hipercapnia).
- **Sistema Muscular y Renal:** Los músculos tensos sin descanso se desgarran y necrosan (Rabdomiolisis). La mioglobina muscular liberada va por la sangre y atasca físicamente los filtros del riñón, causando Fallo Renal Agudo.
- **Sistema Cardiovascular:** Inmediatamente hay una hiperactividad por adrenalina (hipertensión brutal y taquicardia), que se agota si la crisis sigue, cayendo la presión estrepitosamente en shock.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Acidosis Láctica Extrema:** Los músculos asfixiados bombean ácido láctico masivamente a la sangre, derrumbando el pH sistémico.
- **Prolactina y Creatina Quinasa (CK):** Se disparan horas después en los laboratorios como un registro químico del terrible desgaste físico y neurológico al que fue sometido el sistema.

### Correlación con Comorbilidades:
- **Abandono de Antiepilépticos:** En los pacientes epilépticos, retirar una pastilla quita el "freno", liberando la hiperactividad cerebral de rebote que desencadena el Estatus Incoercible.
- **Infecciones y Tumores:** Cualquier proceso febril intenso u ocupación de espacio (tumor) irrita mecánicamente y químicamente a una corteza inestable actuando como el gatillo inicial.`,
      esquemaMental: {
        inicio: "Fallo de los mecanismos inhibitorios (GABA) y explosión excitatoria (Glutamato).",
        dano: "Agotamiento metabólico, hipoxia y entrada citotóxica de calcio neuronal.",
        consecuencia: "Muerte neuronal por excitotoxicidad, daño cerebral irreversible y colapso sistémico."
      },
      cita: "Neurocritical Care Society Guidelines for the Evaluation and Management of Status Epilepticus"
    },
    manejo: {
      diagnostico: "Glucemia (imprescindible). Electrólitos (Na, Ca, Mg). niveles de fármacos antiepilépticos. EEG (cuando la crisis motora para pero no recupera conciencia).",
      tratamiento: "Protocolo 5-20-40 (Benzodiacepinas - FAEs - Anestésicos).",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Lorazepam / Diazepam / Midazolam", dosis: "Lorazepam 4mg IV", frecuencia: "Bolo único, repetir una vez si persiste", observaciones: "Primera línea (Fase de estabilización inicial)." },
          { nombre: "Fenitoína / Levetiracetam / Valproato", dosis: "Fenitoína 20 mg/kg", frecuencia: "Impregnación", observaciones: "Segunda línea (Fase de tratamiento inicial)." },
          { nombre: "Propofol / Midazolam (Infusión)", dosis: "Titulable", frecuencia: "Continua", observaciones: "Tercera línea (Status refractario). Requiere IOT." }
        ],
        medidasGenerales: [
          "Protección de vía aérea.",
          "Oxigenoterapia.",
          "Acceso venoso grueso (x2)."
        ]
      },
      monitoreo: {
        parametros: [
          "Monitorización EEG continua (Ideal).",
          "Saturación de oxígeno.",
          "Frecuencia cardiaca y TA (FAEs causan hipotensión)."
        ],
        signosAlerta: [
          "Depresión respiratoria severa tras Benzodiacepinas.",
          "Arritmias cardiacas (por infusión de Fenitoína)."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Cese de la actividad motora y electrográfica.",
          "Recuperación lenta del estado basal.",
          "Niveles terapéuticos de FAEs alcanzados."
        ],
        criteriosFracaso: [
          "Status refractario o super-refractario.",
          "Edema cerebral post-ictal severo."
        ]
      },
      cita: "AES Status Epilepticus Guidelines"
    },
    enfermeria: {
      nanda: '00035 Riesgo de lesión / 00031 Limpieza ineficaz de vías aéreas',
      intervenciones: [
        { accion: 'No introducir objetos en la boca.', razon: 'Riesgo de daño dental, trauma orofaríngeo y obstrucción de vía aérea.' },
        { accion: 'Posición de seguridad (decúbito lateral) al finalizar la clonía.', razon: 'Prevenir broncoaspiración de secreciones y lengua hacia atrás.' },
        { accion: 'Proteger cabeza y extremidades con almohadillado.', razon: 'Evitar traumatismos secundarios durante la fase clónica.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_34_parkinson',
    nombre: 'Enfermedad de Parkinson',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Walk',
    definicionCaso: 'Trastorno neurodegenerativo crónico caracterizado por la pérdida de neuronas dopaminérgicas.',
    sintomasClave: ['Temblor en reposo', 'Rigidez', 'Bradicinesia', 'Inestabilidad postural'],
    clinica: {
      signosSintomas: [
        "Temblor de reposo (en 'cuenta monedas') que desaparece con el movimiento voluntario.",
        "Rigidez muscular (signo de la 'rueda dentada').",
        "Bradicinesia (lentitud extrema de movimientos y amimia facial).",
        "Inestabilidad postural (pasos cortos, festinantes y riesgo de caídas).",
        "Micrografía e hipofonía."
      ],
      maniobraExploracion: "1. Prueba de la rueda dentada. 2. Evaluación de la marcha festinante. 3. Prueba de propulsión/retropulsión para estabilidad.",
      banderasRojas: [
        "Caídas frecuentes en etapas tempranas (sugiere Parálisis Supranuclear Progresiva).",
        "Disfunción autonómica severa precoz (sugiere Atrofia Multisistémica).",
        "Alucinaciones visuales sin medicación previa.",
        "Disfagia severa."
      ],
      cita: "MDS (Movement Disorder Society) Clinical Diagnostic Criteria"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Enfermedad de Parkinson es un trastorno neurodegenerativo silencioso del cerebro medio. El evento disparador es una mutación, toxina o en su mayoría un factor idiopático, que genera que una proteína específica (alfa-sinucleína) se pliegue mal. Este plegamiento genera "basura tóxica" inservible llamada Cuerpos de Lewy que se acumulan e intoxican a las neuronas.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Muerte Silenciosa:** Los Cuerpos de Lewy se asientan específicamente en la *Sustancia Negra (pars compacta)*, el cuartel general que fabrica la Dopamina, el neurotransmisor crucial para encender el movimiento fluido del cuerpo. 
- **La Pérdida del Umbral:** El cerebro soporta increíblemente bien la pérdida inicial; la enfermedad solo muestra la cara clínica cuando casi el 80% de estas neuronas fábricas de Dopamina ya están irremediablemente muertas.
- **El Circuito Trancado:** Los ganglios basales funcionan en base a un delicado balancín: la Dopamina "suelta" el freno del movimiento, y la Acetilcolina lo "aprieta". Sin dopamina, el freno se pega, resultando en rigidez de madera crónica y lentitud espantosa (bradicinesia).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Musculoesquelético:** Causa temblor constante "en cuenta de monedas" cuando el paciente descansa. Los músculos en tensión simultánea originan la clásica rigidez "en rueda dentada" a la exploración. La postura se encorva inexorablemente y se camina arrastrando los pies y congelándose en el sitio por milisegundos (Freezing).
- **Sistema Digestivo y Disfagia:** Los músculos sutiles de la faringe y el esófago se enlentecen, causando atragantamientos severos, salivación crónica e incapacidad para relajar el tránsito (Estreñimiento pertinaz temprano).
- **Sistema Nervioso Autónomo:** Pérdida del control vasomotor automático (hipotensión severa al levantarse), disfunciones urinarias y disfunción eréctil generalizada.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **La Balanza Rota (Dopa/ACh):** Hay un exceso relativo de Acetilcolina frente al desierto de Dopamina en el estriado que dicta el hipertono muscular característico.
- **Receptores Hiposensibilizados:** Después de varios años de enfermedad y de darle la pastilla L-Dopa para suplir esto, los receptores del cerebro empiezan a dañarse oscilando violentamente entre movimientos excesivos parecidos a un baile perturbador (Discinesias L-Dopa dependientes) o a estancamiento total ("fase Off").

### Correlación con Comorbilidades:
- **Depresión y Ansiedad Biológica:** La degradación neurológica ataca de lleno vías serotoninérgicas y dopaminérgicas corticales. La depresión en Parkinson no es sólo una tristeza reactiva, sino puramente anatómica y biológica.
- **Demencia con Cuerpos de Lewy:** Típicamente los pacientes progresarán en estadios finales a la pérdida de funciones cognitivas y delucinaciones floridas si estos cuerpos viajan de los ganglios a toda la corteza prefrontal.`,
      esquemaMental: {
        inicio: "Acumulación tóxica de alfa-sinucleína (Cuerpos de Lewy) en la Sustancia Negra.",
        dano: "Pérdida >80% de las neuronas que sintetizan dopamina en la vía nigroestriada.",
        consecuencia: "Bloqueo de las vías motoras facilitadoras e hiperactividad de las áreas inhibitorias."
      },
      cita: "The Lancet Neurology, Parkinson's disease"
    },
    manejo: {
      diagnostico: "Principalmente clínico. Prueba diagnóstica con Levodopa (mejoría significativa confirma diagnóstico). SPECT con DaTSCAN en casos dudosos.",
      tratamiento: "L-Dopa/Carbidopa (Tratamiento de elección). Agonistas dopaminérgicos (Pramipexol). Inhibidores MAO-B (Selegilina). Cirugía (Estimulación Cerebral Profunda) en refractarios.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Levodopa/Carbidopa", dosis: "100/25 mg", frecuencia: "Inicialmente 3 veces al día", observaciones: "Tomar fuera de las comidas proteicas." },
          { nombre: "Pramipexol", dosis: "0.125 mg", frecuencia: "Cada 8h", observaciones: "Agonista dopaminérgico. Vigilar ataques de sueño." }
        ],
        medidasGenerales: [
          "Fisioterapia enfocada en equilibrio y marcha.",
          "Dieta rica en fibra (manejo de estreñimiento).",
          "Terapia ocupacional para adaptaciones en el hogar."
        ]
      },
      monitoreo: {
        parametros: [
          "Frecuencia de episodios 'On-Off'.",
          "Presencia de disquinesias.",
          "Estado cognitivo y anímico (Depresión asociada)."
        ],
        signosAlerta: [
          "Psicosis inducida por fármacos.",
          "Hipotensión ortostática severa.",
          "Bloqueo (freezing) de la marcha."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Mejoría del 30% en escalas motoras (UPDRS).",
          "Mantenimiento de la autonomía funcional.",
          "Control de síntomas no motores (sueño, ánimo)."
        ],
        criteriosFracaso: [
          "Deterioro funcional rápido.",
          "Disquinesias incapacitantes."
        ]
      },
      cita: "MDS Parkinson Guidelines 2023"
    },
    enfermeria: {
      nanda: '00110 Deterioro de la movilidad física / 00155 Riesgo de caídas',
      intervenciones: [
        { accion: 'Proporcionar pistas auditivas o visuales para caminar.', razon: 'Ayuda a superar los episodios de congelación de la marcha.' },
        { accion: 'Programar administración de fármacos estrictamente según horario.', razon: 'Minimizar los periodos "Off" donde el paciente queda inmóvil.' },
        { accion: 'Supervisar la deglución y textura de alimentos.', razon: 'Prevenir aspiración por disfagia progresiva.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_35_alzheimer',
    nombre: 'Enfermedad de Alzheimer',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'BrainCircuit',
    definicionCaso: 'Enfermedad neurodegenerativa progresiva que es la causa principal de demencia a nivel mundial.',
    sintomasClave: ['Pérdida de memoria episódica', 'Desorientación', 'Afasia/Apraxia', 'Cambios de conducta'],
    clinica: {
      signosSintomas: [
        "Pérdida progresiva de la memoria a corto plazo (anterógrada).",
        "Anomia (dificultad para encontrar palabras).",
        "Desorientación témporo-espacial.",
        "Dificultad para realizar tareas complejas (funciones ejecutivas).",
        "Cambios en la personalidad (irritabilidad, apatía) en etapas avanzadas."
      ],
      maniobraExploracion: "1. Mini-Mental State Examination (MMSE). 2. Test del Dibujo del Reloj. 3. Evaluación de actividades de la vida diaria (Índice de Katz).",
      banderasRojas: [
        "Deterioro cognitivo abrupto (sugiere causa vascular o infecciosa).",
        "Incontinencia urinaria y alteración de marcha temprana (sugiere hidrocefalia normotensiva).",
        "Crisis convulsivas de inicio nuevo.",
        "Depresión severa con ideación suicida."
      ],
      cita: "National Institute on Aging - Alzheimer's Association (NIA-AA) Criteria"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Enfermedad de Alzheimer es la demencia degenerativa primaria más letal en los adultos mayores. El evento disparador microscópico se produce cuando un mecanismo de reciclaje normal del cerebro falla, originando dos depósitos anómalos imparables: "Basura" extracelular (Placas de beta-amiloide) y proteínas estructuradoras del citoesqueleto que se vuelven tóxicas (Ovillos neurofibrilares de Tau).

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Placas Extracelulares:** Los fragmentos mal cortados del amiloide se aglutinan fuera de la célula, estorbando físicamente la sinapsis entre dendritas y atrayendo inflamación inmunitaria crónica guiada por la microglía cerebral.
- **Ovillos Intracelulares:** Las proteínas Tau, que normalmente mantienen "abiertos" los tubos de transporte dentro de los axones, colapsan. Las neuronas mueren por inanición intracelular.
- **Muerte Topográfica:** El proceso arranca devastando primero el hipocampo (centro donde se forman los recuerdos nuevos), expandiéndose luego implacablemente a toda la corteza en un patrón de incendio forestal silencioso.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico Central:** La destrucción de áreas temporales provoca amnesia anterógrada total. A medida que quema los lóbulos parietales y prefrontales, el paciente pierde el lenguaje (Afasia), la habilidad de vestirse o peinarse (Apraxia) y la identidad (Agnosia). 
- **Sistema Musculoesquelético:** Al final de la enfermedad, la atrofia del lóbulo frontal causa la pérdida de la postura erguida; los pacientes adoptan una posición fetal ("encamamiento neurológico") y pierden el reflejo de deglución.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Colapso Colinérgico:** El núcleo basal de Meynert, la principal fábrica de Acetilcolina (el neurotransmisor de la atención y la memoria), queda completamente destruido.
- **Inflamación Neurorreaciva:** Marcadores crónicos como Il-1 y TNF-alfa mantienen un estado de toxicidad baja que oxida los lípidos del cerebro acelerando la senectud.

### Correlación con Comorbilidades:
- **Síndrome de Down (Trisomía 21):** El gen de la proteína amiloide está en el cromosoma 21, por lo que estas personas tienen tres copias de este gen, produciendo una sobreproducción masiva y desarrollando Alzheimer a edades tan precoces como los 40 años.
- **Riesgo Cardiovascular Genético:** El alelo ApoE4 es un transportador de colesterol que falla gravemente al limpiar la placa amiloide vascular.`,
      esquemaMental: {
        inicio: "Fallo en el clivaje de la Proteína Precursora Amiloidea y mutación Tau.",
        dano: "Toxicidad de placas sinápticas y estrangulamiento axonal intracelular.",
        consecuencia: "Atrofia cortical profunda, pérdida de corteza hipocampal y muerte cerebral funcional."
      },
      cita: "Nature Reviews Neuroscience, Alzheimer's disease"
    },
    manejo: {
      diagnostico: "Clínico y neuropsicológico. RM cerebral (atrofia hipocampal). Descartar causas reversibles (B12, TSH, Sífilis). Biomarcadores en LCR (Amiloide/Tau) en casos seleccionados.",
      tratamiento: "Inhibidores de la Acetilcolinesterasa (Donepezilo). Antagonistas rNMDA (Memantina). Manejo de síntomas conductuales.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Donepezilo", dosis: "5-10 mg", frecuencia: "Nocturna", observaciones: "Vigilar bradicardia y efectos gastrointestinales." },
          { nombre: "Memantina", dosis: "10-20 mg", frecuencia: "Diaria", observaciones: "Para fases moderadas-graves." },
          { nombre: "Quetiapina", dosis: "Dosis bajas", frecuencia: "Si precisa", observaciones: "Solo para agitación refractaria severa." }
        ],
        medidasGenerales: [
          "Estimulación cognitiva leve.",
          "Simplificación del entorno del paciente.",
          "Apoyo y educación al cuidador primario."
        ]
      },
      monitoreo: {
        parametros: [
          "Puntuación MMSE semestral.",
          "Estado nutricional (olvidan comer).",
          "Integridad cutánea (en encamados)."
        ],
        signosAlerta: [
          "Agitación psicomotriz aguda (delirium sobreañadido).",
          "Pérdida de peso significativa.",
          "Caídas recurrentes."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Mantenimiento de la estabilidad cognitiva por periodos de 6-12 meses.",
          "Buen control de síntomas neuropsiquiátricos.",
          "Baja sobrecarga del cuidador."
        ],
        criteriosFracaso: [
          "Institucionalización temprana por inmanejabilidad conductual.",
          "Complicaciones por inmovilidad (neumonías, escaras)."
        ]
      },
      cita: "Alzheimer's Association Practice Guidelines"
    },
    enfermeria: {
      nanda: '00051 Deterioro de la memoria / 00128 Confusión crónica',
      intervenciones: [
        { accion: 'Etiquetar objetos y usar calendarios grandes.', razon: 'Facilitar la orientación y autonomía en el hogar.' },
        { accion: 'Mantener una rutina diaria constante.', razon: 'Reduce la ansiedad y el riesgo de agitación nocturna.' },
        { accion: 'Fomentar la ingesta hídrica y vaciado vesical programado.', razon: 'Prevenir ITUs que causan descompensación cognitiva aguda.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_36_esclerosismltiple',
    nombre: 'Esclerosis Múltiple',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Activity',
    definicionCaso: 'Enfermedad autoinmune, crónica e inflamatoria del SNC que causa desmielinizacion y daño axonal.',
    sintomasClave: ['Neuritis óptica', 'Debilidad focal', 'Parestesias', 'Diplopía'],
    clinica: {
      signosSintomas: [
        "Neuritis óptica (pérdida de visión monocular, dolor con movimientos oculares).",
        "Signo de Lhermitte (sensación de descarga eléctrica al flexionar el cuello).",
        "Debilidad motora focal o fatiga extrema.",
        "Diplopía (por oftalmoplejía internuclear).",
        "Disfunción rítmica (ataxia, temblor intencional)."
      ],
      maniobraExploracion: "1. Fondo de ojo. 2. Evaluación de pares craneales (MOE). 3. Prueba de Romberg y marcha.",
      banderasRojas: [
        "Progresión rápida de la debilidad motora.",
        "Disfunción del esfínter urinario/anal aguda.",
        "Dificultad respiratoria.",
        "Infección aguda (puede desencadenar brote)."
      ],
      cita: "McDonald Criteria 2017"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Esclerosis Múltiple (EM) es una catástrofe inflamatoria autoinmune exclusiva del Sistema Nervioso Central (SNC). El evento disparador es un colapso en la tolerancia inmunológica donde linfocitos T (usualmente tras una infección viral en la juventud, combinada con baja vitamina D) cruzan la barrera hematoencefálica y clasifican erróneamente a la Mielina (el aislante del cable neuronal) como enemigo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Infiltración Inflamatoria:** Linfocitos T reactivos liberan citoquinas (IFN-Gamma, TNF) reclutando furiosos macrófagos que devoran sin piedad la vaina de mielina de los axones.
- **Fallo de Conducción:** Sin su aislante de mielina, el impulso eléctrico literalmente se frena, se dispersa o no llega (causando parálisis, ceguera transitoria o parestesias).
- **Esclerosis (La Cicatriz):** En un intento inútil por reparar, los astrocitos forman unas "placas" duras cicatriciales (astrogliosis) reemplazando la lesión aguda. Estas placas quedan diseminadas "en múltiples" sitios del tiempo y el espacio encefálico.

### Afectación de Órganos y Sistemas Relacionados:
- **Órganos Sensoriales (Visión):** Es la presentación típica (Neuritis Óptica). La mielina del nervio óptico es atacada violentamente, inflamándolo y causando dolor atroz al mover el ojo y una mancha negra (escotoma) central.
- **Sistema Musculoesquelético:** La afectación de la vía piramidal en la médula genera espasticidad feroz, calambres tónicos incapacitantes y parálisis de extremidades inferiores episódica.
- **Tractos Genitourinarios:** La pérdida de las vías autonómicas motoras altas dejan a la vejiga "hiperactiva", vaciándose sin control, o atónica, requiriendo un sondaje permanente a temprana edad.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Bandas Oligoclonales de IgG:** En el LCR del paciente, la hiperproducción y atrapamiento de células plasmáticas aberrantes genera un exceso de Inmunoglobulina G que puede medirse químicamente y es el sello diagnóstico de la inflamación perpetua.
- **Disfunción en Canales Ionicos:** Al desnudarse, el axón expresa muchísimos canales de Sodio indiscriminados que lo vuelven un cable eléctrico "caliente" e inestable, lo que explica síntomas eléctricos agudos en los movimientos de flexión.

### Correlación con Comorbilidades:
- **Infecciones del Tracto Urinario:** La retención crónica de orina por fallo neuromuscular pélvico los hace víctimas fáciles de septicemia urinaria fatal rápida.
- **Depresión Refractaria Cortical:** Diferente a reaccionar triste ante el diagnóstico, el ataque inflamatorio desmielinizante sobre los circuitos límbicos crea una severa apatía y suicidio aumentado por causa puramente orgánica.`,
      esquemaMental: {
        inicio: "Pérdida de tolerancia periférica celular que penetra la barrera cerebral.",
        dano: "Ataque microglial y macrogágico contra los oligodendrocitos y la vaina de mielina.",
        consecuencia: "Dispersión eléctrica saltatoria y gliosis (placas de tejido inerte esclerótico)."
      },
      cita: "Nature Reviews Neurology: Multiple Sclerosis"
    },
    manejo: {
      diagnostico: "Resonancia Magnética (RM) con contraste (presencia de lesiones en espacio y tiempo). Punción Lumbar (bandas oligoclonales de IgG). Potenciales evocados.",
      tratamiento: "Brote agudo: Metilprednisolona IV 1g/día (3-5 días). Modificadores de la enfermedad: Interferón-beta, Glatiramero, Natalizumab, Ocrelizumab.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Metilprednisolona", dosis: "1 g", frecuencia: "Diaria (IV)", observaciones: "Solo en brotes agudos incapacitantes." },
          { nombre: "Interferón Beta-1a", dosis: "30 mcg", frecuencia: "Semanal (IM)", observaciones: "Terapia modificadora de primera línea." },
          { nombre: "Baclofeno", dosis: "10-20 mg", frecuencia: "TID", observaciones: "Manejo de la espasticidad." }
        ],
        medidasGenerales: [
          "Evitar la exposición al calor (Fenómeno de Uhthoff).",
          "Rehabilitación física y ocupacional intensiva.",
          "Apoyo psicológico (prevención de depresión)."
        ]
      },
      monitoreo: {
        parametros: [
          "Carga de enfermedad en RM anual.",
          "Escala EDSS (Expanded Disability Status Scale).",
          "Función visual y urinaria."
        ],
        signosAlerta: [
          "Aparición de nuevo déficit neurológico persistente > 24h (Brote).",
          "Signos de infección urinaria o neumonía.",
          "Cambios cognitivos significativos."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Ausencia de nuevos brotes clínicos.",
          "Sin nuevas lesiones en RM (NEDA - No Evidence of Disease Activity).",
          "Estabilidad en la escala EDSS."
        ],
        criteriosFracaso: [
          "Progresión rápida de la discapacidad.",
          "Aparición de múltiples lesiones nuevas en contraste."
        ]
      },
      cita: "Multiple Sclerosis International Federation Guidelines"
    },
    enfermeria: {
      nanda: '00110 Deterioro de la movilidad física / 00196 Motilidad gastrointestinal disfuncional',
      intervenciones: [
        { accion: 'Monitorizar la retención urinaria (Bladder-scan).', razon: 'La vejiga neurógena es común y aumenta riesgo de infecciones graves.' },
        { accion: 'Educar sobre el ahorro de energía y pausas durante el ejercicio.', razon: 'La fatiga es el síntoma más incapacitante en muchos pacientes.' },
        { accion: 'Inspeccionar la integridad cutánea en zonas de menor sensibilidad.', razon: 'Prevenir úlceras por decúbito en pacientes con movilidad reducida.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_37_guillainbarre',
    nombre: 'Síndrome de Guillain-Barré',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Activity',
    definicionCaso: 'Polirradiculoneuropatía desmielinizante inflamatoria aguda de carácter ascendente.',
    sintomasClave: ['Debilidad ascendente', 'Arreflexia', 'Parestesias', 'Disfunción autonómica'],
    clinica: {
      signosSintomas: [
        "Debilidad muscular simétrica que comienza en pies y asciende (parálisis ascendente).",
        "Arreflexia o hiporreflexia osteotendinosa severa.",
        "Parestesias en 'guante y calcetín'.",
        "Dolor muscular profundo (frecuente en espalda y piernas).",
        "Disfunción autonómica (taquicardia, fluctuaciones de TA)."
      ],
      maniobraExploracion: "1. Prueba de fuerza segmentaria. 2. Búsqueda de reflejos osteotendinosos (Aquiles, rotuliano). 3. Monitoreo de Capacidad Vital (test de cuenta hasta 20).",
      banderasRojas: [
        "Capacidad Vital Forzada < 15 ml/kg (Indica falla respiratoria inminente).",
        "Disfagia o parálisis bulbar.",
        "Arritmias cardiacas severas.",
        "Dificultad para toser o manejar secreciones."
      ],
      cita: "Brighton Criteria for Guillain-Barré Syndrome"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Síndrome de Guillain-Barré es una parálisis aguda fulminante del Sistema Nervioso Periférico. El evento disparador es un clásico error de identidad (mimetismo molecular). Dos a cuatro semanas después de una simple infección respiratoria o diarrea, el sistema autoinmune nota que algunas de sus mismas células nerviosas tienen "marcas" que se parecen sospechosamente a la bacteria original (*Campylobacter jejuni*).

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Infiltrados Mononucleares y Respuesta Humoral:** Macrófagos y autoanticuerpos asaltan masivamente las raíces nerviosas espinales en cuanto estas salen de la médula espinal e inician su trayecto.
- **Atragantamiento Eléctrico Periférico:** De forma aguda (a diferencia de la EM), el sistema inmunológico despelleja la mielina o daña directamente el hilo interno del axón (variante axonal) enviando las señales motoras a cero.
- **El Ascenso Simétrico:** De manera típicamente simétrica empieza por "quedar pesados" los pulgares de los pies, para subir día con día hasta paralizar rodillas, cadera, costillas y llegar al cuello.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Musculoesquelético:** Genera un fenotipo dramático de parálisis "Flácida" y arreflexia masiva (el paciente cae derretido en vez de estar tenso/espástico) debido al fallo total de la motoneurona inferior. 
- **Sistema Respiratorio:** Si los anticuerpos llegan a "comerse" la mielina de las raíces cervicales que forman el nervio Frénico (C3, C4, C5), el diafragma entra en parálisis. El paciente simplemente no tiene forma biológica de jalar aire.
- **Sistema Autónomo (Disautonomía):** La destrucción de fibras delgadas puede quitarle los frenos al corazón generando arritmias frenéticas y picos de presión arterial volátiles y letales sin previo aviso.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Disociación Albúmino-Citológica:** En el LCR de la espalda, las grandes raíces inflamadas exudan masiva cantidad de proteína (albúmina > 45 mg), pero no hay leucocitos cruzando el líquido "citológico", creando el desfase analítico de oro patognomónico.

### Correlación con Comorbilidades:
- **Infección por Campylobacter o Zika viral:** Inicia con un cuadro leve de malestar entérico días previos. Estos gérmenes poseen oligosacáridos idénticos en su cápsula bacteriana a los de la pared neuronal humana.`,
      esquemaMental: {
        inicio: "Mimetismo Molecular de autoanticuerpos frente a gangliósidos bacterianos previos.",
        dano: "Ataque fulminante a la mielina de raíces y nervios puramente periféricos.",
        consecuencia: "Bloqueo de motoneurona inferior con parálisis ascendente flácida e hiporreflexia."
      },
      cita: "The Lancet: Guillain-Barré syndrome"
    },
    manejo: {
      diagnostico: "Disociación albúmino-citológica en LCR (proteínas altas con células normales). Electromiografía/Velocidades de conducción (patrón desmielinizante).",
      tratamiento: "Inmunoglobulina IV (0.4 g/kg/día por 5 días) o Plasmaterapia (Recambios plasmáticos). Soporte ventilatorio si se requiere.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Inmunoglobulina Humana", dosis: "2 g/kg total", frecuencia: "Dividido en 5 días", observaciones: "Tratamiento de elección por facilidad de administración." },
          { nombre: "Heparina de Bajo Peso Molecular", dosis: "40 mg", frecuencia: "Diaria", observaciones: "Profilaxis obligatoria para TVP por inmovilidad." },
          { nombre: "Gabapentina", dosis: "300 mg", frecuencia: "Cada 8h", observaciones: "Manejo del dolor neuropático asociado." }
        ],
        medidasGenerales: [
          "Ingreso a UCI para vigilancia respiratoria y hemodinámica.",
          "Fisioterapia respiratoria preventiva.",
          "Nutrición enteral si hay disfagia."
        ]
      },
      monitoreo: {
        parametros: [
          "Capacidad Vital cada 4-6 horas.",
          "SatO2 y gases arteriales.",
          "Monitorización cardiaca continua (autonomía)."
        ],
        signosAlerta: [
          "Uso de musculatura accesoria para respirar.",
          "Hipotensión ortostática severa.",
          "Incapacidad para levantar la cabeza de la almohada."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Estabilización de la progresión motora.",
          "Recuperación gradual de la fuerza en sentido descendente.",
          "Ausencia de necesidad de ventilación mecánica."
        ],
        criteriosFracaso: [
          "Necesidad de traqueostomía por ventilación prolongada.",
          "Complicaciones nosocomiales graves (Sepsis)."
        ]
      },
      cita: "International GBS Outcomes Study (IGOS) Guidelines"
    },
    enfermeria: {
      nanda: '00032 Patrón respiratorio ineficaz / 00110 Deterioro de la movilidad física',
      intervenciones: [
        { accion: 'Realizar monitoreo funcional de la mecánica respiratoria.', razon: 'Detectar parálisis diafragmática antes de que ocurra hipoxia severa.' },
        { accion: 'Administrar cuidados de higiene bronquial (aspiración).', razon: 'Indispensable si el reflejo de tos está abolido.' },
        { accion: 'Coordinar con rehabilitación desde el primer día de estabilidad.', razon: 'Minimizar contracturas y atrofia muscular por desuso.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_38_miasteniagravis',
    nombre: 'Miastenia Gravis',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'UserCheck',
    definicionCaso: 'Trastorno autoinmune de la unión neuromuscular caracterizado por fatigabilidad de los músculos esqueléticos.',
    sintomasClave: ['Ptosis palpebral', 'Diplopía fluctuante', 'Fatigabilidad muscular', 'Voz nasal'],
    clinica: {
      signosSintomas: [
        "Ptosis palpebral (unilateral o bilateral) que empeora con el día.",
        "Diplopía que mejora tras el descanso.",
        "Dificultad para la deglución y masticación (miastenia bulbar).",
        "Debilidad de extremidades proximal, asimétrica y fatigable.",
        "Disnea en casos de crisis miasténica."
      ],
      maniobraExploracion: "1. Prueba de la mirada sostenida (ptosis inducida). 2. Prueba del hielo (mejoría de ptosis con frío). 3. Evaluación de la fuerza tras esfuerzo repetido.",
      banderasRojas: [
        "Crisis miasténica (insuficiencia respiratoria por debilidad diafragmática).",
        "Disfagia severa con riesgo de aspiración.",
        "Tos inefectiva.",
        "Uso de fármacos contraindicados (ej. Magnesio, Aminoglucósidos)."
      ],
      cita: "International Consensus Guidance for Management of Myasthenia Gravis"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Miastenia Gravis es una enfermedad autoinmune pura caracterizada por debilidad y fatiga de los músculos esqueléticos que "empeora de forma patológica con su uso repetido". El evento disparador es un timo anormal que fabrica auto-anticuerpos mortales (Anti-AChR) diseñados para anular la "cerradura" que enciende la función muscular (Receptor de Acetilcolina) de la placa mioneural.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Guerra del Fin de Placa:** En la unión entre el nervio y el músculo, los anticuerpos se unen a la proteína receptora "bloqueando" el espacio físicamente, pero lo peor es que activan un mechanism (Sistema de Complemento) que taladra agujeros destructivos destrozando los diminutos pliegues del músculo receptor.
- **La Disminución del Margen de Seguridad:** Cada disparo de nervio libera suficiente Acetilcolina que normalmente "sobrepasa" lo necesitado. Al ir perdiendo receptores post-sinápticos destruidos irreversiblemente, cada contracción siguiente gasta de la diminuta reserva, hasta que cae debajo del límite y el músculo, de la nada, no puede moverse en absoluto hasta descansar.

### Afectación de Órganos y Sistemas Relacionados:
- **Órganos Bulbares y Faciales:** Los primeros puentes caídos suelen ser los pequeños e hiperactivos nervios del ojo (causando caída del párpado o Ptosis Palpebral, o visión doble/Diplopía); luego asaltan la garganta perdiendo la habilidad biológica de masticar sin asfixiarse.
- **Sistema Respiratorio:** A medida que cae la tarde, todos los receptores se consumen. Los músculos intercostales dejan de ser capaces de recibir señales y el esfuerzo que cuesta levantar el tórax empuja al paciente irremediablemente a una parada respiratoria silenciosa conocida como Crisis Miasténica.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Niveles Séricos de Anti-AChR y Anti-MuSK:** Pruebas patológicas de oro que no representan qué tan grave está el paciente clínicamente en ese momento, pero garantizan de qué anticuerpo se trata y el riesgo en el post-parto frente a neonatos (Miastenia neonatal transitoria).

### Correlación con Comorbilidades:
- **Timoma e Hiperplasia Tímica:** El órgano "entrenador" de la inmunidad (El Timo), en vez de atrofiarse después de la pubertad, en estos paciente es el gestor secreto que sigue adoctrinando Linfocitos T agresivos; muchos pacientes se curan removiendo quirúrgicamente una masa tumoral tímica de su esternón.`,
      esquemaMental: {
        inicio: "Fabricación Tímica errónea de autoanticuerpos (Anti-AChR/MuSK).",
        dano: "Destrucción y bloqueo del receptor post-sináptico muscular (Complemento mediado).",
        consecuencia: "Fracaso neuromuscular dependiente de reserva; fatiga patológica progresiva con el esfuerzo."
      },
      cita: "Annals of the New York Academy of Sciences, Myasthenia Gravis"
    },
    manejo: {
      diagnostico: "Anticuerpos anti-AChR (Altamente específicos). Electromiografía de fibra única. Prueba de Edrofonio (Tensilon) o Neostigmina. TC de tórax (Descartar Timoma).",
      tratamiento: "Piridostigmina (Anticolinesterásico). Corticoides e inmunosupresores (Azatioprina). Timectomía en casos indicados. Recambio plasmático en crisis.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Piridostigmina", dosis: "60 mg", frecuencia: "Cada 4-6 horas", observaciones: "Ajustar según respuesta. Vigilar efectos colinérgicos (diarrea, sialorrea)." },
          { nombre: "Prednisona", dosis: "1 mg/kg", frecuencia: "Diaria", observaciones: "Disminuir gradualmente una vez alcanzada estabilidad." },
          { nombre: "Azatioprina", dosis: "2-3 mg/kg", frecuencia: "Diaria", observaciones: "Ahorrador de corticoides a largo plazo." }
        ],
        medidasGenerales: [
          "Evitar estrés físico y emocional extremo.",
          "Distribuir las actividades del día en periodos de mayor fuerza (mañana).",
          "Educación sobre fármacos prohibidos."
        ]
      },
      monitoreo: {
        parametros: [
          "Escala funcional de Miastenia (MGFA).",
          "Fuerza de prensión y capacidad de deglución.",
          "Monitoreo de función respiratoria (Capacidad vital)."
        ],
        signosAlerta: [
          "Aparición de estridor o disnea de esfuerzo leve.",
          "Imposibilidad para tragar líquidos.",
          "Debilidad súbita generalizada tras infección."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Remisión estable de los síntomas con medicación mínima.",
          "Capacidad masticatoria y deglutoria conservada.",
          "Sin episodios de crisis miasténica en un año."
        ],
        criteriosFracaso: [
          "Crisis Colinérgica (toxicidad por fármacos).",
          "Crisis Miasténica con necesidad de ventilación mecánica."
        ]
      },
      cita: "Myasthenia Gravis Foundation of America Guidelines"
    },
    enfermeria: {
      nanda: '00155 Riesgo de caídas / 00103 Deterioro de la deglución',
      intervenciones: [
        { accion: 'Programar comidas 30-45 min después de dosis de Piridostigmina.', razon: 'Asegurar que la fuerza de los músculos deglutorios sea máxima durante la alimentación.' },
        { accion: 'Mantener ambú y equipo de aspiración al pie de cama.', razon: 'Preparación inmediata ante una posible crisis miasténica respiratoria.' },
        { accion: 'Recomendar texturas semisólidas y posición fowler al comer.', razon: 'Minimizar el riesgo de aspiración silenciosa.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_40_encefalopatiahpatica',
    nombre: 'Encefalopatía Hepática',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'BrainCircuit',
    definicionCaso: 'Disfunción cerebral reversible causada por insuficiencia hepática crónica o aguda.',
    sintomasClave: ['Asterixis', 'Alteración del sueño', 'Confusión', 'Aliento hepático'],
    clinica: {
      signosSintomas: [
        "Alteración del ciclo sueño-vigilia (insomnio inicial).",
        "Asterixis (temblor en aleteo al extender las manos).",
        "Confusión, desorientación y alucinaciones (en grados avanzados).",
        "Fetor hepático (aliento dulzón/amargo).",
        "Deterioro del nivel de conciencia (estupor/coma)."
      ],
      maniobraExploracion: "1. Prueba de asterixis. 2. Escala de West-Haven (Grados I-IV). 3. Test de conexión numérica sanguínea.",
      banderasRojas: [
        "Grado III-IV de West-Haven (Riesgo de pérdida de vía aérea).",
        "Hemorragia digestiva coexistente (precipitante común).",
        "Signos de edema cerebral (en falla hepática aguda).",
        "Fiebre (sospecha de Peritonitis Bacteriana Espontánea)."
      ],
      cita: "EASL Clinical Practice Guidelines on Nutrition in Liver Disease"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Encefalopatía Hepática es un cortocircuito neurotóxico reversible que ocurre en casos de cirrosis avanzada. El evento disparador es el fracaso masivo del hígado para purificar sangre, o la sangre misma esquivando al hígado a través de varices colaterales (Derivación portosistémica) llevando toneladas de toxinas absorbidas desde los intestinos directamente al cerebro.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Neurotoxina Maestra (Amonio, NH3):** Derivado de coliformes bacterianos digestivos, este pequeño y altamente difusible gas cruza la Barrera Hematoencefálica con facilidad letal.
- **Sobrecarga de las Aspiradoras Cerebrales:** Los astrocitos tienen que forzarse asimilando el amonio combinándolo con glutamato y originando muchísima "Glutamina".
- **Edema Osmótico Asfixiante:** Al sobreproducir Glutamina (que es como sal), adentro de las células atraen compulsivamente agua de la sangre; todos los astrocitos del cerebro se hinchan de forma paralizante aplastando la sinapsis neuronal vital.

### Afectación de Órganos y Sistemas Relacionados:
- **Tracto Corticomedular Muscular:** El veneno amoniacal causa un descarte eléctrico de impulsos rápidos causando temblores burdos intermitentes que "apagan por milisegundos y encienden el tono motor" causando la clásica ráfaga patológica en manos conocida como *Asterixis* o temblor aleteante.
- **Sistema Neurocognitivo:** Los circuitos del arousal en el cerebro inducen desde el sueño plácido matutino o insomnio invertido brutal nocturno, hasta progresar rápidamente a falta de respuesta motora general donde el paciente cae en coma con hiperreflexia asimétrica.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Hiperamonemia Intersticial Sanguínea:** Múltiples factores precipitan el colapso (como sangrado por varices o hipopotasemia diurética). Increíblemente, un paciente con "Hemorragia digestiva severa" sufre Encefalopatía porque un millón de glóbulos rojos vertidos a su tracto gástrico son "digeridos y convertidos" en miles colonias de bacterias proteolíticas de amonio.
- **Disregulador de GABA / Benzodiacepínicos endógenos:** Existe producción paralela de neuro-esteroides (frenadores natos de alta potencia somnolienta) haciendo al cerebro de un cirrótico susceptible a caer en coma con medicamentos inofensivos.

### Correlación con Comorbilidades:
- **Disfunción Gastro-Renal (Estreñimiento y Deshidratación):** En un cirrótico ascítico avanzado usar demasiado inhibidor de lazarina con diurético condena a hipovolemia, falla prerrenal mínima y freno del tracto (estancamiento fecal rico en amonio) precipitando abruptamente la crisis neurológica encefalopática mortal sin otro motivo que el estreñimiento.`,
      esquemaMental: {
        inicio: "Falla de aclaramiento hepático de nitrógeno producto de digestión entérica.",
        dano: "Conversión de Amonio en Glutamina y Edema masivo reactivo en células astrocíticas SNC.",
        consecuencia: "Enlentecimiento y fracaso cognitivo-motor global asfixiante tóxico y fluctuante reversible."
      },
      cita: "EASL/AASLD Guidelines on Hepatic Encephalopathy"
    },
    manejo: {
      diagnostico: "Principalmente clínico (Escala de West-Haven). Amonemia sérica (apoya pero no es definitoria). EEG (ondas trifásicas). Descartar factores precipitantes (sangrado, ITUs, estreñimiento).",
      tratamiento: "Lactulosa (Laxante osmótico). Rifaximina (Antibiótico no absorbible). Medidas generales de nutrición.",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Lactulosa", dosis: "15-30 ml", frecuencia: "Cada 8-12h", observaciones: "Ajustar dosis hasta lograr 2-3 deposiciones blandas al día." },
          { nombre: "Rifaximina", dosis: "550 mg", frecuencia: "Cada 12h", observaciones: "Prevención secundaria de episodios recurrentes." }
        ],
        medidasGenerales: [
          "Evitar la restricción proteica excesiva (previene sarcopenia).",
          "Tratar la causa precipitante (ITUs, Hemorragia).",
          "Evitar sedantes y benzodiacepinas."
        ]
      },
      monitoreo: {
        parametros: [
          "Grado de West-Haven diario.",
          "Frecuencia y consistencia de las deposiciones.",
          "Pruebas de función hepática y electrolitos."
        ],
        signosAlerta: [
          "Imposibilidad para despertar al paciente.",
          "Hematemesis o melenas.",
          "Signos de deshidratación severa por exceso de lactulosa."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Mejoría en el nivel de consciencia (bajar grado de West-Haven).",
          "Desaparición de la asterixis.",
          "Tránsito intestinal adecuado."
        ],
        criteriosFracaso: [
          "Coma profundo (Grado IV).",
          "Falla multiorgánica asociada."
        ]
      },
      cita: "AASLD/EASL Guidelines for Hepatic Encephalopathy"
    },
    enfermeria: {
      nanda: '00128 Confusión aguda / 00196 Motilidad gastrointestinal disfuncional',
      intervenciones: [
        { accion: 'Administrar enemas de lactulosa si el paciente no tolera la vía oral.', razon: 'Eliminación rápida de productos nitrogenados de la luz intestinal.' },
        { accion: 'Registrar balance hídrico y vigilar signos de deshidratación.', razon: 'Los laxantes pueden causar pérdidas hidroelectrolíticas significativas.' },
        { accion: 'Mantener barandales elevados y vigilancia constante.', razon: 'Alto riesgo de caídas por agitación y confusión.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_41_tumorescerebrales',
    nombre: 'Tumores Cerebrales',
    servicio: 'Medicina Interna',
    system: 'Sistema Neurológico',
    color: '#FFF3E0',
    icon: 'Microscope',
    definicionCaso: 'Masas intracraneales (primarias o metastásicas) que comprimen el tejido neural.',
    sintomasClave: ['Cefalea progresiva', 'Crisis convulsivas nuevas', 'Cambios conductuales', 'Déficit focal'],
    clinica: {
      signosSintomas: [
        "Cefalea persistente, peor por la mañana o que despierta al paciente.",
        "Crisis convulsivas de inicio en la edad adulta (sin antecedentes).",
        "Náuseas y vómitos (sugiere hipertensión endocraneana).",
        "Déficit neurológico focal (según ubicación del tumor).",
        "Papiledema en el examen de fondo de ojo."
      ],
      maniobraExploracion: "1. Examen de pares craneales. 2. Fondo de ojo. 3. Evaluación de coordinación y marcha.",
      banderasRojas: [
        "Deterioro rápido del nivel de conciencia.",
        "Signos de herniación inminente (midriasis, bradicardia).",
        "Déficit motor de rápida progresión.",
        "Cefalea que cambia con las maniobras de Valsalva."
      ],
      cita: "NCCN Guidelines for Central Nervous System Cancers"
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
Los Tumores Cerebrales representan la invasión celular caótica dentro de la barrera cerrada del cráneo. El evento disparador es una mutación en las células de sostén (Glía) formando tumores primarios astrocíticos (Glioblastomas letales) o la implacable llegada de "semillas flotantes" por sangre (Metástasis focales de pulmón, mama o melanoma) anidándose y vascularizándose letalmente en el parénquima profundo neural.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Neovascularogénesis Anárquica:** El tumor empieza a secuestrar sangre de las venas periféricas de los nódulos sanos creando su propio cableado perverso; pero estas venas mutantes crecen "con fugas," filtrando plasma masivamente al cerebro sano perimetral.
- **Edema Vasogénico de Contacto:** El principal daño a la larga inicial en tumores no es de ellos sino la brutal retención de ese líquido plasmático filtrado acumulándose implacablemente, lo cual hincha el hemisferio como una esponja superando las limitantes óseas rígidas del hueso craneal.
- **Aplastamiento Vascular Isquémico:** La contrapresión extrema originada al borde del tumor genera que la fuerza intracraneal se dispare, cerrando de forma refleja los capilares venosos; las neuronas distantes sanas se asfixian originando isquemias locales de rebote.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico Somático Motor:** Localizaciones topográficas milimétricas determinan focos específicos únicos de disfunción sin igual; un tumor milimétrico presionando el Lóbulo Frontal anterior genera mutismos acinéticos y déficit volitivo o desinhibición conductual sin la más mínima pérdida de fuerza; si descansa en el motor suplementario, parálisis densa asimétrica gradual letal.
- **Focos Irritativos Convulsivos:** Su presión contigua e infiltrativa con membranas de hierro causa de manera inevitable y asincrónica la excitación focal neuronal letal causando convulsiones sintomáticas "de la nada" en adultos. 

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Interrupción en Cuerpos Hipofisarios:** Algunas neoformaciones (adenomas en Tuberculum) detienen el flujo neuro-secretor por aplastamiento infundibular disparando patológicamente niveles galactorréicos incesantes al torrente sistémico.

### Correlación con Comorbilidades:
- **Cáncer Oncológico Primario:** Gran número y en rápido aumento de tumores cerebrales no son de este territorio de matriz primaria sino por quimioterapias agresivas en otras partes (cáncer Broncogénico letal veloz masivo) que perdonan el cuerpo pero no la barrera cerebral.`,
      esquemaMental: {
        inicio: "Infiltración expansiva intrínseca (Primario glial) o siembra metastásica focal (Secundarios oncogénicos).",
        dano: "Neo-vascularización aberrante letal y consecuente derrame plasmático formador de edema Vasogénico intratable.",
        consecuencia: "Hipertensión endocraneana, excitación patológica epiléptica focal e isquemia tisular por aplastamiento general isquémico."
      },
      cita: "World Health Organization Classification of Tumours of the Central Nervous System"
    },
    manejo: {
      diagnostico: "RM cerebral con Gadolinio (Gold standard). TC de tórax/abdomen (si se sospecha metástasis). Biopsia estereotáxica para tipificación.",
      tratamiento: "Dexametasona (para el edema). Cirugía (Resección). Radioterapia y Quimioterapia según tipo histológico. Anticonvulsivantes profilácticos (discutido).",
      tratamientoDetallado: {
        farmacos: [
          { nombre: "Dexametasona", dosis: "4-8 mg", frecuencia: "Cada 6-8h", observaciones: "Básico para reducir edema peritumoral." },
          { nombre: "Omeprazol", dosis: "20 mg", frecuencia: "Diaria", observaciones: "Protección gástrica si usa corticoides dosis altas." },
          { nombre: "Levetiracetam", dosis: "500 mg", frecuencia: "Cada 12h", observaciones: "Si ha presentado crisis convulsiva." }
        ],
        medidasGenerales: [
          "Manejo paliativo si el tumor es inoperable.",
          "Apoyo multidisciplinario (Oncología/Neurocirugía).",
          "Control estricto de la ingesta de líquidos."
        ]
      },
      monitoreo: {
        parametros: [
          "Escala de Glasgow diaria.",
          "Función motora y sensitiva focal.",
          "Efectos secundarios de los esteroides (glucemia)."
        ],
        signosAlerta: [
          "Cefalea explosiva súbita.",
          "Cualquier nueva focalización neurológica.",
          "Signos de herniación inminente (anisocoria, bradicardia).",
          "Deterioro rápido del nivel de conciencia."
        ]
      },
      evaluacion: {
        criteriosExito: [
          "Estabilización del edema peritumoral.",
          "Ausencia de crisis convulsivas.",
          "Control del dolor con analgesia escalonada."
        ],
        criteriosFracaso: [
          "Progresión rápida del déficit neurológico.",
          "Complicaciones por hipertensión endocraneana refractaria."
        ]
      },
      cita: "NCCN Guidelines Central Nervous System"
    },
    enfermeria: {
      nanda: '00201 Riesgo de perfusión tisular cerebral ineficaz',
      intervenciones: [
        { accion: 'Mantener cabecera a 30-45 grados.', razon: 'Favorece el drenaje venoso and ayuda a controlar la PIC.' },
        { accion: 'Vigilancia estrecha de cambios en el comportamiento.', razon: 'Detección temprana de irritación cortical o aumento de presión local.' },
        { accion: 'Control estricto de la administración de dexametasona.', razon: 'Reducir el edema vasogénico asociado al tumor.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_49_sindromenefritico',
    nombre: 'Síndrome Nefrítico',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Inflamación glomerular aguda que cursa con hematuria, hipertensión y edema.',
    sintomasClave: ['Hematuria', 'Hipertensión arterial', 'Edema', 'Oliguria'],
    clinica: {
      signosSintomas: [
        'Hematuria macroscópica (orina color "lavado de carne" o coca-cola).',
        'Hipertensión arterial de inicio súbito.',
        'Edema palpebral y pretibial.',
        'Oliguria (disminución del volumen urinario).',
        'Dolor lumbar sordo bilateral.'
      ],
      maniobraExploracion: 'Evaluación de TA, búsqueda de edema con fóvea, auscultación cardiopulmonar para signos de sobrecarga.',
      banderasRojas: [
        'Edema agudo de pulmón.',
        'Encefalopatía hipertensiva.',
        'Insuficiencia renal rápidamente progresiva.',
        'Hiperpotasemia severa.'
      ],
      cita: 'Harrison, Principios de Medicina Interna'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Síndrome Nefrítico es una constelación de hallazgos clínicos derivados de una inflamación aguda y grave de los glomérulos. El evento disparador suele ser de origen inmunológico (como la Glomerulonefritis Post-Estreptocócica), donde el depósito de inmunocomplejos en el espacio subepitelial o subendotelial desencadena una respuesta leucocitaria agresiva que rompe la integridad de la barrera de filtración.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Daño de la Barrera:** La inflamación crea "poros" en la membrana basal glomerular, permitiendo el paso de eritrocitos (Hematíes) hacia el espacio de Bowman.
- **Caída de la Tasa de Filtración Glomerular (TFG):** El edema y el reclutamiento celular obstruyen los capilares glomerulares, reduciendo drásticamente la capacidad del riñón para filtrar la sangre.
- **Hipertensión por Sobrecarga:** Ante la caída de la TFG, el riñón interpreta erróneamente una falta de volumen y activa mecanismos de retención ávida de sodio y agua.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Aparición de hematuria (cilindros hemáticos) y oliguria. Riesgo de insuficiencia renal aguda rápidamente progresiva.
- **Sistema Cardiovascular:** El aumento brusco del volumen intravascular genera Hipertensión Arterial Sistémica y puede desencadenar una Insuficiencia Cardíaca Aguda.
- **Sistema Neurológico:** Si el aumento de la TA es extremo, se produce edema cerebral, manifestándose como Encefalopatía Hipertensiva (cefalea, convulsiones, coma).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Sistema Complemento:** Consumo de proteínas del complemento (C3 bajo), lo que indica la activación de la vía alterna por los inmunocomplejos.
- **Especies Reactivas de Oxígeno:** Los neutrófilos reclutados liberan radicales libres que perpetúan la destrucción de los capilares renales.

### Correlación con Comorbilidades:
- **Infecciones Cutáneas/Faríngeas Previas:** Es clásico el antecedente de piodermitis o amigdalitis 1-3 semanas antes del cuadro nefrítico.
- **Lupus Eritematoso Sistémico:** En pacientes lúpicos, el síndrome nefrítico indica una actividad renal severa (Nefritis Lúpica IV) que requiere tratamiento agresivo.`,
      esquemaMental: {
        inicio: "Infección o noxa inmunológica glomerular.",
        dano: "Inflamación capilar y ruptura de la barrera de filtración.",
        consecuencia: "Hematuria, HTA por retención de sodio y fallo renal agudo."
      },
      cita: "Harrison, Principios de Medicina Interna"
    },
    manejo: {
      diagnostico: 'Sedimento urinario (cilindros hemáticos), Complemento (C3, C4), Antiestreptolisinas (ASLO), Función renal (Creatinina/BUN).',
      tratamiento: 'Restricción hídrica y de sodio, Diuréticos de asa (Furosemida), Control de TA, Antibióticos si hay detección de infección activa.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Furosemida', dosis: '20-40 mg', frecuencia: 'Cada 12-24 horas IV/VO', observaciones: 'Diurético de elección para manejo de edema y HTA por sobrecarga.' },
          { nombre: 'Enalapril', dosis: '5-10 mg', frecuencia: 'Cada 12-24 horas', observaciones: 'Solo si no hay hiperpotasemia o falla renal aguda severa.' },
          { nombre: 'Penicilina V / Amoxicilina', dosis: '500 mg', frecuencia: 'Cada 8 horas', observaciones: 'Solo en casos documentados de infección estreptocócica activa.' }
        ],
        medidasGenerales: [
          'Restricción hídrica (pérdidas insensibles 500cc + diuresis previa).',
          'Dieta hiposódica estricta (< 2g de Sodio al día).',
          'Reposo relativo en fase aguda para control de la presión arterial.'
        ]
      },
      monitoreo: {
        parametros: [
          'Balance hídrico estricto y peso diario.',
          'Presión arterial cada 4-6 horas.',
          'Niveles de Potasio sérico y Creatinina.'
        ],
        signosAlerta: [
          'Disnea súbita u ortopnea (signos de Edema Agudo de Pulmón).',
          'Hipertensión severa refractaria (> 160/100 mmHg).',
          'Oliguria persistente (< 0.5 ml/kg/h).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Normalización de la presión arterial.',
          'Resolución del edema y pérdida del peso ganado.',
          'Mejoría del filtrado glomerular.'
        ],
        criteriosFracaso: [
          'Desarrollo de insuficiencia cardiaca congestiva aguda.',
          'Progresión a insuficiencia renal rápidamente progresiva.'
        ]
      },
      cita: 'Guías KDIGO'
    },
    enfermeria: {
      nanda: '00026 Exceso de volumen de líquidos',
      intervenciones: [
        { accion: 'Control de peso diario en ayunas.', razon: 'Indicador más sensible de retención o pérdida de líquidos.' },
        { accion: 'Restricción de sodio en la dieta.', razon: 'Disminuir la retención hídrica y la hipertensión.' },
        { accion: 'Vigilancia de signos de sobrecarga pulmonar.', razon: 'Detección temprana de edema agudo de pulmón.' }
      ],
      cita: 'NIC/NOC'
    }
  },
  {
    id: 'int_50_glomerulonefritis',
    nombre: 'Glomerulonefritis',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Inflamación de los glomérulos renales.',
    sintomasClave: ['Hematuria', 'Hipertensión arterial', 'Edema', 'Proteinuria'],
    clinica: {
      signosSintomas: [
        'Hematuria (usualmente macroscópica, color coca-cola).',
        'Proteinuria en rango variable (puede llegar a rango nefrótico).',
        'Hipertensión arterial (por retención de sodio y agua).',
        'Edema (palpebral y en extremidades).',
        'Disminución de la Tasa de Filtración Glomerular (elevación de Creatinina).',
        'Oliguria progresiva.',
        'Cilindros hemáticos en el sedimento urinario.'
      ],
      maniobraExploracion: 'Toma de TA en decúbito y bipedestación; búsqueda de signo de Godet; auscultación de S3/S4 (sobrecarga); fondo de ojo (hipertensión).',
      banderasRojas: [
        'Insuficiencia renal rápidamente progresiva (creatinina se duplica en días).',
        'Edema agudo de pulmón.',
        'Hemorragia alveolar (hemoptisis).',
        'Encefalopatía hipertensiva.',
        'Anuria total.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, 21e'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Glomerulonefritis (GN) representa un grupo heterogéneo de enfermedades caracterizadas por la inflamación de los glomérulos, las unidades de filtración del riñón. El evento disparador es casi siempre una desregulación del sistema inmune, donde anticuerpos propios o complejos antígeno-anticuerpo se depositan en el riñón, "marcando" el tejido para ser atacado por el propio sistema de defensa del organismo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Proliferación Celular:** En respuesta al daño, las células del glomérulo se multiplican de forma desordenada, pudiendo formar "semilunas" (proliferación extracapilar) que comprimen el penacho glomerular hasta anular su función.
- **Esclerosis Glomerular:** Si la inflamación es persistente, el tejido funcional es reemplazado por cicatrices (colágeno), llevando a una pérdida irreversible de nefronas.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Síndrome Nefrótico (pérdida masiva de proteínas) o Síndrome Nefrítico (inflamación con sangre en orina). La caída de la TFG lleva a la uremia.
- **Sistema Cardiovascular:** El daño renal dispara el eje Renina-Angiotensina de forma perniciosa, causando hipertensión de difícil control.
- **Sistema Hematológico:** La inflamación crónica y el daño renal pueden reducir la producción de eritropoyetina, causando anemia.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Citoquinas Proinflamatorias:** Niveles elevados de IL-1 y TNF-α que median el reclutamiento de macrófagos al glomérulo.
- **Albúmina Sérica:** En casos nefróticos, la caída drástica de la albúmina reduce la presión oncótica, causando la fuga de líquido hacia el tercer espacio (Anasarca).

### Correlación con Comorbilidades:
- **Diabetes Mellitus:** Los niveles altos de glucosa potencian el daño inflamatorio glomerular, acelerando la progresión a la insuficiencia renal terminal.
- **Hepatitis C:** Se asocia frecuentemente con Glomerulonefritis Crioglobulinémica, donde el virus induce la formación de complejos que se depositan en los riñones.`,
      esquemaMental: {
        inicio: "Depósito de inmunocomplejos o anticuerpos en el glomérulo.",
        dano: "Inflamación, reclutamiento leucocitario y daño capilar.",
        consecuencia: "Pérdida de eritrocitos/proteínas y fallo renal progresivo."
      },
      cita: "Robbins & Cotran Pathologic Basis of Disease"
    },
    manejo: {
      diagnostico: 'Examen de orina con sedimento (cilindros hemáticos). Niveles de complemento (C3, C4). Biopsia renal (si hay duda diagnóstica o progresión rápida).',
      tratamiento: 'Corticoides (Prednisona). Inmunosupresores (Ciclofosfamida). Control estricto de TA (IECA/ARAII). Restricción de sal y agua.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Prednisona', dosis: '1 mg/kg/día', frecuencia: 'Cada 24 horas', observaciones: 'Glucocorticoide de elección para inducción de remisión.' },
          { nombre: 'Ciclofosfamida', dosis: 'Según protocolo/peso', frecuencia: 'Mensual IV o diario VO', observaciones: 'Inmunosupresor potente; requiere vigilancia de toxicidad medular.' },
          { nombre: 'Losartán/Enalapril', dosis: 'Titulación según TA', frecuencia: 'Cada 12-24 horas', observaciones: 'Efecto antiproteinúrico y nefroprotector.' }
        ],
        medidasGenerales: [
          'Control de peso diario y balance hídrico.',
          'Evitar el uso de AINES y otros fármacos nefrotóxicos.',
          'Valoración nutricional (control de ingesta proteica según TFG).'
        ]
      },
      monitoreo: {
        parametros: [
          'Proteinuria en orina de 24 horas (cuantificación seriada).',
          'Función renal (Creatinina, TFG estimada).',
          'Hemograma completo (vigilancia de leucopenia por inmunosupresores).'
        ],
        signosAlerta: [
          'Duplicación de la Creatinina en menos de 1-2 semanas.',
          'Fiebre en paciente inmunosuprimido (riesgo de sepsis).',
          'Hemoptisis (sospecha de síndrome riñón-pulmón).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Reducción de la proteinuria a niveles basales.',
          'Estabilización o mejoría de la tasa de filtración glomerular.',
          'Control de la presión arterial.'
        ],
        criteriosFracaso: [
          'Desarrollo de fibrosis renal irreversible en biopsia.',
          'Necesidad persistente de terapia de reemplazo renal.'
        ]
      },
      cita: 'KDIGO 2021 Clinical Practice Guideline for Glomerular Diseases'
    },
    enfermeria: {
      nanda: '00026 Exceso de volumen de líquidos / 00126 Conocimientos deficientes',
      intervenciones: [
        { accion: 'Monitorizar diariamente el balance hídrico y peso corporal.', razon: 'Detección temprana de retención hídrica refractaria.' },
        { accion: 'Vigilar la aparición de hematuria franca en cada micción.', razon: 'Evaluar la actividad de la enfermedad glomerular.' },
        { accion: 'Educar sobre la dieta hiposódica y control de líquidos.', razon: 'Pilar fundamental para el manejo de la HTA y el edema.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_51_litiasisrenal',
    nombre: 'Litiasis Renal',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Cálculos en el tracto unitario.',
    sintomasClave: ['Dolor lumbar agudo (cólico)', 'Hematuria', 'Náuseas y vómitos'],
    clinica: {
      signosSintomas: [
        'Cólico nefrítico (dolor paroxístico, intenso, en flanco que irradia a ingle).',
        'Náuseas y vómitos reflejos por el dolor intenso.',
        'Hematuria (microscópica en el 90% de los casos).',
        'Polaquiuria y urgencia miccional (si el cálculo está cerca de la unión vesicoureteral).',
        'Diaforesis y palidez.'
      ],
      maniobraExploracion: 'Signo de Giordano (puñopercusión lumbar) positivo. Palpación abdominal (descartar irritación peritoneal). Puntos ureterales dolorosos.',
      banderasRojas: [
        'Fiebre y escalofríos (sugiere urosepsis obstructiva).',
        'Anuria (riñón único u obstrucción bilateral).',
        'Vómitos incoercibles que impiden analgesia oral.',
        'Dolor refractario a opioides.',
        'Insuficiencia renal aguda post-renal.'
      ],
      cita: 'EAU Guidelines on Urolithiasis 2023'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Litiasis Renal es la formación de concreciones sólidas (cálculos) en el sistema colector urinario. El evento disparador es la **Sobresaturación Urinaria**: cuando la concentración de sales (calcio, oxalato, ácido úrico) supera el límite de solubilidad, se forman cristales que nuclean y crecen hasta formar el lito.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Migración y Obstrucción:** El cálculo se desplaza por el uréter, quedando atrapado en los puntos de estrechez anatómica.
- **Distensión Capsular:** La orina queda atrapada por encima de la piedra, dilatando la pelvis renal y estirando la cápsula de Bowman. Este estiramiento es el que genera el dolor atroz (cólico nefrítico).
- **Mediación Química:** El riñón obstruido libera Prostaglandinas (PGE2), que aumentan el flujo sanguíneo renal (empeorando la presión intrapélvica) y causan espasmo del músculo liso ureteral sobre el cálculo.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** La obstrucción prolongada genera Hidronefrosis, que si no se resuelve, causa muerte de las nefronas por presión (Nefropatía Obstructiva).
- **Sistema Gastrointestinal:** El dolor visceral intenso activa el nervio vago y el sistema autonómico, provocando náuseas y vómitos reflejos.
- **Sistema Inmune:** El estasis urinario permite que bacterias asciendan, transformando una simple piedra en una emergencia mortal: la Pielonefritis Obstructiva (Urosepsis).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Inhibidores de la Cristalización:** Bajos niveles de Citrato o Magnesio en la orina (que normalmente impiden que los cristales se peguen).
- **pH Urinario:** Un pH ácido favorece los cálculos de ácido úrico, mientras que uno alcalino favorece los de estruvita (infecciosos).

### Correlación con Comorbilidades:
- **Gota:** El exceso de ácido úrico sistémico se filtra al riñón, predisponiendo a cálculos radiolúcidos.
- **Hiperparatiroidismo:** El exceso de hormona PTH eleva el calcio en sangre y orina, causando cálculos recurrentes de oxalato de calcio.`,
      esquemaMental: {
        inicio: "Sobresaturación urinaria y nucleación de cristales.",
        dano: "Obstrucción ureteral y aumento de la presión intrapélvica.",
        consecuencia: "Cólico nefrítico e hidronefrosis obstructiva."
      },
      cita: "Campbell-Walsh-Wein Urology"
    },
    manejo: {
      diagnostico: 'TC de abdomen y pelvis no contrastado (Gold standard). Ecografía renal (primera línea en embarazadas/niños). EGO (buscar hematuria/nitritos).',
      tratamiento: 'Analgesia (AINES: Ketorolaco/Diclofenaco son de elección). Terapia expulsiva médica (Tamsulosina). Litotricia (LEOCH) o ureteroscopia si es necesario.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Ketorolaco', dosis: '30 mg', frecuencia: 'Cada 8 horas IV/IM (máx. 2-5 días)', observaciones: 'AINES son superiores a opioides para el alivio del dolor cólico.' },
          { nombre: 'Tamsulosina', dosis: '0.4 mg', frecuencia: 'Cada 24 horas VO', observaciones: 'Terapia expulsiva médica (TEM) para cálculos ureterales distales < 10 mm.' },
          { nombre: 'Butilescopolamina', dosis: '20 mg', frecuencia: 'Cada 8 horas PRN', observaciones: 'Antiespasmódico coadyuvante.' }
        ],
        medidasGenerales: [
          'Hidratación abundante (solo si no hay obstrucción completa o hidronefrosis severa).',
          'Colar la orina para recuperar el cálculo para estudio metabólico.',
          'Deambulación activa para facilitar el descenso del lito.'
        ]
      },
      monitoreo: {
        parametros: [
          'Escala visual analógica (EVA) del dolor.',
          'Volumen urinario y presencia de hematuria.',
          'Signos vitales (vigilancia de SIRS/Sepsis).'
        ],
        signosAlerta: [
          'Fiebre > 38.3 °C (sospecha de sepsis urinaria obstructiva - Emergencia).',
          'Dolor refractario a analgesia endovenosa.',
          'Anuria o elevación súbita de azoados.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Expulsión espontánea del cálculo.',
          'Resolución completa del dolor.',
          'Preservación de la función renal.'
        ],
        criteriosFracaso: [
          'Impactación del cálculo con hidronefrosis progresiva.',
          'Pielonefritis aguda obstructiva.'
        ]
      },
      cita: 'GPC Manejo Integral de la Litiasis Renal'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00013 Diarrea (nauseas/vomitos)',
      intervenciones: [
        { accion: 'Administrar analgesia pautada y de rescate.', razon: 'Controlar el dolor es prioritario para la estabilidad hemodinámica.' },
        { accion: 'Fomentar la deambulación si el dolor lo permite.', razon: 'Puede facilitar el descenso del cálculo.' },
        { accion: 'Colar la orina para recuperar el cálculo.', razon: 'Permite el análisis bioquímico de la piedra para prevención futura.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_52_hiperpotasemiahipopotasemia',
    nombre: 'Hiperpotasemia / Hipopotasemia',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Alteraciones séricas del Potasio.',
    sintomasClave: ['Arritmias', 'Debilidad muscular proximal', 'Cambios en el EKG'],
    clinica: {
      signosSintomas: [
        'Hiperpotasemia: Debilidad muscular ascendente, parestesias, náuseas, palpitaciones.',
        'Hipopotasemia: Calambres musculares, estreñimiento (íleo), fatiga, poliuria.',
        'Cambios EKG Hiper: Ondas T picudas, ensanchamiento QRS, desaparición de onda P.',
        'Cambios EKG Hipo: Ondas U, aplanamiento de onda T, depresión del segmento ST.'
      ],
      maniobraExploracion: 'Monitorización EKG continua (mandatorio); evaluación de fuerza muscular proximal; auscultación de ruidos hidroaéreos (íleo en hipokalemia); reflejos osteotendinosos.',
      banderasRojas: [
        'K > 6.5 mEq/L con cambios en EKG (Riesgo inminente de asistolia).',
        'Parálisis muscular respiratoria.',
        'K < 2.5 mEq/L (Riesgo de arritmias ventriculares fatales).',
        'Bloqueo AV de alto grado.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Cap. Disnatremia and Diskalemia'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
Las alteraciones del Potasio (K+) son de las emergencias electrolíticas más peligrosas. El K+ es el principal ión intracelular (98%). El evento disparador es un fallo en la ingesta, en la excreción renal o un movimiento brusco entre el interior y el exterior de la célula, lo que altera el **Potencial de Membrana en Reposo**.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Hiperpotasemia (La "Inyección Letal"):** El exceso de K+ fuera de la célula disminuye la electronegatividad interna, haciendo que la célula se despolarice pero no pueda "resetearse" (repolarizarse), llevando a la asistolia cardíaca.
- **Hipopotasemia:** La escasez de K+ hace que el potencial de membrana sea más negativo (hiperpolarización), alejando a la célula del umbral necesario para activarse, lo que causa debilidad extrema y parálisis muscular.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** En HiperK, ondas T picudas y ensanchamiento del QRS hasta el paro cardiaco. En HipoK, arritmias ventriculares por prolongación del QT.
- **Sistema Neuromuscular:** Debilidad muscular ascendente que puede llegar a la parálisis diafragmática (fallo respiratorio).
- **Sistema Gastrointestinal (en HipoK):** El músculo liso intestinal deja de moverse, provocando un Íleo Paralítico (ausencia de ruidos intestinales y distensión).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Aldosterona:** Es la hormona clave que ordena al riñón tirar K+ a la orina a cambio de recuperar sodio.
- **Insulina y Adrenalina:** Ambas sustancias funcionan como "porteros" que empujan el potasio hacia adentro de las células tras una comida o en estrés.

### Correlación con Comorbilidades:
- **Insuficiencia Renal:** Es la principal causa de hiperpotasemia peligrosa, al perderse la única vía de salida eficiente del potasio.
- **Uso de Diuréticos:** Los diuréticos de asa (como furosemida) "lavan" el potasio hacia la orina, siendo la causa más común de hipopotasemia severa.`,
      esquemaMental: {
        inicio: "Falla en el balance entre ingesta, excreción y flujo transcelular.",
        dano: "Alteración del potencial de membrana celular (Excitabilidad).",
        consecuencia: "Arritmias cardíacas fatales y parálisis muscular."
      },
      cita: "Harrison, Principios de Medicina Interna: Diskalemia"
    },
    manejo: {
      diagnostico: 'Gases arteriales (K+ iónico). Electrolitos séricos. EKG de 12 derivaciones. Función renal (Creatinina).',
      tratamiento: 'Hiper: Gluconato de Calcio, Insulina + Glucosa, Salbutamol. Hipo: Reposición de Potasio (IV u oral) + Magnesio.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Gluconato de Calcio 10%', dosis: '10-20 ml', frecuencia: 'Bolo lento (5-10 min)', observaciones: 'Estabilizador de membrana cardiaca en hiperpotasemia con cambios EKG.' },
          { nombre: 'Insulina R + Dextrosa 50%', dosis: '10 UI + 50 ml', frecuencia: 'Dosis única IV', observaciones: 'Mecanismo de redistribución celular de potasio. Vigilar hipoglucemia.' },
          { nombre: 'Cloruro de Potasio (KCl)', dosis: 'Según déficit (máx 10-20 mEq/h)', frecuencia: 'Infusión controlada', observaciones: 'Para hipopotasemia. Usar vía central si la concentración es alta (> 40 mEq/L).' }
        ],
        medidasGenerales: [
          'Monitorización electrocardiográfica continua en casos severos.',
          'Dieta baja en potasio (hiper) o alta en potasio (hipo).',
          'Evaluar medicamentos causantes (IECA, ahorradores de K, diuréticos de asa).'
        ]
      },
      monitoreo: {
        parametros: [
          'Potasio iónico/sérico cada 2-4 horas durante la corrección aguda.',
          'Estado de la onda T y complejo QRS en telemetría.',
          'Gasto urinario horaria.'
        ],
        signosAlerta: [
          'Aparición de ondas T picudas o ensanchamiento del QRS.',
          'Parálisis muscular progresiva.',
          'Arritmias ventriculares o bradicardia severa.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Potasio sérico en rango normal (3.5 - 5.0 mEq/L).',
          'Normalización de los hallazgos en el EKG.',
          'Recuperación de la fuerza muscular.'
        ],
        criteriosFracaso: [
          'Persistencia de hiperpotasemia refractaria (indicación de diálisis).',
          'Paro cardiorrespiratorio por arritmia electrolítica.'
        ]
      },
      cita: 'AHA Guidelines for Advanced Cardiovascular Life Support (ACLS)'
    },
    enfermeria: {
      nanda: '00201 Riesgo de perfusión tisular cardiaca ineficaz',
      intervenciones: [
        { accion: 'Asegurar acceso venoso de gran calibre.', razon: 'La infusión de potasio es muy irritante; si es vesicante, usar vía central.' },
        { accion: 'Monitorización continua de telemetría.', razon: 'Detección inmediata de arritmias letales por cambios electrolíticos.' },
        { accion: 'Control estricto de diuresis horaria.', razon: 'El potasio se excreta vía renal; la oliguria es un factor de riesgo para hiperkalemia.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_53_hipernatremiahiponatremia',
    nombre: 'Hipernatremia / Hiponatremia',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Alteraciones séricas del Sodio.',
    sintomasClave: ['Alteración del estado mental', 'Convulsiones', 'Cefalea intensa'],
    clinica: {
      signosSintomas: [
        'Hiponatremia: Letargia, náuseas, cefalea, confusión, calambres y en casos graves convulsiones o coma.',
        'Hipernatremia: Sed intensa, poliuria (si es diabetes insípida), piel seca, irritabilidad neurológica.',
        'Signos de edema cerebral (en hiponatremia aguda severa).',
        'Deshidratación celular (en hipernatremia).'
      ],
      maniobraExploracion: 'Evaluación del estado de hidratación (turgencia cutánea, mucosas); examen neurológico completo (Glasgow); TA ortostática; búsqueda de edemas periféricos.',
      banderasRojas: [
        'Convulsiones tónico-clónicas.',
        'Coma metabólico.',
        'Na < 120 mEq/L (Riesgo elevado de herniación cerebral).',
        'Corrección demasiado rápida de Sodio (Riesgo de Mielinolisis Pontina Central).',
        'Desvío pupilar o signos de focalización neurológica.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Disnatremia'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
Las alteraciones del Sodio (Na+) son, en esencia, trastornos del **Balance de Agua**. El Na+ es el principal soluto del espacio extracelular y determina la Osmolaridad. El evento disparador no suele ser comer mucha o poca sal, sino ganar o perder agua libre de manera desproporcionada.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Hiponatremia (Edema Cerebral):** Al haber poco sodio fuera, el agua entra por ósmosis hacia el interior de las células cerebrales (neuronas), haciendo que el cerebro se hinche dentro del cráneo rígido.
- **Hipernatremia (Deshidratación Neuronal):** El exceso de sodio fuera "succiona" el agua de las neuronas, haciendo que se encojan y rompiendo los pequeños vasos sanguíneos del cerebro.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neurológico:** Cefalea, confusión, convulsiones y coma. Una corrección demasiado rápida de la hiponatremia puede causar la destrucción irreversible de la mielina en el tronco cerebral (Mielinolisis Pontina).
- **Sistema Cardiovascular:** La hiponatremia extrema a menudo se asocia con estados de bajo volumen (deshidratación) o exceso de volumen (insuficiencia cardíaca).
- **Mecanismo de la Sed:** La hipernatremia dispara el centro de la sed en el hipotálamo, obligando al individuo a buscar agua desesperadamente.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Hormona Antidiurética (ADH):** Es el "grifo" del riñón. En hiponatremia, la ADH debería estar apagada para tirar agua, pero si está encendida inapropiadamente (SIADH), el sodio cae peligrosamente.
- **Osmolaridad Plasmática:** El cálculo (2*Na + Glucosa/18 + BUN/2.8) es fundamental para distinguir si el trastorno es real o una falsa lectura (pseudohiponatremia).

### Correlación con Comorbilidades:
- **Cirrosis e Insuficiencia Cardíaca:** Ambas "engañan" al riñón haciéndole creer que falta volumen, lo que provoca una retención excesiva de agua y dilución del sodio.
- **Ancianos con Sed Deteriorada:** Son el grupo de mayor riesgo para hipernatremia, al no poder sentir o responder a la señal de sed por el envejecimiento cerebral.`,
      esquemaMental: {
        inicio: "Desbalance entre el agua corporal total y el sodio.",
        dano: "Cambios osmóticos en el volumen celular (especialmente neuronal).",
        consecuencia: "Disfunción neurológica severa y riesgo de hernia cerebral."
      },
      cita: "Harrison, Principios de Medicina Interna: Dysnatremia"
    },
    manejo: {
      diagnostico: 'Sodio sérico, Osmolaridad plasmática y urinaria, Sodio urinario.',
      tratamiento: 'Hipo: Restricción hídrica, Solución salina al 3% (si grave). Hiper: Reemplazo de agua libre.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Solución Salina al 3%', dosis: '100 ml en bolo (repetir si es necesario)', frecuencia: 'Según gravedad clínica (convulsiones)', observaciones: 'Reservada para hiponatremia sintomática grave. Meta: elevación de 4-6 mEq/L en horas.' },
          { nombre: 'Dextrosa al 5%', dosis: 'Cálculo de déficit de agua libre', frecuencia: 'Infusión continua', observaciones: 'Para hipernatremia. Evitar corrección rápida (> 0.5 mEq/L/h) para prevenir edema cerebral.' },
          { nombre: 'Furosemida', dosis: '20-40 mg IV', frecuencia: 'Cada 12-24 horas', observaciones: 'Útil en SIADH o estados edematosos para eliminar agua libre.' }
        ],
        medidasGenerales: [
          'Restricción estricta de líquidos (800-1000 ml/día) en hiponatremia euvolémica/hipervolémica.',
          'Cálculo de la tasa de corrección segura (meta máx 10-12 mEq/L in 24h).',
          'Identificación de la causa subyacente (fármacos, patología pulmonar/SNC).'
        ]
      },
      monitoreo: {
        parametros: [
          'Sodio sérico cada 4-6 horas durante la fase de corrección aguda.',
          'Estado neurológico (escala de Glasgow) and reflejos.',
          'Balance hídrico y peso diario.'
        ],
        signosAlerta: [
          'Convulsiones o estridor (edema cerebral progresivo).',
          'Cambios en el estado mental tras la corrección (sospecha de desmielinización osmótica).',
          'Poliuria acuosa masiva.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Normalización de los niveles de sodio plasmático (135-145 mEq/L).',
          'Recuperación del estado de alerta y funciones cognitivas.',
          'Estabilidad hemodinámica.'
        ],
        criteriosFracaso: [
          'Síndrome de desmielinización osmótica (mielinolisis pontina) por corrección rápida.',
          'Herniación cerebral por edema refractario.'
        ]
      },
      cita: 'Kidney International, Clinical Practice Guideline on diagnosis and treatment of hyponatraemia'
    },
    enfermeria: {
      nanda: '00128 Confusión aguda / 00155 Riesgo de caídas',
      intervenciones: [
        { accion: 'Monitorizar el estado neurológico cada 1-2 horas.', razon: 'Detectar cambios sutiles que sugieran empeoramiento del edema cerebral.' },
        { accion: 'Controlar estrictamente la velocidad de infusión de sodio.', razon: 'Evitar la mielinólisis pontina corrigiendo no más de 10-12 mEq/L en 24h.' },
        { accion: 'Registrar balance hídrico acumulado.', razon: 'Esencial para guiar el tratamiento de restricción o aporte de agua.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_56_poliquistosisrenal',
    nombre: 'Poliquistosis Renal',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Quistes renales múltiples genéticos.',
    sintomasClave: ['Dolor lumbar crónico', 'Masa palpable abdominal', 'Hematuria recurrente'],
    clinica: {
      signosSintomas: [
        'Dolor lumbar o en flancos progresivo y persistente.',
        'Riñones palpables y aumentados de tamaño (bilateral).',
        'Hematuria macroscópica (por ruptura de quistes).',
        'Hipertensión arterial temprana.',
        'Infecciones urinarias recurrentes y nicturia.'
      ],
      maniobraExploracion: 'Palpación abdominal bimanual profunda; búsqueda de hepatomegalia (quistes hepáticos asociados); monitorización periódica de la TA.',
      banderasRojas: [
        'Cefalea explosiva súbita (Sugerente de ruptura de aneurisma intracraneal asociado).',
        'Fiebre y dolor lumbar intenso (Infección de quiste o pielonefritis).',
        'Hematuria masiva con inestabilidad hemodinámica.',
        'Insuficiencia renal rápidamente progresiva.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Poliquistosis Renal'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Poliquistosis Renal Autosómica Dominante (PQRAD) es una enfermedad genética hereditaria caracterizada por la formación de incontables quistes llenos de líquido en ambos riñones. El evento disparador es una mutación en los genes PKD1 o PKD2, que altera la función de los cilios en las células tubulares, provocando que estas se multipliquen sin control y secreten líquido en lugar de formar túbulos normales.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Expansión de los Quistes:** Los quistes crecen gradualmente a lo largo de décadas, aumentando el volumen total del riñón hasta 10 veces su tamaño normal.
- **Isquemia y Fibrosis:** Los quistes gigantes comprimen los vasos sanguíneos y las nefronas sanas circundantes, causando falta de oxígeno, inflamación y fibrosis intersticial.
- **Fallo de la Arquitectura:** La distorsión masiva de la estructura renal termina por anular la capacidad de filtración, llevando a la enfermedad renal terminal generalmente en la quinta o sexta década de vida.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Hematuria por rotura de quistes, infecciones frecuentes y dolor lumbar crónico por distensión de la cápsula renal.
- **Sistema Cardiovascular:** La hipertensión arterial es casi universal y aparece de forma temprana debido a la activación del sistema renina-angiotensina por la isquemia intrarenal.
- **Manifestaciones Extrarenales:** Formación de quistes en el hígado (poliquistosis hepática) y, lo más peligroso, riesgo aumentado de aneurismas cerebrales (Berry) que pueden romperse.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **AMP Cíclico (AMPc):** Es el mensajero intracelular que está elevado y estimula tanto la proliferación de las células de los quistes como la secreción de líquido hacia su interior.
- **Eritropoyetina:** A veces los quistes producen EPO de forma autónoma, lo que puede mantener niveles de hemoglobina normales incluso en estadios avanzados de falla renal.

### Correlación con Comorbilidades:
- **Hipertensión Arterial:** Su control estricto es el pilar para retrasar la diálisis.
- **Antecedentes Familiares:** Es una enfermedad con una penetrancia muy alta; el diagnóstico en un familiar obliga al cribado de los descendientes.`,
      esquemaMental: {
        inicio: "Mutación genética (PKD1/PKD2) y disfunción ciliar.",
        dano: "Proliferación celular y formación de quistes expansivos.",
        consecuencia: "Destrucción del parénquima sano y fallo renal terminal."
      },
      cita: "Harrison, Principios de Medicina Interna"
    },
    manejo: {
      diagnostico: 'Ecografía renal (múltiples quistes bilaterales). TC o RM renal en casos atípicos. Pruebas genéticas (PKD1/PKD2) en casos seleccionados o consejo genético.',
      tratamiento: 'Manejo de soporte (HTA, infecciones). Tolvaptán (antagonista de vasopresina) para enlentecer progresión. Diálisis o Trasplante en enfermedad terminal.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'IECA o ARA-II (ej. Losartán)', dosis: 'Titulación', frecuencia: 'Diaria', observaciones: 'De elección para el control de la HTA en estos pacientes.' },
          { nombre: 'Tolvaptán', dosis: 'Variable', frecuencia: 'Cada 12 horas', observaciones: 'Promete enlentecer el crecimiento de los quistes. Vigilar función hepática.' },
          { nombre: 'Antibióticos lipofílicos (ej. Ciprofloxacino)', dosis: 'Según antibiograma', frecuencia: 'Cada 12 horas', observaciones: 'Si hay infección de quiste (requieren penetrar el quiste).' }
        ],
        medidasGenerales: [
          'Aumento agresivo de la ingesta de agua (inhibe la vasopresina endógena).',
          'Restricción estricta de sodio.',
          'Evitar deportes de contacto (riesgo de ruptura quística).'
        ]
      },
      monitoreo: {
        parametros: [
          'Volumen total del riñón (por RM) como marcador de progresión.',
          'Función renal (TFG) periódica.',
          'Monitoreo estricto de la presión arterial.'
        ],
        signosAlerta: [
          'Hematuria que no cede con reposo.',
          'Fiebre refractaria a antibióticos habituales.',
          'Déficit neurológico focal repentino (aneurisma).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Presión arterial en metas (< 130/80 mmHg).',
          'Enlentecimiento de la caída de la TFG.',
          'Control de los síntomas de infección o dolor abdominal.'
        ],
        criteriosFracaso: [
          'Progresión rápida a Enfermedad Renal Terminal.',
          'Necesidad de nefrectomía por riñones gigantes dolorosos / infectados.'
        ]
      },
      cita: 'Guías KDIGO para Poliquistosis Renal'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00016 Deterioro de la eliminación urinaria',
      intervenciones: [
        { accion: 'Fomentar una ingesta hídrica superior a 3 litros al día (si TFG lo permite).', razon: 'Supresión fisiológica de la vasopresina que estimula el quiste.' },
        { accion: 'Monitorizar la aparición de hematuria macroscópica.', razon: 'Señal de ruptura de quiste que amerita reposo absoluto.' },
        { accion: 'Instruir sobre la toma diaria y registro de la presión arterial.', razon: 'El control de la HTA es la única medida probada precozmente.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
  {
    id: 'int_54_acidosismetablica',
    nombre: 'Acidosis Metabólica',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Descenso del pH por causa metabólica.',
    sintomasClave: ['Respiración de Kussmaul', 'Deterioro del nivel de conciencia', 'Hipotensión'],
    clinica: {
      signosSintomas: [
        'Respiración de Kussmaul (hiperventilación profunda and rápida para compensar el exceso de H+).',
        'Somnolencia, estupor y eventualmente coma.',
        'Hipotensión arterial y disminución del gasto cardiaco (el pH bajo deprime el miocardio).',
        'Náuseas, vómitos and dolor abdominal (común en cetoacidosis).',
        'Aliento cetónico (en cetoacidosis diabética).'
      ],
      maniobraExploracion: 'Evaluación del patrón respiratorio; monitorización hemodinámica; búsqueda de signos de hipovolemia (mucosas secas); evaluación del estado de conciencia.',
      banderasRojas: [
        'pH < 7.10 (Riesgo de arritmias ventriculares y shock refractario).',
        'Kussmaul agotado (Riesgo de parada respiratoria).',
        'Deterioro neurológico agudo.',
        'Hiperpotasemia grave asociada.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Acidosis Metabólica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Acidosis Metabólica es un estado clínico caracterizado por un pH arterial bajo (< 7.35) debido a un descenso del bicarbonato (HCO3-). El evento disparador es la acumulación de ácidos orgánicos (como láctico o cetoácidos) o la pérdida excesiva de bicarbonato (por diarrea o fallo renal), lo que desborda los sistemas de amortiguación del cuerpo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Respuesta Pulmonar (Respiración de Kussmaul):** En minutos, el pulmón intenta eliminar el ácido en forma de CO2, disparando una respiración profunda y rápida para "lavar" el gas y subir el pH.
- **El Intercambio Celular:** Para intentar limpiar la sangre, las células meten protones (H+) al interior y sacan Potasio (K+), lo que frecuentemente causa una hiperpotasemia secundaria peligrosa.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** El exceso de ácido "aturde" al corazón, disminuyendo la fuerza de contracción y causando una vasodilatación arterial que lleva al shock refractario.
- **Sistema Respiratorio:** Fatiga extrema de los músculos respiratorios por el esfuerzo de compensación, pudiendo derivar en fallo respiratorio súbito.
- **Sistema Óseo:** En acidosis crónica, el cuerpo usa el calcio de los huesos para amortiguar el ácido, provocando debilidad ósea severa.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Anión GAP (Brecha Aniónica):** Es la herramienta maestra para el diagnóstico. Un GAP elevado indica que el cuerpo está fabricando ácidos nuevos (Sepsis, Cetoacidosis), mientras que un GAP normal indica pérdida de bicarbonato.
- **Curva de Disociación de la Hemoglobina:** Se desplaza a la derecha, facilitando que el oxígeno llegue a los tejidos pero dificultando su captura en el pulmón.

### Correlación con Comorbilidades:
- **Diabetes Tipo 1:** La falta de insulina obliga al cuerpo a quemar grasas, produciendo cetoácidos que disparan una de las acidosis más graves (Cetoacidosis Diabética).
- **Shock Séptico:** La falta de oxígeno en los tejidos obliga a las células a trabajar sin aire, produciendo Ácido Láctico, el marcador de gravedad por excelencia en cuidados críticos.`,
      esquemaMental: {
        inicio: "Acumulación de ácidos o pérdida de bicarbonato.",
        dano: "Disminución del pH sistémico y alteración de enzimas proteicas.",
        consecuencia: "Depresión miocárdica y fallo multiorgánico si no se compensa."
      },
      cita: "Harrison, Principios de Medicina Interna"
    },
    manejo: {
      diagnostico: 'Gasometría arterial (pH, HCO3-, pCO2). Electrolitos séricos (Anion Gap). Lactato sérico. Cetonas.',
      tratamiento: 'Tratamiento de la causa base. Bicarbonato de sodio (si pH < 7.1). Hemodiálisis si falla renal.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Bicarbonato de Sodio 8.4%', dosis: 'Según déficit de bases/fórmula', frecuencia: 'Infusión lenta', observaciones: 'Solo en acidosis severa (pH < 7.1) o intoxicaciones específicas. Vigilar hipocalcemia.' },
          { nombre: 'Insulina Rápida', dosis: '0.1 UI/kg/h (infusión)', frecuencia: 'Continua', observaciones: 'En cetoacidosis diabética. Requiere control horario de glucemia y potasio.' },
          { nombre: 'Cristaloides (Ringer Lactato)', dosis: 'Según estado de choque', frecuencia: 'Bolo inicial', observaciones: 'Resucitación volémica en sepsis o deshidratación severa.' }
        ],
        medidasGenerales: [
          'Identificación y tratamiento agresivo de la causa base (Sepsis, Cetoacidosis, Toxinas).',
          'Asegurar ventilación adecuada para permitir la compensación respiratoria.',
          'Monitorización hemodinámica invasiva en casos de shock refractario.'
        ]
      },
      monitoreo: {
        parametros: [
          'Gasometría arterial/venosa seriada (cada 2-4 horas).',
          'Cierre del Anion Gap (Sodio - [Cloro + Bicarbonato]).',
          'Niveles de Potasio (riesgo de hipopotasemia durante la corrección del pH).'
        ],
        signosAlerta: [
          'Fatiga de los músculos respiratorios (cese de la respiración de Kussmaul).',
          'Arritmias ventriculares o ensanchamiento del QRS.',
          'Hipotensión que no responde a líquidos.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'pH arterial > 7.30 y Bicarbonato > 18 mEq/L.',
          'Resolución de la causa desencadenante.',
          'Estabilidad del nivel de conciencia.'
        ],
        criteriosFracaso: [
          'Instauración de acidosis mixta (metabólica + respiratoria).',
          'Fallo multiorgánico progresivo.'
        ]
      },
      cita: 'Surviving Sepsis Campaign Guidelines'
    },
    enfermeria: {
      nanda: '00030 Deterioro del intercambio de gases / 00027 Déficit de volumen de líquidos',
      intervenciones: [
        { accion: 'Monitorizar estrechamente el patrón respiratorio.', razon: 'La fatiga de los músculos respiratorios por compensación mantenida puede llevar a acidosis respiratoria añadida.' },
        { accion: 'Vigilar los niveles de Potasio tras iniciar tratamiento.', razon: 'La corrección de la acidosis puede causar hipopotasemia severa por entrada de potasio a la célula.' },
        { accion: 'Controlar el balance de líquidos y electrólitos.', razon: 'Guía la terapia de resucitación y evita sobrecargas.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_55_alcalosismetablica',
    nombre: 'Alcalosis Metabólica',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Aumento del pH por retención de bases.',
    sintomasClave: ['Parestesias', 'Tetania (espasmos musculares)', 'Hipoventilación'],
    clinica: {
      signosSintomas: [
        'Tetania: Espasmos carpopedales, parestesias peribucales (asociado a hipocalcemia secundaria).',
        'Debilidad muscular profunda (cuando hay hipopotasemia asociada).',
        'Hipoventilación (compensación respiratoria para retener CO2).',
        'Irritabilidad neurológica and confusión.',
        'Arritmias cardiacas (especialmente si hay hipopotasemia).'
      ],
      maniobraExploracion: 'Signo de Chvostek (espasmo facial al percutir nervio facial); Signo de Trousseau (espasmo carpiano tras inflar manguito de TA); evaluación de la fuerza muscular.',
      banderasRojas: [
        'Crisis convulsivas.',
        'Tetania severa con laringoespasmo.',
        'Arritmias ventriculares fatales.',
        'Hipoventilación severa con hipoxemia.',
        'pH > 7.60'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Alcalosis Metabólica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Alcalosis Metabólica es un trastorno caracterizado por un pH arterial elevado (> 7.45) debido a un aumento del bicarbonato (HCO3-). El evento disparador suele ser la pérdida masiva de ácidos gástricos (vómitos) o una pérdida urinaria excesiva de protones, lo que deja al bicarbonato sin oposición en la sangre.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Compresación Pulmonar Ineficiente:** El cuerpo intenta retener CO2 para bajar el pH, respirando más lento (hipoventilación). Sin embargo, esto es limitado porque el cuerpo no puede dejar de respirar sin quedarse sin oxígeno.
- **El Secuestro de Electrolitos:** El pH alcalino obliga a las proteínas de la sangre a soltar protones y atrapar Calcio, lo que reduce el calcio libre y causa espasmos musculares.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Neuromuscular:** Debido a la caída del calcio libre, el paciente sufre de Tetania (contracciones musculares dolorosas), parestesias (hormigueo) y reflejos exagerados.
- **Sistema Cardiovascular:** Aumento de la excitabilidad cardiaca, con alto riesgo de arritmias auriculares y ventriculares refractarias.
- **Estado Mental:** Confusión, letargia y en casos severos, coma alcalótico.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Cloro Urinario:** Es el dato clave para el manejo. Si el Cloro es bajo, significa que la alcalosis se cura con "Suero Salino" (sensible a Cloro); si el Cloro es alto, sugiere una enfermedad de las glándulas suprarrenales.
- **Hipopotasemia:** Casi siempre acompaña a la alcalosis, ya que el cuerpo intenta tirar potasio para retener protones.

### Correlación con Comorbilidades:
- **Estenosis Pilórica / Obstrucción Intestinal Alta:** Los vómitos proyectivos de ácido clorhídrico puro son la causa clásica de "Alcalosis Metabólica Hipoclorémica".
- **Uso Crónico de Diuréticos:** Los diuréticos de asa obligan al riñón a tirar Cloro y Protones, dejando al paciente en un estado de alcalosis por contracción de volumen.`,
      esquemaMental: {
        inicio: "Pérdida de ácidos (vómitos) o ganancia de bases.",
        dano: "Aumento del pH plasmático y caída del calcio ionizado.",
        consecuencia: "Irritabilidad neuromuscular (Tetania) y arritmias."
      },
      cita: "Harrison, Principios de Medicina Interna"
    },
    manejo: {
      diagnostico: 'Gasometría arterial. Cloro urinario. Niveles séricos de Calcio y Potasio.',
      tratamiento: 'Infusión de Solución Salina (si cloro-sensible). Reposición de Potasio.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Solución Salina 0.9%', dosis: 'Según estado de volemia', frecuencia: 'Infusión continua', observaciones: 'De elección para alcalosis metabólica cloro-sensible (ej. por vómitos).' },
          { nombre: 'Cloruro de Potasio (KCl)', dosis: 'Según déficit', frecuencia: 'VO o IV', observaciones: 'La hipopotasemia mantiene la alcalosis; su corrección es fundamental para la recuperación.' },
          { nombre: 'Acetazolamida', dosis: '250-500 mg', frecuencia: 'Diaria o cada 12h', observaciones: 'Diurético inhibidor de la anhidrasa carbónica; aumenta la excreción de bicarbonato.' }
        ],
        medidasGenerales: [
          'Tratamiento de la causa desencadenante (antieméticos, ajuste de diuréticos).',
          'Vigilancia de la compensación respiratoria (hipoventilación).',
          'Evitar administración excesiva de bicarbonato o citratos.'
        ]
      },
      monitoreo: {
        parametros: [
          'pH y Bicarbonato sérico seriados.',
          'Niveles de Cloro urinario (para evaluar respuesta al tratamiento).',
          'Calcio iónico (riesgo de tetania por alcalosis).'
        ],
        signosAlerta: [
          'Signos de tetania (Chvostek o Trousseau positivos).',
          'Arritmias cardiacas (especialmente si hay hipopotasemia severa).',
          'Depresión respiratoria significativa.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'pH arterial entre 7.35 y 7.45.',
          'Bicarbonato en rango normal.',
          'Resolución de la hipopotasemia asociada.'
        ],
        criteriosFracaso: [
          'Alcalosis severa persistente (pH > 7.55) con riesgo de convulsiones.',
          'Insuficiencia respiratoria por hipoventilación compensatoria excesiva.'
        ]
      },
      cita: 'Current Opinion in Nephrology and Hypertension, Treatment of Metabolic Alkalosis'
    },
    enfermeria: {
      nanda: '00308 Riesgo de compromiso de la función cardiovascular / 00155 Riesgo de caídas',
      intervenciones: [
        { accion: 'Monitorizar signos de tetania (Chvostek/Trousseau).', razon: 'Detección temprana de hipocalcemia iónica por alcalosis.' },
        { accion: 'Vigilar la mecánica respiratoria.', razon: 'La compensación respiratoria reduce la ventilación y puede causar hipoxia.' },
        { accion: 'Administrar la terapia intravenosa con cautela.', razon: 'Asegurar la reposición de cloro y potasio según indicación.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_57_obstruccinurinaria',
    nombre: 'Obstrucción Urinaria',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Falla pre o post renal aguda.',
    sintomasClave: ['Anuria o cambios súbitos en la diuresis', 'Dolor suprapúbico', 'Globo vesical'],
    clinica: {
      signosSintomas: [
        'Anuria o fluctuaciones importantes en el volumen urinario.',
        'Dolor suprapúbico intenso (en obstrucción baja).',
        'Sensación de vaciado incompleto y tenesmo vesical.',
        'Signos de uremia si la obstrucción es crónica y bilateral.',
        'Fiebre en caso de infección sobreañadida.'
      ],
      maniobraExploracion: 'Percusión suprapúbica (identificar globo vesical matidez); tacto rectal (evaluar próstata); palpación bimanual abdominal.',
      banderasRojas: [
        'Globo vesical doloroso y tenso.',
        'Fiebre y signos de sepsis.',
        'Insuficiencia renal aguda de origen post-renal.',
        'Dolor lumbar intenso refractario a analgesia.'
      ],
      cita: 'Campbell-Walsh-Wein Urology, Urinary Tract Obstruction'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Obstrucción Urinaria es la interrupción del flujo libre de orina en cualquier nivel, desde los cálices renales hasta el meato uretral. El evento disparador es un impedimento mecánico (litos, tumores, hiperplasia prostática) o funcional que genera una contrapresión masiva hacia el riñón.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Aumento de la Presión Intratubular:** La orina estancada aumenta la presión dentro de los túbulos renales, lo que detiene la filtración glomerular efectiva.
- **Hipoperfusión Renal:** La presión elevada comprime los vasos sanguíneos renales, causando isquemia y daño a las células tubulares.
- **Inflamación y Fibrosis:** Si la obstrucción persiste por más de 72 horas, se desencadena una cascada de fibrosis que puede llevar a la pérdida irreversible de la función renal.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Desarrollo de Hidronefrosis. El riñón pierde su capacidad de concentrar la orina y excretar ácidos.
- **Sistema Cardiovascular:** La retención de agua y sodio secundaria a la obstrucción dispara la tensión arterial y puede causar edema pulmonar.
- **Sistema Inmune:** El estasis urinario es el caldo de cultivo ideal para bacterias, transformando la obstrucción en una Urosepsis (emergencia de vida o muerte).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Eje RAA:** Se activa violentamente debido a la isquemia renal provocada por la presión retrógrada.
- **Urea y Creatinina:** Se elevan rápidamente en sangre (Insuficiencia Renal Post-renal) al no poder ser excretadas.

### Correlación con Comorbilidades:
- **Hiperplasia Prostática Benigna:** Es la causa número uno en hombres mayores, provocando obstrucción a la salida de la vejiga.
- **Cáncer de Cérvix / Recto:** El crecimiento de tumores pélvicos puede comprimir los uréteres de forma externa, causando obstrucción bilateral silenciosa.`,
      esquemaMental: {
        inicio: "Bloqueo mecánico o funcional del flujo urinario.",
        dano: "Aumento de la presión retrógrada e isquemia del parénquima.",
        consecuencia: "Insuficiencia renal post-renal e hidronefrosis."
      },
      cita: "Campbell-Walsh-Wein Urology"
    },
    manejo: {
      diagnostico: 'Ecografía renal/vesical. Sonda Foley (obstrucción baja). TC abdominopélvico.',
      tratamiento: 'Descompresión inmediata (cateterismo vesical o nefrostomía). Manejo del dolor.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Ketorolaco / Metamizol', dosis: '30 mg / 1-2 g', frecuencia: 'Cada 8 horas IV', observaciones: 'Alivio del dolor agudo por distensión del sistema colector.' },
          { nombre: 'Tamsulosina', dosis: '0.4 mg', frecuencia: 'Cada 24 horas', observaciones: 'Si la causa es hiperplasia prostática benigna; facilita el flujo uretral.' },
          { nombre: 'Ceftriaxona', dosis: '1 g', frecuencia: 'Cada 24 horas IV', observaciones: 'Solo si hay evidencia o sospecha fuerte de infección sobreañadida.' }
        ],
        medidasGenerales: [
          'Cateterismo vesical inmediato si hay globo vesical.',
          'Nefrostomía percutánea o catéter Doble J en obstrucciones persistentes altas.',
          'Vigilancia de la poliuria post-obstructiva (puede ser masiva).'
        ]
      },
      monitoreo: {
        parametros: [
          'Gasto urinario horaria tras la descompresión.',
          'Niveles de Creatinina y Nitrógeno Ureico séricos.',
          'Balance hídrico estricto.'
        ],
        signosAlerta: [
          'Anuria persistente tras descompresión (falla renal intrínseca).',
          'Fiebre y signos de choque séptico.',
          'Desequilibrio hidroelectrolítico severo por poliuria.'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Recuperación de la diuresis normal.',
          'Descenso de los niveles de azoados.',
          'Resolución del dolor y de la hidronefrosis ecográfica.'
        ],
        criteriosFracaso: [
          'Pérdida irreversible de la función renal ipsilateral.',
          'Sepsis de origen urinario no controlada.'
        ]
      },
      cita: 'GPC Manejo de la Insuficiencia Renal Aguda Postrenal'
    },
    enfermeria: {
      nanda: '00023 Retención urinaria / 00132 Dolor agudo',
      intervenciones: [
        { accion: 'Realizar sondaje vesical bajo técnica estéril.', razon: 'Alivio inmediato de la retención urinaria baja y prevención de daño renal retrógrado.' },
        { accion: 'Monitorizar la diuresis tras la descompresión.', razon: 'Evitar y vigilar la poliuria post-obstructiva (riesgo de deshidratación).' },
        { accion: 'Valorar la intensidad del dolor antes and después de vaciar la vejiga.', razon: 'Confirmar la efectividad de la descompresión.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_58_nefropatadiabtica',
    nombre: 'Nefropatía Diabética',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Daño microvascular renal.',
    sintomasClave: ['Albuminuria/Microalbuminuria', 'Edema progresivo', 'Antecedente de Diabetes Mellitus'],
    clinica: {
      signosSintomas: [
        'Albuminuria persistente (>30 mg/día) o proteinuria franca.',
        'Edema progresivo en extremidades inferiores.',
        'Hipertensión arterial progresiva y difícil de controlar.',
        'Fatiga y palidez (anemia por déficit de EPO en estadios avanzados).',
        'Disminución del filtrado glomerular con el tiempo.'
      ],
      maniobraExploracion: 'Determinación de la relación Albúmina/Creatinina en orina al azar (UACR). Examen de fondo de ojo (la retinopatía diabética correlaciona con la nefropatía). Búsqueda de edema residual.',
      banderasRojas: [
        'Progresión rápida a síndrome nefrótico.',
        'Hematuria macroscópica (Sugiere daño glomerular no diabético añadido).',
        'Pérdida rápida de la agudeza visual.',
        'Oliguria.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Nefropatía Diabética'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Nefropatía Diabética es la complicación renal microvascular crónica de la Diabetes Mellitus. El evento disparador es la hiperglucemia persistente, que intoxica las células renales y genera productos de glicación avanzada (AGEs) que dañan permanentemente la arquitectura del glomérulo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Hiperfiltración Inicial:** Al principio, el riñón filtra "de más" para intentar eliminar el exceso de glucosa, lo que agota a las nefronas.
- **Pérdida de Células (Podocitos):** Las células que sostienen el filtro renal se mueren, dejando pasar la albúmina (proteína) a la orina.
- **Cicatrización (Glomeruloesclerosis):** El glomérulo se llena de tejido fibroso (nódulos de Kimmelstiel-Wilson), volviéndose una estructura inerte e incapaz de filtrar.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Proteinuria progresiva que evoluciona a Síndrome Nefrótico. Finaliza en Insuficiencia Renal Terminal.
- **Sistema Cardiovascular:** El daño renal acelera la aterosclerosis en todo el cuerpo, disparando el riesgo de infarto al miocardio y ECV.
- **Sistema Retiniano:** Existe una correlación casi total entre el daño renal y el daño en la retina (Retinopatía Diabética); el paciente pierde la visión a la par que la función renal.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **TGF-Beta:** Es la citoquina clave que ordena al riñón cicatrizar en lugar de funcionar.
- **Estrés Oxidativo:** La glucosa alta genera radicales libres que "queman" las membranas celulares del riñón.

### Correlación con Comorbilidades:
- **Hipertensión Arterial:** Es tanto causa como consecuencia; la presión alta destruye los vasos dañados por el azúcar, creando un círculo vicioso de daño renal acelerado.
- **Obesidad:** El exceso de peso aumenta la carga de trabajo de las nefronas restantes, acelerando su destrucción.`,
      esquemaMental: {
        inicio: "Hiperglucemia crónica y estrés oxidativo glomerular.",
        dano: "Glomeruloesclerosis nodular y aumento de la permeabilidad basal.",
        consecuencia: "Proteinuria masiva e insuficiencia renal terminal."
      },
      cita: "ADA Standards of Care in Diabetes"
    },
    manejo: {
      diagnostico: 'Albuminuria (UACR). Estimación de TFG (eGFR). Evaluación de retinopatía.',
      tratamiento: 'Control glucémico (HbA1c <7%). Control de TA (IECA/ARAII). iSGLT2.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Dapagliflozina / Empagliflozina (iSGLT2)', dosis: '10 mg', frecuencia: 'Diaria', observaciones: 'Fármaco de elección por su potente efecto nefroprotector y reducción de albuminuria.' },
          { nombre: 'Enalapril / Micardis (ARA II)', dosis: 'Dosis máxima tolerada', frecuencia: 'Cada 24 horas', observaciones: 'Efecto antiproteinúrico; pilar del tratamiento.' },
          { nombre: 'Finerenona', dosis: '10-20 mg', frecuencia: 'Diaria', observaciones: 'Antagonista mineralocorticoide no esteroideo; reduce la progresión en nefropatía diabética.' }
        ],
        medidasGenerales: [
          'Control estricto de la glucemia y hemoglobina glicosilada (< 7%).',
          'Restricción de sodio (< 2 g/día) y control de ingesta proteica (0.8 g/kg/día).',
          'Cese absoluto del tabaquismo (factor de progresión renal acelerado).'
        ]
      },
      monitoreo: {
        parametros: [
          'Relación albúmina/creatinina en orina (UACR) semestral.',
          'Tasa de Filtración Glomerular (eGFR).',
          'Presión arterial en domicilio (AMPA).'
        ],
        signosAlerta: [
          'Aparición de edema masivo (evolución a Síndrome Nefrótico).',
          'Empeoramiento rápido de la visión (retinopatía concurrente).',
          'Elevación súbita de la creatinina (> 30% tras iniciar IECA/iSGLT2).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Reducción de la albuminuria > 30%.',
          'Estabilización de la eGFR.',
          'TA estable < 130/80 mmHg.'
        ],
        criteriosFracaso: [
          'Progresión rápida a Enfermedad Renal Crónica terminal.',
          'Fallo de los objetivos de control metabólico y tensional.'
        ]
      },
      cita: 'ADA Standards of Care in Diabetes 2024'
    },
    enfermeria: {
      nanda: '00026 Exceso de volumen de líquidos / 00179 Riesgo de nivel de glucemia inestable',
      intervenciones: [
        { accion: 'Fomentar el control glucémico y la dieta adecuada.', razon: 'Reducir la carga de glucosa disminuye el daño microvascular renal.' },
        { accion: 'Monitorizar la TA en cada visita.', razon: 'La hipertensión acelera el daño glomerular independientemente de la glucemia.' },
        { accion: 'Instruir sobre el cuidado de los pies.', razon: 'El paciente renal diabético tiene altísimo riesgo de pie diabético por vasculopatía y neuropatía.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_59_hidronefrosis',
    nombre: 'Hidronefrosis',
    servicio: 'Medicina Interna',
    system: 'Sistema Nefrodinámico / Medio Interno',
    color: 'teal',
    definicionCaso: 'Dilatación de pelvis y cálices.',
    sintomasClave: ['Dolor lumbar sordo', 'Aumento del tamaño renal', 'Infecciones urinarias recurrentes'],
    clinica: {
      signosSintomas: [
        'Dolor lumbar sordo o intermitente (si es crónica).',
        'Cólico renal agudo (si la obstrucción es súbita por un cálculo).',
        'Masa palpable en el flanco (especialmente en niños o personas delgadas).',
        'Nauseas y vómitos asociados al dolor abdominal.',
        'Poliuria y polidipsia (si hay daño tubular crónico).'
      ],
      maniobraExploracion: 'Puñopercusión lumbar (Giordano) positiva. Palpación abdominal bimanual buscando hidronefrosis gigante. Evaluación del globo vesical si la causa es baja.',
      banderasRojas: [
        'Fiebre y puñopercusión positiva (Pielonefritis obstructiva).',
        'Fallo renal agudo (especialmente en riñón único).',
        'Anuria súbita.',
        'Hipotensión y taquicardia (Shock séptico).'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Obstrucción del Tracto Urinario'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Hidronefrosis es la dilatación patológica del sistema colector renal (pelvis y cálices) debido a la acumulación de orina. No es una enfermedad aislada, sino la consecuencia física de una obstrucción. El evento disparador es cualquier impedimento al vaciado que obligue al parénquima renal a soportar una presión para la cual no está diseñado.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Estasis Urinaria:** La orina queda atrapada y la presión sube rápidamente.
- **Compresión Medular y Cortical:** Los cálices dilatados "aplastan" el tejido renal contra la cápsula rígida, causando isquemia local y muerte de las nefronas.
- **Fallo de la Barrera:** La distensión prolongada rompe las uniones entre las células, permitiendo que la orina se filtre hacia el intersticio, causando inflamación y fibrosis irreversible.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Renal:** Atrofia renal progresiva; el riñón se convierte eventualmente en un "saco de agua" sin función filtrante.
- **Sistema Inmune:** La orina estancada es un reservorio para infecciones recurrentes que pueden derivar en Pielonefritis Crónica.
- **Equilibrio Ácido-Base:** El daño en los túbulos impide la excreción de ácidos, llevando a Acidosis Tubular Renal.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Prostaglandinas:** Su liberación inicial busca compensar la presión aumentando el flujo, pero termina empeorando el edema del parénquima.
- **Vasopresina (ADH):** El riñón hidronefrótico pierde la capacidad de responder a la ADH, causando una orina muy diluida y pérdida de agua libre.

### Correlación con Comorbilidades:
- **Embarazo:** El útero gestante comprime los uréteres (especialmente el derecho), causando una hidronefrosis fisiológica que debe vigilarse para evitar infecciones.
- **Cálculos Coraliformes:** Piedras grandes que ocupan toda la pelvis renal, causando una hidronefrosis crónica y silenciosa que destruye el riñón sin causar el dolor típico del cólico.`,
      esquemaMental: {
        inicio: "Obstrucción del flujo urinario (Litos, tumores).",
        dano: "Dilatación de la pelvis renal y compresión del parénquima.",
        consecuencia: "Atrofia renal irreversible por presión e isquemia."
      },
      cita: "Campbell-Walsh-Wein Urology"
    },
    manejo: {
      diagnostico: 'Ecografía renal (elección inicial). TC de abdomen (localización). RM (si contraindicación TC).',
      tratamiento: 'Descompresión del sistema (Doble J o Nefrostomía). Analgesia. Tratamiento de la causa.',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Ketorolaco / Diclofenaco', dosis: '30-75 mg', frecuencia: 'Cada 8-12 horas IV/IM', observaciones: 'Alivio del dolor por distensión capsular renal.' },
          { nombre: 'Antibióticos (Ciprofloxacino / Ceftriaxona)', dosis: '400 mg IV / 1g IV', frecuencia: 'Cada 12-24 horas', observaciones: 'Solo si hay evidencia de infección (urosepsis).' },
          { nombre: 'Opiáceos (Tramadol)', dosis: '50-100 mg', frecuencia: 'Cada 8 horas PRN', observaciones: 'En caso de dolor refractario a AINES.' }
        ],
        medidasGenerales: [
          'Derivación urinaria urgente si hay fiebre, monorreno u obstrucción bilateral.',
          'Manejo de la causa de base (litotricia, cirugía prostática, resección de tumor).',
          'Hidratación monitorizada según el balance hídrico.'
        ]
      },
      monitoreo: {
        parametros: [
          'Diuresis horaria post-descompresión.',
          'Niveles de Creatinina y Electrolitos séricos.',
          'Seguimiento ecográfico de la dilatación pielocalicial.'
        ],
        signosAlerta: [
          'Fiebre y puñopercusión lumbar positiva (Pielonefritis aguda obstructiva).',
          'Oliguria persistente a pesar de la descompresión.',
          'Hipotensión arterial (sugerente de urosepsis).'
        ]
      },
      evaluacion: {
        criteriosExito: [
          'Resolución de la dilatación de la pelvis renal en ecografía.',
          'Normalización de la función renal basal.',
          'Ausencia de síntomas obstructivos.'
        ],
        criteriosFracaso: [
          'Atrofia renal progresiva e irreversible.',
          'Necesidad de derivación urinaria permanente (nefrostomía definitiva).'
        ]
      },
      cita: 'Guías EAU sobre Obstrucción Ureteral'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00004 Riesgo de infección',
      intervenciones: [
        { accion: 'Monitorizar la diuresis post-descompresión.', razon: 'Detectar poliuria por descompresión que puede causar desequilibrio hidroelectrolítico.' },
        { accion: 'Vigilancia de signos de infección urinaria.', razon: 'La estasis urinaria es un caldo de cultivo para bacterias.' },
        { accion: 'Controlar el balance hídrico estricto.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica tras liberar la obstrucción.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_60_cirrosisheptica',
    nombre: 'Cirrosis Hepática',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Fibrosis severa y nódulos de regeneración.',
    sintomasClave: ['Ictericia', 'Ascitis', 'Ginecomastia / Arañas vasculares'],
    clinica: {
      signosSintomas: [
        'Ascitis (acumulación de líquido en cavidad peritoneal).',
        'Ictericia (coloración amarillenta de piel y escleras).',
        'Estigmas hepáticos: Palma hepática, arañas vasculares (telangiectasias), ginecomastia.',
        'Esplenomegalia y circulación colateral (cabeza de medusa).',
        'Fatiga, debilidad and malnutrición.'
      ],
      maniobraExploracion: 'Maniobra de la oleada ascítica; signo del témpano (si hay ascitis masiva); palpación del borde hepático (duro, irregular o pequeño); evaluación de flapping (asterixis).',
      banderasRojas: [
        'Hemorragia por varices esofágicas (Hematemesis).',
        'Encefalopatía hepática (Desorientación, asterixis).',
        'Peritonitis bacteriana espontánea (Dolor abdominal + Fiebre).',
        'Síndrome hepatorrenal (Oliguria progresiva).',
        'Nódulo hepático sospechoso de Hepatocarcinoma.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Cirrosis Hepática'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Cirrosis Hepática es la vía final común de múltiples enfermedades crónicas del hígado. El evento disparador es una agresión persistente (alcohol, toxinas, virus como el VHB/VHC o grasa ectópica) que destruye los hepatocitos, forzando un estado de reparación continua que termina convirtiendo el órgano en un nudo de cicatrices.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Activación Estelar:** Las células estelares (que normalmente almacenan vitamina A) se activan por el daño constante y se transforman en miofibroblastos que secretan colágeno de forma incontrolable.
- **Formación de Nódulos y Fibrosis:** El tejido sano es rodeado por densas bandas de cicatriz, formando nódulos de regeneración que alteran la arquitectura normal.
- **Obstrucción Vascular:** La densa malla fibrótica estrangula los pequeños vasos sinusoidales, aumentando drásticamente la resistencia al paso de la sangre que entra por la vena porta.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Gastrointestinal (Hipertensión Portal):** La sangre "se estanca" antes de entrar al hígado, buscando rutas alternativas y creando varices gigantes en el esófago y el estómago (riesgo altísimo de sangrado mortal).
- **Sistema Nervioso (Encefalopatía):** El hígado "cicatrizado" no filtra las toxinas de la sangre (como el amoníaco que producen las bacterias intestinales), las cuales viajan al cerebro, causando confusión y coma.
- **Espacio Abdominal (Ascitis):** El aumento de presión en los vasos digestivos hace que el líquido se filtre hacia la cavidad peritoneal, inflando el abdomen como un globo.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Hipoalbuminemia:** El hígado deja de fabricar albúmina, la principal proteína de la sangre, lo que hace que los líquidos escapen más fácilmente de los vasos sanguíneos (edema masivo).
- **Trastorno de la Coagulación:** La falla hepática disminuye la producción de casi todos los factores de la coagulación, prolongando el tiempo de sangrado (INR elevado).
- **Hiperestrogenismo:** El hígado enfermo no puede degradar los estrógenos, causando ginecomastia (crecimiento de mamas), pérdida de vello y "arañas vasculares" en la piel de los hombres.

### Correlación con Comorbilidades:
- **Trombocitopenia:** El bazo se agranda por el atasco de sangre (esplenomegalia) y "se come" las plaquetas, empeorando el riesgo de sangrado.
- **Infecciones:** El líquido ascítico es un caldo de cultivo extraordinario; las bacterias del intestino pueden cruzar la pared intestinal y causar Peritonitis Bacteriana Espontánea.`,
      esquemaMental: {
        inicio: "Agresión crónica (alcohol, virus, grasa) y activación de células estelares.",
        dano: "Acumulación de colágeno, fibrosis en puentes y nódulos regenerativos.",
        consecuencia: "Hipertensión portal, ascitis e insuficiencia hepática terminal."
      },
      cita: "AASLD Practice Guidelines, Cirrhosis"
    },
    manejo: {
      diagnostico: 'Perfil hepático (Albúmina, TP/INR elevado, Bilirrubinas). Ecografía Doppler portal. Elastografía hepática (Fibroscan). Endoscopia superior (cribado de varices).',
      tratamiento: 'Abstinencia de alcohol. Diuréticos (Espironolactona + Furosemida). Betabloqueantes no selectivos (Propranolol) para prevención de sangrado. Lactulosa si hay encefalopatía.',
      cita: 'AASLD Practice Guidance on Assessing and Managing Liver Cirrhosis'
    },
    enfermeria: {
      nanda: '00026 Exceso de volumen de líquidos / 00002 Desequilibrio nutricional',
      intervenciones: [
        { accion: 'Medir el perímetro abdominal diariamente.', razon: 'Evaluación objetiva de la progresión o resolución de la ascitis.' },
        { accion: 'Vigilar sangrado en encías o sitios de punción.', razon: 'Déficit de factores de coagulación aumenta el riesgo hemorrágico.' },
        { accion: 'Restricción de sodio en la dieta.', razon: 'Fundamental para controlar la retención hídrica.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_65_hepatitisviral',
    nombre: 'Hepatitis Viral',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Infección hepática aguda/crónica.',
    sintomasClave: ['Ictericia', 'Coluria / Acolia', 'Malestar general'],
    clinica: {
      signosSintomas: [
        'Ictericia (coloración amarillenta de escleras y piel).',
        'Coluria (orina oscura como refresco de cola) and acolia (heces claras).',
        'Malestar general, mialgias and anorexia.',
        'Dolor leve en hipocondrio derecho (distensión de la cápsula de Glisson).',
        'Prurito intenso (si hay componente colestásico).'
      ],
      maniobraExploracion: 'Palpación de hepatomegalia (borde liso, doloroso); búsqueda de ictericia en conjuntivas o frenillo lingual; evaluación de adenopatías.',
      banderasRojas: [
        'Hepatitis fulminante (Trastorno del estado mental, asterixis).',
        'Prolongación del tiempo de protrombina (INR >1.5).',
        'Ictericia persistente o progresiva.',
        'Vómitos incoercibles and deshidratación.',
        'Hipoglucemia.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Hepatitis Viral Aguda'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Hepatitis Viral es la inflamación generalizada del parénquima hepático desencadenada por virus hepatotropos (A, B, C, D, E). El evento disparador no es la toxicidad intrínseca del virus, sino la infiltración del hígado por el microorganismo, que secuestra las células hepáticas para multiplicarse.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Reconocimiento y Alarma:** Las células del sistema inmunitario (especialmente los linfocitos T citotóxicos) detectan las proteínas virales en la superficie de los hepatocitos infectados.
- **La Guerra Celular:** El propio cuerpo lanza un ataque masivo contra su hígado; es este asalto inmunológico (no el virus per se) el que destruye las células hepáticas (necrosis focal).
- **El Bloqueo de la Bilis (Colestasis):** La intensa inflamación comprime los canalículos biliares impidiendo el drenaje, lo que causa la retención de bilis dentro del hígado.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Tegumentario y Ocular:** La bilis estancada pasa a la sangre y se deposita en la piel y las mucosas, originando una ictericia franca y, a menudo, un prurito desesperante.
- **Sistema Renal y Digestivo:** La bilirrubina se excreta masivamente en la orina (coluria - color Coca-Cola), mientras que las heces, al no recibir bilis, se vuelven blancas o grises (acolia).
- **Sistema Nervioso (Hepatitis Fulminante):** Si la guerra autoinmune es tan feroz que destruye casi todo el hígado, el paciente desarrolla un fallo hepático agudo con coma metabólico inminente.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Transaminasas (AST y ALT):** La muerte masiva de los hepatocitos libera estas enzimas directamente a la sangre, elevando sus valores hasta miles de unidades.
- **Bilirrubina Directa:** Aumenta en sangre al verse obstruida su salida hacia el intestino, marcando la fase sintomática de la enfermedad.

### Correlación con Comorbilidades:
- **Cronicidad y Cáncer (Virus B y C):** Si el sistema inmune no logra barrer al virus en los primeros 6 meses, la inflamación crónica empujará al hígado hacia la Cirrosis y un riesgo altísimo de desarrollar Hepatocarcinoma.
- **Coinfección D:** El virus de la Hepatitis D es un "parásito de un parásito" que necesita al virus B para existir; su presencia agrava mortalmente la hepatitis B subyacente.`,
      esquemaMental: {
        inicio: "Infección de hepatocitos por virus hepatotropo (A, B, C, D, E).",
        dano: "Ataque inmunológico masivo y necrosis celular (no daño directo del virus).",
        consecuencia: "Fallo sintético agudo, colestasis o cronicidad/cirrosis."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: 'Perfil hepático (Elevación masiva de ALT/AST, usualmente >1000 en aguda). Serología viral (Anti-VHA IgM, HBsAg, Anti-VHC). Bilirrubinas elevadas.',
      tratamiento: 'Reposo relativo. Hidratación adecuada. Evitar fármacos hepatotóxicos. Antivirales específicos si hay cronicidad (B, C) o en casos severos de B.',
      cita: 'AASLD Practice Guidelines on Viral Hepatitis'
    },
    enfermeria: {
      nanda: '00134 Náuseas / 00178 Riesgo de deterioro de la función hepática',
      intervenciones: [
        { accion: 'Monitorizar los niveles de conciencia.', razon: 'Detección temprana de encefalopatía hepática en caso de fallo fulminante.' },
        { accion: 'Mantener una dieta hipograsa y rica en carbohidratos.', razon: 'Facilitar la digestión y proporcionar energía ante el déficit sintético.' },
        { accion: 'Educar sobre las vías de transmisión.', razon: 'Prevenir contagios a familiares y personal de salud (entérica en A/E, parenteral en B/C).' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_61_hda',
    nombre: 'HDA',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Hemorragia Digestiva Alta.',
    sintomasClave: ['Hematemesis (vómito con sangre)', 'Melenas (heces negras fétidas)', 'Hipotensión y taquicardia'],
    clinica: {
      signosSintomas: [
        'Hematemesis: Sangre roja fresca o en posos de café.',
        'Melenas: Heces negras, brillantes, pegajosas y de olor fétido penetrante.',
        'Síncope o mareo ortostático (indica pérdida de volumen importante).',
        'Dolor epigástrico (si la causa es úlcera péptica).',
        'Estigmas de hepatopatía (si la causa son varices esofágicas).'
      ],
      maniobraExploracion: 'Tacto rectal (confirmar melenas); evaluación hemodinámica (TA, frecuencia cardiaca, llenado capilar); colocación de sonda nasogástrica (si se requiere evaluar sangrado activo).',
      banderasRojas: [
        'Hipotensión persistente o shock hipovolémico.',
        'Hematemesis masiva activa.',
        'Sangrado en paciente con cirrosis conocida (alta mortalidad).',
        'Hematoquecia (indica sangrado masivo con tránsito acelerado).',
        'Trastorno del estado de conciencia.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Hemorragia Gastrointestinal'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Hemorragia Digestiva Alta (HDA) es un sangrado originado en cualquier punto del tracto digestivo superior, clásicamente por encima del ángulo de Treitz (donde termina el duodeno). El evento disparador es la erosión (úlcera), la rotura mecánica (desgarros de Mallory-Weiss) o la explosión de vasos venosos distendidos (varices) bajo la mucosa.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Rotura Vascular:** Al perforarse la pared de un vaso sanguíneo arterial (sangrado a chorro) o venoso (sangrado en charco), el estómago o duodeno se inunda de sangre.
- **La Reacción Gástrica:** La sangre funciona como un irritante químico brutal para el estómago, desencadenando contracciones violentas que provocan vómitos de sangre fresca (hematemesis) o sangre pre-digerida (parecida a los posos de café).
- **Pérdida de Volumen (Hipovolemia):** De forma silenciosa pero veloz, el compartimiento intravascular se vacía, reduciendo el retorno venoso al corazón y colapsando el gasto cardíaco.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Cardiovascular:** El sistema nervioso descarga adrenalina pura para compensar la falta de sangre, provocando taquicardia inmediata y una intensa vasoconstricción periférica (piel fría y sudorosa).
- **Sistema Renal:** La falta de flujo sanguíneo al riñón causa inmediatamente oliguria (el riñón deja de producir orina para ahorrar agua) e Insuficiencia Renal Aguda prerenal.
- **Sistema Neurológico:** Al caer la presión arterial drásticamente, el cerebro se queda sin oxígeno, lo que lleva a mareos, síncope ortostático o estado de coma.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Nitrógeno Ureico en Sangre (BUN):** La sangre que avanza hacia el intestino delgado es "digerida" por las bacterias, que absorben las proteínas de los glóbulos rojos masivamente, disparando el BUN sin elevar proporcionalmente la Creatinina.
- **Metabolismo Aeróbico Roto:** La falta progresiva de glóbulos rojos empuja a los tejidos hacia el metabolismo anaerobio, generando acidosis láctica global.

### Correlación con Comorbilidades:
- **Cirrosis Hepática:** Es el escenario más temido. La HDA por rotura de varices esofágicas no se detiene sola debido al déficit de factores de coagulación del paciente crónico.
- **Consumo de AINEs:** Son los destructores por excelencia de la barrera protectora del estómago, siendo la causa número uno de úlceras sangrantes.`,
      esquemaMental: {
        inicio: "Erosión o aumento de presión en vasos sanguíneos mucosos.",
        dano: "Sangrado intraluminal masivo y pérdida aguda de volumen intravascular.",
        consecuencia: "Shock hipovolémico, hipoperfusión tisular y muerte celular."
      },
      cita: "ASGE Guidelines on Upper GI Bleeding"
    },
    manejo: {
      diagnostico: 'Endoscopia Digestiva Alta (EVDA) - Diagnóstica y terapéutica (elección dentro de las primeras 24h). BH (Hemoglobina inicial puede ser normal). Relación BUN/Creatinina elevada.',
      tratamiento: 'Resucitación con líquidos IV (Cristaloides). Transfusión de hemoderivados (meta Hb >7 g/dL). Omeprazol IV (bolo y mantenimiento). Terlipresina/Octreótide y antibióticos (si se sospechan varices).',
      cita: 'International Consensus Recommendations on the Management of Patients With Nonvariceal Upper Gastrointestinal Bleeding'
    },
    enfermeria: {
      nanda: '00028 Riesgo de déficit de volumen de líquidos / 00201 Riesgo de perfusión tisular cerebral ineficaz',
      intervenciones: [
        { accion: 'Canalizar dos vías periféricas de grueso calibre (14-16G).', razon: 'Permitir la reposición rápida de volumen y sangre si es necesario.' },
        { accion: 'Mantener al paciente en dieta absoluta (NPO).', razon: 'Preparación para el procedimiento endoscópico y riesgo de aspiración.' },
        { accion: 'Control estricto de la presión arterial y frecuencia cardiaca.', razon: 'Detección temprana de inestabilidad hemodinámica por resangrado.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_62_pancreatitisaguda',
    nombre: 'Pancreatitis Aguda',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Inflamación autolítica del páncreas.',
    sintomasClave: ['Dolor epigástrico en cinturón', 'Náuseas y vómitos', 'Elevación de Amilasa/Lipasa'],
    clinica: {
      signosSintomas: [
        'Dolor abdominal agudo, intenso, persistente, en epigastrio con irradiación a espalda (en cinturón).',
        'Náuseas y vómitos abundantes que no alivian del dolor.',
        'Distensión abdominal y disminución de ruidos hidroaéreos (íleo paralítico).',
        'Signos de Cullen (equimosis periumbilical) o Grey-Turner (equimosis en flancos) en casos graves.',
        'Fiebre, taquicardia and taquipnea (SIRS).'
      ],
      maniobraExploracion: 'Palpación abdominal (resistencia muscular, dolor generalizado); búsqueda de equimosis cutáneas; evaluación de la mecánica respiratoria (posible derrame pleural izquierdo).',
      banderasRojas: [
        'Hipotensión arterial y signos de shock (Pancreatitis grave).',
        'Dificultad respiratoria (SDRA).',
        'Oliguria o anuria (Fallo renal agudo).',
        'Trastorno del estado mental.',
        'Hipocalcemia (Signo de mal pronóstico).'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Pancreatitis Aguda'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Pancreatitis Aguda es una tormenta inflamatoria severa originada dentro del páncreas. El evento disparador (generalmente un cálculo que bloquea la salida o el consumo tóxico de alcohol) impide que los jugos pancreáticos fluyan hacia el intestino, activándolos accidentalmente dentro del propio órgano. 

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Activación Enzimática Precoz:** El tripsinógeno se transforma en tripsina dentro de las células acinares del páncreas, actuando como un "detonador" que activa a todas las demás enzimas gástricas locales.
- **Lisis Celular y Hemorragia:** Las enzimas destruyen literalmente el tejido pancreático, cortando vasos sanguíneos y "digiriendo" las reservas de grasa circundante (necrosis grasa colicuativa).
- **Estallido Sistémico (SIRS):** El páncreas destrozado libera un verdadero tsunami de citoquinas inflamatorias (Interleucinas, FNT) al torrente sanguíneo, convirtiendo un problema local en una crisis de todo el cuerpo.

### Afectación de Órganos y Sistemas Relacionados:
- **Respiratorio (Peligro de SDRA):** Las enzimas pancreáticas y citoquinas viajeras atacan los alvéolos pulmonares, provocando que se llenen de líquido y desatando el Síndrome de Distrés Respiratorio Agudo, una causa primaria de muerte vascular en la enfermedad.
- **Cardiovascular:** Las sustancias químicas vasodilatan todos los vasos del cuerpo. Simultáneamente, litros de líquido se "escapan" al tercer espacio abdominal, llevando al paciente a un grave Shock Distributivo y Eudiovolémico mezclado.
- **Renal:** El brutal secuestro de líquidos sumado a la hipotensión "seca" literalmente los riñones, generando Necrosis Tubular Aguda grave.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Lipasa y Amilasa:** La ruptura celular hace que estas enzimas se viertan a la sangre, elevándose hasta niveles 3 o 4 veces superiores de lo normal, diagnosticando el evento.
- **Hipocalcemia Mortal:** En un proceso único, las grasas necróticas deshechas por el páncreas se combinan químicamente con el Calcio de la sangre formando "jabones" cálcicos en el abdomen (Saponificación), lo que tumba el calcio sistémico precipitadamente.

### Correlación con Comorbilidades:
- **Colelitiasis (Piedras):** Es el culpable del 40-50% de los casos. Una diminuta piedra que se atore en la ampolla de Vater puede bloquear el conducto pancreático desencadenando todo el proceso mortal.
- **Triglicéridos Altos:** Niveles astronómicos (>1000 mg/dL) pueden desatar la inflamación aguda porque sus subproductos resultan altamente venenosos para las células en las que se enrutan.`,
      esquemaMental: {
        inicio: "Obstrucción biliar o toxicidad (ej. alcohol) en las células acinares.",
        dano: "Activación prematura de tripsina provocando autodigestión e inflamación masiva.",
        consecuencia: "Síndrome de Respuesta Inflamatoria Sistémica (SIRS) y fallo multiorgánico."
      },
      cita: "AGA Institute Medical Position Statement on Acute Pancreatitis"
    },
    manejo: {
      diagnostico: 'Amilasa o Lipasa (3 veces por encima del valor normal). TC de abdomen con contraste (después de 72h para evaluar necrosis). Criterios de Atlanta para severidad.',
      tratamiento: 'Resucitación agresiva con líquidos (Ringer Lactato). Analgesia potente (Opioides). Nutrición enteral temprana (si se tolera). Antibióticos solo si hay sospecha de necrosis infectada.',
      cita: 'American College of Gastroenterology Guideline: Management of Acute Pancreatitis'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00028 Riesgo de déficit de volumen de líquidos',
      intervenciones: [
        { accion: 'Controlar el balance hídrico estricto y diuresis horaria.', razon: 'La pancreatitis causa gran secuestro de líquidos en tercer espacio.' },
        { accion: 'Mantener al paciente en posición de Fowler o semifowler.', razon: 'Mejora la mecánica respiratoria y disminuye la tensión abdominal.' },
        { accion: 'Monitorizar niveles de glucemia.', razon: 'La inflamación pancreática puede causar hiperglucemia transitoria o definitiva.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_63_crohncolitisulcerosa',
    nombre: 'Crohn / Colitis Ulcerosa',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Enfermedad Inflamatoria Intestinal.',
    sintomasClave: ['Diarrea crónica (con sangre en CU)', 'Dolor abdominal recidivante', 'Pérdida de peso'],
    clinica: {
      signosSintomas: [
        'Diarrea crónica: Sanguinolenta y con tenesmo en Colitis Ulcerosa (CU).',
        'Dolor abdominal crónico: Frecuente en fosa ilíaca derecha en Crohn.',
        'Manifestaciones extraintestinales: Uveítis, eritema nodoso, artritis, colangitis esclerosante.',
        'Pérdida de peso, anemia and desnutrición.',
        'Fístulas and abscesos perianales (típico de Enfermedad de Crohn).'
      ],
      maniobraExploracion: 'Palpación abdominal (masas en Crohn); inspección anal (fístulas); evaluación de articulaciones and ojos.',
      banderasRojas: [
        'Megacolon tóxico (Dilatación colónica + Toxicidad sistémica).',
        'Perforación intestinal.',
        'Hemorragia digestiva masiva.',
        'Obstrucción intestinal completa.',
        'Fiebre alta y signos de sepsis.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Enfermedad Inflamatoria Intestinal'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Enfermedad Inflamatoria Intestinal (EII), que engloba a la Enfermedad de Crohn y la Colitis Ulcerosa (CU), es una respuesta autoinmune devastadora del tubo digestivo. El evento disparador es una pérdida de la tolerancia inmunológica a la microbiota intestinal normal (las bacterias buenas) en un huésped genéticamente predispuesto, provocando un ataque sostenido contra la propia mucosa.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Infiltración Leucocitaria:** Los linfocitos T y macrófagos invaden el revestimiento del intestino, liberando un arsenal de citoquinas (TNF-alfa) que destruyen las células epiteliales.
- **Diferencia Anatómica (Crohn vs CU):** 
  - *Colitis Ulcerosa:* El ataque es superficial (sólo mucosa) y continuo, empezando estrictamente desde el recto hacia arriba.
  - *Crohn:* El ataque es transmural (atraviesa toda la pared del intestino) y "en parches", pudiendo afectar desde la boca hasta el ano.
- **Fibrosis y Perforación:** En la CU, la mucosa se ulcera y sangra. En el Crohn, la inflamación profunda de toda la pared produce fibrosis (estrechando el intestino) y favorece la creación de túneles anormales (fístulas) hacia la piel u otros órganos.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Digestivo:** Diarrea crónica y sanguinolenta (predominante en CU), malabsorción de nutrientes (Crohn de intestino delgado) y dolor abdominal tipo cólico.
- **Sistema Musculoesquelético:** El estado inflamatorio crónico se "contagia" a las articulaciones, causando artritis periférica o espondilitis anquilosante.
- **Ojos y Piel:** Pueden aparecer Uveítis ocular, Eritema Nodoso (nódulos rojos y dolorosos en las piernas) y Pioderma Gangrenoso (úlceras cutáneas masivas).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Factor de Necrosis Tumoral (TNF-alfa):** Es el principal mensajero inflamatorio descontrolado; por ello, los anticuerpos anti-TNF son la terapia revolucionaria para detener la EII.
- **Déficit de Vitamina B12:** Si el Crohn ataca el íleon terminal (su lugar favorito), el cuerpo pierde la capacidad de absorber esta vitamina, causando Anemia Megaloblástica.

### Correlación con Comorbilidades:
- **Cáncer Colorrectal:** La inflamación y regeneración celular constante durante décadas (especialmente en la CU) dispara dramáticamente el riesgo de desarrollar tumores malignos.
- **Tabaquismo (La Gran Paradoja):** Sorprendentemente, fumar empeora drásticamente la Enfermedad de Crohn, pero extrañamente parece "proteger" o retrasar la aparición de la Colitis Ulcerosa.`,
      esquemaMental: {
        inicio: "Pérdida de tolerancia a la microbiota y activación de linfocitos T.",
        dano: "Inflamación transmural segmental (Crohn) o mucosa continua (CU).",
        consecuencia: "Úlceras sangrantes, estenosis, fístulas y riesgo oncológico."
      },
      cita: "The Lancet, Inflammatory Bowel Disease"
    },
    manejo: {
      diagnostico: 'Ileonoscopia con toma de biopsias (Estudio de elección). Calprotectina fecal (marcador de actividad inflamatoria). TC o RM (enterografía) para evaluar extensión.',
      tratamiento: 'Aminosalicilatos (5-ASA) en CU leve. Corticoides para inducción de remisión. Inmunomoduladores (Azatioprina). Terapia biológica (Anti-TNF como Infliximab). Cirugía en complicaciones.',
      cita: 'ECCO guidelines on the management of Crohn\'s disease and Ulcerative Colitis'
    },
    enfermeria: {
      nanda: '00013 Diarrea / 00002 Desequilibrio nutricional',
      intervenciones: [
        { accion: 'Valorar la frecuencia y características de las deposiciones.', razon: 'Indicar el grado de actividad de la enfermedad y riesgo de deshidratación.' },
        { accion: 'Control local de la higiene perianal.', razon: 'Prevenir irritación de la piel y monitorizar fístulas en Crohn.' },
        { accion: 'Apoyo nutricional y vigilancia de niveles de Albúmina.', razon: 'La malabsorción and inflamación crónica provocan desnutrición grave.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_64_colecistitisaguda',
    nombre: 'Colecistitis Aguda',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Inflamación de la vesícula biliar.',
    sintomasClave: ['Dolor en hipocondrio derecho', 'Signo de Murphy (+)', 'Náuseas'],
    clinica: {
      signosSintomas: [
        'Dolor abdominal agudo en hipocondrio derecho (CSB) o epigastrio.',
        'Irradiación de dolor a escápula derecha o hombro.',
        'Náuseas and vómitos.',
        'Fiebre y escalofríos.',
        'Anorexia.'
      ],
      maniobraExploracion: 'Signo de Murphy (+) (el paciente interrumpe la inspiración profunda al palpar el hipocondrio derecho); palpación de masa vesicular (en 15%); ictericia leve (si hay coledocolitiasis asociada).',
      banderasRojas: [
        'Fiebre alta y escalofríos tiritones (Sugerente de colangitis o colecistitis gangrenosa).',
        'Ictericia franca.',
        'Inestabilidad hemodinámica.',
        'Abdomen con defensa y rebote (Peritonitis biliar).'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Enfermedades de la Vesícula Biliar'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Colecistitis Aguda es la inflamación súbita de la vesícula biliar. El evento disparador en el 90-95% de los casos es puramente mecánico: un cálculo biliar (piedra de colesterol o pigmento) viaja y se enclava en el cuello de la vesícula o en el conducto cístico, sellando la única puerta de salida del órgano.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Distensión y Dolor:** Al no poder vaciarse, la bilis atrapada y las secreciones mucosas inflan la vesícula como un globo. Esta distensión brutal activa las terminaciones nerviosas, causando el dolor característico (Cólico biliar).
- **Inflamación Química e Isquemia:** La presión extrema aplasta los pequeños vasos sanguíneos de la pared vesicular, cortando el suministro de oxígeno (isquemia) y liberando enzimas que irritan químicamente el tejido (mediada por lisolecitina y prostaglandinas).
- **Infección Secundaria:** El líquido estancado en un tejido moribundo es invadido rápidamente por bacterias del intestino (como E. coli o Klebsiella), convirtiendo una inflamación química en un empiema purulento.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Gastrointestinal:** Dolor severo en el cuadrante superior derecho que empeora al comer grasas, acompañado de un íleo paralítico reflejo (detención de los movimientos intestinales) con náuseas y vómitos.
- **Sistema Peritoneal:** Cuando la pared de la vesícula inflamada roza la capa que recubre el abdomen (peritoneo parietal), se produce el Signo de Murphy (corte de la respiración al palpar).
- **Sistema Nervioso Autónomo:** El dolor visceral activa el sistema parasimpático, provocando sudoración fría y arcadas intensas.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Colecistoquinina (CCK):** Es la hormona liberada por el intestino al detectar grasa; viaja por la sangre y "exprime" la vesícula. Si el conducto está tapado, cada contracción inducida por la CCK dispara una oleada de dolor agonizante.
- **Leucocitosis y PCR:** La inflamación y posterior infección elevan agresivamente los marcadores inflamatorios y el conteo de glóbulos blancos en la sangre.

### Correlación con Comorbilidades:
- **Obesidad y Dieta Rica en Grasas:** El exceso de colesterol en la bilis (bilis litogénica) es la materia prima para la formación de las piedras.
- **Diabetes Mellitus:** Los pacientes diabéticos pueden sufrir una forma silenciosa de isquemia vesicular por daño microvascular, elevando el riesgo de "Colecistitis enfisematosa" (infección por bacterias formadoras de gas) con un alto riesgo de gangrena sin tanto dolor previo.`,
      esquemaMental: {
        inicio: "Impactación de un cálculo biliar en el conducto cístico.",
        dano: "Aumento de presión intraluminal, isquemia parietal e inflamación química.",
        consecuencia: "Infección bacteriana secundaria, posible gangrena y perforación vesicular."
      },
      cita: "Tokyo Guidelines, Management of Acute Cholecystitis"
    },
    manejo: {
      diagnostico: 'Ecografía de hígado and vías biliares (Engrosamiento de pared >4mm, líquido perivesicular, Murphy sonográfico). Gammagrafía HIDA (más sensible si hay duda). BH (Leucocitosis).',
      tratamiento: 'Colecistectomía laparoscópica temprana (dentro de las 72h). Ayuno (NPO). Analgesia (AINES: Ketorolaco). Antibióticos (Ceftriaxona o Levofloxacino + Metronidazol).',
      cita: 'Tokyo Guidelines 2018: management of acute cholecystitis'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00028 Riesgo de déficit de volumen de líquidos',
      intervenciones: [
        { accion: 'Monitorizar las características del dolor.', razon: 'El cambio de dolor localizado a difuso puede indicar perforación biliar.' },
        { accion: 'Controlar la aparición de ictericia y coluria.', razon: 'Sugiere coledocolitiasis o colangitis obstructiva asociada.' },
        { accion: 'Fomentar el reposo gástrico.', razon: 'Disminuir la estimulación colecistoquinética y el dolor.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_66_ascitis',
    nombre: 'Ascitis',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Acumulación de líquido libre intraperitoneal.',
    sintomasClave: ['Aumento del perímetro abdominal', 'Oleada ascítica (+) / Matidez desplazable', 'Disnea'],
    clinica: {
      signosSintomas: [
        'Aumento marcado del contorno abdominal (abdomen en batracio).',
        'Disnea (por elevación del diafragma en ascitis a tensión).',
        'Edema de extremidades inferiores.',
        'Hernias umbilicales o inguinales (por aumento de presión intraabdominal).',
        'Saciedad precoz.'
      ],
      maniobraExploracion: 'Percusión abdominal buscando matidez desplazable; signo de la oleada ascítica; maniobra del témpano (para palpar órganos sumergidos); medición del perímetro abdominal.',
      banderasRojas: [
        'Fiebre y dolor abdominal difuso (Peritonitis bacteriana espontánea).',
        'Deterioro agudo de la función renal (Síndrome hepatorrenal).',
        'Ascitis a tensión con compromiso respiratorio.',
        'Hipotensión arterial.',
        'Trastorno del estado de alerta.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Ascitis'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Ascitis es la acumulación patológica de líquido libre dentro de la cavidad peritoneal del abdomen. En el 80-85% de los casos, es la complicación cardinal de la Cirrosis Hepática (Ascitis Portal). El evento disparador no es un problema del abdomen, sino una falla hidráulica masiva originada en el tejido cicatrizado del hígado.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **El Muro Hepático (Hipertensión Portal):** La cicatrización del hígado obliga a la sangre que viene de los intestinos (Vena Porta) a chocar contra un "muro" de alta resistencia, disparando la presión dentro de esta gran vena.
- **Vasodilatación Esplácnica Súbita:** Para compensar esta presión, los vasos sanguíneos de los intestinos se dilatan masivamente mediante la producción de Óxido Nítrico (NO), volviéndose sumamente porosos.
- **La Trasudación:** Debido a los "vasos abiertos" y la falta de "cemento" (hipoalbuminemia, ya que el hígado no fabrica albúmina), el plasma sanguíneo abandona las venas y "suda" hacia el espacio vacío del abdomen, formando un lago de líquido ascítico.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Respiratorio:** Decenas de litros de agua en el abdomen empujan el diafragma hacia arriba, aplastando los pulmones y obligando al paciente a respirar corto y rápido (Dificultad Respiratoria Restrictiva).
- **Sistema Excretor (Riñón Engañado):** Como tanto líquido se ha escapado al abdomen, las arterias principales del cuerpo están "vacías". El riñón detecta esta falta de volumen y, desesperado por subir la presión, retiene todo el sodio y el agua posible, empeorando el problema (creando un círculo vicioso).
- **Sistema Inmunitario (PBE):** El líquido acumulado es un caldo de cultivo. Las bacterias del intestino logran cruzar la pared gástrica hacia este líquido (Translocación Bacteriana), causando Peritonitis Bacteriana Espontánea.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Eje Renina-Angiotensina-Aldosterona (RAA):** Este sistema de supervivencia está falsamente encendido al máximo, obligando al cuerpo a no orinar casi nada de sodio, acumulando agua a la fuerza.
- **Gradiente Albúmina Suero-Ascitis (GASA):** Al restar la albúmina del líquido a la albúmina de la sangre central, si el número es mayor a 1.1 g/dL, confirma matemáticamente que la causa central es la Hipertensión Portal empujando líquido puro, no una infección exudativa o un cáncer.

### Correlación con Comorbilidades:
- **Síndrome Hepatorrenal:** La máxima expresión del fallo sistémico. El riñón, tras tanto recibir señales simuladas de que "no hay sangre", se constriñe hasta fallar por completo (Oliguria Terminal), a pesar de que el riñón en sí mismo está anatómicamente sano.`,
      esquemaMental: {
        inicio: "Hipertensión portal y vasodilatación patológica esplácnica (Óxido Nítrico).",
        dano: "Caída del volumen arterial efectivo y trasudación masiva hacia el peritoneo.",
        consecuencia: "Retención extrema de sodio/agua (RAA) y ascitis a tensión."
      },
      cita: "EASL Clinical Practice Guidelines for the Management of Patients with Decompensated Cirrhosis"
    },
    manejo: {
      diagnostico: 'Ecografía abdominal (detecta volúmenes pequeños). Paracentesis diagnóstica (conteo celular, cultivo, GASA [Gradiente Albúmina Suero-Ascitis]). Albúmina sérica.',
      tratamiento: 'Restricción de sodio (<2g/día). Diuréticos (Espironolactona y Furosemida). Paracentesis evacuadora (si hay ascitis a tensión; reponer albúmina si >5L). Manejo de la causa base.',
      cita: 'AASLD Practice Guidance on the Management of Adult Patients with Ascites Due to Cirrrhosis'
    },
    enfermeria: {
      nanda: '00026 Exceso de volumen de líquidos / 00132 Dolor agudo',
      intervenciones: [
        { accion: 'Pesar al paciente diariamente en ayunas.', razon: 'Control más sensible de la retención de líquidos y eficacia del tratamiento diurético.' },
        { accion: 'Posición de semifowler.', razon: 'Aliviar la presión sobre el diafragma y facilitar la expansión pulmonar.' },
        { accion: 'Vigilar el balance de líquidos y electrólitos séricos.', razon: 'Riesgo de hiponatremia and fallo renal por uso de diuréticos o paracentesis masiva.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_67_erge',
    nombre: 'ERGE',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Enfermedad por Reflujo Gastroesofágico.',
    sintomasClave: ['Pirosis (ardor retroesternal)', 'Regurgitación ácida', 'Tos crónica / Ronquera'],
    clinica: {
      signosSintomas: [
        'Pirosis: Sensación de ardor que asciende desde el epigastrio hacia el cuello.',
        'Regurgitación: Retorno del contenido gástrico a la boca sin esfuerzo.',
        'Disfagia o dolor torácico no cardiaco.',
        'Síntomas extraesofágicos: Tos crónica, laringitis, asma exacerbao por reflujo.',
        'Erosión del esmalte dental.'
      ],
      maniobraExploracion: 'Evaluación de la faringe (eritema laringeo); búsqueda de sibilancias; inspección dental.',
      banderasRojas: [
        'Disfagia progresiva and marcada (Sugerente de estenosis o cáncer).',
        'Odinofagia intensa.',
        'Pérdida de peso involuntaria.',
        'Anemia o sangrado digestivo.',
        'Vómitos persistentes.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Enfermedad por Reflujo Gastroesofágico'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Reflujo Gastroesofágico (ERGE) es el escape crónico y patológico del contenido corrosivo del estómago hacia el esófago. El evento disparador no es la acidez en sí misma, sino el fallo mecánico de la válvula de seguridad: el Esfínter Esofágico Inferior (EEI). Esta compuerta pierde presión, se relaja en momentos inapropiados o sufre un cambio anatómico como una hernia de hiato.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Invasión Ácida:** El jugo gástrico y biliar asciende a un órgano diseñado para pH neutro. El ácido quema físicamente las capas superficiales del epitelio esofágico.
- **Esofagitis y Cicatrización:** El daño recurrente detona inflamación (esofagitis); con los meses y años, la formación repetida de úlceras y tejido cicatrizal restringe el diámetro del tubo, causando estenosis (estrechez peptica).
- **Adaptación Celular (Esófago de Barrett):** En un intento desesperado de sobrevivir al baño de ácido, el cuerpo transmuta su tejido para que se parezca al del intestino (Metaplasia), lo que lamentablemente abre la puerta a mutaciones cancerígenas.

### Afectación de Órganos y Sistemas Relacionados:
- **Tracto Digestivo:** Ardor profundo retroesternal (pirosis), con dificultad al paso del alimento sólido al final del esófago por anillos cicatrizales (disfagia).
- **Sistema Respiratorio / Laringe:** Al dormir, las micro-gotas de ácido ocluyen las cuerdas vocales o caen en el árbol bronquial, ocasionando disfonía matutina, tos nocturna incontrolable por irritación vagal e incluso desencadenando crisis espásticas en pacientes asmáticos.
- **Sistema Dental:** El vapor nocivo del ácido llega hasta la boca durante la noche y debilita progresivamente el esmalte de los dientes posteriores.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **La Saliva y el Aclaramiento:** En ERGE severo, se agotan rápidamente el moco protector y la reserva de bicarbonato originados en la deglución de la saliva (nuestro supresor ácido endógeno), desprotegiendo abrumadoramente la mucosa de un choque térmico y corrosivo recurrente.

### Correlación con Comorbilidades:
- **Obesidad y Gestación:** Exceso de presión mecánica intrabdominal. La panza literalmente estruja el estómago obligando a que el ácido ascienda contra el débil esfínter, amplificando todas las manifestaciones.`,
      esquemaMental: {
        inicio: "Hipotensión o relajación transitoria aberrante del Esfínter Esofágico Inferior.",
        dano: "Quemadura física y química del epitelio escamoso esofágico por ácido y bilis.",
        consecuencia: "Inflamación esofágica ulcerativa, cicatrización esteonótica y Esófago de Barrett."
      },
      cita: "The New England Journal of Medicine, Gastroesophageal Reflux Disease"
    },
    manejo: {
      diagnostico: 'Clínico (prueba terapéutica con IBP). Endoscopia superior (si hay banderas rojas o falta de respuesta). pH-metría de 24 horas (gold standard diagnóstica). Manometría esofágica.',
      tratamiento: 'Modificación del estilo de vida (dieta, evitar decúbito postprandial, bajar de peso). Inhibidores de la Bomba de Protones (Omeprazol, Pantoprazol). Antiácidos o alginatos de rescate.',
      cita: 'ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease'
    },
    enfermeria: {
      nanda: '00134 Náuseas / 00126 Conocimientos deficientes',
      intervenciones: [
        { accion: 'Instruir sobre no acostarse hasta 3 horas después de comer.', razon: 'Reducir la presión del contenido gástrico sobre el EEI por gravedad.' },
        { accion: 'Recomendar elevar la cabecera de la cama 15-20 cm.', razon: 'Disminuir el reflujo nocturno y prevenir microaspiraciones.' },
        { accion: 'Educar sobre evitar irritantes (cafeína, grasas, chocolate, tabaco).', razon: 'Estos factores disminuyen la presión del EEI o aumentan la secreción ácida.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_68_ulcerapptica',
    nombre: 'Ulcera Péptica',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Lesión de la mucosa gástrica/duodenal.',
    sintomasClave: ['Dolor epigástrico ardiente', 'Relación con ingesta de alimentos', 'Ardor'],
    clinica: {
      signosSintomas: [
        'Dolor urente (ardor) en epigastrio.',
        'Dolor postprandial (típico de úlcera gástrica) o dolor que calma con la comida (típico de úlcera duodenal).',
        'Náuseas y plenitud postprandial.',
        'Hambre dolorosa nocturna.',
        'Eructos y pirosis.'
      ],
      maniobraExploracion: 'Palpación de epigastrio (dolor a la presión profunda); búsqueda de signos de anemia (palidez de conjuntivas).',
      banderasRojas: [
        'Abdomen agudo (dolor súbito e intenso suggestivo de perforación).',
        'Hematemesis o melenas (Hemorragia digestiva).',
        'Vómitos persistentes (Sugerente de obstrucción del vaciamiento gástrico por cicatrización).',
        'Pérdida de peso and anorexia.',
        'Síncope.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Enfermedad Ulcerosa Péptica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Úlcera Péptica es una llaga abierta ("cráter") en el revestimiento del estómago o del duodeno. El evento disparador es la ruptura del delicado equilibrio entre las fuerzas corrosivas (Ácido Clorhídrico y Pepsina) y las defensas de la mucosa (moco, bicarbonato y prostaglandinas), generalmente orquestada por la bacteria *Helicobacter pylori* o el uso de AINEs.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Brecha en la Muralla:** *H. pylori* secreta amoníaco para sobrevivir al ácido, inflamando y debilitando la capa de moco. Los AINEs inhiben la COX-1, cortando la producción de prostaglandinas que son vitales para mantener el revestimiento.
- **La Invasión del Ácido:** Sin la capa protectora de moco y bicarbonato, el ácido quema directamente las células epiteliales.
- **La Excavación del Cráter:** La inflamación y la acidez destruyen progresivamente las capas de tejido, pasando la mucosa, muscularis mucosae y llegando hasta los vasos sanguíneos submucosos.

### Afectación de Órganos y Sistemas Relacionados:
- **Tracto Digestivo:** Dolor ardiente o punzante en el "boca del estómago" (epigastrio) que empeora con el estómago vacío y calma al comer (úlcera duodenal), o viceversa (úlcera gástrica).
- **Sistema Cardiovascular:** Si la úlcera excava hasta romper una arteria, se produce una Hemorragia Digestiva Alta, causando vómitos de sangre, heces negras y shock hipovolémico.
- **Peritoneo:** Si el cráter atraviesa completamente la pared del estómago/duodeno, el jugo gástrico y la comida se derraman en el abdomen, causando Peritonitis Química Mortal (Abdomen en tabla).

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Gastrina:** Hormona que puede estar anormalmente elevada, estimulando incesantemente a las células parietales para producir más ácido en un intento del cuerpo de compensar otras fallas digestivas.
- **Prostaglandinas E2 e I2:** Disminuidas drásticamente en el consumo de AINEs, eliminando la capacidad de las células gástricas de producir moco protector.

### Correlación con Comorbilidades:
- **Tabaquismo:** Disminuye el flujo sanguíneo hacia el estómago, impidiendo la cicatrización de la úlcera y aumentando enormemente el riesgo de perforación.
- **Cáncer Gástrico:** Las úlceras gástricas (a diferencia de las duodenales) pueden ser malignas desde el inicio o el estado inflamatorio crónico por *H. pylori* puede inducir mutaciones celulares (Adenocarcinoma gástrico o Linfoma MALT).`,
      esquemaMental: {
        inicio: "Falla de la barrera de moco/bicarbonato inducida por H. pylori o AINEs.",
        dano: "Excavación de la pared gástrica/duodenal por el ácido y la pepsina.",
        consecuencia: "Hemorragia, perforación u obstrucción del vaciamiento gástrico."
      },
      cita: "ACG Clinical Guideline, Peptic Ulcer Disease"
    },
    manejo: {
      diagnostico: 'Endoscopia Digestiva Alta (estudio de elección). Test de aliento o antígeno en heces para H. pylori. Biopsia gástrica (para descartar malignidad en úlcera gástrica).',
      tratamiento: 'Inhibidores de la Bomba de Protones (IPB). Erradicación de H. pylori (Esquema triple: IBP + Claritromicina + Amoxicilina/Metronidazol). Suspensión de AINEs. Sucralfato o bismuto como adyuvantes.',
      cita: 'ACG Clinical Guideline: Treatment of Helicobacter pylori Infection'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00134 Náuseas',
      intervenciones: [
        { accion: 'Administrar los IBPs 30-60 minutos antes del desayuno.', razon: 'Maximizar la inhibición de la bomba de protones cuando la célula parietal está más activa.' },
        { accion: 'Vigilancia de signos de sangrado (melenas).', razon: 'La hemorragia es la complicación más frecuente de la úlcera péptica.' },
        { accion: 'Educar sobre la adherencia al tratamiento antibiótico para H. pylori.', razon: 'Prevenir la resistencia bacteriana y asegurar la erradicación definitiva.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_69_obstruccinintestinal',
    nombre: 'Obstrucción Intestinal',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Interrupción física del flujo intestinal.',
    etiologia: 'Adherencias (bridas), hernias, tumores, vólvulos.',
    fisiopatologiaBasica: 'El mecanismo central es la detención del tránsito, que produce distensión masiva, isquemia, translocación bacteriana y shock.',
    complicaciones: [
        'Necrosis intestinal',
        'Peritonitis',
        'Septicemia',
        'Choque hipovolémico'
    ],
    riesgosNoTratado: [
        'Muerte por sepsis',
        'Muerte por choque',
        'Perforación intestinal'
    ],
    procedimientos: [
        'Descompresión nasogástrica (Sonda Levin)',
        'Hidratación agresiva IV',
        'Monitorización continua',
        'Estudio imagenológico'
    ],
    sintomasClave: ['Ausencia de canalización de gases y heces', 'Vómitos (biliosos o fecaloides)', 'Distensión abdominal'],
    banderasRojas: [
        'Dolor intenso y desproporcionado suggestivo de isquemia/estrangulación',
        'Fiebre y taquicardia',
        'Signos de irritación peritoneal (Rebote positivo)',
        'Hipotensión y deshidratación severa',
        'Leucocitosis marcada con acidosis láctica'
    ],
    clinica: {
      signosSintomas: [
        'Dolor abdominal tipo cólico paroxístico.',
        'Distensión abdominal progresiva.',
        'Vómitos: Tempranos y biliosos en obstrucción alta; tardíos and fecaloides en obstrucción baja.',
        'Estreñimiento absoluto (ausencia de gases y heces).',
        'Ruidos hidroaéreos de lucha (timbre metálico) o silencio abdominal (íleo).'
      ],
      maniobraExploracion: 'Inspección abdominal buscando cicatrices quirúrgicas (bridas); palpación de hernias (inguinales, crurales); tacto rectal (descartar impactación fecal o tumores rectales).',
      banderasRojas: [
        'Dolor intenso and desproporcionado (Sugerente de isquemia/estrangulación).',
        'Fiebre y taquicardia.',
        'Signos de irritación peritoneal (Rebote positivo).',
        'Hipotensión y deshidratación severa.',
        'Leucocitosis marcada con acidosis láctica.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Obstrucción Intestinal'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Obstrucción Intestinal es la interrupción física del libre flujo de alimentos, líquidos y gases a lo largo del tracto digestivo. El evento disparador primario es mecánico: tejidos cicatrizales de cirugías previas (bridas o adherencias), hernias que atrapan un segmento de intestino, o tumores que cierran la luz del tubo.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Acumulación y Distensión:** La comida, la saliva y los jugos gástricos y pancreáticos chocan contra el bloqueo, acumulándose masivamente. El intestino se infla hacia atrás ("aguas arriba") como un globo a punto de reventar.
- **Fallo Microvascular (Estrangulación):** La tensión extrema de la pared intestinal aplasta a las pequeñas venas, deteniendo la circulación. El tejido se hincha, cortando luego el flujo arterial, causando infarto e isquemia del intestino.
- **Translocación y Muerte Celular:** El tejido infartado pierde su impermeabilidad, permitiendo a las billones de bacterias intestinales cruzar directamente al torrente sanguíneo (Sepsis) o a la cavidad abdominal (Peritonitis).

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Digestivo:** Dolor cólico desesperante. Como el intestino no puede avanzar el alimento, se ve obligado a revertir el flujo violentamente (vómitos de contenido intestinal o "fecaloide").
- **Sistema Cardiovascular:** El cuerpo exuda litros de suero hacia el espacio libre de la pared abdominal inflamada ("Tercer Espacio"), robándole esa agua a la sangre. El paciente sufre un grave Shock Hipovolémico sin sangrar externamente.
- **Sistema Respiratorio:** El abdomen tenso y abultado aplasta los pulmones, dificultando enormemente la ventilación.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Desequilibrio Electrolítico:** La pérdida masiva de agua por el vómito y el secuestro en la pared intestinal arrastra Sodio, Cloro y Potasio, generando una letal Hipocalemia y Alcalosis/Acidosis Metabólica.
- **Lactato Sanguíneo:** Cuando el intestino estrangulado se queda sin oxígeno, empieza a producir ácido láctico. Un lactato elevado es una alarma roja de que una parte del intestino ha muerto y requiere cirugía inmediata.

### Correlación con Comorbilidades:
- **Cáncer de Colon:** En adultos mayores que nunca se han operado, es la causa #1 de obstrucciones bajas. El tumor crece lentamente hasta sellar el paso.
- **Fibrilación Auricular:** Puede soltar un coágulo que tape una arteria intestinal, causando una isquemia puramente vascular (No mecánica) que mata al intestino sin inflamarlo primero, pero que se presenta de modo parecido (Íleo Isquémico).`,
      esquemaMental: {
        inicio: "Bloqueo mecánico de la luz intestinal (adherencias, tumores, vólvulos).",
        dano: "Distensión luminal masiva, secuestro de líquidos e hipertensión de pared.",
        consecuencia: "Isquemia tisular vascular, translocación bacteriana y shock."
      },
      cita: "World Society of Emergency Surgery Guidelines on Bowel Obstruction"
    },
    manejo: {
      diagnostico: 'Radiografía de abdomen (niveles hidroaéreos, imagen en pilas de monedas). TC de abdomen con contraste (mejor estudio para identificar sitio and causa). Electrólitos (vigilar hipopotasemia).',
      tratamiento: 'Ayuno absoluto (NPO). Descompresión con Sonda Nasogástrica (SNG). Reposición agresiva de líquidos IV. Cirugía de urgencia si hay sospecha de compromiso vascular o causa mecánica clara.',
      cita: 'WSES guidelines for the management of acute bowel obstruction'
    },
    enfermeria: {
      nanda: '00011 Estreñimiento / 00028 Riesgo de déficit de volumen de líquidos',
      intervenciones: [
        { accion: 'Garantizar el correcto funcionamiento y permeabilidad de la SNG.', razon: 'La descompresión gástrica reduce el riesgo de aspiración y alivia la distensión.' },
        { accion: 'Control estricto de ingresos y egresos (balance hídrico).', razon: 'Prevenir el shock hipovolémico por secuestro de líquidos en luz intestinal.' },
        { accion: 'Valorar la aparición de signos de irritación peritoneal.', razon: 'Detectar de forma inmediata la perforación o isquemia intestinal.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_70_abscesoheptico',
    nombre: 'Absceso Hepático',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Acumulación de pus en el hígado.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: ['Fiebre/hipotermia', 'Taquicardia', 'Alteración del estado mental'],
      maniobraExploracion: 'Exploración física exhaustiva por sistemas.',
      banderasRojas: ['Inestabilidad hemodinámica', 'Fallo respiratorio', 'Deterioro neurológico agudo'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Absceso Hepático es la formación de una cavidad llena de pus dentro del hígado. El evento disparador es la invasión del tejido hepático por microorganismos (bacterias del tracto biliar u otros sitios, o el parásito Entamoeba histolytica) que el cuerpo no puede destruir rápidamente, optando por encapsularlos.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Invasión y Siembra:** Las bacterias viajan por la vía biliar (colangitis) o por la vena porta desde el intestino, anidando en el hígado.
- **Batalla Inmunitaria:** Los leucocitos se lanzan al sitio para fagocitar a los invasores. La muerte de millones de bacterias y neutrófilos forma el pus (material necrótico licuado).
- **Cavitación y Expansión:** El material purulento destruye el tejido y forma una cápsula fibrosa a su alrededor, creciendo y comprimiendo las estructuras hepáticas sanas.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Hepático:** El dolor se focaliza en el hipocondrio derecho por el estiramiento violento de la cápsula de Glisson (la piel del hígado).
- **Sistema Respiratorio:** Al expandirse, el absceso empuja el hemidiafragma derecho hacia arriba, causando dolor pleurítico, atelectasias pulmonares basales e incluso derrame pleural reactivo.
- **Sistema Cardiovascular y Sistémico:** Picos febriles altísimos y escalofríos, al volcarse toxinas al torrente sanguíneo que intentan desencadenar una respuesta pirogénica central.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Leucocitosis y Reactantes de Fase Aguda:** Elevación extrema de glóbulos blancos, Proteína C Reactiva y Procalcitonina por el estado de sepsis contenida.
- **Fosfatasa Alcalina e Ictericia:** Al comprimirse los ductos biliares internos por la gran masa, no puede fluir la bilis, elevando enzimas de colestasis y bilirrubina directa.

### Correlación con Comorbilidades:
- **Diabetes Mellitus:** Deprime el sistema inmunológico, elevando el riesgo y empeorando drásticamente el pronóstico de los abscesos causados por Klebsiella pneumoniae.
- **Peligro de Ruptura Peritoneal:** Si el absceso hepático no drena, puede reventar hacia el saco pericárdico, hacia la pleura pulmonar o al abdomen libre, causando infecciones fulminantes y peritonitis.`,
      esquemaMental: {
        inicio: "Siembra infecciosa en tejido hepático (portal, biliar o arterial).",
        dano: "Necrosis licuefactiva masiva en medio de tejido hepático sano.",
        consecuencia: "Formación de cavidad encapsulada, sepsis secundaria y riesgo de ruptura."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: 'Laboratorios de rutina (BH, QS, ES), Biomarcadores específicos y gasometría si aplica.',
      tratamiento: 'Soporte vital avanzado (vía aérea, oxígeno, perfusión), terapia farmacológica dirigida causal y estabilización hidroelectrolítica.',
      cita: 'Protocolo Institucional'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular ineficaz r/c estado crítico.',
      intervenciones: [
        { accion: 'Monitorizar signos vitales al menos cada 4 horas.', razon: 'Permite la detección temprana de inestabilidad hemodinámica e insuficiencia multiorgánica asociada al cuadro clínico.' },
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para Absceso Hepático y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_71_diverticulitisaguda',
    nombre: 'Diverticulitis Aguda',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Inflamación de divertículos colónicos.',
    sintomasClave: ['Dolor en fosa ilíaca izquierda', 'Fiebre', 'Cambios en el hábito intestinal'],
    clinica: {
      signosSintomas: [
        'Dolor abdominal agudo localizado en fosa ilíaca izquierda (FII) ("apendicitis izquierda").',
        'Fiebre y escalofríos.',
        'Alteración del hábito intestinal (estreñimiento o diarrea).',
        'Náuseas y vómitos leves.',
        'Distensión abdominal y flatulencia.'
      ],
      maniobraExploracion: 'Palpación de FII (dolor a la presión, defensa muscular localizada); signo de rebote (+) si hay peritonitis; tacto rectal (doloroso si hay absceso pélvico).',
      banderasRojas: [
        'Abdomen en tabla (Sugerente de perforación libre).',
        'Fiebre persistente a pesar de antibióticos.',
        'Neumaturia o fecaluria (Sugerente de fístula colovesical).',
        'Obstrucción intestinal completa.',
        'Inestabilidad hemodinámica.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Enfermedad Diverticular'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Diverticulitis Aguda es la inflamación e infección de pequeños sacos anormales (divertículos) que sobresalen de la pared del colon, comúnmente en el lado izquierdo (sigmoides). El evento disparador es la obstrucción del cuello estrecho del divertículo, a menudo por un fragmento endurecido de heces (fecalito).

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Obstrucción y Crecimiento Bacteriano:** El fecalito atrapa moco y bacterias del colon dentro del divertículo. Las bacterias se multiplican explosivamente en este espacio cerrado.
- **Tensión e Isquemia:** La presión dentro del pequeño saco aumenta drásticamente, cortando el flujo sanguíneo de su fina pared, hasta que esta muere (necrosis isquémica).
- **La Filtración Fecal:** Al morir la pared del divertículo, su contenido lleno de pus y heces se perfora hacia el exterior del colon, derramándose sobre la grasa y tejidos circundantes.

### Afectación de Órganos y Sistemas Relacionados:
- **Espacio Abdominal Inferior:** Generalmente la grasa mesentérica y los órganos vecinos logran "envolver" la rotura (perforación sellada), formando un absceso cerrado que causa dolor focalizado e intenso crónico continuo (una "apendicitis del lado izquierdo").
- **Vía Urinaria (Fístulas):** Si el intestino perforado choca contra la vejiga, el cuerpo puede crear un túnel entre ambos órganos, ocasionando que heces (fecaluria) o aire (neumaturia) salgan por la orina.
- **Peritoneo Total:** Si el absceso no se controla y revienta, se produce una peritonitis purulenta o fecaloide, la complicación más letal de la enfermedad.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Leucocitosis:** Marcada elevación en el conteo de células blanca por la reacción de defensa ante la bacteria intestinal gramnegativa liberada.
- **Pérdida del Tránsito:** Paralización y espasmos reflejos del intestino bajo debido al intenso dolor e irritación local provocando alteraciones del hábito.

### Correlación con Comorbilidades:
- **Dieta Pobre en Fibra:** Provoca heces pequeñas y duras, forzando al colon a hacer contracciones mucho más fuertes que provocan la protrusión de los divertículos a largo plazo.
- **Uso Crónico de AINEs o Corticoides:** Suprime la inflamación preventiva y aumenta dramáticamente la probabilidad de perforación silenciosa e indetectable a tiempo.`,
      esquemaMental: {
        inicio: "Impactación fecal en cuello diverticular y estasis de flora.",
        dano: "Aumento de presión, isquemia, y micro o macro perforación.",
        consecuencia: "Inflamación local, formación de absceso pélvico o peritonitis franca."
      },
      cita: "The Lancet, Diverticular Disease"
    },
    manejo: {
      diagnostico: 'TC de abdomen con contraste (estudio de elección; evita colonoscopia en fase aguda). Clasificación de Hinchey para gravedad. BH (Leucocitosis).',
      tratamiento: 'Dieta líquida o ayuno. Antibióticos (Ciprofloxacino o Ceftriaxona + Metronidazol). Analgesia. Cirugía (Hartmann o resección con anastomosis) en Hinchey III-IV o fallo de manejo médico.',
      cita: 'WSES guidelines for the management of acute left-sided colonic diverticulitis 2022'
    },
    enfermeria: {
      nanda: '00132 Dolor agudo / 00013 Diarrea / 00011 Estreñimiento',
      intervenciones: [
        { accion: 'Evitar la administración de enemas o laxantes.', razon: 'Riesgo elevado de perforación intestinal en la fase aguda.' },
        { accion: 'Vigilar las características de la orina.', razon: 'Detectar signos de fístula colovesical (neumaturia, fecaluria).' },
        { accion: 'Controlar el balance de líquidos ante el riesgo de sepsis.', razon: 'Asegurar la estabilidad hemodinámica y detectar falla renal temprana.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_72_sndromedemalabsorcin',
    nombre: 'Síndrome de Malabsorción',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Fallo de asimilación de nutrientes.',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: [
        'Diarrea crónica o esteatorrea (heces grasas, flotantes, fétidas).',
        'Pérdida de peso involuntaria y caquexia.',
        'Flatulencia, distensión abdominal and borborigmos.',
        'Déficits vitamínicos: Glositis (B12), ceguera nocturna (Vitamina A), osteomalacia (Vitamina D), sangrados (Vitamina K).',
        'Edema periférico por hipoalbuminemia.'
      ],
      maniobraExploracion: 'Evaluación del estado nutricional (IMC, pliegues cutáneos); inspección de la lengua (glositis); búsqueda de signos de hipocalcemia (Chvostek/Trousseau); inspección abdominal.',
      banderasRojas: [
        'Deshidratación severa y trastornos electrolíticos.',
        'Anemia megaloblástica o ferropénica grave.',
        'Tetania por hipocalcemia.',
        'Neuropatía periférica por déficit de B12.',
        'Insuficiencia pancreática exocrina no tratada.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Síndromes de Malabsorción'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
El Síndrome de Malabsorción agrupa múltiples trastornos en los que el sistema digestivo fracasa en su tarea de digerir y transferir los nutrientes (macronutrientes, vitaminas y minerales) desde el intestino hacia la sangre. El evento disparador puede originarse en la falta de jugos digestivos (ej. el páncreas no funciona), destrucción de la barrera de transporte (ej. atrofia de las vellosidades en celiaquía) o problemas de drenaje en sangre y linfa.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Pérdida Intraluminal (No Digestión):** Sin enzimas suficientes, los panes no se vuelven azúcares, y las carnes y la mantequilla no se desarman. La comida baja entera por los intestinos.
- **Fallo Mucoso (No Absorción):** Si la comida está disuelta pero las vellosidades intestinales están arrasadas, nada entra en la célula intestinal.
- **Consecuencias Terminales (El Exceso Fermentable):** La monumental cantidad de grasa y azúcar que no entró a la sangre llega al final del tubo. La grasa produce diarreas asquerosas y pegajosas (esteatorrea). Los azúcares son fermentados por las bacterias crasas creando gases y dolorosa dilatación intestinal.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Tegumentario y Óseo:** La piel se vuelve reseca, el cabello quebradizo. Sin vitamina D, los huesos se vacían (osteomalacia/osteoporosis), y la lengua se hincha rojo oscuro y arde por déficit de vitaminas B (glositis).
- **Sistema Nervioso Central y Periférico:** La falta crítica de Vitamina B12 "desnuda" las fundas de los nervios de las piernas, causando hormigueos crónicos, falta de equilibrio e incluso demencia temprana.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Proteínas Bajísimas:** Fallan todos los procesos y no se puede producir músculo, anticuerpos ni hormonas, resultando en caquexia y edemas (el agua abandona las venas y congestiona los tejidos al caer la presión oncótica por falta de albúmina).
- **Carencia Mineral y Anemia Mixta:** El hierro, ácido fólico y vitamina B12 no se absorben, generando una profunda descompensación eritrocitaria.

### Correlación con Comorbilidades:
- **Enfermedad Celíaca:** Es el enemigo íntimo crónico que detona una respuesta inmune que atrofia al intestino grueso por la proteína gliadina en el trigo.
- **Resección Intestinal:** Frecuentemente por enfermedades vasculares en adultos mayores, se extirpan metros de intestino vivo, logrando que el recorrido "no dure" y termine en malabsorción fisiológica.`,
      esquemaMental: {
        inicio: "Falla pancreática, destrucción de la vellosidad mucosa o defecto de trasporte.",
        dano: "Inhabilidad para transportar partículas desde la luz entérica a la circulación.",
        consecuencia: "Consunción sistémica, esteatorrea, y fallos sistémicos de avitaminosis."
      },
      cita: "Harrison's Principles of Internal Medicine"
    },
    manejo: {
      diagnostico: 'Clínico. Sospecha mediante anamnesis. Confirmación con test de grasa en heces (Sudán), test de xilosa, endoscopia con biopsia duodenal.',
      tratamiento: 'Tratamiento dirigido a la causa (ej. enzimas pancreáticas, dieta libre de gluten, antibióticos si hay sobrecrecimiento bacteriano). Suplementación vitamínica (A, D, E, K, B12, hierro, calcio).',
      tratamientoDetallado: {
        farmacos: [
          { nombre: 'Enzimas pancreáticas (Creon)', dosis: '25,000-50,000 UI por comida', frecuencia: 'Con cada comida', observaciones: 'Ajustar dosis según respuesta clínica y esteatorrea.' },
          { nombre: 'Suplementación Multivitamínica', dosis: '1 cápsula', frecuencia: 'Cada 24 horas', observaciones: 'Monitorizar perfiles séricos de vitaminas liposolubles periódicamente.' }
        ],
        medidasGenerales: [
          'Dieta fraccionada y de fácil digestión.',
          'Restricción de grasas si hay esteatorrea severa.'
        ]
      },
      monitoreo: {
        parametros: ['Peso corporal (semanal)', 'Albúmina/Prealbúmina', 'Hemoglobina', 'Vitaminas séricas'],
        signosAlerta: ['Pérdida de peso acelerada, edema nutricional (hipoalbuminemia), fiebre (posible infección).']
      },
      evaluacion: {
        criteriosExito: ['Ganancia de peso, normalización de albúmina, desaparición de esteatorrea.'],
        criteriosFracaso: ['Persistencia de pérdida de peso, déficit vitamínico refractario.']
      },
      cita: 'Harrison, cap. sobre malabsorción'
    },
    enfermeria: {
      nanda: '00002 Desequilibrio nutricional: inferior a las necesidades corporales',
      intervenciones: [
        { accion: 'Pesar al paciente dos veces por semana bajo las mismas condiciones.', razon: 'Monitorizar la eficacia del soporte nutricional y la progresión ponderal.' },
        { accion: 'Controlar las características de las heces (color, olor, consistencia).', razon: 'Identificar esteatorrea y valorar la respuesta a suplementos enzimáticos.' },
        { accion: 'Administrar suplementos vitamínicos y minerales prescritos.', razon: 'Corregir los déficits carenciales que pueden causar complicaciones neurológicas o hematológicas.' },
        { accion: 'Educar sobre las restricciones dietéticas específicas (ej. gluten).', razon: 'Evitar el desencadenante inmunológico en pacientes con Enfermedad Celíaca.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_73_isquemiamesentrica',
    nombre: 'Isquemia Mesentérica',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Falta de flujo sanguíneo intestinal.',
    sintomasClave: ['Dolor abdominal desproporcionado a la exploración', 'Antecedente de Fibrilación Auricular', 'Acidosis láctica'],
    clinica: {
      signosSintomas: [
        'Dolor abdominal súbito, periumbilical e intenso (proporción dolor/exploración 10:1).',
        'Vaciado intestinal forzado (vómitos and diarrea súbitos).',
        'Distensión abdominal tardía (indica infarto intestinal).',
        'Heces con "jalea de grosella" (sangre y moco; fase avanzada).',
        'Acidosis metabólica e inestabilidad hemodinámica.'
      ],
      maniobraExploracion: 'Palpación abdominal (inicialmente blanda y sin rebote a pesar del dolor intenso); auscultación (ruidos presentes al inicio, ausentes al final); tacto rectal (sangre oculta positiva).',
      banderasRojas: [
        'Acidosis láctica persistente o en aumento.',
        'Signos de irritación peritoneal (Rebote positivo; indica gangrena/perforación).',
        'Shock distributivo/séptico.',
        'Neumatosis intestinal en la radiografía.',
        'Insuficiencia orgánica múltiple.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Isquemia Mesentérica'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Isquemia Mesentérica (aguda) es el equivalente a un infarto de miocardio, pero en los intestinos. El evento disparador es la interrupción brusca del flujo de sangre oxigenada, comúnmente porque un coágulo formado en el corazón (típicamente por Fibrilación Auricular) se desprende y viaja hasta atascarse en la Arteria Mesentérica Superior.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **Hipoxia Súbita:** Al cortarse la circulación, las veloces células del revestimiento intestinal (que exigen mucha energía) agotan su oxígeno en minutos, deteniendo sus bombas celulares.
- **Descamación y Fuga:** La mucosa intestinal, que servía de escudo, muere primero y se desprende. Esto expone las capas más profundas a los ácidos digestivos y a las trillones de bacterias del colon.
- **Necrosis Transmural:** Si no se destapa la arteria en menos de 6 horas, la muerte celular avanza a través de todo el grosor del intestino, convirtiendo un tubo vivo en un segmento de carne negra, muerta y putrefacta.

### Afectación de Órganos y Sistemas Relacionados:
- **Tracto Gastrointestinal:** Primero hay un vaciado desesperado (vómitos y diarrea explosiva por isquemia espástica). El síntoma cardinal es un dolor agónico que no coincide con una barriga suave al tacto ("dolor desproporcionado a los hallazgos físicos").
- **Sistema Inmunológico / Peritoneo:** Las bacterias, al no tener barrera, cruzan inmediatamente hacia la cavidad libre del abdomen, provocando una Peritonitis Fecaloide letal.
- **Sistema Cardiovascular:** Las toxinas y bacterias entran en tropel al torrente sanguíneo que quedaba, causando Sepsis grave y un Shock Distributivo intratable.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Ácido Láctico (Lactato):** Al quedarse sin oxígeno, las células recurren al metabolismo anaerobio, produciendo ácido láctico en cantidades masivas. Un lactato elevado o en rápido aumento es la principal señal de muerte celular por isquemia.
- **Equilibrio Ácido-Base:** Consecuencia del gran lactato, el cuerpo entra en una severa Acidosis Metabólica.

### Correlación con Comorbilidades:
- **Arritmias Cardíacas (FA):** Es el factor de riesgo maestro. El corazón con fibrilación auricular forma diminutos coágulos en la orejuela izquierda que son "disparados" directamente hacia la aorta y sus ramas.
- **Aterosclerosis Crónica:** Placas de colesterol en la arteria intestinal pueden causar dolores después de comer ("angina intestinal crónic"), que un día se trombosan por completo tapando todo el flujo.`,
      esquemaMental: {
        inicio: "Oclusión arterial aguda (émbolo cardíaco) o venosa de la mesentérica.",
        dano: "Hipoxia severa y pérdida inmediata de la barrera mucosa del intestino.",
        consecuencia: "Infarto intestinal, acidosis láctica, translocación bacteriana y sepsis."
      },
      cita: "American College of Gastroenterology Guidelines on Intestinal Ischemia"
    },
    manejo: {
      diagnostico: 'Angio-TC de abdomen (estudio de elección). Niveles de Lactato sérico. Gasometría arterial. Arteriografía mesentérica (si se requiere intervención endovascular).',
      tratamiento: 'Líquidos IV agresivos. Heparina sódica en infusión. Embolectomía quirúrgica o bypass. Resección de segmentos intestinales necróticos. Laparotomía de "second look" a las 24-48h.',
      cita: 'SVS clinical practice guidelines for management of chronic and acute mesenteric ischemia'
    },
    enfermeria: {
      nanda: '00204 Riesgo de perfusión tisular gastrointestinal ineficaz',
      intervenciones: [
        { accion: 'Monitorizar estrictamente el equilibrio ácido-base (Lactato).', razon: 'El lactato es el mejor marcador indirecto de la viabilidad intestinal y progresión de la isquemia.' },
        { accion: 'Vigilancia de signos de peritonitis cada hora.', razon: 'Detectar de forma inmediata el paso de isquemia a infarto intestinal con perforación.' },
        { accion: 'Optimizar la oxigenación y perfusión sistémica.', razon: 'Maximizar el flujo colateral a zonas con isquemia relativa.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  },
{
    id: 'int_74_gastritiscrnicahpylori',
    nombre: 'Gastritis Crónica / H. Pylori',
    servicio: 'Medicina Interna',
    system: 'Sistema Gastrointestinal / Hepático',
    color: 'orange',
    definicionCaso: 'Inflamación gástrica persistente.',
    sintomasClave: ['Dispepsia persistente', 'Saciedad precoz', 'Epigastralgia leve'],
    clinica: {
      signosSintomas: [
        'Dispepsia (pesadez abdominal persistente postprandial).',
        'Epigastralgia leve de carácter vago.',
        'Plenitud gástrica temprana y eructos.',
        'Náuseas ocasionales.',
        'Anemia ferropénica inexplicada (en gastritis atrófica).'
      ],
      maniobraExploracion: 'Palpación de epigastrio (dolor leve o ausente); búsqueda de signos de deficiencia vitamínica (B12 en gastritis tipo A); inspección de facies (palidez).',
      banderasRojas: [
        'Pérdida de peso involuntaria.',
        'Vómitos persistentes o hematemesis.',
        'Masa palpable en epigastrio.',
        'Linfadenopatía de Virchow (supraclavicular izquierda).',
        'Disfagia de reciente aparición.'
      ],
      cita: 'Harrison, Principios de Medicina Interna, Gastritis'
    },
    fisiopatologia: {
      textoTecnico: `### Introducción: El Evento Disparador
La Gastritis Crónica es la inflamación persistente, de bajo grado y silenciosa de todo el revestimiento del estómago. El evento disparador casi universal es la colonización por la bacteria *Helicobacter pylori*, un microorganismo único que logró evolutivamente sobrevivir al extremo baño de ácido del estómago humano.

### Desenlace: La Cascada de Disfunción
**Mecanismo de Progresión (El Mapa):**
- **La Colonización:** *H. pylori* usa su forma de sacacorchos para enterrarse bajo la capa protectora de moco, donde libera ureasa, una enzima que convierte la urea en amoníaco, creando una "nube" alcalina a su alrededor que la protege del ácido.
- **El Daño y la Reacción Inmune:** El amoníaco y otras toxinas de la bacteria disuelven las células de la superficie. El sistema inmune infiltra el estómago con linfocitos crónicos que causan un campo de batalla constante.
- **Muerte Glandular (Atrofia):** Tras décadas de pelea, las glándulas estomacales normales se rinden y mueren (Gastritis Atrófica), dejando al estómago cada vez más delgado e incapaz de producir ácido o factor intrínseco.

### Afectación de Órganos y Sistemas Relacionados:
- **Sistema Digestivo Local:** Frecuentemente es asintomática, pero a medida que empeora causa dispepsia (digestión pesada), saciedad prematura al comer y episodios vagos de ardor no ulceroso.
- **Sistema Hematopoyético:** Al destruirse las células del estómago, se deja de producir el "Factor Intrínseco", la única llave orgánica para que el cuerpo pueda absorber Vitamina B12 en el intestino, desencadenando una Anemia Perniciosa.
- **Sistema Sanguíneo (Hierro):** La falta progresiva de ácido estomacal (hipoclorhidria) hace que el cuerpo no pueda "deshacer" químicamente el hierro de los alimentos, causando anemia ferropénica rebelde a tratamientos orales.

### Alteraciones Hormonales y Bioquímicas (Eje Químico):
- **Gastrina Sérica:** Al no haber ácido gástrico (porque las glándulas murieron), las hormonas de aviso se disparan, elevando permanentemente la Gastrina (que intenta inútilmente que el estómago produzca ácido).
- **Auto-anticuerpos:** En el 10% de los casos, la gastritis no es por bacterias sino porque el cuerpo crea anticuerpos (Anti-células parietales) que destruyen su propio estómago, originando el subtipo autoinmune clásico.

### Correlación con Comorbilidades:
- **Adenocarcinoma Gástrico:** Es el final trágico. La inflamación continua por *H. pylori* fuerza a las células a cambiar (Metaplasia Intestinal), transformándose luego en displasia y finalmente en el temido cáncer gástrico.
- **Linfoma MALT:** La masiva presencia constante de linfocitos (células inmunes) en el estómago luchando contra la bacteria puede descontrolarse, originando este particular tumor indolente, que frecuentemente se "cura solo" si se extermina a *H. pylori* con antibióticos.`,
      esquemaMental: {
        inicio: "Infección bacteriana por H. pylori debajo de la capa de moco gástrica.",
        dano: "Infiltración crónica de neutrófilos/linfocitos y atrofia progresiva de glándulas.",
        consecuencia: "Hipoclorhidria, metaplasia intestinal, anemia y riesgo de cáncer gástrico."
      },
      cita: "Kyoto Global Consensus report on Helicobacter pylori gastritis"
    },
    manejo: {
      diagnostico: 'Endoscopia Digestiva Alta con toma de biopsias (Estándar de oro). Test de aliento (Urea rápida). Serología o antígeno en heces. Determinación de Vitamina B12 sérica.',
      tratamiento: 'Terapia de erradicación de H. pylori (IBP + Bismuto + Tetraciclina + Metronidazol o esquema triple clásico). Suplementación con B12 (si hay atrofia). Seguimiento endoscópico si hay metaplasia.',
      cita: 'ACG Clinical Guideline: Treatment of Helicobacter pylori Infection'
    },
    enfermeria: {
      nanda: '00126 Conocimientos deficientes / 00134 Náuseas',
      intervenciones: [
        { accion: 'Fomentar la adherencia estricta al tratamiento antibiótico.', razon: 'Esencial para erradicar la bacteria y prevenir la recaída o resistencia.' },
        { accion: 'Instruir sobre la higiene de manos y alimentos.', razon: 'H. pylori se transmite principalmente por vía fecal-oral u oral-oral.' },
        { accion: 'Asesoría nutricional para evitar irritantes de la mucosa.', razon: 'Reducir la sintomatología dispéptica y facilitar la cicatrización mucosa.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  }
];
