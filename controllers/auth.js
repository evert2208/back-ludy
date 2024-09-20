const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    const usuarios = await Usuario.findAll({
        attributes: { exclude: ['password'] }
    });

    res.json({
        ok: true,
        usuarios
    })

}

const crearUser = async(req, res = response) => {

    const { numDoc, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ where: { numDoc: numDoc } });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario ya existe'
            })
        }
        usuario = new Usuario(req.body);

        //encriptar password
        if (password != null && password != '') {
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);
        }


        await usuario.save();

        //generar JWT
        // const token = await generarJWT(usuario.id, usuario.nombre);

        res.status(201).json({
            ok: true,
            id: usuario.id,
            nombre: usuario.nombres,
            msg: 'Creado con Exito!'

            // token

        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'error interno en bd'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const { id, nombres } = req;

    //generar nuevo token
    const token = await generarJWT(id, nombres);
    res.json({
        ok: true,
        id,
        nombres,
        token
    })
}

const loginUser = async(req, res = response) => {

        const { user, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { numDoc: numDoc } });
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'el password o el documento son incorrectos'
                })
            }

            //confirmar password
            const validPassword = bcrypt.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'el password o el documento son incorrectos'
                })
            }

            //generar JWT
            const token = await generarJWT(usuario.id, usuario.nombre);

            res.status(200).json({
                ok: true,
                id: usuario.id,
                nombre: usuario.nombres,
                token

            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'error interno en bd'
            })
        }

    }
    //actualizar
const putUsuario = async(req, res = response) => {

    const userId = req.params.id;
    try {
        const user = await Usuario.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'el usuario no existe'
            })
        }
        const newUser = {
            ...req.body
        }
        const userAct = await Usuario.update(newUser, { where: { id: userId } })
        res.json({
            ok: true,
            msg: 'Actualizada Correctamente',
            user: userAct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en el servidor'
        })
    }

}

const deleteUsuario = async(req, res = response) => {

    const userId = req.params.id;

    try {
        const user = await Usuario.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'el usuario no existe'
            })
        }

        await user.destroy();
        res.json({
            ok: true,
            msg: 'Usuario Eliminado!'

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en el servidor'
        })
    }
}

module.exports = {
    crearUser,
    revalidarToken,
    loginUser,
    getUsuarios,
    deleteUsuario,
    putUsuario
}