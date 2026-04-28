const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
if (!code.includes('MapPin,')) {
    code = code.replace("} from 'lucide-react';", "  MapPin,\n} from 'lucide-react';");
    fs.writeFileSync('src/App.tsx', code);
    console.log("Added MapPin import");
} else {
    console.log("MapPin already imported");
}
