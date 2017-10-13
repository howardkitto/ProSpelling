import React, { Component } from 'react';


class HomeContainer extends Component{

render(){

    return(

        <div className="container">
           <div className="jumbotron">
           <h1 className="display-3">Hello, world!</h1>
           <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
           </div>
  <div className="row">
    <div className="col">
      Vowels
    </div>
    <div className="col">
     Consonants
    </div>
    </div>
    <div className="col">
      Letter NAMES
    </div>
    <div className="col">
      letter sounds
    </div>
  </div>
    
      

        )
    }

}

export default HomeContainer