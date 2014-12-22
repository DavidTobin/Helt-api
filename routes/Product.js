module.exports = (function (ProductController) {
  return [
    {
      type: 'get',
      url: '/product',
      func: ProductController.readAll,
      roles: ['isSuperUser']
    }
  ];
})(
  require('../controller/ProductController')
);
