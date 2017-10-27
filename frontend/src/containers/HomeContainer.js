import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Container, Row, Col} from 'reactstrap'

import Video from './Video'

import Speech from '../containers/Speech'
import SpellWord from './SpellWord'

import UserDetailsForm from './UserDetailsForm'

class HomeContainer extends Component{


render(){

  return(

    <Container fluid>
      <Row>
      <Col>
        <SpellWord />
        </Col>
        <Col>
          {(this.props.spellerName)?
            <h3 className="display-3">Hello, {this.props.spellerName}</h3>:
          <UserDetailsForm headerText = "What is your name?  "/>}   
        </Col>
        
          
        </Row> 
        <Row>
        <Col>
          <Speech />
        </Col> 
        <Col>
          <Video  src='/video/Rosie.mp4'
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