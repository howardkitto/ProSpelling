import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Modal,
        Button} from 'reactstrap'

import {clearServiceMessage} from '../../redux/actionCreators'

class ApiError extends Component{

    constructor(props){
        super(props)
        this.state = {
            showError: 'none',
            showModal: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.props.clearServiceMessage()
        this.setState({showModal: !this.state.modal})
    }

    componentWillReceiveProps(nextProps){
        console.log('next props '+JSON.stringify(nextProps.apiError))
        if(nextProps.apiError !== undefined)
        this.setState({showModal:true})
        else this.setState({showModal:false})
        
    }

    render(){
    
    const{apiError}=this.props

        return(
    
        <div style={{display: this.state.showError}}>
        <Modal isOpen={this.state.showModal}>
        <h2>AUTHORIZATION ERROR</h2>
      {apiError?Object.keys(apiError).map((key, value)=>
      <div key={key}>{key} = {apiError[key]}</div>):<div>No Data</div>}
      <Button color="info" onClick={this.toggle}>Cancel</Button>
      </Modal>
      </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        apiError: state.serviceMessage.authorization
    }
  }

const mapDispatchToProps = dispatch => {
return {
    clearServiceMessage : (context) => dispatch(clearServiceMessage(context))
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ApiError)


