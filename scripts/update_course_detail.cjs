const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'js', 'views', 'courseDetailView.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Arrow icon setup
code = code.replace(
  /const arrow = isRtl \? '←' : '→';/,
  "const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);"
);

// 2. btnBackDashboard text
code = code.replace(
  "btnBackDashboard: txt('← العودة للوحة التعلم', '← Back to Learning Dashboard', '← Retour au Tableau de Bord'),",
  "btnBackDashboard: txt('العودة للوحة التعلم', 'Back to Learning Dashboard', 'Retour au Tableau de Bord'),"
);

// 2b. btnBackDashboard link markup
code = code.replace(
  `<a href="#/student" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy);">
              <span>\${t.btnBackDashboard}</span>
            </a>`,
  `<a href="#/student" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); display: inline-flex; align-items: center; gap: 6px;">
              <span style="display: inline-flex; align-items: center;">\${isRtl ? icons.arrowRight('icon-inline', 14) : icons.arrowLeft('icon-inline', 14)}</span>
              <span>\${t.btnBackDashboard}</span>
            </a>`
);

// 3. Fee badge
code = code.replace(
  `\${c.fee ? \`<span class="badge" style="background: rgba(217, 119, 6, 0.25); color: #FCD34D; border: 1px solid rgba(252, 211, 77, 0.4); font-weight: 800;"><span class="pro-symbol-badge"></span> \${c.fee}</span>\` : ''}`,
  `\${c.fee ? \`<span class="badge" style="background: rgba(217, 119, 6, 0.25); color: #FCD34D; border: 1px solid rgba(252, 211, 77, 0.4); font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">\${icons.award('icon-inline', 14)} \${c.fee}</span>\` : ''}`
);

// 4. Instructor, Hours, Schedule
code = code.replace(
  `<div style="display: flex; align-items: center; gap: 6px;"><span class="pro-symbol-badge"></span> \${txt('المدرب المعتمد:', 'Master Trainer:', 'Formateur Expert :')} <strong style="color: #FFFFFF;">\${c.instructorName || 'أ. حسام جاد الله'}</strong></div>`,
  `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #4ADE80; display: inline-flex; align-items: center;">\${icons.user('icon-inline', 15)}</span> \${txt('المدرب المعتمد:', 'Master Trainer:', 'Formateur Expert :')} <strong style="color: #FFFFFF;">\${c.instructorName || 'أ. حسام جاد الله'}</strong></div>`
);

code = code.replace(
  `<div style="display: flex; align-items: center; gap: 6px;"><span class="pro-symbol-badge"></span> \${txt('الساعات المعتمدة:', 'Accredited Hours:', 'Heures Certifiées :')} <strong style="color: #FFFFFF;">\${c.hours || '30 ساعة'}</strong></div>`,
  `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #4ADE80; display: inline-flex; align-items: center;">\${icons.clock('icon-inline', 15)}</span> \${txt('الساعات المعتمدة:', 'Accredited Hours:', 'Heures Certifiées :')} <strong style="color: #FFFFFF;">\${c.hours || '30 ساعة'}</strong></div>`
);

code = code.replace(
  `<div style="display: flex; align-items: center; gap: 6px;"><span class="pro-symbol-badge"></span> \${txt('المواعيد:', 'Schedule:', 'Horaires :')} <strong style="color: #FFFFFF;">\${c.schedule || 'مرن / أسبوعي'}</strong></div>`,
  `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #4ADE80; display: inline-flex; align-items: center;">\${icons.calendar('icon-inline', 15)}</span> \${txt('المواعيد:', 'Schedule:', 'Horaires :')} <strong style="color: #FFFFFF;">\${c.schedule || 'مرن / أسبوعي'}</strong></div>`
);

// 5. Drive open link
code = code.replace(
  `<span>\${txt('فتح مجلد Google Drive للمساق', 'Open Google Drive Materials', 'Ouvrir Dossier Google Drive')}</span>
                  <span>↗</span>`,
  `<span style="display: inline-flex; align-items: center;">\${icons.drive('icon-inline', 15)}</span>
                  <span>\${txt('فتح مجلد Google Drive للمساق', 'Open Google Drive Materials', 'Ouvrir Dossier Google Drive')}</span>
                  <span style="display: inline-flex; align-items: center;">\${icons.externalLink('icon-inline', 13)}</span>`
);

// 6. Google Form registration
code = code.replace(
  `<span class="pro-symbol-badge"></span>
                    <span>\${txt('التسجيل عبر Google Form الرسمي', 'Register via Official Google Form', 'Inscription via Google Form')}</span>
                    <span style="font-size: 0.8rem;">↗</span>`,
  `<span style="display: inline-flex; align-items: center;">\${icons.form('icon-inline', 16)}</span>
                    <span>\${txt('التسجيل عبر Google Form الرسمي', 'Register via Official Google Form', 'Inscription via Google Form')}</span>
                    <span style="display: inline-flex; align-items: center;">\${icons.externalLink('icon-inline', 13)}</span>`
);

// 7. Instant Platform Registration Button
code = code.replace(
  `<span>\${txt('التسجيل الفوري باستمارة المنصة', 'Quick Platform Registration', 'Inscription Rapide Plateforme')}</span>
                  <span>\${arrow}</span>`,
  `<span>\${txt('التسجيل الفوري باستمارة المنصة', 'Quick Platform Registration', 'Inscription Rapide Plateforme')}</span>
                  <span style="display: inline-flex; align-items: center;">\${arrowIcon}</span>`
);

// 8. Drive Intercept Button
code = code.replace(
  `<span>\${txt('حقيبة Google Drive (يتطلب تسجيلاً)', 'Drive Materials (Enroll to Access)', 'Dossier Drive (Connexion Requise)')}</span>`,
  `<span style="display: inline-flex; align-items: center; margin-inline-end: 6px;">\${icons.drive('icon-inline', 14)}</span><span>\${txt('حقيبة Google Drive (يتطلب تسجيلاً)', 'Drive Materials (Enroll to Access)', 'Dossier Drive (Connexion Requise)')}</span>`
);

// 9. Syllabus Button
code = code.replace(
  `<span class="pro-symbol-badge"></span>
                <span>\${txt('تحميل / استعراض الخطة (Syllabus)', 'Accredited Syllabus (PDF)', 'Syllabus Officiel (PDF)')}</span>`,
  `<span style="display: inline-flex; align-items: center;">\${icons.book('icon-inline', 16)}</span>
                <span>\${txt('تحميل / استعراض الخطة (Syllabus)', 'Accredited Syllabus (PDF)', 'Syllabus Officiel (PDF)')}</span>`
);

// 10. Direct Download link ↓
code = code.replace(
  `<span>↓ \${txt('تنزيل مباشر', 'Direct Download', 'Télécharger')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 4px;">\${icons.download('icon-inline', 14)} <span>\${txt('تنزيل مباشر', 'Direct Download', 'Télécharger')}</span></span>`
);

// 11. Buttons in Tools & Exam widgets
code = code.replace(
  `<span>\${txt('خوض الاختبار النهائي المعتمد', 'Take Final Accredited Exam', 'Passer l’Examen Final')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.award('icon-inline', 16)} <span>\${txt('خوض الاختبار النهائي المعتمد', 'Take Final Accredited Exam', 'Passer l’Examen Final')}</span></span>`
);

code = code.replace(
  `<span>\${txt('استعراض شهاداتي المكتسبة', 'View My Earned Certificates', 'Mes Certificats')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.award('icon-inline', 14)} <span>\${txt('استعراض شهاداتي المكتسبة', 'View My Earned Certificates', 'Mes Certificats')}</span></span>`
);

code = code.replace(
  `<span>• \${txt('التحقق من الشهادات الرقمية الصادرة', 'Verify Digital Certificates', 'Vérifier Certificats')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.shieldCheck('icon-inline', 14)} <span>\${txt('التحقق من الشهادات الرقمية الصادرة', 'Verify Digital Certificates', 'Vérifier Certificats')}</span></span>`
);

code = code.replace(
  `<span>\${txt('قوائم التحقق والامتثال للمعايير', 'Standards Compliance Explorer', 'Normes & Référentiels')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.clipboardCheck('icon-inline', 14)} <span>\${txt('قوائم التحقق والامتثال للمعايير', 'Standards Compliance Explorer', 'Normes & Référentiels')}</span></span>`
);

code = code.replace(
  `<span>\${txt('مكتبة القوالب والمصفوفات الميدانية', 'Field Toolkits & Matrices Hub', 'Modèles & Outils')}</span>`,
  `<span style="display: inline-flex; align-items: center; gap: 6px;">\${icons.folder('icon-inline', 14)} <span>\${txt('مكتبة القوالب والمصفوفات الميدانية', 'Field Toolkits & Matrices Hub', 'Modèles & Outils')}</span></span>`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('courseDetailView.js updated cleanly!');
