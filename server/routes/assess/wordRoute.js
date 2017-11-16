const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const saveSpellingTest = require('../../businessLogic/saveSpellingTest')
const getWord = require('../../businessLogic/getWord')   
const filterPreviousWords = require('../../businessLogic/filterPreviousWords')

router.route('/criteria/:criteria/value/:value')

.post((req, res)=>{
    // console.log('got post ' + JSON.stringify(req.params.value))

    const processWord = async ()=>{
        
        let savedSpellingTest = await(saveSpellingTest(req.body))
        let allWords = (req.params.criteria=='level')?
            await Words.find({"level":req.params.value}).exec()
            :await Words.find({'linkedAssessments.assessmentId':req.params.value})
        let remainingWords = await filterPreviousWords(savedSpellingTest, allWords)
        let word = await getWord(remainingWords)
        
        res.json(word)

       }

    processWord().catch(error => console.log('error'));
})

module.exports = router