const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
var Raven = require('raven');
Raven.config('https://2a43b1e569ce4b6788bcc52500b6f3b4:0e4c9a6ade214d089f4531c77e473089@sentry.io/236518').install();


var env = {}

router.route('/')
.get((req, res)=>{
    console.log('got route')

    var promise = Words.count().exec()

    promise.then((count)=>{
        console.log('env '+ count)
        env.message = 'Hello World v0.01'
        env.NODE_ENV = process.env.NODE_ENV
        env.MONGO_HOST = process.env.MONGO_HOST;
        env.wordCount = count;
    })
    .then(()=>{
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(env)) 
    })
    .catch((err)=>{
        Raven.captureException('error ' + err)
        res.json({database:"error"})
        })
})

module.exports = router