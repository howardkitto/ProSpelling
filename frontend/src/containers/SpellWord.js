import React, {Component} from 'react'
import {connect} from 'react-redux'

import{getNextWord} from '../redux/actionCreators'

import LevelSelector from './LevelSelector'


class SpellWord extends Component{

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
        if(nextProps.nextWord !== this.props.nextWord)
            {this.playSound(nextProps.audioFile)}
    }

    render(){

        return(
            <div>{!this.props.level?
                    <LevelSelector />:
                    <div>
                    <h3>Can You Spell {this.props.nextWord} ?</h3>
                    <audio type="audio/mpeg" ref={(audio) => {this.audioPlayer = audio}}/>
                    </div>
            }
                
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        level: state.assessment.level,
      answer: state.assessment.answer,
      nextWord: state.assessment.nextWord,
      audioFile: state.assessment.audioFile
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getNextWord : (level) => dispatch(getNextWord(level))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellWord)