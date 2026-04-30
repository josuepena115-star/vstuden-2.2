import React, { useState } from 'react';
import { Search, Info, FlaskConical, Beaker, Droplets, Thermometer, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LabValue {
  name: string;
  range: string;
  unit: string;
  interpretation?: string;
}

interface LabCategory {
  title: string;
  icon: any;
  color: string;
  values: LabValue[];
}

const LAB_DATA: LabCategory[] = [
  {
    title: 'Biometría Hemática',
    icon: Droplets,
    color: 'text-red-500',
    values: [
      { name: 'Hemoglobina (Hgb)', range: 'M: 13.5-17.5 | F: 12.0-15.5', unit: 'g/dL', interpretation: 'Bajo: Anemia. Alto: Policitemia o deshidratación.' },
      { name: 'Leucocitos (WBC)', range: '4,500 - 11,000', unit: 'cells/mcL', interpretation: 'Alto: Infección, inflamación, estrés. Bajo: Inmunosupresión.' },
      { name: 'Plaquetas (PLT)', range: '150,000 - 450,000', unit: 'cells/mcL', interpretation: 'Bajo: Trombocitopenia (riesgo sangrado). Alto: Trombocitosis.' },
      { name: 'Hematocrito (Hct)', range: 'M: 41-50% | F: 36-44%', unit: '%', interpretation: 'Relación porcentual de células rojas.' },
      { name: 'VCM', range: '80 - 100', unit: 'fL', interpretation: 'Tamaño del GR. <80: Microcítica. >100: Macrocítica.' },
    ]
  },
  {
    title: 'Química Sanguínea',
    icon: FlaskConical,
    color: 'text-blue-500',
    values: [
      { name: 'Glucosa Ayunas', range: '70 - 99', unit: 'mg/dL', interpretation: '>126: Diabetes. 100-125: Prediabetes.' },
      { name: 'Creatinina', range: 'M: 0.7-1.3 | F: 0.6-1.1', unit: 'mg/dL', interpretation: 'Marcador principal de función renal.' },
      { name: 'BUN', range: '7 - 20', unit: 'mg/dL', interpretation: 'Nitrógeno ureico en sangre.' },
      { name: 'Ácido Úrico', range: 'M: 3.4-7.0 | F: 2.4-6.0', unit: 'mg/dL', interpretation: 'Alto: Gota, lisis celular.' },
    ]
  },
  {
    title: 'Electrolitos',
    icon: Beaker,
    color: 'text-yellow-500',
    values: [
      { name: 'Sodio (Na)', range: '135 - 145', unit: 'mEq/L', interpretation: 'Regulador hídrico principal.' },
      { name: 'Potasio (K)', range: '3.5 - 5.1', unit: 'mEq/L', interpretation: 'Vital para función cardíaca. <3.5 Hipokalemia.' },
      { name: 'Cloro (Cl)', range: '96 - 106', unit: 'mEq/L', interpretation: 'Balance ácido-base.' },
      { name: 'Calcio (Ca)', range: '8.5 - 10.5', unit: 'mg/dL', interpretation: 'Total. Iónico: 4.5-5.6 mg/dL.' },
    ]
  },
  {
    title: 'Gasometría Arterial (Nivel del Mar)',
    icon: Thermometer,
    color: 'text-purple-500',
    values: [
      { name: 'pH', range: '7.35 - 7.45', unit: '-', interpretation: '<7.35: Acidosis. >7.45: Alcalosis.' },
      { name: 'pCO2', range: '35 - 45', unit: 'mmHg', interpretation: 'Componente respiratorio.' },
      { name: 'HCO3', range: '22 - 26', unit: 'mEq/L', interpretation: 'Componente metabólico.' },
      { name: 'pO2', range: '80 - 100', unit: 'mmHg', interpretation: 'Presión parcial de Oxígeno.' },
      { name: 'SatO2', range: '95 - 100', unit: '%', interpretation: 'Saturación de hemoglobina.' },
    ]
  }
];

export const LaboratoriesBlock: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LabCategory | null>(null);

  const filteredData = LAB_DATA.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.values.some(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div id="labs-reference-block" className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-black text-foreground flex items-center">
            <FlaskConical className="mr-2 text-primary" />
            Valores de Referencia
          </h2>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Laboratorios y Rangos Normales</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Buscar examen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredData.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
          >
            <div className={`p-4 border-b border-border bg-accent/30 flex items-center gap-3`}>
              <div className={`p-2 rounded-lg bg-background ${category.color}`}>
                <category.icon size={20} />
              </div>
              <h3 className="font-bold text-sm tracking-tight">{category.title}</h3>
            </div>
            <div className="divide-y divide-border">
              {category.values.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.title.toLowerCase().includes(searchTerm.toLowerCase())).map(val => (
                <div key={val.name} className="p-4 hover:bg-accent/20 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-foreground">{val.name}</span>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {val.range} <span className="text-[10px] opacity-70">{val.unit}</span>
                    </span>
                  </div>
                  {val.interpretation && (
                    <div className="flex items-start gap-1.5 mt-2 text-[11px] text-muted-foreground italic">
                      <Info size={12} className="mt-0.5 shrink-0" />
                      {val.interpretation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3">
        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
        <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
          <strong>Aviso:</strong> Los rangos de referencia pueden variar según el laboratorio y el equipo utilizado. Siempre valide con los rangos impresos en el reporte del paciente.
        </p>
      </div>
    </div>
  );
};
