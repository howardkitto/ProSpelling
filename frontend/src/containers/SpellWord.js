import React, {Component} from 'react'
import {connect} from 'react-redux'


import{getNextWord} from '../redux/actionCreators'


class SpellWord extends Component{

    componentDidMount()
    {
        this.props.getNextWord()
    }



    render(){

        return(
        
            <div>Can You Spell {this.props.word} ?
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
      answer: state.answer,
      word: state.word
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getNextWord : () => dispatch(getNextWord())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellWord)