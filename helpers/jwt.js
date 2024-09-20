const jwt = require('jsonwebtoken');

const generarJWT = (id, nombre) => {

    return new Promise((resolve, reject) => {
        const payload = { id, nombre };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('token no generado')
            }

            resolve(token);
        });
    })
}

module.exports = {
    generarJWT
}