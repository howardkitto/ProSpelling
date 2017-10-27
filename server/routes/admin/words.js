const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')

var words

router.route('/')
.get((req, res)=>{
    var promise = Words.find().exec()
        .then((words)=>{
            res.setHeader('Content-Type', 'application/json')
            res.send(words)
            })
        .catch((err)=>{
            console.log('error ' + err)
            })

        }
)

module.exports = router