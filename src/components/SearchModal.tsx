import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, getDb } from '../firebase';
import { Search, X, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MyNote } from './MyNotes';

export default function SearchModal({
  isOpen, 
  onClose, 
  onNavigateToNotes 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onNavigateToNotes: () => void;
}) {
  const [queryText, setQueryText] = useState('');
  const [notes, setNotes] = useState<MyNote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQueryText('');
      setNotes([]);
      // Load all notes for the user so we can filter them locally since Firestore doesn't do full text search
      if (auth.currentUser) {
        setLoading(true);
        const q = query(collection(getDb(), 'notes'), where('uid', '==', auth.currentUser.uid));
        getDocs(q).then((snapshot) => {
          const fetchedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MyNote));
          setNotes(fetchedNotes);
        }).finally(() => {
          setLoading(false);
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredNotes = queryText.trim() === '' ? [] : notes.filter(n => {
    const term = queryText.toLowerCase();
    return (n.title || '').toLowerCase().includes(term) || (n.content || '').toLowerCase().includes(term);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 flex flex-col"
      >
        <div className="relative p-4 border-b border-border flex items-center">
          <Search className="text-muted-foreground mr-3" size={20} />
          <input 
            type="text" 
            autoFocus
            placeholder="Buscar notas por título o contenido..." 
            className="flex-grow bg-transparent text-lg font-medium outline-none placeholder:text-muted-foreground"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading ? (
             <div className="p-8 text-center text-muted-foreground">Cargando notas...</div>
          ) : queryText.trim() === '' ? (
             <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                 <Search size={48} className="opacity-20 mb-4" />
                 <p className="font-medium">Ingresa palabras clave para buscar en tus notas.</p>
             </div>
          ) : filteredNotes.length === 0 ? (
             <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                 <Edit3 size={48} className="opacity-20 mb-4" />
                 <p className="font-medium">No se encontraron notas que coincidan.</p>
             </div>
          ) : (
            <div className="space-y-2 p-2">
              <p className="text-xs font-bold text-muted-foreground uppercase px-2 mb-2">Resultados en Notas</p>
              {filteredNotes.map(note => (
                <div 
                  key={note.id}
                  onClick={() => {
                    onNavigateToNotes();
                    onClose();
                  }}
                  className="p-4 rounded-xl hover:bg-accent/50 cursor-pointer transition-colors border border-transparent hover:border-border/50 group"
                >
                   <h4 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{note.title}</h4>
                   <p className="text-sm text-foreground/70 line-clamp-2">
                      {note.content}
                   </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
