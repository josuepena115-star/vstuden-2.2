const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import NotificationSystem")) {
  code = code.replace(
    "import { WasteManagementBlock } from './components/WasteManagementBlock';",
    "import { WasteManagementBlock } from './components/WasteManagementBlock';\nimport NotificationSystem from './components/NotificationSystem';\nimport MyNotes from './components/MyNotes';"
  );
}

if (!code.includes("Edit3,")) {
  code = code.replace("} from 'lucide-react';", "  Edit3,\n} from 'lucide-react';");
}

let navbarRegex = /<SidebarItem icon=\{Brain\} label="Fundamentos" active=\{activeTab === 'fundamentos'\} onClick=\{[A-Za-z_()=>']+\} collapsed=\{!isSidebarOpen\} \/>/;
if (code.match(navbarRegex) && !code.includes("Mis Notas")) {
  code = code.replace(
    navbarRegex,
    "$&" + "\n              <SidebarItem icon={Edit3} label=\"Notas y Tareas\" active={activeTab === 'notas'} onClick={() => setActiveTab('notas')} collapsed={!isSidebarOpen} />"
  );
}

if (!code.includes("<NotificationSystem />")) {
  code = code.replace(
    "<Toaster position=\"top-center\" richColors />",
    "<Toaster position=\"top-center\" richColors />\n      <NotificationSystem />"
  );
}

if (!code.includes("case 'notas':")) {
  const switchTarget = "      case 'fundamentos':";
  code = code.replace(
    switchTarget,
    "      case 'notas':\n        return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}><MyNotes /></motion.div>;\n\n" + switchTarget
  );
}

fs.writeFileSync('src/App.tsx', code);
console.log("Updated App.tsx successfully.");
