// assets/js/views/studentDashboardView.js
// Production Student LMS Portal & Learning Dashboard — SHAT Company Platform with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { examEngine } from '../tools/examEngine.js';
import { icons } from '../icons.js';

export function renderStudentDashboardView(lang = 'ar') {
  const storedUser = JSON.parse(localStorage.getItem('shat_current_user') || 'null');
  const user = api.currentUser || storedUser;
  if (!api.currentUser && storedUser) {
    api.currentUser = storedUser;
  }
  const isRtl = lang === 'ar';
  const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);
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
              <span style="display: inline-flex; align-items: center; gap: 6px;"><span>${txt('تصفح دليل المساقات العامة', 'Browse Course Catalog', 'Consulter le catalogue des cours')}</span> ${arrowIcon}</span>
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
    continueBadge: txt('تابع من حيث توقفت • Continue Learning', 'Continue Learning', 'Reprendre la Formation'),
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
    task1Badge: txt('تم التصحيح والاعتماد', 'Graded & Approved', 'Corrigé & Homologué'),
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
    task2Btn: txt('تسليم الحل الميداني الآن', 'Submit Solution Now', 'Déposer la Solution'),
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
      
      <!-- Top Overview Greeting Banner with Double-Bezel Hardware Architecture -->
      <section class="student-header-section" style="padding: 40px 0 20px 0;">
        <div class="container">
          <div class="portal-hero-banner">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; position: relative; z-index: 2;">
              
              <!-- Trainee Profile Info with Glowing Status & Avatar -->
              <div style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap;">
                <div style="
                  width: 64px;
                  height: 64px;
                  border-radius: 18px;
                  background: linear-gradient(135deg, #10B981 0%, #059669 50%, #0B2548 100%);
                  color: #FFFFFF;
                  font-size: 1.7rem;
                  font-weight: 900;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
                  border: 2px solid rgba(255, 255, 255, 0.25);
                  flex-shrink: 0;
                ">
                  ${studentName.charAt(0)}
                </div>

                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
                    <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #86EFAC; border: 1px solid rgba(52, 211, 153, 0.4); font-weight: 800; font-size: 0.78rem; padding: 4px 12px; border-radius: 999px;">
                      ${t.badge}
                    </span>
                    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94A3B8; font-weight: 600;">
                      <span class="portal-pulse-dot"></span>
                      <span>${t.sessionActive} • 2026</span>
                    </span>
                  </div>
                  <h1 style="font-size: 1.95rem; font-weight: 900; margin: 0 0 6px 0; color: #FFFFFF; letter-spacing: -0.4px;">
                    ${t.welcome} ${studentName}
                  </h1>
                  <p style="font-size: 0.9rem; color: #CBD5E1; margin: 0; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span>${t.trainingId}</span>
                    <strong style="font-family: var(--font-mono); color: #86EFAC; background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12);">${user.maskedNationalId || 'SHAT-TR-2026-904'}</strong>
                    <span style="opacity: 0.5;">•</span>
                    <span style="color: #94A3B8;">${user.email || 'student@shat-company.ps'}</span>
                  </p>
                </div>
              </div>

              <!-- Executive Action Command Bar -->
              <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <button id="btn-student-id-card" class="btn-clean btn-sm" style="background: rgba(255, 255, 255, 0.12); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.25); font-weight: 800; box-shadow: 0 4px 12px rgba(0,0,0,0.25); border-radius: 10px; padding: 9px 15px;">
                  <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.idCard('icon-inline', 15)} <span>${txt('بطاقة الحضور والباركود الرقمي', 'Digital Admission Pass', 'Pass Numérique')}</span></span>
                </button>
                <button id="btn-student-view-cert" class="btn-clean btn-sm" style="background: rgba(16, 185, 129, 0.22); color: #6EE7B7; border: 1px solid rgba(52, 211, 153, 0.45); font-weight: 800; box-shadow: 0 4px 14px rgba(16,185,129,0.2); border-radius: 10px; padding: 9px 15px;">
                  <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.award('icon-inline', 15)} <span>${txt('شهاداتي المعتمدة', 'My Certificates', 'Mes Certificats')}</span></span>
                </button>
                <a href="#/course/shat-chs-master" class="btn-clean btn-green btn-sm" style="font-weight: 800; border-radius: 10px; padding: 9px 16px; box-shadow: 0 4px 14px rgba(30,126,52,0.35);">
                  <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.graduationCap('icon-inline', 15)} <span>${t.btnClassroom}</span></span>
                </a>
                <button id="btn-student-logout" class="btn-clean btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 10px; padding: 9px 14px;">
                  <span>${t.btnLogout}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Container -->
      <section class="section" style="padding-top: 24px;">
        <div class="container">
          
          <!-- Double-Bezel Continue Learning Hero Feature Card -->
          <div class="portal-bezel-wrapper" style="margin-bottom: 32px;">
            <div class="portal-bezel-inner" style="background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 50%, #DCFCE7 100%); border: 1.5px solid #BBF7D0; padding: 32px;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; margin-bottom: 22px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                    <span class="badge" style="background: #0F2E4A; color: #FFFFFF; font-size: 0.76rem; font-weight: 800; padding: 4px 12px; border-radius: 999px;">
                      ${t.continueBadge}
                    </span>
                    <span style="background: #FEF3C7; color: #92400E; font-size: 0.74rem; font-weight: 800; padding: 3px 10px; border-radius: 999px; border: 1px solid #FCD34D;">
                      ${txt('الفصل الثاني • قيد الدراسة الآن', 'Chapter 2 • In Progress', 'Chapitre 2 • En cours')}
                    </span>
                  </div>
                  <h2 style="font-size: 1.48rem; font-weight: 900; color: #0F2E4A; margin: 4px 0 6px 0; letter-spacing: -0.3px;">
                    ${t.courseTitle}
                  </h2>
                  <div style="font-size: 0.94rem; color: #334155; font-weight: 600; line-height: 1.5;">
                    ${t.courseSubtitle}
                  </div>
                </div>

                <div style="text-align: end; min-width: 140px; background: rgba(255,255,255,0.7); padding: 12px 18px; border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.25); box-shadow: 0 4px 12px rgba(16,185,129,0.08);">
                  <div style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">${t.progressLabel}</div>
                  <div style="font-size: 2.4rem; font-weight: 900; color: #047857; line-height: 1; font-family: var(--font-mono);">72%</div>
                  <div style="font-size: 0.72rem; color: #10B981; font-weight: 700; margin-top: 4px;">+18% ${txt('خلال هذا الأسبوع', 'this week', 'cette semaine')}</div>
                </div>
              </div>

              <!-- Visual Progress Bar with Milestones -->
              <div style="margin-bottom: 20px;">
                <div style="width: 100%; height: 12px; background: rgba(15, 46, 74, 0.08); border-radius: 99px; overflow: hidden; position: relative;">
                  <div style="width: 72%; height: 100%; background: linear-gradient(90deg, #10B981 0%, #059669 100%); border-radius: 99px; transition: width 0.8s ease; box-shadow: 0 0 10px rgba(16,185,129,0.5);"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.72rem; color: #64748B; font-weight: 700; font-family: var(--font-mono);">
                  <span>0% ${txt('البداية', 'Start', 'Début')}</span>
                  <span>25% ${txt('الفصل 1', 'Ch. 1', 'Ch. 1')}</span>
                  <span>50% ${txt('الفصل 2', 'Ch. 2', 'Ch. 2')}</span>
                  <span style="color: #047857; font-weight: 900;">72% ${txt('موقعك الحالي', 'Current', 'Position')}</span>
                  <span>100% ${txt('الشهادة', 'Diploma', 'Diplôme')}</span>
                </div>
              </div>

              <!-- Curricular Roadmap Timeline Widget -->
              <div style="background: rgba(255,255,255,0.7); border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.2); padding: 18px 20px; margin-bottom: 22px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #0F2E4A; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${txt('خارطة التقدم الأكاديمي للمساق (Syllabus Roadmap)', 'Course Syllabus Roadmap', 'Parcours Pédagogique du Cursus')}
                </div>
                
                <div class="roadmap-timeline-container">
                  <div class="roadmap-timeline-bar">
                    <div class="roadmap-timeline-bar-fill" style="width: 65%;"></div>
                  </div>

                  <!-- Step 1: Completed -->
                  <div class="roadmap-timeline-step completed">
                    <div class="roadmap-timeline-node">✓</div>
                    <div>
                      <div style="font-weight: 800; font-size: 0.84rem; color: #166534;">${txt('الفصل 1: الإطار التأسيسي', 'Ch. 1: Conceptual Framework', 'Ch. 1: Cadre Conceptuel')}</div>
                      <div style="font-size: 0.72rem; color: #64748B;">100% • ${txt('تم الإنجاز بالكامل', 'Fully Completed', 'Validé à 100%')}</div>
                    </div>
                  </div>

                  <!-- Step 2: Active -->
                  <div class="roadmap-timeline-step active">
                    <div class="roadmap-timeline-node">2</div>
                    <div>
                      <div style="font-weight: 900; font-size: 0.84rem; color: #0F2E4A;">${txt('الفصل 2: المساءلة وAAP', 'Ch. 2: Accountability & AAP', 'Ch. 2: Redevabilité & AAP')}</div>
                      <div style="font-size: 0.72rem; color: #059669; font-weight: 700;">${txt('قيد الدراسة • الدرس 4', 'Active • Lesson 4', 'En Cours • Leçon 4')}</div>
                    </div>
                  </div>

                  <!-- Step 3: Upcoming -->
                  <div class="roadmap-timeline-step upcoming">
                    <div class="roadmap-timeline-node">3</div>
                    <div>
                      <div style="font-weight: 700; font-size: 0.84rem; color: #64748B;">${txt('الفصل 3: مصفوفة الامتثال', 'Ch. 3: Field Audit Matrix', 'Ch. 3: Matrice d’Audit')}</div>
                      <div style="font-size: 0.72rem; color: #94A3B8;">${txt('يبدأ في 12 أكتوبر', 'Starts Oct 12', 'Débute le 12 Octobre')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer with Faculty Details & Button-in-Button Action -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-top: 1px solid rgba(16, 185, 129, 0.2); padding-top: 18px;">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: #475569;">
                  <span style="width: 32px; height: 32px; border-radius: 50%; background: #0F2E4A; color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">
                    أ
                  </span>
                  <div>
                    <div>${t.instructorLabel} <strong style="color: #0F2E4A;">${t.instructorName}</strong></div>
                    <div style="font-size: 0.76rem; color: #64748B;">${t.hoursMeta}</div>
                  </div>
                </div>

                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                  <button type="button" id="btn-hero-take-exam" class="btn-clean btn-sm" style="background: #10B981; color: #FFFFFF; font-weight: 800; border-radius: 10px; padding: 10px 18px; box-shadow: 0 4px 14px rgba(16,185,129,0.3); border: none;">
                    <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.award('icon-inline', 15)} <span>${txt('الاختبار والشهادة المعتمدة', 'Exam & Certificate', 'Examen & Certificat')}</span></span>
                  </button>

                  <a href="#/course/shat-chs-master" class="btn-bubble-action btn-primary" style="background: #0F2E4A; color: #FFFFFF; box-shadow: 0 4px 16px rgba(15,46,74,0.35);">
                    <span>${t.btnResume}</span>
                    <span class="btn-icon-bubble">${arrowIcon}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- 4-Column Asymmetrical Metrics Grid -->
          <div class="grid-4" style="margin-bottom: 36px;">
            
            <!-- Card 1: Active Tracks (Navy) -->
            <div class="portal-kpi-card-v2 kpi-navy">
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: #1E40AF; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiActiveCourses}</span>
                <div style="font-size: 2.2rem; font-weight: 900; color: #0F2E4A; margin: 4px 0;">${t.kpiActiveCount}</div>
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">
                  <span class="badge" style="background: #EFF6FF; color: #1E40AF; font-size: 0.7rem; font-weight: 700;">CHS Master</span>
                  <span class="badge" style="background: #EFF6FF; color: #1E40AF; font-size: 0.7rem; font-weight: 700;">SPHERE Core</span>
                  <span class="badge" style="background: #EFF6FF; color: #1E40AF; font-size: 0.7rem; font-weight: 700;">PSEA</span>
                </div>
              </div>
              <div style="font-size: 0.78rem; color: #64748B; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
                ${txt('مسارات معتمدة دولياً ومسجلة', 'International Accredited Tracks', 'Cursus Homologués')}
              </div>
            </div>

            <!-- Card 2: Tasks (Amber) -->
            <div class="portal-kpi-card-v2 kpi-amber">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.78rem; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiTasks}</span>
                  <span class="portal-pulse-dot-amber"></span>
                </div>
                <div style="font-size: 2.2rem; font-weight: 900; color: #D97706; margin: 4px 0;">${t.kpiTasksCount}</div>
                <p style="font-size: 0.84rem; color: #92400E; margin: 0; font-weight: 600;">
                  ${t.kpiTasksDesc}
                </p>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem; color: #B45309; font-weight: 800; margin-top: 14px; background: #FEF3C7; padding: 4px 8px; border-radius: 6px;">
                <span>⏳ ${txt('متبقي 4 أيام على التكليف القادم', '4 days left on next task', '4 jours restants')}</span>
              </div>
            </div>

            <!-- Card 3: Grade (Emerald) -->
            <div class="portal-kpi-card-v2 kpi-emerald">
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiGrade}</span>
                <div style="font-size: 2.2rem; font-weight: 900; color: #059669; margin: 4px 0; font-family: var(--font-mono);">94 / 100</div>
                <p style="font-size: 0.84rem; color: #166534; margin: 0; font-weight: 700;">
                  ★ ${t.kpiGradeDesc}
                </p>
              </div>
              <div style="font-size: 0.76rem; color: #047857; font-weight: 700; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
                ${txt('ضمن أعلى 5% من المتدربين في الدفعة', 'Top 5% in Current Cohort', 'Top 5% de la Promotion')}
              </div>
            </div>

            <!-- Card 4: Hours & Accredited CPD (Purple) -->
            <div class="portal-kpi-card-v2 kpi-purple">
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: #6D28D9; text-transform: uppercase; letter-spacing: 0.5px;">${txt('الساعات المعتمدة', 'Accredited Hours', 'Heures Validées')}</span>
                <div style="font-size: 2.2rem; font-weight: 900; color: #7C3AED; margin: 4px 0; font-family: var(--font-mono);">40 / 40h</div>
                <p style="font-size: 0.84rem; color: #5B21B6; margin: 0; font-weight: 600;">
                  ${txt('معتمدة رسمياً وموثقة رقمياً', 'Officially Certified & Logged', 'Homologation Officielle')}
                </p>
              </div>
              <div style="font-size: 0.76rem; color: #6D28D9; font-weight: 700; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
                CPD Certified • UK / Geneva Standards
              </div>
            </div>

          </div>

          <!-- Section: Assignments & Field Tasks (Elevated Agency Cards) -->
          <div class="bento-card" style="margin-bottom: 36px; padding: 28px; border-radius: 18px; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(11,30,54,0.05);">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <span class="bento-kicker">${t.assignmentsSectionKicker}</span>
                <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">
                  ${t.assignmentsSectionTitle}
                </h3>
              </div>
              <span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 800; font-size: 0.82rem; padding: 6px 14px; border-radius: 999px; border: 1px solid #FCD34D;">
                ${t.assignmentsSectionBadge}
              </span>
            </div>

            <div class="assignments-list-wrapper" style="display: flex; flex-direction: column; gap: 18px;">
              
              <!-- Assignment Card 1: Graded -->
              <div class="assignment-item-card" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 14px; border: 1px solid #E2E8F0; padding: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                    <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 800; font-size: 0.78rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #86EFAC;">
                      ✓ ${t.task1Badge}
                    </span>
                    <span style="font-size: 0.82rem; color: #64748B; font-weight: 600;">${t.task1Due}</span>
                  </div>
                  <h4 style="font-size: 1.1rem; font-weight: 800; color: #0F2E4A; margin: 0 0 8px 0;">
                    ${t.task1Title}
                  </h4>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.6; background: #FFFFFF; padding: 12px 16px; border-radius: 10px; border: 1px solid #E2E8F0; margin-top: 10px; border-inline-start: 4px solid #10B981;">
                    <strong style="color: #0F2E4A;">${txt('التغذية الراجعة من المدرب د. أسامة:', 'Trainer Feedback (Dr. Osama):', 'Rétroaction du Formateur :')}</strong>
                    <p style="margin: 4px 0 0 0; font-style: italic; color: #475569;">"${t.task1Feedback}"</p>
                  </div>
                </div>

                <div style="text-align: end; min-width: 150px; background: #F0FDF4; padding: 16px 20px; border-radius: 14px; border: 1px solid #BBF7D0;">
                  <div style="font-size: 0.78rem; color: #166534; font-weight: 800; text-transform: uppercase; margin-bottom: 2px;">${t.task1ScoreLabel}</div>
                  <div style="font-size: 2rem; font-weight: 900; color: #059669; font-family: var(--font-mono); margin-bottom: 10px;">
                    94 / 100
                  </div>
                  <a href="/api/files/download/sub-01-file" class="btn-clean btn-secondary btn-sm" download="submission_review.pdf" style="font-weight: 800; border-radius: 8px;">
                    <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.download('icon-inline', 14)} <span>${t.task1Btn}</span></span>
                  </a>
                </div>
              </div>

              <!-- Assignment Card 2: Due Oct 4 (Pending) -->
              <div class="assignment-item-card" style="background: #FFFFFF; border-radius: 14px; border: 2px solid #FCD34D; padding: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 18px; box-shadow: 0 4px 16px rgba(217,119,6,0.08);">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                    <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 900; font-size: 0.78rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #F59E0B;">
                      ⏳ ${t.task2Badge}
                    </span>
                    <span style="font-size: 0.82rem; color: #B45309; font-weight: 700; background: #FFFBEB; padding: 2px 8px; border-radius: 6px;">${t.task2Remaining}</span>
                  </div>
                  <h4 style="font-size: 1.1rem; font-weight: 800; color: #0F2E4A; margin: 0 0 8px 0;">
                    ${t.task2Title}
                  </h4>
                  <p style="font-size: 0.88rem; color: #475569; margin: 0; line-height: 1.6;">
                    ${t.task2Desc}
                  </p>
                </div>

                <div style="text-align: end; min-width: 150px;">
                  <button class="btn-clean btn-primary btn-md btn-open-submit-modal" data-assign="assign-02" data-title="${t.task2Title}" style="font-weight: 800; border-radius: 10px; padding: 12px 20px; box-shadow: 0 4px 14px rgba(15,46,74,0.3); background: #0F2E4A;">
                    <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.upload('icon-inline', 15)} <span>${t.task2Btn}</span></span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Section: Secure Academic Cloud Repository -->
          <div class="bento-card" style="border-top: 4px solid #10B981; padding: 28px; border-radius: 18px; border: 1px solid #E2E8F0;">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px;">
              <div>
                <span class="bento-kicker">${txt('المستودع السحابي للمساق', 'Course Cloud Repository', 'Espace Ressources Cloud')}</span>
                <h3 style="font-size: 1.3rem; font-weight: 900; color: #0F2E4A; margin: 4px 0;">
                  ${t.driveTitle}
                </h3>
              </div>
              <span style="font-size: 0.84rem; color: #64748B; font-weight: 600; background: #F1F5F9; padding: 4px 10px; border-radius: 6px;">${t.driveSubtitle}</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
              <!-- Doc 1 -->
              <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s ease;">
                <div>
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <span style="background: #FEE2E2; color: #B91C1C; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">PDF</span>
                    <span style="font-weight: 800; font-size: 0.94rem; color: #0F2E4A;">CHS_Core_Handbook.pdf</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748B;">4.8 MB • ${txt('وثيقة معتمدة دولياً', 'Accredited Document', 'Document Homologué')}</div>
                </div>
                <a href="/api/files/download/file-chs-01" class="btn-clean btn-green btn-sm" download="CHS_Handbook.pdf" style="font-weight: 800; border-radius: 8px;">
                  <span style="display: inline-flex; align-items: center; gap: 4px;">${icons.download('icon-inline', 14)} <span>${t.downloadBtn}</span></span>
                </a>
              </div>

              <!-- Doc 2 -->
              <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s ease;">
                <div>
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <span style="background: #FFEDD5; color: #C2410C; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">PPTX</span>
                    <span style="font-weight: 800; font-size: 0.94rem; color: #0F2E4A;">AAP_Accountability_Toolkit.pptx</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748B;">12.3 MB • ${txt('عرض تقديمي للمحاضرات', 'Lecture Slides', 'Présentation Didactique')}</div>
                </div>
                <a href="/api/files/download/file-chs-02" class="btn-clean btn-green btn-sm" download="AAP_Toolkit.pptx" style="font-weight: 800; border-radius: 8px;">
                  <span style="display: inline-flex; align-items: center; gap: 4px;">${icons.download('icon-inline', 14)} <span>${t.downloadBtn}</span></span>
                </a>
              </div>

              <!-- Doc 3 -->
              <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s ease;">
                <div>
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <span style="background: #DCFCE7; color: #15803D; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">XLSX</span>
                    <span style="font-weight: 800; font-size: 0.94rem; color: #0F2E4A;">CHS_Compliance_Matrix.xlsx</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748B;">1.2 MB • ${txt('جداول إلكترونية للتدقيق', 'Audit Spreadsheet', 'Tableur d’Audit')}</div>
                </div>
                <a href="/api/files/download/file-chs-03" class="btn-clean btn-green btn-sm" download="CHS_Matrix.xlsx" style="font-weight: 800; border-radius: 8px;">
                  <span style="display: inline-flex; align-items: center; gap: 4px;">${icons.download('icon-inline', 14)} <span>${t.downloadBtn}</span></span>
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
            <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.upload('icon-inline', 16)} <span>${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span></span>
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
              btnConfirm.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${icons.upload('icon-inline', 16)} <span>${txt('تأكيد ورفع التسليم للمدرب الأكاديمي', 'Confirm & Upload Submission', 'Confirmer et Déposer le Devoir')}</span></span>`;
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

      <button type="button" class="btn-clean btn-primary btn-md allow-print" id="btn-trigger-print-pass" style="background: var(--shat-navy); font-weight: 800; box-shadow: 0 4px 14px rgba(15,46,74,0.3); display: inline-flex; align-items: center; gap: 6px;">
        ${icons.printer('icon-inline', 16)} <span>${txt('طباعة البطاقة / حفظ كـ PDF', 'Print / Save Pass (PDF)', 'Imprimer le Pass (PDF)')}</span>
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
