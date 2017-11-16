import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startSpellingTest} from '../redux/actionCreators'
import SpellingTestContainer from './SpellingTestContainer'

class PhaseOneAssessment extends Component{

    componentDidMount(){
        this.props.startSpellingTest({criteria:'assessment',
                                    value:'5a0ab6a769eecb75ed2b8f04'})
    }
    render(){
        return(
            <div>
                <h1>First Assessment</h1>
                <h3>This is a test of 20 questions to see what level you are at</h3>
            <SpellingTestContainer/></div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        // startSpellingTest : (level) => dispatch(startSpellingTest({level:2}))
        startSpellingTest : (selection) => dispatch(startSpellingTest(selection))
        
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOneAssessment) 