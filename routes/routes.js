const express = require('express');
const { Module } = require('module');
const user = require('./user.js')
router = express.Router()

// Handle the main routes
router.get('/',(req,res) => {
    res.render('index.pug' ,{name:req.session.user})
})
router.get('/aboutus',(req,res) => {
    res.render('About Us.pug' ,{name:req.session.user})
})
router.get('/blog',(req,res) => {
    res.render('Blog.pug' ,  {name:req.session.user})
})
router.get('/contactus',(req,res) => {
    res.render('Contact US.pug',  {name:req.session.user})
})
router.get('/account',(req,res) => {
    if (req.session.authorized){
        res.redirect(`/user/profile/${req.session.type}/${req.session.user}`)
    }
    else{
        res.render('Account.pug')
    }
    
})
router.get('/courses',(req,res) => {
    res.render('Courses.pug',{name:req.session.user})
})

//handle user routes:

router.use('/user',user)


module.exports=router;