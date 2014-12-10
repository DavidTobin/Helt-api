"use strict";

module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define("Subscription", {
    expires: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Subscription.belongsTo(models.Product, {
          foreignKey: 'productId'
        });

        models.Subscription.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  return Subscription;
};
