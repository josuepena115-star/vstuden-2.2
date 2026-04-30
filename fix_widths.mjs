import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace standard rem max-widths with pixel-equivalent max-widths so they don't shrink!
// 1rem was originally 16px. So max-w-md was 28 * 16 = 448px.
const replacements = [
  { regex: /\bmax-w-sm\b/g, rep: 'max-w-[384px]' }, // 24rem
  { regex: /\bmax-w-md\b/g, rep: 'max-w-[448px]' }, // 28rem
  { regex: /\bmax-w-lg\b/g, rep: 'max-w-[512px]' }, // 32rem
  { regex: /\bmax-w-xl\b/g, rep: 'max-w-[576px]' }, // 36rem
  { regex: /\bmax-w-2xl\b/g, rep: 'max-w-[672px]' }, // 42rem
  { regex: /\bmax-w-3xl\b/g, rep: 'max-w-[768px]' }, // 48rem
  { regex: /\bmax-w-4xl\b/g, rep: 'max-w-[896px]' }, // 56rem
  { regex: /\bmax-w-5xl\b/g, rep: 'max-w-[1024px]' }, // 64rem
  { regex: /\bmax-w-6xl\b/g, rep: 'max-w-[1152px]' }, // 72rem
  { regex: /\bmax-w-7xl\b/g, rep: 'max-w-[1280px]' }, // 80rem
  
  // also fix some w- equivalents if needed, but mostly w- is fractions (w-1/2) or full (w-full).
  // w-64 = 16rem = 256px
  { regex: /\bw-64\b/g, rep: 'w-[256px]' },
  { regex: /\bw-80\b/g, rep: 'w-[320px]' },
  { regex: /\bw-96\b/g, rep: 'w-[384px]' },
];

replacements.forEach(({ regex, rep }) => {
  content = content.replace(regex, rep);
});

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx max-widths fixed successfully.');
