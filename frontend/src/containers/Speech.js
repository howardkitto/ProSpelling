import React, { Component } from 'react';
import {connect} from 'react-redux'
import {saveAnswer} from '../redux/actionCreators'

const speechSupported = window.SpeechRecognition ||
                        window.webkitSpeechRecognition || 
                        window.mozSpeechRecognition || 
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition

const recognition = speechSupported ? new speechSupported() : null

class Speech extends Component  {

    constructor(){
        super()

        this.state = {
            listening : false,
            typedAnswer: ''
        }
    }

setUpSpeechRecog(){
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 5
    recognition.start()
    recognition.onstart = event =>this.setState({listening:true});
    recognition.onresult = event =>this.props.saveAnswer(event.results[0][0].transcript)
    
    recognition.onspeechend = event =>this.setState({listening:false});
}

handleTypedAnswer(e){
    this.setState({typedAnswer:e.target.value})
}

sumbitTypedAnswer(e){
    e.preventDefault();
    this.props.saveAnswer(this.state.typedAnswer)
}


componentDidMount(){

    if(recognition) this.setUpSpeechRecog()
    
}
    
render(){
    return(
        (recognition) ?
        <div>
           {this.state.listening ? 
           <h2>listening</h2>:
           <button onClick={_=>this.setUpSpeechRecog()}>Restart</button>}
        </div>:
        <div>
        <h1>You don't got Speech</h1>
        <form onSubmit={(e)=>{this.sumbitTypedAnswer(e)}}>
            <input  type='text'
                    autoFocus
                    onChange={(e)=>{this.handleTypedAnswer(e)}}
            />
            <button type='submit'                         
                    className='btn btn-warning'>Answer
            </button>
        </form>
        </div>
        )
        }

}

const mapStateToProps = state => {
    return {
      answer: state.answer
    }
  }

const mapDispatchToProps = dispatch => {
    return {
            saveAnswer : (answer) => dispatch(saveAnswer(answer))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Speech)