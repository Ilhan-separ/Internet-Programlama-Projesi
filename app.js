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


const User = require('./models/userModel');

/* MONGOOSE */

mongoose.connect('mongodb://localhost:27018/hintTest', {

})


//const router = express.Router();
const app = express();

app.use(session({
    secret: 'testtoo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27018/hintTest'
    })
}))

app.use(express.static("CSS"));

app.set('view engine', 'handlebars');

app.use(express.static("images"));

app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: __dirname + '/views/layouts/index',
    partialsDir: __dirname + '/views/partials/',
}));

app.enable('view cache');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const router = require('./routes/router')
const posts = require('./routes/posts')

app.use('/', router);
app.use('/posts', posts);

// app.use((req, res, next) => {
//     const userid = req.session.username;
//     var usermenu = false;
//     console.log(userid);
//     if (userid) {
//         usermenu = true;
//         res.locals = { usermenu: true };
//         console.log(usermenu);
//     } else {
//         usermenu = false;
//         res.locals = { usermenu: false };
//         console.log(usermenu);
//     }
//     next();
// })


app.listen(process.env.port || 3000);
console.log('Running at Port 3000');