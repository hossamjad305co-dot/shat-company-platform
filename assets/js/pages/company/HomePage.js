// SHAT Platform — Modular Company Home Page (pages/company/HomePage.js)
// Implements verified corporate identity strictly from C:\SHAT_Company official profile materials
import { t } from '../../locales/index.js';
import { PostCard } from '../../components/cms/PostCard.js';
import { cmsService } from '../../services/cms/cmsService.js';
import { Card, Badge, Button } from '../../components/ui/core.js';

export async function renderCompanyHomePage() {
  const posts = await cmsService.getPosts();

  // 8 Specialized Portfolios (Domain 02: What We Do)
  const portfolios = [
    {
      code: 'PORT-01',
      title: 'تأهيل العاملين في المجال الإنساني',
      en: 'Humanitarian Sector Development',
      desc: 'بناء كفاءات الاستجابة السريعة، وإدارة دورة المشروع الإنساني، والامتثال للالتزامات التسعة للمعيار الأساسي (CHS).'
    },
    {
      code: 'PORT-02',
      title: 'الحماية وصون السلامة (PSEA)',
      en: 'Protection & Safeguarding',
      desc: 'أطر وسياسات منع الاستغلال والاعتداء الجنسيين، وحماية الطفل، وتأسيس قنوات الإبلاغ الآمنة ومسارات الإحالة السرية.'
    },
    {
      code: 'PORT-03',
      title: 'تنمية وتمكين المرأة والطفل',
      en: 'Women & Child Development',
      desc: 'برامج مبنية على معاهدات CEDAW و CRC لتعزيز المشاركة القيادية، الحماية من العنف القائم على النوع الاجتماعي، وتكافؤ الفرص.'
    },
    {
      code: 'PORT-04',
      title: 'تنمية وتمكين الشباب',
      en: 'Youth Development & Empowerment',
      desc: 'تطوير المهارات القيادية والحياتية، ريادة الأعمال المجتمعية، والمشاركة الفاعلة في صنع القرار والتنمية المستدامة.'
    },
    {
      code: 'PORT-05',
      title: 'التعليم وتطوير المعلمين',
      en: 'Education & Teacher Development',
      desc: 'تأهيل الكوادر التربوية وفق معايير التعليم في الطوارئ (INEE)، وتطبيق التعلم القائم على الكفاءات والمناهج النشطة.'
    },
    {
      code: 'PORT-06',
      title: 'الإعلام والاتصال المؤسسي',
      en: 'Media & Strategic Communication',
      desc: 'بناء استراتيجيات المناصرة وكتابة قصص الأثر الإنساني وإدارة الحملات الرقمية والاتصال في الأزمات وحساسية النزاع.'
    },
    {
      code: 'PORT-07',
      title: 'المتابعة والتقييم والتعلم (MEL)',
      en: 'Monitoring, Evaluation & Learning',
      desc: 'تأسيس منظومات جمع البيانات الرقمية، ومؤشرات الأداء (KPIs)، وإعداد خطط الرصد، وتوثيق التعلم المؤسسي المستمر.'
    },
    {
      code: 'PORT-08',
      title: 'الاستشارات والتطوير المؤسسي',
      en: 'Institutional Development',
      desc: 'التقييم والتشخيص المؤسسي، التخطيط الاستراتيجي، إعادة هيكلة السياسات والإجراءات، والحوكمة الرشيدة ومكافحة الفساد.'
    }
  ];

  // International Standards & Humanitarian Frameworks with In-Depth Institutional Value (Domain 06 & Domain 03)
  const standardsMatrix = [
    {
      code: 'CHS',
      badge: 'جودة ومساءلة',
      title: 'المعيار الإنساني الأساسي للجودة والمساءلة',
      en: 'Core Humanitarian Standard (CHS)',
      whyItMatters: 'الإطار العالمي الأول الذي يضع المجتمعات والأشخاص المتأثرين في صلب الاستجابة، عبر 9 التزامات صارمة للجودة وحسن الإدارة.',
      howShatApplies: 'نساعد المنظمات على تقييم جاهزيتها المؤسسية للامتثال للالتزامات التسعة، وتصميم أدوات المساءلة المجتمعية (AAP)، وتدريب الفرق الميدانية على إدارة العمليات بشفافية كاملة.',
      deliverable: 'مصفوفة الامتثال للالتزامات التسعة • دليل آليات المساءلة والشكاوى • خطة التحسين المؤسسي المعتمدة.',
      route: '#/academy?filter=humanitarian'
    },
    {
      code: 'SPHERE',
      badge: 'معايير فنية دنيا',
      title: 'دليل المعايير الإنسانية الدنيا — إسفير',
      en: 'The Sphere Project Handbook',
      whyItMatters: 'الميثاق الإنساني العالمي الأهم الذي يحدد الحدود الفنية الدنيا المقبولة دولياً لحفظ الكرامة والحياة في قطاعات المياه، الصحة، المأوى، والأمن الغذائي.',
      howShatApplies: 'نراجع ونقيّم تصاميم المشاريع الإغاثية ومطابقتها للمؤشرات الكمية والنوعية (كميات المياه للفرد، مساحات الإيواء، التغذية) قبل التنفيذ، ونؤهل مديري الطوارئ على التخطيط المبني على المؤشرات.',
      deliverable: 'بطاقات التدقيق الفني للمشاريع • قوائم التحقق الميداني المطابقة لإسفير • إرشادات السلامة والكرامة.',
      route: '#/academy?filter=humanitarian'
    },
    {
      code: 'OECD DAC',
      badge: 'تقييم مستقل',
      title: 'معايير OECD DAC للتقييم المستقل',
      en: 'OECD DAC Evaluation Criteria',
      whyItMatters: 'المرجعية الذهبية المعتمدة لدى المانحين والأمم المتحدة لتقييم المشاريع وفق 6 أبعاد حاسمة: (الملاءمة، الاتساق، الفعالية، الكفاءة، الأثر، الاستدامة).',
      howShatApplies: 'نقود بعثات التقييم الخارجي المستقل (Independent External Evaluation) للمشاريع منتصف المدة والنهاية بأساليب كمية ونوعية دقيقة تضمن حياد النتائج ودقة قياس الأثر.',
      deliverable: 'تقارير التقييم الخارجي المستقل المعتمدة للمانحين • مصفوفات قياس الأثر • أدلة الدروس المستفادة.',
      route: '#/tracks'
    },
    {
      code: 'UNEG',
      badge: 'نزاهة وأخلاقيات',
      title: 'معايير فريق الأمم المتحدة للتقييم — UNEG',
      en: 'UN Evaluation Group Norms & Standards',
      whyItMatters: 'المعايير المرجعية الحاكمة لضمان استقلالية ونزاهة المقيمين، وحماية حقوق الإنسان، والمساواة الجندرية، وأخلاقيات البحث الميداني.',
      howShatApplies: 'نطبق ميثاق شرف صارم يمنع تضارب المصالح، ونطبق بروتوكولات الموافقة المستنيرة وحماية خصوصية وأمان المستفيدين والشهود في البيئات الهشة.',
      deliverable: 'ميثاق حوكمة التقييم الأخلاقي • بروتوكولات حماية البيانات الميدانية • مصفوفات فحص جودة الأدلة.',
      route: '#/tracks'
    },
    {
      code: 'PSEA',
      badge: 'صون السلامة',
      title: 'الحماية من الاستغلال والانتهاك وصون السلامة',
      en: 'Protection & PSEA Frameworks (IASC)',
      whyItMatters: 'أطر ملزمة دولياً لسياسة عدم التسامح المطلق (Zero Tolerance) مع أي شكل من أشكال الاستغلال وسوء السلوك الجنسي أو إيذاء الفئات المستضعفة.',
      howShatApplies: 'نبني سياسات صون السلامة (Safeguarding) للمؤسسات الشريكة، وننشئ قنوات إبلاغ سرية ومحمية، ونصيغ إجراءات التشغيل القياسية (SOPs) للإحالة الآمنة للضحايا.',
      deliverable: 'وثيقة سياسة صون السلامة المعتمدة • مصفوفة إدارة مخاطر الحماية • مسارات الإحالة الآمنة والدعم.',
      route: '#/course/PSEA-201'
    },
    {
      code: 'Do No Harm',
      badge: 'حساسية النزاع',
      title: 'إطار تجنب الضرر وحساسية النزاع',
      en: 'Do No Harm (DNH) Framework',
      whyItMatters: 'منهجية دقيقة تضمن ألا تساهم المساعدات أو المشاريع المؤسسية في إذكاء الصراعات أو تعميق الانقسامات المجتمعية وتفادي الآثار السلبية غير المقصودة.',
      howShatApplies: 'نجري تحليلاً عميقاً للسياق المحلي لتحديد عوامل الانقسام (Dividers) وعوامل الترابط (Connectors)، ونكيف التدخلات المؤسسية لتعزيز التماسك والعدالة في التوزيع.',
      deliverable: 'تقارير تقييم الحساسية للنزاع • خطط مواءمة المشاريع مع السياق • مصفوفات تقليل المخاطر المجتمعية.',
      route: '#/tracks'
    },
    {
      code: 'HRBA',
      badge: 'النهج الحقوقي',
      title: 'النهج القائم على حقوق الإنسان (HRBA)',
      en: 'Human Rights-Based Approach',
      whyItMatters: 'تحويل العمل التنموي والإنساني من مفهوم الإحسان إلى إعمال الحقوق القانونية والإنسانية وفق المواثيق الدولية (CRC, CEDAW).',
      howShatApplies: 'نمكن الفئات المستهدفة كأصحاب حقوق (Rights-Holders) ونطور قدرات المؤسسات الشريكة كحاملي واجب (Duty-Bearers) للالتزام بالشفافية والعدالة والمساءلة.',
      deliverable: 'أدلة إدماج حقوق الإنسان في الخطط الاستراتيجية • مؤشرات قياس المساواة وعدم التمييز.',
      route: '#/about'
    },
    {
      code: 'AAP',
      badge: 'المساءلة المجتمعية',
      title: 'المساءلة تجاه الأشخاص المتأثرين — AAP',
      en: 'Accountability to Affected People',
      whyItMatters: 'التزام جوهري بإشراك المجتمعات في جميع مراحل اتخاذ القرار والاستماع لأصواتهم وتقديم التغذية الراجعة بشفافية.',
      howShatApplies: 'نؤسس آليات الشكاوى والمقترحات (CFRM) الفعالة، ونعزز إشراك النساء والشباب وذوي الإعاقة في تصميم وتقييم الخدمات والبرامج.',
      deliverable: 'أدلة تشغيل قنوات الشكاوى والمقترحات • لوحات مؤشرات رضا المستفيدين • خطط الإشراك المجتمعي.',
      route: '#/course/CHS-101'
    }
  ];

  // 6 Phased Delivery Model (Domain 04: Our Delivery Model)
  const deliveryStages = [
    {
      num: '01',
      stepEn: 'Understand',
      stepAr: 'فهم الاحتياج والسياق',
      desc: 'قراءة الواقع المؤسسي والمجتمعي، وتحليل السياق الميداني والتحديات الحقيقية بالاستماع الفعّال للشريك.'
    },
    {
      num: '02',
      stepEn: 'Assess',
      stepAr: 'التشخيص وتحليل الفجوات',
      desc: 'تطبيق أدوات تشخيص منهجية لتحديد الفجوات المعرفية والتنظيمية بدقة، وتقييم مستوى الجاهزية المؤسسية.'
    },
    {
      num: '03',
      stepEn: 'Design',
      stepAr: 'تصميم التدخل أو الحل',
      desc: 'هندسة حلول وحقائب تدريبية واستشارية مخصصة ومبنية على الكفاءات، تلبي الاحتياج الفعلي بدقة.'
    },
    {
      num: '04',
      stepEn: 'Deliver',
      stepAr: 'التنفيذ ونقل المعرفة',
      desc: 'التطبيق الميداني التشاركي، ورش العمل التطبيقية، بناء قدرات الكوادر، وتأسيس السياسات والأنظمة.'
    },
    {
      num: '05',
      stepEn: 'Measure',
      stepAr: 'قياس النتائج والأداء',
      desc: 'رصد مؤشرات الأداء (KPIs)، تقييم مخرجات التعلم، والتحقق الميداني من تحول المعرفة إلى ممارسة فعلية.'
    },
    {
      num: '06',
      stepEn: 'Learn & Improve',
      stepAr: 'التعلم والتحسين المستمر',
      desc: 'مأسسة المعرفة، استخلاص الدروس المستفادة، ومرافقة المؤسسة لضمان الاستدامة والأثر طويل الأجل.'
    }
  ];

  // 10 Foundational Principles (Domain 05: Professional Approach)
  const professionalPrinciples = [
    { en: 'Evidence-Based Practice', ar: 'الممارسة القائمة على الأدلة', icon: '▲' },
    { en: 'Competency-Based Development', ar: 'التطوير القائم على الكفاءات', icon: '★' },
    { en: 'Human Rights-Based Approach', ar: 'النهج القائم على حقوق الإنسان', icon: '◈️' },
    { en: 'Do No Harm', ar: 'مبدأ عدم الإضرار', icon: '◈' },
    { en: 'Accountability', ar: 'المساءلة المؤسسية', icon: '✉' },
    { en: 'Inclusion & Non-Discrimination', ar: 'الشمول وعدم التمييز', icon: '◈' },
    { en: 'Safeguarding & Protection', ar: 'الحماية وصون السلامة', icon: '◈' },
    { en: 'Ethical Practice', ar: 'الممارسة الأخلاقية والنزاهة', icon: '⭐' },
    { en: 'Confidentiality & Data Protection', ar: 'السرية وحماية البيانات', icon: '▪' },
    { en: 'Quality & Continuous Improvement', ar: 'الجودة والتحسين المستمر', icon: '▲' }
  ];

  return `
    <div class="shat-company-homepage">
      <!-- Executive Hero Section -->
      <section class="home-hero-section" style="padding: clamp(40px, 8vw, 80px) 0; background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-page) 100%);">
        <div class="shat-container">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-2xl); align-items: center;">
            <div>
              <div class="hero-badge-pill" style="display: inline-flex; align-items: center; gap: 8px; background: var(--shat-green-100); color: var(--shat-green-950); padding: 6px 14px; border-radius: var(--radius-full); font-size: var(--font-size-caption); font-weight: 700; margin-bottom: var(--space-md); border: 1px solid var(--shat-green-200);">
                <span>✦</span>
                <span>بناء القدرات • تعزيز المؤسسات • تطوير النتائج</span>
              </div>
              <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); color: var(--shat-navy-950); line-height: 1.25; font-weight: 800; margin-bottom: var(--space-md);">
                نحو مؤسسات أكثر كفاءة، وقدرات تصنع الفارق المستدام
              </h1>
              <p style="font-size: var(--font-size-body-lg); color: var(--text-secondary); line-height: 1.75; margin-bottom: var(--space-xl); max-width: 640px;">
                شركة شات للتنمية والتطوير — بيت خبرة متخصص في التدريب، بناء القدرات، والاستشارات والتطوير المؤسسي. نعمل مع الأفراد والمؤسسات لربط المعرفة بالممارسة، وتحويل القدرات إلى أداء ونتائج قابلة للقياس وفق أعلى المرجعيات والمعايير الدولية والإنسانية.
              </p>
              <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
                <a href="#/academy" class="shat-btn shat-btn-primary shat-btn-lg" style="text-decoration: none;">
                  <span>◈ دخول منصة التعلم والأكاديمية</span>
                  <span class="shat-icon-directional">←</span>
                </a>
                <a href="#/tracks" class="shat-btn shat-btn-secondary shat-btn-lg" style="text-decoration: none;">
                  <span>استكشف المسارات الاستشارية</span>
                </a>
                <a href="#/apply" class="shat-btn shat-btn-outline shat-btn-lg" style="text-decoration: none; border-color: var(--shat-green-600); color: var(--shat-green-800);">
                  <span>▪ طلب الالتحاق والتدريب</span>
                </a>
              </div>
            </div>

            <!-- Hero Corporate Emblem Graphic -->
            <div style="display: flex; justify-content: center;">
              <div class="shat-card" style="padding: var(--space-xl); max-width: 440px; text-align: center; border: 1px solid var(--border-prominent); box-shadow: var(--shadow-lg); background: #ffffff;">
                <img src="assets/logo/logo-transparent.png" alt="SHAT Emblem" style="max-height: 110px; margin-bottom: var(--space-md);" onerror="this.src='assets/logo/logo-clean.jpg'" />
                <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0 0 6px 0;">شركة شات للتنمية والتطوير</h3>
                <div style="font-size: var(--font-size-caption); color: var(--shat-green-700); font-weight: 700; margin-bottom: var(--space-md);">SHAT Development & Growth</div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: var(--space-md); line-height: 1.5;">
                  الإنسان • المهارات • غدٌ أكثر إشراقاً<br>
                  <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">PEOPLE • SKILLS • A BRIGHTER TOMORROW</span>
                </p>
                <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                  <span class="shat-badge shat-badge-navy">تدريب معتمد</span>
                  <span class="shat-badge shat-badge-success">استشارات مؤسسية</span>
                  <span class="shat-badge shat-badge-info">تقييم مستقل</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Equation Formula (Domain 08: Value Proposition) -->
      <section style="background: var(--shat-navy-950); color: #ffffff; padding: var(--space-xl) 0; border-top: 3px solid var(--shat-green-600); border-bottom: 3px solid var(--shat-green-600);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 860px; margin: 0 auto;">
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--shat-green-300); letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase;">
              معادلة الأثر والقيمة المؤسسية • Our Value Proposition
            </div>
            <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px; font-weight: 800; font-size: clamp(1rem, 2.5vw, 1.35rem); color: #ffffff; margin-bottom: 12px;">
              <span style="background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 8px;">المعرفة (Knowledge)</span>
              <span style="color: var(--shat-green-400);">←</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 8px;">القدرة (Capacity)</span>
              <span style="color: var(--shat-green-400);">←</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 8px;">الممارسة (Practice)</span>
              <span style="color: var(--shat-green-400);">←</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 8px;">الأداء (Performance)</span>
              <span style="color: var(--shat-green-400);">←</span>
              <span style="background: var(--shat-green-600); color: #ffffff; padding: 6px 14px; border-radius: 8px;">النتائج (Results)</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--shat-navy-200); margin: 0; line-height: 1.6;">
              "شات ليست مجرد جهة تدريب؛ بل شريك استراتيجي في بناء القدرات، تطوير الأنظمة، وتحويل البيانات إلى نتائج ملموسة قابلة للقياس."
            </p>
          </div>
        </div>
      </section>

      <!-- Two Strategic Pillars -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-surface);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto var(--space-2xl) auto;">
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              الركيزتان الاستراتيجيتان للعمل المؤسسي
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              نرتكز في رؤيتنا على تكامل الاستشارات المؤسسية المتقدمة مع برامج التدريب وبناء القدرات المعتمدة دولياً.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-xl);">
            <div class="shat-card" style="border-inline-start: 5px solid var(--shat-navy-900); padding: var(--space-xl);">
              <div style="font-size: 2.2rem; margin-bottom: var(--space-sm);">◈</div>
              <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
                الركيزة الأولى: الاستشارات والتطوير المؤسسي
              </h3>
              <p style="font-size: var(--font-size-body); color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-md);">
                مساعدة المؤسسات والمنظمات على فهم الواقع المؤسسي، وتحديد الفجوات، وبناء الأنظمة والسياسات، وإجراء مهمات التقييم الخارجي المستقل وفق معايير OECD DAC و UNEG.
              </p>
              <div style="font-size: 0.88rem; color: var(--shat-navy-800); font-weight: 700; background: var(--shat-navy-50); padding: 10px 14px; border-radius: 8px;">
                ✓ الانتقال من التشخيص إلى التطوير • ومن التوصية إلى التطبيق المستمر
              </div>
            </div>

            <div class="shat-card" style="border-inline-start: 5px solid var(--shat-green-700); padding: var(--space-xl);">
              <div style="font-size: 2.2rem; margin-bottom: var(--space-sm);">◈</div>
              <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
                الركيزة الثانية: التدريب وبناء القدرات المتخصصة
              </h3>
              <p style="font-size: var(--font-size-body); color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-md);">
                برامج تدريبية متخصصة وتطبيقية مبنية على تحليل الاحتياجات الفعلي والتعلم القائم على الكفاءات، والمصممة وفق معايير CHS وإسفير، وربط مخرجات التعلم بالأداء الفعلي.
              </p>
              <div style="font-size: 0.88rem; color: var(--shat-green-900); font-weight: 700; background: var(--shat-green-50); padding: 10px 14px; border-radius: 8px;">
                ✓ برامج تطبيقية مبنية على الكفاءات • قياس دقيق لمخرجات التعلم والأداء
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6 Phased Delivery Model (Domain 04: Our Delivery Model) -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-page); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 780px; margin: 0 auto var(--space-2xl) auto;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--shat-navy-100); color: var(--shat-navy-900); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800; margin-bottom: 10px;">
              <span>⚙ منهجية العمل المعتمدة</span>
            </div>
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              كيف نعمل؟ — نموذج التدخل من الاحتياج إلى النتائج
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              رحلة متكاملة من 6 مراحل تضمن تحويل التحديات والاحتياجات المؤسسية إلى حلول قابلة للتطبيق ونتائج مستدامة.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg);">
            ${deliveryStages.map(st => `
              <div class="shat-card" style="padding: var(--space-lg); border-top: 4px solid var(--shat-navy-800); position: relative; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                  <span style="font-size: 1.4rem; font-weight: 900; color: var(--shat-green-700); font-family: var(--font-heading);">${st.num}</span>
                  <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${st.stepEn}</span>
                </div>
                <h4 style="font-size: 1.15rem; color: var(--shat-navy-950); margin-bottom: 8px;">${st.stepAr}</h4>
                <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.65; flex: 1;">${st.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Interactive International Standards & Humanitarian Frameworks (Domain 06 & Domain 03) -->
      <section id="standards-matrix-section" style="padding: var(--space-3xl) 0; background: #0b1f33; color: #ffffff;">
        <div class="shat-container">
          <div style="text-align: center; max-width: 820px; margin: 0 auto var(--space-2xl) auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.15); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.3); padding: 5px 14px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 800; margin-bottom: var(--space-sm);">
              <span>◈ المرجعيات والمعايير الدولية المعتمدة</span>
            </div>
            <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.4rem); color: #ffffff; margin-bottom: var(--space-sm); font-weight: 800;">
              منظومة المعايير الدولية وتطبيقاتها المؤسسية في شات
            </h2>
            <p style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.8;">
              المعايير الدولية في شركة شات ليست مجرد مسميات أو نصوص نظرية؛ بل هي <strong>الإطار التشغيلي الحاكم</strong> الذي يحكم استشاراتنا، حقائبنا التدريبية، وبناء السياسات، ومهمات التقييم المستقل لإنتاج مخرجات ميدانية ملموسة للشركاء والمتدربين.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-xl);">
            ${standardsMatrix.map(st => `
              <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: var(--radius-md); padding: var(--space-xl); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease, border-color 0.2s ease;" onmouseover="this.style.borderColor='rgba(34,197,94,0.6)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.12)'; this.style.transform='none'">
                <div>
                  <!-- Standard Header -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                    <span style="background: var(--shat-green-600); color: #ffffff; font-weight: 800; font-size: 0.8rem; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.5px;">
                      ${st.code}
                    </span>
                    <span style="font-size: 0.78rem; color: #94a3b8; font-weight: 600;">
                      ${st.badge}
                    </span>
                  </div>

                  <h3 style="font-size: 1.25rem; color: #ffffff; margin-bottom: 4px; line-height: 1.4;">
                    ${st.title}
                  </h3>
                  <div style="font-size: 0.82rem; color: #38bdf8; font-family: var(--font-body); margin-bottom: var(--space-md); font-weight: 600;">
                    ${st.en}
                  </div>

                  <!-- Why it matters -->
                  <div style="margin-bottom: var(--space-sm);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: #fde047; margin-bottom: 3px;">
                      ★ ما هو المعيار وقيمته المؤسسية؟
                    </div>
                    <p style="font-size: 0.9rem; color: #e2e8f0; line-height: 1.6; margin: 0;">
                      ${st.whyItMatters}
                    </p>
                  </div>

                  <!-- How SHAT applies it -->
                  <div style="margin-bottom: var(--space-sm); background: rgba(0,0,0,0.25); padding: 10px 12px; border-radius: 6px; border-right: 3px solid #38bdf8;">
                    <div style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; margin-bottom: 3px;">
                      ★ كيف تطبقه شات ميدانياً؟
                    </div>
                    <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6; margin: 0;">
                      ${st.howShatApplies}
                    </p>
                  </div>

                  <!-- Tangible Deliverable -->
                  <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.25); padding: 10px 12px; border-radius: 6px; margin-bottom: var(--space-md);">
                    <div style="font-size: 0.78rem; font-weight: 800; color: #86efac; margin-bottom: 2px;">
                      ✓ المخرج المؤسسي المحقق:
                    </div>
                    <div style="font-size: 0.85rem; color: #f1f5f9; line-height: 1.5;">
                      ${st.deliverable}
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div style="padding-top: var(--space-xs); border-top: 1px solid rgba(255,255,255,0.08);">
                  <a href="${st.route}" style="font-size: 0.85rem; font-weight: 700; color: #4ade80; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                    <span>استكشف المسار والبرنامج التدريبي</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 8 Training Portfolios Grid (Domain 02: What We Do) -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-surface);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto var(--space-2xl) auto;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--shat-green-100); color: var(--shat-green-950); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800; margin-bottom: 10px;">
              <span>▪ مجالاتنا التدريبية التخصصية</span>
            </div>
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              الحقائب والمجالات التدريبية المتخصصة
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              برامج تطبيقية معتمدة قائمة على الكفاءات، مصممة لسد فجوات الممارسة الميدانية وتحقيق نتائج قابلة للقياس.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-lg);">
            ${portfolios.map((p, idx) => `
              <div class="shat-card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid var(--shat-green-600);">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                    <span class="shat-badge shat-badge-navy">${p.code}</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">حقيبة معتمدة</span>
                  </div>
                  <h4 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 2px; line-height: 1.4;">
                    ${p.title}
                  </h4>
                  <div style="font-size: 0.78rem; color: var(--shat-green-700); font-weight: 700; margin-bottom: var(--space-xs);">
                    ${p.en}
                  </div>
                  <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.65;">
                    ${p.desc}
                  </p>
                </div>
                <div style="margin-top: var(--space-md); padding-top: var(--space-xs); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                  <a href="#/apply" style="font-size: var(--font-size-caption); font-weight: 700; color: var(--shat-green-700); text-decoration: none;">
                    تسجيل في المساق ←
                  </a>
                  <a href="#/academy" style="font-size: var(--font-size-caption); color: var(--text-muted); text-decoration: none;">
                    عرض التفاصيل
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 10 Foundational Principles (Domain 05: Professional Approach) -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-page); border-top: 1px solid var(--border-subtle);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 760px; margin: 0 auto var(--space-2xl) auto;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--shat-navy-100); color: var(--shat-navy-950); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800; margin-bottom: 10px;">
              <span>◈ المنهجية والقيم المهنية</span>
            </div>
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              منهجيتنا المهنية — المبادئ العشرة الحاكمة
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              تعتمد شات على منظومة من المبادئ الأخلاقية والمهنية التي تشكل حجر الأساس في تصميم وتنفيذ كافة برامجنا واستشاراتنا.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md);">
            ${professionalPrinciples.map(pr => `
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.8rem;">${pr.icon}</div>
                <div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950); line-height: 1.3;">
                    ${pr.ar}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">
                    ${pr.en}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Official Posts & News Section -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-surface);">
        <div class="shat-container">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
            <div>
              <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: 0 0 4px 0;">
                الأخبار والفعاليات الميدانية
              </h2>
              <p style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin: 0;">
                متابعة لأحدث الورش التدريبية، البعثات الاستشارية، وتقارير العمل الميداني المعتمدة.
              </p>
            </div>
            <a href="https://www.facebook.com/shat.development.growth/" target="_blank" rel="noopener" class="shat-btn shat-btn-outline shat-btn-sm" style="text-decoration: none;">
              <span>صفحتنا على فيسبوك ↗</span>
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-xl);">
            ${posts.map(post => PostCard({ post })).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}
