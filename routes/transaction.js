const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middelwares/validar-campos');
const { transactionsGet,
    transactionsPut,
    transactionsPost,
    transactionsOneGet,
    transactionsDelete } = require('../controllers/transaction');
const { findIdTransactions, findBancoEmisor, findBancoReceptor, findIdTcuenta, findNOperation, findProcessOperation } = require('../helpers/db-validators');
const { validarJWT } = require('../middelwares/validar-jwt');
const { idValidatorTransOwner } = require('../helpers/id-validator-transaction');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], transactionsGet);

router.get('/one/:idOperacion', [
    validarJWT,
    idValidatorTransOwner,
    check('idOperacion').custom(findIdTransactions),
    validarCampos
], transactionsOneGet);

router.put('/:id', [
    validarJWT,
    idValidatorTransOwner,
    check('id', 'El id no es valido').isMongoId(),
/*     check('id').custom(findIdTransactions),
    check('nOperacionFinal','El numero de operacion presenta problemas' ).custom(findNOperation), */
    validarCampos
], transactionsPut);

router.post('/', [
    validarJWT,
    check('bancoEmisor','El banco Emisor no corresponde').custom(findBancoEmisor),
    check('bancoReceptor','El banco Receptor no corresponde').custom(findBancoReceptor),
    check('tipoCuenta','El tipo de cuenta no corresponde').custom(findIdTcuenta),
    check('progress', 'Hay algo mal con el proceso de la operación').custom(findProcessOperation),
    validarCampos
], transactionsPost);

router.delete('/:id', [
    validarJWT,
    idValidatorTransOwner,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(findIdTransactions),
    validarCampos
], transactionsDelete);

module.exports = router;