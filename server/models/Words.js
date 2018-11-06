const mongoose = require('mongoose')
// const Assessments = require('./Assessments')

const LinkedFamilies = new mongoose.Schema({
    familyId: {type: String},
    title: {type: String}
})

const LinkedAssessments = new mongoose.Schema({
    assessmentId: {type: String},
    title: {type: String}
})

const Words = new mongoose.Schema({
    word: {type: String, required:true},
    level:  {type: Number, required:true},
    linkedFamilies: [LinkedFamilies],
    linkedAssessments: [LinkedAssessments],
    audioFileName:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);