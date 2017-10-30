const mongoose = require('mongoose')

const Words = new mongoose.Schema({
    word: {type: String, required:true},
    level:  {type: Number, required:true},
    assessment: {type : String},
    characteristics:{type: String},
    audioFileName:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);