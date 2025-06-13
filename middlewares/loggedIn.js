const jwt = require('jsonwebtoken');
const usermodel = require('../models/userModel');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.isLoggedIn = false; // Not logged in
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await usermodel.findOne({ email: decoded.email }).select("-password");

        if (user) {
            req.user = user;
            res.locals.isLoggedIn = true;  // Pass login status to views
            res.locals.user = user;        // Pass user data to views
        } else {
            res.locals.isLoggedIn = false;
        }
        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.locals.isLoggedIn = false;
        res.redirect('/');
    }
};