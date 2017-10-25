const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')

var env = {}

router.route('/')
.get((req, res)=>{

    var promise = Words.count().exec()

    promise.then((count)=>{
        env.message = 'Hello World'
        env.NODE_ENV = process.env.NODE_ENV
        env.MONGO_HOST = process.env.MONGO_HOST;
        env.wordCount = count;
    })
    .then(()=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(env)) 
    })
    .catch((err)=>{
        console.log('error ' + err)
        })
})

module.exports = router