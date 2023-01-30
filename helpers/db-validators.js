const { Pais, Sexo, User, Transactions, BancoEmisor, BancoReceptor, Tcuenta, ProcessOperation } = require('../models/index');

const isPais = async (pais = "") => {
    const missingPais = await Pais.findOne({ pais });
    if (!missingPais) {
        throw new Error('El pais no se encuentra definido');
    }
};

const isSexo = async (sexo = "") => {
    const missingSexo = await Sexo.findOne({ sexo });
    if (!missingSexo) {
        throw new Error('El sexo no se encuentra definido');
    }
};

const findEmail = async (email = "") => {
    const missingEmail = await User.findOne({ email });
    if (missingEmail) {
        throw new Error('El email se encuentra registado');
    }
};

const findId = async (id = "") => {
    const missingId = await User.findById(id);
    if (!missingId) {
        throw new Error('El id no se encuentra registrado');
    }
};

const findIdTransactions = async (idOperacion = 0) => {
    const missingId = await Transactions.findOne({idOperacion});
    if (!missingId) {
        throw new Error('El id no se encuentra registrado');
    }
};

const findIdTcuenta = async (tipoCuenta = "") => {
    const missingTcuenta = await Tcuenta.findOne({ tipoCuenta });
    if (!missingTcuenta) {
        throw new Error('El tipo de cuenta no se encuentra registrado');
    }
};

const findBancoEmisor = async (banco = "") => {
    const missingId = await BancoEmisor.findOne({ banco });
    if (!missingId) {
        throw new Error('El banco no se encuentra registrado');
    }
};

const findBancoReceptor = async (banco = "") => {
    const missingId = await BancoReceptor.findOne({ banco });
    if (!missingId) {
        throw new Error('El banco no se encuentra registrado');
    }
};

const findNOperation = async (nOperacionFinal = "") => {
    const missingId = await Transactions.findOne({ nOperacionFinal });
    if (missingId) {
        throw new Error('El numero de operacion se encuentra registrado');
    }
};

const findProcessOperation = async (progress = "") => {
    const missingId = await ProcessOperation.findOne({ progress });
    if (!missingId) {
        throw new Error('El proceso de la operación no es permitido');
    }
};

module.exports = {
    isPais,
    isSexo,
    findEmail,
    findId,
    findIdTransactions,
    findBancoEmisor,
    findIdTcuenta,
    findBancoReceptor,
    findNOperation,
    findProcessOperation
}