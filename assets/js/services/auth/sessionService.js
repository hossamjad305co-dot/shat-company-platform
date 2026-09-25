// SHAT Platform — Centralized Session State Service (services/auth/sessionService.js)
// Implements unified session state machine across the entire platform
// States: LOADING | AUTHENTICATED | UNAUTHENTICATED | SESSION_EXPIRED | AUTH_ERROR

import { supabase } from '../api/client.js';

export const SessionState = Object.freeze({
  LOADING: 'LOADING',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  AUTH_ERROR: 'AUTH_ERROR'
});

function safeGetStorage(key) {
  if (typeof localStorage === 'undefined') return null;
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeSetStorage(key, val) {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.setItem(key, val); } catch (e) {}
}

function safeDispatch(event, detail) {
  if (typeof window === 'undefined' || !window.dispatchEvent || typeof CustomEvent === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent(event, { detail }));
  } catch (e) {}
}

class SessionService {
  constructor() {
    this.state = SessionState.LOADING;
    this.session = null;
    this.user = null;
    this.listeners = new Set();
    this.init();
  }

  async init() {
    // 1. If Supabase client exists, attempt to restore authentic session
    if (supabase && supabase.auth) {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('[SessionService] Session fetch notice:', error.message);
          this.setState(SessionState.UNAUTHENTICATED, null, null);
        } else if (data && data.session) {
          this.setState(SessionState.AUTHENTICATED, data.session, data.session.user);
        } else {
          // Check if there is an active simulated dev session (strictly without passwords)
          this.restoreDevSession();
        }

        // Listen to Supabase auth state transitions
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            this.setState(SessionState.AUTHENTICATED, session, session.user);
          } else if (event === 'SIGNED_OUT') {
            this.setState(SessionState.UNAUTHENTICATED, null, null);
          } else if (event === 'TOKEN_REFRESHED' && session) {
            this.session = session;
            this.notify();
          } else if (event === 'USER_DELETED') {
            this.setState(SessionState.UNAUTHENTICATED, null, null);
          }
        });
      } catch (err) {
        console.warn('[SessionService] Supabase Auth initialization notice:', err);
        this.restoreDevSession();
      }
    } else {
      this.restoreDevSession();
    }
  }

  restoreDevSession() {
    try {
      const stored = safeGetStorage('shat_current_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean out any legacy plaintext passwords if found
        if (parsed.password) {
          delete parsed.password;
          safeSetStorage('shat_current_user', JSON.stringify(parsed));
        }
        if (parsed.role && parsed.role !== 'visitor') {
          this.setState(SessionState.AUTHENTICATED, null, parsed);
          return;
        }
      }
    } catch (e) {
      // LocalStorage error or invalid JSON
    }
    this.setState(SessionState.UNAUTHENTICATED, null, { role: 'visitor', name: 'زائر المنصة' });
  }

  setState(newState, session, user) {
    this.state = newState;
    this.session = session;
    this.user = user;

    // Dispatch global event for UI synchronization
    safeDispatch('shat:session-state-changed', {
      state: this.state,
      session: this.session,
      user: this.user
    });

    this.notify();
  }

  getState() {
    return this.state;
  }

  getSession() {
    return this.session;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return this.state === SessionState.AUTHENTICATED && this.user && this.user.role !== 'visitor';
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state, this.user, this.session);
      } catch (e) {
        console.error('[SessionService] Listener error:', e);
      }
    }
  }
}

export const sessionService = new SessionService();
