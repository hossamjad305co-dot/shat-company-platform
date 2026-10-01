import { icons } from '../icons.js';

export const FAQ_ITEMS = [
  {
    id: 'faq-accreditation',
    category: 'accreditation',
    questionAr: 'ما هي الاعتمادات الرسمية لشهادات شركة شات وكيف يتم التحقق منها؟',
    questionEn: 'What are the official accreditations of SHAT certificates and how to verify them?',
    answerAr: `تعتمد شركة شات للتنمية والتطوير معايير الجودة والمساءلة الدولية (CHS Alliance & Sphere Standards). تصدر جميع الشهادات بختم رسمي مشفر، رقم تسلسلي فريد، ورمز استجابة سريعة (QR Code). يمكن لأي جهة توظيف أو منظمة مانحة التحقق الفوري من صحة وأصالة الشهادة عبر <a href="#/verify" style="color: #1E7E34; font-weight: 700; text-decoration: underline;">بوابة التحقق الرقمي الرسمية</a> بالمنصة.`,
    answerEn: `SHAT certificates follow international standards (CHS Alliance & Sphere). Each certificate includes a unique cryptographic serial number and QR code verifiable on our official portal.`
  },
  {
    id: 'faq-registration',
    category: 'registration',
    questionAr: 'كيف أتمكن من التسجيل في الدورات عبر استمارات Google Forms المعتمدة؟',
    questionEn: 'How do I register via the accredited Google Forms?',
    answerAr: `وفرت المنصة نظام مزامنة مزدوج يتيح لك التسجيل مباشرة من داخل المنصة عبر <a href="#/forms" style="color: #1E7E34; font-weight: 700; text-decoration: underline;">بوابة الاستمارات المعتمدة</a>، أو فتح الرابط الرسمي في Google Forms. يتم حفظ مسودات بياناتك تلقائياً لمنع فقدانها، ويصلك إشعار تأكيد فوري بالقبول والخطوات اللاحقة.`,
    answerEn: `You can apply directly via our accredited Forms Portal (#/forms) or open Google Forms. Drafts are auto-saved and immediate confirmation is provided.`
  },
  {
    id: 'faq-payment',
    category: 'payment',
    questionAr: 'ما هي طرق الدفع المتاحة لرسوم الدورات داخل فلسطين وخارجها؟',
    questionEn: 'What payment methods are available locally and internationally?',
    answerAr: `نقدم خيارات دفع ميسرة وآمنة تشمل:
    <ul style="margin: 8px 0 0; padding-inline-start: 20px; line-height: 1.8;">
      <li><strong>التحويل البنكي المباشر:</strong> بنك فلسطين (حساب رسمي باسم شركة شات للتنمية والتطوير).</li>
      <li><strong>المحافظ الإلكترونية:</strong> جوال باي (Jawwal Pay) وبال باي (PalPay).</li>
      <li><strong>التحويل الدولي:</strong> ويسترن يونيون (Western Union) أو موني جرام للطلاب من خارج فلسطين.</li>
      <li><strong>السداد النقدي:</strong> عبر مراكز التنسيق المعتمدة لشركة شات.</li>
    </ul>`,
    answerEn: `Payment options include Bank of Palestine direct transfer, Jawwal Pay, PalPay, Western Union for international trainees, and cash at official partners.`
  },
  {
    id: 'faq-online-zoom',
    category: 'courses',
    questionAr: 'هل الدورات متاحة عبر زووم تفاعلي للمتدربين من مختلف المحافظات والدول؟',
    questionEn: 'Are courses available live on Zoom for regional trainees?',
    answerAr: `نعم، كافة البرامج التدريبية الكبرى مصممة بنموذج التعليم المدمج والافتراضي عالي التفاعل عبر Zoom Pro وغرف المحاكاة وتطبيقات العمل الجماعي المباشرة، مع تسجيل كافة الجلسات وتوفيرها للمتدربين عبر المنصة لمراجعتها في أي وقت.`,
    answerEn: `Yes, all major programs are delivered via interactive Zoom Pro sessions with breakout simulation rooms, and all sessions are recorded for on-demand review.`
  },
  {
    id: 'faq-scholarships',
    category: 'payment',
    questionAr: 'هل تتوفر منح تدريبية جزئية أو خصومات للمجموعات وكوادر الجمعيات؟',
    questionEn: 'Are partial scholarships or NGO group discounts available?',
    answerAr: `نعم، تخصص شركة شات سنوياً مقاعد مدعومة جزئياً لخريجي العمل الاجتماعي والإنساني والعاملين في منظمات المجتمع المدني المحلية، بالإضافة إلى خصومات خاصة للترشيحات الجماعية (3 متدربين فأكثر من نفس المؤسسة). يمكنك تحديد طلب منحة عند تعبئة الاستمارة.`,
    answerEn: `Yes, SHAT allocates partially sponsored seats for humanitarian graduates and civil society staff, alongside NGO group discounts.`
  },
  {
    id: 'faq-consulting',
    category: 'consulting',
    questionAr: 'كيف تخدم شركة شات المنظمات والمؤسسات والجمعيات في تطوير النظم والحوكمة؟',
    questionEn: 'How does SHAT support NGOs with governance and institutional systems?',
    answerAr: `نقدم تدخلات استشارية متكاملة تشمل: تشخيص الجاهزية المؤسسية، إعداد ومراجعة الأدلة التشغيلية SOPs، تأهيل المنظمات للحصول على شهادة CHS، تدريب الكوادر الميدانية، وتصميم نظم المتابعة والتقييم (MEAL). يمكنك تقديم طلب تدخل فوري عبر <a href="#/forms?id=consulting-inquiry-2026" style="color: #1E7E34; font-weight: 700; text-decoration: underline;">استمارة الاستشارات المؤسسية</a>.`,
    answerEn: `We provide end-to-end consulting: readiness audits, operational SOPs, CHS certification coaching, MEAL framework design, and field evaluations.`
  }
];

export function renderFaqSection(lang = 'ar') {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  return `
    <section class="section section-faq" style="padding: 72px 0; background: #F8FAFC; border-top: 1px solid #E2E8F0;">
      <div class="container" style="max-width: 900px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: #E8F5E9; color: var(--shat-green, #1E7E34); padding: 5px 16px; border-radius: 999px; font-size: 0.84rem; font-weight: 800; margin-bottom: 12px;">
            
            <span>${txt('الأسئلة الأكثر تداولاً • إجابات واضحة ومباشرة', 'Frequently Asked Questions • Direct Answers', 'Foire Aux Questions')}</span>
          </div>
          <h2 style="font-size: 2rem; font-weight: 900; color: var(--shat-navy, #0B1E36); margin: 0 0 14px; line-height: 1.3;">
            ${txt('كل ما تحتاج معرفته عن البرامج والشهادات والاستشارات', 'Everything You Need to Know About Our Programs', 'Tout Ce Que Vous Devez Savoir')}
          </h2>
          <p style="font-size: 1rem; color: #475569; margin: 0;">
            ${txt(
              'إجابات شاملة وموثقة حول آليات التسجيل، الاعتمادات الدولية، خيارات السداد، وخدمات المنظمات.',
              'Authoritative answers covering registration, accreditations, payment methods, and institutional services.',
              'Réponses complètes sur les inscriptions, les certifications et les services institutionnels.'
            )}
          </p>
        </div>

        <!-- Live Instant Search Bar -->
        <div style="margin-bottom: 28px;">
          <div style="position: relative;">
            <span style="position: absolute; ${isRtl ? 'right' : 'left'}: 16px; top: 50%; transform: translateY(-50%); font-size: 1.15rem; color: #94A3B8;"></span>
            <input
              type="text"
              id="faq-search-input"
              placeholder="${txt('ابحث في الأسئلة الشائعة (مثال: شهادة، دفع، زووم، استشارة، شروط)...', 'Search FAQ by keyword (e.g. certificate, payment, zoom)...', 'Rechercher dans la FAQ...')}"
              style="
                width: 100%;
                padding: 14px 44px;
                background: #FFFFFF;
                border: 2px solid #E2E8F0;
                border-radius: 12px;
                font-size: 0.95rem;
                color: #0B1E36;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
                font-family: inherit;
              "
            >
          </div>
        </div>

        <!-- FAQ Categories -->
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px;" id="faq-category-pills">
          <button type="button" class="faq-cat-btn active" data-cat="all" style="
            background: var(--shat-navy, #0B1E36);
            color: #FFFFFF;
            border: 1px solid var(--shat-navy, #0B1E36);
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
          ">${txt('جميع الأسئلة', 'All Questions', 'Toutes les Questions')}</button>

          <button type="button" class="faq-cat-btn" data-cat="accreditation" style="
            background: #FFFFFF;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
          ">${txt('الشهادات والاعتمادات', 'Certificates & Accreditations', 'Certifications')}</button>

          <button type="button" class="faq-cat-btn" data-cat="registration" style="
            background: #FFFFFF;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
          ">${txt('التسجيل والاستمارات', 'Registration & Forms', 'Inscriptions')}</button>

          <button type="button" class="faq-cat-btn" data-cat="payment" style="
            background: #FFFFFF;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
          ">${txt('الرسوم وطرق الدفع', 'Fees & Payment', 'Paiements')}</button>

          <button type="button" class="faq-cat-btn" data-cat="consulting" style="
            background: #FFFFFF;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
          ">${txt('خدمات المنظمات', 'NGO Consulting', 'Services ONG')}</button>
        </div>

        <!-- FAQ Items List -->
        <div id="faq-accordion-list" style="display: flex; flex-direction: column; gap: 14px;">
          ${FAQ_ITEMS.map((item, idx) => renderFaqItem(item, idx, lang)).join('')}
        </div>

        <!-- Still have questions footer banner -->
        <div style="margin-top: 40px; background: linear-gradient(135deg, #0B1E36 0%, #16365C 100%); color: #FFFFFF; border-radius: 16px; padding: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin: 0 0 6px;">${txt('هل لديك استفسار آخر لم تجد إجابته هنا؟', 'Still Have More Questions?', 'Vous Avez d\'Autres Questions ?')}</h4>
            <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0;">${txt('فريق الاستشارات والتسجيل متواجد لمساعدتك والإجابة على أي تساؤل فوراً.', 'Our advisory team is available to assist you via instant WhatsApp chat.', 'Notre équipe est disponible pour vous assister via WhatsApp.')}</p>
          </div>
          <a href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً شركة شات، لدي استفسار إضافي أود طرحه:')}" target="_blank" rel="noopener" class="btn-clean" style="
            background: #25D366;
            color: #FFFFFF;
            font-weight: 800;
            font-size: 0.95rem;
            padding: 12px 24px;
            border-radius: 10px;
            box-shadow: 0 4px 14px rgba(37,211,102,0.3);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            <span style="display: inline-flex; align-items: center;">${icons.whatsapp('', 18)}</span>
            <span>${txt('تحدث معنا عبر واتساب الآن', 'Chat via WhatsApp Now', 'Discuter sur WhatsApp')}</span>
          </a>
        </div>

      </div>
    </section>
  `;
}

function renderFaqItem(item, idx, lang) {
  const isRtl = lang === 'ar';
  const q = isRtl ? item.questionAr : item.questionEn;
  const a = isRtl ? item.answerAr : item.answerEn;

  return `
    <div class="faq-item-card" data-category="${item.category}" style="
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(11,30,54,0.02);
      transition: border-color 0.2s;
    ">
      <button type="button" class="faq-question-btn" aria-expanded="false" style="
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 22px;
        background: transparent;
        border: none;
        text-align: ${isRtl ? 'right' : 'left'};
        font-family: inherit;
        font-size: 1.02rem;
        font-weight: 800;
        color: var(--shat-navy, #0B1E36);
        cursor: pointer;
        gap: 16px;
      ">
        <span>${q}</span>
        <span class="faq-chevron" style="
          font-size: 0.85rem;
          color: #94A3B8;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        ">▼</span>
      </button>

      <div class="faq-answer-panel" style="
        display: none;
        padding: 0 22px 20px;
        color: #475569;
        font-size: 0.94rem;
        line-height: 1.75;
        border-top: 1px solid #F1F5F9;
        background: #FAFAFA;
      ">
        <div style="padding-top: 16px;">
          ${a}
        </div>
      </div>
    </div>
  `;
}

export function bindFaqEvents() {
  const questionBtns = document.querySelectorAll('.faq-question-btn');
  const searchInput = document.getElementById('faq-search-input');
  const catBtns = document.querySelectorAll('.faq-cat-btn');
  const cards = document.querySelectorAll('.faq-item-card');

  // Toggle Accordion
  questionBtns.forEach(btn => {
    btn.onclick = () => {
      const panel = btn.nextElementSibling;
      const chevron = btn.querySelector('.faq-chevron');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.style.display = 'block';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    };
  });

  // Filter Categories
  if (catBtns.length > 0) {
    catBtns.forEach(btn => {
      btn.onclick = () => {
        const cat = btn.getAttribute('data-cat');

        catBtns.forEach(b => {
          b.style.background = '#FFFFFF';
          b.style.color = '#475569';
          b.style.borderColor = '#E2E8F0';
          b.classList.remove('active');
        });

        btn.style.background = 'var(--shat-navy, #0B1E36)';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = 'var(--shat-navy, #0B1E36)';
        btn.classList.add('active');

        applyFilters();
      };
    });
  }

  // Live Instant Search
  if (searchInput) {
    searchInput.oninput = () => {
      applyFilters();
    };
  }

  function applyFilters() {
    const activeCatBtn = document.querySelector('.faq-cat-btn.active');
    const selectedCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const text = card.innerText.toLowerCase();

      const matchCat = (selectedCat === 'all' || cardCat === selectedCat);
      const matchSearch = (!query || text.includes(query));

      if (matchCat && matchSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
}
