const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    query: {
        required: true,
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)