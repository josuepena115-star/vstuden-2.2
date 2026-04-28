const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = "{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_zonificacion' && !selectedDisease && (";
const endMarker = "{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_equipo' && !selectedDisease && (";

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `{selectedService === 'Cirugía' && cirugiaSubTab === 'cir_zonificacion' && !selectedDisease && (
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
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Zona Negra */}
                            <div className="p-4 bg-gray-500/10 border-t-4 border-gray-500 rounded-b-xl shadow-sm space-y-3 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><MapPin size={48}/></div>
                              <h5 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Zona Negra <span className="font-normal text-sm opacity-70 block">(Área No Restringida)</span></h5>
                              <p className="text-xs text-muted-foreground">Es la zona de amortiguación entre el hospital general y el bloque quirúrgico.</p>
                              <div className="space-y-2 text-xs">
                                <p><strong className="text-gray-700 dark:text-gray-300">Función:</strong> Recepción de pacientes, gestión administrativa y transición de personal.</p>
                                <p><strong className="text-gray-700 dark:text-gray-300">Componentes:</strong> Vestidores, baños, oficinas de jefatura, área de transferencia de camillas.</p>
                                <p><strong className="text-gray-700 dark:text-gray-300">Vestimenta:</strong> Uniforme institucional o ropa de calle (dependiendo del área).</p>
                              </div>
                              <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded text-xs border border-gray-300 dark:border-gray-700 mt-2">
                                <strong className="text-gray-900 dark:text-gray-100 flex items-center gap-1 mb-1"><AlertCircle size={12}/> Punto Crítico:</strong> 
                                Aquí se realiza el cambio total de ropa y calzado antes de cruzar la "línea roja" hacia la zona gris.
                              </div>
                            </div>
                            
                            {/* Zona Gris */}
                            <div className="p-4 bg-yellow-500/10 border-t-4 border-yellow-500 rounded-b-xl shadow-sm space-y-3 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><MapPin size={48}/></div>
                              <h5 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg">Zona Gris <span className="font-normal text-sm opacity-70 block">(Área Semirestringida)</span></h5>
                              <p className="text-xs text-muted-foreground">Es un área limpia que requiere una disciplina de circulación estricta.</p>
                              <div className="space-y-2 text-xs">
                                <p><strong className="text-yellow-700 dark:text-yellow-400">Función:</strong> Circulación de personal y pacientes preparados, almacenamiento limpio, esterilización y recuperación postanestésica.</p>
                                <p><strong className="text-yellow-700 dark:text-yellow-400">Componentes:</strong> Pasillos internos, zona de lavado quirúrgico, cuarto de tarjas, CEyE.</p>
                                <p><strong className="text-yellow-700 dark:text-yellow-400">Vestimenta:</strong> Pijama quirúrgica completa (dos piezas), gorro (cubriendo todo el cabello), mascarilla y calzado exclusivo o botas.</p>
                              </div>
                              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded text-xs border border-yellow-200 dark:border-yellow-700 mt-2">
                                <strong className="text-yellow-900 dark:text-yellow-200 flex items-center gap-1 mb-1"><AlertCircle size={12}/> Punto Crítico:</strong> 
                                En esta zona se realiza el <strong className="text-yellow-900 dark:text-yellow-200">Lavado Quirúrgico de Manos</strong> justo antes de entrar a la zona blanca.
                              </div>
                            </div>

                            {/* Zona Blanca */}
                            <div className="p-4 bg-red-500/10 border-t-4 border-red-500 rounded-b-xl shadow-sm space-y-3 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><MapPin size={48}/></div>
                              <h5 className="font-bold text-red-800 dark:text-red-300 text-lg">Zona Blanca <span className="font-normal text-sm opacity-70 block">(Área Restringida)</span></h5>
                              <p className="text-xs text-muted-foreground">Es el área de máxima esterilidad.</p>
                              <div className="space-y-2 text-xs">
                                <p><strong className="text-red-700 dark:text-red-400">Función:</strong> Realización del acto quirúrgico.</p>
                                <p><strong className="text-red-700 dark:text-red-400">Componentes:</strong> El quirófano propiamente dicho.</p>
                                <div className="pl-2 border-l border-red-200 dark:border-red-800/50">
                                  <strong className="text-red-700 dark:text-red-400 block mb-1">Características Técnicas:</strong>
                                  <ul className="list-disc pl-3 space-y-1">
                                    <li><strong className="text-red-800 dark:text-red-300">Aire:</strong> Filtrado por sistemas HEPA con presión positiva (impide entrada de microbios).</li>
                                    <li><strong className="text-red-800 dark:text-red-300">Esquinas:</strong> Redondeadas para evitar acumulación de polvo.</li>
                                    <li><strong className="text-red-800 dark:text-red-300">Paredes:</strong> Lisas, lavables y sin ventanas al exterior.</li>
                                  </ul>
                                </div>
                                <p><strong className="text-red-700 dark:text-red-400">Vestimenta:</strong> Todo lo anterior más bata estéril y guantes estériles para el equipo quirúrgico.</p>
                              </div>
                              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-xs border border-red-200 dark:border-red-800 mt-2">
                                <strong className="text-red-900 dark:text-red-200 flex items-center gap-1 mb-1"><AlertCircle size={12}/> Punto Crítico:</strong> 
                                Mantenimiento del <strong className="text-red-900 dark:text-red-200">Campo Estéril</strong> (solo el personal lavado puede tocar áreas blancas/estériles).
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

                    `;
  
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated zonificacion successfully");
} else {
  console.log("Could not find start or end index.");
}
