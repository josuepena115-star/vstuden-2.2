import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Save, X, ClipboardList, Clock } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { auth, getDb } from '../firebase';
import { toast } from 'sonner';

export default function HandoverNoteAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Web Speech API check
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-EC';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setNoteContent(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast.error('Error en el dictado por voz');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Tu navegador no soporta dictado por voz');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
      toast.info('Escuchando... Dicta tu nota de relevo');
    }
  };

  const handleSave = async () => {
    if (!noteContent.trim() || !auth.currentUser) return;
    setIsSaving(true);

    try {
      // Find today's shift to set the reminder 30 mins before end
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const q = query(
        collection(getDb(), 'shifts'), 
        where('uid', '==', auth.currentUser.uid),
        where('date', '==', todayStr)
      );
      const shiftSnap = await getDocs(q);
      let reminderAt = null;

      if (!shiftSnap.empty) {
        const shiftData = shiftSnap.docs[0].data();
        const endTime = new Date(`${shiftData.date}T${shiftData.endTime}`);
        // Set reminder 30 mins before end
        const reminderDate = new Date(endTime.getTime() - 30 * 60000);
        
        // Only set if reminder is in the future
        if (reminderDate > now) {
            reminderAt = reminderDate.toISOString();
        }
      }

      await addDoc(collection(getDb(), 'notes'), {
        uid: auth.currentUser.uid,
        title: 'Nota de Relevo',
        content: noteContent,
        reminderAt: reminderAt,
        notified: false,
        createdAt: serverTimestamp(),
        type: 'relevo'
      });

      toast.success('Nota de relevo guardada', {
        description: reminderAt ? 'Se ha programado un recordatorio para 30 min antes de terminar tu turno.' : 'Guardada sin recordatorio (turno no encontrado o ya pasado).'
      });
      setNoteContent('');
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar la nota');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-sky-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 group border-4 border-white dark:border-zinc-900"
        title="Nueva Nota de Relevo"
      >
        <ClipboardList size={24} />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Nota de Relevo
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-background w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-border"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-accent/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Nueva Nota de Relevo</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Dictado por Voz Activo</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-accent rounded-xl transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="relative">
                  <textarea
                    autoFocus
                    className="w-full h-48 bg-accent/10 border border-border rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none transition-all resize-none"
                    placeholder="Describe los pendientes para el siguiente relevo o dicta por voz..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                  />
                  
                  <button
                    onClick={toggleListening}
                    className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20' : 'bg-sky-500/10 text-sky-600 hover:bg-sky-500/20'}`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                    <Clock size={18} className="text-sky-500" />
                    <p className="text-xs font-medium text-sky-700 dark:text-sky-400">
                        Se programará un recordatorio automático 30 min antes de finalizar tu jornada de hoy.
                    </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 bg-accent text-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent/80 transition-all"
                  >
                    Descartar
                  </button>
                  <button
                    disabled={isSaving || !noteContent.trim()}
                    onClick={handleSave}
                    className="flex-1 py-4 bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSaving ? 'Guardando...' : 'Guardar Nota'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
