
import db from '../models';

export default {
    /**
   * Pagination
   * @param {Object} condition pagination condition
   * @returns {Object} return an object
   */
  pagination(condition) {
    const next = Math.ceil(condition.count / condition.limit);
    const currentPage = Math.floor((condition.offset / condition.limit) + 1);
    const pageSize = condition.limit > condition.count
      ? condition.count : condition.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: condition.count
    };
  },
  createQueryForList(req) {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    const query = {};
    query.limit = limit;
    query.offset = offset;
    query.order = 'id DESC';
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
    return query;
  },
}