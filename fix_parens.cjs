const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// For the modal block
appCode = appCode.replace(
"                          Guardar Turno\\n" +
"                        </button>\\n" +
"                      </div>\\n" +
"                    </Card>",
"                          Guardar Turno\\n" +
"                        </button>\\n" +
"                      </div>\\n" +
"                      )}\\n" +
"                    </Card>"
);

// For the desktop block
appCode = appCode.replace(
"                        Registrar Turno\\n" +
"                      </button>\\n" +
"                    </div>\\n" +
"                  </Card>\\n" +
"                )}\\n" +
"              </div>",
"                        Registrar Turno\\n" +
"                      </button>\\n" +
"                    </div>\\n" +
"                    )}\\n" +
"                  </Card>\\n" +
"                )}\\n" +
"              </div>"
);

fs.writeFileSync('src/App.tsx', appCode);
