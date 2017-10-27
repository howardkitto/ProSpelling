const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')


const getOneWord = (nextWord) => {
    return new Promise((resolve, reject) =>{
        nextWord.allWordsArray = nextWord.allWords.map((i)=>{return i["word"]})
    
        resolve(nextWord.allWordsArray[12])
    }
)}   

router.route('/')
.get((req, res)=>{

    const processNextWord = async ()=>{
        
        var nextWord = {}

        nextWord.timeStamp = Date.now()
        //ToDo: Catch errors
        nextWord.allWords = await Words.find().exec()
        nextWord.word = await getOneWord(nextWord)
        
        res.json(nextWord)

       }

    processNextWord()
})

module.exports = router