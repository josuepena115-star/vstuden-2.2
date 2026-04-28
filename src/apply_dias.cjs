const fs = require('fs');

let code = fs.readFileSync('src/update_turnos_2.cjs', 'utf8');

const regexDiasSemana = /<div className="flex flex-wrap gap-2">\s*\{\['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'\]\.map\(dia => \([\s\S]*?\}\)\)\}\s*<\/div>\s*<\/div>/g;

const customBlock = `
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
                                         value={newShift.horariosPorDia[dia]?.entrada || newShift.horaEntrada}
                                         onChange={(e) => setNewShift({...newShift, horariosPorDia: {...newShift.horariosPorDia, [dia]: { ...(newShift.horariosPorDia[dia] || {}), entrada: e.target.value }}})} 
                                       />
                                       <span className="text-xs text-muted-foreground">-</span>
                                       <input 
                                         type="time" 
                                         className="p-1 text-xs border border-border rounded bg-accent/20"
                                         value={newShift.horariosPorDia[dia]?.salida || newShift.horaSalida}
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
`;

code = code.replace(regexDiasSemana, match => match + customBlock);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx fully updated!");
