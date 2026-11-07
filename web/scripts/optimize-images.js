const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const inputPath = path.resolve(__dirname, '../../saif.png');
const outputDir = path.resolve(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  console.log('Reading source photo:', inputPath);
  const metadata = await sharp(inputPath).metadata();
  console.log(`Source dimensions: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  const widths = [160, 320, 480, 800];

  // 1. Generate multi-resolution WebP, AVIF, and optimized PNG
  for (const w of widths) {
    // WebP
    await sharp(inputPath)
      .resize(w, w, { fit: 'cover', position: 'top' })
      .webp({ quality: 88, effort: 6 })
      .toFile(path.join(outputDir, `saif-${w}.webp`));

    // AVIF
    await sharp(inputPath)
      .resize(w, w, { fit: 'cover', position: 'top' })
      .avif({ quality: 85, effort: 6 })
      .toFile(path.join(outputDir, `saif-${w}.avif`));

    // PNG fallback
    await sharp(inputPath)
      .resize(w, w, { fit: 'cover', position: 'top' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(outputDir, `saif-${w}.png`));

    console.log(`Generated ${w}px variants (WebP, AVIF, PNG)`);
  }

  // 2. Default standard files
  await sharp(inputPath)
    .resize(800, 800, { fit: 'cover', position: 'top' })
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, 'saif.webp'));

  await sharp(inputPath)
    .resize(800, 800, { fit: 'cover', position: 'top' })
    .png({ quality: 90 })
    .toFile(path.join(outputDir, 'saif.png'));

  // 3. Generate a tiny blur placeholder data URL
  const blurBuffer = await sharp(inputPath)
    .resize(16, 16, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

  fs.writeFileSync(
    path.join(__dirname, '../data/image-meta.ts'),
    `// Auto-generated image metadata and blur data URL\n` +
    `export const AVATAR_BLUR_DATA_URL = "${blurDataUrl}";\n` +
    `export const AVATAR_DIMENSIONS = { width: 800, height: 800 };\n`
  );

  // 4. Generate Open Graph social preview card (1200x630)
  const portraitComposite = await sharp(inputPath)
    .resize(460, 460, { fit: 'cover', position: 'top' })
    .toBuffer();

  const svgCard = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0F1115"/>
    <circle cx="200" cy="100" r="300" fill="#E0633B" opacity="0.08"/>
    <circle cx="1050" cy="520" r="240" fill="#E0633B" opacity="0.06"/>
    <rect x="80" y="80" width="1040" height="470" rx="20" fill="#16191E" stroke="#262A32" stroke-width="2"/>
    <text x="140" y="200" font-family="system-ui, sans-serif" font-size="54" font-weight="700" fill="#FFFFFF">Saif Rohyal</text>
    <text x="140" y="260" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#E0633B">Full Stack AI Engineer</text>
    <text x="140" y="320" font-family="system-ui, sans-serif" font-size="20" fill="#9CA3AF" width="500">I build AI agents and the full stack products around them.</text>
    <text x="140" y="420" font-family="monospace" font-size="16" fill="#D1D5DB">Peshawar, Pakistan • LangGraph • FastAPI • Multi-Agent Systems</text>
    <rect x="140" y="450" width="180" height="34" rx="17" fill="#E0633B"/>
    <text x="175" y="473" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">Portfolio &amp; Agents</text>
  </svg>
  `;

  await sharp(Buffer.from(svgCard))
    .composite([
      {
        input: portraitComposite,
        top: 85,
        left: 640
      }
    ])
    .png({ quality: 92 })
    .toFile(path.join(outputDir, 'og-image.png'));

  console.log('Image optimization complete! All assets and og-image generated.');
}

processImages().catch(err => {
  console.error('Image processing failed:', err);
  process.exit(1);
});
