import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addAnime, updateStatus, getUserAnime, deleteAnime } from "../controllers/animeController.js"

const router = express.Router();

router.post("/add", protect, addAnime);
router.put("/update", protect, updateStatus);
router.get("/mylist", protect, getUserAnime);
router.delete("/remove/:id", protect, deleteAnime);

export default router;