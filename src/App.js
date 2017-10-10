import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css'
import horse from './audio/horse.mp3'

import Letter from './letter'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      letter: "h",
      sound: horse
    };
  }

  playSound(text){
    this.audioPlayer.play()
  }

  renderLetter(text){
    return(
      <Letter text={text}
      playSound={()=>this.playSound(text)}/>
    )
  }

  render() {
    return (
      <div className="container">
        <audio src={this.state.sound} type="audio/mpeg"
        ref={(audio) => { this.audioPlayer = audio; }}/>
        <div className="jumbotron">
          {this.renderLetter(this.state.letter)}
        </div>

      </div>
    );
  }
}

export default App;
