// SHAT Platform — Audit Logging Service (services/audit/auditService.js)
// Records administrative mutations and system events for forensic accountability

import { authService } from '../auth/authService.js';
import { supabase } from '../api/client.js';

const AUDIT_STORAGE_KEY = 'shat_audit_logs';

function getStoredLogs() {
  try {
    return JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveStoredLogs(logs) {
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs.slice(-200))); // keep latest 200
  } catch (e) {
    console.warn('Audit log storage warning:', e);
  }
}

export const AuditAction = Object.freeze({
  SETTINGS_UPDATE: 'SETTINGS_UPDATE',
  RESTORE_BACKUP: 'RESTORE_BACKUP',
  POST_CREATE: 'POST_CREATE',
  POST_UPDATE: 'POST_UPDATE',
  POST_PUBLISH: 'POST_PUBLISH',
  POST_UNPUBLISH: 'POST_UNPUBLISH',
  POST_DELETE: 'POST_DELETE',
  APPLICATION_APPROVED: 'APPLICATION_APPROVED',
  APPLICATION_REJECTED: 'APPLICATION_REJECTED',
  USER_ROLE_CHANGE: 'USER_ROLE_CHANGE'
});

export const auditService = {
  log({ action, entity, resource, details }) {
    return this.logAction({ action, entity: entity || resource || 'SYSTEM', details });
  },

  /**
   * Log an administrative or security action
   * @param {Object} entry { action, entity, entityId, details }
   */
  async logAction({ action, entity, entityId = '', details = {} }) {
    const user = authService.getCurrentUser() || { name: 'Guest/System', role: 'visitor' };
    const logItem = {
      id: 'audit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      user: {
        id: user.id || user.username || 'unknown',
        name: user.name || 'مستخدم غير محدد',
        role: user.role || 'visitor',
        email: user.email || ''
      },
      action,
      entity,
      entityId: String(entityId),
      details: typeof details === 'string' ? details : JSON.stringify(details)
    };

    const logs = getStoredLogs();
    logs.unshift(logItem);
    saveStoredLogs(logs);

    // Sync to Supabase if connected
    if (supabase && user.role === 'admin') {
      try {
        await supabase.from('shat_audit_logs').insert([{
          user_id: user.id || null,
          user_name: user.name,
          user_role: user.role,
          action,
          entity,
          entity_id: String(entityId),
          details: logItem.details,
          created_at: logItem.timestamp
        }]);
      } catch (err) {
        // Fallback silently to local audit record
      }
    }

    return logItem;
  },

  /**
   * Retrieve audit logs with optional filtering
   */
  async getLogs({ limit = 50, entity = null } = {}) {
    const logs = getStoredLogs();
    let filtered = logs;
    if (entity) {
      filtered = filtered.filter(l => l.entity === entity);
    }
    return filtered.slice(0, limit);
  },

  /**
   * Clear logs (Super admin only)
   */
  clearLogs() {
    localStorage.removeItem(AUDIT_STORAGE_KEY);
  }
};
