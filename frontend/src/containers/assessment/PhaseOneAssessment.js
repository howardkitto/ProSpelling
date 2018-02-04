import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setUpSpellingTest,
        getAssessmentbyTitle} from '../../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'
import {Container, Row} from 'reactstrap'
import  '../../css/Assessment.css'

class PhaseOneAssessment extends Component{

    componentDidMount(){

        this.props.getAssessmentbyTitle('Phase One')
        
    }

    componentWillReceiveProps(nextProps){
        //If we have the ID and the spelling test state is null start the test
        if(nextProps.spellingTest.assessment && !nextProps.spellingTest.spellingTestState){
            this.props.setUpSpellingTest({criteria:'assessment', value:nextProps.spellingTest.assessment._id}, this.props.user.userId)
        }

    }

    render(){
        const{spellingTest, question, user}=this.props
        return(
            <div className='assessmentContainer'>
            {(spellingTest.spellingTestState==="showIntroScreen")&&
            <div className='informationBox'>
                {(user.displayName)&&<h1>Hi&nbsp;{user.displayName}</h1>}
                <h2>{(spellingTest.assessment)&&spellingTest.assessment.title}</h2>
                <h3>{(spellingTest.assessment)&&spellingTest.assessment.description}</h3>
            </div>
            }
            
            <div className='SpellingTestContainer'>
            <SpellingTestContainer/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spellingTest: state.spellingTest,
        question: state.currentQuestion,
        user:state.user
    }
  }

const mapDispatchToProps = dispatch => {
    return {
    
        setUpSpellingTest : (selection, userId) => dispatch(setUpSpellingTest(selection, userId)),
        getAssessmentbyTitle:(assessmentTitle)=>dispatch(getAssessmentbyTitle(assessmentTitle))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 