const fs = require('fs');

const code = `import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Save, X } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { GoogleGenAI } from '@google/genai';

interface ScheduleImporterProps {
  userUid: string;
  onSuccess?: () => void;
}

interface ParsedShift {
  date: string;
  type: string;
  servicio: string;
  startTime: string;
  endTime: string;
}

export const ScheduleImporter: React.FC<ScheduleImporterProps> = ({ userUid, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewShifts, setPreviewShifts] = useState<ParsedShift[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast.error('Por favor suba una imagen o archivo PDF');
      return;
    }

    setIsProcessing(true);
    setPreviewShifts(null);
    const toastId = toast.loading('Analizando documento con Inteligencia Artificial...');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env.GEMINI_API_KEY;
          
          if (!apiKey) {
             toast.error('API Key de Gemini no configurada');
             toast.dismiss(toastId);
             setIsProcessing(false);
             return;
          }

          const ai = new GoogleGenAI({ apiKey });
          
          const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    inlineData: {
                      data: base64Data,
                      mimeType: file.type
                    }
                  },
                  {
                    text: 'Extrae los horarios de turno de este documento. Responde ÚNICAMENTE con un objeto JSON válido, sin delimitadores de markdown (\`\`\`json). El JSON debe seguir este esquema exacto para los turnos extraídos, deduciendo el año actual si no está presente: {"shifts":[{"date":"YYYY-MM-DD","type":"Mañana" o "Tarde" o "Guardia 12h" o "Guardia 24h","servicio":"Nombre del Servicio","startTime":"HH:00","endTime":"HH:00"}]}'
                  }
                ]
              }
            ],
            config: {
              temperature: 0.2
            }
          });

          let jsonStr = response.text || '';
          if (jsonStr.includes('\`\`\`json')) {
            jsonStr = jsonStr.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
          }
          jsonStr = jsonStr.trim();
          
          let parsed;
          try {
             parsed = JSON.parse(jsonStr);
          } catch(e) {
             console.error("Failed to parse JSON:", jsonStr);
             throw new Error("Formato de respuesta inválido");
          }

          if (parsed && Array.isArray(parsed.shifts) && parsed.shifts.length > 0) {
             setPreviewShifts(parsed.shifts);
             toast.success('Horarios extraídos con éxito', { id: toastId });
          } else {
             toast.error('No se detectaron horarios en el documento', { id: toastId });
          }
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || 'Ocurrió un error extrayendo la información', { id: toastId });
        } finally {
          setIsProcessing(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
    } catch (err: any) {
      toast.error('Error al procesar el archivo', { id: toastId });
      setIsProcessing(false);
    }
  };

  const shiftColors: Record<string, string> = {
    'Mañana': '#3b82f6',
    'Tarde': '#f59e0b',
    'Guardia 12h': '#8b5cf6',
    'Guardia 24h': '#ef4444'
  };

  const handleSaveShifts = async () => {
    if (!previewShifts || previewShifts.length === 0) return;
    
    const toastId = toast.loading("Guardando " + previewShifts.length + " turnos...");
    let count = 0;
    
    try {
      for (const shift of previewShifts) {
         const shiftColor = shiftColors[shift.type] || '#10b981';
         await addDoc(collection(db, 'shifts'), {
            uid: userUid,
            title: (shift.type?.substring(0, 1) || 'T') + ": " + shift.servicio,
            date: shift.date,
            startTime: shift.startTime || '07:00',
            endTime: shift.endTime || '19:00',
            type: shift.type || 'Otro',
            color: shiftColor
         });
         count++;
      }
      toast.success("¡" + count + " turnos guardados exitosamente!", { id: toastId });
      setPreviewShifts(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error('Ocurrió un error guardando los turnos', { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      {!previewShifts ? (
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer text-center"
             onClick={() => !isProcessing && fileInputRef.current?.click()}>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,.pdf" 
            onChange={handleFileUpload} 
          />
          {isProcessing ? (
            <Loader2 className="w-12 h-12 text-primary mb-4 animate-spin" />
          ) : (
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
          )}
          <h4 className="font-bold text-lg mb-2">
            {isProcessing ? 'Procesando documento...' : 'Subir Horario (PDF/Imagen)'}
          </h4>
          <p className="text-sm text-muted-foreground max-w-sm">
            Sube una foto o PDF de tu horario. La IA extraerá los turnos automáticamente.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-xl bg-background overflow-hidden relative">
           <div className="bg-primary/10 p-4 border-b border-border flex justify-between items-center">
              <h4 className="font-bold text-primary flex items-center">
                 <CheckCircle2 className="w-5 h-5 mr-2" />
                 Turnos Extraídos ({previewShifts.length})
              </h4>
              <button 
                onClick={() => setPreviewShifts(null)}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                title="Descartar y subir otro"
              >
                 <X className="w-5 h-5" />
              </button>
           </div>
           <div className="max-h-[300px] overflow-y-auto p-4 space-y-3">
              {previewShifts.map((shift, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border bg-accent/5">
                   <div>
                     <p className="font-bold text-sm">{shift.servicio}</p>
                     <p className="text-xs text-muted-foreground">{shift.date} • {shift.type}</p>
                   </div>
                   <div className="text-right text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                     {shift.startTime} - {shift.endTime}
                   </div>
                </div>
              ))}
           </div>
           <div className="p-4 border-t border-border bg-accent/5">
             <button 
               onClick={handleSaveShifts}
               className="w-full flex justify-center items-center py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
             >
               <Save className="w-5 h-5 mr-2" />
               Confirmar y Guardar Turno(s)
             </button>
           </div>
        </div>
      )}
    </div>
  );
};`;

fs.writeFileSync('src/components/ScheduleImporter.tsx', code);
