import multer from "multer";

// Use memory storage so we can stream/upload directly to Supabase Storage Bucket
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/avif",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type (${file.mimetype}). Allowed types: JPG, PNG, WEBP, GIF, SVG, AVIF`
      ),
      false
    );
  }
};

export const uploadSingleImage = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: imageFilter,
}).single("image");

export const uploadAnyImage = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
  fileFilter: imageFilter,
});
