const express = require('express');
const router = express.Router();
const controller = require(('../controllers/authController'));

router.get('/login', (req,res)=> {
    res.render('login', {error: req.flash("error")})
});

router.get('/register', (req,res)=> {
    res.render('register', {error: req.flash("error")})
});

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.get('/logout', controller.logout);

module.exports = router;