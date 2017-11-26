const express = require('express');
const router = new express.Router();
const Assessments = require('../../models/Assessments')

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
    // console.log('put route activated ' + JSON.stringify(req.body))
    
    const assessment = {  'title':req.body.title,
                        'description':req.body.description}
                        
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

router.route('/page/:page/limit/:limit')
.get((req, res)=>{

    let assessmentCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit


let counter = ()=>{
    return Assessments.count().exec()
    .then((c)=>{return c})
    .catch((err)=>console.log(err))
 }

 counter()
     .then((count)=>{assessmentCount = count})

let promise = Assessments.find().exec()
     .then((assessments)=>assessments.sort((a, b) => {
         a = new Date(a.updatedAt);
         b = new Date(b.updatedAt);
         return a>b ? -1 : a<b ? 1 : 0;
     }))
     .then((assessments)=>{
        let sliced = assessments.slice(skip, skip+limit)
        return sliced
    })
    .then((assessments)=>{
        let assessmentList = {}
        assessmentList.count = assessmentCount
        assessmentList.assessments = assessments
        res.setHeader('Content-Type', 'application/json')
        res.json(assessmentList)
        })
    .catch((err)=>{
        console.log('error ' + err)
        })

    }
)

router.route('/assessmentTitle/:assessmentTitle')
.get((req,res)=>{
    console.log(req.params.assessmentTitle)
    var promise = Assessments.findOne({'title':req.params.assessmentTitle}).exec()
    .then((assessment)=>{res.json({'foundAssessment':assessment})})
})


module.exports = router