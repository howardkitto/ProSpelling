import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table,
        Button} from 'reactstrap'

import Paginator from '../../components/Paginator'
import DateTime from '../../components/DateTime'

import {getSpellingTests} from '../../redux/actionCreators'

class SpellingTests extends Component{

    constructor(){
        super()
        this.state={
            page:0,
            limit:5
        }
    }

componentDidMount(){
    this.props.getSpellingTests(this.state.page, this.state.limit)

}

render(){
    return(
        <div>
    <h1>Spelling Tests</h1>
    
    {(!this.props.spellingTests)?<div>Loading SpellingTests</div>:
    <div>
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <td>User</td>
                <td>Questions</td>
                <td>Date Updated</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
        {this.props.spellingTests.map((a)=>
        
            <tr key={a.spellingTestId}>
            <td>Anonymous</td>
            <td>{a.questions.length}</td>
            <td><DateTime utc={a.createdAt}/></td>
            <td><Button color ="danger">Delete</Button></td>
            </tr>
        
        )}
        </tbody>
    </Table>
        
        <Paginator  count={this.props.count}
                    limit={this.state.limit}
                    page={this.state.page}
                    onClick={(page, limit)=>this.props.getSpellingTests(page, limit)}/>
    </div>
    }</div>
    
)
}

}
const mapStateToProps = state => {
    return {
        count: state.spellingTestAdmin.count,
        spellingTests: state.spellingTestAdmin.spellingTests

    }
  }

const mapDispatchToProps = dispatch => {
return {
        getSpellingTests : (page, limit) => dispatch(getSpellingTests(page, limit)),
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTests)