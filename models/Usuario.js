const { DataTypes } = require('sequelize');
const bd = require('../database/config');
const Area = require('./Areas');

const Usuario = bd.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    numDoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    area: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: 'areas',
        //     key: 'codigo',
        // },
        allowNull: true
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});

module.exports = Usuario;