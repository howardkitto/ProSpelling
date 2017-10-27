import React, { Component } from 'react';

class EnvTest extends Component{

  constructor(props){
    super(props)
    this.state={
      data: {}
    }
  }

  componentDidMount(){
        
    fetch('../admin/envTest', {
      accept: "application/json"
      })
      .then((res)=>res.json())
      .then((data)=>{this.setState({data})})
      .catch((error)=>{console.log('error ' + error)})
      }

render(){
  // console.log(typeof(this.state.data))
  return(
<div><h2>Environment Test</h2>
      <h3>V0.01.2</h3>
    {Object.keys(this.state.data).map((key, value)=>
    <div key={key}>{key} = {this.state.data[key]}</div>)}
</div>
    
    
  )
}

}

export default EnvTest