import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Table} from 'reactstrap'

class TestResults extends Component{

    calculateTimeTaken(start, end){
        let questionStart = new Date(start)
        let questionEnd = new Date(end)

        let timeTaken = Math.floor(Math.abs((questionEnd - questionStart)/1000))

        return timeTaken

    }

    render(){
        return(
            <div>
                <h1>Spelling Test</h1>
                <h2>{this.props.user.displayName}</h2>
                <Table>
                    <thead>
                    <tr>
                    <th>Question</th>
                        <th>Answer</th>
                        <th>Outcome</th>
                        <th>Time Taken</th>
                        <th>Wrongness Score</th>
                    </tr>
                    </thead>
                    <tbody>
                {this.props.spellingTest.questions.map((question, index)=>
                    <tr key={index}>
                    <td>{(index===0 ||
                        question.word !== this.props.spellingTest.questions[index-1].word)&&
                        question.word                        
                        }</td>
                    <td>{question.answer}</td>
                    <td>{question.result}</td>
                    <td>{ this.calculateTimeTaken(question.answerTimeStamp,question.askTimeStamp)}&nbsp;seconds</td>
                    <td>{(question.score !== 0)&& Number(question.score).toPrecision(2)}</td>
                    </tr>
                )}
                    </tbody>
                </Table>
            </div>)        
        }
    }

const mapStateToProps = state => {
    return {

        spellingTest: state.spellingTest,
        user: state.user
        
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TestResults)