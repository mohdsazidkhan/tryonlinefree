const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
},{ timestamps: true })

module.exports = mongoose.model('categories', categoriesSchema)