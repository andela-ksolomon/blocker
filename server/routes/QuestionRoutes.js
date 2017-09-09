import express from 'express';
import Questions from '../middlewares/question';
import Authentication from '../middlewares/Authentication';
import QuestionController from '../controllers/QuestionController';

const app = express.Router();

app.route('/')
    .get(Authentication.isLoggedIn, QuestionController.fetchAll)
    .post(Authentication.isLoggedIn, Questions.validate, QuestionController.create);
app.route('/search')
    .get(Authentication.isLoggedIn, Questions.validateSearch, QuestionController.search);
app.route('/:id')
    .get(Authentication.isLoggedIn, QuestionController.fetchOne)
    .delete(Authentication.isLoggedIn, QuestionController.delete)
    .put(Authentication.isLoggedIn, QuestionController.edit);
    
//end logic
export default app;
