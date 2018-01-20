const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')
const User = require('../../models/User')
const saveSpellingTest = require('../../utils/saveSpellingTest')
const getWord = require('../../utils/getWord')   
const filterPreviousWords = require('../../utils/filterPreviousWords')

const errorMessage = {    errors:true,
    getWord:{
        message: ''
        }}

router.route('/criteria/:criteria/value/:value')

.post((req, res)=>{
    console.log('got post ' + JSON.stringify(req.params.value))
    console.log('got data ' + JSON.stringify(req.body))

    //To Do: massively improve error handling here

    const processWord = async ()=>{

        if(req.params.value === undefined){
            throw("No Test Details Received")
        }
        else{
        let savedSpellingTest = await(saveSpellingTest(req.body))
        let allWords = (req.params.criteria=='level')?
            await Words.find({"level":req.params.value}).exec()
            :await Words.find({'linkedAssessments.assessmentId':req.params.value})
        let remainingWords = await filterPreviousWords(savedSpellingTest, allWords)
        let word = await getWord(remainingWords)
    
        res.json(word)
        }

       }

    processWord().catch(error => {  errorMessage.getWord.message = error
                                    console.log('error json ' + JSON.stringify(errorMessage))
                                    res.status(401).json(errorMessage)
                                
                                });
})

module.exports = router