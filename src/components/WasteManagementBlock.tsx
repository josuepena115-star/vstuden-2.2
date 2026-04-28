import React from 'react';
import { Trash2, AlertCircle, ShieldAlert, Scissors, ClipboardList } from 'lucide-react';

export const WasteManagementBlock = () => {
  return (
    <div className="space-y-4 mt-8 bg-card border border-border rounded-xl p-5 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border/50 pb-3 mb-4">
        <Trash2 size={24} className="text-primary"/> 
        <h5 className="font-bold text-xl text-primary">Gestión de Desechos y Bioseguridad Hospitalaria</h5>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        La bioseguridad y el control de infecciones nosocomiales dependen críticamente de la separación de los desechos en la fuente. Este procedimiento evita contaminaciones cruzadas y riesgos para el personal asistencial y el servicio de limpieza, avalado por normativas del Ministerio de Salud Pública.
      </p>
      
      <div className="space-y-6">
        
        {/* Desechos Comunes */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 rounded-lg">
          <div className="flex flex-col items-center justify-start w-full md:w-32 shrink-0">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-md mb-2">
              <Trash2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-[10px] sm:text-xs uppercase text-center text-gray-700 dark:text-gray-300">Desechos Comunes</span>
          </div>
          <div className="flex-1 space-y-2 text-sm text-foreground">
            <p className="font-semibold">Recipiente: <span className="font-normal text-muted-foreground">Tacho NEGRO y funda NEGRA rotulada.</span></p>
            <div>
              <strong className="text-xs uppercase text-muted-foreground">Manejo, Cuidados y Precauciones:</strong> 
              <ul className="list-disc pl-4 mt-1 text-xs space-y-1">
                <li><strong>No exceder la capacidad al 75%</strong> o sus tres cuartas partes (deben poder cerrarse de forma segura).</li>
                <li><strong>Prohibición:</strong> Nunca depositar material sanguinolento o con patógenos (la disposición es en botaderos normales, podría desencadenar brotes comunitarios si hay errores).</li>
                <li>Manejo interno generalizado y constante, cierre siempre manual tipo corbata.</li>
              </ul>
            </div>
            <div className="bg-background border p-2 rounded text-xs">
              <strong className="block mb-1 text-foreground">5 Ejemplos:</strong>
              <span className="text-muted-foreground">1) Toallas de papel del secado de manos. 2) Restos de comida común (no de pacientes con medidas de aislamiento). 3) Empaques vacíos de jeringas y guantes. 4) Pañales comunes (heces/orina de pacientes sin multirresistentes). 5) Gorros o batas no utilizados en cirugías ni manchados.</span>
            </div>
          </div>
        </div>

        {/* Desechos Biológico-Infecciosos */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-red-50/80 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg">
          <div className="flex flex-col items-center justify-start w-full md:w-32 shrink-0">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-md mb-2">
              <AlertCircle size={20} className="text-white" />
            </div>
            <span className="font-bold text-[10px] sm:text-xs uppercase text-center text-red-700 dark:text-red-400">Biológico Infecciosos</span>
          </div>
          <div className="flex-1 space-y-2 text-sm text-foreground">
            <p className="font-semibold text-red-900 dark:text-red-200">Recipiente: <span className="font-normal text-red-800 dark:text-red-300">Tacho ROJO (con símbolo de riesgo biológico) y funda ROJA.</span></p>
            <div>
              <strong className="text-xs uppercase text-red-700/80 dark:text-red-400/80">Manejo, Cuidados y Precauciones:</strong> 
              <ul className="list-disc pl-4 mt-1 text-xs space-y-1 text-red-900/80 dark:text-red-200/80">
                <li>La funda debe recubrir un tercio del recipiente hacia afuera.</li>
                <li><strong>Cierre seguro:</strong> Al alcanzar 3/4 (máximo 10 kg), doblar el borde y anudar extrayendo el aire. Transportar en coche contenedor cubierto para evitar exposición pública.</li>
                <li>Cuidado del Recipiente: Lavar periódicamente con equipo de protección pesado (botas de caucho, guantes industriales o de nitrilo, gafa, delantal impermeable) utilizando hipoclorito de sodio al 0.5% (5,000 ppm) ante derrames biológicos.</li>
              </ul>
            </div>
            <div className="bg-background/80 border border-red-200 dark:border-red-900/20 p-2 rounded text-xs">
              <strong className="block mb-1 text-red-800 dark:text-red-300">5 Ejemplos:</strong>
              <span className="text-red-700 dark:text-red-400">1) Gasas impregnadas con sangre o fluidos biológicos. 2) Cuerpos de jeringas donde el fluido tocó el tambor plástico. 3) Materiales descartables de aislamiento respiratorio (mascarillas, guantes, batas). 4) Cultivos microbianos y placas de Petri del laboratorio. 5) Tubos de sangre ya procesados y vaciados (sin aguja).</span>
            </div>
          </div>
        </div>

        {/* Desechos Cortopunzantes */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-yellow-50/80 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-700/50 rounded-lg">
          <div className="flex flex-col items-center justify-start w-full md:w-32 shrink-0">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md mb-2">
              <ShieldAlert size={20} className="text-yellow-900" />
            </div>
            <span className="font-bold text-[10px] sm:text-xs uppercase text-center text-yellow-800 dark:text-yellow-500">Corto Punzantes</span>
          </div>
          <div className="flex-1 space-y-2 text-sm text-foreground">
            <p className="font-semibold text-yellow-900 dark:text-yellow-200">Recipiente: <span className="font-normal text-yellow-800 dark:text-yellow-300">Guardián RÍGIDO, inquebrantable, con orificio angosto limitante.</span></p>
            <div>
              <strong className="text-xs uppercase text-yellow-700/80 dark:text-yellow-500/80">Manejo, Cuidados y Precauciones:</strong> 
              <ul className="list-disc pl-4 mt-1 text-xs space-y-1 text-yellow-900/80 dark:text-yellow-200/80">
                <li>Son el insumo con <strong>mayor riesgo de transmisión post-quirúrgica (VHB, VHC, VIH).</strong> NUNCA se sobrepasa el 75% o "línea de seguridad".</li>
                <li><strong>Prohibiciones:</strong> No re-encapsular agujas a dos manos (Usar técnica de una mano en gancho o descartar directo), ni intentar introducir objetos apretándolos con el pulgar.</li>
                <li>En caso de <strong>Pinchazo Accidental:</strong> Promover el sangrado por la herida, lavar de inmediato con abundante agua y jabón, <em>no restregar, no usar alcohol u otro desinfectante en la herida</em> y notificar inmediato (protocolo profiláctico pre-72h).</li>
              </ul>
            </div>
            <div className="bg-background/80 border border-yellow-200 dark:border-yellow-800/30 p-2 rounded text-xs">
              <strong className="block mb-1 text-yellow-800 dark:text-yellow-400">5 Ejemplos:</strong>
              <span className="text-yellow-700 dark:text-yellow-500">1) Agujas hipodérmicas y de sutura. 2) Hojas de bisturí para diéresis. 3) Lancetas / punzones de glucómetro. 4) Ampolletas de vidrio fracturadas (hayan contenido o no sangre/medicamento). 5) Catéteres venosos en su componente aguja o mandril metálico rígido.</span>
            </div>
          </div>
        </div>

        {/* Anatomopatológicos  */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-900/30 rounded-lg">
          <div className="flex flex-col items-center justify-start w-full md:w-32 shrink-0">
            <div className="w-12 h-12 bg-cyan-600 rounded flex items-center justify-center shadow-md mb-2">
              <Scissors size={20} className="text-white" />
            </div>
            <span className="font-bold text-[10px] sm:text-xs uppercase text-center text-cyan-800 dark:text-cyan-400">Anatomo Patológicos</span>
          </div>
          <div className="flex-1 space-y-2 text-sm text-foreground">
            <p className="font-semibold text-cyan-900 dark:text-cyan-200">Recipiente: <span className="font-normal text-cyan-800 dark:text-cyan-300">Funda ROJA fuerte (o envases herméticos para morgues, en caso de fluidos a granel).</span></p>
            <div>
              <strong className="text-xs uppercase text-cyan-700/80 dark:text-cyan-500/80">Manejo, Cuidados y Precauciones:</strong> 
              <ul className="list-disc pl-4 mt-1 text-xs space-y-1 text-cyan-900/80 dark:text-cyan-200/80">
                <li>Su descomposición atrae vectores rápidos; requieren ser enviados al <strong>cuarto frío / congelador</strong> (4 a 18°C) o sufrir de procesos orgánicos de inactivación.</li>
                <li>Fluidificación preventiva: Utilizar compuestos solidificantes/químicos resecantes o "baño en formol al 5%/10%" en un lapso no superior a 30 minutos desde la extracción en la mesa si no dispone de manejo frío primario inmediato.</li>
              </ul>
            </div>
            <div className="bg-background/80 border border-cyan-100 dark:border-cyan-900/20 p-2 rounded text-xs">
              <strong className="block mb-1 text-cyan-800 dark:text-cyan-400">5 Ejemplos:</strong>
              <span className="text-cyan-700 dark:text-cyan-500">1) Miembros y extremidades amputadas post-trauma o gangrena. 2) Placentas y tejidos ovulares (si la madre no exige su devolución para prácticas culturales). 3) Órganos ablacionables (vesícula biliar, matriz, tiroides). 4) Piezas biopsiadas y fijadas temporalmente de cirugías exploratorias. 5) Sangre / fluidos de drenaje quirófano aspirados a granel y coagulados ex-profeso.</span>
            </div>
          </div>
        </div>

        {/* Fármacos y Especiales */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-orange-50/50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-lg">
          <div className="flex flex-col items-center justify-start w-full md:w-32 shrink-0">
            <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center shadow-md mb-2">
              <ClipboardList size={20} className="text-white" />
            </div>
            <span className="font-bold text-[10px] sm:text-xs uppercase text-center text-orange-800 dark:text-orange-400">Farmacéuticos y Especiales</span>
          </div>
          <div className="flex-1 space-y-2 text-sm text-foreground">
            <p className="font-semibold text-orange-900 dark:text-orange-200">Recipiente: <span className="font-normal text-orange-800 dark:text-orange-300">Caja de CARTÓN con funda roja (fármacos) / Envases rígidos de seguridad y cubetos para tóxicos / radiactivos en aislamiento plúmbico.</span></p>
            <div>
              <strong className="text-xs uppercase text-orange-700/80 dark:text-orange-500/80">Manejo, Cuidados y Precauciones:</strong> 
              <ul className="list-disc pl-4 mt-1 text-xs space-y-1 text-orange-900/80 dark:text-orange-200/80">
                <li>Los fármacos e hidrocarburos volátiles NUNCA se mezclan, se respeta la <strong>compatibilidad clínica de sustancias peligrosas</strong> para evitar incendios, vapores corrosivos u oxidantes en áreas estériles.</li>
                <li>Roturas por Mercurio: En caso de romperse dispositivos (como termómetros antiguos o esfingomanómetros), NUNCA usar pañales, aspiradora ni tocar sin equipo protector. Se requiere ventilación obligatoria de 24 horas y recogido granular (p.ej. azufre).</li>
              </ul>
            </div>
            <div className="bg-background/80 border border-orange-100 dark:border-orange-900/20 p-2 rounded text-xs">
              <strong className="block mb-1 text-orange-800 dark:text-orange-400">5 Ejemplos:</strong>
              <span className="text-orange-700 dark:text-orange-500">1) Restos de medicamentos vencidos en la sala de enfermería o piso. 2) Insumos contaminados con fármacos Citotóxicos oncogénicos. 3) Termómetro oral a base de Mercurio estallado. 4) Solventes halogénicos y corrosivos caducados (formaldehídos líquidos al 2-8%, ácidos). 5) Residuos Radiactivos exentos (ej. algodones, tirillas del laboratorio clínico y medicina nuclear o rayos X odontológicos).</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
