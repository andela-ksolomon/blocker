'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    posterId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Poster cannot be empty'
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Answer should belong to a question'
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
          foreighKey: 'posterId',
          onDelete: 'CASCADE'
        });
        Answer.hasMany(models.Vote, {
          foreignKey: 'answerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Answer;
};