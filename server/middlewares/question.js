
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
        const userQuery = req.query.query;
        const searchArray =
           userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
        const limit = req.query.limit;
        const offset = req.query.offset || 0;
        const documentOrder = req.query.documentOrder;
        const order =
           documentOrder && documentOrder === 'ASC' ? documentOrder : 'DESC';
    
        if (limit && (limit < 0 || !/^([1-9]\d*|0)$/.test(limit))) {
          return res.status(400)
             .send({
               message: 'Only positive number is allowed for limit value'
             });
        }
        if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
          return res.status(400)
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
        if (`${req.baseUrl}${req.route.path}` === '/questions/search') {
            if (!req.query.query) {
                return res.status(400)
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
            if (!req.query.limit) {
                query.limit = 10;
            }
          }
          req.searchFilter = query;
          next();
    }
}