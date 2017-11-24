import React from 'react'
import PropTypes from 'prop-types'

import {Form,
        FormGroup,
        Label,
        Input,
        Button} from 'reactstrap'

const RegistrationForm = (props)=>{

    const{onChange, saveUser, serviceMessage}=props
    
    return(
        <div>
            {serviceMessage}
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="something@something.com"
                    onChange={(e)=>onChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password"
                    onChange={(e)=>onChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="displayName">Display Name</Label>
                    <Input type="displayName" name="displayName" id="displayName" 
                    onChange={(e)=>onChange(e)}/>
                </FormGroup>
                <Button color='success'
                        onClick={saveUser}>
                        Save</Button>
            </Form>
        </div>
    )
}

RegistrationForm.PropTypes = {
    onChange: PropTypes.func.isRequired,
    saveUser: PropTypes.func.isRequired,
    serviceMessage :PropTypes.string
}

export default RegistrationForm