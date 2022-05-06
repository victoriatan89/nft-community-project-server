import * as userDao from "../database/users/users-dao.js";

const signup = async (req, res) => {
    const credentials = req.body;
    const existingUser = await userDao.findUserByEmail(credentials.email)
    if (existingUser) {
        return res.sendStatus(403)
    } else {
        const newUser = await userDao.createUser(credentials)
        req.session['profile'] = newUser
        res.json(newUser)
    }
}

const login = async (req, res) => {
    const credentials = req.body;
    const profile = await userDao.findUserByCredentials(credentials.email, credentials.password)
    if (profile) {
        req.session['profile'] = profile;
        res.json(profile);
        return;
    }
    res.sendStatus(403);
}

const profile = (req, res) => {
    const profile = req.session['profile']
    if (profile) {
        res.json(profile);
    } else {
        res.sendStatus(503);
    }
}

const editProfile = async (req, res) => {
    const newProfile = req.body
    const userId = req.params['id']
    const response = await userDao.updateUser(userId, newProfile);
    if (response.modifiedCount > 0) {
        req.session['profile'] = newProfile;
        res.json(newProfile);
        return;
    }
    res.sendStatus(503);
}

const insertCollectionToWatchlist = async (req, res) => {
    const userId = req.params['id'];
    const collection = req.body;
    const response = await userDao.insertCollectionToWatchlist(userId, collection);
    if (response.modifiedCount > 0) {
        const newProfile = await userDao.findUserById(userId);
        req.session['profile'] = newProfile;
        res.json(newProfile);
        return;
    }
    res.sendStatus(503);
}

const deleteCollectionFromWatchlist = async (req, res) => {
    const userId = req.params['id'];
    const collection = req.body;
    const response = await userDao.deleteCollectionFromWatchlist(userId, collection);
    if (response.modifiedCount > 0) {
        const newProfile = await userDao.findUserById(userId);
        req.session['profile'] = newProfile;
        res.json(newProfile);
        return;
    }
    res.sendStatus(503);
}

const followUser = async (req, res) => {
    const id1 = req.params['id1'];
    const id2 = req.params['id2'];
    const {user1, user2} = req.body;
    const {response1, response2} = await userDao.followUser(id1, user1, id2, user2);
    if (response1.modifiedCount > 0 && response2.modifiedCount > 0) {
        const newProfile = await userDao.findUserById(id1);
        req.session['profile'] = newProfile;
        res.json(newProfile);
        return;
    }
    res.sendStatus(503);
}

const unfollowUser = async (req, res) => {
    const id1 = req.params['id1'];
    const id2 = req.params['id2'];
    const {response1, response2} = await userDao.unfollowUser(id1, id2);
    if (response1.modifiedCount > 0 && response2.modifiedCount > 0) {
        const newProfile = await userDao.findUserById(id1);
        req.session['profile'] = newProfile;
        res.json(newProfile);
        return;
    }
    res.sendStatus(503);
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/signup', signup);
    app.post('/api/profile', profile);
    app.put('/api/profile/:id', editProfile);
    app.put('/api/profile/:id/watchlist/add', insertCollectionToWatchlist);
    app.put('/api/profile/:id/watchlist/delete', deleteCollectionFromWatchlist);
    app.put('/api/profile/:id1/follow/:id2', followUser);
    app.put('/api/profile/:id1/unfollow/:id2', unfollowUser);
    app.post('/api/signin', login);
    app.post('/api/logout', logout);
}