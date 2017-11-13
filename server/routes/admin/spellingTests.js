const express = require('express');
const router = new express.Router();
const SpellingTests = require('../../models/SpellingTests')


router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    console.log('got params '+JSON.stringify(req.params))

    let assCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit
   

//this is a new patern for me - need to understand it better   
    let counter = ()=>{
       return SpellingTests.count().exec()
       .then((c)=>{return c})
       .catch((err)=>console.log(err))
    }

    counter()
        .then((count)=>{assCount = count})

    let promise = SpellingTests.find()
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
    .then(results=>{
        let spellingTest = {}
        spellingTest.count = assCount
        spellingTest.questions = results 
        res.json(spellingTest)})
    .catch((err)=>console.log(err))

})


module.exports = router