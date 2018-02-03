import {synchUser} from '../redux/actionCreators'


//store the jwt and a time stamp in localstorage
export const authenticateUser= (user, store) => {
        
        //if the user has just signedUp or logged the local storage
        
        if((!localStorage.logInSuccess||localStorage.signUpSuccess)
            &&(user.signUpSuccess || user.logInSuccess))
            {   
                Object.keys(user).map((key, value)=>localStorage.setItem(key, user[key]))
                localStorage.setItem('tokenTimeStamp', new Date())
        }

        //populate redux from the local store, test that the user object has anything in it
        if(localStorage.tokenTimeStamp && user.length===0)
            {   
                store.dispatch(synchUser(localStorage))}
        
        if(user.logOut){
            localStorage.clear()
        }
      }
    
 export const isUserAuthenticated= ()=> {
    //  console.log('authenticating')
        return localStorage.getItem('token') !== null;
      }

    