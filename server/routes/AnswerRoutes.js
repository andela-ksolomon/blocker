import express from 'express';
import AnswerController from '../controllers/AnswerController';
import Authentication from '../middlewares/Authentication';

const app = express.Router();

//start logic
app.route('/:questionId')
    .get(Authentication.isLoggedIn, AnswerController.fetchAnswers)
    .post(Authentication.isLoggedIn, AnswerController.create)
    .delete(Authentication.isLoggedIn, AnswerController.deleteAnswer);
//end logic
export default app;

