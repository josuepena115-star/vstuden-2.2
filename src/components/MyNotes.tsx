import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db, getDb, handleFirestoreError, OperationType } from '../firebase';
import { Search, Plus, Trash2, Edit3, Clock, Check, X, Bell, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export interface MyNote {
  id: string;
  title: string;
  content: string;
  reminderAt?: string | null;
  notified?: boolean;
  createdAt: any;
  uid: string;
}

export default function MyNotes() {
  const [notes, setNotes] = useState<MyNote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editReminder, setEditReminder] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(getDb(), 'notes'), where('uid', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MyNote));
      fetchedNotes.sort((a, b) => {
          const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return bTime - aTime;
      });
      setNotes(fetchedNotes);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notes');
      toast.error("No se pudieron cargar las notas");
    });
    return () => unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(getDb(), 'notes'), {
        uid: auth.currentUser.uid,
        title: 'Nueva Nota',
        content: '',
        reminderAt: null,
        notified: false,
        createdAt: serverTimestamp()
      });
      toast.success('Nota creada');
    } catch (e) {
      toast.error('Error al crear la nota');
    }
  };

  const saveNote = async (id: string) => {
    try {
      // Validate date if exists
      let validReminder = editReminder;
      if (editReminder) {
         const date = new Date(editReminder);
         if (isNaN(date.getTime())) {
             validReminder = '';
         }
      }

      await updateDoc(doc(getDb(), 'notes', id), {
        title: editTitle,
        content: editContent,
        reminderAt: validReminder || null,
        notified: false // reset notification if reminder changed
      });
      setIsEditing(null);
      toast.success('Nota guardada');
      
      // Request permission if there's a reminder
      if (validReminder && 'Notification' in window && Notification.permission !== 'granted') {
          Notification.requestPermission();
      }
    } catch (e) {
      toast.error('Error al guardar la nota');
    }
  };

  const deleteNote = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta nota?")) return;
    try {
      await deleteDoc(doc(getDb(), 'notes', id));
      toast.success('Nota eliminada');
    } catch (e) {
      toast.error('Error al eliminar');
    }
  };

  const startEdit = (note: MyNote) => {
    setIsEditing(note.id);
    setEditTitle(note.title || '');
    setEditContent(note.content || '');
    // format date for datetime-local input
    if (note.reminderAt) {
      setEditReminder(note.reminderAt);
    } else {
      setEditReminder('');
    }
  };

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase();
    return (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Edit3 className="text-primary" size={28} />
            Mis Notas y Recordatorios
          </h3>
          <p className="text-muted-foreground text-sm">Gestiona tus apuntes, notas de estudio y configura alertas automáticas.</p>
        </div>
        <button 
          onClick={handleAddNote}
          className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl flex items-center hover:bg-primary/90 transition-all shadow-md"
        >
          <Plus size={20} className="mr-2" /> Nueva Nota
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input 
          type="text" 
          placeholder="Buscar en el título o contenido de las notas..." 
          className="w-full bg-card border border-border pl-12 pr-4 py-4 rounded-xl font-medium focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 px-4 text-muted-foreground border-2 border-dashed border-border rounded-xl">
          <Edit3 size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-bold text-lg">No se encontraron notas</p>
          <p className="text-sm">Agrega una nueva nota o cambia tu término de búsqueda.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredNotes.map(note => (
            <motion.div 
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm relative group overflow-hidden"
            >
              {isEditing === note.id ? (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    className="w-full font-bold text-lg p-2 rounded border border-border bg-accent/20 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Título de la nota..."
                  />
                  <textarea 
                    className="w-full p-2 h-32 rounded border border-border bg-accent/20 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Escribe tus apuntes aquí..."
                  />
                  
                  <div className="flex items-center gap-2 bg-accent/10 p-2 border border-border rounded">
                    <Bell size={16} className="text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground">Recordatorio:</span>
                    <input 
                      type="datetime-local" 
                      className="bg-transparent text-sm border-none outline-none flex-grow"
                      value={editReminder}
                      onChange={(e) => setEditReminder(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-accent rounded transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => saveNote(note.id)}
                      className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded shadow-sm hover:opacity-90 transition-all flex items-center"
                    >
                      <Check size={14} className="mr-1" /> Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full cursor-pointer" onClick={() => startEdit(note)}>
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg pr-8 line-clamp-1">{note.title}</h4>
                      <button 
                         onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                         className="absolute top-4 right-4 text-muted-foreground/50 hover:text-destructive transition-all"
                         title="Eliminar nota"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                   
                   <p className="text-sm text-foreground/80 flex-grow whitespace-pre-wrap line-clamp-4 mb-4">
                      {note.content || <span className="text-muted-foreground italic">Sin contenido...</span>}
                   </p>

                   <div className="flex items-center justify-between text-xs font-medium border-t border-border/50 pt-3">
                      <div className="flex items-center text-muted-foreground">
                         <Clock size={14} className="mr-1" />
                         {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'Nuevo'}
                      </div>
                      
                      {note.reminderAt && (
                         <div className={`flex items-center ${new Date(note.reminderAt) < new Date() ? 'text-orange-500' : 'text-blue-500'} bg-accent/20 px-2 py-1 rounded shadow-sm`}>
                            <BellRing size={12} className="mr-1" />
                            {new Date(note.reminderAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                         </div>
                      )}
                   </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
