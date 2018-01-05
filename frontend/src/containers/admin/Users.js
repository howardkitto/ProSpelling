import React, { Component } from 'react';
import {connect} from 'react-redux'

import {getUsersList} from '../../redux/actionCreators'

class Users extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            modal:false,
            page:0,
            limit:5
        }
    }


    componentDidMount(){
        this.props.getUsersList(this.state.page, this.state.limit)
      }

    render() {
        return (
            <div>
                List users
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
    
    }
  }

const mapDispatchToProps = dispatch => {
return {
    getUsersList : (page, limit) => dispatch(getUsersList(page, limit)),
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users)

