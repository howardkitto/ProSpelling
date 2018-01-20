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
    switch(this.props.questionState){
        case 'playing':
            return<Button 
                        onClick={()=>   this.playSound(this.props.audioFileName)}>
                        <img src={Ear} alt='Play the Sound Again'/>Listen!</Button>
        case 'loadingAudio':
            return<div>Loading...</div>
        case 'waitForAnswer':
            return <div>
                 <Button
                        onClick={()=>this.playSound(this.props.audioFileName)}>
                        <img src={Ear} alt='Play the Sound Again'/>Play the Sound Again</Button> 
                <AnswerContainer />                        
                       
                        
                    </div>
        case 'tryAgain':
            return  <div><img src={Sad} alt='Wrong Answer'/><h1>Oh Noes - that's not right</h1>
                        <Button onClick={()=>{this.tryAgain(this.props.audioFileName)}}>
                        <img src={Repeat} alt='Try Again'/>Wanna Try Again?</Button>
                    </div>
        default:
            var questionCount =this.props.progress.filter(attempt => attempt.result==='correct')
            return  <Button
                        onClick={()=>{  
                                        this.playSound(this.props.audioFileName)                                        
                                    }}>                        
                        <img src={Rocket} alt='Click Here To Start'/> Click Here For Question &nbsp; 
                        {(this.props.progress.length===0)?1:questionCount.length + 1
                        }&nbsp; of&nbsp;
                        {this.props.wordsInAssessment}
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
        answer: state.question.answer,
        word: state.question.word,
        audioFileName: state.question.audioFileName,
        result:state.question.result,
        questionState:state.question.questionState,
        spellingTestState:state.spellingTest.spellingTestState,
        progress:state.spellingTest.questions,
        wordsInAssessment:state.spellingTest.assessment.wordCount
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            tryAgain : ()=>dispatch(tryAgain()),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)