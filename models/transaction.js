const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SchemaTransaction = Schema({
    user:{
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   progress:{
       type: String
   },
   idOperacion:{
        type:Number
   },
   numeroOperacion:{
        type: Number,
        required: true
   },
   status:{
       type: Boolean,
       default: true,
       required: true
   },
   numeroCuenta:{
    type: String,
    required : true
   },
   tipoCuenta:{
    type: String,
    required : true
   },
   ciReceptor:{
    type: Number,
    required: true
   },
   bancoEmisor:{
    type: String,
    required: true
   },
   bancoReceptor:{
    type: String,
    required: true
   },
   nombreReceptor:{
    type: String,
    required: true
   },
   nOperacionFinal:{
    type: Number
   },
   created:{
    type: Date,
    default: Date.now
}
});

SchemaTransaction.methods.toJSON = function(){
    const { __v, _id, ...transactions } = this.toObject();
    transactions.uid = _id
    return transactions;
};

SchemaTransaction.plugin(mongoosePaginate);

module.exports = model('Transactions', SchemaTransaction);