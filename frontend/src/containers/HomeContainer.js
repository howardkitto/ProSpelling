import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import dashPlayer from 'dashjs'

import {Button} from 'reactstrap'

class HomeContainer extends Component{

componentDidMount(){
  var player = dashPlayer.MediaPlayer().create();
  player.initialize(this.p, 
          'https://s3-us-west-2.amazonaws.com/prospelling/dash/homepage1/hptestplaylist.mpd')

}

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
      ProSpelling will help you to learn to spell by using a unique teaching method and the latest technology.</p>
      <p>Make sure that your speakers and microphone are switched on!</p>
      </div>

      <video  ref={(p)=>this.p=p}
              autoPlay muted loop playsInline id="myVideo">
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

