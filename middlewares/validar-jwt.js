const { response } = require('express');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/Usuario');

const validarJWT = (req, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');
    // console.log(token)
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    try {
        const { id, nombre } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;
        req.nombre = nombre;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}