const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'assets', 'js', 'views', 'academyView.js');
let code = fs.readFileSync(target, 'utf8');

code = code.replace(
  /const arrow = isRtl \? '←' : '→';/,
  "const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);"
);

// Hero Apply button
code = code.replace(
  `<span>\${t.btnApplyGeneral}</span>\n                <span>\${arrow}</span>`,
  `<span>\${t.btnApplyGeneral}</span>\n                <span style="display: inline-flex; align-items: center;">\${arrowIcon}</span>`
);
code = code.replace(
  `<span>\${t.btnApplyGeneral}</span>\r\n                <span>\${arrow}</span>`,
  `<span>\${t.btnApplyGeneral}</span>\n                <span style="display: inline-flex; align-items: center;">\${arrowIcon}</span>`
);

// Fee chip: replace pro-symbol-badge with .badge and award icon
code = code.replace(
  `<span class="pro-symbol-badge" style="background: var(--shat-green-tint); color: var(--shat-green); border-color: var(--shat-green-border); font-weight: 800;">\n                          \${c.fee}\n                        </span>`,
  `<span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">\n                          \${icons.award('icon-inline', 13)}\n                          <span>\${c.fee}</span>\n                        </span>`
);
code = code.replace(
  `<span class="pro-symbol-badge" style="background: var(--shat-green-tint); color: var(--shat-green); border-color: var(--shat-green-border); font-weight: 800;">\r\n                          \${c.fee}\r\n                        </span>`,
  `<span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">\n                          \${icons.award('icon-inline', 13)}\n                          <span>\${c.fee}</span>\n                        </span>`
);

// Google form and drive icons
code = code.replace(
  `<span>Google Form</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.form('icon-inline', 13)} <span>Google Form</span></span>`
);
code = code.replace(
  `<span>Drive</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.drive('icon-inline', 13)} <span>Drive</span></span>`
);

// Course card register button
code = code.replace(
  `<span>\${t.btnRegisterCourse}</span>\n                      <span>\${arrow}</span>`,
  `<span>\${t.btnRegisterCourse}</span>\n                      <span style="display: inline-flex; align-items: center;">\${arrowIcon}</span>`
);
code = code.replace(
  `<span>\${t.btnRegisterCourse}</span>\r\n                      <span>\${arrow}</span>`,
  `<span>\${t.btnRegisterCourse}</span>\n                      <span style="display: inline-flex; align-items: center;">\${arrowIcon}</span>`
);

fs.writeFileSync(target, code, 'utf8');
console.log('academyView.js updated cleanly!');
