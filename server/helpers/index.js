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
  }
};