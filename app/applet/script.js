const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  // Padding & Margin compactness (Visual Density)
  { regex: /\bp-10\b/g, rep: 'p-6 sm:p-8' },
  { regex: /\bp-8\b/g, rep: 'p-5 sm:p-6' },
  { regex: /\bp-6\b/g, rep: 'p-4 sm:p-5' },
  { regex: /\bpx-8\b/g, rep: 'px-5 sm:px-6' },
  { regex: /\bpy-8\b/g, rep: 'py-5 sm:py-6' },
  { regex: /\bpx-6\b/g, rep: 'px-4 sm:px-5' },
  { regex: /\bpy-6\b/g, rep: 'py-4 sm:py-5' },
  { regex: /\bp-5\b/g, rep: 'p-3 sm:p-4' },
  
  // Gaps (Density)
  { regex: /\bgap-8\b/g, rep: 'gap-4 sm:gap-6' },
  { regex: /\bgap-6\b/g, rep: 'gap-3 sm:gap-4' },
  { regex: /\bgap-5\b/g, rep: 'gap-3 sm:gap-4' },
  
  // Height reduction (avoid media query overlapping, just fluid min-height)
  { regex: /\bh-40\b/g, rep: 'min-h-[6rem] sm:min-h-[8rem]' },
  
  // Text Scaling (fluid)
  { regex: /\btext-5xl\b/g, rep: 'text-3xl sm:text-4xl' },
  { regex: /\btext-4xl\b/g, rep: 'text-2xl sm:text-3xl' },
  { regex: /\btext-3xl\b/g, rep: 'text-xl sm:text-2xl' },
  { regex: /\btext-2xl\b/g, rep: 'text-lg sm:text-xl' },
  { regex: /\btext-xl\b/g, rep: 'text-base sm:text-lg' },
  { regex: /\btext-lg\b/g, rep: 'text-sm sm:text-base' },

  // Extreme border radiuses refactor
  { regex: /\brounded-\[40px\]\b/g, rep: 'rounded-3xl' },
  { regex: /\brounded-\[2\.5rem\]\b/g, rep: 'rounded-3xl' },
  { regex: /\brounded-[32px]\b/g, rep: 'rounded-2xl' },
  { regex: /\brounded-[24px]\b/g, rep: 'rounded-2xl' },
];

let modified = content;
replacements.forEach(({ regex, rep }) => {
  modified = modified.replace(regex, rep);
});

// Adding responsive wrapper classes to some specific fixed width items if possible.

fs.writeFileSync('src/App.tsx', modified, 'utf8');
console.log('App.tsx compact refactored successfully.');
