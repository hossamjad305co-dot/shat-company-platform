// assets/js/views/formsView.js
// Production Native Internal SHAT Form View (Cloned / Imported from Google Forms)
import { api } from '../services/api/apiClient.js';

export function renderFormsView(lang = 'ar') {
  return `
    <div class="forms-wrapper" style="padding-top: 100px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container" style="max-width: 800px;">
        
        <!-- Breadcrumb & Top Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-muted);">
            <a href="#/home" style="color: var(--shat-navy); text-decoration: none; font-weight: 700;">الرئيسية</a>
            <span>/</span>
            <span>نماذج واستمارات شركة شات الرسمية (SHAT Forms)</span>
          </div>

          <a href="#/academy" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy);">
            <span>← العودة للأكاديمية</span>
          </a>
        </div>

        <div id="forms-render-target">
          <div style="padding: 60px; text-align: center; color: var(--text-muted);">
            جاري تحميل نموذج الاستمارة المعتمد...
          </div>
        </div>

      </div>
    </div>
  `;
}

export async function bindFormsEvents() {
  const container = document.getElementById('forms-render-target');
  if (!container) return;

  // Extract formId from hash: e.g. #/forms/form-reg-2026 or default to active form
  const rawHash = window.location.hash.replace('#/', '').replace('#', '');
  const parts = rawHash.split('/');
  const formId = parts[1] || 'form-reg-2026';

  try {
    const res = await api.getFormById(formId);
    if (!res.success || !res.form) {
      container.innerHTML = `
        <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">📋</div>
          <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">النموذج غير متاح</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">النموذج المطلوب غير موجود أو قد تم تعطيله من قبل الإدارة.</p>
          <a href="#/home" class="btn-clean btn-primary">العودة للرئيسية</a>
        </div>
      `;
      return;
    }

    const f = res.form;

    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
        
        <!-- Form Header with Institutional Branding -->
        <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #0F2A4A 100%); padding: 32px 36px; color: #FFFFFF; border-bottom: 4px solid var(--shat-green);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 32px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
              <span style="font-size: 0.85rem; font-weight: 700; color: #4ADE80;">استمارة إلكترونية رسمية معتمدة</span>
            </div>
            <span class="badge" style="background: rgba(255,255,255,0.15); color: #FFFFFF; font-size: 0.78rem;">SHAT Native Form Engine</span>
          </div>

          <h1 style="font-size: 1.55rem; font-weight: 900; color: #FFFFFF; margin-bottom: 10px;">${f.title}</h1>
          <p style="color: #CBD5E1; font-size: 0.92rem; line-height: 1.7; margin: 0;">
            ${f.description}
          </p>
        </div>

        <!-- Form Notice / Submission Engine Guarantee -->
        <div style="background: #F0FDF4; padding: 14px 36px; border-bottom: 1px solid #DCFCE7; display: flex; align-items: center; gap: 10px; font-size: 0.84rem; color: #166534;">
          <span>🔒</span>
          <span>يتم إرسال كافة البيانات وتشفيرها مباشرة إلى الخادم وقاعدة البيانات المركزية لشركة شات.</span>
        </div>

        <!-- Dynamic Form Fields -->
        <form id="native-shat-form" style="padding: 36px;">
          <input type="hidden" id="native-form-id" value="${f.id}">

          <div style="display: flex; flex-direction: column; gap: 24px;">
            ${(f.fields || []).map(field => {
              if (field.type === 'select') {
                return `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 8px;">
                      ${field.label} ${field.required ? '<span style="color: var(--accent-red);">*</span>' : ''}
                    </label>
                    <select id="${field.id}" class="form-input" style="height: 48px; font-size: 0.95rem;" ${field.required ? 'required' : ''}>
                      <option value="">-- اختر من القائمة المعتمدة --</option>
                      ${(field.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                  </div>
                `;
              } else if (field.type === 'textarea') {
                return `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 8px;">
                      ${field.label} ${field.required ? '<span style="color: var(--accent-red);">*</span>' : ''}
                    </label>
                    <textarea id="${field.id}" class="form-input" style="min-height: 120px; font-size: 0.95rem;" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>
                  </div>
                `;
              } else {
                return `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 8px;">
                      ${field.label} ${field.required ? '<span style="color: var(--accent-red);">*</span>' : ''}
                    </label>
                    <input type="${field.type || 'text'}" id="${field.id}" class="form-input" style="height: 48px; font-size: 0.95rem;" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>
                  </div>
                `;
              }
            }).join('')}
          </div>

          <div style="border-top: 1px solid var(--border-light); margin-top: 32px; padding-top: 24px; display: flex; justify-content: flex-end; gap: 14px; align-items: center;">
            <button type="reset" class="btn-clean" style="background: #F1F5F9; color: var(--text-muted); border: 1px solid var(--border-light);">
              إعادة تعيين الحقول
            </button>
            <button type="submit" id="btn-submit-native-form" class="btn-clean btn-green btn-lg" style="padding: 12px 32px; font-weight: 800;">
              <span>تأكيد وإرسال الاستمارة</span>
              <span>✓</span>
            </button>
          </div>
        </form>

      </div>
    `;

    // Bind form submission event
    const formEl = document.getElementById('native-shat-form');
    const submitBtn = document.getElementById('btn-submit-native-form');

    if (formEl) {
      formEl.onsubmit = async (e) => {
        e.preventDefault();

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>جاري الإرسال للخادم...</span>`;
        }

        const answers = {};
        (f.fields || []).forEach(field => {
          const el = document.getElementById(field.id);
          if (el) answers[field.id] = el.value;
        });

        try {
          const res = await api.submitForm(f.id, answers);
          if (res.success) {
            container.innerHTML = `
              <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm);">
                <div style="width: 64px; height: 64px; background: #DCFCE7; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px;">✓</div>
                <h2 style="font-weight: 900; color: var(--shat-navy); margin-bottom: 12px;">تم استلام وتوثيق استجابتكم بنجاح!</h2>
                <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.7; max-width: 500px; margin: 0 auto 24px;">
                  شكراً لكم. تم حفظ استجابتكم في قاعدة البيانات المركزية لشركة شات للتنمية والتطوير برقم مرجعي:
                  <strong style="color: var(--shat-navy);">${res.responseId}</strong>.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                  <a href="#/academy" class="btn-clean btn-primary">تصفح مساقات الأكاديمية</a>
                  <a href="#/home" class="btn-clean" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light);">العودة للرئيسية</a>
                </div>
              </div>
            `;
          }
        } catch (err) {
          alert('فشل في إرسال الاستمارة: ' + err.message);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>تأكيد وإرسال الاستمارة</span><span>✓</span>`;
          }
        }
      };
    }

  } catch (err) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
        <div style="font-size: 2.5rem; margin-bottom: 16px; color: var(--accent-red);">❌</div>
        <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">خطأ في الاتصال بالخادم</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${err.message}</p>
        <a href="#/home" class="btn-clean btn-primary">العودة للرئيسية</a>
      </div>
    `;
  }
}
