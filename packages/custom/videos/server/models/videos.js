'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
        twitter: {
            type: String,
            default: 'pierre_co'
        },
        facebook: {
            type: String

        },
        youtube: {
            type: String,
            default: 'pierre_co'
        },
        vimeo: {
            type: String

        }
    },
    platform: {
        type: String,
        default: 'youtube'
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
/*
VideosSchema.path('url').validate(function (videoUrl) {
    return !!videoUrl;
}, 'Content cannot be blank');
*/
/**
 * Statics
 */
VideosSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Video', VideosSchema);
