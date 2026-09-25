// SHAT Platform — Academy Dashboard Page (pages/academy/AcademyDashboardPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { CourseCard } from '../../components/academy/CourseCard.js';
import { DriveStatusCard } from '../../components/academy/DriveStatusCard.js';
import { courseService } from '../../services/courses/courseService.js';
import { authService } from '../../services/auth/authService.js';
import { Card, Badge, EmptyState } from '../../components/ui/core.js';

export async function renderAcademyDashboardPage() {
  const user = authService.getCurrentUser();
  const courses = await courseService.getCourses();

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
      <!-- Action Priority Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);">
        ${Card({
          title: '📌 النشاط التالي المستحق',
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
          title: '⏱️ التقييمات والاختبارات',
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
          title: '☁️ حالة مستودع Google Drive',
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
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
          <div>
            <h2 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0;">
              📚 الحقائب والبرامج التدريبية المعتمدة
            </h2>
            <div style="font-size: var(--font-size-caption); color: var(--text-muted);">
              جميع المساقات تمنح شهادات معتمدة برقم تحقق دولي بعد إكمال التكليفات والتقييم.
            </div>
          </div>
          <span class="shat-badge shat-badge-navy">${courses.length} مساقات مسجلة</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-lg);">
          ${courses.map(course => CourseCard({ course })).join('')}
        </div>
      </div>
    `
  });
}
