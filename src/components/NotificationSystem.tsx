import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { auth, db, getDb, handleFirestoreError, OperationType } from '../firebase';
import { toast } from 'sonner';

export default function NotificationSystem() {
  const [hasPermission, setHasPermission] = useState(false);

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

  useEffect(() => {
    if (!auth.currentUser || !hasPermission) return;

    // We only care about notes that haven't been notified yet and have a reminderAt
    const q = query(
      collection(getDb(), 'notes'), 
      where('uid', '==', auth.currentUser.uid),
      where('notified', '==', false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Create a polling interval to check current time against reminder time
      const interval = setInterval(() => {
        const now = new Date();
        
        snapshot.docs.forEach(async (document) => {
          const data = document.data();
          if (data.reminderAt) {
            const reminderDate = new Date(data.reminderAt);
            // If the reminder time has passed
            if (reminderDate <= now && document.ref) {
              
              // Trigger Browser Notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Recordatorio de VitaStudent', {
                  body: data.title + (data.content ? '\n' + data.content.substring(0, 50) + '...' : ''),
                  icon: '/favicon.ico' // placeholder
                });
              }
              
              // Also show a toast notification
              toast('🔔 Recordatorio: ' + data.title, {
                description: data.content ? data.content.substring(0, 60) + '...' : '',
                duration: 10000,
              });

              // Mark as notified so we don't trigger again
              try {
                await updateDoc(doc(getDb(), 'notes', document.id), {
                  notified: true
                });
              } catch (err) {
                console.error("Error updating notification status", err);
              }
            }
          }
        });
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notes_notifications');
    });

    return () => unsubscribe();
  }, [hasPermission]);

  return null; // This component doesn't render anything
}
