import fs from 'fs';
const content = fs.readFileSync('src/medicalData.ts', 'utf8');
let newContent = '';
let inSingleQuote = false;
let inDoubleQuote = false;
let inTemplateQuote = false;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const nextChar = content[i+1];
  
  if (char === "'" && content[i-1] !== '\\') inSingleQuote = !inSingleQuote;
  if (char === '"' && content[i-1] !== '\\') inDoubleQuote = !inDoubleQuote;
  if (char === '`' && content[i-1] !== '\\') inTemplateQuote = !inTemplateQuote;

  if (char === '\n' && (inSingleQuote || inDoubleQuote)) {
    // If we're inside a single or double quote, this is an illegal newline that I introduced
    newContent += '\\n';
  } else {
    newContent += char;
  }
}

fs.writeFileSync('src/medicalData.ts', newContent);
console.log('Restored broken newlines inside string literals');
