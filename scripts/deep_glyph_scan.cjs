const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.js') && !full.includes('scripts')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('assets/js');
const chars = ['←', '→', '↑', '↓', '▲', '▼', '◈', '✓', '↻', '■', '★', '☆', '↗', '↘', '↙', '↖'];
let totalFound = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  chars.forEach(ch => {
    if (content.includes(ch)) {
      content.split('\n').forEach((l, idx) => {
        if (l.includes(ch)) {
          // ignore comments or regex
          if (!l.trim().startsWith('//') && !l.includes('emojiRegex') && !l.includes('replace(')) {
            console.log(f + ':' + (idx+1) + ' [' + ch + '] ' + l.trim().substring(0, 100));
            totalFound++;
          }
        }
      });
    }
  });
});

console.log('Total glyphs remaining in code lines:', totalFound);
