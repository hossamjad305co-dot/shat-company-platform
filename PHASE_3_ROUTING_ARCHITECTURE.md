# SHAT Platform — Phase 3 Routing Architecture Specification

## 1. Executive Summary
This document specifies the routing architecture designed to replace the monolithic conditional routing in `assets/js/router.js` with a modular, role-aware routing engine that supports layout shells, deep linking, 404/403/401 error guards, and a non-destructive Adapter pattern.

---

## 2. Router Engine Architecture

```text
                               Browser Hash Change (#/academy/assignments)
                                                    ↓
                                      [routerAdapter.handleRouting()]
                                                    ↓
                       ┌────────────────────────────┴───────────────────────────┐
                       ↓                                                        ↓
            [Is Course Detail Route?]                                [Matches MODULAR_ROUTES?]
           (#/course/:id or course?id=...)                                      ↓
                       ↓                                           ┌────────────┴───────────┐
          Delegates to Course Detail                               ↓                        ↓
                 Renderer                                       [YES]                      [NO]
                                                                   ↓                        ↓
                                                        [Check Route Permissions]   [Matches Legacy Route?]
                                                                   ↓                        ↓
                                                          ┌────────┴────────┐      ┌────────┴────────┐
                                                          ↓                 ↓      ↓                 ↓
                                                      [Passed]          [Forbidden][YES]            [NO]
                                                          ↓                 ↓      ↓                 ↓
                                                    Render Modular     Render 403 Legacy Delegate Render 404
                                                         Page             Page      (pages.js)       Page
```

---

## 3. Route Registry Specification (`router/routes.js`)

| Route Pattern | Handler | Title Metadata | Auth Required | Required Role | Layout Shell |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `#/home`, `#/discover` | `renderCompanyHomePage` | `الرئيسية \| شركة شات للتنمية والتطوير` | No | Public (`visitor`) | Corporate |
| `#/academy` | `renderAcademyDashboardPage` | `أكاديمية شات \| لوحة التعلم` | No | Public / Student | Academy |
| `#/academy/assignments`| `renderAssignmentsPage` | `التكليفات والأنشطة \| أكاديمية شات` | No | Student / Teacher | Academy |
| `#/academy/exams` | `renderExamsPage` | `الاختبارات والتقييم \| أكاديمية شات` | No | Student / Teacher | Academy |
| `#/academy/grades` | `renderGradesPage` | `سجل الدرجات \| أكاديمية شات` | No | Student / Teacher | Academy |
| `#/academy/files` | `renderDriveFilesPage` | `مستودع درايف (5TB) \| أكاديمية شات` | No | Student / Teacher | Academy |
| `#/teacher` | `renderTeacherDashboardPage` | `بوابة المدرب \| إدارة المساقات` | Yes | `teacher` / `admin` | Academy |
| `#/teacher/builder` | `renderTeacherCourseBuilderPage`| `منشئ المناهج (Course Builder)` | Yes | `teacher` / `admin` | Academy |
| `#/teacher/grading` | `renderAssignmentsPage` | `مركز التصحيح \| أكاديمية شات` | Yes | `teacher` / `admin` | Academy |
| `#/admin` | `renderAdminIntegrationsPage` | `لوحة الإدارة العليا \| شركة شات` | Yes | `admin` | Admin |
| `#/admin/users` | `renderAdminUsersPage` | `إدارة المستخدمين والصلاحيات` | Yes | `admin` | Admin |
| `#/admin/integrations` | `renderAdminIntegrationsPage` | `مركز الربط السحابي \| شركة شات` | Yes | `admin` | Admin |
| `#/admin/audit` | `renderAdminAuditLogsPage` | `سجلات الرقابة والعمليات` | Yes | `admin` | Admin |
| `#/cms` | `renderEmployeeCMSPage` | `إدارة المحتوى والأخبار \| شركة شات`| Yes | `employee` / `admin` | Admin |
| `#/ui-playground` | `renderUIPlayground` | `مختبر عناصر التصميم الداخلي` | No | Public / QA | Standalone |

---

## 4. Fallback & Adapter Delegations
When a requested route is not present in `MODULAR_ROUTES`, `routerAdapter.js` automatically queries `legacyRouter.routes[hash]`:
- Routes delegated to legacy renderer: `about`, `our-story`, `services`, `what-we-make`, `tracks`, `consulting`, `experiences`, `delivery-model`, `impact`, `approach`, `knowledge-hub`, `references`, `expertise`, `value-partnerships`, `contact`, `build-impact`, `register-course`.
- Invalid or unmapped hashes trigger the standardized `ErrorState({ code: '404' })` screen.
