const express = require('express');
const router = new express.Router();
const Assessments = require('../../models/Assessments')


router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    console.log('got params '+JSON.stringify(req.params))

    let assCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit
   

//this is a new patern for me - need to understand it better   
    let counter = ()=>{
       return Assessments.count().exec()
       .then((c)=>{return c})
       .catch((err)=>console.log(err))
    }

    counter()
        .then((count)=>{assCount = count})

    let promise = Assessments.find()
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
    .then(results=>{
        let assessment = {}
        assessment.count = assCount
        assessment.questions = results 
        res.json(assessment)})
    .catch((err)=>console.log(err))

})


module.exports = router