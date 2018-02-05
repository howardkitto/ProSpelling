const express = require('express');
var bcrypt = require('bcrypt');

const router = new express.Router();
const User = require('../../models/User')
const SpellingTests = require('../../models/SpellingTests')
const authValidation = require('../../utils/authValidation')

let errorMessage = {    errors:true,
    usersAdmin:{
        message: 'some error'
        }}

const userCount = ()=>{
    return new Promise((resolve, reject)=>{
        let count = User.count().exec()
        .then((result)=>resolve(result))
        .catch((error)=>{console.log('err ' +error)
                            reject("Error While Counting")})
    })
    }

const findUsers = (skip, limit) => {

    return new Promise((resolve, reject)=>{
        User.find()
        .skip(skip)
        .limit(limit)
        .sort({'updatedAt':'descending'})
        .lean()
        .exec()
    .then((users)=>{
        resolve(users)
    })
    .catch((error)=>{console.log('err ' +error)
        reject("Error While Getting Tests")})
    })
    }

const testsPerUser = (userList)=>{

    return new Promise((resolve, reject)=>{

        var testCount =  userList.map((user)=>{
            return SpellingTests.find({'userId':user._id})
                .count()
                .exec()
                .then((c)=>{{return Object.assign({}, user, 
                    {'testCount':c})}})
        })
        Promise.all(testCount)
            .then((results)=>{resolve(results)})
            .catch((error)=>{errorMessage.usersAdmin.message = error.message})
    })
}

router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit


const userList = async()=>{

    var userListObj = {}
    userListObj.count = await userCount()
    var userList = await findUsers(skip, limit)
    userListObj.users = await testsPerUser(userList)

    return userListObj

}

userList()
    .then((userListObj)=>{
        res.setHeader('Content-Type', 'application/json')
        res.json(userListObj)
    })
    .catch(error => {  errorMessage.usersAdmin.message = error.message
                                console.log('error' + error)
                                console.log('error json ' + JSON.stringify(errorMessage))
                                res.status(401).json(errorMessage)
    })

})



router.route('/')
.put((req, res)=>{
    // console.log('put route activated ' + JSON.stringify(req.body))
    const userData = {
        'email' : req.body.email.trim().toLowerCase(),
        'displayName' : req.body.displayName.trim(),
        'role' : req.body.role
    }

   if(req.body.password){
    userData.password = req.body.password.trim()
   }


    //wasted lots of time getting this promise chain to work
    var promise = authValidation(userData, 'usersAdmin')
    .then((errorMessage)=>{ if(errorMessage.errors)
        throw errorMessage
        else {
        //only encrypt password if the user submits a new one
            if(userData.password){
        //encrypt the password here because findOneAndUpdate doesn't support middleware
                userData.password = bcrypt.hashSync(userData.password , 10)
                }
            return userData}})
    .then(()=>{return User.findOneAndUpdate({_id: req.body._id}, userData).exec()})
    .then((user)=>{
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user)
        })
    .catch((err)=>{
        console.log(err.errors)
        if(err.errors)errorMessage=err
        if(err.name === 'MongoError' && err.code === 11000)
            {errorMessage.usersAdmin.email = 'Sorry this email address is already being used'}
        res.status(401).json(errorMessage)
        })
    })


.delete((req, res)=>{
    // console.log('Gonna delete ' + JSON.stringify(req.body))
    var promise = User.findByIdAndRemove(req.body._id).exec()
    .then(()=>{
        res.setHeader('Content-Type', 'application/json')
        res.json({deleted:'ok'})
        })
    .catch((err)=>{
        console.log('error ' + err)
        })
        
})



module.exports = router