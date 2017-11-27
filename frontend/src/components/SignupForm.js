import React from 'react'
import PropTypes from 'prop-types'

import {Form,
        FormGroup,
        Label,
        Input,
        Button,
        FormFeedback,
        Col} from 'reactstrap'

const SignupForm = (props)=>{

    const{onChange, saveUser, serviceMessage}=props
    
    return(
        <div>
            <h1>Use this Form to Sign Up</h1>
            <h3 className = "serviceMessage">
            {(serviceMessage)&&serviceMessage.message}
            </h3>
            <Form>
                <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="email" id="email"
                    onChange={(e)=>onChange(e)}
                    valid={serviceMessage&&serviceMessage.email&&false}/>
                    <FormFeedback>{serviceMessage&&serviceMessage.email }</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Password</Label>
                    <Col sm={10}>
                    <Input type="password" name="password" id="password"
                    onChange={(e)=>onChange(e)}
                    valid={serviceMessage&&serviceMessage.password&&false}/>
                    <FormFeedback>{(serviceMessage)&&serviceMessage.password }</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="displayName" sm={2}>Display Name</Label>
                    <Col sm={10}>
                    <Input type="displayName" name="displayName" id="displayName" 
                    onChange={(e)=>onChange(e)}
                    valid={serviceMessage&&serviceMessage.displayName&&false}/>
                    <FormFeedback>{(serviceMessage)&&serviceMessage.displayName }</FormFeedback>
                    </Col>
                </FormGroup>
                <Button color='success'
                        onClick={saveUser}>
                        Save</Button>
            </Form>
        </div>
    )
}

SignupForm.PropTypes = {
    onChange: PropTypes.func.isRequired,
    saveUser: PropTypes.func.isRequired,
    serviceMessage :PropTypes.string
}

export default SignupForm