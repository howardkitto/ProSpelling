const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const getNextWord = require('../../businessLogic/getNextWord')   

router.route('/')
.get((req, res)=>{

    const processNextWord = async ()=>{
        
        var nextWord = {}

        nextWord.timeStamp = Date.now()
        //ToDo: Catch errors
        var allWords = await Words.find().exec()
        nextWord.word = await getNextWord(allWords)
        
        res.json(nextWord)

       }

    processNextWord()
})

module.exports = router