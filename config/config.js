'use strict';

module.exports = {
    app: {
        title: 'Authentication System',
        description: 'Full-Stack Authentication System with MongoDB, Express, AngularJS, and Node.js',
    },
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    domain: process.env.DOMAIN,
    db: {
        promise: global.Promise,
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth',
        options: {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    },
    mailerAuthOptions: {
        type: 'OAuth2', // Obtains outhorization grant by interacting with the resource owner (user)
        clientId: '994302662493-kej8pmcoa0kmsk94j23ga3k8khb94lfm.apps.googleusercontent.com',
        clientSecret: 'thD5Cnnb_wxDyuCGhAbqGs_y',
        refreshToken: '1/9eTD6Sg7Ombap4dIc_P1EgUoltFflB5s6217XV0FdOw',
        user: 'midhun19931@gmail.com',
        expires: '2m' // Expires after 2 minutes
    },
    auth: {
        tokenSecret: process.env.TOKEN_SECRET || 'SECRET',
        sessionSecret: process.env.SESSION_SECRET || 'SECRET',
        routeStart: '/api/auth/',
        expires: 1 * 60 // Expires after 60 seconds
    },
    favicon: 'client/dist/authentication-system/favicon.ico',
    client: {
        paths: [
            'client/dist/authentication-system/'
        ]
    },
    server: {
        routes: [
            'server/users/routes/auth.server.routes.js',
            'server/core/routes/core.server.routes.js'
        ]
    }
}