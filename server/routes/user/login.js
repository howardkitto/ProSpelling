const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
const authValidation = require('../../utils/authValidation')

router.route('/')
.post((req, res) => {
  
    const loggerIn = {
                      email:req.body.email.trim().toLowerCase(),
                      password: req.body.password.trim(),
                      userId:'',
                      displayName:''}

    console.log('got this logger'+ loggerIn.email)

    const errors = {errors:true,
                    loginform:{
                      message:'Ooops that didn\'t work',
                      email:'',
                      password:''
                    }}
    const notFound = 'User not found'
    const wrongPassword = 'Password not Correct'
    let payload = {userId:''}

    let promise = authValidation(loggerIn, 'loginform')
    .then((errorMessage)=>{if(errorMessage.errors)throw errorMessage})
    .then(_=>User.findOne({'email':loggerIn.email}).exec())
    .then((user)=>{ if(user){
                        console.log("found user " +user) 
                        payload.userId = user._id
                        payload.role = user.role
                        loggerIn.userId = user._id
                        loggerIn.displayName = user.displayName
                        loggerIn.role = user.role
                        return user}
                    else {errors.loginform.email = notFound
                      throw errors}})
    .then((user)=>{return user.comparePassword(loggerIn.password)})
    .then((isMatch)=>{if(!isMatch){
                        errors.loginform.password = wrongPassword 
                        throw errors}})
    .then(()=>{return jwt.sign(payload, process.env.JWT_SECRET)})
    .then((token)=>{res.json({  'token':token,
                                'userId':loggerIn.userId,
                                'role': loggerIn.role,
                                'displayName':loggerIn.displayName })})
    .catch((errors)=>{console.log(errors)
                      res.status(401).json(errors)})
  });

  module.exports = router