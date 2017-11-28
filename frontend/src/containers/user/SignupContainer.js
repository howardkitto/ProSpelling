import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createUser,
        serviceMessage} from '../../redux/actionCreators'
import authValidation from '../../utils/authValidation'
import SignupForm from '../../components/SignupForm'

class SignupContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            user:{
            email:'',
            password:'',
            displayName:''}
        }
    this.saveUser = this.saveUser.bind(this);
    }

    onChange(e){
        let user = this.state.user
        user[e.target.name] = e.target.value
        this.setState({user:user})
    }

    saveUser(){

        // this.props.createUser(this.state.user)

        authValidation(this.state.user, 'signUpForm')
        .then((errorMessage)=>{
            if(errorMessage.errors === true)
                this.props.serviceMessage(errorMessage)
            else this.props.createUser(this.state.user)
        })     
    }

    render(){
    
    const{errors}=this.props

        return(<div className="adminContainer">
                <div className="userForm">
                <SignupForm onChange={(e)=>this.onChange(e)}
                            saveUser={this.saveUser}
                            serviceMessage={errors}/>
                </div>
                </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        errors: state.serviceMessage.signUpForm
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
           createUser: (user)=>dispatch(createUser(user)),
           serviceMessage:(error)=>dispatch(serviceMessage(error))
          }
  }

  SignupContainer.PropTypes = {
    serviceMessage :PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)