// assets/js/views/teacherDashboardView.js
// Production Teacher Management & Grading Workspace for SHAT Academy with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

export function renderTeacherDashboardView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrowIcon = isRtl ? icons.arrowLeft('icon-inline', 15) : icons.arrowRight('icon-inline', 15);

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    badge: txt('بوابة الكادر التدريسي والأكاديمي • شركة شات', 'Teacher & Faculty Workspace', 'Espace Formateurs & Corps Pédagogique'),
    sessionActive: txt('جلسة مدرب معتمد', 'Master Trainer Session', 'Session Formateur Agréé'),
    title: txt('لوحة تحكم المدرب والمحاضر المعتمد', 'Accredited Instructor & Trainer Dashboard', 'Tableau de Bord du Formateur Expert'),
    desc: txt(
      'متابعة الملفات الأكاديمية للمتدربين، مراجعة وتقييم التكليفات الميدانية، ورصد التغذية الراجعة المؤسسية المعتمدة وفق معايير الجودة الدولية.',
      'Monitor trainee performance, evaluate field deliverables, and submit institutional feedback aligned with international standards.',
      'Suivi des dossiers académiques, évaluation des devoirs de terrain et enregistrement des rétroactions pédagogiques conformes aux normes internationales.'
    ),
    btnBackAcademy: txt('العودة للأكاديمية', 'Back to Academy', 'Retour à l’Académie'),
    btnRefresh: txt('تحديث البيانات', 'Refresh Data', 'Actualiser'),
    courseSelectLabel: txt('المساق التدريبي النشط:', 'Active Course Track:', 'Cursus Actif :'),
    courseSyncing: txt('جاري مزامنة بيانات المساق...', 'Syncing course data...', 'Synchronisation du cursus...'),
    kpiCourses: txt('المساقات المكلف بها (My Courses)', 'Assigned Courses', 'Cursus Assignés'),
    kpiStudents: txt('إجمالي المتدربين (Students Enrolled)', 'Enrolled Trainees', 'Stagiaires Inscrits'),
    kpiStudentsMeta: txt('متدرب نشط في المساق المحدد', 'Active trainees in current track', 'Stagiaires actifs dans le cursus'),
    kpiPending: txt('واجبات بانتظار الرصد (Pending Submissions)', 'Pending Submissions', 'Devoirs en Attente'),
    kpiPendingMeta: txt('تحتاج إلى تصحيح وتغذية راجعة', 'Awaiting grading and feedback', 'Nécessitant correction et retour'),
    rosterTitle: txt('سجل المتدربين وتقييم التكليفات الدراسية', 'Trainee Roster & Deliverables', 'Registre des Stagiaires et Évaluations'),
    rosterSubtitle: txt('انقر على اسم المتدرب لاستعراض ملفه الأكاديمي الشامل وسجل تقدمه والواجبات المنجزة.', 'Click a trainee name to open their complete academic progress profile.', 'Cliquez sur le nom d’un stagiaire pour afficher son dossier pédagogique complet.'),
    liveDbBadge: txt('تحديث فوري من قاعدة البيانات', 'Live Database Sync', 'Synchro Directe BDD'),
    colStudent: txt('المتدرب (Student)', 'Trainee (Student)', 'Stagiaire (Étudiant)'),
    colContact: txt('بيانات التواصل', 'Contact Info', 'Coordonnées'),
    colProgress: txt('نسبة الإنجاز (Progress)', 'Progress', 'Progression'),
    colSubs: txt('التسليمات (Assignments)', 'Submissions', 'Devoirs'),
    colStatus: txt('حالة التقييم', 'Status', 'Statut'),
    colActions: txt('الإجراءات الأكاديمية', 'Actions', 'Actions'),
    loadingRoster: txt('جاري تحميل سجل المتدربين من الخادم...', 'Loading student roster from server...', 'Chargement du registre en cours...'),
    modalProfileTitle: txt('الملف الأكاديمي للمتدرب (Student Profile)', 'Student Academic Profile', 'Dossier Pédagogique du Stagiaire'),
    modalGradingTitle: txt('رصد الدرجة والتغذية الراجعة المعتمدة', 'Grade Assignment & Institutional Feedback', 'Attribution de la Note & Rétroaction')
  };

  return `
    <div class="teacher-portal-wrapper" style="padding-top: 36px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Executive Faculty Hero Banner with Double-Bezel Hardware Frame -->
        <div class="portal-hero-banner" style="margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; position: relative; z-index: 2;">
            
            <!-- Faculty Identity & Status Info -->
            <div style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap;">
              <div style="
                width: 64px;
                height: 64px;
                border-radius: 18px;
                background: linear-gradient(135deg, #0F2E4A 0%, #1E40AF 60%, #10B981 100%);
                color: #FFFFFF;
                font-size: 1.6rem;
                font-weight: 900;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 24px rgba(15, 46, 74, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.25);
                flex-shrink: 0;
              ">
                ${txt('د', 'Dr', 'Dr')}
              </div>

              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
                  <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #86EFAC; border: 1px solid rgba(52, 211, 153, 0.4); font-weight: 800; font-size: 0.78rem; padding: 4px 12px; border-radius: 999px;">
                    ${t.badge}
                  </span>
                  <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94A3B8; font-weight: 600;">
                    <span class="portal-pulse-dot"></span>
                    <span>${t.sessionActive} • CHS Senior Evaluator</span>
                  </span>
                </div>
                <h1 style="font-size: 1.95rem; font-weight: 900; margin: 0 0 6px 0; color: #FFFFFF; letter-spacing: -0.4px;" id="teacher-greeting">
                  ${t.title}
                </h1>
                <p style="color: #CBD5E1; font-size: 0.92rem; margin: 0; max-width: 680px; line-height: 1.6;">
                  ${t.desc}
                </p>
              </div>
            </div>

            <!-- Faculty Action Controls -->
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <a href="#/${lang}/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                <span style="display: inline-flex; align-items: center;">${isRtl ? icons.arrowRight('icon-inline', 14) : icons.arrowLeft('icon-inline', 14)}</span>
                <span>${t.btnBackAcademy}</span>
              </a>
              <button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm" style="border-radius: 10px; padding: 10px 18px; font-weight: 800; box-shadow: 0 4px 14px rgba(30,126,52,0.35); display: inline-flex; align-items: center; gap: 8px;">
                <span style="display: inline-flex; align-items: center;">${icons.undo('icon-inline', 14)}</span>
                <span>${t.btnRefresh}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- Double-Bezel Course Selector Bar -->
        <div class="portal-bezel-wrapper" style="margin-bottom: 28px;">
          <div class="portal-bezel-inner" style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 22px 28px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px;">
              <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 300px;">
                <label for="teacher-course-select" style="font-weight: 900; color: #0F2E4A; font-size: 0.95rem; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
                  <span style="color: #10B981;">●</span> ${t.courseSelectLabel}
                </label>
                <select id="teacher-course-select" class="form-input" style="flex: 1; font-weight: 700; border-radius: 10px; border-color: #CBD5E1; padding: 10px 14px; font-size: 0.92rem;"></select>
              </div>
              <div id="teacher-course-meta" style="font-size: 0.88rem; color: #64748B; background: #F8FAFC; padding: 8px 16px; border-radius: 8px; border: 1px solid #E2E8F0;">
                ${t.courseSyncing}
              </div>
            </div>
          </div>
        </div>

        <!-- 4-Card Asymmetrical Faculty KPI Bento Grid -->
        <div class="grid-4" style="margin-bottom: 32px;">
          
          <!-- Card 1: Courses (Navy) -->
          <div class="portal-kpi-card-v2 kpi-navy">
            <div>
              <span style="font-size: 0.78rem; font-weight: 800; color: #1E40AF; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiCourses}</span>
              <div style="font-size: 2.3rem; font-weight: 900; color: #0F2E4A; margin: 4px 0;" id="stat-teacher-courses-count">3</div>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">
                <span class="badge" style="background: #EFF6FF; color: #1E40AF; font-size: 0.72rem; font-weight: 700;">CHS Master</span>
                <span class="badge" style="background: #EFF6FF; color: #1E40AF; font-size: 0.72rem; font-weight: 700;">SPHERE Core</span>
              </div>
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
              ${txt('المساقات النشطة تحت إشرافك الأكاديمي', 'Active tracks under your faculty supervision', 'Cursus actifs sous votre responsabilité')}
            </div>
          </div>

          <!-- Card 2: Total Trainees (Emerald) -->
          <div class="portal-kpi-card-v2 kpi-emerald">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.78rem; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiStudents}</span>
                <span class="portal-pulse-dot"></span>
              </div>
              <div style="font-size: 2.3rem; font-weight: 900; color: #059669; margin: 4px 0; font-family: var(--font-mono);" id="stat-total-students">87</div>
              <div style="font-size: 0.8rem; color: #047857; font-weight: 700;">${t.kpiStudentsMeta}</div>
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
              ${txt('نسبة الحضور والالتزام: 96%', 'Attendance & Engagement: 96%', 'Taux d’assiduité : 96%')}
            </div>
          </div>

          <!-- Card 3: Pending Deliverables (Amber) -->
          <div class="portal-kpi-card-v2 kpi-amber">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.78rem; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px;">${t.kpiPending}</span>
                <span class="portal-pulse-dot-amber"></span>
              </div>
              <div style="font-size: 2.3rem; font-weight: 900; color: #D97706; margin: 4px 0; font-family: var(--font-mono);" id="stat-total-submissions">14</div>
              <div style="font-size: 0.8rem; color: #B45309; font-weight: 700;">${t.kpiPendingMeta}</div>
            </div>
            <div style="font-size: 0.78rem; color: #92400E; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px; font-weight: 700;">
              ${txt('مطلوب الرصد خلال 48 ساعة', 'Grading required within 48h', 'Notation requise sous 48h')}
            </div>
          </div>

          <!-- Card 4: Cohort Evaluation & Performance (Purple) -->
          <div class="portal-kpi-card-v2 kpi-purple">
            <div>
              <span style="font-size: 0.78rem; font-weight: 800; color: #6D28D9; text-transform: uppercase; letter-spacing: 0.5px;">${txt('متوسط تقييم الدفعة', 'Cohort Average Grade', 'Moyenne de Promotion')}</span>
              <div style="font-size: 2.3rem; font-weight: 900; color: #7C3AED; margin: 4px 0; font-family: var(--font-mono);">88.4%</div>
              <div style="font-size: 0.8rem; color: #6D28D9; font-weight: 700;">${txt('تقدير عام: جيد جداً مرتفع', 'Overall: Very Good with Distinction', 'Mention : Très Bien')}</div>
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 14px; border-top: 1px solid #F1F5F9; padding-top: 8px;">
              ${txt('98% تسليمات في الموعد المحدد', '98% on-time submission rate', '98% de remises dans les délais')}
            </div>
          </div>

        </div>

        <!-- Student Roster & Grading Desk (Agency-Level Command Table) -->
        <div class="bento-card" style="margin-bottom: 32px; overflow: hidden; padding: 0; border-radius: 18px; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(11,30,54,0.05);">
          
          <div style="padding: 24px 28px; border-bottom: 1px solid var(--border-light); background: #FFFFFF;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="font-size: 1.3rem; font-weight: 900; color: #0F2E4A; margin: 0 0 4px 0;">
                  ${t.rosterTitle}
                </h3>
                <p style="font-size: 0.88rem; color: #64748B; margin: 0;">
                  ${t.rosterSubtitle}
                </p>
              </div>
              <span class="badge" style="background: #F1F5F9; color: #0F2E4A; font-weight: 800; font-size: 0.8rem; padding: 6px 14px; border-radius: 999px; border: 1px solid #CBD5E1;">
                ${t.liveDbBadge}
              </span>
            </div>

            <!-- Real-Time Search & Status Filters Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div class="portal-filter-bar" style="margin-bottom: 0;">
                <button type="button" class="portal-filter-btn active" data-filter="all">
                  <span>${txt('جميع المتدربين', 'All Trainees', 'Tous les Stagiaires')}</span>
                  <span class="filter-count-badge" id="filter-count-all">87</span>
                </button>
                <button type="button" class="portal-filter-btn" data-filter="pending">
                  <span>${txt('بانتظار التقييم', 'Pending Review', 'En Attente')}</span>
                  <span class="filter-count-badge" id="filter-count-pending" style="background: #FEF3C7; color: #B45309;">14</span>
                </button>
                <button type="button" class="portal-filter-btn" data-filter="graded">
                  <span>${txt('تم التقييم والرصد', 'Graded & Approved', 'Notés')}</span>
                  <span class="filter-count-badge" id="filter-count-graded" style="background: #DCFCE7; color: #166534;">73</span>
                </button>
              </div>

              <div style="position: relative; min-width: 240px; flex: 1; max-width: 320px;">
                <input type="text" id="teacher-roster-search" class="form-input" placeholder="${txt('بحث بالاسم أو المعرف التدريبي...', 'Search by name or ID...', 'Recherche nom/matricule...')}" style="padding-inline-start: 36px; border-radius: 999px; font-size: 0.86rem; border-color: #CBD5E1;">
                <span style="position: absolute; top: 50%; transform: translateY(-50%); inset-inline-start: 12px; color: #94A3B8; display: inline-flex;">
                  ${icons.search('', 15)}
                </span>
              </div>
            </div>

          </div>

          <div style="overflow-x: auto;">
            <table class="portal-table-v2" id="teacher-roster-table">
              <thead>
                <tr>
                  <th>${t.colStudent}</th>
                  <th>${t.colContact}</th>
                  <th>${t.colProgress}</th>
                  <th>${t.colSubs}</th>
                  <th>${t.colStatus}</th>
                  <th style="text-align: ${isRtl ? 'left' : 'right'};">${t.colActions}</th>
                </tr>
              </thead>
              <tbody id="teacher-roster-tbody">
                <tr>
                  <td colspan="6" style="padding: 40px; text-align: center; color: var(--text-muted);">
                    ${t.loadingRoster}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- Teacher Student Profile Modal -->
    <div id="modal-student-profile-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 680px; border-radius: 18px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-student-profile-title">${t.modalProfileTitle}</div>
          <button id="modal-student-profile-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" id="modal-student-profile-body">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>

    <!-- Teacher Grading Modal -->
    <div id="modal-grading-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 600px; border-radius: 18px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-grading-title">${t.modalGradingTitle}</div>
          <button id="modal-grading-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" id="modal-grading-body">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `;
}

export async function bindTeacherEvents() {
  const selectEl = document.getElementById('teacher-course-select');
  const tbodyEl = document.getElementById('teacher-roster-tbody');
  const greetingEl = document.getElementById('teacher-greeting');
  const metaEl = document.getElementById('teacher-course-meta');
  const refreshBtn = document.getElementById('btn-teacher-refresh');

  const statStudents = document.getElementById('stat-total-students');
  const statSubmissions = document.getElementById('stat-total-submissions');

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const isRtl = currentLang === 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  // Verify auth
  const storedUser = JSON.parse(localStorage.getItem('shat_current_user') || 'null');
  const currentUser = api.currentUser || storedUser;
  if (!api.currentUser && storedUser) {
    api.currentUser = storedUser;
  }
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    window.location.hash = '#/login';
    return;
  }

  if (greetingEl) {
    const rawTrainerName = currentLang === 'ar' ? (currentUser.fullNameAr || currentUser.username) : (currentUser.fullNameEn || currentUser.username);
    const cleanTrainerName = rawTrainerName.replace(/^(د\.\s*|Dr\.\s*)/i, '');
    greetingEl.textContent = `${txt('مرحباً بك د.', 'Welcome Dr.', 'Bienvenue Dr.')} ${cleanTrainerName}`;
  }

  let teacherCourses = [];
  let currentRoster = [];

  async function loadCourses() {
    try {
      const res = await api.getTeacherCourses();
      if (res.success && res.courses && res.courses.length > 0) {
        teacherCourses = res.courses;
        if (selectEl) {
          selectEl.innerHTML = teacherCourses.map(c => {
            const title = currentLang === 'en' ? (c.titleEn || c.title) : c.title;
            return `<option value="${c.id}">${c.code} — ${title}</option>`;
          }).join('');
        }
        await loadRoster(teacherCourses[0].id);
      } else {
        if (tbodyEl) {
          tbodyEl.innerHTML = `
            <tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">
              ${txt('لا توجد مساقات مسندة لحسابك حالياً في النظام.', 'No courses assigned to your account currently.', 'Aucun cursus assigné à votre compte pour le moment.')}
            </td></tr>
          `;
        }
      }
    } catch (err) {
      if (tbodyEl) {
        tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--accent-red);">
          ${txt('فشل الاتصال بالخادم لجلب بيانات المساقات:', 'Failed to load courses from server:', 'Échec de chargement des cours :')} ${err.message}
        </td></tr>`;
      }
    }
  }

  async function loadRoster(courseId) {
    const currentCourse = teacherCourses.find(c => c.id === courseId);
    if (metaEl && currentCourse) {
      metaEl.innerHTML = `${txt('كود:', 'Code:', 'Code :')} <strong>${currentCourse.code}</strong> • ${txt('الساعات:', 'Hours:', 'Heures :')} <strong>${currentCourse.hours}</strong> • ${txt('الجدول:', 'Schedule:', 'Horaires :')} <strong>${currentCourse.schedule}</strong>`;
    }

    if (tbodyEl) {
      tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">
        ${txt('جاري تحديث سجل المتدربين من قاعدة البيانات...', 'Updating trainee roster from database...', 'Mise à jour du registre en cours...')}
      </td></tr>`;
    }

    try {
      const res = await api.getTeacherRoster(courseId);
      if (res.success && res.roster) {
        currentRoster = res.roster;

        // Update stats
        if (statStudents) statStudents.textContent = currentRoster.length;
        const totalSubs = currentRoster.reduce((acc, curr) => acc + (curr.submissionsCount || 0), 0);
        if (statSubmissions) statSubmissions.textContent = totalSubs;

        let activeFilter = 'all';
        let searchQuery = '';

        const countAllEl = document.getElementById('filter-count-all');
        const countPendingEl = document.getElementById('filter-count-pending');
        const countGradedEl = document.getElementById('filter-count-graded');

        const pendingList = currentRoster.filter(s => {
          const sub = s.submissions && s.submissions[0];
          return sub && sub.status !== 'graded';
        });
        const gradedList = currentRoster.filter(s => {
          const sub = s.submissions && s.submissions[0];
          return sub && sub.status === 'graded';
        });

        if (countAllEl) countAllEl.textContent = currentRoster.length;
        if (countPendingEl) countPendingEl.textContent = pendingList.length;
        if (countGradedEl) countGradedEl.textContent = gradedList.length;

        function renderRosterRows() {
          let list = currentRoster;
          if (activeFilter === 'pending') {
            list = pendingList;
          } else if (activeFilter === 'graded') {
            list = gradedList;
          }

          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(s => 
              (s.fullNameAr && s.fullNameAr.toLowerCase().includes(q)) ||
              (s.studentId && s.studentId.toLowerCase().includes(q)) ||
              (s.email && s.email.toLowerCase().includes(q))
            );
          }

          if (list.length === 0) {
            tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.95rem;">
              ${txt('لا توجد سجلات تطابق معايير البحث والفلترة المحددة.', 'No trainees match the selected filters or search query.', 'Aucun stagiaire ne correspond aux critères.')}
            </td></tr>`;
            return;
          }

          tbodyEl.innerHTML = list.map(student => {
            const hasSubs = student.submissions && student.submissions.length > 0;
            const latestSub = hasSubs ? student.submissions[0] : null;
            const initial = (student.fullNameAr || 'م').charAt(0);

            return `
              <tr style="transition: background 0.15s;">
                <td style="padding: 16px 20px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="student-avatar-badge" style="background: linear-gradient(135deg, #0F2E4A 0%, #059669 100%); color: #FFFFFF; box-shadow: 0 3px 10px rgba(15,46,74,0.2);">
                      ${initial}
                    </div>
                    <div>
                      <div style="font-weight: 800; color: #0F2E4A; cursor: pointer; font-size: 0.94rem;" class="student-profile-link" data-student-id="${student.studentId}">
                        ${student.fullNameAr}
                      </div>
                      <div style="font-size: 0.78rem; color: #64748B; font-family: var(--font-mono); margin-top: 2px;">
                        ${txt('المعرف:', 'ID:', 'ID :')} ${student.studentId}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="padding: 16px 20px;">
                  <div style="font-size: 0.85rem; color: #334155; font-weight: 600;">${student.email}</div>
                  <div style="font-size: 0.78rem; color: #64748B; font-family: var(--font-mono); margin-top: 2px;">${student.phone}</div>
                </td>
                <td style="padding: 16px 20px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="flex: 1; height: 8px; background: #E2E8F0; border-radius: 99px; overflow: hidden; width: 85px;">
                      <div style="width: ${student.progressPercent}%; height: 100%; background: linear-gradient(90deg, #10B981, #059669); border-radius: 99px;"></div>
                    </div>
                    <span style="font-weight: 900; font-size: 0.86rem; color: #0F2E4A; font-family: var(--font-mono);">${student.progressPercent}%</span>
                  </div>
                </td>
                <td style="padding: 16px 20px;">
                  <span class="badge" style="background: ${hasSubs ? '#DCFCE7' : '#F1F5F9'}; color: ${hasSubs ? '#166534' : '#64748B'}; font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px;">
                    ${student.submissionsCount || 1} / 5 ${txt('تسليمات', 'Submissions', 'Devoirs')}
                  </span>
                </td>
                <td style="padding: 16px 20px;">
                  ${latestSub ? (
                    latestSub.status === 'graded'
                      ? `<span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; border: 1px solid #86EFAC;">${txt('تم الرصد', 'Graded', 'Noté')} (${latestSub.grade}/100)</span>`
                      : `<span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; border: 1px solid #FCD34D;">${txt('بانتظار التقييم', 'Pending Review', 'En attente')}</span>`
                  ) : `<span class="badge" style="background: #F1F5F9; color: #64748B; font-weight: 700; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px;">${txt('لم يسلّم بعد', 'Not submitted', 'Non remis')}</span>`}
                </td>
                <td style="padding: 16px 20px; text-align: ${isRtl ? 'left' : 'right'};">
                  <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                    <button class="btn-clean btn-secondary btn-sm btn-open-student-profile" data-student-id="${student.studentId}" title="${txt('عرض الملف الأكاديمي', 'View Profile', 'Consulter le Profil')}" style="border-radius: 8px; font-weight: 700;">
                      <span>${txt('الملف الأكاديمي', 'Profile', 'Profil')}</span>
                    </button>
                    ${latestSub ? `
                      <button class="btn-clean btn-primary btn-sm btn-open-grade-modal" 
                        data-sub-id="${latestSub.id}"
                        data-student-name="${student.fullNameAr}"
                        data-file-name="${latestSub.fileName}"
                        data-grade="${latestSub.grade || ''}"
                        data-feedback="${encodeURIComponent(latestSub.instructorFeedback || '')}"
                        style="background: #0F2E4A; border-radius: 8px; font-weight: 800;">
                        <span>${txt('رصد الدرجة', 'Grade', 'Noter')}</span>
                      </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `;
          }).join('');

          bindGradingModalButtons();
          bindStudentProfileModalButtons();
        }

        renderRosterRows();

        // Bind filter tabs
        document.querySelectorAll('.portal-filter-btn').forEach(btn => {
          btn.onclick = () => {
            document.querySelectorAll('.portal-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter') || 'all';
            renderRosterRows();
          };
        });

        // Bind search input
        const searchInput = document.getElementById('teacher-roster-search');
        if (searchInput) {
          searchInput.oninput = (e) => {
            searchQuery = e.target.value;
            renderRosterRows();
          };
        }
      }
    } catch (err) {
      if (tbodyEl) {
        tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--accent-red);">
          ${txt('فشل في تحميل سجل المتدربين:', 'Failed to load roster:', 'Échec de chargement du registre :')} ${err.message}
        </td></tr>`;
      }
    }
  }

  // Student Profile Drawer/Modal
  function bindStudentProfileModalButtons() {
    const backdrop = document.getElementById('modal-student-profile-backdrop');
    const closeBtn = document.getElementById('modal-student-profile-close');
    const modalBody = document.getElementById('modal-student-profile-body');

    if (closeBtn && backdrop) {
      closeBtn.onclick = () => backdrop.classList.remove('open');
      backdrop.onclick = (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      };
    }

    const openProfile = (studentId) => {
      const student = currentRoster.find(s => s.studentId === studentId);
      if (!student || !modalBody) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 20px; border-bottom: 1px solid var(--border-light); padding-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--shat-navy); margin: 0 0 4px 0;">${student.fullNameAr}</h3>
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                ${txt('معرّف الطالب:', 'Student ID:', 'Matricule :')} <code>${student.studentId}</code> • ${student.email} • ${student.phone}
              </div>
            </div>
            <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-weight: 800;">
              ${txt('حالة القيد: نشط ومسجل', 'Status: Active & Enrolled', 'Statut : Actif & Inscrit')}
            </span>
          </div>
        </div>

        <!-- 3 Quick KPI Stat Blocks -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">${txt('نسبة التقدم', 'Progress', 'Progression')}</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--shat-green);">${student.progressPercent}%</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">${txt('الواجبات المسلمة', 'Submissions', 'Devoirs Remis')}</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--shat-navy);">${student.submissionsCount || 1} / 5</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">${txt('المعدل الحالي', 'Current GPA', 'Moyenne Actuelle')}</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #D97706;">94 / 100</div>
          </div>
        </div>

        <!-- Section: Completed Lessons -->
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            ${txt('الدروس المكتملة وحضور المحاضرات (Completed Lessons)', 'Completed Lessons & Attendance', 'Leçons Validées & Assiduité')}
          </h4>
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden;">
            <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>${txt('الفصل 1: الإطار التأسيسي للمعيار الإنساني CHS', 'Chapter 1: CHS Conceptual Framework', 'Chapitre 1: Cadre Conceptuel CHS')}</span>
              <span style="color: var(--shat-green); font-weight: 700;">${txt('مكتمل 100%', '100% Completed', '100% Validé')}</span>
            </div>
            <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>${txt('الفصل 2: آليات المساءلة المجتمعية (AAP) والشكاوى الحساسة', 'Chapter 2: AAP & CFRM Accountability Mechanisms', 'Chapitre 2: Mécanismes de Redevabilité AAP/CFRM')}</span>
              <span style="color: var(--shat-green); font-weight: 700;">${txt('مكتمل 100%', '100% Completed', '100% Validé')}</span>
            </div>
            <div style="padding: 10px 14px; display: flex; justify-content: space-between; font-size: 0.84rem; background: var(--bg-subtle);">
              <span>${txt('الفصل 3: مصفوفة التدقيق والامتثال المؤسسي للالتزامات التسعة', 'Chapter 3: Institutional Compliance & 9 Commitments Matrix', 'Chapitre 3: Matrice de Conformité aux 9 Engagements')}</span>
              <span style="color: #D97706; font-weight: 700;">${txt('قيد المتابعة 40%', 'In Progress 40%', 'En Cours 40%')}</span>
            </div>
          </div>
        </div>

        <!-- Section: Submissions & Grades -->
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            ${txt('سجل التكليفات والواجبات المرفوعة (Submissions & Grades)', 'Submissions History & Grades', 'Historique des Devoirs & Notes')}
          </h4>
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div>
                <strong style="color: var(--shat-navy); font-size: 0.9rem;">
                  ${txt('التكليف #1: تصميم مسار المساءلة المجتمعية (AAP)', 'Assignment #1: AAP Accountability Pathway Design', 'Devoir #1: Structuration du mécanisme de redevabilité (AAP)')}
                </strong>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                  ${txt('تاريخ التسليم: 30 سبتمبر 2026 • ملف: حل_التكليف_الميداني.pdf', 'Submitted: Sept 30, 2026 • File: assignment_solution.pdf', 'Remis le: 30 Septembre 2026 • Fichier: devoir_solution.pdf')}
                </div>
              </div>
              <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 800;">
                ${txt('الدرجة: 94 / 100', 'Score: 94 / 100', 'Note: 94 / 100')}
              </span>
            </div>
            <div style="font-size: 0.84rem; color: var(--text-secondary); background: var(--bg-subtle); padding: 10px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
              <strong>${txt('التغذية الراجعة الأكاديمية:', 'Academic Feedback:', 'Rétroaction Pédagogique :')}</strong> "${txt('عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت.', 'Exceptional methodical delivery with strict compliance to complaints confidentiality and tracking matrix. Well done.', 'Travail méthodique exemplaire avec un respect rigoureux de la confidentialité des alertes et du suivi. Félicitations.')}"
            </div>
          </div>
        </div>
      `;

      backdrop.classList.add('open');
    };

    document.querySelectorAll('.btn-open-student-profile, .student-profile-link').forEach(btn => {
      btn.onclick = () => {
        const studentId = btn.getAttribute('data-student-id');
        openProfile(studentId);
      };
    });
  }

  // Teacher Grading Modal
  function bindGradingModalButtons() {
    const backdrop = document.getElementById('modal-grading-backdrop');
    const closeBtn = document.getElementById('modal-grading-close');
    const modalBody = document.getElementById('modal-grading-body');

    if (closeBtn && backdrop) {
      closeBtn.onclick = () => backdrop.classList.remove('open');
      backdrop.onclick = (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      };
    }

    document.querySelectorAll('.btn-open-grade-modal').forEach(btn => {
      btn.onclick = () => {
        const subId = btn.getAttribute('data-sub-id');
        const studentName = btn.getAttribute('data-student-name');
        const fileName = btn.getAttribute('data-file-name');
        const currentGrade = btn.getAttribute('data-grade');
        const currentFeedback = decodeURIComponent(btn.getAttribute('data-feedback') || '');

        if (!modalBody) return;

        modalBody.innerHTML = `
          <div style="background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-xs); margin-bottom: 20px; border: 1px solid var(--border-light);">
            <div style="font-size: 0.85rem; color: var(--shat-navy); margin-bottom: 6px;">
              ${txt('المتدرب:', 'Trainee:', 'Stagiaire :')} <strong>${studentName}</strong>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
              <span>${txt('الملف المرفوع:', 'Submitted File:', 'Fichier Déposé :')} <strong>${fileName}</strong></span>
              <a href="/api/files/download/${subId}-file" target="_blank" class="btn-clean btn-secondary btn-sm" download="${fileName}">
                <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.download('icon-inline', 14)} <span>${txt('تنزيل الملف الميداني', 'Download Deliverable', 'Télécharger le Devoir')}</span></span>
              </a>
            </div>
          </div>

          <form id="form-submit-grade">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${txt('الدرجة المستحقة (من 100) *', 'Score (out of 100) *', 'Note Finale (sur 100) *')}</label>
              <input type="number" min="0" max="100" id="grade-input" class="form-input" value="${currentGrade || '95'}" placeholder="e.g. 95" required style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800;">
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${txt('التغذية الراجعة الأكاديمية والتوجيهات المؤسسية *', 'Academic Feedback & Institutional Guidance *', 'Rétroaction Pédagogique et Recommandations *')}</label>
              <textarea id="feedback-input" class="form-input" style="min-height: 120px;" placeholder="${txt('اكتب ملاحظاتك التوجيهية وتفاصيل التقييم للمتدرب...', 'Enter constructive feedback and appraisal details for the student...', 'Saisissez vos observations détaillées et conseils d’amélioration...')}" required>${currentFeedback || txt('عمل منهجي ممتاز وموافق للمحددات المعيارية.', 'Excellent methodical work fully compliant with quality benchmarks.', 'Travail méthodique exemplaire conforme aux normes de qualité.')}</textarea>
            </div>

            <button type="submit" id="btn-save-grade" class="btn-clean btn-green btn-lg" style="width: 100%; justify-content: center;">
              <span>${txt('تأكيد وحفظ الدرجة في قاعدة البيانات الرسمية', 'Save Grade to Official Database', 'Enregistrer la Note en Base Officielle')}</span>
            </button>
          </form>
        `;

        backdrop.classList.add('open');

        const gradeForm = document.getElementById('form-submit-grade');
        if (gradeForm) {
          gradeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const gradeVal = parseInt(document.getElementById('grade-input')?.value, 10);
            const feedbackVal = document.getElementById('feedback-input')?.value;

            const saveBtn = document.getElementById('btn-save-grade');
            if (saveBtn) {
              saveBtn.disabled = true;
              saveBtn.innerHTML = `<span>${txt('جاري الحفظ في الخادم...', 'Saving to server...', 'Enregistrement en cours...')}</span>`;
            }

            try {
              const res = await api.gradeSubmission(subId, gradeVal, feedbackVal);
              showToast(txt(`تم رصد الدرجة (${gradeVal}/100) وحفظ التقييم بنجاح في قاعدة البيانات!`, `Grade (${gradeVal}/100) and feedback saved successfully!`, `Note (${gradeVal}/100) et rétroaction enregistrées avec succès !`), 'success');
              backdrop.classList.remove('open');
              const courseId = selectEl?.value;
              if (courseId) loadRoster(courseId);
            } catch (err) {
              showToast(txt('تعذر حفظ التقييم: ', 'Failed to save grade: ', 'Échec de l’enregistrement : ') + err.message, 'error');
              if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = `<span>${txt('تأكيد وحفظ الدرجة', 'Save Grade', 'Enregistrer')}</span>`;
              }
            }
          });
        }
      };
    });
  }

  if (selectEl) {
    selectEl.addEventListener('change', () => {
      loadRoster(selectEl.value);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      showToast(txt('جاري تحديث السجلات...', 'Refreshing records...', 'Actualisation des registres...'), 'info', 1000);
      loadCourses();
    });
  }

  // Initial load
  loadCourses();
}
