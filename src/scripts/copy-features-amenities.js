const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DEFAULT_SOURCE_DIR = 'C:\\Users\\anayt\\OneDrive\\Desktop\\niravaana\\nirvaana hills\\Nirvana hills\\sec3-FEATURES & AMENITIES';
const DEFAULT_DEST_DIR = path.resolve(__dirname, '../../public/nirvaana-hills');

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;
const MAX_FILE_SIZE = 900 * 1024; // 900 KB
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[+,&]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function processImage(inputPath, outputPath) {
  let quality = 85;
  let buffer;

  while (quality >= 30) {
    buffer = await sharp(inputPath)
      .resize({
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (buffer.length > MAX_FILE_SIZE && quality > 30) {
      quality -= 10;
    } else {
      break;
    }
  }

  fs.writeFileSync(outputPath, buffer);
  const origSize = fs.statSync(inputPath).size;
  const newSize = buffer.length;
  const origKb = (origSize / 1024).toFixed(1);
  const newKb = (newSize / 1024).toFixed(1);
  const savedPercent = ((origSize - newSize) / origSize * 100).toFixed(1);

  return { origKb, newKb, savedPercent };
}

async function copyAndOptimizeAmenities(sourceDir = DEFAULT_SOURCE_DIR, destBaseDir = DEFAULT_DEST_DIR) {
  console.log(`\n🚀 Starting Features & Amenities Image Import`);
  console.log(`📂 Source: ${sourceDir}`);
  console.log(`📁 Destination: ${destBaseDir}\n`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  // Find slide folders (e.g. slide-1, SLIDE-2, slide-3, slide-4)
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  const slideFolders = entries
    .filter(entry => entry.isDirectory() && /^slide[-_]?\d+/i.test(entry.name))
    .sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, ''), 10);
      const numB = parseInt(b.name.replace(/\D/g, ''), 10);
      return numA - numB;
    });

  if (slideFolders.length === 0) {
    console.log(`⚠️ No slide folders found matching pattern 'slide*' in ${sourceDir}`);
    return;
  }

  console.log(`Found ${slideFolders.length} slide folders: ${slideFolders.map(f => f.name).join(', ')}\n`);

  for (const slideFolder of slideFolders) {
    const slideNumber = slideFolder.name.replace(/\D/g, '');
    const normalizedSlideName = `slide-${slideNumber}`;
    const targetSlideDir = path.join(destBaseDir, normalizedSlideName);
    const sourceSlideDir = path.join(sourceDir, slideFolder.name);

    if (!fs.existsSync(targetSlideDir)) {
      fs.mkdirSync(targetSlideDir, { recursive: true });
    }

    console.log(`----------------------------------------`);
    console.log(`📦 Processing ${slideFolder.name} ➡️  ${normalizedSlideName}`);

    const subEntries = fs.readdirSync(sourceSlideDir, { withFileTypes: true })
      .filter(e => !e.name.startsWith('.'))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    for (const subEntry of subEntries) {
      const fullSubPath = path.join(sourceSlideDir, subEntry.name);
      const cleanSlug = slugify(subEntry.name);

      if (subEntry.isDirectory()) {
        const subFiles = fs.readdirSync(fullSubPath)
          .filter(f => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

        if (subFiles.length === 0) {
          console.warn(`  ⚠️ No images found inside folder: ${subEntry.name}`);
          continue;
        }

        for (let i = 0; i < subFiles.length; i++) {
          const imageFile = subFiles[i];
          const imageFilePath = path.join(fullSubPath, imageFile);
          const outFileName = subFiles.length === 1 ? `${cleanSlug}.webp` : `${cleanSlug}-${i + 1}.webp`;
          const outFilePath = path.join(targetSlideDir, outFileName);

          try {
            const stats = await processImage(imageFilePath, outFilePath);
            console.log(`  ✅ ${subEntry.name} -> ${outFileName} (${stats.origKb} KB -> ${stats.newKb} KB, -${stats.savedPercent}%)`);
          } catch (err) {
            console.error(`  ❌ Failed to process ${imageFilePath}:`, err.message);
          }
        }
      } else if (subEntry.isFile()) {
        const ext = path.extname(subEntry.name).toLowerCase();
        if (SUPPORTED_EXTS.includes(ext)) {
          const baseName = path.parse(subEntry.name).name;
          const outFileName = `${slugify(baseName)}.webp`;
          const outFilePath = path.join(targetSlideDir, outFileName);

          try {
            const stats = await processImage(fullSubPath, outFilePath);
            console.log(`  ✅ ${subEntry.name} -> ${outFileName} (${stats.origKb} KB -> ${stats.newKb} KB, -${stats.savedPercent}%)`);
          } catch (err) {
            console.error(`  ❌ Failed to process ${fullSubPath}:`, err.message);
          }
        }
      }
    }
  }

  console.log(`\n🎉 All Features & Amenities images copied and optimized into:\n${destBaseDir}\n`);
}

const customSource = process.argv[2] || DEFAULT_SOURCE_DIR;
const customDest = process.argv[3] || DEFAULT_DEST_DIR;

copyAndOptimizeAmenities(customSource, customDest).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
