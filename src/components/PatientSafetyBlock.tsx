import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  UserCheck, 
  Pill, 
  Scissors, 
  Hand, 
  AlertCircle, 
  MessageSquare,
  ClipboardCheck,
  Stethoscope
} from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 bg-card border border-border shadow-sm rounded-3xl ${className}`}>
    {children}
  </div>
);

const PatientSafetyBlock: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identificación Correcta */}
        <Card className="border-l-4 border-emerald-500">
          <h4 className="text-lg font-black mb-4 flex items-center text-emerald-700 dark:text-emerald-400">
            <UserCheck className="mr-2" size={20} /> Identificación del Paciente
          </h4>
          <div className="space-y-3">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2 uppercase">Protocolo de Verificación Cruzada</p>
              <ul className="text-xs space-y-1.5 text-muted-foreground">
                <li className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5" />
                  <span><strong>Identificadores:</strong> Dos nombres y dos apellidos completos + Número de Cédula/Identidad.</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5" />
                  <span><strong>Brazalete:</strong> Colocación obligatoria al ingreso. Verificar legibilidad y concordancia con historia clínica.</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Admisión / Ingreso', 'Adm. Medicamentos', 'Toma de Muestras', 'Traslados'].map((m) => (
                <div key={m} className="p-2 border border-border rounded-xl text-[10px] text-center font-bold bg-background">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Medicación Segura */}
        <Card className="border-l-4 border-amber-500">
          <h4 className="text-lg font-black mb-4 flex items-center text-amber-700 dark:text-amber-400">
            <Pill className="mr-2" size={20} /> Prácticas de Medicación
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-2xl">
                <p className="text-[10px] font-black text-red-600 uppercase mb-1">Medicamentos de Alto Riesgo</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Anticoagulantes, Insulinas, Opiáceos y Electrolitos Concentrados (KCL al 20%).</p>
              </div>
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Medicamentos LASA</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Drogas que se parecen físicamente o suenan igual. Doble chequeo obligatorio.</p>
              </div>
            </div>
            <ul className="text-[11px] space-y-1 text-muted-foreground italic bg-background/50 p-2 rounded-lg border border-border">
              <li>• Verificación de los "10 Correctos" en la administración.</li>
              <li>• Rotulación diferenciada con etiqueta roja para alto riesgo.</li>
              <li>• Uso racional de antibióticos profilácticos (0-60 min pre-incisión).</li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Higiene de Manos */}
        <Card className="md:col-span-1 bg-sky-500/5 border-sky-500/20">
          <h4 className="text-sm font-black mb-3 flex items-center text-sky-700">
            <Hand className="mr-2" size={18} /> Los 5 Momentos (OMS)
          </h4>
          <div className="space-y-2">
            {[
              'Antes del contacto con el paciente',
              'Antes de tarea aséptica/limpia',
              'Después del riesgo de exposición a fluidos',
              'Después del contacto con el paciente',
              'Después del contacto con el entorno'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 p-1.5 bg-background border border-sky-100 rounded-xl">
                 <span className="text-[10px] font-black w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">{i+1}</span>
                 <span className="text-[10px] font-medium leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Seguridad Quirúrgica */}
        <Card className="md:col-span-1 border-dashed border-2">
          <h4 className="text-sm font-black mb-3 flex items-center text-primary">
            <Scissors className="mr-2" size={18} /> Seguridad Quirúrgica
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold border-b pb-1">
                <span>FASE</span>
                <span className="text-muted-foreground uppercase">Objetivo Clave</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px]">ENTRADA</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-accent rounded">Identidad y Sitio</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px]">PAUSA</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-accent rounded">Prevención de Eventos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px]">SALIDA</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-accent rounded">Recuento e Instrumental</span>
                </div>
              </div>
            </div>
            <div className="p-2 bg-primary/5 rounded-xl border border-primary/20">
               <p className="text-[10px] font-medium italic text-center">"Marcaje del sitio quirúrgico es responsabilidad del cirujano."</p>
            </div>
          </div>
        </Card>

        {/* Escalas de Riesgo */}
        <Card className="md:col-span-1 bg-rose-500/5 border-rose-500/10">
          <h4 className="text-sm font-black mb-3 flex items-center text-rose-700">
            <AlertCircle className="mr-2" size={18} /> Prevención de Riesgos
          </h4>
          <div className="space-y-3">
            <div className="p-2.5 bg-background border border-rose-100 rounded-2xl shadow-sm">
              <p className="text-[10px] font-black uppercase text-rose-600">Riesgo de Caídas</p>
              <p className="text-[11px] font-bold">Escala de Morse (Adultos)</p>
              <p className="text-[10px] text-muted-foreground">Macdems para Pediatría. Vigilancia constante de barandillas.</p>
            </div>
            <div className="p-2.5 bg-background border border-orange-100 rounded-2xl shadow-sm">
              <p className="text-[10px] font-black uppercase text-orange-600">Úlceras por Presión</p>
              <p className="text-[11px] font-bold">Escala de Braden / Norton</p>
              <p className="text-[10px] text-muted-foreground">Cambios posturales cada 2-4 horas. Protección de prominencias.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Comunicación SBAR */}
        <div className="bg-indigo-600 text-white rounded-[32px] p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-3 flex items-center">
              <MessageSquare className="mr-2" size={16} /> Comunicación SBAR / SAER
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-xl">
                <span className="text-[18px] font-black block leading-none">S</span>
                <span className="text-[10px] font-bold uppercase block opacity-80">Situación</span>
                <p className="text-[10px] leading-tight mt-1 opacity-70">¿Qué está pasando ahora?</p>
              </div>
              <div className="p-2 bg-white/10 rounded-xl">
                <span className="text-[18px] font-black block leading-none">A</span>
                <span className="text-[10px] font-bold uppercase block opacity-80">Antecedentes</span>
                <p className="text-[10px] leading-tight mt-1 opacity-70">Contexto clínico relevante.</p>
              </div>
              <div className="p-2 bg-white/10 rounded-xl">
                <span className="text-[18px] font-black block leading-none">E</span>
                <span className="text-[10px] font-bold uppercase block opacity-80">Evaluación</span>
                <p className="text-[10px] leading-tight mt-1 opacity-70">Mi análisis de la situación.</p>
              </div>
              <div className="p-2 bg-white/10 rounded-xl">
                <span className="text-[18px] font-black block leading-none">R</span>
                <span className="text-[10px] font-bold uppercase block opacity-80">Recomendación</span>
                <p className="text-[10px] leading-tight mt-1 opacity-70">¿Qué sugiero que se haga?</p>
              </div>
            </div>
          </div>
          <p className="text-[10px] font-bold italic opacity-60">* Esencial en transferencias y avisos a médicos.</p>
        </div>

        {/* Prácticas Administrativas y Mixtas */}
        <div className="bg-slate-800 text-slate-100 rounded-[32px] p-5">
           <h4 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center">
              <ClipboardCheck className="mr-2" size={16} /> Gestión y Notificación
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-300 uppercase">Cultura de Seguridad:</p>
                <p className="text-[10px] text-slate-400">Notificación de eventos adversos, cuasi-eventos y centinelas. Cultura proactiva, no punitiva para aprender de los fallos.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-primary mb-1 uppercase">Eventos Centinela</p>
                  <p className="text-[9px] text-slate-400">Hecho inesperado que involucra muerte o daño físico/psicológico grave.</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-400 mb-1 uppercase">Conciliación</p>
                  <p className="text-[9px] text-slate-400">Asegurar que la lista de medicamentos sea exacta en cada transición.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSafetyBlock;
