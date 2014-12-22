module.exports = (function () {
  return {
    create: {
      resources: {
        name: {
          isRequired: true
        },

        email: {
          isRequired: true,
          isEmail: true
        },

        password: {
          isRequired: true
        }
      }
    }
  }
})();
