import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, followUser, unfollowUser, getAllUser, getFollowData } from "../controllers/userController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.get("/all", protect, getAllUser);
router.put("/me", protect, upload.single("image"), updateProfile);
router.put("/follow", protect, followUser);
router.delete("/:id/unfollow", protect, unfollowUser);
router.get("/:id/getfollowdata", protect, getFollowData);

export default router;