const mongoose = require('mongoose')
const Assessments = require('./Assessments')

const Words = new mongoose.Schema({
    word: {type: String, required:true},
    level:  {type: Number, required:true},
    assessments: [Assessments.schema],
    characteristics:{type: String},
    audioFileName:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);