const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('development:mongoose');

mongoose
.connect(`${config.get('MONGODB_URL')}/FYP`)
.then(() => {
    debug('Mongoose is connected');
})
.catch((err)=> {
    debug(err); 
})

module.exports = mongoose.connection;