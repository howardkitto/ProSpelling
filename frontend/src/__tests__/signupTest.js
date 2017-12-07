//login

//redirect to {from}
//change login to logout in nav
//set local storage
//set user in redux

//Logout

//remove user from local store
//remove user from redux
//change logout to login & sign up in nav

//sign up

//change nav link
//redirect to {from}

import React from 'react'
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import SignupContainer from '../containers/user/SignupContainer'

import SignupForm from '../components/SignupForm'

Enzyme.configure({ adapter: new Adapter() });

const updateUserInSTate = jest.fn()
const saveUserMock = jest.fn()
let errors = {}

const component = mount(
    <SignupForm onChange={updateUserInSTate}
    saveUser={saveUserMock}
    serviceMessage={errors}/>
)

component.find('button').simulate('click', { saveUserMock });



