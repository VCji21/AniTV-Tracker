import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    text: { 
        type: String, 
        required: true,
        trim: true // Removes accidental whitespace
    }

}, { timestamps: true }); 

const CommentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default CommentModel;