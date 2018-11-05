import React, { Component } from 'react';
import {Provider} from 'react-redux'

import Nav from './containers/Nav'
import ApiError from './containers/admin/ApiError'
import HomeContainer from './containers/HomeContainer'
import LessonOneContainer from './containers/LessonOneContainer'
import LessonTwoContainer from './containers/LessonTwoContainer'
import PhaseOneAssessment from './containers/assessment/PhaseOneAssessment'
import EnvTest from './containers/admin/EnvTest'
import NoMatch from './containers/NoMatch'
import Words from './containers/admin/Words'
import Users from './containers/admin/Users'
import UserTests from './containers/admin/UserTests'
import SpellingTest from './containers/admin/SpellingTest'
import Assessments from './containers/admin/Assessments'
import Patterns from './containers/admin/Patterns'
import SignupContainer from './containers/user/SignupContainer'
import LoginContainer from './containers/user/LoginContainer'

import PrivateRoute from './containers/user/PrivateRoute'

import {
    Route,
    Switch
  } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'
import store, {history} from './redux/store'

import {Container} from 'reactstrap'
import './css/App.css'

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <Container fluid>
        <ApiError />
          <Nav />
            <Switch>
              <Route exact path="/" component={HomeContainer}/>
              <Route path="/phaseoneassessment" component={PhaseOneAssessment}/>
              <Route path="/lessonone" component={LessonOneContainer}/>
              <Route path="/lessontwo" component={LessonTwoContainer}/>
              <Route path="/signup" component={SignupContainer}/>
              <Route path="/login" component={LoginContainer}/>
              <Route path="/admin/words" component={Words} permissions={['admin']}/>
              <Route path="/admin/users" component={Users} permissions={['admin']}/>
              <Route path="/admin/usertests/:userId" component={UserTests} permissions={['admin']}/>
              <Route path="/admin/spellingtests" component={SpellingTest} permissions={['admin']}/>
              <Route path='/admin/assessments' component={Assessments} permissions={['admin']}/>
              <Route path='/admin/patterns' component={Patterns} permissions={['admin']}/>
              <PrivateRoute path="/admin/envtest" component={EnvTest} permissions={['admin']}/>
              <Route component={NoMatch}/>
            </Switch>
        </Container>  
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
