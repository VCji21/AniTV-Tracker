import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Other"] 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true,
        minLength: 6 
    },
    profile_image: { 
        type: String, 
        default: "" 
    },
    bio: { 
        type: String, 
        default: "" 
    },
    followers: { 
        type: Number, 
        default: 0 
    },
    following: { 
        type: Number, 
        default: 0 
    }
}, { minimize: false, timestamps: true }); 

// Check if model exists first & Also changed model name to 'User'.
const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;