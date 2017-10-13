import React, { Component } from 'react';
import rosie from './audio/Rosie.mp4'


class HomeContainer extends Component{

render(){

    return(

        <div className="container">
           <div className="jumbotron">
           <h1 className="display-3">Hello, world!</h1>
           <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
           </div>
    <div className="col">
      <video src={rosie} type="video/mp4" className="videoCanvas" autoPlay loop muted/>
</div>
  </div>
    
      

        )
    }

}

export default HomeContainer