//host + /api/areas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');
const { getAreas, postArea, putArea, deleteArea } = require('../controllers/area');
const router = Router();

//validar JWT
// router.use(validarJWT);

router.get('/', getAreas);

router.post('/', [
    check('codigo', 'codigo obligatorio').not().isEmpty(),
    check('Nombre', 'nombre obligatorio').not().isEmpty(),
    validarCampos
], postArea);

router.put('/:id', putArea);

router.delete('/:id', deleteArea);


module.exports = router;