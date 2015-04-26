'use strict';

var unirest = require('unirest');
		//var config = require('../../config/unirest.config');

exports.search = function(req, res) {
		
	
		var getSongs = unirest.get('https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search');
	
		getSongs
		.headers({
		  'Accepts' : 'application/json',
		  'X-Mashape-Key' : 'VWwy2iMe9gmshEGF3hXHbtNXSmVmp1Xmox6jsnhIT2ke204QXH'
		})
		.query({
			'f_has_lyrics': '1',
			'q': req.params.query,
			'page' : '1',
			'page_size' : '10'
		})
		.end(function (response) {
			var results = [];
			results = response.body;
			res.send(results);
		});
};

exports.lyrics = function(req, res) {
	
		var getLyrics = unirest.get('https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get');
	
		getLyrics
		.headers({
		  'Accepts' : 'application/json',
		  'X-Mashape-Key' : 'VWwy2iMe9gmshEGF3hXHbtNXSmVmp1Xmox6jsnhIT2ke204QXH'
		})
		.query( {
			'track_id' : req.params.track_id 
		}) 
		.end(function(response){
			var result = response.body;
			result = JSON.parse(result);
			
				if(!result.lyrics_body) {
					console.log('error');	
				} else {
					res.jsonp(result);
				}
				
		});
	
	
};