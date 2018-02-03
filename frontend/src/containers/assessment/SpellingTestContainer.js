import React, {Component} from 'react'
import {connect} from 'react-redux'

import QuestionContainer from './QuestionContainer'
import TestResult from './TestResults'

import {getWord,
        changeQuestionState,
        startSpellingTest,
        spellingTestComplete} from '../../redux/actionCreators'

import {Button} from 'reactstrap'

import Rocket from '../../images/rocket.png'

class SpellingTestContainer extends Component{

    componentWillReceiveProps(nextProps){

    //wasted lots of time here: serviceMessage causing an infinite loop. 
    //Solution was to add a new spellingTestState "gettingWord"

        const{criteria, value, spellingTest, serviceMessage} = nextProps

        if( spellingTest.spellingTestState==="startSpellingTest" ||
            spellingTest.spellingTestState==="waitingToContinue"){
            
            this.props.getWord(criteria, value, spellingTest)
        }

        if(serviceMessage.hasOwnProperty('getWord')){
            // console.log('can see getWord SM ' + JSON.stringify(serviceMessage.getWord.message) )
            if(serviceMessage.getWord.message === 'spellingTestComplete'){
                // console.log('spellingTestComplete')
                this.props.spellingTestComplete()
            }
        }        
    }

    render(){
        const{spellingTestState} = this.props

        switch(spellingTestState){
            case "showIntroScreen":
                return <Button onClick={()=>this.props.startSpellingTest()}>
                        <img src = {Rocket} alt="start"/>
                        Start Test</Button>
            case "inProgress":
                return <QuestionContainer/>
            case "spellingTestComplete":
                return <TestResult/>
            default:
                return <div className="loader"></div>
        }}
}

  const mapStateToProps = state => {
    return {
        assessment:state.spellingTest.assessment,
        spellingTest:state.spellingTest,
        criteria:state.spellingTest.criteria,
        value:state.spellingTest.value,
        question:state.currentQuestion,
        spellingTestState:state.spellingTest.spellingTestState,
        questionState:state.currentQuestion.questionState,
        progress:state.spellingTest.progress,
        serviceMessage:state.serviceMessage
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getWord : (criteria, value, spellingTest) => dispatch(getWord(criteria, value, spellingTest)),
        startSpellingTest : ()=>dispatch(startSpellingTest()),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState)),
        spellingTestComplete : ()=>dispatch(spellingTestComplete())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTestContainer)