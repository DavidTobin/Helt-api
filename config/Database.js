module.exports = (function () {
	'use strict';

	return {
	  development: {
	    username: 'postgres',
	    password: 'admin',
	    database: 'helt_devbase',
	    host: '127.0.0.1',
	    dialect: 'postgres',
	    logging: false,
	    omitNull: true,

	    paranoid: true,

	    sync: {
	    	force: true
	    },

	    defaultUsers: [
	    	{
		    	name: 'David Tobin',
		    	email: 'dtobin08@gmail.com',
		    	password: 'admin',
		    	gymId: 1,
		    	gender: 'male',
		    	height: 180,
		    	age: 22,
		    	weight: 200,
		    	weightGoal: -2,
		    	energyExpenditure: 1.2,
		    	roles: ['admin']
	    	},

	    	{
	    		name: 'John Doe',
		    	email: 'john@gmail.com',
		    	password: 'admin',
		    	gymId: 1,
		    	gender: 'male',
		    	height: 180,
		    	age: 22,
		    	weight: 200,
		    	weightGoal: -2,
		    	energyExpenditure: 1.2,
		    	roles: ['user']
	    	}
	    ],

	    defaultGym: {
	    	name: 'Educogym Blackrock'
	    }
	  },

	  test: {
	    username: 'postgres',
	    password: 'admin',
	    database: 'helt_devbase',
	    host: '127.0.0.1',
	    dialect: 'postgres'
	  },

	  production: {
	    username: 'postgres',
	    password: 'admin',
	    database: 'helt_prodbase',
	  	host: '127.0.0.1',
	    dialect: 'postgres'
	  }
	};
})();