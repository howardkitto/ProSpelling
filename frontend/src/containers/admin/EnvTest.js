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
<div>
    {Object.keys(this.state.data).map((key, value)=>
    <div key={key}>{key} = {this.state.data[key]}</div>)}
</div>
    
    
  )
}

}

export default EnvTest