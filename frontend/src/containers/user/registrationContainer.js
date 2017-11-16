import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserDetailsForm from '../UserDetailsForm'

class registrationContainer extends Component{

    render(){
        const{spellerName}=this.props
        return(
            <div>
                <h1>Registration Form</h1>

             <div>{(spellerName)?
                <h3 className="display-3">Hello, {spellerName}</h3>:
                <UserDetailsForm headerText = "What is your name?  "/>}   </div>
        </div>        
        )
    }
}

const mapStateToProps = state => {
    return {
        spellerName: state.speller.name
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(registrationContainer) 