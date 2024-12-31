const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Parse command-line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node script.js <file_or_directory_path> [--quality=80] [--width=1200] [--height=1200] [--format=jpeg|png|webp]');
  process.exit(1);
}

// Extract options from arguments
const inputPath = args[0];
const options = {
  quality: parseInt(getArgValue('--quality', 80)),
  width: parseInt(getArgValue('--width', 1200)),
  height: parseInt(getArgValue('--height', 1200)),
  format: getArgValue('--format', 'jpeg')
};

function getArgValue(option, defaultValue) {
  const arg = args.find(arg => arg.startsWith(option));
  return arg ? arg.split('=')[1] : defaultValue;
}

// Create optimized folder
const parentDir = path.dirname(inputPath);
const optimizedDir = path.join(parentDir, 'optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

// Get all image files from a folder or process a single file
function getImageFiles(input) {
  let files = [];
  if (fs.statSync(input).isDirectory()) {
    fs.readdirSync(input).forEach((file) => {
      const filePath = path.join(input, file);
      if (fs.statSync(filePath).isDirectory()) {
        files = files.concat(getImageFiles(filePath));
      } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
        files.push(filePath);
      }
    });
  } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(input).toLowerCase())) {
    files.push(input);
  }
  return files;
}

// Optimize an image
async function optimizeImage(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if width or height exceeds provided limits
    const shouldResize = metadata.width > options.width || metadata.height > options.height;
    const resizeOptions = shouldResize ? { width: options.width, height: options.height, fit: 'inside' } : null;

    const optimizedPath = path.join(optimizedDir, path.basename(filePath));

    let formatOptions = {};
    if (options.format === 'jpeg') {
      formatOptions = { quality: options.quality, mozjpeg: true };
    } else if (options.format === 'png') {
      formatOptions = { quality: options.quality, compressionLevel: 9 };
    } else if (options.format === 'webp') {
      formatOptions = { quality: options.quality };
    }

    await image
      .resize(resizeOptions)
      [options.format](formatOptions)
      .toFile(optimizedPath);

    console.log(`Optimized: ${filePath} → ${optimizedPath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}: ${error.message}`);
  }
}

// Main Execution
(async () => {
  try {
    const files = getImageFiles(inputPath);
    console.log(`Found ${files.length} image(s) to process.`);

    for (const file of files) {
      await optimizeImage(file);
    }

    console.log('Image optimization complete.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
