import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Button, Row, Col} from 'reactstrap'

class HomeContainer extends Component{


render(){

  return(
      <Row>
        <Col>
        </Col>
      <Col>
      <div className="letsStart">
        <div className="letsStartText">
          <div>
          Can you spell?
          </div>
          <Button className="startButton">Let's Start...</Button>
      </div>
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
