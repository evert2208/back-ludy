const express = require('express');
require('dotenv').config();
const cors = require('cors')
const bd = require('./database/config');
const Area = require('./models/Areas');
const Usuario = require('./models/Usuario');

//crear servidor de express
const app = express();

//bd
bd.sync({ force: false })
    .then(() => {
        console.log('Bd sincronizada.');
    })
    .catch((error) => {
        console.error('Error', error);
    });

// Usuario.belongsTo(Area, { foreignKey: 'area', targetKey: 'codigo' });
// Area.hasMany(Usuario, { foreignKey: 'area', sourceKey: 'codigo' });

// Area.belongsTo(Usuario, { foreignKey: 'lider', targetKey: 'numDoc' });
// Usuario.hasMany(Area, { foreignKey: 'lider', sourceKey: 'numDoc' });

//cors
app.use(cors());
//dir publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/areas', require('./routes/area'));

//servidor de express
app.listen(process.env.PORT, () => {
    console.log(`corriendo en puerto ${process.env.PORT}`)
})