// assets/js/views/studentDashboardView.js
// SHAT Platform — Student LMS Portal & Learning Dashboard
import { api } from '../services/api/apiClient.js';

export function renderStudentDashboardView(lang = 'ar') {
  const user = api.currentUser;

  if (!user || user.role !== 'student' && user.role !== 'admin') {
    return `
      <div class="container" style="padding: 80px 16px; text-align: center;">
        <div class="bento-card" style="max-width: 520px; margin: 0 auto; padding: 40px;">
          <div class="section-badge" style="margin-bottom: 12px;">أكاديمية شركة شات • SHAT Academy LMS</div>
          <h2 style="color: var(--shat-navy); margin-bottom: 12px;">بوابة المتدربين المعتمدين</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">يتطلب الوصول إلى مساقاتك وتكليفاتك في شركة شات للتنمية والتطوير تسجيل الدخول بحساب متدرب معتمد.</p>
          <a href="#/login" class="btn-clean btn-primary btn-lg">تسجيل الدخول إلى الأكاديمية</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="view-student-dashboard">
      <!-- Top Overview Bar -->
      <section class="section" style="padding: 48px 0 24px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div class="section-badge">بوابة المتدرب المعتمد • Student Learning Portal</div>
              <h1 class="section-title" style="margin-bottom: 6px; font-size: 1.85rem;">مرحباً بك يا ${user.fullNameAr}</h1>
              <p class="section-desc" style="font-size: 0.95rem;">
                الرقم التدريبي: <code style="font-family: var(--font-mono); color: var(--shat-navy); font-weight: bold;">${user.maskedNationalId}</code> • ${user.email}
              </p>
            </div>
            <div style="display: flex; gap: 10px;">
              <a href="#/academy" class="btn-clean btn-secondary btn-sm">
                <span>تصفح دليل المساقات</span>
              </a>
              <button id="btn-student-logout" class="btn-clean btn-secondary btn-sm" style="color: #991B1B;">
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Body -->
      <section class="section">
        <div class="container">
          
          <!-- KPI Metrics Cards -->
          <div class="bento-grid grid-3" style="margin-bottom: 36px;">
            <div class="bento-card" style="padding: 24px;">
              <span class="bento-kicker">المساقات المسجلة</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;" id="stat-enrolled-count">1</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">دبلوم المعيار الإنساني الأساسي (CHS)</p>
            </div>
            <div class="bento-card" style="padding: 24px;">
              <span class="bento-kicker">نسبة الإنجاز الأكاديمي</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); margin: 6px 0;">65%</div>
              <div style="width: 100%; height: 6px; background: var(--bg-muted); border-radius: 99px; overflow: hidden; margin-top: 6px;">
                <div style="width: 65%; height: 100%; background: var(--shat-green);"></div>
              </div>
            </div>
            <div class="bento-card" style="padding: 24px;">
              <span class="bento-kicker">التقييمات والدرجات</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">94 / 100</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">تقدير: امتياز مع مرتبة الشرف (Distinction)</p>
            </div>
          </div>

          <!-- Section: My Active Course Room -->
          <div class="bento-card" style="margin-bottom: 36px; border-top: 4px solid var(--shat-navy);">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 16px; margin-bottom: 20px;">
              <div>
                <span class="bento-kicker">المساق الفعال حالياً</span>
                <h2 style="font-size: 1.45rem; color: var(--shat-navy); margin: 4px 0;">دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات</h2>
                <div style="font-size: 0.86rem; color: var(--text-muted);">المحاضر: د. أسامة المنصور • 40 ساعة تدريبية معتمدة</div>
              </div>
              <a href="#/course/shat-chs-master" class="btn-clean btn-primary btn-sm">
                <span>دخول قاعة المساق والمحاضرات</span>
                <span>←</span>
              </a>
            </div>

            <!-- Chapters & Direct File Downloads -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy);">الحقائب والمواد التدريبية المعتمدة (تنزيل مباشر آمن من Google Drive):</h3>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                <!-- Material 1 -->
                <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">دليل_المعيار_الإنساني_الأساسي_CHS.pdf</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 4.8 MB • نوع: PDF وثيقة معتمدة</div>
                  </div>
                  <a href="/api/files/download/file-chs-01" class="btn-clean btn-green btn-sm" download="دليل_المعيار_الإنساني_الأساسي_CHS.pdf">
                    <span>تحميل</span>
                    <span>📥</span>
                  </a>
                </div>

                <!-- Material 2 -->
                <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">حقيبة_أدوات_المساءلة_المجتمعية_AAP.pptx</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 12.3 MB • نوع: PPTX عرض تقديمي</div>
                  </div>
                  <a href="/api/files/download/file-chs-02" class="btn-clean btn-green btn-sm" download="حقيبة_أدوات_المساءلة_المجتمعية_AAP.pptx">
                    <span>تحميل</span>
                    <span>📥</span>
                  </a>
                </div>

                <!-- Material 3 -->
                <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 1.2 MB • نوع: XLSX جداول إلكترونية</div>
                  </div>
                  <a href="/api/files/download/file-chs-03" class="btn-clean btn-green btn-sm" download="مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx">
                    <span>تحميل</span>
                    <span>📥</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Section: Assignments & Grading Roster -->
          <div class="bento-card">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px;">
              <h3 style="font-size: 1.25rem; color: var(--shat-navy); margin: 0;">التكليفات الميدانية والمهام العملية</h3>
              <span class="bento-kicker">سجل التسليم والتقييمات</span>
            </div>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: start;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--border-light); color: var(--text-muted); font-size: 0.82rem;">
                    <th style="padding: 10px 8px;">التكليف</th>
                    <th style="padding: 10px 8px;">الموعد النهائي</th>
                    <th style="padding: 10px 8px;">حالة التسليم</th>
                    <th style="padding: 10px 8px;">الدرجة</th>
                    <th style="padding: 10px 8px;">ملاحظات المدرب</th>
                    <th style="padding: 10px 8px;">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-light);">
                    <td style="padding: 14px 8px; font-weight: 700; color: var(--shat-navy);">
                      التكليف 1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية
                    </td>
                    <td style="padding: 14px 8px; color: var(--text-muted);">2026-10-15</td>
                    <td style="padding: 14px 8px;">
                      <span style="background: var(--shat-green-tint); color: var(--shat-green); padding: 4px 10px; border-radius: var(--radius-xs); font-weight: 700; font-size: 0.8rem;">
                        تم التصحيح والاعتماد
                      </span>
                    </td>
                    <td style="padding: 14px 8px; font-weight: 900; color: var(--shat-green); font-family: var(--font-mono);">
                      94 / 100
                    </td>
                    <td style="padding: 14px 8px; font-size: 0.85rem; color: var(--text-secondary); max-width: 280px;">
                      عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت.
                    </td>
                    <td style="padding: 14px 8px;">
                      <a href="/api/files/download/sub-01-file" class="btn-clean btn-secondary btn-sm" download="حل_التكليف_الميداني_احمد_خليل.pdf">
                        <span>معاينة التسليم</span>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 14px 8px; font-weight: 700; color: var(--shat-navy);">
                      التكليف 2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة
                    </td>
                    <td style="padding: 14px 8px; color: var(--text-muted);">2026-10-25</td>
                    <td style="padding: 14px 8px;">
                      <span style="background: #FEF3C7; color: #92400E; padding: 4px 10px; border-radius: var(--radius-xs); font-weight: 700; font-size: 0.8rem;">
                        متاح للتسليم
                      </span>
                    </td>
                    <td style="padding: 14px 8px; color: var(--text-muted);">-</td>
                    <td style="padding: 14px 8px; font-size: 0.85rem; color: var(--text-muted);">في انتظار رفع الحل الميداني</td>
                    <td style="padding: 14px 8px;">
                      <button class="btn-clean btn-primary btn-sm btn-open-submit-modal" data-assign="assign-02">
                        <span>تسليم التكليف</span>
                        <span>📤</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  `;
}

export function bindStudentEvents() {
  const logoutBtn = document.getElementById('btn-student-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await api.logout();
      window.location.hash = '#/home';
    });
  }

  // Handle Assignment Submission Modal
  document.querySelectorAll('.btn-open-submit-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('global-modal-backdrop');
      const title = document.getElementById('global-modal-title');
      const body = document.getElementById('global-modal-body');

      if (!modal || !body) return;

      if (title) title.textContent = 'تسليم التكليف الميداني للأكاديمية';

      body.innerHTML = `
        <form id="student-assignment-submit-form">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); margin-bottom: 16px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green);">المساق التدريبي:</div>
            <div style="font-weight: 800; color: var(--shat-navy);">دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات</div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">التكليف 2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة</div>
          </div>

          <div class="form-group">
            <label class="form-label">الملف الميداني المطلوب تسليمه (PDF, DOCX, XLSX) *</label>
            <input type="file" id="submit-file-input" class="form-input" accept=".pdf,.docx,.xlsx" required />
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">الحد الأقصى للملف: 15 ميجابايت</div>
          </div>

          <div class="form-group">
            <label class="form-label">ملاحظات توضيحية للمدرب</label>
            <textarea id="submit-notes-input" class="form-textarea" rows="3" placeholder="أدخل أي ملاحظات ترغب بإيصالها للمحاضر حول الحل الميداني..."></textarea>
          </div>

          <button type="submit" id="btn-confirm-submission" class="btn-clean btn-primary btn-lg" style="width: 100%; margin-top: 8px;">
            <span>تأكيد ورفع التسليم للمدرب</span>
            <span>📤</span>
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
            alert('الرجاء اختيار ملف للتسليم.');
            return;
          }

          const btn = document.getElementById('btn-confirm-submission');
          if (btn) btn.innerHTML = `<span>جاري رفع وتوثيق التسليم...</span>`;

          try {
            await api.submitAssignment('assign-02', file.name, notes);
            alert('تم استلام ملف التكليف بنجاح وإرساله للمدرب لرصد التقييم والدرجات!');
            modal.classList.remove('open');
            window.location.reload();
          } catch (e) {
            alert('تعذر إتمام التسليم: ' + e.message);
            if (btn) btn.innerHTML = `<span>تأكيد ورفع التسليم للمدرب</span><span>📤</span>`;
          }
        });
      }
    });
  });
}
