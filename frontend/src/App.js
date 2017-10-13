import React, { Component } from 'react';

import HomeContainer from './HomeContainer'
import LessonOneContainer from './LessonOneContainer'

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
        
        <Link to="/">Home</Link>
        <Link to="/lessonone">Lesson One</Link>
        
        <Route exact path="/" component={HomeContainer}/>
        <Route path="/lessonone" component={LessonOneContainer}/>
        </div>  
    </Router>
    
    );
  }
}

export default App;
