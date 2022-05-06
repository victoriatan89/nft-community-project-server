import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByEmail = (email) => usersModel.findOne({email});
export const findUserByCredentials = (email, password) => usersModel.findOne({email, password});
export const findUserPublicInfoById = (id) => usersModel.findById(id, {
    watchlist: 1, following: 1, followers: 1, avatar: 1, banner: 1, name: 1, handle: 1, isVerified: 1, joinedDate: 1, bio: 1, website: 1, _id: 0
})
export const findMostRecentUsers = () => usersModel.find().sort({joinedDate: -1}).limit(5);

export const createUser = (user) => usersModel.create(user);
export const updateUser = (id, user) => usersModel.updateOne({_id: id}, {$set: user});
export const deleteUser = (id) => usersModel.deleteOne({_id: id});

export const insertCollectionToWatchlist = (id, collection) => usersModel.updateOne({_id: id}, {$addToSet: {watchlist: collection}});
export const deleteCollectionFromWatchlist = (id, collection) => usersModel.updateOne({_id: id}, {$pull: {watchlist: collection}});
export const followUser = async (id1, user1, id2, user2) => {
    const response1 = await usersModel.updateOne({_id: id1}, {$addToSet: {following: user2}});
    const response2 = await usersModel.updateOne({_id: id2}, {$addToSet: {followers: user1}});
    return {response1, response2};
}
export const unfollowUser = async (id1, id2) => {
    const response1 = await usersModel.updateOne({_id: id1}, {$pull: {following: {userId: id2}}});
    const response2 = await usersModel.updateOne({_id: id2}, {$pull: {followers: {userId: id1}}});
    return {response1, response2};
}
