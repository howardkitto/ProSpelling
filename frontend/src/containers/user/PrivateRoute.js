import React from 'react'
import store from '../../redux/store'
import {
    Route,
    Redirect
  } from 'react-router-dom'

import {serviceMessage} from '../../redux/actionCreators'

const errorMessage = {  'errors': true,
                            permissions:{
                            'message': 'You do not have permission to see this page'}}

const PrivateRoute = ({ component: Component, ...rest, permissions }) =>{
    //if there is no token go to the login page
    if(!localStorage.token )
        {   return <Route {...rest} render={props =>(
                <Redirect to={{
                    pathname:'/login',
                    state: { from: props.location }
                }}/>
            )}/>
        }
    //if you don't have permissions show an error
    if(localStorage.token && !permissions.find((p)=>{return p===localStorage.role}))
        {   
            store.dispatch(serviceMessage(errorMessage))
            return null
        }
    //otherwise go to the page selected
    else{
        return <Route {...rest} render={props=>(<Component {...props}/>)}/>                
        }
}

export default PrivateRoute