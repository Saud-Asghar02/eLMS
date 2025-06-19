const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();

// 🔗 Step 1: Start Google Sign-In/Up
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 🔁 Step 2: Google Callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/user/login' }),
  (req, res) => {
      if (req.user.isNew) {
        req.flash('success', 'Account created successfully via Google!');
      }
    
    // ✅ Successful login/signup
    const token = generateToken(req.user);
    res.cookie('token', token);
    res.redirect('/');
  }
);

module.exports = router;