'use strict';

/* 
 * Module dependencies
 */

const mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;


/*
 * Token Schema for mongoDB entries
 */
let TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: 'String',
        required: true,
        default: crypto.randomBytes(16).toString('hex')
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: '2m'
    }
});

module.exports = mongoose.model('Token', TokenSchema);