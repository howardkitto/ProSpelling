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
            res.setHeader('Content-Type', 'application/json')
            res.json({nextWord : words[1]})
            })
        .catch((err)=>{
            console.log('error ' + err)
            })

        }
)

module.exports = router