import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDirectory =
  process.env.UPLOAD_DIRECTORY || path.join(__dirname, '../public/images/');

export const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  },
});

export const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false); // Use Error constructor for consistent error handling
  }
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

export const productImgResize = async (req, res, next) => {
  try {
    if (!req.file) return next();

    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(path.join(uploadDirectory, 'products', file.filename)); // Use path.join to ensure correct directory structure
        fs.unlinkSync(file.path);
      })
    );

    next();
  } catch (err) {
    next(err); // Forward the error to the error handler
  }
};

export const blogImgResize = async (req, res, next) => {
  try {
    if (!req.file) return next();

    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(path.join(uploadDirectory, 'blogs', file.filename)); // Use path.join to ensure correct directory structure
        fs.unlinkSync(file.path);
      })
    );

    next();
  } catch (err) {
    next(err); // Forward the error to the error handler
  }
};
