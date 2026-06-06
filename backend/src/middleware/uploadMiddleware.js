/* --- Helps in uploading profile images --- */
import multer from "multer"; // Helps in uploading files
import path from "path";

/* --- How file should be stored ---*/
const storage = multer.diskStorage({
  // Directory name
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // Filename: for uniqueness, filename is set to current data and time
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/* --- Accept only images --- */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

/* --- Actual uploadation --- */
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB -> max file size
});