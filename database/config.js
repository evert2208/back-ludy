const { Sequelize } = require('sequelize');


const bd = new Sequelize('postgres', 'postgres.camshmratvvvyikoskgz', '6419I0lYFTv2FrVR', {
    host: 'aws-0-us-west-1.pooler.supabase.com',
    dialect: 'postgres',
    port: 6543,
    logging: false,
});


bd.authenticate()
    .then(() => {
        console.log('se conecto a la bd');
    })
    .catch((error) => {
        console.error('error en la bd', error);
    });

module.exports = bd;