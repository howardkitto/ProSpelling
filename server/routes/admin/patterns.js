const express = require('express');
const router = new express.Router();
const Patterns = require('../../models/Patterns')


router.route('/')

.post((req, res)=>{
    console.log('called post Patterns '+ JSON.stringify(req.body))

    const pattern = {  'Title':req.body.Title,
                        'Description':req.body.Description
                    }
    const newPattern = new Patterns(pattern)

    newPattern.save(function(err,data){
        if(err){
            
            console.log('newPattern barfed', err)
            res.send(err)}
        res.json(data)})
})

router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    
    
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    const getPatternList = async()=>{
        let patternListObject = {}
            patternListObject.count = await Patterns.count().exec()
            patternListObject.patterns = await Patterns.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({'updatedAt':'descending'})
                                            .exec()
        return patternListObject

    }

    getPatternList()
        .then((list)=>{
            res.json(list)
        })
        .catch((err)=>{
            console.log('error ' + err)
            })
        }
)

module.exports = router