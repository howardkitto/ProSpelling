import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWordsList} from './../../redux/actionCreators'
import {Table, Button, 
        Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

import WordForm from './WordForm'

class Words extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal:false,
            word:{  word:'',
                    level:'',
                    assessment:'',
                    characteristics:''}
        }

        this.toggle = this.toggle.bind(this);
        this.createWord = this.createWord.bind(this);
    }

    createWord() {
        //crerate an empty word object
        var newWord = { word:'',
                        level:'',
                        assessment:'',
                        characteristics:''}

        this.setState({ word:newWord,
                        modal:!this.state.modal})
       }

    edit(word){
        //make sure none of the fields are null
        if(!word.word)word.word=''
        if(!word.level)word.level=''
        if(!word.assessment)word.assessment=''
        if(!word.characteristics)word.characteristics=''

        this.setState({modal : !this.state.modal,
                         word : word})
    }

    toggle(word) {
       this.setState({modal : !this.state.modal})
      }

  componentDidMount(){
    
    this.props.getWordsList()

  }

  render(){
      return(
          <div>
        {(!this.props.wordsList)?<div>Loading Words</div>:
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <td>Word</td>
                        <td>Level</td>
                        <td><Button color="success" onClick={this.createWord}>Create New Word</Button></td>
                    </tr>
                </thead>
                <tbody>
                {this.props.wordsList.map((word, index)=>
                    <tr key={word._id}>
                    <td>{word.word}</td>
                    <td>{word.level}</td>
                    <td><Button color ="warning" onClick={()=>this.edit(this.props.wordsList[index])}>Edit</Button></td>
                </tr>)}
                </tbody>                
            </Table>
            }
        
         <Modal isOpen={this.state.modal} toggle={this.toggle}>
         <ModalHeader toggle={this.toggle}>Edit Word</ModalHeader>
         <ModalBody>
            <WordForm word={this.state.word}/>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Save</Button>
            <Button color="danger" onClick={this.toggle}>Delete</Button>
            <Button color="info" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

        </Modal>   
        </div>
      )
  }
}

const mapStateToProps = state => {
    return {
      wordsList: state.words.wordsList 
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            getWordsList : () => dispatch(getWordsList())
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Words)