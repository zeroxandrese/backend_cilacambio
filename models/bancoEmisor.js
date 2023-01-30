const { Schema, model } = require('mongoose');

const BancoEmisorSchema = Schema({
    banco:{
        type: String,
        required:[true, 'El pais es obligatorio']
    }
});

module.exports = model('BancoEmisor',BancoEmisorSchema);