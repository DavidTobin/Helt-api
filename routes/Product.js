module.exports = (function (ProductController) {
  console.log(ProductController);
  return [
    {
      type: 'get',
      url: '/product',
      func: ProductController.readAll,
      // roles: ['isSuperUser']
    }
  ];
})(
  require('../controller/ProductController')
);
