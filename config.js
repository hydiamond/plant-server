require('dotenv').config();

module.exports = {
    //providers
    providers: [
        require('./app/http/express-server.provider'),
    ],

    //config service
    http: {
        api: {
            router: {},
            uri: '/v1'
        },

        webapp: {
            router: {},
            uri: '/'
        },

        port: process.env.HTTP_PORT || 5000
    },
    knex: require('./knexfile'),
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || 'max-secret-key-xD',
        options: {
            algorithm: 'HS256',
            expiresIn: '2h'
        }
    },
};