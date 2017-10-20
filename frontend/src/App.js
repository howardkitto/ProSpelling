import React, { Component } from 'react';

import HomeContainer from './containers/HomeContainer'
import LessonOneContainer from './containers/LessonOneContainer'
import LessonTwoContainer from './containers/LessonTwoContainer'

import { Provider } from 'react-redux';
import store from './redux/store'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'


import './css/App.css'


class App extends Component {

  constructor(){
    super()
    this.state={
      message: ''
    }
  }

  componentDidMount(){

    fetch('helloworld', {
      accept: "application/json"
    })
    .then((res)=>res.json())
    .then((data)=>{this.setState({message:data.message})})
    .catch((error)=>{console.log(error)})
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="container">
      
        <nav className="navbar navbar-dark bg-dark">
              <Link className="nav-item nav-link active"to="/">Home</Link>
              <Link className="nav-item nav-link" to="/lessonone">Lesson One</Link>
              <Link className="nav-item nav-link" to="/lessontwo">Lesson Two</Link>
              <p>{this.state.message}</p>
          </nav>

          <Route exact path="/" component={HomeContainer}/>
          <Route path="/lessonone" component={LessonOneContainer}/>
          <Route path="/lessontwo" component={LessonTwoContainer}/>
          </div>  
      </Router>
    </Provider>
    );
  }
}

export default App;
