const mongoose = require('mongoose')

const Assessments = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String},
    skipMistakes: {type: String, default:"false"}
}, {timestamps:{}})

module.exports = mongoose.model('Assessments', Assessments);