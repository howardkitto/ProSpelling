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
    const errorMessage = {    errors:true,
                                signUpForm:{
                                    message: 'Check the form for errors'
                                    }}
    const userDbObj = new User(newUser)
    let payload = {userId:''}

    //validate input
    let promise = authValidation(newUser, 'signUpForm')
    //thrown an error if validation failed
    .then((errorMessage)=>{ if(errorMessage.errors)
                                throw errorMessage
                            else return newUser})
    //save the new user
    .then(()=>{return userDbObj.save()})
    .then((user)=>{ newUser.role = user.role
                    return jwt.sign({    userId:user._id,
                                        role:user.role}, process.env.JWT_SECRET)})
    .then((token)=>res.json({   'token':token,
                                'role': newUser.role,
                                'displayName':newUser.displayName}
                            ))
    .catch((error)=>{
        console.log('signup error '+error)
        if(error.name === 'MongoError' && error.code === 11000)
            {errorMessage.signUpForm.email = 'Sorry this email address is already being used'}
        else{errorMessage.signUpForm.message = 'Server Error'}
        res.status(401).json(errorMessage)})
})

module.exports = router
        
