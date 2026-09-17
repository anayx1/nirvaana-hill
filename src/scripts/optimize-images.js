const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sharp = require('sharp');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;
const MAX_FILE_SIZE = 900 * 1024; // 900 KB max limit

// Supported extensions
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

console.log('--- Image Optimizer ---');
console.log(`Settings: Max Width ${MAX_WIDTH}px, Max Height ${MAX_HEIGHT}px, Convert to WebP (Max Size: 900KB)`);

rl.question('Enter the path to the folder containing images (e.g., ./public/images): ', async (inputPath) => {
  const targetDir = path.resolve(inputPath.trim());

  if (!fs.existsSync(targetDir)) {
    console.error(`\n❌ Error: Directory does not exist at ${targetDir}`);
    rl.close();
    return;
  }

  try {
    const files = fs.readdirSync(targetDir);
    const imageFiles = files.filter(file => {
      // ignore subdirectories, only process files
      if (!fs.statSync(path.join(targetDir, file)).isFile()) return false;
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTS.includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log('\n⚠️ No supported images (.jpg, .jpeg, .png, .webp, .avif) found in the directory.');
      rl.close();
      return;
    }

    console.log(`\nFound ${imageFiles.length} images. Starting optimization to WebP...\n`);

    for (const file of imageFiles) {
      const filePath = path.join(targetDir, file);
      const outputFileName = `${path.parse(file).name}.webp`;
      const finalOutputPath = path.join(targetDir, outputFileName);
      const tempOutputPath = path.join(targetDir, `.temp_${outputFileName}`);

      try {
        let quality = 85;
        let buffer;

        // Convert to WebP and compress; if > 900KB, compress more
        while (quality >= 30) {
          buffer = await sharp(filePath)
            .resize({
              width: MAX_WIDTH,
              height: MAX_HEIGHT,
              fit: 'inside', // preserve aspect ratio
              withoutEnlargement: true // don't upscale small images
            })
            .webp({ quality, effort: 6 })
            .toBuffer();

          if (buffer.length > MAX_FILE_SIZE && quality > 30) {
            quality -= 10; // compress more to keep under 900KB
          } else {
            break;
          }
        }

        fs.writeFileSync(tempOutputPath, buffer);

        // Log size differences
        const originalSize = fs.statSync(filePath).size;
        const newSize = buffer.length;

        const originalMb = (originalSize / (1024 * 1024)).toFixed(2);
        const newMb = (newSize / (1024 * 1024)).toFixed(2);
        const savedPercent = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        // Remove original file if it had a different extension, then save .webp
        if (filePath !== finalOutputPath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        fs.renameSync(tempOutputPath, finalOutputPath);

        console.log(`✅ ${file} -> ${outputFileName}: ${originalMb}MB -> ${newMb}MB (Saved ${savedPercent}%)`);
      } catch (err) {
        if (fs.existsSync(tempOutputPath)) {
          try { fs.unlinkSync(tempOutputPath); } catch (_) {}
        }
        console.error(`❌ Failed to optimize ${file}:`, err.message);
      }
    }

    console.log(`\n🎉 All done! Optimized WebP images have been saved in:\n${targetDir}\n`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
  }
});
