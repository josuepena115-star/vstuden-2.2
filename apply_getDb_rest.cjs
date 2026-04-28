const fs = require('fs');

const files = [
  'src/components/MyNotes.tsx',
  'src/components/NotificationSystem.tsx',
  'src/components/SearchModal.tsx',
  'src/components/ScheduleImporter.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace(/import \{ db, auth \} from '\.\.\/firebase';/g, "import { auth, db, getDb } from '../firebase';");
    code = code.replace(/import \{ db \} from '\.\.\/firebase';/g, "import { db, getDb } from '../firebase';");
    fs.writeFileSync(file, code);
  }
});
