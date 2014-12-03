"use strict";

module.exports = function(sequelize, DataTypes) {
  var Gym = sequelize.define("Gym", {
    name: DataTypes.STRING
  }, {
  	classMethods: {
  		associate: function (models) {
  			models.Gym.hasMany(models.User, {
  				foreignKey: 'gymId'
  			});
  		}
    }
  });

  return Gym;
};
