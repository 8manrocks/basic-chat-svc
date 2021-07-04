const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is mandatory'],
        unique: [true, 'username must be unique']
    },
    email: {
        type: String,
        required: [false, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User