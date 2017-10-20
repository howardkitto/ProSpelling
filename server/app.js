
const express = require('express')
const morgan = require('morgan');
const path = require('path');

const helloWorld = require('./routes/helloworld')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
(process.env.NODE_ENV === 'production') ?
    app.use(express.static('frontend/build')) :
    console.log('dev mode')
  
 
app.use('/helloworld', helloWorld)

module.exports = {app}