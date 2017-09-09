'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'The name of skill is required'
      }
     }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Skill.belongsToMany(models.User, {
          through: models.UserSkill
        });
        Skill.belongsToMany(models.Question, {
          through: models.QuestionSkill
        });
      }
    }
  });
  return Skill;
};
