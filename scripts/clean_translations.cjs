const fs = require('fs');
const path = require('path');

const transPath = path.join(__dirname, '..', 'assets', 'js', 'translations.js');
let content = fs.readFileSync(transPath, 'utf8');

// Replace arrows and external arrows in translations
content = content.replaceAll(' ←', '');
content = content.replaceAll(' →', '');
content = content.replaceAll(' ↗', '');

fs.writeFileSync(transPath, content, 'utf8');
console.log('translations.js cleaned successfully!');
