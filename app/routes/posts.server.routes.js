'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var posts = require('../../app/controllers/posts.server.controller');

	// Posts Routes
	app.route('/posts')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);
	
	
	app.route('/posts/mostLiked')
		.get(posts.mostLiked)
		.post(users.requiresLogin, posts.create);

	app.route('/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);
	
	//adds a route for likes
	app.route('/posts/like/:postId')
        .put(users.requiresLogin, posts.like);

	// Finish by binding the Post middleware
	app.param('postId', posts.postByID);
	
	app.param('userId', users.userByID);
};
