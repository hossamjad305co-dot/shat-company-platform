const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimize() {
  const logoDir = path.join(__dirname, '..', 'assets', 'logo');
  const srcPng = path.join(logoDir, 'logo-transparent.png');

  if (!fs.existsSync(srcPng)) {
    console.error('Source logo not found:', srcPng);
    return;
  }

  const statOrig = fs.statSync(srcPng);
  console.log(`Original logo size: ${(statOrig.size / 1024).toFixed(1)} KiB`);

  // 1. Create logo-transparent.webp (Retina/Standard display, max width 400px)
  const webpPath = path.join(logoDir, 'logo-transparent.webp');
  await sharp(srcPng)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toFile(webpPath);
  const statWebp = fs.statSync(webpPath);
  console.log(`Generated logo-transparent.webp: ${(statWebp.size / 1024).toFixed(1)} KiB`);

  // 2. Create small header/footer webp (160px width)
  const webpSmPath = path.join(logoDir, 'logo-transparent-sm.webp');
  await sharp(srcPng)
    .resize({ width: 160, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toFile(webpSmPath);
  const statWebpSm = fs.statSync(webpSmPath);
  console.log(`Generated logo-transparent-sm.webp: ${(statWebpSm.size / 1024).toFixed(1)} KiB`);

  // 3. Re-encode logo-transparent.png at sensible dimensions (max 400px width)
  // Backup original just in case
  const backupPng = path.join(logoDir, 'logo-transparent-original.png');
  if (!fs.existsSync(backupPng)) {
    fs.copyFileSync(srcPng, backupPng);
  }
  const tempPng = path.join(logoDir, 'logo-transparent-optimized.png');
  await sharp(srcPng)
    .resize({ width: 400, withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10, palette: true })
    .toFile(tempPng);
  
  fs.copyFileSync(tempPng, srcPng);
  fs.unlinkSync(tempPng);
  const statNewPng = fs.statSync(srcPng);
  console.log(`Optimized logo-transparent.png: ${(statNewPng.size / 1024).toFixed(1)} KiB (Saved ${((statOrig.size - statNewPng.size) / 1024).toFixed(1)} KiB)`);

  // 4. Also mirror to public/assets/logo if present
  const pubLogoDir = path.join(__dirname, '..', 'public', 'assets', 'logo');
  if (fs.existsSync(pubLogoDir)) {
    fs.copyFileSync(webpPath, path.join(pubLogoDir, 'logo-transparent.webp'));
    fs.copyFileSync(webpSmPath, path.join(pubLogoDir, 'logo-transparent-sm.webp'));
    fs.copyFileSync(srcPng, path.join(pubLogoDir, 'logo-transparent.png'));
    console.log('Mirrored optimized assets to public/assets/logo/');
  }
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
