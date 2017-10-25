import React, { Component } from 'react';


import Nav from './containers/Nav'
import HomeContainer from './containers/HomeContainer'
import LessonOneContainer from './containers/LessonOneContainer'
import LessonTwoContainer from './containers/LessonTwoContainer'
import EnvTest from './containers/admin/EnvTest'
import NoMatch from './containers/NoMatch'
import Words from './containers/admin/Words'

import { Provider } from 'react-redux';
import store from './redux/store'

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

import {Container} from 'reactstrap'
import './css/App.css'


class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Router>
        <Container fluid>
          <Nav />
            <Switch>
              <Route exact path="/" component={HomeContainer}/>
              <Route path="/lessonone" component={LessonOneContainer}/>
              <Route path="/lessontwo" component={LessonTwoContainer}/>
              <Route path="/admin/envtest" component={EnvTest}/>
              <Route path="/admin/words" component={Words}/>
              <Route component={NoMatch}/>
            </Switch>
        </Container>  
      </Router>
    </Provider>
    );
  }
}

export default App;
