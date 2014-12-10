module.exports = (function (_, db, Controller) {
  'use strict';

  var ProductController =  _.extend(Controller, {
    _verify: function (type, body) {
      switch (type) {

      }
    },

    API: {
      readAll: function (req, res) {
        db.Product
          .findAll()
          .success(function (products) {
            return res.json(products);
          });
      }
    }
  });

  return ProductController.API;
})(
  require('underscore'),
  require('../models'),
  require('./Controller')
);
