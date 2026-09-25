// SHAT Platform — Modular Localization Registry (locales/index.js)
import arCommon from './ar/common.js';
import arCompany from './ar/company.js';
import arAcademy from './ar/academy.js';
import { admin as arAdmin, errors as arErrors } from './ar/admin.js';

import enCommon from './en/common.js';
import { company as enCompany, academy as enAcademy, admin as enAdmin, errors as enErrors } from './en/index.js';

// Assembled modular bundles
export const localeBundles = {
  ar: {
    ...arCommon,
    company: arCompany,
    academy: arAcademy,
    admin: arAdmin,
    errors: arErrors
  },
  en: {
    ...enCommon,
    company: enCompany,
    academy: enAcademy,
    admin: enAdmin,
    errors: enErrors
  },
  fr: {
    ...enCommon, // Fallback gracefully to international English structure for French where keys align
    dir: 'ltr',
    langName: 'Français',
    flag: '🇫🇷',
    requestConsultation: 'Demander une consultation',
    companyTagline: 'Renforcement des Capacités • Développement Institutionnel • Résultats Durables'
  }
};

let activeLocale = localStorage.getItem('shat_platform_lang') || 'ar';

export function getActiveLocale() {
  return activeLocale;
}

export function setActiveLocale(locale) {
  if (!localeBundles[locale]) locale = 'ar';
  activeLocale = locale;
  localStorage.setItem('shat_platform_lang', locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = localeBundles[locale].dir;
  return localeBundles[locale];
}

export function t(path, fallback = '') {
  const bundle = localeBundles[activeLocale] || localeBundles.ar;
  const parts = path.split('.');
  let current = bundle;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return fallback || path;
    }
  }
  return current;
}
