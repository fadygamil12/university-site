const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');

const app = express();
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.set('views', '../views');

// Connect to database
const dotenv = require('dotenv');
dotenv.config({
    path:'/etc/secrets/'
})
mongoose.connect(process.env.database_se,
{
    useNewUrlParser: true
})
.then(()=>{
    console.log('We are in')
})
.catch((err)=>{
    console.log(err)
})

const router = require('./routes/routes');
const session = require('express-session');
console.log(__dirname +'/public')
app.use(express.static(__dirname +'/public'));
app.use(express.static('public'));
app.use(session({
    secret: 'fadygamilhana'
}))

app.set('view engine', 'pug')

app.use("/",router);

app.listen(5000, ()=> {
    console.log("App started")
})

