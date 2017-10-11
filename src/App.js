import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css'
// import horse from './audio/horse.mp3'
import a from './audio/a.mp3'
import e from './audio/e.mp3'
import i from './audio/i.mp3'
import o from './audio/o.mp3'
import u from './audio/u.mp3'
import hand from './images/righthandoutline.png'

import Letter from './letter'

class App extends Component {



  playSound(theSrc){
    this.audioPlayer.src = theSrc
    this.audioPlayer.play()
  }

  renderLetter(text, audio){
    return(
      <Letter text={text}
      playSound={()=>this.playSound(audio)}/>
    )
  }

  render() {
    return (
      <div className="container">
        <audio type="audio/mpeg"
        ref={(audio) => { this.audioPlayer = audio; }}/>
        
         <div className="a_box"> {this.renderLetter('a', a)}</div>
         <div className="e_box"> {this.renderLetter('e', e)}</div>      
         <div className="i_box"> {this.renderLetter('i', i)}</div>  
         <div className="o_box"> {this.renderLetter('o', o)}</div>  
         <div className="u_box"> {this.renderLetter('u', u)}</div>  
        
<img src={hand} alt='hand'/>

      </div>
    );
  }
}

export default App;
