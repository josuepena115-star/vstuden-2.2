const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// The replacement using regex safely
// This matches the button and its closing tags
appCode = appCode.replace(/                          Guardar Turno\n                        <\/button>\n                      <\/div>\n                    <\/Card>/g, 
"                          Guardar Turno\n                        </button>\n                      </div>\n                    )}\n                    </Card>"
);

appCode = appCode.replace(/                        Registrar Turno\n                      <\/button>\n                    <\/div>\n                  <\/Card>\n                \)}\n              <\/div>/g, 
"                        Registrar Turno\n                      </button>\n                    </div>\n                    )}\n                  </Card>\n                )}\n              </div>"
);

fs.writeFileSync('src/App.tsx', appCode);
