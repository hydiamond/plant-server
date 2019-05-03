exports.register = async (container)=>{
    container.singleton('knex',async ()=>{
        let config = await container.make('config');
        return require('knex')(config.knex);
    })
}