const jwt = require('jsonwebtoken');
const usermodel = require('../models/userModel');

module.exports = async (req, res, next)=> {
    if (!req.cookies.token) {
        req.flash("error", "you need to login first");
        return res.redirect('/')
    }

    try {

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await usermodel
        .findOne({ email : decoded.email})
        .select("-password");
        req.user = user;
        next();

    } catch (err) {
        req.flash("error", "something wents wrong");
        res.redirect('/')
    }
}