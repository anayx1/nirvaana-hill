const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');

let ffmpegPath;
let ffprobePath;

try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.warn('⚠️ ffmpeg-static not found, falling back to system ffmpeg');
  ffmpegPath = 'ffmpeg';
}

try {
  ffprobePath = require('ffprobe-static').path;
} catch (e) {
  console.warn('⚠️ ffprobe-static not found, falling back to system ffprobe');
  ffprobePath = 'ffprobe';
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// Supported video formats
const SUPPORTED_EXTS = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v'];

/**
 * Extract video metadata using ffprobe
 */
function probeVideo(filePath) {
  try {
    const result = spawnSync(ffprobePath, [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      filePath
    ], { encoding: 'utf8' });

    if (result.status !== 0 || !result.stdout) {
      return null;
    }

    const data = JSON.parse(result.stdout);
    const videoStream = (data.streams || []).find(s => s.codec_type === 'video');
    const audioStream = (data.streams || []).find(s => s.codec_type === 'audio');
    const duration = parseFloat(data.format?.duration || videoStream?.duration || 0);

    return {
      duration,
      width: videoStream ? parseInt(videoStream.width, 10) : 0,
      height: videoStream ? parseInt(videoStream.height, 10) : 0,
      hasAudio: !!audioStream,
      bitrate: parseInt(data.format?.bit_rate || videoStream?.bit_rate || 0, 10)
    };
  } catch (err) {
    return null;
  }
}

/**
 * Run FFmpeg encoding with progress logging
 */
function runFFmpeg(args, duration, onProgress) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args);
    let stderrData = '';

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderrData += text;

      if (duration > 0 && onProgress) {
        const match = text.match(/time=(\d+):(\d+):(\d+\.\d+)/);
        if (match) {
          const hours = parseFloat(match[1]);
          const mins = parseFloat(match[2]);
          const secs = parseFloat(match[3]);
          const currentTime = hours * 3600 + mins * 60 + secs;
          const percent = Math.min(100, Math.round((currentTime / duration) * 100));
          onProgress(percent);
        }
      }
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}.\n${stderrData.slice(-500)}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Build FFmpeg video filter for selected aspect ratio & scale
 */
function buildVideoFilter(aspectChoice, metadata) {
  switch (aspectChoice) {
    case '1': // Vertical 2:3 (e.g. 540x810 / 480x720) - Testimonial cards
      return {
        label: 'Vertical 2:3 (540x810)',
        filter: "crop=w='min(iw,ih*2/3)':h='min(ih,iw*3/2)':x='(iw-ow)/2':y='(ih-oh)/2',scale=540:810:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2"
      };
    case '2': // Vertical 9:16 (e.g. 540x960 / 720x1280) - Instagram Reels / Stories
      return {
        label: 'Vertical 9:16 (540x960)',
        filter: "crop=w='min(iw,ih*9/16)':h='min(ih,iw*16/9)':x='(iw-ow)/2':y='(ih-oh)/2',scale=540:960:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2"
      };
    case '3': // Horizontal 16:9 (e.g. 1280x720 / 960x540) - Landscape / Banner
      return {
        label: 'Horizontal 16:9 (1280x720)',
        filter: "crop=w='min(iw,ih*16/9)':h='min(ih,iw*9/16)':x='(iw-ow)/2':y='(ih-oh)/2',scale=1280:720:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2"
      };
    case '4': // Keep Original Aspect Ratio
    default: {
      const isPortrait = metadata.height > metadata.width;
      const scaleStr = isPortrait ? 'scale=min(720\\,iw):-2' : 'scale=min(1280\\,iw):-2';
      return {
        label: `Original Ratio (${isPortrait ? 'Portrait max 720w' : 'Landscape max 1280w'})`,
        filter: `${scaleStr}:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2`
      };
    }
  }
}

async function main() {
  console.log('\n======================================================');
  console.log('       🎬 High-Efficiency Video Optimizer & Cropper');
  console.log('======================================================\n');

  // 1. Folder path
  const inputPath = await askQuestion('📁 Enter folder path containing videos (e.g., ./public/homepage/testimonials): ');
  const targetDir = path.resolve(inputPath.trim() || './public/homepage/testimonials');

  if (!fs.existsSync(targetDir)) {
    console.error(`\n❌ Error: Directory does not exist at ${targetDir}`);
    rl.close();
    return;
  }

  // 2. Aspect Ratio / Framing
  console.log('\n📐 Select Video Aspect Ratio / Orientation:');
  console.log('   [1] Vertical 2:3 (540x810) - (Recommended: Fits Testimonial Card perfectly, high sharpness)');
  console.log('   [2] Vertical 9:16 (540x960) - Full Mobile Story / Reel format');
  console.log('   [3] Horizontal 16:9 (1280x720) - Desktop Landscape / Banner video');
  console.log('   [4] Keep Original Aspect Ratio (Auto-scale preserving dimensions)');
  const aspectInput = await askQuestion('👉 Select option [1-4] (Default: 1): ');
  const aspectChoice = aspectInput.trim() || '1';

  // 3. Quality / Size Profile
  console.log('\n⚡ Select Quality & File Size Target:');
  console.log('   [1] High-Clarity Balanced (~3.0 - 4.0 MB for ~1min clips, ~1.5 MB for short clips) [Recommended]');
  console.log('   [2] Ultra-Compact (Strict ~2.0 MB max)');
  console.log('   [3] Studio High Quality (~5.0 - 6.0 MB for ~1min clips)');
  console.log('   [4] Custom Target Max Size (in MB)');
  const qualityInput = await askQuestion('👉 Select option [1-4] (Default: 1): ');
  const qualityChoice = qualityInput.trim() || '1';

  let customMaxMB = null;
  if (qualityChoice === '4') {
    const customMbInput = await askQuestion('   Enter target max size in MB (e.g., 2.5): ');
    customMaxMB = parseFloat(customMbInput.trim()) || 3.0;
  }

  // 4. Audio
  const audioChoice = await askQuestion('\n🔊 Include speech audio? (48kbps optimized mono AAC) [Y/n]: ');
  const keepAudio = !audioChoice.trim().toLowerCase().startsWith('n');

  // 5. Backups
  const keepBackupChoice = await askQuestion('💾 Keep original video backups (.original)? [Y/n]: ');
  const keepBackup = !keepBackupChoice.trim().toLowerCase().startsWith('n');

  try {
    const files = fs.readdirSync(targetDir);
    const videoFiles = files.filter(file => {
      if (!fs.statSync(path.join(targetDir, file)).isFile()) return false;
      if (file.startsWith('.temp_') || file.endsWith('.original')) return false;
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTS.includes(ext);
    });

    if (videoFiles.length === 0) {
      console.log(`\n⚠️ No supported video files (${SUPPORTED_EXTS.join(', ')}) found in:\n${targetDir}`);
      rl.close();
      return;
    }

    console.log(`\nFound ${videoFiles.length} video(s). Starting optimization...\n`);

    let totalOriginalBytes = 0;
    let totalOptimizedBytes = 0;

    for (let i = 0; i < videoFiles.length; i++) {
      const file = videoFiles[i];
      const filePath = path.join(targetDir, file);
      const outputFileName = `${path.parse(file).name}.mp4`;
      const finalOutputPath = path.join(targetDir, outputFileName);
      const tempOutputPath = path.join(targetDir, `.temp_${outputFileName}`);
      const backupPath = path.join(targetDir, `${file}.original`);

      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;
      totalOriginalBytes += originalSize;

      console.log(`--------------------------------------------------`);
      console.log(`[${i + 1}/${videoFiles.length}] Processing: ${file} (${formatBytes(originalSize)})`);

      const metadata = probeVideo(filePath);
      if (!metadata) {
        console.error(`❌ Could not read video metadata for ${file}. Skipping.`);
        continue;
      }

      const duration = Math.max(1, metadata.duration || 10);
      console.log(`   Original: ${metadata.width}x${metadata.height} | Duration: ${duration.toFixed(1)}s | Audio: ${metadata.hasAudio ? 'Yes' : 'No'}`);

      // Calculate Target Max Bytes for this video
      let targetMaxBytes;
      if (qualityChoice === '4' && customMaxMB) {
        targetMaxBytes = customMaxMB * 1024 * 1024;
      } else if (qualityChoice === '2') {
        targetMaxBytes = 2.0 * 1024 * 1024; // Strict 2MB
      } else if (qualityChoice === '3') {
        // High quality: ~1.2 Mbps = ~9MB for 1-min, or ~5MB
        targetMaxBytes = Math.min(6.5, Math.max(2.0, (duration / 60) * 5.5)) * 1024 * 1024;
      } else {
        // Option 1 Balanced: ~3.5MB for 1-min (gives ~450-550 kbps, crisp on 540x810 2:3)
        targetMaxBytes = Math.min(4.2, Math.max(1.8, (duration / 60) * 3.8)) * 1024 * 1024;
      }

      // Calculate bitrates
      const audioBitrateKbps = (keepAudio && metadata.hasAudio) ? 48 : 0;
      const targetTotalBits = targetMaxBytes * 8 * 0.90;
      const totalBitrateKbps = Math.floor(targetTotalBits / duration / 1000);
      let videoBitrateKbps = Math.max(200, totalBitrateKbps - audioBitrateKbps);

      const vfConfig = buildVideoFilter(aspectChoice, metadata);
      console.log(`   Profile: ${vfConfig.label} | Target: ~${formatBytes(targetMaxBytes)} (~${videoBitrateKbps} kbps video)`);

      const buildFfmpegArgs = (vBitrate, pass = 1) => {
        const args = [
          '-y',
          '-i', filePath,
          '-c:v', 'libx264',
          '-preset', 'slow', // slow preset for optimal visual quality
          '-profile:v', 'high',
          '-level', '4.1',
          '-pix_fmt', 'yuv420p',
          '-vf', vfConfig.filter,
          '-r', '24', // 24 fps is film/interview standard, saves 20% bitrate for talking head testimonials
          '-b:v', `${vBitrate}k`,
          '-maxrate', `${Math.floor(vBitrate * 1.35)}k`,
          '-bufsize', `${Math.floor(vBitrate * 2)}k`,
          '-movflags', '+faststart'
        ];

        if (keepAudio && metadata.hasAudio) {
          args.push('-c:a', 'aac', '-b:a', `${audioBitrateKbps}k`, '-ac', '1'); // mono 48kbps speech
        } else {
          args.push('-an');
        }

        args.push(tempOutputPath);
        return args;
      };

      try {
        process.stdout.write(`   ⏳ Compressing: 0%`);
        await runFFmpeg(buildFfmpegArgs(videoBitrateKbps, 1), duration, (percent) => {
          process.stdout.write(`\r   ⏳ Compressing: ${percent}%`);
        });
        process.stdout.write(`\r   ⏳ Compressing: 100%\n`);

        let newSize = fs.statSync(tempOutputPath).size;

        // If slightly exceeds target max, run a fast adjustment pass
        if (newSize > targetMaxBytes * 1.15) {
          console.log(`   ⚠️ Size (${formatBytes(newSize)}) above target. Fine-tuning pass...`);
          const adjustedBitrate = Math.max(160, Math.floor(videoBitrateKbps * (targetMaxBytes / newSize)));
          process.stdout.write(`   ⏳ Fine-tuning: 0%`);
          await runFFmpeg(buildFfmpegArgs(adjustedBitrate, 2), duration, (percent) => {
            process.stdout.write(`\r   ⏳ Fine-tuning: ${percent}%`);
          });
          process.stdout.write(`\r   ⏳ Fine-tuning: 100%\n`);
          newSize = fs.statSync(tempOutputPath).size;
        }

        totalOptimizedBytes += newSize;
        const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

        // Handle backup
        if (keepBackup && !fs.existsSync(backupPath)) {
          fs.copyFileSync(filePath, backupPath);
        }

        if (fs.existsSync(filePath) && filePath !== finalOutputPath) {
          fs.unlinkSync(filePath);
        } else if (fs.existsSync(finalOutputPath)) {
          fs.unlinkSync(finalOutputPath);
        }

        fs.renameSync(tempOutputPath, finalOutputPath);

        console.log(`   ✅ Complete: ${file} -> ${outputFileName}`);
        console.log(`      ${formatBytes(originalSize)} ➔ ${formatBytes(newSize)} (Saved ${savedPercent}%) | Aspect: ${vfConfig.label}\n`);

      } catch (err) {
        if (fs.existsSync(tempOutputPath)) {
          try { fs.unlinkSync(tempOutputPath); } catch (_) {}
        }
        console.error(`\n   ❌ Failed to optimize ${file}:`, err.message);
      }
    }

    const totalSavedPercent = totalOriginalBytes > 0 
      ? (((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1) 
      : 0;

    console.log(`========================================`);
    console.log(`🎉 Optimization Complete!`);
    console.log(`Total Original Size : ${formatBytes(totalOriginalBytes)}`);
    console.log(`Total Optimized Size: ${formatBytes(totalOptimizedBytes)}`);
    console.log(`Total Bandwidth Saved: ${totalSavedPercent}%`);
    console.log(`========================================\n`);

  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
  }
}

main();
