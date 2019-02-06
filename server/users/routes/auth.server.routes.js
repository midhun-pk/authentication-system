'use strict';

module.exports = function (app) {
    // User Routes
    let users = require('../controllers/users.server.controller');

    // Setting up the users authentication api
    app.route('/api/auth/signup').post(users.signup);
    app.route('/api/auth/signin').post(users.signin);
    app.route('/api/auth/verification-link').post(users.resendVerificationMail);
    app.route('/api/auth/verify/:token').get(users.verifyUser);
    app.route('/api/auth/signout').get(users.signout);


};