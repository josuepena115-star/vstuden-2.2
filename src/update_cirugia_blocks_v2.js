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
                             <p className="text-muted-foreground">El éxito quirúrgico depende de la <strong>cadena de asepsia</strong>. Un fallo en cualquier eslabón compromete todo el procedimiento:</p>
                             <div className="flex items-center space-x-2 text-sm text-primary font-medium flex-wrap gap-y-2 mt-2">
                               <span className="bg-primary/10 px-2 py-1 rounded border border-primary/20">Lavado de manos quirúrgico</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded border border-primary/20">Vestimenta estéril (bata y guantes)</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded border border-primary/20">Preparación del campo operatorio</span>
                               <ChevronRight size={16} />
                               <span className="bg-primary/10 px-2 py-1 rounded border border-primary/20">Mantenimiento de la técnica estéril</span>
                             </div>
                             <div className="mt-3 text-xs text-muted-foreground bg-accent p-2 rounded">
                               <strong className="text-foreground">Nota de Enfermería:</strong> La "conciencia quirúrgica" implica reportar inmediatamente cualquier transgresión de la técnica estéril, incluso si nadie más lo notó.
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
                            <div className="p-4 bg-gray-500/10 border-t-4 border-gray-500 rounded-b-xl shadow-sm">
                              <h5 className="font-bold text-gray-700 flex items-center gap-2"><MapPin size={16}/> Zona Negra<br/><span className="text-xs font-normal">(No Restringida)</span></h5>
                              <p className="text-xs text-muted-foreground mt-2">Área de la frontera o zona de amortiguamiento. Incluye recepción, vestidores, baños y oficinas. Aquí se permite el uso del uniforme institucional (pijama), pero es el punto donde se debe realizar el cambio a ropa quirúrgica exclusiva del servicio.</p>
                            </div>
                            <div className="p-4 bg-yellow-500/10 border-t-4 border-yellow-500 rounded-b-xl shadow-sm">
                              <h5 className="font-bold text-yellow-700 flex items-center gap-2"><MapPin size={16}/> Zona Gris<br/><span className="text-xs font-normal">(Semirestringida)</span></h5>
                              <p className="text-xs text-muted-foreground mt-2">Instalaciones anexas al quirófano. Requiere el porte visible de pijama quirúrgica de dos piezas, gorro (cubriendo todo el cabello) y mascarilla. Incluye pasillos internos, sala de recuperación (URPA), lavabos quirúrgicos y la central de esterilización (CEyE).</p>
                            </div>
                            <div className="p-4 bg-red-500/10 border-t-4 border-red-500 rounded-b-xl shadow-sm">
                              <h5 className="font-bold text-red-700 flex items-center gap-2"><MapPin size={16}/> Zona Blanca<br/><span className="text-xs font-normal">(Restringida)</span></h5>
                              <p className="text-xs text-muted-foreground mt-2">Es el Quirófano propiamente dicho. Sala de operaciones. El aire está filtrado (filtros HEPA) y existe presión positiva para expulsar el aire y evitar que microorganismos de los pasillos entren a la sala. Es obligatorio portar mascarilla bien ajustada.</p>
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
                    
`;
  
  code = code.substring(0, startIndex) + newBlocks + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated blocks successfully");
} else {
  console.log("Could not find start or end index.");
}
