// scripts/extract-frames.mjs
// One-time script to extract frames from orbit videos for canvas scrubbing.
// Uses ffmpeg-static so no system ffmpeg is needed.

import { execSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Get the ffmpeg binary path from ffmpeg-static
let ffmpegPath;
try {
  const mod = await import('ffmpeg-static');
  ffmpegPath = mod.default;
} catch {
  console.error('ERROR: ffmpeg-static not installed. Run: npm install --save-dev ffmpeg-static');
  process.exit(1);
}

console.log(`Using ffmpeg at: ${ffmpegPath}`);

const videos = [
  {
    input: resolve(ROOT, 'public/videos/glasses-orbit.mp4'),
    outputDir: resolve(ROOT, 'public/sequences/glasses'),
    prefix: 'glasses',
  },
  {
    input: resolve(ROOT, 'public/videos/watch-orbit.mp4'),
    outputDir: resolve(ROOT, 'public/sequences/watch'),
    prefix: 'watch',
  },
];

for (const video of videos) {
  console.log(`\n--- Processing: ${video.input} ---`);

  // Create output directory
  mkdirSync(video.outputDir, { recursive: true });

  // Get video duration to calculate fps for ~75 frames target
  const TARGET_FRAMES = 75;
  let duration;
  try {
    const probeOutput = execSync(
      `"${ffmpegPath}" -i "${video.input}" 2>&1 || true`,
      { encoding: 'utf8', shell: true }
    );
    const durationMatch = probeOutput.match(/Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/);
    if (durationMatch) {
      duration =
        parseInt(durationMatch[1]) * 3600 +
        parseInt(durationMatch[2]) * 60 +
        parseInt(durationMatch[3]) +
        parseInt(durationMatch[4]) / 100;
    }
  } catch (e) {
    // Duration parsing may fail on some systems, use fallback
  }

  if (!duration || duration <= 0) {
    console.log('Could not detect duration, using fps=15 as fallback');
    duration = 5; // fallback
  }

  const fps = Math.max(5, Math.min(30, Math.round(TARGET_FRAMES / duration)));
  console.log(`Video duration: ${duration.toFixed(2)}s → using fps=${fps} (target ~${TARGET_FRAMES} frames)`);

  // Extract frames
  const outputPattern = resolve(video.outputDir, `${video.prefix}_%03d.jpg`);
  try {
    execSync(
      `"${ffmpegPath}" -i "${video.input}" -vf "fps=${fps}" -q:v 2 "${outputPattern}" -y`,
      { stdio: 'inherit', shell: true }
    );
  } catch (e) {
    console.error(`ERROR extracting frames for ${video.prefix}:`, e.message);
    continue;
  }

  // Count frames
  const files = readdirSync(video.outputDir).filter(f => f.endsWith('.jpg'));
  console.log(`✓ Extracted ${files.length} frames to ${video.outputDir}`);

  if (files.length < 10) {
    console.error(`⚠ WARNING: Only ${files.length} frames extracted — this may be too few for smooth scrubbing.`);
  }
}

console.log('\n--- Frame extraction complete ---');
