import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Table, 
        ListGroup, 
        ListGroupItemHeading, 
        Collapse} from 'reactstrap'

import {getUserTests} from '../../redux/actionCreators'

import Paginator from '../../components/Paginator'
import DateTime from '../../components/DateTime'

class UserTests extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5,
            expand:[]
        }
    }

    toggle(index) {
        console.log(index)
        
        let a = this.state.expand;
        a[index] = a[index] ? false : true
        this.setState({expand: a});
        }

    calculateTimeTaken(start, end){
            let questionStart = new Date(start)
            let questionEnd = new Date(end)
    
            let timeTaken = Math.floor(Math.abs((questionEnd - questionStart)/1000))
    
            return timeTaken
    
        }

    componentDidMount(){        

        if(this.props.match.params.userId){
            this.props.getUserTests(this.props.match.params.userId, 0, 5)
        }
    }

    render(){

        const {userTests} = this.props

    return(
        this.props.userTests?
        <div className="adminContainer">
         <h1>
                Test History For {userTests.user.displayName}
            </h1>

            {userTests.tests.map((test, index)=>
            <ListGroup key={test._id}>
                <ListGroupItemHeading>
                <DateTime utc={test.createdAt}/>
                <span>&nbsp;
                {test.questions.filter((question)=>{return question.result==="correct"}).length}&nbsp;Correct out of
                &nbsp; {test.assessmentQuestionCount}</span>&nbsp;
                    <span onClick={_=>this.toggle(index)}>
                        {this.state.expand[index]?
                            <b>-</b>:
                            <b>+</b>}
                    </span>
                </ListGroupItemHeading>
                <Collapse isOpen={this.state.expand[index]}>
                <Table>
                    <thead>
                        <tr>
                        <th>Word</th>
                        <th>Answer</th>
                        <th>Result</th>
                        <th>Time Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userTests.tests[index].questions.map((question, i)=>
                    <tr key={i}>
                    {/* don't show the word if it was on teh previous line  */}
                    <td>{question.word}</td>
                    <td>{question.answer}</td>
                    <td>{question.result}</td>
                    <td>{ this.calculateTimeTaken(question.answerTimeStamp,question.askTimeStamp)}&nbsp;seconds</td>
                    <td>{(question.score !== 0)&& Number(question.score).toPrecision(2)}</td>
                    </tr>)}
                
                    </tbody>
                </Table>
                </Collapse>
            </ListGroup>
            )}
            
            <Paginator  count={userTests.count}
                limit={this.state.limit}
                page={this.state.page}
                onClick={(page, limit)=>this.props.getUserTests(this.props.match.params.userId, page, limit)}/>
        </div> 
        :
        <div>
        Loading
     </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        userTests: state.usersAdmin.userTests

    }
  }

const mapDispatchToProps = dispatch => {
return {

    getUserTests: (userId, page, limit) => dispatch(getUserTests(userId, page, limit))

        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserTests)