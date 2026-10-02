const fs = require('fs');
const path = require('path');

// Regex for emoji ranges and character glyphs that look like emojis or raw unicode symbols:
// Emoji presentation, pictographs, symbols, etc.
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}✓✔✕✖⎙▪◈★▲⏳⏱⏸▶ℹ]/u;

function scanDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist' && entry.name !== '.agents' && entry.name !== 'tests') {
        scanDir(fullPath, results);
      }
    } else if (entry.isFile() && (entry.name === 'index.html' || (fullPath.includes('assets') && (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.css'))))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (emojiRegex.test(line)) {
          results.push({
            file: path.relative(process.cwd(), fullPath),
            line: index + 1,
            content: line.trim()
          });
        }
      });
    }
  }
  return results;
}

const results = scanDir(process.cwd());
console.log(`Found ${results.length} matches in website files:`);
const byFile = {};
results.forEach(r => {
  byFile[r.file] = byFile[r.file] || [];
  byFile[r.file].push(`${r.line}: ${r.content}`);
});

for (const [f, matches] of Object.entries(byFile)) {
  console.log(`\n=== ${f} (${matches.length} matches) ===`);
  matches.forEach(m => console.log(`  ${m}`));
}

