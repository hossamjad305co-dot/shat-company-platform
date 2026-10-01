// assets/js/components/trainingCalendar.js
// Executive Training Calendar & Upcoming Cohorts Schedule for SHAT Platform (2026)
// Provides interactive cohort filtering, seat urgency status, and direct Google Form enrollment

export const UPCOMING_COHORTS = [
  {
    id: 'cohort-cm-2026-04',
    courseId: 'shat-case-management',
    titleAr: 'دورة إعداد وتأهيل مدير حالة Case Management',
    titleEn: 'Case Management Professional Qualification Course',
    trainer: 'د. محمد إسليم',
    trainerRole: 'استشاري إدارة الحالة والرعاية المتكاملة',
    startDate: '2026-10-20',
    startDateFormatted: '20 أكتوبر 2026',
    scheduleAr: 'أيام الأحد والثلاثاء والخميس • 5:00 - 7:30 مساءً',
    scheduleEn: 'Sun, Tue, Thu • 5:00 - 7:30 PM',
    duration: '30 ساعة تدريبية وتطبيق إكلينيكي',
    mode: 'عن بُعد (Zoom تفاعلي) + قاعات تطبيق',
    modeKey: 'online',
    category: 'case-management',
    seatsTotal: 25,
    seatsRemaining: 5,
    fee: 'رسوم مدعومة جزئياً',
    formUrl: '#/forms?id=case-manager-2026',
    badge: 'الدفعة 4 • مقاعد محدودة',
    badgeColor: '#1E7E34',
    badgeBg: '#E8F5E9'
  },
  {
    id: 'cohort-pres-2026-03',
    courseId: 'shat-presentation-skills',
    titleAr: 'البرنامج التنفيذي في مهارات العرض والتقديم والتأثير الجماهيري',
    titleEn: 'Executive Presentation Skills & Public Speaking',
    trainer: 'م. مهدي الملاحي',
    trainerRole: 'استشاري التواصل المؤسسي والعرض الفعال',
    startDate: '2026-10-15',
    startDateFormatted: '15 أكتوبر 2026',
    scheduleAr: 'أيام السبت والاثنين والأربعاء • 6:00 - 8:30 مساءً',
    scheduleEn: 'Sat, Mon, Wed • 6:00 - 8:30 PM',
    duration: '24 ساعة تدريبية وتطبيق مسرحي',
    mode: 'وجاهي + بث تفاعلي متزامن',
    modeKey: 'hybrid',
    category: 'presentation',
    seatsTotal: 20,
    seatsRemaining: 3,
    fee: 'رسوم تفضيلية',
    formUrl: '#/forms?id=presentation-skills-2026',
    badge: 'الدفعة 3 • يغلق التسجيل قريباً',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7'
  },
  {
    id: 'cohort-chs-2026-02',
    courseId: 'shat-chs-master',
    titleAr: 'دبلوم الممارس الإنساني وبناء القدرات المؤسسية (CHS Master)',
    titleEn: 'Core Humanitarian Standard (CHS) Master Diploma',
    trainer: 'أ. حسام جاد الله وفريق الخبراء',
    trainerRole: 'خبير الامتثال الإنساني والجودة والمساءلة',
    startDate: '2026-11-01',
    startDateFormatted: '1 نوفمبر 2026',
    scheduleAr: 'أيام الجمعة والسبت • 4:00 - 8:00 مساءً',
    scheduleEn: 'Fri & Sat • 4:00 - 8:00 PM',
    duration: '60 ساعة تدريبية معتمدة دولياً',
    mode: 'عن بُعد (غرف محاكاة وتطبيقات دولية)',
    modeKey: 'online',
    category: 'humanitarian',
    seatsTotal: 30,
    seatsRemaining: 11,
    fee: 'منحة تدريبية وبناء قدرات',
    formUrl: '#/forms?id=humanitarian-worker-2026',
    badge: 'الدفعة الخريفية • معتمد دولياً',
    badgeColor: '#2563EB',
    badgeBg: '#EFF6FF'
  },
  {
    id: 'cohort-consulting-2026',
    courseId: 'shat-consulting-program',
    titleAr: 'برنامج التدخل الاستشاري وتطوير النظم والحوكمة للمنظمات',
    titleEn: 'Institutional Consulting & Governance Systems Program',
    trainer: 'نخبة مستشاري ومراجعي شركة شات',
    trainerRole: 'مستشارون معتمدون في نظم OECD DAC و CHS',
    startDate: 'متاح على مدار العام',
    startDateFormatted: 'يبدأ فور توقيع نطاق العمل (SOW)',
    scheduleAr: 'جلسات استشارية مرنة وميدانية',
    scheduleEn: 'Flexible & On-site Consulting Sessions',
    duration: 'وفق نطاق التدخل (من 1 إلى 6 أشهر)',
    mode: 'تدخل ميداني واستشاري متكامل',
    modeKey: 'onsite',
    category: 'consulting',
    seatsTotal: 8,
    seatsRemaining: 2,
    fee: 'وفق موازنة التدخل المؤسسي',
    formUrl: '#/forms?id=consulting-inquiry-2026',
    badge: 'استشارات مؤسسية مخصصة',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF'
  }
];

export function renderTrainingCalendarSection(lang = 'ar') {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  return `
    <section class="section section-calendar-executive" style="padding: 64px 0; background: #FFFFFF; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
      <div class="container">
        
        <!-- Section Header -->
        <div style="text-align: center; max-width: 780px; margin: 0 auto 36px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: #E8F5E9; color: var(--shat-green, #1E7E34); padding: 5px 16px; border-radius: 999px; font-size: 0.84rem; font-weight: 800; margin-bottom: 14px;">
            <span>◷</span>
            <span>${txt('الجدول الزمني والتقويم التدريبي لعام 2026', '2026 Training Calendar & Upcoming Cohorts', 'Calendrier de Formation 2026')}</span>
          </div>
          <h2 style="font-size: 2rem; font-weight: 900; color: var(--shat-navy, #0B1E36); margin: 0 0 14px; line-height: 1.3;">
            ${txt('مواعيد انطلاق الدفعات القادمة في أكاديمية شات', 'Upcoming Cohort Launches & Training Schedule', 'Prochaines Cohortes et Sessions de Formation')}
          </h2>
          <p style="font-size: 1rem; color: #475569; line-height: 1.7; margin: 0;">
            ${txt(
              'اطلع على التواريخ المعتمدة لانطلاق برامجنا التخصصية، حالة المقاعد المتاحة، وسجل مباشرة عبر استمارة القبول والتسجيل الرسمية.',
              'Browse confirmed start dates, seat availability, and enroll directly through the accredited application form.',
              'Consultez les dates confirmées, la disponibilité des places et inscrivez-vous directement.'
            )}
          </p>
        </div>

        <!-- Filter Controls -->
        <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 32px; flex-wrap: wrap;" id="calendar-filter-controls">
          <button type="button" class="calendar-filter-btn active" data-filter="all" style="
            background: var(--shat-navy, #0B1E36);
            color: #FFFFFF;
            border: 1px solid var(--shat-navy, #0B1E36);
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">${txt('جميع البرامج والدفعات', 'All Cohorts', 'Tous les Programmes')}</button>
          
          <button type="button" class="calendar-filter-btn" data-filter="case-management" style="
            background: #F1F5F9;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">${txt('✉ إدارة الحالة (د. إسليم)', 'Case Management', 'Gestion de Cas')}</button>
          
          <button type="button" class="calendar-filter-btn" data-filter="presentation" style="
            background: #F1F5F9;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">${txt('▪ مهارات العرض (م. الملاحي)', 'Presentation Skills', 'Prise de Parole')}</button>
          
          <button type="button" class="calendar-filter-btn" data-filter="humanitarian" style="
            background: #F1F5F9;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">${txt('▪ دبلوم CHS الإنساني', 'CHS Master Diploma', 'Diplôme CHS')}</button>
          
          <button type="button" class="calendar-filter-btn" data-filter="consulting" style="
            background: #F1F5F9;
            color: #475569;
            border: 1px solid #E2E8F0;
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">${txt('▪ استشارات المنظمات', 'Institutional Consulting', 'Conseil Institutionnel')}</button>
        </div>

        <!-- Cohorts Grid -->
        <div id="calendar-cohorts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${UPCOMING_COHORTS.map(c => renderCohortCard(c, lang)).join('')}
        </div>

        <!-- Calendar Guarantee & Corporate Note -->
        <div style="margin-top: 36px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.3rem; color: var(--shat-green);">◈</span>
            <div style="font-size: 0.9rem; color: #334155;">
              <strong>${txt('ضمان الجودة والاعتماد:', 'Accreditation Guarantee:', 'Garantie de Qualité :')}</strong>
              ${txt('تمنح شركة شات للتنمية والتطوير شهادات معتمدة رسمياً ومزودة برقم تسلسلي موثق ورمز QR يمكن التحقق منه دولياً.', 'Official verified certificates with cryptographic serial IDs and QR codes are issued upon completion.', 'Des certificats officiels avec numéro de série cryptographique sont délivrés à la fin de la formation.')}
            </div>
          </div>
          <a href="#/verify" class="btn-clean" style="background: #FFFFFF; border: 1px solid #CBD5E1; color: var(--shat-navy, #0B1E36); font-weight: 700; padding: 8px 18px; border-radius: 8px; font-size: 0.86rem;">
            <span>✓ ${txt('بوابة فحص الشهادات', 'Certificate Verification Portal', 'Portail de Vérification')}</span>
          </a>
        </div>

      </div>
    </section>
  `;
}

function renderCohortCard(c, lang) {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  return `
    <div class="cohort-item-card" data-category="${c.category}" style="
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 14px rgba(11,30,54,0.04);
      transition: transform 0.2s, box-shadow 0.2s;
    ">
      <div>
        <!-- Top Badges -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 14px;">
          <span style="background: ${c.badgeBg}; color: ${c.badgeColor}; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">
            ${c.badge}
          </span>
          <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; background: #F1F5F9; padding: 3px 8px; border-radius: 4px;">
            ${c.mode}
          </span>
        </div>

        <!-- Title -->
        <h3 style="font-size: 1.15rem; font-weight: 900; color: var(--shat-navy, #0B1E36); margin: 0 0 10px; line-height: 1.4;">
          ${isRtl ? c.titleAr : c.titleEn}
        </h3>

        <!-- Trainer -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 0.88rem; color: #334155;">
          <span>▪</span>
          <div>
            <strong>${c.trainer}</strong>
            <div style="font-size: 0.76rem; color: #64748B;">${c.trainerRole}</div>
          </div>
        </div>

        <!-- Date & Schedule Details -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 0.84rem; color: #475569;">
          <div style="display: flex; justify-content: space-between;">
            <span>▪ <strong>${txt('تاريخ الانطلاق:', 'Start Date:', 'Date de Début :')}</strong></span>
            <span style="font-weight: 800; color: var(--shat-navy, #0B1E36);">${c.startDateFormatted}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>◷ <strong>${txt('الساعات المعتمدة:', 'Hours:', 'Volume :')}</strong></span>
            <span>${c.duration}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>◷ <strong>${txt('المواعيد:', 'Schedule:', 'Horaires :')}</strong></span>
            <span>${isRtl ? c.scheduleAr : c.scheduleEn}</span>
          </div>
        </div>

        <!-- Seats Progress -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px;">
            <span>${txt('المقاعد الشاغرة المتبقية:', 'Seats Remaining:', 'Places Disponibles :')}</span>
            <span style="color: ${c.seatsRemaining <= 5 ? '#DC2626' : '#1E7E34'}; font-weight: 900;">
              ${c.seatsRemaining} / ${c.seatsTotal} ${txt('مقعد متبقٍ', 'left', 'restantes')}
            </span>
          </div>
          <div style="height: 6px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
            <div style="height: 100%; width: ${((c.seatsTotal - c.seatsRemaining) / c.seatsTotal) * 100}%; background: ${c.seatsRemaining <= 5 ? '#DC2626' : '#1E7E34'}; border-radius: 999px;"></div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div>
        <a href="${c.formUrl}" class="btn-clean btn-green" style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 800;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(30,126,52,0.2);
          text-align: center;
        ">
          <span>✓ ${txt('التسجيل الفوري في هذه الدفعة', 'Enroll in this Cohort', 'S\'inscrire à cette Session')}</span>
          <span>${isRtl ? '←' : '→'}</span>
        </a>
      </div>
    </div>
  `;
}

export function bindTrainingCalendarEvents() {
  const filterBtns = document.querySelectorAll('.calendar-filter-btn');
  const cards = document.querySelectorAll('.cohort-item-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.style.background = '#F1F5F9';
          b.style.color = '#475569';
          b.style.borderColor = '#E2E8F0';
          b.classList.remove('active');
        });

        btn.style.background = 'var(--shat-navy, #0B1E36)';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = 'var(--shat-navy, #0B1E36)';
        btn.classList.add('active');

        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      };
    });
  }
}
