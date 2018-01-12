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
        //If we have the ID and the spelling test state is null start the test
        if(nextProps.spellingTest.assessment && !nextProps.spellingTest.spellingTestState){
            this.props.startSpellingTest({criteria:'assessment', value:nextProps.spellingTest.assessment._id})
        }

    }

    render(){
        const{spellingTest, question}=this.props
        //complicated decision to decide if to show a text box!
        return(
            <div>
            {(  (spellingTest.spellingTestState ||
                spellingTest.spellingTestState ==="inProgress")&&
                (!question.questionState||
                question.questionState=="wordLoaded")&&
                (spellingTest.questions.length === 0))&&
            <div className='DescriptionBox'>
                <h1>{(spellingTest.assessment)&&spellingTest.assessment.title}</h1>
                <h3>{(spellingTest.assessment)&&spellingTest.assessment.description}</h3>
            </div>}
            <SpellingTestContainer/></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spellingTest: state.spellingTest,
        question: state.question
    }
  }

const mapDispatchToProps = dispatch => {
    return {
    
        startSpellingTest : (selection) => dispatch(startSpellingTest(selection)),
        getAssessmentbyTitle:(assessmentTitle)=>dispatch(getAssessmentbyTitle(assessmentTitle))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 