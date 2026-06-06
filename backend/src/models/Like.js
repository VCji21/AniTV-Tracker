import mongoose, { Mongoose } from "mongoose";

const likeSchema = new mongoose.Schema({
    // Link to the Post
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    // Link to the User
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, {timestamps: true});

// Ensure Uniqueness
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const LikeModel = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default LikeModel;