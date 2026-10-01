// assets/js/tools/diagnosticTool.js
// Interactive Institutional Readiness & Compliance Diagnostic Tool
// Evaluates organizations across 4 core humanitarian & institutional pillars
// Output: Real-time maturity score, gap analysis, and tailored capacity development roadmap

import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

export const diagnosticTool = {
  pillars: [
    {
      id: 'chs_aap',
      titleAr: '1. معايير الجودة والمساءلة للمتأثرين (CHS & AAP)',
      titleEn: '1. Core Humanitarian Standard & AAP',
      descAr: 'مدى امتثال المؤسسة للالتزامات التسعة وقنوات الشكاوى والمقترحات المجتمعية (CFRM).',
      descEn: 'Institutional alignment with the 9 CHS commitments and safe CFRM feedback mechanisms.',
      questions: [
        {
          id: 'q_chs_1',
          textAr: 'هل تمتلك المؤسسة آلية موثقة ومعلنة لتلقي شكاوى ومقترحات المجتمعات المتأثرة بسرية وأمان؟',
          textEn: 'Does the organization have a documented and confidential community feedback & complaints mechanism (CFRM)?',
          weight: 15
        },
        {
          id: 'q_chs_2',
          textAr: 'هل يتم إشراك الفئات المتضررة (بما فيهم النساء وذوو الإعاقة) في تقييم الاحتياجات وتصميم التدخلات؟',
          textEn: 'Are affected populations systematically engaged in rapid needs assessments and project design?',
          weight: 10
        }
      ]
    },
    {
      id: 'psea_safeguarding',
      titleAr: '2. الحماية وصون السلامة ومنع الاستغلال (PSEA & Safeguarding)',
      titleEn: '2. Protection & Safeguarding (PSEA)',
      descAr: 'سياسات منع الاستغلال والانتهاك الجنسيين، مدونات السلوك، وإجراءات التدقيق المسبق.',
      descEn: 'Zero tolerance PSEA policies, staff codes of conduct, and safe recruitment vetting.',
      questions: [
        {
          id: 'q_psea_1',
          textAr: 'هل يوقّع جميع الموظفين والمتطوعين والاستشاريين على مدونة سلوك إلزامية خاصة بـ PSEA وصون الطفل؟',
          textEn: 'Do all employees, volunteers, and contractors sign a mandatory PSEA and Child Safeguarding code of conduct?',
          weight: 15
        },
        {
          id: 'q_psea_2',
          textAr: 'هل توجد مسارات إحالة واضحة ومعتمدة لتقديم الدعم الطبي والنفسي والقانوني السري للناجين؟',
          textEn: 'Are there defined and safe referral pathways for medical, psychosocial, and legal support for survivors?',
          weight: 10
        }
      ]
    },
    {
      id: 'meal_results',
      titleAr: '3. نظم المتابعة والتقييم وإدارة الأداء (MEAL & Results-Based Management)',
      titleEn: '3. MEAL & Results-Based Management',
      descAr: 'الأطر المنطقية، مصفوفات مؤشرات الأداء، وآليات التعلم المؤسسي المستمر.',
      descEn: 'Logframes, performance indicator matrices, and continuous institutional learning loops.',
      questions: [
        {
          id: 'q_meal_1',
          textAr: 'هل تمتلك مشاريع المؤسسة خطط متابعة وتقييم (MEAL Plans) تفصيلية ومحدثة بانتظام؟',
          textEn: 'Do projects maintain active, structured MEAL plans with verified baseline and target metrics?',
          weight: 15
        },
        {
          id: 'q_meal_2',
          textAr: 'هل يتم إجراء تقييمات مستقلة (Baseline & Endline) تستند لمعايير OECD DAC الدولية؟',
          textEn: 'Are independent baseline and endline evaluations conducted adhering to OECD DAC criteria?',
          weight: 10
        }
      ]
    },
    {
      id: 'governance_sops',
      titleAr: '4. الحوكمة المؤسسية واللوائح التشغيلية (Governance & SOPs)',
      titleEn: '4. Institutional Governance & SOPs',
      descAr: 'الهياكل التنظيمية، السياسات المالية والمشتريات، وإدارة المخاطر والنزاهة.',
      descEn: 'Organizational charts, financial/procurement SOPs, and institutional risk management.',
      questions: [
        {
          id: 'q_gov_1',
          textAr: 'هل توجد لوائح إدارية ومالية ومشتريات معتمدة ومحدثة من مجلس الإدارة أو الإدارة العليا؟',
          textEn: 'Are administrative, financial, and procurement SOPs officially endorsed and periodically reviewed?',
          weight: 15
        },
        {
          id: 'q_gov_2',
          textAr: 'هل تمتلك المؤسسة مصفوفة رسمية لتقييم وإدارة المخاطر التشغيلية والمالية والأمنية؟',
          textEn: 'Does the organization maintain a live risk register covering operational, fiduciary, and contextual risks?',
          weight: 10
        }
      ]
    }
  ],

  // Renders the modal content
  renderModal(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    return `
      <div class="diagnostic-tool-wrapper" style="text-align: ${isRtl ? 'right' : 'left'};">
        <div style="margin-bottom: 20px; background: linear-gradient(135deg, rgba(15,46,74,0.04) 0%, rgba(75,136,52,0.06) 100%); padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 1.3rem; color: var(--shat-green);"></span>
            <span style="font-weight: 800; font-size: 1.05rem; color: var(--shat-navy);">
              ${txt('أداة التقييم والتشخيص المؤسسي التفاعلية', 'Interactive Institutional Readiness Diagnostic', 'Outil Interactif de Diagnostic Institutionnel')}
            </span>
            <span class="badge badge-primary" style="margin-inline-start: auto;">
              ${txt('مجاني • 8 محاور قياس', 'Free • 8 Core Metrics', 'Gratuit • 8 Indicateurs')}
            </span>
          </div>
          <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0; line-height: 1.6;">
            ${txt(
              'أداة قياس مبنية على المعايير الإنسانية والدولية المعتمدة (CHS, PSEA, OECD DAC). أجب عن الأسئلة التالية للحصول الفوري على مؤشر الجاهزية المؤسسية وخارطة الطريق المقترحة للتطوير وبناء القدرات.',
              'A standardized assessment built on accredited global norms (CHS, PSEA, OECD DAC). Answer the 8 questions to receive your instant organizational maturity index and tailored capacity roadmap.',
              'Un outil d’évaluation standardisé fondé sur les normes internationales (CHS, PSEA, OCDE CAD). Répondez aux 8 questions pour obtenir instantanément votre indice de maturité.'
            )}
          </p>
        </div>

        <form id="diagnostic-form">
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${this.pillars.map((p, pIdx) => `
              <div class="diagnostic-pillar-card" style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--shat-navy); margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
                  <span>${lang === 'ar' ? p.titleAr : p.titleEn}</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">25%</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">
                  ${lang === 'ar' ? p.descAr : p.descEn}
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                  ${p.questions.map(q => `
                    <div class="diagnostic-question-block" style="background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs); border-inline-start: 3px solid var(--shat-navy);">
                      <div style="font-weight: 700; font-size: 0.85rem; color: var(--shat-navy); margin-bottom: 8px;">
                        ${lang === 'ar' ? q.textAr : q.textEn}
                      </div>
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px;">
                        <label class="diagnostic-option-label" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer; padding: 6px 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 4px;">
                          <input type="radio" name="${q.id}" value="100" required>
                          <span>${txt('مكتمل ومطبق كلياً (100%)', 'Fully Implemented', 'Pleinement appliqué')}</span>
                        </label>
                        <label class="diagnostic-option-label" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer; padding: 6px 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 4px;">
                          <input type="radio" name="${q.id}" value="65">
                          <span>${txt('مطبق جزئياً (65%)', 'Partially Applied', 'Partiellement appliqué')}</span>
                        </label>
                        <label class="diagnostic-option-label" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer; padding: 6px 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 4px;">
                          <input type="radio" name="${q.id}" value="30">
                          <span>${txt('قيد التطوير الأولي (30%)', 'Under Development', 'En cours d\'élaboration')}</span>
                        </label>
                        <label class="diagnostic-option-label" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer; padding: 6px 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 4px;">
                          <input type="radio" name="${q.id}" value="0">
                          <span>${txt('غير موجود إطلاقاً (0%)', 'Not Available', 'Inexistant')}</span>
                        </label>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px; justify-content: flex-end;">
            <button type="button" class="btn-clean btn-secondary btn-sm" id="btn-diagnostic-sample" style="padding: 10px 16px;">
              <span>${txt('تعبئة تجريبية سريعة', 'Quick Sample Data', 'Remplissage Rapide')}</span>
            </button>
            <button type="submit" class="btn-clean btn-primary btn-lg" style="padding: 12px 28px;">
              <span>▲ ${txt('تحليل النتيجة وإصدار خارطة الطريق', 'Analyze & Generate Roadmap', 'Analyser et Générer la Feuille de Route')}</span>
            </button>
          </div>
        </form>

        <!-- Results Display Box (Hidden by default) -->
        <div id="diagnostic-results-container" style="display: none; margin-top: 24px;"></div>
      </div>
    `;
  },

  // Initializes event handlers
  init(lang = 'ar') {
    const form = document.getElementById('diagnostic-form');
    const sampleBtn = document.getElementById('btn-diagnostic-sample');
    const resultsContainer = document.getElementById('diagnostic-results-container');
    if (!form) return;

    if (sampleBtn) {
      sampleBtn.onclick = () => {
        // Sample realistic NGO response
        const sampleValues = {
          q_chs_1: '65',
          q_chs_2: '100',
          q_psea_1: '100',
          q_psea_2: '65',
          q_meal_1: '65',
          q_meal_2: '30',
          q_gov_1: '100',
          q_gov_2: '65'
        };
        Object.entries(sampleValues).forEach(([name, val]) => {
          const radio = form.querySelector(`input[name="${name}"][value="${val}"]`);
          if (radio) radio.checked = true;
        });
        showToast(lang === 'ar' ? 'تم تعبئة استجابة تجريبية نموذجية بنجاح.' : 'Sample response populated.', 'info');
      };
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      let totalWeightedScore = 0;
      let totalWeight = 0;
      const pillarScores = {};

      this.pillars.forEach(p => {
        let pScore = 0;
        let pWeight = 0;
        p.questions.forEach(q => {
          const val = Number(formData.get(q.id) || 0);
          pScore += (val * q.weight) / 100;
          pWeight += q.weight;
        });
        pillarScores[p.id] = Math.round((pScore / pWeight) * 100);
        totalWeightedScore += pScore;
        totalWeight += pWeight;
      });

      const overallScore = Math.round((totalWeightedScore / totalWeight) * 100);
      this.displayResults(overallScore, pillarScores, lang);
    };
  },

  displayResults(score, pillarScores, lang) {
    const container = document.getElementById('diagnostic-results-container');
    if (!container) return;

    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    let maturityLevel = txt('مستوى قيادي ومطابق (Excellence)', 'Excellence & Compliance Tier', 'Excellence Institutionnelle');
    let levelBadgeClass = 'badge-success';
    let levelColor = '#10B981';
    let summaryText = txt(
      'تتمتع منظمتكم بامتثال قوي للسياسات الدولية. نوصي بتعزيز برامج التأهيل التخصصي المستمر للمدربين والكوادر القيادية عبر برامج دبلوم CHS المتقدم.',
      'Your organization demonstrates robust compliance. We recommend maintaining specialized continuous development via advanced CHS Diplomas.',
      'Votre organisation fait preuve d’une conformité rigoureuse. Nous recommandons un renforcement continu des capacités de leadership.'
    );

    if (score < 50) {
      maturityLevel = txt('مستوى تأسيسي أولي (Emerging / Foundational)', 'Foundational Tier', 'Niveau Fondamental');
      levelBadgeClass = 'badge-danger';
      levelColor = '#EF4444';
      summaryText = txt(
        'المؤسسة بحاجة فورية إلى مأسسة السياسات الإلزامية مثل مدونة سلوك PSEA، ودليل الشكاوى CFRM، وبطاقات الوصف الوظيفي لضمان أهلية التمويل والامتثال.',
        'Immediate institutionalization required for critical policies (PSEA, CFRM, and HR manuals) to qualify for international funding.',
        'Mise en place urgente requise des politiques indispensables (PSEA, CFRM et manuels RH).'
      );
    } else if (score < 80) {
      maturityLevel = txt('مستوى متوسط قيد التمكين (Developing / Progressing)', 'Progressing Tier', 'Niveau Intermédiaire');
      levelBadgeClass = 'badge-warning';
      levelColor = '#F59E0B';
      summaryText = txt(
        'تمتلك المؤسسة هياكل قائمة ولكنها تحتاج إلى تعزيز الرقابة الميدانية والتقييم المستقل المبني على مؤشرات OECD DAC وتفعيل مسارات التدقيق الداخلي.',
        'Good institutional foundation. Focus on independent evaluation (OECD DAC) and safe referral operationalization is strongly advised.',
        'Bonne base institutionnelle. L’accent doit être mis sur l’évaluation indépendante (OCDE CAD) et l’opérationnalisation des circuits d’alerte.'
      );
    }

    container.innerHTML = `
      <div style="background: #FFFFFF; border: 2px solid ${levelColor}; border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-lg); animation: fadeIn 0.3s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--border-light); padding-bottom: 16px;">
          <div>
            <span class="badge ${levelBadgeClass}" style="font-size: 0.82rem; padding: 6px 12px; margin-bottom: 8px;">
              ${maturityLevel}
            </span>
            <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">
              ${txt('مؤشر النضج والجاهزية المؤسسية: ', 'Institutional Readiness Score: ', 'Indice de Préparation : ')} ${score}%
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 600px; margin: 0; line-height: 1.6;">
              ${summaryText}
            </p>
          </div>
          <div style="text-align: center; min-width: 100px;">
            <div style="width: 84px; height: 84px; border-radius: 50%; background: ${levelColor}15; border: 4px solid ${levelColor}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: ${levelColor}; font-family: var(--font-mono); margin: 0 auto;">
              ${score}%
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; font-weight: 700;">
              ${txt('درجة الامتثال', 'Compliance Grade', 'Note Globale')}
            </div>
          </div>
        </div>

        <!-- Pillar Breakdown Bars -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div style="background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">
              <span>CHS & AAP</span>
              <span>${pillarScores.chs_aap}%</span>
            </div>
            <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${pillarScores.chs_aap}%; background: var(--shat-green); border-radius: 4px;"></div>
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">
              <span>PSEA & Safeguarding</span>
              <span>${pillarScores.psea_safeguarding}%</span>
            </div>
            <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${pillarScores.psea_safeguarding}%; background: #3B82F6; border-radius: 4px;"></div>
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">
              <span>MEAL & Impact</span>
              <span>${pillarScores.meal_results}%</span>
            </div>
            <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${pillarScores.meal_results}%; background: #F59E0B; border-radius: 4px;"></div>
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">
              <span>Governance & SOPs</span>
              <span>${pillarScores.governance_sops}%</span>
            </div>
            <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${pillarScores.governance_sops}%; background: var(--shat-navy); border-radius: 4px;"></div>
            </div>
          </div>
        </div>

        <!-- Action Roadmap & Links -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-xs); padding: 16px; margin-bottom: 20px;">
          <div style="font-weight: 800; font-size: 0.92rem; color: #166534; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            
            <span>${txt('خارطة الطريق المقترحة من خبراء شركة شات:', 'Recommended Institutional Roadmap by SHAT:', 'Feuille de Route Recommandée :')}</span>
          </div>
          <ul style="font-size: 0.85rem; color: #14532D; margin: 0; padding-inline-start: 20px; line-height: 1.7;">
            <li>${txt('الالتحاق بـ <strong>دبلوم معيار CHS المهني</strong> لبناء كفاءات ضباط المساءلة.', 'Enroll in the <strong>CHS Professional Diploma</strong> for AAP staff.', 'Inscription au <strong>Diplôme Professionnel CHS</strong> pour les équipes.')}</li>
            <li>${txt('طلب استشارة تخصصية لمراجعة <strong>سياسات PSEA ولوائح الحوكمة</strong>.', 'Request a dedicated consulting session on <strong>PSEA & Governance SOPs</strong>.', 'Audit institutionnel des <strong>politiques PSEA et gouvernance</strong>.')}</li>
            <li>${txt('تنزيل حقيبة أدوات المتابعة والتقييم (MEAL Framework) من مكتبة النماذج.', 'Download the ready-to-use MEAL framework from our toolkit library.', 'Téléchargement de la boîte à outils MEAL standardisée.')}</li>
          </ul>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <a href="#/forms?id=humanitarian-worker-2026" class="btn-clean btn-secondary btn-sm" onclick="document.getElementById('modal-diagnostic-assessment').classList.remove('open');">
            <span>${txt('التسجيل في دبلوم CHS المرشح', 'Enroll in CHS Diploma', 'S\'inscrire au Diplôme CHS')}</span>
          </a>
          <a href="#/forms?id=consulting-inquiry-2026" class="btn-clean btn-green btn-sm" onclick="document.getElementById('modal-diagnostic-assessment').classList.remove('open');" style="font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
            <span style="display: inline-flex; align-items: center;">${icons.whatsapp('', 16)}</span>
            <span>${txt('طلب استشارة وبناء قدرات مؤسسية', 'Request Consulting Intervention', 'Demande de Conseil')}</span>
          </a>
          <button class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-medium); color: var(--shat-navy);" onclick="window.print();">
            <span>${txt('طباعة التقرير', 'Print Report', 'Imprimer')}</span>
          </button>
        </div>
      </div>
    `;

    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
  }
};
