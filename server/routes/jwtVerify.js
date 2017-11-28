const User = require('../models/User')
const jwt = require('jsonwebtoken');

const authError = {         errors:true,
                            authorization:{
                            message: 'You need to login'}}

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

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
                if (err|| !user) { 
                    authError.authorization.badToken = 'User Not Found'
                    return res.status(401).send(authError) 
                }
            })      
        })
        return next()
        }
}
    

// 
    
//     if (err) { 
//         authError.authorization.badToken = 'Token not Valid'
//         return res.status(401).send(authError) 
//     }
    
//     
// return next();



  // get the last part from a authorization header string like "bearer token-value"
  

//   // decode the token using a secret key-phrase
//   return jwt.verify(token, config.jwtSecret, (err, decoded) => {
//     // the 401 code is for unauthorized status
//     if (err) { return res.status(401).end(); }

//     // const userId = decoded.sub;

    // // check if a user exists
    // return User.findById(userId, (userErr, user) => {
    //   if (userErr || !user) {
    //     return res.status(401).end();
    //   }

    //   return next();
    // });
//   });

