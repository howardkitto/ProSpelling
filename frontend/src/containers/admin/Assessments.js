import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editAssessment,
        createAssessment,
        getAssessmentsList,
        updateAssessment,
        deleteAssessment
        } from '../../redux/actionCreators'

import AssessmentForm from './AssessmentForm'

import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap'
import DateTime from '../../components/DateTime'
import Paginator from '../../components/Paginator'

class Assessments extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5
        }
        this.toggle = this.toggle.bind(this);
        this.createAssessment=this.createAssessment.bind(this)
    }

    toggle() {
        this.setState({modal : !this.state.modal})
          }

    createAssessment(){
        var newAssessment={ title:'',
                            description:''}
        
        this.props.editAssessment(newAssessment)
        this.setState({modal:!this.state.modal})
    }

    edit(assessment){
        if(!assessment.title)assessment.title=''
        if(!assessment.description)assessment.description=''
        this.props.editAssessment(assessment)
        this.setState({modal:!this.state.modal})
    }

    saveClicked(){
        if( !this.props.formAssessment._id){
            this.props.createAssessment(this.props.formAssessment)}
        else
            this.props.updateAssessment(this.props.formAssessment)

    }

    deleteClicked(){
        this.props.deleteAssessment(this.props.formAssessment)
        this.setState({modal : !this.state.modal})
        }

    componentWillReceiveProps(nextProps)
    {   

        if(!nextProps.assessmentList){this.props.getAssessmentsList(this.state.page, this.state.limit)}
        if(nextProps.success){  this.setState({modal : !this.state.modal})
                                this.props.getAssessmentsList(this.state.page, this.state.limit)}
    }

    componentDidMount(){
        this.props.getAssessmentsList(this.state.page, this.state.limit)
      }

    render(){
        return(
            <div className="adminContainer">
                <h1>Assessments</h1>

                {(!this.props.assessmentList)?<div>Loading Assessments</div>:
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Date Updated</td>
                        <td><Button color="success" onClick={this.createAssessment}>New Assessment</Button></td>
                    </tr>
                </thead>
                <tbody>
                {this.props.assessmentList.map((assessment, index)=>
                    <tr key={assessment._id}>
                    <td>{assessment.title}</td>
                    <td>{assessment.description}</td>
                    <td><DateTime utc={assessment.updatedAt}/></td>
                    <td><Button color ="warning" onClick={()=>this.edit(this.props.assessmentList[index])}>Edit</Button></td>
                </tr>)}
                </tbody>                
            </Table>
            }
            <Paginator  count={this.props.count}
                    limit={this.state.limit}
                    page={this.state.page}
                    onClick={(page, limit)=>this.props.getAssessmentsList(page, limit)}/>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
         <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
         <ModalBody>
         <AssessmentForm/>
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
        count:state.assessmentAdmin.count,
        assessmentList: state.assessmentAdmin.assessmentList,
        formAssessment: state.assessmentAdmin.assessment,
        success: state.assessmentAdmin.success 
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            editAssessment : (assessment)=>dispatch(editAssessment(assessment)),
            createAssessment: (assessment)=>dispatch(createAssessment(assessment)),
            getAssessmentsList: (page, limit)=>dispatch(getAssessmentsList(page, limit)),
            updateAssessment:(assessment)=>dispatch(updateAssessment(assessment)),
            deleteAssessment:(assessment)=>dispatch(deleteAssessment(assessment))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Assessments)