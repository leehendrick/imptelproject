
const pool = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const  generateToken = (user) => {

    const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        user_type: user.user_type
    };

    const options = {
        expiresIn: '1h',
    }

    const secretKey = process.env.JWT_SECRET;

    return jwt.sign(payload, secretKey, options, { algorithm: 'HS256' });
}

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
            pool.query('INSERT INTO users SET ?', { email: email, name: name, passwordHash: hashedPassword, user_type: use_type }, (error, results) => {
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

const login = (req, res) => {
    const { email, password } = req.body;

    pool.getConnection((error, connection) => {
        if (error) {
            console.log('[____HOUVE UM ERRO AO CONECTAR A B.D____]: ', error);
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta para obter o usuário pelo e-mail
        pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log('[____HOUVE UM ERRO____]: ', error);
                connection.release();
                return res.status(500).send('Erro ao executar a consulta');
            }

            if (results.length <= 0) {
                connection.release();
                return res.render('login', {
                    message: 'Usuário não encontrado',
                    icon: 'error',
                    title: 'Erro no Login'
                });
            }

            const user = results[0];

            // Comparar a senha digitada com a senha armazenada no banco de dados
            bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
                if (err) {
                    console.log('[____HOUVE UM ERRO AO COMPARAR SENHAS____]: ', err);
                    connection.release();
                    return res.status(500).send('Erro ao comparar senhas');
                }

                if (isMatch) {
                    connection.release();
                    const token = generateToken(user);

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                    });

                    return res.render('login', {
                        message: 'Por Favor aguarde...',
                        title: 'Processando!',
                        usuario: user.name,
                    });

                } else {
                    connection.release();
                    return res.render('login', {
                        message: 'Senha incorreta',
                        icon: 'error',
                        title: 'Erro no Login'
                    });
                }
            });
        });
    });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.setHeader('Content-Type', 'text/html');
    res.render('login', {
        message: '',
        title: '',
        usuario: ''
    })
};

module.exports = {
    register,
    login,
    logout
};
