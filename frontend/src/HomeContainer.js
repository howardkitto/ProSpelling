import React, { Component } from 'react';
import rosie from './audio/Rosie.mp4'

var context

class HomeContainer extends Component{

  constructor(){
    super()
      this.state = {
        videoHeight:180,
        videoWidth:320
      }
  }


startVideo(){
  this.sourceVideo.play()
  this.updateCanvas()
}

componentDidMount(){
  context = this.videoCanvas.getContext("2d") 

  this.startVideo()
}

updateCanvas(){
   //wasted some time here - check the video element is still available
    if(this.sourceVideo){
      context.drawImage(this.sourceVideo, 0, 0, this.state.videoWidth, this.state.videoHeight) 
    requestAnimationFrame(_=>{this.updateCanvas()})
    }
  }  

render(){

    return(

  <div className="container">
      <div className="jumbotron">
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">Video Version</p>
        {/* <button   className="warning"
                  onClick={_=>{this.startVideo()}}>Start Video </button> */}
      </div>
      <video  src={rosie} 
              type="video/mp4"
              className="video"
              ref={(video) => { this.sourceVideo = video; }} 
              loop muted autoPlay hidden playsInline
              />
      <canvas   className="videoCanvas"
                height={this.state.videoHeight}
                width={this.state.videoWidth}
                ref={(canvas) => { this.videoCanvas = canvas; }} 
              />
  </div>
        )
    }
}

export default HomeContainer