import express from 'express';
import UserController from '../controllers/UserController';
import Authenticate from '../middlewares/Authentication';

const app = express.Router();

//start logic
//end logic
app.route('/')
.post(Authenticate.validateInput, UserController.create);

app.route('/login')
.post(Authenticate.authenticate, UserController.login);

app.route('/logout')
.post(Authenticate.verifyUser, Authenticate.isLoggedIn, UserController.logout);

export default app;
