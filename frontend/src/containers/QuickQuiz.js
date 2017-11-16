import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startSpellingTest} from '../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'

class QuickQuiz extends Component{

    render(){
        return(
            <div>
            <SpellingTestContainer/></div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        startSpellingTest : (level) => dispatch(startSpellingTest(level))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuickQuiz) 