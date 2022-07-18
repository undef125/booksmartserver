const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("OTPmodel", otpSchema)