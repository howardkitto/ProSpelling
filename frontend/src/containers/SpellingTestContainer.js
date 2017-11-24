import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import QuestionContainer from './QuestionContainer'
import LevelSelector from './LevelSelector'

import {getWord,
        changeQuestionState} from '../redux/actionCreators'

class SpellingTestContainer extends Component{


    spellingTest(){

        const{spellingTestState, criteria, value, spellingTest, spellingTestId, getWord, serviceMessage} = this.props

        if(serviceMessage ==='end of assessment')
            return<h1>end of assessment</h1>
        else{
        switch(spellingTestState){
            case "startSpellingTest":
                this.props.getWord(criteria, value, spellingTest)
                return <div>Getting first word</div>
            case "inProgress":
                return <div><QuestionContainer/></div>
            case "waitingToContinue":
                return <div>Awesome!
                    <div>
                    <Button color="info" onClick={()=>getWord(criteria, value, spellingTest)}>
                    Click for Next Word</Button>
                    </div>
                </div>
            case "complete":
                return <div>SpellingTest Complete</div>
            default:
                return <div>
                        {!spellingTestId?<LevelSelector />:null}
                    </div>
        }}
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
        criteria:state.spellingTest.criteria,
        value:state.spellingTest.value,
        question:state.question,
        spellingTestState:state.spellingTest.spellingTestState,
        questionState:state.question.questionState,
        progress:state.spellingTest.progress,
        serviceMessage:state.serviceMessage.message
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getWord : (criteria, value, spellingTest) => dispatch(getWord(criteria, value, spellingTest)),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTestContainer)