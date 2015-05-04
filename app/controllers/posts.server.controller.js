'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Post = mongoose.model('Post'),
	_ = require('lodash');

/**
 * Create a Post
 */
exports.create = function(req, res) {
	var post = new Post(req.body);
	post.user = req.user;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.emit('post.created', post);
			res.jsonp(post);
		}
	});
};

/**
 * Show the current Post
 */
exports.read = function(req, res) {
	res.jsonp(req.post);
	
};

/**
 * Update a Post
 */
exports.update = function(req, res) {
	var post = req.post;

	post = _.extend(post , req.body);

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(post);
		}
	});
};

/**
 * Delete an Post
 */
exports.delete = function(req, res) {
	var post = req.post ;

	post.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(post);
		}
	});
};

/**
 * List of Posts
 */
exports.list = function(req, res) { 
	Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('Posts length: ' + posts.length);
			res.jsonp(posts);
		}
	});
};

/**
 * Post middleware
 */
exports.postByID = function(req, res, next, id) { 
	Post.findById(id).populate('user', 'displayName').exec(function(err, post) {
		if (err) return next(err);
		if (! post) return next(new Error('Failed to load Post ' + id));
		req.post = post ;
		next();
	});
};

/**
 * Post authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.post.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


exports.like = function(req, res) {
  var user = req.user;
  var containsValue = false;

	var post = req.post ;
  // Determine if user is already in 
  for(var i=0; i<req.post.likes.length; i++) {
    console.log('Comparing ' + req.post.likes[i] + ' to ' + req.user._id + ' is ' + req.post.likes[i].equals(req.user._id));
    if(req.post.likes[i].equals(req.user._id)) {
      containsValue = true;
    }
  }
  if(!containsValue) {
	req.post.likes.push(req.user._id);
  }
  req.post.save(function(err) {
    if (err) {
      return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
      });
    } else {
	 var socketio = req.app.get('socketio');
	socketio.emit('post.liked', post);
      res.jsonp(req.post);
	 }
  });
};
