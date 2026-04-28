import React, { useState } from 'react';
import { Activity, Brain, Heart, Wind, Stethoscope, Droplet, Shield } from 'lucide-react';

interface ScoreOption {
  label: string;
  points: number;
}

interface ScoreCriterion {
  id: string;
  question: string;
  options: ScoreOption[];
}

interface MedicalScore {
  id: string;
  name: string;
  system: string;
  icon: React.ReactNode;
  description: string;
  image?: string;
  criteria: ScoreCriterion[];
  interpret: (score: number) => { classification: string; meaning: string; color: string };
  clinicalInfo?: {
    normal?: string;
    low?: { value: string; impact: string };
    high?: { value: string; impact: string };
  };
}

export const MEDICAL_SCORES: MedicalScore[] = [
  {
    id: 'curb65',
    name: 'CURB-65',
    system: 'Neumología',
    icon: <Wind className="w-5 h-5" />,
    description: 'Predice la mortalidad a 30 días en pacientes con Neumonía Adquirida en la Comunidad.',
    clinicalInfo: {
      normal: '0 - 1 puntos',
      low: { value: '0 - 1', impact: 'Bajo riesgo de mortalidad. Generalmente manejo ambulatorio.' },
      high: { value: '>= 3', impact: 'Alto riesgo de mortalidad. Requiere manejo hospitalario urgente o UCI.' }
    },
    criteria: [
      { id: 'c', question: 'Confusión (AMTS <= 8)', options: [{ label: 'Ausente', points: 0 }, { label: 'Presente', points: 1 }] },
      { id: 'u', question: 'BUN > 19 mg/dL (Urea > 7 mmol/L)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'r', question: 'Frecuencia Respiratoria >= 30 rpm', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'b', question: 'Presión Arterial (Sistólica < 90 o Diastólica <= 60 mmHg)', options: [{ label: 'Normal', points: 0 }, { label: 'Hipotensión', points: 1 }] },
      { id: '65', question: 'Edad >= 65 años', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score <= 1) return { classification: 'Riesgo Bajo', meaning: 'Mortalidad 1.5%. Tratamiento ambulatorio.', color: 'bg-green-100 text-green-800' };
      if (score === 2) return { classification: 'Riesgo Moderado', meaning: 'Mortalidad 9.2%. Ingreso a sala general.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Riesgo Alto', meaning: 'Mortalidad > 22%. Ingreso a UCI.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'chadsvasc',
    name: 'CHA2DS2-VASc',
    system: 'Cardiología',
    icon: <Heart className="w-5 h-5" />,
    description: 'Estima el riesgo de ictus en pacientes con Fibrilación Auricular y ayuda en la decisión de anticoagulación.',
    image: 'https://pbs.twimg.com/media/Ej_O8uUXYAA9X-Z.jpg',
    clinicalInfo: {
      normal: '0 (Hombres), 1 (Mujeres)',
      low: { value: '0 - 1', impact: 'Bajo riesgo de EVC. Puede no requerir anticoagulación.' },
      high: { value: '>= 2', impact: 'Alto riesgo de EVC. Generalmente indica inicio de anticoagulación oral.' }
    },
    criteria: [
      { id: 'c', question: 'Congestive HF (Insuficiencia cardíaca congestiva)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'h', question: 'Hipertensión', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'a2', question: 'Age >75 (Edad >75)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 2 }] },
      { id: 'd', question: 'Diabetes mellitus', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 's2', question: 'Stroke/TIA (EVC/AIT)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 2 }] },
      { id: 'v', question: 'Vascular disease (Enfermedad vascular: IAM previo, etc)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'a1', question: 'Age 65-74 (Edad 65-74)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'sc', question: 'Sex Category (Sexo femenino)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score === 0) return { classification: 'Muy bajo riesgo', meaning: 'No se recomienda anticoagulación.', color: 'bg-green-100 text-green-800' };
      if (score === 1) return { classification: 'Bajo riesgo', meaning: 'Evaluar riesgo-beneficio.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Alto riesgo', meaning: 'Anticoagulación oral recomendada.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'hasbled',
    name: 'HAS-BLED',
    system: 'Cardiología',
    icon: <Heart className="w-5 h-5" />,
    description: 'Estima el riesgo de sangrado mayor asociado a anticoagulación en Fibrilación Auricular.',
    clinicalInfo: {
      normal: '0 - 1 puntos',
      low: { value: '0 - 2', impact: 'Riesgo bajo de sangrado mayor. Anticoagulación segura.' },
      high: { value: '>= 3', impact: 'Riesgo alto de sangrado. Requiere precaución y revisiones frecuentes.' }
    },
    criteria: [
      { id: 'h', question: 'Hipertensión (Sistólica > 160)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'a1', question: 'Función Renal Anormal (Diálisis, Tx, Cr > 2.26)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'a2', question: 'Función Hepática Anormal (Cirrosis, Bilirrubina > 2x, AST/ALT/ALP > 3x)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 's', question: 'Ictus', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'b', question: 'Sangrado (Predisposición o sangrado mayor previo)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'l', question: 'INR lábil, inestable o tiempo en rango terapéutico < 60%', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'e', question: 'Edad > 65 años', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'd1', question: 'Drogas (AINEs, Antiplaquetarios)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'd2', question: 'Alcohol (exceso)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score < 3) return { classification: 'Riesgo Bajo', meaning: 'Riesgo bajo de sangrado mayor (1-2%).', color: 'bg-green-100 text-green-800' };
      return { classification: 'Riesgo Alto', meaning: 'Riesgo alto de sangrado mayor (>= 3.7%). Monitorear de cerca.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'glasgow',
    name: 'Glasgow Coma Scale',
    system: 'Neurología',
    icon: <Brain className="w-5 h-5" />,
    description: 'Evalúa el nivel de consciencia tras un daño cerebral agudo.',
    clinicalInfo: {
      normal: '15 puntos',
      low: { value: '<= 8', impact: 'Coma profundo. Alto riesgo de pérdida de vía aérea y muerte.' },
      high: { value: '13 - 15', impact: 'Estado de consciencia preservado o levemente alterado.' }
    },
    criteria: [
      { id: 'o', question: 'Apertura Ocular', options: [{ label: 'Ausente (1)', points: 1 }, { label: 'Al dolor (2)', points: 2 }, { label: 'Orden verbal (3)', points: 3 }, { label: 'Espontánea (4)', points: 4 }] },
      { id: 'v', question: 'Respuesta Verbal', options: [{ label: 'Ausente (1)', points: 1 }, { label: 'Sonidos incomprensibles (2)', points: 2 }, { label: 'Palabras inapropiadas (3)', points: 3 }, { label: 'Desorientado y hablando (4)', points: 4 }, { label: 'Orientado y conversando (5)', points: 5 }] },
      { id: 'm', question: 'Respuesta Motora', options: [{ label: 'Ausente (1)', points: 1 }, { label: 'Extensión (Descerebración) (2)', points: 2 }, { label: 'Flexión anormal (Decorticación) (3)', points: 3 }, { label: 'Retirada y flexión (4)', points: 4 }, { label: 'Localiza el dolor (5)', points: 5 }, { label: 'Orden verbal obedece (6)', points: 6 }] },
    ],
    interpret: (score: number) => {
      if (score <= 8) return { classification: 'Trauma Severo', meaning: 'Coma profundo. Indicación de intubación endotraqueal.', color: 'bg-red-100 text-red-800' };
      if (score <= 12) return { classification: 'Trauma Moderado', meaning: 'Alteración importante de la consciencia.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Trauma Leve', meaning: 'Alteración mínima de la consciencia.', color: 'bg-green-100 text-green-800' };
    }
  },
  {
    id: 'childpugh',
    name: 'Child-Pugh',
    system: 'Gastroenterología',
    icon: <Activity className="w-5 h-5" />,
    description: 'Estadifica el pronóstico y la necesidad de trasplante en Cirrosis Hepática.',
    clinicalInfo: {
      normal: '5 - 6 (Clase A)',
      low: { value: '5 - 6', impact: 'Función hepática bien compensada. Buen pronóstico.' },
      high: { value: '>= 10', impact: 'Fallo hepático severo. Alto riesgo de muerte y necesidad de trasplante.' }
    },
    criteria: [
      { id: 'e', question: 'Encefalopatía', options: [{ label: 'Ninguna', points: 1 }, { label: 'Grado 1-2', points: 2 }, { label: 'Grado 3-4', points: 3 }] },
      { id: 'a', question: 'Ascitis', options: [{ label: 'Ausente', points: 1 }, { label: 'Leve / Controlada', points: 2 }, { label: 'Severa / Refractaria', points: 3 }] },
      { id: 'b', question: 'Bilirrubina Total (mg/dL)', options: [{ label: '< 2.0', points: 1 }, { label: '2.0 - 3.0', points: 2 }, { label: '> 3.0', points: 3 }] },
      { id: 'al', question: 'Albúmina (g/dL)', options: [{ label: '> 3.5', points: 1 }, { label: '2.8 - 3.5', points: 2 }, { label: '< 2.8', points: 3 }] },
      { id: 'pt', question: 'Tiempo Protrombina prolongado (seg) / INR', options: [{ label: '< 4s (< 1.7)', points: 1 }, { label: '4 - 6s (1.7 - 2.3)', points: 2 }, { label: '> 6s (> 2.3)', points: 3 }] },
    ],
    interpret: (score: number) => {
      if (score <= 6) return { classification: 'Clase A', meaning: 'Enfermedad bien compensada. Supervivencia de 1-2 años: 100% - 85%.', color: 'bg-green-100 text-green-800' };
      if (score <= 9) return { classification: 'Clase B', meaning: 'Compromiso funcional significativo. Supervivencia de 1-2 años: 80% - 60%.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Clase C', meaning: 'Enfermedad descompensada severa. Supervivencia de 1-2 años: 45% - 35%. Requiere evaluación para trasplante.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'eva',
    name: 'Escala Visual Analógica (EVA)',
    system: 'Dolor',
    icon: <Activity className="w-5 h-5" />,
    description: 'Valora la intensidad del dolor referido por el paciente en una escala de 0 a 10.',
    clinicalInfo: {
      normal: '0 puntos',
      low: { value: '1 - 3', impact: 'Dolor leve, generalmente manejable con medidas básicas.' },
      high: { value: '>= 7', impact: 'Dolor severo. Causa estrés fisiológico, taquicardia e hipertensión.' }
    },
    criteria: [
      { 
        id: 'pain', 
        question: 'Nivel de Dolor', 
        options: [
          { label: '0 (Sin dolor)', points: 0 },
          { label: '2 (Leve)', points: 2 },
          { label: '4 (Moderado)', points: 4 },
          { label: '6 (Fuerte)', points: 6 },
          { label: '8 (Muy fuerte)', points: 8 },
          { label: '10 (Insupportable)', points: 10 },
        ] 
      }
    ],
    interpret: (score: number) => {
      if (score === 0) return { classification: 'Sin Dolor', meaning: 'Ausencia total de dolor.', color: 'bg-green-100 text-green-800' };
      if (score <= 3) return { classification: 'Dolor Leve', meaning: 'Dolor tolerable que apenas interfiere en la vida diaria.', color: 'bg-green-100 text-green-800' };
      if (score <= 6) return { classification: 'Dolor Moderado', meaning: 'Dolor que interfiere en las actividades y requiere tratamiento.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Dolor Severo', meaning: 'Dolor incapacitante que requiere manejo analgésico potente.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'rass',
    name: 'RASS (Richmond Agitation-Sedation Scale)',
    system: 'Sedación',
    icon: <Brain className="w-5 h-5" />,
    description: 'Evalúa el nivel de agitación o sedación, especialmente en pacientes críticos o bajo ventilación.',
    clinicalInfo: {
      normal: '0 (Alerta y tranquilo)',
      low: { value: '-3 a -5', impact: 'Sedación profunda. Riesgo de depresión respiratoria y neumonía.' },
      high: { value: '+2 a +4', impact: 'Agitación peligrosa. Riesgo de auto-extubación y lesiones.' }
    },
    criteria: [
      {
        id: 'state',
        question: 'Estado de Agitación / Sedación',
        options: [
          { label: '+4 Combativo', points: 4 },
          { label: '+3 Muy agitado', points: 3 },
          { label: '+2 Agitado', points: 2 },
          { label: '+1 Ansioso', points: 1 },
          { label: '0 Alerta y tranquilo', points: 0 },
          { label: '-1 Somnoliento', points: -1 },
          { label: '-2 Sedación ligera', points: -2 },
          { label: '-3 Sedación moderada', points: -3 },
          { label: '-4 Sedación profunda', points: -4 },
          { label: '-5 Sedación muy profunda', points: -5 },
        ]
      }
    ],
    interpret: (score: number) => {
      if (score > 0) return { classification: 'Agitación', meaning: 'El paciente presenta niveles de agitación peligrosos para sí mismo o el personal.', color: 'bg-red-100 text-red-800' };
      if (score === 0) return { classification: 'Neutral', meaning: 'Paciente alerta, tranquilo y cooperador.', color: 'bg-green-100 text-green-800' };
      if (score >= -2) return { classification: 'Sedación Suave', meaning: 'Despierta a la voz o mantiene contacto ocular.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Sedación Profunda', meaning: 'Mínima o nula respuesta a estímulos físicos o verbales.', color: 'bg-blue-100 text-blue-800' };
    }
  },
  {
    id: 'norton',
    name: 'Escala de Norton',
    system: 'Riesgo / Enfermería',
    icon: <Shield className="w-5 h-5" />,
    description: 'Valora el riesgo de que se produzcan úlceras por presión basándose en el estado general.',
    image: 'https://www.heridasenred.com/wp-content/uploads/2021/04/Escala-Norton-Resumida-1.jpg',
    clinicalInfo: {
      normal: '> 14 puntos',
      low: { value: '<= 12', impact: 'Riesgo alto de úlceras por presión e infección sistémica.' },
      high: { value: '> 14', impact: 'Riesgo mínimo de desarrollar lesiones cutáneas.' }
    },
    criteria: [
      { id: 'fisico', question: 'Estado Físico General', options: [{ label: 'Bueno', points: 4 }, { label: 'Regular', points: 3 }, { label: 'Malo', points: 2 }, { label: 'Muy Malo', points: 1 }] },
      { id: 'mental', question: 'Estado Mental', options: [{ label: 'Alerta', points: 4 }, { label: 'Apático', points: 3 }, { label: 'Confuso', points: 2 }, { label: 'Estuporoso y/o comatoso', points: 1 }] },
      { id: 'actividad', question: 'Actividad', options: [{ label: 'Ambulante', points: 4 }, { label: 'Camina con ayuda', points: 3 }, { label: 'Sentado', points: 2 }, { label: 'Encamada', points: 1 }] },
      { id: 'movilidad', question: 'Movilidad', options: [{ label: 'Total', points: 4 }, { label: 'Disminuida', points: 3 }, { label: 'Muy limitada', points: 2 }, { label: 'Inmóvil', points: 1 }] },
      { id: 'continencia', question: 'Incontinencia', options: [{ label: 'Ninguna', points: 4 }, { label: 'Ocasional', points: 3 }, { label: 'Urinaria o fecal', points: 2 }, { label: 'Urinaria y fecal', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score > 14) return { classification: 'Riesgo Mínimo', meaning: 'Baja probabilidad de desarrollar úlceras por presión.', color: 'bg-green-100 text-green-800' };
      if (score >= 12) return { classification: 'Riesgo Moderado', meaning: 'Riesgo evidente. Se deben aplicar cuidados preventivos.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Riesgo Muy Alto', meaning: 'Puntuación crítica. Medidas preventivas intensas requeridas.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'braden',
    name: 'Escala de Braden',
    system: 'Riesgo / Enfermería',
    icon: <Shield className="w-5 h-5" />,
    description: 'Evalúa el riesgo de formación de úlceras por presión mediante seis subescalas.',
    clinicalInfo: {
      normal: '> 19 puntos',
      low: { value: '<= 12', impact: 'Riesgo muy alto de necrosis tisular y sepsis por úlceras.' },
      high: { value: '> 19', impact: 'Integridad cutánea preservada, bajo riesgo.' }
    },
    criteria: [
      { id: 'sensorial', question: 'Percepción Sensorial', options: [{ label: 'Sin limitaciones', points: 4 }, { label: 'Ligera limitación', points: 3 }, { label: 'Muy limitada', points: 2 }, { label: 'Completamente limitada', points: 1 }] },
      { id: 'humedad', question: 'Humedad', options: [{ label: 'Raramente húmeda', points: 4 }, { label: 'Ocasionalmente húmeda', points: 3 }, { label: 'Muy húmeda', points: 2 }, { label: 'Constantemente húmeda', points: 1 }] },
      { id: 'actividad', question: 'Actividad', options: [{ label: 'Deambula frecuentemente', points: 4 }, { label: 'Deambula ocasionalmente', points: 3 }, { label: 'En Silla', points: 2 }, { label: 'En Cama', points: 1 }] },
      { id: 'movilidad', question: 'Movilidad', options: [{ label: 'Sin limitaciones', points: 4 }, { label: 'Ligeramente limitada', points: 3 }, { label: 'Muy limitada', points: 2 }, { label: 'Completamente inmóvil', points: 1 }] },
      { id: 'nutricion', question: 'Nutrición', options: [{ label: 'Excelente', points: 4 }, { label: 'Adecuada', points: 3 }, { label: 'Probablemente inadecuada', points: 2 }, { label: 'Muy pobre', points: 1 }] },
      { id: 'friccion', question: 'Fricción y Cizallamiento', options: [{ label: 'Sin problema aparente', points: 3 }, { label: 'Problema potencial', points: 2 }, { label: 'Problema presente', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score >= 19) return { classification: 'Sin Riesgo', meaning: 'El paciente no presenta riesgo actual de úlceras.', color: 'bg-green-100 text-green-800' };
      if (score >= 15) return { classification: 'Riesgo Bajo', meaning: 'Riesgo leve. Vigilancia periódica sugerida.', color: 'bg-blue-100 text-blue-800' };
      if (score >= 13) return { classification: 'Riesgo Moderado', meaning: 'Medidas de prevención protocolizadas indicadas.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Riesgo Alto', meaning: 'Alto riesgo de deterioro cutáneo. Requiere máxima prevención.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'qsofa',
    name: 'qSOFA (Quick SOFA)',
    system: 'Infectología / Emergencia',
    icon: <AlertTriangle className="w-5 h-5" />,
    description: 'Identifica pacientes con alta probabilidad de malos resultados por sospecha de infección fuera de la UCI.',
    clinicalInfo: {
      normal: '0 - 1 puntos',
      low: { value: '0 - 1', impact: 'Bajo riesgo de mortalidad intrahospitalaria o estancia prolongada en UCI.' },
      high: { value: '>= 2', impact: 'Alto riesgo de mal pronóstico. Considerar sepsis y monitorización intensiva.' }
    },
    criteria: [
      { id: 'rr', question: 'Frecuencia Respiratoria >= 22 rpm', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'ment', question: 'Alteración del nivel de consciencia (Glasgow < 15)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'sbp', question: 'Presión Arterial Sistólica <= 100 mmHg', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score < 2) return { classification: 'Riesgo Bajo', meaning: 'Baja probabilidad de sepsis/mortalidad.', color: 'bg-green-100 text-green-800' };
      return { classification: 'Riesgo Alto', meaning: 'Alta probabilidad de sepsis. Evaluar disfunción orgánica.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'cincinnati',
    name: 'Escala de Cincinnati',
    system: 'Neurología / Emergencia',
    icon: <Brain className="w-5 h-5" />,
    description: 'Herramienta prehospitalaria rápida para la detección de Ictus.',
    clinicalInfo: {
      normal: '0 puntos (Negativo)',
      low: { value: '0', impact: 'Baja probabilidad de EVC agudo.' },
      high: { value: '>= 1', impact: '72% de probabilidad de EVC. Activar Código Ictus inmediatamente.' }
    },
    criteria: [
      { id: 'face', question: 'Asimetría Facial (pedir que sonría)', options: [{ label: 'Normal (ambos lados igual)', points: 0 }, { label: 'Anormal (un lado no se mueve)', points: 1 }] },
      { id: 'arm', question: 'Deriva del Brazo (ojos cerrados, brazos extendidos)', options: [{ label: 'Normal (ambos brazos se mantienen)', points: 0 }, { label: 'Anormal (un brazo cae o no se mueve)', points: 1 }] },
      { id: 'speech', question: 'Lenguaje Anormal (pedir que diga una frase)', options: [{ label: 'Normal (sin arrastrar palabras)', points: 0 }, { label: 'Anormal (arrastra palabras o no puede hablar)', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score === 0) return { classification: 'Negativo', meaning: 'Baja sospecha de ictus.', color: 'bg-green-100 text-green-800' };
      return { classification: 'Positivo', meaning: 'Sospecha alta de ictus. Requiere TAC urgente.', color: 'bg-red-100 text-red-800' };
    }
  },
  {
    id: 'wells',
    name: 'Criterios de Wells (TEP)',
    system: 'Angiología / Emergencia',
    icon: <Wind className="w-5 h-5" />,
    description: 'Predice la probabilidad clínica de Tromboembolismo Pulmonar (TEP).',
    clinicalInfo: {
      normal: '< 2 puntos (Probabilidad baja)',
      low: { value: '< 2', impact: 'Baja probabilidad. Considerar Dímero D para descartar.' },
      high: { value: '> 6', impact: 'Alta probabilidad clínica. Proceder directamente a AngioTAC.' }
    },
    criteria: [
      { id: 'dvt', question: 'Signos clínicos de TVP (edema, dolor palpación)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 3 }] },
      { id: 'alt', question: 'Diagnóstico alternativo menos probable que TEP', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 3 }] },
      { id: 'hr', question: 'Frecuencia cardíaca > 100 lpm', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1.5 }] },
      { id: 'surg', question: 'Cirugía o inmovilización previa (4 sem)', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1.5 }] },
      { id: 'pe', question: 'Antecedentes de TVP o TEP', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1.5 }] },
      { id: 'hem', question: 'Hemoptisis', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
      { id: 'mal', question: 'Cáncer en tratamiento o paliativo', options: [{ label: 'No', points: 0 }, { label: 'Sí', points: 1 }] },
    ],
    interpret: (score: number) => {
      if (score < 2) return { classification: 'Probabilidad Baja', meaning: 'Probabilidad de TEP aprox. 3.6%.', color: 'bg-green-100 text-green-800' };
      if (score <= 6) return { classification: 'Probabilidad Moderada', meaning: 'Probabilidad de TEP aprox. 20.5%.', color: 'bg-yellow-100 text-yellow-800' };
      return { classification: 'Probabilidad Alta', meaning: 'Probabilidad de TEP aprox. 66.7%.', color: 'bg-red-100 text-red-800' };
    }
  }
];

interface MedicalScoresProps {
  activeScoreId?: string | null;
  onScoreChange?: (id: string | null) => void;
  hideGrid?: boolean;
  allowedScoreIds?: string[];
}

import { AlertTriangle } from 'lucide-react';

export default function MedicalScores({ activeScoreId, onScoreChange, hideGrid = false, allowedScoreIds }: MedicalScoresProps) {
  const [internalActiveScore, setInternalActiveScore] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});

  const activeScore = activeScoreId !== undefined ? activeScoreId : internalActiveScore;

  const handleScoreClick = (scoreId: string) => {
    const nextScore = scoreId === activeScore ? null : scoreId;
    if (onScoreChange) {
      onScoreChange(nextScore);
    } else {
      setInternalActiveScore(nextScore);
    }
  };

  const handleOptionSelect = (criterionId: string, points: number) => {
    if (!activeScore) return;
    setAnswers(prev => ({ 
      ...prev, 
      [activeScore]: {
        ...(prev[activeScore] || {}),
        [criterionId]: points
      }
    }));
  };

  const currentScore = MEDICAL_SCORES.find(s => s.id === activeScore);
  const currentAnswers = activeScore ? (answers[activeScore] || {}) : {};
  const totalPoints: number = (Object.values(currentAnswers) as number[]).reduce((sum: number, val: number) => sum + val, 0);

  const calculateTotal = () => {
    if (!currentScore) return null;
    const isComplete = Object.keys(currentAnswers).length === currentScore.criteria.length;
    if (!isComplete) return null;
    return currentScore.interpret(totalPoints);
  };

  const result = calculateTotal();

  const filteredScores = allowedScoreIds 
    ? MEDICAL_SCORES.filter(s => allowedScoreIds.includes(s.id))
    : MEDICAL_SCORES;

  return (
    <div className="space-y-6">
      {!hideGrid && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScores.map((score) => (
            <div 
              key={score.id}
              onClick={() => handleScoreClick(score.id)}
              className={`cursor-pointer rounded-xl p-4 border transition-colors duration-200 ${activeScore === score.id ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:bg-muted/50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  {score.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{score.name}</h3>
                  <span className="text-xs text-muted-foreground">{score.system}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentScore && (
        <div className="mt-8 bg-card rounded-2xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold">{currentScore.name}</h2>
            <p className="text-muted-foreground mt-1">{currentScore.description}</p>
          </div>

          {currentScore.image && (
            <div className="mb-8 rounded-3xl overflow-hidden border border-border/50 shadow-xl">
              <img 
                src={currentScore.image} 
                alt={currentScore.name} 
                className="w-full h-auto object-cover max-h-[300px]"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="space-y-6">
            {currentScore.criteria.map((crt) => (
              <div key={crt.id} className="space-y-3">
                <p className="font-medium">{crt.question}</p>
                <div className="flex flex-wrap gap-2">
                  {crt.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(crt.id, opt.points)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors
                        ${currentAnswers[crt.id] === opt.points 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background hover:bg-muted text-muted-foreground border-border'
                        }
                      `}
                    >
                      {opt.label} <span className="opacity-70 ml-1">({opt.points} pts)</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t font-sans">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Puntuación Total</span>
              <span className="text-4xl font-extrabold text-foreground">{totalPoints}</span>
            </div>
            {result ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl flex flex-col gap-1 ${result.color}`}>
                  <span className="font-bold">{result.classification}</span>
                  <span className="opacity-90">{result.meaning}</span>
                </div>
                
                {currentScore.clinicalInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-muted/30 rounded-lg border border-border">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Valor Normal</span>
                      <p className="font-medium">{currentScore.clinicalInfo.normal}</p>
                    </div>
                    {currentScore.clinicalInfo.low && (
                      <div className="p-3 bg-blue-50/10 border border-blue-500/20 rounded-lg">
                        <span className="text-[10px] uppercase font-bold text-blue-500">Si el valor es BAJO ({currentScore.clinicalInfo.low.value})</span>
                        <p className="text-xs mt-1 text-muted-foreground">{currentScore.clinicalInfo.low.impact}</p>
                      </div>
                    )}
                    {currentScore.clinicalInfo.high && (
                      <div className="p-3 bg-red-50/10 border border-red-500/20 rounded-lg">
                        <span className="text-[10px] uppercase font-bold text-red-500">Si el valor es ALTO ({currentScore.clinicalInfo.high.value})</span>
                        <p className="text-xs mt-1 text-muted-foreground">{currentScore.clinicalInfo.high.impact}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
                <div className="p-3 border border-dashed border-border rounded-xl text-center">
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Selecciona todas las opciones para ver interpretación</p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
