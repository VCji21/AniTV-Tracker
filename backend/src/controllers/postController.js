/* --- Controls posts related updates and query and send post data  ---*/
import PostModel from '../models/Post.js'
import LikeModel from "../models/Like.js"
import CommentModel from '../models/Comment.js';

/* --- POST: Create post for the current user --- */
export const createPost = async (req, res) => {
    try {
        const {content} = req.body;
        const { _id: userId } = req.user;

        // 1. Validate
        if (!content) {
            return res.status(404).json({
                message: "Can't find the post!"
            })
        }

        // 2. Inserting data in the post
        const post = await PostModel.create({
            userId: userId,
            content: content
        })

        // 3. Ckeck for post creation
        if (!post) {
            return res.status(400).json({
                message: "Can't create the post"
            })
        }

        // 4. Send response with post data
        return res.status(200).json({
            message: "Post uploaded successfully!",
            post: {
                userId: userId,
                content: content
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- PUT: Likes the post of the other --- */
export const likePost = async (req, res) => {
    try {
        const _id = req.body._id;
        const userId = req.user._id;

        // 1. Validate
        if (!_id) {
            return res.status(404).json({
                message: "Can't find the post"
            })
        } 

        // 2. Creating Like relation
        const like = await LikeModel.create({
            postId: _id,
            userId
        })

        // 3. Push like ID into post.likes
        const post = await PostModel.findByIdAndUpdate(
            _id, 
            { $addToSet: { likes: like._id } }, 
            { new: true }
        )
        
        if (!post) {
            return res.status(404).json({
                message: "Can not find the post"
            })
        }

        // 4. Send response with like counts
        return res.status(200).json({
            message: "Post liked",
            likesCount: post.likes.length
        })

    } catch (error) {
        // 5. Duplicate like
        if (error.code === 11000) {
        return res.status(409).json({
            message: "Post already liked"
        });

        }
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- DELETE: Remove the like from the post by current user --- */
export const unlikePost = async (req, res) => {
    try {
        const _id = req.params.id;
        const userId = req.user._id;

        // 1. Validate
        if (!_id) {
            return res.status(404).json({
                message: "Can't find the post"
            })
        } 

        // 2. Removing relation
        const like = await LikeModel.findOneAndDelete({
            postId: _id,
            userId
        })

        if (!like) {
            res.status(404).json({
                message: "Like not found"
            })
        }

        // 3. Push like ID into post.likes
        const post = await PostModel.findByIdAndUpdate(
            _id, 
            { $pull: { likes: like._id } }, 
            { new: true }
        )
        
        if (!post) {
            return res.status(404).json({
                message: "Can not find the post"
            })
        }

        // 4. Sent success response
        return res.status(200).json({
            message: "Post unliked",
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- POST: Post comment by the current user --- */
export const commentPost = async (req, res) => {
    try {
        const {postId, text} = req.body;
        const userId = req.user._id;

        // 1. Validate
        if (!postId || !text) {
            return res.status(404).json({
                message: "Can't find comment"
            })
        }

        // 2. Creating comments data
        const comment = await CommentModel.create({ postId, userId, text });

        if (!comment) {
            return res.status(400).json({
                message: "Can't write comment"
            })
        }

        // 3. Updating comments count in post model
        const user = await PostModel.findByIdAndUpdate(postId, {$addToSet: {comments: comment._id}});

        if (!user) {
            return res.status(404).json({
                message: "Can't find user"
            })
        }

        // 4. Send success response
        return res.status(200).json({
            message: "Comment posted successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- GET: Get all the comments of post --- */
export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id; 

        // 1. Validate
        if (!postId) {
            return res.status(404).json({
                message: "Can't find post"
            })
        }
        
        // 2. Find all comments
        const comments = await CommentModel.find({ postId })
                                           .sort({createdAt: -1});

        // 3. Check for comments
        if (comments.length === 0) {
            return res.status(200).json({
                message: "No comments on post",
                data: []
            })
        }

        // 4. Send response with comments
        return res.status(200).json({
            message: "Comment posted successfully!",
            data: comments
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- GET: Get the feed of the current user --- */
export const getFeed = async (req, res) => {
    try {
        const {_id: userId} = req.user;
        
        // 1. Find posts and likes
        const posts = await PostModel.find({ userId })
                                     .sort({ createdAt: -1 });
        const likes = await LikeModel.find({ userId });

        // 2. Ckeck for posts
        if (posts.length === 0) {
            return res.status(200).json({
                message: "No post found",
                data: []
            });
        }
        
        // 3. Send response with data of posts and likes
        return res.status(200).json({
            message: "Posts fetched successfully",
            data: posts,
            liked: likes
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

/* --- GET: Get posts of all other users --- */
export const getOthersFeed = async (req, res) => {
    try {
        const {_id: userId} = req.user;
        
        // 1. Find posts and likes of others
        const posts = await PostModel.find({ userId: { $ne: userId } })
                                     .sort({ createdAt: -1 });
        const likes = await LikeModel.find({ userId });

        // 2. Check for posts
        if (posts.length === 0) {
            return res.status(200).json({
                message: "No post found",
                data: []
            });
        }
        
        // 3. Send respose with data of posts and likes
        return res.status(200).json({
            message: "Posts fetched successfully",
            data: posts,
            liked: likes
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}