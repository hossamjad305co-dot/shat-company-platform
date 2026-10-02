// assets/js/views/verifyView.js
// Executive Digital Certificate Verification Engine for SHAT Development & Growth
// Provides Instant Cryptographic & Serial Code Verification with Official Seal & QR Simulation

import { icons } from '../icons.js';

export function renderVerifyView(lang = 'ar') {
  const isAr = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  return `
    <div class="view-verify" style="padding: 48px 0 80px; background: radial-gradient(circle at 50% 10%, rgba(30,126,52,0.05) 0%, #FFFFFF 80%);">
      <div class="container" style="max-width: 900px; margin: 0 auto;">

        <!-- Header Tag & Title -->
        <div style="text-align: center; margin-bottom: 36px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: #E8F5E9; border: 1px solid #C8E6C9; padding: 4px 16px; border-radius: 999px; margin-bottom: 14px;">
            <span style="font-size: 0.8rem; font-weight: 800; color: #1E7E34;">
              ${txt('بوابة التحقق الرقمي المعتمدة رسمياً', 'Officially Accredited Verification Portal', 'Portail de Vérification Officiel')}
            </span>
          </div>

          <h1 style="font-size: 2.1rem; font-weight: 900; color: var(--shat-navy, #0B1E36); margin: 0 0 12px; line-height: 1.3;">
            ${txt('التحقق من صحة وأصالة الشهادات الصادرة', 'Verify Certificate Authenticity & Credentials', 'Vérification de l’Authenticité des Certificats')}
          </h1>

          <p style="color: #64748B; font-size: 0.98rem; max-width: 680px; margin: 0 auto; line-height: 1.7;">
            ${txt(
              'تتيح هذه الخدمة للجهات المانحة والمؤسسات الشريكة وأرباب العمل التحقق اللحظي من صحة الشهادات والاعتمادات الصادرة عن شركة شات للتنمية والتطوير ومطابقتها للسجلات المعتمدة.',
              'This service allows partner organizations, donors, and employers to instantly verify certificates and credentials issued by SHAT Development & Growth.',
              'Ce service permet aux organisations partenaires et bailleurs de vérifier instantanément les certificats délivrés par SHAT.'
            )}
          </p>
        </div>

        <!-- Verification Search Card (Double-Bezel Architecture) -->
        <div style="
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 8px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(11,30,54,0.06);
          margin-bottom: 36px;
        ">
          <div style="
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            padding: 28px 24px;
            border-radius: 14px;
          ">
            <form id="form-verify-certificate" style="display: flex; gap: 12px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 260px;">
                <label for="input-certificate-id" style="display: block; font-size: 0.85rem; font-weight: 700; color: #0B1E36; margin-bottom: 8px;">
                  ${txt('الرقم التسلسلي للشهادة أو رمز التحقق (Serial / Verification ID):', 'Certificate Serial Number or Verification ID:', 'Numéro de Série du Certificat :')}
                </label>
                <input
                  type="text"
                  id="input-certificate-id"
                  placeholder="${txt('مثال: SHAT-CHS-2026-0891 أو SHAT-CM-2026-0142', 'e.g. SHAT-CHS-2026-0891 or SHAT-CM-2026-0142', 'ex : SHAT-CHS-2026-0891')}"
                  class="form-input"
                  style="
                    width: 100%;
                    height: 50px;
                    font-size: 1rem;
                    font-family: var(--font-mono, monospace);
                    font-weight: 700;
                    direction: ltr;
                    text-align: right;
                    padding: 0 16px;
                    border: 2px solid #CBD5E1;
                    border-radius: 10px;
                  "
                  required
                >
              </div>

              <div style="display: flex; align-items: flex-end;">
                <button type="submit" id="btn-verify-submit" class="btn-clean" style="
                  height: 50px;
                  padding: 0 32px;
                  background: var(--shat-green, #1E7E34);
                  color: #FFFFFF;
                  font-weight: 800;
                  font-size: 1rem;
                  border-radius: 10px;
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  box-shadow: 0 4px 12px rgba(30,126,52,0.25);
                ">
                  ${icons.search('icon-inline', 18)}
                  <span>${txt('فحص الشهادة', 'Verify Now', 'Vérifier')}</span>
                </button>
              </div>
            </form>

            <!-- Sample Demo Codes for Quick Testing -->
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #F1F5F9; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748B;">
                ${txt('نماذج شهادات للاختبار السريع:', 'Quick Demo Certificate IDs:', 'Exemples de Certificats :')}
              </span>
              <button type="button" class="btn-clean btn-sample-id" data-id="SHAT-CHS-2026-0891" style="font-size: 0.76rem; font-family: var(--font-mono, monospace); background: #F1F5F9; color: #0B1E36; padding: 3px 10px; border-radius: 6px; font-weight: 700;">
                SHAT-CHS-2026-0891 (دبلوم CHS)
              </button>
              <button type="button" class="btn-clean btn-sample-id" data-id="SHAT-CM-2026-0142" style="font-size: 0.76rem; font-family: var(--font-mono, monospace); background: #F1F5F9; color: #0B1E36; padding: 3px 10px; border-radius: 6px; font-weight: 700;">
                SHAT-CM-2026-0142 (مدير حالة)
              </button>
              <button type="button" class="btn-clean btn-sample-id" data-id="SHAT-PRES-2026-0520" style="font-size: 0.76rem; font-family: var(--font-mono, monospace); background: #F1F5F9; color: #0B1E36; padding: 3px 10px; border-radius: 6px; font-weight: 700;">
                SHAT-PRES-2026-0520 (مهارات العرض)
              </button>
            </div>
          </div>
        </div>

        <!-- Verification Result Container -->
        <div id="verify-result-container" style="display: none;">
          <!-- Dynamically populated -->
        </div>

      </div>
    </div>
  `;
}

// Verification Data Registry
const MOCK_CERTIFICATES = {
  'SHAT-CHS-2026-0891': {
    serial: 'SHAT-CHS-2026-0891',
    traineeNameAr: 'أحمد محمود خليل',
    traineeNameEn: 'Ahmed Mahmoud Khalil',
    nationalId: '902148901',
    programTitleAr: 'دبلوم المعيار الإنساني الأساسي للجودة والمساءلة (CHS Master Diploma)',
    programTitleEn: 'Core Humanitarian Standard on Quality and Accountability Master Diploma',
    hours: '60 ساعة تدريبية معتمدة',
    leadTrainer: 'أ. حسام جاد الله • خبير الامتثال والمساءلة الإنسانية',
    issueDate: '2026-08-15',
    grade: 'امتياز (94%)',
    status: 'معتمد وساري المفعول',
    accreditationBody: 'شركة شات للتنمية والتطوير بالتعاون مع المعايير الدولية للشراكة الإنسانية',
    verificationHash: 'SHA256:7a9f8b2c4e1d3a5e8f0b9c8d7e6f5a4b3c2d1e0f',
    securityStamp: 'OFFICIAL_ACCREDITED_SEAL'
  },
  'SHAT-CM-2026-0142': {
    serial: 'SHAT-CM-2026-0142',
    traineeNameAr: 'سارة عبد الله الناصر',
    traineeNameEn: 'Sara Abdullah Al-Nasser',
    nationalId: '908761234',
    programTitleAr: 'دورة إعداد وتأهيل مدير حالة في العمل الاجتماعي والإنساني',
    programTitleEn: 'Professional Case Manager Qualification Course',
    hours: '30 ساعة تدريبية وتطبيق ميداني',
    leadTrainer: 'د. محمد إسليم • خبير إدارة الحالة والرعاية المتكاملة',
    issueDate: '2026-09-02',
    grade: 'امتياز مرتفع (97%)',
    status: 'معتمد وساري المفعول',
    accreditationBody: 'أكاديمية شات للتدريب المهني وبناء القدرات المؤسسية',
    verificationHash: 'SHA256:2d4e6f8a0b1c3d5e7f9a8b0c2d4e6f8a0b1c3d5e',
    securityStamp: 'OFFICIAL_ACCREDITED_SEAL'
  },
  'SHAT-PRES-2026-0520': {
    serial: 'SHAT-PRES-2026-0520',
    traineeNameAr: 'مهند خالد الشريف',
    traineeNameEn: 'Mohannad Khaled Al-Sharif',
    nationalId: '401298734',
    programTitleAr: 'البرنامج التنفيذي في مهارات العرض والتقديم والتأثير الجماهيري',
    programTitleEn: 'Executive Presentation Skills & Public Speaking Mastery',
    hours: '24 ساعة تدريبية وتطبيق مسرحي',
    leadTrainer: 'م. مهدي الملاحي • استشاري التواصل والعرض الاحترافي',
    issueDate: '2026-09-20',
    grade: 'متميز (92%)',
    status: 'معتمد وساري المفعول',
    accreditationBody: 'شركة شات للتنمية والتطوير • قطاع بناء القدرات القيادية',
    verificationHash: 'SHA256:8b0c2d4e6f8a0b1c3d5e7f9a8b0c2d4e6f8a0b1c',
    securityStamp: 'OFFICIAL_ACCREDITED_SEAL'
  }
};

export function bindVerifyEvents() {
  const form = document.getElementById('form-verify-certificate');
  const input = document.getElementById('input-certificate-id');
  const resultContainer = document.getElementById('verify-result-container');

  // Helper to get all certificates (Mock + Earned in current browser)
  function getAllCertificates() {
    let earned = {};
    try {
      earned = JSON.parse(localStorage.getItem('shat_earned_certificates') || '{}');
    } catch (e) {}
    return { ...MOCK_CERTIFICATES, ...earned };
  }

  // Quick Demo Buttons
  document.querySelectorAll('.btn-sample-id').forEach(btn => {
    btn.onclick = () => {
      const sampleId = btn.getAttribute('data-id');
      if (input) {
        input.value = sampleId;
        verifyCertificateId(sampleId);
      }
    };
  });

  // Auto-verify if id is in URL hash or search params
  const hash = window.location.hash || '';
  let urlCode = '';
  if (hash.includes('?id=')) {
    urlCode = hash.split('?id=')[1]?.split('&')[0];
  } else if (hash.includes('/verify/')) {
    urlCode = hash.split('/verify/')[1];
  }

  if (urlCode && input) {
    input.value = decodeURIComponent(urlCode);
    setTimeout(() => verifyCertificateId(input.value), 200);
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const code = (input?.value || '').trim();
      if (!code) return;
      verifyCertificateId(code);
    };
  }

  function verifyCertificateId(rawCode) {
    const code = rawCode.toUpperCase().trim();
    if (!resultContainer) return;

    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const allCerts = getAllCertificates();
    const cert = allCerts[code];

    if (!cert) {
      resultContainer.innerHTML = `
        <div style="background: #FFFFFF; border: 2px dashed #EF4444; border-radius: 16px; padding: 36px 24px; text-align: center;">
          <div style="width: 60px; height: 60px; background: #FEE2E2; color: #DC2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            ${icons.x('', 28)}
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: #991B1B; margin: 0 0 8px;">
            لم يتم العثور على سجل مطابق للرقم المدخل
          </h3>
          <p style="color: #64748B; font-size: 0.92rem; max-width: 520px; margin: 0 auto 20px;">
            يرجى التأكد من كتابة الرقم التسلسلي بشكل دقيق كما هو مطبوع في أسفل الشهادة الورقية أو الرقمية (مثال: <strong>SHAT-CHS-2026-0891</strong>).
          </p>
          <a href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً شركة شات، أود الاستفسار عن التحقق من شهادة برقم: ' + code)}" target="_blank" class="btn-clean" style="background: #25D366; color: #FFFFFF; font-weight: 700; padding: 10px 22px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
            <span>التواصل مع دائرة التسجيل والاعتماد عبر واتساب</span>
          </a>
        </div>
      `;
      return;
    }

    // Success Certificate Display (Executive Gold & Emerald Framed Badge)
    resultContainer.innerHTML = `
      <div style="
        background: #FFFFFF;
        border: 2px solid #10B981;
        border-radius: 20px;
        box-shadow: 0 20px 40px -15px rgba(16,185,129,0.18);
        overflow: hidden;
      ">
        <!-- Top Status Bar -->
        <div style="
          background: linear-gradient(135deg, #064E3B 0%, #065F46 100%);
          color: #FFFFFF;
          padding: 20px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${icons.check('', 20)}
            </div>
            <div>
              <div style="font-weight: 900; font-size: 1.15rem; color: #ECFDF5;">شهادة أصلية وموثقة في السجلات الرسمية</div>
              <div style="font-size: 0.8rem; color: #A7F3D0; font-family: monospace;">Serial: ${cert.serial}</div>
            </div>
          </div>

          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #FFFFFF; padding: 4px 12px; border-radius: 999px; font-size: 0.78rem; font-weight: 700;">
              ${cert.status}
            </span>
          </div>
        </div>

        <!-- Certificate Body -->
        <div style="padding: 32px 36px;">
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 28px;">
            
            <!-- Trainee Details -->
            <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0;">
              <span style="font-size: 0.76rem; font-weight: 800; color: #64748B; text-transform: uppercase;">اسم المتدرب / الخريج</span>
              <div style="font-size: 1.3rem; font-weight: 900; color: #0B1E36; margin-top: 4px;">
                ${cert.traineeNameAr}
              </div>
              <div style="font-size: 0.95rem; font-weight: 600; color: #64748B; font-family: sans-serif; margin-top: 2px;">
                ${cert.traineeNameEn}
              </div>
              <div style="margin-top: 12px; font-size: 0.84rem; color: #475569;">
                <strong>الرقم المرجعي / الهوية:</strong> <span style="font-family: monospace;">${cert.nationalId}</span>
              </div>
            </div>

            <!-- Program Details -->
            <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0;">
              <span style="font-size: 0.76rem; font-weight: 800; color: #64748B; text-transform: uppercase;">البرنامج التدريبي والاعتماد</span>
              <div style="font-size: 1.15rem; font-weight: 900; color: #1E7E34; margin-top: 4px; line-height: 1.4;">
                ${cert.programTitleAr}
              </div>
              <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px; font-size: 0.84rem; color: #475569;">
                <div><strong>الساعات المعتمدة:</strong> ${cert.hours}</div>
                <div><strong>المدرب / الخبير:</strong> ${cert.leadTrainer}</div>
                <div><strong>تاريخ الإصدار:</strong> ${cert.issueDate}</div>
              </div>
            </div>

          </div>

          <!-- Official Stamp & Verification Token -->
          <div style="
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 18px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          ">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="
                width: 64px;
                height: 64px;
                background: #0B1E36;
                color: #FCD34D;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 0.65rem;
                font-weight: 800;
                text-align: center;
                border: 2px solid #D97706;
              ">
                <span style="display: inline-flex; align-items: center; justify-content: center; margin-bottom: 2px;">${icons.shieldCheck('', 20)}</span>
                <span>SHAT SEAL</span>
              </div>

              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #0B1E36;">${cert.accreditationBody}</div>
                <div style="font-size: 0.78rem; font-family: monospace; color: #64748B; margin-top: 2px;">${cert.verificationHash}</div>
              </div>
            </div>

            <!-- Print / Download Button -->
            <button type="button" class="btn-clean" onclick="window.print()" style="
              background: #0B1E36;
              color: #FFFFFF;
              font-weight: 700;
              font-size: 0.88rem;
              padding: 10px 20px;
              border-radius: 8px;
              display: inline-flex;
              align-items: center;
              gap: 8px;
            ">
              ${icons.printer('icon-inline', 16)} <span>طباعة إشعار التحقق</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }
}
