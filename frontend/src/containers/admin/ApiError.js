import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Modal,
        ModalBody,
        ModalFooter,
        Button} from 'reactstrap'

import {clearServiceMessage} from '../../redux/actionCreators'

class ApiError extends Component{

    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            currentError:{}
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.props.clearServiceMessage()
        this.setState({showModal: !this.state.modal})
    }

    componentWillReceiveProps(nextProps){
        // console.log('next props '+JSON.stringify(nextProps.apiError))
        if( nextProps.apiError || 
            nextProps.serverError ||
            nextProps.permissionsError !== undefined)
        this.setState({ currentError:   nextProps.apiError || 
                                        nextProps.serverError ||
                                        nextProps.permissionsError, 
                        showModal:true})
        else this.setState({showModal:false})
        
    }

    render(){

        return(
    
        <div style={{display: 'none'}}>
        <Modal isOpen={this.state.showModal}>
        <ModalBody>
        <h2>ERROR</h2>
      {this.state.currentError?Object.keys(this.state.currentError).map((key, value)=>
      <div key={key}>{key} = {this.state.currentError[key]}</div>):<div>No Data</div>}
      </ModalBody>
      <ModalFooter>
      <Button color="info" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
      </Modal>
      </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        apiError: state.serviceMessage.authorization,
        serverError: state.serviceMessage.server,
        permissionsError: state.serviceMessage.permissions
    }
  }

const mapDispatchToProps = dispatch => {
return {
    clearServiceMessage : (context) => dispatch(clearServiceMessage(context))
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ApiError)


