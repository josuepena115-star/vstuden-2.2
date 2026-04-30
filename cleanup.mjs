import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Undo the mess
content = content.replace(/p-4 sm:p-5 sm:p-5 sm:p-6/g, "p-5 sm:p-6");
content = content.replace(/p-4 sm:p-5 sm:px-6/g, "p-4 sm:p-6");

// The user wants everything compact but responsive for mobile.
// Wait, we need to reset the html font size first.
fs.writeFileSync('src/App.tsx', content, 'utf8');
