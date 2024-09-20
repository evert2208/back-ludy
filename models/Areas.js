const { DataTypes } = require('sequelize');
const bd = require('../database/config');


const Area = bd.define('Area', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    Nombre: {
        type: DataTypes.STRING
    },
    lider: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Areas',
    timestamps: false
});


module.exports = Area;