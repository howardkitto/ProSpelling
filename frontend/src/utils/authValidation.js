import validator from 'validator'

const authValidation = (user, context)=>{
    // console.log('validating ' + user +' '+context)

    return new Promise((resolve, reject)=>{
        let errorMessage = {    'errors': false,
                                    [context]:{
                                    'message': 'Check the form for errors'}}

        //check email address using validator                            
        if (!user.email==='' || typeof user.email !== 'string' || !validator.isEmail(user.email))       
            {   errorMessage.errors = true
                errorMessage[context].email = 'Please provide a correct email address'
            }           

        if (!user.password==='' || typeof user.password !== 'string' || user.password.trim().length < 8) 
            {   errorMessage.errors = true
                errorMessage[context].password = 'Password must have at least 8 characters.';
            }
        if(context==='signUpForm' && user.displayName.trim().length<1)
        {   errorMessage.errors = true
            errorMessage[context].displayName = 'Display Name is Required.';
        }


    resolve(errorMessage)
    })
}
    export default authValidation



// let errorMessage = {    'errors': false,
//                         [context]:{
//                             'message': 'Check the form for errors'}}

// //check email address using validator                            
// if (!user.email==='' || typeof user.email !== 'string' || !validator.isEmail(user.email))       
// {   errorMessage.errors = true
//     errorMessage[context].email = 'Please provide a correct email address'
// }

// if (!user.password==='' || typeof user.password !== 'string' || user.password.trim().length < 8) {
//     errorMessage.errors = true
//     errorMessage[context].password = 'Password must have at least 8 characters.';
//   }

// return errorMessage

// }


