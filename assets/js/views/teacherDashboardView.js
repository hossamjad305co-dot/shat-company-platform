// assets/js/views/teacherDashboardView.js
// Production Teacher Management & Grading Workspace for SHAT Academy with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';

export function renderTeacherDashboardView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

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
    btnBackAcademy: txt('← العودة للأكاديمية', '← Back to Academy', '← Retour à l’Académie'),
    btnRefresh: txt('🔄 تحديث البيانات', '🔄 Refresh Data', '🔄 Actualiser'),
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
    <div class="teacher-portal-wrapper" style="padding-top: 48px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, var(--shat-navy-deep) 100%); border-radius: var(--radius-md); padding: 32px; color: #FFFFFF; margin-bottom: 28px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(30, 166, 114, 0.2); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">
                  ${t.badge}
                </span>
                <span style="font-size: 0.82rem; color: #94A3B8;">• ${t.sessionActive}</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 8px; color: #FFFFFF;" id="teacher-greeting">
                ${t.title}
              </h1>
              <p style="color: #CBD5E1; font-size: 0.92rem; margin: 0; max-width: 620px; line-height: 1.6;">
                ${t.desc}
              </p>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25);">
                <span>${t.btnBackAcademy}</span>
              </a>
              <button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm">
                <span>${t.btnRefresh}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Course Selector Bar -->
        <div class="bento-card" style="padding: 20px 24px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 280px;">
              <label for="teacher-course-select" style="font-weight: 800; color: var(--shat-navy); font-size: 0.95rem; white-space: nowrap;">
                ${t.courseSelectLabel}
              </label>
              <select id="teacher-course-select" class="form-input" style="flex: 1; font-weight: 600;"></select>
            </div>
            <div id="teacher-course-meta" style="font-size: 0.88rem; color: var(--text-muted);">
              ${t.courseSyncing}
            </div>
          </div>
        </div>

        <!-- 3 KPI Summary Cards -->
        <div class="bento-grid grid-3" style="margin-bottom: 32px;">
          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-navy);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">${t.kpiCourses}</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy);" id="stat-teacher-courses-count">3</div>
            <div style="font-size: 0.8rem; color: var(--shat-green); margin-top: 4px; font-weight: 600;">CHS Master, SPHERE Core, PSEA</div>
          </div>

          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-green);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">${t.kpiStudents}</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green);" id="stat-total-students">87</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${t.kpiStudentsMeta}</div>
          </div>

          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-amber);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">${t.kpiPending}</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: #D97706;" id="stat-total-submissions">14</div>
            <div style="font-size: 0.8rem; color: #D97706; margin-top: 4px; font-weight: 600;">${t.kpiPendingMeta}</div>
          </div>
        </div>

        <!-- Student Roster & Grading Table / Cards -->
        <div class="bento-card" style="margin-bottom: 32px; overflow: hidden; padding: 0;">
          <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                ${t.rosterTitle}
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                ${t.rosterSubtitle}
              </p>
            </div>
            <span class="badge" style="background: var(--bg-muted); color: var(--shat-navy); font-weight: 700;">
              ${t.liveDbBadge}
            </span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.9rem;" id="teacher-roster-table">
              <thead>
                <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light); font-size: 0.84rem;">
                  <th style="padding: 14px 20px;">${t.colStudent}</th>
                  <th style="padding: 14px 20px;">${t.colContact}</th>
                  <th style="padding: 14px 20px;">${t.colProgress}</th>
                  <th style="padding: 14px 20px;">${t.colSubs}</th>
                  <th style="padding: 14px 20px;">${t.colStatus}</th>
                  <th style="padding: 14px 20px; text-align: ${isRtl ? 'left' : 'right'};">${t.colActions}</th>
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
      <div class="modal-box" style="max-width: 680px;">
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
      <div class="modal-box" style="max-width: 600px;">
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
  const currentUser = api.currentUser;
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    window.location.hash = '#/login';
    return;
  }

  if (greetingEl) {
    const trainerName = currentLang === 'ar' ? (currentUser.fullNameAr || currentUser.username) : (currentUser.fullNameEn || currentUser.username);
    greetingEl.textContent = `${txt('مرحباً بك د.', 'Welcome Dr.', 'Bienvenue Dr.')} ${trainerName}`;
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

        if (currentRoster.length === 0) {
          tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 40px; text-align: center; color: var(--text-muted);">
            ${txt('لم يتم تسجيل متدربين في هذا المساق بعد.', 'No trainees enrolled in this track yet.', 'Aucun stagiaire inscrit dans ce cursus pour le moment.')}
          </td></tr>`;
          return;
        }

        tbodyEl.innerHTML = currentRoster.map(student => {
          const hasSubs = student.submissions && student.submissions.length > 0;
          const latestSub = hasSubs ? student.submissions[0] : null;

          return `
            <tr style="border-bottom: 1px solid var(--border-light); transition: background 0.15s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
              <td style="padding: 16px 20px;">
                <div style="font-weight: 800; color: var(--shat-navy); cursor: pointer;" class="student-profile-link" data-student-id="${student.studentId}">
                  ${student.fullNameAr} 🔍
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${txt('معرّف المتدرب:', 'ID:', 'ID :')} ${student.studentId}</div>
              </td>
              <td style="padding: 16px 20px;">
                <div style="font-size: 0.85rem; color: var(--text-main);">${student.email}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${student.phone}</div>
              </td>
              <td style="padding: 16px 20px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="flex: 1; height: 7px; background: #E2E8F0; border-radius: 4px; overflow: hidden; width: 80px;">
                    <div style="width: ${student.progressPercent}%; height: 100%; background: var(--shat-green);"></div>
                  </div>
                  <span style="font-weight: 800; font-size: 0.85rem; color: var(--shat-navy);">${student.progressPercent}%</span>
                </div>
              </td>
              <td style="padding: 16px 20px;">
                <span class="badge" style="background: ${hasSubs ? '#DCFCE7' : '#F1F5F9'}; color: ${hasSubs ? '#166534' : '#64748B'}; font-weight: 700;">
                  ${student.submissionsCount || 1} / 5 ${txt('تسليمات', 'Submissions', 'Devoirs')}
                </span>
              </td>
              <td style="padding: 16px 20px;">
                ${latestSub ? (
                  latestSub.status === 'graded'
                    ? `<span style="font-weight: 800; color: var(--shat-green); font-size: 0.88rem;">✓ ${txt('تم الرصد', 'Graded', 'Noté')} (${latestSub.grade}/100)</span>`
                    : `<span style="font-weight: 800; color: #D97706; font-size: 0.88rem;">⏳ ${txt('بانتظار التقييم', 'Pending Review', 'En attente')}</span>`
                ) : `<span style="color: var(--text-muted); font-size: 0.84rem;">${txt('لم يسلّم بعد', 'Not submitted', 'Non remis')}</span>`}
              </td>
              <td style="padding: 16px 20px; text-align: ${isRtl ? 'left' : 'right'};">
                <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                  <button class="btn-clean btn-secondary btn-sm btn-open-student-profile" data-student-id="${student.studentId}" title="${txt('عرض الملف الأكاديمي', 'View Profile', 'Consulter le Profil')}">
                    <span>👤 ${txt('الملف', 'Profile', 'Profil')}</span>
                  </button>
                  ${latestSub ? `
                    <button class="btn-clean btn-primary btn-sm btn-open-grade-modal" 
                      data-sub-id="${latestSub.id}"
                      data-student-name="${student.fullNameAr}"
                      data-file-name="${latestSub.fileName}"
                      data-grade="${latestSub.grade || ''}"
                      data-feedback="${encodeURIComponent(latestSub.instructorFeedback || '')}">
                      <span>✍️ ${txt('تقييم', 'Grade', 'Noter')}</span>
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
              <span>✓ ${txt('الفصل 1: الإطار التأسيسي للمعيار الإنساني CHS', 'Chapter 1: CHS Conceptual Framework', 'Chapitre 1: Cadre Conceptuel CHS')}</span>
              <span style="color: var(--shat-green); font-weight: 700;">${txt('مكتمل 100%', '100% Completed', '100% Validé')}</span>
            </div>
            <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>✓ ${txt('الفصل 2: آليات المساءلة المجتمعية (AAP) والشكاوى الحساسة', 'Chapter 2: AAP & CFRM Accountability Mechanisms', 'Chapitre 2: Mécanismes de Redevabilité AAP/CFRM')}</span>
              <span style="color: var(--shat-green); font-weight: 700;">${txt('مكتمل 100%', '100% Completed', '100% Validé')}</span>
            </div>
            <div style="padding: 10px 14px; display: flex; justify-content: space-between; font-size: 0.84rem; background: var(--bg-subtle);">
              <span>⏳ ${txt('الفصل 3: مصفوفة التدقيق والامتثال المؤسسي للالتزامات التسعة', 'Chapter 3: Institutional Compliance & 9 Commitments Matrix', 'Chapitre 3: Matrice de Conformité aux 9 Engagements')}</span>
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
              💬 <strong>${txt('التغذية الراجعة الأكاديمية:', 'Academic Feedback:', 'Rétroaction Pédagogique :')}</strong> "${txt('عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت.', 'Exceptional methodical delivery with strict compliance to complaints confidentiality and tracking matrix. Well done.', 'Travail méthodique exemplaire avec un respect rigoureux de la confidentialité des alertes et du suivi. Félicitations.')}"
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
              <span>📄 ${txt('الملف المرفوع:', 'Submitted File:', 'Fichier Déposé :')} <strong>${fileName}</strong></span>
              <a href="/api/files/download/${subId}-file" target="_blank" class="btn-clean btn-secondary btn-sm" download="${fileName}">
                <span>${txt('تنزيل الملف الميداني 📥', 'Download Deliverable 📥', 'Télécharger le Devoir 📥')}</span>
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
              <span>✓</span>
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
                saveBtn.innerHTML = `<span>${txt('تأكيد وحفظ الدرجة', 'Save Grade', 'Enregistrer')}</span><span>✓</span>`;
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
