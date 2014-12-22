module.exports = (function () {
  return {
    resources: {
      token: {
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
