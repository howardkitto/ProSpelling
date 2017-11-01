import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveAnswer,
        changeQuestionState} from '../redux/actionCreators'

const speechSupported = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = speechSupported ? new speechSupported() : null

class AnswerContainer extends Component  {

    constructor(){
        super()
        this.state = {
            listening : false,
            useSpeech : false,
            speechConfidence: 0
        }
    }

answerWithConfidence(){
    if (this.state.speechConfidence > 0.9)
        return<div style={{color:'green'}} >{this.props.answer}</div>
    else if (this.state.speechConfidence > 0.8)
        return<div style={{color:'organge'}}>{this.props.answer}</div>
    else 
        return<div style={{color:'red'}}>{this.props.answer}</div>
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

    recognition.onstart=event=>this.setState({ listening:true,
                                                speechConfidence:1})
    recognition.onresult=event=>{this.props.saveAnswer(event.results[0][0].transcript)
                                 this.setState({speechConfidence : event.results[0][0].confidence})}
    recognition.onspeechend=event=>this.setState({listening:false});
}

toggleTextOrSpeech(){
    this.setState({useSpeech:!this.state.useSpeech},
            ()=>{if(!this.state.useSpeech){
                recognition.stop()
                this.textInput.value=(this.props.answer)?this.props.answer:''
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
                <div>{this.answerWithConfidence()}</div>
                {(this.state.listening)?
                    <div className="listeningText">Listening</div>:
                    <div className="listeningText">Not Listening</div>}
                <button className='btn btn-info'
                        onClick={_=>this.toggleTextOrSpeech()}>Switch to Text</button>
                <button className='btn btn-primary'
                        onClick={_=>this.setUpSpeechRecog('reset')}>Restart</button>
                <button className='btn btn-success'
                        onClick={_=>this.props.changeQuestionState('checkingAnswer')}>Click here when you think you've got it</button>
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
                    <button className='btn btn-success'
                        onClick={_=>this.props.changeQuestionState('checkingAnswer')}>Click here when you think you've got it</button>
                </div>
            )}
        }}

const mapStateToProps = state => {
    return {
      answer: state.question.answer,
      word: state.question.word
    }
  }

const mapDispatchToProps = dispatch => {
    return {
            saveAnswer : (answer) => dispatch(saveAnswer(answer)),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnswerContainer)
