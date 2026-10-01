// assets/js/views/newsView.js
// Official News, Publications & Institutional Announcements for SHAT Company with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';

export function renderNewsView(lang = 'ar') {
  const isRtl = lang === 'ar';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    badge: txt('المركز الإعلامي والمنشورات • Media Center', 'Media Center & Publications', 'Centre de Presse & Publications'),
    title: txt('الأخبار والمنشورات الرسمية', 'Official News & Insights', 'Actualités & Publications Officielles'),
    desc: txt(
      'متابعة أحدث أنشطة شركة شات للتنمية والتطوير، البرامج الأكاديمية الجديدة، أوراق السياسات، والتقارير الميدانية المعتمدة.',
      'Latest updates, academic milestones, policy briefs, and institutional reports from SHAT Development & Growth.',
      'Suivi des actualités institutionnelles de SHAT, nouveaux cursus académiques, notes de cadrage et rapports d’évaluation.'
    ),
    loading: txt('جاري تحميل أحدث المنشورات المعتمدة من الخادم...', 'Loading publications from server...', 'Chargement des publications en cours...')
  };

  return `
    <div class="view-news">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
            <p class="section-desc">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- News Content Container -->
      <section class="section">
        <div class="container">
          <div id="news-posts-container" class="bento-grid grid-3">
            <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
              ${t.loading}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export async function bindNewsEvents() {
  const container = document.getElementById('news-posts-container');
  if (!container) return;

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const isRtl = currentLang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  try {
    const res = await api.getPosts();
    const posts = res && res.posts ? res.posts.filter(p => p.status === 'published') : [];

    if (posts.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px; color: var(--shat-green);">✦</div>
          <h3 style="color: var(--shat-navy); margin-bottom: 8px;">
            ${txt('لا توجد منشورات جديدة حالياً', 'No publications available currently', 'Aucune publication pour le moment')}
          </h3>
          <p>${txt('سيتم نشر الأخبار والمستجدات الرسمية قريباً.', 'Official announcements will be published shortly.', 'Les communiqués officiels seront publiés prochainement.')}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map(p => `
      <article class="bento-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--shat-green);">
        <div>
          <div style="height: 180px; width: 100%; background: #F1F5F9; overflow: hidden;">
            <img src="${p.coverImage || 'assets/logo/logo-banner.jpg'}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
          </div>

          <div style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-size: 0.78rem;">
                ${p.categoryLabel || p.category}
              </span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">
                ◷ ${new Date(p.createdAt || Date.now()).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'))}
              </span>
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px; line-height: 1.4;">
              ${p.title}
            </h3>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
              ${p.excerpt || ''}
            </p>
          </div>
        </div>

        <div style="padding: 14px 20px; border-top: 1px solid var(--border-light); background: var(--bg-subtle); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
            ${txt('بواسطة:', 'By:', 'Par :')} ${p.author || txt('إدارة شات', 'SHAT Admin', 'Direction SHAT')}
          </span>
          <button class="btn-clean btn-sm btn-read-post" data-post-id="${p.id}" style="color: var(--shat-green); font-weight: 800;">
            <span>${txt('قراءة التفاصيل', 'Read More', 'Lire l’article')}</span>
            <span>${arrow}</span>
          </button>
        </div>
      </article>
    `).join('');

    // Bind Read Detail Modals
    document.querySelectorAll('.btn-read-post').forEach(btn => {
      btn.onclick = () => {
        const postId = btn.getAttribute('data-post-id');
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        const modalBackdrop = document.getElementById('global-modal-backdrop');
        const modalTitle = document.getElementById('global-modal-title');
        const modalBody = document.getElementById('global-modal-body');

        if (modalTitle) modalTitle.textContent = post.title;
        if (modalBody) {
          modalBody.innerHTML = `
            <div style="margin-bottom: 16px;">
              <img src="${post.coverImage || 'assets/logo/logo-banner.jpg'}" alt="${post.title}" style="width: 100%; max-height: 260px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 14px;" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
              <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px;">
                <span>▪ ${post.categoryLabel || post.category}</span>
                <span>◷ ${new Date(post.createdAt || Date.now()).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'))}</span>
                <span>▪ ${post.author || 'SHAT'}</span>
              </div>
              <div style="font-size: 0.95rem; line-height: 1.8; color: var(--text-main); white-space: pre-wrap;">
                ${post.content}
              </div>
            </div>
          `;
        }
        if (modalBackdrop) modalBackdrop.classList.add('open');
      };
    });

  } catch (err) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--accent-red);">
        ${txt('فشل في جلب المنشورات من الخادم: ', 'Failed to fetch posts: ', 'Erreur de chargement des articles : ')} ${err.message}
      </div>
    `;
  }
}
