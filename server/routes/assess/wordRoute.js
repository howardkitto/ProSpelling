const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const getWord = require('../../businessLogic/getWord')   
const filterPreviousWords = require('../../businessLogic/filterPreviousWords')

router.route('/')

.post((req, res)=>{
    // console.log('got post ' + JSON.stringify(req.body))

    const processWord = async ()=>{
        
        //ToDo: Catch errors
        let allWords = await Words.find({"level":req.body.level}).exec()
            .catch(error => console.log(error));
        let remainingWords = await filterPreviousWords(req.body.assessment, allWords)
            .catch(error => console.log(error)); 
        let word = await getWord(remainingWords)
            .catch(error => console.log(error)); 
        
        res.json(word)

       }

    processWord()
})

module.exports = router