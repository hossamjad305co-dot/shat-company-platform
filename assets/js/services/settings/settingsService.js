// SHAT Platform — Master Settings & Configuration Service (services/settings/settingsService.js)
// Centralized enterprise management for corporate branding, contact channels, Google Form integrations, and backup/restore.

import { ENV } from '../../config/env.js';
import { auditService, AuditAction } from '../audit/auditService.js';

const SETTINGS_STORAGE_KEY = 'shat_system_settings';

const DEFAULT_SETTINGS = Object.freeze({
  company: {
    nameAr: 'شركة شات للتنمية والتطوير',
    nameEn: 'SHAT Development & Growth',
    taglineAr: 'بناء القدرات • تعزيز المؤسسات • تطوير النتائج',
    taglineEn: 'Building Capacity • Strengthening Institutions • Advancing Results',
    mottoAr: 'الإنسان • المهارات • غدٌ أكثر إشراقاً',
    email: 'shat.company26@gmail.com',
    phone: '+972 59 287 9621',
    whatsapp: 'https://wa.me/972592879621',
    facebook: 'https://www.facebook.com/shat.development.growth',
    instagram: 'https://www.instagram.com/shat.development.growth/',
    locationAr: 'فلسطين • خدماتنا تغطي النطاق الإقليمي والدولي',
    logoUrl: 'assets/logo/logo-transparent.png',
    heroBadgeUrl: 'assets/logo/logo-banner.jpg'
  },
  admissions: {
    mode: 'both', // 'both' | 'internal' | 'external_gform'
    defaultGoogleFormUrl: 'https://forms.gle/shat-training-register-2026',
    generatedInternalUrl: 'https://shat-company-platform.vercel.app/#/apply',
    allowDirectEnrollment: true
  },
  drive: {
    status: 'ACTIVE_MEDIATION',
    providerName: 'Google Drive Enterprise (5TB)',
    directDownloadPrefix: 'https://drive.google.com/uc?export=download&id='
  }
});

class SettingsService {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    if (typeof localStorage === 'undefined') return { ...DEFAULT_SETTINGS };
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          company: { ...DEFAULT_SETTINGS.company, ...(parsed.company || {}) },
          admissions: { ...DEFAULT_SETTINGS.admissions, ...(parsed.admissions || {}) },
          drive: { ...DEFAULT_SETTINGS.drive, ...(parsed.drive || {}) }
        };
      }
    } catch (e) {
      console.warn('[SettingsService] Failed to load settings from storage:', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  saveSettings(newSettings) {
    this.settings = {
      company: { ...this.settings.company, ...(newSettings.company || {}) },
      admissions: { ...this.settings.admissions, ...(newSettings.admissions || {}) },
      drive: { ...this.settings.drive, ...(newSettings.drive || {}) }
    };

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
        // Also sync with applications settings
        localStorage.setItem('shat_applications_settings', JSON.stringify(this.settings.admissions));
      } catch (e) {
        console.error('[SettingsService] Failed to save settings:', e);
      }
    }

    auditService.log({
      action: AuditAction.SETTINGS_UPDATE || 'SETTINGS_UPDATE',
      resource: 'PLATFORM_SETTINGS',
      details: 'Updated platform settings and company details'
    });

    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('shat:settings-updated', { detail: this.settings }));
    }

    return this.settings;
  }

  getSettings() {
    return { ...this.settings };
  }

  getCompanyInfo() {
    return { ...this.settings.company };
  }

  getAdmissionsConfig() {
    return { ...this.settings.admissions };
  }

  setGoogleFormUrl(gformUrl) {
    if (!gformUrl) return;
    const cleanUrl = gformUrl.trim();
    this.settings.admissions.defaultGoogleFormUrl = cleanUrl;
    return this.saveSettings(this.settings);
  }

  // Export complete site data for backup
  exportFullBackup() {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings: this.settings,
      posts: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('shat_cms_posts') || '[]') : [],
      applications: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('shat_applications') || '[]') : [],
      media: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('shat_media_library') || '[]') : [],
      auditLogs: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('shat_audit_logs') || '[]') : []
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `shat_platform_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    return true;
  }

  // Import and restore complete site data
  importFullBackup(jsonContent) {
    try {
      const data = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
      if (!data) throw new Error('Invalid JSON data');

      if (data.settings) this.saveSettings(data.settings);
      if (typeof localStorage !== 'undefined') {
        if (Array.isArray(data.posts)) localStorage.setItem('shat_cms_posts', JSON.stringify(data.posts));
        if (Array.isArray(data.applications)) localStorage.setItem('shat_applications', JSON.stringify(data.applications));
        if (Array.isArray(data.media)) localStorage.setItem('shat_media_library', JSON.stringify(data.media));
      }

      auditService.log({
        action: 'RESTORE_BACKUP',
        resource: 'SYSTEM_BACKUP',
        details: 'Restored system database and settings from backup file'
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  resetToDefaults() {
    this.settings = { ...DEFAULT_SETTINGS };
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      localStorage.removeItem('shat_applications_settings');
    }
    return this.settings;
  }
}

export const settingsService = new SettingsService();
export default settingsService;
