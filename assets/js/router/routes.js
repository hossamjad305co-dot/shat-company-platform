// SHAT Platform — Route Registry & Metadata (router/routes.js)
import { renderCompanyHomePage } from '../pages/company/HomePage.js';
import { renderAcademyDashboardPage } from '../pages/academy/AcademyDashboardPage.js';
import { renderAssignmentsPage } from '../pages/academy/AssignmentsPage.js';
import { renderExamsPage } from '../pages/academy/ExamsPage.js';
import { renderGradesPage } from '../pages/academy/GradesPage.js';
import { renderDriveFilesPage } from '../pages/academy/DriveFilesPage.js';
import { renderTeacherDashboardPage } from '../pages/teacher/TeacherDashboardPage.js';
import { renderTeacherCourseBuilderPage } from '../pages/teacher/TeacherCourseBuilderPage.js';
import { renderAdminIntegrationsPage } from '../pages/admin/AdminIntegrationsPage.js';
import { renderAdminUsersPage } from '../pages/admin/AdminUsersPage.js';
import { renderAdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage.js';
import { renderEmployeeCMSPage } from '../pages/employee/EmployeeCMSPage.js';
import { renderUIPlayground } from '../components/uiPlayground.js';

export const MODULAR_ROUTES = {
  // Corporate Core
  'home': { handler: renderCompanyHomePage, title: 'الرئيسية | شركة شات للتنمية والتطوير', authRequired: false },
  'discover': { handler: renderCompanyHomePage, title: 'اكتشف SHAT | شركة شات', authRequired: false },

  // Academy LMS Core
  'academy': { handler: renderAcademyDashboardPage, title: 'أكاديمية شات | لوحة التعلم', authRequired: false },
  'academy/assignments': { handler: renderAssignmentsPage, title: 'التكليفات والأنشطة | أكاديمية شات', authRequired: false },
  'academy/exams': { handler: renderExamsPage, title: 'الاختبارات والتقييم | أكاديمية شات', authRequired: false },
  'academy/grades': { handler: renderGradesPage, title: 'سجل الدرجات | أكاديمية شات', authRequired: false },
  'academy/files': { handler: renderDriveFilesPage, title: 'مستودع درايف (5TB) | أكاديمية شات', authRequired: false },

  // Teacher Workspace
  'teacher': { handler: renderTeacherDashboardPage, title: 'بوابة المدرب | إدارة المساقات', authRequired: true, role: 'teacher' },
  'teacher/builder': { handler: renderTeacherCourseBuilderPage, title: 'منشئ المناهج (Course Builder) | أكاديمية شات', authRequired: true, role: 'teacher' },
  'teacher/grading': { handler: renderAssignmentsPage, title: 'مركز التصحيح | أكاديمية شات', authRequired: true, role: 'teacher' },

  // Admin & Security Center
  'admin': { handler: renderAdminIntegrationsPage, title: 'لوحة الإدارة العليا | شركة شات', authRequired: true, role: 'admin' },
  'admin/users': { handler: renderAdminUsersPage, title: 'إدارة المستخدمين والصلاحيات | شركة شات', authRequired: true, role: 'admin' },
  'admin/integrations': { handler: renderAdminIntegrationsPage, title: 'مركز الربط السحابي | شركة شات', authRequired: true, role: 'admin' },
  'admin/audit': { handler: renderAdminAuditLogsPage, title: 'سجلات الرقابة والعمليات | شركة شات', authRequired: true, role: 'admin' },

  // Employee CMS
  'cms': { handler: renderEmployeeCMSPage, title: 'إدارة المحتوى والأخبار | شركة شات', authRequired: true, role: 'employee' },

  // UI Playground
  'ui-playground': { handler: renderUIPlayground, title: 'مختبر عناصر التصميم الداخلي (Phase 2 Playground)', authRequired: false }
};
