import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWordsList, 
        createWord,
        editWord,
        updateWord,
        deleteWord} from './../../redux/actionCreators'
import {Table, Button, 
        Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

import WordForm from './WordForm'
import DateTime from '../../components/DateTime'
import Paginator from '../../components/Paginator'

class Words extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5
        }

        this.toggle = this.toggle.bind(this);
        this.createWord = this.createWord.bind(this);
    }

    createWord() {
        //create an empty word object
        var newWord = { word:'',
                        level:'',
                        linkedAssessments:[],
                        characteristics:'',
                        audioFileName:''}
        
        this.props.editWord(newWord)
        this.setState({modal:!this.state.modal})
       }

edit(word){
        // make sure none of the fields are null
    if(!word.word)word.word=''
    if(!word.level)word.level=''
    if(!word.linkedAssessments)word.linkedAssessments=[]
    if(!word.characteristics)word.characteristics=''
    if(!word.audioFileName)word.audioFileName=''

    this.props.editWord(word)
    this.setState({modal : !this.state.modal})
    }

saveClicked(){
    if( !this.props.formWord._id){
    this.props.createWord(this.props.formWord)}
    else
        this.props.updateWord(this.props.formWord)
}

deleteClicked(){
    this.props.deleteWord(this.props.formWord)
    this.setState({modal : !this.state.modal})
    }

toggle() {
    this.setState({modal : !this.state.modal})
      }

componentWillReceiveProps(nextProps)
{   
    if(!nextProps.wordsList){this.props.getWordsList(this.state.page, this.state.limit)}
    if(nextProps.success){this.setState({modal : !this.state.modal})}
}

componentDidMount(){
    this.props.getWordsList(this.state.page, this.state.limit)
  }

  render(){
      return(
          <div className="adminContainer"><h1>Words</h1>
        {(!this.props.wordsList)?<div>Loading Words</div>:
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <td>Word</td>
                        <td>Level</td>
                        <td>Date Updated</td>
                        <td><Button color="success" onClick={this.createWord}>Create New Word</Button></td>
                    </tr>
                </thead>
                <tbody>
                {this.props.wordsList.map((word, index)=>
                    <tr key={word._id}>
                    <td>{word.word}</td>
                    <td>{word.level}</td>
                    <td><DateTime utc={word.updatedAt}/></td>
                    <td><Button color ="warning" onClick={()=>this.edit(this.props.wordsList[index])}>Edit</Button></td>
                </tr>)}
                </tbody>                
            </Table>
            
            }
        <Paginator  count={this.props.count}
                    limit={this.state.limit}
                    page={this.state.page}
                    onClick={(page, limit)=>this.props.getWordsList(page, limit)}/>
        
         <Modal isOpen={this.state.modal} toggle={this.toggle}>
         <ModalHeader toggle={this.toggle}>Edit Word</ModalHeader>
         <ModalBody>
            <WordForm/>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={()=>this.saveClicked()}>Save</Button>
            <Button color="danger" onClick={()=>this.deleteClicked()}>Delete</Button>
            <Button color="info" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

        </Modal>   
        </div>
      )
  }
}

const mapStateToProps = state => {
    return {
        count: state.wordsAdmin.count,
        wordsList: state.wordsAdmin.wordsList,
        formWord: state.wordsAdmin.word,
        success: state.wordsAdmin.success 
    }
  }

const mapDispatchToProps = dispatch => {
return {
        getWordsList : (page, limit) => dispatch(getWordsList(page, limit)),
        createWord : (word) => dispatch(createWord(word)),
        editWord : (word) => dispatch(editWord(word)),
        updateWord : (word) => dispatch(updateWord(word)),
        deleteWord : (word) => dispatch(deleteWord(word))
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Words)