import React, { Component } from 'react';
import {Provider} from 'react-redux'

import Nav from './containers/Nav'
import HomeContainer from './containers/HomeContainer'
import LessonOneContainer from './containers/LessonOneContainer'
import LessonTwoContainer from './containers/LessonTwoContainer'
import EnvTest from './containers/admin/EnvTest'
import NoMatch from './containers/NoMatch'
import Words from './containers/admin/Words'
import Assessments from './containers/admin/Assessments'

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
    console.log(history)

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <Container fluid>
          <Nav />
            <Switch>
              <Route exact path="/" component={HomeContainer}/>
              <Route path="/lessonone" component={LessonOneContainer}/>
              <Route path="/lessontwo" component={LessonTwoContainer}/>
              <Route path="/admin/words" component={Words}/>
              <Route path="/admin/assessments" component={Assessments}/>
              <Route path="/admin/envtest" component={EnvTest}/>
              <Route component={NoMatch}/>
            </Switch>
        </Container>  
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
