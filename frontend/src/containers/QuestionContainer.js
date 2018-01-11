import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import{
    tryAgain,
    changeQuestionState} from '../redux/actionCreators'

import AnswerContainer from '../containers/AnswerContainer'
import Rocket from '../images/rocket.png'
import Ear from '../images/ear.png'

class QuestionContainer extends Component{

    playSound(theSrc){
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
                            onClick={()=>this.playSound(this.props.audioFileName)}>
                            <img src={Ear} alt='Play the Sound Again'/>Play the Sound Again</Button>
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
            return  <div><h1>Doh!</h1>
                        <Button color="info" onClick={()=>{this.tryAgain(this.props.audioFileName)}}>Wanna Try Again?</Button>
                    </div>
        default:
            return  <Button
                        onClick={()=>this.playSound(this.props.audioFileName)}>
                        
                        <img src={Rocket} alt='Click Here To Start'/> Click Here To Start!
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
        level: state.spellingTest.level,
        answer: state.question.answer,
        word: state.question.word,
        audioFileName: state.question.audioFileName,
        result:state.question.result,
        questionState:state.question.questionState,
        spellingTestState:state.spellingTest.spellingTestState
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            tryAgain : () =>dispatch(tryAgain()),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState)),
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)