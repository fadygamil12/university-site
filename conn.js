// createConnection
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : 'localhost',
    database : 'fady',
    user : 'root',
    password : ''
  
  });
  conn.connect((error) => {
    if(error){
      throw error;
    }
    else{
    }
  });
   
  module.exports = conn;