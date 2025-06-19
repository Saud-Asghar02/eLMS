const express = require('express');
const router = express.Router();
const controller = require(('../controllers/authController'));

router.get('/login', (req,res)=> {
    res.render('login', {
        success: req.flash("success"),
        error: req.flash("error")
    })
});

router.get('/register', (req,res)=> {
    res.render('register', {error: req.flash("error")})
});

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.get('/logout', controller.logout);




// Forget password flow
router.get('/forgot-password', controller.forgotPassword);

// Reset form (verify token)
router.get('/reset-password/:token', (req, res) => {
    res.render('forgot-password.ejs', { token: req.params.token });
});

// Handle new password submission
router.post('/reset-password/:token', controller.resetPassword);

module.exports = router;