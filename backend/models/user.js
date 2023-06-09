const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    birth: { type: String },
    tel: { type: String },
    role: { type: String }
})

const User = mongoose.model('users', userSchema);

module.exports = User;