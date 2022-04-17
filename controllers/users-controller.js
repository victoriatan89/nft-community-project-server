const users = [];

const register = (req, res) => {
    const credentials = req.body;
    users.push(credentials);
    res.json(credentials);
}

const login = (req, res) => {}
const logout = (req, res) => {}
const viewProfile = (req, res) => {}

export default (app) => {
    app.post('/api/user/register', register);
}