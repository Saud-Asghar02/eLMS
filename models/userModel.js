const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    userPicture : String,
    phoneNumber : String,
    location : String,
    userBio : String,
    aboutUser : String,
    language : String,
    skills: [{ type: String }],
    socialMediaLink : String,
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "courses"
    }],
    enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses'
    }],
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('users', userSchema);