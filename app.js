const express = require('express');
const getConnection = require('./src/database/connection')
const app = express();
const path = require("path");



//Conexão com a base de dados
getConnection();


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuração do ejs
app.set('view engine', 'ejs');
app.set('views', '/home/hendrick/Documentos/Projects/imptelproject/src/views');

//Define Routes
app.use('/', require('./src/routes/pages'));
app.use('/auth', require('./src/routes/auth'));

//Porta do project
app.listen(5000, () => {
    console.log("[SERVER STARTED ON PORT 5000]");
})