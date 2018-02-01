const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String},
    skipMistakes: {type: Boolean}
}, {timestamps:{}})

module.exports = mongoose.model('Assessments', schema);