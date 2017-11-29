import {removeToken} from '../redux/actionCreators'

//store the jwt and a time stamp in localstorage
export const authenticateUser= (user, store) => {
        // console.log('store got '+JSON.stringify(user))
        if((user.token))
            {   localStorage.setItem('token', user.token)
                localStorage.setItem('role', user.role)
                localStorage.setItem('displayName', user.displayName)
                localStorage.setItem('tokenTimeStamp', new Date())
//remove the token from redux to stop the local store from being overwritten          
            store.dispatch(removeToken())
        }
      }
    
//  isUserAuthenticated() {
//         return localStorage.getItem('token') !== null;
//       }
    
//  deauthenticateUser() {
//         localStorage.removeItem('token');
//       }
    
//  getToken() {
//         return localStorage.getItem('token');
//       }
    