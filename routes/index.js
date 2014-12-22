module.exports = (function (fs) {
  var routes = [];

  // Lazy load all router files
	fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    console.log(require('./' + file));
    routes = routes.concat(require('./' + file));
  });

  return routes;
})(
  require('fs')
);
