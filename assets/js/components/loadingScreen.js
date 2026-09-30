// assets/js/components/loadingScreen.js
// SHAT Platform — Official Brand Loading Screen & Logo Assembly Animation
// Reconstructed from official institutional logo references in C:\SHAT_Company

export function initLoadingScreen() {
  // If already shown in this tab session, shorten or skip
  const alreadyShown = sessionStorage.getItem('shat_intro_shown');
  
  const overlay = document.createElement('div');
  overlay.id = 'shat-loading-screen';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="shat-loader-container">
      <div class="shat-loader-stage">
        <svg class="shat-loader-svg" viewBox="0 0 640 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shatGreenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#15803D" />
              <stop offset="60%" stop-color="#16A34A" />
              <stop offset="100%" stop-color="#22C55E" />
            </linearGradient>
            <linearGradient id="shatNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1A4770" />
              <stop offset="100%" stop-color="#0B2545" />
            </linearGradient>
            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- ==================== EMBLEM (LEFT) ==================== -->
          <g class="shat-emblem-group" id="emblemGroup">
            <!-- 1. Left Wrapping Green Arc -->
            <path class="anim-part anim-arc" d="M 68 185 C 22 170 12 115 50 82 C 68 67 96 68 108 80 C 72 82 52 108 55 142 C 58 170 78 185 106 182 Z" fill="url(#shatGreenGrad)" />

            <!-- 2. Human Figure: Head (Navy) -->
            <circle class="anim-part anim-head" cx="132" cy="74" r="28" fill="url(#shatNavyGrad)" />

            <!-- 3. Human Figure: Torso & Uplifted Arms (Navy) -->
            <path class="anim-part anim-body" d="M 132 108 C 112 108 84 94 62 70 C 66 94 82 128 106 148 C 114 154 122 188 95 240 C 122 208 142 168 142 142 C 142 122 140 108 132 108 Z" fill="url(#shatNavyGrad)" />

            <!-- 4. Secondary Inner Ascending Arrow -->
            <path class="anim-part anim-arrow-sub" d="M 108 205 Q 165 160 198 98 L 192 114 L 210 82 L 180 88 L 195 96 Q 160 155 108 205 Z" fill="#133E68" />

            <!-- 5. Lower Leaf Foundation (Green) -->
            <path class="anim-part anim-leaf" d="M 74 252 C 118 252 198 228 206 132 C 182 192 126 230 74 252 Z" fill="url(#shatGreenGrad)" />

            <!-- 6. Primary Dynamic Ascending Arrow (Green) -->
            <g class="anim-part anim-arrow-main">
              <!-- Arrow Stem -->
              <path d="M 78 245 Q 148 180 208 65 L 182 82 L 235 24 L 236 86 L 212 68 Q 155 178 78 245 Z" fill="url(#shatGreenGrad)" filter="url(#subtleGlow)" />
            </g>
          </g>

          <!-- ==================== VERTICAL DIVIDER ==================== -->
          <line class="anim-part anim-divider" x1="262" y1="46" x2="262" y2="238" stroke="#0F2E4A" stroke-width="3" stroke-linecap="round" />

          <!-- ==================== TYPOGRAPHY (RIGHT) ==================== -->
          <g class="anim-part anim-type-group" id="typographyGroup">
            <!-- Arabic Wordmark: شات -->
            <text x="375" y="92" font-family="'Cairo', sans-serif" font-weight="900" font-size="46" fill="#0F2E4A" letter-spacing="1">شات</text>

            <!-- English Wordmark: SHAT -->
            <text x="290" y="154" font-family="'Outfit', sans-serif" font-weight="900" font-size="54" fill="#0F2E4A" letter-spacing="3">SHAT</text>

            <!-- Leaf crest across the 'A' of SHAT -->
            <path class="anim-part anim-a-crest" d="M 440 148 C 452 128 472 126 492 136 C 476 130 458 134 440 148 Z" fill="url(#shatGreenGrad)" />

            <!-- Tagline: — للتنمية والتطوير — -->
            <text x="290" y="188" font-family="'Cairo', sans-serif" font-weight="800" font-size="20" fill="#16A34A" letter-spacing="0.5">— للتنمية والتطوير —</text>

            <!-- Sub-Tagline: Development & Growth -->
            <text x="290" y="214" font-family="'Outfit', sans-serif" font-weight="600" font-size="15" fill="#475569" letter-spacing="1">Development &amp; Growth</text>

            <!-- Corporate Motto -->
            <text x="290" y="244" font-family="'Cairo', 'Outfit', sans-serif" font-weight="700" font-size="11.5" fill="#64748B" letter-spacing="1.2">PEOPLE • SKILLS • A BRIGHTER TOMORROW</text>
          </g>
        </svg>
      </div>

      <!-- Loading Progress Indicator -->
      <div class="shat-loader-progress-bar">
        <div class="shat-loader-progress-fill"></div>
      </div>
    </div>
  `;

  document.body.prepend(overlay);

  // Trigger smooth dismissal
  const displayDuration = alreadyShown ? 600 : 1500;
  
  setTimeout(() => {
    overlay.classList.add('shat-loader-fadeout');
    sessionStorage.setItem('shat_intro_shown', 'true');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 450);
  }, displayDuration);
}
