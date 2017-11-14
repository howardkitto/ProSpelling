import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, Label, Col, Input} from 'reactstrap'

import {editAssessment} from '../../redux/actionCreators'

class AssessmentForm extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      assessment:this.props.assessment
    }
  }

  onChange(e){
    const key = e.target.name
    const value = e.target.value
    var assessment = this.props.assessment
    assessment[key]=value
    this.setState({assessment})
    this.props.editAssessment(assessment)
  }
    
    render(){
        return(
        <Form>
          {this.props.error}
        <FormGroup row>
          <Label for="title" sm={3}>Title</Label>
          <Col sm={9}>
            <Input  name="title"
                    value={this.state.assessment.title}
                    onChange={(e)=>this.onChange(e)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={3}>Description</Label>
          <Col sm={9}>
            <Input  type="textarea"
                    name="description"
                    value={this.state.assessment.description}
                    onChange={(e)=>this.onChange(e)}/>
          </Col>
        </FormGroup>
        </Form>
    )
    }   
}

const mapStateToProps = state => {
    return {
      assessment: state.assessmentAdmin.assessment,
      error: state.assessmentAdmin.formError 
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      editAssessment : (assessment) => dispatch(editAssessment(assessment))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentForm)
