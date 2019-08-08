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

// Default route, to help new users know they've installed correctly.
module.exports = function(app) {
	var server = app.server;

	// Default index page
	server.route({
		method: 'GET',
		path: '/',
		handler: function(request, reply) {
			return reply('Qa11y-webservice está ok.  Repo https://github.com/GuillermoAlex/qa11y-webservice').code(200);
		}
	});
};
