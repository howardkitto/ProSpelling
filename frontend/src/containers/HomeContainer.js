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
        <AssessmentContainer />
        </Col>
        </Row> 
        <Row>
    
        <Col>
          <Video  src='https://s3-us-west-2.amazonaws.com/prospelling/video/Rosie.mp4'
                height = {180}
                width = {302}
                muted = {true}/>
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