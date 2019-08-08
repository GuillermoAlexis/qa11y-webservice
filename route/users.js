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
/* eslint camelcase: 'off' */

'use strict';
var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt");
var _ = require('underscore');
var Joi = require('joi');
var validateAction = require('pa11y').validateAction;

// Routes relating to all tasks
module.exports = function(app) {
	var model = app.model;
	var server = app.server;

	// Create a task
	server.route({
		method: 'POST',
		path: '/users',
		handler: function(request, reply) {
			
			if (request.payload.actions && request.payload.actions.length) {
				for (var action of request.payload.actions) {
					if (!validateAction(action)) {
						return reply({
							statusCode: 400,
							message: 'Invalid action: "' + action + '"'
						}).code(400);
					}
				}
			}
			model.user.create(request.payload, function(error, user) {
				if (error || !user) {
					return reply().code(500);
				}
				reply(user)
					.header('Location', 'http://' + request.info.host + '/users/' + user.id)
					.code(201);
			});
		},
		config: {
			validate: {
				query: {},
				payload: {
					name: Joi.string().required(),
					email: Joi.string().required(),
					password: Joi.string().allow(''),
					headers: [
						Joi.string().allow(''),
						Joi.object().pattern(/.*/, Joi.string().allow(''))
					]
				}
			}
		}
	});

	// Get all user
	server.route({
		method: 'GET',
		path: '/users',
		handler: function(request, reply) {
			model.user.getAll(function(error, users) {
				if (error || !users) {
					return reply().code(500);
				}
				if (request.query.lastres) {
					model.result.getAll({}, function(error, results) {
						if (error || !results) {
							return reply().code(500);
						}
						var resultsByUser = _.groupBy(results, 'user');
						users = users.map(function(user) {
							if (resultsByUser[user.id] && resultsByUser[user.id].length) {
								user.last_result = resultsByUser[user.id][0];
							} else {
								user.last_result = null;
							}
							return user;
						});
						reply(users).code(200);
					});
				} else {
					reply(users).code(200);
				}
			});
		},
		config: {
			validate: {
				query: {
					lastres: Joi.boolean()
				},
				payload: false
			}
		}
	});

	// Get results for all users
	// server.route({
	// 	method: 'GET',
	// 	path: '/users/results',
	// 	handler: function(request, reply) {
	// 		model.result.getAll(request.query, function(error, results) {
	// 			if (error || !results) {
	// 				return reply().code(500);
	// 			}
	// 			reply(results).code(200);
	// 		});
	// 	},
	// 	config: {
	// 		validate: {
	// 			query: {
	// 				from: Joi.string().isoDate(),
	// 				to: Joi.string().isoDate(),
	// 				full: Joi.boolean()
	// 			},
	// 			payload: false
	// 		}
	// 	}
	// });

};
