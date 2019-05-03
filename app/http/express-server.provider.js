const express = require('express');
const Router = require('express').Router;
const path = require('path');
const morgan = require('morgan');
var cors = require('cors');

module.exports.register = async (container) => {

    container.singleton('http.kernel', async () => {
        const app = express();
        const apiRouter = await container.make('router.api');
        console.log(apiRouter);
        // const webappRouter = await container.make('router.webapp');
        const config = await container.make('config');
        console.log(config);
        //corse
        app.use(cors());

        //inject container into request
        app.use((req, res, next) => {
            console.log('huy',req.container);
            req.container = container;
            next();
        });

        app.use(morgan('combined'));

        app.set('views', './app/views');
        app.set('view engine', 'pug');

        app.use(config.http.api.uri, apiRouter);

        if(process.env.NODE_ENV = 'development') {
            app.use('/public', express.static(path.join(__dirname + '/../../public')));
        }

        return app;
    });

    container.singleton('router.api', async () => {
        const config = await container.make('config');
        return new Router(config.http.api.router);
    });

    

};