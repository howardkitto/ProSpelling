import React, { Component } from 'react';

const speechSupported = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = speechSupported ? new speechSupported() : null

                
class Speech extends Component  {

    constructor(){
        super()

        this.state = {
            listening : false,
            transcript : 'text'
        }
    }

setUpSpeechRecog(){
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 5
    recognition.start()
    recognition.onstart = event =>this.setState({listening:true});
    recognition.onresult = event =>this.setState({transcript : event.results[0][0].transcript})
    recognition.onspeechend = event =>this.setState({listening:false});
}

componentDidMount(){

    if(recognition) this.setUpSpeechRecog()
    
}
    
render(){
    return(
        (recognition) ?
        <div>
            <h1>{this.state.transcript}</h1>
           {this.state.listening ? 
           <h2>listening</h2>:
           <button onClick={_=>this.setUpSpeechRecog()}>Restart</button>}
        </div>:
        <h1>You don't got Speech</h1>
    )
}

}

export default Speech