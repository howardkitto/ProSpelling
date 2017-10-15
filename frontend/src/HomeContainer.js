import React, { Component } from 'react';
import rosie from './audio/Rosie.mp4'
import {connect} from 'react-redux'
import {saveName} from './redux/actionCreators'

var context

class HomeContainer extends Component{

  constructor(){
    super()
      this.state = {
        name:''
      }
  }

startVideo(){
  this.sourceVideo.play()
  
  this.updateCanvas()
}

componentDidMount(){
  context = this.videoCanvas.getContext("2d") 

  // this.startVideo()

  this.sourceVideo.play()
  
  this.updateCanvas()
}

updateCanvas(){
    
   //wasted some time here - check the video element is still available
    if(this.sourceVideo){
      context.drawImage(this.sourceVideo, 0, 0, this.sourceVideo.videoWidth, this.sourceVideo.videoHeight) 
    requestAnimationFrame(_=>{this.updateCanvas()})

    }
  }  

render(){

    return(

  <div className="container">
      <div className="jumbotron">
        <h1 className="display-3">Hello, {this.props.spellerName}</h1>
        <p className="lead">Video Version</p>
        
      </div>
      <video  src={rosie} 
              type="video/mp4"
              className="video"
              ref={(video) => { this.sourceVideo = video; }}
              
              loop muted autoPlay hidden playsInline
              />
      <canvas   className="videoCanvas"
                ref={(canvas) => { this.videoCanvas = canvas; }} 
              />
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