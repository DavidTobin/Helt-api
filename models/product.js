"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    time: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Product;
};
