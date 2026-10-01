// SHAT Platform — Immersive Mobile-First Lesson Viewer (pages/academy/LessonViewPage.js)
// Optimized for reading, responsive video, secure Drive downloads, and progress tracking

import { courseService } from '../../services/courses/courseService.js';
import { progressService } from '../../services/courses/progressService.js';
import { requestSecureFileAccess } from '../../services/files/fileService.js';
import { authService } from '../../services/auth/authService.js';
import { ErrorState } from '../../components/ui/core.js';

export async function renderLessonViewPage(courseId, lessonId) {
  if (!authService.isLoggedIn()) {
    return ErrorState({
      code: '401',
      title: 'تسجيل الدخول مطلوب',
      description: 'يرجى تسجيل الدخول بحساب طالب أو مدرب معتمد لمتابعة هذا الدرس.',
      actionText: 'دخول المنصة',
      actionRoute: '#/home'
    });
  }

  const lessonData = await courseService.getLessonById(courseId, lessonId);
  if (!lessonData) {
    return ErrorState({
      code: '404',
      title: 'الدرس غير موجود',
      description: 'تعذر العثور على الدرس المطلوب، يرجى التأكد من مسار المساق.',
      actionText: 'العودة للمساق',
      actionRoute: `#/course/${courseId}`
    });
  }

  const { lesson, previousLesson, nextLesson, totalCourseLessons } = lessonData;
  const progress = await progressService.getCourseProgress(courseId, totalCourseLessons);
  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Mark this lesson as last accessed
  await progressService.setLastAccessedLesson(courseId, lesson.id);

  return `
    <div class="shat-lesson-viewer" style="background: var(--bg-page); min-height: 100vh; padding-bottom: calc(var(--mobile-bottom-nav-height) + 40px);">
      <!-- Top Mobile Sticky Lesson Header -->
      <header class="lesson-top-bar" style="position: sticky; top: 0; z-index: var(--z-sticky); background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); padding: 12px 16px; box-shadow: var(--shadow-sm);">
        <div style="max-width: 900px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
          <a href="#/course/${courseId}" class="lesson-back-btn" style="display: flex; align-items: center; gap: 6px; color: var(--shat-navy-900); font-weight: 700; text-decoration: none; font-size: var(--font-size-body-sm); min-height: 44px; padding: 4px 8px; border-radius: var(--radius-sm);">
            <span style="font-size: 1.2rem;">←</span>
            <span>${lesson.courseTitle || 'المساق'}</span>
          </a>

          <div style="text-align: center; flex: 1;">
            <div style="font-size: var(--font-size-caption); color: var(--shat-green-700); font-weight: 700;">
              ${lesson.chapterTitle || 'الفصل الدراسي'}
            </div>
            <div style="font-size: var(--font-size-body-sm); font-weight: 800; color: var(--shat-navy-950); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px; margin: 0 auto;">
              ${lesson.title}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="shat-badge ${isCompleted ? 'shat-badge-success' : 'shat-badge-navy'}" style="font-size: 0.72rem;">
              ${isCompleted ? '✓ مكتمل' : 'قيد الدراسة'}
            </span>
          </div>
        </div>
      </header>

      <!-- Main Lesson Container -->
      <main class="shat-container" style="max-width: 900px; margin: 0 auto; padding: 20px 16px 40px;">
        <!-- Lesson Title & Duration Meta -->
        <div style="margin-bottom: 20px;">
          <h1 style="font-size: clamp(1.35rem, 4vw, 1.85rem); color: var(--shat-navy-950); margin: 0 0 8px 0; font-weight: 800; line-height: 1.4;">
            ${lesson.title}
          </h1>
          <div style="display: flex; align-items: center; gap: 12px; font-size: var(--font-size-body-sm); color: var(--text-muted); flex-wrap: wrap;">
            <span>◷ المدة التقديرية: <strong>${lesson.duration || '45 دقيقة'}</strong></span>
            <span>•</span>
            <span>★ النوع: <strong>${lesson.type === 'video' ? 'محاضرة مرئية' : 'قراءة تفاعلية'}</strong></span>
            <span>•</span>
            <span>▲ إنجاز المساق: <strong>${progress.progressPercent}%</strong></span>
          </div>
        </div>

        <!-- Video Player (If lesson has video) -->
        ${lesson.videoEmbedUrl ? `
          <div class="lesson-video-box" style="margin-bottom: 24px; border-radius: var(--radius-md); overflow: hidden; background: #000; box-shadow: var(--shadow-md); position: relative; padding-top: 56.25%;">
            <iframe 
              src="${lesson.videoEmbedUrl}" 
              title="${lesson.title}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        ` : ''}

        <!-- Lesson Core Text Body (Comfortable Mobile Typography) -->
        <article class="shat-card" style="padding: clamp(18px, 4vw, 32px); margin-bottom: 24px; line-height: 1.8; font-size: var(--font-size-body); color: var(--text-primary); border: 1px solid var(--border-subtle);">
          <div style="background: var(--shat-green-100); border-inline-start: 4px solid var(--shat-green-700); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px; font-size: var(--font-size-body-sm); color: var(--shat-green-950); font-weight: 600;">
            ★ ملخص الدرس ومحاوره: ${lesson.summary || 'استيعاب المفاهيم الأساسية والتطبيق الميداني المعتمد.'}
          </div>

          <div style="white-space: pre-line; margin-bottom: 20px;">
            ${lesson.content}
          </div>
        </article>

        <!-- Attached Resources & Google Drive Downloads -->
        ${lesson.files && lesson.files.length > 0 ? `
          <div style="margin-bottom: 28px;">
            <h3 style="font-size: var(--font-size-h4); color: var(--shat-navy-950); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>◈</span>
              <span>المواد التدريبية وملفات الدرس</span>
            </h3>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${lesson.files.map((file, fIdx) => `
                <div class="shat-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 14px 18px; border: 1px solid var(--border-prominent);">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.8rem;">▪</span>
                    <div>
                      <div style="font-weight: 700; color: var(--shat-navy-950); font-size: var(--font-size-body-sm);">${file.name}</div>
                      <div style="font-size: var(--font-size-caption); color: var(--text-muted);">${file.type || 'PDF'} • ${file.size || 'معتمد'} • وسيط Google Drive محمي</div>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    class="shat-btn shat-btn-primary btn-lesson-file-download" 
                    data-file-name="${file.name}"
                    data-course-id="${courseId}"
                    style="min-height: 44px; padding: 8px 16px; font-size: var(--font-size-body-sm);">
                    <span>تحميل الملف المباشر</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Mark as Completed Action Button -->
        <div style="text-align: center; margin-bottom: 36px; padding: 20px; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div style="font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: 12px;">
            عند الانتهاء من مراجعة المادة والمحاضرة، انقر للتأكيد وتحديث تقدمك الدراسي:
          </div>
          <button 
            type="button" 
            id="btn-mark-lesson-complete" 
            data-course-id="${courseId}" 
            data-lesson-id="${lesson.id}"
            class="shat-btn ${isCompleted ? 'shat-btn-outline' : 'shat-btn-primary'} shat-btn-lg"
            style="width: 100%; max-width: 420px; min-height: 48px; font-weight: 800; font-size: 1rem;">
            <span>${isCompleted ? '✓ تم إكمال هذا الدرس بنجاح' : 'تحديد الدرس كمكتمل ومتابعة التقدم ✓'}</span>
          </button>
        </div>

        <!-- Sticky Mobile Bottom Navigation: Previous / Next Lesson -->
        <nav class="lesson-bottom-nav" style="display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid var(--border-subtle);">
          ${previousLesson ? `
            <a href="#/course/${courseId}/lesson/${previousLesson.id}" class="shat-btn shat-btn-secondary" style="flex: 1; text-align: center; text-decoration: none; min-height: 44px; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>←</span>
              <span>الدرس السابق</span>
            </a>
          ` : `
            <div style="flex: 1;"></div>
          `}

          <a href="#/course/${courseId}" class="shat-btn shat-btn-ghost" style="padding: 8px 14px; min-height: 44px; display: flex; align-items: center; text-decoration: none; font-size: 0.82rem;">
            <span>فهرس المساق ☰</span>
          </a>

          ${nextLesson ? `
            <a href="#/course/${courseId}/lesson/${nextLesson.id}" class="shat-btn shat-btn-primary" style="flex: 1; text-align: center; text-decoration: none; min-height: 44px; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>الدرس التالي</span>
              <span>→</span>
            </a>
          ` : `
            <a href="#/course/${courseId}" class="shat-btn shat-btn-primary" style="flex: 1; text-align: center; text-decoration: none; min-height: 44px; display: flex; align-items: center; justify-content: center;">
              <span>إنهاء المساق ★</span>
            </a>
          `}
        </nav>
      </main>
  `;
}

export function initLessonViewEvents(courseId, lessonId) {
  const btnComplete = document.getElementById('btn-mark-completed');
  if (btnComplete) {
    btnComplete.onclick = async () => {
      btnComplete.disabled = true;
      btnComplete.innerHTML = 'جاري التحديث...';
      const res = await progressService.markLessonCompleted(courseId, lessonId, 6);
      if (res.success) {
        btnComplete.className = 'shat-btn shat-btn-secondary';
        btnComplete.innerHTML = '✓ تم إكمال هذا الدرس بنجاح';
        const progEl = document.getElementById('lesson-header-progress');
        if (progEl) progEl.textContent = `${res.progressPercent}% مكتمل`;
        const barEl = document.getElementById('lesson-header-progress-bar');
        if (barEl) barEl.style.width = `${res.progressPercent}%`;
      }
    };
  }

  document.querySelectorAll('.btn-download-lesson-file').forEach(btn => {
    btn.onclick = async () => {
      const fileId = btn.getAttribute('data-file-id');
      const res = await requestSecureFileAccess(fileId, courseId);
      if (res.granted && res.directDownloadUrl) {
        window.open(res.directDownloadUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert(res.reason || 'تعذر تحميل الملف');
      }
    };
  });
}

