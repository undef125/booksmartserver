const mongoose = require('mongoose');
const otpmodel = require('./otpmodel');

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        require: true,
    }
});

module.exports = mongoose.model("users", userSchema);