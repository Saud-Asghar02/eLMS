const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')

module.exports.registerUser = async (req,res)=> {
    try {
        const { username, email, password, userPicture, userBio, aboutUser, language, skills } = req.body;

        let user = await userModel.findOne({email : email})

        if(user) {
            req.flash('error', 'You already have an account, Please login');
            return res.redirect('/user/register');
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {

                if (err) return res.send(err.message)

                else {
                    const user = new userModel({
                        username,
                        email,
                        password : hash,
                        userPicture: userPicture || '',
                        userBio: userBio || '',
                        aboutUser: aboutUser || '',
                        language: language || '',
                        skills: skills || ''
                    })

                    user.save();

                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash('success', 'Account successfully created.Please verify your email!');
                    res.redirect('/');

                }
            });
        });
    
    } catch (err) {
       res.send(err.message) 
    }
};

module.exports.loginUser = async (req,res)=> {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email: email});

        if(!user) {
            req.flash('error', 'Something wents wrong!');
            return res.redirect('/user/login');
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie('token', token);
                res.redirect('/')
            }
            else {
                req.flash('error', 'Something wents wrong!');
                res.redirect('/user/login');
            }
        });
    } catch (err) {
        res.send(err.message) 
    }
};

module.exports.logout = (req,res)=> {
    res.clearCookie('token');
    res.redirect('/')
}