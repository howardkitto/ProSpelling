const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const saveSpellingTest = require('../../businessLogic/saveSpellingTest')
const getWord = require('../../businessLogic/getWord')   
const filterPreviousWords = require('../../businessLogic/filterPreviousWords')

router.route('/')

.post((req, res)=>{
    console.log('got post ' + JSON.stringify(req.body))

    const processWord = async ()=>{
        
        let savedSpellingTest = await(saveSpellingTest(req.body.spellingTest))
        let allWords = await Words.find({"level":req.body.level}).exec()
        let remainingWords = await filterPreviousWords(savedSpellingTest, allWords)
        let word = await getWord(remainingWords)
        
        res.json(word)

       }

    processWord().catch(error => console.log(error));
})

module.exports = router