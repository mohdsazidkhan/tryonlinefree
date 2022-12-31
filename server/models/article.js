const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    image: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    categoryId: {
        required: true,
        type: String
    },
    categoryName: {
        required: true,
        type: String
    },
    tags: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    userEmail: {
        required: true,
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('article', articleSchema)