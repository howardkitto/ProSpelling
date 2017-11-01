import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import{getNextWord,
    changeAssessmentState } from '../redux/actionCreators'

import wordResult from '../helperLogic/wordResult'

import LevelSelector from './LevelSelector'
import AnswerContainer from '../containers/AnswerContainer'

class QuestionContainer extends Component{

    playSound(theSrc){
        this.audioPlayer.src = theSrc
        let playPromise = this.audioPlayer.play()
        //catch and surpress a bug in chrome
        if (playPromise !== undefined){
          playPromise.catch(error => {})
        }
      }

componentWillReceiveProps(nextProps)
{
    if(nextProps.level !== this.props.level)
        {this.props.getNextWord(nextProps.level)}
    if(nextProps.assessmentState === 'checkingAnswer')
        {wordResult(this.props.nextWord, this.props.answer)
        .then((result)=>console.log('got this result ' + JSON.stringify(result)))
    }
}

assessment(){
    switch(this.props.assessmentState){
        case 'waitingForAudio':
            return <Button color='success'
                            onClick={()=>this.playSound(this.props.audioFile)}>
                    Click here and we'll get started!
                    </Button>
                        
        case 'playing':
            return<Button   color='warning'
                            onClick={()=>this.playSound(this.props.audioFile)}>
                            Play the Sound Again</Button>
        case 'waitForAnswer':
            return <div>
                        <Button   color='warning'
                        onClick={()=>this.playSound(this.props.audioFile)}>
                        Play the Sound Again</Button> 
                        <AnswerContainer />
                    </div>
        default:
            return<div>{!this.props.level?
            <LevelSelector />:null}</div>
        }
    }
    
    render(){
        return(
            <div>
            <div className="assessmentState">{this.props.assessmentState}</div>
            <div>{this.assessment()}</div>
            
            <audio type="audio/mpeg" 
            ref={(audio) => this.audioPlayer=audio}
            onLoadStart={()=>this.props.changeAssessmentState('loading audio')}
            onPlaying={()=>this.props.changeAssessmentState('playing')}
            onEnded={()=>this.props.changeAssessmentState('waitForAnswer')}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        level: state.assessment.level,
      answer: state.assessment.answer,
      nextWord: state.assessment.nextWord,
      audioFile: state.assessment.audioFile,
      assessmentState:state.assessment.assessmentState
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getNextWord : (level) => dispatch(getNextWord(level)),
            changeAssessmentState: (assessmentState) => dispatch(changeAssessmentState(assessmentState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)