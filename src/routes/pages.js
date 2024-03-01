const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');


//Chamando o index e definindo os componentes.
router.get("/", (req, res) => {
    res.render('index', {
        partials: {
            header: 'header',
            footer: 'footer',
        },
    });
})

router.get("/login", (req, res) => {
    const message = '';
    const icon = '';
    const title = '';
    const usuario = '';
    //const timer = 1500;
    res.render('login', { message, icon, title, usuario });
})

//Chamando o register e definindo os valores a ser exibido no sweetalert.
router.get("/register", (req, res) => {
    const message = '';
    const icon = '';
    const title = '';
    //const timer = 1500;
    res.render('register', {message, icon, title});
});

router.get('/home', verifyToken, (req, res) =>{
    const usuario = '';
    res.render('home', {
        partials: {
            navbar: 'navbar',
        },
        usuario,
    });
})


module.exports = router;
