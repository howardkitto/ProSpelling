const express = require('express');

const router = new express.Router();

const Words = require('../models/Words')

var env = {}

router.route('/')
.get(function helloWorld(req, res){

    Words.count({}, function(err, c) {
        console.log('Count is ' + c);
        env.wordCount = c
    });

    env.message = 'Hello World'

    env.NODE_ENV = process.env.NODE_ENV

    env.MONGO_HOST = process.env.MONGO_HOST;


    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(env)) 
})

module.exports = router