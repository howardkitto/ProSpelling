//Special Video Container

import React, { Component }from 'react'
import PropTypes from 'prop-types'

var context

class Video extends Component{

    constructor(){
        super()
        this.state={
          windowWidth:window.innerWidth,
          windowHeight:window.innerWidth * 0.5625
        }
      }
    
    updateDimensions(e){
      const calcHeight = window.innerWidth * 0.5625
      this.setState({ windowWidth:window.innerWidth,
                      windowHeight:calcHeight})
      console.log(this.state.windowWidth + ' x ' + this.state.windowHeight)
    }


    componentDidMount(){
        window.addEventListener("resize", (e)=>this.updateDimensions(e));
        context = this.videoCanvas.getContext("2d") 
        this.sourceVideo.muted = this.props.muted
        this.sourceVideo.play()
        this.updateCanvas(this.state.windowWidth, this.state.windowHeight)
      }
      
      componentWillUpdate(nextProps){
      console.log('click to play?' + nextProps.clickToPlay) } 

      updateCanvas(){

         //wasted some time here - check the video element is still available
          if(this.sourceVideo){
            context.drawImage(this.sourceVideo, 0, 0, this.state.windowWidth, this.state.windowHeight) 
            // context.drawImage(this.sourceVideo, 0, 0, this.sourceVideo.videoWidth, this.sourceVideo.videoHeight) 
            requestAnimationFrame(_=>{this.updateCanvas(this.state.windowWidth, this.state.windowHeight)})
      
          }
        }

    render(){
        return( <div>
            {(this.props.clickToPlay)?<div>Cick to play</div>:null}
            <video  src={this.props.src} 
            type="video/mp4"
            className="video"
            ref={(video) => {this.sourceVideo = video }}
            loop hidden playsInline
            />
            <canvas   className="videoCanvas"
              ref={(canvas) => { this.videoCanvas = canvas; }}
              width = {this.state.windowWidth}
              height = {this.state.windowHeight}
            />
            </div>)
        
    }
}

export default Video

Video.propTypes = {
    src:PropTypes.string.isRequired,
    // height:PropTypes.number.isRequired,
    // width:PropTypes.number 
}




