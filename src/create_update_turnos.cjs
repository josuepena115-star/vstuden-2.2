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

if (code.includes(resetStateOld)) {
  code = code.replace(resetStateOld, resetStateNew);
}

// In handleAddShift, compute finalService and use it for entry
code = code.replace(
  `  const handleAddShift = async () => {
    if (!user) return;
    
    // Validaciones robustas
    if (!newShift.servicioActual.trim()) {`,
  `  const handleAddShift = async () => {
    if (!user) return;
    
    const finalService = newShift.servicioActual === 'Otro' ? newShift.customServicio : newShift.servicioActual;
    
    // Validaciones robustas
    if (!finalService.trim()) {`
);

code = code.replace(
  `    const entry = {
      uid: user.uid,
      ...newShift,
      createdAt: serverTimestamp()
    };`,
  `    const entry = {
      uid: user.uid,
      ...newShift,
      servicioActual: finalService,
      createdAt: serverTimestamp()
    };`
);

code = code.replace(
  `        servicioActual: newShift.servicioActual,`,
  `        servicioActual: finalService,`
);
code = code.replace(
  `        servicioActual: newShift.servicioActual,`,
  `        servicioActual: finalService,`
);

code = code.replace(
  `            title: \`\${newShift.tipoTurno.substring(0, 1)}: \${newShift.servicioActual}\`,`,
  `            title: \`\${newShift.tipoTurno.substring(0, 1)}: \${finalService}\`,`
);

code = code.replace(
  `icsContent += \`SUMMARY:Turno - \${newShift.servicioActual}\\r\\n\`;`,
  `icsContent += \`SUMMARY:Turno - \${finalService}\\r\\n\`;`
);
code = code.replace(
  `icsContent += \`DESCRIPTION:Tipo de Turno: \${newShift.tipoTurno}\\\\nServicio: \${newShift.servicioActual}\\\\nHorario: \${newShift.horaEntrada} - \${newShift.horaSalida}\\\\nUbicación: \${newShift.ubicacionPiso || 'N/A'}\\\\nPersonal a cargo: \${newShift.personalCargo || 'N/A'}\\r\\n\`;`,
  `icsContent += \`DESCRIPTION:Tipo de Turno: \${newShift.tipoTurno}\\\\nServicio: \${finalService}\\\\nHorario: \${newShift.horaEntrada} - \${newShift.horaSalida}\\\\nUbicación: \${newShift.ubicacionPiso || 'N/A'}\\\\nPersonal a cargo: \${newShift.personalCargo || 'N/A'}\\r\\n\`;`
);

code = code.replace(
  "link.setAttribute('download', `Turnos_${newShift.servicioActual.replace(/\\s+/g, '_')}.ics`);",
  "link.setAttribute('download', `Turnos_${finalService.replace(/\\s+/g, '_')}.ics`);"
);

// We also need to fix dynamic times for ics and shifts map
const calendarLoopRegex = /for \(let d = new Date\(start\); d <= end; d\.setDate\(d\.getDate\(\) \+ 1\)\) \{[\s\S]*?if \(newShift.horaSalida < newShift.horaEntrada\) \{/m;

// Find the code inside the loop
const repl1Old = `          const dateString = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`;
          
          await addDoc(collection(db, 'shifts'), {
            uid: user.uid,
            title: \`\${newShift.tipoTurno.substring(0, 1)}: \${finalService}\`,
            date: dateString,
            startTime: newShift.horaEntrada,
            endTime: newShift.horaSalida,
            type: newShift.tipoTurno,
            color: shiftColor
          });`;

const repl1New = `          const dateString = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`;
          
          const dayNameMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          const currentDayName = dayNameMap[d.getDay()];
          const specificTimes = newShift.horariosPorDia[currentDayName] || { entrada: newShift.horaEntrada, salida: newShift.horaSalida };
          const tEntrada = specificTimes.entrada || newShift.horaEntrada;
          const tSalida = specificTimes.salida || newShift.horaSalida;

          const isAcademico = newShift.diaAcademico.includes(currentDayName);
          const eventTitle = isAcademico ? \`Día Académico: \${finalService}\` : \`\${newShift.tipoTurno.substring(0, 1)}: \${finalService}\`;
          const evColor = isAcademico ? '#14b8a6' : shiftColor; // teal for academic

          await addDoc(collection(db, 'shifts'), {
            uid: user.uid,
            title: eventTitle,
            date: dateString,
            startTime: tEntrada,
            endTime: tSalida,
            type: isAcademico ? 'Día Académico' : newShift.tipoTurno,
            color: evColor
          });`;

code = code.replace(repl1Old, repl1New);

// UI updates for the two instances of "Servicio Actual" 
// Replace: <option value="Otro">Otro</option>  or <option value="Otro">Otro (Especificar en Ubicación)</option>
const selectServicio1 = `                            <select 
                              className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                              value={newShift.servicioActual}
                              onChange={(e) => setNewShift({ ...newShift, servicioActual: e.target.value })}
                            >
                              <option value="">Seleccionar Servicio...</option>
                              {SERVICIOS.map(s => (
                                <option key={s.name} value={s.name}>{s.name}</option>
                              ))}
                              <option value="Otro">Otro (Especificar en Ubicación)</option>
                            </select>`;
const selectServicio1New = `                            <select 
                              className="w-full p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
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
                                className="w-full mt-2 p-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                value={newShift.customServicio}
                                onChange={(e) => setNewShift({...newShift, customServicio: e.target.value})}
                              />
                            )}`;
                            
const selectServicio2 = `                          <select 
                            className="w-full p-3 rounded-xl border border-border bg-accent/10 focus:ring-2 focus:ring-primary outline-none"
                            value={newShift.servicioActual}
                            onChange={(e) => setNewShift({ ...newShift, servicioActual: e.target.value })}
                          >
                            <option value="">Seleccionar Servicio...</option>
                            {SERVICIOS.map(s => (
                              <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                            <option value="Otro">Otro</option>
                          </select>`;
const selectServicio2New = `                          <select 
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
                          )}`;

code = code.replace(selectServicio1, selectServicio1New);
code = code.replace(selectServicio2, selectServicio2New);

fs.writeFileSync('src/update_turnos_2.cjs', code);
console.log("update_turnos_2.cjs created");
