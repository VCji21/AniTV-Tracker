import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // Links to the User
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true,
        trim: true 
    },
    anime_ref: { 
        type: String, 
        default: null 
    },
    // Storing an Array of Likes IDs. :this is not good for large apps
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Like' 
    }],
    // Storing an Array of Comment IDs. :this is not good for large apps
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }]

}, { timestamps: true }); 

const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);
export default PostModel;