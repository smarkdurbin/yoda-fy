'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var CommentSchema = new Schema({
	body: {
		type: String,
		default: '',
		required: 'Please fill Comment body',
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	post: {
		type: Schema.ObjectId,
		ref: 'Post'
	}
});

mongoose.model('Comment', CommentSchema);