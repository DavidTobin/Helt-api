module.exports = (function (UserController, Validators) {
	return [
		{
			type: 'get',
			url: '/user',
			func: UserController.readAll,
			roles: ['isSuperUser']
		},

    {
      type: 'get',
      url: '/user/:id',
      func: UserController.read,
      roles: ['self']
    },

		{
			type: 'post',
			url: '/user',
			func: UserController.create,
      validator: Validators.user.create
		},

		{
			type: 'put',
			url: '/user/:id',
			func: UserController.update,
      roles: ['self']
		}
	];
})(
	require('../controller/UserController'),
  require('../validators')
);
