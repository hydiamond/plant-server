const bootstrap = require('./bootstrap');
    
(async () => {
    const container = await bootstrap();

    const httpKernel = await container.make('http.kernel');
    const config = await container.make('config');

    let server = httpKernel.listen(config.http.port, () => {
        const {address, port} = server.address();
        console.log(`Listening at http://${address}:${port}`);
    })
})();


