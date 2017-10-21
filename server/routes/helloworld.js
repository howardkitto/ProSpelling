const express = require('express');

const router = new express.Router();


router.route('/')
.get(function helloWorld(req, res){

    res.setHeader('Content-Type', 'application/json');

    (process.env.NODE_ENV === 'production')?
    res.send(JSON.stringify({ environment: 'prod' })):
    res.send(JSON.stringify({ environment: 'dev' }));
})


module.exports = router