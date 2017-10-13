import React, { Component } from 'react';
import rosie from './audio/Rosiecomp.mp4'


class HomeContainer extends Component{




updateCanvas(){
  
}  

componentDidMount(){
  let context = this.videoCanvas.getContext("2d")  
  requestAnimationFrame(this.updateCanvas);

}  

render(){

    return(

        <div className="container">
           <div className="jumbotron">
           <h1 className="display-3">Hello, world!</h1>
           <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
           </div>

      <video src={rosie} type="video/mp4" className="video" autoPlay loop muted
              ref={(video) => { this.sourceVideo = video; }} />

      <canvas   className="videoCanvas"
                ref={(canvas) => { this.videoCanvas = canvas; }} />
  </div>
    
      

        )
    }

}

export default HomeContainer