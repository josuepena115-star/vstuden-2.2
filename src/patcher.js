const fs = require('fs');

const rep1 = JSON.parse(fs.readFileSync('src/replacements1.json', 'utf8'));
const rep2 = JSON.parse(fs.readFileSync('src/replacements2.json', 'utf8'));
const allReplacements = { ...rep1, ...rep2 };

let code = fs.readFileSync('src/medicalData.ts', 'utf8');
let replacedCount = 0;

for (const [id, newText] of Object.entries(allReplacements)) {
  const safeText = newText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const regex = new RegExp(`(\\"id\\":\\s*\\"${id}\\"[\\s\\S]*?\\"textoTecnico\\":\\s*\\")[^\\"]*(\\")`, 'g');
  
  if (code.match(regex)) {
    code = code.replace(regex, `$1${safeText}$2`);
    console.log('Replaced', id);
    replacedCount++;
  } else {
    console.log('Could not match', id);
  }
}

console.log(`Total replaced: ${replacedCount}`);
fs.writeFileSync('src/medicalData.ts', code);