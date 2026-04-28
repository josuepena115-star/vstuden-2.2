const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '<div className="grid grid-cols-1 md:grid-cols-3 gap-4">';
const endMarker = '{/* 5. El Sistema de Contención Biológica */}';
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

                          `;
  
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Update complete.');
} else {
  console.log('Could not find start or end index.');
}
