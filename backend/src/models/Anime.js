import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    // Links to user
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // The ID from Jikan API
    animeId: { 
        type: Number, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, // URL
        default: ""
    },
    status: { 
        type: String, 
        enum: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
        default: 'Plan to Watch',
        required: true
    },
    episode_progress: { 
        type: Number, 
        default: 0,
        min: 0 // Cannot watch negative episodes
    },
    total_episodes: { 
        type: Number, 
        default: 0,
        min: 0
    },
    rating: { 
        type: Number, 
        default: 0,
        min: 0, 
        max: 10 // Assuming a 1-10 scale
    }

}, { timestamps: true });

animeSchema.index({ userId: 1, animeId: 1 }, { unique: true });

const AnimeModel = mongoose.models.Anime || mongoose.model('Anime', animeSchema);
export default AnimeModel;