const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

if (!appCode.includes(`import { ScheduleImporter }`)) {
  const importInsert = `import { ScheduleImporter } from './components/ScheduleImporter';\n`;
  // find first import
  appCode = appCode.replace(/import {/, importInsert + 'import {');
}

// Ensure the "Turno" state has a mode ('manual' | 'ai') for the cards
if (!appCode.includes('const [turnoMode, setTurnoMode]')) {
  appCode = appCode.replace(
    `const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);`,
    `const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);\n  const [turnoMode, setTurnoMode] = useState<'manual' | 'ai'>('manual');`
  );
}

// Find the modal block
const modalBlock = `                        <h3 className="text-2xl font-black flex items-center">
                          <Clock size={24} className="mr-2 text-primary" />
                          Registrar Turno
                        </h3>
                        <button onClick={() => setIsShiftModalOpen(false)} className="p-2 hover:bg-accent rounded-full">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-6">`;

const newModalBlock = `                        <h3 className="text-2xl font-black flex items-center">
                          <Clock size={24} className="mr-2 text-primary" />
                          Registrar Turno
                        </h3>
                        <div className="flex gap-2">
                           <button onClick={() => setTurnoMode('manual')} className={\`px-3 py-1.5 rounded-full text-xs font-bold \${turnoMode==='manual'?'bg-primary text-primary-foreground':'bg-accent/50 text-muted-foreground'}\`}>Manual</button>
                           <button onClick={() => setTurnoMode('ai')} className={\`px-3 py-1.5 rounded-full text-xs font-bold \${turnoMode==='ai'?'bg-primary text-primary-foreground':'bg-accent/50 text-muted-foreground'}\`}>Carga Inteligente</button>
                        </div>
                        <button onClick={() => setIsShiftModalOpen(false)} className="p-2 hover:bg-accent rounded-full">
                          <X size={20} />
                        </button>
                      </div>

                      {turnoMode === 'ai' ? (
                          <ScheduleImporter userUid={user?.uid!} onSuccess={() => setIsShiftModalOpen(false)} />
                      ) : (
                      <div className="space-y-6">`;

// Add closing brace for the manual block in the modal wrapper
// Let's dynamically find where to close the manual mode.
// Manual mode in modal ends at <div className="space-y-3 pt-2"> ... </button> </div> </Card> ...

// Wait, doing this via script regex might be painful if not precise. Let's do a simple injection at the top of the manual fields.
appCode = appCode.replace(
  `                      <div className="space-y-6">
                        {/* Sección 1: Período del Servicio */}`,
  `                      <div className="flex bg-accent/20 p-1 rounded-xl w-full mb-6 relative">
                         <button onClick={() => setTurnoMode('manual')} className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${turnoMode === 'manual' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Manual</button>
                         <button onClick={() => setTurnoMode('ai')} className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${turnoMode === 'ai' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Subir Foto/PDF</button>
                      </div>
                      
                      {turnoMode === 'ai' ? (
                        <ScheduleImporter userUid={user?.uid!} onSuccess={() => setIsShiftModalOpen(false)} />
                      ) : (
                      <div className="space-y-6">
                        {/* Sección 1: Período del Servicio */}`
);

// We need to close the `) : (` for the modal block
// Inside modal, the button is:
//                      <button 
//                        onClick={handleAddShift}
// ...
//                        Registrar Turno
//                      </button>
//                    </div>

appCode = appCode.replace(
  /                      <\/button>\n                    <\/div>\n                  <\/Card>\n                \)/g,
  `                      </button>\n                    </div>\n                    )} \n                  </Card>\n                )`
);


// Now for the desktop side layout around line 6701
appCode = appCode.replace(
  `                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Clock size={20} className="mr-2 text-primary" />
                      Registrar Turno
                    </h3>
                    <div className="space-y-6">
                      {/* Sección 1: Período del Servicio */}`,
  `                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Clock size={20} className="mr-2 text-primary" />
                      Registrar Turno
                    </h3>
                    
                    <div className="flex bg-accent/20 p-1 rounded-xl w-full mb-6 relative">
                       <button onClick={() => setTurnoMode('manual')} className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${turnoMode === 'manual' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Manual</button>
                       <button onClick={() => setTurnoMode('ai')} className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${turnoMode === 'ai' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Subir Foto/PDF</button>
                    </div>

                    {turnoMode === 'ai' ? (
                        <ScheduleImporter userUid={user?.uid!} onSuccess={() => setBitacoraSubTab('turnos')} />
                    ) : (
                    <div className="space-y-6">
                      {/* Sección 1: Período del Servicio */}`
);

// Close for the layout panel
//                      </button>
//                    </div>
//                  </Card>
//                )}
//              </div>
appCode = appCode.replace(
  /                      <\/button>\n                    <\/div>\n                  <\/Card>\n                \)}\n              <\/div>/g,
  `                      </button>\n                    </div>\n                    )} \n                  </Card>\n                )}\n              </div>`
);

fs.writeFileSync('src/App.tsx', appCode);
console.log('Done!');
