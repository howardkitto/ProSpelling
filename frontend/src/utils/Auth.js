
import {synchUser} from '../redux/actionCreators'


//store the jwt and a time stamp in localstorage
export const authenticateUser= (user, store) => {
        //if the user has just signedUp or logged in set the local storage

        console.log('user ' + user.length)
        
        if((user.signUpSuccess || user.logInSuccess))
            {   
                Object.keys(user).map((key, value)=>localStorage.setItem(key, user[key]))
                localStorage.setItem('tokenTimeStamp', new Date())
                // localStorage.removeItem('logInSuccess')

            // store.dispatch(synchUser(localStorage))
        }

        //populate redux from the local store, test that the user object has anything in it
        if(localStorage.tokenTimeStamp && user.length==0)
            {   console.log('synching')
                store.dispatch(synchUser(localStorage))}
        
        if(user.logOut){
            localStorage.clear()
        }
      }
    
 export const isUserAuthenticated= ()=> {
     console.log('authenticating')
        return localStorage.getItem('token') !== null;
      }

    