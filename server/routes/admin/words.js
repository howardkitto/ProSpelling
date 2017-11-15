const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')

var words

router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    let wordCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    let counter = ()=>{
        return Words.count().exec()
        .then((c)=>{return c})
        .catch((err)=>console.log(err))
     }
 
     counter()
         .then((count)=>{wordCount = count})

    let promise = Words.find().exec()
        .then((words)=>words.sort((a, b) => {
            a = new Date(a.updatedAt);
            b = new Date(b.updatedAt);
            return a>b ? -1 : a<b ? 1 : 0;
        }))
        .then((words)=>{
            let sliced = words.slice(skip, skip+limit)
            return sliced
        })
        .then((words)=>{
            let wordsList = {}
            wordsList.count = wordCount
            wordsList.words = words
            res.setHeader('Content-Type', 'application/json')
            res.json(wordsList)
            })
        .catch((err)=>{
            console.log('error ' + err)
            })
        }
)

router.route('/')
.post(function(req, res){

    console.log('make a word ' + JSON.stringify(req.body))

    const word = {    'word':req.body.word,
                        'level':req.body.level,
                        'linkedAssessments':req.body.linkedAssessments,
                        'characteristics': req.body.characteristics,
                        'audioFileName': req.body.audioFileName
                        }

    const newWord = new Words(word)
    newWord.save(function(err,data){
        if(err){
            
            console.log('newWord barfed', err)
            res.send(err)}
        res.json(data)})
        
    })

.put((req, res)=>{
        console.log('put route activated ' + JSON.stringify(req.body))

        const word = {  'word':req.body.word,
                        'level':req.body.level,
                        'linkedAssessments':req.body.linkedAssessments,
                        'characteristics': req.body.characteristics,
                        'audioFileName': req.body.audioFileName}
                        
        var promise = Words.findByIdAndUpdate(req.body._id, word).exec()
            .then((word)=>{
                res.setHeader('Content-Type', 'application/json')
                res.send(word)
                })
            .catch((err)=>{
                res.send(err)
                })
})

.delete((req, res)=>{
    // console.log('Gonna delete ' + JSON.stringify(req.body))
    var promise = Words.findByIdAndRemove(req.body._id).exec()
    .then(()=>{
        res.setHeader('Content-Type', 'application/json')
        res.json({deleted:'ok'})
        })
    .catch((err)=>{
        console.log('error ' + err)
        })
        
})



module.exports = router