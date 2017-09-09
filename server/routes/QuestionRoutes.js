import express from 'express';
import Questions from '../middlewares/question';
import QuestionController from '../controllers/QuestionController';

const app = express.Router();

app.route('/')
    .get(QuestionController.fetchAll)
    .post(Questions.validate, QuestionController.create);
app.route('/:id')
.get(QuestionController.fetchOne)
.delete(QuestionController.delete)
.put(QuestionController.edit);

app.route('/search')
    .get(Questions.validateSearch, QuestionController.search);
//end logic
export default app;
