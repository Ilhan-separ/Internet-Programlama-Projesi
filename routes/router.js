const http = require('http')
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const res = require('express/lib/response');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require('../models/userModel');
const { redirect } = require('express/lib/response');
const app = express();

router.get('/', (req, res) => {
    console.log(req.session.userId)
    res.render('main', { layout: 'index' });
});

// app.use((req, res, next) => {
//     const userid = req.session.username;
//     console.log(userid);
//     if (userid) {
//         res.locals = { usermenu: true };
//     } else {
//         res.locals = { usermenu: false };
//     }
//     next();
// })


router.get('/profile', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userId }).lean();
        console.log(user);
        if (user) {
            res.render('profile', { userobj: user });
        } else {
            console.log("-----No such user.");
            res.redirect('/register');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }


    // console.log(user.userId);
    // console.log('Loggin Out.');
    // res.render('logout', { userobj: User });
    // //res.redirect('/')
    // req.session.destroy();
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('Loggin Out.');
    res.redirect('/');

});

router.get('/about', (req, res) => {
    res.render('aboutMe', { layout: 'index' });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register', { layout: 'index' });
});


module.exports = router;