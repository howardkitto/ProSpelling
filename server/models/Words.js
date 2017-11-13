const mongoose = require('mongoose')

const Words = new mongoose.Schema({
    word: {type: String, required:true},
    level:  {type: Number, required:true},
    assessments: {type : String},
    characteristics:{type: String},
    audioFileName:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);