const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', { layout: 'index' });
});

router.get('/about', (req, res) => {
    res.render('aboutMe', { layout: 'index' });
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'index' });
});

router.get('/register', (req, res) => {
    res.render('register', { layout: 'index' });
});


module.exports = router;