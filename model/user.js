// This file is part of Qa11y Webservice.
//
// Qa11y Webservice is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Qa11y Webservice is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Qa11y Webservice.  If not, see <http://www.gnu.org/licenses/>.
// Developed by Guillermo Alexis Lemunao Carrasco and Pa11y Guys

// eslint id-length: 'off' 
// eslint no-catch-shadow: 'off' 
// eslint no-underscore-dangle: 'off' 
'use strict';

var async = require('async');
var ObjectID = require('mongodb').ObjectID;

// user model
module.exports = function(app, callback) {
	app.db.collection('users', function(error, collection) {
		collection.ensureIndex({
			name: 1,
			email: 1,
			password: 1,
			date: 1
		}, {
			w: -1
		});
		var model = {

			collection: collection,

			// Create a user
			create: function(newUser, callback) {

				if (!newUser.date) {
					newUser.date = Date.now();
				}

				collection.insert(newUser, function(error, result) {
					if (error) {
						return callback(error);
					}
					callback(null, model.prepareForOutput(result.ops[0]));
				});
			},

			// Prepare a user for output
			prepareForOutput: function(user) {
				var output = {
					id: user._id.toString(),
					name: user.name,
					password: user.password,
					email: user.email
				};

				if (user._id) {
					output._id = user._id;
				}
				if (user.name) {
					output.name = user.name;
				}
				if (user.password) {
					output.password = user.password;
				}
				if (user.email) {
					output.email = user.email;
				}
				if (user.headers) {
					if (typeof user.headers === 'string') {
						try {
							output.headers = JSON.parse(user.headers);
						} catch (error) {}
					} else {
						output.headers = user.headers;
					}
				}
				return output;
			},

			// Get all users
			getAll: function(callback) {
				collection
					.find()
					.sort({
						name: 1,
						email: 1
					})
					.toArray(function(error, users) {
						if (error) {
							return callback(error);
						}
						callback(null, users.map(model.prepareForOutput));
					});
			},

		};
		callback(error, model);
	});
};
