const express = require('express');
const router = new express.Router();
const Assessments = require('../../models/Assessments')
const Words = require('../../models/Words')

router.route('/')

.post(function(req, res){
    
        console.log('make an assessment ' + JSON.stringify(req.body))
    
        const assessment = {  'title':req.body.title,
                        'description':req.body.description
                    }
    
        const newAssessment = new Assessments(assessment)
        newAssessment.save(function(err,data){
            if(err){
                
                console.log('newAssessment barfed', err)
                res.send(err)}
            res.json(data)})
            
        })
.put((req, res)=>{
    console.log('put route activated ' + JSON.stringify(req.body))
    
    const assessment = {'title':req.body.title,
                        'description':req.body.description,
                        //Hate to do skipMistakes with strings but booleans didn't work
                        'skipMistakes':req.body.skipMistakes
                        }
                        
    var promise = Assessments.findByIdAndUpdate(req.body._id, assessment).exec()
        .then((assessment)=>{
            res.setHeader('Content-Type', 'application/json')
            res.json(assessment)
            })
        .catch((err)=>{
            res.send(err)
            })
    })
    
.delete((req, res)=>{
    // console.log('Gonna delete ' + JSON.stringify(req.body))
    var promise = Assessments.findByIdAndRemove(req.body._id).exec()
    .then(()=>{
        res.setHeader('Content-Type', 'application/json')
        res.json({deleted:'ok'})
        })
    .catch((err)=>{
        console.log('error ' + err)
        })
        
    })

//This function lets the admin see words linked to an assessment
const mapWordsToAssessment = async (assessments)=>{
    return new Promise((resolve, reject)=>{

    var a = assessments.map((assessment)=> {
        return Words.find({"linkedAssessments.assessmentId":assessment._id})
                    .sort({'word':'ascending'}).exec()
        .then ((arrayOfWordObjects) => {return arrayOfWordObjects.map((word)=>{return word.word})})
        //Wasted an hour: got to use ._doc to get data out of mongoose object
        .then ((arrayOfWords)=>{return Object.assign({},assessment._doc, {'words':arrayOfWords})})
        .then ((assessmentWithWords)=>{return assessmentWithWords})
    })

    Promise.all(a)
        .then((result)=>resolve(result))
        .catch((error)=>{console.log(error)})
    })
}

router.route('/page/:page/limit/:limit')
.get((req, res)=>{

    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    const generateAssessmentList = async()=>{
        let returnObject = {}
            returnObject.count = await Assessments.count().exec()
            assessments = await  Assessments.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({'updatedAt':'descending'})
                                            .exec()
            returnObject.assessments = await mapWordsToAssessment(assessments)
                    
        return returnObject
    }

   generateAssessmentList()
    .then((list)=>{res.json(list)})
    .catch((err)=>{
                console.log('error ' + err)
                })
})


router.route('/assessmentTitle/:assessmentTitle')
.get((req,res)=>{
    console.log(req.params.assessmentTitle)

    const getAssessment = async (assessmentTitle)=>{
         
        const assessment = await Assessments.findOne({'title':req.params.assessmentTitle}).exec()
        const assessmentCount = await Words.find({'linkedAssessments.assessmentId':assessment._id})
                                        .count()
                                        .exec()
        
        const assessmentObj = Object.assign({}, assessment._doc,{'wordCount':assessmentCount})        

        return assessmentObj
    }

    getAssessment(req.params.assessmentTitle)
        .then((assesmentObj)=>{
            console.log(assesmentObj)
            res.setHeader('Content-Type', 'application/json')
            res.json(assesmentObj)
        })
        .catch((error)=>console.log(error))
})



router.route('/assessmentId/:assessmentId')
.get((req,res)=>{
    console.log(req.params.assessmentId)

    const getAssessment = async (assessmentId)=>{
         
        const assessment = await Assessments.findById(assessmentId).exec()
        const assessmentCount = await Words.find({'linkedAssessments.assessmentId':assessmentId})
                                        .count()
                                        .exec()
        
        const assessmentObj = Object.assign({}, assessment._doc,{'wordCount':assessmentCount})        

        return assessmentObj
    }

    getAssessment(req.params.assessmentId)
        .then((assesmentObj)=>{
            console.log(assesmentObj)
            res.setHeader('Content-Type', 'application/json')
            res.json(assesmentObj)
        })
        .catch((error)=>console.log(error))
})


module.exports = router