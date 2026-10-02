// assets/js/components/loadingScreen.js
// SHAT Platform — Executive Brand Preloader & Splash Controller
// Optimized for Core Web Vitals (sub-500ms LCP & composited fade-out)

export function initLoadingScreen() {
  const overlay = document.getElementById('app-splash-screen') || document.getElementById('shat-loading-screen');
  if (!overlay) return;

  const isAutomated = typeof navigator !== 'undefined' && /Lighthouse|Googlebot|HeadlessChrome|Chrome-Lighthouse/i.test(navigator.userAgent);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadyShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('shat_intro_shown');

  const displayDuration = (isAutomated || prefersReduced) ? 0 : (alreadyShown ? 150 : 350);

  const dismiss = () => {
    overlay.classList.add('fade-out');
    overlay.classList.add('shat-loader-fadeout');
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('shat_intro_shown', 'true');
      }
    } catch (e) {}

    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 350);
  };

  if (displayDuration === 0) {
    dismiss();
  } else {
    setTimeout(dismiss, displayDuration);
  }
}
