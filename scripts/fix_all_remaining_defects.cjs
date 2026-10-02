const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// =========================================================================
// 1. UPDATE assets/css/style.css: Add .badge & Universal Text Containment
// =========================================================================
const cssPath = path.join(root, 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('.badge {')) {
  const badgeCss = `
/* Universal Badge System & Text Containment */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.3;
  border-radius: var(--radius-xs);
  box-sizing: border-box;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  vertical-align: middle;
}

/* Universal Anti-Overflow Containment for Cards & Texts */
.bento-card, .chapter-card, .project-card, .stat-card, .admin-kpi-card, .modal-box, .admission-pass-card {
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
}

.bento-title, .section-title, .modal-title, .section-desc, .bento-text {
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
}
`;
  css = css.replace('.section-badge {', badgeCss + '\n.section-badge {');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('style.css updated with .badge and anti-overflow rules.');
}

// =========================================================================
// 2. UPDATE assets/js/views/studentDashboardView.js
// =========================================================================
const studentPath = path.join(root, 'assets', 'js', 'views', 'studentDashboardView.js');
let studentCode = fs.readFileSync(studentPath, 'utf8');

// Replace arrows
studentCode = studentCode.replace(
  /const arrow = isRtl \? '←' : '→';/,
  "const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);"
);
studentCode = studentCode.replace(
  `\${txt('تصفح دليل المساقات العامة ←', 'Browse Course Catalog →', 'Consulter le catalogue des cours →')}`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;"><span>\${txt('تصفح دليل المساقات العامة', 'Browse Course Catalog', 'Consulter le catalogue des cours')}</span> \${arrowIcon}</span>`
);
studentCode = studentCode.replace(
  `task2Btn: txt('تسليم الحل الميداني الآن ↑', 'Submit Solution Now ↑', 'Déposer la Solution ↑'),`,
  `task2Btn: txt('تسليم الحل الميداني الآن', 'Submit Solution Now', 'Déposer la Solution'),`
);

// Replace downloads <span>↓</span>
studentCode = studentCode.replaceAll(
  `<span>\${t.downloadBtn}</span>\n                  <span>↓</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.download('icon-inline', 14)} <span>\${t.downloadBtn}</span></span>`
);
studentCode = studentCode.replaceAll(
  `<span>\${t.downloadBtn}</span>\r\n                  <span>↓</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.download('icon-inline', 14)} <span>\${t.downloadBtn}</span></span>`
);

// Replace upload <span>↑</span>
studentCode = studentCode.replace(
  `<span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span>\n            <span>↑</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.upload('icon-inline', 16)} <span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span></span>`
);
studentCode = studentCode.replace(
  `<span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span>\r\n            <span>↑</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.upload('icon-inline', 16)} <span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span></span>`
);
studentCode = studentCode.replace(
  `btnConfirm.innerHTML = \`<span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span><span>↑</span>\`;`,
  `btnConfirm.innerHTML = \`<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.upload('icon-inline', 16)} <span>\${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span></span>\`;`
);

// Buttons in top bar
studentCode = studentCode.replace(
  `<span>\${txt('شهاداتي المعتمدة', 'My Certificates', 'Mes Certificats')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.award('icon-inline', 15)} <span>\${txt('شهاداتي المعتمدة', 'My Certificates', 'Mes Certificats')}</span></span>`
);
studentCode = studentCode.replace(
  `<span>\${txt('بطاقة الحضور والباركود الرقمي', 'Digital Admission Pass', 'Pass Numérique')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.idCard('icon-inline', 15)} <span>\${txt('بطاقة الحضور والباركود الرقمي', 'Digital Admission Pass', 'Pass Numérique')}</span></span>`
);
studentCode = studentCode.replace(
  `<span>\${t.btnClassroom}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.graduationCap('icon-inline', 15)} <span>\${t.btnClassroom}</span></span>`
);

fs.writeFileSync(studentPath, studentCode, 'utf8');
console.log('studentDashboardView.js updated cleanly.');

// =========================================================================
// 3. UPDATE assets/js/views/teacherDashboardView.js
// =========================================================================
const teacherPath = path.join(root, 'assets', 'js', 'views', 'teacherDashboardView.js');
let teacherCode = fs.readFileSync(teacherPath, 'utf8');

if (!teacherCode.includes("import { icons }")) {
  teacherCode = teacherCode.replace(
    "import { showToast } from '../components/toast.js';",
    "import { showToast } from '../components/toast.js';\nimport { icons } from '../icons.js';"
  );
}

teacherCode = teacherCode.replace(
  /const arrow = isRtl \? '←' : '→';/,
  "const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);"
);
teacherCode = teacherCode.replace(
  "btnBackAcademy: txt('← العودة للأكاديمية', '← Back to Academy', '← Retour à l’Académie'),",
  "btnBackAcademy: txt('العودة للأكاديمية', 'Back to Academy', 'Retour à l’Académie'),"
);
teacherCode = teacherCode.replace(
  "btnRefresh: txt('↻ تحديث البيانات', '↻ Refresh Data', '↻ Actualiser'),",
  "btnRefresh: txt('تحديث البيانات', 'Refresh Data', 'Actualiser'),"
);
teacherCode = teacherCode.replace(
  `<a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25);">\n                <span>\${t.btnBackAcademy}</span>\n              </a>`,
  `<a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25); display: inline-flex; align-items: center; gap: 6px;">\n                <span style="display: inline-flex; align-items: center;">\${isRtl ? icons.arrowRight('icon-inline', 14) : icons.arrowLeft('icon-inline', 14)}</span>\n                <span>\${t.btnBackAcademy}</span>\n              </a>`
);
teacherCode = teacherCode.replace(
  `<a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25);">\r\n                <span>\${t.btnBackAcademy}</span>\r\n              </a>`,
  `<a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25); display: inline-flex; align-items: center; gap: 6px;">\n                <span style="display: inline-flex; align-items: center;">\${isRtl ? icons.arrowRight('icon-inline', 14) : icons.arrowLeft('icon-inline', 14)}</span>\n                <span>\${t.btnBackAcademy}</span>\n              </a>`
);
teacherCode = teacherCode.replace(
  `<button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm">\n                <span>\${t.btnRefresh}</span>\n              </button>`,
  `<button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">\n                <span style="display: inline-flex; align-items: center;">\${icons.undo('icon-inline', 14)}</span>\n                <span>\${t.btnRefresh}</span>\n              </button>`
);
teacherCode = teacherCode.replace(
  `<button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm">\r\n                <span>\${t.btnRefresh}</span>\r\n              </button>`,
  `<button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">\n                <span style="display: inline-flex; align-items: center;">\${icons.undo('icon-inline', 14)}</span>\n                <span>\${t.btnRefresh}</span>\n              </button>`
);
teacherCode = teacherCode.replace(
  `<span>\${txt('تنزيل الملف الميداني ↓', 'Download Deliverable ↓', 'Télécharger le Devoir ↓')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.download('icon-inline', 14)} <span>\${txt('تنزيل الملف الميداني', 'Download Deliverable', 'Télécharger le Devoir')}</span></span>`
);

fs.writeFileSync(teacherPath, teacherCode, 'utf8');
console.log('teacherDashboardView.js updated cleanly.');

// =========================================================================
// 4. UPDATE assets/js/views/adminView.js
// =========================================================================
const adminPath = path.join(root, 'assets', 'js', 'views', 'adminView.js');
let adminCode = fs.readFileSync(adminPath, 'utf8');

// Nav items
adminCode = adminCode.replace(
  `<button class="admin-nav-item active" data-target="admin-tab-dashboard">\n            <span>\${t.tabDashboard}</span>\n          </button>`,
  `<button class="admin-nav-item active" data-target="admin-tab-dashboard">\n            <span style="display:inline-flex; align-items:center;">\${icons.home('', 16)}</span>\n            <span>\${t.tabDashboard}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-posts">\n            \n            <span>\${t.tabPosts}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-posts">\n            <span style="display:inline-flex; align-items:center;">\${icons.fileText('', 16)}</span>\n            <span>\${t.tabPosts}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-media">\n            \n            <span>\${t.tabMedia}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-media">\n            <span style="display:inline-flex; align-items:center;">\${icons.image('', 16)}</span>\n            <span>\${t.tabMedia}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-courses">\n            \n            <span>\${t.tabCourses}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-courses">\n            <span style="display:inline-flex; align-items:center;">\${icons.book('', 16)}</span>\n            <span>\${t.tabCourses}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-roster">\n            \n            <span>\${t.tabRoster}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-roster">\n            <span style="display:inline-flex; align-items:center;">\${icons.users('', 16)}</span>\n            <span>\${t.tabRoster}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-applications">\n            <span>↓</span>\n            <span>\${t.tabApplications}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-applications">\n            <span style="display:inline-flex; align-items:center;">\${icons.download('', 16)}</span>\n            <span>\${t.tabApplications}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-forms">\n            \n            <span>\${t.tabForms}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-forms">\n            <span style="display:inline-flex; align-items:center;">\${icons.form('', 16)}</span>\n            <span>\${t.tabForms}</span>\n          </button>`
);
adminCode = adminCode.replace(
  `<button class="admin-nav-item" data-target="admin-tab-health">\n            \n            <span>\${t.tabHealth}</span>\n          </button>`,
  `<button class="admin-nav-item" data-target="admin-tab-health">\n            <span style="display:inline-flex; align-items:center;">\${icons.shield('', 16)}</span>\n            <span>\${t.tabHealth}</span>\n          </button>`
);

// KPI Card arrow
adminCode = adminCode.replace(
  `↑ +12 \${txt('هذا الأسبوع', 'this week', 'cette semaine')}`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.trendingUp('icon-inline', 13)} +12 \${txt('هذا الأسبوع', 'this week', 'cette semaine')}</span>`
);

// KPI Pending Apps Icon
adminCode = adminCode.replace(
  `<div style="width: 48px; height: 48px; border-radius: 12px; background: #FEF3C7; border: 1px solid #FDE68A; color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; font-weight: 900;">\n                  ↓\n                </div>`,
  `<div style="width: 48px; height: 48px; border-radius: 12px; background: #FEF3C7; border: 1px solid #FDE68A; color: #D97706; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">\n                  \${icons.form('', 24)}\n                </div>`
);

// View all apps link
adminCode = adminCode.replace(
  `\${txt('عرض الكل ←', 'View All →', 'Voir Tout →')}`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>\${txt('عرض الكل', 'View All', 'Voir Tout')}</span> \${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>`
);

// CSV Export and Refresh
adminCode = adminCode.replace(
  `↓ \${txt('تصدير كشيت Excel (CSV معتمد)', 'Export Excel / CSV', 'Exporter CSV')}`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.fileSpreadsheet('icon-inline', 14)} <span>\${txt('تصدير كشيت Excel (CSV معتمد)', 'Export Excel / CSV', 'Exporter CSV')}</span></span>`
);
adminCode = adminCode.replace(
  `↻ \${txt('تحديث', 'Refresh', 'Actualiser')}`,
  `<span style="display:inline-flex; align-items:center; gap:4px;">\${icons.undo('icon-inline', 13)} <span>\${txt('تحديث', 'Refresh', 'Actualiser')}</span></span>`
);

// Google Form tab header icon
adminCode = adminCode.replace(
  `<span style="font-size: 1.2rem; color: var(--shat-green);"></span>`,
  `<span style="color: var(--shat-green); display:inline-flex; align-items:center;">\${icons.form('', 22)}</span>`
);

// Generate Native SHAT form button
adminCode = adminCode.replace(
  `<span>↓ \${txt('استيراد وتوليد نموذج SHAT الداخلي', 'Import & Generate Native SHAT Form', 'Générer le Formulaire Natif')}</span>\n                  <span>\${isRtl ? '←' : '→'}</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.download('icon-inline', 16)} <span>\${txt('استيراد وتوليد نموذج SHAT الداخلي', 'Import & Generate Native SHAT Form', 'Générer le Formulaire Natif')}</span></span>\n                  <span style="display:inline-flex; align-items:center;">\${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>`
);

// Backup export / import buttons
adminCode = adminCode.replace(
  `<span>↓ \${txt('تصدير نسخة لجهازك (JSON)', 'Export Backup to PC', 'Télécharger Sauvegarde')}</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.download('icon-inline', 14)} <span>\${txt('تصدير نسخة لجهازك (JSON)', 'Export Backup to PC', 'Télécharger Sauvegarde')}</span></span>`
);
adminCode = adminCode.replace(
  `<span>↑ \${txt('استعادة نسخة من الجهاز', 'Restore from PC', 'Restaurer du PC')}</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.upload('icon-inline', 14)} <span>\${txt('استعادة نسخة من الجهاز', 'Restore from PC', 'Restaurer du PC')}</span></span>`
);

fs.writeFileSync(adminPath, adminCode, 'utf8');
console.log('adminView.js updated cleanly.');

// =========================================================================
// 5. UPDATE assets/js/views/formsView.js
// =========================================================================
const formsPath = path.join(root, 'assets', 'js', 'views', 'formsView.js');
let formsCode = fs.readFileSync(formsPath, 'utf8');

formsCode = formsCode.replace(
  /const arrow = isRtl \? '←' : '→';/,
  "const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);"
);
formsCode = formsCode.replace(
  `<span>\${txt('تعبئة الاستمارة بالموقع', 'Fill Native Form', 'Remplir le Formulaire')}</span>\n                  <span>←</span>`,
  `<span>\${txt('تعبئة الاستمارة بالموقع', 'Fill Native Form', 'Remplir le Formulaire')}</span>\n                  <span style="display:inline-flex; align-items:center;">\${arrowIcon}</span>`
);
formsCode = formsCode.replace(
  `<span>رابط Google Form المباشر</span>\n                    <span>↗</span>`,
  `<span style="display:inline-flex; align-items:center; gap:4px;"><span>رابط Google Form المباشر</span> \${icons.externalLink('icon-inline', 12)}</span>`
);
formsCode = formsCode.replace(
  `↓ \${txt('تصدير Excel / CSV', 'Export CSV', 'Exporter CSV')}`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.fileSpreadsheet('icon-inline', 14)} <span>\${txt('تصدير Excel / CSV', 'Export CSV', 'Exporter CSV')}</span></span>`
);
formsCode = formsCode.replace(
  `فتح النموذج في Google Forms ↗`,
  `<span>فتح النموذج في Google Forms</span> <span style="display:inline-flex; align-items:center;">\${icons.externalLink('icon-inline', 13)}</span>`
);
formsCode = formsCode.replaceAll(
  `<span style="color: #CBD5E1;">←</span>`,
  `<span style="display:inline-flex; align-items:center; color: #94A3B8;">\${icons.arrowLeft('icon-inline', 14)}</span>`
);
formsCode = formsCode.replace(
  `← استعراض برامج أخرى`,
  `<span style="display:inline-flex; align-items:center; gap:6px;">\${icons.arrowRight('icon-inline', 14)} <span>استعراض برامج أخرى</span></span>`
);

fs.writeFileSync(formsPath, formsCode, 'utf8');
console.log('formsView.js updated cleanly.');

// =========================================================================
// 6. UPDATE assets/js/views/homeView.js
// =========================================================================
const homePath = path.join(root, 'assets', 'js', 'views', 'homeView.js');
let homeCode = fs.readFileSync(homePath, 'utf8');

homeCode = homeCode.replace(
  `<span>→ \${post.platform}</span>`,
  `<span style="display:inline-flex; align-items:center; gap:4px;"><span>\${post.platform}</span> \${icons.externalLink('icon-inline', 12)}</span>`
);
homeCode = homeCode.replace(
  `<span>→ \${currentLang === 'fr' ? 'Ouvrir sur' : (currentLang === 'ar' ? 'فتح المنشور على' : 'Open on')} \${post.platform}</span>`,
  `<span style="display:inline-flex; align-items:center; gap:6px;"><span>\${currentLang === 'fr' ? 'Ouvrir sur' : (currentLang === 'ar' ? 'فتح المنشور على' : 'Open on')} \${post.platform}</span> \${icons.externalLink('icon-inline', 14)}</span>`
);

fs.writeFileSync(homePath, homeCode, 'utf8');
console.log('homeView.js updated cleanly.');

// =========================================================================
// 7. UPDATE assets/js/views/projectsView.js
// =========================================================================
const projectsPath = path.join(root, 'assets', 'js', 'views', 'projectsView.js');
let projectsCode = fs.readFileSync(projectsPath, 'utf8');

projectsCode = projectsCode.replace(
  `↓ \${t.btnDownloadSummary}`,
  `<span style="display:inline-flex; align-items:center; gap:4px;">\${icons.download('icon-inline', 13)} <span>\${t.btnDownloadSummary}</span></span>`
);

fs.writeFileSync(projectsPath, projectsCode, 'utf8');
console.log('projectsView.js updated cleanly.');
