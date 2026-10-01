// assets/js/tools/toolkitsLibrary.js
// Field Toolkits & Operational Templates Hub for SHAT Platform
// Provides standardized, institutional-grade downloadable frameworks and templates

export const toolkitsLibrary = {
  toolkits: [
    {
      id: "tk-meal",
      titleAr: "نموذج خطة المتابعة والتقييم والمساءلة والتعلم (MEAL Plan Master)",
      titleEn: "Comprehensive MEAL Plan & Indicator Tracking Matrix",
      categoryAr: "إدارة المشاريع والتقييم",
      categoryEn: "Project MEAL & Impact",
      format: "XLSX / Google Sheets",
      size: "2.4 MB",
      badge: "معتمد دولياً",
      badgeEn: "Internationally Accredited",
      descAr: "قالب متكامل يشتمل على مؤشرات الأداء (KPIs)، مصفوفة جمع البيانات، جداول التكرار، وتحديد المسؤوليات الميدانية لضمان دقة الرصد.",
      descEn: "Standardized master framework featuring baseline-target matrices, data collection protocols, and verified indicator governance.",
      contentOutline: [
        "ورقة 1: الإطار المنطقي العام للمشروع (Logframe) والمؤشرات الذكية (SMART)",
        "ورقة 2: مصفوفة تتبع المؤشرات (Indicator Tracking Table - ITT) بالقيم المرجعية والمستهدفة",
        "ورقة 3: خطة جمع البيانات الميدانية، أدوات المسح، وحجم العينات الإحصائية",
        "ورقة 4: مصفوفة إدارة المخاطر وتحديد فترات التغذية الراجعة وحلقات التعلم المستمر"
      ]
    },
    {
      id: "tk-psea",
      titleAr: "مصفوفة تقييم مخاطر الحماية وصون السلامة (PSEA Risk Matrix)",
      titleEn: "PSEA & Safeguarding Risk Assessment Matrix",
      categoryAr: "الحماية والامتثال الإنساني",
      categoryEn: "Protection & Compliance",
      format: "DOCX / PDF",
      size: "1.8 MB",
      badge: "متوافق مع IASC",
      badgeEn: "IASC Compliant",
      descAr: "أداة فحص وتدقيق للمخاطر التشغيلية المرتبطة بتوزيع المساعدات ومراكز الإيواء وبرامج التمكين مع تدابير الوقاية الصارمة.",
      descEn: "Operational screening tool identifying sexual exploitation and abuse risks across field distribution sites and shelter operations.",
      contentOutline: [
        "القسم 1: تقييم بيئة العمل وتحديد نقاط الضعف في سلاسل التوريد والتوزيع",
        "القسم 2: إجراءات التدقيق والتحقق من خلفيات الموظفين والمتطوعين والموردين",
        "القسم 3: بروتوكول الخط الساخن السري وتصنيف الشكاوى وحماية المبلغين",
        "القسم 4: مسار الإحالة السريع للرعاية الطبية والدعم النفسي-اجتماعي"
      ]
    },
    {
      id: "tk-cfrm",
      titleAr: "دليل إجراءات الشكاوى والمقترحات المجتمعية (CFRM SOPs)",
      titleEn: "Community Feedback & Response Mechanism (CFRM) SOP",
      categoryAr: "المساءلة للمتأثرين (AAP)",
      categoryEn: "Accountability (AAP)",
      format: "PDF / Editable DOCX",
      size: "3.1 MB",
      badge: "معيار CHS الالتزام 5",
      badgeEn: "CHS Commitment 5",
      descAr: "دليل إجرائي مفصل يحدد دورة حياة الشكوى من لحظة استلامها وحتى الرد عليها وحفظ سرية المعلومات.",
      descEn: "Standard operating manual defining complaint lifecycle, strict confidentiality rules, and community feedback response SLAs.",
      contentOutline: [
        "الفصل 1: قنوات الإبلاغ المقبولة (الصناديق الآمنة، الهاتف، اللجان المجتمعية)",
        "الفصل 2: مصفوفة تصنيف البلاغات (حساسة جداً PSEA • فساد مالي • تشغيلية)",
        "الفصل 3: الحدود الزمنية للاستجابة والبت في الشكاوى (خلال 48 ساعة إلى 14 يوماً)",
        "الفصل 4: سجل التوثيق المشفر ولوحة قياس رضا المستفيدين"
      ]
    },
    {
      id: "tk-charter",
      titleAr: "ميثاق المشروع وهيكل الحوكمة (Project Charter Template)",
      titleEn: "Project Charter & Governance Structure Template",
      categoryAr: "الحوكمة المؤسسية",
      categoryEn: "Institutional Governance",
      format: "DOCX / Presentation",
      size: "1.5 MB",
      badge: "حوكمة مؤسسية",
      badgeEn: "Corporate Governance",
      descAr: "وثيقة تأسيس وتفويض المشاريع الرسمية التي تحدد النطاق، أصحاب المصلحة، خطة الميزانية، وصلاحيات فريق العمل.",
      descEn: "Formal project authorization document defining scope, stakeholder register, RACI matrix, and budgetary milestones.",
      contentOutline: [
        "1. مبررات المشروع والأثر الاستراتيجي والمخرجات المتوقعة",
        "2. مصفوفة الصلاحيات والمسؤوليات (RACI Matrix)",
        "3. خطة التواصل وإدارة توقعات الشركاء والجهات المانحة",
        "4. خطة الاستدامة وتسليم مخرجات المشروع للمجتمع المحلي"
      ]
    }
  ],

  renderSection(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

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
            <a href="#/contact" class="btn-clean btn-secondary btn-sm">
              <span>${txt('طلب حقيبة مخصصة لمؤسستكم', 'Request Custom Toolkit', 'Demander une Boîte sur Mesure')}</span>
              <span>${isRtl ? '←' : '→'}</span>
            </a>
          </div>
        </div>

        <!-- Toolkits Grid -->
        <div class="bento-grid grid-2">
          ${this.toolkits.map(tk => `
            <div class="bento-card" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="bento-header" style="margin-bottom: 10px;">
                  <span style="font-size: 0.78rem; font-weight: 800; color: var(--shat-green); background: var(--shat-green-tint); padding: 3px 8px; border-radius: 4px;">
                    ${isRtl ? tk.categoryAr : tk.categoryEn}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
                    ${tk.format} • ${tk.size}
                  </span>
                </div>

                <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px; line-height: 1.4;">
                  ${isRtl ? tk.titleAr : tk.titleEn}
                </h4>

                <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
                  ${isRtl ? tk.descAr : tk.descEn}
                </p>

                <!-- Outline Preview -->
                <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 12px 14px; margin-bottom: 16px;">
                  <div style="font-size: 0.78rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 6px;">
                    ${txt('محتويات القالب الأساسية:', 'Core Template Components:', 'Composants Clés :')}
                  </div>
                  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
                    ${tk.contentOutline.map(item => `
                      <li style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 6px;">
                        <span style="color: var(--shat-green);">▪</span>
                        <span>${item}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <div class="bento-footer" style="display: flex; gap: 10px; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 14px; margin-top: 8px;">
                <span class="badge" style="background: #F0FDF4; color: #166534; font-size: 0.74rem;">
                  ✓ ${isRtl ? tk.badge : tk.badgeEn}
                </span>

                <button class="btn-clean btn-primary btn-sm btn-open-toolkit-preview" data-toolkit="${tk.id}">
                  <span>👁️ ${txt('معاينة وتحميل النموذج', 'Preview & Download', 'Aperçu & Téléchargement')}</span>
                </button>
              </div>
            </div>
          `).join('')}
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

    if (modalTitle) {
      modalTitle.textContent = isRtl ? tk.titleAr : tk.titleEn;
    }

    modalBody.innerHTML = `
      <div style="text-align: ${isRtl ? 'right' : 'left'};">
        <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span class="badge badge-primary">${isRtl ? tk.categoryAr : tk.categoryEn}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${tk.format} • ${tk.size}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.6;">
            ${isRtl ? tk.descAr : tk.descEn}
          </p>
        </div>

        <div style="margin-bottom: 20px;">
          <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
            ${txt('فهرس وهيكل القالب المؤسسي:', 'Detailed Document Architecture:', 'Structure Détaillée :')}
          </h5>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${tk.contentOutline.map((item, idx) => `
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); font-size: 0.85rem;">0${idx + 1}</span>
                <span style="font-size: 0.86rem; color: var(--text-secondary); font-weight: 600;">${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-xs); padding: 14px; margin-bottom: 20px; font-size: 0.84rem; color: #166534; line-height: 1.6;">
          🔒 ${txt(
            'هذا النموذج مملوك لشركة شات ومتاح للاستخدام المهني غير التجاري للمنظمات الإنسانية والتنموية الشريكة والمتدربين المعتمدين.',
            'Licensed for non-commercial institutional use by SHAT partner organizations and certified trainees.',
            'Licence d’utilisation non commerciale réservée aux organisations partenaires et stagiaires certifiés.'
          )}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn-clean btn-secondary btn-sm" onclick="document.getElementById('modal-toolkit-preview').classList.remove('open');">
            ${txt('إغلاق', 'Close', 'Fermer')}
          </button>
          <a href="#/contact" class="btn-clean btn-primary btn-sm" onclick="document.getElementById('modal-toolkit-preview').classList.remove('open');">
            <span>📥 ${txt('طلب تحميل النسخة الأصلية القابلة للتعديل', 'Request Editable Version', 'Télécharger la Version Éditée')}</span>
          </a>
        </div>
      </div>
    `;

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
