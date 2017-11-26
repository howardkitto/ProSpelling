const express = require('express');
const router = new express.Router();
const validator = require('validator');
const User = require('../../models/User')

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
  
    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }
  
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }
  
    if (!payload || typeof payload.displayName !== 'string' || payload.displayName.trim().length === 0) {
      isFormValid = false;
      errors.name = 'Please provide a display name.';
    }
  
    if (!isFormValid) {
      message = 'Check the form for errors.';
    }
  
    return {
      success: isFormValid,
      message,
      errors
    };
  }


router.route('/')
.post((req, res)=>{
    //check the form data

    const user = {
        email: req.body.email,
        password : req.body.password,
        displayName : req.body.displayName
    }

    const validationResult = validateSignupForm(user);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
      }
    
    const newUser = new User(user)
    newUser.save(function(err,data){
        if(err){
            
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                  success: false,
                  message: 'Check the form for errors.',
                  errors: {
                    email: 'This email is already taken.'
                  }
                });
              }
        res.send(err)}
        res.json(data)})
        
})

module.exports = router