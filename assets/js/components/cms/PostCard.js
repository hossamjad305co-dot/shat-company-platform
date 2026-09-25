// SHAT Platform — CMS Post Card Component (components/cms/PostCard.js)
import { Badge } from '../ui/core.js';

export function PostCard({ post }) {
  if (!post) return '';

  return `
    <article class="shat-card post-item-card" data-post-id="${post.id}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 0; overflow: hidden;">
      <div style="height: 180px; width: 100%; background: var(--shat-slate-100); overflow: hidden; position: relative;">
        <img src="${post.img}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/logo/logo-banner.jpg'" />
        <div style="position: absolute; top: 12px; inset-inline-end: 12px;">
          <span class="shat-badge shat-badge-navy">${post.categoryLabel || post.tag || 'خبر صحفي'}</span>
        </div>
      </div>

      <div style="padding: var(--space-lg); display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 8px; font-size: var(--font-size-caption); color: var(--text-muted); margin-bottom: var(--space-xs);">
            <span>📅 ${post.date}</span>
            <span>•</span>
            <span>⏱️ ${post.readTime || '3 دقائق'}</span>
          </div>

          <h3 style="font-size: var(--font-size-h4); color: var(--text-primary); margin-bottom: var(--space-sm); line-height: 1.4;">
            ${post.title}
          </h3>

          <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-md); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${post.excerpt}
          </p>
        </div>

        <div style="padding-top: var(--space-sm); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <a href="#/post/${post.id}" style="font-size: var(--font-size-body-sm); font-weight: 600; color: var(--shat-green-700); text-decoration: none; display: flex; align-items: center; gap: 4px;">
            <span>قراءة التفاصيل والتقرير</span>
            <span class="shat-icon-directional">←</span>
          </a>
        </div>
      </div>
    </article>
  `;
}
