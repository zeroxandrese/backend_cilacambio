const { response } = require("express");

const { Transactions } = require('../models/index');

const idValidatorTransOwner = async (req, res = response, next) => {
    const uid = await req.userAuth;
    const idOperacion = req.params.idOperacion;

    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'Se intenta validar el id sin validar token'
        })
    }
    try {
        const validacionIdTrans = await Transactions.findOne({idOperacion});
        const validacionIdTrans2 = validacionIdTrans.user;
        const uid1 = JSON.stringify(uid._id);
        const uidUpdate = uid1.slice(1, -1);
        
        const uid2 = JSON.stringify(validacionIdTrans2);
        const uidUpdate2 = uid2.slice(1, -1);

        if (uidUpdate2 !== uidUpdate) {
            res.status(401).json({
                msg: 'El uid no corresponde al creador de la transaccion'
            });
    };
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'El uid no corresponde'
        });
    }
}

module.exports = {
    idValidatorTransOwner
}