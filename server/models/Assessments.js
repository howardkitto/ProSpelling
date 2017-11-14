const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Assessments', schema);