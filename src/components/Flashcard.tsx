import React from 'react';
import { motion } from 'motion/react';
import { Disease } from '../medicalData';

interface FlashcardProps {
  disease: Disease;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ disease, isFlipped, onFlip }) => {
  return (
    <div className="w-full h-96 [perspective:1000px] cursor-pointer" onClick={onFlip}>
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full p-8 rounded-3xl bg-card border border-border shadow-lg [backface-visibility:hidden] flex flex-col items-center justify-center">
            <span className="text-xl font-black text-primary mb-4">{disease.servicio}</span>
            <h3 className="text-4xl font-black text-center text-foreground">{disease.nombre}</h3>
            {disease.subtitle && <p className="text-sm text-muted-foreground mt-2">{disease.subtitle}</p>}
            <p className="mt-8 text-xs text-muted-foreground font-medium uppercase tracking-widest">Haz clic para ver detalles</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full p-8 rounded-3xl bg-card border border-border shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
          <h4 className="text-xl font-black text-foreground mb-4 border-b border-border pb-2">{disease.nombre}</h4>
          
          <div className="space-y-4 text-sm">
            {disease.definicionCaso && (
              <div>
                <h5 className="font-bold text-primary">Definición</h5>
                <p className="text-muted-foreground">{disease.definicionCaso}</p>
              </div>
            )}
            {disease.etiologia && (
              <div>
                <h5 className="font-bold text-primary">Etiología</h5>
                <p className="text-muted-foreground">{disease.etiologia}</p>
              </div>
            )}
            {disease.fisiopatologia && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <h5 className="font-bold text-primary mb-2">Fisiopatología</h5>
                <p className="text-sm text-foreground">{disease.fisiopatologia.textoTecnico}</p>
                {disease.fisiopatologia.esquemaMental && (
                  <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                    <p><strong>Inicio:</strong> {disease.fisiopatologia.esquemaMental.inicio}</p>
                    <p><strong>Daño:</strong> {disease.fisiopatologia.esquemaMental.dano}</p>
                    <p><strong>Consecuencia:</strong> {disease.fisiopatologia.esquemaMental.consecuencia}</p>
                  </div>
                )}
              </div>
            )}
            {!disease.fisiopatologia && disease.fisiopatologiaBasica && (
              <div>
                <h5 className="font-bold text-primary">Fisiopatología</h5>
                <p className="text-muted-foreground">{disease.fisiopatologiaBasica}</p>
              </div>
            )}
            {disease.complicaciones && (
              <div>
                <h5 className="font-bold text-primary">Complicaciones</h5>
                <ul className="list-disc list-inside text-muted-foreground">
                  {disease.complicaciones.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
