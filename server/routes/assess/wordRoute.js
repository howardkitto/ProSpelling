const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const getWord = require('../../businessLogic/getWord')   

router.route('/')

.post((req, res)=>{
    console.log('got post ' + req.body.level)

    const processWord = async ()=>{
        
        var word = {}

        word.timeStamp = Date.now()
        //ToDo: Catch errors
        var allWords = await Words.find({"level":req.body.level}).exec()
        word.word = await getWord(allWords)
        
        res.json(word)

       }

    processWord()
})

module.exports = router