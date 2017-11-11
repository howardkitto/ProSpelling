import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Container, Row, Col} from 'reactstrap'

import Video from './Video'
import AssessmentContainer from './AssessmentContainer'

class HomeContainer extends Component{


render(){

  return(
      <Row>
        <Col>
        </Col>
      <Col>
      <div className="letsStart">
      <span className="letsStartText">
      Let's Start...
      Can you spell...
      
      </span>
      
      </div>

      <div className="assessmentDiv">
        <AssessmentContainer />
        </div>
      </Col>
      <Col>
        </Col>
        </Row> 
       
        )
    }
}

const mapStateToProps = state => {
  return {
    spellerName: state.speller.name
  }
}

export default connect(mapStateToProps)(HomeContainer)

//put this in to show the states
//<div className="stateDisplay">  <div>assessment: {this.props.assessmentState}</div>
//                                                <div>question: {this.props.questionState}</div>
//                </div>