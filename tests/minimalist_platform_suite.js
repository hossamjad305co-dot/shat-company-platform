// tests/minimalist_platform_suite.js
// Verification of the new Ultra-Clean Minimalist Architecture

const storageMap = new Map();
global.localStorage = {
  getItem: (k) => storageMap.get(k) || null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

global.window = {
  location: { hash: '#/home' },
  addEventListener: () => {}
};

import assert from 'node:assert';
import { content } from '../assets/js/content.js';
import { renderHomeView } from '../assets/js/views/homeView.js';
import { renderAboutView } from '../assets/js/views/aboutView.js';
import { renderServicesView } from '../assets/js/views/servicesView.js';
import { renderStandardsView } from '../assets/js/views/standardsView.js';
import { renderDeliveryView } from '../assets/js/views/deliveryView.js';
import { renderAcademyView } from '../assets/js/views/academyView.js';
import { renderContactView } from '../assets/js/views/contactView.js';
import { renderAdminView } from '../assets/js/views/adminView.js';

console.log('================================================================');
console.log('SHAT PLATFORM — ULTRA-CLEAN MINIMALIST VERIFICATION SUITE');
console.log('================================================================\n');

// 1. Content Integrity
console.log('[1/7] Testing Content Library...');
assert(content.ar.company.name.includes('شركة شات للتنمية والتطوير'), 'Company name Arabic');
assert(content.ar.company.motto.includes('بناء القدرات • تعزيز المؤسسات • تطوير النتائج'), 'Company motto');
assert(content.ar.standards.length >= 8, 'At least 8 international standards defined');
assert(content.ar.portfolios.length === 8, '8 specialized portfolios defined');
assert(content.ar.deliveryModel.stages.length === 6, '6 delivery model stages defined');
assert(content.ar.principles.length === 10, '10 professional principles defined');
console.log('  ✓ Content integrity verified.');

// 2. Home View Render
console.log('[2/7] Testing Home View...');
const homeHtml = renderHomeView('ar');
assert(homeHtml.includes('بناء القدرات • تعزيز المؤسسات • تطوير النتائج'), 'Hero motto');
assert(homeHtml.includes('المعرفة') && homeHtml.includes('Knowledge'), 'Value equation');
assert(homeHtml.includes('منظومة المعايير وتطبيقاتها المؤسسية'), 'Standards section');
assert(homeHtml.includes('CHS') && homeHtml.includes('SPHERE') && homeHtml.includes('OECD DAC'), 'Core standard codes');
console.log('  ✓ Home View verified.');

// 3. About View Render
console.log('[3/7] Testing About View...');
const aboutHtml = renderAboutView('ar');
assert(aboutHtml.includes('نبذة عن شركة شات'), 'About title');
assert(aboutHtml.includes('الربط بين المعرفة والقدرة والممارسة والنتائج'), 'Philosophy text');
assert(aboutHtml.includes('التوجه المؤسسي'), 'Positioning heading');
console.log('  ✓ About View verified.');

// 4. Services View Render
console.log('[4/7] Testing Services View...');
const servicesHtml = renderServicesView('ar');
assert(servicesHtml.includes('منظومة التدريب (The Training System)'), 'Training system');
assert(servicesHtml.includes('الحقائب التدريبية المتخصصة الثماني'), 'Portfolios');
assert(servicesHtml.includes('استشارات الحماية والتقييم المستقل'), 'Specialized consulting');
console.log('  ✓ Services View verified.');

// 5. Standards View Render
console.log('[5/7] Testing Standards View...');
const standardsHtml = renderStandardsView('ar');
assert(standardsHtml.includes('Core Humanitarian Standard (CHS)'), 'CHS');
assert(standardsHtml.includes('The Sphere Project Handbook'), 'Sphere');
assert(standardsHtml.includes('OECD DAC Evaluation Criteria'), 'OECD DAC');
assert(standardsHtml.includes('UN Evaluation Group Norms & Standards'), 'UNEG');
assert(standardsHtml.includes('Protection & PSEA Frameworks (IASC)'), 'PSEA');
assert(standardsHtml.includes('Do No Harm (DNH) Framework'), 'Do No Harm');
assert(standardsHtml.includes('ما هو المعيار وما قيمته للمؤسسات؟'), 'Why it matters');
assert(standardsHtml.includes('كيف تطبقه شركة شات ميدانياً؟'), 'Field application');
assert(standardsHtml.includes('المخرج المؤسسي المحقق:'), 'Deliverable output');
console.log('  ✓ Standards View verified.');

// 6. Delivery & Academy Views
console.log('[6/7] Testing Delivery & Academy Views...');
const deliveryHtml = renderDeliveryView('ar');
assert(deliveryHtml.includes('Understand') && deliveryHtml.includes('Learn & Improve'), 'Delivery stages');
const academyHtml = renderAcademyView('ar');
assert(academyHtml.includes('CHS-101') && academyHtml.includes('PSEA-201') && academyHtml.includes('OECD-301'), 'Courses');
console.log('  ✓ Delivery & Academy Views verified.');

// 7. Contact & Admin Views
console.log('[7/7] Testing Contact & Admin Views...');
const contactHtml = renderContactView('ar');
assert(contactHtml.includes('shat.company26@gmail.com'), 'Email contact');
assert(contactHtml.includes('+972 59 287 9621'), 'Phone contact');
const adminHtml = renderAdminView('ar');
assert(adminHtml.includes('لوحة التحكم • Admin Control Center'), 'Admin heading');
console.log('  ✓ Contact & Admin Views verified.');

console.log('\n================================================================');
console.log('✅ ALL 7 TEST SUITES PASSED! NEW ARCHITECTURE IS 100% PRODUCTION-READY');
console.log('================================================================');
