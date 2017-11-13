import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startAssessment} from '../redux/actionCreators'
import AssessmentContainer from './AssessmentContainer'

class PhaseOneAssessment extends Component{

    render(){
        return(
            <div>
            <AssessmentContainer/></div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        startAssessment : (level) => dispatch(startAssessment(level))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 