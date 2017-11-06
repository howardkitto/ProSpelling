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
                this.props.getWord(this.props.level, this.props.assessment)
                return <div>Getting first word</div>
            case "inProgress":
                return <div><QuestionContainer/></div>
            case "waitingToContinue":
                return <div>Awesome!
                    <div>
                    <Button color="info" onClick={()=>this.props.getWord(this.props.level, this.props.assessment)}>
                    Click for Next Word</Button>
                    </div>
                </div>
            case "complete":
                return <div>Assessment Complete</div>
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
        assessment:state.assessment,
        level:state.assessment.level,
        question:state.question,
        assessmentState:state.assessment.assessmentState,
        questionState:state.question.questionState,
        progress:state.assessment.progress
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getWord : (level, assessment) => dispatch(getWord(level, assessment)),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentContainer)