import db from '../models';
import Helpers from '../helpers';

export default {
    fetchAll(request, response) {
        const requestQuery = Helpers.createQueryForList(request);
        let condition = {};
        let pagination;
        db.Question
        .findAndCountAll(requestQuery)
        .then((question) => {
          if (question.length === 0) {
            return response.status(404).send({
              message: 'No Question was Not Found',
            });
          }
          condition = {
            count: question.count,
            limit: requestQuery.limit,
            offset: requestQuery.offset
          };
          delete question.count;
          pagination = Helpers.pagination(condition);
          return response.status(200)
          .send({
            question,
            pagination,
            message: 'questions was retrieved successfully'
          });
        })
        .catch(error => response.status(400).send({
          error,
          message: 'Error occurred while retrieving questions'
        }));
    },
    create(request, response) {
        request.body.authorId = request.decoded.user.id
        db.Question.create(request.body)
         .then((question) => {
            response.status(200)
            .send({
              success: true,
              question,
              message: 'Your question was created successfully'
            });
         })
         .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while saving data'
          }));
    },
    fetchOne(request, response) {
        const { id } = request.params
        if (isNaN(id)) {
            return response.status(400).send({
              message: 'Question should be an integer'
            });
          }
        db.Question.findOne({
          where: {
            id
          },
          include: [{
            model: db.User,
            attributes: [
              'id',
              'username',
              'fullname',
              'email',
              'points'
            ]
          }]
        })
        .then((question) => {
            if (!question) {
                return response.status(404)
                .send(
                  {
                    success: false,
                    message: 'Question Not found'
                  }
                );
              }
              question.getAnswers()
              .then((answer) => {
                const allAnswers = answer;
                return response.status(200)
                .send(
                  {
                    question,
                    allAnswers
                  });
              });
        })
        .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while retrieving documents'
          }))
    },
    delete(request, response) {
        const { id } = request.params;
        db.Question.findById(id)
        .then((question) => {
            if(!question) {
                return response.status(404).send({
                    message: 'Question not found'
                  });
            }
            if(request.decoded.user.id !== question.authorId) {
                return response.status(403).send({
                    message: 'You are not allow to delete this document'
                  });
            }
            question.destroy(
                {
                  where: {
                    id
                  }
                })
                .then(() => response.status(200)
                .send(
                {
                  message: 'Question was deleted successfully'
                }
                ));
        })
        .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while deleting documents'
          }))
    },
    edit(request, response) {
        const { id } = request.params;
        db.Question.findById(id)
        .then((question) => {
            if(!question) {
                return response.status(404).send({
                    message: 'Question not found'
                  });
            }
            if(request.decoded.user.id !== question.authorId) {
                return response.status(403).send({
                    message: 'You are not allow to delete this document'
                  });
            }
            question.update(request.body)
                .then(() => response.status(200)
                .send(
                {
                  message: 'Question was updated successfully'
                }
                ));
        })
        .catch((error) => response.status(400).send({
            error,
            message: 'Error occurred while deleting documents'
          }))
    },
    /**
    * Search document
    * Route: GET: /searchs?query={}
    * @param {Object} req request object
    * @param {Object} res response object
    */
  search(req, res) {
    req.searchFilter.attributes = [
      'id',
      'title',
      'body',
      'answerId',
      'authorId',
      'createdAt',
      'updatedAt'
    ];
    db.Question
      .findAndCountAll(req.searchFilter)
      .then((questions) => {
        const condition = {
          count: questions.count,
          limit: req.searchFilter.limit,
          offset: req.searchFilter.offset
        };
        delete questions.count;
        const pagination = Helpers.pagination(condition);
        let message;
        if (questions.rows.length === 0) {
          message = 'Document not Found';
        } else {
          message = 'Your search was successful';
        }
        res.status(200)
          .send({
            message,
            questions,
            pagination
          });
      });
  },
}