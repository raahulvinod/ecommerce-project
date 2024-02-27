import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, '../tmp/uploads');

if (!fs.existsSync(tempDir)) {
  try {
    fs.mkdirSync(tempDir, { recursive: true }); // Create directories recursively
  } catch (error) {
    console.error('Failed to create temporary directory:', error);
  }
}

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename before using it (replace with appropriate sanitization logic)
    const sanitizedFilename = path
      .parse(file.originalname)
      .name.replace(/[^a-z0-9.-]/gi, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, sanitizedFilename + '-' + uniqueSuffix + '.jpeg');
  },
});

export const uploadPhoto = multer({ storage: uploadStorage });

export const productImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.files.map(async (file) => {
      try {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error('Error during image processing:', error);
      }
    })
  );
  next();
};

export const blogImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.files.map(async (file) => {
      try {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.filename}`);
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error('Error during image processing:', error);
      }
    })
  );
  next();
};
