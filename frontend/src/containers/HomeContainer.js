import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Container, Row, Col} from 'reactstrap'

import Video from './Video'
import AssessmentContainer from './AssessmentContainer'

class HomeContainer extends Component{


render(){

  return(

    <Container fluid>
     <Row>
        <Col>
        </Col>
        <Col>
        <AssessmentContainer />
        </Col>
        <Col>
        </Col>
      </Row>
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
      </Col>
      <Col>
        </Col>
        </Row> 
       
    </Container>
        )
    }
}

const mapStateToProps = state => {
  return {
    spellerName: state.speller.name
  }
}

export default connect(mapStateToProps)(HomeContainer)