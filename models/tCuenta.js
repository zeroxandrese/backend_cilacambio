const { Schema, model } = require('mongoose');

const TcuentaSchema = Schema({
    tipoCuenta:{
        type: String,
        required:[true, 'El tipo de cuenta es obligatorio']
    }
});

module.exports = model('Tcuenta',TcuentaSchema);