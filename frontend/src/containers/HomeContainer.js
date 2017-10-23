import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Container, Row, Col} from 'reactstrap'

import Video from './Video'
import rosie from '../video/Rosie.mp4'

import Speech from '../containers/Speech'

import UserDetailsForm from './UserDetailsForm'

class HomeContainer extends Component{


render(){

  return(

    <Container fluid>
      <Row>
        <Col>
          {(this.props.spellerName)?
            <h1 className="display-3">Hello, {this.props.spellerName}</h1>:
          <UserDetailsForm headerText = "What is your name?  "/>}   
        </Col>
        <Col>
          <Video  src={rosie}
                height = {180}
                width = {302}
                muted = {true}/>
        </Col>
        </Row>
        <Row>
        <Col>
          <Speech />
        </Col>
        
      </Row>
    </Container>
        )
    }
}

const mapStateToProps = state => {
  return {
    spellerName: state.name,
    answer: state.answer
  }
}

export default connect(mapStateToProps)(HomeContainer)