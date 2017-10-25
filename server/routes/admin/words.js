const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')

var words

router.route('/')
.get((req, res)=>{
    var promise = Words.find().exec()
        .then((allWords)=>{
            words = allWords.map((i)=>{return i["word"]})
        })
        .then(()=>{
            console.log(words[0])
            res.setHeader('Content-Type', 'application/json')
            res.send(words)
            })
        .catch((err)=>{
            console.log('error ' + err)
            })

        }
)

module.exports = router