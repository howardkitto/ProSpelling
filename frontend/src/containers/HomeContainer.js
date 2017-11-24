import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import {Button} from 'reactstrap'

class HomeContainer extends Component{

render(){

  const LetsStartButton = withRouter(({ history}) => (
    <Button
      className="startButton"
      onClick={() => { history.push('/phaseoneassessment') }}
    >
      Click Here to Start!
    </Button>
  ))

  return(
    <div>
      <div className="homepageContent">
       <h1>Welcome to Pro Spelling</h1>
        <div>
        <LetsStartButton />
        </div>
      </div>
      <video autoPlay muted loop playsInline id="myVideo">
        <source src= 'https://s3-us-west-2.amazonaws.com/prospelling/video/Homepage1/playlist.m3u8' type="application/x-mpegurl"/>
        <source src= 'https://s3-us-west-2.amazonaws.com/prospelling/video/test4.mp4' type="video/mp4"/>
      Browser doesn't support html5 video
      </video>
      
      </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    spellerName: state.speller.name
  }
}

export default connect(mapStateToProps)(HomeContainer)

//put this in to show the states
//<div className="stateDisplay">  <div>spellingTest: {this.props.spellingTestState}</div>
//                                                <div>question: {this.props.questionState}</div>
//                </div>