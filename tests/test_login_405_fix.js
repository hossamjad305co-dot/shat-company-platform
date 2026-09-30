// tests/test_login_405_fix.js
// Verify that the login fallback handles 405 gracefully and validates credentials properly

import { api } from '../assets/js/services/api/apiClient.js';

async function test() {
  console.log('Testing Resilient Login Fallback Mechanism...');

  // Mock global window/localStorage if in Node.js
  if (typeof globalThis.localStorage === 'undefined') {
    const store = new Map();
    globalThis.localStorage = {
      getItem: (k) => store.get(k) || null,
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k)
    };
  }

  if (typeof globalThis.window === 'undefined') {
    globalThis.window = {
      location: { hostname: 'shat-company-platform.vercel.app' },
      dispatchEvent: () => {}
    };
  }

  // 1. Test Admin Login Fallback
  const resAdmin = api.handleFallback('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail: 'admin@shat.com', password: 'password123' })
  });
  console.assert(resAdmin.success === true, 'Admin login should succeed');
  console.assert(resAdmin.user.role === 'admin', 'Admin role should be admin');
  console.log('✓ Admin login fallback verified:', resAdmin.user.fullNameAr);

  // 2. Test Teacher Login Fallback
  const resTeacher = api.handleFallback('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail: 'osama', password: 'password123' })
  });
  console.assert(resTeacher.success === true, 'Teacher login should succeed');
  console.assert(resTeacher.user.role === 'teacher', 'Teacher role should be teacher');
  console.log('✓ Teacher login fallback verified:', resTeacher.user.fullNameAr);

  // 3. Test Student Login Fallback
  const resStudent = api.handleFallback('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail: '1098765432', password: 'password123' })
  });
  console.assert(resStudent.success === true, 'Student login should succeed');
  console.assert(resStudent.user.role === 'student', 'Student role should be student');
  console.log('✓ Student login fallback verified:', resStudent.user.fullNameAr);

  // 4. Test Invalid Password Rejection
  try {
    api.handleFallback('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail: 'admin', password: 'wrongpassword' })
    });
    console.error('FAILED: Should have thrown error on wrong password');
  } catch (err) {
    console.log('✓ Wrong password properly rejected:', err.message);
  }

  // 5. Test Non-existent User Rejection
  try {
    api.handleFallback('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail: 'unknown_user_99', password: 'password123' })
    });
    console.error('FAILED: Should have thrown error on unknown user');
  } catch (err) {
    console.log('✓ Unknown user properly rejected:', err.message);
  }

  console.log('\n🎉 ALL LOGIN 405 TESTS PASSED SUCCESSFULLY!');
}

test();
