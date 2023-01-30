const { Schema, model } = require('mongoose');

const ProcessOperationSchema = Schema({
    ProcessOperation:{
        type: Number
    }
});

module.exports = model('ProcessOperation',ProcessOperationSchema);