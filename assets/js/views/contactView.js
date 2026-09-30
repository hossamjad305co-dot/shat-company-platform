// assets/js/views/contactView.js
// Contact & Consultation Request View
import { content } from '../content.js';

export function renderContactView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const c = d.company;

  return `
    <div class="view-contact">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">تواصل مؤسسي مباشر</div>
            <h1 class="section-title" style="margin-bottom: 12px;">طلب استشارة أو استفسار تدريبي</h1>
            <p class="section-desc">يسعدنا التعاون معكم لبناء القدرات، تطوير الأنظمة، أو قيادة مهمات التقييم المستقل.</p>
          </div>
        </div>
      </section>

      <!-- Contact Form & Info -->
      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
            <!-- Form -->
            <div class="bento-card">
              <h3 style="font-size: 1.35rem; color: var(--shat-navy); margin-bottom: 8px;">نموذج طلب استشارة مؤسسية</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">
                يرجى تزويدنا بتفاصيل الاحتياج أو المشروع لنقوم بالرد عليكم خلال 24 ساعة بمقترح فني مخصص.
              </p>

              <form id="consultation-inquiry-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label">الاسم الكامل *</label>
                    <input type="text" id="contact-name" class="form-input" placeholder="اسمك الكريم" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">اسم المؤسسة أو المنظمة</label>
                    <input type="text" id="contact-org" class="form-input" placeholder="اسم الجهة أو المنظمة">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label">البريد الإلكتروني *</label>
                    <input type="email" id="contact-email" class="form-input" placeholder="name@domain.com" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">رقم الهاتف / واتساب *</label>
                    <input type="tel" id="contact-phone" class="form-input" placeholder="+972..." required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">مجال التدخل المطلوب</label>
                  <select id="contact-service" class="form-select">
                    <option value="consulting">استشارات وتطوير مؤسسي</option>
                    <option value="evaluation">تقييم خارجي مستقل للمشاريع (OECD DAC)</option>
                    <option value="protection">سياسات الحماية وصون السلامة (PSEA)</option>
                    <option value="training">برامج تدريبية وتأهيل الكوادر</option>
                    <option value="other">استفسار أو شراكة عامة</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">تفاصيل الاحتياج أو الرسالة *</label>
                  <textarea id="contact-message" class="form-textarea" rows="4" placeholder="يرجى كتابة نبذة عن طبيعة التدخل المطلوب..." required></textarea>
                </div>

                <button type="submit" class="btn-clean btn-primary btn-lg" style="width: 100%;">
                  <span>إرسال الطلب الآن</span>
                  <span>←</span>
                </button>
              </form>
            </div>

            <!-- Channels -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div class="bento-card">
                <h4 style="font-size: 1.15rem; color: var(--shat-navy); margin-bottom: 12px;">قنوات الاتصال المباشرة</h4>
                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.95rem;">
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">البريد الإلكتروني الرسمي:</div>
                    <a href="mailto:${c.email}" style="color: var(--shat-navy); font-weight: 700;">${c.email}</a>
                  </div>
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">الهاتف وواتساب:</div>
                    <a href="https://wa.me/972592879621" target="_blank" rel="noopener" style="color: var(--shat-green); font-weight: 700;">${c.phone}</a>
                  </div>
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">المقر الرئيسي:</div>
                    <div style="color: var(--text-secondary);">${c.address}</div>
                  </div>
                </div>
              </div>

              <div class="bento-card" style="background: var(--shat-navy-deep); color: #FFFFFF;">
                <h4 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 8px;">سرية المعلومات</h4>
                <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.7; margin: 0;">
                  تلتزم شركة شات بحفظ السرية التامة لكافة البيانات والمعلومات الاستشارية والمؤسسية وفق مبادئ الممارسة الأخلاقية وحماية البيانات.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
