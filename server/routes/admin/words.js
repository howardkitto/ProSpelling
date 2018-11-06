const express = require('express');
const router = new express.Router();
const Words = require('../../models/Words')

// var words

router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    const getWordList = async()=>{
        let wordListObject = {'test':'ok2'}
            wordListObject.count = await Words.count().exec()
            wordListObject.words = await Words.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({'updatedAt':'descending'})
                                            .exec()
        return wordListObject

    }

    getWordList()
        .then((list)=>{
            res.json(list)
        })
        .catch((err)=>{
            console.log('error ' + err)
            })
        }
)

router.route('/')
.post(function(req, res){

    console.log('Make a word \n' + JSON.stringify(req.body, null, 4))

    const word = {    'word':req.body.word,
                        'level':req.body.level,
                        'linkedAssessments':req.body.linkedAssessments,
                        'linkedFamilies':req.body.linkedFamilies,
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
        console.log('put route activated \n' + JSON.stringify(req.body, null, 4))

        const word = {  'word':req.body.word,
                        'level':req.body.level,
                        'linkedAssessments':req.body.linkedAssessments,
                        'linkedFamilies':req.body.linkedFamilies,
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