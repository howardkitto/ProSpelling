const express = require('express');
var bcrypt = require('bcrypt');

const router = new express.Router();
const User = require('../../models/User')
const authValidation = require('../../utils/authValidation')

let errorMessage = {    errors:true,
    usersAdmin:{
        message: 'some error'
        }}

router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    let userCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    let counter = ()=>{
        return User.count().exec()
        .then((c)=>{return c})
        .catch((err)=>console.log(err))
     }

     counter()
     .then((c)=>userCount = c)

     let promise = User.find().exec()
        .then((users)=>users.sort((a, b) => {
            a = new Date(a.updatedAt);
            b = new Date(b.updatedAt);
            return a>b ? -1 : a<b ? 1 : 0;
        }))
        .then((users)=>{
            let sliced = users.slice(skip, skip+limit)
            return sliced
        })
        .then((users)=>{
            return users.map((user)=>
                {   user.password = undefined
                    return user}
            )
        })
        .then((users)=>{
            let userList = {}
            userList.count = userCount
            userList.users = users
            res.setHeader('Content-Type', 'application/json')
            res.json(userList)
            })
        .catch((err)=>{
            console.log('error ' + err)
            res.status(500).json(errorMessage)
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