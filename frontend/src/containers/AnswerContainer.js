import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveAnswer,
        gotAnswer,
        tryAgain,
        changeQuestionState,
        saveProgress
        } from '../redux/actionCreators'

import {Button} from 'reactstrap'

import prepareResult from '../utils/prepareResult'
import speak from '../images/speak.png'
import sad from '../images/sad.png'
import happy from '../images/happy.png'
import keyboard from '../images/keyboard.png'
import repeat from '../images/repeat.png'
import rocket from '../images/rocket.png'

const speechSupported = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = speechSupported && new speechSupported()

class AnswerContainer extends Component  {

    constructor(){
        super()
        this.state = {
            listening : false,
            useSpeech : false,
            speechConfidence: 0,
            resultIsFinal:false
        }
    }

answerWithConfidence(){
    // console.log('confidence score = ' + this.state.speechConfidence)
    if (this.state.speechConfidence > 0.9)
        return<div className = "transcript" 
                    style={{color:'green'}} >{this.props.answer}</div>
    else 
        return<div><div className = "transcript" 
                    style={{color:'red'}}>{this.props.answer}
                    </div>
                    {(!this.state.listening)&&
                    <div className="transcriptLowConfidence">
                        <p><img src={sad} alt='Retstart'/>I didn't hear you very well.</p>
                            <Button
                                onClick={_=>this.setUpSpeechRecog('reset')}>
                            <img src={repeat} alt='try again'/>
                            Click here if I got it wrong</Button>
                    </div>
                    }
                </div>
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
                                this.setState({resultIsFinal:event.results[0].isFinal})

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

checkAnswer(){
    prepareResult(this.props.word, this.props.answer)
    .then((result)=>{
        this.props.gotAnswer(result.yesOrNo, result.score)
        if(result.yesOrNo === 'correct')
            this.props.saveProgress(this.props.question, 'waitingToContinue')
        else{
            this.props.saveProgress(this.props.question, 'inProgress')
            this.props.changeQuestionState('tryAgain')}
    })
}

transcriptFeedback(){
    if(this.state.listening)
        return <div className="listeningText"><img src={speak} alt="Speak Now"/>Speak Now!</div>
    else if(!this.state.listening && !this.props.answer)
        return<div className="listeningText">I'm sorry I didn't hear anything. 
        <Button onClick={_=>this.setUpSpeechRecog('reset')}><img src ={repeat} alt='try again'/>Try Again</Button></div>
    else if(this.state.resultIsFinal)
        return <Button
        onClick={()=>this.checkAnswer()}><img src={rocket} alt='Next'/>Next</Button>
    else
        return <div className="listeningText">Wait</div>
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
                {this.transcriptFeedback()}
                <Button onClick={_=>this.toggleTextOrSpeech()}><img src={keyboard} alt='Switch to Typing'/>Switch to Typing</Button>
                <Button onClick={_=>this.setUpSpeechRecog('reset')}><img src ={repeat} alt='try again'/>Try Again</Button>
                </div>
            )
        default :
            return (
                <div>
                        <input  type='text'
                                ref={(input)=>{this.textInput=input}}
                                autoFocus
                                className="answerTextBox"
                                onChange={(e)=>{this.handleTypedAnswer(e)}}
                        />
                    
                    {(recognition) &&
                   
                    <Button className='btn btn-info'
                            onClick={_=>this.toggleTextOrSpeech()}>
                            <img src={speak} alt='switch to speech recognition'/>Switch to Speech</Button>
                    }

                    {(this.props.answer)&&
                    
                <Button
                        onClick={()=>this.checkAnswer()}>
                        <img src={rocket} alt='next'/>Next</Button>
                    }
                    
                </div>
            )}
        }}

const mapStateToProps = state => {
    return {
      answer: state.question.answer,
      word: state.question.word,
      question: state.question
    }
  }

const mapDispatchToProps = dispatch => {
    return {
            saveAnswer : (answer) => dispatch(saveAnswer(answer)),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState)),
            gotAnswer: (answer) => dispatch(gotAnswer(answer)),
            tryAgain : (answer) => dispatch(tryAgain(answer)),
            saveProgress : (question, nextState) => dispatch(saveProgress(question, nextState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnswerContainer)
