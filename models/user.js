const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(user, callback) {        
    bcrypt.genSalt(10, (err, salt) => {
        if (err) callback('err1', null);//throw err;
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) callback('err2', null);//throw err;
            user.password = hash;            
            user.save(callback);            
        });        
    });    
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        //console.log("compare", err);
        //if (err) throw err;
        callback(err, isMatch);
    });    
}