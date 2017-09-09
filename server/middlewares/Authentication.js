import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/';
import helper from '../helpers';

dotenv.config();
const key = process.env.SECRET_KEY;
const Authenticate = {
  /**
   * validateInput - Validates Users Input
   * @param  {object} req request object
   * @param  {type} res  response object
   * @param  {type} next callback function
   * @return {void} void no return
   */
  validateInput(req, res, next) {
    const userNameError = 'Please provide a username with atleast 5 characters.'; //eslint-disable-line
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 5 }],
            errorMessage: userNameError
          },
          errorMessage: 'Your Username is required'
        },
        email: {
          notEmpty: true,
          isEmail: {
            errorMessage: 'Provide a valid a Email Address'
          },
          errorMessage: 'Your Email Address is required'
        },
        fullName: {
          notEmpty: true,
          errorMessage: 'Your Fullname is required'
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 8 }],
            errorMessage: 'Provide a valid password with minimum of 8 characters' // eslint-disable-line
          },
          errorMessage: 'Your Password is required'
        }
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const error = helper.getErrors(errors);
      return res.status(409)
      .json({
        message: error[0]
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    req.userData = {
      username: req.body.username,
      fullName: req.body.firstname,
      email: req.body.email,
      password,
    };
    User.findOne(
      {
        where: {
          username: req.body.username,
          $or: {
            email: req.body.email
          }
        }
      }
  )
  .then((user) => {
    if (user) {
      if (user.dataValues.username === req.body.username) {
        return res.status(409)
        .send(
          {
            success: false,
            message: 'Username already exist'
          }
        );
      }
      if (user.dataValues.email === req.body.email) {
        return res.status(409)
      .send(
          {
            success: false,
            message: 'Email Address already exist'
          }
      );
      }
    } else {
      next();
    }
  });
  },
  /**
   * authenticate - authenticate a user
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  authenticate(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          success: false,
          message: 'Please provide your username or password to login'
        });
    }
    User.findOne(
      {
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        console.log(user.password);
        console.log(req.body.password);
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              success: false,
              message: 'Invalid Credentials.'
            });
        }
      });
  },
  /**
   * isLoggedIn - checks if a user looged in
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  isLoggedIn(req, res, next) {
    const authorizationHeader = req.headers.authorization ||
    req.headers['x-access-token'];
    let token;
    if (req.headers.authorization) {
      token = authorizationHeader.split(' ')[1];
    } else {
      token = authorizationHeader;
    }
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401)
              .send({
                success: false,
                message: 'Failed to Authenticate Token',
                error
              });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          success: false,
          message: 'Access denied, Authentication token does not exist'
        });
    }
  },

  verifyUser(req, res, next) {
    const secret = process.env.SECRET;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      jwt.verify(bearerHeader, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid token' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).send({
        message: 'Oops! You are not authenticated, Please Log in'
      });
    }
  }
}

export default Authenticate;