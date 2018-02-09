import React, {Component} from 'react'
import {connect} from 'react-redux'

import QuestionContainer from './QuestionContainer'
import SpeechRecognition from './SpeechRecognition'
import TestResult from './TestResults'

import {getWord,
        changeQuestionState,
        startSpellingTest,
        spellingTestComplete,
        toggleSpeechText} from '../../redux/actionCreators'

import {Button,
        Modal,
        ModalBody} from 'reactstrap'

import Rocket from '../../images/rocket.png'
import Voice from '../../images/voice.png'
import KeyBoard from '../../images/keyboard.png'

class SpellingTestContainer extends Component{

    constructor(){
        super()
        this.state = {
            modal:false
        }
    }

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

    componentDidMount(){
        const{speechSupported, useSpeech} = this.props

        if(speechSupported&&!useSpeech){
            this.setState({modal:true})
        }
        
    }

    render(){
        const{spellingTestState, speechSupported, useSpeech} = this.props

        switch(spellingTestState){
            case "showIntroScreen":
                return <div>
                            
                            {speechSupported&&useSpeech?
                            <div>
                                <Button onClick={()=>this.props.toggleSpeechText(false)}>
                                <img src ={KeyBoard} alt="use keyboard"/>
                                Use Keyboard</Button>
                                <SpeechRecognition  introScreen={true}/>
                            </div>:
                            <Button onClick={()=>this.props.startSpellingTest()}>
                            <img src = {Rocket} alt="start"/>
                            Start Test</Button>
                            }

                             <Modal isOpen={this.state.modal}>
                                <ModalBody>                                
                                <div className="waitModal">                            
                                <h2>If you want to use your voice to spell</h2>                    
                                <Button onClick={()=>{this.setState({modal:false})
                                                    this.props.toggleSpeechText(true)}}> 
                                <img src={Voice} alt="Use Your Voice"/>
                                Click Here</Button>
                                <h2>If you prefer to type</h2>
                                <Button onClick={()=>this.setState({modal:false})}>
                                <img src ={KeyBoard} alt="use keyboard"/>
                                Click Here</Button></div>
                    </ModalBody>
                    </Modal>

                        </div>

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
        serviceMessage:state.serviceMessage,
        speechSupported: state.envProperties.speechSupported,
        useSpeech: state.user.useSpeech
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        toggleSpeechText:(value)=>dispatch(toggleSpeechText(value)),
        getWord : (criteria, value, spellingTest) => dispatch(getWord(criteria, value, spellingTest)),
        startSpellingTest : ()=>dispatch(startSpellingTest()),
        changeQuestionState : (questionState) => dispatch(changeQuestionState(questionState)),
        spellingTestComplete : ()=>dispatch(spellingTestComplete())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTestContainer)