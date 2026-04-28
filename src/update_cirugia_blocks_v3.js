import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIndex = code.indexOf("{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_entorno' && !selectedDisease && (");
const endIndexStr = "{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_zonificacion' && !selectedDisease && (";
const endIndex = code.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newBlocks = `
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

                          {/* 2. Protocolos de Flujo */}
                          <div className="space-y-3 mt-6">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><RotateCw size={20}/> 2. Protocolos de Flujo (Barreras de Movimiento)</h5>
                            <p className="text-muted-foreground">La contención biológica depende de cómo se mueven las personas y los objetos en el espacio.</p>
                            <div className="bg-accent/30 p-4 border rounded-xl space-y-3">
                               <div className="flex items-start gap-3">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><ArrowUpDown size={16} className="text-primary"/></div>
                                 <div>
                                   <strong className="text-foreground">Flujo Unidireccional:</strong>
                                   <p className="text-xs text-muted-foreground mt-1">El instrumental estéril entra por una vía y el material contaminado sale por otra (zona de transferencia de sucio) para prohibir el cruce de vías e impedir la contaminación cruzada.</p>
                                 </div>
                               </div>
                               <div className="flex items-start gap-3">
                                 <div className="p-2 bg-background rounded-full border shadow-sm mt-1"><Settings size={16} className="text-primary"/></div>
                                 <div>
                                   <strong className="text-foreground flex items-center gap-2">Puertas Cerradas <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">Norma Crítica</span></strong>
                                   <p className="text-xs text-muted-foreground mt-1">Cada vez que una puerta se abre, la <strong>presión positiva cae</strong> y el sistema de contención se debilita. <strong>Regla de oro:</strong> "Mínima apertura de puertas durante el acto quirúrgico", el equipo completo ingresa y permanece hasta concluir, limitando el tránsito.</p>
                                 </div>
                               </div>
                            </div>
                          </div>

                          {/* 3. El Triángulo de Asepsia */}
                          <div className="space-y-3 mt-6">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><ShieldCheck size={20}/> 3. El Triángulo de Asepsia (Mecánica de Barrera)</h5>
                            <p className="text-muted-foreground">Define las barreras físicas que contienen la propia microbiota del personal y protegen la incisión.</p>
                            <div className="flex flex-col space-y-2">
                              <div className="pl-4 border-l-2 border-indigo-300 py-1">
                                <strong className="text-indigo-700">Barrera Primaria (Personal):</strong>
                                <p className="text-xs text-muted-foreground">Pijama quirúrgica, gorro envolvente, mascarilla y calzado exclusivo.</p>
                              </div>
                              <div className="pl-4 border-l-2 border-purple-300 py-1">
                                <strong className="text-purple-700">Barrera Secundaria (Campo Estéril):</strong>
                                <p className="text-xs text-muted-foreground">Batas estériles y campos quirúrgicos. Estos deben ser <strong>impermeables</strong> para evitar la capilaridad (fenómeno en el cual el líquido absorbe y transporta bacterias a través de la tela hacia el campo).</p>
                              </div>
                              <div className="pl-4 border-l-2 border-pink-300 py-1">
                                <strong className="text-pink-700">Barrera Química:</strong>
                                <p className="text-xs text-muted-foreground">El uso de antisépticos de acción residual comprobada (como la Clorhexidina al 2% o 4%) tanto para la preparación de la piel del paciente en la mesa, como para el lavado de manos quirúrgico del equipo.</p>
                              </div>
                            </div>
                          </div>

                          {/* 4. Gestión de Desechos y Bioseguridad */}
                          <div className="space-y-3 mt-6">
                            <h5 className="font-bold text-lg text-primary flex items-center gap-2"><Trash2 size={20}/> 4. Gestión de Desechos y Bioseguridad</h5>
                            <p className="text-muted-foreground">La contención no termina cuando sale el paciente, sino cuando se elimina estructuralmente el riesgo:</p>
                            
                            <div className="grid grid-cols-1 gap-2 bg-card border rounded-lg p-3">
                              <h6 className="font-bold text-sm border-b pb-2 mb-2">Clasificación de Desechos (Norma Técnica)</h6>
                              
                              <div className="flex items-center gap-3 bg-red-50 p-2 rounded">
                                <div className="w-4 h-4 rounded-full bg-red-600 shrink-0"></div>
                                <div>
                                  <strong className="text-xs text-red-900">Rojo (Infecciosos / Biológicos)</strong>
                                  <p className="text-[10px] text-red-700">Gasas impregnadas con sangre, restos de órganos, tejidos y fluidos biológicos.</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 p-2 rounded">
                                <div className="w-4 h-4 rounded bg-yellow-500 shrink-0 flex items-center justify-center"><AlertTriangle size={10} className="text-white"/></div>
                                <div>
                                  <strong className="text-xs text-yellow-900">Cortopunzantes (Guardianes / Recipientes Rígidos)</strong>
                                  <p className="text-[10px] text-yellow-800">Agujas de sutura, hojas de bisturí, trocares, ampolletas rotas.</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded">
                                <div className="w-4 h-4 rounded-full bg-gray-800 shrink-0"></div>
                                <div>
                                  <strong className="text-xs text-gray-800">Negro (Comunes)</strong>
                                  <p className="text-[10px] text-gray-600">Papeles de secado, envolturas de guantes o bultos, plásticos no contaminados con sangre.</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex bg-blue-50/50 p-3 rounded-lg border border-blue-100 gap-3 mt-2">
                              <Sparkles size={16} className="text-blue-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-blue-900">
                                <strong>Desinfección de Áreas:</strong> Se divide en limpieza <strong>concurrente</strong> (desinfección rápida y contención de derrames orgánicos durante o entre cirugías contiguas) y la limpieza <strong>terminal</strong> (desinfección exahustiva de techos, paredes, lámparas y suelos al final de la jornada).
                              </p>
                            </div>
                          </div>

                        </div>
                      </Card>
                    )}

`;
  
  code = code.substring(0, startIndex) + newBlocks + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated blocks successfully");
} else {
  console.log("Could not find start or end index.");
}
