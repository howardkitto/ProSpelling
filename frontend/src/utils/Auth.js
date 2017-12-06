
import {removeToken, synchUser} from '../redux/actionCreators'


//store the jwt and a time stamp in localstorage
export const authenticateUser= (user, store) => {
        // console.log('store got '+JSON.stringify(user))
        if((user.token))
            {   
                Object.keys(user).map((key, value)=>localStorage.setItem(key, user[key]))
                localStorage.setItem('tokenTimeStamp', new Date())
                
        //remove the token from redux to stop the local store from being overwritten          
            store.dispatch(removeToken())
        }

        if(user.logOut){
            localStorage.clear()
        }

        if(localStorage.tokenTimeStamp && !user.tokenTimeStamp)
            {   store.dispatch(synchUser(localStorage))}
      }
    
 export const isUserAuthenticated= ()=> {
     console.log('authenticating')
        return localStorage.getItem('token') !== null;
      }

    