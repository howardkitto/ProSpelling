import React, { Component } from 'react';
import {connect} from 'react-redux'

import hand from '../images/righthandoutline.png'

import Letter from '../components/Letter'


class LessonOneContainer extends Component{


    playSound(letter){
        this.audioPlayer.src = this.playSound(`/audio/${letter}.mp3`)
        let playPromise = this.audioPlayer.play()
        //catch and surpress a bug in chrome
        if (playPromise !== undefined){
          playPromise.catch(error => {})
        }
      }
    
    stopSound(){
      this.audioPlayer.pause()
    }
    
    renderLetter(letter){
      return(
        <Letter text={letter}
        triggerSound={()=>this.playSound(letter)}
        mouseLeave={()=>this.stopSound()}
        />
      )
    }

render(){

    return( 
<div>
        <div className="page-header">
        <h1>Short Vowel Sounds</h1>
        
        {(this.props.spellerName)?<h2>Hello {this.props.spellerName}</h2>:null}
      </div>
            <div className="row">
      <div className="a_box"> {this.renderLetter('a')}</div>
      <div className="e_box"> {this.renderLetter('e')}</div>
      <div className="i_box"> {this.renderLetter('i')}</div>
      <div className="o_box"> {this.renderLetter('o')}</div> 
      <div className="u_box"> {this.renderLetter('u')}</div> 
    </div>
            <audio type="audio/mpeg"
            ref={(audio) => { this.audioPlayer = audio; }}
             />
    <img src={hand} alt='hand'/>
    
          </div>  
          

        )
    }

}

const mapStateToProps = state => {
  return {
    spellerName: state.name
  }
}

export default connect(mapStateToProps)(LessonOneContainer)