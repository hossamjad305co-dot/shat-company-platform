// assets/js/views/projectsView.js
// Corporate Projects & Field Interventions View for SHAT Company
import { content } from '../content.js';

export function renderProjectsView(lang = 'ar') {
  const isAr = lang === 'ar';

  const projects = [
    {
      code: 'PRJ-CHS-2025',
      title: isAr ? 'حوكمة وتطبيق المعيار الإنساني الأساسي (CHS) لمنظمات المجتمع المدني' : 'CHS Implementation & Governance Program for CSOs',
      client: isAr ? 'ائتلاف المنظمات الإنسانية والتنموية • قطاع غزة والضفة الغربية' : 'Humanitarian & Development CSOs Coalition',
      duration: isAr ? '8 أشهر • مكتمل بنجاح' : '8 Months • Successfully Completed',
      standard: 'Core Humanitarian Standard (CHS) & AAP',
      summary: isAr 
        ? 'بناء القدرات المؤسسية وتطوير سياسات المساءلة للمتأثرين (AAP) وقنوات الشكاوى والمقترحات السرية (CFRM) لـ 14 منظمة أهلية وفق الالتزامات التسعة.'
        : 'Institutional capacity strengthening and AAP/CFRM complaints mechanism design for 14 local NGOs aligned with the 9 CHS commitments.',
      outcomes: [
        isAr ? 'تأهيل 42 كادراً قيادياً في مجالات المساءلة والامتثال' : 'Trained 42 executive leaders in accountability',
        isAr ? 'صياغة 14 دليلاً تشغيلياً معتمداً للشكاوى والحماية' : 'Drafted 14 operational CFRM manuals',
        isAr ? 'إجراء تدقيق ميداني شامل للجاهزية والنزاهة المؤسسية' : 'Conducted field baseline readiness audits'
      ]
    },
    {
      code: 'PRJ-PSEA-2025',
      title: isAr ? 'تأسيس أطر الحماية وصون السلامة ومنع الاستغلال والانتهاك (PSEA)' : 'Protection & Safeguarding (PSEA) Framework Establishment',
      client: isAr ? 'شبكة حماية الطفولة والبرامج الإغاثية المشتركة' : 'Child Protection & Emergency Relief Network',
      duration: isAr ? '6 أشهر • معتمد رسمياً' : '6 Months • Formally Certified',
      standard: 'IASC Safeguarding & Do No Harm Principles',
      summary: isAr
        ? 'تصميم مدونات السلوك المؤسسية، وتأسيس مسارات الإحالة الآمنة والسرية، وتدريب لجان الحماية على فحص مخاطر الاستغلال في العمليات الميدانية وتوزيع المساعدات.'
        : 'Designing institutional codes of conduct, safe referral pathways, and training protection committees on risk screening.',
      outcomes: [
        isAr ? 'اعتماد سياسة صون السلامة وحماية الطفل في 8 مؤسسات' : 'PSEA & Child Safeguarding policies adopted by 8 entities',
        isAr ? 'تأسيس وحدة تحقيق سرية مدربة للتعامل مع الشكاوى الحساسة' : 'Trained confidential internal investigation units',
        isAr ? 'مواءمة إجراءات التوظيف والتعاقد مع معايير التدقيق المسبق' : 'Vetting & background checks integrated into HR SOPs'
      ]
    },
    {
      code: 'PRJ-DAC-2024',
      title: isAr ? 'التقييم الخارجي المستقل لمشاريع التعافي الاقتصادي والتمكين' : 'OECD DAC Independent External Evaluation for Livelihoods',
      client: isAr ? 'وكالة تنموية دولية مانحة' : 'International Donor Agency',
      duration: isAr ? '4 أشهر • تقرير نهائي منشور' : '4 Months • Published Final Report',
      standard: 'OECD DAC Criteria (Relevance, Efficiency, Impact, Sustainability)',
      summary: isAr
        ? 'تقييم مستقل وشامل لأثر برامج التدريب المهني والمنح النقدية الصغيرة، استند إلى 180 مقابلة ميدانية و12 حلقة نقاش بؤرية وفق المعايير الستة المعتمدة.'
        : 'Independent evaluation assessing livelihoods and cash grants, based on 180 field interviews and 12 focus group discussions.',
      outcomes: [
        isAr ? 'تحليل معدلات استدامة المشاريع الصغيرة بعد 12 شهراً' : '12-month post-intervention sustainability analytics',
        isAr ? 'إصدار مصفوفة توصيات تنفيذية لصناع القرار والمانحين' : 'Strategic executive recommendations for donors',
        isAr ? 'توثيق أفضل الممارسات وقصص الأثر الإيجابي' : 'Documented impact stories and institutional learning'
      ]
    },
    {
      code: 'PRJ-GOV-2024',
      title: isAr ? 'إعادة هيكلة الحوكمة وتطوير اللوائح التشغيلية (SOPs)' : 'Governance Restructuring & Operational SOPs Development',
      client: isAr ? 'المؤسسة الوطنية للتنمية الاجتماعية' : 'National Social Development Foundation',
      duration: isAr ? '5 أشهر • مكتمل' : '5 Months • Completed',
      standard: 'Institutional Governance & Accountability Standards',
      summary: isAr
        ? 'إعداد الهيكل التنظيمي المتكامل، بطاقات الوصف الوظيفي، اللائحة المالية والإدارية، ولائحة المشتريات واللوازم بما يتوافق مع متطلبات الامتثال الدولية.'
        : 'Developing comprehensive organizational charts, job descriptions, financial, HR, and procurement SOPs.',
      outcomes: [
        isAr ? 'إعداد 9 أدلة تشغيلية قياسية معتمدة من مجلس الإدارة' : '9 board-approved standard operating procedures',
        isAr ? 'مواءمة إدارة المخاطر وتضارب المصالح مع المعايير الفضلى' : 'Risk management & conflict of interest protocols',
        isAr ? 'تحسين كفاءة اتخاذ القرار وتوزيع المسؤوليات بنسبة 40%' : 'Decision-making workflow efficiency boosted by 40%'
      ]
    }
  ];

  return `
    <div class="view-projects">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${isAr ? 'سجل الإنجاز والخبرة الميدانية • Track Record' : 'Track Record & Projects'}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${isAr ? 'المشاريع والتدخلات الاستشارية المعتمدة' : 'Featured Institutional Projects & Interventions'}</h1>
            <p class="section-desc">
              ${isAr 
                ? 'نماذج من التدخلات المؤسسية، وعمليات التقييم الخارجي المستقل، وتطوير أطر الحوكمة والامتثال التي نفذها خبراء شركة شات لصالح المنظمات الشريكة.'
                : 'Selected institutional interventions, independent external evaluations, and governance frameworks delivered by SHAT experts.'}
            </p>
          </div>
        </div>
      </section>

      <!-- Projects Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2">
            ${projects.map(p => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="bento-header" style="margin-bottom: 12px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); padding: 3px 8px; border-radius: var(--radius-xs);">
                      ${p.code}
                    </span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
                      ${p.duration}
                    </span>
                  </div>

                  <h3 class="bento-title" style="font-size: 1.25rem; margin-bottom: 8px;">${p.title}</h3>
                  <div style="font-size: 0.82rem; color: var(--shat-navy); font-weight: 700; margin-bottom: 10px;">
                    الجهة الشريكة: <span style="color: var(--text-secondary); font-weight: 600;">${p.client}</span>
                  </div>
                  
                  <div style="display: inline-block; background: #EFF6FF; color: #1D4ED8; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-bottom: 12px;">
                    المرجعية: ${p.standard}
                  </div>

                  <p class="bento-text" style="margin-bottom: 16px; font-size: 0.9rem; line-height: 1.7;">
                    ${p.summary}
                  </p>

                  <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px; border: 1px solid var(--border-light);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">أهم المخرجات والنتائج المحققة:</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                      ${p.outcomes.map(o => `
                        <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
                          <span style="color: var(--shat-green); font-weight: bold;">✓</span>
                          <span>${o}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <div class="bento-footer" style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; color: var(--text-muted);">وثائق التقييم موثقة رسمياً</span>
                  <a href="#/contact" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                    <span>طلب تدخل مماثل</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom CTA -->
          <div style="margin-top: 48px; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 36px; background: var(--bg-subtle); text-align: center;">
            <h3 style="font-size: 1.3rem; color: var(--shat-navy); margin-bottom: 8px;">هل تحتاج مؤسستكم إلى تقييم مستقل أو تطوير مؤسسي معتمد؟</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 24px auto; line-height: 1.8;">
              يقدم فريق خبراء شركة شات دراسات الجدوى والتقييم المؤسسي وصياغة السياسات التشغيلية وفق أعلى معايير الجودة الدولية.
            </p>
            <a href="#/contact" class="btn-clean btn-primary btn-lg">
              <span>طلب استشارة وعرض فني متكامل</span>
              <span>←</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}
