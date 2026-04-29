import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { auth, getDb } from '../firebase';
import { Bell, X, Calendar, ClipboardList, BookOpen, AlertCircle, CheckCircle2, Moon, Sun, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'task' | 'handover' | 'recommendation' | 'urgent';
  timestamp: Date;
  icon: any;
  color: string;
}

export default function NotificationsModal({
  isOpen, 
  onClose,
  onNavigateToTasks
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onNavigateToTasks: () => void;
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && auth.currentUser) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const items: NotificationItem[] = [];
      const now = new Date();

      // 1. Fetch Tasks (Urgent and Academic)
      const qTasks = query(
        collection(getDb(), 'tasks'),
        where('uid', '==', auth.currentUser.uid),
        where('completed', '==', false),
        limit(10)
      );
      const taskSnap = await getDocs(qTasks);
      taskSnap.docs.forEach(doc => {
        const data = doc.data();
        if (data.isUrgent) {
            items.push({
                id: doc.id,
                title: 'Tarea Urgente',
                subtitle: data.text,
                type: 'urgent',
                timestamp: data.createdAt?.toDate() || now,
                icon: AlertCircle,
                color: 'text-red-500 bg-red-500/10'
            });
        } else if (data.isAcademico) {
            items.push({
                id: doc.id,
                title: 'Entrega Académica',
                subtitle: data.text,
                type: 'task',
                timestamp: data.createdAt?.toDate() || now,
                icon: BookOpen,
                color: 'text-purple-500 bg-purple-500/10'
            });
        }
      });

      // 2. Fetch Handover Notes
      const qNotes = query(
        collection(getDb(), 'notes'),
        where('uid', '==', auth.currentUser.uid),
        where('type', '==', 'relevo'),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      const noteSnap = await getDocs(qNotes);
      noteSnap.docs.forEach(doc => {
        const data = doc.data();
        items.push({
            id: doc.id,
            title: 'Nota de Relevo',
            subtitle: data.content.substring(0, 50) + '...',
            type: 'handover',
            timestamp: data.createdAt?.toDate() || now,
            icon: ClipboardList,
            color: 'text-sky-500 bg-sky-500/10'
        });
      });

      // 3. Generate Study Recommendation based on Shift
      const todayStr = now.toISOString().split('T')[0];
      const qShifts = query(
          collection(getDb(), 'shifts'), 
          where('uid', '==', auth.currentUser.uid),
          where('date', '==', todayStr)
      );
      const shiftSnap = await getDocs(qShifts);
      if (!shiftSnap.empty) {
        const shift = shiftSnap.docs[0].data();
        if (shift.type === 'H12N') {
            items.push({
                id: 'study-rec',
                title: 'Recomendación de Descanso',
                subtitle: 'Saliste de una H12N. Se recomienda descanso total.',
                type: 'recommendation',
                timestamp: now,
                icon: Moon,
                color: 'text-indigo-500 bg-indigo-500/10'
            });
        } else if (shift.type === 'H8' || shift.type === 'DALH8') {
            items.push({
                id: 'study-rec',
                title: 'Repaso Rápido (30 min)',
                subtitle: 'Aprovecha tu tarde libre para revisar un tema corto.',
                type: 'recommendation',
                timestamp: now,
                icon: Coffee,
                color: 'text-orange-500 bg-orange-500/10'
            });
        }
      } else {
        items.push({
            id: 'study-rec',
            title: 'Día Libre - Estudio Profundo',
            subtitle: 'Hoy es ideal para una sesión de 2 horas.',
            type: 'recommendation',
            timestamp: now,
            icon: Sun,
            color: 'text-yellow-500 bg-yellow-500/10'
        });
      }

      // Sort by timestamp
      items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setNotifications(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-end p-4 pt-16 pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            className="bg-card w-full max-w-sm rounded-[32px] shadow-2xl border border-border overflow-hidden relative z-10 flex flex-col max-h-[80vh] shadow-sky-500/10 pointer-events-auto"
          >
        <div className="p-6 border-b border-border bg-accent/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
               <Bell size={20} />
             </div>
             <div>
               <h3 className="font-black text-lg">Notificaciones</h3>
               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Actividad Reciente</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow scrollbar-hide">
          {loading ? (
             <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest">Sincronizando...</p>
             </div>
          ) : notifications.length === 0 ? (
             <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-4">
                 <CheckCircle2 size={48} className="opacity-20" />
                 <p className="font-bold text-sm">¡Al día! No tienes notificaciones nuevas.</p>
             </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map(notif => {
                const Icon = notif.icon;
                return (
                  <motion.div 
                    key={notif.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                        if (notif.type === 'task' || notif.type === 'urgent') onNavigateToTasks();
                        onClose();
                    }}
                    className="p-4 rounded-3xl bg-accent/5 border border-border/50 hover:border-primary/30 cursor-pointer transition-all flex gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${notif.color} transition-colors group-hover:scale-110 shadow-sm`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-sm group-hover:text-primary transition-colors">{notif.title}</h4>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase">{notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 font-medium">{notif.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-accent/10">
          <button 
            onClick={() => {
                onNavigateToTasks();
                onClose();
            }}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Ver Todas las Tareas
          </button>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}
