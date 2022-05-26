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

const app = express();
const saltRounds = 10;
const User = require('../models/userModel');
const router = express.Router();


router.post('/register', async(req, res) => {
    console.log(req.body);
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const insertResult = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPwd,
        });
        console.log(insertResult);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log(user);
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if (cmp) {
                //   User Session
                req.session.userId = user._id;
                req.session.username = user.username;
                req.session.email = user.email;
                req.session.date = user.date;
                console.log("----Succesful")
                res.redirect('/');
            } else {
                console.log("----Wrong username or password.");
                res.redirect('/login');
            }
        } else {
            console.log("-----No such user.");
            res.redirect('/register');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});


module.exports = router;