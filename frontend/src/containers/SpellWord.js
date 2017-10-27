import React, {Component} from 'react'
import {connect} from 'react-redux'

import{getNextWord} from '../redux/actionCreators'


class SpellWord extends Component{

    playSound(theSrc){
        this.audioPlayer.src = theSrc
        let playPromise = this.audioPlayer.play()
        //catch and surpress a bug in chrome
        if (playPromise !== undefined){
          playPromise.catch(error => {})
        }
      }

    componentDidMount()
    {
        this.props.getNextWord()
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.nextWord !== this.props.nextWord){this.playSound(`/audio/${nextProps.nextWord}.mp3`)}
    }


    render(){

        return(
            <div>
                <div>Can You Spell {this.props.nextWord} ?</div>
                <audio type="audio/mpeg" ref={(audio) => { this.audioPlayer = audio}}/>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
      answer: state.assessment.answer,
      nextWord: state.assessment.nextWord
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getNextWord : () => dispatch(getNextWord())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellWord)