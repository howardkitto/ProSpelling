import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import {Button, Row, Col} from 'reactstrap'

class HomeContainer extends Component{


render(){

  const LetsStartButton = withRouter(({ history}) => (
    <Button
      className="startButton"
      onClick={() => { history.push('/phaseoneassessment') }}
    >
      Click Me!
    </Button>
  ))

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
          <LetsStartButton />
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
//<div className="stateDisplay">  <div>spellingTest: {this.props.spellingTestState}</div>
//                                                <div>question: {this.props.questionState}</div>
//                </div>
