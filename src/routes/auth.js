const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

//Quando o formulário register for acionado executar a função register no controller auth.
router.post('/register', authController.register);
router.get('/login', authController.login);

module.exports = router;
