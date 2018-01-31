import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveAnswer} from '../redux/actionCreators'
import transcriptFilter from '../utils/transcriptFilter'

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
                                    feedback:'Say A Letter, or Say "BACK" or "DELETE"',
                                    transcript:''})}}
            
recognition.onresult=event=>{this.setState({feedback:'Wait',
                                            listening:false,
                                            transcript:event.results[0][0].transcript,
                                            transcriptConfidence:event.results[0][0].confidence})}

recognition.onend=_=>{  if(this._isMounted){
                            this.setState({ feedback2:''})
                            this.handleTranscript()}
                        }
}   

    handleTranscript(){
        const {transcript, answer}= this.state

        const upperCaseTranscript = transcript.toLocaleUpperCase()

        //Use trascriptFilter.js to fix common transcript errors
        const fixTranscript = (filterObject)=>{

            for(var word in filterObject){
                return word === upperCaseTranscript
            }
        }

        let transcriptFilterMatch = transcriptFilter.find(fixTranscript)

        if(transcriptFilterMatch){
            this.setState({ answer: answer.concat(Object.values(transcriptFilterMatch)[0])})}
        //Delete the last character
        else if(upperCaseTranscript==='BACK'){
            this.setState({ answer: answer.slice(0, -1),
                            feedback2:'Try a word that starts with the letter'})}
        else {
            this.setState({ answer: answer.concat(transcript.charAt(0).toUpperCase())})}

    recognition.start()
        
}

    componentWillMount(){
        this.props.answer&&this.setState({answer:this.props.answer})
        this.setUpSpeechRecog()
        this._isMounted = true
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
    
    const {answer, transcript, listening, transcriptConfidence, feedback, feedback2} = this.state

        console.log(    " Confidence = " + transcriptConfidence+
                        " Transcript = " + transcript)
        return(
                <span>
                    <h3>{feedback}</h3>
                    <input type='text'
                    className="answerTextBox"
                    readOnly
                    value={answer}/>
                    {(listening)&&              
                        <div className="loader"></div>}  
                    <h4>{feedback2}</h4>
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
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognition) 