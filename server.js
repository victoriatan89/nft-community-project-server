import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session';
import usersController from './controllers/users-controller.js'
import rankingsController from "./controllers/nft-controller.js";
import postsController from "./controllers/posts-controller.js";
import authController from "./controllers/auth-controller.js";

const CONNECTION_STRING = "mongodb+srv://victoriatan89:Tanxin1995!@cluster0.nc22t.mongodb.net/nftCommunityProjectDatabase?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING)
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
// use secure cookies in production but allow for testing in development
let sess = {
    secret: 'SECRETO',
    cookie: { secure: false }
};
if (process.env.ENV === 'production') {
    app.set('trust proxy', 1);              // trust first proxy
    sess.cookie.secure = true;              // serve secure cookies, needs HTTPS
}
app.use(session(sess));
app.use(express.json());

app.get('/hello', (req, res) => {res.send('Hello World!')})
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
authController(app);
usersController(app);
rankingsController(app);
postsController(app);
app.listen(4000);