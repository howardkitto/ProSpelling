import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveName} from './redux/actionCreators'

import Video from './Video'
import rosie from './video/Rosie.mp4'

class HomeContainer extends Component{


render(){

  return(

    <div className="container">
      <div className="jumbotron">
        <h1 className="display-3">Hello, {this.props.spellerName}</h1>
        <p className="lead">Video Version</p>    
      </div>
      <Video src={rosie}/>
  </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    spellerName: state.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
          name : dispatch(saveName('Rosie the Cat'))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)