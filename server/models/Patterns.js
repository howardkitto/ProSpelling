const mongoose = require('mongoose')

const Patterns = new mongoose.Schema({
    Title: {type: String, required:true},
    Description: {type: String},
    Lesson: {type: String}
}, {timestamps:{}})

module.exports = mongoose.model('Patterns', Patterns);