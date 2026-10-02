// assets/js/views/newsView.js
// Official News, Publications & Institutional Announcements for SHAT Company with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { icons } from '../icons.js';

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
          
          <!-- Language Filtering Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;" id="news-lang-filters">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">${txt('تصفية حسب اللغة:', 'Filter by Language:', 'Filtrer par langue :')}</span>
              <button type="button" class="btn-clean btn-sm news-lang-pill active" data-lang-filter="active" style="border-radius: var(--radius-full); padding: 5px 14px; font-weight: 700; font-size: 0.8rem; background: var(--shat-navy); color: #fff; cursor: pointer; transition: all 0.2s ease;">
                ${txt('لغة الواجهة الحالية', 'Current Language', 'Langue Actuelle')}
              </button>
              <button type="button" class="btn-clean btn-sm news-lang-pill" data-lang-filter="all" style="border-radius: var(--radius-full); padding: 5px 14px; font-weight: 700; font-size: 0.8rem; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s ease;">
                ${txt('جميع المنشورات', 'All Publications', 'Toutes les publications')}
              </button>
              <button type="button" class="btn-clean btn-sm news-lang-pill" data-lang-filter="ar" style="border-radius: var(--radius-full); padding: 5px 14px; font-weight: 700; font-size: 0.8rem; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s ease;">
                🇸🇦 ${txt('العربية', 'Arabic', 'Arabe')}
              </button>
              <button type="button" class="btn-clean btn-sm news-lang-pill" data-lang-filter="en" style="border-radius: var(--radius-full); padding: 5px 14px; font-weight: 700; font-size: 0.8rem; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s ease;">
                🇬🇧 English
              </button>
              <button type="button" class="btn-clean btn-sm news-lang-pill" data-lang-filter="fr" style="border-radius: var(--radius-full); padding: 5px 14px; font-weight: 700; font-size: 0.8rem; background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s ease;">
                🇫🇷 Français
              </button>
            </div>
            
            <div id="news-count-badge" style="font-size: 0.82rem; color: var(--text-muted); font-weight: 700;"></div>
          </div>

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
  const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);

  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  try {
    const res = await api.getPosts();
    const allPosts = res && res.posts ? res.posts.filter(p => p.status === 'published') : [];

    let currentFilter = 'active';

    function renderList() {
      let filtered = [];

      if (currentFilter === 'all') {
        filtered = allPosts;
      } else if (currentFilter === 'ar') {
        filtered = allPosts.filter(p => p.lang === 'ar' || p.lang === 'all' || p.lang === 'ar_en' || p.lang === 'ar_fr' || !p.lang);
      } else if (currentFilter === 'en') {
        filtered = allPosts.filter(p => p.lang === 'en' || p.lang === 'all' || p.lang === 'ar_en' || (p.titleEn && p.titleEn.trim() !== ''));
      } else if (currentFilter === 'fr') {
        filtered = allPosts.filter(p => p.lang === 'fr' || p.lang === 'all' || p.lang === 'ar_fr' || (p.titleFr && p.titleFr.trim() !== ''));
      } else {
        // 'active' - filter by the active site language
        if (currentLang === 'en') {
          filtered = allPosts.filter(p => p.lang === 'en' || p.lang === 'all' || p.lang === 'ar_en' || (p.titleEn && p.titleEn.trim() !== ''));
        } else if (currentLang === 'fr') {
          filtered = allPosts.filter(p => p.lang === 'fr' || p.lang === 'all' || p.lang === 'ar_fr' || (p.titleFr && p.titleFr.trim() !== ''));
        } else {
          filtered = allPosts.filter(p => p.lang === 'ar' || p.lang === 'all' || p.lang === 'ar_en' || p.lang === 'ar_fr' || !p.lang);
        }
      }

      // Update count badge
      const countBadge = document.getElementById('news-count-badge');
      if (countBadge) {
        countBadge.textContent = `${filtered.length} ${txt('منشور معتمد', 'verified publications', 'publications certifiées')}`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
            <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--shat-green); opacity: 0.8;">
              ${icons.sparkles('', 36)}
            </div>
            <h3 style="color: var(--shat-navy); margin-bottom: 8px;">
              ${txt('لا توجد منشورات مطابقة لهذه اللغة حالياً', 'No publications match this language filter', 'Aucune publication pour cette langue')}
            </h3>
            <p>${txt('يمكنك النقر على "جميع المنشورات" للاطلاع على كافة منشورات المنظومة.', 'You can select "All Publications" to browse all company updates.', 'Sélectionnez "Toutes les publications" pour tout voir.')}</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(p => {
        const postTitle = currentLang === 'fr' ? (p.titleFr || p.titleEn || p.title) : (currentLang === 'en' ? (p.titleEn || p.title) : p.title);
        const postExcerpt = currentLang === 'fr' ? (p.excerptFr || p.excerptEn || p.excerpt) : (currentLang === 'en' ? (p.excerptEn || p.excerpt) : p.excerpt);
        const postCatLabel = currentLang === 'fr' ? (p.categoryLabelFr || p.categoryLabelEn || p.categoryLabel || p.category) : (currentLang === 'en' ? (p.categoryLabelEn || p.categoryLabel || p.category) : (p.categoryLabel || p.category));
        const postAuthor = currentLang === 'fr' ? (p.authorFr || p.authorEn || p.author) : (currentLang === 'en' ? (p.authorEn || p.author) : (p.author || 'أ. حسام جاد الله'));

        let langBadgeHtml = '';
        if (p.lang === 'all') {
          langBadgeHtml = `<span class="badge" style="background: #E0E7FF; color: #3730A3; font-size: 0.72rem; font-weight: 800;">🌐 AR • EN • FR</span>`;
        } else if (p.lang === 'ar_en') {
          langBadgeHtml = `<span class="badge" style="background: #E0F2FE; color: #0369A1; font-size: 0.72rem; font-weight: 800;">🌐 AR • EN</span>`;
        } else if (p.lang === 'ar_fr') {
          langBadgeHtml = `<span class="badge" style="background: #E0F2FE; color: #0369A1; font-size: 0.72rem; font-weight: 800;">🌐 AR • FR</span>`;
        } else if (p.lang === 'en') {
          langBadgeHtml = `<span class="badge" style="background: #FEF3C7; color: #92400E; font-size: 0.72rem; font-weight: 800;">🇬🇧 EN</span>`;
        } else if (p.lang === 'fr') {
          langBadgeHtml = `<span class="badge" style="background: #FCE7F3; color: #9D174D; font-size: 0.72rem; font-weight: 800;">🇫🇷 FR</span>`;
        } else {
          langBadgeHtml = `<span class="badge" style="background: #F1F5F9; color: #475569; font-size: 0.72rem; font-weight: 800;">🇸🇦 AR</span>`;
        }

        return `
          <article class="bento-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--shat-green);">
            <div>
              <div style="height: 180px; width: 100%; background: #F1F5F9; overflow: hidden; position: relative;">
                <img src="${p.coverImage || 'assets/logo/logo-banner.jpg'}" alt="${postTitle}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
                <div style="position: absolute; top: 10px; ${isRtl ? 'left: 10px;' : 'right: 10px;'}">
                  ${langBadgeHtml}
                </div>
              </div>

              <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
                  <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-size: 0.78rem; font-weight: 700;">
                    ${postCatLabel}
                  </span>
                  <span style="font-size: 0.78rem; color: var(--text-muted);">
                    ${new Date(p.createdAt || Date.now()).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'))}
                  </span>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px; line-height: 1.4;">
                  ${postTitle}
                </h3>

                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
                  ${postExcerpt || ''}
                </p>
              </div>
            </div>

            <div style="padding: 14px 20px; border-top: 1px solid var(--border-light); background: var(--bg-subtle); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                ${txt('بواسطة:', 'By:', 'Par :')} ${postAuthor}
              </span>
              <button class="btn-clean btn-sm btn-read-post" data-post-id="${p.id}" style="color: var(--shat-green); font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
                <span>${txt('قراءة التفاصيل', 'Read More', 'Lire l’article')}</span>
                <span>${arrow}</span>
              </button>
            </div>
          </article>
        `;
      }).join('');

      // Bind Read Detail Modals
      container.querySelectorAll('.btn-read-post').forEach(btn => {
        btn.onclick = () => {
          const postId = btn.getAttribute('data-post-id');
          const post = allPosts.find(p => p.id === postId);
          if (!post) return;

          const modalBackdrop = document.getElementById('global-modal-backdrop');
          const modalTitle = document.getElementById('global-modal-title');
          const modalBody = document.getElementById('global-modal-body');

          const modalPostTitle = currentLang === 'fr' ? (post.titleFr || post.titleEn || post.title) : (currentLang === 'en' ? (post.titleEn || post.title) : post.title);
          const modalPostContent = currentLang === 'fr' ? (post.contentFr || post.contentEn || post.content) : (currentLang === 'en' ? (post.contentEn || post.content) : post.content);
          const modalPostCat = currentLang === 'fr' ? (post.categoryLabelFr || post.categoryLabelEn || post.categoryLabel || post.category) : (currentLang === 'en' ? (post.categoryLabelEn || post.categoryLabel || post.category) : (post.categoryLabel || post.category));
          const modalPostAuthor = currentLang === 'fr' ? (post.authorFr || post.authorEn || post.author) : (currentLang === 'en' ? (post.authorEn || post.author) : (post.author || 'أ. حسام جاد الله'));

          if (modalTitle) modalTitle.textContent = modalPostTitle;
          if (modalBody) {
            modalBody.innerHTML = `
              <div style="margin-bottom: 16px;">
                <img src="${post.coverImage || 'assets/logo/logo-banner.jpg'}" alt="${modalPostTitle}" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 14px;" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
                <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px; flex-wrap: wrap;">
                  <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-weight: 700;">${modalPostCat}</span>
                  <span>📅 ${new Date(post.createdAt || Date.now()).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'))}</span>
                  <span>✍️ ${modalPostAuthor}</span>
                </div>
                <div style="font-size: 0.95rem; line-height: 1.85; color: var(--text-main); white-space: pre-wrap;">
                  ${modalPostContent}
                </div>
              </div>
            `;
          }
          if (modalBackdrop) modalBackdrop.classList.add('open');
        };
      });
    }

    // Bind Filter Pills
    document.querySelectorAll('.news-lang-pill').forEach(pill => {
      pill.onclick = () => {
        document.querySelectorAll('.news-lang-pill').forEach(p => {
          p.classList.remove('active');
          p.style.background = 'var(--bg-subtle)';
          p.style.color = 'var(--text-secondary)';
          p.style.border = '1px solid var(--border-light)';
        });
        pill.classList.add('active');
        pill.style.background = 'var(--shat-navy)';
        pill.style.color = '#fff';
        pill.style.border = 'none';

        currentFilter = pill.getAttribute('data-lang-filter');
        renderList();
      };
    });

    // Initial render
    renderList();

  } catch (err) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--accent-red);">
        ${txt('فشل في جلب المنشورات من الخادم: ', 'Failed to fetch posts: ', 'Erreur de chargement des articles : ')} ${err.message}
      </div>
    `;
  }
}
