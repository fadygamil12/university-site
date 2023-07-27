const express = require('express');





const app = express();
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

const router = require('./routes/routes');
console.log(__dirname +'/public')
app.use(express.static(__dirname +'/public'));
app.use(express.static('public'));



app.set('view engine', 'pug')

app.use("/",router);

app.listen(5000, ()=> {
    console.log("App started")
})