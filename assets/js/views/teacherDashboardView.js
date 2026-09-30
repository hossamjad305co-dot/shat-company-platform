// assets/js/views/teacherDashboardView.js
// Production Teacher Management & Grading Workspace for SHAT Academy
import { api } from '../services/api/apiClient.js';

export function renderTeacherDashboardView(lang = 'ar') {
  return `
    <div class="teacher-portal-wrapper" style="padding-top: 100px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #0F2A4A 100%); border-radius: var(--radius-md); padding: 32px; color: #FFFFFF; margin-bottom: 32px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(30, 166, 114, 0.2); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">بوابة الكادر التدريسي والأكاديمي • شركة شات (SHAT Portal)</span>
                <span style="font-size: 0.85rem; color: #94A3B8;">• جلسة موثقة برمجياً</span>
              </div>
              <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; color: #FFFFFF;" id="teacher-greeting">لوحة تحكم المدرب والمحاضر المعتمد</h1>
              <p style="color: #CBD5E1; font-size: 0.95rem; margin: 0; max-width: 600px;">
                متابعة أداء المتدربين، مراجعة وتقييم التكليفات الميدانية، وتوثيق التغذية الراجعة المؤسسية وفق معايير الجودة الدولية.
              </p>
            </div>

            <div style="display: flex; gap: 12px; align-items: center;">
              <a href="#/academy" class="btn-clean" style="background: rgba(255,255,255,0.1); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.2);">
                <span>← العودة للأكاديمية</span>
              </a>
              <button id="btn-teacher-refresh" class="btn-clean btn-green">
                <span>🔄 تحديث البيانات</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Course Selector Bar -->
        <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); margin-bottom: 24px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <label for="teacher-course-select" style="font-weight: 700; color: var(--shat-navy); font-size: 0.95rem;">المساق التدريبي النشط:</label>
              <select id="teacher-course-select" class="form-input" style="min-width: 320px; font-weight: 600;"></select>
            </div>
            <div id="teacher-course-meta" style="font-size: 0.88rem; color: var(--text-muted);">
              جاري تحميل بيانات المساق...
            </div>
          </div>
        </div>

        <!-- KPI Summary Cards -->
        <div class="grid-3" style="margin-bottom: 32px;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-navy);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">إجمالي المتدربين المسجلين</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--shat-navy);" id="stat-total-students">--</div>
            <div style="font-size: 0.78rem; color: var(--shat-green); margin-top: 4px;">مسجلون في هذا المساق</div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-green);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">التكليفات المسلمة والمكتملة</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--shat-green);" id="stat-total-submissions">--</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">بانتظار الرصد والتقييم</div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-amber);">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">متوسط الإنجاز العام</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--shat-amber);" id="stat-avg-progress">--%</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">نسبة التقدم الدراسي</div>
          </div>
        </div>

        <!-- Student Roster & Grading Table -->
        <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm); margin-bottom: 32px;">
          <div style="padding: 18px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
              سجل المتدربين وتقييم التكليفات الدراسية (Student Progress & Submissions)
            </h3>
            <span style="font-size: 0.82rem; color: var(--text-muted);">رصد الدرجات والتغذية الراجعة فورية ومباشرة</span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;" id="teacher-roster-table">
              <thead>
                <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                  <th style="padding: 14px 20px;">المتدرب</th>
                  <th style="padding: 14px 20px;">البريد والهاتف</th>
                  <th style="padding: 14px 20px;">نسبة الإنجاز</th>
                  <th style="padding: 14px 20px;">التسليمات</th>
                  <th style="padding: 14px 20px;">الحالة</th>
                  <th style="padding: 14px 20px; text-align: left;">الإجراءات والتقييم</th>
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

    <!-- Teacher Grading Modal -->
    <div id="modal-grading-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 600px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-grading-title">رصد الدرجة وإعطاء التغذية الراجعة</div>
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
  const statProgress = document.getElementById('stat-avg-progress');

  // Verify auth
  const currentUser = api.currentUser;
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    window.location.hash = '#/login';
    return;
  }

  if (greetingEl) {
    greetingEl.textContent = `مرحباً بك د. ${currentUser.fullNameAr || currentUser.fullNameEn}`;
  }

  let teacherCourses = [];

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
              لا توجد مساقات مسندة لحسابك حالياً.
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
        جاري تحديث سجل المتدربين...
      </td></tr>`;
    }

    try {
      const res = await api.getTeacherRoster(courseId);
      if (res.success && res.roster) {
        const roster = res.roster;

        // Update stats
        if (statStudents) statStudents.textContent = roster.length;
        const totalSubs = roster.reduce((acc, curr) => acc + (curr.submissionsCount || 0), 0);
        if (statSubmissions) statSubmissions.textContent = totalSubs;
        const avgProg = roster.length > 0
          ? Math.round(roster.reduce((acc, curr) => acc + (curr.progressPercent || 0), 0) / roster.length)
          : 0;
        if (statProgress) statProgress.textContent = `${avgProg}%`;

        if (roster.length === 0) {
          tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 40px; text-align: center; color: var(--text-muted);">
            لم يتم تسجيل متدربين في هذا المساق بعد.
          </td></tr>`;
          return;
        }

        tbodyEl.innerHTML = roster.map(student => {
          const hasSubs = student.submissions && student.submissions.length > 0;
          const latestSub = hasSubs ? student.submissions[0] : null;

          return `
            <tr style="border-bottom: 1px solid var(--border-light); transition: background 0.15s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
              <td style="padding: 16px 20px;">
                <div style="font-weight: 700; color: var(--shat-navy);">${student.fullNameAr}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">معرّف المتدرب: ${student.studentId}</div>
              </td>
              <td style="padding: 16px 20px;">
                <div style="font-size: 0.85rem; color: var(--text-main);">${student.email}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${student.phone}</div>
              </td>
              <td style="padding: 16px 20px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="flex: 1; height: 6px; background: #E2E8F0; border-radius: 3px; overflow: hidden; width: 80px;">
                    <div style="width: ${student.progressPercent}%; height: 100%; background: var(--shat-green);"></div>
                  </div>
                  <span style="font-weight: 700; font-size: 0.85rem; color: var(--shat-navy);">${student.progressPercent}%</span>
                </div>
              </td>
              <td style="padding: 16px 20px;">
                <span class="badge" style="background: ${hasSubs ? '#DCFCE7' : '#F1F5F9'}; color: ${hasSubs ? '#166534' : '#64748B'};">
                  ${student.submissionsCount} تسليم متاح
                </span>
              </td>
              <td style="padding: 16px 20px;">
                ${latestSub ? (
                  latestSub.status === 'graded'
                    ? `<span style="font-weight: 700; color: var(--shat-green);">مقيّم (${latestSub.grade}/100)</span>`
                    : `<span style="font-weight: 700; color: var(--shat-amber);">بانتظار التقييم</span>`
                ) : '<span style="color: var(--text-muted);">لم يسلّم بعد</span>'}
              </td>
              <td style="padding: 16px 20px; text-align: left;">
                ${latestSub ? `
                  <button class="btn-clean btn-primary btn-sm btn-open-grade-modal" 
                    data-sub-id="${latestSub.id}"
                    data-student-name="${student.fullNameAr}"
                    data-file-name="${latestSub.fileName}"
                    data-grade="${latestSub.grade || ''}"
                    data-feedback="${encodeURIComponent(latestSub.instructorFeedback || '')}">
                    <span>✍️ تقييم التكليف</span>
                  </button>
                  <a href="/api/files/download/${latestSub.id}-file" target="_blank" class="btn-clean btn-sm" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); margin-right: 6px;">
                    <span>📥 تنزيل الملف</span>
                  </a>
                ` : `
                  <span style="font-size: 0.8rem; color: var(--text-muted);">لا توجد ملفات</span>
                `}
              </td>
            </tr>
          `;
        }).join('');

        bindGradingModalButtons();
      }
    } catch (err) {
      if (tbodyEl) {
        tbodyEl.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--accent-red);">
          فشل في تحميل سجل المتدربين: ${err.message}
        </td></tr>`;
      }
    }
  }

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
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); margin-bottom: 16px; border: 1px solid var(--border-light);">
            <div style="font-size: 0.8rem; color: var(--text-muted);">المتدرب: <strong>${studentName}</strong></div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">الملف المسلّم: <strong>${fileName}</strong></div>
          </div>

          <form id="form-submit-grade">
            <div class="form-group">
              <label class="form-label">الدرجة الممنوحة (من 100) *</label>
              <input type="number" min="0" max="100" id="grade-input" class="form-input" value="${currentGrade}" placeholder="مثال: 95" required>
            </div>

            <div class="form-group">
              <label class="form-label">التغذية الراجعة الأكاديمية والتوجيهات المؤسسية *</label>
              <textarea id="feedback-input" class="form-input" style="min-height: 110px;" placeholder="اكتب ملاحظاتك التوجيهية وتفاصيل التقييم للمتدرب..." required>${currentFeedback}</textarea>
            </div>

            <button type="submit" class="btn-clean btn-green btn-lg" style="width: 100%;">
              <span>تأكيد ورصد الدرجة والتغذية الراجعة</span>
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

            try {
              const res = await api.gradeSubmission(subId, grade, feedback);
              if (res.success) {
                alert('تم رصد الدرجة والتغذية الراجعة بنجاح وتوثيقها في سجل المتدرب.');
                backdrop.classList.remove('open');
                if (selectEl) {
                  loadRoster(selectEl.value);
                }
              }
            } catch (err) {
              alert('فشل في حفظ التقييم: ' + err.message);
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
      if (selectEl) loadRoster(selectEl.value);
    };
  }

  loadCourses();
}
