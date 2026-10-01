// assets/js/views/studentDashboardView.js
// Production Student LMS Portal & Learning Dashboard — SHAT Company Platform with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { examEngine } from '../tools/examEngine.js';

export function renderStudentDashboardView(lang = 'ar') {
  const user = api.currentUser;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  if (!user || (user.role !== 'student' && user.role !== 'admin')) {
    return `
      <div class="container" style="padding: 100px 16px 80px; text-align: center;">
        <div class="bento-card" style="max-width: 520px; margin: 0 auto; padding: 40px; box-shadow: var(--shadow-md);">
          <div class="section-badge" style="margin-bottom: 14px;">
            ${txt('أكاديمية شركة شات • SHAT Academy LMS', 'SHAT Academy LMS • Student Portal', 'Académie SHAT LMS • Espace Stagiaire')}
          </div>
          <h2 style="color: var(--shat-navy); margin-bottom: 12px; font-weight: 800;">
            ${txt('بوابة المتدربين المعتمدين', 'Accredited Trainee Portal', 'Portail des Stagiaires Certifiés')}
          </h2>
          <p style="color: var(--text-muted); margin-bottom: 24px; line-height: 1.7;">
            ${txt(
              'يتطلب الوصول إلى قاعاتك ومساقاتك التدريبية في شركة شات للتنمية والتطوير تسجيل الدخول بحساب متدرب مفعل في النظام.',
              'Access to course materials, classrooms, and assignments requires an authenticated student account.',
              'L’accès aux salles de cours, devoirs et ressources pédagogiques exige un compte stagiaire actif.'
            )}
          </p>
          <a href="#/login" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center;">
            ${txt('تسجيل الدخول إلى الأكاديمية', 'Sign In to Academy', 'Connexion à l’Académie')}
          </a>
          <div style="margin-top: 16px;">
            <a href="#/academy" style="font-size: 0.88rem; color: var(--shat-green); font-weight: 600;">
              ${txt('تصفح دليل المساقات العامة ←', 'Browse Course Catalog →', 'Consulter le catalogue des cours →')}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const studentName = lang === 'ar' ? (user.fullNameAr || user.username) : (user.fullNameEn || user.username);

  const t = {
    badge: txt('بوابة المتدرب المعتمد • Student Portal', 'Accredited Trainee Portal', 'Portail Stagiaire Certifié'),
    sessionActive: txt('جلسة موثقة', 'Authenticated Session', 'Session Sécurisée'),
    welcome: txt('مرحباً بك،', 'Welcome,', 'Bienvenue,'),
    trainingId: txt('الرقم التدريبي:', 'Trainee ID:', 'Matricule :'),
    btnClassroom: txt('قاعة المحاضرات الحالية', 'Open Classroom', 'Salle de Cours'),
    btnLogout: txt('تسجيل الخروج', 'Sign Out', 'Déconnexion'),
    continueBadge: txt('▶ تابع من حيث توقفت • Continue Learning', '▶ Continue Learning', '▶ Reprendre la Formation'),
    courseTitle: txt(
      'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات',
      'Core Humanitarian Standard (CHS) Diploma & Intervention Design',
      'Diplôme Norme Humanitaire Fondamentale (CHS) et Conception'
    ),
    courseSubtitle: txt(
      'الفصل الثاني: آليات المساءلة المجتمعية (AAP) وقنوات الشكاوى الحساسة • الدرس الرابع',
      'Chapter 2: Accountability to Affected Populations (AAP) & CFRM • Lesson 4',
      'Chapitre 2: Mécanismes de Redevabilité (AAP) & Circuits Sécurisés • Leçon 4'
    ),
    progressLabel: txt('نسبة إنجاز المساق', 'Course Completion', 'Progression du Cursus'),
    instructorLabel: txt('المحاضر:', 'Instructor:', 'Formateur :'),
    instructorName: txt('د. أسامة المنصور', 'Dr. Osama Al-Mansoor', 'Dr. Osama Al-Mansoor'),
    hoursMeta: txt('40 ساعة تدريبية معتمدة دولياً', '40 internationally accredited hours', '40 heures de formation certifiées'),
    btnResume: txt('متابعة التعلم والدخول للدرس الرابع', 'Resume Learning & Enter Lesson 4', 'Reprendre & Ouvrir la Leçon 4'),
    kpiActiveCourses: txt('المساقات النشطة', 'Active Courses', 'Cursus Actifs'),
    kpiActiveCount: txt('3 مساقات', '3 Courses', '3 Cursus'),
    kpiTasks: txt('التكليفات والواجبات', 'Field Assignments', 'Travaux & Devoirs'),
    kpiTasksCount: txt('2 معلق', '2 Pending', '2 En Attente'),
    kpiTasksDesc: txt('بانتظار تسليمك للحلول الميدانية', 'Awaiting field solutions submission', 'En attente de remise des travaux'),
    kpiGrade: txt('التقييم العام والمعدل', 'Overall Evaluation', 'Moyenne Générale'),
    kpiGradeDesc: txt('تقدير: ممتاز مع مرتبة الشرف', 'Grade: Honors with Distinction', 'Mention : Très Bien avec Félicitations'),
    assignmentsSectionKicker: txt('المهام الأكاديمية والتطبيقية', 'Academic & Applied Tasks', 'Travaux Pratiques & Évaluations'),
    assignmentsSectionTitle: txt('الواجبات والتكليفات الميدانية (Assignments)', 'Field Assignments & Submissions', 'Devoirs de Terrain & Livrables'),
    assignmentsSectionBadge: txt('2 واجبات بانتظار التسليم', '2 Tasks Awaiting Submission', '2 Devoirs à Soumettre'),
    task1Badge: txt('✓ تم التصحيح والاعتماد', '✓ Graded & Approved', '✓ Corrigé & Homologué'),
    task1Due: txt('الموعد: 15 سبتمبر 2026', 'Due: Sept 15, 2026', 'Échéance : 15 Septembre 2026'),
    task1Title: txt(
      'التكليف #1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية',
      'Assignment #1: AAP Mechanism & CFRM Design for Local NGO',
      'Devoir #1: Structuration du mécanisme de redevabilité (AAP/CFRM)'
    ),
    task1Feedback: txt(
      'عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت.',
      'Exceptional methodical delivery with strict compliance to complaints confidentiality and tracking matrix. Well done.',
      'Travail méthodique exemplaire avec un respect rigoureux de la confidentialité des alertes et du suivi. Félicitations.'
    ),
    task1ScoreLabel: txt('الدرجة المستحقة', 'Final Score', 'Note Obtenue'),
    task1Btn: txt('معاينة التسليم', 'View Submission', 'Consulter la Copie'),
    task2Badge: txt('بانتظار التسليم • Due: Oct 4', 'Pending Submission • Due: Oct 4', 'En Attente de Dépôt • 4 Octobre'),
    task2Remaining: txt('متبقي 4 أيام', '4 days remaining', '4 jours restants'),
    task2Title: txt(
      'التكليف #2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة في الميدان',
      'Assignment #2: CHS 9 Commitments Field Compliance & Audit Matrix',
      'Devoir #2: Matrice de conformité et audit de terrain aux 9 engagements CHS'
    ),
    task2Desc: txt(
      'تطبيق أدوات التقييم الذاتي للامتثال المؤسسي على سيناريو استجابة طوارئ افتراضي واستخراج فجوات المساءلة.',
      'Applying institutional self-assessment tools on emergency response scenarios to identify accountability gaps.',
      'Application des outils d’auto-évaluation sur un scénario d’urgence pour diagnostiquer les écarts de redevabilité.'
    ),
    task2Btn: txt('تسليم الحل الميداني الآن ↑', 'Submit Solution Now ↑', 'Déposer la Solution ↑'),
    driveTitle: txt(
      'الحقائب التدريبية والمراجع المعتمدة (تنزيل سحابي مباشر وآمن)',
      'Accredited Course Packages & Materials (Secure Direct Cloud Download)',
      'Supports de Formation & Manuels Agréés (Téléchargement Cloud Direct et Sécurisé)'
    ),
    driveSubtitle: txt('تحميل عبر Proxy الأكاديمية الرسمي', 'Official SHAT Academic Proxy', 'Proxy Académique Officiel SHAT'),
    downloadBtn: txt('تحميل', 'Download', 'Télécharger')
  };

  return `
    <div class="view-student-dashboard" style="padding-bottom: 100px;">
      
      <!-- Top Overview Greeting Banner -->
      <section class="student-header-section" style="background: linear-gradient(135deg, var(--shat-navy-deep) 0%, var(--shat-navy) 100%); color: #FFFFFF; padding: 48px 0 36px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(75, 136, 52, 0.25); color: #86EFAC; border: 1px solid rgba(75, 136, 52, 0.4);">
                  ${t.badge}
                </span>
                <span style="font-size: 0.8rem; color: #94A3B8;">• ${t.sessionActive}</span>
              </div>
              <h1 style="font-size: 1.95rem; font-weight: 900; margin-bottom: 6px; color: #FFFFFF;">
                ${t.welcome} ${studentName}
              </h1>
              <p style="font-size: 0.92rem; color: #CBD5E1; margin: 0;">
                ${t.trainingId} <strong style="font-family: var(--font-mono); color: #86EFAC;">${user.maskedNationalId || 'SHAT-TR-2026'}</strong> • ${user.email}
              </p>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button id="btn-student-view-cert" class="btn-clean btn-sm" style="background: rgba(16, 185, 129, 0.22); color: #6EE7B7; border: 1px solid rgba(52, 211, 153, 0.4); font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                <span>${txt('شهاداتي المعتمدة', 'My Certificates', 'Mes Certificats')}</span>
              </button>
              <button id="btn-student-id-card" class="btn-clean btn-sm" style="background: rgba(255, 255, 255, 0.16); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.28); font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                <span>${txt('بطاقة الحضور والباركود الرقمي', 'Digital Admission Pass', 'Pass Numérique')}</span>
              </button>
              <a href="#/course/shat-chs-master" class="btn-clean btn-green btn-sm">
                <span>${t.btnClassroom}</span>
              </a>
              <button id="btn-student-logout" class="btn-clean btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.3);">
                <span>${t.btnLogout}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Container -->
      <section class="section" style="padding-top: 36px;">
        <div class="container">
          
          <!-- Continue Learning Hero Card (Mobile-First Masterpiece) -->
          <div class="bento-card continue-learning-card" style="border: 2px solid rgba(75, 136, 52, 0.2); background: linear-gradient(135deg, #FFFFFF 0%, var(--shat-green-light) 100%); margin-bottom: 32px; padding: 28px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
              <div>
                <span class="badge" style="background: var(--shat-navy); color: #FFFFFF; font-size: 0.78rem; font-weight: 700; margin-bottom: 8px; display: inline-block;">
                  ${t.continueBadge}
                </span>
                <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--shat-navy); margin: 6px 0;">
                  ${t.courseTitle}
                </h2>
                <div style="font-size: 0.92rem; color: var(--text-secondary); font-weight: 600;">
                  ${t.courseSubtitle}
                </div>
              </div>

              <div style="text-align: end; min-width: 130px;">
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">${t.progressLabel}</div>
                <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); line-height: 1;">72%</div>
              </div>
            </div>

            <!-- Visual Progress Bar -->
            <div style="width: 100%; height: 10px; background: rgba(15, 46, 74, 0.08); border-radius: 99px; overflow: hidden; margin-bottom: 20px;">
              <div style="width: 72%; height: 100%; background: linear-gradient(90deg, var(--shat-green) 0%, var(--shat-green-light-accent) 100%); border-radius: 99px; transition: width 0.8s ease;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div style="font-size: 0.88rem; color: var(--text-muted);">
                ${t.instructorLabel} <strong>${t.instructorName}</strong> • ${t.hoursMeta}
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button type="button" id="btn-hero-take-exam" class="btn-clean btn-sm" style="background: var(--shat-green); color: #FFFFFF; font-weight: 800; border-radius: 6px; padding: 8px 16px; box-shadow: 0 3px 10px rgba(30,126,52,0.25);">
                  <span>✓ ${txt('الاختبار والشهادة المعتمدة', 'Exam & Certificate', 'Examen & Certificat')}</span>
                </button>
                <a href="#/course/shat-chs-master" class="btn-clean btn-primary btn-md" style="font-weight: 700;">
                  <span>${t.btnResume}</span>
                  <span>${arrow}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 3-Column Metrics Grid -->
          <div class="bento-grid grid-3" style="margin-bottom: 36px;">
            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-navy);">
              <span class="bento-kicker">${t.kpiActiveCourses}</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">${t.kpiActiveCount}</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">CHS Master, SPHERE Core, PSEA Safeguarding</p>
            </div>

            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-amber);">
              <span class="bento-kicker">${t.kpiTasks}</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: #D97706; margin: 6px 0;">${t.kpiTasksCount}</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">${t.kpiTasksDesc}</p>
            </div>

            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-green);">
              <span class="bento-kicker">${t.kpiGrade}</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); margin: 6px 0;">94 / 100</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">${t.kpiGradeDesc}</p>
            </div>
          </div>

          <!-- Section: Assignments & Tasks (Mobile-First Cards) -->
          <div class="bento-card" style="margin-bottom: 36px; padding: 28px;">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 16px; margin-bottom: 24px;">
              <div>
                <span class="bento-kicker">${t.assignmentsSectionKicker}</span>
                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy); margin: 4px 0;">
                  ${t.assignmentsSectionTitle}
                </h3>
              </div>
              <span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 700;">${t.assignmentsSectionBadge}</span>
            </div>

            <div class="assignments-list-wrapper" style="display: flex; flex-direction: column; gap: 16px;">
              
              <!-- Assignment Card 1: Graded -->
              <div class="assignment-item-card" style="background: var(--bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.78rem;">${t.task1Badge}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${t.task1Due}</span>
                  </div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 6px 0;">
                    ${t.task1Title}
                  </h4>
                  <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; background: #FFFFFF; padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); margin-top: 8px;">
                    <strong>${txt('ملاحظات المدرب:', 'Trainer Feedback:', 'Commentaires du Formateur :')}</strong> "${t.task1Feedback}"
                  </div>
                </div>

                <div style="text-align: end; min-width: 140px;">
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 2px;">${t.task1ScoreLabel}</div>
                  <div style="font-size: 1.8rem; font-weight: 900; color: var(--shat-green); font-family: var(--font-mono); margin-bottom: 8px;">
                    94 / 100
                  </div>
                  <a href="/api/files/download/sub-01-file" class="btn-clean btn-secondary btn-sm" download="submission_review.pdf">
                    <span>${t.task1Btn}</span>
                  </a>
                </div>
              </div>

              <!-- Assignment Card 2: Due Oct 4 (Pending) -->
              <div class="assignment-item-card" style="background: #FFFFFF; border-radius: var(--radius-sm); border: 2px solid #FCD34D; padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.78rem;">${t.task2Badge}</span>
                    <span style="font-size: 0.8rem; color: #B45309; font-weight: 600;">${t.task2Remaining}</span>
                  </div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 6px 0;">
                    ${t.task2Title}
                  </h4>
                  <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
                    ${t.task2Desc}
                  </p>
                </div>

                <div style="text-align: end; min-width: 140px;">
                  <button class="btn-clean btn-primary btn-sm btn-open-submit-modal" data-assign="assign-02" data-title="${t.task2Title}">
                    <span>${t.task2Btn}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Section: Secure Google Drive Materials -->
          <div class="bento-card" style="border-top: 4px solid var(--shat-green); padding: 28px;">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px;">
              <div>
                <span class="bento-kicker">${txt('المستودع السحابي للمساق', 'Course Cloud Repository', 'Espace Ressources Cloud')}</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin: 4px 0;">
                  ${t.driveTitle}
                </h3>
              </div>
              <span style="font-size: 0.82rem; color: var(--text-muted);">${t.driveSubtitle}</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
              <!-- Doc 1 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">CHS_Core_Handbook.pdf</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">4.8 MB • ${txt('وثيقة معتمدة', 'Accredited Document', 'Document Homologué')}</div>
                </div>
                <a href="/api/files/download/file-chs-01" class="btn-clean btn-green btn-sm" download="CHS_Handbook.pdf">
                  <span>${t.downloadBtn}</span>
                  <span>↓</span>
                </a>
              </div>

              <!-- Doc 2 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">AAP_Accountability_Toolkit.pptx</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">12.3 MB • ${txt('عرض تقديمي للمحاضرات', 'Lecture Slides', 'Présentation Didactique')}</div>
                </div>
                <a href="/api/files/download/file-chs-02" class="btn-clean btn-green btn-sm" download="AAP_Toolkit.pptx">
                  <span>${t.downloadBtn}</span>
                  <span>↓</span>
                </a>
              </div>

              <!-- Doc 3 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">CHS_Compliance_Matrix.xlsx</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">1.2 MB • ${txt('جداول إلكترونية للتدقيق', 'Audit Spreadsheet', 'Tableur d’Audit')}</div>
                </div>
                <a href="/api/files/download/file-chs-03" class="btn-clean btn-green btn-sm" download="CHS_Matrix.xlsx">
                  <span>${t.downloadBtn}</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  `;
}

export function bindStudentEvents() {
  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  const logoutBtn = document.getElementById('btn-student-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await api.logout();
      showToast(txt('تم تسجيل الخروج بنجاح. نلقاك قريباً في شركة شات!', 'Signed out successfully. See you soon at SHAT!', 'Déconnexion réussie. À bientôt chez SHAT !'), 'info');
      window.location.hash = '#/home';
    });
  }

  // Handle Exam and Accredited Certificate
  const btnHeroTakeExam = document.getElementById('btn-hero-take-exam');
  if (btnHeroTakeExam) {
    btnHeroTakeExam.onclick = () => {
      examEngine.initExam('shat-chs-master', currentLang);
    };
  }

  const btnViewCertTop = document.getElementById('btn-student-view-cert');
  if (btnViewCertTop) {
    btnViewCertTop.onclick = () => {
      let earned = {};
      try {
        earned = JSON.parse(localStorage.getItem('shat_earned_certificates') || '{}');
      } catch (e) {}
      const certList = Object.values(earned);
      if (certList.length > 0) {
        examEngine.openCertificateModal(certList[certList.length - 1], currentLang);
      } else {
        examEngine.initExam('shat-chs-master', currentLang);
      }
    };
  }

  // Handle Digital Admission Pass & QR Badge Modal
  const btnIdCard = document.getElementById('btn-student-id-card');
  if (btnIdCard) {
    btnIdCard.onclick = () => {
      openStudentPassModal(currentLang);
    };
  }

  // Handle Assignment Submission Modal
  document.querySelectorAll('.btn-open-submit-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('global-modal-backdrop');
      const title = document.getElementById('global-modal-title');
      const body = document.getElementById('global-modal-body');

      if (!modal || !body) return;

      const assignTitle = btn.getAttribute('data-title') || txt('مصفوفة التدقيق والامتثال لمعايير CHS التسعة', 'CHS 9 Commitments Audit Matrix', 'Matrice d’Audit CHS');
      const assignId = btn.getAttribute('data-assign') || 'assign-02';

      if (title) title.textContent = txt('تسليم التكليف الميداني للأكاديمية', 'Submit Field Assignment', 'Dépôt du Devoir Académique');

      body.innerHTML = `
        <form id="student-assignment-submit-form">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); margin-bottom: 16px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green);">${txt('المساق التدريبي:', 'Accredited Course:', 'Cursus Certifié :')}</div>
            <div style="font-weight: 800; color: var(--shat-navy);">${txt('دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات', 'Core Humanitarian Standard (CHS) Diploma', 'Diplôme Norme Humanitaire Fondamentale (CHS)')}</div>
            <div style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 4px;">${assignTitle}</div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${txt('الملف الميداني المطلوب تسليمه (PDF, DOCX, XLSX) *', 'Submission File (PDF, DOCX, XLSX) *', 'Fichier du Devoir (PDF, DOCX, XLSX) *')}</label>
            <input type="file" id="submit-file-input" class="form-input" accept=".pdf,.docx,.xlsx" required style="padding: 10px;" />
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${txt('الحد الأقصى للملف: 15 ميجابايت • يتم حفظه في مستودع المنصة الآمن', 'Max size: 15 MB • Stored securely in platform cloud', 'Taille max: 15 Mo • Stocké sur le cloud sécurisé de la plateforme')}</div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${txt('ملاحظات وتوضيحات للمدرب', 'Notes for Trainer', 'Remarques pour le Formateur')}</label>
            <textarea id="submit-notes-input" class="form-textarea" rows="3" placeholder="${txt('أدخل أي ملاحظات ترغب بإيصالها للمحاضر حول منهجية الحل الميداني...', 'Add any remarks or context for the trainer regarding your solution...', 'Ajoutez des remarques éventuelles sur votre démarche méthodologique...')}"></textarea>
          </div>

          <button type="submit" id="btn-confirm-submission" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center;">
            <span>${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span>
            <span>↑</span>
          </button>
        </form>
      `;

      modal.classList.add('open');

      const submitForm = document.getElementById('student-assignment-submit-form');
      if (submitForm) {
        submitForm.addEventListener('submit', async (ev) => {
          ev.preventDefault();
          const fileInput = document.getElementById('submit-file-input');
          const notes = document.getElementById('submit-notes-input')?.value;

          const file = fileInput && fileInput.files && fileInput.files[0];
          if (!file) {
            showToast(txt('الرجاء اختيار ملف للتسليم.', 'Please select a file to submit.', 'Veuillez sélectionner un fichier.'), 'warning');
            return;
          }

          const btnConfirm = document.getElementById('btn-confirm-submission');
          if (btnConfirm) {
            btnConfirm.disabled = true;
            btnConfirm.innerHTML = `<span>${txt('جاري رفع وتوثيق التسليم...', 'Uploading submission...', 'Téléversement en cours...')}</span>`;
          }

          try {
            await api.submitAssignment(assignId, file.name, notes);
            showToast(txt('تم استلام ملف التكليف بنجاح وإرساله للمدرب لرصد التقييم والدرجات!', 'Assignment file uploaded successfully and sent to trainer for grading!', 'Devoir téléversé avec succès et transmis au formateur pour notation !'), 'success');
            modal.classList.remove('open');
            setTimeout(() => {
              window.location.reload();
            }, 800);
          } catch (e) {
            showToast(txt('تعذر إتمام التسليم: ', 'Failed to submit assignment: ', 'Échec de la soumission : ') + e.message, 'error');
            if (btnConfirm) {
              btnConfirm.disabled = false;
              btnConfirm.innerHTML = `<span>${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span><span>↑</span>`;
            }
          }
        });
      }
    });
  });
}

function openStudentPassModal(lang = 'ar') {
  const modal = document.getElementById('modal-admission-pass');
  const body = document.getElementById('modal-admission-pass-body');
  const closeBtn = document.getElementById('modal-admission-pass-close');
  if (!modal || !body) return;

  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');

  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));
  const user = api.currentUser || {
    id: 'student-01',
    fullNameAr: 'أحمد خليل المصري',
    fullNameEn: 'Ahmed Khalil Al-Masri',
    email: 'student@shat-company.ps',
    phone: '+972 59 900 1234',
    maskedNationalId: '401928374'
  };

  const studentName = isRtl ? (user.fullNameAr || user.username) : (user.fullNameEn || user.username);
  const passId = `SHAT-PASS-2026-${(user.id || 'STU01').toUpperCase()}`;
  const issueDate = '2026-03-01';
  const validUntil = '2026-12-31';

  body.innerHTML = `
    <div class="admission-pass-card">
      <!-- Top Executive Banner -->
      <div class="admission-pass-banner">
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT" style="width: 44px; height: 44px; object-fit: contain;" onerror="this.onerror=null; this.src='assets/logo/logo-circle.jpg';">
            <div>
              <div style="font-size: 1.05rem; font-weight: 900; color: #FFFFFF; letter-spacing: -0.3px;">شركة شات للتنمية والتطوير</div>
              <div style="font-size: 0.72rem; color: #86EFAC; font-weight: 700;">SHAT ACADEMY • EXECUTIVE TRAINING CREDENTIAL</div>
            </div>
          </div>
          <span style="background: rgba(16,185,129,0.22); border: 1px solid rgba(52,211,153,0.4); color: #34D399; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 999px;">
            2026 • معتمد
          </span>
        </div>

        <div style="margin-top: 18px; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 12px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: #94A3B8; font-weight: 700;">
            ${txt('بطاقة حضور وقبول تدريبي معتمدة', 'Official Trainee Admission Pass', 'Pass d\'Admission Officiel')}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: #FCD34D; font-weight: 800;">
            ${passId}
          </div>
        </div>
      </div>

      <!-- Pass Inner Content -->
      <div class="admission-pass-body">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
          <!-- Trainee Info -->
          <div style="flex: 1; min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
              <div style="width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, var(--shat-green), var(--shat-navy)); color: #FFFFFF; font-size: 1.4rem; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16,185,129,0.3); flex-shrink: 0;">
                ${studentName.charAt(0)}
              </div>
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 0 0 4px 0;">
                  ${studentName}
                </h3>
                <div class="admission-pass-hologram">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
                  <span>${txt('متدرب نشط ومسجل رسمياً', 'Active Verified Trainee', 'Stagiaire Actif & Certifié')}</span>
                </div>
              </div>
            </div>

            <!-- Trainee Metadata Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem; background: #F8FAFC; padding: 12px; border-radius: 8px; border: 1px solid #E2E8F0;">
              <div>
                <span style="color: #64748B; font-weight: 600;">${txt('الرقم التدريبي:', 'Trainee ID:', 'Matricule :')}</span>
                <div style="font-weight: 800; color: var(--shat-navy); font-family: var(--font-mono);">${user.maskedNationalId || 'SHAT-40192'}</div>
              </div>
              <div>
                <span style="color: #64748B; font-weight: 600;">${txt('الصفة الأكاديمية:', 'Capacity:', 'Statut :')}</span>
                <div style="font-weight: 800; color: var(--shat-green);">${txt('متدرب تنفيذي', 'Executive Trainee', 'Stagiaire Exécutif')}</div>
              </div>
              <div>
                <span style="color: #64748B; font-weight: 600;">${txt('تاريخ الإصدار:', 'Issued:', 'Émis le :')}</span>
                <div style="font-weight: 700; color: #334155;">${issueDate}</div>
              </div>
              <div>
                <span style="color: #64748B; font-weight: 600;">${txt('صالحة لغاية:', 'Valid Until:', 'Valide jusqu\'au :')}</span>
                <div style="font-weight: 700; color: #334155;">${validUntil}</div>
              </div>
            </div>
          </div>

          <!-- Crisp SVG QR Code Module -->
          <div style="text-align: center;">
            <div class="admission-pass-qr-frame">
              <svg viewBox="0 0 100 100" width="100%" height="100%" style="display: block;">
                <!-- QR Finder 1 (Top Left) -->
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F2E4A" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#10B981" />
                
                <!-- QR Finder 2 (Top Right) -->
                <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F2E4A" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#10B981" />

                <!-- QR Finder 3 (Bottom Left) -->
                <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F2E4A" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#10B981" />

                <!-- Data Blocks & Timing -->
                <rect x="36" y="8" width="5" height="5" fill="#0F2E4A"/>
                <rect x="44" y="8" width="5" height="5" fill="#0F2E4A"/>
                <rect x="52" y="8" width="5" height="5" fill="#0F2E4A"/>
                <rect x="60" y="8" width="5" height="5" fill="#0F2E4A"/>

                <rect x="36" y="20" width="5" height="5" fill="#0F2E4A"/>
                <rect x="48" y="20" width="7" height="5" fill="#10B981"/>
                <rect x="58" y="20" width="5" height="5" fill="#0F2E4A"/>

                <rect x="8" y="36" width="5" height="5" fill="#0F2E4A"/>
                <rect x="8" y="44" width="5" height="5" fill="#0F2E4A"/>
                <rect x="8" y="52" width="5" height="5" fill="#0F2E4A"/>
                <rect x="8" y="60" width="5" height="5" fill="#0F2E4A"/>

                <!-- Matrix Payload Dots -->
                <rect x="20" y="38" width="5" height="5" fill="#0F2E4A"/>
                <rect x="28" y="38" width="5" height="5" fill="#0F2E4A"/>
                <rect x="36" y="38" width="6" height="6" fill="#10B981"/>
                <rect x="46" y="38" width="6" height="6" fill="#0F2E4A"/>
                <rect x="56" y="38" width="5" height="5" fill="#0F2E4A"/>
                <rect x="64" y="38" width="6" height="6" fill="#10B981"/>
                <rect x="74" y="38" width="5" height="5" fill="#0F2E4A"/>
                <rect x="84" y="38" width="5" height="5" fill="#0F2E4A"/>

                <rect x="20" y="48" width="5" height="5" fill="#0F2E4A"/>
                <rect x="30" y="48" width="6" height="6" fill="#0F2E4A"/>
                <rect x="40" y="48" width="6" height="6" fill="#10B981"/>
                <rect x="50" y="48" width="6" height="6" fill="#0F2E4A"/>
                <rect x="60" y="48" width="6" height="6" fill="#0F2E4A"/>
                <rect x="70" y="48" width="6" height="6" fill="#10B981"/>
                <rect x="82" y="48" width="5" height="5" fill="#0F2E4A"/>

                <rect x="36" y="58" width="5" height="5" fill="#0F2E4A"/>
                <rect x="46" y="58" width="6" height="6" fill="#10B981"/>
                <rect x="56" y="58" width="6" height="6" fill="#0F2E4A"/>
                <rect x="66" y="58" width="5" height="5" fill="#0F2E4A"/>
                <rect x="76" y="58" width="6" height="6" fill="#10B981"/>

                <rect x="38" y="70" width="5" height="5" fill="#0F2E4A"/>
                <rect x="48" y="70" width="6" height="6" fill="#0F2E4A"/>
                <rect x="58" y="70" width="6" height="6" fill="#10B981"/>
                <rect x="68" y="70" width="5" height="5" fill="#0F2E4A"/>
                <rect x="78" y="70" width="5" height="5" fill="#0F2E4A"/>

                <rect x="38" y="82" width="6" height="6" fill="#10B981"/>
                <rect x="48" y="82" width="5" height="5" fill="#0F2E4A"/>
                <rect x="58" y="82" width="6" height="6" fill="#0F2E4A"/>
                <rect x="70" y="82" width="5" height="5" fill="#0F2E4A"/>
                <rect x="80" y="82" width="6" height="6" fill="#10B981"/>
              </svg>
            </div>
            <div style="font-size: 0.68rem; font-family: var(--font-mono); color: #64748B; margin-top: 6px; font-weight: 700;">
              SCAN TO VERIFY
            </div>
          </div>
        </div>

        <!-- Enrolled Course Details -->
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
          <div style="font-size: 0.74rem; font-weight: 800; color: #1E40AF; text-transform: uppercase;">
            ${txt('المساق التدريبي المعتمد:', 'Enrolled Accredited Track:', 'Cursus Homologué :')}
          </div>
          <div style="font-size: 0.96rem; font-weight: 900; color: var(--shat-navy); margin-top: 2px;">
            ${txt('دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات', 'Core Humanitarian Standard (CHS) Diploma', 'Diplôme Norme Humanitaire Fondamentale (CHS)')}
          </div>
          <div style="font-size: 0.78rem; color: #3B82F6; margin-top: 4px; display: flex; gap: 12px; flex-wrap: wrap;">
            <span>المدرب: د. أسامة المنصور</span>
            <span>•</span>
            <span>40 ساعة تدريبية</span>
            <span>•</span>
            <span>• قاعة التدريب المباشر والافتراضي</span>
          </div>
        </div>

        <!-- Microprint Security Banner -->
        <div style="border-top: 1px dashed #CBD5E1; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.68rem; color: #94A3B8;">
          <span>SHAT DEVELOPMENT & GROWTH • OFFICIAL ENROLLMENT BADGE</span>
          <span>SECURE CRYPTOGRAPHIC TOKEN: #SHAT-SEC-2026</span>
        </div>

      </div>
    </div>

    <!-- Action Buttons Bar (Excluded from Print) -->
    <div class="no-print" style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <button type="button" class="btn-clean btn-secondary btn-md" id="btn-close-pass-inner">
        ${txt('إغلاق', 'Close', 'Fermer')}
      </button>

      <button type="button" class="btn-clean btn-primary btn-md allow-print" id="btn-trigger-print-pass" style="background: var(--shat-navy); font-weight: 800; box-shadow: 0 4px 14px rgba(15,46,74,0.3);">
        ⎙ ${txt('طباعة البطاقة / حفظ كـ PDF', 'Print / Save Pass (PDF)', 'Imprimer le Pass (PDF)')}
      </button>
    </div>
  `;

  modal.classList.add('open');

  const btnCloseInner = document.getElementById('btn-close-pass-inner');
  if (btnCloseInner) btnCloseInner.onclick = () => modal.classList.remove('open');

  const btnPrint = document.getElementById('btn-trigger-print-pass');
  if (btnPrint) {
    btnPrint.onclick = () => {
      window.print();
    };
  }
}
