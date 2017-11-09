import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getAssessments} from '../../redux/actionCreators'

class Assessments extends Component{

componentDidMount(){
    this.props.getAssessments()

}

render(){
    return(
    <div>List of Assessment</div>
)
}

}
const mapStateToProps = state => {
    return {

    }
  }

const mapDispatchToProps = dispatch => {
return {
        getAssessments : () => dispatch(getAssessments()),
        }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Assessments)