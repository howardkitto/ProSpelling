import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startSpellingTest,
        getAssessmentbyTitle} from '../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'
import  '../css/Assessment.css'

class PhaseOneAssessment extends Component{

    componentDidMount(){
        this.props.getAssessmentbyTitle('Phase One')
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.foundAss._id)
        this.props.startSpellingTest({criteria:'assessment',
                                    value:nextProps.foundAss._id})

    }
    render(){
        return(
            <div className='DescriptionBox'>
                <h1>First Assessment</h1>
                <h3>This is a test of 20 questions to see what level you are at</h3>
            <SpellingTestContainer/></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        foundAss: state.assessmentAdmin.foundAssessment
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        // startSpellingTest : (level) => dispatch(startSpellingTest({level:2}))
        startSpellingTest : (selection) => dispatch(startSpellingTest(selection)),
        getAssessmentbyTitle:(assessmentTitle)=>dispatch(getAssessmentbyTitle(assessmentTitle))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 