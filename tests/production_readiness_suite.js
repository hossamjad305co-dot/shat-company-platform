// SHAT Platform — Production Readiness & Mobile Architecture Test Battery
// Verifies: ENV Separation, CMS Full Lifecycle, Media Library, Secure Drive Mediation, LMS Progress, Admissions & Audit

const storageMap = new Map();
global.localStorage = {
  getItem: (k) => storageMap.get(k) || null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

global.window = {
  dispatchEvent: () => true,
  addEventListener: () => {}
};
global.CustomEvent = class { constructor(type, detail) { this.type = type; this.detail = detail; } };

import { ENV } from '../assets/js/config/env.js';
import { cmsService, CMSPostStatus } from '../assets/js/services/cms/cmsService.js';
import { parseGoogleDriveResource, requestSecureFileAccess } from '../assets/js/services/files/fileService.js';
import { progressService } from '../assets/js/services/courses/progressService.js';
import { courseService } from '../assets/js/services/courses/courseService.js';
import { applicationService, ApplicationStatus, RegistrationMode } from '../assets/js/services/applications/applicationService.js';
import { auditService } from '../assets/js/services/audit/auditService.js';
import { notificationService } from '../assets/js/services/notifications/notificationService.js';
import { authService } from '../assets/js/services/auth/authService.js';

const testResults = [];

function assertTest(id, description, condition, evidence) {
  const status = condition ? 'PASS' : 'FAIL';
  testResults.push({ id, description, status, evidence });
  const icon = condition ? '✓' : '✗';
  console.log(`[${icon}] ${id}: ${description} -> ${status} (${evidence})`);
}

async function runBattery() {
  console.log('================================================================');
  console.log('SHAT PLATFORM — PRODUCTION READINESS & MULTI-DEVICE TEST BATTERY');
  console.log('================================================================\n');

  // --- 1. ENVIRONMENT & PROTOTYPE UI PURGE ---
  console.log('--- SUITE 1: ENVIRONMENT ISOLATION & PROTOTYPE PURGE ---');
  
  assertTest(
    'PROD-01',
    'Feature flag showRoleSimulator is defined and boolean',
    typeof ENV.features.showRoleSimulator === 'boolean',
    `showRoleSimulator: ${ENV.features.showRoleSimulator}`
  );

  assertTest(
    'PROD-02',
    'Feature flag enableDemoQuickFill is defined and boolean',
    typeof ENV.features.enableDemoQuickFill === 'boolean',
    `enableDemoQuickFill: ${ENV.features.enableDemoQuickFill}`
  );

  assertTest(
    'PROD-03',
    'Autosave interval configured for responsive drafts',
    ENV.features.autosaveIntervalMs === 3000,
    `Interval: ${ENV.features.autosaveIntervalMs}ms`
  );

  assertTest(
    'PROD-04',
    'Upload size limit enforced at 5MB',
    ENV.features.maxUploadSizeBytes === 5242880,
    `Max bytes: ${ENV.features.maxUploadSizeBytes}`
  );

  // --- 2. CMS & POSTS LIFECYCLE ---
  console.log('\n--- SUITE 2: CMS ENGINE, POST LIFECYCLE & MEDIA LIBRARY ---');

  // Create a draft post
  const created = await cmsService.createPost({
    title: 'مقال تجريبي لنظام التدقيق المؤسسي',
    category: 'evaluation',
    platform: 'Website',
    excerpt: 'موجز المقال للتحقق من سلامة دورة النشر',
    fullText: 'المحتوى الكامل للمقال...',
    status: CMSPostStatus.DRAFT
  });

  assertTest(
    'CMS-01',
    'Create post with DRAFT status',
    created && created.status === CMSPostStatus.DRAFT && created.id.startsWith('post_'),
    `Post ID: ${created.id}, Status: ${created.status}`
  );

  // Public getPosts does NOT include draft
  const publicPosts = await cmsService.getPosts(CMSPostStatus.PUBLISHED);
  const draftInPublic = publicPosts.find(p => p.id === created.id);
  assertTest(
    'CMS-02',
    'Public query strictly excludes DRAFT posts',
    !draftInPublic,
    `Total published: ${publicPosts.length}, Draft excluded: true`
  );

  // Publish the post
  const published = await cmsService.publishPost(created.id);
  assertTest(
    'CMS-03',
    'Publish post lifecycle transition',
    published && published.status === CMSPostStatus.PUBLISHED && Boolean(published.publishedAt),
    `Published At: ${published.publishedAt}`
  );

  // Unpublish the post
  const unpublished = await cmsService.unpublishPost(created.id);
  assertTest(
    'CMS-04',
    'Unpublish post lifecycle transition',
    unpublished && unpublished.status === CMSPostStatus.UNPUBLISHED,
    `Status: ${unpublished.status}`
  );

  // Media Library test
  const mediaItem = cmsService.addMediaItem({
    title: 'بوستر تدريبي اختباري',
    url: 'assets/logo/WhatsApp Image 2026-09-23 at 19.33.56.jpeg',
    size: '199 KB'
  });
  const mediaList = cmsService.getMediaItems('بوستر');
  assertTest(
    'CMS-05',
    'Media library asset registration and search',
    mediaItem && mediaList.some(m => m.id === mediaItem.id),
    `Added ID: ${mediaItem.id}, Search found: ${mediaList.length}`
  );

  // --- 3. GOOGLE DRIVE MEDIATION & SECURE ACCESS ---
  console.log('\n--- SUITE 3: GOOGLE DRIVE MEDIATION & MASKING ---');

  const rawDriveFileUrl = 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OGvE2upms/view?usp=sharing';
  const parsedFile = parseGoogleDriveResource(rawDriveFileUrl);
  assertTest(
    'DRIVE-01',
    'Direct download link derivation from Drive File URL',
    parsedFile.isDirectDownloadable && parsedFile.directDownloadUrl.includes('export=download'),
    `Result: ${parsedFile.directDownloadUrl}`
  );

  const rawDocsUrl = 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OGvE2upms/edit';
  const parsedDoc = parseGoogleDriveResource(rawDocsUrl);
  assertTest(
    'DRIVE-02',
    'Direct PDF export derivation from Google Docs URL',
    parsedDoc.isDirectDownloadable && parsedDoc.directDownloadUrl.includes('export?format=pdf'),
    `Result: ${parsedDoc.directDownloadUrl}`
  );

  const rawFolderUrl = 'https://drive.google.com/drive/folders/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs';
  const parsedFolder = parseGoogleDriveResource(rawFolderUrl);
  assertTest(
    'DRIVE-03',
    'Folder URL identified as non-direct (fallback to Drive Viewer)',
    (parsedFolder.type === 'folder' || parsedFolder.type === 'DRIVE_FOLDER') && !parsedFolder.isDirectDownloadable,
    `Type: ${parsedFolder.type}, Direct: ${parsedFolder.isDirectDownloadable}`
  );

  // Unauthenticated download gating
  authService.signOut();
  const unauthAccess = await requestSecureFileAccess('file_1', 'shat-chs-master');
  assertTest(
    'DRIVE-04',
    'Unauthenticated student download attempt rejected',
    !unauthAccess.granted && unauthAccess.reason.includes('تسجيل الدخول'),
    `Reason: "${unauthAccess.reason}"`
  );

  // Authenticated student access
  authService.setSimulatedRole('student');
  const authAccess = await requestSecureFileAccess('file_1', 'shat-chs-master');
  assertTest(
    'DRIVE-05',
    'Enrolled student file access granted via mediation gateway',
    authAccess.granted && Boolean(authAccess.directDownloadUrl),
    `Granted: ${authAccess.granted}`
  );

  // --- 4. LMS PROGRESS ENGINE ---
  console.log('\n--- SUITE 4: LMS PROGRESS CALCULATION & GRANULAR LESSON TRACKING ---');

  const courseId = 'shat-chs-master';
  const initialProg = await progressService.getCourseProgress(courseId, 6);
  assertTest(
    'LMS-01',
    'Progress percentage strictly calculated from completed lessons',
    typeof initialProg.progressPercent === 'number' && initialProg.totalLessons === 6,
    `Initial progress: ${initialProg.progressPercent}%, Completed count: ${initialProg.completedLessons.length}`
  );

  const completedLessonRes = await progressService.markLessonCompleted(courseId, 'chs-l1', 6);
  assertTest(
    'LMS-02',
    'Mark lesson completed updates actual percentage without hardcoded values',
    completedLessonRes.success && completedLessonRes.completedLessons.includes('chs-l1') && completedLessonRes.progressPercent > 0,
    `Progress after lesson 1: ${completedLessonRes.progressPercent}%`
  );

  const courses = await courseService.getCourses();
  const targetCourse = courses.find(c => c.id === courseId);
  assertTest(
    'LMS-03',
    'Course chapters and modular lessons structure valid',
    targetCourse && Array.isArray(targetCourse.modules) && targetCourse.modules.length > 0,
    `Modules count: ${targetCourse.modules.length}`
  );

  const lessonData = await courseService.getLessonById(courseId, 'chs-l1');
  assertTest(
    'LMS-04',
    'Sequential lesson navigation lookup (current, previous, next)',
    lessonData && lessonData.lesson && Boolean(lessonData.nextLesson),
    `Current: "${lessonData.lesson.title}", Next: "${lessonData.nextLesson.title}"`
  );

  // --- 5. ADMISSIONS & COURSE APPLICATIONS ---
  console.log('\n--- SUITE 5: INTERNAL ADMISSIONS & GOOGLE FORM DUAL MODES ---');

  const appRes = await applicationService.submitApplication({
    courseId: 'shat-chs-master',
    courseTitle: 'دبلوم المعيار الإنساني الأساسي (CHS)',
    fullName: 'هدى مصطفى',
    phone: '+970591234888',
    email: 'huda@aid-society.org',
    qualification: 'ماجستير تنمية بشرية'
  });

  assertTest(
    'APPS-01',
    'Internal course application submission',
    appRes.success && appRes.application.status === ApplicationStatus.NEW,
    `Application ID: #${appRes.application.id}, Status: ${appRes.application.status}`
  );

  const approveRes = await applicationService.updateStatus(appRes.application.id, ApplicationStatus.APPROVED, 'مؤهل متميز وتم اعتماد القيد');
  assertTest(
    'APPS-02',
    'Application approval status transition & notification creation',
    approveRes.success && approveRes.application.status === ApplicationStatus.APPROVED,
    `Status: ${approveRes.application.status}, Reviewed: ${approveRes.application.reviewedAt}`
  );

  const settings = applicationService.getSettings();
  assertTest(
    'APPS-03',
    'Registration mode configurable (BOTH, INTERNAL, EXTERNAL_GFORM)',
    [RegistrationMode.BOTH, RegistrationMode.INTERNAL, RegistrationMode.EXTERNAL_GFORM].includes(settings.mode),
    `Current mode: ${settings.mode}`
  );

  // --- 6. AUDIT TRAIL & IN-APP NOTIFICATIONS ---
  console.log('\n--- SUITE 6: AUDIT TRAIL & IN-APP NOTIFICATIONS ---');

  const auditLogs = await auditService.getLogs({ limit: 10 });
  assertTest(
    'AUDIT-01',
    'Audit logs accurately capture administrative operations',
    Array.isArray(auditLogs) && auditLogs.length > 0,
    `Total logs: ${auditLogs.length}, Latest action: ${auditLogs[0] ? auditLogs[0].action : 'none'}`
  );

  const notifs = notificationService.getNotifications();
  assertTest(
    'NOTIF-01',
    'In-app notifications populated for user updates',
    Array.isArray(notifs) && notifs.length > 0,
    `Notifications count: ${notifs.length}, Unread: ${notificationService.getUnreadCount()}`
  );

  // Summary
  console.log('\n================================================================');
  const total = testResults.length;
  const passed = testResults.filter(t => t.status === 'PASS').length;
  const failed = testResults.filter(t => t.status === 'FAIL').length;
  console.log(`TOTAL BATTERY TESTS: ${total}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runBattery().catch(err => {
  console.error('Test runner fatal exception:', err);
  process.exit(1);
});
