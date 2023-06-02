const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserLogin = mongoose.model('usersLogin', userLoginSchema)

module.exports = UserLogin;