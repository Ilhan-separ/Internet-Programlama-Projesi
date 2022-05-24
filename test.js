const mongoose = require("mongoose");
const { db } = require("./models/userModel");

const Post = require('./models/userModel');


mongoose.connect('mongodb://localhost:27018/hintTest', {

})


Post.create({
    title: 'My first post title',
    content: 'Postum çalışsın lütfen knk.'
}, (err, post) => {
    console.log(err, post)
})