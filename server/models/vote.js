'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    answerId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    voteType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Vote.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Vote.belongsTo(models.Answer, {
          foreignKey: 'answerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Vote;
};