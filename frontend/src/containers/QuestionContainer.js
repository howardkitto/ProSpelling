import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import{getWord,
    tryAgain,
    changeQuestionState} from '../redux/actionCreators'

import AnswerContainer from '../containers/AnswerContainer'

class QuestionContainer extends Component{

    playSound(theSrc){
        console.log('playsound ' + theSrc)
        this.audioPlayer.src = theSrc
        let playPromise = this.audioPlayer.play()
        //catch and surpress a bug in chrome
        if (playPromise !== undefined){
          playPromise.catch(error => {})
        }
      }

question(){
    switch(this.props.questionState){
        case 'playing':
            return<Button   color='warning'
                            onClick={()=>this.playSound(this.props.audioFileName)}>
                            Play the Sound Again</Button>
        case 'loadingAudio':
            return<div>Loading...</div>
        case 'waitForAnswer':
            return <div>
                        <Button   color='warning'
                        onClick={()=>this.playSound(this.props.audioFileName)}>
                        Play the Sound Again</Button> 
                        <AnswerContainer />
                    </div>
        case 'tryAgain':
            return  <div><h1>Doh!</h1>
                        <Button color="info" onClick={()=>this.props.tryAgain()}>Wanna Try Again?</Button>
                    </div>
        default:
            return <Button color='success'
                        onClick={()=>this.playSound(this.props.audioFileName)}>
                        Click here and we'll get started!
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
        level: state.assessment.level,
        answer: state.question.answer,
        word: state.question.word,
        audioFileName: state.question.audioFileName,
        result:state.question.result,
        questionState:state.question.questionState,
        assessmentState:state.assessment.assessmentState
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getWord : (level) => dispatch(getWord(level)),
            tryAgain : () =>dispatch(tryAgain()),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState)),
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)