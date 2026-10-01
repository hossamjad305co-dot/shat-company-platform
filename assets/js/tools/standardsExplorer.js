// assets/js/tools/standardsExplorer.js
// Interactive Humanitarian & International Standards Explorer & Checklist Engine
// Deep interactive exploration of CHS, Sphere, PSEA, and OECD DAC standards

export const standardsExplorer = {
  data: [
    {
      id: "chs",
      code: "CHS",
      titleAr: "المعيار الإنساني الأساسي للجودة والمساءلة (CHS)",
      titleEn: "Core Humanitarian Standard on Quality & Accountability",
      badge: "9 التزامات جوهرية",
      badgeEn: "9 Core Commitments",
      descAr: "الإطار الدولي الموحد لضمان جودة الاستجابة الإنسانية، حماية كرامة المتأثرين، ومساءلة الجهات المنفذة.",
      descEn: "Global unified framework safeguarding humanitarian quality, affected populations dignity, and agency accountability.",
      linkedCourse: "shat-chs-master",
      linkedCourseTitleAr: "دبلوم المعيار الإنساني الأساسي (CHS)",
      checklist: [
        { id: "c1", textAr: "الاستجابة الإنسانية ملائمة وتلبي الاحتياجات الفعلية المستمرة.", textEn: "Humanitarian response is appropriate and relevant." },
        { id: "c2", textAr: "الاستجابة فعالة وتقدم في التوقيت المناسب دون تأخير.", textEn: "Response is effective and timely." },
        { id: "c3", textAr: "الاستجابة تعزز القدرات المحلية وتتجنب الآثار السلبية (Do No Harm).", textEn: "Strengthens local capacities and avoids negative effects." },
        { id: "c4", textAr: "الاستجابة مبنية على التواصل والمعلومات والمشاركة المستمرة.", textEn: "Response is based on communication, participation and feedback." },
        { id: "c5", textAr: "الشكاوى مرحب بها وتتم معالجتها بأمان وسرية وإنصاف.", textEn: "Complaints are welcomed and addressed safely." },
        { id: "c6", textAr: "الاستجابة منسقة ومتكاملة وتتجنب ازدواجية التدخلات.", textEn: "Response is coordinated and complementary." },
        { id: "c7", textAr: "المؤسسة تتعلم باستمرار وتطور ممارساتها بناءً على التغذية الراجعة.", textEn: "Actors continuously learn and improve." },
        { id: "c8", textAr: "طواقم العمل مؤهلة ومدارة بإنصاف وتحظى بالدعم الكافي.", textEn: "Staff are supported to do their job effectively and treated fairly." },
        { id: "c9", textAr: "الموارد تدار بكفاءة وشفافية وأخلاقية وأمانة.", textEn: "Resources are managed and used responsibly for their intended purpose." }
      ]
    },
    {
      id: "psea",
      code: "PSEA / IASC",
      titleAr: "أطر الحماية وصون السلامة ومنع الاستغلال والاعتداء الجنسيين",
      titleEn: "Protection from Sexual Exploitation & Abuse (PSEA)",
      badge: "مبادئ IASC الستة",
      badgeEn: "IASC 6 Core Principles",
      descAr: "سياسات عدم التسامح مطلقاً مع أي شكل من أشكال الاستغلال والانتهاك ضد الفئات المستفيدة أو في بيئة العمل.",
      descEn: "Zero tolerance policies ensuring absolute safeguarding of affected populations and safe working environments.",
      linkedCourse: "shat-psea-expert",
      linkedCourseTitleAr: "البرنامج التنفيذي في استشارات الحماية PSEA",
      checklist: [
        { id: "p1", textAr: "توقيع مدونة سلوك إلزامية مع ملحق PSEA الصريح لجميع العاملين والشركاء.", textEn: "Mandatory code of conduct signed by all personnel and contractors." },
        { id: "p2", textAr: "إجراء فحوصات وتدقيق مسبق في سجلات التوظيف (Safe Recruitment Vetting).", textEn: "Rigorous background checks and safe recruitment vetting." },
        { id: "p3", textAr: "توفير قنوات إبلاغ مشفرة وسرية ومستقلة عن الإدارة المباشرة.", textEn: "Confidential and secure whistleblower reporting channels." },
        { id: "p4", textAr: "تأسيس مسار إحالة آمن للرعاية الصحية والنفسية والقانونية للناجين.", textEn: "Operational safe referral pathways for survivors." },
        { id: "p5", textAr: "تدريب مستمر لجميع فرق العمل الميدانية ومقاولي التوريدات والتوزيع.", textEn: "Mandatory regular training for field staff and supply chain contractors." }
      ]
    },
    {
      id: "oecd",
      code: "OECD DAC",
      titleAr: "معايير التقييم التنموي المستقل لمنظمة التعاون الاقتصادي والتنمية",
      titleEn: "OECD DAC Criteria for Development Evaluation",
      badge: "المعايير الستة المعتمدة",
      badgeEn: "6 Core Evaluation Criteria",
      descAr: "المعايير المرجعية العالمية لتقييم المشاريع الإنسانية والتنموية وتحديد القيمة المضافة والأثر المستدام.",
      descEn: "Global gold standard for evaluating humanitarian and development aid interventions.",
      linkedCourse: "shat-oecd-eval",
      linkedCourseTitleAr: "الشهادة الاحترافية في التقييم التنموي المستقل",
      checklist: [
        { id: "o1", textAr: "الملاءمة (Relevance): مدى استجابة التدخل لأولويات واحتياجات المستفيدين.", textEn: "Relevance: Is the intervention doing the right things?" },
        { id: "o2", textAr: "التماسك (Coherence): مدى توافق وتكامل التدخل مع السياسات والبرامج الأخرى.", textEn: "Coherence: How well does the intervention fit?" },
        { id: "o3", textAr: "الفعالية (Effectiveness): مدى تحقيق المشروع لأهدافه المخططة ونتائجه المباشرة.", textEn: "Effectiveness: Is the intervention achieving its objectives?" },
        { id: "o4", textAr: "الكفاءة (Efficiency): مدى استثمار الموارد المالية والبشرية بأعلى مردود ممكن.", textEn: "Efficiency: How well are resources being used?" },
        { id: "o5", textAr: "الأثر (Impact): التغييرات الإيجابية أو السلبية، المباشرة وغير المباشرة، طويلة المدى.", textEn: "Impact: What difference does the intervention make?" },
        { id: "o6", textAr: "الاستدامة (Sustainability): استمرار المنافع والنتائج بعد انتهاء تمويل المشروع.", textEn: "Sustainability: Will the benefits last over time?" }
      ]
    },
    {
      id: "sphere",
      code: "Sphere Handbook",
      titleAr: "ميثاق ومعايير مشروع إسفير للاستجابة الإنسانية",
      titleEn: "The Sphere Handbook: Humanitarian Charter & Minimum Standards",
      badge: "المعايير الفنية الدنيا",
      badgeEn: "Minimum Technical Standards",
      descAr: "المعايير التخصصية في المياه والإصحاح، الأمن الغذائي، المأوى، والعمل الصحي وفق الميثاق الإنساني.",
      descEn: "Standard technical minimums in WASH, food security, shelter, and health in emergencies.",
      linkedCourse: "shat-chs-master",
      linkedCourseTitleAr: "دبلوم المعيار الإنساني الأساسي (CHS)",
      checklist: [
        { id: "s1", textAr: "الحق في الحياة بكرامة والحصول على المساعدة الإنسانية الأساسية.", textEn: "The right to life with dignity and humanitarian assistance." },
        { id: "s2", textAr: "الالتزام بالحد الأدنى من مياه الشرب النظيفة (15 لتراً للفرد يومياً).", textEn: "Minimum clean water supply (15L per person per day)." },
        { id: "s3", textAr: "تأمين معايير المساحة الدنيا للمأوى اللائق (3.5 م² للفرد في حالات الطوارئ).", textEn: "Covered living space minimum (3.5m² per person)." },
        { id: "s4", textAr: "الاستجابة التغذوية الكافية المتوازنة ثقافياً وصحياً.", textEn: "Nutritional intake standards respecting local dietary needs." }
      ]
    }
  ],

  renderSection(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    return `
      <div class="standards-explorer-component" style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: clamp(20px, 4vw, 36px); box-shadow: var(--shadow-md);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <div class="section-badge" style="margin-bottom: 8px;">
              ${txt('أداة تفاعلية • Interactive Checklist', 'Interactive Verification Tool', 'Outil Interactif de Vérification')}
            </div>
            <h3 style="font-size: 1.4rem; font-weight: 900; color: var(--shat-navy); margin: 0 0 6px 0;">
              ${txt('مستكشف المعايير الإنسانية وقائمة التحقق الميدانية', 'Humanitarian Standards & Compliance Checklist', 'Explorateur des Normes Humanitaires')}
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; max-width: 650px;">
              ${txt(
                'اختر المعيار الدولي لمراجعة بنوده التخصصية وقياس نسبة جاهزية مؤسستك التقديرية فورياً.',
                'Select a global standard to review its specific commitments and calculate live compliance status.',
                'Sélectionnez une norme internationale pour évaluer les engagements et mesurer la conformité.'
              )}
            </p>
          </div>

          <!-- Standard Selector Tabs -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="std-explorer-tabs">
            ${this.data.map((std, i) => `
              <button class="btn-clean btn-sm std-tab-btn ${i === 0 ? 'active' : ''}" data-std="${std.id}" style="padding: 8px 14px; border-radius: var(--radius-sm); font-weight: 800; border: 1px solid ${i === 0 ? 'var(--shat-green)' : 'var(--border-light)'}; background: ${i === 0 ? 'var(--shat-green)' : '#FFFFFF'}; color: ${i === 0 ? '#FFFFFF' : 'var(--shat-navy)'};">
                ${std.code}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Dynamic Body Container -->
        <div id="std-explorer-body"></div>
      </div>
    `;
  },

  init(lang = 'ar') {
    const tabsContainer = document.getElementById('std-explorer-tabs');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('.std-tab-btn').forEach(btn => {
      btn.onclick = () => {
        tabsContainer.querySelectorAll('.std-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = '#FFFFFF';
          b.style.color = 'var(--shat-navy)';
          b.style.borderColor = 'var(--border-light)';
        });
        btn.classList.add('active');
        btn.style.background = 'var(--shat-green)';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = 'var(--shat-green)';

        const stdId = btn.getAttribute('data-std');
        this.renderActiveStandard(stdId, lang);
      };
    });

    this.renderActiveStandard('chs', lang);
  },

  renderActiveStandard(stdId, lang = 'ar') {
    const container = document.getElementById('std-explorer-body');
    if (!container) return;

    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    const item = this.data.find(d => d.id === stdId) || this.data[0];

    container.innerHTML = `
      <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 24px; animation: fadeIn 0.25s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-weight: 900; color: var(--shat-green); font-size: 0.95rem; background: var(--shat-green-tint); padding: 3px 8px; border-radius: 4px;">
                ${item.code}
              </span>
              <span class="badge" style="background: var(--shat-navy); color: #FFFFFF; font-size: 0.75rem;">
                ${isRtl ? item.badge : item.badgeEn}
              </span>
            </div>
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 6px 0;">
              ${isRtl ? item.titleAr : item.titleEn}
            </h4>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0;">
              ${isRtl ? item.descAr : item.descEn}
            </p>
          </div>

          <!-- Live Compliance Indicator -->
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 12px 18px; text-align: center; min-width: 140px;">
            <div style="font-size: 0.74rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              ${txt('مؤشر التحقق', 'Checklist Score', 'Score Validé')}
            </div>
            <div id="std-live-score" style="font-size: 1.6rem; font-weight: 900; color: var(--shat-green); font-family: var(--font-mono);">
              0%
            </div>
            <div id="std-live-count" style="font-size: 0.74rem; color: var(--text-secondary);">
              0 / ${item.checklist.length} ${txt('بنود محققة', 'items verified', 'éléments')}
            </div>
          </div>
        </div>

        <!-- Checklist Grid -->
        <div style="margin-top: 16px; margin-bottom: 20px;">
          <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            ${txt('قائمة التحقق الميداني والامتثال (انقر على البنود لتحديث النسبة):', 'Field Verification Checklist (Click to toggle compliance):', 'Liste de Contrôle sur le Terrain :')}
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${item.checklist.map((chk, idx) => `
              <label class="std-check-item" style="display: flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 10px 14px; cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" class="std-check-input" data-id="${chk.id}" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--shat-green);">
                <span style="font-weight: 700; color: var(--shat-navy); font-family: var(--font-mono); font-size: 0.8rem; min-width: 24px;">#0${idx + 1}</span>
                <span style="font-size: 0.86rem; color: var(--text-secondary);">${isRtl ? chk.textAr : chk.textEn}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Linked Training Track & Consulting Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border-light); padding-top: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">🎓</span>
            <div>
              <div style="font-size: 0.74rem; color: var(--text-muted); font-weight: 700;">${txt('المسار الأكاديمي المرتبط:', 'Associated Academy Track:', 'Cursus Lié :')}</div>
              <div style="font-weight: 800; font-size: 0.88rem; color: var(--shat-navy);">${item.linkedCourseTitleAr}</div>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <a href="#/course/${item.linkedCourse}" class="btn-clean btn-sm" style="background: var(--shat-navy); color: #FFFFFF; font-weight: 700;">
              <span>${txt('تصفح المنهاج التدريبي', 'View Curriculum', 'Voir le Programme')}</span>
              <span>${isRtl ? '←' : '→'}</span>
            </a>
            <a href="#/contact" class="btn-clean btn-sm" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-weight: 800;">
              <span>${txt('طلب استشارة مطابقة', 'Request Compliance Advisory', 'Audit de Conformité')}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Bind check update events
    const checkInputs = container.querySelectorAll('.std-check-input');
    const liveScore = document.getElementById('std-live-score');
    const liveCount = document.getElementById('std-live-count');

    const updateScore = () => {
      const checked = container.querySelectorAll('.std-check-input:checked').length;
      const total = checkInputs.length;
      const pct = Math.round((checked / total) * 100);
      if (liveScore) liveScore.textContent = `${pct}%`;
      if (liveCount) {
        liveCount.textContent = `${checked} / ${total} ${txt('بنود محققة', 'items verified', 'éléments')}`;
      }
    };

    checkInputs.forEach(inp => {
      inp.onchange = (e) => {
        const parent = e.target.closest('.std-check-item');
        if (e.target.checked) {
          parent.style.borderColor = 'var(--shat-green)';
          parent.style.background = 'var(--shat-green-tint)';
        } else {
          parent.style.borderColor = 'var(--border-light)';
          parent.style.background = '#FFFFFF';
        }
        updateScore();
      };
    });
  },

  openModal(stdCode = 'CHS', lang = 'ar') {
    const modal = document.getElementById('modal-toolkit-preview');
    const title = document.getElementById('modal-toolkit-title');
    const body = document.getElementById('modal-toolkit-body');
    if (!modal || !body) return;

    if (title) {
      title.textContent = lang === 'fr' 
        ? 'Explorateur des Normes Internationales' 
        : (lang === 'ar' ? 'مستكشف المعايير الدولية وقوائم التحقق الميدانية' : 'International Standards Explorer & Checklist');
    }

    body.innerHTML = this.renderSection(lang);
    modal.classList.add('open');
    this.init(lang);

    // If specific code requested, switch to it
    const codeNormalized = (stdCode || 'chs').toLowerCase();
    const targetItem = this.data.find(d => 
      d.id.toLowerCase() === codeNormalized || 
      d.code.toLowerCase().includes(codeNormalized) ||
      codeNormalized.includes(d.id.toLowerCase())
    );

    if (targetItem) {
      const targetBtn = modal.querySelector(`[data-std="${targetItem.id}"]`);
      if (targetBtn) targetBtn.click();
    }
  }
};

