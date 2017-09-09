import bcrypt from 'bcryptjs';
import omit from 'lodash/omit';
import { User } from '../models/';
import Helpers from '../helpers';

const UserController = {
  create(req, res) {
    const password = Helpers.passwordHash(req.body.password);
    console.log(req.body);
    return User.create({
        password,
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
      })
      .then((user) => {
        const token = Helpers.createToken(user);
        const filteredData = omit(user.dataValues, [
          'password',
        ]);
        return res.status(200)
          .send({
            message: 'User was created Successfully',
            user: filteredData,
            token
          });
      })
      .catch(error =>
        res.status(400)
        .send('error'));
  },

  login(req, res) {
    User.findOne({
      where: { username: req.body.username }
    })
    .then((user) => {
      user
      .update(
        {
          isActive: true,
        }).then((result) => {
          const token = Helpers.createToken(result);
          const filteredData = omit(result.dataValues, [
            'password',
          ]);
          res.status(200)
          .json({
            success: true,
            message: 'Logged In Successfully',
            token,
            user: filteredData
          });
        });
    });
  },

  logout(req, res) {
    const userId = req.decoded.user.id;
    User.findById(userId).then((user) => {
      user
      .update(
        {
          active: false,
        }).then(() => {
          return res.status(200)
          .send({
            success: true,
            message: 'You have successfully logged out'
          });
        });
    })
    .catch(error =>
        res.status(400)
        .send(error));
  },

}

export default UserController;
