import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveAnswer,
        startSpellingTest} from '../../redux/actionCreators'
import transcriptFilter from '../../utils/transcriptFilter'
import {Modal, ModalBody} from 'reactstrap'

import Bunny from '../../images/bunny.png'

const webSpeech = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = webSpeech && new webSpeech()

class SpeechRecognition extends Component{

    constructor(props){
        super(props)
            this.state = {
                listening: false,
                transcript: '',
                transcriptConfidence:1,
                answer:'',
                wait: false,
                feedback:'',
                feedback2:'',
            }
    }

    setUpSpeechRecog(reset){
        
        recognition.lang = 'en-GB'
        recognition.interimResults = true
        recognition.maxAlternatives = 1
        recognition.continous = false
        
        if(!this.state.listening){
            try{
                recognition.start()}
            catch(err){
                console.log('Started too soon '+err)
                recognition.stop()
            }
        }
    
recognition.onstart=event=>{if(this._isMounted)
                                {this.setState({  listening:true,
                                    wait:false,
                                    feedback2:'Say "BACK" to delete or "CLEAR" to start again',
                                    transcript:''})}}
            
recognition.onresult=event=>{if(this._isMounted){this.setState({
                                                feedback: "Wait... I'm Thinking...",
                                                wait:true,
                                                listening:false,
                                                transcript:event.results[0][0].transcript,
                                                transcriptConfidence:event.results[0][0].confidence})}}

recognition.onend=_=>{  if(this._isMounted){
                            this.setState({ feedback:''})
                            this.handleTranscript()}
                        }
}   

    handleTranscript(){
        const {transcript, answer}= this.state

        const lowerCaseTranscript = transcript.toLocaleLowerCase()

        //Use trascriptFilter.js to fix common transcript errors
        const fixTranscript = (filterObject)=>{

            for(var word in filterObject){
                return word === lowerCaseTranscript
            }
        }

        let transcriptFilterMatch = transcriptFilter.find(fixTranscript)

        if(this.props.introScreen&&lowerCaseTranscript==="let's spell"){
            this.props.startSpellingTest()}
        //filter for common errors
        else if(transcriptFilterMatch){
            this.setState({ answer: answer.concat(Object.values(transcriptFilterMatch)[0])})}
        //Delete the last character
        else if(lowerCaseTranscript==='back'){
            this.setState({ answer: answer.slice(0, -1),
                            feedback2:'Try a word that starts with the letter'})}
        //clear the current answer
        else if(lowerCaseTranscript==='clear'){
            this.setState({ answer: '',
                            feedback2:'Try switching to typing'})}
        else {
            this.setState({ answer: answer.concat(transcript.charAt(0).toLowerCase())})}

    if(this._isMounted){
        recognition.start()}        
}

    componentWillMount(){
        this.props.answer&&this.setState({answer:this.props.answer})
        this.setUpSpeechRecog()
        this._isMounted = true

        if(this.props.introScreen)
            {this.setState({feedback:'Say "Let\'s Spell" to start'})}
        
    }

    componentWillUpdate(){
        this.props.saveAnswer(this.state.answer)
    }

    componentWillUnmount(){
        recognition.stop()
        // prevent setting state when the component is unmounted
        this._isMounted = false       
    }

    render(){
    
    const {answer, listening, feedback, feedback2} = this.state

        // console.log(    " Confidence = " + this.state.transcriptConfidence+
        //                 " Transcript = " + this.state.transcript)
        return(
                <span>
                    <h3>{feedback}</h3>
                    <input type='text'
                    className="answerTextBox"
                    readOnly
                    value={answer}/>
                    {(listening)&&              
                        <div className="listeningLoader"></div>}
                    <h4>{feedback2}</h4>  
                    <Modal isOpen={this.state.wait}>
                        <ModalBody>
                    <div className="waitModal">
                    <img src={Bunny} alt="I'm Thinking"/>
                    <p>
                    {feedback}
                    </p>
                    <p style={  {color:'thistle',
                                fontSize: '12px'}}>{this.state.transcript}</p></div>
                    </ModalBody>
                    </Modal>

                </span>
        )
    }
}

const mapStateToProps = state => {
    return {
        answer: state.currentQuestion.answer
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        saveAnswer : (answer) => dispatch(saveAnswer(answer)),
        startSpellingTest : ()=>dispatch(startSpellingTest())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognition) 