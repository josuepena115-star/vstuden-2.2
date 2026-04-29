import React from 'react';
import { motion } from 'motion/react';
import { Accessibility, ArrowUpCircle, MoveHorizontal, Users, AlertTriangle, ShieldCheck, Info, ClipboardList } from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 bg-card border border-border shadow-sm rounded-3xl ${className}`}>
    {children}
  </div>
);

const PatientMobilizationBlock: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Principios de Mecánica Corporal */}
        <Card className="p-5 border-l-4 border-blue-500 bg-blue-50/30 dark:bg-blue-900/10">
          <h3 className="text-lg font-black mb-4 flex items-center text-blue-700 dark:text-blue-400">
            <Accessibility className="mr-2" size={20} /> Principios de Mecánica Corporal
          </h3>
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest font-bold font-mono">Leyes de la Biomecánica a favor del esfuerzo</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 1, title: 'Espalda Recta', desc: 'Permite que la carga actúe verticalmente sobre los discos.' },
              { id: 2, title: 'Piernas Flexionadas', desc: 'Usa la fuerza de cuadríceps y glúteos como motor principal.' },
              { id: 3, title: 'Carga Próxima', desc: 'A menor distancia, menor momento de fuerza y tensión vertebral.' },
              { id: 4, title: 'Presas Consistentes', desc: 'Usar las manos como "palas", no apretar con los dedos.' },
              { id: 5, title: 'Pies Separados', desc: 'Amplia base de apoyo; un pie orientado al movimiento.' },
              { id: 6, title: 'Uso de Contrapeso', desc: 'Utilizar el propio peso del cuerpo para facilitar el impulso.' },
            ].map((p) => (
              <div key={p.id} className="p-3 bg-background/60 rounded-xl border border-blue-100 dark:border-blue-900/20 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-black text-blue-500 mb-1 block">0{p.id}</span>
                <h4 className="text-sm font-bold mb-1">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-tight">{p.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Normas Generales y Preparación */}
        <Card className="p-5 border-l-4 border-orange-500 bg-orange-50/30 dark:bg-orange-900/10">
          <h3 className="text-lg font-black mb-4 flex items-center text-orange-700 dark:text-orange-400">
            <ClipboardList className="mr-2" size={20} /> Preparación y Ejecución (Decálogo)
          </h3>
          <div className="space-y-4">
            <div className="bg-background/60 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/20">
              <h4 className="text-xs font-black uppercase text-orange-600 mb-3 flex items-center">
                <Info size={14} className="mr-1.5" /> Antes de Actuar
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                <li className="text-xs flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 shrink-0" />
                  <span><strong>Evaluar el trabajo:</strong> Analizar peso, dependencia y entorno.</span>
                </li>
                <li className="text-xs flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 shrink-0" />
                  <span><strong>Planificar:</strong> Decidir técnica, medios mecánicos o ayuda de compañeros.</span>
                </li>
                <li className="text-xs flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 shrink-0" />
                  <span><strong>Informar al paciente:</strong> Explicar el movimiento y pedir su colaboración activa.</span>
                </li>
              </ul>
            </div>

            <div className="bg-background/60 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/20">
              <h4 className="text-xs font-black uppercase text-orange-600 mb-3 flex items-center">
                <ShieldCheck size={14} className="mr-1.5" /> Durante la Ejecución
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                <li className="text-xs flex items-center gap-2">
                   <ArrowUpCircle size={14} className="text-orange-500" />
                   <span>Orientar los pies en sentido del desplazamiento.</span>
                </li>
                <li className="text-xs flex items-center gap-2">
                   <ArrowUpCircle size={14} className="text-orange-500" />
                   <span>Bloqueo pélvico y abdomen contraído para proteger la espalda.</span>
                </li>
                <li className="text-xs flex items-center gap-2">
                   <ArrowUpCircle size={14} className="text-orange-500" />
                   <span>Utilizar puntos de apoyo (cabezal de cama, silla, etc).</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Técnicas de Transferencia */}
        <Card className="p-4 bg-accent/20 border-accent h-fit">
          <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center">
            <MoveHorizontal size={14} className="mr-1.5" /> Técnicas de Traslado
          </h4>
          <div className="space-y-2">
            <div className="p-2.5 bg-background border rounded-xl hover:border-primary transition-colors cursor-help group">
              <p className="text-sm font-bold text-foreground">Cama a Silla</p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Bloquear rodilla del paciente con la nuestra y pivotar usando contrapeso.
              </p>
            </div>
            <div className="p-2.5 bg-background border rounded-xl hover:border-primary transition-colors cursor-help group">
              <p className="text-sm font-bold text-foreground">Uso de "Entremetida"</p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Sábana doblada desde hombros a muslos para mover al paciente sin fricción.
              </p>
            </div>
            <div className="p-2.5 bg-background border rounded-xl hover:border-primary transition-colors cursor-help group">
              <p className="text-sm font-bold text-foreground">Transferencia a Camilla</p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Camilla frenada y pegada. Deslizar por tramos: hombros, caderas, piernas.
              </p>
            </div>
          </div>
        </Card>

        {/* Escenarios Críticos */}
        <Card className="p-4 bg-rose-500/5 border-rose-500/20 md:col-span-2">
          <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-rose-600 mb-3 flex items-center">
            <AlertTriangle size={14} className="mr-1.5" /> Casos Especiales y Seguridad
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-rose-700 uppercase">Levantamiento del Suelo:</p>
              <p className="text-xs text-muted-foreground">Nunca improvisar. Requiere mínimo 2 personas. Usar toalla/entremetida bajo axilas para levantamiento en bloque.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-rose-700 uppercase">Fractura de Cadera:</p>
              <p className="text-xs text-muted-foreground">Mantener piernas SEPARADAS (almohada entre ellas). Al elevar con grúa, sujetar la pierna operada para evitar dolor.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-blue-700 uppercase">Transporte en Rampas:</p>
              <p className="text-xs text-muted-foreground"><strong>Bajar:</strong> De espaldas, caminando hacia atrás. El paciente debe mirar siempre hacia el cuidador.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-blue-700 uppercase">Uso de Ascensores:</p>
              <p className="text-xs text-muted-foreground">Entrar con la cabecera primero. Salir con los pies abriendo el camino para evitar golpes.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
          <Accessibility className="text-primary" size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-primary">"Adopta siempre posturas correctas, tu espalda te lo agradecerá."</p>
          <p className="text-[10px] text-muted-foreground font-medium italic">Referencia: Manual de Movilización Manual de Pacientes - Sacyl</p>
        </div>
      </div>
    </div>
  );
};

export default PatientMobilizationBlock;
