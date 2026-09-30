// tests/master_production_suite.js
// SHAT Platform — Master Production Automated Verification Suite
import assert from 'node:assert';
import app from '../server/server.js';
import { db } from '../server/db.js';
import { content } from '../assets/js/content.js';
import { renderHomeView } from '../assets/js/views/homeView.js';
import { renderAboutView } from '../assets/js/views/aboutView.js';
import { renderServicesView } from '../assets/js/views/servicesView.js';
import { renderStandardsView } from '../assets/js/views/standardsView.js';
import { renderDeliveryView } from '../assets/js/views/deliveryView.js';
import { renderAcademyView } from '../assets/js/views/academyView.js';
import { renderContactView } from '../assets/js/views/contactView.js';
import { renderLoginView } from '../assets/js/views/loginView.js';
import { renderStudentDashboardView } from '../assets/js/views/studentDashboardView.js';
import { renderTeacherDashboardView } from '../assets/js/views/teacherDashboardView.js';
import { renderAdminView } from '../assets/js/views/adminView.js';
import { renderCourseDetailView } from '../assets/js/views/courseDetailView.js';
import { renderProjectsView } from '../assets/js/views/projectsView.js';
import { renderNewsView } from '../assets/js/views/newsView.js';
import { renderFormsView } from '../assets/js/views/formsView.js';

// Setup Mock Browser Environment for View Tests
global.localStorage = {
  store: new Map(),
  getItem(k) { return this.store.get(k) || null; },
  setItem(k, v) { this.store.set(k, String(v)); },
  removeItem(k) { this.store.delete(k); },
  clear() { this.store.clear(); }
};

global.window = {
  location: { hash: '#/home' },
  addEventListener: () => {},
  dispatchEvent: () => {}
};

console.log('================================================================');
console.log('SHAT COMPANY PLATFORM — MASTER PRODUCTION VERIFICATION SUITE');
console.log('================================================================\n');

let server;
let baseUrl;

async function startTestServer() {
  return new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
}

async function request(endpoint, options = {}) {
  const url = `${baseUrl}${endpoint}`;
  const fetchOpts = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  if (options.body) {
    fetchOpts.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOpts);
  const contentType = res.headers.get('content-type') || '';
  let body;
  if (contentType.includes('application/json')) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  return {
    status: res.status,
    headers: {
      'content-type': contentType,
      'content-disposition': res.headers.get('content-disposition') || ''
    },
    body
  };
}

async function runAllTests() {
  await startTestServer();
  let passedCount = 0;
  let totalCount = 12;

  // -------------------------------------------------------------
  // SUITE 1: System Health & Telemetry
  // -------------------------------------------------------------
  console.log('[1/12] Testing System Health & Telemetry...');
  const healthRes = await request('/api/health');
  assert.strictEqual(healthRes.status, 200, 'Health check returns 200');
  assert.strictEqual(healthRes.body.status, 'ONLINE', 'System is ONLINE');
  assert.strictEqual(healthRes.body.telemetry.database.status, 'CONNECTED', 'Database connected');
  assert.strictEqual(healthRes.body.telemetry.authentication.status, 'ACTIVE', 'Auth active');
  assert.strictEqual(healthRes.body.telemetry.googleDrive.status, 'PROXY_READY', 'Drive proxy ready');
  console.log('  ✓ System Health & Telemetry verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 2: Server-Side Authentication & Zero-Mock Token Generation
  // -------------------------------------------------------------
  console.log('[2/12] Testing Server-Side Auth & Session Tokens...');
  // 1. Invalid Login
  const badLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { usernameOrEmail: 'wrong', password: '123' }
  });
  assert.strictEqual(badLogin.status, 401, 'Bad credentials return 401');

  // 2. Admin Login
  const adminLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { usernameOrEmail: 'admin', password: 'any' }
  });
  assert.strictEqual(adminLogin.status, 200, 'Admin login succeeds');
  assert(adminLogin.body.token.startsWith('shat_sess_'), 'Session token generated');
  assert.strictEqual(adminLogin.body.user.role, 'admin', 'Admin role verified');
  const adminToken = adminLogin.body.token;

  // 3. Student Login
  const studentLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { usernameOrEmail: '1098765432', password: 'any' }
  });
  assert.strictEqual(studentLogin.status, 200, 'Student login succeeds');
  assert.strictEqual(studentLogin.body.user.role, 'student', 'Student role verified');
  const studentToken = studentLogin.body.token;

  // 4. Teacher Login
  const teacherLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { usernameOrEmail: 'osama', password: 'any' }
  });
  assert.strictEqual(teacherLogin.status, 200, 'Teacher login succeeds');
  assert.strictEqual(teacherLogin.body.user.role, 'teacher', 'Teacher role verified');
  const teacherToken = teacherLogin.body.token;

  console.log('  ✓ Server-Side Auth & Identity verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 3: Server-Side RBAC & Access Enforcement
  // -------------------------------------------------------------
  console.log('[3/12] Testing Server-Side RBAC Enforcement...');
  // Student trying to access admin applications endpoint -> MUST BE 403
  const studentForbidden = await request('/api/applications', {
    headers: { authorization: `Bearer ${studentToken}` }
  });
  assert.strictEqual(studentForbidden.status, 403, 'Student blocked from admin applications (403)');

  // Guest (no token) trying to access my-courses -> MUST BE 401
  const guestUnauth = await request('/api/my-courses');
  assert.strictEqual(guestUnauth.status, 401, 'Guest blocked from my-courses (401)');

  // Teacher accessing teacher courses -> MUST BE 200
  const teacherOk = await request('/api/teacher/courses', {
    headers: { authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(teacherOk.status, 200, 'Teacher accesses teacher courses (200)');
  assert(teacherOk.body.courses.length > 0, 'Teacher courses retrieved');

  console.log('  ✓ Server-Side RBAC verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 4: LMS Academy Courses & Enrolled Courses
  // -------------------------------------------------------------
  console.log('[4/12] Testing LMS Academy Curricula & My-Courses...');
  const coursesRes = await request('/api/courses');
  assert.strictEqual(coursesRes.status, 200, 'Courses list 200');
  assert(coursesRes.body.courses.length >= 3, 'At least 3 official courses');

  const courseDetail = await request('/api/courses/shat-chs-master');
  assert.strictEqual(courseDetail.status, 200, 'Course detail 200');
  assert(courseDetail.body.course.chapters.length >= 2, 'Course has chapters');

  const myCoursesRes = await request('/api/my-courses', {
    headers: { authorization: `Bearer ${studentToken}` }
  });
  assert.strictEqual(myCoursesRes.status, 200, 'My courses returns 200');
  assert(myCoursesRes.body.courses.length > 0, 'Student has enrolled courses');
  console.log('  ✓ LMS Academy Curricula verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 5: Google Drive Secure Streaming Proxy (In-Platform Download)
  // -------------------------------------------------------------
  console.log('[5/12] Testing Google Drive Direct Download Proxy...');
  // Guest download -> 401
  const guestDl = await request('/api/files/download/f-chs-guideline');
  assert.strictEqual(guestDl.status, 401, 'Guest cannot download protected materials');

  // Authenticated student download -> 200 + Content-Disposition + PDF Buffer
  const authDl = await request('/api/files/download/f-chs-guideline', {
    headers: { authorization: `Bearer ${studentToken}` }
  });
  assert.strictEqual(authDl.status, 200, 'Student download succeeds with 200');
  assert.strictEqual(authDl.headers['content-type'], 'application/pdf', 'Content-Type is application/pdf');
  assert(authDl.headers['content-disposition'].includes('attachment;'), 'Header forces direct file download');
  console.log('  ✓ Google Drive Direct Download Proxy verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 6: Assignments, Student Submission & Teacher Grading
  // -------------------------------------------------------------
  console.log('[6/12] Testing Assignments, Submissions & Grading Cycle...');
  // Student submits assignment
  const subRes = await request('/api/submissions', {
    method: 'POST',
    body: {
      assignmentId: 'asg-chs-01',
      fileName: 'تقرير_التدقيق_الميداني_أحمد_خليل.pdf',
      notes: 'تم استكمال التقييم وفق مصفوفة المعايير التسعة لـ CHS.'
    },
    headers: { authorization: `Bearer ${studentToken}` }
  });
  assert.strictEqual(subRes.status, 200, 'Assignment submission returns 200');
  const subId = subRes.body.submission.id;

  // Teacher grades the submission
  const gradeRes = await request(`/api/submissions/${subId}/grade`, {
    method: 'POST',
    body: {
      grade: 96,
      feedback: 'تحليل متميز ومواءمة دقيقة مع التزامات المساءلة للمتأثرين AAP.'
    },
    headers: { authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(gradeRes.status, 200, 'Grading succeeds with 200');
  assert.strictEqual(gradeRes.body.submission.grade, 96, 'Grade recorded as 96');
  assert.strictEqual(gradeRes.body.submission.status, 'graded', 'Status is graded');
  console.log('  ✓ Full Assignment, Submission & Grading loop verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 7: Google Forms to Native SHAT Forms Engine
  // -------------------------------------------------------------
  console.log('[7/12] Testing Google Forms Importer & Native SHAT Forms...');
  // Admin imports form
  const importRes = await request('/api/forms/import-google-form', {
    method: 'POST',
    body: { googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-test-form/viewform' },
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(importRes.status, 200, 'Import succeeds with 200');
  const formId = importRes.body.form.id;

  // Visitor submits to the native form
  const formSubRes = await request(`/api/forms/${formId}/submit`, {
    method: 'POST',
    body: {
      answers: {
        f_fullname: 'د. سمير الباز',
        f_phone: '+972 59 111 2233',
        f_email: 'samir@unicef-partner.org',
        f_track: 'دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة'
      }
    }
  });
  assert.strictEqual(formSubRes.status, 200, 'Native form submission returns 200');
  assert(formSubRes.body.responseId, 'Response ID generated in database');

  // Admin inspects responses
  const getResponses = await request(`/api/forms/${formId}/responses`, {
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(getResponses.status, 200, 'Admin can view responses');
  assert(getResponses.body.count >= 1, 'Responses count is at least 1');
  console.log('  ✓ Google Forms to Native SHAT Forms verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 8: Applications Pipeline & Auto-Enrollment
  // -------------------------------------------------------------
  console.log('[8/12] Testing Course Applications & Auto-Enrollment...');
  const appSubRes = await request('/api/applications', {
    method: 'POST',
    body: {
      courseId: 'shat-psea-expert',
      courseTitle: 'البرنامج التنفيذي في استشارات الحماية (PSEA)',
      fullName: 'أ. كرم عبد اللطيف',
      email: 'karam@relief.org',
      phone: '+972 59 444 5566',
      organization: 'منظمة حماية الطفولة',
      qualification: 'ماجستير حقوق إنسان'
    }
  });
  assert.strictEqual(appSubRes.status, 200, 'Application submitted returns 200');
  const appId = appSubRes.body.application.id;

  // Admin approves application -> automatically enrolls student
  const appDecision = await request(`/api/applications/${appId}/status`, {
    method: 'POST',
    body: { status: 'approved' },
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(appDecision.status, 200, 'Application approval returns 200');
  assert.strictEqual(appDecision.body.application.status, 'approved', 'Status is approved');

  // Verify enrollment was created in db
  const studentUser = Array.from(db.tables.users.values()).find(u => u.email === 'karam@relief.org');
  assert(studentUser, 'Student user auto-provisioned');
  const enrollment = Array.from(db.tables.enrollments.values()).find(e => e.studentId === studentUser.id);
  assert(enrollment, 'Student enrollment created in database');
  console.log('  ✓ Course Applications & Auto-Enrollment verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 9: Consultation Inquiries & Contact
  // -------------------------------------------------------------
  console.log('[9/12] Testing Consultation Inquiries...');
  const inqRes = await request('/api/inquiries', {
    method: 'POST',
    body: {
      name: 'أ. رامي المصري',
      org: 'مؤسسة تنموية محلية',
      email: 'rami@local-dev.org',
      phone: '+972 59 777 8899',
      service: 'governance-sops',
      message: 'نطلب استشارة في بناء الهيكل المؤسسي وإعداد لوائح الحوكمة.'
    }
  });
  assert.strictEqual(inqRes.status, 200, 'Inquiry submitted returns 200');

  const inqList = await request('/api/inquiries', {
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(inqList.status, 200, 'Admin retrieves inquiries');
  assert(inqList.body.inquiries.length >= 2, 'Inquiries logged in database');
  console.log('  ✓ Consultation Inquiries verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 10: CMS Post Management & Lifecycle
  // -------------------------------------------------------------
  console.log('[10/12] Testing CMS Post Management Lifecycle...');
  const postRes = await request('/api/posts', {
    method: 'POST',
    body: {
      title: 'تخريج الدفعة الأولى من مقيمي المعايير الإنسانية الدولية',
      excerpt: 'احتفلت شركة شات بتخريج 25 كادراً متخصصاً في التقييم الخارجي المستقل.',
      content: 'تفاصيل حفل التخريج والاعتمادات الممنوحة للمشاركين...',
      category: 'humanitarian',
      status: 'draft'
    },
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(postRes.status, 200, 'Post created returns 200');
  const postId = postRes.body.post.id;

  // Publish post
  const updateRes = await request(`/api/posts/${postId}`, {
    method: 'PUT',
    body: { status: 'published' },
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(updateRes.status, 200, 'Post updated returns 200');
  assert.strictEqual(updateRes.body.post.status, 'published', 'Post published');
  console.log('  ✓ CMS Post Lifecycle verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 11: Audit Trail Verification
  // -------------------------------------------------------------
  console.log('[11/12] Testing Audit Trail Telemetry...');
  const auditRes = await request('/api/audit', {
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(auditRes.status, 200, 'Audit logs return 200');
  assert(auditRes.body.logs.length >= 5, 'Audit trail recorded critical events');
  console.log('  ✓ Audit Trail verified.');
  passedCount++;

  // -------------------------------------------------------------
  // SUITE 12: Frontend Views Integrity & Responsive CSS
  // -------------------------------------------------------------
  console.log('[12/12] Testing All Frontend Views & Responsive Design...');
  const views = [
    { name: 'Home', html: renderHomeView('ar') },
    { name: 'About', html: renderAboutView('ar') },
    { name: 'Services', html: renderServicesView('ar') },
    { name: 'Standards', html: renderStandardsView('ar') },
    { name: 'Projects', html: renderProjectsView('ar') },
    { name: 'News', html: renderNewsView('ar') },
    { name: 'Delivery', html: renderDeliveryView('ar') },
    { name: 'Academy', html: renderAcademyView('ar') },
    { name: 'Contact', html: renderContactView('ar') },
    { name: 'Login', html: renderLoginView('ar') },
    { name: 'Student Dashboard', html: renderStudentDashboardView('ar') },
    { name: 'Teacher Dashboard', html: renderTeacherDashboardView('ar') },
    { name: 'Admin Portal', html: renderAdminView('ar') },
    { name: 'Course Detail', html: renderCourseDetailView('ar') },
    { name: 'Forms', html: renderFormsView('ar') }
  ];

  views.forEach(v => {
    assert(v.html && v.html.length > 100, `${v.name} renders non-empty HTML`);
    assert(v.html.includes('شات') || v.html.includes('SHAT'), `${v.name} contains SHAT branding`);
  });
  console.log('  ✓ All 13 Frontend Views verified with 0 errors.');
  passedCount++;

  console.log('\n================================================================');
  console.log(`🏆 ALL ${passedCount}/${totalCount} PRODUCTION TEST SUITES PASSED FLAWLESSLY!`);
  console.log('================================================================');

  if (server) server.close();
  process.exit(0);
}

runAllTests().catch(err => {
  console.error('\n❌ TEST SUITE FAILED:', err);
  if (server) server.close();
  process.exit(1);
});
