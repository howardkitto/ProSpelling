import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import{getWord,
    changeQuestionState } from '../redux/actionCreators'

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
        {this.props.getWord(nextProps.level)}
    if(nextProps.questionState === 'checkingAnswer')
        {wordResult(this.props.word, this.props.answer)
        .then((result)=>this.props.changeQuestionState(result.yesOrNo))
    }
}

question(){
    switch(this.props.questionState){
        case 'waitingForAudio':
            return <Button color='success'
                            onClick={()=>this.playSound(this.props.audioFile)}>
                    Click here and we'll get started!
                    </Button>
                        
        case 'playing':
            return<Button   color='warning'
                            onClick={()=>this.playSound(this.props.audioFile)}>
                            Play the Sound Again</Button>
        case 'loadingAudio':
            return<div>Loading...</div>
        case 'waitForAnswer':
            return <div>
                        <Button   color='warning'
                        onClick={()=>this.playSound(this.props.audioFile)}>
                        Play the Sound Again</Button> 
                        <AnswerContainer />
                    </div>
        case 'correct':
            return <div><h1>AWESOME!</h1>
                        <Button color="success">Wanna Try Another?</Button></div>
        case 'incorrect':
        return <div><h1>Doh!</h1>
                    <Button color="info">Wanna Try Again?</Button></div>
        default:
            return<div>{!this.props.level?
            <LevelSelector />:null}</div>
        }
    }
    
    render(){
        return(
            <div>
            <div className="questionState">{this.props.questionState}</div>
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
        level: state.question.level,
      answer: state.question.answer,
      word: state.question.word,
      audioFile: state.question.audioFile,
      questionState:state.question.questionState
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getWord : (level) => dispatch(getWord(level)),
            changeQuestionState: (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)