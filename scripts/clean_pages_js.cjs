const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'assets', 'js', 'pages.js');
let code = fs.readFileSync(target, 'utf8');

// 1. Line 190
code = code.replace(
  `<span>التسجيل في الدورة (Google Form) ↗</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.form('icon-inline', 14)} <span>التسجيل في الدورة (Google Form)</span> \${icons.externalLink('icon-inline', 12)}</span>`
);

// 2. Line 215
code = code.replace(
  `<span>استعراض كافة دبلومات الأكاديمية وكلاس روم (\${courses.length} برامج) ←</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>استعراض كافة دبلومات الأكاديمية وكلاس روم (\${courses.length} برامج)</span> \${icons.arrowLeft('icon-inline', 15)}</span>`
);

// 3. Section pagination arrows
code = code.replaceAll(
  `<div class="section-pagination">\n        <a href="#/home" class="page-jump-btn">\n          <span>←</span>\n          <span>\${t.nav.backHome}</span>\n        </a>\n        <a href="#/services" class="page-jump-btn">\n          <span>\${t.services.title}</span>\n          <span>→</span>\n        </a>\n      </div>`,
  `<div class="section-pagination">\n        <a href="#/home" class="page-jump-btn" style="display:inline-flex; align-items:center; gap:6px;">\n          <span style="display:inline-flex; align-items:center;">\${icons.arrowRight('icon-inline', 14)}</span>\n          <span>\${t.nav.backHome}</span>\n        </a>\n        <a href="#/services" class="page-jump-btn" style="display:inline-flex; align-items:center; gap:6px;">\n          <span>\${t.services.title}</span>\n          <span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>\n        </a>\n      </div>`
);

// Generic pagination replace for all page jumps
code = code.replaceAll(
  `          <span>←</span>\n          <span>\${`,
  `          <span style="display:inline-flex; align-items:center;">\${icons.arrowRight('icon-inline', 14)}</span>\n          <span>\${`
);
code = code.replaceAll(
  `          <span>←</span>\r\n          <span>\${`,
  `          <span style="display:inline-flex; align-items:center;">\${icons.arrowRight('icon-inline', 14)}</span>\n          <span>\${`
);
code = code.replaceAll(
  `</span>\n          <span>→</span>`,
  `</span>\n          <span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`
);
code = code.replaceAll(
  `</span>\r\n          <span>→</span>`,
  `</span>\n          <span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`
);

// 4. Line 766 & 816
code = code.replace(
  `التسجيل بالمساق والبرنامج التدريبي ←`,
  `<span>التسجيل بالمساق والبرنامج التدريبي</span> \${icons.arrowLeft('icon-inline', 14)}`
);
code = code.replace(
  `\${t.nav.requestConsultation} →`,
  `<span>\${t.nav.requestConsultation}</span> \${icons.arrowLeft('icon-inline', 14)}`
);

// 5. Line 1091 & 1797
code = code.replace(
  `فتح نموذج التسجيل (Google Form) ↗`,
  `<span>فتح نموذج التسجيل (Google Form)</span> \${icons.externalLink('icon-inline', 14)}`
);
code = code.replace(
  `فتح نموذج Google Form المباشر ↗`,
  `<span>فتح نموذج Google Form المباشر</span> \${icons.externalLink('icon-inline', 13)}`
);

// 6. Line 2360, 2367, 2529, 2839
code = code.replace(
  `<span>أو التقديم عبر Google Form الرسمي ↗</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>أو التقديم عبر Google Form الرسمي</span> \${icons.externalLink('icon-inline', 12)}</span>`
);
code = code.replace(
  `<span>فتح مجلد الدورة على Google Drive ↗</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>فتح مجلد الدورة على Google Drive</span> \${icons.externalLink('icon-inline', 12)}</span>`
);
code = code.replace(
  `<span>التسجيل في الدورة (Google Form) ↗</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>التسجيل في الدورة (Google Form)</span> \${icons.externalLink('icon-inline', 12)}</span>`
);
code = code.replace(
  `\${icons.image('icon-inline', 15)} تغيير وتخصيص الغلاف ↗`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.image('icon-inline', 15)} <span>تغيير وتخصيص الغلاف</span> \${icons.externalLink('icon-inline', 12)}</span>`
);

fs.writeFileSync(target, code, 'utf8');
console.log('pages.js cleaned successfully!');
