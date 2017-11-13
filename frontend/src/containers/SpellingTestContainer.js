import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import QuestionContainer from './QuestionContainer'
import LevelSelector from './LevelSelector'

import {getWord,
        changeQuestionState} from '../redux/actionCreators'

class SpellingTestContainer extends Component{


    spellingTest(){
        switch(this.props.spellingTestState){
            case "startSpellingTest":
                this.props.getWord(this.props.level, this.props.spellingTest)
                return <div>Getting first word</div>
            case "inProgress":
                return <div><QuestionContainer/></div>
            case "waitingToContinue":
                return <div>Awesome!
                    <div>
                    <Button color="info" onClick={()=>this.props.getWord(this.props.level, this.props.spellingTest)}>
                    Click for Next Word</Button>
                    </div>
                </div>
            case "complete":
                return <div>SpellingTest Complete</div>
            default:
                return <div>
                        {!this.props.spellingTestId?<LevelSelector />:null}
                    </div>
        }
    }

    render(){

        return(
            <div>
                {this.spellingTest()}
                
            </div>          
        )
    }
}

  const mapStateToProps = state => {
    return {
        spellingTest:state.spellingTest,
        level:state.spellingTest.level,
        question:state.question,
        spellingTestState:state.spellingTest.spellingTestState,
        questionState:state.question.questionState,
        progress:state.spellingTest.progress
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getWord : (level, spellingTest) => dispatch(getWord(level, spellingTest)),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTestContainer)