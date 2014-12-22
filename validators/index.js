module.exports = (function (fs) {
  var validators = {};

  // Lazy load all router files
  fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    validators[file.toLowerCase().replace('.js', '')] = require('./' + file);
  });

  return validators;
})(
  require('fs')
);
