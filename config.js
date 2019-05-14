// This file is part of Pa11y Webservice.
//
// Pa11y Webservice is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pa11y Webservice is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pa11y Webservice.  If not, see <http://www.gnu.org/licenses/>.
'use strict';

var fs = require('fs');
var jsonPath = './config/' + (process.env.NODE_ENV || 'development') + '.json';

if (fs.existsSync(jsonPath)) {
	module.exports = require(jsonPath);
} else {
	module.exports = {
		database: env('DATABASE', 'mongodb://qa11ywebservicebd:b51010786d405f6b7c58b1044392283c@dokku-mongo-qa11ywebservicebd:27017/qa11ywebservicebd'),
		host: env('HOST', '0.0.0.0'),
		port: Number(env('PORT', '5000')),
		cron: env('CRON', false)
	};
}

function env(name, defaultValue) {
	var value = process.env[name];
	return (typeof value === 'string' ? value : defaultValue);
}
