import { icons } from '../icons.js';

export const aiAdvisorWidget = {
  isOpen: false,
  messages: [],

  knowledgeBase: [
    {
      keywords: ['chs', 'معيار إنساني', 'المعيار الإنساني', 'التزامات', 'commitments', 'norme humanitaire'],
      titleAr: 'المعيار الإنساني الأساسي للجودة والمساءلة (CHS 2024)',
      titleEn: 'Core Humanitarian Standard (CHS 2024)',
      titleFr: 'Norme Humanitaire Fondamentale (CHS 2024)',
      replyAr: `المعيار الإنساني الأساسي (CHS) يرتكز على 9 التزامات دولية ملزمة تضع المجتمعات والأشخاص المتأثرين بالأزمات في قلب العمل الإنساني:
1. استجابة ملائمة وتلبي الاحتياجات الموثقة.
2. استجابة فعالة ومقدمة في الوقت المناسب.
3. تعزيز القدرات المحلية وتفادي الآثار السلبية.
4. التواصل الفعال والمشاركة المجتمعية الواسعة.
5. قنوات آمنة وسرية للشكاوى والمقترحات (CFRM).
6. التنسيق وتكامل العمل الإنساني.
7. التعلم المؤسسي والتحسين المستمر.
8. كفاءة الكوادر وإدارتها بنزاهة وعدالة.
9. الاستخدام المسؤول والمستدام للموارد.

تتيح شركة شات دبلوم CHS المعتمد وتدقيق الجاهزية المؤسسية لمؤسستك.`,
      replyEn: `The Core Humanitarian Standard (CHS 2024) is structured around 9 global commitments placing affected populations at the center of aid:
1. Appropriate & relevant assistance.
2. Effective and timely delivery.
3. Strengthening local capacities & Do No Harm.
4. Active communication, participation, and feedback.
5. Safe, accessible complaints & feedback mechanisms (CFRM).
6. Coordinated and complementary response.
7. Continuous institutional learning.
8. Competent, fair, and well-managed staff.
9. Transparent, ethical resource stewardship.

SHAT provides accredited master diplomas and institutional readiness audits.`,
      replyFr: `La Norme Humanitaire Fondamentale (CHS 2024) repose sur 9 engagements universels plaçant les populations au cœur des interventions humanitaires :
1. Aide appropriée et pertinente.
2. Efficacité et rapidité d'exécution.
3. Renforcement des capacités locales & principe de Ne pas nuire.
4. Communication active et participation des bénéficiaires.
5. Mécanismes sûrs et confidentiels de réclamation (CFRM).
6. Coordination et complémentarité des secours.
7. Apprentissage continu et capitalisation.
8. Personnel qualifié et managé avec équité.
9. Gestion responsable et transparente des ressources.`,
      actions: [
        { labelAr: 'دبلوم CHS في الأكاديمية', labelEn: 'CHS Course Track', url: '#/course/shat-chs-master' },
        { labelAr: 'استعراض معايير CHS', labelEn: 'Standards Explorer', url: '#/standards' }
      ]
    },
    {
      keywords: ['psea', 'صون السلامة', 'حماية', 'استغلال', 'safeguarding', 'protection', 'abus'],
      titleAr: 'أطر صون السلامة ومنع الاستغلال (PSEA & Safeguarding)',
      titleEn: 'PSEA & Child Safeguarding Frameworks',
      titleFr: 'Cadres de Sauvegarde et Prévention des Abus (PSEA)',
      replyAr: `تلتزم شركة شات بتطبيق سياسة عدم التسامح المطلق (Zero Tolerance) مع الاستغلال والاعتداء الجنسيين وانتهاكات صون السلامة:
- مدونة سلوك إلزامية يوقع عليها كافة الموظفين والموردين.
- مسار إحالة سري وآمن لتقديم الرعاية الطبية والدعم النفسي للناجين فوراً.
- وحدة تحقيق داخلية مستقلة تضمن سرية البلاغات وحماية المبلغين.
- فحص وتدقيق خلفيات الموظفين قبل التوظيف (Safe Recruitment).

نقدم استشارات متخصصة لمساعدة المنظمات على صياغة واعتماد سياسات PSEA مواءمة لمعايير IASC.`,
      replyEn: `SHAT enforces a strict Zero Tolerance policy against sexual exploitation, abuse, and safeguarding violations:
- Mandatory code of conduct signed by all staff, partners, and contractors.
- Safe, survivor-centered confidential referral pathways for medical and psychosocial care.
- Independent investigation units protecting whistleblowers.
- Rigorous background vetting and safe recruitment SOPs.

We assist humanitarian organizations in drafting and certifying IASC-compliant PSEA policies.`,
      replyFr: `SHAT applique une tolérance zéro stricte contre l’exploitation et les abus sexuels (PSEA) :
- Code de conduite déontologique obligatoire pour tous les collaborateurs.
- Circuit d'orientation confidentiel et sécurisé axé sur les besoins de la victime.
- Cellules d'enquête indépendantes garantissant la protection des lanceurs d'alerte.
- Protocoles stricts de recrutement éthique et de vérification d'antécédents.`,
      actions: [
        { labelAr: 'استعراض معيار PSEA', labelEn: 'PSEA Standard', url: '#/standards' },
        { labelAr: 'طلب استشارة صون السلامة', labelEn: 'Request Advisory', url: '#/contact' }
      ]
    },
    {
      keywords: ['إدارة حالة', 'مدير حالة', 'case management', 'gestionnaire de cas'],
      titleAr: 'مسار إدارة الحالة والرعاية المتكاملة',
      titleEn: 'Case Management Specialization Track',
      titleFr: 'Filière Spécialisée en Gestion de Cas',
      replyAr: `مسار إدارة الحالة في شركة شات مصمم لإعداد كوادر متخصصة وفق أفضل الممارسات الميدانية الدولية:
1. تحديد الحالات والتسجيل والموافقة المستنيرة.
2. التقييم الشامل للاحتياجات ونقاط القوة والمخاطر.
3. تصميم خطة إدارة الحالة الفردية (Case Plan).
4. الإحالة الآمنة وتنسيق الخدمات المباشرة.
5. المتابعة الميدانية الدورية والمراجعة المستمرة.
6. الإغلاق المنهجي للملف أو نقل الحالة بأمان.

يشمل المساق 40 ساعة تدريبية وتطبيقاً عملياً على نماذج واستمارات حية.`,
      replyEn: `SHAT Case Management Track equips field practitioners with accredited operational competencies:
1. Case identification, registration, and informed consent.
2. Comprehensive multi-sectoral risk and strength assessment.
3. Tailored individual intervention planning.
4. Safe referrals and service coordination.
5. Periodic monitoring and case progress review.
6. Systematic case closure or safe handover.

The program includes 40 accredited hours and real-world form simulations.`,
      replyFr: `La filière Gestion de Cas forme des professionnels qualifiés selon les standards internationaux :
1. Identification, enregistrement et consentement éclairé.
2. Évaluation globale des besoins, vulnérabilités et capacités.
3. Élaboration du plan d'action individualisé.
4. Orientation sécurisée et coordination des services.
5. Suivi régulier et réévaluation continue.
6. Clôture méthodique du dossier ou transfert sécurisé.`,
      actions: [
        { labelAr: 'تفاصيل مسار إدارة الحالة', labelEn: 'Case Management Course', url: '#/course/shat-case-management' }
      ]
    },
    {
      keywords: ['تشخيص', 'تقييم مؤسسي', 'جاهزية', 'diagnostic', 'readiness', 'audit'],
      titleAr: 'أداة التشخيص والجاهزية المؤسسية',
      titleEn: 'Institutional Readiness Diagnostic Tool',
      titleFr: 'Outil de Diagnostic Institutionnel',
      replyAr: `توفر منصة شات أداة رقمية تفاعلية لفحص الجاهزية المؤسسية عبر 4 محاور استراتيجية:
1. معايير الجودة والمساءلة (CHS & AAP).
2. صون السلامة ومنع الاستغلال (PSEA & Safeguarding).
3. نظم المتابعة والتقييم وإدارة الأداء (MEAL).
4. الحوكمة الرشيدة واللوائح التشغيلية (Governance & SOPs).

يمكنك تشغيل الأداة مباشرة الآن للحصول على تقرير فوري وتوصيات تطويرية مخصصة.`,
      replyEn: `SHAT Platform provides an interactive institutional diagnostic tool evaluating 4 strategic pillars:
1. Quality & Accountability (CHS & AAP).
2. Safeguarding & Protection (PSEA).
3. MEAL & Results-Based Management.
4. Institutional Governance & SOPs.

You can launch the diagnostic tool right now to receive a customized maturity report and capacity roadmap.`,
      replyFr: `La plateforme SHAT intègre un outil de diagnostic interactif évaluant 4 piliers stratégiques :
1. Qualité et Redevabilité (CHS & AAP).
2. Sauvegarde et Prévention (PSEA).
3. Suivi, Évaluation et Apprentissage (MEAL).
4. Gouvernance Institutionnelle et Procédures (SOP).`,
      actions: [
        { labelAr: 'بدء التقييم والتشخيص الآن', labelEn: 'Launch Diagnostic Tool', action: 'launch_diagnostic' }
      ]
    }
  ],

  init(lang = 'ar') {
    if (document.getElementById('shat-ai-advisor-container')) return;

    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    // Load persisted chat or seed with welcome
    const saved = localStorage.getItem('shat_advisor_messages');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
      } catch (e) {
        this.messages = [];
      }
    }

    if (this.messages.length === 0) {
      this.messages.push({
        sender: 'advisor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: txt(
          'مرحباً بك! أنا مستشار شات المؤسسي الذكي. كيف يمكنني مساعدتك اليوم في معايير العمل الإنساني (CHS & Sphere)، أطر الحماية وصون السلامة (PSEA)، أو البرامج التدريبية المعتمدة؟',
          'Hello! I am SHAT AI Institutional Advisor. How can I assist you today with humanitarian standards (CHS & Sphere), safeguarding frameworks (PSEA), or accredited training programs?',
          'Bonjour ! Je suis le Conseiller Institutionnel IA de SHAT. Comment puis-je vous aider concernant les normes humanitaires (CHS & Sphère), la sauvegarde (PSEA) ou les cursus certifiés ?'
        ),
        actions: [
          { labelAr: 'ما هي معايير CHS 2024؟', labelEn: 'What is CHS 2024?', prompt: 'ما هو المعيار الإنساني الأساسي CHS؟' },
          { labelAr: 'سياسات صون السلامة PSEA', labelEn: 'PSEA Safeguarding', prompt: 'ما هي سياسة PSEA وصون السلامة؟' },
          { labelAr: 'مسار مدير الحالة المعتمد', labelEn: 'Case Management Track', prompt: 'ما هي دورة إدارة الحالة؟' },
          { labelAr: 'فحص الجاهزية المؤسسية', labelEn: 'Diagnostic Tool', prompt: 'أريد فحص جاهزية مؤسستي' }
        ]
      });
    }

    this.renderDOM(lang);
  },

  renderDOM(lang = 'ar') {
    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    const container = document.createElement('div');
    container.id = 'shat-ai-advisor-container';
    container.className = 'no-print';
    container.innerHTML = `
      <!-- Floating Trigger Button -->
      <button id="btn-toggle-ai-advisor" aria-label="${txt('مستشار شات المؤسسي الذكي', 'SHAT AI Advisor', 'Conseiller IA SHAT')}" style="
        position: fixed;
        bottom: clamp(75px, 9vw, 95px);
        ${isAr ? 'left: 24px;' : 'right: 24px;'}
        z-index: 1200;
        background: linear-gradient(135deg, #0F2E4A 0%, #10B981 100%);
        color: #FFFFFF;
        border: 2px solid rgba(255,255,255,0.25);
        border-radius: 999px;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px -5px rgba(15, 46, 74, 0.4), 0 0 15px rgba(16, 185, 129, 0.3);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        <span style="font-size: 1.3rem; font-weight: 900; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); color: #FFFFFF; display: inline-flex; align-items: center;">${icons.sparkles('', 22)}</span>
        <div style="text-align: ${isAr ? 'right' : 'left'};">
          <div style="font-size: 0.85rem; font-weight: 900; line-height: 1.2;">
            ${txt('مستشار شات الذكي', 'SHAT AI Advisor', 'Conseiller IA')}
          </div>
          <div style="font-size: 0.68rem; color: #A7F3D0; font-weight: 700; display: flex; align-items: center; gap: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block; box-shadow: 0 0 6px #10B981;"></span>
            <span>${txt('متاح للاستشارة', 'Online & Ready', 'En Ligne')}</span>
          </div>
        </div>
      </button>

      <!-- Chat Window Drawer -->
      <div id="ai-advisor-window" style="
        position: fixed;
        bottom: clamp(140px, 14vw, 155px);
        ${isAr ? 'left: 24px;' : 'right: 24px;'}
        width: clamp(320px, 90vw, 420px);
        height: min(600px, 78vh);
        background: #FFFFFF;
        border-radius: 18px;
        border: 1px solid #CBD5E1;
        box-shadow: 0 20px 40px -10px rgba(15, 46, 74, 0.25), 0 0 1px rgba(0,0,0,0.1);
        display: none;
        flex-direction: column;
        z-index: 1250;
        overflow: hidden;
      ">
        <!-- Chat Header -->
        <div style="
          background: linear-gradient(135deg, #071527 0%, #0F2E4A 60%, #16426C 100%);
          color: #FFFFFF;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #10B981;
        ">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(16,185,129,0.3); color: #FFFFFF;">
              ${icons.sparkles('', 20)}
            </div>
            <div>
              <div style="font-weight: 900; font-size: 0.95rem; color: #FFFFFF;">
                ${txt('مستشار شات المؤسسي الذكي', 'SHAT AI Institutional Advisor', 'Conseiller IA SHAT')}
              </div>
              <div style="font-size: 0.7rem; color: #86EFAC;">
                ${txt('معايير CHS • PSEA • إدارة الحالة • MEAL', 'CHS • PSEA • Case Management • MEAL', 'CHS • PSEA • Gestion de Cas • MEAL')}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 6px;">
            <button id="btn-advisor-clear" title="${txt('مسح المحادثة', 'Clear Chat', 'Effacer')}" style="background: rgba(255,255,255,0.1); border: none; color: #CBD5E1; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; cursor: pointer;">
              ${icons.undo('', 14)}
            </button>
            <button id="btn-advisor-close" title="${txt('إغلاق', 'Close', 'Fermer')}" style="background: rgba(255,255,255,0.1); border: none; color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; cursor: pointer;">
              ${icons.x('', 16)}
            </button>
          </div>
        </div>

        <!-- Messages Body -->
        <div id="ai-advisor-messages-body" style="
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #F8FAFC;
        "></div>

        <!-- Input Bar -->
        <div style="padding: 12px 14px; background: #FFFFFF; border-top: 1px solid #E2E8F0;">
          <form id="form-ai-advisor-input" style="display: flex; gap: 8px;">
            <input
              type="text"
              id="ai-advisor-text-input"
              placeholder="${txt('اكتب سؤالك أو استفسارك المؤسسي...', 'Ask about standards, courses, or advisory...', 'Posez votre question institutionnelle...')}"
              style="
                flex: 1;
                padding: 10px 14px;
                border: 1.5px solid #CBD5E1;
                border-radius: 10px;
                font-size: 0.88rem;
                outline: none;
                font-family: inherit;
              "
              required
            />
            <button type="submit" style="
              background: var(--shat-green, #1E7E34);
              color: #FFFFFF;
              border: none;
              padding: 0 16px;
              border-radius: 10px;
              font-weight: 800;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(30,126,52,0.25);
            ">
              <span style="display:inline-flex; align-items:center;">${icons.arrowLeft('icon-inline', 14)}</span>
            </button>
          </form>

          <!-- WhatsApp Direct Escalation Footer -->
          <div style="margin-top: 8px; text-align: center;">
            <a
              id="link-advisor-whatsapp"
              href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً شركة شات، أود الحصول على استشارة مؤسسية متخصصة.')}"
              target="_blank"
              style="font-size: 0.72rem; color: #059669; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"
            >
              <span style="display: inline-flex; align-items: center;">${icons.whatsapp('', 16)}</span>
              <span>${txt('تحدث مباشرة مع خبير شركة شات عبر واتساب', 'Chat with a Senior Expert via WhatsApp', 'Contacter un expert via WhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    this.bindEvents(lang);
    this.renderMessages(lang);
  },

  bindEvents(lang = 'ar') {
    const trigger = document.getElementById('btn-toggle-ai-advisor');
    const windowEl = document.getElementById('ai-advisor-window');
    const closeBtn = document.getElementById('btn-advisor-close');
    const clearBtn = document.getElementById('btn-advisor-clear');
    const form = document.getElementById('form-ai-advisor-input');
    const input = document.getElementById('ai-advisor-text-input');

    if (trigger && windowEl) {
      trigger.onclick = () => {
        this.isOpen = !this.isOpen;
        windowEl.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen && input) input.focus();
      };
    }

    if (closeBtn && windowEl) {
      closeBtn.onclick = () => {
        this.isOpen = false;
        windowEl.style.display = 'none';
      };
    }

    if (clearBtn) {
      clearBtn.onclick = () => {
        this.messages = [];
        localStorage.removeItem('shat_advisor_messages');
        this.init(lang);
      };
    }

    if (form && input) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        this.sendMessage(text, lang);
        input.value = '';
      };
    }
  },

  sendMessage(userText, lang = 'ar') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Push User message
    this.messages.push({
      sender: 'user',
      time,
      text: userText
    });
    this.renderMessages(lang);

    // Compute intelligent answer from Knowledge Base
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let matched = null;

      for (const item of this.knowledgeBase) {
        if (item.keywords.some(k => lower.includes(k.toLowerCase()))) {
          matched = item;
          break;
        }
      }

      const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

      if (matched) {
        const replyText = lang === 'fr' ? matched.replyFr || matched.replyEn : (lang === 'en' ? matched.replyEn : matched.replyAr);
        this.messages.push({
          sender: 'advisor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText,
          actions: matched.actions || []
        });
      } else {
        // Fallback Intelligent Consultant Guidance
        this.messages.push({
          sender: 'advisor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: txt(
            `شكراً لاستفسارك المهم. يقدم فريق شركة شات حلولاً متكاملة ترتكز إلى المعايير الإنسانية الدولية، وتصميم الأدلة الإجرائية (SOPs)، وبناء قدرات الكوادر الميدانية.

يمكنك استعراض معايير الامتثال، أو خوض أداة التشخيص المؤسسي، أو التواصل المباشر مع استشاري شركة شات لبحث تفاصيل مشروعك.`,
            `Thank you for your valuable inquiry. SHAT Development & Growth provides specialized solutions grounded in international humanitarian frameworks, standard operational procedures (SOPs), and institutional capacity building.

Feel free to explore our Standards Guide, take the Institutional Diagnostic, or speak with an expert directly.`,
            `Merci pour votre demande. SHAT Development & Growth propose un accompagnement institutionnel d'excellence ancré dans les référentiels internationaux. Explorez nos guides ou contactez nos consultants.`
          ),
          actions: [
            { labelAr: 'استعراض المعايير الدولية', labelEn: 'Standards Explorer', url: '#/standards' },
            { labelAr: 'فحص الجاهزية المؤسسية', labelEn: 'Institutional Diagnostic', action: 'launch_diagnostic' },
            { labelAr: 'حجز استشارة تنفيذية', labelEn: 'Book Consultation', url: '#/contact' }
          ]
        });
      }

      localStorage.setItem('shat_advisor_messages', JSON.stringify(this.messages));
      this.renderMessages(lang);
    }, 450);
  },

  renderMessages(lang = 'ar') {
    const body = document.getElementById('ai-advisor-messages-body');
    if (!body) return;

    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    body.innerHTML = this.messages.map((m, idx) => {
      const isUser = m.sender === 'user';

      return `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: ${isUser ? 'flex-end' : 'flex-start'};
          max-width: 90%;
          align-self: ${isUser ? 'flex-end' : 'flex-start'};
        ">
          <div style="
            background: ${isUser ? 'var(--shat-navy, #0F2E4A)' : '#FFFFFF'};
            color: ${isUser ? '#FFFFFF' : '#1E293B'};
            border: 1px solid ${isUser ? 'transparent' : '#E2E8F0'};
            padding: 12px 16px;
            border-radius: ${isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px'};
            font-size: 0.88rem;
            line-height: 1.6;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            white-space: pre-wrap;
          ">
            ${m.text}
          </div>

          <div style="font-size: 0.68rem; color: #94A3B8; margin-top: 4px; padding: 0 4px;">
            ${m.time}
          </div>

          <!-- Suggested Action Chips -->
          ${(m.actions && m.actions.length > 0) ? `
            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
              ${m.actions.map(act => {
                const actLabel = isAr ? (act.labelAr || act.labelEn) : (act.labelEn || act.labelAr);

                if (act.action === 'launch_diagnostic') {
                  return `
                    <button type="button" class="btn-clean" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();" style="
                      background: #ECFDF5;
                      border: 1px solid #A7F3D0;
                      color: #065F46;
                      font-size: 0.74rem;
                      font-weight: 800;
                      padding: 5px 10px;
                      border-radius: 999px;
                      cursor: pointer;
                    ">
                      ${actLabel}
                    </button>
                  `;
                }

                if (act.prompt) {
                  return `
                    <button type="button" class="btn-clean btn-advisor-chip" data-prompt="${act.prompt}" style="
                      background: #EFF6FF;
                      border: 1px solid #BFDBFE;
                      color: #1E40AF;
                      font-size: 0.74rem;
                      font-weight: 800;
                      padding: 5px 10px;
                      border-radius: 999px;
                      cursor: pointer;
                    ">
                      ${actLabel}
                    </button>
                  `;
                }

                return `
                  <a href="${act.url}" style="
                    background: #F1F5F9;
                    border: 1px solid #CBD5E1;
                    color: var(--shat-navy);
                    font-size: 0.74rem;
                    font-weight: 800;
                    padding: 5px 10px;
                    border-radius: 999px;
                    text-decoration: none;
                  ">
                    ${actLabel}
                  </a>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Bind action chips
    body.querySelectorAll('.btn-advisor-chip').forEach(btn => {
      btn.onclick = () => {
        const prompt = btn.getAttribute('data-prompt');
        if (prompt) this.sendMessage(prompt, lang);
      };
    });

    body.scrollTop = body.scrollHeight;
  }
};
