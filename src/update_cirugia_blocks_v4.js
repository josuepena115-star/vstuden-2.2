import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure Box is imported
if (!code.includes('Box,')) {
    code = code.replace("} from 'lucide-react';", "  Box,\n} from 'lucide-react';");
}

const startMarker = "{/* 3. El Triángulo de Asepsia */}";
const endMarker = "{/* 4. Gestión de Desechos y Bioseguridad */}";
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `{/* 3. El Triángulo de Asepsia */}
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

                          `;
  
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated blocks successfully");
} else {
  console.log("Could not find start or end index.");
}
