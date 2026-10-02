const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Update the views with icons
const viewsToUpdate = ['aboutView.js', 'contactView.js', 'deliveryView.js', 'newsView.js', 'servicesView.js', 'standardsView.js', 'toolkitsView.js'];

viewsToUpdate.forEach(file => {
  const p = path.join(root, 'assets', 'js', 'views', file);
  if (!fs.existsSync(p)) return;
  let code = fs.readFileSync(p, 'utf8');

  if (!code.includes("import { icons }")) {
    code = "import { icons } from '../icons.js';\n" + code;
  }

  code = code.replace(
    /const arrow = isRtl \? '←' : '→';/,
    "const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);"
  );

  fs.writeFileSync(p, code, 'utf8');
  console.log(`Updated ${file}`);
});

// 2. Update AdminPortalPage.js
const adminPortalPath = path.join(root, 'assets', 'js', 'pages', 'admin', 'AdminPortalPage.js');
if (fs.existsSync(adminPortalPath)) {
  let code = fs.readFileSync(adminPortalPath, 'utf8');
  code = code.replace('↓ تصدير نسخة احتياطية (JSON)', `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.download('icon-inline', 14)} <span>تصدير نسخة احتياطية (JSON)</span></span>`);
  fs.writeFileSync(adminPortalPath, code, 'utf8');
  console.log('Updated AdminPortalPage.js');
}

// 3. Update CourseRegistrationPage.js
const regPath = path.join(root, 'assets', 'js', 'pages', 'company', 'CourseRegistrationPage.js');
if (fs.existsSync(regPath)) {
  let code = fs.readFileSync(regPath, 'utf8');
  if (!code.includes("import { icons }")) {
    code = "import { icons } from '../../icons.js';\n" + code;
  }
  code = code.replace('<span style="font-size: 1.1rem;">←</span>', `\${icons.arrowRight('icon-inline', 14)}`);
  code = code.replace('الرئيسية ↗', `<span style="display:inline-flex; align-items:center; gap:4px;"><span>الرئيسية</span> \${icons.home('icon-inline', 14)}</span>`);
  code = code.replace('فتح Google Form ↗', `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.form('icon-inline', 14)} <span>فتح Google Form</span> \${icons.externalLink('icon-inline', 12)}</span>`);
  fs.writeFileSync(regPath, code, 'utf8');
  console.log('Updated CourseRegistrationPage.js');
}

// 4. Update HomePage.js
const homePagePath = path.join(root, 'assets', 'js', 'pages', 'company', 'HomePage.js');
if (fs.existsSync(homePagePath)) {
  let code = fs.readFileSync(homePagePath, 'utf8');
  if (!code.includes("import { icons }")) {
    code = "import { icons } from '../../icons.js';\n" + code;
  }
  code = code.replace('<span class="shat-icon-directional">←</span>', `<span class="shat-icon-directional" style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 16)}</span>`);
  code = code.replaceAll('<span style="color: var(--shat-green-400);">←</span>', `<span style="color: var(--shat-green-400); display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 16)}</span>`);
  code = code.replace('<span>←</span>', `<span style="display:inline-flex; align-items:center;">\${icons.arrowLeft('icon-inline', 14)}</span>`);
  code = code.replace('تسجيل في المساق ←', `<span style="display:inline-flex; align-items:center; gap:6px;"><span>تسجيل في المساق</span> \${icons.arrowLeft('icon-inline', 13)}</span>`);
  code = code.replace('<span>صفحتنا على فيسبوك ↗</span>', `<span style="display:inline-flex; align-items:center; gap:6px;"><span>صفحتنا على فيسبوك</span> \${icons.externalLink('icon-inline', 13)}</span>`);
  fs.writeFileSync(homePagePath, code, 'utf8');
  console.log('Updated HomePage.js');
}

// 5. Update router.js
const routerPath = path.join(root, 'assets', 'js', 'router.js');
if (fs.existsSync(routerPath)) {
  let code = fs.readFileSync(routerPath, 'utf8');
  code = code.replace(
    "submitBtn.textContent = txt('إرسال طلب الاستشارة أو التدريب ←', 'Submit Consultation / Training Request →', 'Envoyer la Demande de Consultation / Formation →');",
    "submitBtn.textContent = txt('إرسال طلب الاستشارة أو التدريب', 'Submit Consultation / Training Request', 'Envoyer la Demande de Consultation / Formation');"
  );
  fs.writeFileSync(routerPath, code, 'utf8');
  console.log('Updated router.js');
}

// 6. Update fileService.js
const fileServicePath = path.join(root, 'assets', 'js', 'services', 'files', 'fileService.js');
if (fs.existsSync(fileServicePath)) {
  let code = fs.readFileSync(fileServicePath, 'utf8');
  code = code.replace(
    "actionText: parsed.canDirectDownload ? 'تحميل الملف المباشر (PDF)' : 'فتح الملف في نافذة آمنة ↗'",
    "actionText: parsed.canDirectDownload ? 'تحميل الملف المباشر (PDF)' : 'فتح الملف في نافذة آمنة'"
  );
  fs.writeFileSync(fileServicePath, code, 'utf8');
  console.log('Updated fileService.js');
}

// 7. Update standardsExplorer.js and toolkitsLibrary.js
const standardsExplorerPath = path.join(root, 'assets', 'js', 'tools', 'standardsExplorer.js');
if (fs.existsSync(standardsExplorerPath)) {
  let code = fs.readFileSync(standardsExplorerPath, 'utf8');
  code = code.replace("<span>${isRtl ? '←' : '→'}</span>", "<span style=\"display:inline-flex; align-items:center;\">${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>");
  fs.writeFileSync(standardsExplorerPath, code, 'utf8');
  console.log('Updated standardsExplorer.js');
}

const toolkitsLibPath = path.join(root, 'assets', 'js', 'tools', 'toolkitsLibrary.js');
if (fs.existsSync(toolkitsLibPath)) {
  let code = fs.readFileSync(toolkitsLibPath, 'utf8');
  code = code.replace("<span>${isRtl ? '←' : '→'}</span>", "<span style=\"display:inline-flex; align-items:center;\">${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>");
  fs.writeFileSync(toolkitsLibPath, code, 'utf8');
  console.log('Updated toolkitsLibrary.js');
}

// 8. Update loginView.js
const loginViewPath = path.join(root, 'assets', 'js', 'views', 'loginView.js');
if (fs.existsSync(loginViewPath)) {
  let code = fs.readFileSync(loginViewPath, 'utf8');
  code = code.replace(
    "submitBtn.innerHTML = `<span>${content[currentLang]?.login?.nationalIdBtn || 'Instant ID Verification Sign In ←'}</span>`;",
    "submitBtn.innerHTML = `<span>${content[currentLang]?.login?.nationalIdBtn || 'Instant ID Verification Sign In'}</span>`;"
  );
  code = code.replace(
    "submitBtn.innerHTML = `<span>${content[currentLang]?.login?.submitBtn || 'Sign In'}</span><span>${currentLang === 'ar' ? '←' : '→'}</span>`;",
    "submitBtn.innerHTML = `<span style=\"display:inline-flex; align-items:center; gap:6px;\"><span>${content[currentLang]?.login?.submitBtn || 'Sign In'}</span> \${currentLang === 'ar' ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>`;"
  );
  fs.writeFileSync(loginViewPath, code, 'utf8');
  console.log('Updated loginView.js');
}
