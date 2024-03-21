const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

//Quando o formulário register for acionado executar a função register no controller auth.
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
module.exports = router;
