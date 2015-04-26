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
	description: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	track: {
		name: {
			type: String
		},
		artist: {
			type: String
		},
		yodaLyrics: {
			type: String,
			required: true
		},
		albumArt: {
			type: String,
			default: 'http://placehold.it/400x400'
		}
	},
	title: {
		type: String	
	}
});

mongoose.model('Post', PostSchema);