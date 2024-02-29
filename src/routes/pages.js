const express = require('express');
const router = express.Router();

//Chamando o index e definindo os componentes dele. 
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
    //const timer = 1500;
    res.render('login', {message, icon, title});
})

//Chamando o register e definindo os valores a ser exibido no sweetalert.
router.get("/register", (req, res) => {
    const message = '';
    const icon = '';
    const title = '';
    //const timer = 1500;
    res.render('register', {message, icon, title});
});

module.exports = router;
