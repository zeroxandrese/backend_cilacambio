const { response, query } = require('express');
let MersenneTwister = require('mersenne-twister');
let generator = new MersenneTwister();

const { Transactions } = require('../models/index');

const transactionsGet = async (req, res = response) => {
    const id = await req.userAuth;
    const { page } = req.query;
    const options = { page: page || 1, limit: 10 }
    const query = { user: id, status: true };

    // se estan enviando dos promesas al mismo tiempo para calcular el paginado de transacciones
    const transactions = await Transactions.paginate(query, options)
    res.status(201).json(transactions);
};

const transactionsOneGet = async (req, res = response) => {
    const idOperacion = req.params.idOperacion;

    // se estan enviando dos promesas al mismo tiempo para calcular el paginado de transacciones
    const transactions = await Transactions.findOne({idOperacion});
    res.status(201).json({
        transactions: transactions
    });
};

const transactionsPut = async (req, res = response) => {

    const id = req.params.id;
    const { status, ...transactions } = req.body;

    const transaction = await Transactions.findByIdAndUpdate(id, transactions);

    res.status(201).json({
        transactions: transaction
    });
};

const transactionsPost = async (req, res = response) => {

    const uid = await req.userAuth;
    const { progress, numeroOperacion, numeroCuenta, tipoCuenta, ciReceptor, bancoEmisor, bancoReceptor, nombreReceptor } = req.body;
  
    const data = {
        user: uid._id,
        progress,
        idOperacion : generator.random_int(),
        numeroOperacion,
        numeroCuenta,
        tipoCuenta,
        ciReceptor,
        bancoEmisor,
        bancoReceptor,
        nombreReceptor,

    }

    const transaction = new Transactions(data);

    await transaction.save();

    res.status(201).json(transaction);
};

const transactionsDelete = async (req, res = response) => {
    const id = req.params.id;
    //Borrar transacrions permanentemente
    //const transacrions = await Transactions.findByIdAndDelete( id );

    //Se modifica el status en false para mapearlo como eliminado sin afectar la integridad
    const transaction = await Transactions.findByIdAndUpdate(id, { status: false });

    res.status(201).json({ transaction });
};

module.exports = {
    transactionsGet,
    transactionsPut,
    transactionsPost,
    transactionsOneGet,
    transactionsDelete
}