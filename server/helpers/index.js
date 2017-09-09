import db from '../models';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
const key = process.env.SECRET_KEY;
export default {
    /**
   * createToken - create a new token for the user
   * @param  {object} user containing the user's data
   * @return {String} token JWT token generated
   */
  createToken(user) {
    const token = jwt.sign({
      user
    },
      key, {
        expiresIn: 4000
      });
    return token;
  },
    /**
   * getErrors - gets all errors
   * @param  {Array} errors an array of errors
   * @return {Object} returns object with errors
   */
  getErrors(errors) {
    const allErrors = [];
    errors.forEach((error) => {
      const errorMessage = error.msg;
      allErrors.push(errorMessage);
    });
    return allErrors;
  },

  passwordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
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
          'points',
        ]
      }
    ];
    return query;
  }
};
