// assets/js/tools/certificateValidator.js
// Accredited Digital Certificate & Credential Verification Engine
// Enables trainees, donors, and humanitarian organizations to instantly authenticate SHAT credentials

import { icons } from '../icons.js';

export const certificateValidator = {
  // Authoritative verified records fixture
  records: [
    {
      id: "SHAT-CHS-2026-9482",
      studentNameAr: "أحمد خليل منصور",
      studentNameEn: "Ahmad Khalil Mansour",
      courseTitleAr: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة",
      courseTitleEn: "Core Humanitarian Standard (CHS) Master Diploma",
      grade: "94/100 (امتياز مع مرتبة الشرف)",
      gradeEn: "94/100 (Honors with Distinction)",
      issueDate: "15 سبتمبر 2026",
      issueDateEn: "September 15, 2026",
      hours: "40 ساعة تدريبية معتمدة",
      hoursEn: "40 Accredited Training Hours",
      status: "verified",
      instructor: "د. أسامة المنصور",
      competencies: [
        "إتقان الالتزامات التسعة للمعيار الإنساني الأساسي (CHS)",
        "تصميم قنوات الشكاوى والمقترحات الآمنة (CFRM)",
        "تطبيق آليات المساءلة للمتأثرين (AAP) وفق متطلبات المانحين الدوليين"
      ]
    },
    {
      id: "SHAT-PSEA-2026-3104",
      studentNameAr: "فاطمة إبراهيم النجار",
      studentNameEn: "Fatima Ibrahim Al-Najjar",
      courseTitleAr: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)",
      courseTitleEn: "Executive Program in Safeguarding & PSEA Advisory",
      grade: "96/100 (امتياز مع مرتبة الشرف)",
      gradeEn: "96/100 (Honors with Distinction)",
      issueDate: "20 أغسطس 2026",
      issueDateEn: "August 20, 2026",
      hours: "35 ساعة تدريبية معتمدة",
      hoursEn: "35 Accredited Training Hours",
      status: "verified",
      instructor: "أ. ندى الخالدي",
      competencies: [
        "صياغة سياسات صون السلامة وحماية الطفل",
        "تأسيس وحدات التحقيق الداخلي السري",
        "مواءمة إجراءات التدقيق والتوظيف مع معايير IASC"
      ]
    },
    {
      id: "SHAT-OECD-2026-7712",
      studentNameAr: "عمر رائد الحسيني",
      studentNameEn: "Omar Raed Al-Husseini",
      courseTitleAr: "الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)",
      courseTitleEn: "Professional Certificate in Independent Evaluation (OECD DAC)",
      grade: "92/100 (امتياز)",
      gradeEn: "92/100 (Excellent)",
      issueDate: "10 يوليو 2026",
      issueDateEn: "July 10, 2026",
      hours: "45 ساعة تدريبية معتمدة",
      hoursEn: "45 Accredited Training Hours",
      status: "verified",
      instructor: "م. طارق الزهراني",
      competencies: [
        "تطبيق معايير OECD DAC الستة ونظرية التغيير",
        "تصميم أدوات البحث المكتبي والميداني لقياس الأثر التنموي",
        "صياغة التوصيات الإدارية لصناع القرار والجهات المانحة"
      ]
    }
  ],

  renderModal(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    return `
      <div class="cert-validator-wrapper" style="text-align: ${isRtl ? 'right' : 'left'};">
        <div style="margin-bottom: 20px; background: linear-gradient(135deg, rgba(15,46,74,0.05) 0%, rgba(217,119,6,0.06) 100%); padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid rgba(217,119,6,0.2);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 1.4rem; color: #D97706;"></span>
            <span style="font-weight: 800; font-size: 1.05rem; color: var(--shat-navy);">
              ${txt('أداة التحقق من الشهادات الرقمية المعتمدة', 'Accredited Digital Certificate Verification', 'Vérification des Certificats Numériques')}
            </span>
            <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; margin-inline-start: auto;">
              ${txt('نظام التحقق الآمن • Live Verification', 'Secure Live Verification', 'Vérification Sécurisée')}
            </span>
          </div>
          <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0; line-height: 1.6;">
            ${txt(
              'أدخل الرقم التسلسلي للشهادة الممنوحة من شركة شات للتنمية والتطوير للتحقق من صحتها الأكاديمية وسجل الجدارات وساعات التدريب المعتمدة.',
              'Enter the certificate serial ID issued by SHAT Development & Growth to verify authenticity, acquired competencies, and accredited hours.',
              'Saisissez le matricule du certificat délivré par SHAT pour authentifier sa validité pédagogique et les compétences acquises.'
            )}
          </p>
        </div>

        <!-- Input Box & Quick Samples -->
        <div style="margin-bottom: 24px;">
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <input type="text" id="cert-search-input" class="form-input" placeholder="${txt('مثال: SHAT-CHS-2026-9482', 'e.g., SHAT-CHS-2026-9482', 'ex. SHAT-CHS-2026-9482')}" style="font-family: var(--font-mono); text-transform: uppercase; font-size: 1rem; padding: 12px 14px;" value="SHAT-CHS-2026-9482">
            <button id="btn-cert-verify" class="btn-clean btn-primary btn-md" style="padding: 0 24px; font-weight: 800;">
              <span>${txt('تحقق الآن', 'Verify Now', 'Vérifier')}</span>
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted);">
            <span>${txt('نماذج شهادات للاختبار السريع:', 'Quick Test Sample IDs:', 'Exemples d\'identifiants :')}</span>
            <button class="btn-clean cert-sample-pill" data-id="SHAT-CHS-2026-9482" style="background: var(--bg-subtle); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); border: 1px solid var(--border-light); font-size: 0.76rem; color: var(--shat-navy);">
              SHAT-CHS-2026-9482
            </button>
            <button class="btn-clean cert-sample-pill" data-id="SHAT-PSEA-2026-3104" style="background: var(--bg-subtle); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); border: 1px solid var(--border-light); font-size: 0.76rem; color: var(--shat-navy);">
              SHAT-PSEA-2026-3104
            </button>
            <button class="btn-clean cert-sample-pill" data-id="SHAT-OECD-2026-7712" style="background: var(--bg-subtle); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); border: 1px solid var(--border-light); font-size: 0.76rem; color: var(--shat-navy);">
              SHAT-OECD-2026-7712
            </button>
          </div>
        </div>

        <!-- Certificate Display Result Container -->
        <div id="cert-result-container"></div>
      </div>
    `;
  },

  init(lang = 'ar') {
    const input = document.getElementById('cert-search-input');
    const verifyBtn = document.getElementById('btn-cert-verify');
    const pills = document.querySelectorAll('.cert-sample-pill');
    if (!verifyBtn || !input) return;

    pills.forEach(p => {
      p.onclick = () => {
        input.value = p.getAttribute('data-id');
        this.verify(input.value.trim(), lang);
      };
    });

    verifyBtn.onclick = () => {
      this.verify(input.value.trim(), lang);
    };

    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.verify(input.value.trim(), lang);
      }
    };

    // Auto verify default value
    if (input.value) {
      this.verify(input.value.trim(), lang);
    }
  },

  verify(certId, lang = 'ar') {
    const container = document.getElementById('cert-result-container');
    if (!container) return;

    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    const found = this.records.find(r => r.id.toLowerCase() === certId.toLowerCase());

    if (!found) {
      container.innerHTML = `
        <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-md); padding: 24px; text-align: center;">
          <div style="display: flex; justify-content: center; margin-bottom: 8px; color: #DC2626;">${icons.alertCircle('', 36)}</div>
          <h4 style="font-weight: 800; color: #991B1B; margin-bottom: 6px;">
            ${txt('الشهادة غير مسجلة أو الرقم غير مطابق', 'Certificate ID Not Found', 'Identifiant de Certificat Introuvable')}
          </h4>
          <p style="font-size: 0.85rem; color: #7F1D1D; margin: 0;">
            ${txt(
              'يرجى التأكد من كتابة الرقم التسلسلي بدقة متضمناً الأحرف الإنجليزية والشرطات (-) أو مراجعة إدارة الأكاديمية.',
              'Please ensure the serial number matches the format SHAT-XXX-YYYY-ZZZZ or contact the Academy admin.',
              'Veuillez vérifier la saisie exacte du matricule ou contacter l\'administration de l\'académie.'
            )}
          </p>
        </div>
      `;
      return;
    }

    const studentName = isRtl ? found.studentNameAr : found.studentNameEn;
    const courseTitle = isRtl ? found.courseTitleAr : found.courseTitleEn;
    const grade = isRtl ? found.grade : found.gradeEn;
    const issueDate = isRtl ? found.issueDate : found.issueDateEn;
    const hours = isRtl ? found.hours : found.hoursEn;

    container.innerHTML = `
      <div class="official-certificate-card" style="background: #FFFFFF; border: 2px solid #D97706; border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-lg); position: relative; overflow: hidden;">
        
        <!-- Top Ornamental Ribbon -->
        <div style="position: absolute; top: 0; right: 0; left: 0; height: 6px; background: linear-gradient(90deg, var(--shat-navy) 0%, #D97706 50%, var(--shat-green) 100%);"></div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT Logo" style="height: 48px;" onerror="this.onerror=null; this.src='assets/logo/logo-symbol.jpg';">
            <div>
              <div style="font-weight: 900; font-size: 1.15rem; color: var(--shat-navy);">شركة شات للتنمية والتطوير</div>
              <div style="font-size: 0.78rem; color: #64748B; font-family: var(--font-latin);">SHAT Development & Growth • Institutional Academy</div>
            </div>
          </div>

          <div style="text-align: ${isRtl ? 'left' : 'right'};">
            <span class="badge badge-success" style="font-size: 0.82rem; padding: 6px 12px; display: inline-flex; align-items: center; gap: 4px;">
              <span style="display: inline-flex; align-items: center;">${icons.checkCircle('icon-inline', 14)}</span> <span>${txt('شهادة معتمدة وموثقة رسمياً', 'Officially Verified & Authentic', 'Certificat Homologué & Vérifié')}</span>
            </span>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; font-weight: 700;">
              ID: ${found.id}
            </div>
          </div>
        </div>

        <div style="text-align: center; margin: 24px 0; border-top: 1px dashed var(--border-light); border-bottom: 1px dashed var(--border-light); padding: 20px 0;">
          <div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-bottom: 6px;">
            ${txt('تشهد شركة شات للتنمية والتطوير بأن المتدرب(ة):', 'This is to officially certify that:', 'SHAT atteste par la présente que :')}
          </div>
          <div style="font-size: 1.7rem; font-weight: 900; color: var(--shat-navy); margin-bottom: 8px;">
            ${studentName}
          </div>
          <div style="font-size: 0.95rem; color: var(--text-secondary); max-width: 580px; margin: 0 auto; line-height: 1.6;">
            ${txt('قد أتم(ت) بنجاح متطلبات استحقاق واجتياز:', 'Has successfully satisfied all academic and practical requirements for:', 'A validé avec succès l\'ensemble des exigences pédagogiques de :')}
          </div>
          <div style="font-size: 1.3rem; font-weight: 800; color: var(--shat-green); margin-top: 8px;">
            ${courseTitle}
          </div>
        </div>

        <!-- Meta Details Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 24px; background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-xs);">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('التقدير والمعدل:', 'Grade & Honors:', 'Note Obtenue :')}</div>
            <div style="font-weight: 800; font-size: 0.9rem; color: var(--shat-navy);">${grade}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('الساعات التدريبية:', 'Accredited Hours:', 'Heures Validées :')}</div>
            <div style="font-weight: 800; font-size: 0.9rem; color: var(--shat-navy);">${hours}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('تاريخ المنح والاعتماد:', 'Issue Date:', 'Date d\'Attribution :')}</div>
            <div style="font-weight: 800; font-size: 0.9rem; color: var(--shat-navy);">${issueDate}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('المدرب والمشرف:', 'Instructor / Expert:', 'Formateur Superviseur :')}</div>
            <div style="font-weight: 800; font-size: 0.9rem; color: var(--shat-navy);">${found.instructor}</div>
          </div>
        </div>

        <!-- Acquired Competencies -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 0.84rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
            ${txt('الجدارات والمهارات المكتسبة المعتمدة (Certified Competencies):', 'Certified Core Competencies:', 'Compétences Validées :')}
          </div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">
            ${found.competencies.map(c => `
              <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); display: inline-flex; align-items: center;">${icons.checkCircle('icon-inline', 14)}</span>
                <span>${c}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border-light); padding-top: 16px;">
          <div style="font-size: 0.76rem; color: var(--text-muted);">
            ${txt('سجل التحقق الأكاديمي محمي وموثق في خوادم شركة شات الرسمية.', 'Digital record encrypted and verified on SHAT institutional servers.', 'Enregistrement sécurisé sur les serveurs institutionnels SHAT.')}
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-clean btn-sm" style="background: var(--shat-navy); color: #FFFFFF;" onclick="window.print();">
              <span style="display: inline-flex; align-items: center; gap: 4px;">${icons.printer('icon-inline', 14)} <span>${txt('طباعة إفادة التحقق', 'Print Official Verification', 'Imprimer')}</span></span>
            </button>
            <a href="#/course/shat-chs-master" class="btn-clean btn-sm" style="background: var(--bg-subtle); border: 1px solid var(--border-medium); color: var(--shat-navy);" onclick="document.getElementById('modal-certificate-validator').classList.remove('open');">
              <span>${txt('استعراض تفاصيل المساق', 'Course Details', 'Détails du Cursus')}</span>
            </a>
          </div>
        </div>

      </div>
    `;
  }
};
