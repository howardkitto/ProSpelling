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
      <div className="explanationText"><p>
      ProSpelling will help you to learn to spelling by using a unique teaching method and the latest technology.</p>
      <p>Make sure that your speakers and microphone are switched on!</p>
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
    // spellerName: state.speller.name
  }
}

export default connect(mapStateToProps)(HomeContainer)

