const mongoose = require('mongoose');

const Questions = new mongoose.Schema({
  word :{type: String},
  answer:{type: String},
  score:{type: Number},
  attempt:{type:Number},
  result:{type:String},
  askTimeStamp:{type:Date},
  answerTimeStamp:{type:Date}
});


const  Assessments = new mongoose.Schema({
  assessmentId: {type: String, required:true},
  level: {type: Number, required:true},
  questions: [Questions]
}, {timestamps:{}} ); 


module.exports = mongoose.model('Assessments', Assessments);
