
import fs from 'fs';

const content = fs.readFileSync('src/medicalData.ts', 'utf8');

// Simple regex to extract drug blocks
const drugBlocks = content.match(/\{[\s\S]*?id: 'd\d+'[\s\S]*?\}/g);

if (!drugBlocks) {
  console.log("No drug blocks found.");
  process.exit(0);
}

drugBlocks.forEach(block => {
  const idMatch = block.match(/id: '(d\d+)'/);
  const nameMatch = block.match(/nombreGenerico: '(.*?)'/);
  const contraMatch = block.match(/contraindicaciones: '(.*?)'/);
  const adverseMatch = block.match(/efectosAdversos: '(.*?)'/);
  const nursingMatch = block.match(/usosEnfermeria: '(.*?)'/);

  if (idMatch) {
    const id = idMatch[1];
    const name = nameMatch ? nameMatch[1] : "Unknown";
    
    const contraCount = contraMatch ? (contraMatch[1].match(/•/g) || []).length : 0;
    const adverseCount = adverseMatch ? (adverseMatch[1].match(/•/g) || []).length : 0;
    const nursingCount = nursingMatch ? (nursingMatch[1].match(/•/g) || []).length : 0;

    if (contraCount < 4 || adverseCount < 5 || nursingCount < 4) {
      console.log(`Drug ${id} (${name}): Contra: ${contraCount}, Adverse: ${adverseCount}, Nursing: ${nursingCount}`);
    }
  }
});
