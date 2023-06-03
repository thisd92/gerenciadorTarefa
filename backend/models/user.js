const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birth: String,
    tel: String,
})

const User = mongoose.model('users', userSchema);

module.exports = User;