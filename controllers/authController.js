const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {generateToken} = require('../utils/generateToken');

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

        // Compare plain-text password (used for Google sign-up users)
        if (user.password === password) {
          const token = generateToken(user);
          res.cookie('token', token);
          return res.redirect('/');
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

module.exports.logout = async (req, res) => {
    try {
        // Passport v0.6+ requires a callback
        req.logout((err) => {
            if (err) {
                console.error('Logout Error:', err);
                return res.redirect('/'); // or show error page
            }

            // Destroy session if it exists
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) console.error('Session destroy error:', err);
                });
            }

            res.clearCookie('token');
            res.redirect('/');
        });
    } catch (error) {
        console.error('Logout failed:', error);
        res.redirect('/');
    }
};

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            req.flash('error', 'No account found with this email.');
            return res.redirect('/user/login');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '10m' });
        const resetLink = `http://localhost:3000/user/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"eLMS" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Password Reset",
            html: `<p>Hello ${user.username},</p>
                   <p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>This link will expire in 10 minutes.</p>`
        });

        req.flash('success', 'A password reset link has been sent to your email.');
        res.redirect('/user/login');
    } catch (error) {
        req.flash('error', 'Something went wrong while sending the email.');
        res.redirect('/user/login');
    }
};

module.exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect(`/user/reset-password/${token}`);
    }

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      req.flash('error', 'User not found.');
      return res.redirect('/user/login');
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    req.flash('success', 'Password reset successfully. Please log in.');
    res.redirect('/user/login');

  } catch (err) {
    req.flash('error', 'Your reset link has expired or is invalid.');
    res.redirect('/user/forgot-password');
  }
};