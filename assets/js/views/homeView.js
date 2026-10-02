// assets/js/views/homeView.js
// World-Class Executive Platform Experience for SHAT Development & Growth
// Agency-Tier Architecture: Double-Bezel, Haptic Depth, Interactive Tools Suite & Total Interconnectedness
// 100% Trilingual Support (العربية AR, English EN, Français FR)

import { content } from '../content.js';
import { translations } from '../translations.js';
import { icons } from '../icons.js';
import { showToast } from '../components/toast.js';
import { standardsExplorer } from '../tools/standardsExplorer.js';
import { toolkitsLibrary } from '../tools/toolkitsLibrary.js';
import { renderTrainingCalendarSection, bindTrainingCalendarEvents } from '../components/trainingCalendar.js';
import { renderFaqSection, bindFaqEvents } from '../components/faqSection.js';

export function renderHomeView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const c = d.company;
  const h = d.home || content.ar.home;
  const eq = d.valueEquation;
  const pillars = d.twoPillars;
  const stList = d.standards.slice(0, 6);
  const portfolios = d.portfolios.slice(0, 6);
  const stages = d.deliveryModel.stages;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);

  const soc = (translations[lang] || translations.ar).socialSection || translations.ar.socialSection;
  const socPosts = soc.posts || [];

  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  return `
    <div class="view-home">
      
      <!-- ==================================================================== -->
      <!-- 1. World-Class Executive Hero Section                                -->
      <!-- ==================================================================== -->
      <section class="section hero-executive-section" style="padding: 72px 0 40px; background: radial-gradient(circle at 50% 10%, rgba(15,46,74,0.04) 0%, #FFFFFF 85%);">
        <div class="container">
          <div style="max-width: 920px; margin: 0 auto; text-align: center;">
            
            <!-- Live Operational Eyebrow Tag -->
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #FFFFFF; border: 1px solid var(--border-light); padding: 6px 16px; border-radius: 9999px; box-shadow: var(--shadow-sm); margin-bottom: 22px;">
              <span class="live-pulse-dot" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981;"></span>
              <span style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy);">
                ${txt('بيت خبرة واستشارات دولي معتمد • International Advisory House', 'Accredited International Advisory & Capacity Development House', 'Maison Internationale d’Expertise & de Conseil')}
              </span>
            </div>

            <!-- Primary Headline: Rock-solid locked font size -->
            <h1 class="hero-headline" style="font-size: 2.75rem; color: var(--shat-navy); line-height: 1.25; font-weight: 900; margin-bottom: 22px; letter-spacing: -0.01em;">
              ${c.motto}
            </h1>

            <!-- Subtitle -->
            <p class="hero-subheadline" style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 34px; max-width: 780px; margin-inline: auto; font-weight: 500;">
              ${h.heroSubtitle}
            </p>

            <!-- Nested Island Button Architecture -->
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px;">
              <a href="#/${lang}/academy" class="btn-island btn-island-primary">
                <span>${h.exploreAcademy}</span>
                <span class="icon-circle">${arrow}</span>
              </a>
              <button type="button" class="btn-island btn-island-secondary btn-open-diagnostic">
                <span>${txt('أداة التشخيص المؤسسي الفوري', 'Instant Readiness Diagnostic', 'Diagnostic Institutionnel')}</span>
                <span class="icon-circle">${icons.search('', 14)}</span>
              </button>
              <a href="#/${lang}/services" class="btn-island btn-island-secondary" style="background: transparent; color: var(--shat-navy); border-color: var(--border-medium);">
                <span>${h.exploreServices}</span>
                <span class="icon-circle" style="background: var(--bg-subtle); color: var(--shat-navy);">${arrow}</span>
              </a>
            </div>

            <!-- High-Contrast Executive Metrics Counter Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; max-width: 880px; margin: 0 auto;">
              <div class="metric-pill-box">
                <span style="font-size: 1.5rem; font-weight: 900; color: var(--shat-navy);"></span>
                <div style="text-align: ${isRtl ? 'right' : 'left'};">
                  <div style="font-size: 1.45rem; font-weight: 900; color: var(--shat-navy); font-family: var(--font-mono); line-height: 1.1;">14+</div>
                  <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700;">${txt('منظمات شريكة وحكومية', 'Partner Organizations', 'Organisations Partenaires')}</div>
                </div>
              </div>

              <div class="metric-pill-box">
                <span style="font-size: 1.5rem; font-weight: 900; color: var(--shat-green);"></span>
                <div style="text-align: ${isRtl ? 'right' : 'left'};">
                  <div style="font-size: 1.45rem; font-weight: 900; color: var(--shat-green); font-family: var(--font-mono); line-height: 1.1;">420+</div>
                  <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700;">${txt('كادراً قيادياً معتمداً', 'Accredited Leaders', 'Cadres Dirigeants Formés')}</div>
                </div>
              </div>

              <div class="metric-pill-box">
                <span style="font-size: 1.5rem; font-weight: 900; color: var(--shat-navy);"></span>
                <div style="text-align: ${isRtl ? 'right' : 'left'};">
                  <div style="font-size: 1.45rem; font-weight: 900; color: var(--shat-navy); font-family: var(--font-mono); line-height: 1.1;">8</div>
                  <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700;">${txt('حقائب تدريبية واستشارية', 'Specialized Portfolios', 'Portefeuilles Métiers')}</div>
                </div>
              </div>

              <div class="metric-pill-box">
                <span style="font-size: 1.5rem; font-weight: 900; color: #047857;"></span>
                <div style="text-align: ${isRtl ? 'right' : 'left'};">
                  <div style="font-size: 1.45rem; font-weight: 900; color: #047857; font-family: var(--font-mono); line-height: 1.1;">100%</div>
                  <div style="font-size: 0.76rem; color: #1E293B; font-weight: 700;">${txt('امتثال لمعايير CHS & PSEA', 'CHS & PSEA Compliance', 'Conformité CHS & PSEA')}</div>
                </div>
              </div>
            </div>

            <!-- Interactive Fast-Track Program & Form Finder (Double-Bezel Architecture) -->
            <div class="fast-track-finder-shell" style="
              margin-top: 40px;
              background: rgba(255, 255, 255, 0.75);
              border: 1px solid rgba(226, 232, 240, 0.9);
              padding: 8px;
              border-radius: 20px;
              box-shadow: 0 16px 40px -12px rgba(11, 30, 54, 0.08);
              text-align: right;
            ">
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                  <div>
                    <span style="font-size: 0.78rem; font-weight: 800; color: #1E7E34; background: #E8F5E9; padding: 4px 12px; border-radius: 6px;">
                      ${txt('مستكشف البرامج والاستمارات المعتمدة 2026', 'Accredited Programs & Forms Finder 2026', 'Explorateur Rapide')}
                    </span>
                    <h2 style="font-size: 1.15rem; font-weight: 900; color: var(--shat-navy, #0B1E36); margin: 6px 0 0;">
                      ${txt('اختر تخصصك واستعرض استمارة التسجيل الرسمية فوراً', 'Select your domain to access the verified registration form', 'Sélectionnez votre domaine')}
                    </h2>
                  </div>

                  <!-- 4 Interactive Tabs -->
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="finder-tabs">
                    <button type="button" class="btn-clean finder-tab active" data-track="case-management" style="background: var(--shat-navy, #0B1E36); color: #FFFFFF; font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 20px; transition: all 0.15s ease;">
                      ${txt('إدارة الحالة', 'Case Management', 'Gestion de Cas')}
                    </button>
                    <button type="button" class="btn-clean finder-tab" data-track="presentation" style="background: #F1F5F9; color: #475569; font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 20px; transition: all 0.15s ease;">
                      ${txt('مهارات العرض', 'Presentation Skills', 'Prise de Parole')}
                    </button>
                    <button type="button" class="btn-clean finder-tab" data-track="humanitarian" style="background: #F1F5F9; color: #475569; font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 20px; transition: all 0.15s ease;">
                      ${txt('دبلوم CHS', 'CHS Diploma', 'Diplôme CHS')}
                    </button>
                    <button type="button" class="btn-clean finder-tab" data-track="consulting" style="background: #F1F5F9; color: #475569; font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 20px; transition: all 0.15s ease;">
                      ${txt('استشارات مؤسسية', 'Institutional Consulting', 'Conseil Institutionnel')}
                    </button>
                  </div>
                </div>

                <!-- Active Track Dynamic Showcase Card -->
                <div id="finder-showcase-content">
                  <!-- Populated dynamically via JS -->
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 2. Value Equation Bar (Seamless Connection)                         -->
      <!-- ==================================================================== -->
      <section class="section-subtle" style="padding: 38px 0; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 16px;">
            <span style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); text-transform: uppercase; letter-spacing: 0.05em;">
              ${h.valueEqBadge}
            </span>
          </div>
          <div class="value-formula-row">
            ${eq.steps.map((st, i) => `
              <div class="formula-step">
                <div class="formula-label">${st.label}</div>
                <div class="formula-en">${st.key}</div>
              </div>
              ${i < eq.steps.length - 1 ? `<div class="formula-arrow">${arrow}</div>` : ''}
            `).join('')}
          </div>
          <p style="text-align: center; font-size: 0.95rem; color: var(--text-secondary); max-width: 760px; margin: 0 auto; line-height: 1.7; font-weight: 600;">
            ${h.valueEqQuote}
          </p>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 3. Interactive Tools Suite Showcase                                  -->
      <!-- ==================================================================== -->
      <section class="section" style="background: #FFFFFF; padding: 70px 0;">
        <div class="container">
          <div class="section-header" style="text-align: center; max-width: 820px; margin: 0 auto 40px auto;">
            <span class="section-badge">${txt('منظومة الأدوات التفاعلية • Interactive Suite', 'Interactive Institutional Tools', 'Boîte à Outils Interactive')}</span>
            <h2 class="section-title">${txt('أدوات رقمية متقدمة لقياس الجاهزية والتحقق والامتثال', 'Digital Tools for Diagnostic, Verification & Compliance', 'Outils Numériques pour la Conformité et l’Évaluation')}</h2>
            <p class="section-desc">${txt('حلول ذكية طُوّرت خصيصاً لمساعدة قادة المنظمات الإنسانية والتنموية في اتخاذ قرارات مدروسة قائمة على المعايير.', 'Smart tools engineered to empower humanitarian and development leaders in data-driven decision making.', 'Des outils conçus pour guider les décideurs dans le respect des normes.')}</p>
          </div>

          <div class="bento-grid grid-3">
            
            <!-- Tool 1: Institutional Diagnostic -->
            <div class="double-bezel">
              <div class="double-bezel-inner">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 1.5rem; color: var(--shat-navy); font-weight: 900;"></span>
                    <span class="badge badge-primary">${txt('فوري • مجاني', 'Instant • Free', 'Instantané')}</span>
                  </div>
                  <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
                    ${txt('أداة التقييم والتشخيص المؤسسي', 'Institutional Readiness Diagnostic', 'Diagnostic de Préparation')}
                  </h3>
                  <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${txt('قياس نضج المؤسسة في 4 محاور (CHS, PSEA, MEAL, الحوكمة) وإصدار خارطة طريق تنفيذية لسد الفجوات.', 'Assess maturity across 4 pillars with an automated roadmap for compliance gaps.', 'Mesurez la maturité sur 4 piliers.')}
                  </p>
                </div>
                <div>
                  <button type="button" class="btn-clean btn-primary btn-sm btn-open-diagnostic" style="width: 100%;">
                    <span>${txt('بدء التشخيص المؤسسي الآن', 'Start Diagnostic', 'Lancer le Diagnostic')}</span>
                    <span>${arrow}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Tool 2: Certificate Validator -->
            <div class="double-bezel">
              <div class="double-bezel-inner">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 1.5rem; color: var(--shat-green); font-weight: 900;"></span>
                    <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800;">${txt('موثق رسمياً', 'Accredited', 'Homologué')}</span>
                  </div>
                  <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
                    ${txt('نظام التحقق من الشهادات الرقمية', 'Digital Certificate Verification', 'Vérification de Certificats')}
                  </h3>
                  <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${txt('تحقق فوري من صحة الدبلومات الصادرة من شركة شات، وسجل الساعات التدريبية والجدارات المحققة للجهات المانحة وأرباب العمل.', 'Instant verification of SHAT issued diplomas and authenticated competencies.', 'Vérification en direct des diplômes.')}
                  </p>
                </div>
                <div>
                  <button type="button" class="btn-clean btn-secondary btn-sm btn-open-cert-validator" style="width: 100%;">
                    <span>${txt('التحقق من رقم الشهادة', 'Verify Credential ID', 'Vérifier un Matricule')}</span>
                    <span>${arrow}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Tool 3: Global Spotlight Search -->
            <div class="double-bezel">
              <div class="double-bezel-inner">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 1.5rem; color: var(--shat-navy); font-weight: 900;">•</span>
                    <span class="badge" style="background: var(--shat-navy-tint); color: var(--shat-navy); font-weight: 700;">Ctrl+K</span>
                  </div>
                  <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
                    ${txt('محرك البحث الذكي الموحد', 'Unified Spotlight Search', 'Recherche Unifiée')}
                  </h3>
                  <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${txt('بحث سريع ومباشر عبر قاعدة معرفية شاملة تشمل المقررات، الخدمات، المعايير، والمشاريع الميدانية.', 'Instant search indexing courses, advisory services, global standards, and projects.', 'Indexation instantanée de tous les contenus.')}
                  </p>
                </div>
                <div>
                  <button type="button" class="btn-clean btn-sm btn-trigger-spotlight" style="width: 100%; background: var(--bg-subtle); border: 1px solid var(--border-medium); color: var(--shat-navy); font-weight: 700;">
                    <span>${txt('فتح نافذة البحث السريع', 'Open Search Modal', 'Ouvrir la Recherche')}</span>
                    <span>•</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Embedded Interactive Standards Explorer Checklist -->
          <div style="margin-top: 48px;">
            ${standardsExplorer.renderSection(lang)}
          </div>

        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 4. Two Strategic Pillars (Double-Bezel Layout)                      -->
      <!-- ==================================================================== -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.pillarsBadge}</span>
            <h2 class="section-title">${h.pillarsTitle}</h2>
            <p class="section-desc">${h.pillarsSubtitle}</p>
          </div>

          <div class="bento-grid grid-2">
            ${pillars.map(p => `
              <div class="double-bezel">
                <div class="double-bezel-inner" style="border-top: 4px solid var(--shat-navy);">
                  <div>
                    <div class="bento-header" style="margin-bottom: 12px;">
                      <span class="section-badge">${p.badge}</span>
                      <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700;">Pillar Component</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.35rem;">${p.title}</h3>
                    <div class="bento-en" style="color: var(--shat-navy); font-weight: 700; margin-bottom: 12px;">${p.en}</div>
                    <p class="bento-text" style="line-height: 1.7; font-size: 0.95rem;">${p.desc}</p>
                  </div>
                  <div class="bento-footer" style="margin-top: 20px; border-top: 1px solid var(--border-light); padding-top: 16px;">
                    <a href="#/${lang}/services" class="btn-island btn-island-secondary" style="width: 100%; justify-content: space-between;">
                      <span>${lang === 'fr' ? 'Détails des Solutions & Méthodologie' : (isRtl ? 'تفاصيل المنظومة والحلول الاستشارية' : 'Solutions & Advisory Details')}</span>
                      <span class="icon-circle">${arrow}</span>
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 5. 6-Stage Delivery Model                                           -->
      <!-- ==================================================================== -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.deliveryBadge}</span>
            <h2 class="section-title">${h.deliveryTitle}</h2>
            <p class="section-desc">${h.deliverySubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${stages.map(st => `
              <div class="double-bezel">
                <div class="double-bezel-inner">
                  <div>
                    <div class="bento-header" style="margin-bottom: 8px;">
                      <span class="step-number" style="font-size: 1.3rem;">${st.num}</span>
                      <span class="bento-kicker">${st.en}</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.15rem;">${st.ar || st.title}</h3>
                    <p class="bento-text" style="line-height: 1.6;">${st.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <a href="#/${lang}/delivery" class="btn-island btn-island-secondary">
              <span>${h.exploreDelivery}</span>
              <span class="icon-circle">${arrow}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 6. International Standards Matrix (High Contrast Navy)               -->
      <!-- ==================================================================== -->
      <section class="section section-navy" style="background: #0A1B2A; color: #FFFFFF;">
        <div class="container">
          <div class="section-header" style="text-align: center; max-width: 820px; margin: 0 auto 40px auto;">
            <span class="section-badge" style="background: rgba(255,255,255,0.1); color: #6EE7B7; border: 1px solid rgba(110,231,183,0.3);">${h.standardsBadge}</span>
            <h2 class="section-title" style="color: #FFFFFF;">${h.standardsTitle}</h2>
            <p class="section-desc" style="color: #CBD5E1;">${h.standardsSubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${stList.map(st => {
              const standardRoute = st.route ? st.route.replace(/^#\/?/, `#/${lang}/`) : `#/${lang}/standards`;
              return `
              <div class="bento-card" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="bento-header" style="margin-bottom: 10px;">
                    <span style="font-size: 0.85rem; font-weight: 800; color: #4ADE80; font-family: var(--font-mono); background: rgba(74,222,128,0.15); padding: 3px 8px; border-radius: 4px;">${st.code}</span>
                    <span style="font-size: 0.76rem; color: #94A3B8;">${st.badge}</span>
                  </div>
                  <h3 class="bento-title" style="font-size: 1.18rem; color: #FFFFFF; margin-bottom: 4px;">${st.title}</h3>
                  <div class="bento-en" style="color: #93C5FD; font-size: 0.78rem; margin-bottom: 12px;">${st.en}</div>
                  
                  <div style="background: rgba(255,255,255,0.06); padding: 12px; border-radius: var(--radius-xs); border-${isRtl ? 'right' : 'left'}: 3px solid #38BDF8; margin-bottom: 12px;">
                    <div style="font-size: 0.78rem; font-weight: 800; color: #38BDF8; margin-bottom: 2px;">
                      ${lang === 'fr' ? 'Application par SHAT:' : (isRtl ? 'كيف نطبقه في شات؟' : 'How SHAT Implements It:')}
                    </div>
                    <p style="font-size: 0.84rem; line-height: 1.5; color: #E2E8F0; margin: 0;">${st.howShatApplies}</p>
                  </div>
                </div>

                <div class="bento-footer" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 8px;">
                  <div style="font-size: 0.76rem; color: #86EFAC; font-weight: 700; margin-bottom: 4px;">
                    ${lang === 'fr' ? 'Livrable Réalisé:' : (isRtl ? 'المخرج المحقق:' : 'Tangible Deliverable:')}
                  </div>
                  <div style="font-size: 0.82rem; color: #F1F5F9; margin-bottom: 12px;">${st.deliverable}</div>
                  <a href="${standardRoute}" class="btn-clean btn-sm" aria-label="${txt(`استعراض مسار ${st.title} في ${st.route && st.route.includes('academy') ? 'الأكاديمية' : 'الخدمات'}`, `Explore ${st.code} track`, `Consulter le parcours ${st.code}`)}" style="width: 100%; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); color: #FFFFFF; text-align: center; justify-content: center; font-weight: 700;">
                    <span>${st.route && st.route.includes('academy')
                      ? (lang === 'fr' ? `Parcours Académique: ${st.code}` : (isRtl ? `مسار الأكاديمية: ${st.code}` : `${st.code} Academy Track`))
                      : (lang === 'fr' ? `Services Conseil: ${st.code}` : (isRtl ? `الخدمات الاستشارية: ${st.code}` : `${st.code} Consulting`))}</span>
                    <span>${arrow}</span>
                  </a>
                </div>
              </div>
            `;
            }).join('')}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <a href="#/${lang}/standards" class="btn-island btn-island-primary" style="background: #10B981; border-color: #10B981;">
              <span>${h.viewAllStandards}</span>
              <span class="icon-circle">${arrow}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 7. Eight Specialized Portfolios (Direct Academy Deep Links)         -->
      <!-- ==================================================================== -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.portfoliosBadge}</span>
            <h2 class="section-title">${h.portfoliosTitle}</h2>
            <p class="section-desc">${h.portfoliosSubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${portfolios.map(pf => `
              <div class="double-bezel">
                <div class="double-bezel-inner" style="border-top: 3px solid var(--shat-green);">
                  <div>
                    <div class="bento-header" style="margin-bottom: 10px;">
                      <span class="bento-kicker" style="font-size: 0.82rem;">${pf.num}</span>
                      <span class="badge badge-primary">${lang === 'fr' ? 'Module Agréé' : (isRtl ? 'حقيبة معتمدة' : 'Accredited Module')}</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.15rem;">${pf.name}</h3>
                    <div class="bento-en" style="color: var(--text-muted); font-size: 0.78rem; margin-bottom: 8px;">${pf.en}</div>
                    <p class="bento-text" style="font-size: 0.88rem; line-height: 1.6;">${pf.desc}</p>
                  </div>

                  <div class="bento-footer" style="display: flex; gap: 8px; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 14px;">
                    <a href="#/${lang}/course/shat-chs-master" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                      <span>${txt('المقرر المرتبط', 'Linked Course', 'Cursus Lié')}</span>
                    </a>
                    <button class="btn-clean btn-green btn-sm btn-open-reg-modal" data-course="general">
                      <span>${lang === 'fr' ? "S'inscrire" : (isRtl ? 'التسجيل بالمساق' : 'Enroll Now')}</span>
                      <span>${arrow}</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 8. Field Toolkits & Operational Templates Hub Embed                 -->
      <!-- ==================================================================== -->
      <section class="section" style="padding-top: 0;">
        <div class="container">
          ${toolkitsLibrary.renderSection(lang)}
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 9. Interactive Social Media Hub & Platform Highlights               -->
      <!-- ==================================================================== -->
      <section class="section" id="home-social-section" style="background: #FFFFFF; border-top: 1px solid var(--border-light);">
        <div class="container">
          <div class="section-header" style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
            <span class="section-badge">${soc.badge}</span>
            <h2 class="section-title">${soc.title}</h2>
            <p class="section-desc">${soc.subtitle}</p>
            
            <!-- Official Channels Pill Buttons -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
              <a href="https://www.facebook.com/shat.development.growth/" target="_blank" rel="noopener" class="social-pill-btn btn-fb">
                ${icons.facebook('svg-social-fb', 18)}
                <span>Facebook Official</span>
              </a>
              <a href="https://www.instagram.com/shat.development.growth/" target="_blank" rel="noopener" class="social-pill-btn btn-ig">
                ${icons.instagram('svg-social-ig', 18)}
                <span>Instagram Feed</span>
              </a>
              <a href="https://wa.me/972592879621" target="_blank" rel="noopener" class="social-pill-btn btn-wa">
                ${icons.whatsapp('svg-social-wa', 18)}
                <span>WhatsApp Line</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-pill-btn btn-li">
                ${icons.linkedin('svg-social-li', 18)}
                <span>LinkedIn Corporate</span>
              </a>
            </div>

            <!-- Filter Tabs -->
            <div class="social-filter-tabs" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 24px;">
              <button class="btn-clean btn-sm social-tab-btn active" data-filter="all" style="padding: 6px 14px; border-radius: 20px; font-weight: 700; background: var(--shat-navy); color: #FFFFFF;">
                ${soc.filterAll || 'الكل'}
              </button>
              <button class="btn-clean btn-sm social-tab-btn" data-filter="Facebook" style="padding: 6px 14px; border-radius: 20px; font-weight: 700; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light);">
                Facebook
              </button>
              <button class="btn-clean btn-sm social-tab-btn" data-filter="Instagram" style="padding: 6px 14px; border-radius: 20px; font-weight: 700; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light);">
                Instagram
              </button>
              <button class="btn-clean btn-sm social-tab-btn" data-filter="training" style="padding: 6px 14px; border-radius: 20px; font-weight: 700; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light);">
                ${soc.filterTraining || 'تدريب ومعايير'}
              </button>
              <button class="btn-clean btn-sm social-tab-btn" data-filter="protection" style="padding: 6px 14px; border-radius: 20px; font-weight: 700; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light);">
                ${soc.filterProtection || 'حماية وصون كرامة'}
              </button>
            </div>
          </div>

          <!-- Social Posts Bento Grid -->
          <div class="bento-grid grid-3" id="home-social-grid">
            ${socPosts.map((post, i) => `
              <article class="social-feed-card" data-category="${post.category}" data-platform="${post.platform}">
                <div class="social-feed-header">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light);">
                      ${post.platform === 'Facebook' ? icons.facebook('svg-social-fb', 18) : icons.instagram('svg-social-ig', 18)}
                    </div>
                    <div>
                      <div style="font-weight: 800; font-size: 0.85rem; color: var(--shat-navy); display: flex; align-items: center; gap: 4px;">
                        <span>${c.name}</span>
                        <span style="color: #1D4ED8; display: inline-flex; align-items: center;" title="Official Verified">${icons.checkCircle('icon-inline', 14)}</span>
                      </div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${post.platform} • ${post.date}</div>
                    </div>
                  </div>
                  <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-size: 0.74rem;">
                    ${post.tag}
                  </span>
                </div>

                <div style="height: 180px; width: 100%; background: #F1F5F9; overflow: hidden; position: relative;">
                  <img src="${post.img || 'assets/logo/logo-banner.jpg'}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
                </div>

                <div class="social-feed-body">
                  <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px; line-height: 1.45;">
                    ${post.title}
                  </h3>
                  <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
                    ${post.excerpt}
                  </p>
                </div>

                <div class="social-feed-actions">
                  <div style="display: flex; gap: 4px;">
                    <button class="social-reaction-btn btn-like-social" data-id="${post.id}">
                      
                      <span class="like-count">${140 + (i * 23)}</span>
                    </button>
                    <button class="social-reaction-btn btn-share-social" data-link="${post.link}" data-title="${post.title}">
                      <span>•</span>
                      <span>${lang === 'fr' ? 'Partager' : (isRtl ? 'مشاركة' : 'Share')}</span>
                    </button>
                  </div>
                  
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${post.formUrl ? `
                      <a href="${post.formUrl}" class="btn-clean btn-sm" style="background: var(--shat-green); color: #FFFFFF; font-weight: 800; font-size: 0.78rem;">
                        <span>${isRtl ? 'تسجيل' : 'Register'}</span>
                      </a>
                    ` : ''}
                    <button class="btn-clean btn-sm btn-read-social-detail" data-post-id="${post.id}" style="background: var(--bg-subtle); color: var(--shat-navy); font-weight: 700; font-size: 0.78rem;">
                      <span>${lang === 'fr' ? 'Détails' : (isRtl ? 'تفاصيل' : 'Details')}</span>
                    </button>
                    <a href="${post.link}" target="_blank" rel="noopener" class="btn-clean btn-sm" style="background: var(--shat-green-tint); color: var(--shat-green); font-weight: 800; font-size: 0.78rem;">
                      <span style="display:inline-flex; align-items:center; gap:4px;"><span>${post.platform}</span> ${icons.externalLink('icon-inline', 12)}</span>
                    </a>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ==================================================================== -->
      <!-- 9.1. Interactive Training Calendar & Upcoming Cohorts Schedule       -->
      <!-- ==================================================================== -->
      ${renderTrainingCalendarSection(lang)}

      <!-- ==================================================================== -->
      <!-- 9.2. Interactive FAQ Section with Live Search Filter                 -->
      <!-- ==================================================================== -->
      ${renderFaqSection(lang)}

      <!-- ==================================================================== -->
      <!-- 10. Minimalist Corporate Call to Action                             -->
      <!-- ==================================================================== -->
      <section class="section" style="padding: 80px 0; background: #FFFFFF; border-top: 1px solid var(--border-light);">
        <div class="container">
          <div class="double-bezel" style="max-width: 900px; margin: 0 auto;">
            <div class="double-bezel-inner" style="padding: 48px 24px; text-align: center; background: var(--bg-subtle);">
              <span class="section-badge" style="margin-bottom: 16px;">${c.name}</span>
              <h2 style="font-size: 2.1rem; color: var(--shat-navy); margin-bottom: 14px; line-height: 1.35; font-weight: 900;">
                ${lang === 'fr' 
                  ? 'Prêts à vous accompagner pour transformer le savoir en résultats mesurables' 
                  : (isRtl ? 'جاهزون لدعم مؤسستكم في تحويل المعرفة إلى نتائج قابلة للقياس' : 'Ready to support your organization in converting knowledge into measurable results')}
              </h2>
              <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 680px; margin: 0 auto 28px auto; line-height: 1.7; font-weight: 500;">
                ${lang === 'fr'
                  ? "Contactez nos consultants pour analyser vos besoins institutionnels ou concevoir des formations sur mesure pour vos équipes."
                  : (isRtl ? 'تواصل مع فريق خبرائنا الاستشاري لبحث احتياجاتكم المؤسسية أو تصميم برامج تدريبية مخصصة لفرق عملكم وفق معايير الجودة الدولية.' : 'Connect with our advisory team to discuss institutional needs or design tailored capacity-building programs aligned with global standards.')}
              </p>
              <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="#/${lang}/contact" class="btn-island btn-island-primary">
                  <span>${d.nav.requestConsultation}</span>
                  <span class="icon-circle">${arrow}</span>
                </a>
                <a href="https://wa.me/972592879621" target="_blank" rel="noopener" class="btn-island btn-island-secondary">
                  <span>WhatsApp: +972 59 287 9621</span>
                  <span class="icon-circle" style="display:inline-flex; align-items:center;">${icons.whatsapp('', 16)}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function bindHomeEvents() {
  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const soc = (translations[currentLang] || translations.ar).socialSection || translations.ar.socialSection;
  const posts = soc.posts || [];

  // 1. Initialize Embedded Tools
  standardsExplorer.init(currentLang);
  toolkitsLibrary.bindEvents(currentLang);

  // Fast Track Program Finder Engine
  const finderTabs = document.querySelectorAll('.finder-tab');
  const finderContent = document.getElementById('finder-showcase-content');

  const isRtl = currentLang === 'ar';
  const txt = (ar, en, fr) => (currentLang === 'fr' ? fr || en : (currentLang === 'en' ? en : ar));
  const arrow = isRtl ? icons.arrowLeft('', 16) : icons.arrowRight('', 16);

  const TRACKS_DATA = {
    'case-management': {
      titleAr: 'دورة إعداد وتأهيل مدير حالة Case Management (د. محمد إسليم)',
      titleEn: 'Comprehensive Case Management Professional Certification',
      titleFr: 'Certification Professionnelle en Gestion de Cas Intégrée',
      code: 'SHAT-FORM-01',
      badgeAr: 'إدارة الحالة والعمل الإنساني الميداني',
      badgeEn: 'Case Management & Humanitarian Action',
      badgeFr: 'Gestion de Cas & Action Humanitaire',
      badgeColor: '#1E7E34',
      badgeBg: '#E8F5E9',
      trainerAr: 'د. محمد إسليم • استشاري إدارة الحالة والرعاية المتكاملة',
      trainerEn: 'Dr. Mohammed Isleem • Case Management & Social Care Consultant',
      trainerFr: 'Dr. Mohammed Isleem • Consultant en Gestion de Cas & Soins Intégrés',
      hoursAr: '30 ساعة تدريبية وتطبيق إكلينيكي',
      hoursEn: '30 Credit Hours & Clinical Practice',
      hoursFr: '30 Heures Certifiées & Pratique Clinique',
      feeAr: 'رسوم مدعومة جزئياً',
      feeEn: 'Partially Subsidized Tuition',
      feeFr: 'Frais Partiellement Subventionnés',
      descAr: 'برنامج تطبيقي متقدم يؤهل الأخصائيين الاجتماعيين والنفسيين وكوادر المنظمات لإدارة خطط الرعاية المتكاملة، تقييم الاحتياجات، وإحالة الحالات وفق أدلة العمل المعتمدة.',
      descEn: 'Applied professional program qualifying social workers and NGO practitioners in integrated care planning, risk profiling, and accredited referral protocols.',
      descFr: 'Programme pratique professionnalisant pour les travailleurs sociaux et humanitaires dans la planification des soins, l’évaluation et les circuits de référencement.',
      formUrl: `#/${currentLang}/forms?id=case-manager-2026`,
      iconKey: 'users'
    },
    'presentation': {
      titleAr: 'دورة مهارات العرض والتقديم Presentation Skills (م. مهدي الملاحي)',
      titleEn: 'Executive Presentation, Public Speaking & Influence (Eng. Mahdi Al-Malahi)',
      titleFr: 'Prise de Parole en Public & Communication d’Influence (Ing. Mahdi Al-Malahi)',
      code: 'SHAT-FORM-02',
      badgeAr: 'مهارات التواصل والإلقاء والتأثير',
      badgeEn: 'Communication, Public Speaking & Pitching',
      badgeFr: 'Communication & Prise de Parole',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      trainerAr: 'م. مهدي الملاحي • استشاري التواصل المؤسسي والعرض الفعال',
      trainerEn: 'Eng. Mahdi Al-Malahi • Corporate Communication & High-Impact Speaking Consultant',
      trainerFr: 'Ing. Mahdi Al-Malahi • Consultant en Communication Stratégique & Prise de Parole',
      hoursAr: '24 ساعة تدريبية وتطبيق عملي',
      hoursEn: '24 Credit Hours & Live Studio Labs',
      hoursFr: '24 Heures Certifiées & Pratique Studio',
      feeAr: 'رسوم تفضيلية',
      feeEn: 'Preferential Institutional Rate',
      feeFr: 'Tarif Préférentiel Institutionnel',
      descAr: 'تمكين قادة المشاريع والمدربين من هندسة العروض التقديمية الاحترافية، إتقان لغة الجسد، إدارة منصات التحدث أمام الجمهور، وصياغة الرسائل المقنعة للمانحين وأصحاب المصلحة.',
      descEn: 'Empowering project managers and executives to design persuasive executive decks, master non-verbal communication, and deliver high-stakes donor pitches.',
      descFr: 'Formation intensive pour dirigeants et chefs de projets : conception de présentations percutantes, maîtrise de l’expression orale et plaidoyer bailleurs.',
      formUrl: `#/${currentLang}/forms?id=presentation-skills-2026`,
      iconKey: 'chat'
    },
    'humanitarian': {
      titleAr: 'دبلوم الممارس الإنساني وبناء القدرات المؤسسية (CHS Master)',
      titleEn: 'Humanitarian Practitioner Diploma & Institutional Capacity (CHS Master)',
      titleFr: 'Diplôme du Praticien Humanitaire & Renforcement Institutionnel (CHS Master)',
      code: 'SHAT-FORM-03',
      badgeAr: 'المعايير الدولية وجودة الاستجابة الإنسانية',
      badgeEn: 'Global Standards & Humanitarian Quality',
      badgeFr: 'Normes Internationales & Qualité Humanitaire',
      badgeColor: '#2563EB',
      badgeBg: '#EFF6FF',
      trainerAr: 'أ. حسام جاد الله • نخبة خبراء ومستشاري شركة شات',
      trainerEn: 'Hossam Jadallah • Lead International Accreditation Consultant & Senior Faculty',
      trainerFr: 'Hossam Jadallah • Consultant Senior en Accréditation Internationale',
      hoursAr: '60 ساعة معتمدة دولياً',
      hoursEn: '60 Internationally Accredited Hours',
      hoursFr: '60 Heures Agréées Internationalement',
      feeAr: 'منحة تدريبية وبناء قدرات',
      feeEn: 'Merit-Based Capacity Grant',
      feeFr: 'Bourse de Renforcement des Capacités',
      descAr: 'تأهيل متعمق في المعيار الإنساني الأساسي للجودة والمساءلة (CHS)، صون السلامة والحماية من الاستغلال الجنسي والاعتداء (PSEA)، وتصميم مؤشرات المتابعة والتقييم (MEAL).',
      descEn: 'Comprehensive mastery of the Core Humanitarian Standard (CHS), PSEA safeguarding, OECD DAC evaluation frameworks, and rigorous MEAL monitoring systems.',
      descFr: 'Maîtrise approfondie de la Norme Humanitaire Fondamentale (CHS), de la sauvegarde PEAS, des critères OCDE/CAD et des systèmes MEAL de suivi et d’impact.',
      formUrl: `#/${currentLang}/forms?id=humanitarian-worker-2026`,
      iconKey: 'book'
    },
    'consulting': {
      titleAr: 'استمارة الاستشارات المؤسسية وبناء القدرات وتطوير النظم',
      titleEn: 'Institutional Advisory, Systems Development & Accreditation Inquiry',
      titleFr: 'Demande de Conseil Institutionnel & Développement des Systèmes',
      code: 'SHAT-FORM-04',
      badgeAr: 'التدخلات الاستشارية المتقدمة للمنظمات',
      badgeEn: 'Executive Advisory & Systems Auditing',
      badgeFr: 'Conseil Institutionnel & Audit des Systèmes',
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      trainerAr: 'فريق الخبراء والاستشاريين المعتمدين لشركة شات',
      trainerEn: 'SHAT Senior International Advisory Board & Certified Fellows',
      trainerFr: 'Collège des Consultants Internationaux Certifiés SHAT',
      hoursAr: 'وفق نطاق التدخل المؤسسي',
      hoursEn: 'Tailored Scope of Work (SOW)',
      hoursFr: 'Selon le Cahier des Charges',
      feeAr: 'يحدد وفق موازنة التدخل',
      feeEn: 'Determined by Project Intervention Budget',
      feeFr: 'Établi selon le Budget d’Intervention',
      descAr: 'خدمات استشارية متخصصة في تأهيل المنظمات للحصول على شهادة CHS، إعداد الأدلة التشغيلية SOPs، مراجعة سياسات الحوكمة، وإجراء التقييم الخارجي المستقل وفق معايير OECD DAC.',
      descEn: 'Dedicated advisory missions assisting civil society organizations in CHS certification readiness, institutional SOP drafting, governance reform, and external evaluations.',
      descFr: 'Missions d’accompagnement spécialisées : préparation à la certification CHS, rédaction des manuels SOP, révision de la gouvernance et évaluations externes OCDE/CAD.',
      formUrl: `#/${currentLang}/forms?id=consulting-inquiry-2026`,
      iconKey: 'award'
    }
  };

  const renderActiveTrack = (trackKey) => {
    if (!finderContent) return;
    const t = TRACKS_DATA[trackKey] || TRACKS_DATA['case-management'];

    const title = txt(t.titleAr, t.titleEn, t.titleFr);
    const badge = txt(t.badgeAr, t.badgeEn, t.badgeFr);
    const trainer = txt(t.trainerAr, t.trainerEn, t.trainerFr);
    const hours = txt(t.hoursAr, t.hoursEn, t.hoursFr);
    const fee = txt(t.feeAr, t.feeEn, t.feeFr);
    const desc = txt(t.descAr, t.descEn, t.descFr);

    finderContent.innerHTML = `
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 16px; text-align: ${isRtl ? 'right' : 'left'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
              <span style="background: ${t.badgeBg}; color: ${t.badgeColor}; font-size: 0.78rem; font-weight: 800; padding: 3px 10px; border-radius: 6px;">
                ${badge}
              </span>
              <span style="font-size: 0.76rem; font-family: monospace; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 2px 8px; border-radius: 4px; color: #64748B;">
                ${t.code}
              </span>
            </div>
            <h4 style="font-size: 1.25rem; font-weight: 900; color: #0B1E36; margin: 0 0 8px; line-height: 1.4; display: flex; align-items: center; gap: 8px;">
              <span style="color: ${t.badgeColor}; display: inline-flex; align-items: center;">${(icons[t.iconKey] || icons.book)('', 22)}</span>
              <span>${title}</span>
            </h4>
          </div>

          <a href="${t.formUrl}" class="btn-clean btn-green" style="font-weight: 800; padding: 10px 22px; border-radius: 8px; box-shadow: 0 4px 12px rgba(30,126,52,0.2); white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
            <span>${txt('فتح الاستمارة المباشرة', 'Open Direct Form', 'Ouvrir le Formulaire')}</span>
            <span style="display:inline-flex; align-items:center;">${arrow}</span>
          </a>
        </div>

        <p style="font-size: 0.92rem; color: #475569; line-height: 1.7; margin: 0;">
          ${desc}
        </p>

        <div style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 0.85rem; color: #334155; padding-top: 14px; border-top: 1px solid #E2E8F0;">
          <div><strong>${txt('المدرب / الخبير:', 'Instructor / Expert:', 'Formateur / Expert :')}</strong> ${trainer}</div>
          <div><strong>${txt('الساعات:', 'Hours:', 'Volume horaire :')}</strong> ${hours}</div>
          <div><strong>${txt('الرسوم:', 'Fees:', 'Frais :')}</strong> <span style="color: #1E7E34; font-weight: 700;">${fee}</span></div>
          <div><strong>${txt('• حالة التسجيل:', '• Status:', '• Statut :')}</strong> <span style="color: #166534; font-weight: 800;">${txt('متاح للتسجيل الفوري', 'Open for Registration', 'Inscriptions Ouvertes')}</span></div>
        </div>
      </div>
    `;
  };

  if (finderTabs.length > 0) {
    renderActiveTrack('case-management');
    finderTabs.forEach(tab => {
      tab.onclick = () => {
        finderTabs.forEach(t => {
          t.style.background = '#F1F5F9';
          t.style.color = '#475569';
          t.classList.remove('active');
        });
        tab.style.background = 'var(--shat-navy, #0B1E36)';
        tab.style.color = '#FFFFFF';
        tab.classList.add('active');
        renderActiveTrack(tab.getAttribute('data-track'));
      };
    });
  }

  // 2. Open Diagnostic Tool Modal Triggers
  document.querySelectorAll('.btn-open-diagnostic').forEach(btn => {
    btn.onclick = () => {
      if (window.openDiagnosticModal) window.openDiagnosticModal();
    };
  });

  // 3. Open Certificate Validator Trigger
  document.querySelectorAll('.btn-open-cert-validator').forEach(btn => {
    btn.onclick = () => {
      window.location.hash = '#/verify';
    };
  });

  // 4. Trigger Spotlight Search from Hero
  document.querySelectorAll('.btn-trigger-spotlight').forEach(btn => {
    btn.onclick = () => {
      if (window.openCommandPalette) window.openCommandPalette();
    };
  });

  // 5. Social Filter Tabs
  const filterBtns = document.querySelectorAll('.social-tab-btn');
  const cards = document.querySelectorAll('.social-feed-card');

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--bg-subtle)';
        b.style.color = 'var(--text-secondary)';
        b.style.border = '1px solid var(--border-light)';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--shat-navy)';
      btn.style.color = '#FFFFFF';
      btn.style.border = 'none';

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (card.getAttribute('data-platform') === filter || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };
  });

  // 6. Interactive Likes
  document.querySelectorAll('.btn-like-social').forEach(btn => {
    btn.onclick = () => {
      const countEl = btn.querySelector('.like-count');
      if (countEl) {
        let count = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = count + 1;
        btn.style.color = '#DC2626';
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
      }
    };
  });

  // 7. Share Button
  document.querySelectorAll('.btn-share-social').forEach(btn => {
    btn.onclick = () => {
      const link = btn.getAttribute('data-link');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
          showToast(currentLang === 'ar' ? 'تم نسخ رابط المنشور إلى الحافظة بنجاح!' : (currentLang === 'fr' ? 'Lien copié dans le presse-papier !' : 'Post link copied to clipboard!'), 'success');
        }).catch(() => {
          showToast(link, 'info');
        });
      } else {
        showToast(link, 'info');
      }
    };
  });

  // 8. Read Full Detail Modal
  document.querySelectorAll('.btn-read-social-detail').forEach(btn => {
    btn.onclick = () => {
      const postId = btn.getAttribute('data-post-id');
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const modalBackdrop = document.getElementById('global-modal-backdrop');
      const modalTitle = document.getElementById('global-modal-title');
      const modalBody = document.getElementById('global-modal-body');

      if (modalTitle) modalTitle.textContent = post.title;
      if (modalBody) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 20px;">
            <div style="height: 220px; overflow: hidden; border-radius: var(--radius-xs); margin-bottom: 16px;">
              <img src="${post.img || 'assets/logo/logo-banner.jpg'}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px; flex-wrap: wrap;">
              <span>${post.tag}</span>
              <span>${post.date}</span>
              <span>• ${post.platform}</span>
              <span>${post.readTime || '3 دقائق'}</span>
            </div>
            <div style="font-size: 0.95rem; line-height: 1.8; color: var(--text-main); margin-bottom: 20px;">
              ${post.fullText || post.excerpt}
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <a href="${post.link}" target="_blank" rel="noopener" class="btn-clean btn-primary btn-sm">
                <span style="display:inline-flex; align-items:center; gap:6px;"><span>${currentLang === 'fr' ? 'Ouvrir sur' : (currentLang === 'ar' ? 'فتح المنشور على' : 'Open on')} ${post.platform}</span> ${icons.externalLink('icon-inline', 14)}</span>
              </a>
            </div>
          </div>
        `;
      }
      if (modalBackdrop) modalBackdrop.classList.add('open');
    };
  });

  // Bind Calendar and FAQ Sub-components
  bindTrainingCalendarEvents();
  bindFaqEvents();
}
