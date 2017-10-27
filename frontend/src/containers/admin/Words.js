import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWordsList} from './../../redux/actionCreators'
import {Table} from 'reactstrap'

class Words extends Component{

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
                    </tr>
                </thead>
                <tbody>
                {this.props.wordsList.map((word, id)=>
                    <tr key={word._id}>
                    <td>{word.word}</td>
                    <td>{word.level}</td>
                </tr>)}
                </tbody>
                
            </Table>}
        }
            
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