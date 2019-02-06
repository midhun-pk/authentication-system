'use strict';

/*
 * Module dependencies.
 */
let mongoose = require('mongoose'),
    config = require('./config');

/*
 * Connect to Mongodb
 */
module.exports.connect = (callback) => {
    console.log(config.db.uri, config.db.options);
    mongoose.connect(config.db.uri, config.db.options)
        .then((connection) => {
            if (callback) { callback(connection.db) }
        })
        .catch((error) => {
            console.error('Could not connect to MongoDB!');
            console.log(error);
        });
}
