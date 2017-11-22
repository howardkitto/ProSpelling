import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import {Button} from 'reactstrap'

import Video from './Video'

class HomeContainer extends Component{

  constructor(){
    super()
    this.state={
      clickToPlay:false
    }
  }


checkAutoplay()
{
  var promise = document.querySelector('video').play();
  
  if (promise !== undefined) {
      promise.catch(error => {
        console.log('false')
          return false
      }).then(() => {
        console.log('true')
          return true
      });
  }
}

componentDidMount(){
  this.setState({clickToPlay:this.checkAutoplay()})
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
      {(this.state.showStartScreen)?
      <div>Show start button</div>:
      <div><Video src= 'https://s3-us-west-2.amazonaws.com/prospelling/video/test4.mp4'
            showPlayButton={this.state.clickToPlay}/></div>}
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



   {/* 
        <div>Click here to start</div>:
        <div>
          <div className="letsStart">
             <div className="letsStartText">
                <h1>Welcome to Pro Spelling</h1>
             </div>
             <LetsStartButton />
           </div>
           
         </div>} */}