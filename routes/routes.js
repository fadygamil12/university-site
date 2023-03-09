const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../conn.js');
let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true })); 

router
    .route('/')
    .get((req , res) =>{
        res.render("index.pug", {name:'Fady'});
    })

router
    .route('/about')
    .get((req,res)=>{
        res.render('About Us.pug')
    })
router
    .route('/contact')
    .get((req,res)=>{
        res.render('Contact Us.pug')
    })
router
    .route('/blog')
    .get((req,res)=>{
        res.render('Blog.pug')
    })
router
    .route('/account')
    .get((req,res)=>{
        res.render('Account.pug')
    })
router
    .route('/login')
    .post((req,res) =>{
        res.render("index.pug", {name: req.body.user });
    })
module.exports = router;
