const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/import \{ auth, db, signInWithGoogle, logout \} from '\.\/firebase';/g, "import { auth, db, getDb, signInWithGoogle, logout } from './firebase';");
code = code.replace(/doc\(db/g, 'doc(getDb()');
code = code.replace(/collection\(db/g, 'collection(getDb()');
fs.writeFileSync('src/App.tsx', code);
