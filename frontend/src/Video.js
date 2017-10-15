//Special Video Container

import React, { Component }from 'react'
import PropTypes from 'prop-types'

var context

class Video extends Component{

    componentDidMount(){
        context = this.videoCanvas.getContext("2d") 
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
        return( <div>
            <video  src={this.props.src} 
            type="video/mp4"
            className="video"
            ref={(video) => { this.sourceVideo = video; }}
            
            loop muted autoPlay hidden playsInline
            />
    <canvas   className="videoCanvas"
              ref={(canvas) => { this.videoCanvas = canvas; }} 
            />
            </div>)
        
}


}

export default Video

Video.propTypes = {
    src: PropTypes.string.isRequired
}




