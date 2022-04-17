import express from 'express';
import cors from 'cors';
//import session from 'express-session';
import usersController from './controllers/users-controller.js'
import rankingsController from "./controllers/nft-controller.js";

const app = express();
app.use(cors());
app.use(express.json());
// use secure cookies in production but allow for testing in development
/*let sess = {
    secret: process.env.SECRET,
    cookie: { secure: false }
};
if (process.env.ENV === 'production') {
    app.set('trust proxy', 1);              // trust first proxy
    sess.cookie.secure = true;              // serve secure cookies, needs HTTPS
}
app.use(session(sess));*/

app.get('/hello', (req, res) => {res.send('Hello World!')})
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
usersController(app)
rankingsController(app)

app.listen(4000);