module.exports = (function () {
  'use strict';

  var _ = require('underscore'),
  Controller;

  Controller = {
    _error: function (error) {
      return this.json(400, error);
    },

    API: {}
  }

  return Controller;
})(

);
