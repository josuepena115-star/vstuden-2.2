import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Stethoscope, 
  BookOpen, 
  Pill, 
  FileText, 
  User, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronRight, 
  Activity, 
  Clipboard, 
  Clock,
  Info,
  AlertCircle,
  CheckCircle2,
  Moon,
  Sun,
  LogOut,
  Plus,
  Filter,
  MessageSquare,
  ArrowUpDown,
  LayoutGrid,
  Syringe,
  Shield,
  ShieldCheck,
  TestTube,
  Calculator,
  Users,
  Baby,
  Ambulance,
  Droplet,
  Wind,
  Sparkles,
  Calendar,
  Trash2,
  AlertTriangle,
  Zap,
  Mail,
  Phone,
  Bookmark,
  Map,
  ChevronLeft,
  Lock,
  Home,
  Brain,
  HeartPulse,
  Thermometer,
  Table,
  History,
  RotateCw,
  ClipboardList,
  ShieldAlert,
  Scissors,
  Box,
  MapPin,
  Edit3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { ThemeProvider, useTheme } from 'next-themes';
import { WasteManagementBlock } from './components/WasteManagementBlock';
import NotificationSystem from './components/NotificationSystem';
import SearchModal from './components/SearchModal';
import MyNotes from './components/MyNotes';
import { DISEASES, SERVICIOS, Disease, DRUGS, Drug } from './medicalData.ts';
import { PROCEDURE_CATEGORIES, PROCEDURES } from './proceduresData.ts';
import { CLINICAL_PROTOCOLS } from './clinicalProtocolsData.ts';
import Calculators from './components/Calculators';
import MedicalScores, { MEDICAL_SCORES } from './components/MedicalScores';
import { auth, db, getDb, signInWithGoogle, logout, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, addDoc, deleteDoc, updateDoc, serverTimestamp, getDocs } from 'firebase/firestore';

// --- Types ---

interface UserProfile {
  uid: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  rol: string;
  universidad: string;
  hospital: string;
  servicioActual: string;
  horario: string;
}

interface Shift {
  id: string;
  uid: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  color: string;
  servicio?: string;
  ubicacion?: string;
  checklistRelevo?: string;
  isAcademico?: boolean;
}

const SHIFT_PRESETS = {
  H12D: { name: 'H12D', start: '07:00', end: '19:00', color: '#f97316', icon: Sun },
  H12N: { name: 'H12N', start: '19:00', end: '07:00', color: '#6366f1', icon: Moon },
  H6M: { name: 'H6M', start: '07:00', end: '13:00', color: '#0ea5e9', icon: Clock },
  H6T: { name: 'H6T', start: '13:00', end: '19:00', color: '#22c55e', icon: Activity },
  "D/A": { name: 'D/A', start: '08:00', end: '14:00', color: '#a855f7', icon: BookOpen },
  "X/L": { name: 'X/L', start: '00:00', end: '00:00', color: '#94a3b8', icon: X },
  H8: { name: 'H8', start: '08:00', end: '16:00', color: '#eab308', icon: Settings },
};

interface Protocol {
  id: string;
  title: string;
  category: 'procedimientos' | 'msp' | 'notas' | 'insumos';
  content: string;
}

// --- Mock Data ---

const INITIAL_PROFILE: UserProfile = {
  uid: '',
  nombre: 'Josué',
  email: '',
  telefono: '',
  direccion: '',
  rol: 'Interno de Medicina',
  universidad: 'Universidad Central del Ecuador',
  hospital: 'Hospital General del Sur',
  servicioActual: 'Emergencias',
  horario: '07:00 - 19:00 (Turno A)',
};

const PROTOCOLS: Protocol[] = [
  { id: 'p1', title: 'Lavado de Manos Clínico', category: 'procedimientos', content: 'Técnica de 11 pasos para la desinfección de manos en el entorno hospitalario...' },
  { id: 'p2', title: 'Triage de Manchester', category: 'msp', content: 'Protocolo de clasificación de pacientes por colores: Rojo (Inmediato), Naranja (Muy Urgente), Amarillo (Urgente)...' },
  { id: 'p3', title: 'Nota de Evolución SOAP', category: 'notas', content: 'S: Subjetivo, O: Objetivo, A: Apreciación, P: Plan...' },
  { id: 'p4', title: 'Catálogo de Suturas', category: 'insumos', content: 'Tipos de hilos: Absorbibles (Vicryl, PDS) y No Absorbibles (Seda, Nylon)...' },
];

const ICON_MAP: Record<string, any> = {
  Pill,
  Syringe,
  Activity,
  Heart,
  Shield,
  Users,
  Baby,
  Stethoscope,
  Ambulance,
  Droplet,
  Wind,
  Zap,
  AlertTriangle,
  Scissors
};

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed = false }: { icon: any, label: string, active: boolean, onClick: () => void, collapsed?: boolean }) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`w-full flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 relative group ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    )}
    <Icon size={20} className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`} />
    {!collapsed && <span className={`font-semibold text-sm ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>}
  </button>
);

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
  <div className="mb-8 space-y-1">
    <div className="flex items-center space-x-3">
      {Icon && (
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon size={24} />
        </div>
      )}
      <h2 className="text-3xl font-black tracking-tight text-foreground">{title}</h2>
    </div>
    {subtitle && <p className="text-muted-foreground text-sm font-medium pl-1">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div 
    {...props}
    className={`bg-card text-card-foreground rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const GlassCard = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div 
    {...props}
    className={`bg-card/40 backdrop-blur-xl text-card-foreground rounded-3xl border border-white/10 p-6 shadow-xl ${className}`}
  >
    {children}
  </div>
);

// --- Main App ---

const ThemeProviderAny = ThemeProvider as any;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Auth & Profile Sync
  useEffect(() => {
    console.log("App.tsx mount, db is:", db);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsAuthLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userDoc = await getDoc(doc(getDb(), 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              nombre: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              telefono: '',
              direccion: '',
              rol: 'Interno de Medicina',
              universidad: '',
              hospital: '',
              servicioActual: '',
              horario: ''
            };
            await setDoc(doc(getDb(), 'users', firebaseUser.uid), newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Data Sync
  const [bitacoraEntries, setBitacoraEntries] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [shiftLogs, setShiftLogs] = useState<any[]>([]);
  const [monthlyServices, setMonthlyServices] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    const qBitacora = query(collection(getDb(), 'bitacora'), where('uid', '==', user.uid));
    const unsubBitacora = onSnapshot(qBitacora, (snapshot) => {
      setBitacoraEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bitacora');
    });

    const qTasks = query(collection(getDb(), 'tasks'), where('uid', '==', user.uid));
    const unsubTasks = onSnapshot(qTasks, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tasks');
    });

    const qShifts = query(collection(getDb(), 'shifts'), where('uid', '==', user.uid));
    const unsubShifts = onSnapshot(qShifts, (snapshot) => {
      setShifts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shift[]);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'shifts');
    });

    const qShiftLogs = query(collection(getDb(), 'shift_logs'), where('uid', '==', user.uid));
    const unsubShiftLogs = onSnapshot(qShiftLogs, (snapshot) => {
      setShiftLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'shift_logs');
    });

    const qMonthly = query(collection(getDb(), 'monthly_services'), where('uid', '==', user.uid));
    const unsubMonthly = onSnapshot(qMonthly, (snapshot) => {
      const map: Record<string, string> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.monthKey) map[data.monthKey] = data.service;
      });
      setMonthlyServices(map);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'monthly_services');
    });

    return () => {
      unsubBitacora();
      unsubTasks();
      unsubShifts();
      unsubShiftLogs();
      unsubMonthly();
    };
  }, [user]);

  // Feedback State
  const [feedbackComments, setFeedbackComments] = useState<string[]>([]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState('');

  // Pharmacology State
  const [drugSearch, setDrugSearch] = useState('');
  const [drugSortBy, setDrugSortBy] = useState<string>('Todos');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedDrugsToCompare, setSelectedDrugsToCompare] = useState<Drug[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Dashboard State
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [dailyDiseases, setDailyDiseases] = useState<Disease[]>([]);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [activeFlashcard, setActiveFlashcard] = useState<Disease | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Bitácora State
  const [bitacoraSubTab, setBitacoraSubTab] = useState<'actividades' | 'turnos'>('actividades');
  const [isBitacoraModalOpen, setIsBitacoraModalOpen] = useState(false);
  const [newBitacora, setNewBitacora] = useState({
    actividad: '',
    procedimientos: '',
    observaciones: '',
    tipo: 'Actividad',
    fecha: new Date().toISOString().split('T')[0],
    createTask: false
  });

  // Shift State
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    servicioActual: '',
    customServicio: '',
    tipoTurno: 'H12D',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    ubicacionPiso: '',
    checklistRelevo: '',
    diasSemana: [] as string[],
    horariosPorDia: {} as Record<string, { entrada: string, salida: string }>,
  });

  // Batch Mode State
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedBatchDates, setSelectedBatchDates] = useState<string[]>([]);

  // Bitácora Pagination State
  const [bitacoraPage, setBitacoraPage] = useState(1);
  const [shiftsPage, setShiftsPage] = useState(1);
  const itemsPerPage = 10;

  // Calendar State
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState<UserProfile | null>(null);

  // Detail Modal State
  const [selectedCalendarDateShifts, setSelectedCalendarDateShifts] = useState<Shift[]>([]);
  const [isCalendarDayModalOpen, setIsCalendarDayModalOpen] = useState(false);
  const [clickedDateStr, setClickedDateStr] = useState('');

  // Login State
  const handleLogin = async () => {
    setIsLoginLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Sesión iniciada', { description: 'Bienvenido a VitaStudent.' });
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info('Sesión cerrada');
  };

  const handleUpdateProfile = async () => {
    if (!user || !editProfileData) return;
    try {
      await updateDoc(doc(getDb(), 'users', user.uid), { ...editProfileData });
      setUserProfile(editProfileData);
      setIsEditingProfile(false);
      toast.success('Perfil actualizado');
    } catch (error) {
      toast.error('Error al actualizar perfil');
    }
  };

  const setMonthlyServiceForMonth = async (monthKey: string, service: string) => {
    if (!user) return;
    try {
      const docId = `${user.uid}_${monthKey}`;
      await setDoc(doc(getDb(), 'monthly_services', docId), {
        uid: user.uid,
        monthKey,
        service,
        updatedAt: serverTimestamp()
      });
      toast.success(`Servicio de ${monthKey} guardado`);
    } catch (error) {
      console.error("Error setting monthly service:", error);
      toast.error("No se pudo guardar el servicio mensual");
    }
  };

  const [isResetConfirming, setIsResetConfirming] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<string | null>(null);

  const handleResetAccount = async () => {
    if (!user) return;
    
    const loadingToast = toast.loading('Reestableciendo cuenta...');
    
    try {
      // 1. Borrar todas las colecciones principales
      const collectionsToClear = ['tasks', 'bitacora', 'shifts', 'shift_logs', 'notes'];
      
      for (const collName of collectionsToClear) {
        const q = query(collection(db, collName), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, collName, d.id)));
        await Promise.all(deletePromises);
      }
      
      // 2. Resetear perfil de usuario
      const defaultProfile = {
        uid: user.uid,
        nombre: user.displayName || 'Estudiante',
        email: user.email || '',
        rol: 'Estudiante de Medicina',
        universidad: 'UIDE',
        hospital: '',
        servicioActual: 'Pendiente',
        horario: 'Variable'
      };
      await setDoc(doc(db, 'users', user.uid), defaultProfile);
      
      // 3. Limpiar localStorage
      localStorage.removeItem('dailyDiseasesDate');
      localStorage.removeItem('dailyDiseases');
      
      // Resetear estados locales
      setUserProfile(defaultProfile);
      setTasks([]);
      setBitacoraEntries([]);
      setShifts([]);
      setShiftLogs([]);
      setIsResetConfirming(false);
      
      toast.success('Cuenta reiniciada con éxito', { id: loadingToast });
      
    } catch (error) {
      console.error('Error reset account:', error);
      toast.error('Error al reiniciar la cuenta. Verifica tu conexión.', { id: loadingToast });
    }
  };

  const handleClearAllShifts = async () => {
    if (!user || !confirm('¿Deseas eliminar TODOS los turnos del calendario (incluyendo los que no tienen historial)?')) return;
    
    const loadingToast = toast.loading('Limpiando calendario...');
    try {
      const q = query(collection(db, 'shifts'), where('uid', '==', user.uid));
      const qLogs = query(collection(db, 'shift_logs'), where('uid', '==', user.uid));
      
      const [sSnap, lSnap] = await Promise.all([getDocs(q), getDocs(qLogs)]);
      
      const sPromises = sSnap.docs.map(d => deleteDoc(doc(db, 'shifts', d.id)));
      const lPromises = lSnap.docs.map(d => deleteDoc(doc(db, 'shift_logs', d.id)));
      
      await Promise.all([...sPromises, ...lPromises]);
      
      toast.success('Calendario limpio', { id: loadingToast });
      setShifts([]);
      setShiftLogs([]);
    } catch (error) {
      console.error('Error al limpiar calendario:', error);
      toast.error('Error al limpiar el calendario', { id: loadingToast });
    }
  };

  // Effect for Daily Diseases
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('dailyDiseasesDate');
    const storedDiseases = localStorage.getItem('dailyDiseases');
    const dataVersion = localStorage.getItem('dailyDataVersion');

    if (storedDate === today && storedDiseases && dataVersion === '3') {
      setDailyDiseases(JSON.parse(storedDiseases));
    } else {
      // Pick 3 random diseases
      const shuffled = [...DISEASES].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setDailyDiseases(selected);
      localStorage.setItem('dailyDiseasesDate', today);
      localStorage.setItem('dailyDiseases', JSON.stringify(selected));
      localStorage.setItem('dailyDataVersion', '3');
    }
  }, []);

  const handleAddTask = async (text: string, source?: string) => {
    if (!user) return;
    const newTask = { 
      uid: user.uid,
      text, 
      completed: false, 
      source,
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(getDb(), 'tasks'), newTask);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'tasks');
    }
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(getDb(), 'tasks', id), { completed: !currentStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `tasks/${id}`);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(getDb(), 'tasks', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `tasks/${id}`);
    }
  };

  const handleAddBitacora = async () => {
    if (!user) return;
    let linkedTaskId: string | null = null;

    if (newBitacora.createTask) {
      const newTask = { 
        uid: user.uid,
        text: newBitacora.actividad, 
        completed: false, 
        source: `Bitácora ${newBitacora.fecha.split('-').reverse().slice(0,2).join('/')}`,
        createdAt: serverTimestamp()
      };
      try {
        const taskDoc = await addDoc(collection(getDb(), 'tasks'), newTask);
        linkedTaskId = taskDoc.id;
      } catch (error) {
        console.error('Error creating task from bitacora:', error);
      }
    }

    const entry = {
      uid: user.uid,
      actividad: newBitacora.actividad || '',
      procedimientos: newBitacora.procedimientos || '',
      observaciones: newBitacora.observaciones || '',
      tipo: newBitacora.tipo || 'Actividad',
      fecha: newBitacora.fecha || new Date().toISOString().split('T')[0],
      linkedTaskId: linkedTaskId,
      completado: false,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(getDb(), 'bitacora'), entry);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'bitacora');
    }
    
    setIsBitacoraModalOpen(false);
    setNewBitacora({
      actividad: '',
      procedimientos: '',
      observaciones: '',
      tipo: 'Actividad',
      fecha: new Date().toISOString().split('T')[0],
      createTask: false
    });
    toast.success('Registro guardado');
  };

  const handleSaveBatchShifts = async (presetKey: string) => {
    if (!user || selectedBatchDates.length === 0) return;
    const preset = SHIFT_PRESETS[presetKey as keyof typeof SHIFT_PRESETS];
    if (!preset) return;

    const loadingToast = toast.loading(`Asignando ${presetKey} a ${selectedBatchDates.length} días...`);

    try {
      const promises = selectedBatchDates.map(dateStr => {
        return addDoc(collection(getDb(), 'shifts'), {
          uid: user.uid,
          title: `${presetKey}: ${userProfile?.servicioActual || 'Rotación'}`,
          date: dateStr,
          startTime: preset.start,
          endTime: preset.end,
          type: presetKey,
          color: preset.color,
          servicio: userProfile?.servicioActual || 'General',
          ubicacion: '',
          checklistRelevo: '',
          isAcademico: presetKey === 'D/A' || presetKey === 'DA',
          createdAt: serverTimestamp()
        });
      });

      await Promise.all(promises);
      toast.success(`Turnos ${presetKey} asignados correctamente`, { id: loadingToast });
      setIsBatchMode(false);
      setSelectedBatchDates([]);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'shifts');
      toast.error('Error al asignar turnos por lotes', { id: loadingToast });
    }
  };

  const handleAddShift = async () => {
    if (!user) return;
    
    let rawService = newShift.servicioActual === 'Otro' ? newShift.customServicio : newShift.servicioActual;
    
    // Si no hay servicio manual, intentar usar el mensual
    if (!rawService.trim()) {
      const monthKey = `${new Date(newShift.fechaInicio).getMonth() + 1}-${new Date(newShift.fechaInicio).getFullYear()}`;
      rawService = monthlyServices[monthKey] || '';
    }

    // Si es libre o académico, permitimos que el servicio sea el nombre del tipo si está vacío
    let finalService = rawService;
    if (!finalService.trim()) {
      if (newShift.tipoTurno === 'X/L') finalService = 'Día Libre';
      else if (newShift.tipoTurno === 'D/A') finalService = 'Día Académico';
      else {
        toast.error('Por favor especifica el servicio');
        return;
      }
    }
    if (!newShift.fechaInicio || !newShift.fechaFin) {
      toast.error('Las fechas de inicio y fin son obligatorias.');
      return;
    }
    // Validar que la fecha inicio no sea después de fecha fin
    if (new Date(newShift.fechaInicio) > new Date(newShift.fechaFin)) {
      toast.error('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    const entry = {
      uid: user.uid,
      ...newShift,
      servicioActual: finalService,
      createdAt: serverTimestamp()
    };

    // 1. Guardar el log principal y obtener su ID
    let logId = '';
    try {
      const logRef = await addDoc(collection(getDb(), 'shift_logs'), entry);
      logId = logRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'shift_logs');
      return;
    }

    if (userProfile) {
      try {
        await updateDoc(doc(getDb(), 'users', user.uid), {
          servicioActual: finalService,
          horario: "Variable"
        });
        setUserProfile(prev => prev ? { ...prev, servicioActual: finalService, horario: "Variable" } : null);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
      }
    }

    const start = new Date(newShift.fechaInicio + 'T00:00:00');
    const end = new Date(newShift.fechaFin + 'T00:00:00');
    const dayMap: Record<string, number> = { 'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6 };
    const selectedDays = newShift.diasSemana.map(d => dayMap[d]);

    // Mapeo de colores visuales según el tipo de turno o preset
    const preset = SHIFT_PRESETS[newShift.tipoTurno as keyof typeof SHIFT_PRESETS];
    const shiftColor = preset ? preset.color : '#10b981';

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (selectedDays.length === 0 || selectedDays.includes(d.getDay())) {
        const dateString = d.toISOString().split('T')[0];
        
        const dayNameMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const currentDayName = dayNameMap[d.getDay()];
        const specificTimes = newShift.horariosPorDia[currentDayName] || { entrada: preset?.start || '07:00', salida: preset?.end || '19:00' };
        const tEntrada = specificTimes.entrada || preset?.start || '07:00';
        const tSalida = specificTimes.salida || preset?.end || '19:00';

        const isAcademico = newShift.tipoTurno === 'D/A';
        
        const eventTitle = isAcademico ? `Día Académico: ${finalService}` : `${newShift.tipoTurno}: ${finalService}`;
        const evColor = isAcademico ? '#a855f7' : shiftColor;

        if (isAcademico) {
          handleAddTask(`Revisar material de clase: ${finalService}`, 'Estudio Académico');
        }

        try {
          await addDoc(collection(getDb(), 'shifts'), {
            uid: user.uid,
            shiftLogId: logId || '',
            title: eventTitle || 'Turno',
            date: dateString,
            startTime: tEntrada || '07:00',
            endTime: tSalida || '19:00',
            type: newShift.tipoTurno || 'H12D',
            color: evColor || '#10b981',
            servicio: finalService || 'General',
            ubicacion: newShift.ubicacionPiso || '',
            checklistRelevo: newShift.checklistRelevo || '',
            isAcademico: isAcademico || false,
            createdAt: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, 'shifts');
        }
      }
    }

    setIsShiftModalOpen(false);
    setNewShift({
      servicioActual: '',
      customServicio: '',
      tipoTurno: 'H12D',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: new Date().toISOString().split('T')[0],
      ubicacionPiso: '',
      checklistRelevo: '',
      diasSemana: [] as string[],
      horariosPorDia: {} as Record<string, { entrada: string, salida: string }>,
    });
    toast.success('Turno registrado correctamente');
  };

  // Protocols State
  const [protocolCategory, setProtocolCategory] = useState('Todos');
  const [protocolSearch, setProtocolSearch] = useState('');

  // Services State
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [communitySubTab, setCommunitySubTab] = useState<string | null>(null);
  const [ginecoSubTab, setGinecoSubTab] = useState<string | null>(null);
  const [internaSubTab, setInternaSubTab] = useState<string | null>(null);
  const [emergencySubTab, setEmergencySubTab] = useState<string | null>(null);
  const [cirugiaSubTab, setCirugiaSubTab] = useState<string | null>(null);
  const [selectedScaleId, setSelectedScaleId] = useState<string | null>(null);
  const [selectedVisitaTool, setSelectedVisitaTool] = useState<string | null>(null);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
  const [selectedPartoTopic, setSelectedPartoTopic] = useState<string | null>(null);
  const [selectedClaveTopic, setSelectedClaveTopic] = useState<string | null>(null);
  const [selectedSaludSexualTopic, setSelectedSaludSexualTopic] = useState<string | null>(null);
  const [selectedDiagTool, setSelectedDiagTool] = useState<string | null>(null);
  
  // Calculadores de Gasometría
  const [gasoNa, setGasoNa] = useState<string>('');
  const [gasoCl, setGasoCl] = useState<string>('');
  const [gasoHCO3, setGasoHCO3] = useState<string>('');
  const [gasoAlb, setGasoAlb] = useState<string>('4');
  const [gasoPaO2, setGasoPaO2] = useState<string>('');
  const [gasoFiO2, setGasoFiO2] = useState<string>('21');
  const [gasoIdealGap, setGasoIdealGap] = useState<string>('12');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [diseaseActiveTab, setDiseaseActiveTab] = useState<'clinica' | 'fisiopatologia' | 'manejo' | 'enfermeria'>('clinica');

  // Procedures State
  const [selectedProcedureCategory, setSelectedProcedureCategory] = useState<string | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<any | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSendFeedback = () => {
    if (!newFeedback.trim()) return;
    setFeedbackComments([...feedbackComments, newFeedback]);
    setNewFeedback('');
    setIsFeedbackModalOpen(false);
    toast.success('¡Gracias por tu comentario!', {
      description: 'Tu feedback nos ayuda a mejorar VitaStudent.'
    });
  };

  const LoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-10 space-y-8 shadow-2xl border-primary/10">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 rotate-3">
            <Heart size={40} className="text-white" fill="currentColor" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-primary">VitaStudent</h2>
          <p className="text-muted-foreground font-medium">Tu compañero clínico personal.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="email" placeholder="correo@ejemplo.com" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>
          </div>
          <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
            Iniciar Sesión
          </button>
        </div>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-xs font-black uppercase tracking-widest text-muted-foreground">o</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleLogin}
            disabled={isLoginLoading}
            className="w-full py-4 bg-card border border-border rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continuar con Google
          </button>
          <button className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 invert" />
            Continuar con Apple
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          ¿Nuevo en VitaStudent? <span className="text-primary font-bold cursor-pointer hover:underline">Crea una cuenta</span>
        </p>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Quick Stats / Command Center */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <GlassCard className="from-primary/10 to-primary/5 bg-gradient-to-br border-primary/20 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Rotación Actual</p>
                    <h3 className="text-xl font-black">{userProfile?.servicioActual || 'No asignado'}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{userProfile?.horario || 'Sin horario'}</p>
                  </div>
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <History size={20} />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Tareas Hoy</p>
                    <h3 className="text-2xl font-black">{tasks.filter(t => !t.completed).length}</h3>
                    <p className="text-xs text-green-500 font-bold mt-1">
                      {tasks.filter(t => t.completed).length} completadas
                    </p>
                  </div>
                  <div className="p-2 bg-accent rounded-lg text-muted-foreground">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Registros Bitácora</p>
                    <h3 className="text-2xl font-black">{bitacoraEntries.length}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Este mes</p>
                  </div>
                  <div className="p-2 bg-accent rounded-lg text-muted-foreground">
                    <BookOpen size={20} />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5 overflow-hidden relative">
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Estado de Alerta</p>
                    <h3 className="text-xl font-black text-green-500">Estable</h3>
                    <p className="text-xs text-muted-foreground mt-1">Sistemas operativos</p>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                <Activity size={80} className="absolute -bottom-4 -right-4 text-green-500/5 rotate-12" />
              </GlassCard>
            </div>

            {/* Daily Diseases - Flashcards Style */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center">
                  <Sparkles size={16} className="mr-2 text-primary" />
                  Repaso Diario (Flashcards)
                </h3>
                <button 
                  onClick={() => {
                    const shuffled = [...DISEASES].sort(() => 0.5 - Math.random());
                    setDailyDiseases(shuffled.slice(0, 3));
                    toast.info('Nuevas patologías generadas');
                  }}
                  className="text-[10px] font-black uppercase text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all"
                >
                  <RotateCw size={12} className="inline mr-1" /> Refrescar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dailyDiseases.map((disease) => (
                  <motion.div
                    key={disease.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard 
                      className="group cursor-pointer p-0 overflow-hidden h-40 flex flex-col"
                      onClick={() => {
                        setActiveFlashcard(disease);
                        setIsFlashcardOpen(true);
                        setIsFlipped(false);
                      }}
                    >
                      <div className="p-5 flex-grow">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            {ICON_MAP[disease.icon || 'Activity'] && React.createElement(ICON_MAP[disease.icon || 'Activity'], { size: 18 })}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{disease.servicio}</span>
                        </div>
                        <h4 className="font-black text-lg text-foreground leading-tight">{disease.nombre}</h4>
                      </div>
                      <div className="px-5 py-3 bg-accent/50 border-t border-border/50 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground">Toca para repasar</span>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Intelligent Study Planning */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center">
                <Brain size={16} className="mr-2 text-purple-500" />
                Planificación de Estudio Inteligente
              </h3>
              <GlassCard className="p-6 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-500/20 shrink-0">
                    <BookOpen size={32} />
                  </div>
                  <div className="flex-grow space-y-2">
                    <h4 className="text-lg font-black italic">
                      "El conocimiento no se detiene en la guardia."
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      Basado en tu rotación en <span className="text-purple-600 font-black">{userProfile?.servicioActual || 'Medicina'}</span>, hoy deberías priorizar:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(() => {
                        const topics: Record<string, string[]> = {
                          'Pediatría': ['Deshidratación', 'Curvas de Crecimiento', 'Inmunizaciones'],
                          'Ginecología': ['Hemorragia Postparto', 'Preeclampsia', 'Control Prenatal'],
                          'Cirugía': ['Abdomen Agudo', 'Manejo de Heridas', 'Líquidos y Electrolitos'],
                          'Medicina Interna': ['Diabetes Mellitus', 'HTA', 'Insuficiencia Cardíaca'],
                          'Emergencias': ['RCP Avanzado', 'Triage Manchester', 'SCA']
                        };
                        const currentTopics = topics[userProfile?.servicioActual as keyof typeof topics] || ['Fundamentos Clínicos', 'Ética Médica', 'Farmacología'];
                        return currentTopics.map((t, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-700 text-[10px] font-black uppercase rounded-full border border-purple-500/20">
                            {t}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black uppercase text-muted-foreground">Sesión recomendada</p>
                    <div className="px-4 py-2 bg-purple-600 text-white rounded-xl font-black text-sm shadow-lg shadow-purple-600/20">
                      45-60 min
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Advanced Calendar Integration */}
                <GlassCard className="p-0 overflow-hidden shadow-2xl border-primary/10">
                  <div className="p-6 border-b border-border bg-accent/5 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg tracking-tight">Cronograma de Guardias</h3>
                        <p className="text-xs text-muted-foreground font-medium">Gestión de turnos y rotaciones</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setIsBatchMode(!isBatchMode);
                          setSelectedBatchDates([]);
                        }}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${isBatchMode ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-accent/50 text-muted-foreground hover:text-foreground'}`}
                      >
                        <Zap size={14} />
                        {isBatchMode ? 'Cancelar Modo Rápido' : 'Modo Rápido'}
                      </button>
                      <div className="flex items-center bg-background rounded-full p-1 border border-border shadow-inner">
                        {(['day', 'week', 'month'] as const).map((view) => (
                          <button
                            key={view}
                            onClick={() => setCalendarView(view)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all duration-300 ${calendarView === view ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            {view === 'day' ? 'Día' : view === 'week' ? 'Sem' : 'Mes'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="font-black text-2xl tracking-tighter capitalize">
                        {calendarView === 'month' 
                          ? selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                          : calendarView === 'week'
                          ? `Semana del ${(() => {
                              const d = new Date(selectedDate);
                              d.setDate(d.getDate() - d.getDay());
                              return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                            })()}`
                          : selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
                        }
                      </h4>
                      <div className="flex bg-accent/50 rounded-xl p-1 border border-border/50">
                        <button onClick={() => {
                          const d = new Date(selectedDate);
                          if (calendarView === 'day') d.setDate(d.getDate() - 1);
                          if (calendarView === 'week') d.setDate(d.getDate() - 7);
                          if (calendarView === 'month') d.setMonth(d.getMonth() - 1);
                          setSelectedDate(d);
                        }} className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-all"><ChevronLeft size={20}/></button>
                        
                        <button onClick={() => setSelectedDate(new Date())} className="px-4 py-1.5 hover:bg-card rounded-lg text-xs font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-widest">Hoy</button>
                        
                        <button onClick={() => {
                          const d = new Date(selectedDate);
                          if (calendarView === 'day') d.setDate(d.getDate() + 1);
                          if (calendarView === 'week') d.setDate(d.getDate() + 7);
                          if (calendarView === 'month') d.setMonth(d.getMonth() + 1);
                          setSelectedDate(d);
                        }} className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-all"><ChevronRight size={20}/></button>
                      </div>
                    </div>

                    {isBatchMode && selectedBatchDates.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Zap size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black">{selectedBatchDates.length} días seleccionados</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">¿Qué turno quieres asignar?</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           {Object.entries(SHIFT_PRESETS).map(([key, preset]) => (
                             <button
                               key={key}
                               onClick={() => handleSaveBatchShifts(key)}
                               className="px-3 py-2 bg-card border border-border hover:border-primary rounded-xl text-[10px] font-black uppercase transition-all hover:scale-105"
                               style={{ color: preset.color }}
                             >
                               {key}
                             </button>
                           ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      <div className="lg:col-span-3">
                        {calendarView === 'month' ? (
                          <div className="grid grid-cols-7 gap-3">
                            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((d) => (
                              <div key={d} className="text-center text-[10px] font-black uppercase text-muted-foreground/60 mb-2 tracking-widest">{d}</div>
                            ))}
                            {(() => {
                              const year = selectedDate.getFullYear();
                              const month = selectedDate.getMonth();
                              const daysInMonth = new Date(year, month + 1, 0).getDate();
                              const firstDayDay = new Date(year, month, 1).getDay();
                              
                              const cells = [];
                              for (let i = 0; i < firstDayDay; i++) {
                                cells.push(<div key={`empty-${i}`} className="aspect-square"></div>);
                              }
                              for (let day = 1; day <= daysInMonth; day++) {
                                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                                
                                const dayShifts = shifts.filter(s => s.date === dateStr);
                                const dayBitacora = bitacoraEntries.filter(b => b.fecha === dateStr);
                                
                                // Logic for "Saliente" shading
                                const prevDate = new Date(year, month, day - 1);
                                const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
                                const hadNightShiftPrev = shifts.some(s => s.date === prevDateStr && s.type === 'H12N');
                                
                                const isBatchSelected = selectedBatchDates.includes(dateStr);
                                
                                cells.push(
                                  <motion.div 
                                    key={day} 
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => {
                                      if (isBatchMode) {
                                        setSelectedBatchDates(prev => 
                                          prev.includes(dateStr) 
                                            ? prev.filter(d => d !== dateStr) 
                                            : [...prev, dateStr]
                                        );
                                      } else {
                                        setSelectedCalendarDateShifts(dayShifts);
                                        setClickedDateStr(dateStr);
                                        setIsCalendarDayModalOpen(true);
                                      }
                                    }}
                                    className={`aspect-square flex flex-col p-2 rounded-2xl text-sm relative transition-all border ${
                                      isBatchSelected ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]' :
                                      isToday ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 
                                      hadNightShiftPrev ? 'bg-blue-500/5 border-blue-200/50' : 
                                      'border-border/50 bg-accent/20'
                                    } hover:border-primary/50 cursor-pointer overflow-hidden`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <span className={`font-black ${isToday ? 'text-primary' : 'text-foreground'}`}>{day}</span>
                                      {hadNightShiftPrev && (
                                        <div className="px-1.5 py-0.5 bg-blue-500 text-white text-[7px] font-black uppercase rounded leading-none">Saliente</div>
                                      )}
                                    </div>
                                    <div className="mt-auto flex flex-col gap-1">
                                      {dayShifts.slice(0, 2).map((s, idx) => (
                                        <div key={idx} className="h-1 rounded-full w-full" style={{ backgroundColor: s.color }} />
                                      ))}
                                      {dayBitacora.length > 0 && <div className="h-4 w-full bg-orange-500/10 border border-orange-500/20 rounded flex items-center justify-center text-[8px] font-black text-orange-600">{dayBitacora.length}</div>}
                                    </div>
                                  </motion.div>
                                );
                              }
                              return cells;
                            })()}
                          </div>
                        ) : (
                          <div className="py-20 text-center bg-accent/20 rounded-3xl border border-dashed border-border text-muted-foreground italic">
                            Visualización {calendarView} en desarrollo optimizado...
                          </div>
                        )}
                      </div>

                      {/* Side Panel: Hours Summary */}
                      <div className="lg:col-span-1 space-y-6">
                        <div className="p-5 bg-card border border-border rounded-[32px] shadow-sm">
                           <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-6 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                               <Calculator size={14} className="text-primary" /> Resumen Mensual
                             </div>
                             <button 
                               onClick={handleClearAllShifts}
                               className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                               title="Limpiar todo el calendario"
                             >
                                <Trash2 size={12} />
                             </button>
                           </h5>
                           
                           <div className="space-y-6">
                               <div className="p-4 bg-accent/20 rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground mb-3 flex items-center gap-2">
                                  <Stethoscope size={12} className="text-primary" /> Servicio del Mes
                                </p>
                                <select 
                                  className="w-full p-2 bg-background border border-border shadow-inner rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                  value={monthlyServices[`${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`] || ''}
                                  onChange={(e) => setMonthlyServiceForMonth(`${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`, e.target.value)}
                                >
                                  <option value="">Configurar Servicio...</option>
                                  {SERVICIOS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                  <option value="Otro">Otro / Variable</option>
                                </select>
                                <p className="text-[9px] text-muted-foreground mt-2 font-medium leading-tight">Los nuevos turnos se registrarán con este servicio por defecto.</p>
                              </div>

                              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-[10px] font-black uppercase text-primary mb-1">Horas Acumuladas</p>
                                <div className="flex items-end gap-2">
                                  <h3 className="text-3xl font-black">
                                    {shifts.reduce((acc, s) => {
                                      const d = new Date(s.date);
                                      if (d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear()) {
                                        if (s.type === 'H12D' || s.type === 'H12N') return acc + 12;
                                        if (s.type === 'H6T') return acc + 6;
                                        if (s.type === 'HEM') return acc + 8;
                                        if (s.type === 'DA') return acc + 6;
                                      }
                                      return acc;
                                    }, 0)}
                                  </h3>
                                  <span className="text-xs font-bold text-muted-foreground mb-1.5">Hrs / 160h</span>
                                </div>
                                <div className="mt-3 w-full bg-muted/30 h-1.5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (shifts.reduce((acc, s) => {
                                      const d = new Date(s.date);
                                      if (d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear()) {
                                        if (s.type === 'H12D' || s.type === 'H12N') return acc + 12;
                                        if (s.type === 'H6T') return acc + 6;
                                        if (s.type === 'HEM') return acc + 8;
                                        if (s.type === 'DA') return acc + 6;
                                      }
                                      return acc;
                                    }, 0) / 160) * 100)}%` }}
                                    className="h-full bg-primary"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                 <div className="p-3 bg-accent/20 rounded-xl">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Guardias Noche</p>
                                    <p className="text-lg font-black">{shifts.filter(s => {
                                      const d = new Date(s.date);
                                      return s.type === 'H12N' && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
                                    }).length}</p>
                                 </div>
                                 <div className="p-3 bg-accent/20 rounded-xl">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Días Libres</p>
                                    <p className="text-lg font-black">{shifts.filter(s => {
                                      const d = new Date(s.date);
                                      return s.type === 'XL' && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
                                    }).length}</p>
                                 </div>
                              </div>
                              
                              <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                                <p className="text-[10px] font-black uppercase text-purple-600 mb-2 flex items-center gap-2">
                                  <BookOpen size={12} /> Academia UIDE
                                </p>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs font-bold">Días Académicos (DA)</p>
                                  <p className="text-lg font-black text-purple-600">
                                    {shifts.filter(s => {
                                      const d = new Date(s.date);
                                      return s.type === 'DA' && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
                                    }).length}
                                  </p>
                                </div>
                              </div>
                           </div>
                        </div>

                        <div className="p-5 bg-card/60 backdrop-blur-xl border border-orange-200/50 rounded-[32px] shadow-sm">
                           <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-600 mb-4 flex items-center gap-2">
                             <Zap size={14} /> Tips de Supervivencia
                           </h5>
                           <p className="text-xs text-muted-foreground leading-relaxed">
                             {shifts.some(s => s.date === new Date().toISOString().split('T')[0] && s.type === 'H12N') 
                               ? "Hoy tienes H12N. Intenta dormir al menos 4h por la tarde y cena ligero antes de entrar."
                               : shifts.some(s => {
                                   const yesterday = new Date();
                                   yesterday.setDate(yesterday.getDate() - 1);
                                   return s.date === yesterday.toISOString().split('T')[0] && s.type === 'H12N';
                                 })
                               ? "Saliente de guardia. Prioriza el descanso profundo hoy. Hidrátate bien."
                               : "Mantén tu ritmo de estudio de 2h diarias para los temas de Neumología."}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Recientes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard className="p-0 overflow-hidden">
                    <div className="p-4 border-b border-border bg-accent/5 flex justify-between items-center">
                      <h3 className="font-black text-sm uppercase tracking-widest flex items-center">
                        <History size={16} className="mr-2 text-primary" /> Historial Bitácora
                      </h3>
                      <button onClick={() => setActiveTab('bitacora')} className="text-[10px] font-black uppercase text-primary hover:underline">Ver todo</button>
                    </div>
                    <div className="p-4 space-y-4">
                      {bitacoraEntries.slice(0, 3).map(entry => (
                        <div key={entry.id} className="flex space-x-4 group cursor-pointer hover:bg-accent/50 p-2 rounded-xl transition-all">
                          <div className="w-2 h-10 bg-primary/20 rounded-full group-hover:bg-primary transition-all shrink-0" />
                          <div>
                            <h4 className="font-bold text-sm leading-tight">{entry.actividad}</h4>
                            <p className="text-[10px] text-muted-foreground mt-1 font-medium">{entry.fecha} • {entry.tipo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-0 overflow-hidden">
                    <div className="p-4 border-b border-border bg-accent/5 flex justify-between items-center">
                      <h3 className="font-black text-sm uppercase tracking-widest flex items-center">
                        <Clock size={16} className="mr-2 text-primary" /> Turnos Activos
                      </h3>
                      <button onClick={() => {setActiveTab('bitacora'); setBitacoraSubTab('turnos');}} className="text-[10px] font-black uppercase text-primary hover:underline">Ver todo</button>
                    </div>
                    <div className="p-4 space-y-4">
                      {shiftLogs.slice(0, 2).map(log => (
                        <div key={log.id} className="p-3 bg-accent/30 rounded-2xl border border-border/50 relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-black text-xs uppercase">{log.servicioActual}</h4>
                             <span className="text-[10px] font-black text-primary">{log.horaEntrada}</span>
                           </div>
                           <p className="text-[10px] text-muted-foreground font-bold">{log.fechaInicio} al {log.fechaFin}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>

              <div className="space-y-8">
                {/* To-Do List modern */}
                <GlassCard className="p-0 overflow-hidden shadow-xl border-primary/5">
                  <div className="p-5 border-b border-border bg-primary/5 flex justify-between items-center">
                    <h3 className="font-black text-sm uppercase tracking-widest flex items-center">
                      <ClipboardList size={18} className="mr-2 text-primary" /> Lista de Cotejo
                    </h3>
                    <div className="px-2 py-1 bg-primary text-white text-[10px] font-black rounded-full leading-none">
                      {tasks.filter(t => !t.completed).length} PEND
                    </div>
                  </div>
                  <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
                    {tasks.map(task => (
                      <motion.div 
                        key={task.id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3 group"
                      >
                        <button 
                          onClick={() => toggleTask(task.id, task.completed)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-border group-hover:border-primary'}`}
                        >
                          {task.completed && <CheckCircle2 size={14} />}
                        </button>
                        <div className="flex-grow min-w-0">
                          <p className={`text-sm font-bold truncate transition-all ${task.completed ? 'text-muted-foreground line-through decoration-2' : 'text-foreground'}`}>{task.text}</p>
                          {task.source && <p className="text-[9px] font-black text-primary/60 uppercase">{task.source}</p>}
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="p-1 px-2 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                    <div className="pt-2">
                       <input 
                         type="text" 
                         placeholder="+ Añadir tarea pendiente..." 
                         className="w-full bg-accent/20 border-border border rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                         onKeyDown={(e) => {
                           if (e.key === 'Enter' && e.currentTarget.value) {
                             handleAddTask(e.currentTarget.value, 'Directo');
                             e.currentTarget.value = '';
                           }
                         }}
                       />
                    </div>
                  </div>
                </GlassCard>

                {/* Feedback modern */}
                <GlassCard className="p-6 bg-secondary text-secondary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 -rotate-12"><MessageSquare size={100} /></div>
                  <h3 className="text-xl font-black mb-2 relative z-10">¿Algo falta?</h3>
                  <p className="text-xs text-secondary-foreground/70 mb-6 leading-relaxed relative z-10">Ayúdanos a mejorar VitaStudent compartiendo tu feedback o sugiriendo nuevas patologías.</p>
                  <button 
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="w-full py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all relative z-10"
                  >
                    Enviar Sugerencia
                  </button>
                </GlassCard>
              </div>
            </div>

            {/* Flashcard Modal */}
            <AnimatePresence>
              {isFlashcardOpen && activeFlashcard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-md aspect-[3/4] perspective-1000"
                  >
                    <div 
                      className={`relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      {/* Front */}
                      <Card className="absolute inset-0 backface-hidden flex flex-col p-6 border-2 border-primary/20 shadow-2xl overflow-hidden">
                        <div className="flex flex-col items-center justify-center text-center mb-4 shrink-0">
                          <div className="p-3 bg-primary/10 rounded-full text-primary mb-2">
                            {ICON_MAP[activeFlashcard.icon || 'Activity'] && React.createElement(ICON_MAP[activeFlashcard.icon || 'Activity'], { size: 40 })}
                          </div>
                          <div>
                            <h2 className="text-2xl font-black text-primary leading-tight">{activeFlashcard.nombre}</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{activeFlashcard.servicio}</p>
                          </div>
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-hide text-left">
                          <div>
                            <p className="text-[10px] font-black text-primary uppercase border-b border-primary/10 pb-1">Fisiopatología Integral</p>
                            <p className="text-xs mt-1 leading-relaxed font-medium text-muted-foreground">{activeFlashcard.definicionCaso}</p>
                          </div>

                          {(activeFlashcard.etiologia || activeFlashcard.fisiopatologiaBasica) && (
                            <div className="bg-accent/30 p-2 rounded-lg border border-accent">
                              {activeFlashcard.etiologia && (
                                <div className="mb-2">
                                  <p className="text-[9px] font-black text-primary uppercase">¿Por qué sucede? (Etiología)</p>
                                  <p className="text-[11px] mt-0.5 italic">{activeFlashcard.etiologia}</p>
                                </div>
                              )}
                              {activeFlashcard.fisiopatologiaBasica && (
                                <div>
                                  <p className="text-[9px] font-black text-primary uppercase">Impacto en Paciente</p>
                                  <p className="text-[11px] mt-0.5">{activeFlashcard.fisiopatologiaBasica}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <p className="text-[9px] font-black text-primary uppercase flex items-center gap-1">
                                <Activity size={10} /> Síntomas Clave
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {(activeFlashcard.sintomasClave || activeFlashcard.clinica?.signosSintomas.slice(0, 3) || []).map((s, i) => (
                                  <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/5 border border-primary/10 rounded">{s}</span>
                                ))}
                              </div>
                            </div>
                            {(activeFlashcard.banderasRojas || activeFlashcard.clinica?.banderasRojas) && (
                              <div className="space-y-2">
                                <p className="text-[9px] font-black text-destructive uppercase flex items-center gap-1">
                                  <AlertCircle size={10} /> Banderas Rojas
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {(activeFlashcard.banderasRojas || activeFlashcard.clinica?.banderasRojas || []).slice(0, 3).map((br, i) => (
                                    <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-destructive/5 text-destructive border border-destructive/10 rounded">{br}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {activeFlashcard.complicaciones && (
                             <div>
                               <p className="text-[9px] font-black text-primary uppercase">Posibles Complicaciones</p>
                               <ul className="text-[10px] mt-1 space-y-0.5">
                                 {activeFlashcard.complicaciones.map((c, i) => (
                                   <li key={i} className="flex gap-1">
                                     <span className="text-primary opacity-50">•</span>
                                     <span>{c}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                          )}

                          {activeFlashcard.riesgosNoTratado && (
                             <div className="bg-destructive/5 p-2 rounded-lg border border-destructive/10">
                               <p className="text-[9px] font-black text-destructive uppercase">Riesgos (Si no se trata)</p>
                               <ul className="text-[10px] mt-1 space-y-0.5">
                                 {activeFlashcard.riesgosNoTratado.map((r, i) => (
                                   <li key={i} className="flex gap-1">
                                     <span className="text-destructive">•</span>
                                     <span className="font-medium text-destructive/90">{r}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                          )}
                        </div>
                        <p className="text-center text-[9px] text-muted-foreground font-bold uppercase tracking-tighter animate-pulse shrink-0 pt-2 border-t border-border/50">Toca para invertir</p>
                      </Card>

                      {/* Back */}
                      <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col p-8 border-2 border-primary/20 shadow-2xl bg-primary text-primary-foreground">
                        <div className="flex-grow space-y-6 overflow-y-auto pr-2 scrollbar-hide">
                          <h3 className="text-2xl font-black border-b border-primary-foreground/20 pb-2">Manejo Clínico</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Diagnóstico (Gold Standard)</p>
                              <p className="text-sm font-medium">{activeFlashcard.manejo?.diagnostico || 'Ver guía técnica.'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Tratamiento / Dosis</p>
                              <p className="text-sm font-medium whitespace-pre-line">{activeFlashcard.manejo?.tratamiento || 'Ver esquema MSP.'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Criterio de Referencia</p>
                              <p className="text-sm font-medium">{activeFlashcard.manejo?.criterioReferencia || 'Signos de alarma o falta de respuesta.'}</p>
                            </div>
                            {(activeFlashcard.manejo?.cuidadosEnfermeria || activeFlashcard.enfermeria) && (
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Cuidados de Enfermería</p>
                                <div className="text-sm font-medium bg-white/10 p-3 rounded-lg border border-white/10 mt-1 italic leading-relaxed space-y-2">
                                  {activeFlashcard.manejo?.cuidadosEnfermeria && (
                                    <p className="whitespace-pre-line">{activeFlashcard.manejo.cuidadosEnfermeria}</p>
                                  )}
                                  {activeFlashcard.enfermeria?.intervenciones && (
                                    <div className="space-y-2">
                                      {activeFlashcard.enfermeria.intervenciones.map((int: any, i: number) => (
                                        <div key={i} className="flex gap-2">
                                          <span className="text-primary-foreground">•</span>
                                          <span><span className="font-black not-italic underline decoration-primary-foreground/30">{int.accion}</span> {int.razon}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              handleAddTask(`Revisar protocolo: ${activeFlashcard.nombre}`, 'Flashcard Study');
                              toast.success('Guardado en Tareas para revisión posterior');
                            }}
                            className="w-full py-2 bg-white text-primary font-black rounded-xl text-xs flex items-center justify-center gap-2"
                          >
                            <Bookmark size={14} /> Registrar para estudio
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsFlashcardOpen(false); }}
                            className="w-full py-3 bg-primary-foreground/20 text-primary-foreground font-bold rounded-xl hover:bg-white/10 transition-all border border-white/20"
                          >
                            Cerrar Flashcard
                          </button>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Bitácora Modal */}
            <AnimatePresence>
              {isBitacoraModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full max-w-lg"
                  >
                    <Card className="space-y-6 shadow-2xl border-primary/20">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black flex items-center">
                          <BookOpen size={24} className="mr-2 text-primary" />
                          Nueva Actividad
                        </h3>
                        <button onClick={() => setIsBitacoraModalOpen(false)} className="p-2 hover:bg-accent rounded-full">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Tipo de Registro</label>
                              <select 
                                className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none font-bold"
                                value={newBitacora.tipo}
                                onChange={(e) => setNewBitacora({ ...newBitacora, tipo: e.target.value })}
                              >
                                <option value="Actividad">Actividad Realizada</option>
                                <option value="Tarea">Tarea por Entregar</option>
                                <option value="Consulta">Consulta</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Fecha</label>
                              <input 
                                type="date" 
                                className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                                value={newBitacora.fecha}
                                onChange={(e) => setNewBitacora({ ...newBitacora, fecha: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Descripción / Actividad</label>
                            <input 
                              type="text" 
                              placeholder="Ej: Vacunación en Itulcachi"
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none font-bold"
                              value={newBitacora.actividad}
                              onChange={(e) => setNewBitacora({ ...newBitacora, actividad: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Consultas / Procedimientos (Opcional)</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 15 canalizaciones, 3 curaciones"
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                              value={newBitacora.procedimientos}
                              onChange={(e) => setNewBitacora({ ...newBitacora, procedimientos: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Observaciones / Aprendizaje (Opcional)</label>
                            <textarea 
                              rows={3}
                              placeholder="¿Qué aprendiste hoy?"
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                              value={newBitacora.observaciones}
                              onChange={(e) => setNewBitacora({ ...newBitacora, observaciones: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                          <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-accent/5 cursor-pointer">
                            <div className="flex items-center">
                              <Clipboard size={18} className="mr-2 text-primary" />
                              <span className="text-sm font-medium">Crear tarea pendiente</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={newBitacora.createTask}
                              onChange={(e) => setNewBitacora({ ...newBitacora, createTask: e.target.checked })}
                              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            />
                          </label>
                        </div>

                        <button 
                          onClick={handleAddBitacora}
                          disabled={!newBitacora.actividad}
                          className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-all active:scale-95 mt-4 disabled:opacity-50"
                        >
                          Guardar Actividad
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Shift Modal (Turnos) */}
            <AnimatePresence>
              {isShiftModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full max-w-lg"
                  >
                    <Card className="space-y-6 shadow-2xl border-primary/20">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black flex items-center">
                          <Clock size={24} className="mr-2 text-primary" />
                          Registrar Turno
                        </h3>
                        <button onClick={() => setIsShiftModalOpen(false)} className="p-2 hover:bg-accent rounded-full">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-6">
                        {/* Sección 1: Período del Servicio */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-primary uppercase tracking-wider border-b border-border pb-2">1. Período del Servicio</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-muted-foreground uppercase mb-1 block tracking-widest">Rotación / Servicio</label>
                              <select 
                                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm font-bold shadow-sm"
                                value={newShift.servicioActual}
                                onChange={(e) => setNewShift({ ...newShift, servicioActual: e.target.value })}
                              >
                                <option value="">Seleccionar Servicio...</option>
                                {SERVICIOS.map(s => (
                                  <option key={s.name} value={s.name}>{s.name}</option>
                                ))}
                                <option value="Otro">Otro (Especificar)</option>
                              </select>
                              {newShift.servicioActual === '' && monthlyServices[`${new Date(newShift.fechaInicio).getMonth() + 1}-${new Date(newShift.fechaInicio).getFullYear()}`] && (
                                <p className="text-[9px] text-primary/70 font-bold italic animate-pulse">
                                  Sugiere: {monthlyServices[`${new Date(newShift.fechaInicio).getMonth() + 1}-${new Date(newShift.fechaInicio).getFullYear()}`]} (Servicio Mensual)
                                </p>
                              )}
                              {newShift.servicioActual === 'Otro' && (
                                <input 
                                  type="text"
                                  placeholder="Nombre del servicio..."
                                  className="w-full p-2.5 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none text-sm font-bold"
                                  value={newShift.customServicio}
                                  onChange={(e) => setNewShift({ ...newShift, customServicio: e.target.value })}
                                />
                              )}
                            </div>
                            <div>
                               <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Presets de Turno</label>
                               <div className="grid grid-cols-3 gap-2">
                                  {Object.entries(SHIFT_PRESETS).map(([key, preset]) => (
                                    <button
                                      key={key}
                                      onClick={() => setNewShift({ ...newShift, tipoTurno: key })}
                                      className={`p-2 rounded-xl border text-[10px] font-black uppercase transition-all ${newShift.tipoTurno === key ? 'border-primary ring-2 ring-primary/10' : 'border-border grayscale hover:grayscale-0'}`}
                                      style={{ color: preset.color, backgroundColor: newShift.tipoTurno === key ? `${preset.color}10` : 'transparent' }}
                                    >
                                      {key}
                                    </button>
                                  ))}
                               </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Fecha de Inicio</label>
                              <input 
                                type="date" 
                                className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                value={newShift.fechaInicio}
                                onChange={(e) => setNewShift({ ...newShift, fechaInicio: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Fecha de Fin</label>
                              <input 
                                type="date" 
                                className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                value={newShift.fechaFin}
                                onChange={(e) => setNewShift({ ...newShift, fechaFin: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sección 2: Horario y Ubicación */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-primary uppercase tracking-wider border-b border-border pb-2">2. Horario y Ubicación</h4>
                          
                          <div>
                            <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Días de la Semana</label>
                            <div className="flex flex-wrap gap-2">
                              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
                                <label key={dia} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors border ${newShift.diasSemana.includes(dia) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:bg-accent'}`}>
                                  <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={newShift.diasSemana.includes(dia)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setNewShift({ ...newShift, diasSemana: [...newShift.diasSemana, dia] });
                                      } else {
                                        setNewShift({ ...newShift, diasSemana: newShift.diasSemana.filter(d => d !== dia) });
                                      }
                                    }}
                                  />
                                  {dia.substring(0, 3)}
                                </label>
                              ))}
                            </div>
                            
                            {newShift.diasSemana.length > 0 && (
                              <div className="space-y-3 mt-4 p-4 border border-border bg-accent/5 rounded-xl block">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block">Horario Específico por Día</label>
                                {newShift.diasSemana.map(dia => (
                                  <div key={dia} className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-2 p-2 bg-background border border-border rounded-lg">
                                    <span className="text-sm font-bold w-full md:w-24 shrink-0">{dia}</span>
                                    <div className="flex items-center space-x-2 shrink-0">
                                       <input 
                                         type="time" 
                                         className="p-1 text-xs border border-border rounded bg-accent/20"
                                         value={newShift.horariosPorDia[dia]?.entrada || SHIFT_PRESETS[newShift.tipoTurno as keyof typeof SHIFT_PRESETS]?.start || '07:00'}
                                         onChange={(e) => setNewShift({...newShift, horariosPorDia: {...newShift.horariosPorDia, [dia]: { ...(newShift.horariosPorDia[dia] || {}), entrada: e.target.value }}})} 
                                       />
                                       <span className="text-xs text-muted-foreground">-</span>
                                       <input 
                                         type="time" 
                                         className="p-1 text-xs border border-border rounded bg-accent/20"
                                         value={newShift.horariosPorDia[dia]?.salida || SHIFT_PRESETS[newShift.tipoTurno as keyof typeof SHIFT_PRESETS]?.end || '19:00'}
                                         onChange={(e) => setNewShift({...newShift, horariosPorDia: {...newShift.horariosPorDia, [dia]: { ...(newShift.horariosPorDia[dia] || {}), salida: e.target.value }}})} 
                                       />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Ubicación / Piso / Cama (Opcional)</label>
                              <input 
                                type="text" 
                                placeholder="Ej: Sala de Partos, Cama 12, Piso 4"
                                className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                value={newShift.ubicacionPiso}
                                onChange={(e) => setNewShift({ ...newShift, ubicacionPiso: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Checklist de Relevo / Pendientes (Opcional)</label>
                              <textarea 
                                rows={2}
                                placeholder="Ej: Control de líquidos, pendiente cultivo..."
                                className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
                                value={newShift.checklistRelevo}
                                onChange={(e) => setNewShift({ ...newShift, checklistRelevo: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={handleAddShift}
                          disabled={!newShift.servicioActual && !monthlyServices[`${new Date(newShift.fechaInicio).getMonth() + 1}-${new Date(newShift.fechaInicio).getFullYear()}`] && newShift.tipoTurno !== 'X/L' && newShift.tipoTurno !== 'D/A'}
                          className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-all active:scale-95 mt-4 disabled:opacity-50"
                        >
                          {newShift.tipoTurno === 'X/L' ? 'Confirmar Día Libre' : newShift.tipoTurno === 'D/A' ? 'Confirmar Día Académico' : 'Guardar Turno'}
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'farmacologia':
        const drugCategories = ['Todos', 'Analgésicos', 'Antibióticos', 'Cardiovascular', 'Gastrointestinal', 'Respiratorio', 'Sedantes', 'Emergencia'];
        
        const getDrugCategory = (drug: Drug): string => {
          const clase = drug.claseTerapeutica.toLowerCase();
          const familia = drug.familia.toLowerCase();
          
          if (
            clase.includes('emergencia') || clase.includes('paro') || clase.includes('choque') || 
            clase.includes('antídoto') || clase.includes('reanimación') || 
            drug.icon === 'Zap' || drug.icon === 'Ambulance'
          ) return 'Emergencia';

          if (
            clase.includes('sedante') || clase.includes('hipnótico') || clase.includes('benzodiazepina') || 
            clase.includes('ansiolítico') || clase.includes('relajante muscular') || 
            familia.includes('benzodiazepina') || familia.includes('barbitúrico') ||
            clase.includes('anestésico')
          ) return 'Sedantes';
          
          if (clase.includes('analgésico') || clase.includes('antipirético') || clase.includes('opioide') || clase.includes('aine')) return 'Analgésicos';
          if (clase.includes('antibiótico') || familia.includes('penicilina') || familia.includes('cefalosporina') || familia.includes('macrólido') || familia.includes('quinolona') || familia.includes('carbapenem') || familia.includes('glicopéptido')) return 'Antibióticos';
          if (
            clase.includes('hiperten') || clase.includes('cardio') || clase.includes('arritmia') || 
            clase.includes('inotrópico') || clase.includes('vasopresor') || clase.includes('coagulante') || 
            clase.includes('agregante') || clase.includes('lipemiante') || clase.includes('vasodilatador') || 
            clase.includes('ieca') || clase.includes('ara ii') || clase.includes('beta-bloqueante') || 
            clase.includes('calcioantagonista') || clase.includes('diurético') || clase.includes('nitrato') ||
            familia.includes('estatina') || familia.includes('tiazídico') || familia.includes('aldosterona') ||
            familia.includes('catecolamina') || familia.includes('glucósido')
          ) return 'Cardiovascular';
          if (
            clase.includes('bomba de protones') || clase.includes('gastro') || clase.includes('antiácido') || 
            clase.includes('antiemético') || clase.includes('procinético') || clase.includes('antiespasmódico') || 
            clase.includes('antidiarréico') || clase.includes('laxante') || clase.includes('citoprotector') || 
            clase.includes('secretor') || familia.includes('benzimidazol')
          ) return 'Gastrointestinal';
          if (
            clase.includes('respiratorio') || clase.includes('broncodilatador') || 
            clase.includes('antiasmático') || clase.includes('mucolítico') || 
            clase.includes('antitusígeno') || familia.includes('beta-2') || 
            familia.includes('anticolinérgico') || familia.includes('xantina') ||
            familia.includes('leucotrieno')
          ) return 'Respiratorio';
          
          return 'Otros';
        };

        const filteredDrugs = DRUGS.filter(d => {
          const matchesSearch = d.nombreGenerico.toLowerCase().includes(drugSearch.toLowerCase()) || 
                               d.claseTerapeutica.toLowerCase().includes(drugSearch.toLowerCase());
          const category = getDrugCategory(d);
          const matchesCategory = drugSortBy === 'Todos' || category === drugSortBy;
          
          return matchesSearch && matchesCategory;
        }).sort((a, b) => a.nombreGenerico.localeCompare(b.nombreGenerico));

        const toggleCompare = (drug: Drug) => {
          if (selectedDrugsToCompare.find(d => d.id === drug.id)) {
            setSelectedDrugsToCompare(selectedDrugsToCompare.filter(d => d.id !== drug.id));
          } else {
            if (selectedDrugsToCompare.length >= 3) {
              toast.error('Máximo 3 medicamentos', { description: 'Solo puedes comparar hasta 3 medicamentos a la vez.' });
              return;
            }
            setSelectedDrugsToCompare([...selectedDrugsToCompare, drug]);
          }
        };

        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative pb-24">
            <SectionHeader title="Vademecum Vitastudent" subtitle="Consulta farmacológica completa con rigor clínico y búsqueda en tiempo real." />
            
            <div className="space-y-6 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={22} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre genérico, clase o indicación..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all text-lg"
                  value={drugSearch}
                  onChange={(e) => setDrugSearch(e.target.value)}
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {drugCategories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setDrugSortBy(cat)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full border transition-all text-sm font-bold ${drugSortBy === cat ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'border-border bg-card hover:bg-accent text-muted-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrugs.map(drug => {
                const DrugIcon = ICON_MAP[drug.icon] || Pill;
                const isSelectedForCompare = selectedDrugsToCompare.some(d => d.id === drug.id);
                
                return (
                  <Card key={drug.id} className={`flex flex-col border-l-8 transition-all hover:shadow-xl group ${isSelectedForCompare ? 'ring-2 ring-primary' : ''}`} style={{ borderLeftColor: drug.color }}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-grow pr-2">
                        <h4 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{drug.nombreGenerico}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{drug.claseTerapeutica}</p>
                          {drug.color === '#FFEBEE' && (
                            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[8px] font-black rounded uppercase tracking-tighter animate-pulse">
                              Alto Riesgo
                            </span>
                          )}
                          {drug.icon === 'Ambulance' && (
                            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded uppercase tracking-tighter">
                              Coche de Paro
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl shadow-inner transition-transform group-hover:scale-110" style={{ backgroundColor: `${drug.color}40` }}>
                        <DrugIcon className="text-primary" size={24} />
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-grow">
                      <div className="p-3 bg-accent/30 rounded-xl border border-border/50">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Efecto Sistémico</p>
                        <p className="text-xs leading-relaxed line-clamp-3 italic">"{drug.mecanismoAccion.efectoSistemico}"</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg">
                          <p className="text-[9px] font-bold text-primary uppercase">Inicio Acción</p>
                          <p className="text-[11px] font-medium truncate">{drug.farmacocinetica.inicioAccion}</p>
                        </div>
                        <div className="p-2 bg-orange-500/5 rounded-lg">
                          <p className="text-[9px] font-bold text-orange-600 uppercase">Presentación</p>
                          <p className="text-[11px] font-medium truncate">{drug.presentaciones}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <button 
                        onClick={() => setSelectedDrug(drug)}
                        className="flex-grow py-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-bold transition-all"
                      >
                        Ficha Técnica
                      </button>
                      <button 
                        onClick={() => toggleCompare(drug)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${isSelectedForCompare ? 'bg-primary text-primary-foreground border-primary shadow-inner' : 'border-border hover:bg-accent'}`}
                        title="Seleccionar para comparar"
                      >
                        <CheckCircle2 size={20} className={isSelectedForCompare ? 'text-primary-foreground' : 'text-muted-foreground'} />
                      </button>
                    </div>
                  </Card>
                );
              })}
              {filteredDrugs.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={40} className="text-muted-foreground opacity-20" />
                  </div>
                  <h3 className="text-xl font-bold text-muted-foreground">No se encontraron resultados</h3>
                  <p className="text-sm text-muted-foreground mt-2">Intenta con otro nombre genérico o categoría terapéutica.</p>
                </div>
              )}
            </div>

            {/* Comparison Floating Bar */}
            <AnimatePresence>
              {selectedDrugsToCompare.length > 0 && (
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl px-8 py-4 flex items-center gap-6 z-40 ring-1 ring-primary/20"
                >
                  <div className="flex flex-col">
                    <span className="font-black text-xs uppercase tracking-widest text-primary">Comparador</span>
                    <span className="text-sm font-medium">{selectedDrugsToCompare.length}/3 seleccionados</span>
                  </div>
                  <div className="flex -space-x-3">
                    {selectedDrugsToCompare.map(d => (
                      <div key={d.id} className="w-10 h-10 rounded-full border-4 border-card flex items-center justify-center text-xs font-black text-primary-foreground shadow-md" style={{ backgroundColor: d.color }}>
                        {d.nombreGenerico.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <div className="h-8 w-px bg-border mx-2" />
                  <button 
                    onClick={() => setIsCompareModalOpen(true)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Comparar Ahora
                  </button>
                  <button 
                    onClick={() => setSelectedDrugsToCompare([])}
                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full text-muted-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'protocolos':
        const filteredProtocols = PROTOCOLS.filter(p => {
          const matchesCategory = protocolCategory === 'Todos' || p.category.toLowerCase().includes(protocolCategory.toLowerCase().split(' ')[0]);
          const matchesSearch = p.title.toLowerCase().includes(protocolSearch.toLowerCase());
          return matchesCategory && matchesSearch;
        });

        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionHeader title="Guía y Protocolos" subtitle="Manuales de procedimientos y normativas MSP." />
            
            <div className="space-y-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar protocolo por título..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={protocolSearch}
                  onChange={(e) => setProtocolSearch(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {['Todos', 'Procedimientos', 'MSP Ecuador', 'Notas', 'Insumos'].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setProtocolCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all text-sm font-medium ${protocolCategory === cat ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'border-border hover:bg-accent'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredProtocols.map(protocol => (
                <Card 
                  key={protocol.id} 
                  onClick={() => toast.info(protocol.title, { description: protocol.content })}
                  className="flex items-center justify-between group cursor-pointer hover:border-primary"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{protocol.title}</h4>
                      <p className="text-sm text-muted-foreground">{protocol.category.toUpperCase()}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary transition-all" />
                </Card>
              ))}
              {filteredProtocols.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  No se encontraron protocolos en esta categoría.
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'servicios':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionHeader title="Servicios Hospitalarios" subtitle="Arquitectura de datos estática para rigor clínico." />
            
            {!selectedService ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SERVICIOS.map((servicio) => {
                  const ServiceIcon = ICON_MAP[servicio.icon] || LayoutGrid;
                  return (
                  <Card 
                    key={servicio.name} 
                    onClick={() => setSelectedService(servicio.name)}
                    className="cursor-pointer hover:bg-primary/5 hover:border-primary transition-all group p-4 shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                        <ServiceIcon size={24} />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold leading-tight">{servicio.name}</h3>
                    </div>
                  </Card>
                )})}
              </div>
            ) : selectedService === 'Medicina Interna' && !internaSubTab ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Servicios
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">Medicina Interna</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'patologias', title: '1. Patologías Frecuentes', subtitle: 'Neumología, Cardiología, Neurología, Nefro, Gastro', icon: Activity },
                    { id: 'escalas', title: '2. Escalas y Scores', subtitle: 'CURB-65, Child-Pugh, Cockcroft-Gault, TIMI', icon: Calculator },
                    { id: 'protocolos', title: '3. Protocolos y Esquemas', subtitle: 'Insulina, Electrolitos, Anticoagulación', icon: Clipboard },
                    { id: 'visita', title: '4. Pase de Visita y Notas', subtitle: 'Estructura SOAP, Herramienta SAER (SBAR)', icon: FileText },
                    { id: 'diagnostico', title: '5. Diagnóstico Avanzado', subtitle: 'Algoritmo Ácido-Base, Perfiles Hepáticos/Anemias', icon: Search }
                  ].map((block) => (
                    <Card 
                      key={block.id} 
                      onClick={() => {
                        setInternaSubTab(block.id);
                        setSelectedScaleId(null);
                        setSelectedVisitaTool(null);
                        setSelectedProtocolId(null);
                        setSelectedDiagTool(null);
                        setSelectedDisease(null);
                        setCirugiaSubTab(null);
                      }}
                      className="cursor-pointer hover:border-primary transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <block.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{block.title}</h4>
                          <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : selectedService === 'Salud Comunitaria' && !communitySubTab ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Servicios
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">Salud Comunitaria</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'inmunizaciones', title: '1. Inmunizaciones', subtitle: 'Manual del Vacunador, Esquemas y Cadena de Frío.', icon: Syringe },
                    { id: 'vigilancia', title: '2. Vigilancia Epidemiológica', subtitle: 'Enfermedades de Notificación Obligatoria (EPI-1).', icon: Shield },
                    { id: 'ciclo_vida', title: '3. Programas de Ciclo de Vida', subtitle: 'Control del Niño Sano, Salud Materna y ECNT.', icon: Baby },
                    { id: 'territorio', title: '4. Herramientas de Territorio', subtitle: 'Ficha Familiar, Visita Domiciliaria y Saneamiento.', icon: MapPin },
                  ].map((block) => (
                    <Card 
                      key={block.id} 
                      onClick={() => setCommunitySubTab(block.id)}
                      className="cursor-pointer hover:border-primary transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <block.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{block.title}</h4>
                          <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : selectedService === 'Gineco-Obstetricia' && !ginecoSubTab ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Servicios
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">Gineco-Obstetricia</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'control_prenatal', title: '1. Control Prenatal y Evaluación', subtitle: 'Carné Perinatal, Cálculo de Edad Gestacional y FPP.', icon: Activity },
                    { id: 'emergencias', title: '2. Emergencias Obstétricas', subtitle: 'Manejo de Patologías de Emergencia (Atonía, Preeclampsia, etc).', icon: AlertTriangle },
                    { id: 'claves', title: '3. Protocolos de Claves', subtitle: 'Manejo y activación de Clave Roja, Azul y Amarilla.', icon: ShieldAlert },
                    { id: 'parto', title: '4. Parto, Puerperio y Lactancia', subtitle: 'Trabajo de parto, alumbramiento y lactancia.', icon: Baby },
                    { id: 'salud_sexual', title: '5. Salud Sexual y Reproductiva', subtitle: 'Métodos anticonceptivos, Citología y manejo de ITS.', icon: HeartPulse },
                  ].map((block) => (
                    <Card 
                      key={block.id} 
                      onClick={() => {
                        setGinecoSubTab(block.id);
                        setSelectedPartoTopic(null);
                        setSelectedSaludSexualTopic(null);
                        setSelectedDisease(null);
                      }}
                      className="cursor-pointer hover:border-primary transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <block.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{block.title}</h4>
                          <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : selectedService === 'Emergencias' && !emergencySubTab ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Servicios
                </button>
                <div className="flex items-center gap-3 border-l-4 border-red-500 pl-3">
                   <AlertTriangle className="text-red-500" size={24} />
                   <h3 className="text-xl sm:text-2xl font-bold">Servicio de Emergencias</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'patologias', title: '1. Patologías de Emergencia', subtitle: 'Enfoque por Sistemas y Red Flags.', icon: Activity },
                    { id: 'codigos', title: '2. Códigos de Emergencia', subtitle: 'Azul, Rojo, Oro, Plata, Rosa, Violeta.', icon: Bell },
                    { id: 'medicamentos', title: '3. Medicamentos (Carro de Paro)', subtitle: 'Vasoactivos, Antiarrítmicos, SIR y Antídotos.', icon: Pill },
                    { id: 'procedimientos', title: '4. Intervenciones y Procedimientos', subtitle: 'SIR, Vía Aérea, Accesos y Monitorización.', icon: Stethoscope },
                    { id: 'escalas', title: '5. Escalas de Emergencia', subtitle: 'qSOFA, Cincinnati, Wells, Glasgow.', icon: Calculator },
                  ].map((block) => (
                    <Card 
                      key={block.id} 
                      onClick={() => setEmergencySubTab(block.id)}
                      className="cursor-pointer hover:border-red-500 transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                          <block.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{block.title}</h4>
                          <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : selectedService === 'Cirugía' && !cirugiaSubTab && !selectedDisease ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Servicios
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">Estructura del Servicio de Cirugía y Quirófano</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'cir_entorno', title: '1. Entorno y Logística', subtitle: 'Sistema de Contención Biológica y Cadena de Asepsia.', icon: Scissors },
                    { id: 'cir_zonificacion', title: '2. Zonificación Estándar', subtitle: 'Arquitectura Quirúrgica: Zonas Negra, Gris y Blanca.', icon: Shield },
                    { id: 'cir_equipo', title: '3. Equipamiento y Mobiliario', subtitle: 'Mesa Quirúrgica, Torres y Unidad de Electrocirugía.', icon: Zap },
                    { id: 'cir_instrumental', title: '4. Instrumental Quirúrgico', subtitle: 'Organización por Tiempos: Diéresis, Hemostasia...', icon: Scissors },
                    { id: 'cir_humanos', title: '5. Equipo Quirúrgico y Roles', subtitle: 'El "Baile" entre Equipo Estéril y No Estéril.', icon: Users },
                    { id: 'cir_fisiopato', title: '6. Respuesta Metabólica', subtitle: 'Fisiopatología: Efectos hormonales y termorregulación.', icon: Activity },
                    { id: 'patologias', title: '7. Patologías Frecuentes', subtitle: 'Apendicitis, Colecistitis, Obstrucción intestinal y más.', icon: AlertCircle },
                  ].map((block) => (
                    <Card 
                      key={block.id} 
                      onClick={() => {
                        if (block.id === 'patologias') {
                          setSelectedDisease(null); 
                          setCirugiaSubTab('patologias');
                        } else {
                          setSelectedDisease(null);
                          setCirugiaSubTab(block.id);
                        }
                      }}
                      className="cursor-pointer hover:border-primary transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <block.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{block.title}</h4>
                          <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => { 
                    if (selectedService === 'Salud Comunitaria' && communitySubTab) {
                      setCommunitySubTab(null);
                      setSelectedDisease(null);
                    } else if (selectedService === 'Cirugía' && cirugiaSubTab) {
                      setCirugiaSubTab(null);
                      setSelectedDisease(null);
                    } else if (selectedService === 'Gineco-Obstetricia' && ginecoSubTab) {
                      setGinecoSubTab(null);
                      setSelectedDisease(null);
                      setSelectedPartoTopic(null);
                      setSelectedClaveTopic(null);
                    } else if (selectedService === 'Medicina Interna' && internaSubTab) {
                      setInternaSubTab(null);
                      setSelectedDisease(null);
                      setSelectedScaleId(null);
                      setSelectedVisitaTool(null);
                      setSelectedProtocolId(null);
                    } else if (selectedService === 'Emergencias' && emergencySubTab) {
                      setEmergencySubTab(null);
                      setSelectedDisease(null);
                      setSelectedScaleId(null);
                    } else {
                      setSelectedService(null); 
                      setSelectedDisease(null); 
                    }
                  }}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver {communitySubTab ? 'a Salud Comunitaria' : cirugiaSubTab ? 'a Cirugía' : ginecoSubTab ? 'a Gineco-Obstetricia' : internaSubTab ? 'a Medicina Interna' : emergencySubTab ? 'a Emergencias' : 'a Servicios'}
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">
                  {communitySubTab ? (
                    communitySubTab === 'inmunizaciones' ? 'Inmunizaciones' :
                    communitySubTab === 'vigilancia' ? 'Vigilancia Epidemiológica' :
                    communitySubTab === 'ciclo_vida' ? 'Programas de Ciclo de Vida' :
                    'Herramientas de Territorio'
                  ) : cirugiaSubTab ? (
                    cirugiaSubTab === 'patologias' ? 'Patologías Quirúrgicas Frecuentes' : 'Estructura del Servicio'
                  ) : ginecoSubTab ? (
                    ginecoSubTab === 'control_prenatal' ? 'Control Prenatal y Evaluación' :
                    ginecoSubTab === 'emergencias' ? 'Emergencias Obstétricas' :
                    ginecoSubTab === 'claves' ? 'Protocolos de Claves' :
                    ginecoSubTab === 'parto' ? 'Parto, Puerperio y Lactancia' :
                    'Salud Sexual y Reproductiva'
                  ) : internaSubTab ? (
                    internaSubTab === 'patologias' ? 'Patologías Frecuentes' :
                    internaSubTab === 'escalas' ? 'Escalas y Scores' :
                    internaSubTab === 'protocolos' ? 'Protocolos y Esquemas' :
                    internaSubTab === 'visita' ? 'Pase de Visita y Notas' :
                    'Diagnóstico Avanzado'
                  ) : cirugiaSubTab ? (
                    cirugiaSubTab === 'patologias' ? 'Patologías Quirúrgicas Frecuentes' :
                    'Estructura del Servicio'
                  ) : selectedService}
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        {communitySubTab === 'vigilancia' ? 'Enfermedades de Notificación' : ginecoSubTab === 'emergencias' ? 'Patologías de Emergencia' : ginecoSubTab === 'claves' ? 'Protocolo Activo' : emergencySubTab === 'patologias' ? 'Enfoque por Sistemas' : internaSubTab === 'patologias' ? 'Sistemas' : internaSubTab === 'escalas' ? 'Lista de Escalas' : internaSubTab === 'visita' ? 'Modelos de Notas' : internaSubTab === 'protocolos' ? 'Lista de Protocolos' : cirugiaSubTab === 'patologias' ? 'Lista de Cirugía' : cirugiaSubTab ? 'Apartados' : 'Contenidos'}
                    </p>
                    <div className="flex flex-col gap-2 max-h-[30vh] lg:max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
                      {selectedService === 'Salud Comunitaria' ? (
                        communitySubTab === 'vigilancia' ? (
                          DISEASES.filter(d => d.servicio === 'Salud Comunitaria').map(disease => (
                            <button
                              key={disease.id}
                              onClick={() => setSelectedDisease(disease)}
                              className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                            >
                              <p className="font-bold truncate">{disease.nombre}</p>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-muted-foreground italic bg-accent/10 rounded-lg">
                            Selecciona un bloque operativo para ver el detalle.
                          </div>
                        )
                      ) : selectedService === 'Gineco-Obstetricia' ? (
                        ginecoSubTab === 'emergencias' ? (
                          DISEASES.filter(d => ['go1','go2','go3','go4','go5','go6','go8','go12'].includes(d.id)).map(disease => (
                            <button
                              key={disease.id}
                              onClick={() => setSelectedDisease(disease)}
                              className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                            >
                              <p className="font-bold truncate">{disease.nombre}</p>
                            </button>
                          ))
                        ) : ginecoSubTab === 'claves' ? (
                          <>
                            <div className="mb-2 mt-2 text-xs font-bold text-muted-foreground uppercase px-2">Claves de Emergencia</div>
                            {[
                              { id: 'roja', name: 'Clave Roja (Hemorragia)', desc: 'Choque Hipovolémico', icon: Droplet },
                              { id: 'azul', name: 'Clave Azul (Hipertensión)', desc: 'Preeclampsia / Eclampsia', icon: Activity },
                              { id: 'amarilla', name: 'Clave Amarilla (Sepsis)', desc: 'Sepsis y Choque Séptico', icon: ShieldAlert }
                            ].map(topic => (
                              <button
                                key={topic.id}
                                onClick={() => setSelectedClaveTopic(topic.id)}
                                className={`w-full text-left p-3 rounded-lg border transition-all text-sm flex items-center space-x-3 mb-2 ${selectedClaveTopic === topic.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                              >
                                <topic.icon size={18} className={selectedClaveTopic === topic.id ? 'text-primary-foreground text-white' : 'text-primary'} />
                                <div>
                                  <p className="font-bold truncate leading-tight">{topic.name}</p>
                                  <p className={`text-[10px] ${selectedClaveTopic === topic.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{topic.desc}</p>
                                </div>
                              </button>
                            ))}
                          </>
                        ) : ginecoSubTab === 'parto' ? (
                          <>
                            <div className="mb-2 mt-2 text-xs font-bold text-muted-foreground uppercase px-2">Temas Clínicos</div>
                            {[
                              { id: 'parto', name: 'Trabajo de Parto y Parto', icon: Activity, desc: 'Mecanismos, Partograma, MATPE' },
                              { id: 'puerperio', name: 'Puerperio', icon: History, desc: 'Las 4 Ts, Involución, Bristol' },
                              { id: 'lactancia', name: 'Lactancia y RN', icon: Heart, desc: 'Técnicas, lactancia' },
                              { id: 'escalas', name: 'Escalas Neonatales', icon: Clipboard, desc: 'APGAR, Silverman, Capurro, Usher' }
                            ].map(topic => (
                              <button
                                key={topic.id}
                                onClick={() => { setSelectedPartoTopic(topic.id); setSelectedDisease(null); }}
                                className={`w-full text-left p-3 rounded-lg border transition-all text-sm mb-2 ${selectedPartoTopic === topic.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                              >
                                <div className="flex items-center gap-2">
                                  <topic.icon size={16} className={selectedPartoTopic === topic.id ? 'text-white' : 'text-primary'} />
                                  <p className="font-bold truncate">{topic.name}</p>
                                </div>
                                <p className="text-[10px] opacity-70 truncate ml-6">{topic.desc}</p>
                              </button>
                            ))}

                            <div className="mb-2 mt-4 text-xs font-bold text-muted-foreground uppercase px-2">Patologías</div>
                            {DISEASES.filter(d => ['go4','go7','go9','go10','go11'].includes(d.id)).map(disease => (
                              <button
                                key={disease.id}
                                onClick={() => { setSelectedDisease(disease); setSelectedPartoTopic(null); }}
                                className={`w-full text-left p-3 mb-2 rounded-lg border transition-all text-sm ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                              >
                                <p className="font-bold truncate">{disease.nombre}</p>
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="p-4 text-center text-sm text-muted-foreground italic bg-accent/10 rounded-lg">
                            Selecciona un bloque operativo para ver el detalle.
                          </div>
                        )
                      ) : selectedService === 'Medicina Interna' && internaSubTab === 'escalas' ? (
                        MEDICAL_SCORES.map(score => (
                          <button
                            key={score.id}
                            onClick={() => setSelectedScaleId(score.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedScaleId === score.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={selectedScaleId === score.id ? 'text-white' : 'text-primary'}>
                                {React.cloneElement(score.icon as React.ReactElement, { size: 14 })}
                              </span>
                              <p className="font-bold truncate">{score.name}</p>
                            </div>
                            <p className="text-[10px] opacity-70 truncate ml-5">{score.system}</p>
                          </button>
                        ))
                      ) : selectedService === 'Medicina Interna' && internaSubTab === 'visita' ? (
                        [
                          { id: 'soap', name: 'SOAP (Evolución Diaria)', icon: FileText, desc: 'Estructura estándar de nota médica' },
                          { id: 'saer', name: 'SAER / SBAR (Emergencia)', icon: AlertTriangle, desc: 'Comunicación crítica de crisis' },
                          { id: 'fasthugs', name: 'FAST HUGS BID (Seguridad)', icon: ShieldCheck, desc: 'Checklist de seguridad del paciente' }
                        ].map(tool => (
                          <button
                            key={tool.id}
                            onClick={() => setSelectedVisitaTool(tool.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedVisitaTool === tool.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                          >
                            <div className="flex items-center gap-2">
                              <tool.icon size={16} className={selectedVisitaTool === tool.id ? 'text-white' : 'text-primary'} />
                              <p className="font-bold truncate">{tool.name}</p>
                            </div>
                            <p className="text-[10px] opacity-70 truncate ml-6">{tool.desc}</p>
                          </button>
                        ))
                      ) : selectedService === 'Medicina Interna' && internaSubTab === 'protocolos' ? (
                        CLINICAL_PROTOCOLS.map(protocol => (
                          <button
                            key={protocol.id}
                            onClick={() => setSelectedProtocolId(protocol.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedProtocolId === protocol.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                          >
                            <div className="flex items-center gap-2">
                              <Clipboard size={16} className={selectedProtocolId === protocol.id ? 'text-white' : 'text-primary'} />
                              <p className="font-bold truncate">{protocol.title}</p>
                            </div>
                            <p className="text-[10px] opacity-70 truncate ml-6">{protocol.category}</p>
                          </button>
                        ))
                      ) : selectedService === 'Medicina Interna' && internaSubTab === 'diagnostico' ? (
                        [
                          { id: 'acido-base', name: 'Algoritmo Ácido-Base', icon: Wind, desc: 'Gasometría rápida' },
                          { id: 'hepatico', name: 'Perfil Hepático', icon: Activity, desc: 'Patrón hepatocelular/colestásico' },
                          { id: 'anemias', name: 'Perfil Anemias (VCM)', icon: Droplet, desc: 'Micro, Normo y Macrocítica' }
                        ].map(tool => (
                          <button
                            key={tool.id}
                            onClick={() => setSelectedDiagTool(tool.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedDiagTool === tool.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                          >
                            <div className="flex items-center gap-2">
                              <tool.icon size={16} className={selectedDiagTool === tool.id ? 'text-white' : 'text-primary'} />
                              <p className="font-bold truncate">{tool.name}</p>
                            </div>
                            <p className="text-[10px] opacity-70 truncate ml-6">{tool.desc}</p>
                          </button>
                        ))
                      ) : selectedService === 'Medicina Interna' && internaSubTab === 'patologias' ? (
                        <div className="space-y-4">
                          {Array.from(new Set(DISEASES.filter(d => d.servicio === 'Medicina Interna').map(d => d.system).filter(Boolean))).map(system => (
                            <div key={system} className="space-y-1">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 px-1">
                                {system}
                              </h4>
                              <div className="space-y-1">
                                {DISEASES.filter(d => d.servicio === 'Medicina Interna' && d.system === system).map(disease => (
                                  <button
                                    key={disease.id}
                                    onClick={() => setSelectedDisease(disease)}
                                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]' : 'bg-card border-border hover:bg-accent ring-offset-background hover:ring-2 hover:ring-primary/20'}`}
                                  >
                                    <p className="font-bold truncate">{disease.nombre}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedService === 'Emergencias' ? (
                        emergencySubTab === 'patologias' ? (
                          <div className="space-y-4">
                            {Array.from(new Set(DISEASES.filter(d => d.servicio === 'Emergencias').map(d => d.system).filter(Boolean))).map(system => (
                              <div key={system} className="space-y-1">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 mb-2 px-1">
                                  {system}
                                </h4>
                                <div className="space-y-1">
                                  {DISEASES.filter(d => d.servicio === 'Emergencias' && d.system === system).map(disease => (
                                    <button
                                      key={disease.id}
                                      onClick={() => setSelectedDisease(disease)}
                                      className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs ${selectedDisease?.id === disease.id ? 'bg-red-500 text-white border-red-500 shadow-lg scale-[1.02]' : 'bg-card border-border hover:bg-accent ring-offset-background hover:ring-2 hover:ring-red-500/20'}`}
                                    >
                                      <p className="font-bold truncate">{disease.nombre}</p>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {DISEASES.filter(d => d.servicio === 'Emergencias').length === 0 && (
                              <div className="p-4 text-center text-xs text-muted-foreground italic">
                                Usa los Red Flags en la sección principal.
                              </div>
                            )}
                          </div>
                        ) : emergencySubTab === 'escalas' ? (
                          [
                            { id: 'qsofa', name: 'qSOFA', system: 'Sepsis' },
                            { id: 'cincinnati', name: 'Escala Cincinnati', system: 'Ictus' },
                            { id: 'wells', name: 'Escala de Wells', system: 'TEP' },
                            { id: 'glasgow', name: 'Escala de Glasgow', system: 'Conciencia' }
                          ].map(score => {
                            const actualScore = MEDICAL_SCORES.find(s => s.id === score.id);
                             return (
                              <button
                                key={score.id}
                                onClick={() => setSelectedScaleId(score.id)}
                                className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedScaleId === score.id ? 'bg-red-500 text-white border-red-500 shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                              >
                                <div className="flex items-center gap-2">
                                  <Calculator size={14} className={selectedScaleId === score.id ? 'text-white' : 'text-red-500'} />
                                  <p className="font-bold truncate">{score.name}</p>
                                </div>
                                <p className="text-[10px] opacity-70 truncate ml-5">{score.system}</p>
                              </button>
                            );
                          })
                        ) : (
                          <div className="p-4 text-center text-sm text-muted-foreground italic bg-red-500/5 rounded-lg border border-red-500/10">
                            Consulta la guía rápida en el panel principal.
                          </div>
                        )
                      ) : selectedService === 'Cirugía' ? (
                         cirugiaSubTab === 'patologias' ? (
                           DISEASES.filter(d => d.servicio === 'Cirugía' && !d.id.startsWith('cir_')).map(disease => (
                             <button
                               key={disease.id}
                               onClick={() => setSelectedDisease(disease)}
                               className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                             >
                               <p className="font-bold truncate">{disease.nombre}</p>
                             </button>
                           ))
                         ) : (
                           [
                             { id: 'cir_entorno', title: '1. Entorno', icon: Scissors },
                             { id: 'cir_zonificacion', title: '2. Zonificación', icon: Shield },
                             { id: 'cir_equipo', title: '3. Equipamiento', icon: Zap },
                             { id: 'cir_instrumental', title: '4. Instrumental', icon: Scissors },
                             { id: 'cir_humanos', title: '5. Roles', icon: Users },
                             { id: 'cir_fisiopato', title: '6. Respuesta', icon: Activity },
                           ].map(block => (
                             <button
                               key={block.id}
                               onClick={() => setCirugiaSubTab(block.id)}
                               className={`w-full text-left p-3 rounded-lg border transition-all text-sm flex items-center space-x-2 ${cirugiaSubTab === block.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                             >
                               <block.icon size={16} />
                               <p className="font-bold truncate">{block.title}</p>
                             </button>
                           ))
                         )
                      ) : (
                        DISEASES.filter(d => d.servicio === selectedService).map(disease => (
                          <button
                            key={disease.id}
                            onClick={() => setSelectedDisease(disease)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${selectedDisease?.id === disease.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-accent'}`}
                          >
                            <p className="font-bold truncate">{disease.nombre}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    {/* Render specific content for non-disease subtabs or the disease detail */}
                    
                    
                    
                    {/* CIRUGIA CUSTOM BLOCKS */}
                    
                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_entorno' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary border-b pb-4">
                          <Scissors size={28} />
                          <h4 className="text-2xl font-bold">1. El Sistema de Contención Biológica (Profundización)</h4>
                        </div>
                        
                        <div className="text-sm text-foreground space-y-6 pt-2">
                          
                          {/* 1. Dinámica de Presiones y Filtrado de Aire */}
                          <div className="space-y-3">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><Wind size={20}/> 1. Dinámica de Presiones y Filtrado de Aire</h5>
                            <p className="text-muted-foreground">El quirófano no es una habitación común; es un entorno de presión controlada.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg shadow-sm">
                                <h6 className="font-bold text-blue-700 mb-1 leading-tight">Presión Positiva</h6>
                                <p className="text-xs text-muted-foreground">El aire siempre sale del quirófano hacia los pasillos cuando se abre la puerta, nunca al revés. Esto evita que entren partículas suspendidas del área gris hacia la zona estéril.</p>
                              </div>
                              <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-lg shadow-sm">
                                <h6 className="font-bold text-teal-700 mb-1 leading-tight">Filtros HEPA</h6>
                                <p className="text-xs text-muted-foreground">Retienen el 99.97% de partículas (High Efficiency Particulate Air). El aire se renueva entre <strong>15 a 20 veces por hora</strong> para barrer activamente cualquier carga bacteriana.</p>
                              </div>
                              <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-lg shadow-sm">
                                <h6 className="font-bold text-orange-700 mb-1 leading-tight">Humedad y Temperatura</h6>
                                <p className="text-xs text-muted-foreground">Se mantiene entre <strong>40-60% de humedad</strong> (para evitar proliferación bacteriana y la estática) y entre <strong>18-23°C de temperatura</strong> (para comodidad del equipo y control metabólico del paciente).</p>
                              </div>
                            </div>
                          </div>

                          {/* 2. Protocolos de Flujo, Tráfico y Movimiento */}
                          <div className="space-y-3 mt-6">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><RotateCw size={20}/> 2. Protocolos de Flujo, Tráfico y Movimiento</h5>
                            <p className="text-muted-foreground">La bioseguridad depende de cómo se mueven las personas, el aire y los objetos en el espacio para mantener el aislamiento bacteriológico.</p>
                            <div className="bg-accent/30 p-4 border rounded-xl space-y-4">
                               <div className="flex items-start gap-4 pb-3 border-b border-border/50">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><ArrowUpDown size={16} className="text-primary"/></div>
                                 <div className="w-full">
                                   <strong className="text-foreground text-sm">Flujo Unidireccional y Tráfico de Materiales:</strong>
                                   <p className="text-xs text-muted-foreground mt-1">El instrumental estéril entra por una vía y el material contaminado sale por otra (zona de transferencia de sucio) para prohibir el cruce de vías e impedir la contaminación cruzada.</p>
                                 </div>
                               </div>

                               <div className="flex items-start gap-4 pb-3 border-b border-border/50">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><Users size={16} className="text-primary"/></div>
                                 <div className="w-full">
                                   <strong className="text-foreground text-sm">Tránsito del Personal (Comportamiento en Sala):</strong>
                                   <ul className="list-disc pl-5 text-xs text-muted-foreground mt-1 space-y-1">
                                     <li><strong>Personal Estéril:</strong> Se mueven "espalda con espalda" o "frente a frente". Nunca le dan la espalda al campo quirúrgico. Sus manos estériles siempre deben estar a la vista, sobre la cintura.</li>
                                     <li><strong>Personal No Estéril (Circulante/Anestesiólogo):</strong> Nunca deben pasar entre dos áreas estériles (ej. entre el cirujano y la mesa de mayo). Deben mantener una distancia mínima de <strong>30 a 45 cm</strong> (1 pie) del campo estéril y siempre estar de frente a él al pasar para evitar roces accidentales.</li>
                                   </ul>
                                 </div>
                               </div>

                               <div className="flex items-start gap-4 pb-3 border-b border-border/50">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><Wind size={16} className="text-primary"/></div>
                                 <div className="w-full">
                                   <strong className="text-foreground text-sm">Validación del Flujo de Aire (Laminar):</strong>
                                   <p className="text-xs text-muted-foreground mt-1 mb-2">El aire ultrafiltrado (HEPA) entra desde el techo (difusores de flujo laminar) directamente sobre la mesa quirúrgica, y el aire cargado de partículas se extrae por rejillas a nivel del suelo en las esquinas de la sala.</p>
                                   <div className="bg-background border p-2 rounded text-xs shadow-sm">
                                     <strong className="text-foreground block mb-1">¿Cómo comprobar que se mantiene el flujo adecuado?</strong>
                                     <ul className="list-disc pl-4 space-y-1">
                                       <li><strong>Manómetros:</strong> Verificar el manómetro diferencial (medidor de presión) antes de la cirugía; debe indicar presión positiva.</li>
                                       <li><strong>Prueba del papel/humo (empírica):</strong> Al entreabrir ligeramente la puerta, el flujo de aire empujará hacia afuera (hacia el pasillo).</li>
                                     </ul>
                                   </div>
                                 </div>
                               </div>

                               <div className="flex items-start gap-4">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><Settings size={16} className="text-primary"/></div>
                                 <div className="w-full">
                                   <strong className="text-foreground text-sm flex items-center gap-2">Gestión de Puertas <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">Norma Crítica</span></strong>
                                   <p className="text-xs text-muted-foreground mt-1">Cada vez que una puerta se abre, la <strong>presión positiva colapsa transitoriamente</strong> y el aire del pasillo (Gris) puede ingresar. <strong>Regla de oro:</strong> El equipo completo ingresa y permanece hasta concluir. Si la puerta debe abrirse, debe ser lo mínimo y cerrarse rápidamente.</p>
                                 </div>
                               </div>
                            </div>
                          </div>

                          {/* 3. El Triángulo de Asepsia */}
                          <div className="space-y-3 mt-6">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><ShieldCheck size={20}/> 3. El Triángulo de Asepsia (Mecánica de Barrera)</h5>
                            <p className="text-muted-foreground">Define las defensas estructuradas para contener la microbiota del personal, esterilizar el sitio quirúrgico y proteger al paciente frente a patógenos externos.</p>
                            
                            <div className="bg-card border rounded-xl overflow-hidden">
                              {/* Barrera Primaria */}
                              <div className="p-4 border-b border-border/50 bg-indigo-50/30 dark:bg-indigo-900/10 dark:border-indigo-900/30">
                                <strong className="text-indigo-800 dark:text-indigo-300 text-sm flex items-center gap-2 mb-1"><User size={16}/> Barrera Primaria (Hardware Personal)</strong>
                                <p className="text-xs text-muted-foreground mb-2">Pijama quirúrgica, gorro envolvente, mascarilla (cubriendo nariz y boca herméticamente) y calzado de uso exclusivo.</p>
                                <div className="bg-background/80 p-2 rounded text-[11px] text-foreground border border-border">
                                  <strong className="text-indigo-700 dark:text-indigo-400">Cuidado y Manejo:</strong> La pijama no debe salir bajo ninguna circunstancia de la zona gris/blanca. Si se humedece con fluidos corporales o sudor excesivo, debe cambiarse inmediatamente porque el líquido transporta bacterias de la piel a la superficie exterior.
                                </div>
                              </div>
                              
                              {/* Barrera Secundaria */}
                              <div className="p-4 border-b border-border/50 bg-purple-50/30 dark:bg-purple-900/10 dark:border-purple-900/30">
                                <strong className="text-purple-800 dark:text-purple-300 text-sm flex items-center gap-2 mb-1"><Box size={16}/> Barrera Secundaria (Perímetro Estéril)</strong>
                                <p className="text-xs text-muted-foreground mb-2">Batas estériles de manga larga con puños ajustados y campos quirúrgicos (telas o polímeros impermeables de grado médico).</p>
                                <div className="bg-background/80 p-2 rounded text-[11px] text-foreground border border-border mb-2">
                                  <strong className="text-purple-700 dark:text-purple-400">Cuidado y Manejo:</strong> Las batas se consideran estériles <em>sólo en la parte delantera (desde el pecho hasta el nivel del campo estéril), y las mangas (hasta 5 cm por encima del codo)</em>. La espalda, escote y axilas <strong>nunca se consideran estériles</strong> una vez puestas.
                                </div>
                                <div className="flex gap-2 items-start bg-red-50/50 dark:bg-red-900/10 p-2 border border-red-100 dark:border-red-900/20 rounded">
                                  <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                                  <p className="text-[11px] text-red-900 dark:text-red-300">
                                    <strong>¿Cuándo sabemos que se rompió la barrera?</strong> 
                                    <br/>1) <strong>Strike-through (Capilaridad):</strong> Si la tela estéril (campo o bata) se moja y entra en contacto con una superficie no estéril, el líquido actúa como "puente" y los microorganismos suben por capilaridad a la superficie estéril.
                                    <br/>2) <strong>Contacto Directo:</strong> Roce accidental con zonas no estériles, batas rotas, o manos enguantadas cayendo por debajo del nivel de la mesa quirúgica.
                                    <br/>3) <strong>Deterioro Físico:</strong> Presencia de desgarros, perforaciones o desgaste que genere pelusas (las pelusas aerosolizan bacterias biológicas).
                                  </p>
                                </div>
                              </div>
                              
                              {/* Barrera Química y Reprocesamiento */}
                              <div className="p-4 bg-pink-50/30 dark:bg-pink-900/10">
                                <strong className="text-pink-800 dark:text-pink-300 text-sm flex items-center gap-2 mb-1"><Droplet size={16}/> Barrera Química y Limpieza de Instrumentos</strong>
                                <p className="text-xs text-muted-foreground mb-2">Uso de antisépticos de acción residual y gestión de la biocarga en los equipos antes de su uso.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                  <div className="bg-background/80 p-2 rounded text-[11px] text-foreground border border-border">
                                    <strong className="block mb-1 border-b border-border pb-1 text-pink-700 dark:text-pink-400">Antisepsia de Piel y Manos:</strong> 
                                    Clorhexidina (al 2% o 4%) o Yodopovidona. Actúan destruyendo la pared celular bacteriana de forma sostenida. <strong>Regla:</strong> Se debe respetar el tiempo de secado antes de la incisión para asegurar la antisepsia total y evitar incendios (vapores de alcohol cerca del electrobisturí).
                                  </div>
                                  <div className="bg-background/80 p-2 rounded text-[11px] text-foreground border border-border">
                                    <strong className="block mb-1 border-b border-border pb-1 text-pink-700 dark:text-pink-400">¿Con qué y cómo se limpia el instrumental?</strong> 
                                    No basta con la esterilización térmica. Durante el lavado manual y en las lavadoras ultrasónicas en la CEyE, el instrumental se sumerge en <strong>detergentes multienzimáticos</strong> (con proteasas, lipasas y amilasas). Estas enzimas <em>degradan y cortan a nivel molecular</em> las biopelículas, sangre seca y grasa atrapada en las bisagras de las pinzas antes de ser esterilizados por Autoclave (vapor), Plasma o Gas.
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <WasteManagementBlock />
                        </div>
                      </Card>
                    )}

{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_zonificacion' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary border-b border-border/50 pb-4">
                          <Shield size={28} />
                          <h4 className="text-2xl font-bold">2. Zonificación Estándar (Arquitectura Quirúrgica)</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-6 pt-2">
                          
                          {/* 1. Introducción */}
                          <div className="space-y-2">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2">1. Introducción al Sistema de Barreras</h5>
                            <p className="text-muted-foreground leading-relaxed">
                              La zonificación es el diseño arquitectónico estratégico que permite el aislamiento del quirófano del resto del hospital. Su objetivo es crear un <strong className="text-foreground">gradiente de limpieza</strong> donde la carga microbiana disminuye a medida que nos acercamos al paciente. El paso entre zonas está delimitado por transferencias (físicas o de vestimenta) que actúan como filtros sanitarios.
                            </p>
                          </div>

                          {/* Zonas Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Zona Negra */}
                            <div className="p-5 bg-gray-500/10 border-t-8 border-gray-500 rounded-b-2xl shadow-sm relative group flex flex-col h-full">
                              <div className="absolute top-0 right-0 p-3 opacity-5"><MapPin size={64}/></div>
                              <div className="mb-4">
                                <h5 className="font-black text-gray-800 dark:text-gray-200 text-xl tracking-tight">Zona Negra</h5>
                                <span className="font-semibold text-xs uppercase tracking-wider text-gray-500 block mb-2">Área No Restringida</span>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Amortiguación entre el hospital general y el bloque quirúrgico.</p>
                              </div>
                              
                              <div className="space-y-4 text-xs flex-grow">
                                <div>
                                  <strong className="text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 flex">✅ PERMITIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-gray-600 dark:text-gray-400">
                                    <li>• Uniforme institucional / ropa de calle (solo hasta vestidores).</li>
                                    <li>• Ingreso de insumos clínicos en sus empaques corrugados o cartones originales.</li>
                                    <li>• Ingreso de pacientes en camillas de traslado piso-quirófano.</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-red-700 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">❌ TOTALMENTE PROHIBIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-gray-600 dark:text-gray-400">
                                    <li>• Ingresar a vestidores sin justificación asistencial.</li>
                                    <li>• Cruzar a la "trampa de botas" (límite gris) con ropa de calle, calzado externo o pijama de piso hospitalario.</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 flex">📦 ORGANIZACIÓN DE RECURSOS</strong>
                                  <p className="text-gray-600 dark:text-gray-400">Aquí se realiza la gestión de los embalajes secundarios (cartón). Los suministros se desembalan y preparan para transferencia. Funciona también como área de triage administrativo pre-quirúrgico.</p>
                                </div>
                          
                                <div>
                                  <strong className="text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 flex">🛠️ INSTRUMENTOS Y EQUIPOS</strong>
                                  <p className="text-gray-600 dark:text-gray-400">Camillas de hospitalización, mesas de transferencia lateral (transfer), estaciones de trabajo (computadoras), armarios metálicos, dispensadores de pijamas estériles, lockers.</p>
                                </div>
                              </div>
                          
                              <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-xl text-xs border border-gray-300 dark:border-gray-700 mt-4">
                                <strong className="text-gray-900 dark:text-gray-100 flex items-center gap-1 mb-1"><AlertCircle size={14}/> Límite Crítico: Trampa de Botas</strong> 
                                Barrera física tipo banca donde el circulante se sienta, se retira el calzado de calle (lado negro), coloca cubrebotas y gira hacia el lado restringido (lado gris).
                              </div>
                            </div>
                            
                            {/* Zona Gris */}
                            <div className="p-5 bg-yellow-500/10 border-t-8 border-yellow-500 rounded-b-2xl shadow-sm relative group flex flex-col h-full">
                              <div className="absolute top-0 right-0 p-3 opacity-5"><MapPin size={64}/></div>
                              <div className="mb-4">
                                <h5 className="font-black text-yellow-800 dark:text-yellow-300 text-xl tracking-tight">Zona Gris</h5>
                                <span className="font-semibold text-xs uppercase tracking-wider text-yellow-600 dark:text-yellow-500 block mb-2">Área Semirestringida</span>
                                <p className="text-sm text-yellow-900/70 dark:text-yellow-200/70">Área limpia que exige disciplina de tránsito estricta.</p>
                              </div>
                              
                              <div className="space-y-4 text-xs flex-grow">
                                <div>
                                  <strong className="text-yellow-800 dark:text-yellow-400 border-b border-yellow-200 dark:border-yellow-900/40 pb-1 mb-2 flex">✅ PERMITIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-yellow-900/70 dark:text-yellow-200/70">
                                    <li>• Personal con pijama quirúrgica (dos piezas fajadas), botas/zuecos exclusivos, gorro cubriendo todo el cabello y cejas.</li>
                                    <li>• Circulación de pacientes en camillas exclusivas internas.</li>
                                    <li>• Tránsito de carros de materiales estériles despachados.</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-red-700 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">❌ TOTALMENTE PROHIBIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-yellow-900/70 dark:text-yellow-200/70">
                                    <li>• Personal sin gorro, usando joyería, esmalte de uñas, o pijama mal colocada.</li>
                                    <li>• Ingreso directo de camillas o sillas de ruedas procedentes de las salas de internación.</li>
                                    <li>• Introducir cajas de cartón, madera o empaques porosos (fomites).</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-yellow-800 dark:text-yellow-400 border-b border-yellow-200 dark:border-yellow-900/40 pb-1 mb-2 flex">📦 ORGANIZACIÓN DE RECURSOS</strong>
                                  <p className="text-yellow-900/70 dark:text-yellow-200/70">División estricta entre <strong>Pasillo Limpio</strong> (transporte de instrumental esterilizado de CEyE a quirófano) y <strong>Pasillo Sucio</strong> (Retiro progresivo de desechos orgánicos post-quirúrgicos). Flujo unidireccional.</p>
                                </div>
                          
                                <div>
                                  <strong className="text-yellow-800 dark:text-yellow-400 border-b border-yellow-200 dark:border-yellow-900/40 pb-1 mb-2 flex">🛠️ INSTRUMENTOS Y EQUIPOS</strong>
                                  <p className="text-yellow-900/70 dark:text-yellow-200/70">Lavabos quirúrgicos (activación por fotocelda pulmonar/tecla rodilla), dispensadores de clorhexidina/yodopovidona, cepillos quirúrgicos, monitores y oxigenoterapia en Sala URPA, autoclaves (área CEyE), carros de paro (crash carts), equipos portátiles de Rayos X, y equipos de limpieza especializados.</p>
                                </div>
                              </div>
                          
                              <div className="bg-yellow-100 dark:bg-yellow-900/40 p-3 rounded-xl text-xs border border-yellow-200 dark:border-yellow-800 mt-4">
                                <strong className="text-yellow-900 dark:text-yellow-200 flex items-center gap-1 mb-1"><AlertCircle size={14}/> Límite Crítico: Estación de Lavado</strong> 
                                En esta zona se realiza el <strong>Lavado Quirúrgico de Manos (fricción de 3-5 minutos)</strong> paso vital e inmediato previo a cruzar las puertas hacia la zona blanca.
                              </div>
                            </div>
                          
                            {/* Zona Blanca */}
                            <div className="p-5 bg-red-500/10 border-t-8 border-red-500 rounded-b-2xl shadow-sm relative group flex flex-col h-full">
                              <div className="absolute top-0 right-0 p-3 opacity-5"><MapPin size={64}/></div>
                              <div className="mb-4">
                                <h5 className="font-black text-red-800 dark:text-red-300 text-xl tracking-tight">Zona Blanca</h5>
                                <span className="font-semibold text-xs uppercase tracking-wider text-red-600 dark:text-red-500 block mb-2">Área Máxima Restricción</span>
                                <p className="text-sm text-red-900/70 dark:text-red-200/70">Quirófano propiamente dicho. Sala de operaciones hiperlimpia.</p>
                              </div>
                              
                              <div className="space-y-4 text-xs flex-grow">
                                <div>
                                  <strong className="text-red-800 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">✅ PERMITIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-red-900/70 dark:text-red-200/70">
                                    <li>• Equipo estéril: Vestimenta adicional con bata quirúrgica impermeable de polipropileno, guantes estériles (técnica cerrada/abierta), manipulación 100% aséptica.</li>
                                    <li>• Personal no estéril (circulante, anestesiólogo): Permanecen perimetrales a 30cm del campo estéril con mascarilla hermética.</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-red-700 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">❌ TOTALMENTE PROHIBIDO</strong>
                                  <ul className="list-none space-y-1 pl-1 text-red-900/70 dark:text-red-200/70">
                                    <li>• Puertas abiertas durante procesos quirúgicos (Rompe la presión positiva de los flujos laminares).</li>
                                    <li>• Cruzar manos u objetos no estériles sobre el campo quirúrgico preparado.</li>
                                    <li>• Dar la espalda al campo quirúrgico (la espalda de la bata se considera NO ESTÉRIL).</li>
                                    <li>• Conversaciones excesivas no inherentes al acto, uso de teléfonos en el perímetro estéril.</li>
                                  </ul>
                                </div>
                          
                                <div>
                                  <strong className="text-red-800 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">📦 ORGANIZACIÓN DE RECURSOS</strong>
                                  <p className="text-red-900/70 dark:text-red-200/70"><strong>Distribución Concéntrica:</strong> El paciente y el campo estéril en el epicentro. El equipamiento auxiliar (anestesia, cubetas patadas, computadoras circulante) rodean la periferia. Cableado suspendido desde columnas del techo para evitar polvos en el suelo.</p>
                                </div>
                          
                                <div>
                                  <strong className="text-red-800 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-1 mb-2 flex">🛠️ INSTRUMENTOS Y EQUIPOS</strong>
                                  <p className="text-red-900/70 dark:text-red-200/70">Mesa quirúrgica, Lámparas cialíticas (luz sin sombras), Máquina de anestesia, Unidad de Electrocirugía (bisturí armónico), Mesas de instrumental de Acero Inoxidable (Mesa de Riñón/Pasteur y Mesa de Mayo), Bombas de infusión, Aspiradores de vacío.</p>
                                </div>
                              </div>
                          
                              <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-xl text-xs border border-red-200 dark:border-red-800 mt-4">
                                <strong className="text-red-900 dark:text-red-200 flex items-center gap-1 mb-1"><AlertCircle size={14}/> Límite Crítico: Campo Estéril</strong> 
                                El mantenimiento absoluto de la asepsia en un radio estricto sobre y alrededor del paciente. Manos estériles siempre deben mantenerse empuñadas arriba de la cintura y bajo los hombros.
                              </div>
                            </div>
                          </div>

                          {/* 5. El Sistema de Contención Biológica */}
                          <div className="mt-8 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50">
                            <h5 className="font-bold text-lg text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-3"><Activity size={20}/> 5. El Sistema de Contención Biológica (El "Desenlace")</h5>
                            
                            <p className="text-sm text-blue-900/80 dark:text-blue-200/80 mb-4">
                              <strong className="text-blue-900 dark:text-blue-200">Introducción:</strong> El diseño de "pasillo limpio" y "pasillo sucio" evita que el instrumental utilizado se cruce con el material estéril, rompiendo la cadena de transmisión.
                            </p>
                            
                            <div className="space-y-4">
                              <h6 className="font-bold text-sm text-blue-800 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800/50 pb-1">Desenlace Fisiopatológico:</h6>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div className="bg-background/60 p-3 rounded shadow-sm border border-blue-100 dark:border-blue-800/30">
                                    <strong className="text-xs text-blue-700 dark:text-blue-400 block mb-1">Mecanismo:</strong>
                                    <p className="text-xs text-foreground">Si un profesional cruza de zona negra a blanca sin cambio de ropa, transporta microbiota transitoria (bacterias del exterior).</p>
                                  </div>
                                  <div className="bg-background/60 p-3 rounded shadow-sm border border-blue-100 dark:border-blue-800/30">
                                    <strong className="text-xs text-blue-700 dark:text-blue-400 block mb-1">Efecto:</strong>
                                    <p className="text-xs text-foreground">Al abrirse el paciente, estas bacterias colonizan el sitio quirúrgico.</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="bg-background/60 p-3 rounded shadow-sm border border-blue-100 dark:border-blue-800/30">
                                    <strong className="text-xs text-blue-700 dark:text-blue-400 block mb-1">Bioquímica de la Infección:</strong>
                                    <p className="text-xs text-foreground">La presencia bacteriana activa una cascada de citocinas proinflamatorias localizadas, que pueden derivar en <strong className="text-red-500 dark:text-red-400">dehiscencia de suturas</strong> o, en el peor de los casos, <strong className="text-red-500 dark:text-red-400">sepsis sistémica por traslocación</strong>.</p>
                                  </div>
                                  <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded shadow-sm border border-red-200 dark:border-red-900/30">
                                    <strong className="text-xs text-red-800 dark:text-red-300 flex items-center gap-1 mb-1"><ShieldAlert size={14}/> Relación con Comorbilidades:</strong>
                                    <p className="text-[11px] text-red-900 dark:text-red-200">En pacientes con <strong className="text-red-950 dark:text-red-100">Diabetes</strong> (común en el HPAS), la falla en la zonificación es doblemente peligrosa, ya que la hiperglucemia de base dificulta la respuesta de los macrófagos para limpiar esa contaminación externa.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_equipo' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Zap size={24} />
                          <h4 className="text-xl font-bold">3. Equipamiento y Mobiliario Clínico</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <p>Actores permanentes en la sala de operaciones y responsabilidad de la circulante:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-accent/20 border p-3 rounded-lg flex flex-col justify-between">
                              <div><strong className="text-primary text-base">Mesa Quirúrgica</strong></div>
                              <p className="text-muted-foreground text-xs mt-1">Con controles para posiciones anatómicas según la intervención (Decúbito supino, Trendelenburg, Litotomía, Kraske, etc.).</p>
                            </div>
                            <div className="bg-accent/20 border p-3 rounded-lg flex flex-col justify-between">
                              <div><strong className="text-primary text-base">Torre de Anestesia</strong></div>
                              <p className="text-muted-foreground text-xs mt-1">Monitorización de signos vitales, ventilador mecánico y vaporizadores de gases. El "cerebro" de la hemodinamia del paciente.</p>
                            </div>
                            <div className="bg-accent/20 border p-3 rounded-lg flex flex-col justify-between">
                              <div><strong className="text-primary text-base">Mesa de Mayo</strong></div>
                              <p className="text-muted-foreground text-xs mt-1">Mesa de un solo pilar, de altura variable. Se coloca por encima del paciente. Organiza el instrumental de uso inmediato (tiempos de diéresis y hemostasia).</p>
                            </div>
                            <div className="bg-accent/20 border p-3 rounded-lg flex flex-col justify-between">
                              <div><strong className="text-primary text-base">Mesa Riñón (o Pasteur)</strong></div>
                              <p className="text-muted-foreground text-xs mt-1">Superficie amplia y rectangular. Se utiliza para organizar el bulto quirúrgico y posicionar el instrumental de reserva o pesado.</p>
                            </div>
                          </div>
                          
                          <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg mt-4">
                              <h5 className="font-bold text-orange-700 flex items-center gap-2"><Zap size={16}/> Unidad de Electrocirugía (Bisturí eléctrico)</h5>
                              <p className="text-orange-900/80 text-xs mt-1">Generador de radiofrecuencia para corte y coagulación.</p>
                              <p className="text-orange-700 text-xs font-bold mt-2">★ Puntos clave de enfermería circulante:</p>
                              <ul className="list-disc pl-5 text-orange-900 text-xs mt-1 space-y-1">
                                <li>Colocación de la placa de retorno (placa neutra) en zona muscular limpia, seca, afeitada y bien vascularizada (ej. muslo).</li>
                                <li><strong>Nunca</strong> colocar sobre prominencias óseas, implantes metálicos o tejido cicatrical para evitar riesgo de quemaduras severas.</li>
                              </ul>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_instrumental' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Scissors size={24} />
                          <h4 className="text-xl font-bold">4. Instrumental Quirúrgico por Tiempos</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                           <p className="text-muted-foreground mb-4">El instrumental se clasifica y se dispone en la mesa de Mayo según los "tiempos quirúrgicos", la secuencia lógica de la cirugía:</p>
                          <div className="space-y-3">
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-red-500 bg-red-50/30">
                              <h5 className="font-bold text-red-700 flex items-center gap-2">1. Diéresis (Corte)</h5>
                              <p className="text-xs text-muted-foreground mb-2">Incisión y sección de tejidos.</p>
                              <ul className="text-xs text-foreground font-medium flex gap-2 flex-wrap">
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Mangos de bisturí (#3 y #4)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Tijeras de Metzenbaum (tejido delicado)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Tijeras de Mayo (tejido fuerte/hilos)</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30">
                              <h5 className="font-bold text-blue-700 flex items-center gap-2">2. Hemostasia (Control de sangrado)</h5>
                              <p className="text-xs text-muted-foreground mb-2">Oclusión temporal de los vasos sanguíneos.</p>
                              <ul className="text-xs text-foreground font-medium flex gap-2 flex-wrap">
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Mosquito (Halsted)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Kelly (rectas/curvas)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Rochester-Pean</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-green-500 bg-green-50/30">
                              <h5 className="font-bold text-green-700 flex items-center gap-2">3. Aprehensión / Tracción (Agarre)</h5>
                              <p className="text-xs text-muted-foreground mb-2">Fijación, sostén y movilización de tejidos y órganos.</p>
                              <ul className="text-xs text-foreground font-medium flex gap-2 flex-wrap">
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Allis (para tejido firme)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Babcock (atraumáticas, vísceras huecas)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Duval/Lovelace (pulmón)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas Foerster (anillos/esponjas)</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-yellow-500 bg-yellow-50/30">
                              <h5 className="font-bold text-yellow-700 flex items-center gap-2">4. Separación (Exposición)</h5>
                              <p className="text-xs text-muted-foreground mb-2">Retracción de tejidos y visualización del campo operatorio.</p>
                              <ul className="text-xs text-foreground font-medium flex gap-2 flex-wrap">
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Manuales: Separadores de Farabeuf, Senn, Richardson</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Autoestáticos: Balfour (abdomen), Finochietto (tórax)</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
                              <h5 className="font-bold text-purple-700 flex items-center gap-2">5. Síntesis (Sutura)</h5>
                              <p className="text-xs text-muted-foreground mb-2">Reconstrucción y aproximación de los planos tisulares.</p>
                              <ul className="text-xs text-foreground font-medium flex gap-2 flex-wrap">
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Porta-agujas (Hegar, Mathieu)</li>
                                <li className="bg-background px-2 py-1 rounded shadow-sm border">Pinzas de disección (con y sin dientes)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_humanos' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Users size={24} />
                          <h4 className="text-xl font-bold">5. El Equipo Quirúrgico y el "Baile" de Roles</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                           <p className="text-muted-foreground">La sala de operaciones requiere una coordinación perfecta. Las funciones se dividen estrictamente:</p>
                           
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="p-6 bg-blue-500/10 border border-blue-200 rounded-xl space-y-4">
                               <div className="flex items-center justify-between border-b border-blue-200/50 pb-2">
                                 <h5 className="font-black text-blue-700 text-lg tracking-wide flex items-center gap-2"><CheckCircle2 size={18}/> EQUIPO ESTÉRIL</h5>
                               </div>
                               <div className="space-y-4">
                                 <div>
                                   <h6 className="font-bold text-blue-800 text-sm">Cirujano y Ayudantes:</h6>
                                   <p className="text-xs text-blue-900/80 mt-1">Realizan el lavado quirúrgico, visten bata/guantes estériles y ejecutan o asisten en el procedimiento invasivo dentro del campo quirúrgico.</p>
                                 </div>
                                 <div className="bg-blue-100/50 p-2 rounded">
                                   <h6 className="font-bold text-blue-800 text-sm">Instrumentista (Enfermero/a):</h6>
                                   <p className="text-xs text-blue-900/80 mt-1">
                                      - Es responsable de mantener la integridad del campo estéril.<br/>
                                      - Organiza las mesas (Mayo y Riñón).<br/>
                                      - Anticipa necesidades y entrega el material al cirujano.<br/>
                                      - Realiza el <strong>recuento inicial y final de gasas, compresas e instrumental</strong> junto al circulante.
                                   </p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="p-6 bg-red-500/10 border border-red-200 rounded-xl space-y-4">
                               <div className="flex items-center justify-between border-b border-red-200/50 pb-2">
                                 <h5 className="font-black text-red-700 text-lg tracking-wide flex items-center gap-2"><Info size={18}/> EQUIPO NO ESTÉRIL</h5>
                               </div>
                               <div className="space-y-4">
                                 <div>
                                   <h6 className="font-bold text-red-800 text-sm">Anestesiólogo</h6>
                                   <p className="text-xs text-red-900/80 mt-1">Maneja la inducción y mantenimiento anestésico, posiciona la cabeza del paciente y monitorea sus constantes vitales.</p>
                                 </div>
                                 <div className="bg-red-100/50 p-2 rounded">
                                   <h6 className="font-bold text-red-800 text-sm">Circulante de Quirófano (Tu rol clave):</h6>
                                   <ul className="text-xs text-red-900/80 list-disc pl-5 space-y-1 mt-1">
                                    <li>Es el nexo de comunicación entre el equipo estéril y el exterior.</li>
                                    <li>Prepara el equipo electromédico y las luces cialíticas.</li>
                                    <li>Realiza la apertura "segura" de bultos y facilita material estéril adicional.</li>
                                    <li><strong>Doble Control de Material Blanco:</strong> Contabiliza a viva voz junto a la instrumentista antes de cerrar cavidad (crucial para evitar oblitos).</li>
                                    <li>Manejo y etiquetado adecuado de muestras histopatológicas.</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_fisiopato' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Activity size={24} />
                          <h4 className="text-xl font-bold">6. Respuesta Metabólica al Trauma Quirúrgico</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-muted-foreground"><strong className="text-foreground">Introducción:</strong> Fisiológicamente, toda cirugía es un "trauma controlado". El cuerpo no distingue entre la incisión de un cirujano y una herida accidental; reacciona montando una respuesta inflamatoria sistémica para sobrevivir a la agresión tisular, conservar energía y fluidos, y preparar la cicatrización.</p>
                          </div>
                          
                          <h5 className="font-bold text-lg pt-2 border-t mt-4 flex items-center gap-2">Cascada de la Fisiopatología Quirúrgica:</h5>
                          <div className="space-y-4">
                            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm">
                               <h5 className="font-bold text-orange-700 flex items-center gap-2"><Brain size={16} /> Impacto Hormonal (Fase Ebb / Shock)</h5>
                               <p className="text-sm mt-2 text-foreground">El hipotálamo detecta el dolor, la pérdida de volumen y el estrés, activando el sistema nervioso simpático:</p>
                               <ul className="text-xs mt-2 text-muted-foreground list-disc pl-5 space-y-1">
                                 <li>Se elevan masivamente las catecolaminas (<strong>Adrenalina</strong>), <strong>Cortisol</strong>, Glucagón y hormona antidiurética (<strong>ADH</strong>).</li>
                                 <li><strong>Traducción Clínica:</strong> Taquicardia, resistencia a la insulina (hiperglicemia inducida por estrés), leve hipertensión / vasoconstricción, y retención de líquidos (oliguria transitoria esperable de unas 24-48 hrs).</li>
                               </ul>
                            </div>
                            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-xl shadow-sm">
                               <h5 className="font-bold text-purple-700 flex items-center gap-2"><TestTube size={16} /> Impacto Bioquímico</h5>
                               <p className="text-sm mt-2 text-foreground">La pérdida sanguínea y el daño celular alteran el pH:</p>
                               <ul className="text-xs mt-2 text-muted-foreground list-disc pl-5 space-y-1">
                                 <li>Riesgo primario de <strong>Acidosis Metabólica</strong> (lactacidemia) si existe hipoperfusión sostenida (estado de choque).</li>
                                 <li>Consumo de factores de coagulación ante sangrados cuantiosos.</li>
                               </ul>
                            </div>
                            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r-xl shadow-sm">
                               <h5 className="font-bold text-cyan-700 flex items-center gap-2"><Thermometer size={16} /> Termorregulación (Riesgo Crítico)</h5>
                               <p className="text-sm mt-2 text-foreground">La Triada Letal (Hiportermia + Acidosis + Coagulopatía) comienza con el frío:</p>
                               <ul className="text-xs mt-2 text-muted-foreground list-disc pl-5 space-y-1">
                                 <li>El uso de líquidos IV sin calentar, el aire frío de la Zona Blanca y la exposición de cavidades corporales causa <strong>Hipotermia Inadvertida</strong>.</li>
                                 <li><strong>Consecuencia:</strong> La hipotermia inactiva la cascada de coagulación enzimática, lo que perpetúa y empeora la hemorragia, además de aumentar el riesgo de ISO (Infección del Sitio Operatorio) por vasoconstricción local.</li>
                               </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                    
{selectedService === 'Salud Comunitaria' && communitySubTab === 'inmunizaciones' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Syringe size={24} />
                          <h4 className="text-xl font-bold">Manual del Vacunador</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-accent/20 p-4 rounded-xl">
                            <h5 className="font-bold mb-2 flex items-center"><Clock size={16} className="mr-2" /> Esquema Nacional de Vacunación</h5>
                            <p className="text-sm text-muted-foreground mb-4">Tabla por edades desde el recién nacido hasta el adulto mayor.</p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-[10px] text-left border-collapse">
                                <thead>
                                  <tr className="bg-primary/10">
                                    <th className="p-2 border border-border">Grupo Etario</th>
                                    <th className="p-2 border border-border">Edad</th>
                                    <th className="p-2 border border-border">Vacuna</th>
                                    <th className="p-2 border border-border">Previene</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-accent/5"><td rowSpan={4} className="p-2 border border-border font-bold">Menores de 1 año</td><td className="p-2 border border-border">RN (24h)</td><td className="p-2 border border-border">BCG, HB</td><td className="p-2 border border-border">TB Meningea, Hepatitis B</td></tr>
                                  <tr><td className="p-2 border border-border">2 meses</td><td className="p-2 border border-border">Rotavirus, Hexavalente, Neumococo 13</td><td className="p-2 border border-border">EDA, Difteria, Tétanos, Tosferina, Polio, Hib, Neumonía</td></tr>
                                  <tr><td className="p-2 border border-border">4 meses</td><td className="p-2 border border-border">Rotavirus, Hexavalente, Neumococo 13</td><td className="p-2 border border-border">Refuerzos 2da dosis</td></tr>
                                  <tr><td className="p-2 border border-border">6 meses</td><td className="p-2 border border-border">bOPV, Hexavalente, Neumococo 13</td><td className="p-2 border border-border">Refuerzos 3ra dosis</td></tr>
                                  <tr className="bg-accent/5"><td rowSpan={3} className="p-2 border border-border font-bold">12 a 23 meses</td><td className="p-2 border border-border">12 meses</td><td className="p-2 border border-border">FA, SRP 1</td><td className="p-2 border border-border">Fiebre Amarilla, Sarampión, Rubeola, Paperas</td></tr>
                                  <tr><td className="p-2 border border-border">15 meses</td><td className="p-2 border border-border">Varicela</td><td className="p-2 border border-border">Varicela</td></tr>
                                  <tr><td className="p-2 border border-border">18 meses</td><td className="p-2 border border-border">Hexavalente, bOPV, SRP 2</td><td className="p-2 border border-border">Refuerzos</td></tr>
                                  <tr className="bg-accent/5"><td rowSpan={2} className="p-2 border border-border font-bold">Niñez</td><td className="p-2 border border-border">5 años</td><td className="p-2 border border-border">DPT, bOPV</td><td className="p-2 border border-border">Difteria, Tosferina, Tétanos, Polio</td></tr>
                                  <tr><td className="p-2 border border-border">9 años</td><td className="p-2 border border-border">HPV (Dosis única)</td><td className="p-2 border border-border">Cáncer de Cuello Uterino</td></tr>
                                  <tr className="bg-accent/5"><td className="p-2 border border-border font-bold">Adolescencia</td><td className="p-2 border border-border">15 años</td><td className="p-2 border border-border">dT</td><td className="p-2 border border-border">Difteria y Tétanos</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-border p-4 rounded-xl">
                              <h5 className="font-bold mb-2 flex items-center"><Droplet size={16} className="mr-2 text-blue-500" /> Cadena de Frío</h5>
                              <p className="text-xs text-muted-foreground">Protocolo de manejo de termos y temperaturas (<strong>+2°C a +8°C</strong>).</p>
                              <ul className="mt-2 text-xs space-y-1 list-disc list-inside">
                                <li>Paquetes fríos: No deben tener escarcha.</li>
                                <li>Control de temperatura: 2 veces al día.</li>
                                <li>Ubicación: Centro del refrigerador.</li>
                              </ul>
                            </div>
                            <div className="border border-border p-4 rounded-xl">
                              <h5 className="font-bold mb-2 flex items-center"><Syringe size={16} className="mr-2 text-primary" /> Técnica de Aplicación</h5>
                              <ul className="text-xs space-y-1 list-disc list-inside">
                                <li><strong>ID:</strong> BCG (Deltoides derecho).</li>
                                <li><strong>SC:</strong> SRP, FA, Varicela (Deltoides izquierdo).</li>
                                <li><strong>IM:</strong> Hexavalente, Neumococo, DPT, dT (Vasto lateral o Deltoides).</li>
                                <li><strong>VO:</strong> Rotavirus, bOPV.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                            <h5 className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-2 flex items-center">
                              <AlertTriangle size={14} className="mr-1" /> Notas Técnicas Esquema 2025
                            </h5>
                            <ul className="text-[10px] space-y-1 text-muted-foreground">
                              <li>• <strong>Hexavalente:</strong> Reemplaza a Pentavalente y fIPV (6 antígenos en 1 sola aplicación).</li>
                              <li>• <strong>Neumococo 13:</strong> Actualización de Neumococo 10 para mayor cobertura de serotipos.</li>
                              <li>• <strong>HPV:</strong> Dosis única a los 9 años tanto para niñas como para niños.</li>
                              <li>• <strong>Tdap:</strong> Obligatoria en cada embarazo (protección neonatal contra Tosferina).</li>
                              <li>• <strong>COVID-19:</strong> Integrada al esquema regular para grupos prioritarios y niños.</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Salud Comunitaria' && communitySubTab === 'territorio' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <MapPin size={24} />
                          <h4 className="text-xl font-bold">Herramientas de Territorio</h4>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Ficha Familiar */}
                          <div className="border-l-4 border-blue-500 p-4 bg-blue-500/5 rounded-r-xl space-y-3">
                            <h5 className="font-bold text-blue-600 flex items-center">
                              <FileText size={18} className="mr-2" /> Ficha Familiar
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-blue-600">¿Qué es y Función?</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Instrumento esencial del Modelo de Atención Integral de Salud (MAIS). Sirve para identificar los determinantes sociales de la salud, riesgos biológicos, sanitarios y socioeconómicos de las familias en su entorno.
                                </p>
                                <p className="text-xs font-bold uppercase text-blue-600 mt-2">¿Cómo se aplica?</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Mediante entrevista directa en el domicilio por el equipo de salud (EAIS). Se levanta información sociodemográfica, antecedentes de salud, características de la vivienda y dinámica familiar.
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-blue-600">Interpretación y Escalas (Riesgo Familiar)</p>
                                <ul className="text-[11px] space-y-1 list-disc list-inside text-muted-foreground">
                                  <li><strong>Riesgo 1 (Bajo):</strong> Familias con determinantes favorables, sin riesgos inminentes. Control anual.</li>
                                  <li><strong>Riesgo 2 (Medio):</strong> Presencia de riesgos biológicos controlados o riesgos socioeconómicos leves. Visitas semestrales.</li>
                                  <li><strong>Riesgo 3 (Alto):</strong> Enfermedades crónicas descompensadas, embarazo de riesgo, pobreza extrema. Visitas trimestrales.</li>
                                  <li><strong>Riesgo 4 (Muy Alto):</strong> Violencia intrafamiliar, hacinamiento crítico, abandono, discapacidad severa sin apoyo. Intervención inmediata y multidisciplinaria.</li>
                                </ul>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-blue-500/20">
                              <p className="text-xs font-bold uppercase text-blue-600">Usos para la Salud</p>
                              <p className="text-[11px] text-muted-foreground">
                                Permite la dispensarización (clasificación de la población), priorización de visitas domiciliarias, planificación de intervenciones comunitarias y asignación de recursos del centro de salud.
                              </p>
                            </div>
                          </div>

                          {/* Familiograma / Genograma */}
                          <div className="border-l-4 border-purple-500 p-4 bg-purple-500/5 rounded-r-xl space-y-3">
                            <h5 className="font-bold text-purple-600 flex items-center">
                              <Users size={18} className="mr-2" /> Familiograma (Genograma) y APGAR Familiar
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-purple-600">Familiograma</p>
                                <p className="text-[11px] text-muted-foreground">
                                  <strong>Uso:</strong> Representación gráfica de al menos 3 generaciones de la familia. <br/>
                                  <strong>Interpretación:</strong> Cuadrados (hombres), círculos (mujeres). Líneas indican relaciones (matrimonio, divorcio, concubinato) y dinámica (conflictiva, estrecha, distante). Identifica patrones hereditarios de enfermedades y estructura familiar (nuclear, extendida, monoparental).
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-purple-600">APGAR Familiar</p>
                                <p className="text-[11px] text-muted-foreground">
                                  <strong>Función:</strong> Evalúa la percepción del funcionamiento familiar.<br/>
                                  <strong>Escala (0-10 puntos):</strong>
                                </p>
                                <ul className="text-[11px] space-y-1 list-disc list-inside text-muted-foreground">
                                  <li><strong>17-20:</strong> Familia normofuncional.</li>
                                  <li><strong>13-16:</strong> Disfunción leve.</li>
                                  <li><strong>10-12:</strong> Disfunción moderada.</li>
                                  <li><strong>≤9:</strong> Disfunción severa.</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Visita Domiciliaria */}
                          <div className="border-l-4 border-green-500 p-4 bg-green-500/5 rounded-r-xl space-y-3">
                            <h5 className="font-bold text-green-600 flex items-center">
                              <Home size={18} className="mr-2" /> Visita Domiciliaria Integral
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-green-600">Aplicación y Protocolo</p>
                                <ul className="text-[11px] space-y-1 list-disc list-inside text-muted-foreground">
                                  <li><strong>Preparación:</strong> Revisión de Ficha Familiar e historia clínica. Preparación del maletín (tensiómetro, fonendoscopio, termómetro, cintas métricas).</li>
                                  <li><strong>Ejecución:</strong> Saludo, presentación, consentimiento informado. Observación del entorno (higiene, ventilación, vectores).</li>
                                  <li><strong>Intervención:</strong> Examen físico focalizado, educación en salud, entrega de medicación si aplica.</li>
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-green-600">Usos e Impacto en Salud</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Seguimiento de pacientes vulnerables (postrados, terminales, embarazadas de alto riesgo, niños con desnutrición). Permite identificar barreras de acceso a la salud y verificar la adherencia al tratamiento en el contexto real del paciente.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Mapa Parlante */}
                          <div className="border-l-4 border-orange-500 p-4 bg-orange-500/5 rounded-r-xl space-y-3">
                            <h5 className="font-bold text-orange-600 flex items-center">
                              <Map size={18} className="mr-2" /> Mapa Parlante y Sala Situacional
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-orange-600">Mapa Parlante</p>
                                <p className="text-[11px] text-muted-foreground">
                                  <strong>¿Qué es?:</strong> Croquis del sector asignado al EAIS, elaborado con la comunidad.<br/>
                                  <strong>Uso:</strong> Ubicación espacial de riesgos (basurales, deslaves, cantinas) y recursos (escuelas, líderes comunitarios, farmacias). Se usan "chinchetas" o banderas de colores para marcar viviendas con embarazadas, niños desnutridos, o pacientes crónicos.
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-orange-600">Sala Situacional</p>
                                <p className="text-[11px] text-muted-foreground">
                                  <strong>Función:</strong> Espacio físico o virtual donde se sistematiza la información de salud del territorio (morbilidad, mortalidad, coberturas de vacunación).<br/>
                                  <strong>Interpretación:</strong> Sirve para la toma de decisiones epidemiológicas locales y la priorización de campañas de salud pública.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Salud Comunitaria' && communitySubTab === 'ciclo_vida' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Baby size={24} />
                          <h4 className="text-xl font-bold">Programas de Ciclo de Vida</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="border-l-4 border-primary p-4 bg-primary/5 rounded-r-xl space-y-3">
                            <h5 className="font-bold flex items-center"><Activity size={18} className="mr-2" /> Control del Niño Sano</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-primary">Frecuencia de Controles (MSP):</p>
                                <ul className="text-[11px] space-y-1 list-disc list-inside text-muted-foreground">
                                  <li><strong>Recién Nacido:</strong> 1 control (primeros 7 días).</li>
                                  <li><strong>Menor de 1 mes:</strong> 2 controles (8-15 y 16-29 días).</li>
                                  <li><strong>1 a 11 meses:</strong> 11 controles (1 cada mes).</li>
                                  <li><strong>12 a 23 meses:</strong> 4 controles (1 cada 3 meses).</li>
                                  <li><strong>2 a 4 años:</strong> 2 controles por año (cada 6 meses).</li>
                                  <li><strong>5 a 9 años:</strong> 1 control por año.</li>
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase text-primary">Actividades Clave:</p>
                                <ul className="text-[11px] space-y-1 list-disc list-inside text-muted-foreground">
                                  <li><strong>Antropometría:</strong> Peso, Talla, Perímetro Cefálico (Curvas OMS).</li>
                                  <li><strong>Desarrollo:</strong> Escala Abreviada de Desarrollo (EAD).</li>
                                  <li><strong>Nutrición:</strong> Lactancia Materna y Alimentación Complementaria.</li>
                                  <li><strong>Suplementación:</strong> Hierro y Vitamina A según edad.</li>
                                  <li><strong>Tamizaje:</strong> Auditivo, Visual y Neonatal.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-l-4 border-pink-500 p-4 bg-pink-500/5 rounded-r-xl">
                              <h5 className="font-bold flex items-center"><Heart size={16} className="mr-2 text-pink-500" /> Salud Materna</h5>
                              <p className="text-[11px] text-muted-foreground mt-1">
                                <strong>Control Prenatal:</strong> Mínimo 5 controles (OMS recomienda 8).
                                <br />• Llenado de Carné Perinatal y Score Mamá.
                                <br />• Plan de Parto y Transporte.
                                <br />• Suplementación con Hierro + Ácido Fólico.
                              </p>
                            </div>
                            <div className="border-l-4 border-orange-500 p-4 bg-orange-500/5 rounded-r-xl">
                              <h5 className="font-bold flex items-center"><Activity size={16} className="mr-2 text-orange-500" /> ECNT (Crónicos)</h5>
                              <p className="text-[11px] text-muted-foreground mt-1">
                                <strong>Tamizaje y Seguimiento:</strong>
                                <br />• HTA: Toma de PA en cada consulta {'>'}18 años.
                                <br />• DM: Glucosa en ayunas en pacientes con factores de riesgo.
                                <br />• Obesidad: Cálculo de IMC y perímetro abdominal.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'control_prenatal' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Activity size={24} />
                          <h4 className="text-xl font-bold">Control Prenatal y Evaluación</h4>
                        </div>
                        
                        <div className="space-y-8">
                          {/* Control Prenatal Section */}
                          <div className="space-y-4">
                            <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                              <Baby size={20} className="mr-2 text-primary" /> 
                              El Control Prenatal
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-accent/20 p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2 text-primary">Finalidad y Frecuencia</h6>
                                <p className="text-xs text-muted-foreground mb-3">
                                  Su objetivo es la prevención, detección y tratamiento oportuno de factores de riesgo para reducir la morbi-mortalidad materna y perinatal.
                                </p>
                                <ul className="text-xs space-y-1.5 list-disc list-inside text-muted-foreground">
                                  <li><strong>Mínimo:</strong> 5 controles (MSP/OMS recomienda 8).</li>
                                  <li><strong>1er Control:</strong> Antes de las 12 semanas.</li>
                                  <li><strong>Frecuencia ideal:</strong> Mensual hasta sem 28, quincenal hasta sem 36, semanal hasta el parto.</li>
                                </ul>
                              </div>
                              <div className="bg-accent/20 p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2 text-primary">¿Cómo se realiza? (Actividades)</h6>
                                <ul className="text-xs space-y-1.5 list-disc list-inside text-muted-foreground">
                                  <li><strong>Anamnesis:</strong> Antecedentes, fórmula obstétrica (Gestas, Partos, Abortos, Cesáreas).</li>
                                  <li><strong>Examen Físico:</strong> Peso, PA, Altura Uterina, FCF (desde sem 12 con Doppler), Movimientos fetales.</li>
                                  <li><strong>Laboratorio:</strong> Biometría, Grupo/Rh, VDRL, VIH, EMO, Glucosa.</li>
                                  <li><strong>Ecografías:</strong> Genética (11-14s), Morfológica (18-24s), Crecimiento (32-36s).</li>
                                  <li><strong>Suplementación:</strong> Ácido fólico (1er trimestre) y Hierro.</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Score MAMA Section */}
                          <div className="space-y-4">
                            <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                              <Calculator size={20} className="mr-2 text-pink-500" /> 
                              Score MAMÁ
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              Es una herramienta de puntuación de signos vitales para el reconocimiento y respuesta temprana del deterioro clínico materno. Ayuda a clasificar la gravedad y estandarizar el manejo.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border border-border p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2">Parámetros Evaluados</h6>
                                <div className="flex flex-wrap gap-2">
                                  {['Frecuencia Respiratoria', 'Frecuencia Cardíaca', 'Presión Arterial (Sistólica/Diastólica)', 'Saturación de Oxígeno', 'Estado de Conciencia', 'Proteinuria'].map(p => (
                                    <span key={p} className="px-2 py-1 bg-accent/50 rounded-md text-[10px] font-medium">{p}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="border border-border p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2">Signos de Alarma</h6>
                                <p className="text-xs text-muted-foreground">
                                  Sangrado vaginal, cefalea intensa, visión borrosa (escotomas), zumbido de oídos (tinnitus), dolor abdominal (epigastralgia), disminución de movimientos fetales, salida de líquido amniótico.
                                </p>
                              </div>
                            </div>

                            <div className="overflow-x-auto mt-4">
                              <h6 className="font-bold text-sm mb-2">Tabla de Puntuación (Score MAMÁ)</h6>
                              <table className="w-full text-[10px] text-center border-collapse rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-primary/10">
                                    <th className="p-2 border border-border">Parámetro</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">3</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">2</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">1</th>
                                    <th className="p-2 border border-border bg-red-500/20">0</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">1</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">2</th>
                                    <th className="p-2 border border-border bg-yellow-500/20">3</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">FC (****)</td>
                                    <td className="p-2 border border-border">≤ 50</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">51-59</td>
                                    <td className="p-2 border border-border bg-red-500/10">60-100</td>
                                    <td className="p-2 border border-border bg-red-500/30">101-110</td>
                                    <td className="p-2 border border-border">111-119</td>
                                    <td className="p-2 border border-border">≥120</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">Sistólica</td>
                                    <td className="p-2 border border-border">≤ 70</td>
                                    <td className="p-2 border border-border">71-89</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/10">90-139</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">140-159</td>
                                    <td className="p-2 border border-border">≥160</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">Diastólica</td>
                                    <td className="p-2 border border-border">≤ 50</td>
                                    <td className="p-2 border border-border">51-59</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">60-85</td>
                                    <td className="p-2 border border-border">86-89</td>
                                    <td className="p-2 border border-border">90-109</td>
                                    <td className="p-2 border border-border">≥110</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">FR (****)</td>
                                    <td className="p-2 border border-border">≤ 11</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">12-22</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">23-29</td>
                                    <td className="p-2 border border-border">≥30</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">T (°C) (*)</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">≤35.5</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">35.6-37.5</td>
                                    <td className="p-2 border border-border">37.6-38.4</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">≥38.5</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">Sat O₂</td>
                                    <td className="p-2 border border-border">≤ 85</td>
                                    <td className="p-2 border border-border">86-89</td>
                                    <td className="p-2 border border-border">90-93(**)</td>
                                    <td className="p-2 border border-border bg-red-500/30">94-100</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">Estado de Conciencia</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">confusa / agitada</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">Alerta</td>
                                    <td className="p-2 border border-border">responde a la voz / somnolienta</td>
                                    <td className="p-2 border border-border">responde al dolor / estuporosa</td>
                                    <td className="p-2 border border-border">no responde</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 border border-border font-bold text-left">Proteinuria (***)</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border bg-red-500/30">Negativo</td>
                                    <td className="p-2 border border-border">Positivo</td>
                                    <td className="p-2 border border-border">-</td>
                                    <td className="p-2 border border-border">-</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="mt-2 text-[9px] text-muted-foreground space-y-0.5">
                                <p className="font-bold">Considerar que en la labor de parto los signos vitales podrían alterarse</p>
                                <p>(*) Temperatura axilar</p>
                                <p>(**) (90-93%) Sin oxígeno suplementario y saturaciones de 90 a 93% en pacientes que viven sobre los 2.500 metros sobre el nivel del mar tendrán un puntaje de 0</p>
                                <p>(***) Se debe realizar proteinuria sobre las 20 semanas de gestación.</p>
                                <p>(****) La frecuencia cardiaca y la respiratoria deben contabilizarse en un minuto completo.</p>
                                <p className="font-bold italic mt-1">Recuerde la adecuada toma de todos los signos vitales puede salvar una vida.</p>
                              </div>
                            </div>

                            <div className="overflow-x-auto mt-6">
                              <h6 className="font-bold text-sm mb-2">Manejo según Puntuación</h6>
                              <table className="w-full text-xs text-left border-collapse rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-primary/10">
                                    <th className="p-3 border border-border font-bold">Puntuación</th>
                                    <th className="p-3 border border-border font-bold">Riesgo</th>
                                    <th className="p-3 border border-border font-bold">Acción / Tratamiento</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="p-3 border border-border font-bold text-green-600">0</td>
                                    <td className="p-3 border border-border font-bold">Bajo</td>
                                    <td className="p-3 border border-border text-muted-foreground">Evaluar factores de riesgo. Continuar control prenatal habitual.</td>
                                  </tr>
                                  <tr className="bg-yellow-500/10">
                                    <td className="p-3 border border-border font-bold text-yellow-600">1</td>
                                    <td className="p-3 border border-border font-bold">Leve</td>
                                    <td className="p-3 border border-border text-muted-foreground">Evaluar y aplicar medidas específicas. Reevaluar signos vitales en 4 horas.</td>
                                  </tr>
                                  <tr className="bg-orange-500/10">
                                    <td className="p-3 border border-border font-bold text-orange-600">2 - 4</td>
                                    <td className="p-3 border border-border font-bold">Moderado</td>
                                    <td className="p-3 border border-border text-muted-foreground">Médico evalúa en {'<'} 30 min. Tratar y derivar según capacidad resolutiva. Reevaluar cada hora.</td>
                                  </tr>
                                  <tr className="bg-red-500/10">
                                    <td className="p-3 border border-border font-bold text-red-600">≥ 5</td>
                                    <td className="p-3 border border-border font-bold">Alto</td>
                                    <td className="p-3 border border-border text-muted-foreground">Activar CLAVE (Roja, Azul, Amarilla). Reanimación y estabilización. Transferencia inmediata a nivel superior. Reevaluar cada 30 min.</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* ESAMyN Section */}
                          <div className="space-y-4">
                            <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                              <Heart size={20} className="mr-2 text-pink-500" /> 
                              Normativa ESAMyN
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              <strong>Establecimientos de Salud Amigos de la Madre y del Niño.</strong> Iniciativa para mejorar la calidad e integralidad de la atención materna y neonatal.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-accent/20 p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2 text-primary">Objetivos Principales</h6>
                                <ol className="text-xs space-y-1.5 list-decimal list-inside text-muted-foreground">
                                  <li>Mejorar la calidad e integralidad de la atención prenatal.</li>
                                  <li>Mejorar la calidad de la atención de las emergencias obstétricas y neonatales.</li>
                                  <li>Promover el parto en libre posición y la adecuada atención del recién nacido.</li>
                                  <li>Prevenir la transmisión vertical del VIH y sífilis.</li>
                                  <li>Fomentar, apoyar y proteger la lactancia materna.</li>
                                </ol>
                              </div>
                              <div className="bg-accent/20 p-4 rounded-xl">
                                <h6 className="font-bold text-sm mb-2 text-primary">4 Componentes</h6>
                                <ul className="text-xs space-y-1.5 list-disc list-inside text-muted-foreground">
                                  <li><strong>1.</strong> General</li>
                                  <li><strong>2.</strong> Prenatal</li>
                                  <li><strong>3.</strong> Parto y Postparto</li>
                                  <li><strong>4.</strong> Lactancia Materna</li>
                                </ul>
                              </div>
                            </div>

                            <div className="border border-border p-4 rounded-xl mt-4">
                              <h6 className="font-bold text-sm mb-3">Durante el Trabajo de Parto, Parto y Posparto</h6>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h6 className="text-[11px] font-bold uppercase text-muted-foreground mb-2">Prácticas Interculturales</h6>
                                  <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                                    <li>Escoger vestimenta.</li>
                                    <li>Parto a libre posición.</li>
                                    <li>Ingesta de líquidos.</li>
                                    <li>Acompañamiento a libre elección.</li>
                                    <li>Ofrecer la opción de disponer de la placenta.</li>
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="text-[11px] font-bold uppercase text-muted-foreground mb-2">Métodos no farmacológicos (Aliviar el dolor)</h6>
                                  <div className="flex flex-wrap gap-2">
                                    {['Aromaterapia', 'Relajación', 'Musicoterapia', 'Visualización', 'Masaje', 'Deambulación', 'Calor local', 'Baños agua'].map(m => (
                                      <span key={m} className="px-2 py-1 bg-accent/50 rounded-md text-[10px] font-medium">{m}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="border-l-4 border-red-500 p-4 bg-red-500/5 rounded-r-xl">
                                <h6 className="font-bold text-sm mb-2 text-red-600 dark:text-red-400">Signos de Alerta Madre</h6>
                                <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                                  <li>Visión borrosa</li>
                                  <li>Fiebre</li>
                                  <li>Dolor de cabeza</li>
                                  <li>Dolor de barriga</li>
                                  <li>Sangrado o secreción</li>
                                </ul>
                              </div>
                              <div className="border-l-4 border-blue-500 p-4 bg-blue-500/5 rounded-r-xl">
                                <h6 className="font-bold text-sm mb-2 text-blue-600 dark:text-blue-400">Signos de Alerta Bebé</h6>
                                <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                                  <li>Debilidad</li>
                                  <li>Fiebre</li>
                                  <li>Tieso o ataque</li>
                                  <li>Dificultad para alimentarse</li>
                                  <li>Dificultad para respirar</li>
                                  <li>Cambio de coloración</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'emergencias' && !selectedDisease && (
                      <div className="flex items-center justify-center p-12 text-muted-foreground flex-col bg-accent/5 rounded-xl border border-border border-dashed h-96">
                        <AlertTriangle size={64} className="mb-4 opacity-20" />
                        <h4 className="text-xl font-bold text-foreground">Emergencias Obstétricas</h4>
                        <p className="text-sm mt-2 text-center max-w-sm">Selecciona una <strong>patología</strong> desde el panel de contenidos a la izquierda para ver su manejo detallado.</p>
                      </div>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'claves' && !selectedClaveTopic && (
                      <div className="flex items-center justify-center p-12 text-muted-foreground flex-col bg-accent/5 rounded-xl border border-border border-dashed h-96">
                        <ShieldAlert size={64} className="mb-4 opacity-20" />
                        <h4 className="text-xl font-bold text-foreground">Protocolos de Claves Obstétricas</h4>
                        <p className="text-sm mt-2 text-center max-w-sm">Selecciona una <strong>clave</strong> (Roja, Azul, Amarilla) desde el panel de contenidos a la izquierda.</p>
                      </div>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'claves' && selectedClaveTopic === 'roja' && (
                      <Card className="space-y-4">
                        <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
                          <Droplet size={24} />
                          <h4 className="text-xl font-bold">Clave Roja: Hemorragia Postparto</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {/* 1. Criterios de Activación y Valoración */}
                          <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20 space-y-2">
                            <h6 className="font-bold text-sm text-red-800 dark:text-red-300 border-b border-red-200 dark:border-red-800 pb-1">1. Criterios de Activación y Valoración HPP</h6>
                            <p className="text-[10px] text-muted-foreground mb-1 leading-tight italic">En emergencias, el tiempo es útero.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                              <div>
                                <strong className="text-foreground block mb-0.5">A. Pérdida Hemática:</strong>
                                <ul className="list-disc list-inside space-y-0.5 ml-1">
                                  <li>&gt; 500 ml en Parto vaginal.</li>
                                  <li>&gt; 1000 ml en Cesárea.</li>
                                  <li><span className="font-medium">Cálculo visual/gravimétrico:</span> 1 ml de sangre pesa $\approx$ 1 gramo. Cada 500cc de pérdida = disminución de Hto en 6% y Hb en &gt;1.1 gr/dl. El uso de bolsa recolectora bajo los glúteos permite medición objetiva.</li>
                                </ul>
                              </div>
                              <div>
                                <strong className="text-foreground block mb-0.5">B. Índice de Shock (IS):</strong>
                                <p className="mb-0.5">Se calcula: <span className="font-medium text-red-600">IS = Frecuencia Cardiaca / Presión Sistólica</span>.</p>
                                <ul className="list-disc list-inside space-y-0.5 ml-1">
                                  <li><strong>IS &ge; 0.9:</strong> Indica necesidad de intervención inmediata.</li>
                                  <li><strong>IS &ge; 1.4:</strong> Necesidad urgente de intervención y resolución. Prepara transfusión masiva.</li>
                                  <li><strong>IS &ge; 1.7:</strong> Elevado riesgo de resultados adversos y muerte materna.</li>
                                </ul>
                              </div>
                              <div className="md:col-span-2">
                                <strong className="text-foreground block mb-0.5">C. Signos Clínicos Progresivos (Clases de Hemorragia):</strong>
                                <ul className="list-disc list-inside space-y-0.5 ml-1">
                                  <li><strong>Clase I (15% pérdida):</strong> Mínimos cambios, ligera taquicardia.</li>
                                  <li><strong>Clase II (15-30%):</strong> Taquicardia (100-120), taquipnea (20-24), llenado capilar algo lento. Shock compensado.</li>
                                  <li><strong>Clase III (30-40%):</strong> Hipotensión (&lt;90 PAS), alteración mental, pulso filiforme (&ge;120), oliguria.</li>
                                  <li><strong>Clase IV (&gt;40%):</strong> Hipotensión severa, pulso &gt;120, anuria, frialdad/palidez extrema, letargia.</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* 2. La Nemotecnia de las 4 "T" */}
                          <div className="bg-accent/10 p-3 rounded-xl border border-border/50 space-y-2">
                            <h6 className="font-bold text-sm text-primary border-b border-border pb-1">2. La Nemotecnia de las 4 "T" (Búsqueda de la Causa)</h6>
                            <p className="text-[10px] text-muted-foreground leading-tight italic mb-2">Este es el algoritmo mental y físico que debes recorrer ordenadamente para diagnosticar y detener el sangrado:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                              <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                                <strong className="text-foreground block mb-1">TONO (70-80%): Atonía Uterina</strong>
                                <p className="mb-1">El útero no se contrae y permanece blando/flácido posparto. <span className="font-medium text-primary">Causa #1.</span></p>
                                <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                                  <li><strong>Inspección:</strong> Palpación de útero blando y supraumbilical.</li>
                                  <li><strong>Manejo:</strong> Masaje uterino bimanual constante. Batería Uterotónica (Oxitocina de primera línea, Misoprostol).</li>
                                  <li><strong>Manejo refractario:</strong> Traje Antishock (TANN), Taponamiento (Balón de Bakri), compresión aórtica abdominal, cirugía.</li>
                                </ul>
                              </div>
                              <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                                <strong className="text-foreground block mb-1">TRAUMA (20%): Laceraciones y Roturas</strong>
                                <p className="mb-1">El útero SÍ está contraído, pero existe trauma genital.</p>
                                <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                                  <li><strong>Causas:</strong> Desgarros cervicales/vaginales/perineales (parto precipitado/instrumentado), Episiotomía sangrante.</li>
                                  <li><strong>Rotura/Inversión Uterina:</strong> Dolor intenso o útero visible en vulva.</li>
                                  <li><strong>Manejo:</strong> Inspección con valvas. Reparación de desgarros, corrección de inversión uterina.</li>
                                </ul>
                              </div>
                              <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                                <strong className="text-foreground block mb-1">TEJIDO (10%): Restos Retenidos</strong>
                                <p className="mb-1">El útero está grande y blando por imposibilidad de retraerse.</p>
                                <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                                  <li><strong>Causas:</strong> Restos de placenta cotiledónica, acretismo placentario (no cede placenta), retención de membranas o coágulos intrauterinos.</li>
                                  <li><strong>Manejo:</strong> Alumbramiento incompleto: Remoción/Revisión manual instrumental de la cavidad o legrado puerperal.</li>
                                </ul>
                              </div>
                              <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                                <strong className="text-foreground block mb-1">TROMBINA (&lt;1%): Coagulopatías</strong>
                                <p className="mb-1">Sangrado generalizado, la sangre no coagula ni en la vía.</p>
                                <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                                  <li><strong>Causas:</strong> Coagulopatía de consumo (CID), Preeclampsia severa (HELLP), Von Willebrand, hemofilia, sangrado que no responde.</li>
                                  <li><strong>Manejo:</strong> Activación de protocolo de transfusión masiva, reposición específica de factores, Plasma, Plaquetas. Ácido Tranexámico urgente.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 3. Manejo Farmacológico (Escala de Uterotónicos) */}
                        <div className="bg-background p-3 rounded-xl border border-border space-y-3">
                          <h6 className="font-bold text-sm text-primary border-b border-border pb-1">3. Manejo Farmacológico (Escala de Uterotónicos)</h6>
                          <p className="text-[10px] text-muted-foreground italic">El orden de esta escala (Posicionamiento) no es arbitrario; está basado en la <span className="font-semibold text-foreground">seguridad-eficacia</span> (Perfil de riesgo/beneficio). Iniciamos con fármacos fisiológicamente similares y seguros (Oxitocina), escalando a potentes agonistas no venosos (Misoprostol) y terminando en potentes vasopresores (Metilergonovina) reservados para casos refractarios y estrictamente contraindicados en hipertensas (Clave Azul).</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Oxitocina */}
                            <div className="p-3 border border-primary/20 rounded-xl bg-primary/5 space-y-1">
                              <strong className="text-primary block text-sm">1. Oxitocina (Primera Línea - Fisiológica)</strong>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Farmacodinamia:</strong> Agonista de receptores específicos en miometrio; incrementa Ca+ intracelular, induciendo contracciones rítmicas.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Uso:</strong> Atonía Uterina.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Dosis:</strong> 10-40 UI en 1000 cc infusión titulada.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Contraindicaciones:</strong> Ruptura uterina, sufrimiento fetal.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Efectos Adversos:</strong> Hipotensión, intoxicación acuosa.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Cuidados Enfermería:</strong> 1. NUNCA bolo IV directo (causa colapso). 2. Monitorizar diuresis (evitar sobrecarga). 3. Goteo titulado segun contracciones. 4. Mantener cadena de frío.</p>
                            </div>

                            {/* Misoprostol */}
                            <div className="p-3 border border-border rounded-xl bg-accent/10 space-y-1">
                              <strong className="text-foreground block text-sm">2. Misoprostol (Segunda Línea - Potente/Alternativa)</strong>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Farmacodinamia:</strong> Análogo prostaglandina E1; aumenta Ca+ y madura/dilata el cérvix.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Uso:</strong> Atonía refractaria.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Dosis:</strong> 800 mcg (SL o Rectal).</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Contraindicaciones:</strong> Hipersensibilidad a prostaglandinas.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Efectos Adversos:</strong> Fiebre alta, escalofríos, diarrea.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Cuidados Enfermería:</strong> 1. Educar sobre fiebre/tiritona (normal). 2. Administración SL/Rectal inmediata si no hay vía. 3. Proteger del ambiente hasta uso. 4. Vigilar respuesta uterina contínua.</p>
                            </div>

                            {/* Tranexámico */}
                            <div className="p-3 border border-blue-200 dark:border-blue-900/30 rounded-xl bg-blue-50/50 dark:bg-blue-900/5 space-y-1">
                              <strong className="text-blue-700 dark:text-blue-400 block text-sm">3. Ácido Tranexámico (Coadyuvante - Antifibrinolítico)</strong>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Farmacodinamia:</strong> Antifibrinolítico; bloquea activación de plasminógeno a plasmina.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Uso:</strong> Hemorragia Postparto (Protección coágulo).</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Dosis:</strong> 1 g IV en {">"}10 min (repetir si es necesario).</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Contraindicaciones:</strong> CID severa, tromboembolismo.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Efectos Adversos:</strong> Hipotensión (bolo rápido), náuseas.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Cuidados Enfermería:</strong> 1. Administrar LENTO ({">"}10 min). 2. Confirmar hora cero de sangrado. 3. Monitorizar TA. 4. Evaluar necesidad de segunda dosis.</p>
                            </div>

                            {/* Metilergonovina */}
                            <div className="p-3 border border-red-200 dark:border-red-900/30 rounded-xl bg-red-50/50 dark:bg-red-900/10 space-y-1">
                              <strong className="text-red-700 dark:text-red-400 block text-sm">4. Metilergonovina (Tercera Línea - Vascular)</strong>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Farmacodinamia:</strong> Vasoconstrictor; estimula receptores alfa-adrenérgicos/serotoninérgicos, tetania uterina.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Uso:</strong> Atonía refractaria extrema.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Dosis:</strong> 0.2 mg IM (NO administrar IV).</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Contraindicaciones:</strong> <span className="font-bold">HTA (Clave Azul)</span>.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Efectos Adversos:</strong> HTA severa, ACV, IAM, cefalea.</p>
                              <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Cuidados Enfermería:</strong> 1. Verificar TA Previa ({">"}140/90 prohibido). 2. Exclusivamente IM profunda. 3. Refrigerar (fotosensible). 4. Reportar presencia de cefalea intensa tras uso.</p>
                            </div>
                          </div>
                        </div>

                        {/* 4. Intervenciones Críticas */}
                        <div className="p-3 bg-red-50/50 dark:bg-red-900/5 rounded-xl border border-red-100 dark:border-red-900/20">
                          <h6 className="font-bold text-sm text-red-800 dark:text-red-400 flex items-center mb-2 border-b border-red-200 dark:border-red-900/30 pb-1">
                            <AlertTriangle size={16} className="mr-1" /> 4. Intervenciones Críticas (La "Hora de Oro")
                          </h6>
                          <div className="grid grid-cols-1 gap-3 text-[11px] text-muted-foreground">
                            
                            {/* Acceso Venoso */}
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-red-600 block mb-1">1. Acceso Venoso (Reanimación)</strong>
                              <ul className="list-disc list-inside space-y-0.5">
                                <li><strong>Dispositivo:</strong> Dos catéteres periféricos de grueso calibre (14G o 16G) preferiblemente en venas del antebrazo.</li>
                                <li><strong>Racional:</strong> Permiten la infusión máxima de fluidos (cristaloides/coloides/sangre) según la ley de Poiseuille.</li>
                                <li><strong>Cuidados:</strong> Verificar permeabilidad cada 15 min, observar signos de extravasación (edema, dolor local), asegurar correcta fijación. Si el acceso periférico falla, considerar vía intraósea.</li>
                              </ul>
                            </div>

                            {/* Muestras */}
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-red-600 block mb-1">2. Muestras de Laboratorio</strong>
                              <ul className="list-disc list-inside space-y-0.5">
                                <li><strong>Toma:</strong> Aprovechar el momento de la punción del acceso venoso.</li>
                                <li><strong>Estudios Vitales:</strong> Tipificación y pruebas cruzadas (IMPRESCINDIBLE), biometría hemática (Hb/Hcto), tiempos de coagulación (TP, TTP, Fibrinógeno) y Lactato para evaluar choque.</li>
                                <li><strong>Cuidados:</strong> Rotular in situ con nombre completo, ID, fecha y hora. Garantizar transporte inmediato al laboratorio. Comunicar "Prioridad Clave Roja".</li>
                              </ul>
                            </div>

                            {/* Termico */}
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-red-600 block mb-1">3. Manejo Térmico (Prevención de Hipotermia)</strong>
                              <ul className="list-disc list-inside space-y-0.5">
                                <li><strong>Contexto:</strong> La hipotermia altera la cascada de coagulación, agravando la hemorragia.</li>
                                <li><strong>Procedimientos:</strong> Administrar líquidos intravenosos calentados (si es posible), cubrir a la paciente con frazadas precalentadas o mantas térmicas, retirar ropa mojada.</li>
                                <li><strong>Cuidados:</strong> Monitorización de temperatura central (axilar/rectal) cada 15-30 min. Ajustar temperatura ambiental de la sala.</li>
                              </ul>
                            </div>

                            {/* Sondaje */}
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-red-600 block mb-1">4. Sondaje Vesical (Control de Perfusión)</strong>
                              <ul className="list-disc list-inside space-y-0.5">
                                <li><strong>Procedimiento:</strong> Técnica estéril rigurosa. Inserción de sonda Foley conectada a bolsa de drenaje graduada a ciclo cerrado.</li>
                                <li><strong>Propósito:</strong> Vigilancia estricta del volumen urinario (diuresis objetivo: &gt;0.5 ml/kg/h) como marcador de perfusión renal y respuesta a la reanimación.</li>
                                <li><strong>Cuidados:</strong> Fijación correcta para evitar trauma uretral, registro horario riguroso, técnica aséptica permanente al manipular, observación de color de orina (hematuria).</li>
                              </ul>
                            </div>

                          </div>
                        </div>

                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'claves' && selectedClaveTopic === 'azul' && (
                      <Card className="space-y-4">
                        <div className="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
                          <Activity size={24} />
                          <h4 className="text-xl font-bold">Clave Azul: Preeclampsia Grave y Eclampsia</h4>
                        </div>
                        
                        {/* 1. Criterios de Activación */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/20">
                          <h6 className="font-bold text-sm text-blue-800 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800 pb-1 mb-2">1. Criterios de Activación (¿Cuándo activar la Clave Azul?)</h6>
                          <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-1">
                            <li><strong>Presión Arterial:</strong> &ge; 160/110 mmHg.</li>
                            <li><strong>Signos de Premonitoria (Eclampsia):</strong> Cefalea intensa, visión borrosa (fosfenos), zumbido de oídos (tinnitus), dolor en epigastrio ("boca del estómago") o hiperreflexia.</li>
                            <li><strong>Convulsiones:</strong> En presencia de hipertensión (Eclampsia).</li>
                          </ul>
                        </div>

                        {/* Intervenciones por Roles */}
                        <div>
                          <h6 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-2">Intervenciones por Roles (Interprofesional)</h6>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-blue-600 block mb-1">Coordinador (Médico)</strong>
                              Dirige la emergencia y decide el desembarazo.
                            </div>
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-blue-600 block mb-1">Asistente 1 (Cabecera)</strong>
                              Asegura vía aérea, oxígeno y registra tiempos.
                            </div>
                            <div className="bg-white dark:bg-background p-2 rounded shadow-sm border border-border">
                              <strong className="text-blue-600 block mb-1">Asistente 2 (Circulante)</strong>
                              Canaliza las dos vías, toma muestras de laboratorio (perfil hepático, proteinuria, plaquetas) y coloca la sonda vesical.
                            </div>
                          </div>
                        </div>

                        {/* 2. Protocolo de Medicación */}
                        <div className="p-3 bg-accent/10 border border-border/50 rounded-xl space-y-3">
                          <h6 className="font-bold text-sm text-primary border-b border-border pb-1">2. Protocolo de Sulfato de Magnesio y Antihipertensivos (Esquema de Zuspan)</h6>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="bg-background p-3 rounded-lg border border-border">
                              <p className="text-xs font-bold text-blue-600 mb-2 truncate">Preeclampsia Grave (Prevención)</p>
                              <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1.5">
                                <li>
                                  <strong className="text-foreground">Impregnación (4g IV en 20 min):</strong><br/>
                                  <span className="block pl-4 mt-0.5">Preparación: 20 mL Sulfato de Magnesio 20% (2 ampollas = 4g) + 80 mL Solución Isotónica (SS 0.9%).<br/>Administración: Pasar 100 mL total a 300 mL/h en bomba de infusión (o 100 gotas/min con venoclisis).</span>
                                </li>
                                <li>
                                  <strong className="text-foreground">Mantenimiento (1g/hora IV continua):</strong><br/>
                                  <span className="block pl-4 mt-0.5">Preparación: 50 mL Sulfato de Magnesio 20% (10g) + 450 mL Solución Isotónica.<br/>Administración: Pasar a 50 mL/h en bomba de infusión (o 17 gotas/min).</span>
                                </li>
                              </ul>
                            </div>
                            <div className="bg-background p-3 rounded-lg border border-red-200 dark:border-red-900/30">
                              <p className="text-xs font-bold text-red-600 mb-2 truncate">Eclampsia (Tratamiento Convulsiones)</p>
                              <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1.5">
                                <li>
                                  <strong className="text-foreground">Impregnación (6g IV en 20 min):</strong><br/>
                                  <span className="block pl-4 mt-0.5">Preparación: 30 mL Sulfato de Magnesio 20% (3 ampollas = 6g) + 70 mL Solución Isotónica.<br/>Administración: Pasar 100 mL total a 300 mL/h. <span className="text-red-500 font-semibold text-[9px]">¡Si recurre la convulsión colocar 2g adicionales a los 20 min!</span></span>
                                </li>
                                <li>
                                  <strong className="text-foreground">Mantenimiento (2g/hora IV continua):</strong><br/>
                                  <span className="block pl-4 mt-0.5">Preparación: 100 mL Sulfato de Magnesio 20% (10 ampollas = 20g) + 400 mL Solución Isotónica.<br/>Administración: Pasar a 50 mL/h en bomba de infusión (o 17 gotas/min).</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-background p-3 rounded-lg border border-border">
                            <p className="text-xs font-bold text-primary mb-2">Antihipertensivos de Urgencia (Iniciar si TA &ge; 160/110)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] text-muted-foreground">
                              <div><strong className="text-foreground">Nifedipino (Vía Oral):</strong> 10 mg VO (repetir 10-20 mg cada 20-30 min si no baja, máximo 60mg). <span className="text-red-500 font-semibold border-b border-red-500">Nunca usar sublingual</span>.</div>
                              <div><strong className="text-foreground">Hidralazina (Vía Intravenosa):</strong> 5 mg IV lentamente (sobre 2 a 4 minutos). Repetir 5-10 mg en 20 minutos de ser necesario.</div>
                              <div><strong className="text-foreground">Labetalol (Vía Intravenosa):</strong> 20 mg IV en 2 minutos. (Dosis progresiva si no hay mejora).</div>
                            </div>
                          </div>
                        </div>

                        {/* 3. Kit y 4. Toxicidad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-accent/10 border border-border/50 rounded-xl space-y-2">
                            <h6 className="font-bold text-sm text-primary border-b border-border pb-1">3. El Kit de Clave Azul (Insumos Críticos)</h6>
                            <p className="text-[10px] text-muted-foreground mb-1 leading-tight">Manejo por enfermería: Debe ser una caja o maletín exclusivo, debidamente rotulado, accesible, sellado y sujeto a revisión mensual / por turno.</p>
                            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-1.5">
                              <li>
                                <strong className="text-foreground">Fluidos y Fármacos:</strong>
                                <ul className="pl-4 list-[circle] mt-0.5 space-y-0.5">
                                  <li>Sulfato de Magnesio al 20% (10 ampollas mínimo).</li>
                                  <li>Gluconato de Calcio al 10% (Antídoto).</li>
                                  <li>Nifedipina 10mg VO e Hidralazina 20mg IV.</li>
                                  <li>Solución isotónica (SS 0.9% o lactato de Ringer 1000ml) y boluciones de 100ml / 250ml para dilución.</li>
                                </ul>
                              </li>
                              <li>
                                <strong className="text-foreground">Dispositivos y Accesos Intravenosos:</strong>
                                <ul className="pl-4 list-[circle] mt-0.5 space-y-0.5">
                                  <li>Catéteres periféricos de grueso calibre (14G, 16G, 18G).</li>
                                  <li>Equipos de venoclisis y micro/macrogoteros. jeringas (3, 5, 10, 20 ml).</li>
                                </ul>
                              </li>
                              <li>
                                <strong className="text-foreground">Soporte Respiratorio y Urológico:</strong>
                                <ul className="pl-4 list-[circle] mt-0.5 space-y-0.5">
                                  <li>Cánula de Guedel (Tubo de Mayo) y mascarilla de O2. Bolsa de reanimación (Ambu).</li>
                                  <li>Sonda Foley (14 o 16 Fr) con bolsa recolectora (<span className="text-blue-500 font-medium">vital para medir diuresis horaria</span>). Tubos de extracción de sangre.</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                            
                          <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-200">
                            <h6 className="font-bold text-sm text-orange-800 dark:text-orange-400 flex items-center mb-2 border-b border-orange-200 dark:border-orange-800 pb-1">
                              <AlertTriangle size={16} className="mr-1" /> 4. Vigilancia de Toxicidad de Sulfato
                            </h6>
                            <p className="text-[10px] text-muted-foreground mb-2 leading-tight">Como profesional de enfermería, debes realizar el control de parámetros <strong className="text-orange-600">cada hora</strong> mientras dure la infusión. El riñón elimina el magnesio; la falla renal (diuresis baja) lo acumula causando toxicidad sistémica y muerte.</p>
                            
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              <div className="bg-white dark:bg-background rounded p-2 text-center shadow-sm">
                                <span className="block text-[10px] font-bold text-orange-600 mb-1">Rotuliano</span>
                                <span className="text-[11px] text-foreground font-medium">Presente</span>
                                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">La hiporreflexia es el primer signo (8-12 mg/dl)</p>
                              </div>
                              <div className="bg-white dark:bg-background rounded p-2 text-center shadow-sm">
                                <span className="block text-[10px] font-bold text-orange-600 mb-1">Respiración</span>
                                <span className="text-[11px] text-foreground font-medium">&gt; 12-16 rpm</span>
                                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">La depresión/paro llega a &gt;15 mg/dl</p>
                              </div>
                              <div className="bg-white dark:bg-background rounded p-2 text-center shadow-sm">
                                <span className="block text-[10px] font-bold text-orange-600 mb-1">Diuresis</span>
                                <span className="text-[11px] text-foreground font-medium">&gt; 30 ml/h</span>
                                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">Evaluar vía sonda Foley urgente si baja</p>
                              </div>
                            </div>
                            
                            <p className="text-xs font-bold text-red-600 mt-2 mb-1">Manejo de Intoxicación:</p>
                            <ol className="text-[10px] text-muted-foreground list-decimal list-inside space-y-0.5">
                              <li>Suspender Inmediatamente la infusión de Sulfato de Magnesio.</li>
                              <li>Brindar soporte ventilatorio y O2 (canula o intubación en casos severos).</li>
                              <li>Administrar el antídoto: <strong>Gluconato de Calcio al 10%</strong>. Pasar 1 ampolla (1 g / 10ml) IV muy lento (en 3 a 10 min).</li>
                            </ol>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'claves' && selectedClaveTopic === 'amarilla' && (
                      <Card className="space-y-4">
                        <div className="flex items-center space-x-3 text-yellow-600 dark:text-yellow-500">
                          <ShieldAlert size={24} />
                          <h4 className="text-xl font-bold">Clave Amarilla: Choque Séptico y Sepsis Obstétrica</h4>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 border border-yellow-200 dark:border-yellow-900/30 rounded-xl space-y-4">
                          <h6 className="font-bold text-sm text-yellow-800 dark:text-yellow-400">Minuto Cero: Activación y Roles del Equipo</h6>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 text-xs text-muted-foreground">
                              <p className="font-bold text-yellow-700">Líder (Coordinador):</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li><strong>Acción:</strong> Grita "Clave Amarilla".</li>
                                <li>Coordinación de ruta crítica, comunicación al centro de referencia (lazo con hospital nivel superior).</li>
                                <li>Evaluación continua de estabilidad hemodinámica.</li>
                              </ul>
                            </div>
                            <div className="space-y-2 text-xs text-muted-foreground">
                              <p className="font-bold text-yellow-700">Asistente Clínico (Apoyo):</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Manejo de vía aérea/oxigenación (&gt;95%).</li>
                                <li>Sonda vesical (Folley) para control horaria de diuresis (marcador de perfusión).</li>
                                <li>Asistencia en el monitoreo y procedimientos invasivos.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-card border-l-4 border-yellow-600 rounded-r-lg space-y-2">
                            <p className="font-bold text-xs text-yellow-700">Rol Crítico de Enfermería (Gestión y Cuidados):</p>
                            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-1">
                              <li><strong>Accesos Venosos:</strong> Dos vías periféricas (calibre &gt;16G).</li>
                              <li><strong>Fluidos/Fármacos:</strong> Resucitación temprana con carga de cristaloides (30ml/kg si hipotensa) y administración inmediata de antibióticos (no postergar por laboratorios).</li>
                              <li><strong>Monitoreo y Muestras:</strong> Hemograma, lactato sérico, cultivos (sangre periférica, orina, loquios).</li>
                              <li><strong>Registro Estricto:</strong> Hoja de registro de acciones y tiempos (fundamental para la reevaluación médica).</li>
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-accent/10 border border-border/50 rounded-xl space-y-2">
                            <h6 className="font-bold text-sm text-primary border-b border-border pb-1">El "Bundle" de Reanimación en Primera Hora</h6>
                            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-1">
                              <li><strong>No retrasar ATB:</strong> La antibioticoterapia se debe administrar independientemente si los cultivos han sido tomados si la condición materna declina. Cada hora de retraso aumenta mortalidad un 7%.</li>
                              <li><strong>Lactato y Gasometría:</strong> Guiarán el progreso o deterioro tisular de la hipoperfusión. Reevaluar su descenso con fluidos.</li>
                              <li><strong>Fluidos de Resucitación:</strong> Bolo cristaloides 30 ml/kg si PAM está reducida (PAM &lt; 65 mmHg) o indicios de daño orgánico de inicio en menos de 3h.</li>
                              <li><strong>Vasopresores:</strong> De elección Norepinefrina titular hasta alcanzar PAM de 65mmHg, si hipotensión no respondió al bolo inicial de cristaloides. Referencia urgente (UCI).</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-accent/10 border border-border/50 rounded-xl space-y-2">
                            <h6 className="font-bold text-sm text-primary border-b border-border pb-1">Esquema Antibiótico Empírico Amplio</h6>
                            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-1">
                              <li><strong>Terapia de amplio espectro combinada:</strong> Cubrir Gram +, Gram - aerobios y anaerobios del lecho pélvico.</li>
                              <li><strong>Opción Frecuente Pélvica:</strong> Clindamicina (600mg-900mg IV) + Gentamicina (5mg/kg) + Ampicilina. (Dependerá de perfil microbiológico y hospitalario).</li>
                              <li><strong>Opciones de Urgencia Severa:</strong> Piperacilina-Tazobactam.</li>
                              <li><strong>Foco Infeccioso:</strong> El control del foco es imperativo (evacuación de útero de restos ovulares infectados [Legrado Instrumental], drenaje de abscesos, recamara quirúrgica). </li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'parto' && !selectedDisease && !selectedPartoTopic && (
                      <div className="flex items-center justify-center p-12 text-muted-foreground flex-col bg-accent/5 rounded-xl border border-border border-dashed h-96">
                        <Baby size={64} className="mb-4 opacity-20" />
                        <h4 className="text-xl font-bold text-foreground">Parto, Puerperio y Lactancia</h4>
                        <p className="text-sm mt-2 text-center max-w-sm">Selecciona un <strong>tema clínico</strong> o una <strong>patología</strong> desde el panel de contenidos a la izquierda.</p>
                      </div>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'parto' && selectedPartoTopic === 'parto' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Activity size={24} />
                          <h4 className="text-xl font-bold">Trabajo de Parto y Parto</h4>
                        </div>
                        <div className="space-y-6">
                          {/* Fases del Parto */}
                          <div className="bg-accent/10 p-4 rounded-xl border border-border/50">
                            <h6 className="font-bold text-sm mb-3 flex items-center text-primary"><Clock size={16} className="mr-2" /> Fases Clínicas y Cuidados de Enfermería</h6>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                              <div className="bg-background p-3 rounded-lg border border-border">
                                <p className="text-xs font-bold text-primary mb-1">1. Periodo de Dilatación (1ra Etapa)</p>
                                <p className="text-[11px] text-muted-foreground mb-2"><strong>Fase Latente:</strong> Dilatación hasta 4-6 cm. Contracciones irregulares o espaciadas.<br/><strong>Fase Activa:</strong> Dilatación &gt;6 cm hasta 10 cm. Contracciones regulares (3-4/10 min).</p>
                                <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-0.5">
                                  <li>Monitorizar signos vitales maternos c/2h.</li>
                                  <li>Fomentar deambulación, posiciones libres (esferodinamia).</li>
                                  <li>Canalización de vía periférica permeable gruesa (18G o 20G).</li>
                                </ul>
                              </div>
                              <div className="bg-background p-3 rounded-lg border border-border">
                                <p className="text-xs font-bold text-primary mb-1">2. Período Expulsivo (2da Etapa)</p>
                                <p className="text-[11px] text-muted-foreground mb-2">Inicia con dilatación completa (10 cm) y termina con la salida total del recién nacido. Sensación clínica de pujo.</p>
                                <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-0.5">
                                  <li>Monitorización continua de dinámica uterina (DU).</li>
                                  <li>Asepsia y antisepsia perineal e instrumental.</li>
                                  <li>Apoyo emocional continuo e indicaciones de pujo.</li>
                                </ul>
                              </div>
                              <div className="bg-background p-3 rounded-lg border border-border md:col-span-2">
                                <p className="text-xs font-bold text-primary mb-1">3. Alumbramiento (3ra Etapa) - MATPE</p>
                                <p className="text-[11px] text-muted-foreground mb-2">Desde la salida del RN hasta la expulsión de placenta y membranas (Normal: &lt;30 min). <strong>Manejo Activo (MATPE)</strong> es mandatorio para prevenir HPP:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div className="bg-orange-500/10 p-2 rounded text-[10px]">
                                    <strong className="text-orange-700">1. Uterotónico:</strong> Oxitocina 10 UI IM en el 1er minuto tras salida de hombro anterior.
                                  </div>
                                  <div className="bg-orange-500/10 p-2 rounded text-[10px]">
                                    <strong className="text-orange-700">2. Tracción:</strong> Maniobra de Brandt-Andrews (tracción controlada del cordón + contracción suprapúbica).
                                  </div>
                                  <div className="bg-orange-500/10 p-2 rounded text-[10px]">
                                    <strong className="text-orange-700">3. Masaje:</strong> Masaje uterino transabdominal cada 15 min por 2 horas.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Monitoreo y Mecanismos */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20">
                              <h6 className="font-bold text-sm mb-2 flex items-center text-blue-700 dark:text-blue-400"><Stethoscope size={16} className="mr-2" /> Monitorización Fetal</h6>
                              <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Auscultación Intermitente (Bajo Riesgo):</p>
                              <ul className="text-xs text-muted-foreground list-disc list-inside mb-3 space-y-0.5">
                                <li><strong>Fase Latente:</strong> Cada 30-60 minutos.</li>
                                <li><strong>Fase Activa:</strong> Cada 15-30 minutos, escuchar por 1 minuto durante y justo después de la contracción.</li>
                                <li><strong>Expulsivo:</strong> Cada 5 minutos o tras cada contracción.</li>
                              </ul>
                              <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Rastreo Cardiotocográfico (Alarma):</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                FCF Basal normal: 110-160 lpm. <br/>
                                <strong>Taquicardia (&gt;160):</strong> Infección materna (corioamnionitis), fiebre, hipoxia temprana.<br/>
                                <strong>Bradicardia (&lt;110):</strong> Hipoxia fetal tardía, compresión grave del cordón.<br/>
                                <strong>DIPs Tipo II / Desaceleraciones Tardías:</strong> Insuficiencia placentaria severa (Cesárea urgente).
                              </p>
                            </div>
                            
                            <div className="bg-accent/10 p-4 rounded-xl">
                              <h6 className="font-bold text-sm mb-2 flex items-center"><RotateCw size={16} className="text-primary mr-1" /> Mecanismos (7 Cardinales)</h6>
                              <ul className="text-[11px] space-y-1 text-muted-foreground">
                                <li><span className="font-bold text-primary">1. Encajamiento:</span> Diámetro biparietal ingresa a pelvis.</li>
                                <li><span className="font-bold text-primary">2. Descenso:</span> Inducido por líquido, fondo uterino y pujo.</li>
                                <li><span className="font-bold text-primary">3. Flexión:</span> Mentón sobre el esternón (diámetro suboccipitobregmático).</li>
                                <li><span className="font-bold text-primary">4. Rotación Interna:</span> Occipucio hacia sínfisis del pubis.</li>
                                <li><span className="font-bold text-primary">5. Extensión:</span> Cabeza distiende el periné y sale al exterior.</li>
                                <li><span className="font-bold text-primary">6. Restitución (Rot. Ext):</span> Alineamiento paralelo a los hombros.</li>
                                <li><span className="font-bold text-primary">7. Expulsión:</span> Hombro anterior primero, luego posterior y el resto.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Desgarros y Cuidado Perineal */}
                          <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-xl md:col-span-2">
                            <h6 className="font-bold text-sm mb-3 flex items-center text-orange-600"><AlertTriangle size={16} className="mr-2" /> Clasificación y Manejo de Desgarros Perineales</h6>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-left mb-3">
                              <div className="p-3 bg-background rounded-lg border border-orange-200">
                                <p className="text-xs font-bold text-orange-700 mb-1 border-b border-orange-100 pb-1">Grado I</p>
                                <p className="text-[10px] text-muted-foreground">Afecta solo <strong>piel del periné</strong> y <strong>mucosa vaginal</strong>. Músculo intacto. <br/><span className="text-primary font-medium">Manejo:</span> Sutura opcional (solo si sangra activo o deforma la anatomía).</p>
                              </div>
                              <div className="p-3 bg-background rounded-lg border border-orange-200">
                                <p className="text-xs font-bold text-orange-700 mb-1 border-b border-orange-100 pb-1">Grado II</p>
                                <p className="text-[10px] text-muted-foreground">Afecta <strong>fascia y músculos</strong> del periné (transverso, bulboesponjoso), sin llegar al esfínter anal. <br/><span className="text-primary font-medium">Manejo:</span> Requiere sutura por planos (episiorrafia).</p>
                              </div>
                              <div className="p-3 bg-background rounded-lg border border-orange-200">
                                <p className="text-xs font-bold text-orange-700 mb-1 border-b border-orange-100 pb-1">Grado III (a, b, c)</p>
                                <p className="text-[10px] text-muted-foreground">Lesión del <strong>esfínter anal</strong>.<br/> <strong>IIIa</strong>: &lt;50% EAS.<br/> <strong>IIIb</strong>: &gt;50% EAS.<br/> <strong>IIIc</strong>: EAS + EAI. <br/><span className="text-primary font-medium">Manejo:</span> Cirujano en quirófano. Riesgo de incontinencia.</p>
                              </div>
                              <div className="p-3 bg-background rounded-lg border border-orange-200">
                                <p className="text-xs font-bold text-orange-700 mb-1 border-b border-orange-100 pb-1">Grado IV</p>
                                <p className="text-[10px] text-muted-foreground">Extensión hasta la <strong>mucosa rectal</strong> (comunica vagina-recto). <br/><span className="text-primary font-medium">Manejo:</span> Quirófano, ATB profiláctico, laxantes obligatorios posteriores.</p>
                              </div>
                            </div>
                            <div className="bg-orange-100/50 dark:bg-orange-900/20 p-3 rounded border border-orange-200/50">
                              <p className="text-xs font-bold text-orange-800 dark:text-orange-300 mb-2 border-b border-orange-200 dark:border-orange-800 pb-1 block">Cuidados Integrales del Periné (Prevención y Recuperación):</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                                <div>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Prevención Intraparto:</strong> Masaje perineal prenatal, compresas tibias en 2da etapa, protección manual (Maniobra de Ritgen).</li>
                                    <li><strong>Episiotomía Restrictiva:</strong> Solo si hay riesgo de desgarro grave, fórceps o bradicardia fetal. Ideal mediolateral.</li>
                                  </ul>
                                </div>
                                <div>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Recuperación y Alivio:</strong> Compresas de hielo local las primeras 24h. Después aplicar baños de asiento tibios.</li>
                                    <li><strong>Grados III y IV:</strong> Laxantes ablandadores obligatorios (lactulosa). Analgesia (AINEs). <strong>Prohibido supositorios o enemas.</strong></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'parto' && selectedPartoTopic === 'puerperio' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <History size={24} />
                          <h4 className="text-xl font-bold">Puerperio (Inmediato, Mediato y Alejado)</h4>
                        </div>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl md:col-span-2">
                              <h6 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400">Vigilancia de Complicaciones Críticas: Las "4 T"</h6>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="bg-background rounded-lg p-2 border border-red-100 dark:border-red-800">
                                  <p className="text-xs font-bold text-red-600">1. Tono (70%)</p><p className="text-[10px] text-muted-foreground">Atonía uterina. Manejo: Masaje, oxitocina, misoprostol, balón Bakri o compresión bimanual.</p>
                                </div>
                                <div className="bg-background rounded-lg p-2 border border-red-100 dark:border-red-800">
                                  <p className="text-xs font-bold text-red-600">2. Trauma (20%)</p><p className="text-[10px] text-muted-foreground">Desgarros, ruptura uterina, inversión uterina. Revisión de canal de parto bajo adecuada iluminación.</p>
                                </div>
                                <div className="bg-background rounded-lg p-2 border border-red-100 dark:border-red-800">
                                  <p className="text-xs font-bold text-red-600">3. Tejido (10%)</p><p className="text-[10px] text-muted-foreground">Retención de restos placentarios o coágulos. Limpieza y posible legrado puerperal.</p>
                                </div>
                                <div className="bg-background rounded-lg p-2 border border-red-100 dark:border-red-800">
                                  <p className="text-xs font-bold text-red-600">4. Trombina (1%)</p><p className="text-[10px] text-muted-foreground">Coagulopatías, preeclampsia severa, CID o embolia de líquido amniótico.</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-accent/10 rounded-xl space-y-4">
                              <div>
                                <h6 className="font-bold text-sm mb-1 flex items-center text-primary"><Clock size={16} className="mr-1" /> Etapas del Puerperio</h6>
                                <p className="text-[11px] text-muted-foreground mb-1"><strong>Inmediato (0 - 24 horas):</strong> Máximo riesgo de hemorragia. Monitorizar SV, sangrado vaginal y correcta retracción uterina (Globo de seguridad de Pinard).</p>
                                <p className="text-[11px] text-muted-foreground mb-1"><strong>Mediato (2 - 7 días):</strong> Riesgo de mastitis o infecciones. Favorecer lactancia y vigilar involución uterina y loquios.</p>
                                <p className="text-[11px] text-muted-foreground"><strong>Tardío (8 - 42 días):</strong> Retorno progresivo al estado pre-gravídico, fin de los loquios y posibles síntomas de depresión posparto.</p>
                              </div>
                            </div>

                            <div className="p-3 bg-accent/10 rounded-xl space-y-4">
                              <div>
                                <h6 className="font-bold text-sm mb-1 flex items-center text-primary"><ClipboardList size={16} className="mr-1" /> Valoración Sistemática (BUBBLE-HE)</h6>
                                <ul className="text-[10px] text-muted-foreground space-y-0.5 mt-1 leading-tight list-disc list-inside">
                                  <li><strong>B (Breasts):</strong> Mamas (simetría, ingurgitación, pezones agrietados).</li>
                                  <li><strong>U (Uterus):</strong> Útero (firmeza, altura respecto al ombligo).</li>
                                  <li><strong>B (Bowel):</strong> Intestinos (ruidos hidroaéreos, flatulencia, defecación).</li>
                                  <li><strong>B (Bladder):</strong> Vejiga (diuresis, distensión, globo vesical).</li>
                                  <li><strong>L (Lochia):</strong> Loquios (cantidad, color, olor).</li>
                                  <li><strong>E (Episiotomy):</strong> Episiotomía/Periné (edema, equimosis, aproximación).</li>
                                  <li><strong>H (Homan):</strong> Signo de Homan negativo (evaluar riesgo de Trombosis).</li>
                                  <li><strong>E (Emotions):</strong> Estado emocional (vínculo, "baby blues" vs depresión).</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-xl md:col-span-2">
                              <h6 className="font-bold text-sm mb-3 text-green-700 dark:text-green-400 flex items-center border-b border-green-200 dark:border-green-800 pb-2">
                                <Activity size={18} className="mr-2" /> Monitorización Exhaustiva y Manejo de Complicaciones
                              </h6>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                
                                {/* Monitoreo Estricto */}
                                <div className="space-y-2">
                                  <p className="text-[11px] font-bold text-green-800 dark:text-green-300 uppercase">1. Protocolo de Signos Vitales:</p>
                                  <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1">
                                    <li><strong>1ra Hora (Recuperación):</strong> SV, fondo uterino y loquios cada <strong>15 minutos</strong>.</li>
                                    <li><strong>2da Hora:</strong> Control cada <strong>30 minutos</strong>.</li>
                                    <li><strong>Primeras 24 Horas:</strong> Control cada <strong>4 a 8 horas</strong>.</li>
                                    <li><span className="text-red-500 font-medium">Alerta T.A.:</span> TA &gt; 140/90 mmHg repetida indica Preeclampsia Posparto (puede aparecer días o semanas post-parto).</li>
                                    <li><span className="text-red-500 font-medium">Alerta F.C.:</span> Taquicardia persistente es signo precoz de hipovolemia por Hemorragia antes de que caiga la TA.</li>
                                  </ul>
                                </div>

                                {/* Cuidados y Manejo */}
                                <div className="space-y-2">
                                  <p className="text-[11px] font-bold text-green-800 dark:text-green-300 uppercase">2. Manejo de Síntomas Diarios:</p>
                                  <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1">
                                    <li><strong>Entuertos (Dolor uterino):</strong> Contracciones postparto intensas (suele doler más en multíparas o al lactar por oxitocina). Manejo: AINEs (Ibuprofeno 400mg c/8h).</li>
                                    <li><strong>Tromboprofilaxis:</strong> Deambulación precoz (6-8h). Si hay factores de riesgo (ej. Obesidad, cesárea de emergencia): Heparina de Bajo Peso Molecular (HBPM).</li>
                                    <li><strong>Retención Urinaria:</strong> Vigilar <em>primera micción espontánea</em> en las primeras 6h. Si &gt;6h sin orina + globo vesical: Cateterismo intermitente.</li>
                                  </ul>
                                </div>

                                {/* Complicaciones y Banderas Rojas */}
                                <div className="space-y-2 lg:col-span-1 md:col-span-2">
                                  <p className="text-[11px] font-bold text-green-800 dark:text-green-300 uppercase">3. Banderas Rojas y Notificación Urgente:</p>
                                  <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1">
                                    <li><strong>Hemorragia (HPP):</strong> Empapar &gt;1 toalla sanitaria por hora, o expulsión de coágulos del tamaño de un limón.</li>
                                    <li><strong>Infección (Endometritis):</strong> Fiebre &gt;38°C después de las 24h, taquicardia, dolor hipogástrico severo, subinvolución y <em>loquios muy fétidos</em>.</li>
                                    <li><strong>Trastornos Psicológicos:</strong> "Baby Blues" (llanto transitorio, dura 1-2 semanas, normal) vs <strong>Depresión Posparto</strong> (dura &gt;2 semanas, apatía total, incapacidad de cuidar al bebé) o <strong>Psicosis Puerperal</strong> (Alucinaciones, ideación suicida/infanticida - Emergencia psiquiátrica).</li>
                                  </ul>
                                </div>

                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4 mt-2 border-t border-border">
                            <h5 className="font-bold text-sm mb-3">Tabla de Consulta Rápida: Involución y Hemorragia</h5>
                             <div className="overflow-x-auto">
                               <table className="w-full text-left text-xs border-collapse">
                                 <thead>
                                   <tr className="bg-accent/50">
                                     <th className="p-2 border border-border font-bold">Parámetro Evaluado</th>
                                     <th className="p-2 border border-border font-bold">Estado Normal Esperado</th>
                                     <th className="p-2 border border-border font-bold">Signo de Alarma / Anormal</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                   <tr>
                                     <td className="p-2 border border-border bg-accent/5">Fondo Uterino</td>
                                     <td className="p-2 border border-border">Firme ("Leño"), a nivel umbilical (Día 1). Descenso 1cm/día.</td>
                                     <td className="p-2 border border-border text-red-600 font-bold">Blando/flácido, supraumbilical, desviado a la derecha.</td>
                                   </tr>
                                   <tr>
                                     <td className="p-2 border border-border bg-accent/5">Loquios Rubra (Día 1-3)</td>
                                     <td className="p-2 border border-border">Color rojo brillante/oscuro. Olor similar al de menstruación.</td>
                                     <td className="p-2 border border-border text-red-600 font-bold">Sangre roja viva abundante, olor fétido intenso.</td>
                                   </tr>
                                   <tr>
                                     <td className="p-2 border border-border bg-accent/5">Loquios Serosos (Día 4-10)</td>
                                     <td className="p-2 border border-border">Color rosado o marrón pálido. Cantidad menor.</td>
                                     <td className="p-2 border border-border text-red-600 font-bold">Retorno súbito a loquios rubra, expulsión mola/coágulo.</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'parto' && !selectedDisease && (selectedPartoTopic === 'lactancia' || selectedPartoTopic === 'escalas') && (
                      <Card className="space-y-6">
                        {selectedPartoTopic === 'lactancia' ? (
                          <div className="space-y-6">
                            <div className="flex items-center space-x-3 text-pink-500">
                              <Heart size={24} />
                              <h4 className="text-xl font-bold">Lactancia Materna y Recién Nacido (RN)</h4>
                            </div>
                            
                            <div className="space-y-6">
                              {/* Educación para Madre Primeriza */}
                              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
                                <h6 className="font-bold text-sm text-primary flex items-center">
                                  <BookOpen size={16} className="mr-2" />
                                  Educación Nutricional y Asesoría a la Madre Primeriza
                                </h6>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[11px] text-muted-foreground">
                                  <div className="space-y-2">
                                    <p className="font-bold text-foreground">Preguntas de Valoración Sugeridas:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                      <li><strong>Dolor:</strong> "¿Cómo califica su nivel de dolor al amamantar del 0 al 10?"</li>
                                      <li><strong>Efectividad:</strong> "¿Advierte deglución audible o pausas rítmicas durante la succión?"</li>
                                      <li><strong>Saciedad:</strong> "¿Cómo nota al bebé tras la toma?"</li>
                                      <li><strong>Estado físico:</strong> "¿Siente sus senos firmes, dolorosos o con calor local?"</li>
                                    </ul>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="font-bold text-foreground">Consejos Técnicos:</p>
                                    <ul className="space-y-1">
                                      <li><strong>Agarre amplio:</strong> Nariz/mentón tocando pecho, boca bien abierta.</li>
                                      <li><strong>Libre demanda:</strong> Frecuencia según necesidad del RN.</li>
                                      <li><strong>Cuidado del pezón:</strong> Usar la propia leche tras la toma.</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Técnicas de Lactancia */}
                              <div className="p-4 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/20 rounded-xl">
                                <h6 className="font-bold text-sm mb-2 text-pink-700 dark:text-pink-400">Técnicas, Agarre y Problemas Frecuentes</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Posiciones:</p>
                                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                                      <li>Cuna Clásica</li>
                                      <li>Fútbol Americano</li>
                                      <li>Acostada</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Buen Agarre:</p>
                                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                                      <li>Boca amplia</li>
                                      <li>Labios evertidos</li>
                                      <li>Deglución audible</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Problemas:</p>
                                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                                      <li>Ingurgitación</li>
                                      <li>Grietas</li>
                                      <li>Mastitis</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Extracción y Conservación */}
                              <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 rounded-xl">
                                <h6 className="font-bold text-sm mb-4 text-orange-700 dark:text-orange-400 flex items-center">
                                  <Droplet size={18} className="mr-2" /> 
                                  Extracción, Conservación y Bancos de Leche
                                </h6>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-3 font-medium text-[10px] text-muted-foreground">
                                    <p><strong>Extracción:</strong> Manual (Técnica Marmet) o Eléctrica (extractores esterilizados).</p>
                                    <p><strong>Envases:</strong> Vidrio o polipropileno etiquetado con fecha/hora.</p>
                                    <p><strong>Bancos:</strong> Para prematuros o patologías (ej. enterocolitis).</p>
                                    <div className="mt-2 bg-orange-500/10 p-2 rounded text-[9px]">
                                      <strong>Conservación:</strong> Ambiente (4-6h), Refrigerador (3-5d), Congelador (3-6m).
                                    </div>
                                  </div>
                                  <div className="bg-background rounded-lg p-2 border border-orange-200 dark:border-orange-800/30 text-[9px]">
                                    <p className="font-bold mb-1">Nota:</p> Descongelar en Baño María tibio. <strong>Nunca hervir ni microondas.</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex items-center space-x-3 text-primary">
                              <Clipboard size={24} />
                              <h4 className="text-xl font-bold">Escalas de Valoración Neonatal</h4>
                            </div>

                            <div className="space-y-6">
                              {/* Detailed Scale Tables */}
                              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl">
                                <h6 className="font-bold text-sm mb-4 text-blue-700 dark:text-blue-400 flex items-center">
                                  <Calculator size={18} className="mr-2" /> 
                                  Escalas de Evaluación (Inmediata y Dificultad)
                                </h6>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* APGAR */}
                                  <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-blue-600">Test de APGAR</p>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-[9px] border-collapse bg-background/50 rounded-lg overflow-hidden">
                                        <thead><tr className="bg-blue-600 text-white"><th className="p-1 border border-blue-700/20">Signo</th><th className="p-1 border border-blue-700/20">0</th><th className="p-1 border border-blue-700/20">1</th><th className="p-1 border border-blue-700/20">2</th></tr></thead>
                                        <tbody>
                                          <tr><td className="p-1 border border-border font-bold">F.C.</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">&lt;100</td><td className="p-1 border border-border text-center">&gt;100</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Respiración</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">Irreg.</td><td className="p-1 border border-border text-center">Llanto</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Tono</td><td className="p-1 border border-border text-center">Flácido</td><td className="p-1 border border-border text-center">Ligera Flex</td><td className="p-1 border border-border text-center">Activo</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Reflejos</td><td className="p-1 border border-border text-center">Sin Resp.</td><td className="p-1 border border-border text-center">Mueca</td><td className="p-1 border border-border text-center">Estornudo</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Color</td><td className="p-1 border border-border text-center">Palidez</td><td className="p-1 border border-border text-center">Acrocianosis</td><td className="p-1 border border-border text-center">Rosado</td></tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {/* Silverman */}
                                  <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-red-600">Test de Silverman-Andersen</p>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-[9px] border-collapse bg-background/50 rounded-lg overflow-hidden">
                                        <thead><tr className="bg-red-600 text-white"><th className="p-1 border border-red-700/20">Signo</th><th className="p-1 border border-red-700/20">0</th><th className="p-1 border border-red-700/20">1</th><th className="p-1 border border-red-700/20">2</th></tr></thead>
                                        <tbody>
                                          <tr><td className="p-1 border border-border font-bold">Tórax/Abd</td><td className="p-1 border border-border text-center">Sinc.</td><td className="p-1 border border-border text-center">Retraso insp.</td><td className="p-1 border border-border text-center">Disoc.</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Tiraje IC</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">Leve</td><td className="p-1 border border-border text-center">Marcada</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Retrac Xifo.</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">Leve</td><td className="p-1 border border-border text-center">Marcada</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Aleteo Nasal</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">Leve</td><td className="p-1 border border-border text-center">Marcada</td></tr>
                                          <tr><td className="p-1 border border-border font-bold">Quejido esp.</td><td className="p-1 border border-border text-center">Ausente</td><td className="p-1 border border-border text-center">Audible est.</td><td className="p-1 border border-border text-center">Audible dist.</td></tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Capurro / Usher Detailed */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="p-4 bg-accent/5 rounded-2xl border border-border/50 space-y-4">
                                  <h6 className="font-bold text-sm text-primary flex items-center border-b border-border/50 pb-2">
                                    <Calculator size={16} className="mr-2" />
                                    Cálculo de Edad Gestacional (Capurro B)
                                  </h6>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-[9px] border-collapse bg-white dark:bg-card">
                                      <thead>
                                        <tr className="bg-primary/10 text-primary">
                                          <th className="p-1.5 border border-border">Signo Físico</th>
                                          <th className="p-1.5 border border-border">0 ptos</th>
                                          <th className="p-1.5 border border-border">8 ptos</th>
                                          <th className="p-1.5 border border-border">16 ptos</th>
                                          <th className="p-1.5 border border-border">24 ptos</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="p-1.5 border border-border font-bold">Pezón</td>
                                          <td className="p-1.5 border border-border">Apenas visible</td>
                                          <td className="p-1.5 border border-border">Diám {'<'} 7.5mm</td>
                                          <td className="p-1.5 border border-border">Diám {'>'} 7.5mm</td>
                                          <td className="p-1.5 border border-border">Punteada, borde levantado</td>
                                        </tr>
                                        <tr>
                                          <td className="p-1.5 border border-border font-bold">Piel</td>
                                          <td className="p-1.5 border border-border">Muy fina, gelatina</td>
                                          <td className="p-1.5 border border-border">Lisada, fina</td>
                                          <td className="p-1.5 border border-border">Gruesa, grietas sup.</td>
                                          <td className="p-1.5 border border-border">Pergaminada, grietas prof.</td>
                                        </tr>
                                        <tr>
                                          <td className="p-1.5 border border-border font-bold">Oreja</td>
                                          <td className="p-1.5 border border-border">Aplanada</td>
                                          <td className="p-1.5 border border-border">Borde sup. incurvado</td>
                                          <td className="p-1.5 border border-border">Toda la parte sup. incurvada</td>
                                          <td className="p-1.5 border border-border">Borde totalmente incurvado</td>
                                        </tr>
                                        <tr>
                                          <td className="p-1.5 border border-border font-bold">Glánd. Mamaria</td>
                                          <td className="p-1.5 border border-border">No palpable</td>
                                          <td className="p-1.5 border border-border">{'<'} 5mm</td>
                                          <td className="p-1.5 border border-border">5-10mm</td>
                                          <td className="p-1.5 border border-border">{'>'} 10mm</td>
                                        </tr>
                                        <tr>
                                          <td className="p-1.5 border border-border font-bold">Pliegues Plant.</td>
                                          <td className="p-1.5 border border-border">Sin pliegues</td>
                                          <td className="p-1.5 border border-border">Mal definidos (1/3 ant)</td>
                                          <td className="p-1.5 border border-border">Surcos en mitad anterior</td>
                                          <td className="p-1.5 border border-border">Surcos en toda la planta</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="p-2.5 bg-primary/10 rounded-xl text-center">
                                    <p className="text-[11px] font-black text-primary uppercase">Fórmula: (Puntaje total + 204) / 7 = Semanas</p>
                                  </div>
                                </div>

                                <div className="p-4 bg-accent/5 rounded-2xl border border-border/50 space-y-4">
                                  <h6 className="font-bold text-sm text-primary flex items-center border-b border-border/50 pb-2">
                                    <Calculator size={16} className="mr-2" />
                                    Criterios de Usher (Evaluación Somática)
                                  </h6>
                                  <div className="space-y-2 text-[10px] text-muted-foreground">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="p-2 bg-white dark:bg-card border border-border rounded-lg">
                                        <p className="font-bold text-primary border-b border-border mb-1 uppercase text-[9px]">Pliegues Plantares</p>
                                        <p><strong>{'<'} 36s:</strong> 1 o 2 en 1/3 ant.</p>
                                        <p><strong>36-38s:</strong> En 2/3 ant.</p>
                                        <p><strong>{'>'} 39s:</strong> En toda la planta.</p>
                                      </div>
                                      <div className="p-2 bg-white dark:bg-card border border-border rounded-lg">
                                        <p className="font-bold text-primary border-b border-border mb-1 uppercase text-[9px]">Pabellón Auricular</p>
                                        <p><strong>{'<'} 36s:</strong> Blando, no se endereza.</p>
                                        <p><strong>37-38s:</strong> Enderezamiento lento.</p>
                                        <p><strong>{'>'} 39s:</strong> Rígido, enderezamiento instantáneo.</p>
                                      </div>
                                      <div className="p-2 bg-white dark:bg-card border border-border rounded-lg">
                                        <p className="font-bold text-primary border-b border-border mb-1 uppercase text-[9px]">Pelo</p>
                                        <p><strong>{'<'} 36s:</strong> Fino, aglutinado, difícil separar.</p>
                                        <p><strong>{'>'} 37s:</strong> Grueso, individualizable.</p>
                                      </div>
                                      <div className="p-2 bg-white dark:bg-card border border-border rounded-lg">
                                        <p className="font-bold text-primary border-b border-border mb-1 uppercase text-[9px]">Nódulo Mamario</p>
                                        <p><strong>{'<'} 36s:</strong> No palpable.</p>
                                        <p><strong>37-38s:</strong> 4 - 7 mm.</p>
                                        <p><strong>{'>'} 39s:</strong> 7 - 10 mm.</p>
                                      </div>
                                    </div>
                                    <div className="p-2 bg-white dark:bg-card border border-border rounded-lg">
                                      <p className="font-bold text-primary border-b border-border mb-1 uppercase text-[9px]">Genitales</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <p className="font-bold text-[8px] text-muted-foreground">Masculinos:</p>
                                          <p><strong>{'<'} 36s:</strong> Escroto liso, testículos altos.</p>
                                          <p><strong>{'>'} 39s:</strong> Escroto rugoso, testículos descendidos.</p>
                                        </div>
                                        <div>
                                          <p className="font-bold text-[8px] text-muted-foreground">Femeninos:</p>
                                          <p><strong>{'<'} 36s:</strong> Labios mayores no cubren menores.</p>
                                          <p><strong>{'>'} 39s:</strong> Labios mayores cubren menores.</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    )}

                    {selectedService === 'Gineco-Obstetricia' && ginecoSubTab === 'salud_sexual' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-3 text-primary">
                            <HeartPulse size={24} />
                            <h4 className="text-xl font-bold">Salud Sexual y Reproductiva</h4>
                          </div>
                          <div className="flex bg-muted/50 p-1 rounded-lg overflow-x-auto no-scrollbar">
                            {[
                              { id: 'anticoncepcion', label: 'Anticoncepción', icon: Shield },
                              { id: 'its', label: 'ITS / Embarazo', icon: TestTube },
                              { id: 'citologia', label: 'Citología', icon: ClipboardList },
                              { id: 'pep', label: 'PPE (Kit Púrpura)', icon: ShieldAlert },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setSelectedSaludSexualTopic(tab.id)}
                                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                                  selectedSaludSexualTopic === tab.id || (!selectedSaludSexualTopic && tab.id === 'anticoncepcion')
                                    ? 'bg-background shadow-sm text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                <tab.icon size={14} className="mr-1.5" />
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          {/* 1. Anticoncepción */}
                          {(selectedSaludSexualTopic === 'anticoncepcion' || !selectedSaludSexualTopic) && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                                <Shield size={20} className="mr-2 text-primary" /> 
                                Anticoncepción y Planificación Familiar
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-accent/20 p-5 rounded-2xl space-y-4">
                                  <h6 className="font-bold text-sm text-primary flex items-center">
                                    <Calculator size={16} className="mr-2" /> Criterios Médicos de Elegibilidad (OMS)
                                  </h6>
                                  <div className="space-y-2">
                                    <div className="flex gap-3 p-2 bg-green-500/5 rounded-lg border border-green-500/10">
                                      <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm h-fit">CAT 1</span>
                                      <p className="text-[11px] leading-tight text-muted-foreground"><strong>Sin restricciones.</strong> Uso en cualquier circunstancia clínica.</p>
                                    </div>
                                    <div className="flex gap-3 p-2 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                                      <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm h-fit">CAT 2</span>
                                      <p className="text-[11px] leading-tight text-muted-foreground"><strong>Ventajas {'>'} Riesgos.</strong> Generalmente se usa tras asesoría.</p>
                                    </div>
                                    <div className="flex gap-3 p-2 bg-orange-500/5 rounded-lg border border-orange-500/10">
                                      <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm h-fit">CAT 3</span>
                                      <p className="text-[11px] leading-tight text-muted-foreground"><strong>Riesgos {'>'} Ventajas.</strong> Uso no recomendado salvo no haya otra opción.</p>
                                    </div>
                                    <div className="flex gap-3 p-2 bg-red-500/5 rounded-lg border border-red-500/10">
                                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm h-fit">CAT 4</span>
                                      <p className="text-[11px] leading-tight text-muted-foreground"><strong>Riesgo inaceptable.</strong> Representa un peligro para la salud.</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-accent/20 p-5 rounded-2xl space-y-4">
                                  <h6 className="font-bold text-sm text-primary">Mecánica y Aplicación Clínica</h6>
                                  <div className="space-y-3">
                                    <div className="text-[11px] text-muted-foreground border-b border-border pb-2">
                                      <p className="font-bold text-primary mb-1">Hormonales Combinados (ACOC, Inyectable mensual):</p>
                                      <p>Inhiben FSH/LH, impiden ovulación. Contraindicados en fumadoras {'>'}35a, HTA severa, migraña con aura.</p>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground border-b border-border pb-2">
                                      <p className="font-bold text-primary mb-1">Sólo Progestina (Implante, Mini-píldora, Trimestral):</p>
                                      <p>Espesan moco cervical. Ideales en lactancia y riesgo CV. Efecto secundario común: Spotting.</p>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                      <p className="font-bold text-primary mb-1">DIU de Cobre / SIU-Levonorgestrel (DIU Hormonal):</p>
                                      <p>El SIU reduce el sangrado menstrual (ideal en anemia/miomas). Efectividad {'>'}99% (LARC).</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 border border-primary/20 bg-primary/5 rounded-2xl">
                                <h6 className="font-bold text-sm text-primary mb-2 text-center">Anticoncepción de Emergencia (AE)</h6>
                                <p className="text-xs text-muted-foreground mb-3 leading-relaxed text-center">
                                  No es abortiva. Actúa retrasando la ovulación. No tiene efecto si la fecundación ya ocurrió.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                                  <div className="bg-background/50 p-2 rounded-lg border border-border">
                                    <p className="font-bold text-primary">Levonorgestrel (LNG)</p>
                                    <p>1.5 mg dosis única. Ideal en primeras 72h. Disponible sin receta.</p>
                                  </div>
                                  <div className="bg-background/50 p-2 rounded-lg border border-border">
                                    <p className="font-bold text-primary"> Acetato de Ulipristal</p>
                                    <p>30 mg dosis única. Eficaz hasta 120h (5 días). Más potente cerca de ovulación.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. ITS */}
                          {selectedSaludSexualTopic === 'its' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                                <TestTube size={20} className="mr-2 text-blue-500" /> 
                                ITS y Prevención de Transmisión Vertical
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-border p-4 rounded-xl space-y-4">
                                  <h6 className="font-bold text-sm text-primary">Manejo de Sífilis Gestacional</h6>
                                  <div className="space-y-2 text-xs text-muted-foreground">
                                    <p><strong>Diagnóstico:</strong> Prueba rápida treponémica (PRT) reactiva = Tratamiento inmediato. Solicitar VDRL/RPR para seguimiento.</p>
                                    <div className="p-2 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-lg">
                                      <p className="font-bold text-blue-700">Esquema Penicilina Benzatínica (2.4M UI):</p>
                                      <ul className="space-y-1 mt-1">
                                        <li><strong>Esquema Completo:</strong> 3 dosis (una cada 7 días).</li>
                                        <li><strong>Contacto Estrecho:</strong> 1 dosis (tratamiento preventivo).</li>
                                      </ul>
                                    </div>
                                    <p className="p-2 bg-red-500/10 text-red-700 rounded-lg font-bold text-[10px]">
                                       Tratamiento Adecuado: Terminado ≥30 días antes del parto para prevenir Sífilis Congénita.
                                    </p>
                                  </div>
                                </div>
                                <div className="border border-border p-4 rounded-xl space-y-4">
                                  <h6 className="font-bold text-sm text-primary">Prevención Vertical VIH</h6>
                                  <div className="space-y-2 text-xs text-muted-foreground">
                                    <p><strong>Tamizaje:</strong> Prueba rápida universal en 1er, 2do y 3er trimestre. Prueba rápida en sala de partos si no hay previas.</p>
                                    <div className="p-2 bg-red-500/5 border-l-4 border-red-500 rounded-r-lg">
                                      <p className="font-bold text-red-700">Protocolo de Intervención:</p>
                                      <ul className="list-disc list-inside space-y-1">
                                        <li>TARV inmediato (TDF/3TC/DTG).</li>
                                        <li>Carga Viral en semana 34 (decide vía de parto).</li>
                                        <li>Zidovudina (AZT) IV en el parto si CV {'>'} 50 copias.</li>
                                        <li>Suspensión absoluta de lactancia materna.</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Citología */}
                          {selectedSaludSexualTopic === 'citologia' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                                <ClipboardList size={20} className="mr-2 text-orange-500" /> 
                                Citología Cervical y Tamizaje de CaCu
                              </h5>
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1 space-y-4">
                                  <div className="bg-accent/10 p-4 rounded-xl">
                                    <h6 className="font-bold text-xs text-primary mb-3 uppercase tracking-tighter">Esquema de Tamizaje (MSP)</h6>
                                    <div className="space-y-3">
                                      <div className="flex gap-2 text-[11px]">
                                        <div className="bg-primary/20 p-1.5 rounded-lg text-primary h-fit"><Search size={14} /></div>
                                        <div>
                                          <p className="font-bold">Inicio:</p>
                                          <p className="text-muted-foreground">A partir de los 21 años o 3 años tras inicio de vida sexual.</p>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 text-[11px]">
                                        <div className="bg-primary/20 p-1.5 rounded-lg text-primary h-fit"><Clock size={14} /></div>
                                        <div>
                                          <p className="font-bold">Frecuencia:</p>
                                          <p className="text-muted-foreground">Anual por 2 años. Si negativos, cada 3 años (Pap) o cada 5 años (VPH).</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="lg:col-span-2 bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
                                  <table className="w-full text-[10px] border-collapse">
                                    <thead>
                                      <tr className="bg-primary text-primary-foreground font-bold">
                                        <th className="p-3 text-left border-b border-border/10">Reporte Bethesda</th>
                                        <th className="p-3 text-left border-b border-border/10">Conducta Sugerida</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="hover:bg-accent/5 transition-colors">
                                        <td className="p-2.5 border-b border-border font-bold">ASC-US / LSIL</td>
                                        <td className="p-2.5 border-b border-border text-muted-foreground">Repetir citología en 6-12 meses o Prueba VPH. Si VPH+, Colposcopia.</td>
                                      </tr>
                                      <tr className="hover:bg-accent/5 transition-colors">
                                        <td className="p-2.5 border-b border-border font-bold">ASC-H / HSIL</td>
                                        <td className="p-2.5 border-b border-border text-muted-foreground">Referencia prioritaria a Colposcopia / Biopsia.</td>
                                      </tr>
                                      <tr className="bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                        <td className="p-2.5 border-b border-border font-black text-red-600 italic">Cáncer Invasor</td>
                                        <td className="p-2.5 border-b border-border text-red-700 font-medium">Referencia Urgente a Oncología - Nivel III.</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 4. PEP (Kit Púrpura) */}
                          {selectedSaludSexualTopic === 'pep' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <h5 className="font-bold text-lg flex items-center border-b border-border pb-2">
                                <ShieldAlert size={20} className="mr-2 text-purple-500" /> 
                                Profilaxis Post-Exposición (PPE) - Kit Púrpura
                              </h5>
                              <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-2xl space-y-5">
                                <div className="flex items-center gap-4 p-3 bg-purple-500/10 rounded-xl border-l-4 border-purple-500">
                                  <Clock size={28} className="text-purple-600 shrink-0" />
                                  <div>
                                    <p className="font-bold text-purple-700">Ventana Crítica de Inicio</p>
                                    <p className="text-sm text-muted-foreground font-medium">Ideal: {"<"} 2h. Máximo: 72h. Después de las 72h no hay beneficio profiláctico.</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h6 className="font-bold text-sm text-primary border-b border-border pb-1">Manejo Farmacológico (Combo)</h6>
                                    <div className="space-y-3">
                                      <div className="p-3 bg-white dark:bg-card border border-border rounded-xl">
                                        <p className="font-bold text-xs text-red-600 mb-1 tracking-wider uppercase">Profilaxis VIH</p>
                                        <p className="text-[11px] text-muted-foreground">TDF/3TC/DTG (Tenofovir/Lamivudina/Dolutegravir) 1 tableta diaria por 28 días.</p>
                                      </div>
                                      <div className="p-3 bg-white dark:bg-card border border-border rounded-xl">
                                        <p className="font-bold text-xs text-blue-600 mb-1 tracking-wider uppercase">Otras ITS</p>
                                        <p className="text-[11px] text-muted-foreground">Ceftriaxona 250mg IM (Única) + Azitromicina 1g VO (Única) + Metronidazol 2g VO (Única).</p>
                                      </div>
                                      <div className="p-3 bg-white dark:bg-card border border-border rounded-xl">
                                        <p className="font-bold text-xs text-orange-600 mb-1 tracking-wider uppercase">Otros</p>
                                        <p className="text-[11px] text-muted-foreground">Hepatitis B (vacuna), Toxoide Tetánico y Anticoncepción de Emergencia.</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h6 className="font-bold text-sm text-primary border-b border-border pb-1">Evaluación de Adherencia (SMAQ)</h6>
                                    <div className="bg-background/80 p-4 border border-border rounded-2xl">
                                      <ul className="text-[10px] space-y-1.5 text-muted-foreground list-decimal list-inside">
                                        <li>¿Se ha olvidado alguna vez de tomar su medicina?</li>
                                        <li>¿Se descuida a veces de tomarlas?</li>
                                        <li>¿Si se siente mal, deja de tomarlas?</li>
                                        <li>¿Ha dejado de tomarlas algún fin de semana?</li>
                                        <li className="font-bold text-red-500">¿Faltó a alguna dosis la última semana?</li>
                                      </ul>
                                      <p className="mt-4 text-[9px] italic text-muted-foreground border-t border-border pt-2">
                                        Cualquier "SÍ" o "Semana con fallas" indica adherencia inadecuada. 
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}

                    {/* MEDICINA INTERNA SUBTABS */}
                    {selectedService === 'Medicina Interna' && internaSubTab === 'escalas' && !selectedDisease && (
                      <div className="space-y-6">
                        <Card className="p-6">
                          <div className="flex items-center space-x-3 text-primary mb-6">
                            <Calculator size={28} className="animate-pulse" />
                            <h4 className="text-2xl font-black tracking-tight tracking-tighter">
                              {selectedScaleId 
                                ? `Escala: ${MEDICAL_SCORES.find(s => s.id === selectedScaleId)?.name}` 
                                : 'Calculadoras y Scores Clínicos'}
                            </h4>
                          </div>

                          <div className="-mx-2 sm:mx-0">
                            <MedicalScores 
                               activeScoreId={selectedScaleId} 
                               onScoreChange={setSelectedScaleId}
                               hideGrid={!!selectedScaleId}
                            />
                          </div>
                          
                          {!selectedScaleId && (
                             <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-1 px-3 bg-primary/10 border border-primary/20 rounded-full w-fit">
                                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">Información Complementaria</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                      <h5 className="font-bold text-lg flex items-center gap-2">
                                         <Brain size={20} className="text-primary" />
                                         Importancia de las Escalas
                                      </h5>
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                         Las escalas de valoración clínica permiten objetivar hallazgos subjetivos, estandarizar el lenguaje médico y facilitar la toma de decisiones clínicas basadas en evidencia.
                                      </p>
                                      <ul className="space-y-2">
                                         <li className="flex items-center gap-2 text-xs text-muted-foreground italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Reducción de variabilidad inter-observador.
                                         </li>
                                         <li className="flex items-center gap-2 text-xs text-muted-foreground italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Estratificación precisa del riesgo de mortalidad y complicaciones.
                                         </li>
                                      </ul>
                                   </div>
                                   <div className="bg-accent/30 p-6 rounded-3xl border border-border/50">
                                      <h5 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-4">Cálculos Manuales Comunes</h5>
                                      <div className="space-y-4">
                                         <div className="border-b border-border/50 pb-4">
                                            <p className="text-xs font-bold text-foreground">Cockcroft-Gault (TFG)</p>
                                            <code className="text-[10px] block mt-1 text-primary">((140-edad) × peso) / (72 × CrS) [× 0.85 si mujer]</code>
                                         </div>
                                         <div>
                                            <p className="text-xs font-bold text-foreground">Déficit de Agua Libre</p>
                                            <code className="text-[10px] block mt-1 text-primary">0.6 × Peso × ((Na actual / 140) - 1)</code>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          )}
                        </Card>
                      </div>
                    )}

                    {selectedService === 'Medicina Interna' && internaSubTab === 'protocolos' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Clipboard size={24} />
                          <h4 className="text-xl font-bold">
                            {selectedProtocolId ? CLINICAL_PROTOCOLS.find(p => p.id === selectedProtocolId)?.title : 'Protocolos y Esquemas de Manejo'}
                          </h4>
                        </div>
                        
                        {!selectedProtocolId ? (
                          <div className="space-y-8 animate-in fade-in duration-500">
                             {/* Quick Reference Schemes */}
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="border border-primary/20 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group" onClick={() => setSelectedProtocolId('quick_insulin')}>
                                   <div className="flex items-center justify-between mb-3">
                                      <Activity size={20} className="text-primary" />
                                      <ChevronRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
                                   </div>
                                   <h5 className="font-bold text-sm mb-1 text-primary">Esquemas de Insulina</h5>
                                   <p className="text-[10px] text-muted-foreground">Corrección rápida y transición a esquema basal-bolo.</p>
                                </div>
                                <div className="border border-orange-500/20 p-4 rounded-2xl bg-orange-500/5 hover:bg-orange-500/10 transition-colors cursor-pointer group" onClick={() => setSelectedProtocolId('quick_electrolytes')}>
                                   <div className="flex items-center justify-between mb-3">
                                      <Droplet size={20} className="text-orange-500" />
                                      <ChevronRight size={16} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                                   </div>
                                   <h5 className="font-bold text-sm mb-1 text-orange-600">Reposición de Electrolitos</h5>
                                   <p className="text-[10px] text-muted-foreground">Déficit de Sodio (Na) y reglas de oro del Potasio (K).</p>
                                </div>
                                <div className="border border-red-500/20 p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer group" onClick={() => setSelectedProtocolId('quick_anticoagulation')}>
                                   <div className="flex items-center justify-between mb-3">
                                      <Shield size={20} className="text-red-500" />
                                      <ChevronRight size={16} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
                                   </div>
                                   <h5 className="font-bold text-sm mb-1 text-red-600">Anticoagulación</h5>
                                   <p className="text-[10px] text-muted-foreground">Profilaxis y terapia con Enoxaparina / Ajuste renal.</p>
                                </div>
                             </div>

                             <div className="pt-6 border-t border-border">
                               <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Protocolos Avanzados de Medicina Interna</h4>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {CLINICAL_PROTOCOLS.map(protocol => (
                                    <div 
                                      key={protocol.id} 
                                      onClick={() => setSelectedProtocolId(protocol.id)}
                                      className="p-4 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all cursor-pointer group shadow-sm"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{protocol.category}</span>
                                        <ArrowUpDown size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                      </div>
                                      <h5 className="font-bold text-sm group-hover:text-primary transition-colors">{protocol.title}</h5>
                                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{protocol.description}</p>
                                    </div>
                                  ))}
                               </div>
                             </div>
                          </div>
                        ) : selectedProtocolId === 'quick_insulin' ? (
                          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                             <div className="bg-primary/5 p-6 rounded-3xl border border-primary/20">
                                <h5 className="font-bold text-primary mb-4 flex items-center"><Activity size={20} className="mr-2"/> Esquema Móvil (Insulina Rápida/Regular)</h5>
                                <div className="overflow-hidden rounded-xl border border-primary/10 bg-white">
                                   <table className="w-full text-sm text-left border-collapse">
                                     <thead><tr className="bg-primary text-white">
                                       <th className="p-3">Glucemia (mg/dL)</th>
                                       <th className="p-3 text-center">Unidades a administrar (UI)</th>
                                     </tr></thead>
                                     <tbody className="divide-y divide-primary/10">
                                       <tr className="hover:bg-primary/5 transition-colors"><td className="p-3 font-medium">150 - 200</td><td className="p-3 text-center">2 UI SC</td></tr>
                                       <tr className="hover:bg-primary/5 transition-colors"><td className="p-3 font-medium">201 - 250</td><td className="p-3 text-center">4 UI SC</td></tr>
                                       <tr className="hover:bg-primary/5 transition-colors"><td className="p-3 font-medium">251 - 300</td><td className="p-3 text-center">6 UI SC</td></tr>
                                       <tr className="bg-red-50 hover:bg-red-100 transition-colors"><td className="p-3 font-bold text-red-600">{'>'} 300</td><td className="p-3 text-center font-bold text-red-600">8 UI + Notificar Médico</td></tr>
                                     </tbody>
                                   </table>
                                </div>
                                <div className="mt-8 pt-6 border-t border-primary/10">
                                   <h5 className="font-bold text-primary mb-3">Transición a Basal-Bolo (Mantenimiento)</h5>
                                   <div className="bg-white p-4 rounded-2xl border border-primary/10 text-sm space-y-3">
                                      <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> <strong>Dosis Total Diaria (DTD):</strong> 0.3 - 0.5 UI/kg/día según fragilidad del paciente.</p>
                                      <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> <strong>Distribución 50/50:</strong> 50% Basal (NPH o Glargina) y 50% Corriente (Bolo preprandial).</p>
                                      <p className="text-[11px] text-muted-foreground italic pl-4">Nota: En pacientes ancianos o con TFG {'<'}30 ml/min, iniciar con 0.2 - 0.3 UI/kg/día para evitar hipoglucemia.</p>
                                   </div>
                                </div>
                             </div>
                             <button onClick={() => setSelectedProtocolId(null)} className="text-xs text-primary font-bold hover:underline flex items-center gap-1"><ChevronLeft size={14}/> Volver a Protocolos</button>
                          </div>
                        ) : selectedProtocolId === 'quick_electrolytes' ? (
                          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                             <div className="bg-orange-500/5 p-6 rounded-3xl border border-orange-500/20">
                                <h5 className="font-bold text-orange-600 mb-6 flex items-center"><Droplet size={20} className="mr-2"/> Corrección de Hiponatremia e Hipopotasemia</h5>
                                <div className="space-y-6">
                                   <div className="bg-white p-4 rounded-2xl border border-orange-200">
                                      <h6 className="font-bold text-xs uppercase tracking-widest text-orange-700 mb-3">Déficit de Sodio (Na+)</h6>
                                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-3">
                                         <p className="text-sm font-mono text-center font-bold">mEq Na = 0.6* x Peso(kg) x (Na deseado - Na actual)</p>
                                         <p className="text-[10px] text-center text-muted-foreground mt-1">* 0.5 en mujeres / 0.6 en hombres</p>
                                      </div>
                                      <p className="text-xs text-muted-foreground leading-relaxed">
                                         <strong>Regla de Oro:</strong> No corregir más de <strong>8-10 mEq/L en 24 horas</strong>. Una corrección rápida puede causar el <strong>Síndrome de Desmielinización Osmótica</strong> (Mielinólisis Pontina).
                                      </p>
                                   </div>

                                   <div className="bg-white p-4 rounded-2xl border border-orange-200">
                                      <h6 className="font-bold text-xs uppercase tracking-widest text-orange-700 mb-3">Reposición de Potasio (K+)</h6>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                                            <p className="font-bold text-xs text-orange-800 mb-1">Vía Periférica</p>
                                            <p className="text-[11px] text-muted-foreground">Concentración máx: 40 mEq/L.<br/>Velocidad máx: 10 mEq/hora.</p>
                                         </div>
                                         <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                            <p className="font-bold text-xs text-red-800 mb-1">Vía Central</p>
                                            <p className="text-[11px] text-muted-foreground">Velocidad máx: 20 mEq/hora.<br/>Requiere MONITOREO EKG continuo.</p>
                                         </div>
                                      </div>
                                      <p className="text-[11px] text-red-600 font-bold mt-4 flex items-center gap-1"><AlertTriangle size={12}/> PROHIBIDO: Nunca administrar K+ en bolo directo o sin diluir.</p>
                                   </div>
                                </div>
                             </div>
                             <button onClick={() => setSelectedProtocolId(null)} className="text-xs text-primary font-bold hover:underline flex items-center gap-1"><ChevronLeft size={14}/> Volver a Protocolos</button>
                          </div>
                        ) : selectedProtocolId === 'quick_anticoagulation' ? (
                          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                             <div className="bg-red-500/5 p-6 rounded-3xl border border-red-500/20">
                                <h5 className="font-bold text-red-600 mb-6 flex items-center"><Shield size={20} className="mr-2"/> Guía de Anticoagulación con Enoxaparina</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 -mr-8 -mt-8 rounded-full"></div>
                                      <h6 className="font-black text-[10px] text-blue-600 uppercase mb-4 tracking-tighter">Profilaxis (Prevención TVP)</h6>
                                      <div className="space-y-4">
                                         <div>
                                            <p className="text-sm font-bold">40 mg SC cada 24 horas</p>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Dosis Estándar Adulto</p>
                                         </div>
                                         <div className="pt-4 border-t border-dashed border-border">
                                            <p className="text-xs font-bold text-orange-600">Ajuste Renal (ClCr {'<'} 30 ml/min):</p>
                                            <p className="text-sm font-black text-orange-700">20 mg SC cada 24 horas</p>
                                         </div>
                                      </div>
                                   </div>

                                   <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 -mr-8 -mt-8 rounded-full"></div>
                                      <h6 className="font-black text-[10px] text-red-600 uppercase mb-4 tracking-tighter">Terapéutica (TEP / SCA)</h6>
                                      <div className="space-y-4">
                                         <div>
                                            <p className="text-sm font-bold">1 mg/kg SC cada 12 horas</p>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Dosis de Plena de Anticoagulación</p>
                                         </div>
                                         <div className="pt-4 border-t border-dashed border-border">
                                            <p className="text-xs font-bold text-orange-600">Ajuste Renal (ClCr {'<'} 30 ml/min):</p>
                                            <p className="text-sm font-black text-orange-700">1 mg/kg SC cada 24 horas</p>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <div className="mt-6 bg-red-600/10 p-4 rounded-xl text-xs text-red-800">
                                   <strong>Cuidado:</strong> En mayores de 75 años con SCACEST y fibrinólisis, no administrar el bolo inicial IV de 30 mg y reducir la dosis subcutánea (0.75 mg/kg c/12h).
                                </div>
                             </div>
                             <button onClick={() => setSelectedProtocolId(null)} className="text-xs text-primary font-bold hover:underline flex items-center gap-1"><ChevronLeft size={14}/> Volver a Protocolos</button>
                          </div>
                        ) : (
                          <div className="animate-in fade-in zoom-in-95 duration-500">
                             {CLINICAL_PROTOCOLS.filter(p => p.id === selectedProtocolId).map(protocol => (
                               <div key={protocol.id} className="space-y-6">
                                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex justify-between items-center">
                                     <div className="text-xs font-bold text-primary uppercase tracking-widest">{protocol.category}</div>
                                     <button onClick={() => setSelectedProtocolId(null)} className="text-[10px] bg-white border border-border px-3 py-1 rounded-full hover:bg-accent transition-colors">Cerrar Protocolo</button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-6">
                                        <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-3xl">
                                           <h6 className="font-bold text-sm mb-4 flex items-center text-orange-600"><AlertTriangle size={18} className="mr-2"/> Criterios de Activación</h6>
                                           <ul className="space-y-3">
                                             {protocol.activationCriteria.map((crit, idx) => (
                                               <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></span>
                                                  <span className="leading-snug">{crit}</span>
                                               </li>
                                             ))}
                                           </ul>
                                        </div>

                                        <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-3xl">
                                           <h6 className="font-bold text-sm mb-4 flex items-center text-green-700"><Activity size={18} className="mr-2"/> Metas de Resucitación</h6>
                                           <ul className="space-y-3">
                                             {protocol.resuscitationGoals.map((goal, idx) => (
                                               <li key={idx} className="flex items-start gap-3 text-sm text-green-800">
                                                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                                                  <span className="leading-snug font-medium">{goal}</span>
                                               </li>
                                             ))}
                                           </ul>
                                        </div>
                                     </div>

                                     <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl">
                                        <h6 className="font-bold text-sm mb-6 flex items-center text-blue-600"><Clipboard size={18} className="mr-2"/> Algoritmo Paso a Paso</h6>
                                        <div className="space-y-6 relative ml-2">
                                          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-blue-200"></div>
                                          {protocol.algorithm.map((step, idx) => (
                                            <div key={idx} className="relative pl-10">
                                              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black z-10">{idx + 1}</div>
                                              <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm mb-2">
                                                 <p className="font-bold text-xs text-blue-800 uppercase mb-1">{step.step}</p>
                                                 <p className="font-bold text-sm text-foreground mb-2">{step.action}</p>
                                                 <p className="text-xs text-muted-foreground leading-relaxed">{step.details}</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                     </div>
                                  </div>
                                  <button onClick={() => setSelectedProtocolId(null)} className="text-xs text-primary font-bold hover:underline flex items-center gap-1 mt-4"><ChevronLeft size={14}/> Volver al listado principal</button>
                               </div>
                             ))}
                          </div>
                        )}
                      </Card>
                    )}

                        {selectedService === 'Medicina Interna' && internaSubTab === 'visita' && !selectedDisease && (
                          <div className="space-y-6">
                            <Card className="p-6">
                              <div className="flex items-center space-x-3 text-primary mb-6">
                                <FileText size={28} />
                                <h4 className="text-2xl font-black tracking-tight tracking-tighter">
                                  {selectedVisitaTool === 'soap' ? 'Estructura SOAP (Evolución Diaria)' : 
                                   selectedVisitaTool === 'saer' ? 'Herramienta SAER (SBAR)' : 
                                   selectedVisitaTool === 'fasthugs' ? 'FAST HUGS BID (Seguridad)' : 
                                   'Protocolos de Registro Clínico'}
                                </h4>
                              </div>

                              {!selectedVisitaTool ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                   <div 
                                     onClick={() => setSelectedVisitaTool('soap')}
                                     className="group cursor-pointer border-2 border-dashed border-blue-500/30 p-6 bg-blue-500/5 rounded-3xl hover:bg-blue-500/10 hover:border-blue-500 transition-all text-center"
                                   >
                                     <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <FileText size={24} />
                                     </div>
                                     <h5 className="font-bold text-blue-700 mb-2 underline decoration-blue-500/30 underline-offset-4">Nota SOAP</h5>
                                     <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">Evolución clínica diaria estandarizada y lógica.</p>
                                   </div>

                                   <div 
                                     onClick={() => setSelectedVisitaTool('saer')}
                                     className="group cursor-pointer border-2 border-dashed border-red-500/30 p-6 bg-red-500/5 rounded-3xl hover:bg-red-500/10 hover:border-red-500 transition-all text-center"
                                   >
                                      <div className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <AlertTriangle size={24} />
                                     </div>
                                     <h5 className="font-bold text-red-700 mb-2 underline decoration-red-500/30 underline-offset-4">SAER / SBAR</h5>
                                     <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">Comunicación crítica y entrega de turno segura.</p>
                                   </div>
                                   
                                   <div 
                                     onClick={() => setSelectedVisitaTool('fasthugs')}
                                     className="group cursor-pointer border-2 border-dashed border-green-500/30 p-6 bg-green-500/5 rounded-3xl hover:bg-green-500/10 hover:border-green-500 transition-all text-center"
                                   >
                                      <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={24} />
                                     </div>
                                     <h5 className="font-bold text-green-700 mb-2 underline decoration-green-500/30 underline-offset-4">FAST HUGS BID</h5>
                                     <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">Checklist de seguridad para el paciente crítico.</p>
                                   </div>
                                </div>
                              ) : selectedVisitaTool === 'soap' ? (
                                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                   <div className="bg-blue-500/5 border border-blue-200/50 p-8 rounded-[2.5rem] shadow-inner">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                       <div className="space-y-3">
                                          <div className="flex items-center gap-3 text-blue-700 font-black italic">
                                            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/20">S</div>
                                            <span className="tracking-tighter text-lg uppercase font-black">Subjetivo</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-blue-200">Datos referidos por el paciente o familiar. Incluye síntomas, dolor, estado anímico, hitos (ej. pases de gas/heces).</p>
                                          <div className="bg-white/60 p-3 rounded-2xl border border-blue-100 text-[10px] italic font-medium text-blue-900/70">"Paciente refiere mejoría de disnea desde ayer, niega tos productiva. Apetito conservado."</div>
                                       </div>
                                       <div className="space-y-3">
                                          <div className="flex items-center gap-3 text-blue-700 font-black italic">
                                            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/20">O</div>
                                            <span className="tracking-tighter text-lg uppercase font-black">Objetivo</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-blue-200">Datos medibles: Signos vitales, balance hídrico, examen físico sistemático, resultados de laboratorios e imagen.</p>
                                          <div className="bg-white/60 p-3 rounded-2xl border border-blue-100 text-[10px] italic font-medium text-blue-900/70">"TA: 120/80, FC: 78, FR: 18, Spo2: 96% (AA). MV conservado, sin ruidos agregados. WBC: 10k."</div>
                                       </div>
                                       <div className="space-y-3">
                                          <div className="flex items-center gap-3 text-blue-700 font-black italic">
                                            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/20">A</div>
                                            <span className="tracking-tighter text-lg uppercase font-black">Análisis</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-blue-200">Interpretación clínica. Evolución de diagnósticos. Justificar por qué se mantiene o cambia una terapia.</p>
                                          <div className="bg-white/60 p-3 rounded-2xl border border-blue-100 text-[10px] italic font-medium text-blue-900/70">"Pneumonía dcha en resolución. Buena respuesta a Ceftriaxona. Estabilidad hemodinámica."</div>
                                       </div>
                                       <div className="space-y-3">
                                          <div className="flex items-center gap-3 text-blue-700 font-black italic">
                                            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/20">P</div>
                                            <span className="tracking-tighter text-lg uppercase font-black">Plan</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-blue-200">Acciones futuras: Continuar/suspender medicamentos, estudios pendientes, IC o previsión de alta.</p>
                                          <div className="bg-white/60 p-3 rounded-2xl border border-blue-100 text-[10px] italic font-medium text-blue-900/70">"Completar 7 días de ATB. Rx tórax control en 48h. Considerar alta si tolera vía oral."</div>
                                       </div>
                                     </div>
                                   </div>
                                   <button onClick={() => setSelectedVisitaTool(null)} className="text-xs text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                                     <ChevronLeft size={14} /> Volver a Modelos
                                   </button>
                                </div>
                              ) : selectedVisitaTool === 'saer' ? (
                                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                   <div className="bg-red-500/5 border border-red-200/50 p-8 rounded-[2.5rem]">
                                     <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-600/20">
                                           <AlertTriangle size={24} />
                                        </div>
                                        <div>
                                           <h5 className="font-black text-xl text-red-700">Protocolo SAER (SBAR)</h5>
                                           <p className="text-xs text-muted-foreground">Comunicación efectiva para situaciones críticas.</p>
                                        </div>
                                     </div>
                                     <div className="space-y-6">
                                        {[
                                          { letter: 'S', title: 'SITUACIÓN', desc: '¿Qué está pasando ahora?', example: '"Llamo por el paciente X. Presenta dolor torácico agudo de 8/10."' },
                                          { letter: 'A', title: 'ANTECEDENTES', desc: 'Contexto relevante (Background).', example: '"Ingresó ayer por ICC. Diabético, hipertenso. Sin alergias."' },
                                          { letter: 'E', title: 'EVALUACIÓN', desc: 'Tus hallazgos actuales.', example: '"TA 180/100, FC 110, pálido y diaforético. ECG con ST elevado."' },
                                          { letter: 'R', title: 'RECOMENDACIÓN', desc: '¿Qué sugieres o qué necesitas?', example: '"¿Le administro NTG? ¿Viene a evaluarlo? Solicito Troponinas."' }
                                        ].map((item) => (
                                          <div key={item.letter} className="flex gap-6 group">
                                             <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex-shrink-0 flex items-center justify-center font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                                                {item.letter}
                                             </div>
                                             <div className="bg-white/40 flex-1 p-4 rounded-3xl border border-red-100/50">
                                                <h6 className="font-black text-xs text-red-800 tracking-widest">{item.title}</h6>
                                                <p className="text-[11px] text-muted-foreground mt-1 mb-2 font-medium">{item.desc}</p>
                                                <p className="text-[10px] italic text-red-900/60 bg-red-500/5 p-2 rounded-xl">Ex: {item.example}</p>
                                             </div>
                                          </div>
                                        ))}
                                     </div>
                                   </div>
                                   <button onClick={() => setSelectedVisitaTool(null)} className="text-xs text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                                     <ChevronLeft size={14} /> Volver a Modelos
                                   </button>
                                </div>
                              ) : (
                                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                   <div className="bg-green-500/5 border border-green-200/50 p-8 rounded-[3rem]">
                                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                         <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-600 text-white rounded-2xl shadow-xl shadow-green-600/20">
                                               <ShieldCheck size={24} />
                                            </div>
                                            <div>
                                               <h5 className="font-black text-xl text-green-800">FAST HUGS BID</h5>
                                               <p className="text-xs text-muted-foreground italic">Checklist de seguridad de pase de visita en UCI/Piso.</p>
                                            </div>
                                         </div>
                                         <div className="px-4 py-2 bg-green-100 rounded-full text-[10px] font-black text-green-800 tracking-widest uppercase">
                                            Mnemotecnia Crítica
                                         </div>
                                      </div>

                                      <div className="space-y-12">
                                         {/* SECTION FAST */}
                                         <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2 p-1 px-3 bg-green-600/10 rounded-full w-fit">
                                               <span className="text-[10px] font-black text-green-700 tracking-[0.2em] uppercase">1. FAST (Enfoque Terapéutico)</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                               {[
                                                 { l: 'F', n: 'Feeding', d: 'Nutrición. ¿Oral, enteral, parenteral?', s: 'Meta: 25-30 kcal/kg/día.' },
                                                 { l: 'A', n: 'Analgesia', d: 'Control del dolor. ¿Escala EVA?', s: 'Evitar opioides innecesarios.' },
                                                 { l: 'S', n: 'Sedation', d: 'Nivel de consciencia. ¿RASS?', s: 'Vacaciones de sedación diarias.' },
                                                 { l: 'T', n: 'Thrombo', d: 'Profilaxis TVP/TEP.', s: 'HBPM o medias de compresión.' }
                                               ].map(x => (
                                                 <div key={x.l} className="flex gap-4 p-4 bg-white/60 rounded-3xl border border-green-100 hover:shadow-md transition-all">
                                                    <span className="text-2xl font-black text-green-600">{x.l}</span>
                                                    <div>
                                                       <p className="text-xs font-black text-foreground">{x.n}</p>
                                                       <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{x.d}</p>
                                                       <p className="text-[9px] text-green-700/60 font-bold mt-1 uppercase tracking-tighter">{x.s}</p>
                                                    </div>
                                                 </div>
                                               ))}
                                            </div>
                                         </div>

                                         {/* SECTION HUGS */}
                                         <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2 p-1 px-3 bg-green-600/10 rounded-full w-fit">
                                               <span className="text-[10px] font-black text-green-700 tracking-[0.2em] uppercase">2. HUGS (Mantenimiento)</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                               {[
                                                 { l: 'H', n: 'Head', d: 'Cabecera elevada 30-45°.', s: 'Previene neumonía por aspiración.' },
                                                 { l: 'U', n: 'Ulcer', d: 'Profilaxis de úlcera de estrés.', s: 'IBP o Antagonista H2.' },
                                                 { l: 'G', n: 'Glucose', d: 'Control glucémico estricto.', s: 'Meta: 140 - 180 mg/dL.' },
                                                 { l: 'S', n: 'Skin', d: 'Integridad cutánea. ¿Braden?', s: 'Cambios de posición c/2h.' }
                                               ].map(x => (
                                                 <div key={x.l} className="flex gap-4 p-4 bg-white/60 rounded-3xl border border-green-100 hover:shadow-md transition-all">
                                                    <span className="text-2xl font-black text-green-600">{x.l}</span>
                                                    <div>
                                                       <p className="text-xs font-black text-foreground">{x.n}</p>
                                                       <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{x.d}</p>
                                                       <p className="text-[9px] text-green-700/60 font-bold mt-1 uppercase tracking-tighter">{x.s}</p>
                                                    </div>
                                                 </div>
                                               ))}
                                            </div>
                                         </div>

                                         {/* SECTION BID */}
                                         <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2 p-1 px-3 bg-green-600/10 rounded-full w-fit">
                                               <span className="text-[10px] font-black text-green-700 tracking-[0.2em] uppercase">3. BID (Decisiones Diarias)</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                               {[
                                                 { l: 'B', n: 'Bowel', d: 'Evaluación del ritmo intestinal.' },
                                                 { l: 'I', n: 'Indwelling', d: '¿Retirar sondas/catéteres?' },
                                                 { l: 'D', n: 'De-escalate', d: 'Ajuste de antibióticos/fármacos.' }
                                               ].map(x => (
                                                 <div key={x.l} className="p-6 bg-green-600 text-white rounded-[2rem] shadow-lg shadow-green-600/15 text-center group hover:-translate-y-1 transition-all">
                                                    <span className="text-4xl font-black block mb-2 group-hover:scale-125 transition-transform">{x.l}</span>
                                                    <p className="text-xs font-black uppercase tracking-widest">{x.n}</p>
                                                    <p className="text-[10px] opacity-80 mt-2 italic leading-tight">{x.d}</p>
                                                 </div>
                                               ))}
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                   <button onClick={() => setSelectedVisitaTool(null)} className="text-xs text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                                     <ChevronLeft size={14} /> Volver a Modelos
                                   </button>
                                </div>
                              )}
                            </Card>
                          </div>
                        )}

                        {selectedService === 'Medicina Interna' && internaSubTab === 'diagnostico' && !selectedDisease && (
                        <Card className="space-y-6">
                          <div className="flex items-center space-x-3 text-primary">
                            <Search size={24} />
                            <h4 className="text-xl font-bold">Diagnóstico Avanzado</h4>
                          </div>
                          
                          <div className="space-y-6">
                            {(!selectedDiagTool || selectedDiagTool === 'acido-base') && (
                              <div className="border border-border p-6 rounded-3xl bg-card relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 -rotate-12"><Wind size={140} /></div>
                                
                                <h5 className="font-black text-xl text-primary mb-6 flex items-center gap-3 relative z-10">
                                  <div className="p-2 bg-primary/10 rounded-xl">
                                    <Wind size={24} className="text-primary"/>
                                  </div>
                                  Algoritmo Ácido-Base: Guía de Medicina Interna
                                </h5>

                                {/* 1. Valores de Referencia (El "Norte") */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8 relative z-10">
                                   {[
                                      { label: 'pH', value: '7.35 – 7.45', desc: 'Acidez/Alcalinidad', color: 'bg-primary/10' },
                                      { label: 'pCO2', value: '35 – 45 mmHg', desc: 'Resp. (Pulmón)', color: 'bg-blue-500/10' },
                                      { label: 'HCO3', value: '22 – 26 mEq/L', desc: 'Metab. (Riñón)', color: 'bg-green-500/10' },
                                      { label: 'pO2', value: '80 – 100 mmHg', desc: 'Oxigenación', color: 'bg-red-500/10' },
                                      { label: 'EB', value: '+/- 2', desc: 'Exceso de Base', color: 'bg-orange-500/10' }
                                   ].map((ref, idx) => (
                                      <div key={idx} className={`${ref.color} p-3 rounded-2xl border border-border/50 text-center`}>
                                         <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{ref.label}</p>
                                         <p className="text-xs font-bold my-0.5">{ref.value}</p>
                                         <p className="text-[9px] text-muted-foreground italic">{ref.desc}</p>
                                      </div>
                                   ))}
                                </div>

                                {/* 2. El Algoritmo de los 3 Pasos (Asistente) */}
                                <div className="space-y-4 mb-8 relative z-10">
                                   <div className="flex items-center gap-2 mb-2">
                                      <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">3 PASOS</span>
                                      <h6 className="font-black text-xs uppercase tracking-[0.2em] text-foreground">Asistente de Interpretación</h6>
                                   </div>
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="p-4 bg-muted/20 border border-border rounded-2xl shadow-sm hover:bg-muted/30 transition-all">
                                         <p className="font-black text-[10px] text-primary uppercase mb-2">Paso 1: ¿Cómo está el pH?</p>
                                         <div className="space-y-1">
                                            <p className="text-xs font-bold flex justify-between">{'< 7.35'} <span className="text-red-600">Acidemia</span></p>
                                            <p className="text-xs font-bold flex justify-between">{'> 7.45'} <span className="text-blue-600">Alcalemia</span></p>
                                         </div>
                                      </div>
                                      <div className="p-4 bg-muted/20 border border-border rounded-2xl shadow-sm hover:bg-muted/30 transition-all">
                                         <p className="font-black text-[10px] text-primary uppercase mb-2">Paso 2: ¿Quién es el culpable?</p>
                                         <ul className="text-[10px] space-y-1 text-muted-foreground list-disc pl-3">
                                            <li><strong>Resp:</strong> pCO2 en dirección OPUESTA al pH.</li>
                                            <li><strong>Metab:</strong> HCO3 en MISMA dirección que el pH.</li>
                                         </ul>
                                      </div>
                                      <div className="p-4 bg-muted/20 border border-border rounded-2xl shadow-sm hover:bg-muted/30 transition-all">
                                         <p className="font-black text-[10px] text-primary uppercase mb-2">Paso 3: ¿Está compensado?</p>
                                         <p className="text-[10px] text-muted-foreground leading-tight">Evalúa si el sistema opuesto intenta normalizar el pH (ej. hiperventilar para bajar pCO2 en acidosis metabólica).</p>
                                      </div>
                                   </div>
                                </div>

                                {/* 3. Tabla de Trastornos y Causas */}
                                <div className="mb-8 relative z-10 overflow-hidden border border-border rounded-3xl shadow-lg bg-card">
                                   <div className="bg-muted px-6 py-3 border-b border-border flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fisiopatología y Compensación</span>
                                      <Activity size={16} className="text-primary opacity-50"/>
                                   </div>
                                   <table className="w-full text-left text-xs">
                                      <thead>
                                         <tr className="bg-muted/30">
                                            <th className="px-6 py-4 font-black uppercase tracking-tighter text-primary">Trastorno</th>
                                            <th className="px-6 py-4 font-black uppercase tracking-tighter text-primary">Causa Común (Fisiopatología)</th>
                                            <th className="px-6 py-4 font-black uppercase tracking-tighter text-primary">Compensación Esperada</th>
                                         </tr>
                                      </thead>
                                      <tbody className="divide-y divide-border/40">
                                         {[
                                            { t: 'Acidosis Metabólica', c: 'Cetoacidosis, Sepsis (Lactato), Falla renal.', co: 'Hiperventilación (Bajar pCO2).' },
                                            { t: 'Acidosis Respiratoria', c: 'EPOC, Neumonía, Depresión resp. (Opiáceos).', co: 'Retención renal de HCO3.' },
                                            { t: 'Alcalosis Metabólica', c: 'Vómitos profusos, diuréticos, succión gástrica.', co: 'Hipoventilación (Subir pCO2).' },
                                            { t: 'Alcalosis Respiratoria', c: 'Ansiedad (Hiperventilación), Dolor agudo, Fiebre.', co: 'Excreción renal de HCO3.' }
                                         ].map((row, i) => (
                                            <tr key={i} className="hover:bg-muted/20 transition-colors">
                                               <td className="px-6 py-4 font-bold text-foreground">{row.t}</td>
                                               <td className="px-6 py-4 text-muted-foreground leading-relaxed italic">{row.c}</td>
                                               <td className="px-6 py-4 font-medium text-primary">{row.co}</td>
                                            </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>

                                {/* 4. Herramientas Avanzadas (Calculadoras) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 mt-8">
                                   <div className="border border-primary/20 bg-primary/5 p-6 rounded-3xl shadow-xl shadow-primary/5 relative overflow-hidden">
                                      <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={80}/></div>
                                      <div className="flex items-center gap-2 mb-4">
                                         <h6 className="font-black text-xs uppercase tracking-widest text-primary">Calculadora de Gaps</h6>
                                         <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-black">INTERNO PLUS</span>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4 mb-6">
                                         <div>
                                            <label className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Na+ (Sodio)</label>
                                            <input 
                                              type="number" value={gasoNa} onChange={(e) => setGasoNa(e.target.value)}
                                              className="w-full bg-white/50 border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                              placeholder="140"
                                            />
                                         </div>
                                         <div>
                                            <label className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Cl- (Cloro)</label>
                                            <input 
                                              type="number" value={gasoCl} onChange={(e) => setGasoCl(e.target.value)}
                                              className="w-full bg-white/50 border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                              placeholder="104"
                                            />
                                         </div>
                                         <div>
                                            <label className="block text-[10px] font-black uppercase text-muted-foreground mb-1">HCO3 (Bicarb)</label>
                                            <input 
                                              type="number" value={gasoHCO3} onChange={(e) => setGasoHCO3(e.target.value)}
                                              className="w-full bg-white/50 border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                              placeholder="24"
                                            />
                                         </div>
                                         <div>
                                            <label className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Albúmina</label>
                                            <input 
                                              type="number" value={gasoAlb} onChange={(e) => setGasoAlb(e.target.value)}
                                              className="w-full bg-white/50 border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                              placeholder="4"
                                            />
                                         </div>
                                      </div>

                                      <div className="space-y-3">
                                         {(() => {
                                            const na = parseFloat(gasoNa);
                                            const cl = parseFloat(gasoCl);
                                            const hco3 = parseFloat(gasoHCO3);
                                            const alb = parseFloat(gasoAlb) || 4;
                                            
                                            const anionGap = na - (cl + hco3);
                                            const agCorregido = anionGap + (2.5 * (4 - alb));
                                            const deltaGap = (anionGap - 12) / (24 - hco3);

                                            return (
                                               <>
                                                  <div className="flex justify-between items-center p-3 rounded-2xl bg-white/60 border border-white shadow-sm ring-1 ring-primary/10">
                                                     <div>
                                                        <p className="text-[10px] font-black uppercase text-primary">Anion Gap</p>
                                                        <p className="text-[9px] text-muted-foreground">Normal: 8-12</p>
                                                     </div>
                                                     <span className="text-xl font-black text-foreground">{!isNaN(anionGap) ? anionGap.toFixed(1) : '--'}</span>
                                                  </div>
                                                  <div className="flex justify-between items-center p-3 rounded-2xl bg-white/60 border border-white shadow-sm ring-1 ring-primary/10">
                                                     <div>
                                                        <p className="text-[10px] font-black uppercase text-primary">AG Corregido (Alb)</p>
                                                        <p className="text-[9px] text-muted-foreground italic">VITAL en pacientes críticos</p>
                                                     </div>
                                                     <span className="text-xl font-black text-foreground">{!isNaN(agCorregido) ? agCorregido.toFixed(1) : '--'}</span>
                                                  </div>
                                                  <div className="flex justify-between items-center p-3 rounded-2xl bg-white/60 border border-white shadow-sm ring-1 ring-primary/10">
                                                     <div>
                                                        <p className="text-[10px] font-black uppercase text-primary">Delta Gap (Δ/Δ)</p>
                                                        <p className="text-[9px] text-muted-foreground">Detecta trastornos mixtos</p>
                                                     </div>
                                                     <span className="text-xl font-black text-foreground">{!isNaN(deltaGap) ? deltaGap.toFixed(1) : '--'}</span>
                                                  </div>
                                               </>
                                            );
                                         })()}
                                      </div>
                                   </div>

                                   <div className="space-y-6">
                                      {/* 5. Interpretación de la Oxigenación */}
                                      <div className="border border-red-200 bg-red-50/20 p-6 rounded-3xl shadow-xl shadow-red-500/5">
                                         <h6 className="font-black text-xs uppercase tracking-widest text-red-700 mb-4 flex items-center gap-2">
                                            <Wind size={16}/> Oxigenación (Índice de Kirby)
                                         </h6>
                                         
                                         <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                               <label className="block text-[10px] font-black uppercase text-red-600 mb-1">PaO2</label>
                                               <input 
                                                 type="number" value={gasoPaO2} onChange={(e) => setGasoPaO2(e.target.value)}
                                                 className="w-full bg-white/50 border border-red-100 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500/50 transition-all outline-none"
                                                 placeholder="85"
                                               />
                                            </div>
                                            <div>
                                               <label className="block text-[10px] font-black uppercase text-red-600 mb-1">FiO2 (%)</label>
                                               <input 
                                                 type="number" value={gasoFiO2} onChange={(e) => setGasoFiO2(e.target.value)}
                                                 className="w-full bg-white/50 border border-red-100 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500/50 transition-all outline-none"
                                                 placeholder="21"
                                               />
                                            </div>
                                         </div>

                                         {(() => {
                                            const pao2 = parseFloat(gasoPaO2);
                                            const fio2 = parseFloat(gasoFiO2) / 100;
                                            const pafi = pao2 / fio2;
                                            let label = 'Normal';
                                            let color = 'text-green-600';
                                            
                                            if (pafi < 100) { label = 'SDRA Grave'; color = 'text-red-700 font-black animate-pulse'; }
                                            else if (pafi < 200) { label = 'SDRA Moderado'; color = 'text-red-600 font-bold'; }
                                            else if (pafi < 300) { label = 'Insuficiencia Leve'; color = 'text-orange-600'; }

                                            return (
                                               <div className="p-4 bg-white/60 rounded-2xl border border-red-100 flex justify-between items-center ring-1 ring-red-500/10 shadow-sm">
                                                  <div>
                                                     <p className="text-[10px] font-black uppercase text-red-700 tracking-widest">PaO2/FiO2</p>
                                                     <p className={`text-sm mt-1 uppercase ${color}`}>{!isNaN(pafi) ? label : 'Ingrese valores'}</p>
                                                  </div>
                                                  <span className="text-3xl font-black text-red-700">{!isNaN(pafi) ? Math.round(pafi) : '--'}</span>
                                               </div>
                                            );
                                         })()}
                                      </div>

                                      <div className="bg-muted p-4 rounded-3xl border border-border shadow-inner">
                                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 italic">Pro-Tips para Internos:</p>
                                         <ul className="text-[10px] text-muted-foreground space-y-2 leading-tight">
                                            <li>• Si el <strong>Delta Gap</strong> es {">"} 1.6, sugiere una alcalosis metabólica oculta.</li>
                                            <li>• Si es {'<'} 0.4, sugiere una acidosis metabólica de AG normal concomitante.</li>
                                            <li>• Valores de <strong>EB</strong> (Base Excess) fuera de ±2 orientan fuertemente a trastornos metabólicos puros.</li>
                                         </ul>
                                      </div>
                                   </div>
                                </div>
                                
                                {/* Keep the Trastornos Mixtos Table here too */}
                                <div className="mt-8 border-t border-border pt-8">
                                  <div className="flex items-center gap-2 mb-3">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Trastornos Ácido-Base Mixtos (Análisis Avanzado)</p>
                                  </div>
                                  <div className="rounded-xl border border-border bg-card/30 overflow-hidden shadow-sm">
                                    <table className="w-full text-[10px] text-center">
                                      <thead className="bg-primary/10 font-bold border-b border-border">
                                        <tr>
                                          <th className="p-2 border-r border-border">pCO2</th>
                                          <th className="p-2 border-r border-border">HCO3</th>
                                          <th className="p-2 border-r border-border">Anión Gap</th>
                                          <th className="p-2 text-left">Interpretación Mixta</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-muted-foreground">
                                        <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                          <td className="p-2 border-r border-border font-bold text-red-500">Elevado</td>
                                          <td className="p-2 border-r border-border font-bold text-blue-500">Elevado</td>
                                          <td className="p-2 border-r border-border">Normal</td>
                                          <td className="p-2 text-left text-foreground">Acidosis respiratoria + Alcalosis metabólica</td>
                                        </tr>
                                        <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                          <td className="p-2 border-r border-border font-bold text-red-500">Elevado</td>
                                          <td className="p-2 border-r border-border font-bold text-blue-500">Elevado</td>
                                          <td className="p-2 border-r border-border font-bold text-orange-500">Elevado</td>
                                          <td className="p-2 text-left text-foreground leading-tight">Acidosis resp. + Alcalosis met. + Acidosis AG elevado</td>
                                        </tr>
                                        <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                          <td className="p-2 border-r border-border font-bold text-blue-500">Disminuido</td>
                                          <td className="p-2 border-r border-border font-bold text-red-500">Disminuido</td>
                                          <td className="p-2 border-r border-border">Normal</td>
                                          <td className="p-2 text-left text-foreground leading-tight">Alcalosis Resp. + Acidosis metabólica AG normal</td>
                                        </tr>
                                        <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                          <td className="p-2 border-r border-border font-bold text-blue-500">Disminuido</td>
                                          <td className="p-2 border-r border-border font-bold text-red-500">Disminuido</td>
                                          <td className="p-2 border-r border-border font-bold text-orange-500">Elevado</td>
                                          <td className="p-2 text-left text-foreground">Alcalosis Resp. + Acidosis met. AG elevado</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(!selectedDiagTool || selectedDiagTool === 'hepatico') && (
                              <div className="border border-border p-6 rounded-3xl bg-card relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 -rotate-12"><Activity size={140} /></div>
                                
                                <h5 className="font-black text-xl text-yellow-600 mb-6 flex items-center gap-3 relative z-10">
                                  <div className="p-2 bg-yellow-500/10 rounded-xl">
                                    <Activity size={24} className="text-yellow-600"/>
                                  </div>
                                  Perfil Hepático: Guía de Interpretación
                                </h5>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                  {/* 1. Transaminasas (Citólisis) */}
                                  <div className="space-y-4">
                                     <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        <h6 className="font-black text-xs uppercase tracking-widest text-foreground">1. Transaminasas (Citólisis)</h6>
                                     </div>
                                     <div className="space-y-3">
                                        <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                                           <div className="flex justify-between items-center mb-1">
                                              <p className="font-bold text-xs text-primary">TGP / ALT (Alanino Aminotransferasa)</p>
                                              <span className="text-[10px] bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full font-black">Específica</span>
                                           </div>
                                           <p className="text-[10px] text-muted-foreground leading-tight mb-2">Elevación extrema ({">"}1000 U/L): Sugiere Hepatitis viral aguda, isquemia hepática o toxicidad (paracetamol).</p>
                                        </div>
                                        <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                                           <div className="flex justify-between items-center mb-1">
                                              <p className="font-bold text-xs text-primary">TGO / AST (Aspartato Aminotransferasa)</p>
                                           </div>
                                           <p className="text-[10px] text-muted-foreground leading-tight">Presente en corazón y músculo. <strong>Relación AST/ALT:</strong> Si AST es el doble que la ALT, es un signo clásico de Hepatopatía Alcohólica.</p>
                                        </div>
                                     </div>
                                  </div>

                                  {/* 2. Marcadores de Colestasis (Obstrucción) */}
                                  <div className="space-y-4">
                                     <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        <h6 className="font-black text-xs uppercase tracking-widest text-foreground">2. Marcadores de Colestasis</h6>
                                     </div>
                                     <div className="space-y-3">
                                        <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                                           <p className="font-bold text-xs text-primary mb-1">Fosfatasa Alcalina (FA)</p>
                                           <p className="text-[10px] text-muted-foreground leading-tight">Indica obstrucción biliar o enfermedades óseas. Se eleva si el flujo de bilis está detenido.</p>
                                        </div>
                                        <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                                           <p className="font-bold text-xs text-primary mb-1">GGT (Gamma-glutamil transferasa)</p>
                                           <p className="text-[10px] text-muted-foreground leading-tight">Muy sensible. <strong>Utilidad clínica:</strong> Si FA y GGT están elevadas, el problema es 100% hepático/biliar (descarta origen óseo).</p>
                                        </div>
                                     </div>
                                  </div>
                                </div>

                                {/* 3. Bilirrubinas y 4. Función Sintética */}
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                                   <div className="lg:col-span-2 overflow-hidden border border-border rounded-2xl shadow-sm">
                                      <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
                                         <Search size={14} className="text-primary"/>
                                         <span className="text-[10px] font-black uppercase tracking-widest">3. Bilirrubinas (Excreción) y Referencias</span>
                                      </div>
                                      <table className="w-full text-[10px] text-left">
                                        <thead className="bg-muted/50 font-bold text-muted-foreground uppercase tracking-tighter">
                                          <tr>
                                            <th className="p-3 border-b border-border">Prueba</th>
                                            <th className="p-3 border-b border-border">Rango / Valor</th>
                                            <th className="p-3 border-b border-border">Interpretación Clínica</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="border-b border-border/50">
                                            <td className="p-3 font-bold text-primary">Bilirrubina Directa</td>
                                            <td className="p-3">Conjugada</td>
                                            <td className="p-3 italic leading-tight">Elevada si el hígado ya procesó la bilirrubina pero no puede expulsarla (Cálculos, Tumores).</td>
                                          </tr>
                                          <tr className="border-b border-border/50">
                                            <td className="p-3 font-bold text-primary">Bilirrubina Indirecta</td>
                                            <td className="p-3">No conjugada</td>
                                            <td className="p-3 leading-tight">Elevada por Hemólisis (destrucción GR) o fallos genéticos de captación.</td>
                                          </tr>
                                          <tr className="border-b border-border/50 bg-yellow-500/5">
                                            <td className="p-3 font-bold">Bilirrubina Total</td>
                                            <td className="p-3 font-black text-yellow-700"> {">"} 2.5 mg/dL</td>
                                            <td className="p-3 font-medium">Aparece la <strong>ictericia</strong> (color amarillento clínico).</td>
                                          </tr>
                                          <tr className="border-b border-border/50">
                                            <td className="p-3 font-bold text-primary">Albúmina</td>
                                            <td className="p-3 text-green-700 font-bold">3.5 — 5 g/dL</td>
                                            <td className="p-3 leading-tight">Refleja cronicidad o desnutrición. Su baja es causa de <strong>edemas</strong> y <strong>ascitis</strong>.</td>
                                          </tr>
                                          <tr>
                                            <td className="p-3 font-bold text-primary">TP / INR</td>
                                            <td className="p-3 text-red-600 font-bold">INR {">"} 1.5</td>
                                            <td className="p-3 leading-tight font-medium text-red-700 uppercase tracking-tighter">Si no corrige con Vit. K, indica daño hepático GRAVE.</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                   </div>

                                   <div className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-200/50 flex flex-col">
                                      <h6 className="font-black text-[10px] text-yellow-700 uppercase tracking-widest mb-3">4. Marcadores de Función Sintética (Pronóstico)</h6>
                                      <div className="flex-1 space-y-4">
                                         <p className="text-[10px] text-muted-foreground leading-tight italic border-l-2 border-yellow-500 pl-3">
                                            Indican si el hígado todavía tiene capacidad de fabricar sustancias vitales. Son los más importantes en pacientes crónicos (Cirrosis).
                                         </p>
                                         <div className="bg-white/40 p-3 rounded-xl border border-yellow-100">
                                            <p className="text-[10px] font-bold text-foreground">Albúmina & Coagulación</p>
                                            <p className="text-[9px] text-muted-foreground mt-1">El hígado fabrica factores de coagulación y proteínas plasmáticas esenciales.</p>
                                         </div>
                                      </div>
                                   </div>
                                </div>

                                <div className="mt-8 bg-muted/20 p-4 rounded-3xl border border-border/40">
                                   <div className="flex items-center gap-3 mb-4 px-2">
                                      <AlertTriangle size={14} className="text-primary"/>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Resumen de Patrones</p>
                                   </div>
                                   <div className="flex flex-col md:flex-row gap-6">
                                      <div className="flex-1 p-3 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                                         <h6 className="font-black text-[9px] text-red-600 uppercase mb-1">Patrón Hepatocelular (CITÓLISIS)</h6>
                                         <p className="text-[10px] font-bold text-foreground">ALT / AST {">"} FA</p>
                                         <p className="text-[9px] text-muted-foreground mt-1">Daño directo al hepatocito.</p>
                                      </div>
                                      <div className="flex-1 p-3 rounded-2xl bg-white/50 border border-blue-100 shadow-sm">
                                         <h6 className="font-black text-[9px] text-blue-600 uppercase mb-1">Patrón Colestásico (OBSTRUCCIÓN)</h6>
                                         <p className="text-[10px] font-bold text-foreground">FA / GGT {">"} Transaminasas</p>
                                         <p className="text-[9px] text-muted-foreground mt-1">Detención del flujo biliar.</p>
                                      </div>
                                   </div>
                                </div>
                              </div>
                            )}

                            {(!selectedDiagTool || selectedDiagTool === 'anemias') && (
                              <div className="border border-border p-4 rounded-xl space-y-6">
                                <h5 className="font-bold mb-3 flex items-center text-lg"><Droplet size={18} className="mr-2 text-red-500"/>Perfil de Anemias: Interpretación por VCM</h5>
                                <p className="text-xs text-muted-foreground">El Volumen Corpuscular Medio (VCM) es el primer paso para clasificar las anemias.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="p-4 rounded-2xl bg-red-50/10 border border-red-500/20 shadow-sm">
                                    <h6 className="font-bold text-xs text-red-600 mb-2 truncate">1. Anemia Microcítica (VCM {'<'} 80 fL)</h6>
                                    <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">El glóbulo rojo es más pequeño de lo normal.</p>
                                    <ul className="text-[10px] space-y-2 text-foreground/80">
                                      <li><strong>Anemia Ferropénica:</strong> La causa #1 (falta de hierro). Relación con Ferritina baja.</li>
                                      <li><strong>Talasemias:</strong> Defecto genético en la hemoglobina. VCM muy bajo con niveles de hematíes normal/alto.</li>
                                      <li><strong>Enfermedad Crónica (Temprana):</strong> Inflamación que "secuestra" el hierro.</li>
                                      <li><strong>Anemia Sideroblástica:</strong> Fallo en la incorporación del hierro al grupo hemo.</li>
                                    </ul>
                                  </div>

                                  <div className="p-4 rounded-2xl bg-blue-50/10 border border-blue-500/20 shadow-sm">
                                    <h6 className="font-bold text-xs text-blue-600 mb-2 truncate">2. Anemia Normocítica (VCM 80 - 100 fL)</h6>
                                    <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">El tamaño es normal, pero hay pocos glóbulos rojos o hemoglobina baja.</p>
                                    <ul className="text-[10px] space-y-2 text-foreground/80">
                                      <li><strong>Hemorragia Aguda:</strong> El cuerpo no ha tenido tiempo de cambiar el tamaño de las células.</li>
                                      <li><strong>Enfermedad Crónica:</strong> Frecuente en pacientes con Cáncer, IRC o Lupus.</li>
                                      <li><strong>Anemia Hemolítica:</strong> Destrucción de glóbulos rojos (Vincular con Bilirrubina Indirecta alta).</li>
                                      <li><strong>Aplasia Medular:</strong> La médula no fabrica células.</li>
                                    </ul>
                                  </div>

                                  <div className="p-4 rounded-2xl bg-emerald-50/10 border border-emerald-500/20 shadow-sm">
                                    <h6 className="font-bold text-xs text-emerald-600 mb-2 truncate">3. Anemia Macrocítica (VCM {'>'} 100 fL)</h6>
                                    <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">El glóbulo rojo es más grande de lo normal.</p>
                                    <ul className="text-[10px] space-y-2 text-foreground/80">
                                      <li><strong>Megaloblástica (B12/Ácido Fólico):</strong> Común en vegetarianos, alcohólicos o mala absorción.</li>
                                      <li><strong>No Megaloblástica:</strong> Relacionado con Hipotiroidismo, hepatopatía crónica o alcohol.</li>
                                      <li><strong>Fármacos:</strong> Anticonvulsivos o quimioterápicos aumentan el tamaño del hematíe.</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-6 overflow-hidden rounded-xl border border-border">
                                  <table className="w-full text-[10px] text-left">
                                    <thead className="bg-muted text-muted-foreground font-black uppercase text-[9px] tracking-widest">
                                      <tr>
                                        <th className="p-3">Hallazgo en App</th>
                                        <th className="p-3">Sospecha Clínica</th>
                                        <th className="p-3">Qué más revisar (Laboratorio)</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-bold">VCM ↓ + Ferritina ↓</td>
                                        <td className="p-3">Anemia Ferropénica</td>
                                        <td className="p-3 text-muted-foreground italic">Sangre oculta en heces, dieta.</td>
                                      </tr>
                                      <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-bold">VCM ↑ + Reticulocitos ↑</td>
                                        <td className="p-3">Hemólisis / Sangrado</td>
                                        <td className="p-3 text-muted-foreground italic">Bilirrubinas, LDH, Prueba de Coombs.</td>
                                      </tr>
                                      <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-bold">VCM N + Creatinina ↑</td>
                                        <td className="p-3">Anemia Renal</td>
                                        <td className="p-3 text-muted-foreground italic">Niveles de Eritropoyetina.</td>
                                      </tr>
                                      <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-bold">VCM ↑↑ ({'>'}110) + Glositis</td>
                                        <td className="p-3">Deficiencia de Vit. B12</td>
                                        <td className="p-3 text-muted-foreground italic">Niveles de cobalamina y folatos.</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>

                          {selectedDiagTool && (
                            <button onClick={() => setSelectedDiagTool(null)} className="text-xs text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2 mt-6">
                              <ChevronLeft size={14} /> Volver a Todos los Contenidos
                            </button>
                          )}
                        </Card>
                    )}

                    {selectedService === 'Emergencias' && emergencySubTab === 'patologias' && !selectedDisease && (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 text-red-500 bg-card p-4 rounded-xl border border-border shadow-sm">
                          <Activity size={24} />
                          <h4 className="text-xl font-bold">Patologías de Emergencia (Enfoque por Sistemas)</h4>
                        </div>
                        <div className="space-y-6">
                          {Array.from(new Set(DISEASES.filter(d => d.servicio === 'Emergencias' && d.system).map(d => d.system!).filter(Boolean))).map(system => {
                            const IconCmp = system === 'Cardiovascular' ? Activity : system === 'Respiratorio' ? Wind : system === 'Neurológico' ? Brain : Shield;
                            const colorClass = system === 'Cardiovascular' ? 'text-red-600 border-red-600' : system === 'Respiratorio' ? 'text-blue-500 border-blue-500' : system === 'Neurológico' ? 'text-purple-500 border-purple-500' : 'text-orange-500 border-orange-500';
                            const bgClass = system === 'Cardiovascular' ? 'bg-red-600/5' : system === 'Respiratorio' ? 'bg-blue-500/5' : system === 'Neurológico' ? 'bg-purple-500/5' : 'bg-orange-500/5';
                            
                            return (
                              <Card key={system} className={`border-l-4 ${colorClass.split(' ')[1]} p-4 ${bgClass}`}>
                                <h5 className={`font-bold flex items-center mb-4 ${colorClass.split(' ')[0]}`}>
                                  <IconCmp size={18} className="mr-2" /> {system}
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {DISEASES.filter(d => d.servicio === 'Emergencias' && d.system === system).map(disease => (
                                    <button
                                      key={disease.id}
                                      onClick={() => setSelectedDisease(disease)}
                                      className="text-left bg-background hover:bg-accent border border-border p-3 rounded-lg transition-all shadow-sm hover:shadow-md hover:border-red-500/30 group flex flex-col justify-between"
                                    >
                                      <div className="space-y-2 w-full">
                                        <div className="flex items-start justify-between">
                                          <p className="font-bold text-sm text-foreground group-hover:text-red-500 transition-colors leading-tight">{disease.nombre}</p>
                                          <ChevronRight size={16} className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-red-500 shrink-0 ml-2" />
                                        </div>
                                        {disease.clinica?.signosSintomas && (
                                          <p className="text-[10px] text-muted-foreground line-clamp-2">
                                            {disease.clinica.signosSintomas.join(', ')}
                                          </p>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedService === 'Emergencias' && emergencySubTab === 'codigos' && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-red-500">
                          <Bell size={24} />
                          <h4 className="text-xl font-bold">Códigos de Emergencia e Intervenciones</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { color: 'bg-blue-600', name: 'Azul', title: 'Paro Cardio-Respiratorio (PCR)', desc: 'Activación de equipo de RCP (Básico/Avanzado). DEA/Desfibrilador manual inmediato.' },
                            { color: 'bg-red-600', name: 'Rojo', title: 'Hemorragia Masiva (Shock)', desc: 'Protocolo de transfusión masiva, control de daños y reposición volémica agresiva.' },
                            { color: 'bg-yellow-500', name: 'Oro / Mater', title: 'Emergencia Obstétrica', desc: 'Claves Azul (Preeclampsia/Eclampsia), Roja (Hemorragia) y Amarilla (Sepsis).' },
                            { color: 'bg-slate-400', name: 'Plata', title: 'Paciente Crítico / UCI', desc: 'Necesidad de transferencia inmediata a cuidados intensivos o estabilización compleja.' },
                            { color: 'bg-pink-400', name: 'Rosa', title: 'Fallecimiento / Éxitus', desc: 'Protocolo de manejo de cadáver, apoyo tanatológico y aspectos legales.' },
                            { color: 'bg-violet-500', name: 'Violeta', title: 'Emergencia Psiquiátrica', desc: 'Agitación psicomotriz, riesgo suicida o conducta violenta. Contención física/química.' },
                          ].map((item) => (
                            <div key={item.name} className="p-4 rounded-xl border border-border bg-accent/5 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                                  <span className="font-black text-xs uppercase tracking-widest leading-none">Código {item.name}</span>
                                </div>
                                <h5 className="font-bold text-sm mb-1">{item.title}</h5>
                                <p className="text-[10px] text-muted-foreground leading-snug">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                           <h5 className="font-bold text-red-600 text-sm mb-2 flex items-center px-1">
                             <AlertCircle size={16} className="mr-2" /> Checklist Universal de Activación
                           </h5>
                           <p className="text-[11px] text-muted-foreground italic px-1">
                             1. Identificar evento - 2. Activar timbre/altavoz indicando código y ubicación - 3. Iniciar maniobras básicas - 4. Llegada de carro de paro - 5. Registro de tiempos y fármacos.
                           </p>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Emergencias' && emergencySubTab === 'medicamentos' && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-red-500">
                          <Pill size={24} />
                          <h4 className="text-xl font-bold">Medicamentos de Emergencia (Carro de Paro)</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                             <div className="bg-red-500/5 p-4 rounded-xl border-l-4 border-red-500">
                                <h5 className="font-bold text-red-600 text-sm mb-2 uppercase tracking-wider">Vasoactivos e Inotrópicos</h5>
                                <ul className="text-[11px] space-y-2 text-muted-foreground list-none">
                                  <li><span className="font-bold text-foreground">Adrenalina:</span> 1mg c/3-5 min en RCP. Anafilaxia: 0.3-0.5mg IM.</li>
                                  <li><span className="font-bold text-foreground">Noradrenalina:</span> Shock distributivo. 0.05 - 1 mcg/kg/min.</li>
                                  <li><span className="font-bold text-foreground">Dopamina:</span> Bradicardia sintomática (5-20 mcg/kg/min).</li>
                                </ul>
                             </div>
                             <div className="bg-blue-500/5 p-4 rounded-xl border-l-4 border-blue-500">
                                <h5 className="font-bold text-blue-600 text-sm mb-2 uppercase tracking-wider">Antiarrítmicos</h5>
                                <ul className="text-[11px] space-y-2 text-muted-foreground list-none">
                                  <li><span className="font-bold text-foreground">Amiodarona:</span> FV/TVSP: 300mg (1ra dosis), 150mg (2da).</li>
                                  <li><span className="font-bold text-foreground">Adenosina:</span> TPSV. 6mg bolo rápido (+ 12mg / 12mg).</li>
                                  <li><span className="font-bold text-foreground">Atropina:</span> Bradicardia. 1mg cada 3-5 min (Max 3mg).</li>
                                </ul>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <div className="bg-purple-500/5 p-4 rounded-xl border-l-4 border-purple-500">
                                <h5 className="font-bold text-purple-600 text-sm mb-2 uppercase tracking-wider">Sedoanalgesia (SIR)</h5>
                                <ul className="text-[11px] space-y-2 text-muted-foreground list-none">
                                  <li><span className="font-bold text-foreground">Midazolam:</span> Sedación sedante (Benzodiacepina). 0.1-0.3 mg/kg.</li>
                                  <li><span className="font-bold text-foreground">Fentanilo:</span> Opioide de acción rápida. 1-3 mcg/kg.</li>
                                  <li><span className="font-bold text-foreground">Propofol / Etomidato:</span> Inducción rápida para intubación.</li>
                                </ul>
                             </div>
                             <div className="bg-green-500/5 p-4 rounded-xl border-l-4 border-green-500">
                                <h5 className="font-bold text-green-600 text-sm mb-2 uppercase tracking-wider">Antídotos y Otros</h5>
                                <ul className="text-[11px] space-y-2 text-muted-foreground list-none">
                                  <li><span className="font-bold text-foreground">Naloxona:</span> Antagonista de opioides (Depresión resp).</li>
                                  <li><span className="font-bold text-foreground">Flumazenil:</span> Antagonista de benzodiacepinas.</li>
                                  <li><span className="font-bold text-foreground">Gluconato de Calcio:</span> Hiperpotasemia o toxicidad por Mg.</li>
                                </ul>
                             </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Emergencias' && emergencySubTab === 'procedimientos' && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-red-500">
                          <Stethoscope size={24} />
                          <h4 className="text-xl font-bold">Intervenciones y Procedimientos Críticos</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="border border-border p-4 rounded-xl bg-accent/5">
                            <h5 className="font-bold text-primary flex items-center gap-2 mb-3">
                              <Wind size={18} /> Secuencia de Intubación Rápida (SIR)
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {[
                                { step: '1. Preparación', desc: 'Material, fármacos, monitorización, aspiración.' },
                                { step: '2. Preoxigenación', desc: 'O2 al 100% por 3-5 min (FiO2 alta).' },
                                { step: '3. Pretratamiento', desc: 'Lidocaína, Fentanilo (opcional según clínica).' },
                                { step: '4. Parálisis / Inducción', desc: 'Hipnótico + Relajante neuromuscular (Succinilcolina/Rocuronio).' },
                                { step: '5. Posicionamiento', desc: 'Maniobra de olfateo, alineación de ejes.' },
                                { step: '6. Protección/Pasaje', desc: 'Inserción de tubo, inflado de manguito.' },
                              ].map((s) => (
                                <div key={s.step} className="bg-card p-3 rounded-lg border border-border/50">
                                  <p className="font-bold text-[10px] text-primary uppercase">{s.step}</p>
                                  <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-border rounded-xl">
                              <h5 className="font-bold text-sm mb-3">Accesos Vasculares</h5>
                              <ul className="text-[11px] space-y-2 list-disc list-inside text-muted-foreground">
                                <li><strong>Periféricos:</strong> Calibres gruesos (14G/16G) en trauma para reposición.</li>
                                <li><strong>Intraóseo:</strong> Segunda línea rápida si falla el acceso periférico en {">"}90 seg.</li>
                                <li><strong>Central:</strong> Monitoreo de PVC, fármacos vasoactivos o NPT.</li>
                              </ul>
                            </div>
                            <div className="p-4 border border-border rounded-xl">
                              <h5 className="font-bold text-sm mb-3">Monitorización Continua</h5>
                              <ul className="text-[11px] space-y-2 list-disc list-inside text-muted-foreground">
                                <li><strong>Ritmos de Paro:</strong> Desfibrilables (FV / TVSP) vs No Desfibrilables (Asistolia / AESP).</li>
                                <li><strong>Capnografía:</strong> Confirmación de colocación de tubo y calidad de RCP.</li>
                                <li><strong>Shock:</strong> Vigilar TAM ({">"}65 mmHg) y gasto urinario ({">"}0.5 ml/kg/h).</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Emergencias' && emergencySubTab === 'escalas' && !selectedDisease && (
                      <div className="space-y-6">
                        <Card className="p-6">
                          <div className="flex items-center space-x-3 text-red-500 mb-6">
                            <Calculator size={28} className="animate-pulse" />
                            <h4 className="text-2xl font-black tracking-tight">
                              {selectedScaleId 
                                ? `Escala: ${MEDICAL_SCORES.find(s => s.id === selectedScaleId)?.name}` 
                                : 'Escalas Específicas de Emergencia'}
                            </h4>
                          </div>

                          <div className="-mx-2 sm:mx-0">
                            <MedicalScores 
                               activeScoreId={selectedScaleId} 
                               onScoreChange={setSelectedScaleId}
                               hideGrid={!!selectedScaleId}
                               allowedScoreIds={['qsofa', 'cincinnati', 'wells', 'glasgow']}
                            />
                          </div>
                   
                          {!selectedScaleId && (
                             <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-1 px-3 bg-red-500/10 border border-red-500/20 rounded-full w-fit">
                                   <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Enfoque de Emergencia</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                      <h5 className="font-bold text-lg flex items-center gap-2">
                                         <Brain size={20} className="text-red-500" />
                                         Triaje y Pronóstico Rápido
                                      </h5>
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                         En la sala de emergencias, el tiempo es tejido. Estas escalas están diseñadas para ser aplicadas en segundos y guiar conductas inmediatas como activación de códigos o derivación a UCI.
                                      </p>
                                   </div>
                                   <div className="bg-accent/30 p-6 rounded-3xl border border-border/50">
                                      <h5 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-4">Mnemotecnias Útiles</h5>
                                      <div className="space-y-4">
                                         <div className="border-b border-border/50 pb-4">
                                            <p className="text-xs font-bold text-foreground">AVDI (Estado Mental)</p>
                                            <p className="text-[10px] text-muted-foreground mt-1">Alerta, Verbal (responde a voz), Dolor (responde a dolor), Inconsciente.</p>
                                         </div>
                                         <div>
                                            <p className="text-xs font-bold text-foreground">XABCDE (Trauma)</p>
                                            <p className="text-[10px] text-muted-foreground mt-1">Hemorragia exanguinante, Vía Aérea, Ventilación, Circulación, Déficit, Exposición.</p>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          )}
                        </Card>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {selectedDisease ? (
                        <motion.div
                          key={selectedDisease.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <Card className="border-t-4 p-5 sm:p-6 shadow-sm" style={{ borderTopColor: selectedDisease.color || 'var(--primary)' }}>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-xl sm:text-2xl font-black leading-tight">{selectedDisease.nombre}</h4>
                                <p className="text-primary font-bold text-sm mt-1">{selectedDisease.servicio}</p>
                              </div>
                              <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
                                <Info size={20} />
                              </div>
                            </div>

                            {/* Disease Tabs */}
                            <div className="flex space-x-1 bg-accent/30 p-1 rounded-lg mb-4 overflow-x-auto scrollbar-hide">
                              {[
                                { id: 'clinica', label: selectedDisease.isLogistica ? 'Generalidades' : 'Clínica', icon: selectedDisease.isLogistica ? Clipboard : Activity },
                                { id: 'fisiopatologia', label: selectedDisease.isLogistica ? 'Fundamento / Bases' : 'Fisiopatología', icon: Stethoscope },
                                { id: 'manejo', label: selectedDisease.isLogistica ? 'Proceso / Etapas' : 'Manejo', icon: Clipboard },
                                { id: 'enfermeria', label: selectedDisease.isLogistica ? 'Rol Profesional' : 'Enfermería', icon: Heart },
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  onClick={() => setDiseaseActiveTab(tab.id as any)}
                                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                                    diseaseActiveTab === tab.id 
                                      ? 'bg-card text-primary shadow-sm' 
                                      : 'text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  <tab.icon size={14} />
                                  <span>{tab.label}</span>
                                </button>
                              ))}
                            </div>

                            <div className="min-h-[250px]">
                              {diseaseActiveTab === 'clinica' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest">{selectedDisease.isLogistica ? 'Elementos Clave / Componentes' : 'Signos y Síntomas'}</h5>
                                      <ul className="space-y-1.5">
                                        {selectedDisease.clinica?.signosSintomas.map((s, i) => (
                                          <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <span>{s}</span>
                                          </li>
                                        )) || <li className="text-xs sm:text-sm text-muted-foreground italic">Información no disponible en la biblioteca actual.</li>}
                                      </ul>
                                    </div>
                                    <div className="space-y-2">
                                      <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest">{selectedDisease.isLogistica ? 'Descripción Operativa' : 'Maniobra de Exploración'}</h5>
                                      <p className="text-xs sm:text-sm bg-accent/20 p-3 rounded-lg border border-border italic">
                                        {selectedDisease.clinica?.maniobraExploracion || 'Información no disponible.'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20 mt-4">
                                    <h5 className="text-[10px] sm:text-xs font-black text-destructive uppercase tracking-widest mb-2 flex items-center">
                                      <AlertCircle size={14} className="mr-1" /> {selectedDisease.isLogistica ? 'Puntos Críticos / Precauciones' : 'Banderas Rojas'}
                                    </h5>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {selectedDisease.clinica?.banderasRojas.map((b, i) => (
                                        <li key={i} className="flex items-center space-x-2 text-xs font-bold text-destructive/80">
                                          <X size={12} />
                                          <span>{b}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}

                              {diseaseActiveTab === 'fisiopatologia' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                  <div className="space-y-2">
                                    <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest leading-none mb-4">Texto Técnico</h5>
                                    <div className="text-xs sm:text-sm leading-relaxed text-justify space-y-3">
                                      {(selectedDisease.fisiopatologia?.textoTecnico || 'Información no disponible.').replace(/\\n/g, '\n').split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => {
                                        if (paragraph.startsWith('### ')) {
                                          return <h6 key={idx} className="font-bold text-primary text-sm mt-4 mb-1">{paragraph.replace('### ', '')}</h6>;
                                        }
                                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                                        return (
                                          <p key={idx} className="pl-1">
                                            {parts.map((part, pIdx) => 
                                              part.startsWith('**') && part.endsWith('**') ? 
                                              <strong key={pIdx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong> : 
                                              part
                                            )}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                                    {[
                                      { label: 'Inicio', content: selectedDisease.fisiopatologia?.esquemaMental.inicio, color: 'bg-blue-500' },
                                      { label: 'Daño', content: selectedDisease.fisiopatologia?.esquemaMental.dano, color: 'bg-destructive' },
                                      { label: 'Consecuencia', content: selectedDisease.fisiopatologia?.esquemaMental.consecuencia, color: 'bg-orange-500' },
                                    ].map((item, i) => (
                                      <div key={i} className="p-3 rounded-xl bg-accent/10 border border-border">
                                        <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${item.color} uppercase mb-2 inline-block`}>
                                          {item.label}
                                        </span>
                                        <p className="text-xs font-medium leading-tight">{item.content || 'N/A'}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {diseaseActiveTab === 'manejo' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                  <div className="space-y-3">
                                    <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
                                      <h5 className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest mb-1.5">{selectedDisease.isLogistica ? 'Aplicaciones / Metodología' : 'Diagnóstico'}</h5>
                                      <p className="text-xs sm:text-sm font-medium">{selectedDisease.manejo?.diagnostico || 'Información no disponible.'}</p>
                                    </div>
                                    
                                    {selectedDisease.manejo?.tratamientoDetallado ? (
                                      <div className="space-y-4">
                                        <div className="p-4 bg-green-500/5 rounded-xl border-l-4 border-green-500">
                                          <h5 className="text-[10px] sm:text-xs font-black text-green-600 uppercase tracking-widest mb-3">{selectedDisease.isLogistica ? 'Detalles Operativos / Descripción' : 'Terapia Farmacológica Avanzada'}</h5>
                                          <div className="space-y-2">
                                            {selectedDisease.manejo.tratamientoDetallado.farmacos.map((f, i) => (
                                              <div key={i} className="bg-background/80 border border-border p-3 rounded-lg shadow-sm">
                                                <p className="font-bold text-sm text-foreground flex items-center"><Pill size={14} className="mr-1.5 text-green-600"/> {f.nombre}</p>
                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                  <div className="bg-muted/30 p-1.5 rounded">
                                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Dosis</p>
                                                    <p className="text-xs text-foreground font-medium">{f.dosis}</p>
                                                  </div>
                                                  <div className="bg-muted/30 p-1.5 rounded">
                                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Frecuencia</p>
                                                    <p className="text-xs text-foreground font-medium">{f.frecuencia}</p>
                                                  </div>
                                                </div>
                                                {f.observaciones && <p className="text-[10px] text-muted-foreground mt-2 italic bg-green-500/10 p-2 rounded-md border border-green-500/20">{f.observaciones}</p>}
                                              </div>
                                            ))}
                                          </div>
                                          {selectedDisease.manejo.tratamientoDetallado.medidasGenerales && selectedDisease.manejo.tratamientoDetallado.medidasGenerales.length > 0 && (
                                            <div className="mt-4 pt-3 border-t border-green-500/20">
                                              <h6 className="text-xs font-bold text-green-700 mb-2 flex items-center"><Clipboard size={14} className="mr-1.5"/> Medidas de Soporte Generales:</h6>
                                              <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                                {selectedDisease.manejo.tratamientoDetallado.medidasGenerales.map((m, i) => <li key={i}>{m}</li>)}
                                              </ul>
                                            </div>
                                          )}
                                        </div>

                                        {selectedDisease.manejo.monitoreo && (
                                          <div className="p-4 bg-blue-500/5 rounded-xl border-l-4 border-blue-500">
                                            <h5 className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center"><Activity size={16} className="mr-1.5"/> Monitoreo y Señales de Alerta</h5>
                                            <div className="space-y-3">
                                              <div className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                                                <p className="text-xs font-bold text-foreground mb-2 flex items-center"><Activity size={14} className="mr-1.5 text-blue-500"/> Parámetros a vigilar estrictamente:</p>
                                                <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                                  {selectedDisease.manejo.monitoreo.parametros.map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                              </div>
                                              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 shadow-sm">
                                                <p className="text-xs font-bold text-red-600 mb-2 flex items-center"><AlertTriangle size={14} className="mr-1.5"/> Signos de Alerta Roja (Suspender o Intervenir):</p>
                                                <ul className="list-disc pl-5 text-xs text-red-600/90 space-y-1">
                                                  {selectedDisease.manejo.monitoreo.signosAlerta.map((s, i) => <li key={i} className="font-medium">{s}</li>)}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {selectedDisease.manejo.evaluacion && (
                                          <div className="p-4 bg-purple-500/5 rounded-xl border-l-4 border-purple-500">
                                            <h5 className="text-[10px] sm:text-xs font-black text-purple-600 uppercase tracking-widest mb-3 flex items-center"><ShieldCheck size={16} className="mr-1.5"/> Evaluación de la Terapia</h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                              <div className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                                                <p className="text-[11px] font-bold text-green-600 mb-2">✅ Criterios de Éxito Funcional:</p>
                                                <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                                                  {selectedDisease.manejo.evaluacion.criteriosExito.map((c, i) => <li key={i}>{c}</li>)}
                                                </ul>
                                              </div>
                                              <div className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                                                <p className="text-[11px] font-bold text-orange-600 mb-2">❌ Criterios de Fracaso / Refractariedad:</p>
                                                <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                                                  {selectedDisease.manejo.evaluacion.criteriosFracaso.map((c, i) => <li key={i}>{c}</li>)}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="p-4 bg-green-500/5 rounded-xl border-l-4 border-green-500">
                                        <h5 className="text-[10px] sm:text-xs font-black text-green-600 uppercase tracking-widest mb-1.5 flex justify-between items-center">
                                          {selectedDisease.isLogistica ? 'Prácticas y Estándares' : 'Tratamiento Convencional'}
                                          <span className="text-[8px] sm:text-[9px] bg-green-500/10 px-2 py-0.5 rounded text-green-600 lowercase font-medium tracking-normal">Formato Simplificado</span>
                                        </h5>
                                        <p className="text-xs sm:text-sm font-medium">{selectedDisease.manejo?.tratamiento || 'Información no disponible.'}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {diseaseActiveTab === 'enfermeria' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                  <div className="p-3 bg-accent/20 rounded-lg border border-border">
                                    <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{selectedDisease.isLogistica ? 'Competencia / Enfoque' : 'NANDA'}</h5>
                                    <p className="text-xs sm:text-sm font-bold text-primary">{selectedDisease.enfermeria?.nanda || 'Información no disponible.'}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest">{selectedDisease.isLogistica ? 'Responsabilidades y Tareas Clave' : 'Intervenciones Clave'}</h5>
                                    <div className="grid grid-cols-1 gap-2">
                                      {selectedDisease.enfermeria?.intervenciones.map((int, i) => (
                                        <div key={i} className="p-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                                          <p className="text-xs sm:text-sm font-bold text-foreground mb-1">{int.accion}</p>
                                          <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                                            <strong className="text-primary/70">Razón:</strong> {int.razon}
                                          </p>
                                        </div>
                                      )) || <p className="text-xs text-muted-foreground italic">Información no disponible.</p>}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                              <p className="text-[10px] text-muted-foreground italic">
                                Fuente: {
                                  diseaseActiveTab === 'clinica' ? selectedDisease.clinica?.cita :
                                  diseaseActiveTab === 'fisiopatologia' ? selectedDisease.fisiopatologia?.cita :
                                  diseaseActiveTab === 'manejo' ? selectedDisease.manejo?.cita :
                                  selectedDisease.enfermeria?.cita
                                }
                              </p>
                              <div className="flex space-x-2">
                                <button className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors">
                                  <Plus size={16} />
                                </button>
                                <button className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors">
                                  <Settings size={16} />
                                </button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ) : selectedService !== 'Salud Comunitaria' && selectedService !== 'Gineco-Obstetricia' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-10 border border-dashed border-border rounded-xl text-muted-foreground">
                          <Activity size={32} className="mb-3 opacity-20" />
                          <p className="text-sm sm:text-base font-medium">Selecciona una patología para ver sus detalles.</p>
                        </div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'practica':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionHeader title="Práctica Clínica" subtitle="Procedimientos, uso y correcto manejo." />
            
            {!selectedProcedureCategory ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {PROCEDURE_CATEGORIES.map((category) => {
                  const CategoryIcon = ICON_MAP[category.icon] || Activity;
                  return (
                    <Card 
                      key={category.name} 
                      onClick={() => setSelectedProcedureCategory(category.name)}
                      className="cursor-pointer hover:bg-primary/5 hover:border-primary transition-all group p-4 shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                          <CategoryIcon size={24} />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold leading-tight">{category.name}</h3>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => { setSelectedProcedureCategory(null); setSelectedProcedure(null); }}
                  className="flex items-center text-primary font-bold hover:underline mb-2 text-sm"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Volver a Categorías
                </button>
                <h3 className="text-xl sm:text-2xl font-bold border-l-4 border-primary pl-3">{selectedProcedureCategory}</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1 space-y-2">
                    <div className="flex flex-col gap-2 max-h-[30vh] lg:max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
                      {PROCEDURES.filter(p => p.categoria === selectedProcedureCategory).map(proc => (
                        <button
                          key={proc.id}
                          onClick={() => setSelectedProcedure(proc)}
                          className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                            selectedProcedure?.id === proc.id 
                              ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                              : 'bg-card border-border hover:border-primary hover:bg-accent/50'
                          }`}
                        >
                          <div className="font-bold truncate">{proc.nombre}</div>
                          <div className={`text-[10px] sm:text-xs mt-0.5 truncate ${selectedProcedure?.id === proc.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {proc.tipoTecnica}
                          </div>
                        </button>
                      ))}
                      {PROCEDURES.filter(p => p.categoria === selectedProcedureCategory).length === 0 && (
                        <div className="text-center p-4 border border-dashed rounded-lg text-muted-foreground text-sm">
                          Próximamente se añadirán procedimientos.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                      {selectedProcedure ? (
                        <motion.div
                          key={selectedProcedure.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <Card className="overflow-hidden p-0 border border-border shadow-sm">
                            <div className="bg-primary/5 p-4 sm:p-5 border-b border-border">
                              <h4 className="text-lg sm:text-xl font-black text-primary leading-tight">{selectedProcedure.nombre}</h4>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] sm:text-xs font-bold rounded-md uppercase tracking-wider">
                                  {selectedProcedure.tipoTecnica}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-5 space-y-6">
                              <div>
                                <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center">
                                  <Info size={14} className="mr-1.5 text-primary" /> Uso
                                </h5>
                                <p className="text-xs sm:text-sm">{selectedProcedure.uso}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center">
                                    <CheckCircle2 size={14} className="mr-1.5 text-green-500" /> Indicaciones
                                  </h5>
                                  <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-muted-foreground">
                                    {selectedProcedure.indicaciones.map((ind, i) => <li key={i}>{ind}</li>)}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center">
                                    <AlertCircle size={14} className="mr-1.5 text-red-500" /> Contraindicaciones
                                  </h5>
                                  <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-muted-foreground">
                                    {selectedProcedure.contraindicaciones.map((contra, i) => <li key={i}>{contra}</li>)}
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center">
                                  <Clipboard size={14} className="mr-1.5 text-primary" /> Material Necesario
                                </h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {selectedProcedure.materialNecesario.map((mat, i) => (
                                    <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-[10px] sm:text-xs rounded-md border border-border">
                                      {mat}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h5 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center">
                                  <Activity size={14} className="mr-1.5 text-primary" /> Manera de realizarlo
                                </h5>
                                <div className="space-y-2">
                                  {selectedProcedure.maneraRealizarlo.map((paso, i) => {
                                    const [title, ...descParts] = paso.split(':');
                                    const desc = descParts.join(':');
                                    return (
                                      <div key={i} className="flex space-x-2.5">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold mt-0.5">
                                          {i + 1}
                                        </div>
                                        <p className="text-xs sm:text-sm">
                                          {desc ? (
                                            <>
                                              <strong className="text-foreground">{title}:</strong> {desc}
                                            </>
                                          ) : (
                                            paso
                                          )}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                                <h5 className="text-[10px] sm:text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-1.5 flex items-center">
                                  <Shield size={14} className="mr-1.5" /> Cuidados de Enfermería
                                </h5>
                                <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-blue-900/80 dark:text-blue-200/80">
                                  {selectedProcedure.cuidadosEnfermeria.map((cuidado, i) => (
                                    <li key={i}>
                                      {cuidado.startsWith('Tip de Seguridad:') ? (
                                        <strong>{cuidado}</strong>
                                      ) : (
                                        cuidado
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-10 border border-dashed border-border rounded-xl text-muted-foreground">
                          <Activity size={32} className="mb-3 opacity-20" />
                          <p className="text-sm sm:text-base font-medium">Selecciona un procedimiento para ver sus detalles.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'perfil':
        if (!userProfile) return null;
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <SectionHeader title="Mi Perfil y Rotaciones" subtitle="Gestiona tu información académica y profesional." />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-4 border-primary/20 overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={64} className="text-primary" />
                  )}
                </div>
                <h3 className="text-2xl font-bold">{userProfile.nombre}</h3>
                <p className="text-primary font-medium">{userProfile.rol}</p>
                <p className="text-sm text-muted-foreground mt-2">{userProfile.universidad || 'Universidad no registrada'}</p>
                
                <div className="w-full mt-8 pt-8 border-t border-border space-y-4">
                  <button 
                    onClick={() => {
                      setEditProfileData({
                        uid: userProfile.uid || '',
                        nombre: userProfile.nombre || '',
                        email: userProfile.email || '',
                        telefono: userProfile.telefono || '',
                        direccion: userProfile.direccion || '',
                        rol: userProfile.rol || '',
                        universidad: userProfile.universidad || '',
                        hospital: userProfile.hospital || '',
                        servicioActual: userProfile.servicioActual || '',
                        horario: userProfile.horario || ''
                      });
                      setIsEditingProfile(true);
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Editar Perfil
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-destructive/10 hover:text-destructive transition-all"
                  >
                    Cerrar Sesión
                  </button>

                  <div className="pt-8 border-t border-border mt-4 text-left">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Zona de Peligro</p>
                    <button 
                      onClick={() => {
                        const isConfirmed = window.confirm('¿Estás ABSOLUTAMENTE SEGURO de querer reiniciar tu cuenta? Se borrarán todos tus turnos, tareas, bitácora y perfil. Esta acción no se puede deshacer.');
                        if (isConfirmed) handleResetAccount();
                      }}
                      className="w-full py-3 bg-rose-500/10 text-rose-600 rounded-xl font-black text-xs uppercase hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} /> Reiniciar Cuenta
                    </button>
                  </div>
                </div>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                <Card className="space-y-6">
                  <h4 className="font-black text-lg flex items-center uppercase tracking-widest text-primary">
                    <Info size={20} className="mr-2" /> Información Personal
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Email</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Mail size={16} className="text-primary" />
                        {userProfile.email}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Teléfono</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Phone size={16} className="text-primary" />
                        {userProfile.telefono || 'No registrado'}
                      </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Dirección</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <MapPin size={16} className="text-primary" />
                        {userProfile.direccion || 'No registrada'}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="space-y-6">
                  <h4 className="font-black text-lg flex items-center uppercase tracking-widest text-primary">
                    <MapPin size={20} className="mr-2" /> Hospital y Rotación
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Hospital</p>
                      <p className="text-sm font-bold">{userProfile.hospital || 'No asignado'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Servicio Actual</p>
                      <p className="text-sm font-bold">{userProfile.servicioActual || 'No asignado'}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
              {isEditingProfile && editProfileData && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setIsEditingProfile(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-card border border-border w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                  >
                    <h3 className="text-2xl font-black mb-6">Editar Perfil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nombre Completo</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.nombre}
                          onChange={(e) => setEditProfileData({ ...editProfileData, nombre: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Teléfono</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.telefono}
                          onChange={(e) => setEditProfileData({ ...editProfileData, telefono: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dirección</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.direccion}
                          onChange={(e) => setEditProfileData({ ...editProfileData, direccion: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Universidad</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.universidad}
                          onChange={(e) => setEditProfileData({ ...editProfileData, universidad: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hospital</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.hospital}
                          onChange={(e) => setEditProfileData({ ...editProfileData, hospital: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Servicio Actual (Rotación)</label>
                        <input 
                          type="text" 
                          className="w-full p-3 rounded-xl border border-border bg-accent/20 focus:ring-2 focus:ring-primary outline-none"
                          value={editProfileData.servicioActual}
                          onChange={(e) => setEditProfileData({ ...editProfileData, servicioActual: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-grow py-4 rounded-xl font-black uppercase tracking-widest hover:bg-accent transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleUpdateProfile}
                        className="flex-grow py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'notas':
        return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}><MyNotes /></motion.div>;

      case 'fundamentos':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionHeader title="Fundamentos de Enfermería" subtitle="Conceptos básicos y cuidados esenciales." />
            <WasteManagementBlock />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-bold mb-3">Signos Vitales</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Tensión Arterial:</span> <span className="font-medium">120/80 mmHg</span></li>
                  <li className="flex justify-between"><span>Frecuencia Cardíaca:</span> <span className="font-medium">60-100 lpm</span></li>
                  <li className="flex justify-between"><span>Frecuencia Respiratoria:</span> <span className="font-medium">12-20 rpm</span></li>
                  <li className="flex justify-between"><span>Temperatura:</span> <span className="font-medium">36.5 - 37.5 °C</span></li>
                  <li className="flex justify-between"><span>Saturación O2:</span> <span className="font-medium">&gt; 94%</span></li>
                </ul>
              </Card>
              <Card>
                <h4 className="font-bold mb-3">Mecánica Corporal</h4>
                <p className="text-sm text-muted-foreground">Principios para el movimiento seguro de pacientes y prevención de lesiones en el personal de salud.</p>
                <button className="mt-4 text-primary text-sm font-bold">Leer más</button>
              </Card>
            </div>
          </motion.div>
        );

      case 'laboratorio':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <SectionHeader title="Laboratorio y Catéteres" subtitle="Guía rápida de tubos, catéteres y valores de referencia." />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-bold mb-4 flex items-center"><TestTube size={20} className="mr-2 text-primary" /> Guía de Tubos</h3>
                <div className="space-y-3">
                  {[
                    { color: 'bg-purple-500', name: 'Tapa Morada', use: 'Hematología (BHC), hemoglobina glicosilada.' },
                    { color: 'bg-red-500', name: 'Tapa Roja', use: 'Química sanguínea, serología, inmunología.' },
                    { color: 'bg-yellow-500', name: 'Tapa Amarilla', use: 'Química sanguínea, pruebas de función hepática (PFH).' },
                    { color: 'bg-blue-500', name: 'Tapa Azul', use: 'Pruebas de coagulación (TP, TTP).' },
                    { color: 'bg-orange-500', name: 'Tapa Naranja', use: 'Química urgente, suero.' },
                  ].map((tube, i) => (
                    <div key={i} className="flex items-start p-3 bg-accent/50 rounded-xl">
                      <div className={`w-4 h-8 rounded-full ${tube.color} mr-4 flex-shrink-0`} />
                      <div>
                        <p className="font-bold text-sm">{tube.name}</p>
                        <p className="text-xs text-muted-foreground">{tube.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold mb-4 flex items-center"><Syringe size={20} className="mr-2 text-primary" /> Calibre de Catéteres</h3>
                <div className="space-y-3">
                  {[
                    { gauge: '14G', color: 'bg-orange-500', use: 'Cirugías mayores, trauma, reanimación (alto flujo).' },
                    { gauge: '16G', color: 'bg-gray-400', use: 'Cirugía, trauma, transfusiones rápidas.' },
                    { gauge: '18G', color: 'bg-green-500', use: 'Transfusiones, cirugía, administración de fluidos rápidos.' },
                    { gauge: '20G', color: 'bg-pink-400', use: 'Uso general, medicamentos, hidratación estándar.' },
                    { gauge: '22G', color: 'bg-blue-500', use: 'Pacientes pediátricos, geriátricos, venas frágiles.' },
                    { gauge: '24G', color: 'bg-yellow-500', use: 'Neonatos, venas muy frágiles.' },
                  ].map((catheter, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full ${catheter.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                          {catheter.gauge}
                        </div>
                        <span className="text-xs text-muted-foreground">{catheter.use}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-xl font-bold mb-4 flex items-center"><Activity size={20} className="mr-2 text-primary" /> Valores de Referencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-sm mb-2 text-primary">Biometría Hemática (BHC)</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between border-b border-border py-1"><span>Hemoglobina (Hgb)</span> <span className="font-medium">12-16 (M) | 14-18 (H) g/dL</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Hematocrito (Hct)</span> <span className="font-medium">37-47% (M) | 42-52% (H)</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Leucocitos (WBC)</span> <span className="font-medium">4,500 - 11,000 /mm³</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Plaquetas (PLT)</span> <span className="font-medium">150,000 - 450,000 /mm³</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-2 text-primary">Química Sanguínea (QSC)</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between border-b border-border py-1"><span>Glucosa Ayunas</span> <span className="font-medium">70 - 100 mg/dL</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Creatinina</span> <span className="font-medium">0.6 - 1.2 mg/dL</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Urea</span> <span className="font-medium">15 - 45 mg/dL</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Ácido Úrico</span> <span className="font-medium">2.4 - 7.0 mg/dL</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-2 text-primary">Pruebas de Coagulación</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between border-b border-border py-1"><span>TP</span> <span className="font-medium">11 - 13.5 seg</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>TTP</span> <span className="font-medium">25 - 35 seg</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-2 text-primary">Electrolitos (ESC)</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between border-b border-border py-1"><span>Sodio (Na+)</span> <span className="font-medium">135 - 145 mEq/L</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Potasio (K+)</span> <span className="font-medium">3.5 - 5.0 mEq/L</span></li>
                    <li className="flex justify-between border-b border-border py-1"><span>Cloro (Cl-)</span> <span className="font-medium">98 - 107 mEq/L</span></li>
                  </ul>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 italic">Nota: Los valores pueden variar según el laboratorio local.</p>
            </Card>
          </motion.div>
        );

      case 'calculadoras':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <SectionHeader title="Calculadoras Clínicas" subtitle="Fórmulas esenciales para la práctica diaria." />
            <Calculators />
          </motion.div>
        );

      case 'bitacora':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <SectionHeader title="Bitácora y Turnos" subtitle="Gestiona tus actividades clínicas y horarios de rotación de forma independiente." />
            
            <div className="flex p-1 bg-accent/50 rounded-2xl w-fit mb-6">
              <button 
                onClick={() => setBitacoraSubTab('actividades')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${bitacoraSubTab === 'actividades' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <BookOpen size={18} className="mr-2" /> Actividades
              </button>
              <button 
                onClick={() => setBitacoraSubTab('turnos')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${bitacoraSubTab === 'turnos' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Clock size={18} className="mr-2" /> Turnos y Servicios
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                {bitacoraSubTab === 'actividades' ? (
                  <Card className="sticky top-24">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Plus size={20} className="mr-2 text-primary" />
                      Nueva Actividad
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Actividad / Título</label>
                        <div className="flex space-x-2">
                          <input 
                            type="text" 
                            placeholder="Ej: Procedimiento en Sala"
                            className="flex-1 p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none min-w-0"
                            value={newBitacora.actividad}
                            onChange={(e) => setNewBitacora({ ...newBitacora, actividad: e.target.value })}
                          />
                          <button
                            onClick={async () => {
                              if (!newBitacora.actividad.trim()) return;
                              await handleAddTask(newBitacora.actividad, `Rápida`);
                              toast.success('Tarea rápida añadida');
                              setNewBitacora({ ...newBitacora, actividad: '' });
                            }}
                            disabled={!newBitacora.actividad.trim()}
                            title="Crear Tarea Rápida"
                            className="px-4 bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 font-bold rounded-xl hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                          >
                            <Clipboard size={20} className="mr-1" /> <span className="text-sm hidden sm:inline">+ Tarea</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Tipo</label>
                          <select 
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newBitacora.tipo}
                            onChange={(e) => setNewBitacora({ ...newBitacora, tipo: e.target.value })}
                          >
                            <option value="Actividad">Actividad</option>
                            <option value="Tarea">Tarea</option>
                            <option value="Consulta">Consulta</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Fecha</label>
                          <input 
                            type="date" 
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newBitacora.fecha}
                            onChange={(e) => setNewBitacora({ ...newBitacora, fecha: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Procedimientos / Detalles</label>
                        <input 
                          type="text" 
                          placeholder="Ej: 5 suturas, 2 RCP"
                          className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                          value={newBitacora.procedimientos}
                          onChange={(e) => setNewBitacora({ ...newBitacora, procedimientos: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Observaciones</label>
                        <textarea 
                          rows={3}
                          placeholder="Notas adicionales..."
                          className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none resize-none"
                          value={newBitacora.observaciones}
                          onChange={(e) => setNewBitacora({ ...newBitacora, observaciones: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3 pt-2">
                        <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-accent/5 cursor-pointer">
                          <div className="flex items-center">
                            <Clipboard size={18} className="mr-2 text-orange-500" />
                            <span className="text-sm font-medium">Añadir a Pendientes</span>
                          </div>
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            checked={newBitacora.createTask}
                            onChange={(e) => setNewBitacora({ ...newBitacora, createTask: e.target.checked })}
                          />
                        </label>
                      </div>
                      <button 
                        onClick={handleAddBitacora}
                        disabled={!newBitacora.actividad}
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                      >
                        Guardar Actividad
                      </button>
                    </div>
                  </Card>
                ) : (
                  <Card className="sticky top-24">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Clock size={20} className="mr-2 text-primary" />
                      Registrar Turno
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Sección 1: Período del Servicio */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-primary uppercase tracking-wider border-b border-border pb-2">1. Período del Servicio</h4>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Servicio Actual</label>
                          <select 
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newShift.servicioActual}
                            onChange={(e) => setNewShift({ ...newShift, servicioActual: e.target.value })}
                          >
                            <option value="">Seleccionar Servicio...</option>
                            {SERVICIOS.map(s => (
                              <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                            <option value="Otro">Otro (Especificar nombre)</option>
                          </select>
                          {newShift.servicioActual === 'Otro' && (
                              <input 
                                type="text"
                                placeholder="Especifique el servicio..."
                                className="w-full mt-2 p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                                value={newShift.customServicio}
                                onChange={(e) => setNewShift({...newShift, customServicio: e.target.value})}
                              />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Tipo de Turno</label>
                            <select 
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                              value={newShift.tipoTurno}
                              onChange={(e) => setNewShift({ ...newShift, tipoTurno: e.target.value })}
                            >
                              <option value="Mañana">Mañana</option>
                              <option value="Velada">Velada</option>
                              <option value="Guardia de 24h">Guardia de 24h</option>
                              <option value="Turno Rotativo">Turno Rotativo</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Fecha de Inicio</label>
                            <input 
                              type="date" 
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                              value={newShift.fechaInicio}
                              onChange={(e) => setNewShift({ ...newShift, fechaInicio: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Fecha de Fin</label>
                            <input 
                              type="date" 
                              className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                              value={newShift.fechaFin}
                              onChange={(e) => setNewShift({ ...newShift, fechaFin: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sección 2: Horario y Ubicación */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-primary uppercase tracking-wider border-b border-border pb-2">2. Horario y Ubicación</h4>
                        
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Días de la Semana</label>
                          <div className="flex flex-wrap gap-2">
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
                              <label key={dia} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors border ${newShift.diasSemana.includes(dia) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:bg-accent'}`}>
                                <input 
                                  type="checkbox" 
                                  className="hidden"
                                  checked={newShift.diasSemana.includes(dia)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewShift({ ...newShift, diasSemana: [...newShift.diasSemana, dia] });
                                    } else {
                                      setNewShift({ ...newShift, diasSemana: newShift.diasSemana.filter(d => d !== dia) });
                                    }
                                  }}
                                />
                                {dia.substring(0, 3)}
                              </label>
                            ))}
                          </div>

                          {newShift.diasSemana.length > 0 && (
                            <div className="space-y-3 mt-4 p-4 border border-border bg-accent/5 rounded-xl block">
                              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block">Horario Específico por Día</label>
                              {newShift.diasSemana.map(dia => (
                                <div key={dia} className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-2 p-2 bg-background border border-border rounded-lg">
                                  <span className="text-sm font-bold w-full md:w-24 shrink-0">{dia}</span>
                                  <div className="flex items-center space-x-2 shrink-0">
                                     <input 
                                       type="time" 
                                       className="p-1 text-xs border border-border rounded bg-accent/20"
                                       value={newShift.horariosPorDia[dia]?.entrada || '07:00'}
                                       onChange={(e) => setNewShift({...newShift, horariosPorDia: {...newShift.horariosPorDia, [dia]: { ...(newShift.horariosPorDia[dia] || {}), entrada: e.target.value }}})} 
                                     />
                                     <span className="text-xs text-muted-foreground">-</span>
                                     <input 
                                       type="time" 
                                       className="p-1 text-xs border border-border rounded bg-accent/20"
                                       value={newShift.horariosPorDia[dia]?.salida || '19:00'}
                                       onChange={(e) => setNewShift({...newShift, horariosPorDia: {...newShift.horariosPorDia, [dia]: { ...(newShift.horariosPorDia[dia] || {}), salida: e.target.value }}})} 
                                     />
                                  </div>
                                  <label className="flex items-center text-xs ml-auto cursor-pointer font-medium p-1 bg-teal-500/10 text-teal-600 rounded">
                                     <input 
                                       type="checkbox" 
                                       className="mr-1.5 rounded text-teal-500 focus:ring-teal-500"
                                       checked={newShift.diaAcademico.includes(dia)}
                                       onChange={(e) => {
                                         if(e.target.checked) setNewShift({...newShift, diaAcademico: [...newShift.diaAcademico, dia]});
                                         else setNewShift({...newShift, diaAcademico: newShift.diaAcademico.filter(d => d !== dia)});
                                       }}
                                     /> 
                                     Día Académico
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Ubicación / Piso</label>
                          <input 
                            type="text" 
                            placeholder="Ej: Sala de Partos, Piso 3"
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newShift.ubicacionPiso}
                            onChange={(e) => setNewShift({ ...newShift, ubicacionPiso: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Personal a Cargo / Tutor</label>
                          <input 
                            type="text" 
                            placeholder="Nombre del Dr/a o Enfermero/a"
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newShift.personalCargo}
                            onChange={(e) => setNewShift({ ...newShift, personalCargo: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-accent/5 cursor-pointer">
                          <div className="flex items-center">
                            <Calendar size={18} className="mr-2 text-primary" />
                            <span className="text-sm font-medium">Sincronizar Calendario</span>
                          </div>
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                            checked={newShift.syncCalendar}
                            onChange={(e) => setNewShift({ ...newShift, syncCalendar: e.target.checked })}
                          />
                        </label>
                      </div>
                      <button 
                        onClick={handleAddShift}
                        disabled={!newShift.servicioActual && newShift.tipoTurno !== 'X/L' && newShift.tipoTurno !== 'D/A'}
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                      >
                        Registrar Turno
                      </button>
                    </div>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                {bitacoraSubTab === 'actividades' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Historial de Actividades</h3>
                      <div className="text-sm text-muted-foreground font-medium">
                        {bitacoraEntries.length} registros
                      </div>
                    </div>

                    <div className="space-y-4">
                      {bitacoraEntries.length > 0 ? (
                        <>
                          {bitacoraEntries
                            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                            .slice((bitacoraPage - 1) * itemsPerPage, bitacoraPage * itemsPerPage)
                            .map((entry) => (
                              <Card key={entry.id} className="group hover:border-primary transition-all">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${entry.completado ? 'bg-green-500' : entry.tipo === 'Tarea' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                    <div>
                                      <h4 className="font-bold text-lg">{entry.actividad}</h4>
                                      <div className="flex items-center space-x-2 text-xs text-muted-foreground font-bold uppercase">
                                        <span>{entry.tipo}</span>
                                        <span>•</span>
                                        <span>{entry.fecha}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={async () => {
                                      if (confirm('¿Eliminar esta entrada de la bitácora?')) {
                                        try {
                                          await deleteDoc(doc(getDb(), 'bitacora', entry.id));
                                          toast.success('Entrada eliminada');
                                        } catch (error) {
                                          handleFirestoreError(error, OperationType.DELETE, `bitacora/${entry.id}`);
                                        }
                                      }
                                    }}
                                    className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  <div className="p-3 bg-accent/30 rounded-xl">
                                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Procedimientos</p>
                                    <p className="text-sm">{entry.procedimientos || 'Sin procedimientos registrados'}</p>
                                  </div>
                                  {entry.observaciones && (
                                    <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                      <p className="text-xs font-bold text-primary uppercase mb-1">Observaciones</p>
                                      <p className="text-sm italic">"{entry.observaciones}"</p>
                                    </div>
                                  )}
                                </div>
                              </Card>
                            ))
                          }
                          {/* Pagination Controls */}
                          {bitacoraEntries.length > itemsPerPage && (
                            <div className="flex justify-center items-center space-x-4 mt-6">
                              <button 
                                disabled={bitacoraPage === 1}
                                onClick={() => setBitacoraPage(p => p - 1)}
                                className="p-2 rounded-lg bg-accent disabled:opacity-30"
                              >
                                <ChevronRight size={20} className="rotate-180" />
                              </button>
                              <span className="text-sm font-bold">Página {bitacoraPage} de {Math.ceil(bitacoraEntries.length / itemsPerPage)}</span>
                              <button 
                                disabled={bitacoraPage === Math.ceil(bitacoraEntries.length / itemsPerPage)}
                                onClick={() => setBitacoraPage(p => p + 1)}
                                className="p-2 rounded-lg bg-accent disabled:opacity-30"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
                          <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                          <p className="text-muted-foreground font-medium">No hay actividades registradas.</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Historial de Turnos</h3>
                      <div className="text-sm text-muted-foreground font-medium">
                        {shiftLogs.length} turnos
                      </div>
                    </div>

                    <div className="space-y-4">
                      {shiftLogs.length > 0 ? (
                        <>
                          {shiftLogs
                            .sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime())
                            .slice((shiftsPage - 1) * itemsPerPage, shiftsPage * itemsPerPage)
                            .map((log) => (
                              <Card key={log.id} className="group hover:border-primary transition-all">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                                      <Clock size={20} />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-lg">{log.servicioActual}</h4>
                                      <div className="flex items-center space-x-2 text-xs text-muted-foreground font-bold uppercase">
                                        <span>{log.tipoTurno}</span>
                                        <span>•</span>
                                        <span>{log.fechaInicio} al {log.fechaFin}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={async () => {
                                      if (confirm('¿Eliminar este registro y todos los turnos asociados en el calendario?')) {
                                        try {
                                          await deleteDoc(doc(getDb(), 'shift_logs', log.id));
                                          
                                          // Delete associated shifts in cascade
                                          const associatedShifts = shifts.filter(s => s.shiftLogId === log.id);
                                          const deletePromises = associatedShifts.map(s => deleteDoc(doc(getDb(), 'shifts', s.id)));
                                          await Promise.all(deletePromises);
                                          
                                          toast.success('Registro y turnos eliminados');
                                        } catch (error) {
                                          handleFirestoreError(error, OperationType.DELETE, `shift_logs/${log.id}`);
                                        }
                                      }
                                    }}
                                    className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-accent/30 rounded-xl">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Rotación</p>
                                    <p className="text-sm font-bold">{log.servicioActual}</p>
                                  </div>
                                  <div className="p-3 bg-accent/30 rounded-xl">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Ubicación</p>
                                    <p className="text-sm font-bold">{log.ubicacionPiso || 'N/A'}</p>
                                  </div>
                                  <div className="col-span-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                                    <p className="text-[10px] font-black text-primary uppercase mb-1">Personal a Cargo / Tutor</p>
                                    <p className="text-sm font-medium">{log.personalCargo || 'No especificado'}</p>
                                  </div>
                                </div>
                              </Card>
                            ))
                          }
                          {/* Pagination Controls */}
                          {shiftLogs.length > itemsPerPage && (
                            <div className="flex justify-center items-center space-x-4 mt-6">
                              <button 
                                disabled={shiftsPage === 1}
                                onClick={() => setShiftsPage(p => p - 1)}
                                className="p-2 rounded-lg bg-accent disabled:opacity-30"
                              >
                                <ChevronRight size={20} className="rotate-180" />
                              </button>
                              <span className="text-sm font-bold">Página {shiftsPage} de {Math.ceil(shiftLogs.length / itemsPerPage)}</span>
                              <button 
                                disabled={shiftsPage === Math.ceil(shiftLogs.length / itemsPerPage)}
                                onClick={() => setShiftsPage(p => p + 1)}
                                className="p-2 rounded-lg bg-accent disabled:opacity-30"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
                          <Clock size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                          <p className="text-muted-foreground font-medium">No hay turnos registrados.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return <div>Sección en construcción</div>;
    }
  };

  return (
    <ThemeProviderAny attribute="class" defaultTheme="light" enableSystem={false}>
      {isAuthLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-background medical-gradient">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40"
          >
            <HeartPulse className="text-white" size={32} />
          </motion.div>
        </div>
      ) : !user || !userProfile ? (
        <div className="min-h-screen bg-background medical-gradient flex items-center justify-center p-6">
          <GlassCard className="max-w-md w-full p-10 text-center space-y-8">
            <div className="w-20 h-20 bg-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/30 -rotate-6">
              <HeartPulse className="text-white" size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter">Vita<span className="text-primary">Student</span></h1>
              <p className="text-muted-foreground font-medium">Tu repositorio clínico personal.</p>
            </div>
            <button 
              onClick={handleLogin}
              disabled={isLoginLoading}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              {isLoginLoading ? <RotateCw className="animate-spin" size={20} /> : <div className="p-1 bg-white/20 rounded-lg"><Home size={16}/> </div>}
              <span>Entrar con Google</span>
            </button>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Exclusivo para Internos y Residentes</p>
          </GlassCard>
        </div>
      ) : (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
          <Toaster position="top-right" richColors closeButton />
          <NotificationSystem />
          
          {/* Main Sidebar Desktop */}
          <aside className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-500 ease-in-out relative z-50 ${isSidebarOpen ? 'w-72' : 'w-24'}`}>
            <div className={`p-6 flex items-center ${isSidebarOpen ? 'justify-start space-x-4' : 'justify-center'} mb-8`}>
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 shrink-0">
                <HeartPulse className="text-white" size={28} />
              </div>
              {isSidebarOpen && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <h1 className="text-2xl font-black tracking-tighter leading-none">Vita<span className="text-primary">Student</span></h1>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Alpha v2.0</span>
                </motion.div>
              )}
            </div>

            <nav className="flex-grow px-4 space-y-1.5 scrollbar-hide overflow-y-auto">
              <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={LayoutGrid} label="Servicios" active={activeTab === 'servicios'} onClick={() => setActiveTab('servicios')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={Stethoscope} label="Práctica Clínica" active={activeTab === 'practica'} onClick={() => setActiveTab('practica')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={Pill} label="Farmacología" active={activeTab === 'farmacologia'} onClick={() => setActiveTab('farmacologia')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={TestTube} label="Laboratorio" active={activeTab === 'laboratorio'} onClick={() => setActiveTab('laboratorio')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={Calculator} label="Cálculos" active={activeTab === 'calculadoras'} onClick={() => setActiveTab('calculadoras')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={FileText} label="Protocolos" active={activeTab === 'protocolos'} onClick={() => setActiveTab('protocolos')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={Calendar} label="Bitácora" active={activeTab === 'bitacora'} onClick={() => setActiveTab('bitacora')} collapsed={!isSidebarOpen} />
              <SidebarItem icon={Brain} label="Fundamentos" active={activeTab === 'fundamentos'} onClick={() => setActiveTab('fundamentos')} collapsed={!isSidebarOpen} />
            </nav>

            <div className="p-4 mt-auto space-y-1.5">
              <SidebarItem icon={User} label="Mi Perfil" active={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')} collapsed={!isSidebarOpen} />
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-full flex items-center justify-center py-3 text-muted-foreground hover:bg-accent/50 rounded-xl transition-all"
              >
                <div className={`transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronRight size={20} />
                </div>
              </button>
            </div>
          </aside>

          {/* Main Layout Content */}
          <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden relative">
            {/* Upper Toolbar */}
            <header className="h-20 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-40">
              <div className="flex items-center space-x-4">
                <div className="lg:hidden w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-2 shadow-lg shadow-primary/20">
                  <HeartPulse className="text-white" size={20} />
                </div>
                <div className="hidden sm:block">
                   <h2 className="text-xl font-black tracking-tight text-foreground capitalize">{activeTab === 'dashboard' ? 'Centro de Comando' : `Módulo de ${activeTab}`}</h2>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{userProfile?.hospital || 'Hospital Universitario'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-5">
                <div className="relative group hidden md:block" onClick={() => setIsSearchOpen(true)}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    readOnly
                    placeholder="Búsqueda Global..." 
                    className="w-80 bg-accent/30 border border-border/50 pl-11 pr-4 py-2.5 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:bg-card focus:border-primary outline-none transition-all shadow-sm cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2.5 bg-accent/30 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
                  </button>
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2.5 bg-accent/30 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                <div className="h-8 w-[1px] bg-border mx-2" />

                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveTab('perfil')}>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-foreground leading-none">{userProfile?.nombre?.split(' ')[0]}</p>
                    <p className="text-[9px] font-bold text-primary uppercase tracking-tighter mt-1">{userProfile?.rol || 'Interno'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-400 p-[2px] shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-[10px] bg-card overflow-hidden flex items-center justify-center border-2 border-card">
                       {user?.photoURL ? (
                         <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                         <User size={20} className="text-primary" />
                       )}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-grow overflow-y-auto scrollbar-hide p-8 medical-gradient relative z-10">
               <div className="max-w-7xl mx-auto h-full pb-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-full"
                    >
                      {renderContent()}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </main>

            {/* Application Footer */}
            <footer className="h-14 border-t border-border bg-card/30 backdrop-blur-md flex items-center justify-between px-8 text-[10px] text-muted-foreground font-bold tracking-widest uppercase relative z-40 shrink-0">
               <div>© 2024 VitaStudent Alpha</div>
               <div className="flex items-center space-x-6">
                  <button className="hover:text-primary transition-colors flex items-center space-x-2" onClick={() => setIsFeedbackModalOpen(true)}>
                    <MessageSquare size={12} />
                    <span>Feedback</span>
                  </button>
                  <button className="hover:text-destructive transition-colors flex items-center space-x-2" onClick={handleLogout}>
                    <LogOut size={12} />
                    <span>Cerrar Sesión</span>
                  </button>
               </div>
            </footer>
          </div>

          {/* Feedback Modal */}
          <AnimatePresence>
            {isFeedbackModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-card border border-border w-full max-w-md rounded-3xl p-8 shadow-2xl"
                >
                  <h3 className="text-2xl font-black mb-2">Enviar Feedback</h3>
                  <p className="text-muted-foreground text-sm mb-6">Tu opinión nos ayuda a mejorar la herramienta.</p>
                  <textarea 
                    className="w-full h-32 p-4 rounded-2xl border border-border bg-accent/30 focus:ring-2 focus:ring-primary outline-none resize-none mb-6 text-sm font-medium"
                    placeholder="Escribe tus sugerencias aquí..."
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button onClick={() => setIsFeedbackModalOpen(false)} className="flex-grow py-3 rounded-xl font-bold hover:bg-accent transition-colors">Cancelar</button>
                    <button onClick={handleSendFeedback} className="flex-grow py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">Enviar</button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Drug Detail Modal */}
          <AnimatePresence>
            {selectedDrug && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedDrug(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col"
                >
                  <div className="h-3 w-full" style={{ backgroundColor: selectedDrug.color }} />
                  <div className="p-8 flex items-center justify-between border-b border-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary shadow-inner">
                        {React.createElement(ICON_MAP[selectedDrug.icon] || Pill, { size: 32 })}
                      </div>
                      <div>
                        <h3 className="text-4xl font-black tracking-tight">{selectedDrug.nombreGenerico}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{selectedDrug.familia}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedDrug(null)} className="p-3 bg-accent/50 hover:bg-accent rounded-full transition-all"><X size={24} /></button>
                  </div>
                  <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    {/* Content sections same as before but styled with the command center aesthetic */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <section className="space-y-4">
                         <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center space-x-2">
                           <Activity size={14} /> <span>Mecanismo de Acción</span>
                         </h4>
                         <GlassCard className="p-6 space-y-4">
                            <div>
                              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Diana Terapéutica</p>
                              <p className="text-sm font-bold">{selectedDrug.mecanismoAccion.dianaTerapeutica}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Efecto Sistémico</p>
                              <p className="text-sm font-bold">{selectedDrug.mecanismoAccion.efectoSistemico}</p>
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">{selectedDrug.mecanismoAccion.fisiopatologiaAccion}</p>
                         </GlassCard>
                       </section>

                       <section className="space-y-4">
                         <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center space-x-2">
                           <Clock size={14} /> <span>Farmacocinética</span>
                         </h4>
                         <div className="grid grid-cols-2 gap-4">
                            <GlassCard className="p-4 text-center">
                              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Vida Media</p>
                              <p className="text-sm font-bold text-primary">{selectedDrug.farmacocinetica.vidaMedia}</p>
                            </GlassCard>
                            <GlassCard className="p-4 text-center">
                              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Inicio Acción</p>
                              <p className="text-sm font-bold text-primary">{selectedDrug.farmacocinetica.inicioAccion}</p>
                            </GlassCard>
                            <GlassCard className="col-span-2 p-4">
                              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Metabolismo y Excreción</p>
                              <p className="text-sm font-bold">{selectedDrug.farmacocinetica.metabolismoExcrecion}</p>
                            </GlassCard>
                         </div>
                       </section>
                    </div>

                    <section className="space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center space-x-2">
                         <Stethoscope size={14} /> <span>Perfil Clínico y Seguridad</span>
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-3xl">
                            <p className="text-[10px] font-black text-destructive uppercase mb-2">Contraindicaciones</p>
                            <p className="text-xs font-bold leading-relaxed">{selectedDrug.contraindicaciones}</p>
                          </div>
                          <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
                            <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Efectos Adversos</p>
                            <p className="text-xs font-bold leading-relaxed">{selectedDrug.efectosAdversos}</p>
                          </div>
                          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl">
                            <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Presentación</p>
                            <p className="text-xs font-bold leading-relaxed">{selectedDrug.presentaciones}</p>
                          </div>
                       </div>
                    </section>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Comparison Modal */}
          <AnimatePresence>
            {isCompareModalOpen && (
               <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCompareModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-card border border-border w-full max-w-6xl max-h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden">
                    <div className="p-8 border-b border-border flex justify-between items-center">
                       <h3 className="text-3xl font-black flex items-center space-x-3">
                         <ArrowUpDown className="text-primary" />
                         <span>Comparación Analítica</span>
                       </h3>
                       <button onClick={() => setIsCompareModalOpen(false)} className="p-3 bg-accent rounded-full"><X /></button>
                    </div>
                    <div className="flex-grow overflow-x-auto p-8 scrollbar-hide">
                       <table className="w-full border-collapse">
                          <thead>
                             <tr>
                                <th className="text-left p-6 text-[10px] font-black uppercase text-muted-foreground border-b border-border w-1/5">Variable</th>
                                {selectedDrugsToCompare.map(drug => (
                                  <th key={drug.id} className="p-6 border-b border-border w-1/5 text-center">
                                    <div className="flex flex-col items-center space-y-2">
                                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                         {React.createElement(ICON_MAP[drug.icon] || Pill, { size: 24 })}
                                      </div>
                                      <span className="font-black text-base">{drug.nombreGenerico}</span>
                                    </div>
                                  </th>
                                ))}
                             </tr>
                          </thead>
                          <tbody className="text-sm font-medium">
                             {[
                               { label: 'Diana Terapéutica', key: 'mecanismoAccion.dianaTerapeutica' },
                               { label: 'Efecto Sistémico', key: 'mecanismoAccion.efectoSistemico' },
                               { label: 'Vida Media', key: 'farmacocinetica.vidaMedia' },
                               { label: 'Inicio Acción', key: 'farmacocinetica.inicioAccion' },
                               { label: 'Excreción', key: 'farmacocinetica.metabolismoExcrecion' },
                               { label: 'Contraindicaciones', key: 'contraindicaciones', destructive: true }
                             ].map(row => (
                               <tr key={row.label} className="hover:bg-accent/20 transition-colors">
                                 <td className="p-6 border-b border-border text-[10px] font-black text-muted-foreground uppercase">{row.label}</td>
                                 {selectedDrugsToCompare.map(drug => {
                                   const val = row.key.split('.').reduce((obj, k) => obj?.[k], drug);
                                   return (
                                     <td key={drug.id} className={`p-6 border-b border-border text-center ${row.destructive ? 'text-destructive font-bold' : ''}`}>
                                       {val}
                                     </td>
                                   );
                                 })}
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </motion.div>
               </div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-[100] md:bottom-10 md:right-10">
            <AnimatePresence>
              {isFabOpen && (
                <div className="flex flex-col items-end space-y-4 mb-4">
                    <motion.button 
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.8 }}
                      onClick={() => { 
                        const today = new Date();
                        const monthKey = `${today.getMonth() + 1}-${today.getFullYear()}`;
                        const monthlyService = monthlyServices[monthKey];
                        setNewShift({ 
                          ...newShift, 
                          servicioActual: monthlyService || '',
                          fechaInicio: today.toISOString().split('T')[0],
                          fechaFin: today.toISOString().split('T')[0]
                        });
                        setIsShiftModalOpen(true); 
                        setIsFabOpen(false); 
                      }}
                      className="flex items-center space-x-3 bg-card border border-border p-3 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm font-black text-primary"
                    >
                    <span>Turno Nuevo</span>
                    <div className="p-2 bg-primary/10 rounded-xl"><Clock size={20} /></div>
                  </motion.button>
                  <motion.button 
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    onClick={() => { setIsBitacoraModalOpen(true); setIsFabOpen(false); }}
                    className="flex items-center space-x-3 bg-card border border-border p-3 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm font-black text-orange-500"
                  >
                    <span>Actividad Bitácora</span>
                    <div className="p-2 bg-orange-500/10 rounded-xl"><BookOpen size={20} /></div>
                  </motion.button>
                  <motion.button 
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    onClick={() => { setDrugSearch(''); setActiveTab('farmacologia'); setIsFabOpen(false); }}
                    className="flex items-center space-x-3 bg-card border border-border p-3 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm font-black text-blue-500"
                  >
                    <span>Fármaco Rápido</span>
                    <div className="p-2 bg-blue-500/10 rounded-xl"><Pill size={20} /></div>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsFabOpen(!isFabOpen)}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isFabOpen ? 'bg-destructive text-white rotate-45' : 'bg-primary text-white hover:scale-110'}`}
            >
              <Plus size={isFabOpen ? 28 : 32} />
            </button>
          </div>

          {/* Calendar Day Detail Modal */}
          <AnimatePresence>
            {isCalendarDayModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCalendarDayModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-card border border-border w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-border bg-accent/5 flex justify-between items-center text-center">
                    <div className="flex-grow">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{new Date(clickedDateStr + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long' })}</p>
                      <h3 className="text-xl font-black">{new Date(clickedDateStr + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</h3>
                    </div>
                    <button onClick={() => setIsCalendarDayModalOpen(false)} className="p-2 hover:bg-accent rounded-full absolute right-4 top-4"><X size={20}/></button>
                  </div>
                  
                  <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
                    {(() => {
                      const dayShifts = shifts.filter(s => s.date === clickedDateStr);
                      return dayShifts.length > 0 ? (
                        dayShifts.map((s, idx) => (
                          <div key={idx} className="p-4 rounded-2xl border border-border bg-accent/10 relative overflow-hidden group">
                             <div className="absolute left-0 top-0 w-1.5 h-full" style={{ backgroundColor: s.color }} />
                             <div className="flex justify-between items-start mb-1">
                               <div>
                                 <h4 className="font-black text-sm uppercase">{s.servicio || 'Sin servicio'}</h4>
                                 <p className="text-xs font-bold text-muted-foreground">{s.startTime} - {s.endTime}</p>
                               </div>
                               <div className="flex items-center gap-1">
                                 <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s.type}</span>
                                 {shiftToDelete === s.id ? (
                                   <div className="flex items-center gap-1">
                                     <button 
                                       onClick={async (e) => {
                                         e.stopPropagation();
                                         const tid = s.id;
                                         const loadingToast = toast.loading('Borrando...');
                                         try {
                                           await deleteDoc(doc(db, 'shifts', tid));
                                           toast.success('Turno eliminado', { id: loadingToast });
                                           setShifts(prev => prev.filter(ps => ps.id !== tid));
                                           setShiftToDelete(null);
                                         } catch (err) {
                                           console.error('Delete shift error:', err);
                                           toast.error('Error al borrar', { id: loadingToast });
                                         }
                                       }}
                                       className="p-2 bg-rose-500 text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase"
                                     >
                                       SÍ
                                     </button>
                                     <button 
                                       onClick={(e) => { e.stopPropagation(); setShiftToDelete(null); }}
                                       className="p-2 bg-accent text-muted-foreground rounded-xl transition-all text-[10px] font-black uppercase"
                                     >
                                       NO
                                     </button>
                                   </div>
                                 ) : (
                                   <button 
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setShiftToDelete(s.id);
                                     }}
                                     className="p-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                                   >
                                     <Trash2 size={16} />
                                   </button>
                                 )}
                               </div>
                             </div>
                             {s.ubicacion?.trim() && <p className="text-[10px] text-muted-foreground mt-1 text-left">📍 {s.ubicacion}</p>}
                             {s.checklistRelevo?.trim() && <p className="text-[10px] italic text-muted-foreground mt-1 border-l-2 border-border pl-2 text-left">{s.checklistRelevo}</p>}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <Activity className="mx-auto mb-4 text-muted-foreground/30" size={48} />
                          <p className="text-sm font-bold text-muted-foreground">No hay turnos registrados</p>
                        </div>
                      );
                    })()}

                    <button 
                      onClick={() => {
                        const dateObj = new Date(clickedDateStr + 'T12:00:00');
                        const monthKey = `${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
                        const monthlyService = monthlyServices[monthKey];
                        setNewShift({ 
                          ...newShift, 
                          servicioActual: monthlyService || '',
                          fechaInicio: clickedDateStr, 
                          fechaFin: clickedDateStr 
                        });
                        setIsShiftModalOpen(true);
                        setIsCalendarDayModalOpen(false);
                      }}
                      className="w-full py-4 bg-primary/10 text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                    >
                      <Plus size={16} className="mr-2" /> Programar Turno
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </ThemeProviderAny>
  );
}

export default App;
