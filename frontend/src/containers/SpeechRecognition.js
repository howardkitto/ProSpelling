import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveAnswer} from '../redux/actionCreators'

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
        let deleteLastCharacter = answer.slice(0, -1);

        switch(upperCaseTranscript){
            case('DELETE'):
                this.setState({ transcript: '',
                                feedback2: 'You can also say a word that starts with the letter',
                                answer: deleteLastCharacter})
                break
            case('BACK'):
                this.setState({ transcript: '',
                                feedback2: 'You can also say a word that starts with the letter',
                                answer: deleteLastCharacter})
                break
            case('SEE'):
                let fixSee = answer.concat('C')
                this.setState({ answer: fixSee})
                break
            case('ARE'):
                let fixAre = answer.concat('R')
                this.setState({ answer: fixAre})
                break
            case('YOU'):
                let fixYou = answer.concat('U')
                this.setState({ answer: fixYou})
                break
            case('WHY'):
                let fixWhy = answer.concat('Y')
                this.setState({ answer: fixWhy})
                break
            case('HI'):
                let fixHi = answer.concat('I')
                this.setState({ answer: fixHi})
                break
            case('KEY'):
                let fixKey = answer.concat('T')
                this.setState({ answer: fixKey})
                break
            case('IN'):
                let fixIn = answer.concat('N')
                this.setState({ answer: fixIn})
                break
            case('ASS'):
                let fixAss = answer.concat('S')
                this.setState({ answer: fixAss})
                break
            case('END'):
                let fixEnd = answer.concat('N')
                this.setState({ answer: fixEnd})
                break
            case('EDGE'):
                let fixEdge = answer.concat('H')
                this.setState({ answer: fixEdge})
                break
            case('YES'):
                let fixYes = answer.concat('S')
                this.setState({ answer: fixYes})
                break
            case('HE'):
                let fixHe = answer.concat('E')
                this.setState({ answer: fixHe})
                break      
            case(''):
                this.setState({feedback:'I didn\'t hear you... Speak up!'})
                break
            default:
                let incrementAnswer = answer.concat(transcript.charAt(0).toUpperCase())
                this.setState({ answer: incrementAnswer})
        }

        if(!this.state.finalAnswer){                
        try{
            setTimeout(()=>{ recognition.start() }, 1000)}
        catch(error){
            console.log(error)
            recognition.stop()
            setTimeout(()=>{ recognition.start() }, 1000)
            }
    }}

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