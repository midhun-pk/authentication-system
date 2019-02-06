'use strict';

module.exports = function (app) {
    // User Routes
    let core = require('../controllers/core.server.controller');

    app.route('/api/ping').get(core.ping);
    app.route('/*').get(core.renderIndex);

};