import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login,
        serviceMessage} from '../../redux/actionCreators'

import authValidation from '../../utils/authValidation'
import LoginForm from '../../components/LoginForm'

class LoginContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:{
            email:'',
            password:''}
        }
    this.login = this.login.bind(this);
    }

    onChange(e){
        let user = this.state.user
        user[e.target.name] = e.target.value
        this.setState({user:user})
    }

    login(){
        //client side validation

        // this.props.login(this.state.user)

        authValidation(this.state.user, 'loginform')
        .then((errorMessage)=>{
            if(errorMessage.errors === true)
                this.props.serviceMessage(errorMessage)
            else this.props.login(this.state.user)
        })        
    }

    render(){

        const{errors}=this.props

        return(
            <div className="adminContainer">
            <div className="userForm">
            <LoginForm  onChange={(e)=>this.onChange(e)}
                        login={this.login}
                        serviceMessage={errors}/>
            
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        errors: state.serviceMessage.loginform
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
           login: (user)=>dispatch(login(user)),
           serviceMessage:(error)=>dispatch(serviceMessage(error))
          }
  }

  LoginContainer.PropTypes = {
    serviceMessage :PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)