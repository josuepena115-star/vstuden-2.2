import React from 'react';
import { Activity, Thermometer, Heart, Wind, FlaskConical } from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 bg-card border border-border shadow-sm rounded-2xl ${className}`}>
    {children}
  </div>
);

const VitalSignsByAgeBlock: React.FC = () => {
  const data = [
    { grupo: 'RN', edad: '0 - 6 semanas', ta: '70-100 / 50-68', fr: '40-45', fc: '120-140', temp: '38.0' },
    { grupo: 'Infante', edad: '7 sem - 1 año', ta: '84-106 / 56-70', fr: '20-30', fc: '100-130', temp: '37.5 - 37.8' },
    { grupo: 'Lactante Mayor', edad: '1 - 2 años', ta: '98-106 / 58-70', fr: '20-30', fc: '100-120', temp: '37.5 - 37.8' },
    { grupo: 'Pre-escolar', edad: '2 - 6 años', ta: '99-112 / 64-70', fr: '20-30', fc: '80-120', temp: '37.5 - 37.8' },
    { grupo: 'Escolar', edad: '6 - 13 años', ta: '104-124 / 64-86', fr: '12-20', fc: '80-100', temp: '37.0 - 37.5' },
    { grupo: 'Adolescente', edad: '13 - 16 años', ta: '118-132 / 70-82', fr: '12-20', fc: '70-80', temp: '37.0' },
    { grupo: 'Adulto', edad: '16 años +', ta: '110-140 / 70-90', fr: '12-20', fc: '60-80', temp: '36.2 - 37.2' },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Grupo / Edad</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-wider text-orange-600 flex items-center gap-1">
                <Activity size={12} /> TA (mmHg)
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-wider text-yellow-600">
                <Wind size={12} className="inline mr-1" /> FR (rpm)
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-wider text-blue-600">
                <Heart size={12} className="inline mr-1" /> FC (lpm)
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-wider text-green-600">
                <Thermometer size={12} className="inline mr-1" /> Temp (°C)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-accent/5 transition-colors">
                <td className="p-3">
                  <p className="text-xs font-bold text-foreground">{row.grupo}</p>
                  <p className="text-[10px] text-muted-foreground">{row.edad}</p>
                </td>
                <td className="p-3 text-xs font-medium text-orange-700 dark:text-orange-400 font-mono">{row.ta}</td>
                <td className="p-3 text-xs font-medium text-yellow-700 dark:text-yellow-400 font-mono">{row.fr}</td>
                <td className="p-3 text-xs font-medium text-blue-700 dark:text-blue-400 font-mono">{row.fc}</td>
                <td className="p-3 text-xs font-medium text-green-700 dark:text-green-400 font-mono">{row.temp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
          <p className="text-[9px] font-black text-orange-600 uppercase">Tensión Arterial</p>
        </div>
        <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
          <p className="text-[9px] font-black text-yellow-600 uppercase">Frec. Respiratoria</p>
        </div>
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <p className="text-[9px] font-black text-blue-600 uppercase">Frec. Cardiaca</p>
        </div>
        <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-[9px] font-black text-green-600 uppercase">Temperatura</p>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsByAgeBlock;
