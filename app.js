const http = require('http');
const mysql = require('mysql');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { createConnection } = require('net');
app.use(express.static(__dirname));
app.use('/' , routes);
app.set('view engine', 'html');


// createConnection

app.get('/' , (req,res)=>{
   res.render("index.pug", {name:'fady'});
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});