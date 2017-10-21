const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  questionId : {type: String},
  word :{type: String},
  answer:{type: String},
  score:{type: Number},
  answer_time:{type:Date}
}, {timestamps:{}});

const  Assessments = new mongoose.Schema({
  userId: {type: String},
  assessmentLevel: {type: String},
  assessmentScore: {type: Number},
  question: Question
}, {timestamps:{}} ); 

module.exports = mongoose.model('Assessments', Assessments);
