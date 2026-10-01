// assets/js/components/syllabusViewer.js
// Official Syllabus & Course Specification Sheet Viewer for SHAT Academy
// Renders printable, accredited academic syllabi with SHAT institutional header & competencies

export const SYLLABUS_CATALOG = {
  'shat-chs-master': {
    code: 'SHAT-SYL-CHS-101',
    titleAr: 'دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة والمساءلة',
    titleEn: 'Core Humanitarian Standard (CHS) Master Diploma & Accountability',
    instructor: 'أ. حسام جاد الله • خبير معتمد في معايير الجودة والمساءلة الإنسانية',
    hours: '60 ساعة تدريبية معتمدة (30 ساعة نظري + 30 ساعة تطبيق ميداني ومحاكاة)',
    level: 'دبلوم مهني تنفيذي / متقدم',
    accreditation: 'المعيار الإنساني الأساسي (CHS Alliance) بالتعاون مع أكاديمية شات',
    targetAudience: 'مديرو البرامج والمشاريع، منسقو المساءلة AAP، ضباط المتابعة والتقييم MEAL، والعاملون بالمنظمات الإنسانية.',
    objectives: [
      'فهم وتطبيق الالتزامات التسعة للمعيار الإنساني الأساسي (Core Humanitarian Standard).',
      'بناء وتفعيل آليات الشكاوى والمقترحات المجتمعية الآمنة والسرية (CFRM).',
      'إدماج معايير صون السلامة والحماية من الاستغلال الجنسي والاعتداء (PSEA) في كافة مراحل المشروع.',
      'تصميم مصفوفات التحقق المستقل وإعداد تقارير التقييم المؤسسي وفق معايير OECD DAC.'
    ],
    modules: [
      { num: 1, title: 'الإطار المفاهيمي والتاريخي لنشأة معيار CHS ونظام المساءلة الإنسانية', hours: '10 ساعات' },
      { num: 2, title: 'الالتزامات (1-3): ملاءمة المساعدات، الفاعلية، والقدرات المحلية المستدامة', hours: '12 ساعة' },
      { num: 3, title: 'الالتزامات (4-6): الشفافية والمساءلة، آليات CFRM، والتنسيق متعدد القطاعات', hours: '14 ساعة' },
      { num: 4, title: 'الالتزامات (7-9): التعلم المستمر، كفاءة وتأهيل الكوادر، والإدارة الرشيدة للموارد', hours: '12 ساعة' },
      { num: 5, title: 'مشروع التخرج والمحاكاة الإكلينيكية: مراجعة خطة استجابة مؤسسية وإعداد التقرير المعتمد', hours: '12 ساعة' }
    ],
    passingGrade: '75% في التكليفات العملية ومشروع التخرج النهائي + حضور لا يقل عن 85% من الجلسات',
    formUrl: '#/forms?id=humanitarian-worker-2026'
  },
  'shat-case-management': {
    code: 'SHAT-SYL-CM-201',
    titleAr: 'دورة إعداد وتأهيل مدير حالة Case Management في العمل الاجتماعي والإنساني',
    titleEn: 'Professional Case Management Qualification Course',
    instructor: 'د. محمد إسليم • استشاري إدارة الحالة والرعاية المتكاملة والصحة النفسية',
    hours: '30 ساعة تدريبية وتطبيق إكلينيكي مباشر',
    level: 'تأهيل مهني متخصص',
    accreditation: 'أكاديمية شات للتدريب المهني وبناء القدرات المؤسسية',
    targetAudience: 'الأخصائيون الاجتماعيون والنفسيون، مشرفو الحماية، ومنسقو الحالات بالمنظمات الدولية والمحلية.',
    objectives: [
      'إتقان المراحل الست لإدارة الحالة: (التعرف والتسجيل، التقييم الشامل، خطة التدخل، التنفيذ، المتابعة والمراجعة، الإغلاق).',
      'صياغة نماذج تقييم المخاطر وتحديد الأولويات والتدخل الطارئ.',
      'تفعيل مسارات الإحالة الآمنة (Safe Referral Pathways) مع مراعاة السرية التامة وحماية البيانات.',
      'إدارة الضغوط المهنية، الرعاية الذاتية لمنع الاحتراق النفسي، وأخلاقيات المهنة.'
    ],
    modules: [
      { num: 1, title: 'مبادئ وأخلاقيات إدارة الحالة والمسؤوليات القانونية والمهنية', hours: '6 ساعات' },
      { num: 2, title: 'التقييم الشامل للاحتياجات وتحديد مكامن القوة ونقاط الضعف والمخاطر', hours: '6 ساعات' },
      { num: 3, title: 'هندسة خطة التدخل الفردية والأسرية المتكاملة وتحديد الأهداف الذكية SMART', hours: '6 ساعات' },
      { num: 4, title: 'مسارات الإحالة متعددة القطاعات وشبكات الدعم المجتمعي', hours: '6 ساعات' },
      { num: 5, title: 'دراسة حالات حية وتطبيق عملي على نماذج السجلات الإكلينيكية', hours: '6 ساعات' }
    ],
    passingGrade: '70% في التقييمات العملية ودراسة الحالة الإكلينيكية',
    formUrl: '#/forms?id=case-manager-2026'
  },
  'shat-presentation-skills': {
    code: 'SHAT-SYL-PRES-301',
    titleAr: 'البرنامج التنفيذي في مهارات العرض والتقديم والتأثير الجماهيري Presentation Skills',
    titleEn: 'Executive Presentation Skills & High-Impact Speaking',
    instructor: 'م. مهدي الملاحي • استشاري التواصل المؤسسي والعرض الفعال',
    hours: '24 ساعة تدريبية وتطبيق مسرحي ومحاكاة مباشرة',
    level: 'قيادي / تنفيذي',
    accreditation: 'شركة شات للتنمية والتطوير • قطاع بناء القدرات القيادية',
    targetAudience: 'المديرون التنفيذيون، مسؤولو العلاقات والتواصل، المدربون، وقادة المشاريع الراغبون في إتقان الإلقاء المقنع.',
    objectives: [
      'هندسة وبناء هيكل العرض التقديمي المقنع وفق نموذج "المشكلة - الحل - الأثر".',
      'إتقان لغة الجسد، الاتصال البصري، وتنويع النبرة الصوتية لشد انتباه الحضور.',
      'تصميم شرائح بصرية احترافية تخاطب العقل وتعتمد قواعد الإيجاز والتسلسل البصري.',
      'إدارة قاعات المؤتمرات والتعامل ببراعة مع الأسئلة الحرجة والجمهور المتحدي.'
    ],
    modules: [
      { num: 1, title: 'علم الإقناع والتأثير الجماهيري وهندسة المحتوى القيادي', hours: '5 ساعات' },
      { num: 2, title: 'لغة الجسد، الحضور المسرحي، وتطويع طبقات الصوت والنبرات', hours: '5 ساعات' },
      { num: 3, title: 'فن تصميم السلايدات الاحترافية والإخراج البصري للمعلومات المعقدة', hours: '5 ساعات' },
      { num: 4, title: 'إدارة منصات التحدث أمام المانحين والشركاء والتعامل مع الأسئلة المعقدة', hours: '4 ساعات' },
      { num: 5, title: 'العروض الختامية التطبيقية والتغذية الراجعة الفردية بالصوت والصورة', hours: '5 ساعات' }
    ],
    passingGrade: 'إنجاز العرض التقديمي النهائي المباشر وتقييم لجنة التحكيم',
    formUrl: '#/forms?id=presentation-skills-2026'
  }
};

export class SyllabusViewer {
  constructor() {
    this.init();
  }

  init() {
    this.createDom();
    window.openSyllabusModal = (courseId) => this.open(courseId);
  }

  createDom() {
    if (document.getElementById('shat-syllabus-modal-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'shat-syllabus-modal-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(11, 30, 54, 0.7);
      backdrop-filter: blur(6px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 30px 16px;
      overflow-y: auto;
    `;

    backdrop.innerHTML = `
      <div id="shat-syllabus-modal-card" style="
        background: #FFFFFF;
        width: 100%;
        max-width: 840px;
        max-height: 90vh;
        border-radius: 18px;
        box-shadow: 0 25px 50px -12px rgba(11, 30, 54, 0.4);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      ">
        <!-- Top Toolbar -->
        <div style="background: var(--shat-navy, #0B1E36); color: #FFFFFF; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.1rem; color: var(--shat-green);"></span>
            <span style="font-weight: 800; font-size: 0.95rem;">الخطة التدريبية المعتمدة • Course Syllabus</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="btn-print-syllabus" class="btn-clean" style="background: #1E7E34; color: #FFFFFF; font-weight: 700; font-size: 0.82rem; padding: 6px 14px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px;">
              <span>⎙ طباعة / حفظ PDF</span>
            </button>
            <button id="btn-close-syllabus" style="background: transparent; border: none; color: #94A3B8; font-size: 1.3rem; cursor: pointer; padding: 2px 8px;">✕</button>
          </div>
        </div>

        <!-- Scrollable Content Body -->
        <div id="shat-syllabus-body" style="padding: 32px 36px; overflow-y: auto;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const closeBtn = backdrop.querySelector('#btn-close-syllabus');
    if (closeBtn) closeBtn.onclick = () => this.close();

    const printBtn = backdrop.querySelector('#btn-print-syllabus');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }

    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.close();
    };
  }

  open(courseId = 'shat-chs-master') {
    const s = SYLLABUS_CATALOG[courseId] || SYLLABUS_CATALOG['shat-chs-master'];
    const body = document.getElementById('shat-syllabus-body');
    const backdrop = document.getElementById('shat-syllabus-modal-backdrop');

    if (!body || !backdrop) return;

    body.innerHTML = `
      <div class="printable-syllabus">
        
        <!-- Institutional Letterhead Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0B1E36; padding-bottom: 18px; margin-bottom: 24px;">
          <div>
            <div style="font-size: 1.2rem; font-weight: 900; color: #0B1E36;">شركة شات للتنمية والتطوير</div>
            <div style="font-size: 0.82rem; color: #475569; font-weight: 600;">SHAT Development & Growth • Training Academy</div>
            <div style="font-size: 0.76rem; color: #1E7E34; font-weight: 700; margin-top: 2px;">بناء القدرات • تعزيز المؤسسات • تطوير النتائج</div>
          </div>
          <div style="text-align: left;">
            <span style="font-family: monospace; font-size: 0.84rem; background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 6px; font-weight: 700; color: #0B1E36;">
              ${s.code}
            </span>
            <div style="font-size: 0.74rem; color: #64748B; margin-top: 4px;">نسخة رسمية معتمدة لعام 2026</div>
          </div>
        </div>

        <!-- Course Title & Metadata Box -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
          <h2 style="font-size: 1.4rem; font-weight: 900; color: #0B1E36; margin: 0 0 6px; line-height: 1.35;">
            ${s.titleAr}
          </h2>
          <div style="font-size: 0.95rem; color: #64748B; font-weight: 600; font-family: sans-serif; margin-bottom: 16px;">
            ${s.titleEn}
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; font-size: 0.86rem; color: #334155; padding-top: 14px; border-top: 1px solid #E2E8F0;">
            <div><strong>الخبير والمدرب:</strong> ${s.instructor}</div>
            <div><strong>الساعات المعتمدة:</strong> ${s.hours}</div>
            <div><strong>المستوى:</strong> ${s.level}</div>
            <div><strong>جهة الاعتماد:</strong> ${s.accreditation}</div>
          </div>
        </div>

        <!-- Target Audience -->
        <div style="margin-bottom: 22px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 8px; display: flex; align-items: center; gap: 8px;">
            
            <span>الفئة المستهدفة وشروط الالتحاق:</span>
          </h3>
          <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.7;">
            ${s.targetAudience}
          </p>
        </div>

        <!-- Learning Objectives -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 10px; display: flex; align-items: center; gap: 8px;">
            
            <span>مخرجات التعلم والجدارات المستهدفة (Competencies):</span>
          </h3>
          <ul style="margin: 0; padding-inline-start: 22px; font-size: 0.9rem; color: #475569; line-height: 1.8;">
            ${s.objectives.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>

        <!-- Modules Breakdown -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 12px; display: flex; align-items: center; gap: 8px;">
            
            <span>مخطط الوحدات والمحاور التدريبية التفصيلية:</span>
          </h3>
          <div style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.88rem;">
              <thead>
                <tr style="background: #F1F5F9; color: #0B1E36; font-weight: 800;">
                  <th style="padding: 10px 14px; width: 60px;">الوحدة</th>
                  <th style="padding: 10px 14px;">الموضوع والمحتوى العلمي</th>
                  <th style="padding: 10px 14px; width: 90px;">الساعات</th>
                </tr>
              </thead>
              <tbody>
                ${s.modules.map(m => `
                  <tr style="border-top: 1px solid #E2E8F0;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1E7E34;">${m.num}</td>
                    <td style="padding: 10px 14px; color: #334155; font-weight: 600;">${m.title}</td>
                    <td style="padding: 10px 14px; color: #64748B;">${m.hours}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Certification & Assessment -->
        <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; font-size: 0.88rem; color: #065F46;">
          <strong>معايير التقييم ومنح الشهادة:</strong> ${s.passingGrade}
        </div>

        <!-- Bottom Action CTA -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
          <div style="font-size: 0.84rem; color: #64748B;">
            للاستفسار عن الدفعات القادمة: <a href="https://wa.me/972592879621" target="_blank" style="color: #1E7E34; font-weight: 700;">+972 59 287 9621</a>
          </div>
          <a href="${s.formUrl}" class="btn-clean btn-green" style="font-weight: 800; padding: 10px 22px; border-radius: 8px;">
            <span>✓ فتح استمارة التسجيل الرسمية</span>
            <span>←</span>
          </a>
        </div>

      </div>
    `;

    backdrop.style.display = 'flex';
  }

  close() {
    const backdrop = document.getElementById('shat-syllabus-modal-backdrop');
    if (backdrop) backdrop.style.display = 'none';
  }
}

export function initSyllabusViewer() {
  return new SyllabusViewer();
}
