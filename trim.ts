import fs from 'fs';

const content = fs.readFileSync('src/medicalData.ts', 'utf8');
const index = content.indexOf(',// MEDICINA INTERNA');

if (index !== -1) {
  const newContent = content.substring(0, index) + '\n];\n';
  fs.writeFileSync('src/medicalData.ts', newContent);
  console.log('Successfully trimmed file to original size');
} else {
  console.log('Could not find the marker');
}
