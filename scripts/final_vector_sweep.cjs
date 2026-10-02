const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. content.js
const contentPath = path.join(root, 'assets', 'js', 'content.js');
if (fs.existsSync(contentPath)) {
  let code = fs.readFileSync(contentPath, 'utf8');
  code = code.replaceAll(' ←', '');
  code = code.replaceAll('← ', '');
  code = code.replaceAll(' →', '');
  code = code.replaceAll('→ ', '');
  fs.writeFileSync(contentPath, code, 'utf8');
  console.log('content.js cleaned.');
}

// 2. app.js
const appPath = path.join(root, 'assets', 'js', 'app.js');
if (fs.existsSync(appPath)) {
  let code = fs.readFileSync(appPath, 'utf8');
  code = code.replace(
    `<span style="font-size: 0.65rem; opacity: 0.7;">▼</span>`,
    `<span style="display:inline-flex; align-items:center; opacity: 0.7;">\${icons.chevronDown('', 12)}</span>`
  );
  code = code.replaceAll(
    `<span>\${this.currentLang === 'ar' ? '←' : '→'}</span>`,
    `<span style="display:inline-flex; align-items:center;">\${this.currentLang === 'ar' ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>`
  );
  code = code.replace(
    `submitBtn.innerHTML = \`<span>\${m.submit}</span><span>\${this.currentLang === 'ar' ? '←' : '→'}</span>\`;`,
    `submitBtn.innerHTML = \`<span style="display:inline-flex; align-items:center; gap:6px;"><span>\${m.submit}</span> \${this.currentLang === 'ar' ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>\`;`
  );
  fs.writeFileSync(appPath, code, 'utf8');
  console.log('app.js cleaned.');
}

// 3. faqSection.js
const faqPath = path.join(root, 'assets', 'js', 'components', 'faqSection.js');
if (fs.existsSync(faqPath)) {
  let code = fs.readFileSync(faqPath, 'utf8');
  code = code.replace(
    `class="faq-icon" style="transition: transform var(--transition-fast); font-size: 0.8rem; color: var(--text-muted);">▼</span>`,
    `class="faq-icon" style="transition: transform var(--transition-fast); display:inline-flex; align-items:center; color: var(--text-muted);">\${icons.chevronDown('', 14)}</span>`
  );
  fs.writeFileSync(faqPath, code, 'utf8');
  console.log('faqSection.js cleaned.');
}

// 4. trainingCalendar.js
const calPath = path.join(root, 'assets', 'js', 'components', 'trainingCalendar.js');
if (fs.existsSync(calPath)) {
  let code = fs.readFileSync(calPath, 'utf8');
  code = code.replace(
    `<span>\${isRtl ? '←' : '→'}</span>`,
    `<span style="display:inline-flex; align-items:center;">\${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>`
  );
  fs.writeFileSync(calPath, code, 'utf8');
  console.log('trainingCalendar.js cleaned.');
}

// 5. syllabusViewer.js
const sylPath = path.join(root, 'assets', 'js', 'components', 'syllabusViewer.js');
if (fs.existsSync(sylPath)) {
  let code = fs.readFileSync(sylPath, 'utf8');
  code = code.replace(
    `<span>←</span>`,
    `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`
  );
  fs.writeFileSync(sylPath, code, 'utf8');
  console.log('syllabusViewer.js cleaned.');
}

// 6. PostCard.js
const postCardPath = path.join(root, 'assets', 'js', 'components', 'cms', 'PostCard.js');
if (fs.existsSync(postCardPath)) {
  let code = fs.readFileSync(postCardPath, 'utf8');
  if (!code.includes("import { icons }")) {
    code = "import { icons } from '../../icons.js';\n" + code;
  }
  code = code.replace(
    `<span class="shat-icon-directional">←</span>`,
    `<span class="shat-icon-directional" style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`
  );
  fs.writeFileSync(postCardPath, code, 'utf8');
  console.log('PostCard.js cleaned.');
}

// 7. commandPalette.js
const cmdPath = path.join(root, 'assets', 'js', 'components', 'commandPalette.js');
if (fs.existsSync(cmdPath)) {
  let code = fs.readFileSync(cmdPath, 'utf8');
  code = code.replace(
    `<span style="color: #94A3B8; font-size: 0.85rem;">←</span>`,
    `<span style="color: #94A3B8; display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 13)}</span>`
  );
  fs.writeFileSync(cmdPath, code, 'utf8');
  console.log('commandPalette.js cleaned.');
}

// 8. aiAdvisorWidget.js
const aiPath = path.join(root, 'assets', 'js', 'components', 'aiAdvisorWidget.js');
if (fs.existsSync(aiPath)) {
  let code = fs.readFileSync(aiPath, 'utf8');
  code = code.replace(
    `<span>→</span>`,
    `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`
  );
  fs.writeFileSync(aiPath, code, 'utf8');
  console.log('aiAdvisorWidget.js cleaned.');
}

// 9. uiPlayground.js
const uiPath = path.join(root, 'assets', 'js', 'components', 'uiPlayground.js');
if (fs.existsSync(uiPath)) {
  let code = fs.readFileSync(uiPath, 'utf8');
  if (!code.includes("import { icons }")) {
    code = "import { icons } from '../icons.js';\n" + code;
  }
  code = code.replace(
    `العودة للرئيسية ↗`,
    `<span style="display:inline-flex; align-items:center; gap:4px;"><span>العودة للرئيسية</span> \${icons.home('icon-inline', 14)}</span>`
  );
  fs.writeFileSync(uiPath, code, 'utf8');
  console.log('uiPlayground.js cleaned.');
}

// 10. Remaining Academy Pages
const acadDashPath = path.join(root, 'assets', 'js', 'pages', 'academy', 'AcademyDashboardPage.js');
if (fs.existsSync(acadDashPath)) {
  let code = fs.readFileSync(acadDashPath, 'utf8');
  code = code.replace(`<span>←</span>`, `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`);
  fs.writeFileSync(acadDashPath, code, 'utf8');
}

const acadGatePath = path.join(root, 'assets', 'js', 'pages', 'academy', 'AcademyGatewayPage.js');
if (fs.existsSync(acadGatePath)) {
  let code = fs.readFileSync(acadGatePath, 'utf8');
  code = code.replace(`<span>← العودة للصفحة الرئيسية</span>`, `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.arrowRight('icon-inline', 14)} <span>العودة للصفحة الرئيسية</span></span>`);
  code = code.replace(`<span>←</span>`, `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`);
  fs.writeFileSync(acadGatePath, code, 'utf8');
}

const driveFilesPath = path.join(root, 'assets', 'js', 'pages', 'academy', 'DriveFilesPage.js');
if (fs.existsSync(driveFilesPath)) {
  let code = fs.readFileSync(driveFilesPath, 'utf8');
  code = code.replace(`<span>↓ طلب التحميل</span>`, `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.download('icon-inline', 14)} <span>طلب التحميل</span></span>`);
  fs.writeFileSync(driveFilesPath, code, 'utf8');
}

const lessonViewPath = path.join(root, 'assets', 'js', 'pages', 'academy', 'LessonViewPage.js');
if (fs.existsSync(lessonViewPath)) {
  let code = fs.readFileSync(lessonViewPath, 'utf8');
  code = code.replace(`<span style="font-size: 1.2rem;">←</span>`, `<span style="display:inline-flex; align-items:center;">\${icons.arrowRight('icon-inline', 14)}</span>`);
  fs.writeFileSync(lessonViewPath, code, 'utf8');
}

const notifPagePath = path.join(root, 'assets', 'js', 'pages', 'company', 'NotificationsPage.js');
if (fs.existsSync(notifPagePath)) {
  let code = fs.readFileSync(notifPagePath, 'utf8');
  code = code.replace(`<span>←</span>`, `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`);
  fs.writeFileSync(notifPagePath, code, 'utf8');
}

// 11. pages.js line 2503
const pagesPath = path.join(root, 'assets', 'js', 'pages.js');
if (fs.existsSync(pagesPath)) {
  let code = fs.readFileSync(pagesPath, 'utf8');
  code = code.replace(`<span>←</span>`, `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`);
  fs.writeFileSync(pagesPath, code, 'utf8');
}

// 12. adminView.js line 2009
const adminViewPath = path.join(root, 'assets', 'js', 'views', 'adminView.js');
if (fs.existsSync(adminViewPath)) {
  let code = fs.readFileSync(adminViewPath, 'utf8');
  code = code.replace(
    `<a href="#/forms?id=\${f.id}" class="btn-clean btn-sm" style="background: var(--bg-subtle);">معاينة ↗`,
    `<a href="#/forms?id=\${f.id}" class="btn-clean btn-sm" style="background: var(--bg-subtle); display:inline-flex; align-items:center; gap:4px;"><span>معاينة</span> \${icons.externalLink('icon-inline', 12)}`
  );
  fs.writeFileSync(adminViewPath, code, 'utf8');
}

// 13. homeView.js, loginView.js, projectsView.js
['homeView.js', 'loginView.js', 'projectsView.js'].forEach(v => {
  const vp = path.join(root, 'assets', 'js', 'views', v);
  if (fs.existsSync(vp)) {
    let code = fs.readFileSync(vp, 'utf8');
    code = code.replace(
      /const arrow = isRtl \? '←' : '→';/,
      "const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);"
    );
    fs.writeFileSync(vp, code, 'utf8');
  }
});

console.log('All remaining vector and glyph cleanups completed!');
