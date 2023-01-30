const { Schema, model } = require('mongoose');

const SchemaUser = Schema({
    nombre: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // paises nicho Peru, Chile, Colombia
    pais: {
        type: String,
        required: true
    },
    // se calcuaria solicitando la fecha de nacimiento
    edad: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    created:{
        type: Date,
        default: Date.now
    }
});

SchemaUser.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model('User', SchemaUser);