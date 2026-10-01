// assets/js/views/toolkitsView.js
// Dedicated Digital Resource Center & Operational Humanitarian Toolkits Hub for SHAT Platform
// 100% Trilingual Support (AR, EN, FR) & WCAG AAA High Contrast Design
import { toolkitsLibrary } from '../tools/toolkitsLibrary.js';
import { api } from '../services/api/apiClient.js';

export function renderToolkitsView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    badge: txt('مركز المعرفة والأدلة الميدانية • Resource Hub', 'Field Knowledge & Toolkits Hub', 'Centre de Ressources & Outils'),
    title: txt('مكتبة النماذج التشغيلية والأدلة الإنسانية المعتمدة', 'Accredited Field Toolkits & Operational Templates', 'Boîte à Outils & Modèles Opérationnels Homologués'),
    desc: txt(
      'مستودع مؤسسي متكامل يحتوي على نماذج خطط المتابعة والتقييم (MEAL)، مصفوفات صون السلامة (PSEA)، إجراءات الشكاوى والمقترحات (CFRM)، واستمارات إدارة الحالة الجاهزة للتطبيق الفوري.',
      'Institutional repository hosting validated MEAL plans, PSEA risk matrices, CFRM operating procedures, and comprehensive Case Management frameworks.',
      'Référentiel institutionnel regroupant les plans MEAL, matrices de risques PSEA, procédures CFRM et outils de gestion de cas validés.'
    ),
    filterAll: txt('كافة النماذج والأدلة', 'All Toolkits', 'Tous les Outils'),
    filterMeal: txt('المتابعة والتقييم (MEAL)', 'MEAL & Impact', 'MEAL & Impact'),
    filterPsea: txt('الحماية وصون السلامة (PSEA)', 'Safeguarding (PSEA)', 'Sauvegarde (PSEA)'),
    filterAaP: txt('المساءلة والشكاوى (AAP/CFRM)', 'Accountability (AAP)', 'Redevabilité (AAP)'),
    filterCm: txt('إدارة الحالة (Case Management)', 'Case Management', 'Gestion de Cas'),
    filterGov: txt('الحوكمة والنظم (SOPs)', 'Governance & SOPs', 'Gouvernance (SOP)'),
    btnPreview: txt('معاينة وفحص النموذج', 'Inspect & Preview', 'Consulter le Modèle'),
    btnDownload: txt('تحميل مباشر (DOCX/XLSX)', 'Direct Download', 'Télécharger'),
    btnRequestCustom: txt('طلب تصميم أداة مخصصة لمؤسستكم', 'Request Tailored Toolkit Design', 'Demander un Outil Sur Mesure')
  };

  return `
    <div class="view-toolkits" style="padding-bottom: 80px;">
      <!-- Hero Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 860px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${t.title}</h1>
            <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${t.desc}</p>
          </div>

          <!-- Feature Highlights Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 32px;">
            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
              <span style="font-size: 1.5rem; font-weight: 900; color: #166534;">▲</span>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--shat-navy);">مصفوفات MEAL الذكية</div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">مؤشرات أداء وجداول جمع بيانات</div>
              </div>
            </div>

            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
              <span style="font-size: 1.5rem; font-weight: 900; color: #0F2E4A;">◈</span>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--shat-navy);">سياسات PSEA وصون السلامة</div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">مسارات إحالة وتدقيق مسبق معتمد</div>
              </div>
            </div>

            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
              <span style="font-size: 1.5rem; font-weight: 900; color: #D97706;">❖</span>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--shat-navy);">ملفات ونماذج إدارة الحالة</div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">استمارات تقييم وموافقة مستنيرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Toolkits Section -->
      <section class="section" style="padding-top: 40px;">
        <div class="container">
          ${toolkitsLibrary.renderSection(lang)}

          <!-- Custom Toolkit Consultation Banner -->
          <div style="background: linear-gradient(135deg, #0F2E4A 0%, #064E3B 100%); color: #FFFFFF; border-radius: 16px; padding: 40px; margin-top: 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; box-shadow: 0 10px 30px rgba(15,46,74,0.15);">
            <div style="max-width: 620px;">
              <span style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #A7F3D0; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 999px; display: inline-block; margin-bottom: 10px;">
                ★ ${txt('استشارات مؤسسية متقدمة', 'Custom Institutional Consulting', 'Conseil Institutionnel Personnalisé')}
              </span>
              <h3 style="font-size: 1.5rem; font-weight: 900; margin: 0 0 10px 0; color: #FFFFFF;">
                ${t.btnRequestCustom}
              </h3>
              <p style="font-size: 0.94rem; color: #E2E8F0; margin: 0; line-height: 1.7;">
                ${txt(
                  'يقوم فريق استشاريي شركة شات بإعداد ومواءمة الأدلة واللوائح التشغيلية (SOPs) ونظم الحوكمة بما يتوافق بدقة مع خصوصية سياق عمل مؤسستكم ومتطلبات المانحين الدوليين.',
                  'SHAT consulting team customizes standard operating procedures (SOPs), governance policies, and MEAL frameworks tailored to your organization’s operational reality.',
                  'Nos consultants adaptent vos manuels de procédures opérationnelles (SOP), politiques de gouvernance et cadres MEAL selon les exigences de vos bailleurs.'
                )}
              </p>
            </div>

            <div>
              <a href="#/contact" class="btn-clean" style="background: #10B981; color: #FFFFFF; font-weight: 800; padding: 14px 28px; border-radius: 10px; font-size: 1rem; box-shadow: 0 4px 14px rgba(16,185,129,0.3); display: inline-flex; align-items: center; gap: 8px;">
                <span>✉ ${txt('تواصل مع مستشار النظم والأدلة', 'Consult with a Systems Expert', 'Contacter un Consultant')}</span>
                <span>${arrow}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindToolkitsEvents() {
  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  toolkitsLibrary.bindEvents(currentLang);
}
