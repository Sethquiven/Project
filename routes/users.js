var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/register', function(req,res){
    res.render('register');
});

//Login
router.get('/login', function(req,res){
    res.render('login');
});

router.post('/register', function(req,res){ //not working yet
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    console.log(email);
});

module.exports = router;
