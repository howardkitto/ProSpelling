
const express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

//Routes
const envTest = require('./routes/admin/envTest')
const adminWords = require('./routes/admin/words')
const getWord = require('./routes/assess/wordRoute')
const adminAssessments = require('./routes/admin/assessments')

const app = express()

// configure body parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static('frontend/build')) 
  
 
app.use('/admin/envtest', envTest) 
app.use('/admin/words', adminWords)
app.use('/admin/assessments', adminAssessments)
app.use('/assess/getword', getWord)

module.exports = {app}