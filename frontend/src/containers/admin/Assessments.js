import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table,
        Button} from 'reactstrap'

import Paginator from '../../components/Paginator'
import DateTime from '../../components/DateTime'

import {getAssessments} from '../../redux/actionCreators'

class Assessments extends Component{

    constructor(){
        super()
        this.state={
            page:0,
            limit:5
        }
    }

componentDidMount(){
    this.props.getAssessments(this.state.page, this.state.limit)

}

render(){
    return(
        <div>
    <div>List of Assessments</div>
    
    {(!this.props.assessments)?<div>Loading Assessments</div>:
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
        {this.props.assessments.map((a)=>
        
            <tr key={a.assessmentId}>
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
                    onClick={(page, limit)=>this.props.getAssessments(page, limit)}/>
    </div>
    }</div>
    
)
}

}
const mapStateToProps = state => {
    return {
        count: state.assessmentAdmin.count,
        assessments: state.assessmentAdmin.assessments

    }
  }

const mapDispatchToProps = dispatch => {
return {
        getAssessments : (page, limit) => dispatch(getAssessments(page, limit)),
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Assessments)