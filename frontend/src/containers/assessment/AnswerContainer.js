import React, { Component } from 'react';
import {connect} from 'react-redux'
import {    gotAnswer,
            saveAnswer,
            saveProgress,
            changeQuestionState,
            toggleSpeechText} from '../../redux/actionCreators'

import SpeechRecognition from './SpeechRecognition'            
import prepareResult from '../../utils/prepareResult'

import {Button} from 'reactstrap'

import Rocket from '../../images/rocket.png'
import Keyboard from '../../images/keyboard.png'
import Speak from '../../images/speak.png'


class AnswerContainer extends Component  {

    constructor(){
        super()
        this.state = {
            // useSpeech:true
        }
    }

    handleTypedAnswer(e){
        const lowerAnswer = e.target.value.toLowerCase()
        this.props.saveAnswer(lowerAnswer)
    }

    checkAnswer(e){
        e.preventDefault()
        const{word, answer} = this.props.question
    
        prepareResult(word, answer)
        .then((result)=>{
            //The result of this action is read in componentWillReceiveProps
            // console.log("prepareResult returned "+JSON.stringify(result)) 
            this.props.gotAnswer(result)       
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.skipMistakes==='true'&&nextProps.question.result){
            this.props.saveProgress(nextProps.question, this.props.user.userId, 'waitingToContinue')
        }

        //processing the result of async kicked off in checkAnswer()
        else if(nextProps.question.result==='correct'){
            // console.log('got result ' + nextProps.question.result)
            this.props.saveProgress(nextProps.question, this.props.user.userId, 'waitingToContinue')
        }
    
        else if(nextProps.question.result==='incorrect'){
            this.props.saveProgress(nextProps.question, this.props.user.userId, 'inProgress')
            this.props.changeQuestionState('tryAgain')
        }
    }

    componentDidUpdate(){
        if(this.textInput&&!this.props.useSpeech){            
            this.textInput.value=(this.props.question.answer)?this.props.question.answer:''
            }
        }
    

    render(){
        //speechSupported Prop is set in the nav bar
        const {speechSupported, useSpeech} = this.props
        // const {useSpeech} = this.state

        return  <span>
                    {speechSupported && !useSpeech &&
                        <span>
                            <Button onClick={()=>this.props.toggleSpeechText(true)}>
                            <img src={Speak} alt="Switch to Voice"/>
                            Switch to Voice
                            </Button>
                        </span>}
                    {speechSupported && useSpeech
                    ?
                        <span>
                            <Button onClick={()=>this.props.toggleSpeechText(false)}>
                            <img src={Keyboard} alt='Switch to Typing'/>
                            Switch to Typing</Button>
                            <SpeechRecognition/>                                            
                        </span>
                    :
                    <div>
                        <input type='text'
                        className="answerTextBox"
                        ref={(input)=>{this.textInput=input}}
                        autoFocus
                        autoComplete='off'
                        onChange={(e)=>{this.handleTypedAnswer(e)}}/>
                    </div>}
                    <div>                    
                        <Button type="submit" onClick={(e)=>this.checkAnswer(e)}>
                        <img src={Rocket} alt='next'/>Submit Answer</Button>
                        </div>
                </span>
    }
}

const mapStateToProps = state => {
    return {        
        useSpeech: state.user.useSpeech,
        question: state.currentQuestion,
        user: state.user,
        skipMistakes: state.spellingTest.assessment.skipMistakes,
        //this prop is being set in the nav container
        speechSupported : state.envProperties.speechSupported
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        toggleSpeechText: (value)=>dispatch(toggleSpeechText(value)),
        saveAnswer : (answer) => dispatch(saveAnswer(answer)),
        gotAnswer: (answer) => dispatch(gotAnswer(answer)),
        saveProgress : (question, userId, nextState) => dispatch(saveProgress(question, userId, nextState)),
        changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState)),
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnswerContainer)
