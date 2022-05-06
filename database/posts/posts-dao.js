import postsModel from "./posts-model.js";
import mongoose from "mongoose";

export const getPostsBySlug = async (slug) => await postsModel.find({slug}).sort({createdAt: -1});
export const getPostsByUserId = async (userId) => await postsModel.find({userId: new mongoose.Types.ObjectId(userId)}).sort({createdAt: -1});
export const getMostRecentPosts = async () => await postsModel.find().sort({createdAt: -1}).limit(3);
export const createPost = async (newPost) => await postsModel.create(newPost);
export const updatePost = async (id, post) => await postsModel.updateOne({_id: id}, post);
export const addReply = async (id, reply) => await postsModel.updateOne({_id: id}, {$push: {comments: reply}});
