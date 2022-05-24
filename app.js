const http = require('http')
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const res = require('express/lib/response');


const Post = require('./models/userModel');

/* MONGOOSE */

mongoose.connect('mongodb://localhost:27018/hintTest', {

})

/*
mongoOlayi().catch(err => console.log(err));

async function mongoOlayi() {
    await mongoose.connect('mongodb://localhost:27018/hintTest');


    const kittySchema = new mongoose.Schema({
        name: String
    });


    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function speak() {
        const greeting = this.name ?
            "Meow name is " + this.name :
            "I don't have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    await fluffy.save();
    fluffy.speak();

    const kittens = await Kitten.find();
    console.log(kittens);
    await Kitten.find({ name: /^fluff/ });

}   HA BU MONGODUR HA!!!
 */


//const router = express.Router();
const app = express();

app.use(express.static("CSS"));

app.set('view engine', 'handlebars');

app.use(express.static("images"));

app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/',
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const router = require('./routes/router')
const posts = require('./routes/posts')

app.use('/', router);
app.use('/posts', posts);

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');