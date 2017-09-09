import db from '../models';
import Helpers from '../helpers';

export default {
    create(request, response) {
        const questionId = +request.params.questionId;
        const UserId = +request.decoded.user.id
        const {
            content
        } = request.body;
        console.log(typeof questionId, typeof UserId, '=========>')
        db.Answer.create({
            questionId,
            UserId,
            content
        }).then((answer) => {
            response.status(200)
            .send({
              success: true,
              answer,
              message: 'Your answer has been posted successfully'
            });
        }).catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while posting answer'
          }));
    },
    fetchAnswers(request, response) {
        const { questionId } = request.params
        db.Answer.findAll({
            where: {
                questionId
            }
        }).then((answer) => {
            return response.status(200)
            .send({
                questionId,
                answers
              });
        })
        .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while fetching answer'
          }));
    },
    deleteAnswer(request, response) {
        const {
            id
        } = request.params.id;
        db.Answer.findById(id)
        .then((answer) => {
            if (request.decoded.user.id !== question.poster) {
                return response.status(403).send({
                    message: 'You are not allow to delete this answer'
                  });
            }
            answer.destroy({
                where: {
                    id
                }
            }).then(() => response.status(200)
                .send(
                {
                message: 'Answer was deleted successfully'
                }
                ));
        })
        .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while fetching answer'
          }));
    }
}