import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, Label, Col, Input} from 'reactstrap'

import {editWord} from '../../redux/actionCreators'

class WordForm extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      word:this.props.word
    }
  }
  onChange(e){
    // console.log(e.target.name +' '+ e.target.value)

    const key = e.target.name
    const value = e.target.value
    
    var word = this.props.word
    word[key]=value

    this.setState({word})

    this.props.editWord(word)
  }
    
    render(){
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
          <Label sm={3}>Assessment</Label>
          <Col sm={9}>
            <Input  name="assessment"
                    value={this.state.word.assessment}
                    onChange={(e)=>this.onChange(e)}/>
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
      error: state.wordsAdmin.formError 
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      editWord : (word) => dispatch(editWord(word))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(WordForm)
