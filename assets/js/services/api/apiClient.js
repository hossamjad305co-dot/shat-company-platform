// assets/js/services/api/apiClient.js
// Production Client Gateway to SHAT Backend API & Local Resilient Session Store

const API_BASE_URL = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? 'http://localhost:3001'
  : ''; // Relative in production with reverse proxy / same domain

class ApiClient {
  constructor() {
    this.token = this.getStoredToken();
    this.currentUser = this.getStoredUser();
  }

  getStoredToken() {
    try {
      return localStorage.getItem('shat_auth_token') || null;
    } catch (e) {
      return null;
    }
  }

  getStoredUser() {
    try {
      const u = localStorage.getItem('shat_auth_user_cache');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  }

  setSession(token, user) {
    this.token = token;
    this.currentUser = user;
    try {
      if (token) localStorage.setItem('shat_auth_token', token);
      if (user) localStorage.setItem('shat_auth_user_cache', JSON.stringify(user));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('shat:auth-updated', { detail: user }));
  }

  clearSession() {
    this.token = null;
    this.currentUser = null;
    try {
      localStorage.removeItem('shat_auth_token');
      localStorage.removeItem('shat_auth_user_cache');
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('shat:auth-updated', { detail: null }));
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[ApiClient] Network request notice on ${endpoint}:`, err.message);
      throw err;
    }
  }

  // --- Auth APIs ---
  async login(usernameOrEmail, password) {
    const res = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password })
    });
    if (res.success && res.token) {
      this.setSession(res.token, res.user);
    }
    return res;
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    this.clearSession();
  }

  async getMe() {
    try {
      const res = await this.request('/api/auth/me');
      if (res.authenticated && res.user) {
        this.setSession(this.token, res.user);
        return res.user;
      }
    } catch (e) {}
    return null;
  }

  // --- LMS APIs ---
  async getCourses() {
    return this.request('/api/courses');
  }

  async getCourseById(id) {
    return this.request(`/api/courses/${id}`);
  }

  async getMyCourses() {
    return this.request('/api/my-courses');
  }

  async getCourseAssignments(courseId) {
    return this.request(`/api/courses/${courseId}/assignments`);
  }

  async submitAssignment(assignmentId, fileName, notes) {
    return this.request('/api/submissions', {
      method: 'POST',
      body: JSON.stringify({ assignmentId, fileName, notes })
    });
  }

  async getTeacherSubmissions(courseId) {
    return this.request(`/api/courses/${courseId}/submissions`);
  }

  async gradeSubmission(submissionId, grade, feedback) {
    return this.request(`/api/submissions/${submissionId}/grade`, {
      method: 'POST',
      body: JSON.stringify({ grade, feedback })
    });
  }

  // --- Forms APIs ---
  async getForms() {
    return this.request('/api/forms');
  }

  async getFormById(id) {
    return this.request(`/api/forms/${id}`);
  }

  async importGoogleForm(googleFormUrl) {
    return this.request('/api/forms/import-google-form', {
      method: 'POST',
      body: JSON.stringify({ googleFormUrl })
    });
  }

  async submitForm(formId, answers) {
    return this.request(`/api/forms/${formId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  async getFormResponses(formId) {
    return this.request(`/api/forms/${formId}/responses`);
  }

  // --- CMS Posts APIs ---
  async getPosts() {
    return this.request('/api/posts');
  }

  async createPost(postData) {
    return this.request('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async updatePost(postId, postData) {
    return this.request(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    });
  }

  // --- Applications & Inquiries ---
  async submitApplication(appData) {
    return this.request('/api/applications', {
      method: 'POST',
      body: JSON.stringify(appData)
    });
  }

  async getApplications() {
    return this.request('/api/applications');
  }

  async updateApplicationStatus(id, status) {
    return this.request(`/api/applications/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  }

  async submitInquiry(inquiryData) {
    return this.request('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  }

  async getInquiries() {
    return this.request('/api/inquiries');
  }

  // --- Teacher Portal Analytics ---
  async getTeacherCourses() {
    return this.request('/api/teacher/courses');
  }

  async getTeacherRoster(courseId) {
    return this.request(`/api/teacher/courses/${courseId}/roster`);
  }

  // --- User Management ---
  async getUsers() {
    return this.request('/api/users');
  }

  // --- System Health & Telemetry ---
  async getSystemHealth() {
    return this.request('/api/health');
  }

  async getAuditLogs() {
    return this.request('/api/audit');
  }
}

export const api = new ApiClient();
