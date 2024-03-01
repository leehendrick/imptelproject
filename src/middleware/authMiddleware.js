require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];

    //console.log('VERIFICANDO O TOKEN: ',token);

    if (!token) {
        console.log('TOKEN NÂO FORNECIDO');
        return res.render('login', {
            message: '',
            title: ''
        });
    }

    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(401).json({ message: 'Token inválido' });
        }

        /*console.log('Token verificado com sucesso. Dados decodificados:', decoded);*/
        req.userId = decoded.userId;
        next();
    });
};

module.exports = [
    verifyToken,
];
