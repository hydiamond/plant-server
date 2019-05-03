const Container = require('./app/container');
const EventEmitter = require('events').EventEmitter;
const lodash = require('lodash');

const config = require('./config');
const container = new Container(new EventEmitter());

module.exports = async () => {
    
    container.singleton('config', async () => config);
    let shouldBeBootedProviders = [];

    //bind factories
    config.providers.forEach(provider => {
        provider.register(container);

        if (lodash.isFunction(provider.boot)) {
            shouldBeBootedProviders.push(provider);
        }
    });

    //boot the providers
    for (let i = 0; i < shouldBeBootedProviders.length; i++) {
        await shouldBeBootedProviders[i].boot(container);
    }

    return container;
};