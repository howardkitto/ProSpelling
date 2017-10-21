import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {saveName} from '../redux/actionCreators'

class UserDetailsForm extends Component{

    constructor(){
        super()
        this.state = {
            spellerName:''
        }
    }

    handleText(e){
        this.setState({spellerName:e.target.value})
    }
    
    submitForm(e){
        e.preventDefault();
        this.props.saveName(this.state.spellerName);
    }

    render(){
        return(
        <form onSubmit={(e)=>{this.submitForm(e)}}>
            <h1>{this.props.headerText}</h1>
            <input  type='text'
                    autoFocus
                    onChange={(e)=>{this.handleText(e)}}
            />
            <button type='submit'                         
                    className='btn btn-danger'>Name
            </button>
        </form>
    )}
}

const mapStateToProps = state => {
    return {
      spellerName: state.name
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
            saveName : (value) => dispatch(saveName(value))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm)



UserDetailsForm.PropTypes = {
    headerText:PropTypes.string.isRequired,

}