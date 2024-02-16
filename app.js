const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require("path");
require('dotenv').config();


//Conexão com a base de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((error) => {
    if (error) {
        console.error("Error connecting to MySQL:", error);
    } else {
        console.log("[...MYSQL CONNECTED...]");
    }
});


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', '/home/hendrick/Documentos/Projects/imptelproject/src/views');

//Rotas
app.get("/", (req, res) => {
    res.render('index');
})
app.get("/login", (req, res) => {
    res.render('login');
})
app.get("/register", (req, res) => {
    res.render('register');
});


//Porta do projeto
app.listen(5000, () => {
    console.log("[SERVER STARTED ON PORT 5000]");
})