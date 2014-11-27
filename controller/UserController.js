module.exports = (function (db) {
	'use strict';

	var UserController =  {
		_sendError: function (err) {
			return this.json(400, {
				error: err
			});
		},

		_createUser: function (req, res, next) {
			db.User.build(req.body)
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

		_updateUser: function (req, res, next) {
			this
				.updateAttributes(req.body)
				.success(function (user) {
					return res.json(user);
				});
		},

		API: {
      read: function (req, res, next) {
        if (parseInt(req.params.id) > 0) {
          db.User
            .find(req.params.id)
            .success(function (user) {
              if (!user) {
                return UserController._sendError.bind(res)('User not found');
              }

              return res.json(user);
            });
        } else {
          return UserController._sendError.bind(res)('Missing parameter: id');
        }
      },

			create: function (req, res, next) {
				if (req.user) {
					return UserController._sendError.bind(res)('You are already logged in');
				}

        if (!req.body.name || !req.body.email) {
          return UserController._sendError.bind(res)('Missing required parameter');
        }

				return UserController._createUser(req, res, next);
			},

			update: function (req, res, next) {
				db.User
					.find(req.params.id)
					.success(function (user) {
						if (!user) {
							return UserController._sendError.bind(res)('User not found');
						}

						return UserController._updateUser.bind(user)(req, res, next);
					});
			}
		}
	};

	return UserController.API;
})(
	require('../models')
);
