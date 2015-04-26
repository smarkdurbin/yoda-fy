'use strict';
var yodaspeak = require('../../app/controllers/yodaspeak.server.controller');
	
module.exports = function(app) {
	
	app.get('/yodaspeak/translate/:english', yodaspeak.translate);
};