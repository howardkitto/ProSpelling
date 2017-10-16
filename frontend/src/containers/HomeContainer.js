import React, { Component } from 'react';
import {connect} from 'react-redux'

import Video from './Video'
import rosie from '../video/Rosie.mp4'

import UserDetailsForm from './UserDetailsForm'

class HomeContainer extends Component{


render(){

  return(

    <div className="container">
      {(this.props.spellerName)?
        <h1 className="display-3">Hello, {this.props.spellerName}</h1>:
        <UserDetailsForm headerText = "What is your name?  "/>}
        <Video  src={rosie}
              height = {180}
              width = {302}
              muted = {true}/>
      
  </div>
        )
    }
}



const mapStateToProps = state => {
  return {
    spellerName: state.name
  }
}

export default connect(mapStateToProps)(HomeContainer)