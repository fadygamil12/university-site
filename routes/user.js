const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const {User} = require('../models/users')
router = express.Router()

router.post("/login" , async(req,res) =>{
    const { email, pass } = req.body;
    let user = await User.findOne({email:email});
    if(!user){
        res.render('account', {message: "This email isn't correct"})
    }
    else if (bcrypt.compareSync(pass, user.passwordhash)) {
        res.render('account', {message: "The password is wrong"})
    }
    else {
        res.redirect('/')
    }
})
router.post("/signup" , async (req,res)=>{
    const {name, email, type, pwd, pwd2} = req.body;
    const user = await User.findOne({email:email});
    console.log(user)
    if(user){
        res.render('account' , {message:'This email is already registered'})
    }
    else if((pwd != pwd2)){
        res.render('account' , {message:'The passwords are not identical'})
    } 
    else{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            passwordhash: bcrypt.hashSync(req.body.pwd , 8)

        })
        user = await user.save();
        if(user){
            res.render('account' , {message: "You're registered. Login now"})
        }
        else if(err){
            console.log(err)
        }
        }
})
router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/account')
})
module.exports=router;