import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIndex = code.indexOf('{/* CIRUGIA CUSTOM BLOCKS */}');
const endIndexStr = "{selectedService === 'Salud Comunitaria' && communitySubTab === 'inmunizaciones' && !selectedDisease && (";
const endIndex = code.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newBlocks = `
                    {/* CIRUGIA CUSTOM BLOCKS */}
                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_entorno' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Scissors size={24} />
                          <h4 className="text-xl font-bold">1. Introducción: El Sistema de Contención Biológica</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <p>El entorno quirúrgico es una unidad operativa compleja y cerrada, diseñada para minimizar la carga microbiana y garantizar la homeostasis del paciente durante procedimientos invasivos. Su funcionamiento se basa en la separación estricta de flujos (paciente, personal, material limpio y material contaminado).</p>
                          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-2">
                             <h5 className="font-bold text-primary">Mecanismo de Progresión</h5>
                             <p className="text-muted-foreground">El éxito quirúrgico depende de la cadena de asepsia:</p>
                             <div className="flex items-center space-x-2 text-sm text-primary font-medium flex-wrap gap-y-2">
                               <span className="bg-primary/10 px-2 py-1 rounded">Lavado de manos</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded">Vestimenta estéril</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded">Preparación del campo</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded">Técnica estéril</span>
                             </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_zonificacion' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Shield size={24} />
                          <h4 className="text-xl font-bold">2. Zonificación Estándar (Arquitectura Quirúrgica)</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-500/10 border-l-4 border-gray-500 rounded-r-xl">
                              <h5 className="font-bold text-gray-700">Zona Negra (No Restringida)</h5>
                              <p className="text-xs text-muted-foreground mt-2">Área de recepción, vestidores y oficinas. Aquí se permite el uso del uniforme institucional (pijama) pero se debe realizar el cambio a ropa quirúrgica exclusiva del servicio.</p>
                            </div>
                            <div className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-xl">
                              <h5 className="font-bold text-yellow-700">Zona Gris (Semirestringida)</h5>
                              <p className="text-xs text-muted-foreground mt-2">Requiere pijama quirúrgica de dos piezas, gorro (cubriendo todo el cabello) y mascarilla. Incluye pasillos internos, sala de recuperación y la central de esterilización.</p>
                            </div>
                            <div className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-xl">
                              <h5 className="font-bold text-red-700">Zona Blanca (Restringida)</h5>
                              <p className="text-xs text-muted-foreground mt-2">Es el Quirófano propiamente dicho. El aire está filtrado (filtros HEPA) y la presión es positiva para evitar que entre aire contaminado de los pasillos.</p>
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
                          <p>Los "actores" permanentes en la sala de operaciones:</p>
                          <ul className="space-y-3">
                            <li className="flex items-start bg-accent/20 p-3 rounded-lg"><strong className="w-1/3 text-primary">Mesa Quirúrgica:</strong> <span className="w-2/3 text-muted-foreground">Con controles para posiciones (Trendelenburg, litotomía, etc.).</span></li>
                            <li className="flex items-start bg-accent/20 p-3 rounded-lg"><strong className="w-1/3 text-primary">Torre de Anestesia:</strong> <span className="w-2/3 text-muted-foreground">Monitorización de signos vitales, ventilador mecánico y vaporizadores de gases.</span></li>
                            <li className="flex items-start bg-accent/20 p-3 rounded-lg"><strong className="w-1/3 text-primary">Mesa de Mayo:</strong> <span className="w-2/3 text-muted-foreground">Mesa de altura variable donde se coloca el instrumental de uso inmediato (tiempos de diéresis y hemostasia).</span></li>
                            <li className="flex items-start bg-accent/20 p-3 rounded-lg"><strong className="w-1/3 text-primary">Mesa Riñón:</strong> <span className="w-2/3 text-muted-foreground">Superficie amplia para organizar el bulto quirúrgico y el instrumental de reserva.</span></li>
                            <li className="flex items-start bg-accent/20 p-3 rounded-lg"><strong className="w-1/3 text-primary">Unidad de Electrocirugía:</strong> <span className="w-2/3 text-muted-foreground">Generador de radiofrecuencia (bisturí eléctrico). <span className="text-orange-500 font-bold block mt-1">Punto clave de enfermería: Colocación de la placa de retorno en zona muscular limpia.</span></span></li>
                          </ul>
                        </div>
                      </Card>
                    )}

                    {selectedService === 'Cirugía' && cirugiaSubTab === 'cir_instrumental' && !selectedDisease && (
                      <Card className="space-y-6">
                        <div className="flex items-center space-x-3 text-primary">
                          <Scissors size={24} />
                          <h4 className="text-xl font-bold">4. Instrumental Quirúrgico por Tiempos (El Corazón de la Cirugía)</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <div className="space-y-4">
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-red-500">
                              <h5 className="font-bold text-red-600 mb-2">Diéresis (Corte)</h5>
                              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Mangos de bisturí (#3 y #4).</li>
                                <li>Tijeras de Metzenbaum (tejido delicado).</li>
                                <li>Tijeras de Mayo (tejido fuerte).</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-blue-500">
                              <h5 className="font-bold text-blue-600 mb-2">Hemostasia (Control de sangrado)</h5>
                              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Pinzas Mosquito</li>
                                <li>Pinzas Kelly</li>
                                <li>Pinzas Rochester</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-green-500">
                              <h5 className="font-bold text-green-600 mb-2">Aprehensión (Agarre)</h5>
                              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Pinzas Allis (tejido)</li>
                                <li>Pinzas Babcock (vísceras)</li>
                                <li>Pinzas Duval (pulmón)</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-yellow-500">
                              <h5 className="font-bold text-yellow-600 mb-2">Separación (Exposición)</h5>
                              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Separadores manuales (Farabeuf)</li>
                                <li>Separadores autoestáticos (Finochietto)</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-xl shadow-sm border-l-4 border-l-purple-500">
                              <h5 className="font-bold text-purple-600 mb-2">Síntesis (Sutura)</h5>
                              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Porta-agujas de diferentes tamaños</li>
                                <li>Pinzas de disección (con y sin dientes)</li>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="p-6 bg-blue-500/10 border border-blue-200 rounded-xl space-y-4">
                             <div>
                               <h5 className="font-black text-blue-700 text-lg mb-1 tracking-wide">EQUIPO ESTÉRIL</h5>
                             </div>
                             <div className="space-y-3">
                               <div>
                                 <h6 className="font-bold text-blue-800 text-sm">Cirujano y Ayudantes:</h6>
                                 <p className="text-xs text-blue-900/80">Ejecutan el procedimiento.</p>
                               </div>
                               <div>
                                 <h6 className="font-bold text-blue-800 text-sm">Instrumentista:</h6>
                                 <p className="text-xs text-blue-900/80">Organiza las mesas, entrega el material y realiza el recuento inicial y final de gasas.</p>
                               </div>
                             </div>
                           </div>
                           <div className="p-6 bg-red-500/10 border border-red-200 rounded-xl space-y-4">
                             <div>
                               <h5 className="font-black text-red-700 text-lg mb-1 tracking-wide">EQUIPO NO ESTÉRIL</h5>
                             </div>
                             <div className="space-y-3">
                               <div>
                                 <h6 className="font-bold text-red-800 text-sm">Anestesiólogo</h6>
                               </div>
                               <div>
                                 <h6 className="font-bold text-red-800 text-sm">Circulante de Quirófano (Tu rol clave):</h6>
                                 <ul className="text-xs text-red-900/80 list-disc pl-5 space-y-1 mt-1">
                                  <li>Prepara el equipo electromédico.</li>
                                  <li>Realiza la apertura de bultos y material estéril.</li>
                                  <li>Control de material blanco: Contabiliza junto a la instrumentista antes de cerrar cavidad.</li>
                                  <li>Etiquetado y manejo de muestras histopatológicas.</li>
                                 </ul>
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
                          <h4 className="text-xl font-bold">6. Respuesta Metabólica al Acto Quirúrgico (Fisiopatología)</h4>
                        </div>
                        <div className="text-sm text-foreground space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-muted-foreground"><strong className="text-foreground">Introducción:</strong> La cirugía es un "trauma controlado". El cuerpo reacciona para sobrevivir a la agresión tisular.</p>
                          </div>
                          
                          <h5 className="font-bold text-lg pt-2 border-t">El Desenlace:</h5>
                          <div className="space-y-3">
                            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl">
                               <h5 className="font-bold text-orange-700">Hormonal</h5>
                               <p className="text-xs mt-1 text-muted-foreground">Se elevan las hormonas del estrés (Cortisol, Adrenalina, ADH). Esto causa taquicardia, vasoconstricción y retención de líquidos (oliguria transitoria).</p>
                            </div>
                            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-xl">
                               <h5 className="font-bold text-purple-700">Bioquímico</h5>
                               <p className="text-xs mt-1 text-muted-foreground">Posible acidosis metabólica si hay pérdida importante de sangre o hipoperfusión.</p>
                            </div>
                            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r-xl">
                               <h5 className="font-bold text-cyan-700">Termorregulación</h5>
                               <p className="text-xs mt-1 text-muted-foreground">El frío del quirófano y el uso de líquidos IV fríos causan Hipotermia, lo que altera la cascada de coagulación y aumenta el riesgo de sangrado.</p>
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
