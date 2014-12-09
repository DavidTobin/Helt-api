module.exports = (function (AboutController) {
	return [
		{
			type: 'get',
			url: '/',
			func: AboutController.index
		}
	]
})(
	require('../controller/AboutController')
);