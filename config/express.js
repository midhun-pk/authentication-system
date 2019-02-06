'use strict';

/*
 * Module dependencies.
 */
const express = require('express'),
    favicon = require('serve-favicon'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    glob = require('glob'),
    path = require('path'),
    jwt = require('jsonwebtoken');

/*
 * Get files by glob patterns
 */
let getGlobbedPaths = function (globPatterns) {
    let paths = [];
    globPatterns.forEach((pattern) => {
        let path = glob.sync(pattern);
        paths.push(...path);
    });
    return paths;
}
/*
 * Initialize local variables.
 */
let initLocalVariables = (app) => {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.domain = config.domain;
    app.locals.favicon = config.favicon;
    app.locals.host = config.host;
    app.locals.port = config.port;
}

/*
 * Initialize application middleware
 */
let initMiddleware = (app) => {

    // Initialize favicon middleware.
    app.use(favicon(app.locals.favicon));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    // Initialize token authentication middleware
    app.use('/api/*', (req, res, next) => {
        // Get json web token from header
        if (!req.originalUrl.startsWith('/api/auth/')) {
            let token = req.headers['authorization'];
            if (!token) return res.status(401).send('User not authenticated');
            token = token.replace('Bearer ', '');

            try {
                // Verify the token
                const user = jwt.verify(token, config.auth.tokenSecret);
                req.user = user;
            } catch (error) {
                return res.status(401).send(error);
            }
        }
        next();
    });

}

/*
 * Configure application view engine
 */
let initViewEngine = (app) => {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', process.cwd());
}

/*
 * Initialize client routes
 */
let initClientRoutes = (app) => {
    config.client.paths.forEach((staticPath) => {
        app.use(express.static(path.resolve(staticPath)));
    })
};

/*
 * Initialize server routes
 */
let initServerRoutes = (app) => {
    let routes = getGlobbedPaths(config.server.routes);
    routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });
};

/*
 * Initialize express application
 */
module.exports.init = function () {
    // Initialize express app
    var app = express();

    // Initialize local variables
    initLocalVariables(app);

    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Express view engine
    initViewEngine(app);

    // Initialize client routes
    initClientRoutes(app);

    // Initialize server routes
    initServerRoutes(app);

    // Return initialized app
    return app;
}