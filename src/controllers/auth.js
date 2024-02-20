
const pool = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const register = (req, res) => {
    console.log(req.body);

    //Pegando os dados do formulário
    const { name, email, password, passConfirm } = req.body;

    //Chamando conexão e rodando um SELECT
    pool.getConnection((error, connection) => {
        if (error) {
            console.log('[____HOUVE UM ERRO AO CONECTAR A B.D____]: ', error);
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log('[____HOUVE UM ERRO____]: ', error);
                connection  .release();
                return res.status(500).send('Erro ao executar a consulta');
            }

            if (results.length > 0) {
                connection.release();
                return res.render('register', {
                    message: '[___O EMAIL JA ESTÁ EM USO___]',
                });
            } else if (password !== passConfirm) {
                connection.release();
                return res.render('register', {
                    message: '[___PASSWORDS NÃO SÃO IGUAIS___]',
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);



            // Se chegou aqui, não houve erros e a conexão pode ser liberada
            connection.release();

        });
    });


    //res.send('[FORM SUBMITTED]')
};

module.exports = {
    register,
};