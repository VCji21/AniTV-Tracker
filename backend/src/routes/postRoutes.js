import express from "express";
import { commentPost, createPost, getCommentsOfPost, getFeed, getOthersFeed, likePost, unlikePost } from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", protect, createPost);
router.put("/likes", protect, likePost);
router.delete("/:id/unlike", protect, unlikePost);
router.post("/comment", protect, commentPost);
router.get("/:id/getcomments", protect, getCommentsOfPost);
router.get("/feeds", protect, getFeed);
router.get("/allfeeds", protect, getOthersFeed);

export default router