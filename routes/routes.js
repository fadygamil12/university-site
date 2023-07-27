const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require("bcryptjs")
router = express.Router()
dotenv.config({
    path:'./.env'
})
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
})
db.connect((error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log('WE ARE IN')
    }
}) 
// Handle the main routes

router.get('/',(req,res) => {
    res.render('index.pug')
})
router.get('/aboutus',(req,res) => {
    res.render('About Us.pug')
})
router.get('/blog',(req,res) => {
    res.render('Blog.pug')
})
router.get('/contactus',(req,res) => {
    res.render('Contact US.pug')
})
router.get('/account',(req,res) => {
    res.render('Account.pug')
})
router.get('/courses',(req,res) => {
    res.render('Courses.pug')
})


router.post("/user/login" , (req,res) =>{
    const { user, pass } = req.body;
    db.query('select * from users where email=? AND password=?', ([user , pass]), (err,result) =>{
        if(err){
            console.log(err)
        }
        else if(result.length >0){
            console.log(result)
            return res.render('index', {name:user});
        }
        else{
            return res.render('Account' , {message: 'Email or password is wrong'})
        }

    }
    )
})
// Handle sign up
router.post("/user/signup" , (req,res)=>{
    const {Uid, Email, Pwd, Pwd2} = req.body;
    db.query('SELECT email FROM users WHERE email = ?',[Email],async(error , result) =>{
        if(error){
            console.log(error);
        }
        else if(result.length > 0){
            return res.render('Account',{message:'This email is already used'})
        }
        else if(Pwd != Pwd2){
            return res.render('Account' , {message:"Passwords are not identical"})
        }
        else{
            let hash_pwd = await bcrypt.hash(Pwd,8);
            db.query('INSERT INTO users SET?', {user:Uid , email: Email, password:hash_pwd} , (err , result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    return res.render('index', {name:Uid});
                }
            })
        }
    })
})
module.exports=router;