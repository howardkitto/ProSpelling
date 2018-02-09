import React, {Component} from 'react'
import {connect} from 'react-redux'

import {resetSpellingTest,
        setUpSpellingTest,
        getAssessmentbyId,
        getAssessmentbyTitle} from '../../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'
import  '../../css/Assessment.css'

import Monkey from '../../images/monkey.png'
import Cat from '../../images/happy.png'

class PhaseOneAssessment extends Component{

    componentDidMount(){

        this.props.resetSpellingTest()
        // this.props.getAssessmentbyTitle('Phase One')
        
    }

    componentWillReceiveProps(nextProps){
        //If we have the ID and the spelling test state is null start the test
        if(nextProps.spellingTest.assessment && !nextProps.spellingTest.spellingTestState){
            this.props.setUpSpellingTest({criteria:'assessment', value:nextProps.spellingTest.assessment._id}, this.props.user.userId)
        }
    }

    render(){
        const{spellingTest, user}=this.props
        return(   
        <div className='assessmentContainer'>         
           {(!spellingTest.spellingTestState)?
            <div>
                <div className='informationBox'>
                    <h1>How Old Are You?</h1>
                    <h3>We use your age to get things right for you</h3>
                </div>
                <div className="ageSelectionWrapper">
                <div className="ageSelection"
                    // onClick={()=>this.props.getAssessmentbyId('5a7302b2aec32cfe8902520b')}>
                    onClick={()=>this.props.getAssessmentbyTitle('Cheeky Monkeys')}>
                    <img src={Monkey} alt="Ages 5 - 10"/>
                    
                    <h2>I'm a Cheeky Monkey</h2><p>Age 5 to 10</p></div>
                <div className="ageSelection"
                    // onClick={()=>this.props.getAssessmentbyId('5a72ffe539c459fcfcb74c46')}>
                    onClick={()=>this.props.getAssessmentbyTitle('Cool Cats')}>
                    <img src={Cat} alt="Ages 11 - 100"/>
                
                    <h2>I'm a Cool Cat</h2><p>Age 10 to 100</p></div>
                </div>
            </div>
           :    <div>
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
            }</div>
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
        resetSpellingTest : ()=>dispatch(resetSpellingTest()),
        setUpSpellingTest : (selection, userId) => dispatch(setUpSpellingTest(selection, userId)),
        getAssessmentbyTitle:(assessmentTitle)=>dispatch(getAssessmentbyTitle(assessmentTitle)),
        getAssessmentbyId: (assessmentId)=>dispatch(getAssessmentbyId(assessmentId))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 