const { Router } = require('express');

const { validarCampos } = require('../middelwares/validar-campos');
const { commentsAdminPost } = require('../controllers/commentsAdmin');
const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();

router.post('/', [
    validarJWT,
    validarCampos
], commentsAdminPost);

module.exports = router;