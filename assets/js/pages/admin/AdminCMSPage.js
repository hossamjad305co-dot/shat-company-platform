// SHAT Platform — Admin CMS & Posts Management Page (pages/admin/AdminCMSPage.js)
// Enterprise CMS dashboard with full lifecycle management, media library & status switching

import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { cmsService, CMSPostStatus } from '../../services/cms/cmsService.js';
import { authService } from '../../services/auth/authService.js';
import { ErrorState, Badge } from '../../components/ui/core.js';
import { PostEditorModal, openPostEditor } from '../../components/cms/PostEditorModal.js';
import { MediaLibraryModal, openMediaLibrary } from '../../components/cms/MediaLibraryModal.js';
import { icons } from '../../icons.js';

export async function renderAdminCMSPage() {
  if (!authService.isAdmin() && !authService.canManagePlatform()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص لإدارة محتوى المنصة والمنشورات.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const posts = await cmsService.getPosts('all');

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'لوحة الإدارة', href: '#/admin' },
    { label: 'إدارة المحتوى والمنشورات (CMS)' }
  ];

  return AdminLayout({
    activeRoute: 'admin/cms',
    breadcrumbs,
    pageTitle: 'نظام إدارة المحتوى والمنشورات (Admin CMS)',
    pageSubtitle: 'إنشاء وتعديل ونشر المقالات والأخبار وتحديثات وسائل التواصل الاجتماعي مع معاينة حية فورية ومكتبة وسائط متكاملة',
    children: `
      <!-- Modals Injection -->
      ${PostEditorModal()}
      ${MediaLibraryModal()}

      <!-- Action & Filter Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: var(--space-lg);">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="cms-status-filters">
          <button type="button" class="shat-btn shat-btn-primary shat-btn-sm active" data-filter="all">جميع المنشورات (${posts.length})</button>
          <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-filter="${CMSPostStatus.PUBLISHED}">المنشورة</button>
          <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-filter="${CMSPostStatus.DRAFT}">المسودات</button>
          <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-filter="${CMSPostStatus.UNPUBLISHED}">غير المنشورة</button>
          <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-filter="${CMSPostStatus.ARCHIVED}">المؤرشفة</button>
        </div>

        <div style="display: flex; gap: 8px;">
          <button type="button" id="btn-open-global-media" class="shat-btn shat-btn-secondary shat-btn-sm">
            مكتبة الوسائط
          </button>
          <button type="button" id="btn-create-new-post" class="shat-btn shat-btn-primary shat-btn-sm">
            + منشور جديد
          </button>
        </div>
      </div>

      <!-- Posts List Container -->
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
          <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--shat-navy-950);">
            قائمة المقالات والمنشورات
          </h3>
          <span style="font-size: var(--font-size-caption); color: var(--text-muted);">
            تظهر المنشورات بحالة PUBLISHED فقط في الموقع العام
          </span>
        </div>

        <!-- Desktop Table / Mobile Card Grid -->
        <div class="cms-table-wrapper" id="cms-posts-list">
          ${renderPostsList(posts)}
        </div>
      </div>
    `
  });
}

function renderPostsList(posts) {
  if (posts.length === 0) {
    return `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px; display: flex; justify-content: center;">${icons.book ? icons.book('', 48) : ''}</div>
        <h4 style="color: var(--shat-navy-900); margin-bottom: 6px;">لا توجد منشورات حالياً</h4>
        <p style="font-size: var(--font-size-body-sm); margin: 0;">اضغط على "منشور جديد" لإنشاء أول مقال في المنصة</p>
      </div>
    `;
  }

  return `
    <div class="shat-table-responsive">
      <table class="shat-table responsive-card-table">
        <thead>
          <tr>
            <th>الغلاف</th>
            <th>عنوان المنشور</th>
            <th>التصنيف</th>
            <th>المنصة</th>
            <th>الحالة</th>
            <th>تاريخ التحديث</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${posts.map(p => `
            <tr data-post-id="${p.id}" data-post-status="${p.status}">
              <td data-label="الغلاف" style="width: 70px;">
                <div style="width: 56px; height: 40px; border-radius: 6px; overflow: hidden; background: #0f172a;">
                  <img src="${p.img || 'assets/logo/logo-badge.jpg'}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/logo/logo-badge.jpg'"/>
                </div>
              </td>
              <td data-label="العنوان">
                <strong style="color: var(--shat-navy-950); display: block; font-size: 0.95rem;">${p.title}</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted); display: block; max-width: 380px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${p.excerpt || ''}
                </span>
              </td>
              <td data-label="التصنيف">
                <span class="shat-badge shat-badge-navy">${p.categoryLabel || p.category}</span>
              </td>
              <td data-label="المنصة">
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">${p.platform || 'Website'}</span>
              </td>
              <td data-label="الحالة">
                <span class="shat-badge ${p.status === CMSPostStatus.PUBLISHED ? 'shat-badge-success' : p.status === CMSPostStatus.DRAFT ? 'shat-badge-warning' : 'shat-badge-neutral'}">
                  ${p.status.toUpperCase()}
                </span>
              </td>
              <td data-label="التاريخ" style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">
                ${p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('ar-EG') : (p.date || '2026')}
              </td>
              <td data-label="الإجراءات">
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button type="button" class="shat-btn shat-btn-secondary shat-btn-sm btn-edit-post" data-id="${p.id}">
                    تعديل
                  </button>
                  ${p.status === CMSPostStatus.PUBLISHED ? `
                    <button type="button" class="shat-btn shat-btn-outline shat-btn-sm btn-unpublish-post" data-id="${p.id}" style="color: #d97706; border-color: #fde68a;">
                      إلغاء النشر
                    </button>
                  ` : `
                    <button type="button" class="shat-btn shat-btn-primary shat-btn-sm btn-publish-post" data-id="${p.id}">
                      نشر
                    </button>
                  `}
                  <button type="button" class="shat-btn shat-btn-ghost shat-btn-sm btn-delete-post" data-id="${p.id}" style="color: #dc2626; display: inline-flex; align-items: center; justify-content: center;" title="حذف">
                    ${icons.trash('', 16)}
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function initAdminCMSEvents() {
  // New Post Button
  const btnCreate = document.getElementById('btn-create-new-post');
  if (btnCreate) {
    btnCreate.onclick = () => {
      openPostEditor(null, () => refreshCMSList());
    };
  }

  // Global Media Library Button
  const btnMedia = document.getElementById('btn-open-global-media');
  if (btnMedia) {
    btnMedia.onclick = () => {
      openMediaLibrary();
    };
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('#cms-status-filters button');
  filterBtns.forEach(btn => {
    btn.onclick = async () => {
      filterBtns.forEach(b => {
        b.classList.remove('shat-btn-primary', 'active');
        b.classList.add('shat-btn-outline');
      });
      btn.classList.add('shat-btn-primary', 'active');
      btn.classList.remove('shat-btn-outline');

      const filter = btn.getAttribute('data-filter');
      const posts = await cmsService.getPosts(filter);
      const listContainer = document.getElementById('cms-posts-list');
      if (listContainer) {
        listContainer.innerHTML = renderPostsList(posts);
        bindPostActions();
      }
    };
  });

  bindPostActions();

  function bindPostActions() {
    // Edit
    document.querySelectorAll('.btn-edit-post').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const post = await cmsService.getPostById(id);
        if (post) {
          openPostEditor(post, () => refreshCMSList());
        }
      };
    });

    // Publish
    document.querySelectorAll('.btn-publish-post').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await cmsService.publishPost(id);
        refreshCMSList();
      };
    });

    // Unpublish
    document.querySelectorAll('.btn-unpublish-post').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await cmsService.unpublishPost(id);
        refreshCMSList();
      };
    });

    // Delete
    document.querySelectorAll('.btn-delete-post').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('هل أنت متأكد من حذف هذا المنشور؟ لا يمكن التراجع عن هذه العملية.')) {
          await cmsService.deletePost(id);
          refreshCMSList();
        }
      };
    });
  }

  async function refreshCMSList() {
    const activeFilterBtn = document.querySelector('#cms-status-filters button.active');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    const posts = await cmsService.getPosts(filter);
    const listContainer = document.getElementById('cms-posts-list');
    if (listContainer) {
      listContainer.innerHTML = renderPostsList(posts);
      bindPostActions();
    }
  }
}
