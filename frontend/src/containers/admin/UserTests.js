import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Table} from 'reactstrap'

import {getUserTests} from '../../redux/actionCreators'

class UserTests extends Component{

    componentDidMount(){        

        if(this.props.match.params.userId){
            this.props.getUserTests(this.props.match.params.userId, 0, 5)
        }

        
    }

    render(){

        return(this.props.match.params.userId?
            <div>
                UserTests
                <Table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            Date
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>:
            <div>
                No User Found
            </div>)
    }

}


const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
return {

    getUserTests: (userId, page, limit) => dispatch(getUserTests(userId, page, limit))

        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserTests)