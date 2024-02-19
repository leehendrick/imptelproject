const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', {
        partials: {
            header: 'header',
            footer: 'footer',
        },
    });
})

router.get("/login", (req, res) => {
    res.render('login');
})

router.get("/register", (req, res) => {
    res.render('register');
});

module.exports = router;