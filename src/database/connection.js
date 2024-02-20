const mysql = require('mysql2');
const { release } = require("mysql/lib/PoolConnection");
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'imptelproject',
    connectionLimit: 10, // Número máximo de conexões pool
};

const pool = mysql.createPool(dbConfig);

//Obtendo uma conexão do pool
pool.getConnection((error, connection) => {
    if (error) {
        console.error("[###ERRO AO CONECTAR A BASE DE DADOS###]:", error);
    } else {
        console.log("[...MYSQL CONECTADO...]");

        //Liberando a conexão do pool
        connection.release();
    }
});

// Exportando a instância do pool
module.exports = pool;
