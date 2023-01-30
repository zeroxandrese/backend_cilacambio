const express = require('express');
const cors = require('cors');
const { dbContection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.routerPath = '/api/users';
        this.transactionsPath = '/api/transactions';
        this.commentsAdminPath = '/api/commentsAdmin';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

    };

    async conectarDB() {
        await dbContection();
    }

    middlewares() {
        //Cors para restringir peticiones
        this.app.use(cors());

        // parseo y lectura del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.routerPath, require('../routes/user'));
        this.app.use(this.transactionsPath, require('../routes/transaction'));
        this.app.use(this.commentsAdminPath, require('../routes/commentsAdmin'));
    };

    listen() {
        this.app.listen(this.port)
    }
};

module.exports = Server;