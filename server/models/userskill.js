'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserSkill = sequelize.define('UserSkill', {
    userID: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserSkill;
};