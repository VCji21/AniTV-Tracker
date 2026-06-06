import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Accept single file
router.post("/upload", upload.single("image"),
  (req, res) => {
    res.json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  }
);

export default router;
