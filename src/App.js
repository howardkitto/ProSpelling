import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css'
// import horse from './audio/horse.mp3'
import a from './audio/a.mp3'
import e from './audio/e.mp3'
import i from './audio/i.mp3'
import hand from './images/righthandoutline.png'

import Letter from './letter'

class App extends Component {

  constructor(props) {
    super(props);
  }

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
        <div className="jumbotron">
          {this.renderLetter('a', a)}
          {this.renderLetter('e', e)}
          {this.renderLetter('i', i)}
        </div>
<img src={hand} alt='hand'/>

      </div>
    );
  }
}

export default App;
