const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
    email: {
        type:String,
        required: true
        },
    passwordhash: {
        type:String,
        required: true
        }
})

exports.User = mongoose.model('User' , userschema)