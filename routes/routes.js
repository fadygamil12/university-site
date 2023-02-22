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
    .get((req,res)=>{
        res.render('Account.pug')
    })
    .post((req,res) =>{
        var user_i = req.body.user;
        var pass_i = req.body.pass;
        var query = `
        SELECT * FROM fady WHERE user = "${user_i}"
        `
        db.query(query , (error , data) => {
            if(data.length <= 0){
                res.send("a7a")
            }
            else{
             if(pass_i == data[0].password){
                res.send("dart ya seee3")
             }
            }
        })
    })
module.exports = router;
