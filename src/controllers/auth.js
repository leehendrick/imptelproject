
const pool = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const register = (req, res) => {
    console.log(req.body);

    //Pegando os dados do formulário
    const { email, name, password, passConfirm } = req.body;
    let use_type = 'user';

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

            //Verficando se o email introduzido ja existe na base de dados.
            if (results.length > 0) {
                connection.release();
                return res.render('register', {
                    message: '[___O EMAIL JA ESTÁ EM USO___]',
                    icon: 'error',
                    title: 'ERRO'
                });
            } else if (password !== passConfirm) {
                connection.release();
                //Verificando a comfirmação da password.
                return res.render('register', {
                    message: '[___PASSWORDS NÃO SÃO IGUAIS___]',
                    icon: 'error',
                    title: 'ERRO'
                });
            }

            //Criptografando a senha
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            //Insert na table users
            pool.query('INSERT INTO users SET ?', { email: name, name: name, passwordHash: hashedPassword, user_type: use_type }, (error, results) => {
                if (error){
                    console.log(`[HOUVE UM ERRO AO INSERIR NA BD]: ${error}`);
                    return res.render('register', {
                        message: '[HOUVE UM ERRO AO INSERIR NA BD]',
                        icon: 'error',
                        title: 'ERRO'
                    });
                }
                else {
                    console.log(results)
                    return res.render('register', {
                        message: '[REGISTRADO COM SUCESSO]',
                        icon: 'success',
                        title: 'Feito!'
                    });
                }
            });


            // Se chegou aqui, não houve erros e a conexão pode ser liberada
            connection.release();

        });
    });


    //res.send('[FORM SUBMITTED]')
};

module.exports = {
    register,
};
