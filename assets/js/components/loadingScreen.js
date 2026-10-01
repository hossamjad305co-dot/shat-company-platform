// assets/js/components/loadingScreen.js
// SHAT Platform — Executive Brand Preloader & Splash Controller
// Smoothly coordinates initial HTML splash screen and dismisses it with elegant fade-out

export function initLoadingScreen() {
  const overlay = document.getElementById('app-splash-screen') || document.getElementById('shat-loading-screen');
  if (!overlay) return;

  const alreadyShown = sessionStorage.getItem('shat_intro_shown');
  const displayDuration = alreadyShown ? 450 : 1200;

  setTimeout(() => {
    overlay.classList.add('fade-out');
    overlay.classList.add('shat-loader-fadeout');
    sessionStorage.setItem('shat_intro_shown', 'true');
    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 500);
  }, displayDuration);
}
