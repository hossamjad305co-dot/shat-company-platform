import { icons } from '../icons.js';
// assets/js/views/contactView.js
// Contact & Consultation Request View with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderContactView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const c = d.company;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    badge: txt('تواصل مؤسسي مباشر', 'Direct Institutional Contact', 'Contact Institutionnel Direct'),
    title: d.contact?.title || txt('طلب استشارة أو استفسار تدريبي', 'Consultation or Training Inquiry', 'Demande de Conseil ou Formation'),
    desc: d.contact?.subtitle || txt(
      'يسعدنا التعاون معكم لبناء القدرات، تطوير الأنظمة، أو قيادة مهمات التقييم المستقل.',
      'We welcome partnerships to build capacity, upgrade systems, or lead independent evaluations.',
      'Nous sommes à votre disposition pour renforcer les compétences, moderniser les systèmes ou mener des évaluations indépendantes.'
    ),
    formTitle: d.contact?.formTitle || txt('نموذج طلب استشارة مؤسسية', 'Institutional Consultation Request', 'Formulaire de Demande de Conseil'),
    formSubtitle: d.contact?.formSubtitle || txt(
      'يرجى تزويدنا بتفاصيل الاحتياج أو المشروع لنقوم بالرد عليكم خلال 24 ساعة بمقترح فني مخصص.',
      'Please provide your project or capacity requirements; our advisory team will respond within 24 hours.',
      'Veuillez préciser vos besoins; notre équipe vous répondra sous 24 heures avec une proposition adaptée.'
    ),
    nameLabel: d.contact?.nameLabel || txt('الاسم الكامل *', 'Full Name *', 'Nom et Prénom *'),
    namePlaceholder: d.contact?.namePlaceholder || txt('اسمك الكريم', 'Your full name', 'Votre nom complet'),
    orgLabel: d.contact?.orgLabel || txt('اسم المؤسسة أو المنظمة', 'Organization or Entity', 'Organisation ou Institution'),
    orgPlaceholder: d.contact?.orgPlaceholder || txt('اسم الجهة أو المنظمة', 'Name of entity or organization', 'Nom de votre entité ou ONG'),
    emailLabel: d.contact?.emailLabel || txt('البريد الإلكتروني المهني *', 'Professional Email *', 'Adresse E-mail Professionnelle *'),
    phoneLabel: d.contact?.phoneLabel || txt('رقم الهاتف / واتساب *', 'Phone / WhatsApp *', 'Téléphone / WhatsApp *'),
    serviceLabel: d.contact?.serviceLabel || txt('مجال التدخل المطلوب', 'Requested Service Domain', 'Domaine d’Intervention Souhaité'),
    services: [
      { id: 'consulting', label: txt('استشارات وتطوير مؤسسي', 'Institutional Advisory & Systems', 'Conseil & Développement Institutionnel') },
      { id: 'evaluation', label: txt('تقييم خارجي مستقل للمشاريع (OECD DAC)', 'Independent External Evaluation (OECD DAC)', 'Évaluation Externe Indépendante (OCDE CAD)') },
      { id: 'protection', label: txt('سياسات الحماية وصون السلامة (PSEA)', 'Safeguarding & PSEA Frameworks', 'Politiques de Sauvegarde & PSEA') },
      { id: 'training', label: txt('برامج تدريبية وتأهيل الكوادر', 'Training & Staff Capacity Programs', 'Formations & Renforcement des Équipes') },
      { id: 'other', label: txt('استفسار أو شراكة عامة', 'General Inquiry or Partnership', 'Demande Générale ou Partenariat') }
    ],
    messageLabel: d.contact?.messageLabel || txt('تفاصيل الاحتياج أو الرسالة *', 'Project Scope or Needs *', 'Détails du Besoin ou Projet *'),
    messagePlaceholder: d.contact?.messagePlaceholder || txt(
      'يرجى كتابة نبذة عن طبيعة التدخل المطلوب...',
      'Briefly describe your objectives, target participants, and timeline...',
      'Décrivez brièvement vos objectifs, le public cible et le calendrier souhaité...'
    ),
    submitBtn: d.contact?.submitBtn || txt('إرسال الطلب الآن', 'Submit Inquiry Now', 'Envoyer la Demande Maintenant'),
    channelsTitle: txt('قنوات الاتصال المباشرة', 'Direct Contact Channels', 'Canaux de Contact Directs'),
    emailOfficial: txt('البريد الإلكتروني الرسمي:', 'Official Email:', 'Courriel Officiel :'),
    phoneWhatsapp: txt('الهاتف وواتساب:', 'Phone & WhatsApp:', 'Téléphone & WhatsApp :'),
    hqTitle: txt('المقر والنطاق:', 'Headquarters & Reach:', 'Siège & Rayonnement :'),
    confidentialityTitle: txt('سرية المعلومات وحماية البيانات', 'Data Confidentiality & Protection', 'Confidentialité des Données & Protection'),
    confidentialityText: txt(
      'تلتزم شركة شات بحفظ السرية التامة لكافة البيانات والمعلومات الاستشارية والمؤسسية وفق مبادئ الممارسة الأخلاقية وحماية البيانات.',
      'SHAT Development & Growth enforces strict confidentiality and non-disclosure standards across all client diagnostics, advisory scopes, and data.',
      'SHAT s’engage à préserver la stricte confidentialité de toutes les informations institutionnelles et données d’évaluation selon les normes éthiques les plus rigoureuses.'
    )
  };

  return `
    <div class="view-contact">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
            <p class="section-desc">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- Contact Form & Info -->
      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
            <!-- Form -->
            <div class="bento-card">
              <h3 style="font-size: 1.35rem; color: var(--shat-navy); margin-bottom: 8px;">${t.formTitle}</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">
                ${t.formSubtitle}
              </p>

              <form id="consultation-inquiry-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label">${t.nameLabel}</label>
                    <input type="text" id="contact-name" class="form-input" placeholder="${t.namePlaceholder}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">${t.orgLabel}</label>
                    <input type="text" id="contact-org" class="form-input" placeholder="${t.orgPlaceholder}">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label">${t.emailLabel}</label>
                    <input type="email" id="contact-email" class="form-input" placeholder="name@domain.com" required dir="ltr">
                  </div>
                  <div class="form-group">
                    <label class="form-label">${t.phoneLabel}</label>
                    <input type="tel" id="contact-phone" class="form-input" placeholder="+972..." required dir="ltr">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">${t.serviceLabel}</label>
                  <select id="contact-service" class="form-select">
                    ${t.services.map(s => `<option value="${s.id}">${s.label}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">${t.messageLabel}</label>
                  <textarea id="contact-message" class="form-textarea" rows="4" placeholder="${t.messagePlaceholder}" required></textarea>
                </div>

                <button type="submit" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center;">
                  <span>${t.submitBtn}</span>
                  <span>${arrow}</span>
                </button>
              </form>
            </div>

            <!-- Channels -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div class="bento-card">
                <h4 style="font-size: 1.15rem; color: var(--shat-navy); margin-bottom: 12px;">${t.channelsTitle}</h4>
                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.95rem;">
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">${t.emailOfficial}</div>
                    <a href="mailto:${c.email}" style="color: var(--shat-navy); font-weight: 700;">${c.email}</a>
                  </div>
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">${t.phoneWhatsapp}</div>
                    <a href="https://wa.me/972592879621" target="_blank" rel="noopener" style="color: var(--shat-green); font-weight: 700;" dir="ltr">${c.phone}</a>
                  </div>
                  <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">${t.hqTitle}</div>
                    <div style="color: var(--text-secondary);">${c.address}</div>
                  </div>
                </div>
              </div>

              <div class="bento-card" style="background: var(--shat-navy-deep); color: #FFFFFF;">
                <h4 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 8px;">${t.confidentialityTitle}</h4>
                <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.7; margin: 0;">
                  ${t.confidentialityText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
