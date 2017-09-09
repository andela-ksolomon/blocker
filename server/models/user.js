'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your fullname is required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exist'
      },
      validate:{
        is: {
          args: /\w+/g,
          msg: 'Please provide a valid username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exist'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: 'Password should have a minimum of 6 characters'
        }
      }
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Question, {
          foreignKey: 'authorId'
        });
        User.hasMany(models.Vote, {
          foreignKey: 'userId'
        });
        User.belongsToMany(models.Skill, {
          through: 'UserSkill'
        });
      }
    }
  });
  return User;
};
