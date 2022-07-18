const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
    {
        members: {
            type: [ String ],
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
