import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import{
    tryAgain,
    changeQuestionState} from '../redux/actionCreators'

import AnswerContainer from '../containers/AnswerContainer'
import Rocket from '../images/rocket.png'
import Ear from '../images/ear.png'
import Repeat from '../images/repeat.png'
import Sad from '../images/sad.png'
// import spellingTest from '../redux/reducers/spellingTest';

class QuestionContainer extends Component{

    playSound(theSrc){
        //hide the introtext

        // console.log('playsound ' + theSrc)
        this.audioPlayer.src = theSrc
        let playPromise = this.audioPlayer.play()
        //catch and surpress a bug in chrome
        if (playPromise !== undefined){
          playPromise.catch(error => {})
        }
      }

      tryAgain(audioSrc){
        this.props.tryAgain()
        this.playSound(audioSrc)
      }

question(){

    const{progress, skipMistakes, wordsInAssessment}=this.props

    switch(this.props.questionState){
        case 'playing':
            return<Button 
                        onClick={()=>   this.playSound(this.props.audioFileName)}>
                        <img src={Ear} alt='Play the Sound Again'/>Listen!</Button>
        case 'loadingAudio':
            return<div className="loader"></div>
        case 'waitForAnswer':
            return <div className="questionContainer">
                <Button onClick={()=>this.playSound(this.props.audioFileName)}>
                <img src={Ear} alt='Play the Sound Again'/>Play the Sound Again
                </Button> 
                <AnswerContainer />                
                </div>
        case 'tryAgain':
            return  <div className="questionContainer"><img src={Sad} alt='Wrong Answer'/><h1>Oh Noes - that's not right</h1>
                        <Button onClick={()=>{this.tryAgain(this.props.audioFileName)}}>
                        <img src={Repeat} alt='Try Again'/>Wanna Try Again?</Button>
                    </div>
        default:
            var questionCount =(skipMistakes==='true')
            ?progress.length
            :progress.filter(attempt => attempt.result==='correct').length
            return  <Button
                        onClick={()=>{  
                                        this.playSound(this.props.audioFileName)                                        
                                    }}>                        
                        <img src={Rocket} alt='Click Here To Start'/> Click Here For Question &nbsp; 
                        {(this.props.progress.length===0)?1:questionCount
                        }&nbsp; of&nbsp;
                        {wordsInAssessment}
                    </Button>
        }
    }
    
    render(){
        return(
            <div>
            <div>{this.question()}</div>
            
            <audio type="audio/mpeg" 
            ref={(audio) => this.audioPlayer=audio}
            onLoadStart={()=>this.props.changeQuestionState('loadingAudio')}
            onPlaying={()=>this.props.changeQuestionState('playing')}
            onEnded={()=>this.props.changeQuestionState('waitForAnswer')}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        answer: state.currentQuestion.answer,
        word: state.currentQuestion.word,
        audioFileName: state.currentQuestion.audioFileName,
        result:state.currentQuestion.result,
        questionState:state.currentQuestion.questionState,
        spellingTestState:state.spellingTest.spellingTestState,
        progress:state.spellingTest.questions,
        wordsInAssessment:state.spellingTest.assessment.wordCount,
        skipMistakes:state.spellingTest.assessment.skipMistakes
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            tryAgain : ()=>dispatch(tryAgain()),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)