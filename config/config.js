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
        clientId: '',
        clientSecret: '',
        refreshToken: '',
        user: '', // Email address from which the verification mail should be sent to the user
        expires: '2m' // Email verificcation token expires after 2 minutes
    },
    auth: {
        tokenSecret: process.env.TOKEN_SECRET || 'SECRET',
        sessionSecret: process.env.SESSION_SECRET || 'SECRET',
        routeStart: '/api/auth/', // Starting string of authentication apis
        expires: 1 * 60 // JWT token expires after 60 seconds
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