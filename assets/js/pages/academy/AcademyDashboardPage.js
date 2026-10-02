// SHAT Platform — Academy Dashboard Page (pages/academy/AcademyDashboardPage.js)
// Student Learning Hub with real calculated progress, mobile Continue Learning card, and enrolled courses

import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { CourseCard } from '../../components/academy/CourseCard.js';
import { DriveStatusCard } from '../../components/academy/DriveStatusCard.js';
import { courseService } from '../../services/courses/courseService.js';
import { progressService } from '../../services/courses/progressService.js';
import { authService } from '../../services/auth/authService.js';
import { Card, Badge, ProgressBar } from '../../components/ui/core.js';

export async function renderAcademyDashboardPage() {
  const user = authService.getCurrentUser() || { name: 'المتدرب' };
  const rawCourses = await courseService.getCourses();

  // Enrich courses with actual computed progress
  const courses = await Promise.all(rawCourses.map(async (c) => {
    const prog = await progressService.getCourseProgress(c.id, 6);
    return {
      ...c,
      progress: prog.progressPercent,
      completedLessonsCount: prog.completedLessons.length,
      totalLessonsCount: prog.totalLessons,
      lastLessonId: prog.lastLessonId
    };
  }));

  // Identify active course to continue
  const primaryCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0] || {};
  const primaryLessonId = primaryCourse.lastLessonId || 'chs-lesson-1-1';
  const progressPercent = primaryCourse.progress || 0;

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'لوحة التعلم' }
  ];

  return AcademyLayout({
    activeRoute: 'academy',
    breadcrumbs,
    pageTitle: `مرحباً بك، ${user.name}`,
    pageSubtitle: 'مساحتك التعليمية المعتمدة — متابعة الحقائب، التكليفات، ومستودع درايف السحابي',
    children: `
      <!-- Mobile Native: Continue Learning Hero Card -->
      <div class="continue-learning-widget" style="background: linear-gradient(135deg, #0F2E4A 0%, #1e3a8a 100%); color: #ffffff; border-radius: var(--radius-xl); padding: 24px 20px; margin-bottom: var(--space-xl); box-shadow: var(--shadow-md); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20px; inset-inline-end: -20px; width: 140px; height: 140px; background: radial-gradient(circle, rgba(75, 136, 52, 0.4) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <span style="background: rgba(255,255,255,0.18); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.76rem; font-weight: 700; display: inline-block; margin-bottom: 8px;">
              متابعة التعلم (Continue Learning)
            </span>
            <h2 style="font-size: var(--font-size-h3); margin: 0 0 4px; font-weight: 800; color: #ffffff;">
              ${primaryCourse.title || 'دبلوم المعيار الإنساني الأساسي (CHS)'}
            </h2>
            <div style="font-size: 0.85rem; opacity: 0.9;">
              المشرف: ${primaryCourse.instructor || 'د. أسامة المنصور'} • ${primaryCourse.completedLessonsCount || 0} من ${primaryCourse.totalLessonsCount || 6} دروس مكتملة
            </div>
          </div>

          <a href="#/course/${primaryCourse.id}/lesson/${primaryLessonId}" class="shat-btn shat-btn-primary" style="background: var(--shat-green-600); border-color: var(--shat-green-600); font-weight: 800; padding: 10px 22px; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: var(--radius-full); box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            <span>استئناف الدرس</span>
            <span style="display:inline-flex; align-items:center;">${icons.arrowLeft('icon-inline', 14)}</span>
          </a>
        </div>

        <div style="margin-top: 14px; background: rgba(255,255,255,0.15); border-radius: var(--radius-full); height: 10px; overflow: hidden; position: relative;">
          <div style="width: ${progressPercent}%; height: 100%; background: #48bb78; border-radius: var(--radius-full); transition: width 0.3s ease;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 0.78rem; opacity: 0.85;">
          <span>نسبة إنجاز المساق</span>
          <strong>${progressPercent}% مكتمل</strong>
        </div>
      </div>

      <!-- Action Priority Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);">
        ${Card({
          title: 'النشاط التالي المستحق',
          subtitle: 'مسار المعيار الإنساني الأساسي CHS',
          children: `
            <div style="font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
              تسليم التكليف الأول: إعداد مصفوفة المساءلة للمتأثرين (AAP) وفق المعيار الرابع.
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="shat-badge shat-badge-warning">مستحق: 2026-10-05</span>
              <a href="#/academy/assignments" class="shat-btn shat-btn-primary shat-btn-sm" style="text-decoration: none;">
                <span>تسليم التكليف</span>
              </a>
            </div>
          `
        })}

        ${Card({
          title: 'التقييمات والاختبارات',
          subtitle: 'جلسات التقييم المجدولة',
          children: `
            <div style="font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
              الامتحان النصفي لدبلوم CHS متاح للمحاولة لمدة 60 دقيقة.
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="shat-badge shat-badge-info">محاولة واحدة متبقية</span>
              <a href="#/academy/exams" class="shat-btn shat-btn-outline shat-btn-sm" style="text-decoration: none;">
                <span>بدء الامتحان</span>
              </a>
            </div>
          `
        })}

        ${Card({
          title: 'حالة مستودع Google Drive',
          subtitle: 'المستودع السحابي المؤسسي (5TB)',
          children: `
            <div style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin-bottom: var(--space-md);">
              الربط السحابي الإنتاجي يخضع للمصادقة المركزية. التنزيلات المباشرة متاحة محلياً بصيغها الأصلية.
            </div>
            <span class="shat-badge shat-badge-unconfigured">STATUS: NOT CONFIGURED</span>
          `
        })}
      </div>

      <!-- Google Drive Mediation Notification -->
      <div style="margin-bottom: var(--space-xl);">
        ${DriveStatusCard()}
      </div>

      <!-- Active Enrolled Courses Section -->
      <div style="margin-bottom: var(--space-xl);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md); flex-wrap: wrap; gap: 8px;">
          <div>
            <h2 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0;">
              الحقائب والبرامج التدريبية المعتمدة
            </h2>
            <div style="font-size: var(--font-size-caption); color: var(--text-muted);">
              جميع المساقات تمنح شهادات معتمدة برقم تحقق دولي بعد إكمال التكليفات والتقييم.
            </div>
          </div>
          <span class="shat-badge shat-badge-navy">${courses.length} مساقات مسجلة</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-lg);">
          ${courses.map(course => CourseCard({ course })).join('')}
        </div>
      </div>
    `
  });
}
