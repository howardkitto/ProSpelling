const User = require('../models/User')
const jwt = require('jsonwebtoken');

const authError = {         errors:true,
                            authorization:{
                            message: 'You need to login'}}

const checkForHeader = (req) => {
    return new Promise((resolve, reject) =>{
        authError.authorization.noToken = 'No Token Found'
        if(!req.headers.authorization)
            reject(authError.authorization.noToken)
        else
            resolve(req.headers.authorization.split(' ')[1])
            })
}

/**
 *  The Auth Checker middleware function.
 */
module.exports = function(permissions){

    //this pattern allows the middleware to take parameters
    return (req, res, next) => {
    
    console.log('jwtVerify ' + permissions)
    if (!req.headers.authorization) {
            authError.authorization.noToken = 'No Token Found'
            return res.status(401).send(authError);
          }
    else{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { 
                authError.authorization.badToken = 'Token not Valid'
                return res.status(401).send(authError) 
            }
            User.findById(decoded.userId, (err, user) => {
                console.log(    'token role '+decoded.role+
                                ' database role ' + user.role)
                if (err|| !user) { 
                    authError.authorization.badToken = 'User Not Found'
                    return res.status(401).send(authError) 
                }

                if (decoded.role !== user.role) { 
                    authError.authorization.badToken = 'Permissions Have Changed - Log in again'
                    return res.status(401).send(authError) 
                }

                if(!permissions.find(
                    (permission)=>{return permission === decoded.role}))
                    {authError.authorization.badToken = 'Insufficient Permission'
                    return res.status(401).send(authError) }
        
                next()
                
            })      
            
        })
        
        }
}
}

