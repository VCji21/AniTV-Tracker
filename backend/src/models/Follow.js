import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    // The user who is performing the action 
    follower_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Refers to our User model
        required: true 
    },
    // The user who is being followed
    following_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Refers to our User model
        required: true 
    }
}); 

// Compound Index: for uniqueness
followSchema.index({ follower_id: 1, following_id: 1 }, { unique: true });

const FollowModel = mongoose.models.Follow || mongoose.model('Follow', followSchema);
export default FollowModel;