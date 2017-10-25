import React, {Component} from 'react'

class Words extends Component{

    constructor(){
        super()
        this.state = {
            wordsArray:[]
        }
    }

  componentDidMount(){
    fetch('../admin/words', {
        accept: "application/json"})
    .then( results => {return results.json()})
    .then((data)=>{this.setState({wordsArray:data})})
    .catch((error)=>{console.log('error ' + error)})
  }

 
    
  render(){
      return(
          <div>
        {this.state.wordsArray.map((word, index)=><li
        key={index}>{word}</li>)}
        </div>
      )
  }
}

export default Words