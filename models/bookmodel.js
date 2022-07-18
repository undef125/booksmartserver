const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    negotiable: {
        type: Boolean,
    },
    faculties: {
        type: [ String ],
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    free: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    sellerid: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Book", bookSchema);