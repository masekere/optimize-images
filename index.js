const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = './output'; // Directory containing the images

// Recursively get all image files in the directory
function getImageFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      files = files.concat(getImageFiles(filePath));
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
      files.push(filePath);
    }
  });
  return files;
}

// Resize and optimize images
async function optimizeImage(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if width or height is greater than 1200px
    const shouldResize = metadata.width > 1200 || metadata.height > 1200;
    const resizeOptions = shouldResize ? { width: 1200, height: 1200, fit: 'inside' } : null;

    // Output optimized image
    const optimizedPath = filePath;
    await image
      .resize(resizeOptions)
      .jpeg({ quality: 80, mozjpeg: true }) // Reduce quality to 80% for JPEG
      .png({ quality: 80, compressionLevel: 9 }) // Reduce quality for PNG
      .webp({ quality: 80 }) // Reduce quality for WebP
      .toFile(`${optimizedPath}.tmp`);

    // Replace original file with optimized version
    fs.renameSync(`${optimizedPath}.tmp`, optimizedPath);
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}: ${error.message}`);
  }
}

(async () => {
  try {
    const files = getImageFiles(INPUT_DIR);
    console.log(`Found ${files.length} image(s) to process.`);

    for (const file of files) {
      await optimizeImage(file);
    }

    console.log('Image optimization complete.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
