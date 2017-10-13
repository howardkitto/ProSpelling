import React, { Component } from 'react';

import HomeContainer from './HomeContainer'
import LessonOneContainer from './LessonOneContainer'
// import LessonTwoContainer from './LessonTwoContainer'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'


import './css/App.css'

class App extends Component {
  render() {
    return (
      
      <Router>
      <div className="container">
    
      <nav className="navbar navbar-dark bg-dark">
            <Link className="nav-item nav-link active"to="/">Home</Link>
            <Link className="nav-item nav-link" to="/lessonone">Lesson One</Link>
            {/* <Link className="nav-item nav-link" to="/lessontwo">Lesson Two</Link> */}
        </nav>


        <Route exact path="/" component={HomeContainer}/>
        <Route path="/lessonone" component={LessonOneContainer}/>
        {/* <Route path="/lessontwo" component={LessonTwoContainer}/> */}
        </div>  
    </Router>
    
    );
  }
}

export default App;
