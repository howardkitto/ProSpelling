import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap'
import DateTime from '../../components/DateTime'
import Paginator from '../../components/Paginator'

import AdminForm from './AdminForm'

class AdminList extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5
        }
    }

    createNew(){

        var newItem = { "Title":"",
                        "Description":""}
        this.props.editFunc(newItem)
        this.setState({modal:!this.state.modal})
    }

    saveClicked(){

        const {itemBeingEdited} = this.props
        if( !itemBeingEdited._id){
            this.props.createFunc(itemBeingEdited)}
        else
            this.props.updateFunc(itemBeingEdited)
    }

    edit(item){
        
        this.props.editFunc(item)
        this.setState({modal:!this.state.modal})
    }

    deleteClicked(){
        if(this.props.itemBeingEdited._id){this.props.deleteFunc(this.props.itemBeingEdited)}

    }

    componentDidMount(){
        
        this.props.getListFunc(0, 5)
      }
    
    componentWillReceiveProps(nextProps){

        if(nextProps.success){  this.setState({modal : !this.state.modal})
                                this.props.getListFunc(this.state.page, this.state.limit)
                            }
    }

    render(){
        const{objectProperties, itemList} = this.props
        const {name, formFields}=objectProperties
        
        return(

            <div className="adminContainer">
            <h1>{name}</h1>
{(!itemList)?<div>Loading...</div>:
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {formFields.map((field, index)=>{
                            return <td key={index}>{field.label}</td>
                        })
                        }
                        <td>Updated At</td>
                        <td><Button color="success" onClick={()=>this.createNew(this.props)}>New {name}</Button></td>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((item, index)=>
                        <tr key={itemList[index]._id}>

                            {formFields.map((field, index)=>{
                                return <td key={index}>{item[field.label]}</td>
                            })}
                        <td><DateTime utc={item.updatedAt}/></td>
                        <td><Button color ="warning" onClick={()=>this.edit(itemList[index])}>Edit</Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
}
<Paginator  count={this.props.count}
                    limit={this.state.limit}
                    page={this.state.page}
                    onClick={(page, limit)=>this.props.getListFunc(page, limit)}/>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit {name}</ModalHeader>
            <ModalBody>
                <AdminForm objectProperties = {this.props.objectProperties}/>
                
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={()=>this.saveClicked()}>Save</Button>
                <Button color="danger" onClick={()=>this.deleteClicked()}>Delete</Button>
                <Button color="info" onClick={()=>this.setState({modal:!this.state.modal})}>Cancel</Button>
            </ModalFooter>
            </Modal> 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const {reducer, listObject, objectType} = ownProps.objectProperties
    
    return {
        success: state[reducer].success,
        itemList: state[reducer][listObject],
        itemBeingEdited: state[reducer][objectType],
        count: state[reducer].count
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getListFunc: (page, limit)=>dispatch(ownProps.objectProperties.getListFunc(page, limit)),
        editFunc : (itemObject)=>dispatch(ownProps.objectProperties.editFunc(itemObject)),
        createFunc : (itemObject)=>dispatch(ownProps.objectProperties.createFunc(itemObject)),
        updateFunc : (itemObject)=>dispatch(ownProps.objectProperties.updateFunc(itemObject)),
        deleteFunc : (itemObject)=>dispatch(ownProps.objectProperties.deleteFunc(itemObject))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminList)