const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure import
if (!code.includes("WasteManagementBlock")) {
  code = code.replace(
    "import { DISEASES",
    "import { WasteManagementBlock } from './components/WasteManagementBlock';\nimport { DISEASES"
  );
}

// Replace section 4 in cir_entorno
const startMarker = "{/* 4. Gestión de Desechos y Bioseguridad */}";
// Since I appended this recently, let's find the closing tags of cir_entorno.
// It ends with: "                        </div>\n                      </Card>\n                    )}"
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf("                        </div>\n                      </Card>\n                    )}", startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + "<WasteManagementBlock />\n" + code.substring(endIndex);
} else {
  console.log("Could not find boundaries for cir_entorno block");
}

// Inject into fundamentos
const fundamentosMarker = "<SectionHeader title=\"Fundamentos de Enfermería\" subtitle=\"Conceptos básicos y cuidados esenciales.\" />";
const fundStart = code.indexOf(fundamentosMarker);
if (fundStart !== -1) {
  const insertPos = fundStart + fundamentosMarker.length;
  code = code.substring(0, insertPos) + "\n            <WasteManagementBlock />\n" + code.substring(insertPos);
} else {
  console.log("Could not find fundamentosMarker");
}

fs.writeFileSync('src/App.tsx', code);
console.log("Update complete.");
