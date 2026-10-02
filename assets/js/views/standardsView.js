import { icons } from '../icons.js';
// assets/js/views/standardsView.js
// Deep Dive International & Humanitarian Standards Guide with Direct Interactive Tool Integration
// 100% Trilingual Support (AR, EN, FR) & WCAG AAA High Contrast Design
import { content } from '../content.js';
import { standardsExplorer } from '../tools/standardsExplorer.js';

export function renderStandardsView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const list = d.standards || [];
  const isRtl = lang === 'ar';
  const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);

  const t = {
    badge: lang === 'fr' ? 'Normes & Référentiels Mondiaux' : (isRtl ? 'المرجعيات والمواثيق الدولية المعتمدة' : 'Global Norms & Standards'),
    title: lang === 'fr' ? 'Système des Normes Internationales et Applications Institutionnelles' : (isRtl ? 'منظومة المعايير الدولية وتطبيقاتها المؤسسية الميدانية' : 'International Standards & Institutional Field Applications'),
    desc: lang === 'fr' 
      ? "SHAT s'appuie rigoureusement sur les cadres internationaux de référence pour guider l'élaboration des politiques, l'évaluation des risques et la redevabilité."
      : (isRtl ? 'تسترشد شركة شات، بحسب طبيعة ونطاق كل مهمة، بأدق المرجعيات الدولية والإنسانية المعتمدة لبناء السياسات، مصفوفات تقييم المخاطر، صون السلامة، والتقييم المستقل.' : 'Guided by accredited international frameworks governing policy design, risk matrices, safeguarding, accountability, and independent evaluation.'),
    
    // Diagnostic banner
    diagBadge: lang === 'fr' ? 'Outil Interactif de Conformité' : (isRtl ? 'أداة الفحص المؤسسي' : 'Interactive Compliance Tool'),
    diagTitle: lang === 'fr' ? 'Évaluez la Conformité de Votre Organisation aux Normes' : (isRtl ? 'هل تلتزم منظمتكم بالمعايير الإنسانية والدولية؟ فحص الجاهزية الفوري' : 'Does Your Institution Comply with Global Standards? Instant Audit'),
    diagDesc: lang === 'fr'
      ? 'Lancez notre outil interactif pour analyser votre conformité aux 9 engagements CHS, PSEA et UNEG en moins de 3 minutes.'
      : (isRtl ? 'استخدم أداة التشخيص التفاعلية لفحص مستوى الامتثال للالتزامات التسعة للمعيار الإنساني، معايير صون السلامة، وأطر الحوكمة خلال 3 دقائق.' : 'Use our interactive diagnostic tool to inspect institutional alignment with CHS, PSEA, and governance frameworks in 3 minutes.'),
    diagBtn: lang === 'fr' ? 'Lancer le Test de Conformité' : (isRtl ? 'فحص جاهزية المعايير الآن' : 'Check Compliance Now'),

    whyTitle: lang === 'fr' ? 'Portée et valeur pour les organisations:' : (isRtl ? 'ما هو المعيار وما قيمته للمؤسسات؟' : 'Why It Matters to Institutions:'),
    howTitle: lang === 'fr' ? 'Comment SHAT l’applique sur le terrain :' : (isRtl ? 'كيف تطبقه شركة شات ميدانياً؟' : 'How SHAT Implements It:'),
    delivTitle: lang === 'fr' ? 'Livrable Institutionnel Réalisé:' : (isRtl ? 'المخرج المؤسسي المحقق:' : 'Tangible Institutional Deliverable:'),
    
    btnInteractiveCheck: lang === 'fr' ? 'Explorer la Liste de Contrôle Interactive' : (isRtl ? 'فحص قائمة التحقق التفاعلية' : 'Interactive Compliance Checklist'),
    btnExploreCourse: lang === 'fr' ? 'Consulter le Cursus Certifié' : (isRtl ? 'استعراض المساق التدريبي المعتمد' : 'View Accredited Track'),
    linkedTrack: lang === 'fr' ? 'Cursus associé:' : (isRtl ? 'المساق التدريبي المرتبط:' : 'Linked Course:'),
    linkedProject: lang === 'fr' ? 'Intervention Terrain :' : (isRtl ? 'المشروع الميداني الموثق:' : 'Field Project:')
  };

  // Cross-reference data
  const standardRelations = {
    'CHS': {
      courseId: 'shat-chs-master',
      courseTitle: isRtl ? 'دبلوم المعيار الإنساني الأساسي (CHS)' : 'Core Humanitarian Standard (CHS) Diploma',
      projectCode: 'PRJ-CHS-2025',
      projectTitle: isRtl ? 'برنامج حوكمة وتطبيق معيار CHS لـ 14 منظمة' : 'CHS Governance Program for 14 CSOs'
    },
    'SPHERE': {
      courseId: 'shat-chs-master',
      courseTitle: isRtl ? 'المعايير الإنسانية الدنيا في الطوارئ (Sphere)' : 'Sphere Minimum Standards in Emergency',
      projectCode: 'PRJ-CHS-2025',
      projectTitle: isRtl ? 'مواءمة خطط الاستجابة مع متطلبات Sphere' : 'Response Alignment with Sphere Handbook'
    },
    'OECD DAC': {
      courseId: 'shat-oecd-eval',
      courseTitle: isRtl ? 'خبير التقييم الخارجي المستقل (OECD DAC)' : 'Independent External Project Evaluation (OECD DAC)',
      projectCode: 'PRJ-DAC-2024',
      projectTitle: isRtl ? 'التقييم الخارجي المستقل لمشاريع التعافي الاقتصادي' : 'Economic Recovery Independent Evaluation'
    },
    'UNEG': {
      courseId: 'shat-oecd-eval',
      courseTitle: isRtl ? 'معايير النزاهة وأخلاقيات التقييم (UNEG)' : 'UNEG Ethical Guidelines & Evaluation Norms',
      projectCode: 'PRJ-DAC-2024',
      projectTitle: isRtl ? 'ميثاق النزاهة التقييمية ومصفوفات قياس الأثر' : 'Evaluation Integrity Charter & Impact Matrices'
    },
    'PSEA': {
      courseId: 'shat-psea-expert',
      courseTitle: isRtl ? 'البرنامج التنفيذي في صون السلامة (PSEA)' : 'Executive Safeguarding & PSEA Advisory Program',
      projectCode: 'PRJ-PSEA-2025',
      projectTitle: isRtl ? 'تأسيس أطر الحماية ومسارات الإحالة الآمنة' : 'PSEA Framework & Referral Pathways'
    },
    'Do No Harm': {
      courseId: 'shat-psea-expert',
      courseTitle: isRtl ? 'إطار عدم الإضرار وحساسية النزاع' : 'Do No Harm & Conflict Sensitivity Framework',
      projectCode: 'PRJ-PSEA-2025',
      projectTitle: isRtl ? 'فحص حساسية النزاع ومصفوفة حماية الفئات الهشة' : 'Conflict Sensitivity Screening & Protection'
    }
  };

  return `
    <div class="view-standards">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 860px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${t.title}</h1>
            <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- Diagnostic Audit Banner -->
      <section style="background: linear-gradient(135deg, #0F2E4A 0%, #081B2E 100%); padding: 32px 0; color: #FFFFFF; border-bottom: 3px solid var(--shat-green);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 780px;">
              <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3); font-weight: 800; font-size: 0.8rem; margin-bottom: 8px; display: inline-block;">
                ${t.diagBadge}
              </span>
              <h3 style="color: #FFFFFF; font-size: 1.35rem; font-weight: 800; margin-bottom: 8px;">
                ${t.diagTitle}
              </h3>
              <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.7; margin: 0;">
                ${t.diagDesc}
              </p>
            </div>
            <div>
              <button type="button" class="btn-clean btn-green btn-island" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();" style="box-shadow: 0 4px 18px rgba(30, 166, 114, 0.45); white-space: nowrap;">
                <span>${t.diagBtn}</span>
                <span>${arrow}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Interactive Standards Checklist & Audit Report Engine -->
      <section class="section" style="padding-top: 48px; padding-bottom: 24px;">
        <div class="container">
          ${standardsExplorer.renderSection(lang)}
        </div>
      </section>

      <!-- Standards Bento Grid -->
      <section class="section" style="padding-top: 24px;">
        <div class="container">
          <div class="bento-grid grid-2">
            ${list.map(st => {
              const rel = standardRelations[st.code] || standardRelations['CHS'];
              return `
                <div class="double-bezel" style="border-top: 4px solid var(--shat-navy);">
                  <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div class="bento-header" style="margin-bottom: 12px;">
                        <span class="badge" style="font-size: 0.85rem; font-weight: 800; background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-family: var(--font-mono);">
                          ${st.code}
                        </span>
                        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">
                          ${st.badge}
                        </span>
                      </div>

                      <h3 class="bento-title" style="font-size: 1.35rem; font-weight: 900; margin-bottom: 4px;">${st.title}</h3>
                      <div class="bento-en" style="color: var(--shat-navy); font-weight: 700; font-size: 0.85rem; margin-bottom: 16px;">${st.en}</div>

                      <!-- Why it matters -->
                      <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-${isRtl ? 'right' : 'left'}: 4px solid var(--shat-navy);">
                        <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 4px;">
                          ${t.whyTitle}
                        </div>
                        <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.7; margin: 0;">
                          ${st.whyItMatters}
                        </p>
                      </div>

                      <!-- How SHAT applies it -->
                      <div style="background: var(--shat-green-tint); border: 1px solid var(--shat-green-border); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-${isRtl ? 'right' : 'left'}: 4px solid var(--shat-green);">
                        <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); margin-bottom: 4px;">
                          ${t.howTitle}
                        </div>
                        <p style="font-size: 0.92rem; color: var(--shat-navy); line-height: 1.7; margin: 0; font-weight: 600;">
                          ${st.howShatApplies}
                        </p>
                      </div>

                      <!-- Tangible Deliverable -->
                      <div style="border: 1px dashed var(--border-medium); border-radius: var(--radius-xs); padding: 12px; margin-bottom: 16px; background: #FFFFFF;">
                        <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">
                          ${t.delivTitle}
                        </div>
                        <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                          ${st.deliverable}
                        </div>
                      </div>

                      <!-- Cross-Relations Box -->
                      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-xs); padding: 10px 14px; margin-bottom: 16px; font-size: 0.8rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                          <div>
                            <span style="color: var(--text-muted); font-size: 0.72rem;">${t.linkedTrack}</span>
                            <div>
                              <a href="#/course/${rel.courseId}" style="color: var(--shat-navy); font-weight: 800; text-decoration: none;">
                                ${rel.courseTitle}
                              </a>
                            </div>
                          </div>
                          <div style="text-align: ${isRtl ? 'left' : 'right'};">
                            <span style="color: var(--text-muted); font-size: 0.72rem;">${t.linkedProject}</span>
                            <div>
                              <a href="#/projects" style="color: var(--shat-green); font-weight: 800; text-decoration: none;">
                                ${rel.projectCode}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Dual Action Footer -->
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                      <button type="button" class="btn-clean btn-green btn-island" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('${st.code}');" style="flex: 1; justify-content: center; font-size: 0.84rem;">
                        <span>${t.btnInteractiveCheck}</span>
                        
                      </button>
                      <a href="#/course/${rel.courseId}" class="btn-clean btn-secondary btn-sm" style="background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-medium); font-weight: 700;">
                        <span>${t.btnExploreCourse}</span>
                        <span>${arrow}</span>
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindStandardsEvents() {
  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  standardsExplorer.init(currentLang);
}

