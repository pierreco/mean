'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    elmongo = require('elmongo'),
    Schema = mongoose.Schema;


/**
 * Videos Schema
 */
var VideosSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        youtube: {
            type: String
        },
        vimeo: {
            type: String
        },
        dailymotion: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    platform: {
        type: String

    },
    duration: {
        type : Number
    },
    platformUpload: {
        type: Date
    },
    thumbnail: {
        type : String,
        default: 'http://localhost:3000/theme/assets/img/cactus.png'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
VideosSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot be blank');

VideosSchema.path('content').validate(function (content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
VideosSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};



VideosSchema.plugin(elmongo);

var Video = mongoose.model('Video', VideosSchema);

Video.sync(function (err, numSynced) {
    // all cats are now searchable in elasticsearch
    console.log('number of cats synced:', numSynced);
});

Video.search({ query: 'Tutoriel' }, function (err, results) {
    console.log('search results', results);
});

