'use strict';

/*
 * Module dependencies.
 */
const mongooseService = require('./mongoose'),
    express = require('./express'),
    config = require('./config'),
    _this = this;

/*
 * Initialize mongodb and express
 */
module.exports.init = (callback) => {
    mongooseService.connect((db) => {
        let app = express.init();
        if (callback) callback(app, db);
    })
};

/*
 * Start application
 */
module.exports.start = () => {
    _this.init((app, db) => {
        app.listen(config.port, config.host, () => {
            // Server URL
            const server = 'http://' + config.host + ':' + config.port;

            // Logging Initializaion
            console.log(config.app.title);
            console.log('Server         :' + server);
            console.log('Database       :' + config.db.uri);
        });
    })
}