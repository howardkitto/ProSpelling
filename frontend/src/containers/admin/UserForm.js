import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, FormFeedback, Label, Col, Input} from 'reactstrap'

import {editUser} from '../../redux/actionCreators'

class UserForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: this.props.user
        }
    }
 

    onChange(e){
        // console.log(e.target.name +' '+ e.target.value)
    
        const key = e.target.name
        const value = e.target.value
        
        let user = this.props.user
        user[key]=value

        this.setState({user})
    
        this.props.editUser(user)
      }
    
    updateRole(role){
        let user = this.props.user
        user.role = role
        this.setState({user})
        this.props.editUser(user)
    }

    render(){

        const {serviceMessage} = this.props
        const {user} = this.state
        return(
            <Form>
                <FormGroup row>
                    <Label for="email" sm={3}>
                    email
                    </Label>
                    <Col sm={9}>
                        <Input name="email"
                                value={user.email}
                                onChange={(e)=>this.onChange(e)}
                                valid={serviceMessage&&serviceMessage.email&&false}
                                />
                        <FormFeedback>{(serviceMessage)&&serviceMessage.email }</FormFeedback>
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label for="displayName" sm={3}>
                    Display Name
                    </Label>
                    <Col sm={9}>
                        <Input name="displayName"
                                value={user.displayName}
                                onChange={(e)=>this.onChange(e)}/>
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={3}>
                    Password
                    </Label>
                    <Col sm={9}>
                        <Input  type="password"
                                name="password"                                
                                onChange={(e)=>this.onChange(e)}
                                valid={serviceMessage&&serviceMessage.password&&false}/>
                        <FormFeedback>{(serviceMessage)&&serviceMessage.password }</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup tag="fieldset">
                <legend>Select Role</legend>
                <FormGroup check>
                    <Label for="role" check>
                    <Input type="radio" name="user"
                            onChange={(e)=>this.updateRole('user')}
                            checked={user.role==="user"?true:false}/>
                    User
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label for="role" check>
                    <Input type="radio" name="admin"
                            onChange={()=>this.updateRole('admin')}
                            checked={user.role==="admin"?true:false}/>
                    Admin
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label for="role" check>
                    <Input type="radio" name="disabled"
                            onChange={()=>this.updateRole('disabled')}
                            checked={user.role==="disabled"?true:false}/>
                    Disabled
                    </Label>
                </FormGroup>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.usersAdmin.user,
      serviceMessage:state.serviceMessage.usersAdmin 
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        editUser : (user) => dispatch(editUser(user))  
      
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)

