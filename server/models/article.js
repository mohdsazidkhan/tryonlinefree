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
    }
})

module.exports = mongoose.model('article', articleSchema)