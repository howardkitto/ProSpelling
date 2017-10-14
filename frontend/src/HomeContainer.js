import React, { Component } from 'react';
import rosie from './audio/Rosie.mp4'

var context

class HomeContainer extends Component{

componentDidMount(){
  context = this.videoCanvas.getContext("2d")
  this.sourceVideo.play()
  this.updateCanvas(_=>{this.stopRoutingBug()})
}

updateCanvas(callback){
   //wasted some time here - check te video element is still available
    if(this.sourceVideo){
      context.drawImage(this.sourceVideo, 0, 0, 320, 180) 
    requestAnimationFrame(_=>{this.updateCanvas()})
    }
  }  

render(){

    return(

        <div className="container">
           <div className="jumbotron">
           <h1 className="display-3">Hello, world!</h1>
           <p className="lead">Video Version</p>
           </div>

      <video  src={rosie} 
              type="video/mp4"
              className="video"
              ref={(video) => { this.sourceVideo = video; }} 
              loop muted hidden
              />

      <canvas   className="videoCanvas"
                ref={(canvas) => { this.videoCanvas = canvas; }} />
  </div>

        )
    }

}

export default HomeContainer