import React, { Component } from 'react';


import Nav from './containers/Nav'
import HomeContainer from './containers/HomeContainer'
import LessonOneContainer from './containers/LessonOneContainer'
import LessonTwoContainer from './containers/LessonTwoContainer'
import EnvTest from './containers/EnvTest'

import { Provider } from 'react-redux';
import store from './redux/store'

import {
    BrowserRouter as Router,
    Route
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
          <Route exact path="/" component={HomeContainer}/>
          <Route path="/lessonone" component={LessonOneContainer}/>
          <Route path="/lessontwo" component={LessonTwoContainer}/>
          <Route path="/envTest" component={EnvTest}/>
        </Container>  
      </Router>
    </Provider>
    );
  }
}

export default App;
