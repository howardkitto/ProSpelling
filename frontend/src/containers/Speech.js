import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveAnswer} from '../redux/actionCreators'

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
            useSpeech : false,
            speechConfidence: 0
        }
    }

setUpSpeechRecog(reset){
    if(reset){
        this.props.saveAnswer(null)
    }
    
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 5
    
    if(!this.state.listening){
        try{
            recognition.start()}
        catch(err){
            console.log('Started too soon')
            recognition.stop()
        }
    }

    recognition.onstart = event =>this.setState({listening:true});
    recognition.onresult = event => {this.props.saveAnswer(event.results[0][0].transcript)
                                    this.confidenceStyle(event.results[0][0].confidence)}
    recognition.onspeechend = event =>this.setState({listening:false});
}

confidenceStyle(confidenceScore){
    this.setState({speechConfidence:confidenceScore})
    if (confidenceScore > 0.9){
        this.speechResultDiv.style.color='green'}
    else if (confidenceScore > 0.8){
        this.speechResultDiv.style.color='orange'}
    else {
        this.speechResultDiv.style.color='red'
        }    
    }
    

toggleTextOrSpeech(){
    this.setState({useSpeech:!this.state.useSpeech},
            ()=>{if(!this.state.useSpeech){
                recognition.stop()
                this.textInput.value=this.props.answer
                }
                else{
                this.setUpSpeechRecog()    
                }

        })
}

handleTypedAnswer(e){
    this.props.saveAnswer(e.target.value)
}

componentDidMount(){

    if(recognition) {
        this.setState({useSpeech:true})
        this.setUpSpeechRecog()
        }
}
    
render(){
    switch(this.state.useSpeech){
        case (true) : 
            return (
                <div>
                <div    ref={(div)=>{this.speechResultDiv = div}}> 
                        {this.props.answer}</div>
                {(this.state.listening)?
                    <div className="listeningText">Listening</div>:
                    <div className="listeningText">Not Listening</div>}
                <button className='btn btn-info'
                        onClick={_=>this.toggleTextOrSpeech()}>Switch to Text</button>
                <button className='btn btn-primary'
                        onClick={_=>this.setUpSpeechRecog('reset')}>Restart</button>
                </div>
            )
        default :
            return (
                <div>Using Text
                        <input  type='text'
                                ref={(input)=>{this.textInput=input}}
                                autoFocus
                                className="answerTextBox"
                                onChange={(e)=>{this.handleTypedAnswer(e)}}
                        />

                    {(recognition) ?
                    <button className='btn btn-info'
                            onClick={_=>this.toggleTextOrSpeech()}>Switch to Speech</button>
                    : null}
                </div>
            )
    }
    
        }

}

const mapStateToProps = state => {
    return {
      answer: state.answer
    }
  }

const mapDispatchToProps = dispatch => {
    return {
            saveAnswer : (answer) => dispatch(saveAnswer(answer))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Speech)
