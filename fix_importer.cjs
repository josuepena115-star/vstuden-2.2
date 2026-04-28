const fs = require('fs');

let fileStr = fs.readFileSync('src/components/ScheduleImporter.tsx', 'utf8');
fileStr = fileStr.replace(/\\\`/g, '`');
fs.writeFileSync('src/components/ScheduleImporter.tsx', fileStr);
