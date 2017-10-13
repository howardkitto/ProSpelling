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
      1 of 3
    </div>
    <div className="col">
      2 of 3
    </div>
    <div className="col">
      3 of 3
    </div>
    </div>
    </div>
    
      

        )
    }

}

export default HomeContainer