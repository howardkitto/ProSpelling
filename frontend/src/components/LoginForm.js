import React from 'react'
import PropTypes from 'prop-types'

import {Form,
        FormGroup,
        Label,
        Input,
        Button} from 'reactstrap'

const LoginForm = (props)=>{

    const{onChange, login, serviceMessage}=props
    
    return(
        <div>
            <h1>Use this Form to Login</h1>
            {serviceMessage}
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email"
                    onChange={(e)=>onChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password"
                    onChange={(e)=>onChange(e)} />
                </FormGroup>                
                <Button color='success'
                        onClick={login}>
                        Login</Button>
            </Form>
        </div>
    )
}

LoginForm.PropTypes = {
    onChange: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    serviceMessage :PropTypes.string
}

export default LoginForm