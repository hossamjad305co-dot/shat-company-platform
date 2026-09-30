// SHAT Platform — Route Registry & Metadata (router/routes.js)
import { renderCompanyHomePage } from '../pages/company/HomePage.js';
import { renderAcademyDashboardPage } from '../pages/academy/AcademyDashboardPage.js';
import { renderAcademyGatewayPage, initAcademyGatewayEvents } from '../pages/academy/AcademyGatewayPage.js';
import { renderAssignmentsPage } from '../pages/academy/AssignmentsPage.js';
import { renderExamsPage } from '../pages/academy/ExamsPage.js';
import { renderGradesPage } from '../pages/academy/GradesPage.js';
import { renderDriveFilesPage } from '../pages/academy/DriveFilesPage.js';
import { renderTeacherDashboardPage } from '../pages/teacher/TeacherDashboardPage.js';
import { renderTeacherCourseBuilderPage } from '../pages/teacher/TeacherCourseBuilderPage.js';
import { renderAdminPortalPage, initAdminPortalEvents } from '../pages/admin/AdminPortalPage.js';
import { renderAdminIntegrationsPage } from '../pages/admin/AdminIntegrationsPage.js';
import { renderAdminUsersPage } from '../pages/admin/AdminUsersPage.js';
import { renderAdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage.js';
import { renderAdminCMSPage, initAdminCMSEvents } from '../pages/admin/AdminCMSPage.js';
import { renderAdminApplicationsPage, initAdminApplicationsEvents } from '../pages/admin/AdminApplicationsPage.js';
import { renderAdminSettingsPage, initAdminSettingsEvents } from '../pages/admin/AdminSettingsPage.js';
import { renderCourseRegistrationPage, initCourseRegistrationEvents } from '../pages/company/CourseRegistrationPage.js';
import { renderNotificationsPage, initNotificationsEvents } from '../pages/company/NotificationsPage.js';
import { renderEmployeeCMSPage } from '../pages/employee/EmployeeCMSPage.js';
import { renderUIPlayground } from '../components/uiPlayground.js';
import { authService } from '../services/auth/authService.js';

export const MODULAR_ROUTES = {
  // Corporate Core
  'home': { handler: renderCompanyHomePage, title: 'الرئيسية | شركة شات للتنمية والتطوير', authRequired: false },
  'discover': { handler: renderCompanyHomePage, title: 'اكتشف SHAT | شركة شات', authRequired: false },
  'apply': { handler: renderCourseRegistrationPage, init: initCourseRegistrationEvents, title: 'طلب التسجيل والالتحاق | شركة شات', authRequired: false },
  'notifications': { handler: renderNotificationsPage, init: initNotificationsEvents, title: 'مركز التنبيهات | منصة شات', authRequired: false },

  // Academy LMS Core (Intelligent Visitor Gate vs Logged-In Student Dashboard)
  'academy': {
    handler: (arg) => {
      const user = authService.getCurrentUser();
      if (authService.isLoggedIn() && user && user.role !== 'visitor') {
        if (user.role === 'instructor') return renderTeacherDashboardPage(arg);
        return renderAcademyDashboardPage(arg);
      }
      return renderAcademyGatewayPage();
    },
    init: () => {
      const user = authService.getCurrentUser();
      if (!authService.isLoggedIn() || !user || user.role === 'visitor') {
        initAcademyGatewayEvents();
      }
    },
    title: 'أكاديمية شات للتدريب وبناء القدرات | LMS Portal',
    authRequired: false
  },
  'academy/assignments': { handler: renderAssignmentsPage, title: 'التكليفات والأنشطة | أكاديمية شات', authRequired: true, role: 'student' },
  'academy/exams': { handler: renderExamsPage, title: 'الاختبارات والتقييم | أكاديمية شات', authRequired: true, role: 'student' },
  'academy/grades': { handler: renderGradesPage, title: 'سجل الدرجات | أكاديمية شات', authRequired: true, role: 'student' },
  'academy/files': { handler: renderDriveFilesPage, title: 'مستودع درايف (5TB) | أكاديمية شات', authRequired: true, role: 'student' },

  // Teacher Workspace
  'teacher': { handler: renderTeacherDashboardPage, title: 'بوابة المدرب | إدارة المساقات', authRequired: true, role: 'teacher' },
  'teacher/builder': { handler: renderTeacherCourseBuilderPage, title: 'منشئ المناهج (Course Builder) | أكاديمية شات', authRequired: true, role: 'teacher' },
  'teacher/grading': { handler: renderAssignmentsPage, title: 'مركز التصحيح | أكاديمية شات', authRequired: true, role: 'teacher' },

  // Executive Admin Control Center
  'admin': { handler: renderAdminPortalPage, init: initAdminPortalEvents, title: 'المركز الإداري والتحكم الشامل | شركة شات', authRequired: false },
  'admin/users': { handler: renderAdminUsersPage, title: 'إدارة المستخدمين والصلاحيات | شركة شات', authRequired: true, role: 'admin' },
  'admin/cms': { handler: renderAdminCMSPage, init: initAdminCMSEvents, title: 'إدارة المحتوى والمنشورات (CMS) | شركة شات', authRequired: true, role: 'admin' },
  'admin/applications': { handler: renderAdminApplicationsPage, init: initAdminApplicationsEvents, title: 'طلبات التسجيل والقبول | شركة شات', authRequired: true, role: 'admin' },
  'admin/settings': { handler: renderAdminSettingsPage, init: initAdminSettingsEvents, title: 'إعدادات المنصة وسياسات التسجيل | شركة شات', authRequired: true, role: 'admin' },
  'admin/integrations': { handler: renderAdminIntegrationsPage, title: 'مركز الربط السحابي | شركة شات', authRequired: true, role: 'admin' },
  'admin/audit': { handler: renderAdminAuditLogsPage, title: 'سجلات الرقابة والعمليات | شركة شات', authRequired: true, role: 'admin' },

  // Employee CMS
  'cms': { handler: renderEmployeeCMSPage, title: 'إدارة المحتوى والأخبار | شركة شات', authRequired: true, role: 'employee' },

  // UI Playground
  'ui-playground': { handler: renderUIPlayground, title: 'مختبر عناصر التصميم الداخلي (Phase 2 Playground)', authRequired: false }
};
