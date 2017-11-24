const mongoose = require('mongoose')
// const Assessments = require('./Assessments')

const LinkedAssessments = new mongoose.Schema({
    assessmentId: {type: String},
    title: {type: String}
})

const Words = new mongoose.Schema({
    word: {type: String, required:true},
    level:  {type: Number, required:true},
    linkedAssessments: [LinkedAssessments],
    characteristics:{type: String},
    audioFileName:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);