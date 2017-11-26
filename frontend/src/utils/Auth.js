import {removeToken} from '../redux/actionCreators'

//store the jwt and a time stamp in localstorage
export const authenticateUser= (token, store) => {
        
        if((token.token))
            {   localStorage.setItem('token', token.token)
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
    