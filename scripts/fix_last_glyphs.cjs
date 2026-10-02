const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. faqSection.js
const faqPath = path.join(root, 'assets', 'js', 'components', 'faqSection.js');
let faqCode = fs.readFileSync(faqPath, 'utf8');
faqCode = faqCode.replace('>▼</span>', `>\${icons.chevronDown('', 14)}</span>`);
fs.writeFileSync(faqPath, faqCode, 'utf8');

// 2. AdminPortalPage.js
const adminPortalPath = path.join(root, 'assets', 'js', 'pages', 'admin', 'AdminPortalPage.js');
let adminCode = fs.readFileSync(adminPortalPath, 'utf8');
adminCode = adminCode.replace(
  '<a href="#/home" style="color: #64748b; text-decoration: none;">← العودة للصفحة الرئيسية للموقع</a>',
  `<a href="#/home" style="color: #64748b; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">\${icons.arrowRight('icon-inline', 14)} <span>العودة للصفحة الرئيسية للموقع</span></a>`
);
fs.writeFileSync(adminPortalPath, adminCode, 'utf8');

// 3. EmployeeCMSPage.js
const cmsPagePath = path.join(root, 'assets', 'js', 'pages', 'employee', 'EmployeeCMSPage.js');
if (fs.existsSync(cmsPagePath)) {
  let cmsCode = fs.readFileSync(cmsPagePath, 'utf8');
  if (!cmsCode.includes("import { icons }")) {
    cmsCode = "import { icons } from '../../icons.js';\n" + cmsCode;
  }
  cmsCode = cmsCode.replaceAll(' ← ', ` \${icons.arrowLeft('icon-inline', 12)} `);
  fs.writeFileSync(cmsPagePath, cmsCode, 'utf8');
}

console.log('Cleaned FAQ, AdminPortal, and EmployeeCMS.');
