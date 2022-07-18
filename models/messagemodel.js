const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    chatId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
},
    {timestamps: true},
);

module.exports = mongoose.model("message", messageSchema);