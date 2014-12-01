"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'Users',
      'roles',
      DataTypes.ARRAY(DataTypes.STRING)
    ).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn(
      'Users',
      'roles'
    ).done(done);
  }
};
