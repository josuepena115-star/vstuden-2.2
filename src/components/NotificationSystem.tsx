import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db, getDb, handleFirestoreError, OperationType } from '../firebase';
import { toast } from 'sonner';

export default function NotificationSystem() {
  const [hasPermission, setHasPermission] = useState(false);
  const [lastStudyRecommendation, setLastStudyRecommendation] = useState<string | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setHasPermission(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') setHasPermission(true);
        });
      }
    }
  }, []);

  const sendNotification = (title: string, body: string, id?: string, collectionName?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
    }
    toast(`🔔 ${title}`, {
      description: body,
      duration: 10000,
    });

    if (id && collectionName) {
      const docRef = doc(getDb(), collectionName, id);
      updateDoc(docRef, { notified: true }).catch(console.error);
    }
  };

  useEffect(() => {
    if (!auth.currentUser || !hasPermission) return;

    // 1. Monitor Notes & Tasks
    const qNotes = query(
      collection(getDb(), 'notes'), 
      where('uid', '==', auth.currentUser.uid),
      where('notified', '==', false)
    );

    const qTasks = query(
      collection(getDb(), 'tasks'),
      where('uid', '==', auth.currentUser.uid),
      where('completed', '==', false)
    );

    const unsubscribeNotes = onSnapshot(qNotes, (snapshot) => {
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.reminderAt) {
          const reminderDate = new Date(data.reminderAt);
          if (reminderDate <= new Date()) {
            sendNotification('Recordatorio', data.title, doc.id, 'notes');
          }
        }
      });
    });

    const unsubscribeTasks = onSnapshot(qTasks, (snapshot) => {
      const now = new Date();
      snapshot.docs.forEach(document => {
        const data = document.data();
        if (!data.dueDate) return;

        const dueDate = new Date(data.dueDate);
        const diffMs = dueDate.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        // Academic Logic: 24h and 48h
        if (data.isAcademico && !data.notified) {
            if (diffHours <= 24 && diffHours > 0) {
                sendNotification('🎓 Entrega Mañana', `Debes completar: ${data.text}`, document.id, 'tasks');
            } else if (diffHours <= 48 && diffHours > 24) {
                sendNotification('🎓 Entrega Próxima', `Faltan 48h para: ${data.text}`, document.id, 'tasks');
            }
        }

        // Urgent Repeating logic (if urgent and not completed, every 2h simulated here by checking if last notified was > 2h ago)
        if (data.isUrgent && !data.completed) {
            const lastNotified = data.lastNotifiedUrgent?.toDate?.() || new Date(0);
            const timeSinceLast = (now.getTime() - lastNotified.getTime()) / (1000 * 60 * 60);
            if (timeSinceLast >= 2) {
                sendNotification('🚨 Tarea Urgente', data.text);
                updateDoc(doc(getDb(), 'tasks', document.id), { lastNotifiedUrgent: now }).catch(console.error);
            }
        }
      });
    });

    // 2. Monitor Shifts for Study Recommendations & Handover
    const qShifts = query(collection(getDb(), 'shifts'), where('uid', '==', auth.currentUser.uid));
    const unsubscribeShifts = onSnapshot(qShifts, (snapshot) => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const shiftsMapped = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
        const todayShift = shiftsMapped.find((s: any) => s.date === todayStr);

        // a) Handover Logic: 30 mins before end
        if (todayShift) {
            const endTime = new Date(`${todayShift.date}T${todayShift.endTime}`);
            const diffMins = (endTime.getTime() - now.getTime()) / (1000 * 60);
            
            if (diffMins <= 30 && diffMins > 0 && !todayShift.notifiedHandover) {
                sendNotification('🏥 Pendiente de Turno', 'No olvides realizar tu nota de relevo y verificar pendientes antes de salir.');
                updateDoc(doc(getDb(), 'shifts', todayShift.id), { notifiedHandover: true }).catch(console.error);
            }
        }

        // b) Study Recommendations (once per day or session change)
        const currentHour = now.getHours();
        if (currentHour >= 8 && currentHour <= 22 && lastStudyRecommendation !== todayStr) {
            if (!todayShift || todayShift.type === 'X' || todayShift.type === 'X/L' || todayShift.type === 'XL') {
                sendNotification('📖 Momento de Repaso', 'Hoy es un día libre. ¡Momento ideal para una sesión profunda de estudio (2 horas)!');
            } else if (todayShift.type === 'H12N') {
                sendNotification('😴 Post-Noche', 'Saliste de una H12N. Se recomienda descanso total o lectura muy ligera.');
            } else if (todayShift.type === 'H8' || todayShift.type === 'DALH8') {
                sendNotification('📖 Repaso Rápido', 'Hoy tienes jornada de 8h. Aprovecha la tarde para un repaso de 30 min.');
            }
            setLastStudyRecommendation(todayStr);
        }
    });

    // 3. Simulated Geolocation (Hospital Entry)
    // In a real app, we'd use watchPosition. Here we simulate once on load if coordinates match a range.
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Simulated range for "Hospital XYZ"
            // If user is within 500m of a point, trigger hospital greeting/task reminder
            // For now, we'll just check if they are "at work"
            const isAtHospital = false; // We would calculate this
            if (isAtHospital) {
                sendNotification('🏥 VitaStudent: Hospital', 'Has entrado al hospital. Tus tareas pendientes han sido actualizadas.');
            }
        });
    }

    return () => {
      unsubscribeNotes();
      unsubscribeTasks();
      unsubscribeShifts();
    };
  }, [hasPermission, lastStudyRecommendation]);

  return null;
}
