const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const authValidation = require('../../utils/authValidation')
const User = require('../../models/User')

router.route('/')
.post((req, res)=>{

    const newUser = {
        email: req.body.email.trim().toLowerCase(),
        password : req.body.password.trim(),
        displayName : req.body.displayName.trim()
    }
    const errors = {}
    const duplicateError = {    errors:true,
                                signUpForm:{
                                    message: 'Check the form for errors',
                                    email:'Sorry this email address is already being used'}}
    const userDbObj = new User(newUser)
    let payload = {userId:''}

    let promise = authValidation(newUser, 'signUpForm')
    .then((errorMessage)=>{ if(errorMessage.errors)
                                throw errorMessage
                            else return newUser})
    .then(()=>{return userDbObj.save()})
    .then((user)=>{return jwt.sign({    userId:user._id,
                                        role:user.role}, process.env.JWT_SECRET)})
    .then((token)=>res.json({   'token':token,
                                'displayName':newUser.displayName}
                            ))
    .catch((error)=>{
        if(error.name === 'MongoError' && error.code === 11000)
            {error = duplicateError}
        res.status(401).json(error)})
})

module.exports = router
        
