
const express = require('express')
const morgan = require('morgan');
const path = require('path');

const envTest = require('./routes/admin/envTest')

const adminWords = require('./routes/admin/words')
const getNextWord = require('./routes/assess/nextWordRoute')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// (process.env.NODE_ENV === 'production') ?
//     app.use(express.static('frontend/build')) :
//     console.log('dev mode')

app.use(express.static('frontend/build')) 
  
 
app.use('/admin/envtest', envTest) 
app.use('/admin/words', adminWords)
app.use('/assess/getnextword', getNextWord)

module.exports = {app}