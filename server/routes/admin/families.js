const express = require('express');
const router = new express.Router();
const Families = require('../../models/Families')


router.route('/')

.post((req, res)=>{
    console.log('called post Families '+ JSON.stringify(req.body))

    const family = {  'Title':req.body.Title,
                        'Description':req.body.Description
                    }
    const newfamily = new Families(family)

    newfamily.save(function(err,data){
        if(err){
            
            console.log('newfamily barfed', err)
            res.send(err)}
        res.json(data)})
})

.delete((req, res)=>{
    // console.log('Gonna delete ' + JSON.stringify(req.body))
    var promise = Families.findByIdAndRemove(req.body._id).exec()
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

    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    const getFamilyList = async()=>{
        let familyListObject = {}
        familyListObject.count = await Families.count().exec()
        familyListObject.families = await Families.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({'updatedAt':'descending'})
                                            .exec()
        return familyListObject

    }

    getFamilyList()
        .then((list)=>{
            res.json(list)
        })
        .catch((err)=>{
            console.log('error ' + err)
            })
        }
)

module.exports = router