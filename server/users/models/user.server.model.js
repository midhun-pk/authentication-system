'use strict';

/* 
 * Module dependencies
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/*
 * User Schema for mongoDB entries
 */
let UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

/*
 * Pre save hook to hash the password
 * @param {Function} next - Callback function to call next middleware
 */
UserSchema.pre('save', function (next) {
    if (this.password) {
        // Generate random salt for each user
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/*
 * Instance method for hashing password
 * @param {String} password
 * @return {String} hash - Password encrypted along with salt
 */
UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        // Encryt username using the salt
        return crypto.pbkdf2Sync(password, new Buffer.from(this.salt).toString('base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
        return '';
    }
}

/*
 * Checks whether the password is matching or not
 * @param {String} password - Login password given by the user
 * @return {Boolean} Correct password or not
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
}

module.exports = mongoose.model('User', UserSchema);
