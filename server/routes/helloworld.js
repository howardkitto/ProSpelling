const express = require('express');

const router = new express.Router();


router.route('/')
.get(function helloWorld(req, res){

    console.log('hello world, template')
    res.setHeader('Content-Type', 'application/json');

    (process.env.NODE_ENV === 'production')?
    res.send(JSON.stringify({ message: 'hello world prod' })):
    res.send(JSON.stringify({ message: 'hello world dev' }));
})


module.exports = router