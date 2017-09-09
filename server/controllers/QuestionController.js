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
            return res.status(400).send({
              message: 'Question should be an integer'
            });
          }
        db.Question.findById(id)
        .then((question) => {
            console.log(question)
            if (!question) {
                return res.status(404)
                .send(
                  {
                    success: false,
                    message: 'Question Not found'
                  }
                );
              }
            return response.status(200)
            .send(
              {
                question
              });
        })
        .catch((error) => res.status(400).send({
            error,
            message: 'Error occurred while retrieving documents'
          }))
    },
    delete(request, response) {
        const { id } = request.params.id;
        db.findById(id)
        .then((question) => {
            if(!question) {
                return res.status(404).send({
                    message: 'Question not found'
                  });
            }
            if(req.decoded.id !== question.authorId) {
                return res.status(403).send({
                    message: 'You are not allow to delete this document'
                  });
            }
            question.destroy(
                {
                  where: {
                    id
                  }
                })
                .then(() => res.status(200)
                .send(
                {
                  message: 'Question was deleted successfully'
                }
                ));
        })
        .catch((error) => res.status(400).send({
            error,
            message: 'Error occurred while deleting documents'
          }))
    },
    edit(request, response) {
        const { id } = request.params.id;
        db.findById(id)
        .then((question) => {
            if(!question) {
                return res.status(404).send({
                    message: 'Question not found'
                  });
            }
            if(req.decoded.id !== question.authorId) {
                return res.status(403).send({
                    message: 'You are not allow to delete this document'
                  });
            }
            question.update(request.body)
                .then(() => res.status(200)
                .send(
                {
                  message: 'Question was updated successfully'
                }
                ));
        })
        .catch((error) => res.status(400).send({
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
    db.Document
      .findAndCountAll(req.searchFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.searchFilter.limit,
          offset: req.searchFilter.offset
        };
        delete documents.count;
        const pagination = Helpers.pagination(condition);
        let message;
        if (documents.rows.length === 0) {
          message = 'Document not Found';
        } else {
          message = 'Your search was successful';
        }
        res.status(200)
          .send({
            message,
            documents,
            pagination
          });
      });
  },
}