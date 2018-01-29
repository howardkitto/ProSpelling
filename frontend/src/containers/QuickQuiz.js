import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Row, Button} from 'reactstrap'


const speechSupported = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = speechSupported && new speechSupported()

class QuickQuiz extends Component{

    constructor(props){
        super(props)
            this.state = {
                listening: false,
                transcript: '',
                finalAnswer: false,
                transcriptConfidence:1,
                answer:'',
                feedback:''
            }        
    }

    setUpSpeechRecog(reset){
        
        recognition.lang = 'en-US'
        recognition.interimResults = true
        recognition.maxAlternatives = 5
        recognition.continous = false
        
        if(!this.state.listening){
            try{
                recognition.start()}
            catch(err){
                console.log('Started too soon '+err)
                recognition.stop()
            }
        }
    
recognition.onstart=event=>this.setState({  listening:true,
                                            transcript:''})
            
recognition.onresult=event=>{this.setState({transcript:event.results[0][0].transcript,
                                            transcriptConfidence:event.results[0][0].confidence})}

recognition.onend=_=>{  this.setState({listening:false})
                        this.handleTranscript();}
}

    handleTranscript(){
        const {transcript, answer}= this.state

        const upperCaseTranscript = transcript.toLocaleUpperCase()
        let deleteLastCharacter = answer.slice(0, -1);

        switch(upperCaseTranscript){
            case('STOP'):
                this.setState({finalAnswer:true})
                break
            case('DELETE'):
                this.setState({ transcript: '',
                                answer: deleteLastCharacter})
                break
            case('BACK'):
                this.setState({ transcript: '',
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
            case(''):
                this.setState({feedback:'I didn\'t hear you... Speak up!'})
                break
            default:
                let incrementAnswer = answer.concat(transcript.charAt(0).toUpperCase())
                this.setState({ feedback:'',
                                answer: incrementAnswer})
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
        this.setUpSpeechRecog()
        
    }

    render(){
    
    const {answer, transcript, listening, finalAnswer, transcriptConfidence, feedback} = this.state

    console.log(    
                    // "Listening = " + listening+
                    // " finalAnswer = " + finalAnswer+
                    " Confidence = " + transcriptConfidence+
                    " Transcript = " +transcript)
        return(
            <Container>
            <Row><div>
                <h1>Say A Letter</h1>
                <p>Say "STOP" when you are done</p>
                <p>Say "DELETE" or "BACK" if there is a mistake</p>
                <h1>{answer}</h1>
                {finalAnswer?
                    <Button onClick={()=>recognition.start()}>
                        Start Listening
                    </Button>:
                    
                (listening)?                
                    <div className="loader"></div>:
                        <h1>Wait</h1>}
                <h2>{feedback}</h2>
                </div>
            </Row>
            </Container>        

        )
    }
}

const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
    
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuickQuiz) 



{/* <h2>{this.transcriptConfidenceStyle()}</h2>
<h4>listening</h4> */}