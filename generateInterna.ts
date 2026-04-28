import fs from 'fs';
import { DISEASES } from './src/medicalData';

const newDiseases = [
  // NEUMOLOGÍA
  { nombre: 'NAC', desc: 'Neumonía Adquirida en la Comunidad: Infección del parénquima pulmonar.' },
  { nombre: 'EPOC', desc: 'Enfermedad Pulmonar Obstructiva Crónica: Limitación crónica del flujo aéreo.' },
  { nombre: 'Asma Bronquial', desc: 'Crisis Asmática: Inflamación reversible de las vías aéreas.' },
  { nombre: 'TEP', desc: 'Tromboembolismo Pulmonar: Oclusión de la arteria pulmonar por un trombo.' },
  { nombre: 'Derrame Pleural', desc: 'Acumulación patológica de líquido en el espacio pleural.' },
  { nombre: 'Absceso Pulmonar', desc: 'Infección pulmonar supurativa con necrosis y cavitación.' },
  { nombre: 'Edema Agudo de Pulmón (EAP)', desc: 'Acumulación de líquido extra-vascular en los pulmones.' },
  { nombre: 'Neumotórax', desc: 'Presencia de aire en el espacio pleural con colapso pulmonar.' },
  { nombre: 'Tuberculosis Pulmonar', desc: 'Infección crónica por Mycobacterium tuberculosis.' },
  { nombre: 'Bronquiectasias', desc: 'Dilatación irreversible y crónica de los bronquios.' },
  { nombre: 'Fibrosis Pulmonar Idiopática', desc: 'Cicratización progresiva y engrosamiento de los pulmones.' },
  { nombre: 'Cáncer de Pulmón', desc: 'Neoplasia maligna primaria de las vías respiratorias.' },
  { nombre: 'Cor Pulmonale', desc: 'Hipertrofia/falla del VD por hipertensión pulmonar primaria.' },
  { nombre: 'Atelectasia', desc: 'Colapso completo o parcial de un lóbulo pulmonar.' },
  { nombre: 'Síndrome de Distrés Respiratorio Agudo (SDRA)', desc: 'Falla respiratoria hipoxémica aguda grave.' },

  // CARDIOLOGÍA
  { nombre: 'ICC', desc: 'Insuficiencia Cardíaca Congestiva.' },
  { nombre: 'SCA', desc: 'Síndrome Coronario Agudo.' },
  { nombre: 'Crisis Hipertensiva', desc: 'Elevación aguda de la PA con o sin daño de órgano blanco.' },
  { nombre: 'Fibrilación Auricular (FA)', desc: 'Arritmia supraventricular más común.' },
  { nombre: 'Valvulopatías', desc: 'Estenosis o insuficiencias valvulares.' },
  { nombre: 'Endocarditis Infecciosa', desc: 'Infección del endocardio y válvulas cardíacas.' },
  { nombre: 'Pericarditis Aguda', desc: 'Inflamación del saco pericárdico.' },
  { nombre: 'Miocardiopatía Dilatada', desc: 'Disfunción contráctil miocárdica con dilatación.' },
  { nombre: 'Aneurisma de Aorta Abdominal', desc: 'Dilatación focal de la aorta.' },
  { nombre: 'TVP', desc: 'Trombosis Venosa Profunda.' },
  { nombre: 'Arritmias Ventriculares', desc: 'Latidos ectópicos prematuros severos.' },
  { nombre: 'Miocarditis', desc: 'Inflamación aguda del miocardio.' },
  { nombre: 'Shock Cardiogénico', desc: 'Falla de bomba que causa hipoperfusión tisular.' },
  { nombre: 'Insuficiencia Venosa Crónica', desc: 'Disfunción valvular venosa de MMII.' },
  { nombre: 'Cardiopatía Reumática', desc: 'Secuelas valvulares de fiebre reumática.' },

  // NEUROLOGÍA
  { nombre: 'ECV Isquémico', desc: 'Infarto cerebral por isquemia.' },
  { nombre: 'ECV Hemorrágico', desc: 'Derrame cerebral por sangrado intracraneal.' },
  { nombre: 'Meningitis Bacteriana/Viral', desc: 'Inflamación aguda de las meninges.' },
  { nombre: 'Estatus Epiléptico', desc: 'Convulsiones continuas o recurrentes graves.' },
  { nombre: 'Parkinson', desc: 'Trastorno neurodegenerativo del movimiento.' },
  { nombre: 'Alzheimer', desc: 'El tipo más común de demencia progresiva.' },
  { nombre: 'Esclerosis Múltiple', desc: 'Enfermedad desmielinizante del SNC.' },
  { nombre: 'Guillain-Barré', desc: 'Polineuropatía desmielinizante aguda.' },
  { nombre: 'Miastenia Gravis', desc: 'Afección autoinmune de la unión neuromuscular.' },
  { nombre: 'Encefalopatía Hepática', desc: 'Neurotoxicidad secundaria a falla hepática.' },
  { nombre: 'HSA', desc: 'Hemorragia subaracnoidea.' },
  { nombre: 'Tumores Cerebrales', desc: 'Masa intracraneal benigna o maligna.' },
  { nombre: 'Cefalea Tensional / Migraña', desc: 'Trastornos dolorosos de gran impacto.' },
  { nombre: 'Neuropatía Diabética', desc: 'Daño nervioso periférico crónico.' },
  { nombre: 'Delirium', desc: 'Síndrome confusional agudo reversible.' },

  // NEFROLOGÍA / ELECTROLITOS
  { nombre: 'ERC', desc: 'Enfermedad Renal Crónica.' },
  { nombre: 'IRA', desc: 'Insuficiencia Renal Aguda.' },
  { nombre: 'Pielonefritis Aguda', desc: 'Infección severa del tracto urinario superior.' },
  { nombre: 'Síndrome Nefrótico', desc: 'Proteinuria masiva, hipoalbuminemia y edema.' },
  { nombre: 'Síndrome Nefrítico', desc: 'Hematuria, HTA y oliguria agudas.' },
  { nombre: 'Glomerulonefritis', desc: 'Inflamación de los glomérulos renales.' },
  { nombre: 'Litiasis Renal', desc: 'Cálculos en el tracto unitario.' },
  { nombre: 'Hiperpotasemia / Hipopotasemia', desc: 'Alteraciones séricas del Potasio.' },
  { nombre: 'Hipernatremia / Hiponatremia', desc: 'Alteraciones séricas del Sodio.' },
  { nombre: 'Acidosis Metabólica', desc: 'Descenso del pH por causa metabólica.' },
  { nombre: 'Alcalosis Metabólica', desc: 'Aumento del pH por retención de bases.' },
  { nombre: 'Poliquistosis Renal', desc: 'Quistes renales múltiples genéticos.' },
  { nombre: 'Obstrucción Urinaria', desc: 'Falla pre o post renal aguda.' },
  { nombre: 'Nefropatía Diabética', desc: 'Daño microvascular renal.' },
  { nombre: 'Hidronefrosis', desc: 'Dilatación de pelvis y cálices.' },

  // GASTROENTEROLOGÍA
  { nombre: 'Cirrosis Hepática', desc: 'Fibrosis severa y nódulos de regeneración.' },
  { nombre: 'HDA', desc: 'Hemorragia Digestiva Alta.' },
  { nombre: 'Pancreatitis Aguda', desc: 'Inflamación autolítica del páncreas.' },
  { nombre: 'Crohn / Colitis Ulcerosa', desc: 'Enfermedad Inflamatoria Intestinal.' },
  { nombre: 'Colecistitis Aguda', desc: 'Inflamación de la vesícula biliar.' },
  { nombre: 'Hepatitis Viral', desc: 'Infección hepática aguda/crónica.' },
  { nombre: 'Ascitis', desc: 'Acumulación de líquido libre intraperitoneal.' },
  { nombre: 'ERGE', desc: 'Enfermedad por Reflujo Gastroesofágico.' },
  { nombre: 'Ulcera Péptica', desc: 'Lesión de la mucosa gástrica/duodenal.' },
  { nombre: 'Obstrucción Intestinal', desc: 'Detención del tránsito intestinal.' },
  { nombre: 'Absceso Hepático', desc: 'Acumulación de pus en el hígado.' },
  { nombre: 'Diverticulitis Aguda', desc: 'Inflamación de divertículos colónicos.' },
  { nombre: 'Síndrome de Malabsorción', desc: 'Fallo de asimilación de nutrientes.' },
  { nombre: 'Isquemia Mesentérica', desc: 'Falta de flujo sanguíneo intestinal.' },
  { nombre: 'Gastritis Crónica / H. Pylori', desc: 'Inflamación gástrica persistente.' },
];

const generated = newDiseases.map((d, index) => {
  let color = 'var(--primary)';
  let system = 'Neumología';
  if (index >= 15) { color = 'var(--destructive)'; system = 'Cardiología'; }
  if (index >= 30) { color = 'var(--secondary)'; system = 'Neurología'; }
  if (index >= 45) { color = 'teal'; system = 'Nefrología/Electrolitos'; }
  if (index >= 60) { color = 'orange'; system = 'Gastroenterología'; }
  
  return `{
    id: 'int_${index}_${d.nombre.toLowerCase().replace(/[^a-z0-9]/g, '')}',
    nombre: '${d.nombre}',
    servicio: 'Medicina Interna',
    color: '${color}',
    definicionCaso: '${d.desc}',
    sintomasClave: ['Evaluar ABCDE', 'Monitorización de signos vitales cada hora o según gravedad', 'Identificación de comorbilidades', 'Vigilancia de complicaciones'],
    clinica: {
      signosSintomas: ['Fiebre/hipotermia', 'Taquicardia', 'Alteración del estado mental'],
      maniobraExploracion: 'Exploración física exhaustiva por sistemas.',
      banderasRojas: ['Inestabilidad hemodinámica', 'Fallo respiratorio', 'Deterioro neurológico agudo'],
      cita: 'Guías de Práctica Clínica'
    },
    fisiopatologia: {
      textoTecnico: 'Respuesta inflamatoria sistémica o disfunción orgánica aguda relacionada con ${d.nombre}.',
      esquemaMental: {
        inicio: 'Noxa (Infecciosa, Isquémica, Metabólica)',
        dano: 'Disfunción celular/orgánica inmediata',
        consecuencia: 'Falla multiorgánica o compensación'
      },
      cita: 'Fisiopatología Estándar'
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
        { accion: 'Administrar medicamentos estrictamente según horarios y vías prescritas.', razon: 'Asegura la eficacia máxima de la terapia específica para ${d.nombre} y reduce iatrogenias médicas.' },
        { accion: 'Mantener un control riguroso de ingresos y egresos hídricos.', razon: 'Evalúa la función renal y detecta posible sobrecarga hídrica, crítico en abordajes sistémicos.' },
        { accion: 'Educar al paciente y familiar sobre los signos de alarma específicos.', razon: 'Fomenta la participación activa y el autocuidado, y mejora en gran medida la adherencia post-alta.' },
        { accion: 'Evaluar la intensidad del dolor y administrar confort.', razon: 'Reduce la respuesta de estrés simpático y facilita una recuperación tisular y metabólica óptima.' }
      ],
      cita: 'NIC/NOC Enfermería'
    }
  }`;
});

const fileData = fs.readFileSync('./src/medicalData.ts', 'utf8');

// Insert generated right before the last `];` if we look for the end of DISEASES array.
// Let's replace the end of the DISEASES export.

const lastIndex = fileData.lastIndexOf('];');

if (lastIndex !== -1) {
  const newContent = fileData.substring(0, lastIndex) + '  ,// MEDICINA INTERNA (Flashcards de Supervivencia)\n' + generated.join(',\n') + '\n' + fileData.substring(lastIndex);
  fs.writeFileSync('./src/medicalData.ts', newContent);
  console.log('Successfully injected 75 diseases for Medicina Interna.');
} else {
  console.log('Could not find the end of the DISEASES array.');
}
