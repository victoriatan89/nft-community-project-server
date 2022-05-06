import * as postsDao from "../database/posts/posts-dao.js";

const getPostsBySlug = async (req, res) => {
    const slug = req.params['slug'];
    const posts = await postsDao.getPostsBySlug(slug);
    res.json(posts)
}

const getPostsByUserId = async (req, res) => {
    const uid = req.params['uid'];
    const posts = await postsDao.getPostsByUserId(uid);
    res.json(posts);
}

const getMostRecentPosts = async (req, res) => {
    const posts = await postsDao.getMostRecentPosts();
    res.json(posts);
}

const createPost = async (req, res) => {
    const newPost = req.body;
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost);
}

const updatePost = async (req, res) => {
    const pid = req.params['id'];
    const post = req.body;
    const response = await postsDao.updatePost(pid, post);
    if (response.modifiedCount > 0) {
        res.sendStatus(200);
    } else {
        res.sendStatus(503);
    }
}

const addReply = async (req, res) => {
    const pid = req.params['id'];
    const reply = req.body;
    const response = await postsDao.addReply(pid, reply);
    if (response.modifiedCount > 0) {
        res.sendStatus(200);
    } else {
        res.sendStatus(503);
    }
}

export default (app) => {
    app.get('/api/posts/:slug', getPostsBySlug);
    app.get('/api/posts/user/:uid', getPostsByUserId);
    app.get('/api/posts/most/recent', getMostRecentPosts);
    app.post('/api/posts', createPost);
    app.put('/api/posts/:id', updatePost);
    app.put('/api/posts/:id/reply', addReply);
}