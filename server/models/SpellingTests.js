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


const  SpellingTests = new mongoose.Schema({
  spellingTestId: {type: String, required:true},
  level: {type: Number, required:true},
  assessmentId: {type: String},
  userId: {type:String, default:"Anonymous"},
  questions: [Questions]
}, {timestamps:{}} ); 


module.exports = mongoose.model('SpellingTests', SpellingTests);
