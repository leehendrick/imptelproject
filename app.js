const express = require('express');
const app = express();
const path = require("path");
const pool = require('./src/database/connection');
const authRoutes = require('/src/routes/auth');
const pageRoutes = require('/src/routes/pages');

//Conexão com a base de dados
pool.getConnection((error, connection) => {
    if (error) {
        console.error("[ERRO AO OBTER A CONEXÂO:]", error);
    } else {
        connection.release();
    }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuração do ejs
app.set('view engine', 'ejs');
app.set('views', '/home/hendrick/Documentos/Projects/imptelproject/src/views');

//Define Routes
app.use('/', pageRoutes);
app.use('/auth', authRoutes);

//Porta do project
app.listen(5000, () => {
    console.log("[SERVER STARTED ON PORT 5000]");
})