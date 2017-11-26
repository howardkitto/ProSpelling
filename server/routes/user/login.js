const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

router.route('/')
.post((req, res) => {
 
    const email = req.body.email.trim()
    const password = req.body.password.trim()
    const notFound = 'User not found'
    const wrongPassword = 'Password not Correct'
    let payload = {userId:''}
    let userDeets = {  userId:'',
                  displayName:''}

    let promise = User.findOne({'email':email}).exec()
    .then((user)=>{ if(user){ 
                        payload.userId = user._id
                        userDeets.userId = user._id
                        userDeets.displayName = user.displayName
                        return user}
                    else {throw (notFound)}})
    .then((user)=>{return user.comparePassword(password)})
    .then((isMatch)=>{if(!isMatch){throw (wrongPassword)}})
    .then(()=>{return jwt.sign(payload, process.env.JWT_SECRET)})
    .then((token)=>{res.json({ 'token':token,
                                'userId':userDeets.userId,
                                'displayName':userDeets.displayName })})
    .catch((error)=>res.status(401).json({'message':error}))
  });

  module.exports = router