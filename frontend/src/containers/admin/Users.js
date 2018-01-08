import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Table,
        Button,
        Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

import DateTime from '../../components/DateTime'
import Paginator from '../../components/Paginator'
import UserForm from './UserForm'

import {getUsersList,
        editUser,
        updateUser,
        deleteUser} from '../../redux/actionCreators'


class Users extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({modal : !this.state.modal})
        }
    
    edit(user) {
        this.props.editUser(user)
        this.toggle()
    }

    deleteClicked(){
        this.props.deleteUser(this.props.formUser)
        this.toggle()
    }

    componentWillReceiveProps(nextProps)
    {   
        if(!nextProps.usersList && !nextProps.serviceMessage){this.props.getUsersList(this.state.page, this.state.limit)}
        if(nextProps.success){this.setState({modal : !this.state.modal})}
    }

    componentDidMount(){
        this.props.getUsersList(this.state.page, this.state.limit)
      }

    render() {
        const {usersList, count, formUser, updateUser, serviceMessage}=this.props
        return (
            <div className="adminContainer"><h1>Users</h1>
                
                {(!usersList)?
                   (!serviceMessage)?<div>Loading Users</div>:<div>{serviceMessage.message}</div>:
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Date Updated</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersList.map((user, index)=>
                        <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.displayName}</td>
                    <td><DateTime utc={user.updatedAt}/></td>
                    
                    <td><Button color ="warning" onClick={()=>this.edit(usersList[index])}>Edit</Button></td>
                </tr>)}
                </tbody> 

                </Table>
                }
                <Paginator  count={count}
                    limit={this.state.limit}
                    page={this.state.page}
                    onClick={(page, limit)=>this.props.getUsersList(page, limit)}/>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
         <ModalHeader toggle={()=>this.toggle()}>Edit User</ModalHeader>
         <ModalBody>
            <h3 className = "serviceMessage">
                {(serviceMessage)&&serviceMessage.message}
            </h3>
            <UserForm />
          </ModalBody>
          <ModalFooter>
          <Button color="success" onClick={()=>updateUser(formUser)}>Save</Button>
            <Button color="danger" onClick={()=>this.deleteClicked()}>Delete</Button>
            <Button color="info" onClick={()=>this.toggle()}>Cancel</Button>
          </ModalFooter>

        </Modal> 

            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.usersAdmin.count,
        usersList : state.usersAdmin.usersList,
        formUser: state.usersAdmin.user,
        serviceMessage: state.serviceMessage.usersAdmin,
        success: state.usersAdmin.success 
    }
  }

const mapDispatchToProps = dispatch => {
return {
    getUsersList : (page, limit) => dispatch(getUsersList(page, limit)),
    editUser : (user) => dispatch(editUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
    updateUser: (user) => dispatch(updateUser(user))
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users)

