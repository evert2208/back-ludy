//host + /api/auth
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    crearUser,
    revalidarToken,
    loginUser,
    getUsuarios,
    deleteUsuario,
    putUsuario
} = require('../controllers/auth');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.get('/', getUsuarios);

router.post('/new', [
    //middlewares
    check('nombres', 'nombre obligatorio').not().isEmpty(),
    check('apellidos', 'apellido obligatorio').not().isEmpty(),
    check('email').isEmail(),
    check('fechaNacimiento').custom(isDate),
    // check('password', 'password min de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUser);

router.get('/renew', validarJWT, revalidarToken);

router.post('/', [
    check('user', 'user obligatorio').not().isEmpty(),
    check('password', 'password min de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUser);

router.put('/:id', putUsuario);

router.delete('/:id', deleteUsuario);


module.exports = router;