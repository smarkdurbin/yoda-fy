'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
	name: {
		type: String,
		default: 'postName',
		trim: true
	},
	songName: {
		type: String,
		default: 'songName'
	},
	lyrics: {
		type: String,
		default: 'lyrics'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});



mongoose.model('Post', PostSchema);