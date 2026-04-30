import fs from 'fs';

let content = fs.readFileSync('src/medicalData.ts', 'utf8');

// 1. Move correlacionComorbilidades to fisiopatologia.textoTecnico
// We look for objects that have both.
// Actually, it's easier to just append it to textoTecnico if present and delete the top-level key.

// Match a disease object block roughly
const diseaseBlockRegex = /\{\s+id: 'int_[\s\S]+?\n  \}/g;

content = content.replace(diseaseBlockRegex, (block) => {
  let newBlock = block;
  
  // Extract correlacionComorbilidades if it exists as top-level property
  const comorbMatch = newBlock.match(/\n    correlacionComorbilidades: "(.*?)"/);
  if (comorbMatch) {
    const textToAdd = `\n\n### Correlación con Comorbilidades:\n- ${comorbMatch[1]}`;
    
    // Find textoTecnico inside fisiopatologia
    const textoTecnicoMatch = newBlock.match(/textoTecnico: `([\s\S]*?)`/);
    if (textoTecnicoMatch) {
      const oldText = textoTecnicoMatch[1];
      newBlock = newBlock.replace(oldText, oldText + textToAdd);
      // Remove the top-level property
      newBlock = newBlock.replace(/\s+correlacionComorbilidades: ".*?",?\n/, '\n');
    }
  }

  // 2. Fix criteriosReferencia inside monitoreo
  const critRefMatch = newBlock.match(/criteriosReferencia: \[([\s\S]*?)\]/);
  if (critRefMatch) {
    const items = critRefMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/'/g, '')).filter(s => s);
    const critRefString = items.join('. ');
    
    // Remove it from monitoreo
    newBlock = newBlock.replace(/\s+criteriosReferencia: \[[\s\S]*?\]/, '');
    
    // Add it to manejo top level (before cita)
    newBlock = newBlock.replace(/\n      cita: ("|')/, `\n      criterioReferencia: '${critRefString}',\n      cita: $1`);
  }

  // 3. Ensure maniobraExploracion in clinica
  const clinicaMatch = newBlock.match(/clinica: \{([\s\S]*?)\}/);
  if (clinicaMatch) {
    const clinicaContent = clinicaMatch[1];
    if (!clinicaContent.includes('maniobraExploracion:')) {
      const fixedClinica = clinicaContent.replace('banderasRojas:', "maniobraExploracion: 'Evaluación clínica sistemática.',\n      banderasRojas:");
      newBlock = newBlock.replace(clinicaContent, fixedClinica);
    }
  }

  return newBlock;
});

fs.writeFileSync('src/medicalData.ts', content);
console.log('Fixed medicalData.ts issues');
