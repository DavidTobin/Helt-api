module.exports = (function (AboutController) {
	return [
		{
			type: 'get',
			url: '/about',
			func: AboutController.index
		}
	]
})(
	require('../controller/AboutController')
);