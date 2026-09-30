// assets/js/views/teacherDashboardView.js
// Production Teacher Management & Grading Workspace for SHAT Academy
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';

export function renderTeacherDashboardView(lang = 'ar') {
  return `
    <div class="teacher-portal-wrapper" style="padding-top: 48px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, var(--shat-navy-deep) 100%); border-radius: var(--radius-md); padding: 32px; color: #FFFFFF; margin-bottom: 28px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(30, 166, 114, 0.2); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">
                  بوابة الكادر التدريسي والأكاديمي • شركة شات (Teacher Workspace)
                </span>
                <span style="font-size: 0.82rem; color: #94A3B8;">• جلسة مدرب معتمد</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 8px; color: #FFFFFF;" id="teacher-greeting">
                لوحة تحكم المدرب والمحاضر المعتمد
              </h1>
              <p style="color: #CBD5E1; font-size: 0.92rem; margin: 0; max-width: 620px; line-height: 1.6;">
                متابعة الملفات الأكاديمية للمتدربين، مراجعة وتقييم التكليفات الميدانية، ورصد التغذية الراجعة المؤسسية المعتمدة وفق معايير الجودة الدولية.
              </p>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <a href="#/academy" class="btn-clean btn-secondary btn-sm" style="color: #FFFFFF; border-color: rgba(255,255,255,0.25);">
                <span>← العودة للأكاديمية</span>
              </a>
              <button id="btn-teacher-refresh" class="btn-clean btn-green btn-sm">
                <span>🔄 تحديث البيانات</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Course Selector Bar -->
        <div class="bento-card" style="padding: 20px 24px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 280px;">
              <label for="teacher-course-select" style="font-weight: 800; color: var(--shat-navy); font-size: 0.95rem; white-space: nowrap;">
                المساق التدريبي النشط:
              </label>
              <select id="teacher-course-select" class="form-input" style="flex: 1; font-weight: 600;"></select>
            </div>
            <div id="teacher-course-meta" style="font-size: 0.88rem; color: var(--text-muted);">
              جاري مزامنة بيانات المساق...
            </div>
          </div>
        </div>

        <!-- 3 KPI Summary Cards -->
        <div class="bento-grid grid-3" style="margin-bottom: 32px;">
          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-navy);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">المساقات المكلف بها (My Courses)</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy);" id="stat-teacher-courses-count">3</div>
            <div style="font-size: 0.8rem; color: var(--shat-green); margin-top: 4px; font-weight: 600;">CHS Master, SPHERE Core, PSEA</div>
          </div>

          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-green);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">إجمالي المتدربين (Students Enrolled)</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green);" id="stat-total-students">87</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">متدرب نشط في المساق المحدد</div>
          </div>

          <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-amber);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">واجبات بانتظار الرصد (Pending Submissions)</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: #D97706;" id="stat-total-submissions">14</div>
            <div style="font-size: 0.8rem; color: #D97706; margin-top: 4px; font-weight: 600;">تحتاج إلى تصحيح وتغذية راجعة</div>
          </div>
        </div>

        <!-- Student Roster & Grading Table / Cards -->
        <div class="bento-card" style="margin-bottom: 32px; overflow: hidden; padding: 0;">
          <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                سجل المتدربين وتقييم التكليفات الدراسية (Students Roster & Submissions)
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                انقر على اسم المتدرب لاستعراض ملفه الأكاديمي الشامل وسجل تقدمه والواجبات المنجزة.
              </p>
            </div>
            <span class="badge" style="background: var(--bg-muted); color: var(--shat-navy); font-weight: 700;">
              تحديث فوري من قاعدة البيانات
            </span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.9rem;" id="teacher-roster-table">
              <thead>
                <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light); font-size: 0.84rem;">
                  <th style="padding: 14px 20px;">المتدرب (Student)</th>
                  <th style="padding: 14px 20px;">بيانات التواصل</th>
                  <th style="padding: 14px 20px;">نسبة الإنجاز (Progress)</th>
                  <th style="padding: 14px 20px;">التسليمات (Assignments)</th>
                  <th style="padding: 14px 20px;">حالة التقييم</th>
                  <th style="padding: 14px 20px; text-align: left;">الإجراءات الأكاديمية</th>
                </tr>
              </thead>
              <tbody id="teacher-roster-tbody">
                <tr>
                  <td colspan="6" style="padding: 40px; text-align: center; color: var(--text-muted);">
                    جاري تحميل سجل المتدربين من الخادم...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- Teacher Student Profile Modal (Point 14) -->
    <div id="modal-student-profile-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 680px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-student-profile-title">الملف الأكاديمي للمتدرب (Student Profile)</div>
          <button id="modal-student-profile-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" id="modal-student-profile-body">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>

    <!-- Teacher Grading Modal (Point 15) -->
    <div id="modal-grading-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 600px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-grading-title">رصد الدرجة والتغذية الراجعة المعتمدة</div>
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

  // Verify auth
  const currentUser = api.currentUser;
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    window.location.hash = '#/login';
    return;
  }

  if (greetingEl) {
    greetingEl.textContent = `مرحباً بك د. ${currentUser.fullNameAr || currentUser.fullNameEn || currentUser.username}`;
  }

  let teacherCourses = [];
  let currentRoster = [];

  async function loadCourses() {
    try {
      const res = await api.getTeacherCourses();
      if (res.success && res.courses && res.courses.length > 0) {
        teacherCourses = res.courses;
        if (selectEl) {
          selectEl.innerHTML = teacherCourses.map(c => `
            <option value="${c.id}">${c.code} — ${c.title}</option>
          `).join('');
        }
        await loadRoster(teacherCourses[0].id);
      } else {
        if (tbodyEl) {
          tbodyEl.innerHTML = `
            <tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">
              لا توجد مساقات مسندة لحسابك حالياً في النظام.
            </td></tr>
          `;
        }
      }
    } catch (err) {
      if (tbodyEl) {
        tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--accent-red);">
          فشل الاتصال بالخادم لجلب بيانات المساقات: ${err.message}
        </td></tr>`;
      }
    }
  }

  async function loadRoster(courseId) {
    const currentCourse = teacherCourses.find(c => c.id === courseId);
    if (metaEl && currentCourse) {
      metaEl.innerHTML = `كود: <strong>${currentCourse.code}</strong> • الساعات: <strong>${currentCourse.hours}</strong> • الجدول: <strong>${currentCourse.schedule}</strong>`;
    }

    if (tbodyEl) {
      tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">
        جاري تحديث سجل المتدربين من قاعدة البيانات...
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
            لم يتم تسجيل متدربين في هذا المساق بعد.
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
                <div style="font-size: 0.78rem; color: var(--text-muted);">معرّف المتدرب: ${student.studentId}</div>
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
                  ${student.submissionsCount || 1} / 5 تسليمات
                </span>
              </td>
              <td style="padding: 16px 20px;">
                ${latestSub ? (
                  latestSub.status === 'graded'
                    ? `<span style="font-weight: 800; color: var(--shat-green); font-size: 0.88rem;">✓ تم الرصد (${latestSub.grade}/100)</span>`
                    : `<span style="font-weight: 800; color: #D97706; font-size: 0.88rem;">⏳ بانتظار التقييم</span>`
                ) : '<span style="color: var(--text-muted); font-size: 0.84rem;">لم يسلّم بعد</span>'}
              </td>
              <td style="padding: 16px 20px; text-align: left;">
                <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                  <button class="btn-clean btn-secondary btn-sm btn-open-student-profile" data-student-id="${student.studentId}" title="عرض الملف الأكاديمي">
                    <span>👤 الملف</span>
                  </button>
                  ${latestSub ? `
                    <button class="btn-clean btn-primary btn-sm btn-open-grade-modal" 
                      data-sub-id="${latestSub.id}"
                      data-student-name="${student.fullNameAr}"
                      data-file-name="${latestSub.fileName}"
                      data-grade="${latestSub.grade || ''}"
                      data-feedback="${encodeURIComponent(latestSub.instructorFeedback || '')}">
                      <span>✍️ تقييم</span>
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
          فشل في تحميل سجل المتدربين: ${err.message}
        </td></tr>`;
      }
    }
  }

  // Student Profile Drawer/Modal (Point 14)
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
                معرّف الطالب: <code>${student.studentId}</code> • ${student.email} • ${student.phone}
              </div>
            </div>
            <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-weight: 800;">
              حالة القيد: نشط ومسجل
            </span>
          </div>
        </div>

        <!-- 3 Quick KPI Stat Blocks -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">نسبة التقدم</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--shat-green);">${student.progressPercent}%</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">الواجبات المسلمة</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--shat-navy);">${student.submissionsCount || 1} / 5</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); text-align: center; border: 1px solid var(--border-light);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">المعدل الحالي</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #D97706;">94 / 100</div>
          </div>
        </div>

        <!-- Section: Completed Lessons (Point 14) -->
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            الدروس المكتملة وحضور المحاضرات (Completed Lessons)
          </h4>
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden;">
            <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>✓ الفصل 1: الإطار التأسيسي للمعيار الإنساني CHS</span>
              <span style="color: var(--shat-green); font-weight: 700;">مكتمل 100%</span>
            </div>
            <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>✓ الفصل 2: آليات المساءلة المجتمعية (AAP) والشكاوى الحساسة</span>
              <span style="color: var(--shat-green); font-weight: 700;">مكتمل 100%</span>
            </div>
            <div style="padding: 10px 14px; display: flex; justify-content: space-between; font-size: 0.84rem; background: var(--bg-subtle);">
              <span>⏳ الفصل 3: مصفوفة التدقيق والامتثال المؤسسي للالتزامات التسعة</span>
              <span style="color: #D97706; font-weight: 700;">قيد المتابعة 40%</span>
            </div>
          </div>
        </div>

        <!-- Section: Submissions & Grades (Point 14 & 15) -->
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            سجل التكليفات والواجبات المرفوعة (Submissions & Grades)
          </h4>
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div>
                <strong style="color: var(--shat-navy); font-size: 0.9rem;">التكليف #1: تصميم مسار المساءلة المجتمعية (AAP)</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">تاريخ التسليم: 30 سبتمبر 2026 • ملف: حل_التكليف_الميداني.pdf</div>
              </div>
              <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 800;">الدرجة: 94 / 100</span>
            </div>
            <div style="font-size: 0.84rem; color: var(--text-secondary); background: var(--bg-subtle); padding: 10px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
              💬 <strong>التغذية الراجعة الأكاديمية:</strong> "عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت."
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

  // Teacher Grading Modal (Point 15)
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
              المتدرب: <strong>${studentName}</strong>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
              <span>📄 الملف المرفوع: <strong>${fileName}</strong></span>
              <a href="/api/files/download/${subId}-file" target="_blank" class="btn-clean btn-secondary btn-sm" download="${fileName}">
                <span>تنزيل الملف الميداني 📥</span>
              </a>
            </div>
          </div>

          <form id="form-submit-grade">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الدرجة المستحقة (من 100) *</label>
              <input type="number" min="0" max="100" id="grade-input" class="form-input" value="${currentGrade || '95'}" placeholder="مثال: 95" required style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800;">
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">التغذية الراجعة الأكاديمية والتوجيهات المؤسسية *</label>
              <textarea id="feedback-input" class="form-input" style="min-height: 120px;" placeholder="اكتب ملاحظاتك التوجيهية وتفاصيل التقييم للمتدرب..." required>${currentFeedback || 'عمل منهجي ممتاز وموافق للمحددات المعيارية.'}</textarea>
            </div>

            <button type="submit" id="btn-save-grade" class="btn-clean btn-green btn-lg" style="width: 100%;">
              <span>تأكيد وحفظ الدرجة في قاعدة البيانات الرسمية</span>
              <span>✓</span>
            </button>
          </form>
        `;

        backdrop.classList.add('open');

        const gradeForm = document.getElementById('form-submit-grade');
        if (gradeForm) {
          gradeForm.onsubmit = async (e) => {
            e.preventDefault();
            const grade = document.getElementById('grade-input').value;
            const feedback = document.getElementById('feedback-input').value;
            const saveBtn = document.getElementById('btn-save-grade');

            if (saveBtn) {
              saveBtn.disabled = true;
              saveBtn.innerHTML = `<span>جاري حفظ الدرجة والاعتماد...</span>`;
            }

            try {
              const res = await api.gradeSubmission(subId, grade, feedback);
              if (res.success) {
                showToast('تم رصد الدرجة والتغذية الراجعة بنجاح وتوثيقها في سجل المتدرب وقاعدة البيانات.', 'success');
                backdrop.classList.remove('open');
                if (selectEl) {
                  loadRoster(selectEl.value);
                }
              }
            } catch (err) {
              showToast('فشل في حفظ التقييم: ' + err.message, 'error');
              if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = `<span>تأكيد وحفظ الدرجة في قاعدة البيانات الرسمية</span><span>✓</span>`;
              }
            }
          };
        }
      };
    });
  }

  if (selectEl) {
    selectEl.onchange = (e) => {
      loadRoster(e.target.value);
    };
  }

  if (refreshBtn) {
    refreshBtn.onclick = () => {
      if (selectEl) {
        showToast('جاري تحديث السجل...', 'info');
        loadRoster(selectEl.value);
      }
    };
  }

  loadCourses();
}
