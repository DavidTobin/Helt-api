module.exports = (function (db) {
	'use strict';

	var UserController =  {
    _verify: function (type, data) {
      switch (type) {
        case 'create':
          return data && data.name && data.email;

        case 'update':
          return data && data.id;
      }
    },

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
				})
        .error(function (err) {
          return UserController._sendError.bind(res)(err);
        });
		},

		API: {
      read: function (req, res, next) {
        if (parseInt(req.params.id) > 0) {
          db.User
            .find(req.params.id)
            .success(function (user) {
              console.log(user);
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

        if (!UserController._verify('create', req.body)) {
          return UserController._sendError.bind(res)('Missing required parameter');
        }

				return UserController._createUser(req, res, next);
			},

			update: function (req, res, next) {
        if (!UserController._verify('update', req.params)) {
          return UserController._sendError.bind(res)('No user to update');
        }

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
