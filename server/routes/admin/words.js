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

.post(function(req, res){

    // console.log('make a word ' + JSON.stringify(req.body))

    const word = {    'word':req.body.word,
                        'level':req.body.level,
                        'assesment':req.body.assesment,
                        'characteristics': req.body.characteristics
                        }

    const newWord = new Words(word)
    newWord.save(function(err,data){
        if(err){
            
            console.log('newWord barfed', err)
            res.send(err)}
        res.json(data)})
        
    });

module.exports = router