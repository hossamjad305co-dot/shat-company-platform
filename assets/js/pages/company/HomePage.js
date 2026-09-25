// SHAT Platform — Modular Company Home Page (pages/company/HomePage.js)
// Implements verified corporate identity strictly from Phase 0 Content Audit
import { t } from '../../locales/index.js';
import { PostCard } from '../../components/cms/PostCard.js';
import { cmsService } from '../../services/cms/cmsService.js';
import { Card, Badge, Button } from '../../components/ui/core.js';

export async function renderCompanyHomePage() {
  const posts = await cmsService.getPosts();

  const portfolios = [
    { title: 'المعيار الإنساني الأساسي (CHS)', desc: 'تطبيق الالتزامات التسعة للجودة والمساءلة وتصميم آليات AAP.' },
    { title: 'صون السلامة والحماية (PSEA)', desc: 'سياسات منع الاستغلال والانتهاك الجنسيين وتأسيس قنوات الإبلاغ الآمنة.' },
    { title: 'التقييم المستقل للمشاريع (OECD DAC)', desc: 'تطبيق معايير الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة.' },
    { title: 'إدارة دورة المشروع الإنساني والتنموي', desc: 'إعداد وثائق المشاريع، مصفوفة المنطق (Logframe)، ومؤشرات الأداء KPI.' },
    { title: 'إدارة المخاطر وتجنب الضرر (Do No Harm)', desc: 'تحليل السياق الحساس، تقييم المخاطر الميدانية، واستمرارية العمليات.' },
    { title: 'الحوكمة الرشيدة والشفافية المؤسسية', desc: 'مكافحة الاحتيال والفساد، والتدقيق الإداري والمالي المستقل.' },
    { title: 'إدارة الموارد البشرية والقيادة التنفيذية', desc: 'تأهيل القيادات، سياسات العمل العادل، وتطوير فرق الاستجابة.' },
    { title: 'المتابعة والتقييم والمساءلة والتعلم (MEAL)', desc: 'أنظمة جمع البيانات الرقمية، خطط المتابعة، والدروس المستفادة.' }
  ];

  const standards = [
    'Core Humanitarian Standard (CHS)',
    'The Sphere Handbook',
    'OECD DAC Evaluation Criteria',
    'UNEG Evaluation Norms & Standards',
    'IASC Guidelines on PSEA',
    'Do No Harm (DNH) Framework',
    'INEE Minimum Standards for Education',
    'ISO 9001:2015 Quality Principles'
  ];

  return `
    <div class="shat-company-homepage">
      <!-- Executive Hero Section -->
      <section class="home-hero-section" style="padding: clamp(40px, 8vw, 80px) 0; background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-page) 100%);">
        <div class="shat-container">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-2xl); align-items: center;">
            <div>
              <div class="hero-badge-pill" style="display: inline-flex; align-items: center; gap: 8px; background: var(--shat-green-100); color: var(--shat-green-950); padding: 6px 14px; border-radius: var(--radius-full); font-size: var(--font-size-caption); font-weight: 700; margin-bottom: var(--space-md); border: 1px solid var(--shat-green-200);">
                <span>✨</span>
                <span>بناء القدرات • تعزيز المؤسسات • تطوير النتائج</span>
              </div>
              <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); color: var(--shat-navy-950); line-height: 1.25; font-weight: 800; margin-bottom: var(--space-md);">
                نحو مؤسسات أكثر كفاءة، وقدرات تصنع الفارق المستدام
              </h1>
              <p style="font-size: var(--font-size-body-lg); color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-xl); max-width: 640px;">
                شركة شات للتنمية والتطوير — بيت خبرة استشاري وتدريبي متخصص في بناء القدرات، الحوكمة المؤسسية، صون السلامة والحماية (PSEA)، والتقييم المستقل للمشاريع وفق أعلى المعايير الدولية والإنسانية.
              </p>
              <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
                <a href="#/academy" class="shat-btn shat-btn-primary shat-btn-lg" style="text-decoration: none;">
                  <span>🎓 دخول أكاديمية شات والمودل</span>
                  <span class="shat-icon-directional">←</span>
                </a>
                <a href="#/what-we-make" class="shat-btn shat-btn-secondary shat-btn-lg" style="text-decoration: none;">
                  <span>استكشف خدماتنا الاستشارية</span>
                </a>
              </div>
            </div>

            <!-- Hero Corporate Emblem Graphic -->
            <div style="display: flex; justify-content: center;">
              <div class="shat-card" style="padding: var(--space-xl); max-width: 440px; text-align: center; border: 1px solid var(--border-prominent); box-shadow: var(--shadow-lg);">
                <img src="assets/logo/logo-transparent.png" alt="SHAT Emblem" style="max-height: 110px; margin-bottom: var(--space-md);" onerror="this.src='assets/logo/logo-clean.jpg'" />
                <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0 0 6px 0;">شركة شات للتنمية والتطوير</h3>
                <div style="font-size: var(--font-size-caption); color: var(--shat-green-700); font-weight: 700; margin-bottom: var(--space-md);">SHAT Development & Growth</div>
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

      <!-- Two Strategic Pillars -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-surface);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto var(--space-2xl) auto;">
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              الركيزتان الاستراتيجيتان للعمل المؤسسي
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              نرتكز في رؤيتنا على تكامل الاستشارات المؤسسية المتقدمة مع برامج التدريب العملي المعتمد دولياً.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-xl);">
            <div class="shat-card" style="border-inline-start: 5px solid var(--shat-navy-900);">
              <div style="font-size: 2rem; margin-bottom: var(--space-sm);">🏛️</div>
              <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
                الركيزة الأولى: الاستشارات والتطوير المؤسسي
              </h3>
              <p style="font-size: var(--font-size-body); color: var(--text-secondary); line-height: 1.7;">
                تطوير النظم، بناء السياسات الداخلية، مواءمة الهياكل التنظيمية، وإجراء التقييمات الميدانية المستقلة للمشاريع وفق معايير OECD DAC و UNEG.
              </p>
            </div>

            <div class="shat-card" style="border-inline-start: 5px solid var(--shat-green-700);">
              <div style="font-size: 2rem; margin-bottom: var(--space-sm);">🎓</div>
              <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
                الركيزة الثانية: التدريب وبناء القدرات المتخصصة
              </h3>
              <p style="font-size: var(--font-size-body); color: var(--text-secondary); line-height: 1.7;">
                تأهيل الكوادر وتطوير المهارات العملية عبر دبلومات مهنية معتمدة تلتزم بمعايير المعيار الإنساني الأساسي (CHS) ودليل إسفير (Sphere).
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 8 Training Portfolios Grid -->
      <section style="padding: var(--space-3xl) 0; background: var(--bg-page);">
        <div class="shat-container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto var(--space-2xl) auto;">
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin-bottom: var(--space-xs);">
              الحقائب التدريبية التخصصية الثماني
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-muted);">
              برامج تنفيذية متقدمة مصممة لنقل المعرفة إلى ممارسة ميدانية قابلة للقياس.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-lg);">
            ${portfolios.map((p, idx) => `
              <div class="shat-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                    <span class="shat-badge shat-badge-navy">حقيبة 0${idx + 1}</span>
                  </div>
                  <h4 style="font-size: var(--font-size-h4); color: var(--text-primary); margin-bottom: var(--space-xs); line-height: 1.4;">
                    ${p.title}
                  </h4>
                  <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.6;">
                    ${p.desc}
                  </p>
                </div>
                <div style="margin-top: var(--space-md); padding-top: var(--space-xs); border-top: 1px solid var(--border-subtle);">
                  <a href="#/academy" style="font-size: var(--font-size-caption); font-weight: 700; color: var(--shat-green-700); text-decoration: none;">
                    تسجيل في المساق عبر المودل ←
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- International Standards Bar -->
      <section style="padding: var(--space-2xl) 0; background: var(--shat-navy-900); color: #fff;">
        <div class="shat-container">
          <div style="text-align: center; margin-bottom: var(--space-xl);">
            <h3 style="color: #fff; font-size: var(--font-size-h3); margin-bottom: 4px;">المرجعيات والمعايير الدولية المعتمدة</h3>
            <p style="color: var(--shat-navy-200); font-size: var(--font-size-body-sm);">نلتزم بأدق المعايير المهنية والإنسانية المعترف بها عالمياً</p>
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-md);">
            ${standards.map(s => `
              <span style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 8px 16px; border-radius: var(--radius-sm); font-size: var(--font-size-body-sm); color: #fff;">
                ✓ ${s}
              </span>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Official Posts Section -->
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
