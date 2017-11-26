import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from '../../redux/actionCreators'
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
        this.props.login(this.state.user)
    }

    render(){

        const{serviceMessage}=this.props

        return(
            <div className="adminContainer">
            <div className="userForm">
            <LoginForm onChange={(e)=>this.onChange(e)}
                    login={this.login}
                    serviceMessage={serviceMessage}/>
            
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        serviceMessage: state.serviceMessage.message
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
           login: (user)=>dispatch(login(user))
          }
  }

  LoginContainer.PropTypes = {
    serviceMessage :PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)