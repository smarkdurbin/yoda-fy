'use strict';
var musixmatch = require('../../app/controllers/musixmatch.server.controller');
	
module.exports = function(app) {
	
	app.get('/musixmatch/search/:query', musixmatch.search);
	app.get('/musixmatch/lyrics/:track_id', musixmatch.lyrics);
};