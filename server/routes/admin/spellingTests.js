const express = require('express');
const router = new express.Router();
const SpellingTests = require('../../models/SpellingTests')
const User = require('../../models/User')


const spellingTestCounter = ()=>{
    return new Promise((resolve, reject)=>{
        let count = SpellingTests.count().exec()
        .then((result)=>resolve(result))
        .catch((error)=>{console.log('err ' +error)
                            reject("Error While Counting")})
    })
 }

const findSpellingTests = (skip, limit) => {
   
    return new Promise((resolve, reject)=>{
        SpellingTests.find()
        .skip(skip)
        .limit(limit)
        .sort({'updatedAt':'descending'})
        .lean()
        .exec()
    .then((spellingTests)=>{
        resolve(spellingTests)
    })
    .catch((error)=>{console.log('err ' +error)
        reject("Error While Getting Tests")})
    })
 }

//wasted hours on this - had to use Promise.all for the first time
//link users to spelling tests
let addUserNames = (spellingTests) => {

    return new Promise((resolve, reject)=>{

   var testList = spellingTests.map(
       (eachTest)=>{
           if(eachTest.userId){
           return User.findById(eachTest.userId)
           .then((user)=>{return Object.assign({}, eachTest, 
                {'userDisplayName':user.displayName})})}
           else{
               //handle tests when not logged in
               return Object.assign({}, eachTest,{'userDisplayName':"Anonymous"} )
           }           
           }
   )
   
   Promise.all(testList)
    .then((results)=>{resolve(results)})
 })}
      
router.route('/page/:page/limit/:limit')

.get((req, res)=>{

const errorMessage = {    errors:true,
        spellingTestAdmin:{
            message: ''
            }}

let limit = Number(req.params.limit)
let skip = Number(req.params.page) * limit

const getSpellingTests = async () => {

    let spellingTests = {}

    spellingTests.count = await spellingTestCounter()
    let rawList = await findSpellingTests(skip, limit)
    spellingTests.List = await addUserNames(rawList)

    return spellingTests
}

getSpellingTests()
    .then((spellingTests)=>{
            res.setHeader('Content-Type', 'application/json')
            res.json(spellingTests)
    })
    .catch(error => {  errorMessage.spellingTestAdmin.message = error.message
                                    console.log(error)
                                    console.log('error json ' + JSON.stringify(errorMessage))
                                    res.status(401).json(errorMessage)
    })
})

router.route('/user/:userId/page/:page/limit/:limit')

.get((req, res)=>{

    let userId = req.params.userId
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    SpellingTests.find({'userId':userId})
        .skip(skip)
        .limit(limit)
        .sort({'updatedAt':'descending'})
        .exec()
        .then((userTests)=>{
                res.setHeader('Content-Type', 'application/json')
                res.json(userTests)})
})

module.exports = router