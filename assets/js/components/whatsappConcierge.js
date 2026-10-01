// assets/js/components/whatsappConcierge.js
// Smart Interactive WhatsApp & Social Concierge for SHAT Platform
// Provides immediate access to course enrollment, consulting inquiries, certificate verification, and social channels

export class WhatsAppConcierge {
  constructor() {
    this.isOpen = false;
    this.phone = '972592879621';
    this.fbUrl = 'https://www.facebook.com/shat.development.growth/';
    this.igUrl = 'https://www.instagram.com/shat.development.growth/';
    this.init();
  }

  init() {
    this.createDom();
    this.bindEvents();
  }

  createDom() {
    if (document.getElementById('shat-concierge-container')) return;

    const container = document.createElement('div');
    container.id = 'shat-concierge-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9999;
      font-family: inherit;
    `;

    container.innerHTML = `
      <!-- Concierge Popover Window -->
      <div id="shat-concierge-card" style="
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 340px;
        max-width: calc(100vw - 32px);
        background: #FFFFFF;
        border-radius: 18px;
        box-shadow: 0 20px 40px -10px rgba(11, 30, 54, 0.25), 0 0 0 1px rgba(11, 30, 54, 0.08);
        overflow: hidden;
        display: none;
        flex-direction: column;
        transform: translateY(12px) scale(0.95);
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <!-- Card Header -->
        <div style="background: linear-gradient(135deg, #0B1E36 0%, #16365C 100%); color: #FFFFFF; padding: 18px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #1E7E34; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                💬
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.96rem; line-height: 1.3;">شركة شات للتنمية والتطوير</div>
                <div style="font-size: 0.74rem; color: #86EFAC; display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                  <span style="width: 7px; height: 7px; border-radius: 50%; background: #22C55E; display: inline-block;"></span>
                  <span>فريق خدمة العملاء متصل الآن</span>
                </div>
              </div>
            </div>
            <button id="btn-close-concierge" style="background: transparent; border: none; color: #94A3B8; font-size: 1.2rem; cursor: pointer; padding: 2px 6px;">✕</button>
          </div>
          <p style="font-size: 0.82rem; color: #CBD5E1; margin: 12px 0 0; line-height: 1.5;">
            مرحباً بك! 👋 اختر موضوع استفسارك للتواصل الفوري والمباشر مع المستشار المختص عبر واتساب:
          </p>
        </div>

        <!-- Quick Action Query Chips -->
        <div style="padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto; background: #F8FAFC;">
          <button class="concierge-chip" data-msg="مرحباً شركة شات، أود الاستفسار والتسجيل في دورة إدارة الحالة Case Management (د. محمد إسليم)">
            <span>🤝</span>
            <span>دورة إدارة الحالة (د. محمد إسليم)</span>
          </button>

          <button class="concierge-chip" data-msg="مرحباً شركة شات، أود الاستفسار والتسجيل في دورة مهارات العرض والتقديم Presentation Skills (م. مهدي الملاحي)">
            <span>🎤</span>
            <span>دورة مهارات العرض (م. مهدي الملاحي)</span>
          </button>

          <button class="concierge-chip" data-msg="مرحباً شركة شات، أود الاستفسار عن دبلوم الممارس الإنساني وبناء القدرات (CHS Master) والمنح المتاحة">
            <span>🛡️</span>
            <span>دبلوم معيار CHS الإنساني</span>
          </button>

          <button class="concierge-chip" data-msg="مرحباً شركة شات، نود طلب استشارة مؤسسية لتطوير النظم واللوائح التشغيلية أو تقييم مشاريع لجمعيتنا/مؤسستنا">
            <span>🏛️</span>
            <span>طلب استشارة وبناء قدرات لمؤسسة</span>
          </button>

          <button class="concierge-chip" data-msg="مرحباً شركة شات، أود الاستفسار عن التحقق من صحة واعتماد شهادة صادرة برقم تسلسلي">
            <span>📜</span>
            <span>التحقق من صحة شهادة صادرة</span>
          </button>

          <button class="concierge-chip" data-msg="مرحباً شركة شات، أود الاستفسار عن الرسوم وطرق الدفع المتاحة (بنك فلسطين، بال باي، جوال باي، كاش)">
            <span>💳</span>
            <span>طرق الدفع والرسوم والمنح الجزئية</span>
          </button>
        </div>

        <!-- Custom Message Input Box -->
        <div style="padding: 12px 16px; background: #FFFFFF; border-top: 1px solid #E2E8F0;">
          <form id="concierge-custom-form" style="display: flex; gap: 8px;">
            <input type="text" id="concierge-custom-text" placeholder="اكتب استفسارك المخصص..." style="
              flex: 1;
              padding: 9px 12px;
              border: 1px solid #CBD5E1;
              border-radius: 8px;
              font-size: 0.85rem;
              outline: none;
              font-family: inherit;
            ">
            <button type="submit" style="
              background: #25D366;
              color: #FFFFFF;
              border: none;
              border-radius: 8px;
              padding: 0 14px;
              font-weight: 800;
              font-size: 0.88rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">إرسال</button>
          </form>
        </div>

        <!-- Social Channels Footer -->
        <div style="padding: 10px 16px; background: #F1F5F9; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem; color: #64748B;">
          <span>تابع منصاتنا الرسمية:</span>
          <div style="display: flex; gap: 10px;">
            <a href="${this.fbUrl}" target="_blank" rel="noopener" style="color: #1877F2; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 3px;">
              <span>فيسبوك</span>
            </a>
            <span>•</span>
            <a href="${this.igUrl}" target="_blank" rel="noopener" style="color: #E1306C; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 3px;">
              <span>انستغرام</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Trigger Floating Button -->
      <button id="btn-toggle-concierge" type="button" aria-label="WhatsApp Concierge" style="
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #25D366;
        color: #FFFFFF;
        border: none;
        box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s;
        position: relative;
      ">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2C6.516 2 2.016 6.5 2.016 12.016a9.98 9.98 0 0 0 1.484 5.25L2 22l4.891-1.453a9.95 9.95 0 0 0 5.14 1.422h.005c5.516 0 10.016-4.5 10.016-10.016C22.052 6.5 17.547 2 12.031 2zm5.844 14.219c-.25.703-1.453 1.344-2 1.406-.516.063-1.188.094-3.828-.984-3.375-1.375-5.547-4.813-5.719-5.047-.156-.234-1.359-1.813-1.359-3.453 0-1.641.859-2.453 1.172-2.781.313-.328.672-.406.891-.406.219 0 .438 0 .625.016.203.016.484-.078.75.563.281.672.953 2.328 1.031 2.5.094.172.156.391.031.625-.109.234-.172.375-.344.578-.172.203-.359.453-.516.609-.172.172-.344.359-.156.688.203.328.891 1.469 1.922 2.391 1.328 1.188 2.453 1.547 2.781 1.719.328.172.531.141.719-.078.203-.234.859-1.016 1.094-1.359.234-.344.469-.281.781-.172.328.109 2.063.969 2.422 1.141.359.188.594.281.688.438.094.172.094.984-.156 1.687z"/>
        </svg>

        <!-- Notification Pulse Dot -->
        <span style="
          position: absolute;
          top: 0;
          right: 0;
          width: 14px;
          height: 14px;
          background: #DC2626;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
        "></span>
      </button>
    `;

    // Style for chips
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .concierge-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 9px 12px;
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        font-size: 0.82rem;
        font-weight: 700;
        color: #1E293B;
        cursor: pointer;
        text-align: right;
        transition: all 0.15s ease;
      }
      .concierge-chip:hover {
        background: #F0FDF4;
        border-color: #22C55E;
        color: #15803D;
        transform: translateX(-3px);
      }
      #btn-toggle-concierge:hover {
        transform: scale(1.08);
      }
      #btn-toggle-concierge:active {
        transform: scale(0.95);
      }
    `;
    document.head.appendChild(styleEl);

    document.body.appendChild(container);
  }

  bindEvents() {
    const trigger = document.getElementById('btn-toggle-concierge');
    const closeBtn = document.getElementById('btn-close-concierge');
    const card = document.getElementById('shat-concierge-card');
    const chips = document.querySelectorAll('.concierge-chip');
    const customForm = document.getElementById('concierge-custom-form');
    const customInput = document.getElementById('concierge-custom-text');

    if (trigger) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        this.toggle();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => this.close();
    }

    chips.forEach(chip => {
      chip.onclick = () => {
        const msg = chip.getAttribute('data-msg');
        this.openWhatsApp(msg);
        this.close();
      };
    });

    if (customForm) {
      customForm.onsubmit = (e) => {
        e.preventDefault();
        const text = (customInput?.value || '').trim();
        if (!text) return;
        this.openWhatsApp(text);
        if (customInput) customInput.value = '';
        this.close();
      };
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('#shat-concierge-container')) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    const card = document.getElementById('shat-concierge-card');
    if (card) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 10);
    }
  }

  close() {
    this.isOpen = false;
    const card = document.getElementById('shat-concierge-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 250);
    }
  }

  openWhatsApp(message) {
    const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }
}

export function initWhatsAppConcierge() {
  return new WhatsAppConcierge();
}
