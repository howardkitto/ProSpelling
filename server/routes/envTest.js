const express = require('express');

const router = new express.Router();

var env = {}

router.route('/')
.get(function helloWorld(req, res){

    env.message = 'Hello World'

    env.NODE_ENV = process.env.NODE_ENV

    env.MONGO_HOST = process.env.MONGO_HOST

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(env)) 
})

module.exports = router