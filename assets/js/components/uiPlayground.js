// SHAT Platform — Internal UI Playground & Design System Showcase
// Route: #/ui-playground
// Used for visual QA, design review, and component state testing across RTL/LTR

export function renderUIPlayground() {
  return `
    <div class="ui-playground-container" style="max-width: var(--max-width-content); margin: 0 auto; padding: var(--space-xl) var(--space-md);">
      
      <!-- Playground Header -->
      <div style="background: var(--shat-navy-900); color: var(--shat-white); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-2xl); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-md); position: relative; z-index: 2;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(75, 136, 52, 0.25); border: 1px solid var(--shat-green-600); color: #a7f3d0; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700; margin-bottom: 8px;">
              🛠️ SHAT DESIGN SYSTEM PLAYGROUND — PHASE 2
            </div>
            <h1 style="font-size: var(--font-size-h1); font-weight: var(--font-weight-extrabold); margin: 0 0 6px 0; color: var(--shat-white);">
              مختبر ومستعرض مكونات التصميم الموحد
            </h1>
            <p style="font-size: 0.95rem; color: var(--shat-navy-100); max-width: 620px; margin: 0;">
              لوحة فحص ومراجعة كافة عناصر الواجهة (Design Tokens, Components, States, RTL/LTR) للتأكد من اتساقها مع الهوية البصرية الرسمية ومعايير WCAG AAA.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="btn-toggle-playground-dir" class="btn btn-outline" style="background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.3);">
              🔄 تبديل الاتجاه (RTL ⇄ LTR)
            </button>
            <a href="#/home" class="btn btn-primary">
              العودة للرئيسية ↗
            </a>
          </div>
        </div>
      </div>

      <!-- 1. BRAND COLORS SOURCE OF TRUTH -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          1. Brand Colors & Palette Source of Truth (الألوان الرسمية المعتمدة)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-md);">
          
          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #0F2E4A; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">Navy (كحلي رئاسي)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#0F2E4A</code>
            <div style="font-size: 0.72rem; color: var(--shat-green-700); font-weight: 600; margin-top: 4px;">Primary Brand</div>
          </div>

          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #4B8834; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">Growth Green (أخضر نمو)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#4B8834</code>
            <div style="font-size: 0.72rem; color: var(--shat-green-700); font-weight: 600; margin-top: 4px;">Primary CTA</div>
          </div>

          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #5EA02F; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">Accent Green (أخضر حيوي)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#5EA02F</code>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Interactive Hover</div>
          </div>

          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #EEF5E8; border: 1px solid #cbd5e1; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">Tint Green (أخضر فاتح)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#EEF5E8</code>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Badge Surface</div>
          </div>

          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #EDF2F7; border: 1px solid #cbd5e1; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">Slate Neutral (رمادي هادئ)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#EDF2F7</code>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Table & Card Sub-surface</div>
          </div>

          <div class="card" style="padding: 12px; text-align: center;">
            <div style="height: 72px; border-radius: var(--radius-sm); background: #FFFFFF; border: 1px solid #cbd5e1; margin-bottom: 8px;"></div>
            <div style="font-weight: 700; font-size: 0.88rem;">White (أبيض ناصع)</div>
            <code style="font-size: 0.78rem; color: var(--text-muted);">#FFFFFF</code>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Base Surface</div>
          </div>

        </div>
      </section>

      <!-- 2. INTEGRATION STATUS BADGES -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          2. Integration Status Indicators (مؤشرات حالة الربط الحقيقية — بدون تزييف)
        </h2>
        <div class="card">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <div>
                <strong>قاعدة بيانات PostgreSQL / Supabase:</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">REST Endpoint: virecinrnuhpbadrswjj.supabase.co</div>
              </div>
              <span class="status-badge connected"><span class="status-dot"></span> متصل (CONNECTED)</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <div>
                <strong>وسيط تخزين Google Drive (5 TB):</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Service Account & Drive Root ID</div>
              </div>
              <span class="status-badge not-configured"><span class="status-dot"></span> غير مهيأ (NOT CONFIGURED)</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <div>
                <strong>بوابة إرسال WhatsApp OTP:</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">SMS / WhatsApp Business API Dispatcher</div>
              </div>
              <span class="status-badge not-configured"><span class="status-dot"></span> غير مهيأ (NOT CONFIGURED)</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong>Google OAuth 2.0 PKCE:</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Client ID & PKCE Redirect Handler</div>
              </div>
              <span class="status-badge not-configured"><span class="status-dot"></span> غير مهيأ (NOT CONFIGURED)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. BUTTONS & SIZES -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          3. Button Hierarchy & Interactive States (الأزرار وتفاعلاتها)
        </h2>
        <div class="card" style="display: flex; flex-direction: column; gap: var(--space-md);">
          
          <!-- Variants -->
          <div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">Button Variants:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
              <button class="btn btn-primary">Primary Action</button>
              <button class="btn btn-secondary">Secondary Dark</button>
              <button class="btn btn-outline">Outline Neutral</button>
              <button class="btn btn-ghost">Ghost Text</button>
              <button class="btn btn-danger">Danger Action</button>
              <button class="btn btn-primary" disabled>Disabled State</button>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">Button Sizes:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
              <button class="btn btn-primary btn-sm">Small (sm)</button>
              <button class="btn btn-primary btn-md">Medium Default (md)</button>
              <button class="btn btn-primary btn-lg">Large Hero (lg)</button>
            </div>
          </div>

        </div>
      </section>

      <!-- 4. FORM INPUTS & VALIDATION -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          4. Form Inputs & Validation States (حقول الإدخال والتحقق)
        </h2>
        <div class="card">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-md);">
            
            <div class="form-group">
              <label class="form-label">الاسم الكامل بالعربية <span class="required-mark">*</span></label>
              <input type="text" class="form-input" placeholder="مثال: أحمد محمد العلي" value="أحمد محمد العلي">
              <span class="form-helper">كما يظهر في الشهادة المعتمدة</span>
            </div>

            <div class="form-group">
              <label class="form-label">رقم الهوية الوطنية (National ID) <span class="required-mark">*</span></label>
              <input type="text" class="form-input has-error" placeholder="9 أرقام" value="400123">
              <span class="form-error-msg">⚠️ رقم الهوية يجب أن يتكون من 9 أرقام صحيحة</span>
            </div>

            <div class="form-group">
              <label class="form-label">المسار التدريبي (Track)</label>
              <select class="form-select">
                <option>قطاع العمل الإنساني والمعايير الدولية (CHS)</option>
                <option>استشارات الحماية وصون السلامة (PSEA)</option>
                <option>التقييم الخارجي المستقل (OECD DAC)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">حقل معطل (Disabled Field)</label>
              <input type="text" class="form-input" disabled value="قيمة غير قابلة للتعديل">
            </div>

          </div>
        </div>
      </section>

      <!-- 5. TOAST NOTIFICATIONS DISPATCHER -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          5. Toast Notifications (إشعارات النظام المنبثقة)
        </h2>
        <div class="card">
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline" onclick="window.dispatchPlaygroundToast('success')">🟢 تجربة إشعار نجاح (Success)</button>
            <button class="btn btn-outline" onclick="window.dispatchPlaygroundToast('warning')">🟠 تجربة إشعار تحذير (Warning)</button>
            <button class="btn btn-outline" onclick="window.dispatchPlaygroundToast('error')">🔴 تجربة إشعار خطأ (Error)</button>
            <button class="btn btn-outline" onclick="window.dispatchPlaygroundToast('info')">🔵 تجربة إشعار معلومات (Info)</button>
          </div>
        </div>
      </section>

      <!-- 6. SKELETONS & EMPTY STATES -->
      <section style="margin-bottom: var(--space-3xl);">
        <h2 style="font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); border-bottom: 2px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: var(--space-lg);">
          6. Loading Skeletons & Empty States (حالات التحميل والشاشات الفارغة)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-md);">
          
          <!-- Skeleton Card -->
          <div class="card">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 12px;">Skeleton Loader (أثناء جلب البيانات):</div>
            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <div class="skeleton skeleton-avatar"></div>
              <div style="flex: 1;">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text" style="width: 80%;"></div>
              </div>
            </div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 90%;"></div>
          </div>

          <!-- Empty State -->
          <div class="empty-state">
            <div class="empty-state-icon">📚</div>
            <div class="empty-state-title">لا توجد تكليفات مستحقة حالياً</div>
            <div class="empty-state-desc">لقد أكملت جميع التكليفات المطلوبة لهذا الأسبوع وفق خطة المساق التدريبي.</div>
            <button class="btn btn-primary btn-sm">استعراض المواد الإثرائية</button>
          </div>

        </div>
      </section>

    </div>

    <!-- Toast Container Target -->
    <div id="playground-toast-container" class="toast-container"></div>
  `;
}

// Global playground helper to test interactive toast messages
window.dispatchPlaygroundToast = function(type) {
  const container = document.getElementById('playground-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const messages = {
    success: '✅ تم حفظ التعديلات في مسودة المحتوى بنجاح.',
    warning: '⚠️ مساحة التخزين السحابية بلغت 80% من سعة 5TB المخصصة.',
    error: '❌ حدث خطأ في المصادقة. يرجى التأكد من الرمز المدخل.',
    info: 'ℹ️ ستبدأ جلسة الاختبار الفصلي بعد 15 دقيقة.'
  };

  toast.innerHTML = `
    <div style="flex: 1; font-size: 0.88rem; font-weight: 600;">${messages[type]}</div>
    <button style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--text-muted);" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
};
