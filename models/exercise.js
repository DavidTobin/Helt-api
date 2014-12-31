"use strict";

module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define("Exercise", {
    calories: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        models.Exercise.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  return Exercise;
};
