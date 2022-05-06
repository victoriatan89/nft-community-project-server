import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    slug: String,
    tokenAddress: String,
    userId: mongoose.Types.ObjectId,
    avatar: String,
    username: String,
    isVerified: Boolean,
    handle: String,
    post: String,
    comments: {
        type: [{
            avatar: String,
            username: String,
            isVerified: Boolean,
            handle: String,
            userId: mongoose.Types.ObjectId,
            createdAt: Date,
            post: String
        }]
    },
    likedBy: {
        type: [{
            avatar: String,
            username: String,
            isVerified: Boolean,
            handle: String,
            userId: mongoose.Types.ObjectId,
            likedAt: Date,
        }]
    },
    createdAt: {type: Date, default: Date.now}
}, {collection: 'posts'});

export default postsSchema;