import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The icon sizes are passed visually as size={NUM}. We should divide them by 1.5 or 2 to match
// the new layout scale. Since they might be in strings or numbers...
// `size={24}` -> `size={16}` (maybe not half, otherwise it's too small, but maybe roughly half)
// let's do a regex to catch size={\d+} and multiply by 0.6 if it makes sense.

content = content.replace(/size=\{([0-9]+)\}/g, (match, p1) => {
  let val = parseInt(p1, 10);
  let newVal = Math.max(12, Math.round(val * 0.6)); // Scale by 0.6, min size 12
  return `size={${newVal}}`;
});

// Also there might be some w-12 h-12 classes for icons or avatars.
// Let's replace some common avatar dimensions to avoid them being giant, BUT wait, 
// w-12 is 3rem -> 24px (used to be 48px). It already shrunk by 50%!
// Any class that uses Tailwind dimensions (rem) automatically shrunk by 50% because we set font-size to 8px.
// ONLY inline px or absolute sizes didn't shrink.

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Icon sizes scaled.');
