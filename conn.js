// createConnection
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : 'fdb34.awardspace.net	',
    database : 'fady',
    user : '3925959_login	',
    password : 'Mindfuck2@'
  
  });
  conn.connect((error) => {
    if(error){
      throw error;
    }
    else{
    }
  });
   
  module.exports = conn;