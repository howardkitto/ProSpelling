import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startSpellingTest,
        getAssessmentbyTitle} from '../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'
import {Container, Row} from 'reactstrap'
import  '../css/Assessment.css'

class PhaseOneAssessment extends Component{

    componentDidMount(){

        this.props.getAssessmentbyTitle('Phase One')
        
    }

    componentWillReceiveProps(nextProps){
        //If we have the ID and the spelling test state is null start the test
        if(nextProps.spellingTest.assessment && !nextProps.spellingTest.spellingTestState){
            this.props.startSpellingTest({criteria:'assessment', value:nextProps.spellingTest.assessment._id}, this.props.user.userId)
        }

    }

    render(){
        const{spellingTest, question, user}=this.props
        //complicated decision to decide if to show a text box!
        return(
            <Container>
            {(  (spellingTest.spellingTestState ||
                spellingTest.spellingTestState ==="inProgress")&&
                (!question.questionState||
                question.questionState==="wordLoaded")&&
                (spellingTest.questions.length === 0))&&
            <Row>
            <div className='DescriptionBox'>
                {(user.displayName)&&<h1>Hi&nbsp;{user.displayName}</h1>}
                <h2>{(spellingTest.assessment)&&spellingTest.assessment.title}</h2>
                <h3>{(spellingTest.assessment)&&spellingTest.assessment.description}</h3>
            </div>
            </Row>}
            <Row>
            <div className='SpellingTestContainer'>
            <SpellingTestContainer/>
            </div>
            </Row></Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        spellingTest: state.spellingTest,
        question: state.question,
        user:state.user
    }
  }

const mapDispatchToProps = dispatch => {
    return {
    
        startSpellingTest : (selection, userId) => dispatch(startSpellingTest(selection, userId)),
        getAssessmentbyTitle:(assessmentTitle)=>dispatch(getAssessmentbyTitle(assessmentTitle))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 