'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Title is required'
      },
      validate: {
        min: {
          args: 5,
          msg: 'Title should have a minimum of 5 characters'
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Content is required'
      },
      validate: {
        min: {
          args: 5,
          msg: 'Content should have a minimum of 5 characters'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Questionnaire cannot be empty'
      }
    },
    answerId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Question.belongsTo(models.User, {
          foreignKey: 'authorId',
          onDelete: 'CASCADE',
        });
        Question.belongsToMany(models.Skill, {
          through: 'QuestionSkill'
        });
      }
    }
  });
  return Question;
};