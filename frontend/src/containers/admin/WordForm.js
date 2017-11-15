import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, Label, Col, Input} from 'reactstrap'

import {editWord, getAssessmentsList} from '../../redux/actionCreators'

class WordForm extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      word:this.props.word
    }
  }

  componentDidMount(){
    console.log(this.props.word)
  
    if(!this.props.assessments)
    //need to fix this hardcoded stuff
      this.props.getAssessmentsList(0,10)
  
  }
  onChange(e){
    console.log(e.target.name +' '+ e.target.value)

    const key = e.target.name
    const value = e.target.value
    
    var word = this.props.word
    word[key]=value

    this.setState({word})

    this.props.editWord(word)
  }

 addToAssessment(e){
    
    let word = this.state.word

    //find out if we're removing or adding assessments
    let deleteThisOne = word.linkedAssessments.findIndex(w=>w.assessmentId===e.target.id)

    if(deleteThisOne!== -1){
      word.linkedAssessments.splice(deleteThisOne, 1)
      this.setState({word})
      this.props.editWord(word)   
    }
    else{
      let assessment = {}
      assessment.assessmentId = e.target.id
      assessment.title = this.props.allAssessments.find(t => t._id === e.target.id).title
      word.linkedAssessments.push(assessment)
      this.setState({word})
      this.props.editWord(word)
  }}

    
    render(){
      const{allAssessments}=this.props
        return(
        <Form>
          {this.props.error}
        <FormGroup row>
          <Label for="word" sm={3}>Word</Label>
          <Col sm={9}>
            <Input  name="word"
                    value={this.state.word.word}
                    onChange={(e)=>this.onChange(e)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="level" sm={3}>Level</Label>
          <Col sm={2}>
            <Input  name="level"
                    value={this.state.word.level}
                    onChange={(e)=>this.onChange(e)}/>
          </Col>
        </FormGroup>
    <FormGroup row>
      <Label sm={3}>Assessments</Label>
      <Col sm={9}><div>
        {(!allAssessments)?
          <span>loading</span>:
          <div>{allAssessments.map((a)=>
          <div key={a._id}>
            <span><Input type="checkbox"
                      id={a._id}
                      onChange={(e)=>this.addToAssessment(e)}
                      checked={(this.state.word.linkedAssessments.find(w=>w.assessmentId===a._id)?true:false)}/>
              </span>
            <span>{a.title}</span></div>)}</div>}
        </div>
      </Col>
    </FormGroup>
        <FormGroup row>
          <Label for="level" sm={3}>Characteristics</Label>
          <Col sm={9}>
            <Input  name="characteristics"
                    value={this.state.word.characteristics}
                    onChange={(e)=>this.onChange(e)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="level" sm={3}>Audio File</Label>
          <Col sm={9}>
            <Input  name="audioFileName"
                    value={this.state.word.audioFileName}
                    onChange={(e)=>this.onChange(e)} />
          </Col>
        </FormGroup>
        </Form>
    )
    }
    
    
}


const mapStateToProps = state => {
    return {
      word: state.wordsAdmin.word,
      error: state.wordsAdmin.formError,
      allAssessments: state.assessmentAdmin.assessmentList 
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      editWord : (word) => dispatch(editWord(word)),
      getAssessmentsList: (page, limit)=>dispatch(getAssessmentsList(page, limit))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(WordForm)


