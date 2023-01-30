const { Schema, model } = require('mongoose');

const BancoReceptorSchema = Schema({
    banco:{
        type: String,
        required:[true, 'El pais es obligatorio']
    }
});

module.exports = model('BancoReceptor',BancoReceptorSchema);