import React, { Component } from 'react';
import {connect} from 'react-redux'

import {envTest} from '../../redux/actionCreators'

class EnvTest extends Component{

  componentDidMount(){
        
    this.props.envTest()
      }

render(){
  const{envData} = this.props
  return(
<div><h2>Environment Test</h2>
      <h3>V0.01.2</h3>
    {Object.keys(envData).map((key, value)=>
    <div key={key}>{key} = {envData[key]}</div>)}
</div>
    
  )
}

}

const mapStateToProps = state => {
  return {
    envData: state.serviceMessage.env
  }
}

const mapDispatchToProps = dispatch => {
return {
      envTest : () => dispatch(envTest()),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvTest)