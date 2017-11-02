import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import QuestionContainer from './QuestionContainer'
import LevelSelector from './LevelSelector'

import {getWord,
        changeQuestionState} from '../redux/actionCreators'

class AssessmentContainer extends Component{

    assessment(){
        switch(this.props.assessmentState){
            case "startAssessment":
                this.props.getWord(this.props.level)
                return <div>Getting first word</div>
            case "inProgress":
                return <div><QuestionContainer/></div>
            case "waitingToContinue":
                return <div>Awesome!
                    <Button onClick={()=>this.props.getWord(this.props.level)}>
                    Click for Next Word</Button>
                </div>
            default:
                return <div>
                        {!this.props.assessmentId?<LevelSelector />:null}
                    </div>
        }
    }


    render(){

        return(
            <div>
                {this.assessment()}
                <div className="stateDisplay">  <div>assessment: {this.props.assessmentState}</div>
                                                <div>question: {this.props.questionState}</div>
                </div>
            </div>
            
        )
    }
}

  const mapStateToProps = state => {
    return {
        assessmentId:state.assessment.assessmentId,
        level:state.assessment.level,
        question:state.question,
        assessmentState:state.assessment.assessmentState,
        questionState:state.question.questionState
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getWord : (level) => dispatch(getWord(level)),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentContainer)