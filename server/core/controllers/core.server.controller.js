'use strict';

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    res.render('client/dist/authentication-system/index.html');
};

/**
 * Render the main application page
 */
exports.ping = function (req, res) {
    return res.status(200).send({ message: 'Ping successful' });
};