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