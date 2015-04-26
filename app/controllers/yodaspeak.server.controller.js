'use strict';
exports.translate = function(req, res) {
		var unirest = require('unirest');
	
		var Request = unirest.get('https://yoda.p.mashape.com/yoda');
	
		Request
		.headers({
		  'Accepts' : 'application/json',
		  'X-Mashape-Key' : 'VWwy2iMe9gmshEGF3hXHbtNXSmVmp1Xmox6jsnhIT2ke204QXH'
		})
		.query({
			'sentence' : req.params.english
		})
		.end(function (response) {
		  	console.log(response.body);
			var results = [];
			results.push(response.body);
			res.send(results);
		});
	
	
};