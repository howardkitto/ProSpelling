import React, { Component } from 'react';


import a from './audio/a.mp3'
import e from './audio/e.mp3'
import i from './audio/i.mp3'
import o from './audio/o.mp3'
import u from './audio/u.mp3'
import hand from './images/righthandoutline.png'

import Letter from './letter'


class LessonOneContainer extends Component{

    playSound(theSrc){
        this.audioPlayer.src = theSrc
        this.audioPlayer.play()
      }
    
    stopSound(){
      this.audioPlayer.pause()
    }
    
      renderLetter(text, audio){
        return(
          <Letter text={text}
          mouseEnter={()=>this.playSound(audio)}
          mouseLeave={()=>this.stopSound()}
          />
        )
      }

render(){

    return(
<div>
        <div className="page-header">
        <h1>Short Vowel Sounds</h1>      
      </div>
            <div className="row">
      <div className="a_box"> {this.renderLetter('a', a)}</div>
      <div className="e_box"> {this.renderLetter('e', e)}</div>
      <div className="i_box"> {this.renderLetter('i', i)}</div>
      <div className="o_box"> {this.renderLetter('o', o)}</div> 
      <div className="u_box"> {this.renderLetter('u', u)}</div> 
    </div>
            <audio type="audio/mpeg"
            ref={(audio) => { this.audioPlayer = audio; }}/>
    <img src={hand} alt='hand'/>
    
          </div>  
          

        )
    }

}

export default LessonOneContainer