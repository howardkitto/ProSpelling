import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveAnswer,
        gotAnswer,
        tryAgain,
        changeQuestionState,
        // changeSpellingTestState,
        saveProgress
        } from '../redux/actionCreators'

import prepareResult from '../utils/prepareResult'

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
    if (this.state.speechConfidence > 0.9)
        return<div className = "transcript" 
                    style={{color:'green'}} >{this.props.answer}</div>
    else if (this.state.speechConfidence > 0.8)
        return<div className = "transcript" 
                style={{color:'organge'}}>{this.props.answer}</div>
    else 
        return<div className = "transcript" 
                    style={{color:'red'}}>{this.props.answer}</div>
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
        return <div className="listeningText">Listening</div>
    else if(!this.state.listening && !this.props.answer)
        return<div className="listeningText">I didn't hear anything = click restart</div>
    else if(this.state.resultIsFinal)
        return <button className='btn btn-success'
        onClick={()=>this.checkAnswer()}>Check your answer</button>
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

                <button className='btn btn-info'
                        onClick={_=>this.toggleTextOrSpeech()}>Switch to Text</button>
                <button className='btn btn-primary'
                        onClick={_=>this.setUpSpeechRecog('reset')}>Restart</button>
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
                    
                    {(recognition) ?
                    <div>
                    <button className='btn btn-info'
                            onClick={_=>this.toggleTextOrSpeech()}>Switch to Speech</button>
                    </div>
                    : null}

                    {(this.props.answer)?
                    <div>
                <button className='btn btn-success'
                        onClick={()=>this.checkAnswer()}>Click here when you think you've got it</button>
                    </div>:
                    null}
                    
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
            // changeSpellingTestState : (spellingTestState)=>dispatch(changeSpellingTestState(spellingTestState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnswerContainer)
