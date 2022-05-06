import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: '/images/placeholder-avatar.png'},
    banner: {type: String, default: '/images/placeholder-banner.png'},
    name: String,
    handle: String,
    role: String,
    bio: String,
    location: String,
    website: String,
    dob: Date,
    isVerified: {type: Boolean, default: false},
    joinedDate: {type: Date, default: Date.now()},
    watchlist: {type: Array, default: []},
    following: {
        type: [{
            avatar: String,
            username: String,
            isVerified: Boolean,
            handle: String,
            userId: mongoose.Types.ObjectId,
            followedAt: Date,
        }]
    },
    followers: {
        type: [{
            avatar: String,
            username: String,
            isVerified: Boolean,
            handle: String,
            userId: mongoose.Types.ObjectId,
            followedAt: Date,
        }]
    }
}, {collection: 'users'});

export default usersSchema;