import React, { useState } from 'react';
import { Shield, Droplet, CheckCircle2, ChevronRight, Activity, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SkinAndWoundsBlock = () => {
  const [activeTab, setActiveTab] = useState<'lpp' | 'escalas' | 'antisepsia'>('lpp');

  return (
    <div className="space-y-4 mt-8 bg-card border border-border rounded-xl p-5 shadow-sm overflow-hidden mb-6">
      <div className="flex items-center space-x-3 text-primary border-b border-border/50 pb-4 mb-4">
        <Shield size={28} />
        <h3 className="text-2xl font-bold">Herramientas de Valoración Cutánea</h3>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('lpp')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'lpp' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-transparent border-border hover:bg-accent'}`}
        >
          <Activity size={16} /> <span>Estadios LPP</span>
        </button>
        <button 
          onClick={() => setActiveTab('escalas')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'escalas' ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-transparent border-border hover:bg-accent'}`}
        >
          <AlertTriangle size={16} /> <span>Escala de Norton/Braden</span>
        </button>
        <button 
          onClick={() => setActiveTab('antisepsia')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'antisepsia' ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-transparent border-border hover:bg-accent'}`}
        >
          <Droplet size={16} /> <span>Protocolo Antisepsia</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lpp' && (
          <motion.div key="lpp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 pt-2">
            <h4 className="font-bold text-foreground">Guía Visual de Estadios de LPP</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 flex items-center justify-center text-xs font-bold">1</span>
                  <h5 className="font-bold text-red-800 dark:text-red-300">Estadio I</h5>
                </div>
                <p className="text-xs text-muted-foreground">Eritema no blanqueable en piel intacta. Piel enrojecida que no palidece al presionar.</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 flex items-center justify-center text-xs font-bold">2</span>
                  <h5 className="font-bold text-orange-800 dark:text-orange-300">Estadio II</h5>
                </div>
                <p className="text-xs text-muted-foreground">Pérdida parcial del grosor de la piel que afecta epidermis y/o dermis. Puede parecer una ampolla intacta o rota.</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 flex items-center justify-center text-xs font-bold">3</span>
                  <h5 className="font-bold text-amber-800 dark:text-amber-300">Estadio III</h5>
                </div>
                <p className="text-xs text-muted-foreground">Pérdida total del grosor de la piel. Grasa subcutánea visible, pero sin exposición de hueso, tendón o músculo.</p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200 flex items-center justify-center text-xs font-bold">4</span>
                  <h5 className="font-bold text-rose-800 dark:text-rose-300">Estadio IV</h5>
                </div>
                <p className="text-xs text-muted-foreground">Pérdida total del tejido con hueso, tendón o músculo expuesto. Puede haber esfacelo o escara.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'escalas' && (
          <motion.div key="escalas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 pt-2">
            <h4 className="font-bold text-orange-600 dark:text-orange-400">Escalas de Riesgo (Norton & Braden)</h4>
            <div className="space-y-6">
              <div className="bg-accent/30 p-4 rounded-xl border border-border">
                <h5 className="font-bold text-sm mb-3 text-foreground">Escala de Norton (Riesgo de Úlceras)</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse bg-card rounded-lg overflow-hidden border border-border">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="p-2 border border-border">1 Puntos</th>
                        <th className="p-2 border border-border">2 Puntos</th>
                        <th className="p-2 border border-border">3 Puntos</th>
                        <th className="p-2 border border-border">4 Puntos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-border"><strong>Estado Físico:</strong> Muy malo</td>
                        <td className="p-2 border border-border">Malo</td>
                        <td className="p-2 border border-border">Regular</td>
                        <td className="p-2 border border-border">Bueno</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border"><strong>Estado Mental:</strong> Estuporoso/Comatoso</td>
                        <td className="p-2 border border-border">Confuso</td>
                        <td className="p-2 border border-border">Apático</td>
                        <td className="p-2 border border-border">Alerta</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border"><strong>Actividad:</strong> Encamado</td>
                        <td className="p-2 border border-border">Sentado/Silla de ruedas</td>
                        <td className="p-2 border border-border">Camina con ayuda</td>
                        <td className="p-2 border border-border">Ambulante</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border"><strong>Movilidad:</strong> Inmóvil</td>
                        <td className="p-2 border border-border">Muy limitada</td>
                        <td className="p-2 border border-border">Disminuida</td>
                        <td className="p-2 border border-border">Plena</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border"><strong>Incontinencia:</strong> Doble (Urinaria y Fecal)</td>
                        <td className="p-2 border border-border">Urinaria o Fecal</td>
                        <td className="p-2 border border-border">Ocasional</td>
                        <td className="p-2 border border-border">Ninguna</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 font-medium bg-background p-2 rounded border border-border/50">
                  <strong className="text-red-500">5 - 11 pts:</strong> Alto Riesgo | 
                  <strong className="text-orange-500"> 12 - 14 pts:</strong> Riesgo Evidente/Medio | 
                  <strong className="text-green-500"> &gt; 14 pts:</strong> Riesgo Mínimo/No Riesgo.
                </p>
              </div>

              <div className="bg-accent/30 p-4 rounded-xl border border-border">
                <h5 className="font-bold text-sm mb-3 text-foreground">Escala de Braden (Riesgo de LPP)</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse bg-card rounded-lg overflow-hidden border border-border">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="p-2 border border-border">Parámetro</th>
                        <th className="p-2 border border-border">1 Punto</th>
                        <th className="p-2 border border-border">2 Puntos</th>
                        <th className="p-2 border border-border">3 Puntos</th>
                        <th className="p-2 border border-border">4 Puntos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-border font-bold">Percepción Sensorial</td>
                        <td className="p-2 border border-border">Completamente limitada</td>
                        <td className="p-2 border border-border">Muy limitada</td>
                        <td className="p-2 border border-border">Ligeramente limitada</td>
                        <td className="p-2 border border-border">Sin limitaciones</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border font-bold">Humedad</td>
                        <td className="p-2 border border-border">Constantemente húmeda</td>
                        <td className="p-2 border border-border">A menudo húmeda</td>
                        <td className="p-2 border border-border">Ocasionalmente húmeda</td>
                        <td className="p-2 border border-border">Raramente húmeda</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border font-bold">Actividad</td>
                        <td className="p-2 border border-border">Encamado</td>
                        <td className="p-2 border border-border">En silla</td>
                        <td className="p-2 border border-border">Deambula ocasionalmente</td>
                        <td className="p-2 border border-border">Deambula frecuentemente</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border font-bold">Movilidad</td>
                        <td className="p-2 border border-border">Completamente inmóvil</td>
                        <td className="p-2 border border-border">Muy limitada</td>
                        <td className="p-2 border border-border">Ligeramente limitada</td>
                        <td className="p-2 border border-border">Sin limitaciones</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border font-bold">Nutrición</td>
                        <td className="p-2 border border-border">Muy pobre</td>
                        <td className="p-2 border border-border">Probablemente inadecuada</td>
                        <td className="p-2 border border-border">Adecuada</td>
                        <td className="p-2 border border-border">Excelente</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-border font-bold">Fricción / Cizallamiento</td>
                        <td className="p-2 border border-border">Problema</td>
                        <td className="p-2 border border-border">Riesgo potencial</td>
                        <td className="p-2 border border-border" colSpan={2}>No existe problema aparente (Max 3 pts)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 font-medium bg-background p-2 rounded border border-border/50">
                  <strong className="text-red-500">&lt; 12 pts:</strong> Alto Riesgo | 
                  <strong className="text-orange-500"> 13 - 14 pts:</strong> Riesgo Moderado | 
                  <strong className="text-green-500"> 15 - 16 pts:</strong> Riesgo Bajo. (Max 23 pts)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'antisepsia' && (
          <motion.div key="antisepsia" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 pt-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">Protocolo de Antisepsia</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse rounded-lg overflow-hidden">
                <thead className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  <tr>
                    <th className="p-3">Antiséptico</th>
                    <th className="p-3">Uso Principal / Indicación</th>
                    <th className="p-3">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 bg-card">
                    <td className="p-3 font-bold text-foreground">Clorhexidina (2% - 4%)</td>
                    <td className="p-3 text-muted-foreground">Preparación preoperatoria de la piel, catéteres venosos centrales. Heridas abiertas.</td>
                    <td className="p-3 text-muted-foreground text-xs">Acción prolongada. Puede ser tóxica para oído medio y ojos (evitar en cara/cabeza).</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-accent/20">
                    <td className="p-3 font-bold text-foreground">Povidona Yodada (10%)</td>
                    <td className="p-3 text-muted-foreground">Mucosas (vaginal, oral diluida), piel intacta antes de procedimientos quirúrgicos rápidos.</td>
                    <td className="p-3 text-muted-foreground text-xs">Se inactiva con materia orgánica. Contraindicada en alergia al yodo o alteraciones tiroideas.</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-card">
                    <td className="p-3 font-bold text-foreground">Alcohol (70%)</td>
                    <td className="p-3 text-muted-foreground">Desinfección de piel intacta para venopunción, limpieza de viales.</td>
                    <td className="p-3 text-muted-foreground text-xs">No usar en heridas abiertas (doloroso, daña tejido celular). Secado rápido.</td>
                  </tr>
                  <tr className="bg-accent/20">
                    <td className="p-3 font-bold text-foreground">Suero Fisiológico</td>
                    <td className="p-3 text-muted-foreground">Irrigación y limpieza de heridas (arrastre mecánico).</td>
                    <td className="p-3 text-muted-foreground text-xs">De elección para lavar heridas limpias y mantener tejido de granulación.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
