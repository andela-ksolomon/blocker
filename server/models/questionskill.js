'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionSkill = sequelize.define('QuestionSkill', {
    questionID: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return QuestionSkill;
};