/**
 * Slice the logo into fork, book, and knife components for animated splash screen.
 * Uses column-based alpha analysis to find actual element boundaries.
 *
 * Run with: npx tsx scripts/slice-logo.ts
 */

import sharp from 'sharp';
import path from 'path';

const ASSETS_DIR = path.join(__dirname, '../assets');
const SOURCE_IMAGE = path.join(ASSETS_DIR, 'logo_transparent_background.png');

async function analyzeImage(): Promise<{
  width: number;
  height: number;
  pixels: Buffer;
  channels: number;
}> {
  const { data, info } = await sharp(SOURCE_IMAGE)
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    width: info.width,
    height: info.height,
    pixels: data,
    channels: info.channels,
  };
}

/**
 * Check if a column has any non-transparent pixels
 */
function columnHasContent(
  pixels: Buffer,
  width: number,
  height: number,
  channels: number,
  x: number
): boolean {
  for (let y = 0; y < height; y++) {
    const idx = (y * width + x) * channels;
    const alpha = pixels[idx + 3];
    if (alpha > 10) return true;
  }
  return false;
}

/**
 * Find contiguous regions of content in the image by analyzing columns
 */
function findContentRegions(
  pixels: Buffer,
  width: number,
  height: number,
  channels: number
): Array<{ start: number; end: number }> {
  const regions: Array<{ start: number; end: number }> = [];
  let inRegion = false;
  let regionStart = 0;

  for (let x = 0; x < width; x++) {
    const hasContent = columnHasContent(pixels, width, height, channels, x);

    if (hasContent && !inRegion) {
      inRegion = true;
      regionStart = x;
    } else if (!hasContent && inRegion) {
      regions.push({ start: regionStart, end: x - 1 });
      inRegion = false;
    }
  }

  if (inRegion) {
    regions.push({ start: regionStart, end: width - 1 });
  }

  return regions;
}

async function sliceImage() {
  console.log('🔪 Analyzing logo to find element boundaries via alpha channel...\n');

  const { width, height, pixels, channels } = await analyzeImage();
  console.log(`Image size: ${width}x${height}, channels: ${channels}`);

  if (channels !== 4) {
    console.error('❌ Image must have alpha channel (4 channels)');
    return;
  }

  // Find content regions
  const regions = findContentRegions(pixels, width, height, channels);
  console.log(`\n📐 Found ${regions.length} content region(s):`);
  regions.forEach((r, i) => {
    console.log(`  Region ${i + 1}: x=${r.start}-${r.end} (width: ${r.end - r.start + 1})`);
  });

  // Expected: 3 regions (fork, book, knife)
  if (regions.length !== 3) {
    console.warn(`⚠️  Expected 3 regions but found ${regions.length}. Using fallback values.`);
  }

  // Use detected regions directly
  const forkRegion = regions[0] || { start: 160, end: 260 };
  const bookRegion = regions[1] || { start: 298, end: 739 };
  const knifeRegion = regions[2] || { start: 788, end: 864 };

  console.log('\n📊 Using detected boundaries:');
  console.log(`  Fork:  ${forkRegion.start}-${forkRegion.end}`);
  console.log(`  Book:  ${bookRegion.start}-${bookRegion.end}`);
  console.log(`  Knife: ${knifeRegion.start}-${knifeRegion.end}`);

  // Create non-overlapping slices
  // Fork: from image start to just before book starts
  // Book: full book region with small padding
  // Knife: from just after book ends to image end

  const GAP = 5; // Margin between elements

  const slices = {
    fork: {
      name: 'splash_fork',
      left: 0,
      top: 0,
      width: bookRegion.start - GAP,  // Stop before book
      height: height,
    },
    book: {
      name: 'splash_book',
      left: bookRegion.start - 3,  // Tiny margin to ensure full book
      top: 0,
      width: (bookRegion.end + 3) - (bookRegion.start - 3),
      height: height,
    },
    knife: {
      name: 'splash_knife',
      left: bookRegion.end + GAP,  // Start after book ends
      top: 0,
      width: width - (bookRegion.end + GAP),
      height: height,
    },
  };

  console.log('\n✂️  Final slice regions (non-overlapping):');
  console.log(`  Fork:  x=0-${slices.fork.width} (width: ${slices.fork.width})`);
  console.log(`  Book:  x=${slices.book.left}-${slices.book.left + slices.book.width} (width: ${slices.book.width})`);
  console.log(`  Knife: x=${slices.knife.left}-${width} (width: ${slices.knife.width})`);

  console.log('\n📁 Creating slice files...');

  for (const [, slice] of Object.entries(slices)) {
    const outputPath = path.join(ASSETS_DIR, `${slice.name}.png`);

    await sharp(SOURCE_IMAGE)
      .extract({
        left: slice.left,
        top: slice.top,
        width: slice.width,
        height: slice.height,
      })
      .toFile(outputPath);

    console.log(`  ✅ ${slice.name}.png (${slice.width}x${slice.height} from x=${slice.left})`);
  }

  // Output the slice dimensions for use in SplashOverlay.tsx
  console.log('\n📋 Update SplashOverlay.tsx with these dimensions:');
  console.log(`const FORK = { width: ${slices.fork.width}, height: ${slices.fork.height}, left: ${slices.fork.left} };`);
  console.log(`const BOOK = { width: ${slices.book.width}, height: ${slices.book.height}, left: ${slices.book.left} };`);
  console.log(`const KNIFE = { width: ${slices.knife.width}, height: ${slices.knife.height}, left: ${slices.knife.left} };`);

  console.log('\n🎉 Done!');
}

sliceImage().catch(console.error);
