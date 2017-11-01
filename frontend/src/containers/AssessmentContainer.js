import React, {Component} from 'react'
import {connect} from 'react-redux'

import QuestionContainer from './QuestionContainer'

class AssessmentContainer extends Component{


    render(){
        return(
            <div>
                <QuestionContainer/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentContainer)