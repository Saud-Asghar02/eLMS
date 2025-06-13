const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username : String,
    email : String,
    courses : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses'
        }
    ],
    enrollStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
    }],
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('owner', ownerSchema);