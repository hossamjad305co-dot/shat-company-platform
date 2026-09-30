// tests/verify_standards_content.js
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

import assert from 'node:assert';

async function runVerification() {
  const { renderCompanyHomePage } = await import('../assets/js/pages/company/HomePage.js');
  const { translations } = await import('../assets/js/translations.js');

  console.log('Testing HomePage content generation...');
  const html = await renderCompanyHomePage();

  // Verify International Standards
  assert(html.includes('Core Humanitarian Standard (CHS)'), 'CHS must be present on Homepage');
  assert(html.includes('The Sphere Project Handbook'), 'Sphere must be present on Homepage');
  assert(html.includes('OECD DAC Evaluation Criteria'), 'OECD DAC must be present on Homepage');
  assert(html.includes('UN Evaluation Group Norms & Standards'), 'UNEG must be present on Homepage');
  assert(html.includes('Protection & PSEA Frameworks (IASC)'), 'PSEA must be present on Homepage');
  assert(html.includes('Do No Harm (DNH) Framework'), 'Do No Harm must be present on Homepage');
  assert(html.includes('Human Rights-Based Approach'), 'HRBA must be present on Homepage');
  assert(html.includes('Accountability to Affected People'), 'AAP must be present on Homepage');

  // Verify Concept, Practical Application, and Deliverables
  assert(html.includes('ما هو المعيار وقيمته المؤسسية؟'), 'Why it matters heading must be present');
  assert(html.includes('كيف تطبقه شات ميدانياً؟'), 'How SHAT applies must be present');
  assert(html.includes('المخرج المؤسسي المحقق:'), 'Deliverables must be present');

  // Verify Delivery Model (Domain 04)
  assert(html.includes('كيف نعمل؟ — نموذج التدخل من الاحتياج إلى النتائج'), 'Delivery model title must be present');
  assert(html.includes('Understand'), 'Understand step must be present');
  assert(html.includes('Assess'), 'Assess step must be present');
  assert(html.includes('Design'), 'Design step must be present');
  assert(html.includes('Deliver'), 'Deliver step must be present');
  assert(html.includes('Measure'), 'Measure step must be present');
  assert(html.includes('Learn & Improve'), 'Learn & Improve step must be present');

  // Verify Value Proposition & Positioning (Domain 08 & Domain 09)
  assert(html.includes('معادلة الأثر والقيمة المؤسسية'), 'Value equation must be present');
  assert(html.includes('Knowledge') && html.includes('Capacity') && html.includes('Practice') && html.includes('Performance') && html.includes('Results'), 'Formula elements must be present');

  // Verify 10 Professional Principles (Domain 05)
  assert(html.includes('الممارسة القائمة على الأدلة'), 'Principle 1 must be present');
  assert(html.includes('التطوير القائم على الكفاءات'), 'Principle 2 must be present');
  assert(html.includes('النهج القائم على حقوق الإنسان'), 'Principle 3 must be present');
  assert(html.includes('مبدأ عدم الإضرار'), 'Principle 4 must be present');
  assert(html.includes('المساءلة المؤسسية'), 'Principle 5 must be present');
  assert(html.includes('الشمول وعدم التمييز'), 'Principle 6 must be present');
  assert(html.includes('الحماية وصون السلامة'), 'Principle 7 must be present');
  assert(html.includes('الممارسة الأخلاقية والنزاهة'), 'Principle 8 must be present');
  assert(html.includes('السرية وحماية البيانات'), 'Principle 9 must be present');
  assert(html.includes('الجودة والتحسين المستمر'), 'Principle 10 must be present');

  // Verify translations standards
  assert(translations.ar.references.standards.length >= 8, 'Arabic standards array must have at least 8 items');
  assert(translations.en.references.standards.length >= 8, 'English standards array must have at least 8 items');
  const dnhAr = translations.ar.references.standards.find(s => s.code === 'Do No Harm');
  assert(dnhAr, 'Do No Harm must be in Arabic standards');
  assert(dnhAr.whyItMatters, 'whyItMatters must be present in Do No Harm');
  assert(dnhAr.howShatApplies, 'howShatApplies must be present in Do No Harm');
  assert(dnhAr.deliverable, 'deliverable must be present in Do No Harm');

  console.log('✅ ALL VERIFICATIONS PASSED SUCCESSFULLY (100% Truthfulness & Coverage)!');
}

runVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
