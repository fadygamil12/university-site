const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const { log } = require('console');
const { types } = require('util');
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

router.post("/login" , async(req,res) =>{
    const { user, pass } = req.body;
    db.query('select * from users where email=? ', ([user]), (err,result) =>{
        if(err){
            console.log(err);
        }
        else if(result.length >0){
            bcrypt.compare(pass , result[0].password ,(err ,result2) =>{
            if(result2){
                let name = result[0].user.charAt(0).toUpperCase() + result[0].user.slice(1)
                req.session.user = name
                req.session.type = result[0].type
                req.session.authorized = true
                return res.redirect('/');
            }
            else{
                return res.render('Account' , {message: 'Password is wrong'})
            }
        }
            )}
            else{
                return res.render('Account' , {message: 'Email not found'})
            }    
})
})
router.post("/signup" , (req,res)=>{
    const {Uid, Email, type, Pwd, Pwd2} = req.body;
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
            db.query('INSERT INTO users SET?', {user:Uid , email: Email, password:hash_pwd ,type:type} , (err , result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    return res.render('account', {message:"You're Signed up , Login now"});
                }
            })
        }
    })
})
router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/account')
})
router.get('/profile/:type/:username', (req,res)=>{
    if(req.session.authorized){
        if(req.session.user == req.params.username && req.session.type == req.params.type){
            if(req.params.types == 'teacher'){
                res.render('Profile_teacher' , {name:req.params.username})
            }
            else{
                res.render('Profile_student' , {name:req.params.username})
            }
        }
        else{
            res.redirect(`/user/profile/${req.session.type}/${req.session.user}`)
        }
    }
    else{
        res.redirect('/account')
    }
    
})
module.exports=router;