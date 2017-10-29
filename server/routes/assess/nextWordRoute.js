const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const getNextWord = require('../../businessLogic/getNextWord')   

router.route('/')

.post((req, res)=>{
    console.log('got post ' + req.body.level)

    const processNextWord = async ()=>{
        
        var nextWord = {}

        nextWord.timeStamp = Date.now()
        //ToDo: Catch errors
        var allWords = await Words.find({"level":req.body.level}).exec()
        nextWord.word = await getNextWord(allWords)
        
        res.json(nextWord)

       }

    processNextWord()
})

module.exports = router