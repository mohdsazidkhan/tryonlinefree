const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    password: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)