'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Answer should belong to a question'
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Answer should be posted by a user'
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Answer cannot be empty'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Answer.belongsTo(models.User, {
          foreighKey: 'UserId',
          onDelete: 'CASCADE'
        });
        Answer.hasMany(models.Vote, {
          foreignKey: 'id',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Answer;
};
