
const express = require('express')
const morgan = require('morgan');
const path = require('path');

const envTest = require('./routes/admin/envTest')

const adminWords = require('./routes/admin/words')
const getNextWord = require('./routes/assess/nextWordRoute')
const levels = require('./routes/assess/levelsRoute')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static('frontend/build')) 
  
 
app.use('/admin/envtest', envTest) 
app.use('/admin/words', adminWords)
app.use('/assess/getnextword', getNextWord)
app.use('/assess/levels', levels)

module.exports = {app}