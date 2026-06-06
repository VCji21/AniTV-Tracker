/* --- Controls user related updates and query and send user data  ---*/
import userModel from "../models/User.js";
import followModel from "../models/Follow.js" 

/* --- GET: Provide the data of current user --- */
export const getProfile = async (req, res) => {
    try {
        // 1. Validate
        if (!req.user) {
            return res.status(400).json({message: "Fail to fetch user"})
        }
    
        // 2. Send the user data, (as middleware fetch full user data, except password);
        return res.status(200).json(req.user)
    } catch (err) {
        res.status(500).json({ 
            message: "Server error", 
            err 
        });
    }
}

/* --- GET: Provide the data of all user except current user --- */
export const getAllUser = async (req, res) => {
    try {
        // 1. Find the all users except the current user
        const user = await userModel.find({ _id: {$ne: req.user._id}}).sort({ username: 1 });

        // 2. Check if users exist
        if (user.length === 0) {
            return res.status(404).json({message: "No user present"})
        }
    
        // 3. Send response of users data
        return res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ 
            message: "Server error", 
            err 
        });
    }
}
 
/* --- PUT: Update the followers and following of the users --- */
export const followUser = async (req, res) => {
  try {
      const follower_id = req.user._id;      // me
      const following_id = req.body.followed; // user I follow

      // 1. Validate
      if (!following_id) {
          return res.status(400).json({ message: "User to follow is required" });
      }

      // 2. Inserting follow using users IDs  
      await followModel.create({
          follower_id,
          following_id
      });

      // 3. Increment following count (current)
      await userModel.findByIdAndUpdate(
          follower_id,
          { $inc: { following: 1 } }
      );

      // 4. Increment followers count (other)
      await userModel.findByIdAndUpdate(
          following_id,
          { $inc: { followers: 1 } }
      );

      // 5. Send success response
      return res.status(200).json({
          message: "User followed successfully"
      });
    } catch (err) {
        // 6. Duplicate follow
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Already following this user"
            });
        }   
        res.status(500).json({ message: "Server error", err });
    }
}

/* --- GET: Get follow details of the users --- */
export const getFollowData = async (req, res) => {
  try {
      const follower_id = req.user._id
      const following_id = req.params.id

    // 1. Validate
      if (!following_id) {
          return res.status(404).json({
              message: "Can't find user"
          })
      }

      // 2. Find the data
      const followData = await followModel.findOne({ follower_id, following_id});

      if (!followData) {
          return res.status(404).json({message: "Not following user"})
      }

      // 3. Send response of follow data
      return res.status(200).json(followData);
    } catch (err) {
        res.status(500).json({ 
            message: "Server error", 
            err 
        });
    }
}

/* --- DELETE: Unfollow the users -> Update the followers and following of the users --- */
export const unfollowUser = async (req, res) => {
    try {
        const follower_id = req.user._id;     // current user
        const following_id = req.params.id;   // user to unfollow

        // 1. Validate
        if (!following_id) {
            return res.status(400).json({
                message: "User id is required"
            });
        }

      // 2. Remove follow relation
      const followData = await followModel.findOneAndDelete({
        follower_id,
        following_id
      });

      // 3. Checking is relation exists
      if (!followData) {
        return res.status(404).json({
          message: "You are not following this user"
        });
      }

      // 4. Decrease followers count of the unfollowed user
      await userModel.findByIdAndUpdate(
        following_id,
        { $inc: { followers: -1 } }
      );

      // 5. Decrease following count of current user
      await userModel.findByIdAndUpdate(
        follower_id,
        { $inc: { following: -1 } }
      );

      // 6. Success response sent
      return res.status(200).json({
        message: "Unfollow successfully"
      });
    } catch (err) {
        res.status(500).json({
            message: "Server error", 
            err 
        });
    }
}

/* --- PUT: Update the profile of current user (using middleware) --- */
export const updateProfile = async (req, res) => {
    try {
        const user = req.user; // from auth middleware
        const { username, bio } = req.body;

        // 1. Update fields only if provided
        if (username) user.username = username;
        if (bio) user.bio = bio;
    
        // 2. If image uploaded
        if (req.file) {
            user.profile_image = req.file.filename; //req.file.path;//`/uploads/${req.file.filename}`;
        }

        // 3. Save changes
        await user.save();

        // 4. Send response with user's data
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                bio: user.bio,
                image: user.image,
            },
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};