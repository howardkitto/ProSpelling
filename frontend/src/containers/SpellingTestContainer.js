import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import QuestionContainer from './QuestionContainer'
import LevelSelector from './LevelSelector'

import {getWord,
        changeQuestionState} from '../redux/actionCreators'

import Rocket from '../images/rocket.png'

class SpellingTestContainer extends Component{

    componentWillReceiveProps(nextProps){

        const{criteria, value, spellingTest} = nextProps

        if(nextProps.spellingTestState==="startSpellingTest"){
            
            this.props.getWord(criteria, value, spellingTest)
        }
    }


    render(){
        const{spellingTestState, criteria, value, spellingTest, spellingTestId, getWord, serviceMessage} = this.props

        if(serviceMessage ==='end of assessment')
            return<h1>end of assessment</h1>
        else{
        switch(spellingTestState){
            case "startSpellingTest":
                return <div>Getting first word</div>
            case "inProgress":
                return <div><QuestionContainer/></div>
            case "waitingToContinue":
                return <div><h1>Awesome!</h1>
                    <div>
                    <Button onClick={()=>getWord(criteria, value, spellingTest)}>
                    <img src={Rocket} alt='Continue'/>Click for Next Word</Button>
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
}

  const mapStateToProps = state => {
    return {
        assessment:state.spellingTest.assessment,
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