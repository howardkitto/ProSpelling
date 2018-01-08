const express = require('express');
var bcrypt = require('bcrypt');

const router = new express.Router();
const User = require('../../models/User')
const authValidation = require('../../utils/authValidation')

const errorMessage = {    errors:true,
    usersAdmin:{
        message: 'some error'
        }}

const genericError = "Error Getting Users From Database"
const encryptionError = "Encryption went wrong"

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


    
    var promise = authValidation(userData, 'usersAdmin')
    .then((errorMessage)=>{ if(errorMessage.errors)
        {errorMessage.usersAdmin.message = genericError
        throw errorMessage}
        else {
            if(userData.password){
                userData.password = bcrypt.hashSync(userData.password , 10)
                console.log('encPassword ' + userData.password)}
            return userData}})
    .then(()=>{return User.findOneAndUpdate({_id: req.body._id}, userData).exec()})
    .then((user)=>{
        console.log(user)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user)
        })
    .catch((err)=>{
        console.log(errorMessage)
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