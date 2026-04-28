import fs from 'fs';
const data = fs.readFileSync('src/medicalData.ts', 'utf8');
const fixedData = data.replace(/\\n/g, '\n');
fs.writeFileSync('src/medicalData.ts', fixedData);
console.log('Fixed literal newlines');
