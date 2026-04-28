const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update the newShift state
const stateInitOld = `  const [newShift, setNewShift] = useState({
    servicioActual: '',
    tipoTurno: 'Mañana',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    horaEntrada: '07:00',
    horaSalida: '19:00',
    ubicacionPiso: '',
    personalCargo: '',
    diasSemana: [] as string[],
    syncCalendar: true
  });`;

const stateInitNew = `  const [newShift, setNewShift] = useState({
    servicioActual: '',
    customServicio: '',
    tipoTurno: 'Mañana',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    horaEntrada: '07:00',
    horaSalida: '19:00',
    ubicacionPiso: '',
    personalCargo: '',
    diasSemana: [] as string[],
    horariosPorDia: {} as Record<string, { entrada: string, salida: string }>,
    diaAcademico: [] as string[],
    syncCalendar: true
  });`;

code = code.replace(stateInitOld, stateInitNew);

const resetStateOld = `    setNewShift({
      servicioActual: '',
      tipoTurno: 'Mañana',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: new Date().toISOString().split('T')[0],
      horaEntrada: '07:00',
      horaSalida: '19:00',
      ubicacionPiso: '',
      personalCargo: '',
      diasSemana: [],
      syncCalendar: true
    });`;

const resetStateNew = `    setNewShift({
      servicioActual: '',
      customServicio: '',
      tipoTurno: 'Mañana',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: new Date().toISOString().split('T')[0],
      horaEntrada: '07:00',
      horaSalida: '19:00',
      ubicacionPiso: '',
      personalCargo: '',
      diasSemana: [],
      horariosPorDia: {},
      diaAcademico: [],
      syncCalendar: true
    });`;

code = code.replace(resetStateOld, resetStateNew);

// Update `handleAddShift` logic to handle custom service
const handleAddCheckOld = `    if (!newShift.servicioActual.trim()) {
      toast.error('El servicio de rotación es obligatorio.');
      return;
    }`;

const handleAddCheckNew = `    const finalService = newShift.servicioActual === 'Otro' ? newShift.customServicio : newShift.servicioActual;
    if (!finalService.trim()) {
      toast.error('El servicio de rotación es obligatorio.');
      return;
    }`;

code = code.replace(handleAddCheckOld, handleAddCheckNew);

// Replace mapping to 'entry' inside handleAddShift
const entryDefOld = `    const entry = {
      uid: user.uid,
      ...newShift,
      createdAt: serverTimestamp()
    };`;

const entryDefNew = `    const entry = {
      uid: user.uid,
      ...newShift,
      servicioActual: finalService,
      createdAt: serverTimestamp()
    };`;

code = code.replace(entryDefOld, entryDefNew);

code = code.replaceAll('newShift.servicioActual', 'finalService');
// restore finalService calculation in the handleAddShift so it doesn't break
let handleAddRegex = /const handleAddShift = async \(\) => \{[\s\S]*?finalService = newShift\.servicioActual === 'Otro' \? newShift\.customServicio : newShift\.servicioActual;/m;
code = code.replace(handleAddRegex, (match) => match.replace("newShift.servicioActual === 'Otro'", "newShift.servicioActual === 'Otro'")); 
// Wait, replacing all `newShift.servicioActual` to `finalService` is tricky across the whole file. Let's do it carefully.

fs.writeFileSync('src/update_turnos_temp.js', code);
