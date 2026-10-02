// assets/js/tools/toolkitsLibrary.js
// Field Toolkits & Operational Templates Hub for SHAT Platform
// Provides standardized, institutional-grade downloadable frameworks and templates
// 100% Trilingual Architecture (Arabic, English, French)

import { icons } from '../icons.js';

export const toolkitsLibrary = {
  toolkits: [
    {
      id: "tk-meal",
      titleAr: "نموذج خطة المتابعة والتقييم والمساءلة والتعلم (MEAL Plan Master)",
      titleEn: "Comprehensive MEAL Plan & Indicator Tracking Matrix",
      titleFr: "Matrice Maîtresse du Plan MEAL & Suivi des Indicateurs",
      categoryAr: "إدارة المشاريع والتقييم",
      categoryEn: "Project MEAL & Impact",
      categoryFr: "Gestion de Projets & MEAL",
      format: "XLSX / Google Sheets",
      size: "2.4 MB",
      badge: "معتمد دولياً",
      badgeEn: "Internationally Accredited",
      badgeFr: "Homologué Internationalement",
      descAr: "قالب متكامل يشتمل على مؤشرات الأداء (KPIs)، مصفوفة جمع البيانات، جداول التكرار، وتحديد المسؤوليات الميدانية لضمان دقة الرصد.",
      descEn: "Standardized master framework featuring baseline-target matrices, data collection protocols, and verified indicator governance.",
      descFr: "Modèle opérationnel complet intégrant indicateurs de performance (KPI), protocoles de collecte de données et gouvernance institutionnelle.",
      contentOutline: [
        "ورقة 1: الإطار المنطقي العام للمشروع (Logframe) والمؤشرات الذكية (SMART)",
        "ورقة 2: مصفوفة تتبع المؤشرات (Indicator Tracking Table - ITT) بالقيم المرجعية والمستهدفة",
        "ورقة 3: خطة جمع البيانات الميدانية، أدوات المسح، وحجم العينات الإحصائية",
        "ورقة 4: مصفوفة إدارة المخاطر وتحديد فترات التغذية الراجعة وحلقات التعلم المستمر"
      ],
      contentOutlineEn: [
        "Sheet 1: Project Logical Framework (Logframe) & SMART Indicators",
        "Sheet 2: Indicator Tracking Table (ITT) with baseline and target values",
        "Sheet 3: Field Data Collection Plan, Survey Tools & Sample Sizes",
        "Sheet 4: Risk Mitigation Matrix & Continuous Learning Feedback Loops"
      ],
      contentOutlineFr: [
        "Feuille 1 : Cadre Logique du Projet (Logframe) & Indicateurs SMART",
        "Feuille 2 : Tableau de Suivi des Indicateurs (ITT) avec valeurs de référence et cibles",
        "Feuille 3 : Plan de Collecte de Données, Outils d'Enquête & Échantillonnage",
        "Feuille 4 : Matrice des Risques & Boucles d'Apprentissage Continu"
      ]
    },
    {
      id: "tk-psea",
      titleAr: "مصفوفة تقييم مخاطر الحماية وصون السلامة (PSEA Risk Matrix)",
      titleEn: "PSEA & Safeguarding Risk Assessment Matrix",
      titleFr: "Matrice d'Évaluation des Risques PEAS & Sauvegarde",
      categoryAr: "الحماية والامتثال الإنساني",
      categoryEn: "Protection & Compliance",
      categoryFr: "Protection & Conformité",
      format: "DOCX / PDF",
      size: "1.8 MB",
      badge: "متوافق مع IASC",
      badgeEn: "IASC Compliant",
      badgeFr: "Conforme IASC",
      descAr: "أداة فحص وتدقيق للمخاطر التشغيلية المرتبطة بتوزيع المساعدات ومراكز الإيواء وبرامج التمكين مع تدابير الوقاية الصارمة.",
      descEn: "Operational screening tool identifying sexual exploitation and abuse risks across field distribution sites and shelter operations.",
      descFr: "Outil d'audit opérationnel identifiant les vulnérabilités liées à l'exploitation et aux abus sexuels dans les opérations de terrain.",
      contentOutline: [
        "القسم 1: تقييم بيئة العمل وتحديد نقاط الضعف في سلاسل التوريد والتوزيع",
        "القسم 2: إجراءات التدقيق والتحقق من خلفيات الموظفين والمتطوعين والموردين",
        "القسم 3: بروتوكول الخط الساخن السري وتصنيف الشكاوى وحماية المبلغين",
        "القسم 4: مسار الإحالة السريع للرعاية الطبية والدعم النفسي-اجتماعي"
      ],
      contentOutlineEn: [
        "Section 1: Operational Environment Assessment & Supply Chain Vulnerability Screening",
        "Section 2: Rigorous Background Check & Due Diligence Procedures for Staff & Vendors",
        "Section 3: Confidential Hotline Protocol, Complaint Categorization & Whistleblower Protection",
        "Section 4: Rapid Referral Pathway for Emergency Medical & Psychosocial Support"
      ],
      contentOutlineFr: [
        "Section 1 : Évaluation de l'Environnement Opérationnel & Vulnérabilités de Distribution",
        "Section 2 : Procédures de Vérification Préalable du Personnel, Bénévoles & Fournisseurs",
        "Section 3 : Protocole de Ligne Verte Confidentielle & Protection des Lanceurs d'Alerte",
        "Section 4 : Circuit de Référencement Rapide vers les Soins Médicaux & Psychosociaux"
      ]
    },
    {
      id: "tk-cfrm",
      titleAr: "دليل إجراءات الشكاوى والمقترحات المجتمعية (CFRM SOPs)",
      titleEn: "Community Feedback & Response Mechanism (CFRM) SOP",
      titleFr: "Manuel de Procédures Opérationnelles CFRM (Plaintes & Retours)",
      categoryAr: "المساءلة للمتأثرين (AAP)",
      categoryEn: "Accountability (AAP)",
      categoryFr: "Redevabilité (AAP)",
      format: "PDF / Editable DOCX",
      size: "3.1 MB",
      badge: "معيار CHS الالتزام 5",
      badgeEn: "CHS Commitment 5",
      badgeFr: "Engagement 5 de la Norme CHS",
      descAr: "دليل إجرائي مفصل يحدد دورة حياة الشكوى من لحظة استلامها وحتى الرد عليها وحفظ سرية المعلومات.",
      descEn: "Standard operating manual defining complaint lifecycle, strict confidentiality rules, and community feedback response SLAs.",
      descFr: "Guide méthodologique régissant le cycle de vie des réclamations communautaires, la confidentialité et les délais de réponse.",
      contentOutline: [
        "الفصل 1: قنوات الإبلاغ المقبولة (الصناديق الآمنة، الهاتف، اللجان المجتمعية)",
        "الفصل 2: مصفوفة تصنيف البلاغات (حساسة جداً PSEA • فساد مالي • تشغيلية)",
        "الفصل 3: الحدود الزمنية للاستجابة والبت في الشكاوى (خلال 48 ساعة إلى 14 يوماً)",
        "الفصل 4: سجل التوثيق المشفر ولوحة قياس رضا المستفيدين"
      ],
      contentOutlineEn: [
        "Chapter 1: Accessible Reporting Channels (Confidential Boxes, Phone Hotlines, Community Desks)",
        "Chapter 2: Incident Severity Classification Matrix (Sensitive PSEA • Financial Fraud • Operational Issues)",
        "Chapter 3: Service Level Agreements (SLAs) for Response & Resolution (Within 48h to 14 days)",
        "Chapter 4: Encrypted Incident Log & Beneficiary Satisfaction Analytics Dashboard"
      ],
      contentOutlineFr: [
        "Chapitre 1 : Canaux de Signalement Accessibles (Boîtes Sécurisées, Téléphone, Comités Locaux)",
        "Chapitre 2 : Matrice de Classification des Incidents (Très Sensible PEAS • Fraude • Opérationnel)",
        "Chapitre 3 : Délais Garantis de Traitement & Résolution (De 48h à 14 jours)",
        "Chapitre 4 : Registre Crypté des Réclamations & Tableau de Bord de Satisfaction"
      ]
    },
    {
      id: "tk-charter",
      titleAr: "ميثاق المشروع وهيكل الحوكمة (Project Charter Template)",
      titleEn: "Project Charter & Governance Structure Template",
      titleFr: "Charte de Projet & Cadre de Gouvernance Opérationnelle",
      categoryAr: "الحوكمة المؤسسية",
      categoryEn: "Institutional Governance",
      categoryFr: "Gouvernance Institutionnelle",
      format: "DOCX / Presentation",
      size: "1.5 MB",
      badge: "حوكمة مؤسسية",
      badgeEn: "Corporate Governance",
      badgeFr: "Gouvernance d'Entreprise",
      descAr: "وثيقة تأسيس وتفويض المشاريع الرسمية التي تحدد النطاق، أصحاب المصلحة، خطة الميزانية، وصلاحيات فريق العمل.",
      descEn: "Formal project authorization document defining scope, stakeholder register, RACI matrix, and budgetary milestones.",
      descFr: "Document officiel d'autorisation de projet définissant le périmètre d'intervention, la matrice RACI et les jalons budgétaires.",
      contentOutline: [
        "1. مبررات المشروع والأثر الاستراتيجي والمخرجات المتوقعة",
        "2. مصفوفة الصلاحيات والمسؤوليات (RACI Matrix)",
        "3. خطة التواصل وإدارة توقعات الشركاء والجهات المانحة",
        "4. خطة الاستدامة وتسليم مخرجات المشروع للمجتمع المحلي"
      ],
      contentOutlineEn: [
        "1. Project Strategic Justification, Expected Outcomes & Theory of Change",
        "2. Responsibility Assignment Matrix (RACI Matrix)",
        "3. Stakeholder Engagement, Communication & Donor Reporting Plan",
        "4. Sustainability Strategy & Formal Handover Protocol to Local Communities"
      ],
      contentOutlineFr: [
        "1. Justification Stratégique du Projet, Résultats Attendus & Théorie du Changement",
        "2. Matrice d'Attribution des Responsabilités (Matrice RACI)",
        "3. Plan de Communication & Gestion des Relations Bailleurs et Partenaires",
        "4. Stratégie de Pérennisation & Protocole de Transfert aux Communautés Locales"
      ]
    },
    {
      id: "tk-cm-intake",
      titleAr: "استمارة دراسة وتقييم الحالة الشاملة ونموذج الموافقة المستنيرة (Case Intake & Assessment)",
      titleEn: "Comprehensive Case Management Intake & Informed Consent Tool",
      titleFr: "Formulaire Évaluation Complète de Cas & Consentement Éclairé",
      categoryAr: "إدارة الحالة والرعاية",
      categoryEn: "Case Management",
      categoryFr: "Gestion de Cas & Protection",
      format: "PDF / Editable Form",
      size: "2.1 MB",
      badge: "متوافق مع معايير حماية الطفل",
      badgeEn: "Child Protection Compliant",
      badgeFr: "Conforme aux Normes de Protection de l'Enfant",
      descAr: "أداة توثيق مهنية تضم نموذج الموافقة المستنيرة، شجرة تقييم المخاطر، مصفوفة نقاط القوة والاحتياجات، وخطة التدخل الفردي.",
      descEn: "Standardized case intake instrument featuring continuous informed consent, vulnerability screening, and multi-sectoral care planning.",
      descFr: "Instrument standardisé d'évaluation multidimensionnelle intégrant consentement éclairé, dépistage des vulnérabilités et plan d'aide.",
      contentOutline: [
        "القسم 1: بيانات التسجيل الأساسية وإقرار الموافقة المستنيرة (Informed Consent/Assent)",
        "القسم 2: التقييم متعدد الأبعاد (الوضع الصحي، النفسي-اجتماعي، الحماية، والتعليم)",
        "القسم 3: مصفوفة تحليل المخاطر ونقاط القوة والمساندة الأسرية والمجتمعية",
        "القسم 4: خطة العمل الفردية، مواعيد المتابعة الميدانية، ومسارات الإحالة الآمنة"
      ],
      contentOutlineEn: [
        "Section 1: Client Registration Demographics & Informed Consent / Assent Agreement",
        "Section 2: Multi-Sectoral Assessment (Health, Psychosocial Well-being, Protection, Education)",
        "Section 3: Risk Level Analysis, Individual Strengths & Family Support Systems",
        "Section 4: Individual Care Plan, Case Review Scheduling & Safe Referral Pathways"
      ],
      contentOutlineFr: [
        "Section 1 : Données d'Enregistrement Initiales & Accord de Consentement Éclairé",
        "Section 2 : Évaluation Multidimensionnelle (Santé, Bien-être Psychosocial, Protection, Éducation)",
        "Section 3 : Analyse des Facteurs de Risque, Forces Individuelles & Soutien Familial",
        "Section 4 : Plan d'Accompagnement Personnalisé, Calendrier de Suivi & Référencement Sécurisé"
      ]
    },
    {
      id: "tk-oecd-evaluation",
      titleAr: "مصفوفة معايير التقييم الخارجي المستقل (OECD DAC Evaluation Matrix)",
      titleEn: "OECD DAC Independent Evaluation Framework & Data Protocols",
      titleFr: "Cadre Méthodologique d'Évaluation Indépendante OCDE/CAD",
      categoryAr: "التقييم وضمان الجودة",
      categoryEn: "Evaluation & Quality",
      categoryFr: "Évaluation & Assurance Qualité",
      format: "XLSX / DOCX",
      size: "2.8 MB",
      badge: "معيار OECD DAC الدولي",
      badgeEn: "OECD DAC Accredited",
      badgeFr: "Homologué OCDE/CAD",
      descAr: "مصفوفة توجيهية تشتمل على أسئلة التقييم ومصادر الأدلة ومؤشرات القياس وفق معايير الملاءمة، الفعالية، الكفاءة، التماسك، الأثر، والاستدامة.",
      descEn: "Operational evaluation matrix outlining research questions, data sources, and triangulation methodologies across the 6 OECD DAC criteria.",
      descFr: "Matrice directrice articulant questions évaluatives, sources de preuves et méthodes de triangulation selon les 6 critères officiels du CAD.",
      contentOutline: [
        "المعيار 1: الملاءمة والتماسك (Relevance & Coherence) — فحص الاحتياجات والأولويات",
        "المعيار 2: الفعالية والكفاءة (Effectiveness & Efficiency) — تحقيق الأهداف وإدارة الموارد",
        "المعيار 3: الأثر التراكمي والاستدامة (Impact & Sustainability) — التغيير طويل الأجل",
        "المعيار 4: أدوات جمع البيانات الميدانية (مقابلات الخبراء KIIs ومجموعات النقاش FGDs)"
      ],
      contentOutlineEn: [
        "Criterion 1: Relevance & Coherence — Alignment with Humanitarian Needs & Priorities",
        "Criterion 2: Effectiveness & Efficiency — Goal Achievement & Prudent Resource Stewardship",
        "Criterion 3: Cumulative Impact & Sustainability — Long-Term Systemic Transformation",
        "Criterion 4: Field Primary Data Collection Protocols (Key Informant Interviews & Focus Groups)"
      ],
      contentOutlineFr: [
        "Critère 1 : Pertinence & Cohérence — Alignement avec les Besoins Humanitaires et Priorités",
        "Critère 2 : Efficacité & Efficience — Atteinte des Objectifs & Gestion Optimale des Ressources",
        "Critère 3 : Impact Cumulatif & Durabilité — Transformations Systémiques à Long Terme",
        "Critère 4 : Protocoles de Collecte de Données Primaires (Entretiens d'Experts & Groupes de Discussion)"
      ]
    }
  ],

  renderSection(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    const getTitle = (tk) => (lang === 'fr' ? (tk.titleFr || tk.titleEn) : (lang === 'en' ? tk.titleEn : tk.titleAr));
    const getDesc = (tk) => (lang === 'fr' ? (tk.descFr || tk.descEn) : (lang === 'en' ? tk.descEn : tk.descAr));
    const getCat = (tk) => (lang === 'fr' ? (tk.categoryFr || tk.categoryEn) : (lang === 'en' ? tk.categoryEn : tk.categoryAr));
    const getBadge = (tk) => (lang === 'fr' ? (tk.badgeFr || tk.badgeEn) : (lang === 'en' ? tk.badgeEn : tk.badge));
    const getOutlines = (tk) => (lang === 'fr' ? (tk.contentOutlineFr || tk.contentOutlineEn) : (lang === 'en' ? tk.contentOutlineEn : tk.contentOutline));

    return `
      <div class="toolkits-library-section" style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: clamp(24px, 4vw, 40px); border: 1px solid var(--border-light); margin-top: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 28px;">
          <div>
            <div class="section-badge" style="margin-bottom: 8px;">
              ${txt('مكتبة الأدوات المؤسسية • Field Toolkits Hub', 'Institutional Field Toolkits', 'Boîte à Outils Institutionnelle')}
            </div>
            <h3 style="font-size: 1.45rem; font-weight: 900; color: var(--shat-navy); margin: 0 0 6px 0;">
              ${txt('الحقائب الميدانية والنماذج التشغيلية المعتمدة', 'Standardized Operational Toolkits & Templates', 'Modèles Opérationnels & Guides de Terrain')}
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; max-width: 640px;">
              ${txt(
                'نماذج وأدلة عمل جاهزة للتطبيق الفوري، طُوّرت وفق أعلى المعايير الدولية لمساندة المؤسسات وفرق العمل في الميدان.',
                'Ready-to-deploy operational templates crafted to international compliance standards for local NGOs and development teams.',
                'Modèles opérationnels prêts au déploiement, conçus selon les meilleures pratiques internationales.'
              )}
            </p>
          </div>
          <div>
            <a href="#/${lang}/contact" class="btn-clean btn-secondary btn-sm">
              <span>${txt('طلب حقيبة مخصصة لمؤسستكم', 'Request Custom Toolkit', 'Demander une Boîte sur Mesure')}</span>
              <span style="display:inline-flex; align-items:center;">${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>
            </a>
          </div>
        </div>

        <!-- Toolkits Grid -->
        <div class="bento-grid grid-2">
          ${this.toolkits.map(tk => {
            const outlines = getOutlines(tk);
            return `
            <div class="bento-card" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="bento-header" style="margin-bottom: 10px;">
                  <span style="font-size: 0.78rem; font-weight: 800; color: var(--shat-green); background: var(--shat-green-tint); padding: 3px 8px; border-radius: 4px;">
                    ${getCat(tk)}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
                    ${tk.format} • ${tk.size}
                  </span>
                </div>

                <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px; line-height: 1.4;">
                  ${getTitle(tk)}
                </h4>

                <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
                  ${getDesc(tk)}
                </p>

                <!-- Outline Preview -->
                <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 12px 14px; margin-bottom: 16px;">
                  <div style="font-size: 0.78rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 6px;">
                    ${txt('محتويات القالب الأساسية:', 'Core Template Components:', 'Composants Clés :')}
                  </div>
                  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
                    ${outlines.map(item => `
                      <li style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 6px;">
                        <span style="color: var(--shat-green);">✓</span>
                        <span>${item}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <div class="bento-footer" style="display: flex; gap: 10px; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 14px; margin-top: 8px;">
                <span class="badge" style="background: #F0FDF4; color: #166534; font-size: 0.74rem; display: inline-flex; align-items: center; gap: 4px;">
                  ${icons.checkCircle('icon-inline', 13)} <span>${getBadge(tk)}</span>
                </span>

                <button class="btn-clean btn-primary btn-sm btn-open-toolkit-preview" data-toolkit="${tk.id}">
                  <span>${txt('معاينة وتحميل النموذج', 'Preview & Download', 'Aperçu & Téléchargement')}</span>
                </button>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>
    `;
  },

  openPreview(toolkitId, lang = 'ar') {
    const modal = document.getElementById('modal-toolkit-preview');
    const modalBody = document.getElementById('modal-toolkit-body');
    const modalTitle = document.getElementById('modal-toolkit-title');
    if (!modal || !modalBody) return;

    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));
    const tk = this.toolkits.find(t => t.id === toolkitId) || this.toolkits[0];

    const title = lang === 'fr' ? (tk.titleFr || tk.titleEn) : (lang === 'en' ? tk.titleEn : tk.titleAr);
    const desc = lang === 'fr' ? (tk.descFr || tk.descEn) : (lang === 'en' ? tk.descEn : tk.descAr);
    const category = lang === 'fr' ? (tk.categoryFr || tk.categoryEn) : (lang === 'en' ? tk.categoryEn : tk.categoryAr);
    const outlines = lang === 'fr' ? (tk.contentOutlineFr || tk.contentOutlineEn) : (lang === 'en' ? tk.contentOutlineEn : tk.contentOutline);

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    modalBody.innerHTML = `
      <div style="text-align: ${isRtl ? 'right' : 'left'};">
        <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span class="badge badge-primary">${category}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${tk.format} • ${tk.size}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.6;">
            ${desc}
          </p>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
              ${txt('فهرس وهيكل القالب وقائمة التحقق التفاعلية:', 'Detailed Architecture & Interactive Checklist:', 'Structure & Liste de Contrôle :')}
            </h5>
            <span id="tk-checklist-counter" style="font-size: 0.78rem; font-weight: 800; color: var(--shat-green);">0 / ${outlines.length} ${txt('مكتمل', 'Completed', 'Validé')}</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${outlines.map((item, idx) => `
              <label style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 10px 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" class="tk-check-item" style="width: 18px; height: 18px; accent-color: var(--shat-green); cursor: pointer;" />
                <span style="font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); font-size: 0.85rem;">0${idx + 1}</span>
                <span style="font-size: 0.86rem; color: var(--text-secondary); font-weight: 600;">${item}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-xs); padding: 14px; margin-bottom: 20px; font-size: 0.84rem; color: #166534; line-height: 1.6;">
          ${txt(
            'هذا النموذج مملوك لشركة شات ومتاح للاستخدام المهني غير التجاري للمنظمات الإنسانية والتنموية الشريكة والمتدربين المعتمدين.',
            'Licensed for non-commercial institutional use by SHAT partner organizations and certified trainees.',
            'Licence d’utilisation non commerciale réservée aux organisations partenaires et stagiaires certifiés.'
          )}
        </div>

        <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <button type="button" class="btn-clean btn-secondary btn-sm" onclick="document.getElementById('modal-toolkit-preview').classList.remove('open');">
            ${txt('إغلاق', 'Close', 'Fermer')}
          </button>
          
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-clean btn-sm allow-print" onclick="window.print();" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              ${icons.printer('icon-inline', 14)} <span>${txt('طباعة القائمة', 'Print Checklist', 'Imprimer')}</span>
            </button>
            <button type="button" class="btn-clean btn-primary btn-sm btn-download-tk-direct" data-title="${title}" style="display: inline-flex; align-items: center; gap: 4px;">
              ${icons.download('icon-inline', 14)} <span>${txt('تحميل الحقيبة الرسمية', 'Download Toolkit', 'Télécharger')}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Interactive checklist update
    const checkBoxes = modalBody.querySelectorAll('.tk-check-item');
    const counter = modalBody.querySelector('#tk-checklist-counter');
    checkBoxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = modalBody.querySelectorAll('.tk-check-item:checked').length;
        if (counter) {
          counter.textContent = `${checked} / ${checkBoxes.length} ${txt('مكتمل', 'Completed', 'Validé')}`;
        }
      });
    });

    // Intercept unauthenticated users
    const btnDown = modalBody.querySelector('.btn-download-tk-direct');
    if (btnDown) {
      btnDown.onclick = () => {
        const user = localStorage.getItem('shat_platform_current_user');
        if (user) {
          alert(txt('جاري بدء تنزيل حزمة النموذج المعتمدة...', 'Downloading accredited toolkit package...', 'Téléchargement du pack officiel en cours...'));
        } else {
          if (window.openPermissionGuard) {
            window.openPermissionGuard(title, 'student');
          }
        }
      };
    }

    modal.classList.add('open');
  },

  bindEvents(lang = 'ar') {
    document.querySelectorAll('.btn-open-toolkit-preview').forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.getAttribute('data-toolkit');
        this.openPreview(id, lang);
      };
    });
  }
};
