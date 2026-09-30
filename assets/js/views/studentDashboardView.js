// assets/js/views/studentDashboardView.js
// Production Student LMS Portal & Learning Dashboard — SHAT Company Platform
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';

export function renderStudentDashboardView(lang = 'ar') {
  const user = api.currentUser;

  if (!user || (user.role !== 'student' && user.role !== 'admin')) {
    return `
      <div class="container" style="padding: 100px 16px 80px; text-align: center;">
        <div class="bento-card" style="max-width: 520px; margin: 0 auto; padding: 40px; box-shadow: var(--shadow-md);">
          <div class="section-badge" style="margin-bottom: 14px;">أكاديمية شركة شات • SHAT Academy LMS</div>
          <h2 style="color: var(--shat-navy); margin-bottom: 12px; font-weight: 800;">بوابة المتدربين المعتمدين</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px; line-height: 1.7;">
            يتطلب الوصول إلى قاعاتك ومساقاتك التدريبية في شركة شات للتنمية والتطوير تسجيل الدخول بحساب متدرب مفعل في النظام.
          </p>
          <a href="#/login" class="btn-clean btn-primary btn-lg" style="width: 100%;">تسجيل الدخول إلى الأكاديمية</a>
          <div style="margin-top: 16px;">
            <a href="#/academy" style="font-size: 0.88rem; color: var(--shat-green); font-weight: 600;">تصفح دليل المساقات العامة ←</a>
          </div>
        </div>
      </div>
    `;
  }

  const studentName = user.fullNameAr || user.username;

  return `
    <div class="view-student-dashboard" style="padding-bottom: 100px;">
      
      <!-- Top Overview Greeting Banner -->
      <section class="student-header-section" style="background: linear-gradient(135deg, var(--shat-navy-deep) 0%, var(--shat-navy) 100%); color: #FFFFFF; padding: 48px 0 36px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(75, 136, 52, 0.25); color: #86EFAC; border: 1px solid rgba(75, 136, 52, 0.4);">
                  بوابة المتدرب المعتمد • Student Portal
                </span>
                <span style="font-size: 0.8rem; color: #94A3B8;">• جلسة موثقة</span>
              </div>
              <h1 style="font-size: 1.95rem; font-weight: 900; margin-bottom: 6px; color: #FFFFFF;">
                مرحباً بك، ${studentName} 👋
              </h1>
              <p style="font-size: 0.92rem; color: #CBD5E1; margin: 0;">
                الرقم التدريبي: <strong style="font-family: var(--font-mono); color: #86EFAC;">${user.maskedNationalId || 'SHAT-TR-2026'}</strong> • ${user.email}
              </p>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="#/course/shat-chs-master" class="btn-clean btn-green btn-sm">
                <span>📚 قاعة المحاضرات الحالية</span>
              </a>
              <button id="btn-student-logout" class="btn-clean btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.3);">
                <span>تسجيل الخروج</span>
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
                  ▶ تابع من حيث توقفت • Continue Learning
                </span>
                <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--shat-navy); margin: 6px 0;">
                  دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات
                </h2>
                <div style="font-size: 0.92rem; color: var(--text-secondary); font-weight: 600;">
                  الفصل الثاني: آليات المساءلة المجتمعية (AAP) وقنوات الشكاوى الحساسة • الدرس الرابع
                </div>
              </div>

              <div style="text-align: end; min-width: 130px;">
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">نسبة إنجاز المساق</div>
                <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); line-height: 1;">72%</div>
              </div>
            </div>

            <!-- Visual Progress Bar -->
            <div style="width: 100%; height: 10px; background: rgba(15, 46, 74, 0.08); border-radius: 99px; overflow: hidden; margin-bottom: 20px;">
              <div style="width: 72%; height: 100%; background: linear-gradient(90deg, var(--shat-green) 0%, var(--shat-green-light-accent) 100%); border-radius: 99px; transition: width 0.8s ease;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div style="font-size: 0.88rem; color: var(--text-muted);">
                المحاضر: <strong>د. خالد المنصوري</strong> • 40 ساعة تدريبية معتمدة دولياً
              </div>
              <a href="#/course/shat-chs-master" class="btn-clean btn-primary btn-md" style="font-weight: 700;">
                <span>متابعة التعلم والدخول للدرس الرابع</span>
                <span>←</span>
              </a>
            </div>
          </div>

          <!-- 3-Column Metrics Grid -->
          <div class="bento-grid grid-3" style="margin-bottom: 36px;">
            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-navy);">
              <span class="bento-kicker">المساقات النشطة</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">3 مساقات</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">CHS Master, SPHERE Core, PSEA Safeguarding</p>
            </div>

            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-amber);">
              <span class="bento-kicker">التكليفات والواجبات</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: #D97706; margin: 6px 0;">2 معلق</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">بانتظار تسليمك للحلول الميدانية</p>
            </div>

            <div class="bento-card" style="padding: 24px; border-top: 4px solid var(--shat-green);">
              <span class="bento-kicker">التقييم العام والمعدل</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); margin: 6px 0;">94 / 100</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">تقدير: امتياز مع مرتبة الشرف الأكاديمية</p>
            </div>
          </div>

          <!-- Section: Assignments & Tasks (Mobile-First Cards) -->
          <div class="bento-card" style="margin-bottom: 36px; padding: 28px;">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 16px; margin-bottom: 24px;">
              <div>
                <span class="bento-kicker">المهام الأكاديمية والتطبيقية</span>
                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy); margin: 4px 0;">
                  الواجبات والتكليفات الميدانية (Assignments)
                </h3>
              </div>
              <span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 700;">2 واجبات بانتظار التسليم</span>
            </div>

            <div class="assignments-list-wrapper" style="display: flex; flex-direction: column; gap: 16px;">
              
              <!-- Assignment Card 1: Graded -->
              <div class="assignment-item-card" style="background: var(--bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.78rem;">✓ تم التصحيح والاعتماد</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">الموعد: 15 سبتمبر 2026</span>
                  </div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 6px 0;">
                    التكليف #1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية
                  </h4>
                  <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; background: #FFFFFF; padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); margin-top: 8px;">
                    💬 <strong>ملاحظات المدرب:</strong> "عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت."
                  </div>
                </div>

                <div style="text-align: end; min-width: 140px;">
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 2px;">الدرجة المستحقة</div>
                  <div style="font-size: 1.8rem; font-weight: 900; color: var(--shat-green); font-family: var(--font-mono); margin-bottom: 8px;">
                    94 / 100
                  </div>
                  <a href="/api/files/download/sub-01-file" class="btn-clean btn-secondary btn-sm" download="حل_التكليف_الميداني_1.pdf">
                    <span>معاينة التسليم 📄</span>
                  </a>
                </div>
              </div>

              <!-- Assignment Card 2: Due Oct 4 (Pending) -->
              <div class="assignment-item-card" style="background: #FFFFFF; border-radius: var(--radius-sm); border: 2px solid #FCD34D; padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.78rem;">⏳ بانتظار التسليم • Due: Oct 4</span>
                    <span style="font-size: 0.8rem; color: #B45309; font-weight: 600;">متبقي 4 أيام</span>
                  </div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 6px 0;">
                    التكليف #2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة في الميدان
                  </h4>
                  <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
                    تطبيق أدوات التقييم الذاتي للامتثال المؤسسي على سيناريو استجابة طوارئ افتراضي واستخراج فجوات المساءلة.
                  </p>
                </div>

                <div style="text-align: end; min-width: 140px;">
                  <button class="btn-clean btn-primary btn-md btn-open-submit-modal" data-assign="assign-02" data-title="التكليف #2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة">
                    <span>تسليم التكليف الآن</span>
                    <span>📤</span>
                  </button>
                </div>
              </div>

              <!-- Assignment Card 3: Upcoming -->
              <div class="assignment-item-card" style="background: var(--bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="flex: 1; min-width: 260px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span class="badge" style="background: #F1F5F9; color: #475569; font-weight: 700; font-size: 0.78rem;">قادم • Due: Oct 18</span>
                  </div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 6px 0;">
                    التكليف #3: إعداد سياسة الحماية من الاستغلال والاعتداء الجنسيين (PSEA)
                  </h4>
                  <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
                    صياغة بروتوكول إبلاغ آمن وحماية المبلغين وفق المعايير الدولية للإجراءات التشغيلية الموحدة.
                  </p>
                </div>

                <div style="text-align: end; min-width: 140px;">
                  <button class="btn-clean btn-secondary btn-sm" disabled style="opacity: 0.6; cursor: not-allowed;">
                    <span>يفتح بعد الدرس السادس 🔒</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Section: Secure Google Drive Materials -->
          <div class="bento-card" style="border-top: 4px solid var(--shat-green); padding: 28px;">
            <div class="bento-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px;">
              <div>
                <span class="bento-kicker">المستودع السحابي للمساق</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin: 4px 0;">
                  الحقائب التدريبية والمراجع المعتمدة (تنزيل سحابي مباشر وآمن)
                </h3>
              </div>
              <span style="font-size: 0.82rem; color: var(--text-muted);">تحميل عبر Proxy الأكاديمية الرسمي</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
              <!-- Doc 1 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">📄 دليل_المعيار_الإنساني_الأساسي_CHS.pdf</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 4.8 MB • وثيقة معتمدة باللغة العربية</div>
                </div>
                <a href="/api/files/download/file-chs-01" class="btn-clean btn-green btn-sm" download="دليل_المعيار_الإنساني_الأساسي_CHS.pdf">
                  <span>تحميل</span>
                  <span>📥</span>
                </a>
              </div>

              <!-- Doc 2 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">📊 حقيبة_أدوات_المساءلة_المجتمعية_AAP.pptx</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 12.3 MB • عرض تقديمي للمحاضرات</div>
                </div>
                <a href="/api/files/download/file-chs-02" class="btn-clean btn-green btn-sm" download="حقيبة_أدوات_المساءلة_المجتمعية_AAP.pptx">
                  <span>تحميل</span>
                  <span>📥</span>
                </a>
              </div>

              <!-- Doc 3 -->
              <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy); margin-bottom: 4px;">📑 مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">حجم: 1.2 MB • جداول إلكترونية للتدقيق</div>
                </div>
                <a href="/api/files/download/file-chs-03" class="btn-clean btn-green btn-sm" download="مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx">
                  <span>تحميل</span>
                  <span>📥</span>
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
  const logoutBtn = document.getElementById('btn-student-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await api.logout();
      showToast('تم تسجيل الخروج بنجاح. نلقاك قريباً في شركة شات!', 'info');
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

      const assignTitle = btn.getAttribute('data-title') || 'مصفوفة التدقيق والامتثال لمعايير CHS التسعة';
      const assignId = btn.getAttribute('data-assign') || 'assign-02';

      if (title) title.textContent = 'تسليم التكليف الميداني للأكاديمية';

      body.innerHTML = `
        <form id="student-assignment-submit-form">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); margin-bottom: 16px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green);">المساق التدريبي:</div>
            <div style="font-weight: 800; color: var(--shat-navy);">دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات</div>
            <div style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 4px;">${assignTitle}</div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الملف الميداني المطلوب تسليمه (PDF, DOCX, XLSX) *</label>
            <input type="file" id="submit-file-input" class="form-input" accept=".pdf,.docx,.xlsx" required style="padding: 10px;" />
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">الحد الأقصى للملف: 15 ميجابايت • يتم حفظه في مستودع المنصة الآمن</div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">ملاحظات وتوضيحات للمدرب</label>
            <textarea id="submit-notes-input" class="form-textarea" rows="3" placeholder="أدخل أي ملاحظات ترغب بإيصالها للمحاضر حول منهجية الحل الميداني..."></textarea>
          </div>

          <button type="submit" id="btn-confirm-submission" class="btn-clean btn-primary btn-lg" style="width: 100%;">
            <span>تأكيد ورفع التسليم للمدرب الأكاديمي</span>
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
            showToast('الرجاء اختيار ملف للتسليم.', 'warning');
            return;
          }

          const btnConfirm = document.getElementById('btn-confirm-submission');
          if (btnConfirm) {
            btnConfirm.disabled = true;
            btnConfirm.innerHTML = `<span>جاري رفع وتوثيق التسليم...</span>`;
          }

          try {
            await api.submitAssignment(assignId, file.name, notes);
            showToast('تم استلام ملف التكليف بنجاح وإرساله للمدرب لرصد التقييم والدرجات!', 'success');
            modal.classList.remove('open');
            setTimeout(() => {
              window.location.reload();
            }, 800);
          } catch (e) {
            showToast('تعذر إتمام التسليم: ' + e.message, 'error');
            if (btnConfirm) {
              btnConfirm.disabled = false;
              btnConfirm.innerHTML = `<span>تأكيد ورفع التسليم للمدرب الأكاديمي</span><span>📤</span>`;
            }
          }
        });
      }
    });
  });
}
