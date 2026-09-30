// assets/js/views/formsView.js
// Production Native Internal SHAT Form View (Cloned / Imported from Google Forms) with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';

export function renderFormsView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    home: txt('الرئيسية', 'Home', 'Accueil'),
    breadcrumb: txt('نماذج واستمارات شركة شات الرسمية (SHAT Forms)', 'Official Institutional Forms', 'Formulaires Officiels SHAT'),
    btnBack: txt('← العودة للأكاديمية', '← Back to Academy', '← Retour à l’Académie'),
    loading: txt('جاري تحميل نموذج الاستمارة المعتمد...', 'Loading form from server...', 'Chargement du formulaire en cours...')
  };

  return `
    <div class="forms-wrapper" style="padding-top: 100px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container" style="max-width: 800px;">
        
        <!-- Breadcrumb & Top Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-muted);">
            <a href="#/home" style="color: var(--shat-navy); text-decoration: none; font-weight: 700;">${t.home}</a>
            <span>/</span>
            <span>${t.breadcrumb}</span>
          </div>

          <a href="#/academy" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy);">
            <span>${t.btnBack}</span>
          </a>
        </div>

        <div id="forms-render-target">
          <div style="padding: 60px; text-align: center; color: var(--text-muted);">
            ${t.loading}
          </div>
        </div>

      </div>
    </div>
  `;
}

export async function bindFormsEvents() {
  const container = document.getElementById('forms-render-target');
  if (!container) return;

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

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
          <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
            ${txt('النموذج غير متاح', 'Form Not Found', 'Formulaire Non Disponible')}
          </h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">
            ${txt('النموذج المطلوب غير موجود أو قد تم تعطيله من قبل الإدارة.', 'The requested form does not exist or has been disabled.', 'Le formulaire demandé n’existe pas ou a été désactivé.')}
          </p>
          <a href="#/home" class="btn-clean btn-primary">${txt('العودة للرئيسية', 'Return to Home', 'Retour à l’Accueil')}</a>
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
              <span style="font-size: 0.85rem; font-weight: 700; color: #4ADE80;">
                ${txt('استمارة إلكترونية رسمية معتمدة', 'Official Accredited Form', 'Formulaire Électronique Officiel')}
              </span>
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
          <span>${txt(
            'يتم إرسال كافة البيانات وتشفيرها مباشرة إلى الخادم وقاعدة البيانات المركزية لشركة شات.',
            'All responses are transmitted securely and encrypted directly to the SHAT central database.',
            'Toutes les données sont chiffrées et transmises directement à la base de données sécurisée de SHAT.'
          )}</span>
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
                      <option value="">${txt('-- اختر من القائمة المعتمدة --', '-- Select from approved options --', '-- Choisir dans la liste --')}</option>
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

          <div style="border-top: 1px solid var(--border-light); margin-top: 32px; padding-top: 24px; display: flex; justify-content: flex-end; gap: 14px; align-items: center; flex-wrap: wrap;">
            <button type="reset" class="btn-clean" style="background: #F1F5F9; color: var(--text-muted); border: 1px solid var(--border-light);">
              ${txt('إعادة تعيين الحقول', 'Reset Fields', 'Réinitialiser')}
            </button>
            <button type="submit" id="btn-submit-native-form" class="btn-clean btn-green btn-lg" style="padding: 12px 32px; font-weight: 800;">
              <span>${txt('تأكيد وإرسال الاستمارة', 'Confirm & Submit Form', 'Confirmer et Envoyer')}</span>
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
          submitBtn.innerHTML = `<span>${txt('جاري الإرسال للخادم...', 'Submitting to server...', 'Envoi en cours...')}</span>`;
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
                <h2 style="font-weight: 900; color: var(--shat-navy); margin-bottom: 12px;">
                  ${txt('تم استلام وتوثيق استجابتكم بنجاح!', 'Response Submitted Successfully!', 'Réponse Enregistrée avec Succès !')}
                </h2>
                <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.7; max-width: 500px; margin: 0 auto 24px;">
                  ${txt(
                    `شكراً لكم. تم حفظ استجابتكم في قاعدة البيانات المركزية لشركة شات للتنمية والتطوير برقم مرجعي: <strong style="color: var(--shat-navy);">${res.responseId}</strong>.`,
                    `Thank you. Your response has been securely saved in the SHAT central database with reference ID: <strong style="color: var(--shat-navy);">${res.responseId}</strong>.`,
                    `Merci. Votre réponse a été enregistrée avec succès dans la base de données SHAT sous la référence : <strong style="color: var(--shat-navy);">${res.responseId}</strong>.`
                  )}
                </p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                  <a href="#/academy" class="btn-clean btn-primary">${txt('تصفح مساقات الأكاديمية', 'Explore Academy Tracks', 'Explorer les Cursus')}</a>
                  <a href="#/home" class="btn-clean" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light);">${txt('العودة للرئيسية', 'Return to Home', 'Retour à l’Accueil')}</a>
                </div>
              </div>
            `;
            showToast(txt('تم إرسال الاستمارة بنجاح!', 'Form submitted successfully!', 'Formulaire soumis avec succès !'), 'success');
          }
        } catch (err) {
          showToast(txt('فشل في إرسال الاستمارة: ', 'Failed to submit form: ', 'Échec de soumission : ') + err.message, 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>${txt('تأكيد وإرسال الاستمارة', 'Confirm & Submit Form', 'Confirmer et Envoyer')}</span><span>✓</span>`;
          }
        }
      };
    }

  } catch (err) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
        <div style="font-size: 2.5rem; margin-bottom: 16px; color: var(--accent-red);">❌</div>
        <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
          ${txt('خطأ في الاتصال بالخادم', 'Server Connection Error', 'Erreur de Connexion Serveur')}
        </h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${err.message}</p>
        <a href="#/home" class="btn-clean btn-primary">${txt('العودة للرئيسية', 'Return to Home', 'Retour à l’Accueil')}</a>
      </div>
    `;
  }
}
