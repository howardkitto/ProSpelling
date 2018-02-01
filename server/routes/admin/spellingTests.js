const express = require('express');
const router = new express.Router();
const SpellingTests = require('../../models/SpellingTests')
const User = require('../../models/User')


let counter = ()=>{
    return new Promise((resolve, reject)=>{
        let count = SpellingTests.count().exec()
        .then((result)=>resolve(result))
        .catch((error)=>{console.log('err ' +error)
                            reject("Error While Counting")})
    })
 }

 let findSpellingTests = (skip, limit) => {
   
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
let addUserNames = (spellingTests) => {

    return new Promise((resolve, reject)=>{

   var promises = spellingTests.map(
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
   
   Promise.all(promises)
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

    spellingTests.count = await counter()
    let rawList = await findSpellingTests(skip, limit)
    spellingTests.List = await addUserNames(rawList)

    // console.log(spellingTests)

    res.setHeader('Content-Type', 'application/json')
    res.json(spellingTests)

}

getSpellingTests().catch(error => {  errorMessage.spellingTestAdmin.message = error.message
                                    console.log(error)
                                    console.log('error json ' + JSON.stringify(errorMessage))
                                    res.status(401).json(errorMessage)

});
})


module.exports = router