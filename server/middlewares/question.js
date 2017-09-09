
export default {
    validate(request, response, next) {
        const { title, body } = request.body;
        if(!title || title.length < 5) {
            return response.status(401)
            .send({
                message: 'Title should have a minmum of 5 characters'
            });
        }
        if(!body || body.length < 5) {
            return response.status(401)
            .send({
                message: 'Question body should have a minmum of 5 characters'
            });
        }
        next();
    },
    validateSearch(request, response, next) {
        const query = {};
        const terms = [];
        const userQuery = request.query.query;
        const searchArray =
           userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
        const limit = request.query.limit || 10;
        const offset = request.query.offset || 0;
        const documentOrder = request.query.documentOrder;
        const order =
           documentOrder && documentOrder === 'ASC' ? documentOrder : 'DESC';
    
        if (limit && (limit < 0 || !/^([1-9]\d*|0)$/.test(limit))) {
          return response.status(400)
             .send({
               message: 'Only positive number is allowed for limit value'
             });
        }
        if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
          return response.status(400)
             .send({
               message: 'Only positive number is allowed for offset value'
             });
        }
    
        if (searchArray) {
          searchArray.forEach((word) => {
            terms.push(`%${word}%`);
          });
        }
        query.limit = limit;
        query.offset = offset;
        query.order = [['createdAt', order]];
        if (`${request.baseUrl}${request.route.path}` === '/questions/search') {
            if (!request.query.query) {
                return response.status(400)
                   .send({
                     message: 'Please enter a search query'
                   });
              }
            query.where = {
                $and: [
                    {
                        $or:
                        [
                          { title: { $iLike: { $any: terms } } },
                          { body: { $iLike: { $any: terms } } }
                        ]
                      }
                ]
            };
            query.include = [
              {
                model: db.User,
                attributes: [
                  'id',
                  'username',
                  'fullname',
                  'email',
                  'points'
                ]
              }
            ];
          }
          request.searchFilter = query;
          next();
    }
}