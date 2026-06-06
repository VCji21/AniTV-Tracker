/* --- Add selected anime to database, create snapshot for user --- */ 
import AnimeModel from "../models/Anime.js";

/* --- POST: Add selected anime to database for current user --- */ 
export const addAnime = async (req, res) => {
    try {
        const {animeId, title, image, total_episodes, rating} = req.body;
        const { _id: userId } = req.user;
        
        // 1. Validate
        if (!animeId || !title) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // 2. Checking if anime exists
        const exists = await AnimeModel.findOne({ userId: userId, animeId: animeId });
        if (exists) {
            return res.status(409).json({ message: "Anime already exists" });
        }

        // 3. Insert required values to database
        const anime = await AnimeModel.create({
            userId: userId, 
            animeId: animeId, 
            title: title, 
            image: image, 
            total_episodes: total_episodes, 
            rating: rating
        });

        // 4. Send response with anime data
        res.status(200).json({
            message: "Anime added successfully",
            anime
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

/* --- PUT: Update selected anime in database for current user --- */ 
export const updateStatus = async (req, res) => {
    try {
        const { animeId, status, progress: episode_progress, rating } = req.body;
        const { _id: userId } = req.user;

        // 1. Validate
        if (!animeId) {
            return res.status(400).json({ message: "animeId is required" });
        }

        // 2. Check for anime and updates the data
        const anime = await AnimeModel.findOneAndUpdate(
            { userId, animeId },
            {
                $set: { status, episode_progress, rating }
            },
            { new: true, upsert: true }
        );

        // 3. Send the response with anime
        return res.status(200).json({
            message: "Anime updated successfully",
            data: anime
        });

    } catch (error) {
        return res.status(500).json({
        message: "Server Error",
        error: error.message
        });
    }
};


/* --- GET: Get all the animes of current user --- */ 
export const getUserAnime = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        // 1. Find all the animes
        const animes = await AnimeModel.find({ userId });

        // 2. Send response for empty database.
        if (animes.length === 0) {
            return res.status(200).json({
                message: "No anime found",
                data: []
            });
        }

        // 3. Send response with all animes
        return res.status(200).json({
            message: "Anime fetched successfully",
            data: animes
        });

    } catch (error) {
        console.error("getUserAnime error:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

/* --- DELETE: Remove selected anime from database for current user --- */ 
export const deleteAnime = async (req, res) => {
    try {
        const { id: animeId } = req.params;
        const { _id: userId } = req.user;

        // 1. Find anime and delete it
        const anime = await AnimeModel.findOneAndDelete({ userId, animeId });

        // 2. Send response, if anime dosen't exist
        if (!anime) {
            return res.status(404).json({
                message: "Anime not found",
            });
        }

        // 3. Send response with deleted anime
        return res.status(200).json({
            message: "Anime Deleted successfully",
            data: anime
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}