import React from 'react';
import { motion } from 'motion/react';
import { 
  Hand, 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Layers, 
  Fingerprint, 
  CloudRain, 
  FileText, 
  Waves,
  Pointer
} from 'lucide-react';

const HandHygieneBlock: React.FC = () => {
  const steps = [
    { id: 1, text: 'Moja tus manos con agua', desc: 'Asegura que toda la superficie esté húmeda.', icon: Waves },
    { id: 2, text: 'Aplica jabón suficiente', desc: 'Cubre todas las superficies de las manos.', icon: Droplets },
    { id: 3, text: 'Frota las palmas', desc: 'Movimientos rotatorios constantes.', icon: RotateCcw },
    { id: 4, text: 'Palma sobre dorso', desc: 'Dorso de la mano izquierda con palma derecha y viceversa.', icon: Layers },
    { id: 5, text: 'Entre los dedos', desc: 'Entrelaza los dedos y frota los espacios interdigitales.', icon: Hand },
    { id: 6, text: 'Dorso de los dedos', desc: 'Frota el dorso de los dedos contra la palma opuesta.', icon: Hand },
    { id: 7, text: 'Limpia los pulgares', desc: 'Rodea el pulgar con la palma opuesta y frota circularmente.', icon: RotateCcw },
    { id: 8, text: 'Puntas de los dedos', desc: 'Frota las uñas y puntas en la palma opuesta.', icon: Fingerprint },
    { id: 9, text: 'Enjuaga bien', desc: 'Retira todo el jabón con abundante agua.', icon: CloudRain },
    { id: 10, text: 'Seca con toalla', desc: 'Usa toallas de papel desechables.', icon: FileText },
    { id: 11, text: 'Cierra el grifo', desc: 'Usa la misma toalla para no contaminar tus manos.', icon: Pointer },
    { id: 12, text: 'Manos seguras', desc: 'Tus manos están ahora limpias y seguras.', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 rounded-lg">
            <Hand className="text-sky-600" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-sky-800 dark:text-sky-400">Técnica de Lavado de Manos</h4>
            <p className="text-[10px] text-muted-foreground font-medium">Procedimiento estándar según la OMS (40-60 segundos)</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-1.5">
          <Sparkles size={12} className="text-green-600" />
          <span className="text-[10px] font-black text-green-700 uppercase">Seguridad</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {steps.map((step) => {
          const StepIcon = step.icon;
          return (
            <motion.div 
              key={step.id}
              whileHover={{ y: -2 }}
              className="p-3 bg-background border border-border rounded-2xl shadow-sm flex flex-col items-center text-center relative group"
            >
              <span className="absolute top-2 left-2 text-[10px] font-black text-muted-foreground/30">{step.id}</span>
              <div className="w-10 h-10 rounded-2xl bg-accent/50 flex items-center justify-center mb-2 group-hover:bg-sky-500/10 transition-colors">
                <StepIcon 
                  size={20} 
                  className={step.id === 12 ? "text-green-500" : "text-sky-500 group-hover:scale-110 transition-transform"} 
                />
              </div>
              <p className="text-[11px] font-bold leading-tight mb-1">{step.text}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <div className="w-1.5 h-full bg-sky-500 rounded-full shrink-0" />
        <p className="text-[10px] font-medium italic text-muted-foreground uppercase tracking-widest leading-relaxed">
          "Las manos limpias te protegen contra infecciones y salvan vidas en el entorno hospitalario."
        </p>
      </div>
    </div>
  );
};

export default HandHygieneBlock;
