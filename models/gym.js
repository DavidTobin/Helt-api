"use strict";

module.exports = function(sequelize, DataTypes) {
  var Gym = sequelize.define("Gym", {
    name: DataTypes.STRING
  }, {
    associate: function(models) {
      models.Gym.belongsTo(models.User);
    }
  });

  return Gym;
};
