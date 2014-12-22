/* global require, module */

module.exports = (function (_, db, Controller) {
	'use strict';

	var UserController =  _.extend({}, Controller, {
		_createUser: function (req, res) {
			var user = db.User.build(req.body);

      if (!user.validate()) {
        this._error.bind(res)(user.validate());
      }

      user
			.save()
			.success(function (user) {
				return res.json(user);
			})
      .error(function (err) {
        return res.json(400, {
          error: err
        });
      });
		},

		_updateUser: function (req, res) {
			this
				.updateAttributes(req.body)
				.success(function (user) {
					return res.json(user);
				})
        .error(function (err) {
          return this._error.bind(res)(err);
        });
		},

		API: function () {
      var $super = this;

      return {
        read: function (req, res) {
          if (parseInt(req.params.id) > 0) {
            db.User
              .find(req.params.id)
              .success(function (user) {
                if (!user) {
                  return $super._error.bind(res)('User not found');
                }

                return res.json(user);
              });
          } else {
            return $super._error.bind(res)('Missing parameter: id');
          }
        },

        readAll: function (req, res) {
        	db.User
        		.findAll()
        		.success(function (users) {
        			return res.json(users);
        		})
        		.error(function (error) {
        			return $super._error.bind(res)(error);
        		});
        },

  			create: function (req, res, next) {
  				if (req.user) {
  					return $super._error.bind(res)('You are already logged in');
  				}

  				return $super._createUser(req, res, next);
  			},

  			update: function (req, res, next) {
          // Make sure roles aren't updated
          if (req.body.roles && !req.user.isSuperUser()) {
          	req.body.roles = req.user.roles;
          }

  				db.User
  					.find(req.params.id)
  					.success(function (user) {
  						if (!user) {
  							return $super._error.bind(res)('User not found');
  						}

  						return $super._updateUser.bind(user)(req, res, next);
  					}.bind(this))
            .error(function (err) {
              return $super._error.bind(res)(err);
            }.bind(this));
  			}
      };
		}
	});

	return UserController.API.bind(UserController)();
})(
  require('underscore'),
	require('../models'),
  require('./Controller')
);
